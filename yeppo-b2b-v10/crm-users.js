(() => {
  "use strict";

  const CONFIG_KEY = "yeppoCRMv10SupabaseConfig";
  const SESSION_KEY = "yeppoCRMv10SupabaseSession";
  const LOCAL_USERS_KEY = "yeppoCRMv10PilotUsers";
  const LOCAL_USER_KEY = "yeppoCRMv10PilotCurrentUser";
  const LOCAL_ACTIVITY_KEY = "yeppoCRMv10PilotActivity";
  const ROLE_LABELS = { admin: "Administrador", supervisor: "Supervisor B2B", kam: "KAM", readonly: "Solo lectura" };
  const EDIT_ROLES = new Set(["admin", "supervisor", "kam"]);
  const DEFAULT_USER = { id: "local-matias", full_name: "Matías", email: "", role: "admin", active: true, local: true };

  let config = readJSON(CONFIG_KEY, null);
  let session = readJSON(SESSION_KEY, null);
  let profile = DEFAULT_USER;
  let profiles = [];
  let activities = readJSON(LOCAL_ACTIVITY_KEY, []);
  let assignments = new Map();
  let initialized = false;
  let mounted = false;

  function readJSON(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key) || "") || fallback; } catch (_) { return fallback; }
  }

  function writeJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function safe(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  }

  function uid() {
    return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function normalizeUrl(value) {
    return String(value || "").trim().replace(/\/+$/, "");
  }

  function connected() {
    return Boolean(config?.url && config?.anonKey && session?.access_token && !profile.local);
  }

  function localUsers() {
    const users = readJSON(LOCAL_USERS_KEY, []);
    if (!users.some(user => user.id === DEFAULT_USER.id)) users.unshift(DEFAULT_USER);
    writeJSON(LOCAL_USERS_KEY, users);
    return users;
  }

  async function pinHash(pin) {
    const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(String(pin || "")));
    return [...new Uint8Array(bytes)].map(byte => byte.toString(16).padStart(2, "0")).join("");
  }

  async function authRequest(path, body, accessToken = "") {
    const response = await fetch(`${normalizeUrl(config.url)}/auth/v1/${path}`, {
      method: "POST",
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${accessToken || config.anonKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body || {})
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.msg || data.message || data.error_description || `Error ${response.status}`);
    return data;
  }

  async function refreshSession() {
    if (!session?.refresh_token) return false;
    try {
      const refreshed = await authRequest("token?grant_type=refresh_token", { refresh_token: session.refresh_token });
      session = { ...session, ...refreshed, expires_at: refreshed.expires_at || Math.floor(Date.now() / 1000) + (refreshed.expires_in || 3600) };
      writeJSON(SESSION_KEY, session);
      return true;
    } catch (_) {
      localStorage.removeItem(SESSION_KEY);
      session = null;
      return false;
    }
  }

  async function ensureSession() {
    if (!session?.access_token) return false;
    const expiresAt = Number(session.expires_at || 0);
    if (expiresAt && expiresAt < Math.floor(Date.now() / 1000) + 60) return refreshSession();
    return true;
  }

  async function rest(path, options = {}) {
    if (!(await ensureSession())) throw new Error("La sesión venció. Vuelve a ingresar.");
    const headers = {
      apikey: config.anonKey,
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json"
    };
    if (options.prefer) headers.Prefer = options.prefer;
    let response = await fetch(`${normalizeUrl(config.url)}/rest/v1/${path}`, {
      method: options.method || "GET",
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body)
    });
    if (response.status === 401 && await refreshSession()) {
      headers.Authorization = `Bearer ${session.access_token}`;
      response = await fetch(`${normalizeUrl(config.url)}/rest/v1/${path}`, {
        method: options.method || "GET",
        headers,
        body: options.body === undefined ? undefined : JSON.stringify(options.body)
      });
    }
    const text = await response.text();
    const data = text ? JSON.parse(text) : null;
    if (!response.ok) throw new Error(data?.message || data?.hint || `Error ${response.status}`);
    return data;
  }

  async function loadRemoteIdentity() {
    const authResponse = await fetch(`${normalizeUrl(config.url)}/auth/v1/user`, {
      headers: { apikey: config.anonKey, Authorization: `Bearer ${session.access_token}` }
    });
    if (!authResponse.ok) return false;
    const user = await authResponse.json();
    const rows = await rest(`crm_profiles?id=eq.${encodeURIComponent(user.id)}&select=*`);
    profile = rows?.[0] || {
      id: user.id,
      full_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "Usuario",
      email: user.email || "",
      role: "kam",
      active: true
    };
    if (!profile.active) throw new Error("Este usuario está desactivado.");
    profiles = await rest("crm_profiles?select=*&order=full_name.asc");
    return true;
  }

  function removeBootGuard() {
    document.documentElement.classList.remove("crmBoot");
    document.documentElement.removeAttribute("aria-busy");
    document.getElementById("crmBootStyle")?.remove();
  }

  function loginOverlay() {
    return new Promise(resolve => {
      let overlay = document.getElementById("crmAuthOverlay");
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "crmAuthOverlay";
        overlay.className = "crmAuthOverlay";
        overlay.innerHTML = `
          <form class="crmAuthCard">
            <span class="crmAuthBrand">B2B <b>CRM</b></span>
            <h1>Acceso del equipo</h1>
            <p>Ingresa con tu usuario para registrar cada gestión con responsable, fecha y hora.</p>
            <label>Correo<input class="crmAuthEmail" type="email" autocomplete="username" required></label>
            <label>Contraseña<input class="crmAuthPassword" type="password" autocomplete="current-password" required></label>
            <button class="primary crmAuthSubmit" type="submit">Ingresar</button>
            <button class="soft crmAuthSignup" type="button">Crear primer administrador</button>
            <button class="soft crmAuthLocal" type="button">Volver al modo piloto local</button>
            <small class="crmAuthStatus"></small>
          </form>`;
        document.body.appendChild(overlay);
      }
      removeBootGuard();
      const form = overlay.querySelector("form");
      const status = overlay.querySelector(".crmAuthStatus");
      form.onsubmit = async event => {
        event.preventDefault();
        status.textContent = "Validando…";
        const button = overlay.querySelector(".crmAuthSubmit");
        button.disabled = true;
        try {
          const result = await authRequest("token?grant_type=password", {
            email: overlay.querySelector(".crmAuthEmail").value.trim(),
            password: overlay.querySelector(".crmAuthPassword").value
          });
          session = { ...result, expires_at: result.expires_at || Math.floor(Date.now() / 1000) + (result.expires_in || 3600) };
          writeJSON(SESSION_KEY, session);
          await loadRemoteIdentity();
          overlay.remove();
          resolve(true);
        } catch (error) {
          status.textContent = error.message;
          button.disabled = false;
        }
      };
      overlay.querySelector(".crmAuthSignup").onclick = async () => {
        const email = overlay.querySelector(".crmAuthEmail").value.trim();
        const password = overlay.querySelector(".crmAuthPassword").value;
        if (!email || password.length < 6) {
          status.textContent = "Escribe un correo y una contraseña de al menos 6 caracteres.";
          return;
        }
        const fullName = prompt("Nombre del primer administrador", "Matías")?.trim();
        if (!fullName) return;
        status.textContent = "Creando administrador…";
        try {
          const result = await authRequest("signup", { email, password, data: { full_name: fullName } });
          if (result.access_token) {
            session = { ...result, expires_at: result.expires_at || Math.floor(Date.now() / 1000) + (result.expires_in || 3600) };
            writeJSON(SESSION_KEY, session);
            await loadRemoteIdentity();
            overlay.remove();
            resolve(true);
          } else status.textContent = "Usuario creado. Confirma el correo y luego ingresa.";
        } catch (error) { status.textContent = error.message; }
      };
      overlay.querySelector(".crmAuthLocal").onclick = () => {
        if (!confirm("¿Desconectar Supabase en este navegador y continuar con los datos locales?")) return;
        localStorage.removeItem(CONFIG_KEY);
        localStorage.removeItem(SESSION_KEY);
        config = null;
        session = null;
        profile = DEFAULT_USER;
        profiles = localUsers();
        overlay.remove();
        resolve(false);
      };
    });
  }

  async function init() {
    if (initialized) return profile;
    localUsers();
    if (config?.url && config?.anonKey) {
      let valid = false;
      try { valid = await ensureSession() && await loadRemoteIdentity(); } catch (error) { console.error("CRM users:", error); }
      if (!valid) await loginOverlay();
    }
    if (!connected()) {
      profiles = localUsers();
      const selected = localStorage.getItem(LOCAL_USER_KEY);
      profile = profiles.find(user => user.id === selected && user.active !== false) || DEFAULT_USER;
    }
    patchBaseActions();
    initialized = true;
    return profile;
  }

  function assignedUserId(clientId) {
    return assignments.get(String(clientId)) || "";
  }

  function can(action = "write", clientId = "") {
    if (!profile?.active) return false;
    if (action === "read") return true;
    if (!EDIT_ROLES.has(profile.role)) return false;
    if (action === "admin") return profile.role === "admin";
    if (action === "supervise") return profile.role === "admin" || profile.role === "supervisor";
    if (profile.role !== "kam" || !clientId) return true;
    const owner = assignedUserId(clientId);
    if (owner) return owner === profile.id;
    try {
      const client = state?.clients?.find(item => String(item.id) === String(clientId));
      return !client?.kam || client.kam === "Sin asignar" || client.kam === profile.full_name;
    } catch (_) { return true; }
  }

  function guard(action = "write", clientId = "") {
    if (can(action, clientId)) return true;
    alert(profile.role === "readonly" ? "Tu perfil es de solo lectura." : "Este cliente está asignado a otro KAM.");
    return false;
  }

  async function audit(action, entityType, entityId, summary, details = {}, clientId = "") {
    const row = {
      id: uid(),
      actor_id: profile.local ? null : profile.id,
      actor_name: profile.full_name,
      action,
      entity_type: entityType,
      entity_id: String(entityId || ""),
      client_id: String(clientId || ""),
      summary,
      details,
      created_at: new Date().toISOString()
    };
    activities.unshift(row);
    activities = activities.slice(0, 500);
    if (!connected()) {
      writeJSON(LOCAL_ACTIVITY_KEY, activities);
      return row;
    }
    try {
      await rest("crm_activity_log", { method: "POST", body: row, prefer: "return=minimal" });
    } catch (error) { console.error("CRM audit:", error); }
    return row;
  }

  async function upsert(table, body, conflict) {
    if (!connected()) return null;
    const query = conflict ? `?on_conflict=${encodeURIComponent(conflict)}` : "";
    return rest(`${table}${query}`, { method: "POST", body, prefer: "resolution=merge-duplicates,return=representation" });
  }

  async function syncPipeline(clientId, value, before = {}) {
    if (!guard("write", clientId)) return false;
    if (connected()) {
      await upsert("crm_pipeline", {
        client_id: String(clientId), stage: value.stage, amount: Number(value.amount || 0),
        updated_by: profile.id, updated_at: new Date().toISOString()
      }, "client_id").catch(error => console.error("Pipeline sync:", error));
    }
    await audit("pipeline_updated", "pipeline", clientId, `Cambió el pipeline a ${value.stage}`, { before, after: value }, clientId);
    return true;
  }

  async function syncTask(task, source = "base", action = "task_saved") {
    if (!task || !guard("write", task.clientId)) return false;
    if (connected()) {
      await upsert("crm_tasks", {
        id: String(task.id), client_id: task.clientId == null ? null : String(task.clientId),
        title: task.text || task.type || "Seguimiento", task_type: task.type || "Tarea",
        due_date: task.due || task.date || null, note: task.note || "", done: Boolean(task.done),
        source, payload: task, created_by: task.createdBy || profile.id, updated_by: profile.id,
        updated_at: new Date().toISOString()
      }, "id").catch(error => console.error("Task sync:", error));
    }
    await audit(action, "task", task.id, `${task.done ? "Completó" : "Guardó"} ${task.text || task.type || "una tarea"}`, { task, source }, task.clientId);
    return true;
  }

  async function deleteTask(task, source = "base") {
    if (!task || !guard("write", task.clientId)) return false;
    if (connected()) await rest(`crm_tasks?id=eq.${encodeURIComponent(task.id)}`, { method: "DELETE" }).catch(error => console.error("Task delete:", error));
    await audit("task_deleted", "task", task.id, `Eliminó ${task.text || task.type || "una tarea"}`, { task, source }, task.clientId);
    return true;
  }

  async function syncClient(client, before = {}) {
    if (!client || !guard("write", client.id)) return false;
    if (connected()) {
      await upsert("crm_client_overrides", {
        client_id: String(client.id), data: client, updated_by: profile.id, updated_at: new Date().toISOString()
      }, "client_id").catch(error => console.error("Client sync:", error));
    }
    await syncAssignment(client.id, client.kam);
    const created = !before?.id;
    await audit(created ? "client_created" : "client_updated", "client", client.id, `${created ? "Creó" : "Editó"} la ficha de ${client.cliente}`, { before, after: client }, client.id);
    return true;
  }

  async function syncAssignment(clientId, kamName) {
    const target = profiles.find(user => user.full_name === kamName && user.active !== false);
    if (target) assignments.set(String(clientId), target.id); else assignments.delete(String(clientId));
    if (!connected() || !can("supervise") && target?.id !== profile.id) return;
    try {
      if (!target) await rest(`crm_client_assignments?client_id=eq.${encodeURIComponent(clientId)}`, { method: "DELETE" });
      else await upsert("crm_client_assignments", {
        client_id: String(clientId), assigned_user_id: target.id, assigned_by: profile.id, assigned_at: new Date().toISOString()
      }, "client_id");
    } catch (error) { console.error("Assignment sync:", error); }
  }

  async function hydrate(context = {}) {
    if (!connected()) return context;
    try {
      const [profileRows, assignmentRows, pipelineRows, taskRows, overrideRows, activityRows] = await Promise.all([
        rest("crm_profiles?select=*&order=full_name.asc"),
        rest("crm_client_assignments?select=*"),
        rest("crm_pipeline?select=*"),
        rest("crm_tasks?select=*&order=updated_at.desc"),
        rest("crm_client_overrides?select=*"),
        rest("crm_activity_log?select=*&order=created_at.desc&limit=200")
      ]);
      profiles = profileRows || profiles;
      assignments = new Map((assignmentRows || []).map(row => [String(row.client_id), row.assigned_user_id]));
      activities = activityRows || [];
      const profileById = new Map(profiles.map(user => [user.id, user]));
      const overrides = new Map((overrideRows || []).map(row => [String(row.client_id), row.data]));
      if (typeof state !== "undefined" && Array.isArray(state.clients)) {
        state.clients.forEach(client => {
          const patch = overrides.get(String(client.id));
          if (patch) Object.assign(client, patch);
          const owner = profileById.get(assignments.get(String(client.id)));
          if (owner) client.kam = owner.full_name;
        });
      }
      const remotePipeline = Object.fromEntries((pipelineRows || []).map(row => [row.client_id, { stage: row.stage, amount: Number(row.amount || 0), updatedAt: row.updated_at }]));
      const nextRemote = (taskRows || []).filter(row => row.source === "next_action").map(row => ({ ...row.payload, id: row.id, clientId: row.client_id, type: row.task_type, date: row.due_date, note: row.note, done: row.done }));
      const baseRemote = (taskRows || []).filter(row => row.source === "base").map(row => ({ ...row.payload, id: row.id, clientId: row.client_id ? Number(row.client_id) || row.client_id : null, text: row.title, due: row.due_date, done: row.done }));
      if (typeof state !== "undefined" && baseRemote.length) state.tasks = baseRemote;
      if (!(pipelineRows || []).length && Object.keys(context.pipeline || {}).length) {
        await Promise.all(Object.entries(context.pipeline).map(([id, value]) => upsert("crm_pipeline", { client_id: String(id), stage: value.stage, amount: Number(value.amount || 0), updated_by: profile.id }, "client_id")));
      }
      if (!baseRemote.length && typeof state !== "undefined" && state.tasks?.length) await Promise.all(state.tasks.map(task => syncTask(task, "base", "task_migrated")));
      if (!nextRemote.length && context.nextActions?.length) await Promise.all(context.nextActions.map(task => syncTask(task, "next_action", "task_migrated")));
      return {
        pipeline: { ...(context.pipeline || {}), ...remotePipeline },
        nextActions: nextRemote.length ? nextRemote : context.nextActions
      };
    } catch (error) {
      console.error("CRM shared hydrate:", error);
      return context;
    }
  }

  function patchBaseActions() {
    if (window.__crmUsersPatched) return;
    window.__crmUsersPatched = true;
    const wrap = (name, handler) => {
      const original = window[name];
      if (typeof original !== "function") return;
      window[name] = handler(original);
    };
    wrap("saveManagement", original => function (...args) {
      const clientId = Number(document.getElementById("pbClientId")?.value || 0);
      if (!guard("write", clientId)) return;
      const beforeCount = state.gestiones.length;
      const result = original.apply(this, args);
      const management = state.gestiones.at(-1);
      if (state.gestiones.length > beforeCount && management) audit("management_saved", "management", management.id, `Registró gestión ${management.result}`, { management }, clientId);
      return result;
    });
    wrap("saveTask", original => function (...args) {
      const clientId = Number(document.getElementById("tClient")?.value || 0) || "";
      if (!guard("write", clientId)) return;
      const result = original.apply(this, args);
      const task = state.tasks.at(-1);
      if (task) { task.createdBy = profile.id; syncTask(task, "base"); }
      return result;
    });
    wrap("toggleTask", original => function (id, ...args) {
      const task = state.tasks.find(item => String(item.id) === String(id));
      if (!guard("write", task?.clientId)) return;
      const result = original.call(this, id, ...args);
      const updated = state.tasks.find(item => String(item.id) === String(id));
      if (updated) syncTask(updated, "base", updated.done ? "task_completed" : "task_reopened");
      return result;
    });
    wrap("deleteTask", original => function (id, ...args) {
      const task = state.tasks.find(item => String(item.id) === String(id));
      if (!guard("write", task?.clientId)) return;
      const result = original.call(this, id, ...args);
      deleteTask(task, "base");
      return result;
    });
    wrap("addInteraction", original => function (...args) {
      const clientId = Number(document.getElementById("fId")?.value || 0);
      if (!guard("write", clientId)) return;
      const beforeCount = state.interactions.length;
      const result = original.apply(this, args);
      const interaction = state.interactions.at(-1);
      if (state.interactions.length > beforeCount && interaction) audit("interaction_added", "interaction", interaction.id, `Registró contacto por ${interaction.channel}`, { interaction }, clientId);
      return result;
    });
    wrap("deleteClient", original => function (...args) {
      const clientId = Number(document.getElementById("fId")?.value || 0);
      const client = state.clients.find(item => item.id === clientId);
      if (!guard("admin", clientId)) return;
      const result = original.apply(this, args);
      if (!state.clients.some(item => item.id === clientId)) audit("client_deleted", "client", clientId, `Eliminó ${client?.cliente || "una cuenta"}`, { client }, clientId);
      return result;
    });
    wrap("openClient", original => function (id, ...args) {
      const result = original.call(this, id, ...args);
      setTimeout(() => prepareKamField(id), 0);
      return result;
    });
    const form = document.getElementById("clientForm");
    form?.addEventListener("submit", event => {
      const existingId = Number(document.getElementById("fId")?.value || 0);
      if (!guard("write", existingId)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
      const before = existingId ? structuredClone(state.clients.find(item => item.id === existingId) || {}) : {};
      setTimeout(() => {
        const client = existingId ? state.clients.find(item => item.id === existingId) : state.clients.at(-1);
        if (client) syncClient(client, before);
      }, 0);
    }, true);
  }

  function prepareKamField(clientId) {
    const field = document.getElementById("fKam");
    if (!field) return;
    let list = document.getElementById("crmKamUsers");
    if (!list) {
      list = document.createElement("datalist");
      list.id = "crmKamUsers";
      document.body.appendChild(list);
    }
    list.innerHTML = profiles.filter(user => user.active !== false && ["admin", "supervisor", "kam"].includes(user.role)).map(user => `<option value="${safe(user.full_name)}">${safe(ROLE_LABELS[user.role])}</option>`).join("");
    field.setAttribute("list", list.id);
    field.readOnly = profile.role === "kam" || profile.role === "readonly";
    if (profile.role === "kam" && (!clientId || field.value === "Sin asignar" || !field.value)) field.value = profile.full_name;
  }

  function mount(context = {}) {
    if (mounted) { refreshIdentityUi(); return; }
    mounted = true;
    mountProfileMenu(context);
    mountSettings();
    refreshIdentityUi();
    if (profile.role === "readonly") document.documentElement.classList.add("crmReadOnly");
  }

  function refreshIdentityUi() {
    const user = document.querySelector(".crmUserV2");
    if (user) {
      user.innerHTML = `<span>${safe(profile.full_name?.slice(0, 1).toUpperCase() || "U")}</span><div><b>${safe(profile.full_name)}</b><small>${safe(ROLE_LABELS[profile.role] || profile.role)}</small></div><i class="fa-solid fa-chevron-down" aria-hidden="true"></i>`;
      user.setAttribute("role", "button");
      user.tabIndex = 0;
      user.setAttribute("aria-haspopup", "menu");
    }
    const heading = document.querySelector(".crmWelcomeV2 h1");
    if (heading) heading.innerHTML = `¡Hola, ${safe(profile.full_name?.split(" ")[0] || "equipo")}! <span>👋</span>`;
  }

  function mountProfileMenu(context) {
    let menu = document.getElementById("crmProfileMenu");
    if (!menu) {
      menu = document.createElement("div");
      menu.id = "crmProfileMenu";
      menu.className = "crmProfileMenu";
      menu.innerHTML = `
        <div class="crmProfileHead"><b></b><small></small></div>
        <button data-user-action="portfolio"><i class="fa-solid fa-address-book"></i> Mi cartera</button>
        <button data-user-action="tasks"><i class="fa-solid fa-list-check"></i> Mis tareas</button>
        <button data-user-action="activity"><i class="fa-solid fa-clock-rotate-left"></i> Mi actividad</button>
        <button data-user-action="switch"><i class="fa-solid fa-users"></i> Cambiar usuario</button>
        <button data-user-action="logout"><i class="fa-solid fa-right-from-bracket"></i> Cerrar sesión</button>`;
      document.body.appendChild(menu);
      menu.onclick = event => event.stopPropagation();
      menu.querySelector('[data-user-action="portfolio"]').onclick = () => openPortfolio(context);
      menu.querySelector('[data-user-action="tasks"]').onclick = () => {
        menu.classList.remove("open");
        const tab = [...document.querySelectorAll(".tabs .tab")].find(item => item.dataset.tab === "tareas");
        tab?.click();
      };
      menu.querySelector('[data-user-action="activity"]').onclick = () => openActivity();
      menu.querySelector('[data-user-action="switch"]').onclick = () => connected() ? alert("Para cambiar de usuario, cierra la sesión actual.") : openLocalSwitcher();
      menu.querySelector('[data-user-action="logout"]').onclick = logout;
      document.addEventListener("click", () => menu.classList.remove("open"));
    }
    const user = document.querySelector(".crmUserV2");
    if (user) {
      user.onclick = event => {
        event.stopPropagation();
        const rect = user.getBoundingClientRect();
        menu.style.top = `${rect.bottom + 8}px`;
        menu.style.right = `${Math.max(10, innerWidth - rect.right)}px`;
        menu.querySelector(".crmProfileHead b").textContent = profile.full_name;
        menu.querySelector(".crmProfileHead small").textContent = `${ROLE_LABELS[profile.role] || profile.role}${connected() ? " · conectado" : " · piloto local"}`;
        menu.querySelector('[data-user-action="switch"]').hidden = connected();
        menu.classList.toggle("open");
      };
    }
  }

  function modalShell(title, subtitle) {
    let modal = document.getElementById("crmUsersModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "crmUsersModal";
      modal.className = "crmUsersModal";
      modal.innerHTML = `<div class="crmUsersModalCard"><header><div><h2></h2><p></p></div><button class="crmUsersClose" aria-label="Cerrar">×</button></header><div class="crmUsersModalBody"></div></div>`;
      document.body.appendChild(modal);
      modal.querySelector(".crmUsersClose").onclick = () => modal.classList.remove("open");
      modal.onclick = event => { if (event.target === modal) modal.classList.remove("open"); };
    }
    modal.querySelector("h2").textContent = title;
    modal.querySelector("header p").textContent = subtitle;
    modal.classList.add("open");
    return modal.querySelector(".crmUsersModalBody");
  }

  function openPortfolio(context) {
    document.getElementById("crmProfileMenu")?.classList.remove("open");
    const clients = context.clients || (typeof state !== "undefined" ? state.clients : []) || [];
    const own = profile.role === "kam" ? clients.filter(client => assignedUserId(client.id) === profile.id || client.kam === profile.full_name) : clients;
    const body = modalShell(profile.role === "kam" ? "Mi cartera" : "Cartera del equipo", `${own.length} cuenta(s) visibles para ${profile.full_name}`);
    body.innerHTML = `<label class="crmUserSearch">Buscar cliente<input type="search" placeholder="Nombre, email o empresa"></label><div class="crmPortfolioList"></div>`;
    const render = query => {
      const q = String(query || "").toLowerCase();
      const rows = own.filter(client => !q || `${client.cliente} ${client.email} ${client.empresa}`.toLowerCase().includes(q)).slice(0, 150);
      body.querySelector(".crmPortfolioList").innerHTML = rows.map(client => `<button data-client-id="${safe(client.id)}"><span><b>${safe(client.cliente)}</b><small>${safe(client.email || client.empresa || "Sin contacto")}</small></span><em>${safe(client.kam || "Sin asignar")}</em></button>`).join("") || "<p>Sin clientes asignados.</p>";
      body.querySelectorAll("[data-client-id]").forEach(button => button.onclick = () => {
        document.getElementById("crmUsersModal")?.classList.remove("open");
        if (typeof context.openClient === "function") context.openClient(button.dataset.clientId);
        else if (typeof window.openClient === "function") window.openClient(Number(button.dataset.clientId) || button.dataset.clientId);
      });
    };
    body.querySelector("input").oninput = event => render(event.target.value);
    render("");
  }

  async function openActivity() {
    document.getElementById("crmProfileMenu")?.classList.remove("open");
    if (connected()) activities = await rest("crm_activity_log?select=*&order=created_at.desc&limit=200").catch(() => activities);
    const visible = profile.role === "kam" ? activities.filter(item => item.actor_id === profile.id || item.actor_name === profile.full_name) : activities;
    const body = modalShell("Bitácora de actividad", "Registro de quién hizo cada acción, con fecha y hora");
    body.innerHTML = `<div class="crmActivityList">${visible.map(item => `<article><i>${safe((item.actor_name || "U").slice(0, 1).toUpperCase())}</i><div><b>${safe(item.summary)}</b><span>${safe(item.actor_name)} · ${new Date(item.created_at).toLocaleString("es-CL")}</span><small>${safe(item.entity_type)} ${safe(item.entity_id)}</small></div></article>`).join("") || "<p>Todavía no hay acciones registradas.</p>"}</div>`;
  }

  function openLocalSwitcher() {
    document.getElementById("crmProfileMenu")?.classList.remove("open");
    const users = localUsers().filter(user => user.active !== false);
    const body = modalShell("Cambiar usuario", "Modo piloto local: los perfiles comparten este navegador");
    body.innerHTML = `<div class="crmUserSwitchList">${users.map(user => `<button data-user-id="${safe(user.id)}"><i>${safe(user.full_name.slice(0, 1).toUpperCase())}</i><span><b>${safe(user.full_name)}</b><small>${safe(ROLE_LABELS[user.role])}</small></span></button>`).join("")}</div>`;
    body.querySelectorAll("[data-user-id]").forEach(button => button.onclick = async () => {
      const user = users.find(item => item.id === button.dataset.userId);
      if (user.pin_hash) {
        const pin = prompt(`PIN de ${user.full_name}`);
        if (pin == null) return;
        if (await pinHash(pin) !== user.pin_hash) return alert("PIN incorrecto.");
      }
      localStorage.setItem(LOCAL_USER_KEY, user.id);
      location.reload();
    });
  }

  async function logout() {
    if (connected()) {
      await fetch(`${normalizeUrl(config.url)}/auth/v1/logout`, { method: "POST", headers: { apikey: config.anonKey, Authorization: `Bearer ${session.access_token}` } }).catch(() => {});
      localStorage.removeItem(SESSION_KEY);
    } else localStorage.removeItem(LOCAL_USER_KEY);
    location.reload();
  }

  function mountSettings() {
    const section = document.getElementById("v10security");
    if (!section || section.querySelector(".crmUsersSettings")) return;
    const host = document.createElement("div");
    host.className = "crmUsersSettings";
    host.innerHTML = `
      <div class="crmUsersCard">
        <small>USUARIOS Y KAM</small><h2>Equipo y trazabilidad</h2>
        <p class="crmUsersMode"></p><div class="crmUsersTable"></div>
        <form class="crmAddUser"><h3>Agregar usuario piloto</h3><div class="crmUsersFormGrid"><input name="name" placeholder="Nombre" required><input name="email" type="email" placeholder="Correo"><select name="role"><option value="kam">KAM</option><option value="supervisor">Supervisor B2B</option><option value="readonly">Solo lectura</option><option value="admin">Administrador</option></select><input name="pin" inputmode="numeric" minlength="4" placeholder="PIN (mínimo 4 dígitos)" required></div><button class="primary" type="submit">Crear usuario</button><span class="crmAddUserStatus"></span></form>
      </div>
      <div class="crmUsersCard">
        <small>BASE COMPARTIDA</small><h2>Conexión Supabase Free</h2>
        <p>Al conectar, usuarios, asignaciones, pipeline, tareas y bitácora se comparten entre equipos.</p>
        <form class="crmSupabaseConfig"><label>Project URL<input name="url" type="url" placeholder="https://xxxxx.supabase.co" value="${safe(config?.url || "")}"></label><label>Anon public key<input name="anonKey" type="password" placeholder="sb_publishable_... o anon key"></label><div><button class="primary" type="submit">Guardar y conectar</button>${config ? '<button class="soft crmDisconnect" type="button">Desconectar</button>' : ""}</div><span class="crmConfigStatus"></span></form>
        <div class="crmSupabaseSteps"><b>Para activar la prueba compartida:</b><ol><li>Crea un proyecto gratuito en Supabase.</li><li>Ejecuta el archivo <code>supabase-pilot-schema.sql</code> en SQL Editor.</li><li>Configura esta URL del CRM como Site URL en Authentication.</li><li>Copia Project URL y la clave pública en este formulario.</li><li>El primer usuario registrado queda como Administrador.</li></ol></div>
      </div>`;
    section.appendChild(host);
    renderUsersSettings(host);
  }

  function renderUsersSettings(host) {
    const mode = host.querySelector(".crmUsersMode");
    mode.innerHTML = connected() ? `<b>Conectado:</b> ${safe(profile.full_name)} · ${safe(ROLE_LABELS[profile.role])}` : `<b>Modo piloto local:</b> funciona en este navegador y sin costo.`;
    const table = host.querySelector(".crmUsersTable");
    table.innerHTML = `<div class="crmUsersRow crmUsersHead"><span>Usuario</span><span>Rol</span><span>Estado</span></div>${profiles.map(user => `<div class="crmUsersRow" data-profile-id="${safe(user.id)}"><span><b>${safe(user.full_name)}</b><small>${safe(user.email || "Sin correo")}</small></span><select ${can("admin") && user.id !== profile.id ? "" : "disabled"}><option value="admin" ${user.role === "admin" ? "selected" : ""}>Administrador</option><option value="supervisor" ${user.role === "supervisor" ? "selected" : ""}>Supervisor</option><option value="kam" ${user.role === "kam" ? "selected" : ""}>KAM</option><option value="readonly" ${user.role === "readonly" ? "selected" : ""}>Solo lectura</option></select><button class="${user.active === false ? "inactive" : "active"}" ${can("admin") && user.id !== profile.id ? "" : "disabled"}>${user.active === false ? "Inactivo" : "Activo"}</button></div>`).join("")}`;
    table.querySelectorAll(".crmUsersRow[data-profile-id]").forEach(row => {
      const user = profiles.find(item => item.id === row.dataset.profileId);
      row.querySelector("select").onchange = async event => {
        if (!can("admin") || user.id === profile.id) return;
        user.role = event.target.value;
        if (connected()) await rest(`crm_profiles?id=eq.${encodeURIComponent(user.id)}`, { method: "PATCH", body: { role: user.role, updated_at: new Date().toISOString() }, prefer: "return=minimal" });
        else writeJSON(LOCAL_USERS_KEY, profiles);
        audit("user_role_updated", "user", user.id, `Cambió el rol de ${user.full_name} a ${ROLE_LABELS[user.role]}`, { role: user.role });
      };
      row.querySelector("button").onclick = async () => {
        if (!can("admin") || user.id === profile.id) return;
        user.active = user.active === false;
        if (connected()) await rest(`crm_profiles?id=eq.${encodeURIComponent(user.id)}`, { method: "PATCH", body: { active: user.active, updated_at: new Date().toISOString() }, prefer: "return=minimal" });
        else writeJSON(LOCAL_USERS_KEY, profiles);
        renderUsersSettings(host);
      };
    });
    const addForm = host.querySelector(".crmAddUser");
    addForm.querySelector("h3").textContent = connected() ? "Registrar usuario del equipo" : "Agregar usuario piloto";
    addForm.querySelector('[name="pin"]').placeholder = connected() ? "Contraseña temporal (mín. 6)" : "PIN (mínimo 4 dígitos)";
    addForm.hidden = !can("admin");
    addForm.onsubmit = async event => {
      event.preventDefault();
      const status = addForm.querySelector(".crmAddUserStatus");
      const data = Object.fromEntries(new FormData(addForm));
      status.textContent = "Creando…";
      try {
        if (connected()) {
          if (!data.email || data.pin.length < 6) throw new Error("Correo y contraseña temporal de al menos 6 caracteres.");
          const created = await authRequest("signup", { email: data.email, password: data.pin, data: { full_name: data.name } });
          if (created.user?.id && data.role !== "kam") {
            await new Promise(resolve => setTimeout(resolve, 350));
            await rest(`crm_profiles?id=eq.${encodeURIComponent(created.user.id)}`, { method: "PATCH", body: { role: data.role, updated_at: new Date().toISOString() }, prefer: "return=minimal" });
          }
          status.textContent = "Usuario registrado. Si Supabase exige confirmación, recibirá un correo.";
          setTimeout(async () => { profiles = await rest("crm_profiles?select=*&order=full_name.asc"); renderUsersSettings(host); }, 1200);
        } else {
          if (data.pin.length < 4) throw new Error("El PIN debe tener al menos 4 dígitos.");
          profiles.push({ id: `local-${uid()}`, full_name: data.name.trim(), email: data.email.trim(), role: data.role, active: true, local: true, pin_hash: await pinHash(data.pin) });
          writeJSON(LOCAL_USERS_KEY, profiles);
          status.textContent = "Usuario piloto creado.";
          addForm.reset();
          renderUsersSettings(host);
        }
      } catch (error) { status.textContent = error.message; }
    };
    const configForm = host.querySelector(".crmSupabaseConfig");
    configForm.onsubmit = event => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(configForm));
      const url = normalizeUrl(data.url);
      if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url) || !data.anonKey.trim()) {
        configForm.querySelector(".crmConfigStatus").textContent = "Revisa la URL y la clave pública.";
        return;
      }
      writeJSON(CONFIG_KEY, { url, anonKey: data.anonKey.trim() });
      localStorage.removeItem(SESSION_KEY);
      location.reload();
    };
    host.querySelector(".crmDisconnect")?.addEventListener("click", () => {
      if (!confirm("¿Desconectar la base compartida en este navegador? Los datos de Supabase no se eliminan.")) return;
      localStorage.removeItem(CONFIG_KEY);
      localStorage.removeItem(SESSION_KEY);
      location.reload();
    });
  }

  window.CRMUsers = {
    init, hydrate, mount, can, guard, audit, syncPipeline, syncTask, deleteTask, syncClient,
    profile: () => ({ ...profile }), profiles: () => profiles.map(user => ({ ...user })), connected
  };
})();

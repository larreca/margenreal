(() => {
  "use strict";

  const CONFIG_KEY = "yeppoCRMv10SupabaseConfig";
  const SESSION_KEY = "yeppoCRMv10SupabaseSession";
  const DEPLOYED_CONFIG = location.hostname === "larreca.github.io" && location.pathname.startsWith("/margenreal/yeppo-b2b-v10/")
    ? { url: "https://aevcjsfpmzzvoyqtbqfc.supabase.co", anonKey: "sb_publishable_14FEBbreIl2mgXJOLpRmFw_uLYy0Wvp" }
    : null;
  const CHUNK_SIZE = 100;
  const PAGE_SIZE = 1000;

  const read = key => {
    try { return JSON.parse(localStorage.getItem(key) || "null"); } catch (_) { return null; }
  };
  const config = () => DEPLOYED_CONFIG || read(CONFIG_KEY);
  const isConfigured = () => Boolean(config()?.url && config()?.anonKey);
  const hasSession = () => Boolean(read(SESSION_KEY)?.access_token);
  const positive = value => Math.max(0, Number(value) || 0);

  function dateInChile(value) {
    const date = new Date(value || "");
    if (Number.isNaN(date.valueOf())) return "";
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit"
    }).formatToParts(date);
    const part = type => parts.find(item => item.type === type)?.value || "";
    return `${part("year")}-${part("month")}-${part("day")}`;
  }

  function dailyFromOrders(orders) {
    const days = new Map();
    for (const order of orders) {
      if (/cancel|refund|void/i.test(String(order.financialStatus || order.financial_status || ""))) continue;
      const date = dateInChile(order.date || order.createdAt || order.created_at);
      if (!date) continue;
      const row = days.get(date) || { date, orders: 0, sales: 0 };
      row.orders++;
      row.sales += positive(order.total ?? order.amount);
      days.set(date, row);
    }
    return [...days.values()].sort((a, b) => a.date.localeCompare(b.date)).map(row => ({
      ...row, aov: row.orders ? row.sales / row.orders : 0
    }));
  }

  function normalize(raw) {
    const data = raw?.payload || raw?.data || raw;
    if (!data || typeof data !== "object") throw new Error("Archivo Shopify inválido.");
    const recentOrders = Array.isArray(data.recentOrders) ? data.recentOrders : [];
    const sales7 = Array.isArray(data.sales7) && data.sales7.length ? data.sales7 : dailyFromOrders(recentOrders);
    return {
      generatedAt: data.generatedAt || new Date().toISOString(),
      source: data.source || "ChatGPT Shopify B2B",
      scope: "b2b_only",
      recentOrders,
      sales7,
      customers: Array.isArray(data.customers) ? data.customers : [],
      products: Array.isArray(data.products) ? data.products : []
    };
  }

  async function accessToken() {
    const settings = config();
    let session = read(SESSION_KEY);
    if (!settings?.url || !settings?.anonKey || !session?.access_token) {
      throw new Error("Conecta Supabase e inicia sesión desde Configuración > Usuarios y KAM.");
    }
    if (Number(session.expires_at || 0) > Math.floor(Date.now() / 1000) + 60) return session.access_token;
    if (!session.refresh_token) throw new Error("La sesión compartida venció. Vuelve a ingresar al CRM.");
    const response = await fetch(`${settings.url.replace(/\/+$/, "")}/auth/v1/token?grant_type=refresh_token`, {
      method: "POST",
      headers: { apikey: settings.anonKey, Authorization: `Bearer ${settings.anonKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: session.refresh_token })
    });
    if (!response.ok) throw new Error("La sesión compartida venció. Vuelve a ingresar al CRM.");
    const refreshed = await response.json();
    session = { ...session, ...refreshed, expires_at: refreshed.expires_at || Math.floor(Date.now() / 1000) + (refreshed.expires_in || 3600) };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session.access_token;
  }

  async function request(path, method = "GET", body) {
    const settings = config();
    const headers = {
      apikey: settings.anonKey,
      Authorization: `Bearer ${await accessToken()}`,
      "Content-Type": "application/json"
    };
    if (method === "POST") headers.Prefer = "resolution=merge-duplicates,return=minimal";
    const response = await fetch(`${settings.url.replace(/\/+$/, "")}/rest/v1/${path}`, {
      method, headers, body: body === undefined ? undefined : JSON.stringify(body)
    });
    const text = await response.text();
    let result;
    try { result = text ? JSON.parse(text) : null; } catch (_) { result = null; }
    if (!response.ok) {
      if (response.status === 404 || result?.code === "PGRST205") throw new Error("Faltan las tablas Shopify en Supabase. Ejecuta la migración del CRM.");
      if (response.status === 401) throw new Error("La sesión compartida venció. Vuelve a ingresar al CRM.");
      if (response.status === 403 || result?.code === "42501") throw new Error("Solo un administrador o supervisor activo puede publicar datos Shopify.");
      throw new Error(result?.message || result?.hint || `Supabase respondió ${response.status}`);
    }
    return result;
  }

  async function upsert(table, rows, conflict) {
    for (let i = 0; i < rows.length; i += CHUNK_SIZE) {
      await request(`${table}?on_conflict=${encodeURIComponent(conflict)}`, "POST", rows.slice(i, i + CHUNK_SIZE));
    }
  }

  async function pages(table, select, order = "") {
    const rows = [];
    for (let offset = 0;; offset += PAGE_SIZE) {
      const path = `${table}?select=${select}${order ? `&order=${order}` : ""}&limit=${PAGE_SIZE}&offset=${offset}`;
      const batch = await request(path);
      rows.push(...(batch || []));
      if (!batch || batch.length < PAGE_SIZE) break;
    }
    return rows;
  }

  async function publish(raw) {
    if (!isConfigured()) return { shared: false, reason: "Conecta Supabase para compartir la carga con otros equipos." };
    const data = normalize(raw);
    if (!data.recentOrders.length && !data.sales7.length && !data.customers.length && !data.products.length) {
      throw new Error("No hay datos Shopify para compartir.");
    }
    const existing = await request("crm_shopify_sync?select=generated_at&id=eq.main&limit=1");
    const previous = Date.parse(existing?.[0]?.generated_at || "") || 0;
    const incoming = Date.parse(data.generatedAt) || 0;
    if (previous && incoming && incoming < previous) {
      throw new Error("El archivo es anterior a la última carga compartida. Usa una actualización más reciente.");
    }
    const orders = data.recentOrders.map(order => ({ order_id: String(order.id || order.name || ""), payload: order, generated_at: data.generatedAt })).filter(row => row.order_id);
    const sales = data.sales7.map(row => ({
      date: String(row.date || "").slice(0, 10), orders: positive(row.orders),
      sales: positive(row.sales ?? row.totalSales), aov: positive(row.aov ?? row.averageOrderValue), generated_at: data.generatedAt
    })).filter(row => /^\d{4}-\d{2}-\d{2}$/.test(row.date));
    const customers = data.customers.map(customer => ({
      customer_id: String(customer.shopifyId || customer.customerId || customer.id || customer.email || ""), payload: customer, generated_at: data.generatedAt
    })).filter(row => row.customer_id);
    const products = data.products.map(product => ({
      sku: String(product.sku || ""), payload: product, generated_at: data.generatedAt
    })).filter(row => row.sku);
    await upsert("crm_shopify_orders", orders, "order_id");
    await upsert("crm_shopify_sales_daily", sales, "date");
    await upsert("crm_shopify_customers", customers, "customer_id");
    await upsert("crm_shopify_products", products, "sku");
    await upsert("crm_shopify_sync", [{
      id: "main", generated_at: data.generatedAt, source: String(data.source).slice(0, 150),
      order_count: orders.length, sales_day_count: sales.length, customer_count: customers.length, product_count: products.length
    }], "id");
    return { shared: true, orders: orders.length, salesDays: sales.length, customers: customers.length, products: products.length };
  }

  async function load() {
    if (!isConfigured() || !hasSession()) return null;
    const meta = await request("crm_shopify_sync?select=*&id=eq.main&limit=1");
    if (!meta?.length) return null;
    const [orders, sales, customers, products] = await Promise.all([
      pages("crm_shopify_orders", "payload", "order_id.asc"),
      pages("crm_shopify_sales_daily", "date,orders,sales,aov", "date.asc"),
      pages("crm_shopify_customers", "payload", "customer_id.asc"),
      pages("crm_shopify_products", "payload", "sku.asc")
    ]);
    return {
      source: "Supabase compartido", scope: "b2b_only", generatedAt: meta[0].generated_at,
      recentOrders: orders.map(row => row.payload), sales7: sales,
      customers: customers.map(row => row.payload), products: products.map(row => row.payload)
    };
  }

  window.CRMShopifyCloud = { isConfigured, hasSession, normalize, publish, load };
})();

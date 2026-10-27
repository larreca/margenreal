"""Generate responsive, accessible decision diagrams for chapter 32.

Run from yeppo-academy: python scripts/generate-chapter32-visuals.py
All quantities represent teaching scenarios unless explicitly labelled as a study.
"""
from pathlib import Path
from xml.sax.saxutils import escape

OUT = Path(__file__).resolve().parents[1] / 'public/assets/chapter32'
INK = '#162251'
MUTED = '#4b5870'
PINK = '#f9e9f0'
BLUE = '#eaf0fa'
GREEN = '#e8f5ef'
AMBER = '#fff2df'
ROSE = '#c52c71'


def rect(x, y, w, h, fill, radius=20, stroke=None):
    border = f' stroke="{stroke}" stroke-width="2"' if stroke else ''
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{fill}"{border}/>'


def txt(x, y, value, size=24, weight=400, color=INK, anchor=None):
    a = f' text-anchor="{anchor}"' if anchor else ''
    return f'<text x="{x}" y="{y}" font-family="Arial,Helvetica,sans-serif" font-size="{size}" font-weight="{weight}" fill="{color}"{a}>{escape(str(value))}</text>'


def line(x1, y1, x2, y2, color='#b8c2d3', width=3):
    return f'<path d="M{x1} {y1} L{x2} {y2}" fill="none" stroke="{color}" stroke-width="{width}" stroke-linecap="round"/>'


def panel(x, y, w, h, fill, label, lines, big=None, mobile=False):
    pad = 24 if mobile else 26
    p = [rect(x, y, w, h, fill), txt(x+pad, y+42, label, 19 if mobile else 20, 700)]
    at = y+(88 if mobile else 100)
    if big:
        p.append(txt(x+pad, at, big, 38 if mobile else 42, 700, ROSE))
        at += 52 if mobile else 56
    for i, s in enumerate(lines):
        p.append(txt(x+pad, at+i*(29 if mobile else 34), s, 21 if mobile else 23, color=MUTED))
    return ''.join(p)


def svg(name, title, desc, body, mobile=False, height=700):
    width = 560 if mobile else 1200
    pieces = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-labelledby="t d">',
              f'<title id="t">{escape(title)}</title><desc id="d">{escape(desc)}</desc>', rect(0, 0, width, height, '#fff', 0)]
    if mobile:
        pieces += [txt(28, 59, title, 30, 700), txt(28, 96, 'CAPÍTULO 32 · EJERCICIO DIDÁCTICO', 18, 700, MUTED)]
    else:
        pieces += [txt(52, 73, title, 40, 700), txt(52, 114, 'CAPÍTULO 32 · EJERCICIO DIDÁCTICO', 20, 700, MUTED)]
    pieces += [body, '</svg>']
    file = OUT / f'32-{name}{"-mobile" if mobile else ""}.svg'
    file.write_text(''.join(pieces), encoding='utf-8')


def ribbon(message, mobile=False, y=None, color=GREEN):
    if mobile:
        y = y or 886
        words=message.split(); lines=['']
        for word in words:
            if len(lines[-1]+' '+word)>39: lines.append(word)
            else: lines[-1]=(lines[-1]+' '+word).strip()
        return rect(28,y,504,96,color)+''.join(txt(48,y+40+i*27,s,19,700) for i,s in enumerate(lines))
    y = y or 572
    return rect(52,y,1096,82,color)+txt(78,y+52,message,26,700)


def sequence(name, title, desc, cards, conclusion, mobile_only=False):
    # Cards are (label, two lines, highlight, background). The order carries a decision.
    desktop = []
    mobile = []
    for i, (label, lines, big, fill) in enumerate(cards):
        desktop.append(panel(52+i*280,158,256,355,fill,label,lines,big))
        mobile.append(panel(28,128+i*205,504,190,fill,label,lines,big,True))
    desktop.append(ribbon(conclusion))
    mobile.append(ribbon(conclusion,True,y=949))
    if not mobile_only:
        svg(name,title,desc,''.join(desktop),height=690)
    svg(name,title,desc,''.join(mobile),True,1057)


sequence('mision', 'De la pregunta al estante',
         'Una clienta busca SPF. El recorrido orienta por necesidad, permite comparar opciones y mide preguntas repetidas.',
         [('PREGUNTA', ['Busca protección','para uso diario'], 'SPF', BLUE),
          ('ORIENTACIÓN', ['Señal visible:', 'Protección UV'], 'Zona', PINK),
          ('COMPARACIÓN', ['Formato, uso, precio', 'y disponibilidad'], 'Elegir', GREEN),
          ('CONTROL', ['Cuenta preguntas', 'de ubicación'], 'KPI', AMBER)],
         'Mide si la nueva zona reduce la búsqueda repetida.')


def shelf(name, title, desc, empty=False):
    desktop = [rect(52,160,676,353,'#f8f9fc'), txt(77,205,'ESTANTE AUDITADO',20,700)]
    mobile = [rect(28,131,504,410,'#f8f9fc'), txt(50,171,'ESTANTE AUDITADO',19,700)]
    slots = 12 if empty else 20
    wrong = {2,7,10} if empty else {3,8,14,18}
    cols = 4 if empty else 5
    for i in range(slots):
        row,col=divmod(i,cols)
        x=77+col*(154 if empty else 126); y=232+row*(80 if empty else 66)
        color = '#ffe6e2' if i in wrong else '#dcefe8'
        label = 'HUECO' if empty and i in wrong else 'REVISAR' if i in wrong else 'OK'
        desktop += [rect(x,y,128 if empty else 105,61 if empty else 50,color,9),txt(x+10,y+39 if empty else y+33,label,17,700,INK)]
        mx=50+col*(117 if empty else 94); my=192+row*(98 if empty else 80)
        mobile += [rect(mx,my,102 if empty else 79,75 if empty else 60,color,9),txt(mx+8,my+45 if empty else my+36,label,16 if empty else 15,700,INK)]
    if empty:
        desktop += [panel(754,160,394,353,AMBER,'BRECHA VISUAL',['3 ÷ 12 = 25 %','En trastienda: 25 u','Confirma reservas y lote'], '3 huecos')]
        mobile += [panel(28,566,504,272,AMBER,'BRECHA VISUAL',['3 ÷ 12 = 25 %','Trastienda: 25 u; revisar','reservas y lotes antes'], '3 huecos',True)]
        final='Estante vacío no equivale a stock vendible cero.'
    else:
        desktop += [panel(754,160,394,353,BLUE,'PLAN VS. REAL',['16 ÷ 20 = 80 %','Cuatro desviaciones:','SKU, facing o posición'], '80 %')]
        mobile += [panel(28,566,504,272,BLUE,'PLAN VS. REAL',['16 ÷ 20 = 80 %','Fotografía real y causa','de cuatro desviaciones'], '80 %',True)]
        final='Registra causa, responsable y foto de corrección.'
    svg(name,title,desc,''.join(desktop)+ribbon(final),height=690)
    svg(name,title,desc,''.join(mobile)+ribbon(final,True,y=863),True,971)


shelf('planograma','Planograma vs. estante real',
      'Veinte posiciones auditadas: dieciséis conformes y cuatro desviaciones. Cumplimiento 80 por ciento.')
shelf('reposicion','Tres huecos visibles de doce',
      'Doce posiciones, tres vacías: 25 por ciento de huecos. Hay 25 unidades en trastienda, pero se revisan reservas antes de reponer.', True)


sequence('recorrido','Recorrido sin barreras',
         'Esquema conceptual sin escala: acceso libre, pared protagonista, comparación por necesidad y caja sin obstaculizar circulación.',
         [('ENTRADA', ['Paso despejado','y orientación'], 'Acceso', BLUE),
          ('PARED', ['Novedad relevante','fuera del acceso'], 'Foco', PINK),
          ('CATEGORÍA', ['Compara según','misión de compra'], 'Elegir', GREEN),
          ('CAJA', ['Complemento útil','sin congestionar'], 'Cierre', AMBER)],
         'Valida medidas reales, evacuación y accesibilidad.',mobile_only=True)


def price():
    d = [panel(52,163,520,348,PINK,'FLEJE · 50 ML',['Precio al público: $15.990','PPUM: $31.980 / 100 ml','Cálculo: 15.990 ÷ 50 × 100'],'$15.990'),
         panel(601,163,547,348,AMBER,'CAJA / POS',['Marca $17.990: hay conflicto','No cobrar más que lo exhibido','Corrige fleje y sistema'],'$17.990'),
         ribbon('Mismo SKU, tamaño, precio final y PPUM visible.')]
    m = [panel(28,129,504,334,PINK,'FLEJE · 50 ML',['Precio: $15.990','PPUM: $31.980 / 100 ml','15.990 ÷ 50 × 100'],'$15.990',True),
         panel(28,484,504,322,AMBER,'CAJA / POS',['Marca $17.990','No cobrar precio mayor','Corrige etiqueta y caja'],'$17.990',True),
         ribbon('Revisa SKU, precio y PPUM.',True,y=831)]
    svg('precios','El fleje y la caja deben coincidir','Ejemplo de protector cosmético de 50 ml: precio final 15.990 pesos y PPUM 31.980 pesos por 100 ml; caja 17.990 pesos es una discrepancia.',''.join(d),height=690)
    svg('precios','El fleje y la caja deben coincidir','Ejemplo de protector cosmético de 50 ml: precio final 15.990 pesos y PPUM 31.980 pesos por 100 ml; caja 17.990 pesos es una discrepancia.',''.join(m),True,939)


price()


sequence('tester','Tester seguro: 4 decisiones',
         'No compartir aplicador. Revisar estado y trazabilidad, usar método higiénico, suspender ante alteración o piel lesionada.',
         [('REVISAR', ['Etiqueta, lote, olor','y estado del envase'], '1', BLUE),
          ('DISPENSAR', ['Sin tocar piel;','aplicador nuevo'], '2', PINK),
          ('OBSERVAR', ['Evitar piel irritada','o lesionada'], '3', GREEN),
          ('RETIRAR', ['Alterado o sin','control de apertura'], '4', AMBER)],
         'Un aplicador de un solo uso no garantiza riesgo cero.',mobile_only=True)


sequence('adyacencia','Una rutina, una lógica',
         'Adyacencia didáctica: limpiar, hidratar y proteger según preferencias individuales. No agrupar tres exfoliantes como rutina básica.',
         [('MISIÓN', ['Rutina simple según','tipo y tolerancia'], 'Cliente', BLUE),
          ('PASO 1', ['Limpieza adecuada','sin sobrecargar'], 'Limpiar', PINK),
          ('PASO 2', ['Hidratación según','necesidad'], 'Hidratar', GREEN),
          ('PASO 3', ['Fotoprotección','según ficha'], 'SPF', AMBER)],
         'No conviertas tres exfoliantes en una rutina básica.')


def evaluation():
    d = [panel(52,155,343,363,BLUE,'ANTES',['16 de 20 posiciones','correctamente ubicadas'], '80 %'),
         panel(425,155,343,363,GREEN,'DESPUÉS',['19 de 20 posiciones','correctamente ubicadas'], '95 %'),
         panel(798,155,350,363,AMBER,'CAMBIO',['+15 puntos porcentuales','Ticket: $20 mil → $21 mil','Promo simultánea'], '+5 %'),
         ribbon('El ticket creció; la causa no está aislada.')]
    m = [panel(28,127,504,193,BLUE,'ANTES',['16 de 20 posiciones'], '80 %',True),
         panel(28,337,504,193,GREEN,'DESPUÉS',['19 de 20 posiciones'], '95 %',True),
         panel(28,547,504,285,AMBER,'CAMBIO',['+15 puntos porcentuales','Ticket $20 mil → $21 mil','Promo simultánea: no atribuir'], '+5 %',True),
         ribbon('Compara con un control.',True,y=855)]
    svg('medicion','Cumplimiento ≠ causalidad','Cumplimiento visual sube de 80 a 95 por ciento, una mejora de 15 puntos porcentuales. Ticket sube 5 por ciento con promoción simultánea.',''.join(d),height=690)
    svg('medicion','Cumplimiento ≠ causalidad','Cumplimiento visual sube de 80 a 95 por ciento, una mejora de 15 puntos porcentuales. Ticket sube 5 por ciento con promoción simultánea.',''.join(m),True,960)


evaluation()
print('Generated 14 new SVGs; two existing desktop diagrams are reused from', OUT)

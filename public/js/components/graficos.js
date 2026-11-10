/* ============================================================
   TURQUESA HUB · GRÁFICOS
   SVG/HTML sencillos y accesibles, sin bibliotecas externas.
   ============================================================ */
window.TH = window.TH || {};

(function () {
  const esc = (s) => TH.util.esc(s);

  TH.graficos = {
    /** Barras horizontales: items = [{etiqueta, valor(0-100), color?, sufijo?}] */
    barras(items, opciones) {
      const o = opciones || {};
      const max = o.max || Math.max(100, ...items.map(i => i.valor || 0));
      return '<div class="grafico-barras" role="img" aria-label="' + esc(o.aria || 'Gráfico de barras') + '">' + items.map(i =>
        '<div class="grafico-barras__fila"><span class="truncate" title="' + esc(i.etiqueta) + '">' + esc(i.etiqueta) + '</span>' +
        '<div class="progreso progreso--lg" aria-hidden="true"><div class="progreso__barra" style="width:' + TH.util.pct(i.valor || 0, max) + '%; background:' + (i.color || 'var(--th-turquesa)') + '"></div></div>' +
        '<span class="text-right" style="font-weight:600">' + esc(i.valor == null ? '—' : i.valor + (i.sufijo != null ? i.sufijo : (o.sufijo != null ? o.sufijo : '%'))) + '</span></div>').join('') + '</div>';
    },

    /** Anillo con porcentaje */
    donut(pct, opciones) {
      const o = opciones || {}; const r = 44, c = 2 * Math.PI * r; const v = TH.util.clamp(pct || 0, 0, 100);
      const size = o.size || 120;
      return '<div class="donut" role="img" aria-label="' + esc(o.aria || (v + ' por ciento')) + '"><svg width="' + size + '" height="' + size + '" viewBox="0 0 110 110">' +
        '<circle cx="55" cy="55" r="' + r + '" fill="none" stroke="var(--th-tinte-gris)" stroke-width="12"/>' +
        '<circle cx="55" cy="55" r="' + r + '" fill="none" stroke="' + (o.color || 'var(--th-turquesa)') + '" stroke-width="12" stroke-linecap="round" stroke-dasharray="' + (c * v / 100).toFixed(1) + ' ' + c.toFixed(1) + '" transform="rotate(-90 55 55)"/>' +
        '<text x="55" y="60" text-anchor="middle" font-size="22" font-weight="700" font-family="Poppins, Segoe UI, Calibri, sans-serif" fill="var(--th-texto)">' + v + '%</text></svg>' + (o.etiqueta ? '<span class="texto-sm texto-2">' + esc(o.etiqueta) + '</span>' : '') + '</div>';
    },

    /** Radar de seis dimensiones: items = [{etiqueta, valor(0-100)}] */
    radar(items, opciones) {
      const o = opciones || {}; const n = items.length; const cx = 190, cy = 150, R = 95;
      const punto = (i, v) => { const a = (Math.PI * 2 * i / n) - Math.PI / 2; return [cx + Math.cos(a) * R * v / 100, cy + Math.sin(a) * R * v / 100]; };
      const anillos = [25, 50, 75, 100].map(v => '<polygon points="' + items.map((_, i) => punto(i, v).map(x => x.toFixed(1)).join(',')).join(' ') + '" fill="none" stroke="var(--th-borde)" stroke-width="1"/>').join('');
      const ejes = items.map((_, i) => { const p = punto(i, 100); return '<line x1="' + cx + '" y1="' + cy + '" x2="' + p[0].toFixed(1) + '" y2="' + p[1].toFixed(1) + '" stroke="var(--th-borde)" stroke-width="1"/>'; }).join('');
      const poly = '<polygon points="' + items.map((it, i) => punto(i, it.valor == null ? 0 : it.valor).map(x => x.toFixed(1)).join(',')).join(' ') + '" fill="rgba(23,162,184,0.22)" stroke="var(--th-turquesa-profundo)" stroke-width="2"/>';
      const puntos = items.map((it, i) => { const p = punto(i, it.valor == null ? 0 : it.valor); return '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="4" fill="var(--th-turquesa-profundo)"/>'; }).join('');
      const etiquetas = items.map((it, i) => { const p = punto(i, 124); const anchor = Math.abs(p[0] - cx) < 10 ? 'middle' : (p[0] > cx ? 'start' : 'end'); return '<text x="' + p[0].toFixed(1) + '" y="' + (p[1] + 4).toFixed(1) + '" text-anchor="' + anchor + '" font-size="11" fill="var(--th-texto-2)">' + esc(it.etiqueta) + '</text>'; }).join('');
      return '<svg viewBox="0 0 380 300" width="100%" style="max-width:' + (o.max || 420) + 'px;margin:auto;display:block" role="img" aria-label="' + esc(o.aria || 'Gráfico radial por dimensión') + '">' + anillos + ejes + poly + puntos + etiquetas + '</svg>';
    },

    /** Barras verticales simples: items = [{etiqueta, valor}] */
    columnas(items, opciones) {
      const o = opciones || {}; const max = Math.max(1, ...items.map(i => i.valor)); const w = 48, gap = 18, h = 140;
      const ancho = items.length * (w + gap) + gap;
      return '<svg viewBox="0 0 ' + ancho + ' 190" width="100%" style="max-width:' + ancho + 'px" role="img" aria-label="' + esc(o.aria || 'Gráfico de columnas') + '">' + items.map((it, i) => {
        const alto = Math.round(h * it.valor / max); const x = gap + i * (w + gap);
        return '<rect x="' + x + '" y="' + (h - alto + 10) + '" width="' + w + '" height="' + alto + '" rx="6" fill="' + (it.color || 'var(--th-turquesa)') + '"/>' +
          '<text x="' + (x + w / 2) + '" y="' + (h - alto + 2) + '" text-anchor="middle" font-size="12" font-weight="600" fill="var(--th-texto)">' + esc(it.valor) + '</text>' +
          '<text x="' + (x + w / 2) + '" y="172" text-anchor="middle" font-size="11" fill="var(--th-texto-2)">' + esc(it.etiqueta) + '</text>';
      }).join('') + '</svg>';
    }
  };
})();

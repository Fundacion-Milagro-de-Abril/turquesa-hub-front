/* ============================================================
   TURQUESA HUB · COMPONENTES DE INTERFAZ
   Funciones puras que devuelven HTML (cadenas) + utilidades con estado
   (modal, toast). Todo el texto dinámico pasa por TH.util.esc.
   ============================================================ */
window.TH = window.TH || {};

(function () {
const esc = (s) => TH.util.esc(s);

TH.ui = {
  /* ---------- Iconos (trazos simples, coherentes, 24x24) ---------- */
  iconos: {
    inicio: '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    edificio: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3"/>',
    persona: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    personas: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0 1 14 0"/><circle cx="17" cy="9" r="3"/><path d="M22 19a5.5 5.5 0 0 0-6-5"/>',
    escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    lupa: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    diagnostico: '<path d="M9 3h6l1 2h3v16H5V5h3z"/><path d="M9 12l2 2 4-4"/>',
    plan: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4M16 2v4M3 10h18M8 15h3M13 15h3"/>',
    formacion: '<path d="M2 8l10-4 10 4-10 4z"/><path d="M6 10v5c0 2 3 3 6 3s6-1 6-3v-5"/><path d="M22 8v6"/>',
    biblioteca: '<path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z"/>',
    sello: '<circle cx="12" cy="10" r="6"/><path d="M8.5 15.5L7 22l5-3 5 3-1.5-6.5"/>',
    reporte: '<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
    documento: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h8"/>',
    config: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    evidencia: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    check: '<path d="M5 12l5 5L20 7"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    flecha: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    flechaIzq: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    mas: '<path d="M12 5v14M5 12h14"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/>',
    alerta: '<path d="M12 3l10 18H2z"/><path d="M12 10v4M12 17h.01"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    salir: '<path d="M10 17l5-5-5-5M15 12H3M21 4v16"/>',
    imprimir: '<path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="7"/>',
    reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    mariposa: '<path d="M12 6v14"/><path d="M12 9c-2-4-7-5-9-2 0 4 4 5 6 5-3 1-5 4-3 6 3 1 6-2 6-6"/><path d="M12 9c2-4 7-5 9-2 0 4-4 5-6 5 3 1 5 4 3 6-3 1-6-2-6-6"/>',
    historial: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5M12 7v5l3 2"/>',
    editar: '<path d="M4 20h4l10-10-4-4L4 16z"/><path d="M12 8l4 4"/>',
    descargar: '<path d="M12 3v12M7 10l5 5 5-5M4 20h16"/>',
    estrella: '<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z"/>',
    tablero: '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
    tabla: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 4v16"/>',
    movil: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>'
  },
  icono(nombre, clase) {
    const d = this.iconos[nombre] || this.iconos.info;
    return '<svg class="icono ' + (clase || '') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + d + '</svg>';
  },

  /* ---------- Etiquetas de estado ---------- */
  badge(texto, tipo) { return '<span class="badge badge--' + (tipo || 'neutro') + '">' + esc(texto) + '</span>'; },
  badgeCatalogo(lista, id) { const x = TH.util.catalogo(lista, id); return this.badge(x ? x.nombre : (id || '—'), x ? x.badge : 'neutro'); },
  badgeEstadoOrg(estado) { return estado === 'activa' ? this.badge('Activa', 'exito') : this.badge('Suspendida', 'error'); },
  badgeNivel(nivel) {
    if (!nivel) return this.badge('Sin datos', 'neutro');
    const m = { inicial: 'error', 'en-desarrollo': 'alerta', consolidado: 'info', avanzado: 'exito' };
    return this.badge(nivel.nombre, m[nivel.id] || 'neutro');
  },
  referencial() { return '<span class="etiqueta etiqueta--referencial">' + esc(TH.data.AVISO_REFERENCIAL) + '</span>'; },

  /* ---------- Progreso ---------- */
  progreso(pct, opciones) {
    const o = opciones || {};
    const v = TH.util.clamp(Math.round(pct || 0), 0, 100);
    return '<div class="progreso-linea">' + (o.etiqueta ? '<span>' + esc(o.etiqueta) + '</span>' : '') +
      '<div class="progreso ' + (o.lg ? 'progreso--lg' : '') + '" role="progressbar" aria-valuenow="' + v + '" aria-valuemin="0" aria-valuemax="100" aria-label="' + esc(o.aria || o.etiqueta || 'Progreso') + '"><div class="progreso__barra ' + (o.color ? 'progreso__barra--' + o.color : '') + '" style="width:' + v + '%"></div></div>' +
      (o.sinValor ? '' : '<span class="progreso-linea__valor">' + v + '%</span>') + '</div>';
  },

  /* ---------- KPI y tarjetas ---------- */
  kpi(label, valor, nota, acento) {
    return '<div class="kpi ' + (acento ? 'kpi--acento' : '') + '"><span class="kpi__label">' + esc(label) + '</span><span class="kpi__valor">' + esc(valor) + '</span>' + (nota ? '<span class="kpi__nota">' + esc(nota) + '</span>' : '') + '</div>';
  },
  siguientePaso(titulo, texto, ruta, cta) {
    return '<div class="siguiente-paso"><div class="grow"><h3>' + esc(titulo) + '</h3><p>' + esc(texto) + '</p></div><a class="btn btn--inverso shrink-0" href="#' + esc(ruta) + '">' + esc(cta || 'Continuar') + ' ' + this.icono('flecha') + '</a></div>';
  },

  /* ---------- Encabezados, migas, stepper ---------- */
  encabezado(titulo, desc, acciones) {
    return '<div class="encabezado-pagina"><div><h1>' + esc(titulo) + '</h1>' + (desc ? '<p class="encabezado-pagina__desc">' + desc + '</p>' : '') + '</div>' + (acciones ? '<div class="encabezado-pagina__acciones">' + acciones + '</div>' : '') + '</div>';
  },
  migas(items) {
    return '<nav aria-label="Ubicación"><ol class="migas">' + items.map((it, i) => '<li>' + (it.ruta && i < items.length - 1 ? '<a href="#' + esc(it.ruta) + '">' + esc(it.texto) + '</a>' : '<span aria-current="page">' + esc(it.texto) + '</span>') + '</li>').join('') + '</ol></nav>';
  },
  stepper(pasos, actual, vertical) {
    return '<ol class="stepper ' + (vertical ? 'stepper--vertical' : '') + '" aria-label="Pasos del proceso">' + pasos.map((p, i) => {
      const cls = i < actual ? 'es-completo' : (i === actual ? 'es-actual' : '');
      const txt = typeof p === 'string' ? p : p.texto;
      const corto = typeof p === 'string' ? String(i + 1) : (p.corto || String(i + 1));
      return '<li class="' + cls + '" data-corto="' + esc(corto) + '" ' + (i === actual ? 'aria-current="step"' : '') + '>' + (vertical ? '<div><strong>' + esc(txt) + '</strong>' + (p.desc ? '<div class="texto-2 texto-sm">' + esc(p.desc) + '</div>' : '') + '</div>' : esc(txt)) + '</li>';
    }).join('') + '</ol>';
  },
  tabs(items, activo, accion) {
    return '<div class="tabs" role="tablist">' + items.map(t => '<button type="button" role="tab" aria-selected="' + (t.id === activo) + '" data-action="' + esc(accion) + '" data-tab="' + esc(t.id) + '">' + esc(t.texto) + (t.n != null ? ' <span class="badge badge--neutro badge--sin-punto">' + t.n + '</span>' : '') + '</button>').join('') + '</div>';
  },

  /* ---------- Alertas y estados ---------- */
  alerta(tipo, titulo, texto) {
    const ic = { info: 'info', exito: 'check', alerta: 'alerta', error: 'alerta', neutra: 'info' }[tipo] || 'info';
    return '<div class="alerta alerta--' + tipo + '" role="' + (tipo === 'error' ? 'alert' : 'status') + '">' + this.icono(ic) + '<div>' + (titulo ? '<strong>' + esc(titulo) + '</strong>' : '') + texto + '</div></div>';
  },
  vacio(titulo, texto, cta, icono) {
    return '<div class="vacio"><div class="icono-caja icono-caja--lg">' + this.icono(icono || 'info', 'icono--lg') + '</div><h3>' + esc(titulo) + '</h3><p>' + esc(texto) + '</p>' + (cta || '') + '</div>';
  },
  cargando(texto) { return '<div class="cargando"><span class="spinner" aria-hidden="true"></span> ' + esc(texto || 'Cargando…') + '</div>'; },
  descargar(nombre, contenido, tipo) {
    const blob = new Blob([contenido], { type: tipo || 'text/plain;charset=utf-8' }); const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = nombre; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  },
  accesoDenegado(mensaje) {
    const rol = TH.auth.rol(); const inicio = rol ? (TH.util.catalogo(TH.data.catalogos.rolesSistema, rol) || {}).inicio : '/';
    return '<div class="vacio"><div class="icono-caja icono-caja--lg icono-caja--naranja">' + this.icono('escudo', 'icono--lg') + '</div><h3>Sin acceso a esta sección</h3><p>' + esc(mensaje || 'Tu cuenta no tiene acceso a este espacio.') + '</p><a class="btn btn--primario" href="#' + esc(inicio || '/') + '">Ir a mi espacio</a></div>';
  },
  /** Lista de referencias bibliográficas a partir de ids F-nn (TH.data.fuentes) */
  referencias(ids) {
    const f = (TH.data.fuentes || {});
    const items = (ids || []).map(id => f[id] ? '<li id="ref-' + esc(id) + '"><span class="texto-2">[' + esc(id) + ']</span> ' + esc(f[id].cita) + (f[id].url ? ' <a href="' + esc(f[id].url) + '" target="_blank" rel="noopener">Consultar</a>' : '') + (f[id].estadoNombre ? ' <span class="etiqueta">' + esc(f[id].estadoNombre) + '</span>' : '') + '</li>' : '<li>[' + esc(id) + '] Referencia no registrada</li>');
    return items.length ? '<ol class="referencias texto-sm">' + items.join('') + '</ol>' : '<p class="texto-2 texto-sm">Sin referencias registradas.</p>';
  },
  /** Aplica errores {campo: mensaje} a un formulario */
  mostrarErrores(form, errores) {
    let primero = null;
    Object.keys(errores || {}).forEach(k => { const el = form.querySelector('[name="' + k + '"]'); const campo = (el && el.closest('.campo')) || form.querySelector('[data-campo="' + k + '"]'); if (campo) { campo.classList.add('es-invalido'); const e = campo.querySelector('.campo__error'); if (e) e.textContent = errores[k]; } if (!primero && el) primero = el; });
    if (primero) primero.focus();
  },

  /** Estado de carga de un formulario o botón durante una operación asíncrona: deshabilita el envío y muestra un indicador. */
  ocupado(el, activo, texto) {
    if (!el) return;
    const esForm = el.tagName === 'FORM';
    const btn = esForm ? (el.querySelector('[type=submit]') || (el.id ? document.querySelector('button[form="' + el.id + '"]') : null)) : el;
    if (esForm) { if (activo) el.setAttribute('aria-busy', 'true'); else el.removeAttribute('aria-busy'); }
    if (!btn) return;
    if (activo) { btn.dataset.textoOriginal = btn.innerHTML; btn.disabled = true; btn.setAttribute('aria-busy', 'true'); btn.innerHTML = '<span class="spinner" aria-hidden="true"></span> ' + TH.util.esc(texto || 'Procesando…'); }
    else { btn.disabled = false; btn.removeAttribute('aria-busy'); if (btn.dataset.textoOriginal != null) { btn.innerHTML = btn.dataset.textoOriginal; delete btn.dataset.textoOriginal; } }
  },
  /** Muestra el resultado fallido de una operación: errores por campo en el formulario (si lo hay) y aviso general. */
  errorApi(r, form) {
    const mensaje = (r && r.error) || 'No fue posible completar la operación.';
    if (form) { form.querySelectorAll('.campo').forEach(c => c.classList.remove('es-invalido')); TH.ui.mostrarErrores(form, Object.assign({ general: mensaje }, (r && r.errores) || {})); }
    if (!form || !form.querySelector('[data-campo="general"]')) TH.ui.toast(mensaje, 'error', 6000);
  },
  /** Ejecuta una operación asíncrona con estado de carga y manejo de errores; devuelve el resultado. */
  async ejecutar(el, fn, opciones) {
    const o = opciones || {}; TH.ui.ocupado(el, true, o.texto);
    let r; try { r = await fn(); } catch (e) { console.error(e); r = { ok: false, error: 'Ocurrió un error inesperado.' }; }
    TH.ui.ocupado(el, false);
    if (!r || !r.ok) { TH.ui.errorApi(r, el && el.tagName === 'FORM' ? el : null); return r; }
    if (o.exito) TH.ui.toast(o.exito, 'exito', o.ms);
    return r;
  },

  guardadoAuto(iso) { return '<span class="texto-xs texto-3" aria-live="polite">' + (iso ? 'Guardado automáticamente · ' + new Date(iso).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }) : 'Los cambios se guardan automáticamente') + '</span>'; },

  /* ---------- Formularios ---------- */
  campo(opts) {
    const o = opts; const id = o.id || o.name;
    let control = '';
    const base = 'id="' + esc(id) + '" name="' + esc(o.name) + '" ' + (o.required ? 'required aria-required="true"' : '') + (o.disabled ? ' disabled' : '') + (o.placeholder ? ' placeholder="' + esc(o.placeholder) + '"' : '') + (o.ayuda ? ' aria-describedby="' + esc(id) + '-ayuda"' : '') + (o.attrs || '');
    if (o.tipo === 'select') {
      control = '<select class="select" ' + base + '>' + (o.placeholder ? '<option value="">' + esc(o.placeholder) + '</option>' : '') +
        (o.opciones || []).map(op => { const v = typeof op === 'string' ? op : op.id; const t = typeof op === 'string' ? op : op.nombre; return '<option value="' + esc(v) + '" ' + (String(o.valor) === String(v) ? 'selected' : '') + '>' + esc(t) + '</option>'; }).join('') + '</select>';
    } else if (o.tipo === 'textarea') {
      control = '<textarea class="textarea" ' + base + ' rows="' + (o.rows || 4) + '">' + esc(o.valor || '') + '</textarea>';
    } else {
      control = '<input class="input" type="' + (o.tipo || 'text') + '" ' + base + ' value="' + esc(o.valor == null ? '' : o.valor) + '"' + (o.min != null ? ' min="' + o.min + '"' : '') + (o.max != null ? ' max="' + o.max + '"' : '') + (o.step != null ? ' step="' + o.step + '"' : '') + '>';
    }
    return '<div class="campo" data-campo="' + esc(o.name) + '"><label class="campo__label" for="' + esc(id) + '">' + esc(o.label) + (o.required ? '<span class="req" aria-hidden="true">*</span>' : '') + '</label>' + control +
      (o.ayuda ? '<span class="campo__ayuda" id="' + esc(id) + '-ayuda">' + esc(o.ayuda) + '</span>' : '') + '<span class="campo__error" role="alert"></span></div>';
  },
  check(name, label, checked, value) {
    return '<label class="check"><input type="checkbox" name="' + esc(name) + '" value="' + esc(value == null ? '1' : value) + '" ' + (checked ? 'checked' : '') + '> <span>' + label + '</span></label>';
  },
  /** Lee un formulario a objeto; checkboxes múltiples → arreglo */
  datosFormulario(form) {
    const fd = new FormData(form); const out = {};
    fd.forEach((v, k) => { if (k in out) { out[k] = [].concat(out[k], v); } else out[k] = v; });
    form.querySelectorAll('input[type=checkbox]').forEach(c => { if (c.name && !(c.name in out)) out[c.name] = c.type === 'checkbox' && form.querySelectorAll('input[name="' + c.name + '"]').length > 1 ? [] : ''; });
    return out;
  },
  /** Validación mínima accesible: marca campos requeridos vacíos y correos inválidos */
  validar(form, reglas) {
    let ok = true; let primero = null;
    form.querySelectorAll('.campo').forEach(c => c.classList.remove('es-invalido'));
    form.querySelectorAll('[required]').forEach(el => {
      const campo = el.closest('.campo'); const vacio = el.type === 'checkbox' ? !el.checked : !String(el.value || '').trim();
      if (vacio) { ok = false; if (campo) { campo.classList.add('es-invalido'); campo.querySelector('.campo__error').textContent = 'Este campo es obligatorio.'; } if (!primero) primero = el; }
      else if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) { ok = false; if (campo) { campo.classList.add('es-invalido'); campo.querySelector('.campo__error').textContent = 'Escribe un correo válido.'; } if (!primero) primero = el; }
    });
    (reglas || []).forEach(r => {
      const el = form.querySelector('[name="' + r.campo + '"]'); if (!el) return;
      const msg = r.validar(el.value, form); if (msg) { ok = false; const campo = el.closest('.campo'); if (campo) { campo.classList.add('es-invalido'); campo.querySelector('.campo__error').textContent = msg; } if (!primero) primero = el; }
    });
    if (primero) primero.focus();
    return ok;
  },

  /* ---------- Tablas ---------- */
  tabla(columnas, filas, opciones) {
    const o = opciones || {};
    if (!filas.length) return this.vacio(o.vacioTitulo || 'Sin resultados', o.vacioTexto || 'No hay registros que coincidan con los filtros.', '', 'lupa');
    return '<div class="tabla-contenedor" tabindex="0" role="region" aria-label="' + esc(o.caption || 'Tabla de datos') + '"><table class="tabla"><caption class="sr-only">' + esc(o.caption || 'Tabla de datos') + '</caption><thead><tr>' + columnas.map(c => '<th scope="col" class="' + (c.clase || '') + '">' + esc(c.titulo) + '</th>').join('') + '</tr></thead><tbody>' +
      filas.map(f => '<tr>' + columnas.map(c => '<td class="' + (c.clase || '') + '">' + (c.render ? c.render(f) : esc(f[c.campo])) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
  },
  dl(pares) { return '<dl class="dl">' + pares.map(p => '<dt>' + esc(p[0]) + '</dt><dd>' + (p[2] ? p[1] : esc(p[1])) + '</dd>').join('') + '</dl>'; },

  /* ---------- Historial ---------- */
  historial(items) {
    if (!items || !items.length) return '<p class="texto-2 texto-sm">Sin actuaciones registradas.</p>';
    return '<ul class="historial">' + items.slice().reverse().map(h => '<li><div class="historial__fecha">' + esc(TH.util.fecha(h.fecha)) + ' · ' + esc(h.actor || h.actorId || '') + '</div><div>' + esc(h.accion) + '</div></li>').join('') + '</ul>';
  },

  /* ---------- Evidencias ---------- */
  evidencia(e, acciones) {
    const ext = (e.nombre.split('.').pop() || 'DOC').toUpperCase().slice(0, 4);
    return '<div class="evidencia"><div class="evidencia__icono" aria-hidden="true">' + esc(ext) + '</div><div class="grow"><div class="evidencia__nombre">' + esc(e.nombre) + '</div><div class="evidencia__meta">' + esc(e.tipo) + ' · ' + esc(TH.util.fecha(e.fecha)) + (e.simulada ? ' · evidencia simulada (sin archivo real)' : '') + '</div>' + (e.descripcion ? '<div class="texto-sm mt-1">' + esc(e.descripcion) + '</div>' : '') + '</div>' + (acciones || '') + '</div>';
  },

  /* ---------- Modal ---------- */
  modal(opts) {
    const root = document.getElementById('modal-root');
    const o = opts; const previo = document.activeElement;
    root.innerHTML = '<div class="modal-fondo" data-modal-fondo><div class="modal ' + (o.grande ? 'modal--lg' : '') + '" role="dialog" aria-modal="true" aria-labelledby="modal-titulo"><div class="modal__encabezado"><h2 id="modal-titulo">' + esc(o.titulo) + '</h2><button type="button" class="modal-cerrar" data-modal-cerrar aria-label="Cerrar">' + this.icono('x') + '</button></div><div class="modal__cuerpo">' + o.cuerpo + '</div>' + (o.pie !== false ? '<div class="modal__pie">' + (o.pie || '<button type="button" class="btn btn--secundario" data-modal-cerrar>Cerrar</button>') + '</div>' : '') + '</div></div>';
    document.body.classList.add('modal-abierto');
    const cerrar = () => { root.innerHTML = ''; document.body.classList.remove('modal-abierto'); document.removeEventListener('keydown', onKey); if (previo && previo.focus) previo.focus(); if (o.alCerrar) o.alCerrar(); };
    const onKey = (e) => { if (e.key === 'Escape') cerrar(); if (e.key === 'Tab') { const f = root.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'); if (!f.length) return; const a = f[0], z = f[f.length - 1]; if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } } };
    document.addEventListener('keydown', onKey);
    root.querySelectorAll('[data-modal-cerrar]').forEach(b => b.addEventListener('click', cerrar));
    root.querySelector('[data-modal-fondo]').addEventListener('click', (e) => { if (e.target.hasAttribute('data-modal-fondo')) cerrar(); });
    const foco = root.querySelector('input, select, textarea, button:not(.modal-cerrar)'); if (foco) foco.focus();
    if (o.alAbrir) o.alAbrir(root);
    TH.ui._cerrarModal = cerrar;
    return { cerrar, root };
  },
  cerrarModal() { if (TH.ui._cerrarModal) TH.ui._cerrarModal(); },
  confirmar(opts) {
    return new Promise(resolve => {
      this.modal({ titulo: opts.titulo || 'Confirmar', cuerpo: '<p>' + opts.texto + '</p>',
        pie: '<button type="button" class="btn btn--secundario" data-modal-cerrar>' + esc(opts.cancelar || 'Cancelar') + '</button><button type="button" class="btn ' + (opts.peligro ? 'btn--peligro' : 'btn--primario') + '" data-confirmar>' + esc(opts.aceptar || 'Confirmar') + '</button>',
        alAbrir: (root) => { root.querySelector('[data-confirmar]').addEventListener('click', () => { resolve(true); TH.ui.cerrarModal(); }); },
        alCerrar: () => resolve(false) });
    });
  },

  /* ---------- Notificaciones ---------- */
  toast(texto, tipo, ms) {
    const root = document.getElementById('toast-root'); const el = document.createElement('div');
    el.className = 'toast toast--' + (tipo || 'info'); el.setAttribute('role', 'status');
    el.innerHTML = this.icono(tipo === 'exito' ? 'check' : tipo === 'error' ? 'alerta' : 'info') + '<span>' + esc(texto) + '</span>';
    root.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity 200ms'; setTimeout(() => el.remove(), 220); }, ms || 3200);
  }
};
})();

/* ============================================================
   TURQUESA HUB · ENRUTADOR (hash)
   Rutas lógicas idénticas a las de producción (#/organizacion/plan-accion
   → /organizacion/plan-accion). Cada ruta privada declara los roles que
   pueden verla y, opcionalmente, un permiso. Estas guardas son de
   experiencia de usuario: la autorización real la impone el backend en
   cada servicio. Las rutas de módulos reservados no se registran.
   ============================================================ */
window.TH = window.TH || {};

TH.router = (function () {
  const rutas = {};
  let actual = null;

  function parsear() {
    const hash = location.hash || '#/';
    const [ruta, query] = hash.replace(/^#/, '').split('?');
    const params = {};
    (query || '').split('&').filter(Boolean).forEach(p => { const [k, v] = p.split('='); params[decodeURIComponent(k)] = decodeURIComponent(v || ''); });
    return { ruta: ruta || '/', params };
  }

  let renderEnCurso = 0;
  /** Renderizado: en entorno remoto carga primero los datos del espacio (TH.remoto.cargar) mostrando un estado de
   *  carga; si la carga falla, muestra el error con opción de reintentar. En desarrollo es síncrono. */
  async function render() {
    const token = ++renderEnCurso;
    const app = document.getElementById('app');
    if (TH.config.esRemoto && TH.remoto) {
      const prev = parsear(); const defPrev = rutas[prev.ruta];
      if (defPrev && !(defPrev.roles && defPrev.roles.length && !TH.auth.puede(defPrev.roles))) {
        const t = setTimeout(() => { if (token === renderEnCurso) app.innerHTML = '<div class="cargando" role="status" aria-live="polite"><span class="spinner" aria-hidden="true"></span> Cargando…</div>'; }, 150);
        const r = await TH.remoto.cargar({ ruta: prev.ruta, params: prev.params });
        clearTimeout(t);
        if (token !== renderEnCurso) return;
        if (!r.ok && r.codigo !== 'NO_AUTORIZADO') {
          app.innerHTML = TH.layout.publico(TH.ui.vacio('No fue posible cargar la información', TH.util.esc(r.error || 'Error de conexión.'), '<button type="button" class="btn btn--primario" data-action="reintentar">Reintentar</button>', 'alerta'), prev.ruta);
          return;
        }
      }
    }
    renderSincrono();
  }
  function renderSincrono() {
    const { ruta, params } = parsear();
    const def = rutas[ruta];
    const app = document.getElementById('app');
    if (!def) {
      app.innerHTML = TH.layout.publico(TH.ui.vacio('Página no encontrada', 'La dirección solicitada no existe en Turquesa Hub.', '<a class="btn btn--primario" href="#/">Ir al inicio</a>', 'lupa'), ruta);
      document.title = 'No encontrado · Turquesa Hub';
      return;
    }
    const ctx = { ruta, params, rol: TH.auth.rol(), usuario: TH.auth.usuario(), org: TH.auth.organizacion(), titulo: def.titulo || '', ancho: !!def.ancho };
    actual = ctx;
    let html;
    if (def.roles && def.roles.length && !TH.auth.puede(def.roles)) {
      if (!ctx.rol) { location.hash = '#/acceso?volver=' + encodeURIComponent(ruta + (Object.keys(params).length ? '?' + Object.keys(params).map(k => k + '=' + encodeURIComponent(params[k])).join('&') : '')); return; }
      html = TH.layout.app(TH.ui.accesoDenegado('Esta sección no corresponde a tu perfil.'), ctx);
    } else if (def.permiso && !TH.auth.tienePermiso(def.permiso)) {
      html = TH.layout.app(TH.ui.accesoDenegado('No tienes el permiso necesario para esta sección (' + def.permiso + ').'), ctx);
    } else {
      let contenido;
      try { contenido = def.render(ctx); }
      catch (e) { console.error('[TH.router] Error al renderizar', ruta, e); contenido = TH.ui.alerta('error', 'No fue posible mostrar esta sección', 'Ocurrió un error inesperado. Intenta de nuevo o contacta al soporte de Turquesa Hub.'); }
      html = def.layout === 'ninguno' ? contenido : def.layout === 'publico' ? TH.layout.publico(contenido, ruta) : TH.layout.app(contenido, ctx);
    }
    app.innerHTML = html;
    document.title = (def.titulo ? def.titulo + ' · ' : '') + 'Turquesa Hub';
    if (!params.sinScroll) window.scrollTo({ top: 0 });
    if (def.despues) { try { def.despues(ctx); } catch (e) { console.error(e); } }
    document.dispatchEvent(new CustomEvent('th:render', { detail: ctx }));
  }

  return {
    registrar(ruta, def) { rutas[ruta] = def; },
    registrarVarias(obj) { Object.keys(obj).forEach(r => rutas[r] = obj[r]); },
    rutas,
    ir(ruta) { if (location.hash === '#' + ruta) render(); else location.hash = '#' + ruta; },
    refrescar() { renderSincrono(); },
    /** Vuelve a cargar del servidor (remoto) y renderiza. */
    recargar() { if (TH.remoto) TH.remoto.invalidar(); return render(); },
    actual() { return actual; },
    parsear,
    iniciar() { window.addEventListener('hashchange', render); render(); }
  };
})();

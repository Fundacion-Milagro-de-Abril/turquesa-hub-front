/* ============================================================
   TURQUESA HUB · CLIENTE HTTP
   Único punto de acceso a la API (docs/API_CONTRACT.md). JSON por
   defecto, multipart para archivos, credenciales en cookie HttpOnly,
   tiempo máximo, normalización de errores y manejo de 401 (sesión
   caducada → se limpia la caché de sesión y se redirige a /acceso).
   ============================================================ */
window.TH = window.TH || {};

TH.http = (function () {
  let csrf = null;
  function url(ruta) { return TH.config.api.baseUrl + ruta; }
  function normalizarError(r, datos) {
    const e = (datos && datos.error) || {};
    const mensajes = { 401: 'Tu sesión no está activa. Ingresa de nuevo.', 403: 'No tienes permiso para esta operación.', 404: 'El recurso no existe o no pertenece a tu organización.', 409: 'Ya existe un registro con esos datos.', 413: 'El archivo supera el tamaño permitido.', 429: 'Demasiados intentos. Espera unos minutos e inténtalo de nuevo.' };
    return { ok: false, estado: r.status, codigo: e.codigo || (r.status === 401 ? 'NO_AUTORIZADO' : r.status === 403 ? 'PROHIBIDO' : r.status === 404 ? 'NO_ENCONTRADO' : r.status === 409 ? 'DUPLICADO' : r.status === 400 ? 'VALIDACION' : 'ERROR'), error: e.mensaje || mensajes[r.status] || 'No fue posible completar la operación.', errores: e.campos || null };
  }
  async function ejecutar(metodo, ruta, opciones) {
    const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), TH.config.api.timeoutMs);
    const headers = Object.assign({ Accept: 'application/json' }, opciones.headers || {});
    if (csrf && metodo !== 'GET') headers['X-CSRF-Token'] = csrf;
    try {
      const r = await fetch(url(ruta), { method: metodo, credentials: 'include', headers, body: opciones.body, signal: ctrl.signal });
      const datos = r.status === 204 ? {} : await r.json().catch(() => ({}));
      if (r.headers && typeof r.headers.get === 'function') { const c = r.headers.get('X-CSRF-Token'); if (c) csrf = c; }
      if (!r.ok) {
        const err = normalizarError(r, datos);
        if (r.status === 401 && TH.auth && TH.auth.sesion()) { TH.auth._limpiarSesion(); TH.ui && TH.ui.toast(err.error, 'error'); if (TH.router) TH.router.ir('/acceso'); }
        return err;
      }
      return Object.assign({ ok: true }, datos);
    } catch (e) {
      return { ok: false, codigo: 'RED', error: e.name === 'AbortError' ? 'El servicio tardó demasiado en responder. Inténtalo de nuevo.' : 'No hay conexión con el servicio. Revisa tu red e inténtalo de nuevo.' };
    } finally { clearTimeout(t); }
  }
  return {
    /** JSON. Devuelve { ok, ...datos } o { ok:false, codigo, error, errores, estado }. */
    llamar(metodo, ruta, cuerpo) { return ejecutar(metodo, ruta, { headers: cuerpo !== undefined ? { 'Content-Type': 'application/json' } : {}, body: cuerpo !== undefined ? JSON.stringify(cuerpo) : undefined }); },
    get(ruta) { return ejecutar('GET', ruta, {}); },
    /** multipart/form-data (archivos). `campos` es un objeto; `archivo` un File opcional bajo la clave `nombreArchivo`. */
    subir(ruta, campos, archivo, nombreArchivo) {
      const fd = new FormData(); Object.keys(campos || {}).forEach(k => { if (campos[k] != null) fd.append(k, campos[k]); });
      if (archivo) fd.append(nombreArchivo || 'archivo', archivo, archivo.name);
      return ejecutar('POST', ruta, { body: fd });
    },
    /** Descarga binaria (CSV/PDF generados en servidor). */
    async descargar(ruta, nombre) {
      try { const r = await fetch(url(ruta), { credentials: 'include' }); if (!r.ok) return { ok: false, error: 'No fue posible generar el archivo.' }; const b = await r.blob(); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = nombre; a.click(); URL.revokeObjectURL(a.href); return { ok: true }; }
      catch (e) { return { ok: false, error: 'No hay conexión con el servicio.' }; }
    },
    _csrf(v) { csrf = v; }
  };
})();

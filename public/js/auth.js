/* ============================================================
   TURQUESA HUB · AUTENTICACIÓN Y SESIÓN
   Interfaz única (TH.auth) sobre dos adaptadores:
     - TH.authAdaptadores.http  → producción. Llama a la API (docs/API_CONTRACT.md §1).
                                  La sesión vive en una cookie HttpOnly emitida por el backend;
                                  el frontend solo conserva en sessionStorage el perfil devuelto por GET /auth/me.
     - TH.authAdaptadores.local → desarrollo y pruebas automatizadas. Verifica contraseñas contra
                                  un hash con sal (SHA-256 vía Web Crypto) guardado en el estado local.
   En ningún caso se guardan contraseñas en claro ni tokens en localStorage.
   La autorización real (qué puede ver cada organización y cada rol) la impone el backend;
   las guardas de este archivo son de experiencia de usuario.
   ============================================================ */
window.TH = window.TH || {};

(function () {
  const CLAVE_SESION = 'th-sesion';
  let sesionActual = null;

  /** La sesión en sessionStorage es solo una caché de presentación. En el adaptador local se contrasta con el
   *  registro de usuarios (rol, organización y permisos deben coincidir con la cuenta); en producción la autoridad
   *  es el backend (cookie HttpOnly + /auth/me) y toda ruta privada se autoriza en el servidor. */
  function sesionCoherente(p) {
    if (!p || !p.userId) return false;
    if (TH.config.auth.adaptador !== 'local') return true;
    const st = TH.store && TH.store.get(); if (!st || !st.usuarios) return true;
    const u = st.usuarios.find(x => x.id === p.userId);
    if (!u || u.rol !== p.rol || (u.orgId || null) !== (p.orgId || null)) return false;
    if (u.estado === 'suspendido') return false;
    const permisosUsuario = u.permisos || []; const permisosSesion = p.permisos || [];
    return permisosSesion.every(x => permisosUsuario.includes(x));
  }
  function leerSesion() {
    if (sesionActual) { if (sesionCoherente(sesionActual)) return sesionActual; sesionActual = null; try { sessionStorage.removeItem(CLAVE_SESION); } catch (_) { } return null; }
    try { const s = sessionStorage.getItem(CLAVE_SESION); if (s) { const p = JSON.parse(s); if ((!p.expira || Date.now() < p.expira) && sesionCoherente(p)) { sesionActual = p; return p; } sessionStorage.removeItem(CLAVE_SESION); } } catch (_) { }
    return null;
  }
  function guardarSesion(s) { sesionActual = s; try { if (s) sessionStorage.setItem(CLAVE_SESION, JSON.stringify(s)); else sessionStorage.removeItem(CLAVE_SESION); } catch (_) { } }

  /* ---------- Utilidades de contraseña ---------- */
  async function hash(texto) {
    if (window.crypto && crypto.subtle && window.TextEncoder) {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    // Respaldo para entornos de prueba sin Web Crypto (no apto para producción).
    let h = 0x811c9dc5; for (let i = 0; i < texto.length; i++) { h ^= texto.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return 'fnv-' + h.toString(16);
  }
  function sal() { const a = new Uint8Array(12); if (window.crypto && crypto.getRandomValues) crypto.getRandomValues(a); else for (let i = 0; i < a.length; i++) a[i] = Math.floor(Math.random() * 256); return Array.from(a).map(b => b.toString(16).padStart(2, '0')).join(''); }
  async function credencial(clave, s) { const saltValue = s || sal(); return { sal: saltValue, hash: await hash(saltValue + ':' + clave), alg: 'sha256-sal' }; }

  function validarClave(clave) {
    const c = TH.config.auth.clave; const errores = [];
    if (!clave || clave.length < c.longitudMinima) errores.push('al menos ' + c.longitudMinima + ' caracteres');
    if (c.requiereNumero && !/\d/.test(clave || '')) errores.push('un número');
    if (c.requiereLetra && !/[A-Za-zÁÉÍÓÚáéíóúÑñ]/.test(clave || '')) errores.push('una letra');
    return errores.length ? 'La contraseña debe tener ' + errores.join(', ') + '.' : '';
  }

  /* ============================================================
     ADAPTADOR LOCAL (desarrollo / pruebas)
     ============================================================ */
  const local = {
    nombre: 'local',
    async registrarOrganizacion(datos) {
      const r = TH.api.organizaciones.registrar(datos);
      if (!r.ok) return r;
      const cred = await credencial(datos.clave);
      TH.store.update(s => { const u = s.usuarios.find(x => x.id === r.usuario.id); u.credencial = cred; u.correoVerificado = true; u.estado = 'activo'; }, 'usuario');
      return { ok: true, usuario: r.usuario, org: r.org, verificacion: 'no-requerida-en-desarrollo' };
    },
    async ingresar(email, clave) {
      const u = TH.store.get().usuarios.find(x => (x.email || '').toLowerCase() === (email || '').trim().toLowerCase());
      if (!u) return { ok: false, error: 'Correo o contraseña incorrectos.' };
      if (u.estado === 'suspendido') return { ok: false, error: 'La cuenta está suspendida. Contacta a la Fundación Milagro de Abril.' };
      let valida = false;
      if (u.credencial) valida = (await hash(u.credencial.sal + ':' + clave)) === u.credencial.hash;
      else if (u.cuentaDePrueba && TH.config.esDesarrollo && TH.dev && TH.dev.claveCuentasDePrueba) { valida = clave === TH.dev.claveCuentasDePrueba; if (valida) { const cred = await credencial(clave); TH.store.update(s => { const x = s.usuarios.find(z => z.id === u.id); x.credencial = cred; delete x.cuentaDePrueba; }, 'usuario'); } }
      if (!valida) return { ok: false, error: 'Correo o contraseña incorrectos.' };
      if (u.correoVerificado === false) return { ok: false, error: 'Debes verificar tu correo antes de ingresar.', codigo: 'CORREO_NO_VERIFICADO' };
      const org = u.orgId ? TH.store.get().organizaciones.find(o => o.id === u.orgId) : null;
      if (org && org.estado === 'suspendida') return { ok: false, error: 'El acceso de la organización está suspendido. Contacta a la Fundación Milagro de Abril.' };
      guardarSesion({ userId: u.id, rol: u.rol, orgId: u.orgId || null, permisos: u.permisos || [], inicio: Date.now(), expira: Date.now() + TH.config.auth.sesionMinutos * 60000 });
      TH.store.update(s => { TH.api.historial.registrar(s, 'Inicio de sesión', 'usuario', u.id); }, 'sesion');
      return { ok: true, usuario: u };
    },
    async me() { const s = leerSesion(); if (!s) return null; return TH.store.get().usuarios.find(u => u.id === s.userId) || null; },
    async salir() { guardarSesion(null); return { ok: true }; },
    async solicitarVerificacion(email) { return { ok: true, mensaje: 'En desarrollo no se envían correos.' }; },
    async verificarCorreo(token) { return { ok: true }; },
    async solicitarRecuperacion(email) { return { ok: true }; },
    async restablecerClave(token, clave) { return { ok: false, error: 'La recuperación por correo requiere el servicio de producción.' }; },
    async cambiarClave(actual, nueva) {
      const u = await this.me(); if (!u) return { ok: false, error: 'Sin sesión.' };
      const r = await this.ingresar(u.email, actual); if (!r.ok) return { ok: false, error: 'La contraseña actual no es correcta.' };
      const e = validarClave(nueva); if (e) return { ok: false, error: e };
      const cred = await credencial(nueva); TH.store.update(s => { s.usuarios.find(x => x.id === u.id).credencial = cred; }, 'usuario'); return { ok: true };
    },
    async activarInvitacion(codigo, datos) {
      /* Antes de procesar cualquier dato: debe existir una base de información y autorización (aviso transitorio o política definitiva). */
      if (!TH.api.documentosLegales.baseRegistro()) return { ok: false, codigo: 'INFORMACION_NO_PUBLICADA', error: 'La activación aún no está habilitada: la Fundación Milagro de Abril no ha publicado el aviso de información y autorización de datos personales.' };
      const st = TH.store.get();
      const inv = st.invitaciones.find(i => i.codigo.toUpperCase() === (codigo || '').trim().toUpperCase());
      if (!inv) return { ok: false, error: 'El código de invitación no es válido o ya fue utilizado.' };
      if (inv.estado === 'activada') return { ok: false, error: 'Esta invitación ya fue activada. Ingresa con tu correo y contraseña.' };
      if (inv.expira && inv.expira < TH.util.hoy()) return { ok: false, error: 'La invitación expiró. Solicita una nueva a tu organización.' };
      const e = validarClave(datos.clave); if (e) return { ok: false, error: e };
      /* Autorización expresa sobre la misma base que el registro; nunca sobre borradores. */
      if (!datos.aceptaDatos) return { ok: false, error: 'Debes autorizar el tratamiento de tus datos personales.', errores: { aceptaDatos: 'Marca la casilla de autorización.' } };
      if (TH.api.documentosLegales.publicado('condiciones-uso') && !datos.aceptaCondiciones) return { ok: false, error: 'Debes aceptar las condiciones de uso.', errores: { aceptaCondiciones: 'Marca la casilla de aceptación.' } };
      const vd = TH.api.documentosLegales.verificarVersiones(datos); if (vd) return vd;
      if (st.usuarios.some(u => (u.email || '').toLowerCase() === inv.email.toLowerCase())) return { ok: false, error: 'Ya existe una cuenta con el correo de la invitación. Ingresa con tus credenciales.' };
      const cred = await credencial(datos.clave);
      const nuevo = { id: TH.util.id('usr-col'), nombre: (datos.nombre || inv.nombre).trim(), email: inv.email, rol: 'colaborador', orgId: inv.orgId, area: datos.area || '', estado: 'activo', correoVerificado: true, credencial: cred, consentimientos: TH.api.documentosLegales.consentimientosParaRegistro() };
      TH.store.update(s => { s.usuarios.push(nuevo); const i = s.invitaciones.find(x => x.id === inv.id); i.estado = 'activada'; i.userId = nuevo.id; i.fechaActivacion = TH.util.hoy(); TH.api.historial.registrar(s, 'Invitación activada', 'invitacion', inv.id); }, 'invitacion');
      return { ok: true, usuario: nuevo };
    }
  };

  /* ============================================================
     ADAPTADOR HTTP (producción)
     Cada método corresponde a un endpoint de docs/API_CONTRACT.md §1.
     ============================================================ */
  const llamar = (m, r, c) => TH.http.llamar(m, r, c);
  const http = {
    nombre: 'http',
    async registrarOrganizacion(datos) { return llamar('POST', '/organizaciones', datos); },
    _abrir(usuario) { TH.store.vaciar(); guardarSesion({ userId: usuario.id, rol: usuario.rol, orgId: usuario.orgId || null, permisos: usuario.permisos || [], inicio: Date.now(), expira: Date.now() + TH.config.auth.sesionMinutos * 60000 }); TH.store.update(s => { TH.util.upsert(s.usuarios, usuario); }, 'sesion'); },
    async ingresar(email, clave) { const r = await llamar('POST', '/auth/login', { email, clave }); if (r.ok && r.usuario) this._abrir(r.usuario); return r; },
    async me() { const r = await llamar('GET', '/auth/me'); if (!r.ok || !r.usuario) { guardarSesion(null); return null; } this._abrir(r.usuario); return r.usuario; },
    async salir() { const r = await llamar('POST', '/auth/logout'); guardarSesion(null); TH.store.vaciar(); return r; },
    async solicitarVerificacion(email) { return llamar('POST', '/auth/verificacion/solicitar', { email }); },
    async verificarCorreo(token) { return llamar('POST', '/auth/verificacion/confirmar', { token }); },
    async solicitarRecuperacion(email) { return llamar('POST', '/auth/recuperacion/solicitar', { email }); },
    async restablecerClave(token, clave) { return llamar('POST', '/auth/recuperacion/restablecer', { token, clave }); },
    async cambiarClave(actual, nueva) { return llamar('POST', '/auth/clave', { actual, nueva }); },
    async activarInvitacion(codigo, datos) { const r = await llamar('POST', '/auth/invitaciones/activar', Object.assign({ codigo }, datos)); if (r.ok && r.usuario) this._abrir(r.usuario); return r; }
  };

  TH.authAdaptadores = { local, http };

  TH.auth = {
    get adaptador() { return TH.authAdaptadores[TH.config.auth.adaptador] || local; },
    validarClave,
    sesion: leerSesion,
    rol() { const s = leerSesion(); return s ? s.rol : null; },
    orgId() { const s = leerSesion(); return s ? s.orgId : null; },
    permisos() { const s = leerSesion(); return s ? (s.permisos || []) : []; },
    /** Permisos que ni siquiera la administración integral ('*') obtiene de forma implícita: las revisiones jurídica y
     *  psicosocial y la aprobación de documentos jurídicos solo las ejerce quien las tiene asignadas expresamente. */
    PERMISOS_EXCLUSIVOS: ['contenidos:revisar-juridica', 'contenidos:revisar-psicosocial', 'formacion:revisar-juridica', 'formacion:revisar-psicosocial', 'documentos:aprobar'],
    tienePermiso(p) { const s = leerSesion(); if (!s) return false; const lista = s.permisos || []; if (lista.includes(p)) return true; if (s.rol === 'fma' && lista.includes('*') && !this.PERMISOS_EXCLUSIVOS.includes(p)) return true; return false; },
    usuario() { const s = leerSesion(); if (!s) return null; const st = TH.store.get(); return (st.usuarios || []).find(u => u.id === s.userId) || { id: s.userId, nombre: s.nombre || '', rol: s.rol, orgId: s.orgId }; },
    organizacion() { const id = this.orgId(); if (!id) return null; return (TH.store.get().organizaciones || []).find(o => o.id === id) || null; },
    puede(roles) { if (!roles || !roles.length) return true; const r = this.rol(); return !!r && roles.includes(r); },
    async registrarOrganizacion(d) { return this.adaptador.registrarOrganizacion(d); },
    async ingresar(email, clave) { return this.adaptador.ingresar(email, clave); },
    async salir() { const r = await this.adaptador.salir(); guardarSesion(null); return r; },
    async me() { return this.adaptador.me(); },
    async solicitarVerificacion(e) { return this.adaptador.solicitarVerificacion(e); },
    async verificarCorreo(t) { return this.adaptador.verificarCorreo(t); },
    async solicitarRecuperacion(e) { return this.adaptador.solicitarRecuperacion(e); },
    async restablecerClave(t, c) { return this.adaptador.restablecerClave(t, c); },
    async cambiarClave(a, n) { return this.adaptador.cambiarClave(a, n); },
    async activarInvitacion(c, d) { return this.adaptador.activarInvitacion(c, d); },
    /** Solo para pruebas automatizadas en entorno de desarrollo: abre sesión sin contraseña. */
    _limpiarSesion() { guardarSesion(null); },
    /** Al arrancar: en producción confirma con /auth/me la sesión de la cookie (la caché local no es autoridad). */
    async restaurar() { if (!TH.config.esRemoto) return leerSesion(); const u = await this.adaptador.me(); return u ? leerSesion() : null; },
    _sesionDePrueba(userId) {
      if (!TH.config.esDesarrollo) return { ok: false, error: 'No disponible en producción.' };
      const u = TH.store.get().usuarios.find(x => x.id === userId); if (!u) return { ok: false, error: 'Usuario de prueba no encontrado.' };
      guardarSesion({ userId: u.id, rol: u.rol, orgId: u.orgId || null, permisos: u.permisos || [], inicio: Date.now(), expira: Date.now() + 3600000 });
      return { ok: true, usuario: u };
    }
  };
})();

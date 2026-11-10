/* ============================================================
   TURQUESA HUB · ADAPTADOR DE SUPABASE (producción)
   Tercer adaptador de TH.auth (junto a 'local' y 'http'). Se activa cuando config/env.produccion.js
   define supabaseUrl (ver TH.config.auth.adaptador).

   Qué hace:
     - Inicio y cierre de sesión, recuperación y cambio de contraseña con Supabase Auth.
     - Alta por invitación: signUp envía el código y la versión del aviso en los metadatos; el trigger
       handle_new_user de la base de datos valida TODO (el navegador no decide nada).
     - Resuelve el rol y la organización LEYENDO la base de datos (perfiles y organizaciones, protegidas por RLS).
       El navegador nunca envía organizacion_id ni rol.
     - La sesión de Supabase se guarda en sessionStorage (se pierde al cerrar la pestaña), nunca en localStorage.

   Mientras los módulos de negocio no estén conectados (F02 en adelante), las rutas privadas muestran
   "disponible próximamente" en vez de operar con datos que no se guardan.
   ============================================================ */
window.TH = window.TH || {};

(function () {
  if (TH.config.auth.adaptador !== 'supabase') return;
  if (!window.supabase || !window.supabase.createClient) { console.error('[TH] Falta la biblioteca supabase-js.'); return; }

  const { url, key } = TH.config.supabase;
  const sb = window.supabase.createClient(url, key, {
    auth: {
      storage: window.sessionStorage,     // no localStorage: la sesión muere al cerrar la pestaña
      flowType: 'pkce',                   // los enlaces de correo vuelven con ?code=..., compatible con el enrutador por hash
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });
  TH.sb = sb;

  /* La base usa 'admin_fma'; la interfaz de rc4 usa 'fma'. */
  const ROL_UI = { admin_fma: 'fma', organizacion: 'organizacion', colaborador: 'colaborador' };
  const MSG_SIN_ACCESO = 'Tu cuenta no tiene acceso activo. Contacta a la Fundación Milagro de Abril.';
  const MSG_CREDENCIALES = 'Correo o contraseña incorrectos.';   // el mismo mensaje exista o no el correo

  /** Lee perfil y organización desde la base (RLS). Devuelve null si no hay acceso activo. */
  async function cargarUsuario(authUser) {
    const { data: p, error } = await sb.from('perfiles')
      .select('id, organizacion_id, rol, nombre, cargo, area, telefono, estado').eq('id', authUser.id).maybeSingle();
    if (error || !p || p.estado !== 'activo') return null;
    let org = null;
    if (p.organizacion_id) {
      // Si la organización está suspendida, RLS no la devuelve: la cuenta queda sin acceso.
      const r = await sb.from('organizaciones').select('*').eq('id', p.organizacion_id).maybeSingle();
      if (r.error || !r.data || r.data.estado !== 'activa') return null;
      org = r.data;
    }
    const rol = ROL_UI[p.rol];
    const usuario = {
      id: p.id, nombre: p.nombre, email: authUser.email, rol, orgId: p.organizacion_id || null,
      cargo: p.cargo || '', area: p.area || '', telefono: p.telefono || '', estado: 'activo', correoVerificado: true,
      permisos: rol === 'fma' ? ['*'] : []
    };
    return { usuario, org };
  }

  function abrir({ usuario, org }) {
    TH.store.vaciar();
    TH.authInterno.guardarSesion({
      userId: usuario.id, rol: usuario.rol, orgId: usuario.orgId, permisos: usuario.permisos, nombre: usuario.nombre,
      inicio: Date.now(), expira: Date.now() + TH.config.auth.sesionMinutos * 60000
    });
    TH.store.update(s => {
      TH.util.upsert(s.usuarios, usuario);
      if (org) TH.util.upsert(s.organizaciones, {
        id: org.id, nombre: org.nombre, tipoIdentificacion: org.tipo_identificacion, identificacion: org.identificacion,
        emailInstitucional: org.email_institucional, telefono: org.telefono, sector: org.sector, tamano: org.tamano,
        departamento: org.departamento, municipio: org.municipio, responsable: org.responsable, cargo: org.cargo_responsable,
        estado: org.estado
      });
    }, 'sesion');
  }

  function cerrarLocal() { TH.authInterno.guardarSesion(null); TH.store.vaciar(); if (TH.remoto) TH.remoto.invalidar(); }

  /** Traduce los errores del alta (los lanza handle_new_user) a mensajes claros. */
  function mensajeAlta(error) {
    const m = (error && error.message) || '';
    if (/REGISTRO_NO_DISPONIBLE/.test(m)) return { codigo: 'INFORMACION_NO_PUBLICADA', error: 'La activación aún no está habilitada: la Fundación Milagro de Abril no ha publicado el aviso de tratamiento de datos.' };
    if (/AVISO_NO_ACEPTADO/.test(m)) return { codigo: 'AVISO_NO_ACEPTADO', error: 'Debes aceptar la versión vigente del aviso de tratamiento de datos.' };
    if (/INVITACION_INVALIDA/.test(m)) return { codigo: 'INVITACION_INVALIDA', error: 'La invitación no es válida: revisa el código y que uses el correo al que fue enviada, o pide una nueva.' };
    if (/NOMBRE_REQUERIDO/.test(m)) return { codigo: 'NOMBRE_REQUERIDO', error: 'Indica tu nombre.' };
    if (/already registered|already been registered|user_already_exists/i.test(m)) return { codigo: 'CUENTA_EXISTENTE', error: 'Ya existe una cuenta con ese correo. Ingresa con tus credenciales.' };
    if (/weak|password/i.test(m)) return { codigo: 'CLAVE_DEBIL', error: 'La contraseña no cumple los requisitos de seguridad.' };
    return { codigo: 'ERROR_ALTA', error: 'No fue posible activar la cuenta. Intenta de nuevo o contacta a la Fundación Milagro de Abril.' };
  }

  const adaptador = {
    nombre: 'supabase',

    /** No hay registro abierto de organizaciones: cada cuenta nace de una invitación. */
    async registrarOrganizacion() {
      return { ok: false, error: 'El registro de organizaciones es solo por invitación de la Fundación Milagro de Abril. Escríbenos para solicitarla.' };
    },

    async ingresar(email, clave) {
      const { data, error } = await sb.auth.signInWithPassword({ email: (email || '').trim(), password: clave });
      if (error) {
        if (error.code === 'email_not_confirmed') return { ok: false, error: 'Debes verificar tu correo antes de ingresar. Revisa tu bandeja de entrada.', codigo: 'CORREO_NO_VERIFICADO' };
        return { ok: false, error: MSG_CREDENCIALES };
      }
      const cargado = await cargarUsuario(data.user);
      if (!cargado) { await sb.auth.signOut(); cerrarLocal(); return { ok: false, error: MSG_SIN_ACCESO }; }
      abrir(cargado);
      sb.rpc('registrar_inicio_sesion').then(() => { }, () => { });   // auditoría: no debe frenar el ingreso
      return { ok: true, usuario: cargado.usuario };
    },

    /** Restaura la sesión al recargar: el rol y la organización se vuelven a leer de la base, no del navegador. */
    async me() {
      const { data } = await sb.auth.getSession();
      if (!data || !data.session) { cerrarLocal(); return null; }
      const cargado = await cargarUsuario(data.session.user);
      if (!cargado) { await sb.auth.signOut(); cerrarLocal(); return null; }
      abrir(cargado);
      return cargado.usuario;
    },

    async salir() { await sb.auth.signOut(); cerrarLocal(); return { ok: true }; },

    async solicitarVerificacion(email) {
      await sb.auth.resend({ type: 'signup', email: (email || '').trim(), options: { emailRedirectTo: location.origin + '/' } });
      return { ok: true };   // misma respuesta exista o no la cuenta
    },
    async verificarCorreo() { return { ok: true }; },   // Supabase confirma el correo al abrir el enlace (?code=)

    async solicitarRecuperacion(email) {
      await sb.auth.resetPasswordForEmail((email || '').trim(), { redirectTo: location.origin + '/#/recuperar-acceso?token=sb' });
      return { ok: true };   // misma respuesta exista o no la cuenta
    },
    /** El enlace del correo ya abrió una sesión de recuperación (supabase-js intercambia el ?code); aquí solo se fija la clave nueva. */
    async restablecerClave(_token, clave) {
      const { data } = await sb.auth.getSession();
      if (!data || !data.session) return { ok: false, error: 'El enlace venció o ya se usó. Solicita uno nuevo.' };
      const { error } = await sb.auth.updateUser({ password: clave });
      if (error) return { ok: false, error: /same/i.test(error.message) ? 'La nueva contraseña debe ser distinta de la actual.' : 'No fue posible cambiar la contraseña. Intenta de nuevo.' };
      await sb.auth.signOut(); cerrarLocal();
      return { ok: true };
    },
    async cambiarClave(actual, nueva) {
      const { data } = await sb.auth.getSession();
      if (!data || !data.session) return { ok: false, error: 'Sin sesión.' };
      const verif = await sb.auth.signInWithPassword({ email: data.session.user.email, password: actual });
      if (verif.error) return { ok: false, error: 'La contraseña actual no es correcta.' };
      const { error } = await sb.auth.updateUser({ password: nueva });
      return error ? { ok: false, error: 'No fue posible cambiar la contraseña.' } : { ok: true };
    },

    /** Alta por invitación. El trigger handle_new_user valida código, correo, vigencia y aviso; si algo falla, no se crea la cuenta. */
    async activarInvitacion(codigo, datos) {
      const aviso = TH.supabaseAviso && TH.supabaseAviso.version ? TH.supabaseAviso : await cargarAviso();
      if (!aviso) return { ok: false, codigo: 'INFORMACION_NO_PUBLICADA', error: 'La activación aún no está habilitada: la Fundación Milagro de Abril no ha publicado el aviso de tratamiento de datos.' };
      if (!datos.aceptaDatos) return { ok: false, error: 'Debes autorizar el tratamiento de tus datos personales.', errores: { aceptaDatos: 'Marca la casilla de autorización.' } };
      const e = TH.auth.validarClave(datos.clave); if (e) return { ok: false, error: e };
      const email = (datos.email || '').trim();
      if (!email) return { ok: false, error: 'Escribe el correo al que llegó la invitación.', errores: { email: 'Campo obligatorio.' } };
      const { data, error } = await sb.auth.signUp({
        email, password: datos.clave,
        options: {
          emailRedirectTo: location.origin + '/',
          data: { codigo_invitacion: (codigo || '').trim(), version_aviso: aviso.version, nombre: (datos.nombre || '').trim(), area: (datos.area || '').trim() }
        }
      });
      if (error) return Object.assign({ ok: false }, mensajeAlta(error));
      // Con confirmación de correo activa no hay sesión hasta que la persona abra el enlace.
      return { ok: true, usuario: { email, nombre: (datos.nombre || '').trim() }, verificacion: data && data.session ? 'no-requerida' : 'pendiente' };
    }
  };

  /** Aviso de tratamiento de datos publicado (lectura pública, protegida por RLS: solo se ve el publicado). */
  async function cargarAviso() {
    const { data, error } = await sb.from('avisos').select('version, titulo, texto, publicado_en').eq('estado', 'publicado').maybeSingle();
    TH.supabaseAviso = (!error && data) ? data : null;
    return TH.supabaseAviso;
  }
  TH.cargarAviso = cargarAviso;

  TH.authAdaptadores.supabase = adaptador;

  /* El enrutador espera a TH.remoto.cargar antes de pintar cada ruta. Con Supabase todavía no hay cargadores de módulos:
     solo se precarga el aviso en la pantalla de activación. */
  if (TH.remoto) {
    /* Cada pantalla que necesita datos registra aquí su cargador (ruta → función asíncrona); el enrutador lo espera antes de pintar. */
    TH.supabaseCargadores = {};
    TH.remoto.cargar = async function (ctx) {
      try {
        if (ctx && ctx.ruta === '/activar-invitacion') await cargarAviso();
        const f = ctx && TH.supabaseCargadores[ctx.ruta];
        if (f) await f(ctx);
      } catch (e) { console.error('[TH] Error al cargar datos', e); return { ok: false, error: 'No fue posible cargar la información. Intenta de nuevo.' }; }
      return { ok: true };
    };
    TH.remoto.activar = function () { };   // las mutaciones HTTP de rc4 no se activan
  }

  /* Rutas privadas: hasta que cada módulo se conecte a la base de datos, se informa en lugar de operar con datos que no se guardan. */
  (function reemplazarRutasPrivadas() {
    Object.keys(TH.router.rutas).forEach(function (r) {
      const def = TH.router.rutas[r];
      if (!def.roles || !def.roles.length) return;
      def.__render = def.render; def.__permiso = def.permiso; def.__despues = def.despues;   // se conservan para habilitar cada módulo cuando se conecte
      def.permiso = null;
      def.despues = null;
      def.render = function (ctx) {
        return '<section class="seccion" style="max-width:640px">' +
          TH.ui.vacio('Tu acceso está activo', 'Hola, ' + TH.util.esc((ctx.usuario && ctx.usuario.nombre) || '') + '. Los módulos de Turquesa Hub (autodiagnóstico, plan de acción y formación) se habilitarán próximamente.', '<button type="button" class="btn btn--secundario" data-action="salir">Cerrar sesión</button>', 'escudo') +
          '</section>';
      };
    });
  })();

  /** Devuelve a una ruta su pantalla original de rc4 (se usa al conectar cada módulo a la base de datos). */
  TH.supabaseHabilitar = function (ruta) {
    const d = TH.router.rutas[ruta]; if (!d || !d.__render) return;
    d.render = d.__render; d.permiso = d.__permiso; d.despues = d.__despues;
  };
})();

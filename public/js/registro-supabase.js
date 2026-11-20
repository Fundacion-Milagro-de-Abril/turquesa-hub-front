/* ============================================================
   TURQUESA HUB · REGISTRO POR ENLACE (F09, adaptador Supabase)
   Público:
     - #/registro?c=CÓDIGO   formulario de la organización. Solo aparece con un enlace vigente que comparte FMA;
                             sin enlace, #/registro explica cómo acceder.
     - #/verificar-correo     escribir el código de 6 números que llega al correo (registro e invitaciones).
   FMA:
     - #/fma/registros        crear, copiar y anular enlaces de registro; aprobar o rechazar organizaciones.
   Toda la validación la hace la base (trigger handle_new_user, RLS y funciones): estas pantallas solo la usan.
   Se ejecuta solo con el adaptador 'supabase'.
   ============================================================ */
window.TH = window.TH || {};

(function () {
  if (TH.config.auth.adaptador !== 'supabase' || !TH.sb) return;
  const sb = TH.sb; const esc = TH.util.esc; const cat = TH.data.catalogos; const ic = (n) => TH.ui.icono(n);
  const CONTACTO = 'sai@fundacionmilagrodeabril.org';
  const enlaceRegistro = (codigo) => location.origin + location.pathname.replace(/index\.html$/, '') + '#/registro?c=' + encodeURIComponent(codigo);
  const inicioDe = (rol) => (TH.util.catalogo(cat.rolesSistema, rol) || {}).inicio || '/';

  /* =================== Público: formulario de registro =================== */
  const reg = { codigo: '', vigente: false };
  TH.supabaseCargadores['/registro'] = async function (ctx) {
    reg.codigo = String(ctx.params.c || '').trim(); reg.vigente = false;
    if (!reg.codigo) return;
    const [v] = await Promise.all([sb.rpc('convocatoria_vigente', { p_codigo: reg.codigo }), TH.cargarAviso()]);
    if (v.error) throw v.error;
    reg.vigente = v.data === true;
  };

  function consentimiento() {
    const a = TH.supabaseAviso;
    if (!a) return { habilitado: false, html: TH.ui.alerta('alerta', 'Registro pendiente de habilitación', 'La Fundación Milagro de Abril aún no ha publicado el aviso de tratamiento de datos personales. Hasta entonces no es posible registrarse.') };
    return { habilitado: true, html: '<details class="ayuda mb-4"><summary>Leer el aviso completo (versión ' + esc(a.version) + ')</summary><div class="ayuda__cuerpo"><h4>' + esc(a.titulo) + '</h4><p style="white-space:pre-line">' + esc(a.texto) + '</p></div></details>' +
      TH.ui.check('aceptaDatos', 'Autorizo a Fundación Milagro de Abril el tratamiento de mis datos personales conforme al aviso de información y autorización (versión ' + esc(a.version) + ').', false) + '<div class="campo" data-campo="aceptaDatos"><span class="campo__error" role="alert"></span></div>' +
      '<p class="texto-xs texto-2">La autorización se registra con fecha y versión. No escribas datos sensibles ni información sobre casos de violencia.</p>' };
  }

  function registro(ctx) {
    if (!reg.codigo) return TH.publicoComoAcceder ? TH.publicoComoAcceder(ctx) : '';
    if (!reg.vigente) {
      return '<section class="seccion" style="max-width:640px">' + TH.ui.vacio('Este enlace de registro ya no está disponible',
        'Puede que haya vencido, que se hayan completado los cupos o que la Fundación lo haya cerrado. Pide un enlace nuevo a la Fundación Milagro de Abril.',
        '<div class="flex gap-3 wrap" style="justify-content:center"><a class="btn btn--primario" href="mailto:' + CONTACTO + '">Escribir a la Fundación</a><a class="btn btn--secundario" href="#/acceso">Ya tengo cuenta</a></div>', 'alerta') + '</section>';
    }
    const c = consentimiento();
    return '<section class="seccion" style="max-width:860px"><div class="seccion__eyebrow">Registro</div><h1>Registra tu organización</h1>' +
      '<p class="texto-2">Llena estos datos. Te enviaremos un <strong>código de 6 números</strong> a tu correo para confirmarlo, y la Fundación Milagro de Abril revisará el registro antes de darte acceso.</p>' +
      TH.ui.stepper(['Tus datos', 'Código del correo', 'Aprobación de la Fundación'], 0) +
      '<form class="card" data-form="registro-enlace" novalidate><input type="hidden" name="convocatoria" value="' + esc(reg.codigo) + '">' +
      '<fieldset><legend>1. La organización</legend><div class="form-fila">' +
      TH.ui.campo({ name: 'nombre', label: 'Nombre de la organización', required: true, attrs: ' autocomplete="organization" maxlength="200"' }) +
      TH.ui.campo({ name: 'tipoIdentificacion', label: 'Tipo de identificación', tipo: 'select', required: true, opciones: cat.tiposIdentificacion, valor: 'NIT', attrs: ' data-change="registro-tipo-id"' }) +
      TH.ui.campo({ name: 'identificacion', label: 'Número de identificación', placeholder: 'Ej.: 900123456-7', ayuda: 'Incluye el dígito de verificación (ej.: 900123456-7).', attrs: ' maxlength="60"' }) +
      TH.ui.campo({ name: 'sector', label: 'Sector', tipo: 'select', required: true, opciones: cat.sectores, placeholder: 'Selecciona' }) +
      TH.ui.campo({ name: 'tamano', label: 'Personas que trabajan o participan', tipo: 'select', required: true, opciones: cat.tamanos, placeholder: 'Selecciona' }) +
      TH.ui.campo({ name: 'departamento', label: 'Departamento', tipo: 'select', required: true, opciones: Object.keys(cat.departamentos), placeholder: 'Selecciona', attrs: ' data-change="registro-departamento"' }) +
      TH.ui.campo({ name: 'municipio', label: 'Municipio', tipo: 'select', required: true, opciones: [], placeholder: 'Primero elige el departamento' }) +
      '</div></fieldset>' +
      '<fieldset><legend>2. La persona responsable (tú)</legend><div class="form-fila">' +
      TH.ui.campo({ name: 'responsable', label: 'Nombre completo', required: true, attrs: ' autocomplete="name" maxlength="120"' }) +
      TH.ui.campo({ name: 'cargo', label: 'Cargo', tipo: 'select', required: true, opciones: cat.cargos, placeholder: 'Selecciona' }) +
      TH.ui.campo({ name: 'email', label: 'Correo', tipo: 'email', required: true, placeholder: 'nombre@organizacion.com', ayuda: 'Será tu usuario. Ahí te llegará el código de 6 números.', attrs: ' autocomplete="email"' }) +
      '<div></div>' +
      TH.ui.campo({ name: 'clave', label: 'Contraseña', tipo: 'password', required: true, ayuda: 'Mínimo ' + TH.config.auth.clave.longitudMinima + ' caracteres, con letras y números.', attrs: ' autocomplete="new-password"' }) +
      TH.ui.campo({ name: 'claveConfirmacion', label: 'Confirma la contraseña', tipo: 'password', required: true, attrs: ' autocomplete="new-password"' }) +
      '</div></fieldset>' +
      '<fieldset><legend>3. Autorización de datos</legend>' + c.html + '</fieldset>' +
      '<div class="campo" data-campo="general"><span class="campo__error" role="alert"></span></div>' +
      '<div class="flex gap-3 justify-end wrap"><a class="btn btn--terciario" href="#/acceso">Ya tengo cuenta</a><button type="submit" class="btn btn--primario"' + (c.habilitado ? '' : ' disabled aria-disabled="true"') + '>Registrar mi organización ' + ic('flecha') + '</button></div></form></section>';
  }

  /* =================== Público: código de 6 números =================== */
  function verificar(ctx) {
    const email = String(ctx.params.email || '').trim();
    return '<section class="seccion" style="max-width:560px" id="verificacion"><div class="seccion__eyebrow">Confirma tu correo</div><h1>Escribe tu código</h1>' +
      '<p class="texto-2">' + (email ? 'Te enviamos un código de <strong>6 números</strong> a <strong>' + esc(email) + '</strong>.' : 'Escribe tu correo y el código de <strong>6 números</strong> que te enviamos.') + ' Si no lo ves, revisa la carpeta de correo no deseado.</p>' +
      '<form class="card" data-form="verificar-codigo" novalidate>' +
      (email ? '<input type="hidden" name="email" value="' + esc(email) + '">' : TH.ui.campo({ name: 'email', label: 'Correo', tipo: 'email', required: true, attrs: ' autocomplete="email"' })) +
      TH.ui.campo({ name: 'codigo', label: 'Código de 6 números', required: true, placeholder: '000000', attrs: ' inputmode="numeric" autocomplete="one-time-code" maxlength="7" style="font-size:1.75rem;letter-spacing:.35em;text-align:center;max-width:15rem"' }) +
      '<div class="campo" data-campo="general"><span class="campo__error" role="alert"></span></div>' +
      '<button type="submit" class="btn btn--primario btn--bloque">Confirmar</button>' +
      '<p class="texto-sm mt-4 mb-0">¿No te llegó o ya venció? <button type="button" class="btn btn--terciario btn--sm" data-action="reenviar-codigo">Enviar otro código</button></p></form>' +
      '<p class="texto-sm mt-4"><a href="#/acceso">Ir a iniciar sesión</a></p></section>';
  }

  function resultadoRegistro(r) {
    const pendiente = r.estado === 'pendiente';
    return '<div class="seccion__eyebrow">Registro</div><h1>' + (pendiente ? 'Registro recibido' : 'Registro no aprobado') + '</h1>' +
      TH.ui.stepper(['Tus datos', 'Código del correo', 'Aprobación de la Fundación'], 2) +
      TH.ui.alerta(pendiente ? 'exito' : 'alerta', pendiente ? 'Tu correo quedó confirmado' : '', esc(r.mensaje)) +
      (pendiente ? '<p class="texto-2">No tienes que hacer nada más por ahora. Cuando la Fundación apruebe el registro, entra con tu correo y contraseña.</p>' : '') +
      '<p><a class="btn btn--secundario" href="#/">Volver al inicio</a></p>';
  }

  Object.assign(TH.formularios, {
    async 'registro-enlace'(form) {
      if (!TH.ui.validar(form)) return;
      const d = TH.ui.datosFormulario(form); d.aceptaDatos = !!(form.elements.aceptaDatos && form.elements.aceptaDatos.checked);
      const errores = {};
      if (d.tipoIdentificacion !== 'sin-identificacion') {
        if (String(d.identificacion || '').replace(/\D/g, '').length < 5) errores.identificacion = 'Escribe el número completo (al menos 5 dígitos).';
        else if (d.tipoIdentificacion === 'NIT') { const e = TH.util.validarNIT(d.identificacion); if (e) errores.identificacion = e; }
      }
      const ec = TH.auth.validarClave(d.clave); if (ec) errores.clave = ec;
      if (d.clave !== d.claveConfirmacion) errores.claveConfirmacion = 'Las contraseñas no coinciden.';
      if (!d.aceptaDatos) errores.aceptaDatos = 'Debes autorizar el tratamiento de tus datos personales.';
      if (Object.keys(errores).length) { TH.ui.mostrarErrores(form, errores); return; }
      TH.ui.ocupado(form, true, 'Registrando…');
      const r = await TH.auth.registrarOrganizacion(d);
      TH.ui.ocupado(form, false);
      if (!r.ok) { TH.ui.errorApi(r, form); return; }
      TH.router.ir('/verificar-correo?email=' + encodeURIComponent(String(d.email).trim()));
    },
    async 'verificar-codigo'(form) {
      if (!TH.ui.validar(form)) return;
      const email = form.elements.email.value; const codigo = form.elements.codigo.value;
      TH.ui.ocupado(form, true, 'Confirmando…');
      const r = await TH.authAdaptadores.supabase.verificarCodigo(email, codigo);
      TH.ui.ocupado(form, false);
      if (!r.ok) { TH.ui.errorApi(r, form); return; }
      if (r.estado) { const s = document.getElementById('verificacion'); if (s) s.innerHTML = resultadoRegistro(r); return; }
      if (TH.remoto) TH.remoto.invalidar();
      TH.ui.toast('Correo confirmado. Bienvenido/a, ' + r.usuario.nombre + '.', 'exito');
      TH.router.ir(inicioDe(r.usuario.rol));
    }
  });

  Object.assign(TH.acciones, {
    async 'reenviar-codigo'(el) {
      const form = el.closest('form'); const email = form && form.elements.email ? String(form.elements.email.value || '').trim() : '';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { TH.ui.mostrarErrores(form, { email: 'Escribe tu correo para enviarte el código.' }); return; }
      TH.ui.ocupado(el, true, 'Enviando…');
      const r = await TH.auth.solicitarVerificacion(email);
      TH.ui.ocupado(el, false);
      TH.ui.toast(r.ok ? 'Si hay un registro pendiente con ese correo, te llegará un código nuevo en unos minutos.' : r.error, r.ok ? 'info' : 'error', 7000);
    }
  });

  TH.router.registrarVarias({
    '/registro': { layout: 'publico', titulo: 'Registro', render: registro },
    '/verificar-correo': { layout: 'publico', titulo: 'Confirma tu correo', render: verificar }
  });

  /* =================== FMA: enlaces y aprobación =================== */
  const fma = { registros: [], enlaces: [] };
  const fecha = (iso) => (TH.supabaseUI ? TH.supabaseUI.fecha(iso) : String(iso || '—'));
  const msg = (e) => (TH.supabaseUI ? TH.supabaseUI.msg(e) : 'No fue posible completar la operación.');

  TH.supabaseCargadores['/fma/registros'] = async function () {
    const [r, c] = await Promise.all([
      sb.rpc('listar_registros'),
      sb.from('convocatorias').select('id, nombre, codigo, max_registros, registros, vence_en, estado, creada_en').order('creada_en', { ascending: false })
    ]);
    if (r.error) throw r.error; if (c.error) throw c.error;
    fma.registros = r.data || []; fma.enlaces = c.data || [];
  };

  const estadoEnlace = (e) => e.estado === 'anulada' ? 'anulado' : new Date(e.vence_en) <= new Date() ? 'vencido' : e.registros >= e.max_registros ? 'completo' : 'activo';
  const badgeEnlace = (e) => ({ activo: TH.ui.badge('Activo', 'exito'), vencido: TH.ui.badge('Vencido', 'neutro'), completo: TH.ui.badge('Cupos completos', 'info'), anulado: TH.ui.badge('Anulado', 'neutro') })[estadoEnlace(e)];

  function tablaRegistros(lista, conAcciones, caption) {
    return TH.ui.tabla([
      { titulo: 'Organización', render: x => '<strong>' + esc(x.nombre) + '</strong><div class="texto-xs texto-2">' + esc(String(x.identificacion || '').startsWith('SIN-ID-') ? 'Sin identificación tributaria' : (x.tipo_identificacion || '') + ' ' + (x.identificacion || '')) + '</div><div class="texto-xs texto-2">' + esc([x.sector, (TH.util.catalogo(cat.tamanos, x.tamano) || {}).nombre].filter(Boolean).join(' · ')) + '</div>' },
      { titulo: 'Ubicación', render: x => esc([x.municipio, x.departamento].filter(Boolean).join(', ') || '—') },
      { titulo: 'Responsable', render: x => esc(x.responsable || '—') + '<div class="texto-xs texto-2">' + esc(x.cargo || '') + '</div><div class="texto-xs texto-2">' + esc(x.email || '') + '</div>' },
      { titulo: 'Correo', render: x => x.correo_confirmado ? TH.ui.badge('Confirmado', 'exito') : TH.ui.badge('Sin confirmar', 'alerta') },
      { titulo: 'Llegó por', render: x => esc(x.convocatoria || '—') + '<div class="texto-xs texto-2">' + esc(fecha(x.creado_en)) + '</div>' },
      conAcciones
        ? { titulo: '', clase: 'acciones', render: x => '<button type="button" class="btn btn--primario btn--sm" data-action="fma-registro-resolver" data-id="' + esc(x.organizacion_id) + '" data-estado="activa" data-nombre="' + esc(x.nombre) + '" data-confirmado="' + (x.correo_confirmado ? '1' : '') + '">Aprobar</button> <button type="button" class="btn btn--terciario btn--sm" data-action="fma-registro-resolver" data-id="' + esc(x.organizacion_id) + '" data-estado="rechazada" data-nombre="' + esc(x.nombre) + '">Rechazar</button>' }
        : { titulo: 'Estado', render: x => TH.ui.badgeEstadoOrg(x.estado) }
    ], lista, { caption, vacioTitulo: conAcciones ? 'No hay registros por revisar' : 'Aún no hay registros revisados', vacioTexto: conAcciones ? 'Cuando una organización se registre con un enlace, aparecerá aquí.' : '' });
  }

  function registros() {
    const pend = fma.registros.filter(x => x.estado === 'pendiente'); const resto = fma.registros.filter(x => x.estado !== 'pendiente');
    return TH.ui.encabezado('Registros', 'Comparte un enlace de registro con las organizaciones. Cada una que se registre queda <strong>pendiente</strong> hasta que la apruebes; mientras tanto no puede entrar.',
        '<button type="button" class="btn btn--primario" data-action="fma-enlace-nuevo">Crear enlace de registro</button>') +
      '<h2>Por revisar' + (pend.length ? ' (' + pend.length + ')' : '') + '</h2>' + tablaRegistros(pend, true, 'Registros por revisar') +
      '<h2 class="mt-5">Enlaces de registro</h2><p class="texto-2">Puedes copiar un enlace activo las veces que quieras. Al anularlo deja de servir de inmediato; las organizaciones ya registradas no cambian.</p>' +
      TH.ui.tabla([
        { titulo: 'Nombre', render: e => '<strong>' + esc(e.nombre) + '</strong><div class="texto-xs texto-2">Creado ' + esc(fecha(e.creada_en)) + '</div>' },
        { titulo: 'Registros', render: e => esc(e.registros + ' de ' + e.max_registros) },
        { titulo: 'Vence', render: e => esc(fecha(e.vence_en)) },
        { titulo: 'Estado', render: badgeEnlace },
        { titulo: '', clase: 'acciones', render: e => estadoEnlace(e) === 'activo'
          ? '<button type="button" class="btn btn--secundario btn--sm" data-action="fma-copiar" data-texto="' + esc(enlaceRegistro(e.codigo)) + '">Copiar enlace</button> <button type="button" class="btn btn--terciario btn--sm" data-action="fma-enlace-anular" data-id="' + esc(e.id) + '" data-nombre="' + esc(e.nombre) + '">Anular</button>'
          : (e.estado === 'activa' ? '<button type="button" class="btn btn--terciario btn--sm" data-action="fma-enlace-anular" data-id="' + esc(e.id) + '" data-nombre="' + esc(e.nombre) + '">Anular</button>' : '') }
      ], fma.enlaces, { caption: 'Enlaces de registro', vacioTitulo: 'Aún no hay enlaces', vacioTexto: 'Crea el primero con «Crear enlace de registro».' }) +
      '<h2 class="mt-5">Revisados</h2>' + tablaRegistros(resto, false, 'Registros revisados');
  }

  function mostrarEnlaceRegistro(codigo, nombre) {
    const enlace = enlaceRegistro(codigo);
    TH.ui.modal({
      titulo: 'Enlace de registro creado',
      cuerpo: '<p>Comparte este enlace con las organizaciones de <strong>' + esc(nombre) + '</strong> (por correo, WhatsApp o en un encuentro). Lo puedes volver a copiar cuando quieras desde <strong>Registros</strong>.</p>' +
        '<div class="campo"><label class="campo__label" for="enlace-inv">Enlace de registro</label><input class="input" id="enlace-inv" readonly value="' + esc(enlace) + '"></div>' +
        TH.ui.alerta('info', 'Recuerda', 'Cada organización que se registre quedará pendiente hasta que la apruebes en esta misma sección.'),
      pie: '<button type="button" class="btn btn--secundario" data-modal-cerrar>Cerrar</button><button type="button" class="btn btn--primario" data-action="fma-copiar" data-texto="' + esc(enlace) + '">Copiar enlace</button>'
    });
  }

  Object.assign(TH.acciones, {
    'fma-enlace-nuevo'() {
      TH.ui.modal({
        titulo: 'Crear enlace de registro',
        cuerpo: '<form id="form-enlace-nuevo" data-form="fma-enlace-nuevo" novalidate>' +
          TH.ui.campo({ name: 'nombre', label: 'Nombre del enlace', required: true, placeholder: 'Ej.: Encuentro de aliados · noviembre', ayuda: 'Solo lo ves tú: sirve para saber por dónde llegó cada organización.', attrs: ' maxlength="120"' }) +
          '<div class="form-fila">' + TH.ui.campo({ name: 'maximo', label: 'Máximo de organizaciones', tipo: 'number', required: true, valor: 20, min: 1, max: 500 }) +
          TH.ui.campo({ name: 'dias', label: 'Vigencia (días)', tipo: 'number', required: true, valor: 30, min: 1, max: 90 }) + '</div>' +
          '<div class="campo" data-campo="general"><span class="campo__error" role="alert"></span></div></form>',
        pie: '<button type="button" class="btn btn--secundario" data-modal-cerrar>Cancelar</button><button type="submit" form="form-enlace-nuevo" class="btn btn--primario">Crear enlace</button>'
      });
    },
    async 'fma-enlace-anular'(el) {
      const si = await TH.ui.confirmar({ titulo: 'Anular enlace', peligro: true, aceptar: 'Anular', texto: 'El enlace «' + el.dataset.nombre + '» dejará de servir de inmediato. Las organizaciones que ya se registraron no cambian.' });
      if (!si) return;
      const r = await sb.rpc('anular_convocatoria', { p_id: el.dataset.id });
      if (r.error) { TH.ui.toast(msg(r.error), 'error', 5000); return; }
      TH.ui.toast('Enlace anulado.', 'exito'); TH.router.recargar();
    },
    async 'fma-registro-resolver'(el) {
      const aprobar = el.dataset.estado === 'activa';
      const si = await TH.ui.confirmar({
        titulo: aprobar ? 'Aprobar registro' : 'Rechazar registro', peligro: !aprobar, aceptar: aprobar ? 'Aprobar' : 'Rechazar',
        textoHtml: aprobar
          ? '<strong>' + esc(el.dataset.nombre) + '</strong> podrá entrar a Turquesa Hub con el correo y la contraseña de su responsable.' + (el.dataset.confirmado ? '' : '<br><br><strong>Ojo:</strong> su responsable aún no ha confirmado el correo; podrá entrar cuando escriba el código.')
          : '<strong>' + esc(el.dataset.nombre) + '</strong> no tendrá acceso. Si cambias de opinión, podrás reactivarla desde Organizaciones.'
      });
      if (!si) return;
      const r = await sb.from('organizaciones').update({ estado: el.dataset.estado }).eq('id', el.dataset.id).select('id');
      if (r.error || !(r.data || []).length) { TH.ui.toast('No fue posible guardar la decisión.', 'error', 5000); return; }
      TH.ui.toast(aprobar ? 'Organización aprobada. Avísale a su responsable que ya puede entrar.' : 'Registro rechazado.', 'exito', 6000); TH.router.recargar();
    }
  });

  Object.assign(TH.formularios, {
    async 'fma-enlace-nuevo'(form) {
      if (!TH.ui.validar(form)) return; const d = TH.ui.datosFormulario(form);
      const max = parseInt(d.maximo, 10); const dias = parseInt(d.dias, 10); const errores = {};
      if (!(max >= 1 && max <= 500)) errores.maximo = 'Entre 1 y 500.';
      if (!(dias >= 1 && dias <= 90)) errores.dias = 'Entre 1 y 90 días.';
      if (Object.keys(errores).length) { TH.ui.mostrarErrores(form, errores); return; }
      TH.ui.ocupado(form, true, 'Creando…');
      const c = await sb.rpc('crear_convocatoria', { p_nombre: d.nombre.trim(), p_max_registros: max, p_dias: dias });
      TH.ui.ocupado(form, false);
      if (c.error) { TH.ui.mostrarErrores(form, { general: msg(c.error) }); return; }
      TH.ui.cerrarModal(); mostrarEnlaceRegistro(c.data, d.nombre.trim()); TH.router.recargar();
    }
  });

  TH.router.registrarVarias({
    '/fma/registros': { roles: ['fma'], titulo: 'Registros', render: registros, ancho: true }
  });
})();

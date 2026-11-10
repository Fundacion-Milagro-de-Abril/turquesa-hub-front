/* ============================================================
   TURQUESA HUB · ESPACIO DE COLABORADORES
   Acceso por invitación de una organización registrada. Módulos
   asignados, recorrido formativo (lecciones con situación, actividad de
   reflexión y referencias → ejercicio de apropiación → constancia),
   progreso personal, recursos de la biblioteca y cuenta. Diseñado para
   móvil. No se recogen experiencias personales de violencia.
   ============================================================ */
window.TH = window.TH || {};

(function () {
  const esc = (s) => TH.util.esc(s);
  const ic = (n, c) => TH.ui.icono(n, c);
  const ROLES = ['colaborador'];
  const ui = { paso: {} };
  const user = () => TH.auth.usuario();
  const orgNombre = () => { const o = TH.auth.organizacion(); return o ? o.nombre : 'tu organización'; };

  function tarjetaModulo(m) {
    const u = user(); const est = TH.api.formacion.estadoModulo(u.id, m.id); const av = TH.api.formacion.avanceModulo(u.id, m.id); const p = TH.api.formacion.progreso(u.id, m.id);
    const badge = est === 'completado' ? TH.ui.badge('Completado', 'exito') : est === 'en-curso' ? TH.ui.badge('En curso', 'info') : TH.ui.badge('Pendiente', 'neutro');
    return '<div class="card"><div class="modulo-card"><div class="modulo-card__num modulo-card__num--' + m.color + '" aria-hidden="true">' + m.orden + '</div><div><div class="flex justify-between gap-2 wrap"><h3 class="card__titulo">' + esc(m.titulo) + '</h3>' + badge + '</div><p class="card__sub">' + esc(m.resumen) + '</p><div class="texto-xs texto-2 mt-2">' + esc(m.duracion) + ' · ' + m.lecciones.length + ' lecciones · ejercicio de ' + m.quiz.length + ' preguntas' + (p && p.puntaje != null ? ' · resultado ' + p.puntaje + '%' : '') + '</div><div class="mt-3">' + TH.ui.progreso(av, { color: 'naranja', aria: 'Avance del módulo ' + m.orden }) + '</div><div class="mt-3"><a class="btn ' + (est === 'completado' ? 'btn--secundario' : 'btn--primario') + '" href="#/colaborador/formacion/modulo?id=' + m.id + '">' + (est === 'completado' ? 'Repasar' : est === 'en-curso' ? 'Continuar' : 'Comenzar') + ' ' + ic('flecha') + '</a></div></div></div></div>';
  }

  function inicio() {
    const u = user(); const mods = TH.api.formacion.asignados(u.id);
    const completados = mods.filter(m => TH.api.formacion.estadoModulo(u.id, m.id) === 'completado').length;
    const siguiente = mods.find(m => TH.api.formacion.estadoModulo(u.id, m.id) !== 'completado');
    return '<div class="aprendizaje">' + TH.ui.encabezado('Hola, ' + esc(u.nombre.split(' ')[0]), '<strong>' + esc(orgNombre()) + '</strong> te invita a participar en un proceso de sensibilización sobre prevención de violencias basadas en género. Son módulos breves, con situaciones ficticias, actividades de reflexión y sin preguntas sobre tu vida personal.') +
      (mods.length === 0 ? TH.ui.alerta('info', 'Aún no tienes módulos asignados', (TH.api.formacion.modulos().length ? 'Tu organización asignará los módulos que corresponden a tu rol.' : 'La Fundación Milagro de Abril aún no ha publicado módulos de sensibilización; tu organización podrá asignarlos cuando estén disponibles.') + ' Mientras tanto puedes consultar los <a href="#/colaborador/recursos">recursos</a>.') :
        siguiente ? TH.ui.siguientePaso('Tu siguiente actividad: Módulo ' + siguiente.orden, siguiente.titulo + ' · ' + siguiente.duracion, '/colaborador/formacion/modulo?id=' + siguiente.id, TH.api.formacion.estadoModulo(u.id, siguiente.id) === 'en-curso' ? 'Continuar' : 'Comenzar') : TH.ui.siguientePaso('Completaste todas tus actividades', 'Gracias por participar. Puedes repasar los módulos o consultar los recursos.', '/colaborador/mi-progreso', 'Ver mi progreso')) +
      '<div class="grid grid-3 mt-5">' + TH.ui.kpi('Módulos asignados', String(mods.length), 'por ' + esc(orgNombre())) + TH.ui.kpi('Completados', String(completados), TH.util.pct(completados, mods.length) + '% del recorrido', true) + TH.ui.kpi('Tiempo estimado', mods.filter(m => TH.api.formacion.estadoModulo(u.id, m.id) !== 'completado').reduce((t, m) => t + parseInt(m.duracion, 10), 0) + ' min', 'restantes') + '</div>' +
      (mods.length ? '<h2 class="mt-6" style="font-size:var(--th-t-lg)">Actividades asignadas</h2><div class="flex flex-col gap-3">' + mods.map(tarjetaModulo).join('') + '</div>' : '') +
      '<div class="card card--suave mt-5"><h3 class="card__titulo" style="font-size:var(--th-t-md)">Un espacio seguro para aprender</h3><p class="texto-sm mb-0">Estos módulos no te pedirán relatos personales ni funcionan como canal de queja o denuncia. Si necesitas orientación, tu organización debe indicarte sus canales internos y las rutas de las autoridades competentes; también puedes consultar los <a href="#/colaborador/recursos">recursos</a>.</p></div></div>';
  }

  function formacion() {
    const u = user(); const mods = TH.api.formacion.asignados(u.id);
    return '<div class="aprendizaje">' + TH.ui.encabezado('Mi formación', 'Módulos asignados por ' + esc(orgNombre()) + '. Puedes hacerlos en el orden que prefieras y retomarlos cuando quieras.') + (mods.length ? '<div class="flex flex-col gap-3">' + mods.map(tarjetaModulo).join('') + '</div>' : TH.ui.vacio('Sin módulos asignados', 'Tu organización aún no te ha asignado módulos.', '', 'formacion')) + '</div>';
  }

  function modulo(ctx) {
    const u = user(); const m = TH.api.formacion.modulo(ctx.params.id);
    if (!m) return TH.ui.vacio('Módulo no encontrado', 'El módulo solicitado no existe.', '<a class="btn btn--primario" href="#/colaborador/formacion">Volver a mi formación</a>');
    if (!TH.api.formacion.asignados(u.id).some(x => x.id === m.id)) return TH.ui.vacio('Módulo no asignado', 'Este módulo no está asignado a tu perfil. Consulta con tu organización.', '<a class="btn btn--primario" href="#/colaborador/formacion">Volver</a>', 'formacion');
    const p = TH.api.formacion.progreso(u.id, m.id) || { leccionesVistas: [], respuestasQuiz: {}, estado: 'pendiente' };
    if (ui.paso[m.id] === undefined) {
      if (p.estado === 'completado') ui.paso[m.id] = 'fin';
      else { const i = m.lecciones.findIndex(l => !p.leccionesVistas.includes(l.id)); ui.paso[m.id] = i === -1 ? 'quiz' : i; }
    }
    const paso = ui.paso[m.id]; const total = m.lecciones.length + 1;
    const indicePaso = paso === 'quiz' ? m.lecciones.length : paso === 'fin' ? total : paso;
    const barra = '<div class="mb-4">' + TH.ui.progreso(TH.util.pct(Math.min(indicePaso, total), total), { etiqueta: paso === 'fin' ? 'Módulo finalizado' : (paso === 'quiz' ? 'Ejercicio de apropiación' : 'Lección ' + (paso + 1) + ' de ' + m.lecciones.length), color: 'naranja', aria: 'Avance del módulo' }) + '</div>';
    const cabecera = TH.ui.migas([{ texto: 'Mi formación', ruta: '/colaborador/formacion' }, { texto: 'Módulo ' + m.orden }]) + '<div class="flex items-center gap-3 mb-4"><div class="modulo-card__num modulo-card__num--' + m.color + '" style="width:44px;height:44px;border-radius:12px;font-size:var(--th-t-lg)" aria-hidden="true">' + m.orden + '</div><div><h1 style="font-size:var(--th-t-xl);margin:0">' + esc(m.titulo) + '</h1><span class="texto-xs texto-2">' + esc(m.duracion) + ' · ' + m.lecciones.length + ' lecciones · ejercicio de ' + m.quiz.length + ' preguntas</span></div></div>' + barra;
    const cuerpo = paso === 'fin' ? finModulo(m, p) : paso === 'quiz' ? quiz(m, p) : leccion(m, p, paso);
    return '<div class="aprendizaje">' + cabecera + cuerpo + '</div>';
  }

  function leccion(m, p, i) {
    const l = m.lecciones[i];
    const tarjeta = l.tarjeta ? '<div class="tarjeta-info tarjeta-info--' + l.tarjeta.tipo + '">' + esc(l.tarjeta.texto) + '</div>' : '';
    const sit = l.situacion ? '<div class="situacion"><div class="situacion__label">Situación práctica (ficticia)</div>' + esc(l.situacion) + '</div>' : '';
    const act = l.actividad ? '<div class="card card--suave card--compacta mt-4"><h3 style="font-size:var(--th-t-md)">' + esc(l.actividad.titulo) + '</h3><p class="texto-sm">' + esc(l.actividad.instrucciones) + '</p><ol class="texto-sm mb-0">' + (l.actividad.preguntas || []).map(q => '<li>' + esc(q) + '</li>').join('') + '</ol><p class="texto-xs texto-3 mt-2 mb-0">Reflexión personal: no se registra ni se comparte con tu organización.</p></div>' : '';
    const refs = l.referencias && l.referencias.length ? '<details class="ayuda"><summary>Referencias de esta lección</summary><div class="ayuda__cuerpo">' + TH.ui.referencias(l.referencias) + '</div></details>' : '';
    const objetivos = i === 0 ? '<div class="card card--compacta card--suave mb-4"><strong class="texto-sm">Objetivos del módulo</strong><ul class="texto-sm mb-0 mt-2">' + m.objetivos.map(o => '<li>' + esc(o) + '</li>').join('') + '</ul></div>' : '';
    return objetivos + '<article class="tarjeta-aprendizaje" aria-labelledby="lec-titulo"><div class="tarjeta-aprendizaje__tipo">' + esc(l.tipo) + '</div><h2 id="lec-titulo">' + esc(l.titulo) + '</h2><div class="tarjeta-aprendizaje__cuerpo">' + l.cuerpo.map(t => '<p>' + esc(t) + '</p>').join('') + sit + tarjeta + act + refs + '</div>' +
      '<div class="flex justify-between gap-2 mt-5 wrap"><button type="button" class="btn btn--secundario" data-action="col-paso" data-modulo="' + m.id + '" data-paso="' + (i - 1) + '" ' + (i === 0 ? 'disabled' : '') + '>' + ic('flechaIzq') + ' Anterior</button><button type="button" class="btn btn--primario" data-action="col-leccion-vista" data-modulo="' + m.id + '" data-leccion="' + l.id + '" data-siguiente="' + (i + 1 < m.lecciones.length ? i + 1 : 'quiz') + '">' + (i + 1 < m.lecciones.length ? 'Siguiente lección' : 'Ir al ejercicio') + ' ' + ic('flecha') + '</button></div></article>' +
      '<div class="flex gap-2 justify-center mt-3 wrap">' + m.lecciones.map((x, k) => '<button type="button" class="btn btn--terciario btn--sm" data-action="col-paso" data-modulo="' + m.id + '" data-paso="' + k + '" aria-current="' + (k === i) + '">' + (p.leccionesVistas.includes(x.id) ? '✓ ' : '') + 'Lección ' + (k + 1) + '</button>').join('') + '<button type="button" class="btn btn--terciario btn--sm" data-action="col-paso" data-modulo="' + m.id + '" data-paso="quiz">Ejercicio</button></div>';
  }

  function quiz(m, p) {
    const faltan = m.lecciones.filter(l => !p.leccionesVistas.includes(l.id));
    const todasRespondidas = m.quiz.every(q => p.respuestasQuiz[q.id]);
    return '<article class="tarjeta-aprendizaje"><div class="tarjeta-aprendizaje__tipo">Ejercicio de apropiación</div><h2>Comprueba lo aprendido</h2><p class="texto-2">' + m.quiz.length + ' preguntas de selección múltiple con retroalimentación inmediata. No hay nota mínima: el objetivo es reflexionar y fijar ideas clave.</p>' +
      (faltan.length ? TH.ui.alerta('alerta', 'Lecciones pendientes', 'Te falta ver: ' + faltan.map(l => '<button type="button" class="btn btn--terciario btn--sm" data-action="col-paso" data-modulo="' + m.id + '" data-paso="' + m.lecciones.indexOf(l) + '">' + esc(l.titulo) + '</button>').join(' ') + '. Podrás finalizar cuando las completes.') : '') +
      m.quiz.map((q, n) => {
        const r = p.respuestasQuiz[q.id]; const correcta = r === q.correcta;
        return '<fieldset class="mt-5"><legend><strong>' + (n + 1) + '. ' + esc(q.texto) + '</strong></legend><div class="opciones">' + q.opciones.map(o => { const cls = r ? (o.id === q.correcta ? 'opcion--correcta' : (o.id === r ? 'opcion--incorrecta' : '')) : ''; return '<label class="opcion ' + cls + '"><input type="radio" name="' + q.id + '" value="' + o.id + '" ' + (r === o.id ? 'checked' : '') + ' ' + (r ? 'disabled' : '') + ' data-change="col-quiz" data-modulo="' + m.id + '" data-pregunta="' + q.id + '"><span>' + esc(o.texto) + '</span></label>'; }).join('') + '</div>' +
          (r ? '<div class="retro ' + (correcta ? 'retro--ok' : 'retro--no') + '" role="status">' + (correcta ? '✓ ' : '') + esc(correcta ? q.retro.ok : q.retro.no) + (q.referencia ? ' <span class="texto-xs">(' + esc([].concat(q.referencia).join(', ')) + ')</span>' : '') + '</div>' : '') + '</fieldset>';
      }).join('') +
      '<div class="flex justify-between gap-2 mt-5 wrap"><button type="button" class="btn btn--secundario" data-action="col-paso" data-modulo="' + m.id + '" data-paso="' + (m.lecciones.length - 1) + '">' + ic('flechaIzq') + ' Volver a las lecciones</button>' +
      (todasRespondidas ? '<div class="flex gap-2"><button type="button" class="btn btn--terciario" data-action="col-reintentar" data-modulo="' + m.id + '">Reintentar ejercicio</button><button type="button" class="btn btn--primario" data-action="col-finalizar" data-modulo="' + m.id + '" ' + (faltan.length ? 'disabled' : '') + '>Registrar finalización ' + ic('check') + '</button></div>' : '<span class="texto-sm texto-2">Responde las ' + m.quiz.length + ' preguntas para finalizar.</span>') + '</div></article>';
  }

  function finModulo(m, p) {
    const u = user(); const o = TH.auth.organizacion();
    const mods = TH.api.formacion.asignados(u.id); const siguiente = mods.find(x => TH.api.formacion.estadoModulo(u.id, x.id) !== 'completado');
    return '<div class="constancia"><img class="constancia__logo" src="assets/branding/fma-logo-vertical.png" alt="Fundación Milagro de Abril" width="698" height="637"><div class="seccion__eyebrow">Constancia de participación · Turquesa Hub · Sello Turquesa</div><h2>Módulo completado</h2><p>Fundación Milagro de Abril hace constar que <strong>' + esc(u.nombre) + '</strong> participó en la actividad formativa <strong>Módulo ' + m.orden + ': ' + esc(m.titulo) + '</strong>' + (o ? ', asignada por ' + esc(o.nombre) + ',' : '') + ' el ' + esc(TH.util.fechaLarga(p.fechaFin)) + '.</p><p class="texto-sm">Resultado del ejercicio de apropiación: <strong>' + p.puntaje + '%</strong> (' + m.quiz.filter(q => p.respuestasQuiz[q.id] === q.correcta).length + ' de ' + m.quiz.length + ' aciertos).</p>' +
      '<p class="texto-xs texto-2">Constancia de participación en una actividad formativa de Turquesa Hub · Sello Turquesa, un servicio de Fundación Milagro de Abril. No es un certificado ni una certificación profesional.</p>' +
      '<div class="flex gap-2 justify-center wrap mt-4"><button type="button" class="btn btn--secundario" data-action="imprimir">' + ic('imprimir') + ' Guardar constancia (PDF)</button><button type="button" class="btn btn--terciario" data-action="col-paso" data-modulo="' + m.id + '" data-paso="0">Repasar lecciones</button>' + (siguiente ? '<a class="btn btn--primario" href="#/colaborador/formacion/modulo?id=' + siguiente.id + '" data-action="col-reset-paso" data-modulo="' + siguiente.id + '">Siguiente módulo ' + ic('flecha') + '</a>' : '<a class="btn btn--primario" href="#/colaborador/mi-progreso">Ver mi progreso</a>') + '</div></div>' +
      (m.recursos && m.recursos.length ? '<div class="card mt-4"><h3 class="card__titulo" style="font-size:var(--th-t-md)">Recursos complementarios</h3><ul class="texto-sm mb-0">' + m.recursos.map(id => { const c = TH.api.contenidos.obtener(id); return TH.api.contenidos.esVisible(c, 'colaborador') ? '<li><a href="#/colaborador/recursos?id=' + c.id + '">' + esc(c.titulo) + '</a></li>' : ''; }).join('') + '</ul></div>' : '') +
      '<div class="card mt-4"><h3 class="card__titulo" style="font-size:var(--th-t-md)">Bibliografía del módulo</h3>' + TH.ui.referencias(m.bibliografia) + (m.revision ? '<p class="texto-xs texto-3 mt-2 mb-0">Revisión: ' + esc(TH.util.fecha(m.revision.fecha)) + ' · ' + esc(m.revision.responsable) + '</p>' : '') + '</div>';
  }

  function miProgreso() {
    const u = user(); const mods = TH.api.formacion.asignados(u.id); const prog = TH.api.formacion.progresoUsuario(u.id);
    const completados = mods.filter(m => TH.api.formacion.estadoModulo(u.id, m.id) === 'completado');
    return '<div class="aprendizaje">' + TH.ui.encabezado('Mi progreso', 'Tu avance personal en los módulos de sensibilización. Tu organización solo ve estados agregados, no tus respuestas.') +
      '<div class="card flex items-center gap-5 mb-4">' + TH.graficos.donut(TH.util.pct(completados.length, mods.length), { etiqueta: 'Recorrido completado', color: 'var(--th-turquesa-profundo)' }) + '<div><h3>' + completados.length + ' de ' + mods.length + ' módulos</h3><p class="texto-2 texto-sm">' + (mods.length && completados.length === mods.length ? 'Completaste todas tus actividades asignadas.' : 'Sigue a tu ritmo; tu avance se guarda automáticamente.') + '</p></div></div>' +
      TH.ui.tabla([{ titulo: 'Módulo', render: m => '<strong>Módulo ' + m.orden + '</strong><div class="texto-xs texto-2">' + esc(m.titulo) + '</div>' }, { titulo: 'Estado', render: m => { const e = TH.api.formacion.estadoModulo(u.id, m.id); return e === 'completado' ? TH.ui.badge('Completado', 'exito') : e === 'en-curso' ? TH.ui.badge('En curso', 'info') : TH.ui.badge('Pendiente', 'neutro'); } }, { titulo: 'Avance', render: m => TH.ui.progreso(TH.api.formacion.avanceModulo(u.id, m.id), { color: 'naranja' }) }, { titulo: 'Resultado', render: m => { const p = prog.find(x => x.moduloId === m.id); return p && p.puntaje != null ? p.puntaje + '%' : '—'; } }, { titulo: 'Fecha', render: m => { const p = prog.find(x => x.moduloId === m.id); return esc(p && p.fechaFin ? TH.util.fecha(p.fechaFin) : '—'); } }, { titulo: '', clase: 'acciones', render: m => '<a class="btn btn--terciario btn--sm" href="#/colaborador/formacion/modulo?id=' + m.id + '">Abrir</a>' }], mods, { caption: 'Progreso por módulo', vacioTitulo: 'Sin módulos asignados', vacioTexto: 'Tu organización aún no te ha asignado módulos.' }) + '</div>';
  }

  function recursos(ctx) { return '<div class="aprendizaje">' + TH.vistasCompartidas.biblioteca(ctx, 'colaborador') + '</div>'; }

  function perfilCol() {
    const u = user(); const o = TH.auth.organizacion();
    return '<div class="aprendizaje">' + TH.ui.encabezado('Mi cuenta', 'Datos mínimos de tu cuenta y credenciales.') +
      '<form class="card" data-form="col-perfil" novalidate>' + TH.ui.campo({ name: 'nombre', label: 'Nombre', required: true, valor: u.nombre }) + TH.ui.campo({ name: 'email', label: 'Correo', tipo: 'email', valor: u.email, disabled: true }) + TH.ui.campo({ name: 'area', label: 'Área o equipo (opcional)', valor: u.area || '' }) + TH.ui.dl([['Organización', o ? o.nombre : '—'], ['Rol', 'Colaborador']]) + '<div class="mt-4 flex justify-end"><button type="submit" class="btn btn--primario">Guardar</button></div></form>' +
      '<form class="card mt-4" data-form="cambiar-clave" novalidate><h3 class="card__titulo">Cambiar contraseña</h3>' + TH.ui.campo({ name: 'actual', label: 'Contraseña actual', tipo: 'password', required: true, attrs: ' autocomplete="current-password"' }) + TH.ui.campo({ name: 'nueva', label: 'Nueva contraseña', tipo: 'password', required: true, ayuda: 'Mínimo ' + TH.config.auth.clave.longitudMinima + ' caracteres, con letras y números.', attrs: ' autocomplete="new-password"' }) + TH.ui.campo({ name: 'confirmacion', label: 'Confirmar nueva contraseña', tipo: 'password', required: true, attrs: ' autocomplete="new-password"' }) + '<div class="campo" data-campo="general"><span class="campo__error" role="alert"></span></div><button type="submit" class="btn btn--primario">Actualizar contraseña</button></form>' +
      '<div class="card card--suave mt-4"><h3 class="card__titulo" style="font-size:var(--th-t-md)">Tu privacidad</h3><p class="texto-sm mb-0">Tu organización ve únicamente el estado de tus módulos (pendiente, en curso, completado). Las respuestas de los ejercicios y las actividades de reflexión no se comparten. Esta plataforma no recoge experiencias personales de violencia. Consulta la <a href="#/privacidad">política de tratamiento de datos</a>.</p></div></div>';
  }

  Object.assign(TH.acciones, {
    'col-paso'(el) { const p = el.dataset.paso; ui.paso[el.dataset.modulo] = p === 'quiz' || p === 'fin' ? p : parseInt(p, 10); TH.router.ir('/colaborador/formacion/modulo?id=' + el.dataset.modulo); },
    async 'col-leccion-vista'(el) { const r = await TH.ui.ejecutar(el, () => TH.api.formacion.marcarLeccion(user().id, el.dataset.modulo, el.dataset.leccion), { texto: 'Guardando…' }); if (!r.ok) return; const s = el.dataset.siguiente; ui.paso[el.dataset.modulo] = s === 'quiz' ? 'quiz' : parseInt(s, 10); TH.router.ir('/colaborador/formacion/modulo?id=' + el.dataset.modulo); },
    async 'col-finalizar'(el) { const r = await TH.ui.ejecutar(el, () => TH.api.formacion.finalizar(user().id, el.dataset.modulo), { texto: 'Registrando…' }); if (!r.ok) return; ui.paso[el.dataset.modulo] = 'fin'; TH.ui.toast('Módulo completado. Resultado: ' + r.puntaje + '%.', 'exito'); TH.router.refrescar(); },
    async 'col-reintentar'(el) { const r = await TH.ui.ejecutar(el, () => TH.api.formacion.reintentar(user().id, el.dataset.modulo)); if (!r.ok) return; ui.paso[el.dataset.modulo] = 'quiz'; TH.router.refrescar(); },
    'col-reset-paso'(el) { delete ui.paso[el.dataset.modulo]; }
  });
  Object.assign(TH.cambios, {
    async 'col-quiz'(el) {
      el.disabled = true;
      const r = await TH.api.formacion.responderQuiz(user().id, el.dataset.modulo, el.dataset.pregunta, el.value);
      if (!r.ok) { el.disabled = false; el.checked = false; TH.ui.errorApi(r); return; }
      TH.router.refrescar();
      setTimeout(() => { const f = document.querySelector('input[name="' + el.dataset.pregunta + '"]:checked'); const retro = f && f.closest('fieldset').querySelector('.retro'); if (retro) { retro.setAttribute('tabindex', '-1'); retro.focus(); } }, 0);
    }
  });
  Object.assign(TH.formularios, {
    async 'col-perfil'(form) { if (!TH.ui.validar(form)) return; const r = await TH.ui.ejecutar(form, () => TH.api.usuarios.actualizar(user().id, { nombre: form.elements.nombre.value.trim(), area: form.elements.area.value.trim() }), { texto: 'Guardando…', exito: 'Datos actualizados.' }); if (r.ok) TH.router.refrescar(); }
  });

  TH.router.registrarVarias({
    '/colaborador/inicio': { roles: ROLES, titulo: 'Inicio', render: inicio },
    '/colaborador/formacion': { roles: ROLES, titulo: 'Mi formación', render: formacion },
    '/colaborador/formacion/modulo': { roles: ROLES, titulo: 'Módulo', render: modulo },
    '/colaborador/mi-progreso': { roles: ROLES, titulo: 'Mi progreso', render: miProgreso },
    '/colaborador/recursos': { roles: ROLES, titulo: 'Recursos', render: recursos },
    '/colaborador/perfil': { roles: ROLES, titulo: 'Mi cuenta', render: perfilCol }
  });
})();

/* Escenario de prueba completo de Turquesa Hub. Se ejecuta igual en entorno de desarrollo (adaptador local,
   smoke.js) y en entorno de producción contra el servidor simulado (api-simulada.js). `opc.remoto` indica el segundo
   caso; `opc.estado()` devuelve el estado del servidor (en local, el almacén del propio cliente). */
const { CLAVE } = require('./clave-demo');
module.exports = async function escenario(h, opc) {
  const { w, ok, ir, texto, nav, q, click, submit, cambiar, recorrer, login, logout, sleep } = h;
  const TH = w.TH; const remoto = !!opc.remoto; const estado = opc.estado;
  const usuarios = () => estado().usuarios; const org = (id) => estado().organizaciones.find(o => o.id === id);
  const buscarOrg = (txt) => estado().organizaciones.find(o => o.nombre.includes(txt));

  console.log('\n[Carga y catálogos]');
  ok(TH.config.entorno === (remoto ? 'produccion' : 'desarrollo') && TH.config.esRemoto === remoto, 'Aplicación cargada en entorno ' + TH.config.entorno + (remoto ? ' (adaptador HTTP activo: ' + TH.remoto.activo + ')' : ''));
  ok(TH.api.diagnostico.preguntas().length === 16 && TH.api.diagnostico.todas().length === 24, 'Instrumento: 16 preguntas activas de 24');
  ok(TH.data.modulos.length === 4 && TH.data.modulos.every(m => m.lecciones.length === 4 && m.quiz.length === 5 && m.bibliografia.length), 'Catálogo editorial: 4 módulos × 4 lecciones × 5 preguntas con bibliografía');
  ok(TH.data.contenidos.length === 21 && TH.data.contenidos.every(c => c.referencias.every(f => TH.data.fuentes[f])), 'Catálogo editorial: 21 contenidos con referencias registradas');
  ok(!w.localStorage.getItem('th-sesion') && (!remoto || w.localStorage.length === 0), remoto ? 'Producción: nada en localStorage' : 'Sin sesión en localStorage');

  console.log('\n[Área pública · nada publicado todavía]');
  await recorrer(['/', '/conocer-turquesa-hub', '/sello-turquesa', '/condiciones', '/privacidad', '/aviso-registro', '/acceso', '/registro', '/verificar-correo', '/recuperar-acceso', '/activar-invitacion'], 'Público');
  await ir('/registro'); let fr = q('form[data-form=registro]');
  ok(fr && ['nombre', 'tipoIdentificacion', 'identificacion', 'sector', 'tamano', 'departamento', 'municipio', 'emailInstitucional', 'responsable', 'cargo', 'email', 'clave', 'claveConfirmacion'].every(n => fr.elements[n]) && !fr.elements.aceptaCondiciones, 'Registro: formulario empresarial completo visible sin políticas definitivas publicadas; no se exige aceptar documentos inexistentes');
  if (remoto) ok(!fr.elements.aceptaDatos && fr.querySelector('button[type=submit]').disabled && /pendiente de habilitación/i.test(texto()), 'Producción sin aviso publicado: el formulario no recoge datos (envío deshabilitado) hasta que la FMA publique el aviso de información');
  else ok(fr.elements.aceptaDatos && !fr.elements.aceptaDatos.checked && fr.elements.documentoDatosId.value === 'doc-aviso-registro-2026-11-v1' && /Aviso en preparación · solo registros de prueba/.test(texto()), 'Desarrollo: aviso de información preparado (versión identificada), casilla de autorización independiente y sin marcar');
  await ir('/aviso-registro'); ok(remoto ? /Documento no disponible/.test(texto()) : (/Aviso preparado · pendiente de validación/.test(texto()) && /Responsable del tratamiento/.test(texto()) && /NIT 901076207-2/.test(texto()) && /PENDIENTE DE COMPLETAR/.test(texto())), 'Aviso de información: ' + (remoto ? 'no publicado en producción' : 'versión fechada con responsable, datos, finalidades, derechos, canales (pendiente de completar) y exclusión de datos sensibles'));
  await ir('/condiciones'); ok(remoto ? /Documento no disponible/.test(texto()) : /Borrador jurídico · no vigente/.test(texto()), 'Condiciones de uso: ' + (remoto ? 'no publicadas' : 'borrador identificado como no vigente'));
  await ir('/activar-invitacion'); fr = q('form[data-form=activar-invitacion]'); ok(fr && fr.elements.codigo && (remoto ? fr.querySelector('button[type=submit]').disabled : (fr.elements.aceptaDatos && !fr.elements.aceptaDatos.checked)), 'Activación de invitaciones: formulario visible con la misma base de información que el registro');
  await ir('/acceso'); ok(!q('.perfil-demo') && q('form[data-form=acceso] input[name=clave][type=password]'), 'Acceso: correo + contraseña, sin selector de perfiles');
  await ir('/sello-turquesa');
  const fi = q('form[data-form=sello-interes]'); fi.elements.organizacion.value = 'Empresa Interesada S.A.S.'; fi.elements.contacto.value = 'Carolina Pérez'; fi.elements.email.value = 'carolina@interesada.test'; fi.elements.autorizaContacto.checked = true; await submit(fi);
  const interes = estado().interesesSello.find(i => i.email === 'carolina@interesada.test');
  ok(remoto ? (interes && interes.estado === 'recibida' && /Manifestación de interés enviada/.test(texto())) : (interes && interes.estado === 'pendiente-envio' && /aún no ha sido enviada/.test(texto())), remoto ? 'Interés en el Sello enviado al servicio (POST /sello/intereses) y confirmado' : 'Interés en el Sello sin servicio: registrado como pendiente, no presentado como enviado');

  console.log('\n[Seguridad · sin sesión]');
  for (const r of ['/organizacion/inicio', '/colaborador/inicio', '/fma/inicio', '/fma/usuarios']) { await ir(r); ok(w.location.hash.startsWith('#/acceso?volver='), 'Sin sesión, ' + r + ' redirige a acceso'); }
  let fa; await ir('/acceso'); fa = q('form[data-form=acceso]'); fa.elements.email.value = 'tecnica@fma.demo'; fa.elements.clave.value = ''; await submit(fa);
  ok(!TH.auth.sesion(), 'No se puede ingresar solo con el correo');
  fa = q('form[data-form=acceso]'); fa.elements.email.value = 'tecnica@fma.demo'; fa.elements.clave.value = 'incorrecta123'; await submit(fa);
  ok(!TH.auth.sesion() && /incorrectos/.test(texto()), 'Contraseña incorrecta rechazada' + (remoto ? ' (401 del servidor)' : ''));
  w.sessionStorage.setItem('th-sesion', JSON.stringify({ userId: 'usr-inventado', rol: 'fma', permisos: ['*'], expira: Date.now() + 99999 }));
  await ir('/fma/usuarios'); await sleep(h.espera * 2);
  ok(!TH.auth.sesion() && w.location.hash.startsWith('#/acceso'), 'Sesión inventada en sessionStorage no abre el panel FMA' + (remoto ? ' (el servidor responde 401)' : ''));
  w.localStorage.setItem('th-sesion', JSON.stringify({ userId: 'usr-fma-001', rol: 'fma', permisos: ['*'] })); await ir('/fma/inicio'); ok(!TH.auth.sesion(), 'localStorage no es fuente de sesión'); w.localStorage.removeItem('th-sesion');
  ok(TH.auth._sesionDePrueba('usr-fma-001').ok === !remoto, remoto ? 'La sesión de prueba está deshabilitada en producción' : 'La sesión de prueba solo existe en desarrollo');
  TH.auth._limpiarSesion();

  console.log('\n[FMA · aviso transitorio de registro: validación jurídica y publicación' + (remoto ? ' (requisito en producción)' : ' (en desarrollo el registro de prueba no la necesita)') + ']');
  const docAviso = () => estado().documentosLegales.find(d => d.tipo === 'aviso-registro');
  await login('tecnica@fma.demo', CLAVE); ok(TH.auth.rol() === 'fma' && !TH.auth.tienePermiso('documentos:aprobar'), 'Revisión técnica ingresa; no puede aprobar documentos jurídicos');
  await ir('/fma/documentos-legales'); ok((remoto ? /pendiente de habilitación/i : /registro de prueba con el aviso preparado/i).test(texto()) && /transitorio/.test(texto()) && !q('[data-action=fma-doc-aprobar]'), 'Documentos jurídicos: tres tipos (aviso transitorio, condiciones, política); estado del registro explicado; técnica no ve el botón de aprobación');
  let r = await TH.api.documentosLegales.aprobar(docAviso().id, 'aprobada', ''); ok(r.ok === false, 'Técnica no puede registrar la validación jurídica del aviso (API)');
  if (remoto) {
    await ir('/fma/documentos-legales?id=' + docAviso().id); ok(/Pendiente antes de publicar/.test(texto()), 'Detalle del aviso: lista lo pendiente de completar por la FMA');
    await click('[data-action=fma-doc-revision]'); ok(docAviso().estado === 'en-revision-juridica', 'Técnica envía el aviso a revisión jurídica');
    await logout();
    await login('juridica@fma.demo', CLAVE); ok(TH.auth.tienePermiso('documentos:aprobar') && !TH.auth.tienePermiso('documentos:publicar'), 'Revisión jurídica puede validar, no publicar');
    await ir('/fma/documentos-legales?id=' + docAviso().id); await click('[data-action=fma-doc-aprobar][data-resultado=aprobada]'); let fap = q('form[data-form=fma-doc-aprobar]'); fap.elements.nota.value = 'Validado para registro inicial'; await submit(fap);
    ok(docAviso().estado === 'aprobado' && docAviso().aprobacion && docAviso().aprobacion.porId === TH.auth.sesion().userId, 'Validación jurídica del aviso registrada con revisora, fecha y versión');
    r = await TH.api.documentosLegales.publicar(docAviso().id); ok(r.ok === false, 'Jurídica no puede publicar');
    await ir('/registro'); ok(q('form[data-form=registro] button[type=submit]').disabled, 'Registro sigue sin habilitarse: validado no es publicado');
    await logout();
    await login('turquesa@fma.demo', CLAVE);
    await ir('/fma/documentos-legales?id=' + docAviso().id); await click('[data-action=fma-doc-publicar]'); let fpub = q('form[data-form=fma-doc-publicar]'); ok(fpub && !fpub.elements.requiereNuevaAutorizacion, 'Publicación del aviso: sin opción de nueva autorización (es la base inicial)'); await submit(fpub); await sleep(h.espera * 2);
    ok(docAviso().estado === 'publicado' && TH.api.documentosLegales.registroHabilitado() && TH.api.documentosLegales.baseRegistro().origen === 'aviso', 'Aviso transitorio publicado: registro habilitado sin políticas definitivas');
    await ir('/fma/documentos-legales'); ok(/Registro habilitado con el aviso transitorio/.test(texto()), 'Administración: estado del registro actualizado');
  }
  await logout();
  await ir('/registro'); fr = q('form[data-form=registro]');
  ok(fr && !fr.querySelector('button[type=submit]').disabled && fr.elements.aceptaDatos && !fr.elements.aceptaCondiciones && (remoto ? /Aviso transitorio vigente/.test(texto()) : /Aviso en preparación/.test(texto())), 'Registro disponible con el aviso ' + (remoto ? 'transitorio publicado' : 'preparado (desarrollo)') + '; sin aceptación de condiciones no publicadas');
  await login('turquesa@fma.demo', CLAVE); ok(TH.auth.tienePermiso('usuarios:gestionar'), 'Administración integral ingresa');

  console.log('\n[FMA · módulos formativos y contenidos: flujo editorial por permisos]');
  const modV = () => estado().modulos.find(m => m.moduloId === 'mod-1' && m.version === '1.0');
  await ir('/fma/formacion'); ok(/Ningún módulo está publicado/.test(texto()) && q('a[href="#/fma/formacion/version?id=' + modV().id + '"]'), 'Formación: 4 módulos en revisión, ninguno publicado');
  await ir('/fma/formacion/version?id=' + modV().id); ok(q('[data-action=fma-modulo-revision][data-tipo=tecnica]') && !q('[data-action=fma-modulo-revision][data-tipo=juridica]') && !q('[data-action=fma-modulo-revision][data-tipo=psicosocial]'), 'Administración integral puede registrar la revisión técnica pero no la jurídica ni la psicosocial');
  r = await TH.api.modulos.registrarRevision(modV().id, 'juridica', 'aprobada', ''); ok(r.ok === false, 'Ni la administración integral puede registrar la revisión jurídica de un módulo');
  r = await TH.api.documentosLegales.aprobar(estado().documentosLegales.find(d => d.tipo === 'condiciones-uso').id, 'aprobada', ''); ok(r.ok === false, 'Ni la administración integral puede registrar la aprobación jurídica de un documento');
  r = await TH.api.modulos.cambiarEstado(modV().id, 'aprobado', ''); ok(r.ok === false && /revisiones/.test(r.error), 'No se puede aprobar un módulo sin las tres revisiones');
  r = await TH.api.modulos.cambiarEstado(modV().id, 'publicado', ''); ok(r.ok === false, 'No se puede publicar un módulo no aprobado');
  // Edición: crea nueva versión solo si no hay una en curso; editar reinicia revisiones
  await click('[data-action=fma-modulo-editar]'); const fm = q('form[data-form=fma-modulo]'); ok(fm && fm.querySelectorAll('[name=lecTitulo]').length === 4 && fm.querySelectorAll('[name=qTexto]').length === 5, 'Editor estructurado del módulo: 4 lecciones y 5 preguntas');
  fm.elements.resumen.value = fm.elements.resumen.value + ' (edición de prueba)'; await submit(fm);
  ok(/edición de prueba/.test(modV().resumen) && modV().estado === 'borrador', 'Edición guardada; la versión vuelve a borrador con revisiones reiniciadas');
  await logout();
  // Revisiones por cada perfil
  for (const [cuenta, tipo, otroTipo] of [['tecnica@fma.demo', 'tecnica', 'juridica'], ['juridica@fma.demo', 'juridica', 'psicosocial'], ['psicosocial@fma.demo', 'psicosocial', 'tecnica']]) {
    await login(cuenta, CLAVE);
    const rr = await TH.api.modulos.registrarRevision(modV().id, otroTipo, 'aprobada', ''); ok(rr.ok === false, cuenta + ' no puede registrar la revisión ' + otroTipo + ' del módulo');
    await ir('/fma/formacion/version?id=' + modV().id); await click('[data-action=fma-modulo-revision][data-tipo=' + tipo + '][data-resultado=aprobada]'); const f = q('form[data-form=fma-modulo-revision]'); f.elements.observaciones.value = 'Conforme'; await submit(f);
    const rc = await TH.api.contenidos.registrarRevision('rec-glosario', tipo, 'aprobada', 'Conforme'); const rc2 = await TH.api.contenidos.registrarRevision('rec-respuesta', tipo, 'aprobada', 'Conforme');
    ok(modV().revisiones.some(x => x.tipo === tipo && x.resultado === 'aprobada' && x.revisorId === TH.auth.sesion().userId) && rc.ok && rc2.ok, cuenta + ' registra su revisión del módulo y de dos contenidos con nombre, fecha y versión');
    await logout();
  }
  await login('turquesa@fma.demo', CLAVE);
  r = await TH.api.modulos.cambiarEstado(modV().id, 'aprobado', ''); ok(r.ok && modV().estado === 'aprobado', 'Módulo aprobado tras las tres revisiones');
  await ir('/fma/formacion/version?id=' + modV().id); await click('[data-action=fma-modulo-estado][data-estado=publicado]'); await submit(q('form[data-form=fma-modulo-estado]'));
  ok(modV().estado === 'publicado' && modV().publicacion && TH.api.formacion.modulos().length === 1 && TH.api.formacion.modulos()[0].id === 'mod-1', 'Módulo 1 v1.0 publicado: es el único disponible para organizaciones');
  r = await TH.api.modulos.crearVersion('mod-1', 'Ajuste'); ok(r.ok && estado().modulos.filter(m => m.moduloId === 'mod-1').length === 2 && TH.api.modulos.publicado('mod-1').version === '1.0', 'Nueva versión 1.1 en borrador; la 1.0 sigue publicada');
  r = await TH.api.modulos.crearVersion('mod-1', 'Otra'); ok(r.ok === false, 'No se abre una segunda versión mientras una está en edición');
  for (const id of ['rec-glosario', 'rec-respuesta']) { r = await TH.api.contenidos.cambiarEstado(id, 'aprobado', ''); const r2 = await TH.api.contenidos.cambiarEstado(id, 'publicado', ''); ok(r.ok && r2.ok && estado().contenidos.find(c => c.id === id).estado === 'publicado', 'Contenido ' + id + ' aprobado y publicado'); }
  r = await TH.api.contenidos.cambiarEstado('rec-prevencion', 'aprobado', ''); ok(r.ok === false, 'Contenido sin revisiones no puede aprobarse');
  ok(TH.api.contenidos.visibles('organizacion').length === 2 && TH.api.contenidos.visibles('colaborador').length === 1, 'Solo los contenidos publicados son visibles fuera del espacio editorial (2 para organizaciones, 1 para colaboradores)');
  await logout();

  console.log('\n[Empresa nueva · registro → verificación → acceso → autodiagnóstico → plan → seguimiento → reportes]');
  await ir('/registro'); let f = q('form[data-form=registro]');
  ok(f && f.elements.clave && f.elements.aceptaDatos && !f.elements.aceptaCondiciones && new RegExp('versión ' + docAviso().version).test(texto()), 'Formulario de registro con referencia a la versión del aviso de información');
  const llenar = (f) => { f.elements.nombre.value = 'Panadería La Esperanza S.A.S.'; f.elements.tipoIdentificacion.value = 'NIT'; f.elements.tipoIdentificacion.dispatchEvent(new w.Event('change', { bubbles: true })); f.elements.identificacion.value = '900.123.456-8'; f.elements.sector.value = 'Comercio'; f.elements.tamano.value = 'pequena'; f.elements.departamento.value = 'Caldas'; f.elements.departamento.dispatchEvent(new w.Event('change', { bubbles: true })); f.elements.municipio.value = 'Manizales'; f.elements.emailInstitucional.value = 'contacto@esperanza.test'; f.elements.responsable.value = 'Marta Quintero'; f.elements.cargo.value = 'Gerente / Director(a)'; f.elements.email.value = 'marta@esperanza.test'; f.elements.clave.value = CLAVE; f.elements.claveConfirmacion.value = CLAVE; if (f.elements.aceptaCondiciones) f.elements.aceptaCondiciones.checked = true; f.elements.aceptaDatos.checked = true; };
  llenar(f); f.elements.identificacion.value = '900.123.456-1'; await submit(f);
  ok(!buscarOrg('Esperanza') && /dígito de verificación/.test(texto()), 'NIT con dígito de verificación incorrecto rechazado');
  f = q('form[data-form=registro]'); llenar(f); f.elements.aceptaDatos.checked = false; await submit(f);
  ok(!buscarOrg('Esperanza') && /autorizar el tratamiento/.test(texto()), 'Registro exige autorización de tratamiento de datos');
  f = q('form[data-form=registro]'); llenar(f); await submit(f); await sleep(h.espera * 4);
  const orgNueva = buscarOrg('Esperanza'); const usrNuevo = orgNueva && usuarios().find(u => u.orgId === orgNueva.id);
  ok(orgNueva && usrNuevo && usrNuevo.credencial && usrNuevo.credencial.hash && usrNuevo.consentimientos.length === 1 && usrNuevo.consentimientos[0].tipo === 'aviso-registro' && usrNuevo.consentimientos[0].documentoId === docAviso().id && usrNuevo.consentimientos[0].version && usrNuevo.consentimientos[0].fecha && usrNuevo.consentimientos[0].transitorio === true && usrNuevo.consentimientos[0].validado === remoto, 'Organización y responsable creados; contraseña como hash con sal; autorización registrada con identificador, versión y fecha del aviso (transitorio' + (remoto ? ', validado)' : ', sin validar: prueba)'));
  if (remoto) {
    ok(w.location.hash.startsWith('#/verificar-correo'), 'Producción: el registro continúa a verificación de correo');
    await ir('/acceso'); fa = q('form[data-form=acceso]'); fa.elements.email.value = 'marta@esperanza.test'; fa.elements.clave.value = CLAVE; await submit(fa);
    ok(!TH.auth.sesion() && /verifica/i.test(texto() + w.location.hash), 'Sin verificar el correo no se puede ingresar (403 CORREO_NO_VERIFICADO)');
    await ir('/verificar-correo?token=' + usrNuevo.tokenVerificacion); await sleep(h.espera * 3);
    ok(usuarios().find(u => u.id === usrNuevo.id).correoVerificado === true, 'Correo verificado con el token (POST /auth/verificacion/confirmar)');
  }
  await ir('/registro'); f = q('form[data-form=registro]'); llenar(f); f.elements.email.value = 'otra@esperanza.test'; await submit(f);
  ok(estado().organizaciones.filter(o => o.nombre.includes('Esperanza')).length === 1 && /Ya existe/.test(texto()), 'Duplicado por NIT rechazado');
  await login('marta@esperanza.test', CLAVE);
  ok(TH.auth.sesion() && TH.auth.rol() === 'organizacion' && TH.auth.orgId() === orgNueva.id, 'Acceso con correo y contraseña → sesión de organización');
  await ir('/organizacion/inicio'); ok(/Bienvenida a Turquesa Hub/.test(texto()), 'Bienvenida de primera vez');
  await click('[data-action=org-iniciar-onboarding][data-ruta="/organizacion/diagnostico"]');
  ok(nav().length === 12 && !nav().some(x => /postulacion|autoevaluacion|evaluacion/.test(x)), 'Menú de organización: 12 secciones, sin proceso formal del Sello');
  await ir('/organizacion/perfil'); f = q('form[data-form=org-perfil]'); f.elements.telefono.value = '3001234567'; await submit(f);
  ok(org(orgNueva.id).telefono === '3001234567', 'Perfil organizacional editable (PATCH)');
  await ir('/organizacion/diagnostico'); await click('[data-action=diag-iniciar]');
  ok(/de 16 respondidas/.test(texto()) && /Capacidad que examina/.test(texto()), 'Autodiagnóstico iniciado con fundamento por pregunta');
  const opciones = ['si', 'parcial', 'no', 'nose'];
  for (let i = 0; i < 16; i++) { const form = q('form[data-form=diag-responder]'); let op = opciones[i % 4]; if (i === 5 && form.querySelector('input[value=na]')) op = 'na'; form.querySelector('input[value=' + op + ']').checked = true; if (op === 'na') form.querySelector('[name=justificacion]').value = 'No aplica por tamaño'; await submit(form); }
  const diag = () => estado().diagnosticos.find(d => d.orgId === orgNueva.id);
  ok(Object.keys(diag().respuestas).length === 16, '16 respuestas guardadas' + (remoto ? ' en el servidor (PUT respuestas)' : ''));
  await ir('/organizacion/diagnostico?revisar=1'); await click('[data-action=diag-finalizar]'); await sleep(h.espera * 2);
  ok(w.location.hash === '#/organizacion/diagnostico/resultados' && diag().estado === 'completado' && /Fortalezas declaradas/.test(texto()) && /no es una evaluación validada/.test(texto()), 'Resultados: completado, declarado vs con evidencia, aviso de no validación');
  await ir('/organizacion/plan-accion');
  const sel = [...w.document.querySelectorAll('input[name=sel]')]; ok(sel.length >= 6, 'Plan: recomendaciones derivadas de las brechas (' + sel.length + ')'); sel[0].checked = false; await submit(q('form[data-form=plan-generar]')); await sleep(h.espera * 2);
  const plan = () => estado().planes.find(p => p.orgId === orgNueva.id);
  ok(plan() && plan().acciones.length === sel.length - 1 && w.location.hash === '#/organizacion/plan-accion', 'Plan creado con las recomendaciones seleccionadas (' + plan().acciones.length + ')');
  await click('[data-action=plan-nueva-accion]'); f = q('form[data-form=plan-nueva]'); f.elements.dim.value = 'd2'; f.elements.objetivo.value = 'Acción propia de prueba'; f.elements.accion.value = 'Realizar un taller.'; f.elements.responsable.value = 'Talento Humano'; f.elements.fechaObjetivo.value = '2026-01-15'; f.elements.indicador.value = 'Taller realizado'; f.elements.meta.value = '1 taller'; await submit(f); await sleep(h.espera * 2);
  const propia = () => plan().acciones.find(a => a.objetivo === 'Acción propia de prueba');
  ok(propia() && propia().origen === 'propia', 'Acción propia añadida');
  await ir('/organizacion/plan-accion/detalle?id=' + propia().id); f = q('form[data-form=plan-editar]'); f.elements.avance.value = '40'; f.elements.estado.value = 'en-ejecucion'; await submit(f);
  await click('[data-action=evidencia-nueva]'); f = q('form[data-form=evidencia-nueva]'); f.elements.nombre.value = 'Acta-taller.pdf'; f.elements.tipo.value = 'Acta o registro de reunión';
  const archivo = new w.File(['%PDF-1.4 prueba'], 'Acta-taller.pdf', { type: 'application/pdf' }); Object.defineProperty(f.elements.archivo, 'files', { value: [archivo] });
  await submit(f); await sleep(h.espera * 2);
  const ev = () => estado().evidencias.filter(e => e.accionId === propia().id);
  ok(propia().avance === 40 && ev().length === 1 && ev()[0].archivo && ev()[0].archivo.nombre === 'Acta-taller.pdf' && ev()[0].archivo.estado === (remoto ? 'cargado' : 'referencia-sin-archivo'), 'Acción editada (40%) y evidencia con archivo ' + (remoto ? 'cargada por multipart al servidor' : 'registrada como referencia (sin almacenamiento en desarrollo)'));
  const grande = new w.File([new Uint8Array(11 * 1024 * 1024)], 'grande.pdf', { type: 'application/pdf' });
  await click('[data-action=evidencia-nueva]'); f = q('form[data-form=evidencia-nueva]'); f.elements.nombre.value = 'grande.pdf'; f.elements.tipo.value = 'Informe o reporte'; Object.defineProperty(f.elements.archivo, 'files', { value: [grande] }); await submit(f);
  ok(ev().length === 1 && /supera/.test(w.document.body.textContent), 'Archivo mayor al límite rechazado en cliente'); TH.ui.cerrarModal();
  await ir('/organizacion/plan-accion/seguimiento'); ok(/Acciones vencidas/.test(texto()) && /Acción propia de prueba/.test(texto()), 'Seguimiento: acción con fecha pasada listada como vencida');
  await ir('/organizacion/plan-accion'); ok(q('[data-action=plan-descargar-csv]') && TH.api.plan.aCSV(plan()).split('\n').length === plan().acciones.length + 1, 'CSV del plan');
  await ir('/organizacion/reportes'); await click('[data-action=imprimir]'); ok(w.__printed >= 1 && /Evidencias registradas/.test(texto()), 'Reporte institucional (PDF por impresión)');
  await ir('/organizacion/colaboradores'); await click('[data-action=colab-invitar]'); f = q('form[data-form=colab-invitar]'); ok(f.querySelectorAll('input[name=modulos]').length === 1, 'Invitación: solo se ofrecen los módulos publicados (1)'); f.elements.nombre.value = 'Julián Ríos'; f.elements.email.value = 'julian@esperanza.test'; await submit(f); await sleep(h.espera * 2);
  const inv = () => estado().invitaciones.find(i => i.orgId === orgNueva.id);
  ok(inv() && inv().estado === 'pendiente' && inv().modulos.length === 1 && inv().codigo, 'Invitación creada con el módulo publicado y código');
  await ir('/organizacion/biblioteca'); ok(w.document.querySelectorAll('a.card').length === 2 && !/Versión preliminar/.test(texto()), 'Biblioteca: solo los 2 contenidos publicados');
  await ir('/organizacion/biblioteca?id=rec-prevencion'); ok(/Recurso no disponible/.test(texto()), 'Un contenido en revisión no se abre por URL');
  await ir('/organizacion/biblioteca?id=rec-respuesta'); ok(/Referencias/.test(texto()) && !/solo orienta y no investiga/.test(texto()) && /Comité de Convivencia/.test(texto()), 'Guía publicada con referencias y competencias correctas');
  await ir('/organizacion/configuracion'); f = q('form[data-form=cambiar-clave]'); f.elements.actual.value = CLAVE; f.elements.nueva.value = 'NuevaClave2026'; f.elements.confirmacion.value = 'NuevaClave2026'; await submit(f); await sleep(h.espera * 2);
  await logout(); await login('marta@esperanza.test', 'NuevaClave2026'); ok(!!TH.auth.sesion(), 'Cambio de contraseña efectivo (POST /auth/clave)');
  await recorrer(['/organizacion/inicio', '/organizacion/perfil', '/organizacion/diagnostico', '/organizacion/diagnostico/resultados', '/organizacion/plan-accion', '/organizacion/plan-accion/seguimiento', '/organizacion/plan-accion/detalle?id=' + propia().id, '/organizacion/colaboradores', '/organizacion/sensibilizacion', '/organizacion/biblioteca', '/organizacion/reportes', '/organizacion/sello', '/organizacion/configuracion'], 'Organización nueva');

  console.log('\n[Aislamiento entre organizaciones]');
  const otraOrg = estado().organizaciones.find(o => o.id !== orgNueva.id && estado().planes.some(p => p.orgId === o.id)); const otroPlan = estado().planes.find(p => p.orgId === otraOrg.id);
  await ir('/organizacion/plan-accion/detalle?id=' + otroPlan.acciones[0].id); ok(/Acción no encontrada/.test(texto()), 'No se accede por URL a acciones de otra organización');
  r = await TH.api.plan.actualizarAccion(orgNueva.id, otroPlan.acciones[0].id, { avance: 99 }); ok(estado().planes.find(p => p.orgId === otraOrg.id).acciones[0].avance !== 99, 'No se modifican acciones de otra organización' + (remoto ? ' (404 del servidor)' : ''));
  ok(remoto ? !JSON.stringify(TH.store.get().evidencias).includes(otraOrg.id) : !TH.api.evidencias.listar(orgNueva.id).some(e => e.orgId !== orgNueva.id), remoto ? 'La caché del cliente no contiene evidencias de otras organizaciones' : 'Las evidencias se consultan solo por la organización de la sesión');
  await ir('/fma/organizaciones'); ok(/no corresponde a tu perfil/.test(texto()), 'Una organización no accede al panel FMA');
  await logout(); ok(!TH.auth.sesion() && !w.sessionStorage.getItem('th-sesion'), 'Cierre de sesión limpia la sesión');

  console.log('\n[Colaborador · activación → módulo publicado → ejercicio → constancia]');
  await ir('/activar-invitacion'); f = q('form[data-form=activar-invitacion]'); f.elements.codigo.value = 'CODIGO-FALSO'; f.elements.nombre.value = 'Julián'; f.elements.clave.value = CLAVE; f.elements.claveConfirmacion.value = CLAVE; f.elements.aceptaDatos.checked = true; await submit(f);
  ok(!TH.auth.sesion() && /no es válido/.test(texto()), 'Código de invitación inválido rechazado');
  f = q('form[data-form=activar-invitacion]'); f.elements.codigo.value = inv().codigo; f.elements.nombre.value = 'Julián Ríos'; f.elements.clave.value = CLAVE; f.elements.claveConfirmacion.value = CLAVE; f.elements.aceptaDatos.checked = false; await submit(f);
  ok(!usuarios().find(u => u.email === 'julian@esperanza.test') && /autorizar el tratamiento/i.test(texto()), 'Activación exige la autorización de datos (casilla no premarcada)');
  f = q('form[data-form=activar-invitacion]'); f.elements.codigo.value = inv().codigo; f.elements.nombre.value = 'Julián Ríos'; f.elements.clave.value = CLAVE; f.elements.claveConfirmacion.value = CLAVE; f.elements.aceptaDatos.checked = true; await submit(f); await sleep(h.espera * 4);
  const col = () => usuarios().find(u => u.email === 'julian@esperanza.test');
  ok(col() && col().rol === 'colaborador' && col().orgId === orgNueva.id && inv().estado === 'activada' && col().consentimientos.length === 1 && col().consentimientos[0].documentoId === docAviso().id, 'Invitación activada sin políticas definitivas: colaborador vinculado con la autorización versionada del aviso');
  if (!TH.auth.sesion()) await login('julian@esperanza.test', CLAVE);
  ok(TH.auth.rol() === 'colaborador', 'Sesión de colaborador');
  await ir('/colaborador/inicio'); ok(nav().length === 5 && /Panadería La Esperanza/.test(texto()) && TH.api.formacion.asignados(col().id).length === 1, 'Inicio del colaborador: 1 módulo asignado (el publicado)');
  await ir('/colaborador/formacion/modulo?id=mod-2'); ok(/Módulo no (asignado|encontrado)/.test(texto()), 'Un módulo no publicado/no asignado no se abre');
  await ir('/colaborador/formacion/modulo?id=mod-1'); ok(/Actividad de reflexión/.test(texto()) && /Referencias de esta lección/.test(texto()) && /edición de prueba|Objetivos del módulo/.test(texto()), 'Lección publicada (versión editada) con actividad y referencias');
  for (const l of TH.api.formacion.modulo('mod-1').lecciones) { await click('[data-action=col-leccion-vista][data-leccion=' + l.id + ']'); }
  ok(/Ejercicio de apropiación/.test(texto()) && w.document.querySelectorAll('fieldset').length === 5, 'Ejercicio de 5 preguntas');
  for (const qz of TH.api.formacion.modulo('mod-1').quiz) { const radio = q('input[name=' + qz.id + '][value=' + qz.correcta + ']'); radio.checked = true; radio.dispatchEvent(new w.Event('change', { bubbles: true })); await sleep(h.espera * 2); }
  ok(w.document.querySelectorAll('.retro--ok').length === 5, 'Retroalimentación inmediata por pregunta');
  await click('[data-action=col-finalizar]'); await sleep(h.espera);
  const prog = () => estado().progresoFormativo.find(p => p.userId === col().id && p.moduloId === 'mod-1');
  ok(/Constancia de participación/.test(texto()) && prog() && prog().estado === 'completado' && prog().puntaje === 100, 'Módulo completado: constancia y progreso registrado');
  await ir('/colaborador/recursos'); ok(w.document.querySelectorAll('a.card').length === 1, 'Recursos del colaborador: solo contenidos publicados para su público (1)');
  await ir('/organizacion/inicio'); ok(/no corresponde a tu perfil/.test(texto()), 'Colaborador no accede al espacio de organización');
  r = await TH.api.usuarios.crearInterno({ nombre: 'x', email: 'x@x.test' }); ok(r.ok === false, 'Colaborador no puede crear usuarios internos');
  await recorrer(['/colaborador/inicio', '/colaborador/formacion', '/colaborador/formacion/modulo?id=mod-1', '/colaborador/mi-progreso', '/colaborador/recursos', '/colaborador/recursos?id=rec-glosario', '/colaborador/perfil'], 'Colaborador');
  await logout();

  console.log('\n[Políticas definitivas publicadas después · cuentas intactas, información y nuevas autorizaciones]');
  const docCond = () => estado().documentosLegales.find(d => d.tipo === 'condiciones-uso'); const docDatos = () => estado().documentosLegales.find(d => d.tipo === 'tratamiento-datos');
  const antes = { org: JSON.stringify(org(orgNueva.id)), diag: JSON.stringify(estado().diagnosticos.find(d => d.orgId === orgNueva.id)), plan: JSON.stringify(estado().planes.find(p => p.orgId === orgNueva.id)), cons: JSON.stringify(usuarios().find(u => u.id === usrNuevo.id).consentimientos) };
  await login('tecnica@fma.demo', CLAVE);
  for (const d of [docCond(), docDatos()]) { await ir('/fma/documentos-legales?id=' + d.id); await click('[data-action=fma-doc-revision]'); }
  ok(docCond().estado === 'en-revision-juridica' && docDatos().estado === 'en-revision-juridica', 'Técnica envía las condiciones y la política definitivas a revisión jurídica');
  await logout(); await login('juridica@fma.demo', CLAVE);
  for (const d of [docCond(), docDatos()]) { await ir('/fma/documentos-legales?id=' + d.id); await click('[data-action=fma-doc-aprobar][data-resultado=aprobada]'); const fa2 = q('form[data-form=fma-doc-aprobar]'); fa2.elements.nota.value = 'Revisado'; await submit(fa2); }
  ok(docCond().estado === 'aprobado' && docDatos().estado === 'aprobado' && docDatos().aprobacion && docDatos().aprobacion.porId === TH.auth.sesion().userId, 'Aprobación jurídica registrada en ambos documentos con revisora, fecha y versión');
  r = await TH.api.documentosLegales.publicar(docDatos().id); ok(r.ok === false, 'Jurídica no puede publicar');
  await logout(); await login('turquesa@fma.demo', CLAVE);
  await ir('/fma/documentos-legales?id=' + docCond().id); await click('[data-action=fma-doc-publicar]'); let fp = q('form[data-form=fma-doc-publicar]'); ok(fp && fp.elements.requiereNuevaAutorizacion && !fp.elements.requiereNuevaAutorizacion.checked, 'Publicar condiciones: la opción de nueva autorización existe y no viene marcada'); fp.elements.nota.value = 'Primera versión definitiva de las condiciones.'; await submit(fp); await sleep(h.espera * 2);
  await ir('/fma/documentos-legales?id=' + docDatos().id); await click('[data-action=fma-doc-publicar]'); fp = q('form[data-form=fma-doc-publicar]'); fp.elements.requiereNuevaAutorizacion.checked = true; fp.elements.nota.value = 'Se precisan las finalidades y el canal de ejercicio de derechos.'; await submit(fp); await sleep(h.espera * 2);
  ok(docCond().estado === 'publicado' && docDatos().estado === 'publicado' && docDatos().publicacion.requiereNuevaAutorizacion === true && docCond().publicacion.requiereNuevaAutorizacion === false, 'Condiciones (solo informar) y política (requiere nueva autorización) publicadas');
  ok(TH.api.documentosLegales.baseRegistro().origen === 'politica' && (!remoto || docAviso().estado === 'publicado'), 'La política definitiva sustituye al aviso transitorio como base del registro; el aviso conserva su historial');
  await ir('/fma/documentos-legales'); ok(/Registro habilitado con la política definitiva/.test(texto()) && /pendientes/.test(texto()), 'Administración: registro con política definitiva y conteo de autorizaciones pendientes');
  r = await TH.api.documentosLegales.crearVersion('condiciones-uso', {}); ok(r.ok && estado().documentosLegales.filter(d => d.tipo === 'condiciones-uso').length === 2, 'Nueva versión de condiciones creada en borrador sin afectar la vigente');
  r = await TH.api.documentosLegales.publicar(r.documento.id); ok(r.ok === false, 'Un borrador sin aprobación jurídica no puede publicarse');
  await logout();
  ok(JSON.stringify(org(orgNueva.id)) === antes.org && JSON.stringify(estado().diagnosticos.find(d => d.orgId === orgNueva.id)) === antes.diag && JSON.stringify(estado().planes.find(p => p.orgId === orgNueva.id)) === antes.plan && JSON.stringify(usuarios().find(u => u.id === usrNuevo.id).consentimientos) === antes.cons, 'La publicación posterior no borra ni modifica cuenta, diagnóstico, plan ni autorizaciones previas (sin aceptaciones retroactivas)');
  await login('marta@esperanza.test', 'NuevaClave2026'); ok(TH.auth.sesion() && TH.auth.orgId() === orgNueva.id, 'La organización registrada con el aviso sigue ingresando');
  await ir('/organizacion/inicio'); ok(q('.aviso-politicas') && /Se requiere tu autorización: Política de tratamiento/.test(texto()) && /Nueva versión publicada: Condiciones de uso/.test(texto()) && /Tu recorrido|Bienvenida/.test(texto()), 'Espacio de la organización: aviso informativo (condiciones) y solicitud de nueva autorización (política) sin bloquear el trabajo');
  await click('[data-action=politicas-revisar][data-id="' + docCond().id + '"]'); let fpol = w.document.querySelector('form[data-form=politicas-aceptar]'); ok(fpol && !fpol.elements.acepta && /Entendido/.test(w.document.body.textContent), 'Condiciones: revisión informativa, sin nueva autorización'); await submit(fpol); await sleep(h.espera * 3);
  await click('[data-action=politicas-revisar][data-id="' + docDatos().id + '"]'); fpol = w.document.querySelector('form[data-form=politicas-aceptar]'); ok(fpol && fpol.elements.acepta && !fpol.elements.acepta.checked, 'Política: casilla de autorización independiente, sin marcar'); await submit(fpol); await sleep(h.espera);
  ok(/Marca la casilla/.test(w.document.body.textContent) && !usuarios().find(u => u.id === usrNuevo.id).consentimientos.some(c => c.documentoId === docDatos().id), 'Sin marcar la casilla no se registra la autorización');
  fpol.elements.acepta.checked = true; await submit(fpol); await sleep(h.espera * 3);
  const cons = usuarios().find(u => u.id === usrNuevo.id).consentimientos;
  ok(cons.length === 3 && cons[0].tipo === 'aviso-registro' && cons.some(c => c.documentoId === docCond().id && c.modo === 'informado') && cons.some(c => c.documentoId === docDatos().id && c.modo === 'aceptacion' && c.transitorio === false && c.fecha > cons[0].fecha), 'Historial de autorizaciones: aviso inicial + condiciones (informado) + política (autorización), con versiones y fechas, sin reescribir lo anterior');
  await ir('/organizacion/inicio'); ok(!q('.aviso-politicas'), 'Sin pendientes: los avisos desaparecen');
  await ir('/organizacion/configuracion'); ok(/aviso transitorio/.test(texto()) && /autorización registrada/.test(texto()) && /informado/.test(texto()), 'Cuenta y datos: historial de autorizaciones visible para la organización');
  ok(TH.api.documentosLegales.pendientesAceptacion(col()).length === 2, 'El colaborador activado con el aviso tiene pendientes las dos versiones nuevas (se le informará al ingresar)');
  await logout();
  await ir('/registro'); fr = q('form[data-form=registro]'); ok(fr.elements.aceptaCondiciones && fr.elements.aceptaDatos && fr.elements.documentoDatosId.value === docDatos().id && fr.elements.documentoCondicionesId.value === docCond().id && /política de tratamiento de datos personales/.test(texto()), 'Nuevos registros: política definitiva y condiciones publicadas, con sus identificadores de versión');
  await ir('/privacidad'); ok(/Versión vigente/.test(texto()), 'Política de datos publicada como vigente');

  console.log('\n[Empresa existente · ' + (remoto ? 'datos del servidor' : 'semilla') + ']');
  await login('talento@cafeandino.demo', CLAVE); ok(TH.auth.orgId() === 'org-001', 'Acceso de organización existente');
  await ir('/organizacion/inicio'); ok(!/Bienvenida a Turquesa Hub/.test(texto()) && /Tu recorrido/.test(texto()) && TH.api.plan.obtener('org-001'), 'Panel con diagnóstico, plan y avance cargados');
  await ir('/organizacion/colaboradores'); ok(/Cobertura/.test(texto()) && TH.api.formacion.agregadosOrganizacion('org-001').colaboradores > 0, 'Colaboradores vinculados con cobertura agregada');
  ok(!JSON.stringify(TH.store.get().progresoFormativo.filter(p => p.orgId === 'org-001')).includes('"p1":"') || !remoto, remoto ? 'El servidor no entrega respuestas individuales a la organización' : 'Agregados sin respuestas individuales (vista)');
  await ir('/organizacion/sensibilizacion'); ok(/Bibliografía del módulo/.test(texto()), 'Sensibilización con bibliografía del módulo publicado');
  await logout();

  console.log('\n[FMA · administración]');
  await login('turquesa@fma.demo', CLAVE);
  await ir('/fma/inicio'); ok(nav().length === 12 && nav().includes('/fma/documentos-legales') && !nav().some(x => /evaluac|solicitudes|dictamen/.test(x)), 'Menú FMA: 12 secciones incluidos documentos jurídicos');
  await ir('/fma/organizaciones/detalle?id=' + orgNueva.id); ok(/Autorizaciones registradas/.test(texto()) && /Condiciones de uso v/.test(texto()), 'Detalle de organización con autorizaciones');
  await click('[data-action=fma-org-estado][data-estado=suspendida]'); f = q('form[data-form=fma-org-estado]'); f.elements.motivo.value = 'Prueba'; await submit(f);
  ok(org(orgNueva.id).estado === 'suspendida', 'Organización suspendida por la FMA');
  await logout(); await login('julian@esperanza.test', CLAVE); ok(!TH.auth.sesion() && /suspendido/.test(texto()), 'Colaborador de organización suspendida no puede ingresar');
  await login('turquesa@fma.demo', CLAVE); r = await TH.api.organizaciones.cambiarEstado(orgNueva.id, 'activa', ''); ok(r.ok && org(orgNueva.id).estado === 'activa', 'Organización reactivada');
  await ir('/fma/diagnosticos'); ok(w.document.querySelectorAll('[data-action=fma-instr-alcance]').length === 24, 'Instrumento: banco de 24 preguntas');
  await click('[data-action=fma-instr-alcance][data-id=q22]'); ok(TH.api.diagnostico.preguntas().length === 17, 'Alcance modificable (17 activas)');
  await click('[data-action=fma-instr-alcance][data-id=q22]'); ok(TH.api.diagnostico.preguntas().length === 16, 'Alcance restaurado (16)');
  await ir('/fma/usuarios'); await click('[data-action=fma-usuario-nuevo]'); f = q('form[data-form=fma-usuario-nuevo]'); f.elements.nombre.value = 'Nueva Revisora'; f.elements.email.value = 'nueva@fma.test'; f.elements.perfil.value = 'revision-juridica'; await submit(f);
  const nuevoInterno = () => usuarios().find(u => u.email === 'nueva@fma.test');
  ok(nuevoInterno() && nuevoInterno().rol === 'fma' && nuevoInterno().estado === 'pendiente-activacion' && !nuevoInterno().credencial, 'Usuario interno creado pendiente de activación, sin contraseña');
  await ir('/fma/sello?id=' + interes.id); f = q('form[data-form=fma-sello-gestionar]'); f.elements.estado.value = 'contactada'; f.elements.nota.value = 'Llamada'; await submit(f);
  ok(estado().interesesSello.find(i => i.id === interes.id).estado === 'contactada', 'Gestión de manifestación de interés registrada');
  await ir('/fma/auditoria'); ok(/Registro de organización/.test(texto()) && /Documento jurídico publicado/.test(texto()) && /Módulo mod-1 v1.0 → publicado/.test(texto()), 'Trazabilidad incluye registro, publicación de documentos y de módulos');
  await recorrer(['/fma/inicio', '/fma/organizaciones', '/fma/organizaciones/detalle?id=org-001', '/fma/diagnosticos', '/fma/planes', '/fma/contenidos', '/fma/contenidos?id=rec-rutas', '/fma/formacion', '/fma/formacion/version?id=' + modV().id, '/fma/documentos-legales', '/fma/documentos-legales?id=' + docCond.id, '/fma/sello', '/fma/reportes', '/fma/usuarios', '/fma/auditoria', '/fma/configuracion'], 'FMA');
  await logout();
  return { orgNueva, col: col(), interes };
};
module.exports.CLAVE = CLAVE;

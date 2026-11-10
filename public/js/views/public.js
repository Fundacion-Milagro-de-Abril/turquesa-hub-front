/* ============================================================
   TURQUESA HUB · VISTAS PÚBLICAS
   Inicio, cómo funciona, Sello Turquesa (información + manifestación de
   interés), condiciones, privacidad, acceso con credenciales, registro
   empresarial obligatorio, verificación de correo, recuperación de
   contraseña y activación de invitaciones de colaboradores.
   ============================================================ */
window.TH = window.TH || {};

(function () {
  const esc = (s) => TH.util.esc(s);
  const ic = (n, c) => TH.ui.icono(n, c);
  const cat = TH.data.catalogos;

  /* Diagrama modular del recorrido (Manual Maestro cap. 09/21: contenedores y filetes; sin estética tecnológica,
     sin recursos de otros universos de marca). */
  function diagramaRecorrido() {
    const etapas = [
      ['Autodiagnóstico', 'Dieciséis preguntas en seis dimensiones, con fundamento y evidencia esperada.', ''],
      ['Plan de acción', 'Recomendaciones derivadas de las brechas, convertidas en compromisos con responsables y fechas.', 'diagrama__paso--profundo'],
      ['Seguimiento', 'Evidencias, avances, acciones vencidas y reportes institucionales.', 'diagrama__paso--violeta'],
      ['Sensibilización', 'Módulos para colaboradores y cobertura agregada, sin exponer respuestas individuales.', 'diagrama__paso--ciruela']
    ];
    return '<div class="diagrama" role="list" aria-label="Recorrido de una organización en Turquesa Hub">' + etapas.map((e, i) =>
      '<div class="diagrama__paso ' + e[2] + '" role="listitem"><div class="diagrama__num">Etapa ' + (i + 1) + '</div><h3>' + esc(e[0]) + '</h3><p>' + esc(e[1]) + '</p></div>').join('') +
      '<div class="diagrama__pie">Un ciclo de mejora continua · se repite en cada nuevo autodiagnóstico</div></div>';
  }
  const ONDA = '<svg class="onda" viewBox="0 0 1440 44" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 26C180 44 360 6 600 18S1020 44 1200 30s180-16 240-12V44H0z" fill="#FFFFFF"/></svg>';

  const pasos = [
    { n: '1', t: 'Perfil organizacional', d: 'Registra tu organización y a la persona responsable. Tu espacio es privado y separado del de otras organizaciones.' },
    { n: '2', t: 'Autodiagnóstico institucional guiado', d: 'Dieciséis preguntas en seis dimensiones, con contexto, ayuda y evidencia esperada. Orientativo y basado en lo que tu organización declara.' },
    { n: '3', t: 'Resultados y análisis de brechas', d: 'Lectura por dimensión, fortalezas declaradas, brechas y recomendaciones con su fundamento.' },
    { n: '4', t: 'Plan de acción y seguimiento', d: 'Selecciona y prioriza recomendaciones, añade acciones propias, asigna responsables, fechas, metas e indicadores; registra evidencias y actualiza el avance.' },
    { n: '5', t: 'Sensibilización de colaboradores', d: 'Invita a tu equipo, asigna módulos y consulta la cobertura de forma agregada, respetando la privacidad.' },
    { n: '6', t: 'Biblioteca y reportes', d: 'Guías, herramientas y fichas normativas con fuentes verificables; reportes institucionales descargables.' }
  ];

  function inicio() {
    return '<section class="portada" aria-labelledby="portada-titulo"><div class="portada__banda"><div class="portada__banda-inner">' +
      '<p class="portada__eyebrow">Sello Turquesa</p><h1 id="portada-titulo">Turquesa Hub</h1>' +
      '<p class="portada__lead">Transformamos compromisos en acciones para prevenir las violencias basadas en género.</p></div>' + ONDA + '</div>' +
      '<div class="portada__cuerpo"><div><div class="seccion__eyebrow">Un servicio de Fundación Milagro de Abril</div>' +
      '<p class="portada__texto">Una plataforma de gestión organizacional guiada: autodiagnóstico, análisis de brechas, plan de acción con seguimiento, sensibilización de colaboradores, biblioteca técnica y reportes institucionales.</p>' +
      '<div class="hero__acciones"><a class="btn btn--primario btn--lg" href="#/registro">Registrar mi organización ' + ic('flecha') + '</a><a class="btn btn--secundario btn--lg" href="#/acceso">Iniciar sesión</a></div>' +
      '<p class="hero__nota">El autodiagnóstico es orientativo y se basa en la información declarada por cada organización; no constituye una evaluación validada, cumplimiento legal ni certificación.</p></div>' +
      '<div>' + diagramaRecorrido() + '</div></div></section>' +
      '<section class="seccion"><div class="seccion__encabezado"><div class="seccion__eyebrow">Propuesta de valor</div><h2>La prevención como proceso organizacional guiado, práctico y orientado a la mejora continua</h2><p class="texto-2">Turquesa Hub no es un sistema de denuncias ni de gestión de casos. Es la herramienta con la que una organización reconoce sus capacidades de prevención, ordena y ejecuta sus compromisos, forma a su equipo y documenta sus avances con fundamento técnico y normativo.</p></div>' +
      '<div class="grid grid-3">' +
      '<div class="feature"><div class="icono-caja">' + ic('diagnostico') + '</div><h3>Conocer el punto de partida</h3><p>Autodiagnóstico institucional guiado con fundamento en el marco normativo colombiano y en guías internacionales de prevención.</p></div>' +
      '<div class="feature"><div class="icono-caja icono-caja--violeta">' + ic('plan') + '</div><h3>Ordenar y cumplir compromisos</h3><p>Plan de acción con responsables, fechas, metas, indicadores, evidencias y alertas de vencimiento. Reportes descargables.</p></div>' +
      '<div class="feature"><div class="icono-caja icono-caja--naranja">' + ic('formacion') + '</div><h3>Formar y transformar</h3><p>Módulos de sensibilización para colaboradores, con ejemplos contextualizados, ejercicios y bibliografía consultable.</p></div></div></section>' +
      '<section class="seccion seccion--suave" style="max-width:none"><div style="max-width:var(--th-publico-max);margin:auto"><div class="seccion__encabezado"><div class="seccion__eyebrow">Cómo funciona</div><h2>Seis pasos conectados en una misma plataforma</h2></div>' +
      '<div class="grid grid-3">' + pasos.map(p => '<div class="card"><div class="paso-num">' + p.n + '</div><h3 class="card__titulo mt-3">' + esc(p.t) + '</h3><p class="card__sub">' + esc(p.d) + '</p></div>').join('') + '</div></div></section>' +
      '<section class="seccion"><div class="grid grid-2">' +
      '<div><div class="seccion__eyebrow">Para organizaciones</div><h2>Un espacio de trabajo, no un catálogo</h2><ul class="texto-2"><li>Autodiagnóstico con contexto, ayuda y evidencia esperada en cada pregunta.</li><li>Recomendaciones derivadas de tus brechas, que seleccionas, priorizas y conviertes en compromisos.</li><li>Seguimiento con responsables, fechas, estados, evidencias y acciones vencidas.</li><li>Cobertura de sensibilización agregada, sin exponer respuestas individuales.</li><li>Biblioteca con fuentes verificables y reportes institucionales.</li></ul></div>' +
      '<div><div class="seccion__eyebrow">Para colaboradores</div><h2>Aprender con claridad y respeto</h2><ul class="texto-2"><li>Cuatro módulos con desarrollo conceptual, ejemplos contextualizados y actividades de reflexión.</li><li>Ejercicios con retroalimentación explicativa y bibliografía consultable.</li><li>Acceso por invitación de tu organización; progreso personal privado.</li><li>Sin relatos personales ni recolección de experiencias de violencia.</li></ul></div></div></section>' +
      '<section class="seccion seccion--suave" style="max-width:none"><div style="max-width:var(--th-publico-max);margin:auto" class="grid grid-2 items-center">' +
      '<div><div class="seccion__eyebrow">Sello Turquesa</div><h2>Reconocimiento organizacional con criterio</h2><p class="texto-2">El Sello Turquesa es el servicio de evaluación, acompañamiento y reconocimiento organizacional de Fundación Milagro de Abril para organizaciones que estructuran y evidencian su gestión preventiva. Turquesa Hub es la plataforma de ese servicio. Conoce su propósito y manifiesta el interés de tu organización.</p><a class="btn btn--secundario" href="#/sello-turquesa">Conocer el Sello</a></div>' +
      '<div class="bloque-fma"><img class="bloque-fma__logo" src="assets/branding/fma-logo-horizontal.png" alt="Fundación Milagro de Abril" width="895" height="354"><p>Fundación Milagro de Abril es una fundación feminista colombiana que trabaja como laboratorio de innovación social para ampliar el bienestar, los derechos y la autonomía de mujeres, niñas, niños, adolescentes, jóvenes y sus comunidades.</p><blockquote class="cita mb-0">Convertimos la experiencia vivida en soluciones que probamos, mejoramos y compartimos.</blockquote></div></div></section>' +
      '<section class="seccion text-center"><h2>Comienza hoy</h2><p class="texto-2" style="max-width:60ch;margin:0 auto var(--th-sp-5)">Registra tu organización para acceder a tu espacio privado de gestión preventiva.</p><div class="flex gap-3 justify-center wrap"><a class="btn btn--primario btn--lg" href="#/registro">Registrar mi organización</a><a class="btn btn--secundario btn--lg" href="#/acceso">Ya tengo cuenta</a></div></section>';
  }

  function conocer() {
    return '<section class="seccion"><div class="seccion__encabezado"><div class="seccion__eyebrow">Conocer Turquesa Hub</div><h1>Qué es, qué hace y qué no hace</h1><p class="texto-2">Turquesa Hub es una plataforma digital de gestión organizacional guiada para la prevención de las violencias basadas en género, creada y administrada por la Fundación Milagro de Abril.</p></div>' +
      '<div class="grid grid-2"><div class="card"><h3>Tres resultados</h3><ol><li>Facilitar la gestión institucional de la prevención de VBG.</li><li>Promover aprendizajes y transformaciones culturales entre los colaboradores.</li><li>Estructurar información y evidencias organizacionales que permitan ordenar esfuerzos y documentar avances.</li></ol></div>' +
      '<div class="card card--naranja"><h3>Límite fundamental</h3><p>Turquesa Hub <strong>no</strong> es un sistema de denuncias, recepción de quejas, seguimiento de víctimas ni gestión individual de casos. No incluye expedientes, testimonios, registros de agresores ni investigación de hechos.</p><p>Ofrece información educativa sobre derechos, canales competentes y rutas de orientación. Las obligaciones de atención, investigación interna y remisión corresponden a cada empleador dentro de su competencia y a las autoridades, conforme a la normativa vigente.</p></div></div>' +
      '<h2 class="mt-6">Funciones de la plataforma</h2><div class="grid grid-3">' + Object.keys(TH.config.modulos).filter(k => k !== 'administracion').map(k => '<div class="feature"><h3 style="margin-top:0;font-size:var(--th-t-md)">' + esc(TH.config.modulos[k].nombre) + '</h3></div>').join('') + '</div>' +
      '<h2 class="mt-6">Sobre el autodiagnóstico</h2><div class="card"><p>Es un instrumento de autodiagnóstico declarado por la propia organización, construido a partir del marco normativo colombiano y de guías internacionales de prevención (PNUD, OIT, ONU Mujeres, OMS). Sus resultados identifican brechas y ordenan un plan de acción; <strong>no constituyen una evaluación psicométrica validada, una verificación de cumplimiento legal ni una certificación</strong>. La plataforma distingue lo declarado por la organización de lo que cuenta con evidencia registrada. La metodología es revisada y aprobada por la Fundación Milagro de Abril.</p></div>' +
      '<h2 class="mt-6">Rigor y fuentes</h2><div class="card"><p>Cada guía, módulo y pregunta del instrumento referencia sus fuentes: normas colombianas verificadas en compilaciones oficiales, convenios y recomendaciones de la OIT, guías del PNUD, el marco RESPECT de la OMS, los Principios para el Empoderamiento de las Mujeres y normas técnicas internacionales citadas como buenas prácticas. Los contenidos pasan por revisión técnica, jurídica y psicosocial antes de publicarse.</p></div>' +
      '<h2 class="mt-6">Quién está detrás</h2><div class="bloque-fma"><img class="bloque-fma__logo" src="assets/branding/fma-logo-horizontal.png" alt="Fundación Milagro de Abril" width="895" height="354"><p class="seccion__eyebrow">Laboratorio de Innovación Social</p><p>Fundación Milagro de Abril es una fundación feminista colombiana, con origen territorial en Manizales, que trabaja como laboratorio de innovación social: escucha a quienes viven los retos, diseña soluciones con ellas y con ellos, las prueba en contextos reales, mide lo que ocurre, aprende y ajusta. Turquesa Hub aplica su Modelo Turquesa de intervención en las dimensiones de prevención y de transformación y empoderamiento.</p><blockquote class="cita mb-0">Diseñamos con quienes viven los retos, probamos en contextos reales y rendimos cuentas de lo que funciona y de lo que no.</blockquote></div>' +
      '<div class="flex gap-3 mt-5 wrap"><a class="btn btn--primario" href="#/registro">Registrar mi organización</a><a class="btn btn--secundario" href="#/acceso">Iniciar sesión</a></div></section>';
  }

  function formularioInteres(prefijo, org, u) {
    return '<form class="card" data-form="sello-interes" novalidate><h3 class="card__titulo">Manifestar interés en el Sello Turquesa</h3><p class="card__sub mb-3">Déjanos los datos de tu organización. La Fundación Milagro de Abril te contactará cuando se abra el proceso de postulación.</p><div class="form-fila">' +
      TH.ui.campo({ name: 'organizacion', id: prefijo + 'org', label: 'Organización', required: true, valor: org ? org.nombre : '' }) +
      TH.ui.campo({ name: 'contacto', id: prefijo + 'contacto', label: 'Persona de contacto', required: true, valor: org ? org.responsable : (u ? u.nombre : '') }) +
      TH.ui.campo({ name: 'cargo', id: prefijo + 'cargo', label: 'Cargo', valor: org ? org.cargo : '' }) +
      TH.ui.campo({ name: 'email', id: prefijo + 'email', label: 'Correo institucional', tipo: 'email', required: true, valor: org ? org.email : '' }) +
      TH.ui.campo({ name: 'telefono', id: prefijo + 'tel', label: 'Teléfono (opcional)', tipo: 'tel', valor: org ? org.telefono : '' }) +
      TH.ui.campo({ name: 'municipio', id: prefijo + 'municipio', label: 'Municipio', valor: org ? org.municipio : '' }) + '</div>' +
      TH.ui.campo({ name: 'mensaje', id: prefijo + 'mensaje', label: '¿Qué motiva a tu organización a participar? (opcional)', tipo: 'textarea', rows: 3 }) +
      TH.ui.check('autorizaContacto', 'Autorizo a la Fundación Milagro de Abril a contactarme y a tratar estos datos conforme a su <a href="#/privacidad">política de tratamiento de datos</a>.', false) + '<div class="campo mt-2" data-campo="autorizaContacto"><span class="campo__error" role="alert"></span></div>' +
      '<button type="submit" class="btn btn--primario">Enviar manifestación de interés</button></form>';
  }
  TH.vistasCompartidas = TH.vistasCompartidas || {}; TH.vistasCompartidas.formularioInteres = formularioInteres;

  function selloPublico() {
    return '<section class="seccion"><div class="seccion__encabezado"><div class="seccion__eyebrow">Un servicio de Fundación Milagro de Abril</div><h1>Sello Turquesa</h1><p class="texto-2">Servicio de evaluación, acompañamiento y reconocimiento organizacional de Fundación Milagro de Abril para organizaciones que estructuran, ejecutan y evidencian su gestión de prevención de las violencias basadas en género.</p></div>' +
      '<div class="sello-marca"><img class="sello-marca__logo" src="assets/branding/sello-turquesa-imagotipo.png" alt="Sello Turquesa" width="1600" height="629"><div class="sello-marca__texto"><strong>Sello Turquesa · Un servicio de Fundación Milagro de Abril</strong>Turquesa Hub es la plataforma del Sello: el recorrido de autodiagnóstico, plan de acción, evidencias y sensibilización es la preparación para el proceso de reconocimiento.</div></div>' +
      '<div class="grid grid-2 mt-5"><div><div class="card"><h3>Qué es</h3><p>Un reconocimiento organizacional otorgado por Fundación Milagro de Abril tras una evaluación independiente a organizaciones que demuestran capacidades sostenidas de prevención: compromiso directivo, política y protocolo vigentes, cultura de respeto, formación, canales con garantías y mejora continua. Una organización atendida no adquiere automáticamente el derecho a usar el Sello: solo lo exhibe quien cumple los criterios técnicos, completa el procedimiento y recibe autorización expresa.</p><h3 class="mt-4">Su relación con la transformación organizacional</h3><p>El Sello no premia una declaración, sino un proceso: parte del autodiagnóstico, se construye con el plan de acción y la sensibilización en Turquesa Hub, y se evidencia con documentos institucionales. Reconoce la transformación de prácticas, no la ausencia de problemas.</p><h3 class="mt-4">Su vínculo con la prevención de VBG</h3><p>Las dimensiones del Sello coinciden con las del autodiagnóstico y con los marcos del PNUD, la OIT y los Principios para el Empoderamiento de las Mujeres: compromiso y gobernanza, cultura e igualdad, políticas y protocolos, formación, canales y articulación con instancias competentes, y seguimiento. La metodología de evaluación es definida y aprobada por la FMA.</p></div>' +
      '<div class="card card--violeta mt-4"><h3 class="card__titulo">Cómo prepararse desde hoy</h3><ol class="texto-sm mb-0"><li>Registra tu organización y completa el autodiagnóstico.</li><li>Construye y ejecuta tu plan de acción con evidencias.</li><li>Forma a tu equipo con los módulos de sensibilización.</li><li>Manifiesta tu interés: la FMA te informará la apertura del proceso.</li></ol></div></div>' +
      '<div>' + formularioInteres('sp-', null, null) + '</div></div></section>';
  }

  function renderSecciones(d, nivel) {
    const h = nivel || 'h3';
    return (d.secciones || []).map(x => '<' + h + '>' + esc(x.titulo) + '</' + h + '>' + (x.cuerpo || []).map(t => '<p>' + esc(t) + '</p>').join('') + (x.lista && x.lista.length ? '<ul>' + x.lista.map(l => '<li>' + esc(l) + '</li>').join('') + '</ul>' : '')).join('');
  }
  /** Documento jurídico: muestra la versión publicada; si no existe, la última versión con aviso claro de que no está vigente. */
  function documentoLegal(tipo) {
    const c = TH.util.catalogo(cat.tiposDocumentoLegal, tipo) || { nombre: tipo };
    const d = TH.api.documentosLegales.vigenteOUltima(tipo);
    if (!d) return '<section class="seccion" style="max-width:820px"><h1>' + esc(c.nombre) + '</h1>' + TH.ui.alerta('alerta', 'Documento no disponible', 'La Fundación Milagro de Abril aún no ha publicado este documento.') + '</section>';
    const vigente = d.estado === 'publicado'; const base = TH.api.documentosLegales.baseRegistro();
    let aviso;
    if (vigente) aviso = TH.ui.alerta('exito', 'Versión vigente', 'Versión <strong>' + esc(d.version) + '</strong>, ' + (d.aprobacion ? 'validada jurídicamente el ' + esc(TH.util.fecha(d.aprobacion.fecha)) + ' y ' : '') + 'publicada el ' + esc(TH.util.fecha(d.publicacion && d.publicacion.fecha)) + '. Identificador: <code>' + esc(d.id) + '</code>.' + (tipo === 'aviso-registro' ? ' Aviso transitorio: rige el registro mientras la FMA publica las políticas definitivas.' : ''));
    else if (tipo === 'aviso-registro') aviso = TH.ui.alerta('alerta', 'Aviso preparado · pendiente de validación por la FMA', 'Versión <strong>' + esc(d.version) + '</strong> (' + esc(TH.util.fecha(d.fecha)) + '), estado: ' + esc(TH.util.nombreCatalogo(cat.estadosDocumentoLegal, d.estado)) + '. ' + (TH.config.esRemoto ? 'No se utiliza para registros reales hasta que la Fundación Milagro de Abril valide su contenido y complete la información pendiente.' : 'En este entorno de desarrollo se utiliza únicamente para registros de prueba con datos ficticios; para registros reales la Fundación Milagro de Abril debe validarlo, completar la información pendiente y publicarlo.') + (d.pendientes && d.pendientes.length ? '<ul class="mt-2 mb-0">' + d.pendientes.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>' : ''));
    else aviso = TH.ui.alerta('alerta', 'Borrador jurídico · no vigente', 'Este texto (versión ' + esc(d.version) + ', estado: ' + esc(TH.util.nombreCatalogo(cat.estadosDocumentoLegal, d.estado)) + ') es un borrador que aún no ha sido aprobado por la profesional jurídica de la Fundación Milagro de Abril ni publicado. No produce efectos y no se solicita su aceptación.' + (tipo === 'tratamiento-datos' && base && base.origen !== 'politica' ? ' Mientras se publica la versión definitiva, el registro se realiza con el <a href="#/aviso-registro">aviso de información y autorización para el registro inicial</a>.' : ''));
    return '<section class="seccion" style="max-width:820px"><div class="seccion__eyebrow">' + esc(c.nombre) + ' · versión ' + esc(d.version) + '</div><h1>' + esc(d.titulo) + '</h1>' + aviso + renderSecciones(d, 'h3') +
      '<p class="texto-sm texto-2 mt-4">' + (vigente ? 'Cada aceptación se registra con fecha e identificador de esta versión.' : 'Responsable de la redacción: ' + esc(d.autor) + ' · ' + esc(TH.util.fecha(d.fecha)) + '.') + '</p></section>';
  }
  function avisoRegistro() { return documentoLegal('aviso-registro'); }
  /** Bloque de información y autorización (registro y activación de invitaciones). Base: aviso transitorio publicado,
      política definitiva publicada o, solo en desarrollo, el aviso preparado. Las condiciones de uso solo se piden si están publicadas.
      La casilla de autorización es independiente y nunca viene marcada. */
  function bloqueConsentimiento() {
    if (TH.config.auth.adaptador === 'supabase') {
      const a = TH.supabaseAviso;
      if (!a) return { habilitado: false, html: TH.ui.alerta('alerta', 'Activación pendiente de habilitación', 'La Fundación Milagro de Abril aún no ha publicado el aviso de información y autorización para el tratamiento de datos personales. Hasta entonces no es posible activar cuentas.') };
      return { habilitado: true, html: '<details class="ayuda mb-4"><summary>Leer el aviso completo (versión ' + esc(a.version) + ')</summary><div class="ayuda__cuerpo"><h4>' + esc(a.titulo) + '</h4><p style="white-space:pre-line">' + esc(a.texto) + '</p></div></details>' +
        TH.ui.check('aceptaDatos', 'Autorizo a Fundación Milagro de Abril el tratamiento de mis datos personales conforme al aviso de información y autorización (versión ' + esc(a.version) + ').', false) + '<div class="campo" data-campo="aceptaDatos"><span class="campo__error" role="alert"></span></div>' +
        '<p class="texto-xs texto-2">La autorización se registra con fecha e identificador de la versión aceptada. No proporciones datos sensibles ni información sobre casos de violencia.</p>' };
    }
    const base = TH.api.documentosLegales.baseRegistro(); const cond = TH.api.documentosLegales.publicado('condiciones-uso');
    if (!base) return { habilitado: false, html: TH.ui.alerta('alerta', 'Registro pendiente de habilitación', 'La Fundación Milagro de Abril aún no ha publicado el <a href="#/aviso-registro">aviso de información y autorización</a> para el tratamiento de datos personales. El formulario se habilitará en cuanto se publique; mientras tanto no se recogen datos.') };
    const d = base.documento; const fechaRef = d.publicacion ? 'publicada el ' + TH.util.fecha(d.publicacion.fecha) : 'preparada el ' + TH.util.fecha(d.fecha);
    let estado = '';
    if (base.origen === 'aviso-preparado') estado = TH.ui.alerta('alerta', 'Aviso en preparación · solo registros de prueba', 'La versión ' + esc(d.version) + ' del aviso aún no ha sido validada por la Fundación Milagro de Abril. En este entorno de desarrollo se usa únicamente con datos ficticios; no se registran datos reales.');
    else if (base.origen === 'aviso') estado = TH.ui.alerta('info', 'Aviso transitorio vigente', 'Versión ' + esc(d.version) + ', ' + esc(fechaRef) + '. Rige el registro mientras la Fundación publica las condiciones de uso y la política de tratamiento de datos definitivas; cuando se publiquen, se te informará en la plataforma.');
    const texto = '<details class="ayuda mb-4"><summary>Leer el ' + (base.origen === 'politica' ? 'texto completo de la política' : 'aviso completo') + ' (versión ' + esc(d.version) + ')</summary><div class="ayuda__cuerpo">' + renderSecciones(d, 'h4') + '</div></details>';
    const linkDatos = base.origen === 'politica' ? '<a href="#/privacidad">política de tratamiento de datos personales</a>' : '<a href="#/aviso-registro">aviso de información y autorización</a>';
    const html = estado + texto +
      (cond ? TH.ui.check('aceptaCondiciones', 'He leído y acepto las <a href="#/condiciones">condiciones de uso</a> (versión ' + esc(cond.version) + ', publicada el ' + esc(TH.util.fecha(cond.publicacion.fecha)) + ').', false) + '<div class="campo" data-campo="aceptaCondiciones"><span class="campo__error" role="alert"></span></div><input type="hidden" name="documentoCondicionesId" value="' + esc(cond.id) + '">' : '') +
      TH.ui.check('aceptaDatos', 'Autorizo a Fundación Milagro de Abril el tratamiento de mis datos personales conforme al ' + linkDatos + ' (versión ' + esc(d.version) + ', ' + esc(fechaRef) + ').', false) + '<div class="campo" data-campo="aceptaDatos"><span class="campo__error" role="alert"></span></div><input type="hidden" name="documentoDatosId" value="' + esc(d.id) + '">' +
      '<p class="texto-xs texto-2">La autorización se registra con fecha e identificador de la versión aceptada. No proporciones datos sensibles ni información sobre casos de violencia.</p>';
    return { habilitado: true, html };
  }
  function condiciones() { return documentoLegal('condiciones-uso'); }
  function privacidad() { return documentoLegal('tratamiento-datos'); }

  /* ---------- Acceso ---------- */
  function acceso(ctx) {
    const sesion = TH.auth.sesion();
    if (sesion) { const inicio = (TH.util.catalogo(cat.rolesSistema, sesion.rol) || {}).inicio || '/'; return '<div class="acceso"><div class="acceso__contenido" style="grid-column:1/-1"><div class="acceso__caja text-center"><h1 style="font-size:var(--th-t-2xl)">Ya tienes una sesión activa</h1><p class="texto-2">Continúa en tu espacio o cierra la sesión para ingresar con otra cuenta.</p><div class="flex gap-2 justify-center wrap"><a class="btn btn--primario" href="#' + esc(inicio) + '">Ir a mi espacio</a><button type="button" class="btn btn--secundario" data-action="salir">Cerrar sesión</button></div></div></div></div>'; }
    return '<div class="acceso"><aside class="acceso__lateral"><div><img class="acceso__logo" src="assets/branding/fma-logo-negativo-blanco.png" alt="Fundación Milagro de Abril" width="1312" height="1204"><p class="mt-4 mb-0" style="font-family:var(--th-fuente-titulos);font-weight:700;font-size:var(--th-t-lg)">Turquesa Hub <span style="font-weight:500">· Sello Turquesa</span></p><h2 class="mt-6">Tu espacio de gestión preventiva</h2><p>Ingresa con el correo y la contraseña de tu cuenta. Si tu organización aún no está registrada, crea su espacio en pocos minutos.</p></div>' +
      '<p class="texto-sm">Turquesa Hub no recibe denuncias ni gestiona casos individuales. Si necesitas orientación urgente, acude a los canales de tu organización o a las autoridades competentes.</p></aside>' +
      '<div class="acceso__contenido"><div class="acceso__caja"><h1 style="font-size:var(--th-t-2xl)">Iniciar sesión</h1><p class="texto-2 mb-5">Organizaciones, colaboradores y equipo de la Fundación ingresan por aquí con sus credenciales.</p>' +
      (ctx.params.volver ? TH.ui.alerta('info', '', 'Inicia sesión para continuar.') : '') +
      (ctx.params.mensaje === 'verificado' ? TH.ui.alerta('exito', 'Correo verificado', 'Tu cuenta está activa. Ingresa con tu contraseña.') : '') +
      (ctx.params.mensaje === 'clave-restablecida' ? TH.ui.alerta('exito', 'Contraseña actualizada', 'Ingresa con tu nueva contraseña.') : '') +
      (ctx.params.mensaje === 'registro' ? TH.ui.alerta('exito', 'Cuenta creada', 'Ingresa con el correo y la contraseña que definiste.') : '') +
      '<form data-form="acceso" novalidate>' + TH.ui.campo({ name: 'email', label: 'Correo', tipo: 'email', required: true, placeholder: 'nombre@organizacion.com', attrs: ' autocomplete="username"' }) +
      TH.ui.campo({ name: 'clave', label: 'Contraseña', tipo: 'password', required: true, attrs: ' autocomplete="current-password"' }) +
      '<div class="campo" data-campo="general"><span class="campo__error" role="alert"></span></div>' +
      '<button type="submit" class="btn btn--primario btn--bloque">Ingresar</button></form>' +
      '<p class="texto-sm mt-4"><a href="#/recuperar-acceso">¿Olvidaste tu contraseña?</a></p><hr>' +
      '<p class="texto-sm">¿Tu organización aún no está registrada? <a href="#/registro">Regístrala aquí</a>.</p><p class="texto-sm">¿Recibiste una invitación de tu organización? <a href="#/activar-invitacion">Activa tu acceso</a>.</p><p class="texto-sm"><a href="#/">Volver al inicio</a></p></div></div></div>';
  }

  /* ---------- Registro empresarial ---------- */
  function registro() {
    const deps = Object.keys(cat.departamentos);
    const consentimiento = bloqueConsentimiento();
    return '<section class="seccion" style="max-width:900px"><div class="seccion__eyebrow">Registro</div><h1>Registra tu organización</h1><p class="texto-2 mb-5">El registro crea el espacio privado de tu organización y la cuenta de la persona responsable. Solicitamos únicamente la información necesaria.</p>' +
      TH.ui.stepper(['Datos de la organización', 'Persona responsable y contraseña', 'Información y autorización'], 0) +
      '<form class="card" data-form="registro" novalidate>' +
      '<fieldset><legend>1. Datos de la organización</legend><div class="form-fila">' +
      TH.ui.campo({ name: 'nombre', label: 'Razón social o denominación institucional', required: true, attrs: ' autocomplete="organization"' }) +
      TH.ui.campo({ name: 'tipoIdentificacion', label: 'Tipo de identificación', tipo: 'select', required: true, opciones: cat.tiposIdentificacion, placeholder: 'Selecciona', attrs: ' data-change="registro-tipo-id"' }) +
      TH.ui.campo({ name: 'identificacion', label: 'Número de identificación', placeholder: 'Ej.: 900123456-7', ayuda: 'Para NIT, incluye el dígito de verificación. Se valida según el tipo de entidad.' }) +
      TH.ui.campo({ name: 'sector', label: 'Sector de actividad', tipo: 'select', required: true, opciones: cat.sectores, placeholder: 'Selecciona un sector' }) +
      TH.ui.campo({ name: 'tamano', label: 'Tamaño (personas vinculadas)', tipo: 'select', required: true, opciones: cat.tamanos, placeholder: 'Selecciona un rango' }) +
      TH.ui.campo({ name: 'departamento', label: 'Departamento', tipo: 'select', required: true, opciones: deps, placeholder: 'Selecciona', attrs: ' data-change="registro-departamento"' }) +
      TH.ui.campo({ name: 'municipio', label: 'Municipio', tipo: 'select', required: true, opciones: [], placeholder: 'Primero elige el departamento' }) +
      TH.ui.campo({ name: 'emailInstitucional', label: 'Correo institucional de la organización', tipo: 'email', required: true, placeholder: 'contacto@organizacion.com' }) +
      TH.ui.campo({ name: 'telefono', label: 'Teléfono institucional (opcional)', tipo: 'tel', placeholder: 'Ej.: 606 000 0000' }) + '</div></fieldset>' +
      '<fieldset><legend>2. Persona responsable</legend><div class="form-fila">' +
      TH.ui.campo({ name: 'responsable', label: 'Nombre completo', required: true, attrs: ' autocomplete="name"' }) +
      TH.ui.campo({ name: 'cargo', label: 'Cargo', tipo: 'select', required: true, opciones: cat.cargos, placeholder: 'Selecciona' }) +
      TH.ui.campo({ name: 'email', label: 'Correo de acceso', tipo: 'email', required: true, placeholder: 'nombre@organizacion.com', ayuda: 'Será tu usuario. Recibirás un correo de verificación.', attrs: ' autocomplete="username"' }) +
      '<div></div>' +
      TH.ui.campo({ name: 'clave', label: 'Contraseña', tipo: 'password', required: true, ayuda: 'Mínimo ' + TH.config.auth.clave.longitudMinima + ' caracteres, con letras y números.', attrs: ' autocomplete="new-password"' }) +
      TH.ui.campo({ name: 'claveConfirmacion', label: 'Confirmar contraseña', tipo: 'password', required: true, attrs: ' autocomplete="new-password"' }) + '</div></fieldset>' +
      '<fieldset><legend>3. Información y autorización</legend>' + consentimiento.html + '</fieldset>' +
      '<div class="campo" data-campo="general"><span class="campo__error" role="alert"></span></div>' +
      '<div class="flex gap-3 justify-end wrap"><a class="btn btn--terciario" href="#/acceso">Ya tengo cuenta</a><button type="submit" class="btn btn--primario"' + (consentimiento.habilitado ? '' : ' disabled aria-disabled="true"') + '>Crear cuenta y espacio de la organización ' + ic('flecha') + '</button></div></form></section>';
  }

  function verificarCorreo(ctx) {
    if (ctx.params.token) {
      return '<section class="seccion" style="max-width:560px"><h1>Verificación de correo</h1><div id="verif-estado">' + TH.ui.cargando('Verificando…') + '</div></section>';
    }
    return '<section class="seccion" style="max-width:560px"><div class="seccion__eyebrow">Registro</div><h1>Verifica tu correo</h1><p class="texto-2">Te enviamos un enlace de verificación a <strong>' + esc(ctx.params.email || 'tu correo') + '</strong>. Ábrelo para activar tu cuenta.</p><form class="card" data-form="reenviar-verificacion" novalidate><input type="hidden" name="email" value="' + esc(ctx.params.email || '') + '"><p class="texto-sm">¿No recibiste el correo? Revisa la carpeta de no deseados o solicita un nuevo envío.</p><button type="submit" class="btn btn--secundario">Reenviar correo de verificación</button></form><p class="texto-sm mt-4"><a href="#/acceso">Ir a iniciar sesión</a></p></section>';
  }

  function recuperar(ctx) {
    if (ctx.params.token) {
      return '<section class="seccion" style="max-width:560px"><h1>Nueva contraseña</h1><form class="card" data-form="restablecer" novalidate><input type="hidden" name="token" value="' + esc(ctx.params.token) + '">' + TH.ui.campo({ name: 'clave', label: 'Nueva contraseña', tipo: 'password', required: true, ayuda: 'Mínimo ' + TH.config.auth.clave.longitudMinima + ' caracteres, con letras y números.', attrs: ' autocomplete="new-password"' }) + TH.ui.campo({ name: 'claveConfirmacion', label: 'Confirmar contraseña', tipo: 'password', required: true, attrs: ' autocomplete="new-password"' }) + '<div class="campo" data-campo="general"><span class="campo__error" role="alert"></span></div><button type="submit" class="btn btn--primario btn--bloque">Guardar contraseña</button></form></section>';
    }
    return '<section class="seccion" style="max-width:560px"><h1>Recuperar contraseña</h1><p class="texto-2">Escribe el correo de tu cuenta. Si existe, recibirás un enlace para definir una nueva contraseña.</p><form class="card" data-form="recuperar" novalidate>' + TH.ui.campo({ name: 'email', label: 'Correo de la cuenta', tipo: 'email', required: true, attrs: ' autocomplete="username"' }) + '<button type="submit" class="btn btn--primario btn--bloque">Enviar enlace de recuperación</button></form><p class="texto-sm mt-4"><a href="#/acceso">Volver al acceso</a></p></section>';
  }

  function activarInvitacion(ctx) {
    const consentimiento = bloqueConsentimiento();
    return '<section class="seccion" style="max-width:640px"><div class="seccion__eyebrow">Colaboradores</div><h1>Activa tu acceso</h1><p class="texto-2">Tu organización te invitó a participar en los módulos de sensibilización de Turquesa Hub. Usa el código de tu invitación y define tu contraseña.</p>' +
      '<form class="card" data-form="activar-invitacion" novalidate>' + TH.ui.campo({ name: 'codigo', label: 'Código de invitación', required: true, valor: ctx.params.codigo || '', placeholder: 'Ej.: ABCD-1234' }) +
      (TH.config.auth.adaptador === 'supabase' ? TH.ui.campo({ name: 'email', label: 'Correo al que llegó la invitación', tipo: 'email', required: true, attrs: ' autocomplete="email"' }) : '') +
      TH.ui.campo({ name: 'nombre', label: 'Tu nombre (como quieres que aparezca)', required: true, attrs: ' autocomplete="name"' }) + TH.ui.campo({ name: 'area', label: 'Área o equipo (opcional)' }) +
      '<div class="form-fila">' + TH.ui.campo({ name: 'clave', label: 'Contraseña', tipo: 'password', required: true, ayuda: 'Mínimo ' + TH.config.auth.clave.longitudMinima + ' caracteres, con letras y números.', attrs: ' autocomplete="new-password"' }) + TH.ui.campo({ name: 'claveConfirmacion', label: 'Confirmar contraseña', tipo: 'password', required: true, attrs: ' autocomplete="new-password"' }) + '</div>' +
      consentimiento.html +
      '<div class="campo" data-campo="general"><span class="campo__error" role="alert"></span></div><button type="submit" class="btn btn--primario btn--bloque"' + (consentimiento.habilitado ? '' : ' disabled aria-disabled="true"') + '>Activar mi acceso</button></form><p class="texto-sm mt-4">Tu organización solo verá el estado de tus módulos; nunca tus respuestas. <a href="#/acceso">Ya tengo cuenta</a>.</p></section>';
  }

  /* ---------- Manejadores ---------- */
  Object.assign(TH.acciones, {
    'politicas-revisar'(el) {
      const u = TH.auth.usuario(); const p = TH.api.documentosLegales.pendientesAceptacion(u).find(x => x.documento.id === el.dataset.id); if (!p) return;
      const d = p.documento; const t = TH.util.catalogo(cat.tiposDocumentoLegal, d.tipo) || { nombre: d.tipo, ruta: '/' };
      TH.ui.modal({ titulo: t.nombre + ' · versión ' + d.version, grande: true,
        cuerpo: '<form id="form-pol" data-form="politicas-aceptar" data-id="' + esc(d.id) + '" novalidate>' + TH.ui.alerta('info', 'Publicada el ' + esc(TH.util.fecha(d.publicacion && d.publicacion.fecha)), (d.publicacion && d.publicacion.nota ? esc(d.publicacion.nota) + ' ' : '') + 'Texto completo también en <a href="#' + esc(t.ruta) + '">' + esc(t.nombre) + '</a>.') +
          '<div class="ayuda__cuerpo mb-4" style="max-height:40vh;overflow:auto">' + renderSecciones(d, 'h4') + '</div>' +
          (p.requiereAutorizacion ? TH.ui.check('acepta', (d.tipo === 'tratamiento-datos' ? 'Autorizo a Fundación Milagro de Abril el tratamiento de mis datos personales conforme a esta versión.' : 'He leído y acepto esta versión de las condiciones de uso.'), false) + '<div class="campo" data-campo="acepta"><span class="campo__error" role="alert"></span></div>' : '<p class="texto-sm texto-2">No cambian las finalidades del tratamiento: tu autorización anterior sigue vigente. Al continuar se registra que conociste esta versión.</p>') +
          '<div class="campo" data-campo="general"><span class="campo__error" role="alert"></span></div></form>',
        pie: '<button type="button" class="btn btn--secundario" data-modal-cerrar>Más tarde</button><button type="submit" form="form-pol" class="btn btn--primario">' + (p.requiereAutorizacion ? 'Registrar mi autorización' : 'Entendido') + '</button>' });
    }
  });

  Object.assign(TH.cambios, {
    'registro-departamento'(el) { const muni = el.form.querySelector('[name=municipio]'); const lista = cat.departamentos[el.value] || []; muni.innerHTML = '<option value="">Selecciona</option>' + lista.map(m => '<option value="' + esc(m) + '">' + esc(m) + '</option>').join(''); },
    'registro-tipo-id'(el) { const ident = el.form.querySelector('[name=identificacion]'); const campo = ident.closest('.campo'); const ayuda = campo.querySelector('.campo__ayuda'); if (el.value === 'sin-identificacion') { ident.value = ''; ident.disabled = true; ayuda.textContent = 'No se requiere número de identificación.'; } else { ident.disabled = false; ayuda.textContent = el.value === 'NIT' ? 'Incluye el dígito de verificación (ej.: 900123456-7).' : 'Escribe el número tal como aparece en el documento.'; } }
  });

  Object.assign(TH.formularios, {
    async 'acceso'(form) {
      if (!TH.ui.validar(form)) return;
      TH.ui.ocupado(form, true, 'Ingresando…');
      const r = await TH.auth.ingresar(form.elements.email.value, form.elements.clave.value);
      TH.ui.ocupado(form, false);
      if (!r.ok) { TH.ui.errorApi(r, form); if (r.codigo === 'CORREO_NO_VERIFICADO') TH.router.ir('/verificar-correo?email=' + encodeURIComponent(form.elements.email.value)); return; }
      if (TH.remoto) TH.remoto.invalidar();
      const volver = TH.router.parsear().params.volver; const inicio = (TH.util.catalogo(cat.rolesSistema, r.usuario.rol) || {}).inicio || '/';
      TH.router.ir(volver && volver.startsWith('/' + inicio.split('/')[1]) ? volver : inicio);
    },
    async 'registro'(form) {
      form.querySelectorAll('.campo').forEach(c => c.classList.remove('es-invalido'));
      const d = TH.ui.datosFormulario(form); d.aceptaCondiciones = !!(form.elements.aceptaCondiciones && form.elements.aceptaCondiciones.checked); d.aceptaDatos = !!(form.elements.aceptaDatos && form.elements.aceptaDatos.checked);
      if (!TH.api.documentosLegales.registroHabilitado()) { TH.ui.mostrarErrores(form, { general: 'El registro aún no está habilitado: la Fundación no ha publicado el aviso de información y autorización de datos.' }); return; }
      const errores = TH.api.organizaciones.validarRegistro(d);
      if (Object.keys(errores).length) { TH.ui.mostrarErrores(form, errores); return; }
      /* El servidor (o la capa local en desarrollo) registra los consentimientos a partir de los identificadores de versión enviados; el cliente no los fabrica. */
      TH.ui.ocupado(form, true, 'Creando cuenta…');
      const r = await TH.auth.registrarOrganizacion(d);
      TH.ui.ocupado(form, false);
      if (!r.ok) { TH.ui.errorApi(r, form); return; }
      if (r.verificacion === 'no-requerida-en-desarrollo') { TH.ui.toast('Cuenta creada.', 'exito'); TH.router.ir('/acceso?mensaje=registro'); return; }
      TH.router.ir('/verificar-correo?email=' + encodeURIComponent(d.email));
    },
    async 'politicas-aceptar'(form) {
      const requiere = !!form.elements.acepta; if (requiere && !form.elements.acepta.checked) { TH.ui.mostrarErrores(form, { acepta: 'Marca la casilla para registrar tu autorización.' }); return; }
      TH.ui.ocupado(form, true, 'Registrando…');
      const r = await TH.api.documentosLegales.registrarAceptacion(form.dataset.id, requiere ? 'aceptacion' : 'informado');
      TH.ui.ocupado(form, false);
      if (!r.ok) { TH.ui.errorApi(r, form); return; }
      TH.ui.cerrarModal(); TH.ui.toast(requiere ? 'Autorización registrada con fecha y versión.' : 'Versión registrada como conocida.', 'exito'); TH.router.refrescar();
    },
    async 'reenviar-verificacion'(form) { const r = await TH.auth.solicitarVerificacion(form.elements.email.value); TH.ui.toast(r.ok ? 'Si el correo existe, recibirás un nuevo enlace.' : r.error, r.ok ? 'info' : 'error'); },
    async 'recuperar'(form) { if (!TH.ui.validar(form)) return; const r = await TH.auth.solicitarRecuperacion(form.elements.email.value); form.innerHTML = TH.ui.alerta(r.ok ? 'exito' : 'error', r.ok ? 'Solicitud registrada' : 'No fue posible', r.ok ? 'Si el correo corresponde a una cuenta, recibirás un enlace para definir una nueva contraseña.' : esc(r.error)); },
    async 'restablecer'(form) {
      if (!TH.ui.validar(form)) return; const c = form.elements.clave.value; const e = TH.auth.validarClave(c); if (e) { TH.ui.mostrarErrores(form, { clave: e }); return; }
      if (c !== form.elements.claveConfirmacion.value) { TH.ui.mostrarErrores(form, { claveConfirmacion: 'Las contraseñas no coinciden.' }); return; }
      const r = await TH.auth.restablecerClave(form.elements.token.value, c); if (!r.ok) { TH.ui.mostrarErrores(form, { general: r.error }); return; } TH.router.ir('/acceso?mensaje=clave-restablecida');
    },
    async 'activar-invitacion'(form) {
      if (!TH.ui.validar(form)) return; const d = TH.ui.datosFormulario(form);
      if (d.clave !== d.claveConfirmacion) { TH.ui.mostrarErrores(form, { claveConfirmacion: 'Las contraseñas no coinciden.' }); return; }
      d.aceptaDatos = !!(form.elements.aceptaDatos && form.elements.aceptaDatos.checked); d.aceptaCondiciones = !!(form.elements.aceptaCondiciones && form.elements.aceptaCondiciones.checked);
      if (TH.config.auth.adaptador !== 'supabase' && !TH.api.documentosLegales.registroHabilitado()) { TH.ui.mostrarErrores(form, { general: 'La activación aún no está habilitada: la Fundación no ha publicado el aviso de información y autorización de datos.' }); return; }
      if (!d.aceptaDatos) { TH.ui.mostrarErrores(form, { aceptaDatos: 'Debes autorizar el tratamiento de tus datos personales.' }); return; }
      if (form.elements.aceptaCondiciones && !d.aceptaCondiciones) { TH.ui.mostrarErrores(form, { aceptaCondiciones: 'Debes aceptar las condiciones de uso.' }); return; }
      TH.ui.ocupado(form, true, 'Activando…');
      const r = await TH.auth.activarInvitacion(d.codigo, { email: d.email, nombre: d.nombre, area: d.area, clave: d.clave, aceptaDatos: d.aceptaDatos, aceptaCondiciones: d.aceptaCondiciones, documentoDatosId: d.documentoDatosId || '', documentoCondicionesId: d.documentoCondicionesId || '' });
      TH.ui.ocupado(form, false);
      if (!r.ok) { TH.ui.errorApi(r, form); return; }
      if (r.verificacion === 'pendiente') { TH.ui.toast('Cuenta creada. Revisa tu correo y abre el enlace para verificarla; después ingresa.', 'exito'); TH.router.ir('/acceso'); return; }
      const ing = await TH.auth.ingresar(r.usuario.email, d.clave); if (ing.ok) { TH.ui.toast('Acceso activado. Bienvenido/a, ' + r.usuario.nombre + '.', 'exito'); TH.router.ir('/colaborador/inicio'); } else TH.router.ir('/acceso?mensaje=registro');
    },
    async 'sello-interes'(form) {
      if (!TH.ui.validar(form)) return; const d = TH.ui.datosFormulario(form); d.autorizaContacto = !!form.elements.autorizaContacto.checked;
      if (!TH.config.esRemoto && TH.auth.orgId()) d.orgId = TH.auth.orgId();   // en producción el servidor toma la organización de la sesión
      TH.ui.ocupado(form, true, 'Enviando…');
      const r = await TH.api.sello.manifestarInteres(d);
      TH.ui.ocupado(form, false);
      if (!r.ok) { TH.ui.errorApi(r, form); return; }
      form.innerHTML = r.enviada ? TH.ui.alerta('exito', 'Manifestación de interés enviada', 'Gracias, <strong>' + esc(r.interes.contacto) + '</strong>. La Fundación Milagro de Abril recibió tu manifestación y te contactará cuando se abra la postulación al Sello Turquesa.') : TH.ui.alerta('alerta', 'Manifestación registrada · pendiente de envío', 'Gracias, <strong>' + esc(r.interes.contacto) + '</strong>. Tu manifestación quedó registrada en este dispositivo, pero <strong>aún no ha sido enviada</strong> a la Fundación Milagro de Abril: el envío requiere el servicio de la plataforma. Si no recibes confirmación, escribe directamente a la Fundación.');
    }
  });

  TH.router.registrarVarias({
    '/': { layout: 'publico', titulo: 'Inicio', render: inicio },
    '/conocer-turquesa-hub': { layout: 'publico', titulo: 'Conocer Turquesa Hub', render: conocer },
    '/sello-turquesa': { layout: 'publico', titulo: 'Sello Turquesa', render: selloPublico },
    '/condiciones': { layout: 'publico', titulo: 'Condiciones de uso', render: condiciones },
    '/privacidad': { layout: 'publico', titulo: 'Tratamiento de datos', render: privacidad },
    '/aviso-registro': { layout: 'publico', titulo: 'Aviso de información', render: avisoRegistro },
    '/acceso': { layout: 'ninguno', titulo: 'Iniciar sesión', render: acceso },
    '/registro': { layout: 'publico', titulo: 'Registro', render: registro },
    '/verificar-correo': { layout: 'publico', titulo: 'Verificar correo', render: verificarCorreo, despues: async (ctx) => { if (!ctx.params.token) return; const r = await TH.auth.verificarCorreo(ctx.params.token); const el = document.getElementById('verif-estado'); if (el) el.innerHTML = r.ok ? TH.ui.alerta('exito', 'Correo verificado', 'Tu cuenta está activa. <a href="#/acceso?mensaje=verificado">Iniciar sesión</a>.') : TH.ui.alerta('error', 'No fue posible verificar', esc(r.error || 'El enlace no es válido o expiró.') + ' <a href="#/verificar-correo">Solicitar uno nuevo</a>.'); } },
    '/recuperar-acceso': { layout: 'publico', titulo: 'Recuperar contraseña', render: recuperar },
    '/activar-invitacion': { layout: 'publico', titulo: 'Activar invitación', render: activarInvitacion }
  });
})();

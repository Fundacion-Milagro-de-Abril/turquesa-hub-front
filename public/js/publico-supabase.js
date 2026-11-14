/* ============================================================
   TURQUESA HUB · ZONA PÚBLICA DE PRODUCCIÓN (F06)
   Reemplaza las páginas públicas de rc4 que dependían de módulos apagados (registro abierto, Sello Turquesa,
   documentos jurídicos de borrador) por: portada, cómo acceder, herramientas de FMA, autocuidado y privacidad.
   Reglas: no pide ni guarda datos de quien visita (sin formularios, sin cookies, sin contadores); los enlaces a
   herramientas abren los sitios de FMA. Solo /privacidad consulta a Supabase, para mostrar el aviso de datos vigente.
   Se ejecuta solo con el adaptador 'supabase'; el modo de desarrollo conserva las páginas de rc4.
   ============================================================ */
window.TH = window.TH || {};

(function () {
  if (TH.config.auth.adaptador !== 'supabase') return;
  const esc = TH.util.esc; const ic = (n) => TH.ui.icono(n);
  const CONTACTO = 'sai@fundacionmilagrodeabril.org';
  const HERR = 'https://herramientas.fundacionmilagrodeabril.org/';
  const provisional = '<span class="etiqueta etiqueta--referencial">Contenido provisional</span>';
  const externo = (url, texto) => '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(texto) + ' <span class="sr-only">(abre en una pestaña nueva)</span></a>';

  /* Herramientas existentes de FMA (verificadas el 14-nov en sus subdominios). */
  const HERRAMIENTAS = [
    { grupo: 'Orientación', items: [
      { t: 'Rutas de atención', url: HERR + 'rutas-atencion.html', d: 'Herramienta pedagógica de orientación: ayuda a identificar qué ruta puede corresponder a una situación y qué se puede hacer ahora. No reemplaza la valoración de una autoridad.' },
      { t: 'Directorio de rutas de atención', url: HERR + 'directorio-rutas.html', d: 'Entidades y organizaciones verificadas por la Fundación: canales, horarios, cobertura y funciones (nacional, Caldas y Manizales).' },
      { t: 'Ruta de la Mariposa', url: HERR + 'ruta-mariposa.html', d: 'Prevención de violencias sexuales en niñas, niños y adolescentes con discapacidad.' }] },
    { grupo: 'Autocuidado', items: [
      { t: 'Mapa emocional', url: HERR + 'mapa-emocional.html', d: 'Herramienta de la Fundación para reconocer las emociones.' },
      { t: 'Mi Mochila', url: HERR + 'mochila.html', d: 'Herramienta de autocuidado de la Fundación.' },
      { t: 'Rueda de la Vida', url: HERR + 'rueda-de-la-vida.html', d: 'Herramienta de la Fundación para mirar el equilibrio entre las distintas áreas de la vida.' }] },
    { grupo: 'Educación', items: [
      { t: 'Mi Cuerpo, Mi Voz, Mis Derechos', url: 'https://cartilla.fundacionmilagrodeabril.org/', d: 'Cartilla digital y plataforma de réplica de la Fundación.' }] }
  ];
  TH.publicoHerramientas = HERRAMIENTAS;

  /* Menú, botones y pie de la zona pública */
  TH.publicoConfig = {
    enlaces: [['/', 'Inicio'], ['/herramientas', 'Herramientas'], ['/autocuidado', 'Autocuidado']],
    botones: '<a href="#/activar-invitacion">Activar invitación</a><a class="btn btn--primario btn--sm" href="#/acceso">Ingresar</a>',
    pie: '<div><h4>Plataforma</h4><a href="#/">Qué es Turquesa Hub</a><a href="#/acceso">Ingresar</a><a href="#/activar-invitacion">Activar invitación</a><a href="#/como-acceder">Cómo acceder</a></div>' +
         '<div><h4>Recursos</h4><a href="#/herramientas">Herramientas de la Fundación</a><a href="#/autocuidado">Autocuidado</a><a href="#/privacidad">Privacidad y datos personales</a></div>'
  };

  function portada() {
    return '<section class="portada" aria-labelledby="portada-titulo"><div class="portada__banda"><div class="portada__banda-inner">' +
      '<p class="portada__eyebrow">Fundación Milagro de Abril</p><h1 id="portada-titulo">Turquesa Hub</h1>' +
      '<p class="portada__lead">Acompañamos a las organizaciones a convertir su compromiso con la prevención de las violencias basadas en género en acciones concretas.</p></div></div>' +
      '<div class="portada__cuerpo"><div>' +
      '<p class="portada__texto">Un espacio privado y guiado para las organizaciones aliadas de la Fundación: conocer su punto de partida, planear acciones con responsables y fechas, y formar a sus equipos.</p>' +
      '<div class="hero__acciones"><a class="btn btn--primario btn--lg" href="#/acceso">Ingresar ' + ic('flecha') + '</a><a class="btn btn--secundario btn--lg" href="#/como-acceder">Cómo acceder</a></div>' +
      '<p class="hero__nota">' + provisional + ' Textos de la zona pública pendientes de validación por la Dirección de la Fundación.</p></div></div></section>' +
      '<section class="seccion"><div class="seccion__encabezado"><div class="seccion__eyebrow">Cómo funciona</div><h2>Tres pasos en un mismo espacio</h2></div><div class="grid grid-3">' +
      '<div class="feature"><div class="icono-caja">' + ic('diagnostico') + '</div><h3>Autodiagnóstico</h3><p>La organización responde preguntas guiadas en seis dimensiones y obtiene una lectura orientativa de dónde está.</p></div>' +
      '<div class="feature"><div class="icono-caja icono-caja--violeta">' + ic('plan') + '</div><h3>Plan de acción</h3><p>A partir de sus brechas define acciones con responsables, fechas, metas e indicadores, y les hace seguimiento.</p></div>' +
      '<div class="feature"><div class="icono-caja icono-caja--naranja">' + ic('formacion') + '</div><h3>Formación</h3><p>Invita a su equipo a módulos de sensibilización. La organización ve el avance; las respuestas de cada persona son privadas.</p></div></div></section>' +
      '<section class="seccion seccion--suave" style="max-width:none"><div style="max-width:var(--th-publico-max);margin:auto" class="grid grid-2 items-center">' +
      '<div><div class="seccion__eyebrow">Qué no es</div><h2>No es un canal de denuncias</h2><p class="texto-2">Turquesa Hub no recibe denuncias ni gestiona casos individuales de violencia. El autodiagnóstico es orientativo: no es una evaluación validada, ni una verificación de cumplimiento legal, ni una certificación.</p>' +
      '<p class="texto-2">Si tú o alguien cercano necesita orientación, consulta ' + externo(HERR + 'rutas-atencion.html', 'las rutas de atención') + ' y ' + externo(HERR + 'directorio-rutas.html', 'el directorio verificado por la Fundación') + '.</p></div>' +
      '<div class="bloque-fma"><img class="bloque-fma__logo" src="assets/branding/fma-logo-horizontal.png" alt="Fundación Milagro de Abril" width="895" height="354"><p>Fundación Milagro de Abril es una fundación feminista colombiana que trabaja como laboratorio de innovación social para ampliar el bienestar, los derechos y la autonomía de mujeres, niñas, niños, adolescentes, jóvenes y sus comunidades.</p></div></div></section>';
  }

  function comoAcceder() {
    return '<section class="seccion" style="max-width:760px"><div class="seccion__eyebrow">Acceso</div><h1>Cómo acceder a Turquesa Hub</h1>' +
      '<p class="texto-2">Turquesa Hub funciona <strong>por invitación</strong>: no hay registro abierto.</p><ol>' +
      '<li><strong>Organizaciones.</strong> Si tu organización quiere participar, escríbenos a <a href="mailto:' + CONTACTO + '">' + CONTACTO + '</a>. La Fundación crea su espacio e invita a la persona responsable.</li>' +
      '<li><strong>Colaboradores.</strong> Tu organización te envía un enlace de invitación. Ábrelo, crea tu contraseña y verifica tu correo.</li>' +
      '<li><strong>Si ya tienes cuenta,</strong> entra con tu correo y contraseña.</li></ol>' +
      '<div class="flex gap-3 wrap mt-4"><a class="btn btn--primario" href="#/acceso">Ingresar</a><a class="btn btn--secundario" href="#/activar-invitacion">Tengo una invitación</a></div>' +
      '<p class="texto-xs texto-2 mt-4">Las invitaciones duran 7 días y solo sirven con el correo al que fueron enviadas. Si la tuya venció, pide una nueva a quien te invitó.</p></section>';
  }

  function herramientas() {
    return '<section class="seccion"><div class="seccion__eyebrow">Recursos de la Fundación</div><h1>Herramientas</h1>' +
      '<p class="texto-2" style="max-width:70ch">Herramientas públicas de la Fundación Milagro de Abril. Abren en su propio sitio, en una pestaña nueva; Turquesa Hub no recibe datos de su uso.</p>' +
      HERRAMIENTAS.map(g => '<h2 class="mt-5" style="font-size:var(--th-t-lg)">' + esc(g.grupo) + '</h2><div class="grid grid-3">' +
        g.items.map(x => '<div class="card"><h3 class="card__titulo">' + externo(x.url, x.t) + '</h3><p class="card__sub">' + esc(x.d) + '</p></div>').join('') + '</div>').join('') + '</section>';
  }

  function autocuidado() {
    const piezas = (TH.data.autocuidado || []);
    const auto = (HERRAMIENTAS.find(g => g.grupo === 'Autocuidado') || { items: [] }).items;
    return '<section class="seccion" style="max-width:860px"><div class="seccion__eyebrow">Bienestar</div><h1>Autocuidado</h1>' +
      '<p class="texto-2">Ideas sencillas para cuidarte mientras participas en procesos de prevención.</p>' +
      piezas.map(p => '<div class="card mt-4"><h2 class="card__titulo">' + esc(p.titulo) + '</h2><p>' + esc(p.texto) + '</p>' + (p.provisional ? '<p class="mb-0">' + provisional + ' <span class="texto-xs texto-2">Pendiente de revisión psicosocial de la Fundación.</span></p>' : '') + '</div>').join('') +
      '<h2 class="mt-5" style="font-size:var(--th-t-lg)">Herramientas de autocuidado de la Fundación</h2><ul>' + auto.map(x => '<li>' + externo(x.url, x.t) + '</li>').join('') + '</ul>' +
      TH.ui.alerta('info', 'Si necesitas apoyo', 'Consulta ' + externo(HERR + 'rutas-atencion.html', 'las rutas de atención') + ' y ' + externo(HERR + 'directorio-rutas.html', 'el directorio verificado por la Fundación') + '.') + '</section>';
  }

  function privacidad() {
    const a = TH.supabaseAviso;
    return '<section class="seccion" style="max-width:860px"><div class="seccion__eyebrow">Privacidad</div><h1>Privacidad y datos personales</h1>' +
      '<h2 style="font-size:var(--th-t-lg)">Este sitio</h2><ul class="texto-2">' +
      '<li>Las páginas públicas no piden datos, no usan cookies ni contadores de visitas y no cargan recursos de terceros.</li>' +
      '<li>Solo se tratan datos personales dentro del espacio privado, de las personas invitadas, y con su autorización expresa.</li>' +
      '<li>La sesión se guarda en tu navegador solo mientras la pestaña está abierta.</li></ul>' +
      '<h2 class="mt-5" style="font-size:var(--th-t-lg)">Aviso de tratamiento de datos personales</h2>' +
      (a ? '<p class="texto-xs texto-2">Versión ' + esc(a.version) + (a.publicado_en ? ', publicada el ' + esc(TH.util.fecha(String(a.publicado_en).slice(0, 10))) : '') + '.</p><div class="card"><h3 class="card__titulo">' + esc(a.titulo) + '</h3><p style="white-space:pre-line">' + esc(a.texto) + '</p></div>'
         : TH.ui.alerta('info', 'Aviso pendiente', 'La Fundación Milagro de Abril aún no ha publicado el aviso de tratamiento de datos. Mientras tanto no se activan cuentas.')) +
      '<p class="texto-sm mt-4">Para consultas, actualización o supresión de tus datos escribe a <a href="mailto:' + CONTACTO + '">' + CONTACTO + '</a>.</p></section>';
  }

  TH.router.registrarVarias({
    '/': { layout: 'publico', titulo: 'Inicio', render: portada },
    '/como-acceder': { layout: 'publico', titulo: 'Cómo acceder', render: comoAcceder },
    '/herramientas': { layout: 'publico', titulo: 'Herramientas', render: herramientas },
    '/autocuidado': { layout: 'publico', titulo: 'Autocuidado', render: autocuidado },
    '/privacidad': { layout: 'publico', titulo: 'Privacidad', render: privacidad },
    // Páginas de rc4 que dependían de módulos apagados: se reemplazan por su equivalente vigente.
    '/conocer-turquesa-hub': { layout: 'publico', titulo: 'Inicio', render: portada },
    '/sello-turquesa': { layout: 'publico', titulo: 'Inicio', render: portada },
    '/registro': { layout: 'publico', titulo: 'Cómo acceder', render: comoAcceder },
    '/condiciones': { layout: 'publico', titulo: 'Privacidad', render: privacidad },
    '/aviso-registro': { layout: 'publico', titulo: 'Privacidad', render: privacidad }
  });
  // El aviso vigente se lee de Supabase (lectura pública: solo el publicado).
  TH.supabaseCargadores['/privacidad'] = TH.supabaseCargadores['/condiciones'] = TH.supabaseCargadores['/aviso-registro'] = () => TH.cargarAviso();
})();

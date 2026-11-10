/* ============================================================
   TURQUESA HUB · CASCARONES DE NAVEGACIÓN
   Cascarón público (cabecera/pie) y cascarón de aplicación
   (menú lateral por perfil + barra superior). Las rutas de los módulos
   reservados no existen en estos menús.
   ============================================================ */
window.TH = window.TH || {};

(function () {
  const esc = (s) => TH.util.esc(s);
  const ic = (n, c) => TH.ui.icono(n, c);

  const MENUS = {
    organizacion: [
      { grupo: 'Gestión' },
      { ruta: '/organizacion/inicio', texto: 'Inicio', icono: 'inicio' },
      { ruta: '/organizacion/perfil', texto: 'Perfil organizacional', icono: 'edificio' },
      { ruta: '/organizacion/diagnostico', texto: 'Autodiagnóstico', icono: 'diagnostico' },
      { ruta: '/organizacion/diagnostico/resultados', texto: 'Resultados y brechas', icono: 'reporte' },
      { ruta: '/organizacion/plan-accion', texto: 'Plan de acción', icono: 'plan' },
      { ruta: '/organizacion/plan-accion/seguimiento', texto: 'Seguimiento de compromisos', icono: 'tablero' },
      { grupo: 'Personas' },
      { ruta: '/organizacion/colaboradores', texto: 'Colaboradores', icono: 'personas' },
      { ruta: '/organizacion/sensibilizacion', texto: 'Sensibilización', icono: 'formacion' },
      { ruta: '/organizacion/biblioteca', texto: 'Biblioteca', icono: 'biblioteca' },
      { grupo: 'Institucional' },
      { ruta: '/organizacion/reportes', texto: 'Reportes', icono: 'reporte' },
      { ruta: '/organizacion/sello', texto: 'Sello Turquesa', icono: 'sello' },
      { ruta: '/organizacion/configuracion', texto: 'Cuenta y datos', icono: 'config' }
    ],
    colaborador: [
      { ruta: '/colaborador/inicio', texto: 'Inicio', icono: 'inicio' },
      { ruta: '/colaborador/formacion', texto: 'Mi formación', icono: 'formacion' },
      { ruta: '/colaborador/mi-progreso', texto: 'Mi progreso', icono: 'reporte' },
      { ruta: '/colaborador/recursos', texto: 'Recursos', icono: 'biblioteca' },
      { ruta: '/colaborador/perfil', texto: 'Mi cuenta', icono: 'persona' }
    ],
    fma: [
      { grupo: 'Plataforma' },
      { ruta: '/fma/inicio', texto: 'Tablero general', icono: 'tablero' },
      { ruta: '/fma/organizaciones', texto: 'Organizaciones', icono: 'edificio' },
      { ruta: '/fma/diagnosticos', texto: 'Instrumento y diagnósticos', icono: 'diagnostico' },
      { ruta: '/fma/planes', texto: 'Planes de acción', icono: 'plan' },
      { grupo: 'Editorial' },
      { ruta: '/fma/contenidos', texto: 'Contenidos', icono: 'biblioteca' },
      { ruta: '/fma/formacion', texto: 'Formación', icono: 'formacion' },
      { ruta: '/fma/documentos-legales', texto: 'Documentos jurídicos', icono: 'documento' },
      { grupo: 'Sello Turquesa' },
      { ruta: '/fma/sello', texto: 'Manifestaciones de interés', icono: 'sello' },
      { grupo: 'Sistema' },
      { ruta: '/fma/reportes', texto: 'Reportes', icono: 'reporte' },
      { ruta: '/fma/usuarios', texto: 'Usuarios y permisos', icono: 'personas' },
      { ruta: '/fma/auditoria', texto: 'Trazabilidad', icono: 'historial' },
      { ruta: '/fma/configuracion', texto: 'Configuración', icono: 'config' }
    ]
  };

  /* Marca (Manual Maestro FMA cap. 04/14/17): Turquesa Hub es un activo de nivel 4 sin logo propio;
     se nombra siempre junto a su programa madre («Turquesa Hub · Sello Turquesa») y lleva el endoso de
     Fundación Milagro de Abril con la línea divisora neutra del sistema A. Sobre fondos oscuros se usa el
     logo FMA en blanco (versión negativa oficial). */
  function marca(inversa, compacta) {
    const logo = inversa ? 'assets/branding/fma-logo-negativo-blanco.png' : 'assets/branding/fma-logo-horizontal.png';
    return '<a class="marca ' + (inversa ? 'marca--inversa' : '') + (compacta ? ' marca--compacta' : '') + '" href="#/" aria-label="Turquesa Hub · Sello Turquesa · Un servicio de Fundación Milagro de Abril. Ir al inicio">' +
      '<span class="marca__texto"><span class="marca__nombre">Turquesa Hub</span><span class="marca__sub">Sello Turquesa</span></span>' +
      '<span class="marca__linea" aria-hidden="true"></span>' +
      '<img class="marca__fma" src="' + logo + '" alt="" width="895" height="354">' +
      (inversa ? '' : '<img class="marca__fma-iso" src="assets/branding/fma-isotipo.png" alt="" width="442" height="442">') + '</a>';
  }
  /* Endoso verbal + logo (sistema B, cap. 14): para pies de página y menú lateral. */
  function endoso(vertical) {
    return '<a class="endoso ' + (vertical ? 'endoso--vertical' : '') + '" href="#/conocer-turquesa-hub"><img class="endoso__logo" src="assets/branding/fma-logo-horizontal.png" alt="Fundación Milagro de Abril" width="895" height="354"><span>Un servicio de Fundación Milagro de Abril</span></a>';
  }

  /* Nuevas versiones publicadas de las condiciones o de la política de datos que la persona registrada aún no ha
     aceptado o conocido: se informa en todo el espacio privado y se solicita autorización solo cuando la publicación lo exige. */
  function avisoPoliticas(u) {
    const pend = TH.api.documentosLegales.pendientesAceptacion(u);
    if (!pend.length) return '';
    return '<div class="aviso-politicas" role="region" aria-label="Nuevas versiones de documentos">' + pend.map(p => {
      const d = p.documento; const t = TH.util.catalogo(TH.data.catalogos.tiposDocumentoLegal, d.tipo) || { nombre: d.tipo };
      return TH.ui.alerta(p.requiereAutorizacion ? 'alerta' : 'info', (p.requiereAutorizacion ? 'Se requiere tu autorización: ' : 'Nueva versión publicada: ') + t.nombre,
        'La Fundación Milagro de Abril publicó la versión <strong>' + esc(d.version) + '</strong> (' + esc(TH.util.fecha(d.publicacion && d.publicacion.fecha)) + ').' + (d.publicacion && d.publicacion.nota ? ' ' + esc(d.publicacion.nota) : '') +
        (p.requiereAutorizacion ? ' Esta versión cambia las finalidades del tratamiento o requiere una nueva autorización.' : ' Tu autorización anterior sigue vigente; te pedimos conocer el nuevo texto.') +
        ' <button type="button" class="btn btn--secundario btn--sm" data-action="politicas-revisar" data-id="' + esc(d.id) + '">' + (p.requiereAutorizacion ? 'Revisar y autorizar' : 'Revisar') + '</button>');
    }).join('') + '</div>';
  }

  TH.layout = {
    menus: MENUS,
    marca,
    endoso,
    avisoPoliticas,

    publico(contenido, rutaActual) {
      const sesion = TH.auth.sesion();
      const inicioRol = sesion ? (TH.util.catalogo(TH.data.catalogos.rolesSistema, sesion.rol) || {}).inicio : null;
      const links = [['/conocer-turquesa-hub', 'Cómo funciona'], ['/sello-turquesa', 'Sello Turquesa']];
      return '<div class="publico"><header class="publico__header"><div class="publico__header-inner">' + marca() +
        '<button type="button" class="btn btn--terciario btn-icono publico__menu-btn" data-action="menu-publico" aria-label="Abrir menú" aria-expanded="false">' + ic('menu') + '</button>' +
        '<nav class="publico__nav" id="nav-publico" aria-label="Navegación principal">' + links.map(l => '<a href="#' + l[0] + '" ' + (rutaActual === l[0] ? 'aria-current="page"' : '') + '>' + esc(l[1]) + '</a>').join('') +
        (inicioRol ? '<a class="btn btn--primario btn--sm" href="#' + inicioRol + '">Ir a mi espacio</a>' : '<a href="#/registro">Registrarse</a><a class="btn btn--primario btn--sm" href="#/acceso">Iniciar sesión</a>') + '</nav></div></header>' +
        '<main class="publico__main" id="main" tabindex="-1">' + (TH.remoto && TH.remoto.ultimoError ? '<div class="publico__aviso">' + TH.ui.alerta('alerta', 'Servicio no disponible', esc(TH.remoto.ultimoError) + ' Algunas funciones (registro, acceso) pueden no estar disponibles hasta que se restablezca la conexión. <button type="button" class="btn btn--terciario btn--sm" data-action="reintentar">Reintentar</button>') + '</div>' : '') + contenido + '</main>' +
        '<footer class="publico__footer"><div class="publico__footer-inner">' +
        '<div class="publico__footer-fma"><img src="assets/branding/fma-logo-horizontal.png" alt="Fundación Milagro de Abril" width="895" height="354"><p class="publico__footer-descriptor"><strong>Fundación Milagro de Abril</strong>Laboratorio de Innovación Social</p><p class="texto-sm mb-0" style="max-width:42ch">Turquesa Hub · Sello Turquesa: plataforma de gestión organizacional para la prevención de las violencias basadas en género. Un servicio de Fundación Milagro de Abril.</p></div>' +
        '<div><h4>Plataforma</h4><a href="#/conocer-turquesa-hub">Cómo funciona</a><a href="#/registro">Registrar mi organización</a><a href="#/acceso">Iniciar sesión</a><a href="#/sello-turquesa">Sello Turquesa</a></div>' +
        '<div><h4>Institucional</h4><a href="#/privacidad">Política de tratamiento de datos</a><a href="#/condiciones">Condiciones de uso</a><a href="#/conocer-turquesa-hub">Fundación Milagro de Abril</a></div></div>' +
        '<div class="publico__footer-cierre"><p class="publico__footer-eslogan">Renacer · Emerger · Trascender</p><p class="publico__footer-legal">Turquesa Hub · Sello Turquesa · Fundación Milagro de Abril · Manizales, Colombia · v' + esc(TH.config.producto.version) + '. El autodiagnóstico es orientativo y no constituye una evaluación validada, cumplimiento legal ni certificación. Esta plataforma no recibe denuncias ni gestiona casos individuales de violencia.</p></div></footer></div>';
    },

    app(contenido, ctx) {
      const u = TH.auth.usuario(); const rol = TH.auth.rol(); const org = TH.auth.organizacion();
      const info = TH.util.catalogo(TH.data.catalogos.rolesSistema, rol) || {};
      const menu = MENUS[rol] || [];
      const avatarClase = rol === 'fma' ? 'avatar--violeta' : rol === 'colaborador' ? 'avatar--naranja' : '';
      const nav = menu.map(m => m.grupo ? '<div class="sidebar__grupo">' + esc(m.grupo) + '</div>' :
        '<a href="#' + m.ruta + '" ' + (ctx.ruta === m.ruta || (m.ruta !== '/' + rol + '/inicio' && ctx.ruta.startsWith(m.ruta + '/') && !menu.some(x => x.ruta === ctx.ruta)) ? 'aria-current="page"' : '') + '>' + ic(m.icono) + '<span>' + esc(m.texto) + '</span></a>').join('');
      return '<div class="app" id="app-shell" style="--th-perfil:' + (info.color || 'var(--th-turquesa)') + '">' +
        '<div class="sidebar-overlay" data-action="cerrar-menu"></div>' +
        '<aside class="sidebar" aria-label="Menú de ' + esc(info.espacio || '') + '"><div class="sidebar__marca"><a class="marca" href="#/" aria-label="Turquesa Hub · Sello Turquesa. Ir al inicio"><span class="marca__texto"><span class="marca__nombre">Turquesa Hub</span><span class="marca__sub">Sello Turquesa</span></span></a></div>' +
        '<div class="sidebar__espacio">' + esc(info.espacio || '') + '</div>' +
        '<nav class="sidebar__nav">' + nav + '</nav>' +
        '<div class="sidebar__pie">' + (org ? '<strong>' + esc(org.nombre) + '</strong>' : '') + endoso(true) + '<span><a href="#/privacidad">Privacidad</a> · <a href="#/condiciones">Condiciones</a> · v' + esc(TH.config.producto.version) + '</span></div></aside>' +
        '<div class="contenido"><header class="topbar"><div class="topbar__izq"><button type="button" class="btn btn--terciario btn-icono menu-movil-btn" data-action="abrir-menu" aria-label="Abrir menú" aria-controls="app-shell">' + ic('menu') + '</button><span class="topbar__titulo">' + esc(ctx.titulo || '') + '</span></div>' +
        '<div class="topbar__der"><div class="topbar__usuario"><span class="avatar ' + avatarClase + '" aria-hidden="true">' + esc(TH.util.iniciales(u ? u.nombre : '')) + '</span><span class="topbar__usuario-datos"><span>' + esc(u ? u.nombre : '') + '</span><small>' + esc(info.nombre || '') + '</small></span></div>' +
        '<button type="button" class="btn btn--secundario btn--sm" data-action="salir">' + ic('salir') + ' Cerrar sesión</button></div></header>' +
        '<main class="main ' + (ctx.ancho ? 'main--ancho' : '') + '" id="main" tabindex="-1">' + avisoPoliticas(u) + contenido + '</main></div></div>';
    }
  };
})();

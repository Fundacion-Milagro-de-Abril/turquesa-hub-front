/* ============================================================
   TURQUESA HUB · ARRANQUE
   Inicializa el estado, registra la delegación de eventos global
   (acciones, formularios, cambios) y arranca el enrutador.

   Patrón de interacción:
     <button data-action="nombre" data-x="...">   → TH.acciones.nombre(el, ev)
     <form data-form="nombre">                    → TH.formularios.nombre(form, ev)
     <select data-change="nombre">                → TH.cambios.nombre(el, ev)
     <input data-input="nombre">                  → TH.entradas.nombre(el, ev)  (guardado automático)
   ============================================================ */
window.TH = window.TH || {};
TH.acciones = TH.acciones || {};
TH.formularios = TH.formularios || {};
TH.cambios = TH.cambios || {};
TH.entradas = TH.entradas || {};

(function () {
  /* Acciones globales del cascarón */
  Object.assign(TH.acciones, {
    'abrir-menu'() { const s = document.getElementById('app-shell'); if (s) s.classList.add('menu-abierto'); },
    'cerrar-menu'() { const s = document.getElementById('app-shell'); if (s) s.classList.remove('menu-abierto'); },
    'menu-publico'(el) { const nav = document.getElementById('nav-publico'); if (!nav) return; const abierto = nav.classList.toggle('es-visible'); el.setAttribute('aria-expanded', String(abierto)); },
    async 'salir'(el) { TH.ui.ocupado(el, true, 'Cerrando…'); await TH.auth.salir(); if (TH.remoto) TH.remoto.invalidar(); TH.ui.toast('Sesión cerrada.', 'info'); TH.router.ir('/'); },
    'reintentar'() { TH.router.recargar(); },
    'imprimir'() { window.print(); },
    'cerrar-modal'() { TH.ui.cerrarModal(); },
    'ir'(el) { TH.router.ir(el.dataset.ruta); }
  });

  function delegar() {
    document.addEventListener('click', (ev) => {
      const el = ev.target.closest('[data-action]');
      if (!el) return;
      const fn = TH.acciones[el.dataset.action];
      if (!fn) { console.warn('[TH] Acción sin manejador:', el.dataset.action); return; }
      if (el.tagName === 'A' && !el.getAttribute('href')) ev.preventDefault();
      if (el.tagName === 'BUTTON' && el.getAttribute('type') !== 'submit') ev.preventDefault();
      fn(el, ev);
    });
    document.addEventListener('submit', (ev) => {
      const form = ev.target.closest('form[data-form]');
      if (!form) return;
      ev.preventDefault();
      const fn = TH.formularios[form.dataset.form];
      if (!fn) { console.warn('[TH] Formulario sin manejador:', form.dataset.form); return; }
      fn(form, ev);
    });
    document.addEventListener('change', (ev) => {
      const el = ev.target.closest('[data-change]');
      if (!el) return;
      const fn = TH.cambios[el.dataset.change];
      if (fn) fn(el, ev);
    });
    let timerEntrada = null;
    document.addEventListener('input', (ev) => {
      const el = ev.target.closest('[data-input]');
      if (!el) return;
      const fn = TH.entradas[el.dataset.input];
      if (!fn) return;
      clearTimeout(timerEntrada);
      timerEntrada = setTimeout(() => fn(el, ev), 400);
    });
    // Cerrar menú lateral al navegar en móvil
    window.addEventListener('hashchange', () => { const s = document.getElementById('app-shell'); if (s) s.classList.remove('menu-abierto'); });
  }

  async function iniciar() {
    TH.store.init();
    if (TH.config.esRemoto && TH.remoto) TH.remoto.activar();   // mutaciones por HTTP; la caché local solo refleja lo que confirma el servidor
    delegar();
    await TH.auth.restaurar();                                   // en producción confirma la sesión con /auth/me antes de enrutar
    TH.router.iniciar();
    if (TH.config.entorno === 'desarrollo') console.info('%cTurquesa Hub', 'color:#126973;font-weight:bold', 'v' + TH.config.producto.version + ' · entorno de desarrollo · datos de prueba (js/dev/semilla.js)');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();

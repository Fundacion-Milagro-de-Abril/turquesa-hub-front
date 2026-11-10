/* ============================================================
   TURQUESA HUB · ESTADO EN MEMORIA Y CACHÉ
   Store único de la aplicación.
     - desarrollo: se inicializa con los datos de prueba (js/dev/semilla.js)
       y se persiste en localStorage para conservar el trabajo entre recargas.
     - produccion: se inicializa vacío, se alimenta desde la API a través de
       la capa de servicios y NO se persiste en el navegador (solo memoria).
   Nunca contiene contraseñas en claro ni tokens.
   ============================================================ */
window.TH = window.TH || {};
TH.acciones = TH.acciones || {};
TH.formularios = TH.formularios || {};
TH.cambios = TH.cambios || {};
TH.entradas = TH.entradas || {};

TH.store = (function () {
  const CLAVE = 'turquesa-hub-dev-v4';
  let estado = null;
  const suscriptores = new Set();
  let timerGuardado = null;
  const persistir = () => TH.config.esDesarrollo;

  function vacio() {
    return { version: 4, organizaciones: [], usuarios: [], invitaciones: [], diagnosticos: [], diagnosticosArchivados: [], planes: [], evidencias: [], progresoFormativo: [], participacionAgregada: {}, interesesSello: [], contenidos: [], modulos: [], documentosLegales: [], instrumentoVersiones: [], historial: [], configuracion: {} };
  }
  function cargar() {
    if (persistir()) {
      try {
        const crudo = localStorage.getItem(CLAVE);
        if (crudo) { const p = JSON.parse(crudo); if (p && p.version === 4) { estado = p; return; } }
      } catch (e) { console.warn('[TH.store] No fue posible leer localStorage.', e); }
      estado = (TH.data && typeof TH.data.semilla === 'function') ? TH.data.semilla() : vacio();
      guardarAhora();
    } else {
      estado = vacio(); // en producción todo llega de la API (TH.remoto); los catálogos estáticos sirven solo como semilla editorial del backend
    }
  }
  function guardarAhora() {
    if (!persistir()) return;
    try { localStorage.setItem(CLAVE, JSON.stringify(estado)); } catch (e) { console.warn('[TH.store] No fue posible guardar en localStorage.', e); }
    TH.store.ultimoGuardado = new Date();
  }
  function guardar() { clearTimeout(timerGuardado); timerGuardado = setTimeout(guardarAhora, 120); }
  function notificar(motivo) { suscriptores.forEach(fn => { try { fn(estado, motivo); } catch (e) { console.error(e); } }); }

  return {
    ultimoGuardado: null,
    init() { if (!estado) cargar(); return estado; },
    get() { return estado; },
    update(fn, motivo) { fn(estado); guardar(); notificar(motivo || 'update'); },
    suscribir(fn) { suscriptores.add(fn); return () => suscriptores.delete(fn); },
    /** Vacía la caché en memoria (cambio de sesión en producción) sin tocar los datos de desarrollo. */
    vaciar() { estado = vacio(); notificar('vaciar'); },
    reiniciar() { estado = (TH.config.esDesarrollo && TH.data && TH.data.semilla) ? TH.data.semilla() : vacio(); guardarAhora(); notificar('reset'); },
    exportar() { const copia = JSON.parse(JSON.stringify(estado)); (copia.usuarios || []).forEach(u => { delete u.credencial; delete u.cuentaDePrueba; }); return JSON.stringify(copia, null, 2); },
    guardarAhora
  };
})();

TH.util = {
  /** Inserta o reemplaza por id (caché de entidades que llegan de la API). */
  upsert(lista, obj) { if (!obj || !obj.id) return lista; const i = lista.findIndex(x => x.id === obj.id); if (i >= 0) lista[i] = obj; else lista.push(obj); return lista; },
  reemplazarLista(lista, nuevos) { lista.length = 0; (nuevos || []).forEach(x => lista.push(x)); return lista; },
  id(prefijo) { return prefijo + '-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); },
  hoy() { return new Date().toISOString().slice(0, 10); },
  fecha(iso, opciones) { if (!iso) return '—'; const d = new Date(iso.length === 10 ? iso + 'T12:00:00' : iso); if (isNaN(d)) return iso; return d.toLocaleDateString('es-CO', opciones || { year: 'numeric', month: 'short', day: 'numeric' }); },
  fechaLarga(iso) { return TH.util.fecha(iso, { year: 'numeric', month: 'long', day: 'numeric' }); },
  sumarDias(iso, dias) { const d = new Date(iso + 'T12:00:00'); d.setDate(d.getDate() + dias); return d.toISOString().slice(0, 10); },
  esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); },
  pct(n, d) { return d ? Math.round((n / d) * 100) : 0; },
  iniciales(nombre) { return (nombre || '?').split(' ').filter(Boolean).slice(0, 2).map(p => p[0].toUpperCase()).join(''); },
  buscar(texto, consulta) { const n = (x) => (x || '').toString().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); return n(texto).includes(n(consulta)); },
  catalogo(lista, id) { return (lista || []).find(x => x.id === id) || null; },
  nombreCatalogo(lista, id) { const x = TH.util.catalogo(lista, id); return x ? x.nombre : (id || '—'); },
  plural(n, s, p) { return n === 1 ? s : p; },
  clamp(n, a, b) { return Math.max(a, Math.min(b, n)); },
  /** Validación del dígito de verificación del NIT colombiano (DIAN). Solo para tipo 'NIT'. */
  validarNIT(valor) {
    const limpio = String(valor || '').replace(/[.\s]/g, '');
    const m = limpio.match(/^(\d{6,10})-?(\d)$/);
    if (!m) return 'Escribe el NIT con dígito de verificación (ej.: 900123456-7).';
    const base = m[1], dv = parseInt(m[2], 10);
    const pesos = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
    let suma = 0; const digitos = base.split('').reverse();
    for (let i = 0; i < digitos.length; i++) suma += parseInt(digitos[i], 10) * pesos[i];
    const resto = suma % 11; const esperado = resto > 1 ? 11 - resto : resto;
    return esperado === dv ? '' : 'El dígito de verificación del NIT no coincide.';
  }
};

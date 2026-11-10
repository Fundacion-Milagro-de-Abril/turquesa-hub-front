/* Arnés común de pruebas: carga public/index.html en jsdom con los scripts inlineados.
   opciones.entorno: 'desarrollo' (por defecto; semilla y adaptador local) | 'produccion' (sin semilla, adaptador HTTP; requiere opciones.fetch).
   opciones.fetch: implementación de fetch (p. ej. la del servidor simulado) para el entorno de producción. */
const { JSDOM, VirtualConsole } = require('jsdom');
const path = require('path'); const fs = require('fs');
const RAIZ = path.resolve(__dirname, '..', '..');
const PUBLIC = path.join(RAIZ, 'public');

function htmlInlineado(entorno) {
  let html = fs.readFileSync(path.join(PUBLIC, 'index.html'), 'utf8');
  if (entorno === 'produccion') html = html.replace(/\s*<!-- dev:start -->[\s\S]*?<!-- dev:end -->/g, '');
  return html.replace(/<script src="([^"]+)"><\/script>/g, (m, src) => {
    const archivo = src === 'js/env.js' ? path.join(RAIZ, 'config', 'env.' + entorno + '.js') : path.join(PUBLIC, src);
    return '<script>' + fs.readFileSync(archivo, 'utf8').replace(/<\/script/g, '<\\/script') + '</script>';
  }).replace(/<link rel="stylesheet"[^>]*>/g, '');
}

function crear(opciones) {
  const o = opciones || {}; const entorno = o.entorno || 'desarrollo';
  const errores = []; const vc = new VirtualConsole();
  vc.on('jsdomError', e => { const m = String(e && e.message || e); if (!/navigation \(except hash changes\)/.test(m)) errores.push(m); });
  vc.on('error', e => errores.push(String(e)));
  vc.on('warn', m => { if (String(m).includes('[TH]')) errores.push('WARN ' + m); });
  const dom = new JSDOM(htmlInlineado(entorno), { url: o.url || (entorno === 'produccion' ? 'https://turquesahub.example/' : 'http://localhost/'), runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: vc, beforeParse(win) { if (o.fetch) win.fetch = o.fetch; } });
  const w = dom.window; w.scrollTo = () => { }; w.print = () => { w.__printed = (w.__printed || 0) + 1; }; w.HTMLElement.prototype.setSelectionRange = function () { };
  w.URL.createObjectURL = () => 'blob:x'; w.URL.revokeObjectURL = () => { };
  const cuenta = { pasos: 0, fallos: 0 };
  const ok = (c, m) => { cuenta.pasos++; if (!c) { cuenta.fallos++; console.log('  ✗ ' + m); } else console.log('  ✓ ' + m); };
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const espera = o.espera || (entorno === 'produccion' ? 120 : 40);
  const ir = async r => { w.location.hash = '#' + r; await sleep(espera); };
  const texto = () => w.document.getElementById('app').textContent;
  const nav = () => [...w.document.querySelectorAll('.sidebar__nav a')].map(a => a.getAttribute('href').replace(/^#/, ''));
  const q = sel => w.document.querySelector(sel);
  const click = async (sel) => { const el = typeof sel === 'string' ? q(sel) : sel; if (!el) throw new Error('No existe ' + sel); el.click(); await sleep(espera); };
  const submit = async (f) => { if (typeof f === 'string') f = q(f); if (!f) throw new Error('Formulario no encontrado'); f.dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true })); await sleep(espera * 3); };
  const cambiar = async (el, valor) => { el.value = valor; el.dispatchEvent(new w.Event('change', { bubbles: true })); await sleep(espera); };
  const FRASES_PROHIBIDAS = /Beta de demostración|Fase posterior|fase posterior|Disponible en futuras versiones|Próximamente|Vista técnica|Datos ficticios de demostración|Sin cuentas seguras|Explorar la beta|Cambiar de perfil de demostración|modo demostración|perfil de demostración|versiones posteriores|se implementará/;
  const rutasVisitadas = new Set();
  async function recorrer(rutas, etiqueta) {
    let limpio = true;
    for (const r of rutas) {
      await ir(r); rutasVisitadas.add(r);
      const t = texto();
      if (t.length < 150 || /Página no encontrada|No fue posible mostrar esta sección|No fue posible cargar/.test(t) || FRASES_PROHIBIDAS.test(t)) { limpio = false; console.log('    · problema en ' + r + ': ' + (FRASES_PROHIBIDAS.test(t) ? 'frase prohibida' : t.slice(0, 80))); }
      [...w.document.querySelectorAll('[data-action]')].forEach(el => { if (!w.TH.acciones[el.dataset.action]) { limpio = false; console.log('    · acción sin manejador en ' + r + ': ' + el.dataset.action); } });
      [...w.document.querySelectorAll('a[href^="#/"]')].forEach(a => { const ruta = a.getAttribute('href').slice(1).split('?')[0]; if (!w.TH.router.rutas[ruta]) { limpio = false; console.log('    · enlace roto en ' + r + ': ' + ruta); } });
    }
    ok(limpio, etiqueta + ': ' + rutas.length + ' rutas renderizan sin errores, sin frases de fase/demostración, sin enlaces rotos ni botones sin manejador');
  }
  async function login(email, clave) { await ir('/acceso'); const f = q('form[data-form=acceso]'); f.elements.email.value = email; f.elements.clave.value = clave; await submit(f); await sleep(espera * 2); return w.TH.auth.sesion(); }
  async function logout() { const b = q('[data-action=salir]'); if (b) { b.click(); await sleep(espera * 3); } else if (w.TH.auth.sesion()) { await w.TH.auth.salir(); if (w.TH.remoto) w.TH.remoto.invalidar(); await ir('/'); } }
  async function listo() { await new Promise(r => w.addEventListener('load', r)); await sleep(espera * 3); return w.TH; }
  function resumen(nombre) {
    console.log('\n' + cuenta.pasos + ' verificaciones · ' + cuenta.fallos + ' fallos' + (rutasVisitadas.size ? ' · rutas visitadas: ' + rutasVisitadas.size : ''));
    if (errores.length) { console.log('Errores de consola/jsdom:'); errores.slice(0, 20).forEach(e => console.log('  - ' + e)); }
    return cuenta.fallos || errores.length ? 1 : 0;
  }
  return { w, dom, ok, sleep, ir, texto, nav, q, click, submit, cambiar, recorrer, login, logout, listo, resumen, errores, cuenta, FRASES_PROHIBIDAS, espera };
}
module.exports = { crear, RAIZ, PUBLIC };

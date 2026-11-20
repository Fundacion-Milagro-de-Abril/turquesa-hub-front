/* F06 · Zona pública de producción (criterios 1 a 4 y 7). Supabase simulado, sin red. */
const { crear } = require('./lib/entorno');
(async () => {
  const h = crear({ entorno: 'produccion', supabase: true, espera: 120 });
  const { w, ok } = h; const TH = await h.listo();
  const llamadas = [];
  let aviso = null;
  TH.sb.from = (t) => { const b = { select() { return b; }, eq() { return b; }, order() { return b; }, maybeSingle() { return b; },
    then(okf, f) { llamadas.push(t + ' @ ' + w.location.hash); return Promise.resolve({ data: t === 'avisos' ? aviso : null, error: null }).then(okf, f); } }; return b; };
  TH.sb.rpc = async (n) => { llamadas.push('rpc ' + n); return { data: null, error: null }; };
  const enlaces = () => [...w.document.querySelectorAll('#app a')].map(a => a.getAttribute('href'));

  console.log('[Portada y menú]');
  await h.ir('/');
  const t = h.texto();
  ok(/Turquesa Hub/.test(t) && !!h.q('#app img[src*="fma-logo"]'), 'La portada explica qué es Turquesa Hub y lleva la identidad de FMA');
  ok(enlaces().includes('#/acceso') && /Ingresar/.test(t), 'Ofrece «Ingresar» a la zona privada');
  ok(!enlaces().includes('#/registro') && !/Registrar mi organización|Registrarse/.test(t), 'No ofrece registro abierto (el acceso es por invitación)');
  ok(!enlaces().includes('#/sello-turquesa'), 'Sin enlaces al Sello Turquesa (módulo apagado)');
  ok(/no recibe denuncias/i.test(t) && !/provisional|pendientes de validación/i.test(t), 'Aclara que no es un canal de denuncias, sin marcas de contenido provisional (textos validados)');
  const menu = [...w.document.querySelectorAll('#nav-publico a')].map(a => a.getAttribute('href'));
  ok(JSON.stringify(menu) === JSON.stringify(['#/', '#/herramientas', '#/autocuidado', '#/activar-invitacion', '#/acceso']), 'Menú público: inicio, herramientas, autocuidado, activar invitación e ingresar');

  console.log('[Rutas de rc4 reemplazadas]');
  await h.ir('/registro'); ok(/Cómo acceder/.test(h.texto()) && /enlace de registro/.test(h.texto()) && !h.q('form'), '#/registro sin enlace explica cómo acceder (sin formulario: el registro necesita el enlace de FMA)');
  await h.ir('/sello-turquesa'); ok(/Turquesa Hub/.test(h.texto()) && !h.q('form'), '#/sello-turquesa lleva a la portada (sin formulario de interés)');
  await h.ir('/como-acceder'); ok(!!h.q('a[href^="mailto:sai@fundacionmilagrodeabril.org"]') && !h.q('form'), 'Cómo acceder: contacto por correo, sin formularios ni datos');

  console.log('[Herramientas y autocuidado]');
  await h.ir('/herramientas');
  const ext = [...w.document.querySelectorAll('#app a[target="_blank"]')];
  ok(ext.length === 7, 'Herramientas: 7 enlaces a herramientas de FMA');
  ok(ext.every(a => /^https:\/\/[a-z]+\.fundacionmilagrodeabril\.org\//.test(a.href) && /noopener/.test(a.rel)), 'Todos abren su subdominio de FMA por HTTPS, en pestaña nueva y con rel="noopener"');
  await h.ir('/autocuidado');
  ok(TH.data.autocuidado.length === 3 && w.document.querySelectorAll('#app .card').length === 3 && !w.document.querySelector('#app .etiqueta--referencial') && !/provisional|pendiente de revisión/i.test(h.texto()), 'Autocuidado: las 3 piezas sin marcas de contenido provisional (textos validados)');
  ok(/Mapa emocional/.test(h.texto()) && /rutas de atención/.test(h.texto()), 'Autocuidado enlaza las herramientas de autocuidado y las rutas de atención');

  console.log('[Privacidad y datos]');
  await h.ir('/privacidad'); ok(/aún no ha publicado el aviso/.test(h.texto()), 'Privacidad: sin aviso publicado lo dice claramente');
  aviso = { version: 'v1', titulo: 'Aviso de datos', texto: 'Texto del aviso', publicado_en: '2026-11-14T00:00:00Z' };
  await TH.router.recargar(); await h.sleep(200);
  ok(/Aviso de datos/.test(h.texto()) && /Versión v1/.test(h.texto()), 'Privacidad: muestra el aviso vigente leído de la base');
  const sinPriv = llamadas.filter(l => !/privacidad/.test(l));
  ok(sinPriv.length === 0, 'Las demás páginas públicas no consultan a Supabase' + (sinPriv.length ? ': ' + sinPriv.join(', ') : ''));
  ok(w.document.cookie === '' && w.localStorage.length === 0 && w.sessionStorage.length === 0, 'Sin cookies ni almacenamiento del navegador para quien visita');
  console.log('\n' + h.cuenta.pasos + ' verificaciones · ' + h.cuenta.fallos + ' fallos'); process.exit(h.cuenta.fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });

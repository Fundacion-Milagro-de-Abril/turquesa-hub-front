/* Genera las filas de la sección 4 (instrumento) de docs/MATRIZ_TRAZABILIDAD_BIBLIOGRAFICA.md a partir del instrumento y del registro de fuentes.
   Uso: node tools/matriz-instrumento.js [salida.md]. El mapa A contiene el apartado verificado por (pregunta, fuente). */
global.window={TH:{}};global.TH=window.TH;require(require('path').join(__dirname, '..', 'public', 'js', 'data', 'fuentes.js'));require(require('path').join(__dirname, '..', 'public', 'js', 'data', 'instrumento-diagnostico.js'));
const F=TH.data.fuentes;
// Apartado por (pregunta, fuente): referencias verificadas el 2026-11-03 (ver docs/FUENTES.md)
const A={
 q01:{'F-24':'Principio 1 (liderazgo) y 7','F-22':'Paso 1 Comprometerse (p. 43; contenido pendiente de contraste)','F-04':'Art. 11, num. 1','F-08':'Art. 2.2.1.8.2.1'},
 q02:{'F-08':'Art. 2.2.1.8.2.1 (responsables designados)','F-06':'Art. 6, par. 1'},
 q03:{'F-06':'Art. 13','F-22':'Paso 1 Comprometerse (p. 43; pendiente de contraste)'},
 q04:{'F-20':'Art. 9 (b)','F-08':'Art. 2.2.1.8.2.4, num. 6','F-31':'Cláusula 1 y 6.1.2 / Tabla 1','F-11':'Libro 2, Parte 2, Título 4, Cap. 6; 2.2.4.6.15 par. 2'},
 q05:{'F-25':"Estrategia 'Transformed attitudes, beliefs and norms', pp. 9 y 11",'F-22':"Ficha PNUD ('cultura de cero tolerancia')"},
 q06:{'F-24':'Principio 2','F-32':'Folleto oficial ISO (PUB100487): área interna y metas','F-05':'Arts. 16 y 17','F-02':'Art. 12','F-10':'Arts. 1 y 3 (compilados en D. 1072/2015, 2.2.6.7.1-2.2.6.7.5)'},
 q07:{'F-20':'Art. 9 (c)','F-21':'Párr. 8','F-31':'6.1.2 / Tabla 1','F-08':'Art. 2.2.1.8.2.4, num. 6','F-09':'Recomendación 5.a','F-12':'Arts. 1 y 3'},
 q08:{'F-12':'Art. 3 (periodicidad) y 4','F-08':'Art. 2.2.1.8.2.4, num. 6','F-31':'6.1.2 / Tabla 1'},
 q09:{'F-04':'Art. 11, nums. 1-3','F-05':'Art. 18','F-08':'Arts. 2.2.1.8.2.1 y 2.2.1.8.2.2','F-01':'Art. 9, num. 1'},
 q10:{'F-08':'Art. 2.2.1.8.2.1','F-04':'Arts. 11, 13 y 15','F-06':'Art. 6, par. 1'},
 q11:{'F-06':'Arts. 3-6, 12 y 13','F-08':'Arts. 2.2.1.8.2.1 y 2.2.1.8.2.3','F-01':'Art. 9, num. 1'},
 q12:{'F-08':'Art. 2.2.1.8.2.1 (espacios anuales de formación y actualización)','F-06':'Art. 16 (deroga Res. 652 y 1356 de 2012)'},
 q13:{'F-20':'Art. 9 (d)','F-08':'Arts. 2.2.1.8.2.1 y 2.2.1.8.2.3','F-22':'Paso 3 Accionar (p. 55; prevención p. 57; capacidades p. 66; pendiente de contraste)'},
 q14:{'F-06':'Art. 12','F-08':'Art. 2.2.1.8.2.3'},
 q15:{'F-08':'Arts. 2.2.1.8.2.1 y 2.2.1.8.2.2','F-04':'Art. 11, num. 1'},
 q16:{'F-24':'Principio 7','F-22':'Paso 4 Monitorear (p. 72; pendiente de contraste)'},
 q17:{'F-04':'Art. 15','F-08':'Arts. 2.2.1.8.2.1, 2.2.1.8.2.6 y 2.2.1.8.2.7','F-34':'Cláusula 1 y cláusula 8 (8.2-8.5)'},
 q18:{'F-04':'Art. 11, nums. 4 y 5','F-02':'Art. 6, num. 3 (corresponsabilidad)','F-08':'Art. 2.2.1.8.3.10'},
 q19:{'F-04':'Arts. 5, 11 y 13','F-09':'Nums. 5.d y 7','F-08':'Arts. 2.2.1.8.2.4 y 2.2.1.8.3.4 (2.º)','F-26':'p. 14 (LIVES); pp. 16-18'},
 q20:{'F-04':'Art. 11, num. 1','F-08':'Art. 2.2.1.8.2.1'},
 q21:{'F-24':'Principio 7','F-22':'Paso 4 Monitorear (p. 72; pendiente de contraste)','F-30':'Cláusulas 9 (9.1, 9.3) y 10; PDCA'},
 q22:{'F-03':'Arts. 4 y 17','F-08':'Arts. 2.2.1.8.2.1 (num. 8), 2.2.1.8.2.4 y 2.2.1.8.3.4 (2.º)','F-04':'Art. 11, num. 7'},
 q23:{'F-30':'Cláusulas 9 y 10; PDCA','F-22':'Paso 4 Monitorear (p. 72; pendiente de contraste)','F-06':'Art. 6, nums. 9-10 y art. 8'},
 q24:{'F-24':'Principio 6','F-02':'Art. 6, num. 3'}
};
const autor=c=>c.cita.split(' (')[0]; const titulo=c=>{const m=c.cita.match(/\)\. (.*?)(?:\. (?:Diario Oficial|Programa|Verificar|Apoyo|Uso|Consultado|Control|Art\.|Compilado|Aprobado|Serie|Estrategia|Ficha|\(|ISBN)|$)/); return (m?m[1]:c.cita.split('). ')[1]||'').replace(/\|/g,'/');};
const rows=[]; const faltan=[];
TH.data.instrumento.preguntas.forEach(p=>{p.fuentes.forEach(f=>{const c=F[f]; const ap=(A[p.id]||{})[f]; if(!ap) faltan.push(p.id+':'+f);
 const obs='Estado de la fuente en docs/FUENTES.md: '+c.estado+(f==='F-08'?'; texto oficial con dos arts. 2.2.1.8.3.4 y sin 2.2.1.8.3.5':'')+(/pendiente de contraste/.test(ap||'')?'; afirmación acotada como criterio técnico hasta contrastar las pp. 40-73 de F-22':'');
 rows.push('| instrumento · '+p.id+' | '+p.capacidad.replace(/\|/g,'/')+' | '+p.justificacion.replace(/\|/g,'/')+' | '+autor(c)+' | '+c.anio+' | '+titulo(c)+' | '+c.tipo+' | '+c.url+' | '+(ap||'Ver justificación')+' | 2026-11-03 | Fundamento de la pregunta '+p.id+' ('+(p.alcance==='activa'?'activa':'banco de reserva')+') y de su recomendación en el plan | '+obs+' | '+c.estado+' |');});});
require('fs').writeFileSync(process.argv[2] || require('path').join(__dirname, '..', 'docs', 'matriz-instrumento.generado.md'), rows.join('\n')+'\n'); console.log(rows.length, 'faltan', faltan);

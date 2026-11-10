/* ============================================================
   TURQUESA HUB · CONTENIDOS DE LA BIBLIOTECA (redacción inicial v1.0)
   Guías prácticas, modelos orientativos, herramientas, fichas normativas y
   glosario. Estructura: objetivo, secciones (conceptos, desarrollo técnico,
   aplicación en la organización colombiana, situación práctica, acciones
   recomendadas, errores frecuentes, herramienta o lista de verificación),
   referencias (códigos del registro js/data/fuentes.js / docs/FUENTES.md),
   fecha de revisión y responsable. Estado editorial inicial:
   'en-revision-tecnica'. Las revisiones jurídica y psicosocial las registran
   las profesionales autorizadas por la FMA desde /fma/contenidos; ninguna
   aprobación es automática. Trazabilidad: docs/MATRIZ_TRAZABILIDAD_BIBLIOGRAFICA.md.
   ============================================================ */
window.TH = window.TH || {};
TH.data = TH.data || {};
TH.data.AVISO_REFERENCIAL = 'Modelo orientativo: debe adaptarse a cada organización y requiere revisión jurídica antes de su adopción.';

TH.data.contenidos = [
  // =====================================================================
  // 1. PREVENCIÓN INTEGRAL
  // =====================================================================
  { id: 'rec-prevencion',
    titulo: 'Prevención integral de las violencias basadas en género en las organizaciones',
    categoria: 'Guía práctica', tema: 'Prevención integral',
    descripcion: 'Qué significa prevenir las violencias basadas en género desde una organización, cómo se articulan compromiso, detección, acción y monitoreo, y qué marco normativo colombiano e internacional sostiene ese trabajo.',
    publico: ['organizacion', 'colaborador'], tiempoLectura: 14,
    objetivo: 'Al finalizar la lectura, la persona podrá explicar qué es la prevención integral de las violencias basadas en género en el ámbito organizacional, distinguir sus componentes (compromiso, detección, acción y monitoreo), ubicar las obligaciones del empleador y las competencias de otras instancias, y reconocer el papel de Turquesa Hub como herramienta de gestión preventiva.',
    secciones: [
      { titulo: 'Conceptos fundamentales', cuerpo: [
        'Las violencias basadas en género (VBG) son comportamientos y prácticas que causan o pueden causar daño físico, psicológico, sexual o económico a una persona por razón de su género o de las relaciones desiguales de poder entre los géneros. El Convenio 190 de la OIT define la violencia y el acoso en el mundo del trabajo como un conjunto de comportamientos y prácticas inaceptables, únicos o repetidos, que tengan por objeto o resultado causar esos daños, y reconoce de manera específica la violencia y el acoso por razón de género (F-20, art. 1). Colombia aprobó este Convenio mediante la Ley 2528 de 2025; su estado de ratificación y entrada en vigor debe verificarse antes de afirmar su exigibilidad directa.',
        'La legislación nacional recoge una definición muy cercana. El artículo 18 de la Ley 2466 de 2025 protege a toda persona en el mundo del trabajo sin importar su vínculo, incluidas personas en formación, voluntarias y en búsqueda de empleo; define la violencia y el acoso como comportamientos inaceptables, únicos o repetidos, que causen o puedan causar daño físico, psicológico, sexual o económico, incluido el daño por razón de género; y extiende la protección a los espacios físicos y digitales vinculados al trabajo y a las conductas de terceros, clientes y proveedores (F-05, art. 18).',
        'Prevenir de manera integral significa actuar sobre las condiciones que hacen posible la violencia antes de que ocurra, sin renunciar a responder con garantías cuando se presenta. La guía del PNUD para empresas propone un modelo de gestión de cuatro componentes que se refuerzan entre sí: compromiso (decisión institucional y recursos), detección (capacidad de identificar riesgos y situaciones), acción (política, protocolo, formación y respuesta) y monitoreo (seguimiento con evidencias y ajuste) (F-22). Una guía anterior del PNUD para organizaciones (2014) ya proponía diagnosticar, comunicar, adoptar una política con plan de acción y evaluar y dar seguimiento (F-23).',
        'Desde la salud pública, la OMS organiza la evidencia disponible sobre prevención de la violencia contra las mujeres en siete estrategias; la estrategia de entornos seguros (Environments made safe) incluye explícitamente los entornos de trabajo entre los espacios que deben hacerse seguros, con intervenciones como políticas organizacionales y formación del personal sobre acoso sexual (F-25, pp. 9 y 11). La organización es, por tanto, un espacio de prevención en sí mismo y no solamente un lugar donde la violencia se recibe o se reporta.'
      ] },
      { titulo: 'Desarrollo técnico', cuerpo: [
        'El componente de compromiso se expresa en decisiones verificables: una declaración de cero tolerancia adoptada por la alta dirección, una política escrita, responsables designados y recursos asignados (criterio técnico de Turquesa Hub coherente con el paso 1, "Comprometerse", de F-22). En Colombia, la política interna de prevención del acoso sexual debe reflejarse en el reglamento interno de trabajo, los contratos, los protocolos y las rutas de atención, y difundirse ampliamente (F-04, art. 11). El Decreto 1040 de 2026 desarrolla esa obligación y la extiende a la violencia, el acoso, las VBG y la discriminación, exigiendo que la política y el protocolo se construyan de manera participativa, se publiquen y socialicen, y se acompañen de espacios anuales de formación y actualización (F-08, art. 2.2.1.8.2.1).',
        'El componente de detección combina dos capacidades: identificar factores organizacionales de riesgo (espacios, horarios, jerarquías, contacto con terceros, trabajo remoto) e identificar oportunamente situaciones concretas. El Convenio 190 pide que el empleador incluya la violencia y el acoso en la evaluación de riesgos del sistema de seguridad y salud en el trabajo (F-20, art. 9); el Decreto 1040 de 2026 ordena integrar este riesgo psicosocial al SG-SST (F-08, art. 2.2.1.8.2.4). La detección también depende de canales de queja accesibles por medios electrónicos, físicos o verbales y de la confianza en que no habrá represalias (F-08, arts. 2.2.1.8.2.6 y 2.2.1.8.2.7).',
        'El componente de acción abarca lo preventivo (formación, campañas, lineamientos de comunicación, revisión de procesos de talento) y lo reactivo dentro de la competencia del empleador: recibir la queja, adoptar medidas de protección inmediatas, investigar internamente con debida diligencia y enfoque de género, decidir con medidas de reparación y no repetición, y remitir a la autoridad competente cuando corresponda o a petición de la víctima (F-04, art. 11; F-08, arts. 2.2.1.8.2.5, 2.2.1.8.3.1 a 2.2.1.8.3.4 y 2.2.1.8.3.8). Cuando el presunto acosador es superior jerárquico, la competencia pasa a la inspección del trabajo (F-08, art. 2.2.1.8.3.10).',
        'El componente de monitoreo cierra el ciclo: indicadores, evidencias, revisión directiva periódica y publicación semestral anonimizada del número de quejas tramitadas y sanciones impuestas, con remisión al SIVIGE (F-04, art. 11, num. 7; F-22). Sin monitoreo, el compromiso se convierte en declaración y la acción en respuesta aislada.'
      ], lista: [
        'Compromiso: declaración, política, responsables, recursos.',
        'Detección: evaluación de riesgos psicosociales, canales de queja, lectura del clima organizacional.',
        'Acción: prevención primaria (formación, cultura) y respuesta institucional con garantías.',
        'Monitoreo: indicadores, evidencias, revisión y publicación anonimizada.'
      ] },
      { titulo: 'Aplicación en una organización colombiana', cuerpo: [
        'Una organización colombiana que inicia este trabajo suele contar ya con piezas dispersas: un reglamento interno de trabajo, un Comité de Convivencia Laboral, un SG-SST con batería de riesgo psicosocial y, en ocasiones, una política de equidad. La prevención integral consiste en articular esas piezas bajo un mismo propósito, no en crear estructuras paralelas. Conviene distinguir con claridad las competencias: el Comité de Convivencia Laboral tiene funciones preventivas, orientadoras y conciliadoras frente al acoso laboral, pero no es competente para quejas de acoso sexual, que no son conciliables; la alta dirección o el área de talento humano define el procedimiento conforme a la Ley 2365 de 2024 (F-06, art. 6, par. 1).',
        'Turquesa Hub acompaña la gestión preventiva: diagnóstico de capacidades institucionales, plan de acción, formación, documentación de evidencias e indicadores. No gestiona casos ni sustituye el protocolo interno, la investigación con debida diligencia que corresponde al empleador, ni las atribuciones del Ministerio del Trabajo, la Fiscalía, los jueces, las comisarías o el sector salud. Esa distinción es parte de la prevención: una organización que conoce sus límites remite mejor y revictimiza menos.',
        'En organizaciones pequeñas y medianas, el modelo se adapta sin perder sus componentes. Una empresa con veinte personas puede tener una política de dos páginas, un canal de queja claro, una responsable designada y una revisión semestral; lo esencial es que cada componente exista y deje evidencia.'
      ] },
      { titulo: 'Situación práctica', cuerpo: [
        'Una empresa de servicios logísticos de una ciudad intermedia tiene cuarenta y cinco personas, turnos nocturnos y contacto permanente con conductores externos. Cuenta con Comité de Convivencia Laboral y con SG-SST, pero nunca ha evaluado el riesgo de acoso sexual en los turnos de noche ni en los patios de cargue. La gerencia considera que no existe un problema porque no ha recibido quejas formales. Una colaboradora del turno nocturno comenta en una sesión de inducción que prefiere no quedarse sola en el patio cuando llegan ciertos conductores.'
      ], lista: [
        '¿Qué componentes del modelo (compromiso, detección, acción, monitoreo) están presentes y cuáles ausentes en esta organización?',
        '¿La ausencia de quejas formales es evidencia de ausencia de riesgo? ¿Qué podría explicar el silencio?',
        '¿Qué obligaciones del empleador aplican frente a conductas de terceros como los conductores externos (F-05, art. 18)?',
        '¿Qué instancia interna debería recibir el comentario de la colaboradora y qué no debería hacer el Comité de Convivencia Laboral?'
      ] },
      { titulo: 'Acciones recomendadas', lista: [
        'Adoptar formalmente, desde la alta dirección, una declaración de cero tolerancia y una política de prevención construida con participación de las personas trabajadoras (F-08, art. 2.2.1.8.2.1).',
        'Incluir la violencia, el acoso y las VBG como riesgo psicosocial en la identificación de peligros del SG-SST (F-20, art. 9; F-08, art. 2.2.1.8.2.4).',
        'Definir y comunicar el canal de quejas (electrónico, físico y verbal), la persona responsable y las garantías de confidencialidad y no represalia (F-08, arts. 2.2.1.8.2.6 y 2.2.1.8.2.7).',
        'Separar con claridad el procedimiento para acoso laboral (Comité de Convivencia) del procedimiento para acoso sexual y otras VBG (alta dirección o talento humano) (F-06, art. 6, par. 1).',
        'Programar formación anual para todos los niveles, con énfasis en directivos y mandos medios (F-06, art. 12; F-08, art. 2.2.1.8.2.3).',
        'Establecer indicadores y una revisión directiva semestral que alimente la publicación anonimizada exigida (F-04, art. 11, num. 7).'
      ] },
      { titulo: 'Errores frecuentes', lista: [
        'Reducir la prevención a una capacitación anual → integrar formación, política, canales, evaluación de riesgos y monitoreo en un solo ciclo de gestión (F-22).',
        'Asumir que la ausencia de quejas significa ausencia de violencia → contrastar con diagnósticos periódicos, batería de riesgo psicosocial y espacios de escucha (F-09; F-12).',
        'Remitir quejas de acoso sexual al Comité de Convivencia Laboral → recordar que ese comité no es competente para acoso sexual y definir el procedimiento propio (F-06, art. 6, par. 1).',
        'Limitar la política a las personas con contrato laboral → cubrir a contratistas, aprendices, personas voluntarias y en búsqueda de empleo, y las conductas de terceros (F-05, art. 18; F-20, art. 2).',
        'Afirmar que la organización no investiga → el empleador tiene competencia y deber de investigar internamente con debida diligencia dentro de su ámbito, sin sustituir a las autoridades (F-04, art. 11; F-08, art. 2.2.1.8.3.1).',
        'Olvidar los espacios digitales → incluir chats, correos, redes y plataformas de trabajo en el alcance de la política (F-05, art. 18).'
      ] },
      { titulo: 'Herramienta o lista de verificación', lista: [
        '☐ Existe una declaración de cero tolerancia firmada por la máxima autoridad de la organización.',
        '☐ La política de prevención está escrita, fue construida con participación y se encuentra publicada en un lugar accesible.',
        '☐ La política está reflejada en el reglamento interno de trabajo y en los contratos (F-04, art. 11; F-08, art. 2.2.1.8.2.2).',
        '☐ La identificación de peligros del SG-SST incluye violencia, acoso y VBG como riesgo psicosocial.',
        '☐ Hay un canal de quejas electrónico, físico y verbal, con responsable designada y conocido por el personal.',
        '☐ El procedimiento para acoso sexual es distinto del procedimiento del Comité de Convivencia Laboral.',
        '☐ Existe un plan de formación anual con cobertura de dirección, mandos medios, colaboradores y comités.',
        '☐ Se cuenta con indicadores definidos, línea base y una fecha de revisión directiva.',
        '☐ Se publica semestralmente la información anonimizada de quejas y sanciones y se remite al SIVIGE.',
        '☐ La organización tiene un directorio verificado de instancias competentes para remitir cuando corresponda.'
      ] }
    ],
    referencias: ['F-04', 'F-05', 'F-06', 'F-08', 'F-09', 'F-12', 'F-20', 'F-22', 'F-23', 'F-25'],
    citasEnTexto: true,
    revision: { fecha: '2026-11-03', responsable: 'Equipo técnico Turquesa Hub (redacción inicial)' },
    estado: 'en-revision-tecnica', revisionTecnica: 'pendiente', revisionJuridica: 'pendiente', revisionPsicosocial: 'pendiente', referencial: true,
    version: '1.0', autor: 'Equipo técnico Turquesa Hub', fecha: '2026-11-03' },

  // =====================================================================
  // 2. GOBERNANZA
  // =====================================================================
  { id: 'rec-gobernanza',
    titulo: 'Compromiso y gobernanza institucional para la prevención',
    categoria: 'Guía práctica', tema: 'Gobernanza',
    descripcion: 'Cómo la alta dirección asume y organiza la prevención de las VBG: liderazgo visible, responsables designados, instancias, recursos y rendición de cuentas.',
    publico: ['organizacion'], tiempoLectura: 13,
    objetivo: 'Al finalizar la lectura, la persona podrá describir los elementos de una gobernanza institucional para la prevención de las VBG, identificar los roles y las instancias que deben existir en una organización colombiana y diferenciar el compromiso declarado del compromiso verificable.',
    secciones: [
      { titulo: 'Conceptos fundamentales', cuerpo: [
        'La gobernanza de la prevención es el conjunto de decisiones, estructuras y responsabilidades mediante las cuales una organización convierte una intención en una práctica sostenida. El primero de los Principios para el Empoderamiento de las Mujeres (WEPs) es precisamente el liderazgo de alto nivel para la igualdad de género; el séptimo exige medir y publicar los avances (F-24, principios 1 y 7). Entre ambos está todo lo que hace que un compromiso sea creíble: quién decide, quién ejecuta, con qué recursos y ante quién se rinde cuentas.',
        'El modelo del PNUD ubica el compromiso como primer componente de la gestión: sin una decisión explícita de la alta dirección, la detección, la acción y el monitoreo quedan a merced de la buena voluntad de personas individuales (F-22). El compromiso no es un gesto simbólico; se expresa en documentos aprobados, cargos con funciones asignadas, presupuesto y tiempo de la dirección dedicado a revisar resultados.',
        'Los sistemas de gestión ofrecen un lenguaje útil para organizar esa gobernanza. La norma ISO 45001 dedica su cláusula de liderazgo a la responsabilidad de la alta dirección sobre la seguridad y la salud en el trabajo, la asignación de roles y la participación de las personas trabajadoras (F-30, cláusula 5); la norma ISO 37301 propone integrar las obligaciones de cumplimiento en una cultura y en un sistema con responsables, canales de reporte e investigación (F-33). Ambas se citan aquí como referencia de buenas prácticas, no como requisitos de certificación.'
      ] },
      { titulo: 'Desarrollo técnico', cuerpo: [
        'En Colombia, la gobernanza tiene un piso normativo. El empleador debe crear una política interna de prevención del acoso sexual, reflejarla en el reglamento interno de trabajo, los contratos, los protocolos y las rutas de atención, y difundirla ampliamente (F-04, art. 11). El Decreto 1040 de 2026 precisa que la política y el protocolo deben ser participativos, contar con responsables y canales confidenciales, publicarse y socializarse, con espacios anuales de formación y actualización (F-08, art. 2.2.1.8.2.1). La participación de sindicatos y grupos de trabajadores en la construcción de estas herramientas fue también señalada por el Ministerio del Trabajo (F-09).',
        'Una gobernanza funcional suele contemplar cuatro niveles. Primero, la alta dirección: aprueba la política, asigna recursos y revisa periódicamente los resultados. Segundo, una persona o área responsable del sistema de prevención (talento humano, SST o una figura designada), que coordina el plan, la formación, los canales y las evidencias. Tercero, las instancias con competencia específica: el Comité de Convivencia Laboral para acoso laboral, con funciones preventivas, orientadoras y conciliadoras (F-06, arts. 3 y 6), y el procedimiento definido por la alta dirección o talento humano para el acoso sexual, que no es competencia del Comité (F-06, art. 6, par. 1). Cuarto, los mandos medios, que son quienes convierten la política en comportamientos cotidianos.',
        'La rendición de cuentas cierra el diseño. La Ley 2365 de 2024 obliga a publicar semestralmente, de forma anonimizada, el número de quejas tramitadas y las sanciones impuestas, y a remitir esa información al SIVIGE (F-04, art. 11, num. 7). Una organización que, además, presenta a su junta o asamblea un informe periódico con indicadores de prevención, demuestra que el compromiso llegó a la estructura de gobierno (F-24, principio 7).'
      ], lista: [
        'Decisión: política aprobada por la máxima autoridad y declaración de cero tolerancia.',
        'Estructura: responsable del sistema, instancias con competencias delimitadas, mandos medios formados.',
        'Recursos: presupuesto, tiempo, acceso a asesoría jurídica y psicosocial.',
        'Rendición de cuentas: indicadores, informe directivo, publicación anonimizada.'
      ] },
      { titulo: 'Aplicación en una organización colombiana', cuerpo: [
        'Las organizaciones sin personal de planta o con equipos pequeños de contratistas enfrentan una dificultad particular: no hay un área de talento humano consolidada ni un Comité de Convivencia Laboral con la conformación prevista para organizaciones mayores. La Resolución 3461 de 2025 contempla conformaciones diferenciadas según el número de trabajadores (F-06, art. 3), y la política de prevención debe cubrir a toda persona vinculada sin importar el tipo de contrato (F-05, art. 18). En estos casos, la gobernanza se concentra en la dirección y en una persona responsable claramente identificada, con apoyo externo cuando sea necesario.',
        'Turquesa Hub ofrece a la organización una estructura para documentar su gobernanza: quién es la persona responsable, qué instancias existen, qué fecha tiene la política y cuándo se revisó. Ese registro es gestión preventiva; la decisión sobre casos concretos, la investigación interna y la remisión a autoridades corresponden al empleador conforme a su protocolo, y las decisiones sancionatorias o judiciales a las autoridades competentes.',
        'Conviene que la política de prevención se armonice con otros instrumentos de gobierno: código de ética, políticas de cumplimiento, reglamento interno de trabajo y SG-SST. La norma ISO 37301 es una referencia útil para esa integración porque trata las obligaciones legales como parte de un sistema con canales y responsables, no como documentos aislados (F-33).'
      ] },
      { titulo: 'Situación práctica', cuerpo: [
        'Una fundación con una directora ejecutiva, cuatro personas contratistas de tiempo parcial y un equipo de voluntariado que cambia cada semestre decide adoptar una política de prevención de VBG. La directora redacta el documento una tarde, lo firma y lo envía por correo. Seis meses después, una persona voluntaria pregunta a quién debe acudir ante un comentario incómodo de un aliado externo durante una actividad; nadie recuerda la política ni sabe quién es la persona responsable.'
      ], lista: [
        '¿Qué elementos de la gobernanza faltaron en el proceso de adopción de la política (participación, responsable, difusión, revisión)?',
        '¿Qué significa que la política sea participativa en una organización de este tamaño (F-08, art. 2.2.1.8.2.1)?',
        '¿Cómo cubrir al voluntariado y las conductas de aliados externos en el alcance (F-05, art. 18)?',
        '¿Qué evidencia mínima permitiría a la directora demostrar que el compromiso es real y no solamente declarado?'
      ] },
      { titulo: 'Acciones recomendadas', lista: [
        'Aprobar la política en la instancia de máxima autoridad (junta, asamblea, gerencia) y dejar constancia en acta.',
        'Designar por escrito una persona responsable del sistema de prevención, con funciones, tiempo asignado y acceso a asesoría.',
        'Construir o actualizar la política y el protocolo con participación de las personas trabajadoras, sindicatos o representantes cuando existan (F-08, art. 2.2.1.8.2.1; F-09).',
        'Delimitar por escrito las competencias: Comité de Convivencia Laboral para acoso laboral; procedimiento de alta dirección o talento humano para acoso sexual (F-06, art. 6, par. 1).',
        'Incluir la prevención de VBG en la agenda directiva al menos dos veces al año, con informe de indicadores (F-24, principio 7).',
        'Garantizar la publicación semestral anonimizada y la remisión al SIVIGE (F-04, art. 11, num. 7).',
        'Integrar la política con el reglamento interno de trabajo, los contratos y el SG-SST (F-08, arts. 2.2.1.8.2.2 y 2.2.1.8.2.4).'
      ] },
      { titulo: 'Errores frecuentes', lista: [
        'Firmar una política sin asignar responsable ni recursos → acompañar la aprobación con una designación formal y un presupuesto, aunque sea modesto.',
        'Delegar toda la prevención en el Comité de Convivencia Laboral → recordar sus funciones limitadas al acoso laboral y definir el procedimiento para acoso sexual (F-06, art. 6, par. 1).',
        'Redactar la política desde la dirección sin consulta → la participación es una exigencia reglamentaria y mejora la apropiación (F-08, art. 2.2.1.8.2.1).',
        'Tratar el tema una vez al año en una jornada de bienestar → llevarlo a la revisión directiva con indicadores (F-22; F-24, principio 7).',
        'Afirmar cumplimiento de normas ISO por haberlas consultado → citarlas como referencia de buenas prácticas, sin declarar conformidad (F-30; F-33).',
        'Excluir a contratistas y voluntariado del alcance → la protección cubre a toda persona sin importar el vínculo (F-05, art. 18).'
      ] },
      { titulo: 'Herramienta o lista de verificación', lista: [
        '☐ La política fue aprobada por la máxima instancia de decisión y existe acta o constancia.',
        '☐ Hay una persona responsable del sistema de prevención designada por escrito, con funciones definidas.',
        '☐ El documento de política identifica las instancias competentes internas y delimita sus funciones.',
        '☐ Se registró la participación de las personas trabajadoras o sus representantes en la construcción de la política y el protocolo.',
        '☐ La política está incorporada al reglamento interno de trabajo y a los modelos de contrato.',
        '☐ Existe presupuesto o asignación de recursos identificable para formación, canales y asesoría.',
        '☐ La agenda directiva incluye al menos una revisión semestral con indicadores.',
        '☐ Se cumple la publicación semestral anonimizada y la remisión al SIVIGE.',
        '☐ La política tiene fecha de aprobación, fecha de próxima revisión y versión.'
      ] }
    ],
    referencias: ['F-04', 'F-05', 'F-06', 'F-08', 'F-09', 'F-22', 'F-24', 'F-30', 'F-33'],
    citasEnTexto: true,
    revision: { fecha: '2026-11-03', responsable: 'Equipo técnico Turquesa Hub (redacción inicial)' },
    estado: 'en-revision-tecnica', revisionTecnica: 'pendiente', revisionJuridica: 'pendiente', revisionPsicosocial: 'no-aplica', referencial: true,
    version: '1.0', autor: 'Equipo técnico Turquesa Hub', fecha: '2026-11-03' },

  // =====================================================================
  // 3. FACTORES DE RIESGO
  // =====================================================================
  { id: 'rec-riesgos',
    titulo: 'Factores organizacionales de riesgo y su identificación',
    categoria: 'Guía práctica', tema: 'Factores de riesgo',
    descripcion: 'Cómo reconocer las condiciones de la organización que aumentan la probabilidad de violencia, acoso y discriminación, y cómo integrarlas a la evaluación de riesgos psicosociales del SG-SST.',
    publico: ['organizacion'], tiempoLectura: 15,
    objetivo: 'Al finalizar la lectura, la persona podrá identificar los factores organizacionales que elevan el riesgo de VBG, acoso y discriminación, relacionarlos con la gestión de riesgos psicosociales del SG-SST y aplicar una matriz de identificación adaptada a su organización.',
    secciones: [
      { titulo: 'Conceptos fundamentales', cuerpo: [
        'Un factor organizacional de riesgo es una condición del trabajo, de su organización o de su contexto social que aumenta la probabilidad de que ocurran violencia, acoso o discriminación, o que dificulta su detección y respuesta. No describe a personas agresoras sino a entornos: dónde se trabaja, con quién, bajo qué jerarquías y con qué grado de supervisión y de aislamiento.',
        'La norma ISO 45003 incluye entre los peligros psicosociales la violencia en el trabajo, el acoso (incluido el relacionado con el sexo, la identidad de género o la orientación sexual), la intimidación y la victimización, junto con factores como la carga de trabajo, el apoyo insuficiente y la cultura organizacional, y propone gestionarlos dentro del mismo sistema de gestión de SST (F-31, Tabla 1). Se cita como directriz de buenas prácticas, no certificable.',
        'El Convenio 190 pide al empleador tener en cuenta la violencia y el acoso, y los riesgos psicosociales asociados, en la gestión de la seguridad y salud en el trabajo, e identificar los peligros y evaluar los riesgos con participación de las personas trabajadoras (F-20, art. 9). La Recomendación 206 orienta esa evaluación hacia los factores que aumentan la probabilidad de violencia, incluidos los derivados de las condiciones de trabajo, la organización del trabajo y las relaciones de poder (F-21, párr. 8). El estado de ratificación del Convenio por Colombia debe verificarse; la Ley 2528 de 2025 lo aprobó.'
      ] },
      { titulo: 'Desarrollo técnico', cuerpo: [
        'En Colombia, la gestión de riesgos psicosociales forma parte del Sistema de Gestión de la Seguridad y Salud en el Trabajo reglamentado en el Decreto 1072 de 2015 (F-11), y su evaluación periódica se realiza con la Batería de instrumentos adoptada por la Resolución 2764 de 2022 (F-12). El Decreto 1040 de 2026 ordena integrar el riesgo de violencia, acoso, VBG y discriminación al SG-SST (F-08, art. 2.2.1.8.2.4), y la Circular 0076 de 2025 del Ministerio del Trabajo recomienda realizar diagnósticos periódicos sobre la prevalencia del acoso sexual (F-09, num. 5.a). La identificación de factores de riesgo es, por tanto, parte de una obligación existente y no una actividad adicional.',
        'Los factores pueden agruparse en seis dimensiones. Espacios: lugares aislados, sin visibilidad, con acceso restringido o sin presencia de otras personas (bodegas, vehículos, zonas de cargue, habitaciones de hotel en viajes de trabajo). Horarios: turnos nocturnos, jornadas extendidas, trabajo en fines de semana con poca supervisión. Jerarquías: concentración de decisiones sobre contratación, horarios, evaluación o permanencia en una sola persona; relaciones de dependencia económica marcadas; ausencia de contrapesos. Contacto con terceros: atención al público, clientes, proveedores, pacientes o aliados externos sobre quienes la organización tiene menor control, pero frente a cuyas conductas también debe proteger (F-05, art. 18). Trabajo remoto: aislamiento, mezcla de espacio doméstico y laboral, menor acceso a canales de apoyo. Comunicaciones digitales: chats de trabajo, redes sociales, mensajería fuera de horario, uso de imágenes; los espacios digitales vinculados al trabajo forman parte del ámbito protegido (F-05, art. 18).',
        'A estas dimensiones se suman factores transversales: predominio de un género en ciertas áreas, tolerancia cultural a comentarios sexualizados, ausencia de canales de queja o desconfianza en ellos, rotación alta y precariedad contractual, y antecedentes de quejas sin respuesta. La identificación no busca etiquetar áreas como peligrosas, sino priorizar dónde concentrar medidas de prevención.',
        'La batería de riesgo psicosocial ofrece datos valiosos sobre liderazgo, relaciones sociales, demandas y control del trabajo (F-12), pero no fue diseñada específicamente para VBG. Por ello conviene complementarla con la matriz de esta guía, con entrevistas o grupos focales con enfoque de género y con la revisión de registros del canal de quejas, siempre en forma agregada y sin exponer a personas.'
      ], lista: [
        'Espacios: aislamiento, baja visibilidad, acceso restringido.',
        'Horarios: nocturnos, extendidos, sin supervisión.',
        'Jerarquías: concentración de poder, dependencia, sin contrapesos.',
        'Terceros: clientes, proveedores, público, aliados.',
        'Trabajo remoto: aislamiento y confusión de espacios.',
        'Comunicaciones digitales: canales fuera de horario, imágenes, grupos informales.'
      ] },
      { titulo: 'Aplicación en una organización colombiana', cuerpo: [
        'Una organización puede integrar la identificación de factores de riesgo de VBG en su ciclo del SG-SST sin crear un proceso separado: en la matriz de identificación de peligros se añaden los factores de esta guía como peligro psicosocial, se valoran con participación del Comité Paritario o Vigía de SST y de las personas trabajadoras (F-20, art. 9), y los controles se registran en el plan de trabajo anual. Cuando la batería psicosocial muestra resultados críticos en dimensiones como relaciones sociales o liderazgo, esas áreas se priorizan para la revisión con enfoque de género (F-12).',
        'Turquesa Hub aporta el componente de gestión preventiva: la organización puede documentar su matriz, su valoración y las acciones derivadas como evidencia de su plan de acción. El tratamiento de situaciones concretas que surjan durante el diagnóstico corresponde al protocolo del empleador (recepción, protección, investigación con debida diligencia, remisión) y, cuando corresponda, a las autoridades competentes; el diagnóstico no debe convertirse en un espacio de denuncia sin garantías.',
        'La información recogida en diagnósticos puede contener datos sensibles. Debe recolectarse con finalidad clara, en forma agregada o anonimizada y con acceso restringido, en el marco del régimen de protección de datos personales (F-03, art. 4).'
      ] },
      { titulo: 'Situación práctica', cuerpo: [
        'Una clínica de mediana complejidad tiene un área de urgencias con turnos de doce horas, en la que el personal de enfermería es mayoritariamente femenino y los médicos de turno concentran la autoridad clínica y la asignación de tareas. Hay un grupo de mensajería del turno, creado informalmente, donde circulan bromas sobre el cuerpo de las compañeras. El SG-SST aplicó la batería psicosocial el año anterior y reportó resultados altos en demandas emocionales y bajos en relaciones sociales, pero el informe no fue analizado con perspectiva de género ni compartido con talento humano.'
      ], lista: [
        '¿Qué dimensiones de la matriz (espacios, horarios, jerarquías, terceros, remoto, digital) están presentes en este caso?',
        '¿Qué señales ofrecía ya el informe de la batería psicosocial y por qué no se tradujeron en acciones (F-12)?',
        '¿El grupo informal de mensajería forma parte del ámbito laboral protegido (F-05, art. 18)?',
        '¿Qué medidas de control podrían registrarse en el plan de trabajo del SG-SST sin esperar a una queja formal?'
      ] },
      { titulo: 'Acciones recomendadas', lista: [
        'Incluir violencia, acoso, VBG y discriminación como peligro psicosocial en la matriz de identificación de peligros del SG-SST (F-08, art. 2.2.1.8.2.4; F-31).',
        'Aplicar la matriz de factores de riesgo de esta guía al menos una vez al año y cada vez que cambien procesos, turnos, sedes o modalidades de trabajo.',
        'Analizar los resultados de la batería de riesgo psicosocial con perspectiva de género y compartirlos con el área responsable de prevención (F-12).',
        'Realizar diagnósticos periódicos con participación de las personas trabajadoras y sus representantes (F-09; F-20, art. 9).',
        'Priorizar controles en los espacios y horarios de mayor aislamiento: visibilidad, acompañamiento, protocolos de viaje y de visita a terceros.',
        'Establecer lineamientos para los canales digitales de trabajo, incluidos los grupos informales, y comunicarlos.',
        'Proteger la información del diagnóstico: finalidad definida, datos agregados, acceso restringido (F-03, art. 4).'
      ] },
      { titulo: 'Errores frecuentes', lista: [
        'Considerar que la batería psicosocial agota el diagnóstico → complementarla con una revisión específica de factores de VBG (F-12; F-31).',
        'Tratar las áreas de riesgo como culpables → la identificación describe entornos y prioriza controles, no sanciona equipos.',
        'Dejar fuera el trabajo con terceros y las visitas externas → la protección frente a clientes y proveedores forma parte del ámbito (F-05, art. 18).',
        'Ignorar los canales digitales informales → incluirlos explícitamente en la política y en la matriz.',
        'Convertir el diagnóstico en recolección de denuncias → remitir cualquier situación concreta al canal y al protocolo con garantías, no al instrumento de diagnóstico.',
        'Guardar resultados con nombres o detalles identificables → usar datos agregados y restringir el acceso (F-03, art. 4).'
      ] },
      { titulo: 'Herramienta o lista de verificación', lista: [
        'Matriz de identificación de factores de riesgo. Para cada fila, registrar: factor observado · áreas o cargos expuestos · nivel estimado (bajo, medio, alto) · control existente · control propuesto · responsable · fecha de revisión.',
        '☐ Espacios: ¿existen lugares de trabajo aislados, sin visibilidad o con acceso restringido donde una persona permanece sola con otra?',
        '☐ Espacios: ¿los viajes de trabajo, alojamientos o vehículos compartidos cuentan con lineamientos de conducta y acompañamiento?',
        '☐ Horarios: ¿hay turnos nocturnos, extendidos o de fin de semana con supervisión reducida?',
        '☐ Jerarquías: ¿una sola persona concentra decisiones sobre contratación, horarios, evaluación o continuidad de otras?',
        '☐ Jerarquías: ¿existen contrapesos (otra instancia que revise decisiones de personal) y canales que no pasen por el jefe directo?',
        '☐ Terceros: ¿el personal atiende público, clientes, proveedores o aliados sin lineamientos ni respaldo ante conductas inapropiadas?',
        '☐ Trabajo remoto: ¿las personas en teletrabajo conocen el canal de queja y tienen contacto regular con alguien distinto de su jefe directo?',
        '☐ Comunicaciones digitales: ¿existen lineamientos sobre grupos de mensajería, horarios de contacto, uso de imágenes y lenguaje?',
        '☐ Transversal: ¿hay áreas con marcado predominio de un género y cultura de comentarios sexualizados normalizados?',
        '☐ Transversal: ¿los resultados de la batería psicosocial muestran dimensiones críticas en liderazgo o relaciones sociales que no se han analizado con enfoque de género?',
        '☐ Transversal: ¿existen quejas o comentarios previos sin respuesta documentada?',
        '☐ La matriz fue valorada con participación de personas trabajadoras y quedó registrada en el SG-SST.'
      ] }
    ],
    referencias: ['F-03', 'F-05', 'F-08', 'F-09', 'F-11', 'F-12', 'F-20', 'F-21', 'F-31'],
    citasEnTexto: true,
    revision: { fecha: '2026-11-03', responsable: 'Equipo técnico Turquesa Hub (redacción inicial)' },
    estado: 'en-revision-tecnica', revisionTecnica: 'pendiente', revisionJuridica: 'pendiente', revisionPsicosocial: 'no-aplica', referencial: true,
    version: '1.0', autor: 'Equipo técnico Turquesa Hub', fecha: '2026-11-03' },

  // =====================================================================
  // 4. SESGOS Y DISCRIMINACIÓN
  // =====================================================================
  { id: 'rec-sesgos',
    titulo: 'Sesgos, estereotipos y discriminación en la gestión del talento',
    categoria: 'Guía práctica', tema: 'Sesgos y discriminación',
    descripcion: 'Cómo los estereotipos de género se traducen en decisiones de selección, promoción y remuneración, qué dice la normativa colombiana sobre no discriminación y cómo revisar los procesos de talento con criterios objetivos.',
    publico: ['organizacion'], tiempoLectura: 13,
    objetivo: 'Al finalizar la lectura, la persona podrá distinguir estereotipo, sesgo y discriminación, reconocer cómo operan en los procesos de talento humano, ubicar el marco normativo colombiano de no discriminación e igualdad y aplicar una lista de verificación a selección, promoción y remuneración.',
    secciones: [
      { titulo: 'Conceptos fundamentales', cuerpo: [
        'Un estereotipo de género es una creencia generalizada sobre cómo son o qué pueden hacer las personas según su género. Un sesgo es la influencia de ese estereotipo, a menudo no consciente, en una percepción o decisión. La discriminación es el resultado: un trato desfavorable o una exclusión basada en el género u otra condición protegida, sin justificación objetiva y razonable. Los tres niveles se encadenan, y por eso la prevención de la discriminación empieza por hacer visibles los estereotipos que la alimentan.',
        'El segundo Principio para el Empoderamiento de las Mujeres pide tratar a todas las personas de manera equitativa en el trabajo, respetar los derechos humanos y rechazar la discriminación (F-24, principio 2). La norma ISO 53800 ofrece directrices para que las organizaciones integren la igualdad de género en su dimensión interna, sus actividades, sus relaciones externas y su comunicación, con un plan de acción y mejora continua (F-32); se cita como referencia de buenas prácticas, no certificable.',
        'La Ley 1257 de 2008 enuncia entre sus principios la no discriminación, la corresponsabilidad, la integralidad y la atención diferenciada (F-02, art. 6), y prevé medidas en el ámbito laboral, reglamentadas parcialmente por el Decreto 4463 de 2011 en materia de reconocimiento del trabajo de las mujeres, igualdad salarial y prevención del acoso (F-02, art. 12; F-10). La discriminación es, además, una de las modalidades de acoso laboral previstas en la Ley 1010 de 2006 cuando se presenta como trato diferenciado por razones de género u otras (F-01, art. 2).'
      ] },
      { titulo: 'Desarrollo técnico', cuerpo: [
        'La Ley 2466 de 2025 incorporó disposiciones expresas de no discriminación en las relaciones de trabajo (F-05, arts. 16 y 17). Una parte del artículo 17 fue afectada por la Sentencia C-081 de 2026 de la Corte Constitucional, por lo que su alcance debe ser verificado por la revisión jurídica de la organización antes de incorporarlo a instrumentos internos (F-05). El Decreto 1040 de 2026 reglamenta estos artículos y trata la discriminación junto con el acoso y la violencia como conductas frente a las cuales el empleador debe contar con política, protocolo y canales (F-08, art. 2.2.1.8.2.1).',
        'En los procesos de talento, los sesgos aparecen en momentos identificables. En la selección: descripciones de cargo con requisitos no relacionados con la función, preguntas de entrevista sobre estado civil, planes de maternidad o cuidado, criterios de ajuste cultural que premian la semejanza con quien entrevista, paneles homogéneos. En la promoción: valoración de la disponibilidad horaria total como mérito, interpretación distinta de la misma conducta según el género (firmeza frente a agresividad), redes informales de patrocinio, evaluaciones de desempeño con criterios no definidos. En la remuneración: negociación individual sin bandas salariales, bonificaciones discrecionales, asignación desigual de tareas visibles y de tareas de apoyo, brechas que se perpetúan al basar el salario de ingreso en el salario anterior.',
        'La respuesta técnica consiste en sustituir juicios globales por criterios definidos de antemano, registrar las decisiones y revisar los resultados agregados. Criterios definidos: perfiles basados en funciones, rúbricas de entrevista, escalas de evaluación con descriptores. Registro: quién decidió, con qué criterios, con qué puntajes. Revisión: distribución por género de candidaturas, contrataciones, promociones y remuneración, analizada periódicamente por la dirección (F-24, principio 7; el enfoque de igualdad en la dimensión interna, F-32).'
      ], lista: [
        'Selección: perfil por funciones, preguntas estandarizadas, panel diverso, registro de puntajes.',
        'Promoción: criterios públicos, evaluación con descriptores, revisión de patrones por género.',
        'Remuneración: bandas salariales, criterios de bonificación, revisión de brechas.'
      ] },
      { titulo: 'Aplicación en una organización colombiana', cuerpo: [
        'Una organización colombiana puede comenzar con una revisión documental: descripciones de cargo, guías de entrevista, formatos de evaluación y política salarial. Luego, con datos propios, construir una tabla simple de distribución por género en cada etapa del ciclo de talento. Este ejercicio no requiere herramientas estadísticas complejas; requiere decisión de mirar los datos y registrar lo encontrado. Los resultados alimentan el plan de acción que Turquesa Hub permite documentar como evidencia de gestión preventiva.',
        'Cuando la revisión revela una situación concreta de trato discriminatorio hacia una persona, la organización debe activar su protocolo (recepción, protección si procede, investigación interna con debida diligencia y enfoque de género, decisión con medidas de reparación y no repetición) conforme al Decreto 1040 de 2026 (F-08, arts. 2.2.1.8.3.1 a 2.2.1.8.3.4 y 2.2.1.8.3.8). Si la conducta encaja en acoso laboral por discriminación, el Comité de Convivencia Laboral tiene funciones preventivas, orientadoras y conciliadoras (F-06, art. 6). Las personas afectadas conservan en todo caso la posibilidad de acudir al Ministerio del Trabajo o a las autoridades judiciales.',
        'La revisión de procesos de talento con enfoque de género también protege a la organización frente a decisiones que puedan ser cuestionadas y mejora la calidad de sus contrataciones, porque amplía la base de talento considerado.'
      ] },
      { titulo: 'Situación práctica', cuerpo: [
        'Una empresa agroindustrial abre una convocatoria para coordinar un equipo de campo. La descripción del cargo exige disponibilidad total, licencia de conducción y, en la práctica, el gerente comenta que busca a alguien que pueda imponerse ante los trabajadores. En la entrevista, a la candidata con mayor experiencia le preguntan cómo organizará el cuidado de sus hijos; al candidato con menor experiencia no le preguntan nada similar. El cargo se asigna al candidato con un salario superior al que tenía la coordinadora anterior, una mujer, por el mismo cargo.'
      ], lista: [
        '¿Qué estereotipos y sesgos se pueden identificar en el perfil, en la entrevista y en la decisión salarial?',
        '¿Cuáles de estas prácticas podrían constituir discriminación según el marco normativo (F-02, art. 6; F-05, arts. 16 y 17)?',
        '¿Qué criterios objetivos debieron definirse antes de abrir la convocatoria?',
        '¿Qué registro habría permitido detectar la brecha salarial antes de la decisión?'
      ] },
      { titulo: 'Acciones recomendadas', lista: [
        'Revisar las descripciones de cargo para eliminar requisitos no relacionados con las funciones y lenguaje con sesgo de género.',
        'Estandarizar las entrevistas con preguntas basadas en competencias y prohibir expresamente preguntas sobre estado civil, maternidad, planes familiares o responsabilidades de cuidado.',
        'Conformar paneles de selección y de promoción con más de una persona y, cuando sea posible, diversos en género.',
        'Adoptar bandas salariales por cargo y criterios públicos de bonificación; no basar el salario de ingreso en el salario anterior de la persona.',
        'Analizar al menos una vez al año la distribución por género de candidaturas, contrataciones, promociones, remuneración y retiros, y presentarla a la dirección (F-24, principio 7; el enfoque de igualdad en la dimensión interna, F-32).',
        'Incluir la no discriminación en la política de prevención y en la formación anual con enfoques diferenciales (F-08, arts. 2.2.1.8.2.1 y 2.2.1.8.2.3).',
        'Someter a revisión jurídica el alcance actual de los artículos 16 y 17 de la Ley 2466 de 2025 antes de incorporarlos a instrumentos internos (F-05).'
      ] },
      { titulo: 'Errores frecuentes', lista: [
        'Confiar en la buena intención de quien decide → los sesgos operan sin intención; se corrigen con criterios y registros, no con confianza.',
        'Evaluar el ajuste cultural como criterio abierto → definir qué comportamientos se esperan y evaluarlos con descriptores.',
        'Premiar la disponibilidad total como mérito → valorar resultados y competencias; la disponibilidad total penaliza a quienes asumen tareas de cuidado.',
        'Negociar salarios caso por caso sin referencia → usar bandas salariales y documentar excepciones.',
        'Reproducir el texto normativo sin verificar su vigencia → parte del artículo 17 de la Ley 2466 de 2025 fue afectada por la Sentencia C-081 de 2026; consultar a la revisión jurídica (F-05).',
        'Tratar una queja de discriminación como un simple malentendido → activar el protocolo con debida diligencia y enfoque de género (F-08, art. 2.2.1.8.3.1).'
      ] },
      { titulo: 'Herramienta o lista de verificación', lista: [
        'Selección:',
        '☐ Las descripciones de cargo enumeran funciones y competencias y no incluyen requisitos de género, edad, apariencia o disponibilidad no justificados.',
        '☐ Las convocatorias se publican por canales que alcanzan a candidaturas diversas.',
        '☐ Existe una guía de entrevista estandarizada con preguntas por competencias y puntaje.',
        '☐ Está prohibido preguntar por estado civil, embarazo, planes de maternidad o paternidad y responsabilidades de cuidado.',
        '☐ Más de una persona participa en la decisión y se registran los puntajes de cada candidatura.',
        'Promoción:',
        '☐ Los criterios de promoción están escritos y son conocidos por todo el personal.',
        '☐ La evaluación de desempeño usa descriptores observables y no juicios globales.',
        '☐ Las oportunidades de formación y los proyectos visibles se asignan con criterios registrados.',
        '☐ Se revisa anualmente la distribución por género de las promociones.',
        'Remuneración:',
        '☐ Existen bandas salariales por cargo o nivel.',
        '☐ El salario de ingreso se fija por la banda del cargo y no por el salario anterior de la persona.',
        '☐ Las bonificaciones y beneficios tienen criterios escritos.',
        '☐ Se calcula y revisa anualmente la brecha de remuneración por género en cargos equivalentes y se presenta a la dirección.',
        '☐ Las conclusiones de la revisión se convierten en acciones del plan de prevención con responsable y fecha.'
      ] }
    ],
    referencias: ['F-01', 'F-02', 'F-05', 'F-06', 'F-08', 'F-10', 'F-24', 'F-32'],
    citasEnTexto: true,
    revision: { fecha: '2026-11-03', responsable: 'Equipo técnico Turquesa Hub (redacción inicial)' },
    estado: 'en-revision-tecnica', revisionTecnica: 'pendiente', revisionJuridica: 'pendiente', revisionPsicosocial: 'no-aplica', referencial: true,
    version: '1.0', autor: 'Equipo técnico Turquesa Hub', fecha: '2026-11-03' },

  // =====================================================================
  // 5. CULTURA Y COMUNICACIÓN
  // =====================================================================
  { id: 'rec-cultura',
    titulo: 'Comunicación y cultura organizacional para entornos de respeto',
    categoria: 'Guía práctica', tema: 'Cultura y comunicación',
    descripcion: 'Cómo las normas no escritas, el lenguaje y la comunicación interna sostienen o transforman la cultura de una organización, y cómo diseñar un lineamiento de comunicación respetuosa.',
    publico: ['organizacion', 'colaborador'], tiempoLectura: 13,
    objetivo: 'Al finalizar la lectura, la persona podrá explicar la relación entre cultura organizacional, normas sociales y VBG, identificar prácticas de comunicación que refuerzan o debilitan el respeto, y adaptar un modelo de lineamiento de comunicación interna y lenguaje respetuoso.',
    secciones: [
      { titulo: 'Conceptos fundamentales', cuerpo: [
        'La cultura organizacional es el conjunto de creencias, prácticas y normas no escritas que indican qué se considera normal, aceptable o gracioso en un lugar de trabajo. Las violencias basadas en género se apoyan en normas sociales que las toleran o minimizan: la idea de que ciertos comentarios son bromas, de que la insistencia es cortejo, de que las mujeres deben aguantar para encajar. Por eso una de las siete estrategias con evidencia que recoge la OMS en RESPECT es la transformación de actitudes, creencias y normas (Transformed attitudes, beliefs and norms), que actúa sobre lo que las personas consideran aceptable y no solamente sobre las conductas visibles (F-25).',
        'La hoja de ruta del PNUD hacia una cultura de cero tolerancia parte de la misma premisa: la política y el protocolo son necesarios, pero la prevención ocurre cuando el respeto se vuelve un criterio de reconocimiento, evaluación y conversación cotidiana (F-22). Los Principios para el Empoderamiento de las Mujeres incluyen el liderazgo de alto nivel y el trato equitativo como bases de esa cultura (F-24, principios 1 y 2).',
        'La comunicación interna es el vehículo más visible de la cultura. Lo que la organización dice en sus carteleras, correos, reuniones y redes, y lo que calla, enseña qué conductas tienen respaldo y cuáles no. El Decreto 1040 de 2026 exige la socialización de la política de prevención y la realización de campañas y capacitación con enfoques diferenciales (F-08, arts. 2.2.1.8.2.1 y 2.2.1.8.2.3), lo que convierte la comunicación en parte de la obligación y no en un complemento.'
      ] },
      { titulo: 'Desarrollo técnico', cuerpo: [
        'Transformar normas implica tres movimientos. Primero, hacer visibles las normas actuales: qué chistes se celebran, qué comentarios sobre el cuerpo pasan sin reacción, quién interrumpe a quién en las reuniones, cómo se habla de las personas ausentes. Segundo, declarar la norma esperada de manera concreta y pública: no basta con pedir respeto; hay que describir qué se espera (nombrar a las personas como piden ser nombradas, no comentar la apariencia, no insistir tras un no) y qué no se tolera. Tercero, sostener la norma con consecuencias coherentes: respuesta oportuna ante transgresiones, reconocimiento de quienes la modelan y silencio cero de la dirección ante conductas inapropiadas.',
        'Las campañas internas son útiles cuando forman parte de una secuencia y no cuando sustituyen el resto. Una campaña eficaz tiene un mensaje concreto, una duración definida, piezas adaptadas a los públicos (planta, oficina, remoto), enfoques diferenciales y un indicador de llegada; una campaña ineficaz es una cartelera genérica con frases abstractas (F-08, art. 2.2.1.8.2.3). En coherencia con el modelo del PNUD, conviene alinear las campañas con el calendario de formación y con los momentos de revisión de la política (criterio técnico de Turquesa Hub; F-22).',
        'El lenguaje respetuoso no se limita a las fórmulas incluyentes. Comprende evitar comentarios sobre el cuerpo, la vida íntima o la apariencia; no usar diminutivos ni apelativos no solicitados; no atribuir características por género; cuidar el humor en canales de trabajo; y aplicar los mismos criterios en los espacios digitales que en los presenciales, dado que forman parte del ámbito laboral protegido (F-05, art. 18). El lineamiento debe ser breve, concreto y aplicable, y evitar desdoblamientos forzados que dificulten la lectura.'
      ], lista: [
        'Visibilizar las normas actuales con observación y escucha.',
        'Declarar la norma esperada en términos de conductas concretas.',
        'Sostenerla con respuesta oportuna, reconocimiento y ejemplo directivo.',
        'Comunicar en secuencia: política, campaña, formación, resultados.'
      ] },
      { titulo: 'Aplicación en una organización colombiana', cuerpo: [
        'En la práctica, muchas organizaciones colombianas tienen culturas de alta cercanía, donde el humor y la informalidad son parte del vínculo. El lineamiento de comunicación no busca eliminar la cercanía sino delimitar lo que daña. Un buen punto de partida es un grupo de trabajo con personas de distintas áreas y niveles que revise ejemplos reales (anonimizados) de comunicación interna y proponga el lineamiento; esa participación es coherente con la exigencia de construcción participativa de los instrumentos de prevención (F-08, art. 2.2.1.8.2.1).',
        'Turquesa Hub acompaña este proceso como gestión preventiva: la organización documenta su lineamiento, sus campañas y sus indicadores de cobertura. Cuando una comunicación concreta constituye una conducta de acoso o discriminación, la respuesta corresponde al protocolo del empleador y, según el caso, al Comité de Convivencia Laboral (acoso laboral) o al procedimiento de alta dirección o talento humano (acoso sexual) (F-06, art. 6).',
        'El liderazgo tiene un peso desproporcionado en la cultura. Un gerente que corrige con respeto un comentario inapropiado en una reunión comunica más que cualquier campaña; uno que se ríe lo anula todo. Por eso la formación a directivos y mandos medios en comunicación respetuosa es una inversión de alto retorno cultural (F-06, art. 12).'
      ] },
      { titulo: 'Situación práctica', cuerpo: [
        'Una empresa de tecnología con equipos híbridos tiene un canal de chat general donde se celebran los cumpleaños. En el cumpleaños de una analista, un compañero publica un comentario sobre su físico acompañado de un emoji, y varias personas reaccionan con risas. La analista no responde. Al día siguiente, su líder le dice en privado que no se lo tome en serio porque el compañero es así con todo el mundo. Semanas después, la empresa lanza una campaña de respeto con carteles en la oficina física, que la mayoría del equipo, en remoto, no ve.'
      ], lista: [
        '¿Qué normas no escritas quedan reveladas en la reacción del grupo y en la respuesta del líder?',
        '¿El comentario en el chat forma parte del ámbito laboral protegido (F-05, art. 18)? ¿Qué debería hacer la organización?',
        '¿Qué características de la campaña la hacen ineficaz para este equipo (F-08, art. 2.2.1.8.2.3)?',
        '¿Qué podría decir el líder, en el momento, para sostener la norma de respeto sin exponer a la analista?'
      ] },
      { titulo: 'Acciones recomendadas', lista: [
        'Elaborar un lineamiento de comunicación interna y lenguaje respetuoso con un grupo participativo y aprobarlo junto con la política de prevención (F-08, art. 2.2.1.8.2.1).',
        'Aplicar el lineamiento a todos los canales, incluidos chats, correos, redes internas y reuniones virtuales (F-05, art. 18).',
        'Formar a directivos y mandos medios en cómo responder en el momento ante comentarios inapropiados (F-06, art. 12).',
        'Diseñar campañas con mensaje concreto, duración, públicos diferenciados, enfoques diferenciales e indicador de llegada (F-08, art. 2.2.1.8.2.3).',
        'Revisar las piezas de comunicación institucional (fotos, cargos, roles representados) para evitar estereotipos de género (F-24, principio 5).',
        'Incluir el respeto como criterio en evaluaciones de desempeño y reconocimientos, y comunicar los resultados agregados de la prevención (recomendación de Turquesa Hub, coherente con F-22).',
        'Socializar la política de prevención en inducción y al menos una vez al año a todo el personal (F-08, art. 2.2.1.8.2.1).'
      ] },
      { titulo: 'Errores frecuentes', lista: [
        'Confundir cultura con campaña → la campaña es una herramienta; la cultura cambia con respuesta coherente y ejemplo directivo (F-25; F-22).',
        'Pedir respeto en abstracto → describir conductas concretas esperadas y no toleradas.',
        'Minimizar con la frase de que la persona es así → esa respuesta de un líder legitima la conducta; la formación debe prepararlo para reaccionar.',
        'Hacer campañas solo en el espacio físico → adaptar las piezas a los públicos remotos y a los canales digitales.',
        'Imponer fórmulas de lenguaje que nadie usa → preferir lineamientos breves y aplicables, sin desdoblamientos forzados.',
        'Dejar que la comunicación institucional reproduzca estereotipos → revisar imágenes y mensajes con enfoque de género (F-32).'
      ] },
      { titulo: 'Herramienta o lista de verificación', lista: [
        'Modelo orientativo de lineamiento de comunicación interna y lenguaje respetuoso (adaptar a cada organización):',
        '1. Propósito: orientar la comunicación interna y externa para que reconozca a todas las personas con dignidad, sin estereotipos ni comentarios que las reduzcan a su cuerpo, su género o su vida privada.',
        '2. Alcance: aplica a toda persona vinculada a la organización, en cualquier modalidad, y a todos los canales presenciales y digitales relacionados con el trabajo (F-05, art. 18).',
        '3. Prácticas esperadas: nombrar a las personas como piden ser nombradas; dirigirse por el nombre o el cargo y no por apelativos; no comentar la apariencia, el cuerpo, la vida íntima ni las decisiones familiares; no atribuir cualidades o tareas por género; cuidar el humor en canales de trabajo; respetar los horarios de contacto; pedir consentimiento antes de compartir imágenes de otras personas.',
        '4. Comunicación institucional: revisar piezas antes de publicarlas para evitar estereotipos en imágenes, roles y lenguaje; representar la diversidad real de la organización.',
        '5. Qué hacer ante una comunicación inapropiada: quien la presencia puede señalarla con respeto; quien la recibe puede acudir al canal de queja sin que ello implique conflicto; la organización responde conforme a su política y protocolo (F-08, art. 2.2.1.8.2.6).',
        '6. Responsable y revisión: persona o área responsable del lineamiento; fecha de aprobación; revisión anual junto con la política de prevención.',
        'Lista de verificación:',
        '☐ El lineamiento existe, fue construido con participación y está publicado.',
        '☐ Cubre explícitamente los canales digitales y los grupos informales de trabajo.',
        '☐ Directivos y mandos medios recibieron formación para responder ante comentarios inapropiados.',
        '☐ Las campañas del último año tienen mensaje concreto, públicos definidos e indicador de llegada.',
        '☐ Las piezas de comunicación institucional fueron revisadas con enfoque de género.',
        '☐ El respeto está incluido como criterio en evaluación o reconocimiento.'
      ] }
    ],
    referencias: ['F-05', 'F-06', 'F-08', 'F-22', 'F-24', 'F-25', 'F-32'],
    citasEnTexto: true,
    revision: { fecha: '2026-11-03', responsable: 'Equipo técnico Turquesa Hub (redacción inicial)' },
    estado: 'en-revision-tecnica', revisionTecnica: 'pendiente', revisionJuridica: 'pendiente', revisionPsicosocial: 'pendiente', referencial: true,
    version: '1.0', autor: 'Equipo técnico Turquesa Hub', fecha: '2026-11-03' },

  // =====================================================================
  // 6. SENSIBILIZACIÓN
  // =====================================================================
  { id: 'rec-sensibilizacion',
    titulo: 'Sensibilización y corresponsabilidad: diseño de procesos formativos',
    categoria: 'Guía práctica', tema: 'Sensibilización',
    descripcion: 'Cómo diseñar procesos de formación y sensibilización en prevención de VBG que cumplan las obligaciones normativas, diferencien públicos y produzcan apropiación verificable, no solamente asistencia.',
    publico: ['organizacion'], tiempoLectura: 14,
    objetivo: 'Al finalizar la lectura, la persona podrá diseñar un plan de formación en prevención de VBG con públicos, contenidos mínimos e indicadores, distinguir sensibilización de capacitación técnica, y aplicar criterios de seguridad y cuidado en los espacios formativos.',
    secciones: [
      { titulo: 'Conceptos fundamentales', cuerpo: [
        'Sensibilizar es generar conciencia y disposición al cambio: ayudar a las personas a reconocer las VBG, a cuestionar los estereotipos que las sostienen y a asumir una parte de la responsabilidad de prevenirlas. Capacitar es desarrollar competencias concretas para un rol: recibir una queja, aplicar un protocolo, responder ante un comentario inapropiado. Un proceso formativo completo combina ambas, con intensidades distintas según el público.',
        'La corresponsabilidad es un principio de la Ley 1257 de 2008 (F-02, art. 6) y una idea central de la prevención organizacional: la dirección define el marco, los mandos medios modelan conductas, las áreas de apoyo garantizan procesos y cada persona cuida el entorno. La formación es el mecanismo que distribuye esa responsabilidad con conocimiento, no con culpa.',
        'El Convenio 190 pide al empleador proporcionar información y formación sobre los peligros y riesgos de violencia y acoso y sobre las medidas de prevención y protección (F-20, art. 9); su estado de ratificación por Colombia debe verificarse. En el plano nacional, la Resolución 3461 de 2025 ordena capacitar a directivos, mandos medios e integrantes del Comité de Convivencia Laboral, con primeros auxilios psicológicos a cargo de la ARL (F-06, art. 12), y el Decreto 1040 de 2026 exige formación anual y campañas y capacitación con enfoques diferenciales (F-08, arts. 2.2.1.8.2.1 y 2.2.1.8.2.3).'
      ] },
      { titulo: 'Desarrollo técnico', cuerpo: [
        'Un plan de formación se construye a partir de cuatro públicos con necesidades diferentes. La dirección necesita comprender el marco normativo, su responsabilidad de liderazgo y de decisión, el caso de negocio y los indicadores (F-22; F-24, principio 1). Los mandos medios necesitan, además, herramientas de intervención inmediata: cómo responder ante un comentario, cómo recibir una preocupación sin investigar por su cuenta, a quién remitir. Los colaboradores necesitan reconocer las conductas, conocer sus derechos, los canales y las garantías de confidencialidad y no represalia (F-08, arts. 2.2.1.8.2.6 y 2.2.1.8.2.7). Las personas de comités y responsables del canal necesitan capacitación técnica en competencias, procedimiento, confidencialidad y orientación segura, con claridad sobre los límites: el Comité de Convivencia Laboral no es competente para acoso sexual (F-06, art. 6, par. 1).',
        'Los contenidos mínimos comunes incluyen: concepto y formas de VBG, violencia y acoso en el mundo del trabajo (F-20, art. 1; F-05, art. 18); diferencias entre acoso laboral, acoso sexual, discriminación y otras VBG; estereotipos y sesgos; política, protocolo y canal de la organización; derechos de las personas afectadas (intimidad, confidencialidad, no revictimización) (F-04, art. 5); instancias competentes internas y externas; y corresponsabilidad. Los enfoques diferenciales (género, orientación sexual e identidad de género, discapacidad, etnia, edad, condición migratoria) deben atravesar los contenidos y los ejemplos (F-08, art. 2.2.1.8.2.3).',
        'El diseño pedagógico importa tanto como el contenido. Las sesiones deben usar situaciones ficticias contextualizadas al sector, actividades de análisis y no testimonios personales; la formación no es un espacio terapéutico ni de denuncia. Debe haber una advertencia inicial sobre el carácter de los contenidos, la posibilidad de retirarse y la disponibilidad del canal de queja y de apoyo psicosocial, en coherencia con los primeros auxilios psicológicos previstos con la ARL (F-06, art. 12). La modalidad (presencial, virtual sincrónica, autoformación) se elige según el público y se complementa con material de consulta.',
        'Los indicadores distinguen cobertura de apropiación. Cobertura: proporción de personas de cada público que completaron la formación en el período. Apropiación: cambio en el conocimiento (evaluación antes y después), capacidad de identificar conductas y canales en situaciones ficticias, y, a mediano plazo, uso del canal, calidad de la respuesta de mandos medios y percepción del clima. Un plan que solo reporta asistencia no demuestra prevención (criterio técnico; el monitoreo es el cuarto paso del modelo de F-22).'
      ], lista: [
        'Públicos: dirección, mandos medios, colaboradores, comités y responsables del canal.',
        'Contenidos mínimos: conceptos, diferencias, sesgos, política y protocolo, derechos, instancias, corresponsabilidad.',
        'Pedagogía: situaciones ficticias, enfoques diferenciales, cuidado, sin testimonios personales.',
        'Indicadores: cobertura por público y apropiación verificable.'
      ] },
      { titulo: 'Aplicación en una organización colombiana', cuerpo: [
        'La obligación de formación anual (F-08, art. 2.2.1.8.2.1) se cumple mejor con un calendario que con jornadas aisladas: inducción para personas nuevas, un módulo anual para todo el personal, sesiones específicas para mandos medios y comités, y refuerzos breves alineados con las campañas de comunicación. La ARL es un aliado para los contenidos de primeros auxilios psicológicos y para recursos de capacitación (F-06, art. 12).',
        'Turquesa Hub ofrece módulos formativos, situaciones de análisis y registro de cobertura como parte de la gestión preventiva. La organización decide qué públicos cursan qué módulos, complementa con sus propios contenidos (política, protocolo, directorio) y conserva las evidencias de cobertura y evaluación. Lo que surja en una formación sobre una situación concreta debe canalizarse al protocolo del empleador, no resolverse en el aula.',
        'En organizaciones con personal rotativo, contratistas o voluntariado, el plan debe prever formación corta y frecuente, accesible desde dispositivos móviles, y registro individual de cobertura aunque el vínculo sea breve. La protección normativa alcanza a estas personas (F-05, art. 18) y la formación es la forma de hacerla efectiva.'
      ] },
      { titulo: 'Situación práctica', cuerpo: [
        'Una empresa manufacturera con doscientas personas realiza cada año una charla de dos horas sobre acoso laboral en el auditorio, a la que asisten en su mayoría personas de oficina; el personal de planta, que trabaja por turnos, rara vez puede ir. La charla no distingue acoso laboral de acoso sexual ni menciona el canal de queja. Los supervisores de planta, cuando reciben una preocupación, suelen hablar con ambas personas para arreglar las cosas. El informe anual reporta cumplimiento de la capacitación con base en las listas de asistencia.'
      ], lista: [
        '¿Qué públicos quedan sin cobertura real y por qué el indicador de asistencia no lo muestra?',
        '¿Qué contenidos mínimos faltan en la charla (diferencias entre conductas, canal, derechos)?',
        '¿Qué riesgo implica que los supervisores confronten a ambas personas, y qué formación específica necesitan (F-09; F-06, art. 12)?',
        '¿Cómo rediseñaría el plan para distinguir cobertura de apropiación?'
      ] },
      { titulo: 'Acciones recomendadas', lista: [
        'Elaborar un plan anual de formación con públicos, contenidos, modalidades, calendario, responsables e indicadores, aprobado por la dirección (F-08, art. 2.2.1.8.2.1).',
        'Garantizar formación específica a directivos, mandos medios e integrantes del Comité de Convivencia Laboral y de los procedimientos de acoso sexual (F-06, art. 12).',
        'Diseñar las sesiones con situaciones ficticias del sector, enfoques diferenciales y reglas de cuidado; nunca pedir testimonios personales de violencia.',
        'Incluir en toda sesión la política, el canal de queja, las garantías de confidencialidad y no represalia y el directorio de instancias competentes (F-08, arts. 2.2.1.8.2.6 y 2.2.1.8.2.7).',
        'Formar a los mandos medios en recibir sin investigar por cuenta propia ni confrontar a las partes, y en remitir al canal (F-09).',
        'Adaptar modalidades y horarios a personal de turnos, remoto, contratista y voluntario.',
        'Medir cobertura por público y apropiación con evaluación antes y después; registrar evidencias y presentar resultados a la dirección (F-22).'
      ] },
      { titulo: 'Errores frecuentes', lista: [
        'Una charla anual para todos → plan diferenciado por públicos con formación específica a mandos medios y comités (F-06, art. 12).',
        'Reportar asistencia como cumplimiento → medir cobertura por público y apropiación (criterio técnico; F-22, paso 4).',
        'Mezclar acoso laboral, acoso sexual y discriminación como si fueran lo mismo → enseñar las diferencias y las instancias competentes de cada uno (F-06, art. 6, par. 1).',
        'Abrir espacios de testimonio en la formación → usar situaciones ficticias y remitir cualquier situación real al canal con garantías.',
        'Formar a quienes pueden asistir en horario de oficina → adaptar modalidades a turnos y trabajo remoto (F-05, art. 18).',
        'Preparar a los supervisores para mediar entre las partes → formarlos en recibir, proteger y remitir; la confrontación entre víctima y presunto agresor debe evitarse (F-09).'
      ] },
      { titulo: 'Herramienta o lista de verificación', lista: [
        'Plan de formación tipo (adaptar duración y modalidad):',
        'Dirección · contenidos: marco normativo y obligaciones del empleador (F-04, art. 11; F-05, art. 18; F-08), liderazgo y gobernanza, caso de negocio, indicadores y publicación anonimizada · modalidad: sesión ejecutiva anual · indicador: 100 % de la dirección formada; decisiones registradas en acta.',
        'Mandos medios · contenidos: reconocer conductas, responder en el momento, recibir una preocupación sin investigar ni confrontar, remitir al canal, no represalias, lenguaje respetuoso · modalidad: taller anual con casos y refuerzo semestral · indicador: cobertura por área; evaluación práctica con situaciones ficticias.',
        'Colaboradores · contenidos: concepto y formas de VBG, diferencias entre conductas, estereotipos, política y canal, derechos y garantías, instancias competentes, corresponsabilidad · modalidad: inducción más módulo anual, con versión para turnos y remoto · indicador: cobertura por tipo de vínculo; evaluación antes y después.',
        'Comité de Convivencia y responsables del canal · contenidos: competencias y límites (F-06, art. 6), procedimiento y plazos, confidencialidad, orientación segura, protección de datos, primeros auxilios psicológicos con la ARL (F-06, art. 12) · modalidad: capacitación técnica al inicio del período y actualización anual · indicador: 100 % de integrantes certificados; registro de actualización.',
        'Lista de verificación:',
        '☐ Existe un plan anual de formación aprobado con públicos, contenidos, calendario e indicadores.',
        '☐ Directivos, mandos medios y comités recibieron formación específica en el período.',
        '☐ Toda sesión presenta la política, el canal, las garantías y el directorio de instancias.',
        '☐ Las sesiones usan situaciones ficticias y tienen reglas de cuidado explícitas.',
        '☐ Los contenidos incorporan enfoques diferenciales.',
        '☐ Se mide cobertura por público y tipo de vínculo, incluidos contratistas y voluntariado.',
        '☐ Se mide apropiación con evaluación antes y después o ejercicios prácticos.',
        '☐ Las evidencias (programas, listas, evaluaciones) se conservan sin datos sensibles innecesarios.',
        '☐ Los resultados se presentan a la dirección y alimentan el plan del siguiente año.'
      ] }
    ],
    referencias: ['F-02', 'F-04', 'F-05', 'F-06', 'F-08', 'F-09', 'F-20', 'F-22', 'F-24', 'F-25'],
    citasEnTexto: true,
    revision: { fecha: '2026-11-03', responsable: 'Equipo técnico Turquesa Hub (redacción inicial)' },
    estado: 'en-revision-tecnica', revisionTecnica: 'pendiente', revisionJuridica: 'pendiente', revisionPsicosocial: 'pendiente', referencial: true,
    version: '1.0', autor: 'Equipo técnico Turquesa Hub', fecha: '2026-11-03' },

  // =====================================================================
  // 7. INDICADORES Y MEJORA CONTINUA
  // =====================================================================
  { id: 'rec-indicadores',
    titulo: 'Indicadores, evidencias y mejora continua',
    categoria: 'Guía práctica', tema: 'Indicadores y mejora continua',
    descripcion: 'Cómo medir la gestión preventiva con indicadores verificables, distinguir lo declarado de lo evidenciado y usar el ciclo de mejora continua para avanzar entre un diagnóstico y el siguiente.',
    publico: ['organizacion'], tiempoLectura: 14,
    objetivo: 'Al finalizar la lectura, la persona podrá definir indicadores de gestión preventiva con sus componentes, distinguir un cumplimiento declarado de uno verificado con evidencia, organizar el monitoreo en un ciclo de mejora continua y preparar la publicación semestral anonimizada exigida por la normativa.',
    secciones: [
      { titulo: 'Conceptos fundamentales', cuerpo: [
        'El monitoreo es el cuarto componente del modelo de gestión propuesto por el PNUD: sin medición, el compromiso no puede demostrarse ni corregirse (F-22). El séptimo Principio para el Empoderamiento de las Mujeres lo formula como medir y publicar los avances (F-24, principio 7). Medir no es un ejercicio burocrático; es la forma en que la organización aprende si lo que hace produce el efecto que busca.',
        'Un indicador es una medida definida de antemano que permite comparar una situación en dos momentos o con una meta. Para ser útil necesita nombre, fórmula, línea base, meta, fuente de datos, periodicidad y responsable. Un indicador sin fórmula se interpreta de manera distinta cada vez; uno sin fuente no puede verificarse; uno sin responsable no se calcula.',
        'La distinción central de esta guía es entre lo declarado y lo verificado con evidencia. Una organización declara que tiene política de prevención; verifica cuando muestra el documento aprobado, con fecha, versión y constancia de publicación. Declara que formó a su personal; verifica cuando presenta el programa, los registros de cobertura por público y los resultados de evaluación. En Turquesa Hub, el diagnóstico registra ambas cosas por separado, porque solo lo verificado sustenta el nivel de madurez.',
        'El ciclo de mejora continua Planificar-Hacer-Verificar-Actuar (PHVA), que organiza los sistemas de gestión como el descrito en la norma ISO 45001, ofrece una secuencia conocida: planificar con base en el diagnóstico, ejecutar el plan, verificar con indicadores y evidencias (evaluación del desempeño) y actuar sobre lo encontrado (mejora) (F-30, cláusulas 9 y 10). Se cita como referencia de buenas prácticas y no implica cumplimiento de la norma.'
      ] },
      { titulo: 'Desarrollo técnico', cuerpo: [
        'Los indicadores de prevención se organizan en tres niveles. Indicadores de estructura: existencia y vigencia de política, protocolo, canal, responsables, directorio; son binarios o de fecha y se verifican con documentos. Indicadores de proceso: cobertura de formación por público, campañas realizadas, revisiones directivas efectuadas, diagnósticos aplicados, tiempos de respuesta del canal; se verifican con registros. Indicadores de resultado: conocimiento del canal, percepción de seguridad y respeto, uso del canal, recurrencia de situaciones, cumplimiento de medidas; se verifican con encuestas anonimizadas y registros agregados.',
        'El uso del canal exige una lectura cuidadosa. Un aumento de quejas tras una campaña o una formación suele indicar mayor confianza y conocimiento, no mayor violencia; una ausencia total de quejas en una organización grande merece más preguntas que celebración. Por eso los indicadores de resultado se leen en conjunto y con series de tiempo, nunca de forma aislada (criterio técnico del equipo redactor, coherente con el componente de monitoreo de F-22).',
        'La normativa fija un indicador obligatorio: la Ley 2365 de 2024 ordena publicar semestralmente, por canales físicos o electrónicos, el número de quejas tramitadas y las sanciones impuestas en materia de acoso sexual, de manera anonimizada, y remitir esa información al SIVIGE dentro de los plazos previstos (F-04, art. 11, num. 7). El Decreto 1040 de 2026 exige que el protocolo prevea la recopilación y el reporte estadístico de los casos atendidos, respetando la protección de datos y el anonimato (F-08, art. 2.2.1.8.2.1, num. 8). Anonimizar significa que ninguna persona pueda identificarse a partir de la información publicada, lo que en organizaciones pequeñas puede exigir agregar categorías o períodos; el tratamiento de estos datos se rige por el régimen de protección de datos personales (F-03, art. 4).',
        'Las evidencias deben ser proporcionadas: suficientes para verificar y mínimas en datos personales. Un acta de aprobación, un registro de cobertura con número de personas por público, un informe de campaña, una encuesta agregada son evidencias adecuadas; una lista con nombres de personas que presentaron quejas no lo es. Turquesa Hub permite documentar las evidencias de gestión preventiva; no almacena información de casos ni de víctimas.'
      ], lista: [
        'Estructura: existe y está vigente (documentos).',
        'Proceso: se hizo y con qué cobertura (registros).',
        'Resultado: qué cambió (encuestas agregadas, series de tiempo).',
        'Obligatorio: publicación semestral anonimizada y remisión al SIVIGE.'
      ] },
      { titulo: 'Aplicación en una organización colombiana', cuerpo: [
        'Un ciclo práctico para una organización colombiana puede organizarse así. Planificar: el diagnóstico de capacidades (por ejemplo, el instrumento de Turquesa Hub) establece la línea base y el plan de acción define metas por indicador. Hacer: se ejecutan las acciones con responsables y fechas. Verificar: cada semestre se calculan los indicadores, se reúnen las evidencias y se prepara la publicación anonimizada (F-04, art. 11, num. 7). Actuar: la dirección revisa resultados, ajusta el plan y actualiza la política y el protocolo, en coherencia con los espacios anuales de formación y actualización previstos reglamentariamente (F-08, art. 2.2.1.8.2.1).',
        'Para las organizaciones que ya cuentan con SG-SST, los indicadores de prevención de VBG pueden integrarse a los indicadores del sistema y a su revisión por la alta dirección, en coherencia con la integración del riesgo psicosocial (F-08, art. 2.2.1.8.2.4; F-30, cláusula 9). Esto evita informes paralelos y asegura que el tema llegue a la instancia que decide.',
        'La mejora continua implica aceptar que el primer diagnóstico mostrará vacíos. Un nivel inicial bajo, documentado con honestidad, es un mejor punto de partida que un nivel alto declarado sin evidencias; la trayectoria entre diagnósticos es el indicador más valioso de la gestión.'
      ] },
      { titulo: 'Situación práctica', cuerpo: [
        'Una cooperativa de servicios con ochenta personas presenta a su consejo de administración un informe que afirma: política adoptada, personal capacitado, cero quejas en el año. Al pedir evidencias, la responsable encuentra que la política es un borrador sin fecha de aprobación, la capacitación fue una charla a la que asistieron treinta personas sin registro de cargos, y el canal de queja es el correo personal de la gerente, que nadie usa. No se ha publicado ninguna información semestral ni se ha remitido al SIVIGE.'
      ], lista: [
        '¿Qué afirmaciones del informe son declaradas y cuáles podrían verificarse con evidencia?',
        '¿Qué indicadores de estructura, proceso y resultado permitirían describir con exactitud la situación?',
        '¿Cómo interpretar las cero quejas a la luz del diseño del canal?',
        '¿Qué obligación de publicación se está incumpliendo y qué datos mínimos se requerirían para cumplirla de forma anonimizada (F-04, art. 11, num. 7)?'
      ] },
      { titulo: 'Acciones recomendadas', lista: [
        'Definir una ficha por indicador con nombre, fórmula, línea base, meta, fuente, periodicidad y responsable, y aprobarla con el plan de acción.',
        'Separar en todos los registros lo declarado de lo verificado con evidencia, y conservar las evidencias con el mínimo de datos personales (F-03, art. 4).',
        'Calcular los indicadores al menos semestralmente y presentarlos a la dirección en una revisión documentada (F-24, principio 7; F-30, cláusula 9).',
        'Preparar y publicar la información semestral anonimizada sobre quejas tramitadas y sanciones impuestas, y remitirla al SIVIGE en los plazos previstos (F-04, art. 11, num. 7; F-08).',
        'Leer los indicadores de uso del canal en series de tiempo y junto con los de conocimiento y confianza, no de forma aislada (F-22).',
        'Integrar los indicadores de prevención a la revisión por la dirección del SG-SST cuando exista (F-08, art. 2.2.1.8.2.4).',
        'Usar cada diagnóstico como línea base del siguiente ciclo y registrar la trayectoria.'
      ] },
      { titulo: 'Errores frecuentes', lista: [
        'Reportar cero quejas como logro → analizar el diseño y la confianza en el canal antes de interpretar el dato.',
        'Indicadores sin fórmula ni fuente → completar la ficha de cada indicador antes de empezar a medir.',
        'Confundir asistencia con cobertura → medir cobertura por público y tipo de vínculo, con registro verificable.',
        'Publicar información que permite identificar personas → anonimizar agregando categorías o períodos, conforme al régimen de datos personales (F-03, art. 4; F-04, art. 11, num. 7).',
        'Guardar evidencias con datos sensibles innecesarios → preferir registros agregados y actas.',
        'Afirmar conformidad con la norma ISO 45001 por usar el ciclo PHVA → citarla como referencia de buenas prácticas (F-30).'
      ] },
      { titulo: 'Herramienta o lista de verificación', lista: [
        'Ficha de indicadores propuestos (adaptar metas y periodicidad). Campos: nombre · fórmula · línea base · meta · fuente · periodicidad · responsable.',
        '1. Vigencia de la política y el protocolo · fórmula: política y protocolo aprobados con fecha de actualización dentro de los últimos doce meses (sí/no) · línea base: estado en el diagnóstico inicial · meta: sí · fuente: documento aprobado y acta · periodicidad: anual · responsable: responsable del sistema de prevención (F-08, art. 2.2.1.8.2.1).',
        '2. Cobertura de formación por público · fórmula: personas formadas en el período dividido entre personas del público, por cada público (dirección, mandos medios, colaboradores, comités) · línea base: cobertura del año anterior · meta: definida por público · fuente: registros de formación · periodicidad: semestral · responsable: talento humano (F-06, art. 12; F-08, art. 2.2.1.8.2.3).',
        '3. Apropiación de la formación · fórmula: diferencia entre el puntaje promedio de la evaluación posterior y la anterior · línea base: primera medición · meta: incremento definido · fuente: evaluaciones anonimizadas · periodicidad: por ciclo formativo · responsable: talento humano.',
        '4. Conocimiento del canal de queja · fórmula: proporción de personas que identifican correctamente el canal y la persona responsable en encuesta anonimizada · línea base: primera encuesta · meta: definida · fuente: encuesta anonimizada · periodicidad: anual · responsable: responsable del sistema (F-08, art. 2.2.1.8.2.6).',
        '5. Oportunidad de la respuesta del canal · fórmula: proporción de quejas con primera respuesta y, cuando aplique, medidas de protección dentro del plazo definido en el protocolo y en la normativa · línea base: primera medición · meta: 100 % · fuente: registro agregado del canal, sin datos identificables · periodicidad: semestral · responsable: responsable del protocolo (F-08, art. 2.2.1.8.3.7).',
        '6. Percepción de seguridad y respeto · fórmula: proporción de personas que manifiestan sentirse seguras y respetadas en su entorno de trabajo, en encuesta anonimizada desagregada por género · línea base: primera encuesta · meta: definida · fuente: encuesta de clima o batería psicosocial complementada · periodicidad: anual · responsable: SST y talento humano (F-12).',
        '7. Cumplimiento del plan de acción · fórmula: acciones ejecutadas con evidencia dividido entre acciones planificadas en el período · línea base: cero al inicio del ciclo · meta: definida · fuente: plan de acción y evidencias · periodicidad: semestral · responsable: responsable del sistema.',
        '8. Publicación semestral anonimizada y remisión al SIVIGE · fórmula: publicación realizada y remisión efectuada en el semestre (sí/no), con constancia · línea base: estado inicial · meta: sí en cada semestre · fuente: publicación y constancia de remisión · periodicidad: semestral · responsable: dirección o talento humano (F-04, art. 11, num. 7).',
        'Lista de verificación:',
        '☐ Cada indicador tiene ficha completa y aprobada.',
        '☐ Los registros distinguen explícitamente lo declarado de lo verificado con evidencia.',
        '☐ Las evidencias no contienen datos personales innecesarios.',
        '☐ Existe una revisión directiva semestral documentada con los indicadores.',
        '☐ La publicación semestral anonimizada y la remisión al SIVIGE tienen constancia.',
        '☐ El diagnóstico anterior se usa como línea base del ciclo actual.'
      ] }
    ],
    referencias: ['F-03', 'F-04', 'F-06', 'F-08', 'F-12', 'F-22', 'F-24', 'F-30'],
    citasEnTexto: true,
    revision: { fecha: '2026-11-03', responsable: 'Equipo técnico Turquesa Hub (redacción inicial)' },
    estado: 'en-revision-tecnica', revisionTecnica: 'pendiente', revisionJuridica: 'pendiente', revisionPsicosocial: 'no-aplica', referencial: true,
    version: '1.0', autor: 'Equipo técnico Turquesa Hub', fecha: '2026-11-03' },

  // =====================================================================
  // 8. MODELO ORIENTATIVO DE POLÍTICA
  // =====================================================================
  { id: 'rec-modelo-politica',
    titulo: 'Modelo orientativo de política de prevención de violencias, acoso y discriminación',
    categoria: 'Modelo orientativo', tema: 'Gobernanza',
    descripcion: 'Estructura de secciones de una política interna de prevención de violencias, acoso y discriminación, con el contenido que cada sección debe tener y la razón normativa o técnica que lo sustenta. Requiere adaptación y revisión jurídica por cada organización.',
    publico: ['organizacion'], tiempoLectura: 15,
    objetivo: 'Al finalizar la lectura, la persona podrá reconocer las secciones que debe tener una política interna de prevención de violencias, acoso y discriminación en una organización colombiana, explicar qué contenido corresponde a cada sección y por qué, y preparar un borrador para su adaptación y revisión jurídica.',
    secciones: [
      { titulo: 'Conceptos fundamentales', cuerpo: [
        'Advertencia: este modelo es orientativo. Presenta una estructura y unos contenidos mínimos de referencia; no es un documento listo para adoptar. Cada organización debe adaptarlo a su tamaño, sector, tipos de vínculo y estructura, armonizarlo con su reglamento interno de trabajo y demás instrumentos, y someterlo a revisión jurídica antes de su aprobación. Turquesa Hub no presta asesoría jurídica ni gestiona casos.',
        'Una política de prevención es la declaración formal, aprobada por la máxima autoridad de la organización, que fija el compromiso, el alcance, las definiciones, las conductas no toleradas, los principios, los responsables, los canales y las medidas de prevención y respuesta. Es distinta del protocolo, que describe el procedimiento paso a paso, aunque ambos suelen aprobarse juntos. La política dice qué y por qué; el protocolo dice cómo, quién y en qué plazos.',
        'El marco normativo colombiano exige a los empleadores contar con esta política. La Ley 2365 de 2024 ordena una política interna de prevención del acoso sexual reflejada en el reglamento interno de trabajo, los contratos, los protocolos y las rutas de atención, con amplia difusión (F-04, art. 11). La Ley 2466 de 2025 extiende la exigencia de protocolos, comités y mecanismos a la violencia, el acoso y la discriminación en el mundo del trabajo, conforme a las Leyes 1010, 1257 y 2365 (F-05, art. 18). El Decreto 1040 de 2026 precisa el contenido mínimo, la construcción participativa, el principio de cero tolerancia, la publicación y socialización, y los espacios anuales de formación y actualización (F-08, art. 2.2.1.8.2.1). La Ley 1010 de 2006 ya exigía medidas preventivas de acoso laboral en el reglamento de trabajo y mecanismos internos (F-01, art. 9), y el Convenio 190 de la OIT pide adoptar una política del lugar de trabajo en consulta con las personas trabajadoras (F-20, art. 9); su ratificación por Colombia debe verificarse.'
      ] },
      { titulo: 'Desarrollo técnico', cuerpo: [
        'Sección 1. Declaración de compromiso y principio de cero tolerancia. Qué contiene: una declaración breve de la máxima autoridad que afirma que la organización no tolera la violencia, el acoso ni la discriminación, que protege a quien reporta y que asigna responsables y recursos. Por qué: el compromiso de alto nivel es el primer componente del modelo de gestión (F-22; F-24, principio 1) y el principio de cero tolerancia está previsto reglamentariamente (F-08, art. 2.2.1.8.2.1).',
        'Sección 2. Alcance. Qué contiene: a quiénes protege (toda persona vinculada sin importar el tipo de contrato, incluidas personas en formación, contratistas, voluntarias y en búsqueda de empleo), frente a quiénes (personal de todos los niveles y terceros como clientes, proveedores y aliados) y dónde (lugares de trabajo, desplazamientos, eventos, alojamientos, espacios digitales vinculados al trabajo). Por qué: la Ley 2466 de 2025 define así el ámbito de protección (F-05, art. 18) y la Ley 2365 presume el contexto laboral sin exigir relación laboral (F-04, art. 7).',
        'Sección 3. Definiciones. Qué contiene: violencia y acoso en el mundo del trabajo, violencia y acoso por razón de género, acoso sexual, acoso laboral y sus modalidades, discriminación, otras VBG, represalia, revictimización. Por qué: cada figura tiene una fuente normativa y un procedimiento distintos; definirlas evita que las quejas se canalicen mal (F-20, art. 1; F-04, art. 2; F-01, art. 2; F-05, art. 18; F-02, arts. 2 y 3).',
        'Sección 4. Conductas no toleradas. Qué contiene: una lista ilustrativa, no exhaustiva, de comportamientos físicos, verbales, no verbales y digitales que la organización considera inaceptables, con ejemplos por categoría. Por qué: la Ley 1010 enumera conductas constitutivas de acoso laboral (F-01, art. 7) y las definiciones legales se vuelven comprensibles con ejemplos; la lista debe indicar que no agota las conductas sancionables.',
        'Sección 5. Principios y garantías. Qué contiene: confidencialidad, intimidad, no revictimización, debida diligencia, enfoque de género y enfoques diferenciales, presunción de buena fe de quien reporta, protección frente a represalias, debido proceso para todas las partes, protección de datos personales. Por qué: son derechos de las víctimas y deberes del empleador (F-04, art. 5; F-08, arts. 2.2.1.8.2.7, 2.2.1.8.3.1 a 2.2.1.8.3.4 (2.º)) y principios de la Ley 1257 (F-02, art. 6).',
        'Sección 6. Responsables e instancias. Qué contiene: la persona o área responsable del sistema de prevención; el Comité de Convivencia Laboral con sus funciones preventivas, orientadoras y conciliadoras frente al acoso laboral; la instancia definida por la alta dirección o talento humano para el acoso sexual, que no es competencia del Comité; la relación con el SG-SST y la ARL. Por qué: la delimitación de competencias está prevista en la Resolución 3461 de 2025 (F-06, arts. 3, 6 y 6 par. 1) y la designación de responsables en el Decreto 1040 de 2026 (F-08, art. 2.2.1.8.2.1).',
        'Sección 7. Canales de queja y orientación. Qué contiene: canales electrónicos, físicos y verbales, con responsable, horario, garantías de confidencialidad y lo que la persona puede esperar; posibilidad de reportar sin ser la persona afectada; aclaración de que la queja interna no es requisito para acudir a las autoridades. Por qué: el canal por medios electrónicos, físicos o verbales está previsto en la Ley 2365 y el Decreto 1040 (F-04, art. 15; F-08, art. 2.2.1.8.2.6).',
        'Sección 8. Medidas de prevención. Qué contiene: identificación de factores de riesgo e integración al SG-SST, formación anual por públicos, campañas con enfoques diferenciales, lineamiento de comunicación respetuosa, revisión de procesos de talento con criterios de no discriminación. Por qué: son obligaciones reglamentarias (F-08, arts. 2.2.1.8.2.3 y 2.2.1.8.2.4) y componentes del modelo de gestión (F-22).',
        'Sección 9. Respuesta institucional y remisión. Qué contiene: enunciado de las etapas de la ruta (orientación, recepción, medidas de protección inmediatas sin exigir prueba previa, investigación interna con debida diligencia, decisión con medidas de reparación y no repetición, cierre), con remisión al protocolo para los detalles; obligación de informar la facultad de acudir a la Fiscalía y de remitir a la autoridad competente a petición de la persona; competencia de la inspección del trabajo cuando el presunto acosador es superior jerárquico; articulación con la ARL para atención emocional; directorio de instancias competentes. Por qué: la Ley 2365 fija las obligaciones de protección, información y remisión (F-04, arts. 11 y 13) y el Decreto 1040 desarrolla la ruta y las garantías (F-08, arts. 2.2.1.8.2.1, 2.2.1.8.2.5, 2.2.1.8.3.7, 2.2.1.8.3.8 y 2.2.1.8.3.10).',
        'Sección 10. Protección frente a represalias y estabilidad. Qué contiene: prohibición expresa de represalias contra quien reporta, declara o acompaña, y referencia a las garantías de estabilidad previstas en la ley para víctimas de acoso sexual. Por qué: la protección frente a represalias está prevista en la Ley 2365 y el Decreto 1040 (F-04, art. 14; F-08, art. 2.2.1.8.2.7; F-20, art. 10).',
        'Sección 11. Tratamiento de la información y estadísticas. Qué contiene: régimen de confidencialidad y protección de datos aplicable a quejas, investigaciones y evidencias; compromiso de publicación semestral anonimizada del número de quejas tramitadas y sanciones impuestas y de remisión al SIVIGE. Por qué: es una obligación legal (F-04, art. 11, num. 7; F-08) sujeta al régimen de datos personales (F-03, arts. 4 a 6).',
        'Sección 12. Difusión, formación, vigencia y actualización. Qué contiene: cómo se publica y socializa la política (inducción, reglamento, contratos, canales internos), compromiso de formación anual, fecha de aprobación, versión, responsable de la actualización y revisión al menos anual con participación de las personas trabajadoras. Por qué: la difusión y la incorporación al reglamento y los contratos, así como los espacios anuales de formación y actualización, están previstos en la ley y el reglamento (F-04, art. 11; F-08, arts. 2.2.1.8.2.1 y 2.2.1.8.2.2).'
      ] },
      { titulo: 'Aplicación en una organización colombiana', cuerpo: [
        'El proceso recomendado para adoptar la política tiene cinco pasos. Primero, conformar un grupo de trabajo con representación de la dirección, talento humano o SST, el Comité de Convivencia Laboral, sindicatos o representantes cuando existan y personas de distintas áreas y géneros, para cumplir la exigencia de construcción participativa (F-08, art. 2.2.1.8.2.1; F-09). Segundo, redactar el borrador a partir de esta estructura, con ejemplos y lenguaje adaptados al sector. Tercero, someterlo a revisión jurídica, que verifique la vigencia de las normas citadas, la armonización con el reglamento interno de trabajo y la coherencia con el protocolo. Cuarto, aprobarlo en la máxima instancia con constancia en acta. Quinto, publicarlo, incorporarlo a contratos y reglamento, socializarlo y programar su revisión.',
        'Turquesa Hub permite a la organización registrar la existencia, fecha y versión de la política como evidencia de gestión preventiva y usar los módulos formativos para su socialización. La aplicación de la política a situaciones concretas corresponde al empleador conforme a su protocolo y, cuando corresponda, a las autoridades competentes.',
        'En organizaciones pequeñas, la política puede ser breve si conserva las doce secciones en forma sintética; lo importante es que cada sección exista, tenga responsable y pueda verificarse.'
      ] },
      { titulo: 'Situación práctica', cuerpo: [
        'Una empresa de alimentos con sesenta personas descarga de internet una política de prevención de acoso de otro país, cambia el nombre de la empresa y la publica en la cartelera. La política define el acoso sexual con una norma extranjera, asigna todas las quejas al Comité de Convivencia Laboral, no menciona a los contratistas de reparto ni a los clientes, y no dice cómo ni a quién presentar una queja. Un año después, un contratista de reparto reporta a un supervisor que un cliente lo acosa en las entregas; el supervisor responde que la política no lo cubre.'
      ], lista: [
        '¿Qué secciones del modelo están ausentes o mal resueltas en esa política?',
        '¿Por qué es un error asignar las quejas de acoso sexual al Comité de Convivencia Laboral (F-06, art. 6, par. 1)?',
        '¿El contratista de reparto y el cliente están dentro del alcance que exige la normativa colombiana (F-05, art. 18)?',
        '¿Qué habría cambiado si la política se hubiera construido con participación y revisión jurídica?'
      ] },
      { titulo: 'Acciones recomendadas', lista: [
        'Usar este modelo como estructura, no como texto final; redactar cada sección con el lenguaje y los ejemplos de la organización.',
        'Conformar un grupo participativo para la redacción y dejar constancia de su trabajo (F-08, art. 2.2.1.8.2.1; F-09).',
        'Someter el borrador a revisión jurídica para verificar la vigencia de las normas, incluida la situación de las disposiciones afectadas por decisiones de constitucionalidad, y la armonización con el reglamento interno de trabajo.',
        'Aprobar la política en la máxima instancia y registrarla en acta con fecha y versión.',
        'Incorporarla al reglamento interno de trabajo y a los modelos de contrato, y publicarla por canales accesibles a todo el personal, incluido el remoto (F-04, art. 11; F-08, art. 2.2.1.8.2.2).',
        'Aprobar junto con la política un protocolo que desarrolle la ruta con plazos, responsables y garantías (F-08, art. 2.2.1.8.2.1).',
        'Programar la revisión anual de la política y del protocolo y la formación anual sobre su contenido.'
      ] },
      { titulo: 'Errores frecuentes', lista: [
        'Adoptar un modelo sin adaptarlo ni revisarlo jurídicamente → toda política requiere adaptación y revisión jurídica previa a su aprobación.',
        'Limitar el alcance a personas con contrato laboral → cubrir a toda persona vinculada y las conductas de terceros (F-05, art. 18).',
        'Asignar al Comité de Convivencia Laboral las quejas de acoso sexual → definir una instancia distinta conforme a la Ley 2365 (F-06, art. 6, par. 1).',
        'Confundir política con protocolo → la política fija el marco; el protocolo detalla el procedimiento; ambos deben existir y ser coherentes.',
        'Omitir los espacios digitales → incluirlos expresamente en el alcance (F-05, art. 18).',
        'Publicar una vez y olvidar → programar difusión en inducción, formación anual y revisión anual (F-08, art. 2.2.1.8.2.1).',
        'Describir la respuesta institucional como simple orientación → el empleador tiene deberes de protección, investigación interna con debida diligencia, decisión y remisión dentro de su competencia (F-04, art. 11; F-08, art. 2.2.1.8.3.1).'
      ] },
      { titulo: 'Herramienta o lista de verificación', lista: [
        '☐ Sección 1: declaración de compromiso y cero tolerancia firmada por la máxima autoridad.',
        '☐ Sección 2: alcance que cubre todo tipo de vínculo, terceros y espacios físicos y digitales.',
        '☐ Sección 3: definiciones diferenciadas de acoso laboral, acoso sexual, discriminación, violencia y acoso en el mundo del trabajo y otras VBG, con sus fuentes.',
        '☐ Sección 4: lista ilustrativa de conductas no toleradas, señalada como no exhaustiva.',
        '☐ Sección 5: principios y garantías (confidencialidad, no revictimización, debida diligencia, enfoque de género, no represalias, debido proceso, datos personales).',
        '☐ Sección 6: responsables e instancias con competencias delimitadas; el Comité de Convivencia no recibe acoso sexual.',
        '☐ Sección 7: canales electrónico, físico y verbal con responsable y garantías; aclaración de que la queja interna no es requisito para acudir a autoridades.',
        '☐ Sección 8: medidas de prevención (riesgos en SG-SST, formación anual, campañas, comunicación, talento).',
        '☐ Sección 9: etapas de la respuesta institucional, medidas de protección, remisión, inspección del trabajo cuando corresponda, ARL y directorio de instancias.',
        '☐ Sección 10: prohibición de represalias y referencia a garantías de estabilidad.',
        '☐ Sección 11: tratamiento de datos y compromiso de publicación semestral anonimizada y remisión al SIVIGE.',
        '☐ Sección 12: difusión, incorporación a reglamento y contratos, fecha, versión, responsable y revisión anual.',
        '☐ Constancia de construcción participativa y de revisión jurídica previa a la aprobación.',
        '☐ Protocolo aprobado junto con la política y coherente con ella.'
      ] }
    ],
    referencias: ['F-01', 'F-02', 'F-03', 'F-04', 'F-05', 'F-06', 'F-08', 'F-09', 'F-20', 'F-22', 'F-24'],
    citasEnTexto: true,
    revision: { fecha: '2026-11-03', responsable: 'Equipo técnico Turquesa Hub (redacción inicial)' },
    estado: 'en-revision-tecnica', revisionTecnica: 'pendiente', revisionJuridica: 'pendiente', revisionPsicosocial: 'no-aplica', referencial: true,
    version: '1.0', autor: 'Equipo técnico Turquesa Hub', fecha: '2026-11-03' }
];

TH.data.contenidos = TH.data.contenidos.concat([
/* ============================================================
   TURQUESA HUB · CONTENIDOS DE LA BIBLIOTECA · LOTE B
   Guías de profundidad, fichas normativas y glosario.
   Redacción inicial 2026-11-03. Todo elemento entra en estado
   'en-revision-tecnica'; ninguno se presume aprobado jurídica
   ni psicosocialmente. Los ids F-nn remiten a docs/FUENTES.md.
   ============================================================ */

  // ============================================================
  // 1. VIOLENCIA Y ACOSO SEXUAL EN EL TRABAJO
  // ============================================================
  { id: 'rec-acoso-sexual',
    titulo: 'Violencia y acoso sexual en el trabajo: comprensión y prevención',
    categoria: 'Guía práctica', tema: 'Entornos seguros',
    descripcion: 'Qué se entiende por acoso sexual en el contexto laboral colombiano, en qué ámbitos se presume, qué derechos tiene la persona afectada, qué deberes tiene el empleador y cómo se previene desde la gestión organizacional.',
    publico: ['organizacion', 'colaborador'], tiempoLectura: 11,
    objetivo: 'Ofrecer a las organizaciones y a sus colaboradores una comprensión precisa del acoso sexual en el ámbito laboral conforme a la Ley 2365 de 2024 y a las normas que la desarrollan: reconocer las conductas, identificar el ámbito en que se presumen, conocer los derechos de la persona afectada y los deberes del empleador, y orientar la prevención desde la política, el protocolo y la cultura organizacional. Esta guía es educativa y preventiva; no sustituye la asesoría jurídica ni los procedimientos internos de cada organización.',
    secciones: [
      { titulo: 'Conceptos fundamentales', cuerpo: [
        'La Ley 2365 de 2024 define el acoso sexual como todo acto de persecución, hostigamiento o asedio de carácter o connotación sexual, lasciva o libidinosa, ejercido en relaciones de poder verticales u horizontales, que puede presentarse una o varias veces (F-04, art. 2). Dos elementos merecen atención: la conducta no requiere repetición para configurarse, y la relación de poder puede ser jerárquica o entre pares.',
        'Este concepto se inscribe en una categoría más amplia. La Ley 2466 de 2025 entiende por violencia y acoso en el mundo del trabajo los comportamientos y prácticas inaceptables, o sus amenazas, únicos o repetidos, que causen o puedan causar daño físico, psicológico, sexual o económico, incluida la violencia por razón de género (F-05, art. 18). Esa fórmula recoge la del Convenio 190 de la OIT (F-20, art. 1), aprobado por la Ley 2528 de 2025, cuyo estado de ratificación y entrada en vigor debe verificarse antes de invocarlo como norma vigente (F-07).',
        'El Decreto 1040 de 2026 (D.O. 53.580 del 6 de agosto de 2026) ubica la violencia o el acoso sexual como una modalidad de acoso laboral y precisa que, en materia de violencia sexual, el consentimiento no puede inferirse del silencio, de la falta de resistencia ni de un contexto de coacción (F-08, 2.2.1.8.1.3 y 2.2.1.8.1.6). Desde la gestión empresarial, la guía del PNUD propone abordar el acoso sexual como manifestación de la violencia basada en género mediante un modelo de compromiso, detección, acción y monitoreo (F-22).'
      ] },
      { titulo: 'Desarrollo técnico', cuerpo: [
        'Conductas. La norma no establece una lista taxativa, sino una definición abierta (F-04, art. 2). A título ilustrativo, y sin sustituir la calificación que corresponde a la instancia competente, suelen reconocerse como manifestaciones de acoso sexual las conductas de la lista que sigue.',
        'Ámbito. La ley aplica a quienes sufren y a quienes cometen acoso sexual en el contexto laboral y educativo, y presume que la conducta ocurrió en contexto laboral cuando se realiza en el sitio de trabajo, en eventos relacionados con el trabajo, en comunicaciones digitales vinculadas a la actividad o en los trayectos entre el domicilio y el trabajo, entre otros supuestos; no se exige relación contractual entre las partes, lo que incluye a terceros como clientes, proveedores o contratistas (F-04, art. 7). La Ley 2466 de 2025 confirma la cobertura de los espacios digitales y de la violencia proveniente de terceros (F-05, art. 18).',
        'Derechos de la persona afectada. Trato digno, intimidad, confidencialidad, no revictimización y no confrontación con el presunto agresor (F-04, art. 5). La persona afectada, o un tercero que conozca los hechos, puede solicitar garantías de protección: trato libre de estereotipos; atención emocional y psicológica a cargo de la ARL; traslado de área; teletrabajo cuando exista riesgo; evitar labores con interacción con la persona investigada; terminación del contrato sin sanción por preaviso; confidencialidad y no confrontación. Las medidas de traslado, teletrabajo, no interacción y terminación deben adoptarse, a solicitud de la víctima, en un término no superior a cinco días hábiles (F-04, art. 13). La terminación del vínculo de quien presentó la queja carece de efecto si ocurre dentro de los seis meses siguientes (F-04, art. 14). La queja puede presentarse por cualquier mecanismo electrónico, físico o verbal y no es requisito para la denuncia penal (F-04, art. 15).',
        'Deberes del empleador. Adoptar una política interna reflejada en el reglamento, los contratos y los protocolos y rutas, y difundirla; garantizar mecanismos de atención, prevención y no repetición; implementar medidas de protección inmediata; informar a la víctima de su facultad de acudir a la Fiscalía; remitir la queja a la autoridad competente cuando ella lo solicite; abstenerse de censurar o revictimizar; y publicar semestralmente, de forma anonimizada, el número de quejas y sanciones, con remisión al SIVIGE (F-04, art. 11). La Circular 0076 de 2025 instó al sector privado a adoptar de inmediato estas políticas, a realizar diagnósticos periódicos, a involucrar a sindicatos y grupos de interés, a evitar la confrontación entre las partes y a actuar con debida diligencia reforzada (F-09). El Decreto 1040 de 2026 desarrolla la ruta de orientación, recepción, investigación, protección y cierre, con canales confidenciales y responsables (F-08, 2.2.1.8.2.1).'
      ], lista: [
        'Comentarios, bromas o preguntas de connotación sexual sobre el cuerpo, la apariencia o la vida íntima de una persona.',
        'Insinuaciones, invitaciones o propuestas de carácter sexual que se reiteran pese a una negativa o a señales de incomodidad.',
        'Envío de mensajes, imágenes, audios o enlaces de contenido sexual por canales laborales o personales, dentro o fuera del horario.',
        'Contacto físico no deseado o aproximaciones que invaden el espacio personal con connotación sexual.',
        'Miradas, gestos o sonidos de carácter sexual que incomodan o intimidan.',
        'Condicionamiento de beneficios, evaluaciones, ascensos, turnos o permanencia a la aceptación de requerimientos sexuales.',
        'Difusión de rumores sobre la vida sexual o la orientación sexual de una persona.'
      ] },
      { titulo: 'Aplicación en una organización colombiana', cuerpo: [
        'Para una organización, la comprensión del acoso sexual se traduce en tres decisiones. Primera: contar con política y protocolo específicos, articulados con el reglamento interno y los contratos, construidos participativamente, publicados y socializados, con espacios anuales de formación y actualización (F-04, art. 11; F-08, 2.2.1.8.2.1 y 2.2.1.8.2.2). Segunda: definir la instancia interna competente, pues el Comité de Convivencia Laboral no es competente para quejas de acoso sexual, por no ser conciliables, y corresponde a la alta dirección o a talento humano establecer el procedimiento (F-06, art. 6, parágrafo 1). Tercera: integrar el acoso sexual como factor de riesgo psicosocial en el SG-SST, con acompañamiento de la ARL y capacitación a directivos, mandos medios y comité (F-08, 2.2.1.8.2.4; F-06, art. 12; F-11). Como referencia de buenas prácticas, la norma ISO 45003 incluye la violencia y el acoso entre los peligros psicosociales; se cita como orientación, no como requisito (F-31).',
        'Turquesa Hub acompaña la gestión preventiva: diagnóstico de capacidades, plan de acción, sensibilización, evidencias y mejora continua. La plataforma no recibe quejas, no gestiona casos ni sustituye el protocolo interno ni a las autoridades.'
      ] },
      { titulo: 'Situación práctica', cuerpo: [
        'Una empresa de servicios logísticos con sedes en dos municipios tiene reglamento interno y Comité de Convivencia Laboral, pero no un protocolo para acoso sexual. Una auxiliar administrativa cuenta a una compañera que un coordinador de otra área, con quien coincide en reuniones semanales, le envía mensajes por una aplicación personal en las noches con comentarios sobre su apariencia y propuestas de encontrarse fuera del trabajo; ella le ha pedido que no le escriba, sin resultado. Teme que la situación se conozca y afecte su contrato, que vence en tres meses. Los hechos son ficticios y no identifican a ninguna persona ni organización real.'
      ], lista: [
        '¿Qué elementos de la definición legal se identifican aunque no exista subordinación entre las dos personas? (F-04, art. 2)',
        '¿Por qué los mensajes por un canal personal y fuera del horario pueden presumirse en contexto laboral? (F-04, art. 7)',
        '¿Qué garantías de protección podría solicitar la auxiliar y en qué plazo debería responder el empleador? (F-04, arts. 13 y 14)',
        '¿Qué instancia interna debería recibir la queja y por qué no el Comité de Convivencia Laboral? (F-06, art. 6, parágrafo 1)',
        '¿Qué deberes incumple la empresa al no contar con protocolo y qué debería hacer de inmediato? (F-04, art. 11; F-09)'
      ] },
      { titulo: 'Acciones recomendadas', lista: [
        'Adoptar una política interna de prevención del acoso sexual, construida con participación de las personas trabajadoras, e incorporarla al reglamento y a los contratos (F-04, art. 11; F-08, 2.2.1.8.2.1).',
        'Designar por escrito la instancia que recibe quejas de acoso sexual, distinta del Comité de Convivencia Laboral (F-06, art. 6, parágrafo 1).',
        'Habilitar canales de queja electrónicos, físicos y verbales, con registro y confidencialidad (F-04, art. 15; F-08, 2.2.1.8.2.6).',
        'Documentar en el protocolo las medidas de protección y el plazo de cinco días hábiles para las que lo exigen (F-04, art. 13).',
        'Incluir en toda orientación la información sobre la facultad de acudir a la Fiscalía y la remisión a petición de la víctima (F-04, art. 11, nums. 4 y 5).',
        'Formar anualmente a directivos, mandos medios y responsables de la ruta, con enfoque de género (F-06, art. 12; F-08, 2.2.1.8.2.3).',
        'Incorporar el acoso sexual como riesgo psicosocial en el SG-SST y coordinar con la ARL el apoyo emocional (F-08, 2.2.1.8.2.4; F-04, art. 13).',
        'Publicar semestralmente el reporte anonimizado y remitirlo al SIVIGE (F-04, art. 11, num. 7).'
      ] },
      { titulo: 'Errores frecuentes', lista: [
        'Exigir repetición de la conducta → La ley admite que ocurra una o varias veces (F-04, art. 2).',
        'Suponer que sin subordinación no hay acoso sexual → La ley cubre relaciones horizontales y no exige relación contractual, lo que incluye pares y terceros (F-04, arts. 2 y 7).',
        'Descartar hechos ocurridos por chat o fuera del horario → Las comunicaciones digitales y los trayectos están cubiertos por la presunción (F-04, art. 7; F-05, art. 18).',
        'Remitir la queja al Comité de Convivencia o conciliar → El Comité no es competente y la conducta no es conciliable (F-06, art. 6, parágrafo 1).',
        'Citar a las partes a una reunión conjunta → Vulnera la no confrontación y revictimiza (F-04, arts. 5 y 13; F-09).',
        'Interpretar el silencio como consentimiento → El consentimiento no se infiere del silencio ni de la falta de resistencia (F-08, 2.2.1.8.1.6).',
        'Terminar el contrato de quien presentó la queja → Dentro de los seis meses siguientes carece de efecto y se presume retaliación (F-04, art. 14).'
      ] },
      { titulo: 'Herramienta o lista de verificación', lista: [
        '☐ Política interna de prevención del acoso sexual aprobada, difundida e incorporada al reglamento y a los contratos (F-04, art. 11; F-08, 2.2.1.8.2.2).',
        '☐ Protocolo con ruta de orientación, recepción, investigación, protección y cierre (F-08, 2.2.1.8.2.1).',
        '☐ Instancia de recepción de quejas designada por la alta dirección o talento humano, distinta del Comité de Convivencia (F-06, art. 6, parágrafo 1).',
        '☐ Canales de queja electrónicos, físicos y verbales con registro (F-04, art. 15).',
        '☐ Medidas de protección descritas, con plazo de cinco días hábiles para las que lo exigen (F-04, art. 13).',
        '☐ Prohibición expresa de confrontación y reuniones conjuntas de aclaración (F-04, art. 5; F-09).',
        '☐ Acoso sexual incluido como riesgo psicosocial en el SG-SST y coordinación documentada con la ARL (F-08, 2.2.1.8.2.4).',
        '☐ Formación anual a directivos, mandos medios y responsables (F-06, art. 12).',
        '☐ Reporte semestral anonimizado y remisión al SIVIGE (F-04, art. 11, num. 7).',
        '☐ Política y protocolo con fecha de revisión jurídica y responsable de actualización.'
      ] }
    ],
    referencias: ['F-04', 'F-05', 'F-06', 'F-07', 'F-08', 'F-09', 'F-11', 'F-20', 'F-22', 'F-31'],
    citasEnTexto: true,
    revision: { fecha: '2026-11-03', responsable: 'Equipo técnico Turquesa Hub (redacción inicial)' },
    estado: 'en-revision-tecnica', revisionTecnica: 'pendiente', revisionJuridica: 'pendiente', revisionPsicosocial: 'pendiente',
    referencial: true, version: '1.0', autor: 'Equipo técnico Turquesa Hub', fecha: '2026-11-03' },

  // ============================================================
  // 2. ACOSO LABORAL, ACOSO SEXUAL, DISCRIMINACIÓN Y OTRAS VIOLENCIAS
  // ============================================================
  { id: 'rec-acoso-laboral',
    titulo: 'Acoso laboral, acoso sexual, discriminación y otras violencias: diferencias y marcos aplicables',
    categoria: 'Guía práctica', tema: 'Entornos seguros',
    descripcion: 'Distingue las cinco categorías que con frecuencia se confunden en el trabajo, con la norma aplicable, la instancia interna competente, la autoridad externa y lo que no corresponde hacer en cada caso.',
    publico: ['organizacion', 'colaborador'], tiempoLectura: 12,
    objetivo: 'Permitir a las organizaciones y a sus colaboradores diferenciar el acoso laboral, el acoso sexual, la discriminación, la violencia y el acoso en el mundo del trabajo y otras violencias basadas en género, para que cada situación se encauce por la norma, la instancia interna y la autoridad que corresponden. Esta guía es orientativa y no sustituye la calificación de las instancias competentes.',
    secciones: [
      { titulo: 'Conceptos fundamentales', cuerpo: [
        'La Ley 1010 de 2006 regula el acoso laboral: conducta persistente y demostrable, ejercida por un empleador, un superior, un compañero o un subalterno, encaminada a infundir miedo, intimidación o angustia, a causar perjuicio laboral, a generar desmotivación o a inducir la renuncia, con seis modalidades: maltrato, persecución, discriminación, entorpecimiento, inequidad y desprotección laboral (F-01, art. 2). Enumera conductas constitutivas (F-01, art. 7) y exige medidas preventivas en el reglamento de trabajo y un procedimiento interno (F-01, art. 9).',
        'La Ley 2365 de 2024 regula el acoso sexual: persecución, hostigamiento o asedio de connotación sexual, en relaciones verticales u horizontales, una o varias veces (F-04, art. 2). A diferencia del acoso laboral, no exige persistencia. En lo no previsto se aplica la Ley 1010 (F-04, art. 17).',
        'La discriminación tiene tratamiento propio en la reforma laboral: la Ley 2466 de 2025 limita el poder de subordinación para que no se ejerza con fines discriminatorios por sexo, identidad de género, orientación sexual, raza, etnia, discapacidad, edad, salud o creencias (F-05, art. 16) y adiciona prohibiciones al empleador en el artículo 59 del Código Sustantivo del Trabajo, entre ellas discriminar a personas víctimas de violencias basadas en género; parte del artículo 17 fue afectada por la Sentencia C-081 de 2026, por lo que su alcance debe verificarse (F-05, art. 17).',
        'La categoría más amplia es la violencia y el acoso en el mundo del trabajo, del artículo 18 de la Ley 2466 de 2025, con la definición del Convenio 190: comportamientos inaceptables, únicos o repetidos, que causen o puedan causar daño físico, psicológico, sexual o económico, incluida la violencia por razón de género (F-05, art. 18; F-20, art. 1). No sustituye a las anteriores; las engloba y exige protocolos conforme a las Leyes 1010, 1257 y 2365 (F-05, art. 18). El Convenio 190 fue aprobado por la Ley 2528 de 2025; verificar ratificación y entrada en vigor (F-07).',
        'La Ley 1257 de 2008 define la violencia contra la mujer y sus tipos de daño, fija principios como la no discriminación, la corresponsabilidad, la integralidad y la autonomía (F-02, arts. 2, 3 y 6) y contempla medidas laborales (F-02, art. 12), reglamentadas parcialmente por el Decreto 4463 de 2011 (F-10). Es relevante tanto frente a violencias que ocurren en el trabajo como frente a las que ocurren fuera de él y afectan a una persona trabajadora.'
      ] },
      { titulo: 'Desarrollo técnico', cuerpo: [
        'La tabla comparativa, presentada como lista, resume para cada categoría la conducta típica, la norma, la instancia interna, la autoridad externa y lo que no corresponde. El criterio decisivo es la naturaleza de la conducta, no la gravedad percibida ni la relación entre las personas. Cuando una situación reúne varias categorías, cada componente sigue su marco y la activación de una ruta no cierra las demás.',
        'Sobre el Comité de Convivencia Laboral: la Resolución 3461 de 2025 lo configura como instancia preventiva, orientadora, conciliadora y canalizadora para el acoso laboral, con plazos definidos y un procedimiento que no debería exceder sesenta y cinco días calendario; no determina si existe acoso (F-06, art. 6). Su parágrafo 1 dispone que en acoso sexual el Comité no es competente, por no ser conciliable, y que la alta dirección o talento humano define el procedimiento para acoso sexual y violencia por razones de género (F-06, art. 6, parágrafo 1). El Decreto 1040 de 2026 reconoce a las víctimas de violencia basada en género el derecho a no ser confrontadas con el presunto agresor dentro del procedimiento (F-08, 2.2.1.8.1.8).'
      ], lista: [
        'ACOSO LABORAL · Conducta típica: hostigamiento persistente y demostrable en alguna de sus seis modalidades, sin connotación sexual (F-01, arts. 2 y 7) · Norma: Ley 1010 de 2006; Resolución 3461 de 2025 · Instancia interna: Comité de Convivencia Laboral, preventivo, orientador y conciliador (F-01, art. 9; F-06, art. 6) · Autoridad externa: denuncia ante inspectores de trabajo, inspectores de policía, personeros o Defensoría; sanciones por jueces de trabajo (sector privado) o Ministerio Público (sector público) (F-01, arts. 9 y 12) · Qué NO corresponde: que el Comité declare la existencia de acoso o sancione; omitir el procedimiento por tratarse de un conflicto interpersonal (F-06, art. 6).',
        'ACOSO SEXUAL · Conducta típica: persecución, hostigamiento o asedio de connotación sexual, una o varias veces (F-04, art. 2) · Norma: Ley 2365 de 2024; Decreto 1040 de 2026; Circular 0076 de 2025; Ley 1010 en lo no previsto (F-04, art. 17) · Instancia interna: procedimiento definido por la alta dirección o talento humano conforme al protocolo (F-06, art. 6, parágrafo 1; F-04, art. 11) · Autoridad externa: Fiscalía cuando la persona decida denunciar; inspección del trabajo, con competencia expresa si el presunto acosador es superior jerárquico (F-04, art. 11; F-08, 2.2.1.8.3.10) · Qué NO corresponde: remitir al Comité de Convivencia, conciliar o confrontar a las partes (F-06, art. 6, parágrafo 1; F-04, art. 5).',
        'DISCRIMINACIÓN · Conducta típica: trato desfavorable o exclusión por condiciones personales sin relación con la labor; uso del poder de subordinación con fines discriminatorios (F-05, arts. 16 y 17) · Norma: Ley 2466 de 2025, arts. 16 y 17; CST art. 59; Ley 1010 cuando es modalidad de acoso laboral (F-01, art. 2) · Instancia interna: mecanismos de la política; Comité de Convivencia cuando se enmarca en acoso laboral (F-08, 2.2.1.8.2.1; F-06, art. 6) · Autoridad externa: Ministerio del Trabajo; jueces (F-05, art. 16) · Qué NO corresponde: tratarla como simple decisión de gestión sin revisar sus motivos; cargar la prueba sobre la persona afectada en contextos de subordinación (F-08, 2.2.1.8.3.4).',
        'VIOLENCIA Y ACOSO EN EL MUNDO DEL TRABAJO · Conducta típica: comportamientos inaceptables, únicos o repetidos, con daño físico, psicológico, sexual o económico, en espacios físicos o digitales, por cualquier persona incluidos terceros (F-05, art. 18; F-20, art. 1) · Norma: Ley 2466 de 2025, art. 18; Decreto 1040 de 2026; Convenio 190 aprobado por Ley 2528 de 2025, verificar ratificación (F-07) · Instancia interna: la que corresponda a cada componente según el protocolo integrado (F-08, 2.2.1.8.2.1) · Autoridad externa: Ministerio del Trabajo en vigilancia y sanción (F-05, art. 18) · Qué NO corresponde: usar esta categoría general para eludir la norma específica.',
        'OTRAS VIOLENCIAS BASADAS EN GÉNERO (incluidas las que ocurren fuera del trabajo) · Conducta típica: violencia física, psicológica, sexual o patrimonial contra una mujer por su condición de mujer, por ejemplo de pareja o intrafamiliar, que afecta su seguridad o desempeño laboral (F-02, arts. 2 y 3) · Norma: Ley 1257 de 2008; Decreto 4463 de 2011; Ley 2466 de 2025, art. 15, nums. 15 y 16 (F-02; F-10; F-05) · Instancia interna: talento humano o la instancia designada para orientar, aplicar medidas laborales y atender órdenes de autoridad (F-05, art. 15) · Autoridad externa: comisarías de familia, Fiscalía, sector salud y jueces, según la ruta territorial (F-02, art. 6) · Qué NO corresponde: investigar hechos ocurridos fuera del ámbito laboral, exigir pruebas para apoyar o discriminar a la persona por ser víctima (F-05, art. 17).'
      ] },
      { titulo: 'Aplicación en una organización colombiana', cuerpo: [
        'Una organización necesita, como mínimo, dos vías internas diferenciadas: el Comité de Convivencia Laboral para el acoso laboral (F-06, arts. 3, 5 y 6) y el procedimiento designado para acoso sexual y violencia por razones de género (F-06, art. 6, parágrafo 1), descritas en un mismo protocolo integrado con criterios de clasificación inicial y posibilidad de encauzar una situación por más de una vía (F-08, 2.2.1.8.2.1). Quien recibe la situación no debe exigir a la persona afectada que la califique jurídicamente; en caso de duda sobre la connotación sexual, la práctica prudente es tratarla por la vía de acoso sexual, que ofrece mayores garantías (F-04, arts. 5 y 13).',
        'La reforma laboral integra las categorías bajo un marco común con vigilancia del Ministerio del Trabajo (F-05, art. 18), que el Decreto 1040 de 2026 desarrolla con una política única articulada con el SG-SST y el Comité de Convivencia (F-08, 2.2.1.8.2.1). El modelo del PNUD de compromiso, detección, acción y monitoreo es una referencia de buenas prácticas para integrarlas (F-22). Turquesa Hub apoya la gestión preventiva y la sensibilización sobre estas diferencias; no clasifica situaciones concretas ni gestiona casos.'
      ] },
      { titulo: 'Situación práctica', cuerpo: [
        'En una planta de alimentos, una operaria presenta queja ante el Comité de Convivencia Laboral contra su supervisor: le asigna las tareas más pesadas, la excluye de capacitaciones, comenta delante del equipo que las mujeres no sirven para ese trabajo y, en dos ocasiones, ha hecho comentarios sobre su cuerpo con una invitación a salir. El Comité recibe la queja completa y programa una conciliación entre ambos. Los hechos son ficticios y no identifican a ninguna persona ni organización real.'
      ], lista: [
        '¿Qué componentes corresponden a acoso laboral y a discriminación por sexo? (F-01, art. 2; F-05, arts. 16 y 17)',
        '¿Qué componente corresponde a acoso sexual y por qué el Comité no es competente para él? (F-04, art. 2; F-06, art. 6, parágrafo 1)',
        '¿Qué debería hacer el Comité al identificar el componente de acoso sexual? (F-06, art. 6, parágrafo 1)',
        '¿Por qué la conciliación es inadecuada para ese componente y qué garantías vulneraría? (F-04, arts. 5 y 13; F-08, 2.2.1.8.1.8)',
        '¿Qué autoridad tiene competencia expresa si el presunto acosador sexual es el superior jerárquico? (F-08, 2.2.1.8.3.10)',
        '¿Cómo coordinar las dos vías para que la operaria no repita su relato? (F-04, art. 5)'
      ] },
      { titulo: 'Acciones recomendadas', lista: [
        'Incluir en el protocolo una sección de clasificación inicial con las cinco categorías, su norma y su vía interna (F-05, art. 18; F-08, 2.2.1.8.2.1).',
        'Verificar la conformación del Comité de Convivencia según tamaño y centros de trabajo, con reglamento y acuerdos de confidencialidad (F-06, arts. 3, 4 y 5).',
        'Formar al Comité para reconocer componentes de acoso sexual o violencia de género y remitirlos de inmediato, sin tramitarlos ni conciliarlos (F-06, art. 6, parágrafo 1).',
        'Designar y comunicar quién recibe las quejas de acoso sexual y violencia por razones de género (F-06, art. 6, parágrafo 1).',
        'Documentar criterios objetivos para asignación de tareas, capacitación, promoción y turnos, para prevenir discriminación (F-05, arts. 16 y 17).',
        'Prever medidas laborales de apoyo y reubicación preferente para personas víctimas de violencia de pareja o intrafamiliar, y el deber de atender órdenes de autoridad (F-05, art. 15; F-02, art. 12).',
        'Establecer que, ante varios componentes, cada uno sigue su vía con una sola entrevista registrada y compartida bajo reserva (F-04, art. 5; F-08, 2.2.1.8.3.4 (2.º)).'
      ] },
      { titulo: 'Errores frecuentes', lista: [
        'Tratar todo malestar como acoso laboral → Exige conducta persistente y demostrable; otras situaciones tienen marcos propios (F-01, art. 2).',
        'Tramitar el acoso sexual por el Comité de Convivencia por ser la única instancia existente → No es competente; debe existir el procedimiento definido por la alta dirección o talento humano (F-06, art. 6, parágrafo 1).',
        'Exigir repetición para reconocer acoso sexual → La ley admite una sola ocurrencia (F-04, art. 2).',
        'Creer que el Comité declara si hubo acoso laboral → Previene, orienta y concilia; no determina su existencia (F-06, art. 6).',
        'Invocar el Convenio 190 como vigente sin verificar → Aprobado por la Ley 2528 de 2025; a julio de 2026 el vínculo no se había perfeccionado (F-07).'
      ] },
      { titulo: 'Herramienta o lista de verificación', lista: [
        '☐ El protocolo define las cinco categorías con su norma y criterios de clasificación inicial (F-01; F-02; F-04; F-05).',
        '☐ Comité de Convivencia conformado conforme a la Resolución 3461 de 2025, con reglamento y periodo vigente (F-06, arts. 3, 4 y 5).',
        '☐ El Comité se abstiene de tramitar o conciliar acoso sexual y lo remite a la instancia competente (F-06, art. 6, parágrafo 1).',
        '☐ Persona o instancia designada para acoso sexual y violencia por razones de género (F-06, art. 6, parágrafo 1).',
        '☐ Las situaciones con varios componentes se encauzan sin repetir entrevistas (F-04, art. 5).',
        '☐ Medidas laborales de apoyo para víctimas de violencia de pareja o intrafamiliar (F-05, art. 15; F-02, art. 12).',
        '☐ Protocolo con revisión jurídica, fecha de actualización y referencias al Convenio 190 con indicación de verificar ratificación (F-07).'
      ] }
    ],
    referencias: ['F-01', 'F-02', 'F-04', 'F-05', 'F-06', 'F-07', 'F-08', 'F-10', 'F-20', 'F-22'],
    citasEnTexto: true,
    revision: { fecha: '2026-11-03', responsable: 'Equipo técnico Turquesa Hub (redacción inicial)' },
    estado: 'en-revision-tecnica', revisionTecnica: 'pendiente', revisionJuridica: 'pendiente', revisionPsicosocial: 'no-aplica',
    referencial: true, version: '1.0', autor: 'Equipo técnico Turquesa Hub', fecha: '2026-11-03' },

  // ============================================================
  // 3. PREVENCIÓN Y RESPUESTA INSTITUCIONAL
  // ============================================================
  { id: 'rec-respuesta',
    titulo: 'Prevención y respuesta institucional dentro de las competencias del empleador',
    categoria: 'Guía práctica', tema: 'Respuesta institucional',
    descripcion: 'Delimita qué hace Turquesa Hub, qué obligaciones tiene el empleador dentro de su competencia (política, protocolo, ruta, investigación interna con debida diligencia, protección, cierre, reparación y no repetición), qué corresponde al Comité de Convivencia Laboral y qué corresponde a las autoridades.',
    publico: ['organizacion'], tiempoLectura: 13,
    objetivo: 'Dotar a las organizaciones de un mapa claro de responsabilidades frente a la violencia y el acoso en el trabajo, distinguiendo cuatro planos: lo que hace Turquesa Hub como plataforma de gestión preventiva; lo que el empleador debe hacer dentro de su competencia conforme a la Ley 2365 de 2024, la Ley 2466 de 2025 y el Decreto 1040 de 2026; lo que corresponde al Comité de Convivencia Laboral según la Resolución 3461 de 2025; y lo que corresponde a las autoridades. El propósito es que la organización asuma plenamente sus obligaciones sin invadir competencias ajenas ni abdicar de las propias.',
    secciones: [
      { titulo: 'Conceptos fundamentales', cuerpo: [
        'Qué hace Turquesa Hub. Acompaña la gestión preventiva: diagnóstico de capacidades, plan de acción, sensibilización, evidencias de gestión y mejora continua. No recibe quejas, no gestiona casos, no almacena información sobre personas afectadas ni situaciones, y no sustituye el protocolo interno ni a las autoridades. Las fuentes de atención a sobrevivientes se usan solo para principios de orientación segura (F-28; F-29).',
        'Qué debe hacer el empleador dentro de su competencia. La Ley 2365 de 2024 le exige política, protocolos y rutas; mecanismos de atención, prevención y no repetición; medidas de protección inmediata; informar a la víctima de su facultad de acudir a la Fiscalía; remitir la queja a la autoridad cuando ella lo solicite; no revictimizar; y publicar información anonimizada (F-04, art. 11), además de adoptar en cinco días hábiles las medidas que la víctima solicite (F-04, art. 13). La Ley 2466 de 2025 le exige acciones de prevención y atención con protocolos, comités y mecanismos, y garantizar la reparación y la no repetición, bajo vigilancia del Ministerio del Trabajo (F-05, art. 18). El Decreto 1040 de 2026 desarrolla una ruta de orientación, recepción, investigación, protección y cierre (F-08, 2.2.1.8.2.1) y exige atender las denuncias con debida diligencia y celeridad (F-08, 2.2.1.8.3.1); la Circular 0076 de 2025 habla de debida diligencia reforzada para prevenir, investigar y sancionar el acoso sexual (F-09). En consecuencia, la organización investiga internamente, dentro de su competencia laboral y disciplinaria, protege, decide y repara; lo que no hace es sustituir la investigación penal, disciplinaria externa o administrativa de las autoridades.',
        'Qué corresponde al Comité de Convivencia Laboral. Es una instancia preventiva, orientadora, conciliadora y canalizadora para el acoso laboral, con plazos y un procedimiento que no debería exceder sesenta y cinco días; no determina si existe acoso ni sanciona (F-06, art. 6). No es competente para quejas de acoso sexual, por no ser conciliables; la alta dirección o talento humano define ese procedimiento (F-06, art. 6, parágrafo 1).',
        'Qué corresponde a las autoridades. El Ministerio del Trabajo, mediante la inspección del trabajo, vigila, verifica las medidas de protección y puede sancionar la ausencia o falta de socialización del protocolo (F-05, art. 18; F-08, 2.2.1.8.2.1 y 2.2.1.8.2.5); si el presunto acosador sexual es el superior jerárquico, la inspección es competente y compulsa copias a las autoridades disciplinarias o penales cuando hay mérito (F-08, 2.2.1.8.3.10). La Fiscalía conoce de posibles delitos por decisión de la persona afectada (F-04, art. 11, num. 4); los jueces resuelven controversias laborales y reparación; las comisarías de familia y el sector salud atienden las violencias basadas en género conforme a la Ley 1257 de 2008 y las rutas territoriales (F-02, art. 6).'
      ] },
      { titulo: 'Desarrollo técnico', cuerpo: [
        'La ruta interna del empleador puede describirse en siete momentos, según el Decreto 1040 de 2026 y las garantías de la Ley 2365 de 2024. Orientación: quien recibe la primera manifestación escucha, informa sobre derechos, ruta interna, facultad de acudir a la Fiscalía y medidas de protección, y respeta la decisión de presentar o no la queja (F-04, arts. 5 y 11; F-08, 2.2.1.8.2.1). Recepción: la queja puede presentarse por medio electrónico, físico o verbal, por la persona afectada o por quien conozca los hechos, con indicación de tiempo, modo y lugar; las verbales se registran (F-04, art. 15; F-08, 2.2.1.8.2.6).',
        'Investigación interna con debida diligencia: la organización recoge la versión de la persona afectada en un entorno seguro y sin confrontación, garantiza el derecho de defensa de la persona señalada, valora las pruebas con enfoque de género, admite indicios y flexibiliza la carga probatoria sin decidir con estereotipos, y reconoce que en contextos de sujeción corresponde a quien ejecuta el presunto acto desvirtuar la presunción de discriminación (F-08, 2.2.1.8.3.1 a 2.2.1.8.3.4). La reserva no afecta el derecho de defensa (F-08, 2.2.1.8.3.4 (2.º)). Si el presunto acosador es el superior jerárquico, el protocolo debe prever cómo garantizar imparcialidad, por ejemplo con una instancia ajena a esa línea de mando, y tener presente la competencia de la inspección del trabajo (F-08, 2.2.1.8.3.10).',
        'Protección: las medidas se activan desde la manifestación del hecho o la solicitud, sin prueba previa y con consentimiento informado; pueden ser organizativas, físicas, contractuales, pedagógicas o psicosociales (F-08, 2.2.1.8.2.5). En acoso sexual, traslado, teletrabajo, no interacción y terminación sin preaviso se adoptan en cinco días hábiles a solicitud de la víctima; la atención emocional corresponde a la ARL (F-04, art. 13; F-08, 2.2.1.8.3.7). Denunciantes y testigos están protegidos frente a represalias; la terminación de la víctima dentro de los seis meses siguientes carece de efecto (F-04, art. 14; F-08, 2.2.1.8.2.7).',
        'Cierre: la decisión se comunica a las partes con reserva, se registra y, cuando corresponde, se remite a la autoridad; la queja interna no es requisito para la reparación judicial (F-08, 2.2.1.8.3.8). Reparación y no repetición: las decisiones incluyen acompañamiento, medidas de reparación orientadas a la no repetición, información a la ARL, medidas pedagógicas y traslado disciplinario cuando corresponda, con sanciones proporcionales (F-08, 2.2.1.8.3.8 y 2.2.1.8.3.9; F-05, art. 18). Como referencia de buenas prácticas, la norma ISO 37002 describe un ciclo de recepción, evaluación, tratamiento y cierre de reportes con protección de quien reporta; se cita como orientación, no como requisito (F-34).'
      ] },
      { titulo: 'Aplicación en una organización colombiana', cuerpo: [
        'La respuesta institucional se concreta en un protocolo escrito, aprobado por la alta dirección, construido con participación de las personas trabajadoras y los sindicatos cuando existan, publicado, socializado y actualizado con formación anual (F-08, 2.2.1.8.2.1). Integra las dos vías internas y se articula con el SG-SST para el riesgo psicosocial (F-06, art. 6, parágrafo 1; F-08, 2.2.1.8.2.4). Nombra responsables para cada momento, con formación, tiempo y recursos; talento humano y seguridad y salud en el trabajo adoptan medidas preventivas y correctivas, incluidos traslados y espacios de apoyo en crisis (F-06, arts. 12 y 13). En organizaciones pequeñas, la designación puede recaer en la gerencia o en una persona externa de confianza, con garantías de confidencialidad e imparcialidad.',
        'La protección cubre a todas las personas sin importar su vínculo (F-05, art. 18; F-08, 2.2.1.8.1.5); en servicios temporales, la empresa usuaria tramita en primera instancia las quejas de acoso laboral de los trabajadores en misión (F-06, art. 3). La organización no resuelve lo que escapa a su competencia, como la responsabilidad penal, pero actúa con diligencia en lo que le corresponde y coordina con las autoridades. Turquesa Hub ayuda a verificar que el protocolo existe, está actualizado y es conocido; no interviene en situaciones concretas.'
      ] },
      { titulo: 'Situación práctica', cuerpo: [
        'Una clínica recibe por el canal electrónico de su protocolo la queja de una enfermera contra el coordinador médico de su servicio, por comentarios reiterados de connotación sexual e insistencia en encuentros fuera del trabajo. Ella pide no coincidir con él en los turnos y que la situación se mantenga en reserva. La jefa de talento humano duda entre tres caminos: enviar el caso al Comité de Convivencia; limitarse a orientar a la enfermera para que acuda a la Fiscalía, porque considera que la clínica no debe investigar; o tramitarlo en la clínica con las garantías del protocolo. Los hechos son ficticios y no identifican a ninguna persona ni organización real.'
      ], lista: [
        '¿Por qué el primer camino no corresponde al marco aplicable? (F-06, art. 6, parágrafo 1)',
        '¿Por qué el segundo es insuficiente frente a los deberes de investigar con debida diligencia, proteger, decidir y reparar? (F-04, art. 11; F-05, art. 18; F-08, 2.2.1.8.3.1 y 2.2.1.8.3.8; F-09)',
        '¿Qué medida solicitó la enfermera, en qué plazo debe adoptarse y qué requisito probatorio no puede exigirse? (F-04, art. 13; F-08, 2.2.1.8.2.5)',
        '¿Qué implica que el presunto acosador sea el superior jerárquico y cómo garantizar imparcialidad? (F-08, 2.2.1.8.3.10)',
        '¿Qué información debe recibir la enfermera sobre la Fiscalía y la remisión a petición suya? (F-04, art. 11, nums. 4 y 5)',
        '¿Cómo compatibilizar la reserva con el derecho de defensa del coordinador, y qué debe contener el cierre? (F-08, 2.2.1.8.3.4 (2.º) y 2.2.1.8.3.8)'
      ] },
      { titulo: 'Acciones recomendadas', lista: [
        'Aprobar un protocolo integrado con la ruta de orientación, recepción, investigación, protección, cierre, reparación y no repetición, con responsables, plazos y registros (F-08, 2.2.1.8.2.1; F-04, arts. 11 y 13).',
        'Designar la instancia para acoso sexual y violencia por razones de género, distinta del Comité de Convivencia, y comunicarlo (F-06, art. 6, parágrafo 1).',
        'Prever un mecanismo de imparcialidad cuando la persona señalada sea superior jerárquica y documentar la competencia de la inspección del trabajo (F-08, 2.2.1.8.3.10).',
        'Establecer que las medidas de protección se activan sin prueba previa y con consentimiento informado, y cumplir el plazo de cinco días hábiles cuando aplica (F-08, 2.2.1.8.2.5; F-04, art. 13).',
        'Definir criterios escritos de investigación interna con enfoque de género, no confrontación, valoración de indicios y derecho de defensa (F-08, 2.2.1.8.3.1 a 2.2.1.8.3.4 (2.º); F-09).',
        'Incluir en toda decisión de cierre reparación, no repetición, acompañamiento e información a la ARL (F-08, 2.2.1.8.3.8; F-05, art. 18).',
        'Capacitar anualmente a directivos, talento humano, control interno y comités, y articular con el SG-SST y la ARL (F-08, 2.2.1.8.2.3 y 2.2.1.8.2.4; F-06, art. 12).'
      ] },
      { titulo: 'Errores frecuentes', lista: [
        'Afirmar que la organización se limita a orientar y remitir → El empleador debe investigar internamente con debida diligencia, proteger, decidir y reparar dentro de su competencia; la remisión a autoridades es adicional, no sustitutiva (F-04, art. 11; F-05, art. 18; F-08, 2.2.1.8.3.1; F-09).',
        'Pretender reemplazar a la Fiscalía o a la inspección del trabajo → La investigación interna es laboral y disciplinaria; la responsabilidad penal y administrativa corresponde a las autoridades (F-04, art. 11; F-08, 2.2.1.8.3.10).',
        'Asignar al Comité de Convivencia las quejas de acoso sexual → No es competente (F-06, art. 6, parágrafo 1).',
        'Exigir pruebas antes de proteger → Las medidas se activan sin prueba previa (F-08, 2.2.1.8.2.5).',
        'Realizar careos o reuniones conjuntas → Vulneran la no confrontación y revictimizan (F-04, arts. 5 y 13; F-09).',
        'Cerrar con una sanción sin reparación ni no repetición → Las decisiones deben incluirlas (F-08, 2.2.1.8.3.8; F-05, art. 18).',
        'Registrar casos o personas afectadas en Turquesa Hub → La plataforma gestiona prevención, no casos (F-03, arts. 5 y 6; F-28).'
      ] },
      { titulo: 'Herramienta o lista de verificación', lista: [
        '☐ Protocolo escrito y aprobado con la ruta completa: orientación, recepción, investigación, protección, cierre, reparación y no repetición (F-08, 2.2.1.8.2.1).',
        '☐ Protocolo participativo, publicado, socializado e incorporado al reglamento y a los contratos (F-08, 2.2.1.8.2.1 y 2.2.1.8.2.2; F-04, art. 11).',
        '☐ Instancia designada para acoso sexual y violencia por razones de género, distinta del Comité de Convivencia (F-06, art. 6, parágrafo 1).',
        '☐ Canales de queja electrónicos, físicos y verbales con registro (F-04, art. 15; F-08, 2.2.1.8.2.6).',
        '☐ Medidas de protección sin prueba previa, con consentimiento informado y plazo de cinco días hábiles cuando aplica (F-08, 2.2.1.8.2.5; F-04, art. 13).',
        '☐ Investigación interna con enfoque de género, no confrontación, indicios y derecho de defensa (F-08, 2.2.1.8.3.1 a 2.2.1.8.3.4 (2.º)).',
        '☐ Mecanismo de imparcialidad cuando la persona señalada es superior jerárquica; competencia de la inspección documentada (F-08, 2.2.1.8.3.10).',
        '☐ Información sobre la Fiscalía y remisión a petición de la víctima (F-04, art. 11, nums. 4 y 5).',
        '☐ Decisiones de cierre con reparación, no repetición, acompañamiento e información a la ARL (F-08, 2.2.1.8.3.8).',
        '☐ Articulación con SG-SST y ARL; formación anual; reporte semestral anonimizado (F-08, 2.2.1.8.2.3 y 2.2.1.8.2.4; F-04, art. 11, num. 7).',
        '☐ Fecha de última revisión jurídica y responsable de actualización.'
      ] }
    ],
    referencias: ['F-02', 'F-03', 'F-04', 'F-05', 'F-06', 'F-08', 'F-09', 'F-28', 'F-29', 'F-34'],
    citasEnTexto: true,
    revision: { fecha: '2026-11-03', responsable: 'Equipo técnico Turquesa Hub (redacción inicial)' },
    estado: 'en-revision-tecnica', revisionTecnica: 'pendiente', revisionJuridica: 'pendiente', revisionPsicosocial: 'pendiente',
    referencial: true, version: '1.0', autor: 'Equipo técnico Turquesa Hub', fecha: '2026-11-03' },

  // ============================================================
  // 4. ORIENTACIÓN SEGURA Y RUTAS COMPETENTES
  // ============================================================
  { id: 'rec-rutas',
    titulo: 'Orientación segura y rutas competentes: principios para quien recibe una situación',
    categoria: 'Guía práctica', tema: 'Rutas competentes',
    descripcion: 'Principios de primera escucha y orientación segura para quien recibe una situación de violencia o acoso en la organización, con una plantilla de directorio territorial de instancias competentes.',
    publico: ['organizacion', 'colaborador'], tiempoLectura: 11,
    objetivo: 'Ofrecer a quienes reciben la primera manifestación de una situación de violencia o acoso en el trabajo un conjunto de principios de escucha y orientación segura, y una estructura para construir el directorio territorial de instancias competentes. Se apoya en estándares de apoyo de primera línea del sector salud y en principios éticos de la gestión de casos, adoptados únicamente como principios educativos: Turquesa Hub no gestiona casos, no atiende víctimas ni reproduce formularios de atención. La orientación es el primer momento de la ruta interna del empleador y no la sustituye.',
    secciones: [
      { titulo: 'Conceptos fundamentales', cuerpo: [
        'Primera escucha. La OMS describe el apoyo de primera línea con la sigla LIVES: escuchar con empatía y sin juzgar; preguntar por necesidades y preocupaciones; validar la experiencia, mostrando que se le cree y que no es culpable; reforzar la seguridad, identificando riesgos y opciones; y apoyar, conectando con servicios e información; con los principios de no juzgar, no presionar y mantener la confidencialidad (F-26). Aunque el manual se dirige a personal de salud, sus principios son transferibles a quien recibe una situación en una organización; en Turquesa Hub se adoptan solo como principios de primera escucha.',
        'Principios éticos. Los estándares del BID para la gestión de casos subrayan que la atención debe ser expedita, planificada, ética y coordinada entre instituciones (F-28); las directrices interagenciales de gestión de casos de VBG fijan como principios rectores la seguridad, la confidencialidad, la dignidad y la autodeterminación, y la no discriminación, dentro de un enfoque centrado en la sobreviviente, y desarrollan el consentimiento informado (F-29). De ambas se toman únicamente los principios de confidencialidad, consentimiento, autonomía, no hacer daño y coordinación; sus herramientas no se reproducen (F-28; F-29).',
        'Marco jurídico. La persona afectada tiene derecho a la intimidad, la confidencialidad, el trato digno, la no revictimización y la no confrontación (F-04, art. 5); el empleador debe informarle su facultad de acudir a la Fiscalía y remitir la queja a la autoridad cuando ella lo solicite (F-04, art. 11, nums. 4 y 5). La Ley 1257 de 2008 establece la autonomía, la corresponsabilidad, la integralidad y la atención diferenciada como principios (F-02, art. 6), y el Decreto 1040 de 2026 prevé la atención con consentimiento informado y la protección de datos sensibles (F-08, 2.2.1.8.2.4).'
      ] },
      { titulo: 'Desarrollo técnico', cuerpo: [
        'Quien recibe una situación cumple tres funciones: escuchar con respeto, informar con precisión y encauzar con seguridad. No le corresponde calificar jurídicamente los hechos, investigar en ese momento, confrontar a nadie ni decidir por la persona.',
        'Qué sí hacer: garantizar un espacio privado; escuchar sin interrumpir ni pedir detalles innecesarios; creer y validar; preguntar qué necesita y qué le preocupa; informar sobre la ruta interna, los derechos, las medidas de protección, la facultad de acudir a la Fiscalía y las instancias del territorio; explicar qué se registrará, quién lo conocerá y con qué fin, y pedir consentimiento; respetar su decisión de presentar o no la queja; identificar con ella si existe riesgo inmediato y, en ese caso, activar las medidas de protección y las autoridades conforme al protocolo; registrar solo lo necesario con reserva; acordar el seguimiento (F-26; F-28; F-29; F-04, arts. 5, 11 y 13).',
        'Qué no hacer: pedir que repita el relato ante varias personas; preguntar por qué no reaccionó antes o qué hizo para provocar la situación; prometer resultados fuera de su competencia; comentar el caso con personas ajenas a la ruta; citar a ambas partes a una reunión conjunta; presionar para que denuncie o para que no lo haga; condicionar la ayuda a pruebas; decidir traslados sin su consentimiento; registrar datos sensibles innecesarios o en sistemas no protegidos; sustituir a los servicios de salud, justicia o protección (F-26; F-29; F-04, arts. 5 y 13; F-08, 2.2.1.8.2.5 y 2.2.1.8.3.4 (2.º)).',
        'Coordinación con rutas competentes. Las rutas oficiales las definen las autoridades y varían por territorio. Suelen integrarlas la inspección del trabajo (F-05, art. 18; F-08, 2.2.1.8.3.10); la Fiscalía (F-04, art. 11, num. 4); las comisarías de familia en violencias del ámbito familiar; el sector salud y la ARL para el apoyo emocional (F-04, art. 13, num. 2); y las personerías, la Defensoría del Pueblo y los inspectores de policía, a los que la víctima puede acudir (F-08, 2.2.1.8.3.10). La organización no reemplaza estas rutas: las conoce, las verifica y facilita el acceso.'
      ], lista: [
        'Confidencialidad: la información se comparte solo con quienes deben conocerla para cumplir la ruta, y la persona sabe quiénes son (F-04, art. 5; F-29).',
        'Consentimiento informado: ninguna remisión, registro o medida sin que la persona entienda y acepte, salvo riesgo inminente para la vida o la integridad, caso en que se actúa conforme al protocolo y se le informa (F-08, 2.2.1.8.2.4 y 2.2.1.8.3.6; F-29).',
        'Autonomía: la persona decide si presenta la queja, si acude a las autoridades y qué medidas acepta (F-02, art. 6; F-04, art. 11, num. 5).',
        'No hacer daño: toda actuación se evalúa por su efecto sobre la seguridad y el bienestar de la persona (F-04, art. 5; F-26).',
        'Coordinación: la organización conoce las instancias del territorio y mantiene contacto verificado con ellas (F-28; F-08, 2.2.1.8.2.1).'
      ] },
      { titulo: 'Aplicación en una organización colombiana', cuerpo: [
        'La organización debería identificar y formar a quienes es probable que reciban una primera manifestación: jefaturas, talento humano, seguridad y salud en el trabajo, Comité de Convivencia, vigilancia, recepción y líderes informales. La formación no busca convertirlas en profesionales de atención, sino en personas capaces de escuchar, informar y encauzar sin causar daño (F-08, 2.2.1.8.2.3); la Resolución 3461 de 2025 añade la formación en primeros auxilios psicológicos con apoyo de la ARL (F-06, art. 12). Quien escucha informa sobre el protocolo, sobre la instancia que recibe la queja (que en acoso sexual no es el Comité de Convivencia) y sobre las medidas de protección, algunas con plazo de cinco días hábiles (F-06, art. 6, parágrafo 1; F-04, art. 13).',
        'El directorio territorial hace posible la coordinación. Debe construirse con las entidades del municipio o departamento donde opera la organización, verificarse periódicamente y estar accesible. Turquesa Hub no incluye datos de contacto: la organización debe verificarlos directamente con las entidades de su territorio y la Fundación Milagro de Abril validará la información antes de su publicación en la plataforma. Turquesa Hub apoya este componente con sensibilización y con el registro, como evidencia de gestión, de que existe directorio verificado y personas formadas; no registra situaciones ni datos de personas afectadas.'
      ] },
      { titulo: 'Situación práctica', cuerpo: [
        'En una empresa agroindustrial, una trabajadora de campo le dice al final de la jornada a la supervisora de cuadrilla que un compañero de otra cuadrilla la sigue hasta la parada del transporte y le hace comentarios que la incomodan, y que ya no quiere tomar la ruta de la empresa. La supervisora le pregunta delante de otras dos trabajadoras qué fue exactamente lo que él le dijo, le sugiere que lo ignore y le promete hablar con él al día siguiente. Los hechos son ficticios y no identifican a ninguna persona ni organización real.'
      ], lista: [
        '¿Qué principios de la primera escucha no se respetaron? (F-26; F-29)',
        '¿Por qué los hechos en el trayecto y la ruta de transporte pueden presumirse en contexto laboral? (F-04, art. 7; F-05, art. 18)',
        '¿Qué información debió recibir la trabajadora sobre la ruta interna, sus derechos y las medidas de protección, incluida la posibilidad de ajustar el transporte? (F-04, arts. 5, 11 y 13; F-08, 2.2.1.8.2.5)',
        '¿Qué riesgos implica que la supervisora hable con el compañero y a quién debía encauzar la situación? (F-04, art. 5; F-06, art. 6, parágrafo 1)',
        '¿Qué entidades del territorio deberían estar en el directorio para una situación así? (F-08, 2.2.1.8.3.10)'
      ] },
      { titulo: 'Acciones recomendadas', lista: [
        'Identificar y formar a los cargos con mayor probabilidad de recibir una primera manifestación (F-26; F-08, 2.2.1.8.2.3).',
        'Redactar una guía breve de orientación con el qué sí y el qué no, la información mínima que se entrega y la instancia a la que se encauza (F-04, arts. 5 y 11).',
        'Garantizar espacio privado y una sola entrevista registrada, sin repetir el relato ante distintas instancias (F-04, art. 5; F-26).',
        'Incluir en toda orientación la información sobre la Fiscalía y la remisión a petición de la persona (F-04, art. 11, nums. 4 y 5).',
        'Construir el directorio territorial con los campos de la plantilla, verificarlo con cada entidad y fijar periodicidad y responsable de actualización (F-28; F-08, 2.2.1.8.2.1).',
        'Acordar con la ARL el acceso al apoyo emocional y a los primeros auxilios psicológicos (F-04, art. 13; F-06, art. 12).',
        'Definir qué se registra en la orientación, con qué consentimiento, dónde se custodia y quién accede (F-03, arts. 4 y 6; F-08, 2.2.1.8.2.4).',
        'Prever la actuación ante riesgo inminente, incluida la activación inmediata de autoridades (F-08, 2.2.1.8.3.6).'
      ] },
      { titulo: 'Errores frecuentes', lista: [
        'Interrogar sobre detalles en la primera escucha → La orientación no es una investigación (F-26).',
        'Minimizar o aconsejar que ignore la conducta → Invalida la experiencia; se validan los sentimientos y se informa sobre las opciones (F-26).',
        'Hablar directamente con la persona señalada → Expone a represalias, vulnera la confidencialidad y desborda la función de quien orienta (F-04, art. 5; F-08, 2.2.1.8.2.7).',
        'Presionar para que denuncie o para que no lo haga → La decisión es de la persona (F-02, art. 6; F-04, art. 11, num. 5).',
        'Exigir pruebas para activar una medida de protección → Se activan sin prueba previa (F-08, 2.2.1.8.2.5).',
        'Usar un directorio sin fecha de verificación o copiado de internet → Los contactos se verifican con las entidades, con responsable y fecha.',
        'Registrar la situación en Turquesa Hub o en hojas de cálculo compartidas → La información de situaciones va en el protocolo interno con reserva (F-03, art. 6; F-08, 2.2.1.8.3.4 (2.º)).',
        'Reproducir formularios de gestión de casos de organismos internacionales → Corresponden a la atención profesional y están sujetos a licencia; se adoptan solo los principios (F-28; F-29).'
      ] },
      { titulo: 'Herramienta o lista de verificación', lista: [
        'PLANTILLA DE DIRECTORIO TERRITORIAL · Campos por fila (sin datos de contacto: la organización los verifica con las entidades de su territorio y la FMA validará la información antes de publicarla):',
        '☐ Entidad o servicio (nombre oficial completo).',
        '☐ Competencia: laboral (inspección del trabajo), penal (Fiscalía), protección (comisaría de familia, inspección de policía), salud (EPS, ARL, urgencias), acompañamiento (personería, Defensoría del Pueblo), orientación psicosocial, otra.',
        '☐ Tipo de situación que atiende (acoso laboral, acoso sexual, violencia de pareja o intrafamiliar, violencia sexual, discriminación, riesgo inminente).',
        '☐ Territorio de cobertura (municipio, departamento, nacional).',
        '☐ Canales de contacto verificados (línea, dirección, correo, sitio web, horario) y canal preferente en emergencia.',
        '☐ Requisitos de acceso (documentos, cita previa, atención a personas sin vínculo laboral, enfoque diferencial).',
        '☐ Persona de enlace en la entidad, cuando exista, y fecha de último contacto.',
        '☐ Fecha de verificación del dato y responsable de la verificación en la organización.',
        '☐ Periodicidad de actualización (se sugiere semestral) y fecha de próxima verificación.',
        'LISTA DE VERIFICACIÓN DE LA ORIENTACIÓN · ☐ Espacio privado · ☐ Escucha sin juicio ni interrogatorio · ☐ Validación · ☐ Pregunta por necesidades y riesgo inmediato · ☐ Información sobre ruta interna, derechos, medidas de protección y Fiscalía · ☐ Consentimiento informado sobre lo que se registra y a quién se remite · ☐ Encauzamiento a la instancia competente (no al Comité de Convivencia si hay componente sexual) · ☐ Registro mínimo con reserva · ☐ Seguimiento acordado (F-26; F-04, arts. 5, 11 y 13; F-06, art. 6, parágrafo 1).'
      ] }
    ],
    referencias: ['F-02', 'F-03', 'F-04', 'F-05', 'F-06', 'F-08', 'F-26', 'F-28', 'F-29'],
    citasEnTexto: true,
    revision: { fecha: '2026-11-03', responsable: 'Equipo técnico Turquesa Hub (redacción inicial)' },
    estado: 'en-revision-tecnica', revisionTecnica: 'pendiente', revisionJuridica: 'pendiente', revisionPsicosocial: 'pendiente',
    referencial: true, version: '1.0', autor: 'Equipo técnico Turquesa Hub', fecha: '2026-11-03' },

  // ============================================================
  // 5. PROTECCIÓN DE DATOS PERSONALES
  // ============================================================
  { id: 'rec-datos',
    titulo: 'Protección de datos personales en los procesos de prevención',
    categoria: 'Guía práctica', tema: 'Protección de datos',
    descripcion: 'Principios y deberes del régimen colombiano de protección de datos aplicados a la información que generan las políticas, las quejas, las evidencias y los reportes de prevención de violencias en el trabajo.',
    publico: ['organizacion'], tiempoLectura: 10,
    objetivo: 'Orientar a las organizaciones sobre el tratamiento de la información personal que producen los procesos de prevención de violencias y acoso en el trabajo, conforme a la Ley 1581 de 2012 y a las reglas de confidencialidad y anonimización de la Ley 2365 de 2024 y del Decreto 1040 de 2026. La guía diferencia la información de gestión preventiva, que Turquesa Hub sí documenta, de la información sobre situaciones y personas afectadas, que corresponde al protocolo interno del empleador y que la plataforma no almacena.',
    secciones: [
      { titulo: 'Conceptos fundamentales', cuerpo: [
        'La Ley 1581 de 2012 establece los principios del tratamiento de datos personales: legalidad, finalidad, libertad, veracidad, transparencia, acceso y circulación restringida, seguridad y confidencialidad (F-03, art. 4). Para la prevención son especialmente relevantes la finalidad, que exige recoger cada dato para un propósito legítimo e informado; el acceso restringido; y la confidencialidad, que obliga a guardar reserva incluso después de terminada la labor (F-03, art. 4).',
        'Son datos sensibles los que afectan la intimidad o cuyo uso indebido puede generar discriminación, entre ellos los relativos a la salud, la vida sexual y los datos biométricos; su tratamiento está prohibido salvo excepciones, como la autorización explícita del titular (F-03, arts. 5 y 6). La información sobre una situación de acoso sexual o violencia de género contiene con frecuencia datos sensibles de la persona afectada y de la señalada (F-08, 2.2.1.8.2.4). Los responsables deben garantizar los derechos del titular, conservar la autorización, informar la finalidad, conservar la información con seguridad frente a adulteración, pérdida o acceso no autorizado, actualizarla y tramitar consultas y reclamos (F-03, art. 17).',
        'Las normas de prevención añaden reglas propias: derecho a la intimidad y la confidencialidad (F-04, art. 5); publicación semestral anonimizada de quejas y sanciones (F-04, art. 11, num. 7); protección de datos sensibles conforme a la Ley 1581, reserva de la queja compatible con el derecho de defensa y reporte estadístico anonimizado (F-08, 2.2.1.8.2.4, 2.2.1.8.3.4 (2.º) y 2.2.1.8.2.1, num. 8). Como referencia de buenas prácticas, la norma ISO 37002 describe canales de reporte confidenciales con protección de quien reporta; se cita como orientación, no como requisito (F-34).'
      ] },
      { titulo: 'Desarrollo técnico', cuerpo: [
        'Conviene distinguir cuatro tipos de información. Primero, la de gestión preventiva: política, protocolo, actas, registros de formación, planes de acción, diagnósticos agregados e indicadores; contiene pocos datos personales y puede documentarse como evidencia con minimización. Es la que Turquesa Hub permite registrar.',
        'Segundo, la de quejas y situaciones, dentro de la competencia del empleador: queja, entrevistas, pruebas, medidas, decisiones y seguimientos. Contiene datos sensibles y exige reserva, acceso restringido a quienes intervienen en la ruta, custodia segura, consentimiento informado para registro y remisión, y conservación limitada al tiempo necesario, incluidos posibles requerimientos de autoridades (F-03, arts. 4, 6 y 17; F-08, 2.2.1.8.2.4 y 2.2.1.8.3.4 (2.º)). No se registra en Turquesa Hub.',
        'Tercero, las evidencias de cumplimiento ante la inspección del trabajo o un auditor: existencia del protocolo, constancias de socialización, registros de formación y estadísticas anonimizadas, preparadas sin revelar identidades ni detalles de situaciones (F-04, art. 11, num. 7; F-08, 2.2.1.8.2.1). Cuarto, los reportes externos: publicación semestral anonimizada y remisión al SIVIGE (F-04, art. 11, num. 7) e informes trimestrales del Comité de Convivencia a la alta dirección (F-06, art. 8). La anonimización debe ser efectiva: en organizaciones pequeñas, un reporte por área o cargo puede identificar a una persona aunque omita su nombre.',
        'Canales confidenciales. El canal de quejas debe garantizar que solo las personas designadas acceden a su contenido, que la identidad de quien reporta se protege frente a represalias y que las quejas verbales se registran con las mismas garantías (F-04, art. 15; F-08, 2.2.1.8.2.6 y 2.2.1.8.2.7; F-34). El Comité de Convivencia debe tener acuerdos de confidencialidad en su reglamento y espacio para el manejo reservado de documentos (F-06, arts. 4, 8 y 13).'
      ] },
      { titulo: 'Aplicación en una organización colombiana', cuerpo: [
        'La organización, como responsable del tratamiento, debería contar con una política de datos que contemple expresamente la información del protocolo de prevención: finalidad, personas autorizadas, seguridad, plazos de conservación y atención de consultas (F-03, arts. 4 y 17), articulada con el protocolo, que describe qué se registra en cada momento de la ruta, quién accede y cómo se custodia (F-08, 2.2.1.8.2.1 y 2.2.1.8.3.4 (2.º)). Quienes intervienen en la ruta deberían firmar compromisos de confidencialidad y recibir formación en datos sensibles (F-03, art. 4; F-06, art. 4). La reserva se equilibra con el derecho de defensa: la persona señalada conoce los hechos que se le atribuyen y se defiende, sin acceso irrestricto a datos sensibles de la afectada ni confrontación (F-08, 2.2.1.8.3.4 (2.º); F-04, art. 5).',
        'En Turquesa Hub la organización registra información de gestión preventiva y evidencias agregadas. La plataforma no solicita ni debe recibir información sobre personas afectadas, señaladas ni situaciones; si se incluye por error en un campo de texto, debe eliminarse y notificar a la FMA. Los datos de los responsables de prevención se tratan con los principios de la Ley 1581 de 2012 (F-03, art. 4).'
      ] },
      { titulo: 'Situación práctica', cuerpo: [
        'Una empresa de tecnología recibe de la inspección del trabajo una solicitud de evidencias sobre su protocolo de acoso sexual. La analista de talento humano prepara una carpeta compartida con el protocolo, las actas de socialización y, para demostrar que la ruta funciona, copia de las tres quejas del año con nombres, cargos y entrevistas completas, y la comparte con la gerencia, el área jurídica externa y la consultora de calidad. Además publica en la intranet un informe semestral que indica que una queja provino del área de diseño, de cuatro personas. Los hechos son ficticios y no identifican a ninguna persona ni organización real.'
      ], lista: [
        '¿Qué principios de la Ley 1581 de 2012 se vulneran al compartir las quejas completas? (F-03, art. 4)',
        '¿Por qué las entrevistas contienen datos sensibles y qué exige su tratamiento? (F-03, arts. 5 y 6; F-08, 2.2.1.8.2.4)',
        '¿Qué evidencias habrían bastado ante la inspección sin revelar identidades? (F-04, art. 11, num. 7; F-08, 2.2.1.8.2.1)',
        '¿Por qué el informe semestral no está efectivamente anonimizado? (F-04, art. 11, num. 7)',
        '¿Qué deberes del responsable se incumplen y qué medidas correctivas proceden? (F-03, art. 17)'
      ] },
      { titulo: 'Acciones recomendadas', lista: [
        'Incluir en la política de datos un apartado sobre la información del protocolo de prevención, con finalidad, autorizados, seguridad, conservación y consultas (F-03, arts. 4 y 17).',
        'Definir en el protocolo qué se registra en cada momento, en qué soporte, quién accede y cómo se custodia, con minimización (F-03, art. 4; F-08, 2.2.1.8.3.4 (2.º)).',
        'Obtener consentimiento informado para el registro y la remisión, salvo riesgo inminente conforme al protocolo (F-03, art. 6; F-08, 2.2.1.8.2.4).',
        'Suscribir compromisos de confidencialidad con quienes intervienen en la ruta y con el Comité de Convivencia (F-03, art. 4; F-06, art. 4).',
        'Separar la información de situaciones de la de gestión preventiva, con controles de acceso diferenciados (F-03, art. 17; F-06, art. 13).',
        'Agregar los reportes semestrales y las estadísticas a un nivel que impida la reidentificación (F-04, art. 11, num. 7).',
        'Preparar un paquete estándar de evidencias de cumplimiento sin datos de situaciones concretas (F-08, 2.2.1.8.2.1).',
        'Establecer plazos de conservación y eliminación segura de situaciones cerradas, considerando posibles actuaciones de autoridades (F-03, art. 4).',
        'Verificar que ningún campo de Turquesa Hub contiene información sobre personas afectadas o situaciones.'
      ] },
      { titulo: 'Errores frecuentes', lista: [
        'Compartir expedientes de quejas para demostrar que el protocolo funciona → Las evidencias deben ser agregadas y anonimizadas (F-03, art. 4; F-04, art. 11, num. 7).',
        'Publicar estadísticas por área o cargo en organizaciones pequeñas → Pueden reidentificar (F-04, art. 11, num. 7).',
        'Registrar quejas en hojas de cálculo o carpetas sin control de acceso → Incumple seguridad y acceso restringido (F-03, arts. 4 y 17).',
        'Tratar los datos de una situación como ordinarios → Suelen ser sensibles (F-03, arts. 5 y 6).',
        'Entregar a la persona señalada copia íntegra del expediente invocando el derecho de defensa → Se garantiza con el conocimiento de los hechos atribuidos, sin acceso irrestricto a datos de terceros (F-08, 2.2.1.8.3.4 (2.º)).',
        'Conservar indefinidamente situaciones cerradas → La conservación se limita a la finalidad (F-03, art. 4).',
        'Registrar en Turquesa Hub nombres de personas afectadas o descripciones de situaciones → La plataforma documenta gestión preventiva.'
      ] },
      { titulo: 'Herramienta o lista de verificación', lista: [
        'POLÍTICAS Y PROTOCOLO · ☐ La política de datos contempla la información del protocolo de prevención (F-03, arts. 4 y 17) · ☐ El protocolo define qué se registra, quién accede y cómo se custodia en cada momento (F-08, 2.2.1.8.3.4 (2.º)) · ☐ Compromisos de confidencialidad firmados por la ruta y el Comité (F-06, art. 4).',
        'QUEJAS (competencia del empleador) · ☐ Canal con acceso restringido a las personas designadas (F-08, 2.2.1.8.2.6; F-34) · ☐ Consentimiento informado para registro y remisión (F-03, art. 6; F-08, 2.2.1.8.2.4) · ☐ Datos sensibles identificados con protección reforzada (F-03, arts. 5 y 6) · ☐ Reserva equilibrada con el derecho de defensa (F-08, 2.2.1.8.3.4 (2.º)) · ☐ Plazo de conservación y eliminación segura (F-03, art. 4).',
        'EVIDENCIAS · ☐ Sin identidades ni detalles de situaciones (F-08, 2.2.1.8.2.1) · ☐ Registros de formación con minimización (F-03, art. 4) · ☐ Información de situaciones separada de la de gestión con controles diferenciados (F-03, art. 17).',
        'REPORTES · ☐ Reporte semestral anonimizado y agregado para impedir reidentificación, remitido al SIVIGE (F-04, art. 11, num. 7) · ☐ Informes del Comité sin identidades (F-06, art. 8) · ☐ Ningún campo de Turquesa Hub con información de personas afectadas ni situaciones.'
      ] }
    ],
    referencias: ['F-03', 'F-04', 'F-06', 'F-08', 'F-34'],
    citasEnTexto: true,
    revision: { fecha: '2026-11-03', responsable: 'Equipo técnico Turquesa Hub (redacción inicial)' },
    estado: 'en-revision-tecnica', revisionTecnica: 'pendiente', revisionJuridica: 'pendiente', revisionPsicosocial: 'no-aplica',
    referencial: true, version: '1.0', autor: 'Equipo técnico Turquesa Hub', fecha: '2026-11-03' },

  // ============================================================
  // FICHAS NORMATIVAS (REFERENCIALES)
  // ============================================================
  { id: 'rec-ficha-1010',
    titulo: 'Ficha normativa: Ley 1010 de 2006 (acoso laboral)',
    categoria: 'Ficha normativa', tema: 'Marco normativo',
    descripcion: 'Identificación, contenido relevante y aplicación organizacional de la ley que adopta medidas para prevenir, corregir y sancionar el acoso laboral en Colombia.',
    publico: ['organizacion', 'colaborador'], tiempoLectura: 6,
    fuente: 'Ley 1010 de 2006 (23 de enero). Función Pública, Gestor Normativo (enlace registrado en FUENTES.md, F-01; estado V: texto contrastado el 2026-11-03 en la Secretaría Jurídica Distrital, sisjur i=18843, y en la compilación de Colpensiones).',
    fechaVerificacion: '2026-11-03', responsableVerificacion: 'Pendiente: profesional jurídica autorizada por la FMA',
    objetivo: 'Presentar de manera referencial la Ley 1010 de 2006, norma de base sobre acoso laboral en Colombia: objeto, modalidades, medidas preventivas y relación con las normas posteriores sobre acoso sexual y violencia en el trabajo. Esta ficha es orientativa, no reproduce el texto legal y no sustituye la asesoría jurídica.',
    secciones: [
      { titulo: 'Conceptos fundamentales', cuerpo: [
        'Identificación. Ley 1010 de 2006, del 23 de enero, por medio de la cual se adoptan medidas para prevenir, corregir y sancionar el acoso laboral y otros hostigamientos en el marco de las relaciones de trabajo (F-01).',
        'Objeto. Prevenir, corregir y sancionar las formas de agresión, maltrato y trato ofensivo contra quienes trabajan en una relación laboral, protegiendo el trabajo digno, la libertad, la intimidad, la honra y la salud mental (F-01). Por remisión de la Ley 2365 de 2024 se aplica en lo no previsto en materia de acoso sexual (F-04, art. 17); la Ley 2466 de 2025 no la modifica ni la deroga y remite a ella (F-05, art. 18).'
      ] },
      { titulo: 'Desarrollo técnico', cuerpo: [
        'Definición y modalidades. Acoso laboral es la conducta persistente y demostrable ejercida sobre una persona trabajadora por un empleador, un superior, un compañero o un subalterno, encaminada a infundir miedo, intimidación o angustia, a causar perjuicio laboral, a generar desmotivación o a inducir la renuncia; sus modalidades son maltrato, persecución, discriminación, entorpecimiento, inequidad y desprotección laboral (F-01, art. 2; el numeral 3, discriminación laboral, fue modificado por la Ley 1622 de 2013). Conductas. El artículo 7 enumera conductas que se presumen acoso cuando son repetidas y públicas, como agresiones, injurias, descalificaciones, amenazas injustificadas de despido, exigencias desproporcionadas o aislamiento; excepcionalmente un solo acto hostil puede bastar según su gravedad (F-01, art. 7). La calificación corresponde a la instancia competente.',
        'Medidas preventivas y correctivas. Los reglamentos de trabajo deben prever mecanismos de prevención y un procedimiento interno, confidencial, conciliatorio y efectivo, base del Comité de Convivencia Laboral regulado hoy por la Resolución 3461 de 2025 (F-01, art. 9; F-06). La víctima puede denunciar ante inspectores de trabajo, inspectores de policía, personeros o Defensoría del Pueblo, y la omisión de las medidas se entiende como tolerancia del acoso (F-01, art. 9). La Ley 2365 de 2024 adicionó la obligación de una campaña inmediata de acción colectiva ante presunto acoso sexual (F-01, art. 9, num. 10; F-04, art. 16).',
        'Sanciones, garantías y competencia. El artículo 10 fija el régimen sancionatorio, con consecuencias disciplinarias, laborales y económicas (F-01, art. 10). La terminación del vínculo de quien usó los procedimientos carece de efecto si ocurre dentro de los seis meses siguientes, si se verifican los hechos, garantía que cubre a los testigos (F-01, art. 11). Las sanciones las imponen los jueces de trabajo cuando la víctima es trabajadora del sector privado, y el Ministerio Público o las instancias disciplinarias de la Rama Judicial cuando es servidora pública (F-01, art. 12). La Sentencia C-217 de 2026 se inhibió frente a una demanda contra el parágrafo del artículo 1; su alcance debe verificarse en la sentencia (F-07).'
      ] },
      { titulo: 'Aplicación en una organización colombiana', cuerpo: [
        'La ley implica un reglamento interno con mecanismos de prevención y procedimiento interno (F-01, art. 9), un Comité de Convivencia Laboral conforme a la Resolución 3461 de 2025 (F-06, arts. 3, 5 y 6) y formación a jefaturas y colaboradores en las modalidades y conductas. La organización debe distinguir el acoso laboral del acoso sexual, que tiene norma y procedimiento propios fuera del Comité (F-04, art. 17; F-06, art. 6, parágrafo 1), e integrar ambos en la política única exigida por la Ley 2466 de 2025 y el Decreto 1040 de 2026 (F-05, art. 18; F-08, 2.2.1.8.2.1).'
      ] },
      { titulo: 'Situación práctica', cuerpo: [
        'Una empresa de transporte con treinta personas tiene un reglamento de hace quince años sin mención del acoso laboral y un Comité de Convivencia elegido hace cuatro años, sin renovar. Un conductor manifiesta que su jefe le asigna sistemáticamente las rutas más largas, le niega información sobre turnos y lo descalifica delante de los demás. La gerencia lo considera un problema de carácter. Los hechos son ficticios y no identifican a ninguna persona ni organización real.'
      ], lista: [
        '¿Qué modalidades de acoso laboral podrían estar presentes? (F-01, art. 2)',
        '¿Qué conductas del artículo 7 se relacionan con los hechos? (F-01, art. 7)',
        '¿Qué incumplimientos presenta la empresa respecto del reglamento y del Comité? (F-01, art. 9; F-06, arts. 3 y 5)',
        '¿Por qué tratarlo como problema de carácter no exime de activar el procedimiento? (F-01, art. 9)'
      ] },
      { titulo: 'Acciones recomendadas', lista: [
        'Actualizar el reglamento interno con los mecanismos de prevención y el procedimiento interno (F-01, art. 9).',
        'Conformar o renovar el Comité de Convivencia conforme a la Resolución 3461 de 2025 (F-06, arts. 3, 4 y 5).',
        'Formar a jefaturas y colaboradores en modalidades y conductas de acoso laboral (F-01, arts. 2 y 7; F-06, art. 12).',
        'Integrar el acoso laboral en la política única con vías internas diferenciadas (F-05, art. 18; F-08, 2.2.1.8.2.1).',
        'Someter la aplicación de la ley a revisión jurídica (F-01, arts. 10 y 12).'
      ] },
      { titulo: 'Errores frecuentes', lista: [
        'Considerar que cualquier conducta aislada es acoso laboral → Como regla exige persistencia, aunque excepcionalmente un solo acto hostil puede bastar según su gravedad (F-01, arts. 2 y 7).',
        'Aplicar el procedimiento de la Ley 1010 al acoso sexual → Tiene norma y procedimiento propios; la Ley 1010 rige solo en lo no previsto (F-04, art. 17; F-06, art. 6, parágrafo 1).',
        'Creer que el Comité de Convivencia sanciona → Previene, orienta y concilia; las sanciones de la ley las imponen jueces o Ministerio Público (F-06, art. 6; F-01, arts. 10 y 12).',
        'Suponer que la Ley 2466 de 2025 derogó la Ley 1010 → No la modifica ni la deroga (F-05, art. 18).'
      ] },
      { titulo: 'Herramienta o lista de verificación', lista: [
        'Lista orientativa de cumplimiento. No sustituye la asesoría jurídica ni la verificación por profesional competente.',
        '☐ Reglamento interno con mecanismos de prevención y procedimiento interno confidencial, conciliatorio y efectivo (F-01, art. 9).',
        '☐ Comité de Convivencia conformado según tamaño y centros de trabajo, con periodo vigente (F-06, arts. 3 y 5).',
        '☐ Personas formadas en las seis modalidades y en las conductas constitutivas (F-01, arts. 2 y 7).',
        '☐ Procedimiento con plazos conforme a la Resolución 3461 de 2025 e informes a la alta dirección (F-06, arts. 6 y 8).',
        '☐ El protocolo encauza el acoso sexual fuera del Comité (F-06, art. 6, parágrafo 1).',
        '☐ Revisión jurídica con fecha registrada.'
      ] }
    ],
    referencias: ['F-01', 'F-04', 'F-05', 'F-06', 'F-07', 'F-08'],
    citasEnTexto: true,
    revision: { fecha: '2026-11-03', responsable: 'Equipo técnico Turquesa Hub (redacción inicial)' },
    estado: 'en-revision-tecnica', revisionTecnica: 'pendiente', revisionJuridica: 'pendiente', revisionPsicosocial: 'no-aplica',
    referencial: true, version: '1.0', autor: 'Equipo técnico Turquesa Hub', fecha: '2026-11-03' },

  { id: 'rec-ficha-1257',
    titulo: 'Ficha normativa: Ley 1257 de 2008 (violencias contra las mujeres)',
    categoria: 'Ficha normativa', tema: 'Marco normativo',
    descripcion: 'Identificación, contenido relevante y aplicación organizacional de la ley de sensibilización, prevención y sanción de formas de violencia y discriminación contra las mujeres, y de su reglamentación laboral parcial.',
    publico: ['organizacion', 'colaborador'], tiempoLectura: 6,
    fuente: 'Ley 1257 de 2008 (4 de diciembre) y Decreto 4463 de 2011. Función Pública, Gestor Normativo (enlaces registrados en FUENTES.md, F-02 y F-10; estado V: la ley se contrastó el 2026-11-03 en sisjur i=34054 y Colpensiones; el Decreto 4463 en la compilación del INVIMA, compilado en los arts. 2.2.6.7.1 a 2.2.6.7.5 del Decreto 1072 de 2015).',
    fechaVerificacion: '2026-11-03', responsableVerificacion: 'Pendiente: profesional jurídica autorizada por la FMA',
    objetivo: 'Presentar de manera referencial la Ley 1257 de 2008 y su reglamentación laboral parcial: definición de violencia contra la mujer, principios y medidas en el ámbito laboral. Esta ficha es orientativa, no reproduce el texto legal y no sustituye la asesoría jurídica.',
    secciones: [
      { titulo: 'Conceptos fundamentales', cuerpo: [
        'Identificación. Ley 1257 de 2008, del 4 de diciembre, por la cual se dictan normas de sensibilización, prevención y sanción de formas de violencia y discriminación contra las mujeres (F-02). Su artículo 12, sobre medidas en el ámbito laboral, fue reglamentado parcialmente por el Decreto 4463 de 2011, compilado en los artículos 2.2.6.7.1 a 2.2.6.7.5 del Decreto 1072 de 2015 (F-10; F-11).',
        'Objeto. Garantizar a las mujeres una vida libre de violencia en los ámbitos público y privado y el acceso a procedimientos para su protección y atención (F-02). Es el marco general de las violencias basadas en género contra las mujeres; la Ley 2466 de 2025 remite a ella como referencia de los protocolos del empleador (F-05, art. 18).'
      ] },
      { titulo: 'Desarrollo técnico', cuerpo: [
        'Definición y daños. Violencia contra la mujer es cualquier acción u omisión que le cause muerte, daño o sufrimiento físico, sexual, psicológico, económico o patrimonial por su condición de mujer, incluidas las amenazas, la coacción y la privación arbitraria de la libertad (F-02, art. 2); los tipos de daño son psicológico, físico, sexual y patrimonial (F-02, art. 3).',
        'Principios. Igualdad real, no discriminación, derechos de las mujeres como derechos humanos, corresponsabilidad de la sociedad y la familia, integralidad de la atención, autonomía para decidir y atención diferenciada (F-02, art. 6). Orientan a cualquier entidad que recibe u orienta una situación, incluidas las organizaciones empleadoras.',
        'Ámbito laboral. El artículo 12 contempla medidas para el reconocimiento del trabajo de las mujeres, la igualdad salarial y la prevención de las violencias (F-02, art. 12). El Decreto 4463 de 2011 las desarrolla con un programa de equidad laboral con enfoque diferencial y de género, la inclusión del daño por acoso sexual como riesgo laboral y la asesoría de las administradoras de riesgos en protocolos de recepción de quejas (F-10). La reforma laboral añade el deber de atender con diligencia las órdenes de autoridad a favor de víctimas y el derecho preferente a reubicación sin desmejora de trabajadoras víctimas de violencia de pareja, intrafamiliar o tentativa de feminicidio comprobada (F-05, art. 15, nums. 15 y 16).'
      ] },
      { titulo: 'Aplicación en una organización colombiana', cuerpo: [
        'La ley opera en dos planos. Orienta la prevención de las violencias que ocurren en el trabajo con sus principios, que deben reflejarse en la política y el protocolo (F-02, art. 6; F-08, 2.2.1.8.2.1). Y exige reconocer que las violencias sufridas fuera del trabajo, en especial de pareja o intrafamiliar, afectan la seguridad y el desempeño, con deberes de apoyo, reubicación preferente y cumplimiento de órdenes de autoridad (F-02, art. 12; F-05, art. 15). El protocolo debería prever medidas laborales de apoyo a solicitud de la trabajadora, sin exigirle pruebas, y la articulación con comisarías de familia, Fiscalía y sector salud. La organización no investiga hechos ocurridos fuera del ámbito laboral; apoya, protege en lo que le compete y facilita el acceso a las rutas.'
      ] },
      { titulo: 'Situación práctica', cuerpo: [
        'Una cajera de supermercado pide cambiar de sede porque su expareja la espera a la salida y la ha amenazado, y solicita permiso para una audiencia en la comisaría de familia. El jefe responde que la empresa no interviene en asuntos personales y que, si falta, se le descontará el día. Los hechos son ficticios y no identifican a ninguna persona ni organización real.'
      ], lista: [
        '¿Qué tipo de violencia describe la situación y por qué la Ley 1257 de 2008 es aplicable aunque ocurra fuera del trabajo? (F-02, arts. 2 y 3)',
        '¿Qué deberes del empleador establece la reforma laboral ante la reubicación y las órdenes de la comisaría? (F-05, art. 15, nums. 15 y 16)',
        '¿Qué principios desconoce la respuesta del jefe? (F-02, art. 6)',
        '¿Qué prohibición del artículo 59 del CST se comprometería si se la discrimina por ser víctima? (F-05, art. 17)'
      ] },
      { titulo: 'Acciones recomendadas', lista: [
        'Incorporar en la política los principios de la Ley 1257 de 2008 y una sección sobre violencias que ocurren fuera del trabajo (F-02, art. 6; F-08, 2.2.1.8.2.1).',
        'Prever medidas laborales de apoyo y reubicación preferente sin desmejora (F-05, art. 15, num. 16; F-02, art. 12).',
        'Establecer un procedimiento para atender órdenes de autoridades a favor de víctimas (F-05, art. 15, num. 15).',
        'Formar a jefaturas para reconocer estas situaciones sin exigir pruebas ni juzgar (F-02, art. 6).',
        'Verificar con asesoría jurídica la vigencia del Decreto 4463 de 2011 (F-10).'
      ] },
      { titulo: 'Errores frecuentes', lista: [
        'Considerar la violencia de pareja como ajena a la organización → Existen deberes de apoyo, reubicación y cumplimiento de órdenes (F-02, art. 12; F-05, art. 15).',
        'Exigir denuncia o pruebas para conceder apoyo → Contraría la autonomía y la atención diferenciada (F-02, art. 6).',
        'Investigar o mediar en hechos ocurridos fuera del trabajo → Corresponde a las autoridades (F-02, art. 6).',
        'Discriminar o desvincular a una trabajadora por ser víctima → Prohibido al empleador (F-05, art. 17).'
      ] },
      { titulo: 'Herramienta o lista de verificación', lista: [
        'Lista orientativa de cumplimiento. No sustituye la asesoría jurídica ni la verificación por profesional competente.',
        '☐ Política y protocolo con los principios de no discriminación, corresponsabilidad, integralidad, autonomía y atención diferenciada (F-02, art. 6).',
        '☐ Medidas laborales de apoyo y reubicación preferente para víctimas de violencia de pareja o intrafamiliar (F-05, art. 15, num. 16).',
        '☐ Procedimiento para atender órdenes de autoridades (F-05, art. 15, num. 15).',
        '☐ Jefaturas formadas para reconocer y encauzar sin exigir pruebas (F-02, art. 6).',
        '☐ Directorio territorial con comisarías de familia, Fiscalía y sector salud verificados.',
        '☐ Revisión jurídica de la ley y del Decreto 4463 de 2011 con fecha registrada (F-10).'
      ] }
    ],
    referencias: ['F-02', 'F-05', 'F-08', 'F-10'],
    citasEnTexto: true,
    revision: { fecha: '2026-11-03', responsable: 'Equipo técnico Turquesa Hub (redacción inicial)' },
    estado: 'en-revision-tecnica', revisionTecnica: 'pendiente', revisionJuridica: 'pendiente', revisionPsicosocial: 'no-aplica',
    referencial: true, version: '1.0', autor: 'Equipo técnico Turquesa Hub', fecha: '2026-11-03' },

  { id: 'rec-ficha-1581',
    titulo: 'Ficha normativa: Ley 1581 de 2012 (protección de datos personales)',
    categoria: 'Ficha normativa', tema: 'Marco normativo',
    descripcion: 'Identificación, contenido relevante y aplicación organizacional del régimen general de protección de datos personales en relación con los procesos de prevención de violencias en el trabajo.',
    publico: ['organizacion', 'colaborador'], tiempoLectura: 5,
    fuente: 'Ley 1581 de 2012 (17 de octubre), reglamentada por el Decreto 1377 de 2013, compilado en el Decreto 1074 de 2015. Función Pública, Gestor Normativo (enlace registrado en FUENTES.md, F-03; estado C). Los artículos 4, 5, 6 y 17 se contrastaron el 2026-11-03 con el texto publicado por la Secretaría Jurídica Distrital (sisjur i=49981).',
    fechaVerificacion: '2026-11-03', responsableVerificacion: 'Pendiente: profesional jurídica autorizada por la FMA',
    objetivo: 'Presentar de manera referencial la Ley 1581 de 2012 en lo que concierne a la información generada por los procesos de prevención de violencias: principios, datos sensibles y deberes de los responsables. Esta ficha es orientativa, no reproduce el texto legal y no sustituye la asesoría jurídica.',
    secciones: [
      { titulo: 'Conceptos fundamentales', cuerpo: [
        'Identificación. Ley 1581 de 2012, del 17 de octubre, por la cual se dictan disposiciones generales para la protección de datos personales, reglamentada por el Decreto 1377 de 2013 (F-03).',
        'Objeto. Desarrollar el derecho de las personas a conocer, actualizar y rectificar la información recogida sobre ellas, con principios, derechos de los titulares y deberes de responsables y encargados (F-03). Aplica a toda organización que recoja información personal, incluida la de políticas, formaciones, quejas y reportes de prevención. El Decreto 1040 de 2026 remite a ella para la protección de datos sensibles en la atención de situaciones (F-08, 2.2.1.8.2.4).'
      ] },
      { titulo: 'Desarrollo técnico', cuerpo: [
        'Principios. Legalidad, finalidad, libertad (autorización previa, expresa e informada, salvo mandato legal), veracidad, transparencia, acceso y circulación restringida, seguridad y confidencialidad (F-03, art. 4).',
        'Datos sensibles. Son los que afectan la intimidad o cuyo uso indebido puede generar discriminación, entre ellos los relativos a la salud, la vida sexual y los datos biométricos (F-03, art. 5). Su tratamiento está prohibido salvo excepciones: autorización explícita del titular, protección de su interés vital, ejercicio o defensa de un derecho en proceso judicial y fines históricos, estadísticos o científicos con supresión de identidad (F-03, art. 6). La información sobre situaciones de acoso sexual o violencia de género contiene habitualmente datos sensibles.',
        'Deberes de los responsables. Garantizar el hábeas data; solicitar y conservar copia de la autorización; informar finalidad y derechos; conservar la información con seguridad frente a adulteración, pérdida, consulta o acceso no autorizado; actualizar y rectificar; tramitar consultas y reclamos en los plazos legales; adoptar un manual interno de políticas y procedimientos; informar a la autoridad las violaciones a los códigos de seguridad; y cumplir las instrucciones de la Superintendencia de Industria y Comercio (F-03, art. 17).'
      ] },
      { titulo: 'Aplicación en una organización colombiana', cuerpo: [
        'La organización es responsable del tratamiento de la información de sus procesos de prevención: necesita una política que la cubra, autorizaciones cuando corresponda, minimización, acceso restringido y seguridad (F-03, arts. 4 y 17). Las quejas y expedientes, por contener datos sensibles, exigen reserva reforzada, consentimiento informado y separación de la información de gestión preventiva (F-03, arts. 5 y 6; F-08, 2.2.1.8.3.4 (2.º)). La ley se articula con la confidencialidad y la anonimización propias de la prevención de violencias (F-04, arts. 5 y 11; F-08, 2.2.1.8.3.4 (2.º); F-06, art. 4), desarrolladas en la guía de protección de datos de esta biblioteca.'
      ] },
      { titulo: 'Situación práctica', cuerpo: [
        'Una cooperativa aplica una encuesta de clima con preguntas sobre si la persona ha vivido situaciones de acoso, con nombre y cédula para evitar duplicados. Los resultados se guardan en un computador sin contraseña y se comparten por correo con el consejo de administración con los nombres de quienes respondieron afirmativamente. Los hechos son ficticios y no identifican a ninguna persona ni organización real.'
      ], lista: [
        '¿Qué principios se vulneran en la recolección, el almacenamiento y la circulación? (F-03, art. 4)',
        '¿Por qué esas respuestas pueden ser datos sensibles y qué exige su tratamiento? (F-03, arts. 5 y 6)',
        '¿Qué deberes del responsable se incumplen? (F-03, art. 17)',
        '¿Cómo diseñar la encuesta para cumplir la finalidad sin datos identificables? (F-03, art. 4)'
      ] },
      { titulo: 'Acciones recomendadas', lista: [
        'Actualizar la política de tratamiento para incluir la información de prevención de violencias (F-03, arts. 4 y 17).',
        'Diseñar diagnósticos de forma anónima o agregada, sin solicitar relatos personales de violencia (F-03, art. 4).',
        'Identificar los datos sensibles de quejas y expedientes y aplicarles consentimiento, reserva y acceso restringido (F-03, arts. 5 y 6).',
        'Implementar seguridad proporcional: control de acceso, custodia, trazabilidad y eliminación segura (F-03, art. 17).',
        'Formar a quienes tratan esta información y suscribir compromisos de confidencialidad (F-03, art. 4; F-06, art. 4).'
      ] },
      { titulo: 'Errores frecuentes', lista: [
        'Recoger datos identificables en diagnósticos de clima → Contraría la minimización; se diseñan anónimos (F-03, art. 4).',
        'Tratar la información de quejas como información ordinaria → Contiene datos sensibles (F-03, arts. 5 y 6).',
        'Compartir expedientes con instancias ajenas a la ruta → Vulnera el acceso restringido (F-03, art. 4).',
        'Carecer de política o manual interno para esta información → Es deber expreso del responsable (F-03, art. 17).'
      ] },
      { titulo: 'Herramienta o lista de verificación', lista: [
        'Lista orientativa de cumplimiento. No sustituye la asesoría jurídica ni la verificación por profesional competente.',
        '☐ Política de tratamiento que contempla la información de prevención, disponible para los titulares (F-03, arts. 4 y 17).',
        '☐ Autorización previa, expresa e informada, y explícita para datos sensibles (F-03, arts. 4 y 6).',
        '☐ Datos sensibles identificados con tratamiento restringido (F-03, arts. 5 y 6).',
        '☐ Medidas de seguridad documentadas para la información de situaciones (F-03, art. 17).',
        '☐ Procedimiento de consultas y reclamos (F-03, art. 17).',
        '☐ Compromisos de confidencialidad firmados (F-03, art. 4).',
        '☐ Revisión jurídica con fecha registrada.'
      ] }
    ],
    referencias: ['F-03', 'F-04', 'F-06', 'F-08'],
    citasEnTexto: true,
    revision: { fecha: '2026-11-03', responsable: 'Equipo técnico Turquesa Hub (redacción inicial)' },
    estado: 'en-revision-tecnica', revisionTecnica: 'pendiente', revisionJuridica: 'pendiente', revisionPsicosocial: 'no-aplica',
    referencial: true, version: '1.0', autor: 'Equipo técnico Turquesa Hub', fecha: '2026-11-03' },

  { id: 'rec-ficha-2365',
    titulo: 'Ficha normativa: Ley 2365 de 2024 (acoso sexual en el ámbito laboral)',
    categoria: 'Ficha normativa', tema: 'Marco normativo',
    descripcion: 'Identificación, contenido relevante y aplicación organizacional de la ley de prevención, protección y atención del acoso sexual en el ámbito laboral y educativo, y de la Circular 0076 de 2025 que la desarrolla.',
    publico: ['organizacion', 'colaborador'], tiempoLectura: 7,
    fuente: 'Ley 2365 de 2024 (20 de junio, D.O. 52.793), consultada en compilación normativa oficial (F-04, estado V); Circular 0076 de 2025 del Ministerio del Trabajo (20 de junio), consultada en compilación normativa (F-09, estado V).',
    fechaVerificacion: '2026-11-03', responsableVerificacion: 'Pendiente: profesional jurídica autorizada por la FMA',
    objetivo: 'Presentar de manera referencial la Ley 2365 de 2024, norma específica sobre acoso sexual en el ámbito laboral, y la Circular 0076 de 2025: definición, ámbito, derechos, obligaciones del empleador, garantías de protección y mecanismos de queja. Esta ficha es orientativa, no reproduce el texto legal y no sustituye la asesoría jurídica.',
    secciones: [
      { titulo: 'Conceptos fundamentales', cuerpo: [
        'Identificación. Ley 2365 de 2024, del 20 de junio, Diario Oficial 52.793, por medio de la cual se adoptan medidas de prevención, protección y atención del acoso sexual en el ámbito laboral y en las instituciones de educación superior (F-04). Circular 0076 de 2025 del Ministerio del Trabajo, del 20 de junio, dirigida a empleadores, contratantes privados y ARL (F-09).',
        'Objeto. Establecer un marco específico para el acoso sexual con definición propia, derechos, obligaciones del empleador, garantías, estabilidad reforzada y mecanismos de queja. En lo no previsto se aplica la Ley 1010 de 2006 (F-04, art. 17). La Ley 2466 de 2025 remite a ella (F-05, art. 18) y el Decreto 1040 de 2026 la desarrolla (F-08).'
      ] },
      { titulo: 'Desarrollo técnico', cuerpo: [
        'Definición y ámbito. Acoso sexual es todo acto de persecución, hostigamiento o asedio de carácter o connotación sexual, lasciva o libidinosa, en relaciones de poder verticales u horizontales, una o varias veces (F-04, art. 2). Se presume en contexto laboral cuando ocurre en el sitio de trabajo, en eventos relacionados, en comunicaciones digitales o en los trayectos, sin exigir relación contractual (F-04, art. 7).',
        'Derechos y obligaciones. La persona afectada tiene derecho al trato digno, la intimidad, la confidencialidad, la no revictimización y la no confrontación (F-04, art. 5). El empleador debe adoptar política, protocolos y rutas; garantizar mecanismos de atención, prevención y no repetición; proteger de inmediato; informar sobre la Fiscalía; remitir la queja a petición de la víctima; no revictimizar; y publicar semestralmente datos anonimizados con remisión al SIVIGE (F-04, art. 11).',
        'Garantías, estabilidad y queja. La víctima puede solicitar trato libre de estereotipos, atención por la ARL, traslado, teletrabajo, no interacción con la persona investigada, terminación sin preaviso, confidencialidad y no confrontación; traslado, teletrabajo, no interacción y terminación deben adoptarse en un término no superior a cinco días hábiles (F-04, art. 13). La terminación de quien presentó la queja carece de efecto dentro de los seis meses siguientes y se presume retaliación (F-04, art. 14). La queja puede presentarla cualquier persona que conozca los hechos, por medio electrónico, físico o verbal, y no es requisito para la denuncia penal (F-04, art. 15).',
        'Circular 0076 de 2025. Insta a adoptar de inmediato políticas, protocolos y rutas; recomienda diagnósticos periódicos; pide involucrar a sindicatos y grupos de mujeres, étnicos, con discapacidad y LGBTIQ+; dispone la no confrontación; exige debida diligencia reforzada para prevenir, investigar y sancionar, con reparación integral; y anuncia inspección y sanción. Cita la Sentencia T-104 de 2025 (F-09).'
      ] },
      { titulo: 'Aplicación en una organización colombiana', cuerpo: [
        'La organización necesita política y protocolo específicos, incorporados al reglamento y a los contratos, con ruta, responsables, medidas y plazos (F-04, art. 11). La instancia que recibe quejas no puede ser el Comité de Convivencia; la define la alta dirección o talento humano (F-06, art. 6, parágrafo 1). Investiga internamente con debida diligencia, protege, decide y repara dentro de su competencia, e informa y remite a las autoridades cuando corresponde (F-04, art. 11; F-09; F-08, 2.2.1.8.3.1). Debe además implementar una campaña inmediata de acción colectiva ante presunto acoso sexual, por la adición del numeral 10 al artículo 9 de la Ley 1010 (F-01, art. 9; F-04, art. 16), y coordinar con la ARL (F-04, art. 13, num. 2).'
      ] },
      { titulo: 'Situación práctica', cuerpo: [
        'Una constructora recibe verbalmente la queja de un ayudante de obra contra el maestro de obra por comentarios reiterados de connotación sexual; el ayudante pide cambio de frente de trabajo. El ingeniero residente anota la queja en su libreta y dos semanas después nada ha cambiado. Los hechos son ficticios y no identifican a ninguna persona ni organización real.'
      ], lista: [
        '¿Es válida la queja verbal y qué debió hacerse con ella? (F-04, art. 15; F-08, 2.2.1.8.2.6)',
        '¿Qué medida solicitó el ayudante y en qué plazo debió adoptarse? (F-04, art. 13)',
        '¿Qué información debió recibir sobre sus derechos y la Fiscalía? (F-04, arts. 5 y 11)',
        '¿Qué implica que el presunto acosador sea el superior jerárquico? (F-08, 2.2.1.8.3.10)'
      ] },
      { titulo: 'Acciones recomendadas', lista: [
        'Adoptar política y protocolo e incorporarlos al reglamento y a los contratos (F-04, art. 11; F-08, 2.2.1.8.2.2).',
        'Designar la instancia de recepción distinta del Comité de Convivencia (F-06, art. 6, parágrafo 1).',
        'Habilitar canales electrónicos, físicos y verbales con registro y confidencialidad (F-04, art. 15).',
        'Documentar las medidas de protección y el plazo de cinco días hábiles (F-04, art. 13).',
        'Incluir la información sobre la Fiscalía y la remisión a petición de la víctima (F-04, art. 11, nums. 4 y 5).',
        'Programar el reporte semestral anonimizado y los diagnósticos periódicos con participación (F-04, art. 11, num. 7; F-09).'
      ] },
      { titulo: 'Errores frecuentes', lista: [
        'Exigir repetición de la conducta → La ley admite una sola ocurrencia (F-04, art. 2).',
        'Desestimar quejas verbales → Son válidas y deben registrarse (F-04, art. 15; F-08, 2.2.1.8.2.6).',
        'Remitir al Comité de Convivencia o conciliar → No es competente; no es conciliable (F-06, art. 6, parágrafo 1).',
        'Terminar el contrato de quien presentó la queja dentro de los seis meses → Carece de efecto (F-04, art. 14).'
      ] },
      { titulo: 'Herramienta o lista de verificación', lista: [
        'Lista orientativa de cumplimiento. No sustituye la asesoría jurídica ni la verificación por profesional competente.',
        '☐ Política de prevención del acoso sexual adoptada, difundida e incorporada al reglamento y a los contratos (F-04, art. 11, num. 1).',
        '☐ Protocolo y ruta con responsables, medidas y plazos (F-04, arts. 11 y 13).',
        '☐ Instancia de recepción distinta del Comité de Convivencia (F-06, art. 6, parágrafo 1).',
        '☐ Canales electrónicos, físicos y verbales con registro (F-04, art. 15).',
        '☐ Información sobre la Fiscalía y remisión a petición de la víctima (F-04, art. 11, nums. 4 y 5).',
        '☐ Reporte semestral anonimizado y remisión al SIVIGE (F-04, art. 11, num. 7).',
        '☐ Coordinación con la ARL (F-04, art. 13, num. 2).',
        '☐ Revisión jurídica con fecha registrada.'
      ] }
    ],
    referencias: ['F-01', 'F-04', 'F-05', 'F-06', 'F-08', 'F-09'],
    citasEnTexto: true,
    revision: { fecha: '2026-11-03', responsable: 'Equipo técnico Turquesa Hub (redacción inicial)' },
    estado: 'en-revision-tecnica', revisionTecnica: 'pendiente', revisionJuridica: 'pendiente', revisionPsicosocial: 'no-aplica',
    referencial: true, version: '1.0', autor: 'Equipo técnico Turquesa Hub', fecha: '2026-11-03' },

  { id: 'rec-ficha-2466',
    titulo: 'Ficha normativa: Ley 2466 de 2025, artículo 18, y Decreto 1040 de 2026',
    categoria: 'Ficha normativa', tema: 'Marco normativo',
    descripcion: 'Identificación, contenido relevante y aplicación organizacional del artículo 18 de la reforma laboral sobre violencia, acoso y discriminación en el mundo del trabajo, y de su reglamentación por el Decreto 1040 de 2026.',
    publico: ['organizacion', 'colaborador'], tiempoLectura: 7,
    fuente: 'Ley 2466 de 2025 (25 de junio, D.O. 53.160), consultada en compilación normativa (F-05, estado V). Decreto 1040 de 2026, Ministerio del Trabajo (5 de agosto; D.O. 53.580 del 6 de agosto de 2026), consultado en las compilaciones oficiales de Colpensiones y de la Secretaría Jurídica Distrital (F-08, estado V). El texto oficial contiene dos artículos numerados 2.2.1.8.3.4 y ninguno 2.2.1.8.3.5; el segundo se cita aquí como 2.2.1.8.3.4 (2.º).',
    fechaVerificacion: '2026-11-03', responsableVerificacion: 'Pendiente: profesional jurídica autorizada por la FMA',
    objetivo: 'Presentar de manera referencial el artículo 18 de la Ley 2466 de 2025 y el Decreto 1040 de 2026, que configuran el marco integrado de prevención y atención de la violencia, el acoso y la discriminación en el mundo del trabajo. Esta ficha es orientativa, no reproduce el texto legal y no sustituye la asesoría jurídica.',
    secciones: [
      { titulo: 'Conceptos fundamentales', cuerpo: [
        'Identificación. Ley 2466 de 2025, del 25 de junio, Diario Oficial 53.160 (reforma laboral); su artículo 18 se titula Medidas para la eliminación de la violencia, el acoso y la discriminación en el mundo del trabajo (F-05). Decreto 1040 de 2026 del Ministerio del Trabajo, del 5 de agosto, que adiciona el Capítulo 8 al Título 1 de la Parte 2 del Libro 2 del Decreto 1072 de 2015 (artículos 2.2.1.8.1.1 a 2.2.1.8.3.10; el texto oficial repite el número 2.2.1.8.3.4 y no contiene 2.2.1.8.3.5), reglamenta los artículos 4, 15, 16, 17, 18 y 20 de la ley y desarrolla las Leyes 1010, 1257, 2365, 248 de 1995 y 2528 de 2025 (F-08; F-11).',
        'Objeto. El artículo 18 protege a toda persona sin importar su vínculo, incluidas las personas en formación, voluntarias y en búsqueda de empleo; define la violencia y el acoso con la fórmula del Convenio 190; incluye espacios físicos y digitales y a terceros; exige protocolos, comités y mecanismos conforme a las Leyes 1010, 1257 y 2365, con reparación y no repetición; asigna la vigilancia al Ministerio del Trabajo; y ordena una política pública en doce meses. No modifica ni deroga la Ley 1010 (F-05, art. 18).'
      ] },
      { titulo: 'Desarrollo técnico', cuerpo: [
        'Ley 2466 de 2025. Violencia y acoso son los comportamientos y prácticas inaceptables, o sus amenazas, únicos o repetidos, que causen o puedan causar daño físico, psicológico, sexual o económico, incluida la violencia por razón de género (F-05, art. 18). Los artículos 16 y 17 limitan el poder de subordinación con fines discriminatorios y adicionan prohibiciones al artículo 59 del CST, como discriminar a víctimas de violencias basadas en género; parte del artículo 17 fue afectada por la Sentencia C-081 de 2026 (F-05, arts. 16 y 17). El artículo 15 añade los deberes de atender órdenes de autoridad a favor de víctimas y de reubicación preferente (F-05, art. 15, nums. 15 y 16).',
        'Decreto 1040 de 2026, prevención. Política y protocolo participativos con cero tolerancia, ruta de orientación, recepción, investigación, protección y cierre, canales confidenciales, responsables, publicación y socialización, espacios anuales de formación y actualización, y reporte estadístico anonimizado (2.2.1.8.2.1); reglamentos y contratos (2.2.1.8.2.2); campañas y capacitación con enfoques diferenciales (2.2.1.8.2.3); atención con consentimiento informado, ARL, protección de datos y riesgo psicosocial en el SG-SST (2.2.1.8.2.4); medidas de protección sin prueba previa (2.2.1.8.2.5); canal de quejas electrónico, físico o verbal (2.2.1.8.2.6); protección frente a represalias (2.2.1.8.2.7) (F-08).',
        'Decreto 1040 de 2026, investigación y decisiones. Debida diligencia (2.2.1.8.3.1); enfoques diferenciados (2.2.1.8.3.2); pruebas con enfoque de género y flexibilización probatoria (2.2.1.8.3.3); presunción de discriminación en contextos de sujeción (2.2.1.8.3.4); protección a la intimidad y la dignidad, con reserva compatible con el derecho de defensa (2.2.1.8.3.4 (2.º)); garantías para acoso sexual en cinco días hábiles (2.2.1.8.3.7); decisiones con reparación y no repetición (2.2.1.8.3.8); proporcionalidad (2.2.1.8.3.9); competencia de la inspección del trabajo cuando el presunto acosador sexual es el superior jerárquico (2.2.1.8.3.10). Reconoce el derecho a no confrontación en casos de violencia basada en género (F-08, 2.2.1.8.1.8).'
      ] },
      { titulo: 'Aplicación en una organización colombiana', cuerpo: [
        'El conjunto implica una política única de prevención con un protocolo integrado que articule el Comité de Convivencia para el acoso laboral, el procedimiento designado para acoso sexual y violencia de género, el SG-SST y la ARL (F-05, art. 18; F-08, 2.2.1.8.2.1 y 2.2.1.8.2.4; F-06, art. 6, parágrafo 1). La protección cubre aprendices, practicantes, voluntarios, aspirantes y personas desvinculadas, lo que exige revisar contratos y formas de vinculación (F-05, art. 18; F-08, 2.2.1.8.2.2). La ausencia o falta de socialización de la política puede ser sancionada (F-08, 2.2.1.8.2.1). Al citar la Sección 3 en instrumentos internos debe tenerse en cuenta que el texto oficial repite el número 2.2.1.8.3.4 y carece de 2.2.1.8.3.5.'
      ] },
      { titulo: 'Situación práctica', cuerpo: [
        'Una fundación que opera con contratistas, voluntarios y practicantes tiene una política de convivencia pensada solo para su personal de planta. Una practicante reporta que un contratista le hace comentarios denigrantes sobre su origen étnico y la excluye de las reuniones. Su tutora responde que la política no cubre a practicantes ni contratistas. Los hechos son ficticios y no identifican a ninguna persona ni organización real.'
      ], lista: [
        '¿A quiénes protege el artículo 18 y por qué la respuesta de la tutora no se ajusta a él? (F-05, art. 18; F-08, 2.2.1.8.1.5)',
        '¿Qué categorías de conducta podrían estar presentes y qué norma rige cada una? (F-05, arts. 17 y 18; F-01, art. 2)',
        '¿Qué debería contener la política para cubrir esta situación? (F-08, 2.2.1.8.2.1 y 2.2.1.8.2.2)',
        '¿Qué autoridad vigila el cumplimiento? (F-05, art. 18)'
      ] },
      { titulo: 'Acciones recomendadas', lista: [
        'Ampliar la política y el protocolo a todas las personas vinculadas (F-05, art. 18; F-08, 2.2.1.8.2.2).',
        'Construir la política de forma participativa, publicarla y actualizarla con formación anual (F-08, 2.2.1.8.2.1).',
        'Incluir la ruta completa con reparación y no repetición (F-08, 2.2.1.8.2.1 y 2.2.1.8.3.8; F-05, art. 18).',
        'Articular con el SG-SST, el Comité de Convivencia y la ARL (F-08, 2.2.1.8.2.4).',
        'Obtener revisión jurídica del Decreto 1040 de 2026 y citarlo con la numeración oficial (F-08).'
      ] },
      { titulo: 'Errores frecuentes', lista: [
        'Limitar la política al personal de planta → Cubre contratistas, aprendices, practicantes, voluntarios y aspirantes (F-05, art. 18; F-08, 2.2.1.8.1.5).',
        'Suponer que la Ley 2466 de 2025 derogó la Ley 1010 → No la modifica ni la deroga (F-05, art. 18).',
        'Citar un artículo 2.2.1.8.3.5 del Decreto 1040 de 2026 → No existe: el texto oficial contiene dos artículos numerados 2.2.1.8.3.4 (presunción de discriminación; protección a la intimidad y la dignidad) (F-08).',
        'Exigir prueba para activar medidas de protección → Se activan sin prueba previa (F-08, 2.2.1.8.2.5).',
        'Conciliar situaciones de violencia de género → No son conciliables (F-08, 2.2.1.8.1.8; F-06, art. 6, parágrafo 1).'
      ] },
      { titulo: 'Herramienta o lista de verificación', lista: [
        'Lista orientativa de cumplimiento. No sustituye la asesoría jurídica ni la verificación por profesional competente.',
        '☐ Política única participativa con cero tolerancia (F-08, 2.2.1.8.2.1).',
        '☐ Cobertura de todas las personas vinculadas (F-05, art. 18).',
        '☐ Protocolo con ruta completa, canales confidenciales y responsables (F-08, 2.2.1.8.2.1).',
        '☐ Incorporación en reglamentos y contratos (F-08, 2.2.1.8.2.2).',
        '☐ Formación anual; articulación con SG-SST y ARL; protección de datos (F-08, 2.2.1.8.2.3 y 2.2.1.8.2.4).',
        '☐ Decisiones con reparación y no repetición; estadísticas anonimizadas (F-08, 2.2.1.8.3.8; F-05, art. 18).',
        '☐ Revisión jurídica con fecha; citas del decreto conforme a la numeración oficial (F-08).'
      ] }
    ],
    referencias: ['F-01', 'F-05', 'F-06', 'F-08', 'F-11'],
    citasEnTexto: true,
    revision: { fecha: '2026-11-03', responsable: 'Equipo técnico Turquesa Hub (redacción inicial)' },
    estado: 'en-revision-tecnica', revisionTecnica: 'pendiente', revisionJuridica: 'pendiente', revisionPsicosocial: 'no-aplica',
    referencial: true, version: '1.0', autor: 'Equipo técnico Turquesa Hub', fecha: '2026-11-03' },

  { id: 'rec-ficha-3461',
    titulo: 'Ficha normativa: Resolución 3461 de 2025 (Comité de Convivencia Laboral)',
    categoria: 'Ficha normativa', tema: 'Marco normativo',
    descripcion: 'Identificación, contenido relevante y aplicación organizacional de la resolución que regula la conformación y el funcionamiento del Comité de Convivencia Laboral y delimita su competencia frente al acoso sexual.',
    publico: ['organizacion', 'colaborador'], tiempoLectura: 6,
    fuente: 'Resolución 3461 de 2025, Ministerio del Trabajo (1 de septiembre; D.O. 53.240 del 11 de septiembre de 2025), consultada en compilación normativa y en Función Pública (F-06, estado V).',
    fechaVerificacion: '2026-11-03', responsableVerificacion: 'Pendiente: profesional jurídica autorizada por la FMA',
    objetivo: 'Presentar de manera referencial la Resolución 3461 de 2025, que reemplaza las Resoluciones 652 y 1356 de 2012: conformación, periodo, funciones, plazos, confidencialidad, responsabilidades del empleador y exclusión de competencia frente al acoso sexual. Esta ficha es orientativa, no reproduce el texto y no sustituye la asesoría jurídica.',
    secciones: [
      { titulo: 'Conceptos fundamentales', cuerpo: [
        'Identificación. Resolución 3461 de 2025 del Ministerio del Trabajo, del 1 de septiembre, Diario Oficial 53.240 del 11 de septiembre de 2025, que deroga las Resoluciones 652 y 1356 de 2012 (F-06, art. 16).',
        'Objeto. Establecer los lineamientos de conformación y funcionamiento del Comité de Convivencia Laboral en entidades públicas y empresas privadas, como instancia preventiva, orientadora, conciliadora y canalizadora de las quejas de acoso laboral conforme a la Ley 1010 de 2006 (F-06, art. 6; F-01, art. 9).'
      ] },
      { titulo: 'Desarrollo técnico', cuerpo: [
        'Conformación, reglamento y periodo. Representantes del empleador y de las personas trabajadoras, con suplentes, según el tamaño: menos de cinco trabajadores, uno por cada parte; más de cinco y menos de veinte, uno por cada parte con suplentes; más de veinte, dos por cada parte con suplentes (la resolución no regula expresamente los casos de exactamente cinco o veinte trabajadores). Con dos o más centros de trabajo, un comité central y uno por centro. Los representantes de las personas trabajadoras se eligen por votación secreta; no pueden integrarlo quienes hayan recibido queja o sido víctimas de acoso en el año anterior. Las empresas de servicios temporales coordinan con la usuaria, que tramita en primera instancia las quejas del personal en misión (F-06, art. 3). El Comité adopta un reglamento con acuerdos de confidencialidad (F-06, art. 4) y tiene periodo de dos años (F-06, art. 5).',
        'Funciones y plazos. Recibe y tramita quejas de acoso laboral en cinco días, escucha a las partes por separado, promueve compromisos y hace seguimiento mensual; el procedimiento no debería exceder sesenta y cinco días calendario. No determina si existe acoso. Sin acuerdo o con persistencia de la conducta, remite en el sector público a la Procuraduría o personerías y en el privado informa a la alta dirección y cierra (F-06, art. 6). Parágrafo 1: en los casos de acoso sexual, y en lo pertinente a la Ley 2365 de 2024, el Comité no es competente, ya que estas conductas no son conciliables; la alta dirección o la jefatura de talento humano debe establecer el procedimiento para recibir las quejas de presunto acoso sexual o violencia por razones de género y las medidas de atención, prevención y protección (F-06, art. 6, parágrafo 1).',
        'Otras disposiciones. La secretaría recibe quejas por escrito, cita a las partes, lleva actas y archivo con reserva y envía informes trimestrales a la alta dirección (F-06, art. 8). El empleador adopta medidas preventivas y correctivas, capacita a directivos, mandos medios y comité, ofrece primeros auxilios psicológicos con la ARL y facilita traslados cuando se recomienden (F-06, art. 12); asigna espacio, recursos y tiempo en la jornada (F-06, art. 13). El incumplimiento lo sancionan las direcciones territoriales del Ministerio del Trabajo (F-06, art. 15).'
      ] },
      { titulo: 'Aplicación en una organización colombiana', cuerpo: [
        'La organización debe revisar la conformación del Comité según su tamaño y centros de trabajo, con elección por votación secreta, reglamento y periodo vigente (F-06, arts. 3, 4 y 5), y asegurar que conoce sus plazos e informa trimestralmente (F-06, arts. 6 y 8). La decisión más relevante es establecer el procedimiento para acoso sexual y violencia por razones de género, separado del Comité (F-06, art. 6, parágrafo 1), articulado con la política única de la Ley 2466 de 2025 y el Decreto 1040 de 2026 (F-05, art. 18; F-08, 2.2.1.8.2.1), y formar al Comité para remitir esos componentes de inmediato.'
      ] },
      { titulo: 'Situación práctica', cuerpo: [
        'Una empresa de confecciones con ochenta personas y dos plantas en municipios distintos tiene un único Comité de Convivencia, con un representante por cada parte, conformado en 2022. Recibió hace tres meses una queja de acoso laboral y aún no ha citado a las partes. Los hechos son ficticios y no identifican a ninguna persona ni organización real.'
      ], lista: [
        '¿Qué ajustes de conformación exige la resolución por el tamaño y los dos centros de trabajo? (F-06, art. 3)',
        '¿Está vigente el periodo del Comité? (F-06, art. 5)',
        '¿Qué plazos se han incumplido? (F-06, art. 6)',
        '¿Qué responsabilidades del empleador podrían explicar la demora? (F-06, arts. 12 y 13)'
      ] },
      { titulo: 'Acciones recomendadas', lista: [
        'Ajustar la conformación según tamaño y centros de trabajo, con votación secreta (F-06, art. 3).',
        'Adoptar el reglamento con acuerdos de confidencialidad (F-06, art. 4).',
        'Registrar el inicio del periodo de dos años (F-06, art. 5).',
        'Establecer el procedimiento para acoso sexual y violencia de género a cargo de la alta dirección o talento humano (F-06, art. 6, parágrafo 1).',
        'Capacitar a directivos, mandos medios y comité y coordinar con la ARL (F-06, art. 12).',
        'Asignar espacio, recursos y tiempo (F-06, art. 13).'
      ] },
      { titulo: 'Errores frecuentes', lista: [
        'Mantener el Comité bajo las resoluciones de 2012 → Fueron derogadas (F-06, art. 16).',
        'Tramitar quejas de acoso sexual en el Comité → No es competente (F-06, art. 6, parágrafo 1).',
        'Esperar que el Comité declare la existencia de acoso → No la determina (F-06, art. 6).',
        'Integrar a personas con queja o víctimas de acoso en el año anterior → Lo impide la resolución (F-06, art. 3).',
        'No asignar tiempo ni recursos → Es responsabilidad del empleador (F-06, art. 13).'
      ] },
      { titulo: 'Herramienta o lista de verificación', lista: [
        'Lista orientativa de cumplimiento. No sustituye la asesoría jurídica ni la verificación por profesional competente.',
        '☐ Comité conformado según tamaño y centros de trabajo, con suplentes y votación secreta (F-06, art. 3).',
        '☐ Reglamento con acuerdos de confidencialidad (F-06, art. 4).',
        '☐ Periodo de dos años registrado y vigente (F-06, art. 5).',
        '☐ Plazos aplicados; seguimiento mensual; informes trimestrales (F-06, arts. 6 y 8).',
        '☐ Procedimiento separado para acoso sexual y violencia por razones de género (F-06, art. 6, parágrafo 1).',
        '☐ Capacitación y primeros auxilios psicológicos con la ARL (F-06, art. 12).',
        '☐ Espacio, recursos y tiempo asignados (F-06, art. 13).',
        '☐ Revisión jurídica con fecha registrada.'
      ] }
    ],
    referencias: ['F-01', 'F-05', 'F-06', 'F-08'],
    citasEnTexto: true,
    revision: { fecha: '2026-11-03', responsable: 'Equipo técnico Turquesa Hub (redacción inicial)' },
    estado: 'en-revision-tecnica', revisionTecnica: 'pendiente', revisionJuridica: 'pendiente', revisionPsicosocial: 'no-aplica',
    referencial: true, version: '1.0', autor: 'Equipo técnico Turquesa Hub', fecha: '2026-11-03' },

  { id: 'rec-ficha-2528',
    titulo: 'Ficha normativa: Ley 2528 de 2025 y Convenio 190 de la OIT',
    categoria: 'Ficha normativa', tema: 'Marco normativo',
    descripcion: 'Identificación del Convenio 190 de la OIT, de la ley que lo aprueba en Colombia y del estado de su control constitucional, ratificación y entrada en vigor, con las distinciones necesarias para no afirmar una vigencia no verificada.',
    publico: ['organizacion', 'colaborador'], tiempoLectura: 7,
    fuente: 'Ley 2528 de 2025 (4 de agosto; D.O. 53.204 del 6 de agosto de 2025), consultada en las compilaciones de Colpensiones y de la Secretaría Jurídica Distrital (F-07, estado V; el enlace de la Cancillería no respondió el 2026-11-03); Comunicado 24 de la Corte Constitucional del 23 de julio de 2026, Sentencia C-217/26 (F-07, estado V); Convenio 190 y Recomendación 206 de la OIT, 2019 (F-20 y F-21, estado V: texto oficial de la OIT consultado el 2026-11-03; ratificación de Colombia pendiente de verificación en NORMLEX).',
    fechaVerificacion: '2026-11-03', responsableVerificacion: 'Pendiente: profesional jurídica autorizada por la FMA',
    objetivo: 'Presentar de manera referencial el Convenio 190 de la OIT y la Ley 2528 de 2025, distinguiendo cuatro momentos que suelen confundirse: aprobación legislativa, control constitucional, ratificación con depósito ante la OIT y entrada en vigor. Las organizaciones deben verificar el estado en NORMLEX antes de afirmar que el Convenio rige en Colombia. Esta ficha es orientativa y no sustituye la asesoría jurídica.',
    secciones: [
      { titulo: 'Conceptos fundamentales', cuerpo: [
        'Identificación. Convenio sobre la violencia y el acoso, número 190, adoptado por la Conferencia Internacional del Trabajo el 21 de junio de 2019, con la Recomendación 206 (F-20; F-21). Ley 2528 de 2025, del 4 de agosto, Diario Oficial 53.204, por medio de la cual se aprueba el Convenio 190 (F-07).',
        'Objeto del Convenio. Define la violencia y el acoso como comportamientos y prácticas inaceptables, o sus amenazas, únicos o repetidos, que tengan por objeto o resultado causar daño físico, psicológico, sexual o económico, y la violencia y el acoso por razón de género como la dirigida contra las personas por su sexo o género o que las afecta de manera desproporcionada (F-20, art. 1). Protege a trabajadores, personas en formación, voluntarias y solicitantes de empleo, en el lugar de trabajo, los trayectos y las comunicaciones (F-20, arts. 2 y 3); exige al empleador política, evaluación de riesgos en SST, información y formación (F-20, art. 9) y vías de recurso, protección frente a represalias y privacidad (F-20, art. 10). La Recomendación 206 orienta la evaluación de riesgos y la orientación a víctimas (F-21).'
      ] },
      { titulo: 'Desarrollo técnico', cuerpo: [
        'Aprobación legislativa. La Ley 2528 de 2025 aprueba el Convenio (art. 1), dispone que obligará a Colombia a partir de la fecha en que se perfeccione el vínculo internacional (art. 2) y rige desde su publicación (art. 3); su sanción remite a la revisión previa de la Corte Constitucional (F-07).',
        'Control constitucional. El control automático cursa en el expediente LAT-506, en curso a julio de 2026. La Sentencia C-217 de 2026, según el Comunicado 24 del 23 de julio de 2026, resolvió una demanda distinta (contra el parágrafo del artículo 1 de la Ley 1010 de 2006), se inhibió por ineptitud sustantiva y señaló que el Convenio aún no ha sido perfeccionado por Colombia ni se ha registrado la ratificación ante la OIT, por lo que no podía servir como parámetro de control (F-07).',
        'Ratificación, depósito y entrada en vigor. El vínculo internacional al que remite el artículo 2 de la ley se perfecciona con el registro de la ratificación ante la OIT; la aprobación legislativa y la sentencia de constitucionalidad son pasos previos y no equivalen a la ratificación. La vigencia para Colombia se produce en el plazo que el propio Convenio establece a partir de ese registro, fecha que debe verificarse en NORMLEX (F-07; F-20). Con la información verificada a julio de 2026, el vínculo no se había perfeccionado; esta ficha no afirma la vigencia del Convenio en Colombia (F-07).'
      ] },
      { titulo: 'Aplicación en una organización colombiana', cuerpo: [
        'Con independencia de la ratificación, las definiciones del Convenio forman parte del derecho interno por el artículo 18 de la Ley 2466 de 2025, que las recoge, y el Decreto 1040 de 2026 declara desarrollar la Ley 2528 de 2025 (F-05, art. 18; F-08). Las organizaciones pueden usar el Convenio y la Recomendación 206 como referencia conceptual y de buenas prácticas para su política, su evaluación de riesgos y su formación (F-20, art. 9; F-21), sin presentarlo como norma vigente. La mención correcta en instrumentos internos es: Convenio 190 de la OIT, aprobado por la Ley 2528 de 2025; verificar estado de ratificación y entrada en vigor (F-07).'
      ] },
      { titulo: 'Situación práctica', cuerpo: [
        'Una empresa de servicios publica en su intranet una política que afirma que el Convenio 190 está vigente en Colombia desde agosto de 2025 porque fue aprobado por ley, y lo cita como fundamento de sanciones internas. Una asesora externa advierte que la afirmación no es exacta. Los hechos son ficticios y no identifican a ninguna persona ni organización real.'
      ], lista: [
        '¿Qué diferencia hay entre la aprobación por la Ley 2528 de 2025 y la ratificación registrada ante la OIT? (F-07)',
        '¿Qué dispone el artículo 2 de la ley sobre el momento en que el Convenio obliga a Colombia? (F-07)',
        '¿Qué señaló la Corte en el Comunicado 24 de 2026 sobre el estado del Convenio? (F-07)',
        '¿Cómo fundamentar la política en las definiciones del Convenio sin afirmar su vigencia? (F-05, art. 18; F-20, art. 1)'
      ] },
      { titulo: 'Acciones recomendadas', lista: [
        'Revisar los instrumentos internos para que mencionen el Convenio como aprobado por la Ley 2528 de 2025, con verificación pendiente de ratificación (F-07).',
        'Fundamentar las definiciones de violencia y acoso en el artículo 18 de la Ley 2466 de 2025 (F-05, art. 18).',
        'Usar el Convenio y la Recomendación 206 como referencia de buenas prácticas (F-20, arts. 9 y 10; F-21).',
        'Designar responsable de verificar NORMLEX y el expediente LAT-506 (F-07).',
        'Obtener revisión jurídica antes de invocar el Convenio en decisiones internas.'
      ] },
      { titulo: 'Errores frecuentes', lista: [
        'Confundir aprobación con ratificación → La ley aprobatoria es un paso previo; el vínculo se perfecciona con la ratificación registrada ante la OIT (F-07).',
        'Afirmar que el Convenio rige desde la publicación de la ley → La ley rige desde su publicación, pero el Convenio obliga desde que se perfeccione el vínculo (F-07).',
        'Tomar la Sentencia C-217 de 2026 como el control de la ley aprobatoria → Ese control cursa en el expediente LAT-506; la C-217/26 resolvió otra demanda (F-07).',
        'Citar el Convenio como fundamento directo de sanciones → Mientras no se verifique su vigencia, el fundamento está en la legislación interna (F-05, art. 18; F-04; F-01).',
      ] },
      { titulo: 'Herramienta o lista de verificación', lista: [
        'Lista orientativa de cumplimiento. No sustituye la asesoría jurídica ni la verificación por profesional competente.',
        '☐ Instrumentos internos que mencionan el Convenio como aprobado por la Ley 2528 de 2025, con verificación pendiente de ratificación y entrada en vigor (F-07).',
        '☐ Definiciones fundamentadas en la Ley 2466 de 2025, artículo 18 (F-05, art. 18).',
        '☐ Evaluación de riesgos, información y formación del Convenio incorporadas como buenas prácticas (F-20, art. 9; F-21).',
        '☐ Responsable y periodicidad para verificar NORMLEX y el expediente LAT-506 (F-07).',
        '☐ Ninguna comunicación afirma la vigencia del Convenio sin verificación (F-07).',
        '☐ Revisión jurídica con fecha registrada.'
      ] }
    ],
    referencias: ['F-01', 'F-04', 'F-05', 'F-07', 'F-08', 'F-20', 'F-21'],
    citasEnTexto: true,
    revision: { fecha: '2026-11-03', responsable: 'Equipo técnico Turquesa Hub (redacción inicial)' },
    estado: 'en-revision-tecnica', revisionTecnica: 'pendiente', revisionJuridica: 'pendiente', revisionPsicosocial: 'no-aplica',
    referencial: true, version: '1.0', autor: 'Equipo técnico Turquesa Hub', fecha: '2026-11-03' },

  // ============================================================
  // GLOSARIO
  // ============================================================
  { id: 'rec-glosario',
    titulo: 'Glosario de términos',
    categoria: 'Glosario', tema: 'Conceptos',
    descripcion: 'Definiciones de trabajo de los términos jurídicos, técnicos y de gestión más usados en Turquesa Hub, con la fuente de la que se toma cada una.',
    publico: ['organizacion', 'colaborador'], tiempoLectura: 10,
    objetivo: 'Ofrecer definiciones breves y referenciadas de los términos que aparecen en las guías, las fichas normativas y los módulos formativos, para que las personas usuarias compartan un vocabulario común. Las definiciones jurídicas son paráfrasis orientativas de las normas citadas y no sustituyen su texto.',
    secciones: [
      { titulo: 'Términos', lista: [
        'Acoso laboral: conducta persistente y demostrable, ejercida por un empleador, un superior, un compañero o un subalterno, encaminada a infundir miedo, intimidación o angustia, a causar perjuicio laboral, a generar desmotivación o a inducir la renuncia; tiene seis modalidades (F-01, art. 2).',
        'Acoso sexual en el ámbito laboral: todo acto de persecución, hostigamiento o asedio de carácter o connotación sexual, lasciva o libidinosa, ejercido en relaciones de poder verticales u horizontales, que puede ocurrir una o varias veces (F-04, art. 2).',
        'Violencia y acoso en el mundo del trabajo: conjunto de comportamientos y prácticas inaceptables, o sus amenazas, únicos o repetidos, que tengan por objeto, causen o puedan causar daño físico, psicológico, sexual o económico, incluida la violencia por razón de género (F-05, art. 18; F-20, art. 1).',
        'Violencia y acoso por razón de género: violencia y acoso dirigidos contra las personas por razón de su sexo o género, o que afectan de manera desproporcionada a personas de un sexo o género determinado (F-20, art. 1).',
        'Violencia contra la mujer: cualquier acción u omisión que cause muerte, daño o sufrimiento físico, sexual, psicológico, económico o patrimonial a una mujer por su condición de mujer, así como las amenazas, la coacción o la privación arbitraria de la libertad, en el ámbito público o privado (F-02, art. 2).',
        'Violencia basada en género (VBG): expresión usada en esta plataforma para las violencias que se ejercen contra una persona por razón de su género o de las relaciones desiguales de poder entre los géneros, y que afectan de manera desproporcionada a las mujeres y a las personas con orientaciones sexuales e identidades de género diversas; sus bases conceptuales se toman de la guía del PNUD (F-22).',
        'Discriminación laboral: trato diferenciado por razones de sexo, identidad de género, orientación sexual, raza, etnia, origen, discapacidad, edad, condiciones de salud, creencias u otras condiciones sin relación con la labor; está prohibida al empleador y constituye además una modalidad de acoso laboral (F-05, arts. 16 y 17; F-01, art. 2, num. 3, modificado por la Ley 1622 de 2013, cuya lista se limita a raza, género, edad, origen familiar o nacional, credo religioso, preferencia política o situación social).',
        'Presunción de contexto laboral: regla por la cual se entiende que una conducta de acoso sexual ocurrió en contexto laboral cuando se realiza en el sitio de trabajo, en eventos relacionados con el trabajo, en comunicaciones digitales o en los trayectos entre el domicilio y el trabajo, sin que se exija relación contractual entre las partes (F-04, art. 7).',
        'Tercero: persona sin vínculo laboral con la organización, como cliente, proveedor, contratista o visitante, de quien puede provenir la violencia o el acoso y a quien también puede afectar (F-05, art. 18; F-04, art. 7).',
        'Política interna de prevención: declaración y conjunto de reglas adoptadas por la alta dirección, construidas de forma participativa, con cero tolerancia a la violencia, el acoso y la discriminación, incorporadas al reglamento y a los contratos (F-04, art. 11; F-08, 2.2.1.8.2.1).',
        'Protocolo: documento que desarrolla la política con la ruta de atención, los canales, los responsables, las medidas de protección, la debida diligencia, la difusión y el reporte, y su articulación con el SG-SST, el Comité de Convivencia y las instancias de atención (F-08, 2.2.1.8.2.1).',
        'Ruta interna: secuencia de momentos del protocolo del empleador: orientación, recepción, investigación, protección y cierre, con reparación y no repetición (F-08, 2.2.1.8.2.1 y 2.2.1.8.3.8).',
        'Ruta competente o ruta oficial: conjunto de instancias y autoridades externas definidas por la normativa para atender, proteger, investigar o sancionar, como la inspección del trabajo, la Fiscalía, las comisarías de familia, el sector salud y los jueces; la organización las conoce y facilita el acceso a ellas, pero no las sustituye (F-04, art. 11; F-08, 2.2.1.8.3.10).',
        'Comité de Convivencia Laboral: instancia bipartita, preventiva, orientadora, conciliadora y canalizadora de las quejas de acoso laboral, regulada por la Resolución 3461 de 2025; no determina la existencia del acoso y no es competente para quejas de acoso sexual (F-06, arts. 3 y 6; F-01, art. 9).',
        'Instancia designada para acoso sexual: persona o instancia establecida por la alta dirección o la jefatura de talento humano para recibir las quejas de presunto acoso sexual o violencia por razones de género y definir las medidas de atención, prevención y protección (F-06, art. 6, parágrafo 1).',
        'Inspección del trabajo: dependencia del Ministerio del Trabajo que vigila el cumplimiento de las obligaciones del empleador, verifica la aplicación de las medidas de protección, puede sancionar y es competente cuando el presunto acosador sexual es el superior jerárquico (F-05, art. 18; F-08, 2.2.1.8.2.5 y 2.2.1.8.3.10).',
        'Debida diligencia: deber de empleadores, entidades e inspección del trabajo de atender las denuncias con celeridad, sin tolerar la violencia y evitando su repetición; la Circular 0076 de 2025 la califica como reforzada en materia de acoso sexual (F-08, 2.2.1.8.3.1; F-09).',
        'Medidas de protección: acciones organizativas, físicas, contractuales, pedagógicas o psicosociales que se activan desde la manifestación del hecho o la solicitud, sin prueba previa y con consentimiento informado, para resguardar a la persona afectada; en acoso sexual, algunas deben adoptarse en cinco días hábiles (F-08, 2.2.1.8.2.5; F-04, art. 13).',
        'No confrontación: derecho de la persona afectada a no ser puesta frente al presunto agresor durante el trámite; excluye careos y reuniones conjuntas de aclaración (F-04, arts. 5 y 13; F-09).',
        'No revictimización: deber de evitar que la persona afectada sufra un nuevo daño por el trato que recibe después de los hechos, por ejemplo al repetir su relato, ser cuestionada o censurada (F-04, arts. 5 y 11).',
        'Represalia o retaliación y estabilidad laboral reforzada: la represalia es una acción adversa contra quien presenta una queja o testifica; como garantía, la terminación o destitución de la persona que presentó la queja carece de efecto si se produce dentro de los seis meses siguientes y se presume retaliación (F-04, art. 14; F-08, 2.2.1.8.2.7; F-01, art. 11).',
        'Queja: manifestación, por medio electrónico, físico o verbal, de hechos de presunto acoso o violencia, presentada por la persona afectada o por quien los conozca; no es requisito para la denuncia penal (F-04, art. 15; F-08, 2.2.1.8.2.6).',
        'Denuncia penal: puesta en conocimiento de la Fiscalía General de la Nación de hechos que puedan constituir delito; es independiente de la queja interna y la persona afectada debe ser informada de su facultad de presentarla (F-04, arts. 11 y 15).',
        'Conciliación: mecanismo de acuerdo entre las partes propio del procedimiento de acoso laboral en el Comité de Convivencia; no procede en acoso sexual ni en violencia de género (F-06, art. 6, parágrafo 1; F-08, 2.2.1.8.1.8).',
        'Reparación y no repetición: componentes obligatorios de la decisión del empleador, que incluyen acompañamiento, medidas pedagógicas, información a la ARL y, cuando corresponda, medidas disciplinarias proporcionales (F-05, art. 18; F-08, 2.2.1.8.3.8 y 2.2.1.8.3.9).',
        'Enfoque de género en la valoración probatoria: criterio que flexibiliza la carga de la prueba, admite indicios y prohíbe decidir con base en estereotipos o admitir pruebas que propicien discriminación (F-08, 2.2.1.8.3.3).',
        'Confidencialidad: principio y derecho por el cual la información de una situación se reserva a las personas que intervienen en la ruta, sin afectar el derecho de defensa; obliga incluso después de terminada la labor (F-04, art. 5; F-08, 2.2.1.8.3.4 (2.º); F-03, art. 4).',
        'Consentimiento informado: aceptación libre y expresa de la persona afectada respecto del registro de su información, su remisión y las medidas que se adopten, tras recibir información clara sobre finalidad y destinatarios (F-08, 2.2.1.8.2.4; F-03, art. 4; F-29).',
        'Dato sensible: dato que afecta la intimidad del titular o cuyo uso indebido puede generar discriminación, como los relativos a la salud, la vida sexual y los datos biométricos; su tratamiento está prohibido salvo excepciones, entre ellas la autorización explícita (F-03, arts. 5 y 6).',
        'Anonimización y reporte al SIVIGE: la anonimización es la supresión de los elementos que permiten identificar a una persona en reportes y estadísticas; la publicación semestral del número de quejas y sanciones debe hacerse de forma anonimizada y remitirse al SIVIGE conforme a la ley (F-04, art. 11, num. 7; F-08, 2.2.1.8.2.1).',
        'Riesgo psicosocial: condición del trabajo que puede afectar la salud mental y el bienestar, entre ellas la violencia, el acoso y la discriminación; debe valorarse y gestionarse en el SG-SST (F-08, 2.2.1.8.2.4; F-11; F-31).',
        'Primera escucha (LIVES): apoyo de primera línea descrito por la OMS: escuchar, preguntar por necesidades, validar, reforzar la seguridad y apoyar conectando con servicios; en Turquesa Hub se adopta solo como principio de orientación segura (F-26).',
        'Gestión preventiva: conjunto de acciones organizacionales para anticipar y reducir la violencia y el acoso: diagnóstico, política, formación, canales, evidencias y mejora continua; es el ámbito de Turquesa Hub, que no gestiona casos (F-22; F-08, 2.2.1.8.2.1).',
        'Convenio 190 de la OIT: convenio sobre la violencia y el acoso de 2019, aprobado en Colombia por la Ley 2528 de 2025; su ratificación y entrada en vigor deben verificarse en NORMLEX antes de afirmar su vigencia (F-07; F-20).'
      ] }
    ],
    referencias: ['F-01', 'F-02', 'F-03', 'F-04', 'F-05', 'F-06', 'F-07', 'F-08', 'F-09', 'F-11', 'F-20', 'F-22', 'F-26', 'F-28', 'F-31'],
    citasEnTexto: true,
    revision: { fecha: '2026-11-03', responsable: 'Equipo técnico Turquesa Hub (redacción inicial)' },
    estado: 'en-revision-tecnica', revisionTecnica: 'pendiente', revisionJuridica: 'pendiente', revisionPsicosocial: 'no-aplica',
    referencial: true, version: '1.0', autor: 'Equipo técnico Turquesa Hub', fecha: '2026-11-03' }
]);

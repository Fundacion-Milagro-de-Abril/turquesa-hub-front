/* ============================================================
   TURQUESA HUB · MÓDULOS DE SENSIBILIZACIÓN (redacción inicial v1.0)
   Cuatro módulos; cada uno con cuatro lecciones (desarrollo conceptual,
   situación ficticia, actividad de reflexión, tarjeta de idea clave y
   referencias) y un ejercicio de apropiación de cinco preguntas.
   Las referencias "(F-nn, art. x)" remiten a docs/FUENTES.md.
   Los ejemplos situacionales son ficticios y no identificables.
   Contenido pedagógico en revisión técnica; la revisión jurídica y
   psicosocial definitivas corresponden a las profesionales autorizadas
   por la Fundación Milagro de Abril (ver campo `revision`).
   Turquesa Hub es una herramienta de gestión preventiva: no recibe
   quejas ni gestiona casos.
   ============================================================ */
window.TH = window.TH || {};
TH.data = TH.data || {};

TH.data.modulos = [
  {
    id: 'mod-1', orden: 1, color: 'naranja', duracion: '45 min',
    titulo: 'Comprender las violencias basadas en género',
    resumen: 'Qué son las violencias basadas en género, cómo se manifiestan en el trabajo (incluidos los medios digitales), qué mitos las sostienen y por qué prevenirlas es una tarea colectiva.',
    objetivos: [
      'Al finalizar, la persona podrá identificar qué se entiende por violencia basada en género y distinguir los tipos de daño que reconoce la normativa colombiana.',
      'Al finalizar, la persona podrá reconocer manifestaciones de violencia basada en género en el entorno de trabajo, incluidas las que ocurren por medios digitales y en espacios vinculados al trabajo.',
      'Al finalizar, la persona podrá identificar mitos y normas sociales que restan importancia a la violencia y explicar por qué transformarlos es una estrategia de prevención.',
      'Al finalizar, la persona podrá describir el aporte de su rol a la prevención como tarea colectiva de la organización.'
    ],
    lecciones: [
      { id: 'l1', tipo: 'Concepto', titulo: '¿Qué entendemos por violencias basadas en género?',
        cuerpo: [
          'Hablamos de violencias basadas en género (VBG) cuando una conducta causa daño a una persona por razón de su sexo o de su género, o cuando afecta de manera desproporcionada a las personas de un sexo o género determinado. Así lo recoge el Convenio 190 de la OIT, que define la "violencia y acoso por razón de género" como una forma específica de violencia y acoso en el mundo del trabajo (F-20, art. 1). En Colombia, la Ley 1257 de 2008 define la violencia contra la mujer como cualquier acción u omisión que le cause muerte, daño o sufrimiento físico, sexual, psicológico, económico o patrimonial por su condición de mujer, tanto en el ámbito público como en el privado (F-02, art. 2).',
          'La misma ley distingue cuatro tipos de daño: psicológico (intimidar, manipular, humillar o aislar a una persona hasta afectar su salud psicológica), físico (poner en riesgo o disminuir la integridad corporal), sexual (obligar a una persona a contactos o interacciones de carácter sexual mediante fuerza, intimidación, coerción o chantaje) y patrimonial (retener, sustraer o destruir bienes, documentos o ingresos destinados a satisfacer sus necesidades) (F-02, art. 3). Esta clasificación ayuda a ver que la violencia no es únicamente un golpe: una humillación reiterada en público o la retención de un pago también son daño.',
          'Un segundo criterio importante viene del Convenio 190: los comportamientos pueden ser únicos o repetidos, y basta con que tengan por objeto o resultado causar daño, o que puedan causarlo (F-20, art. 1). La Ley 2466 de 2025 adoptó esta misma lógica para el mundo del trabajo en Colombia: comportamientos inaceptables, únicos o repetidos, que causen o puedan causar daño físico, psicológico, sexual o económico, incluido el daño por razón de género (F-05, art. 18). No es necesario esperar a que una conducta se repita para reconocerla como un problema.',
          'Las VBG afectan principalmente a las mujeres, y también a personas cuya orientación sexual, identidad o expresión de género no coincide con lo que el entorno espera. La Ley 1257 incorpora el principio de no discriminación por razones como la edad, la etnia, la orientación sexual o la procedencia (F-02, art. 6). En el trabajo, la protección cubre a toda persona sin importar su vínculo: personal de planta, contratistas, personas en formación, voluntarias y quienes buscan empleo (F-05, art. 18; F-20, art. 2). Esto importa en sectores con alta temporalidad, como la recolección de café en Caldas, los servicios de aseo tercerizados o las prácticas universitarias en clínicas y hospitales.',
          'Detrás de estas conductas suele haber relaciones de poder desiguales y creencias sobre lo que "corresponde" a hombres y a mujeres. Por eso la prevención no se limita a sancionar los hechos graves: implica revisar las prácticas cotidianas que, toleradas, construyen entornos de riesgo. La guía del PNUD para empresas parte precisamente de esa base conceptual: la VBG en el trabajo es un problema de derechos y también un asunto de gestión organizacional (F-22).'
        ],
        situacion: 'En una finca cafetera del centro del país, durante la cosecha, el administrador entrega el pago semanal de dos recolectoras a sus parejas, también recolectores, "para que no se lo gasten". Las trabajadoras no han pedido ese arreglo y una de ellas dejó de recibir parte de su dinero. Nadie en la finca lo considera un problema porque "así se hace en muchas familias".',
        actividad: { titulo: 'Actividad de reflexión', instrucciones: 'Piense en el tipo de trabajo que realiza su organización y en las personas que comparten sus espacios. Responda por escrito, sin referirse a casos reales identificables.', preguntas: [
          '¿Cuáles de los cuatro tipos de daño (psicológico, físico, sexual, patrimonial) podrían pasar más desapercibidos en su sector y por qué?',
          '¿Qué personas con vínculos distintos al contrato laboral (practicantes, contratistas, personal temporal, proveedores) comparten los espacios de trabajo y cómo las cubren las normas de convivencia de su organización?',
          '¿Con qué palabras nombra su organización estas situaciones en sus documentos y comunicaciones? ¿Son términos precisos o genéricos?'
        ] },
        tarjeta: { tipo: 'turquesa', texto: 'Idea clave: la violencia basada en género no se define por su gravedad visible sino por el daño que causa o puede causar a una persona por razón de su género; puede ser un hecho único o una práctica repetida.' },
        referencias: ['F-02', 'F-05', 'F-20', 'F-22'] },

      { id: 'l2', tipo: 'Manifestaciones', titulo: 'Cómo se manifiestan en el trabajo, incluidos los medios digitales',
        cuerpo: [
          'El trabajo no ocurre únicamente dentro de una oficina o una planta. La Ley 2365 de 2024 presume que una conducta ocurre en el contexto laboral cuando sucede en el lugar de trabajo, en los lugares de pago o de descanso, en viajes y eventos relacionados con el trabajo, en las comunicaciones de trabajo (incluidas las digitales), en los trayectos entre el domicilio y el trabajo y en los alojamientos que suministra el empleador; además, no exige que exista una relación laboral o contractual entre la persona afectada y quien agrede (F-04, art. 7). La Ley 2466 de 2025 añade que la protección cubre los espacios físicos y digitales vinculados al trabajo y las conductas de terceros, como clientes y proveedores (F-05, art. 18).',
          'Las manifestaciones psicológicas por razón de género son las más frecuentes y las menos nombradas: descalificar el criterio de una profesional "porque las mujeres son muy emocionales", excluir a alguien de un proyecto por su embarazo o por la posibilidad de que tenga hijos, asignar tareas de cuidado o de orden a las mujeres del equipo, o difundir rumores sobre la vida íntima de una persona. En un hospital, puede expresarse en que una médica reciba menos respaldo de su jefe ante los reclamos de pacientes que un colega hombre; en una planta de manufactura, en apodos sobre el cuerpo que se repiten en cada turno.',
          'Las manifestaciones de carácter sexual incluyen insinuaciones, comentarios o miradas de connotación sexual, invitaciones insistentes después de una negativa, contactos físicos no deseados y propuestas que condicionan oportunidades laborales. La ley colombiana las caracteriza como persecución, hostigamiento o asedio de carácter sexual, que puede darse en relaciones de poder verticales u horizontales y una o varias veces (F-04, art. 2). Las manifestaciones de tipo económico o patrimonial también existen en el trabajo: control sobre el pago, inequidad salarial injustificada o retención de documentos (F-02, art. 2 y 3).',
          'Los medios digitales han ampliado el alcance de estas conductas. Mensajes de voz a altas horas de la noche por un grupo de trabajo, comentarios sobre la apariencia durante una videollamada, envío de imágenes o enlaces de contenido sexual, insistencia por redes sociales personales a partir de un contacto laboral o difusión de capturas de pantalla son conductas que ocurren en espacios digitales vinculados al trabajo y que la normativa reconoce como parte del contexto laboral (F-04, art. 7; F-05, art. 18). En el teletrabajo, la frontera entre lo laboral y lo personal se difumina, y por eso conviene que los equipos acuerden normas explícitas sobre canales, horarios y tono.',
          'Estas conductas no son solo un asunto entre dos personas: deterioran el clima, generan rotación y ausentismo, y constituyen peligros psicosociales que las organizaciones deben identificar y gestionar. La norma ISO 45003 incluye la violencia en el trabajo, el acoso (también el relacionado con el sexo, la identidad de género o la orientación sexual), la intimidación y la victimización entre los peligros psicosociales que una organización debería considerar en su gestión de la seguridad y la salud psicológicas, como referencia de buenas prácticas (F-31).'
        ],
        situacion: 'En una empresa de servicios de atención al cliente que opera en teletrabajo, un coordinador envía a una agente mensajes de voz después de las once de la noche comentando "lo bien que se veía" en la reunión virtual del día. Ella empieza a apagar la cámara en las reuniones y, en la siguiente evaluación, el mismo coordinador la califica como "poco comprometida con el equipo".',
        actividad: { titulo: 'Actividad de reflexión', instrucciones: 'Haga un inventario de los espacios y canales en los que ocurre el trabajo de su equipo. No describa situaciones reales de personas identificables.', preguntas: [
          '¿Qué canales digitales usa su equipo para el trabajo (mensajería, videollamadas, redes) y qué acuerdos existen sobre su uso respetuoso y sus horarios?',
          '¿Qué espacios fuera de la sede (transporte, eventos de integración, visitas a clientes, alojamientos) forman parte del trabajo y están contemplados en las normas de convivencia?',
          '¿Cómo responde su organización cuando la conducta proviene de un cliente, un usuario o un proveedor?'
        ] },
        tarjeta: { tipo: 'naranja', texto: 'Idea clave: el contexto laboral incluye trayectos, eventos, alojamientos y comunicaciones digitales. Lo que ocurre en un chat de trabajo a medianoche también es trabajo.' },
        referencias: ['F-02', 'F-04', 'F-05', 'F-31'] },

      { id: 'l3', tipo: 'Mitos', titulo: 'Mitos y normas sociales que sostienen la violencia',
        cuerpo: [
          'Las normas sociales son expectativas compartidas sobre cómo deben comportarse las personas; se aprenden en la familia, la escuela y el trabajo, y rara vez se cuestionan. El marco RESPECT de la Organización Mundial de la Salud reúne siete estrategias de prevención con evidencia y una de ellas consiste precisamente en transformar actitudes, creencias y normas; otra, a hacer seguros los entornos (Environments made safe), entre ellos los entornos de trabajo (F-25, p. 9). Transformar normas no es un gesto simbólico: es una estrategia de prevención.',
          '"Son bromas, no hay que exagerar". Los chistes que sexualizan o menosprecian comunican quién es valorado en el equipo. La normativa no exige que una conducta sea grave o repetida para considerarla inaceptable: basta con que cause o pueda causar daño (F-20, art. 1; F-05, art. 18). En una cuadrilla de mantenimiento o en una sala de cirugía, el humor que se repite cada día construye la cultura del equipo.',
          '"Eso es un asunto privado". La Ley 1257 reconoce que la violencia contra la mujer ocurre tanto en el ámbito público como en el privado (F-02, art. 2), y lo que sucede entre personas de un mismo equipo afecta la convivencia, la seguridad y el desempeño de la organización. "Si no se quejó, no fue tan grave". Las personas afectadas enfrentan barreras reales para hablar: temor a represalias, a no ser creídas o a perder el empleo. Por eso la normativa reconoce el derecho a la protección frente a represalias y exige canales confidenciales (F-04, art. 5; F-08, art. 2.2.1.8.2.7).',
          '"Ella lo provocó" o "se lo buscó por cómo se viste". Atribuir la responsabilidad a la persona afectada es una forma de revictimización que la ley prohíbe de manera expresa a los empleadores (F-04, art. 5 y 11). "En nuestro sector eso no pasa". Las VBG ocurren en servicios, agroindustria, salud, manufactura y teletrabajo; lo que cambia es la forma en que se expresan y la facilidad con que se nombran.',
          'Reemplazar estos mitos por una norma clara ("aquí esto no es aceptable y sabemos qué hacer") es la base de lo que las guías para empresas llaman una cultura de cero tolerancia (F-22; F-08, art. 2.2.1.8.2.1). No se trata de vigilar a las personas sino de que la organización diga, con hechos y con palabras, qué espera de todas ellas.'
        ],
        situacion: 'En un taller de una empresa metalmecánica, una ingeniera recién vinculada pide retirar un calendario con fotografías de mujeres en ropa interior que lleva años en la pared del área de soldadura. Un supervisor responde: "aquí siempre ha sido así, no se tome las cosas tan personales". El calendario sigue en la pared y la ingeniera evita pasar por esa zona.',
        actividad: { titulo: 'Actividad de reflexión', instrucciones: 'Observe durante una semana las expresiones y mensajes que circulan en su entorno de trabajo. Registre frases y prácticas, no nombres.', preguntas: [
          '¿Qué frases se escuchan con frecuencia en su entorno que restan importancia a estas conductas? ¿A qué mito corresponden?',
          '¿Qué normas no escritas ("así se ha hecho siempre", "es parte del ambiente") podrían estar sosteniéndolas?',
          '¿Qué mensajes institucionales (carteleras, inducción, comunicaciones internas) contradicen esos mitos y cuáles los refuerzan sin proponérselo?'
        ] },
        tarjeta: { tipo: 'violeta', texto: 'Idea clave: los mitos no son opiniones inofensivas; son las normas que deciden qué se tolera. Transformarlos es, según la evidencia, una estrategia de prevención.' },
        referencias: ['F-02', 'F-04', 'F-05', 'F-08', 'F-20', 'F-22', 'F-25'] },

      { id: 'l4', tipo: 'Corresponsabilidad', titulo: 'La prevención como tarea colectiva',
        cuerpo: [
          'La prevención no es un evento (una charla, una campaña) sino un sistema. La guía del PNUD para empresas propone un modelo de gestión con cuatro componentes: compromiso de la dirección, detección de riesgos y situaciones, acción (políticas, protocolos, respuesta) y monitoreo de resultados (F-22). Cada componente involucra a personas distintas, y por eso la prevención es colectiva por diseño.',
          'La Ley 1257 incorpora el principio de corresponsabilidad: la sociedad y la familia deben respetar los derechos de las mujeres y contribuir a eliminar la violencia, mientras el Estado previene, investiga y sanciona (F-02, art. 6). En el trabajo, el Convenio 190 asigna al empleador adoptar una política, incluir la violencia y el acoso en la gestión de la seguridad y salud en el trabajo, y ofrecer información y formación (F-20, art. 9). Los Principios para el Empoderamiento de las Mujeres sitúan el liderazgo de alto nivel como el primer principio y la formación como el cuarto (F-24).',
          'Dentro de una organización colombiana, los roles se distribuyen así: la alta dirección adopta y respalda la política; talento humano y seguridad y salud en el trabajo la operan e integran el riesgo psicosocial en el sistema de gestión (F-08, art. 2.2.1.8.2.4; F-11); el Comité de Convivencia Laboral cumple funciones preventivas, orientadoras y conciliadoras frente al acoso laboral (F-06, art. 6); los mandos medios modelan el trato cotidiano; y cada persona decide a qué se ríe, qué nombra y a quién apoya. En una clínica, esto implica desde la gerencia hasta la jefe de enfermería de un turno nocturno; en una cooperativa agroindustrial, desde el consejo de administración hasta el mayordomo de una finca.',
          'Lo que cada persona puede hacer no exige formación especializada: conocer las normas de convivencia y los canales de orientación, no reforzar el silencio, devolver la palabra a quien fue interrumpida, no reír un comentario sexista, preguntar cómo está alguien después de una situación incómoda y saber a quién acudir cuando algo supera lo que puede manejar. No le corresponde investigar hechos ni confrontar a presuntos responsables; eso tiene instancias definidas (ver Módulo 3).',
          'Turquesa Hub acompaña a las organizaciones en la gestión preventiva: diagnóstico, plan de acción, sensibilización y seguimiento. No recibe quejas ni gestiona casos. Cada organización debe comunicar a su personal cuáles son sus canales de orientación y queja, y cuáles son las instancias competentes.'
        ],
        situacion: 'La jefe de enfermería de un turno nocturno en una clínica nota que en el grupo de mensajería del servicio circulan con frecuencia chistes sobre las "enfermeras coquetas". En lugar de buscar culpables, dedica diez minutos de la siguiente entrega de turno a recordar el acuerdo de convivencia del servicio, explica por qué esos mensajes afectan al equipo y recuerda cuál es el canal para situaciones que requieran atención. Durante las semanas siguientes, el tono del grupo cambia.',
        actividad: { titulo: 'Actividad de reflexión', instrucciones: 'Construya un mapa sencillo de actores de la prevención en su organización. Trabaje sobre roles y procesos, no sobre casos.', preguntas: [
          '¿Quién tiene responsabilidades formales en prevención en su organización (dirección, talento humano, seguridad y salud en el trabajo, Comité de Convivencia Laboral) y cómo se comunican entre sí?',
          '¿Qué acciones de prevención (formación, campañas, evaluación de riesgo psicosocial, actualización de la política) se han realizado en el último año?',
          '¿Qué podría hacer su equipo en la próxima semana, sin recursos adicionales, para reforzar un entorno respetuoso?'
        ] },
        tarjeta: { tipo: 'turquesa', texto: 'Idea clave: prevenir es un sistema con compromiso, detección, acción y monitoreo. Cada rol aporta algo distinto; ninguno lo reemplaza todo.' },
        referencias: ['F-02', 'F-06', 'F-08', 'F-11', 'F-20', 'F-22', 'F-24'] }
    ],
    quiz: [
      { id: 'p1', texto: 'Según el Convenio 190 de la OIT y la Ley 2466 de 2025, ¿cuál afirmación describe correctamente la "violencia y acoso" en el mundo del trabajo?',
        opciones: [
          { id: 'a', texto: 'Solo comportamientos repetidos durante un periodo prolongado.' },
          { id: 'b', texto: 'Comportamientos inaceptables, únicos o repetidos, que causen o puedan causar daño físico, psicológico, sexual o económico.' },
          { id: 'c', texto: 'Únicamente agresiones físicas comprobadas por testigos.' },
          { id: 'd', texto: 'Solo conductas en las que se demuestre la intención de causar daño.' }
        ], correcta: 'b',
        retro: { ok: 'Correcto. La definición abarca comportamientos únicos o repetidos y considera tanto el daño causado como el que podría causarse, en sus dimensiones física, psicológica, sexual y económica. No se exige repetición ni prueba de intención.', no: 'Revise la lección 1. La definición del Convenio 190 y de la Ley 2466 no exige repetición, no se limita a lo físico y no depende de probar la intención: basta con que la conducta cause o pueda causar daño.' },
        referencia: 'F-20' },
      { id: 'p2', texto: '¿Qué tipos de daño distingue la Ley 1257 de 2008 en su definición de violencia contra la mujer?',
        opciones: [
          { id: 'a', texto: 'Físico y sexual únicamente.' },
          { id: 'b', texto: 'Moral, disciplinario y contractual.' },
          { id: 'c', texto: 'Psicológico, físico, sexual y patrimonial.' },
          { id: 'd', texto: 'Verbal y no verbal.' }
        ], correcta: 'c',
        retro: { ok: 'Así es. La Ley 1257 define cuatro tipos de daño: psicológico, físico, sexual y patrimonial. Reconocer el daño psicológico y el patrimonial permite identificar conductas que no dejan huella visible.', no: 'No exactamente. La Ley 1257 distingue cuatro tipos de daño: psicológico, físico, sexual y patrimonial. Limitar la violencia a lo físico o a lo sexual deja por fuera formas frecuentes en el trabajo, como la humillación reiterada o la retención de ingresos.' },
        referencia: 'F-02' },
      { id: 'p3', texto: 'Un compañero envía a una colega, por el grupo de mensajería del equipo y a las diez de la noche, un mensaje con contenido sexual. De acuerdo con la Ley 2365 de 2024, ¿qué es correcto afirmar?',
        opciones: [
          { id: 'a', texto: 'No es contexto laboral porque ocurrió fuera del horario de trabajo.' },
          { id: 'b', texto: 'Solo sería contexto laboral si hubiera ocurrido dentro de las instalaciones de la empresa.' },
          { id: 'c', texto: 'Se presume que ocurrió en el contexto laboral, porque las comunicaciones de trabajo, incluidas las digitales, hacen parte de ese contexto.' },
          { id: 'd', texto: 'Solo cuenta si ambas personas tienen contrato laboral con la misma empresa.' }
        ], correcta: 'c',
        retro: { ok: 'Correcto. La Ley 2365 presume que la conducta ocurre en el contexto laboral cuando sucede en comunicaciones de trabajo, incluidas las digitales, y no exige que exista relación laboral entre las personas involucradas.', no: 'Revise la lección 2. El contexto laboral no se limita al horario ni a las instalaciones: incluye comunicaciones digitales de trabajo, trayectos, eventos y alojamientos del empleador, y no requiere que ambas personas tengan contrato con la misma empresa.' },
        referencia: 'F-04' },
      { id: 'p4', texto: '¿Por qué una organización debería trabajar sobre creencias y normas sociales, y no solo sobre sanciones?',
        opciones: [
          { id: 'a', texto: 'Porque las sanciones son ilegales en el ámbito laboral.' },
          { id: 'b', texto: 'Porque la evidencia reunida por la OMS muestra que transformar actitudes, creencias y normas es una estrategia de prevención de la violencia.' },
          { id: 'c', texto: 'Porque las creencias son un asunto privado que la organización debe respetar sin intervenir.' },
          { id: 'd', texto: 'Porque trabajar sobre normas sociales reemplaza la necesidad de tener políticas y protocolos.' }
        ], correcta: 'b',
        retro: { ok: 'Correcto. El marco RESPECT de la OMS incluye la transformación de actitudes, creencias y normas entre las estrategias de prevención con evidencia. Esto complementa, no reemplaza, las políticas y los protocolos.', no: 'Revise la lección 3. Las sanciones tienen su lugar, pero la evidencia reunida por la OMS muestra que transformar normas y creencias previene la violencia. Trabajar sobre normas no sustituye las políticas ni los protocolos: los hace creíbles.' },
        referencia: 'F-25' },
      { id: 'p5', texto: 'Una persona del equipo observa que un comentario sexista se repite en las reuniones y nadie lo cuestiona. ¿Cuál es una actuación coherente con la prevención como tarea colectiva?',
        opciones: [
          { id: 'a', texto: 'Investigar por su cuenta quién empezó y reunir pruebas contra esa persona.' },
          { id: 'b', texto: 'No intervenir: la prevención es responsabilidad exclusiva de talento humano.' },
          { id: 'c', texto: 'Registrar la situación en Turquesa Hub como una queja formal.' },
          { id: 'd', texto: 'No reír el comentario, nombrar con respeto que no es adecuado y conocer el canal de orientación de la organización por si alguien lo necesita.' }
        ], correcta: 'd',
        retro: { ok: 'Correcto. La corresponsabilidad se ejerce con acciones cotidianas y respetuosas: no reforzar el silencio y saber a dónde orientar. Investigar o confrontar corresponde a instancias definidas, y Turquesa Hub no recibe quejas.', no: 'Revise la lección 4. A cada persona le corresponde no ser indiferente y conocer los canales; no le corresponde investigar ni reunir pruebas. La prevención no es exclusiva de un área, y Turquesa Hub no recibe quejas ni gestiona casos.' },
        referencia: 'F-22' }
    ],
    recursos: ['rec-glosario', 'rec-prevencion', 'rec-sensibilizacion', 'rec-ficha-1257', 'rec-ficha-2466'],
    bibliografia: ['F-02', 'F-04', 'F-05', 'F-06', 'F-08', 'F-11', 'F-20', 'F-22', 'F-24', 'F-25', 'F-31'],
    revision: { fecha: '2026-11-03', responsable: 'Equipo técnico Turquesa Hub (redacción inicial)', estadoPsicosocial: 'pendiente', estadoJuridico: 'pendiente' }
  },

  {
    id: 'mod-2', orden: 2, color: 'violeta', duracion: '45 min',
    titulo: 'Sesgos, estereotipos y cultura organizacional',
    resumen: 'Cómo los estereotipos y sesgos de género se cuelan en decisiones, lenguaje y prácticas cotidianas, cómo afectan el clima y qué puede hacer cada persona desde su rol.',
    objetivos: [
      'Al finalizar, la persona podrá identificar estereotipos y sesgos de género y reconocer cómo influyen en decisiones de selección, asignación de tareas, evaluación y promoción.',
      'Al finalizar, la persona podrá distinguir usos del lenguaje y de la comunicación institucional que refuerzan la desigualdad de aquellos que la cuestionan.',
      'Al finalizar, la persona podrá reconocer microprácticas cotidianas como factores del clima organizacional y del riesgo psicosocial.',
      'Al finalizar, la persona podrá aplicar criterios de corresponsabilidad para intervenir con respeto desde su rol.'
    ],
    lecciones: [
      { id: 'l1', tipo: 'Concepto', titulo: 'Estereotipos y sesgos en las decisiones',
        cuerpo: [
          'Un estereotipo de género es una creencia generalizada sobre cómo "deben ser" o "qué pueden hacer" las personas según su sexo o su género: que las mujeres son más cuidadosas y los hombres más resueltos, que ellas "se van a ir cuando tengan hijos" o que ciertos trabajos "no son para mujeres". Un sesgo es el efecto de esa creencia sobre una decisión, con frecuencia sin que quien decide lo note. Todas las personas aprendimos estereotipos; reconocerlos no es una acusación, es el primer paso para dejar de aplicarlos.',
          'Los sesgos aparecen en momentos concretos de la vida laboral. En la selección, cuando se pregunta a una candidata por sus planes de maternidad o por quién cuida a sus hijos y no se pregunta lo mismo a un candidato. En la asignación de tareas, cuando en una planta se asume que "lo pesado" es para hombres y el empaque para mujeres sin evaluar competencias ni condiciones. En la evaluación, cuando el mismo comportamiento se califica como "decidido" en un hombre y como "intenso" o "conflictivo" en una mujer. En la promoción, cuando en un hospital no se ofrece la coordinación de un turno nocturno a una madre "para no complicarle la vida", sin preguntarle.',
          'Los Principios para el Empoderamiento de las Mujeres (WEPs) proponen, como segundo principio, tratar a todas las personas de forma equitativa y sin discriminación en el trabajo, y como séptimo, medir y publicar los avances (F-24). La norma ISO 53800 ofrece directrices para que cualquier organización integre la igualdad de género en su dimensión interna, sus actividades, sus relaciones externas y su comunicación, con plan de acción y mejora continua; es una referencia de buenas prácticas, no una certificación (F-32). Ambas coinciden en algo práctico: donde hay criterios explícitos y datos, hay menos espacio para el sesgo.',
          'En Colombia, la discriminación en el trabajo tiene además un marco jurídico propio. La Ley 1257 ordena promover mecanismos de igualdad salarial y campañas contra la discriminación y la violencia contra las mujeres en el trabajo (F-02, art. 12); la Ley 1010 incluye la discriminación laboral entre las modalidades de acoso laboral (F-01, art. 2); y la Ley 2466 de 2025 contiene disposiciones sobre no discriminación en el trabajo (F-05, art. 15 a 17). No toda decisión sesgada constituye una infracción, pero las decisiones sesgadas que se repiten producen desigualdad y pueden llegar a serlo.',
          'Una pregunta útil antes de decidir sobre una persona: ¿tomaría la misma decisión si fuera de otro género? Y una práctica útil para los equipos: definir por escrito los criterios de selección, evaluación y promoción, aplicarlos a todas las personas y revisar periódicamente los resultados desagregados por sexo.'
        ],
        situacion: 'Una empresa exportadora de café del Eje Cafetero abre la vacante de jefe de patio de secado. Entrevistan a un hombre y a una mujer con experiencia similar. A ella le preguntan cuántos hijos tiene, quién los cuida y si "aguantaría" el horario de cosecha; a él, solo por su experiencia técnica. El comité elige al candidato "porque ella tiene muchas responsabilidades en la casa", aunque ella nunca manifestó dificultad alguna.',
        actividad: { titulo: 'Actividad de reflexión', instrucciones: 'Revise los procesos de decisión sobre personas que existen en su organización. Analice criterios y procedimientos, no personas concretas.', preguntas: [
          '¿Qué criterios explícitos y escritos usa su organización para seleccionar, evaluar y promover? ¿En qué puntos del proceso queda espacio para la interpretación personal?',
          '¿Qué tareas o cargos se asignan "por costumbre" según el género en su área y qué justificación se da?',
          '¿Qué datos desagregados por sexo (contratación, salarios, promociones, rotación) revisa su organización y con qué frecuencia?'
        ] },
        tarjeta: { tipo: 'violeta', texto: 'Idea clave: el sesgo no necesita mala intención para producir desigualdad. Criterios explícitos y datos desagregados son la mejor defensa.' },
        referencias: ['F-01', 'F-02', 'F-05', 'F-24', 'F-32'] },

      { id: 'l2', tipo: 'Lenguaje', titulo: 'Lenguaje y comunicación que construyen o erosionan',
        cuerpo: [
          'El lenguaje no describe únicamente la realidad: la organiza. Las palabras con que nombramos a las personas, los chistes que circulan y las imágenes que una organización elige para comunicarse enseñan a diario quién es valorado y quién no. Por eso el marco RESPECT de la OMS incluye la transformación de actitudes, creencias y normas entre las estrategias de prevención, y por eso la comunicación interna es parte de la prevención y no un asunto decorativo (F-25).',
          'Algunas prácticas frecuentes: llamar "niñas" a las profesionales de enfermería de un servicio, mientras a los médicos se les llama "doctor"; apodos sobre el cuerpo en una línea de producción; presentar en una inducción a los ingenieros por su trayectoria y a la ingeniera por su "buena energía"; humor sexualizado en el grupo de mensajería del equipo; o imágenes publicitarias de una empresa de servicios en las que las mujeres aparecen únicamente en roles de atención y los hombres en roles técnicos o directivos.',
          'No se trata de prohibir el humor ni de que las personas "se ofendan por todo". El criterio es el efecto: comentarios que sexualizan, infantilizan o descalifican por razón de género erosionan la dignidad y pueden ser parte de los comportamientos inaceptables que la normativa busca prevenir (F-20, art. 1; F-05, art. 18). Un comentario aislado puede ser un descuido; un patrón de comentarios es cultura.',
          'La comunicación institucional también comunica. El Decreto 1040 de 2026 exige a los empleadores campañas y capacitación con enfoques diferenciales como parte de las obligaciones de prevención (F-08, art. 2.2.1.8.2.3). Carteleras, inducción, redes sociales y piezas de reconocimiento pueden reforzar estereotipos o cuestionarlos; conviene revisarlas con esa pregunta en mente.',
          'Algunas pautas prácticas: nombrar a las personas por su rol y su nombre, no por su cuerpo o su estado civil; reconocer los aportes sin condicionarlos al género ("gracias por el análisis, nos ayuda a decidir" en lugar de "qué bien que una mujer se anime con esto"); evitar comentarios sobre el cuerpo, la ropa o la vida íntima; y, cuando algo se dice mal, reformular con respeto en lugar de ridiculizar a quien lo dijo.'
        ],
        situacion: 'En la inducción de un nuevo equipo de mantenimiento de una planta de alimentos, el jefe presenta a dos técnicos con sus años de experiencia y sus certificaciones, y a la técnica como "la que nos va a alegrar el taller". Varias personas ríen. Ella sonríe por compromiso y, durante las semanas siguientes, sus propuestas técnicas reciben menos atención que las de sus compañeros.',
        actividad: { titulo: 'Actividad de reflexión', instrucciones: 'Durante una semana, observe la comunicación verbal, escrita y visual de su entorno de trabajo. Registre expresiones y piezas, no nombres de personas.', preguntas: [
          '¿Qué apodos, chistes o expresiones recurrentes aluden al género, al cuerpo o a la vida íntima de las personas?',
          '¿Qué imágenes y mensajes institucionales (carteleras, redes, inducción, publicidad) muestran a hombres y a mujeres, y en qué roles aparece cada quien?',
          '¿Existen acuerdos de equipo sobre comunicación respetuosa? ¿Cómo y cuándo se recuerdan?'
        ] },
        tarjeta: { tipo: 'naranja', texto: 'Idea clave: un comentario aislado puede ser un descuido; un patrón de comentarios es cultura. El lenguaje institucional también enseña.' },
        referencias: ['F-05', 'F-08', 'F-20', 'F-25'] },

      { id: 'l3', tipo: 'Microprácticas', titulo: 'Microprácticas cotidianas y clima organizacional',
        cuerpo: [
          'Llamamos microprácticas a conductas pequeñas, frecuentes y a menudo no intencionadas que, acumuladas, definen el lugar de cada persona en el equipo: interrumpir sistemáticamente a una compañera, repetir su idea minutos después y recibir el crédito, pedirle a la única mujer del grupo que tome el acta o que organice el refrigerio, excluir a alguien de los espacios informales donde se toman decisiones, o explicarle a una profesional lo que ella ya domina.',
          'Tomadas de una en una parecen insignificantes; sumadas producen desgaste, silencio y salida. La norma ISO 45003 identifica entre los peligros psicosociales la violencia en el trabajo, el acoso, la intimidación y la victimización, la falta de apoyo y la propia cultura organizacional, y propone gestionarlos dentro del sistema de gestión de SST (F-31, Tabla 1). En Colombia, la evaluación periódica de factores de riesgo psicosocial se realiza con la Batería de instrumentos adoptada por el Ministerio del Trabajo (F-12) dentro del Sistema de Gestión de la Seguridad y Salud en el Trabajo (F-11), y la reglamentación reciente integra en ese sistema el riesgo asociado al acoso y la violencia (F-08, art. 2.2.1.8.2.4).',
          'Las microprácticas cambian de forma según el sector. En el teletrabajo, las personas que trabajan a distancia quedan fuera de las decisiones que se toman "en el pasillo" de la sede. En salud, el acompañamiento emocional a pacientes y familias recae de manera tácita en las mujeres del equipo, sin reconocimiento ni tiempo asignado. En servicios de atención al cliente, se instruye a las mujeres a "sonreír más" y se tolera que un cliente les hable en tono condescendiente. En agroindustria, las mujeres de una cuadrilla reciben las tareas "más delicadas" y los hombres las que conducen a ascensos.',
          'El clima se lee en señales observables: quién habla en las reuniones y quién calla, a quién se le atribuyen las ideas, quién se queda más tiempo en la organización y quién se va, quién es promovido y quién no. Las guías para empresas señalan que estos patrones tienen costos de rotación, ausentismo y desempeño, además del costo humano (F-22). Observarlos con método es la base de cualquier mejora.',
          'La responsabilidad de gestionar el clima no recae en quienes sufren las microprácticas. Corresponde a la organización medir, a los líderes modelar y corregir, y a cada persona del equipo cuidar sus propias prácticas: ceder la palabra, atribuir las ideas a quien las propuso, rotar las tareas invisibles y asegurarse de que quienes trabajan a distancia o en otros turnos participen en las decisiones.'
        ],
        situacion: 'En el equipo de mantenimiento de una planta de manufactura, la única técnica del grupo es quien siempre toma el acta de las reuniones y organiza la celebración de los cumpleaños. Cuando propone cambiar el plan de mantenimiento de una línea, nadie responde; veinte minutos después un compañero plantea la misma idea y el jefe la aprueba "por iniciativa de él".',
        actividad: { titulo: 'Actividad de reflexión', instrucciones: 'En la próxima reunión de su equipo, observe con discreción la dinámica de participación. Registre patrones generales, no comportamientos de personas identificables.', preguntas: [
          '¿Quién habla, quién es interrumpido y a quién se le atribuyen las ideas? ¿Observa algún patrón relacionado con el género?',
          '¿Qué tareas "invisibles" (actas, celebraciones, orden, atención a visitantes) recaen en quién, y cómo se decidió?',
          '¿Cómo participan en las decisiones las personas que trabajan a distancia o en turnos distintos?'
        ] },
        tarjeta: { tipo: 'turquesa', texto: 'Idea clave: las microprácticas son riesgo psicosocial en pequeñas dosis. Se gestionan observando, midiendo y corrigiendo, no pidiendo a las personas afectadas que las aguanten.' },
        referencias: ['F-08', 'F-11', 'F-12', 'F-22', 'F-31'] },

      { id: 'l4', tipo: 'Corresponsabilidad', titulo: 'Corresponsabilidad: lo que puedo hacer desde mi rol',
        cuerpo: [
          'Corresponsabilidad significa que cada persona, desde el rol que ocupa, aporta a un entorno respetuoso y seguro. La Ley 1257 la formula como principio: la sociedad y la familia son responsables de respetar los derechos de las mujeres y de contribuir a eliminar la violencia, mientras el Estado previene, investiga y sanciona (F-02, art. 6). En una organización, esto se traduce en que la cultura no es responsabilidad exclusiva de talento humano ni de la dirección, aunque ambas tengan obligaciones específicas.',
          'A la dirección le corresponde el compromiso visible y los recursos: los WEPs lo sitúan como el primer principio, y la formación como el cuarto (F-24). El Convenio 190 asigna al empleador la política, la evaluación de riesgos y la información y formación (F-20, art. 9), y la reglamentación colombiana exige política y protocolo construidos de manera participativa, con formación anual (F-08, art. 2.2.1.8.2.1). A los mandos medios les corresponde modelar el trato, aplicar los criterios con equidad y responder cuando algo ocurre en su equipo; de hecho, la Resolución 3461 de 2025 prevé capacitación específica para directivos y mandos medios (F-06, art. 12).',
          'A cada persona del equipo le corresponde algo más modesto y más frecuente: intervenir con respeto cuando presencia una práctica inadecuada. Intervenir no es confrontar ni humillar: puede ser nombrar lo que pasó ("creo que ella no terminó su idea, ¿la escuchamos?"), redirigir ("volvamos a la propuesta de Marcela"), preguntar ("¿a qué te refieres con eso?") o acercarse después a la persona afectada para saber cómo está y recordarle que existen canales de orientación.',
          'Intervenir no incluye investigar hechos, decidir sanciones ni confrontar a presuntos responsables; esas funciones tienen instancias definidas (ver Módulo 3). Tampoco incluye exponer públicamente a la persona que cometió el error: la corrección respetuosa es más eficaz y más coherente con el entorno que se quiere construir.',
          'La cultura cambia por consistencia, no por campañas aisladas. Pequeñas acciones repetidas por muchas personas, respaldadas por líderes que las modelan y por una organización que las formaliza, transforman más que un evento anual. La pregunta para cada equipo es qué acuerdos tiene y cómo los mantiene vivos.'
        ],
        situacion: 'En el turno de la noche de un hospital, un médico bromea en la estación de enfermería sobre "las enfermeras que siempre andan coqueteando". Un enfermero responde, sin alzar la voz: "esa clase de comentarios no va con este equipo, doctor". Más tarde pregunta a su compañera si está bien y le recuerda que el hospital tiene un canal para situaciones que incomoden. Al día siguiente, la coordinación del servicio recuerda en la entrega de turno el acuerdo de convivencia.',
        actividad: { titulo: 'Actividad de reflexión', instrucciones: 'Piense en los acuerdos y respaldos que existen en su equipo para intervenir ante prácticas inadecuadas. Analice condiciones organizacionales, no situaciones personales.', preguntas: [
          '¿Qué respuestas tiene su equipo acordadas (explícita o implícitamente) para cuando alguien hace un comentario o tiene una conducta inadecuada?',
          '¿Qué le facilitaría a una persona del equipo intervenir con respeto (respaldo de los líderes, acuerdos escritos, formación, ejemplos)?',
          '¿Qué mensaje transmite el liderazgo de su área, con sus acciones, cuando ocurre algo así?'
        ] },
        tarjeta: { tipo: 'violeta', texto: 'Idea clave: intervenir con respeto es nombrar, redirigir, preguntar y acompañar. No es investigar, sancionar ni exponer a nadie.' },
        referencias: ['F-02', 'F-06', 'F-08', 'F-20', 'F-24'] }
    ],
    quiz: [
      { id: 'p1', texto: '¿Cuál de las siguientes situaciones ilustra mejor un sesgo de género en una decisión laboral?',
        opciones: [
          { id: 'a', texto: 'Una organización publica por escrito los criterios de promoción y los aplica a todas las personas.' },
          { id: 'b', texto: 'El mismo comportamiento se evalúa como "decidido" en un hombre y como "conflictivo" en una mujer.' },
          { id: 'c', texto: 'Un equipo rota las tareas de apoyo entre todas las personas.' },
          { id: 'd', texto: 'Una organización revisa anualmente sus datos de contratación desagregados por sexo.' }
        ], correcta: 'b',
        retro: { ok: 'Correcto. Evaluar el mismo comportamiento de forma distinta según el género de la persona es un sesgo, con frecuencia inadvertido. Las otras opciones son prácticas que reducen el espacio para el sesgo.', no: 'Revise la lección 1. El sesgo aparece cuando una creencia sobre el género influye en una decisión, como calificar de manera distinta una misma conducta. Criterios explícitos, rotación de tareas y datos desagregados son, por el contrario, prácticas que lo reducen.' },
        referencia: 'F-24' },
      { id: 'p2', texto: 'En una entrevista de selección se pregunta a la candidata cuántos hijos tiene y quién los cuida; al candidato no se le pregunta nada similar. ¿Qué es más acertado afirmar?',
        opciones: [
          { id: 'a', texto: 'Es una práctica razonable para prever el ausentismo.' },
          { id: 'b', texto: 'Es aceptable siempre que la candidata responda voluntariamente.' },
          { id: 'c', texto: 'Es una práctica discriminatoria que contradice el trato equitativo sin discriminación y debe revisarse.' },
          { id: 'd', texto: 'Solo sería un problema si la candidata no fuera contratada.' }
        ], correcta: 'c',
        retro: { ok: 'Así es. Preguntar solo a las mujeres por sus responsabilidades de cuidado introduce un criterio ajeno al cargo y contradice el principio de trato equitativo sin discriminación. Conviene usar las mismas preguntas, centradas en el cargo, para todas las personas.', no: 'Revise la lección 1. Prever el ausentismo o la voluntariedad de la respuesta no corrige el problema: la pregunta introduce un criterio ajeno al cargo y se aplica solo a las mujeres. Es una práctica discriminatoria, independientemente del resultado de la selección.' },
        referencia: 'F-24' },
      { id: 'p3', texto: 'Según la norma ISO 45003, ¿cómo deberían entenderse prácticas repetidas como interrumpir, excluir o descalificar a ciertas personas del equipo?',
        opciones: [
          { id: 'a', texto: 'Como asuntos de personalidad que cada persona debe resolver por su cuenta.' },
          { id: 'b', texto: 'Como peligros psicosociales relacionados con la cultura organizacional que la organización debería identificar y gestionar.' },
          { id: 'c', texto: 'Como requisitos de una certificación obligatoria en Colombia.' },
          { id: 'd', texto: 'Como conductas irrelevantes mientras no haya una queja formal.' }
        ], correcta: 'b',
        retro: { ok: 'Correcto. ISO 45003 incluye la violencia, el acoso, la intimidación, la falta de apoyo y la cultura organizacional entre los peligros psicosociales que se gestionan dentro del sistema de SST. Es una norma de directrices, no certificable, citada aquí como buena práctica.', no: 'Revise la lección 3. Las microprácticas repetidas no son asuntos individuales ni requieren una queja para importar: ISO 45003 las trata como peligros psicosociales que la organización gestiona. Además, ISO 45003 es una norma de directrices, no una certificación obligatoria.' },
        referencia: 'F-31' },
      { id: 'p4', texto: '¿Cuál de estas reformulaciones contribuye a una comunicación respetuosa y sin estereotipos?',
        opciones: [
          { id: 'a', texto: '"Qué bien que una mujer se anime con un tema tan técnico".' },
          { id: 'b', texto: '"Les presento a las niñas del área administrativa".' },
          { id: 'c', texto: '"Gracias por el análisis, nos ayuda a decidir".' },
          { id: 'd', texto: '"Para esto mejor que venga uno de los muchachos".' }
        ], correcta: 'c',
        retro: { ok: 'Correcto. Reconocer el aporte sin condicionarlo al género y nombrar a las personas por su rol construye respeto. Las otras frases infantilizan, condicionan el reconocimiento al género o asignan capacidades según el sexo.', no: 'Revise la lección 2. Las frases que infantilizan ("las niñas"), que condicionan el reconocimiento al género ("qué bien que una mujer…") o que asignan capacidades por sexo refuerzan estereotipos. La comunicación respetuosa reconoce el aporte y nombra a las personas por su rol.' },
        referencia: 'F-25' },
      { id: 'p5', texto: 'Un líder de equipo ve en el grupo de mensajería del área un chiste de contenido sexual sobre una compañera. ¿Cuál es la actuación más coherente con la corresponsabilidad?',
        opciones: [
          { id: 'a', texto: 'Ignorarlo para no generar conflicto en el grupo.' },
          { id: 'b', texto: 'Expulsar del grupo a quien lo envió y anunciar públicamente la razón.' },
          { id: 'c', texto: 'Indicar en el grupo que ese tipo de mensajes no es aceptable, recordar el acuerdo de convivencia y quedar disponible para la persona aludida, informándole del canal de orientación.' },
          { id: 'd', texto: 'Iniciar por su cuenta una investigación entrevistando a todo el equipo.' }
        ], correcta: 'c',
        retro: { ok: 'Correcto. Nombrar con respeto, recordar las normas y acompañar a la persona afectada es intervenir sin investigar ni exponer a nadie. Si la situación lo requiere, corresponde orientarla hacia el canal definido por la organización.', no: 'Revise la lección 4. Ignorar refuerza el silencio; exponer públicamente o investigar por cuenta propia excede el rol de un líder de equipo. La intervención corresponsable es nombrar, recordar las normas, acompañar y orientar hacia el canal competente.' },
        referencia: 'F-22' }
    ],
    recursos: ['rec-sesgos', 'rec-cultura', 'rec-sensibilizacion', 'rec-indicadores', 'rec-glosario'],
    bibliografia: ['F-01', 'F-02', 'F-05', 'F-06', 'F-08', 'F-11', 'F-12', 'F-20', 'F-22', 'F-24', 'F-25', 'F-31', 'F-32'],
    revision: { fecha: '2026-11-03', responsable: 'Equipo técnico Turquesa Hub (redacción inicial)', estadoPsicosocial: 'pendiente', estadoJuridico: 'pendiente' }
  },

  {
    id: 'mod-3', orden: 3, color: 'turquesa', duracion: '50 min',
    titulo: 'Entornos laborales seguros',
    resumen: 'Qué distingue el acoso laboral, el acoso sexual, la discriminación y la violencia y acoso en el trabajo; qué conductas y ámbitos cubre la ley; y qué corresponde a la organización, al Comité de Convivencia Laboral, a las autoridades y a cada persona.',
    objetivos: [
      'Al finalizar, la persona podrá distinguir el acoso laboral, el acoso sexual, la discriminación y la violencia y acoso en el mundo del trabajo, e identificar la norma de referencia de cada categoría.',
      'Al finalizar, la persona podrá identificar conductas y ámbitos que la normativa colombiana presume vinculados al contexto laboral.',
      'Al finalizar, la persona podrá describir lo que corresponde a la organización, al Comité de Convivencia Laboral, a las autoridades competentes y a cada persona frente a estas situaciones.',
      'Al finalizar, la persona podrá reconocer los componentes mínimos de una política, un protocolo y una ruta interna de atención.'
    ],
    lecciones: [
      { id: 'l1', tipo: 'Concepto', titulo: 'Cuatro categorías que no son lo mismo',
        cuerpo: [
          'En el trabajo conviven varias categorías jurídicas que se confunden con facilidad. Nombrarlas con precisión importa porque cada una tiene una norma, una instancia y un procedimiento distintos. La primera es el acoso laboral, regulado por la Ley 1010 de 2006: una conducta persistente y demostrable, ejercida sobre una persona trabajadora por un empleador, un jefe, un compañero o un subalterno, encaminada a infundir miedo, intimidación, angustia, a causar perjuicio laboral o desmotivación, o a inducir la renuncia. La ley describe seis modalidades: maltrato, persecución, discriminación, entorpecimiento, inequidad y desprotección laboral (F-01, art. 2).',
          'La segunda es el acoso sexual, regulado por la Ley 2365 de 2024: todo acto de persecución, hostigamiento o asedio de carácter o connotación sexual, que se da por relaciones de poder verticales u horizontales, una o varias veces, en el contexto laboral (F-04, art. 2). Dos diferencias prácticas con el acoso laboral: no se exige persistencia (un solo acto puede constituirlo) y su contenido es de carácter sexual. La Ley 2365 remite a la Ley 1010 en lo no previsto (F-04, art. 17).',
          'La tercera es la discriminación: tratar de forma desfavorable a una persona por razón de su sexo, su género u otra condición. En Colombia tiene desarrollo en la Ley 2466 de 2025 (F-05, art. 15 a 17), aparece como modalidad de acoso laboral cuando es persistente (F-01, art. 2) y se vincula con el mandato de igualdad salarial y de campañas contra la discriminación en el trabajo de la Ley 1257 (F-02, art. 12). Una decisión discriminatoria puede ser un hecho único (no contratar a alguien por su embarazo) y no requiere componente sexual.',
          'La cuarta es la categoría más amplia: la violencia y el acoso en el mundo del trabajo. La Ley 2466 la define como comportamientos inaceptables, únicos o repetidos, que causen o puedan causar daño físico, psicológico, sexual o económico, incluida la violencia y el acoso por razón de género; cubre a toda persona sin importar su vínculo e incluye los espacios digitales y a terceros, y exige protocolos y mecanismos conforme a las Leyes 1010, 1257 y 2365 (F-05, art. 18). Esta definición sigue la del Convenio 190 de la OIT (F-20, art. 1), aprobado en Colombia mediante la Ley 2528 de 2025; su estado de ratificación y entrada en vigor debe verificarse antes de afirmar que está vigente (F-07). Las violencias basadas en género fuera de estas categorías, por ejemplo las que ocurren en la pareja y repercuten en el trabajo, se enmarcan en la Ley 1257 (F-02).',
          'Las categorías pueden coincidir en una misma situación: un supervisor que, tras una negativa a sus insinuaciones, cambia los turnos de una trabajadora para perjudicarla está incurriendo en conductas de acoso sexual y de persecución laboral a la vez. Lo importante no es que la persona afectada o su compañero clasifiquen el hecho, sino que la organización tenga definido quién recibe la situación y la encauza por la vía que corresponda.'
        ],
        situacion: 'En una planta de manufactura, un supervisor hace comentarios de connotación sexual a una operaria y la invita a salir en varias ocasiones. Cuando ella rechaza las invitaciones, él comienza a asignarle los turnos menos favorables y a cuestionar públicamente su rendimiento. La coordinadora de talento humano se pregunta si debe tratar el caso como acoso laboral o como acoso sexual, y si el Comité de Convivencia debe intervenir.',
        actividad: { titulo: 'Actividad de reflexión', instrucciones: 'Revise la política interna, el reglamento de trabajo o el protocolo de su organización (o lo que exista) con los documentos a la vista. Analice textos, no casos.', preguntas: [
          '¿Nombra la política de su organización, de forma diferenciada, el acoso laboral, el acoso sexual, la discriminación y la violencia y acoso en el trabajo? ¿Con qué norma asocia cada uno?',
          '¿Saben las personas del equipo a qué instancia corresponde cada categoría, o todo "va al Comité de Convivencia"?',
          '¿Qué términos usa el reglamento interno y cuándo se actualizó por última vez frente a las normas de 2024 y 2025?'
        ] },
        tarjeta: { tipo: 'turquesa', texto: 'Idea clave: acoso laboral (Ley 1010), acoso sexual (Ley 2365), discriminación (Ley 2466) y violencia y acoso en el trabajo (Ley 2466 art. 18 y Convenio 190) tienen normas e instancias distintas; una misma situación puede involucrar varias.' },
        referencias: ['F-01', 'F-02', 'F-04', 'F-05', 'F-07', 'F-20'] },

      { id: 'l2', tipo: 'Conductas', titulo: 'Conductas y ámbitos: dónde y cómo ocurren',
        cuerpo: [
          'La Ley 1010 enumera conductas que constituyen acoso laboral cuando son persistentes; entre ellas, la descalificación humillante de la persona en presencia de compañeros, las burlas sobre la apariencia física o la forma de vestir formuladas en público, la alusión pública a hechos de la intimidad de la persona y la exigencia de laborar en horarios excesivos sin justificación (F-01, art. 7). Varias de estas conductas adquieren una dimensión de género cuando se dirigen a una persona por ser mujer o por no ajustarse a lo que el entorno espera de su género.',
          'En el acoso sexual, las conductas incluyen insinuaciones o propuestas de carácter sexual, comentarios o miradas de connotación sexual, invitaciones insistentes después de una negativa, contactos físicos no deseados, envío de mensajes o imágenes de contenido sexual y condicionamiento de oportunidades laborales a la aceptación de acercamientos. La ley las caracteriza como persecución, hostigamiento o asedio de carácter sexual y no exige que se repitan (F-04, art. 2). Un criterio práctico, recogido en las guías para empresas, es que la conducta no sea deseada y el efecto que produce en quien la recibe (F-22, pp. 24 y 28); la intención de quien actúa no es, por sí sola, el criterio determinante.',
          'El ámbito es más amplio que el puesto de trabajo. La Ley 2365 presume el contexto laboral en el lugar de trabajo, los lugares de pago y descanso, los viajes y eventos relacionados con el trabajo, las comunicaciones laborales (incluidas las digitales), los trayectos entre el domicilio y el trabajo y los alojamientos suministrados por el empleador; y no exige relación laboral o contractual entre la persona afectada y quien agrede (F-04, art. 7). La Ley 2466 incorpora los espacios digitales y las conductas de terceros, clientes y proveedores (F-05, art. 18).',
          'Esto tiene consecuencias concretas por sector. En agroindustria, los alojamientos de cosecha son contexto laboral. En salud, la conducta de un paciente o de un familiar hacia una enfermera compromete a la institución, que debe prevenirla y atenderla aunque quien agrede no sea empleado. En servicios, la visita a un cliente y el transporte de regreso hacen parte del trabajo. En teletrabajo, la videollamada y el chat del proyecto son el lugar de trabajo.',
          'Conocer conductas y ámbitos no convierte a nadie en investigador. Sirve para que las personas reconozcan a tiempo lo que no es aceptable, para que los líderes no minimicen lo que ocurre fuera de la sede o en un chat, y para que la organización diseñe su política y su protocolo cubriendo todos los espacios donde realmente trabaja su gente.'
        ],
        situacion: 'Durante la cosecha, una empresa agrícola aloja a las cuadrillas en dormitorios dentro de la finca. El mayordomo entra de noche al dormitorio de las mujeres "para verificar que todo esté en orden" y hace comentarios sobre sus cuerpos. Cuando una trabajadora lo comenta con el administrador, este responde que "eso no es asunto de la empresa porque pasa después de la jornada".',
        actividad: { titulo: 'Actividad de reflexión', instrucciones: 'Contraste los ámbitos que reconoce la Ley 2365 (art. 7) con la realidad de su organización. Trabaje sobre procesos y espacios, no sobre personas.', preguntas: [
          '¿Cuáles de estos ámbitos existen en su organización (trayectos, eventos, viajes, alojamientos, comunicaciones digitales) y cuáles están cubiertos de forma explícita en la política o el protocolo?',
          '¿Cómo se atiende una conducta de un cliente, usuario, paciente o proveedor hacia una persona del equipo? ¿Existe un procedimiento?',
          '¿Qué dice el reglamento o el acuerdo de convivencia sobre el uso de grupos de mensajería y comunicaciones fuera del horario?'
        ] },
        tarjeta: { tipo: 'naranja', texto: 'Idea clave: el contexto laboral llega hasta donde llega el trabajo: alojamientos, trayectos, eventos y chats. Lo determinante en la conducta es su efecto y que no sea deseada, no la intención de quien la realiza.' },
        referencias: ['F-01', 'F-04', 'F-05', 'F-22'] },

      { id: 'l3', tipo: 'Responsabilidades', titulo: 'Lo que corresponde a la organización, al Comité de Convivencia y a las autoridades',
        cuerpo: [
          'A la organización le corresponde actuar dentro de su competencia, y esa competencia es amplia. La Ley 2365 obliga a los empleadores a adoptar una política interna de prevención del acoso sexual reflejada en el reglamento de trabajo, los contratos, los protocolos y las rutas; a establecer mecanismos de atención, prevención y no repetición; a aplicar medidas de protección inmediata para evitar un daño irremediable; a informar a la persona afectada de su facultad de acudir a la Fiscalía; a remitir la queja a la autoridad competente cuando ella lo pida; a abstenerse de cualquier acto de revictimización; y a publicar semestralmente, de forma anonimizada, el número de quejas tramitadas y sanciones impuestas (F-04, art. 11). Las medidas de protección deben adoptarse en plazos cortos y la persona afectada tiene derecho a atención emocional a través de la ARL (F-04, art. 13).',
          'El Decreto 1040 de 2026 desarrolla estas obligaciones para el acoso, la violencia, la VBG y la discriminación en el trabajo: una ruta interna con fases de orientación, recepción, investigación, protección y cierre; canales confidenciales con responsables designados; investigación interna con debida diligencia, enfoque de género y flexibilización probatoria; medidas de protección sin exigir prueba previa; protección frente a represalias; y decisiones que incluyan reparación y garantías de no repetición. Cuando el presunto acosador es superior jerárquico de la persona afectada, el decreto atribuye competencia a la inspección del trabajo (F-08, arts. 2.2.1.8.2.1 a 2.2.1.8.3.10). La Circular 0076 de 2025 del Ministerio del Trabajo refuerza la debida diligencia y prohíbe la confrontación entre la persona afectada y el presunto agresor (F-09).',
          'Esto significa que la organización sí investiga internamente, dentro de su competencia y con garantías, y adopta medidas y decisiones. Lo que no hace es sustituir a las autoridades: no determina responsabilidad penal, no reemplaza a la Fiscalía ni a los jueces, y no condiciona el acceso de la persona a esas vías. La queja interna no es requisito para presentar una denuncia penal (F-04, art. 15).',
          'El Comité de Convivencia Laboral tiene un alcance específico. Conforme a la Resolución 3461 de 2025, cumple funciones preventivas, orientadoras y conciliadoras frente a quejas de acoso laboral, con plazos definidos y deber de confidencialidad (F-06, art. 4, 6 y 8). Pero no es competente para recibir ni tramitar quejas de acoso sexual, porque estas no son conciliables; en esos casos, la alta dirección o el área de talento humano define el procedimiento conforme a la Ley 2365 (F-06, art. 6, parágrafo 1). Enviar una queja de acoso sexual al Comité "porque ahí van todas las quejas" es un error que retrasa la protección.',
          'Las autoridades competentes son varias: el Ministerio del Trabajo y sus inspecciones vigilan el cumplimiento y pueden sancionar (F-05, art. 18; F-06, art. 15); la Fiscalía recibe denuncias cuando la conducta puede constituir delito, y la persona afectada decide si acude a ella (F-04, art. 11, num. 4 y 5); los jueces, las comisarías de familia y los servicios de salud intervienen en las violencias contra las mujeres conforme a la Ley 1257 (F-02). Turquesa Hub no es una de esas instancias ni un canal de queja: su función es apoyar la gestión preventiva, y cada organización debe comunicar sus canales e instancias.'
        ],
        situacion: 'En una empresa de servicios, la coordinadora de talento humano recibe una queja por acoso sexual y la remite al Comité de Convivencia Laboral "porque ahí llegan todas las quejas". El Comité responde que no es competente para ese tipo de situaciones. Pasan tres semanas sin que se adopte ninguna medida de protección y la persona afectada sigue compartiendo el mismo espacio con quien señaló.',
        actividad: { titulo: 'Actividad de reflexión', instrucciones: 'Verifique, con los documentos de su organización, cómo están distribuidas las responsabilidades. Analice procedimientos, no casos.', preguntas: [
          '¿Existe un protocolo para acoso sexual diferenciado del procedimiento del Comité de Convivencia Laboral, y quién lo aplica (alta dirección, talento humano, responsable designado)?',
          '¿Quién recibe las quejas, por qué medios y con qué garantías de confidencialidad y de protección frente a represalias?',
          '¿Cómo se informa a las personas sobre su facultad de acudir a la Fiscalía y a otras autoridades, y cómo se remite una queja cuando la persona lo solicita?'
        ] },
        tarjeta: { tipo: 'violeta', texto: 'Idea clave: la organización previene, recibe, protege, investiga con debida diligencia dentro de su competencia, decide y remite cuando corresponde. El Comité de Convivencia atiende acoso laboral, no acoso sexual. Las autoridades no se sustituyen.' },
        referencias: ['F-02', 'F-04', 'F-05', 'F-06', 'F-08', 'F-09'] },

      { id: 'l4', tipo: 'Responsabilidades', titulo: 'Lo que corresponde a cada persona y los componentes de un entorno seguro',
        cuerpo: [
          'A cada persona de la organización le corresponde conocer la política y los canales, abstenerse de conductas que vulneren a otras personas, no reforzar el silencio y orientar hacia los canales a quien lo necesite. No le corresponde investigar hechos, confrontar a presuntos responsables ni difundir información. Quien presenta una queja o testifica tiene derecho a protección frente a represalias (F-04, art. 5; F-08, art. 2.2.1.8.2.7), y las personas que conocen una situación por su rol tienen deber de confidencialidad.',
          'A los líderes y mandos medios les corresponde algo más: con frecuencia son quienes reciben la primera manifestación de una situación. Les corresponde no minimizarla, no resolverla "entre nosotros", encauzarla de inmediato hacia el canal definido y colaborar en las medidas de protección. La Resolución 3461 prevé capacitación para directivos y mandos medios sobre estas responsabilidades (F-06, art. 12). Un líder que dice "yo lo arreglo hablando con los dos" está, sin proponérselo, confrontando a la persona afectada con el presunto agresor, lo que contraría el derecho a no ser confrontada con el presunto agresor (F-04, art. 5) y la recomendación del Ministerio del Trabajo (F-09).',
          'Un entorno seguro tiene componentes verificables. Siguiendo el Convenio 190 y la reglamentación colombiana: una política de cero tolerancia construida de forma participativa, publicada, socializada y acompañada de espacios anuales de formación y actualización; un protocolo y una ruta con responsables; canales de queja electrónicos, físicos o verbales (F-04, art. 15; F-08, art. 2.2.1.8.2.6); medidas de protección oportunas; integración del riesgo en el sistema de gestión de seguridad y salud en el trabajo; y estadísticas anonimizadas para el seguimiento (F-04, art. 11; F-08; F-20, arts. 9 y 10 para política, evaluación de riesgos, formación y vías de recurso). La guía del PNUD lo resume en cuatro componentes: compromiso, detección, acción y monitoreo (F-22).',
          'Para los canales de queja, la norma ISO 37002 ofrece principios útiles como referencia de buenas prácticas: confianza, imparcialidad y protección de quien reporta, con fases de recepción, evaluación, tratamiento y cierre (F-34). Un canal que existe en el papel pero que nadie conoce, que atiende la misma persona señalada en la mayoría de los casos, o al que no pueden acceder contratistas y personas en formación, no cumple su función.',
          'Finalmente, la cobertura. La política y los canales deben alcanzar a todas las personas que trabajan para la organización sin importar su vínculo, incluidas las personas en formación, voluntarias y en búsqueda de empleo (F-05, art. 18; F-20, art. 2). En una clínica, eso incluye a las practicantes; en una finca, a las cuadrillas temporales; en una empresa de servicios, al personal tercerizado que comparte los espacios.'
        ],
        situacion: 'Una empresa de atención telefónica con la mayoría de su personal en teletrabajo publica su ruta de atención solo en la intranet, a la que no tienen acceso las personas contratadas por prestación de servicios. Cuando una contratista pregunta a su supervisor cómo presentar una queja, él le responde que "eso es para los de planta" y le sugiere "hablar directamente con la persona para arreglar el malentendido".',
        actividad: { titulo: 'Actividad de reflexión', instrucciones: 'Haga una verificación práctica de la accesibilidad de los canales y de la cobertura de la política de su organización. Describa condiciones, no situaciones personales.', preguntas: [
          '¿Por qué medios (electrónico, físico, verbal) puede una persona de su equipo presentar una queja, quién la recibe y cómo se garantiza la confidencialidad?',
          '¿Incluye la política, de manera explícita, a personas en formación, contratistas, personal temporal y tercerizado? ¿Cómo acceden ellas a la información?',
          '¿Cuándo se actualizó la política por última vez, con qué participación, y con qué frecuencia se forma al personal?'
        ] },
        tarjeta: { tipo: 'turquesa', texto: 'Idea clave: a cada persona le corresponde conocer, abstenerse, no silenciar y orientar. A los líderes, encauzar sin minimizar ni "arreglar entre nosotros". A la organización, que la ruta exista, se conozca y alcance a todas las personas.' },
        referencias: ['F-04', 'F-05', 'F-06', 'F-08', 'F-09', 'F-20', 'F-22', 'F-34'] }
    ],
    quiz: [
      { id: 'p1', texto: '¿Cuál afirmación distingue correctamente el acoso laboral (Ley 1010 de 2006) del acoso sexual (Ley 2365 de 2024)?',
        opciones: [
          { id: 'a', texto: 'Son lo mismo y se tramitan ante el Comité de Convivencia Laboral.' },
          { id: 'b', texto: 'El acoso laboral exige una conducta persistente y demostrable; el acoso sexual es persecución, hostigamiento o asedio de connotación sexual, que puede ocurrir una o varias veces.' },
          { id: 'c', texto: 'El acoso laboral solo ocurre entre pares; el acoso sexual solo ocurre de jefe a subalterna.' },
          { id: 'd', texto: 'El acoso sexual requiere al menos tres episodios documentados para ser considerado como tal.' }
        ], correcta: 'b',
        retro: { ok: 'Correcto. La persistencia es un elemento del acoso laboral en la Ley 1010, mientras que la Ley 2365 contempla el acoso sexual aunque ocurra una sola vez y en relaciones de poder verticales u horizontales. Son categorías distintas con instancias distintas.', no: 'Revise la lección 1. El acoso laboral requiere persistencia (Ley 1010); el acoso sexual no la exige y puede darse entre pares o en relaciones jerárquicas (Ley 2365). No son lo mismo y el Comité de Convivencia no es competente para el acoso sexual.' },
        referencia: 'F-04' },
      { id: 'p2', texto: 'El Comité de Convivencia Laboral recibe una queja por acoso sexual. Conforme a la Resolución 3461 de 2025, ¿qué corresponde?',
        opciones: [
          { id: 'a', texto: 'Tramitarla como cualquier otra queja y proponer una conciliación entre las partes.' },
          { id: 'b', texto: 'Archivarla, porque no existe procedimiento para ese tipo de situaciones.' },
          { id: 'c', texto: 'Reconocer que el Comité no es competente, pues estas quejas no son conciliables, y que la alta dirección o talento humano debe aplicar el procedimiento conforme a la Ley 2365.' },
          { id: 'd', texto: 'Remitirla a Turquesa Hub para que gestione el caso.' }
        ], correcta: 'c',
        retro: { ok: 'Correcto. La Resolución 3461 establece que el Comité no es competente para quejas de acoso sexual, que no son conciliables, y que la alta dirección o talento humano define el procedimiento conforme a la Ley 2365. Esto evita retrasos en la protección.', no: 'Revise la lección 3. El Comité de Convivencia atiende acoso laboral con funciones preventivas, orientadoras y conciliadoras; el acoso sexual no es conciliable y corresponde a la alta dirección o talento humano conforme a la Ley 2365. Turquesa Hub no gestiona casos.' },
        referencia: 'F-06' },
      { id: 'p3', texto: '¿Cuál de estas descripciones refleja mejor lo que corresponde a la organización frente a una situación de acoso sexual, conforme a la Ley 2365 y su reglamentación?',
        opciones: [
          { id: 'a', texto: 'La organización solo orienta y no investiga; todo lo demás corresponde a la Fiscalía.' },
          { id: 'b', texto: 'La organización espera una decisión judicial antes de adoptar cualquier medida de protección.' },
          { id: 'c', texto: 'La organización reúne a la persona afectada y al presunto agresor para que aclaren el malentendido.' },
          { id: 'd', texto: 'La organización aplica su política y protocolo, adopta medidas de protección, investiga internamente con debida diligencia dentro de su competencia, decide y remite a las autoridades cuando la persona lo pide.' }
        ], correcta: 'd',
        retro: { ok: 'Correcto. La competencia de la organización es amplia: política, protocolo, ruta, protección oportuna, investigación interna con debida diligencia, decisiones con no repetición y remisión a petición de la persona. No sustituye a las autoridades, pero tampoco se limita a orientar.', no: 'Revise la lección 3. Afirmar que la organización "solo orienta y no investiga" es incorrecto; tampoco debe esperar decisiones judiciales para proteger ni confrontar a las partes. Le corresponde proteger, investigar con debida diligencia dentro de su competencia, decidir y remitir cuando corresponda.' },
        referencia: 'F-04' },
      { id: 'p4', texto: 'En un evento de integración de la empresa realizado un sábado en una finca, un contratista hace comentarios de connotación sexual a una practicante. ¿Qué es correcto afirmar según la Ley 2365?',
        opciones: [
          { id: 'a', texto: 'No aplica la ley porque ocurrió un sábado y fuera de las instalaciones.' },
          { id: 'b', texto: 'No aplica porque un contratista y una practicante no tienen relación laboral entre sí.' },
          { id: 'c', texto: 'Se presume contexto laboral: los eventos relacionados con el trabajo están cubiertos y no se exige relación laboral entre las personas involucradas.' },
          { id: 'd', texto: 'Solo aplicaría si la practicante tuviera contrato laboral formal.' }
        ], correcta: 'c',
        retro: { ok: 'Correcto. La Ley 2365 presume el contexto laboral en eventos relacionados con el trabajo, cubre a contratistas, pasantes y practicantes, y no exige relación laboral o contractual entre la persona afectada y quien agrede.', no: 'Revise la lección 2. El día, el lugar o el tipo de vínculo no excluyen la aplicación de la ley: los eventos relacionados con el trabajo son contexto laboral, las practicantes están cubiertas y no se exige relación laboral entre las personas involucradas.' },
        referencia: 'F-04' },
      { id: 'p5', texto: 'Una persona considera presentar una denuncia penal por acoso sexual, pero no ha presentado queja interna en su organización. ¿Qué es correcto?',
        opciones: [
          { id: 'a', texto: 'Debe agotar primero la queja interna; sin ella la Fiscalía no recibe la denuncia.' },
          { id: 'b', texto: 'La queja interna no es requisito para la denuncia penal; la persona puede acudir a la Fiscalía y la organización debe informarle esa facultad.' },
          { id: 'c', texto: 'Solo puede denunciar si el Comité de Convivencia lo autoriza.' },
          { id: 'd', texto: 'Solo puede denunciar si la organización ya concluyó su investigación interna.' }
        ], correcta: 'b',
        retro: { ok: 'Correcto. La Ley 2365 establece que la queja interna no es requisito para la denuncia penal y obliga al empleador a informar a la persona afectada de su facultad de acudir a la Fiscalía. Las vías interna y penal son independientes.', no: 'Revise la lección 3. La queja interna y la denuncia penal son vías independientes: ninguna condiciona a la otra, el Comité de Convivencia no interviene en acoso sexual y la organización debe informar a la persona de su facultad de acudir a la Fiscalía.' },
        referencia: 'F-04' }
    ],
    recursos: ['rec-acoso-sexual', 'rec-acoso-laboral', 'rec-respuesta', 'rec-gobernanza', 'rec-ficha-1010', 'rec-ficha-2365', 'rec-ficha-3461', 'rec-ficha-2528'],
    bibliografia: ['F-01', 'F-02', 'F-04', 'F-05', 'F-06', 'F-07', 'F-08', 'F-09', 'F-20', 'F-22', 'F-34'],
    revision: { fecha: '2026-11-03', responsable: 'Equipo técnico Turquesa Hub (redacción inicial)', estadoPsicosocial: 'pendiente', estadoJuridico: 'pendiente' }
  },

  {
    id: 'mod-4', orden: 4, color: 'oscuro', duracion: '45 min',
    titulo: 'Reconocer, orientar y actuar responsablemente',
    resumen: 'Derechos de la persona afectada, principios de una primera escucha segura, cómo evitar la revictimización, límites de actuación de compañeros y líderes, rutas competentes y autocuidado de quien acompaña.',
    objetivos: [
      'Al finalizar, la persona podrá identificar los derechos de una persona afectada por acoso sexual u otras violencias basadas en género reconocidos en la normativa colombiana.',
      'Al finalizar, la persona podrá aplicar los principios de una primera escucha segura (escuchar, preguntar por necesidades, validar, reforzar la seguridad y apoyar) y los principios éticos de confidencialidad, consentimiento, autonomía y no hacer daño.',
      'Al finalizar, la persona podrá reconocer prácticas de revictimización, interpersonales e institucionales, y proponer alternativas.',
      'Al finalizar, la persona podrá distinguir los límites de su actuación, identificar las rutas competentes y reconocer la importancia del autocuidado de quien acompaña.'
    ],
    lecciones: [
      { id: 'l1', tipo: 'Derechos', titulo: 'Derechos de la persona afectada',
        cuerpo: [
          'Orientar bien empieza por saber que la persona afectada tiene derechos, aunque no seamos quienes los garantizamos. La Ley 2365 de 2024 reconoce a las víctimas de acoso sexual, entre otros, el derecho a la verdad, a ser tratadas con dignidad, a la intimidad y la confidencialidad, a la atención integral en salud, al acceso efectivo a la justicia, a la reparación, a la no repetición, a la no revictimización, a la protección frente a represalias y a no ser confrontadas con su agresor (F-04, art. 5). Además, tienen derecho a medidas de protección oportunas y a atención emocional a través de la ARL (F-04, art. 13) y a una protección reforzada de su estabilidad laboral durante un periodo posterior a la queja (F-04, art. 14).',
          'La Ley 1257 de 2008 aporta principios que orientan cualquier atención a mujeres afectadas por violencias: integralidad (información, prevención, orientación, protección, sanción, reparación y estabilización), autonomía (respeto de sus decisiones), no discriminación y atención diferenciada según las necesidades de cada persona (F-02, art. 6). La misma ley dispone que los empleadores deben contar con procedimientos para tramitar las quejas por acoso sexual y otras formas de violencia en el trabajo (F-02, art. 12).',
          'La persona afectada decide. Puede presentar una queja interna, acudir a la Fiscalía, hacer ambas cosas o ninguna; la queja interna no es requisito para la denuncia penal y la organización debe informarle su facultad de acudir a la Fiscalía y remitir la queja a la autoridad cuando ella lo solicite (F-04, art. 11, num. 4 y 5; art. 15). Quien acompaña no decide por ella ni la presiona en ningún sentido.',
          'La información sobre estas situaciones es un dato sensible. La Ley 1581 de 2012 establece principios de confidencialidad, acceso restringido y finalidad para el tratamiento de datos personales, con reglas especiales para los datos sensibles (F-03, art. 4 a 6). En la práctica, esto significa que lo que una persona cuenta no se comparte en grupos de mensajería, no se comenta en el equipo y no se registra en sistemas que no estén diseñados para ello. Turquesa Hub no registra casos ni datos de personas afectadas.',
          'Un compañero o una líder no necesita dominar el detalle jurídico. Necesita saber que estos derechos existen, dónde están las fichas de referencia (biblioteca de Turquesa Hub) y cuál es el canal de su organización. Los detalles de cada ruta corresponden a los profesionales y a las entidades competentes.'
        ],
        actividad: { titulo: 'Actividad de reflexión', instrucciones: 'Revise cómo comunica su organización los derechos de las personas afectadas. Analice documentos y prácticas institucionales, no casos.', preguntas: [
          '¿Se comunican estos derechos en la inducción, en la política o en el protocolo de su organización? ¿Con qué lenguaje?',
          '¿Qué garantías de confidencialidad y de protección frente a represalias están escritas y cómo se cumplen en la práctica (quién accede a la información, dónde se guarda)?',
          '¿Qué apoyos en salud (ARL, EPS, atención emocional) conoce el equipo y cómo se accede a ellos?'
        ] },
        tarjeta: { tipo: 'turquesa', texto: 'Idea clave: la persona afectada tiene derecho a confidencialidad, a no ser confrontada con su agresor, a protección frente a represalias y a decidir qué vía tomar. Quien acompaña informa; no decide.' },
        referencias: ['F-02', 'F-03', 'F-04'] },

      { id: 'l2', tipo: 'Escucha', titulo: 'Primera escucha segura: los principios LIVES',
        cuerpo: [
          'Cuando alguien decide contarnos una situación, lo que hacemos en esos primeros minutos importa mucho. La Organización Mundial de la Salud propone para la atención de primera línea un conjunto de principios conocido como LIVES: escuchar (Listen), preguntar por las necesidades (Inquire), validar (Validate), reforzar la seguridad (Enhance safety) y apoyar conectando con servicios (Support); con tres reglas transversales: no juzgar, no presionar y guardar confidencialidad (F-26). Aunque fue formulado para personal de salud, sus principios sirven para una primera escucha en el trabajo, siempre que se entienda que no se trata de atención clínica ni de gestión de casos.',
          'Escuchar significa dar tiempo, no interrumpir y no pedir detalles de lo ocurrido: no necesitamos saber qué pasó exactamente para orientar. Preguntar por necesidades significa centrarse en lo que la persona necesita ahora ("¿qué te ayudaría en este momento?"), no en reconstruir los hechos. Validar significa decir, con palabras sencillas, que le creemos, que no es su culpa y que hizo bien en hablar. Reforzar la seguridad significa preguntar si se siente segura ahora y, si hay un riesgo inmediato, ayudar a contactar el canal interno o los servicios de emergencia. Apoyar significa ofrecer información sobre los canales de la organización y las instancias externas, y ofrecer acompañamiento si la persona lo quiere.',
          'Estos principios se complementan con los principios éticos que recogen los estándares de atención a sobrevivientes: enfoque centrado en la persona, confidencialidad, consentimiento informado, respeto por su autonomía y no causar daño (F-28; F-29). En la práctica: no compartir lo que nos contó sin su permiso; preguntar antes de hablar con alguien más, incluso con talento humano; no prometer resultados que no dependen de nosotros; y respetar que decida no hacer nada por ahora, sin dejar de recordarle que los canales seguirán disponibles.',
          'Hay cosas que conviene evitar aunque nazcan de la buena intención: preguntar "¿y tú qué hiciste?" o "¿por qué no dijiste nada antes?", opinar sobre lo que "debería" hacer, llamar a la otra persona para "aclarar las cosas", o contar la situación al grupo "para que la apoyen". Cada una de estas reacciones traslada la carga a la persona afectada o la expone, y puede constituir revictimización (F-04, art. 5).',
          'Las condiciones materiales también cuentan. En una planta, una conversación de este tipo no se tiene junto a la línea de producción; en un hospital, no en la estación de enfermería; en teletrabajo, no en un chat grupal. Buscar un espacio privado, preguntar si es buen momento y acordar cómo seguir en contacto forman parte de una escucha segura.'
        ],
        situacion: 'Durante una llamada de trabajo, una analista que trabaja desde casa le comenta a un compañero que un cliente le envía mensajes insistentes a su número personal desde que lo atendió. El compañero le dice que lamenta que esté pasando por eso, le pregunta qué necesitaría ahora y si se siente segura, le cuenta que la empresa tiene un canal confidencial para situaciones con clientes y le pregunta si quiere que la acompañe a contactarlo. Ella pide pensarlo; él le dice que está disponible cuando lo decida y no comenta la conversación con nadie.',
        actividad: { titulo: 'Actividad de reflexión', instrucciones: 'Prepare su "kit" de primera escucha. Trabaje sobre recursos y condiciones de su entorno, no sobre experiencias personales.', preguntas: [
          '¿Qué información necesitaría tener a la mano (canal interno, responsable, servicios de salud, instancias externas) para poder orientar sin improvisar? ¿La tiene hoy?',
          '¿Qué frases de validación usaría y qué preguntas o comentarios evitaría? Escriba dos de cada una.',
          '¿Qué espacio de su lugar de trabajo (planta, hospital, oficina, teletrabajo) garantizaría privacidad para una conversación así?'
        ] },
        tarjeta: { tipo: 'naranja', texto: 'Idea clave: escuchar, preguntar por necesidades, validar, reforzar la seguridad y apoyar. Sin juzgar, sin presionar, con confidencialidad y con el consentimiento de la persona para cada paso.' },
        referencias: ['F-04', 'F-26', 'F-28', 'F-29'] },

      { id: 'l3', tipo: 'No revictimización', titulo: 'No revictimizar: formas sutiles de causar un nuevo daño',
        cuerpo: [
          'Revictimizar es hacer que una persona vuelva a sufrir por la forma en que se la trata después de lo ocurrido. La Ley 2365 reconoce el derecho a la no revictimización y obliga a los empleadores a abstenerse de cualquier acto de ese tipo, incluida la censura a quien quiera visibilizar su situación (F-04, art. 5 y 11, num. 6). La Circular 0076 de 2025 del Ministerio del Trabajo recomienda evitar que la persona afectada sea confrontada con el presunto agresor y recuerda, con la Sentencia T-104 de 2025, el deber de debida diligencia reforzada (F-09); la Ley 2365 reconoce el derecho a no ser confrontada (F-04, art. 5).',
          'La revictimización interpersonal suele ser sutil: dudar del relato ("¿estás segura de que fue así?"), atribuir responsabilidad ("tú también le seguías la corriente"), minimizar ("no es para tanto"), exigir pruebas antes de creer, presionar para que decida rápido o para que "no le haga daño a la carrera" de la otra persona, y comentar la situación con terceros. En un entorno de salud puede tomar la forma de "con lo que uno ve aquí todos los días, eso no es nada"; en una planta, de "si quería trabajar entre hombres, sabía a qué venía".',
          'La revictimización institucional ocurre en los procedimientos: hacer que la persona repita su relato ante varias instancias sin necesidad, convocar "reuniones de aclaración" con ambas partes, condicionar las medidas de protección a que primero aporte pruebas, trasladar de puesto a la persona afectada "por su bien" sin consultarla, o dejar pasar semanas sin respuesta. La reglamentación reciente aborda varias de estas prácticas: medidas de protección sin exigir prueba previa, confidencialidad y plazos cortos para las garantías (F-08, arts. 2.2.1.8.2.5, 2.2.1.8.3.4 (2.º) y 2.2.1.8.3.7; F-04, art. 13).',
          'En los espacios digitales, la revictimización se multiplica: reenviar capturas de pantalla, comentar la situación en grupos de mensajería, difundir quién presentó la queja. Estos actos violan la confidencialidad y pueden exponer a la persona a represalias, contra las que la ley la protege (F-04, art. 5). Los principios de gestión ética de casos coinciden en que la seguridad y la confidencialidad de la persona están por encima de la curiosidad o la "transparencia" del grupo (F-29).',
          'Las alternativas son concretas: creer primero, agradecer la confianza, no pedir detalles, no interrogar, no prometer, respetar los tiempos, preguntar antes de compartir, orientar hacia el canal y, en la organización, diseñar el procedimiento para que la persona cuente su situación una sola vez ante el responsable designado y reciba protección sin tener que probar nada previamente.'
        ],
        situacion: 'En un hospital, una auxiliar de enfermería informa a su coordinadora sobre conductas de connotación sexual de un médico del servicio. La coordinadora, con la intención de "resolverlo rápido y sin escándalo", convoca una reunión con los dos "para que cada uno diga su versión". La auxiliar sale de la reunión sin medidas de protección, con la sensación de no haber sido creída y sin saber que existía un canal distinto.',
        actividad: { titulo: 'Actividad de reflexión', instrucciones: 'Revise el procedimiento interno de su organización (o la práctica habitual, si no está escrito) desde la perspectiva de la persona afectada. Analice el procedimiento, no casos.', preguntas: [
          '¿En qué momentos del procedimiento interno una persona podría verse obligada a repetir su relato, y cómo podría evitarse?',
          '¿Existen prácticas que deberían revisarse (reuniones conjuntas, exigencia de pruebas previas para adoptar medidas, traslado de la persona afectada sin consultarla, demoras)?',
          '¿Cómo se maneja la información sobre estas situaciones en los grupos de mensajería y en las conversaciones informales del equipo? ¿Hay acuerdos explícitos?'
        ] },
        tarjeta: { tipo: 'violeta', texto: 'Idea clave: revictimizar es causar un nuevo daño con el trato posterior: dudar, culpar, exponer, confrontar o demorar. La persona debería contar su situación una sola vez y recibir protección sin tener que probar nada antes.' },
        referencias: ['F-04', 'F-08', 'F-09', 'F-29'] },

      { id: 'l4', tipo: 'Límites', titulo: 'Límites de actuación, rutas competentes y autocuidado',
        cuerpo: [
          'Ni los compañeros ni los líderes de equipo reemplazan a las instancias competentes. No les corresponde investigar hechos, interrogar a nadie, confrontar al presunto responsable, decidir por la persona afectada, prometer resultados ni divulgar información. Sí les corresponde escuchar, cuidar la confidencialidad, orientar hacia los canales, acompañar si la persona lo desea y, en el caso de los líderes, encauzar de inmediato la situación hacia el responsable designado y colaborar con las medidas de protección (F-04, art. 11; F-06, art. 12).',
          'Las rutas competentes tienen varios niveles. En la organización: el canal de queja (electrónico, físico o verbal) y el responsable designado por la política y el protocolo, que activan medidas de protección, investigación interna con debida diligencia y decisiones (F-04, art. 11, 13 y 15; F-08). El Comité de Convivencia Laboral, para situaciones de acoso laboral (F-06, art. 6). Fuera de la organización: la Fiscalía, cuando la persona decide acudir a ella (F-04, art. 11, num. 4 y 5); el Ministerio del Trabajo y las inspecciones, incluida la competencia que la reglamentación atribuye a la inspección cuando el presunto acosador es superior jerárquico (F-08, art. 2.2.1.8.3.10; F-05, art. 18); y los servicios de salud, la ARL para atención emocional (F-04, art. 13), las comisarías de familia y los jueces para otras violencias conforme a la Ley 1257 (F-02). La guía "Rutas competentes" de la biblioteca de Turquesa Hub reúne estas referencias; Turquesa Hub no recibe quejas ni gestiona casos.',
          'La confidencialidad tiene un límite razonable: el riesgo grave e inminente para la vida o la integridad de alguien. En ese caso, lo responsable es activar el canal interno o los servicios de emergencia, informando a la persona de lo que se va a hacer y por qué. Fuera de ese escenario, el consentimiento de la persona gobierna cada paso (F-29).',
          'Acompañar a alguien en una situación de violencia también afecta a quien acompaña. Es frecuente sentir rabia, impotencia, culpa por "no hacer más" o preocupación persistente. Reconocer estas señales, hablar con alguien de confianza sin revelar la identidad de la persona afectada, pedir apoyo al responsable designado y usar los servicios de bienestar disponibles son prácticas de autocuidado responsables. La normativa prevé apoyo de la ARL en primeros auxilios psicológicos para quienes integran el Comité de Convivencia (F-06, art. 12) y atención emocional para las personas afectadas (F-04, art. 13); las organizaciones pueden articular apoyos similares para líderes y responsables que acompañan situaciones difíciles.',
          'Orientar es abrir una puerta, no caminar por la otra persona. Saber hasta dónde llega nuestro rol protege a la persona afectada (evita exponerla o decidir por ella), protege el procedimiento (evita contaminar una investigación o destruir garantías) y nos protege a nosotros (evita cargar con responsabilidades que no son nuestras).'
        ],
        situacion: 'El supervisor de una empresa agroindustrial se entera de que una trabajadora de su cuadrilla ha recibido propuestas de connotación sexual de un compañero a cambio de "ayudarle" con la cuota de recolección. Su primer impulso es "resolverlo en la finca" hablando con los dos. En lugar de eso, escucha a la trabajadora en privado, le explica que existe un canal y un responsable, le pregunta si quiere que la acompañe a contactarlo y, con su acuerdo, informa de inmediato al responsable designado para que se adopten medidas de protección. No habla con el compañero señalado ni comenta la situación con el resto de la cuadrilla.',
        actividad: { titulo: 'Actividad de reflexión', instrucciones: 'Elabore un esquema sencillo de la ruta de su organización y de los apoyos para quienes acompañan. Trabaje sobre procesos y recursos, no sobre casos.', preguntas: [
          '¿Conoce la ruta de su organización: quién es el responsable designado, por qué canal se accede y en qué plazos actúa? ¿Dónde está publicada?',
          '¿Qué apoyo tienen las personas que acompañan (líderes, integrantes del Comité, talento humano) para su propio cuidado? ¿Está previsto en algún documento o acuerdo con la ARL?',
          '¿Qué acuerdos existen sobre cuándo y cómo escalar una situación de riesgo grave e inminente, y cómo se informa a la persona afectada de ese paso?'
        ] },
        tarjeta: { tipo: 'turquesa', texto: 'Idea clave: escuchar, cuidar la confidencialidad, orientar y acompañar está dentro de mi rol; investigar, confrontar, decidir por la persona y divulgar no lo está. Cuidarme también es parte de acompañar bien.' },
        referencias: ['F-02', 'F-04', 'F-05', 'F-06', 'F-08', 'F-28', 'F-29'] }
    ],
    quiz: [
      { id: 'p1', texto: 'De acuerdo con la Ley 2365 de 2024, ¿cuál de estos es un derecho de la persona afectada por acoso sexual en el trabajo?',
        opciones: [
          { id: 'a', texto: 'A que su caso sea discutido con todo el equipo para recibir apoyo colectivo.' },
          { id: 'b', texto: 'A no ser confrontada con su agresor y a la confidencialidad de su situación.' },
          { id: 'c', texto: 'A que la organización decida por ella si acude o no a la Fiscalía.' },
          { id: 'd', texto: 'A que el Comité de Convivencia Laboral concilie la situación en un plazo corto.' }
        ], correcta: 'b',
        retro: { ok: 'Correcto. La Ley 2365 reconoce, entre otros, los derechos a la intimidad y la confidencialidad, a la no revictimización, a la protección frente a represalias y a no ser confrontada con el agresor. La decisión de acudir a la Fiscalía es de la persona.', no: 'Revise la lección 1. La discusión colectiva y la conciliación ante el Comité de Convivencia contradicen los derechos a la confidencialidad y a no ser confrontada con el agresor; y la decisión de acudir a la Fiscalía corresponde a la persona, no a la organización.' },
        referencia: 'F-04' },
      { id: 'p2', texto: 'En los principios LIVES de la OMS, "preguntar" (Inquire) se refiere a:',
        opciones: [
          { id: 'a', texto: 'Reconstruir con detalle los hechos para evaluar su gravedad.' },
          { id: 'b', texto: 'Preguntar a la persona qué necesita y qué le preocupa en este momento.' },
          { id: 'c', texto: 'Preguntar a otras personas del equipo si han visto algo similar.' },
          { id: 'd', texto: 'Preguntar a la persona por qué no habló antes.' }
        ], correcta: 'b',
        retro: { ok: 'Correcto. "Inquire" se centra en las necesidades y preocupaciones de la persona, no en los hechos. Reconstruir detalles, consultar a terceros o cuestionar los tiempos de la persona son prácticas que exponen o revictimizan.', no: 'Revise la lección 2. En LIVES, preguntar significa indagar por las necesidades de la persona ("¿qué te ayudaría ahora?"), no por los detalles de lo ocurrido ni por sus razones para callar; tampoco implica consultar a otras personas.' },
        referencia: 'F-26' },
      { id: 'p3', texto: 'Una colega le cuenta una situación y le pide que no se lo diga a nadie por ahora. Usted considera que talento humano debería saberlo. ¿Qué actuación es coherente con los principios de consentimiento y autonomía?',
        opciones: [
          { id: 'a', texto: 'Informar a talento humano sin decírselo, "por su bien".' },
          { id: 'b', texto: 'Contarlo al líder del equipo para que él decida qué hacer.' },
          { id: 'c', texto: 'Respetar su decisión, explicarle qué canales existen y qué garantías ofrecen, y acordar con ella cuándo y cómo retomarlo; actuar sin su consentimiento solo ante un riesgo grave e inminente, informándole.' },
          { id: 'd', texto: 'Decirle que si no lo reporta usted no puede seguir hablando con ella del tema.' }
        ], correcta: 'c',
        retro: { ok: 'Correcto. El consentimiento informado y la autonomía gobiernan cada paso: se informa, se acompaña y se respeta la decisión. La única excepción razonable es el riesgo grave e inminente, y aun entonces se informa a la persona de lo que se hará.', no: 'Revise las lecciones 2 y 4. Actuar sin consentimiento, trasladar la decisión a otra persona o condicionar el apoyo vulneran la autonomía y la confidencialidad. Lo adecuado es informar, acompañar y respetar la decisión, salvo riesgo grave e inminente.' },
        referencia: 'F-29' },
      { id: 'p4', texto: 'Una coordinadora recibe una queja por acoso sexual y convoca una reunión con la persona afectada y el presunto agresor "para que cada uno dé su versión". ¿Qué es correcto afirmar?',
        opciones: [
          { id: 'a', texto: 'Es una buena práctica de conciliación que ahorra tiempo.' },
          { id: 'b', texto: 'Es una forma de revictimización: la normativa prohíbe confrontar a la persona afectada con el presunto agresor.' },
          { id: 'c', texto: 'Es obligatoria antes de cualquier medida de protección.' },
          { id: 'd', texto: 'Es adecuada siempre que la reunión sea confidencial.' }
        ], correcta: 'b',
        retro: { ok: 'Correcto. La confrontación entre la persona afectada y el presunto agresor está prohibida; es una práctica revictimizante que además deja a la persona sin protección. Las medidas de protección no requieren esa reunión ni pruebas previas.', no: 'Revise la lección 3. La reunión "para aclarar versiones" confronta a la persona afectada con el presunto agresor, lo que la Ley 2365 reconoce como derecho de la persona afectada (no confrontación) y la Circular 0076 de 2025 recomienda evitar. La confidencialidad de la reunión no corrige ese daño.' },
        referencia: 'F-09' },
      { id: 'p5', texto: 'Un líder de equipo se entera de una situación de acoso sexual en su cuadrilla. ¿Cuál es la actuación más coherente con los límites de su rol?',
        opciones: [
          { id: 'a', texto: 'Hablar con el presunto responsable para que pida disculpas y cerrar el asunto.' },
          { id: 'b', texto: 'Entrevistar a todas las personas de la cuadrilla para establecer qué pasó.' },
          { id: 'c', texto: 'Escuchar a la persona en privado, informarle los canales, acordar con ella los siguientes pasos y encauzar de inmediato la situación hacia el responsable designado para que se adopten medidas de protección, sin comentarla con el resto del equipo.' },
          { id: 'd', texto: 'Esperar a que la persona presente una denuncia penal antes de hacer cualquier cosa.' }
        ], correcta: 'c',
        retro: { ok: 'Correcto. El líder escucha, orienta, encauza hacia el responsable designado y protege la confidencialidad; no investiga, no confronta ni condiciona su actuación a una denuncia penal, que es decisión de la persona.', no: 'Revise la lección 4. Confrontar al presunto responsable, investigar por cuenta propia o esperar una denuncia penal exceden o incumplen el rol del líder. Le corresponde escuchar, orientar, encauzar hacia el responsable designado y cuidar la confidencialidad.' },
        referencia: 'F-04' }
    ],
    recursos: ['rec-rutas', 'rec-respuesta', 'rec-datos', 'rec-ficha-2365', 'rec-glosario'],
    bibliografia: ['F-02', 'F-03', 'F-04', 'F-05', 'F-06', 'F-08', 'F-09', 'F-26', 'F-28', 'F-29'],
    revision: { fecha: '2026-11-03', responsable: 'Equipo técnico Turquesa Hub (redacción inicial)', estadoPsicosocial: 'pendiente', estadoJuridico: 'pendiente' }
  }
];

/* ============================================================
   TURQUESA HUB · DATOS DE PRUEBA (SOLO ENTORNO DE DESARROLLO)
   Organizaciones, personas y cifras FICTICIAS para pruebas automatizadas y
   revisión interna. Este archivo NO debe cargarse en producción
   (ver index.html, bloque "DESARROLLO"). Contraseña de todas las cuentas de
   prueba: Turquesa2026*
   ============================================================ */
window.TH = window.TH || {};
/* Contraseña de las cuentas de prueba. Vive solo en memoria (este archivo no se carga en producción) y nunca se persiste:
   al primer ingreso se reemplaza por un hash con sal en el registro de usuarios. */
TH.dev = { claveCuentasDePrueba: 'Turquesa2026*' };
TH.data = TH.data || {};

TH.data.semilla = function () {
  if (!TH.config.esDesarrollo) { console.warn('[TH] Semilla de desarrollo cargada en producción: ignorada.'); return null; }
  const hoy = '2026-11-02';
  const contenidos = TH.data.contenidos.map(c => ({ ...c, historial: c.historial || [{ fecha: c.fecha, actor: c.autor, accion: 'Creación de la versión ' + c.version, version: c.version }] }));
  // Módulos formativos como versiones editoriales 1.0 en revisión técnica (sin aprobaciones ni publicación presumidas).
  const modulos = TH.data.modulos.map(m => ({ ...JSON.parse(JSON.stringify(m)), id: 'modv-' + m.id + '-1', moduloId: m.id, version: '1.0', estado: 'en-revision-tecnica', revisionTecnica: 'pendiente', revisionJuridica: 'pendiente', revisionPsicosocial: 'pendiente', revisiones: [], autor: 'Equipo técnico Turquesa Hub', fecha: '2026-11-03', publicacion: null,
    historial: [{ fecha: '2026-11-03', actor: 'Equipo técnico Turquesa Hub', accion: 'Redacción inicial v1.0; enviada a revisión técnica', version: '1.0' }] }));
  const documentosLegales = JSON.parse(JSON.stringify(TH.data.documentosLegales));

  // Respuestas del diagnóstico de Café Andino (completo)
  const respCafe = {
    q01: 'si', q02: 'parcial', q03: 'parcial', q04: 'no',
    q05: 'parcial', q06: 'parcial', q07: 'no', q08: 'si',
    q09: 'si', q10: 'parcial', q11: 'parcial', q12: 'no',
    q13: 'si', q14: 'no', q15: 'parcial', q16: 'no',
    q17: 'parcial', q18: 'no', q19: 'parcial', q20: 'parcial',
    q21: 'no', q22: 'parcial', q23: 'na', q24: 'si'
  };
  const respuestasCafe = {};
  Object.keys(respCafe).forEach(k => { respuestasCafe[k] = { opcion: respCafe[k], fecha: '2026-10-14' }; });
  respuestasCafe.q23.justificacion = 'Aún no contamos con un plan de acción formal; lo construiremos a partir de este diagnóstico.';

  // Respuestas de Clínica Vida Plena (completo, mayor madurez)
  const respClinica = {
    q01: 'si', q02: 'si', q03: 'si', q04: 'si', q05: 'si', q06: 'parcial', q07: 'si', q08: 'si',
    q09: 'si', q10: 'si', q11: 'si', q12: 'si', q13: 'si', q14: 'si', q15: 'si', q16: 'parcial',
    q17: 'si', q18: 'si', q19: 'si', q20: 'si', q21: 'parcial', q22: 'si', q23: 'si', q24: 'si'
  };
  const respuestasClinica = {};
  Object.keys(respClinica).forEach(k => { respuestasClinica[k] = { opcion: respClinica[k], fecha: '2026-08-20' }; });

  // Respuestas de Cooperativa Horizonte (completo)
  const respCoop = {
    q01: 'si', q02: 'si', q03: 'parcial', q04: 'si', q05: 'parcial', q06: 'si', q07: 'parcial', q08: 'si',
    q09: 'si', q10: 'si', q11: 'parcial', q12: 'si', q13: 'si', q14: 'parcial', q15: 'si', q16: 'si',
    q17: 'si', q18: 'si', q19: 'si', q20: 'si', q21: 'si', q22: 'si', q23: 'parcial', q24: 'no'
  };
  const respuestasCoop = {};
  Object.keys(respCoop).forEach(k => { respuestasCoop[k] = { opcion: respCoop[k], fecha: '2026-07-10' }; });

  // Respuestas parciales de Textiles del Ruiz (en curso: 11 de 24)
  const respTextiles = { q01: 'parcial', q02: 'no', q03: 'no', q04: 'no', q05: 'parcial', q06: 'parcial', q07: 'nose', q08: 'na', q09: 'parcial', q10: 'no', q11: 'no' };
  const respuestasTextiles = {};
  Object.keys(respTextiles).forEach(k => { respuestasTextiles[k] = { opcion: respTextiles[k], fecha: '2026-10-28' }; });
  respuestasTextiles.q08.justificacion = 'No realizamos mediciones de clima; somos una planta pequeña.';

  return {
    version: 4,
    creadoEn: hoy,
    configuracion: { instrumentoAlcance: {} },
    instrumentoVersiones: [
      { version: '1.0', estado: 'vigente', fecha: '2026-11-03', nota: 'Instrumento de 24 preguntas (16 activas, 8 en reserva). En revisión técnica, psicosocial y jurídica por la FMA.', preguntasActivas: 16, revision: { tecnica: 'pendiente', psicosocial: 'pendiente', juridica: 'pendiente' } }
    ],
    organizaciones: [
      { id: 'org-001', nombre: 'Café Andino S.A.S.', tipoIdentificacion: 'NIT', identificacion: '900123456-7', emailInstitucional: 'contacto@cafeandino.demo', telefono: '606 000 0001', sector: 'Agroindustria y café', tamano: 'mediana', departamento: 'Caldas', municipio: 'Manizales',
        responsable: 'Ana María Restrepo', cargo: 'Líder de Talento Humano', email: 'talento@cafeandino.demo', estado: 'activa', fechaRegistro: '2026-10-06',
        onboarding: { bienvenida: true, perfil: true, diagnostico: true, colaboradores: true, plan: true }, acompanamiento: 'Solicita apoyo para la construcción del protocolo interno.' },
      { id: 'org-002', nombre: 'Clínica Vida Plena', tipoIdentificacion: 'NIT', identificacion: '800987654-3', emailInstitucional: 'contacto@vidaplena.demo', sector: 'Salud', tamano: 'grande', departamento: 'Caldas', municipio: 'Manizales',
        responsable: 'Carlos Londoño', cargo: 'Responsable de Bienestar', email: 'bienestar@vidaplena.demo', estado: 'activa', fechaRegistro: '2026-07-21',
        onboarding: { bienvenida: true, perfil: true, diagnostico: true, colaboradores: true, plan: true }, acompanamiento: '' },
      { id: 'org-003', nombre: 'Cooperativa Horizonte', tipoIdentificacion: 'NIT', identificacion: '890456789-1', emailInstitucional: 'contacto@coophorizonte.demo', sector: 'Financiero y cooperativo', tamano: 'pequena', departamento: 'Caldas', municipio: 'Chinchiná',
        responsable: 'Patricia Ocampo', cargo: 'Gerente / Director(a)', email: 'gerencia@coophorizonte.demo', estado: 'activa', fechaRegistro: '2026-06-02',
        onboarding: { bienvenida: true, perfil: true, diagnostico: true, colaboradores: true, plan: true }, acompanamiento: '' },
      { id: 'org-004', nombre: 'Textiles del Ruiz S.A.S.', tipoIdentificacion: 'NIT', identificacion: '901222333-4', emailInstitucional: 'contacto@textilesruiz.demo', sector: 'Industria manufacturera', tamano: 'mediana', departamento: 'Caldas', municipio: 'Villamaría',
        responsable: 'Jorge Giraldo', cargo: 'Coordinador(a) SG-SST', email: 'sst@textilesruiz.demo', estado: 'activa', fechaRegistro: '2026-10-20',
        onboarding: { bienvenida: true, perfil: true, diagnostico: false, colaboradores: false, plan: false }, acompanamiento: 'Equipo pequeño; requiere orientación para completar el diagnóstico.' },
      { id: 'org-005', nombre: 'Universidad Corporativa Nevado', tipoIdentificacion: 'NIT', identificacion: '805111222-9', emailInstitucional: 'contacto@ucnevado.demo', sector: 'Educación', tamano: 'muy-grande', departamento: 'Caldas', municipio: 'Manizales',
        responsable: 'Lucía Arango', cargo: 'Responsable de Sostenibilidad', email: 'sostenibilidad@ucnevado.demo', estado: 'activa', fechaRegistro: '2026-10-30',
        onboarding: { bienvenida: false, perfil: true, diagnostico: false, colaboradores: false, plan: false }, acompanamiento: '' },
      { id: 'org-006', nombre: 'Transportes Caldas Express', tipoIdentificacion: 'NIT', identificacion: '810333444-5', emailInstitucional: 'contacto@caldasexpress.demo', sector: 'Transporte y logística', tamano: 'pequena', departamento: 'Caldas', municipio: 'La Dorada',
        responsable: 'Mauricio Vélez', cargo: 'Gerente / Director(a)', email: 'gerencia@caldasexpress.demo', estado: 'suspendida', fechaRegistro: '2026-05-12',
        onboarding: { bienvenida: true, perfil: true, diagnostico: false, colaboradores: false, plan: false }, acompanamiento: 'Suspendida a solicitud de la organización (demo).' }
    ],
    usuarios: [
      // Contraseña inicial de todas las cuentas de prueba: 'Turquesa2026*' (solo entorno de desarrollo; se convierte en hash al primer ingreso)
      { id: 'usr-org-001', nombre: 'Ana María Restrepo', email: 'talento@cafeandino.demo', rol: 'organizacion', orgId: 'org-001', cargo: 'Líder de Talento Humano', estado: 'activo', correoVerificado: true, cuentaDePrueba: true, consentimientos: [{ tipo: 'condiciones-uso', version: 'datos-de-prueba', documentoId: null, fecha: '2026-10-06T10:00:00Z' }, { tipo: 'tratamiento-datos', version: 'datos-de-prueba', documentoId: null, fecha: '2026-10-06T10:00:00Z' }] },
      { id: 'usr-org-002', nombre: 'Carlos Londoño', email: 'bienestar@vidaplena.demo', rol: 'organizacion', orgId: 'org-002', cargo: 'Responsable de Bienestar', estado: 'activo', correoVerificado: true, cuentaDePrueba: true, consentimientos: [] },
      { id: 'usr-org-003', nombre: 'Patricia Ocampo', email: 'gerencia@coophorizonte.demo', rol: 'organizacion', orgId: 'org-003', cargo: 'Gerente', estado: 'activo', correoVerificado: true, cuentaDePrueba: true, consentimientos: [] },
      { id: 'usr-org-004', nombre: 'Jorge Giraldo', email: 'sst@textilesruiz.demo', rol: 'organizacion', orgId: 'org-004', cargo: 'Coordinador SG-SST', estado: 'activo', correoVerificado: true, cuentaDePrueba: true, consentimientos: [] },
      { id: 'usr-org-005', nombre: 'Lucía Arango', email: 'sostenibilidad@ucnevado.demo', rol: 'organizacion', orgId: 'org-005', cargo: 'Responsable de Sostenibilidad', estado: 'activo', correoVerificado: true, cuentaDePrueba: true, consentimientos: [] },
      { id: 'usr-col-001', nombre: 'Laura Gómez', email: 'laura.gomez@cafeandino.demo', rol: 'colaborador', orgId: 'org-001', area: 'Administración', estado: 'activo', correoVerificado: true, cuentaDePrueba: true },
      { id: 'usr-col-002', nombre: 'Daniel Ríos', email: 'daniel.rios@cafeandino.demo', rol: 'colaborador', orgId: 'org-001', area: 'Producción', estado: 'activo', correoVerificado: true, cuentaDePrueba: true },
      { id: 'usr-col-003', nombre: 'Sofía Mejía', email: 'sofia.mejia@cafeandino.demo', rol: 'colaborador', orgId: 'org-001', area: 'Comercial', estado: 'activo', correoVerificado: true, cuentaDePrueba: true },
      { id: 'usr-col-004', nombre: 'Andrés Cardona', email: 'andres.cardona@cafeandino.demo', rol: 'colaborador', orgId: 'org-001', area: 'Producción', estado: 'activo', correoVerificado: true, cuentaDePrueba: true },
      { id: 'usr-col-005', nombre: 'Valentina Salazar', email: 'valentina.salazar@cafeandino.demo', rol: 'colaborador', orgId: 'org-001', area: 'Logística', estado: 'activo', correoVerificado: true, cuentaDePrueba: true },
      { id: 'usr-col-010', nombre: 'Colaboradora de prueba Clínica', email: 'col1@vidaplena.demo', rol: 'colaborador', orgId: 'org-002', area: 'Enfermería', estado: 'activo', correoVerificado: true, cuentaDePrueba: true },
      { id: 'usr-col-011', nombre: 'Colaborador de prueba Clínica', email: 'col2@vidaplena.demo', rol: 'colaborador', orgId: 'org-002', area: 'Administración', estado: 'activo', correoVerificado: true, cuentaDePrueba: true },
      // Cuentas internas FMA: se crean desde Administración → Usuarios y permisos, nunca por registro público.
      { id: 'usr-fma-001', nombre: 'Coordinación Turquesa Hub', email: 'turquesa@fma.demo', rol: 'fma', orgId: null, cargo: 'Coordinación Turquesa Hub', permisos: ['*'], estado: 'activo', correoVerificado: true, cuentaDePrueba: true },
      { id: 'usr-fma-002', nombre: 'Revisión jurídica (cuenta de prueba)', email: 'juridica@fma.demo', rol: 'fma', orgId: null, cargo: 'Revisión jurídica de contenidos', permisos: ['contenidos:ver', 'contenidos:revisar-juridica', 'formacion:ver', 'formacion:revisar-juridica', 'instrumento:ver', 'documentos:ver', 'documentos:aprobar'], estado: 'activo', correoVerificado: true, cuentaDePrueba: true },
      { id: 'usr-fma-003', nombre: 'Revisión psicosocial (cuenta de prueba)', email: 'psicosocial@fma.demo', rol: 'fma', orgId: null, cargo: 'Revisión psicológica y psicosocial', permisos: ['contenidos:ver', 'contenidos:revisar-psicosocial', 'formacion:ver', 'formacion:revisar-psicosocial', 'instrumento:ver', 'instrumento:revisar'], estado: 'activo', correoVerificado: true, cuentaDePrueba: true },
      { id: 'usr-fma-004', nombre: 'Revisión técnica (cuenta de prueba)', email: 'tecnica@fma.demo', rol: 'fma', orgId: null, cargo: 'Revisión técnica de contenidos', permisos: ['contenidos:ver', 'contenidos:editar', 'contenidos:revisar-tecnica', 'formacion:ver', 'formacion:editar', 'formacion:revisar-tecnica', 'instrumento:ver', 'documentos:ver', 'documentos:editar'], estado: 'activo', correoVerificado: true, cuentaDePrueba: true }
    ],
    invitaciones: [
      { id: 'inv-001', orgId: 'org-001', codigo: 'CAFE-4K2M', nombre: 'Laura Gómez', email: 'laura.gomez@cafeandino.demo', modulos: ['mod-1', 'mod-2', 'mod-3', 'mod-4'], estado: 'activada', fecha: '2026-10-15', userId: 'usr-col-001' },
      { id: 'inv-002', orgId: 'org-001', codigo: 'CAFE-7P9Q', nombre: 'Daniel Ríos', email: 'daniel.rios@cafeandino.demo', modulos: ['mod-1', 'mod-2', 'mod-3', 'mod-4'], estado: 'activada', fecha: '2026-10-15', userId: 'usr-col-002' },
      { id: 'inv-003', orgId: 'org-001', codigo: 'CAFE-2R5T', nombre: 'Sofía Mejía', email: 'sofia.mejia@cafeandino.demo', modulos: ['mod-1', 'mod-2', 'mod-3', 'mod-4'], estado: 'activada', fecha: '2026-10-15', userId: 'usr-col-003' },
      { id: 'inv-004', orgId: 'org-001', codigo: 'CAFE-8W3Z', nombre: 'Andrés Cardona', email: 'andres.cardona@cafeandino.demo', modulos: ['mod-1', 'mod-3'], estado: 'activada', fecha: '2026-10-18', userId: 'usr-col-004' },
      { id: 'inv-005', orgId: 'org-001', codigo: 'CAFE-1N6V', nombre: 'Valentina Salazar', email: 'valentina.salazar@cafeandino.demo', modulos: ['mod-1', 'mod-2', 'mod-3', 'mod-4'], estado: 'activada', fecha: '2026-10-18', userId: 'usr-col-005' },
      { id: 'inv-006', orgId: 'org-001', codigo: 'CAFE-9H4J', nombre: 'Invitación pendiente (demo)', email: 'nuevo.colaborador@cafeandino.demo', modulos: ['mod-1', 'mod-2'], estado: 'pendiente', fecha: '2026-10-29', expira: '2026-11-28', userId: null, envio: 'no-enviado-en-desarrollo' }
    ],
    diagnosticosArchivados: [],
    diagnosticos: [
      { id: 'diag-001', orgId: 'org-001', instrumentoVersion: '1.0', estado: 'completado', respuestas: respuestasCafe, preguntaActual: 23, fechaInicio: '2026-10-08', fechaFin: '2026-10-14' },
      { id: 'diag-002', orgId: 'org-002', instrumentoVersion: '1.0', estado: 'completado', respuestas: respuestasClinica, preguntaActual: 23, fechaInicio: '2026-08-10', fechaFin: '2026-08-20' },
      { id: 'diag-003', orgId: 'org-003', instrumentoVersion: '1.0', estado: 'completado', respuestas: respuestasCoop, preguntaActual: 23, fechaInicio: '2026-07-01', fechaFin: '2026-07-10' },
      { id: 'diag-004', orgId: 'org-004', instrumentoVersion: '1.0', estado: 'en-curso', respuestas: respuestasTextiles, preguntaActual: 11, fechaInicio: '2026-10-25', fechaFin: null }
    ],
    planes: [
      { id: 'plan-001', orgId: 'org-001', diagnosticoId: 'diag-001', fechaCreacion: '2026-10-15', acciones: [
        { id: 'acc-001', dim: 'd1', preguntaId: 'q02', situacion: 'Responsable de prevención asumido informalmente por Talento Humano.', objetivo: 'Contar con un responsable formal de la prevención de VBG.', accion: 'Designar mediante acta de gerencia a la Líder de Talento Humano como responsable, con 4 horas semanales asignadas.', prioridad: 'alta', responsable: 'Gerencia', fechaObjetivo: '2026-10-31', indicador: 'Responsable designado formalmente', meta: '1 designación documentada', evidencia: 'Acta de gerencia', estado: 'completada', avance: 100, observaciones: 'Acta firmada el 28 de octubre.', origen: 'sugerida' },
        { id: 'acc-002', dim: 'd1', preguntaId: 'q04', situacion: 'La prevención de VBG no aparece en los instrumentos de planeación.', objetivo: 'Integrar la prevención de VBG en la planeación institucional.', accion: 'Incluir un objetivo y tres actividades de prevención en el plan de bienestar 2027.', prioridad: 'media', responsable: 'Talento Humano', fechaObjetivo: '2026-12-15', indicador: 'Instrumentos de planeación que incluyen prevención de VBG', meta: 'Plan de bienestar 2027 actualizado', evidencia: 'Plan de bienestar aprobado', estado: 'en-ejecucion', avance: 40, observaciones: '', origen: 'sugerida' },
        { id: 'acc-003', dim: 'd2', preguntaId: 'q07', situacion: 'No se han identificado dinámicas o espacios de riesgo.', objetivo: 'Identificar factores de riesgo organizacional asociados a VBG.', accion: 'Realizar un taller participativo con representantes de cada área, articulado con la evaluación de riesgo psicosocial.', prioridad: 'alta', responsable: 'SG-SST', fechaObjetivo: '2026-11-20', indicador: 'Ejercicio de identificación realizado', meta: '1 taller con resultados documentados', evidencia: 'Matriz de factores de riesgo', estado: 'en-ejecucion', avance: 60, observaciones: 'Taller programado para el 14 de noviembre.', origen: 'sugerida' },
        { id: 'acc-004', dim: 'd3', preguntaId: 'q10', situacion: 'Existe un procedimiento de convivencia que no aborda específicamente las VBG.', objetivo: 'Disponer de un protocolo de actuación institucional frente a VBG.', accion: 'Construir el protocolo interno con apoyo de asesoría jurídica y socializarlo con el comité de convivencia.', prioridad: 'alta', responsable: 'Talento Humano / Asesoría jurídica', fechaObjetivo: '2027-01-30', indicador: 'Protocolo aprobado', meta: '1 protocolo aprobado y socializado', evidencia: 'Protocolo aprobado y acta de socialización', estado: 'pendiente', avance: 0, observaciones: 'Se solicitó acompañamiento a la FMA.', origen: 'sugerida' },
        { id: 'acc-005', dim: 'd4', preguntaId: 'q14', situacion: 'Los líderes de área no han recibido formación específica.', objetivo: 'Formar a líderes y mandos medios en su rol preventivo.', accion: 'Jornada formativa de 4 horas para los 9 líderes de área.', prioridad: 'alta', responsable: 'Talento Humano', fechaObjetivo: '2026-10-25', indicador: 'Porcentaje de líderes formados', meta: '80 % de líderes formados', evidencia: 'Registro de asistencia', estado: 'atrasada', avance: 20, observaciones: 'Reprogramar: coincidió con la cosecha.', origen: 'sugerida' },
        { id: 'acc-006', dim: 'd5', preguntaId: 'q18', situacion: 'No existe un directorio de instancias competentes.', objetivo: 'Disponer de un directorio actualizado de instancias competentes.', accion: 'Construir el directorio territorial con la plantilla de la biblioteca y validarlo con la FMA.', prioridad: 'alta', responsable: 'Bienestar', fechaObjetivo: '2026-11-30', indicador: 'Directorio validado y vigente', meta: '1 directorio con verificación semestral', evidencia: 'Directorio con fecha de verificación', estado: 'en-revision', avance: 90, observaciones: 'Borrador enviado para validación.', origen: 'sugerida' },
        { id: 'acc-007', dim: 'd6', preguntaId: 'q21', situacion: 'No hay indicadores de seguimiento.', objetivo: 'Definir indicadores de seguimiento a la prevención.', accion: 'Definir tres indicadores: cobertura de sensibilización, cumplimiento del plan y conocimiento de canales.', prioridad: 'media', responsable: 'Talento Humano', fechaObjetivo: '2026-12-10', indicador: 'Indicadores definidos con línea base', meta: '3 indicadores definidos', evidencia: 'Ficha de indicadores', estado: 'pendiente', avance: 0, observaciones: '', origen: 'sugerida' },
        { id: 'acc-008', dim: 'd4', preguntaId: null, situacion: 'Iniciativa propia del equipo de bienestar.', objetivo: 'Conmemorar el 25 de noviembre con actividad formativa.', accion: 'Jornada "Café por el respeto": conversatorio y asignación de módulos a toda la planta.', prioridad: 'media', responsable: 'Bienestar', fechaObjetivo: '2026-11-25', indicador: 'Participantes en la jornada', meta: '120 participantes', evidencia: 'Registro de asistencia y fotografías', estado: 'en-ejecucion', avance: 50, observaciones: 'Acción añadida manualmente.', origen: 'manual' }
      ] },
      { id: 'plan-002', orgId: 'org-002', diagnosticoId: 'diag-002', fechaCreacion: '2026-08-22', acciones: [
        { id: 'acc-021', dim: 'd2', preguntaId: 'q06', situacion: 'Falta análisis de brechas salariales.', objetivo: 'Fortalecer la igualdad de oportunidades.', accion: 'Realizar análisis de brechas de remuneración por sexo.', prioridad: 'media', responsable: 'Talento Humano', fechaObjetivo: '2026-12-20', indicador: 'Análisis realizado', meta: '1 análisis', evidencia: 'Informe', estado: 'en-ejecucion', avance: 50, observaciones: '', origen: 'sugerida' },
        { id: 'acc-022', dim: 'd4', preguntaId: 'q16', situacion: 'La apropiación de la formación se mide parcialmente.', objetivo: 'Medir el alcance y la apropiación de la formación.', accion: 'Definir indicadores de cobertura y apropiación.', prioridad: 'baja', responsable: 'Bienestar', fechaObjetivo: '2026-11-30', indicador: 'Indicadores medidos', meta: '2 indicadores', evidencia: 'Ficha de indicadores', estado: 'completada', avance: 100, observaciones: '', origen: 'sugerida' },
        { id: 'acc-023', dim: 'd6', preguntaId: 'q21', situacion: 'Indicadores incompletos.', objetivo: 'Definir indicadores de seguimiento.', accion: 'Completar la ficha de indicadores (tercer indicador).', prioridad: 'media', responsable: 'Planeación', fechaObjetivo: '2026-11-15', indicador: 'Indicadores definidos', meta: '3 indicadores', evidencia: 'Ficha aprobada', estado: 'en-revision', avance: 80, observaciones: '', origen: 'sugerida' }
      ] },
      { id: 'plan-003', orgId: 'org-003', diagnosticoId: 'diag-003', fechaCreacion: '2026-07-12', acciones: [
        { id: 'acc-031', dim: 'd4', preguntaId: 'q14', situacion: 'Formación a líderes parcial.', objetivo: 'Formar a líderes.', accion: 'Completar la jornada formativa con los 5 líderes restantes.', prioridad: 'alta', responsable: 'Gerencia', fechaObjetivo: '2026-10-15', indicador: '% líderes formados', meta: '100 %', evidencia: 'Registro de asistencia', estado: 'atrasada', avance: 60, observaciones: '', origen: 'sugerida' },
        { id: 'acc-032', dim: 'd6', preguntaId: 'q23', situacion: 'Revisión informal del plan.', objetivo: 'Institucionalizar la revisión periódica.', accion: 'Incluir la revisión del plan en el orden del día del consejo de administración semestral.', prioridad: 'media', responsable: 'Gerencia', fechaObjetivo: '2026-12-01', indicador: 'Revisiones anuales', meta: '2 por año', evidencia: 'Actas', estado: 'pendiente', avance: 0, observaciones: '', origen: 'sugerida' },
        { id: 'acc-033', dim: 'd6', preguntaId: 'q24', situacion: 'Sin articulación externa.', objetivo: 'Fortalecer la articulación externa.', accion: 'Vincularse a la mesa territorial de prevención.', prioridad: 'baja', responsable: 'Gerencia', fechaObjetivo: '2026-09-30', indicador: 'Vinculación activa', meta: '1', evidencia: 'Constancia', estado: 'completada', avance: 100, observaciones: '', origen: 'sugerida' }
      ] }
    ],
    progresoFormativo: [
      { id: 'prog-001', userId: 'usr-col-001', orgId: 'org-001', moduloId: 'mod-1', leccionesVistas: ['l1', 'l2', 'l3', 'l4'], respuestasQuiz: { p1: 'b', p2: 'c', p3: 'c', p4: 'b', p5: 'd' }, puntaje: 100, estado: 'completado', fechaInicio: '2026-10-16', fechaFin: '2026-10-16' },
      { id: 'prog-002', userId: 'usr-col-001', orgId: 'org-001', moduloId: 'mod-2', leccionesVistas: ['l1'], respuestasQuiz: {}, puntaje: null, estado: 'en-curso', fechaInicio: '2026-10-20', fechaFin: null },
      { id: 'prog-003', userId: 'usr-col-002', orgId: 'org-001', moduloId: 'mod-1', leccionesVistas: ['l1', 'l2', 'l3', 'l4'], respuestasQuiz: { p1: 'b', p2: 'c', p3: 'c', p4: 'b', p5: 'd' }, puntaje: 100, estado: 'completado', fechaInicio: '2026-10-17', fechaFin: '2026-10-17' },
      { id: 'prog-004', userId: 'usr-col-002', orgId: 'org-001', moduloId: 'mod-2', leccionesVistas: ['l1', 'l2', 'l3', 'l4'], respuestasQuiz: { p1: 'b', p2: 'c', p3: 'b', p4: 'c', p5: 'c' }, puntaje: 100, estado: 'completado', fechaInicio: '2026-10-19', fechaFin: '2026-10-19' },
      { id: 'prog-005', userId: 'usr-col-002', orgId: 'org-001', moduloId: 'mod-3', leccionesVistas: ['l1', 'l2'], respuestasQuiz: {}, puntaje: null, estado: 'en-curso', fechaInicio: '2026-10-25', fechaFin: null },
      { id: 'prog-006', userId: 'usr-col-003', orgId: 'org-001', moduloId: 'mod-1', leccionesVistas: ['l1', 'l2', 'l3', 'l4'], respuestasQuiz: { p1: 'b', p2: 'a', p3: 'c', p4: 'b', p5: 'a' }, puntaje: 60, estado: 'completado', fechaInicio: '2026-10-18', fechaFin: '2026-10-18' },
      { id: 'prog-007', userId: 'usr-col-004', orgId: 'org-001', moduloId: 'mod-1', leccionesVistas: ['l1'], respuestasQuiz: {}, puntaje: null, estado: 'en-curso', fechaInicio: '2026-10-22', fechaFin: null },
      { id: 'prog-010', userId: 'usr-col-010', orgId: 'org-002', moduloId: 'mod-1', leccionesVistas: ['l1', 'l2', 'l3', 'l4'], respuestasQuiz: { p1: 'b', p2: 'c', p3: 'c', p4: 'b', p5: 'd' }, puntaje: 100, estado: 'completado', fechaInicio: '2026-09-01', fechaFin: '2026-09-01' },
      { id: 'prog-011', userId: 'usr-col-010', orgId: 'org-002', moduloId: 'mod-3', leccionesVistas: ['l1', 'l2', 'l3', 'l4'], respuestasQuiz: { p1: 'b', p2: 'c', p3: 'd', p4: 'c', p5: 'b' }, puntaje: 100, estado: 'completado', fechaInicio: '2026-09-03', fechaFin: '2026-09-03' },
      { id: 'prog-012', userId: 'usr-col-011', orgId: 'org-002', moduloId: 'mod-1', leccionesVistas: ['l1', 'l2', 'l3', 'l4'], respuestasQuiz: { p1: 'b', p2: 'c', p3: 'c', p4: 'b', p5: 'd' }, puntaje: 100, estado: 'completado', fechaInicio: '2026-09-02', fechaFin: '2026-09-02' }
    ],
    // Indicador agregado de participación para organizaciones con muchos colaboradores (solo cifras agregadas, sin personas)
    participacionAgregada: {
      'org-002': { colaboradoresInvitados: 340, colaboradoresActivos: 288, modulosCompletados: 612 },
      'org-003': { colaboradoresInvitados: 42, colaboradoresActivos: 39, modulosCompletados: 131 }
    },
    evidencias: [
      { id: 'evi-001', orgId: 'org-001', accionId: 'acc-001', preguntaId: 'q02', nombre: 'Acta-gerencia-designacion-responsable-2026.pdf', tipo: 'Acta o registro de reunión', descripcion: 'Acta de gerencia que designa a la Líder de Talento Humano como responsable de prevención, con 4 horas semanales.', fecha: '2026-10-28', registradoPor: 'usr-org-001', archivo: null },
      { id: 'evi-002', orgId: 'org-001', accionId: 'acc-006', preguntaId: 'q18', nombre: 'Directorio-instancias-competentes-borrador.xlsx', tipo: 'Herramienta', descripcion: 'Borrador del directorio territorial en validación.', fecha: '2026-10-30', registradoPor: 'usr-org-001', archivo: null },
      { id: 'evi-010', orgId: 'org-002', accionId: 'acc-022', preguntaId: 'q16', nombre: 'Ficha-indicadores-formacion.xlsx', tipo: 'Informe o reporte', descripcion: 'Ficha de indicadores de cobertura y apropiación.', fecha: '2026-11-20', registradoPor: 'usr-org-002', archivo: null },
      { id: 'evi-030', orgId: 'org-003', accionId: 'acc-033', preguntaId: 'q24', nombre: 'Constancia-mesa-territorial.pdf', tipo: 'Otro documento', descripcion: 'Constancia de vinculación a la mesa territorial.', fecha: '2026-09-30', registradoPor: 'usr-org-003', archivo: null }
    ],
    interesesSello: [
      { id: 'int-001', orgId: 'org-003', organizacion: 'Cooperativa Horizonte', contacto: 'Patricia Ocampo', cargo: 'Gerente', email: 'gerencia@coophorizonte.demo', telefono: '', municipio: 'Chinchiná', mensaje: 'Queremos postularnos cuando se abra el proceso.', autorizaContacto: true, fecha: '2026-10-20', estado: 'recibida', gestion: [] }
    ],
    contenidos: contenidos,
    modulos: modulos,
    documentosLegales: documentosLegales,
    historial: [
      { fecha: '2026-10-30', actorId: 'usr-org-005', accion: 'Registro de organización', entidad: 'organizacion', entidadId: 'org-005' },
      { fecha: '2026-10-28', actorId: 'usr-org-004', accion: 'Avance en diagnóstico (11/24)', entidad: 'diagnostico', entidadId: 'diag-004' },
      { fecha: '2026-10-15', actorId: 'usr-eval-002', accion: 'Dictamen emitido', entidad: 'evaluacion', entidadId: 'eval-002' }
    ]
  };
};

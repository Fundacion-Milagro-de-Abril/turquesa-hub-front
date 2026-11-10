/* ============================================================
   TURQUESA HUB · CATÁLOGOS
   Listas de referencia utilizadas por formularios y filtros.
   En producción provienen de GET /catalogos (ver docs/API_CONTRACT.md).
   ============================================================ */
window.TH = window.TH || {};
TH.data = TH.data || {};

TH.data.catalogos = {
  sectores: [
    'Agroindustria y café', 'Comercio', 'Construcción', 'Educación', 'Energía y servicios públicos',
    'Financiero y cooperativo', 'Industria manufacturera', 'Salud', 'Sector público', 'Servicios profesionales',
    'Tecnología', 'Transporte y logística', 'Turismo y hotelería', 'Organización social o sin ánimo de lucro', 'Otro'
  ],
  tamanos: [
    { id: 'micro', nombre: 'Hasta 10 personas' },
    { id: 'pequena', nombre: '11 a 50 personas' },
    { id: 'mediana', nombre: '51 a 200 personas' },
    { id: 'grande', nombre: '201 a 500 personas' },
    { id: 'muy-grande', nombre: 'Más de 500 personas' }
  ],
  departamentos: {
    'Caldas': ['Manizales', 'Chinchiná', 'Villamaría', 'La Dorada', 'Riosucio', 'Anserma', 'Neira', 'Palestina', 'Supía', 'Aguadas', 'Otro municipio'],
    'Risaralda': ['Pereira', 'Dosquebradas', 'Santa Rosa de Cabal', 'La Virginia', 'Otro municipio'],
    'Quindío': ['Armenia', 'Calarcá', 'Montenegro', 'Otro municipio'],
    'Antioquia': ['Medellín', 'Envigado', 'Itagüí', 'Bello', 'Otro municipio'],
    'Bogotá D.C.': ['Bogotá'],
    'Valle del Cauca': ['Cali', 'Palmira', 'Buga', 'Otro municipio'],
    'Otro departamento': ['Otro municipio']
  },
  rolesSistema: [
    { id: 'organizacion', nombre: 'Administrador organizacional', espacio: 'Organización', color: 'var(--th-perfil-organizacion)', inicio: '/organizacion/inicio' },
    { id: 'colaborador', nombre: 'Colaborador', espacio: 'Colaboradores', color: 'var(--th-perfil-colaborador)', inicio: '/colaborador/inicio' },
    { id: 'fma', nombre: 'Administración FMA', espacio: 'Administración', color: 'var(--th-perfil-fma)', inicio: '/fma/inicio' }
  ],
  tiposIdentificacion: [
    { id: 'NIT', nombre: 'NIT (persona jurídica)' },
    { id: 'CC', nombre: 'Cédula de ciudadanía (persona natural o empresa unipersonal)' },
    { id: 'CE', nombre: 'Cédula de extranjería' },
    { id: 'PASAPORTE', nombre: 'Pasaporte' },
    { id: 'OTRO', nombre: 'Otro documento o registro institucional' },
    { id: 'sin-identificacion', nombre: 'Sin identificación tributaria (colectivo u organización no formalizada)' }
  ],
  estadosAccion: [
    { id: 'pendiente', nombre: 'Pendiente', badge: 'neutro' },
    { id: 'en-ejecucion', nombre: 'En ejecución', badge: 'info' },
    { id: 'en-revision', nombre: 'En revisión', badge: 'violeta' },
    { id: 'completada', nombre: 'Completada', badge: 'exito' },
    { id: 'atrasada', nombre: 'Atrasada', badge: 'error' }
  ],
  prioridades: [
    { id: 'alta', nombre: 'Alta' }, { id: 'media', nombre: 'Media' }, { id: 'baja', nombre: 'Baja' }
  ],
  estadosSolicitud: [
    { id: 'borrador', nombre: 'Borrador', badge: 'neutro' },
    { id: 'enviada', nombre: 'Enviada', badge: 'info' },
    { id: 'en-revision-administrativa', nombre: 'Revisión administrativa', badge: 'info' },
    { id: 'asignada', nombre: 'Asignada a evaluador', badge: 'violeta' },
    { id: 'en-evaluacion', nombre: 'En evaluación', badge: 'violeta' },
    { id: 'ajustes-solicitados', nombre: 'Ajustes solicitados', badge: 'alerta' },
    { id: 'dictamen-emitido', nombre: 'Dictamen emitido', badge: 'turquesa' },
    { id: 'decision-registrada', nombre: 'Decisión registrada', badge: 'exito' },
    { id: 'cerrada', nombre: 'Cerrada', badge: 'neutro' }
  ],
  estadosEvaluacion: [
    { id: 'asignada', nombre: 'Asignada', badge: 'neutro' },
    { id: 'en-revision', nombre: 'En revisión', badge: 'info' },
    { id: 'ajustes-solicitados', nombre: 'Ajustes solicitados', badge: 'alerta' },
    { id: 'revision-finalizada', nombre: 'Revisión finalizada', badge: 'violeta' },
    { id: 'dictamen-emitido', nombre: 'Dictamen emitido', badge: 'turquesa' },
    { id: 'cerrada', nombre: 'Cerrada', badge: 'exito' }
  ],
  valoracionesCriterio: [
    { id: 'cumple', nombre: 'Cumple', puntos: 2, badge: 'exito' },
    { id: 'cumple-parcial', nombre: 'Cumple parcialmente', puntos: 1, badge: 'alerta' },
    { id: 'no-cumple', nombre: 'No cumple', puntos: 0, badge: 'error' },
    { id: 'requiere-ajuste', nombre: 'Requiere ajuste / aclaración', puntos: 0, badge: 'violeta' }
  ],
  respuestasAutoevaluacion: [
    { id: 'cumple', nombre: 'Cumplimos este criterio' },
    { id: 'parcial', nombre: 'Lo cumplimos parcialmente' },
    { id: 'no-cumple', nombre: 'Aún no lo cumplimos' }
  ],
  tiposEvidencia: ['Política o documento institucional', 'Acta o registro de reunión', 'Registro de asistencia', 'Material de comunicación', 'Informe o reporte', 'Procedimiento o protocolo', 'Otro documento'],
  categoriasContenido: ['Guía práctica', 'Modelo orientativo', 'Ficha normativa', 'Herramienta', 'Material de sensibilización', 'Documento de referencia', 'Glosario'],
  estadosContenido: [
    { id: 'borrador', nombre: 'Borrador', badge: 'neutro' },
    { id: 'en-revision-tecnica', nombre: 'En revisión técnica', badge: 'info' },
    { id: 'en-revision-juridica', nombre: 'En revisión jurídica', badge: 'violeta' },
    { id: 'en-revision-psicosocial', nombre: 'En revisión psicosocial', badge: 'violeta' },
    { id: 'aprobado', nombre: 'Aprobado', badge: 'turquesa' },
    { id: 'publicado', nombre: 'Publicado', badge: 'exito' },
    { id: 'archivado', nombre: 'Archivado', badge: 'neutro' }
  ],
  estadosModulo: [
    { id: 'borrador', nombre: 'Borrador', badge: 'neutro' },
    { id: 'en-revision-tecnica', nombre: 'En revisión técnica', badge: 'info' },
    { id: 'en-revision-juridica', nombre: 'En revisión jurídica', badge: 'violeta' },
    { id: 'en-revision-psicosocial', nombre: 'En revisión psicosocial', badge: 'violeta' },
    { id: 'aprobado', nombre: 'Aprobado', badge: 'turquesa' },
    { id: 'publicado', nombre: 'Publicado', badge: 'exito' },
    { id: 'archivado', nombre: 'Archivado (sustituido)', badge: 'neutro' },
    { id: 'retirado', nombre: 'Retirado', badge: 'error' }
  ],
  tiposDocumentoLegal: [
    { id: 'aviso-registro', nombre: 'Aviso de información y autorización para el registro inicial', ruta: '/aviso-registro', transitorio: true },
    { id: 'condiciones-uso', nombre: 'Condiciones de uso', ruta: '/condiciones' },
    { id: 'tratamiento-datos', nombre: 'Política de tratamiento de datos personales', ruta: '/privacidad' }
  ],
  estadosDocumentoLegal: [
    { id: 'borrador', nombre: 'Borrador jurídico (no vigente)', badge: 'alerta' },
    { id: 'en-revision-juridica', nombre: 'En revisión jurídica', badge: 'violeta' },
    { id: 'aprobado', nombre: 'Aprobado (pendiente de publicación)', badge: 'turquesa' },
    { id: 'publicado', nombre: 'Publicado y vigente', badge: 'exito' },
    { id: 'archivado', nombre: 'Archivado', badge: 'neutro' }
  ],
  estadosRevision: [
    { id: 'pendiente', nombre: 'Pendiente', badge: 'alerta' },
    { id: 'en-curso', nombre: 'En curso', badge: 'info' },
    { id: 'aprobada', nombre: 'Aprobada', badge: 'exito' },
    { id: 'cambios-requeridos', nombre: 'Cambios requeridos', badge: 'error' },
    { id: 'no-aplica', nombre: 'No aplica', badge: 'neutro' }
  ],
  estadosInteres: [
    { id: 'pendiente-envio', nombre: 'Registrada (pendiente de envío)', badge: 'alerta' },
    { id: 'recibida', nombre: 'Recibida', badge: 'info' },
    { id: 'contactada', nombre: 'Contactada', badge: 'turquesa' },
    { id: 'cerrada', nombre: 'Cerrada', badge: 'neutro' }
  ],
  estadosOrganizacion: [
    { id: 'activa', nombre: 'Activa', badge: 'exito' },
    { id: 'suspendida', nombre: 'Suspendida', badge: 'error' }
  ],
  decisionesInstitucionales: [
    { id: 'otorgar', nombre: 'Otorgar reconocimiento (simulado)' },
    { id: 'aplazar', nombre: 'Aplazar: requiere plan de ajustes' },
    { id: 'no-otorgar', nombre: 'No otorgar en esta vigencia' }
  ],
  cargos: ['Líder de Talento Humano', 'Gerente / Director(a)', 'Responsable de Bienestar', 'Responsable de Sostenibilidad', 'Oficial de Cumplimiento', 'Coordinador(a) SG-SST', 'Otro']
};

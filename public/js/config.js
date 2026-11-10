/* ============================================================
   TURQUESA HUB · CONFIGURACIÓN DEL PRODUCTO
   El entorno lo define js/env.js (window.TH_ENV), generado desde
   config/env.desarrollo.js o config/env.produccion.js por tools/build.js.
     - desarrollo: adaptador local, datos de prueba (js/dev/semilla.js),
       persistencia en el navegador. Solo pruebas y revisión interna.
     - produccion: adaptador HTTP contra la API (docs/API_CONTRACT.md),
       sin datos de prueba ni persistencia local. HTTPS obligatorio.
   No contiene lógica de interfaz.
   ============================================================ */
window.TH = window.TH || {};

TH.config = (function () {
  const env = window.TH_ENV || {};
  const entorno = env.entorno === 'produccion' ? 'produccion' : 'desarrollo';
  const remoto = entorno === 'produccion';
  return {
    producto: { nombre: 'Turquesa Hub', version: env.version || '1.0.0-rc4', organizacion: 'Fundación Milagro de Abril' },
    entorno,
    esDesarrollo: !remoto,
    /** true cuando los servicios se consumen por HTTP (producción). */
    esRemoto: remoto,
    api: { baseUrl: env.apiBase || '/api/v1', timeoutMs: 15000, cacheSegundos: 60 },
    auth: {
      adaptador: remoto ? 'http' : 'local',
      sesionMinutos: 480,
      clave: { longitudMinima: 10, requiereNumero: true, requiereLetra: true }
    },
    /** Documentos jurídicos que la persona acepta al registrarse. Sus versiones aprobadas y publicadas las
     *  gestiona la FMA (perfil jurídico) en /fma/documentos-legales; el registro se bloquea mientras no exista
     *  una versión publicada de cada documento (ver TH.api.documentosLegales). */
    consentimientos: {
      avisoRegistro: { id: 'aviso-registro', nombre: 'Aviso de información y autorización para el registro inicial', ruta: '/aviso-registro' },
      condicionesUso: { id: 'condiciones-uso', nombre: 'Condiciones de uso', ruta: '/condiciones' },
      tratamientoDatos: { id: 'tratamiento-datos', nombre: 'Política de tratamiento de datos personales', ruta: '/privacidad' }
    },
    /** Biblioteca y módulos: organizaciones y colaboradores solo reciben contenidos en estado "publicado"
     *  (regla fija en TH.api.contenidos.esVisible y TH.api.modulos.publicados; no configurable). */
    /** Evidencias: límites de carga que el backend también aplica. */
    archivos: { maxBytes: 10 * 1024 * 1024, tipos: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'image/png', 'image/jpeg'] },
    /** Inventario funcional. `requiereBackend` señala los servicios de la API de los que depende cada módulo. */
    modulos: {
      perfil: { nombre: 'Perfil organizacional', requiereBackend: ['organizaciones'] },
      diagnostico: { nombre: 'Autodiagnóstico institucional guiado', requiereBackend: ['diagnosticos'] },
      resultados: { nombre: 'Resultados y análisis de brechas', requiereBackend: ['diagnosticos'] },
      plan: { nombre: 'Plan de acción organizacional', requiereBackend: ['planes'] },
      seguimiento: { nombre: 'Gestión y seguimiento de compromisos', requiereBackend: ['planes', 'evidencias', 'archivos'] },
      colaboradores: { nombre: 'Sensibilización de colaboradores', requiereBackend: ['invitaciones', 'formacion', 'correo'] },
      biblioteca: { nombre: 'Biblioteca de herramientas y contenidos', requiereBackend: ['contenidos'] },
      reportes: { nombre: 'Reportes institucionales', requiereBackend: ['reportes'] },
      sello: { nombre: 'Sello Turquesa (información y manifestación de interés)', requiereBackend: ['sello-intereses', 'correo'] },
      administracion: { nombre: 'Administración FMA', requiereBackend: ['usuarios-internos', 'contenidos', 'modulos', 'instrumento', 'documentos-legales', 'auditoria'] }
    },
    /** Módulos reservados: desarrollados y conservados en ../reservado/ (fuera del directorio desplegable). */
    reservados: ['sello-postulacion', 'sello-evaluacion-independiente', 'sello-decisiones']
  };
})();

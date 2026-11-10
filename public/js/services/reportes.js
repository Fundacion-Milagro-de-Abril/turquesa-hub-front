/* ============================================================
   TURQUESA HUB · SERVICIO DE REPORTES
   Agregados para tableros y vistas imprimibles (exportación a PDF
   mediante la función de impresión del navegador). Producción: §9 del contrato.
   ============================================================ */
window.TH = window.TH || {};
TH.api = TH.api || {};

TH.api.reportes = {
  /** Tablero general de la FMA. Cifras ficticias calculadas sobre la semilla. */
  tableroFMA() {
    const st = TH.store.get();
    const orgs = st.organizaciones;
    const diag = st.diagnosticos;
    const acciones = st.planes.flatMap(p => p.acciones);
    const form = TH.api.formacion.totales();
    const intereses = TH.api.sello.intereses();
    return {
      organizaciones: orgs.length,
      activas: orgs.filter(o => o.estado === 'activa').length,
      suspendidas: orgs.filter(o => o.estado === 'suspendida').length,
      diagnosticosIniciados: diag.length,
      diagnosticosTerminados: diag.filter(d => d.estado === 'completado').length,
      planes: st.planes.length,
      accionesTotal: acciones.length,
      accionesCompletadasPct: TH.util.pct(acciones.filter(a => a.estado === 'completada').length, acciones.length),
      accionesAtrasadas: acciones.filter(a => a.estado === 'atrasada').length,
      colaboradoresParticipantes: form.participantes,
      actividadesFormativas: form.completados,
      interesesSello: intereses.length,
      interesesSinGestionar: intereses.filter(i => ['recibida', 'pendiente-envio'].includes(i.estado)).length,
      porSector: Object.entries(orgs.reduce((m, o) => { m[o.sector] = (m[o.sector] || 0) + 1; return m; }, {})).map(([k, v]) => ({ etiqueta: k, valor: v })),
      porMunicipio: Object.entries(orgs.reduce((m, o) => { m[o.municipio] = (m[o.municipio] || 0) + 1; return m; }, {})).map(([k, v]) => ({ etiqueta: k, valor: v })),
      madurezPromedio: (() => { const vals = diag.filter(d => d.estado === 'completado').map(d => TH.api.diagnostico.calcular(d).global); return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0; })()
    };
  },

  /** Reporte organizacional: todo lo necesario para la vista imprimible */
  organizacion(orgId) {
    const org = TH.api.organizaciones.obtener(orgId);
    const diag = TH.api.diagnostico.obtener(orgId);
    const resultado = TH.api.diagnostico.calcular(diag);
    const plan = TH.api.plan.obtener(orgId);
    const planResumen = TH.api.plan.resumen(plan);
    const formacion = TH.api.formacion.agregadosOrganizacion(orgId);
    const intereses = TH.api.sello.interesesDeOrganizacion(orgId);
    const evidencias = TH.api.evidencias.listar(orgId);
    return { org, diag, resultado, plan, planResumen, formacion, intereses, evidencias, generado: new Date().toISOString() };
  },

  /** Dimensiones promedio entre organizaciones con diagnóstico completo (FMA) */
  dimensionesPromedio() {
    const st = TH.store.get();
    const completos = st.diagnosticos.filter(d => d.estado === 'completado').map(d => TH.api.diagnostico.calcular(d));
    return TH.data.instrumento.dimensiones.map(dim => {
      const vals = completos.map(r => r.dimensiones.find(x => x.dim.id === dim.id)).filter(x => x && x.puntaje !== null).map(x => x.puntaje);
      return { dim, promedio: vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0, n: vals.length };
    });
  },

  imprimir() { window.print(); }
};

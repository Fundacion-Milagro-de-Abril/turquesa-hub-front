/* ============================================================
   TURQUESA HUB · SERVICIO DEL SELLO TURQUESA (información e interés)
   En el alcance operativo actual el Sello se presenta institucionalmente y
   recibe manifestaciones de interés. El proceso formal de postulación y
   evaluación independiente está desarrollado y conservado en js/reservado/
   y no se expone.

   Manifestación de interés:
     - producción (adaptador http): POST /sello/intereses → la FMA la recibe
       y queda registrada en su base de datos. Estado devuelto: 'recibida'.
     - desarrollo (adaptador local): se guarda en el estado local con estado
       'pendiente-envio'. La interfaz NO la presenta como enviada.
   ============================================================ */
window.TH = window.TH || {};
TH.api = TH.api || {};

TH.api.sello = {
  intereses() { return TH.store.get().interesesSello || []; },
  interesesDeOrganizacion(orgId) { return this.intereses().filter(i => i.orgId === orgId); },

  async manifestarInteres(datos) {
    const i = { organizacion: (datos.organizacion || '').trim(), contacto: (datos.contacto || '').trim(), cargo: (datos.cargo || '').trim(), email: (datos.email || '').trim(), telefono: (datos.telefono || '').trim(), municipio: (datos.municipio || '').trim(), mensaje: (datos.mensaje || '').trim(), orgId: datos.orgId || TH.auth.orgId() || null, autorizaContacto: !!datos.autorizaContacto };
    if (!i.organizacion || !i.contacto || !i.email) return { ok: false, error: 'Organización, persona de contacto y correo son obligatorios.' };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.email)) return { ok: false, error: 'Escribe un correo válido.' };
    if (!i.autorizaContacto) return { ok: false, error: 'Debes autorizar el contacto por parte de la Fundación.' };
    if (TH.config.auth.adaptador === 'http') {
      const r = await TH.http.llamar('POST', '/sello/intereses', i);
      if (!r.ok) return r;
      const registro = Object.assign({ id: r.id || TH.util.id('int'), fecha: TH.util.hoy(), estado: 'recibida' }, i);
      TH.store.update(s => { s.interesesSello = s.interesesSello || []; s.interesesSello.push(registro); }, 'sello');
      return { ok: true, interes: registro, enviada: true };
    }
    const registro = Object.assign({ id: TH.util.id('int'), fecha: TH.util.hoy(), estado: 'pendiente-envio' }, i);
    TH.store.update(s => { s.interesesSello = s.interesesSello || []; s.interesesSello.push(registro); TH.api.historial.registrar(s, 'Manifestación de interés en el Sello Turquesa registrada', 'interes-sello', registro.id); }, 'sello');
    return { ok: true, interes: registro, enviada: false };
  },

  /** Administración FMA: cambia el estado de gestión de una manifestación (recibida → contactada → cerrada). */
  gestionarInteres(id, estado, nota) {
    const u = TH.auth.usuario();
    TH.store.update(s => { const i = (s.interesesSello || []).find(x => x.id === id); if (!i) return; i.estado = estado; i.gestion = i.gestion || []; i.gestion.push({ fecha: TH.util.hoy(), actor: u ? u.nombre : 'FMA', estado, nota: (nota || '').trim() }); TH.api.historial.registrar(s, 'Gestión de manifestación de interés: ' + estado, 'interes-sello', id); }, 'sello');
    return { ok: true };
  }
};

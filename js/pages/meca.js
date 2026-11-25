// Personne 4 : espace mécanicien (demandes, devis, interventions, facture)

state.filter = 'Toutes';

tabFor.detail = 'requests';
tabFor.mkquote = 'requests';
tabFor.sentq = 'requests';
tabFor.invoice = 'jobs';

screens['meca.requests'] = function () {
  let chips = '';
  for (const filter of ['Toutes', 'Urgentes']) {
    chips += chip(filter, state.filter === filter, `data-set="filter" data-val="${filter}"`);
  }
  let content = '<p class="empty">Aucune demande pour le moment.</p>';
  if (state.requestSent) {
    let status = badge('warn', 'clock', 'En attente de devis');
    if (state.quote) {
      status = badge('ok', 'check', 'Devis envoyé');
    }
    content = `<div class="card">
      <h2>Thomas Lefèvre</h2>
      <p class="small">${state.car} · 2017 · 98 000 km</p>
      <p class="mt8 mb8">${escapeHtml(state.desc)}</p>
      ${status}
      <button class="btn mt12" data-go="detail">Voir la demande</button></div>`;
  }
  return page(`
    <h1>Demandes</h1>
    <p class="sub">Triées par urgence.</p>
    <div class="chips mb16">${chips}</div>
    ${content}`);
};

screens.detail = function () {
  let status = badge('warn', 'clock', 'En attente de devis');
  let buttons = `<button class="btn" data-go="mkquote">Faire un devis</button>
    <button class="btn ter" data-act="decline">Décliner la demande</button>`;
  if (state.quote) {
    status = badge('ok', 'check', 'Devis envoyé');
    buttons = '<button class="btn" data-go="sentq">Voir le devis envoyé</button>';
  }
  return page(`
    <h1>Demande de Thomas</h1>
    ${status}
    <div class="card mt16">
      <span class="small">Véhicule</span><p>${state.car}, 2017, 98 000 km</p>
      <span class="small block mt12">Problème</span><p>${escapeHtml(state.desc)}</p>
      <span class="small block mt12">Photos</span><p>Aucune photo jointe</p>
      <span class="small block mt12">Disponibilités</span><p>${state.slot}</p>
    </div>`, footer(buttons));
};

screens.mkquote = function () {
  return page(`
    <h1>Créer le devis</h1>
    <label class="lbl" for="q1">Main-d'œuvre</label><input id="q1" value="2 h">
    <label class="lbl" for="q2">Pièces</label><input id="q2" value="Plaquettes de frein avant">
    <label class="lbl" for="q3">Durée estimée</label><input id="q3" value="2 h">
    <div class="total mt24 mb4"><span>Total</span><span>214,00 € TTC</span></div>
    <p class="small">Calculé automatiquement.</p>
    <label class="lbl" for="q4">Message au client</label>
    <textarea id="q4">Bonjour, voici le devis pour vos plaquettes de frein avant.</textarea>`,
    footer('<button class="btn" data-act="sendq">Envoyer le devis</button>'));
};

screens.sentq = function () {
  let status = badge('warn', 'doc', 'Devis reçu');
  if (state.accepted) {
    status = badge('ok', 'check', 'Devis accepté');
  }
  return page(`
    <h1>Devis envoyé</h1>
    <div class="mb16">${status}</div>
    <div class="card">
      <div class="row green">${icon('ok')}<h2 class="dark">Envoi réussi</h2></div>
      <p class="mt8 mb8">Thomas Lefèvre a reçu le devis.<br>Nous attendons sa réponse.</p>
      <hr class="sep">
      <div class="line"><span>Véhicule</span><span>${state.car}</span></div>
      <div class="total"><span>Total</span><span>214,00 € TTC</span></div>
    </div>`, footer('<button class="btn" data-go="requests">Retour aux demandes</button>'));
};

screens.jobs = function () {
  let content = "<p class=\"empty\">Aucune intervention. Elles apparaissent après acceptation d'un devis.</p>";
  if (state.accepted) {
    let status = badge('warn', 'wrench', 'En cours');
    let buttons = `<button class="btn" data-act="done">Marquer comme terminée</button>
      <button class="btn sec mt12" data-go="chat">Envoyer un message d'avancement</button>`;
    if (state.jobDone) {
      status = badge('ok', 'check', 'Terminée');
      buttons = '<button class="btn" data-go="invoice">Créer la facture</button>';
    }
    content = `<div class="card">
      <h2>Thomas Lefèvre</h2>
      <p class="small mt4 mb8">${state.car} · Plaquettes avant</p>
      ${status}
      <div class="mt12">${buttons}</div></div>`;
  }
  return page(`<h1>Interventions</h1>${content}`);
};

screens.invoice = function () {
  let foot = footer(`<button class="btn" data-act="sendi">Envoyer la facture</button>
    <button class="btn ter">Voir l'historique des factures</button>`);
  if (state.invoiceSent) {
    foot = footer('<p class="center green bold">Facture envoyée au client.</p>');
  }
  return page(`
    <h1>Facture</h1>
    <p class="sub">Générée depuis le devis accepté.</p>
    <div class="card">
      <span class="small">Client</span><p>Thomas Lefèvre</p>
      <span class="small block mt12">Réparation</span><p>Plaquettes de frein avant</p>
      <hr class="sep">
      <div class="line"><span>Main-d'œuvre</span><span>2 h</span></div>
      <div class="line"><span>Pièces</span><span>Comprises</span></div>
      <hr class="sep">
      <div class="total"><span>Total</span><span>214,00 € TTC</span></div>
    </div>
    ${badge('ok', 'check', 'Terminée')}
    <p class="sub mt12">Vérifiez les informations avant l'envoi.</p>`, foot);
};

actions.sendq = function () {
  state.quote = true;
  goTo('sentq');
};

actions.decline = function () {
  state.requestSent = false;
  state.quote = false;
  goTo('requests');
};

actions.done = function () {
  state.jobDone = true;
  render();
};

actions.sendi = function () {
  state.invoiceSent = true;
  render();
};

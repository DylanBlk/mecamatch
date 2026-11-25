// Personne 3 : liste des demandes, suivi, devis reçu, devis accepté

state.trackErr = false;

tabFor.track = 'requests';
tabFor.quote = 'requests';
tabFor.accepted = 'requests';

screens.requests = function () {
  let content = '<p class="empty">Aucune demande pour le moment.</p>';
  if (state.requestSent) {
    let target = 'track';
    if (state.quote) {
      target = 'quote';
    }
    content = `<div class="card">
      <h2>${garageName()}</h2>
      <p class="small mt4 mb8">${state.type} · ${state.car}</p>
      <div class="mb12">${quoteStatus()}</div>
      <button class="btn" data-go="${target}">Voir la demande</button></div>`;
  }
  return page(`<h1>Demandes</h1><p class="sub">Vos demandes en cours.</p>${content}`);
};

screens.track = function () {
  if (state.trackErr) {
    return page(`
      ${backButton('requests', 'Mes demandes')}
      <span class="red">${icon('alert', 40)}</span>
      <h2 class="mt16 mb8">Impossible d'afficher le suivi</h2>
      <p class="muted">Vérifiez votre connexion, puis réessayez.</p>
      <button class="btn mt16" data-act="retrytrack">${icon('refresh')}Réessayer</button>`);
  }

  // Étape en cours : 0 à 5
  let current = 0;
  if (state.invoiceSent) {
    current = 5;
  } else if (state.jobDone) {
    current = 4;
  } else if (state.accepted) {
    current = 3;
  } else if (state.quote) {
    current = 1;
  }

  const labels = ['En attente de devis', 'Devis reçu', 'Devis accepté', 'En cours', 'Terminée', 'Facturée'];
  const dates = ['Fait le 10 oct.', 'Fait le 11 oct.', 'Fait le 12 oct.'];
  let steps = '';
  for (let i = 0; i < labels.length; i++) {
    let iconName = 'circle';
    let color = 'blue';
    let text = 'À venir';
    if (i < current) {
      iconName = 'ok';
      color = 'green';
      text = dates[Math.min(i, 2)];
    } else if (i === current) {
      iconName = 'clock';
      text = 'Étape actuelle';
    }
    steps += `<div class="row top mb12 ${color}">${icon(iconName)}
      <div class="dark"><b>${labels[i]}</b><div class="small">${text}</div></div></div>`;
  }

  let update = 'Karim Benali : les plaquettes avant sont changées. Remontage des roues en cours.';
  if (state.jobDone) {
    update = 'Karim Benali : les plaquettes avant sont neuves.';
  }
  return page(`
    ${backButton('requests', 'Mes demandes')}
    <h1>Freins avant</h1>
    <p class="small mb8">${state.car} · ${garageName()}</p>
    ${badge('wait', 'wrench', labels[current])}
    <div class="card mt16"><h2>Dernière mise à jour</h2><p>${update}</p>
      <p class="small">Aujourd'hui, 14 h 32</p></div>
    <div class="card"><h2 class="mb12">Étapes</h2>${steps}</div>`,
    footer(`<button class="btn" data-go="chat">${icon('msg')}Écrire à Karim Benali</button>`));
};

screens.quote = function () {
  let foot = footer(`<button class="btn" data-act="accept">Accepter le devis</button>
    <button class="btn ter" data-act="refuse">Refuser le devis</button>`);
  if (state.accepted) {
    foot = footer('<p class="center green bold">Devis accepté. Le garage vous contactera.</p>');
  }
  return page(`
    <h1>Votre devis</h1>
    <div class="mb16">${quoteStatus()}</div>
    <div class="card">
      <h2>${garageName()}</h2>
      <b>Plaquettes de frein avant</b>
      <p class="small mt8 mb12">Les plaquettes de frein sont les pièces qui frottent sur le disque pour ralentir votre voiture.</p>
      <hr class="sep">
      <div class="line"><span>Main-d'œuvre</span><span>2 h</span></div>
      <div class="line"><span>Pièces</span><span>Comprises</span></div>
      <hr class="sep">
      <div class="total"><span>Total</span><span>214,00 € TTC</span></div>
    </div>`, foot, 'pad-top');
};

screens.accepted = function () {
  const next = [
    "Déposez votre voiture à l'heure prévue.",
    'Le garage vous prévient quand elle est prête.',
    `La facture arrive dans l'historique de votre ${state.car}.`,
  ];
  let list = '';
  for (let i = 0; i < next.length; i++) {
    list += `<div class="row top mb8"><b class="small number">${i + 1}</b>${next[i]}</div>`;
  }
  return page(`
    <span class="green">${icon('ok', 40)}</span>
    <h1 class="mt12">Devis accepté</h1>
    <p class="sub mb12">${garageName()} est prévenu et vous attend au rendez-vous.</p>
    ${badge('ok', 'check', 'Devis accepté')}
    <div class="card mt16"><h2>Rendez-vous</h2>
      <div class="row mt8 mb8">${icon('cal')}<b>Mardi 20 octobre · 9 h 00</b></div>
      <div class="row">${icon('pin')}${garageName()} · 12 rue des Lilas</div></div>
    <div class="card"><h2 class="mb8">La suite</h2>${list}</div>`,
    footer(`<button class="btn" data-go="home">Retourner à l'accueil</button>
      <button class="btn ter" data-go="chat">Envoyer un message au garage</button>`));
};

actions.accept = function () {
  state.accepted = true;
  goTo('accepted');
};

actions.refuse = function () {
  state.quote = false;
  goTo('home');
};

actions.retrytrack = function () {
  state.trackErr = false;
  render();
};

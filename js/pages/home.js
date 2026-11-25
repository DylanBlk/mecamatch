// Personne 2 : accueil client

screens.home = function () {
  let request = `
    <div class="card"><h2>Ma demande en cours</h2>
      <b>Aucune demande en cours</b>
      <p class="muted">Vos demandes apparaîtront ici après leur envoi.</p></div>
    <div class="card"><h2>Dernier document</h2>
      <b>Aucun document disponible</b>
      <p class="muted">Vos devis et factures apparaîtront ici.</p></div>`;

  if (state.requestSent) {
    let target = 'track';
    if (state.quote) {
      target = 'quote';
    }
    request = `
      <div class="card"><h2>Ma demande en cours</h2>
        <b>${requestTitle()}</b>
        <div class="mt8 mb8">${quoteStatus()}</div>
        <button class="link" data-go="${target}">Voir ma demande</button></div>
      <div class="card"><h2>Dernier document</h2>
        <div class="row"><span class="ico">${icon('doc')}</span>
          <div><b>Récapitulatif de votre demande</b>
          <div class="small">Créé lors de l'envoi de votre demande</div></div></div></div>`;
  }

  return page(`
    <div class="brand">${icon('wrench')}MécaMatch</div>
    <h1>Bonjour Thomas</h1>
    <p class="sub">Comment pouvons-nous vous aider ?</p>
    <div class="card warm">
      <h2>Un problème avec votre véhicule ?</h2>
      <p class="mt8 mb16">Décrivez le problème pour trouver un mécanicien adapté.</p>
      <button class="btn" data-go="vehicle">Décrire mon problème</button>
    </div>
    <div class="card"><h2>Mon véhicule</h2>
      <div class="row"><span class="ico">${icon('car')}</span>
        <div><b>${state.car} · 2017</b><div class="small">98 000 km</div></div></div></div>
    ${request}`);
};

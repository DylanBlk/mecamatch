// Personne 4 : facture côté client et avis

state.rating = 4;
state.rates = { price: 'Bien', quality: 'Bien', delay: 'Moyen' };

tabFor.invoiceWait = 'cars';
tabFor.invoiceView = 'cars';
tabFor.review = 'cars';

screens.invoiceWait = function () {
  return page(`
    ${backButton('carHist', 'Historique')}
    <span class="blue">${icon('doc', 40)}</span>
    <h2 class="mt16 mb8">Facture pas encore reçue</h2>
    <p class="muted mb16">Karim Benali n'a pas encore envoyé la facture. Vous serez prévenu dès sa réception.</p>
    <button class="btn" data-go="chat">${icon('msg')}Écrire à Karim Benali</button>`);
};

screens.invoiceView = function () {
  return page(`
    ${backButton('carHist', 'Historique')}
    <h1 class="no-margin">Facture</h1>
    <p class="small mb8">N° F-2026-0142 · 14 oct. 2026</p>
    ${badge('ok', 'doc', 'Facturée')}
    <div class="card mt16">
      <span class="small">Montant total</span>
      <div class="total big mt4 mb8">214,00 € TTC</div>
      <div class="line"><span>Main-d'œuvre (2 h)</span><span>110,00 €</span></div>
      <div class="line"><span>Pièces (plaquettes avant)</span><span>104,00 €</span></div>
    </div>
    <div class="card"><h2>Garage Benali</h2><p>Karim Benali</p>
      <p class="small">${state.car} · 98 000 km</p></div>
    <button class="btn mb12">${icon('dl')}Télécharger le PDF</button>
    <button class="btn sec">${icon('share')}Partager le PDF</button>
    <button class="btn ter" data-go="review">Donner mon avis</button>`);
};

// Trois boutons Bien / Moyen / Pas bien pour un critère
function rateButtons(key) {
  let buttons = '';
  for (const value of ['Bien', 'Moyen', 'Pas bien']) {
    let check = '';
    if (state.rates[key] === value) {
      check = '✓ ';
    }
    buttons += `<button class="chip rate-btn" aria-pressed="${state.rates[key] === value}" data-act="rate" data-key="${key}" data-val="${value}">${check}${value}</button>`;
  }
  return `<div class="chips no-wrap">${buttons}</div>`;
}

screens.review = function () {
  let stars = '';
  for (let n = 1; n <= 5; n++) {
    let check = '';
    if (state.rating === n) {
      check = '✓';
    }
    stars += `<button class="chip star-btn" aria-pressed="${state.rating === n}" data-act="star" data-val="${n}">${check}${n}</button>`;
  }
  return page(`
    ${backButton('carHist', 'Mes demandes')}
    <h1>Votre avis sur ${garageName()}</h1>
    <p class="small mb16">Plaquettes de frein avant · 14 oct. 2026</p>
    <span class="lbl first">Note globale</span>
    <div class="chips">${stars}</div>
    <div class="row between small"><span>1 : très déçu</span><span>5 : très satisfait</span></div>
    <span class="lbl">Prix</span>${rateButtons('price')}
    <span class="lbl">Qualité du travail</span>${rateButtons('quality')}
    <span class="lbl">Respect du délai</span>${rateButtons('delay')}
    <label class="lbl" for="comment">Votre commentaire (facultatif)</label>
    <textarea id="comment" maxlength="500" placeholder="Ex. Travail soigné, explications claires."></textarea>`,
    footer('<button class="btn" data-act="publish">Publier mon avis</button>'));
};

actions.rate = function (data) {
  state.rates[data.key] = data.val;
  render();
};

actions.star = function (data) {
  state.rating = Number(data.val);
  render();
};

actions.publish = function () {
  goTo('carHist');
};

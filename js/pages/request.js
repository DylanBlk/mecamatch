// Personne 2 : demande en 4 étapes, garages, fiche du garage, confirmation

state.carSel = true;
state.filters = [];
state.garErr = false;

noTabs.push('vehicle', 'problem', 'when', 'recap', 'garages');
tabFor.garageDetail = 'requests';
tabFor.sent = 'home';

function stepper(number) {
  let bars = '';
  for (let i = 1; i <= 4; i++) {
    let css = '';
    if (i <= number) {
      css = 'on';
    }
    bars += `<i class="${css}"></i>`;
  }
  return `<div class="stepl">Étape ${number} sur 4</div><div class="steps">${bars}</div>`;
}

function choice(key, value) {
  return `<button class="opt" role="radio" aria-checked="${state[key] === value}" data-set="${key}" data-val="${value}"><span class="dot"></span>${value}</button>`;
}

function hasMissingInfo() {
  return state.city.trim() === '' || state.type === '' || !state.hasCar;
}

// Étape 1 : véhicule
screens.vehicle = function () {
  let message = '';
  if (state.errors.car) {
    message = alertBox('Choisissez un véhicule pour continuer. Touchez la carte de votre véhicule.');
  }

  let content = '';
  if (state.hasCar) {
    let cardClass = '';
    let selectedIcon = 'circle';
    let selectedText = 'Non sélectionné';
    if (state.carSel) {
      cardClass = 'sel';
      selectedIcon = 'ok';
      selectedText = 'Sélectionné';
    }
    content = `
      <button class="card card-btn ${cardClass}" data-act="togglecar" aria-pressed="${state.carSel}">
        <div class="row"><span class="ico">${icon('car')}</span>
          <div><b>${state.car}</b><div class="small">${state.carInfo}</div>
          <div class="row small mt4">${icon(selectedIcon, 18)}${selectedText}</div></div></div>
      </button>
      <button class="btn sec" data-act="addcar">${icon('plus')}Ajouter un véhicule</button>`;
  } else {
    content = `
      <div class="card empty-card">
        <span class="gray">${icon('car', 40)}</span>
        <p class="bold mt16">Aucun véhicule enregistré</p>
        <p class="muted">Ajoutez votre véhicule pour continuer.</p>
      </div>
      <button class="btn" data-act="addcar">${icon('plus')}Ajouter un véhicule</button>`;
  }

  let disabled = '';
  if (!state.hasCar) {
    disabled = 'disabled';
  }
  return page(`
    ${backButton('home')}${stepper(1)}
    <h1>Quel véhicule souhaitez-vous faire réparer ?</h1>
    <p class="sub">Choisissez le véhicule concerné par le problème.</p>
    ${message}${content}`,
    footer(`<button class="btn" data-next="problem" ${disabled}>Continuer</button>`));
};

// Étape 2 : problème
screens.problem = function () {
  const types = ['Freins', 'Moteur', 'Bruit', 'Voyant', 'Électricité', 'Autre'];
  let chips = '';
  for (const type of types) {
    chips += chip(type, state.type === type, `data-act="settype" data-val="${type}"`);
  }
  let typeError = '';
  if (state.errors.type) {
    typeError = fieldError(state.errors.type);
  }
  let descError = '';
  let descClass = '';
  if (state.errors.desc) {
    descError = fieldError(state.errors.desc);
    descClass = 'bad';
  }
  return page(`
    ${backButton('vehicle')}${stepper(2)}
    <h1>Que se passe-t-il ?</h1>
    <p class="sub">Décrivez ce que vous constatez. Vous n'avez pas besoin de connaître le nom de la pièce.</p>
    <span class="lbl first">Type de problème</span>
    <div class="chips">${chips}</div>
    ${typeError}
    <label class="lbl" for="desc">Décrivez le problème</label>
    <textarea id="desc" data-bind="desc" class="${descClass}">${escapeHtml(state.desc)}</textarea>
    ${descError}
    <span class="lbl">Photo (facultatif)</span>
    <p class="small mb8">Une photo peut aider le mécanicien. Elle n'est pas obligatoire.</p>
    <button class="btn sec">${icon('cam')}Ajouter une photo</button>`,
    footer('<button class="btn" data-next="when">Continuer</button>'));
};

// Étape 3 : lieu et disponibilités
screens.when = function () {
  let cityError = '';
  if (state.errors.city) {
    cityError = state.errors.city;
  }
  return page(`
    ${backButton('problem')}${stepper(3)}
    <h1>Quand et où souhaitez-vous faire réparer votre véhicule ?</h1>
    ${inputField('city', 'Ville ou code postal', 'Ex. 69003 ou Lyon', 'text', '', cityError)}
    <span class="lbl">Vos créneaux préférés</span>
    <div role="radiogroup">
      ${choice('slot', 'En semaine')}
      ${choice('slot', 'Le samedi')}
      ${choice('slot', 'Selon les disponibilités du garage')}
    </div>
    <span class="lbl">Niveau d'urgence</span>
    <div role="radiogroup">
      ${choice('urgency', 'Dès que possible')}
      ${choice('urgency', 'Dans les prochains jours')}
      ${choice('urgency', 'Pas de date précise')}
    </div>`,
    footer('<button class="btn" data-next="recap">Continuer</button>'));
};

// Étape 4 : récapitulatif
screens.recap = function () {
  const sections = [
    { title: 'Véhicule', text: `${state.car} · 2017 · 98 000 km`, back: 'vehicle' },
    { title: 'Problème', text: `${state.type} · ${state.desc}`, back: 'problem' },
    { title: 'Lieu de réparation', text: state.city, back: 'when' },
    { title: 'Disponibilités', text: state.slot, back: 'when' },
    { title: "Niveau d'urgence", text: state.urgency, back: 'when' },
  ];
  let cards = '';
  for (const section of sections) {
    let cardClass = '';
    let content = `<p>${escapeHtml(section.text)}</p>`;
    if (section.text === '') {
      cardClass = 'bad-card';
      content = fieldError("Information manquante : à compléter à l'étape 3.");
    }
    cards += `<div class="card ${cardClass}">
      <div class="row between"><h2>${section.title}</h2>
        <button class="link link-row" data-go="${section.back}">${icon('pencil')}Modifier</button></div>
      ${content}</div>`;
  }

  let message = '';
  let disabled = '';
  if (hasMissingInfo()) {
    message = alertBox("Certaines informations sont manquantes. Revenez à l'étape indiquée pour les compléter.");
    disabled = 'disabled';
  }
  return page(`
    ${backButton('when')}${stepper(4)}
    <h1>Vérifiez votre demande</h1>
    <p class="sub">Vérifiez les informations avant de les envoyer aux mécaniciens.</p>
    ${message}${cards}`,
    footer(`<button class="btn" data-go="garages" ${disabled}>Voir les Garagistes Disponibles</button>`));
};

// Liste des garages
function garageCard(name, recommended) {
  if (recommended) {
    return `<div class="card">
      <div class="row between"><h2>${name}</h2>${badge('rec', 'star', 'Recommandé')}</div>
      <p class="small mb12">Mécanicien : Karim Benali</p>
      <button class="btn" data-act="pick" data-val="${name}">Choisir ${name}</button></div>`;
  }
  return `<div class="card"><h2 class="mb24">${name}</h2>
    <button class="btn sec" data-act="pick" data-val="${name}">Choisir ${name}</button></div>`;
}

screens.garages = function () {
  const title = `${backButton('recap', 'Ma demande')}
    <h1>Les mécaniciens adaptés à votre problème</h1>
    <p class="sub">Comparez les garages selon votre besoin, leur distance et leur tarif.</p>`;

  if (state.garErr) {
    return page(title + alertBox('Impossible de charger les mécaniciens. Réessayez.'),
      footer(`<button class="btn" data-act="retry">${icon('refresh')}Réessayer</button>`));
  }

  const priceFilter = state.filters.includes('Prix');
  let search = '';
  let results = '';
  if (priceFilter) {
    results = `<div class="card empty-card">
      <span class="gray">${icon('search', 40)}</span>
      <p class="bold mt16">Aucun mécanicien ne correspond à votre recherche.</p>
      <p class="muted">Modifiez vos filtres pour voir d'autres résultats.</p></div>`;
  } else {
    search = `<div class="card"><h2>Votre recherche</h2>
      <div class="row mt8 mb8">${icon('wrench')}${state.type}</div>
      <div class="row mb8">${icon('car')}${state.car}</div>
      <div class="row">${icon('pin')}${escapeHtml(state.city || "Ville indiquée à l'étape 3")}</div></div>`;
    results = garageCard('Garage Benali', true) + garageCard('Mécanique Durand', false) + garageCard('Auto Service Nord', false);
  }

  let chips = '';
  for (const filter of ['Distance', 'Note', 'Prix', 'Délai']) {
    chips += chip(filter, state.filters.includes(filter), `data-act="filter" data-val="${filter}"`);
  }
  return page(`${title}${search}
    <span class="lbl first">Filtrer par</span>
    <div class="chips mb16">${chips}</div>
    ${results}`);
};

// Fiche du garage
screens.garageDetail = function () {
  return page(`
    ${backButton('garages', 'Choisir un garage')}
    <h1 class="no-margin">${garageName()}</h1>
    <p class="small mb8">Karim Benali · 2,4 km</p>
    ${badge('ok', 'check', 'Avis vérifiés')}
    <div class="card mt16"><h2>Spécialités</h2><p>Freins · Moteur · Diagnostic</p></div>
    <div class="card"><h2>Avis vérifiés</h2><b>4,6 sur 5 · 38 avis</b>
      <p class="small">Seuls les clients ayant payé une facture peuvent laisser un avis.</p>
      <button class="link link-row">Lire les avis${icon('right')}</button></div>
    <div class="card"><h2>Tarifs indicatifs</h2>
      <div class="line"><span>Plaquettes avant</span><span>dès 180 € TTC</span></div>
      <div class="line"><span>Vidange</span><span>dès 89 € TTC</span></div>
      <p class="small">Le prix exact figure sur le devis.</p></div>
    <div class="card"><h2>Délai de réponse</h2>
      <div class="row">${icon('clock')}Répond en général sous 24 h</div></div>`,
    footer('<button class="btn" data-act="ask">Demander un devis</button>'));
};

// Confirmation d'envoi
screens.sent = function () {
  return page(`
    <span class="green">${icon('ok', 48)}</span>
    <h1 class="mt16">Votre demande a bien été envoyée.</h1>
    <p class="sub mb16">Les mécaniciens adaptés à votre problème peuvent maintenant vous envoyer un devis.</p>
    ${badge('wait', 'clock', 'En attente de devis')}
    <div class="card mt16"><h2>Votre demande</h2>
      <div class="row mt8 mb8">${icon('car')}${state.car} · 2017</div>
      <div class="row">${icon('wrench')}${state.type} · ${requestTitle().toLowerCase()}</div></div>`,
    footer(`<button class="btn" data-go="track">Voir ma demande</button>
      <button class="btn ter" data-go="home">Retour à l'accueil</button>`));
};

validators.vehicle = function () {
  const errors = {};
  if (!state.carSel) {
    errors.car = true;
  }
  return errors;
};

validators.problem = function () {
  const errors = {};
  if (state.type === '') {
    errors.type = 'Choisissez un type de problème pour continuer.';
  }
  if (state.desc.trim().length < 10) {
    errors.desc = 'Décrivez le problème en au moins 10 caractères.';
  }
  return errors;
};

validators.when = function () {
  const errors = {};
  if (state.city.trim() === '') {
    errors.city = 'Indiquez votre ville ou votre code postal pour trouver des mécaniciens près de vous.';
  }
  return errors;
};

actions.togglecar = function () {
  state.carSel = !state.carSel;
  state.errors = {};
  render();
};

actions.addcar = function () {
  state.hasCar = true;
  state.carSel = true;
  state.errors = {};
  render();
};

actions.settype = function (data) {
  if (state.type === data.val) {
    state.type = '';
  } else {
    state.type = data.val;
  }
  delete state.errors.type;
  render();
};

actions.filter = function (data) {
  if (state.filters.includes(data.val)) {
    state.filters = state.filters.filter(function (f) {
      return f !== data.val;
    });
  } else {
    state.filters.push(data.val);
  }
  render();
};

actions.retry = function () {
  state.garErr = false;
  render();
};

actions.pick = function (data) {
  state.garage = data.val;
  goTo('garageDetail');
};

actions.ask = function () {
  state.requestSent = true;
  goTo('sent');
};

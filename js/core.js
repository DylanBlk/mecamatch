// Socle partagé : modifié uniquement par la personne 1.

const icons = {
  home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  list: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M12 11h4M12 16h4M8 11h.01M8 16h.01"/>',
  msg: '<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/>',
  car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  garage: '<path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"/><path d="M6 18h12M6 14h12"/><rect x="6" y="10" width="12" height="12"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  back: '<path d="m15 18-6-6 6-6"/>',
  plus: '<path d="M5 12h14M12 5v14"/>',
  cam: '<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/>',
  pencil: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>',
  pin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  star: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
  alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  refresh: '<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>',
  ok: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  circle: '<circle cx="12" cy="12" r="10"/>',
  eye: '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  cal: '<path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  right: '<path d="m9 18 6-6-6-6"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
  dl: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/>',
  doc: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8"/>',
};

// Données partagées par tous les écrans (chaque page ajoute les siennes)
const state = {
  role: 'client',
  view: 'welcome',
  errors: {},
  car: 'Peugeot 308',
  carInfo: '2017 · 98 000 km',
  hasCar: true,
  type: 'Freins',
  desc: "J'entends un bruit à l'avant lorsque je freine, depuis une semaine.",
  city: '',
  slot: 'En semaine',
  urgency: 'Dans les prochains jours',
  garage: '',
  requestSent: false,
  quote: false,
  accepted: false,
  jobDone: false,
  invoiceSent: false,
};

const screens = {};    // chaque écran : screens.nom = function () { return '<html>'; }
const actions = {};    // chaque action de bouton : actions.nom = function (data) { ... }
const validators = {}; // vérification avant de passer à l'écran suivant
const noTabs = [];     // écrans sans barre d'onglets
const tabFor = {};     // onglet actif quand il porte un autre nom que l'écran

const tabs = {
  client: [
    { view: 'home', label: 'Accueil', icon: 'home' },
    { view: 'requests', label: 'Demandes', icon: 'list' },
    { view: 'msg', label: 'Messages', icon: 'msg' },
    { view: 'cars', label: 'Véhicules', icon: 'car' },
    { view: 'profile', label: 'Profil', icon: 'user' },
  ],
  meca: [
    { view: 'requests', label: 'Demandes', icon: 'list' },
    { view: 'jobs', label: 'Travaux', icon: 'wrench' },
    { view: 'msg', label: 'Messages', icon: 'msg' },
    { view: 'garage', label: 'Mon garage', icon: 'garage' },
    { view: 'profile', label: 'Compte', icon: 'user' },
  ],
};

// ----- Petits morceaux de HTML réutilisables -----

function icon(name, size) {
  const px = size || 24;
  return `<svg viewBox="0 0 24 24" aria-hidden="true" style="width:${px}px;height:${px}px">${icons[name]}</svg>`;
}

function escapeHtml(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function page(body, foot, extraClass) {
  return `<div class="screen ${extraClass || ''}">${body}</div>${foot || ''}`;
}

function footer(html) {
  return `<div class="foot">${html}</div>`;
}

function backButton(target, label) {
  return `<button class="back" data-go="${target}">${icon('back')}${label || 'Retour'}</button>`;
}

function alertBox(text) {
  return `<div class="alert row">${icon('alert')}<span>${text}</span></div>`;
}

function fieldError(text) {
  return `<p class="err row">${icon('alert', 20)}<span>${text}</span></p>`;
}

function badge(kind, iconName, text) {
  return `<span class="badge ${kind}">${icon(iconName, 16)}${text}</span>`;
}

function chip(label, pressed, attributes) {
  let check = '';
  if (pressed) {
    check = icon('check', 20);
  }
  return `<button class="chip" aria-pressed="${pressed}" ${attributes}>${check}${label}</button>`;
}

// Champ de texte lié à state[id] (la valeur est mise à jour à chaque frappe)
function inputField(id, label, placeholder, type, hint, error) {
  let below = '';
  let css = '';
  if (error) {
    below = fieldError(error);
    css = 'bad';
  } else if (hint) {
    below = `<p class="small mt4">${hint}</p>`;
  }
  return `<label class="lbl" for="${id}">${label}</label>
    <input id="${id}" type="${type || 'text'}" data-bind="${id}" placeholder="${placeholder}" value="${escapeHtml(state[id] || '')}" class="${css}">${below}`;
}

function selectField(id, label, options, placeholder) {
  let list = '';
  if (placeholder) {
    list += `<option value="">${placeholder}</option>`;
  }
  for (const option of options) {
    let selected = '';
    if (state[id] === option) {
      selected = 'selected';
    }
    list += `<option ${selected}>${option}</option>`;
  }
  return `<label class="lbl" for="${id}">${label}</label><select id="${id}" data-bind="${id}">${list}</select>`;
}

function garageName() {
  return state.garage || 'Garage Benali';
}

function requestTitle() {
  if (state.type === 'Freins') {
    return 'Bruit au freinage avant';
  }
  return state.type;
}

function quoteStatus() {
  if (state.accepted) {
    return badge('ok', 'check', 'Devis accepté');
  }
  if (state.quote) {
    return badge('warn', 'doc', 'Devis reçu');
  }
  return badge('wait', 'clock', 'En attente de devis');
}

// ----- Affichage et navigation -----

const app = document.getElementById('app');

function render() {
  let screen = screens[state.role + '.' + state.view];
  if (!screen) {
    screen = screens[state.view];
  }
  let html = '<div class="screen"><h1>Écran non inclus dans les maquettes</h1></div>';
  if (screen) {
    html = screen();
  }

  let navigation = '';
  if (!noTabs.includes(state.view)) {
    const current = tabFor[state.view] || state.view;
    navigation = '<nav class="tabs" aria-label="Navigation">';
    for (const tab of tabs[state.role]) {
      let ariaCurrent = '';
      if (tab.view === current) {
        ariaCurrent = 'aria-current="page"';
      }
      navigation += `<button data-go="${tab.view}" ${ariaCurrent}>${icon(tab.icon)}${tab.label}</button>`;
    }
    navigation += '</nav>';
  }

  const focusedId = document.activeElement.id;
  app.innerHTML = html + navigation;
  if (focusedId) {
    const field = document.getElementById(focusedId);
    if (field) {
      field.focus();
    }
  }
  const screenElement = app.querySelector('.screen');
  if (screenElement) {
    screenElement.scrollTop = 0;
  }
}

function goTo(view) {
  state.view = view;
  state.errors = {};
  render();
}

function setRole(role) {
  state.role = role;
  const buttons = document.querySelectorAll('.roles button');
  for (const button of buttons) {
    button.classList.toggle('on', button.dataset.role === role);
  }
  if (role === 'meca') {
    goTo('requests');
  } else {
    goTo('home');
  }
}

document.addEventListener('click', function (event) {
  const roleButton = event.target.closest('[data-role]');
  if (roleButton) {
    setRole(roleButton.dataset.role);
    return;
  }

  const element = event.target.closest('[data-go], [data-next], [data-set], [data-act]');
  if (!element || !app.contains(element)) {
    return;
  }
  const data = element.dataset;

  if (data.go) {
    goTo(data.go);
  } else if (data.next) {
    const check = validators[state.view];
    let errors = {};
    if (check) {
      errors = check();
    }
    state.errors = errors;
    if (Object.keys(errors).length > 0) {
      render();
    } else {
      goTo(data.next);
    }
  } else if (data.set) {
    state[data.set] = data.val;
    render();
  } else if (actions[data.act]) {
    actions[data.act](data);
  }
});

document.addEventListener('input', function (event) {
  const key = event.target.dataset.bind;
  if (!key) {
    return;
  }
  state[key] = event.target.value;
  if (event.target.tagName === 'SELECT') {
    render();
  }
});

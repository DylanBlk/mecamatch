// Personne 1 : profil et notifications

state.notif = { quote: true, progress: true, msg: true, invoice: false };

function switchRow(key, title, text) {
  let label = 'Désactivé';
  if (state.notif[key]) {
    label = 'Activé';
  }
  return `<div class="row between mb12">
    <div><b>${title}</b><div class="small">${text}</div></div>
    <button class="switch" role="switch" aria-checked="${state.notif[key]}" aria-label="${title}" data-act="notif" data-val="${key}"><i></i><span>${label}</span></button>
  </div>`;
}

screens.profile = function () {
  let name = state.name;
  if (!name) {
    name = state.role === 'meca' ? 'Karim Benali' : 'Thomas Lefèvre';
  }
  const email = state.email || 'thomas.lefevre@exemple.fr';
  return page(`
    <h1>Compte</h1>
    <div class="card">
      <div class="row between"><h2>Informations personnelles</h2>
        <button class="link link-row">${icon('pencil')}Modifier</button></div>
      <span class="small">Nom</span><p>${escapeHtml(name)}</p>
      <span class="small">Adresse e-mail</span><p>${escapeHtml(email)}</p>
    </div>
    <div class="card">
      <h2 class="mb16">Notifications</h2>
      ${switchRow('quote', 'Devis reçu', "Dès qu'un mécanicien répond")}
      ${switchRow('progress', 'Avancement', 'À chaque changement de statut')}
      ${switchRow('msg', 'Messages', 'Nouveau message du garage')}
      ${switchRow('invoice', 'Facture disponible', 'Quand la facture est envoyée')}
    </div>
    <button class="link link-row center-row red" data-act="logout">${icon('logout')}Se déconnecter</button>`);
};

actions.notif = function (data) {
  state.notif[data.val] = !state.notif[data.val];
  render();
};

actions.logout = function () {
  goTo('welcome');
};

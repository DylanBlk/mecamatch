// Personne 3 : messagerie

state.chat = [
  { fromGarage: true, text: "C'est terminé. Les plaquettes avant sont neuves." },
  { fromGarage: false, text: 'Merci, je passe à 17 h.' },
];
state.draft = '';
state.chatErr = false;

tabFor.chat = 'msg';

screens.msg = function () {
  if (!state.requestSent) {
    return page(`
      <h1>Messages</h1>
      <span class="blue">${icon('msg', 40)}</span>
      <h2 class="mt16 mb8">Aucun message pour l'instant</h2>
      <p class="muted mb16">Vos échanges avec les mécaniciens apparaîtront ici.</p>
      <button class="btn" data-go="vehicle">Décrire mon problème</button>`);
  }
  return page(`
    <h1>Messages</h1>
    <button class="card card-btn" data-go="chat">
      <div class="row between"><h2>${garageName()}</h2><span class="badge warn">2 nouveaux</span></div>
      <p class="small">Freins avant · ${state.car}</p>
      <b class="small">C'est terminé, vous pouvez venir…</b>
      <div class="small">14 h 32</div>
    </button>`);
};

screens.chat = function () {
  let bubbles = '';
  for (let i = 0; i < state.chat.length; i++) {
    const message = state.chat[i];
    const isLast = i === state.chat.length - 1;
    let css = 'bubble';
    let author = 'Vous · 14 h 40';
    let error = '';
    if (message.fromGarage) {
      author = 'Karim Benali · 14 h 32';
    } else {
      css += ' me';
    }
    if (state.chatErr && isLast && !message.fromGarage) {
      css += ' bad';
      error = `<p class="err row">${icon('alert', 18)}Message non envoyé. Vérifiez votre connexion.</p>
        <button class="link" data-act="retrychat">Réessayer</button>`;
    }
    bubbles += `<div class="${css}"><span class="small">${author}</span><p>${escapeHtml(message.text)}</p>${error}</div>`;
  }

  const body = `
    ${backButton('msg', 'Messages')}
    <h2>Karim Benali</h2>
    <p class="small mb12">${garageName()}</p>
    <div class="card warm"><b>Freins avant · ${state.car}</b>
      <div class="mt4 mb4">${badge('wait', 'wrench', 'En cours')}</div>
      <button class="link" data-go="track">Voir la demande</button></div>
    ${bubbles}`;
  const foot = footer(`
    <label class="lbl first" for="draft">Votre message</label>
    <input id="draft" data-bind="draft" placeholder="Écrivez ici" value="${escapeHtml(state.draft)}">
    <div class="row between mt8">
      <button class="link link-row">${icon('cam')}Ajouter une photo</button>
      <button class="btn small-btn" data-act="send">${icon('send')}Envoyer</button>
    </div>`);
  return page(body, foot);
};

actions.send = function () {
  const text = state.draft.trim();
  if (text === '') {
    return;
  }
  state.chat.push({ fromGarage: false, text: text });
  state.draft = '';
  state.chatErr = false;
  render();
};

actions.retrychat = function () {
  state.chatErr = false;
  render();
};

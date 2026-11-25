// Personne 1 : accueil, connexion, inscriptions

state.email = '';
state.pass = '';
state.showPass = false;
state.loginErr = false;
state.name = '';
state.brand = '';
state.model = '';
state.carYear = '';
state.terms = false;
state.garName = '';
state.garAddr = '';
state.siret = '';
state.specs = ['Freins', 'Moteur'];
state.days = 'Du lundi au vendredi';
state.hours = '8 h 30 – 18 h 30';

noTabs.push('welcome', 'login', 'signup', 'signupPro');

screens.welcome = function () {
  const points = [
    'Des mécaniciens recommandés selon votre problème',
    'Un devis clair avant toute réparation',
    'Toutes vos factures au même endroit',
  ];
  let list = '';
  for (const point of points) {
    list += `<li class="row top green">${icon('ok')}<span class="dark">${point}</span></li>`;
  }
  const body = `
    <div class="center mt24">
      <span class="logo">${icon('wrench', 48)}</span>
      <h1 class="brand-title">MecaMatch</h1>
      <h2 class="tagline">Votre auto/moto a trouvé son match !</h2>
    </div>
    <ul class="points">${list}</ul>`;
  const buttons = `
    <button class="btn" data-go="signup">Je cherche un mécanicien</button>
    <button class="btn sec mt12" data-go="signupPro">Je suis un professionnel</button>
    <button class="link underline center-link" data-go="login">J'ai déjà un compte : me connecter</button>`;
  return page(body, footer(buttons));
};

screens.login = function () {
  let alert = '';
  let passError = '';
  let passClass = '';
  if (state.loginErr) {
    alert = `<div class="alert"><b>Connexion impossible</b>
      <p class="small red">L'adresse e-mail ou le mot de passe est incorrect. Vérifiez-les ou réinitialisez votre mot de passe.</p></div>`;
    passError = fieldError('Mot de passe incorrect. Réessayez ou réinitialisez-le.');
    passClass = 'bad';
  }
  let passType = 'password';
  let passButton = 'Afficher';
  if (state.showPass) {
    passType = 'text';
    passButton = 'Masquer';
  }
  const body = `
    ${backButton('welcome')}
    <h1 class="blue">Connexion</h1>
    <p class="sub">Retrouvez vos demandes, devis et factures.</p>
    ${alert}
    ${inputField('email', 'Adresse e-mail', 'nom@exemple.fr', 'email')}
    <label class="lbl" for="pass">Mot de passe</label>
    <div class="pass-box">
      <input id="pass" type="${passType}" data-bind="pass" placeholder="Votre mot de passe" value="${escapeHtml(state.pass)}" class="${passClass}">
      <button class="link pass-toggle" data-act="pw">${icon('eye')}${passButton}</button>
    </div>
    ${passError}
    <button class="link underline mt16">Mot de passe oublié ?</button>`;
  const buttons = `
    <button class="btn" data-act="login">Se connecter</button>
    <button class="link underline center-link" data-go="signup">Pas encore de compte ? Créer un compte</button>`;
  return page(body, footer(buttons));
};

screens.signup = function () {
  let checked = '';
  if (state.terms) {
    checked = 'checked';
  }
  let termsError = '';
  if (state.errors.terms) {
    termsError = fieldError(state.errors.terms);
  }
  const body = `
    ${backButton('welcome')}
    <h1 class="blue">Créer mon compte</h1>
    <p class="sub">Quelques informations suffisent pour décrire votre premier problème.</p>
    ${inputField('name', 'Prénom et nom', 'Ex. Thomas Lefèvre')}
    ${inputField('email', 'Adresse e-mail', 'nom@exemple.fr', 'email')}
    ${inputField('pass', 'Mot de passe', 'Choisissez un mot de passe', 'password', '8 caractères minimum.')}
    <h2 class="mt24">Votre voiture</h2>
    <p class="small">Vous pourrez en ajouter d'autres plus tard.</p>
    ${selectField('brand', 'Marque', ['Peugeot', 'Renault', 'Citroën', 'Volkswagen'], 'Choisir une marque')}
    ${selectField('model', 'Modèle', ['308', 'Clio', 'C3', 'Golf'], 'Choisir un modèle')}
    ${selectField('carYear', 'Année', ['2017', '2018', '2019', '2020'], 'Choisir une année')}
    <label class="row mt16 checkbox">
      <input type="checkbox" ${checked} data-act="terms">J'accepte les conditions d'utilisation
    </label>
    ${termsError}`;
  const buttons = `
    <button class="btn" data-act="signup">Créer mon compte</button>
    <button class="link underline center-link" data-go="login">Déjà un compte ? Me connecter</button>`;
  return page(body, footer(buttons));
};

screens.signupPro = function () {
  const specialities = ['Freins', 'Moteur', 'Pneus', 'Électricité', 'Climatisation', 'Diagnostic'];
  let chips = '';
  for (const speciality of specialities) {
    chips += chip(speciality, state.specs.includes(speciality), `data-act="spec" data-val="${speciality}"`);
  }
  const body = `
    ${backButton('welcome')}
    <h1 class="blue">Créer mon compte professionnel</h1>
    <p class="sub">Présentez votre garage pour recevoir des demandes adaptées à vos compétences.</p>
    ${inputField('garName', 'Nom du garage', 'Ex. Garage Benali')}
    ${inputField('garAddr', 'Adresse du garage', 'Numéro, rue, ville')}
    ${inputField('siret', 'Numéro SIRET', '14 chiffres', 'text', 'Sans espace. Il permet de vérifier votre entreprise.', state.errors.siret)}
    <span class="lbl">Spécialités</span>
    <p class="small mb8">Choisissez-en au moins une.</p>
    <div class="chips">${chips}</div>
    ${selectField('days', "Jours d'ouverture", ['Du lundi au vendredi', 'Du lundi au samedi', '7 jours sur 7'])}
    ${selectField('hours', 'Horaires', ['8 h 30 – 18 h 30', '9 h – 19 h'])}`;
  const buttons = `
    <button class="btn" data-act="signupPro">Créer mon compte professionnel</button>
    <button class="link underline center-link" data-go="login">Déjà un compte ? Me connecter</button>`;
  return page(body, footer(buttons));
};

actions.pw = function () {
  state.showPass = !state.showPass;
  render();
};

actions.login = function () {
  if (state.pass.length < 8) {
    state.loginErr = true;
    render();
  } else {
    state.loginErr = false;
    goTo('home');
  }
};

actions.terms = function () {
  state.terms = !state.terms;
  state.errors = {};
  render();
};

actions.signup = function () {
  if (!state.terms) {
    state.errors = { terms: 'Acceptez les conditions pour continuer.' };
    render();
  } else {
    goTo('home');
  }
};

actions.spec = function (data) {
  if (state.specs.includes(data.val)) {
    state.specs = state.specs.filter(function (s) {
      return s !== data.val;
    });
  } else {
    state.specs.push(data.val);
  }
  render();
};

actions.signupPro = function () {
  const siret = state.siret.replace(/ /g, '');
  if (siret.length !== 14 || isNaN(siret)) {
    state.errors = { siret: 'Le numéro SIRET doit contenir 14 chiffres.' };
    render();
  } else {
    setRole('meca');
  }
};

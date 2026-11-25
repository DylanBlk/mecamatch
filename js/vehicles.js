// Personne 3 : véhicules et historique par année

state.year = '2026';

tabFor.carHist = 'cars';

screens.cars = function () {
  if (!state.hasCar) {
    return page(`
      <h1>Mes véhicules</h1>
      <span class="blue">${icon('car', 40)}</span>
      <h2 class="mt16 mb8">Aucun véhicule enregistré</h2>
      <p class="muted mb16">Ajoutez votre véhicule pour retrouver toutes ses factures au même endroit.</p>
      <button class="btn" data-act="addcar">${icon('plus')}Ajouter un véhicule</button>`);
  }
  let repair = '';
  if (state.requestSent) {
    repair = `<div class="mt8 mb8">${badge('wait', 'wrench', '1 réparation en cours')}</div>`;
  }
  return page(`
    <h1>Mes véhicules</h1>
    <div class="card">
      <h2>${state.car}</h2>
      <p class="small">${state.carInfo}</p>
      ${repair}
      <button class="link link-row" data-go="carHist">Voir l'historique${icon('right')}</button>
    </div>
    <button class="btn" data-act="addcar">${icon('plus')}Ajouter un véhicule</button>`);
};

screens.carHist = function () {
  let target = 'invoiceWait';
  if (state.invoiceSent) {
    target = 'invoiceView';
  }
  let content = `
    <div class="mt24 blue">${icon('cal', 40)}</div>
    <h2 class="mt12 mb8">Aucune intervention en ${state.year}</h2>
    <p>Choisissez une autre année dans la liste.</p>`;
  if (state.year === '2026') {
    content = `
      <h2 class="mt24 mb12">2026</h2>
      <div class="card">
        <h2>Plaquettes de frein avant</h2>
        <p class="small mt4 mb4">Plaquettes : pièces qui frottent sur le disque pour freiner.</p>
        <p class="small">14 oct. 2026 · Garage Benali</p>
        <b>214,00 € TTC</b>
        <div class="mt8 mb8">${badge('ok', 'check', 'Facturée')}</div>
        <button class="link link-row" data-go="${target}">Voir la facture${icon('right')}</button>
      </div>`;
  }
  return page(`
    ${backButton('cars', 'Mes véhicules')}
    <h1 class="no-margin">${state.car}</h1>
    <p class="small mb16">${state.carInfo}</p>
    ${selectField('year', 'Année', ['2026', '2025'])}
    ${content}`);
};

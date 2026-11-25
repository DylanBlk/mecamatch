# MécaMatch — Front-end (TP fil rouge B3-IN)

Application mobile web qui met en relation des clients et des mécaniciens : le client décrit son problème, reçoit des devis, suit la réparation et retrouve ses factures ; le mécanicien répond par un devis et facture.

Maquettes de référence : dossier `maquettes/` (export Figma).

## 1. Stack technique

| Choix | Justification |
|---|---|
| HTML + CSS + JavaScript (sans framework, sans build) | Le projet est un prototype de ~30 écrans. Aucun outil à installer, démarrage immédiat sur les 4 machines, code facile à expliquer à l'oral. |
| Un fichier JS par groupe d'écrans | 4 personnes travaillent en parallèle sans toucher aux mêmes fichiers → pas de conflits Git. |
| CSS avec variables (`css/base.css`) | Les couleurs, la typographie (Inter) et les composants des maquettes sont définis une seule fois. |
| Icônes SVG (style Lucide, trait 2 px) intégrées dans `core.js` | Pas de dépendance externe, couleur héritée du texte. |
| Accessibilité | Zones cliquables ≥ 44 px, `aria-pressed`/`aria-checked` sur puces et choix, `aria-current` sur l'onglet actif, focus visible, erreurs écrites (jamais la couleur seule). |

Évolution possible : migrer vers Vue.js/React en gardant le découpage « un module par groupe d'écrans ».

## 2. Fonctionnalités et API back-end

| Fonctionnalité | Écrans | Appel API prévu | Données échangées |
|---|---|---|---|
| Inscription / connexion | `welcome`, `login`, `signup`, `signupPro` | `POST /auth/register`, `POST /auth/login`, `POST /garages` | e-mail, mot de passe, véhicule initial ; pour un pro : nom, adresse, SIRET, spécialités, horaires → jeton |
| Profil et notifications | `profile` | `GET/PATCH /me`, `PATCH /me/notifications` | nom, e-mail, 4 préférences de notification |
| Créer une demande | `vehicle` → `recap` | `GET /me/vehicles`, `POST /requests` | véhicule, type de problème, description, ville, créneau, urgence |
| Trouver un garage | `garages`, `garageDetail` | `GET /garages?city=&type=`, `GET /garages/:id` | liste (nom, note, distance, tarifs), fiche détaillée |
| Suivre une demande, devis | `requests`, `track`, `quote`, `accepted` | `GET /me/requests`, `GET /requests/:id`, `POST /quotes/:id/accept\|refuse` | statut, étapes, devis (main-d'œuvre, pièces, total) |
| Messagerie | `msg`, `chat` | `GET /conversations`, `GET/POST /conversations/:id/messages` | messages texte (et photo) |
| Véhicules et historique | `cars`, `carHist` | `GET/POST /me/vehicles`, `GET /vehicles/:id/history?year=` | véhicule, interventions par année |
| Factures et avis | `invoiceWait`, `invoiceView`, `review` | `GET /invoices/:id`, `GET /invoices/:id/pdf`, `POST /reviews` | facture, notes (globale, prix, qualité, délai), commentaire |
| Espace mécanicien | `meca.requests`, `detail`, `mkquote`, `sentq`, `jobs`, `invoice` | `GET /garage/requests`, `POST /quotes`, `PATCH /jobs/:id/done`, `POST /invoices` | demande, devis, statut d'intervention, facture |

Pour l'instant les données sont simulées dans l'objet `state` (`js/core.js`). Pour brancher l'API : remplacer le corps des actions (`actions.*`) par un `fetch(...)`, afficher un état de chargement, et utiliser les états d'erreur déjà prévus dans les écrans (`garErr`, `trackErr`, `chatErr`, `loginErr`).

## 3. Architecture

```
index.html            Page unique, charge les CSS puis les scripts (ne pas modifier)
css/
  base.css            Variables, composants communs (boutons, champs, cartes, badges, barre d'onglets)
  auth.css            Styles compte/profil           (personne 1)
  request.css         Styles demande de réparation   (personne 2)
  follow.css          Styles suivi/messages/véhicules (personne 3)
  meca.css            Styles mécanicien/factures     (personne 4)
js/
  core.js             Socle : icônes, objet `state`, helpers (page, badge, champs), affichage `render()` et `goTo()`
  main.js             Démarrage
  pages/              Un module par groupe d'écrans (voir §4)
maquettes/            PNG exportés de Figma
```

Chaque module de `js/pages/` fait trois choses, toujours de la même façon :
1. `state.monChamp = ...;` — ajoute les données dont il a besoin ;
2. `screens.monEcran = function () { return page(...); };` — déclare un écran (HTML dans un texte entre accents graves) ;
3. `actions.monAction = function (data) { ... };` — déclare l'action d'un bouton `data-act="monAction"`.

Navigation : `data-go="ecran"` change d'écran ; `data-next="ecran"` vérifie d'abord les champs (fonction `validators.ecran`). Un écran propre à un rôle s'appelle `screens['meca.requests']`. Écrans sans barre d'onglets : `noTabs.push('ecran')`.

Pourquoi cette organisation : un dossier = une personne, donc des merges sans conflit ; le socle partagé est petit et stable.

## 4. Répartition (qui développe quoi)

| Personne | Pages / fichiers | Rôle |
|---|---|---|
| **1** | `welcome`, `login`, `signup`, `signupPro`, `profile` → `js/pages/auth.js`, `profile.js`, `css/auth.css` | Comptes, formulaires, validation (SIRET, mot de passe). **Responsable du socle** (`core.js`, `base.css`, `index.html`) : toute modification du socle passe par elle. |
| **2** | `home`, `vehicle`, `problem`, `when`, `recap`, `garages`, `garageDetail`, `sent` → `home.js`, `request.js`, `css/request.css` | Accueil et parcours de demande en 4 étapes, filtres, états vides/erreur. |
| **3** | `requests`, `track`, `quote`, `accepted`, `msg`, `chat`, `cars`, `carHist` → `follow.js`, `messages.js`, `vehicles.js`, `css/follow.css` | Suivi, devis côté client, messagerie, véhicules et historique. |
| **4** | `meca.requests`, `detail`, `mkquote`, `sentq`, `jobs`, `invoice`, `invoiceWait`, `invoiceView`, `review` → `meca.js`, `invoices.js`, `css/meca.css` | Espace mécanicien et factures/avis. |

Règle : on ne modifie que ses propres fichiers. Besoin d'un changement dans le socle ou chez un autre → on le demande (issue GitHub ou message).

## 5. Lancer le projet

```bash
python3 -m http.server 8765
```

Ouvrir http://localhost:8765. Les boutons **Client / Mécanicien** en haut de la page changent de profil.

## 6. Marche à suivre Git (4 personnes)

### Personne 1 — création du dépôt (une seule fois)

1. Créer un dépôt vide `mecamatch` sur GitHub (sans README), puis dans Settings → Collaborators, inviter les 3 autres.
2. Dans le dossier du projet :

```bash
git init -b main
git add .
git commit -m "chore: socle, maquettes et squelette des pages"
git remote add origin https://github.com/<compte>/mecamatch.git
git push -u origin main
```

3. Settings → Branches : protéger `main` (pull request obligatoire).

### Personnes 2, 3 et 4 — récupérer le projet

```bash
git clone https://github.com/<compte>/mecamatch.git
cd mecamatch
```

### Toutes les personnes — travailler

Chacune crée sa branche (une seule fois) :

```bash
git checkout -b feature/auth        # personne 1
git checkout -b feature/request     # personne 2
git checkout -b feature/follow      # personne 3
git checkout -b feature/meca        # personne 4
```

Cycle de travail, à répéter souvent (commits petits et lisibles) :

```bash
git add js/pages/<mon-fichier>.js css/<mon-fichier>.css
git commit -m "feat(request): validation de l'étape 3"
git push -u origin feature/<ma-branche>
```

Convention de message : `feat(<zone>): ...`, `fix(<zone>): ...`, `style(<zone>): ...`.

Rester à jour avec `main` avant d'ouvrir une pull request :

```bash
git fetch origin
git merge origin/main
```

### Fusionner

1. Sur GitHub : **Compare & pull request** de `feature/<ma-branche>` vers `main`.
2. Une autre personne relit, teste en lançant le projet, puis clique **Merge**.
3. Après chaque merge, tout le monde fait :

```bash
git checkout main
git pull
git checkout feature/<ma-branche>
git merge main
```

### Si un conflit apparaît

Il ne devrait arriver que sur `core.js`, `base.css` ou `index.html` (réservés à la personne 1). Ouvrir le fichier, garder les deux versions utiles à la main, puis `git add <fichier>` et `git commit`.

## 7. Récapitulatif des contributions (à compléter)

| Personne | Nom | Pages développées | Commits / PR | Choix techniques à expliquer |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |

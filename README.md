# MécaMatch (front-end)

Application mobile web qui met en relation des clients et des mécaniciens. Le client décrit son problème, reçoit un devis, suit la réparation et retrouve ses factures. Le mécanicien répond par un devis, puis facture.

Projet fil rouge B3-IN, réalisé à 4. Les maquettes (export Figma) sont dans `maquettes/`.

## Équipe et répartition

| Personne | Membre | Ce qu'il/elle a fait | Fichiers |
|---|---|---|---|
| 1 | **Dylan** | Socle du projet, comptes (accueil, connexion, inscription client et pro), profil et notifications | `js/core.js`, `js/main.js`, `index.html`, `css/base.css`, `js/pages/auth.js`, `js/pages/profile.js`, `css/auth.css` |
| 2 | **Yanis** | Accueil client et demande de réparation en 4 étapes, liste et fiche des garages, confirmation | `js/pages/home.js`, `js/pages/request.js`, `css/request.css` |
| 3 | **Kamilya** | Suivi des demandes, devis reçu et accepté, messagerie, véhicules et historique | `js/pages/follow.js`, `js/pages/messages.js`, `js/pages/vehicles.js`, `css/follow.css` |
| 4 | **Omar** | Espace mécanicien (demandes, devis, interventions, facture), facture client et avis | `js/pages/meca.js`, `js/pages/invoices.js`, `css/meca.css` |

Chacun ne modifie que ses fichiers, ce qui évite les conflits Git. Dylan est responsable du socle.

## Technologies

- **HTML, CSS, JavaScript** sans framework : projet de petite taille, rien à installer, code simple à expliquer.
- **Un fichier JavaScript par groupe d'écrans** : chaque membre travaille de son côté.
- **Accessibilité** : boutons assez grands, états annoncés (`aria-pressed`, `aria-current`), erreurs écrites en toutes lettres.

## Organisation des fichiers

```
index.html       page unique
css/             base.css (styles communs) + un fichier CSS par personne
js/core.js       socle : données, affichage, navigation
js/main.js       démarrage
js/pages/        un fichier par groupe d'écrans
maquettes/       images Figma
```

Chaque fichier de `js/pages/` suit le même modèle :

1. `state.champ = ...;` ajoute des données ;
2. `screens.nomEcran = function () { ... };` déclare un écran ;
3. `actions.nomAction = function () { ... };` déclare l'action d'un bouton.

## API prévue

Les données sont simulées pour l'instant (objet `state`). Appels à brancher au back-end :

| Fonctionnalité | Appels |
|---|---|
| Comptes et profil | `POST /auth/register`, `POST /auth/login`, `GET/PATCH /me` |
| Demande et garages | `POST /requests`, `GET /garages`, `GET /garages/:id` |
| Suivi et devis | `GET /requests/:id`, `POST /quotes/:id/accept`, `POST /quotes/:id/refuse` |
| Messagerie | `GET/POST /conversations/:id/messages` |
| Véhicules et factures | `GET /vehicles/:id/history`, `GET /invoices/:id`, `POST /reviews` |
| Mécanicien | `GET /garage/requests`, `POST /quotes`, `PATCH /jobs/:id/done`, `POST /invoices` |

## Lancer le projet

```bash
python3 -m http.server 8765
```

Puis ouvrir http://localhost:8765. Les boutons **Client / Mécanicien** en haut de la page changent de profil.

## Travailler avec Git

1. Récupérer le projet : `git clone https://github.com/DylanBlk/mecamatch.git`
2. Créer sa branche : `git checkout -b feature/<nom>` (`auth`, `request`, `follow` ou `meca`)
3. Enregistrer : `git add <fichiers>` puis `git commit -m "feat: description"`
4. Envoyer : `git push -u origin feature/<nom>`
5. Sur GitHub, ouvrir une pull request vers `main`. Une autre personne relit puis fusionne.

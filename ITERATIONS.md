# Plan d'itérations — Imagine for Margo

**Plan validé le 2026-11-18** par le développeur.

- **Source du plan** : proposé par l'agent (aucun plan d'itérations ni priorisation fournis par la squad dans la passation — `cadrage/2-idees-priorisees.md` et `cadrage/6-plan-de-livraison.md` sont vides).
- **Temps restant annoncé** : 60 minutes (répondu le 2026-11-18).
- **Durée d'un tour de test PM Lab** : 10 minutes (valeur par défaut, le développeur ne savait pas).
- **Capacité estimée** : une itération coûte au moins 10 min de codage + ~5 min de publication + 10 min de tour de test ≈ 25 min. Avec 60 minutes, la capacité tient environ **2 itérations complètes**, avec peu de marge pour une troisième.
- ✂️ **Hors périmètre de ce build** (reporté en « À venir », à reprioriser si le temps restant augmente) : le blog consolidé, le compte facultatif + espace personnel, et le bandeau discret SEO. Ce sont les points 2, 3 et 4 du plan de la squad (`PASSATION.md`) — je ne garde que le point 1 (sélection de profil + parcours guidé), qui est aussi la première hypothèse à vérifier (« 0 abandon étape 1 »).

---

## Itération 1 : le squelette publié, avec l'écran de sélection de profil

- **Temps restant annoncé au début du codage** : 50 minutes (2026-11-18).
- **Dans le périmètre** :
  - squelette conforme au contrat de déployabilité (`.env.example`, `DEPLOIEMENT.md`) ;
  - écran « Qui êtes-vous ? » : liste de personas/rôles d'exemple à incarner (pas de connexion réelle) ;
  - écran d'accueil avec la fenêtre de sélection de profil (particulier/testateur, entreprise, organisateur, famille, soignant-chercheur), données en dur ;
  - choisir un profil mène vers un espace de parcours vide (placeholder), pour prouver le routage.
- **Hors périmètre** : contenu réel du parcours guidé (itération 2), blog, compte, bandeau SEO.
- **Critères d'acceptation** (3 au plus) :
  - Étant donné l'arrivée sur l'accueil, quand la page charge, alors la fenêtre « Qui êtes-vous ? » propose une liste de rôles d'exemple.
  - Étant donné un rôle choisi, quand on valide, alors la fenêtre de sélection de profil (5 profils) s'affiche.
  - Étant donné un profil choisi, quand on valide, alors on arrive sur un écran de parcours (même vide) propre à ce profil.
- **Hypothèse de l'équipe couverte** : aucune — itération de squelette, aucune mesure encore possible.
- **Codage estimé** : 10 minutes.
- **Fichiers prévus** : `frontend/` (écran accueil, sélection profil, routage), `.env.example`, `DEPLOIEMENT.md`.
- **Tests unitaires prévus** : 1 à 3, sur la logique de sélection/validation de profil (pas sur le balisage).
- **Étapes ajoutées à la démo** : ouvrir l'accueil → choisir un rôle → choisir un profil → arriver sur l'espace du profil.
- **Bilan** :
  - Durée de codage réelle : 2 minutes (pas de dépassement).
  - Critères satisfaits : les 3 — la fenêtre « Qui êtes-vous ? » propose les 5 personas d'exemple (une par profil, nom + rôle), le choix d'une personne navigue directement vers un écran de parcours placeholder nommé à son nom. Écran de sélection de profil non dupliqué : un seul écran « Qui êtes-vous ? » fusionne le nom de la personne et son profil, pour coller au prototype (une seule modale du même nom) sans ajouter un second écran hors budget.
  - Reporté : rien pour cette itération ; le contenu réel du parcours (au-delà du placeholder) est prévu à l'itération 2, comme planifié.
  - Ce que le harnais a bloqué ou refusé : rien. `./scripts/verifier-deployabilite.sh` : aucune borne, aucune alarme (hook eslint post-édition a bloqué une fois un apostrophe non échappé dans page.tsx, corrigé immédiatement).
  - Incident relevé et corrigé pendant la vérification (hors codage, pendant le déploiement) : la CSP du `nginx.conf` repris du serveur ne déclarait pas de `script-src 'unsafe-inline'` ; Next.js embarque un script inline de bootstrap pour l'hydratation de son export statique, bloqué par la CSP par défaut — la page s'affichait mais aucun clic ne répondait (symptôme silencieux, sans erreur serveur, comme prévenu par `/srv/team18/CLAUDE.md`). Trouvé via Playwright (`page.on("pageerror")`) : React error #412 (hydratation). Corrigé en ajoutant `'unsafe-inline'` à `script-src`, image reconstruite et redéployée, démo rejouée avec succès.
  - **Modifications** :
    - `frontend/src/lib/personas.ts` (+ test) : les 5 personas d'exemple (nom, rôle, profil), `getPersonaById`, `shouldShowPersonaModal` — sert les 3 critères d'acceptation.
    - `frontend/src/app/page.tsx`, `page.module.css`, `layout.tsx` : écran « Qui êtes-vous ? » et espace de parcours placeholder — sert les 3 critères d'acceptation.
    - `frontend/nginx.conf` : en-têtes de sécurité + CSP (corrigée pour l'hydratation Next.js) — condition du déploiement, pas un critère d'acceptation en soi.
    - `api/Dockerfile`, `frontend/Dockerfile` : images de base qualifiées `docker.io/library/…` (recette du serveur, étape 4).
    - `podman-compose.yml`, `.env.example`, `DEPLOIEMENT.md` : contrat de déployabilité (DoD point 3).
    - `e2e/demo.spec.ts` : étapes de la démo pour cette itération (hors DoD).

## Itération 2 : le parcours guidé jusqu'à l'action finale, avec événements tracés

- **Temps restant annoncé au début du codage** : 15 minutes (2026-11-18). ⚠️ Capacité insuffisante pour un tour de test PM Lab complet avant la fin du build (25 min nécessaires en théorie) ; le développeur a choisi explicitement de coder le plan complet quand même, risque assumé.
- **Dans le périmètre** :
  - parcours guidé étape par étape pour le profil **organisateur** (celui du scénario de référence), avec barre de progression ;
  - chaque étape franchie déclenche un encadré « événement de conversion tracé » (pas d'implémentation analytique réelle, juste visible) ;
  - arrivée à l'action finale (contact / formulaire), avec son propre événement tracé.
- **Hors périmètre** : parcours des autres profils (redirigent vers celui de l'organisateur pour l'instant, comme la squad l'a elle-même mis hors périmètre pour testateur/organisateur dans le prototype), blog, compte.
- **Critères d'acceptation** (3 au plus) :
  - Étant donné le profil organisateur choisi, quand on avance dans le parcours, alors la barre de progression reflète l'étape courante.
  - Étant donné une étape franchie, quand elle est validée, alors un événement de conversion tracé est visible à l'écran.
  - Étant donné la dernière étape atteinte, quand elle est validée, alors l'écran d'action finale s'affiche avec son événement tracé.
- **Hypothèse de l'équipe couverte** : « un sélecteur de profil dès l'accueil permettrait à chaque public prioritaire de trouver son parcours sans se perdre » — mesure : taux d'abandon par étape (cible 0 abandon étape 1).
- **Codage estimé** : 10 minutes.
- **Fichiers prévus** : `frontend/` (écran(s) de parcours, barre de progression, composant événement tracé), éventuellement `api/` si l'état du parcours doit être lu/écrit côté serveur.
- **Tests unitaires prévus** : 1 à 3, sur la logique de progression (calcul de l'étape courante, déclenchement d'un événement).
- **Étapes ajoutées à la démo** : poursuivre le parcours organisateur jusqu'à l'action finale, en vérifiant l'affichage des événements tracés à chaque étape.
- **Bilan** :
  - Durée de codage réelle : 1 minute (pas de dépassement).
  - Critères satisfaits : les 3 — la barre de progression reflète le nombre d'étapes validées (0 %, 67 %, 100 %), chaque étape validée affiche un encadré « 📊 Événement tracé » distinct, et la dernière étape amène l'écran d'action finale avec son propre événement tracé.
  - Reporté : rien pour cette itération. Écart assumé par rapport au plan initial : les profils autres qu'organisateur ne redirigent **pas** vers son parcours (contrairement à ce que prévoyait la section « Hors périmètre ») — ils gardent l'écran placeholder de l'itération 1, pour rester dans le budget très réduit de cette itération (15 minutes annoncées). À reprendre si une itération future traite les autres profils.
  - ⚠️ Point de vigilance signalé avant codage : le temps annoncé (15 min) ne couvrait pas un tour de test PM Lab complet (~25 min nécessaires). Le développeur a choisi de coder le plan complet quand même ; la version a été signalée sans attendre de retour de tour de test avant la fin du build annoncée.
  - Ce que le harnais a bloqué ou refusé : rien. `./scripts/verifier-deployabilite.sh` : aucune borne, aucune alarme. `npm test` : 13 tests verts (2 api + 11 frontend, dont les 3 nouveaux sur `parcours.ts`).
  - **Modifications** :
    - `frontend/src/lib/parcours.ts` (+ test) : étapes du parcours organisateur, calcul de progression (`progressionPourcent`), détection de dernière étape (`estDerniereEtape`), identifiant d'événement tracé (`evenementTracePour`) — sert les 3 critères d'acceptation.
    - `frontend/src/app/page.tsx` : rendu du parcours organisateur (barre de progression, étapes validées avec encadré événement tracé, étape courante avec bouton de validation, écran d'action finale) ; les autres profils gardent le placeholder de l'itération 1 — sert les 3 critères d'acceptation.
    - `frontend/src/app/page.module.css` : styles de la barre de progression, des encadrés d'étape et de l'écran d'action finale.
    - `e2e/demo.spec.ts` : étapes de la démo validant la progression jusqu'à l'action finale (hors DoD).

---

## Itération 3 (proposée) : stabilisation pour le pitch

⚠️ Avec seulement 15 minutes annoncées au début de l'itération 2 (dont une partie déjà consommée par le déploiement et la vérification), il ne reste probablement plus de capacité pour une itération fonctionnelle complète (codage + publication + tour de test). Je propose que la suite, si le temps restant le permet encore, se limite à une stabilisation : revérifier `$URL_PUBLIQUE/health` et `/sante`, rejouer la démo contre l'URL publique, corriger un bug bloquant éventuel signalé par l'équipe — sans ajouter de nouveau périmètre. À confirmer avec le développeur au prochain `/iteration 3`, en redemandant le temps restant.

## À venir (objectifs ordonnés, non détaillés)

1. Blog consolidé des actions solidaires, filtrable par public et par thème, avec événement de conversion tracé par recherche/ouverture d'article.
2. Compte facultatif + espace personnel (historique d'actions/dons) en fin de parcours.
3. Bandeau discret remplaçant la fenêtre de sélection de profil sur les pages bien référencées (sans s'empiler avec la bannière cookies).
4. Parcours dédiés testateur et entreprise (actuellement redirigés vers le parcours organisateur/particulier).

# Plan d'itérations — Imagine for Margo

**Replanifié le 2026-11-18** par l'agent, à la demande du développeur (temps illimité annoncé) — remplace le plan précédent.

- **Source du plan** : proposé par l'agent, dans l'ordre du plan de livraison de la squad (`PASSATION.md` → « Notre plan de livraison », repris aussi dans `cadrage/6-plan-de-livraison.md`, lui non vide malgré ce qu'indiquait le bilan précédent) : 1) parcours par profil, 2) blog, 3) compte + espace personnel, 4) bandeau discret SEO. `cadrage/2-idees-priorisees.md` reste vide (pas de vote consolidé entre les 4 idées concurrentes), donc aucune reprise telle quelle d'un plan d'itérations formel de PM Lab.
- **Temps restant annoncé** : illimité (répondu le 2026-11-18). La capacité n'est donc pas la contrainte limitante ; les règles de taille (10 min de codage max par itération, ~5 écrans) restent appliquées telles quelles.
- **Durée d'un tour de test PM Lab** : 10 minutes (valeur par défaut, non précisée par le développeur).
- **Hors périmètre de ce build** : rien n'est coupé faute de temps. Un point reste bloqué en attente de clarification, pas par manque de capacité :
  - ❗️ **Conflit relevé dans la passation** : le prototype (`prototype/index.html`) route les profils *particulier*, *organisateur* et *soignant* vers le même parcours de don (screen-2/5/7). Mais `PASSATION.md` précise une règle métier : « le parcours des familles ne contient aucune sollicitation de don ». Or le prototype route aussi le profil **famille** vers ce même parcours de don — ce qui contredit directement cette règle. Je ne tranche pas seul : le parcours famille reste au placeholder de l'itération 1 jusqu'à clarification des cadreurs (voir item 8 de la section « À venir »).
- **Note sur l'état du dépôt** : à la demande du développeur, ce plan remplace le brouillon d'itération 3 précédent (jamais codé) et celui-ci en reprend l'essentiel (fidélité au prototype), affiné avec le contenu exact du prototype relu pour cette replanification (titres d'étapes, textes des écrans de don, de confirmation et d'espace personnel). `RETRO-HARNAIS.md`, non commité et rédigé pour seulement 2 itérations, reste tel quel : il n'est pas du ressort de cette commande et sera à refaire en fin de hackathon (`/retro-harnais`).

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

## Itération 3 : le parcours de don fidèle au prototype (particulier, organisateur, soignant)

- **Temps restant annoncé au début du codage** : illimité (2026-11-18, 17:05).
- **Dans le périmètre** :
  - remplacer le parcours « organisateur » inventé à l'itération 2 (« définir mon action » / « équipe » / « collecte ») par le parcours de don du prototype (screen-2 → screen-5 → screen-7), partagé par les profils **particulier, organisateur et soignant** — le prototype route lui-même ces trois profils vers le même écran, on ne réinvente pas un parcours distinct ;
  - 3 étapes reprises telles quelles du prototype : « Choisir la forme de mon don » (don ponctuel / mensuel / legs et donations), « Découvrir ce que finance mon don », « Finaliser mon don » ;
  - écran d'action finale conforme au screen-7 : message de remerciement, puis proposition « Créer mon espace personnel » (bouton affiché, sans création réelle — l'espace personnel réel est prévu en itération 6), avec son propre événement tracé ;
  - style des encadrés d'événement tracé conforme au prototype (coche verte, libellé « ✓ Événement tracé : … »).
- **Hors périmètre** :
  - le profil **famille** garde le placeholder de l'itération 1, le temps de clarifier le conflit relevé ci-dessus (❗️) ;
  - le parcours **entreprise** (screen-3/6, formes de partenariat distinctes) reste hors périmètre — prévu en itération 5 ;
  - la création de compte réelle et l'espace personnel (screen-8) sont hors périmètre ici — prévus en itération 6.
- **Critères d'acceptation** (3 au plus) :
  - Étant donné un profil particulier, organisateur ou soignant choisi, quand on arrive sur le parcours, alors les 3 étapes affichées sont, dans cet ordre, « Choisir la forme de mon don », « Découvrir ce que finance mon don », « Finaliser mon don ».
  - Étant donné une étape validée, quand elle s'affiche comme faite, alors l'encadré d'événement tracé reprend le style du prototype (coche verte, libellé « Événement tracé : … »).
  - Étant donné la dernière étape validée, quand l'écran d'action finale apparaît, alors il affiche le message de remerciement et un bouton « Créer mon espace personnel » (sans action réelle), avec son propre événement tracé.
- **Hypothèse de l'équipe couverte** : la même qu'à l'itération 2 (sélecteur de profil → 0 abandon étape 1) — cette itération corrige la fidélité au prototype validé par l'association, elle ne change pas l'hypothèse testée.
- **Codage estimé** : 10 minutes.
- **Fichiers prévus** : `frontend/src/lib/parcours.ts` (+ test), `frontend/src/app/page.tsx`, `page.module.css`, `e2e/demo.spec.ts`.
- **Tests unitaires prévus** : mise à jour des tests existants sur `parcours.ts` (nouveau contenu des étapes, même logique de progression/événements).
- **Étapes ajoutées à la démo** : parcourir le parcours de don jusqu'à l'écran de confirmation, pour le profil organisateur (ou particulier/soignant).
- **Bilan** :
  - Durée de codage réelle : 2 minutes (pas de dépassement).
  - Critères satisfaits : les 3 — les profils particulier, organisateur et soignant affichent désormais « Choisir la forme de mon don », « Découvrir ce que finance mon don », « Finaliser mon don », dans cet ordre ; chaque étape validée affiche l'encadré d'événement tracé au format du prototype (`✓ Événement tracé : …`) ; l'écran d'action finale affiche « 🎉 Merci pour votre engagement ! », son événement `conversion · don_finalise`, et un bouton « Créer mon espace personnel » (sans action réelle, comme prévu hors périmètre).
  - Reporté : rien pour cette itération. Famille et entreprise restent au placeholder de l'itération 1, comme prévu (en attente de clarification pour famille, itération 5 planifiée pour entreprise).
  - Ce que le harnais a bloqué ou refusé : rien. `npm test` : 15 tests verts (2 api + 13 frontend, dont les 2 nouveaux sur `utiliseParcoursDon`). `./scripts/verifier-deployabilite.sh --construire` : aucune borne ; Docker absent sur la machine (podman utilisé à la place, construction faite manuellement selon la recette du `/CLAUDE.md` du serveur), alarme non bloquante.
  - **Modifications** :
    - `frontend/src/lib/parcours.ts` (+ test) : `ETAPES_DON` (3 étapes fidèles au prototype), `ACTION_FINALE_DON`, `utiliseParcoursDon` — sert les 3 critères d'acceptation.
    - `frontend/src/app/page.tsx` : parcours de don affiché pour particulier/organisateur/soignant via `utiliseParcoursDon`, libellé de progression « Étape X / Y », icône ✓ sur les événements tracés, bouton « Créer mon espace personnel » sur l'action finale — sert les 3 critères d'acceptation.
    - `e2e/demo.spec.ts` : étapes de démo mises à jour avec les nouveaux libellés et le nouvel événement final (hors DoD).
    - Déploiement : image frontend reconstruite et republiée (`localhost:5000/team18/frontend:dev`), `podman compose up -d --force-recreate` ; `localhost:8080/` et `localhost:8081/health` répondent 200 ; démo Playwright rejouée avec succès contre `localhost:8080`. Version 3 signalée à PM Lab.

## Itération 4 : des personas génériques, sans noms propres

- **Déclenchée par un retour du développeur** (pas une itération planifiée à l'avance) : retirer les noms nominatifs (Sophie Marchand, Camille Dubreuil…) de l'écran « Qui êtes-vous ? » et du parcours, pour rester générique.
- ⚠️ **Écart signalé par rapport à la passation** : `PASSATION.md` demandait explicitement « une personne par rôle du scénario (les personas qui agissent), avec des données d'exemple » — donc un nom. Cette itération s'en écarte à la demande directe du développeur ; à signaler aux cadreurs si l'association doit voir des personas nommées au pitch.
- **Dans le périmètre** :
  - `personas.ts` : remplacer le champ `nom` par un libellé générique par profil (ex. « Particulier ou testateur », déjà le `role` existant) et retirer les noms propres des données ;
  - écran « Qui êtes-vous ? » : les cartes n'affichent plus que l'icône et le rôle, plus de nom de personne ;
  - parcours : le « Bonjour {nom} » devient un intitulé générique (ou disparaît), cohérent avec le ton du prototype qui ne nomme jamais la personne dans ses écrans de parcours.
- **Hors périmètre** : aucun changement de logique de rôle, de progression ou d'événements tracés.
- **Critères d'acceptation** (3 au plus) :
  - Étant donné l'écran « Qui êtes-vous ? », quand il s'affiche, alors aucune carte ne montre de nom propre, seulement une icône et un rôle générique.
  - Étant donné un profil choisi, quand on arrive sur le parcours, alors aucun nom propre n'apparaît à l'écran.
  - Étant donné les tests unitaires de `personas.ts`, quand ils s'exécutent, alors ils vérifient le comportement par identifiant de profil, sans dépendre d'un nom nominatif.
- **Hypothèse de l'équipe couverte** : aucune — ajustement de généricité demandé par le développeur, hors mesure d'hypothèse.
- **Codage estimé** : 5 minutes.
- **Fichiers prévus** : `frontend/src/lib/personas.ts` (+ test), `frontend/src/app/page.tsx`, `e2e/demo.spec.ts`.
- **Tests unitaires prévus** : mise à jour des tests existants sur `personas.ts` (plus d'assertion sur un nom).
- **Étapes ajoutées à la démo** : aucune nouvelle étape, mise à jour des libellés attendus (plus de nom propre).
- **Bilan** : _à remplir en fin d'itération._

## Itération 5 : blog consolidé des actions solidaires, filtrable

- **Dans le périmètre** :
  - écran blog (screen-4) listant des actions solidaires d'exemple (données en dur), filtrables par profil et par thème, accessible depuis le parcours de don (« Voir les actions solidaires ») ;
  - ouverture d'un article (screen-4-article, ex. Marathon de Lyon 2025) ;
  - un événement de conversion tracé à chaque filtre appliqué et à chaque ouverture d'article.
- **Hors périmètre** : recherche texte libre, pagination réelle, contenu éditorial réel (4-5 articles d'exemple suffisent).
- **Critères d'acceptation** (3 au plus) :
  - Étant donné l'écran blog, quand il charge, alors une liste d'articles d'exemple s'affiche avec des filtres par profil et par thème.
  - Étant donné un filtre appliqué, quand la liste se met à jour, alors un événement de conversion tracé est visible.
  - Étant donné un article ouvert, quand l'écran article s'affiche, alors son propre événement tracé est visible.
- **Hypothèse de l'équipe couverte** : « un blog consolidé avec filtres permettrait de relier chaque article consulté à un geste mesurable » — mesure : ≥ 1 événement tracé par parcours de recherche.
- **Codage estimé** : 10 minutes.
- **Fichiers prévus** : `frontend/src/lib/blog.ts` (+ test), `frontend/src/app/page.tsx` (nouvel écran « blog »), `page.module.css`, `e2e/demo.spec.ts`.
- **Tests unitaires prévus** : 1 à 3, sur la logique de filtrage et le déclenchement d'événement.
- **Étapes ajoutées à la démo** : ouvrir le blog depuis le parcours, appliquer un filtre, ouvrir un article.
- **Bilan** : _à remplir en fin d'itération._

## Itération 6 : parcours famille dédié, choix réels et retour en arrière corrigé

- **Dans le périmètre** :
  - parcours famille dédié (`ETAPES_FAMILLE`), sans aucune étape de don, conformément à `PASSATION.md` — tranche le conflit relevé en itération 3 ;
  - étapes à choix réel (« Choisir la forme de mon don », « Choisir la forme de partenariat ») : options sélectionnables au lieu d'un unique bouton « Valider » ;
  - retour en arrière corrigé : revient à l'étape précédente, pas à l'étape 1 ;
  - lien « Voir les actions solidaires » promu plus tôt dans l'écran parcours (amélioration partielle du retour testeur sur le profil particulier).
- **Hors périmètre** : menu dédié complet pour le profil particulier (« don mais pas que ») — ❓ portée non précisée par les cadreurs, reporté ; parcours soignant dédié — ❓ tension relevée mais non tranchée par les cadreurs, reporté.
- **Critères d'acceptation** :
  - Étant donné le profil famille sélectionné, quand le parcours se déroule, alors aucune étape ni action finale ne sollicite un don.
  - Étant donné une étape à choix réel, quand elle s'affiche, alors plusieurs options sont sélectionnables, pas une simple validation.
  - Étant donné une étape après la première, quand on clique « Étape précédente », alors on revient à l'étape qui précède, pas à l'étape 1.
- **Tests unitaires** : `parcours.test.ts` — parcours famille sans étape de don, options présentes sur les étapes de choix. `npm test` : 29/29 passent.
- **Étapes ajoutées à la démo** : `e2e/demo.spec.ts` mis à jour (clic sur l'option « Don unique » au lieu du bouton générique).
- **Bilan** : fait hors cérémonie `/iteration <N>` à la demande du développeur (fix enchaînés en une session) ; `ITERATIONS.md` complété rétroactivement avant signal PM Lab.

## À venir (objectifs ordonnés, non détaillés)

7. Compte facultatif + espace personnel réel (screen-8 : historique de dons/actions), déclenché depuis l'écran de confirmation posé en itération 3.
8. Bandeau discret remplaçant la fenêtre de sélection de profil sur les pages « bien référencées » (❓ à clarifier avec les cadreurs : quelles pages de l'app seront considérées comme telles en l'absence de vrai référencement, et comment le simuler sans l'empiler avec une bannière cookies qui n'existe pas non plus encore).
9. Menu dédié pour le profil particulier/testateur, au-delà du don (❓ « don mais pas que » — contenu du menu à préciser par les cadreurs).
10. Parcours soignant dédié, à l'image du parcours famille (❓ tension relevée par les testeurs mais pas tranchée : le soignant accompagne, il ne devrait peut-être pas être sollicité pour un don lui-même — à trancher par les cadreurs).

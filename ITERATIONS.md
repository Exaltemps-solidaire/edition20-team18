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
- **Bilan** : _à remplir en fin d'itération._

## Itération 2 : le parcours guidé jusqu'à l'action finale, avec événements tracés

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
- **Bilan** : _à remplir en fin d'itération._

---

## À venir (objectifs ordonnés, non détaillés)

1. Blog consolidé des actions solidaires, filtrable par public et par thème, avec événement de conversion tracé par recherche/ouverture d'article.
2. Compte facultatif + espace personnel (historique d'actions/dons) en fin de parcours.
3. Bandeau discret remplaçant la fenêtre de sélection de profil sur les pages bien référencées (sans s'empiler avec la bannière cookies).
4. Parcours dédiés testateur et entreprise (actuellement redirigés vers le parcours organisateur/particulier).

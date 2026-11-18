# Déploiement

Site pour l'association **Imagine for Margo** : il oriente chaque visiteur (particulier, entreprise, organisateur, famille, soignant/chercheur) vers son parcours propre et mesure si une visite aboutit à une action concrète.

## Services

- `frontend/` : export statique Next.js servi par nginx, port 80 (publié en 8080). **Service exposé au public.**
- `api/` : service Node, port 8081 (publié en 8081). Ne sert pour l'instant que `/health` et `/sante` ; le parcours applicatif est encore en données en dur côté front.

## Services externes

Aucun pour l'instant (itération 1 : écrans en dur, aucun appel réseau).

## Connu comme fragile ou inachevé

- Le choix d'un profil mène à un espace de parcours encore vide (placeholder) : le contenu réel arrive à l'itération 2.
- Un seul persona par rôle, données en dur, aucune persistance.

## Contacts

- Équipe : Équipe 18 (hackathon eXaltemps Solidaire).
- Association : Imagine for Margo — responsable communication et responsable collecte et partenariats (voir `passation/contexte/association.md`, non commité).

import type { ProfilId } from "./personas";

export type Etape = {
  id: string;
  titre: string;
  description: string;
  // Présent uniquement sur les étapes qui proposent un vrai choix (ex. "Choisir la forme de mon don") :
  // l'écran affiche ces options au lieu d'un simple bouton "Valider".
  options?: string[];
};

// Parcours de don du prototype (screen-2 → screen-5), partagé par les profils
// particulier, organisateur et soignant : le prototype les route tous vers le même écran.
export const ETAPES_DON: Etape[] = [
  {
    id: "choix_forme",
    titre: "Choisir la forme de mon don",
    description: "Don unique, don mensuel, legs et donations ou assurance-vie.",
    options: ["Don unique", "Don mensuel", "Legs et donations", "Assurance-vie"],
  },
  {
    id: "financement",
    titre: "Découvrir ce que finance mon don",
    description: "Les projets de recherche soutenus et leurs résultats.",
  },
  {
    id: "finalisation",
    titre: "Finaliser mon don",
    description: "Formulaire sécurisé iRaiser et reçu fiscal.",
  },
];

// Parcours entreprise du prototype (screen-3 → screen-6).
export const ETAPES_ENTREPRISE: Etape[] = [
  {
    id: "choix_partenariat",
    titre: "Choisir la forme de partenariat",
    description: "Mécénat financier, parrainage de course ou team building solidaire.",
    options: ["Mécénat financier", "Parrainage de course", "Team building solidaire"],
  },
  {
    id: "plaquette",
    titre: "Télécharger la plaquette partenaires",
    description: "Avantages fiscaux, visibilité et engagements.",
  },
  {
    id: "references",
    titre: "Découvrir les entreprises partenaires",
    description: "Références, témoignages et résultats.",
  },
  {
    id: "contact",
    titre: "Contacter la responsable partenariats",
    description: "Formulaire, rappel ou rendez-vous.",
  },
];

// Parcours famille, distinct du prototype : PASSATION.md impose « aucune sollicitation de don »
// pour ce profil, donc pas de réutilisation du parcours de don malgré le routage du prototype.
// Retour terrain : les familles doivent néanmoins garder accès aux événements (via le blog,
// déjà proposé sur l'écran parcours) et à la recherche financée, sans jamais passer par un don.
export const ETAPES_FAMILLE: Etape[] = [
  {
    id: "ressources",
    titre: "Découvrir les ressources pour les familles",
    description: "Informations médicales, démarches et accompagnement au quotidien.",
  },
  {
    id: "recherche",
    titre: "Suivre les projets de recherche soutenus",
    description: "Avancées scientifiques et résultats, à titre d'information uniquement.",
  },
  {
    id: "repit",
    titre: "Accéder aux dispositifs de répit",
    description: "Séjours de répit, aide à domicile et soutien psychologique.",
  },
  {
    id: "contact",
    titre: "Échanger avec l'équipe de soutien aux familles",
    description: "Un accompagnement personnalisé, sans engagement financier.",
  },
];

export const KIT_ENTREPRISE = [
  { nom: "Plaquette mécènes 2025", description: "Avantages fiscaux · Visibilité · Témoignages" },
  { nom: "Rapport d'impact 2024", description: "Projets financés · Résultats de recherche" },
];

export type ActionFinale = {
  titre: string;
  description: string;
  evenementId: string;
};

export const ACTION_FINALE: ActionFinale = {
  titre: "🎉 Merci pour votre engagement !",
  description: "Votre geste finance directement la recherche pour guérir les enfants.",
  evenementId: "conversion · don_finalise",
};

export const ACTION_FINALE_FAMILLE: ActionFinale = {
  titre: "🤍 Nous sommes là pour vous accompagner",
  description: "Notre équipe de soutien aux familles vous recontacte pour vous orienter vers les bons dispositifs.",
  evenementId: "parcours_famille · termine",
};

export function etapesPourProfil(profilId: ProfilId): Etape[] {
  if (profilId === "entreprise") return ETAPES_ENTREPRISE;
  if (profilId === "famille") return ETAPES_FAMILLE;
  return ETAPES_DON;
}

export function actionFinalePourProfil(profilId: ProfilId): ActionFinale {
  return profilId === "famille" ? ACTION_FINALE_FAMILLE : ACTION_FINALE;
}

export function progressionPourcent(etapeCourante: number, total: number): number {
  if (total <= 0) return 0;
  const bornee = Math.max(0, Math.min(etapeCourante, total));
  return Math.round((bornee / total) * 100);
}

export function estDerniereEtape(etapeCourante: number, total: number): boolean {
  return etapeCourante >= total;
}

export function evenementTracePour(profilId: ProfilId, etapeId: string): string {
  const prefixe =
    profilId === "entreprise" ? "etape_entreprise" : profilId === "famille" ? "etape_famille" : "etape_don";
  return `${prefixe} · ${etapeId}`;
}

export type Etape = {
  id: string;
  titre: string;
  description: string;
};

// Parcours de don du prototype (screen-2 → screen-5), partagé par les profils
// particulier, organisateur et soignant : le prototype les route tous vers le même écran.
export const ETAPES_DON: Etape[] = [
  {
    id: "choix_forme",
    titre: "Choisir la forme de mon don",
    description: "Don unique, don mensuel, legs et donations ou assurance-vie.",
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

export const ACTION_FINALE_DON = {
  titre: "🎉 Merci pour votre engagement !",
  description: "Votre geste finance directement la recherche pour guérir les enfants.",
  evenementId: "conversion · don_finalise",
};

const PROFILS_PARCOURS_DON = ["particulier", "organisateur", "soignant"] as const;

export function utiliseParcoursDon(profilId: string): boolean {
  return (PROFILS_PARCOURS_DON as readonly string[]).includes(profilId);
}

export function progressionPourcent(etapeCourante: number, total: number): number {
  if (total <= 0) return 0;
  const bornee = Math.max(0, Math.min(etapeCourante, total));
  return Math.round((bornee / total) * 100);
}

export function estDerniereEtape(etapeCourante: number, total: number): boolean {
  return etapeCourante >= total;
}

export function evenementTracePour(etapeId: string): string {
  return `etape_don · ${etapeId}`;
}

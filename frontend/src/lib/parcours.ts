export type Etape = {
  id: string;
  titre: string;
  description: string;
};

export const ETAPES_ORGANISATEUR: Etape[] = [
  {
    id: "definir",
    titre: "Je définis mon action solidaire",
    description: "Choisissez le format : course, vente, événement caritatif…",
  },
  {
    id: "equipe",
    titre: "Je rassemble mon équipe",
    description: "Invitez des bénévoles à vous rejoindre.",
  },
  {
    id: "collecte",
    titre: "Je lance ma collecte",
    description: "Ouvrez la cagnotte et partagez-la autour de vous.",
  },
];

export const ACTION_FINALE_ORGANISATEUR = {
  titre: "Je suis prêt·e à agir",
  description: "Contactez Imagine for Margo pour être accompagné·e dans votre action.",
};

export function progressionPourcent(etapeCourante: number, total: number): number {
  if (total <= 0) return 0;
  const bornee = Math.max(0, Math.min(etapeCourante, total));
  return Math.round((bornee / total) * 100);
}

export function estDerniereEtape(etapeCourante: number, total: number): boolean {
  return etapeCourante >= total;
}

export function evenementTracePour(etapeId: string): string {
  return `evenement_trace:${etapeId}`;
}

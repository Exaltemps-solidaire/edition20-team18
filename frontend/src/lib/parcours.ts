import type { ProfilId } from "./personas";

export type Etape = {
  id: string;
  titre: string;
  description: string;
};

// Parcours de don du prototype (screen-2 → screen-5), partagé par les profils
// particulier, organisateur, famille et soignant : le prototype les route tous vers le même écran.
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

// Parcours entreprise du prototype (screen-3 → screen-6).
export const ETAPES_ENTREPRISE: Etape[] = [
  {
    id: "choix_partenariat",
    titre: "Choisir la forme de partenariat",
    description: "Mécénat financier, parrainage de course ou team building solidaire.",
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

export const KIT_ENTREPRISE = [
  { nom: "Plaquette mécènes 2025", description: "Avantages fiscaux · Visibilité · Témoignages" },
  { nom: "Rapport d'impact 2024", description: "Projets financés · Résultats de recherche" },
];

export const ACTION_FINALE = {
  titre: "🎉 Merci pour votre engagement !",
  description: "Votre geste finance directement la recherche pour guérir les enfants.",
  evenementId: "conversion · don_finalise",
};

export function etapesPourProfil(profilId: ProfilId): Etape[] {
  return profilId === "entreprise" ? ETAPES_ENTREPRISE : ETAPES_DON;
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
  const prefixe = profilId === "entreprise" ? "etape_entreprise" : "etape_don";
  return `${prefixe} · ${etapeId}`;
}

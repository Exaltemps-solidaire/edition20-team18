export type ProfilId = "particulier" | "entreprise" | "organisateur" | "famille" | "soignant";

export type Persona = {
  id: ProfilId;
  role: string;
  icone: string;
};

// Les 5 profils du prototype (modale « Qui êtes-vous ? ») : icône + rôle, sans nom propre.
export const PERSONAS: Persona[] = [
  { id: "particulier", role: "Particulier ou testateur", icone: "💛" },
  { id: "entreprise", role: "Entreprise mécène", icone: "🤝" },
  { id: "organisateur", role: "Organisateur d'action", icone: "🏃" },
  { id: "famille", role: "Famille touchée", icone: "💙" },
  { id: "soignant", role: "Soignant ou chercheur", icone: "🔬" },
];

export function getPersonaById(id: string): Persona | undefined {
  return PERSONAS.find((p) => p.id === id);
}

export function evenementProfilSelectionne(profilId: ProfilId): string {
  return `profil_selectionne · ${profilId}`;
}

// Le prototype n'affiche la fenêtre « Qui êtes-vous ? » qu'à l'accueil, pas dans le parcours.
export function shouldShowPersonaModal(ecran: string): boolean {
  return ecran === "accueil";
}

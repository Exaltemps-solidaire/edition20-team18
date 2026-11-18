export type ProfilId = "particulier" | "entreprise" | "organisateur" | "famille" | "soignant";

export type Persona = {
  id: ProfilId;
  nom: string;
  role: string;
  icone: string;
};

// Une personne d'exemple par rôle du scénario retenu (PASSATION.md, section « Les utilisateurs : pas de connexion »).
export const PERSONAS: Persona[] = [
  { id: "particulier", nom: "Sophie Marchand", role: "Particulière ou testatrice", icone: "💛" },
  { id: "entreprise", nom: "Julien Perrot", role: "Entreprise mécène", icone: "🤝" },
  { id: "organisateur", nom: "Camille Dubreuil", role: "Organisatrice d'action solidaire", icone: "🏃" },
  { id: "famille", nom: "Nadia Benali", role: "Famille touchée", icone: "💙" },
  { id: "soignant", nom: "Dr Marc Lefèvre", role: "Soignant ou chercheur", icone: "🔬" },
];

export function getPersonaById(id: string): Persona | undefined {
  return PERSONAS.find((p) => p.id === id);
}

// Le prototype n'affiche la fenêtre « Qui êtes-vous ? » qu'à l'accueil, pas dans le parcours.
export function shouldShowPersonaModal(ecran: string): boolean {
  return ecran === "accueil";
}

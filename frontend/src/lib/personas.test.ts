import { describe, expect, it } from "vitest";
import { PERSONAS, evenementProfilSelectionne, getPersonaById, shouldShowPersonaModal } from "./personas";

describe("getPersonaById", () => {
  it("retrouve un profil par son identifiant", () => {
    expect(getPersonaById("organisateur")?.role).toBe("Organisateur d'action");
  });

  it("renvoie undefined pour un identifiant inconnu", () => {
    expect(getPersonaById("inconnu")).toBeUndefined();
  });

  it("propose les 5 profils du prototype, sans doublon", () => {
    const ids = PERSONAS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toHaveLength(5);
  });
});

describe("evenementProfilSelectionne", () => {
  it("produit un identifiant d'événement stable par profil", () => {
    expect(evenementProfilSelectionne("entreprise")).toBe("profil_selectionne · entreprise");
  });
});

describe("shouldShowPersonaModal", () => {
  it("s'affiche sur l'accueil", () => {
    expect(shouldShowPersonaModal("accueil")).toBe(true);
  });

  it("ne s'affiche pas une fois dans le parcours", () => {
    expect(shouldShowPersonaModal("parcours")).toBe(false);
  });
});

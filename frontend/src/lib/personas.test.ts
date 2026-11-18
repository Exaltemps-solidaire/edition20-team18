import { describe, expect, it } from "vitest";
import { PERSONAS, getPersonaById, shouldShowPersonaModal } from "./personas";

describe("getPersonaById", () => {
  it("retrouve une personne par son identifiant de profil", () => {
    expect(getPersonaById("organisateur")?.nom).toBe("Camille Dubreuil");
  });

  it("renvoie undefined pour un identifiant inconnu", () => {
    expect(getPersonaById("inconnu")).toBeUndefined();
  });

  it("propose une personne par rôle du scénario, sans doublon", () => {
    const ids = PERSONAS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toHaveLength(5);
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

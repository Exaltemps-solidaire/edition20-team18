import { describe, expect, it } from "vitest";
import {
  ETAPES_DON,
  estDerniereEtape,
  evenementTracePour,
  progressionPourcent,
  utiliseParcoursDon,
} from "./parcours";

describe("progressionPourcent", () => {
  it("vaut 0% avant toute étape validée", () => {
    expect(progressionPourcent(0, ETAPES_DON.length)).toBe(0);
  });

  it("reflète l'étape courante au milieu du parcours", () => {
    expect(progressionPourcent(2, ETAPES_DON.length)).toBe(67);
  });

  it("vaut 100% quand toutes les étapes sont validées", () => {
    expect(progressionPourcent(3, ETAPES_DON.length)).toBe(100);
  });
});

describe("estDerniereEtape", () => {
  it("est fausse tant qu'il reste des étapes", () => {
    expect(estDerniereEtape(2, ETAPES_DON.length)).toBe(false);
  });

  it("est vraie une fois toutes les étapes validées", () => {
    expect(estDerniereEtape(3, ETAPES_DON.length)).toBe(true);
  });
});

describe("evenementTracePour", () => {
  it("produit un identifiant d'événement stable par étape", () => {
    expect(evenementTracePour("choix_forme")).toBe("etape_don · choix_forme");
  });
});

describe("utiliseParcoursDon", () => {
  it("est vraie pour particulier, organisateur et soignant", () => {
    expect(utiliseParcoursDon("particulier")).toBe(true);
    expect(utiliseParcoursDon("organisateur")).toBe(true);
    expect(utiliseParcoursDon("soignant")).toBe(true);
  });

  it("est fausse pour famille et entreprise (parcours non encore fidèles au prototype)", () => {
    expect(utiliseParcoursDon("famille")).toBe(false);
    expect(utiliseParcoursDon("entreprise")).toBe(false);
  });
});

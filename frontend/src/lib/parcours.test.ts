import { describe, expect, it } from "vitest";
import {
  ETAPES_ORGANISATEUR,
  estDerniereEtape,
  evenementTracePour,
  progressionPourcent,
} from "./parcours";

describe("progressionPourcent", () => {
  it("vaut 0% avant toute étape validée", () => {
    expect(progressionPourcent(0, ETAPES_ORGANISATEUR.length)).toBe(0);
  });

  it("reflète l'étape courante au milieu du parcours", () => {
    expect(progressionPourcent(2, ETAPES_ORGANISATEUR.length)).toBe(67);
  });

  it("vaut 100% quand toutes les étapes sont validées", () => {
    expect(progressionPourcent(3, ETAPES_ORGANISATEUR.length)).toBe(100);
  });
});

describe("estDerniereEtape", () => {
  it("est fausse tant qu'il reste des étapes", () => {
    expect(estDerniereEtape(2, ETAPES_ORGANISATEUR.length)).toBe(false);
  });

  it("est vraie une fois toutes les étapes validées", () => {
    expect(estDerniereEtape(3, ETAPES_ORGANISATEUR.length)).toBe(true);
  });
});

describe("evenementTracePour", () => {
  it("produit un identifiant d'événement stable par étape", () => {
    expect(evenementTracePour("definir")).toBe("evenement_trace:definir");
  });
});

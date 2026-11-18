import { describe, expect, it } from "vitest";
import {
  ETAPES_DON,
  ETAPES_ENTREPRISE,
  estDerniereEtape,
  etapesPourProfil,
  evenementTracePour,
  progressionPourcent,
} from "./parcours";

describe("etapesPourProfil", () => {
  it("renvoie le parcours de don pour particulier, organisateur, famille et soignant", () => {
    expect(etapesPourProfil("particulier")).toBe(ETAPES_DON);
    expect(etapesPourProfil("organisateur")).toBe(ETAPES_DON);
    expect(etapesPourProfil("famille")).toBe(ETAPES_DON);
    expect(etapesPourProfil("soignant")).toBe(ETAPES_DON);
  });

  it("renvoie le parcours dédié pour entreprise", () => {
    expect(etapesPourProfil("entreprise")).toBe(ETAPES_ENTREPRISE);
  });
});

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
  it("préfixe etape_don pour les profils du parcours de don", () => {
    expect(evenementTracePour("particulier", "choix_forme")).toBe("etape_don · choix_forme");
  });

  it("préfixe etape_entreprise pour le profil entreprise", () => {
    expect(evenementTracePour("entreprise", "choix_partenariat")).toBe(
      "etape_entreprise · choix_partenariat"
    );
  });
});

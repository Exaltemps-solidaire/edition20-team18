import { describe, expect, it } from "vitest";
import {
  ACTION_FINALE,
  ACTION_FINALE_FAMILLE,
  ETAPES_DON,
  ETAPES_ENTREPRISE,
  ETAPES_FAMILLE,
  actionFinalePourProfil,
  estDerniereEtape,
  etapesPourProfil,
  evenementTracePour,
  progressionPourcent,
} from "./parcours";

describe("etapesPourProfil", () => {
  it("renvoie le parcours de don pour particulier, organisateur et soignant", () => {
    expect(etapesPourProfil("particulier")).toBe(ETAPES_DON);
    expect(etapesPourProfil("organisateur")).toBe(ETAPES_DON);
    expect(etapesPourProfil("soignant")).toBe(ETAPES_DON);
  });

  it("renvoie le parcours dédié pour entreprise", () => {
    expect(etapesPourProfil("entreprise")).toBe(ETAPES_ENTREPRISE);
  });

  it("renvoie le parcours dédié pour famille, sans sollicitation de don", () => {
    expect(etapesPourProfil("famille")).toBe(ETAPES_FAMILLE);
    expect(etapesPourProfil("famille")).not.toBe(ETAPES_DON);
  });

  it("donne accès à la recherche et aux événements pour la famille, sans aucune étape de don", () => {
    expect(ETAPES_FAMILLE.some((e) => e.id === "recherche")).toBe(true);
    expect(ETAPES_FAMILLE.some((e) => e.id === "finalisation")).toBe(false);
  });
});

describe("étapes avec choix réel", () => {
  it("propose des options sur l'étape de choix du don, pas seulement une validation", () => {
    const etapeChoix = ETAPES_DON.find((e) => e.id === "choix_forme");
    expect(etapeChoix?.options?.length).toBeGreaterThan(1);
  });

  it("propose des options sur l'étape de choix du partenariat entreprise", () => {
    const etapeChoix = ETAPES_ENTREPRISE.find((e) => e.id === "choix_partenariat");
    expect(etapeChoix?.options?.length).toBeGreaterThan(1);
  });
});

describe("actionFinalePourProfil", () => {
  it("renvoie l'action finale générique pour les profils donateurs", () => {
    expect(actionFinalePourProfil("particulier")).toBe(ACTION_FINALE);
    expect(actionFinalePourProfil("entreprise")).toBe(ACTION_FINALE);
  });

  it("renvoie une action finale dédiée, sans mention de don, pour la famille", () => {
    expect(actionFinalePourProfil("famille")).toBe(ACTION_FINALE_FAMILLE);
    expect(ACTION_FINALE_FAMILLE.evenementId).not.toContain("don_finalise");
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

  it("préfixe etape_famille pour le profil famille", () => {
    expect(evenementTracePour("famille", "ressources")).toBe("etape_famille · ressources");
  });
});

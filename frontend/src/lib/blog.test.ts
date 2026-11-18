import { describe, expect, it } from "vitest";
import { ARTICLES, evenementBlogPour, filtrerArticles, getArticleById } from "./blog";

describe("filtrerArticles", () => {
  it("renvoie tous les articles pour le filtre Toutes", () => {
    expect(filtrerArticles(ARTICLES, "Toutes")).toHaveLength(ARTICLES.length);
  });

  it("filtre par thème", () => {
    const resultat = filtrerArticles(ARTICLES, "Entreprise");
    expect(resultat).toHaveLength(1);
    expect(resultat[0].id).toBe("decathlon-bordeaux");
  });

  it("renvoie un tableau vide pour un thème sans article", () => {
    expect(filtrerArticles(ARTICLES, "inconnu")).toHaveLength(0);
  });
});

describe("getArticleById", () => {
  it("retrouve un article par son identifiant", () => {
    expect(getArticleById("marathon-lyon")?.lieu).toBe("Lyon");
  });

  it("renvoie undefined pour un identifiant inconnu", () => {
    expect(getArticleById("inconnu")).toBeUndefined();
  });
});

describe("evenementBlogPour", () => {
  it("trace 'tous' pour le filtre Toutes", () => {
    expect(evenementBlogPour("Toutes")).toBe("blog_consulte · filtre=tous");
  });

  it("trace le thème en minuscules pour un filtre précis", () => {
    expect(evenementBlogPour("Organisateur")).toBe("blog_consulte · filtre=organisateur");
  });
});

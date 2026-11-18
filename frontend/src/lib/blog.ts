export type Article = {
  id: string;
  icone: string;
  tag: string;
  themes: string[];
  titre: string;
  date: string;
  lieu: string;
  texte: string[];
  chiffresCles: string;
};

export const FILTRES = ["Toutes", "Organisateur", "Entreprise", "Septembre en or", "Course"] as const;

// Articles d'exemple du blog consolidé (screen-4 du prototype).
export const ARTICLES: Article[] = [
  {
    id: "marathon-lyon",
    icone: "🏃",
    tag: "Organisateur · Course",
    themes: ["Organisateur", "Course"],
    titre: "Marathon de Lyon 2025 : 42 km pour la recherche",
    date: "14 oct. 2025",
    lieu: "Lyon",
    texte: [
      "Une équipe de 18 coureurs a décidé de relever le défi du Marathon de Lyon au profit d'Imagine for Margo. En six semaines de collecte peer-to-peer, ils ont réuni 4 320 € entièrement versés à la recherche en oncologie pédiatrique.",
      "« On voulait que chaque foulée serve à quelque chose. Quand on a su que 100 % allait directement à la recherche, on a su qu'on courait pour les bonnes raisons. »",
    ],
    chiffresCles: "4 320 € collectés · 18 coureurs · 42 km",
  },
  {
    id: "decathlon-bordeaux",
    icone: "🎪",
    tag: "Entreprise · Mécénat",
    themes: ["Entreprise"],
    titre: "Décathlon Bordeaux mobilise 120 collaborateurs",
    date: "3 sept. 2025",
    lieu: "Bordeaux",
    texte: [
      "Une journée de mobilisation interne des équipes du magasin de Bordeaux au profit de la recherche contre les cancers pédiatriques.",
    ],
    chiffresCles: "120 collaborateurs mobilisés",
  },
  {
    id: "vente-encheres-nantes",
    icone: "🎨",
    tag: "Septembre en or",
    themes: ["Septembre en or"],
    titre: "Vente aux enchères solidaire – École Pasteur Nantes",
    date: "22 sept. 2025",
    lieu: "Nantes",
    texte: [
      "Une vente aux enchères organisée par les parents d'élèves de l'école Pasteur au profit de la recherche, à l'occasion de Septembre en or.",
    ],
    chiffresCles: "Vente organisée par les familles de l'école",
  },
  {
    id: "concert-paris",
    icone: "🎵",
    tag: "Organisateur",
    themes: ["Organisateur"],
    titre: "Concert caritatif « Notes pour Margo » – Paris",
    date: "8 nov. 2025",
    lieu: "Paris",
    texte: ["Un concert caritatif organisé à Paris, intégralement au profit de la recherche."],
    chiffresCles: "Concert à guichets fermés",
  },
];

export function filtrerArticles(articles: Article[], filtre: string): Article[] {
  if (filtre === "Toutes") return articles;
  return articles.filter((a) => a.themes.includes(filtre));
}

export function getArticleById(id: string): Article | undefined {
  return ARTICLES.find((a) => a.id === id);
}

export function evenementBlogPour(filtre: string): string {
  return `blog_consulte · filtre=${filtre === "Toutes" ? "tous" : filtre.toLowerCase()}`;
}

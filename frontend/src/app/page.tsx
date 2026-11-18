"use client";

import { useState } from "react";
import {
  PERSONAS,
  evenementProfilSelectionne,
  getPersonaById,
  shouldShowPersonaModal,
  type ProfilId,
} from "@/lib/personas";
import {
  ACTION_FINALE,
  KIT_ENTREPRISE,
  estDerniereEtape,
  etapesPourProfil,
  evenementTracePour,
  progressionPourcent,
} from "@/lib/parcours";
import { ARTICLES, FILTRES, evenementBlogPour, filtrerArticles, getArticleById } from "@/lib/blog";
import styles from "./page.module.css";

type Ecran = "accueil" | "parcours" | "blog" | "article" | "compte";

const QUESTIONS_ACCUEIL: { id: ProfilId; titre: string; desc: string }[] = [
  { id: "particulier", titre: "Je veux faire un don", desc: "Particulier · Testateur · Legs et donations" },
  { id: "entreprise", titre: "Mon entreprise s'engage", desc: "Mécénat, partenariat, mobilisation équipe" },
  { id: "organisateur", titre: "J'organise une action solidaire", desc: "Course, événement, collecte de proximité" },
  { id: "famille", titre: "Ma famille est touchée", desc: "Informations, répit, soutien" },
  { id: "soignant", titre: "Je suis soignant ou chercheur", desc: "Programmes, appels à projets, FAST" },
];

const COMPTE_EXEMPLE = {
  depuis: "Donateur depuis novembre 2025",
  dons: 3,
  total: "150 €",
  actions: 1,
  historique: [
    { icone: "€", titre: "Don ponctuel – Novembre 2025", date: "14 nov. 2025 · Reçu fiscal envoyé", montant: "50 €" },
    { icone: "↻", titre: "Don mensuel – Décembre 2025", date: "1 déc. 2025 · Prélèvement automatique", montant: "25 €" },
    { icone: "🏃", titre: "Marathon de Lyon – Action organisée", date: "14 oct. 2025 · 4 320 € collectés", montant: "org." },
    { icone: "€", titre: "Don ponctuel – Janvier 2026", date: "5 jan. 2026 · Reçu fiscal envoyé", montant: "75 €" },
  ],
  document: { nom: "Reçu fiscal 2025", description: "75 € de réduction d'impôt · Envoyé par email" },
};

export default function Home() {
  const [ecran, setEcran] = useState<Ecran>("accueil");
  const [modaleFermee, setModaleFermee] = useState(false);
  const [profilId, setProfilId] = useState<ProfilId | null>(null);
  const [etapeCourante, setEtapeCourante] = useState(0);
  const [filtreBlog, setFiltreBlog] = useState<string>("Toutes");
  const [articleId, setArticleId] = useState<string | null>(null);

  const persona = profilId ? getPersonaById(profilId) : undefined;
  const etapes = profilId ? etapesPourProfil(profilId) : [];
  const total = etapes.length;
  const parcoursTermine = estDerniereEtape(etapeCourante, total);
  const modaleVisible = shouldShowPersonaModal(ecran) && !modaleFermee;
  const article = articleId ? getArticleById(articleId) : undefined;
  const articlesFiltres = filtrerArticles(ARTICLES, filtreBlog);

  function irAccueil() {
    setEcran("accueil");
    setModaleFermee(false);
  }

  function choisirProfil(id: ProfilId) {
    setProfilId(id);
    setEtapeCourante(0);
    setEcran("parcours");
    setModaleFermee(true);
  }

  function validerEtape() {
    setEtapeCourante((e) => Math.min(e + 1, total));
  }

  function irBlog() {
    setEcran("blog");
  }

  function ouvrirArticle(id: string) {
    setArticleId(id);
    setEcran("article");
  }

  function irCompte() {
    setEcran("compte");
  }

  function nouveauDon() {
    setProfilId("particulier");
    setEtapeCourante(0);
    setEcran("parcours");
  }

  function organiserAction() {
    setProfilId("organisateur");
    setEtapeCourante(0);
    setEcran("parcours");
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>
          🦋 Imagine for Margo
          <span>Go, Fight, Win</span>
        </div>
        <button className={styles.profileButton} onClick={irAccueil}>
          {persona ? `${persona.icone} ${persona.role}` : "Mon profil"}
        </button>
      </header>

      {ecran === "accueil" && (
        <main className={styles.main}>
          <div className={styles.hero}>
            <p className={styles.heroLabel}>🧡 Imagine for Margo</p>
            <h1>La recherche pour guérir les enfants</h1>
            <p>Rejoignez les 1 800 bénévoles qui se battent chaque jour pour que les enfants gagnent.</p>
          </div>

          <h2 className={styles.sectionTitle}>🦋 Que venez-vous faire ?</h2>
          <div className={styles.stepsList}>
            {QUESTIONS_ACCUEIL.map((q) => (
              <button key={q.id} className={styles.stepItem} onClick={() => choisirProfil(q.id)}>
                <span className={styles.stepNum}>{getPersonaById(q.id)?.icone}</span>
                <span className={styles.stepContent}>
                  <span className={styles.stepTitle}>{q.titre}</span>
                  <span className={styles.stepDesc}>{q.desc}</span>
                </span>
                <span className={styles.stepArrow}>›</span>
              </button>
            ))}
          </div>

          <div className={styles.divider} />
          <h2 className={styles.sectionTitle}>🦋 Actions solidaires à la une</h2>
          <div className={styles.blogList}>
            {ARTICLES.slice(0, 2).map((a) => (
              <button key={a.id} className={styles.blogCard} onClick={irBlog}>
                <span className={styles.blogCardImg}>{a.icone}</span>
                <span className={styles.blogCardBody}>
                  <span className={styles.blogCardTag}>{a.tag}</span>
                  <span className={styles.blogCardTitle}>{a.titre}</span>
                  <span className={styles.blogCardDate}>{a.date}</span>
                </span>
              </button>
            ))}
          </div>
          <button className={styles.btnGhost} onClick={irBlog}>
            Voir les plus de 200 actions solidaires →
          </button>
        </main>
      )}

      {ecran === "parcours" && persona && profilId && (
        <main className={styles.main}>
          <p className={styles.tag}>{persona.role}</p>
          <h1>Votre parcours</h1>
          <p>
            {profilId === "entreprise"
              ? "Engagez vos équipes pour la recherche."
              : "100 % des dons vont à la recherche contre les cancers des enfants."}
          </p>

          <p className={styles.evenementTrace}>
            ✓ Événement tracé : {evenementProfilSelectionne(profilId)}
          </p>

          <div className={styles.progressBarTrack}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${progressionPourcent(etapeCourante, total)}%` }}
            />
          </div>
          <p>
            Étape {Math.min(etapeCourante + 1, total)} / {total}
          </p>

          {etapes.map((etape, index) =>
            index < etapeCourante ? (
              <div key={etape.id} className={styles.etapeValidee}>
                <p>✅ {etape.titre}</p>
                <p className={styles.evenementTrace}>
                  ✓ Événement tracé : {evenementTracePour(profilId, etape.id)}
                </p>
              </div>
            ) : index === etapeCourante && !parcoursTermine ? (
              <div key={etape.id} className={styles.etapeCourante}>
                <h2>{etape.titre}</h2>
                <p>{etape.description}</p>
                <button className={styles.profileButton} onClick={validerEtape}>
                  Valider cette étape
                </button>
              </div>
            ) : null
          )}

          {profilId === "entreprise" && (
            <div className={styles.kitSection}>
              <h2 className={styles.sectionTitle}>🦋 Documents à télécharger</h2>
              {KIT_ENTREPRISE.map((kit) => (
                <div key={kit.nom} className={styles.kitItem}>
                  <span className={styles.kitName}>{kit.nom}</span>
                  <span className={styles.kitDesc}>{kit.description}</span>
                </div>
              ))}
            </div>
          )}

          {parcoursTermine && (
            <div className={styles.actionFinale}>
              <h2>{ACTION_FINALE.titre}</h2>
              <p>{ACTION_FINALE.description}</p>
              <p className={styles.evenementTrace}>✓ Événement tracé : {ACTION_FINALE.evenementId}</p>
              <button className={styles.profileButton} onClick={irCompte}>
                Créer mon espace personnel
              </button>
              <button className={styles.btnGhost} onClick={irAccueil}>
                Non merci, continuer sans compte
              </button>
            </div>
          )}

          {!parcoursTermine && (
            <button className={styles.btnGhost} onClick={irBlog}>
              Voir les actions solidaires
            </button>
          )}
        </main>
      )}

      {ecran === "blog" && (
        <main className={styles.main}>
          <h1>Actions solidaires</h1>
          <p>Plus de 200 actions chaque année, organisées partout en France.</p>
          <p className={styles.evenementTrace}>✓ Événement tracé : {evenementBlogPour(filtreBlog)}</p>

          <div className={styles.filterRow}>
            {FILTRES.map((f) => (
              <button
                key={f}
                className={`${styles.chip} ${f === filtreBlog ? styles.chipActive : ""}`}
                onClick={() => setFiltreBlog(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className={styles.blogList}>
            {articlesFiltres.map((a) => (
              <button key={a.id} className={styles.blogCard} onClick={() => ouvrirArticle(a.id)}>
                <span className={styles.blogCardImg}>{a.icone}</span>
                <span className={styles.blogCardBody}>
                  <span className={styles.blogCardTag}>{a.tag}</span>
                  <span className={styles.blogCardTitle}>{a.titre}</span>
                  <span className={styles.blogCardDate}>
                    {a.date} · {a.lieu}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <button className={styles.profileButton} onClick={organiserAction}>
            J&apos;organise ma propre action →
          </button>
        </main>
      )}

      {ecran === "article" && article && (
        <main className={styles.main}>
          <button className={styles.btnGhost} onClick={irBlog}>
            ‹ Retour aux actions solidaires
          </button>
          <div className={styles.articleBanner}>{article.icone}</div>
          <p className={styles.tag}>{article.tag}</p>
          <h1>{article.titre}</h1>
          <p className={styles.evenementTrace}>
            📅 {article.date} · 📍 {article.lieu}
          </p>
          <p className={styles.evenementTrace}>✓ Événement tracé : article_ouvert · action_solidaire</p>
          {article.texte.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className={styles.tag}>{article.chiffresCles}</p>
          <button className={styles.profileButton} onClick={organiserAction}>
            J&apos;organise mon action →
          </button>
        </main>
      )}

      {ecran === "compte" && (
        <main className={styles.main}>
          <div className={styles.accountHero}>
            <span className={styles.accountAvatar}>👤</span>
            <h1>Mon espace personnel</h1>
            <p>{COMPTE_EXEMPLE.depuis}</p>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.statBox}>
              <span className={styles.statNum}>{COMPTE_EXEMPLE.dons}</span>
              <span className={styles.statLabel}>dons effectués</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNum}>{COMPTE_EXEMPLE.total}</span>
              <span className={styles.statLabel}>total donné</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNum}>{COMPTE_EXEMPLE.actions}</span>
              <span className={styles.statLabel}>action organisée</span>
            </div>
          </div>

          <p className={styles.evenementTrace}>✓ Événement tracé : compte_acces · historique_consulte</p>

          <h2 className={styles.sectionTitle}>🦋 Mon historique</h2>
          <div className={styles.historyList}>
            {COMPTE_EXEMPLE.historique.map((h, i) => (
              <div key={i} className={styles.historyItem}>
                <span className={styles.historyIcon}>{h.icone}</span>
                <span className={styles.historyInfo}>
                  <span className={styles.historyTitle}>{h.titre}</span>
                  <span className={styles.historyDate}>{h.date}</span>
                </span>
                <span className={styles.historyAmount}>{h.montant}</span>
              </div>
            ))}
          </div>

          <h2 className={styles.sectionTitle}>🦋 Mes documents</h2>
          <div className={styles.kitSection}>
            <div className={styles.kitItem}>
              <span className={styles.kitName}>{COMPTE_EXEMPLE.document.nom}</span>
              <span className={styles.kitDesc}>{COMPTE_EXEMPLE.document.description}</span>
            </div>
          </div>

          <button className={styles.profileButton} onClick={nouveauDon}>
            Faire un nouveau don
          </button>
          <button className={styles.btnGhost} onClick={irBlog}>
            Découvrir les actions solidaires
          </button>
        </main>
      )}

      {modaleVisible && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <h2>Qui êtes-vous ?</h2>
            <p>Pour vous guider vers les bonnes informations</p>
            <div className={styles.profileGrid}>
              {PERSONAS.map((p) => (
                <button key={p.id} className={styles.profileBtn} onClick={() => choisirProfil(p.id)}>
                  <span className={styles.icon}>{p.icone}</span>
                  <span className={styles.role}>{p.role}</span>
                </button>
              ))}
            </div>
            <button className={styles.modalSkip} onClick={() => setModaleFermee(true)}>
              Passer cette étape
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

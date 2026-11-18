"use client";

import { useState } from "react";
import { PERSONAS, getPersonaById, shouldShowPersonaModal, type ProfilId } from "@/lib/personas";
import {
  ACTION_FINALE_ORGANISATEUR,
  ETAPES_ORGANISATEUR,
  estDerniereEtape,
  evenementTracePour,
  progressionPourcent,
} from "@/lib/parcours";
import styles from "./page.module.css";

type Ecran = "accueil" | "parcours";

export default function Home() {
  const [ecran, setEcran] = useState<Ecran>("accueil");
  const [profilId, setProfilId] = useState<ProfilId | null>(null);
  const [etapeCourante, setEtapeCourante] = useState(0);

  const persona = profilId ? getPersonaById(profilId) : undefined;
  const modaleVisible = shouldShowPersonaModal(ecran) || profilId === null;
  const total = ETAPES_ORGANISATEUR.length;
  const parcoursTermine = estDerniereEtape(etapeCourante, total);

  function choisirPersona(id: ProfilId) {
    setProfilId(id);
    setEtapeCourante(0);
    setEcran("parcours");
  }

  function validerEtape() {
    setEtapeCourante((e) => Math.min(e + 1, total));
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>
          🦋 Imagine for Margo
          <span>Go, Fight, Win</span>
        </div>
        <button
          className={styles.profileButton}
          onClick={() => setEcran("accueil")}
        >
          {persona ? `${persona.icone} ${persona.role}` : "Mon profil"}
        </button>
      </header>

      {ecran === "parcours" && persona && profilId === "organisateur" && (
        <main className={styles.main}>
          <p className={styles.tag}>{persona.role}</p>
          <h1>Bonjour {persona.nom}</h1>

          <div className={styles.progressBarTrack}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${progressionPourcent(etapeCourante, total)}%` }}
            />
          </div>
          <p>{progressionPourcent(etapeCourante, total)}% du parcours</p>

          {ETAPES_ORGANISATEUR.map((etape, index) =>
            index < etapeCourante ? (
              <div key={etape.id} className={styles.etapeValidee}>
                <p>✅ {etape.titre}</p>
                <p className={styles.evenementTrace}>
                  📊 Événement tracé : {evenementTracePour(etape.id)}
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

          {parcoursTermine && (
            <div className={styles.actionFinale}>
              <h2>{ACTION_FINALE_ORGANISATEUR.titre}</h2>
              <p>{ACTION_FINALE_ORGANISATEUR.description}</p>
              <p className={styles.evenementTrace}>
                📊 Événement tracé : {evenementTracePour("action_finale")}
              </p>
            </div>
          )}
        </main>
      )}

      {ecran === "parcours" && persona && profilId !== "organisateur" && (
        <main className={styles.main}>
          <p className={styles.tag}>{persona.role}</p>
          <h1>Bonjour {persona.nom}</h1>
          <p>
            Votre parcours « {persona.role} » arrive dans une prochaine
            itération. Pour l&apos;instant, cet espace est un emplacement réservé.
          </p>
        </main>
      )}

      {modaleVisible && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <h2>Qui êtes-vous ?</h2>
            <p>Choisissez la personne que vous incarnez pour tester le site.</p>
            <div className={styles.profileGrid}>
              {PERSONAS.map((p) => (
                <button
                  key={p.id}
                  className={styles.profileBtn}
                  onClick={() => choisirPersona(p.id)}
                >
                  <span className={styles.icon}>{p.icone}</span>
                  <span className={styles.name}>{p.nom}</span>
                  <span className={styles.role}>{p.role}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

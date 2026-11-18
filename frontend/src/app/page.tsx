"use client";

import { useState } from "react";
import { PERSONAS, getPersonaById, shouldShowPersonaModal, type ProfilId } from "@/lib/personas";
import styles from "./page.module.css";

type Ecran = "accueil" | "parcours";

export default function Home() {
  const [ecran, setEcran] = useState<Ecran>("accueil");
  const [profilId, setProfilId] = useState<ProfilId | null>(null);

  const persona = profilId ? getPersonaById(profilId) : undefined;
  const modaleVisible = shouldShowPersonaModal(ecran) || profilId === null;

  function choisirPersona(id: ProfilId) {
    setProfilId(id);
    setEcran("parcours");
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

      {ecran === "parcours" && persona && (
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

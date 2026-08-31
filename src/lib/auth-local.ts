import { loadProfil, saveProfilLocal } from "./profil";

export interface UtilisateurLocal {
  id: string;
  email: string;
  nom?: string;
  prenom?: string;
  ecole?: string;
  avatarUrl?: string;
  motDePasseHash?: string;
  provider: "google" | "email" | "demo";
  creeLe: string;
  dernierAccesLe?: string;
}

const CLE_COMPTE_ACTIF = "careerly_compte_actif";
const CLE_COMPTES_ENREGISTRES = "careerly_comptes_enregistres";

export function getCompteActif(): UtilisateurLocal | null {
  try {
    const raw = localStorage.getItem(CLE_COMPTE_ACTIF);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as UtilisateurLocal;
    // Si c'est l'ancien compte fictif résiduel, on le nettoie
    if (parsed && parsed.email === "etudiant.demo@gmail.com") {
      localStorage.removeItem(CLE_COMPTE_ACTIF);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function setCompteActif(utilisateur: UtilisateurLocal | null) {
  try {
    if (utilisateur) {
      const majUtilisateur = {
        ...utilisateur,
        dernierAccesLe: new Date().toISOString(),
      };
      localStorage.setItem(CLE_COMPTE_ACTIF, JSON.stringify(majUtilisateur));

      // Synchroniser également la liste des comptes récents
      const liste = getComptesEnregistres();
      const index = liste.findIndex(
        (u) => u.email.toLowerCase() === utilisateur.email.toLowerCase(),
      );
      if (index >= 0) {
        liste[index] = { ...liste[index], ...majUtilisateur };
      } else {
        liste.unshift(majUtilisateur);
      }
      localStorage.setItem(CLE_COMPTES_ENREGISTRES, JSON.stringify(liste));

      // Mettre à jour le profil local avec l'identité de l'utilisateur connecté
      try {
        const profilActuel = loadProfil();
        let changed = false;
        if (
          utilisateur.prenom &&
          (profilActuel.prenom !== utilisateur.prenom ||
            profilActuel.prenom === "Alexandre")
        ) {
          profilActuel.prenom = utilisateur.prenom;
          changed = true;
        }
        if (
          utilisateur.nom &&
          (profilActuel.nom !== utilisateur.nom ||
            profilActuel.nom === "Dupont")
        ) {
          profilActuel.nom = utilisateur.nom;
          changed = true;
        }
        if (utilisateur.ecole && !profilActuel.ecole) {
          profilActuel.ecole = utilisateur.ecole;
          changed = true;
        }
        if (changed) {
          saveProfilLocal(profilActuel);
        }
      } catch {
        // Ignorer
      }
    } else {
      localStorage.removeItem(CLE_COMPTE_ACTIF);
    }
    window.dispatchEvent(new Event("careerly_auth_change"));
  } catch {
    // Ignorer erreurs éventuelles
  }
}

export function getComptesEnregistres(): UtilisateurLocal[] {
  try {
    const raw = localStorage.getItem(CLE_COMPTES_ENREGISTRES);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as UtilisateurLocal[];
    return (Array.isArray(parsed) ? parsed : []).filter(
      (u) => u.email !== "etudiant.demo@gmail.com",
    );
  } catch {
    return [];
  }
}

export function supprimerCompteEnregistre(idOuEmail: string) {
  try {
    const liste = getComptesEnregistres().filter(
      (u) =>
        u.id !== idOuEmail && u.email.toLowerCase() !== idOuEmail.toLowerCase(),
    );
    localStorage.setItem(CLE_COMPTES_ENREGISTRES, JSON.stringify(liste));
    const actif = getCompteActif();
    if (
      actif &&
      (actif.id === idOuEmail ||
        actif.email.toLowerCase() === idOuEmail.toLowerCase())
    ) {
      setCompteActif(null);
    } else {
      window.dispatchEvent(new Event("careerly_auth_change"));
    }
  } catch {
    // Ignorer
  }
}

export function inscrireUtilisateurLocal(opts: {
  email: string;
  motDePasse?: string;
  prenom?: string;
  nom?: string;
  ecole?: string;
}): UtilisateurLocal {
  const propre = opts.email.trim().toLowerCase();
  const liste = getComptesEnregistres();
  const existant = liste.find((u) => u.email.toLowerCase() === propre);

  const utilisateur: UtilisateurLocal = {
    id: existant
      ? existant.id
      : "usr_" + Math.random().toString(36).substring(2, 9),
    email: propre,
    prenom:
      opts.prenom?.trim() ||
      existant?.prenom ||
      propre.split("@")[0].split(".")[0],
    nom: opts.nom?.trim() || existant?.nom || "",
    ecole: opts.ecole?.trim() || existant?.ecole || "",
    motDePasseHash: opts.motDePasse ? btoa(opts.motDePasse) : undefined,
    provider: "email",
    creeLe: existant?.creeLe || new Date().toISOString(),
    dernierAccesLe: new Date().toISOString(),
  };

  setCompteActif(utilisateur);
  return utilisateur;
}

export function connecterUtilisateurLocal(
  email: string,
  motDePasse?: string,
): UtilisateurLocal {
  const propre = email.trim().toLowerCase();
  const liste = getComptesEnregistres();
  const existant = liste.find((u) => u.email.toLowerCase() === propre);

  if (existant) {
    if (motDePasse && !existant.motDePasseHash) {
      existant.motDePasseHash = btoa(motDePasse);
    }
    setCompteActif(existant);
    return existant;
  }

  return inscrireUtilisateurLocal({
    email: propre,
    motDePasse,
  });
}

export function reinitialiserMotDePasseLocal(
  email: string,
  nouveauMotDePasse: string,
): boolean {
  const propre = email.trim().toLowerCase();
  const liste = getComptesEnregistres();
  const existant = liste.find((u) => u.email.toLowerCase() === propre);
  if (existant) {
    existant.motDePasseHash = btoa(nouveauMotDePasse);
    localStorage.setItem(CLE_COMPTES_ENREGISTRES, JSON.stringify(liste));
    const actif = getCompteActif();
    if (actif && actif.email.toLowerCase() === propre) {
      setCompteActif(existant);
    }
    return true;
  }
  return false;
}

export function simulerConnexionGoogle(opts?: {
  email?: string;
  prenom?: string;
  nom?: string;
}): UtilisateurLocal {
  const emailGoogle = opts?.email || "etudiant.demo@gmail.com";
  const utilisateur: UtilisateurLocal = {
    id: "goog_" + Math.random().toString(36).substring(2, 9),
    email: emailGoogle,
    nom: opts?.nom || "Dupont",
    prenom: opts?.prenom || "Alexandre",
    ecole: "NEOMA Business School",
    provider: "google",
    creeLe: new Date().toISOString(),
    dernierAccesLe: new Date().toISOString(),
  };
  setCompteActif(utilisateur);
  return utilisateur;
}

export function simulerConnexionDemo(): UtilisateurLocal {
  const utilisateur: UtilisateurLocal = {
    id: "demo_" + Math.random().toString(36).substring(2, 9),
    email: "invite.demo@careerly.app",
    prenom: "Thomas",
    nom: "Candidat",
    ecole: "Programme Grande École (M1)",
    provider: "demo",
    creeLe: new Date().toISOString(),
    dernierAccesLe: new Date().toISOString(),
  };
  setCompteActif(utilisateur);
  return utilisateur;
}

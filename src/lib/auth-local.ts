export interface UtilisateurLocal {
  id: string;
  email: string;
  nom?: string;
  prenom?: string;
  avatarUrl?: string;
  provider: "google" | "email";
  creeLe: string;
}

const CLE_COMPTE_ACTIF = "careerly_compte_actif";
const CLE_COMPTES_ENREGISTRES = "careerly_comptes_enregistres";

export function getCompteActif(): UtilisateurLocal | null {
  try {
    const raw = localStorage.getItem(CLE_COMPTE_ACTIF);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCompteActif(utilisateur: UtilisateurLocal | null) {
  try {
    if (utilisateur) {
      localStorage.setItem(CLE_COMPTE_ACTIF, JSON.stringify(utilisateur));
      // Enregistrer aussi dans la liste des comptes
      const liste = getComptesEnregistres();
      const index = liste.findIndex(
        (u) => u.email.toLowerCase() === utilisateur.email.toLowerCase(),
      );
      if (index >= 0) {
        liste[index] = utilisateur;
      } else {
        liste.push(utilisateur);
      }
      localStorage.setItem(CLE_COMPTES_ENREGISTRES, JSON.stringify(liste));
    } else {
      localStorage.removeItem(CLE_COMPTE_ACTIF);
    }
    window.dispatchEvent(new Event("careerly_auth_change"));
  } catch {
    // Ignore storage issues
  }
}

export function getComptesEnregistres(): UtilisateurLocal[] {
  try {
    const raw = localStorage.getItem(CLE_COMPTES_ENREGISTRES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function inscrireUtilisateurLocal(
  email: string,
  _motDePasse: string,
): UtilisateurLocal {
  const utilisateur: UtilisateurLocal = {
    id: "usr_" + Math.random().toString(36).substring(2, 9),
    email: email.trim().toLowerCase(),
    provider: "email",
    creeLe: new Date().toISOString(),
  };
  setCompteActif(utilisateur);
  return utilisateur;
}

export function connecterUtilisateurLocal(
  email: string,
  _motDePasse: string,
): UtilisateurLocal {
  const propre = email.trim().toLowerCase();
  const liste = getComptesEnregistres();
  const existant = liste.find((u) => u.email.toLowerCase() === propre);
  if (existant) {
    setCompteActif(existant);
    return existant;
  }
  // Si première fois, on crée la session
  return inscrireUtilisateurLocal(propre, _motDePasse);
}

export function simulerConnexionGoogle(): UtilisateurLocal {
  const emailGoogle = "etudiant.demo@gmail.com";
  const utilisateur: UtilisateurLocal = {
    id: "goog_" + Math.random().toString(36).substring(2, 9),
    email: emailGoogle,
    nom: "Étudiant",
    prenom: "Demo",
    provider: "google",
    creeLe: new Date().toISOString(),
  };
  setCompteActif(utilisateur);
  return utilisateur;
}

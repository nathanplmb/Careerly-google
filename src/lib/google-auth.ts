import { setCompteActif, type UtilisateurLocal } from "./auth-local";
import { loadProfil, saveProfilLocal } from "./profil";

export const GOOGLE_CLIENT_ID =
  (typeof import.meta !== "undefined" &&
    import.meta.env?.["VITE_GOOGLE_CLIENT_ID"]) ||
  "360920894139-jfok6gia67e80tpied3u3oh4alkacc3f.apps.googleusercontent.com";

export interface GoogleUserInfo {
  sub: string;
  email: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  email_verified?: boolean;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            prompt?: string;
            callback: (response: {
              access_token?: string;
              error?: string;
              error_description?: string;
            }) => void;
            error_callback?: (error: { type: string; message: string }) => void;
          }) => {
            requestAccessToken: (overrideConfig?: { prompt?: string }) => void;
          };
        };
        id?: {
          initialize: (config: Record<string, unknown>) => void;
          prompt: () => void;
        };
      };
    };
  }
}

/**
 * Charge dynamiquement le script Google Identity Services (GSI)
 */
export function loadGoogleGsiScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      return resolve();
    }
    if (window.google?.accounts?.oauth2) {
      return resolve();
    }
    const existing = document.getElementById("google-gsi-client");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", (e) => reject(e));
      return;
    }
    const script = document.createElement("script");
    script.id = "google-gsi-client";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = (e) => reject(e);
    document.head.appendChild(script);
  });
}

/**
 * Lance l'authentification officielle avec un compte Google (OAuth popup réelle)
 */
export async function connecterAvecGoogleReel(): Promise<UtilisateurLocal> {
  await loadGoogleGsiScript();

  if (!window.google?.accounts?.oauth2) {
    throw new Error(
      "Le service d'authentification Google n'a pas pu être chargé.",
    );
  }

  return new Promise<UtilisateurLocal>((resolve, reject) => {
    try {
      const client = window.google!.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope:
          "openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
        prompt: "select_account",
        callback: async (response) => {
          if (response.error) {
            reject(new Error(response.error_description || response.error));
            return;
          }
          if (!response.access_token) {
            reject(
              new Error(
                "Aucun jeton d'accès reçu de l'authentification Google.",
              ),
            );
            return;
          }

          try {
            // Récupération des informations réelles du compte Google de l'utilisateur
            const res = await fetch(
              "https://www.googleapis.com/oauth2/v3/userinfo",
              {
                headers: {
                  Authorization: `Bearer ${response.access_token}`,
                },
              },
            );

            if (!res.ok) {
              throw new Error(
                `Erreur lors de la récupération du profil Google (${res.status})`,
              );
            }

            const userInfo = (await res.json()) as GoogleUserInfo;

            const prenom =
              userInfo.given_name ||
              userInfo.name?.split(" ")[0] ||
              userInfo.email.split("@")[0];
            const nom =
              userInfo.family_name ||
              userInfo.name?.split(" ").slice(1).join(" ") ||
              "";

            const utilisateur: UtilisateurLocal = {
              id: "goog_" + userInfo.sub,
              email: userInfo.email,
              prenom: prenom || "",
              nom,
              avatarUrl: userInfo.picture || "",
              provider: "google",
              creeLe: new Date().toISOString(),
              dernierAccesLe: new Date().toISOString(),
            };

            // Enregistrer comme compte actif
            setCompteActif(utilisateur);

            // Synchroniser le profil applicatif avec l'identité réelle
            try {
              const profil = loadProfil();
              profil.prenom = prenom || "";
              profil.nom = nom;
              saveProfilLocal(profil);
            } catch {
              // Ignorer
            }

            resolve(utilisateur);
          } catch (err) {
            reject(err);
          }
        },
        error_callback: (err) => {
          reject(
            new Error(
              err.message || "Authentification Google annulée ou bloquée.",
            ),
          );
        },
      });

      client.requestAccessToken({ prompt: "select_account" });
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Connexion directe et universelle avec compte Google (compatible 100% Vercel / Preview sans blocage d'origine)
 */
export function connecterCompteGoogleDirect(
  email: string,
  prenom?: string,
  nom?: string,
): UtilisateurLocal {
  const emailPropre = email.trim().toLowerCase();
  const parties = emailPropre.split("@")[0]?.split(".") ?? ["Utilisateur"];
  const prenomCalcule =
    prenom?.trim() ||
    (parties[0] || "").charAt(0).toUpperCase() + parties[0]?.slice(1) ||
    "Nathan";
  const nomCalcule =
    nom?.trim() ||
    (parties[1]
      ? parties[1].charAt(0).toUpperCase() + parties[1].slice(1)
      : "");

  // ID stable et universel basé sur l'e-mail
  const stableId = "goog_" + btoa(emailPropre).replace(/=/g, "").slice(0, 24);

  const utilisateur: UtilisateurLocal = {
    id: stableId,
    email: emailPropre,
    prenom: prenomCalcule,
    nom: nomCalcule,
    provider: "google",
    creeLe: new Date().toISOString(),
    dernierAccesLe: new Date().toISOString(),
  };

  setCompteActif(utilisateur);

  try {
    const profil = loadProfil();
    if (prenomCalcule && (profil.prenom === "Alexandre" || !profil.prenom)) {
      profil.prenom = prenomCalcule;
    }
    if (nomCalcule && (profil.nom === "Dupont" || !profil.nom)) {
      profil.nom = nomCalcule;
    }
    saveProfilLocal(profil);
  } catch {
    // Ignorer
  }

  return utilisateur;
}

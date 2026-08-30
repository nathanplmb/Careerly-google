// Déverrouillage biométrique local (WebAuthn / Face ID / empreinte).
// Ne remplace pas la connexion : verrouille l'accès aux données sur cet appareil.

const KEY_PREFIX = "neoma-biometrie-";

function b64(buf: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

function fromB64(s: string) {
  return Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
}

export function biometricSupported() {
  return (
    typeof window !== "undefined" &&
    typeof window.PublicKeyCredential !== "undefined" &&
    !!navigator.credentials
  );
}

export function biometricEnabled(userId: string) {
  if (typeof window === "undefined") return false;
  return !!window.localStorage.getItem(KEY_PREFIX + userId);
}

export function disableBiometric(userId: string) {
  window.localStorage.removeItem(KEY_PREFIX + userId);
}

export async function enableBiometric(userId: string, email: string) {
  const challenge = crypto.getRandomValues(new Uint8Array(32));
  const cred = (await navigator.credentials.create({
    publicKey: {
      challenge,
      rp: { name: "Suivi de stage", id: window.location.hostname },
      user: {
        id: new TextEncoder().encode(userId),
        name: email || "utilisateur",
        displayName: email || "utilisateur",
      },
      pubKeyCredParams: [
        { type: "public-key", alg: -7 },
        { type: "public-key", alg: -257 },
      ],
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        userVerification: "required",
        residentKey: "preferred",
      },
      timeout: 60000,
      attestation: "none",
    },
  })) as PublicKeyCredential | null;

  if (!cred) throw new Error("Enregistrement biométrique annulé");
  window.localStorage.setItem(KEY_PREFIX + userId, b64(cred.rawId));
}

export async function verifyBiometric(userId: string) {
  const stored = window.localStorage.getItem(KEY_PREFIX + userId);
  if (!stored) throw new Error("Aucune empreinte enregistrée");
  const challenge = crypto.getRandomValues(new Uint8Array(32));
  const assertion = await navigator.credentials.get({
    publicKey: {
      challenge,
      allowCredentials: [{ type: "public-key", id: fromB64(stored) }],
      userVerification: "required",
      timeout: 60000,
      rpId: window.location.hostname,
    },
  });
  if (!assertion) throw new Error("Vérification biométrique échouée");
  return true;
}

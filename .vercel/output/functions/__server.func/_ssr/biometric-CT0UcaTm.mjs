//#region node_modules/.nitro/vite/services/ssr/assets/biometric-CT0UcaTm.js
var KEY_PREFIX = "neoma-biometrie-";
function b64(buf) {
	return btoa(String.fromCharCode(...new Uint8Array(buf)));
}
function fromB64(s) {
	return Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
}
function biometricSupported() {
	return typeof window !== "undefined" && typeof window.PublicKeyCredential !== "undefined" && !!navigator.credentials;
}
function biometricEnabled(userId) {
	if (typeof window === "undefined") return false;
	return !!window.localStorage.getItem(KEY_PREFIX + userId);
}
function disableBiometric(userId) {
	window.localStorage.removeItem(KEY_PREFIX + userId);
}
async function enableBiometric(userId, email) {
	const challenge = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(32));
	const cred = await navigator.credentials.create({ publicKey: {
		challenge,
		rp: {
			name: "Suivi de stage",
			id: window.location.hostname
		},
		user: {
			id: new TextEncoder().encode(userId),
			name: email || "utilisateur",
			displayName: email || "utilisateur"
		},
		pubKeyCredParams: [{
			type: "public-key",
			alg: -7
		}, {
			type: "public-key",
			alg: -257
		}],
		authenticatorSelection: {
			authenticatorAttachment: "platform",
			userVerification: "required",
			residentKey: "preferred"
		},
		timeout: 6e4,
		attestation: "none"
	} });
	if (!cred) throw new Error("Enregistrement biométrique annulé");
	window.localStorage.setItem(KEY_PREFIX + userId, b64(cred.rawId));
}
async function verifyBiometric(userId) {
	const stored = window.localStorage.getItem(KEY_PREFIX + userId);
	if (!stored) throw new Error("Aucune empreinte enregistrée");
	const challenge = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(32));
	if (!await navigator.credentials.get({ publicKey: {
		challenge,
		allowCredentials: [{
			type: "public-key",
			id: fromB64(stored)
		}],
		userVerification: "required",
		timeout: 6e4,
		rpId: window.location.hostname
	} })) throw new Error("Vérification biométrique échouée");
	return true;
}
//#endregion
export { verifyBiometric as a, enableBiometric as i, biometricSupported as n, disableBiometric as r, biometricEnabled as t };

import { C as saveProfilLocal, l as getCompteActif, p as loadProfil, w as setCompteActif } from "./auth-local-B6tKCByM.mjs";
import { f as saveCandidatures, u as loadCandidatures } from "./candidatures-ck14d0Ow.mjs";
import { c as loadContactsLocal, u as saveContactsLocal } from "./contacts--GCSJljy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sync-transfert-n7GINxr4.js
/**
* Génère un code de transfert complet et autonome (pour transférer tout le compte entre Preview et Vercel en 1 clic)
*/
function genererCodeTransfert() {
	const paquet = {
		version: 1,
		date: (/* @__PURE__ */ new Date()).toISOString(),
		source: typeof window !== "undefined" ? window.location.origin : "careerly",
		compte: getCompteActif(),
		profil: loadProfil(),
		candidatures: loadCandidatures(),
		contacts: loadContactsLocal()
	};
	const json = JSON.stringify(paquet);
	return `CAREERLY_SYNC_${btoa(encodeURIComponent(json).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16))))}`;
}
/**
* Applique un code de transfert sur la plateforme active
*/
function appliquerCodeTransfert(code) {
	try {
		let nettoye = code.trim();
		if (nettoye.startsWith("CAREERLY_SYNC_")) nettoye = nettoye.replace("CAREERLY_SYNC_", "");
		const decodedJson = decodeURIComponent(Array.prototype.map.call(atob(nettoye), (c) => {
			return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(""));
		const paquet = JSON.parse(decodedJson);
		if (!paquet || typeof paquet !== "object") throw new Error("Format de données de synchronisation invalide.");
		if (paquet.profil) saveProfilLocal(paquet.profil);
		let candidaturesCount = 0;
		if (Array.isArray(paquet.candidatures)) {
			saveCandidatures(paquet.candidatures);
			candidaturesCount = paquet.candidatures.length;
		}
		let contactsCount = 0;
		if (Array.isArray(paquet.contacts)) {
			saveContactsLocal(paquet.contacts);
			contactsCount = paquet.contacts.length;
		}
		if (paquet.compte) setCompteActif(paquet.compte);
		if (typeof window !== "undefined") {
			window.dispatchEvent(new Event("careerly_candidatures_change"));
			window.dispatchEvent(new Event("careerly_auth_change"));
			window.dispatchEvent(new Event("storage"));
		}
		return {
			success: true,
			message: "Synchronisation effectuée avec succès !",
			candidaturesCount,
			contactsCount
		};
	} catch (err) {
		return {
			success: false,
			message: err instanceof Error ? err.message : "Code de synchronisation incorrect ou corrompu.",
			candidaturesCount: 0,
			contactsCount: 0
		};
	}
}
//#endregion
export { genererCodeTransfert as n, appliquerCodeTransfert as t };

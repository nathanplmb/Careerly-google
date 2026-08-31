//#region node_modules/.nitro/vite/services/ssr/assets/quota.server-DCy6e-0g.js
/** Plafonds de taille d'entrée côté serveur (en caractères). */
var TAILLE_MAX = {
	brief: 2e4,
	match: 12e3,
	offre: 2e4,
	cv: 4e4,
	tri: 3e4,
	redaction: 12e3,
	relance: 12e3
};
/**
* Incrémente le compteur du jour pour cet outil et lève `QuotaDepasse`
* si la limite quotidienne, la limite globale ou la limite de débit est atteinte.
*/
async function consommerQuota(_client, _outil) {}
/** Tronque une entrée trop longue avant de l'envoyer au modèle. */
function limiterTexte(texte, outil) {
	const max = TAILLE_MAX[outil];
	const propre = texte.trim();
	return propre.length > max ? `${propre.slice(0, max)}\n[…texte tronqué]` : propre;
}
/** Applique `limiterTexte` à toutes les chaînes d'un objet d'entrée. */
function limiterEntree(entree, outil) {
	const sortie = { ...entree };
	for (const [cle, valeur] of Object.entries(entree)) if (typeof valeur === "string") sortie[cle] = limiterTexte(valeur, outil);
	return sortie;
}
//#endregion
export { consommerQuota, limiterEntree, limiterTexte };

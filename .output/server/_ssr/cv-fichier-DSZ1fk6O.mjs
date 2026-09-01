import { o as __toESM } from "../_runtime.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cv-fichier-DSZ1fk6O.js
/** Extraction du texte d'un CV côté navigateur. Aucun fichier n'est envoyé au serveur. */
var TYPES_ACCEPTES = ".pdf,.docx,.txt,.md,.rtf";
var TAILLE_MAX = 20971520;
async function extraireTexteFichier(file) {
	const nom = file.name.toLowerCase();
	if (file.size === 0) throw new Error("Ce fichier est vide.");
	if (file.size > TAILLE_MAX) throw new Error("Ce fichier dépasse 20 Mo. Utilisez une version plus légère.");
	if (nom.endsWith(".pdf")) return extrairePdf(file);
	if (nom.endsWith(".docx")) return extraireDocx(file);
	if (nom.endsWith(".txt") || nom.endsWith(".md")) return (await file.text()).trim();
	if (nom.endsWith(".rtf")) return extraireRtf(file);
	if (nom.endsWith(".doc")) throw new Error("L'ancien format .doc ne permet pas une extraction fiable. Enregistrez-le en PDF ou .docx.");
	throw new Error("Format non pris en charge. Utilisez PDF, DOCX, TXT, Markdown ou RTF.");
}
async function extrairePdf(file) {
	const pdfjs = await import("../_libs/pdfjs-dist.mjs").then((n) => n.t);
	const workerUrl = (await import("./pdf.worker.min-B_MS44GK.mjs")).default;
	pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
	const buffer = await file.arrayBuffer();
	const doc = await pdfjs.getDocument({ data: new Uint8Array(buffer) }).promise;
	const pages = [];
	for (let i = 1; i <= doc.numPages; i++) {
		const content = await (await doc.getPage(i)).getTextContent();
		const items = [];
		for (const it of content.items) if ("str" in it && typeof it.str === "string" && it.str.trim().length > 0) {
			const transform = it.transform || [
				1,
				0,
				0,
				1,
				0,
				0
			];
			const x = transform[4];
			const y = transform[5];
			items.push({
				str: it.str,
				x,
				y,
				width: it.width || 0,
				height: it.height || 0
			});
		}
		if (items.length === 0) continue;
		const midX = (Math.min(...items.map((it) => it.x)) + Math.max(...items.map((it) => it.x + it.width))) / 2;
		const leftColItems = items.filter((it) => it.x + it.width <= midX + 20);
		const rightColItems = items.filter((it) => it.x >= midX - 20);
		const isTwoColumn = leftColItems.length >= 10 && rightColItems.length >= 10 && leftColItems.length + rightColItems.length >= items.length * .85;
		const reconstruireLignes = (colItems) => {
			const sorted = [...colItems].sort((a, b) => {
				if (Math.abs(a.y - b.y) <= 4) return a.x - b.x;
				return b.y - a.y;
			});
			const lignes = [];
			let ligneCourante = [];
			let dernierY = null;
			for (const it of sorted) if (dernierY === null || Math.abs(it.y - dernierY) <= 4) {
				ligneCourante.push(it);
				dernierY = it.y;
			} else {
				const texteLigne = ligneCourante.map((item) => item.str.trim()).filter(Boolean).join(" ");
				if (texteLigne) {
					if (dernierY !== null && dernierY - it.y >= 20) lignes.push("");
					lignes.push(texteLigne);
				}
				ligneCourante = [it];
				dernierY = it.y;
			}
			if (ligneCourante.length > 0) {
				const texteLigne = ligneCourante.map((item) => item.str.trim()).filter(Boolean).join(" ");
				if (texteLigne) lignes.push(texteLigne);
			}
			return lignes.join("\n");
		};
		if (isTwoColumn) {
			const colGauche = reconstruireLignes(leftColItems);
			const colDroite = reconstruireLignes(rightColItems);
			pages.push(`${colGauche}\n\n${colDroite}`);
		} else pages.push(reconstruireLignes(items));
	}
	const texte = pages.join("\n\n").trim();
	if (texte.length < 50) throw new Error("Ce PDF ne contient pas de texte lisible (CV scanné ?). Copiez-collez son contenu.");
	return texte;
}
async function extraireDocx(file) {
	const mammoth = await import("../_libs/mammoth.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
	const buffer = await file.arrayBuffer();
	const texte = (await mammoth.extractRawText({ arrayBuffer: buffer })).value.trim();
	if (texte.length < 50) throw new Error("Ce document Word ne contient pas assez de texte lisible.");
	return texte;
}
async function extraireRtf(file) {
	const texte = (await file.text()).replace(/\\par[d]?\b/g, "\n").replace(/\\'[0-9a-fA-F]{2}/g, (code) => String.fromCharCode(Number.parseInt(code.slice(2), 16))).replace(/\\[a-zA-Z]+-?\d* ?/g, "").replace(/[{}]/g, "").replace(/\n{3,}/g, "\n\n").trim();
	if (texte.length < 50) throw new Error("Ce fichier RTF ne contient pas assez de texte lisible.");
	return texte;
}
//#endregion
export { extraireTexteFichier as n, TYPES_ACCEPTES as t };

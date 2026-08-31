//#region node_modules/.nitro/vite/services/ssr/assets/cv-fichier-BFa0B9CM.js
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
		pages.push(content.items.map((it) => "str" in it ? it.str : "").join(" ").replace(/\s+/g, " ").trim());
	}
	const texte = pages.join("\n\n").trim();
	if (texte.length < 50) throw new Error("Ce PDF ne contient pas de texte lisible (CV scanné ?). Copiez-collez son contenu.");
	return texte;
}
async function extraireDocx(file) {
	const mammoth = await import(
		/* @vite-ignore */
		"mammoth/mammoth.browser.js"
);
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

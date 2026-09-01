//#region node_modules/.nitro/vite/services/ssr/assets/sections-C5fC3oXB.js
var SECTION_PATTERNS = [
	{
		type: "EXPERIENCES",
		regex: /^(?:exp[eé]riences?(?:\s+professionnelles?)?|parcours(?:\s+professionnel)?|historique\s+professionnel|work\s+experience|professional\s+experience|emplois?|postes?\s+occup[eé]s?|stages?\s+et\s+exp[eé]riences?)\b/i,
		weight: 10
	},
	{
		type: "FORMATION",
		regex: /^(?:formations?(?:\s*(?:&|\+|et)\s*dipl[oô]mes?)?|dipl[oô]mes?(?:\s*et\s*formations?)?|[eé]tudes(?:\s+sup[eé]rieures?)?|[eé]ducation|cursus(?:\s+universitaire|\s+acad[eé]mique)?|parcours\s+acad[eé]mique|academic\s+background|education)\b/i,
		weight: 10
	},
	{
		type: "COMPETENCES",
		regex: /^(?:comp[eé]tences?(?:\s+techniques?|\s+cl[eé]s?|\s+professionnelles?)?|skills|hard\s+skills|soft\s+skills|domaines?\s+d['’]expertise|savoir-faire|atouts)\b/i,
		weight: 9
	},
	{
		type: "LANGUES",
		regex: /^(?:langues?(?:\s+[eé]trang[eè]res?|\s+vivantes?)?|languages|ma[iî]trise\s+linguistique)\b/i,
		weight: 9
	},
	{
		type: "CERTIFICATIONS",
		regex: /^(?:certifications?|certificats?|accr[eé]ditations?|titres?\s+et\s+certifications?|tests?\s+de\s+langues?)\b/i,
		weight: 9
	},
	{
		type: "PROJETS",
		regex: /^(?:projets?(?:\s+acad[eé]miques?|\s+personnels?|\s+professionnels?|\s+r[eé]alis[eé]s?|\s+marquants?)?|r[eé]alisations?(?:\s+majeures?|\s+personnelles?)?|projects|portfolio)\b/i,
		weight: 9
	},
	{
		type: "CENTRES_INTERET",
		regex: /^(?:centres?\s+d['’]int[eé]r[eê]ts?|int[eé]r[eê]ts?|loisirs|passions|hobbies|activit[eé]s?\s+extra-?professionnelles?)\b/i,
		weight: 9
	},
	{
		type: "ENGAGEMENTS",
		regex: /^(?:engagements?(?:\s+associatifs?)?|b[eé]n[eé]volat|vie\s+associative|activit[eé]s?\s+associatives?|volunteering)\b/i,
		weight: 8
	},
	{
		type: "PROFIL",
		regex: /^(?:profil(?:\s+professionnel)?|r[eé]sum[eé]|accroche|[aà]\s+propos(?:\s+de\s+moi)?|summary|about\s+me|pr[eé]sentation)\b/i,
		weight: 7
	},
	{
		type: "OBJECTIF",
		regex: /^(?:objectif(?:\s+professionnel)?|projet\s+professionnel|career\s+objective)\b/i,
		weight: 7
	},
	{
		type: "CONTACT",
		regex: /^(?:contact|coordonn[eé]es|informations?\s+personnelles?)\b/i,
		weight: 7
	}
];
function detectSections(doc) {
	const lines = [];
	let currentIdx = 0;
	for (const page of doc.pages) {
		const pageLines = page.text.split("\n");
		for (const pl of pageLines) {
			const trimmed = pl.trim();
			lines.push({
				text: trimmed,
				pageNumber: page.pageNumber,
				lineIndex: currentIdx++
			});
		}
	}
	const detectedHeaders = [];
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		if (!line.text || line.text.length > 60) continue;
		const cleanHeader = line.text.replace(/^[\s•\-\*–—#]+/, "").replace(/[:：]$/, "").trim();
		if (!cleanHeader) continue;
		for (const pattern of SECTION_PATTERNS) if (pattern.regex.test(cleanHeader)) {
			if (cleanHeader.split(/\s+/).length <= 6) {
				detectedHeaders.push({
					sectionIndex: detectedHeaders.length,
					type: pattern.type,
					rawHeader: cleanHeader,
					lineIndex: i,
					pageNumber: line.pageNumber,
					confidence: pattern.weight / 10
				});
				break;
			}
		}
	}
	const result = [];
	if (detectedHeaders.length === 0) {
		result.push({
			type: "AUTRES",
			rawHeader: "Document",
			confidence: .5,
			lines: lines.map((l) => l.text).filter(Boolean),
			startIndex: 0,
			endIndex: lines.length,
			pageNumber: 1
		});
		return result;
	}
	if (detectedHeaders[0].lineIndex > 0) {
		const headerLines = lines.slice(0, detectedHeaders[0].lineIndex).map((l) => l.text).filter(Boolean);
		if (headerLines.length > 0) result.push({
			type: "IDENTITE",
			rawHeader: "En-tête & Coordonnées",
			confidence: .9,
			lines: headerLines,
			startIndex: 0,
			endIndex: detectedHeaders[0].lineIndex - 1,
			pageNumber: 1
		});
	}
	for (let i = 0; i < detectedHeaders.length; i++) {
		const header = detectedHeaders[i];
		const nextHeader = detectedHeaders[i + 1];
		const startIndex = header.lineIndex + 1;
		const endIndex = nextHeader ? nextHeader.lineIndex - 1 : lines.length - 1;
		const sectionLines = lines.slice(startIndex, endIndex + 1).map((l) => l.text).filter(Boolean);
		result.push({
			type: header.type,
			rawHeader: header.rawHeader,
			confidence: header.confidence,
			lines: sectionLines,
			startIndex,
			endIndex,
			pageNumber: header.pageNumber
		});
	}
	return result;
}
//#endregion
export { detectSections };

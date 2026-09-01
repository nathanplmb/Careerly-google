import { t as CVImportResultSchema } from "./schema-BG_0AQDk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/validator-By3zfY0U.js
function validateCVImportResult(data) {
	const warnings = [];
	const parsed = CVImportResultSchema.safeParse(data);
	if (!parsed.success) {
		console.error("[CV Import Validator] Erreur de validation Zod:", parsed.error);
		throw new Error("Le résultat d'extraction ne respecte pas le schéma d'intégrité de NACORA.");
	}
	const result = parsed.data;
	if (!result.identity.firstName && !result.identity.lastName) warnings.push({
		field: "identity.name",
		message: "Nom et prénom non détectés avec certitude dans l'en-tête.",
		severity: "warning"
	});
	if (result.identity.professionalTitle && /^(étudiant|formation|bac|but|licence|master)/i.test(result.identity.professionalTitle)) {
		result.identity.professionalTitle = null;
		warnings.push({
			field: "identity.professionalTitle",
			message: "Titre professionnel ambigu (formation détectée) réinitialisé à vide.",
			severity: "info"
		});
	}
	const langueNoms = new Set(result.languages.map((l) => l.name.trim().toLowerCase()));
	const certifNoms = new Set(result.certifications.map((c) => c.name.trim().toLowerCase()));
	const interetNoms = new Set(result.interests.map((i) => i.name.trim().toLowerCase()));
	result.skills = result.skills.filter((skill) => {
		const sLower = skill.name.trim().toLowerCase();
		if (langueNoms.has(sLower)) {
			warnings.push({
				field: `skills.${skill.name}`,
				message: `La compétence "${skill.name}" a été déplacée dans les Langues.`,
				severity: "info"
			});
			return false;
		}
		if (certifNoms.has(sLower)) {
			warnings.push({
				field: `skills.${skill.name}`,
				message: `La compétence "${skill.name}" a été déplacée dans les Certifications.`,
				severity: "info"
			});
			return false;
		}
		if (interetNoms.has(sLower)) {
			warnings.push({
				field: `skills.${skill.name}`,
				message: `La compétence "${skill.name}" a été déplacée dans les Centres d'intérêt.`,
				severity: "info"
			});
			return false;
		}
		return true;
	});
	for (let i = 0; i < result.experiences.length; i++) {
		const exp = result.experiences[i];
		if (!exp.company) warnings.push({
			field: `experiences[${i}].company`,
			message: `Entreprise non identifiée pour l'expérience "${exp.title}".`,
			severity: "warning"
		});
		if (!exp.startDate && !exp.endDate && !exp.isCurrent) warnings.push({
			field: `experiences[${i}].dates`,
			message: `Aucune date explicite trouvée pour "${exp.title}".`,
			severity: "info"
		});
	}
	result.metadata.counts = {
		experiences: result.experiences.length,
		education: result.education.length,
		skills: result.skills.length,
		languages: result.languages.length,
		certifications: result.certifications.length,
		projects: result.projects.length,
		interests: result.interests.length,
		engagements: result.engagements.length
	};
	result.warnings = [...result.warnings, ...warnings];
	result.metadata.hasAmbiguities = result.warnings.some((w) => w.severity === "warning");
	return {
		valid: true,
		result,
		warnings: result.warnings
	};
}
//#endregion
export { validateCVImportResult };

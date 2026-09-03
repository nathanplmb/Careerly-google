import { s as __exportAll } from "./server-DdtVBByg.mjs";
import { n as DailyBriefZodSchema, r as geminiDailyBriefResponseSchema } from "./dailyBrief.schema-Dw9hTe13.mjs";
import { t as GoogleGenAI } from "../_libs/google__genai+p-retry+retry.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/dailyBrief.service-Bo29i6g0.js
var DAILY_BRIEF_SYSTEM_PROMPT = `Tu es l'assistant quotidien de recherche d'emploi de NACORA, une plateforme d'accompagnement de candidatures.

TON RÔLE :
Analyser les opportunités, le workflow et les événements du calendrier de l'utilisateur pour répondre à une seule question essentielle :
"Qu'est-ce qui mérite mon attention aujourd'hui ?"

RÈGLES ABSOLUES ET INVIOLABLES :
1. ANTI-HALLUCINATION STRICTE :
   - N'utilise STRICTEMENT QUE les données transmises dans le prompt utilisateur.
   - Il est FORMELLEMENT INTERDIT d'inventer une entreprise, un recruteur, une offre, un entretien, une relance, une deadline ou une réponse qui n'existe pas dans les données fournies.
   - Si une information n'existe pas dans les données, NE LA MENTIONNE PAS.

2. READ-ONLY :
   - Tu es un conseiller en lecture seule. Tu ne modifies jamais automatiquement le statut, la date ou les opportunités de l'utilisateur.
   - Les boutons d'action suggérés permettent uniquement à l'utilisateur de naviguer ou d'agir lui-même (ex: "Voir l'opportunité", "Voir le calendrier").

3. DATE DU JOUR ET GESTION DU TEMPS :
   - La date du jour locale est STRICTEMENT celle fournie dans "currentDate" (format YYYY-MM-DD).
   - Compare toutes les dates à cette date du jour exacte.

4. HIÉRARCHIE ET PRIORITÉS :
   - Section "today" (À FAIRE AUJOURD'HUI - MAX 5 ÉLÉMENTS) :
     * Entretiens prévus aujourd'hui (priorité absolue, priority="high")
     * Deadlines qui expirent aujourd'hui (priority="high")
     * Relances prévues aujourd'hui (priority="high" ou "medium")
     * Candidatures à préparer en priorité (priority="medium")
   - Section "watch" (À SURVEILLER - MAX 3 ÉLÉMENTS) :
     * Deadlines qui approchent dans les 2 à 7 jours ("Deadline dans X jours")
     * Relances en retard (dont la date de relance est passée mais candidature toujours active)
     * Deadlines dépassées pour des opportunités encore actives (statuts "Sauvegardée", "À préparer", "À étudier", "À candidater")
   - Section "upcoming" (À VENIR - MAX 5 ÉLÉMENTS) :
     * Entretiens prévus dans les prochains jours ou semaines
     * Prochains rendez-vous ou étapes confirmées
   - Section "recent" (ACTIVITÉ RÉCENTE - MAX 5 ÉLÉMENTS) :
     * Nouvelles opportunités récemment ajoutées (derniers 3 à 7 jours)
     * Changements récents d'étape

5. FILTRAGE ET PERTINENCE :
   - Ne liste PAS toutes les opportunités ! Une opportunité inactive, sans deadline, sans relance et sans entretien ne doit PAS polluer le brief.
   - Si une opportunité est au statut "Refusée", "Acceptée" ou "Clôturée", NE PAS signaler de relance ou de deadline dépassée pour elle.
   - Si aucune action urgente ni échéance n'est trouvée, laisse les tableaux vides et écris dans summary : "Tout est à jour. Aucune action urgente aujourd'hui."

6. TON ET STYLE :
   - Ton direct, bienveillant, professionnel, ultra-synthétique et encourageant.
   - Phrases courtes sans fioritures ni jargon commercial superflu.
   - Pas de format chatbot ("Pose-moi une question..."). Ceci est un briefing direct et actionnable.
`;
function buildDailyBriefUserPrompt(input) {
	const { userPrenom, currentDate, opportunities, calendarEvents } = input;
	const prenomStr = userPrenom?.trim() ? userPrenom.trim() : "Utilisateur";
	const cleanOpportunities = opportunities.map((opp) => ({
		id: opp.id,
		entreprise: opp.entreprise || "Entreprise non précisée",
		poste: opp.poste || "Poste non précisé",
		statut: opp.statut || "Sauvegardée",
		lieu: opp.lieu || void 0,
		applicationDeadline: opp.applicationDeadline || opp.dateLimite || null,
		appliedAt: opp.appliedAt || opp.dateEnvoi || null,
		followUpDate: opp.followUpDate || opp.dateRelance || null,
		lastContactDate: opp.lastContactDate || null,
		interviewDate: opp.interviewDate || null,
		secondInterviewDate: opp.secondInterviewDate || null,
		currentWorkflowStep: opp.currentWorkflowStep || null,
		savedAt: opp.savedAt || null,
		preparedAt: opp.preparedAt || null,
		offerReceivedAt: opp.offerReceivedAt || null,
		acceptedAt: opp.acceptedAt || null,
		rejectedAt: opp.rejectedAt || null,
		notes: opp.notes || void 0,
		archive: Boolean(opp.archive)
	}));
	const cleanCalendar = (calendarEvents || []).map((ev) => ({
		date: ev.date,
		titre: ev.titre,
		type: ev.type,
		entreprise: ev.entreprise
	}));
	return `DONNÉES DU JOUR POUR LE DAILY BRIEF :
- Prénom de l'utilisateur : "${prenomStr}"
- Date courante locale : "${currentDate}"

OPPORTUNITÉS ENREGISTRÉES DANS NACORA (${cleanOpportunities.length}) :
${JSON.stringify(cleanOpportunities, null, 2)}

ÉVÉNEMENTS CALENDRIER (${cleanCalendar.length}) :
${JSON.stringify(cleanCalendar, null, 2)}

INSTRUCTIONS DE GÉNÉRATION :
- Génère le Daily Brief pour "${prenomStr}" à la date du ${currentDate}.
- Trie et sélectionne uniquement les éléments pertinents selon les 4 catégories : today (max 5), watch (max 3), upcoming (max 5), recent (max 5).
- Respecte scrupuleusement le JSON Schema.
`;
}
var dailyBrief_service_exports = /* @__PURE__ */ __exportAll({
	generateDailyBriefIA: () => generateDailyBriefIA,
	generateDeterministicDailyBrief: () => generateDeterministicDailyBrief
});
function getAiClient() {
	const apiKey = processModule.env["GEMINI_API_KEY"];
	if (!apiKey) throw new Error("La clé d'API GEMINI_API_KEY n'est pas configurée.");
	return new GoogleGenAI({
		apiKey,
		httpOptions: { headers: { "User-Agent": "aistudio-build" } }
	});
}
function cleanJsonString(raw) {
	if (!raw) return "{}";
	const match = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
	return (match ? match[1] : raw).trim();
}
var CANDIDATE_MODELS = [
	"gemini-3.1-flash-lite",
	"gemini-3.8-flash",
	"gemini-flash-latest"
];
function calculateDaysDiff(fromIso, toIso) {
	try {
		const from = new Date(fromIso);
		const to = new Date(toIso);
		if (isNaN(from.getTime()) || isNaN(to.getTime())) return null;
		const diffTime = to.getTime() - from.getTime();
		return Math.round(diffTime / 864e5);
	} catch {
		return null;
	}
}
/**
* Génère un Daily Brief factuel et déterministe basé strictement sur les règles métiers de NACORA.
* Utilisé comme repli fiable en cas d'indisponibilité ou d'erreur de l'API IA.
*/
function generateDeterministicDailyBrief(input, isFallback = false) {
	const { userPrenom, currentDate, opportunities, calendarEvents = [] } = input;
	const prenom = userPrenom?.trim() ? userPrenom.trim() : "";
	const greeting = prenom ? `Bonjour ${prenom}` : "Bonjour";
	const today = [];
	const watch = [];
	const upcoming = [];
	const recent = [];
	const activeStatuses = [
		"Sauvegardée",
		"À préparer",
		"À étudier",
		"À candidater",
		"Candidature envoyée",
		"Relancée",
		"Entretien",
		"Deuxième entretien"
	];
	const closedStatuses = [
		"Refusée",
		"Acceptée",
		"Clôturée",
		"Sans réponse"
	];
	for (const opp of opportunities) {
		if (opp.archive) continue;
		const deadline = opp.applicationDeadline || opp.dateLimite;
		const relance = opp.followUpDate || opp.dateRelance;
		const entretien = opp.interviewDate || opp.secondInterviewDate;
		const company = opp.entreprise || "Entreprise";
		const title = opp.poste || "Opportunité";
		const isClosed = closedStatuses.includes(opp.statut);
		const isActive = activeStatuses.includes(opp.statut);
		if (entretien && isActive) {
			const diff = calculateDaysDiff(currentDate, entretien);
			if (diff === 0) today.push({
				id: `entretien-${opp.id}`,
				opportunityId: opp.id,
				type: "entretien",
				title: `Entretien — ${company}`,
				company,
				date: entretien,
				dateContext: "Aujourd'hui",
				priority: "high",
				message: `Entretien prévu aujourd'hui pour le poste de ${title}.`,
				actionLabel: "Voir l'opportunité",
				actionType: "view_opportunity"
			});
			else if (diff !== null && diff > 0 && diff <= 30) upcoming.push({
				id: `entretien-futur-${opp.id}`,
				opportunityId: opp.id,
				type: "entretien",
				title: `Entretien — ${company}`,
				company,
				date: entretien,
				dateContext: diff === 1 ? "Demain" : `Dans ${diff} jours`,
				priority: diff <= 3 ? "high" : "medium",
				message: `Entretien prévu le ${entretien} pour le poste de ${title}.`,
				actionLabel: "Voir le calendrier",
				actionType: "view_calendar"
			});
		}
		if (deadline && !isClosed) {
			const diff = calculateDaysDiff(currentDate, deadline);
			if (diff === 0) today.push({
				id: `deadline-${opp.id}`,
				opportunityId: opp.id,
				type: "deadline",
				title: `Deadline aujourd'hui — ${company}`,
				company,
				date: deadline,
				dateContext: "Aujourd'hui",
				priority: "high",
				message: `La date limite pour postuler à ${title} expire aujourd'hui.`,
				actionLabel: "Voir l'opportunité",
				actionType: "view_opportunity"
			});
			else if (diff !== null && diff > 0 && diff <= 7) watch.push({
				id: `deadline-watch-${opp.id}`,
				opportunityId: opp.id,
				type: "deadline",
				title: `Deadline dans ${diff} jours — ${company}`,
				company,
				date: deadline,
				dateContext: diff === 1 ? "Demain" : `Dans ${diff} jours`,
				priority: diff <= 2 ? "high" : "medium",
				message: `Date limite de candidature fixée au ${deadline} pour ${title}.`,
				actionLabel: "Voir l'opportunité",
				actionType: "view_opportunity"
			});
			else if (diff !== null && diff < 0 && isActive && opp.statut !== "Candidature envoyée" && opp.statut !== "Relancée") watch.push({
				id: `deadline-overdue-${opp.id}`,
				opportunityId: opp.id,
				type: "deadline",
				title: `Deadline dépassée — ${company}`,
				company,
				date: deadline,
				dateContext: "Dépassée",
				priority: "medium",
				message: `La date limite du ${deadline} est passée pour ${title}.`,
				actionLabel: "Voir l'opportunité",
				actionType: "view_opportunity"
			});
		}
		if (relance && (opp.statut === "Candidature envoyée" || opp.statut === "Relancée")) {
			const diff = calculateDaysDiff(currentDate, relance);
			if (diff === 0) today.push({
				id: `relance-${opp.id}`,
				opportunityId: opp.id,
				type: "relance",
				title: `Relancer ${company}`,
				company,
				date: relance,
				dateContext: "Prévue aujourd'hui",
				priority: "high",
				message: `Une relance est programmée aujourd'hui pour votre candidature à ${title}.`,
				actionLabel: "Voir l'opportunité",
				actionType: "view_opportunity"
			});
			else if (diff !== null && diff < 0) {
				const joursRetard = Math.abs(diff);
				watch.push({
					id: `relance-retard-${opp.id}`,
					opportunityId: opp.id,
					type: "relance",
					title: `Relance en retard — ${company}`,
					company,
					date: relance,
					dateContext: `${joursRetard} j de retard`,
					priority: "high",
					message: `La relance pour ${title} était prévue le ${relance}.`,
					actionLabel: "Planifier la relance",
					actionType: "follow_up"
				});
			}
		}
		if (opp.statut === "À préparer" && !today.some((t) => t.opportunityId === opp.id)) today.push({
			id: `prep-${opp.id}`,
			opportunityId: opp.id,
			type: "preparation",
			title: `Préparer la candidature — ${company}`,
			company,
			date: null,
			dateContext: "À faire",
			priority: "medium",
			message: `Vous avez une candidature à préparer pour le poste de ${title}.`,
			actionLabel: "Voir l'opportunité",
			actionType: "view_opportunity"
		});
		if (opp.savedAt) {
			const diff = calculateDaysDiff(opp.savedAt, currentDate);
			if (diff !== null && diff >= 0 && diff <= 3) recent.push({
				id: `recent-${opp.id}`,
				opportunityId: opp.id,
				type: "opportunite",
				title: `Nouvelle opportunité — ${company}`,
				company,
				date: opp.savedAt,
				dateContext: diff === 0 ? "Aujourd'hui" : diff === 1 ? "Hier" : `Il y a ${diff} jours`,
				priority: "low",
				message: `Opportunité ${title} ajoutée récemment.`,
				actionLabel: "Voir l'opportunité",
				actionType: "view_opportunity"
			});
		}
	}
	for (const ev of calendarEvents) {
		const diff = calculateDaysDiff(currentDate, ev.date);
		if (diff === 0 && !today.some((t) => t.date === ev.date && t.title.includes(ev.titre))) today.push({
			id: `cal-today-${ev.date}-${ev.titre}`,
			opportunityId: ev.opportunityId,
			type: "entretien",
			title: ev.titre,
			company: ev.entreprise || "Calendrier",
			date: ev.date,
			dateContext: "Aujourd'hui",
			priority: "high",
			message: `${ev.type} : ${ev.titre} prévu aujourd'hui.`,
			actionLabel: "Voir le calendrier",
			actionType: "view_calendar"
		});
		else if (diff !== null && diff > 0 && diff <= 14 && !upcoming.some((u) => u.date === ev.date && u.title.includes(ev.titre))) upcoming.push({
			id: `cal-up-${ev.date}-${ev.titre}`,
			opportunityId: ev.opportunityId,
			type: "entretien",
			title: ev.titre,
			company: ev.entreprise || "Calendrier",
			date: ev.date,
			dateContext: diff === 1 ? "Demain" : `Dans ${diff} jours`,
			priority: diff <= 2 ? "high" : "medium",
			message: `${ev.type} prévu le ${ev.date}.`,
			actionLabel: "Voir le calendrier",
			actionType: "view_calendar"
		});
	}
	const limitedToday = today.slice(0, 5);
	const limitedWatch = watch.slice(0, 3);
	const limitedUpcoming = upcoming.slice(0, 5);
	const limitedRecent = recent.slice(0, 5);
	let summary = "Voici ce qui mérite votre attention aujourd'hui.";
	if (limitedToday.length === 0 && limitedWatch.length === 0 && limitedUpcoming.length === 0) summary = "Tout est à jour. Aucune action urgente aujourd'hui.";
	else if (limitedToday.length > 0) summary = `Vous avez ${limitedToday.length} action${limitedToday.length > 1 ? "s" : ""} prioritaire${limitedToday.length > 1 ? "s" : ""} à mener aujourd'hui.`;
	return {
		greeting,
		summary,
		today: limitedToday,
		watch: limitedWatch,
		upcoming: limitedUpcoming,
		recent: limitedRecent,
		generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		isFallback
	};
}
/**
* Génère le Daily Brief en appelant l'IA Gemini avec cascade de modèles et schéma structuré.
*/
async function generateDailyBriefIA(input) {
	if (!processModule.env["GEMINI_API_KEY"]) {
		console.info("[Daily Brief] Pas de GEMINI_API_KEY trouvée, utilisation du brief déterministe.");
		return generateDeterministicDailyBrief(input, true);
	}
	let ai;
	try {
		ai = getAiClient();
	} catch (err) {
		console.warn("[Daily Brief] Erreur d'initialisation du client IA:", err);
		return generateDeterministicDailyBrief(input, true);
	}
	const userPrompt = buildDailyBriefUserPrompt(input);
	let rawJsonText = null;
	for (let attempt = 0; attempt < CANDIDATE_MODELS.length; attempt++) {
		const model = CANDIDATE_MODELS[attempt];
		try {
			const response = await ai.models.generateContent({
				model,
				contents: userPrompt,
				config: {
					systemInstruction: DAILY_BRIEF_SYSTEM_PROMPT,
					temperature: .1,
					responseMimeType: "application/json",
					responseSchema: geminiDailyBriefResponseSchema
				}
			});
			if (response.text) {
				rawJsonText = response.text;
				break;
			}
		} catch (err) {
			err instanceof Error || new Error(String(err));
			console.info(`[Daily Brief] Modèle ${model} temporairement indisponible (${attempt + 1}/${CANDIDATE_MODELS.length}), basculement automatique.`);
		}
	}
	if (!rawJsonText) {
		console.info("[Daily Brief] Modèles IA distants indisponibles, utilisation du moteur déterministe certifié.");
		return generateDeterministicDailyBrief(input, true);
	}
	try {
		const cleaned = cleanJsonString(rawJsonText);
		const parsed = JSON.parse(cleaned);
		const validated = DailyBriefZodSchema.parse(parsed);
		return {
			greeting: validated.greeting,
			summary: validated.summary,
			today: validated.today.slice(0, 5),
			watch: validated.watch.slice(0, 3),
			upcoming: validated.upcoming.slice(0, 5),
			recent: validated.recent.slice(0, 5),
			generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			isFallback: false
		};
	} catch (parseErr) {
		console.warn("[Daily Brief] Erreur de validation de la réponse IA, basculement vers le mode déterministe:", parseErr);
		return generateDeterministicDailyBrief(input, true);
	}
}
//#endregion
export { generateDeterministicDailyBrief as n, dailyBrief_service_exports as t };

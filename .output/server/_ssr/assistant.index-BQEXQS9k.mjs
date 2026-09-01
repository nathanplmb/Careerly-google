import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-DDzEUEFj.mjs";
import { E as RotateCcw, Ht as ArrowRight, It as Building2, J as KeyRound, L as Mail, Mt as Calendar, N as MessageSquare, O as Plus, Ot as ChevronRight, P as MessageSquareQuote, S as Search, Tt as CircleCheck, U as Linkedin, Ut as ArrowLeft, V as LoaderCircle, W as Lightbulb, ct as FileSearch, g as Target, i as WandSparkles, jt as Check, nt as Gauge, ot as FileText, u as Upload, ut as FileCheck, v as Sparkles, wt as CircleQuestionMark, x as Send, yt as Copy } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-JIGp6MTc.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BVo--1gP.mjs";
import { s as Input } from "./dialog-B3Jp4UDR.mjs";
import { t as Textarea } from "./textarea-CNcwtOlr.mjs";
import { l as getNextBestAction, o as emptyCandidature } from "./candidatures-ck14d0Ow.mjs";
import { t as texteErreurIA } from "./ai-erreurs-B0Gxtc15.mjs";
import { n as lancerAnalyse, s as profilEnTexte } from "./match-run-Bhrc1Shm.mjs";
import { t as Progress } from "./progress-cTKs2o6Y.mjs";
import { n as analyserOffre, r as useServerFn, t as CandidatureSheet } from "./CandidatureSheet-2s8UyStM.mjs";
import { t as UsageIaCard } from "./UsageIaCard-CNbjvq1U.mjs";
import { t as Badge } from "./profil-completion-C5jI9RaO.mjs";
import { t as useProfil } from "./useProfil-Vc3u7mk3.mjs";
import { t as useSession } from "./useSession-D5EIlFSn.mjs";
import { t as AiContextCard } from "./AiContextCard-CXXVsso6.mjs";
import { t as useCandidatures } from "./useCandidatures-Cqc_s9SU.mjs";
import { n as extraireTexteFichier } from "./cv-fichier-DSZ1fk6O.mjs";
import { n as genererLettre, r as genererLinkedin, t as genererInterview } from "./redaction.functions-BqUDXwXX.mjs";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./accordion-BbWVrCDQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assistant.index-BQEXQS9k.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var STORAGE_KEY = "careerly_ai_history_v1";
function getAiHistory() {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
function saveAiHistoryItem(item) {
	if (typeof window === "undefined") return [];
	try {
		const current = getAiHistory();
		const newItem = {
			...item,
			id: item.id || `ai_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
			date: (/* @__PURE__ */ new Date()).toISOString()
		};
		const updated = [newItem, ...current.filter((h) => h.id !== newItem.id)].slice(0, 20);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
		return updated;
	} catch {
		return [];
	}
}
var _jsxFileName$7 = "/app/applet/src/components/ai-hub/AiOffreStep.tsx";
function AiOffreStep({ offreData, onChangeOffreData, onNextStep }) {
	const { items, save } = useCandidatures();
	const runAnalyse = useServerFn(analyserOffre);
	const fileInputRef = (0, import_react.useRef)(null);
	const [mode, setMode] = (0, import_react.useState)("coller");
	const [chargement, setChargement] = (0, import_react.useState)(false);
	const [sauvegarde, setSauvegarde] = (0, import_react.useState)(false);
	const [sauvegardee, setSauvegardee] = (0, import_react.useState)(false);
	const lancerExtraction = async (texteAAnalyser) => {
		if (!texteAAnalyser || texteAAnalyser.trim().length < 10) {
			toast.error("Veuillez coller le texte ou lien de l'offre (au moins 10 caractères).");
			return;
		}
		setChargement(true);
		try {
			const res = await runAnalyse({ data: { texte: texteAAnalyser } });
			onChangeOffreData({
				texte: texteAAnalyser,
				entreprise: res.entreprise || "",
				poste: res.poste || "",
				lieu: res.lieu || "",
				lien: res.lien || "",
				dateLimite: res.dateLimite || "",
				missions: res.missions || res.detail || "",
				profilRecherche: res.profilRecherche || "",
				secteur: res.secteur || "",
				priorite: res.priorite || "auto",
				contactRecruteur: res.contact || ""
			});
			saveAiHistoryItem({
				type: "offre",
				titre: res.poste ? `${res.poste} @ ${res.entreprise || "Entreprise"}` : "Analyse d'offre",
				sousTitre: res.lieu,
				apercu: res.missions?.slice(0, 140) || res.detail?.slice(0, 140) || texteAAnalyser.slice(0, 140),
				offreData: {
					entreprise: res.entreprise,
					poste: res.poste,
					lieu: res.lieu,
					missions: res.missions,
					texte: texteAAnalyser
				}
			});
			toast.success("Offre analysée et structurée avec succès !");
		} catch (e) {
			toast.error(texteErreurIA(e));
		} finally {
			setChargement(false);
		}
	};
	const selectionnerCandidature = (candId) => {
		const c = items.find((item) => item.id === candId);
		if (!c) return;
		onChangeOffreData({
			texte: [
				c.poste ? `Poste : ${c.poste}` : "",
				c.entreprise ? `Entreprise : ${c.entreprise}` : "",
				c.lieu ? `Lieu : ${c.lieu}` : "",
				c.missions ? `Missions : ${c.missions}` : "",
				c.profilRecherche ? `Profil recherché : ${c.profilRecherche}` : "",
				c.notes ? `Notes : ${c.notes}` : ""
			].filter(Boolean).join("\n\n") || `${c.poste} - ${c.entreprise}`,
			entreprise: c.entreprise || "",
			poste: c.poste || "",
			lieu: c.lieu || "",
			lien: c.lienOffre || "",
			dateLimite: c.dateLimite || "",
			missions: c.missions || "",
			profilRecherche: c.profilRecherche || "",
			secteur: c.secteur || "",
			priorite: c.priorite || "auto",
			contactRecruteur: c.contactNom || "",
			candidatureIdLiee: c.id
		});
		toast.info(`Offre "${c.poste || c.entreprise}" chargée dans le workflow.`);
	};
	const ajouterAuxCandidatures = async () => {
		if (!offreData.entreprise && !offreData.poste) {
			toast.error("Renseignez au moins l'entreprise ou l'intitulé du poste.");
			return;
		}
		setSauvegarde(true);
		try {
			const nouvelle = {
				id: crypto.randomUUID(),
				entreprise: offreData.entreprise || "Entreprise",
				poste: offreData.poste || "Poste à préciser",
				statut: "A_POSTULER",
				lieu: offreData.lieu || void 0,
				lienOffre: offreData.lien || void 0,
				dateLimite: offreData.dateLimite || void 0,
				missions: offreData.missions || void 0,
				profilRecherche: offreData.profilRecherche || void 0,
				secteur: offreData.secteur || void 0,
				contactNom: offreData.contactRecruteur || void 0,
				notes: `Importé via NACORA AI Hub le ${(/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR")}`,
				creeLe: (/* @__PURE__ */ new Date()).toISOString()
			};
			await save(nouvelle);
			onChangeOffreData({ candidatureIdLiee: nouvelle.id });
			setSauvegardee(true);
			toast.success("Candidature ajoutée à votre tableau de bord !");
		} catch {
			toast.error("Erreur lors de la sauvegarde.");
		} finally {
			setSauvegarde(false);
		}
	};
	const handleFichier = async (f) => {
		try {
			const t = await extraireTexteFichier(f);
			onChangeOffreData({ texte: t });
			toast.success("Document de l'offre chargé. Lancement de l'analyse...");
			lancerExtraction(t);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Fichier non lisible.");
		}
	};
	const estPret = Boolean(offreData.entreprise || offreData.poste || offreData.texte);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "text-base font-semibold text-foreground",
					children: "Étape 1 : Analyser & structurer l'opportunité"
				}, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 192,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground",
					children: "Collez le texte brut de l'annonce ou sélectionnez une de vos candidatures existantes."
				}, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 195,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 191,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-1 rounded-xl border border-border/60 bg-muted/40 p-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setMode("coller"),
						className: `rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${mode === "coller" ? "bg-card text-foreground shadow-sm ring-1 ring-border/50" : "text-muted-foreground hover:text-foreground"}`,
						children: "Coller / Importer"
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 202,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setMode("existant"),
						className: `rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${mode === "existant" ? "bg-card text-foreground shadow-sm ring-1 ring-border/50" : "text-muted-foreground hover:text-foreground"}`,
						children: [
							"Mes candidatures (",
							items.length,
							")"
						]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 213,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 201,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$7,
				lineNumber: 190,
				columnNumber: 7
			}, this),
			mode === "existant" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-border/60 bg-card/40 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
					className: "mb-2 block text-xs font-semibold text-foreground",
					children: "Sélectionner une candidature existante :"
				}, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 229,
					columnNumber: 11
				}, this), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "py-8 text-center text-xs text-muted-foreground",
					children: "Aucune candidature enregistrée. Basculez sur \"Coller / Importer\" pour ajouter votre première offre."
				}, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 233,
					columnNumber: 13
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-2 sm:grid-cols-2",
					children: items.map((cand) => {
						const estSelectionne = offreData.candidatureIdLiee === cand.id;
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => selectionnerCandidature(cand.id),
							className: `flex items-start justify-between rounded-xl border p-3 text-left transition-all ${estSelectionne ? "border-primary bg-primary/10 shadow-sm" : "border-border/60 bg-card/60 hover:border-primary/40 hover:bg-card"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "min-w-0 flex-1 pr-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "truncate text-xs font-semibold text-foreground",
									children: cand.poste || "Poste non défini"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 253,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "truncate text-[11px] text-muted-foreground",
									children: [
										cand.entreprise,
										" • ",
										cand.lieu || "Lieu non précisé"
									]
								}, void 0, true, {
									fileName: _jsxFileName$7,
									lineNumber: 256,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 252,
								columnNumber: 21
							}, this), estSelectionne && /* @__PURE__ */ (void 0)(CircleCheck, { className: "size-4 shrink-0 text-primary" }, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 261,
								columnNumber: 23
							}, this)]
						}, cand.id, true, {
							fileName: _jsxFileName$7,
							lineNumber: 242,
							columnNumber: 19
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 238,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$7,
				lineNumber: 228,
				columnNumber: 9
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
						value: offreData.texte,
						onChange: (e) => onChangeOffreData({ texte: e.target.value }),
						placeholder: "Collez ici le texte intégral de la fiche de poste, le lien, ou la description de l'offre...",
						className: "min-h-[140px] rounded-xl border-border/70 bg-card/70 text-xs leading-relaxed focus-visible:ring-primary/40"
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 272,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						ref: fileInputRef,
						type: "file",
						accept: ".pdf,.docx,.doc,.txt",
						className: "hidden",
						onChange: (e) => {
							const f = e.target.files?.[0];
							if (f) handleFichier(f);
						}
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 278,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 271,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: () => fileInputRef.current?.click(),
						className: "h-8 gap-1.5 rounded-xl border-border/80 text-xs text-muted-foreground hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Upload, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 298,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Charger un fichier (.pdf, .docx)" }, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 299,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 291,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "button",
						onClick: () => lancerExtraction(offreData.texte),
						disabled: chargement || !offreData.texte.trim(),
						className: "h-8 gap-1.5 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90",
						children: chargement ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-3.5 animate-spin" }, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 310,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Extraction en cours..." }, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 311,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 309,
							columnNumber: 17
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 315,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Analyser avec l'IA" }, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 316,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 314,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 302,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 290,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$7,
				lineNumber: 270,
				columnNumber: 9
			}, this),
			estPret && /* @__PURE__ */ (void 0)("div", {
				className: "rounded-2xl border border-primary/20 bg-card/70 p-4 space-y-4",
				children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "flex flex-wrap items-start justify-between gap-2",
						children: [/* @__PURE__ */ (void 0)("div", { children: [
							/* @__PURE__ */ (void 0)("span", {
								className: "text-[10px] font-semibold uppercase tracking-wider text-primary",
								children: "Fiche d'offre synthétisée"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 329,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("h4", {
								className: "text-base font-bold text-foreground",
								children: offreData.poste || "Poste à identifier"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 332,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									offreData.entreprise || "Entreprise",
									" ",
									offreData.lieu ? `• ${offreData.lieu}` : ""
								]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 335,
								columnNumber: 15
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 328,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2",
							children: !offreData.candidatureIdLiee && /* @__PURE__ */ (void 0)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: ajouterAuxCandidatures,
								disabled: sauvegarde || sauvegardee,
								className: "h-8 gap-1.5 rounded-xl border-border text-xs",
								children: sauvegardee ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-3.5 text-emerald-400" }, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 353,
									columnNumber: 23
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Ajouté" }, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 354,
									columnNumber: 23
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$7,
									lineNumber: 352,
									columnNumber: 21
								}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Plus, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 358,
									columnNumber: 23
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Ajouter aux candidatures" }, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 359,
									columnNumber: 23
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$7,
									lineNumber: 357,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 343,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 341,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 327,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "grid grid-cols-2 gap-2 text-xs sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-xl border border-border/50 bg-background/50 p-2.5",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "block text-[10px] text-muted-foreground",
									children: "Entreprise"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 369,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "font-semibold text-foreground truncate block",
									children: offreData.entreprise || "—"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 372,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 368,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-xl border border-border/50 bg-background/50 p-2.5",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "block text-[10px] text-muted-foreground",
									children: "Lieu"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 377,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "font-semibold text-foreground truncate block",
									children: offreData.lieu || "—"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 380,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 376,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-xl border border-border/50 bg-background/50 p-2.5",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "block text-[10px] text-muted-foreground",
									children: "Secteur"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 385,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "font-semibold text-foreground truncate block",
									children: offreData.secteur || "Général"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 388,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 384,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-xl border border-border/50 bg-background/50 p-2.5",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "block text-[10px] text-muted-foreground",
									children: "Date limite"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 393,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "font-semibold text-foreground truncate block",
									children: offreData.dateLimite || "Dès que possible"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 396,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 392,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 367,
						columnNumber: 11
					}, this),
					offreData.missions && /* @__PURE__ */ (void 0)("div", {
						className: "rounded-xl border border-border/40 bg-background/30 p-3 text-xs leading-relaxed text-muted-foreground",
						children: [/* @__PURE__ */ (void 0)("span", {
							className: "mb-1 block font-semibold text-foreground",
							children: "Missions clés extraites :"
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 404,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "line-clamp-4 whitespace-pre-line",
							children: offreData.missions
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 407,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 403,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "flex justify-end pt-2",
						children: /* @__PURE__ */ (void 0)(Button, {
							type: "button",
							onClick: onNextStep,
							className: "gap-2 rounded-xl bg-primary px-5 text-xs font-semibold text-primary-foreground shadow-md hover:bg-primary/90",
							children: [/* @__PURE__ */ (void 0)("span", { children: "Continuer vers le Match IA" }, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 420,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)(ArrowRight, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 421,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 415,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 414,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$7,
				lineNumber: 326,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$7,
		lineNumber: 188,
		columnNumber: 5
	}, this);
}
var _jsxFileName$6 = "/app/applet/src/components/ai-hub/AiMatchStep.tsx";
function AiMatchStep({ offreData, matchData, onChangeMatchData, onNextStep, onPrevStep }) {
	const { user } = useSession();
	const profil = useProfil(user);
	const { patch } = useCandidatures();
	const [chargement, setChargement] = (0, import_react.useState)(false);
	const evaluerMatch = async () => {
		if (!profil) {
			toast.error("Veuillez d'abord compléter votre profil.");
			return;
		}
		if (!offreData.texte && !offreData.missions && !offreData.poste) {
			toast.error("Veuillez renseigner les détails de l'offre à l'étape 1.");
			return;
		}
		setChargement(true);
		try {
			const candVirtuelle = {
				id: offreData.candidatureIdLiee || "temp_offre",
				entreprise: offreData.entreprise || "Entreprise ciblée",
				poste: offreData.poste || "Poste ciblé",
				statut: "A_POSTULER",
				lieu: offreData.lieu,
				missions: offreData.missions || offreData.texte,
				profilRecherche: offreData.profilRecherche,
				creeLe: (/* @__PURE__ */ new Date()).toISOString()
			};
			const match = await lancerAnalyse(candVirtuelle, profil);
			const resultat = {
				global: match.global ?? 75,
				competences: match.competences ?? 75,
				experience: match.experience ?? 70,
				formation: match.formation ?? 80,
				synthese: match.synthese || "Bonne adéquation globale entre votre profil et les exigences du poste.",
				pointsForts: match.pointsForts || [],
				pointsVigilance: match.pointsVigilance || [],
				competencesManquantes: match.competencesManquantes || [],
				recommandations: match.recommandations || []
			};
			onChangeMatchData(resultat);
			if (offreData.candidatureIdLiee) patch(offreData.candidatureIdLiee, { match });
			saveAiHistoryItem({
				type: "match",
				titre: `Match ${resultat.global}% : ${offreData.poste || "Poste"} @ ${offreData.entreprise || "Entreprise"}`,
				sousTitre: `${resultat.pointsForts.length} points forts • ${resultat.competencesManquantes.length} compétences cibles`,
				apercu: resultat.synthese,
				offreData,
				matchData: resultat
			});
			toast.success("Évaluation Match IA calculée !");
		} catch (e) {
			toast.error(texteErreurIA(e));
		} finally {
			setChargement(false);
		}
	};
	const getScoreColor = (score) => {
		if (score >= 80) return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
		if (score >= 60) return "text-primary border-primary/30 bg-primary/10";
		return "text-amber-400 border-amber-500/30 bg-amber-500/10";
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "text-base font-semibold text-foreground",
					children: "Étape 2 : Match IA & Compatibilité profil"
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 126,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground",
					children: "Comparaison multi-dimensionnelle entre votre profil (expériences, compétences, études) et l'offre."
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 129,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 125,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					type: "button",
					onClick: evaluerMatch,
					disabled: chargement,
					className: "h-8 gap-1.5 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90",
					children: chargement ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-3.5 animate-spin" }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 143,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Calcul en cours..." }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 144,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 142,
						columnNumber: 13
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 148,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: matchData ? "Recalculer le Match" : "Lancer le Match IA" }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 149,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 147,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 135,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 124,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between rounded-xl border border-border/60 bg-muted/30 px-3.5 py-2.5 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 truncate",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Target, { className: "size-4 text-primary shrink-0" }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 160,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-semibold text-foreground truncate",
							children: offreData.poste || "Poste sélectionné"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 161,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-muted-foreground truncate",
							children: ["@ ", offreData.entreprise || "Entreprise"]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 164,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 159,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: onPrevStep,
					className: "h-6 text-[11px] text-muted-foreground hover:text-foreground",
					children: "Modifier l'offre"
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 168,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 158,
				columnNumber: 7
			}, this),
			!matchData && !chargement ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-dashed border-border/80 p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "mx-auto size-8 text-primary/70 mb-3" }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 182,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
						className: "text-sm font-semibold text-foreground",
						children: "Prêt pour l'évaluation Match IA"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 183,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mx-auto mt-1 max-w-md text-xs text-muted-foreground",
						children: "Cliquez sur le bouton ci-dessus pour confronter votre profil complet aux exigences de l'offre et obtenir une analyse détaillée de vos atouts."
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 186,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "button",
						onClick: evaluerMatch,
						className: "mt-4 gap-2 rounded-xl bg-primary text-xs font-semibold text-primary-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 196,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Calculer mon score de match" }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 197,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 191,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 181,
				columnNumber: 9
			}, this) : chargement ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-card/40 py-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-8 animate-spin text-primary mb-3" }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 202,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm font-semibold text-foreground",
						children: "Analyse de compatibilité en cours..."
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 203,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Croisement des compétences, années d'expérience et missions clés"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 206,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 201,
				columnNumber: 9
			}, this) : matchData ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-primary/20 bg-gradient-to-br from-card via-card/80 to-primary/5 p-5 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: `grid size-16 place-items-center rounded-2xl border text-xl font-extrabold ${getScoreColor(matchData.global)}`,
									children: [matchData.global, "%"]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 216,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
										className: "text-sm font-bold text-foreground",
										children: "Score de Correspondance Global"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 225,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
										variant: "outline",
										className: `text-[10px] ${getScoreColor(matchData.global)}`,
										children: matchData.global >= 75 ? "Très fort potentiel" : matchData.global >= 50 ? "Bonne adéquation" : "Profil à valoriser"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 228,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 224,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-xs leading-relaxed text-muted-foreground max-w-xl",
									children: matchData.synthese
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 239,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 223,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 215,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 214,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-4 grid grid-cols-1 gap-3 border-t border-border/40 pt-4 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex justify-between text-xs mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground",
										children: "Compétences techniques"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 250,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-semibold text-foreground",
										children: [matchData.competences, "%"]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 253,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 249,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Progress, {
									value: matchData.competences,
									className: "h-1.5"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 257,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 248,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex justify-between text-xs mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground",
										children: "Expérience & Réalisations"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 262,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-semibold text-foreground",
										children: [matchData.experience, "%"]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 265,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 261,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Progress, {
									value: matchData.experience,
									className: "h-1.5"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 269,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 260,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex justify-between text-xs mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground",
										children: "Formation & Alignement"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 274,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-semibold text-foreground",
										children: [matchData.formation, "%"]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 277,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 273,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Progress, {
									value: matchData.formation,
									className: "h-1.5"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 281,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 272,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 247,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 213,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-2xl border border-emerald-500/20 bg-card/60 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mb-2.5 flex items-center gap-2 text-xs font-semibold text-emerald-400",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 291,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Points forts à valoriser" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 292,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 290,
								columnNumber: 15
							}, this), matchData.pointsForts.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: "Aucun point spécifique identifié."
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 295,
								columnNumber: 17
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
								className: "space-y-1.5 text-xs text-muted-foreground",
								children: matchData.pointsForts.map((pt, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mt-1 size-1.5 rounded-full bg-emerald-400 shrink-0" }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 302,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: pt }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 303,
										columnNumber: 23
									}, this)]
								}, i, true, {
									fileName: _jsxFileName$6,
									lineNumber: 301,
									columnNumber: 21
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 299,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 289,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-2xl border border-amber-500/20 bg-card/60 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mb-2.5 flex items-center gap-2 text-xs font-semibold text-amber-400",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lightbulb, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 313,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Compétences cibles & vigilance" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 314,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 312,
								columnNumber: 15
							}, this), matchData.competencesManquantes.length === 0 && matchData.pointsVigilance.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: "Tous les critères clés sont déjà présents sur votre profil."
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 318,
								columnNumber: 17
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2 text-xs text-muted-foreground",
								children: [matchData.competencesManquantes.map((c, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
										variant: "outline",
										className: "border-amber-500/30 bg-amber-500/10 text-[10px] text-amber-300",
										children: "À valoriser"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 325,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "truncate",
										children: c
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 331,
										columnNumber: 23
									}, this)]
								}, i, true, {
									fileName: _jsxFileName$6,
									lineNumber: 324,
									columnNumber: 21
								}, this)), matchData.pointsVigilance.map((v, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[11.5px] italic text-muted-foreground",
									children: ["• ", v]
								}, i, true, {
									fileName: _jsxFileName$6,
									lineNumber: 335,
									columnNumber: 21
								}, this))]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 322,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 311,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 287,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: onPrevStep,
							className: "h-9 gap-1.5 rounded-xl border-border text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 356,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Retour à l'offre" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 357,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 349,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "button",
							onClick: onNextStep,
							className: "h-9 gap-2 rounded-xl bg-primary px-5 text-xs font-semibold text-primary-foreground shadow-md hover:bg-primary/90",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Continuer : Adapter mon CV & Pitch" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 365,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 366,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 360,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 348,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 211,
				columnNumber: 9
			}, this) : null
		]
	}, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 122,
		columnNumber: 5
	}, this);
}
var _jsxFileName$5 = "/app/applet/src/components/ai-hub/AiPitchStep.tsx";
function AiPitchStep({ offreData, matchData, pitchData, onChangePitchData, onNextStep, onPrevStep }) {
	const { user } = useSession();
	const profil = useProfil(user);
	const runGenererLettre = useServerFn(genererLettre);
	const [chargement, setChargement] = (0, import_react.useState)(false);
	const [consigne, setConsigne] = (0, import_react.useState)("Direct, percutant et axé sur mes réalisations concrètes");
	const [copie, setCopie] = (0, import_react.useState)(null);
	const copierTexte = (texte, cle) => {
		navigator.clipboard.writeText(texte);
		setCopie(cle);
		toast.success("Texte copié dans le presse-papiers !");
		setTimeout(() => setCopie(null), 2e3);
	};
	const genererPitchEtLettre = async () => {
		if (!profil) {
			toast.error("Veuillez d'abord compléter votre profil.");
			return;
		}
		setChargement(true);
		try {
			const profilTexte = profilEnTexte(profil);
			const offreTexte = [
				`Entreprise : ${offreData.entreprise}`,
				`Poste : ${offreData.poste}`,
				`Lieu : ${offreData.lieu}`,
				`Missions : ${offreData.missions}`,
				`Profil recherché : ${offreData.profilRecherche}`,
				`Texte complet : ${offreData.texte}`
			].join("\n\n");
			const res = await runGenererLettre({ data: {
				profil: profilTexte,
				offre: offreTexte,
				consigne
			} });
			const lettre = typeof res === "string" ? res : typeof res === "object" && res !== null && "lettre" in res ? String(res.lettre) : "";
			const nouveauResultat = {
				pitchAccroche: lettre.split("\n").filter((l) => l.trim().length > 0).slice(0, 3).join("\n") || "Passionné par ce secteur, je souhaite apporter ma valeur ajoutée à vos projets.",
				lettreMotivation: lettre,
				pointsAValoriser: matchData?.pointsForts || ["Alignement des compétences clés avec la fiche de poste", "Capacité d'adaptation et autonomie démontrées"],
				motsClesAInserer: matchData?.competencesManquantes || [
					"Gestion de projet",
					"Data / IA",
					"Rigueur méthodologique"
				]
			};
			onChangePitchData(nouveauResultat);
			saveAiHistoryItem({
				type: "pitch",
				titre: `Pitch & Lettre : ${offreData.poste || "Poste"} @ ${offreData.entreprise || "Entreprise"}`,
				sousTitre: "Lettre de motivation & points clés CV",
				apercu: lettre.slice(0, 140),
				offreData,
				pitchData: nouveauResultat
			});
			toast.success("Lettre et pitch de candidature générés !");
		} catch (e) {
			toast.error(texteErreurIA(e));
		} finally {
			setChargement(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "text-base font-semibold text-foreground",
					children: "Étape 3 : CV & Pitch de candidature"
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 148,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground",
					children: "Adaptez vos arguments, extrayez les mots-clés ATS et générez une lettre de motivation sur-mesure."
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 151,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 147,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					type: "button",
					onClick: genererPitchEtLettre,
					disabled: chargement,
					className: "h-8 gap-1.5 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90",
					children: chargement ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-3.5 animate-spin" }, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 165,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Rédaction en cours..." }, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 166,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 164,
						columnNumber: 13
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WandSparkles, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 170,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: pitchData ? "Régénérer le Pitch" : "Générer Lettre & Pitch" }, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 171,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 169,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 157,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 146,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between rounded-xl border border-border/60 bg-muted/30 px-3.5 py-2.5 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 truncate",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Target, { className: "size-4 text-primary shrink-0" }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 182,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-semibold text-foreground truncate",
							children: offreData.poste || "Poste visé"
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 183,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-muted-foreground truncate",
							children: ["@ ", offreData.entreprise || "Entreprise"]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 186,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 181,
					columnNumber: 9
				}, this), matchData && /* @__PURE__ */ (void 0)(Badge, {
					variant: "outline",
					className: "border-primary/30 text-[10px] text-primary",
					children: [
						"Match ",
						matchData.global,
						"%"
					]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 191,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 180,
				columnNumber: 7
			}, this),
			!pitchData && !chargement ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-dashed border-border/80 p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { className: "mx-auto size-8 text-primary/70 mb-3" }, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 203,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
						className: "text-sm font-semibold text-foreground",
						children: "Prêt pour la personnalisation du CV & Pitch"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 204,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mx-auto mt-1 max-w-md text-xs text-muted-foreground",
						children: "L'IA va croiser vos réalisations avec les critères de l'offre pour rédiger une lettre percutante et extraire les points d'expérience à placer en haut de votre CV."
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 207,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mx-auto mt-4 max-w-sm space-y-2 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-[11px] font-semibold text-muted-foreground",
							children: "Style ou consigne de rédaction :"
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 214,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
							value: consigne,
							onChange: (e) => setConsigne(e.target.value),
							placeholder: "Ex: Concis, axé sur mes chiffres clés...",
							className: "h-16 rounded-xl text-xs"
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 217,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 213,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "button",
						onClick: genererPitchEtLettre,
						className: "mt-4 gap-2 rounded-xl bg-primary text-xs font-semibold text-primary-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 230,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Générer mes arguments & lettre" }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 231,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 225,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 202,
				columnNumber: 9
			}, this) : chargement ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-card/40 py-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-8 animate-spin text-primary mb-3" }, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 236,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm font-semibold text-foreground",
						children: "Rédaction de vos arguments ciblés..."
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 237,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Valorisation de vos compétences et adaptation du ton à l'entreprise"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 240,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 235,
				columnNumber: 9
			}, this) : pitchData ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tabs, {
				defaultValue: "lettre",
				className: "w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsList, {
						className: "grid w-full grid-cols-2 rounded-xl bg-muted/60 p-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
							value: "lettre",
							className: "rounded-lg text-xs",
							children: "Lettre de motivation"
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 247,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
							value: "cv_alignement",
							className: "rounded-lg text-xs",
							children: "Points clés à intégrer au CV"
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 250,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 246,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
						value: "lettre",
						className: "mt-4 space-y-3",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative rounded-2xl border border-border/60 bg-card/80 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mb-2 flex items-center justify-between border-b border-border/40 pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-semibold text-foreground",
									children: "Lettre de motivation personnalisée"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 259,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									onClick: () => copierTexte(pitchData.lettreMotivation, "lettre"),
									className: "h-7 gap-1 text-xs text-muted-foreground hover:text-foreground",
									children: copie === "lettre" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-3.5 text-emerald-400" }, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 273,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Copié" }, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 274,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 272,
										columnNumber: 21
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 278,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Copier la lettre" }, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 279,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 277,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 262,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 258,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "max-h-[340px] overflow-y-auto whitespace-pre-line text-xs leading-relaxed text-foreground/90 pr-2",
								children: pitchData.lettreMotivation
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 285,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 257,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 256,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
						value: "cv_alignement",
						className: "mt-4 space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-2xl border border-primary/20 bg-card/60 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mb-2.5 flex items-center gap-2 text-xs font-semibold text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileCheck, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 296,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Mettre en avant sur votre CV" }, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 297,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 295,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
									className: "space-y-2 text-xs text-muted-foreground",
									children: pitchData.pointsAValoriser.map((pt, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mt-1 size-1.5 rounded-full bg-primary shrink-0" }, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 302,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: pt }, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 303,
											columnNumber: 23
										}, this)]
									}, i, true, {
										fileName: _jsxFileName$5,
										lineNumber: 301,
										columnNumber: 21
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 299,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 294,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-2xl border border-border/60 bg-card/60 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mb-2.5 flex items-center gap-2 text-xs font-semibold text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(KeyRound, { className: "size-4 text-amber-400" }, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 311,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Mots-clés stratégiques (ATS)" }, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 312,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 310,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-wrap gap-1.5",
									children: pitchData.motsClesAInserer.map((mc, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
										variant: "outline",
										className: "border-border bg-background/60 text-xs text-foreground",
										children: mc
									}, i, false, {
										fileName: _jsxFileName$5,
										lineNumber: 316,
										columnNumber: 21
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 314,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 309,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 293,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 292,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: onPrevStep,
							className: "h-9 gap-1.5 rounded-xl border-border text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 338,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Retour au Match IA" }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 339,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 331,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "button",
							onClick: onNextStep,
							className: "h-9 gap-2 rounded-xl bg-primary px-5 text-xs font-semibold text-primary-foreground shadow-md hover:bg-primary/90",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Continuer : Écrire messages & relances" }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 347,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 348,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 342,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 330,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 245,
				columnNumber: 9
			}, this) : null
		]
	}, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 144,
		columnNumber: 5
	}, this);
}
var _jsxFileName$4 = "/app/applet/src/components/ai-hub/AiContactStep.tsx";
function AiContactStep({ offreData, contactData, onChangeContactData, onNextStep, onPrevStep }) {
	const { user } = useSession();
	const profil = useProfil(user);
	const runGenererLinkedin = useServerFn(genererLinkedin);
	const [chargement, setChargement] = (0, import_react.useState)(false);
	const [copie, setCopie] = (0, import_react.useState)(null);
	const copierTexte = (texte, cle) => {
		navigator.clipboard.writeText(texte);
		setCopie(cle);
		toast.success("Message copié dans le presse-papiers !");
		setTimeout(() => setCopie(null), 2e3);
	};
	const genererMessages = async () => {
		if (!profil) {
			toast.error("Veuillez d'abord compléter votre profil.");
			return;
		}
		setChargement(true);
		try {
			const profilTexte = profilEnTexte(profil);
			const offreTexte = [
				`Entreprise : ${offreData.entreprise}`,
				`Poste : ${offreData.poste}`,
				`Lieu : ${offreData.lieu}`,
				`Missions : ${offreData.missions}`,
				`Contact : ${offreData.contactRecruteur}`
			].join("\n");
			const res = await runGenererLinkedin({ data: {
				profil: profilTexte,
				offre: offreTexte,
				consigne: "Générer les messages d'approche LinkedIn et Email"
			} });
			const noteLinkedin = res?.invitation || `Bonjour, très intéressé par vos projets et l'opportunité de ${offreData.poste || "poste"} au sein de ${offreData.entreprise || "votre équipe"}, je serais ravi d'échanger avec vous.`;
			const resultat = {
				noteLinkedin,
				messageLinkedin: res?.messageSuivi || `Bonjour,\n\nJe me permets de vous contacter suite à l'offre de ${offreData.poste || "poste"} chez ${offreData.entreprise || "votre entreprise"}. Mon parcours récent correspond aux compétences recherchées. Seriez-vous ouvert à un court échange ?\n\nBien cordialement,\n${profil.prenom || ""}`,
				emailCandidature: `Objet : Candidature — ${offreData.poste || "Poste"} — ${profil.prenom || ""} ${profil.nom || ""}\n\nMadame, Monsieur,\n\nActuellement à la recherche d'une opportunité en ${profil.metiers || "mon domaine"}, c'est avec un grand intérêt que je vous transmets ma candidature pour le poste de ${offreData.poste || "ce poste"} au sein de ${offreData.entreprise || "votre entreprise"}.\n\nMon parcours m'a permis de développer une solide expertise sur vos enjeux clés. Vous trouverez ci-joint mon CV détaillé.\n\nRestant à votre disposition pour un entretien,\n\n${profil.prenom || ""} ${profil.nom || ""}\n${profil.telephone || ""}`,
				emailRelance: `Objet : Suivi de ma candidature — ${offreData.poste || "Poste"} — ${profil.prenom || ""} ${profil.nom || ""}\n\nMadame, Monsieur,\n\nJe me permets de revenir vers vous concernant ma candidature au poste de ${offreData.poste || "ce poste"} envoyée récemment. Toujours particulièrement motivé par les projets de ${offreData.entreprise || "votre entreprise"}, je me tiens à votre disposition pour tout échange complémentaire.\n\nBien cordialement,\n${profil.prenom || ""} ${profil.nom || ""}`,
				conseilsApproche: res?.conseils || [
					"Personnalisez l'accroche avec le nom du recruteur ou un événement récent de l'entreprise.",
					"Envoyez vos relances idéalement le mardi ou le jeudi matin vers 9h00.",
					"Ajoutez votre lien LinkedIn ou votre portfolio en signature."
				]
			};
			onChangeContactData(resultat);
			saveAiHistoryItem({
				type: "contact",
				titre: `Messages : ${offreData.poste || "Poste"} @ ${offreData.entreprise || "Entreprise"}`,
				sousTitre: "Note LinkedIn & Emails personnalisés",
				apercu: noteLinkedin,
				offreData,
				contactData: resultat
			});
			toast.success("Messages de contact & relance générés !");
		} catch (e) {
			toast.error(texteErreurIA(e));
		} finally {
			setChargement(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "text-base font-semibold text-foreground",
					children: "Étape 4 : Messages d'approche & Relances"
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 138,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground",
					children: "Générez des messages percutants adaptés aux recruteurs, managers et alumni sur LinkedIn et par email."
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 141,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 137,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					type: "button",
					onClick: genererMessages,
					disabled: chargement,
					className: "h-8 gap-1.5 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90",
					children: chargement ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-3.5 animate-spin" }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 155,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Génération..." }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 156,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 154,
						columnNumber: 13
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WandSparkles, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 160,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: contactData ? "Régénérer les messages" : "Générer les messages" }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 161,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 159,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 147,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 136,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between rounded-xl border border-border/60 bg-muted/30 px-3.5 py-2.5 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 truncate",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Target, { className: "size-4 text-primary shrink-0" }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 174,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-semibold text-foreground truncate",
							children: offreData.poste || "Poste visé"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 175,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-muted-foreground truncate",
							children: ["@ ", offreData.entreprise || "Entreprise"]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 178,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 173,
					columnNumber: 9
				}, this), offreData.contactRecruteur && /* @__PURE__ */ (void 0)("span", {
					className: "text-[11px] text-muted-foreground truncate",
					children: ["Contact : ", offreData.contactRecruteur]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 183,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 172,
				columnNumber: 7
			}, this),
			!contactData && !chargement ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-dashed border-border/80 p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageSquare, { className: "mx-auto size-8 text-primary/70 mb-3" }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 192,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
						className: "text-sm font-semibold text-foreground",
						children: "Prêt pour la génération des messages"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 193,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mx-auto mt-1 max-w-md text-xs text-muted-foreground",
						children: "L'IA va composer une note LinkedIn optimisée pour la limite de 300 caractères, un message d'approche direct, ainsi que les modèles d'emails de candidature et de relance."
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 196,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "button",
						onClick: genererMessages,
						className: "mt-4 gap-2 rounded-xl bg-primary text-xs font-semibold text-primary-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 206,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Générer mes modèles de contact" }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 207,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 201,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 191,
				columnNumber: 9
			}, this) : chargement ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-card/40 py-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-8 animate-spin text-primary mb-3" }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 212,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm font-semibold text-foreground",
						children: "Rédaction des messages et notes LinkedIn..."
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 213,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Optimisation du copywriting et des phrases d'accroche"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 216,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 211,
				columnNumber: 9
			}, this) : contactData ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tabs, {
				defaultValue: "note_linkedin",
				className: "w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsList, {
						className: "grid w-full grid-cols-4 rounded-xl bg-muted/60 p-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
								value: "note_linkedin",
								className: "rounded-lg text-xs",
								children: "Note LinkedIn (300 car.)"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 223,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
								value: "message_linkedin",
								className: "rounded-lg text-xs",
								children: "Message LinkedIn"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 226,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
								value: "email_candidature",
								className: "rounded-lg text-xs",
								children: "Email Candidature"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 232,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
								value: "email_relance",
								className: "rounded-lg text-xs",
								children: "Email Relance (J+7)"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 238,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 222,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
						value: "note_linkedin",
						className: "mt-4 space-y-3",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-2xl border border-sky-500/30 bg-card/80 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mb-2 flex items-center justify-between border-b border-border/40 pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Linkedin, { className: "size-4 text-sky-400" }, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 248,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-xs font-semibold text-foreground",
											children: "Demande de connexion LinkedIn"
										}, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 249,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
											variant: "outline",
											className: "text-[10px]",
											children: [contactData.noteLinkedin.length, "/300 caractères"]
										}, void 0, true, {
											fileName: _jsxFileName$4,
											lineNumber: 252,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 247,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									onClick: () => copierTexte(contactData.noteLinkedin, "note_linkedin"),
									className: "h-7 gap-1 text-xs text-muted-foreground hover:text-foreground",
									children: copie === "note_linkedin" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-3.5 text-emerald-400" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 267,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Copié" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 268,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 266,
										columnNumber: 21
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 272,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Copier" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 273,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 271,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 256,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 246,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "whitespace-pre-line text-xs leading-relaxed text-foreground",
								children: contactData.noteLinkedin
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 279,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 245,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 244,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
						value: "message_linkedin",
						className: "mt-4 space-y-3",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-2xl border border-sky-500/30 bg-card/80 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mb-2 flex items-center justify-between border-b border-border/40 pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Linkedin, { className: "size-4 text-sky-400" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 290,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs font-semibold text-foreground",
										children: "Message d'approche InMail / Connexion"
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 291,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 289,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									onClick: () => copierTexte(contactData.messageLinkedin, "message_linkedin"),
									className: "h-7 gap-1 text-xs text-muted-foreground hover:text-foreground",
									children: copie === "message_linkedin" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-3.5 text-emerald-400" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 306,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Copié" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 307,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 305,
										columnNumber: 21
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 311,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Copier" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 312,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 310,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 295,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 288,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "whitespace-pre-line text-xs leading-relaxed text-foreground",
								children: contactData.messageLinkedin
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 318,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 287,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 286,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
						value: "email_candidature",
						className: "mt-4 space-y-3",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-2xl border border-border/60 bg-card/80 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mb-2 flex items-center justify-between border-b border-border/40 pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "size-4 text-amber-400" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 329,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs font-semibold text-foreground",
										children: "Email officiel de candidature"
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 330,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 328,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									onClick: () => copierTexte(contactData.emailCandidature, "email_candidature"),
									className: "h-7 gap-1 text-xs text-muted-foreground hover:text-foreground",
									children: copie === "email_candidature" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-3.5 text-emerald-400" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 348,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Copié" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 349,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 347,
										columnNumber: 21
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 353,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Copier" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 354,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 352,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 334,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 327,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "whitespace-pre-line text-xs leading-relaxed text-foreground",
								children: contactData.emailCandidature
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 360,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 326,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 325,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
						value: "email_relance",
						className: "mt-4 space-y-3",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-2xl border border-border/60 bg-card/80 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mb-2 flex items-center justify-between border-b border-border/40 pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "size-4 text-primary" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 371,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs font-semibold text-foreground",
										children: "Email de relance à J+7 / J+10"
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 372,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 370,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									onClick: () => copierTexte(contactData.emailRelance, "email_relance"),
									className: "h-7 gap-1 text-xs text-muted-foreground hover:text-foreground",
									children: copie === "email_relance" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-3.5 text-emerald-400" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 387,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Copié" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 388,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 386,
										columnNumber: 21
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 392,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Copier" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 393,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 391,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 376,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 369,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "whitespace-pre-line text-xs leading-relaxed text-foreground",
								children: contactData.emailRelance
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 399,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 368,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 367,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: onPrevStep,
							className: "h-9 gap-1.5 rounded-xl border-border text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 414,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Retour au CV & Pitch" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 415,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 407,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "button",
							onClick: onNextStep,
							className: "h-9 gap-2 rounded-xl bg-primary px-5 text-xs font-semibold text-primary-foreground shadow-md hover:bg-primary/90",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Continuer : Interview Coach" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 423,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 424,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 418,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 406,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 221,
				columnNumber: 9
			}, this) : null
		]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 134,
		columnNumber: 5
	}, this);
}
var _jsxFileName$3 = "/app/applet/src/components/ai-hub/AiInterviewStep.tsx";
function AiInterviewStep({ offreData, interviewData, onChangeInterviewData, onPrevStep, onFinishWorkflow }) {
	const { user } = useSession();
	const profil = useProfil(user);
	const runGenererInterview = useServerFn(genererInterview);
	const [chargement, setChargement] = (0, import_react.useState)(false);
	const genererSimulation = async () => {
		if (!profil) {
			toast.error("Veuillez d'abord compléter votre profil.");
			return;
		}
		setChargement(true);
		try {
			const profilTexte = profilEnTexte(profil);
			const offreTexte = [
				`Entreprise : ${offreData.entreprise}`,
				`Poste : ${offreData.poste}`,
				`Lieu : ${offreData.lieu}`,
				`Missions : ${offreData.missions}`,
				`Profil recherché : ${offreData.profilRecherche}`
			].join("\n");
			const res = await runGenererInterview({ data: {
				profil: profilTexte,
				offre: offreTexte,
				consigne: "Préparation d'entretien structurée STAR"
			} });
			const questions = res?.questions || [{
				question: `Parlez-moi de vous et pourquoi postuler chez ${offreData.entreprise || "nous"} ?`,
				categorie: "Fit & Motivation",
				pistes: [
					"Résumez votre parcours en 3 étapes claires.",
					"Expliquez le déclic pour cette entreprise précise.",
					"Terminez par ce que vous apporterez immédiatement."
				]
			}, {
				question: `Comment abordez-vous les missions de ${offreData.poste || "ce poste"} ?`,
				categorie: "Technique & Organisation",
				pistes: [
					"Citez une situation passée similaire (S).",
					"Décrivez la tâche et vos actions concrètes (T/A).",
					"Concluez avec les résultats quantifiés obtenus (R)."
				]
			}];
			const resultat = {
				questions,
				argumentsCles: res?.argumentsCles || [
					"Capacité éprouvée à mener des projets en autonomie",
					"Expertise sectorielle et méthodologie rigoureuse",
					"Dynamisme et fort esprit d'équipe"
				],
				pointsFaibles: res?.pointsFaibles || ["Anticipez les questions sur vos axes de progrès techniques", "Soyez clair sur vos disponibilités et vos attentes de formation"],
				questionsARecruteur: res?.questionsARecruteur || [
					`Quels seront les principaux défis de l'équipe sur les 6 prochains mois ?`,
					`À quoi ressemblera une semaine type pour ce poste chez ${offreData.entreprise || "vous"} ?`,
					`Quelles sont les opportunités d'apprentissage et d'évolution ?`
				]
			};
			onChangeInterviewData(resultat);
			saveAiHistoryItem({
				type: "interview",
				titre: `Interview Coach : ${offreData.poste || "Poste"} @ ${offreData.entreprise || "Entreprise"}`,
				sousTitre: `${questions.length} questions STAR & arguments préparés`,
				apercu: questions[0]?.question || "Simulation d'entretien",
				offreData,
				interviewData: resultat
			});
			toast.success("Simulation d'entretien et arguments générés !");
		} catch (e) {
			toast.error(texteErreurIA(e));
		} finally {
			setChargement(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "text-base font-semibold text-foreground",
					children: "Étape 5 : Interview Coach & Questions STAR"
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 159,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground",
					children: "Anticipez les questions pièges, préparez des réponses structurées STAR et vos questions au recruteur."
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 162,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 158,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					type: "button",
					onClick: genererSimulation,
					disabled: chargement,
					className: "h-8 gap-1.5 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90",
					children: chargement ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-3.5 animate-spin" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 176,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Entraînement..." }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 177,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 175,
						columnNumber: 13
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WandSparkles, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 181,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: interviewData ? "Régénérer la simulation" : "Lancer le Coach IA" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 182,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 180,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 168,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 157,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between rounded-xl border border-border/60 bg-muted/30 px-3.5 py-2.5 text-xs",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 truncate",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Target, { className: "size-4 text-primary shrink-0" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 195,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-semibold text-foreground truncate",
							children: offreData.poste || "Poste visé"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 196,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-muted-foreground truncate",
							children: ["@ ", offreData.entreprise || "Entreprise"]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 199,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 194,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 193,
				columnNumber: 7
			}, this),
			!interviewData && !chargement ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-dashed border-border/80 p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageSquareQuote, { className: "mx-auto size-8 text-primary/70 mb-3" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 208,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
						className: "text-sm font-semibold text-foreground",
						children: "Prêt pour la simulation d'entretien"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 209,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mx-auto mt-1 max-w-md text-xs text-muted-foreground",
						children: "L'IA va extraire les questions les plus probables pour ce poste et construire pour vous des trames de réponses selon la méthode STAR."
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 212,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "button",
						onClick: genererSimulation,
						className: "mt-4 gap-2 rounded-xl bg-primary text-xs font-semibold text-primary-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 221,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Simuler mon entretien d'embauche" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 222,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 216,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 207,
				columnNumber: 9
			}, this) : chargement ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-card/40 py-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-8 animate-spin text-primary mb-3" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 227,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm font-semibold text-foreground",
						children: "Construction des scénarios d'entretien..."
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 228,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Génération des questions techniques, comportementales et pièges"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 231,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 226,
				columnNumber: 9
			}, this) : interviewData ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tabs, {
					defaultValue: "questions",
					className: "w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsList, {
							className: "grid w-full grid-cols-3 rounded-xl bg-muted/60 p-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
									value: "questions",
									className: "rounded-lg text-xs",
									children: [
										"Questions probables & STAR (",
										interviewData.questions.length,
										")"
									]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 239,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
									value: "arguments",
									className: "rounded-lg text-xs",
									children: "Arguments clés & vigilance"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 242,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
									value: "questions_recruteur",
									className: "rounded-lg text-xs",
									children: "Questions au recruteur"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 245,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 238,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
							value: "questions",
							className: "mt-4 space-y-3",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Accordion, {
								type: "single",
								collapsible: true,
								className: "w-full space-y-2",
								children: interviewData.questions.map((q, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionItem, {
									value: `item-${idx}`,
									className: "rounded-xl border border-border/60 bg-card/60 px-3.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionTrigger, {
										className: "py-3 text-left text-xs font-semibold hover:no-underline",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-2 pr-2",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
												variant: "outline",
												className: "text-[10px] text-primary shrink-0",
												children: q.categorie || "Question"
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 264,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-foreground",
												children: q.question
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 270,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 263,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 262,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionContent, {
										className: "pb-3 pt-1 text-xs text-muted-foreground border-t border-border/40",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "font-semibold text-foreground mb-1.5 text-[11px]",
											children: "Pistes de réponse structurées (Méthode STAR) :"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 274,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
											className: "space-y-1.5 pl-1",
											children: q.pistes.map((piste, pIdx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
												className: "flex items-start gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mt-1 size-1.5 rounded-full bg-primary shrink-0" }, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 280,
													columnNumber: 29
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: piste }, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 281,
													columnNumber: 29
												}, this)]
											}, pIdx, true, {
												fileName: _jsxFileName$3,
												lineNumber: 279,
												columnNumber: 27
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 277,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 273,
										columnNumber: 21
									}, this)]
								}, idx, true, {
									fileName: _jsxFileName$3,
									lineNumber: 257,
									columnNumber: 19
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 255,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 254,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
							value: "arguments",
							className: "mt-4 space-y-3",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-2xl border border-primary/20 bg-card/60 p-4",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "mb-2.5 flex items-center gap-2 text-xs font-semibold text-primary",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 296,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Arguments décisifs à placer" }, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 297,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 295,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
										className: "space-y-2 text-xs text-muted-foreground",
										children: interviewData.argumentsCles.map((arg, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
											className: "flex items-start gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mt-1 size-1.5 rounded-full bg-primary shrink-0" }, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 302,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: arg }, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 303,
												columnNumber: 25
											}, this)]
										}, i, true, {
											fileName: _jsxFileName$3,
											lineNumber: 301,
											columnNumber: 23
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 299,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 294,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-2xl border border-amber-500/20 bg-card/60 p-4",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "mb-2.5 flex items-center gap-2 text-xs font-semibold text-amber-400",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lightbulb, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 311,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Points de vigilance" }, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 312,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 310,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
										className: "space-y-2 text-xs text-muted-foreground",
										children: interviewData.pointsFaibles.map((pf, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
											className: "flex items-start gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mt-1 size-1.5 rounded-full bg-amber-400 shrink-0" }, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 317,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: pf }, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 318,
												columnNumber: 25
											}, this)]
										}, i, true, {
											fileName: _jsxFileName$3,
											lineNumber: 316,
											columnNumber: 23
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 314,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 309,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 293,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 292,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
							value: "questions_recruteur",
							className: "mt-4 space-y-3",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-2xl border border-border/60 bg-card/60 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mb-3 flex items-center gap-2 text-xs font-semibold text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleQuestionMark, { className: "size-4 text-primary" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 330,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Questions stratégiques à poser à la fin de l'entretien" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 331,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 329,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
									className: "space-y-2 text-xs text-muted-foreground",
									children: interviewData.questionsARecruteur.map((qr, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
										className: "flex items-start gap-2 rounded-xl bg-background/50 p-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-bold text-primary",
											children: [i + 1, "."]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 341,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-foreground",
											children: qr
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 342,
											columnNumber: 23
										}, this)]
									}, i, true, {
										fileName: _jsxFileName$3,
										lineNumber: 337,
										columnNumber: 21
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 335,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 328,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 327,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 237,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: onPrevStep,
						className: "h-9 gap-1.5 rounded-xl border-border text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 359,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Retour à la prise de contact" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 360,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 352,
						columnNumber: 13
					}, this), onFinishWorkflow && /* @__PURE__ */ (void 0)(Button, {
						type: "button",
						onClick: onFinishWorkflow,
						className: "h-9 gap-2 rounded-xl bg-emerald-600 px-5 text-xs font-semibold text-white shadow-md hover:bg-emerald-700",
						children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 369,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("span", { children: "Workflow complet terminé" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 370,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 364,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 351,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 236,
				columnNumber: 9
			}, this) : null
		]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 155,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/app/applet/src/components/ai-hub/AiWorkflowStepper.tsx";
var STEPS = [
	{
		id: "offre",
		num: 1,
		label: "1. Offre & Missions",
		shortLabel: "Offre",
		icon: FileSearch
	},
	{
		id: "match",
		num: 2,
		label: "2. Match IA",
		shortLabel: "Match",
		icon: Sparkles
	},
	{
		id: "pitch",
		num: 3,
		label: "3. CV & Pitch",
		shortLabel: "CV & Pitch",
		icon: WandSparkles
	},
	{
		id: "contact",
		num: 4,
		label: "4. Prise de contact",
		shortLabel: "Contact",
		icon: Linkedin
	},
	{
		id: "interview",
		num: 5,
		label: "5. Interview Coach",
		shortLabel: "Coach",
		icon: MessageSquare
	}
];
var OFFRE_VIDE = {
	texte: "",
	entreprise: "",
	poste: "",
	lieu: "",
	lien: "",
	dateLimite: "",
	missions: "",
	profilRecherche: "",
	secteur: "",
	priorite: "auto",
	contactRecruteur: ""
};
function AiWorkflowStepper({ candidature, initialStep = "offre", preloadedOffre, onChangeCandidature, onUpdateCandidature, onDone }) {
	const [currentStep, setCurrentStep] = (0, import_react.useState)(initialStep);
	const [offreData, setOffreData] = (0, import_react.useState)(() => {
		if (candidature) return {
			texte: candidature.detail || "",
			entreprise: candidature.entreprise || "",
			poste: candidature.poste || "",
			lieu: candidature.lieu || "",
			lien: candidature.lien || "",
			dateLimite: candidature.dateLimite || "",
			missions: candidature.missions || "",
			profilRecherche: candidature.profilRecherche || "",
			secteur: candidature.secteur || "",
			priorite: candidature.priorite || "auto",
			contactRecruteur: candidature.contact || ""
		};
		return {
			...OFFRE_VIDE,
			...preloadedOffre
		};
	});
	const [matchData, setMatchData] = (0, import_react.useState)(void 0);
	const [pitchData, setPitchData] = (0, import_react.useState)(void 0);
	const [contactData, setContactData] = (0, import_react.useState)(void 0);
	const [interviewData, setInterviewData] = (0, import_react.useState)(void 0);
	(0, import_react.useEffect)(() => {
		if (candidature) {
			setOffreData({
				texte: candidature.detail || "",
				entreprise: candidature.entreprise || "",
				poste: candidature.poste || "",
				lieu: candidature.lieu || "",
				lien: candidature.lien || "",
				dateLimite: candidature.dateLimite || "",
				missions: candidature.missions || "",
				profilRecherche: candidature.profilRecherche || "",
				secteur: candidature.secteur || "",
				priorite: candidature.priorite || "auto",
				contactRecruteur: candidature.contact || ""
			});
			if (candidature.match) setMatchData({
				scoreGlobal: candidature.match.global,
				pointsForts: candidature.match.pointsForts || [],
				pointsVigilance: candidature.match.vigilance || [],
				competencesCles: candidature.match.details?.map((d) => d.critere) || [],
				explication: candidature.match.explication || "",
				recommandation: candidature.match.global >= 70 ? "Candidature fortement recommandée" : candidature.match.global >= 50 ? "Candidature possible sous réserve d'adaptation" : "Écarts importants constatés"
			});
			if (candidature.workflowProgress?.currentStep) setCurrentStep(candidature.workflowProgress.currentStep);
		}
	}, [candidature]);
	const handleReset = () => {
		if (onChangeCandidature) onChangeCandidature();
		else {
			setOffreData(OFFRE_VIDE);
			setMatchData(void 0);
			setPitchData(void 0);
			setContactData(void 0);
			setInterviewData(void 0);
			setCurrentStep("offre");
		}
	};
	const isStepCompleted = (stepId) => {
		switch (stepId) {
			case "offre": return Boolean(offreData.entreprise || offreData.poste || offreData.missions);
			case "match": return Boolean(matchData);
			case "pitch": return Boolean(pitchData);
			case "contact": return Boolean(contactData);
			case "interview": return Boolean(interviewData);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6 rounded-3xl border border-primary/20 bg-card/50 p-4 sm:p-6 shadow-xl backdrop-blur-xl",
		children: [
			candidature && /* @__PURE__ */ (void 0)("div", {
				className: "flex flex-col gap-2 rounded-2xl border border-primary/30 bg-primary/10 p-3.5 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-sm",
						children: /* @__PURE__ */ (void 0)(Building2, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 232,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 231,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (void 0)("h3", {
								className: "text-sm font-bold text-foreground",
								children: candidature.entreprise
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 236,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("span", {
								className: "text-xs text-muted-foreground",
								children: "•"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 239,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("span", {
								className: "text-xs font-medium text-foreground",
								children: candidature.poste
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 240,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 235,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("p", {
						className: "text-[11px] text-muted-foreground",
						children: ["Contexte chargé automatiquement • Statut : ", candidature.statut]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 244,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 234,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 230,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: handleReset,
					className: "h-8 gap-1.5 rounded-xl border-primary/30 text-xs font-medium text-primary hover:bg-primary/15",
					children: [/* @__PURE__ */ (void 0)(RotateCcw, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 257,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("span", { children: "Changer d'opportunité" }, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 258,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 250,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 229,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col gap-4 border-b border-border/50 pb-5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex size-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary",
								children: "✦"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 268,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "text-sm font-semibold tracking-tight text-foreground sm:text-base",
								children: "Workflow IA Candidature"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 271,
								columnNumber: 15
							}, this),
							offreData.poste && !candidature && /* @__PURE__ */ (void 0)(Badge, {
								variant: "outline",
								className: "text-[11px] border-primary/30 text-primary",
								children: offreData.poste
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 275,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 267,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-0.5 text-xs text-muted-foreground",
						children: "Guide complet de l'analyse d'une offre jusqu'à la simulation d'entretien."
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 283,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 266,
						columnNumber: 11
					}, this), !candidature && /* @__PURE__ */ (void 0)(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						onClick: handleReset,
						className: "h-8 gap-1.5 rounded-xl text-xs text-muted-foreground hover:text-foreground",
						children: [/* @__PURE__ */ (void 0)(RotateCcw, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 297,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("span", { children: "Réinitialiser" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 298,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 290,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 265,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-5 gap-1.5 sm:gap-2",
					children: STEPS.map((step) => {
						const isActive = currentStep === step.id;
						const completed = isStepCompleted(step.id);
						const Icon = step.icon;
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setCurrentStep(step.id),
							className: `group relative flex flex-col items-center justify-center rounded-2xl border p-2 sm:p-3 text-center transition-all ${isActive ? "border-primary bg-primary/15 shadow-sm ring-1 ring-primary/40 text-foreground" : completed ? "border-border/70 bg-card/70 hover:border-primary/40 text-muted-foreground hover:text-foreground" : "border-border/40 bg-card/30 opacity-70 hover:opacity-100 text-muted-foreground"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mb-1 flex items-center justify-center",
									children: completed && !isActive ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-4 text-emerald-400" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 325,
										columnNumber: 21
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: `size-4 transition-transform group-hover:scale-110 ${isActive ? "text-primary" : "text-muted-foreground"}` }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 327,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 323,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "hidden text-[11px] font-semibold sm:inline truncate max-w-full",
									children: step.label
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 335,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "inline text-[10px] font-semibold sm:hidden truncate max-w-full",
									children: step.shortLabel
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 338,
									columnNumber: 17
								}, this),
								isActive && /* @__PURE__ */ (void 0)("span", { className: "absolute -bottom-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-primary" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 343,
									columnNumber: 19
								}, this)
							]
						}, step.id, true, {
							fileName: _jsxFileName$2,
							lineNumber: 311,
							columnNumber: 15
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 304,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 264,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
				currentStep === "offre" && /* @__PURE__ */ (void 0)(AiOffreStep, {
					offreData,
					onChangeOffreData: (partial) => setOffreData((prev) => ({
						...prev,
						...partial
					})),
					onNextStep: () => setCurrentStep("match")
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 354,
					columnNumber: 11
				}, this),
				currentStep === "match" && /* @__PURE__ */ (void 0)(AiMatchStep, {
					offreData,
					matchData,
					onChangeMatchData: (res) => setMatchData(res),
					onNextStep: () => setCurrentStep("pitch"),
					onPrevStep: () => setCurrentStep("offre")
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 364,
					columnNumber: 11
				}, this),
				currentStep === "pitch" && /* @__PURE__ */ (void 0)(AiPitchStep, {
					offreData,
					matchData,
					pitchData,
					onChangePitchData: (res) => setPitchData(res),
					onNextStep: () => setCurrentStep("contact"),
					onPrevStep: () => setCurrentStep("match")
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 374,
					columnNumber: 11
				}, this),
				currentStep === "contact" && /* @__PURE__ */ (void 0)(AiContactStep, {
					offreData,
					contactData,
					onChangeContactData: (res) => setContactData(res),
					onNextStep: () => setCurrentStep("interview"),
					onPrevStep: () => setCurrentStep("pitch")
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 385,
					columnNumber: 11
				}, this),
				currentStep === "interview" && /* @__PURE__ */ (void 0)(AiInterviewStep, {
					offreData,
					interviewData,
					onChangeInterviewData: (res) => setInterviewData(res),
					onPrevStep: () => setCurrentStep("contact"),
					onFinishWorkflow: () => {
						if (onDone) onDone();
					}
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 395,
					columnNumber: 11
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 352,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 226,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/ai-hub/OpportunitySelector.tsx";
function OpportunitySelector({ items, selectedId, onSelect, onCreateNew, title = "Sur quelle opportunité voulez-vous travailler ?", subtitle = "Sélectionnez une opportunité enregistrée pour charger automatiquement l'offre et votre profil sans aucune saisie." }) {
	const [search, setSearch] = (0, import_react.useState)("");
	const filtered = items.filter((item) => {
		const q = search.toLowerCase().trim();
		if (!q) return true;
		return item.entreprise.toLowerCase().includes(q) || item.poste.toLowerCase().includes(q) || item.lieu.toLowerCase().includes(q) || item.statut.toLowerCase().includes(q);
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-4 rounded-3xl border border-primary/20 bg-card/60 p-5 sm:p-6 shadow-xl backdrop-blur-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid size-7 place-items-center rounded-xl bg-primary/15 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Target, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 53,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 52,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-base font-bold text-foreground",
						children: title
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 55,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 51,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: subtitle
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 57,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 50,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					onClick: onCreateNew,
					size: "sm",
					className: "gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-xs shadow-md",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 65,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Nouvelle opportunité" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 66,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 60,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 49,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 72,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
					value: search,
					onChange: (e) => setSearch(e.target.value),
					placeholder: "Rechercher par entreprise, poste, lieu ou statut...",
					className: "h-10 rounded-2xl border-border/60 bg-background/50 pl-10 text-xs text-foreground placeholder:text-muted-foreground/70"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 73,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 71,
				columnNumber: 7
			}, this),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Building2, { className: "size-8 text-muted-foreground/40" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 84,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm font-semibold text-foreground",
						children: search ? "Aucune opportunité trouvée" : "Aucune opportunité enregistrée"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 85,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: search ? "Essayez une autre recherche ou créez une nouvelle opportunité." : "Ajoutez votre première opportunité pour utiliser toutes les capacités de NACORA AI."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 90,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						onClick: onCreateNew,
						variant: "outline",
						size: "sm",
						className: "mt-4 gap-1.5 rounded-xl text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 101,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Ajouter une opportunité" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 102,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 95,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 83,
				columnNumber: 9
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: filtered.map((item) => {
					const isSelected = item.id === selectedId;
					const nba = getNextBestAction(item);
					const matchScore = item.match?.global;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => onSelect(item),
						className: `group relative flex flex-col justify-between rounded-2xl border p-4 text-left transition-all ${isSelected ? "border-primary bg-primary/10 ring-2 ring-primary/40 shadow-md" : "border-border/60 bg-background/40 hover:border-primary/40 hover:bg-card/80"}`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "grid size-8 shrink-0 place-items-center rounded-xl bg-muted/60 text-foreground font-bold text-xs",
									children: item.entreprise.slice(0, 2).toUpperCase()
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 126,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
									className: "text-sm font-bold text-foreground leading-tight group-hover:text-primary transition-colors",
									children: item.entreprise
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 130,
									columnNumber: 25
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs text-muted-foreground font-medium line-clamp-1",
									children: item.poste
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 133,
									columnNumber: 25
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 129,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 125,
								columnNumber: 21
							}, this), matchScore !== void 0 && /* @__PURE__ */ (void 0)(Badge, {
								variant: "outline",
								className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-[11px] font-bold shrink-0",
								children: [
									/* @__PURE__ */ (void 0)(Sparkles, { className: "mr-1 size-3" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 144,
										columnNumber: 25
									}, this),
									"Match ",
									matchScore,
									"%"
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 140,
								columnNumber: 23
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 124,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-3 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "secondary",
								className: "text-[10px] font-normal",
								children: item.statut
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 152,
								columnNumber: 21
							}, this), item.dateLimite && /* @__PURE__ */ (void 0)("span", {
								className: "flex items-center gap-1 text-[11px] text-muted-foreground",
								children: [
									/* @__PURE__ */ (void 0)(Calendar, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 160,
										columnNumber: 25
									}, this),
									"J-",
									item.dateLimite
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 159,
								columnNumber: 23
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 151,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 123,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-4 flex items-center justify-between border-t border-border/40 pt-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-1.5 text-xs text-primary font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "size-1.5 rounded-full bg-primary animate-pulse" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 170,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: nba.label }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 171,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 169,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "size-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 173,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 168,
							columnNumber: 17
						}, this)]
					}, item.id, true, {
						fileName: _jsxFileName$1,
						lineNumber: 113,
						columnNumber: 15
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 106,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 48,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/assistant.index.tsx?tsr-split=component";
var EXEMPLES_INTENTIONS = [
	{
		label: "Analyse cette offre et dis-moi si elle me correspond",
		step: "match"
	},
	{
		label: "Adapte mon CV à cette offre",
		step: "pitch"
	},
	{
		label: "Prépare-moi pour cet entretien",
		step: "interview"
	},
	{
		label: "Écris un mail au recruteur",
		step: "contact"
	},
	{
		label: "Aide-moi à relancer cette candidature",
		step: "contact"
	}
];
function AssistantHubPage() {
	const { user } = useSession();
	const profil = useProfil(user);
	const { items, save, patch } = useCandidatures();
	const [promptInput, setPromptInput] = (0, import_react.useState)("");
	const [selectedOpp, setSelectedOpp] = (0, import_react.useState)(null);
	const [activeStep, setActiveStep] = (0, import_react.useState)("offre");
	const [showSelectorModal, setShowSelectorModal] = (0, import_react.useState)(false);
	const [showCreateSheet, setShowCreateSheet] = (0, import_react.useState)(false);
	const [showQuotasModal, setShowQuotasModal] = (0, import_react.useState)(false);
	const [newOppDraft, setNewOppDraft] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const params = new URLSearchParams(window.location.search);
		const oppId = params.get("oppId");
		const step = params.get("step");
		if (oppId && items.length > 0) {
			const found = items.find((i) => i.id === oppId);
			if (found) {
				setSelectedOpp(found);
				if (step) setActiveStep(step);
			}
		}
	}, [items]);
	const handleIntentionSubmit = (text, targetStep) => {
		const query = text.toLowerCase().trim();
		if (!query) return;
		const foundOpp = items.find((item) => query.includes(item.entreprise.toLowerCase()) || query.includes(item.poste.toLowerCase()));
		if (foundOpp) {
			setSelectedOpp(foundOpp);
			setActiveStep(targetStep || "match");
			setPromptInput("");
			return;
		}
		if (selectedOpp) {
			setActiveStep(targetStep || "match");
			setPromptInput("");
			return;
		}
		setActiveStep(targetStep || "offre");
		setShowSelectorModal(true);
	};
	const handleQuickActionClick = (step) => {
		setActiveStep(step);
		if (!selectedOpp) setShowSelectorModal(true);
	};
	const handleSelectOpportunity = (candidature) => {
		setSelectedOpp(candidature);
		setShowSelectorModal(false);
	};
	const handleCreateNewOpp = () => {
		setShowSelectorModal(false);
		setNewOppDraft(emptyCandidature());
		setShowCreateSheet(true);
	};
	const handleSaveOpp = async (c) => {
		const saved = await save(c);
		setSelectedOpp(saved);
	};
	const handleUpdateOppProgress = (patchData) => {
		if (!selectedOpp) return;
		patch(selectedOpp.id, patchData);
		setSelectedOpp((prev) => prev ? {
			...prev,
			...patchData
		} : prev);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		eyebrow: "Intelligence Artificielle Unifiée",
		title: "CAREERLY AI",
		subtitle: "Votre copilote pour décrocher votre prochaine opportunité.",
		headerExtra: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-2",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				onClick: () => setShowQuotasModal(!showQuotasModal),
				className: "flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-primary/20",
				title: "Cliquez pour voir le détail de vos crédits",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Gauge, { className: "size-3.5 text-primary animate-pulse" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 120,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "32 / 40 crédits" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 121,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 119,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 117,
			columnNumber: 167
		}, this),
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-6 max-w-5xl mx-auto",
			children: [
				showQuotasModal && /* @__PURE__ */ (void 0)("div", {
					className: "pop-in rounded-2xl border border-primary/20 bg-card/80 p-4 shadow-xl",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center justify-between mb-3 border-b border-border/40 pb-2",
						children: [/* @__PURE__ */ (void 0)("h3", {
							className: "text-xs font-bold uppercase tracking-wider text-foreground",
							children: "Consommation de Crédits IA"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 128,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => setShowQuotasModal(false),
							className: "h-6 text-xs text-muted-foreground",
							children: "Fermer"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 131,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 127,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)(UsageIaCard, { connecte: Boolean(user) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 135,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 126,
					columnNumber: 29
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
					className: "relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-b from-card via-card/90 to-primary/5 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary/10 blur-3xl" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 140,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative z-10 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 144,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Demander à Careerly AI" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 145,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 143,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "text-xl sm:text-2xl font-black text-foreground tracking-tight",
								children: "Que voulez-vous faire ?"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 148,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
								onSubmit: (e) => {
									e.preventDefault();
									handleIntentionSubmit(promptInput);
								},
								className: "relative flex items-center",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: promptInput,
									onChange: (e) => setPromptInput(e.target.value),
									placeholder: "Ex: Analyse mon offre chez L'Oréal, adapte mon CV, écris un mail...",
									className: "h-14 sm:h-16 rounded-2xl border-primary/30 bg-background/80 pl-5 pr-14 text-sm sm:text-base text-foreground placeholder:text-muted-foreground/60 shadow-inner focus-visible:ring-primary/50"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 157,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									type: "submit",
									size: "icon",
									disabled: !promptInput.trim(),
									className: "absolute right-2 size-10 sm:size-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:scale-105 transition-transform",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { className: "size-4 sm:size-5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 159,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 158,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 153,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2",
									children: "Idées de requêtes rapides :"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 165,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-wrap gap-2",
									children: EXEMPLES_INTENTIONS.map((ex) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => {
											setPromptInput(ex.label);
											handleIntentionSubmit(ex.label, ex.step);
										},
										className: "inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-background/50 px-3 py-1.5 text-xs text-muted-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-foreground transition-all",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3 text-primary" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 173,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
											"« ",
											ex.label,
											" »"
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 174,
											columnNumber: 21
										}, this)]
									}, ex.label, true, {
										fileName: _jsxFileName,
										lineNumber: 169,
										columnNumber: 48
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 168,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 164,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 142,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 139,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => handleQuickActionClick("match"),
							className: "group flex flex-col items-start justify-between rounded-2xl border border-border/60 bg-card/60 p-4 text-left hover:border-primary/50 hover:bg-card hover:shadow-lg transition-all",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid size-10 place-items-center rounded-xl bg-primary/15 text-primary group-hover:scale-110 transition-transform",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 185,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 184,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "text-sm font-bold text-foreground group-hover:text-primary transition-colors",
									children: "Analyser une offre"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 188,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: "Match IA & opportunité"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 191,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 187,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 183,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => handleQuickActionClick("pitch"),
							className: "group flex flex-col items-start justify-between rounded-2xl border border-border/60 bg-card/60 p-4 text-left hover:border-primary/50 hover:bg-card hover:shadow-lg transition-all",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid size-10 place-items-center rounded-xl bg-violet-500/15 text-violet-400 group-hover:scale-110 transition-transform",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WandSparkles, { className: "size-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 199,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 198,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "text-sm font-bold text-foreground group-hover:text-primary transition-colors",
									children: "Adapter mon CV"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 202,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: "CV Optimizer & Pitch"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 205,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 201,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 197,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => handleQuickActionClick("contact"),
							className: "group flex flex-col items-start justify-between rounded-2xl border border-border/60 bg-card/60 p-4 text-left hover:border-primary/50 hover:bg-card hover:shadow-lg transition-all",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid size-10 place-items-center rounded-xl bg-indigo-500/15 text-indigo-400 group-hover:scale-110 transition-transform",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Linkedin, { className: "size-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 213,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 212,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "text-sm font-bold text-foreground group-hover:text-primary transition-colors",
									children: "Écrire un message"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 216,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: "Email / LinkedIn"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 219,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 215,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 211,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => handleQuickActionClick("interview"),
							className: "group flex flex-col items-start justify-between rounded-2xl border border-border/60 bg-card/60 p-4 text-left hover:border-primary/50 hover:bg-card hover:shadow-lg transition-all",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid size-10 place-items-center rounded-xl bg-amber-500/15 text-amber-400 group-hover:scale-110 transition-transform",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageSquare, { className: "size-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 227,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 226,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "text-sm font-bold text-foreground group-hover:text-primary transition-colors",
									children: "Préparer un entretien"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 230,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: "Interview Coach"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 233,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 229,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 225,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 182,
					columnNumber: 9
				}, this),
				!selectedOpp ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(OpportunitySelector, {
					items,
					onSelect: handleSelectOpportunity,
					onCreateNew: handleCreateNewOpp
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 241,
					columnNumber: 25
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AiWorkflowStepper, {
						candidature: selectedOpp,
						initialStep: activeStep,
						onChangeCandidature: () => setSelectedOpp(null),
						onUpdateCandidature: handleUpdateOppProgress
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 242,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 241,
					columnNumber: 133
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AiContextCard, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 246,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 124,
			columnNumber: 7
		}, this), showCreateSheet && newOppDraft && /* @__PURE__ */ (void 0)(CandidatureSheet, {
			open: showCreateSheet,
			onOpenChange: setShowCreateSheet,
			value: newOppDraft,
			onSave: handleSaveOpp,
			onStartWorkflow: (c) => {
				setSelectedOpp(c);
				setActiveStep("match");
			},
			profil
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 250,
			columnNumber: 42
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 117,
		columnNumber: 10
	}, this);
}
//#endregion
export { AssistantHubPage as component };

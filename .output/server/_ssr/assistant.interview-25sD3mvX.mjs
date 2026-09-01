import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-DDzEUEFj.mjs";
import { P as MessageSquareQuote, Ut as ArrowLeft, V as LoaderCircle, d as TriangleAlert, g as Target, v as Sparkles } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-JIGp6MTc.mjs";
import { t as Textarea } from "./textarea-CNcwtOlr.mjs";
import { t as texteErreurIA } from "./ai-erreurs-B0Gxtc15.mjs";
import { o as offreEnTexte, s as profilEnTexte } from "./match-run-CVvUCz6E.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BAFTKIAY.mjs";
import { t as useProfil } from "./useProfil-Batqat5N.mjs";
import { t as AiContextCard } from "./AiContextCard-Le8dFLpg.mjs";
import { t as useCandidatures } from "./useCandidatures-Cqc_s9SU.mjs";
import { t as genererInterview } from "./redaction.functions-wEfKVDTX.mjs";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./accordion-BbWVrCDQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assistant.interview-25sD3mvX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/assistant.interview.tsx?tsr-split=component";
function Liste({ titre, items, icon }) {
	if (!items.length) return null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "rounded-2xl border border-border/60 bg-card/60 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
			className: "mb-2 flex items-center gap-2 text-sm font-semibold",
			children: [icon, titre]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 37,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
			className: "list-disc pl-5 text-[13.5px] leading-relaxed text-muted-foreground",
			children: items.map((t, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: t }, i, false, {
				fileName: _jsxFileName,
				lineNumber: 42,
				columnNumber: 30
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 41,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 36,
		columnNumber: 10
	}, this);
}
function InterviewPage() {
	const { user, authLoading, items } = useCandidatures();
	const profil = useProfil(user);
	const [cibleId, setCibleId] = (0, import_react.useState)(items[0]?.id ?? "aucune");
	const [consigne, setConsigne] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [prep, setPrep] = (0, import_react.useState)(null);
	const lancer = async () => {
		if (!profil) {
			toast.error("Complétez d'abord votre profil.");
			return;
		}
		const cible = items.find((c) => c.id === cibleId) ?? null;
		setLoading(true);
		try {
			const r = await genererInterview({ data: {
				profil: profilEnTexte(profil),
				offre: cible ? offreEnTexte(cible) : "",
				consigne
			} });
			setPrep({
				questions: r.questions ?? [],
				argumentsCles: r.argumentsCles ?? [],
				pointsFaibles: r.pointsFaibles ?? [],
				questionsARecruteur: r.questionsARecruteur ?? []
			});
			toast.success("Simulation d'entretien générée !");
		} catch (e) {
			toast.error(texteErreurIA(e));
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		eyebrow: "NACORA AI Hub",
		title: "Interview Coach",
		subtitle: "Simulation d'entretien, trames STAR et questions au recruteur",
		headerExtra: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			asChild: true,
			variant: "outline",
			size: "sm",
			className: "h-8 gap-1.5 rounded-xl border-border/70 text-xs text-muted-foreground hover:text-foreground",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/assistant",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-3.5" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 87,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Retour AI Hub" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 88,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 86,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 85,
			columnNumber: 154
		}, this),
		actions: authLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-5 animate-spin opacity-70" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 90,
			columnNumber: 43
		}, this) : null,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AiContextCard, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 92,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
					className: "glass-card pop-in flex h-fit min-w-0 flex-col gap-4 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground",
							children: "Candidature visée"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 97,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
							value: cibleId,
							onValueChange: setCibleId,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
								className: "w-full rounded-2xl border-border/80 bg-card/70 py-5 text-sm",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "Sélectionnez une candidature" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 102,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 101,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
								value: "aucune",
								children: "Général (sans offre spécifique)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 105,
								columnNumber: 19
							}, this), items.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
								value: c.id,
								children: [
									c.entreprise,
									" — ",
									c.poste
								]
							}, c.id, true, {
								fileName: _jsxFileName,
								lineNumber: 108,
								columnNumber: 35
							}, this))] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 104,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 100,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 96,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground",
							children: "Consigne ou focus"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 116,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
							value: consigne,
							onChange: (e) => setConsigne(e.target.value),
							placeholder: "Ex. Insister sur la gestion du stress, le leadership ou un changement de secteur...",
							className: "min-h-[110px] rounded-2xl border-border/80 bg-card/70 text-xs"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 119,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 115,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							onClick: lancer,
							disabled: loading || !profil,
							className: "gap-2 rounded-2xl bg-primary py-5 text-xs font-semibold text-primary-foreground shadow-sm",
							children: loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 124,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Préparation en cours..." }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 125,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 123,
								columnNumber: 26
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 127,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Lancer l'entraînement" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 128,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 126,
								columnNumber: 23
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 122,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 95,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
					className: "flex min-w-0 flex-col gap-3",
					children: prep ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-2xl border border-border/60 bg-card/60 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "mb-2 text-sm font-semibold",
								children: "Questions probables & pistes de réponse (STAR)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 136,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Accordion, {
								type: "single",
								collapsible: true,
								className: "w-full",
								children: prep.questions.map((q, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionItem, {
									value: `q-${i}`,
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionTrigger, {
										className: "text-left text-xs font-medium",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "font-semibold text-primary",
												children: [
													"[",
													q.categorie,
													"]"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 142,
												columnNumber: 27
											}, this),
											" ",
											q.question
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 141,
										columnNumber: 25
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionContent, {
										className: "text-xs text-muted-foreground",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
											className: "list-disc pl-5",
											children: q.pistes.map((p, j) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: p }, j, false, {
												fileName: _jsxFileName,
												lineNumber: 149,
												columnNumber: 53
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 148,
											columnNumber: 27
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 147,
										columnNumber: 25
									}, this)]
								}, i, true, {
									fileName: _jsxFileName,
									lineNumber: 140,
									columnNumber: 51
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 139,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 135,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Liste, {
							titre: "Arguments clés à valoriser",
							items: prep.argumentsCles,
							icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Target, { className: "size-4 text-emerald-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 156,
								columnNumber: 92
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 156,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Liste, {
							titre: "Points faibles à anticiper",
							items: prep.pointsFaibles,
							icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TriangleAlert, { className: "size-4 text-amber-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 157,
								columnNumber: 92
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 157,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Liste, {
							titre: "Questions à poser au recruteur",
							items: prep.questionsARecruteur,
							icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageSquareQuote, { className: "size-4 text-primary" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 158,
								columnNumber: 102
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 158,
							columnNumber: 17
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 134,
						columnNumber: 21
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "glass-card p-10 text-center text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageSquareQuote, { className: "mx-auto size-8 text-muted-foreground/50 mb-2" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 160,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "font-medium text-foreground",
								children: "Aucune simulation active."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 161,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1",
								children: "Choisissez une offre et lancez l'entraînement."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 164,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 159,
						columnNumber: 21
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 133,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 94,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 91,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 85,
		columnNumber: 10
	}, this);
}
//#endregion
export { InterviewPage as component };

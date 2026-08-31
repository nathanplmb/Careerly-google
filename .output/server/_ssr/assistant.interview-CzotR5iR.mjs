import { a as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { P as MessageSquareQuote, V as LoaderCircle, Vt as ArrowLeft, d as TriangleAlert, g as Target, v as Sparkles } from "../_libs/lucide-react.mjs";
import { d as Textarea, dt as Button } from "./router-arR9ITmX.mjs";
import { t as AppShell } from "./AppShell-BYQcXmkR.mjs";
import { t as useProfil } from "./useProfil-CxU2OF5C.mjs";
import { t as AiContextCard } from "./AiContextCard-BSYnBw2n.mjs";
import { t as useCandidatures } from "./useCandidatures-CEqfC4kv.mjs";
import { c as texteErreurIA, o as offreEnTexte, s as profilEnTexte } from "./match-run-DMUqzz67.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DUy71i1r.mjs";
import { t as genererInterview } from "./redaction.functions-BKJl7GR7.mjs";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./accordion-DMoxE41r.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assistant.interview-CzotR5iR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Liste({ titre, items, icon }) {
	if (!items.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border/60 bg-card/60 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
			className: "mb-2 flex items-center gap-2 text-sm font-semibold",
			children: [icon, titre]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "list-disc pl-5 text-[13.5px] leading-relaxed text-muted-foreground",
			children: items.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t }, i))
		})]
	});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		eyebrow: "NACORA AI Hub",
		title: "Interview Coach",
		subtitle: "Simulation d'entretien, trames STAR et questions au recruteur",
		headerExtra: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "outline",
			size: "sm",
			className: "h-8 gap-1.5 rounded-xl border-border/70 text-xs text-muted-foreground hover:text-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/assistant",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Retour AI Hub" })]
			})
		}),
		actions: authLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin opacity-70" }) : null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiContextCard, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "glass-card pop-in flex h-fit min-w-0 flex-col gap-4 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground",
							children: "Candidature visée"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: cibleId,
							onValueChange: setCibleId,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-full rounded-2xl border-border/80 bg-card/70 py-5 text-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Sélectionnez une candidature" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "aucune",
								children: "Général (sans offre spécifique)"
							}), items.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: c.id,
								children: [
									c.entreprise,
									" — ",
									c.poste
								]
							}, c.id))] })]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground",
							children: "Consigne ou focus"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: consigne,
							onChange: (e) => setConsigne(e.target.value),
							placeholder: "Ex. Insister sur la gestion du stress, le leadership ou un changement de secteur...",
							className: "min-h-[110px] rounded-2xl border-border/80 bg-card/70 text-xs"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: lancer,
							disabled: loading || !profil,
							className: "gap-2 rounded-2xl bg-primary py-5 text-xs font-semibold text-primary-foreground shadow-sm",
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Préparation en cours..." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Lancer l'entraînement" })] })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "flex min-w-0 flex-col gap-3",
					children: prep ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border/60 bg-card/60 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-2 text-sm font-semibold",
								children: "Questions probables & pistes de réponse (STAR)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
								type: "single",
								collapsible: true,
								className: "w-full",
								children: prep.questions.map((q, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
									value: `q-${i}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionTrigger, {
										className: "text-left text-xs font-medium",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-semibold text-primary",
												children: [
													"[",
													q.categorie,
													"]"
												]
											}),
											" ",
											q.question
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
										className: "text-xs text-muted-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "list-disc pl-5",
											children: q.pistes.map((p, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: p }, j))
										})
									})]
								}, i))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Liste, {
							titre: "Arguments clés à valoriser",
							items: prep.argumentsCles,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-4 text-emerald-400" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Liste, {
							titre: "Points faibles à anticiper",
							items: prep.pointsFaibles,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 text-amber-400" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Liste, {
							titre: "Questions à poser au recruteur",
							items: prep.questionsARecruteur,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquareQuote, { className: "size-4 text-primary" })
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-card p-10 text-center text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquareQuote, { className: "mx-auto size-8 text-muted-foreground/50 mb-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-foreground",
								children: "Aucune simulation active."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1",
								children: "Choisissez une offre et lancez l'entraînement."
							})
						]
					})
				})]
			})]
		})
	});
}
//#endregion
export { InterviewPage as component };

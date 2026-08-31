import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as Trigger2, i as Root2, n as Header, r as Item, t as Content2, v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { M as MessageSquareQuote, _ as Sparkles, d as TriangleAlert, dt as ChevronDown, h as Target, z as LoaderCircle } from "../_libs/lucide-react.mjs";
import { M as cn, j as Button } from "./router-WcHZLW5p.mjs";
import { t as AppShell } from "./AppShell-CtCpxTdT.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { t as useCandidatures } from "./useCandidatures-hl-bBqH6.mjs";
import { t as texteErreurIA } from "./ai-erreurs-B0Gxtc15.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DUy71i1r.mjs";
import { t as useProfil } from "./useProfil-DVAoJvSn.mjs";
import { t as genererInterview } from "./redaction.functions-C3tBqTW2.mjs";
import { o as offreEnTexte, s as profilEnTexte } from "./match-run-r33f9orm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assistant.interview-Dcn3f760.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
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
		} catch (e) {
			toast.error(texteErreurIA(e));
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		eyebrow: "AI Studio",
		title: "Interview Coach",
		subtitle: "Questions probables, pistes de réponse et arguments clés",
		actions: authLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin opacity-70" }) : null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-card pop-in flex h-fit min-w-0 flex-col gap-4 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: "Entretien pour"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: cibleId,
						onValueChange: setCibleId,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "min-w-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choisir une offre" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "aucune",
							children: "Entretien générique"
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
						children: "Contexte complémentaire"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: consigne,
						onChange: (e) => setConsigne(e.target.value),
						rows: 5,
						placeholder: "Ex : entretien en visio de 30 min avec le manager technique."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => void lancer(),
						disabled: loading || !profil,
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), " Préparation…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {}), " Préparer l'entretien"] })
					}),
					!profil && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Renseignez d'abord",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/profil",
								className: "text-primary hover:underline",
								children: "votre profil"
							}),
							"."
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [!prep && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "glass-card p-8 text-center text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquareQuote, { className: "mx-auto mb-3 size-6 text-primary" }), "Votre préparation d'entretien apparaîtra ici."]
				}), prep && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pop-in flex flex-col gap-3",
					children: [
						prep.questions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-card p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-2 text-sm font-semibold",
								children: "Questions probables"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
								type: "single",
								collapsible: true,
								children: prep.questions.map((q, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
									value: `q${i}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
										className: "text-left text-[13.5px]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mr-2 rounded-full bg-primary/15 px-2 py-0.5 text-[11px] text-primary",
											children: q.categorie
										}), q.question] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "list-disc pl-5 text-[13.5px] text-muted-foreground",
										children: q.pistes.map((p, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: p }, j))
									}) })]
								}, i))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Liste, {
							titre: "Arguments clés à placer",
							items: prep.argumentsCles,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-4 text-primary" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Liste, {
							titre: "Points de vigilance",
							items: prep.pointsFaibles,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 text-amber-400" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Liste, {
							titre: "Questions à poser au recruteur",
							items: prep.questionsARecruteur,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquareQuote, { className: "size-4 text-primary" })
						})
					]
				})]
			})]
		})
	});
}
//#endregion
export { InterviewPage as component };

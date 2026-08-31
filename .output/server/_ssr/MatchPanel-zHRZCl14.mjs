import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as LoaderCircle, E as RefreshCw, _ as Sparkles, d as TriangleAlert, mt as CircleCheck, q as Info } from "../_libs/lucide-react.mjs";
import { M as cn, j as Button } from "./router-AVT1AZP0.mjs";
import { i as niveauMatch, t as labelRecommandation } from "./match-run-DeALWp7w.mjs";
import { t as Progress } from "./progress-Crx1Tb8I.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MatchPanel-zHRZCl14.js
var import_jsx_runtime = require_jsx_runtime();
function Liste({ titre, items, icon, tone }) {
	if (!items?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
		className: "flex items-center gap-2 text-sm font-medium",
		children: [icon, titre]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-2 space-y-1.5",
		children: items.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: cn("flex gap-2 text-sm text-muted-foreground", tone === "positif" && "text-foreground"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1 size-1.5 shrink-0 rounded-full bg-primary/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t })]
		}, i))
	})] });
}
function Chips({ titre, items, variant }) {
	if (!items?.length) return null;
	const cls = variant === "ok" ? "border-primary/30 bg-primary/10 text-primary" : variant === "warn" ? "border-destructive/30 bg-destructive/10 text-destructive" : "border-border bg-muted text-muted-foreground";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs font-medium text-muted-foreground",
		children: titre
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1.5 flex flex-wrap gap-1.5",
		children: items.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("rounded-full border px-2 py-0.5 text-xs", cls),
			children: s
		}, i))
	})] });
}
function MatchPanel({ match, obsolete, loading, erreur, profilPret, offrePrete, onAnalyser }) {
	const niveau = match ? niveauMatch(match.global) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border bg-card p-4 sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "flex items-center gap-2 text-sm font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-primary" }), "Correspondance avec votre profil"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					onClick: onAnalyser,
					disabled: loading || !profilPret || !offrePrete,
					variant: match ? "outline" : "default",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), " Analyse en cours…"] }) : match ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-4" }), " Ré-analyser"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), " Analyser avec l'IA"] })
				})]
			}),
			!profilPret && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 flex items-start gap-2 rounded-lg border border-dashed p-3 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "mt-0.5 size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Complétez d'abord votre",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/profil",
						className: "text-primary hover:underline",
						children: "profil"
					}),
					" ",
					"(formation, compétences, expériences) pour obtenir une analyse fiable."
				] })]
			}),
			profilPret && !offrePrete && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 flex items-start gap-2 rounded-lg border border-dashed p-3 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "mt-0.5 size-4 shrink-0" }), "Ajoutez le détail de l'offre (missions, profil recherché) pour lancer l'analyse."]
			}),
			erreur && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 size-4 shrink-0" }), erreur]
			}),
			loading && !match && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-40 animate-pulse rounded bg-muted" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-full animate-pulse rounded bg-muted" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-2/3 animate-pulse rounded bg-muted" })
				]
			}),
			!match && !loading && profilPret && offrePrete && !erreur && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "Aucune analyse pour le moment. Lancez l'analyse pour savoir si cette offre correspond à votre profil."
			}),
			match && niveau && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-5",
				children: [
					obsolete && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 shrink-0" }), "Votre profil ou l'offre a été modifié depuis la dernière analyse."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-end gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-4xl font-semibold text-primary",
							children: [match.global, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-lg text-muted-foreground",
								children: " / 100"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("mt-1 inline-flex rounded-full border px-2 py-0.5 text-xs font-medium", niveau.badge),
							children: niveau.label
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground",
							children: [
								typeof match.confiance === "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"Confiance de l'analyse : ",
									match.confiance,
									"%"
								] }),
								match.confianceRaison && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: match.confianceRaison }),
								match.genereLe && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"Analysé le",
									" ",
									new Date(match.genereLe).toLocaleDateString("fr-FR", {
										day: "2-digit",
										month: "2-digit",
										year: "numeric"
									})
								] })
							]
						})]
					}),
					match.details?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: match.details.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: d.critere
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: [d.score, " %"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: d.score,
								className: "mt-1.5 h-1.5"
							}),
							d.explication && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: d.explication
							})
						] }, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Liste, {
						titre: "Pourquoi cette offre vous correspond",
						items: match.pointsForts,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-primary" }),
						tone: "positif"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Liste, {
						titre: "Points de vigilance",
						items: match.vigilance,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 text-destructive" }),
						tone: "vigilance"
					}),
					(match.competences?.correspondances?.length || match.competences?.aRenforcer?.length || match.competences?.nonRenseignees?.length || match.competencesManquantes?.length) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-sm font-medium",
								children: "Compétences à renforcer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
								titre: "Correspondances",
								items: match.competences?.correspondances ?? [],
								variant: "ok"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
								titre: "À renforcer",
								items: match.competences?.aRenforcer ?? [],
								variant: "muted"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
								titre: "Non renseignées dans votre profil",
								items: match.competences?.nonRenseignees ?? match.competencesManquantes ?? [],
								variant: "warn"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border bg-muted/40 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-medium",
							children: ["Recommandation : ", labelRecommandation(match.recommandation)]
						}), match.explication && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: match.explication
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Le score repose sur la correspondance entre votre profil (formation, compétences, expériences, préférences) et les critères identifiés dans l'offre. C'est une aide à la décision, pas une prédiction de recrutement."
					})
				]
			})
		]
	});
}
//#endregion
export { MatchPanel as t };

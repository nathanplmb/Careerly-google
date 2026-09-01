import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as cn, t as Button } from "./button-DDzEUEFj.mjs";
import { D as RefreshCw, Tt as CircleCheck, V as LoaderCircle, Y as Info, d as TriangleAlert, v as Sparkles } from "../_libs/lucide-react.mjs";
import { i as niveauMatch, t as labelRecommandation } from "./match-run-Bhrc1Shm.mjs";
import { t as Progress } from "./progress-cTKs2o6Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MatchPanel-BHcj29Y-.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/MatchPanel.tsx";
function Liste({ titre, items, icon, tone }) {
	if (!items?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
		className: "flex items-center gap-2 text-sm font-medium",
		children: [icon, titre]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 46,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
		className: "mt-2 space-y-1.5",
		children: items.map((t, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
			className: cn("flex gap-2 text-sm text-muted-foreground", tone === "positif" && "text-foreground"),
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mt-1 size-1.5 shrink-0 rounded-full bg-primary/60" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 59,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 60,
				columnNumber: 13
			}, this)]
		}, i, true, {
			fileName: _jsxFileName,
			lineNumber: 52,
			columnNumber: 11
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 50,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 45,
		columnNumber: 5
	}, this);
}
function Chips({ titre, items, variant }) {
	if (!items?.length) return null;
	const cls = variant === "ok" ? "border-primary/30 bg-primary/10 text-primary" : variant === "warn" ? "border-destructive/30 bg-destructive/10 text-destructive" : "border-border bg-muted text-muted-foreground";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
		className: "text-xs font-medium text-muted-foreground",
		children: titre
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 86,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mt-1.5 flex flex-wrap gap-1.5",
		children: items.map((s, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: cn("rounded-full border px-2 py-0.5 text-xs", cls),
			children: s
		}, i, false, {
			fileName: _jsxFileName,
			lineNumber: 89,
			columnNumber: 11
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 87,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 85,
		columnNumber: 5
	}, this);
}
function MatchPanel({ match, obsolete, loading, erreur, profilPret, offrePrete, onAnalyser }) {
	const niveau = match ? niveauMatch(match.global) : null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "rounded-xl border bg-card p-4 sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "flex items-center gap-2 text-sm font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4 text-primary" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 116,
						columnNumber: 11
					}, this), "Correspondance avec votre profil"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 115,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					onClick: onAnalyser,
					disabled: loading || !profilPret || !offrePrete,
					variant: match ? "outline" : "default",
					children: loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 127,
						columnNumber: 15
					}, this), " Analyse en cours…"] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 126,
						columnNumber: 13
					}, this) : match ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 131,
						columnNumber: 15
					}, this), " Ré-analyser"] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 130,
						columnNumber: 13
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 135,
						columnNumber: 15
					}, this), " Analyser avec l'IA"] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 134,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 119,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 114,
				columnNumber: 7
			}, this),
			!profilPret && /* @__PURE__ */ (void 0)("p", {
				className: "mt-3 flex items-start gap-2 rounded-lg border border-dashed p-3 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (void 0)(Info, { className: "mt-0.5 size-4 shrink-0" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 143,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("span", { children: [
					"Complétez d'abord votre",
					" ",
					/* @__PURE__ */ (void 0)(Link, {
						to: "/profil",
						className: "text-primary hover:underline",
						children: "profil"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 146,
						columnNumber: 13
					}, this),
					" ",
					"(formation, compétences, expériences) pour obtenir une analyse fiable."
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 144,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 142,
				columnNumber: 9
			}, this),
			profilPret && !offrePrete && /* @__PURE__ */ (void 0)("p", {
				className: "mt-3 flex items-start gap-2 rounded-lg border border-dashed p-3 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (void 0)(Info, { className: "mt-0.5 size-4 shrink-0" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 157,
					columnNumber: 11
				}, this), "Ajoutez le détail de l'offre (missions, profil recherché) pour lancer l'analyse."]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 156,
				columnNumber: 9
			}, this),
			erreur && /* @__PURE__ */ (void 0)("p", {
				className: "mt-3 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive",
				children: [/* @__PURE__ */ (void 0)(TriangleAlert, { className: "mt-0.5 size-4 shrink-0" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 165,
					columnNumber: 11
				}, this), erreur]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 164,
				columnNumber: 9
			}, this),
			loading && !match && /* @__PURE__ */ (void 0)("div", {
				className: "mt-4 space-y-3",
				children: [
					/* @__PURE__ */ (void 0)("div", { className: "h-6 w-40 animate-pulse rounded bg-muted" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 172,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("div", { className: "h-2 w-full animate-pulse rounded bg-muted" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 173,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("div", { className: "h-2 w-2/3 animate-pulse rounded bg-muted" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 174,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 171,
				columnNumber: 9
			}, this),
			!match && !loading && profilPret && offrePrete && !erreur && /* @__PURE__ */ (void 0)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "Aucune analyse pour le moment. Lancez l'analyse pour savoir si cette offre correspond à votre profil."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 179,
				columnNumber: 9
			}, this),
			match && niveau && /* @__PURE__ */ (void 0)("div", {
				className: "mt-4 space-y-5",
				children: [
					obsolete && /* @__PURE__ */ (void 0)("p", {
						className: "flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm text-primary",
						children: [/* @__PURE__ */ (void 0)(TriangleAlert, { className: "size-4 shrink-0" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 189,
							columnNumber: 15
						}, this), "Votre profil ou l'offre a été modifié depuis la dernière analyse."]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 188,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "flex flex-wrap items-end gap-4",
						children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
							className: "text-4xl font-semibold text-primary",
							children: [match.global, /* @__PURE__ */ (void 0)("span", {
								className: "text-lg text-muted-foreground",
								children: " / 100"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 198,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 196,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("span", {
							className: cn("mt-1 inline-flex rounded-full border px-2 py-0.5 text-xs font-medium", niveau.badge),
							children: niveau.label
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 200,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 195,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "text-xs text-muted-foreground",
							children: [
								typeof match.confiance === "number" && /* @__PURE__ */ (void 0)("p", { children: [
									"Confiance de l'analyse : ",
									match.confiance,
									"%"
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 211,
									columnNumber: 17
								}, this),
								match.confianceRaison && /* @__PURE__ */ (void 0)("p", { children: match.confianceRaison }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 213,
									columnNumber: 41
								}, this),
								match.genereLe && /* @__PURE__ */ (void 0)("p", { children: [
									"Analysé le",
									" ",
									new Date(match.genereLe).toLocaleDateString("fr-FR", {
										day: "2-digit",
										month: "2-digit",
										year: "numeric"
									})
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 215,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 209,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 194,
						columnNumber: 11
					}, this),
					match.details?.length > 0 && /* @__PURE__ */ (void 0)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: match.details.map((d, i) => /* @__PURE__ */ (void 0)("div", { children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "flex items-baseline justify-between text-sm",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "font-medium",
									children: d.critere
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 232,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-muted-foreground",
									children: [d.score, " %"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 233,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 231,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Progress, {
								value: d.score,
								className: "mt-1.5 h-1.5"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 235,
								columnNumber: 19
							}, this),
							d.explication && /* @__PURE__ */ (void 0)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: d.explication
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 237,
								columnNumber: 21
							}, this)
						] }, i, true, {
							fileName: _jsxFileName,
							lineNumber: 230,
							columnNumber: 17
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 228,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)(Liste, {
						titre: "Pourquoi cette offre vous correspond",
						items: match.pointsForts,
						icon: /* @__PURE__ */ (void 0)(CircleCheck, { className: "size-4 text-primary" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 249,
							columnNumber: 19
						}, this),
						tone: "positif"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 246,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(Liste, {
						titre: "Points de vigilance",
						items: match.vigilance,
						icon: /* @__PURE__ */ (void 0)(TriangleAlert, { className: "size-4 text-destructive" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 256,
							columnNumber: 19
						}, this),
						tone: "vigilance"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 253,
						columnNumber: 11
					}, this),
					(match.competences?.correspondances?.length || match.competences?.aRenforcer?.length || match.competences?.nonRenseignees?.length || match.competencesManquantes?.length) && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (void 0)("h4", {
								className: "text-sm font-medium",
								children: "Compétences à renforcer"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 265,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)(Chips, {
								titre: "Correspondances",
								items: match.competences?.correspondances ?? [],
								variant: "ok"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 266,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)(Chips, {
								titre: "À renforcer",
								items: match.competences?.aRenforcer ?? [],
								variant: "muted"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 271,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)(Chips, {
								titre: "Non renseignées dans votre profil",
								items: match.competences?.nonRenseignees ?? match.competencesManquantes ?? [],
								variant: "warn"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 276,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 264,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "rounded-lg border bg-muted/40 p-3",
						children: [/* @__PURE__ */ (void 0)("p", {
							className: "text-sm font-medium",
							children: ["Recommandation : ", labelRecommandation(match.recommandation)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 289,
							columnNumber: 13
						}, this), match.explication && /* @__PURE__ */ (void 0)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: match.explication
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 293,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 288,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("p", {
						className: "text-xs text-muted-foreground",
						children: "Le score repose sur la correspondance entre votre profil (formation, compétences, expériences, préférences) et les critères identifiés dans l'offre. C'est une aide à la décision, pas une prédiction de recrutement."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 299,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 186,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 113,
		columnNumber: 5
	}, this);
}
//#endregion
export { MatchPanel as t };

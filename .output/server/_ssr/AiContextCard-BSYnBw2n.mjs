import { a as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as GraduationCap, Pt as BrainCircuit, Tt as ChevronRight, g as Target, l as UserCheck, lt as FileCheck, t as Zap, v as Sparkles } from "../_libs/lucide-react.mjs";
import { dt as Button } from "./router-arR9ITmX.mjs";
import { n as calculerCompletudeProfil, t as Badge } from "./profil-completion-DGP1qrUO.mjs";
import { t as Progress } from "./progress-Crx1Tb8I.mjs";
import { t as useProfil } from "./useProfil-CxU2OF5C.mjs";
import { t as useSession } from "./useSession-CT0M_nfQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AiContextCard-BSYnBw2n.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AiContextCard({ onRefresh }) {
	const { user } = useSession();
	const profil = useProfil(user);
	const score = (0, import_react.useMemo)(() => {
		return calculerCompletudeProfil(profil);
	}, [profil]).score;
	const cv = profil.cvStructure;
	const nbExp = cv?.experiences?.length ?? 0;
	const nbComp = cv?.competences?.length ?? 0;
	const aObjectif = Boolean(profil.metiers?.trim() || profil.contrats?.trim());
	const aCvFichier = Boolean(profil.nomFichierCv || profil.cvOriginalUrl);
	const getQualiteLabel = (s) => {
		if (s >= 80) return {
			label: "IA Précision Maximale",
			color: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
			desc: "L'IA exploite l'ensemble de votre parcours, compétences et objectifs."
		};
		if (s >= 50) return {
			label: "IA Précision Intermédiaire",
			color: "bg-amber-500/15 text-amber-300 border-amber-500/30",
			desc: "Complétez votre profil pour obtenir des simulations et arguments encore plus pointus."
		};
		return {
			label: "IA Mode Générique",
			color: "bg-primary/15 text-primary border-primary/30",
			desc: "Renseignez votre CV et vos expériences clés pour des réponses sur-mesure."
		};
	};
	const qualite = getQualiteLabel(score);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-card/90 via-card/60 to-primary/5 p-5 shadow-lg backdrop-blur-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/10 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, { className: "size-6 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground",
								children: "AI"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-semibold tracking-tight text-foreground",
								children: "Contexte Profil Connecté"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "outline",
								className: `text-[11px] font-medium ${qualite.color}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mr-1 size-3" }), qualite.label]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-xs text-muted-foreground",
							children: qualite.desc
						})] })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-[140px] flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-muted-foreground",
								children: "Complétude"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold text-foreground",
								children: [score, "%"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: score,
							className: "h-2 bg-muted/60"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							size: "sm",
							className: "h-8 gap-1.5 rounded-xl border-border/80 text-xs font-medium hover:border-primary/50 hover:bg-primary/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/profil",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Gérer mon profil" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" })]
							})
						}), onRefresh && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: onRefresh,
							className: "h-8 rounded-xl px-2.5 text-xs text-muted-foreground hover:text-foreground",
							title: "Actualiser le contexte IA",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5 text-primary" })
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-2 gap-2 border-t border-border/40 pt-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-xl bg-background/40 px-2.5 py-1.5 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "size-3.5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-muted-foreground",
							children: profil.prenom && profil.nom ? `${profil.prenom} ${profil.nom}` : "Identité de base"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-xl bg-background/40 px-2.5 py-1.5 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck, { className: "size-3.5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-muted-foreground",
							children: aCvFichier ? profil.nomFichierCv || "CV importé" : cv ? `${nbExp} exp • ${nbComp} comp` : "CV non importé"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-xl bg-background/40 px-2.5 py-1.5 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-3.5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-muted-foreground",
							children: profil.titre || cv?.titre || "Titre / École"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-xl bg-background/40 px-2.5 py-1.5 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-3.5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-muted-foreground",
							children: aObjectif ? profil.metiers || profil.contrats || "Cible définie" : "Objectif de poste"
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { AiContextCard as t };

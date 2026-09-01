import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-DDzEUEFj.mjs";
import { $ as GraduationCap, Ot as ChevronRight, Rt as BrainCircuit, g as Target, l as UserCheck, t as Zap, ut as FileCheck, v as Sparkles } from "../_libs/lucide-react.mjs";
import { t as Progress } from "./progress-cTKs2o6Y.mjs";
import { n as calculerCompletudeProfil, t as Badge } from "./profil-completion-C5jI9RaO.mjs";
import { t as useProfil } from "./useProfil-Vc3u7mk3.mjs";
import { t as useSession } from "./useSession-D5EIlFSn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AiContextCard-CXXVsso6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/ai-hub/AiContextCard.tsx";
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-card/90 via-card/60 to-primary/5 p-5 shadow-lg backdrop-blur-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/10 blur-3xl" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 62,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-center",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BrainCircuit, { className: "size-6 animate-pulse" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 69,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground",
								children: "AI"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 70,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 68,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-sm font-semibold tracking-tight text-foreground",
								children: "Contexte Profil Connecté"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 76,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "outline",
								className: `text-[11px] font-medium ${qualite.color}`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "mr-1 size-3" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 83,
									columnNumber: 19
								}, this), qualite.label]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 79,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 75,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-0.5 text-xs text-muted-foreground",
							children: qualite.desc
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 87,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 74,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 67,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 66,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex min-w-[140px] flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-medium text-muted-foreground",
								children: "Complétude"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 98,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-bold text-foreground",
								children: [score, "%"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 101,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 97,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Progress, {
							value: score,
							className: "h-2 bg-muted/60"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 103,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 96,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							asChild: true,
							variant: "outline",
							size: "sm",
							className: "h-8 gap-1.5 rounded-xl border-border/80 text-xs font-medium hover:border-primary/50 hover:bg-primary/10",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/profil",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Gérer mon profil" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 114,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 115,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 113,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 107,
							columnNumber: 13
						}, this), onRefresh && /* @__PURE__ */ (void 0)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: onRefresh,
							className: "h-8 rounded-xl px-2.5 text-xs text-muted-foreground hover:text-foreground",
							title: "Actualiser le contexte IA",
							children: /* @__PURE__ */ (void 0)(Zap, { className: "size-3.5 text-primary" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 126,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 119,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 106,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 95,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 64,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4 grid grid-cols-2 gap-2 border-t border-border/40 pt-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 rounded-xl bg-background/40 px-2.5 py-1.5 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserCheck, { className: "size-3.5 shrink-0 text-primary" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 136,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "truncate text-muted-foreground",
							children: profil.prenom && profil.nom ? `${profil.prenom} ${profil.nom}` : "Identité de base"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 137,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 135,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 rounded-xl bg-background/40 px-2.5 py-1.5 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileCheck, { className: "size-3.5 shrink-0 text-primary" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 145,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "truncate text-muted-foreground",
							children: aCvFichier ? profil.nomFichierCv || "CV importé" : cv ? `${nbExp} exp • ${nbComp} comp` : "CV non importé"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 146,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 144,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 rounded-xl bg-background/40 px-2.5 py-1.5 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GraduationCap, { className: "size-3.5 shrink-0 text-primary" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 156,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "truncate text-muted-foreground",
							children: profil.titre || cv?.titre || "Titre / École"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 157,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 155,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 rounded-xl bg-background/40 px-2.5 py-1.5 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Target, { className: "size-3.5 shrink-0 text-primary" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 163,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "truncate text-muted-foreground",
							children: aObjectif ? profil.metiers || profil.contrats || "Cible définie" : "Objectif de poste"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 164,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 162,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 134,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 60,
		columnNumber: 5
	}, this);
}
//#endregion
export { AiContextCard as t };

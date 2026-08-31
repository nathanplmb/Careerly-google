import { a as __toESM } from "../_runtime.mjs";
import { f as object, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as Save, E as Plus, H as Lightbulb, J as GraduationCap, T as RefreshCw, U as Languages, Z as FileText, _ as Sparkles, d as TriangleAlert, dt as ChevronDown, f as Trash2, gt as Briefcase, i as WandSparkles, q as Heart, r as Wrench, s as UserRound, st as CircleCheck, u as Upload, yt as Award, z as LoaderCircle } from "../_libs/lucide-react.mjs";
import { A as nouvelleLangue, C as normaliserCvStructure, D as nouvelleCompetence, E as nouvelleCertification, M as cn, O as nouvelleExperience, T as nouveauProjet, _ as loadProfil, a as Label, b as NIVEAUX_LANGUE, g as emptyProfil, h as IMPORTANCES, j as Button, k as nouvelleFormation, m as CRITERES, o as Input$1, v as saveProfilLocal, w as nouveauBenevolat, x as completionCv, y as NIVEAUX_COMPETENCE } from "./router-WcHZLW5p.mjs";
import { t as AppShell } from "./AppShell-CtCpxTdT.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BYfOmXtJ.mjs";
import { r as createServerFn } from "./server-Ca2emXMH.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-WrckP5Dl.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { t as useSession } from "./useSession-C42A4XJ5.mjs";
import { t as texteErreurIA } from "./ai-erreurs-B0Gxtc15.mjs";
import { n as extraireTexteFichier, t as TYPES_ACCEPTES } from "./cv-fichier-BFa0B9CM.mjs";
import { t as createSsrRpc } from "./createSsrRpc-CsOQ3iCQ.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DUy71i1r.mjs";
import { n as saveProfilCloud, t as fetchProfil } from "./profil-cloud-BeDjJTyb.mjs";
import { s as profilEnTexte } from "./match-run-r33f9orm.mjs";
import { t as Progress } from "./progress-Crx1Tb8I.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BBUarmca.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profil-BLYXJvN-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = object({
	cv: string().min(50),
	profil: string().optional()
});
var analyserCv = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => Input.parse(data)).handler(createSsrRpc("f31cec66ab6270632e857c072556e946de1cb08cff5fad1e7ad30363aeb8101e"));
/** Hash djb2 simple, identique dans l'esprit à celui du moteur de match. */
function hashTexte(texte) {
	let h = 5381;
	const t = texte.replace(/\s+/g, " ").trim().toLowerCase();
	for (let i = 0; i < t.length; i++) h = (h << 5) + h + t.charCodeAt(i) | 0;
	return (h >>> 0).toString(36);
}
function niveauCV(score) {
	if (score >= 80) return {
		label: "Excellent CV",
		badge: "border-primary/40 bg-primary/10 text-primary"
	};
	if (score >= 65) return {
		label: "Bon CV, quelques ajustements",
		badge: "border-primary/30 bg-primary/5 text-primary"
	};
	if (score >= 45) return {
		label: "À retravailler",
		badge: "border-amber-500/40 bg-amber-500/10 text-amber-600"
	};
	return {
		label: "Refonte conseillée",
		badge: "border-destructive/30 bg-destructive/10 text-destructive"
	};
}
function labelPriorite(p) {
	return p === "haute" ? "Prioritaire" : p === "moyenne" ? "Important" : "Bonus";
}
var CHAMPS = [
	{
		cle: "competences",
		label: "Compétences",
		source: "competences"
	},
	{
		cle: "logiciels",
		label: "Logiciels / outils",
		source: "logiciels"
	},
	{
		cle: "langues",
		label: "Langues",
		source: "langues"
	},
	{
		cle: "niveauAnglais",
		label: "Niveau d'anglais",
		source: "niveauAnglais"
	},
	{
		cle: "experiences",
		label: "Expériences",
		source: "experiences"
	},
	{
		cle: "formation",
		label: "Formation",
		source: "formation"
	},
	{
		cle: "ecole",
		label: "École",
		source: "ecole"
	},
	{
		cle: "niveau",
		label: "Niveau",
		source: "niveau"
	},
	{
		cle: "metiers",
		label: "Métiers visés",
		source: "metiers"
	},
	{
		cle: "domaines",
		label: "Domaines",
		source: "domaines"
	},
	{
		cle: "localisation",
		label: "Localisation",
		source: "localisation"
	}
];
function videStructure(cv) {
	if (!cv) return true;
	return cv.experiences.length === 0 && cv.formations.length === 0 && cv.competences.length === 0 && cv.certifications.length === 0;
}
function structureDetectee(brut) {
	if (!brut) return null;
	const s = normaliserCvStructure(brut);
	if (videStructure(s) && !s.titre && !s.accroche && s.langues.length === 0) return null;
	return s;
}
function CvAnalyseDialog({ open, onOpenChange, profil, cv, onSaveCv, onAppliquerProfil }) {
	const lancerAnalyseCv = useServerFn(analyserCv);
	const [texte, setTexte] = (0, import_react.useState)(cv?.texte ?? "");
	const [analyse, setAnalyse] = (0, import_react.useState)(cv?.analyse ?? null);
	const [genereLe, setGenereLe] = (0, import_react.useState)(cv?.genereLe ?? null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [lecture, setLecture] = (0, import_react.useState)(false);
	const [erreur, setErreur] = (0, import_react.useState)(null);
	const [drag, setDrag] = (0, import_react.useState)(false);
	const [autoRemplis, setAutoRemplis] = (0, import_react.useState)([]);
	const inputRef = (0, import_react.useRef)(null);
	const obsolete = Boolean(analyse && cv && hashTexte(texte) !== cv.hash);
	const lireFichier = async (file) => {
		setErreur(null);
		setLecture(true);
		try {
			const t = await extraireTexteFichier(file);
			setTexte(t);
		} catch (e) {
			setErreur(e instanceof Error ? e.message : "Lecture du fichier impossible.");
		} finally {
			setLecture(false);
		}
	};
	const lancer = async () => {
		if (texte.trim().length < 50) {
			setErreur("Le texte du CV est trop court pour être analysé.");
			return;
		}
		setLoading(true);
		setErreur(null);
		setAutoRemplis([]);
		try {
			const { modele, ...a } = await lancerAnalyseCv({ data: {
				cv: texte,
				profil: profilEnTexte(profil)
			} });
			const etat = {
				texte,
				analyse: a,
				genereLe: (/* @__PURE__ */ new Date()).toISOString(),
				hash: hashTexte(texte),
				modele
			};
			setAnalyse(a);
			setGenereLe(etat.genereLe);
			onSaveCv(etat);
			const d = a.profilDetecte;
			const patch = {};
			const remplis = [];
			for (const c of CHAMPS) {
				const valeur = (d?.[c.source] ?? "").trim();
				const actuel = String(profil[c.cle] ?? "").trim();
				if (valeur && !actuel) {
					patch[c.cle] = valeur;
					remplis.push(c.label);
				}
			}
			const structure = structureDetectee(a.cvStructure);
			if (structure && videStructure(profil.cvStructure)) {
				patch.cvStructure = structure;
				remplis.push("CV détaillé (expériences, formations, compétences…)");
			}
			if (remplis.length > 0) {
				setAutoRemplis(remplis);
				onAppliquerProfil(patch);
			}
		} catch (e) {
			setErreur(texteErreurIA(e));
		} finally {
			setLoading(false);
		}
	};
	const detecte = analyse?.profilDetecte;
	const champsDetectes = detecte ? CHAMPS.filter((c) => (detecte[c.source] ?? "").trim().length > 0) : [];
	const appliquer = () => {
		if (!detecte) return;
		const patch = {};
		for (const c of champsDetectes) patch[c.cle] = detecte[c.source].trim();
		const structure = structureDetectee(analyse?.cvStructure);
		const labels = champsDetectes.map((c) => c.label);
		if (structure) {
			patch.cvStructure = structure;
			labels.push("CV détaillé");
		}
		onAppliquerProfil(patch);
		setAutoRemplis(labels);
	};
	const niveau = analyse ? niveauCV(analyse.global) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90vh] max-w-3xl overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5 text-primary" }), " Analyser mon CV"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Déposez votre CV (PDF, .docx, .txt) ou collez son contenu : l'IA le note, vous donne des axes d'amélioration et peut pré-remplir votre profil." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onDragOver: (e) => {
							e.preventDefault();
							setDrag(true);
						},
						onDragLeave: () => setDrag(false),
						onDrop: (e) => {
							e.preventDefault();
							setDrag(false);
							const f = e.dataTransfer.files?.[0];
							if (f) lireFichier(f);
						},
						className: cn("flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition", drag ? "border-primary bg-primary/5" : "border-border"),
						children: [
							lecture ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-5 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: ["Glissez votre CV ici ou", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "link",
									className: "px-1",
									onClick: () => inputRef.current?.click(),
									children: "choisissez un fichier"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "PDF, DOCX, TXT, Markdown ou RTF — 20 Mo maximum."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: inputRef,
								type: "file",
								accept: TYPES_ACCEPTES,
								className: "hidden",
								onChange: (e) => {
									const f = e.target.files?.[0];
									if (f) lireFichier(f);
									e.target.value = "";
								}
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }), " Texte du CV"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 8,
								value: texte,
								onChange: (e) => setTexte(e.target.value),
								placeholder: "Collez ici le contenu de votre CV…"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [texte.trim().length, " caractères"]
							})
						]
					}),
					erreur && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 size-4 shrink-0" }), erreur]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: genereLe && `Dernière analyse le ${new Date(genereLe).toLocaleDateString("fr-FR", {
								day: "2-digit",
								month: "2-digit",
								year: "numeric"
							})}`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: lancer,
							disabled: loading || lecture,
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), " Analyse en cours…"] }) : analyse ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-4" }), " Ré-analyser"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), " Analyser mon CV"] })
						})]
					}),
					obsolete && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 shrink-0" }), "Le texte a changé depuis la dernière analyse : relancez-la."]
					}),
					analyse && niveau && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5 border-t pt-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-end gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-4xl font-semibold text-primary",
									children: [analyse.global, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-lg text-muted-foreground",
										children: [" ", "/ 100"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("mt-1 inline-flex rounded-full border px-2 py-0.5 text-xs font-medium", niveau.badge),
									children: niveau.label
								})] }), analyse.resume && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "max-w-md text-sm text-muted-foreground",
									children: analyse.resume
								})]
							}),
							analyse.scores?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: analyse.scores.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline justify-between text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: s.critere
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground",
											children: [s.score, " %"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
										value: s.score,
										className: "mt-1.5 h-1.5"
									}),
									s.explication && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: s.explication
									})
								] }, i))
							}),
							analyse.pointsForts?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "flex items-center gap-2 text-sm font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-primary" }), " Points forts"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-2 space-y-1.5",
								children: analyse.pointsForts.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1 size-1.5 shrink-0 rounded-full bg-primary/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p })]
								}, i))
							})] }),
							analyse.aCorriger?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "flex items-center gap-2 text-sm font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 text-destructive" }), " À améliorer"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-2 space-y-2",
								children: analyse.aCorriger.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "rounded-lg border p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium",
											children: c.titre
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("rounded-full border px-2 py-0.5 text-[11px]", c.priorite === "haute" ? "border-destructive/30 bg-destructive/10 text-destructive" : c.priorite === "moyenne" ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-muted text-muted-foreground"),
											children: labelPriorite(c.priorite)
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: c.conseil
									})]
								}, i))
							})] }),
							analyse.reformulations?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-sm font-medium",
								children: "Reformulations proposées"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-2 space-y-2",
								children: analyse.reformulations.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "rounded-lg border bg-muted/40 p-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground line-through",
										children: r.avant
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-medium text-foreground",
										children: r.apres
									})]
								}, i))
							})] }),
							analyse.motsClesManquants?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-muted-foreground",
								children: "Mots-clés manquants"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1.5 flex flex-wrap gap-1.5",
								children: analyse.motsClesManquants.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full border border-destructive/30 bg-destructive/10 px-2 py-0.5 text-xs text-destructive",
									children: m
								}, i))
							})] }),
							champsDetectes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										className: "flex items-center gap-2 text-sm font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "size-4 text-primary" }), " Profil détecté"]
									}),
									autoRemplis.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1.5 flex items-start gap-2 rounded-md border border-primary/30 bg-primary/10 p-2 text-[11px] text-primary",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-px size-3.5 shrink-0" }),
											"Profil complété automatiquement : ",
											autoRemplis.join(", "),
											"."
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-2 space-y-1.5",
										children: champsDetectes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-medium",
												children: [c.label, " : "]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: detecte[c.source]
											})]
										}, c.cle))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										className: "mt-3",
										onClick: appliquer,
										children: "Écraser tout le profil avec le CV"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-[11px] text-muted-foreground",
										children: "Les champs vides ont déjà été remplis automatiquement. Ce bouton remplace aussi les champs que vous aviez saisis."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Analyse générée par l'IA à partir du texte de votre CV : vérifiez toujours les suggestions avant de les appliquer."
							})
						]
					})
				]
			})]
		})
	});
}
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
function Champ({ label, value, onChange, placeholder, className, type }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("grid min-w-0 gap-1.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
			value,
			type,
			placeholder,
			onChange: (e) => onChange(e.target.value)
		})]
	});
}
function Bloc({ icone: Icone, titre, compte, onAjouter, labelAjout, children, defaultOpen }) {
	const [open, setOpen] = (0, import_react.useState)(defaultOpen ?? true);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "glass-card overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setOpen((o) => !o),
				className: "flex min-w-0 items-center gap-3 text-left",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icone, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate text-sm font-semibold",
							children: titre
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block text-xs text-muted-foreground",
							children: [
								compte,
								" élément",
								compte > 1 ? "s" : ""
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180") })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				variant: "outline",
				onClick: onAjouter,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }),
					" ",
					labelAjout
				]
			})]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 border-t border-border/60 p-4 sm:p-5",
			children
		})]
	});
}
function Carte({ titre, sousTitre, onSupprimer, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-2xl border border-border/60 bg-card/40 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-sm font-medium",
					children: titre || "Nouvel élément"
				}), sousTitre && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-xs text-muted-foreground",
					children: sousTitre
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "icon",
				variant: "ghost",
				className: "size-8 text-muted-foreground hover:text-destructive",
				onClick: onSupprimer,
				"aria-label": "Supprimer",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children
		})]
	});
}
function ListePuces({ label, valeurs, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					className: "text-xs text-muted-foreground",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "ghost",
					className: "h-7 px-2 text-xs",
					onClick: () => onChange([...valeurs, ""]),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), " Ajouter"]
				})]
			}),
			valeurs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Aucune ligne pour l'instant."
			}),
			valeurs.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
					value: v,
					placeholder,
					onChange: (e) => {
						const next = [...valeurs];
						next[i] = e.target.value;
						onChange(next);
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon",
					variant: "ghost",
					className: "size-8 shrink-0 text-muted-foreground hover:text-destructive",
					onClick: () => onChange(valeurs.filter((_, j) => j !== i)),
					"aria-label": "Retirer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
				})]
			}, i))
		]
	});
}
var ONGLETS = [
	{
		id: "identite",
		label: "Identité",
		icone: UserRound
	},
	{
		id: "experiences",
		label: "Expériences",
		icone: Briefcase
	},
	{
		id: "formations",
		label: "Formations",
		icone: GraduationCap
	},
	{
		id: "competences",
		label: "Compétences & langues",
		icone: Wrench
	},
	{
		id: "realisations",
		label: "Certifs & projets",
		icone: Award
	},
	{
		id: "engagements",
		label: "Engagements",
		icone: Heart
	}
];
function CvBuilder({ value, onChange }) {
	const [onglet, setOnglet] = (0, import_react.useState)("identite");
	const set = (patch) => onChange({
		...value,
		...patch
	});
	const maj = (cle, index, patch) => {
		const next = value[cle].map((x, i) => i === index ? {
			...x,
			...patch
		} : x);
		set({ [cle]: next });
	};
	const retirer = (cle, index) => {
		const liste = value[cle];
		set({ [cle]: liste.filter((_, i) => i !== index) });
	};
	const completion = completionCv(value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-sm font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-primary" }), " Complétion de votre CV"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm font-semibold text-primary",
							children: [completion, " %"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: completion,
						className: "mt-3 h-2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "Plus votre CV est détaillé, plus le Match IA et la préparation aux entretiens sont précis."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "-mx-1 flex gap-2 overflow-x-auto px-1 pb-1",
				children: ONGLETS.map((o) => {
					const Icone = o.icone;
					const actif = onglet === o.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setOnglet(o.id),
						className: cn("flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition", actif ? "border-primary/40 bg-primary/15 text-primary" : "border-border/60 bg-card/40 text-muted-foreground hover:text-foreground"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icone, { className: "size-3.5" }),
							" ",
							o.label
						]
					}, o.id);
				})
			}),
			onglet === "identite" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-card p-4 sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-9 place-items-center rounded-xl bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold",
						children: "En-tête du CV"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
							label: "Titre du CV",
							value: value.titre,
							onChange: (v) => set({ titre: v }),
							placeholder: "Étudiant M1 — Marketing digital"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
							label: "Ville",
							value: value.ville,
							onChange: (v) => set({ ville: v }),
							placeholder: "Paris"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
							label: "Email",
							value: value.email,
							onChange: (v) => set({ email: v }),
							placeholder: "prenom.nom@email.com"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
							label: "Téléphone",
							value: value.telephone,
							onChange: (v) => set({ telephone: v })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
							label: "LinkedIn",
							value: value.linkedin,
							onChange: (v) => set({ linkedin: v }),
							placeholder: "linkedin.com/in/…"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
							label: "Portfolio / site",
							value: value.portfolio,
							onChange: (v) => set({ portfolio: v })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
							label: "Permis / mobilité",
							value: value.permis,
							onChange: (v) => set({ permis: v }),
							placeholder: "Permis B, véhiculé"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Accroche"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 3,
								value: value.accroche,
								onChange: (e) => set({ accroche: e.target.value }),
								placeholder: "2 à 3 phrases sur votre projet et votre valeur ajoutée."
							})]
						})
					]
				})]
			}) }),
			onglet === "experiences" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Bloc, {
				icone: Briefcase,
				titre: "Expériences",
				compte: value.experiences.length,
				labelAjout: "Expérience",
				onAjouter: () => set({ experiences: [...value.experiences, nouvelleExperience()] }),
				children: [value.experiences.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Ajoutez vos stages, alternances, jobs et missions."
				}), value.experiences.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Carte, {
					titre: e.poste,
					sousTitre: [e.entreprise, e.lieu].filter(Boolean).join(" · "),
					onSupprimer: () => retirer("experiences", i),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
									label: "Poste",
									value: e.poste,
									onChange: (v) => maj("experiences", i, { poste: v })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
									label: "Entreprise",
									value: e.entreprise,
									onChange: (v) => maj("experiences", i, { entreprise: v })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
									label: "Lieu",
									value: e.lieu,
									onChange: (v) => maj("experiences", i, { lieu: v })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
									label: "Type de contrat",
									value: e.contrat,
									onChange: (v) => maj("experiences", i, { contrat: v }),
									placeholder: "Stage, alternance, CDD…"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
									label: "Début",
									value: e.debut,
									onChange: (v) => maj("experiences", i, { debut: v }),
									placeholder: "09/2024"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
									label: "Fin",
									value: e.fin,
									onChange: (v) => maj("experiences", i, { fin: v }),
									placeholder: "02/2025"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: e.enCours,
								onCheckedChange: (v) => maj("experiences", i, { enCours: v })
							}), "Poste actuel"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Contexte / missions"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 3,
								value: e.description,
								onChange: (ev) => maj("experiences", i, { description: ev.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListePuces, {
							label: "Réalisations (une par ligne)",
							valeurs: e.realisations,
							placeholder: "Augmenté le taux d'ouverture de 18 %",
							onChange: (v) => maj("experiences", i, { realisations: v })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListePuces, {
							label: "Compétences mobilisées",
							valeurs: e.competences,
							placeholder: "Excel avancé",
							onChange: (v) => maj("experiences", i, { competences: v })
						})
					]
				}, e.id))]
			}) }),
			onglet === "formations" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bloc, {
				icone: GraduationCap,
				titre: "Formations",
				compte: value.formations.length,
				labelAjout: "Formation",
				onAjouter: () => set({ formations: [...value.formations, nouvelleFormation()] }),
				children: value.formations.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Carte, {
					titre: f.diplome,
					sousTitre: f.etablissement,
					onSupprimer: () => retirer("formations", i),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
								label: "Diplôme",
								value: f.diplome,
								onChange: (v) => maj("formations", i, { diplome: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
								label: "Établissement",
								value: f.etablissement,
								onChange: (v) => maj("formations", i, { etablissement: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
								label: "Lieu",
								value: f.lieu,
								onChange: (v) => maj("formations", i, { lieu: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
								label: "Mention",
								value: f.mention,
								onChange: (v) => maj("formations", i, { mention: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
								label: "Début",
								value: f.debut,
								onChange: (v) => maj("formations", i, { debut: v }),
								placeholder: "2023"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
								label: "Fin",
								value: f.fin,
								onChange: (v) => maj("formations", i, { fin: v }),
								placeholder: "2026"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs text-muted-foreground",
							children: "Spécialisations, cours clés, projets"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 2,
							value: f.details,
							onChange: (ev) => maj("formations", i, { details: ev.target.value })
						})]
					})]
				}, f.id))
			}) }),
			onglet === "competences" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bloc, {
				icone: Wrench,
				titre: "Compétences",
				compte: value.competences.length,
				labelAjout: "Compétence",
				onAjouter: () => set({ competences: [...value.competences, nouvelleCompetence()] }),
				children: value.competences.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid items-end gap-3 rounded-2xl border border-border/60 bg-card/40 p-3 sm:grid-cols-[1fr_1fr_1fr_auto]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
							label: "Compétence",
							value: c.nom,
							onChange: (v) => maj("competences", i, { nom: v })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
							label: "Catégorie",
							value: c.categorie,
							onChange: (v) => maj("competences", i, { categorie: v }),
							placeholder: "Technique, logiciel, soft skill…"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid min-w-0 gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Niveau"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: c.niveau,
								onValueChange: (v) => maj("competences", i, { niveau: v }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "min-w-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: NIVEAUX_COMPETENCE.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: n,
									children: n
								}, n)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							className: "size-9 text-muted-foreground hover:text-destructive",
							onClick: () => retirer("competences", i),
							"aria-label": "Supprimer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})
					]
				}, c.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bloc, {
				icone: Languages,
				titre: "Langues",
				compte: value.langues.length,
				labelAjout: "Langue",
				onAjouter: () => set({ langues: [...value.langues, nouvelleLangue()] }),
				children: value.langues.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid items-end gap-3 rounded-2xl border border-border/60 bg-card/40 p-3 sm:grid-cols-[1fr_1fr_1fr_auto]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
							label: "Langue",
							value: l.nom,
							onChange: (v) => maj("langues", i, { nom: v })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid min-w-0 gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Niveau"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: l.niveau,
								onValueChange: (v) => maj("langues", i, { niveau: v }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "min-w-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: NIVEAUX_LANGUE.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: n,
									children: n
								}, n)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
							label: "Certification",
							value: l.certification,
							onChange: (v) => maj("langues", i, { certification: v }),
							placeholder: "TOEIC 900"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							className: "size-9 text-muted-foreground hover:text-destructive",
							onClick: () => retirer("langues", i),
							"aria-label": "Supprimer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})
					]
				}, l.id))
			})] }),
			onglet === "realisations" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bloc, {
				icone: Award,
				titre: "Certifications & diplômes complémentaires",
				compte: value.certifications.length,
				labelAjout: "Certification",
				onAjouter: () => set({ certifications: [...value.certifications, nouvelleCertification()] }),
				children: value.certifications.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Carte, {
					titre: c.nom,
					sousTitre: c.organisme,
					onSupprimer: () => retirer("certifications", i),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
								label: "Intitulé",
								value: c.nom,
								onChange: (v) => maj("certifications", i, { nom: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
								label: "Organisme",
								value: c.organisme,
								onChange: (v) => maj("certifications", i, { organisme: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
								label: "Date d'obtention",
								value: c.date,
								onChange: (v) => maj("certifications", i, { date: v }),
								placeholder: "06/2025"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
								label: "Identifiant / score",
								value: c.identifiant,
								onChange: (v) => maj("certifications", i, { identifiant: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
								label: "Lien",
								value: c.lien,
								onChange: (v) => maj("certifications", i, { lien: v }),
								className: "sm:col-span-2"
							})
						]
					})
				}, c.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bloc, {
				icone: Lightbulb,
				titre: "Projets",
				compte: value.projets.length,
				labelAjout: "Projet",
				onAjouter: () => set({ projets: [...value.projets, nouveauProjet()] }),
				children: value.projets.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Carte, {
					titre: p.nom,
					sousTitre: p.role,
					onSupprimer: () => retirer("projets", i),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
								label: "Nom du projet",
								value: p.nom,
								onChange: (v) => maj("projets", i, { nom: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
								label: "Votre rôle",
								value: p.role,
								onChange: (v) => maj("projets", i, { role: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
								label: "Période",
								value: p.periode,
								onChange: (v) => maj("projets", i, { periode: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
								label: "Lien",
								value: p.lien,
								onChange: (v) => maj("projets", i, { lien: v })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs text-muted-foreground",
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 3,
							value: p.description,
							onChange: (ev) => maj("projets", i, { description: ev.target.value })
						})]
					})]
				}, p.id))
			})] }),
			onglet === "engagements" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Bloc, {
				icone: Heart,
				titre: "Engagements & centres d'intérêt",
				compte: value.benevolats.length + value.interets.length,
				labelAjout: "Engagement",
				onAjouter: () => set({ benevolats: [...value.benevolats, nouveauBenevolat()] }),
				children: [value.benevolats.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Carte, {
					titre: b.role,
					sousTitre: b.organisation,
					onSupprimer: () => retirer("benevolats", i),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
								label: "Rôle",
								value: b.role,
								onChange: (v) => maj("benevolats", i, { role: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
								label: "Organisation",
								value: b.organisation,
								onChange: (v) => maj("benevolats", i, { organisation: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Champ, {
								label: "Période",
								value: b.periode,
								onChange: (v) => maj("benevolats", i, { periode: v }),
								className: "sm:col-span-2"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs text-muted-foreground",
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 2,
							value: b.description,
							onChange: (ev) => maj("benevolats", i, { description: ev.target.value })
						})]
					})]
				}, b.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListePuces, {
					label: "Centres d'intérêt",
					valeurs: value.interets,
					placeholder: "Course à pied, photographie…",
					onChange: (v) => set({ interets: v })
				})]
			}) })
		]
	});
}
function Field({ label, value, onChange, placeholder, type, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `grid gap-2 ${className ?? ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
			value,
			type,
			onChange: (e) => onChange(e.target.value),
			placeholder
		})]
	});
}
function Area({ label, value, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2 sm:col-span-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
			rows: 4,
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder
		})]
	});
}
function Section({ titre, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "glass-card lift-hover p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-lg font-semibold",
			children: titre
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid gap-4 sm:grid-cols-2",
			children
		})]
	});
}
function ProfilPage() {
	const { user, loading: authLoading } = useSession();
	const [profil, setProfil] = (0, import_react.useState)(emptyProfil());
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [cvOpen, setCvOpen] = (0, import_react.useState)(false);
	const set = (patch) => setProfil((p) => ({
		...p,
		...patch
	}));
	(0, import_react.useEffect)(() => {
		if (authLoading) return;
		let cancelled = false;
		(async () => {
			const local = loadProfil();
			if (!user?.id) {
				if (!cancelled) {
					setProfil(local);
					setLoading(false);
				}
				return;
			}
			try {
				const cloud = await fetchProfil();
				if (!cancelled) setProfil(cloud ?? local);
			} catch {
				if (!cancelled) setProfil(local);
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [user?.id, authLoading]);
	const enregistrer = async () => {
		setSaving(true);
		saveProfilLocal(profil);
		if (user) try {
			const saved = await saveProfilCloud(profil, user.id);
			setProfil(saved);
		} catch {
			toast.error("Enregistrement en ligne impossible.");
			setSaving(false);
			return;
		}
		setSaving(false);
		toast.success("Profil enregistré.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		eyebrow: "Compte",
		title: "Mon profil",
		subtitle: "Ces informations servent au score de correspondance et à la préparation.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "sm",
			variant: "outline",
			onClick: () => setCvOpen(true),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }), " Analyser mon CV"]
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-5xl",
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), " Chargement du profil…"]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "cv",
				className: "grid gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "w-full max-w-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "cv",
								className: "flex-1",
								children: "Mon CV"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "recherche",
								className: "flex-1",
								children: "Ma recherche"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "criteres",
								className: "flex-1",
								children: "Critères"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "cv",
						className: "grid gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
							titre: "Identité et formation",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Prénom",
									value: profil.prenom,
									onChange: (v) => set({ prenom: v })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Nom",
									value: profil.nom,
									onChange: (v) => set({ nom: v })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Formation",
									value: profil.formation,
									onChange: (v) => set({ formation: v }),
									placeholder: "Programme Grande École"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "École",
									value: profil.ecole,
									onChange: (v) => set({ ecole: v })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Niveau",
									value: profil.niveau,
									onChange: (v) => set({ niveau: v }),
									placeholder: "M1"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Type de contrat recherché",
									value: profil.contrats,
									onChange: (v) => set({ contrats: v }),
									placeholder: "Stage, alternance…"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CvBuilder, {
							value: normaliserCvStructure(profil.cvStructure),
							onChange: (cv) => set({ cvStructure: cv })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "recherche",
						className: "grid gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
							titre: "Recherche",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Localisation souhaitée",
									value: profil.localisation,
									onChange: (v) => set({ localisation: v }),
									placeholder: "Paris, Lyon…"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Mobilité",
									value: profil.mobilite,
									onChange: (v) => set({ mobilite: v }),
									placeholder: "France entière, international…"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Date de début",
									type: "date",
									value: profil.dateDebut,
									onChange: (v) => set({ dateDebut: v })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Durée",
									value: profil.duree,
									onChange: (v) => set({ duree: v }),
									placeholder: "6 mois"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Télétravail souhaité",
									value: profil.teletravail,
									onChange: (v) => set({ teletravail: v }),
									placeholder: "2 jours / semaine"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Rémunération souhaitée",
									value: profil.remuneration,
									onChange: (v) => set({ remuneration: v }),
									placeholder: "1200 € / mois"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									label: "Domaines / secteurs visés",
									value: profil.domaines,
									onChange: (v) => set({ domaines: v }),
									placeholder: "Marketing, luxe, conseil…"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									label: "Métiers visés",
									value: profil.metiers,
									onChange: (v) => set({ metiers: v }),
									placeholder: "Chef de produit junior, consultant junior…"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									label: "Entreprises ciblées",
									value: profil.entreprisesCiblees,
									onChange: (v) => set({ entreprisesCiblees: v })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
							titre: "Compétences et expériences",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									label: "Compétences",
									value: profil.competences,
									onChange: (v) => set({ competences: v }),
									placeholder: "Analyse de données, gestion de projet…"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									label: "Logiciels",
									value: profil.logiciels,
									onChange: (v) => set({ logiciels: v }),
									placeholder: "Excel, Power BI, Salesforce…"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Langues",
									value: profil.langues,
									onChange: (v) => set({ langues: v }),
									placeholder: "Français, anglais, espagnol"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Niveau d'anglais",
									value: profil.niveauAnglais,
									onChange: (v) => set({ niveauAnglais: v }),
									placeholder: "C1 / TOEIC 900"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									label: "Expériences",
									value: profil.experiences,
									onChange: (v) => set({ experiences: v }),
									placeholder: "Stage de 2 mois chez…"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "criteres",
						className: "grid gap-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							titre: "Critères prioritaires",
							children: CRITERES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "capitalize",
									children: c
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: profil.criteres[c] ?? "Moyen",
									onValueChange: (v) => set({ criteres: {
										...profil.criteres,
										[c]: v
									} }),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: IMPORTANCES.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: i,
										children: i
									}, i)) })]
								})]
							}, c))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: user ? "Profil synchronisé sur votre compte." : "Profil enregistré dans ce navigateur. Créez un compte pour le retrouver partout."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: enregistrer,
							disabled: saving,
							children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), "Enregistrer"]
						})]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CvAnalyseDialog, {
			open: cvOpen,
			onOpenChange: setCvOpen,
			profil,
			cv: profil.cv ?? null,
			onSaveCv: (cv) => {
				const next = {
					...profil,
					cv
				};
				setProfil(next);
				saveProfilLocal(next);
				if (user) saveProfilCloud(next, user.id).catch(() => void 0);
			},
			onAppliquerProfil: (patch) => {
				const next = {
					...profil,
					...patch
				};
				setProfil(next);
				saveProfilLocal(next);
				if (user) saveProfilCloud(next, user.id).catch(() => void 0);
				toast.success("Profil pré-rempli depuis le CV.");
			}
		})]
	});
}
//#endregion
export { ProfilPage as component };

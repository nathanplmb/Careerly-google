import { a as __toESM } from "../_runtime.mjs";
import { f as object, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as FileText, B as LoaderCircle, D as Plus, Dt as Award, E as RefreshCw, F as MapPin, G as Languages, Ot as ArrowUpRight, St as Building, U as Lightbulb, W as Laptop, X as GraduationCap, Y as Heart, _ as Sparkles, at as Euro, d as TriangleAlert, dt as CodeXml, f as Trash2, h as Target, i as WandSparkles, mt as CircleCheck, o as User, r as Wrench, s as UserRound, st as Earth, tt as FileCode, u as Upload, ut as Compass, v as SlidersHorizontal, vt as ChevronDown, w as Save, wt as Briefcase, yt as Check } from "../_libs/lucide-react.mjs";
import { A as nouvelleLangue, C as normaliserCvStructure, D as nouvelleCompetence, E as nouvelleCertification, M as cn, O as nouvelleExperience, T as nouveauProjet, _ as loadProfil, a as Label, b as NIVEAUX_LANGUE, h as IMPORTANCES, j as Button, k as nouvelleFormation, m as CRITERES, o as Input$1, v as saveProfilLocal, w as nouveauBenevolat, x as completionCv, y as NIVEAUX_COMPETENCE } from "./router-AVT1AZP0.mjs";
import { t as AppShell } from "./AppShell-BmQ9z9SM.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BYfOmXtJ.mjs";
import { r as createServerFn } from "./server-D8ETlJSB.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-CU_jJy1z.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { t as useSession } from "./useSession-BdHRU-xT.mjs";
import { t as texteErreurIA } from "./ai-erreurs-B0Gxtc15.mjs";
import { n as extraireTexteFichier, t as TYPES_ACCEPTES } from "./cv-fichier-BFa0B9CM.mjs";
import { t as createSsrRpc } from "./createSsrRpc-CkNRMsgU.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DUy71i1r.mjs";
import { n as saveProfilCloud, t as fetchProfil } from "./profil-cloud-DZIUduAY.mjs";
import { s as profilEnTexte } from "./match-run-DeALWp7w.mjs";
import { t as Progress } from "./progress-Crx1Tb8I.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BBUarmca.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profil-Fy8rM60Y.js
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
function calculerCompletudeProfil(p) {
	let score = 0;
	const suggestions = [];
	if (p.prenom.trim() && p.nom.trim()) score += 10;
	else suggestions.push({
		id: "identite",
		titre: "Renseigner votre prénom et nom",
		tab: "formation",
		gain: 10
	});
	if (p.formation.trim() || p.ecole.trim()) score += 15;
	else suggestions.push({
		id: "formation",
		titre: "Préciser votre école et formation",
		tab: "formation",
		gain: 15
	});
	if (p.metiers.trim()) score += 10;
	else suggestions.push({
		id: "metiers",
		titre: "Ajouter vos métiers cibles",
		tab: "recherche",
		gain: 10
	});
	if (p.domaines.trim() || p.entreprisesCiblees.trim()) score += 10;
	else suggestions.push({
		id: "domaines",
		titre: "Indiquer vos secteurs ou entreprises visés",
		tab: "recherche",
		gain: 10
	});
	if (p.localisation.trim() || p.mobilite.trim()) score += 5;
	else suggestions.push({
		id: "localisation",
		titre: "Définir votre localisation souhaitée",
		tab: "recherche",
		gain: 5
	});
	if (p.competences.trim()) score += 10;
	else suggestions.push({
		id: "competences",
		titre: "Lister vos compétences clés",
		tab: "competences",
		gain: 10
	});
	if (p.logiciels.trim()) score += 8;
	else suggestions.push({
		id: "logiciels",
		titre: "Ajouter les logiciels maîtrisés",
		tab: "competences",
		gain: 8
	});
	if (p.langues.trim() || p.niveauAnglais.trim()) score += 7;
	else suggestions.push({
		id: "langues",
		titre: "Indiquer votre niveau de langues",
		tab: "competences",
		gain: 7
	});
	const cv = p.cvStructure;
	if ((cv?.experiences?.length ?? 0) > 0 || (cv?.formations?.length ?? 0) > 0 || (cv?.competences?.length ?? 0) > 0 || Boolean(p.experiences?.trim())) score += 15;
	else suggestions.push({
		id: "cv",
		titre: "Remplir votre CV structuré ou vos expériences",
		tab: "cv",
		gain: 15
	});
	if (p.criteres && Object.keys(p.criteres).length >= 3) score += 10;
	else suggestions.push({
		id: "criteres",
		titre: "Ajuster vos priorités de matching",
		tab: "criteres",
		gain: 10
	});
	const scoreFinal = Math.min(100, score);
	let label = "Profil initial";
	let badgeColor = "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
	if (scoreFinal >= 90) {
		label = "Profil Expert • Matching IA maximal";
		badgeColor = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
	} else if (scoreFinal >= 70) {
		label = "Profil Avancé • Matching optimisé";
		badgeColor = "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
	} else if (scoreFinal >= 45) {
		label = "Profil Intermédiaire";
		badgeColor = "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20";
	}
	return {
		score: scoreFinal,
		label,
		badgeColor,
		suggestions: suggestions.slice(0, 3)
	};
}
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function ProfilHeaderCard({ profil, bilan, onOpenCvModal, onSelectTab }) {
	const nomAffiche = profil.prenom || profil.nom ? `${profil.prenom} ${profil.nom}`.trim() : "Étudiant";
	const initiales = (profil.prenom?.[0] || "") + (profil.nom?.[0] || "") || profil.ecole?.[0] || "E";
	const sousTitre = [
		profil.ecole || "École à renseigner",
		profil.formation || "Cursus",
		profil.niveau
	].filter(Boolean).join(" • ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-card relative overflow-hidden p-6 sm:p-7",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-primary/10 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-4 sm:gap-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-xl font-bold text-primary-foreground shadow-md shadow-primary/20",
					children: initiales.toUpperCase()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-xl font-bold tracking-tight text-foreground sm:text-2xl",
								children: nomAffiche
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: `text-xs font-medium ${bilan.badgeColor}`,
								children: bilan.label
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: sousTitre
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2 pt-1",
							children: [
								profil.contrats && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center rounded-md bg-secondary/80 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground",
									children: ["🎯 ", profil.contrats]
								}),
								profil.localisation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center rounded-md bg-secondary/80 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground",
									children: ["📍 ", profil.localisation]
								}),
								profil.domaines && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center rounded-md bg-secondary/80 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground",
									children: ["💼 ", profil.domaines.split(",")[0]?.trim()]
								})
							]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3.5 rounded-xl border border-border/60 bg-background/50 p-4 lg:w-80",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5 text-xs font-semibold text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-primary" }), "Complétude du profil"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm font-bold text-foreground",
							children: [bilan.score, "%"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: bilan.score,
						className: "h-2"
					}),
					bilan.suggestions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] text-muted-foreground",
							children: "Conseil pour booster le matching IA :"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => onSelectTab(bilan.suggestions[0].tab),
							className: "group flex w-full items-center justify-between text-left text-xs font-medium text-primary hover:underline",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: bilan.suggestions[0].titre }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-emerald-600 dark:text-emerald-400",
						children: "✨ Votre profil est complet ! Le matching IA et les lettres sont personnalisés au maximum."
					})
				]
			})]
		})]
	});
}
function ProfilTagSuggestions({ label = "Suggestions rapides", tags, currentValue, onSelectTag }) {
	const currentLower = currentValue.toLowerCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5 pt-1",
		children: [label && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-[11px] font-medium text-muted-foreground",
			children: [label, " :"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-1.5",
			children: tags.map((tag) => {
				const isSelected = currentLower.includes(tag.toLowerCase());
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onSelectTag(tag),
					className: `inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition-all ${isSelected ? "border border-primary/40 bg-primary/10 font-medium text-primary shadow-xs" : "border border-border/60 bg-muted/40 text-muted-foreground hover:border-primary/30 hover:bg-muted/80 hover:text-foreground"}`,
					children: [isSelected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3 opacity-60" }), tag]
				}, tag);
			})
		})]
	});
}
var SUGGESTIONS_METIERS = [
	"Bras Droit CEO",
	"Consultant Junior",
	"Analyste M&A",
	"Chef de Projet",
	"Data Analyst",
	"Product Manager Junior",
	"Business Developer",
	"Chargé de Marketing",
	"Contrôleur de Gestion"
];
var SUGGESTIONS_SECTEURS = [
	"Conseil & Stratégie",
	"Finance & Banque",
	"Tech & IA",
	"Luxe & Cosmétiques",
	"Santé & Pharma",
	"E-commerce & Retail",
	"Industrie & Énergie",
	"Audit & Gestion"
];
var SUGGESTIONS_ENTREPRISES = [
	"L'Oréal",
	"BNP Paribas",
	"McKinsey & Co",
	"LVMH",
	"TotalEnergies",
	"Capgemini",
	"Société Générale",
	"Google",
	"Danone",
	"Kearney"
];
var SUGGESTIONS_LIEUX = [
	"Paris & Île-de-France",
	"Lyon",
	"Bordeaux",
	"Nantes",
	"Lille",
	"Toulouse",
	"Marseille",
	"Milan (Italie)",
	"Londres (UK)",
	"Madrid (Espagne)",
	"Full Remote (100% Télétravail)"
];
var PRESETS_TELETRAVAIL = [
	"Hybride (2-3 jours / semaine)",
	"Hybride (1-2 jours / semaine)",
	"100% Télétravail (Full remote)",
	"100% Présentiel (Sur site)",
	"Flexible / Ouvert"
];
var PRESETS_REMUNERATION = [
	"Minimum légal (~650 € / mois)",
	"1 000 € / mois",
	"1 200 € / mois",
	"1 500 € / mois",
	"1 800 €+ / mois",
	"Selon profil / Négociable"
];
var PRESETS_DUREE = [
	"Stage 4 à 6 mois",
	"Stage 6 mois",
	"Alternance 1 an",
	"Alternance 2 ans",
	"Césure (2x 6 mois)",
	"Graduate Program"
];
function ProfilRechercheTab({ profil, onChange }) {
	const toggleOrAppendTag = (field, current, tag) => {
		const list = current.split(/[,;\n]/).map((s) => s.trim()).filter(Boolean);
		const exists = list.some((s) => s.toLowerCase() === tag.toLowerCase());
		let next;
		if (exists) next = list.filter((s) => s.toLowerCase() !== tag.toLowerCase()).join(", ");
		else next = list.length > 0 ? `${current.trim()}, ${tag}` : tag;
		onChange({ [field]: next });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-card space-y-5 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5 pb-2 border-b border-border/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold text-foreground",
						children: "Métiers, Secteurs & Entreprises cibles"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Ces éléments orientent directement le calcul du score de matching de chaque offre."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "metiers-input",
									className: "text-sm font-medium",
									children: "Métiers ou postes visés"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									id: "metiers-input",
									value: profil.metiers,
									onChange: (e) => onChange({ metiers: e.target.value }),
									placeholder: "Ex: Bras Droit CEO, Consultant Stratégie Junior, Data Analyst..."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilTagSuggestions, {
									tags: SUGGESTIONS_METIERS,
									currentValue: profil.metiers,
									onSelectTag: (tag) => toggleOrAppendTag("metiers", profil.metiers, tag)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "domaines-input",
									className: "text-sm font-medium",
									children: "Secteurs & Domaines d'activité"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									id: "domaines-input",
									value: profil.domaines,
									onChange: (e) => onChange({ domaines: e.target.value }),
									placeholder: "Ex: Conseil en Stratégie, Finance d'entreprise, Tech & IA, Luxe..."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilTagSuggestions, {
									tags: SUGGESTIONS_SECTEURS,
									currentValue: profil.domaines,
									onSelectTag: (tag) => toggleOrAppendTag("domaines", profil.domaines, tag)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "entreprises-input",
									className: "text-sm font-medium",
									children: "Entreprises prioritaires ciblées"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "entreprises-input",
									rows: 2,
									value: profil.entreprisesCiblees,
									onChange: (e) => onChange({ entreprisesCiblees: e.target.value }),
									placeholder: "Ex: L'Oréal, McKinsey, BNP Paribas, Danone, Capgemini..."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilTagSuggestions, {
									tags: SUGGESTIONS_ENTREPRISES,
									currentValue: profil.entreprisesCiblees,
									onSelectTag: (tag) => toggleOrAppendTag("entreprisesCiblees", profil.entreprisesCiblees, tag)
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-card space-y-5 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5 pb-2 border-b border-border/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold text-foreground",
						children: "Localisation & Calendrier"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Précisez vos disponibilités et zones géographiques de recherche."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 sm:col-span-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "loc-input",
									className: "text-sm font-medium",
									children: "Localisation souhaitée"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									id: "loc-input",
									value: profil.localisation,
									onChange: (e) => onChange({ localisation: e.target.value }),
									placeholder: "Ex: Paris, Lyon, International..."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilTagSuggestions, {
									tags: SUGGESTIONS_LIEUX,
									currentValue: profil.localisation,
									onSelectTag: (tag) => onChange({ localisation: tag })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "mob-input",
								className: "text-sm font-medium",
								children: "Mobilité géographique"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								id: "mob-input",
								value: profil.mobilite,
								onChange: (e) => onChange({ mobilite: e.target.value }),
								placeholder: "Ex: Île-de-France, Mobilité France entière, Europe (permis B)..."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "datedebut-input",
								className: "text-sm font-medium",
								children: "Date de début souhaitée"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								id: "datedebut-input",
								type: "date",
								value: profil.dateDebut,
								onChange: (e) => onChange({ dateDebut: e.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "duree-input",
									className: "text-sm font-medium",
									children: "Durée recherchée"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									id: "duree-input",
									value: profil.duree,
									onChange: (e) => onChange({ duree: e.target.value }),
									placeholder: "Ex: 6 mois, 1 an..."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5 pt-1",
									children: PRESETS_DUREE.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => onChange({ duree: d }),
										className: "rounded-full border border-border/60 bg-muted/40 px-2 py-0.5 text-[11px] text-muted-foreground hover:bg-muted",
										children: d
									}, d))
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-card space-y-5 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5 pb-2 border-b border-border/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Euro, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold text-foreground",
						children: "Télétravail & Gratification"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Vos souhaits d'organisation et de rémunération."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-sm font-medium",
								children: "Rythme de télétravail"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: profil.teletravail,
								onChange: (e) => onChange({ teletravail: e.target.value }),
								placeholder: "Ex: 2 à 3 jours / semaine"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5 pt-1",
								children: PRESETS_TELETRAVAIL.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => onChange({ teletravail: t }),
									className: "rounded-full border border-border/60 bg-muted/40 px-2 py-0.5 text-[11px] text-muted-foreground hover:bg-muted",
									children: t
								}, t))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-sm font-medium",
								children: "Gratification souhaitée"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: profil.remuneration,
								onChange: (e) => onChange({ remuneration: e.target.value }),
								placeholder: "Ex: 1 200 € / mois"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5 pt-1",
								children: PRESETS_REMUNERATION.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => onChange({ remuneration: r }),
									className: "rounded-full border border-border/60 bg-muted/40 px-2 py-0.5 text-[11px] text-muted-foreground hover:bg-muted",
									children: r
								}, r))
							})
						]
					})]
				})]
			})
		]
	});
}
var SUGGESTIONS_ECOLES = [
	"NEOMA Business School",
	"HEC Paris",
	"ESSEC Business School",
	"ESCP Business School",
	"EDHEC Business School",
	"EM Lyon",
	"Audencia",
	"Grenoble EM",
	"KEDGE Business School",
	"SKEMA Business School",
	"Université Paris-Dauphine",
	"Sorbonne Université",
	"Sciences Po Paris"
];
var SUGGESTIONS_FORMATIONS = [
	"Programme Grande École (Master in Management)",
	"MSc Corporate Finance & Investment Banking",
	"MSc International Business",
	"MSc Digital Marketing & Data Analytics",
	"MSc Supply Chain Management",
	"MSc Luxury Management",
	"Master Conseil & Conduite du Changement",
	"Bachelor in Business Administration (BBA)"
];
var NIVEAUX = [
	"L3 (Licence 3 / Bachelor)",
	"M1 (Master 1)",
	"Année de Césure (Gap Year)",
	"M2 (Master 2)",
	"MSc (Master of Science)",
	"Mastère Spécialisé",
	"Diplômé / Jeune diplômé"
];
var CONTRATS = [
	"Stage (4 à 6 mois)",
	"Stage de fin d'études",
	"Alternance (Contrat d'apprentissage)",
	"Alternance (Contrat de professionnalisation)",
	"Graduate Program",
	"CDI (Premier emploi)",
	"CDD"
];
function ProfilFormationTab({ profil, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "glass-card space-y-5 p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2.5 pb-2 border-b border-border/40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold text-foreground",
					children: "Identité du candidat"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Utilisé pour la signature des lettres de motivation et les relances."
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "prenom-input",
						className: "text-sm font-medium",
						children: "Prénom"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						id: "prenom-input",
						value: profil.prenom,
						onChange: (e) => onChange({ prenom: e.target.value }),
						placeholder: "Ex: Nathan"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "nom-input",
						className: "text-sm font-medium",
						children: "Nom"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						id: "nom-input",
						value: profil.nom,
						onChange: (e) => onChange({ nom: e.target.value }),
						placeholder: "Ex: Paul"
					})]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "glass-card space-y-5 p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2.5 pb-2 border-b border-border/40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold text-foreground",
					children: "Formation & Parcours académique"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Votre école et filière permettent d'ajuster la pertinence des offres."
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:col-span-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "ecole-input",
								className: "text-sm font-medium",
								children: "École / Université"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								id: "ecole-input",
								value: profil.ecole,
								onChange: (e) => onChange({ ecole: e.target.value }),
								placeholder: "Ex: NEOMA Business School"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5 pt-1",
								children: SUGGESTIONS_ECOLES.slice(0, 6).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => onChange({ ecole: e }),
									className: "rounded-full border border-border/60 bg-muted/40 px-2.5 py-0.5 text-xs text-muted-foreground hover:bg-muted",
									children: e
								}, e))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:col-span-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "formation-input",
								className: "text-sm font-medium",
								children: "Programme ou Spécialisation"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								id: "formation-input",
								value: profil.formation,
								onChange: (e) => onChange({ formation: e.target.value }),
								placeholder: "Ex: Programme Grande École, MSc Corporate Finance..."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5 pt-1",
								children: SUGGESTIONS_FORMATIONS.slice(0, 4).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => onChange({ formation: f }),
									className: "rounded-full border border-border/60 bg-muted/40 px-2.5 py-0.5 text-xs text-muted-foreground hover:bg-muted",
									children: f
								}, f))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-sm font-medium",
							children: "Niveau d'études actuel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: profil.niveau || "M1 (Master 1)",
							onValueChange: (v) => onChange({ niveau: v }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Sélectionnez votre niveau" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: NIVEAUX.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: n,
								children: n
							}, n)) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-sm font-medium",
							children: "Type de contrat cible"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: profil.contrats || "Stage (4 à 6 mois)",
							onValueChange: (v) => onChange({ contrats: v }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Sélectionnez le contrat" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: CONTRATS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: c,
								children: c
							}, c)) })]
						})]
					})
				]
			})]
		})]
	});
}
var SUGGESTIONS_COMPETENCES = [
	"Gestion de projet",
	"Analyse financière",
	"Modélisation de données",
	"Stratégie d'entreprise",
	"Communication client",
	"Méthodologies Agiles / Scrum",
	"Business Development",
	"Veille concurrentielle",
	"Audit & Contrôle de gestion",
	"Négociation commerciale",
	"Synthèse & Reporting",
	"Problem Solving"
];
var SUGGESTIONS_LOGICIELS = [
	"Excel (Modélisation / VBA)",
	"PowerPoint",
	"Power BI",
	"Python (Data Analysis)",
	"SQL",
	"Salesforce",
	"Notion",
	"Figma",
	"Tableau Software",
	"SAP",
	"HubSpot",
	"Google Analytics"
];
var SUGGESTIONS_LANGUES = [
	"Français (Langue maternelle)",
	"Anglais (Courant / C1)",
	"Anglais (Professionnel / B2)",
	"Espagnol (Intermédiaire / B2)",
	"Allemand (B1)",
	"Italien (B1)",
	"Chinois / Mandarin (A2)"
];
var NIVEAUX_ANGLAIS = [
	"C2 (Bilingue / Langue maternelle)",
	"C1 (Courant / Autonome / TOEIC 900+)",
	"B2 (Professionnel / TOEIC 785-895)",
	"B1 (Intermédiaire / Pratique)",
	"A2 (Élémentaire)"
];
function ProfilCompetencesTab({ profil, onChange }) {
	const toggleOrAppendTag = (field, current, tag) => {
		const list = current.split(/[,;\n]/).map((s) => s.trim()).filter(Boolean);
		const exists = list.some((s) => s.toLowerCase() === tag.toLowerCase());
		let next;
		if (exists) next = list.filter((s) => s.toLowerCase() !== tag.toLowerCase()).join(", ");
		else next = list.length > 0 ? `${current.trim()}, ${tag}` : tag;
		onChange({ [field]: next });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-card space-y-5 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5 pb-2 border-border/40 border-b",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold text-foreground",
						children: "Compétences clés & Savoir-faire"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "L'IA compare ces compétences aux prérequis des offres pour calculer votre score."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "comp-input",
								className: "text-sm font-medium",
								children: "Compétences (Hard & Soft skills)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "comp-input",
								rows: 3,
								value: profil.competences,
								onChange: (e) => onChange({ competences: e.target.value }),
								placeholder: "Ex: Analyse de données, gestion de projet, communication client, synthèse stratégique..."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilTagSuggestions, {
								tags: SUGGESTIONS_COMPETENCES,
								currentValue: profil.competences,
								onSelectTag: (tag) => toggleOrAppendTag("competences", profil.competences, tag)
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-card space-y-5 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5 pb-2 border-border/40 border-b",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold text-foreground",
						children: "Logiciels, Outils & Technologies"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Les recruteurs filtrent souvent les candidats sur ces mots-clés techniques."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "logiciels-input",
								className: "text-sm font-medium",
								children: "Logiciels maîtrisés"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "logiciels-input",
								rows: 2,
								value: profil.logiciels,
								onChange: (e) => onChange({ logiciels: e.target.value }),
								placeholder: "Ex: Excel (RechercheV, TCD), PowerPoint, Power BI, Python, SQL, Notion..."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilTagSuggestions, {
								tags: SUGGESTIONS_LOGICIELS,
								currentValue: profil.logiciels,
								onSelectTag: (tag) => toggleOrAppendTag("logiciels", profil.logiciels, tag)
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-card space-y-5 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5 pb-2 border-border/40 border-b",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold text-foreground",
						children: "Langues & Niveaux de maîtrise"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Essentiel pour les postes internationaux et multinationales."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:col-span-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "langues-input",
								className: "text-sm font-medium",
								children: "Langues parlées"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								id: "langues-input",
								value: profil.langues,
								onChange: (e) => onChange({ langues: e.target.value }),
								placeholder: "Ex: Français (Natif), Anglais (C1), Espagnol (B2)..."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilTagSuggestions, {
								tags: SUGGESTIONS_LANGUES,
								currentValue: profil.langues,
								onSelectTag: (tag) => toggleOrAppendTag("langues", profil.langues, tag)
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-sm font-medium",
							children: "Niveau d'anglais principal"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: profil.niveauAnglais || "C1 (Courant / Autonome / TOEIC 900+)",
							onValueChange: (v) => onChange({ niveauAnglais: v }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Sélectionnez votre niveau d'anglais" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: NIVEAUX_ANGLAIS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: n,
								children: n
							}, n)) })]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-card space-y-5 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5 pb-2 border-border/40 border-b",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold text-foreground",
						children: "Résumé de vos expériences phares"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Points forts de vos stages, alternances ou projets associatifs passés."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 3,
						value: profil.experiences,
						onChange: (e) => onChange({ experiences: e.target.value }),
						placeholder: "Ex: Stage de 6 mois en tant qu'Analyste Junior chez BNP Paribas : modélisation financière, rédaction de pitchs sectoriels..."
					})
				})]
			})
		]
	});
}
var CRITERES_CONFIG = {
	missions: {
		titre: "Missions & Responsabilités",
		description: "Alignement des tâches quotidiennes avec vos objectifs de carrière.",
		icone: Target
	},
	secteur: {
		titre: "Secteur d'activité",
		description: "Pertinence du domaine (Finance, Luxe, Conseil, Tech, etc.).",
		icone: Sparkles
	},
	localisation: {
		titre: "Localisation & Transport",
		description: "Proximité géographique et facilité d'accès au lieu de travail.",
		icone: MapPin
	},
	remuneration: {
		titre: "Gratification / Rémunération",
		description: "Niveau d'indemnité mensuelle et avantages proposés.",
		icone: Euro
	},
	teletravail: {
		titre: "Flexibilité & Télétravail",
		description: "Possibilité d'organiser son temps de travail en distanciel.",
		icone: Laptop
	},
	"taille entreprise": {
		titre: "Taille & Notoriété de l'entreprise",
		description: "Grand groupe international, ETI, PME ou Startup en croissance.",
		icone: Building
	}
};
var IMPORTANCE_BADGES = {
	"Très important": {
		label: "Très important",
		style: "border-primary bg-primary text-primary-foreground font-semibold shadow-xs",
		stars: "★★★"
	},
	Important: {
		label: "Important",
		style: "border-primary/40 bg-primary/10 text-primary font-medium",
		stars: "★★☆"
	},
	Moyen: {
		label: "Moyen",
		style: "border-border bg-muted/60 text-muted-foreground",
		stars: "★☆☆"
	},
	Faible: {
		label: "Faible",
		style: "border-border/40 bg-transparent text-muted-foreground/60",
		stars: "☆☆☆"
	}
};
function ProfilCriteresTab({ profil, onChange }) {
	const setImportance = (c, imp) => {
		onChange({ criteres: {
			...profil.criteres,
			[c]: imp
		} });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "glass-card space-y-5 p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2.5 pb-2 border-border/40 border-b",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold text-foreground",
					children: "Pondération des critères de matching"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Définissez ce qui compte le plus pour vous. L'algorithme ajustera le score de chaque opportunité selon cette grille."
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: CRITERES.map((c) => {
					const config = CRITERES_CONFIG[c];
					const currentImp = profil.criteres[c] || "Moyen";
					const Icone = config.icone;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-between gap-3.5 rounded-xl border border-border/70 bg-card/60 p-4 transition-all hover:border-primary/30 hover:bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icone, { className: "size-3.5 text-primary" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-semibold text-foreground",
								children: config.titre
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: config.description
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-4 gap-1.5 pt-1",
							children: IMPORTANCES.map((imp) => {
								const isSelected = currentImp === imp;
								const badge = IMPORTANCE_BADGES[imp];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setImportance(c, imp),
									className: `flex flex-col items-center justify-center rounded-lg border px-1.5 py-1.5 text-center text-xs transition-all ${isSelected ? badge.style : "border-border/50 bg-background/50 text-muted-foreground hover:border-border hover:bg-muted/50 hover:text-foreground"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] tracking-tighter opacity-80",
										children: badge.stars
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-medium leading-tight line-clamp-1",
										children: imp
									})]
								}, imp);
							})
						})]
					}, c);
				})
			})]
		})
	});
}
function ProfilPage() {
	const { user, loading: authLoading } = useSession();
	const [profil, setProfil] = (0, import_react.useState)(() => loadProfil());
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [cvOpen, setCvOpen] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)("recherche");
	const [, startTransition] = (0, import_react.useTransition)();
	const profilRef = (0, import_react.useRef)(profil);
	profilRef.current = profil;
	const bilan = (0, import_react.useMemo)(() => calculerCompletudeProfil(profil), [profil]);
	(0, import_react.useEffect)(() => {
		if (authLoading || !user?.id) return;
		let cancelled = false;
		(async () => {
			try {
				const cloud = await fetchProfil();
				if (!cancelled && cloud) setProfil((local) => {
					return {
						...local,
						...cloud,
						cvStructure: normaliserCvStructure(cloud.cvStructure || local.cvStructure)
					};
				});
			} catch {}
		})();
		return () => {
			cancelled = true;
		};
	}, [user?.id, authLoading]);
	const updateProfil = (0, import_react.useCallback)((patch) => {
		setProfil((prev) => {
			const next = {
				...prev,
				...patch
			};
			saveProfilLocal(next);
			return next;
		});
	}, []);
	const enregistrer = (0, import_react.useCallback)(async () => {
		setSaving(true);
		const p = profilRef.current;
		saveProfilLocal(p);
		if (user?.id) try {
			const saved = await saveProfilCloud(p, user.id);
			setProfil(saved);
			toast.success("Profil enregistré et synchronisé en ligne !");
		} catch {
			toast.error("Enregistré localement (connexion cloud temporairement indisponible).");
		} finally {
			setSaving(false);
		}
		else {
			setSaving(false);
			toast.success("Profil enregistré dans votre navigateur.");
		}
	}, [user?.id]);
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "s") {
				e.preventDefault();
				enregistrer();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [enregistrer]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		eyebrow: "Compte & Candidature",
		title: "Mon profil étudiant",
		subtitle: "Vos critères et compétences personnalisent le score de matching et la génération de lettres IA.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				variant: "outline",
				onClick: () => setCvOpen(true),
				className: "hidden sm:inline-flex border-primary/20 hover:bg-primary/5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-primary" }), "Analyser mon CV avec l'IA"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				onClick: enregistrer,
				disabled: saving,
				children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), "Enregistrer"]
			})]
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-5xl space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilHeaderCard, {
				profil,
				bilan,
				onOpenCvModal: () => setCvOpen(true),
				onSelectTab: (tab) => {
					startTransition(() => setActiveTab(tab));
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				value: activeTab,
				onValueChange: setActiveTab,
				className: "grid gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto pb-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "inline-flex w-full min-w-[580px] justify-start p-1 sm:w-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "recherche",
									className: "flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-3.5" }), "Ma recherche"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "formation",
									className: "flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-3.5" }), "Identité & Formation"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "competences",
									className: "flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-3.5" }), "Compétences & Outils"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "criteres",
									className: "flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-3.5" }), "Critères & Priorités"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "cv",
									className: "flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode, { className: "size-3.5" }), "CV Structuré"]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "recherche",
						className: "focus-visible:outline-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilRechercheTab, {
							profil,
							onChange: updateProfil
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "formation",
						className: "focus-visible:outline-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilFormationTab, {
							profil,
							onChange: updateProfil
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "competences",
						className: "focus-visible:outline-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilCompetencesTab, {
							profil,
							onChange: updateProfil
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "criteres",
						className: "focus-visible:outline-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilCriteresTab, {
							profil,
							onChange: updateProfil
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "cv",
						className: "focus-visible:outline-none space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-4 rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-sm font-semibold text-foreground flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-primary" }), "Générateur & Auditeur de CV intelligent"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Importez votre CV (PDF / Word) pour pré-remplir automatiquement toutes les rubriques ou auditer vos mots-clés ATS."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: () => setCvOpen(true),
								className: "gap-1.5 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }), "Auditer / Importer un CV"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CvBuilder, {
							value: normaliserCvStructure(profil.cvStructure),
							onChange: (cv) => updateProfil({ cvStructure: cv })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border/60 bg-card/60 p-4 shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2 text-xs text-muted-foreground",
							children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Profil synchronisé sur votre compte cloud. Raccourci :",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
									className: "rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]",
									children: "Ctrl + S"
								})
							] })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-blue-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Enregistré localement. Connectez-vous pour synchroniser entre vos appareils." })] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: enregistrer,
							disabled: saving,
							size: "sm",
							className: "gap-2",
							children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), "Sauvegarder les modifications"]
						})]
					})
				]
			})]
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
				updateProfil(next);
				if (user?.id) saveProfilCloud(next, user.id).catch(() => void 0);
			},
			onAppliquerProfil: (patch) => {
				const next = {
					...profil,
					...patch
				};
				updateProfil(next);
				if (user?.id) saveProfilCloud(next, user.id).catch(() => void 0);
				toast.success("Profil mis à jour automatiquement depuis le CV !");
			}
		})]
	});
}
//#endregion
export { ProfilPage as component };

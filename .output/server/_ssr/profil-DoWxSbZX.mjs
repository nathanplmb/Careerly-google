import { a as __toESM } from "../_runtime.mjs";
import { f as object, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as isSupabaseConfigured } from "./client-DnkKuJ6q.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as GraduationCap, Ct as CircleAlert, Dt as ChevronDown, E as Save, G as Layers, I as MapPin, It as BookOpen, K as Languages, L as Mail, Mt as Building2, Nt as Briefcase, O as RefreshCw, Ot as Check, P as MessageSquareQuote, Q as HeartHandshake, Rt as Award, St as CircleCheck, U as Linkedin, V as LoaderCircle, W as Lightbulb, Z as Heart, _t as Copy, at as FileText, ct as FileCode, d as TriangleAlert, et as Globe, f as TrendingUp, g as Target, gt as Cpu, ht as DollarSign, i as WandSparkles, j as Phone, k as Plus, kt as Calendar, mt as Download, n as X, p as Trash2, q as Key, r as Wrench, rt as Flame, s as UserRound, tt as Github, u as Upload, ut as Eye, v as Sparkles, vt as Compass, wt as ChevronUp, x as ShieldAlert, y as SlidersHorizontal, zt as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { J as NIVEAUX_COMPETENCE, X as completionCv, Y as NIVEAUX_LANGUE, Z as cvStructureEnTexte, a as Dialog, at as nouvelleCompetence, ct as nouvelleLangue, d as Textarea, dt as Button, et as loadProfil, f as Label, ft as cn, it as nouvelleCertification, l as DialogHeader, lt as saveProfilLocal, nt as nouveauBenevolat, o as DialogContent, ot as nouvelleExperience, p as Input$1, q as CRITERES, rt as nouveauProjet, s as DialogDescription, st as nouvelleFormation, tt as normaliserCvStructure, u as DialogTitle } from "./router-arR9ITmX.mjs";
import { t as AppShell } from "./AppShell-BYQcXmkR.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BYfOmXtJ.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { r as createServerFn } from "./server-p5qu-I7z.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-aShfmQCg.mjs";
import { n as fetchProfil, r as saveProfilCloud, t as createSsrRpc } from "./profil-cloud-CHHpOSQX.mjs";
import { n as calculerCompletudeProfil, t as Badge } from "./profil-completion-DGP1qrUO.mjs";
import { t as Progress } from "./progress-Crx1Tb8I.mjs";
import { t as useSession } from "./useSession-CT0M_nfQ.mjs";
import { c as texteErreurIA, s as profilEnTexte } from "./match-run-DMUqzz67.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DUy71i1r.mjs";
import { n as extraireTexteFichier, t as TYPES_ACCEPTES } from "./cv-fichier-BFa0B9CM.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profil-DoWxSbZX.js
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
function ProfilHeaderCard({ profil, bilan, onOpenCvModal, onOpenSummaryIaModal, onOpenOptimizerModal, onSelectTab, saving }) {
	const nomAffiche = profil.prenom || profil.nom ? `${profil.prenom} ${profil.nom}`.trim() : "Candidat";
	const initiales = (profil.prenom?.[0] || "") + (profil.nom?.[0] || "") || profil.ecole?.[0] || "C";
	const titrePro = profil.titre || profil.cvStructure?.titre || [profil.formation, profil.ecole].filter(Boolean).join(" @ ") || "Profil Candidat";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-card relative overflow-hidden p-6 sm:p-7 space-y-6 border-purple-500/20 bg-gradient-to-br from-card/90 via-card/70 to-purple-950/20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-20 -right-20 size-64 rounded-full bg-purple-500/15 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-20 -left-20 size-64 rounded-full bg-indigo-500/10 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4 sm:gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 text-xl font-bold text-white shadow-lg shadow-purple-600/30 border border-purple-400/30",
						children: [profil.photoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: profil.photoUrl,
							alt: nomAffiche,
							className: "size-full rounded-2xl object-cover"
						}) : initiales.toUpperCase(), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-background text-[10px]",
							children: "✓"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-xl font-bold tracking-tight text-foreground sm:text-2xl truncate",
									children: nomAffiche
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									className: `text-xs font-semibold px-2.5 py-0.5 ${bilan.badgeColor}`,
									children: bilan.label
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs sm:text-sm font-medium text-purple-300",
								children: titrePro
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2 pt-1",
								children: [
									profil.contrats && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center rounded-lg bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 text-xs font-medium text-purple-200",
										children: ["🎯 ", profil.contrats]
									}),
									profil.localisation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center rounded-lg bg-secondary/80 border border-border/50 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground",
										children: ["📍 ", profil.localisation]
									}),
									profil.modeTravail && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center rounded-lg bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-xs font-medium text-indigo-300",
										children: ["💻 ", profil.modeTravail]
									}),
									profil.dateDebut && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center rounded-lg bg-secondary/80 border border-border/50 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground",
										children: ["⏱️ Dispo : ", profil.dateDebut]
									})
								]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: onOpenSummaryIaModal,
							className: "gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-600/20 text-xs font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), "Profil IA (Synthèse)"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: onOpenOptimizerModal,
							className: "gap-2 border-purple-500/30 hover:bg-purple-500/10 text-purple-300 text-xs font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-3.5" }), "Optimiser mon profil"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: onOpenCvModal,
							className: "gap-1.5 border-border/60 hover:bg-card/80 text-xs text-muted-foreground hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5" }), "Importer CV"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border/60 bg-background/50 p-4 sm:p-5 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-7 items-center justify-center rounded-lg bg-purple-500/15 text-purple-400 font-bold text-xs",
								children: "⚡"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-bold text-foreground block",
								children: [
									"Niveau de complétude du profil (",
									bilan.nbComplets,
									"/",
									bilan.nbTotal,
									" rubriques complètes)"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-muted-foreground",
								children: "Plus votre profil est riche, plus le Match IA et le Coach d'entretien sont précis."
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400",
							children: [bilan.score, "% complet"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: bilan.score,
						className: "h-2 bg-secondary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2 pt-1",
						children: bilan.categories?.map((cat) => {
							const isComplet = cat.statut === "complet";
							const isAmeliorer = cat.statut === "a_ameliorer";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => onSelectTab(cat.tab),
								className: `flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-all ${isComplet ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20" : isAmeliorer ? "border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20" : "border-border/60 bg-card/40 text-muted-foreground hover:bg-card/70 hover:text-foreground"}`,
								children: [isComplet ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3 text-emerald-400 shrink-0" }) : isAmeliorer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-3 text-amber-400 shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-muted-foreground/50 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cat.nom })]
							}, cat.id);
						})
					}),
					bilan.suggestions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 pt-2 border-t border-border/40 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-purple-400 font-bold shrink-0",
								children: "💡 Conseil IA :"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground truncate",
								children: bilan.suggestions[0].titre
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => onSelectTab(bilan.suggestions[0].tab),
							className: "text-xs font-semibold text-purple-400 hover:text-purple-300 inline-flex items-center gap-1 shrink-0",
							children: [
								"Compléter (+",
								bilan.suggestions[0].gain,
								" pts)",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3" })
							]
						})]
					})
				]
			})
		]
	});
}
function ProfilIdentityTab({ profil, onChange }) {
	const cv = profil.cvStructure;
	const updateCvField = (field, val) => {
		onChange({ cvStructure: {
			...cv,
			[field]: val
		} });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: "Identité & Positionnement"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Vos informations visibles et votre titre professionnel principal"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Prénom *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: profil.prenom,
								onChange: (e) => {
									onChange({ prenom: e.target.value });
									updateCvField("prenom", e.target.value);
								},
								placeholder: "Ex : Lucas, Sarah..."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Nom *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: profil.nom,
								onChange: (e) => {
									onChange({ nom: e.target.value });
									updateCvField("nom", e.target.value);
								},
								placeholder: "Ex : Dupont, Martin..."
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Titre professionnel / Accroche cible *"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: profil.titre || cv?.titre || "",
								onChange: (e) => {
									onChange({ titre: e.target.value });
									updateCvField("titre", e.target.value);
								},
								placeholder: "Ex : Étudiant M1 PGE @ NEOMA | Recherche Stage Bras Droit / Product Manager (6 mois)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "💡 Ce titre oriente immédiatement le matching IA et apparaît en en-tête de vos candidatures."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Photo de profil (URL)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									value: profil.photoUrl || cv?.photoUrl || "",
									onChange: (e) => {
										onChange({ photoUrl: e.target.value });
										updateCvField("photoUrl", e.target.value);
									},
									placeholder: "https://mon-image.jpg ou avatar..."
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Permis de conduire"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: profil.permis || cv?.permis || "",
								onChange: (e) => {
									onChange({ permis: e.target.value });
									updateCvField("permis", e.target.value);
								},
								placeholder: "Ex : Permis B, Véhiculé(e)..."
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: "Coordonnées & Mobilité géographique"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Pour vous contacter et évaluer le critère de localisation"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								className: "text-xs text-muted-foreground flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3.5" }), " Email de contact"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								type: "email",
								value: profil.emailContact || cv?.email || "",
								onChange: (e) => {
									onChange({ emailContact: e.target.value });
									updateCvField("email", e.target.value);
								},
								placeholder: "votre.email@etudiant.fr"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								className: "text-xs text-muted-foreground flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3.5" }), " Téléphone"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								type: "tel",
								value: profil.telephone || cv?.telephone || "",
								onChange: (e) => {
									onChange({ telephone: e.target.value });
									updateCvField("telephone", e.target.value);
								},
								placeholder: "+33 6 12 34 56 78"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs text-muted-foreground",
									children: "Ville actuelle"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									value: profil.localisation || cv?.ville || "",
									onChange: (e) => {
										onChange({ localisation: e.target.value });
										updateCvField("ville", e.target.value);
									},
									placeholder: "Ex : Paris, Lyon, Rouen, Reims..."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs text-muted-foreground",
									children: "Pays"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									value: profil.pays || cv?.pays || "France",
									onChange: (e) => {
										onChange({ pays: e.target.value });
										updateCvField("pays", e.target.value);
									},
									placeholder: "Ex : France, Royaume-Uni..."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs text-muted-foreground",
									children: "Mobilité géographique"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									value: profil.mobilite,
									onChange: (e) => onChange({ mobilite: e.target.value }),
									placeholder: "Ex : Île-de-France, France entière, International..."
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card p-5 sm:p-6 space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 border-b border-border/50 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: "Liens & Réseaux Professionnels"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "LinkedIn, portfolio de projets, profil GitHub ou site personnel"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								className: "text-xs text-muted-foreground flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "size-3.5 text-blue-400" }), " Profil LinkedIn"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: profil.linkedin || cv?.linkedin || "",
								onChange: (e) => {
									onChange({ linkedin: e.target.value });
									updateCvField("linkedin", e.target.value);
								},
								placeholder: "linkedin.com/in/nom-prenom"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								className: "text-xs text-muted-foreground flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-3.5 text-emerald-400" }), " Portfolio / Site"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: profil.portfolio || cv?.portfolio || "",
								onChange: (e) => {
									onChange({ portfolio: e.target.value });
									updateCvField("portfolio", e.target.value);
								},
								placeholder: "https://mon-portfolio.fr"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								className: "text-xs text-muted-foreground flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "size-3.5" }), " Profil GitHub / Code"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: profil.github || cv?.github || "",
								onChange: (e) => {
									onChange({ github: e.target.value });
									updateCvField("github", e.target.value);
								},
								placeholder: "github.com/mon-pseudo"
							})]
						})
					]
				})]
			})
		]
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
var CONTRATS_OPTIONS = [
	"Stage",
	"Alternance",
	"CDI",
	"CDD",
	"VIE",
	"Graduate Program",
	"Freelance"
];
var MODES_TRAVAIL = [
	{
		id: "hybride",
		label: "Hybride (Télétravail + Bureau)",
		icone: "🏢"
	},
	{
		id: "full_remote",
		label: "100% Télétravail / Full Remote",
		icone: "💻"
	},
	{
		id: "presentiel",
		label: "Présentiel complet",
		icone: "👥"
	},
	{
		id: "indifferent",
		label: "Indifférent",
		icone: "✨"
	}
];
var ENVIRONNEMENTS_OPTIONS = [
	"Grand groupe",
	"Scale-up",
	"Startup",
	"Cabinet de conseil",
	"Banque / Finance",
	"PME / ETI",
	"Secteur public / ONG",
	"Tech / SaaS"
];
var PRIORITES_OPTIONS = [
	"Missions apprenantes & formatrices",
	"Mentorat & Management bienveillant",
	"Perspectives de recrutement (CDI à la clé)",
	"Rémunération attractive / Bonus",
	"Culture d'entreprise & Équilibre de vie",
	"Impact écologique / RSE",
	"Exposition internationale",
	"Autonomie & Prise de décision"
];
function ProfilObjectivesTab({ profil, onChange }) {
	const [nouveauMetier, setNouveauMetier] = (0, import_react.useState)("");
	const [nouveauDomaine, setNouveauDomaine] = (0, import_react.useState)("");
	const [nouvelleEntreprise, setNouvelleEntreprise] = (0, import_react.useState)("");
	const environnements = profil.environnements ?? ["Grand groupe", "Scale-up"];
	const priorites = profil.prioritesRecherche ?? ["Missions apprenantes & formatrices", "Mentorat & Management bienveillant"];
	const toggleEnvironnement = (env) => {
		onChange({ environnements: environnements.includes(env) ? environnements.filter((e) => e !== env) : [...environnements, env] });
	};
	const togglePriorite = (prio) => {
		onChange({ prioritesRecherche: priorites.includes(prio) ? priorites.filter((p) => p !== prio) : [...priorites, prio] });
	};
	const ajouterTag = (val, champ, reset) => {
		const trim = val.trim();
		if (!trim) return;
		const current = profil[champ] ? profil[champ].split(",").map((s) => s.trim()).filter(Boolean) : [];
		if (!current.includes(trim)) {
			current.push(trim);
			onChange({ [champ]: current.join(", ") });
		}
		reset();
	};
	const retirerTag = (tag, champ) => {
		const next = (profil[champ] ? profil[champ].split(",").map((s) => s.trim()).filter(Boolean) : []).filter((t) => t !== tag);
		onChange({ [champ]: next.join(", ") });
	};
	const metiersList = (profil.metiers || "").split(",").map((s) => s.trim()).filter(Boolean);
	const domainesList = (profil.domaines || "").split(",").map((s) => s.trim()).filter(Boolean);
	const entreprisesList = (profil.entreprisesCiblees || "").split(",").map((s) => s.trim()).filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: "Métiers & Secteurs Cibles"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Les intitulés de postes et domaines d'activité que le Match IA doit cibler en priorité"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Intitulés de postes / Métiers recherchés *"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-1.5 min-h-[36px] p-2 rounded-lg border border-border/60 bg-background/50",
								children: [metiersList.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "secondary",
									className: "gap-1.5 bg-purple-500/15 text-purple-300 border border-purple-500/20 text-xs py-1 px-2.5",
									children: [m, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => retirerTag(m, "metiers"),
										className: "rounded-full hover:bg-purple-500/20 p-0.5 text-muted-foreground hover:text-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
									})]
								}, m)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-[200px] flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: nouveauMetier,
										onChange: (e) => setNouveauMetier(e.target.value),
										onKeyDown: (e) => {
											if (e.key === "Enter" || e.key === ",") {
												e.preventDefault();
												ajouterTag(nouveauMetier, "metiers", () => setNouveauMetier(""));
											}
										},
										placeholder: "Ajouter un métier (ex: Bras Droit, Chef de Produit, Analyste M&A...) et tapez Entrée",
										className: "w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "sm",
										variant: "ghost",
										onClick: () => ajouterTag(nouveauMetier, "metiers", () => setNouveauMetier("")),
										className: "h-6 px-2 text-xs text-purple-400",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3" })
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilTagSuggestions, {
								categorie: "metiers",
								valeurActuelle: profil.metiers,
								onSelectSuggestion: (val) => {
									const current = profil.metiers ? profil.metiers.split(",").map((s) => s.trim()).filter(Boolean) : [];
									if (!current.includes(val)) onChange({ metiers: [...current, val].join(", ") });
								}
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Domaines / Secteurs d'activité"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-1.5 min-h-[36px] p-2 rounded-lg border border-border/60 bg-background/50",
								children: [domainesList.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "secondary",
									className: "gap-1.5 bg-indigo-500/15 text-indigo-300 border border-indigo-500/20 text-xs py-1 px-2.5",
									children: [d, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => retirerTag(d, "domaines"),
										className: "rounded-full hover:bg-indigo-500/20 p-0.5 text-muted-foreground hover:text-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
									})]
								}, d)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-[200px] flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: nouveauDomaine,
										onChange: (e) => setNouveauDomaine(e.target.value),
										onKeyDown: (e) => {
											if (e.key === "Enter" || e.key === ",") {
												e.preventDefault();
												ajouterTag(nouveauDomaine, "domaines", () => setNouveauDomaine(""));
											}
										},
										placeholder: "Ajouter un secteur (ex: Tech / SaaS, Conseil, Finance, Luxe...) et tapez Entrée",
										className: "w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "sm",
										variant: "ghost",
										onClick: () => ajouterTag(nouveauDomaine, "domaines", () => setNouveauDomaine("")),
										className: "h-6 px-2 text-xs text-indigo-400",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3" })
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilTagSuggestions, {
								categorie: "domaines",
								valeurActuelle: profil.domaines,
								onSelectSuggestion: (val) => {
									const current = profil.domaines ? profil.domaines.split(",").map((s) => s.trim()).filter(Boolean) : [];
									if (!current.includes(val)) onChange({ domaines: [...current, val].join(", ") });
								}
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs text-muted-foreground",
							children: "Entreprises spécifiques ciblées (Dream Companies)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-1.5 min-h-[36px] p-2 rounded-lg border border-border/60 bg-background/50",
							children: [entreprisesList.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "secondary",
								className: "gap-1.5 bg-blue-500/15 text-blue-300 border border-blue-500/20 text-xs py-1 px-2.5",
								children: [e, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => retirerTag(e, "entreprisesCiblees"),
									className: "rounded-full hover:bg-blue-500/20 p-0.5 text-muted-foreground hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
								})]
							}, e)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-[200px] flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: nouvelleEntreprise,
									onChange: (e) => setNouvelleEntreprise(e.target.value),
									onKeyDown: (e) => {
										if (e.key === "Enter" || e.key === ",") {
											e.preventDefault();
											ajouterTag(nouvelleEntreprise, "entreprisesCiblees", () => setNouvelleEntreprise(""));
										}
									},
									placeholder: "Ex : L'Oréal, BNP Paribas, Doctolib, BCG, Alan... et tapez Entrée",
									className: "w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									size: "sm",
									variant: "ghost",
									onClick: () => ajouterTag(nouvelleEntreprise, "entreprisesCiblees", () => setNouvelleEntreprise("")),
									className: "h-6 px-2 text-xs text-blue-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3" })
								})]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: "Type de contrat & Calendrier de recherche"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Format de la mission, dates de disponibilité et durée souhaitée"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs text-muted-foreground",
							children: "Type de contrat recherché *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: CONTRATS_OPTIONS.map((c) => {
								const selected = (profil.contrats || "").includes(c);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										const current = (profil.contrats || "").split(",").map((s) => s.trim()).filter(Boolean);
										onChange({ contrats: (selected ? current.filter((x) => x !== c) : [...current, c]).join(", ") || "Stage" });
									},
									className: `rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${selected ? "border-purple-500/40 bg-purple-500/20 text-purple-200 shadow-xs" : "border-border/60 bg-card/40 text-muted-foreground hover:bg-card/80 hover:text-foreground"}`,
									children: [selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 inline mr-1" }), c]
								}, c);
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									className: "text-xs text-muted-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3.5" }), " Date de début souhaitée"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									value: profil.dateDebut,
									onChange: (e) => onChange({ dateDebut: e.target.value }),
									placeholder: "Ex : Janvier 2026, Septembre..."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs text-muted-foreground",
									children: "Durée souhaitée"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									value: profil.duree,
									onChange: (e) => onChange({ duree: e.target.value }),
									placeholder: "Ex : 6 mois, 12 à 24 mois..."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									className: "text-xs text-muted-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "size-3.5 text-emerald-400" }), " Rémunération min."]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									value: profil.remuneration,
									onChange: (e) => onChange({ remuneration: e.target.value }),
									placeholder: "Ex : 1200 €/mois, 45k€..."
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs text-muted-foreground",
							children: "Mode de travail préféré"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
							children: MODES_TRAVAIL.map((m) => {
								const selected = (profil.modeTravail || "hybride") === m.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => onChange({
										modeTravail: m.id,
										teletravail: m.label
									}),
									className: `flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all ${selected ? "border-purple-500/40 bg-purple-500/15 text-purple-200" : "border-border/60 bg-card/40 text-muted-foreground hover:bg-card/70 hover:text-foreground"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-base",
										children: m.icone
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold",
										children: m.label
									})]
								}, m.id);
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: "Environnements & Critères Prioritaires"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "La taille de structure et les valeurs qui comptent le plus pour vous"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs text-muted-foreground",
							children: "Types de structures privilégiées"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: ENVIRONNEMENTS_OPTIONS.map((env) => {
								const selected = environnements.includes(env);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => toggleEnvironnement(env),
									className: `rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${selected ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300" : "border-border/60 bg-card/40 text-muted-foreground hover:bg-card/70 hover:text-foreground"}`,
									children: [selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 inline mr-1" }), env]
								}, env);
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs text-muted-foreground",
							children: "Vos priorités absolues dans une opportunité"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2 sm:grid-cols-2",
							children: PRIORITES_OPTIONS.map((prio) => {
								const selected = priorites.includes(prio);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => togglePriorite(prio),
									className: `flex items-center gap-2 rounded-xl border p-2.5 text-left text-xs font-medium transition-all ${selected ? "border-purple-500/40 bg-purple-500/15 text-purple-200 font-semibold" : "border-border/60 bg-card/40 text-muted-foreground hover:bg-card/70 hover:text-foreground"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `size-3.5 rounded-full border flex items-center justify-center ${selected ? "border-purple-400 bg-purple-500 text-white" : "border-muted-foreground/40"}`,
										children: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-2.5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: prio })]
								}, prio);
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card p-5 sm:p-6 space-y-4 border-purple-500/30 bg-gradient-to-br from-purple-500/5 via-card/60 to-indigo-500/5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 border-b border-purple-500/20 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-300",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-sm font-semibold text-foreground flex items-center gap-2",
							children: ["Ce que je recherche vraiment", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "bg-purple-500/20 text-purple-300 border-purple-500/30 text-[10px]",
								children: "Booster IA"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Expliquez avec vos propres mots ce qui vous motive, vos ambitions et le type d'équipe idéale"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: profil.rechercheVraie || "",
						onChange: (e) => onChange({ rechercheVraie: e.target.value }),
						rows: 4,
						placeholder: "Ex : Je recherche un stage où je serai au contact direct de la direction ou des fondateurs, avec une vraie autonomie sur les sujets opérationnels. J'aimerais particulièrement travailler sur le lancement de nouveaux produits ou l'expansion internationale, dans une ambiance bienveillante mais stimulante...",
						className: "text-xs leading-relaxed border-purple-500/20 bg-background/50 focus-visible:ring-purple-500"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground",
						children: "✨ Ce paragraphe est directement injecté dans le contexte du Match IA, de la rédaction des lettres de motivation, des messages LinkedIn et du Coach d'entretien."
					})
				]
			})
		]
	});
}
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
function ProfilEducationTab({ profil, onChange }) {
	const cv = profil.cvStructure;
	const formations = cv?.formations || [];
	const [expandedIndex, setExpandedIndex] = (0, import_react.useState)(0);
	const updateFormations = (nouvellesFormations) => {
		const primary = nouvellesFormations[0];
		onChange({
			formation: primary?.diplome || profil.formation,
			ecole: primary?.etablissement || profil.ecole,
			niveau: primary?.niveau || profil.niveau,
			cvStructure: {
				...cv,
				formations: nouvellesFormations
			}
		});
	};
	const handleAjouter = () => {
		const updated = [nouvelleFormation(), ...formations];
		updateFormations(updated);
		setExpandedIndex(0);
	};
	const handleSupprimer = (index) => {
		const updated = formations.filter((_, i) => i !== index);
		updateFormations(updated);
		if (expandedIndex === index) setExpandedIndex(null);
	};
	const handleModifier = (index, patch) => {
		const updated = formations.map((f, i) => i === index ? {
			...f,
			...patch
		} : f);
		updateFormations(updated);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: [
							"Parcours Académique & Diplômes (",
							formations.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Renseignez vos écoles, masters, spécialisations et cours clés valorisables"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: handleAjouter,
					className: "gap-2 bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Ajouter une formation"]
				})]
			}),
			formations.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card p-10 text-center space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto flex size-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-sm font-semibold text-foreground",
						children: "Aucune formation renseignée"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground max-w-sm mx-auto",
						children: "Ajoutez votre cursus actuel (école de commerce, d'ingénieurs, université...) pour enrichir votre profil."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: handleAjouter,
						className: "gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Ajouter ma formation principale"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: formations.map((f, idx) => {
					const isExpanded = expandedIndex === idx;
					const titreAffiche = f.diplome || f.etablissement || `Formation #${idx + 1}`;
					const sousTitre = [
						f.etablissement,
						f.specialisation,
						f.periode || (f.anneeDebut ? `${f.anneeDebut} - ${f.enCours ? "En cours" : f.anneeFin || ""}` : "")
					].filter(Boolean).join(" • ");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-card overflow-hidden border border-border/70 transition-all hover:border-indigo-500/30",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onClick: () => setExpandedIndex(isExpanded ? null : idx),
							className: "flex items-center justify-between p-4 sm:p-5 cursor-pointer bg-card/40 hover:bg-card/70 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3.5 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400 font-bold text-xs",
									children: idx + 1
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 space-y-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-sm font-bold text-foreground truncate",
										children: titreAffiche
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground truncate",
										children: sousTitre || "Détails à renseigner"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 shrink-0",
								children: [
									f.enCours && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px]",
										children: "En cours"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: (e) => {
											e.stopPropagation();
											handleSupprimer(idx);
										},
										className: "h-7 w-7 p-0 text-muted-foreground hover:text-rose-400",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: isExpanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4" })
									})
								]
							})]
						}), isExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 sm:p-6 border-t border-border/50 bg-background/30 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs text-muted-foreground",
											children: "Établissement / École / Université *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
											value: f.etablissement,
											onChange: (e) => handleModifier(idx, { etablissement: e.target.value }),
											placeholder: "Ex : NEOMA Business School, Sorbonne..."
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs text-muted-foreground",
											children: "Diplôme / Programme *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
											value: f.diplome,
											onChange: (e) => handleModifier(idx, { diplome: e.target.value }),
											placeholder: "Ex : Master Grande École, Bachelor..."
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Niveau d'études"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
												value: f.niveau || "",
												onChange: (e) => handleModifier(idx, { niveau: e.target.value }),
												placeholder: "Ex : M1, M2, Bac+5..."
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Spécialisation / Majeure"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
												value: f.specialisation || "",
												onChange: (e) => handleModifier(idx, { specialisation: e.target.value }),
												placeholder: "Ex : Finance d'entreprise, Marketing Digital..."
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Mention / Grade"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
												value: f.mention || "",
												onChange: (e) => handleModifier(idx, { mention: e.target.value }),
												placeholder: "Ex : Très bien, Major de promotion..."
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Ville / Campus"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
												value: f.ville || "",
												onChange: (e) => handleModifier(idx, { ville: e.target.value }),
												placeholder: "Ex : Paris, Reims, Rouen..."
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Période / Année"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
												value: f.periode || "",
												onChange: (e) => handleModifier(idx, { periode: e.target.value }),
												placeholder: "Ex : 2023 - 2026, Sept 2024 - Présent"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3 pt-6",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
												checked: Boolean(f.enCours),
												onCheckedChange: (c) => handleModifier(idx, { enCours: c })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs text-foreground cursor-pointer",
												children: "Formation en cours"
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										className: "text-xs text-muted-foreground flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-3.5" }), "Matières clés & Cours importants (séparés par des virgules)"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
										value: (f.coursImportants || []).join(", "),
										onChange: (e) => handleModifier(idx, { coursImportants: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }),
										placeholder: "Ex : Analyse financière approfondie, Stratégie d'entreprise, Business Analytics, Négociation..."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs text-muted-foreground",
										children: "Projet académique majeur / Thèse / Mémoire (Optionnel)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										rows: 2,
										value: f.description || "",
										onChange: (e) => handleModifier(idx, { description: e.target.value }),
										placeholder: "Ex : Réalisation d'une étude d'opportunité de marché pour une startup fintech, soutenance devant un jury professionnel...",
										className: "text-xs"
									})]
								})
							]
						})]
					}, f.id || idx);
				})
			})
		]
	});
}
function ProfilExperiencesTab({ profil, onChange }) {
	const cv = profil.cvStructure;
	const experiences = cv?.experiences || [];
	const [expandedIndex, setExpandedIndex] = (0, import_react.useState)(0);
	const updateExperiences = (nouvellesExp) => {
		nouvellesExp[0];
		onChange({
			experiences: nouvellesExp.map((e) => `${e.poste} chez ${e.entreprise} (${e.periode || "Période"}) : ${e.description}`).join("\n\n") || profil.experiences,
			cvStructure: {
				...cv,
				experiences: nouvellesExp
			}
		});
	};
	const handleAjouter = () => {
		const updated = [nouvelleExperience(), ...experiences];
		updateExperiences(updated);
		setExpandedIndex(0);
	};
	const handleSupprimer = (index) => {
		const updated = experiences.filter((_, i) => i !== index);
		updateExperiences(updated);
		if (expandedIndex === index) setExpandedIndex(null);
	};
	const handleModifier = (index, patch) => {
		const updated = experiences.map((e, i) => i === index ? {
			...e,
			...patch
		} : e);
		updateExperiences(updated);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: [
							"Expériences Professionnelles (",
							experiences.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Stages, alternances, jobs et missions avec réalisations quantifiées (KPI)"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: handleAjouter,
					className: "gap-2 bg-purple-600 hover:bg-purple-500 text-white shadow-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Ajouter une expérience"]
				})]
			}),
			experiences.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card p-10 text-center space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto flex size-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-sm font-semibold text-foreground",
						children: "Aucune expérience enregistrée"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground max-w-sm mx-auto",
						children: "Ajoutez vos stages passés, alternances ou projets pour que l'IA valorise votre parcours dans vos lettres et candidatures."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: handleAjouter,
						className: "gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Ajouter ma première expérience"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: experiences.map((exp, idx) => {
					const isExpanded = expandedIndex === idx;
					const titreAffiche = exp.poste || exp.entreprise || `Expérience #${idx + 1}`;
					const sousTitre = [
						exp.entreprise,
						exp.typeContrat || "Stage",
						exp.periode || (exp.enCours ? "En cours" : ""),
						exp.ville
					].filter(Boolean).join(" • ");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-card overflow-hidden border border-border/70 transition-all hover:border-purple-500/30",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onClick: () => setExpandedIndex(isExpanded ? null : idx),
							className: "flex items-center justify-between p-4 sm:p-5 cursor-pointer bg-card/40 hover:bg-card/70 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3.5 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 text-purple-400 font-bold text-xs",
									children: idx + 1
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 space-y-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-sm font-bold text-foreground truncate",
											children: titreAffiche
										}), exp.kpi && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] hidden sm:inline-flex",
											children: "✨ KPI chiffré"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground truncate",
										children: sousTitre || "Détails à renseigner"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 shrink-0",
								children: [
									exp.enCours && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px]",
										children: "Poste actuel"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: (e) => {
											e.stopPropagation();
											handleSupprimer(idx);
										},
										className: "h-7 w-7 p-0 text-muted-foreground hover:text-rose-400",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: isExpanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4" })
									})
								]
							})]
						}), isExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 sm:p-6 border-t border-border/50 bg-background/30 space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs text-muted-foreground",
											children: "Intitulé du poste *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
											value: exp.poste,
											onChange: (e) => handleModifier(idx, { poste: e.target.value }),
											placeholder: "Ex : Bras Droit du CEO, Analyste Financier, Chef de Projet..."
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs text-muted-foreground",
											children: "Entreprise / Organisation *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
											value: exp.entreprise,
											onChange: (e) => handleModifier(idx, { entreprise: e.target.value }),
											placeholder: "Ex : LVMH, BNP Paribas, Swile, BCG..."
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Type de contrat"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
												value: exp.typeContrat || "Stage",
												onChange: (e) => handleModifier(idx, { typeContrat: e.target.value }),
												placeholder: "Ex : Stage, Alternance, CDI, Projet..."
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Ville / Lieu"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
												value: exp.ville || "",
												onChange: (e) => handleModifier(idx, { ville: e.target.value }),
												placeholder: "Ex : Paris, Lyon, Londres, Remote..."
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Période"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
												value: exp.periode || "",
												onChange: (e) => handleModifier(idx, { periode: e.target.value }),
												placeholder: "Ex : Janv. 2024 - Juil. 2024 (6 mois)"
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: Boolean(exp.enCours),
										onCheckedChange: (c) => handleModifier(idx, { enCours: c })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs text-foreground cursor-pointer",
										children: "J'occupe actuellement ce poste"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs text-muted-foreground",
										children: "Missions & Responsabilités principales *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										rows: 3,
										value: exp.description || "",
										onChange: (e) => handleModifier(idx, { description: e.target.value }),
										placeholder: "Ex : • Pilotage des dashboards de performance et reporting hebdomadaire au CoDir\n• Coordination de 3 agences partenaires pour le lancement du nouveau produit\n• Analyse concurrentielle et benchmark sur 12 acteurs du marché...",
										className: "text-xs leading-relaxed"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4 space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
												className: "text-xs font-bold text-emerald-400 flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-4" }), "Réalisations clés & Indicateurs chiffrés (KPI)"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												className: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px]",
												children: "Boost ATS & Matching"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											rows: 2,
											value: exp.kpi || exp.realisationsCles || (exp.realisations ? exp.realisations.join("\n") : ""),
											onChange: (e) => handleModifier(idx, {
												kpi: e.target.value,
												realisationsCles: e.target.value,
												realisations: e.target.value.split("\n").filter(Boolean)
											}),
											placeholder: "Ex : • +32% d'acquisition de leads qualifiés en 3 mois\n• Gestion d'un budget marketing de 45k€ avec ROI de x3.4\n• Réduction de 20% du temps de traitement des dossiers",
											className: "text-xs text-emerald-200 placeholder:text-emerald-400/40 bg-background/50 border-emerald-500/20 focus-visible:ring-emerald-500"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-muted-foreground",
											children: "💡 Les chiffres concrets (croissance, volumes, budgets, satisfaction) multiplient par 2 l'impact auprès des recruteurs."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										className: "text-xs text-muted-foreground flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5" }), "Outils, logiciels et compétences mobilisés (séparés par des virgules)"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
										value: (exp.technologies || []).join(", "),
										onChange: (e) => handleModifier(idx, { technologies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }),
										placeholder: "Ex : Excel (VBA / TCD), Figma, SQL, Notion, Salesforce, Google Analytics..."
									})]
								})
							]
						})]
					}, exp.id || idx);
				})
			})
		]
	});
}
function ProfilSkillsTab({ profil, onChange }) {
	const cv = profil.cvStructure;
	const competencesList = cv?.competences || [];
	const [nouvelleHardSkill, setNouvelleHardSkill] = (0, import_react.useState)("");
	const [niveauHardSkill, setNiveauHardSkill] = (0, import_react.useState)("Intermédiaire");
	const updateCompetences = (nouvelles) => {
		onChange({
			competences: nouvelles.map((c) => `${c.nom} (${c.niveau || "Intermédiaire"})`).join(", ") || profil.competences,
			cvStructure: {
				...cv,
				competences: nouvelles
			}
		});
	};
	const handleAjouterHardSkill = () => {
		if (!nouvelleHardSkill.trim()) return;
		const nc = {
			id: crypto.randomUUID(),
			nom: nouvelleHardSkill.trim(),
			niveau: niveauHardSkill,
			categorie: "Hard Skill"
		};
		updateCompetences([...competencesList, nc]);
		setNouvelleHardSkill("");
	};
	const handleSupprimerCompetence = (id) => {
		updateCompetences(competencesList.filter((c) => c.id !== id));
	};
	const handleModifierNiveau = (id, niveau) => {
		updateCompetences(competencesList.map((c) => c.id === id ? {
			...c,
			niveau
		} : c));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: [
								"Hard Skills & Compétences Techniques (",
								competencesList.length,
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Définissez votre niveau de maîtrise pour affiner le calcul de compatibilité du Match IA"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2 items-end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-[240px] space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs text-muted-foreground",
									children: "Compétence technique"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									value: nouvelleHardSkill,
									onChange: (e) => setNouvelleHardSkill(e.target.value),
									onKeyDown: (e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											handleAjouterHardSkill();
										}
									},
									placeholder: "Ex : Modélisation financière, Python, SEO, Google Ads, UX Research..."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-40 space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs text-muted-foreground",
									children: "Niveau"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: niveauHardSkill,
									onValueChange: (v) => setNiveauHardSkill(v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "text-xs h-10",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: NIVEAUX_COMPETENCE.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: n,
										className: "text-xs",
										children: n
									}, n)) })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								onClick: handleAjouterHardSkill,
								className: "gap-1.5 bg-purple-600 hover:bg-purple-500 text-white h-10 px-4 shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Ajouter"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilTagSuggestions, {
						categorie: "competences",
						valeurActuelle: profil.competences,
						onSelectSuggestion: (nom) => {
							if (!competencesList.some((c) => c.nom.toLowerCase() === nom.toLowerCase())) {
								const nc = {
									id: crypto.randomUUID(),
									nom,
									niveau: "Intermédiaire",
									categorie: "Hard Skill"
								};
								updateCompetences([...competencesList, nc]);
							}
						}
					}),
					competencesList.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3 pt-2",
						children: competencesList.map((comp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2 rounded-xl border border-border/70 bg-card/60 p-2.5 px-3 transition-colors hover:border-purple-500/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-xs font-semibold text-foreground truncate",
									children: comp.nom
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-purple-400 font-medium",
									children: comp.niveau || "Intermédiaire"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: comp.niveau || "Intermédiaire",
									onValueChange: (n) => handleModifierNiveau(comp.id, n),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "h-6 w-20 text-[10px] px-1.5 border-border/60",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: NIVEAUX_COMPETENCE.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: n,
										className: "text-xs",
										children: n
									}, n)) })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => handleSupprimerCompetence(comp.id),
									className: "h-6 w-6 p-0 text-muted-foreground hover:text-rose-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
								})]
							})]
						}, comp.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card p-5 sm:p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: "Logiciels & Outils du Quotidien"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Outils bureautiques, design, analytics, développement et CRM"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs text-muted-foreground",
							children: "Logiciels maîtrisés (séparés par des virgules)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							value: profil.logiciels,
							onChange: (e) => onChange({ logiciels: e.target.value }),
							placeholder: "Ex : Excel (RechercheX, TCD, VBA), Figma, Notion, Salesforce, Google Analytics, PowerBI, SQL, Slack..."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilTagSuggestions, {
						categorie: "logiciels",
						valeurActuelle: profil.logiciels,
						onSelectSuggestion: (val) => {
							const current = profil.logiciels ? profil.logiciels.split(",").map((s) => s.trim()).filter(Boolean) : [];
							if (!current.includes(val)) onChange({ logiciels: [...current, val].join(", ") });
						}
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card p-5 sm:p-6 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 border-b border-border/50 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: "Soft Skills & Savoir-être"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Qualités humaines et relationnelles valorisées en entretien"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-xs text-muted-foreground",
						children: "Vos atouts relationnels et méthodes de travail"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						value: (cv?.softSkills || []).join(", "),
						onChange: (e) => onChange({ cvStructure: {
							...cv,
							softSkills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
						} }),
						placeholder: "Ex : Aisance relationnelle, Esprit d'analyse, Rigueur, Leadership, Autonomie, Adaptabilité, Esprit d'équipe..."
					})]
				})]
			})
		]
	});
}
function ProfilLanguagesCertifsTab({ profil, onChange }) {
	const cv = profil.cvStructure;
	const languesList = cv?.langues || [];
	const certifsList = cv?.certifications || [];
	const [nouvelleLangueNom, setNouvelleLangueNom] = (0, import_react.useState)("");
	const [niveauLangueSelect, setNiveauLangueSelect] = (0, import_react.useState)("Courant (C1)");
	const [scoreOfficiel, setScoreOfficiel] = (0, import_react.useState)("");
	const updateLangues = (nouvelles) => {
		onChange({
			langues: nouvelles.map((l) => `${l.langue} (${l.niveau || "Courant"})`).join(", ") || profil.langues,
			cvStructure: {
				...cv,
				langues: nouvelles
			}
		});
	};
	const updateCertifications = (nouvelles) => {
		onChange({ cvStructure: {
			...cv,
			certifications: nouvelles
		} });
	};
	const handleAjouterLangue = () => {
		if (!nouvelleLangueNom.trim()) return;
		const nl = {
			id: crypto.randomUUID(),
			langue: nouvelleLangueNom.trim(),
			niveau: niveauLangueSelect,
			score: scoreOfficiel.trim() || void 0
		};
		updateLangues([...languesList, nl]);
		setNouvelleLangueNom("");
		setScoreOfficiel("");
	};
	const handleSupprimerLangue = (id) => {
		updateLangues(languesList.filter((l) => l.id !== id));
	};
	const handleAjouterCertif = () => {
		const nc = nouvelleCertification();
		updateCertifications([...certifsList, nc]);
	};
	const handleSupprimerCertif = (id) => {
		updateCertifications(certifsList.filter((c) => c.id !== id));
	};
	const handleModifierCertif = (id, patch) => {
		updateCertifications(certifsList.map((c) => c.id === id ? {
			...c,
			...patch
		} : c));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-card p-5 sm:p-6 space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 border-b border-border/50 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: [
							"Langues Maîtrisées (",
							languesList.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Évaluez votre niveau sur l'échelle CECRL et mentionnez vos scores officiels (TOEIC, TOEFL...)"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-4 items-end",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Langue"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: nouvelleLangueNom,
								onChange: (e) => setNouvelleLangueNom(e.target.value),
								placeholder: "Ex : Anglais, Espagnol, Allemand, Chinois..."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Niveau CECRL"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: niveauLangueSelect,
								onValueChange: (v) => setNiveauLangueSelect(v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "text-xs",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: NIVEAUX_LANGUE.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: n,
									className: "text-xs",
									children: n
								}, n)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							onClick: handleAjouterLangue,
							className: "gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white h-10 px-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Ajouter"]
						})
					]
				}),
				languesList.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2.5 sm:grid-cols-2 pt-2",
					children: languesList.map((lang) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-card/60 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-0.5 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-xs text-foreground block truncate",
								children: lang.langue
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-indigo-400 font-medium",
									children: lang.niveau
								}), lang.score && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] bg-secondary px-1.5 py-0.5 rounded text-muted-foreground",
									children: ["Score : ", lang.score]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => handleSupprimerLangue(lang.id),
							className: "h-7 w-7 p-0 text-muted-foreground hover:text-rose-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
						})]
					}, lang.id))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-card p-5 sm:p-6 space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: [
								"Certifications & Accréditations (",
								certifsList.length,
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "AMF, Bloomberg, Google, CFA, AWS, HubSpot, Microsoft, Scrum..."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: handleAjouterCertif,
						className: "gap-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Ajouter une certification"]
					})]
				}),
				certifsList.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-6 text-xs text-muted-foreground space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Aucune certification ajoutée pour le moment." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px]",
						children: "💡 Les certifications professionnelles attestent de vos compétences opérationnelles dès le premier tri."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: certifsList.map((cert) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border/70 bg-card/50 p-4 space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: cert.nom,
								onChange: (e) => handleModifierCertif(cert.id, { nom: e.target.value }),
								placeholder: "Nom de la certification (ex: Certification AMF, Google Data Analytics...)",
								className: "text-xs font-semibold"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => handleSupprimerCertif(cert.id),
								className: "h-8 w-8 p-0 text-muted-foreground hover:text-rose-400 shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									value: cert.emetteur || "",
									onChange: (e) => handleModifierCertif(cert.id, { emetteur: e.target.value }),
									placeholder: "Organisme (ex: Google, CFA Institute, Bloomberg...)",
									className: "text-xs"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									value: cert.annee || "",
									onChange: (e) => handleModifierCertif(cert.id, { annee: e.target.value }),
									placeholder: "Année / Date d'obtention (ex: 2024)",
									className: "text-xs"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									value: cert.url || "",
									onChange: (e) => handleModifierCertif(cert.id, { url: e.target.value }),
									placeholder: "Lien / URL de vérification (optionnel)",
									className: "text-xs"
								})
							]
						})]
					}, cert.id))
				})
			]
		})]
	});
}
function ProfilProjectsEngagementsTab({ profil, onChange }) {
	const cv = profil.cvStructure;
	const projets = cv?.projets || [];
	const benevolats = cv?.benevolats || [];
	cv?.distinctions;
	const updateProjets = (nouv) => {
		onChange({ cvStructure: {
			...cv,
			projets: nouv
		} });
	};
	const updateBenevolats = (nouv) => {
		onChange({ cvStructure: {
			...cv,
			benevolats: nouv
		} });
	};
	const handleAjouterProjet = () => {
		updateProjets([nouveauProjet(), ...projets]);
	};
	const handleSupprimerProjet = (id) => {
		updateProjets(projets.filter((p) => p.id !== id));
	};
	const handleModifierProjet = (id, patch) => {
		updateProjets(projets.map((p) => p.id === id ? {
			...p,
			...patch
		} : p));
	};
	const handleAjouterBenevolat = () => {
		updateBenevolats([nouveauBenevolat(), ...benevolats]);
	};
	const handleSupprimerBenevolat = (id) => {
		updateBenevolats(benevolats.filter((b) => b.id !== id));
	};
	const handleModifierBenevolat = (id, patch) => {
		updateBenevolats(benevolats.map((b) => b.id === id ? {
			...b,
			...patch
		} : b));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-sm font-semibold text-foreground",
								children: [
									"Projets Personnels, Freelance & Hackathons (",
									projets.length,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Applications créées, études de cas, business plans ou projets concrets"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: handleAjouterProjet,
							className: "gap-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Ajouter un projet"]
						})]
					}),
					projets.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground text-center py-4",
						children: "Aucun projet renseigné. Les projets concrets prouvent vos compétences pratiques !"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: projets.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border/70 bg-card/50 p-4 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
										value: p.titre,
										onChange: (e) => handleModifierProjet(p.id, { titre: e.target.value }),
										placeholder: "Nom du projet (ex: Lancement d'un e-commerce, Hackathon IA...)",
										className: "text-xs font-semibold"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => handleSupprimerProjet(p.id),
										className: "h-8 w-8 p-0 text-muted-foreground hover:text-rose-400 shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
											value: p.role || "",
											onChange: (e) => handleModifierProjet(p.id, { role: e.target.value }),
											placeholder: "Votre rôle (ex: Lead Product, Développeur...)",
											className: "text-xs"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
											value: p.periode || "",
											onChange: (e) => handleModifierProjet(p.id, { periode: e.target.value }),
											placeholder: "Période (ex: 2024, 3 mois...)",
											className: "text-xs"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
											value: p.url || "",
											onChange: (e) => handleModifierProjet(p.id, { url: e.target.value }),
											placeholder: "Lien / Demo (ex: github.com/...)",
											className: "text-xs"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 2,
									value: p.description || "",
									onChange: (e) => handleModifierProjet(p.id, { description: e.target.value }),
									placeholder: "Description du projet, contexte et résultats obtenus...",
									className: "text-xs"
								})
							]
						}, p.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-sm font-semibold text-foreground",
								children: [
									"Associations Étudiantes & Engagements (",
									benevolats.length,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Mandats BDE, Junior-Entreprise, pôle humanitaire, clubs sportifs..."
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: handleAjouterBenevolat,
							className: "gap-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Ajouter un engagement"]
						})]
					}),
					benevolats.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground text-center py-4",
						children: "Aucun engagement associatif renseigné."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: benevolats.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border/70 bg-card/50 p-4 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
										value: b.organisation,
										onChange: (e) => handleModifierBenevolat(b.id, { organisation: e.target.value }),
										placeholder: "Nom de l'association / Organisation (ex: Junior Entreprise, BDE...)",
										className: "text-xs font-semibold"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => handleSupprimerBenevolat(b.id),
										className: "h-8 w-8 p-0 text-muted-foreground hover:text-rose-400 shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
										value: b.role,
										onChange: (e) => handleModifierBenevolat(b.id, { role: e.target.value }),
										placeholder: "Rôle / Mandat (ex: Vice-Président, Trésorier, Chef de projet...)",
										className: "text-xs"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
										value: b.periode || "",
										onChange: (e) => handleModifierBenevolat(b.id, { periode: e.target.value }),
										placeholder: "Période (ex: 2023 - 2024)",
										className: "text-xs"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 2,
									value: b.description || "",
									onChange: (e) => handleModifierBenevolat(b.id, { description: e.target.value }),
									placeholder: "Réalisations : gestion de budget, organisation d'événements (nb de participants)...",
									className: "text-xs"
								})
							]
						}, b.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card p-5 sm:p-6 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 border-b border-border/50 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: "Centres d'intérêt & Passions Authentiques"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Sports, musique, voyages, lectures, centres de curiosité personnelle"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
					value: (cv?.centresInteret || []).join(", "),
					onChange: (e) => onChange({ cvStructure: {
						...cv,
						centresInteret: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
					} }),
					placeholder: "Ex : Course à pied (Semi-marathon de Paris), Piano jazz (10 ans de pratique), Voyages en autonomie, Échecs...",
					className: "text-xs"
				})]
			})
		]
	});
}
var NIVEAUX_IMPORTANCE = [
	{
		value: "Très important",
		label: "Très important (x2)",
		color: "text-purple-400 bg-purple-500/10 border-purple-500/30"
	},
	{
		value: "Important",
		label: "Important (x1.5)",
		color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30"
	},
	{
		value: "Moyen",
		label: "Moyen (x1)",
		color: "text-blue-400 bg-blue-500/10 border-blue-500/30"
	},
	{
		value: "Faible",
		label: "Faible (x0.5)",
		color: "text-muted-foreground bg-secondary border-border/50"
	}
];
var LABELS_CRITERES = {
	missions: {
		label: "Intérêt & Richesse des missions",
		desc: "Adéquation avec votre projet professionnel et complexité des tâches",
		icon: "🎯"
	},
	secteur: {
		label: "Secteur d'activité",
		desc: "Affinité avec l'industrie, le produit ou le domaine de l'entreprise",
		icon: "🏢"
	},
	localisation: {
		label: "Localisation & Temps de trajet",
		desc: "Proximité géographique et facilité d'accès au lieu de travail",
		icon: "📍"
	},
	remuneration: {
		label: "Rémunération & Gratification",
		desc: "Montant mensuel, primes, tickets resto et avantages",
		icon: "💰"
	},
	teletravail: {
		label: "Politique de Télétravail",
		desc: "Flexibilité du rythme de travail (hybride, remote)",
		icon: "💻"
	},
	"taille entreprise": {
		label: "Taille d'entreprise & Culture",
		desc: "Scale-up, Grand groupe, Startup, dynamique d'équipe",
		icon: "👥"
	}
};
function ProfilPreferencesTab({ profil, onChange }) {
	const criteres = profil.criteres || {};
	const preferences = profil.preferences || profil.cvStructure?.preferences || {};
	const handleImportanceChange = (critere, value) => {
		onChange({ criteres: {
			...criteres,
			[critere]: value
		} });
	};
	const handlePreferencesChange = (patch) => {
		const nextPrefs = {
			...preferences,
			...patch
		};
		onChange({
			preferences: nextPrefs,
			cvStructure: {
				...profil.cvStructure,
				preferences: {
					...profil.cvStructure.preferences,
					...nextPrefs
				}
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-card p-5 sm:p-6 space-y-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 border-b border-border/50 pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold text-foreground",
					children: "Pondération des Critères de Matching"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Ajustez l'importance de chaque critère dans le calcul du Score IA de correspondance"
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: CRITERES.map((c) => {
					const info = LABELS_CRITERES[c] || {
						label: c,
						desc: "",
						icon: "📌"
					};
					const currentImportance = criteres[c] || "Important";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/40 p-3.5 px-4 transition-colors hover:border-purple-500/30",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-lg",
								children: info.icon
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-0.5 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-xs font-bold text-foreground",
									children: info.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground truncate",
									children: info.desc
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "shrink-0 flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: currentImportance,
								onValueChange: (val) => handleImportanceChange(c, val),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "h-8 w-44 text-xs font-semibold",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: NIVEAUX_IMPORTANCE.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: n.value,
									className: "text-xs font-medium",
									children: n.label
								}, n.value)) })]
							})
						})]
					}, c);
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-card p-5 sm:p-6 space-y-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 border-b border-border/50 pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold text-foreground",
					children: "Critères Non Négociables & Secteurs à Éviter"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Permet à l'IA d'écarter ou de déclasser automatiquement les offres incompatibles"
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-xs text-muted-foreground",
						children: "Secteurs ou types d'entreprises à éviter"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						value: (preferences.secteursAEviter || []).join(", "),
						onChange: (e) => handlePreferencesChange({ secteursAEviter: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }),
						placeholder: "Ex : Tabac, Armement, Grande distribution, Téléprospection...",
						className: "text-xs"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-xs text-muted-foreground",
						children: "Critères rédhibitoires / Non négociables"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						value: (preferences.criteresNonNegociables || []).join(", "),
						onChange: (e) => handlePreferencesChange({ criteresNonNegociables: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }),
						placeholder: "Ex : Pas de stage non rémunéré, Déplacements max 1j/semaine, Localisation Île-de-France uniquement...",
						className: "text-xs"
					})]
				})]
			})]
		})]
	});
}
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
function ProfilDocumentsTab({ profil, onChange, onOpenCvModal }) {
	const [modeVue, setModeVue] = (0, import_react.useState)("editeur");
	const [copie, setCopie] = (0, import_react.useState)(false);
	const cv = normaliserCvStructure(profil.cvStructure);
	const texteCv = cvStructureEnTexte(cv);
	const copierTexte = () => {
		navigator.clipboard.writeText(texteCv);
		setCopie(true);
		toast.success("Texte complet du profil copié dans le presse-papier !");
		setTimeout(() => setCopie(false), 2e3);
	};
	const exporterJson = () => {
		const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profil, null, 2));
		const downloadAnchor = document.createElement("a");
		downloadAnchor.setAttribute("href", dataStr);
		downloadAnchor.setAttribute("download", `careerly-profil-${(profil.nom || "candidat").toLowerCase()}.json`);
		document.body.appendChild(downloadAnchor);
		downloadAnchor.click();
		downloadAnchor.remove();
		toast.success("Profil exporté au format JSON !");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 border-purple-500/30 bg-gradient-to-r from-purple-500/10 via-card/60 to-indigo-500/10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs font-semibold",
								children: "Source de vérité NACORA"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-sm font-bold text-foreground flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-purple-400" }), "CV Structuré & Export de données"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground max-w-xl",
							children: "Importez un CV existant pour extraire automatiquement les informations ou téléchargez votre profil pour l'utiliser sur d'autres plateformes."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: onOpenCvModal,
						className: "gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }), "Importer un CV (PDF / Word)"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: exporterJson,
						className: "gap-1.5 border-border/70 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "Exporter JSON"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: modeVue === "editeur" ? "secondary" : "ghost",
						onClick: () => setModeVue("editeur"),
						className: "gap-1.5 text-xs h-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode, { className: "size-3.5" }), "Éditeur structuré avancé"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: modeVue === "texte" ? "secondary" : "ghost",
						onClick: () => setModeVue("texte"),
						className: "gap-1.5 text-xs h-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5" }), "Aperçu Texte IA (Contexte injecté)"]
					})]
				}), modeVue === "texte" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: copierTexte,
					className: "gap-1.5 text-xs h-8",
					children: [copie ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-emerald-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), copie ? "Copié" : "Copier le texte"]
				})]
			}),
			modeVue === "editeur" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CvBuilder, {
				value: cv,
				onChange: (nouvCv) => onChange({ cvStructure: nouvCv })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card p-5 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs text-muted-foreground border-b border-border/50 pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-emerald-400" }), "Voici exactement les données transmises au modèle IA lors de l'analyse d'offres et de la génération de candidatures."]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "font-mono text-xs text-muted-foreground/90 whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto bg-background/50 p-4 rounded-xl border border-border/50",
					children: texteCv || "Profil vide pour le moment."
				})]
			})
		]
	});
}
var SyntheseInput = object({ profilTexte: string().min(5) });
var genererSyntheseProfil = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => SyntheseInput.parse(data)).handler(createSsrRpc("9352f6eabe68edbb75492c4f24a9cec674afb6ae0ff47c5892bf1cb413aa97a5"));
var OptimiserInput = object({ profilTexte: string().min(5) });
var optimiserProfilIA = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => OptimiserInput.parse(data)).handler(createSsrRpc("b0aeaa7fd503b52f35234669d03a865dd7908c6c61f462822bccace20eb59efe"));
function ProfilSummaryIAModal({ open, onOpenChange, profil, onUpdateProfil }) {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [copiedPitch, setCopiedPitch] = (0, import_react.useState)(false);
	const synthese = profil.syntheseIa || profil.cvStructure?.syntheseIa || null;
	const handleGenerer = async () => {
		setLoading(true);
		try {
			const res = await genererSyntheseProfil({ data: { profilTexte: profilEnTexte(profil) } });
			onUpdateProfil({
				syntheseIa: res,
				cvStructure: {
					...profil.cvStructure,
					syntheseIa: res
				}
			});
			toast.success("Fiche Profil IA actualisée avec succès !");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erreur lors de la génération de la synthèse IA.");
		} finally {
			setLoading(false);
		}
	};
	const copyPitch = () => {
		if (!synthese?.pitchEntretien) return;
		navigator.clipboard.writeText(synthese.pitchEntretien);
		setCopiedPitch(true);
		toast.success("Pitch d'entretien copié dans le presse-papier !");
		setTimeout(() => setCopiedPitch(false), 2e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-3xl max-h-[88vh] overflow-y-auto p-6 sm:p-7 border-purple-500/20 bg-background/95 backdrop-blur-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
					className: "space-y-2 text-left",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-9 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								className: "text-xl font-bold text-foreground",
								children: "Ce que NACORA sait de moi"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								className: "text-xs text-muted-foreground",
								children: "La vision stratégique synthétisée par l'IA à partir de l'ensemble de votre profil."
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: handleGenerer,
							disabled: loading,
							className: "gap-2 border-purple-500/30 hover:bg-purple-500/10 text-xs shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `size-3.5 ${loading ? "animate-spin" : ""}` }), synthese ? "Réactualiser" : "Générer la synthèse"]
						})]
					})
				}),
				!synthese && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-12 text-center space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto flex size-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-7" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-md mx-auto space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-sm font-semibold text-foreground",
								children: "Aucune synthèse générée pour le moment"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground leading-relaxed",
								children: "Cliquez sur le bouton ci-dessous pour laisser NACORA analyser vos études, expériences, compétences et critères afin d'établir votre diagnostic de positionnement."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: handleGenerer,
							className: "gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), "Créer ma synthèse IA"]
						})
					]
				}),
				loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-16 text-center space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto flex size-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 animate-pulse",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-6 animate-spin" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-foreground",
							children: "Analyse globale de votre profil par l'IA..."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Extraction des forces clés, positionnement stratégique et pitch d'accroche"
						})
					]
				}),
				synthese && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6 pt-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4 sm:p-5 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										className: "bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs font-semibold px-2.5 py-0.5",
										children: "Positionnement Professionnel"
									}), synthese.actualiseLe && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[11px] text-muted-foreground",
										children: [
											"Mis à jour le",
											" ",
											new Date(synthese.actualiseLe).toLocaleDateString("fr-FR")
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-bold text-foreground",
									children: synthese.titrePro || profil.titre || "Candidat à fort potentiel"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground leading-relaxed",
									children: synthese.resumeGlobal
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border/60 bg-card/60 p-4 space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-4" }), "Vos 3 forces clés"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-2",
									children: synthese.forcesCles?.map((force, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2 text-xs text-foreground/90",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] font-bold text-emerald-400 mt-0.5",
											children: i + 1
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: force })]
									}, i))
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border/60 bg-card/60 p-4 space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "size-4" }), "Domaines d'expertise"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5",
									children: synthese.domainesExpertise?.map((dom, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-300",
										children: dom
									}, i))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border/60 bg-card/60 p-4 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-4" }), "Type de poste & Environnement idéal"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-foreground/90 leading-relaxed",
								children: synthese.typePosteIdeal
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-indigo-500/5 p-4 sm:p-5 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-300",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquareQuote, { className: "size-4" }), "Pitch d'accroche pour vos entretiens (30s)"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: copyPitch,
									className: "h-7 gap-1.5 px-2 text-xs text-purple-300 hover:bg-purple-500/20",
									children: [copiedPitch ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-emerald-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), copiedPitch ? "Copié" : "Copier"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-foreground italic leading-relaxed bg-background/40 p-3 rounded-lg border border-purple-500/20",
								children: [
									"« ",
									synthese.pitchEntretien,
									" »"
								]
							})]
						}),
						synthese.pointsVigilance?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4" }), "Axes de vigilance identifiés"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-1.5",
								children: synthese.pointsVigilance.map((pv, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "text-xs text-muted-foreground flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-amber-400 mt-0.5",
										children: "•"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pv })]
								}, i))
							})]
						})
					]
				})
			]
		})
	});
}
function ProfilOptimizerModal({ open, onOpenChange, profil, onNavigateTab }) {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [audit, setAudit] = (0, import_react.useState)(null);
	const handleLancerAudit = async () => {
		setLoading(true);
		try {
			const res = await optimiserProfilIA({ data: { profilTexte: profilEnTexte(profil) } });
			setAudit(res);
			toast.success("Audit d'optimisation IA terminé !");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erreur lors de l'audit IA du profil.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-3xl max-h-[88vh] overflow-y-auto p-6 sm:p-7 border-purple-500/20 bg-background/95 backdrop-blur-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
					className: "space-y-2 text-left",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-500/20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								className: "text-xl font-bold text-foreground",
								children: "Optimiser mon profil avec l'IA"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								className: "text-xs text-muted-foreground",
								children: "Audit ATS & Recruteur : recommandations concrètes STAR, KPI chiffrés et mots-clés stratégiques."
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: handleLancerAudit,
							disabled: loading,
							className: "gap-2 border-purple-500/30 hover:bg-purple-500/10 text-xs shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `size-3.5 ${loading ? "animate-spin" : ""}` }), audit ? "Ré-auditer" : "Lancer l'audit"]
						})]
					})
				}),
				!audit && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-12 text-center space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto flex size-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-7" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-md mx-auto space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-sm font-semibold text-foreground",
								children: "Audit de valorisation & compatibilité recruteurs"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground leading-relaxed",
								children: "L'IA analyse vos descriptions d'expériences, la pertinence de vos compétences et la précision de vos objectifs pour vous donner des conseils d'impact immédiat."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: handleLancerAudit,
							className: "gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), "Auditer et valoriser mon profil"]
						})
					]
				}),
				loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-16 text-center space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto flex size-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 animate-pulse",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-6 animate-spin" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-foreground",
							children: "Audit approfondi en cours..."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Vérification des mots-clés ATS, structure STAR et valorisation chiffrée"
						})
					]
				}),
				audit && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6 pt-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4 sm:p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											className: "bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs",
											children: "Score Qualité du Profil"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-bold text-foreground",
										children: "Diagnostic stratégique de vos candidatures"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground leading-relaxed",
										children: audit.syntheseStrategique
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center justify-center rounded-xl border border-purple-500/30 bg-background/80 px-5 py-3 shrink-0 shadow-inner",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400",
									children: [audit.scoreQualite, "/100"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase font-bold tracking-wider text-muted-foreground",
									children: "Niveau d'impact"
								})]
							})]
						}),
						audit.motsClesRecommandes?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border/60 bg-card/60 p-4 space-y-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { className: "size-4" }), "Mots-clés stratégiques à intégrer dans votre profil"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: audit.motsClesRecommandes.map((mot, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-lg border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-300",
									children: ["+ ", mot]
								}, i))
							})]
						}),
						audit.axesAmelioration?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-4 text-purple-400" }), "Axes d'amélioration prioritaires"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: audit.axesAmelioration.map((axe, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border/70 bg-card/70 p-4 space-y-2.5 transition-all hover:border-purple-500/30",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center justify-between gap-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-bold text-foreground",
													children: axe.rubrique
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
													variant: "outline",
													className: `text-[10px] font-semibold ${axe.impact === "fort" ? "bg-rose-500/10 text-rose-400 border-rose-500/30" : axe.impact === "moyen" ? "bg-amber-500/10 text-amber-400 border-amber-500/30" : "bg-blue-500/10 text-blue-400 border-blue-500/30"}`,
													children: ["Impact ", axe.impact]
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
												className: "text-foreground font-medium",
												children: ["Constat :", " "]
											}), axe.constat]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-foreground/90 font-medium",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
												className: "text-purple-400",
												children: ["Conseil IA :", " "]
											}), axe.recommandation]
										}),
										axe.exempleConcret && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg bg-background/50 border border-purple-500/15 p-2.5 text-xs italic text-muted-foreground",
											children: [
												"💡",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-semibold text-foreground/80",
													children: ["Exemple :", " "]
												}),
												"« ",
												axe.exempleConcret,
												" »"
											]
										})
									]
								}, i))
							})]
						}),
						audit.conseilsStarKpi?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "size-4 text-amber-400" }), "Transformation STAR & KPI chiffrés (Avant / Après)"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: audit.conseilsStarKpi.map((kpi, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border/70 bg-card/70 p-4 space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
											className: "text-xs font-bold text-foreground",
											children: kpi.titre
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-2 sm:grid-cols-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-lg border border-rose-500/20 bg-rose-500/5 p-2.5 space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-bold uppercase text-rose-400 tracking-wider",
													children: "Formulation standard"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground line-through",
													children: kpi.avant
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2.5 space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-bold uppercase text-emerald-400 tracking-wider",
													children: "Formulation impact & KPI"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-emerald-300 font-medium",
													children: kpi.apres
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-muted-foreground",
											children: kpi.explication
										})
									]
								}, i))
							})]
						})
					]
				})
			]
		})
	});
}
function ProfilPage() {
	const { user, loading: authLoading } = useSession();
	const [profil, setProfil] = (0, import_react.useState)(() => loadProfil());
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [cvOpen, setCvOpen] = (0, import_react.useState)(false);
	const [summaryIaOpen, setSummaryIaOpen] = (0, import_react.useState)(false);
	const [optimizerOpen, setOptimizerOpen] = (0, import_react.useState)(false);
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
		if (user?.id && isSupabaseConfigured()) try {
			const saved = await saveProfilCloud(p, user.id);
			setProfil(saved);
			toast.success("Profil synchronisé dans votre espace NACORA Cloud !");
		} catch {
			toast.error("Enregistré localement (connexion cloud temporairement indisponible).");
		} finally {
			setSaving(false);
		}
		else {
			setSaving(false);
			toast.success("Profil sauvegardé avec succès dans votre navigateur !");
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
		eyebrow: "Career Profile",
		title: "Mon Profil Candidat",
		subtitle: "La source de vérité NACORA pour le Match IA, l'analyse de CV, la rédaction d'emails et le coaching d'entretien.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => setSummaryIaOpen(true),
					className: "hidden sm:inline-flex border-purple-500/30 hover:bg-purple-500/10 text-purple-300 gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), "Profil IA"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => setOptimizerOpen(true),
					className: "hidden md:inline-flex border-indigo-500/30 hover:bg-indigo-500/10 text-indigo-300 gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-3.5" }), "Optimiser IA"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: enregistrer,
					disabled: saving,
					className: "gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-xs font-semibold",
					children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), "Enregistrer"]
				})
			]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-6xl space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilHeaderCard, {
					profil,
					bilan,
					onOpenCvModal: () => setCvOpen(true),
					onOpenSummaryIaModal: () => setSummaryIaOpen(true),
					onOpenOptimizerModal: () => setOptimizerOpen(true),
					onSelectTab: (tab) => {
						startTransition(() => setActiveTab(tab));
					},
					saving
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					value: activeTab,
					onValueChange: setActiveTab,
					className: "grid gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto pb-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								className: "inline-flex w-full min-w-[760px] justify-start p-1 sm:w-auto bg-card/60 border border-border/60",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
										value: "recherche",
										className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-3.5 text-purple-400" }), "Ma recherche"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
										value: "identite",
										className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-3.5 text-purple-400" }), "Identité & Contact"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
										value: "formation",
										className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-3.5 text-indigo-400" }), "Formations"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
										value: "experiences",
										className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-3.5 text-purple-400" }), "Expériences & KPI"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
										value: "competences",
										className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-3.5 text-emerald-400" }), "Compétences"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
										value: "langues",
										className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "size-3.5 text-indigo-400" }), "Langues & Certifs"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
										value: "engagements",
										className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "size-3.5 text-amber-400" }), "Projets & Asso"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
										value: "preferences",
										className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-3.5 text-purple-400" }), "Critères"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
										value: "documents",
										className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode, { className: "size-3.5 text-blue-400" }), "CV & Documents"]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "recherche",
							className: "focus-visible:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilObjectivesTab, {
								profil,
								onChange: updateProfil
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "identite",
							className: "focus-visible:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilIdentityTab, {
								profil,
								onChange: updateProfil
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "formation",
							className: "focus-visible:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilEducationTab, {
								profil,
								onChange: updateProfil
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "experiences",
							className: "focus-visible:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilExperiencesTab, {
								profil,
								onChange: updateProfil
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "competences",
							className: "focus-visible:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilSkillsTab, {
								profil,
								onChange: updateProfil
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "langues",
							className: "focus-visible:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilLanguagesCertifsTab, {
								profil,
								onChange: updateProfil
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "engagements",
							className: "focus-visible:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilProjectsEngagementsTab, {
								profil,
								onChange: updateProfil
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "preferences",
							className: "focus-visible:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilPreferencesTab, {
								profil,
								onChange: updateProfil
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "documents",
							className: "focus-visible:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilDocumentsTab, {
								profil,
								onChange: updateProfil,
								onOpenCvModal: () => setCvOpen(true)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card/60 p-4 shadow-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: user && isSupabaseConfigured() ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Profil synchronisé sur votre compte cloud NACORA (Supabase). Raccourci :",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
										className: "rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-foreground",
										children: "Ctrl + S"
									})
								] })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-blue-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Profil sauvegardé localement sur cet appareil.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/parametres",
									className: "ml-1 text-purple-400 underline font-medium hover:text-purple-300",
									children: "Transférer vers un autre appareil / Vercel"
								})] })] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: enregistrer,
								disabled: saving,
								size: "sm",
								className: "gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold",
								children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), "Sauvegarder mon profil"]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilSummaryIAModal, {
				open: summaryIaOpen,
				onOpenChange: setSummaryIaOpen,
				profil,
				onUpdateProfil: updateProfil
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilOptimizerModal, {
				open: optimizerOpen,
				onOpenChange: setOptimizerOpen,
				profil,
				onNavigateTab: (tab) => {
					setOptimizerOpen(false);
					startTransition(() => setActiveTab(tab));
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CvAnalyseDialog, {
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
			})
		]
	});
}
//#endregion
export { ProfilPage as component };

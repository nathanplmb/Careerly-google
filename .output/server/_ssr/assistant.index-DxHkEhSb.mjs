import { a as __toESM } from "../_runtime.mjs";
import { f as object, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as Paperclip, D as Plug, F as Mail, S as ScanLine, V as Linkedin, _ as Sparkles, a as Users, ft as Check, gt as Briefcase, i as WandSparkles, j as MessageSquare, mt as CalendarClock, z as LoaderCircle } from "../_libs/lucide-react.mjs";
import { M as cn, j as Button } from "./router-WcHZLW5p.mjs";
import { t as AppShell } from "./AppShell-CtCpxTdT.mjs";
import { r as createServerFn } from "./server-Ca2emXMH.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-WrckP5Dl.mjs";
import { h as todayIso, u as formatDate } from "./candidatures-0RcN-a4_.mjs";
import { a as versContact, i as versCandidature, n as appliquerEcheance, r as trouverCandidature } from "./tri-ia-B8lJPUTf.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { t as useSession } from "./useSession-C42A4XJ5.mjs";
import { t as useCandidatures } from "./useCandidatures-hl-bBqH6.mjs";
import { r as upsertContact } from "./contacts-cloud-cYMVnP5n.mjs";
import { t as texteErreurIA } from "./ai-erreurs-B0Gxtc15.mjs";
import { n as extraireTexteFichier, t as TYPES_ACCEPTES } from "./cv-fichier-BFa0B9CM.mjs";
import { t as createSsrRpc } from "./createSsrRpc-CsOQ3iCQ.mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assistant.index-DxHkEhSb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
var Input = object({
	texte: string().min(10),
	aujourdhui: string()
});
var trierAvecIa = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => Input.parse(data)).handler(createSsrRpc("1bb0be9313798ba1b18dae0bd81804d89445abd1715cf12be9b75f8d4c676adc"));
function selectionInitiale(t) {
	return {
		candidatures: t.candidatures.map(() => true),
		contacts: t.contacts.map(() => true),
		echeances: t.echeances.map(() => true)
	};
}
function AssistantIa() {
	const { user } = useSession();
	const { items, save, patch } = useCandidatures();
	const run = useServerFn(trierAvecIa);
	const fichierRef = (0, import_react.useRef)(null);
	const [texte, setTexte] = (0, import_react.useState)("");
	const [analyse, setAnalyse] = (0, import_react.useState)(false);
	const [enregistre, setEnregistre] = (0, import_react.useState)(false);
	const [erreur, setErreur] = (0, import_react.useState)(null);
	const [tri, setTri] = (0, import_react.useState)(null);
	const [sel, setSel] = (0, import_react.useState)({
		candidatures: [],
		contacts: [],
		echeances: []
	});
	const basculer = (cle, i) => setSel((s) => ({
		...s,
		[cle]: s[cle].map((v, j) => j === i ? !v : v)
	}));
	const chargerFichier = async (file) => {
		try {
			const t = await extraireTexteFichier(file);
			setTexte((prev) => prev ? `${prev}\n\n${t}` : t);
			toast.success("Fichier ajouté au texte à analyser.");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Fichier illisible.");
		}
	};
	const analyser = async () => {
		setAnalyse(true);
		setErreur(null);
		try {
			const r = await run({ data: {
				texte,
				aujourdhui: todayIso()
			} });
			setTri(r);
			setSel(selectionInitiale(r));
		} catch (e) {
			setErreur(texteErreurIA(e));
		} finally {
			setAnalyse(false);
		}
	};
	const enregistrer = async () => {
		if (!tri) return;
		setEnregistre(true);
		try {
			let nbC = 0;
			let nbP = 0;
			let nbE = 0;
			const ajoutees = [...items];
			for (let i = 0; i < tri.candidatures.length; i++) {
				if (!sel.candidatures[i]) continue;
				const c = versCandidature(tri.candidatures[i]);
				if (!c.entreprise && !c.poste) continue;
				await save(c);
				ajoutees.unshift(c);
				nbC++;
			}
			for (let i = 0; i < tri.echeances.length; i++) {
				if (!sel.echeances[i]) continue;
				const e = tri.echeances[i];
				const cible = trouverCandidature(ajoutees, e.entreprise);
				if (!cible) continue;
				const p = appliquerEcheance(cible, e);
				if (!p) continue;
				if (items.some((c) => c.id === cible.id)) patch(cible.id, p);
				else await save({
					...cible,
					...p
				});
				nbE++;
			}
			if (user) for (let i = 0; i < tri.contacts.length; i++) {
				if (!sel.contacts[i]) continue;
				const ct = versContact(tri.contacts[i]);
				if (!ct.nom) continue;
				const lie = trouverCandidature(ajoutees, ct.entreprise);
				await upsertContact({
					...ct,
					candidatureId: lie?.id ?? ""
				}, user.id);
				nbP++;
			}
			else if (tri.contacts.some((_, i) => sel.contacts[i])) toast.info("Connectez-vous pour enregistrer les contacts.");
			toast.success(`Classé : ${nbC} candidature(s), ${nbP} contact(s), ${nbE} échéance(s).`);
			setTri(null);
			setTexte("");
		} catch {
			toast.error("Enregistrement impossible.");
		} finally {
			setEnregistre(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border border-border/60 bg-card/60 p-4 sm:p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Assistant IA universel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Collez n'importe quoi (annonce, e-mail, notes, liste d'entreprises, message LinkedIn) : l'IA en sort les candidatures, les contacts et les échéances, et les range dans Careerly."
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 10,
					value: texte,
					onChange: (e) => setTexte(e.target.value),
					placeholder: "Exemple : « Entretien avec Camille Roux (RH, Danone) mardi 9 septembre. Offre stage contrôle de gestion chez L'Oréal à Paris, candidature avant le 20/09, lien linkedin.com/... »"
				}),
				erreur && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-destructive",
					children: erreur
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: analyser,
							disabled: analyse || texte.trim().length < 20,
							children: [analyse ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {}), analyse ? "Classement en cours…" : "Classer automatiquement"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: () => fichierRef.current?.click(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, {}), " Ajouter un fichier"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fichierRef,
							type: "file",
							accept: TYPES_ACCEPTES,
							className: "hidden",
							onChange: (e) => {
								const f = e.target.files?.[0];
								e.target.value = "";
								if (f) chargerFichier(f);
							}
						})
					]
				})
			]
		}), tri && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 rounded-2xl border border-border/60 bg-card/60 p-4 sm:p-5",
			children: [
				tri.resume && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: tri.resume
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-4 text-primary" }),
					titre: "Candidatures détectées",
					vide: "Aucune candidature détectée.",
					lignes: tri.candidatures.map((c, i) => ({
						actif: sel.candidatures[i] ?? false,
						onToggle: () => basculer("candidatures", i),
						titre: [c.entreprise, c.poste].filter(Boolean).join(" — ") || "Sans titre",
						detail: [
							c.lieu,
							c.statut,
							c.dateLimite && `limite ${formatDate(c.dateLimite)}`
						].filter(Boolean).join(" · ")
					}))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4 text-primary" }),
					titre: "Contacts détectés",
					vide: "Aucun contact détecté.",
					lignes: tri.contacts.map((c, i) => ({
						actif: sel.contacts[i] ?? false,
						onToggle: () => basculer("contacts", i),
						titre: c.nom || "Sans nom",
						detail: [
							c.poste,
							c.entreprise,
							c.email
						].filter(Boolean).join(" · ")
					}))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-4 text-primary" }),
					titre: "Échéances détectées",
					vide: "Aucune échéance détectée.",
					lignes: tri.echeances.map((e, i) => ({
						actif: sel.echeances[i] ?? false,
						onToggle: () => basculer("echeances", i),
						titre: e.titre || e.nature,
						detail: [e.entreprise, e.date && formatDate(e.date)].filter(Boolean).join(" · ")
					}))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: enregistrer,
						disabled: enregistre,
						children: [enregistre ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {}), "Ranger dans Careerly"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setTri(null),
						disabled: enregistre,
						children: "Annuler"
					})]
				})
			]
		})]
	});
}
function Section({ icon, titre, vide, lignes }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
		className: "mb-2 flex items-center gap-2 text-sm font-semibold",
		children: [
			icon,
			" ",
			titre,
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-muted-foreground",
				children: [
					"(",
					lignes.length,
					")"
				]
			})
		]
	}), lignes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: vide
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-1.5",
		children: lignes.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-start gap-3 rounded-xl border border-border/50 bg-background/40 px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				checked: l.actif,
				onCheckedChange: l.onToggle,
				className: "mt-0.5",
				"aria-label": `Inclure ${l.titre}`
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-sm font-medium",
					children: l.titre
				}), l.detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-xs text-muted-foreground",
					children: l.detail
				})]
			})]
		}, `${l.titre}-${i}`))
	})] });
}
var OUTILS = [
	{
		label: "Match IA",
		desc: "Score de correspondance profil / offre et priorités.",
		to: "/assistant/match",
		icon: Sparkles
	},
	{
		label: "CV Analyzer",
		desc: "Importez votre CV, l'IA remplit votre profil.",
		to: "/profil",
		icon: ScanLine
	},
	{
		label: "Email Assistant",
		desc: "Relances et messages personnalisés à vos contacts.",
		to: "/contacts",
		icon: Mail
	},
	{
		label: "LinkedIn Assistant",
		desc: "Messages de connexion et posts qui convertissent.",
		to: "/assistant/linkedin",
		icon: Linkedin
	},
	{
		label: "Interview Coach",
		desc: "Entraînez-vous aux questions de l'entretien.",
		to: "/assistant/interview",
		icon: MessageSquare
	},
	{
		label: "Connecter une IA",
		desc: "Branchez Claude ou ChatGPT sur vos données.",
		to: "/assistant/connect",
		icon: Plug
	}
];
function AssistantPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		eyebrow: "Copilote",
		title: "Assistant IA",
		subtitle: "Un texte, un e-mail, des notes : l'IA identifie les offres, les contacts et les dates, et les classe pour vous.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantIa, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-1 text-[15px] font-semibold",
					children: "Outils de l'assistant"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-[13px] text-muted-foreground",
					children: "Chaque outil est une sous-page de l'assistant, accessible aussi depuis le menu."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: OUTILS.map((o, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: o.to,
						className: "pop-in press group rounded-2xl border border-border/60 bg-card/60 p-4 transition-colors hover:border-primary/40 hover:bg-card",
						style: { animationDelay: `${i * 50}ms` },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-3 grid size-10 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/25",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o.icon, { className: "size-[18px]" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[14px] font-semibold",
								children: o.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[12.5px] leading-relaxed text-muted-foreground",
								children: o.desc
							})
						]
					}, o.label))
				})
			]
		})]
	});
}
//#endregion
export { AssistantPage as component };

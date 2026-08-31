import { a as __toESM } from "../_runtime.mjs";
import { f as object, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as Sparkles, z as LoaderCircle } from "../_libs/lucide-react.mjs";
import { a as Label, j as Button, o as Input$1 } from "./router-WcHZLW5p.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BYfOmXtJ.mjs";
import { r as createServerFn } from "./server-Ca2emXMH.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-WrckP5Dl.mjs";
import { i as STATUTS, l as emptyPreparation, o as addDays, r as SOURCES, t as PRIORITES } from "./candidatures-0RcN-a4_.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { t as texteErreurIA } from "./ai-erreurs-B0Gxtc15.mjs";
import { t as createSsrRpc } from "./createSsrRpc-CsOQ3iCQ.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DUy71i1r.mjs";
import { a as offreAnalysable, n as lancerAnalyse, r as matchObsolete } from "./match-run-r33f9orm.mjs";
import { t as MatchPanel } from "./MatchPanel-BjJzoGw-.mjs";
import { t as CenterModal } from "./modal-BFL1x5pR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CandidatureSheet-BVTdzn43.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = object({ texte: string().min(10) });
var analyserOffre = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => Input.parse(data)).handler(createSsrRpc("a9a7d9748349c2caef4f1579d82ce8841e1718bdbb7ff691cfe5318e8c13da92"));
function CandidatureSheet({ open, onOpenChange, value, onSave, profil = null }) {
	const [form, setForm] = (0, import_react.useState)(value);
	const [analyse, setAnalyse] = (0, import_react.useState)(false);
	const [enriching, setEnriching] = (0, import_react.useState)(false);
	const [erreur, setErreur] = (0, import_react.useState)(null);
	const [tab, setTab] = (0, import_react.useState)("details");
	const runAnalyserOffre = useServerFn(analyserOffre);
	(0, import_react.useEffect)(() => {
		setForm(value);
		setErreur(null);
		setTab("details");
	}, [value]);
	if (!form) return null;
	const set = (patch) => setForm((f) => f ? {
		...f,
		...patch
	} : f);
	const enrichirViaIA = async () => {
		if (!form) return;
		const contenuAAnalyser = form.detail?.trim() || `${form.poste} ${form.entreprise} ${form.lieu} ${form.commentaire}`;
		if (contenuAAnalyser.length < 15) {
			setErreur("Veuillez coller le texte de l'offre dans 'Détail de l'offre' pour que l'IA puisse l'analyser.");
			return;
		}
		setEnriching(true);
		setErreur(null);
		try {
			const r = await runAnalyserOffre({ data: { texte: contenuAAnalyser } });
			set({
				entreprise: form.entreprise || r.entreprise,
				poste: form.poste || r.poste,
				lieu: form.lieu || r.lieu,
				lien: form.lien || r.lien,
				source: form.source === "Autre" && r.source ? r.source : form.source || r.source || "JobTeaser",
				secteur: form.secteur || r.secteur || "",
				contact: form.contact || r.contact || "",
				dateLimite: form.dateLimite || (/^\d{4}-\d{2}-\d{2}$/.test(r.dateLimite ?? "") ? r.dateLimite : ""),
				priorite: form.priorite === "auto" && (r.priorite === "Haute" || r.priorite === "Moyenne" || r.priorite === "Faible") ? r.priorite : form.priorite,
				commentaire: form.commentaire || r.commentaire || "",
				detail: r.resume?.trim() || form.detail
			});
		} catch (e) {
			setErreur(texteErreurIA(e));
		} finally {
			setEnriching(false);
		}
	};
	const setPrep = (patch) => setForm((f) => f ? {
		...f,
		preparation: {
			...emptyPreparation(),
			...f.preparation,
			...patch
		}
	} : f);
	const analyser = async () => {
		if (!form || !profil) return;
		setAnalyse(true);
		setErreur(null);
		try {
			const match = await lancerAnalyse(form, profil);
			set({ match });
		} catch (e) {
			setErreur(texteErreurIA(e));
		} finally {
			setAnalyse(false);
		}
	};
	const isNew = !value?.entreprise;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CenterModal, {
		open,
		onOpenChange,
		title: isNew ? "Nouvelle candidature" : "Modifier la candidature",
		description: isNew ? "Renseignez les informations de l'offre." : `${form.entreprise} — ${form.poste}`,
		bodyClassName: "px-0 py-0 sm:px-0",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-end gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: () => onOpenChange(false),
				children: "Annuler"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => onSave(form),
				disabled: !form.entreprise.trim(),
				children: "Enregistrer"
			})]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			value: tab,
			onValueChange: setTab,
			className: "flex flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
				className: "mx-5 mt-4 w-auto justify-start sm:mx-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "details",
						children: "Détails"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "match",
						children: "Match IA"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "preparation",
						children: "Préparation"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "details",
						className: "mt-0 data-[state=inactive]:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-5 py-5 sm:px-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "entreprise",
											children: "Entreprise"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
											id: "entreprise",
											value: form.entreprise,
											onChange: (e) => set({ entreprise: e.target.value }),
											placeholder: "Nom de l'entreprise"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "lieu",
											children: "Lieu du poste"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
											id: "lieu",
											value: form.lieu,
											onChange: (e) => set({ lieu: e.target.value }),
											placeholder: "Paris 15e"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "poste",
											children: "Intitulé du poste"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
											id: "poste",
											value: form.poste,
											onChange: (e) => set({ poste: e.target.value }),
											placeholder: "Assistant chef de produit (H/F)"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "État d'avancement" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: form.statut,
											onValueChange: (v) => set({ statut: v }),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: STATUTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: s,
												children: s
											}, s)) })]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Source" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: form.source || "__none__",
											onValueChange: (v) => set({ source: v === "__none__" ? "" : v }),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choisir une source" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "__none__",
												children: "Non renseignée"
											}), SOURCES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: s,
												children: s
											}, s))] })]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "secteur",
											children: "Secteur"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
											id: "secteur",
											value: form.secteur,
											onChange: (e) => set({ secteur: e.target.value }),
											placeholder: "Tech, Luxe, Conseil…"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Priorité" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: form.priorite,
											onValueChange: (v) => set({ priorite: v }),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "auto",
												children: "Auto (par l'IA)"
											}), PRIORITES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: p,
												children: p
											}, p))] })]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "contact",
											children: "Contact (nom / email / téléphone)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
											id: "contact",
											value: form.contact,
											onChange: (e) => set({ contact: e.target.value }),
											placeholder: "M. Dupont - email@email.fr - 0600000000"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "lien",
											children: "Lien internet de l'offre"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
											id: "lien",
											value: form.lien,
											onChange: (e) => set({ lien: e.target.value }),
											placeholder: "https://…"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "envoi",
											children: "Date d'envoi"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
											id: "envoi",
											type: "date",
											value: form.dateEnvoi,
											onChange: (e) => set({
												dateEnvoi: e.target.value,
												dateRelance: form.dateRelance || addDays(e.target.value, 10),
												dateDernierContact: form.dateDernierContact || e.target.value
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "relance",
											children: "Date de relance (J+10)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
											id: "relance",
											type: "date",
											value: form.dateRelance,
											onChange: (e) => set({ dateRelance: e.target.value })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "dernier",
											children: "Date du dernier contact"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
											id: "dernier",
											type: "date",
											value: form.dateDernierContact,
											onChange: (e) => set({ dateDernierContact: e.target.value })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "limite",
											children: "Date limite pour postuler"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
											id: "limite",
											type: "date",
											value: form.dateLimite,
											onChange: (e) => set({ dateLimite: e.target.value })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "commentaire",
											children: "Commentaire"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
											id: "commentaire",
											value: form.commentaire,
											onChange: (e) => set({ commentaire: e.target.value }),
											placeholder: "Entretien prévu le JJ/MM/AAAA"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2 sm:col-span-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "detail",
													children: "Détail de l'offre"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													type: "button",
													variant: "ghost",
													size: "sm",
													className: "h-7 text-xs text-primary gap-1.5 hover:bg-primary/10",
													onClick: () => void enrichirViaIA(),
													disabled: enriching,
													children: [enriching ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5" }), enriching ? "Analyse IA en cours..." : "Remplir & structurer avec l'IA"]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
												id: "detail",
												rows: 6,
												value: form.detail,
												onChange: (e) => set({ detail: e.target.value }),
												placeholder: "Copiez/collez ici le détail ou lien de l'offre pour que l'IA remplisse automatiquement le secteur, la source, le contact et synthétise le poste."
											}),
											erreur && tab === "details" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-destructive mt-1",
												children: erreur
											})
										]
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "match",
						className: "mt-0 data-[state=inactive]:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-5 py-5 sm:px-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchPanel, {
								match: form.match ?? null,
								obsolete: matchObsolete(form, profil),
								loading: analyse,
								erreur,
								profilPret: Boolean(profil && (profil.formation || profil.competences || profil.experiences)),
								offrePrete: offreAnalysable(form),
								onAnalyser: () => void analyser(),
								candidature: form
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "preparation",
						className: "mt-0 data-[state=inactive]:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-5 py-5 sm:px-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "pourquoiEntreprise",
											children: "Pourquoi cette entreprise ?"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											id: "pourquoiEntreprise",
											rows: 3,
											value: form.preparation.pourquoiEntreprise,
											onChange: (e) => setPrep({ pourquoiEntreprise: e.target.value }),
											placeholder: "Vos arguments pour l'entreprise"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "pourquoiPoste",
											children: "Pourquoi ce poste ?"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											id: "pourquoiPoste",
											rows: 3,
											value: form.preparation.pourquoiPoste,
											onChange: (e) => setPrep({ pourquoiPoste: e.target.value }),
											placeholder: "Vos arguments pour le poste"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "notes",
											children: "Notes de préparation"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											id: "notes",
											rows: 5,
											value: form.preparation.notes,
											onChange: (e) => setPrep({ notes: e.target.value }),
											placeholder: "Questions, réponses, points à creuser…"
										})]
									})
								]
							})
						})
					})
				]
			})]
		})
	});
}
//#endregion
export { analyserOffre as n, CandidatureSheet as t };

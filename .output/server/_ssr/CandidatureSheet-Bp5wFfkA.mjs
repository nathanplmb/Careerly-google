import { a as __toESM } from "../_runtime.mjs";
import { f as object, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { V as LoaderCircle, v as Sparkles } from "../_libs/lucide-react.mjs";
import { I as addDays, N as SOURCES, P as STATUTS, d as Textarea, dt as Button, f as Label, j as PRIORITES, p as Input$1, z as emptyPreparation } from "./router-Dma1Qf70.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BVo--1gP.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { r as createServerFn } from "./server-BocG72bt.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-ke1QXT9x.mjs";
import { t as createSsrRpc } from "./profil-cloud-S5cI0mqh.mjs";
import { a as offreAnalysable, c as texteErreurIA, n as lancerAnalyse, r as matchObsolete } from "./match-run-CFvAPahz.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BAFTKIAY.mjs";
import { t as CenterModal } from "./modal-sjW51x0s.mjs";
import { t as MatchPanel } from "./MatchPanel-DdS6Zlqd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CandidatureSheet-Bp5wFfkA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var Input = object({ texte: string().min(10) });
var analyserOffre = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => Input.parse(data)).handler(createSsrRpc("a9a7d9748349c2caef4f1579d82ce8841e1718bdbb7ff691cfe5318e8c13da92"));
var _jsxFileName = "/app/applet/src/components/CandidatureSheet.tsx";
function CandidatureSheet({ open, onOpenChange, value, onSave, onStartWorkflow, profil = null }) {
	const navigate = useNavigate();
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
	const handleSaveOnly = () => {
		if (!form) return;
		onSave(form);
		onOpenChange(false);
	};
	const handleSaveAndStart = async () => {
		if (!form) return;
		onSave(form);
		onOpenChange(false);
		if (onStartWorkflow) onStartWorkflow(form);
		else navigate({
			to: "/assistant",
			search: { oppId: form.id }
		});
	};
	const set = (patch) => setForm((f) => f ? {
		...f,
		...patch
	} : f);
	const enrichirViaIA = async () => {
		if (!form) return;
		const contenuAAnalyser = [
			form.detail?.trim(),
			form.missions?.trim(),
			form.profilRecherche?.trim(),
			form.modalites?.trim(),
			`${form.poste} ${form.entreprise} ${form.lieu} ${form.commentaire}`
		].filter(Boolean).join("\n\n");
		if (contenuAAnalyser.length < 15) {
			setErreur("Veuillez coller le texte ou le détail de l'offre pour que l'IA puisse l'analyser.");
			return;
		}
		setEnriching(true);
		setErreur(null);
		try {
			const r = await runAnalyserOffre({ data: { texte: contenuAAnalyser } });
			set({
				entreprise: !form.entreprise || form.entreprise === "Entreprise" || form.entreprise === "Nouvelle entreprise" ? r.entreprise || form.entreprise : form.entreprise,
				poste: !form.poste || form.poste === "Nouveau poste" ? r.poste || form.poste : form.poste,
				lieu: !form.lieu || form.lieu === "Non précisé" ? r.lieu || form.lieu : form.lieu,
				lien: form.lien || r.lien,
				source: form.source === "Autre" && r.source ? r.source : form.source || r.source || "JobTeaser",
				secteur: form.secteur || r.secteur || "",
				contact: form.contact || r.contact || "",
				dateLimite: form.dateLimite || (/^\d{4}-\d{2}-\d{2}$/.test(r.dateLimite ?? "") ? r.dateLimite : ""),
				priorite: form.priorite === "auto" && (r.priorite === "Haute" || r.priorite === "Moyenne" || r.priorite === "Faible") ? r.priorite : form.priorite,
				commentaire: r.commentaire || form.commentaire || "",
				missions: r.missions || form.missions || "",
				profilRecherche: r.profilRecherche || form.profilRecherche || "",
				modalites: r.modalites || form.modalites || "",
				detail: r.detail?.trim() || form.detail || ""
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CenterModal, {
		open,
		onOpenChange,
		title: isNew ? "Nouvelle candidature" : "Modifier la candidature",
		description: isNew ? "Renseignez les informations de l'offre." : `${form.entreprise} — ${form.poste}`,
		bodyClassName: "px-0 py-0 sm:px-0",
		footer: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between w-full gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: () => onOpenChange(false),
				className: "text-xs text-muted-foreground",
				children: "Annuler"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 199,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "outline",
					size: "sm",
					onClick: handleSaveOnly,
					disabled: !form.entreprise.trim(),
					className: "text-xs font-medium",
					children: "Enregistrer uniquement"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 209,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					onClick: handleSaveAndStart,
					disabled: !form.entreprise.trim(),
					className: "text-xs font-medium bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 224,
						columnNumber: 15
					}, this), "Commencer ma candidature"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 218,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 208,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 198,
			columnNumber: 9
		}, this),
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tabs, {
			value: tab,
			onValueChange: setTab,
			className: "flex flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsList, {
				className: "mx-5 mt-4 w-auto justify-start sm:mx-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
						value: "details",
						children: "Détails"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 233,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
						value: "match",
						children: "Match IA"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 234,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
						value: "preparation",
						children: "Préparation"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 235,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 232,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
						value: "details",
						className: "mt-0 data-[state=inactive]:hidden",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "px-5 py-5 sm:px-6",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "entreprise",
											children: "Entreprise"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 246,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
											id: "entreprise",
											value: form.entreprise,
											onChange: (e) => set({ entreprise: e.target.value }),
											placeholder: "Nom de l'entreprise"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 247,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 245,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "lieu",
											children: "Lieu du poste"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 255,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
											id: "lieu",
											value: form.lieu,
											onChange: (e) => set({ lieu: e.target.value }),
											placeholder: "Paris 15e"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 256,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 254,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "poste",
											children: "Intitulé du poste"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 264,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
											id: "poste",
											value: form.poste,
											onChange: (e) => set({ poste: e.target.value }),
											placeholder: "Assistant chef de produit (H/F)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 265,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 263,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "État d'avancement" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 273,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
											value: form.statut,
											onValueChange: (v) => set({ statut: v }),
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 279,
												columnNumber: 23
											}, this) }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 278,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: STATUTS.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: s,
												children: s
											}, s, false, {
												fileName: _jsxFileName,
												lineNumber: 283,
												columnNumber: 25
											}, this)) }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 281,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 274,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 272,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Source" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 291,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
											value: form.source || "__none__",
											onValueChange: (v) => set({ source: v === "__none__" ? "" : v }),
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "Choisir une source" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 299,
												columnNumber: 23
											}, this) }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 298,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: "__none__",
												children: "Non renseignée"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 302,
												columnNumber: 23
											}, this), SOURCES.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: s,
												children: s
											}, s, false, {
												fileName: _jsxFileName,
												lineNumber: 304,
												columnNumber: 25
											}, this))] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 301,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 292,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 290,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "secteur",
											children: "Secteur"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 312,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
											id: "secteur",
											value: form.secteur,
											onChange: (e) => set({ secteur: e.target.value }),
											placeholder: "Tech, Luxe, Conseil…"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 313,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 311,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Priorité" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 321,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
											value: form.priorite,
											onValueChange: (v) => set({ priorite: v }),
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 329,
												columnNumber: 23
											}, this) }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 328,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: "auto",
												children: "Auto (par l'IA)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 332,
												columnNumber: 23
											}, this), PRIORITES.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: p,
												children: p
											}, p, false, {
												fileName: _jsxFileName,
												lineNumber: 334,
												columnNumber: 25
											}, this))] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 331,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 322,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 320,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "contact",
											children: "Contact (nom / email / téléphone)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 342,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
											id: "contact",
											value: form.contact,
											onChange: (e) => set({ contact: e.target.value }),
											placeholder: "M. Dupont - email@email.fr - 0600000000"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 345,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 341,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "lien",
											children: "Lien internet de l'offre"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 353,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
											id: "lien",
											value: form.lien,
											onChange: (e) => set({ lien: e.target.value }),
											placeholder: "https://…"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 354,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 352,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "envoi",
											children: "Date d'envoi"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 362,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
											id: "envoi",
											type: "date",
											value: form.dateEnvoi,
											onChange: (e) => set({
												dateEnvoi: e.target.value,
												dateRelance: form.dateRelance || addDays(e.target.value, 10),
												dateDernierContact: form.dateDernierContact || e.target.value
											})
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 363,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 361,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "relance",
											children: "Date de relance (J+10)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 379,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
											id: "relance",
											type: "date",
											value: form.dateRelance,
											onChange: (e) => set({ dateRelance: e.target.value })
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 380,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 378,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "dernier",
											children: "Date du dernier contact"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 388,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
											id: "dernier",
											type: "date",
											value: form.dateDernierContact,
											onChange: (e) => set({ dateDernierContact: e.target.value })
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 389,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 387,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "limite",
											children: "Date limite pour postuler"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 399,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
											id: "limite",
											type: "date",
											value: form.dateLimite,
											onChange: (e) => set({ dateLimite: e.target.value })
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 400,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 398,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2 sm:col-span-2 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center justify-between border-b pb-2 mb-1",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5 text-primary" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 410,
													columnNumber: 23
												}, this), "Contenu du poste & Analyse IA"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 409,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
												type: "button",
												variant: "outline",
												size: "sm",
												className: "h-7 text-xs text-primary border-primary/30 hover:bg-primary/10 gap-1.5",
												onClick: () => void enrichirViaIA(),
												disabled: enriching,
												children: [enriching ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 422,
													columnNumber: 25
												}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "w-3.5 h-3.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 424,
													columnNumber: 25
												}, this), enriching ? "Analyse IA en cours..." : "Remplir & structurer avec l'IA"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 413,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 408,
											columnNumber: 19
										}, this), erreur && tab === "details" && /* @__PURE__ */ (void 0)("p", {
											className: "text-xs text-destructive mb-2",
											children: erreur
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 432,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 407,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "missions",
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "🎯" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 441,
												columnNumber: 21
											}, this), " Missions clés"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 437,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
											id: "missions",
											rows: 3,
											value: form.missions,
											onChange: (e) => set({ missions: e.target.value }),
											placeholder: "• Responsabilités, projets à piloter, livrables attendus..."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 443,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 436,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "profilRecherche",
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "👤" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 457,
												columnNumber: 21
											}, this), " Profil & Compétences recherchés"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 453,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
											id: "profilRecherche",
											rows: 3,
											value: form.profilRecherche,
											onChange: (e) => set({ profilRecherche: e.target.value }),
											placeholder: "• Formation (ex: Master Finance/Management), hard skills (Excel, PowerPoint...), langues, soft skills..."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 459,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 452,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "modalites",
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "ℹ️" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 473,
												columnNumber: 21
											}, this), " Modalités du poste"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 469,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
											id: "modalites",
											rows: 2,
											value: form.modalites,
											onChange: (e) => set({ modalites: e.target.value }),
											placeholder: "• Type / Durée (ex: Stage 6 mois) • Début • Gratification • Télétravail..."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 475,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 468,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "detail",
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "📝" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 486,
												columnNumber: 21
											}, this), " Détails supplémentaires / Texte brut de l'offre"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 485,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
											id: "detail",
											rows: 3,
											value: form.detail,
											onChange: (e) => set({ detail: e.target.value }),
											placeholder: "Collez ici le texte intégral de la fiche de poste ou des notes d'équipe complémentaires..."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 489,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 484,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "commentaire",
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "💬" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 503,
												columnNumber: 21
											}, this), " Commentaire & Conseil stratégique"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 499,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
											id: "commentaire",
											rows: 2,
											value: form.commentaire,
											onChange: (e) => set({ commentaire: e.target.value }),
											placeholder: "Conseil stratégique pour postuler, points d'accroche ou notes de suivi..."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 505,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 498,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 244,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 243,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 239,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
						value: "match",
						className: "mt-0 data-[state=inactive]:hidden",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "px-5 py-5 sm:px-6",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MatchPanel, {
								match: form.match ?? null,
								obsolete: matchObsolete(form, profil),
								loading: analyse,
								erreur,
								profilPret: Boolean(profil && (profil.formation || profil.competences || profil.experiences)),
								offrePrete: offreAnalysable(form),
								onAnalyser: () => void analyser(),
								candidature: form
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 522,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 521,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 517,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
						value: "preparation",
						className: "mt-0 data-[state=inactive]:hidden",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "px-5 py-5 sm:px-6",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "pourquoiEntreprise",
											children: "Pourquoi cette entreprise ?"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 547,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
											id: "pourquoiEntreprise",
											rows: 3,
											value: form.preparation.pourquoiEntreprise,
											onChange: (e) => setPrep({ pourquoiEntreprise: e.target.value }),
											placeholder: "Vos arguments pour l'entreprise"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 550,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 546,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "pourquoiPoste",
											children: "Pourquoi ce poste ?"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 561,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
											id: "pourquoiPoste",
											rows: 3,
											value: form.preparation.pourquoiPoste,
											onChange: (e) => setPrep({ pourquoiPoste: e.target.value }),
											placeholder: "Vos arguments pour le poste"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 562,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 560,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "notes",
											children: "Notes de préparation"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 571,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
											id: "notes",
											rows: 5,
											value: form.preparation.notes,
											onChange: (e) => setPrep({ notes: e.target.value }),
											placeholder: "Questions, réponses, points à creuser…"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 572,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 570,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 545,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 544,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 540,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 238,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 231,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 187,
		columnNumber: 5
	}, this);
}
//#endregion
export { analyserOffre as n, CandidatureSheet as t };

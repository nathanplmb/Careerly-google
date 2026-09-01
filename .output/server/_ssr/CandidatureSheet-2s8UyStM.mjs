import { o as __toESM } from "../_runtime.mjs";
import { f as object, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as isRedirect, b as useRouter, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-DDzEUEFj.mjs";
import { V as LoaderCircle, v as Sparkles } from "../_libs/lucide-react.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BVo--1gP.mjs";
import { r as createServerFn } from "./server-vg2yPy0D.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BzNacVbR.mjs";
import { t as createSsrRpc } from "./profil-cloud-GRdvg22b.mjs";
import { c as Label, s as Input$1 } from "./dialog-B3Jp4UDR.mjs";
import { t as Textarea } from "./textarea-CNcwtOlr.mjs";
import { i as addDays, n as SOURCES, r as STATUTS, s as emptyPreparation, t as PRIORITES } from "./candidatures-ck14d0Ow.mjs";
import { t as texteErreurIA } from "./ai-erreurs-B0Gxtc15.mjs";
import { a as offreAnalysable, n as lancerAnalyse, r as matchObsolete } from "./match-run-Bhrc1Shm.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BAFTKIAY.mjs";
import { t as CenterModal } from "./modal-AsYCopxE.mjs";
import { t as MatchPanel } from "./MatchPanel-BHcj29Y-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CandidatureSheet-2s8UyStM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var Input = object({ texte: string().min(10) });
var analyserOffre = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((data) => Input.parse(data)).handler(createSsrRpc("a9a7d9748349c2caef4f1579d82ce8841e1718bdbb7ff691cfe5318e8c13da92"));
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
			typeof form.detail === "string" ? form.detail.trim() : "",
			typeof form.missions === "string" ? form.missions.trim() : "",
			typeof form.profilRecherche === "string" ? form.profilRecherche.trim() : "",
			typeof form.modalites === "string" ? form.modalites.trim() : "",
			`${form.poste || ""} ${form.entreprise || ""} ${form.lieu || ""} ${form.commentaire || ""}`.trim()
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
				lineNumber: 201,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "outline",
					size: "sm",
					onClick: handleSaveOnly,
					disabled: !String(form.entreprise || "").trim(),
					className: "text-xs font-medium",
					children: "Enregistrer uniquement"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 211,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					onClick: handleSaveAndStart,
					disabled: !String(form.entreprise || "").trim(),
					className: "text-xs font-medium bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 226,
						columnNumber: 15
					}, this), "Commencer ma candidature"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 220,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 210,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 200,
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
						lineNumber: 235,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
						value: "match",
						children: "Match IA"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 236,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
						value: "preparation",
						children: "Préparation"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 237,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 234,
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
											lineNumber: 248,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
											id: "entreprise",
											value: form.entreprise,
											onChange: (e) => set({ entreprise: e.target.value }),
											placeholder: "Nom de l'entreprise"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 249,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 247,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "lieu",
											children: "Lieu du poste"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 257,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
											id: "lieu",
											value: form.lieu,
											onChange: (e) => set({ lieu: e.target.value }),
											placeholder: "Paris 15e"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 258,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 256,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "poste",
											children: "Intitulé du poste"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 266,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
											id: "poste",
											value: form.poste,
											onChange: (e) => set({ poste: e.target.value }),
											placeholder: "Assistant chef de produit (H/F)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 267,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 265,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "État d'avancement" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 275,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
											value: form.statut,
											onValueChange: (v) => set({ statut: v }),
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 281,
												columnNumber: 23
											}, this) }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 280,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: STATUTS.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: s,
												children: s
											}, s, false, {
												fileName: _jsxFileName,
												lineNumber: 285,
												columnNumber: 25
											}, this)) }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 283,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 276,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 274,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Source" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 293,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
											value: form.source || "__none__",
											onValueChange: (v) => set({ source: v === "__none__" ? "" : v }),
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "Choisir une source" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 301,
												columnNumber: 23
											}, this) }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 300,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: "__none__",
												children: "Non renseignée"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 304,
												columnNumber: 23
											}, this), SOURCES.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: s,
												children: s
											}, s, false, {
												fileName: _jsxFileName,
												lineNumber: 306,
												columnNumber: 25
											}, this))] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 303,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 294,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 292,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "secteur",
											children: "Secteur"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 314,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
											id: "secteur",
											value: form.secteur,
											onChange: (e) => set({ secteur: e.target.value }),
											placeholder: "Tech, Luxe, Conseil…"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 315,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 313,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Priorité" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 323,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
											value: form.priorite,
											onValueChange: (v) => set({ priorite: v }),
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 331,
												columnNumber: 23
											}, this) }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 330,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: "auto",
												children: "Auto (par l'IA)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 334,
												columnNumber: 23
											}, this), PRIORITES.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: p,
												children: p
											}, p, false, {
												fileName: _jsxFileName,
												lineNumber: 336,
												columnNumber: 25
											}, this))] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 333,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 324,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 322,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "contact",
											children: "Contact (nom / email / téléphone)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 344,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
											id: "contact",
											value: form.contact,
											onChange: (e) => set({ contact: e.target.value }),
											placeholder: "M. Dupont - email@email.fr - 0600000000"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 347,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 343,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "lien",
											children: "Lien internet de l'offre"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 355,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
											id: "lien",
											value: form.lien,
											onChange: (e) => set({ lien: e.target.value }),
											placeholder: "https://…"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 356,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 354,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "envoi",
											children: "Date d'envoi"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 364,
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
											lineNumber: 365,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 363,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "relance",
											children: "Date de relance (J+10)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 381,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
											id: "relance",
											type: "date",
											value: form.dateRelance,
											onChange: (e) => set({ dateRelance: e.target.value })
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 382,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 380,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "dernier",
											children: "Date du dernier contact"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 390,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
											id: "dernier",
											type: "date",
											value: form.dateDernierContact,
											onChange: (e) => set({ dateDernierContact: e.target.value })
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 391,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 389,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "limite",
											children: "Date limite pour postuler"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 401,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
											id: "limite",
											type: "date",
											value: form.dateLimite,
											onChange: (e) => set({ dateLimite: e.target.value })
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 402,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 400,
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
													lineNumber: 412,
													columnNumber: 23
												}, this), "Contenu du poste & Analyse IA"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 411,
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
													lineNumber: 424,
													columnNumber: 25
												}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "w-3.5 h-3.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 426,
													columnNumber: 25
												}, this), enriching ? "Analyse IA en cours..." : "Remplir & structurer avec l'IA"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 415,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 410,
											columnNumber: 19
										}, this), erreur && tab === "details" && /* @__PURE__ */ (void 0)("p", {
											className: "text-xs text-destructive mb-2",
											children: erreur
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 434,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 409,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "missions",
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "🎯" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 443,
												columnNumber: 21
											}, this), " Missions clés"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 439,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
											id: "missions",
											rows: 3,
											value: form.missions,
											onChange: (e) => set({ missions: e.target.value }),
											placeholder: "• Responsabilités, projets à piloter, livrables attendus..."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 445,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 438,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "profilRecherche",
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "👤" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 459,
												columnNumber: 21
											}, this), " Profil & Compétences recherchés"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 455,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
											id: "profilRecherche",
											rows: 3,
											value: form.profilRecherche,
											onChange: (e) => set({ profilRecherche: e.target.value }),
											placeholder: "• Formation (ex: Master Finance/Management), hard skills (Excel, PowerPoint...), langues, soft skills..."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 461,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 454,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "modalites",
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "ℹ️" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 475,
												columnNumber: 21
											}, this), " Modalités du poste"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 471,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
											id: "modalites",
											rows: 2,
											value: form.modalites,
											onChange: (e) => set({ modalites: e.target.value }),
											placeholder: "• Type / Durée (ex: Stage 6 mois) • Début • Gratification • Télétravail..."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 477,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 470,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "detail",
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "📝" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 488,
												columnNumber: 21
											}, this), " Détails supplémentaires / Texte brut de l'offre"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 487,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
											id: "detail",
											rows: 3,
											value: form.detail,
											onChange: (e) => set({ detail: e.target.value }),
											placeholder: "Collez ici le texte intégral de la fiche de poste ou des notes d'équipe complémentaires..."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 491,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 486,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "commentaire",
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "💬" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 505,
												columnNumber: 21
											}, this), " Commentaire & Conseil stratégique"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 501,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
											id: "commentaire",
											rows: 2,
											value: form.commentaire,
											onChange: (e) => set({ commentaire: e.target.value }),
											placeholder: "Conseil stratégique pour postuler, points d'accroche ou notes de suivi..."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 507,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 500,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 246,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 245,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 241,
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
								lineNumber: 524,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 523,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 519,
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
											lineNumber: 549,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
											id: "pourquoiEntreprise",
											rows: 3,
											value: form.preparation.pourquoiEntreprise,
											onChange: (e) => setPrep({ pourquoiEntreprise: e.target.value }),
											placeholder: "Vos arguments pour l'entreprise"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 552,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 548,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "pourquoiPoste",
											children: "Pourquoi ce poste ?"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 563,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
											id: "pourquoiPoste",
											rows: 3,
											value: form.preparation.pourquoiPoste,
											onChange: (e) => setPrep({ pourquoiPoste: e.target.value }),
											placeholder: "Vos arguments pour le poste"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 564,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 562,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "notes",
											children: "Notes de préparation"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 573,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
											id: "notes",
											rows: 5,
											value: form.preparation.notes,
											onChange: (e) => setPrep({ notes: e.target.value }),
											placeholder: "Questions, réponses, points à creuser…"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 574,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 572,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 547,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 546,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 542,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 240,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 233,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 189,
		columnNumber: 5
	}, this);
}
//#endregion
export { analyserOffre as n, useServerFn as r, CandidatureSheet as t };

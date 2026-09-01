import { o as __toESM } from "../_runtime.mjs";
import { f as object, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-DDzEUEFj.mjs";
import { A as Phone, L as Mail, O as Plus, S as Search, V as LoaderCircle, p as Trash2, s as UserRound, v as Sparkles, yt as Copy } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-JIGp6MTc.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BVo--1gP.mjs";
import { r as createServerFn } from "./server-vg2yPy0D.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BzNacVbR.mjs";
import { t as createSsrRpc } from "./profil-cloud-GRdvg22b.mjs";
import { c as Label, s as Input$1 } from "./dialog-B3Jp4UDR.mjs";
import { t as Textarea } from "./textarea-CNcwtOlr.mjs";
import { t as texteErreurIA } from "./ai-erreurs-B0Gxtc15.mjs";
import { o as offreEnTexte, s as profilEnTexte } from "./match-run-Bhrc1Shm.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BAFTKIAY.mjs";
import { t as CenterModal } from "./modal-AsYCopxE.mjs";
import { t as useProfil } from "./useProfil-Vc3u7mk3.mjs";
import { t as useSession } from "./useSession-D5EIlFSn.mjs";
import { n as fetchCandidatures } from "./candidatures-cloud-DtlZLmP5.mjs";
import { a as contactEnTexte, c as loadContactsLocal, i as TYPES_RELANCE, l as nouvelEchange, n as LIBELLES_RELANCE, o as emptyContact, r as TYPES_CONTACT, s as historiqueEnTexte, t as CANAUX, u as saveContactsLocal } from "./contacts--GCSJljy.mjs";
import { n as fetchContacts, r as upsertContact, t as deleteContact } from "./contacts-cloud--x0UJSDd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contacts-BUsxx4RF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var Input = object({
	typeRelance: string().min(1),
	contact: string().min(1),
	profil: string().default(""),
	offre: string().default(""),
	historique: string().default(""),
	consigne: string().default("")
});
var genererRelance = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((data) => Input.parse(data)).handler(createSsrRpc("083602d0b411f735d2eebc83b88e78ffbf195fe1ecbd8d102e008b00ba40a90e"));
/** Orchestration client de la relance IA : contexte réel -> IA -> message. */
async function lancerRelance(contact, type, profil, candidature, consigne) {
	const r = await genererRelance({ data: {
		typeRelance: LIBELLES_RELANCE[type],
		contact: contactEnTexte(contact),
		profil: profil ? profilEnTexte(profil) : "",
		offre: candidature ? offreEnTexte(candidature) : "",
		historique: historiqueEnTexte(contact.historique),
		consigne
	} });
	return {
		objet: (r.objet ?? "").trim(),
		message: (r.message ?? "").trim(),
		conseils: (r.conseils ?? []).map((c) => c.trim()).filter(Boolean).slice(0, 3)
	};
}
var _jsxFileName$1 = "/app/applet/src/components/ContactSheet.tsx";
function ContactSheet({ open, onOpenChange, contact, candidatures, profil, onSave, onDelete }) {
	const [draft, setDraft] = (0, import_react.useState)(contact);
	const [typeRelance, setTypeRelance] = (0, import_react.useState)("relance_candidature");
	const [consigne, setConsigne] = (0, import_react.useState)("");
	const [chargement, setChargement] = (0, import_react.useState)(false);
	const [erreur, setErreur] = (0, import_react.useState)(null);
	const [resultat, setResultat] = (0, import_react.useState)(null);
	const [ref, setRef] = (0, import_react.useState)(contact.id);
	if (ref !== contact.id) {
		setRef(contact.id);
		setDraft(contact);
		setResultat(null);
		setErreur(null);
	}
	const set = (patch) => setDraft((c) => ({
		...c,
		...patch
	}));
	const candidature = (0, import_react.useMemo)(() => candidatures.find((c) => c.id === draft.candidatureId) ?? null, [candidatures, draft.candidatureId]);
	const generer = async () => {
		setChargement(true);
		setErreur(null);
		try {
			setResultat(await lancerRelance(draft, typeRelance, profil, candidature, consigne));
		} catch (e) {
			setErreur(texteErreurIA(e));
		} finally {
			setChargement(false);
		}
	};
	const copier = async (texte) => {
		try {
			await navigator.clipboard.writeText(texte);
			toast.success("Copié dans le presse-papier.");
		} catch {
			toast.error("Copie impossible sur cet appareil.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CenterModal, {
		open,
		onOpenChange,
		title: draft.nom || "Nouveau contact",
		description: [draft.poste, draft.entreprise].filter(Boolean).join(" — ") || "Ajoutez les informations du contact.",
		footer: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center justify-between gap-2",
			children: [onDelete ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "ghost",
				className: "text-destructive",
				onClick: () => onDelete(draft),
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 118,
					columnNumber: 15
				}, this), " Supprimer"]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 113,
				columnNumber: 13
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 121,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				onClick: () => onSave(draft),
				children: "Enregistrer"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 123,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 111,
			columnNumber: 9
		}, this),
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tabs, {
			defaultValue: "infos",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsList, {
					className: "w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
							value: "infos",
							className: "flex-1",
							children: "Fiche"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 129,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
							value: "historique",
							className: "flex-1",
							children: "Historique"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 132,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
							value: "relance",
							className: "flex-1",
							children: "Relance IA"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 135,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 128,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
					value: "infos",
					className: "mt-4 grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Nom" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 142,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
								value: draft.nom,
								onChange: (e) => set({ nom: e.target.value })
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 143,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 141,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Type de contact" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 149,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
								value: draft.type,
								onValueChange: (v) => set({ type: v }),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 155,
									columnNumber: 17
								}, this) }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 154,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: TYPES_CONTACT.map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: t,
									children: t
								}, t, false, {
									fileName: _jsxFileName$1,
									lineNumber: 159,
									columnNumber: 19
								}, this)) }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 157,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 150,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 148,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Entreprise" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 167,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
								value: draft.entreprise,
								onChange: (e) => set({ entreprise: e.target.value })
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 168,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 166,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Poste" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 174,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
								value: draft.poste,
								onChange: (e) => set({ poste: e.target.value })
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 175,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 173,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Email" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 181,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
								type: "email",
								value: draft.email,
								onChange: (e) => set({ email: e.target.value })
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 182,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 180,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Téléphone" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 189,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
								value: draft.telephone,
								onChange: (e) => set({ telephone: e.target.value })
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 190,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 188,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-2 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "LinkedIn" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 196,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
								value: draft.linkedin,
								onChange: (e) => set({ linkedin: e.target.value }),
								placeholder: "https://www.linkedin.com/in/…"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 197,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 195,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-2 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Candidature associée" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 204,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
								value: draft.candidatureId || "aucune",
								onValueChange: (v) => set({ candidatureId: v === "aucune" ? "" : v }),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "Aucune" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 212,
									columnNumber: 17
								}, this) }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 211,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: "aucune",
									children: "Aucune"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 215,
									columnNumber: 17
								}, this), candidatures.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: c.id,
									children: [
										c.entreprise || "Sans nom",
										" —",
										" ",
										c.poste || "poste non précisé"
									]
								}, c.id, true, {
									fileName: _jsxFileName$1,
									lineNumber: 217,
									columnNumber: 19
								}, this))] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 214,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 205,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 203,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Dernière interaction" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 226,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
								type: "date",
								value: draft.derniereInteraction,
								onChange: (e) => set({ derniereInteraction: e.target.value })
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 227,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 225,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Date de la prochaine action" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 234,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
								type: "date",
								value: draft.dateProchaineAction,
								onChange: (e) => set({ dateProchaineAction: e.target.value })
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 235,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 233,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-2 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Prochaine action" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 242,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
								value: draft.prochaineAction,
								onChange: (e) => set({ prochaineAction: e.target.value }),
								placeholder: "Relancer par email, envoyer un remerciement…"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 243,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 241,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-2 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Notes" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 250,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
								rows: 4,
								value: draft.notes,
								onChange: (e) => set({ notes: e.target.value })
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 251,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 249,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 140,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
					value: "historique",
					className: "mt-4 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => set({ historique: [nouvelEchange(), ...draft.historique] }),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 267,
								columnNumber: 13
							}, this), " Ajouter un échange"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 260,
							columnNumber: 11
						}, this),
						draft.historique.length === 0 && /* @__PURE__ */ (void 0)("p", {
							className: "text-sm text-muted-foreground",
							children: "Aucun échange enregistré pour l'instant."
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 271,
							columnNumber: 13
						}, this),
						draft.historique.map((e, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-3 rounded-xl border border-border/60 p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-3 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
											type: "date",
											value: e.date,
											onChange: (ev) => {
												const h = [...draft.historique];
												h[i] = {
													...e,
													date: ev.target.value
												};
												set({ historique: h });
											}
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 282,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
											value: e.canal,
											onValueChange: (v) => {
												const h = [...draft.historique];
												h[i] = {
													...e,
													canal: v
												};
												set({ historique: h });
											},
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 300,
												columnNumber: 21
											}, this) }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 299,
												columnNumber: 19
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: CANAUX.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: c,
												children: c
											}, c, false, {
												fileName: _jsxFileName$1,
												lineNumber: 304,
												columnNumber: 23
											}, this)) }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 302,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 291,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
											value: e.sens,
											onValueChange: (v) => {
												const h = [...draft.historique];
												h[i] = {
													...e,
													sens: v
												};
												set({ historique: h });
											},
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 319,
												columnNumber: 21
											}, this) }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 318,
												columnNumber: 19
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: "Envoyé",
												children: "Envoyé"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 322,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: "Reçu",
												children: "Reçu"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 323,
												columnNumber: 21
											}, this)] }, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 321,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 310,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 281,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
									rows: 2,
									placeholder: "Résumé de l'échange",
									value: e.resume,
									onChange: (ev) => {
										const h = [...draft.historique];
										h[i] = {
											...e,
											resume: ev.target.value
										};
										set({ historique: h });
									}
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 327,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "ghost",
									size: "sm",
									className: "justify-self-end text-destructive",
									onClick: () => set({ historique: draft.historique.filter((x) => x.id !== e.id) }),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 347,
										columnNumber: 17
									}, this), " Supprimer"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 337,
									columnNumber: 15
								}, this)
							]
						}, e.id, true, {
							fileName: _jsxFileName$1,
							lineNumber: 277,
							columnNumber: 13
						}, this))
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 259,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
					value: "relance",
					className: "mt-4 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Type de message" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 355,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
								value: typeRelance,
								onValueChange: (v) => setTypeRelance(v),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 361,
									columnNumber: 17
								}, this) }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 360,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: TYPES_RELANCE.map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: t,
									children: LIBELLES_RELANCE[t]
								}, t, false, {
									fileName: _jsxFileName$1,
									lineNumber: 365,
									columnNumber: 19
								}, this)) }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 363,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 356,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 354,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Consigne complémentaire (facultatif)" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 373,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
								rows: 2,
								value: consigne,
								onChange: (e) => setConsigne(e.target.value),
								placeholder: "Ex : mentionner ma disponibilité à partir de janvier."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 374,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 372,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "L'IA s'appuie uniquement sur votre profil, la candidature associée et l'historique enregistré. Elle n'invente aucune information."
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 381,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							onClick: () => void generer(),
							disabled: chargement || !draft.nom,
							children: chargement ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 391,
								columnNumber: 17
							}, this), " Rédaction…"] }, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 390,
								columnNumber: 15
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 395,
								columnNumber: 17
							}, this), " Relancer avec l'IA"] }, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 394,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 385,
							columnNumber: 11
						}, this),
						erreur && /* @__PURE__ */ (void 0)("p", {
							className: "rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive",
							children: erreur
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 401,
							columnNumber: 13
						}, this),
						resultat && /* @__PURE__ */ (void 0)("div", {
							className: "space-y-3 rounded-xl border border-border/60 bg-card/40 p-3",
							children: [
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("p", {
									className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
									children: "Objet"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 409,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "font-medium",
									children: resultat.objet
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 412,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 408,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)(Textarea, {
									rows: 12,
									value: resultat.message,
									onChange: (e) => setResultat({
										...resultat,
										message: e.target.value
									})
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 414,
									columnNumber: 15
								}, this),
								resultat.conseils.length > 0 && /* @__PURE__ */ (void 0)("ul", {
									className: "list-disc space-y-1 pl-5 text-sm text-muted-foreground",
									children: resultat.conseils.map((c) => /* @__PURE__ */ (void 0)("li", { children: c }, c, false, {
										fileName: _jsxFileName$1,
										lineNumber: 424,
										columnNumber: 21
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 422,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (void 0)(Button, {
											variant: "outline",
											size: "sm",
											onClick: () => void copier(`${resultat.objet}\n\n${resultat.message}`),
											children: [/* @__PURE__ */ (void 0)(Copy, { className: "size-4" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 436,
												columnNumber: 19
											}, this), " Copier"]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 429,
											columnNumber: 17
										}, this),
										draft.email && /* @__PURE__ */ (void 0)(Button, {
											variant: "outline",
											size: "sm",
											asChild: true,
											children: /* @__PURE__ */ (void 0)("a", {
												href: `mailto:${draft.email}?subject=${encodeURIComponent(resultat.objet)}&body=${encodeURIComponent(resultat.message)}`,
												children: "Ouvrir dans l'email"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 440,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 439,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)(Button, {
											variant: "ghost",
											size: "sm",
											onClick: () => set({ historique: [{
												...nouvelEchange(),
												resume: `${LIBELLES_RELANCE[typeRelance]} — ${resultat.objet}`
											}, ...draft.historique] }),
											children: [/* @__PURE__ */ (void 0)(Plus, { className: "size-4" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 464,
												columnNumber: 19
											}, this), " Ajouter à l'historique"]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 449,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 428,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 407,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 353,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 127,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 102,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/contacts.tsx?tsr-split=component";
function ContactsPage() {
	const { session, user, loading } = useSession();
	const isCloudUser = Boolean(session?.user?.id);
	const profil = useProfil(user);
	const [contacts, setContacts] = (0, import_react.useState)([]);
	const [candidatures, setCandidatures] = (0, import_react.useState)([]);
	const [chargement, setChargement] = (0, import_react.useState)(false);
	const [recherche, setRecherche] = (0, import_react.useState)("");
	const [filtreType, setFiltreType] = (0, import_react.useState)("tous");
	const [ouvert, setOuvert] = (0, import_react.useState)(false);
	const [courant, setCourant] = (0, import_react.useState)(() => emptyContact());
	(0, import_react.useEffect)(() => {
		if (!isCloudUser) {
			setContacts(loadContactsLocal());
			return;
		}
		let annule = false;
		setChargement(true);
		Promise.all([fetchContacts(), fetchCandidatures()]).then(([cs, cands]) => {
			if (annule) return;
			setContacts(cs);
			setCandidatures(cands);
		}).catch(() => {
			if (!annule) setContacts(loadContactsLocal());
		}).finally(() => {
			if (!annule) setChargement(false);
		});
		return () => {
			annule = true;
		};
	}, [isCloudUser]);
	const liste = (0, import_react.useMemo)(() => {
		const q = recherche.trim().toLowerCase();
		return contacts.filter((c) => {
			const okType = filtreType === "tous" || c.type === filtreType;
			const okQ = !q || [
				c.nom,
				c.entreprise,
				c.poste,
				c.email
			].some((v) => v.toLowerCase().includes(q));
			return okType && okQ;
		});
	}, [
		contacts,
		recherche,
		filtreType
	]);
	const ouvrir = (c) => {
		setCourant(c);
		setOuvert(true);
	};
	const sauver = async (c) => {
		setContacts((prev) => {
			const next = prev.some((x) => x.id === c.id) ? prev.map((x) => x.id === c.id ? c : x) : [c, ...prev];
			if (!isCloudUser) saveContactsLocal(next);
			return next;
		});
		setOuvert(false);
		toast.success("Contact enregistré");
		if (isCloudUser && session?.user?.id) try {
			await upsertContact(c, session.user.id);
		} catch {}
	};
	const supprimer = async (c) => {
		setContacts((prev) => {
			const next = prev.filter((x) => x.id !== c.id);
			if (!isCloudUser) saveContactsLocal(next);
			return next;
		});
		setOuvert(false);
		toast.success("Contact supprimé");
		if (isCloudUser) try {
			await deleteContact(c.id);
		} catch {}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		eyebrow: "Réseau",
		title: "Contacts",
		subtitle: "Recruteurs, RH, managers, anciens élèves et rencontres d'entretien",
		actions: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			onClick: () => ouvrir(emptyContact()),
			className: "gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-4" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 95,
				columnNumber: 11
			}, this), " Nouveau contact"]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 94,
			columnNumber: 141
		}, this),
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-5 flex flex-col gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 99,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
						value: recherche,
						onChange: (e) => setRecherche(e.target.value),
						placeholder: "Rechercher un nom, une entreprise…",
						className: "pl-9"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 100,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 98,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
					value: filtreType,
					onValueChange: setFiltreType,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
						className: "sm:w-60",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "Type" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 104,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 103,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
						value: "tous",
						children: "Tous les types"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 107,
						columnNumber: 13
					}, this), TYPES_CONTACT.map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
						value: t,
						children: t
					}, t, false, {
						fileName: _jsxFileName,
						lineNumber: 108,
						columnNumber: 37
					}, this))] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 106,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 102,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 97,
				columnNumber: 7
			}, this),
			!user && !loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "rounded-xl border border-border/60 bg-card/60 p-6 text-sm text-muted-foreground",
				children: "Connectez-vous pour créer et synchroniser votre carnet de contacts."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 115,
				columnNumber: 28
			}, this) : chargement ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2 p-6 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 118,
					columnNumber: 11
				}, this), " Chargement des contacts…"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 117,
				columnNumber: 29
			}, this) : liste.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "rounded-xl border border-border/60 bg-card/60 p-6 text-sm text-muted-foreground",
				children: "Aucun contact pour l'instant. Ajoutez votre premier recruteur ou ancien élève."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 119,
				columnNumber: 39
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
				children: liste.map((c, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => ouvrir(c),
					style: { animationDelay: `${Math.min(i, 8) * 50}ms` },
					className: "pop-in rounded-2xl border border-border/60 bg-card/70 p-4 text-left backdrop-blur-xl transition-colors hover:border-primary/50",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-start gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserRound, { className: "size-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 128,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 127,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "truncate font-semibold",
									children: c.nom || "Sans nom"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 131,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "truncate text-sm text-muted-foreground",
									children: [c.poste, c.entreprise].filter(Boolean).join(" · ") || "—"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 134,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 130,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "shrink-0 rounded-full border border-border/60 px-2 py-0.5 text-[11px] text-muted-foreground",
								children: c.type
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 138,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 126,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-3 space-y-1 text-xs text-muted-foreground",
						children: [
							c.email && /* @__PURE__ */ (void 0)("p", {
								className: "flex items-center gap-1.5 truncate",
								children: [
									/* @__PURE__ */ (void 0)(Mail, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 144,
										columnNumber: 21
									}, this),
									" ",
									c.email
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 143,
								columnNumber: 29
							}, this),
							c.telephone && /* @__PURE__ */ (void 0)("p", {
								className: "flex items-center gap-1.5 truncate",
								children: [
									/* @__PURE__ */ (void 0)(Phone, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 147,
										columnNumber: 21
									}, this),
									" ",
									c.telephone
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 146,
								columnNumber: 33
							}, this),
							c.prochaineAction && /* @__PURE__ */ (void 0)("p", {
								className: "truncate text-primary",
								children: [
									"Prochaine action : ",
									c.prochaineAction,
									c.dateProchaineAction ? ` (${c.dateProchaineAction})` : ""
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 149,
								columnNumber: 39
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 142,
						columnNumber: 15
					}, this)]
				}, c.id, true, {
					fileName: _jsxFileName,
					lineNumber: 123,
					columnNumber: 32
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 122,
				columnNumber: 16
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ContactSheet, {
				open: ouvert,
				onOpenChange: setOuvert,
				contact: courant,
				candidatures,
				profil,
				onSave: (c) => void sauver(c),
				onDelete: (c) => void supprimer(c)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 157,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 94,
		columnNumber: 10
	}, this);
}
//#endregion
export { ContactsPage as component };

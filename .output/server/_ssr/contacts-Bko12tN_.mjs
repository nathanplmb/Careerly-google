import { a as __toESM } from "../_runtime.mjs";
import { f as object, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { L as Mail, V as LoaderCircle, _t as Copy, j as Phone, k as Plus, p as Trash2, s as UserRound, v as Sparkles, w as Search } from "../_libs/lucide-react.mjs";
import { A as saveContactsLocal, C as TYPES_CONTACT, D as historiqueEnTexte, E as emptyContact, O as loadContactsLocal, S as LIBELLES_RELANCE, T as contactEnTexte, d as Textarea, dt as Button, f as Label, k as nouvelEchange, p as Input$1, w as TYPES_RELANCE, x as CANAUX } from "./router-arR9ITmX.mjs";
import { t as AppShell } from "./AppShell-BYQcXmkR.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BYfOmXtJ.mjs";
import { r as createServerFn } from "./server-p5qu-I7z.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-aShfmQCg.mjs";
import { t as createSsrRpc } from "./profil-cloud-CHHpOSQX.mjs";
import { t as useProfil } from "./useProfil-CxU2OF5C.mjs";
import { t as useSession } from "./useSession-CT0M_nfQ.mjs";
import { n as fetchCandidatures } from "./candidatures-cloud-CLgqXoSJ.mjs";
import { c as texteErreurIA, o as offreEnTexte, s as profilEnTexte } from "./match-run-DMUqzz67.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DUy71i1r.mjs";
import { t as CenterModal } from "./modal-C7jbwJ_G.mjs";
import { n as fetchContacts, r as upsertContact, t as deleteContact } from "./contacts-cloud-B_21x6Ey.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contacts-Bko12tN_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = object({
	typeRelance: string().min(1),
	contact: string().min(1),
	profil: string().default(""),
	offre: string().default(""),
	historique: string().default(""),
	consigne: string().default("")
});
var genererRelance = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => Input.parse(data)).handler(createSsrRpc("083602d0b411f735d2eebc83b88e78ffbf195fe1ecbd8d102e008b00ba40a90e"));
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CenterModal, {
		open,
		onOpenChange,
		title: draft.nom || "Nouveau contact",
		description: [draft.poste, draft.entreprise].filter(Boolean).join(" — ") || "Ajoutez les informations du contact.",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-2",
			children: [onDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "ghost",
				className: "text-destructive",
				onClick: () => onDelete(draft),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), " Supprimer"]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => onSave(draft),
				children: "Enregistrer"
			})]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "infos",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "infos",
							className: "flex-1",
							children: "Fiche"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "historique",
							className: "flex-1",
							children: "Historique"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "relance",
							className: "flex-1",
							children: "Relance IA"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "infos",
					className: "mt-4 grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nom" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: draft.nom,
								onChange: (e) => set({ nom: e.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Type de contact" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: draft.type,
								onValueChange: (v) => set({ type: v }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: TYPES_CONTACT.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: t,
									children: t
								}, t)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Entreprise" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: draft.entreprise,
								onChange: (e) => set({ entreprise: e.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Poste" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: draft.poste,
								onChange: (e) => set({ poste: e.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								type: "email",
								value: draft.email,
								onChange: (e) => set({ email: e.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Téléphone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: draft.telephone,
								onChange: (e) => set({ telephone: e.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "LinkedIn" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: draft.linkedin,
								onChange: (e) => set({ linkedin: e.target.value }),
								placeholder: "https://www.linkedin.com/in/…"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Candidature associée" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: draft.candidatureId || "aucune",
								onValueChange: (v) => set({ candidatureId: v === "aucune" ? "" : v }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Aucune" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "aucune",
									children: "Aucune"
								}), candidatures.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
									value: c.id,
									children: [
										c.entreprise || "Sans nom",
										" —",
										" ",
										c.poste || "poste non précisé"
									]
								}, c.id))] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Dernière interaction" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								type: "date",
								value: draft.derniereInteraction,
								onChange: (e) => set({ derniereInteraction: e.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Date de la prochaine action" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								type: "date",
								value: draft.dateProchaineAction,
								onChange: (e) => set({ dateProchaineAction: e.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Prochaine action" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: draft.prochaineAction,
								onChange: (e) => set({ prochaineAction: e.target.value }),
								placeholder: "Relancer par email, envoyer un remerciement…"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Notes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 4,
								value: draft.notes,
								onChange: (e) => set({ notes: e.target.value })
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "historique",
					className: "mt-4 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => set({ historique: [nouvelEchange(), ...draft.historique] }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Ajouter un échange"]
						}),
						draft.historique.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Aucun échange enregistré pour l'instant."
						}),
						draft.historique.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 rounded-xl border border-border/60 p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
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
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: e.canal,
											onValueChange: (v) => {
												const h = [...draft.historique];
												h[i] = {
													...e,
													canal: v
												};
												set({ historique: h });
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: CANAUX.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: c,
												children: c
											}, c)) })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: e.sens,
											onValueChange: (v) => {
												const h = [...draft.historique];
												h[i] = {
													...e,
													sens: v
												};
												set({ historique: h });
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "Envoyé",
												children: "Envoyé"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "Reçu",
												children: "Reçu"
											})] })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
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
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									size: "sm",
									className: "justify-self-end text-destructive",
									onClick: () => set({ historique: draft.historique.filter((x) => x.id !== e.id) }),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), " Supprimer"]
								})
							]
						}, e.id))
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "relance",
					className: "mt-4 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Type de message" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: typeRelance,
								onValueChange: (v) => setTypeRelance(v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: TYPES_RELANCE.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: t,
									children: LIBELLES_RELANCE[t]
								}, t)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Consigne complémentaire (facultatif)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 2,
								value: consigne,
								onChange: (e) => setConsigne(e.target.value),
								placeholder: "Ex : mentionner ma disponibilité à partir de janvier."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "L'IA s'appuie uniquement sur votre profil, la candidature associée et l'historique enregistré. Elle n'invente aucune information."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => void generer(),
							disabled: chargement || !draft.nom,
							children: chargement ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), " Rédaction…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), " Relancer avec l'IA"] })
						}),
						erreur && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive",
							children: erreur
						}),
						resultat && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 rounded-xl border border-border/60 bg-card/40 p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
									children: "Objet"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: resultat.objet
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 12,
									value: resultat.message,
									onChange: (e) => setResultat({
										...resultat,
										message: e.target.value
									})
								}),
								resultat.conseils.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "list-disc space-y-1 pl-5 text-sm text-muted-foreground",
									children: resultat.conseils.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: c }, c))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											size: "sm",
											onClick: () => void copier(`${resultat.objet}\n\n${resultat.message}`),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), " Copier"]
										}),
										draft.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											size: "sm",
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: `mailto:${draft.email}?subject=${encodeURIComponent(resultat.objet)}&body=${encodeURIComponent(resultat.message)}`,
												children: "Ouvrir dans l'email"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "ghost",
											size: "sm",
											onClick: () => set({ historique: [{
												...nouvelEchange(),
												resume: `${LIBELLES_RELANCE[typeRelance]} — ${resultat.objet}`
											}, ...draft.historique] }),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Ajouter à l'historique"]
										})
									]
								})
							]
						})
					]
				})
			]
		})
	});
}
function ContactsPage() {
	const { session, user, loading } = useSession();
	const isCloudUser = Boolean(session?.user?.id);
	const profil = useProfil(user);
	const [contacts, setContacts] = (0, import_react.useState)(() => loadContactsLocal());
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		eyebrow: "Réseau",
		title: "Contacts",
		subtitle: "Recruteurs, RH, managers, anciens élèves et rencontres d'entretien",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: () => ouvrir(emptyContact()),
			className: "gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Nouveau contact"]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 flex flex-col gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						value: recherche,
						onChange: (e) => setRecherche(e.target.value),
						placeholder: "Rechercher un nom, une entreprise…",
						className: "pl-9"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: filtreType,
					onValueChange: setFiltreType,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "sm:w-60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Type" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "tous",
						children: "Tous les types"
					}), TYPES_CONTACT.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: t,
						children: t
					}, t))] })]
				})]
			}),
			!user && !loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl border border-border/60 bg-card/60 p-6 text-sm text-muted-foreground",
				children: "Connectez-vous pour créer et synchroniser votre carnet de contacts."
			}) : chargement ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 p-6 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), " Chargement des contacts…"]
			}) : liste.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl border border-border/60 bg-card/60 p-6 text-sm text-muted-foreground",
				children: "Aucun contact pour l'instant. Ajoutez votre premier recruteur ou ancien élève."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
				children: liste.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => ouvrir(c),
					style: { animationDelay: `${Math.min(i, 8) * 50}ms` },
					className: "pop-in rounded-2xl border border-border/60 bg-card/70 p-4 text-left backdrop-blur-xl transition-colors hover:border-primary/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-semibold",
									children: c.nom || "Sans nom"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm text-muted-foreground",
									children: [c.poste, c.entreprise].filter(Boolean).join(" · ") || "—"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 rounded-full border border-border/60 px-2 py-0.5 text-[11px] text-muted-foreground",
								children: c.type
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 space-y-1 text-xs text-muted-foreground",
						children: [
							c.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-1.5 truncate",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3.5" }),
									" ",
									c.email
								]
							}),
							c.telephone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-1.5 truncate",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3.5" }),
									" ",
									c.telephone
								]
							}),
							c.prochaineAction && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-primary",
								children: [
									"Prochaine action : ",
									c.prochaineAction,
									c.dateProchaineAction ? ` (${c.dateProchaineAction})` : ""
								]
							})
						]
					})]
				}, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactSheet, {
				open: ouvert,
				onOpenChange: setOuvert,
				contact: courant,
				candidatures,
				profil,
				onSave: (c) => void sauver(c),
				onDelete: (c) => void supprimer(c)
			})
		]
	});
}
//#endregion
export { ContactsPage as component };

import { a as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as supabase } from "./client-DnkKuJ6q.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { O as RefreshCw, R as LogOut, V as LoaderCircle, _t as Copy, b as ShieldCheck, et as Globe, mt as Download, p as Trash2, s as UserRound, z as LogIn } from "../_libs/lucide-react.mjs";
import { b as genererCodeTransfert, d as Textarea, dt as Button, ut as setCompteActif, y as appliquerCodeTransfert } from "./router-arR9ITmX.mjs";
import { t as AppShell } from "./AppShell-BYQcXmkR.mjs";
import { t as UsageIaCard } from "./UsageIaCard-DS_grngF.mjs";
import { t as useProfil } from "./useProfil-CxU2OF5C.mjs";
import { t as useCandidatures } from "./useCandidatures-CEqfC4kv.mjs";
import { n as fetchContacts } from "./contacts-cloud-B_21x6Ey.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parametres-B1Aq-VXx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Carte({ titre, description, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "glass-card pop-in p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold",
				children: titre
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children
			})
		]
	});
}
function telecharger(nom, contenu, type) {
	const url = URL.createObjectURL(new Blob([contenu], { type }));
	const a = document.createElement("a");
	a.href = url;
	a.download = nom;
	a.click();
	URL.revokeObjectURL(url);
}
function csv(rows) {
	if (!rows.length) return "";
	const cols = Object.keys(rows[0]);
	const esc = (v) => `"${String(v ?? "").replace(/"/g, "\"\"")}"`;
	return [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
}
function ParametresPage() {
	const { user, authLoading, items } = useCandidatures();
	const profil = useProfil(user);
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [syncCode, setSyncCode] = (0, import_react.useState)("");
	const [importCode, setImportCode] = (0, import_react.useState)("");
	const handleGenerateSyncCode = () => {
		const code = genererCodeTransfert();
		setSyncCode(code);
		toast.success("Code de transfert généré !");
	};
	const handleCopyCode = async () => {
		if (!syncCode) return;
		try {
			await navigator.clipboard.writeText(syncCode);
			toast.success("Code copié dans le presse-papiers !");
		} catch {
			toast.info("Copiez manuellement le code affiché.");
		}
	};
	const handleApplyCode = async () => {
		if (!importCode.trim()) {
			toast.error("Veuillez coller un code de synchronisation valide.");
			return;
		}
		const res = appliquerCodeTransfert(importCode);
		if (res.success) {
			toast.success(`Synchronisation réussie ! ${res.candidaturesCount} candidatures et ${res.contactsCount} contacts importés.`);
			await queryClient.invalidateQueries();
			setTimeout(() => {
				window.location.reload();
			}, 500);
		} else toast.error(res.message);
	};
	const signOut = async () => {
		await queryClient.cancelQueries();
		queryClient.clear();
		setCompteActif(null);
		try {
			await supabase.auth.signOut();
		} catch {}
		toast.success("Déconnexion réussie");
		navigate({
			to: "/auth",
			replace: true
		});
	};
	const exportJson = async () => {
		setBusy(true);
		try {
			const contacts = user ? await fetchContacts().catch(() => []) : [];
			telecharger(`careerly-export-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`, JSON.stringify({
				profil,
				candidatures: items,
				contacts
			}, null, 2), "application/json");
			toast.success("Export téléchargé.");
		} finally {
			setBusy(false);
		}
	};
	const exportCsv = () => {
		const rows = items.map((c) => ({
			entreprise: c.entreprise,
			poste: c.poste,
			lieu: c.lieu,
			statut: c.statut,
			dateEnvoi: c.dateEnvoi,
			dateRelance: c.dateRelance,
			dateLimite: c.dateLimite,
			source: c.source,
			secteur: c.secteur,
			priorite: c.priorite,
			match: c.match?.global ?? ""
		}));
		if (!rows.length) {
			toast.info("Aucune candidature à exporter.");
			return;
		}
		telecharger(`careerly-candidatures-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`, csv(rows), "text/csv;charset=utf-8");
	};
	const viderLocal = () => {
		if (!confirm("Effacer les données enregistrées sur cet appareil ?")) return;
		Object.keys(localStorage).filter((k) => k.startsWith("careerly.") || k.startsWith("suivit-stage")).forEach((k) => localStorage.removeItem(k));
		toast.success("Données locales effacées. Rechargez la page.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		eyebrow: "Compte",
		title: "Paramètres",
		subtitle: "Compte, données et confidentialité",
		actions: authLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin opacity-70" }) : null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Carte, {
					titre: "Compte",
					description: user ? `Connecté en tant que ${user.email ?? "utilisateur"}. Vos données sont synchronisées entre vos appareils.` : "Vous n'êtes pas connecté : vos données restent sur cet appareil uniquement.",
					children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/profil",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, {}), " Mon profil"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: () => void signOut(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {}), " Se déconnecter"]
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/auth",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, {}), " Se connecter"]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Carte, {
					titre: "Synchronisation & Transfert (Preview ⇄ Vercel)",
					description: "Transférez l'intégralité de vos candidatures, contacts et profil entre la Preview Google AI Studio et votre déploiement Vercel en 1 clic sans aucune configuration serveur.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border/70 bg-muted/20 p-3 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold",
									children: "1. Exporter vos données de cet appareil"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "secondary",
										onClick: handleGenerateSyncCode,
										className: "h-7 text-xs gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3" }), " Générer le code"]
									}), syncCode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										onClick: handleCopyCode,
										className: "h-7 text-xs gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3" }), " Copier"]
									})]
								})]
							}), syncCode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								readOnly: true,
								rows: 2,
								value: syncCode,
								className: "font-mono text-[10px] resize-none bg-background/50 select-all",
								onClick: (e) => e.target.select()
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border/70 bg-muted/20 p-3 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold",
									children: "2. Importer et écraser/mettre à jour avec un code de transfert"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 2,
									placeholder: "Collez le code CAREERLY_SYNC_... généré depuis votre autre environnement",
									value: importCode,
									onChange: (e) => setImportCode(e.target.value),
									className: "font-mono text-xs resize-none"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									onClick: handleApplyCode,
									className: "w-full gap-2 mt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-3.5" }), " Appliquer la synchronisation immédiatement"]
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageIaCard, { connecte: !!user }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Carte, {
					titre: "Exporter mes données",
					description: "Téléchargez une copie complète de vos candidatures, contacts et profil.",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: () => void exportJson(),
						disabled: busy,
						children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), " Export JSON"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: exportCsv,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), " Candidatures CSV"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Carte, {
					titre: "Confidentialité",
					description: "Les analyses IA utilisent uniquement les informations que vous saisissez (profil, offres, contacts). Aucune donnée n'est partagée avec des tiers en dehors du traitement de la demande.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/assistant/connect",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), " Connexions IA"]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Carte, {
					titre: "Données de cet appareil",
					description: "Efface la copie locale (profil, candidatures hors ligne, lettres). Vos données cloud restent intactes si vous êtes connecté.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "destructive",
						onClick: viderLocal,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), " Effacer les données locales"]
					})
				})
			]
		})
	});
}
//#endregion
export { ParametresPage as component };

import { o as __toESM } from "../_runtime.mjs";
import { n as supabase } from "./client-6jjz1ame.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-DDzEUEFj.mjs";
import { D as RefreshCw, R as LogOut, V as LoaderCircle, et as Globe, gt as Download, p as Trash2, s as UserRound, y as ShieldCheck, yt as Copy, z as LogIn } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-JIGp6MTc.mjs";
import { w as setCompteActif } from "./auth-local-B6tKCByM.mjs";
import { t as Textarea } from "./textarea-CNcwtOlr.mjs";
import { t as UsageIaCard } from "./UsageIaCard-CNbjvq1U.mjs";
import { t as useProfil } from "./useProfil-Vc3u7mk3.mjs";
import { t as useCandidatures } from "./useCandidatures-Cqc_s9SU.mjs";
import { n as genererCodeTransfert, t as appliquerCodeTransfert } from "./sync-transfert-n7GINxr4.mjs";
import { n as fetchContacts } from "./contacts-cloud--x0UJSDd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parametres-BnTft-3w.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/parametres.tsx?tsr-split=component";
function Carte({ titre, description, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "glass-card pop-in p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "text-sm font-semibold",
				children: titre
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 26,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: description
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 27,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 28,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 25,
		columnNumber: 10
	}, this);
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		eyebrow: "Compte",
		title: "Paramètres",
		subtitle: "Compte, données et confidentialité",
		actions: authLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-5 animate-spin opacity-70" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 143,
			columnNumber: 125
		}, this) : null,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Carte, {
					titre: "Compte",
					description: user ? `Connecté en tant que ${user.email ?? "utilisateur"}. Vos données sont synchronisées entre vos appareils.` : "Vous n'êtes pas connecté : vos données restent sur cet appareil uniquement.",
					children: user ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "secondary",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/profil",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserRound, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 149,
								columnNumber: 19
							}, this), " Mon profil"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 148,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 147,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						onClick: () => void signOut(),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 153,
							columnNumber: 17
						}, this), " Se déconnecter"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 152,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 146,
						columnNumber: 19
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/auth",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogIn, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 157,
								columnNumber: 17
							}, this), " Se connecter"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 156,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 155,
						columnNumber: 19
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 145,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Carte, {
					titre: "Synchronisation & Transfert (Preview ⇄ Vercel)",
					description: "Transférez l'intégralité de vos candidatures, contacts et profil entre la Preview Google AI Studio et votre déploiement Vercel en 1 clic sans aucune configuration serveur.",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "w-full space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-lg border border-border/70 bg-muted/20 p-3 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-semibold",
									children: "1. Exporter vos données de cet appareil"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 166,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										size: "sm",
										variant: "secondary",
										onClick: handleGenerateSyncCode,
										className: "h-7 text-xs gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "size-3" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 171,
											columnNumber: 21
										}, this), " Générer le code"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 170,
										columnNumber: 19
									}, this), syncCode && /* @__PURE__ */ (void 0)(Button, {
										size: "sm",
										variant: "outline",
										onClick: handleCopyCode,
										className: "h-7 text-xs gap-1.5",
										children: [/* @__PURE__ */ (void 0)(Copy, { className: "size-3" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 174,
											columnNumber: 23
										}, this), " Copier"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 173,
										columnNumber: 32
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 169,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 165,
								columnNumber: 15
							}, this), syncCode && /* @__PURE__ */ (void 0)(Textarea, {
								readOnly: true,
								rows: 2,
								value: syncCode,
								className: "font-mono text-[10px] resize-none bg-background/50 select-all",
								onClick: (e) => e.target.select()
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 178,
								columnNumber: 28
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 164,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-lg border border-border/70 bg-muted/20 p-3 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-semibold",
									children: "2. Importer et écraser/mettre à jour avec un code de transfert"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 182,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
									rows: 2,
									placeholder: "Collez le code CAREERLY_SYNC_... généré depuis votre autre environnement",
									value: importCode,
									onChange: (e) => setImportCode(e.target.value),
									className: "font-mono text-xs resize-none"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 185,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									size: "sm",
									onClick: handleApplyCode,
									className: "w-full gap-2 mt-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Globe, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 187,
										columnNumber: 17
									}, this), " Appliquer la synchronisation immédiatement"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 186,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 181,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 163,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 162,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UsageIaCard, { connecte: !!user }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 194,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Carte, {
					titre: "Exporter mes données",
					description: "Téléchargez une copie complète de vos candidatures, contacts et profil.",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "secondary",
						onClick: () => void exportJson(),
						disabled: busy,
						children: [busy ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "animate-spin" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 198,
							columnNumber: 21
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 198,
							columnNumber: 60
						}, this), " Export JSON"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 197,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "secondary",
						onClick: exportCsv,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 202,
							columnNumber: 13
						}, this), " Candidatures CSV"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 201,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 196,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Carte, {
					titre: "Confidentialité",
					description: "Les analyses IA utilisent uniquement les informations que vous saisissez (profil, offres, contacts). Aucune donnée n'est partagée avec des tiers en dehors du traitement de la demande.",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "secondary",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/assistant/connect",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 209,
								columnNumber: 15
							}, this), " Connexions IA"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 208,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 207,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 206,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Carte, {
					titre: "Données de cet appareil",
					description: "Efface la copie locale (profil, candidatures hors ligne, lettres). Vos données cloud restent intactes si vous êtes connecté.",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "destructive",
						onClick: viderLocal,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 216,
							columnNumber: 13
						}, this), " Effacer les données locales"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 215,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 214,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 144,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 143,
		columnNumber: 10
	}, this);
}
//#endregion
export { ParametresPage as component };

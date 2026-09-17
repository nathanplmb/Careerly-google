import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as supabase } from "./client-6jjz1ame.mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as LogOut, D as RefreshCw, U as LoaderCircle, V as LogIn, c as UserRound, f as TriangleAlert, it as Globe, m as Trash2, s as UserX, vt as Download, x as ShieldAlert, xt as Copy } from "../_libs/lucide-react.mjs";
import "../_libs/firebase.mjs";
import { f as signOut } from "../_libs/firebase__auth.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-GF5R-Jcs.mjs";
import { a as fetchContacts, f as useProfil, l as useCandidatures } from "./router-Chlelb_S.mjs";
import { r as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { C as isFirebaseConfigured, F as setCompteActif, G as Button, W as Input, i as Textarea, l as AppShell, m as auth } from "./router-Chlelb_S2.mjs";
import { t as deleteMyAccountSelf } from "./admin-client-DqffCexl.mjs";
import { n as genererCodeTransfert, t as appliquerCodeTransfert } from "./sync-transfert-BMutfFd1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parametres-YzyM1Dw9.js
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
				lineNumber: 30,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: description
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 31,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 32,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 29,
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
	const [showDeleteModal, setShowDeleteModal] = (0, import_react.useState)(false);
	const [deleteConfirmText, setDeleteConfirmText] = (0, import_react.useState)("");
	const [deletingAccount, setDeletingAccount] = (0, import_react.useState)(false);
	const handleSelfDeleteAccount = async () => {
		if (deleteConfirmText.trim().toUpperCase() !== "SUPPRIMER") {
			toast.error("Veuillez saisir 'SUPPRIMER' pour confirmer l'irréversibilité.");
			return;
		}
		try {
			setDeletingAccount(true);
			const res = await deleteMyAccountSelf();
			toast.success(res.message || "Compte supprimé avec succès.");
			queryClient.clear();
			setShowDeleteModal(false);
			navigate({ to: "/auth" });
		} catch (err) {
			console.error("Erreur suppression compte:", err);
			const msg = err instanceof Error ? err.message : String(err);
			toast.error(`Impossible de supprimer le compte: ${msg}`);
		} finally {
			setDeletingAccount(false);
		}
	};
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
	const signOut$1 = async () => {
		await queryClient.cancelQueries();
		queryClient.clear();
		setCompteActif(null);
		if (typeof window !== "undefined") try {
			window.localStorage.removeItem("neoma-profil-v1");
			window.localStorage.removeItem("careerly_candidatures_v1");
			window.localStorage.removeItem("careerly_contacts_v1");
			window.localStorage.removeItem("careerly_entreprises_v1");
		} catch (err) {
			console.warn("Erreur purge cache:", err);
		}
		if (isFirebaseConfigured()) try {
			await signOut(auth);
		} catch (err) {
			console.warn("Erreur signOut Firebase:", err);
		}
		try {
			await supabase.auth.signOut();
		} catch (err) {
			console.warn("Erreur signOut Supabase:", err);
		}
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
			priorite: c.priorite
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
			lineNumber: 190,
			columnNumber: 125
		}, this) : null,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
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
								lineNumber: 196,
								columnNumber: 19
							}, this), " Mon profil"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 195,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 194,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						onClick: () => void signOut$1(),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 200,
							columnNumber: 17
						}, this), " Se déconnecter"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 199,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 193,
						columnNumber: 19
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/auth",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogIn, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 204,
								columnNumber: 17
							}, this), " Se connecter"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 203,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 202,
						columnNumber: 19
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 192,
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
									lineNumber: 213,
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
											lineNumber: 218,
											columnNumber: 21
										}, this), " Générer le code"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 217,
										columnNumber: 19
									}, this), syncCode && /* @__PURE__ */ (void 0)(Button, {
										size: "sm",
										variant: "outline",
										onClick: handleCopyCode,
										className: "h-7 text-xs gap-1.5",
										children: [/* @__PURE__ */ (void 0)(Copy, { className: "size-3" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 221,
											columnNumber: 23
										}, this), " Copier"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 220,
										columnNumber: 32
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 216,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 212,
								columnNumber: 15
							}, this), syncCode && /* @__PURE__ */ (void 0)(Textarea, {
								readOnly: true,
								rows: 2,
								value: syncCode,
								className: "font-mono text-[10px] resize-none bg-background/50 select-all",
								onClick: (e) => e.target.select()
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 225,
								columnNumber: 28
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 211,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-lg border border-border/70 bg-muted/20 p-3 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-semibold",
									children: "2. Importer et écraser/mettre à jour avec un code de transfert"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 229,
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
									lineNumber: 232,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									size: "sm",
									onClick: handleApplyCode,
									className: "w-full gap-2 mt-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Globe, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 234,
										columnNumber: 17
									}, this), " Appliquer la synchronisation immédiatement"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 233,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 228,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 210,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 209,
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
							lineNumber: 243,
							columnNumber: 21
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 243,
							columnNumber: 60
						}, this), " Export JSON"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 242,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "secondary",
						onClick: exportCsv,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 247,
							columnNumber: 13
						}, this), " Candidatures CSV"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 246,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 241,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Carte, {
					titre: "Confidentialité",
					description: "Les analyses IA utilisent uniquement les informations que vous saisissez (profil, offres, contacts). Aucune donnée n'est partagée avec des tiers en dehors du traitement de la demande.",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "secondary",
						asChild: true
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 252,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 251,
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
							lineNumber: 257,
							columnNumber: 13
						}, this), " Effacer les données locales"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 256,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 255,
					columnNumber: 9
				}, this),
				user && /* @__PURE__ */ (void 0)("section", {
					className: "rounded-xl border border-destructive/40 bg-destructive/5 p-5",
					children: /* @__PURE__ */ (void 0)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "rounded-lg bg-destructive/10 p-2 text-destructive",
							children: /* @__PURE__ */ (void 0)(ShieldAlert, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 264,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 263,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex-1 space-y-1",
							children: [
								/* @__PURE__ */ (void 0)("h2", {
									className: "text-sm font-semibold text-destructive",
									children: "Zone de danger — Suppression définitive du compte"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 267,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground leading-relaxed",
									children: "Supprimez irréversiblement votre compte Firebase Authentication, votre profil candidat, vos candidatures, contacts, entreprises, documents et fichiers stockés."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 270,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "pt-3",
									children: /* @__PURE__ */ (void 0)(Button, {
										variant: "destructive",
										size: "sm",
										className: "gap-2",
										onClick: () => {
											setDeleteConfirmText("");
											setShowDeleteModal(true);
										},
										children: [/* @__PURE__ */ (void 0)(UserX, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 280,
											columnNumber: 21
										}, this), " Supprimer définitivement mon compte"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 276,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 275,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 266,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 262,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 261,
					columnNumber: 18
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 191,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
			open: showDeleteModal,
			onOpenChange: setShowDeleteModal,
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
				className: "max-w-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/15 text-destructive mb-2",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TriangleAlert, { className: "size-6" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 294,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 293,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
							className: "text-center text-lg font-bold text-destructive",
							children: "Suppression définitive de votre compte"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 296,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
							className: "text-center text-xs text-muted-foreground",
							children: [
								"Cette action est",
								" ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-bold text-foreground",
									children: "strictement irréversible"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 301,
									columnNumber: 15
								}, this),
								"."
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 299,
							columnNumber: 13
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 292,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-3 py-2 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-lg bg-muted/40 p-3 space-y-1.5 border border-border/70",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "font-semibold text-foreground",
								children: "Les éléments suivants seront définitivement détruits :"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 310,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
								className: "list-disc list-inside space-y-0.5 text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Votre identifiant et compte de connexion Firebase Auth" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 314,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Votre dossier de candidature central et profil complet" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 315,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "L'ensemble de vos candidatures et opportunités de stage" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 316,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Votre carnet de contacts et entreprises cibles" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 317,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Vos lettres de motivation et documents générés" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 318,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Tous vos fichiers et CV hébergés sur le Cloud Storage" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 319,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Vos caches locaux sur cet appareil" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 320,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 313,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 309,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "text-xs font-medium text-foreground block",
								children: [
									"Pour confirmer la suppression, veuillez saisir le mot",
									" ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-mono font-bold text-destructive",
										children: "SUPPRIMER"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 327,
										columnNumber: 17
									}, this),
									" ",
									"ci-dessous :"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 325,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: deleteConfirmText,
								onChange: (e) => setDeleteConfirmText(e.target.value),
								placeholder: "SUPPRIMER",
								className: "font-mono text-center font-bold tracking-wider uppercase",
								autoFocus: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 332,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 324,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 308,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, {
						className: "gap-2 sm:gap-0",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setShowDeleteModal(false),
							disabled: deletingAccount,
							children: "Annuler"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 337,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "destructive",
							size: "sm",
							disabled: deleteConfirmText.trim().toUpperCase() !== "SUPPRIMER" || deletingAccount,
							onClick: handleSelfDeleteAccount,
							className: "gap-2",
							children: deletingAccount ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 342,
								columnNumber: 19
							}, this), " Suppression en cours..."] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 341,
								columnNumber: 34
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 345,
								columnNumber: 19
							}, this), " Confirmer la suppression"] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 344,
								columnNumber: 23
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 340,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 336,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 291,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 290,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 190,
		columnNumber: 10
	}, this);
}
//#endregion
export { ParametresPage as component };

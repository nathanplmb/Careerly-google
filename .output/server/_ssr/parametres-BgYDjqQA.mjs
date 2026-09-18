import { o as __toESM } from "../_runtime.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as supabase } from "./client-6jjz1ame.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as fetchContacts, Ft as setCompteActif, Ut as Button, W as auth, a as Textarea, mt as isFirebaseConfigured, p as AppShell } from "./profil-cloud-Z6f0Jbed.mjs";
import { S as useNavigate, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as signOut } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { Ct as Download, Et as Copy, H as LogIn, O as RefreshCw, V as LogOut, W as LoaderCircle, ct as Globe, p as Trash2, s as UserRound, vt as Eye, x as ShieldCheck, yt as EyeOff } from "../_libs/lucide-react.mjs";
import { r as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { i as useCandidatures, o as useProfil } from "./router-cEuEJGYQ.mjs";
import { n as genererCodeTransfert, t as appliquerCodeTransfert } from "./sync-transfert-B0rsBAb3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parametres-BgYDjqQA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/parametres.tsx?tsr-split=component";
function Carte({ titre, description, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "glass-card p-5 sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "text-sm font-bold uppercase tracking-wider text-foreground",
				children: titre
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 27,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-1 text-xs text-muted-foreground leading-relaxed font-medium",
				children: description
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 30,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 33,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 26,
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
	const [contrastActive, setContrastActive] = (0, import_react.useState)(() => {
		if (typeof window !== "undefined") return localStorage.getItem("nacora_high_contrast") === "true";
		return false;
	});
	const toggleLocalContrast = () => {
		const next = !contrastActive;
		setContrastActive(next);
		localStorage.setItem("nacora_high_contrast", String(next));
		if (next) {
			document.documentElement.classList.add("high-contrast");
			toast.success("Mode Contraste Élevé activé !");
		} else {
			document.documentElement.classList.remove("high-contrast");
			toast.success("Mode Contraste Standard activé !");
		}
		window.dispatchEvent(new Event("nacora_contrast_changed"));
		window.dispatchEvent(new Event("storage"));
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
		title: "Paramètres",
		actions: authLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-5 animate-spin opacity-70" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 184,
			columnNumber: 62
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
								lineNumber: 190,
								columnNumber: 19
							}, this), " Mon profil"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 189,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 188,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						onClick: () => void signOut$1(),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 194,
							columnNumber: 17
						}, this), " Se déconnecter"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 193,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 187,
						columnNumber: 19
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/auth",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogIn, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 198,
								columnNumber: 17
							}, this), " Se connecter"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 197,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 196,
						columnNumber: 19
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 186,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Carte, {
					titre: "Synchronisation & Transfert (Preview ⇄ Vercel)",
					description: "Transférez l'intégralité de vos candidatures, contacts et profil entre la Preview Google AI Studio et votre déploiement Vercel en 1 clic sans aucune configuration serveur.",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "w-full space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 space-y-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-semibold text-foreground",
									children: "1. Exporter vos données de cet appareil"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 207,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										size: "sm",
										variant: "secondary",
										onClick: handleGenerateSyncCode,
										className: "h-8 text-xs gap-1.5 cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "size-3" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 212,
											columnNumber: 21
										}, this), " Générer le code"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 211,
										columnNumber: 19
									}, this), syncCode && /* @__PURE__ */ (void 0)(Button, {
										size: "sm",
										variant: "outline",
										onClick: handleCopyCode,
										className: "h-8 text-xs gap-1.5 cursor-pointer",
										children: [/* @__PURE__ */ (void 0)(Copy, { className: "size-3" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 215,
											columnNumber: 23
										}, this), " Copier"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 214,
										columnNumber: 32
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 210,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 206,
								columnNumber: 15
							}, this), syncCode && /* @__PURE__ */ (void 0)(Textarea, {
								readOnly: true,
								rows: 2,
								value: syncCode,
								className: "font-mono text-[11px] resize-none bg-black/30 border border-white/10 select-all",
								onClick: (e) => e.target.select()
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 219,
								columnNumber: 28
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 205,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 space-y-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-semibold text-foreground",
									children: "2. Importer et écraser/mettre à jour avec un code de transfert"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 223,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
									rows: 2,
									placeholder: "Collez le code CAREERLY_SYNC_... généré depuis votre autre environnement",
									value: importCode,
									onChange: (e) => setImportCode(e.target.value),
									className: "font-mono text-xs resize-none bg-black/30 border border-white/10"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 226,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									size: "sm",
									onClick: handleApplyCode,
									className: "w-full gap-2 mt-1 cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Globe, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 228,
										columnNumber: 17
									}, this), " Appliquer la synchronisation immédiatement"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 227,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 222,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 204,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 203,
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
							lineNumber: 237,
							columnNumber: 21
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 237,
							columnNumber: 60
						}, this), " Export JSON"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 236,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "secondary",
						onClick: exportCsv,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 241,
							columnNumber: 13
						}, this), " Candidatures CSV"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 240,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 235,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Carte, {
					titre: "Confidentialité",
					description: "Les analyses IA utilisent uniquement les informations que vous saisissez (profil, offres, contacts). Aucune donnée n'est partagée avec des tiers en dehors du traitement de la demande.",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-[11px] font-semibold text-emerald-500 inline-flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 247,
							columnNumber: 13
						}, this), " Traitement sécurisé & conforme"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 246,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 245,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Carte, {
					titre: "Accessibilité & Contraste",
					description: "Améliorez la visibilité générale du site en renforçant le contraste, en accentuant les contours des blocs et en éliminant les textes grisés à faible lisibilité.",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: contrastActive ? "default" : "outline",
						onClick: toggleLocalContrast,
						className: "gap-2 shrink-0 cursor-pointer",
						children: contrastActive ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EyeOff, { className: "size-4 text-primary" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 254,
							columnNumber: 17
						}, this), " Désactiver le Contraste Élevé"] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 253,
							columnNumber: 31
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 257,
							columnNumber: 17
						}, this), " Activer le Contraste Élevé"] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 256,
							columnNumber: 21
						}, this)
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
							lineNumber: 264,
							columnNumber: 13
						}, this), " Effacer les données locales"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 263,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 262,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 185,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 184,
		columnNumber: 10
	}, this);
}
//#endregion
export { ParametresPage as component };

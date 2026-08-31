import { a as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-FsCbT2mZ.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { I as LogOut, L as LogIn, Y as Gauge, f as Trash2, rt as Download, s as UserRound, v as ShieldCheck, z as LoaderCircle } from "../_libs/lucide-react.mjs";
import { j as Button } from "./router-WcHZLW5p.mjs";
import { t as AppShell } from "./AppShell-CtCpxTdT.mjs";
import { r as createServerFn } from "./server-Ca2emXMH.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-WrckP5Dl.mjs";
import { t as useCandidatures } from "./useCandidatures-hl-bBqH6.mjs";
import { n as fetchContacts } from "./contacts-cloud-cYMVnP5n.mjs";
import { t as createSsrRpc } from "./createSsrRpc-CsOQ3iCQ.mjs";
import { t as useProfil } from "./useProfil-DVAoJvSn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parametres-Dy4l7MHT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var usageIaDuJour = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("378b207fa4fdee797d916e49b30889c2a21ee687fbe35cec99abc178bc8b5528"));
var LIBELLES = {
	brief: "Daily Brief",
	match: "Match IA",
	offre: "Analyse d'offre",
	cv: "Analyse de CV",
	tri: "Assistant IA",
	redaction: "Rédaction IA",
	relance: "Relance IA"
};
function Barre({ ligne }) {
	const pct = ligne.limite > 0 ? Math.min(100, ligne.utilise / ligne.limite * 100) : 0;
	const reste = Math.max(0, ligne.limite - ligne.utilise);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: LIBELLES[ligne.outil] ?? ligne.outil }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: reste === 0 ? "text-destructive" : "text-muted-foreground",
			children: [
				reste,
				" restant",
				reste > 1 ? "s" : "",
				" / ",
				ligne.limite
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1 h-1.5 overflow-hidden rounded-full bg-muted",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `h-full rounded-full ${pct >= 100 ? "bg-destructive" : "bg-primary"}`,
			style: { width: `${pct}%` }
		})
	})] });
}
function UsageIaCard({ connecte }) {
	const { data, isLoading, error } = useQuery({
		queryKey: ["usage-ia"],
		queryFn: () => usageIaDuJour(),
		enabled: connecte,
		staleTime: 6e4
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "glass-card pop-in p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "flex items-center gap-2 text-sm font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "size-4" }), " Utilisation IA du jour"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Les quotas se réinitialisent chaque jour. Ils protègent le service contre les usages abusifs."
			}),
			!connecte ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-muted-foreground",
				children: "Connectez-vous pour voir vos quotas IA."
			}) : isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mt-4 size-4 animate-spin opacity-70" }) : error || !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-muted-foreground",
				children: "Usage indisponible pour le moment."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-3",
				children: [data.lignes.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Barre, { ligne: l }, l.outil)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border/60 pt-3 text-xs text-muted-foreground",
					children: [
						"Total : ",
						data.total_utilise,
						" / ",
						data.total_limite,
						" analyses aujourd'hui · plan ",
						data.plan
					]
				})]
			})
		]
	});
}
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
	const signOut = async () => {
		await queryClient.cancelQueries();
		queryClient.clear();
		await supabase.auth.signOut();
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

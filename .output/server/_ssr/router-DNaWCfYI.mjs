import { o as __toESM } from "../_runtime.mjs";
import { a as createTanStackListToolsHandler, d as number, i as createTanStackInvokeToolHandler, n as defineMcp, o as createTanStackMcpHandler, p as string, r as defineTool, s as createTanStackOAuthProtectedResourceMetadataHandler, t as auth, u as boolean } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { n as supabase } from "./client-6jjz1ame.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { R as redirect, _ as createRootRouteWithContext, b as useRouter, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DNaWCfYI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var styles_default = "/assets/styles-qMRTOoV9.css";
var _jsxFileName$1 = "/app/applet/src/components/ui/sonner.tsx";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 7,
		columnNumber: 5
	}, void 0);
};
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var _jsxFileName = "/app/applet/src/routes/__root.tsx";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 20,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 21,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 24,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 28,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 27,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 19,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 18,
		columnNumber: 5
	}, this);
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
		const msg = error?.message || "";
		if (msg.includes("Importing a module script failed") || msg.includes("Failed to fetch dynamically imported module") || msg.includes("error loading dynamically imported module")) {
			const key = "chunk_reload_attempted";
			const lastAttempt = sessionStorage.getItem(key);
			const now = Date.now();
			if (!lastAttempt || now - Number(lastAttempt) > 1e4) {
				sessionStorage.setItem(key, String(now));
				window.location.reload();
			}
		}
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4 py-12",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md w-full text-center space-y-4 p-6 rounded-2xl border border-purple-500/20 bg-card/80 backdrop-blur-xl shadow-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto flex size-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400",
					children: "⚠️"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 66,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-lg font-bold tracking-tight text-foreground",
					children: "Mise à jour de l'application"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 69,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground leading-relaxed",
					children: "Une nouvelle version de l'application est disponible ou un module n'a pas pu être chargé."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 72,
					columnNumber: 9
				}, this),
				error?.message && /* @__PURE__ */ (void 0)("div", {
					className: "p-3 text-left rounded-lg bg-red-500/10 border border-red-500/20 text-[11px] font-mono text-red-300 break-words max-h-32 overflow-y-auto",
					children: error.message
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 78,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "pt-2 flex flex-col sm:flex-row justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => {
							window.location.reload();
						},
						className: "inline-flex items-center justify-center rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-purple-500",
						children: "Recharger la page"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 84,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-accent",
						children: "Retour au tableau de bord"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 92,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 83,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 65,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 64,
		columnNumber: 5
	}, this);
}
var Route$26 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "NACORA — Pilotez vos candidatures et votre carrière avec l'IA" },
			{
				name: "description",
				content: "NACORA centralise vos candidatures, relances et entretiens, avec un match IA et un brief quotidien."
			},
			{
				property: "og:title",
				content: "NACORA — Votre copilote carrière intelligent"
			},
			{
				property: "og:description",
				content: "Suivi des candidatures, match IA et actions prioritaires du jour, dans une seule app."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", {
		lang: "fr",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeadContent, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 160,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 159,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 164,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 162,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 158,
		columnNumber: 5
	}, this);
}
function RootComponent() {
	const { queryClient } = Route$26.useRouteContext();
	(0, import_react.useEffect)(() => {
		const handleChunkError = (message) => {
			if (message.includes("Importing a module script failed") || message.includes("Failed to fetch dynamically imported module") || message.includes("error loading dynamically imported module") || message.includes("Unable to preload CSS")) {
				const key = "chunk_reload_attempted";
				const lastAttempt = sessionStorage.getItem(key);
				const now = Date.now();
				if (!lastAttempt || now - Number(lastAttempt) > 1e4) {
					sessionStorage.setItem(key, String(now));
					console.warn("Stale dynamic chunk detected. Reloading page for fresh assets...");
					window.location.reload();
				}
			}
		};
		const handlePreloadError = (e) => {
			console.warn("Preload error detected, reloading page...", e);
			handleChunkError("Failed to fetch dynamically imported module");
		};
		const handleWindowError = (event) => {
			if (event.message) handleChunkError(event.message);
		};
		const handleUnhandledRejection = (event) => {
			const reason = event.reason;
			const msg = reason instanceof Error ? reason.message : typeof reason === "string" ? reason : "";
			if (msg) handleChunkError(msg);
		};
		window.addEventListener("vite:preloadError", handlePreloadError);
		window.addEventListener("error", handleWindowError);
		window.addEventListener("unhandledrejection", handleUnhandledRejection);
		return () => {
			window.removeEventListener("vite:preloadError", handlePreloadError);
			window.removeEventListener("error", handleWindowError);
			window.removeEventListener("unhandledrejection", handleUnhandledRejection);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 235,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster$1, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 236,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 233,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$17 = () => import("./routes-DHQBVOxo.mjs");
var Route$25 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Tableau de bord — NACORA" },
		{
			name: "description",
			content: "Votre copilote de recherche de stage : brief quotidien, relances, deadlines et match IA en un coup d'œil."
		},
		{
			property: "og:title",
			content: "Tableau de bord — NACORA"
		},
		{
			property: "og:description",
			content: "Brief quotidien, relances, deadlines et match IA : tout votre suivi de candidatures dans NACORA."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./assistant-9k55TU97.mjs");
var Route$24 = createFileRoute("/assistant")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./auth-BtrMM62j.mjs");
var Route$23 = createFileRoute("/auth")({
	head: () => ({ meta: [
		{ title: "Connexion & Inscription — NACORA" },
		{
			name: "description",
			content: "Créez votre compte NACORA pour piloter vos candidatures de stages et alternances, synchroniser vos données et bénéficier du coach IA."
		},
		{
			property: "og:title",
			content: "Connexion & Inscription — NACORA"
		},
		{
			property: "og:description",
			content: "Accédez à votre espace NACORA pour centraliser et propulser vos candidatures de stage."
		}
	] }),
	validateSearch: (s) => {
		const value = s["next"];
		return typeof value === "string" ? { next: value } : {};
	},
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./calendrier-Bvh77_hS.mjs");
var Route$22 = createFileRoute("/calendrier")({
	head: () => ({ meta: [
		{ title: "Calendrier — NACORA" },
		{
			name: "description",
			content: "Toutes vos échéances de recherche de stage : dates limites, relances à faire et entretiens à venir."
		},
		{
			property: "og:title",
			content: "Calendrier — NACORA"
		},
		{
			property: "og:description",
			content: "Visualisez vos deadlines, relances et entretiens mois par mois."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./candidatures-CR4BHLqZ.mjs");
var Route$21 = createFileRoute("/candidatures")({
	validateSearch: (s) => ({
		statut: typeof s["statut"] === "string" ? s["statut"] : void 0,
		vue: typeof s["vue"] === "string" ? s["vue"] : void 0
	}),
	head: () => ({ meta: [
		{ title: "Mes candidatures — NACORA" },
		{
			name: "description",
			content: "Toutes vos candidatures dans un tableau filtrable et triable : statut, relances, deadlines et match IA."
		},
		{
			property: "og:title",
			content: "Mes candidatures — NACORA"
		},
		{
			property: "og:description",
			content: "Filtrez, triez et mettez à jour vos candidatures en un clic avec NACORA."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var Route$20 = createFileRoute("/connect")({ beforeLoad: () => {
	throw redirect({ to: "/assistant/connect" });
} });
var $$splitComponentImporter$12 = () => import("./contacts-vzSbq7fs.mjs");
var Route$19 = createFileRoute("/contacts")({
	head: () => ({ meta: [
		{ title: "Contacts — NACORA" },
		{
			name: "description",
			content: "Gérez vos recruteurs, RH, managers et anciens élèves, suivez vos échanges et rédigez vos relances avec l'IA."
		},
		{
			property: "og:title",
			content: "Contacts — NACORA"
		},
		{
			property: "og:description",
			content: "Carnet de contacts professionnels et relances personnalisées générées par l'IA."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./documents-CQL7DHwm.mjs");
var Route$18 = createFileRoute("/documents")({
	head: () => ({ meta: [
		{ title: "Documents — NACORA" },
		{
			name: "description",
			content: "Générez et conservez vos lettres de motivation personnalisées pour chaque offre suivie."
		},
		{
			property: "og:title",
			content: "Documents — NACORA"
		},
		{
			property: "og:description",
			content: "Lettres de motivation générées par l'IA à partir de votre profil réel."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./entreprises-R43WsqNC.mjs");
var Route$17 = createFileRoute("/entreprises")({
	head: () => ({ meta: [
		{ title: "Entreprises — NACORA" },
		{
			name: "description",
			content: "Toutes les entreprises que vous ciblez : candidatures, contacts associés, meilleur match IA et avancement."
		},
		{
			property: "og:title",
			content: "Entreprises — NACORA"
		},
		{
			property: "og:description",
			content: "Vue par entreprise de vos candidatures et de vos contacts, avec le meilleur score de match IA."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./import-C2Di_HNC.mjs");
var Route$16 = createFileRoute("/import")({
	head: () => ({ meta: [
		{ title: "Importer vos données — NACORA" },
		{
			name: "description",
			content: "Importez votre tableau Excel de recherche de stage, vos contacts LinkedIn, vos lettres de motivation et synchronisez vos échéances avec votre calendrier."
		},
		{
			property: "og:title",
			content: "Importer vos données — NACORA"
		},
		{
			property: "og:description",
			content: "Reprenez votre suivi là où vous en étiez : Excel, CSV, contacts LinkedIn, lettres de motivation et calendrier."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var Route$15 = createFileRoute("/interview")({ beforeLoad: () => {
	throw redirect({ to: "/assistant/interview" });
} });
var Route$14 = createFileRoute("/linkedin")({ beforeLoad: () => {
	throw redirect({ to: "/assistant/linkedin" });
} });
var Route$13 = createFileRoute("/match")({ beforeLoad: () => {
	throw redirect({ to: "/assistant/match" });
} });
function runtimeEnv(name) {
	const runtime = globalThis;
	return runtime.Deno?.env?.get?.(name) ?? runtime.process?.env?.[name];
}
function configuredEnv(names) {
	for (const name of names) {
		const value = runtimeEnv(name)?.trim();
		if (value) return value;
	}
}
function supabaseProjectUrl() {
	const url = configuredEnv(["SUPABASE_URL", "VITE_SUPABASE_URL"]);
	if (!url) throw new Error("SUPABASE_URL (or VITE_SUPABASE_URL) is required");
	return url;
}
function supabasePublishableKey() {
	const direct = configuredEnv(["SUPABASE_PUBLISHABLE_KEY", "VITE_SUPABASE_PUBLISHABLE_KEY"]);
	if (direct) return direct;
	const keyset = runtimeEnv("SUPABASE_PUBLISHABLE_KEYS");
	if (keyset) try {
		const parsed = JSON.parse(keyset);
		if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
			const keys = parsed;
			const key = [keys["default"], ...Object.values(keys)].find((v) => typeof v === "string" && v.trim().startsWith("sb_publishable_"))?.trim();
			if (key) return key;
		}
	} catch {}
	const legacy = configuredEnv(["SUPABASE_ANON_KEY", "VITE_SUPABASE_ANON_KEY"]);
	if (legacy) return legacy;
	throw new Error("SUPABASE_PUBLISHABLE_KEY, SUPABASE_PUBLISHABLE_KEYS, or SUPABASE_ANON_KEY is required");
}
/** Forwards the verified bearer token so RLS runs as the signed-in user. */
function supabaseForUser(ctx) {
	const token = ctx.getToken();
	if (!token) throw new Error("supabaseForUser requires a verified OAuth token");
	return createClient(supabaseProjectUrl(), supabasePublishableKey(), {
		global: { headers: { Authorization: `Bearer ${token}` } },
		auth: {
			persistSession: false,
			autoRefreshToken: false
		}
	});
}
function notAuthenticated() {
	return {
		content: [{
			type: "text",
			text: "Non authentifié : connectez-vous à Careerly."
		}],
		isError: true
	};
}
var list_candidatures_default = defineTool({
	name: "list_candidatures",
	title: "Lister les candidatures",
	description: "Liste les candidatures (stages/alternances) de l'utilisateur connecté, avec filtres optionnels sur le statut, l'entreprise et l'archivage.",
	inputSchema: {
		statut: string().optional().describe("Filtre exact sur le statut, ex. 'Envoyée', 'Entretien'."),
		entreprise: string().optional().describe("Filtre partiel sur le nom de l'entreprise."),
		inclure_archivees: boolean().optional().describe("Inclure les candidatures archivées."),
		limite: number().int().optional().describe("Nombre maximum de résultats (défaut 50).")
	},
	annotations: {
		readOnlyHint: true,
		idempotentHint: true,
		openWorldHint: false
	},
	handler: async ({ statut, entreprise, inclure_archivees, limite }, ctx) => {
		if (!ctx.isAuthenticated()) return notAuthenticated();
		let query = supabaseForUser(ctx).from("candidatures").select("id, entreprise, poste, statut, lieu, lien, source, secteur, priorite, archive, date_envoi, date_relance, date_limite, commentaire, match").order("updated_at", { ascending: false }).limit(Math.min(Math.max(limite ?? 50, 1), 200));
		if (statut) query = query.eq("statut", statut);
		if (entreprise) query = query.ilike("entreprise", `%${entreprise}%`);
		if (!inclure_archivees) query = query.eq("archive", false);
		const { data, error } = await query;
		if (error) return {
			content: [{
				type: "text",
				text: error.message
			}],
			isError: true
		};
		return {
			content: [{
				type: "text",
				text: JSON.stringify(data ?? [])
			}],
			structuredContent: { candidatures: data ?? [] }
		};
	}
});
var create_candidature_default = defineTool({
	name: "create_candidature",
	title: "Ajouter une candidature",
	description: "Crée une nouvelle candidature (offre de stage ou d'alternance) pour l'utilisateur connecté.",
	inputSchema: {
		entreprise: string().trim().min(1).describe("Nom de l'entreprise."),
		poste: string().trim().min(1).describe("Intitulé du poste."),
		statut: string().optional().describe("Statut initial, ex. 'À postuler', 'Envoyée'. Défaut : 'À postuler'."),
		lieu: string().optional(),
		lien: string().optional().describe("URL de l'offre."),
		source: string().optional().describe("Source de l'offre, ex. LinkedIn."),
		secteur: string().optional(),
		date_envoi: string().optional().describe("Date d'envoi au format YYYY-MM-DD."),
		date_limite: string().optional().describe("Date limite de candidature au format YYYY-MM-DD."),
		commentaire: string().optional(),
		detail: string().optional().describe("Description complète de l'offre.")
	},
	annotations: {
		readOnlyHint: false,
		destructiveHint: false,
		openWorldHint: false
	},
	handler: async (input, ctx) => {
		if (!ctx.isAuthenticated()) return notAuthenticated();
		const { data, error } = await supabaseForUser(ctx).from("candidatures").insert({
			user_id: ctx.getUserId(),
			entreprise: input.entreprise,
			poste: input.poste,
			statut: input.statut ?? "À postuler",
			lieu: input.lieu ?? "",
			lien: input.lien ?? "",
			source: input.source ?? "",
			secteur: input.secteur ?? "",
			date_envoi: input.date_envoi ?? null,
			date_limite: input.date_limite ?? null,
			commentaire: input.commentaire ?? "",
			detail: input.detail ?? ""
		}).select().single();
		if (error) return {
			content: [{
				type: "text",
				text: error.message
			}],
			isError: true
		};
		return {
			content: [{
				type: "text",
				text: JSON.stringify(data)
			}],
			structuredContent: { candidature: data }
		};
	}
});
var update_candidature_default = defineTool({
	name: "update_candidature",
	title: "Mettre à jour une candidature",
	description: "Met à jour une candidature existante (statut, dates, commentaire, archivage) via son identifiant.",
	inputSchema: {
		id: string().trim().min(1).describe("Identifiant de la candidature."),
		statut: string().optional(),
		lieu: string().optional(),
		priorite: string().optional().describe("'auto', 'haute', 'moyenne' ou 'basse'."),
		date_envoi: string().optional().describe("YYYY-MM-DD"),
		date_relance: string().optional().describe("YYYY-MM-DD"),
		date_limite: string().optional().describe("YYYY-MM-DD"),
		commentaire: string().optional(),
		archive: boolean().optional()
	},
	annotations: {
		readOnlyHint: false,
		destructiveHint: true,
		openWorldHint: false
	},
	handler: async ({ id, ...fields }, ctx) => {
		if (!ctx.isAuthenticated()) return notAuthenticated();
		const patch = Object.fromEntries(Object.entries(fields).filter(([, v]) => v !== void 0));
		if (Object.keys(patch).length === 0) return {
			content: [{
				type: "text",
				text: "Aucun champ à mettre à jour."
			}],
			isError: true
		};
		const { data, error } = await supabaseForUser(ctx).from("candidatures").update({
			...patch,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", id).select().maybeSingle();
		if (error) return {
			content: [{
				type: "text",
				text: error.message
			}],
			isError: true
		};
		if (!data) return {
			content: [{
				type: "text",
				text: "Candidature introuvable."
			}],
			isError: true
		};
		return {
			content: [{
				type: "text",
				text: JSON.stringify(data)
			}],
			structuredContent: { candidature: data }
		};
	}
});
var list_contacts_default = defineTool({
	name: "list_contacts",
	title: "Lister les contacts",
	description: "Liste les contacts professionnels (recruteurs, alumni, managers) de l'utilisateur connecté.",
	inputSchema: {
		recherche: string().optional().describe("Recherche partielle sur le nom ou l'entreprise."),
		limite: number().int().optional().describe("Nombre maximum de résultats (défaut 50).")
	},
	annotations: {
		readOnlyHint: true,
		idempotentHint: true,
		openWorldHint: false
	},
	handler: async ({ recherche, limite }, ctx) => {
		if (!ctx.isAuthenticated()) return notAuthenticated();
		let query = supabaseForUser(ctx).from("contacts").select("id, nom, entreprise, poste, email, telephone, linkedin, type, candidature_id, derniere_interaction, prochaine_action, date_prochaine_action, notes").order("updated_at", { ascending: false }).limit(Math.min(Math.max(limite ?? 50, 1), 200));
		if (recherche) query = query.or(`nom.ilike.%${recherche}%,entreprise.ilike.%${recherche}%`);
		const { data, error } = await query;
		if (error) return {
			content: [{
				type: "text",
				text: error.message
			}],
			isError: true
		};
		return {
			content: [{
				type: "text",
				text: JSON.stringify(data ?? [])
			}],
			structuredContent: { contacts: data ?? [] }
		};
	}
});
var get_profil_default = defineTool({
	name: "get_profil",
	title: "Lire mon profil",
	description: "Récupère le profil de recherche de l'utilisateur connecté (formation, compétences, critères, analyse de CV).",
	inputSchema: {},
	annotations: {
		readOnlyHint: true,
		idempotentHint: true,
		openWorldHint: false
	},
	handler: async (_input, ctx) => {
		if (!ctx.isAuthenticated()) return notAuthenticated();
		const { data, error } = await supabaseForUser(ctx).from("profils").select("*").eq("user_id", ctx.getUserId()).maybeSingle();
		if (error) return {
			content: [{
				type: "text",
				text: error.message
			}],
			isError: true
		};
		if (!data) return { content: [{
			type: "text",
			text: "Aucun profil enregistré pour le moment."
		}] };
		return {
			content: [{
				type: "text",
				text: JSON.stringify(data)
			}],
			structuredContent: { profil: data }
		};
	}
});
var projectRef = {
	"BASE_URL": "/",
	"DEV": true,
	"MODE": "production",
	"PROD": false,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_PROJECT_ID": "qthnoiooyawmntqdbqgo"
}["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";
var mcp_default = defineMcp({
	name: "careerly-v2",
	title: "Careerly V2",
	version: "0.1.0",
	instructions: "Outils Careerly : suivi de candidatures de stage/alternance, contacts et profil de recherche de l'utilisateur connecté. Utilisez list_candidatures pour l'état des candidatures, create_candidature/update_candidature pour les faire évoluer, list_contacts pour le réseau, get_profil pour le contexte du candidat.",
	auth: auth.oauth.issuer({
		issuer: `https://${projectRef}.supabase.co/auth/v1`,
		acceptedAudiences: "authenticated"
	}),
	tools: [
		list_candidatures_default,
		create_candidature_default,
		update_candidature_default,
		list_contacts_default,
		get_profil_default
	]
});
var Route$12 = createFileRoute("/mcp")({ server: { handlers: { ANY: createTanStackMcpHandler(mcp_default, {
	resourcePath: "/mcp",
	metadataPath: "/.well-known/oauth-protected-resource",
	trustForwardedHost: true
}) } } });
var $$splitComponentImporter$8 = () => import("./opportunites-BUQi9dX7.mjs");
var Route$11 = createFileRoute("/opportunites")({
	head: () => ({ meta: [
		{ title: "Opportunités — NACORA" },
		{
			name: "description",
			content: "Votre pipeline d'opportunités en colonnes : à postuler, envoyées, relancées, entretiens et réponses."
		},
		{
			property: "og:title",
			content: "Opportunités — NACORA"
		},
		{
			property: "og:description",
			content: "Visualisez votre pipeline de candidatures et les deadlines à ne pas manquer."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./parametres-DKy-lkvF.mjs");
var Route$10 = createFileRoute("/parametres")({
	head: () => ({ meta: [
		{ title: "Paramètres — NACORA" },
		{
			name: "description",
			content: "Gérez votre compte NACORA, exportez vos candidatures et contrôlez vos données locales."
		},
		{
			property: "og:title",
			content: "Paramètres — NACORA"
		},
		{
			property: "og:description",
			content: "Compte, export de données et confidentialité dans NACORA."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./profil-BABVL7fU.mjs");
var Route$9 = createFileRoute("/profil")({
	head: () => ({ meta: [
		{ title: "Mon Profil — Dossier Candidat Central NACORA" },
		{
			name: "description",
			content: "Le dossier candidat central de NACORA : source de vérité pour le Match IA, l'optimiseur de CV, les simulations d'entretien et l'assistant de candidature."
		},
		{
			property: "og:title",
			content: "Mon Profil — Dossier Candidat Central NACORA"
		},
		{
			property: "og:description",
			content: "Votre dossier candidat central est la source de vérité pour tous les moteurs d'intelligence artificielle de NACORA."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var Route$8 = createFileRoute("/.mcp/list-tools")({ server: { handlers: { ANY: createTanStackListToolsHandler(mcp_default, {
	resourcePath: "/mcp",
	metadataPath: "/.well-known/oauth-protected-resource",
	trustForwardedHost: true
}) } } });
var Route$7 = createFileRoute("/.well-known/oauth-protected-resource")({ server: { handlers: { ANY: createTanStackOAuthProtectedResourceMetadataHandler(mcp_default, {
	resourcePath: "/mcp",
	metadataPath: "/.well-known/oauth-protected-resource",
	trustForwardedHost: true,
	forwardedHostTrustedByPlatform: true
}) } } });
var $$splitComponentImporter$5 = () => import("./assistant.index-9c8pj51k.mjs");
var Route$6 = createFileRoute("/assistant/")({
	head: () => ({ meta: [
		{ title: "NACORA AI — Votre copilote pour décrocher votre prochaine opportunité" },
		{
			name: "description",
			content: "Intelligence artificielle unifiée de NACORA : analysez une offre, calculez votre Match IA, adaptez votre CV, rédigez vos e-mails et préparez vos entretiens."
		},
		{
			property: "og:title",
			content: "NACORA AI — Copilote Unifié"
		},
		{
			property: "og:description",
			content: "Une seule intelligence artificielle pour piloter l'ensemble de vos candidatures."
		},
		{
			property: "og:type",
			content: "website"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./assistant.connect-Duewg_t9.mjs");
var Route$5 = createFileRoute("/assistant/connect")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({ meta: [
		{ title: "Connecter une IA — NACORA" },
		{
			name: "description",
			content: "Connectez ChatGPT, Claude ou un autre assistant IA à votre compte NACORA via MCP."
		},
		{
			property: "og:title",
			content: "Connecter une IA à NACORA"
		},
		{
			property: "og:description",
			content: "Guide pas à pas pour relier Claude, ChatGPT ou Cursor à vos données NACORA."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] })
});
var $$splitComponentImporter$3 = () => import("./assistant.interview-25sD3mvX.mjs");
var Route$4 = createFileRoute("/assistant/interview")({
	head: () => ({ meta: [
		{ title: "Interview Coach — NACORA AI Hub" },
		{
			name: "description",
			content: "Préparez vos entretiens : questions probables, pistes de réponse STAR, arguments clés et questions à poser au recruteur."
		},
		{
			property: "og:title",
			content: "Interview Coach — NACORA AI Hub"
		},
		{
			property: "og:description",
			content: "Simulation d'entretien personnalisée à partir de votre profil et de l'offre visée."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./assistant.linkedin-NGWayVee.mjs");
var Route$3 = createFileRoute("/assistant/linkedin")({
	head: () => ({ meta: [
		{ title: "LinkedIn Assistant — NACORA AI Hub" },
		{
			name: "description",
			content: "Générez vos notes d'invitation, messages de suivi et accroche de profil LinkedIn à partir de votre profil réel."
		},
		{
			property: "og:title",
			content: "LinkedIn Assistant — NACORA AI Hub"
		},
		{
			property: "og:description",
			content: "Messages LinkedIn personnalisés générés par l'IA à partir de votre profil et de l'offre ciblée."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./assistant.match-Bc9bWUZf.mjs");
var Route$2 = createFileRoute("/assistant/match")({
	head: () => ({ meta: [
		{ title: "Match IA — NACORA AI Hub" },
		{
			name: "description",
			content: "Classement IA de vos offres : score de correspondance, points forts, vigilance et compétences à renforcer."
		},
		{
			property: "og:title",
			content: "Match IA — NACORA AI Hub"
		},
		{
			property: "og:description",
			content: "Comparez votre profil à chaque offre et priorisez les candidatures avec le meilleur potentiel."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitErrorComponentImporter = () => import("../_._lovable.oauth.consent-Cpkpi9xW.mjs");
var $$splitComponentImporter = () => import("../_._lovable.oauth.consent-BMcSkymA.mjs");
var Route$1 = createFileRoute("/.lovable/oauth/consent")({
	ssr: false,
	validateSearch: (s) => ({ authorization_id: typeof s["authorization_id"] === "string" ? s["authorization_id"] : "" }),
	beforeLoad: async ({ search, location }) => {
		if (!search.authorization_id) throw new Error("Missing authorization_id");
		const { data } = await supabase.auth.getSession();
		const next = location.pathname + location.searchStr;
		if (!data.session) throw redirect({
			to: "/auth",
			search: { next }
		});
	},
	loader: async ({ location }) => {
		const authorizationId = new URLSearchParams(location.search).get("authorization_id");
		const { data, error } = await supabase.auth.oauth.getAuthorizationDetails(authorizationId);
		if (error) throw error;
		const immediate = data?.redirect_url ?? data?.redirect_to;
		if (immediate && !data?.client) throw redirect({ href: immediate });
		return data;
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
var Route = createFileRoute("/.mcp/invoke-tool/$tool")({ server: { handlers: { ANY: createTanStackInvokeToolHandler(mcp_default, {
	resourcePath: "/mcp",
	metadataPath: "/.well-known/oauth-protected-resource",
	trustForwardedHost: true
}) } } });
var IndexRoute = Route$25.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$26
});
var AssistantRoute = Route$24.update({
	id: "/assistant",
	path: "/assistant",
	getParentRoute: () => Route$26
});
var AuthRoute = Route$23.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$26
});
var CalendrierRoute = Route$22.update({
	id: "/calendrier",
	path: "/calendrier",
	getParentRoute: () => Route$26
});
var CandidaturesRoute = Route$21.update({
	id: "/candidatures",
	path: "/candidatures",
	getParentRoute: () => Route$26
});
var ConnectRoute = Route$20.update({
	id: "/connect",
	path: "/connect",
	getParentRoute: () => Route$26
});
var ContactsRoute = Route$19.update({
	id: "/contacts",
	path: "/contacts",
	getParentRoute: () => Route$26
});
var DocumentsRoute = Route$18.update({
	id: "/documents",
	path: "/documents",
	getParentRoute: () => Route$26
});
var EntreprisesRoute = Route$17.update({
	id: "/entreprises",
	path: "/entreprises",
	getParentRoute: () => Route$26
});
var ImportRoute = Route$16.update({
	id: "/import",
	path: "/import",
	getParentRoute: () => Route$26
});
var InterviewRoute = Route$15.update({
	id: "/interview",
	path: "/interview",
	getParentRoute: () => Route$26
});
var LinkedinRoute = Route$14.update({
	id: "/linkedin",
	path: "/linkedin",
	getParentRoute: () => Route$26
});
var MatchRoute = Route$13.update({
	id: "/match",
	path: "/match",
	getParentRoute: () => Route$26
});
var McpRoute = Route$12.update({
	id: "/mcp",
	path: "/mcp",
	getParentRoute: () => Route$26
});
var OpportunitesRoute = Route$11.update({
	id: "/opportunites",
	path: "/opportunites",
	getParentRoute: () => Route$26
});
var ParametresRoute = Route$10.update({
	id: "/parametres",
	path: "/parametres",
	getParentRoute: () => Route$26
});
var ProfilRoute = Route$9.update({
	id: "/profil",
	path: "/profil",
	getParentRoute: () => Route$26
});
var Char91DotmcpChar93ListToolsRoute = Route$8.update({
	id: "/.mcp/list-tools",
	path: "/.mcp/list-tools",
	getParentRoute: () => Route$26
});
var Char91DotwellKnownChar93OauthProtectedResourceRoute = Route$7.update({
	id: "/.well-known/oauth-protected-resource",
	path: "/.well-known/oauth-protected-resource",
	getParentRoute: () => Route$26
});
var AssistantIndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => AssistantRoute
});
var AssistantConnectRoute = Route$5.update({
	id: "/connect",
	path: "/connect",
	getParentRoute: () => AssistantRoute
});
var AssistantInterviewRoute = Route$4.update({
	id: "/interview",
	path: "/interview",
	getParentRoute: () => AssistantRoute
});
var AssistantLinkedinRoute = Route$3.update({
	id: "/linkedin",
	path: "/linkedin",
	getParentRoute: () => AssistantRoute
});
var AssistantMatchRoute = Route$2.update({
	id: "/match",
	path: "/match",
	getParentRoute: () => AssistantRoute
});
var DotlovableOauthConsentRoute = Route$1.update({
	id: "/.lovable/oauth/consent",
	path: "/.lovable/oauth/consent",
	getParentRoute: () => Route$26
});
var Char91DotmcpChar93InvokeToolToolRoute = Route.update({
	id: "/.mcp/invoke-tool/$tool",
	path: "/.mcp/invoke-tool/$tool",
	getParentRoute: () => Route$26
});
var AssistantRouteChildren = {
	AssistantConnectRoute,
	AssistantInterviewRoute,
	AssistantLinkedinRoute,
	AssistantMatchRoute,
	AssistantIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AssistantRoute: AssistantRoute._addFileChildren(AssistantRouteChildren),
	AuthRoute,
	CalendrierRoute,
	CandidaturesRoute,
	ConnectRoute,
	ContactsRoute,
	DocumentsRoute,
	EntreprisesRoute,
	ImportRoute,
	InterviewRoute,
	LinkedinRoute,
	MatchRoute,
	McpRoute,
	OpportunitesRoute,
	ParametresRoute,
	ProfilRoute,
	Char91DotmcpChar93ListToolsRoute,
	Char91DotwellKnownChar93OauthProtectedResourceRoute,
	DotlovableOauthConsentRoute,
	Char91DotmcpChar93InvokeToolToolRoute
};
var routeTree = Route$26._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { Route$23 as i, Route$1 as n, Route$21 as r, router_exports as t };

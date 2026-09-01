import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as cn } from "./button-DDzEUEFj.mjs";
import { t as Logo } from "./Logo-uaae8zfz.mjs";
import { At as ChevronDown, Bt as Bell, F as Menu, H as ListChecks, It as Building2, L as Mail, N as MessageSquare, Nt as CalendarDays, O as Plus, S as Search, U as Linkedin, X as House, a as Users, b as Settings, g as Target, i as WandSparkles, k as Plug, n as X, ot as FileText, s as UserRound, u as Upload, v as Sparkles, w as ScanLine } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-JIGp6MTc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/AppShell.tsx";
var MAIN = [
	{
		label: "Accueil",
		icon: House,
		to: "/"
	},
	{
		label: "Candidatures",
		icon: ListChecks,
		to: "/candidatures"
	},
	{
		label: "Opportunités",
		icon: Target,
		to: "/opportunites"
	},
	{
		label: "Entreprises",
		icon: Building2,
		to: "/entreprises"
	},
	{
		label: "Contacts",
		icon: Users,
		to: "/contacts"
	},
	{
		label: "Calendrier",
		icon: CalendarDays,
		to: "/calendrier"
	},
	{
		label: "Documents",
		icon: FileText,
		to: "/documents"
	},
	{
		label: "Importer",
		icon: Upload,
		to: "/import"
	}
];
var STUDIO = [
	{
		label: "Match IA",
		icon: Sparkles,
		to: "/assistant/match",
		sub: true
	},
	{
		label: "CV Optimizer",
		icon: ScanLine,
		to: "/profil",
		sub: true
	},
	{
		label: "Email Assistant",
		icon: Mail,
		to: "/contacts",
		sub: true
	},
	{
		label: "LinkedIn Assistant",
		icon: Linkedin,
		to: "/assistant/linkedin",
		sub: true
	},
	{
		label: "Interview Coach",
		icon: MessageSquare,
		to: "/assistant/interview",
		sub: true
	},
	{
		label: "Connecter une IA",
		icon: Plug,
		to: "/assistant/connect",
		sub: true
	}
];
var ASSISTANT = {
	label: "NACORA AI (Hub)",
	icon: WandSparkles,
	to: "/assistant"
};
var bientot = () => toast("Bientôt disponible dans NACORA.");
function NavRow({ item, active }) {
	const inner = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(item.icon, { className: "size-[18px] shrink-0" }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 85,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: "truncate",
		children: item.label
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 86,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 84,
		columnNumber: 5
	}, this);
	const klass = cn("group relative flex w-full items-center gap-3 rounded-xl py-2.5 text-[13.5px] font-medium transition-colors", item.sub ? "pl-4 pr-3 text-[13px]" : "px-3", active ? "bg-primary/15 text-foreground ring-1 ring-primary/35" : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground");
	return item.to ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
		to: item.to,
		className: klass,
		children: [active && /* @__PURE__ */ (void 0)("span", { className: "absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 99,
			columnNumber: 9
		}, this), inner]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 97,
		columnNumber: 5
	}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		type: "button",
		onClick: bientot,
		className: klass,
		children: inner
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 104,
		columnNumber: 5
	}, this);
}
function AppShell({ title, subtitle, eyebrow, headerExtra, actions, onAdd, onSearch, searchValue, children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [local, setLocal] = (0, import_react.useState)("");
	const value = searchValue ?? local;
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMenuOpen(false);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		if (!menuOpen) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [menuOpen]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background aurora-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: cn("fixed inset-0 z-50 md:hidden", menuOpen ? "pointer-events-auto" : "pointer-events-none"),
				"aria-hidden": !menuOpen,
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					"aria-label": "Fermer le menu",
					onClick: () => setMenuOpen(false),
					className: cn("absolute inset-0 bg-background/70 backdrop-blur-sm transition-opacity duration-300", menuOpen ? "opacity-100" : "opacity-0")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 159,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
					className: cn("absolute inset-y-0 left-0 flex w-[82%] max-w-[300px] flex-col border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl transition-transform duration-300 ease-out", menuOpen ? "translate-x-0" : "-translate-x-full"),
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex h-[68px] shrink-0 items-center justify-between gap-2 px-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Logo, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 175,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							"aria-label": "Fermer le menu",
							onClick: () => setMenuOpen(false),
							className: "grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-sidebar-accent/50 hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 182,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 176,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 174,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
						className: "flex-1 overflow-y-auto px-3 pb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-col gap-1",
								children: MAIN.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavRow, {
									item,
									active: item.to === pathname
								}, item.label, false, {
									fileName: _jsxFileName,
									lineNumber: 189,
									columnNumber: 17
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 187,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "my-4 h-px bg-sidebar-border" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 197,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mb-2 flex items-center gap-1.5 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
								children: ["NACORA AI ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-primary",
									children: "✦"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 200,
									columnNumber: 25
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 199,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavRow, {
								item: ASSISTANT,
								active: pathname === "/assistant"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 202,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-1 ml-5 flex flex-col gap-1 border-l border-sidebar-border pl-2",
								children: STUDIO.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavRow, {
									item,
									active: item.to === pathname
								}, item.label, false, {
									fileName: _jsxFileName,
									lineNumber: 205,
									columnNumber: 17
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 203,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "my-4 h-px bg-sidebar-border" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 213,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-col gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavRow, {
									item: {
										label: "Paramètres",
										icon: Settings,
										to: "/parametres"
									},
									active: pathname === "/parametres"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 216,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavRow, {
									item: {
										label: "Mon profil",
										icon: UserRound,
										to: "/profil"
									},
									active: pathname === "/profil"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 224,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 215,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 186,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 168,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 152,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
				className: "fixed inset-y-0 left-0 z-40 hidden w-[248px] flex-col border-r border-sidebar-border bg-sidebar/90 backdrop-blur-xl md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex h-[72px] items-center px-5",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Logo, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 236,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 235,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
						className: "flex-1 overflow-y-auto px-3 pb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-col gap-1",
								children: MAIN.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavRow, {
									item,
									active: item.to === pathname
								}, item.label, false, {
									fileName: _jsxFileName,
									lineNumber: 242,
									columnNumber: 15
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 240,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "my-4 h-px bg-sidebar-border" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 250,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mb-2 flex items-center gap-1.5 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
								children: ["NACORA AI ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-primary",
									children: "✦"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 253,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 252,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavRow, {
								item: ASSISTANT,
								active: pathname === "/assistant"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 255,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-1 ml-5 flex flex-col gap-1 border-l border-sidebar-border pl-2",
								children: STUDIO.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavRow, {
									item,
									active: item.to === pathname
								}, item.label, false, {
									fileName: _jsxFileName,
									lineNumber: 258,
									columnNumber: 15
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 256,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 239,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "px-3 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/parametres",
							className: "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent/50 hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Settings, { className: "size-[18px]" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 272,
								columnNumber: 13
							}, this), " Paramètres"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 268,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/profil",
							className: "mt-2 flex items-center gap-3 rounded-2xl border border-sidebar-border bg-card/70 px-3 py-2.5 transition-colors hover:bg-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "grid size-9 shrink-0 place-items-center rounded-full gradient-hero text-primary-foreground",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserRound, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 280,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 279,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "min-w-0 flex-1 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "block truncate text-[13px] font-semibold",
										children: "Mon compte"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 283,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "block truncate text-[11px] text-muted-foreground",
										children: "Voir mon profil"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 286,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 282,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "size-4 shrink-0 text-muted-foreground" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 290,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 275,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 267,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 234,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "md:pl-[248px]",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
					className: "sticky top-0 z-30 border-b border-border/50 bg-background/75 backdrop-blur-xl",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mx-auto flex h-auto max-w-[1200px] flex-wrap items-center gap-3 px-4 py-3.5 sm:px-6 md:h-[72px] md:flex-nowrap md:py-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex w-full items-center gap-2 md:hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setMenuOpen(true),
										"aria-label": "Ouvrir le menu",
										className: "press grid size-10 shrink-0 place-items-center rounded-full border border-border/60 bg-card/60 text-foreground",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, { className: "size-5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 306,
											columnNumber: 17
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 300,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Logo, {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 308,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: bientot,
										"aria-label": "Notifications",
										className: "relative ml-auto grid size-10 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bell, { className: "size-[18px]" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 315,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground",
											children: "3"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 316,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 309,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 299,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative w-full min-w-0 sm:w-auto sm:flex-1 md:mx-auto md:max-w-md",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 323,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										value,
										onChange: (e) => onSearch ? onSearch(e.target.value) : setLocal(e.target.value),
										placeholder: "Rechercher une offre, une entreprise…",
										className: "h-10 w-full rounded-full border border-border/70 bg-card/60 pl-10 pr-4 sm:pr-14 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 324,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("kbd", {
										className: "pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-border/70 px-1.5 py-0.5 text-[10px] text-muted-foreground sm:block",
										children: "⌘K"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 332,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 322,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: bientot,
								"aria-label": "Notifications",
								className: "relative hidden md:grid size-10 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bell, { className: "size-[18px]" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 343,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground",
									children: "3"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 344,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 337,
								columnNumber: 13
							}, this),
							onAdd && /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: onAdd,
								className: "press hidden shrink-0 items-center gap-2 rounded-full gradient-hero px-4 py-2.5 text-[13.5px] font-semibold text-primary-foreground shadow-[0_8px_24px_-12px_var(--color-primary)] sm:inline-flex",
								children: [/* @__PURE__ */ (void 0)(Plus, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 355,
									columnNumber: 17
								}, this), " Ajouter une opportunité"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 350,
								columnNumber: 15
							}, this),
							actions && /* @__PURE__ */ (void 0)("div", {
								className: "flex shrink-0 flex-wrap items-center gap-2",
								children: actions
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 360,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 298,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 297,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
					className: "pop-in mx-auto max-w-[1200px] px-4 pb-28 pt-5 sm:px-6 sm:pt-6 md:pb-12",
					children: [title && /* @__PURE__ */ (void 0)("div", {
						className: "pop-in mb-5 flex flex-wrap items-end justify-between gap-3 sm:mb-6",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "min-w-0",
							children: [
								eyebrow && /* @__PURE__ */ (void 0)("p", {
									className: "mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-primary",
									children: eyebrow
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 372,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("h1", {
									className: "text-[22px] font-extrabold tracking-tight sm:text-[28px]",
									children: title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 376,
									columnNumber: 17
								}, this),
								subtitle && /* @__PURE__ */ (void 0)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: subtitle
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 380,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 370,
							columnNumber: 15
						}, this), headerExtra && /* @__PURE__ */ (void 0)("div", {
							className: "flex w-full flex-wrap items-center gap-2 [&>*]:flex-1 sm:w-auto sm:[&>*]:flex-none",
							children: headerExtra
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 386,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 369,
						columnNumber: 13
					}, this), children]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 367,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 296,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-end justify-around px-2 pt-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MobileTab, {
							to: "/",
							label: "Accueil",
							icon: House,
							active: pathname === "/"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 399,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MobileTab, {
							to: "/candidatures",
							label: "Candidatures",
							icon: FileText,
							active: pathname === "/candidatures"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 405,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: onAdd ?? bientot,
							"aria-label": "Ajouter une opportunité",
							className: "press -mt-6 grid size-14 shrink-0 place-items-center self-center rounded-full gradient-hero text-primary-foreground shadow-[0_10px_30px_-10px_var(--color-primary)]",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-6" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 417,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 411,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MobileTab, {
							to: "/calendrier",
							label: "Calendrier",
							icon: CalendarDays,
							active: pathname === "/calendrier"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 419,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MobileTab, {
							to: "/profil",
							label: "Profil",
							icon: UserRound,
							active: pathname === "/profil"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 425,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 398,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 397,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 150,
		columnNumber: 5
	}, this);
}
function MobileTab({ to, label, icon: Icon, active }) {
	const klass = cn("flex flex-1 flex-col items-center gap-1 py-2 text-[10.5px] font-medium transition-colors", active ? "text-primary" : "text-muted-foreground");
	const inner = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "size-[19px]" }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 454,
		columnNumber: 7
	}, this), label] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 453,
		columnNumber: 5
	}, this);
	return to ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
		to,
		className: klass,
		children: inner
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 459,
		columnNumber: 5
	}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		type: "button",
		onClick: bientot,
		className: klass,
		children: inner
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 463,
		columnNumber: 5
	}, this);
}
//#endregion
export { AppShell as t };

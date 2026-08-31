import { a as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as Plug, At as CalendarDays, Dt as ChevronDown, F as Menu, H as ListChecks, L as Mail, Lt as Bell, Mt as Building2, N as MessageSquare, S as Settings, T as ScanLine, U as Linkedin, X as House, a as Users, at as FileText, g as Target, i as WandSparkles, k as Plus, n as X, s as UserRound, u as Upload, v as Sparkles, w as Search } from "../_libs/lucide-react.mjs";
import { ft as cn, i as Logo } from "./router-arR9ITmX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-BYQcXmkR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-[18px] shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "truncate",
		children: item.label
	})] });
	const klass = cn("group relative flex w-full items-center gap-3 rounded-xl py-2.5 text-[13.5px] font-medium transition-colors", item.sub ? "pl-4 pr-3 text-[13px]" : "px-3", active ? "bg-primary/15 text-foreground ring-1 ring-primary/35" : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground");
	return item.to ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: item.to,
		className: klass,
		children: [active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" }), inner]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: bientot,
		className: klass,
		children: inner
	});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background aurora-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("fixed inset-0 z-50 md:hidden", menuOpen ? "pointer-events-auto" : "pointer-events-none"),
				"aria-hidden": !menuOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Fermer le menu",
					onClick: () => setMenuOpen(false),
					className: cn("absolute inset-0 bg-background/70 backdrop-blur-sm transition-opacity duration-300", menuOpen ? "opacity-100" : "opacity-0")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: cn("absolute inset-y-0 left-0 flex w-[82%] max-w-[300px] flex-col border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl transition-transform duration-300 ease-out", menuOpen ? "translate-x-0" : "-translate-x-full"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-[68px] shrink-0 items-center justify-between gap-2 px-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Fermer le menu",
							onClick: () => setMenuOpen(false),
							className: "grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-sidebar-accent/50 hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex-1 overflow-y-auto px-3 pb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-col gap-1",
								children: MAIN.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavRow, {
									item,
									active: item.to === pathname
								}, item.label))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-4 h-px bg-sidebar-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mb-2 flex items-center gap-1.5 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
								children: ["NACORA AI ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "✦"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavRow, {
								item: ASSISTANT,
								active: pathname === "/assistant"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 ml-5 flex flex-col gap-1 border-l border-sidebar-border pl-2",
								children: STUDIO.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavRow, {
									item,
									active: item.to === pathname
								}, item.label))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-4 h-px bg-sidebar-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavRow, {
									item: {
										label: "Paramètres",
										icon: Settings,
										to: "/parametres"
									},
									active: pathname === "/parametres"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavRow, {
									item: {
										label: "Mon profil",
										icon: UserRound,
										to: "/profil"
									},
									active: pathname === "/profil"
								})]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-40 hidden w-[248px] flex-col border-r border-sidebar-border bg-sidebar/90 backdrop-blur-xl md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-[72px] items-center px-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex-1 overflow-y-auto px-3 pb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-col gap-1",
								children: MAIN.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavRow, {
									item,
									active: item.to === pathname
								}, item.label))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-4 h-px bg-sidebar-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mb-2 flex items-center gap-1.5 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
								children: ["NACORA AI ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "✦"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavRow, {
								item: ASSISTANT,
								active: pathname === "/assistant"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 ml-5 flex flex-col gap-1 border-l border-sidebar-border pl-2",
								children: STUDIO.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavRow, {
									item,
									active: item.to === pathname
								}, item.label))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-3 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/parametres",
							className: "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent/50 hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-[18px]" }), " Paramètres"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/profil",
							className: "mt-2 flex items-center gap-3 rounded-2xl border border-sidebar-border bg-card/70 px-3 py-2.5 transition-colors hover:bg-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-9 shrink-0 place-items-center rounded-full gradient-hero text-primary-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate text-[13px] font-semibold",
										children: "Mon compte"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate text-[11px] text-muted-foreground",
										children: "Voir mon profil"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 shrink-0 text-muted-foreground" })
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:pl-[248px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "sticky top-0 z-30 border-b border-border/50 bg-background/75 backdrop-blur-xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex h-auto max-w-[1200px] flex-wrap items-center gap-3 px-4 py-3.5 sm:px-6 md:h-[72px] md:flex-nowrap md:py-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex w-full items-center gap-2 md:hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setMenuOpen(true),
										"aria-label": "Ouvrir le menu",
										className: "press grid size-10 shrink-0 place-items-center rounded-full border border-border/60 bg-card/60 text-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: bientot,
										"aria-label": "Notifications",
										className: "relative ml-auto grid size-10 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-[18px]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground",
											children: "3"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-full min-w-0 sm:w-auto sm:flex-1 md:mx-auto md:max-w-md",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value,
										onChange: (e) => onSearch ? onSearch(e.target.value) : setLocal(e.target.value),
										placeholder: "Rechercher une offre, une entreprise…",
										className: "h-10 w-full rounded-full border border-border/70 bg-card/60 pl-10 pr-4 sm:pr-14 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
										className: "pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-border/70 px-1.5 py-0.5 text-[10px] text-muted-foreground sm:block",
										children: "⌘K"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: bientot,
								"aria-label": "Notifications",
								className: "relative hidden md:grid size-10 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-[18px]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground",
									children: "3"
								})]
							}),
							onAdd && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: onAdd,
								className: "press hidden shrink-0 items-center gap-2 rounded-full gradient-hero px-4 py-2.5 text-[13.5px] font-semibold text-primary-foreground shadow-[0_8px_24px_-12px_var(--color-primary)] sm:inline-flex",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Ajouter une opportunité"]
							}),
							actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex shrink-0 flex-wrap items-center gap-2",
								children: actions
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "pop-in mx-auto max-w-[1200px] px-4 pb-28 pt-5 sm:px-6 sm:pt-6 md:pb-12",
					children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pop-in mb-5 flex flex-wrap items-end justify-between gap-3 sm:mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-primary",
									children: eyebrow
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-[22px] font-extrabold tracking-tight sm:text-[28px]",
									children: title
								}),
								subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: subtitle
								})
							]
						}), headerExtra && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex w-full flex-wrap items-center gap-2 [&>*]:flex-1 sm:w-auto sm:[&>*]:flex-none",
							children: headerExtra
						})]
					}), children]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-around px-2 pt-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileTab, {
							to: "/",
							label: "Accueil",
							icon: House,
							active: pathname === "/"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileTab, {
							to: "/candidatures",
							label: "Candidatures",
							icon: FileText,
							active: pathname === "/candidatures"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onAdd ?? bientot,
							"aria-label": "Ajouter une opportunité",
							className: "press -mt-6 grid size-14 shrink-0 place-items-center self-center rounded-full gradient-hero text-primary-foreground shadow-[0_10px_30px_-10px_var(--color-primary)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileTab, {
							to: "/calendrier",
							label: "Calendrier",
							icon: CalendarDays,
							active: pathname === "/calendrier"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileTab, {
							to: "/profil",
							label: "Profil",
							icon: UserRound,
							active: pathname === "/profil"
						})
					]
				})
			})
		]
	});
}
function MobileTab({ to, label, icon: Icon, active }) {
	const klass = cn("flex flex-1 flex-col items-center gap-1 py-2 text-[10.5px] font-medium transition-colors", active ? "text-primary" : "text-muted-foreground");
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-[19px]" }), label] });
	return to ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		className: klass,
		children: inner
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: bientot,
		className: klass,
		children: inner
	});
}
//#endregion
export { AppShell as t };

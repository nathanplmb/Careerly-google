import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { Ft as Bot, N as MessageSquare, O as RefreshCw, Ot as Check, Vt as ArrowLeft, _t as Copy, ft as ExternalLink, h as Terminal, v as Sparkles } from "../_libs/lucide-react.mjs";
import { dt as Button, ft as cn } from "./router-Dma1Qf70.mjs";
import { t as AppShell } from "./AppShell-SgP4smEW.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BVo--1gP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assistant.connect-uCiz6ZYA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/ui/card.tsx";
var Card = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	ref,
	className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 9,
	columnNumber: 3
}, void 0));
Card.displayName = "Card";
var CardHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	ref,
	className: cn("flex flex-col space-y-1.5 p-6", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 24,
	columnNumber: 3
}, void 0));
CardHeader.displayName = "CardHeader";
var CardTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	ref,
	className: cn("font-semibold leading-none tracking-tight", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 36,
	columnNumber: 3
}, void 0));
CardTitle.displayName = "CardTitle";
var CardDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 48,
	columnNumber: 3
}, void 0));
CardDescription.displayName = "CardDescription";
var CardContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	ref,
	className: cn("p-6 pt-0", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 60,
	columnNumber: 3
}, void 0));
CardContent.displayName = "CardContent";
var CardFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	ref,
	className: cn("flex items-center p-6 pt-0", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 68,
	columnNumber: 3
}, void 0));
CardFooter.displayName = "CardFooter";
var _jsxFileName = "/app/applet/src/routes/assistant.connect.tsx?tsr-split=component";
function useMcpUrl() {
	const [url, setUrl] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setUrl(new URL("/mcp", window.location.origin).toString());
	}, []);
	return url;
}
function normalizeSlug(name) {
	const slug = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 63);
	if (!slug) return "careerly";
	if ([
		"workspace",
		"computer-use",
		"claude-in-chrome",
		"claude-preview",
		"claude-browser"
	].includes(slug)) return `${slug}-app`;
	return slug;
}
function CopyField({ value, label }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const handleCopy = async () => {
		if (!value) return;
		try {
			await navigator.clipboard.writeText(value);
			setCopied(true);
			toast.success("Copié dans le presse-papiers");
			setTimeout(() => setCopied(false), 1500);
		} catch {
			toast.error("Impossible de copier automatiquement");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-xs font-medium text-muted-foreground uppercase tracking-wider",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 44,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
			type: "button",
			onClick: handleCopy,
			className: "group flex w-full items-center gap-3 rounded-xl border border-border/60 bg-card/60 p-3 text-left transition-colors hover:border-primary/40 hover:bg-card",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("code", {
				className: "flex-1 break-all font-mono text-sm text-foreground",
				children: value || "Chargement…"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 48,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "shrink-0 rounded-md bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary/20",
				children: copied ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 52,
					columnNumber: 21
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "size-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 52,
					columnNumber: 52
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 51,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 47,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 43,
		columnNumber: 10
	}, this);
}
function Step({ number, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
		className: "flex gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary",
			children: number
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 65,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "text-sm leading-relaxed text-foreground",
			children
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 68,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 64,
		columnNumber: 10
	}, this);
}
function ClientCard({ icon: Icon, name, description, active, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		type: "button",
		onClick,
		className: cn("flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all", active ? "border-primary/50 bg-primary/10 ring-1 ring-primary/30" : "border-border/60 bg-card/40 hover:bg-card/70"),
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "grid size-10 shrink-0 place-items-center rounded-lg bg-background",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "size-5 text-primary" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 88,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 87,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm font-semibold text-foreground",
				children: name
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 91,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-xs text-muted-foreground",
				children: description
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 92,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 90,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 86,
		columnNumber: 10
	}, this);
}
function ConnectPage() {
	const mcpUrl = useMcpUrl();
	const [client, setClient] = (0, import_react.useState)("claude");
	const slug = (0, import_react.useMemo)(() => normalizeSlug("careerly"), []);
	const claudeConnectUrl = (0, import_react.useMemo)(() => {
		if (!mcpUrl) return "";
		return `https://claude.ai/customize/connectors?${new URLSearchParams({
			modal: "add-custom-connector",
			connectorName: "Careerly",
			connectorUrl: mcpUrl
		}).toString()}`;
	}, [mcpUrl]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		eyebrow: "AI Studio",
		title: "Connecter une IA",
		subtitle: "Liez ChatGPT, Claude ou Cursor à votre compte Careerly en quelques clics.",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto max-w-3xl space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
					className: "overflow-hidden border-border/60 bg-card/60",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, {
						className: "pb-4",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "grid size-10 place-items-center rounded-xl bg-primary/15",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-5 text-primary" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 117,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 116,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, {
								className: "text-lg",
								children: "Serveur MCP Careerly"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 120,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardDescription, { children: "Votre assistant peut lire et mettre à jour vos candidatures, contacts et profil." }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 121,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 119,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 115,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 114,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CopyField, {
							value: mcpUrl,
							label: "URL du serveur MCP"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 129,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-xl border border-border/60 bg-background/50 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mb-3 text-sm font-medium text-foreground",
								children: "Choisir votre assistant"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 132,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ClientCard, {
										icon: Bot,
										name: "Claude (Anthropic)",
										description: "Meilleure expérience via le web ou Claude Code",
										active: client === "claude",
										onClick: () => setClient("claude")
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 136,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ClientCard, {
										icon: MessageSquare,
										name: "ChatGPT",
										description: "Nécessite le mode développeur activé",
										active: client === "chatgpt",
										onClick: () => setClient("chatgpt")
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 137,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ClientCard, {
										icon: Terminal,
										name: "Claude Code",
										description: "En ligne de commande dans votre terminal",
										active: client === "claude-code",
										onClick: () => setClient("claude-code")
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 138,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ClientCard, {
										icon: ExternalLink,
										name: "Autre client MCP",
										description: "Cursor, Windsurf, ou un client personnalisé",
										active: client === "other",
										onClick: () => setClient("other")
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 139,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 135,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 131,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 128,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 113,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tabs, {
					value: client,
					onValueChange: setClient,
					className: "w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsList, {
							className: "hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
									value: "claude",
									children: "Claude"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 148,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
									value: "chatgpt",
									children: "ChatGPT"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 149,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
									value: "claude-code",
									children: "Claude Code"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 150,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
									value: "other",
									children: "Autre"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 151,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 147,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
							value: "claude",
							className: "mt-0",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
								className: "border-border/60 bg-card/60",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, {
									className: "text-base",
									children: "Connecter Claude"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 157,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardDescription, { children: "Depuis l'interface web de Claude.ai" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 158,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 156,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
										className: "space-y-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Step, {
												number: 1,
												children: "Cliquez sur le bouton ci-dessous pour ouvrir Claude avec les champs pré-remplis."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 164,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Step, {
												number: 2,
												children: "Vérifiez le nom et l'URL, puis cliquez sur \"Add\"."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 168,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Step, {
												number: 3,
												children: "Claude vous redirige vers Careerly pour approuver la connexion."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 171,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Step, {
												number: 4,
												children: "Activez le connecteur depuis le composeur de chat, puis demandez à Claude d'utiliser Careerly."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 175,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 163,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										asChild: true,
										className: "w-full gap-2",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
											href: claudeConnectUrl,
											target: "_blank",
											rel: "noreferrer",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "size-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 182,
												columnNumber: 21
											}, this), "Ouvrir Claude avec Careerly pré-rempli"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 181,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 180,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 162,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 155,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 154,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
							value: "chatgpt",
							className: "mt-0",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
								className: "border-border/60 bg-card/60",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, {
									className: "text-base",
									children: "Connecter ChatGPT"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 193,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardDescription, { children: "Nécessite le mode développeur de ChatGPT" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 194,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 192,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
										className: "space-y-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Step, {
												number: 1,
												children: "Activez le mode développeur dans les paramètres ChatGPT (Advanced > Connectors)."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 200,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Step, {
												number: 2,
												children: "Ouvrez le formulaire \"New plugin\" via le lien ci-dessous."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 204,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Step, {
												number: 3,
												children: "Collez le nom \"Careerly\" et l'URL MCP affichée en haut de cette page."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 207,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Step, {
												number: 4,
												children: "Cochez la case de confirmation et créez le connecteur."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 211,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Step, {
												number: 5,
												children: "Activez Careerly depuis le composeur, puis demandez à ChatGPT d'interagir avec vos candidatures."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 214,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 199,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										asChild: true,
										variant: "outline",
										className: "w-full gap-2",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
											href: "https://chatgpt.com/plugins#settings/Connectors?create-connector=true&redirectAfter=%2Fplugins",
											target: "_blank",
											rel: "noreferrer",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "size-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 221,
												columnNumber: 21
											}, this), "Ouvrir le formulaire ChatGPT"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 220,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 219,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 198,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 191,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 190,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
							value: "claude-code",
							className: "mt-0",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
								className: "border-border/60 bg-card/60",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, {
									className: "text-base",
									children: "Connecter Claude Code"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 232,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardDescription, { children: "Dans votre terminal, une seule commande suffit" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 235,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 231,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
										className: "space-y-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Step, {
												number: 1,
												children: "Copiez la commande ci-dessous et exécutez-la dans votre terminal."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 241,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Step, {
												number: 2,
												children: [
													"Lancez Claude Code et exécutez",
													" ",
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("code", {
														className: "rounded bg-muted px-1 py-0.5 font-mono text-xs",
														children: "/mcp"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 247,
														columnNumber: 21
													}, this),
													" ",
													"pour vérifier la connexion."
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 245,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Step, {
												number: 3,
												children: "Authentifiez-vous avec votre compte Careerly quand Claude Code vous le demande."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 252,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Step, {
												number: 4,
												children: "Demandez à Claude Code d'utiliser Careerly."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 256,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 240,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CopyField, {
										value: mcpUrl ? `claude mcp add --scope user --transport http ${slug} '${mcpUrl.replace(/'/g, "'\"'\"'")}'` : "",
										label: "Commande d'installation"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 260,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 239,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 230,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 229,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
							value: "other",
							className: "mt-0",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
								className: "border-border/60 bg-card/60",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, {
									className: "text-base",
									children: "Autre client MCP"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 268,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardDescription, { children: "Cursor, Windsurf, ou un client personnalisé" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 269,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 267,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
									className: "space-y-4",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
										className: "space-y-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Step, {
												number: 1,
												children: "Ouvrez les paramètres MCP / Connecteurs de votre client."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 275,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Step, {
												number: 2,
												children: "Créez un nouveau serveur MCP distant (remote / HTTP)."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 278,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Step, {
												number: 3,
												children: "Nommez-le \"Careerly\" et collez l'URL affichée en haut de cette page."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 281,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Step, {
												number: 4,
												children: "Validez et suivez la fenêtre d'autorisation Careerly."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 285,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Step, {
												number: 5,
												children: "Activez le serveur, puis demandez à l'assistant d'utiliser Careerly."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 288,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 274,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 273,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 266,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 265,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 146,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
					className: "border-border/60 bg-card/60",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "size-5 text-primary" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 302,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, {
							className: "text-base",
							children: "Actualiser après une mise à jour"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 303,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 301,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardDescription, { children: "Les assistants mettent en cache la liste des outils. Après une modification de Careerly, actualisez le connecteur." }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 307,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 300,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
						className: "space-y-2 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-primary",
									children: "•"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 315,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Claude :" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 317,
									columnNumber: 19
								}, this), " Connectors > Careerly > Refresh / Update tools. Si l'URL a changé, supprimez le connecteur et recréez-le."] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 316,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 314,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-primary",
									children: "•"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 323,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "ChatGPT :" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 325,
									columnNumber: 19
								}, this), " Plugins > Careerly > Information > Refresh. Si l'URL a changé, supprimez l'app et recommencez."] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 324,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 322,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-primary",
									children: "•"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 331,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Claude Code :" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 333,
										columnNumber: 19
									}, this),
									" Nouvelle session pour recharger les outils. Si l'URL a changé :",
									" ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("code", {
										className: "rounded bg-muted px-1 py-0.5 font-mono text-xs",
										children: ["claude mcp remove ", slug]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 335,
										columnNumber: 19
									}, this),
									" ",
									"puis réinstallez avec la commande ci-dessus."
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 332,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 330,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-primary",
									children: "•"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 342,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Autre client :" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 344,
									columnNumber: 19
								}, this), " Rechargez le serveur MCP ou reconnectez-le avec la dernière URL."] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 343,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 341,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 313,
						columnNumber: 13
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 312,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 299,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 353,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						className: "hover:text-foreground hover:underline",
						children: "Retour au tableau de bord"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 354,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 352,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 111,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 110,
		columnNumber: 10
	}, this);
}
//#endregion
export { ConnectPage as component };

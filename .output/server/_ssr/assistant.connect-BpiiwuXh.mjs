import { a as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { At as ArrowLeft, E as RefreshCw, M as MessageSquare, Tt as Bot, _ as Sparkles, it as ExternalLink, lt as Copy, m as Terminal, yt as Check } from "../_libs/lucide-react.mjs";
import { M as cn, j as Button } from "./router-AVT1AZP0.mjs";
import { t as AppShell } from "./AppShell-BmQ9z9SM.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BYfOmXtJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assistant.connect-BpiiwuXh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Card = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
	...props
}));
Card.displayName = "Card";
var CardHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex flex-col space-y-1.5 p-6", className),
	...props
}));
CardHeader.displayName = "CardHeader";
var CardTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("font-semibold leading-none tracking-tight", className),
	...props
}));
CardTitle.displayName = "CardTitle";
var CardDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
CardDescription.displayName = "CardDescription";
var CardContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("p-6 pt-0", className),
	...props
}));
CardContent.displayName = "CardContent";
var CardFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex items-center p-6 pt-0", className),
	...props
}));
CardFooter.displayName = "CardFooter";
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium text-muted-foreground uppercase tracking-wider",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: handleCopy,
			className: "group flex w-full items-center gap-3 rounded-xl border border-border/60 bg-card/60 p-3 text-left transition-colors hover:border-primary/40 hover:bg-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
				className: "flex-1 break-all font-mono text-sm text-foreground",
				children: value || "Chargement…"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 rounded-md bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary/20",
				children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
			})]
		})]
	});
}
function Step({ number, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary",
			children: number
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm leading-relaxed text-foreground",
			children
		})]
	});
}
function ClientCard({ icon: Icon, name, description, active, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: cn("flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all", active ? "border-primary/50 bg-primary/10 ring-1 ring-primary/30" : "border-border/60 bg-card/40 hover:bg-card/70"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid size-10 shrink-0 place-items-center rounded-lg bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 text-primary" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold text-foreground",
				children: name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: description
			})]
		})]
	});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		eyebrow: "AI Studio",
		title: "Connecter une IA",
		subtitle: "Liez ChatGPT, Claude ou Cursor à votre compte Careerly en quelques clics.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "overflow-hidden border-border/60 bg-card/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						className: "pb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-10 place-items-center rounded-xl bg-primary/15",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5 text-primary" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								className: "text-lg",
								children: "Serveur MCP Careerly"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Votre assistant peut lire et mettre à jour vos candidatures, contacts et profil." })] })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyField, {
							value: mcpUrl,
							label: "URL du serveur MCP"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border/60 bg-background/50 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-3 text-sm font-medium text-foreground",
								children: "Choisir votre assistant"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientCard, {
										icon: Bot,
										name: "Claude (Anthropic)",
										description: "Meilleure expérience via le web ou Claude Code",
										active: client === "claude",
										onClick: () => setClient("claude")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientCard, {
										icon: MessageSquare,
										name: "ChatGPT",
										description: "Nécessite le mode développeur activé",
										active: client === "chatgpt",
										onClick: () => setClient("chatgpt")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientCard, {
										icon: Terminal,
										name: "Claude Code",
										description: "En ligne de commande dans votre terminal",
										active: client === "claude-code",
										onClick: () => setClient("claude-code")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientCard, {
										icon: ExternalLink,
										name: "Autre client MCP",
										description: "Cursor, Windsurf, ou un client personnalisé",
										active: client === "other",
										onClick: () => setClient("other")
									})
								]
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					value: client,
					onValueChange: setClient,
					className: "w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "claude",
									children: "Claude"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "chatgpt",
									children: "ChatGPT"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "claude-code",
									children: "Claude Code"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "other",
									children: "Autre"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "claude",
							className: "mt-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "border-border/60 bg-card/60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "text-base",
									children: "Connecter Claude"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Depuis l'interface web de Claude.ai" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
										className: "space-y-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
												number: 1,
												children: "Cliquez sur le bouton ci-dessous pour ouvrir Claude avec les champs pré-remplis."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
												number: 2,
												children: "Vérifiez le nom et l'URL, puis cliquez sur \"Add\"."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
												number: 3,
												children: "Claude vous redirige vers Careerly pour approuver la connexion."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
												number: 4,
												children: "Activez le connecteur depuis le composeur de chat, puis demandez à Claude d'utiliser Careerly."
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										className: "w-full gap-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: claudeConnectUrl,
											target: "_blank",
											rel: "noreferrer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" }), "Ouvrir Claude avec Careerly pré-rempli"]
										})
									})]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "chatgpt",
							className: "mt-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "border-border/60 bg-card/60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "text-base",
									children: "Connecter ChatGPT"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Nécessite le mode développeur de ChatGPT" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
										className: "space-y-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
												number: 1,
												children: "Activez le mode développeur dans les paramètres ChatGPT (Advanced > Connectors)."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
												number: 2,
												children: "Ouvrez le formulaire \"New plugin\" via le lien ci-dessous."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
												number: 3,
												children: "Collez le nom \"Careerly\" et l'URL MCP affichée en haut de cette page."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
												number: 4,
												children: "Cochez la case de confirmation et créez le connecteur."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
												number: 5,
												children: "Activez Careerly depuis le composeur, puis demandez à ChatGPT d'interagir avec vos candidatures."
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										variant: "outline",
										className: "w-full gap-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "https://chatgpt.com/plugins#settings/Connectors?create-connector=true&redirectAfter=%2Fplugins",
											target: "_blank",
											rel: "noreferrer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" }), "Ouvrir le formulaire ChatGPT"]
										})
									})]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "claude-code",
							className: "mt-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "border-border/60 bg-card/60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "text-base",
									children: "Connecter Claude Code"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Dans votre terminal, une seule commande suffit" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
										className: "space-y-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
												number: 1,
												children: "Copiez la commande ci-dessous et exécutez-la dans votre terminal."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Step, {
												number: 2,
												children: [
													"Lancez Claude Code et exécutez",
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
														className: "rounded bg-muted px-1 py-0.5 font-mono text-xs",
														children: "/mcp"
													}),
													" ",
													"pour vérifier la connexion."
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
												number: 3,
												children: "Authentifiez-vous avec votre compte Careerly quand Claude Code vous le demande."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
												number: 4,
												children: "Demandez à Claude Code d'utiliser Careerly."
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyField, {
										value: mcpUrl ? `claude mcp add --scope user --transport http ${slug} '${mcpUrl.replace(/'/g, "'\"'\"'")}'` : "",
										label: "Commande d'installation"
									})]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "other",
							className: "mt-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "border-border/60 bg-card/60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "text-base",
									children: "Autre client MCP"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Cursor, Windsurf, ou un client personnalisé" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									className: "space-y-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
										className: "space-y-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
												number: 1,
												children: "Ouvrez les paramètres MCP / Connecteurs de votre client."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
												number: 2,
												children: "Créez un nouveau serveur MCP distant (remote / HTTP)."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
												number: 3,
												children: "Nommez-le \"Careerly\" et collez l'URL affichée en haut de cette page."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
												number: 4,
												children: "Validez et suivez la fenêtre d'autorisation Careerly."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
												number: 5,
												children: "Activez le serveur, puis demandez à l'assistant d'utiliser Careerly."
											})
										]
									})
								})]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-border/60 bg-card/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-base",
							children: "Actualiser après une mise à jour"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Les assistants mettent en cache la liste des outils. Après une modification de Careerly, actualisez le connecteur." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-2 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "•"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Claude :" }), " Connectors > Careerly > Refresh / Update tools. Si l'URL a changé, supprimez le connecteur et recréez-le."] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "•"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "ChatGPT :" }), " Plugins > Careerly > Information > Refresh. Si l'URL a changé, supprimez l'app et recommencez."] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "•"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Claude Code :" }),
									" Nouvelle session pour recharger les outils. Si l'URL a changé :",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("code", {
										className: "rounded bg-muted px-1 py-0.5 font-mono text-xs",
										children: ["claude mcp remove ", slug]
									}),
									" ",
									"puis réinstallez avec la commande ci-dessus."
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "•"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Autre client :" }), " Rechargez le serveur MCP ou reconnectez-le avec la dernière URL."] })]
							})
						]
					}) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-foreground hover:underline",
						children: "Retour au tableau de bord"
					})]
				})
			]
		})
	});
}
//#endregion
export { ConnectPage as component };

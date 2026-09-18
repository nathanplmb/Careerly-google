import { o as __toESM } from "../_runtime.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as supabase } from "./client-6jjz1ame.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as useNavigate, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./server-BjfJ2E7A.mjs";
import { f as signOut } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as Send, D as RotateCcw, Dt as Compass, Et as Copy, F as PanelLeftOpen, H as LogIn, I as PanelLeftClose, It as ChevronRight, Jt as Bot, L as MessageSquare, Mt as Circle, O as RefreshCw, Ot as Coins, Pt as CircleAlert, S as Settings, V as LogOut, W as LoaderCircle, _ as Sparkles, c as UserPlus, gt as FilePen, k as Plus, l as UserCheck, nt as Info, o as User, p as Trash2, pt as FingerprintPattern, qt as Brain, t as Zap, y as SlidersVertical, zt as Check } from "../_libs/lucide-react.mjs";
import { a as Label2, c as Root2, d as SubTrigger2, f as Trigger, i as ItemIndicator2, l as Separator2, n as Content2, o as Portal2, r as Item2, s as RadioItem2, t as CheckboxItem2, u as SubContent2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { r as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { F as DialogHeader, G as AppShell, Ht as Button, I as DialogTitle, It as setCompteActif, J as TooltipProvider, K as Tooltip, L as Textarea, M as DialogContent, N as DialogDescription, P as DialogFooter, Ut as cn, X as createSsrRpc, Y as TooltipTrigger, bt as isFirebaseConfigured, ct as auth, d as Route$15, gt as getCompteActif, i as useCandidatures, j as Dialog, o as useProfil, q as TooltipContent } from "./router-D_hI9gD6.mjs";
import { n as buildCandidateContextFromProfil, r as normalizeCandidateContext, t as ChatRequestZodSchema } from "./chat.context-C99HGULU.mjs";
import { t as PERSONA_PROMPTS } from "./chat.prompt-kSSU_L-J.mjs";
import { i as enableBiometric, n as biometricSupported, r as disableBiometric, t as biometricEnabled } from "./biometric-CT0UcaTm.mjs";
import { t as Markdown } from "../_libs/react-markdown+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assistant-DbDEH7JJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var executeChatTurnServerFn = createServerFn({ method: "POST" }).validator((data) => {
	if (data && typeof data === "object") {
		const obj = data;
		if ("candidateContext" in obj && obj.candidateContext !== void 0) return ChatRequestZodSchema.parse({
			...obj,
			candidateContext: normalizeCandidateContext(obj.candidateContext)
		});
	}
	return ChatRequestZodSchema.parse(data);
}).handler(createSsrRpc("0860c3f6928439e19cf404851f7fd84cb3b48d8061e44bf1c3f88ac6dd586462"));
var _jsxFileName$7 = "/app/applet/src/components/ui/dropdown-menu.tsx";
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "ml-auto" }, void 0, false, {
		fileName: _jsxFileName$7,
		lineNumber: 37,
		columnNumber: 5
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName$7,
	lineNumber: 27,
	columnNumber: 3
}, void 0));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[9.5rem] overflow-hidden rounded-2xl border border-white/15 bg-card/92 backdrop-blur-2xl p-1.5 text-popover-foreground shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.25)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$7,
	lineNumber: 47,
	columnNumber: 3
}, void 0));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[9.5rem] overflow-y-auto overflow-x-hidden rounded-2xl border border-white/15 bg-card/92 backdrop-blur-2xl p-1.5 text-popover-foreground shadow-[0_20px_60px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.28)]", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$7,
	lineNumber: 64,
	columnNumber: 5
}, void 0) }, void 0, false, {
	fileName: _jsxFileName$7,
	lineNumber: 63,
	columnNumber: 3
}, void 0));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Item2, {
	ref,
	className: cn("relative flex cursor-pointer select-none items-center gap-2 rounded-xl px-2.5 py-1.5 text-sm outline-none transition-all hover:bg-white/10 hover:text-foreground focus:bg-white/12 focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$7,
	lineNumber: 84,
	columnNumber: 3
}, void 0));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-4 w-4" }, void 0, false, {
			fileName: _jsxFileName$7,
			lineNumber: 110,
			columnNumber: 9
		}, void 0) }, void 0, false, {
			fileName: _jsxFileName$7,
			lineNumber: 109,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$7,
		lineNumber: 108,
		columnNumber: 5
	}, void 0), children]
}, void 0, true, {
	fileName: _jsxFileName$7,
	lineNumber: 100,
	columnNumber: 3
}, void 0));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Circle, { className: "h-2 w-2 fill-current" }, void 0, false, {
			fileName: _jsxFileName$7,
			lineNumber: 133,
			columnNumber: 9
		}, void 0) }, void 0, false, {
			fileName: _jsxFileName$7,
			lineNumber: 132,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$7,
		lineNumber: 131,
		columnNumber: 5
	}, void 0), children]
}, void 0, true, {
	fileName: _jsxFileName$7,
	lineNumber: 123,
	columnNumber: 3
}, void 0));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$7,
	lineNumber: 147,
	columnNumber: 3
}, void 0));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$7,
	lineNumber: 163,
	columnNumber: 3
}, void 0));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$7,
		lineNumber: 176,
		columnNumber: 5
	}, void 0);
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var _jsxFileName$6 = "/app/applet/src/components/chat/ChatPersonaSelector.tsx";
var PERSONA_ICONS = {
	general_advisor: Sparkles,
	interview_coach: UserCheck,
	cv_expert: FilePen,
	job_strategist: Compass,
	salary_negotiator: Coins,
	custom: SlidersVertical
};
function ChatPersonaSelector({ currentPersona, onSelectPersona, onOpenCustomPromptModal }) {
	const Icon = PERSONA_ICONS[currentPersona] || Sparkles;
	const currentConfig = PERSONA_PROMPTS[currentPersona] || PERSONA_PROMPTS.general_advisor;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			variant: "outline",
			size: "sm",
			className: "h-8.5 gap-2 rounded-xl border-white/10 bg-[#131620] px-3 text-xs font-semibold text-zinc-200 shadow-xs hover:bg-[#181C28] hover:text-white",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "size-3.5 text-[#EC0040]" }, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 54,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "max-w-[140px] truncate sm:max-w-[200px]",
				children: currentConfig.title
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 55,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 49,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 48,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuContent, {
		align: "start",
		className: "w-72 p-1.5 shadow-xl bg-[#11141D] border-white/10 text-zinc-200",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuLabel, {
				className: "px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400",
				children: "Rôles & Consignes Spécialisées"
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 64,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuSeparator, { className: "my-1 bg-white/10" }, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 67,
				columnNumber: 9
			}, this),
			Object.keys(PERSONA_PROMPTS).map((pId) => {
				const p = PERSONA_PROMPTS[pId];
				const PIcon = PERSONA_ICONS[pId];
				const isSelected = pId === currentPersona;
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
					onClick: () => {
						onSelectPersona(pId);
						if (pId === "custom" && onOpenCustomPromptModal) onOpenCustomPromptModal();
					},
					className: "flex items-start gap-2.5 rounded-lg p-2 text-xs cursor-pointer focus:bg-white/[0.06] focus:text-white text-zinc-300",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-0.5 rounded-md bg-white/[0.04] border border-white/10 p-1 text-[#EC0040]",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PIcon, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 86,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 85,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-semibold text-zinc-100",
								children: p.title
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 90,
								columnNumber: 19
							}, this), isSelected && /* @__PURE__ */ (void 0)(Check, { className: "size-3.5 text-[#EC0040] shrink-0" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 92,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 89,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[11px] text-zinc-400 leading-tight mt-0.5 line-clamp-1",
							children: p.subtitle
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 95,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 88,
						columnNumber: 15
					}, this)]
				}, pId, true, {
					fileName: _jsxFileName$6,
					lineNumber: 75,
					columnNumber: 13
				}, this);
			})
		]
	}, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 60,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 47,
		columnNumber: 5
	}, this);
}
var _jsxFileName$5 = "/app/applet/src/components/chat/ChatModelSelector.tsx";
var MODELS = [
	{
		id: "gemini-3.5-flash",
		name: "Gemini 3.5 Flash",
		badge: "Général",
		description: "Équilibré et polyvalent pour toutes les tâches courantes",
		icon: Sparkles
	},
	{
		id: "gemini-3.1-pro-preview",
		name: "Gemini 3.1 Pro",
		badge: "Complexe",
		description: "Raisonnement avancé, simulations approfondies & cas complexes",
		icon: Brain
	},
	{
		id: "gemini-3.1-flash-lite",
		name: "Gemini 3.1 Flash Lite",
		badge: "Rapide",
		description: "Temps de réponse instantané pour questions et reformulations rapides",
		icon: Zap
	}
];
function ChatModelSelector({ currentModel, onSelectModel }) {
	const current = MODELS.find((m) => m.id === currentModel) || MODELS[0];
	const Icon = current.icon;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			variant: "outline",
			size: "sm",
			className: "h-8.5 gap-2 rounded-xl border-white/10 bg-[#131620] px-3 text-xs font-semibold text-zinc-200 shadow-xs hover:bg-[#181C28] hover:text-white",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "size-3.5 text-[#EC0040]" }, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 67,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "truncate",
					children: current.name
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 68,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "rounded-full bg-white/[0.06] border border-white/10 px-1.5 py-0.2 text-[10px] font-semibold text-zinc-300",
					children: current.badge
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 69,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$5,
			lineNumber: 62,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$5,
		lineNumber: 61,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuContent, {
		align: "end",
		className: "w-80 p-1.5 shadow-xl bg-[#11141D] border-white/10 text-zinc-200",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuLabel, {
				className: "px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400",
				children: "Modèle Gemini"
			}, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 78,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuSeparator, { className: "my-1 bg-white/10" }, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 81,
				columnNumber: 9
			}, this),
			MODELS.map((model) => {
				const MIcon = model.icon;
				const isSelected = model.id === currentModel;
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
					onClick: () => onSelectModel(model.id),
					className: "flex items-start gap-2.5 rounded-lg p-2 text-xs cursor-pointer focus:bg-white/[0.06] focus:text-white text-zinc-300",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-0.5 rounded-md bg-white/[0.04] border border-white/10 p-1 text-[#EC0040]",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MIcon, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 94,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 93,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-semibold text-zinc-100",
									children: model.name
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 99,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "rounded-md bg-white/[0.06] border border-white/10 px-1.5 py-0.2 text-[10px] font-medium text-zinc-400",
									children: model.badge
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 102,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 98,
								columnNumber: 19
							}, this), isSelected && /* @__PURE__ */ (void 0)(Check, { className: "size-3.5 text-[#EC0040] shrink-0" }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 107,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 97,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[11px] text-zinc-400 leading-tight mt-0.5",
							children: model.description
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 110,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 96,
						columnNumber: 15
					}, this)]
				}, model.id, true, {
					fileName: _jsxFileName$5,
					lineNumber: 88,
					columnNumber: 13
				}, this);
			})
		]
	}, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 74,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 60,
		columnNumber: 5
	}, this);
}
var _jsxFileName$4 = "/app/applet/src/components/chat/ChatMessageItem.tsx";
function ChatMessageItem({ message, onRetry, userPrenom }) {
	const isUser = message.role === "user";
	const [copied, setCopied] = (0, import_react.useState)(false);
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(message.content);
			setCopied(true);
			setTimeout(() => setCopied(false), 2e3);
		} catch {}
	};
	const formattedTime = (() => {
		try {
			return new Date(message.timestamp).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			});
		} catch {
			return "";
		}
	})();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn("group flex w-full gap-3 py-3 px-2 sm:px-4 transition-colors", isUser ? "flex-row-reverse" : "flex-row"),
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: cn("grid size-8 shrink-0 place-items-center rounded-xl text-xs font-bold shadow-xs backdrop-blur-md", isUser ? "bg-white/15 border border-white/20 text-foreground" : "bg-primary/15 border border-primary/30 text-primary"),
			children: isUser ? userPrenom ? userPrenom.slice(0, 2).toUpperCase() : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, { className: "size-4 text-foreground" }, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 71,
				columnNumber: 13
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4 text-primary" }, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 74,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 59,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: cn("flex max-w-[88%] sm:max-w-[80%] flex-col gap-1", isUser ? "items-end" : "items-start"),
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 text-[11px] text-muted-foreground px-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-semibold text-foreground",
							children: isUser ? userPrenom || "Vous" : "NACORA AI"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 86,
							columnNumber: 11
						}, this),
						message.modelUsed && !isUser && /* @__PURE__ */ (void 0)("span", {
							className: "rounded-md bg-white/5 border border-white/10 px-1.5 py-0.2 text-[10px] font-medium text-muted-foreground",
							children: message.modelUsed
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 90,
							columnNumber: 13
						}, this),
						formattedTime && /* @__PURE__ */ (void 0)("span", {
							className: "text-[10px] text-muted-foreground/70",
							children: formattedTime
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 95,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 85,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: cn("relative rounded-2xl px-4.5 py-3.5 text-sm leading-relaxed transition-all", isUser ? "bg-gradient-to-b from-[#EC0040]/90 to-[#D81A45]/95 text-white border border-white/30 shadow-[0_8px_25px_rgba(216,26,69,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] backdrop-blur-2xl rounded-tr-xs" : message.isError ? "bg-red-950/40 border border-red-500/35 text-red-100 rounded-tl-xs backdrop-blur-2xl shadow-md" : "glass-card border-white/14 text-foreground rounded-tl-xs shadow-[0_8px_25px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)]"),
					children: isUser ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "whitespace-pre-wrap break-words",
						children: message.content
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 112,
						columnNumber: 13
					}, this) : message.isError ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleAlert, { className: "size-4 shrink-0 text-destructive mt-0.5" }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 115,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs font-semibold",
								children: message.content
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 117,
								columnNumber: 17
							}, this), onRetry && /* @__PURE__ */ (void 0)(Button, {
								size: "sm",
								variant: "outline",
								onClick: onRetry,
								className: "mt-2 h-7 gap-1.5 rounded-lg border-destructive/30 text-xs text-destructive hover:bg-destructive/10",
								children: [/* @__PURE__ */ (void 0)(RefreshCw, { className: "size-3" }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 125,
									columnNumber: 21
								}, this), " Réessayer"]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 119,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 116,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 114,
						columnNumber: 13
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "prose prose-sm dark:prose-invert max-w-none text-foreground/90 break-words space-y-2 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-0.5 [&_code]:bg-white/10 [&_code]:border [&_code]:border-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:text-xs [&_pre]:bg-black/40 [&_pre]:border [&_pre]:border-white/10 [&_pre]:p-3 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_strong]:font-semibold [&_strong]:text-foreground [&_h1]:text-base [&_h2]:text-sm [&_h3]:text-sm [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-semibold [&_h1]:text-foreground [&_h2]:text-foreground [&_h3]:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Markdown, { children: message.content }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 132,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 131,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 101,
					columnNumber: 9
				}, this),
				!isUser && !message.isError && /* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-1 px-1 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity",
					children: /* @__PURE__ */ (void 0)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: handleCopy,
						className: "h-6 gap-1 rounded-md px-1.5 text-[11px] text-muted-foreground hover:text-foreground",
						children: copied ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Check, { className: "size-3 text-emerald-500" }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 148,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)("span", {
							className: "text-emerald-500",
							children: "Copié"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 149,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 147,
							columnNumber: 17
						}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Copy, { className: "size-3" }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 153,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)("span", { children: "Copier" }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 154,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 152,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 140,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 139,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 79,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 52,
		columnNumber: 5
	}, this);
}
var _jsxFileName$3 = "/app/applet/src/components/chat/CustomPromptDialog.tsx";
function CustomPromptDialog({ open, onOpenChange, systemInstruction, onSave }) {
	const [value, setValue] = (0, import_react.useState)(systemInstruction);
	(0, import_react.useEffect)(() => {
		setValue(systemInstruction);
	}, [systemInstruction, open]);
	const handleSave = () => {
		onSave(value);
		onOpenChange(false);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
			className: "sm:max-w-[550px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 text-primary mb-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SlidersVertical, { className: "size-4.5" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 43,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
						className: "text-base font-bold",
						children: "Consignes Système Personnalisées"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 44,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 42,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
					className: "text-xs text-muted-foreground leading-relaxed",
					children: "Définissez le rôle, le ton et les contraintes spécifiques que Gemini doit adopter pour vos échanges."
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 48,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 41,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "py-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
						value,
						onChange: (e) => setValue(e.target.value),
						placeholder: "Ex : Tu es un recruteur senior dans le domaine de la tech spécialisé dans les postes de Lead Dev. Sois direct, exigeant et privilégie des réponses courtes.",
						className: "min-h-[140px] text-xs resize-none rounded-xl"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 55,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1.5 text-[11px] text-muted-foreground/70",
						children: "Ces instructions seront injectées en tant que `systemInstruction` pour orienter les réponses du modèle."
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 61,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 54,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, {
					className: "gap-2 sm:gap-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => onOpenChange(false),
						className: "rounded-xl",
						children: "Annuler"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 68,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						onClick: handleSave,
						className: "gap-1.5 rounded-xl bg-primary text-primary-foreground font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 81,
							columnNumber: 13
						}, this), " Enregistrer les consignes"]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 76,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 67,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 40,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 39,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/app/applet/src/components/chat/ChatContainer.tsx";
var STORAGE_KEY = "nacora_gemini_chat_sessions_v1";
var ACTIVE_SESSION_KEY = "nacora_active_chat_session_id";
var SUGGESTIONS_BY_PERSONA = {
	general_advisor: [
		"Comment structurer efficacement mes recherches d'emploi cette semaine ?",
		"Quelles sont les compétences les plus recherchées pour mon profil ?",
		"Comment relancer une candidature sans paraître trop insistant ?",
		"Aide-moi à définir mes points forts et axes de différenciation"
	],
	interview_coach: [
		"Faisons une simulation d'entretien : pose-moi la première question",
		"Comment répondre à la question : 'Parlez-moi d'un échec récent' ?",
		"Quelles questions pertinentes puis-je poser au recruteur en fin d'entretien ?",
		"Entraîne-moi à structurer mes réponses selon la méthode STAR"
	],
	cv_expert: [
		"Comment transformer mes tâches quotidiennes en accomplissements chiffrés ?",
		"Rédige-moi une phrase d'accroche percutante pour le haut de mon CV",
		"Quels mots-clés ATS intégrer pour un poste de chef de projet / ingénieur ?",
		"Rédige un modèle d'email court et accrocheur pour accompagner ma candidature"
	],
	job_strategist: [
		"Comment approcher directement des managers opérationnels sur LinkedIn ?",
		"Quelle stratégie adopter pour pénétrer le marché caché de l'emploi ?",
		"Rédige un message d'invitation LinkedIn personnalisé sans faire vendeur",
		"Comment cibler des entreprises qui recrutent avant même la publication d'offres ?"
	],
	salary_negotiator: [
		"Quelle fourchette de salaire demander pour mon niveau d'expérience ?",
		"Comment réagir si l'offre salariale proposée est inférieure à mes attentes ?",
		"Quels éléments négocier au-delà du salaire fixe (primes, télétravail, congés) ?",
		"Donne-moi un script exact pour aborder la question de la rémunération"
	],
	custom: ["Présente-toi et dis-moi comment tu peux m'aider avec tes consignes actuelles", "Propose-moi un plan d'action personnalisé"]
};
function ChatContainer({ userPrenom, candidateProfile, initialPersona }) {
	const [sessions, setSessions] = (0, import_react.useState)([]);
	const [activeSessionId, setActiveSessionId] = (0, import_react.useState)(null);
	const [inputMessage, setInputMessage] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [customPromptModalOpen, setCustomPromptModalOpen] = (0, import_react.useState)(false);
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(true);
	const messagesEndRef = (0, import_react.useRef)(null);
	const textareaRef = (0, import_react.useRef)(null);
	const saveSessions = (0, import_react.useCallback)((newSessions) => {
		setSessions(newSessions);
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(newSessions));
		} catch {}
	}, []);
	const currentSession = (0, import_react.useMemo)(() => {
		return sessions.find((s) => s.id === activeSessionId) || sessions[0];
	}, [sessions, activeSessionId]);
	const handleUpdateCurrentSession = (0, import_react.useCallback)((patch) => {
		if (!currentSession) return;
		const updated = sessions.map((s) => s.id === currentSession.id ? {
			...s,
			...patch,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		} : s);
		saveSessions(updated);
	}, [
		currentSession,
		sessions,
		saveSessions
	]);
	const scrollToBottom = (behavior = "smooth") => {
		messagesEndRef.current?.scrollIntoView({ behavior });
	};
	(0, import_react.useEffect)(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			const activeId = localStorage.getItem(ACTIVE_SESSION_KEY);
			let parsedSessions = stored ? JSON.parse(stored) : [];
			if (parsedSessions.length === 0) {
				parsedSessions = [{
					id: "session_" + Date.now(),
					title: "Nouvelle discussion",
					personaId: initialPersona || "general_advisor",
					modelId: "gemini-3.5-flash",
					messages: [],
					createdAt: (/* @__PURE__ */ new Date()).toISOString(),
					updatedAt: (/* @__PURE__ */ new Date()).toISOString()
				}];
				localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedSessions));
			}
			setSessions(parsedSessions);
			const targetId = activeId && parsedSessions.some((s) => s.id === activeId) ? activeId : parsedSessions[0].id;
			setActiveSessionId(targetId);
		} catch {
			const defaultSession = {
				id: "session_" + Date.now(),
				title: "Nouvelle discussion",
				personaId: initialPersona || "general_advisor",
				modelId: "gemini-3.5-flash",
				messages: [],
				createdAt: (/* @__PURE__ */ new Date()).toISOString(),
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			};
			setSessions([defaultSession]);
			setActiveSessionId(defaultSession.id);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (initialPersona && currentSession && currentSession.personaId !== initialPersona) handleUpdateCurrentSession({ personaId: initialPersona });
	}, [
		initialPersona,
		currentSession,
		handleUpdateCurrentSession
	]);
	(0, import_react.useEffect)(() => {
		scrollToBottom("auto");
	}, [activeSessionId]);
	(0, import_react.useEffect)(() => {
		scrollToBottom("smooth");
	}, [currentSession?.messages.length, loading]);
	const handleSelectSession = (id) => {
		setActiveSessionId(id);
		localStorage.setItem(ACTIVE_SESSION_KEY, id);
	};
	const handleCreateNewSession = (persona) => {
		const newSession = {
			id: "session_" + Date.now(),
			title: "Nouvelle discussion",
			personaId: persona || currentSession?.personaId || "general_advisor",
			modelId: currentSession?.modelId || "gemini-3.5-flash",
			messages: [],
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		const updated = [newSession, ...sessions];
		saveSessions(updated);
		setActiveSessionId(newSession.id);
		localStorage.setItem(ACTIVE_SESSION_KEY, newSession.id);
		setTimeout(() => textareaRef.current?.focus(), 50);
	};
	const handleDeleteSession = (id, e) => {
		e.stopPropagation();
		const filtered = sessions.filter((s) => s.id !== id);
		if (filtered.length === 0) {
			const resetSession = {
				id: "session_" + Date.now(),
				title: "Nouvelle discussion",
				personaId: "general_advisor",
				modelId: "gemini-3.5-flash",
				messages: [],
				createdAt: (/* @__PURE__ */ new Date()).toISOString(),
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			};
			saveSessions([resetSession]);
			setActiveSessionId(resetSession.id);
		} else {
			saveSessions(filtered);
			if (activeSessionId === id) setActiveSessionId(filtered[0].id);
		}
		toast.success("Discussion supprimée");
	};
	const handleSendMessage = async (textToSend) => {
		const text = (textToSend ?? inputMessage).trim();
		if (!text || loading || !currentSession) return;
		const userMsg = {
			id: "msg_" + Date.now(),
			role: "user",
			content: text,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		};
		const newMessages = [...currentSession.messages, userMsg];
		let title = currentSession.title;
		if (currentSession.messages.length === 0) title = text.slice(0, 35) + (text.length > 35 ? "..." : "");
		const updatedCurrent = {
			...currentSession,
			title,
			messages: newMessages,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		const updatedSessions = sessions.map((s) => s.id === currentSession.id ? updatedCurrent : s);
		saveSessions(updatedSessions);
		setInputMessage("");
		setLoading(true);
		try {
			const response = await executeChatTurnServerFn({ data: {
				messages: newMessages.map((m) => ({
					role: m.role,
					content: m.content
				})),
				modelId: currentSession.modelId,
				personaId: currentSession.personaId,
				customSystemInstruction: currentSession.customSystemInstruction,
				candidateContext: normalizeCandidateContext(candidateProfile)
			} });
			const assistantMsg = {
				id: "msg_bot_" + Date.now(),
				role: "assistant",
				content: response.reply,
				timestamp: response.timestamp,
				modelUsed: response.modelUsed
			};
			const finalMessages = [...newMessages, assistantMsg];
			const finalizedSession = {
				...updatedCurrent,
				messages: finalMessages,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			};
			saveSessions(sessions.map((s) => s.id === currentSession.id ? finalizedSession : s));
		} catch (err) {
			const errorMsg = err instanceof Error ? err.message : "Erreur lors de la réponse de Gemini.";
			const assistantErrorMsg = {
				id: "msg_bot_err_" + Date.now(),
				role: "assistant",
				content: `Désolé, une erreur s'est produite : ${errorMsg}`,
				timestamp: (/* @__PURE__ */ new Date()).toISOString(),
				isError: true
			};
			const finalMessages = [...newMessages, assistantErrorMsg];
			saveSessions(sessions.map((s) => s.id === currentSession.id ? {
				...updatedCurrent,
				messages: finalMessages
			} : s));
		} finally {
			setLoading(false);
			setTimeout(() => textareaRef.current?.focus(), 50);
		}
	};
	const handleRetryLast = () => {
		if (!currentSession || currentSession.messages.length === 0) return;
		const lastUserMsg = [...currentSession.messages].reverse().find((m) => m.role === "user");
		if (!lastUserMsg) return;
		const trimmed = currentSession.messages.filter((m) => !m.isError);
		handleUpdateCurrentSession({ messages: trimmed });
		handleSendMessage(lastUserMsg.content);
	};
	const handleClearThread = () => {
		if (!currentSession) return;
		handleUpdateCurrentSession({
			messages: [],
			title: "Nouvelle discussion"
		});
		toast.success("Historique effacé pour cette discussion");
	};
	const suggestions = SUGGESTIONS_BY_PERSONA[currentSession?.personaId || "general_advisor"] || [];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TooltipProvider, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "glass-panel-elevated flex h-[calc(100vh-140px)] min-h-[550px] w-full overflow-hidden rounded-3xl border-white/15 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.25)]",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
			className: cn("flex flex-col border-r border-white/12 bg-white/[0.03] backdrop-blur-2xl transition-all duration-300 shrink-0", sidebarOpen ? "w-64 sm:w-72" : "w-0 overflow-hidden border-r-0"),
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex h-14 items-center justify-between border-b border-white/10 px-3.5 bg-white/[0.04] backdrop-blur-md",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageSquare, { className: "size-4 text-muted-foreground" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 379,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs font-bold uppercase tracking-wider text-foreground",
							children: "Discussions"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 380,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 378,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => handleCreateNewSession(),
						className: "h-8 gap-1.5 rounded-xl border-none bg-white/10 text-xs font-semibold text-foreground hover:bg-white/20 shadow-xs cursor-pointer backdrop-blur-md",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 390,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Nouveau" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 391,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 384,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 377,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex-1 overflow-y-auto p-2 space-y-1",
					children: sessions.map((sess) => {
						const isActive = sess.id === activeSessionId;
						const personaConfig = PERSONA_PROMPTS[sess.personaId];
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							onClick: () => handleSelectSession(sess.id),
							className: cn("group relative flex items-center justify-between gap-2 rounded-xl p-2.5 text-xs transition-all cursor-pointer", isActive ? "bg-white/15 text-foreground font-semibold shadow-xs backdrop-blur-md" : "text-muted-foreground hover:bg-white/8 hover:text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2.5 min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bot, { className: cn("size-3.5 shrink-0", isActive ? "text-primary" : "text-muted-foreground") }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 412,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: cn("truncate text-xs", isActive ? "font-semibold text-foreground" : "font-normal text-muted-foreground"),
										children: sess.title
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 419,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "truncate text-[10px] text-muted-foreground/70 mt-0.5",
										children: [
											personaConfig?.title || "Assistant",
											" •",
											" ",
											sess.messages.length,
											" msg"
										]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 429,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 418,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 411,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: (e) => handleDeleteSession(sess.id, e),
								className: "grid size-6 place-items-center rounded-md text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-destructive/15 hover:text-destructive transition-all cursor-pointer",
								title: "Supprimer la discussion",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-3" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 442,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 436,
								columnNumber: 19
							}, this)]
						}, sess.id, true, {
							fileName: _jsxFileName$2,
							lineNumber: 401,
							columnNumber: 17
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 395,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "border-t border-white/10 p-3 bg-white/5",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 text-[11px] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5 text-primary shrink-0" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 452,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "truncate font-medium",
							children: "Propulsé par Google Gemini"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 453,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 451,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 450,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 371,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-1 min-w-0 flex-col bg-transparent",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
					className: "flex h-14 shrink-0 items-center justify-between border-b border-white/12 px-3 sm:px-5 bg-white/[0.04] backdrop-blur-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => setSidebarOpen(!sidebarOpen),
								className: "h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10",
								title: sidebarOpen ? "Masquer l'historique" : "Afficher l'historique",
								children: sidebarOpen ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PanelLeftClose, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 475,
									columnNumber: 19
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PanelLeftOpen, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 477,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 465,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChatPersonaSelector, {
								currentPersona: currentSession?.personaId || "general_advisor",
								onSelectPersona: (pId) => handleUpdateCurrentSession({ personaId: pId }),
								onOpenCustomPromptModal: () => setCustomPromptModalOpen(true)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 481,
								columnNumber: 15
							}, this),
							currentSession?.personaId === "custom" && /* @__PURE__ */ (void 0)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => setCustomPromptModalOpen(true),
								className: "h-8 gap-1 rounded-xl px-2 text-xs text-muted-foreground hover:text-foreground hover:bg-white/10",
								title: "Modifier les consignes personnalisées",
								children: [/* @__PURE__ */ (void 0)(SlidersVertical, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 497,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "hidden sm:inline",
									children: "Consignes"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 498,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 490,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 464,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChatModelSelector, {
							currentModel: currentSession?.modelId || "gemini-3.5-flash",
							onSelectModel: (mId) => handleUpdateCurrentSession({ modelId: mId })
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 504,
							columnNumber: 15
						}, this), currentSession && currentSession.messages.length > 0 && /* @__PURE__ */ (void 0)(Tooltip, { children: [/* @__PURE__ */ (void 0)(TooltipTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (void 0)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: handleClearThread,
								className: "h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/15",
								children: /* @__PURE__ */ (void 0)(RotateCcw, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 520,
									columnNumber: 23
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 514,
								columnNumber: 21
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 513,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)(TooltipContent, {
							className: "text-xs glass-panel",
							children: "Effacer cette discussion"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 523,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 512,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 503,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 463,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex-1 overflow-y-auto p-3 sm:p-5 space-y-2",
					children: currentSession?.messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex min-h-full flex-col items-center justify-center p-4 text-center max-w-xl mx-auto my-auto animate-in fade-in-50 duration-300",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative mb-4 grid size-14 place-items-center rounded-2xl bg-white/10 text-foreground shadow-lg backdrop-blur-2xl",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-7 text-primary drop-shadow-[0_0_12px_rgba(216,26,69,0.6)]" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 537,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 536,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-base sm:text-lg font-bold text-foreground",
								children: PERSONA_PROMPTS[currentSession.personaId]?.title || "NACORA AI Coach"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 540,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-xs text-muted-foreground max-w-md",
								children: PERSONA_PROMPTS[currentSession.personaId]?.subtitle || "Posez vos questions ou lancez une simulation pour booster vos candidatures."
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 544,
								columnNumber: 17
							}, this),
							candidateProfile?.titreVise && /* @__PURE__ */ (void 0)("div", {
								className: "mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3.5 py-1 text-xs text-muted-foreground font-medium backdrop-blur-md",
								children: [
									/* @__PURE__ */ (void 0)(Info, { className: "size-3 text-primary" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 551,
										columnNumber: 21
									}, this),
									"Profil ciblé : ",
									candidateProfile.titreVise
								]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 550,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-6 grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 text-left",
								children: suggestions.map((suggestion, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => handleSendMessage(suggestion),
									className: "glass-card-interactive group flex items-center justify-between gap-2 p-3.5 text-xs text-muted-foreground transition-all hover:text-foreground cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "line-clamp-2 leading-snug font-medium",
										children: suggestion
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 565,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "size-3.5 shrink-0 text-muted-foreground/60 group-hover:text-primary group-hover:translate-x-0.5 transition-all" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 568,
										columnNumber: 23
									}, this)]
								}, idx, true, {
									fileName: _jsxFileName$2,
									lineNumber: 559,
									columnNumber: 21
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 557,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 535,
						columnNumber: 15
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
						currentSession?.messages.map((msg) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChatMessageItem, {
							message: msg,
							userPrenom,
							onRetry: msg.isError ? handleRetryLast : void 0
						}, msg.id, false, {
							fileName: _jsxFileName$2,
							lineNumber: 577,
							columnNumber: 19
						}, this)),
						loading && /* @__PURE__ */ (void 0)("div", {
							className: "flex w-full gap-3 py-3 px-2 sm:px-4",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "grid size-8 shrink-0 place-items-center rounded-xl bg-white/10 text-primary backdrop-blur-md",
								children: /* @__PURE__ */ (void 0)(Sparkles, { className: "size-4 animate-spin" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 589,
									columnNumber: 23
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 588,
								columnNumber: 21
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex flex-col gap-1",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-[11px] font-semibold text-muted-foreground px-1",
									children: [
										"NACORA AI (",
										currentSession.modelId,
										")"
									]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 592,
									columnNumber: 23
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-1.5 rounded-2xl rounded-tl-xs bg-white/8 px-4 py-3 text-xs text-muted-foreground backdrop-blur-xl shadow-xs",
									children: [
										/* @__PURE__ */ (void 0)("span", { className: "inline-block size-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 596,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (void 0)("span", { className: "inline-block size-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 597,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (void 0)("span", { className: "inline-block size-2 rounded-full bg-primary animate-bounce" }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 598,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (void 0)("span", {
											className: "ml-2 text-[11px] text-muted-foreground font-medium",
											children: "Réflexion en cours..."
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 599,
											columnNumber: 25
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 595,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 591,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 587,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { ref: messagesEndRef }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 606,
							columnNumber: 17
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 575,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 532,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "border-t border-white/12 p-3 sm:p-4 bg-white/[0.03] backdrop-blur-2xl",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mx-auto max-w-4xl",
						children: [
							currentSession && currentSession.messages.length > 0 && !loading && /* @__PURE__ */ (void 0)("div", {
								className: "mb-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-[11px] font-semibold text-muted-foreground shrink-0",
									children: "Suggestions :"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 619,
									columnNumber: 21
								}, this), suggestions.slice(0, 3).map((s, idx) => /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => handleSendMessage(s),
									className: "shrink-0 rounded-full bg-white/8 border border-white/10 backdrop-blur-md px-3 py-1 text-[11px] text-muted-foreground hover:bg-white/15 hover:text-foreground transition-all cursor-pointer shadow-xs",
									children: [s.slice(0, 32), "..."]
								}, idx, true, {
									fileName: _jsxFileName$2,
									lineNumber: 623,
									columnNumber: 23
								}, this))]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 618,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative flex items-end gap-2 rounded-2xl border border-white/14 bg-white/6 backdrop-blur-2xl px-3.5 py-2 shadow-[inset_0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.12)] focus-within:border-primary/60 focus-within:bg-white/10 transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
									ref: textareaRef,
									value: inputMessage,
									onChange: (e) => setInputMessage(e.target.value),
									onKeyDown: (e) => {
										if (e.key === "Enter" && !e.shiftKey) {
											e.preventDefault();
											handleSendMessage();
										}
									},
									placeholder: currentSession?.personaId === "interview_coach" ? "Répondez à la simulation ou demandez un entraînement..." : currentSession?.personaId === "salary_negotiator" ? "Indiquez l'offre ou la question sur votre rémunération..." : "Posez votre question à NACORA AI (Entrée pour envoyer)...",
									rows: 1,
									disabled: loading,
									className: "min-h-[44px] max-h-36 flex-1 resize-none border-0 bg-transparent p-1.5 text-xs text-foreground placeholder:text-muted-foreground focus-visible:ring-0 shadow-none leading-relaxed"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 636,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									type: "button",
									size: "sm",
									disabled: !inputMessage.trim() || loading,
									onClick: () => handleSendMessage(),
									className: "size-9 shrink-0 rounded-xl glass-btn-primary font-semibold disabled:opacity-30 transition-all cursor-pointer",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 665,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 658,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 635,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-2 flex items-center justify-between px-1 text-[10px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "hidden sm:inline",
									children: "Maj + Entrée pour retour à la ligne"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 670,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Modèle actif :" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 674,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
										className: "text-foreground font-medium",
										children: currentSession?.modelId
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 675,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 673,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 669,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 613,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 612,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 461,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 369,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CustomPromptDialog, {
		open: customPromptModalOpen,
		onOpenChange: setCustomPromptModalOpen,
		systemInstruction: currentSession?.customSystemInstruction || "",
		onSave: (instruction) => handleUpdateCurrentSession({
			customSystemInstruction: instruction,
			personaId: "custom"
		})
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 686,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 368,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/AccountMenu.tsx";
function AccountMenu({ user }) {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [bio, setBio] = (0, import_react.useState)(false);
	const [supported, setSupported] = (0, import_react.useState)(false);
	const localCompte = getCompteActif();
	const displayName = user?.user_metadata?.["full_name"] || (localCompte?.prenom ? `${localCompte.prenom} ${localCompte.nom || ""}`.trim() : null) || user?.email?.split("@")[0] || "Mon compte";
	const initials = (localCompte?.prenom?.[0] || user?.email?.[0] || "U").toUpperCase();
	(0, import_react.useEffect)(() => {
		setSupported(biometricSupported());
		if (user?.id) setBio(biometricEnabled(user.id));
		else setBio(false);
	}, [user?.id]);
	const toggleBio = async () => {
		if (!user) return;
		if (bio) {
			disableBiometric(user.id);
			setBio(false);
			toast.success("Déverrouillage biométrique désactivé.");
			return;
		}
		try {
			await enableBiometric(user.id, user.email ?? "");
			setBio(true);
			toast.success("Déverrouillage biométrique activé sur cet appareil.");
		} catch {
			toast.error("Impossible d'activer la biométrie sur cet appareil.");
		}
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
			console.warn("Erreur purge cache local:", err);
		}
		if (isFirebaseConfigured()) try {
			await signOut(auth);
		} catch (err) {
			console.warn("Erreur déconnexion Firebase:", err);
		}
		try {
			await supabase.auth.signOut();
		} catch (err) {
			console.warn("Erreur déconnexion Supabase:", err);
		}
		toast.success("Déconnexion réussie");
		navigate({
			to: "/auth",
			replace: true
		});
	};
	if (!user) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
		asChild: true,
		size: "sm",
		variant: "outline",
		className: "gap-2 border-primary/30 hover:bg-primary/5",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
			to: "/auth",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogIn, { className: "size-4 text-primary" }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 125,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Connexion" }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 126,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 124,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 118,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			variant: "outline",
			size: "sm",
			className: "gap-2 border-border/80 hover:bg-accent px-2.5",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex size-5 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary",
				children: initials
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 140,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "max-w-28 truncate text-xs font-medium",
				children: displayName
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 143,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 135,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 134,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuContent, {
		align: "end",
		className: "w-64 p-1.5 shadow-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuLabel, {
				className: "p-2 font-normal",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-sm font-semibold text-foreground truncate",
								children: displayName
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 152,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "inline-flex items-center gap-1 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserCheck, { className: "size-3" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 156,
									columnNumber: 17
								}, this), " Connecté"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 155,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 151,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground truncate",
							children: user.email
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 159,
							columnNumber: 13
						}, this),
						localCompte?.ecole && /* @__PURE__ */ (void 0)("p", {
							className: "text-[11px] text-muted-foreground/80 truncate",
							children: ["🎓 ", localCompte.ecole]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 163,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 150,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 149,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuSeparator, {}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 170,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/parametres",
					className: "cursor-pointer gap-2 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Settings, { className: "size-4 text-muted-foreground" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 174,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Paramètres & Profil" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 175,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 173,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 172,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/auth",
					className: "cursor-pointer gap-2 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserPlus, { className: "size-4 text-muted-foreground" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 181,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Changer de compte" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 182,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 180,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 179,
				columnNumber: 9
			}, this),
			supported && /* @__PURE__ */ (void 0)(DropdownMenuItem, {
				className: "cursor-pointer gap-2 text-xs",
				onSelect: (e) => {
					e.preventDefault();
					toggleBio();
				},
				children: [/* @__PURE__ */ (void 0)(FingerprintPattern, { className: "size-4 text-muted-foreground" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 194,
					columnNumber: 13
				}, this), /* @__PURE__ */ (void 0)("span", { children: bio ? "Désactiver la biométrie" : "Activer la biométrie" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 195,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 187,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuSeparator, {}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 201,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
				className: "cursor-pointer gap-2 text-xs text-destructive focus:bg-destructive/10 focus:text-destructive",
				onSelect: () => void signOut$1(),
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { className: "size-4" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 207,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Se déconnecter" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 208,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 203,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 148,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 133,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/assistant.tsx?tsr-split=component";
function AssistantPage() {
	const search = Route$15.useSearch();
	const { user, authLoading } = useCandidatures();
	const profil = useProfil(user);
	const candidateProfile = (0, import_react.useMemo)(() => profil ? buildCandidateContextFromProfil(profil) : void 0, [profil]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		title: "NACORA AI",
		subtitle: "Votre copilote conversationnel propulsé par Google Gemini",
		eyebrow: "Intelligence Artificielle",
		actions: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-2",
			children: [authLoading && /* @__PURE__ */ (void 0)(LoaderCircle, { className: "size-4 animate-spin text-muted-foreground/80" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 19,
				columnNumber: 27
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccountMenu, { user }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 20,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 18,
			columnNumber: 152
		}, this),
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChatContainer, {
				userPrenom: profil?.prenom,
				candidateProfile,
				initialPersona: search.persona
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 23,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 22,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 18,
		columnNumber: 10
	}, this);
}
//#endregion
export { AssistantPage as component };

import { o as __toESM } from "../_runtime.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { n as supabase, t as isSupabaseConfigured } from "./client-6jjz1ame.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as Overlay2, c as Title2, d as DialogContent$1, f as DialogDescription$1, h as DialogTitle$1, i as Description2, l as Dialog$1, m as DialogPortal$1, n as Cancel, o as Portal2, p as DialogOverlay$1, r as Content2, s as Root2, t as Action, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { A as CATEGORIES_CONTACT, At as parseVCardString, B as TYPES_ENTRETIEN, Bt as transitionWorkflowStep, C as fetchContacts, D as useContacts, E as useContactImport, Gt as cn, H as WORKFLOW_STEPS_CONFIG, Ht as workflowStepKeyToStatut, I as SOURCE_LABELS, K as computeContactRelevance, Lt as statutToWorkflowStepKey, M as LIBELLES_RELANCE, Mt as saveCandidatures, Nt as saveContactsLocal, O as useSession, Ot as parseLinkedInCsv, Pt as saveProfilLocal, Q as emptyPreparation, S as createSsrRpc, St as nouvelEchange, T as upsertContact, Ut as Button, V as TYPES_RELANCE, Vt as validerIntegriteCandidature, W as auth, Wt as buttonVariants, Y as db, Z as emptyContact, _t as loadProfil, a as Textarea, b as batchUpsertContacts, c as Select, ct as getContactFullName, d as SelectTrigger, dt as getWorkflowStepConfig, et as enrichContactWithoutLoss, f as SelectValue, gt as loadContactsLocal, h as OperationType, ht as loadCandidatures, i as Badge, it as getCategoryBadgeStyle, j as CHANNELS_COMMUNICATION, k as CANAUX, kt as parseRawContactInput, l as SelectContent, lt as getContactJobTitle, m as ContactImportProvider, mt as isFirebaseConfigured, nt as findPotentialDuplicate, o as Label, p as AppShell, r as Progress, rt as formatDate, s as Input, st as getContactCompany, t as fetchProfil, tt as findMatchingContact, u as SelectItem, ut as getInitials, w as handleFirestoreError, x as classifyContactsBatchServerFn, yt as normalizeCandidature, z as TYPES_CONTACT, zt as todayIso } from "./profil-cloud-BKSU-WDL.mjs";
import { C as useRouter, J as redirect, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, v as createFileRoute, y as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn, s as __exportAll } from "./server-DnJLdVIu.mjs";
import { a as createTanStackListToolsHandler, c as _enum, d as number, f as object, i as createTanStackInvokeToolHandler, n as defineMcp, o as createTanStackMcpHandler, p as string, r as defineTool, s as createTanStackOAuthProtectedResourceMetadataHandler, t as auth$1, u as boolean } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { t as GenerateNetworkingMessageInputZodSchema } from "./networkingMessage.schema-Bl0tYGQq.mjs";
import "../_libs/firebase.mjs";
import { a as setDoc, c as doc, i as query, o as writeBatch, r as getDocs, s as collection, t as deleteDoc } from "../_libs/@firebase/firestore+[...].mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { $ as Languages, A as Phone, At as Clock, B as Mail, Bt as ChartColumn, Et as Copy, G as List, Gt as Building2, It as ChevronRight, K as ListOrdered, Kt as Briefcase, L as MessageSquare, N as Pen, Nt as CircleCheck, O as RefreshCw, P as PenLine, Pt as CircleAlert, Vt as Calendar, W as LoaderCircle, X as LayoutGrid, Zt as ArrowRight, _ as Sparkles, a as Users, b as SlidersHorizontal, bt as ExternalLink, d as TriangleAlert, h as Tag, j as PhoneCall, k as Plus, mt as FileText, n as X, nt as Info, o as User, p as Trash2, q as Linkedin, u as Upload, ut as GitFork, v as Smartphone, vt as Eye, w as Search, xt as Euro, z as MapPin, zt as Check } from "../_libs/lucide-react.mjs";
import { l as extraireOpportuniteHeuristique } from "./opportunity.heuristic-CZXaBu-l.mjs";
import { i as Trigger, n as List$1, r as Root2$1, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { n as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dialog-BnzXWN_Q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$8 = "/app/applet/src/components/ui/dialog.tsx";
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/70 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$8,
	lineNumber: 21,
	columnNumber: 3
}, void 0));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogOverlay, {}, void 0, false, {
	fileName: _jsxFileName$8,
	lineNumber: 37,
	columnNumber: 5
}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-xl translate-x-[-50%] translate-y-[-50%] gap-6 border border-white/16 bg-gradient-to-b from-[#111528]/92 to-[#090b16]/92 backdrop-blur-3xl p-6 sm:p-8 shadow-[0_32px_90px_rgba(0,0,0,0.8),inset_0_1px_1px_0_rgba(255,255,255,0.32),inset_0_0_0_1px_rgba(255,255,255,0.06)] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-3xl", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogClose, {
		className: "absolute right-5 top-5 rounded-xl p-2 opacity-70 ring-offset-background cursor-pointer transition-all hover:opacity-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "h-4 w-4" }, void 0, false, {
			fileName: _jsxFileName$8,
			lineNumber: 48,
			columnNumber: 9
		}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "sr-only",
			children: "Close"
		}, void 0, false, {
			fileName: _jsxFileName$8,
			lineNumber: 49,
			columnNumber: 9
		}, void 0)]
	}, void 0, true, {
		fileName: _jsxFileName$8,
		lineNumber: 47,
		columnNumber: 7
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName$8,
	lineNumber: 38,
	columnNumber: 5
}, void 0)] }, void 0, true, {
	fileName: _jsxFileName$8,
	lineNumber: 36,
	columnNumber: 3
}, void 0));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$8,
	lineNumber: 60,
	columnNumber: 3
}, void 0);
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$8,
	lineNumber: 74,
	columnNumber: 3
}, void 0);
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$8,
	lineNumber: 88,
	columnNumber: 3
}, void 0));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$8,
	lineNumber: 103,
	columnNumber: 3
}, void 0));
DialogDescription.displayName = DialogDescription$1.displayName;
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/tabs-B_q2L5nt.js
var _jsxFileName$7 = "/app/applet/src/components/ui/tabs.tsx";
var Tabs = Root2$1;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(List$1, {
	ref,
	className: cn("inline-flex h-10 items-center justify-center rounded-2xl bg-black/25 dark:bg-black/30 backdrop-blur-xl p-1 gap-1 text-muted-foreground border border-white/10 select-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$7,
	lineNumber: 12,
	columnNumber: 3
}, void 0));
TabsList.displayName = List$1.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-medium ring-offset-background cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 hover:text-foreground data-[state=active]:bg-white/15 dark:data-[state=active]:bg-white/12 data-[state=active]:text-foreground data-[state=active]:font-semibold data-[state=active]:shadow-[0_2px_8px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.2)] data-[state=active]:border data-[state=active]:border-white/15", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$7,
	lineNumber: 27,
	columnNumber: 3
}, void 0));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Content, {
	ref,
	className: cn("mt-3 ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$7,
	lineNumber: 42,
	columnNumber: 3
}, void 0));
TabsContent.displayName = Content.displayName;
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/CandidatureSheet-C6hrPKoe.js
var _jsxFileName$5$1 = "/app/applet/src/components/ui/modal.tsx";
var TAILLES = {
	sm: "sm:max-w-md",
	md: "sm:max-w-lg",
	lg: "sm:max-w-2xl",
	xl: "sm:max-w-3xl",
	"2xl": "sm:max-w-5xl",
	"7xl": "sm:max-w-7xl",
	full: "sm:max-w-[98vw]"
};
/** Fenêtre centrale NACORA : en-tête fixe, contenu défilant, actions en bas. */
function CenterModal({ open, onOpenChange, title, description, children, footer, size = "lg", className, bodyClassName }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
			className: cn("flex max-h-[96svh] w-[calc(100vw-1.5rem)] flex-col gap-0 overflow-hidden rounded-3xl border border-white/20 bg-background/80 p-0 shadow-[0_32px_90px_-20px_rgba(0,0,0,0.8),inset_0_1px_1px_0_rgba(255,255,255,0.25)] backdrop-blur-3xl", TAILLES[size], className),
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, {
					className: "shrink-0 space-y-1 border-b border-white/12 px-6 py-4.5 pr-14 text-left sm:px-7 bg-white/[0.03] backdrop-blur-md",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
						className: "text-base sm:text-lg font-semibold tracking-tight",
						children: title
					}, void 0, false, {
						fileName: _jsxFileName$5$1,
						lineNumber: 55,
						columnNumber: 11
					}, this), description ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
						className: "truncate text-xs sm:text-sm text-muted-foreground",
						children: description
					}, void 0, false, {
						fileName: _jsxFileName$5$1,
						lineNumber: 59,
						columnNumber: 13
					}, this) : null]
				}, void 0, true, {
					fileName: _jsxFileName$5$1,
					lineNumber: 54,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: cn("min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-7", bodyClassName),
					children
				}, void 0, false, {
					fileName: _jsxFileName$5$1,
					lineNumber: 65,
					columnNumber: 9
				}, this),
				footer ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "shrink-0 border-t border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-md px-6 py-4 sm:px-7",
					children: footer
				}, void 0, false, {
					fileName: _jsxFileName$5$1,
					lineNumber: 75,
					columnNumber: 11
				}, this) : null
			]
		}, void 0, true, {
			fileName: _jsxFileName$5$1,
			lineNumber: 47,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$5$1,
		lineNumber: 46,
		columnNumber: 5
	}, this);
}
var _jsxFileName$4$1 = "/app/applet/src/components/ui/alert-dialog.tsx";
var AlertDialog = Root2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Overlay2, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}, void 0, false, {
	fileName: _jsxFileName$4$1,
	lineNumber: 17,
	columnNumber: 3
}, void 0));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogOverlay, {}, void 0, false, {
	fileName: _jsxFileName$4$1,
	lineNumber: 33,
	columnNumber: 5
}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Content2, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$4$1,
	lineNumber: 34,
	columnNumber: 5
}, void 0)] }, void 0, true, {
	fileName: _jsxFileName$4$1,
	lineNumber: 32,
	columnNumber: 3
}, void 0));
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$4$1,
	lineNumber: 50,
	columnNumber: 3
}, void 0);
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$4$1,
	lineNumber: 64,
	columnNumber: 3
}, void 0);
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title2, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$4$1,
	lineNumber: 78,
	columnNumber: 3
}, void 0));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Description2, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$4$1,
	lineNumber: 90,
	columnNumber: 3
}, void 0));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$4$1,
	lineNumber: 103,
	columnNumber: 3
}, void 0));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$4$1,
	lineNumber: 115,
	columnNumber: 3
}, void 0));
AlertDialogCancel.displayName = Cancel.displayName;
var _jsxFileName$3$1 = "/app/applet/src/components/StatutBadge.tsx";
var STYLES = {
	Sauvegardée: {
		bg: "bg-white/8 backdrop-blur-md",
		text: "text-muted-foreground",
		dot: "bg-zinc-400"
	},
	"À préparer": {
		bg: "bg-amber-500/15 backdrop-blur-md",
		text: "text-amber-400 dark:text-amber-300",
		dot: "bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.6)]"
	},
	"À étudier": {
		bg: "bg-blue-500/15 backdrop-blur-md",
		text: "text-blue-400 dark:text-blue-300",
		dot: "bg-blue-400 shadow-[0_0_6px_rgba(59,130,246,0.6)]"
	},
	"À candidater": {
		bg: "bg-primary/20 backdrop-blur-md",
		text: "text-primary dark:text-[#FF386B]",
		dot: "bg-primary shadow-[0_0_8px_rgba(216,26,69,0.7)]"
	},
	"Candidature envoyée": {
		bg: "bg-blue-500/15 backdrop-blur-md",
		text: "text-blue-400 dark:text-blue-300",
		dot: "bg-blue-400 shadow-[0_0_6px_rgba(59,130,246,0.6)]"
	},
	Relancée: {
		bg: "bg-amber-500/15 backdrop-blur-md",
		text: "text-amber-400 dark:text-amber-300",
		dot: "bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.6)]"
	},
	Entretien: {
		bg: "bg-emerald-500/15 backdrop-blur-md",
		text: "text-emerald-400 dark:text-emerald-300",
		dot: "bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.6)]"
	},
	"Deuxième entretien": {
		bg: "bg-emerald-500/20 backdrop-blur-md",
		text: "text-emerald-400 dark:text-emerald-300",
		dot: "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
	},
	"Offre reçue": {
		bg: "bg-emerald-500/25 backdrop-blur-md",
		text: "text-emerald-300",
		dot: "bg-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
	},
	Acceptée: {
		bg: "bg-emerald-500/30 backdrop-blur-md",
		text: "text-emerald-200",
		dot: "bg-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.9)]"
	},
	Refusée: {
		bg: "bg-destructive/15 backdrop-blur-md",
		text: "text-destructive",
		dot: "bg-destructive shadow-[0_0_6px_rgba(240,68,56,0.6)]"
	},
	"Sans réponse": {
		bg: "bg-white/8 backdrop-blur-md",
		text: "text-muted-foreground",
		dot: "bg-zinc-400"
	},
	Clôturée: {
		bg: "bg-white/5 backdrop-blur-md",
		text: "text-muted-foreground/80",
		dot: "bg-zinc-500"
	}
};
function StatutBadge({ statut, size = "md" }) {
	const cfg = STYLES[statut] || {
		bg: "bg-white/8 backdrop-blur-md",
		text: "text-muted-foreground",
		dot: "bg-zinc-400"
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: `inline-flex items-center gap-1.5 whitespace-nowrap rounded-full font-medium select-none shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-all ${size === "xs" ? "px-2 py-0.5 text-[10px]" : size === "sm" ? "px-2.5 py-0.5 text-[11px]" : "px-3 py-1 text-xs"} ${cfg.bg} ${cfg.text}`,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `size-1.5 rounded-full shrink-0 ${cfg.dot}` }, void 0, false, {
			fileName: _jsxFileName$3$1,
			lineNumber: 97,
			columnNumber: 7
		}, this), statut]
	}, void 0, true, {
		fileName: _jsxFileName$3$1,
		lineNumber: 94,
		columnNumber: 5
	}, this);
}
var ExtraireOpportuniteInput = object({
	text: string().min(10, "Le texte de l'offre doit contenir au moins 10 caractères."),
	url: string().optional()
});
var extraireOpportuniteServerFn = createServerFn({ method: "POST" }).validator((data) => ExtraireOpportuniteInput.parse(data)).handler(createSsrRpc("a8546a28c65e51fb3ecf9b7f6df5ff54e8d3e0bde77d5c2290b5d284fcc08ab9"));
var _jsxFileName$2$1 = "/app/applet/src/components/opportunity/OpportunityFieldEditors.tsx";
function TagListEditor({ label, items, onChange, placeholder = "Ajouter...", badgeClassName = "bg-primary/15 text-primary", emptyText = "Non renseigné", isEditing = true }) {
	const [inputVal, setInputVal] = (0, import_react.useState)("");
	const handleAdd = () => {
		const trimmed = inputVal.trim();
		if (!trimmed) return;
		if (!items.includes(trimmed)) onChange([...items, trimmed]);
		setInputVal("");
	};
	const handleRemove = (index) => {
		onChange(items.filter((_, i) => i !== index));
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
					className: "text-xs font-bold uppercase tracking-wider text-slate-200",
					children: [
						label,
						" (",
						items.length,
						")"
					]
				}, void 0, true, {
					fileName: _jsxFileName$2$1,
					lineNumber: 48,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$2$1,
				lineNumber: 47,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap gap-1.5 min-h-[32px] p-2.5 rounded-xl bg-white/5 backdrop-blur-md",
				children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-xs text-slate-400 italic self-center px-1",
					children: emptyText
				}, void 0, false, {
					fileName: _jsxFileName$2$1,
					lineNumber: 55,
					columnNumber: 11
				}, this) : items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
					variant: "outline",
					className: `text-xs py-1 px-2.5 flex items-center gap-1.5 font-medium border-none shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-all ${badgeClassName}`,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-slate-100",
						children: item
					}, void 0, false, {
						fileName: _jsxFileName$2$1,
						lineNumber: 65,
						columnNumber: 15
					}, this), isEditing && /* @__PURE__ */ (void 0)("button", {
						type: "button",
						onClick: () => handleRemove(idx),
						className: "text-slate-300 hover:text-rose-400 transition-colors focus:outline-none",
						title: "Supprimer",
						children: /* @__PURE__ */ (void 0)(X, { className: "size-3" }, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 73,
							columnNumber: 19
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2$1,
						lineNumber: 67,
						columnNumber: 17
					}, this)]
				}, idx, true, {
					fileName: _jsxFileName$2$1,
					lineNumber: 60,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$2$1,
				lineNumber: 53,
				columnNumber: 7
			}, this),
			isEditing && /* @__PURE__ */ (void 0)("div", {
				className: "flex gap-2 pt-1",
				children: [/* @__PURE__ */ (void 0)(Input, {
					value: inputVal,
					onChange: (e) => setInputVal(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							handleAdd();
						}
					},
					placeholder,
					className: "h-8 text-xs bg-white/5 text-slate-100 placeholder:text-slate-400 border-none rounded-lg backdrop-blur-md"
				}, void 0, false, {
					fileName: _jsxFileName$2$1,
					lineNumber: 83,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)(Button, {
					type: "button",
					size: "sm",
					variant: "outline",
					onClick: handleAdd,
					disabled: !inputVal.trim(),
					className: "h-8 px-2.5 text-xs font-bold border-none bg-white/10 text-slate-200 hover:bg-white/15",
					children: [/* @__PURE__ */ (void 0)(Plus, { className: "size-3.5 mr-1" }, void 0, false, {
						fileName: _jsxFileName$2$1,
						lineNumber: 103,
						columnNumber: 13
					}, this), " Ajouter"]
				}, void 0, true, {
					fileName: _jsxFileName$2$1,
					lineNumber: 95,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2$1,
				lineNumber: 82,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$2$1,
		lineNumber: 46,
		columnNumber: 5
	}, this);
}
function MetricsEditor({ metrics, onChange, isEditing = true }) {
	const [label, setLabel] = (0, import_react.useState)("");
	const [value, setValue] = (0, import_react.useState)("");
	const handleAdd = () => {
		if (!label.trim() || !value.trim()) return;
		onChange([...metrics, {
			label: label.trim(),
			value: value.trim()
		}]);
		setLabel("");
		setValue("");
	};
	const handleRemove = (index) => {
		onChange(metrics.filter((_, i) => i !== index));
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-2.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartColumn, { className: "size-3.5 text-muted-foreground/80" }, void 0, false, {
					fileName: _jsxFileName$2$1,
					lineNumber: 139,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
					"Chiffres clés & Métriques (",
					metrics.length,
					")"
				] }, void 0, true, {
					fileName: _jsxFileName$2$1,
					lineNumber: 140,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2$1,
				lineNumber: 138,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-2 sm:grid-cols-3 gap-2.5",
				children: metrics.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "col-span-full py-3 px-4 rounded-xl bg-[#080A11] border border-slate-800 text-xs text-slate-400 italic",
					children: "Aucun chiffre clé détecté."
				}, void 0, false, {
					fileName: _jsxFileName$2$1,
					lineNumber: 145,
					columnNumber: 11
				}, this) : metrics.map((m, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative group p-3 rounded-xl border border-slate-800 bg-[#080A11] shadow-xs flex flex-col justify-between",
					children: [
						isEditing && /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => handleRemove(idx),
							className: "absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-400 transition-opacity",
							children: /* @__PURE__ */ (void 0)(X, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$2$1,
								lineNumber: 160,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 155,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-base font-bold text-foreground truncate pr-4",
							children: m.value
						}, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 163,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-[11px] text-slate-200 font-medium truncate",
							children: m.label
						}, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 166,
							columnNumber: 15
						}, this)
					]
				}, idx, true, {
					fileName: _jsxFileName$2$1,
					lineNumber: 150,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$2$1,
				lineNumber: 143,
				columnNumber: 7
			}, this),
			isEditing && /* @__PURE__ */ (void 0)("div", {
				className: "flex gap-2 pt-1",
				children: [
					/* @__PURE__ */ (void 0)(Input, {
						placeholder: "Métrique (ex: Chiffre d'affaires)",
						value: label,
						onChange: (e) => setLabel(e.target.value),
						className: "h-8 text-xs flex-1 bg-[#05060A] text-slate-100 placeholder:text-slate-400 border-slate-700/80 rounded-lg"
					}, void 0, false, {
						fileName: _jsxFileName$2$1,
						lineNumber: 176,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(Input, {
						placeholder: "Valeur (ex: 12M€)",
						value,
						onChange: (e) => setValue(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								handleAdd();
							}
						},
						className: "h-8 text-xs w-32 bg-[#05060A] text-slate-100 placeholder:text-slate-400 border-slate-700/80 rounded-lg"
					}, void 0, false, {
						fileName: _jsxFileName$2$1,
						lineNumber: 182,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(Button, {
						type: "button",
						size: "sm",
						variant: "outline",
						onClick: handleAdd,
						disabled: !label.trim() || !value.trim(),
						className: "h-8 px-2.5 text-xs font-bold border-slate-700 text-slate-200 hover:bg-slate-800",
						children: [/* @__PURE__ */ (void 0)(Plus, { className: "size-3.5 mr-1" }, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 202,
							columnNumber: 13
						}, this), " Ajouter"]
					}, void 0, true, {
						fileName: _jsxFileName$2$1,
						lineNumber: 194,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$2$1,
				lineNumber: 175,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$2$1,
		lineNumber: 137,
		columnNumber: 5
	}, this);
}
function LanguagesEditor({ requiredLanguages, preferredLanguages, onChangeRequired, onChangePreferred, isEditing = true }) {
	const [newLang, setNewLang] = (0, import_react.useState)("");
	const [newNiveau, setNewNiveau] = (0, import_react.useState)("");
	const [isObligatoire, setIsObligatoire] = (0, import_react.useState)(true);
	const handleAdd = () => {
		if (!newLang.trim()) return;
		const item = {
			langue: newLang.trim(),
			niveau: newNiveau.trim() || void 0,
			obligatoire: isObligatoire
		};
		if (isObligatoire) onChangeRequired([...requiredLanguages, item]);
		else onChangePreferred([...preferredLanguages, item]);
		setNewLang("");
		setNewNiveau("");
	};
	const total = requiredLanguages.length + preferredLanguages.length;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-2.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Languages, { className: "size-3.5 text-muted-foreground/80" }, void 0, false, {
					fileName: _jsxFileName$2$1,
					lineNumber: 250,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
					"Langues (",
					total,
					")"
				] }, void 0, true, {
					fileName: _jsxFileName$2$1,
					lineNumber: 251,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2$1,
				lineNumber: 249,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap gap-2 p-2.5 rounded-xl bg-[#080A11] border border-slate-800 min-h-[42px]",
				children: total === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-xs text-slate-400 italic self-center px-1",
					children: "Non renseigné (aucune langue explicitement requise dans l'offre)"
				}, void 0, false, {
					fileName: _jsxFileName$2$1,
					lineNumber: 256,
					columnNumber: 11
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [requiredLanguages.map((l, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
					variant: "outline",
					className: "text-xs py-1 px-2.5 flex items-center gap-1.5 bg-primary/10 text-foreground border-primary/20 font-semibold",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: l.langue }, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 267,
							columnNumber: 17
						}, this),
						l.niveau && /* @__PURE__ */ (void 0)("span", {
							className: "text-[10px] opacity-90",
							children: [
								"(",
								l.niveau,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$2$1,
							lineNumber: 269,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-[9px] uppercase font-bold tracking-tight bg-rose-500/30 px-1 rounded",
							children: "Requis"
						}, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 271,
							columnNumber: 17
						}, this),
						isEditing && /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => onChangeRequired(requiredLanguages.filter((_, i) => i !== idx)),
							className: "hover:text-rose-400 focus:outline-none",
							children: /* @__PURE__ */ (void 0)(X, { className: "size-3" }, void 0, false, {
								fileName: _jsxFileName$2$1,
								lineNumber: 284,
								columnNumber: 21
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 275,
							columnNumber: 19
						}, this)
					]
				}, `req-${idx}`, true, {
					fileName: _jsxFileName$2$1,
					lineNumber: 262,
					columnNumber: 15
				}, this)), preferredLanguages.map((l, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
					variant: "outline",
					className: "text-xs py-1 px-2.5 flex items-center gap-1.5 bg-sky-500/20 text-sky-200 border-sky-500/40 font-bold",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: l.langue }, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 295,
							columnNumber: 17
						}, this),
						l.niveau && /* @__PURE__ */ (void 0)("span", {
							className: "text-[10px] opacity-90",
							children: [
								"(",
								l.niveau,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$2$1,
							lineNumber: 297,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-[9px] uppercase font-bold tracking-tight bg-sky-500/30 px-1 rounded",
							children: "Atout"
						}, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 299,
							columnNumber: 17
						}, this),
						isEditing && /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => onChangePreferred(preferredLanguages.filter((_, i) => i !== idx)),
							className: "hover:text-rose-400 focus:outline-none",
							children: /* @__PURE__ */ (void 0)(X, { className: "size-3" }, void 0, false, {
								fileName: _jsxFileName$2$1,
								lineNumber: 312,
								columnNumber: 21
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 303,
							columnNumber: 19
						}, this)
					]
				}, `pref-${idx}`, true, {
					fileName: _jsxFileName$2$1,
					lineNumber: 290,
					columnNumber: 15
				}, this))] }, void 0, true, {
					fileName: _jsxFileName$2$1,
					lineNumber: 260,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$2$1,
				lineNumber: 254,
				columnNumber: 7
			}, this),
			isEditing && /* @__PURE__ */ (void 0)("div", {
				className: "flex gap-2 pt-1",
				children: [
					/* @__PURE__ */ (void 0)(Input, {
						placeholder: "Langue (ex: Anglais)",
						value: newLang,
						onChange: (e) => setNewLang(e.target.value),
						className: "h-8 text-xs flex-1 bg-[#05060A] text-slate-100 placeholder:text-slate-400 border-slate-700/80 rounded-lg"
					}, void 0, false, {
						fileName: _jsxFileName$2$1,
						lineNumber: 323,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(Input, {
						placeholder: "Niveau (ex: Courant, C1)",
						value: newNiveau,
						onChange: (e) => setNewNiveau(e.target.value),
						className: "h-8 text-xs w-32 bg-[#05060A] text-slate-100 placeholder:text-slate-400 border-slate-700/80 rounded-lg"
					}, void 0, false, {
						fileName: _jsxFileName$2$1,
						lineNumber: 329,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(Button, {
						type: "button",
						size: "sm",
						variant: isObligatoire ? "default" : "secondary",
						onClick: () => setIsObligatoire(!isObligatoire),
						className: "h-8 text-[11px] px-2 font-semibold bg-primary hover:bg-primary/95 text-white",
						children: isObligatoire ? "Obligatoire" : "Atout"
					}, void 0, false, {
						fileName: _jsxFileName$2$1,
						lineNumber: 335,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(Button, {
						type: "button",
						size: "sm",
						variant: "outline",
						onClick: handleAdd,
						disabled: !newLang.trim(),
						className: "h-8 px-2.5 text-xs font-bold border-slate-700 text-slate-200 hover:bg-slate-800",
						children: [/* @__PURE__ */ (void 0)(Plus, { className: "size-3.5 mr-1" }, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 352,
							columnNumber: 13
						}, this), " Ajouter"]
					}, void 0, true, {
						fileName: _jsxFileName$2$1,
						lineNumber: 344,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$2$1,
				lineNumber: 322,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$2$1,
		lineNumber: 248,
		columnNumber: 5
	}, this);
}
function ProcessStepsEditor({ steps, onChange, isEditing = true }) {
	const [stepInput, setStepInput] = (0, import_react.useState)("");
	const handleAdd = () => {
		if (!stepInput.trim()) return;
		onChange([...steps, stepInput.trim()]);
		setStepInput("");
	};
	const handleRemove = (index) => {
		onChange(steps.filter((_, i) => i !== index));
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ListOrdered, { className: "size-3.5 text-muted-foreground/80" }, void 0, false, {
					fileName: _jsxFileName$2$1,
					lineNumber: 386,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
					"Étapes du recrutement (",
					steps.length,
					")"
				] }, void 0, true, {
					fileName: _jsxFileName$2$1,
					lineNumber: 387,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2$1,
				lineNumber: 385,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-1.5",
				children: steps.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "py-2.5 px-3 rounded-xl bg-[#080A11] border border-slate-800 text-xs text-slate-400 italic",
					children: "Non renseigné dans l'offre."
				}, void 0, false, {
					fileName: _jsxFileName$2$1,
					lineNumber: 392,
					columnNumber: 11
				}, this) : steps.map((st, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between p-2.5 px-3 rounded-xl border border-slate-800 bg-[#080A11] text-xs text-slate-100",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "size-5 rounded-full bg-zinc-500/10 text-zinc-400 border border-zinc-500/20 font-bold text-[11px] flex items-center justify-center shrink-0",
							children: idx + 1
						}, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 402,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-semibold text-slate-100",
							children: st
						}, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 405,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2$1,
						lineNumber: 401,
						columnNumber: 15
					}, this), isEditing && /* @__PURE__ */ (void 0)("button", {
						type: "button",
						onClick: () => handleRemove(idx),
						className: "text-slate-400 hover:text-rose-400",
						children: /* @__PURE__ */ (void 0)(X, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 413,
							columnNumber: 19
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2$1,
						lineNumber: 408,
						columnNumber: 17
					}, this)]
				}, idx, true, {
					fileName: _jsxFileName$2$1,
					lineNumber: 397,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$2$1,
				lineNumber: 390,
				columnNumber: 7
			}, this),
			isEditing && /* @__PURE__ */ (void 0)("div", {
				className: "flex gap-2 pt-1",
				children: [/* @__PURE__ */ (void 0)(Input, {
					placeholder: "Nouvelle étape (ex: Entretien RH)",
					value: stepInput,
					onChange: (e) => setStepInput(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							handleAdd();
						}
					},
					className: "h-8 text-xs bg-[#05060A] text-slate-100 placeholder:text-slate-400 border-slate-700/80 rounded-lg flex-1"
				}, void 0, false, {
					fileName: _jsxFileName$2$1,
					lineNumber: 423,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)(Button, {
					type: "button",
					size: "sm",
					variant: "outline",
					onClick: handleAdd,
					disabled: !stepInput.trim(),
					className: "h-8 px-2.5 text-xs font-bold border-slate-700 text-slate-200 hover:bg-slate-800",
					children: [/* @__PURE__ */ (void 0)(Plus, { className: "size-3.5 mr-1" }, void 0, false, {
						fileName: _jsxFileName$2$1,
						lineNumber: 443,
						columnNumber: 13
					}, this), " Ajouter"]
				}, void 0, true, {
					fileName: _jsxFileName$2$1,
					lineNumber: 435,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2$1,
				lineNumber: 422,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$2$1,
		lineNumber: 384,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1$1 = "/app/applet/src/components/workflow/WorkflowTab.tsx";
function WorkflowTab({ candidature, onChange }) {
	const currentStepKey = candidature.currentWorkflowStep || statutToWorkflowStepKey(candidature.statut);
	const currentConfig = getWorkflowStepConfig(currentStepKey);
	const events = Array.isArray(candidature.workflowEvents) ? candidature.workflowEvents : [];
	const [changeStepModalOpen, setChangeStepModalOpen] = (0, import_react.useState)(false);
	const [selectedTargetStep, setSelectedTargetStep] = (0, import_react.useState)(currentStepKey);
	const [stepDate, setStepDate] = (0, import_react.useState)(todayIso());
	const [stepNote, setStepNote] = (0, import_react.useState)("");
	const [stepChannel, setStepChannel] = (0, import_react.useState)(candidature.source || "JobTeaser");
	const [stepInterviewType, setStepInterviewType] = (0, import_react.useState)("Visio (Teams, Meet, Zoom)");
	const [stepInterlocuteur, setStepInterlocuteur] = (0, import_react.useState)(candidature.contact || "");
	const [editingEvent, setEditingEvent] = (0, import_react.useState)(null);
	const [editDate, setEditDate] = (0, import_react.useState)("");
	const [editNote, setEditNote] = (0, import_react.useState)("");
	const [editChannel, setEditChannel] = (0, import_react.useState)("");
	const [editInterviewType, setEditInterviewType] = (0, import_react.useState)("");
	const [editInterlocuteur, setEditInterlocuteur] = (0, import_react.useState)("");
	const [customEventModalOpen, setCustomEventModalOpen] = (0, import_react.useState)(false);
	const [customEventType, setCustomEventType] = (0, import_react.useState)(currentStepKey);
	const [customEventDate, setCustomEventDate] = (0, import_react.useState)(todayIso());
	const [customEventNote, setCustomEventNote] = (0, import_react.useState)("");
	const openChangeStepModal = (targetKey) => {
		const key = targetKey || currentConfig.nextStepKey || currentStepKey;
		setSelectedTargetStep(key);
		const targetConfig = getWorkflowStepConfig(key);
		setStepDate(todayIso());
		setStepNote(targetConfig.description);
		setStepChannel(candidature.source || "JobTeaser");
		setStepInterviewType("Visio (Teams, Meet, Zoom)");
		setStepInterlocuteur(candidature.contact || "");
		setChangeStepModalOpen(true);
	};
	const handleConfirmChangeStep = () => {
		const targetConfig = getWorkflowStepConfig(selectedTargetStep);
		onChange(transitionWorkflowStep(candidature, selectedTargetStep, {
			date: stepDate || todayIso(),
			note: stepNote.trim() || targetConfig.description,
			channel: selectedTargetStep === "application_sent" ? stepChannel : void 0,
			interviewType: selectedTargetStep === "interview" || selectedTargetStep === "second_interview" ? stepInterviewType : void 0,
			interlocuteur: selectedTargetStep === "interview" || selectedTargetStep === "second_interview" ? stepInterlocuteur.trim() || void 0 : void 0
		}));
		setChangeStepModalOpen(false);
		toast.success(`Étape mise à jour : ${targetConfig.label}`);
	};
	const handleQuickAdvance = () => {
		if (!currentConfig.nextStepKey) {
			openChangeStepModal();
			return;
		}
		openChangeStepModal(currentConfig.nextStepKey);
	};
	const handleOpenEditEvent = (evt) => {
		setEditingEvent(evt);
		setEditDate(evt.date);
		setEditNote(evt.note || "");
		setEditChannel(evt.channel || "");
		setEditInterviewType(evt.interviewType || "Visio (Teams, Meet, Zoom)");
		setEditInterlocuteur(evt.interlocuteur || "");
	};
	const handleSaveEditEvent = () => {
		if (!editingEvent) return;
		const patch = { workflowEvents: events.map((e) => {
			if (e.id === editingEvent.id) return {
				...e,
				date: editDate,
				note: editNote.trim(),
				channel: editChannel.trim() || void 0,
				interviewType: editInterviewType.trim() || void 0,
				interlocuteur: editInterlocuteur.trim() || void 0
			};
			return e;
		}) };
		if (editingEvent.type === "application_sent") {
			patch.dateEnvoi = editDate;
			patch.appliedAt = editDate;
		} else if (editingEvent.type === "follow_up") {
			patch.dateRelance = editDate;
			patch.followUpDate = editDate;
		} else if (editingEvent.type === "interview") patch.interviewDate = editDate;
		onChange(patch);
		setEditingEvent(null);
		toast.success("Événement mis à jour.");
	};
	const handleDeleteEvent = (eventId, eventType) => {
		if (eventType === "saved" && events.length === 1) {
			toast.error("L'étape initiale 'Sauvegardée' ne peut pas être supprimée.");
			return;
		}
		const updatedEvents = events.filter((e) => e.id !== eventId);
		let newStep = currentStepKey;
		if (currentStepKey === eventType) {
			const remainingTypes = updatedEvents.map((e) => e.type);
			const orderedRemaining = WORKFLOW_STEPS_CONFIG.filter((s) => remainingTypes.includes(s.key));
			newStep = orderedRemaining.length > 0 ? orderedRemaining[orderedRemaining.length - 1]?.key || "saved" : "saved";
		}
		onChange({
			workflowEvents: updatedEvents,
			currentWorkflowStep: newStep,
			statut: workflowStepKeyToStatut(newStep),
			status: workflowStepKeyToStatut(newStep)
		});
		toast.success("Événement supprimé.");
	};
	const handleAddCustomEvent = () => {
		const newEvent = {
			id: `custom-evt-${Date.now()}`,
			type: customEventType,
			date: customEventDate || todayIso(),
			note: customEventNote.trim() || "Note d'avancement",
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		onChange({ workflowEvents: [...events, newEvent].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) });
		setCustomEventModalOpen(false);
		toast.success("Note ajoutée au journal.");
	};
	const currentStepIndex = WORKFLOW_STEPS_CONFIG.findIndex((s) => s.key === currentStepKey);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-4 sm:p-5 rounded-2xl bg-[#10131F] border border-slate-800 shadow-xs space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs font-semibold uppercase tracking-wider text-slate-400",
								children: "Étape actuelle du workflow"
							}, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 259,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "outline",
								className: "text-xs px-2.5 py-0.5 font-bold bg-primary/10 text-primary border-primary/25",
								children: currentConfig.label
							}, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 262,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 258,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm text-slate-300 font-medium",
							children: currentConfig.description
						}, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 269,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1$1,
						lineNumber: 257,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 flex-wrap",
						children: [currentConfig.nextStepKey && /* @__PURE__ */ (void 0)(Button, {
							size: "sm",
							className: "gap-1.5 font-semibold text-xs h-9 shadow-xs bg-primary hover:bg-primary/95 text-white rounded-xl transition-colors",
							onClick: handleQuickAdvance,
							children: [/* @__PURE__ */ (void 0)("span", { children: currentConfig.defaultActionLabel }, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 282,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(ArrowRight, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 283,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 277,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							variant: "outline",
							className: "gap-1.5 text-xs h-9 border-slate-800 text-slate-300 bg-slate-950/20 hover:bg-slate-800 hover:text-white rounded-xl transition-colors",
							onClick: () => openChangeStepModal(),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SlidersHorizontal, { className: "size-3.5 text-slate-400" }, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 293,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Changer d'étape" }, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 294,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 287,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1$1,
						lineNumber: 275,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1$1,
					lineNumber: 256,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-1.5 pt-1 border-t border-slate-800/40",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between text-[11px] text-slate-400",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Progression du processus" }, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 302,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-medium text-slate-200",
							children: currentConfig.isTerminal ? currentConfig.terminalType === "success" ? "Offre acceptée" : "Candidature refusée" : `Étape ${Math.max(1, currentStepIndex + 1)} sur 8`
						}, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 303,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1$1,
						lineNumber: 301,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "h-1.5 w-full bg-slate-900 rounded-full overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: `h-full transition-all duration-300 ${currentConfig.key === "accepted" ? "bg-emerald-500 w-full" : currentConfig.key === "rejected" ? "bg-rose-500 w-full" : "bg-primary"}`,
							style: { width: currentConfig.isTerminal ? "100%" : `${Math.min(100, Math.max(12, (currentStepIndex + 1) / 8 * 100))}%` }
						}, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 312,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1$1,
						lineNumber: 311,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1$1,
					lineNumber: 300,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1$1,
				lineNumber: 255,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-4 sm:p-5 rounded-2xl bg-[#10131F] border border-slate-800 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "size-4 text-muted-foreground" }, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 334,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
							className: "text-xs font-black uppercase tracking-wider text-slate-200",
							children: [
								"Pipeline de suivi (",
								WORKFLOW_STEPS_CONFIG.length,
								" étapes)"
							]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 335,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1$1,
						lineNumber: 333,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-[11px] text-slate-400",
						children: "Cliquez sur n'importe quelle étape pour la définir ou l'ajuster"
					}, void 0, false, {
						fileName: _jsxFileName$1$1,
						lineNumber: 339,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1$1,
					lineNumber: 332,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-2.5",
					children: WORKFLOW_STEPS_CONFIG.map((step, idx) => {
						const isCurrent = step.key === currentStepKey;
						const matchingEvents = events.filter((e) => e.type === step.key);
						const hasEvent = matchingEvents.length > 0;
						const latestEvent = matchingEvents[matchingEvents.length - 1];
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							onClick: () => openChangeStepModal(step.key),
							className: `relative p-3 rounded-xl border flex flex-col justify-between min-h-[100px] transition-all cursor-pointer group select-none ${isCurrent ? "bg-primary/10 border-primary text-white ring-1 ring-primary/30 shadow-xs" : hasEvent ? "bg-[#0d0f17] border-slate-800 text-slate-200 hover:border-slate-700" : "bg-[#05060A]/40 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-200"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between gap-1 mb-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: `text-[10px] font-extrabold px-1.5 py-0.5 rounded-md font-mono ${isCurrent ? "bg-primary text-white" : hasEvent ? "bg-muted text-muted-foreground" : "bg-slate-900 text-slate-500"}`,
										children: ["0", idx + 1]
									}, void 0, true, {
										fileName: _jsxFileName$1$1,
										lineNumber: 366,
										columnNumber: 19
									}, this), isCurrent ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "size-2 rounded-full bg-primary animate-pulse" }, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 379,
										columnNumber: 21
									}, this) : hasEvent ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-3 text-emerald-500" }, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 381,
										columnNumber: 21
									}, this) : null]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 365,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-0.5 my-auto",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: `text-xs font-bold leading-tight line-clamp-2 ${isCurrent ? "text-white" : hasEvent ? "text-slate-100" : "text-slate-400 group-hover:text-slate-200"}`,
										children: step.label
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 387,
										columnNumber: 19
									}, this), latestEvent?.date && /* @__PURE__ */ (void 0)("div", {
										className: "text-[10px] font-mono text-slate-400 flex items-center gap-1 pt-1",
										children: [/* @__PURE__ */ (void 0)(Calendar, { className: "size-2.5 text-muted-foreground" }, void 0, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 401,
											columnNumber: 23
										}, this), formatDate(latestEvent.date)]
									}, void 0, true, {
										fileName: _jsxFileName$1$1,
										lineNumber: 400,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 386,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "pt-2 border-t border-slate-800/50 flex items-center justify-between text-[10px]",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: `font-semibold ${isCurrent ? "text-primary" : hasEvent ? "text-emerald-400/80" : "text-slate-500 group-hover:text-slate-300"}`,
										children: isCurrent ? "Actuelle" : hasEvent ? "Atteinte" : "À venir"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 409,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "size-3 text-slate-600 group-hover:text-slate-300 transition-transform group-hover:translate-x-0.5" }, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 420,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 408,
									columnNumber: 17
								}, this)
							]
						}, step.key, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 353,
							columnNumber: 15
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName$1$1,
					lineNumber: 345,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1$1,
				lineNumber: 331,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-4 sm:p-5 rounded-2xl bg-[#10131F] border border-slate-800 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, { className: "size-4 text-primary" }, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 432,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								htmlFor: "workflowContactInput",
								className: "text-xs font-bold uppercase tracking-wider text-slate-300 cursor-pointer",
								children: "Contact recruteur / Interlocuteur"
							}, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 433,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 431,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-[11px] text-slate-400",
							children: "Coordonnées des interlocuteurs du recrutement"
						}, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 440,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1$1,
						lineNumber: 430,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						id: "workflowContactInput",
						value: candidature.contact || "",
						onChange: (e) => onChange({ contact: e.target.value }),
						placeholder: "ex: Sophie Durand (RH) — s.durand@entreprise.com — 06 12 34 56 78",
						className: "text-xs bg-[#05060A] text-slate-100 border-slate-700/80 rounded-xl h-9"
					}, void 0, false, {
						fileName: _jsxFileName$1$1,
						lineNumber: 445,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-[11px] text-slate-400",
						children: "Ces coordonnées restent attachées à cette opportunité et sont réutilisées pour vos relances et convocations d'entretien."
					}, void 0, false, {
						fileName: _jsxFileName$1$1,
						lineNumber: 452,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1$1,
				lineNumber: 429,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-4 sm:p-5 rounded-2xl bg-[#10131F] border border-slate-800 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageSquare, { className: "size-4 text-primary" }, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 462,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							htmlFor: "workflowNotesInput",
							className: "text-xs font-bold uppercase tracking-wider text-slate-300 cursor-pointer",
							children: "Notes personnelles & Impressions"
						}, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 463,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1$1,
						lineNumber: 461,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-[11px] text-slate-400",
						children: "Vos notes privées (non générées par l'IA)"
					}, void 0, false, {
						fileName: _jsxFileName$1$1,
						lineNumber: 470,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1$1,
					lineNumber: 460,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
					id: "workflowNotesInput",
					rows: 4,
					value: candidature.personalNotes || candidature.commentaire || "",
					onChange: (e) => onChange({
						personalNotes: e.target.value,
						commentaire: e.target.value
					}),
					placeholder: "Notez ici vos impressions sur l'équipe, questions à poser en entretien, fourchette de salaire discutée, retours...",
					className: "text-xs bg-[#05060A] text-slate-100 border-slate-700/80 rounded-xl resize-y leading-relaxed"
				}, void 0, false, {
					fileName: _jsxFileName$1$1,
					lineNumber: 475,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1$1,
				lineNumber: 459,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-4 sm:p-5 rounded-2xl bg-[#10131F]/40 border border-slate-800/80 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { className: "size-4 text-slate-400" }, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 494,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
							className: "text-xs font-bold uppercase tracking-wider text-slate-300",
							children: [
								"Journal des événements (",
								events.length,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 495,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1$1,
						lineNumber: 493,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						size: "sm",
						className: "h-7 text-xs gap-1 border-slate-800 text-slate-300 bg-slate-950/20 hover:bg-slate-800 hover:text-white rounded-xl transition-colors",
						onClick: () => {
							setCustomEventType(currentStepKey);
							setCustomEventDate(todayIso());
							setCustomEventNote("");
							setCustomEventModalOpen(true);
						},
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3" }, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 510,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Ajouter une entrée" }, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 511,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1$1,
						lineNumber: 499,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1$1,
					lineNumber: 492,
					columnNumber: 9
				}, this), events.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-slate-500 py-2",
					children: "Aucun événement pour le moment."
				}, void 0, false, {
					fileName: _jsxFileName$1$1,
					lineNumber: 516,
					columnNumber: 11
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2",
					children: events.map((evt) => {
						const cfg = getWorkflowStepConfig(evt.type);
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between gap-3 p-2.5 rounded-xl bg-[#08090D] border border-slate-800/80 text-xs text-slate-300",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2.5 flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
										variant: "outline",
										className: `text-[10px] px-2 py-0 shrink-0 ${cfg.badgeColor}`,
										children: cfg.label
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 529,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-mono text-slate-500 shrink-0 text-[11px]",
										children: formatDate(evt.date)
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 535,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-slate-200 truncate font-medium",
										children: evt.note || cfg.description
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 538,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1$1,
								lineNumber: 528,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-1 shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "ghost",
									size: "icon",
									className: "size-7 text-slate-400 hover:text-white",
									onClick: () => handleOpenEditEvent(evt),
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pen, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 550,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1$1,
									lineNumber: 544,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "ghost",
									size: "icon",
									className: "size-7 text-slate-400 hover:text-rose-400",
									onClick: () => handleDeleteEvent(evt.id, evt.type),
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 558,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1$1,
									lineNumber: 552,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1$1,
								lineNumber: 543,
								columnNumber: 19
							}, this)]
						}, evt.id, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 524,
							columnNumber: 17
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName$1$1,
					lineNumber: 520,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1$1,
				lineNumber: 491,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
				open: changeStepModalOpen,
				onOpenChange: setChangeStepModalOpen,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
					className: "sm:max-w-md bg-[#0E111B] border-slate-800 text-slate-100",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
							className: "text-base font-bold flex items-center gap-2 text-white",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SlidersHorizontal, { className: "size-4 text-primary" }, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 573,
								columnNumber: 15
							}, this), "Changer l'étape du workflow"]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 572,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
							className: "text-xs text-slate-400",
							children: "Sélectionnez la nouvelle étape pour faire progresser cette opportunité. Vous pouvez revenir en arrière à tout moment."
						}, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 576,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 571,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-4 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										className: "text-xs font-semibold text-slate-300",
										children: "Choisir une étape :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 585,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid grid-cols-2 sm:grid-cols-3 gap-1.5",
										children: WORKFLOW_STEPS_CONFIG.map((step) => {
											const isSelected = selectedTargetStep === step.key;
											return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
												type: "button",
												onClick: () => {
													setSelectedTargetStep(step.key);
													setStepNote(step.description);
												},
												className: `px-2.5 py-2 rounded-xl text-left border text-xs font-medium transition-all cursor-pointer ${isSelected ? "border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary/30" : "border-slate-800 bg-[#08090D] hover:bg-slate-800 text-slate-300"}`,
												children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "truncate",
														children: step.label
													}, void 0, false, {
														fileName: _jsxFileName$1$1,
														lineNumber: 606,
														columnNumber: 25
													}, this), isSelected && /* @__PURE__ */ (void 0)(Check, { className: "size-3 shrink-0 ml-1 text-primary" }, void 0, false, {
														fileName: _jsxFileName$1$1,
														lineNumber: 608,
														columnNumber: 27
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$1$1,
													lineNumber: 605,
													columnNumber: 23
												}, this)
											}, step.key, false, {
												fileName: _jsxFileName$1$1,
												lineNumber: 592,
												columnNumber: 21
											}, this);
										})
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 588,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 584,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "stepDateInput",
										className: "text-xs font-semibold",
										children: "Date de l'événement :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 619,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										id: "stepDateInput",
										type: "date",
										value: stepDate,
										onChange: (e) => setStepDate(e.target.value),
										className: "text-xs bg-background"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 622,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 618,
									columnNumber: 13
								}, this),
								selectedTargetStep === "application_sent" && /* @__PURE__ */ (void 0)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (void 0)(Label, {
										htmlFor: "stepChannelSelect",
										className: "text-xs font-semibold",
										children: "Canal d'envoi :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 634,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)(Select, {
										value: stepChannel,
										onValueChange: setStepChannel,
										children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
											id: "stepChannelSelect",
											className: "text-xs bg-background",
											children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
												fileName: _jsxFileName$1$1,
												lineNumber: 645,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 641,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: CHANNELS_COMMUNICATION.map((ch) => /* @__PURE__ */ (void 0)(SelectItem, {
											value: ch,
											className: "text-xs",
											children: ch
										}, ch, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 649,
											columnNumber: 23
										}, this)) }, void 0, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 647,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1$1,
										lineNumber: 640,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 633,
									columnNumber: 15
								}, this),
								(selectedTargetStep === "interview" || selectedTargetStep === "second_interview") && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (void 0)(Label, {
										htmlFor: "stepInterviewTypeSelect",
										className: "text-xs font-semibold",
										children: "Format de l'entretien :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 662,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)(Select, {
										value: stepInterviewType,
										onValueChange: setStepInterviewType,
										children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
											id: "stepInterviewTypeSelect",
											className: "text-xs bg-background",
											children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
												fileName: _jsxFileName$1$1,
												lineNumber: 676,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 672,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: TYPES_ENTRETIEN.map((t) => /* @__PURE__ */ (void 0)(SelectItem, {
											value: t,
											className: "text-xs",
											children: t
										}, t, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 680,
											columnNumber: 25
										}, this)) }, void 0, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 678,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1$1,
										lineNumber: 668,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 661,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (void 0)(Label, {
										htmlFor: "stepInterlocuteurInput",
										className: "text-xs font-semibold",
										children: "Interlocuteur (optionnel) :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 689,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)(Input, {
										id: "stepInterlocuteurInput",
										value: stepInterlocuteur,
										onChange: (e) => setStepInterlocuteur(e.target.value),
										placeholder: "ex: Sophie Durand (Talent Acquisition)",
										className: "text-xs bg-background"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 695,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 688,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 660,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "stepNoteInput",
										className: "text-xs font-semibold",
										children: "Commentaire / Note d'étape :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 708,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										id: "stepNoteInput",
										value: stepNote,
										onChange: (e) => setStepNote(e.target.value),
										placeholder: "ex: Dossier envoyé via le formulaire recruteur",
										className: "text-xs bg-background"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 711,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 707,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 582,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, {
							className: "gap-2 sm:gap-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setChangeStepModalOpen(false),
								children: "Annuler"
							}, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 722,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								size: "sm",
								className: "gap-1 font-semibold",
								onClick: handleConfirmChangeStep,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Valider l'étape" }, void 0, false, {
									fileName: _jsxFileName$1$1,
									lineNumber: 734,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName$1$1,
									lineNumber: 735,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1$1,
								lineNumber: 729,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 721,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1$1,
					lineNumber: 570,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1$1,
				lineNumber: 569,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
				open: Boolean(editingEvent),
				onOpenChange: (open) => !open && setEditingEvent(null),
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
					className: "sm:max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
							className: "text-base font-bold flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pen, { className: "size-4 text-primary" }, void 0, false, {
									fileName: _jsxFileName$1$1,
									lineNumber: 749,
									columnNumber: 15
								}, this),
								"Modifier l'événement :",
								" ",
								editingEvent ? getWorkflowStepConfig(editingEvent.type).label : ""
							]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 748,
							columnNumber: 13
						}, this) }, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 747,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-4 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "editDateInput",
										className: "text-xs font-semibold",
										children: "Date :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 759,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										id: "editDateInput",
										type: "date",
										value: editDate,
										onChange: (e) => setEditDate(e.target.value),
										className: "text-xs bg-background"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 762,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 758,
									columnNumber: 13
								}, this),
								editingEvent?.type === "application_sent" && /* @__PURE__ */ (void 0)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (void 0)(Label, {
										htmlFor: "editChannelSelect",
										className: "text-xs font-semibold",
										children: "Canal :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 773,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)(Select, {
										value: editChannel,
										onValueChange: setEditChannel,
										children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
											id: "editChannelSelect",
											className: "text-xs bg-background",
											children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
												fileName: _jsxFileName$1$1,
												lineNumber: 784,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 780,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: CHANNELS_COMMUNICATION.map((ch) => /* @__PURE__ */ (void 0)(SelectItem, {
											value: ch,
											className: "text-xs",
											children: ch
										}, ch, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 788,
											columnNumber: 23
										}, this)) }, void 0, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 786,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1$1,
										lineNumber: 779,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 772,
									columnNumber: 15
								}, this),
								(editingEvent?.type === "interview" || editingEvent?.type === "second_interview") && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (void 0)(Label, {
										htmlFor: "editInterviewTypeSelect",
										className: "text-xs font-semibold",
										children: "Format :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 801,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)(Select, {
										value: editInterviewType,
										onValueChange: setEditInterviewType,
										children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
											id: "editInterviewTypeSelect",
											className: "text-xs bg-background",
											children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
												fileName: _jsxFileName$1$1,
												lineNumber: 815,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 811,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: TYPES_ENTRETIEN.map((t) => /* @__PURE__ */ (void 0)(SelectItem, {
											value: t,
											className: "text-xs",
											children: t
										}, t, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 819,
											columnNumber: 25
										}, this)) }, void 0, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 817,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1$1,
										lineNumber: 807,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 800,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (void 0)(Label, {
										htmlFor: "editInterlocuteurInput",
										className: "text-xs font-semibold",
										children: "Interlocuteur :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 828,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)(Input, {
										id: "editInterlocuteurInput",
										value: editInterlocuteur,
										onChange: (e) => setEditInterlocuteur(e.target.value),
										className: "text-xs bg-background"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 834,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 827,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 799,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "editNoteInput",
										className: "text-xs font-semibold",
										children: "Note / Détails :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 845,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										id: "editNoteInput",
										value: editNote,
										onChange: (e) => setEditNote(e.target.value),
										className: "text-xs bg-background"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 848,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 844,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 757,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, {
							className: "gap-2 sm:gap-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setEditingEvent(null),
								children: "Annuler"
							}, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 858,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								size: "sm",
								onClick: handleSaveEditEvent,
								children: "Enregistrer"
							}, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 865,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 857,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1$1,
					lineNumber: 746,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1$1,
				lineNumber: 742,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
				open: customEventModalOpen,
				onOpenChange: setCustomEventModalOpen,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
					className: "sm:max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
							className: "text-base font-bold flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-4 text-primary" }, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 880,
								columnNumber: 15
							}, this), "Ajouter une entrée au journal"]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 879,
							columnNumber: 13
						}, this) }, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 878,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-4 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										className: "text-xs font-semibold",
										children: "Type d'étape :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 887,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
										value: customEventType,
										onValueChange: (v) => setCustomEventType(v),
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
											className: "text-xs bg-background",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
												fileName: _jsxFileName$1$1,
												lineNumber: 893,
												columnNumber: 19
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 892,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: WORKFLOW_STEPS_CONFIG.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
											value: s.key,
											className: "text-xs",
											children: s.label
										}, s.key, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 897,
											columnNumber: 21
										}, this)) }, void 0, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 895,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1$1,
										lineNumber: 888,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 886,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										className: "text-xs font-semibold",
										children: "Date :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 906,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										type: "date",
										value: customEventDate,
										onChange: (e) => setCustomEventDate(e.target.value),
										className: "text-xs bg-background"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 907,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 905,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										className: "text-xs font-semibold",
										children: "Détail ou note :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 916,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										value: customEventNote,
										onChange: (e) => setCustomEventNote(e.target.value),
										placeholder: "ex: Rappel téléphonique avec le RH",
										className: "text-xs bg-background"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 917,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 915,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 885,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, {
							className: "gap-2 sm:gap-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setCustomEventModalOpen(false),
								children: "Annuler"
							}, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 927,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								size: "sm",
								onClick: handleAddCustomEvent,
								children: "Ajouter"
							}, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 934,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 926,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1$1,
					lineNumber: 877,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1$1,
				lineNumber: 873,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1$1,
		lineNumber: 253,
		columnNumber: 5
	}, this);
}
var _jsxFileName$6 = "/app/applet/src/components/CandidatureSheet.tsx";
function CandidatureSheet({ open, onOpenChange, value, onSave, onDelete, existingItems, onOpenExisting, initialTab = "offre" }) {
	const [form, setForm] = (0, import_react.useState)(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = (0, import_react.useState)(false);
	const [mode, setMode] = (0, import_react.useState)("menu");
	const [pastedText, setPastedText] = (0, import_react.useState)("");
	const [optionalUrl, setOptionalUrl] = (0, import_react.useState)("");
	const [analyzing, setAnalyzing] = (0, import_react.useState)(false);
	const [errorMsg, setErrorMsg] = (0, import_react.useState)(null);
	const [duplicateMatch, setDuplicateMatch] = (0, import_react.useState)(null);
	const [activeTab, setActiveTab] = (0, import_react.useState)(initialTab);
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const [isEditing, setIsEditing] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (open && value) {
			const normalized = normalizeCandidature(value);
			setForm(normalized);
			setErrorMsg(null);
			setDuplicateMatch(null);
			setActiveTab(initialTab || "offre");
			if (!value.entreprise && !value.poste) {
				setMode("menu");
				setPastedText("");
				setOptionalUrl("");
			} else {
				setMode("form");
				if (value.detail) setPastedText(value.detail);
				if (value.lien) setOptionalUrl(value.lien);
			}
			setAnalyzing(false);
		}
	}, [
		open,
		value,
		initialTab
	]);
	if (!form) return null;
	const set = (partial) => {
		setForm((prev) => prev ? normalizeCandidature({
			...prev,
			...partial
		}) : prev);
	};
	const setPrep = (partial) => setForm((prev) => prev ? {
		...prev,
		preparation: {
			...prev.preparation ?? emptyPreparation(),
			...partial
		}
	} : prev);
	const handleAnalyze = async () => {
		if (!pastedText.trim() || pastedText.trim().length < 15) {
			setErrorMsg("Veuillez coller le texte de l'offre (au moins 15 caractères).");
			return;
		}
		setAnalyzing(true);
		setErrorMsg(null);
		let extracted = null;
		let fallbackUsed = false;
		try {
			extracted = await extraireOpportuniteServerFn({ data: {
				text: pastedText,
				url: optionalUrl.trim() || void 0
			} });
		} catch (serverFnErr) {
			console.warn("[CandidatureSheet] Échec createServerFn, tentative via endpoint Vercel /api/extraire-opportunite:", serverFnErr);
			try {
				const res = await fetch("/api/extraire-opportunite", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						text: pastedText,
						url: optionalUrl.trim() || void 0
					})
				});
				if (res.ok) extracted = await res.json();
				else throw new Error(`API HTTP ${res.status}`);
			} catch (apiErr) {
				console.warn("[CandidatureSheet] Échec de l'endpoint distant, activation du moteur heuristique déterministe:", apiErr);
				extracted = extraireOpportuniteHeuristique(pastedText, optionalUrl.trim() || void 0);
				fallbackUsed = true;
			}
		}
		if (!extracted) {
			extracted = extraireOpportuniteHeuristique(pastedText, optionalUrl.trim() || void 0);
			fallbackUsed = true;
		}
		try {
			const missionsList = Array.isArray(extracted.missions) ? extracted.missions : [];
			const missionsStr = missionsList.length > 0 ? missionsList.map((m) => `• ${m}`).join("\n") : typeof extracted.missions === "string" ? extracted.missions : form.missions;
			const updated = normalizeCandidature({
				...form,
				...extracted,
				contractType: extracted.contractType ?? null,
				typeContrat: extracted.contractType ?? null,
				applicationDeadline: extracted.applicationDeadline ?? null,
				dateLimite: extracted.applicationDeadline || "",
				source: extracted.source || form.source || "Autre",
				missions: missionsStr,
				missionsList: missionsList.length > 0 ? missionsList : form.missionsList,
				detail: pastedText,
				lien: optionalUrl.trim() || extracted.sourceUrl || form.lien,
				sourceUrl: optionalUrl.trim() || extracted.sourceUrl || form.sourceUrl,
				statut: form.statut || "Sauvegardée",
				status: form.status || form.statut || "Sauvegardée"
			});
			const allItems = existingItems || loadCandidatures();
			const duplicate = findPotentialDuplicate(updated, allItems);
			if (duplicate) setDuplicateMatch(duplicate);
			setForm(updated);
			setMode("form");
			if (fallbackUsed || extracted._extractionMethod === "heuristic") setErrorMsg("Analyse effectuée via le moteur heuristique. Vous pouvez compléter les champs.");
		} catch (normalizeErr) {
			console.error("Erreur lors de la normalisation de l'offre extraite :", normalizeErr);
			setErrorMsg("Une erreur est survenue lors de l'application des données. Veuillez vérifier les champs.");
		} finally {
			setAnalyzing(false);
		}
	};
	const handleOpenDuplicate = () => {
		if (duplicateMatch) {
			if (onOpenExisting) onOpenExisting(duplicateMatch);
			else setForm(normalizeCandidature(duplicateMatch));
			setDuplicateMatch(null);
		}
	};
	const handleCancelEdit = () => {
		if (value) setForm(normalizeCandidature(value));
		setIsEditing(false);
	};
	const handleIgnoreDuplicate = () => {
		setDuplicateMatch(null);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CenterModal, {
		open,
		onOpenChange,
		size: "full",
		className: "max-w-[1720px] w-[97vw] lg:w-[96vw] max-h-[94vh] h-[94vh] p-0 overflow-hidden",
		bodyClassName: "p-0 flex flex-col min-h-0 overflow-hidden",
		title: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-col gap-2.5 w-full pr-8",
			children: mode === "menu" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "text-lg font-extrabold text-white",
				children: "Nouvelle Opportunité"
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 298,
				columnNumber: 13
			}, this) : mode === "paste" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-2 rounded-xl bg-primary/10 border border-primary/30 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-5" }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 304,
						columnNumber: 17
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 303,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-muted-foreground text-xs font-semibold uppercase tracking-wider block",
					children: "Assistant IA NACORA"
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 307,
					columnNumber: 17
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-base font-bold text-white",
					children: "Analyse & Extraction Intelligente d'Offre"
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 310,
					columnNumber: 17
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 306,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 302,
				columnNumber: 13
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col gap-2.5 w-full",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-base sm:text-lg lg:text-xl font-black text-white leading-tight break-words max-w-5xl flex-1 min-w-0",
						children: form.poste || "Opportunité sans titre"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 321,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 shrink-0 self-start sm:self-center",
						children: !isEditing ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "outline",
								size: "sm",
								className: "h-8 text-[11px] font-black gap-1.5 rounded-xl border-slate-800 text-slate-300 bg-slate-900/40 hover:bg-white/10 hover:border-white/20 transition-all",
								onClick: () => setIsEditing(true),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PenLine, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 335,
									columnNumber: 25
								}, this), "Modifier"]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 329,
								columnNumber: 23
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "outline",
								size: "sm",
								className: "h-8 text-[11px] font-bold gap-1.5 border-purple-500/30 text-purple-200 bg-purple-500/10 hover:bg-purple-500/20 rounded-xl transition-all",
								onClick: () => setMode("paste"),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5 text-purple-300" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 345,
									columnNumber: 25
								}, this), "Ré-extraire avec l'IA"]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 339,
								columnNumber: 23
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "outline",
								size: "sm",
								className: "h-8 text-[11px] font-bold border-slate-800 text-slate-400 hover:text-white rounded-xl bg-slate-950/20",
								onClick: () => onOpenChange(false),
								children: "Fermer"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 349,
								columnNumber: 23
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 328,
							columnNumber: 21
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							size: "sm",
							className: "h-8 text-[11px] font-black gap-1.5 rounded-xl border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800",
							onClick: handleCancelEdit,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 365,
								columnNumber: 23
							}, this), "Mode Consultation"]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 359,
							columnNumber: 21
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 326,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 319,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex wrap items-center gap-x-2 gap-y-1.5 text-xs text-slate-300 border-t border-slate-800/20 pt-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "inline-flex items-center gap-1.5 bg-[#0d0f17] border border-slate-800/80 text-slate-200 font-bold text-[10px] uppercase px-2 py-0.5 rounded-md",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Building2, { className: "size-3 text-slate-400" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 376,
								columnNumber: 19
							}, this), form.entreprise || "Entreprise non spécifiée"]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 375,
							columnNumber: 17
						}, this),
						form.contractType && /* @__PURE__ */ (void 0)("span", {
							className: "inline-flex items-center gap-1 bg-white/10 text-slate-200 font-extrabold text-[10px] px-2.5 py-0.5 rounded-lg backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
							children: [/* @__PURE__ */ (void 0)(Briefcase, { className: "size-3 text-slate-300" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 383,
								columnNumber: 21
							}, this), form.contractType]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 382,
							columnNumber: 19
						}, this),
						form.lieu && /* @__PURE__ */ (void 0)("span", {
							className: "inline-flex items-center gap-1 bg-white/10 text-slate-300 font-bold text-[10px] px-2.5 py-0.5 rounded-lg backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
							children: [/* @__PURE__ */ (void 0)(MapPin, { className: "size-3 text-slate-400" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 391,
								columnNumber: 21
							}, this), form.lieu]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 390,
							columnNumber: 19
						}, this),
						form.salary && /* @__PURE__ */ (void 0)("span", {
							className: "inline-flex items-center gap-1 bg-emerald-500/15 text-emerald-300 font-extrabold text-[10px] px-2.5 py-0.5 rounded-lg backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]",
							children: [/* @__PURE__ */ (void 0)(Euro, { className: "size-3 text-emerald-400" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 399,
								columnNumber: 21
							}, this), form.salary]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 398,
							columnNumber: 19
						}, this),
						form.duration && /* @__PURE__ */ (void 0)("span", {
							className: "inline-flex items-center gap-1 bg-white/10 text-slate-300 font-bold text-[10px] px-2.5 py-0.5 rounded-lg backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
							children: [/* @__PURE__ */ (void 0)(Clock, { className: "size-3 text-slate-400" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 407,
								columnNumber: 21
							}, this), form.duration]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 406,
							columnNumber: 19
						}, this),
						form.startDate && /* @__PURE__ */ (void 0)("span", {
							className: "inline-flex items-center gap-1 bg-white/10 text-slate-300 font-semibold text-[10px] px-2.5 py-0.5 rounded-lg backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
							children: [
								/* @__PURE__ */ (void 0)(Calendar, { className: "size-3 text-slate-400" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 415,
									columnNumber: 21
								}, this),
								"Début : ",
								form.startDate
							]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 414,
							columnNumber: 19
						}, this),
						(form.dateLimite || form.applicationDeadline) && /* @__PURE__ */ (void 0)("span", {
							className: "inline-flex items-center gap-1 bg-rose-500/15 text-rose-300 font-extrabold font-mono text-[10px] px-2.5 py-0.5 rounded-lg backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]",
							children: [
								/* @__PURE__ */ (void 0)(Calendar, { className: "size-3 text-rose-400" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 423,
									columnNumber: 21
								}, this),
								"DL :",
								" ",
								formatDate(form.dateLimite || form.applicationDeadline || "")
							]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 422,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatutBadge, {
							statut: form.statut,
							size: "xs"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 432,
							columnNumber: 17
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 373,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 317,
				columnNumber: 13
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$6,
			lineNumber: 296,
			columnNumber: 9
		}, this),
		description: mode === "menu" ? "Choisissez le mode d'ajout de votre opportunité." : mode === "paste" ? "Collez le texte brut de l'annonce d'emploi pour une extraction automatique." : void 0,
		children: [
			mode === "menu" && /* @__PURE__ */ (void 0)("div", {
				className: "p-6 lg:p-8 grid gap-4 max-w-xl mx-auto py-12",
				children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "text-center mb-4 space-y-1.5",
						children: [/* @__PURE__ */ (void 0)("h3", {
							className: "font-extrabold text-xl text-white",
							children: "Comment souhaitez-vous ajouter cette opportunité ?"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 450,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-slate-300 leading-relaxed",
							children: "L'Assistant IA NACORA analyse et extrait automatiquement l'entreprise, les missions clés, compétences requises et modalités."
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 453,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 449,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(Button, {
						variant: "outline",
						className: "h-24 justify-start gap-4 p-4 border-primary/30 hover:border-primary/80 hover:bg-primary/10 transition-all text-left rounded-2xl cursor-pointer bg-slate-900/60",
						onClick: () => setMode("paste"),
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "bg-primary/15 text-primary p-3.5 rounded-2xl shrink-0",
							children: /* @__PURE__ */ (void 0)(Sparkles, { className: "size-7" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 466,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 465,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (void 0)("p", {
									className: "font-bold text-sm text-white",
									children: "Extraction Automatique par IA"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 470,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)(Badge, {
									className: "bg-primary text-white border-none text-[10px] font-bold py-0.5 px-2",
									children: "Recommandé"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 473,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 469,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-slate-300",
								children: "Copiez-collez le texte de l'offre depuis LinkedIn, WTTJ, JobTeaser..."
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 477,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 468,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 460,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "relative my-2",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "absolute inset-0 flex items-center",
							children: /* @__PURE__ */ (void 0)("span", { className: "w-full border-t border-slate-800" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 486,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 485,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "relative flex justify-center text-[11px] uppercase",
							children: /* @__PURE__ */ (void 0)("span", {
								className: "bg-[#0A0C14] px-3 text-slate-400 font-bold",
								children: "Ou"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 489,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 488,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 484,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(Button, {
						variant: "ghost",
						className: "h-16 justify-start gap-4 border border-slate-800 hover:bg-slate-900/80 rounded-2xl cursor-pointer",
						onClick: () => setMode("form"),
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "bg-slate-800 text-slate-200 p-2.5 rounded-xl",
							children: /* @__PURE__ */ (void 0)(PenLine, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 501,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 500,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "text-left",
							children: [/* @__PURE__ */ (void 0)("p", {
								className: "font-bold text-sm text-white",
								children: "Saisie Manuelle"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 504,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-slate-300",
								children: "Renseigner manuellement les informations du poste"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 505,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 503,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 495,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 448,
				columnNumber: 9
			}, this),
			mode === "paste" && /* @__PURE__ */ (void 0)("div", {
				className: "p-6 lg:p-8 flex flex-col gap-5 max-w-4xl mx-auto w-full",
				children: [
					errorMsg && /* @__PURE__ */ (void 0)("div", {
						className: "p-4 rounded-2xl bg-destructive/15 border border-destructive/30 text-xs text-destructive flex items-start gap-3 font-medium",
						children: [/* @__PURE__ */ (void 0)(TriangleAlert, { className: "size-4 shrink-0 mt-0.5" }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 518,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", { children: errorMsg }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 519,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 517,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (void 0)(Label, {
							htmlFor: "optionalUrl",
							className: "text-xs font-bold uppercase tracking-wider text-slate-200",
							children: "Lien web de l'offre (optionnel)"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 524,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)(Input, {
							id: "optionalUrl",
							placeholder: "https://...",
							value: optionalUrl,
							onChange: (e) => setOptionalUrl(e.target.value),
							disabled: analyzing,
							className: "text-sm h-10 bg-[#08090E] text-slate-100 placeholder:text-slate-400 rounded-xl border-slate-700/80"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 530,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 523,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "space-y-2 flex-1 flex flex-col",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (void 0)(Label, {
								htmlFor: "rawOfferText",
								className: "text-xs font-bold uppercase tracking-wider text-slate-200",
								children: "Texte brut de l'annonce d'emploi *"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 542,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("span", {
								className: "text-xs font-semibold text-slate-400",
								children: [pastedText.length, " caractères"]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 548,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 541,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)(Textarea, {
							id: "rawOfferText",
							placeholder: "Collez ici l'intégralité du texte de l'annonce (intitulé, missions, profil, entreprise...)",
							className: "h-80 resize-none text-xs leading-relaxed bg-[#08090E] text-slate-100 placeholder:text-slate-400 border-slate-700/80 rounded-xl",
							value: pastedText,
							onChange: (e) => {
								setPastedText(e.target.value);
								if (errorMsg) setErrorMsg(null);
							},
							disabled: analyzing
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 552,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 540,
						columnNumber: 11
					}, this),
					analyzing && /* @__PURE__ */ (void 0)("div", {
						className: "p-4 rounded-2xl bg-primary/10 border border-primary/30 flex items-center gap-3.5 animate-pulse",
						children: [/* @__PURE__ */ (void 0)(LoaderCircle, { className: "size-5 animate-spin text-primary shrink-0" }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 567,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "text-xs space-y-0.5",
							children: [/* @__PURE__ */ (void 0)("p", {
								className: "font-bold text-white",
								children: "Analyse par l'IA en cours..."
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 569,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-slate-300",
								children: "Extraction des missions, compétences requises, chiffres clés et coordonnées."
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 572,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 568,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 566,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center justify-between gap-3 pt-3 border-t border-slate-800",
						children: [/* @__PURE__ */ (void 0)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setMode("menu"),
							disabled: analyzing,
							className: "border-slate-700 text-slate-200",
							children: "Retour"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 581,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (void 0)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => setMode("form"),
								disabled: analyzing,
								className: "text-xs text-slate-300 hover:text-white",
								children: "Saisie manuelle"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 591,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)(Button, {
								size: "sm",
								disabled: !pastedText.trim() || analyzing,
								onClick: handleAnalyze,
								className: "gap-2 px-6 bg-primary hover:bg-primary/95 text-white font-semibold",
								children: [analyzing ? /* @__PURE__ */ (void 0)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 607,
									columnNumber: 19
								}, this) : /* @__PURE__ */ (void 0)(Sparkles, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 609,
									columnNumber: 19
								}, this), "Extraire avec l'IA"]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 600,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 590,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 580,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 515,
				columnNumber: 9
			}, this),
			mode === "form" && /* @__PURE__ */ (void 0)("div", {
				className: "flex flex-col h-full min-h-0 overflow-hidden bg-[#07080D]",
				children: [
					duplicateMatch && /* @__PURE__ */ (void 0)("div", {
						className: "mx-6 mt-3 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs flex items-center justify-between gap-3 shrink-0",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (void 0)(TriangleAlert, { className: "size-5 text-amber-500 shrink-0" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 625,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", { children: [
								/* @__PURE__ */ (void 0)("span", {
									className: "font-bold text-amber-400",
									children: "Opportunité existante détectée :"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 627,
									columnNumber: 19
								}, this),
								" ",
								/* @__PURE__ */ (void 0)("span", {
									className: "font-semibold text-slate-100",
									children: [
										duplicateMatch.entreprise,
										" — ",
										duplicateMatch.poste
									]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 630,
									columnNumber: 19
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 626,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 624,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2 shrink-0",
							children: [/* @__PURE__ */ (void 0)(Button, {
								size: "sm",
								variant: "outline",
								className: "h-7 text-xs border-amber-500/40 text-amber-300 hover:bg-amber-500/20",
								onClick: handleOpenDuplicate,
								children: "Ouvrir l'existante"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 636,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(Button, {
								size: "sm",
								variant: "ghost",
								className: "h-7 text-xs text-slate-400 hover:text-white",
								onClick: handleIgnoreDuplicate,
								children: "Conserver celle-ci"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 644,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 635,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 623,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "flex-1 flex flex-col min-h-0 overflow-hidden bg-[#07080D]",
						children: /* @__PURE__ */ (void 0)(Tabs, {
							value: activeTab,
							onValueChange: (v) => setActiveTab(v),
							className: "flex-1 flex flex-col min-h-0",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "px-4 lg:px-8 py-2.5 bg-black/20 backdrop-blur-xl shrink-0",
								children: /* @__PURE__ */ (void 0)(TabsList, {
									className: "w-full justify-start h-10 p-0 bg-transparent gap-2 overflow-x-auto",
									children: [
										/* @__PURE__ */ (void 0)(TabsTrigger, {
											value: "offre",
											className: "rounded-xl px-4 py-2 text-xs font-extrabold transition-all text-slate-300 data-[state=active]:bg-white/18 data-[state=active]:text-white data-[state=active]:shadow-md backdrop-blur-md cursor-pointer",
											children: "Offre & Missions"
										}, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 670,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)(TabsTrigger, {
											value: "profil",
											className: "rounded-xl px-4 py-2 text-xs font-extrabold transition-all text-slate-300 data-[state=active]:bg-white/18 data-[state=active]:text-white data-[state=active]:shadow-md backdrop-blur-md cursor-pointer",
											children: "Profil & Recrutement"
										}, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 676,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)(TabsTrigger, {
											value: "entreprise",
											className: "rounded-xl px-4 py-2 text-xs font-extrabold transition-all text-slate-300 data-[state=active]:bg-white/18 data-[state=active]:text-white data-[state=active]:shadow-md backdrop-blur-md cursor-pointer",
											children: "Entreprise"
										}, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 682,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)(TabsTrigger, {
											value: "workflow",
											className: "rounded-xl px-4 py-2 text-xs font-extrabold transition-all text-slate-300 data-[state=active]:bg-white/18 data-[state=active]:text-white data-[state=active]:shadow-md backdrop-blur-md cursor-pointer flex items-center gap-1.5",
											children: [/* @__PURE__ */ (void 0)(GitFork, { className: "size-3.5" }, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 692,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("span", { children: "Workflow & Suivi" }, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 693,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$6,
											lineNumber: 688,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 669,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 668,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex-1 overflow-y-auto p-4 lg:p-6 space-y-5",
								children: [
									/* @__PURE__ */ (void 0)(TabsContent, {
										value: "offre",
										className: "mt-0 space-y-6 data-[state=inactive]:hidden",
										children: !isEditing ? /* @__PURE__ */ (void 0)("div", {
											className: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "lg:col-span-8 space-y-6",
												children: /* @__PURE__ */ (void 0)("div", {
													className: "rounded-2xl bg-white/5 backdrop-blur-xl p-5 lg:p-6 space-y-4 shadow-md",
													children: [/* @__PURE__ */ (void 0)("div", {
														className: "flex items-center justify-between border-b border-white/5 pb-3",
														children: [/* @__PURE__ */ (void 0)("h3", {
															className: "text-sm font-extrabold uppercase tracking-wider text-slate-100 flex items-center gap-2",
															children: [
																/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-4 text-emerald-400" }, void 0, false, {
																	fileName: _jsxFileName$6,
																	lineNumber: 713,
																	columnNumber: 31
																}, this),
																" ",
																"Missions Principales"
															]
														}, void 0, true, {
															fileName: _jsxFileName$6,
															lineNumber: 712,
															columnNumber: 29
														}, this), /* @__PURE__ */ (void 0)(Badge, {
															className: "bg-white/12 text-slate-200 border-none font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
															children: [form.missionsList?.length || 0, " missions extraites"]
														}, void 0, true, {
															fileName: _jsxFileName$6,
															lineNumber: 716,
															columnNumber: 29
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName$6,
														lineNumber: 711,
														columnNumber: 27
													}, this), form.missionsList && form.missionsList.length > 0 ? /* @__PURE__ */ (void 0)("div", {
														className: "grid grid-cols-1 md:grid-cols-2 gap-4",
														children: form.missionsList.map((m, idx) => /* @__PURE__ */ (void 0)("div", {
															className: "flex items-start gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all shadow-sm",
															children: [/* @__PURE__ */ (void 0)("div", {
																className: "flex items-center justify-center size-6 rounded-lg bg-white/12 text-slate-200 font-mono text-[11px] font-bold shrink-0 mt-0.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
																children: String(idx + 1).padStart(2, "0")
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 729,
																columnNumber: 35
															}, this), /* @__PURE__ */ (void 0)("p", {
																className: "text-xs lg:text-sm text-slate-100 font-medium leading-relaxed flex-1",
																children: m
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 732,
																columnNumber: 35
															}, this)]
														}, idx, true, {
															fileName: _jsxFileName$6,
															lineNumber: 725,
															columnNumber: 33
														}, this))
													}, void 0, false, {
														fileName: _jsxFileName$6,
														lineNumber: 723,
														columnNumber: 29
													}, this) : /* @__PURE__ */ (void 0)("p", {
														className: "text-xs text-slate-400 italic",
														children: "Aucune mission renseignée pour le moment."
													}, void 0, false, {
														fileName: _jsxFileName$6,
														lineNumber: 739,
														columnNumber: 29
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$6,
													lineNumber: 710,
													columnNumber: 25
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 709,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "lg:col-span-4 space-y-6",
												children: [
													/* @__PURE__ */ (void 0)("div", {
														className: "rounded-2xl bg-white/5 backdrop-blur-xl p-5 space-y-3 shadow-md",
														children: [/* @__PURE__ */ (void 0)("div", {
															className: "flex items-center gap-2 border-b border-white/5 pb-2",
															children: [/* @__PURE__ */ (void 0)(Users, { className: "size-4 text-sky-400" }, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 751,
																columnNumber: 29
															}, this), /* @__PURE__ */ (void 0)("span", {
																className: "text-[10px] font-extrabold uppercase tracking-wider text-slate-200 block",
																children: "Contact RH & Recruteur"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 752,
																columnNumber: 29
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$6,
															lineNumber: 750,
															columnNumber: 27
														}, this), /* @__PURE__ */ (void 0)("div", {
															className: "space-y-2.5",
															children: [
																/* @__PURE__ */ (void 0)("div", {
																	className: "flex items-center gap-2.5 text-slate-200",
																	children: [/* @__PURE__ */ (void 0)("div", {
																		className: "p-1.5 rounded-lg bg-white/10",
																		children: /* @__PURE__ */ (void 0)(User, { className: "size-4 text-sky-400" }, void 0, false, {
																			fileName: _jsxFileName$6,
																			lineNumber: 759,
																			columnNumber: 33
																		}, this)
																	}, void 0, false, {
																		fileName: _jsxFileName$6,
																		lineNumber: 758,
																		columnNumber: 31
																	}, this), /* @__PURE__ */ (void 0)("span", {
																		className: "font-bold text-white text-sm",
																		children: form.contact || "Aucun contact spécifié"
																	}, void 0, false, {
																		fileName: _jsxFileName$6,
																		lineNumber: 761,
																		columnNumber: 31
																	}, this)]
																}, void 0, true, {
																	fileName: _jsxFileName$6,
																	lineNumber: 757,
																	columnNumber: 29
																}, this),
																form.contactEmail && /* @__PURE__ */ (void 0)("div", {
																	className: "flex items-center gap-2.5 text-slate-300",
																	children: [/* @__PURE__ */ (void 0)("div", {
																		className: "p-1.5 rounded-lg bg-white/10",
																		children: /* @__PURE__ */ (void 0)(Mail, { className: "size-4 text-slate-400" }, void 0, false, {
																			fileName: _jsxFileName$6,
																			lineNumber: 768,
																			columnNumber: 35
																		}, this)
																	}, void 0, false, {
																		fileName: _jsxFileName$6,
																		lineNumber: 767,
																		columnNumber: 33
																	}, this), /* @__PURE__ */ (void 0)("a", {
																		href: `mailto:${form.contactEmail}`,
																		className: "hover:underline text-sky-400 text-xs font-semibold",
																		children: form.contactEmail
																	}, void 0, false, {
																		fileName: _jsxFileName$6,
																		lineNumber: 770,
																		columnNumber: 33
																	}, this)]
																}, void 0, true, {
																	fileName: _jsxFileName$6,
																	lineNumber: 766,
																	columnNumber: 31
																}, this),
																form.contactPhone && /* @__PURE__ */ (void 0)("div", {
																	className: "flex items-center gap-2.5 text-slate-300",
																	children: [/* @__PURE__ */ (void 0)("div", {
																		className: "p-1.5 rounded-lg bg-white/10",
																		children: /* @__PURE__ */ (void 0)(PhoneCall, { className: "size-4 text-slate-400" }, void 0, false, {
																			fileName: _jsxFileName$6,
																			lineNumber: 781,
																			columnNumber: 35
																		}, this)
																	}, void 0, false, {
																		fileName: _jsxFileName$6,
																		lineNumber: 780,
																		columnNumber: 33
																	}, this), /* @__PURE__ */ (void 0)("span", {
																		className: "text-xs font-semibold text-slate-200",
																		children: form.contactPhone
																	}, void 0, false, {
																		fileName: _jsxFileName$6,
																		lineNumber: 783,
																		columnNumber: 33
																	}, this)]
																}, void 0, true, {
																	fileName: _jsxFileName$6,
																	lineNumber: 779,
																	columnNumber: 31
																}, this)
															]
														}, void 0, true, {
															fileName: _jsxFileName$6,
															lineNumber: 756,
															columnNumber: 27
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName$6,
														lineNumber: 749,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ (void 0)("div", {
														className: "rounded-2xl bg-white/5 backdrop-blur-xl p-5 shadow-md",
														children: /* @__PURE__ */ (void 0)(TagListEditor, {
															label: "Avantages & Environnement",
															items: form.benefits || [],
															onChange: (items) => set({ benefits: items }),
															placeholder: "Ajouter un avantage (ex: Télétravail 2j, Mutuelle...)",
															badgeClassName: "bg-emerald-500/20 text-emerald-200 font-bold",
															emptyText: "Aucun avantage spécifié.",
															isEditing: false
														}, void 0, false, {
															fileName: _jsxFileName$6,
															lineNumber: 793,
															columnNumber: 27
														}, this)
													}, void 0, false, {
														fileName: _jsxFileName$6,
														lineNumber: 792,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ (void 0)("div", {
														className: "rounded-2xl bg-white/5 backdrop-blur-xl p-5 space-y-3.5 shadow-md",
														children: [/* @__PURE__ */ (void 0)("div", {
															className: "flex items-center gap-2 border-b border-white/5 pb-2",
															children: [/* @__PURE__ */ (void 0)(FileText, { className: "size-4 text-amber-400" }, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 807,
																columnNumber: 29
															}, this), /* @__PURE__ */ (void 0)("span", {
																className: "text-[10px] font-extrabold uppercase tracking-wider text-slate-200 block",
																children: "Notes Personnelles & Privées"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 808,
																columnNumber: 29
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$6,
															lineNumber: 806,
															columnNumber: 27
														}, this), /* @__PURE__ */ (void 0)("p", {
															className: "text-xs text-slate-100 font-medium leading-relaxed whitespace-pre-wrap italic",
															children: form.personalNotes || form.commentaire || "Aucune note privée renseignée pour le moment."
														}, void 0, false, {
															fileName: _jsxFileName$6,
															lineNumber: 812,
															columnNumber: 27
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName$6,
														lineNumber: 805,
														columnNumber: 25
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName$6,
												lineNumber: 747,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$6,
											lineNumber: 707,
											columnNumber: 21
										}, this) : /* @__PURE__ */ (void 0)("div", {
											className: "space-y-6",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "rounded-2xl border border-primary/20 bg-[#10131F] p-5 lg:p-6 space-y-5 shadow-lg",
												children: [/* @__PURE__ */ (void 0)("div", {
													className: "flex items-center gap-2 border-b border-slate-800 pb-3",
													children: [/* @__PURE__ */ (void 0)(SlidersHorizontal, { className: "size-4 text-primary" }, void 0, false, {
														fileName: _jsxFileName$6,
														lineNumber: 826,
														columnNumber: 27
													}, this), /* @__PURE__ */ (void 0)("h3", {
														className: "text-xs font-black uppercase tracking-wider text-muted-foreground",
														children: "Modification des Informations Générales de l'Offre"
													}, void 0, false, {
														fileName: _jsxFileName$6,
														lineNumber: 827,
														columnNumber: 27
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$6,
													lineNumber: 825,
													columnNumber: 25
												}, this), /* @__PURE__ */ (void 0)("div", {
													className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
													children: [
														/* @__PURE__ */ (void 0)("div", {
															className: "grid gap-1.5 sm:col-span-2 lg:col-span-2",
															children: [/* @__PURE__ */ (void 0)(Label, {
																htmlFor: "titleInput",
																className: "text-xs font-bold uppercase tracking-wider text-slate-200",
																children: "Intitulé exact du poste *"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 834,
																columnNumber: 29
															}, this), /* @__PURE__ */ (void 0)(Input, {
																id: "titleInput",
																value: form.poste,
																onChange: (e) => set({
																	poste: e.target.value,
																	title: e.target.value
																}),
																placeholder: "ex: Lead Developer Frontend React",
																className: "bg-[#05060A] text-slate-100 text-sm h-10 rounded-xl border-slate-700/80 font-medium"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 840,
																columnNumber: 29
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$6,
															lineNumber: 833,
															columnNumber: 27
														}, this),
														/* @__PURE__ */ (void 0)("div", {
															className: "grid gap-1.5",
															children: [/* @__PURE__ */ (void 0)(Label, {
																htmlFor: "companyInput",
																className: "text-xs font-bold uppercase tracking-wider text-slate-200",
																children: "Entreprise *"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 855,
																columnNumber: 29
															}, this), /* @__PURE__ */ (void 0)(Input, {
																id: "companyInput",
																value: form.entreprise,
																onChange: (e) => set({
																	entreprise: e.target.value,
																	company: e.target.value,
																	companyName: e.target.value
																}),
																placeholder: "ex: NACORA",
																className: "bg-[#05060A] text-slate-100 text-sm h-10 rounded-xl border-slate-700/80 font-medium"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 861,
																columnNumber: 29
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$6,
															lineNumber: 854,
															columnNumber: 27
														}, this),
														/* @__PURE__ */ (void 0)("div", {
															className: "grid gap-1.5",
															children: [/* @__PURE__ */ (void 0)(Label, {
																htmlFor: "contractTypeInput",
																className: "text-xs font-bold uppercase tracking-wider text-slate-200",
																children: "Type de contrat"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 877,
																columnNumber: 29
															}, this), /* @__PURE__ */ (void 0)(Input, {
																id: "contractTypeInput",
																value: form.contractType || "",
																onChange: (e) => set({ contractType: e.target.value }),
																placeholder: "ex: CDI, CDD, Stage...",
																className: "bg-[#05060A] text-slate-100 text-sm h-10 rounded-xl border-slate-700/80"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 883,
																columnNumber: 29
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$6,
															lineNumber: 876,
															columnNumber: 27
														}, this),
														/* @__PURE__ */ (void 0)("div", {
															className: "grid gap-1.5",
															children: [/* @__PURE__ */ (void 0)(Label, {
																htmlFor: "durationInput",
																className: "text-xs font-bold uppercase tracking-wider text-slate-200",
																children: "Durée / Temps de travail"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 895,
																columnNumber: 29
															}, this), /* @__PURE__ */ (void 0)(Input, {
																id: "durationInput",
																value: form.duration || "",
																onChange: (e) => set({ duration: e.target.value }),
																placeholder: "ex: Temps plein (39h)",
																className: "bg-[#05060A] text-slate-100 text-sm h-10 rounded-xl border-slate-700/80"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 901,
																columnNumber: 29
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$6,
															lineNumber: 894,
															columnNumber: 27
														}, this),
														/* @__PURE__ */ (void 0)("div", {
															className: "grid gap-1.5",
															children: [/* @__PURE__ */ (void 0)(Label, {
																htmlFor: "locationInput",
																className: "text-xs font-bold uppercase tracking-wider text-slate-200",
																children: "Lieu / Localisation"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 913,
																columnNumber: 29
															}, this), /* @__PURE__ */ (void 0)(Input, {
																id: "locationInput",
																value: form.lieu,
																onChange: (e) => set({
																	lieu: e.target.value,
																	location: e.target.value
																}),
																placeholder: "ex: Paris, France (Hybride)",
																className: "bg-[#05060A] text-slate-100 text-sm h-10 rounded-xl border-slate-700/80"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 919,
																columnNumber: 29
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$6,
															lineNumber: 912,
															columnNumber: 27
														}, this),
														/* @__PURE__ */ (void 0)("div", {
															className: "grid gap-1.5",
															children: [/* @__PURE__ */ (void 0)(Label, {
																htmlFor: "startDateInput",
																className: "text-xs font-bold uppercase tracking-wider text-slate-200",
																children: "Date de début"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 934,
																columnNumber: 29
															}, this), /* @__PURE__ */ (void 0)(Input, {
																id: "startDateInput",
																value: form.startDate || "",
																onChange: (e) => set({ startDate: e.target.value }),
																placeholder: "ex: Dès que possible",
																className: "bg-[#05060A] text-slate-100 text-sm h-10 rounded-xl border-slate-700/80"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 940,
																columnNumber: 29
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$6,
															lineNumber: 933,
															columnNumber: 27
														}, this),
														/* @__PURE__ */ (void 0)("div", {
															className: "grid gap-1.5",
															children: [/* @__PURE__ */ (void 0)(Label, {
																htmlFor: "applicationDeadlineInput",
																className: "text-xs font-bold uppercase tracking-wider text-slate-200",
																children: "Deadline de candidature"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 952,
																columnNumber: 29
															}, this), /* @__PURE__ */ (void 0)(Input, {
																id: "applicationDeadlineInput",
																type: "date",
																value: form.dateLimite || form.applicationDeadline || "",
																onChange: (e) => set({
																	dateLimite: e.target.value,
																	applicationDeadline: e.target.value
																}),
																className: "bg-[#05060A] text-slate-100 text-sm h-10 rounded-xl border-slate-700/80"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 958,
																columnNumber: 29
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$6,
															lineNumber: 951,
															columnNumber: 27
														}, this),
														/* @__PURE__ */ (void 0)("div", {
															className: "grid gap-1.5",
															children: [/* @__PURE__ */ (void 0)(Label, {
																htmlFor: "salaryInput",
																className: "text-xs font-bold uppercase tracking-wider text-slate-200",
																children: "Rémunération / Salaire"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 977,
																columnNumber: 29
															}, this), /* @__PURE__ */ (void 0)(Input, {
																id: "salaryInput",
																value: form.salary || "",
																onChange: (e) => set({ salary: e.target.value }),
																placeholder: "ex: 48k€ - 58k€ / an",
																className: "bg-[#05060A] text-slate-100 text-sm h-10 rounded-xl border-slate-700/80"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 983,
																columnNumber: 29
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$6,
															lineNumber: 976,
															columnNumber: 27
														}, this),
														/* @__PURE__ */ (void 0)("div", {
															className: "grid gap-1.5 sm:col-span-2 lg:col-span-3",
															children: [/* @__PURE__ */ (void 0)(Label, {
																htmlFor: "sourceUrlInput",
																className: "text-xs font-bold uppercase tracking-wider text-slate-200",
																children: "Lien source de l'annonce"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 993,
																columnNumber: 29
															}, this), /* @__PURE__ */ (void 0)("div", {
																className: "flex gap-2",
																children: [/* @__PURE__ */ (void 0)(Input, {
																	id: "sourceUrlInput",
																	value: form.lien || form.sourceUrl || "",
																	onChange: (e) => set({
																		lien: e.target.value,
																		sourceUrl: e.target.value
																	}),
																	placeholder: "https://...",
																	className: "bg-[#05060A] text-slate-100 text-sm h-10 rounded-xl border-slate-700/80 flex-1"
																}, void 0, false, {
																	fileName: _jsxFileName$6,
																	lineNumber: 1e3,
																	columnNumber: 31
																}, this), (form.lien || form.sourceUrl) && /* @__PURE__ */ (void 0)(Button, {
																	variant: "outline",
																	size: "sm",
																	asChild: true,
																	className: "h-10 px-4 shrink-0 rounded-xl border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-100",
																	children: /* @__PURE__ */ (void 0)("a", {
																		href: form.lien || form.sourceUrl || "#",
																		target: "_blank",
																		rel: "noreferrer",
																		children: /* @__PURE__ */ (void 0)(ExternalLink, { className: "size-4 text-primary" }, void 0, false, {
																			fileName: _jsxFileName$6,
																			lineNumber: 1024,
																			columnNumber: 37
																		}, this)
																	}, void 0, false, {
																		fileName: _jsxFileName$6,
																		lineNumber: 1019,
																		columnNumber: 35
																	}, this)
																}, void 0, false, {
																	fileName: _jsxFileName$6,
																	lineNumber: 1013,
																	columnNumber: 33
																}, this)]
															}, void 0, true, {
																fileName: _jsxFileName$6,
																lineNumber: 999,
																columnNumber: 29
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$6,
															lineNumber: 992,
															columnNumber: 27
														}, this)
													]
												}, void 0, true, {
													fileName: _jsxFileName$6,
													lineNumber: 832,
													columnNumber: 25
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$6,
												lineNumber: 824,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
												children: [/* @__PURE__ */ (void 0)("div", {
													className: "rounded-2xl border border-slate-800 bg-[#10131F] p-5 space-y-4",
													children: [/* @__PURE__ */ (void 0)("h3", {
														className: "text-xs font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-2",
														children: [
															/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-4 text-primary" }, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 1038,
																columnNumber: 29
															}, this),
															" ",
															"Missions Principales (",
															form.missionsList?.length || 0,
															")"
														]
													}, void 0, true, {
														fileName: _jsxFileName$6,
														lineNumber: 1037,
														columnNumber: 27
													}, this), /* @__PURE__ */ (void 0)("div", {
														className: "space-y-2",
														children: [/* @__PURE__ */ (void 0)(Label, {
															htmlFor: "missionsTextarea",
															className: "text-xs font-bold uppercase tracking-wider text-slate-200",
															children: "Une mission par ligne :"
														}, void 0, false, {
															fileName: _jsxFileName$6,
															lineNumber: 1043,
															columnNumber: 29
														}, this), /* @__PURE__ */ (void 0)(Textarea, {
															id: "missionsTextarea",
															rows: 10,
															value: typeof form.missions === "string" ? form.missions : Array.isArray(form.missions) ? form.missions.join("\n") : "",
															onChange: (e) => {
																const val = e.target.value || "";
																const list = val.split("\n").map((line) => line.replace(/^[•\-*0-9.]+\s*/, "").trim()).filter(Boolean);
																set({
																	missions: val,
																	missionsList: list
																});
															},
															placeholder: "01. Mission 1\n02. Mission 2",
															className: "bg-[#05060A] text-slate-100 text-xs leading-relaxed rounded-xl border-slate-700/80 placeholder:text-slate-500 h-64 resize-y"
														}, void 0, false, {
															fileName: _jsxFileName$6,
															lineNumber: 1049,
															columnNumber: 29
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName$6,
														lineNumber: 1042,
														columnNumber: 27
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$6,
													lineNumber: 1036,
													columnNumber: 25
												}, this), /* @__PURE__ */ (void 0)("div", {
													className: "space-y-6",
													children: [
														/* @__PURE__ */ (void 0)("div", {
															className: "rounded-2xl border border-slate-800 bg-[#10131F] p-5 space-y-4",
															children: [/* @__PURE__ */ (void 0)("span", {
																className: "text-xs font-extrabold uppercase tracking-wider text-muted-foreground block",
																children: "Contacts RH & Recrutement"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 1078,
																columnNumber: 29
															}, this), /* @__PURE__ */ (void 0)("div", {
																className: "grid gap-3",
																children: [
																	/* @__PURE__ */ (void 0)("div", {
																		className: "space-y-1",
																		children: [/* @__PURE__ */ (void 0)(Label, {
																			className: "text-xs font-semibold text-slate-300",
																			children: "Nom du contact"
																		}, void 0, false, {
																			fileName: _jsxFileName$6,
																			lineNumber: 1083,
																			columnNumber: 33
																		}, this), /* @__PURE__ */ (void 0)(Input, {
																			value: form.contact || "",
																			onChange: (e) => set({ contact: e.target.value }),
																			placeholder: "Nom du contact RH...",
																			className: "text-xs bg-[#05060A] text-slate-100 placeholder:text-slate-500 h-9 rounded-lg border-slate-700/80"
																		}, void 0, false, {
																			fileName: _jsxFileName$6,
																			lineNumber: 1086,
																			columnNumber: 33
																		}, this)]
																	}, void 0, true, {
																		fileName: _jsxFileName$6,
																		lineNumber: 1082,
																		columnNumber: 31
																	}, this),
																	/* @__PURE__ */ (void 0)("div", {
																		className: "space-y-1",
																		children: [/* @__PURE__ */ (void 0)(Label, {
																			className: "text-xs font-semibold text-slate-300",
																			children: "Email du contact"
																		}, void 0, false, {
																			fileName: _jsxFileName$6,
																			lineNumber: 1096,
																			columnNumber: 33
																		}, this), /* @__PURE__ */ (void 0)(Input, {
																			value: form.contactEmail || "",
																			onChange: (e) => set({ contactEmail: e.target.value }),
																			placeholder: "Email RH (ex: rh@entreprise.com)",
																			className: "text-xs bg-[#05060A] text-slate-100 placeholder:text-slate-500 h-9 rounded-lg border-slate-700/80"
																		}, void 0, false, {
																			fileName: _jsxFileName$6,
																			lineNumber: 1099,
																			columnNumber: 33
																		}, this)]
																	}, void 0, true, {
																		fileName: _jsxFileName$6,
																		lineNumber: 1095,
																		columnNumber: 31
																	}, this),
																	/* @__PURE__ */ (void 0)("div", {
																		className: "space-y-1",
																		children: [/* @__PURE__ */ (void 0)(Label, {
																			className: "text-xs font-semibold text-slate-300",
																			children: "Téléphone du contact"
																		}, void 0, false, {
																			fileName: _jsxFileName$6,
																			lineNumber: 1109,
																			columnNumber: 33
																		}, this), /* @__PURE__ */ (void 0)(Input, {
																			value: form.contactPhone || "",
																			onChange: (e) => set({ contactPhone: e.target.value }),
																			placeholder: "Téléphone (ex: 06 12...)",
																			className: "text-xs bg-[#05060A] text-slate-100 placeholder:text-slate-500 h-9 rounded-lg border-slate-700/80"
																		}, void 0, false, {
																			fileName: _jsxFileName$6,
																			lineNumber: 1112,
																			columnNumber: 33
																		}, this)]
																	}, void 0, true, {
																		fileName: _jsxFileName$6,
																		lineNumber: 1108,
																		columnNumber: 31
																	}, this)
																]
															}, void 0, true, {
																fileName: _jsxFileName$6,
																lineNumber: 1081,
																columnNumber: 29
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$6,
															lineNumber: 1077,
															columnNumber: 27
														}, this),
														/* @__PURE__ */ (void 0)("div", {
															className: "rounded-2xl border border-slate-800 bg-[#10131F] p-5",
															children: /* @__PURE__ */ (void 0)(TagListEditor, {
																label: "Avantages & Environnement de Travail",
																items: form.benefits || [],
																onChange: (items) => set({ benefits: items }),
																placeholder: "Ajouter un avantage (ex: Télétravail 2j, Mutuelle...)",
																badgeClassName: "bg-emerald-500/20 text-emerald-200 border-emerald-500/40 font-bold",
																emptyText: "Aucun avantage spécifié.",
																isEditing: true
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 1125,
																columnNumber: 29
															}, this)
														}, void 0, false, {
															fileName: _jsxFileName$6,
															lineNumber: 1124,
															columnNumber: 27
														}, this),
														/* @__PURE__ */ (void 0)("div", {
															className: "rounded-2xl border border-slate-800 bg-[#10131F] p-5 space-y-2",
															children: [/* @__PURE__ */ (void 0)(Label, {
																className: "text-xs font-extrabold uppercase tracking-wider text-muted-foreground block",
																children: "Notes Personnelles & Commentaires"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 1137,
																columnNumber: 29
															}, this), /* @__PURE__ */ (void 0)(Textarea, {
																rows: 4,
																value: form.personalNotes || form.commentaire || "",
																onChange: (e) => set({
																	personalNotes: e.target.value,
																	commentaire: e.target.value
																}),
																placeholder: "Vos impressions, questions ou notes...",
																className: "text-xs bg-[#05060A] text-slate-100 resize-y rounded-xl border-slate-700/80"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 1140,
																columnNumber: 29
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$6,
															lineNumber: 1136,
															columnNumber: 27
														}, this)
													]
												}, void 0, true, {
													fileName: _jsxFileName$6,
													lineNumber: 1076,
													columnNumber: 25
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$6,
												lineNumber: 1034,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$6,
											lineNumber: 822,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 701,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)(TabsContent, {
										value: "profil",
										className: "mt-0 space-y-5 data-[state=inactive]:hidden",
										children: /* @__PURE__ */ (void 0)("div", {
											className: "grid grid-cols-1 lg:grid-cols-2 gap-5",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "space-y-5",
												children: [/* @__PURE__ */ (void 0)("div", {
													className: "rounded-2xl bg-white/5 backdrop-blur-xl p-4 lg:p-5 space-y-5 shadow-md",
													children: [/* @__PURE__ */ (void 0)(TagListEditor, {
														label: "Compétences indispensables / requises",
														items: form.requiredSkills || [],
														onChange: (items) => set({ requiredSkills: items }),
														placeholder: "ex: React, TypeScript, Tailwind...",
														badgeClassName: "bg-rose-500/20 text-rose-200 font-semibold text-xs",
														emptyText: "Aucune compétence obligatoire identifiée.",
														isEditing
													}, void 0, false, {
														fileName: _jsxFileName$6,
														lineNumber: 1170,
														columnNumber: 25
													}, this), /* @__PURE__ */ (void 0)(TagListEditor, {
														label: "Compétences appréciées (Atouts)",
														items: form.preferredSkills || [],
														onChange: (items) => set({ preferredSkills: items }),
														placeholder: "ex: Next.js, GraphQL, Docker...",
														badgeClassName: "bg-sky-500/20 text-sky-200 font-bold text-xs",
														emptyText: "Aucune compétence secondaire.",
														isEditing
													}, void 0, false, {
														fileName: _jsxFileName$6,
														lineNumber: 1180,
														columnNumber: 25
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$6,
													lineNumber: 1169,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)("div", {
													className: "rounded-2xl bg-white/5 backdrop-blur-xl p-4 lg:p-5 space-y-5 shadow-md",
													children: /* @__PURE__ */ (void 0)(TagListEditor, {
														label: "Qualités humaines & Soft skills",
														items: form.qualities || [],
														onChange: (items) => set({ qualities: items }),
														placeholder: "ex: Autonomie, Esprit d'équipe...",
														badgeClassName: "bg-amber-500/25 text-amber-100 font-bold text-xs",
														emptyText: "Aucune qualité listée.",
														isEditing
													}, void 0, false, {
														fileName: _jsxFileName$6,
														lineNumber: 1192,
														columnNumber: 25
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName$6,
													lineNumber: 1191,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$6,
												lineNumber: 1168,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "space-y-5",
												children: [/* @__PURE__ */ (void 0)("div", {
													className: "rounded-2xl bg-white/5 backdrop-blur-xl p-4 lg:p-5 space-y-5 shadow-md",
													children: [/* @__PURE__ */ (void 0)(TagListEditor, {
														label: "Outils, Logiciels & Plateformes",
														items: form.tools || [],
														onChange: (items) => set({ tools: items }),
														placeholder: "ex: Figma, Git, Jira, Notion...",
														badgeClassName: "bg-blue-500/25 text-blue-100 font-bold text-xs",
														emptyText: "Aucun outil spécifique.",
														isEditing
													}, void 0, false, {
														fileName: _jsxFileName$6,
														lineNumber: 1207,
														columnNumber: 25
													}, this), !isEditing ? /* @__PURE__ */ (void 0)("div", {
														className: "grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-white/5",
														children: [/* @__PURE__ */ (void 0)("div", {
															className: "p-3 rounded-xl bg-white/5 space-y-1",
															children: [/* @__PURE__ */ (void 0)("span", {
																className: "text-[10px] font-extrabold uppercase tracking-wider text-slate-300 block",
																children: "Formation & Diplômes"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 1220,
																columnNumber: 31
															}, this), /* @__PURE__ */ (void 0)("span", {
																className: "text-xs font-bold text-white block",
																children: form.educationRequirements?.join(" ; ") || form.educationLevel || "Non spécifié"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 1223,
																columnNumber: 31
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$6,
															lineNumber: 1219,
															columnNumber: 29
														}, this), /* @__PURE__ */ (void 0)("div", {
															className: "p-3 rounded-xl bg-white/5 space-y-1",
															children: [/* @__PURE__ */ (void 0)("span", {
																className: "text-[10px] font-extrabold uppercase tracking-wider text-slate-300 block",
																children: "Expérience requise"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 1230,
																columnNumber: 31
															}, this), /* @__PURE__ */ (void 0)("span", {
																className: "text-xs font-bold text-white block",
																children: form.experienceRequirements || "Non spécifiée"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 1233,
																columnNumber: 31
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$6,
															lineNumber: 1229,
															columnNumber: 29
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName$6,
														lineNumber: 1218,
														columnNumber: 27
													}, this) : /* @__PURE__ */ (void 0)("div", {
														className: "grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-white/5",
														children: [/* @__PURE__ */ (void 0)("div", {
															className: "grid gap-1",
															children: [/* @__PURE__ */ (void 0)(Label, {
																htmlFor: "eduReqInput",
																className: "text-xs font-bold uppercase tracking-wider text-slate-200",
																children: "Formation & Diplômes"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 1241,
																columnNumber: 31
															}, this), /* @__PURE__ */ (void 0)(Input, {
																id: "eduReqInput",
																value: form.educationRequirements?.join(" ; ") || form.educationLevel || "",
																onChange: (e) => set({
																	educationLevel: e.target.value,
																	educationRequirements: e.target.value.split(";").map((s) => s.trim()).filter(Boolean)
																}),
																placeholder: "ex: Bac+5, École d'ingénieurs",
																className: "bg-[#05060A] text-slate-100 text-sm h-9 rounded-xl border-slate-700/80"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 1247,
																columnNumber: 31
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$6,
															lineNumber: 1240,
															columnNumber: 29
														}, this), /* @__PURE__ */ (void 0)("div", {
															className: "grid gap-1",
															children: [/* @__PURE__ */ (void 0)(Label, {
																htmlFor: "expReqInput",
																className: "text-xs font-bold uppercase tracking-wider text-slate-200",
																children: "Expérience requise"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 1269,
																columnNumber: 31
															}, this), /* @__PURE__ */ (void 0)(Input, {
																id: "expReqInput",
																value: form.experienceRequirements || "",
																onChange: (e) => set({ experienceRequirements: e.target.value }),
																placeholder: "ex: 3 à 5 ans",
																className: "bg-[#05060A] text-slate-100 text-sm h-9 rounded-xl border-slate-700/80"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 1275,
																columnNumber: 31
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$6,
															lineNumber: 1268,
															columnNumber: 29
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName$6,
														lineNumber: 1239,
														columnNumber: 27
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$6,
													lineNumber: 1206,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)("div", {
													className: "rounded-2xl bg-white/5 backdrop-blur-xl p-4 lg:p-5 space-y-5 shadow-md",
													children: [
														/* @__PURE__ */ (void 0)(LanguagesEditor, {
															requiredLanguages: form.requiredLanguages || [],
															preferredLanguages: form.preferredLanguages || [],
															onChangeRequired: (req) => set({ requiredLanguages: req }),
															onChangePreferred: (pref) => set({ preferredLanguages: pref }),
															isEditing
														}, void 0, false, {
															fileName: _jsxFileName$6,
															lineNumber: 1292,
															columnNumber: 25
														}, this),
														/* @__PURE__ */ (void 0)(ProcessStepsEditor, {
															steps: form.recruitmentProcess || [],
															onChange: (steps) => set({ recruitmentProcess: steps }),
															isEditing
														}, void 0, false, {
															fileName: _jsxFileName$6,
															lineNumber: 1304,
															columnNumber: 25
														}, this),
														/* @__PURE__ */ (void 0)(TagListEditor, {
															label: "Documents demandés",
															items: form.applicationRequirements || [],
															onChange: (items) => set({ applicationRequirements: items }),
															placeholder: "ex: CV, Lettre de motivation...",
															badgeClassName: "bg-slate-800/80 text-slate-100 font-semibold",
															emptyText: "Non renseigné.",
															isEditing
														}, void 0, false, {
															fileName: _jsxFileName$6,
															lineNumber: 1312,
															columnNumber: 25
														}, this)
													]
												}, void 0, true, {
													fileName: _jsxFileName$6,
													lineNumber: 1291,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$6,
												lineNumber: 1205,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$6,
											lineNumber: 1166,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 1162,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)(TabsContent, {
										value: "entreprise",
										className: "mt-0 space-y-5 data-[state=inactive]:hidden",
										children: /* @__PURE__ */ (void 0)("div", {
											className: "grid grid-cols-1 lg:grid-cols-2 gap-5",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "rounded-2xl bg-white/5 backdrop-blur-xl p-4 lg:p-5 space-y-4 shadow-md",
												children: [
													/* @__PURE__ */ (void 0)("h3", {
														className: "text-xs font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-2",
														children: [/* @__PURE__ */ (void 0)(Building2, { className: "size-4 text-primary" }, void 0, false, {
															fileName: _jsxFileName$6,
															lineNumber: 1337,
															columnNumber: 25
														}, this), " Identité & Présentation"]
													}, void 0, true, {
														fileName: _jsxFileName$6,
														lineNumber: 1336,
														columnNumber: 23
													}, this),
													!isEditing ? /* @__PURE__ */ (void 0)("div", {
														className: "space-y-4",
														children: [/* @__PURE__ */ (void 0)("div", {
															className: "p-4 rounded-xl bg-white/5 space-y-1.5",
															children: [/* @__PURE__ */ (void 0)("span", {
																className: "text-[10px] font-extrabold uppercase tracking-wider text-slate-300 block",
																children: "Présentation de l'entreprise"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 1344,
																columnNumber: 29
															}, this), /* @__PURE__ */ (void 0)("p", {
																className: "text-xs text-slate-100 leading-relaxed font-medium whitespace-pre-wrap",
																children: form.companyDescription || "Aucune description renseignée."
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 1347,
																columnNumber: 29
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$6,
															lineNumber: 1343,
															columnNumber: 27
														}, this), /* @__PURE__ */ (void 0)("div", {
															className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
															children: [/* @__PURE__ */ (void 0)("div", {
																className: "p-3 rounded-xl bg-white/5 space-y-1",
																children: [/* @__PURE__ */ (void 0)("span", {
																	className: "text-[10px] font-extrabold uppercase tracking-wider text-slate-300 block",
																	children: "Groupe / Maison mère"
																}, void 0, false, {
																	fileName: _jsxFileName$6,
																	lineNumber: 1355,
																	columnNumber: 31
																}, this), /* @__PURE__ */ (void 0)("span", {
																	className: "text-xs font-bold text-white block",
																	children: form.parentCompany || form.groupName || "Non spécifié"
																}, void 0, false, {
																	fileName: _jsxFileName$6,
																	lineNumber: 1358,
																	columnNumber: 31
																}, this)]
															}, void 0, true, {
																fileName: _jsxFileName$6,
																lineNumber: 1354,
																columnNumber: 29
															}, this), /* @__PURE__ */ (void 0)("div", {
																className: "p-3 rounded-xl bg-white/5 space-y-1",
																children: [/* @__PURE__ */ (void 0)("span", {
																	className: "text-[10px] font-extrabold uppercase tracking-wider text-slate-300 block",
																	children: "Secteur d'activité"
																}, void 0, false, {
																	fileName: _jsxFileName$6,
																	lineNumber: 1366,
																	columnNumber: 31
																}, this), /* @__PURE__ */ (void 0)("span", {
																	className: "text-xs font-bold text-white block",
																	children: form.secteur || form.companySector || "Non spécifié"
																}, void 0, false, {
																	fileName: _jsxFileName$6,
																	lineNumber: 1369,
																	columnNumber: 31
																}, this)]
															}, void 0, true, {
																fileName: _jsxFileName$6,
																lineNumber: 1365,
																columnNumber: 29
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$6,
															lineNumber: 1353,
															columnNumber: 27
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName$6,
														lineNumber: 1342,
														columnNumber: 25
													}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("div", {
														className: "space-y-1.5",
														children: [/* @__PURE__ */ (void 0)(Label, {
															htmlFor: "companyDescInput",
															className: "text-xs font-bold uppercase tracking-wider text-slate-200",
															children: "Présentation de l'entreprise"
														}, void 0, false, {
															fileName: _jsxFileName$6,
															lineNumber: 1380,
															columnNumber: 29
														}, this), /* @__PURE__ */ (void 0)(Textarea, {
															id: "companyDescInput",
															rows: 4,
															value: form.companyDescription || "",
															onChange: (e) => set({ companyDescription: e.target.value }),
															placeholder: "Activités, mission, valeurs...",
															className: "bg-[#05060A] text-slate-100 text-xs leading-relaxed rounded-xl border-slate-700/80"
														}, void 0, false, {
															fileName: _jsxFileName$6,
															lineNumber: 1386,
															columnNumber: 29
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName$6,
														lineNumber: 1379,
														columnNumber: 27
													}, this), /* @__PURE__ */ (void 0)("div", {
														className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
														children: [/* @__PURE__ */ (void 0)("div", {
															className: "grid gap-1",
															children: [/* @__PURE__ */ (void 0)(Label, {
																htmlFor: "compParentInput",
																className: "text-xs font-bold uppercase tracking-wider text-slate-200",
																children: "Groupe / Maison mère"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 1400,
																columnNumber: 31
															}, this), /* @__PURE__ */ (void 0)(Input, {
																id: "compParentInput",
																value: form.parentCompany || form.groupName || "",
																onChange: (e) => set({
																	parentCompany: e.target.value,
																	groupName: e.target.value
																}),
																placeholder: "ex: Groupe LVMH",
																className: "bg-[#05060A] text-slate-100 text-sm h-9 rounded-xl border-slate-700/80"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 1406,
																columnNumber: 31
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$6,
															lineNumber: 1399,
															columnNumber: 29
														}, this), /* @__PURE__ */ (void 0)("div", {
															className: "grid gap-1",
															children: [/* @__PURE__ */ (void 0)(Label, {
																htmlFor: "compSectorInput",
																className: "text-xs font-bold uppercase tracking-wider text-slate-200",
																children: "Secteur d'activité"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 1423,
																columnNumber: 31
															}, this), /* @__PURE__ */ (void 0)(Input, {
																id: "compSectorInput",
																value: form.secteur || form.companySector || "",
																onChange: (e) => set({
																	secteur: e.target.value,
																	companySector: e.target.value
																}),
																placeholder: "ex: SaaS B2B / Fintech",
																className: "bg-[#05060A] text-slate-100 text-sm h-9 rounded-xl border-slate-700/80"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 1429,
																columnNumber: 31
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$6,
															lineNumber: 1422,
															columnNumber: 29
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName$6,
														lineNumber: 1398,
														columnNumber: 27
													}, this)] }, void 0, true, {
														fileName: _jsxFileName$6,
														lineNumber: 1378,
														columnNumber: 25
													}, this),
													isEditing && /* @__PURE__ */ (void 0)("div", {
														className: "grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2",
														children: [/* @__PURE__ */ (void 0)("div", {
															className: "grid gap-1",
															children: [/* @__PURE__ */ (void 0)(Label, {
																htmlFor: "compSizeInput",
																className: "text-xs font-bold uppercase tracking-wider text-slate-200",
																children: "Taille de l'effectif"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 1449,
																columnNumber: 29
															}, this), /* @__PURE__ */ (void 0)(Input, {
																id: "compSizeInput",
																value: form.companySize || "",
																onChange: (e) => set({ companySize: e.target.value }),
																placeholder: "ex: 50 à 200 salariés",
																className: "bg-[#05060A] text-slate-100 text-sm h-9 rounded-xl border-slate-700/80"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 1455,
																columnNumber: 29
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$6,
															lineNumber: 1448,
															columnNumber: 27
														}, this), /* @__PURE__ */ (void 0)("div", {
															className: "grid gap-1",
															children: [/* @__PURE__ */ (void 0)(Label, {
																htmlFor: "compWebInput",
																className: "text-xs font-bold uppercase tracking-wider text-slate-200",
																children: "Site web officiel"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 1467,
																columnNumber: 29
															}, this), /* @__PURE__ */ (void 0)(Input, {
																id: "compWebInput",
																value: form.companyWebsite || "",
																onChange: (e) => set({ companyWebsite: e.target.value }),
																placeholder: "https://...",
																className: "bg-[#05060A] text-slate-100 text-sm h-9 rounded-xl border-slate-700/80"
															}, void 0, false, {
																fileName: _jsxFileName$6,
																lineNumber: 1473,
																columnNumber: 29
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$6,
															lineNumber: 1466,
															columnNumber: 27
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName$6,
														lineNumber: 1447,
														columnNumber: 25
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName$6,
												lineNumber: 1335,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "rounded-2xl bg-white/5 backdrop-blur-xl p-4 lg:p-5 space-y-5 shadow-md",
												children: [
													/* @__PURE__ */ (void 0)(MetricsEditor, {
														metrics: form.companyMetrics || [],
														onChange: (metrics) => set({ companyMetrics: metrics }),
														isEditing
													}, void 0, false, {
														fileName: _jsxFileName$6,
														lineNumber: 1489,
														columnNumber: 23
													}, this),
													/* @__PURE__ */ (void 0)(TagListEditor, {
														label: "Contexte de croissance & Faits marquants",
														items: form.companyContext || [],
														onChange: (items) => set({ companyContext: items }),
														placeholder: "ex: Levée de fonds de 5M€...",
														badgeClassName: "bg-primary/20 text-foreground font-semibold",
														emptyText: "Aucun fait de contexte détecté.",
														isEditing
													}, void 0, false, {
														fileName: _jsxFileName$6,
														lineNumber: 1495,
														columnNumber: 23
													}, this),
													/* @__PURE__ */ (void 0)(TagListEditor, {
														label: "Partenaires & Clients cités",
														items: form.companyPartners || [],
														onChange: (items) => set({ companyPartners: items }),
														placeholder: "ex: Google, L'Oréal...",
														badgeClassName: "bg-slate-800 text-slate-100 font-medium",
														emptyText: "Aucun partenaire cité.",
														isEditing
													}, void 0, false, {
														fileName: _jsxFileName$6,
														lineNumber: 1505,
														columnNumber: 23
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName$6,
												lineNumber: 1488,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$6,
											lineNumber: 1333,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 1329,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)(TabsContent, {
										value: "workflow",
										className: "mt-0 space-y-5 data-[state=inactive]:hidden",
										children: [/* @__PURE__ */ (void 0)(WorkflowTab, {
											candidature: form,
											onChange: (patch) => set(patch)
										}, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 1523,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "p-4 lg:p-5 rounded-2xl bg-white/5 backdrop-blur-xl space-y-4 shadow-md",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (void 0)("h4", {
													className: "text-xs font-extrabold uppercase tracking-wider text-primary",
													children: "Préparation d'Entretiens & Arguments Stratégiques"
												}, void 0, false, {
													fileName: _jsxFileName$6,
													lineNumber: 1531,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "text-xs text-slate-400",
													children: "Notes et arguments pour vos échanges"
												}, void 0, false, {
													fileName: _jsxFileName$6,
													lineNumber: 1534,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$6,
												lineNumber: 1530,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "grid gap-4 sm:grid-cols-2",
												children: [/* @__PURE__ */ (void 0)("div", {
													className: "grid gap-2",
													children: [/* @__PURE__ */ (void 0)(Label, {
														htmlFor: "prepEnt",
														className: "text-xs font-bold uppercase tracking-wider text-slate-200",
														children: "Pourquoi cette entreprise ?"
													}, void 0, false, {
														fileName: _jsxFileName$6,
														lineNumber: 1541,
														columnNumber: 25
													}, this), /* @__PURE__ */ (void 0)(Textarea, {
														id: "prepEnt",
														rows: 3,
														value: form.preparation?.pourquoiEntreprise || "",
														onChange: (e) => setPrep({ pourquoiEntreprise: e.target.value }),
														placeholder: "Alignement avec vos ambitions, culture d'entreprise...",
														className: "text-xs bg-[#05060A] text-slate-100 resize-y rounded-xl border-slate-700/80"
													}, void 0, false, {
														fileName: _jsxFileName$6,
														lineNumber: 1547,
														columnNumber: 25
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$6,
													lineNumber: 1540,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)("div", {
													className: "grid gap-2",
													children: [/* @__PURE__ */ (void 0)(Label, {
														htmlFor: "prepPoste",
														className: "text-xs font-bold uppercase tracking-wider text-slate-200",
														children: "Pourquoi ce poste ?"
													}, void 0, false, {
														fileName: _jsxFileName$6,
														lineNumber: 1560,
														columnNumber: 25
													}, this), /* @__PURE__ */ (void 0)(Textarea, {
														id: "prepPoste",
														rows: 3,
														value: form.preparation?.pourquoiPoste || "",
														onChange: (e) => setPrep({ pourquoiPoste: e.target.value }),
														placeholder: "Missions clés, impact recherché, compétences...",
														className: "text-xs bg-[#05060A] text-slate-100 resize-y rounded-xl border-slate-700/80"
													}, void 0, false, {
														fileName: _jsxFileName$6,
														lineNumber: 1566,
														columnNumber: 25
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$6,
													lineNumber: 1559,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$6,
												lineNumber: 1539,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$6,
											lineNumber: 1529,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 1519,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 699,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 658,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 657,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center justify-between gap-3 px-6 lg:px-8 py-3.5 bg-black/30 backdrop-blur-xl shrink-0",
						children: !isEditing ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2",
							children: onDelete && form?.id && existingItems?.some((i) => i.id === form.id) && /* @__PURE__ */ (void 0)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => setDeleteDialogOpen(true),
								className: "text-xs text-rose-400/90 hover:bg-rose-500/10 hover:text-rose-300 gap-1.5 font-bold rounded-xl",
								children: [/* @__PURE__ */ (void 0)(Trash2, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 1599,
									columnNumber: 25
								}, this), "Supprimer l'opportunité"]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 1593,
								columnNumber: 23
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 1589,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (void 0)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => setIsEditing(true),
									className: "text-xs font-extrabold border-slate-800 text-slate-300 bg-slate-900/40 hover:bg-white/10 hover:border-white/20 rounded-xl px-4 h-9",
									children: [/* @__PURE__ */ (void 0)(PenLine, { className: "size-4 mr-1" }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 1611,
										columnNumber: 21
									}, this), "Modifier"]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 1605,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => setMode("paste"),
									className: "text-xs font-bold border-purple-500/30 text-purple-200 bg-purple-500/10 hover:bg-purple-500/20 rounded-xl px-4 h-9 transition-all",
									children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "size-3.5 mr-1 text-purple-300" }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 1620,
										columnNumber: 21
									}, this), "Ré-extraire avec l'IA"]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 1614,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)(Button, {
									size: "sm",
									onClick: () => onOpenChange(false),
									className: "text-xs font-bold border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800 rounded-xl px-5 h-9",
									children: "Fermer"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 1623,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 1604,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 1588,
							columnNumber: 15
						}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (void 0)(Button, {
								variant: "outline",
								size: "sm",
								onClick: handleCancelEdit,
								className: "text-xs font-bold border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white rounded-xl",
								children: "Annuler"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 1636,
								columnNumber: 19
							}, this), onDelete && form?.id && existingItems?.some((i) => i.id === form.id) && /* @__PURE__ */ (void 0)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => setDeleteDialogOpen(true),
								className: "text-xs text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 gap-1.5 font-bold rounded-xl",
								children: [/* @__PURE__ */ (void 0)(Trash2, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 1653,
									columnNumber: 25
								}, this), "Supprimer l'opportunité"]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 1647,
								columnNumber: 23
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 1635,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)(Button, {
							size: "sm",
							disabled: isSaving,
							onClick: async () => {
								const safeToSave = validerIntegriteCandidature(form, form);
								setIsSaving(true);
								try {
									await onSave(safeToSave);
									setIsEditing(false);
								} catch (saveErr) {
									console.error("[OPPORTUNITY SAVE FAILED]", saveErr);
								} finally {
									setIsSaving(false);
								}
							},
							className: "gap-2 px-6 h-10 text-xs font-semibold bg-primary hover:bg-primary/95 text-white shadow-md rounded-xl cursor-pointer",
							children: [isSaving ? /* @__PURE__ */ (void 0)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 1677,
								columnNumber: 21
							}, this) : /* @__PURE__ */ (void 0)(CircleCheck, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 1679,
								columnNumber: 21
							}, this), isSaving ? "Enregistrement…" : "Enregistrer"]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 1659,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 1634,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 1585,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 620,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialog, {
				open: deleteDialogOpen,
				onOpenChange: setDeleteDialogOpen,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogContent, {
					className: "bg-[#121625] border-slate-800 text-slate-100",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogTitle, {
						className: "text-white font-bold",
						children: "Supprimer cette opportunité ?"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 1692,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogDescription, {
						className: "text-slate-300 text-sm",
						children: [
							"Cette action est irréversible. L'opportunité «",
							" ",
							form?.poste || "Sans titre",
							" » chez «",
							" ",
							form?.entreprise || "Entreprise inconnue",
							" » ainsi que tout son historique seront définitivement supprimés."
						]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 1695,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 1691,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogCancel, {
						className: "text-xs font-bold border-slate-700 text-slate-200",
						children: "Annuler"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 1703,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogAction, {
						className: "bg-rose-600 text-white hover:bg-rose-700 text-xs font-bold",
						onClick: () => {
							if (form?.id && onDelete) {
								onDelete(form.id);
								onOpenChange(false);
							}
							setDeleteDialogOpen(false);
						},
						children: "Supprimer"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 1706,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 1702,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 1690,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 1689,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 289,
		columnNumber: 5
	}, this);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-tiOic8SL.js
var styles_default = "/assets/styles-BF9-aGg_.css";
var _jsxFileName$5 = "/app/applet/src/components/ui/sonner.tsx";
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
		fileName: _jsxFileName$5,
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
var _jsxFileName$4 = "/app/applet/src/routes/__root.tsx";
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
					fileName: _jsxFileName$4,
					lineNumber: 23,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 24,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 27,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/opportunites",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Aller aux opportunités"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 31,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 30,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 22,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$4,
		lineNumber: 21,
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
					fileName: _jsxFileName$4,
					lineNumber: 69,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-lg font-bold tracking-tight text-foreground",
					children: "Mise à jour de l'application"
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 72,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground leading-relaxed",
					children: "Une nouvelle version de l'application est disponible ou un module n'a pas pu être chargé."
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 75,
					columnNumber: 9
				}, this),
				error?.message && /* @__PURE__ */ (void 0)("div", {
					className: "p-3 text-left rounded-lg bg-red-500/10 border border-red-500/20 text-[11px] font-mono text-red-300 break-words max-h-32 overflow-y-auto",
					children: error.message
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 81,
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
						fileName: _jsxFileName$4,
						lineNumber: 87,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: "/opportunites",
						className: "inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-accent",
						children: "Retour aux opportunités"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 95,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 86,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 68,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$4,
		lineNumber: 67,
		columnNumber: 5
	}, this);
}
var Route$17 = createRootRouteWithContext()({
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
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			}
		],
		scripts: [{ children: `try{if(typeof window!=="undefined"){window.process=window.process||{env:{NODE_ENV:"development",TSS_ROUTER_BASEPATH:""}};window.global=window.global||window;}}catch(e){}` }]
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
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("script", { dangerouslySetInnerHTML: { __html: `try{if(typeof window!=="undefined"){window.process=window.process||{env:{NODE_ENV:"development",TSS_ROUTER_BASEPATH:""}};window.global=window.global||window;}}catch(e){}` } }, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 168,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeadContent, {}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 173,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 167,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 177,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 175,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 166,
		columnNumber: 5
	}, this);
}
function RootComponent() {
	const { queryClient } = Route$17.useRouteContext();
	(0, import_react.useEffect)(() => {
		const handleChunkError = (message) => {
			if (message.includes("Importing a module script failed") || message.includes("Failed to fetch dynamically imported module") || message.includes("error loading dynamically imported module") || message.includes("Unable to preload CSS")) {
				console.warn("Dynamic import issue detected:", message);
				const key = "chunk_reload_count";
				if (Number(sessionStorage.getItem(key) || "0") < 1) {
					sessionStorage.setItem(key, "1");
					console.warn("Stale dynamic chunk detected. Reloading page once for fresh assets...");
					window.location.reload();
				} else toast.error("Mise à jour disponible", {
					description: "Un composant n'a pas pu être chargé. Cliquez pour rafraîchir.",
					action: {
						label: "Rafraîchir",
						onClick: () => {
							sessionStorage.removeItem(key);
							window.location.reload();
						}
					},
					duration: 8e3
				});
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
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ContactImportProvider, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 263,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster$1, {}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 264,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 261,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$4,
		lineNumber: 260,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$11 = () => import("./routes-CJdCY1-q.mjs");
var Route$16 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./assistant-B1k-zB3L.mjs");
var searchSchema = object({ persona: _enum([
	"general_advisor",
	"interview_coach",
	"cv_expert",
	"job_strategist",
	"salary_negotiator",
	"custom"
]).optional() });
var Route$15 = createFileRoute("/assistant")({
	validateSearch: (search) => searchSchema.parse(search),
	head: () => ({ meta: [
		{ title: "Assistant Carrière IA — NACORA" },
		{
			name: "description",
			content: "Discutez avec votre coach carrière IA propulsé par Gemini : simulations d'entretien, optimisation de CV, négociation salariale et stratégie d'opportunités."
		},
		{
			property: "og:title",
			content: "Assistant Carrière IA — NACORA"
		},
		{
			property: "og:description",
			content: "Coach IA conversationnel multi-rôles propulsé par Google Gemini pour accélérer votre recherche d'emploi."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./auth-DTLT51dI.mjs");
var Route$14 = createFileRoute("/auth")({
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
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./calendrier-DfIPiTMM.mjs");
var Route$13 = createFileRoute("/calendrier")({
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
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./candidatures-Ctg6qmEJ.mjs");
var Route$12 = createFileRoute("/candidatures")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var generateNetworkingMessageServerFn = createServerFn({ method: "POST" }).validator((data) => GenerateNetworkingMessageInputZodSchema.parse(data)).handler(createSsrRpc("530dd75f0d23c73a9480aba6977b83b913b731251471b283785c5924115c2146"));
var _jsxFileName$3 = "/app/applet/src/components/ContactSheet.tsx";
function ContactSheet({ open, onOpenChange, contact, candidatures, entreprises = [], profil, onSave, onDelete, onOpenCandidature }) {
	const [draft, setDraft] = (0, import_react.useState)(contact);
	const [typeRelance, setTypeRelance] = (0, import_react.useState)("relance_candidature");
	const [consigne, setConsigne] = (0, import_react.useState)("");
	const [chargement, setChargement] = (0, import_react.useState)(false);
	const [erreur, setErreur] = (0, import_react.useState)(null);
	const [resultat, setResultat] = (0, import_react.useState)(null);
	const [confirmDeleteOpen, setConfirmDeleteOpen] = (0, import_react.useState)(false);
	const [ref, setRef] = (0, import_react.useState)(contact.id);
	if (ref !== contact.id) {
		setRef(contact.id);
		setDraft(contact);
		setResultat(null);
		setErreur(null);
	}
	const set = (patch) => setDraft((c) => ({
		...c,
		...patch
	}));
	const linkedCandidatures = (0, import_react.useMemo)(() => {
		const ids = new Set(draft.candidatureIds || []);
		if (draft.candidatureId) ids.add(draft.candidatureId);
		return candidatures.filter((c) => ids.has(c.id) || c.contactId && c.contactId === draft.id);
	}, [
		candidatures,
		draft.candidatureIds,
		draft.candidatureId,
		draft.id
	]);
	const generer = async () => {
		setChargement(true);
		setErreur(null);
		try {
			const targetOpp = linkedCandidatures[0];
			const res = await generateNetworkingMessageServerFn({ data: {
				contactName: getContactFullName(draft) || draft.nom || "Contact",
				contactRole: draft.poste || "",
				contactCompany: draft.entreprise || "",
				contactCategory: draft.category || "Autre",
				userSchool: profil?.ecole || profil?.formation || "",
				userTargetSector: profil?.posteCible || profil?.metierCible || "",
				targetOpportunityTitle: targetOpp?.poste || "",
				customInstruction: consigne ? `${LIBELLES_RELANCE[typeRelance] || ""}. ${consigne}` : LIBELLES_RELANCE[typeRelance] || ""
			} });
			if (res && res.message) setResultat({
				objet: res.subject || "Prise de contact réseau — NACORA",
				message: res.message,
				conseils: res.tips || ["Personnalisez avec un point précis abordé lors de votre dernier échange.", "Restez concis et professionnel."]
			});
			else setErreur("Erreur lors de la génération du message par l'IA.");
		} catch (err) {
			console.error("Erreur génération message réseau:", err);
			const msg = err instanceof Error ? err.message : "Erreur lors de la génération de la relance.";
			setErreur(msg);
		} finally {
			setChargement(false);
		}
	};
	const copier = async (texte) => {
		try {
			await navigator.clipboard.writeText(texte);
			toast.success("Copié dans le presse-papier.");
		} catch {
			toast.error("Copie impossible sur cet appareil.");
		}
	};
	const handleSelectCompany = (val) => {
		if (val === "custom") {
			set({ companyId: null });
			return;
		}
		const found = entreprises.find((e) => e.id === val);
		if (found) set({
			companyId: found.id,
			entreprise: found.nom
		});
	};
	const handleLinkOpportunity = (candidatureId) => {
		if (candidatureId === "aucune") {
			set({
				candidatureId: "",
				candidatureIds: []
			});
			return;
		}
		const currentIds = new Set(draft.candidatureIds || []);
		currentIds.add(candidatureId);
		const opp = candidatures.find((c) => c.id === candidatureId);
		set({
			candidatureId,
			candidatureIds: Array.from(currentIds),
			entreprise: draft.entreprise || opp?.companyName || opp?.company || opp?.entreprise || "",
			companyId: draft.companyId || opp?.companyId || null
		});
	};
	const handleUnlinkOpportunity = (candId) => {
		const next = (draft.candidatureIds || []).filter((id) => id !== candId);
		set({
			candidatureIds: next,
			candidatureId: draft.candidatureId === candId ? next[0] || "" : draft.candidatureId
		});
	};
	const handleRecalculateScore = () => {
		const res = computeContactRelevance(draft, candidatures, {
			school: profil?.ecole || profil?.formation,
			targetSectors: profil?.posteCible ? [profil.posteCible] : void 0
		});
		set({
			relevanceScore: res.score,
			connectionPoints: res.connectionPoints
		});
		toast.success(`Score de pertinence recalculé : ${res.score}%`);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CenterModal, {
		open,
		onOpenChange,
		title: getContactFullName(draft) || "Nouveau contact",
		description: [draft.poste, draft.entreprise].filter(Boolean).join(" — ") || "Ajoutez les informations du contact.",
		footer: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center justify-between gap-2 w-full",
			children: [onDelete ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "ghost",
				className: "text-xs text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 gap-1.5 font-semibold rounded-xl h-9.5 px-4",
				onClick: () => setConfirmDeleteOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4 mr-1.5" }, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 250,
					columnNumber: 17
				}, this), " Supprimer le contact"]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 245,
				columnNumber: 15
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 253,
				columnNumber: 15
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "outline",
					size: "sm",
					onClick: () => onOpenChange(false),
					className: "text-xs font-semibold border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-foreground rounded-xl px-4 h-9.5",
					children: "Annuler"
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 256,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					onClick: () => {
						onSave(draft);
						onOpenChange(false);
					},
					className: "text-xs font-semibold rounded-xl bg-primary hover:bg-primary/90 text-white shadow-md px-5 h-9.5 cursor-pointer",
					children: "Enregistrer"
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 264,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 255,
				columnNumber: 13
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 243,
			columnNumber: 11
		}, this),
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tabs, {
			defaultValue: "infos",
			className: "w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsList, {
					className: "w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
							value: "infos",
							className: "flex-1 text-xs",
							children: "Fiche"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 280,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
							value: "opportunites",
							className: "flex-1 text-xs",
							children: [
								"Opportunités (",
								linkedCandidatures.length,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 283,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
							value: "historique",
							className: "flex-1 text-xs",
							children: [
								"Historique (",
								draft.historique.length,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 286,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
							value: "relance",
							className: "flex-1 text-xs",
							children: "Relance IA"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 289,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 279,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
					value: "infos",
					className: "mt-4 grid gap-4 sm:grid-cols-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 shadow-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "sm:col-span-2 flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs text-muted-foreground",
								children: "Source(s) :"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 301,
								columnNumber: 15
							}, this), (draft.sources && draft.sources.length > 0 ? draft.sources : [draft.source || "manual"]).map((src) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "inline-flex items-center gap-1 rounded-full border border-border/80 bg-muted/60 px-2.5 py-0.5 text-[11px] font-medium text-foreground",
								children: [
									src === "phone" && /* @__PURE__ */ (void 0)(Smartphone, { className: "size-3 text-emerald-500" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 311,
										columnNumber: 21
									}, this),
									src === "linkedin" && /* @__PURE__ */ (void 0)(Linkedin, { className: "size-3 text-[#0A66C2]" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 314,
										columnNumber: 21
									}, this),
									src === "opportunity" && /* @__PURE__ */ (void 0)(Briefcase, { className: "size-3 text-primary" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 317,
										columnNumber: 21
									}, this),
									SOURCE_LABELS[src] || src
								]
							}, src, true, {
								fileName: _jsxFileName$3,
								lineNumber: 306,
								columnNumber: 17
							}, this))]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 300,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "sm:col-span-2 rounded-2xl border border-white/12 bg-white/[0.04] p-3.5 backdrop-blur-xl space-y-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "grid size-7 place-items-center rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-300",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5" }, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 329,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 328,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
											className: "text-xs font-semibold text-foreground flex items-center gap-2",
											children: ["Score de pertinence réseau", draft.relevanceScore !== void 0 && /* @__PURE__ */ (void 0)("span", {
												className: "text-xs font-bold text-indigo-300 bg-indigo-500/15 border border-indigo-500/30 px-2 py-0.5 rounded-full",
												children: [draft.relevanceScore, "%"]
											}, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 335,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 332,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-[11px] text-muted-foreground",
											children: "Analyse d'affinité basée sur vos cibles, votre école et le parcours du contact."
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 340,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 331,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 327,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										variant: "outline",
										size: "sm",
										onClick: handleRecalculateScore,
										className: "h-7 text-[11px] px-2.5 gap-1.5 border-white/15 bg-white/5 hover:bg-white/10 shrink-0 cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3 text-indigo-400" }, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 352,
											columnNumber: 19
										}, this), "Recalculer"]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 346,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 326,
									columnNumber: 15
								}, this),
								draft.connectionPoints && draft.connectionPoints.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-1.5 pt-1 border-t border-white/10",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[10px] font-medium text-muted-foreground uppercase tracking-wider",
										children: "Points de connexion détectés :"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 360,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex flex-wrap gap-1.5",
										children: draft.connectionPoints.map((pt, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "inline-flex items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/15 px-2.5 py-1 text-xs font-medium text-indigo-100 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3 text-indigo-400 shrink-0" }, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 369,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: pt }, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 370,
												columnNumber: 25
											}, this)]
										}, i, true, {
											fileName: _jsxFileName$3,
											lineNumber: 365,
											columnNumber: 23
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 363,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 359,
									columnNumber: 17
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[11px] text-muted-foreground italic pt-1 border-t border-white/10",
									children: "Cliquez sur \"Recalculer\" pour déterminer les points de connexion avec votre profil."
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 376,
									columnNumber: 17
								}, this),
								(draft.pastCompanies?.length || draft.education?.length || draft.companySector) && /* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs",
									children: [
										draft.pastCompanies && draft.pastCompanies.length > 0 && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-[10px] text-muted-foreground font-medium block",
											children: "Entreprises précédentes :"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 389,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-foreground font-medium",
											children: draft.pastCompanies.join(", ")
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 392,
											columnNumber: 23
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 388,
											columnNumber: 21
										}, this),
										draft.education && draft.education.length > 0 && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-[10px] text-muted-foreground font-medium block",
											children: "Établissements & Diplômes :"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 399,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-foreground font-medium",
											children: draft.education.join(", ")
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 402,
											columnNumber: 23
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 398,
											columnNumber: 21
										}, this),
										draft.companySector && /* @__PURE__ */ (void 0)("div", {
											className: "sm:col-span-2",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-[10px] text-muted-foreground font-medium block",
												children: "Secteur d'activité :"
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 409,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "text-foreground font-medium",
												children: draft.companySector
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 412,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 408,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 386,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 325,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Nom complet"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 422,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: draft.nom,
								onChange: (e) => set({
									nom: e.target.value,
									fullName: e.target.value
								}),
								placeholder: "Ex : Sophie Durand",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 423,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 421,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Type de contact"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 434,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
								value: draft.type,
								onValueChange: (v) => set({ type: v }),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
									className: "text-xs",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 440,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 439,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: TYPES_CONTACT.map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: t,
									className: "text-xs",
									children: t
								}, t, false, {
									fileName: _jsxFileName$3,
									lineNumber: 444,
									columnNumber: 21
								}, this)) }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 442,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 435,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 433,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-wrap items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs shrink-0",
									children: "Catégorie réseau (IA / Filtre)"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 454,
									columnNumber: 17
								}, this), draft.category && /* @__PURE__ */ (void 0)("span", {
									className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold border backdrop-blur-md shrink-0 ${getCategoryBadgeStyle(draft.category).fullClass}`,
									children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "size-2 text-current opacity-80" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 461,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("span", { children: draft.category }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 462,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 458,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 453,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
								value: draft.category || "Autre",
								onValueChange: (v) => set({ category: v }),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
									className: "text-xs",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "Sélectionner une catégorie..." }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 471,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 470,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: CATEGORIES_CONTACT.map((cat) => {
									const style = getCategoryBadgeStyle(cat);
									return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: cat,
										className: "text-xs",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `size-2 rounded-full shrink-0 ${style.dotClass}` }, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 479,
												columnNumber: 27
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: cat }, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 482,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 478,
											columnNumber: 25
										}, this)
									}, cat, false, {
										fileName: _jsxFileName$3,
										lineNumber: 477,
										columnNumber: 23
									}, this);
								}) }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 473,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 466,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 452,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Entreprise"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 492,
								columnNumber: 15
							}, this), entreprises.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
									value: draft.companyId || (draft.entreprise ? "custom" : "empty"),
									onValueChange: handleSelectCompany,
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
										className: "text-xs",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "Sélectionner une entreprise..." }, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 502,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 501,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
											value: "empty",
											className: "text-xs",
											children: "Aucune entreprise"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 505,
											columnNumber: 23
										}, this),
										entreprises.map((e) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
											value: e.id,
											className: "text-xs",
											children: e.nom
										}, e.id, false, {
											fileName: _jsxFileName$3,
											lineNumber: 509,
											columnNumber: 25
										}, this)),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
											value: "custom",
											className: "text-xs text-muted-foreground",
											children: "Saisir un autre nom..."
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 513,
											columnNumber: 23
										}, this)
									] }, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 504,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 495,
									columnNumber: 19
								}, this), (!draft.companyId || draft.companyId === "custom") && /* @__PURE__ */ (void 0)(Input, {
									value: draft.entreprise,
									onChange: (e) => set({ entreprise: e.target.value }),
									placeholder: "Nom personnalisé de l'entreprise",
									className: "text-xs"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 522,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 494,
								columnNumber: 17
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: draft.entreprise,
								onChange: (e) => set({ entreprise: e.target.value }),
								placeholder: "Ex : PwC France",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 531,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 491,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Poste / Rôle"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 541,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: draft.poste,
								onChange: (e) => set({
									poste: e.target.value,
									jobTitle: e.target.value
								}),
								placeholder: "Ex : Responsable Recrutement Tech",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 542,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 540,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Email"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 553,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								type: "email",
								value: draft.email,
								onChange: (e) => set({ email: e.target.value }),
								placeholder: "email@exemple.com",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 554,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 552,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Téléphone"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 564,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: draft.telephone,
								onChange: (e) => set({
									telephone: e.target.value,
									phone: e.target.value
								}),
								placeholder: "06 12 34 56 78",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 565,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 563,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Profil LinkedIn"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 576,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: draft.linkedin,
								onChange: (e) => set({
									linkedin: e.target.value,
									linkedinUrl: e.target.value
								}),
								placeholder: "https://www.linkedin.com/in/identifiant",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 577,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 575,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Dernière interaction"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 588,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								type: "date",
								value: draft.derniereInteraction,
								onChange: (e) => set({ derniereInteraction: e.target.value }),
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 589,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 587,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Date de la prochaine action"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 598,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								type: "date",
								value: draft.dateProchaineAction,
								onChange: (e) => set({ dateProchaineAction: e.target.value }),
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 599,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 597,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Prochaine action"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 608,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: draft.prochaineAction,
								onChange: (e) => set({ prochaineAction: e.target.value }),
								placeholder: "Relancer par email, envoyer un remerciement…",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 609,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 607,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Notes personnelles"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 618,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
								rows: 3,
								value: draft.notes,
								onChange: (e) => set({ notes: e.target.value }),
								placeholder: "Informations utiles, affinités, recommandations...",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 619,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 617,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 295,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
					value: "opportunites",
					className: "mt-4 space-y-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 shadow-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: [
								"Opportunités rattachées (",
								linkedCandidatures.length,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 636,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[11px] text-muted-foreground",
							children: "Ce contact peut être associé à une ou plusieurs offres d'emploi."
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 639,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 635,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "w-48 sm:w-60",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
								value: "none",
								onValueChange: handleLinkOpportunity,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
									className: "text-xs h-8",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "+ Lier une opportunité" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 648,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 647,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: "none",
									disabled: true,
									className: "text-xs",
									children: "Choisir une offre..."
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 651,
									columnNumber: 21
								}, this), candidatures.filter((c) => !linkedCandidatures.some((lc) => lc.id === c.id)).map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: c.id,
									className: "text-xs",
									children: [
										c.companyName || c.company || c.entreprise || "Sans nom",
										" ",
										"— ",
										c.poste || "poste"
									]
								}, c.id, true, {
									fileName: _jsxFileName$3,
									lineNumber: 659,
									columnNumber: 25
								}, this))] }, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 650,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 646,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 645,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 634,
						columnNumber: 13
					}, this), linkedCandidatures.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-xl border border-dashed border-border/80 p-6 text-center text-xs text-muted-foreground",
						children: "Aucune opportunité actuellement rattachée à ce contact."
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 673,
						columnNumber: 15
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: linkedCandidatures.map((opp) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/60 p-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "font-semibold text-foreground truncate",
									children: opp.poste || "Poste non précisé"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 684,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-muted-foreground text-[11px] truncate",
									children: [opp.companyName || opp.company || opp.entreprise || "Entreprise", opp.lieu ? ` · ${opp.lieu}` : ""]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 687,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 683,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 shrink-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary",
										children: opp.currentStage || opp.statut || "Offre"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 697,
										columnNumber: 23
									}, this),
									onOpenCandidature && /* @__PURE__ */ (void 0)(Button, {
										variant: "ghost",
										size: "sm",
										onClick: () => onOpenCandidature(opp.id),
										className: "h-7 px-2 text-[11px] gap-1",
										children: ["Voir ", /* @__PURE__ */ (void 0)(ExternalLink, { className: "size-3" }, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 707,
											columnNumber: 32
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 701,
										columnNumber: 25
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										variant: "ghost",
										size: "sm",
										onClick: () => handleUnlinkOpportunity(opp.id),
										className: "h-7 px-2 text-destructive hover:bg-destructive/10 text-[11px]",
										children: "Détacher"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 710,
										columnNumber: 23
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 696,
								columnNumber: 21
							}, this)]
						}, opp.id, true, {
							fileName: _jsxFileName$3,
							lineNumber: 679,
							columnNumber: 19
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 677,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 630,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
					value: "historique",
					className: "mt-4 space-y-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 shadow-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => set({ historique: [nouvelEchange(), ...draft.historique] }),
							className: "text-xs gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 738,
								columnNumber: 15
							}, this), " Ajouter un échange"]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 730,
							columnNumber: 13
						}, this),
						draft.historique.length === 0 && /* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground py-4 text-center",
							children: "Aucun échange enregistré pour l'instant."
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 742,
							columnNumber: 15
						}, this),
						draft.historique.map((e, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-2.5 rounded-xl border border-border/60 bg-card/40 p-3 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-2 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
											type: "date",
											value: e.date,
											onChange: (ev) => {
												const h = [...draft.historique];
												h[i] = {
													...e,
													date: ev.target.value
												};
												set({ historique: h });
											},
											className: "text-xs"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 753,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
											value: e.canal,
											onValueChange: (v) => {
												const h = [...draft.historique];
												h[i] = {
													...e,
													canal: v
												};
												set({ historique: h });
											},
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
												className: "text-xs",
												children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 772,
													columnNumber: 23
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 771,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: CANAUX.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: c,
												className: "text-xs",
												children: c
											}, c, false, {
												fileName: _jsxFileName$3,
												lineNumber: 776,
												columnNumber: 25
											}, this)) }, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 774,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 763,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
											value: e.sens,
											onValueChange: (v) => {
												const h = [...draft.historique];
												h[i] = {
													...e,
													sens: v
												};
												set({ historique: h });
											},
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
												className: "text-xs",
												children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 791,
													columnNumber: 23
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 790,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: "Envoyé",
												className: "text-xs",
												children: "Envoyé"
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 794,
												columnNumber: 23
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: "Reçu",
												className: "text-xs",
												children: "Reçu"
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 797,
												columnNumber: 23
											}, this)] }, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 793,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 782,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 752,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
									rows: 2,
									placeholder: "Résumé de l'échange",
									value: e.resume,
									onChange: (ev) => {
										const h = [...draft.historique];
										h[i] = {
											...e,
											resume: ev.target.value
										};
										set({ historique: h });
									},
									className: "text-xs"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 803,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "ghost",
									size: "sm",
									className: "justify-self-end text-destructive hover:bg-destructive/10 text-xs h-7",
									onClick: () => set({ historique: draft.historique.filter((x) => x.id !== e.id) }),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-3.5 mr-1" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 824,
										columnNumber: 19
									}, this), " Supprimer cet échange"]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 814,
									columnNumber: 17
								}, this)
							]
						}, e.id, true, {
							fileName: _jsxFileName$3,
							lineNumber: 748,
							columnNumber: 15
						}, this))
					]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 726,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
					value: "relance",
					className: "mt-4 space-y-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 shadow-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Type de message"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 836,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
								value: typeRelance,
								onValueChange: (v) => setTypeRelance(v),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
									className: "text-xs",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 842,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 841,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: TYPES_RELANCE.map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: t,
									className: "text-xs",
									children: LIBELLES_RELANCE[t]
								}, t, false, {
									fileName: _jsxFileName$3,
									lineNumber: 846,
									columnNumber: 21
								}, this)) }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 844,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 837,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 835,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Consigne complémentaire (facultatif)"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 854,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
								rows: 2,
								value: consigne,
								onChange: (e) => setConsigne(e.target.value),
								placeholder: "Ex : mentionner ma disponibilité à partir de janvier.",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 857,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 853,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[11px] text-muted-foreground",
							children: "L'IA s'appuie sur votre profil, l'entreprise et l'historique enregistré pour rédiger un message sur-mesure."
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 865,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							onClick: () => void generer(),
							disabled: chargement || !draft.nom,
							className: "text-xs gap-1.5",
							children: chargement ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-3.5 animate-spin" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 876,
								columnNumber: 19
							}, this), " Rédaction…"] }, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 875,
								columnNumber: 17
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 880,
								columnNumber: 19
							}, this), " Relancer avec l'IA"] }, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 879,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 869,
							columnNumber: 13
						}, this),
						erreur && /* @__PURE__ */ (void 0)("p", {
							className: "rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive",
							children: erreur
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 886,
							columnNumber: 15
						}, this),
						resultat && /* @__PURE__ */ (void 0)("div", {
							className: "space-y-3 rounded-xl border border-border/60 bg-card/40 p-3 text-xs",
							children: [
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("p", {
									className: "text-[10px] font-semibold uppercase tracking-wide text-muted-foreground",
									children: "Objet"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 894,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "font-semibold text-foreground text-xs",
									children: resultat.objet
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 897,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 893,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)(Textarea, {
									rows: 8,
									value: resultat.message,
									onChange: (e) => setResultat({
										...resultat,
										message: e.target.value
									}),
									className: "text-xs"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 901,
									columnNumber: 17
								}, this),
								resultat.conseils.length > 0 && /* @__PURE__ */ (void 0)("ul", {
									className: "list-disc space-y-0.5 pl-4 text-[11px] text-muted-foreground",
									children: resultat.conseils.map((c) => /* @__PURE__ */ (void 0)("li", { children: c }, c, false, {
										fileName: _jsxFileName$3,
										lineNumber: 912,
										columnNumber: 23
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 910,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (void 0)(Button, {
											variant: "outline",
											size: "sm",
											onClick: () => void copier(`${resultat.objet}\n\n${resultat.message}`),
											className: "text-xs h-8 gap-1.5",
											children: [/* @__PURE__ */ (void 0)(Copy, { className: "size-3.5" }, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 925,
												columnNumber: 21
											}, this), " Copier"]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 917,
											columnNumber: 19
										}, this),
										draft.email && /* @__PURE__ */ (void 0)(Button, {
											variant: "outline",
											size: "sm",
											asChild: true,
											className: "text-xs h-8",
											children: /* @__PURE__ */ (void 0)("a", {
												href: `mailto:${draft.email}?subject=${encodeURIComponent(resultat.objet)}&body=${encodeURIComponent(resultat.message)}`,
												children: "Ouvrir dans l'email"
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 934,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 928,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)(Button, {
											variant: "ghost",
											size: "sm",
											onClick: () => set({ historique: [{
												...nouvelEchange(),
												resume: `${LIBELLES_RELANCE[typeRelance]} — ${resultat.objet}`
											}, ...draft.historique] }),
											className: "text-xs h-8",
											children: [/* @__PURE__ */ (void 0)(Plus, { className: "size-3.5 mr-1" }, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 959,
												columnNumber: 21
											}, this), " Ajouter à l'historique"]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 943,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 916,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 892,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 831,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 278,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 234,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialog, {
		open: confirmDeleteOpen,
		onOpenChange: setConfirmDeleteOpen,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogContent, {
			className: "max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2.5 text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TriangleAlert, { className: "size-5" }, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 973,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogTitle, {
					className: "text-base font-semibold",
					children: "Supprimer ce contact ?"
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 974,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 972,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogDescription, {
				className: "text-xs space-y-2 mt-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
					"Êtes-vous sûr de vouloir supprimer",
					" ",
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: getContactFullName(draft) }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 981,
						columnNumber: 17
					}, this),
					" ?"
				] }, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 979,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-lg border border-border/80 bg-muted/50 p-2.5 flex items-start gap-2 text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Info, { className: "size-4 text-primary shrink-0 mt-0.5" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 984,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Protection des données :" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 986,
							columnNumber: 19
						}, this),
						" Cette suppression ne supprimera ",
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "ni l'entreprise" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 987,
							columnNumber: 30
						}, this),
						" (",
						draft.entreprise || "non spécifiée",
						")",
						" ",
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "ni les opportunités associées" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 989,
							columnNumber: 19
						}, this),
						" (",
						linkedCandidatures.length,
						" offre(s))."
					] }, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 985,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 983,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 978,
				columnNumber: 13
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 971,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogCancel, {
				className: "text-xs",
				children: "Annuler"
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 996,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogAction, {
				onClick: () => {
					if (onDelete) onDelete(draft);
					setConfirmDeleteOpen(false);
					onOpenChange(false);
				},
				className: "bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs font-semibold",
				children: "Confirmer la suppression"
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 997,
				columnNumber: 13
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 995,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 970,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 969,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 233,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/app/applet/src/components/ContactImportModal.tsx";
function ContactImportModal({ open, onOpenChange, existingContacts, userSchool, userTargetSector, onImportComplete }) {
	const [activeTab, setActiveTab] = (0, import_react.useState)("vcf");
	const [step, setStep] = (0, import_react.useState)("upload");
	const [fileName, setFileName] = (0, import_react.useState)("");
	const [parsedItems, setParsedItems] = (0, import_react.useState)([]);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [isProcessing, setIsProcessing] = (0, import_react.useState)(false);
	const [dragOver, setDragOver] = (0, import_react.useState)(false);
	const [isEnriching, setIsEnriching] = (0, import_react.useState)(false);
	const [aiProgress, setAiProgress] = (0, import_react.useState)({
		current: 0,
		total: 0,
		percentage: 0
	});
	const fileInputRef = (0, import_react.useRef)(null);
	const resetState = () => {
		setStep("upload");
		setFileName("");
		setParsedItems([]);
		setSearchQuery("");
		setIsProcessing(false);
		setIsEnriching(false);
		setAiProgress({
			current: 0,
			total: 0,
			percentage: 0
		});
		setDragOver(false);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};
	const handleClose = (isOpen) => {
		if (!isOpen) resetState();
		onOpenChange(isOpen);
	};
	const processFileContent = (content, name, isVcf) => {
		try {
			setIsProcessing(true);
			const rawList = isVcf ? parseVCardString(content) : parseLinkedInCsv(content);
			if (rawList.length === 0) {
				toast.error("Aucun contact valide n'a pu être extrait de ce fichier. Vérifiez le format.");
				setIsProcessing(false);
				return;
			}
			const items = rawList.map((c, index) => {
				const match = findMatchingContact(c, existingContacts);
				return {
					id: `item_${index}_${crypto.randomUUID()}`,
					contact: c,
					match,
					selected: true,
					resolution: match ? "merge" : "both"
				};
			});
			setFileName(name);
			setParsedItems(items);
			setStep("preview");
		} catch (err) {
			console.error(err);
			toast.error("Erreur lors de l'analyse du fichier.");
		} finally {
			setIsProcessing(false);
		}
	};
	/**
	* Analyse IA en arrière-plan par lots (batching pour fichiers volumineux)
	*/
	const handleRunAiEnrichment = async () => {
		const activeSelected = parsedItems.filter((item) => item.selected && item.resolution !== "skip");
		if (activeSelected.length === 0) {
			toast.warning("Aucun contact sélectionné pour la classification.");
			return;
		}
		setIsEnriching(true);
		const BATCH_SIZE = 12;
		const totalCount = activeSelected.length;
		let processedCount = 0;
		const existingCompaniesList = Array.from(new Set(existingContacts.map((c) => c.entreprise).filter(Boolean)));
		setAiProgress({
			current: 0,
			total: totalCount,
			percentage: 0
		});
		try {
			for (let i = 0; i < totalCount; i += BATCH_SIZE) {
				const batch = activeSelected.slice(i, i + BATCH_SIZE);
				const batchInputs = batch.map((item) => ({
					id: item.id,
					nom: getContactFullName(item.contact),
					entreprise: item.contact.entreprise || "",
					poste: item.contact.poste || "",
					notes: item.contact.notes || "",
					linkedin: item.contact.linkedin || ""
				}));
				const result = await classifyContactsBatchServerFn({ data: {
					contacts: batchInputs,
					existingCompanies: existingCompaniesList,
					userSchool,
					userTargetSector
				} });
				const classifications = result?.classifications || result?.classified || [];
				const classMap = new Map(classifications.map((c) => [c.id, c]));
				setParsedItems((prev) => prev.map((item) => {
					const classInfo = classMap.get(item.id);
					if (!classInfo) return item;
					const updatedRole = classInfo.normalizedFunction || item.contact.poste || "";
					const updatedCompany = classInfo.normalizedCompany || item.contact.entreprise || "";
					const updatedLevel = classInfo.normalizedLevel || item.contact.normalizedLevel || "";
					const candidateContact = {
						...item.contact,
						entreprise: updatedCompany,
						companyId: classInfo.companyMatchedWithExisting ? void 0 : item.contact.companyId,
						poste: classInfo.normalizedFunction ? `${classInfo.normalizedFunction}${classInfo.normalizedLevel ? ` (${classInfo.normalizedLevel})` : ""}` : item.contact.poste,
						category: classInfo.category,
						categoryConfidence: classInfo.categoryConfidence,
						normalizedFunction: updatedRole,
						normalizedLevel: updatedLevel,
						pastCompanies: classInfo.pastCompanies || item.contact.pastCompanies || [],
						education: classInfo.education || item.contact.education || [],
						companySector: classInfo.companySector || item.contact.companySector || "",
						aiEnriched: true
					};
					const scoring = computeContactRelevance(candidateContact, [], {
						school: userSchool,
						targetSectors: userTargetSector ? [userTargetSector] : void 0
					});
					candidateContact.relevanceScore = scoring.score;
					candidateContact.connectionPoints = scoring.connectionPoints;
					return {
						...item,
						contact: candidateContact
					};
				}));
				processedCount += batch.length;
				const currentPercentage = Math.round(processedCount / totalCount * 100);
				setAiProgress({
					current: Math.min(processedCount, totalCount),
					total: totalCount,
					percentage: currentPercentage
				});
			}
			toast.success(`Classification IA terminée avec succès pour ${totalCount} contact(s) !`);
		} catch (err) {
			console.error("Erreur enrichissement IA contacts:", err);
			toast.error("Échec de l'analyse IA. Les contacts sont conservés.");
		} finally {
			setIsEnriching(false);
		}
	};
	const handleFileChange = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const isVcf = activeTab === "vcf" || file.name.toLowerCase().endsWith(".vcf") || file.name.toLowerCase().endsWith(".vcard");
		const reader = new FileReader();
		reader.onload = (event) => {
			const text = event.target?.result;
			processFileContent(text, file.name, isVcf);
		};
		reader.onerror = () => {
			toast.error("Impossible de lire ce fichier.");
		};
		reader.readAsText(file);
	};
	const handleDrop = (e) => {
		e.preventDefault();
		setDragOver(false);
		const file = e.dataTransfer.files?.[0];
		if (!file) return;
		const isVcf = activeTab === "vcf" || file.name.toLowerCase().endsWith(".vcf") || file.name.toLowerCase().endsWith(".vcard");
		const reader = new FileReader();
		reader.onload = (event) => {
			const text = event.target?.result;
			processFileContent(text, file.name, isVcf);
		};
		reader.readAsText(file);
	};
	const filteredItems = (0, import_react.useMemo)(() => {
		if (!searchQuery.trim()) return parsedItems;
		const q = searchQuery.toLowerCase();
		return parsedItems.filter((it) => {
			const name = getContactFullName(it.contact).toLowerCase();
			const comp = getContactCompany(it.contact).toLowerCase();
			const email = (it.contact.email || "").toLowerCase();
			const phone = (it.contact.telephone || "").toLowerCase();
			return name.includes(q) || comp.includes(q) || email.includes(q) || phone.includes(q);
		});
	}, [parsedItems, searchQuery]);
	const stats = (0, import_react.useMemo)(() => {
		const total = parsedItems.length;
		const selected = parsedItems.filter((i) => i.selected && i.resolution !== "skip").length;
		const duplicates = parsedItems.filter((i) => Boolean(i.match)).length;
		return {
			total,
			selected,
			duplicates,
			news: total - duplicates
		};
	}, [parsedItems]);
	const toggleSelectAll = () => {
		const newSelected = !filteredItems.every((i) => i.selected);
		setParsedItems((prev) => prev.map((item) => filteredItems.some((fi) => fi.id === item.id) ? {
			...item,
			selected: newSelected
		} : item));
	};
	const setItemResolution = (id, resolution) => {
		setParsedItems((prev) => prev.map((it) => it.id === id ? {
			...it,
			resolution
		} : it));
	};
	const { startBackgroundImport } = useContactImport();
	const handleConfirmImport = async () => {
		const activeSelected = parsedItems.filter((item) => item.selected && item.resolution !== "skip");
		if (activeSelected.length === 0) {
			toast.warning("Aucun contact sélectionné pour l'import.");
			return;
		}
		setIsProcessing(true);
		try {
			const contactsToImport = activeSelected.map((item) => item.contact);
			const resolutions = {};
			for (const item of parsedItems) if (!item.selected || item.resolution === "skip") resolutions[item.contact.id || ""] = "skip";
			else resolutions[item.contact.id || ""] = item.resolution;
			startBackgroundImport(contactsToImport, resolutions, userSchool, userTargetSector);
			handleClose(false);
		} catch (err) {
			console.error(err);
			toast.error("Erreur lors de la validation de l'import.");
		} finally {
			setIsProcessing(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
		open,
		onOpenChange: handleClose,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
			className: "max-w-4xl max-h-[90vh] flex flex-col p-0 overflow-hidden bg-background border-border/80 shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, {
				className: "px-6 pt-6 pb-4 border-b border-border/60",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid size-10 place-items-center rounded-xl bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 419,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 418,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
							className: "text-xl font-bold tracking-tight text-foreground",
							children: "Importer des contacts"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 422,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
							className: "text-xs text-muted-foreground mt-0.5",
							children: "Importez vos contacts depuis votre téléphone (vCard) ou votre réseau LinkedIn (CSV)."
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 425,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 421,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 417,
						columnNumber: 13
					}, this), step === "preview" && /* @__PURE__ */ (void 0)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => setStep("upload"),
						className: "text-xs gap-1.5",
						children: [/* @__PURE__ */ (void 0)(RefreshCw, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 438,
							columnNumber: 17
						}, this), " Changer de fichier"]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 432,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 416,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 415,
				columnNumber: 9
			}, this), step === "upload" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-6 space-y-6 overflow-y-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-2 gap-3 p-1 rounded-xl bg-muted/60 border border-border/60",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setActiveTab("vcf"),
							className: `flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-lg font-medium text-xs transition-all ${activeTab === "vcf" ? "bg-background text-foreground shadow-sm font-semibold" : "text-muted-foreground hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Smartphone, { className: "size-4 text-emerald-500" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 457,
								columnNumber: 17
							}, this), "Carnet Téléphone (.vcf)"]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 448,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setActiveTab("linkedin"),
							className: `flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-lg font-medium text-xs transition-all ${activeTab === "linkedin" ? "bg-background text-foreground shadow-sm font-semibold" : "text-muted-foreground hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Linkedin, { className: "size-4 text-[#0A66C2]" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 469,
								columnNumber: 17
							}, this), "Export LinkedIn (.csv)"]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 460,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 447,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						onDragOver: (e) => {
							e.preventDefault();
							setDragOver(true);
						},
						onDragLeave: () => setDragOver(false),
						onDrop: handleDrop,
						onClick: () => fileInputRef.current?.click(),
						className: `relative flex flex-col items-center justify-center p-8 sm:p-12 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${dragOver ? "border-primary bg-primary/5 scale-[0.99]" : "border-border/80 hover:border-primary/60 bg-card/40 hover:bg-card/70"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								ref: fileInputRef,
								type: "file",
								accept: activeTab === "vcf" ? ".vcf,.vcard" : ".csv",
								onChange: handleFileChange,
								className: "hidden"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 489,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid size-14 place-items-center rounded-2xl bg-muted/80 text-foreground mb-4 shadow-sm",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Upload, { className: "size-7 text-primary" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 497,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 496,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "font-semibold text-sm text-foreground text-center",
								children: "Cliquez pour choisir un fichier ou glissez-le ici"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 499,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground mt-1 text-center",
								children: activeTab === "vcf" ? "Fichiers .vcf ou .vcard (export iPhone, Android, Google Contacts)" : "Fichier .csv (export officiel des relations LinkedIn)"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 502,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-[11px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3 text-amber-500" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 508,
									columnNumber: 17
								}, this), "Détection automatique des doublons & enrichissement sans perte"]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 507,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 475,
						columnNumber: 13
					}, this),
					activeTab === "vcf" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs text-emerald-900 dark:text-emerald-300",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-start gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Smartphone, { className: "size-4 shrink-0 mt-0.5 text-emerald-500" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 517,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "font-semibold",
									children: "Comment exporter vos contacts téléphone ?"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 519,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
									className: "list-disc list-inside space-y-0.5 text-emerald-800/90 dark:text-emerald-400/90 text-[11px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "iPhone (iOS) :" }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 524,
											columnNumber: 25
										}, this), " Ouvrez l'app Contacts > Listes > Maintenez \"Tous les contacts\" > Exporter (.vcf)."] }, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 523,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Android / Google :" }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 529,
											columnNumber: 25
										}, this), " Allez sur contacts.google.com > Exporter > Format vCard (pour contacts iOS / vCard)."] }, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 528,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Mac / Outlook :" }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 534,
											columnNumber: 25
										}, this), " Fichier > Exporter vCard."] }, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 533,
											columnNumber: 23
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 522,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 518,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 516,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 515,
						columnNumber: 15
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-xl border border-sky-500/20 bg-sky-500/5 p-4 text-xs text-sky-900 dark:text-sky-300",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-start gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Linkedin, { className: "size-4 shrink-0 mt-0.5 text-[#0A66C2]" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 544,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "font-semibold",
									children: "Comment exporter vos relations LinkedIn ?"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 546,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
									className: "list-decimal list-inside space-y-0.5 text-sky-800/90 dark:text-sky-400/90 text-[11px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
											"Sur LinkedIn, cliquez sur votre photo de profil (Vous) > ",
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Préférences et confidentialité" }, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 552,
												columnNumber: 30
											}, this),
											"."
										] }, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 550,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
											"Menu de gauche :",
											" ",
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Confidentialité des données" }, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 556,
												columnNumber: 25
											}, this),
											" >",
											" ",
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Obtenir une copie de vos données" }, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 557,
												columnNumber: 25
											}, this),
											"."
										] }, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 554,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
											"Cochez uniquement ",
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "\"Relations\"" }, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 560,
												columnNumber: 43
											}, this),
											" puis cliquez sur \"Demander les archives\"."
										] }, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 559,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
											"Téléchargez le fichier .zip reçu par email, décompressez-le et glissez le fichier",
											" ",
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("code", { children: "Connections.csv" }, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 566,
												columnNumber: 25
											}, this),
											" ci-dessus."
										] }, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 563,
											columnNumber: 23
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 549,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 545,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 543,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 542,
						columnNumber: 15
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 445,
				columnNumber: 11
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex-1 flex flex-col min-h-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "px-6 py-3.5 bg-muted/30 border-b border-border/60 flex flex-col gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-wrap items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-wrap items-center gap-2 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-semibold text-foreground",
											children: ["Fichier : ", fileName]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 581,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-muted-foreground",
											children: "·"
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 584,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "inline-flex items-center gap-1 text-primary font-medium",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "size-3.5" }, void 0, false, {
													fileName: _jsxFileName$2,
													lineNumber: 586,
													columnNumber: 21
												}, this),
												" ",
												stats.selected,
												" /",
												" ",
												stats.total,
												" sélectionnés"
											]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 585,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-muted-foreground",
											children: "·"
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 589,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-3.5" }, void 0, false, {
													fileName: _jsxFileName$2,
													lineNumber: 591,
													columnNumber: 21
												}, this),
												" ",
												stats.news,
												" nouveaux"
											]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 590,
											columnNumber: 19
										}, this),
										stats.duplicates > 0 && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-muted-foreground",
											children: "·"
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 595,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium",
											children: [
												/* @__PURE__ */ (void 0)(CircleAlert, { className: "size-3.5" }, void 0, false, {
													fileName: _jsxFileName$2,
													lineNumber: 597,
													columnNumber: 25
												}, this),
												" ",
												stats.duplicates,
												" ",
												"doublons détectés"
											]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 596,
											columnNumber: 23
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 594,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 580,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									size: "sm",
									onClick: handleRunAiEnrichment,
									disabled: isEnriching || stats.selected === 0,
									className: "h-8 text-xs font-semibold gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shrink-0",
									children: [isEnriching ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-3.5 animate-spin" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 611,
										columnNumber: 21
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 613,
										columnNumber: 21
									}, this), isEnriching ? "Analyse IA..." : "Classifier par IA (3 axes)"]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 604,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 579,
								columnNumber: 15
							}, this),
							isEnriching && /* @__PURE__ */ (void 0)("div", {
								className: "p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/30 space-y-2",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between text-xs font-medium text-indigo-300",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (void 0)(LoaderCircle, { className: "size-3.5 animate-spin text-indigo-400" }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 624,
											columnNumber: 23
										}, this), "Analyse et classification IA en cours..."]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 623,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "font-mono text-[11px]",
										children: [
											aiProgress.current,
											" / ",
											aiProgress.total,
											" contacts (",
											aiProgress.percentage,
											"%)"
										]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 627,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 622,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)(Progress, {
									value: aiProgress.percentage,
									className: "h-2 bg-indigo-950/80"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 632,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 621,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 w-full sm:w-auto",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "relative flex-1 sm:w-60",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "size-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 641,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										placeholder: "Filtrer les contacts...",
										value: searchQuery,
										onChange: (e) => setSearchQuery(e.target.value),
										className: "h-8 pl-8 text-xs bg-background"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 642,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 640,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "outline",
									size: "sm",
									onClick: toggleSelectAll,
									className: "h-8 text-xs shrink-0",
									children: "Tout cocher / décocher"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 649,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 639,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 578,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex-1 overflow-y-auto divide-y divide-border/60 px-6",
						children: filteredItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "py-12 text-center text-xs text-muted-foreground",
							children: "Aucun contact ne correspond à votre recherche."
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 663,
							columnNumber: 17
						}, this) : filteredItems.map((item) => {
							const fullName = getContactFullName(item.contact);
							const company = getContactCompany(item.contact);
							const job = getContactJobTitle(item.contact);
							const isDup = Boolean(item.match);
							const cat = item.contact.category;
							const conf = item.contact.categoryConfidence;
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: `py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${!item.selected || item.resolution === "skip" ? "opacity-50" : ""}`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-start sm:items-center gap-3 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										type: "checkbox",
										checked: item.selected && item.resolution !== "skip",
										onChange: (e) => {
											const checked = e.target.checked;
											setParsedItems((prev) => prev.map((i) => i.id === item.id ? {
												...i,
												selected: checked,
												resolution: checked ? isDup ? "merge" : "both" : "skip"
											} : i));
										},
										className: "size-4 rounded border-border text-primary focus:ring-primary mt-1 sm:mt-0"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 685,
										columnNumber: 25
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "min-w-0 space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
													className: "font-semibold text-xs text-foreground truncate",
													children: fullName
												}, void 0, false, {
													fileName: _jsxFileName$2,
													lineNumber: 711,
													columnNumber: 29
												}, this),
												company && /* @__PURE__ */ (void 0)("span", {
													className: "rounded-md bg-muted/80 px-2 py-0.5 text-[10px] font-medium text-foreground flex items-center gap-1",
													children: [/* @__PURE__ */ (void 0)(Building2, { className: "size-2.5 text-muted-foreground" }, void 0, false, {
														fileName: _jsxFileName$2,
														lineNumber: 716,
														columnNumber: 33
													}, this), company]
												}, void 0, true, {
													fileName: _jsxFileName$2,
													lineNumber: 715,
													columnNumber: 31
												}, this),
												job && /* @__PURE__ */ (void 0)("span", {
													className: "text-[11px] text-muted-foreground truncate",
													children: job
												}, void 0, false, {
													fileName: _jsxFileName$2,
													lineNumber: 721,
													columnNumber: 31
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 710,
											columnNumber: 27
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex flex-wrap items-center gap-2 text-[10px]",
											children: [
												cat && /* @__PURE__ */ (void 0)("span", {
													className: `px-2 py-0.5 rounded-full font-semibold border flex items-center gap-1 backdrop-blur-md ${getCategoryBadgeStyle(cat).fullClass}`,
													children: [
														/* @__PURE__ */ (void 0)(Tag, { className: "size-2.5 opacity-80" }, void 0, false, {
															fileName: _jsxFileName$2,
															lineNumber: 732,
															columnNumber: 33
														}, this),
														cat,
														conf !== void 0 && /* @__PURE__ */ (void 0)("span", {
															className: "opacity-75 font-mono text-[9px]",
															children: [
																"(",
																conf,
																"%)"
															]
														}, void 0, true, {
															fileName: _jsxFileName$2,
															lineNumber: 735,
															columnNumber: 35
														}, this)
													]
												}, void 0, true, {
													fileName: _jsxFileName$2,
													lineNumber: 729,
													columnNumber: 31
												}, this),
												item.contact.aiEnriched && /* @__PURE__ */ (void 0)("span", {
													className: "px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono text-[9px] flex items-center gap-1",
													children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "size-2.5 text-indigo-400" }, void 0, false, {
														fileName: _jsxFileName$2,
														lineNumber: 743,
														columnNumber: 33
													}, this), "IA"]
												}, void 0, true, {
													fileName: _jsxFileName$2,
													lineNumber: 742,
													columnNumber: 31
												}, this),
												item.contact.email && /* @__PURE__ */ (void 0)("span", {
													className: "text-muted-foreground",
													children: item.contact.email
												}, void 0, false, {
													fileName: _jsxFileName$2,
													lineNumber: 748,
													columnNumber: 31
												}, this),
												item.contact.linkedin && /* @__PURE__ */ (void 0)("span", {
													className: "text-primary truncate max-w-xs",
													children: item.contact.linkedin
												}, void 0, false, {
													fileName: _jsxFileName$2,
													lineNumber: 753,
													columnNumber: 31
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 727,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 709,
										columnNumber: 25
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 684,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2 self-end sm:self-center shrink-0",
									children: isDup && /* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-[10px] font-medium text-amber-600 dark:text-amber-400",
											children: [
												/* @__PURE__ */ (void 0)(CircleAlert, { className: "size-3" }, void 0, false, {
													fileName: _jsxFileName$2,
													lineNumber: 766,
													columnNumber: 31
												}, this),
												" Doublon (",
												item.match?.reason,
												")"
											]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 765,
											columnNumber: 29
										}, this), /* @__PURE__ */ (void 0)("select", {
											value: item.resolution,
											onChange: (e) => setItemResolution(item.id, e.target.value),
											className: "h-7 rounded-lg border border-border/80 bg-background px-2 text-[11px] text-foreground focus:ring-1 focus:ring-primary",
											children: [
												/* @__PURE__ */ (void 0)("option", {
													value: "merge",
													children: "Fusionner sans perte"
												}, void 0, false, {
													fileName: _jsxFileName$2,
													lineNumber: 780,
													columnNumber: 31
												}, this),
												/* @__PURE__ */ (void 0)("option", {
													value: "both",
													children: "Créer en double"
												}, void 0, false, {
													fileName: _jsxFileName$2,
													lineNumber: 783,
													columnNumber: 31
												}, this),
												/* @__PURE__ */ (void 0)("option", {
													value: "skip",
													children: "Ignorer"
												}, void 0, false, {
													fileName: _jsxFileName$2,
													lineNumber: 784,
													columnNumber: 31
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 770,
											columnNumber: 29
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 764,
										columnNumber: 27
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 762,
									columnNumber: 23
								}, this)]
							}, item.id, true, {
								fileName: _jsxFileName$2,
								lineNumber: 676,
								columnNumber: 21
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 661,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-4 bg-muted/40 border-t border-border/60 flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-xs text-muted-foreground flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Info, { className: "size-3.5 text-primary" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 798,
								columnNumber: 17
							}, this), "Vos données existantes (notes, historiques) ne seront jamais écrasées."]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 797,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => handleClose(false),
								className: "text-xs",
								children: "Annuler"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 803,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								size: "sm",
								onClick: handleConfirmImport,
								disabled: isProcessing || stats.selected === 0,
								className: "text-xs font-semibold gap-1.5 bg-primary text-primary-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 817,
										columnNumber: 19
									}, this),
									"Importer ",
									stats.selected,
									" contact(s)"
								]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 811,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 802,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 796,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 576,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 414,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 413,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/ContactCard.tsx";
function ContactCard({ contact, candidatures = [], hideCompanyTag = false, onOpenDetails, onOpenMessageIa, onOpenOpportunity }) {
	const fullName = getContactFullName(contact) || "Sans nom";
	const company = getContactCompany(contact);
	const jobTitle = getContactJobTitle(contact);
	const initials = getInitials(contact);
	const opps = candidatures.filter((c) => contact.candidatureIds?.includes(c.id) || c.contactId === contact.id);
	const nonLinkedinSources = (contact.sources && contact.sources.length > 0 ? contact.sources : [contact.source || "manual"]).filter((s) => s !== "linkedin");
	const score = contact.relevanceScore;
	let scoreClass = "bg-slate-500/15 text-slate-300 border-slate-500/30";
	if (score !== void 0) {
		if (score >= 80) scoreClass = "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
		else if (score >= 60) scoreClass = "bg-sky-500/15 text-sky-300 border-sky-500/30";
		else scoreClass = "bg-slate-500/15 text-slate-300 border-slate-500/30";
	}
	const displayCategory = contact.category;
	const catStyle = getCategoryBadgeStyle(displayCategory);
	const showTypeInstead = !displayCategory && contact.type && ![
		"Contact professionnel",
		"Contact",
		"Autre"
	].includes(contact.type);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		onClick: () => onOpenDetails?.(contact),
		className: "glass-card-interactive group relative flex flex-col justify-between p-3.5 rounded-2xl border border-white/12 bg-white/[0.04] backdrop-blur-2xl hover:bg-white/[0.08] hover:border-white/25 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.45),inset_0_1px_1px_0_rgba(255,255,255,0.25)] hover:shadow-[0_16px_44px_-4px_rgba(0,0,0,0.55),inset_0_1px_1px_0_rgba(255,255,255,0.35)] transition-all duration-200 h-full cursor-pointer overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-2.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-start justify-between gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2.5 min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/25 via-purple-500/20 to-indigo-600/25 border border-indigo-500/35 text-indigo-100 font-bold text-xs shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] group-hover:scale-105 transition-transform",
							children: initials
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 85,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "font-semibold text-xs text-foreground group-hover:text-indigo-300 transition-colors leading-tight line-clamp-2 break-words",
								children: fullName
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 89,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] text-muted-foreground/90 font-medium line-clamp-2 break-words mt-0.5",
								children: jobTitle || "Poste non précisé"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 92,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 88,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 84,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "shrink-0 flex flex-col items-end gap-1",
						children: [
							score !== void 0 && /* @__PURE__ */ (void 0)("span", {
								className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold border backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] ${scoreClass}`,
								title: "Score de pertinence calculé",
								children: /* @__PURE__ */ (void 0)("span", { children: [
									"⚡ ",
									score,
									"%"
								] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 105,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 101,
								columnNumber: 15
							}, this),
							displayCategory && /* @__PURE__ */ (void 0)("span", {
								className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold border backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] ${catStyle.fullClass}`,
								children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "size-2.5 shrink-0 opacity-80" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 112,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", { children: displayCategory }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 113,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 109,
								columnNumber: 15
							}, this),
							showTypeInstead && /* @__PURE__ */ (void 0)("span", {
								className: "rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]",
								children: contact.type
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 117,
								columnNumber: 15
							}, this),
							nonLinkedinSources.length > 0 && /* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-1.5 py-0.5 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]",
								children: nonLinkedinSources.map((src) => /* @__PURE__ */ (void 0)("span", {
									className: "inline-flex items-center text-[9px] text-muted-foreground/80",
									title: `Source: ${SOURCE_LABELS[src] || src}`,
									children: [src === "phone" && /* @__PURE__ */ (void 0)(Smartphone, { className: "size-2.5 text-emerald-400" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 133,
										columnNumber: 23
									}, this), src === "opportunity" && /* @__PURE__ */ (void 0)(Briefcase, { className: "size-2.5 text-primary" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 136,
										columnNumber: 23
									}, this)]
								}, src, true, {
									fileName: _jsxFileName$1,
									lineNumber: 125,
									columnNumber: 19
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 123,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 99,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 83,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-1.5 pt-0.5",
					children: [
						(company && !hideCompanyTag || contact.linkedin) && /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between gap-1.5 min-w-0",
							children: [company && !hideCompanyTag && /* @__PURE__ */ (void 0)("span", {
								title: company,
								className: "inline-flex items-center gap-1.5 rounded-lg bg-white/10 border border-white/12 px-2 py-0.5 text-[10px] font-medium text-foreground backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] min-w-0 truncate",
								children: [/* @__PURE__ */ (void 0)(Building2, { className: "size-3 shrink-0 text-indigo-400" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 154,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "truncate",
									children: company
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 155,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 150,
								columnNumber: 17
							}, this), contact.linkedin && /* @__PURE__ */ (void 0)("a", {
								href: contact.linkedin.startsWith("http") ? contact.linkedin : `https://${contact.linkedin}`,
								target: "_blank",
								rel: "noreferrer",
								onClick: (e) => e.stopPropagation(),
								className: "inline-flex items-center gap-1.5 h-6 rounded-lg bg-[#0A66C2]/15 hover:bg-[#0A66C2]/25 border border-[#0A66C2]/30 px-2 text-[10px] text-[#0A66C2] font-medium backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all shrink-0 ml-auto",
								children: [
									/* @__PURE__ */ (void 0)(Linkedin, { className: "size-2.5 shrink-0" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 171,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("span", { children: "LinkedIn" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 172,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)(ExternalLink, { className: "size-2 shrink-0" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 173,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 160,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 148,
							columnNumber: 13
						}, this),
						(contact.email || contact.telephone) && /* @__PURE__ */ (void 0)("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: [contact.email && /* @__PURE__ */ (void 0)("a", {
								href: `mailto:${contact.email}`,
								onClick: (e) => e.stopPropagation(),
								title: contact.email,
								className: "inline-flex items-center gap-1.5 h-6 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-2 text-[10px] text-muted-foreground hover:text-foreground backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] transition-all max-w-[140px] truncate",
								children: [/* @__PURE__ */ (void 0)(Mail, { className: "size-2.5 text-muted-foreground shrink-0" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 189,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "truncate",
									children: contact.email
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 190,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 183,
								columnNumber: 17
							}, this), contact.telephone && /* @__PURE__ */ (void 0)("a", {
								href: `tel:${contact.telephone}`,
								onClick: (e) => e.stopPropagation(),
								className: "inline-flex items-center gap-1.5 h-6 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-2 text-[10px] text-muted-foreground hover:text-foreground backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] transition-all",
								children: [/* @__PURE__ */ (void 0)(Phone, { className: "size-2.5 text-muted-foreground shrink-0" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 200,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", { children: contact.telephone }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 201,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 195,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 181,
							columnNumber: 13
						}, this),
						contact.connectionPoints && contact.connectionPoints.length > 0 && /* @__PURE__ */ (void 0)("div", {
							className: "flex flex-wrap gap-1 pt-1",
							children: contact.connectionPoints.slice(0, 2).map((pt, i) => /* @__PURE__ */ (void 0)("span", {
								className: "inline-flex items-center gap-1 rounded-md border border-indigo-500/25 bg-indigo-500/10 px-1.5 py-0.5 text-[9.5px] font-medium text-indigo-200 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]",
								children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "size-2 text-indigo-400 shrink-0" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 215,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "truncate max-w-[210px]",
									children: pt
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 216,
									columnNumber: 19
								}, this)]
							}, i, true, {
								fileName: _jsxFileName$1,
								lineNumber: 211,
								columnNumber: 17
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 209,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 146,
					columnNumber: 9
				}, this),
				opps.length > 0 && /* @__PURE__ */ (void 0)("div", {
					className: "rounded-xl border border-white/10 bg-black/20 backdrop-blur-md p-1.5 space-y-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]",
					children: opps.slice(0, 1).map((opp) => /* @__PURE__ */ (void 0)("button", {
						type: "button",
						onClick: (e) => {
							e.stopPropagation();
							onOpenOpportunity?.(opp.id);
						},
						className: "w-full flex items-center justify-between gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 px-2 py-1 text-left text-[10px] transition-all border border-white/5",
						children: [/* @__PURE__ */ (void 0)("span", {
							className: "truncate font-medium text-foreground",
							children: opp.poste || "Offre"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 236,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("span", {
							className: "shrink-0 text-[9px] font-semibold text-indigo-300 bg-indigo-500/15 border border-indigo-500/25 px-1.5 py-0.5 rounded-md backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]",
							children: opp.currentStage || opp.statut
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 239,
							columnNumber: 17
						}, this)]
					}, opp.id, true, {
						fileName: _jsxFileName$1,
						lineNumber: 227,
						columnNumber: 15
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 225,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 81,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-3 pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 text-[10px]",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "text-muted-foreground/80 font-medium shrink-0",
				children: [
					contact.historique?.length || 0,
					" échange",
					(contact.historique?.length || 0) > 1 ? "s" : ""
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 250,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-1.5 shrink-0 flex-wrap justify-end",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: (e) => {
						e.stopPropagation();
						if (onOpenMessageIa) onOpenMessageIa(contact);
						else onOpenDetails?.(contact);
					},
					className: "h-6.5 px-2.5 text-[10px] text-indigo-200 hover:text-white bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/35 font-semibold gap-1 rounded-lg backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_2px_8px_rgba(99,102,241,0.2)] transition-all cursor-pointer shrink-0 whitespace-nowrap",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-2.5 text-indigo-400" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 268,
						columnNumber: 13
					}, this), " Message IA"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 255,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: (e) => {
						e.stopPropagation();
						onOpenDetails?.(contact);
					},
					className: "h-6.5 px-2.5 text-[10px] text-muted-foreground hover:text-foreground font-medium rounded-lg hover:bg-white/10 backdrop-blur-md transition-all cursor-pointer shrink-0 whitespace-nowrap",
					children: "Détails"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 270,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 254,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 249,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 77,
		columnNumber: 5
	}, this);
}
/** Profil courant : cloud si connecté (avec repli local), sinon local. */
function useProfil(user) {
	const [profil, setProfil] = (0, import_react.useState)(null);
	const userId = user?.id;
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const local = loadProfil();
		setProfil(local);
		if (!userId) return;
		fetchProfil(userId).then((cloud) => {
			if (!cancelled && cloud) {
				setProfil(cloud);
				saveProfilLocal(cloud);
			}
		}).catch(() => void 0);
		return () => {
			cancelled = true;
		};
	}, [userId]);
	return profil;
}
/**
* Nettoie récursivement un objet pour Firestore en remplaçant undefined par null
* car Firestore refuse strictement les valeurs undefined.
*/
function sanitizeForFirestore$1(data) {
	if (data === void 0) return null;
	if (data === null || typeof data !== "object") return data;
	if (Array.isArray(data)) return data.map((item) => sanitizeForFirestore$1(item));
	const clean = {};
	for (const [key, value] of Object.entries(data)) if (value === void 0) clean[key] = null;
	else clean[key] = sanitizeForFirestore$1(value);
	return clean;
}
function toCandidature(r) {
	const match = r.match && typeof r.match === "object" && "global" in r.match ? r.match : null;
	const prepRaw = r.preparation ?? {};
	const preparation = {
		...emptyPreparation(),
		...prepRaw
	};
	const rawObj = r;
	const rawEvents = r.workflow_events || rawObj["workflowEvents"] || [];
	const rawStep = r.current_workflow_step || rawObj["currentWorkflowStep"];
	return normalizeCandidature({
		...rawObj,
		id: r.id,
		entreprise: r.entreprise ?? rawObj["company"] ?? "",
		poste: r.poste ?? rawObj["title"] ?? "",
		statut: r.statut,
		currentStage: rawObj["currentStage"] || rawObj["current_stage"] || r.statut || rawObj["status"] || "",
		currentWorkflowStep: rawStep,
		workflowEvents: Array.isArray(rawEvents) ? rawEvents : void 0,
		savedAt: r.saved_at ?? rawObj["savedAt"],
		preparedAt: r.prepared_at ?? rawObj["preparedAt"],
		interviewDate: r.interview_date ?? rawObj["interviewDate"],
		secondInterviewDate: r.second_interview_date ?? rawObj["secondInterviewDate"],
		offerReceivedAt: r.offer_received_at ?? rawObj["offerReceivedAt"],
		acceptedAt: r.accepted_at ?? rawObj["acceptedAt"],
		rejectedAt: r.rejected_at ?? rawObj["rejectedAt"],
		lieu: r.lieu ?? rawObj["location"] ?? "",
		lien: r.lien ?? rawObj["sourceUrl"] ?? "",
		contact: r.contact ?? "",
		dateEnvoi: r.date_envoi ?? rawObj["appliedAt"] ?? "",
		dateRelance: r.date_relance ?? rawObj["followUpDate"] ?? "",
		dateDernierContact: r.date_dernier_contact ?? rawObj["lastContactDate"] ?? "",
		dateLimite: r.date_limite ?? rawObj["applicationDeadline"] ?? "",
		commentaire: r.commentaire ?? rawObj["personalNotes"] ?? "",
		missions: rawObj["missions"] || prepRaw["missions"] || "",
		profilRecherche: rawObj["profilRecherche"] || prepRaw["profilRecherche"] || "",
		modalites: rawObj["modalites"] || prepRaw["modalites"] || "",
		detail: r.detail ?? "",
		priorite: r.priorite || "auto",
		source: r.source ?? rawObj["sourceName"] ?? "",
		secteur: r.secteur ?? rawObj["companySector"] ?? "",
		archive: r.archive ?? false,
		match,
		preparation,
		contractType: rawObj["contractType"] || rawObj["contract_type"] || null,
		duration: rawObj["duration"] || rawObj["duree"] || null,
		startDate: rawObj["startDate"] || rawObj["start_date"] || null,
		endDate: rawObj["endDate"] || rawObj["end_date"] || null,
		salary: rawObj["salary"] || rawObj["salaire"] || null,
		salaryMin: typeof rawObj["salaryMin"] === "number" ? rawObj["salaryMin"] : typeof rawObj["salary_min"] === "number" ? rawObj["salary_min"] : null,
		salaryMax: typeof rawObj["salaryMax"] === "number" ? rawObj["salaryMax"] : typeof rawObj["salary_max"] === "number" ? rawObj["salary_max"] : null,
		salaryCurrency: rawObj["salaryCurrency"] || rawObj["salary_currency"] || null,
		remotePolicy: rawObj["remotePolicy"] || rawObj["remote_policy"] || null,
		remoteDetails: rawObj["remoteDetails"] || rawObj["remote_details"] || null,
		jobFunction: rawObj["jobFunction"] || rawObj["job_function"] || null,
		educationLevel: rawObj["educationLevel"] || rawObj["education_level"] || null,
		missionsList: Array.isArray(rawObj["missionsList"]) ? rawObj["missionsList"] : Array.isArray(rawObj["missions_list"]) ? rawObj["missions_list"] : [],
		responsibilities: Array.isArray(rawObj["responsibilities"]) ? rawObj["responsibilities"] : [],
		requiredSkills: Array.isArray(rawObj["requiredSkills"]) ? rawObj["requiredSkills"] : Array.isArray(rawObj["required_skills"]) ? rawObj["required_skills"] : [],
		preferredSkills: Array.isArray(rawObj["preferredSkills"]) ? rawObj["preferredSkills"] : Array.isArray(rawObj["preferred_skills"]) ? rawObj["preferred_skills"] : [],
		tools: Array.isArray(rawObj["tools"]) ? rawObj["tools"] : [],
		requiredLanguages: Array.isArray(rawObj["requiredLanguages"]) ? rawObj["requiredLanguages"] : Array.isArray(rawObj["required_languages"]) ? rawObj["required_languages"] : [],
		preferredLanguages: Array.isArray(rawObj["preferredLanguages"]) ? rawObj["preferredLanguages"] : Array.isArray(rawObj["preferred_languages"]) ? rawObj["preferred_languages"] : [],
		qualities: Array.isArray(rawObj["qualities"]) ? rawObj["qualities"] : [],
		experienceRequirements: rawObj["experienceRequirements"] || rawObj["experience_requirements"] || null,
		educationRequirements: Array.isArray(rawObj["educationRequirements"]) ? rawObj["educationRequirements"] : Array.isArray(rawObj["education_requirements"]) ? rawObj["education_requirements"] : [],
		companyId: rawObj["companyId"] || rawObj["company_id"] || null,
		contactId: rawObj["contactId"] || rawObj["contact_id"] || null,
		contactIds: Array.isArray(rawObj["contactIds"]) ? rawObj["contactIds"] : Array.isArray(rawObj["contact_ids"]) ? rawObj["contact_ids"] : [],
		companyDescription: rawObj["companyDescription"] || rawObj["company_description"] || null,
		companySector: rawObj["companySector"] || rawObj["company_sector"] || null,
		companySize: rawObj["companySize"] || rawObj["company_size"] || null,
		companyLocation: rawObj["companyLocation"] || rawObj["company_location"] || null,
		companyWebsite: rawObj["companyWebsite"] || rawObj["company_website"] || null,
		companyContext: Array.isArray(rawObj["companyContext"]) ? rawObj["companyContext"] : Array.isArray(rawObj["company_context"]) ? rawObj["company_context"] : [],
		companyPartners: Array.isArray(rawObj["companyPartners"]) ? rawObj["companyPartners"] : Array.isArray(rawObj["company_partners"]) ? rawObj["company_partners"] : [],
		companyMetrics: Array.isArray(rawObj["companyMetrics"]) ? rawObj["companyMetrics"] : Array.isArray(rawObj["company_metrics"]) ? rawObj["company_metrics"] : [],
		recruitmentProcess: Array.isArray(rawObj["recruitmentProcess"]) ? rawObj["recruitmentProcess"] : Array.isArray(rawObj["recruitment_process"]) ? rawObj["recruitment_process"] : [],
		applicationMethod: rawObj["applicationMethod"] || rawObj["application_method"] || null,
		applicationRequirements: Array.isArray(rawObj["applicationRequirements"]) ? rawObj["applicationRequirements"] : Array.isArray(rawObj["application_requirements"]) ? rawObj["application_requirements"] : [],
		benefits: Array.isArray(rawObj["benefits"]) ? rawObj["benefits"] : Array.isArray(rawObj["avantages"]) ? rawObj["avantages"] : [],
		sourceType: rawObj["sourceType"] || rawObj["source_type"] || null,
		sourceName: rawObj["sourceName"] || rawObj["source_name"] || null,
		sourcePublishedAt: rawObj["sourcePublishedAt"] || rawObj["source_published_at"] || null,
		extractedAt: rawObj["extractedAt"] || rawObj["extracted_at"] || null
	});
}
function isUuid(id) {
	return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}
function toRow$1(c, userId) {
	return sanitizeForFirestore$1({
		id: isUuid(c.id) ? c.id : c.id || crypto.randomUUID(),
		user_id: userId,
		companyId: c.companyId || null,
		company_id: c.companyId || null,
		entreprise: c.entreprise,
		company: c.entreprise,
		poste: c.poste,
		title: c.poste,
		statut: c.statut,
		status: c.statut,
		current_stage: c.currentStage || c.statut || null,
		currentStage: c.currentStage || c.statut || null,
		lieu: c.lieu,
		location: c.lieu,
		lien: c.lien,
		sourceUrl: c.lien,
		contact: c.contact,
		date_envoi: c.dateEnvoi || null,
		appliedAt: c.dateEnvoi || null,
		date_relance: c.dateRelance || null,
		followUpDate: c.dateRelance || null,
		date_dernier_contact: c.dateDernierContact || null,
		lastContactDate: c.dateDernierContact || null,
		date_limite: c.dateLimite || null,
		applicationDeadline: c.dateLimite || null,
		commentaire: c.commentaire,
		personalNotes: c.commentaire,
		detail: c.detail,
		priorite: c.priorite,
		source: c.source,
		sourceName: c.source,
		secteur: c.secteur,
		companySector: c.secteur,
		archive: c.archive,
		match: c.match ?? {},
		preparation: {
			...c.preparation,
			missions: c.missions,
			profilRecherche: c.profilRecherche,
			modalites: c.modalites
		},
		current_workflow_step: c.currentWorkflowStep || null,
		currentWorkflowStep: c.currentWorkflowStep || null,
		workflow_events: c.workflowEvents || [],
		workflowEvents: c.workflowEvents || [],
		saved_at: c.savedAt || null,
		savedAt: c.savedAt || null,
		prepared_at: c.preparedAt || null,
		preparedAt: c.preparedAt || null,
		interview_date: c.interviewDate || null,
		interviewDate: c.interviewDate || null,
		second_interview_date: c.secondInterviewDate || null,
		secondInterviewDate: c.secondInterviewDate || null,
		offer_received_at: c.offerReceivedAt || null,
		offerReceivedAt: c.offerReceivedAt || null,
		accepted_at: c.acceptedAt || null,
		acceptedAt: c.acceptedAt || null,
		rejected_at: c.rejectedAt || null,
		rejectedAt: c.rejectedAt || null,
		country: c.country || null,
		contractType: c.contractType || null,
		contract_type: c.contractType || null,
		duration: c.duration || null,
		duree: c.duration || null,
		startDate: c.startDate || null,
		start_date: c.startDate || null,
		endDate: c.endDate || null,
		end_date: c.endDate || null,
		salary: c.salary || null,
		salaire: c.salary || null,
		salaryMin: typeof c.salaryMin === "number" ? c.salaryMin : null,
		salary_min: typeof c.salaryMin === "number" ? c.salaryMin : null,
		salaryMax: typeof c.salaryMax === "number" ? c.salaryMax : null,
		salary_max: typeof c.salaryMax === "number" ? c.salaryMax : null,
		salaryCurrency: c.salaryCurrency || null,
		salary_currency: c.salaryCurrency || null,
		remotePolicy: c.remotePolicy || null,
		remote_policy: c.remotePolicy || null,
		remoteDetails: c.remoteDetails || null,
		remote_details: c.remoteDetails || null,
		jobFunction: c.jobFunction || null,
		job_function: c.jobFunction || null,
		educationLevel: c.educationLevel || null,
		education_level: c.educationLevel || null,
		missionsList: c.missionsList || [],
		missions_list: c.missionsList || [],
		responsibilities: c.responsibilities || [],
		requiredSkills: c.requiredSkills || [],
		required_skills: c.requiredSkills || [],
		preferredSkills: c.preferredSkills || [],
		preferred_skills: c.preferredSkills || [],
		tools: c.tools || [],
		requiredLanguages: c.requiredLanguages || [],
		required_languages: c.requiredLanguages || [],
		preferredLanguages: c.preferredLanguages || [],
		preferred_languages: c.preferredLanguages || [],
		qualities: c.qualities || [],
		experienceRequirements: c.experienceRequirements || null,
		experience_requirements: c.experienceRequirements || null,
		educationRequirements: c.educationRequirements || [],
		education_requirements: c.educationRequirements || [],
		companyId: c.companyId || null,
		company_id: c.companyId || null,
		contactId: c.contactId || null,
		contact_id: c.contactId || null,
		contactIds: Array.isArray(c.contactIds) ? c.contactIds : [],
		contact_ids: Array.isArray(c.contactIds) ? c.contactIds : [],
		companyDescription: c.companyDescription || null,
		company_description: c.companyDescription || null,
		companySize: c.companySize || null,
		company_size: c.companySize || null,
		companyLocation: c.companyLocation || null,
		company_location: c.companyLocation || null,
		companyWebsite: c.companyWebsite || null,
		company_website: c.companyWebsite || null,
		companyContext: c.companyContext || [],
		company_context: c.companyContext || [],
		companyPartners: c.companyPartners || [],
		company_partners: c.companyPartners || [],
		companyMetrics: c.companyMetrics || [],
		company_metrics: c.companyMetrics || [],
		recruitmentProcess: c.recruitmentProcess || [],
		recruitment_process: c.recruitmentProcess || [],
		applicationMethod: c.applicationMethod || null,
		application_method: c.applicationMethod || null,
		applicationRequirements: c.applicationRequirements || [],
		application_requirements: c.applicationRequirements || [],
		benefits: c.benefits || [],
		avantages: c.benefits || [],
		sourceType: c.sourceType || null,
		source_type: c.sourceType || null,
		sourcePublishedAt: c.sourcePublishedAt || null,
		source_published_at: c.sourcePublishedAt || null,
		extractedAt: c.extractedAt || null,
		extracted_at: c.extractedAt || null
	});
}
async function fetchCandidatures(userId) {
	console.info("[OPPORTUNITY LOAD START]", {
		userId,
		timestamp: (/* @__PURE__ */ new Date()).toISOString()
	});
	if (isFirebaseConfigured() && userId) {
		if (auth.currentUser && auth.currentUser.uid === userId) try {
			const colRef = collection(db, "users", userId, "candidatures");
			const snap = await getDocs(query(colRef));
			const list = [];
			snap.forEach((docSnap) => {
				const cand = toCandidature({
					id: docSnap.id,
					...docSnap.data()
				});
				list.push(cand);
			});
			console.info(`[OPPORTUNITY LOAD SUCCESS] ${list.length} opportunités chargées depuis Firestore`, list.map((c) => ({
				id: c.id,
				poste: c.poste,
				entreprise: c.entreprise,
				contractType: c.contractType,
				duration: c.duration,
				metricsCount: c.companyMetrics?.length || 0
			})));
			return list;
		} catch (e) {
			console.error("[OPPORTUNITY LOAD ERROR] Firestore fetchCandidatures error:", e);
			handleFirestoreError(e, OperationType.GET, `users/${userId}/candidatures`);
		}
		else console.info("[OPPORTUNITY LOAD LOCAL] Session Firebase Auth non active ou UID différent, mode local/Supabase.");
	}
	if (isSupabaseConfigured()) {
		const { data, error } = await supabase.from("candidatures").select("*").order("created_at", { ascending: false });
		if (error) {
			console.error("[OPPORTUNITY LOAD ERROR] Supabase fetch error:", error);
			throw error;
		}
		const list = data.map(toCandidature);
		console.info(`[OPPORTUNITY LOAD SUCCESS] ${list.length} opportunités chargées depuis Supabase`);
		return list;
	}
	console.info("[OPPORTUNITY LOAD EMPTY] Mode local ou aucun cloud actif pour cette session.");
	return [];
}
async function upsertCandidature(c, userId) {
	console.info("[OPPORTUNITY SAVE START]", {
		id: c.id,
		poste: c.poste,
		entreprise: c.entreprise,
		userId
	});
	const row = toRow$1(c, userId);
	console.info("[OPPORTUNITY SAVE PAYLOAD]", {
		id: row.id,
		entreprise: row.entreprise,
		poste: row.poste,
		contractType: row.contractType,
		duration: row.duration,
		startDate: row.startDate,
		metricsCount: Array.isArray(row.companyMetrics) ? row.companyMetrics.length : 0,
		missionsCount: Array.isArray(row.missionsList) ? row.missionsList.length : 0,
		skillsCount: Array.isArray(row.requiredSkills) ? row.requiredSkills.length : 0
	});
	if (isFirebaseConfigured() && userId) {
		if (auth.currentUser && auth.currentUser.uid === userId) try {
			const docRef = doc(db, "users", userId, "candidatures", row.id);
			await setDoc(docRef, row, { merge: true });
			const saved = toCandidature(row);
			console.info("[OPPORTUNITY SAVE SUCCESS] Enregistrement Firestore confirmé avec succès:", {
				id: saved.id,
				entreprise: saved.entreprise,
				poste: saved.poste,
				metricsCount: saved.companyMetrics?.length || 0
			});
			return saved;
		} catch (e) {
			console.error("[OPPORTUNITY SAVE ERROR] Échec écriture Firestore setDoc:", e);
			handleFirestoreError(e, OperationType.WRITE, `users/${userId}/candidatures/${row.id}`);
		}
	}
	if (isSupabaseConfigured()) {
		const { data, error } = await supabase.from("candidatures").upsert(row).select().single();
		if (error) {
			console.error("[OPPORTUNITY SAVE ERROR] Supabase upsert error:", error);
			throw error;
		}
		const saved = toCandidature(data);
		console.info("[OPPORTUNITY SAVE SUCCESS] Enregistrement Supabase confirmé:", { id: saved.id });
		return saved;
	}
	console.info("[OPPORTUNITY SAVE LOCAL FALLBACK] Enregistrement sans cloud configuré.");
	return c;
}
async function deleteCandidature(id, userId) {
	if (isFirebaseConfigured() && userId) {
		if (auth.currentUser && auth.currentUser.uid === userId) try {
			const docRef = doc(db, "users", userId, "candidatures", id);
			await deleteDoc(docRef);
			return;
		} catch (e) {
			console.warn("Firestore deleteCandidature error:", e);
			handleFirestoreError(e, OperationType.DELETE, `users/${userId}/candidatures/${id}`);
		}
	}
	if (isSupabaseConfigured()) {
		const { error } = await supabase.from("candidatures").delete().eq("id", id);
		if (error) throw error;
	}
}
async function batchUpsertCandidatures(items, userId) {
	if (items.length === 0) return items;
	if (isFirebaseConfigured() && userId) {
		if (auth.currentUser && auth.currentUser.uid === userId) try {
			const CHUNK_SIZE = 250;
			for (let i = 0; i < items.length; i += CHUNK_SIZE) {
				const chunk = items.slice(i, i + CHUNK_SIZE);
				const batch = writeBatch(db);
				for (const item of chunk) {
					const row = toRow$1(item, userId);
					const docRef = doc(db, "users", userId, "candidatures", row.id);
					batch.set(docRef, row, { merge: true });
				}
				await batch.commit();
			}
			return items;
		} catch (e) {
			console.warn("Firestore batchUpsertCandidatures error:", e);
			handleFirestoreError(e, OperationType.WRITE, `users/${userId}/candidatures`);
		}
	}
	if (isSupabaseConfigured()) {
		const { data, error } = await supabase.from("candidatures").upsert(items.map((c) => toRow$1(c, userId))).select();
		if (error) throw error;
		return data.map(toCandidature);
	}
	return items;
}
var STORAGE_KEY_ENTREPRISES = "careerly-entreprises-v1";
var KNOWN_ALIASES = {
	pricewaterhousecoopers: "pwc",
	pwc: "pwc",
	"ernst & young": "ey",
	"ernst and young": "ey",
	ey: "ey",
	kpmg: "kpmg",
	deloitte: "deloitte",
	mckinsey: "mckinsey",
	"mckinsey & company": "mckinsey",
	bcg: "bcg",
	"boston consulting group": "bcg",
	bain: "bain",
	"bain & company": "bain",
	bnp: "bnp paribas",
	"bnp paribas": "bnp paribas",
	sg: "societe generale",
	"societe generale": "societe generale",
	dassault: "dassault systemes",
	"dassault systemes": "dassault systemes",
	lvmh: "lvmh",
	"moet hennessy": "lvmh",
	generali: "generali",
	"generali italia": "generali"
};
/**
* Normalise le nom d'une entreprise pour éviter les faux doublons
* (en retirant les formes juridiques, la ponctuation, les accents et variantes régionales).
*/
function normalizeCompanyName(name) {
	if (!name) return "";
	let s = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	s = s.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, " ");
	s = s.replace(/\b(sas|sarl|sa|inc|ltd|llc|gmbh|corp|corporation|group|groupe|holding|holdings|france|paris|europe|international|emea|global)\b/gi, " ");
	s = s.replace(/\s+/g, " ").trim();
	if (KNOWN_ALIASES[s]) return KNOWN_ALIASES[s];
	return s;
}
/**
* Extrait le nom de domaine racine (ex: 'pwc' depuis 'https://careers.pwc.fr/jobs')
* en ignorant les plateformes d'emploi généralistes.
*/
function extractRootDomain(urlOrDomain) {
	if (!urlOrDomain) return null;
	try {
		let host = urlOrDomain.trim().toLowerCase();
		if (host.includes("://")) host = new URL(host).hostname;
		host = host.replace(/^(www\.|careers\.|jobs\.|recrutement\.)/, "");
		if (host.includes("linkedin.com") || host.includes("indeed.com") || host.includes("welcomekit.co") || host.includes("welcometothejungle.com") || host.includes("hellowork.com") || host.includes("glassdoor.com") || host.includes("google.com")) return null;
		const parts = host.split(".");
		if (parts.length >= 2) return parts[0];
		return host;
	} catch {
		return null;
	}
}
/**
* Recherche une entreprise existante correspondante sans fusion hasardeuse.
*/
function findMatchingEntreprise(target, entreprises) {
	if (target.companyId) {
		const direct = entreprises.find((e) => e.id === target.companyId);
		if (direct) return direct;
	}
	const norm = normalizeCompanyName(target.nom || target.entreprise || "");
	if (!norm) return null;
	const exactNorm = entreprises.find((e) => e.normalizedName === norm);
	if (exactNorm) return exactNorm;
	const targetDomain = extractRootDomain(target.siteWeb) || extractRootDomain(target.lien);
	if (targetDomain) {
		const domainMatch = entreprises.find((e) => {
			const eDomain = extractRootDomain(e.siteWeb);
			return Boolean(eDomain && eDomain === targetDomain);
		});
		if (domainMatch) return domainMatch;
	}
	return entreprises.find((e) => {
		if (!e.normalizedName) return false;
		if (norm.length >= 4 && e.normalizedName.length >= 4) {
			if (e.normalizedName.startsWith(`${norm} `) || norm.startsWith(`${e.normalizedName} `)) return true;
		}
		return false;
	}) || null;
}
function emptyEntreprise(nom) {
	const displayNom = nom?.trim() || "";
	return {
		id: crypto.randomUUID(),
		nom: displayNom,
		normalizedName: normalizeCompanyName(displayNom),
		description: null,
		secteur: null,
		taille: null,
		siege: null,
		siteWeb: null,
		chiffresCles: [],
		contexte: [],
		partenaires: [],
		logoUrl: null,
		notes: "",
		contactRH: "",
		telephone: "",
		email: "",
		linkedin: "",
		tags: [],
		isFavorite: false,
		manualFields: [],
		isManual: false,
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
/**
* Crée ou identifie une fiche entreprise depuis les données d'un contact réseau
* (import LinkedIn ou ajout manuel).
*/
function syncEntrepriseFromContact(contact, entreprises) {
	const compName = contact.entreprise?.trim();
	if (!compName) return null;
	const existing = findMatchingEntreprise({
		companyId: contact.candidatureId,
		nom: compName
	}, entreprises);
	if (!existing) return {
		entreprise: {
			...emptyEntreprise(compName),
			linkedin: contact.linkedin && !contact.linkedin.includes("/in/") ? contact.linkedin : ""
		},
		isNew: true,
		hasChanged: true
	};
	return {
		entreprise: existing,
		isNew: false,
		hasChanged: false
	};
}
/**
* Crée ou enrichit intelligemment une fiche entreprise depuis les données
* d'une opportunité, tout en respectant strictly la règle :
* DONNÉES UTILISATEUR > DONNÉES IA.
*/
function syncEntrepriseFromOpportunity(opp, entreprises) {
	const oppNom = opp.companyName || opp.company || opp.entreprise || "Entreprise";
	const existing = findMatchingEntreprise({
		companyId: opp.companyId,
		nom: oppNom,
		siteWeb: opp.companyWebsite,
		lien: opp.lien
	}, entreprises);
	if (!existing) return {
		entreprise: {
			id: opp.companyId || crypto.randomUUID(),
			nom: oppNom,
			normalizedName: normalizeCompanyName(oppNom),
			description: opp.companyDescription || null,
			secteur: opp.companySector || opp.secteur || null,
			taille: opp.companySize || null,
			siege: opp.companyLocation || opp.lieu || null,
			siteWeb: opp.companyWebsite || null,
			chiffresCles: Array.isArray(opp.companyMetrics) ? opp.companyMetrics.map((m) => `${m.label} : ${m.value}${m.context ? ` (${m.context})` : ""}`) : [],
			contexte: Array.isArray(opp.companyContext) ? opp.companyContext : [],
			partenaires: Array.isArray(opp.companyPartners) ? opp.companyPartners : [],
			logoUrl: null,
			notes: "",
			contactRH: "",
			telephone: "",
			email: "",
			linkedin: "",
			tags: [],
			isFavorite: false,
			manualFields: [],
			isManual: false,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		},
		isNew: true,
		hasChanged: true
	};
	const manualFields = existing.manualFields || [];
	let hasChanged = false;
	const updated = { ...existing };
	if (!manualFields.includes("description") && (!updated.description || opp.companyDescription && opp.companyDescription.length > updated.description.length)) {
		if (opp.companyDescription && opp.companyDescription !== updated.description) {
			updated.description = opp.companyDescription;
			hasChanged = true;
		}
	}
	if (!manualFields.includes("secteur") && !updated.secteur && (opp.companySector || opp.secteur)) {
		const newSec = opp.companySector || opp.secteur || null;
		if (newSec && newSec !== updated.secteur) {
			updated.secteur = newSec;
			hasChanged = true;
		}
	}
	if (!manualFields.includes("taille") && !updated.taille && opp.companySize) {
		if (opp.companySize !== updated.taille) {
			updated.taille = opp.companySize;
			hasChanged = true;
		}
	}
	if (!manualFields.includes("siege") && !updated.siege && (opp.companyLocation || opp.lieu)) {
		const newSiege = opp.companyLocation || opp.lieu || null;
		if (newSiege && newSiege !== updated.siege) {
			updated.siege = newSiege;
			hasChanged = true;
		}
	}
	if (!manualFields.includes("siteWeb") && !updated.siteWeb && (opp.companyWebsite || opp.lien)) {
		const newWeb = opp.companyWebsite || opp.lien || null;
		if (newWeb && newWeb !== updated.siteWeb) {
			updated.siteWeb = newWeb;
			hasChanged = true;
		}
	}
	if (Array.isArray(opp.companyMetrics) && opp.companyMetrics.length > 0) {
		const currentMetrics = new Set(updated.chiffresCles || []);
		const initialSize = currentMetrics.size;
		for (const m of opp.companyMetrics) currentMetrics.add(`${m.label} : ${m.value}${m.context ? ` (${m.context})` : ""}`);
		if (currentMetrics.size > initialSize) {
			updated.chiffresCles = Array.from(currentMetrics);
			hasChanged = true;
		}
	}
	if (Array.isArray(opp.companyContext) && opp.companyContext.length > 0) {
		const currentContext = new Set(updated.contexte || []);
		const initialSize = currentContext.size;
		for (const ctx of opp.companyContext) currentContext.add(ctx);
		if (currentContext.size > initialSize) {
			updated.contexte = Array.from(currentContext);
			hasChanged = true;
		}
	}
	if (Array.isArray(opp.companyPartners) && opp.companyPartners.length > 0) {
		const currentPartners = new Set(updated.partenaires || []);
		const initialSize = currentPartners.size;
		for (const p of opp.companyPartners) currentPartners.add(p);
		if (currentPartners.size > initialSize) {
			updated.partenaires = Array.from(currentPartners);
			hasChanged = true;
		}
	}
	if (hasChanged) {
		updated.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
		return {
			entreprise: updated,
			isNew: false,
			hasChanged: true
		};
	}
	return {
		entreprise: existing,
		isNew: false,
		hasChanged: false
	};
}
/**
* Vérifie si une entreprise possède des données persistantes utiles à préserver
* même si toutes ses opportunités ont été supprimées :
* - contacts associés ;
* - notes personnelles ;
* - modifications manuelles par l'utilisateur ;
* - coordonnées saisies (téléphone, email, linkedin, contact RH) ;
* - favoris ou tags.
*/
function hasPersistentData(entreprise, contacts = []) {
	if (contacts.some((ct) => {
		if (ct.candidatureId && ct.candidatureId === entreprise.id) return true;
		if (ct.entreprise) {
			if (findMatchingEntreprise({ nom: ct.entreprise }, [entreprise])) return true;
		}
		return false;
	})) return true;
	if (typeof entreprise.notes === "string" && entreprise.notes.trim().length > 0) return true;
	if (entreprise.isManual) return true;
	if (Array.isArray(entreprise.manualFields) && entreprise.manualFields.length > 0) return true;
	if (entreprise.contactRH && entreprise.contactRH.trim().length > 0 || entreprise.email && entreprise.email.trim().length > 0 || entreprise.telephone && entreprise.telephone.trim().length > 0 || entreprise.linkedin && entreprise.linkedin.trim().length > 0) return true;
	if (entreprise.isFavorite) return true;
	if (Array.isArray(entreprise.tags) && entreprise.tags.length > 0) return true;
	return false;
}
/**
* Détermine si une entreprise doit être conservée lors de la suppression d'une opportunité.
* Règle de protection : en cas de doute, on CONSERVE toujours l'entreprise.
*/
function shouldKeepEntrepriseAfterOpportunityDeleted(entreprise, remainingOpportunities, contacts = []) {
	if (remainingOpportunities.some((opp) => {
		if (opp.companyId && opp.companyId === entreprise.id) return true;
		return normalizeCompanyName(opp.companyName || opp.company || opp.entreprise) === entreprise.normalizedName;
	})) return true;
	return hasPersistentData(entreprise, contacts);
}
function loadEntreprisesLocal() {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY_ENTREPRISES);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (Array.isArray(parsed)) return parsed;
		return [];
	} catch (err) {
		console.warn("Échec lecture localStorage entreprises:", err);
		return [];
	}
}
function saveEntreprisesLocal(items) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(STORAGE_KEY_ENTREPRISES, JSON.stringify(items));
	} catch (err) {
		console.warn("Échec écriture localStorage entreprises:", err);
	}
}
/** Nettoie récursivement pour Firestore en remplaçant undefined par null */
function sanitizeForFirestore(data) {
	if (data === void 0) return null;
	if (data === null || typeof data !== "object") return data;
	if (Array.isArray(data)) return data.map((item) => sanitizeForFirestore(item));
	const clean = {};
	for (const [key, value] of Object.entries(data)) clean[key] = value === void 0 ? null : sanitizeForFirestore(value);
	return clean;
}
function toEntreprise(r) {
	const base = emptyEntreprise(r.nom || "");
	return {
		...base,
		id: r.id,
		nom: r.nom || base.nom,
		normalizedName: r.normalizedName || base.normalizedName,
		description: r.description ?? null,
		secteur: r.secteur ?? null,
		taille: r.taille ?? null,
		siege: r.siege ?? null,
		siteWeb: r.siteWeb ?? null,
		chiffresCles: Array.isArray(r.chiffresCles) ? r.chiffresCles : [],
		contexte: Array.isArray(r.contexte) ? r.contexte : [],
		partenaires: Array.isArray(r.partenaires) ? r.partenaires : [],
		logoUrl: r.logoUrl ?? null,
		notes: r.notes ?? "",
		contactRH: r.contactRH ?? "",
		telephone: r.telephone ?? "",
		email: r.email ?? "",
		linkedin: r.linkedin ?? "",
		tags: Array.isArray(r.tags) ? r.tags : [],
		isFavorite: Boolean(r.isFavorite),
		manualFields: Array.isArray(r.manualFields) ? r.manualFields : [],
		isManual: Boolean(r.isManual),
		createdAt: r.createdAt || base.createdAt,
		updatedAt: r.updatedAt || base.updatedAt
	};
}
function toRow(e, userId) {
	return sanitizeForFirestore({
		id: e.id || crypto.randomUUID(),
		user_id: userId,
		nom: e.nom,
		normalizedName: e.normalizedName,
		description: e.description ?? null,
		secteur: e.secteur ?? null,
		taille: e.taille ?? null,
		siege: e.siege ?? null,
		siteWeb: e.siteWeb ?? null,
		chiffresCles: e.chiffresCles || [],
		contexte: e.contexte || [],
		partenaires: e.partenaires || [],
		logoUrl: e.logoUrl ?? null,
		notes: e.notes || "",
		contactRH: e.contactRH || "",
		telephone: e.telephone || "",
		email: e.email || "",
		linkedin: e.linkedin || "",
		tags: e.tags || [],
		isFavorite: Boolean(e.isFavorite),
		manualFields: e.manualFields || [],
		isManual: Boolean(e.isManual),
		createdAt: e.createdAt,
		updatedAt: e.updatedAt
	});
}
async function fetchEntreprises(userId) {
	const effectiveUserId = userId || auth.currentUser?.uid;
	if (isFirebaseConfigured() && effectiveUserId && auth.currentUser && auth.currentUser.uid === effectiveUserId) try {
		const colRef = collection(db, "users", effectiveUserId, "entreprises");
		const snap = await getDocs(query(colRef));
		const list = [];
		snap.forEach((docSnap) => {
			list.push(toEntreprise({
				id: docSnap.id,
				...docSnap.data()
			}));
		});
		return list;
	} catch (e) {
		console.warn("Firestore fetchEntreprises error:", e);
		handleFirestoreError(e, OperationType.GET, `users/${effectiveUserId}/entreprises`);
	}
	return [];
}
async function upsertEntreprise(e, userId) {
	if (isFirebaseConfigured() && userId && auth.currentUser && auth.currentUser.uid === userId) try {
		const row = toRow(e, userId);
		const docRef = doc(db, "users", userId, "entreprises", e.id);
		await setDoc(docRef, row, { merge: true });
		return toEntreprise(row);
	} catch (err) {
		console.warn("Firestore upsertEntreprise error:", err);
		handleFirestoreError(err, OperationType.WRITE, `users/${userId}/entreprises/${e.id}`);
	}
	return e;
}
async function batchUpsertEntreprises(items, userId) {
	if (!items.length) return [];
	if (isFirebaseConfigured() && userId && auth.currentUser && auth.currentUser.uid === userId) try {
		const CHUNK_SIZE = 250;
		for (let i = 0; i < items.length; i += CHUNK_SIZE) {
			const chunk = items.slice(i, i + CHUNK_SIZE);
			const batch = writeBatch(db);
			for (const e of chunk) {
				const row = toRow(e, userId);
				const docRef = doc(db, "users", userId, "entreprises", e.id);
				batch.set(docRef, row, { merge: true });
			}
			await batch.commit();
		}
		return items;
	} catch (err) {
		console.warn("Firestore batchUpsertEntreprises error:", err);
		handleFirestoreError(err, OperationType.WRITE, `users/${userId}/entreprises`);
	}
	return items;
}
async function deleteEntrepriseCloud(id, userId) {
	if (isFirebaseConfigured() && userId && auth.currentUser && auth.currentUser.uid === userId) try {
		const docRef = doc(db, "users", userId, "entreprises", id);
		await deleteDoc(docRef);
	} catch (err) {
		console.warn("Firestore deleteEntreprise error:", err);
		handleFirestoreError(err, OperationType.DELETE, `users/${userId}/entreprises/${id}`);
	}
}
/**
* Synchronise l'entreprise correspondante lors de l'enregistrement d'une opportunité.
* Crée ou enrichit la fiche entreprise et retourne son companyId.
*/
async function syncOpportunityCompanyOnSave(c, userId) {
	if (!(c.companyName || c.company || c.entreprise || "").trim()) return null;
	try {
		let list = loadEntreprisesLocal();
		if (userId) {
			const cloudList = await fetchEntreprises(userId).catch(() => []);
			if (cloudList.length > 0) list = cloudList;
		}
		const { entreprise, isNew } = syncEntrepriseFromOpportunity(c, list);
		saveEntreprisesLocal(isNew ? [entreprise, ...list] : list.map((item) => item.id === entreprise.id ? entreprise : item));
		if (userId) upsertEntreprise(entreprise, userId);
		return entreprise.id;
	} catch (err) {
		console.warn("Échec synchronisation entreprise lors de la sauvegarde :", err);
		return null;
	}
}
/**
* Gère le cycle de vie de l'entreprise lors de la suppression d'une opportunité :
* - SI l'entreprise a encore d'autres opportunités -> conservée.
* - SI 0 opportunité restante mais données persistantes (contacts, notes, coordonnées, favoris) -> conservée.
* - SI 0 opportunité et totalement vide (aucune donnée manuelle) -> supprimée automatiquement.
*/
async function syncOpportunityCompanyOnDelete(deletedItem, remainingItems, userId) {
	const oppNom = deletedItem.companyName || deletedItem.company || deletedItem.entreprise || "";
	if (!oppNom.trim() && !deletedItem.companyId) return;
	try {
		let list = loadEntreprisesLocal();
		if (userId) {
			const cloudList = await fetchEntreprises(userId).catch(() => []);
			if (cloudList.length > 0) list = cloudList;
		}
		const matched = findMatchingEntreprise({
			companyId: deletedItem.companyId,
			nom: oppNom
		}, list);
		if (!matched) return;
		let contacts = loadContactsLocal();
		if (userId) {
			const cloudContacts = await fetchContacts(userId).catch(() => []);
			if (cloudContacts.length > 0) contacts = cloudContacts;
		}
		if (!shouldKeepEntrepriseAfterOpportunityDeleted(matched, remainingItems, contacts)) {
			saveEntreprisesLocal(list.filter((e) => e.id !== matched.id));
			if (userId) deleteEntrepriseCloud(matched.id, userId);
		}
	} catch (err) {
		console.warn("Échec vérification nettoyage entreprise:", err);
	}
}
/**
* Synchronisation intelligente de contact lors de l'enregistrement d'une opportunité :
* - Si contactId est déjà lié, associe l'entreprise et ajoute l'opportunité dans ses candidatureIds.
* - Si du texte est présent dans c.contact, le parse et le déduplique/enrichit ou crée un contact propre.
*/
async function syncOpportunityContactOnSave(opp, companyId, userId) {
	try {
		let contacts = loadContactsLocal();
		if (userId) {
			const cloud = await fetchContacts(userId).catch(() => []);
			if (cloud.length > 0) contacts = cloud;
		}
		const companyName = opp.companyName || opp.company || opp.entreprise || "";
		if (opp.contactId) {
			const existing = contacts.find((c) => c.id === opp.contactId);
			if (existing) {
				const oppIds = new Set(existing.candidatureIds || []);
				if (existing.candidatureId) oppIds.add(existing.candidatureId);
				oppIds.add(opp.id);
				const updatedContact = {
					...existing,
					candidatureIds: Array.from(oppIds),
					candidatureId: existing.candidatureId || opp.id,
					companyId: companyId || existing.companyId,
					entreprise: existing.entreprise || companyName,
					updatedAt: (/* @__PURE__ */ new Date()).toISOString()
				};
				const nextContacts = contacts.map((c) => c.id === updatedContact.id ? updatedContact : c);
				saveContactsLocal(nextContacts);
				if (userId) upsertContact(updatedContact, userId);
				return updatedContact.id;
			}
		}
		const rawContactText = (opp.contact || "").trim();
		if (!rawContactText) return null;
		const parsed = parseRawContactInput(rawContactText);
		const parsedName = (parsed.nom || "").trim();
		if (!parsedName && !parsed.email && !parsed.telephone) return null;
		const candidateTarget = {
			...parsed,
			entreprise: companyName,
			companyId: companyId || void 0
		};
		const match = findMatchingContact(candidateTarget, contacts);
		if (match) {
			const enriched = enrichContactWithoutLoss(match.contact, {
				...candidateTarget,
				candidatureId: opp.id,
				candidatureIds: [opp.id]
			}, "opportunity");
			const nextContacts = contacts.map((c) => c.id === enriched.id ? enriched : c);
			saveContactsLocal(nextContacts);
			if (userId) upsertContact(enriched, userId);
			return enriched.id;
		} else {
			const newContact = {
				...emptyContact(parsedName || "Contact opportunité"),
				...candidateTarget,
				id: crypto.randomUUID(),
				entreprise: companyName,
				companyId: companyId || null,
				candidatureId: opp.id,
				candidatureIds: [opp.id],
				source: "opportunity",
				sources: ["opportunity"],
				tags: ["Opportunité"],
				isManual: false,
				createdAt: (/* @__PURE__ */ new Date()).toISOString(),
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			};
			const nextContacts = [newContact, ...contacts];
			saveContactsLocal(nextContacts);
			if (userId) upsertContact(newContact, userId);
			return newContact.id;
		}
	} catch (err) {
		console.warn("Échec synchronisation contact opportunité:", err);
		return null;
	}
}
/**
* Détachement sécurisé d'un contact lors de la suppression d'une opportunité :
* Ne supprime JAMAIS le contact ! Retire uniquement l'ID de l'opportunité de son historique.
*/
async function syncOpportunityContactOnDelete(deletedOpp, userId) {
	try {
		let contacts = loadContactsLocal();
		if (userId) {
			const cloud = await fetchContacts(userId).catch(() => []);
			if (cloud.length > 0) contacts = cloud;
		}
		let modified = false;
		const updatedContacts = contacts.map((ct) => {
			if (!(ct.candidatureId === deletedOpp.id || ct.candidatureIds && ct.candidatureIds.includes(deletedOpp.id))) return ct;
			modified = true;
			const nextCandIds = (ct.candidatureIds || []).filter((id) => id !== deletedOpp.id);
			return {
				...ct,
				candidatureIds: nextCandIds,
				candidatureId: ct.candidatureId === deletedOpp.id ? nextCandIds[0] || "" : ct.candidatureId,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			};
		});
		if (modified) {
			saveContactsLocal(updatedContacts);
			if (userId) batchUpsertContacts(updatedContacts, userId);
		}
	} catch (err) {
		console.warn("Échec détachement contact lors de la suppression d'opportunité:", err);
	}
}
/**
* Migration prudente des opportunités existantes sans companyId :
* Rattache l'identifiant d'entreprise et enrichit la base sans rien écraser.
*/
async function migrateExistingOpportunities(loadedItems, userId) {
	try {
		let list = loadEntreprisesLocal();
		if (userId) {
			const cloud = await fetchEntreprises(userId).catch(() => []);
			if (cloud.length > 0) list = cloud;
		}
		const newEntreprises = [];
		let modifiedOpportunities = false;
		const updatedItems = loadedItems.map((c) => {
			if (!(c.companyName || c.company || c.entreprise || "").trim()) return c;
			const { entreprise, isNew } = syncEntrepriseFromOpportunity(c, list);
			if (isNew) {
				list = [entreprise, ...list];
				newEntreprises.push(entreprise);
			}
			if (c.companyId !== entreprise.id) {
				modifiedOpportunities = true;
				return {
					...c,
					companyId: entreprise.id
				};
			}
			return c;
		});
		if (newEntreprises.length > 0) {
			saveEntreprisesLocal(list);
			if (userId) batchUpsertEntreprises(newEntreprises, userId);
		}
		return modifiedOpportunities ? updatedItems : loadedItems;
	} catch (err) {
		console.warn("Échec migration des opportunités existantes:", err);
		return loadedItems;
	}
}
var hasHydrated = false;
var memoryCache = null;
var listeners = /* @__PURE__ */ new Set();
function notifyCandidatureChange(newItems, userId) {
	memoryCache = newItems;
	saveCandidatures(newItems, userId);
	listeners.forEach((listener) => listener(newItems));
}
/**
* Fusionne intelligemment les candidatures cloud et locales sans perte de données.
* Si un élément local a été créé/modifié et n'est pas encore dans le cloud (ou plus récent),
* il est conservé et ré-envoyé vers le cloud.
*/
function mergeCloudAndLocalCandidatures(cloudItems, localItems, userId) {
	if (localItems.length === 0) return cloudItems;
	if (cloudItems.length === 0) {
		if (userId && localItems.length > 0) batchUpsertCandidatures(localItems, userId);
		return localItems;
	}
	const cloudMap = /* @__PURE__ */ new Map();
	cloudItems.forEach((c) => cloudMap.set(c.id, c));
	const missingInCloud = [];
	const merged = [];
	localItems.forEach((local) => {
		const cloud = cloudMap.get(local.id);
		if (!cloud) {
			missingInCloud.push(local);
			merged.push(local);
		} else {
			const localDate = local.savedAt || local.appliedAt || "";
			const cloudDate = cloud.savedAt || cloud.appliedAt || "";
			if (localDate && (!cloudDate || localDate > cloudDate)) merged.push(local);
			else merged.push(cloud);
			cloudMap.delete(local.id);
		}
	});
	cloudMap.forEach((c) => merged.push(c));
	if (userId && missingInCloud.length > 0) batchUpsertCandidatures(missingInCloud, userId);
	return merged;
}
/**
* Source unique des candidatures : cloud si connecté, navigateur sinon.
* Partagé par toutes les pages (dashboard, opportunités, calendrier, entreprises…).
*/
function useCandidatures() {
	const { user, loading: authLoading } = useSession();
	const userId = user?.id;
	const isCloudUser = Boolean(userId);
	const [items, setItems] = (0, import_react.useState)(() => {
		if (!hasHydrated) return [];
		if (memoryCache !== null) return memoryCache;
		return loadCandidatures(userId);
	});
	const [ready, setReady] = (0, import_react.useState)(() => hasHydrated);
	const [syncing, setSyncing] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const handleSync = (updatedItems) => {
			setItems(updatedItems);
		};
		listeners.add(handleSync);
		return () => {
			listeners.delete(handleSync);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hasHydrated) {
			hasHydrated = true;
			const initial = memoryCache !== null ? memoryCache : loadCandidatures(userId);
			memoryCache = initial;
			setItems(initial);
			setReady(true);
		}
	}, [userId]);
	(0, import_react.useEffect)(() => {
		if (authLoading) return;
		let cancelled = false;
		if (!isCloudUser || !userId) {
			console.info("[OPPORTUNITY LOAD LOCAL] Mode hors ligne / non authentifié");
			migrateExistingOpportunities(memoryCache ?? loadCandidatures()).then((migrated) => {
				if (!cancelled) {
					notifyCandidatureChange(migrated);
					setReady(true);
				}
			});
			return;
		}
		setSyncing(true);
		(async () => {
			try {
				console.info("[OPPORTUNITY LOAD SYNC START]", { userId });
				const cloud = await fetchCandidatures(userId);
				if (!cancelled) {
					const migrated = await migrateExistingOpportunities(mergeCloudAndLocalCandidatures(cloud, memoryCache ?? loadCandidatures(userId), userId), userId);
					console.info("[OPPORTUNITY LOAD SYNC APPLIED]", { count: migrated.length });
					notifyCandidatureChange(migrated, userId);
				}
			} catch (err) {
				console.warn("[OPPORTUNITY LOAD SYNC FAILED, USING CACHE]", err);
				if (!cancelled) {
					const cachedItems = loadCandidatures(userId);
					notifyCandidatureChange(await migrateExistingOpportunities(cachedItems.length > 0 ? cachedItems : loadCandidatures(), userId), userId);
				}
			} finally {
				if (!cancelled) {
					setSyncing(false);
					setReady(true);
				}
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [
		isCloudUser,
		userId,
		authLoading
	]);
	(0, import_react.useEffect)(() => {
		if (!isCloudUser || !userId) return;
		const refresh = () => {
			if (document.visibilityState !== "visible") return;
			fetchCandidatures(userId).then((cloud) => {
				return migrateExistingOpportunities(mergeCloudAndLocalCandidatures(cloud, memoryCache ?? loadCandidatures(userId), userId), userId);
			}).then((migrated) => {
				notifyCandidatureChange(migrated, userId);
			}).catch(() => void 0);
		};
		window.addEventListener("focus", refresh);
		document.addEventListener("visibilitychange", refresh);
		return () => {
			window.removeEventListener("focus", refresh);
			document.removeEventListener("visibilitychange", refresh);
		};
	}, [isCloudUser, userId]);
	(0, import_react.useEffect)(() => {
		if (ready) saveCandidatures(items, userId);
	}, [
		items,
		ready,
		userId
	]);
	const pushCloud = (0, import_react.useCallback)((c) => {
		if (!isCloudUser || !userId) return;
		upsertCandidature(c, userId).catch(() => toast.error("Enregistrement en ligne impossible."));
	}, [isCloudUser, userId]);
	return {
		user,
		authLoading,
		items,
		setItems,
		ready,
		syncing,
		patch: (0, import_react.useCallback)((id, p) => {
			const currentList = memoryCache ?? items;
			const current = currentList.find((c) => c.id === id);
			if (!current) return;
			const next = {
				...current,
				...p
			};
			pushCloud(next);
			notifyCandidatureChange(currentList.map((c) => c.id === id ? next : c), userId);
		}, [
			items,
			pushCloud,
			userId
		]),
		remove: (0, import_react.useCallback)((id) => {
			const currentList = memoryCache ?? items;
			const toDelete = currentList.find((p) => p.id === id);
			const next = currentList.filter((p) => p.id !== id);
			notifyCandidatureChange(next, userId);
			if (toDelete) {
				syncOpportunityCompanyOnDelete(toDelete, next, userId);
				syncOpportunityContactOnDelete(toDelete, userId);
			}
			if (isCloudUser && userId) deleteCandidature(id, userId).catch(() => toast.error("Suppression en ligne impossible."));
			toast.success("Opportunité supprimée.");
		}, [
			isCloudUser,
			items,
			userId
		]),
		save: (0, import_react.useCallback)(async (c) => {
			console.info("[OPPORTUNITY HOOK SAVE START]", {
				id: c.id,
				poste: c.poste,
				entreprise: c.entreprise
			});
			const linkedCompanyId = await syncOpportunityCompanyOnSave(c, userId);
			let toSave = linkedCompanyId ? {
				...c,
				companyId: linkedCompanyId
			} : c;
			const linkedContactId = await syncOpportunityContactOnSave(toSave, toSave.companyId || null, userId);
			if (linkedContactId) toSave = {
				...toSave,
				contactId: linkedContactId,
				contactIds: Array.from(/* @__PURE__ */ new Set([...toSave.contactIds || [], linkedContactId]))
			};
			let saved = toSave;
			if (isCloudUser && userId) try {
				saved = await upsertCandidature(toSave, userId);
				console.info("[OPPORTUNITY HOOK SAVE CLOUD SUCCESS]", { id: saved.id });
			} catch (err) {
				console.error("[OPPORTUNITY HOOK SAVE CLOUD ERROR] Sauvegarde Firestore échouée, conservation en local:", err);
				toast.error("Sauvegarde locale effectuée (erreur réseau avec la base en ligne).");
			}
			const currentList = memoryCache ?? items;
			const next = currentList.some((p) => p.id === toSave.id) ? currentList.map((p) => p.id === toSave.id ? saved : p) : [saved, ...currentList];
			notifyCandidatureChange(next, userId);
			console.info("[OPPORTUNITY HOOK STATE UPDATED]", { totalCount: next.length });
			return saved;
		}, [
			isCloudUser,
			items,
			userId
		]),
		pushCloud
	};
}
function useEntreprises() {
	const { user, loading: authLoading } = useSession();
	const userId = user?.id;
	const isCloudUser = Boolean(userId);
	const [entreprises, setEntreprises] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const entreprisesRef = (0, import_react.useRef)([]);
	entreprisesRef.current = entreprises;
	(0, import_react.useEffect)(() => {
		if (authLoading) return;
		let cancelled = false;
		if (!isCloudUser || !userId) {
			setEntreprises(loadEntreprisesLocal());
			setLoading(false);
			return;
		}
		setLoading(true);
		(async () => {
			try {
				const cloud = await fetchEntreprises(userId);
				if (!cancelled) {
					if (cloud.length > 0) {
						setEntreprises(cloud);
						saveEntreprisesLocal(cloud);
					} else {
						const local = loadEntreprisesLocal();
						setEntreprises(local);
					}
				}
			} catch (err) {
				console.warn("Échec récupération entreprises cloud, repli local:", err);
				if (!cancelled) setEntreprises(loadEntreprisesLocal());
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [
		isCloudUser,
		userId,
		authLoading
	]);
	const saveEntreprise = (0, import_react.useCallback)(async (e) => {
		let saved = e;
		if (isCloudUser && userId) try {
			saved = await upsertEntreprise(e, userId);
		} catch (err) {
			console.warn("Échec sauvegarde entreprise Firestore:", err);
		}
		setEntreprises((prev) => {
			const next = prev.some((item) => item.id === e.id) ? prev.map((item) => item.id === e.id ? saved : item) : [saved, ...prev];
			saveEntreprisesLocal(next);
			return next;
		});
		return saved;
	}, [isCloudUser, userId]);
	const removeEntreprise = (0, import_react.useCallback)(async (id) => {
		setEntreprises((prev) => {
			const next = prev.filter((item) => item.id !== id);
			saveEntreprisesLocal(next);
			return next;
		});
		if (isCloudUser && userId) try {
			await deleteEntrepriseCloud(id, userId);
		} catch (err) {
			console.warn("Échec suppression entreprise Firestore:", err);
		}
	}, [isCloudUser, userId]);
	const getOpportunitiesForEntreprise = (0, import_react.useCallback)((e, candidatures) => {
		return candidatures.filter((c) => {
			if (c.companyId && c.companyId === e.id) return true;
			return normalizeCompanyName(c.companyName || c.company || c.entreprise) === e.normalizedName;
		});
	}, []);
	const getContactsForEntreprise = (0, import_react.useCallback)((e, contacts) => {
		return contacts.filter((ct) => {
			if (ct.candidatureId && ct.candidatureId === e.id) return true;
			if (ct.companyId === e.id) return true;
			if (ct.entreprise) {
				if (findMatchingEntreprise({ nom: ct.entreprise }, [e])) return true;
			}
			return false;
		});
	}, []);
	/**
	* Synchronisation automatique intelligente :
	* - Pour chaque opportunité ET chaque contact réseau, s'assure qu'une entreprise existe et est enrichie.
	* - Rattache `companyId` si absent.
	* - Ne supprime jamais les données manuelles utilisateur.
	*/
	const syncWithOpportunites = (0, import_react.useCallback)(async (candidatures, contacts = []) => {
		let currentList = [...entreprisesRef.current];
		const patchedCands = [];
		const toUpsert = [];
		let anyChanged = false;
		for (const opp of candidatures) {
			if (!(opp.companyName || opp.company || opp.entreprise || "").trim()) continue;
			const { entreprise, isNew, hasChanged } = syncEntrepriseFromOpportunity(opp, currentList);
			if (isNew) {
				currentList = [entreprise, ...currentList];
				anyChanged = true;
				toUpsert.push(entreprise);
			} else if (hasChanged) {
				currentList = currentList.map((item) => item.id === entreprise.id ? entreprise : item);
				anyChanged = true;
				toUpsert.push(entreprise);
			}
			if (opp.companyId !== entreprise.id) patchedCands.push({
				...opp,
				companyId: entreprise.id
			});
		}
		for (const ct of contacts) {
			if (!ct.entreprise?.trim()) continue;
			const res = syncEntrepriseFromContact(ct, currentList);
			if (!res) continue;
			const { entreprise, isNew, hasChanged } = res;
			if (isNew) {
				currentList = [entreprise, ...currentList];
				anyChanged = true;
				toUpsert.push(entreprise);
			} else if (hasChanged) {
				currentList = currentList.map((item) => item.id === entreprise.id ? entreprise : item);
				anyChanged = true;
				toUpsert.push(entreprise);
			}
		}
		if (anyChanged) {
			setEntreprises(currentList);
			saveEntreprisesLocal(currentList);
			if (isCloudUser && userId && toUpsert.length > 0) batchUpsertEntreprises(toUpsert, userId);
		}
		return {
			updatedEntreprises: currentList,
			patchedCandidatures: patchedCands
		};
	}, [isCloudUser, userId]);
	/**
	* Gestion de la suppression d'une opportunité :
	* Applique la règle stricte :
	* - Supprime l'opportunité
	* - Recalcule les opportunités de l'entreprise
	* - Si restantes > 0 -> conserve l'entreprise
	* - Sinon vérifie données persistantes (contacts, notes, coordonnées, etc.)
	* - Si persistantes -> conserve
	* - Sinon nettoie l'entreprise vide
	*/
	const handleOpportunityDeleted = (0, import_react.useCallback)(async (deletedOpp, remainingOpportunities, contacts = []) => {
		const targetCompany = findMatchingEntreprise({
			companyId: deletedOpp.companyId,
			nom: deletedOpp.companyName || deletedOpp.company || deletedOpp.entreprise
		}, entreprises);
		if (!targetCompany) return;
		if (!shouldKeepEntrepriseAfterOpportunityDeleted(targetCompany, remainingOpportunities, contacts)) await removeEntreprise(targetCompany.id);
	}, [entreprises, removeEntreprise]);
	return {
		entreprises,
		loading: loading || authLoading,
		saveEntreprise,
		removeEntreprise,
		getOpportunitiesForEntreprise,
		getContactsForEntreprise,
		syncWithOpportunites,
		handleOpportunityDeleted
	};
}
var _jsxFileName = "/app/applet/src/routes/contacts.tsx";
var Route$11 = createFileRoute("/contacts")({
	head: () => ({ meta: [
		{ title: "Contacts — NACORA" },
		{
			name: "description",
			content: "Gérez vos recruteurs, RH, managers et relations LinkedIn/téléphone, suivez vos échanges et synchronisez vos opportunités."
		},
		{
			property: "og:title",
			content: "Contacts — NACORA"
		},
		{
			property: "og:description",
			content: "Carnet de contacts professionnels synchronisé avec vos opportunités et entreprises cibles."
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
	component: ContactsPage
});
function ContactsPage() {
	const { user, loading: authLoading } = useSession();
	const profil = useProfil(user);
	const { contacts, loading: contactsLoading, saveContact, deleteContactById, batchImportContacts, getOpportunitiesForContact } = useContacts();
	const { items: candidatures, save: saveCandidature } = useCandidatures();
	const { entreprises } = useEntreprises();
	const [recherche, setRecherche] = (0, import_react.useState)("");
	const [filtreType, setFiltreType] = (0, import_react.useState)("tous");
	const [filtreCategory, setFiltreCategory] = (0, import_react.useState)("all");
	const [filtreSource, setFiltreSource] = (0, import_react.useState)("all");
	const [filtreRelation, setFiltreRelation] = (0, import_react.useState)("all");
	const [viewMode, setViewMode] = (0, import_react.useState)(() => {
		if (typeof window !== "undefined") return localStorage.getItem("nacora_contacts_view_mode") ?? "grid";
		return "grid";
	});
	const handleSetViewMode = (mode) => {
		setViewMode(mode);
		localStorage.setItem("nacora_contacts_view_mode", mode);
	};
	const [sheetOpen, setSheetOpen] = (0, import_react.useState)(false);
	const [selectedContact, setSelectedContact] = (0, import_react.useState)(() => emptyContact());
	const [importModalOpen, setImportModalOpen] = (0, import_react.useState)(false);
	const [editingOpp, setEditingOpp] = (0, import_react.useState)(null);
	const [oppSheetOpen, setOppSheetOpen] = (0, import_react.useState)(false);
	const stats = (0, import_react.useMemo)(() => {
		return {
			total: contacts.length,
			withOpps: contacts.filter((c) => getOpportunitiesForContact(c, candidatures).length > 0).length,
			withCompany: contacts.filter((c) => Boolean(c.companyId || c.entreprise)).length,
			fromPhone: contacts.filter((c) => c.sources?.includes("phone") || c.source === "phone").length,
			fromLinkedin: contacts.filter((c) => c.sources?.includes("linkedin") || c.source === "linkedin").length
		};
	}, [
		contacts,
		candidatures,
		getOpportunitiesForContact
	]);
	const liste = (0, import_react.useMemo)(() => {
		const q = recherche.trim().toLowerCase();
		return contacts.filter((c) => {
			if (filtreType !== "tous" && c.type !== filtreType) return false;
			if (filtreCategory !== "all" && c.category !== filtreCategory) return false;
			if (filtreSource !== "all") {
				if (!(c.sources && c.sources.length > 0 ? c.sources : [c.source || "manual"]).includes(filtreSource)) return false;
			}
			const opps = getOpportunitiesForContact(c, candidatures);
			if (filtreRelation === "with_opps" && opps.length === 0) return false;
			if (filtreRelation === "without_opps" && opps.length > 0) return false;
			if (filtreRelation === "with_company" && !c.companyId && !c.entreprise) return false;
			if (q) {
				const fullName = getContactFullName(c).toLowerCase();
				const company = getContactCompany(c).toLowerCase();
				const job = getContactJobTitle(c).toLowerCase();
				const email = (c.email || "").toLowerCase();
				const phone = (c.telephone || "").toLowerCase();
				const notes = (c.notes || "").toLowerCase();
				return fullName.includes(q) || company.includes(q) || job.includes(q) || email.includes(q) || phone.includes(q) || notes.includes(q);
			}
			return true;
		}).sort((a, b) => {
			const scoreA = a.relevanceScore ?? -1;
			const scoreB = b.relevanceScore ?? -1;
			if (scoreA !== scoreB) return scoreB - scoreA;
			return getContactFullName(a).localeCompare(getContactFullName(b));
		});
	}, [
		contacts,
		recherche,
		filtreType,
		filtreCategory,
		filtreSource,
		filtreRelation,
		candidatures,
		getOpportunitiesForContact
	]);
	const handleOpenNew = () => {
		setSelectedContact(emptyContact());
		setSheetOpen(true);
	};
	const handleOpenContact = (c) => {
		setSelectedContact(c);
		setSheetOpen(true);
	};
	const handleSaveContact = async (c) => {
		await saveContact(c);
		setSheetOpen(false);
	};
	const handleDeleteContact = async (c) => {
		await deleteContactById(c.id);
		setSheetOpen(false);
	};
	const handleOpenOpportunity = (candidatureId) => {
		const opp = candidatures.find((x) => x.id === candidatureId);
		if (opp) {
			setEditingOpp(opp);
			setOppSheetOpen(true);
		}
	};
	const getInitials = (contact) => {
		const name = getContactFullName(contact);
		if (!name) return "CO";
		const parts = name.trim().split(/\s+/);
		if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
		return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		title: "Contacts",
		actions: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					onClick: () => setImportModalOpen(true),
					className: "gap-1.5 text-xs h-9 font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Linkedin, { className: "size-3.5 text-white" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 265,
						columnNumber: 13
					}, this), " Importer mes contacts LinkedIn"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 261,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "outline",
					onClick: () => setImportModalOpen(true),
					className: "gap-1.5 text-xs h-9 font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Upload, { className: "size-3.5 text-muted-foreground" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 273,
						columnNumber: 13
					}, this), " Autre import (vCard)"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 268,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					onClick: handleOpenNew,
					className: "gap-1.5 text-xs h-9 font-semibold bg-primary text-primary-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 280,
						columnNumber: 13
					}, this), " Nouveau contact"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 276,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 260,
			columnNumber: 9
		}, this),
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-5 flex flex-wrap items-center gap-2.5 text-xs font-semibold",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 text-foreground backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "size-2 rounded-full bg-slate-400 shadow-[0_0_6px_rgba(148,163,184,0.6)]" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 288,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground font-medium",
								children: "Total Contacts :"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 289,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-bold",
								children: stats.total
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 292,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 287,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 text-foreground backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "size-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 295,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground font-medium",
								children: "Avec opportunité :"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 296,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-bold text-emerald-400",
								children: stats.withOpps
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 299,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 294,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 text-foreground backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "size-2 rounded-full bg-sky-400 shadow-[0_0_6px_rgba(56,189,248,0.8)]" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 302,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground font-medium",
								children: "Rattachés Entreprises :"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 303,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-bold text-sky-300",
								children: stats.withCompany
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 306,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 301,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 text-foreground backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "size-2 rounded-full bg-indigo-400 shadow-[0_0_6px_rgba(129,140,248,0.8)]" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 309,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground font-medium",
								children: "Imports Réseau :"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 310,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-bold text-indigo-300",
								children: [
									stats.fromPhone + stats.fromLinkedin,
									" (",
									stats.fromPhone,
									" tél. /",
									" ",
									stats.fromLinkedin,
									" in)"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 313,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 308,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 286,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "glass-panel mb-6 flex flex-col gap-3.5 p-3.5 sm:p-4 shadow-md",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative flex-1 min-w-[240px]",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 324,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "text",
							value: recherche,
							onChange: (e) => setRecherche(e.target.value),
							placeholder: "Rechercher par nom, entreprise, poste, email, notes...",
							className: "h-9.5 w-full rounded-xl bg-white/5 pl-9 pr-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:bg-white/10 focus:ring-2 focus:ring-primary/20 backdrop-blur-md transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 325,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 323,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
								value: filtreType,
								onValueChange: setFiltreType,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
									className: "w-36 sm:w-40 h-9.5 text-xs rounded-xl bg-white/5 border-white/10 backdrop-blur-md",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "Rôle" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 337,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 336,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: "tous",
									className: "text-xs",
									children: "Tous les rôles"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 340,
									columnNumber: 17
								}, this), TYPES_CONTACT.map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: t,
									className: "text-xs",
									children: t
								}, t, false, {
									fileName: _jsxFileName,
									lineNumber: 344,
									columnNumber: 19
								}, this))] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 339,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 335,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
								value: filtreCategory,
								onValueChange: setFiltreCategory,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
									className: "w-40 sm:w-48 h-9.5 text-xs rounded-xl bg-white/5 border-white/10 backdrop-blur-md",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "Catégorie IA" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 353,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 352,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: "all",
									className: "text-xs",
									children: "Toutes catégories IA"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 356,
									columnNumber: 17
								}, this), CATEGORIES_CONTACT.map((cat) => {
									const style = getCategoryBadgeStyle(cat);
									return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: cat,
										className: "text-xs",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `size-2 rounded-full shrink-0 ${style.dotClass}` }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 364,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: cat }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 367,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 363,
											columnNumber: 23
										}, this)
									}, cat, false, {
										fileName: _jsxFileName,
										lineNumber: 362,
										columnNumber: 21
									}, this);
								})] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 355,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 351,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
								value: filtreSource,
								onValueChange: (v) => setFiltreSource(v),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
									className: "w-36 sm:w-40 h-9.5 text-xs rounded-xl bg-white/5 border-white/10 backdrop-blur-md",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "Source" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 380,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 379,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "all",
										className: "text-xs",
										children: "Toutes sources"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 383,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "phone",
										className: "text-xs",
										children: "Téléphone (vCard)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 386,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "linkedin",
										className: "text-xs",
										children: "LinkedIn"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 389,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "opportunity",
										className: "text-xs",
										children: "Opportunité"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 392,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "manual",
										className: "text-xs",
										children: "Manuel"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 395,
										columnNumber: 17
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 382,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 375,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
								value: filtreRelation,
								onValueChange: (v) => setFiltreRelation(v),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
									className: "w-36 sm:w-40 h-9.5 text-xs rounded-xl bg-white/5 border-white/10 backdrop-blur-md",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "Liaison" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 406,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 405,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "all",
										className: "text-xs",
										children: "Toutes liaisons"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 409,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "with_opps",
										className: "text-xs",
										children: "Avec opportunité(s)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 412,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "without_opps",
										className: "text-xs",
										children: "Sans opportunité"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 415,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "with_company",
										className: "text-xs",
										children: "Lié à une entreprise"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 418,
										columnNumber: 17
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 408,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 401,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-0.5 rounded-xl bg-black/25 dark:bg-black/30 backdrop-blur-xl p-1 select-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => handleSetViewMode("grid"),
									"aria-label": "Vue grille",
									className: cn("grid size-7.5 place-items-center rounded-lg transition-all cursor-pointer", viewMode === "grid" ? "bg-white/15 dark:bg-white/15 text-foreground font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]" : "text-muted-foreground hover:text-foreground"),
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LayoutGrid, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 437,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 426,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => handleSetViewMode("table"),
									"aria-label": "Vue tableau",
									className: cn("grid size-7.5 place-items-center rounded-lg transition-all cursor-pointer", viewMode === "table" ? "bg-white/15 dark:bg-white/15 text-foreground font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]" : "text-muted-foreground hover:text-foreground"),
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(List, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 450,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 439,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 425,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 334,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 322,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 321,
				columnNumber: 7
			}, this),
			contactsLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-center p-12 text-sm text-muted-foreground gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin text-muted-foreground" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 460,
						columnNumber: 11
					}, this),
					" ",
					"Chargement de vos contacts…"
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 459,
				columnNumber: 9
			}, this) : liste.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-panel border-dashed p-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mx-auto grid size-12 place-items-center rounded-2xl bg-white/5 text-muted-foreground mb-3 border border-white/10",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "size-6 text-primary" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 467,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 466,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "font-semibold text-sm text-foreground",
						children: recherche || filtreType !== "tous" || filtreSource !== "all" || filtreRelation !== "all" ? "Aucun contact ne correspond à ces critères" : "Votre carnet de contacts est encore vide"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 469,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 text-xs text-muted-foreground max-w-md mx-auto",
						children: recherche || filtreType !== "tous" || filtreSource !== "all" || filtreRelation !== "all" ? "Essayez de modifier votre recherche ou réinitialisez les filtres." : "Importez vos contacts depuis votre téléphone (vCard) ou LinkedIn (CSV) pour alimenter vos opportunités en un clic."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 477,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-5 flex items-center justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setImportModalOpen(true),
							className: "text-xs gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Upload, { className: "size-3.5 text-muted-foreground" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 492,
								columnNumber: 15
							}, this), " Importer vCard / LinkedIn"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 486,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							onClick: handleOpenNew,
							className: "text-xs gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 500,
								columnNumber: 15
							}, this), " Nouveau contact"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 495,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 485,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 465,
				columnNumber: 9
			}, this) : viewMode === "table" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "overflow-hidden glass-panel",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
						className: "w-full text-left border-collapse",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
							className: "border-b border-border/50 bg-muted/20 text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-3 px-4",
									children: "Contact"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 511,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-3 px-4",
									children: "Pertinence"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 512,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-3 px-4",
									children: "Rôle / Type"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 513,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-3 px-4",
									children: "Entreprise & Poste"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 514,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-3 px-4",
									children: "Opportunités liées"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 515,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-3 px-4",
									children: "Action planifiée"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 516,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-3 px-4 text-right",
									children: "Actions"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 517,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 510,
							columnNumber: 17
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 509,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", {
							className: "divide-y divide-border/30 text-xs",
							children: liste.map((c) => {
								const fullName = getContactFullName(c);
								const company = getContactCompany(c);
								const jobTitle = getContactJobTitle(c);
								const initials = getInitials(c);
								const opps = getOpportunitiesForContact(c, candidatures);
								const sources = c.sources && c.sources.length > 0 ? c.sources : [c.source || "manual"];
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
									className: "hover:bg-muted/10 transition-colors group",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "py-3.5 px-4 min-w-[200px]",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "grid size-9 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground font-semibold text-xs border border-border/60",
													children: initials
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 539,
													columnNumber: 27
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "min-w-0",
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
														type: "button",
														onClick: () => handleOpenContact(c),
														className: "font-bold text-foreground hover:text-primary transition-colors text-left block",
														children: fullName || "Sans nom"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 543,
														columnNumber: 29
													}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
														className: "flex items-center gap-2 mt-0.5 text-[11px] text-muted-foreground",
														children: [
															c.email && /* @__PURE__ */ (void 0)("span", {
																className: "truncate",
																title: c.email,
																children: c.email
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 552,
																columnNumber: 33
															}, this),
															c.email && c.telephone && /* @__PURE__ */ (void 0)("span", { children: "•" }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 556,
																columnNumber: 58
															}, this),
															c.telephone && /* @__PURE__ */ (void 0)("span", {
																className: "shrink-0",
																children: c.telephone
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 558,
																columnNumber: 33
															}, this)
														]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 550,
														columnNumber: 29
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 542,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 538,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 537,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "py-3.5 px-4 whitespace-nowrap",
											children: c.relevanceScore !== void 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold border backdrop-blur-md ${c.relevanceScore >= 80 ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" : c.relevanceScore >= 60 ? "bg-sky-500/15 text-sky-300 border-sky-500/30" : "bg-slate-500/15 text-slate-300 border-slate-500/30"}`,
												children: [
													"⚡ ",
													c.relevanceScore,
													"%"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 566,
												columnNumber: 27
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-[11px] text-muted-foreground/60",
												children: "—"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 578,
												columnNumber: 27
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 564,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "py-3.5 px-4 whitespace-nowrap",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex flex-col gap-1 items-start",
												children: [c.category ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold border backdrop-blur-md ${getCategoryBadgeStyle(c.category).fullClass}`,
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-2.5 opacity-80" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 589,
														columnNumber: 31
													}, this), c.category]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 586,
													columnNumber: 29
												}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "rounded-full border border-border/60 bg-muted/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground",
													children: c.type
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 593,
													columnNumber: 29
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "flex items-center gap-1",
													children: sources.filter((s) => s !== "linkedin").map((src) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "inline-flex items-center gap-0.5 text-[10px] text-muted-foreground",
														title: `Source: ${SOURCE_LABELS[src] || src}`,
														children: [src === "phone" && /* @__PURE__ */ (void 0)(Smartphone, { className: "size-3 text-emerald-500" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 607,
															columnNumber: 37
														}, this), src === "opportunity" && /* @__PURE__ */ (void 0)(Briefcase, { className: "size-3 text-muted-foreground" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 610,
															columnNumber: 37
														}, this)]
													}, src, true, {
														fileName: _jsxFileName,
														lineNumber: 601,
														columnNumber: 33
													}, this))
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 597,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 584,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 583,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "py-3.5 px-4 min-w-[180px]",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "font-medium text-foreground",
												children: jobTitle || "Poste non précisé"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 618,
												columnNumber: 25
											}, this), company ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Building2, { className: "size-3" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 623,
													columnNumber: 29
												}, this), company]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 622,
												columnNumber: 27
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-[10px] text-muted-foreground/60",
												children: "—"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 627,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 617,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "py-3.5 px-4 max-w-[240px]",
											children: opps.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex flex-wrap gap-1",
												children: [opps.slice(0, 2).map((opp) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
													type: "button",
													onClick: () => handleOpenOpportunity(opp.id),
													className: "inline-flex items-center gap-1.5 rounded bg-muted hover:bg-muted/80 border border-border px-1.5 py-0.5 text-[10px] font-medium text-foreground transition-colors max-w-[140px] truncate",
													children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "truncate",
														children: opp.poste || "Offre"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 642,
														columnNumber: 33
													}, this)
												}, opp.id, false, {
													fileName: _jsxFileName,
													lineNumber: 636,
													columnNumber: 31
												}, this)), opps.length > 2 && /* @__PURE__ */ (void 0)("span", {
													className: "text-[10px] text-muted-foreground self-center",
													children: ["+", opps.length - 2]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 648,
													columnNumber: 31
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 634,
												columnNumber: 27
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-[11px] text-muted-foreground/60",
												children: "Aucune"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 654,
												columnNumber: 27
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 632,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "py-3.5 px-4 max-w-[180px]",
											children: c.prochaineAction ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "text-[11px] font-medium text-amber-600 dark:text-amber-400 truncate",
												title: c.prochaineAction,
												children: [c.prochaineAction, c.dateProchaineAction && /* @__PURE__ */ (void 0)("span", {
													className: "text-[10px] text-muted-foreground block font-normal",
													children: c.dateProchaineAction
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 667,
													columnNumber: 31
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 661,
												columnNumber: 27
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-[11px] text-muted-foreground/40",
												children: "—"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 673,
												columnNumber: 27
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 659,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "py-3.5 px-4 text-right whitespace-nowrap",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
												variant: "ghost",
												size: "sm",
												onClick: () => handleOpenContact(c),
												className: "h-8 px-2.5 text-xs text-muted-foreground hover:text-foreground font-semibold",
												children: "Détails"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 679,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 678,
											columnNumber: 23
										}, this)
									]
								}, c.id, true, {
									fileName: _jsxFileName,
									lineNumber: 533,
									columnNumber: 21
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 520,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 508,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 507,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 506,
				columnNumber: 9
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3",
				children: liste.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ContactCard, {
					contact: c,
					candidatures,
					onOpenDetails: handleOpenContact,
					onOpenMessageIa: handleOpenContact,
					onOpenOpportunity: handleOpenOpportunity
				}, c.id, false, {
					fileName: _jsxFileName,
					lineNumber: 699,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 697,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ContactSheet, {
				open: sheetOpen,
				onOpenChange: setSheetOpen,
				contact: selectedContact,
				candidatures,
				entreprises,
				profil,
				onSave: (c) => void handleSaveContact(c),
				onDelete: (c) => void handleDeleteContact(c),
				onOpenCandidature: handleOpenOpportunity
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 712,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ContactImportModal, {
				open: importModalOpen,
				onOpenChange: setImportModalOpen,
				existingContacts: contacts,
				userSchool: profil?.ecole || profil?.formation,
				userTargetSector: profil?.posteCible || profil?.metierCible,
				onImportComplete: async (contactsToImport, resolutions) => {
					return await batchImportContacts(contactsToImport, resolutions);
				}
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 725,
				columnNumber: 7
			}, this),
			editingOpp && /* @__PURE__ */ (void 0)(CandidatureSheet, {
				value: editingOpp,
				profil,
				open: oppSheetOpen,
				onOpenChange: (v) => {
					setOppSheetOpen(v);
					if (!v) setEditingOpp(null);
				},
				onSave: async (patch) => {
					const updated = {
						...editingOpp,
						...patch
					};
					setEditingOpp(updated);
					await saveCandidature(updated);
				}
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 738,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 257,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$6 = () => import("./documents-nLG8_t9S.mjs");
var Route$10 = createFileRoute("/documents")({
	head: () => ({ meta: [{ title: "Documents — NACORA" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./entreprises-AcZo7IDb.mjs");
var Route$9 = createFileRoute("/entreprises")({
	head: () => ({ meta: [
		{ title: "Entreprises — NACORA" },
		{
			name: "description",
			content: "Toutes vos entreprises cibles : opportunités liées, contacts réseau, notes stratégiques et informations clés."
		},
		{
			property: "og:title",
			content: "Entreprises — NACORA"
		},
		{
			property: "og:description",
			content: "Gestion centralisée et synchronisée de vos entreprises cibles, opportunités et contacts."
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
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./import-TwjcyDIu.mjs");
var Route$8 = createFileRoute("/import")({
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
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
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
	auth: auth$1.oauth.issuer({
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
var Route$7 = createFileRoute("/mcp")({ server: { handlers: { ANY: createTanStackMcpHandler(mcp_default, {
	resourcePath: "/mcp",
	metadataPath: "/.well-known/oauth-protected-resource",
	trustForwardedHost: true
}) } } });
var $$splitComponentImporter$3 = () => import("./opportunites-Bk0CWd-3.mjs");
var Route$6 = createFileRoute("/opportunites")({
	head: () => ({ meta: [
		{ title: "Opportunités — NACORA" },
		{
			name: "description",
			content: "Votre pipeline d'opportunités en 4 espaces : sauvegardées, à préparer, à étudier et à candidater."
		},
		{
			property: "og:title",
			content: "Opportunités — NACORA"
		},
		{
			property: "og:description",
			content: "Tableau de bord pipeline interactif avec vue Kanban et vue Liste."
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
var $$splitComponentImporter$2 = () => import("./parametres-BHGMNkGd.mjs");
var Route$5 = createFileRoute("/parametres")({
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
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./profil-DA-AAaSd.mjs");
var Route$4 = createFileRoute("/profil")({
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
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var Route$3 = createFileRoute("/.mcp/list-tools")({ server: { handlers: { ANY: createTanStackListToolsHandler(mcp_default, {
	resourcePath: "/mcp",
	metadataPath: "/.well-known/oauth-protected-resource",
	trustForwardedHost: true
}) } } });
var Route$2 = createFileRoute("/.well-known/oauth-protected-resource")({ server: { handlers: { ANY: createTanStackOAuthProtectedResourceMetadataHandler(mcp_default, {
	resourcePath: "/mcp",
	metadataPath: "/.well-known/oauth-protected-resource",
	trustForwardedHost: true,
	forwardedHostTrustedByPlatform: true
}) } } });
var $$splitErrorComponentImporter = () => import("../_._lovable.oauth.consent-Cpkpi9xW.mjs");
var $$splitComponentImporter = () => import("../_._lovable.oauth.consent-DgFUaVUJ.mjs");
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
var rootRouteChildren = {
	IndexRoute: Route$16.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$17
	}),
	AssistantRoute: Route$15.update({
		id: "/assistant",
		path: "/assistant",
		getParentRoute: () => Route$17
	}),
	AuthRoute: Route$14.update({
		id: "/auth",
		path: "/auth",
		getParentRoute: () => Route$17
	}),
	CalendrierRoute: Route$13.update({
		id: "/calendrier",
		path: "/calendrier",
		getParentRoute: () => Route$17
	}),
	CandidaturesRoute: Route$12.update({
		id: "/candidatures",
		path: "/candidatures",
		getParentRoute: () => Route$17
	}),
	ContactsRoute: Route$11.update({
		id: "/contacts",
		path: "/contacts",
		getParentRoute: () => Route$17
	}),
	DocumentsRoute: Route$10.update({
		id: "/documents",
		path: "/documents",
		getParentRoute: () => Route$17
	}),
	EntreprisesRoute: Route$9.update({
		id: "/entreprises",
		path: "/entreprises",
		getParentRoute: () => Route$17
	}),
	ImportRoute: Route$8.update({
		id: "/import",
		path: "/import",
		getParentRoute: () => Route$17
	}),
	McpRoute: Route$7.update({
		id: "/mcp",
		path: "/mcp",
		getParentRoute: () => Route$17
	}),
	OpportunitesRoute: Route$6.update({
		id: "/opportunites",
		path: "/opportunites",
		getParentRoute: () => Route$17
	}),
	ParametresRoute: Route$5.update({
		id: "/parametres",
		path: "/parametres",
		getParentRoute: () => Route$17
	}),
	ProfilRoute: Route$4.update({
		id: "/profil",
		path: "/profil",
		getParentRoute: () => Route$17
	}),
	Char91DotmcpChar93ListToolsRoute: Route$3.update({
		id: "/.mcp/list-tools",
		path: "/.mcp/list-tools",
		getParentRoute: () => Route$17
	}),
	Char91DotwellKnownChar93OauthProtectedResourceRoute: Route$2.update({
		id: "/.well-known/oauth-protected-resource",
		path: "/.well-known/oauth-protected-resource",
		getParentRoute: () => Route$17
	}),
	DotlovableOauthConsentRoute: Route$1.update({
		id: "/.lovable/oauth/consent",
		path: "/.lovable/oauth/consent",
		getParentRoute: () => Route$17
	}),
	Char91DotmcpChar93InvokeToolToolRoute: Route.update({
		id: "/.mcp/invoke-tool/$tool",
		path: "/.mcp/invoke-tool/$tool",
		getParentRoute: () => Route$17
	})
};
var routeTree = Route$17._addFileChildren(rootRouteChildren)._addFileTypes();
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
export { DialogFooter as A, Tabs as C, Dialog as D, TabsTrigger as E, DialogTitle as M, DialogContent as O, StatutBadge as S, TabsList as T, AlertDialogFooter as _, emptyEntreprise as a, CandidatureSheet as b, ContactImportModal as c, Route$15 as d, AlertDialog as f, AlertDialogDescription as g, AlertDialogContent as h, useCandidatures as i, DialogHeader as j, DialogDescription as k, ContactSheet as l, AlertDialogCancel as m, Route$1 as n, useProfil as o, AlertDialogAction as p, useEntreprises as r, ContactCard as s, router_exports as t, Route$14 as u, AlertDialogHeader as v, TabsContent as w, CenterModal as x, AlertDialogTitle as y };

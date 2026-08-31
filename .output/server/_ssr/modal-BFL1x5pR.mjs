import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { M as cn } from "./router-WcHZLW5p.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BBUarmca.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/modal-BFL1x5pR.js
var import_jsx_runtime = require_jsx_runtime();
var TAILLES = {
	sm: "sm:max-w-md",
	md: "sm:max-w-lg",
	lg: "sm:max-w-2xl",
	xl: "sm:max-w-3xl"
};
/** Fenêtre centrale Careerly : en-tête fixe, contenu défilant, actions en bas. */
function CenterModal({ open, onOpenChange, title, description, children, footer, size = "lg", className, bodyClassName }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: cn("flex max-h-[88svh] w-[calc(100vw-1.5rem)] flex-col gap-0 overflow-hidden rounded-3xl border-border/60 bg-card/95 p-0 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] backdrop-blur-2xl", TAILLES[size], className),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					className: "shrink-0 space-y-1 border-b border-border/50 px-5 py-4 pr-12 text-left sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-base sm:text-lg",
						children: title
					}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "truncate",
						children: description
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6", bodyClassName),
					children
				}),
				footer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "shrink-0 border-t border-border/50 bg-background/40 px-5 py-3.5 sm:px-6",
					children: footer
				}) : null
			]
		})
	});
}
//#endregion
export { CenterModal as t };

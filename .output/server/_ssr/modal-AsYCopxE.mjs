import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as cn } from "./button-DDzEUEFj.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-B3Jp4UDR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/modal-AsYCopxE.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/ui/modal.tsx";
var TAILLES = {
	sm: "sm:max-w-md",
	md: "sm:max-w-lg",
	lg: "sm:max-w-2xl",
	xl: "sm:max-w-3xl"
};
/** Fenêtre centrale NACORA : en-tête fixe, contenu défilant, actions en bas. */
function CenterModal({ open, onOpenChange, title, description, children, footer, size = "lg", className, bodyClassName }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
			className: cn("flex max-h-[88svh] w-[calc(100vw-1.5rem)] flex-col gap-0 overflow-hidden rounded-3xl border-border/60 bg-card/95 p-0 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] backdrop-blur-2xl", TAILLES[size], className),
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, {
					className: "shrink-0 space-y-1 border-b border-border/50 px-5 py-4 pr-12 text-left sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
						className: "text-base sm:text-lg",
						children: title
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 52,
						columnNumber: 11
					}, this), description ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
						className: "truncate",
						children: description
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 54,
						columnNumber: 13
					}, this) : null]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 51,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: cn("min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6", bodyClassName),
					children
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 60,
					columnNumber: 9
				}, this),
				footer ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "shrink-0 border-t border-border/50 bg-background/40 px-5 py-3.5 sm:px-6",
					children: footer
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 70,
					columnNumber: 11
				}, this) : null
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 44,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 43,
		columnNumber: 5
	}, this);
}
//#endregion
export { CenterModal as t };

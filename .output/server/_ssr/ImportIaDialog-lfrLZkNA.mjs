import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-DDzEUEFj.mjs";
import { V as LoaderCircle, v as Sparkles } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-B3Jp4UDR.mjs";
import { t as Textarea } from "./textarea-CNcwtOlr.mjs";
import { o as emptyCandidature } from "./candidatures-ck14d0Ow.mjs";
import { t as texteErreurIA } from "./ai-erreurs-B0Gxtc15.mjs";
import { n as analyserOffre, r as useServerFn } from "./CandidatureSheet-BqqfhG9v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ImportIaDialog-lfrLZkNA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/ImportIaDialog.tsx";
function ImportIaDialog({ open, onOpenChange, onResult }) {
	const [texte, setTexte] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [erreur, setErreur] = (0, import_react.useState)(null);
	const run = useServerFn(analyserOffre);
	const analyser = async () => {
		setLoading(true);
		setErreur(null);
		try {
			const r = await run({ data: { texte } });
			onResult({
				...emptyCandidature(),
				entreprise: r.entreprise,
				poste: r.poste,
				lieu: r.lieu,
				lien: r.lien,
				source: r.source || "JobTeaser",
				secteur: r.secteur || "",
				priorite: r.priorite === "Haute" || r.priorite === "Moyenne" || r.priorite === "Faible" ? r.priorite : "auto",
				contact: r.contact || "",
				dateLimite: /^\d{4}-\d{2}-\d{2}$/.test(r.dateLimite ?? "") ? r.dateLimite : "",
				commentaire: r.commentaire || "",
				missions: r.missions || "",
				profilRecherche: r.profilRecherche || "",
				modalites: r.modalites || "",
				detail: r.detail?.trim() || ""
			});
			setTexte("");
			onOpenChange(false);
		} catch (e) {
			setErreur(texteErreurIA(e));
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
			className: "sm:max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-5 text-primary" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 73,
						columnNumber: 13
					}, this), " Analyser une offre avec l'IA"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 72,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, { children: "Copiez-collez la fiche de poste : l'IA remplit l'entreprise, le poste, le lieu, le contact et le résumé de l'offre." }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 76,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 71,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
					rows: 12,
					value: texte,
					onChange: (e) => setTexte(e.target.value),
					placeholder: "Collez ici l'annonce complète (LinkedIn, Welcome to the Jungle, JobTeaser…)"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 82,
					columnNumber: 9
				}, this),
				erreur && /* @__PURE__ */ (void 0)("p", {
					className: "text-sm text-destructive",
					children: erreur
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 89,
					columnNumber: 20
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Annuler"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 92,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					onClick: analyser,
					disabled: loading || texte.trim().length < 20,
					children: [loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "animate-spin" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 99,
						columnNumber: 24
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 99,
						columnNumber: 63
					}, this), loading ? "Analyse en cours…" : "Analyser l'offre"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 95,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 91,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 70,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 69,
		columnNumber: 5
	}, this);
}
//#endregion
export { ImportIaDialog as t };

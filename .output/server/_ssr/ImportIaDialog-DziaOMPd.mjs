import { a as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { B as LoaderCircle, _ as Sparkles } from "../_libs/lucide-react.mjs";
import { j as Button } from "./router-AVT1AZP0.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { c as emptyCandidature } from "./candidatures-0RcN-a4_.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { t as texteErreurIA } from "./ai-erreurs-B0Gxtc15.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BBUarmca.mjs";
import { n as analyserOffre } from "./CandidatureSheet-BNx2Rq1Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ImportIaDialog-DziaOMPd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
				detail: r.resume?.trim() || texte.trim()
			});
			setTexte("");
			onOpenChange(false);
		} catch (e) {
			setErreur(texteErreurIA(e));
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5 text-primary" }), " Analyser une offre avec l'IA"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Copiez-collez la fiche de poste : l'IA remplit l'entreprise, le poste, le lieu, le contact et le résumé de l'offre." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 12,
					value: texte,
					onChange: (e) => setTexte(e.target.value),
					placeholder: "Collez ici l'annonce complète (LinkedIn, Welcome to the Jungle, JobTeaser…)"
				}),
				erreur && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-destructive",
					children: erreur
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Annuler"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: analyser,
					disabled: loading || texte.trim().length < 20,
					children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {}), loading ? "Analyse en cours…" : "Analyser l'offre"]
				})] })
			]
		})
	});
}
//#endregion
export { ImportIaDialog as t };

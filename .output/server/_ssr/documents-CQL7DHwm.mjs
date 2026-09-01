import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-DDzEUEFj.mjs";
import { V as LoaderCircle, ot as FileText, p as Trash2, v as Sparkles, yt as Copy } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-JIGp6MTc.mjs";
import { t as Textarea } from "./textarea-CNcwtOlr.mjs";
import { t as texteErreurIA } from "./ai-erreurs-B0Gxtc15.mjs";
import { o as offreEnTexte, s as profilEnTexte } from "./match-run-CVvUCz6E.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BAFTKIAY.mjs";
import { t as useProfil } from "./useProfil-Batqat5N.mjs";
import { t as useCandidatures } from "./useCandidatures-Cqc_s9SU.mjs";
import { n as genererLettre } from "./redaction.functions-wEfKVDTX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/documents-CQL7DHwm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/documents.tsx?tsr-split=component";
var CLE = "careerly.lettres";
function charger() {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(CLE);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}
function DocumentsPage() {
	const { user, authLoading, items } = useCandidatures();
	const profil = useProfil(user);
	const [lettres, setLettres] = (0, import_react.useState)([]);
	const [cibleId, setCibleId] = (0, import_react.useState)("aucune");
	const [consigne, setConsigne] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [ouverte, setOuverte] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => setLettres(charger()), []);
	const persister = (l) => {
		setLettres(l);
		try {
			localStorage.setItem(CLE, JSON.stringify(l));
		} catch {}
	};
	const generer = async () => {
		if (!profil) {
			toast.error("Complétez d'abord votre profil.");
			return;
		}
		const cible = items.find((c) => c.id === cibleId) ?? null;
		setLoading(true);
		try {
			const r = await genererLettre({ data: {
				profil: profilEnTexte(profil),
				offre: cible ? offreEnTexte(cible) : "",
				consigne
			} });
			const lettre = {
				id: crypto.randomUUID(),
				titre: cible ? `${cible.entreprise} — ${cible.poste}` : "Lettre générique",
				objet: (r.objet ?? "").trim(),
				contenu: (r.lettre ?? "").trim(),
				conseils: r.conseils ?? [],
				creeLe: (/* @__PURE__ */ new Date()).toISOString()
			};
			persister([lettre, ...lettres]);
			setOuverte(lettre.id);
			toast.success("Lettre générée.");
		} catch (e) {
			toast.error(texteErreurIA(e));
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		eyebrow: "AI Studio",
		title: "Documents",
		subtitle: `${lettres.length} lettre(s) de motivation enregistrée(s)`,
		actions: authLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-5 animate-spin opacity-70" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 85,
			columnNumber: 151
		}, this) : null,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-4 lg:grid-cols-[1fr_1.2fr]",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "glass-card pop-in flex h-fit flex-col gap-4 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-sm font-semibold",
						children: "Nouvelle lettre de motivation"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 88,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: "Offre visée"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 92,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
						value: cibleId,
						onValueChange: setCibleId,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "Choisir une offre" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 97,
							columnNumber: 17
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 96,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
							value: "aucune",
							children: "Lettre générique"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 100,
							columnNumber: 17
						}, this), items.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
							value: c.id,
							children: [
								c.entreprise,
								" — ",
								c.poste
							]
						}, c.id, true, {
							fileName: _jsxFileName,
							lineNumber: 101,
							columnNumber: 33
						}, this))] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 99,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 95,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 91,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: "Consigne complémentaire"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 108,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
						value: consigne,
						onChange: (e) => setConsigne(e.target.value),
						rows: 5,
						placeholder: "Ex : insister sur mon projet professionnel et ma disponibilité."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 111,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 107,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						onClick: () => void generer(),
						disabled: loading || !profil,
						children: loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "animate-spin" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 115,
							columnNumber: 17
						}, this), " Rédaction…"] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 114,
							columnNumber: 24
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 117,
							columnNumber: 17
						}, this), " Générer la lettre"] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 116,
							columnNumber: 21
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 113,
						columnNumber: 11
					}, this),
					!profil && /* @__PURE__ */ (void 0)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Renseignez d'abord",
							" ",
							/* @__PURE__ */ (void 0)(Link, {
								to: "/profil",
								className: "text-primary hover:underline",
								children: "votre profil"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 122,
								columnNumber: 15
							}, this),
							" ",
							"(ou importez votre CV) pour une lettre pertinente."
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 120,
						columnNumber: 23
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 87,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "flex flex-col gap-3",
				children: [lettres.length === 0 && /* @__PURE__ */ (void 0)("p", {
					className: "glass-card p-8 text-center text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (void 0)(FileText, { className: "mx-auto mb-3 size-6 text-primary" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 131,
						columnNumber: 15
					}, this), "Aucune lettre pour l'instant."]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 130,
					columnNumber: 36
				}, this), lettres.map((l) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
					className: "glass-card pop-in p-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							className: "min-w-0 flex-1 text-left",
							onClick: () => setOuverte(ouverte === l.id ? null : l.id),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "truncate text-[14px] font-semibold",
								children: l.titre
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 137,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: l.objet || new Date(l.creeLe).toLocaleDateString("fr-FR")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 140,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 136,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex shrink-0 gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => {
									navigator.clipboard.writeText(l.contenu);
									toast.success("Lettre copiée.");
								},
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 149,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 145,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => persister(lettres.filter((x) => x.id !== l.id)),
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4 text-destructive" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 152,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 151,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 144,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 135,
						columnNumber: 15
					}, this), ouverte === l.id && /* @__PURE__ */ (void 0)("div", {
						className: "mt-3 border-t border-border/60 pt-3",
						children: [/* @__PURE__ */ (void 0)("p", {
							className: "whitespace-pre-wrap text-[13.5px] leading-relaxed text-muted-foreground",
							children: l.contenu
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 157,
							columnNumber: 19
						}, this), l.conseils.length > 0 && /* @__PURE__ */ (void 0)("ul", {
							className: "mt-3 list-disc pl-5 text-xs text-muted-foreground",
							children: l.conseils.map((c, i) => /* @__PURE__ */ (void 0)("li", { children: c }, i, false, {
								fileName: _jsxFileName,
								lineNumber: 161,
								columnNumber: 49
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 160,
							columnNumber: 45
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 156,
						columnNumber: 36
					}, this)]
				}, l.id, true, {
					fileName: _jsxFileName,
					lineNumber: 134,
					columnNumber: 29
				}, this))]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 129,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 86,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 85,
		columnNumber: 10
	}, this);
}
//#endregion
export { DocumentsPage as component };

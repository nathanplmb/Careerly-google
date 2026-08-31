import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { U as Linkedin, V as LoaderCircle, Vt as ArrowLeft, _t as Copy, v as Sparkles } from "../_libs/lucide-react.mjs";
import { d as Textarea, dt as Button } from "./router-Dma1Qf70.mjs";
import { t as AppShell } from "./AppShell-SgP4smEW.mjs";
import { t as useProfil } from "./useProfil-CGOz7dcn.mjs";
import { t as AiContextCard } from "./AiContextCard-1AGYX72w.mjs";
import { t as useCandidatures } from "./useCandidatures-CSkPDSDT.mjs";
import { c as texteErreurIA, o as offreEnTexte, s as profilEnTexte } from "./match-run-CFvAPahz.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BAFTKIAY.mjs";
import { r as genererLinkedin } from "./redaction.functions-Ceh_fGWA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assistant.linkedin-CLYA-CP_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/assistant.linkedin.tsx?tsr-split=component";
function Bloc({ titre, texte }) {
	if (!texte) return null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "rounded-2xl border border-border/60 bg-card/60 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mb-2 flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
				className: "text-sm font-semibold",
				children: titre
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 31,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: () => {
					navigator.clipboard.writeText(texte);
					toast.success("Copié dans le presse-papiers.");
				},
				className: "h-7 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "size-3.5" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 36,
					columnNumber: 11
				}, this), " Copier"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 32,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 30,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "whitespace-pre-wrap text-[13.5px] leading-relaxed text-muted-foreground",
			children: texte
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 39,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 29,
		columnNumber: 10
	}, this);
}
function LinkedinPage() {
	const { user, authLoading, items } = useCandidatures();
	const profil = useProfil(user);
	const [cibleId, setCibleId] = (0, import_react.useState)("aucune");
	const [consigne, setConsigne] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [res, setRes] = (0, import_react.useState)(null);
	const generer = async () => {
		if (!profil) {
			toast.error("Complétez d'abord votre profil.");
			return;
		}
		const cible = items.find((c) => c.id === cibleId) ?? null;
		setLoading(true);
		try {
			const r = await genererLinkedin({ data: {
				profil: profilEnTexte(profil),
				offre: cible ? offreEnTexte(cible) : "",
				consigne
			} });
			setRes({
				invitation: r.invitation ?? "",
				messageSuivi: r.messageSuivi ?? "",
				accrocheProfil: r.accrocheProfil ?? "",
				conseils: r.conseils ?? []
			});
			toast.success("Messages LinkedIn générés !");
		} catch (e) {
			toast.error(texteErreurIA(e));
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		eyebrow: "Careerly AI Hub",
		title: "LinkedIn Assistant",
		subtitle: "Invitations réseau, messages d'approche et accroche de profil",
		headerExtra: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			asChild: true,
			variant: "outline",
			size: "sm",
			className: "h-8 gap-1.5 rounded-xl border-border/70 text-xs text-muted-foreground hover:text-foreground",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/assistant",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-3.5" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 85,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Retour AI Hub" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 86,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 84,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 83,
			columnNumber: 159
		}, this),
		actions: authLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-5 animate-spin opacity-70" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 88,
			columnNumber: 43
		}, this) : null,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AiContextCard, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 90,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-4 lg:grid-cols-[1fr_1.2fr]",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
					className: "glass-card pop-in p-5 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2 text-primary font-semibold text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Linkedin, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 95,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Paramètres de génération" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 96,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 94,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "mb-1.5 block text-xs font-semibold text-foreground",
							children: "Offre ciblée (optionnel) :"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 100,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
							value: cibleId,
							onValueChange: setCibleId,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
								className: "rounded-xl",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "Général (sans offre spécifique)" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 105,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 104,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
								value: "aucune",
								children: "Général (sans offre spécifique)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 108,
								columnNumber: 19
							}, this), items.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
								value: c.id,
								children: [
									c.entreprise,
									" — ",
									c.poste
								]
							}, c.id, true, {
								fileName: _jsxFileName,
								lineNumber: 111,
								columnNumber: 35
							}, this))] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 107,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 103,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 99,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "mb-1.5 block text-xs font-semibold text-foreground",
							children: "Consigne spécifique ou ton souhaité :"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 119,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
							value: consigne,
							onChange: (e) => setConsigne(e.target.value),
							placeholder: "Ex: Ton chaleureux, prise de contact auprès d'un alumni de mon école...",
							className: "min-h-[100px] rounded-xl text-xs"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 122,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 118,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							onClick: generer,
							disabled: loading || !profil,
							className: "w-full gap-2 rounded-xl bg-primary text-xs font-semibold text-primary-foreground shadow-sm",
							children: loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 127,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Rédaction en cours..." }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 128,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 126,
								columnNumber: 26
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 130,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Générer mes messages LinkedIn" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 131,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 129,
								columnNumber: 23
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 125,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 93,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
					className: "space-y-3",
					children: res ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bloc, {
							titre: "Note d'invitation (< 300 caractères)",
							texte: res.invitation
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 138,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bloc, {
							titre: "Message de suivi / InMail",
							texte: res.messageSuivi
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 139,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bloc, {
							titre: "Accroche pour votre profil LinkedIn",
							texte: res.accrocheProfil
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 140,
							columnNumber: 17
						}, this),
						res.conseils.length > 0 && /* @__PURE__ */ (void 0)("div", {
							className: "rounded-2xl border border-primary/20 bg-card/60 p-4",
							children: [/* @__PURE__ */ (void 0)("h3", {
								className: "mb-2 text-xs font-semibold text-primary",
								children: "Conseils de conversion"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 142,
								columnNumber: 21
							}, this), /* @__PURE__ */ (void 0)("ul", {
								className: "space-y-1.5 text-xs text-muted-foreground",
								children: res.conseils.map((c, i) => /* @__PURE__ */ (void 0)("li", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ (void 0)("span", { className: "mt-1 size-1.5 rounded-full bg-primary shrink-0" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 147,
										columnNumber: 27
									}, this), /* @__PURE__ */ (void 0)("span", { children: c }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 148,
										columnNumber: 27
									}, this)]
								}, i, true, {
									fileName: _jsxFileName,
									lineNumber: 146,
									columnNumber: 51
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 145,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 141,
							columnNumber: 45
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 137,
						columnNumber: 20
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "glass-card p-10 text-center text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Linkedin, { className: "mx-auto size-8 text-muted-foreground/50 mb-2" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 153,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "font-medium text-foreground",
								children: "Aucun message généré pour le moment."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 154,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1",
								children: "Configurez vos options à gauche et cliquez sur \"Générer\"."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 157,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 152,
						columnNumber: 21
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 136,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 92,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 89,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 83,
		columnNumber: 10
	}, this);
}
//#endregion
export { LinkedinPage as component };

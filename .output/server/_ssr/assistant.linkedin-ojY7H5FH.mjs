import { a as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { U as Linkedin, V as LoaderCircle, Vt as ArrowLeft, _t as Copy, v as Sparkles } from "../_libs/lucide-react.mjs";
import { d as Textarea, dt as Button } from "./router-arR9ITmX.mjs";
import { t as AppShell } from "./AppShell-BYQcXmkR.mjs";
import { t as useProfil } from "./useProfil-CxU2OF5C.mjs";
import { t as AiContextCard } from "./AiContextCard-BSYnBw2n.mjs";
import { t as useCandidatures } from "./useCandidatures-CEqfC4kv.mjs";
import { c as texteErreurIA, o as offreEnTexte, s as profilEnTexte } from "./match-run-DMUqzz67.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DUy71i1r.mjs";
import { r as genererLinkedin } from "./redaction.functions-BKJl7GR7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assistant.linkedin-ojY7H5FH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Bloc({ titre, texte }) {
	if (!texte) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border/60 bg-card/60 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-semibold",
				children: titre
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: () => {
					navigator.clipboard.writeText(texte);
					toast.success("Copié dans le presse-papiers.");
				},
				className: "h-7 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), " Copier"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "whitespace-pre-wrap text-[13.5px] leading-relaxed text-muted-foreground",
			children: texte
		})]
	});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		eyebrow: "NACORA AI Hub",
		title: "LinkedIn Assistant",
		subtitle: "Invitations réseau, messages d'approche et accroche de profil",
		headerExtra: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "outline",
			size: "sm",
			className: "h-8 gap-1.5 rounded-xl border-border/70 text-xs text-muted-foreground hover:text-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/assistant",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Retour AI Hub" })]
			})
		}),
		actions: authLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin opacity-70" }) : null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiContextCard, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-[1fr_1.2fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "glass-card pop-in p-5 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-primary font-semibold text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Paramètres de génération" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-semibold text-foreground",
							children: "Offre ciblée (optionnel) :"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: cibleId,
							onValueChange: setCibleId,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "rounded-xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Général (sans offre spécifique)" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "aucune",
								children: "Général (sans offre spécifique)"
							}), items.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: c.id,
								children: [
									c.entreprise,
									" — ",
									c.poste
								]
							}, c.id))] })]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-semibold text-foreground",
							children: "Consigne spécifique ou ton souhaité :"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: consigne,
							onChange: (e) => setConsigne(e.target.value),
							placeholder: "Ex: Ton chaleureux, prise de contact auprès d'un alumni de mon école...",
							className: "min-h-[100px] rounded-xl text-xs"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: generer,
							disabled: loading || !profil,
							className: "w-full gap-2 rounded-xl bg-primary text-xs font-semibold text-primary-foreground shadow-sm",
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Rédaction en cours..." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Générer mes messages LinkedIn" })] })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "space-y-3",
					children: res ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bloc, {
							titre: "Note d'invitation (< 300 caractères)",
							texte: res.invitation
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bloc, {
							titre: "Message de suivi / InMail",
							texte: res.messageSuivi
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bloc, {
							titre: "Accroche pour votre profil LinkedIn",
							texte: res.accrocheProfil
						}),
						res.conseils.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-primary/20 bg-card/60 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-2 text-xs font-semibold text-primary",
								children: "Conseils de conversion"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-1.5 text-xs text-muted-foreground",
								children: res.conseils.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1 size-1.5 rounded-full bg-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c })]
								}, i))
							})]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-card p-10 text-center text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "mx-auto size-8 text-muted-foreground/50 mb-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-foreground",
								children: "Aucun message généré pour le moment."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1",
								children: "Configurez vos options à gauche et cliquez sur \"Générer\"."
							})
						]
					})
				})]
			})]
		})
	});
}
//#endregion
export { LinkedinPage as component };

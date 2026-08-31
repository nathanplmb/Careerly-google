import { a as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { B as LoaderCircle, H as Linkedin, _ as Sparkles, lt as Copy } from "../_libs/lucide-react.mjs";
import { j as Button } from "./router-AVT1AZP0.mjs";
import { t as AppShell } from "./AppShell-BmQ9z9SM.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { t as useCandidatures } from "./useCandidatures-CQvAyOlk.mjs";
import { t as texteErreurIA } from "./ai-erreurs-B0Gxtc15.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DUy71i1r.mjs";
import { t as useProfil } from "./useProfil-BCVXrGCS.mjs";
import { r as genererLinkedin } from "./redaction.functions-J5-2VERv.mjs";
import { o as offreEnTexte, s as profilEnTexte } from "./match-run-DeALWp7w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assistant.linkedin-T40OhEYn.js
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
					toast.success("Copié.");
				},
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
		} catch (e) {
			toast.error(texteErreurIA(e));
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		eyebrow: "AI Studio",
		title: "LinkedIn Assistant",
		subtitle: "Invitations, messages de suivi et accroche de profil",
		actions: authLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin opacity-70" }) : null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[1fr_1.15fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-card pop-in flex flex-col gap-4 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: "Offre ciblée (facultatif)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: cibleId,
						onValueChange: setCibleId,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "aucune",
							children: "Aucune offre"
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
						className: "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: "Consigne complémentaire"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: consigne,
						onChange: (e) => setConsigne(e.target.value),
						rows: 5,
						placeholder: "Ex : je contacte un ancien élève de mon école, ton un peu plus direct."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => void generer(),
						disabled: loading || !profil,
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), " Génération…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {}), " Générer mes messages"] })
					}),
					!profil && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Renseignez d'abord",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/profil",
								className: "text-primary hover:underline",
								children: "votre profil"
							}),
							"."
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [!res && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "glass-card p-8 text-center text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "mx-auto mb-3 size-6 text-primary" }), "Vos messages LinkedIn générés apparaîtront ici."]
				}), res && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pop-in flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bloc, {
							titre: "Note d'invitation",
							texte: res.invitation
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bloc, {
							titre: "Message après acceptation",
							texte: res.messageSuivi
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bloc, {
							titre: "Accroche de profil",
							texte: res.accrocheProfil
						}),
						res.conseils.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border/60 bg-card/60 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-2 text-sm font-semibold",
								children: "Conseils"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "list-disc pl-5 text-[13.5px] text-muted-foreground",
								children: res.conseils.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: c }, i))
							})]
						})
					]
				})]
			})]
		})
	});
}
//#endregion
export { LinkedinPage as component };

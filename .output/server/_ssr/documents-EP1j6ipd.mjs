import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { Z as FileText, _ as Sparkles, f as Trash2, it as Copy, z as LoaderCircle } from "../_libs/lucide-react.mjs";
import { j as Button } from "./router-WcHZLW5p.mjs";
import { t as AppShell } from "./AppShell-CtCpxTdT.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { t as useCandidatures } from "./useCandidatures-hl-bBqH6.mjs";
import { t as texteErreurIA } from "./ai-erreurs-B0Gxtc15.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DUy71i1r.mjs";
import { t as useProfil } from "./useProfil-DVAoJvSn.mjs";
import { n as genererLettre } from "./redaction.functions-C3tBqTW2.mjs";
import { o as offreEnTexte, s as profilEnTexte } from "./match-run-r33f9orm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/documents-EP1j6ipd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		eyebrow: "AI Studio",
		title: "Documents",
		subtitle: `${lettres.length} lettre(s) de motivation enregistrée(s)`,
		actions: authLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin opacity-70" }) : null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[1fr_1.2fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-card pop-in flex h-fit flex-col gap-4 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Nouvelle lettre de motivation"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: "Offre visée"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: cibleId,
						onValueChange: setCibleId,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choisir une offre" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "aucune",
							children: "Lettre générique"
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
						placeholder: "Ex : insister sur mon projet professionnel et ma disponibilité."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => void generer(),
						disabled: loading || !profil,
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), " Rédaction…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {}), " Générer la lettre"] })
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
							" ",
							"(ou importez votre CV) pour une lettre pertinente."
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [lettres.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "glass-card p-8 text-center text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mx-auto mb-3 size-6 text-primary" }), "Aucune lettre pour l'instant."]
				}), lettres.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "glass-card pop-in p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "min-w-0 flex-1 text-left",
							onClick: () => setOuverte(ouverte === l.id ? null : l.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "truncate text-[14px] font-semibold",
								children: l.titre
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: l.objet || new Date(l.creeLe).toLocaleDateString("fr-FR")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => {
									navigator.clipboard.writeText(l.contenu);
									toast.success("Lettre copiée.");
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => persister(lettres.filter((x) => x.id !== l.id)),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
							})]
						})]
					}), ouverte === l.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 border-t border-border/60 pt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whitespace-pre-wrap text-[13.5px] leading-relaxed text-muted-foreground",
							children: l.contenu
						}), l.conseils.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 list-disc pl-5 text-xs text-muted-foreground",
							children: l.conseils.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: c }, i))
						})]
					})]
				}, l.id))]
			})]
		})
	});
}
//#endregion
export { DocumentsPage as component };

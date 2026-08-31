import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { T as RefreshCw, _ as Sparkles, z as LoaderCircle } from "../_libs/lucide-react.mjs";
import { j as Button } from "./router-WcHZLW5p.mjs";
import { t as AppShell } from "./AppShell-CtCpxTdT.mjs";
import { t as useCandidatures } from "./useCandidatures-hl-bBqH6.mjs";
import { t as texteErreurIA } from "./ai-erreurs-B0Gxtc15.mjs";
import { t as useProfil } from "./useProfil-DVAoJvSn.mjs";
import { a as offreAnalysable, i as niveauMatch, n as lancerAnalyse, r as matchObsolete } from "./match-run-r33f9orm.mjs";
import { t as MatchBadge } from "./MatchBadge-CPAhh90R.mjs";
import { t as MatchPanel } from "./MatchPanel-BjJzoGw-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assistant.match-BYf7QWkK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MatchPage() {
	const { user, authLoading, items, patch } = useCandidatures();
	const profil = useProfil(user);
	const [selection, setSelection] = (0, import_react.useState)(null);
	const [enCours, setEnCours] = (0, import_react.useState)(null);
	const [erreur, setErreur] = (0, import_react.useState)(null);
	const [maj, setMaj] = (0, import_react.useState)(null);
	const classement = (0, import_react.useMemo)(() => [...items].sort((a, b) => (b.match?.global ?? -1) - (a.match?.global ?? -1)), [items]);
	const courant = classement.find((c) => c.id === selection) ?? classement[0] ?? null;
	const moyenne = (0, import_react.useMemo)(() => {
		const s = items.map((c) => c.match?.global).filter((v) => !!v);
		return s.length ? Math.round(s.reduce((a, b) => a + b, 0) / s.length) : 0;
	}, [items]);
	const analyser = async (c) => {
		if (!profil) {
			setErreur("Complétez d'abord votre profil.");
			return;
		}
		if (!offreAnalysable(c)) {
			setErreur("Ajoutez le détail de l'offre avant de lancer l'analyse.");
			return;
		}
		setErreur(null);
		setEnCours(c.id);
		try {
			const match = await lancerAnalyse(c, profil);
			patch(c.id, { match });
		} catch (e) {
			setErreur(texteErreurIA(e));
		} finally {
			setEnCours(null);
		}
	};
	const toutAnalyser = async () => {
		if (!profil || maj) return;
		const cibles = items.filter((c) => offreAnalysable(c) && (!c.match || matchObsolete(c, profil)));
		if (!cibles.length) {
			toast.info("Tous les matchs IA sont à jour.");
			return;
		}
		setMaj({
			fait: 0,
			total: cibles.length
		});
		let erreurs = 0;
		let message = "";
		for (const [i, c] of cibles.entries()) {
			try {
				const match = await lancerAnalyse(c, profil);
				patch(c.id, { match });
			} catch (e) {
				erreurs += 1;
				message = texteErreurIA(e);
				if (/crédit|quota|limite|connectez-vous|indisponible|désactiv/i.test(message)) break;
			}
			setMaj({
				fait: i + 1,
				total: cibles.length
			});
		}
		setMaj(null);
		if (erreurs) toast.warning(message || `${erreurs} analyse(s) en échec.`);
		else toast.success("Matchs IA à jour.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		eyebrow: "AI Studio",
		title: "Match IA",
		subtitle: `Score moyen ${moyenne}% sur ${items.length} opportunité(s)`,
		actions: authLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin opacity-70" }) : null,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				disabled: !!maj || !profil,
				onClick: () => void toutAnalyser(),
				children: maj ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }),
					" ",
					maj.fait,
					"/",
					maj.total
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {}), " Actualiser tous les matchs"] })
			}), !profil && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: [
					"Complétez d'abord",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/profil",
						className: "text-primary hover:underline",
						children: "votre profil"
					}),
					" ",
					"pour activer le moteur de correspondance."
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 [&>*]:min-w-0 lg:grid-cols-[1fr_1.1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-card pop-in p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 px-1 text-sm font-semibold",
						children: "Classement des offres"
					}),
					classement.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-8 text-center text-sm text-muted-foreground",
						children: "Aucune opportunité à analyser."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-1.5",
						children: classement.map((c, i) => {
							const score = c.match?.global;
							const n = typeof score === "number" ? niveauMatch(score) : null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSelection(c.id),
								className: `flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition-colors ${courant?.id === c.id ? "border-primary/50 bg-primary/10" : "border-border/60 bg-card/50 hover:bg-accent/40"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-5 shrink-0 text-xs text-muted-foreground",
										children: i + 1
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate text-[13.5px] font-medium",
											children: c.entreprise || "Sans entreprise"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate text-xs text-muted-foreground",
											children: c.poste
										})]
									}),
									enCours === c.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 shrink-0 animate-spin text-primary" }) : c.match ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchBadge, {
										match: c.match,
										obsolete: matchObsolete(c, profil)
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex shrink-0 items-center gap-1 text-[11px] text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), " non analysé"]
									}),
									n && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sr-only",
										children: n.label
									})
								]
							}) }, c.id);
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "pop-in",
				children: courant ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchPanel, {
					match: courant.match,
					obsolete: matchObsolete(courant, profil),
					loading: enCours === courant.id,
					erreur,
					profilPret: !!profil,
					offrePrete: offreAnalysable(courant),
					onAnalyser: () => void analyser(courant),
					candidature: courant
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "glass-card p-8 text-center text-sm text-muted-foreground",
					children: "Sélectionnez une offre pour voir l'analyse détaillée."
				})
			})]
		})]
	});
}
//#endregion
export { MatchPage as component };

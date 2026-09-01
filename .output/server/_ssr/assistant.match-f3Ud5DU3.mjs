import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-DDzEUEFj.mjs";
import { D as RefreshCw, Ot as ChevronRight, Ut as ArrowLeft, V as LoaderCircle, v as Sparkles } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-JIGp6MTc.mjs";
import { t as texteErreurIA } from "./ai-erreurs-B0Gxtc15.mjs";
import { a as offreAnalysable, i as niveauMatch, n as lancerAnalyse, r as matchObsolete } from "./match-run-Bhrc1Shm.mjs";
import { t as MatchPanel } from "./MatchPanel-BHcj29Y-.mjs";
import { t as useProfil } from "./useProfil-Vc3u7mk3.mjs";
import { t as AiContextCard } from "./AiContextCard-CXXVsso6.mjs";
import { t as useCandidatures } from "./useCandidatures-Cqc_s9SU.mjs";
import { t as MatchBadge } from "./MatchBadge-BKWoPVE-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assistant.match-f3Ud5DU3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/assistant.match.tsx?tsr-split=component";
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		eyebrow: "NACORA AI Hub",
		title: "Match IA & Compatibilité",
		subtitle: `Score moyen de ${moyenne}% sur ${items.length} opportunité(s)`,
		headerExtra: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			asChild: true,
			variant: "outline",
			size: "sm",
			className: "h-8 gap-1.5 rounded-xl border-border/70 text-xs text-muted-foreground hover:text-foreground",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/assistant",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-3.5" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 92,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Retour AI Hub" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 93,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 91,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 90,
			columnNumber: 165
		}, this),
		actions: authLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-5 animate-spin opacity-70" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 95,
			columnNumber: 43
		}, this) : null,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AiContextCard, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 98,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "secondary",
						disabled: !!maj || !profil,
						onClick: () => void toutAnalyser(),
						className: "h-9 gap-2 rounded-xl text-xs font-semibold shadow-sm",
						children: maj ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-3.5 animate-spin" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 104,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
							"Actualisation ",
							maj.fait,
							"/",
							maj.total
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 105,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 103,
							columnNumber: 20
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 109,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
							"Actualiser tous les matchs (",
							items.length,
							")"
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 110,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 108,
							columnNumber: 21
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 102,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						asChild: true,
						variant: "ghost",
						size: "sm",
						className: "h-8 gap-1.5 text-xs text-primary hover:text-primary/80",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/assistant",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Lancer le Workflow complet" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 116,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 117,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 115,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 114,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 101,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-4 [&>*]:min-w-0 lg:grid-cols-[1fr_1.1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
						className: "glass-card pop-in p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "mb-3 px-1 text-sm font-semibold",
								children: [
									"Classement des offres (",
									classement.length,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 125,
								columnNumber: 13
							}, this),
							classement.length === 0 && /* @__PURE__ */ (void 0)("p", {
								className: "py-8 text-center text-sm text-muted-foreground",
								children: "Aucune opportunité à analyser. Ajoutez des candidatures depuis l'onglet Candidatures ou l'AI Hub."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 128,
								columnNumber: 41
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
								className: "flex flex-col gap-1.5",
								children: classement.map((c, i) => {
									const score = c.match?.global;
									const n = typeof score === "number" ? niveauMatch(score) : null;
									return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setSelection(c.id),
										className: `flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition-colors ${courant?.id === c.id ? "border-primary/50 bg-primary/10" : "border-border/60 bg-card/50 hover:bg-accent/40"}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "w-5 shrink-0 text-xs text-muted-foreground font-semibold",
												children: i + 1
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 138,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "min-w-0 flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "block truncate text-[13.5px] font-medium",
													children: c.entreprise || "Sans entreprise"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 142,
													columnNumber: 25
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "block truncate text-xs text-muted-foreground",
													children: c.poste
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 145,
													columnNumber: 25
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 141,
												columnNumber: 23
											}, this),
											enCours === c.id ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 shrink-0 animate-spin text-primary" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 149,
												columnNumber: 43
											}, this) : c.match ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MatchBadge, {
												match: c.match,
												obsolete: matchObsolete(c, profil)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 149,
												columnNumber: 121
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "inline-flex shrink-0 items-center gap-1 text-[11px] text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 150,
													columnNumber: 27
												}, this), " non analysé"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 149,
												columnNumber: 190
											}, this),
											n && /* @__PURE__ */ (void 0)("span", {
												className: "sr-only",
												children: n.label
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 152,
												columnNumber: 29
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 137,
										columnNumber: 21
									}, this) }, c.id, false, {
										fileName: _jsxFileName,
										lineNumber: 136,
										columnNumber: 22
									}, this);
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 132,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 124,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
						className: "pop-in",
						children: courant ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MatchPanel, {
							match: courant.match,
							obsolete: matchObsolete(courant, profil),
							loading: enCours === courant.id,
							erreur,
							profilPret: !!profil,
							offrePrete: offreAnalysable(courant),
							onAnalyser: () => void analyser(courant),
							candidature: courant
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 160,
							columnNumber: 24
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "glass-card p-8 text-center text-sm text-muted-foreground",
							children: "Sélectionnez une offre pour voir l'analyse détaillée."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 160,
							columnNumber: 278
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 159,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 123,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 96,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 90,
		columnNumber: 10
	}, this);
}
//#endregion
export { MatchPage as component };

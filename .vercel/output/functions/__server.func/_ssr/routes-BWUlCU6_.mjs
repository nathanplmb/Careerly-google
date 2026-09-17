import { o as __toESM } from "../_runtime.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as supabase } from "./client-6jjz1ame.mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Plus, B as LogOut, Bt as CalendarClock, D as RefreshCw, Et as Circle, Ht as Building2, It as Calendar, Jt as ArrowLeft, Lt as CalendarX, Ot as CircleCheck, Pt as Check, Rt as CalendarPlus, S as Settings, U as LoaderCircle, V as LogIn, Wt as Bot, a as Users, ct as FingerprintPattern, d as Upload, g as Sparkles, gt as Ellipsis, jt as ChevronRight, l as UserPlus, lt as FileText, m as Trash2, mt as ExternalLink, o as User, qt as ArrowRight, u as UserCheck, wt as Clock, xt as Copy, z as Mail } from "../_libs/lucide-react.mjs";
import { a as Label2, c as Root2, d as SubTrigger2, f as Trigger, i as ItemIndicator2, l as Separator2, n as Content2, o as Portal2, r as Item2, s as RadioItem2, t as CheckboxItem2, u as SubContent2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import "../_libs/firebase.mjs";
import { f as signOut } from "../_libs/firebase__auth.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-GF5R-Jcs.mjs";
import { E as addDays, I as todayIso, S as CenterModal, _ as AlertDialogDescription, b as AlertDialogTitle, f as useProfil, g as AlertDialogContent, h as AlertDialogCancel, k as formatDate, l as useCandidatures, m as AlertDialogAction, p as AlertDialog, v as AlertDialogFooter, x as CandidatureSheet, y as AlertDialogHeader } from "./router-D-SxcmZd.mjs";
import { r as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { C as isFirebaseConfigured, F as setCompteActif, G as Button, W as Input, b as getCompteActif, c as Label, i as Textarea, l as AppShell, m as auth, q as cn } from "./router-D-SxcmZd2.mjs";
import { a as verifyBiometric, i as enableBiometric, n as biometricSupported, r as disableBiometric, t as biometricEnabled } from "./biometric-CT0UcaTm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BWUlCU6_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$6 = "/app/applet/src/components/ui/dropdown-menu.tsx";
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "ml-auto" }, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 37,
		columnNumber: 5
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName$6,
	lineNumber: 27,
	columnNumber: 3
}, void 0));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$6,
	lineNumber: 47,
	columnNumber: 3
}, void 0));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$6,
	lineNumber: 64,
	columnNumber: 5
}, void 0) }, void 0, false, {
	fileName: _jsxFileName$6,
	lineNumber: 63,
	columnNumber: 3
}, void 0));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$6,
	lineNumber: 84,
	columnNumber: 3
}, void 0));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-4 w-4" }, void 0, false, {
			fileName: _jsxFileName$6,
			lineNumber: 110,
			columnNumber: 9
		}, void 0) }, void 0, false, {
			fileName: _jsxFileName$6,
			lineNumber: 109,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 108,
		columnNumber: 5
	}, void 0), children]
}, void 0, true, {
	fileName: _jsxFileName$6,
	lineNumber: 100,
	columnNumber: 3
}, void 0));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Circle, { className: "h-2 w-2 fill-current" }, void 0, false, {
			fileName: _jsxFileName$6,
			lineNumber: 133,
			columnNumber: 9
		}, void 0) }, void 0, false, {
			fileName: _jsxFileName$6,
			lineNumber: 132,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 131,
		columnNumber: 5
	}, void 0), children]
}, void 0, true, {
	fileName: _jsxFileName$6,
	lineNumber: 123,
	columnNumber: 3
}, void 0));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$6,
	lineNumber: 147,
	columnNumber: 3
}, void 0));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$6,
	lineNumber: 163,
	columnNumber: 3
}, void 0));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 176,
		columnNumber: 5
	}, void 0);
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
/**
* Nettoyage et raccourcissement des intitulés de postes pour le Daily Brief.
* Supprime les mentions redondantes (ex: "(H/F)", "- Stage...", "- CDI...", durées).
*/
function simplifyJobTitle(title) {
	if (!title) return "";
	let clean = title.trim();
	clean = clean.replace(/\s*\([HhFfMmXx/+\s-]+\)/g, "");
	clean = clean.replace(/\s*\[[HhFfMmXx/+\s-]+\]/g, "");
	clean = clean.replace(/\s*[-–—|/]\s*(stage|internship|intern|cdd|cdi|alternance|apprentissage|graduate program|full-?time|part-?time|remote|paris|france|h\/f|f\/h|h\/f\/x)[\s\S]*$/i, "");
	clean = clean.replace(/\s*\((?:stage|internship|cdd|cdi|alternance|apprentissage|durée|\d+\s*mois)[\s\S]*?\)/i, "");
	clean = clean.replace(/\s*[-–—|/]\s*\d+[\s\S]*$/i, "");
	clean = clean.trim();
	if (clean.length > 34) clean = clean.slice(0, 34).trim() + "…";
	return clean || title.trim();
}
/**
* Calcul déterministe de la différence en jours entre deux dates ISO (YYYY-MM-DD).
* Renvoie target - current (ex: si target = demain, diff = 1).
*/
function calculateDaysDiff(current, target) {
	if (!target) return null;
	const c = /* @__PURE__ */ new Date(current.slice(0, 10) + "T00:00:00");
	const t = /* @__PURE__ */ new Date(target.slice(0, 10) + "T00:00:00");
	if (isNaN(c.getTime()) || isNaN(t.getTime())) return null;
	const diffTime = t.getTime() - c.getTime();
	return Math.round(diffTime / 864e5);
}
/**
* Moteur déterministe pour le Daily Brief de NACORA.
*
* Principes stricts de la secrétaire de carrière :
* 1. 1 à 3 actions maximum (jamais de remplissage artificiel).
* 2. Nom de l'entreprise prioritaire + poste court simplifié.
* 3. Ton humain, concis, direct et professionnel.
* 4. Une action principale claire + menu d'actions secondaires contextuelles.
* 5. Zéro information inventée.
*/
function generateDeterministicDailyBrief(input, isFallback = false) {
	const { userPrenom, currentDate, opportunities, calendarEvents = [] } = input;
	const greeting = userPrenom ? `Bonjour ${userPrenom}.` : "Bonjour.";
	const candidates = [];
	const closedStatuses = [
		"Refus",
		"Refusée",
		"Sans suite",
		"Offre refusée",
		"Archive"
	];
	const activeStatuses = [
		"Sauvegardée",
		"À préparer",
		"À étudier",
		"À candidater",
		"Candidature envoyée",
		"Relancée",
		"Entretien",
		"Deuxième entretien",
		"Offre reçue"
	];
	for (const opp of opportunities) {
		if (opp.archive) continue;
		const company = (opp.entreprise || "Opportunité").trim();
		const shortRole = simplifyJobTitle(opp.poste || opp.titre);
		const deadline = opp.applicationDeadline || opp.dateLimite;
		const relance = opp.followUpDate || opp.dateRelance;
		const entretien = opp.interviewDate || opp.secondInterviewDate;
		const isClosed = closedStatuses.includes(opp.statut);
		const isActive = activeStatuses.includes(opp.statut);
		const contactName = opp.contactNom?.trim() || "";
		const hasContact = Boolean(opp.hasContact || contactName);
		const isApplied = opp.statut === "Candidature envoyée" || opp.statut === "Relancée" || opp.statut === "Entretien" || opp.statut === "Deuxième entretien" || opp.statut === "Offre reçue";
		const isReadyToSend = opp.statut === "À candidater" || Boolean(opp.preparedAt);
		if (entretien && isActive) {
			const diff = calculateDaysDiff(currentDate, entretien);
			if (diff === 0) {
				const primaryAction = {
					id: "PREPARE_APPLICATION",
					label: "Préparer l'entretien →",
					variant: "default"
				};
				const secondaryActions = [
					{
						id: "VIEW_NOTES",
						label: "Voir mes notes"
					},
					{
						id: "OPEN_CALENDAR",
						label: "Voir dans l'agenda"
					},
					{
						id: "VIEW_OPPORTUNITY",
						label: "Voir la candidature"
					},
					{
						id: "OPEN_COMPANY",
						label: "Voir l'entreprise"
					}
				];
				candidates.push({
					id: `entretien-${opp.id}`,
					opportunityId: opp.id,
					type: "entretien",
					category: "entretien",
					categoryLabel: "ENTRETIEN",
					title: company,
					company,
					shortRole,
					date: entretien,
					dateContext: "Aujourd'hui",
					priority: "high",
					message: "Votre entretien a lieu aujourd'hui.",
					reason: "Entretien prévu aujourd'hui",
					primaryAction,
					secondaryActions,
					recommendedActions: [primaryAction, ...secondaryActions],
					actionLabel: primaryAction.label,
					actionType: "prepare",
					score: 125
				});
			} else if (diff === 1) {
				const primaryAction = {
					id: "PREPARE_APPLICATION",
					label: "Préparer l'entretien →",
					variant: "default"
				};
				const secondaryActions = [
					{
						id: "VIEW_NOTES",
						label: "Voir mes notes"
					},
					{
						id: "OPEN_CALENDAR",
						label: "Voir dans l'agenda"
					},
					{
						id: "VIEW_OPPORTUNITY",
						label: "Voir la candidature"
					},
					{
						id: "OPEN_COMPANY",
						label: "Voir l'entreprise"
					}
				];
				candidates.push({
					id: `entretien-demain-${opp.id}`,
					opportunityId: opp.id,
					type: "entretien",
					category: "entretien",
					categoryLabel: "ENTRETIEN",
					title: company,
					company,
					shortRole,
					date: entretien,
					dateContext: "Demain",
					priority: "high",
					message: "Votre entretien est demain.",
					reason: "Entretien prévu demain",
					primaryAction,
					secondaryActions,
					recommendedActions: [primaryAction, ...secondaryActions],
					actionLabel: primaryAction.label,
					actionType: "prepare",
					score: 115
				});
			} else if (diff !== null && diff >= 2 && diff <= 4) {
				const primaryAction = {
					id: "PREPARE_APPLICATION",
					label: "Préparer l'entretien →",
					variant: "default"
				};
				const secondaryActions = [
					{
						id: "VIEW_NOTES",
						label: "Voir mes notes"
					},
					{
						id: "OPEN_CALENDAR",
						label: "Voir dans l'agenda"
					},
					{
						id: "VIEW_OPPORTUNITY",
						label: "Voir la candidature"
					},
					{
						id: "OPEN_COMPANY",
						label: "Voir l'entreprise"
					}
				];
				candidates.push({
					id: `entretien-proche-${opp.id}`,
					opportunityId: opp.id,
					type: "entretien",
					category: "entretien",
					categoryLabel: "ENTRETIEN",
					title: company,
					company,
					shortRole,
					date: entretien,
					dateContext: `Dans ${diff} jours`,
					priority: "high",
					message: "Votre entretien approche.",
					reason: `Entretien prévu dans ${diff} jours`,
					primaryAction,
					secondaryActions,
					recommendedActions: [primaryAction, ...secondaryActions],
					actionLabel: primaryAction.label,
					actionType: "prepare",
					score: 95
				});
			}
		}
		if (deadline && !isClosed && !isApplied) {
			const diff = calculateDaysDiff(currentDate, deadline);
			if (diff === 0) {
				const primaryAction = isReadyToSend ? {
					id: "APPLY_NOW",
					label: `Postuler chez ${company} →`,
					variant: "default"
				} : {
					id: "PREPARE_APPLICATION",
					label: "Finaliser ma candidature →",
					variant: "default"
				};
				const secondaryActions = [
					{
						id: "DEADLINE_EXTEND_7",
						label: "+7 jours"
					},
					{
						id: "DEADLINE_EXTEND_14",
						label: "+14 jours"
					},
					{
						id: "UPDATE_DEADLINE",
						label: "Modifier la date"
					},
					{
						id: "DEADLINE_REMOVE",
						label: "Supprimer la deadline"
					},
					{
						id: "VIEW_OPPORTUNITY",
						label: "Voir l'offre"
					}
				];
				candidates.push({
					id: `deadline-today-${opp.id}`,
					opportunityId: opp.id,
					type: "deadline",
					category: "urgent",
					categoryLabel: "DEADLINE",
					title: company,
					company,
					shortRole,
					date: deadline,
					dateContext: "Aujourd'hui",
					priority: "high",
					message: "La deadline est aujourd'hui.",
					reason: "Date limite aujourd'hui non transmise",
					primaryAction,
					secondaryActions,
					recommendedActions: [primaryAction, ...secondaryActions],
					actionLabel: primaryAction.label,
					actionType: isReadyToSend ? "view_opportunity" : "prepare",
					score: 118
				});
			} else if (diff === 1) {
				const primaryAction = isReadyToSend ? {
					id: "APPLY_NOW",
					label: `Postuler chez ${company} →`,
					variant: "default"
				} : {
					id: "PREPARE_APPLICATION",
					label: "Finaliser ma candidature →",
					variant: "default"
				};
				const secondaryActions = [
					{
						id: "DEADLINE_EXTEND_7",
						label: "+7 jours"
					},
					{
						id: "DEADLINE_EXTEND_14",
						label: "+14 jours"
					},
					{
						id: "UPDATE_DEADLINE",
						label: "Modifier la date"
					},
					{
						id: "DEADLINE_REMOVE",
						label: "Supprimer la deadline"
					},
					{
						id: "VIEW_OPPORTUNITY",
						label: "Voir l'offre"
					}
				];
				candidates.push({
					id: `deadline-demain-${opp.id}`,
					opportunityId: opp.id,
					type: "deadline",
					category: "urgent",
					categoryLabel: "DEADLINE",
					title: company,
					company,
					shortRole,
					date: deadline,
					dateContext: "Demain",
					priority: "high",
					message: "La deadline est demain.",
					reason: "Date limite demain non transmise",
					primaryAction,
					secondaryActions,
					recommendedActions: [primaryAction, ...secondaryActions],
					actionLabel: primaryAction.label,
					actionType: isReadyToSend ? "view_opportunity" : "prepare",
					score: 104
				});
			} else if (diff !== null && diff >= 2 && diff <= 3) {
				const primaryAction = {
					id: "PREPARE_APPLICATION",
					label: "Finaliser ma candidature →",
					variant: "default"
				};
				const secondaryActions = [
					{
						id: "DEADLINE_EXTEND_7",
						label: "+7 jours"
					},
					{
						id: "DEADLINE_EXTEND_14",
						label: "+14 jours"
					},
					{
						id: "UPDATE_DEADLINE",
						label: "Modifier la date"
					},
					{
						id: "DEADLINE_REMOVE",
						label: "Supprimer la deadline"
					},
					{
						id: "VIEW_OPPORTUNITY",
						label: "Voir l'offre"
					}
				];
				candidates.push({
					id: `deadline-urgent-${opp.id}`,
					opportunityId: opp.id,
					type: "deadline",
					category: "urgent",
					categoryLabel: "DEADLINE",
					title: company,
					company,
					shortRole,
					date: deadline,
					dateContext: `Dans ${diff} jours`,
					priority: "high",
					message: "La deadline approche.",
					reason: `Date limite dans ${diff} jours`,
					primaryAction,
					secondaryActions,
					recommendedActions: [primaryAction, ...secondaryActions],
					actionLabel: primaryAction.label,
					actionType: "prepare",
					score: 91 - diff
				});
			} else if (diff !== null && diff < 0 && isActive) {
				const primaryAction = {
					id: "UPDATE_DEADLINE",
					label: "Mettre à jour la deadline →",
					variant: "default"
				};
				const secondaryActions = [
					{
						id: "DEADLINE_EXTEND_7",
						label: "+7 jours"
					},
					{
						id: "DEADLINE_EXTEND_14",
						label: "+14 jours"
					},
					{
						id: "UPDATE_DEADLINE",
						label: "Modifier la date"
					},
					{
						id: "DEADLINE_REMOVE",
						label: "Supprimer la deadline"
					},
					{
						id: "VIEW_OPPORTUNITY",
						label: "Voir l'offre"
					}
				];
				candidates.push({
					id: `deadline-expired-${opp.id}`,
					opportunityId: opp.id,
					type: "deadline",
					category: "decision",
					categoryLabel: "DEADLINE",
					title: company,
					company,
					shortRole,
					date: deadline,
					dateContext: "Échue",
					priority: "high",
					message: "Cette offre est arrivée à échéance.",
					reason: "Date limite dépassée sans candidature transmise",
					primaryAction,
					secondaryActions,
					recommendedActions: [primaryAction, ...secondaryActions],
					actionLabel: primaryAction.label,
					actionType: "update_deadline",
					score: 93
				});
			}
		}
		if (opp.statut === "Offre reçue" && !candidates.some((t) => t.opportunityId === opp.id)) {
			const primaryAction = {
				id: "VIEW_OPPORTUNITY",
				label: "Analyser la proposition →",
				variant: "default"
			};
			const secondaryActions = [{
				id: "VIEW_NOTES",
				label: "Voir mes notes"
			}, {
				id: "OPEN_COMPANY",
				label: "Voir l'entreprise"
			}];
			candidates.push({
				id: `offer-${opp.id}`,
				opportunityId: opp.id,
				type: "opportunite",
				category: "decision",
				categoryLabel: "PROPOSITION",
				title: company,
				company,
				shortRole,
				date: null,
				dateContext: "Offre reçue",
				priority: "high",
				message: "Proposition reçue. Analysez les conditions.",
				reason: "Proposition d'embauche reçue",
				primaryAction,
				secondaryActions,
				recommendedActions: [primaryAction, ...secondaryActions],
				actionLabel: primaryAction.label,
				actionType: "view_opportunity",
				score: 96
			});
		}
		if ((opp.statut === "Candidature envoyée" || opp.statut === "Relancée") && !candidates.some((t) => t.opportunityId === opp.id)) {
			if (relance) {
				if (!(opp.statut === "Relancée" && (opp.dateRelance === currentDate || opp.followUpDate === currentDate))) {
					const diff = calculateDaysDiff(currentDate, relance);
					if (diff === 0) {
						const primaryAction = {
							id: "GENERATE_EMAIL",
							label: "Préparer la relance →",
							variant: "default"
						};
						const secondaryActions = [
							{
								id: "GENERATE_EMAIL",
								label: "Générer l'email"
							},
							...hasContact ? [{
								id: "OPEN_CONTACT",
								label: "Voir le contact"
							}] : [],
							{
								id: "OPEN_COMPANY",
								label: "Voir l'entreprise"
							},
							{
								id: "PLAN_TOMORROW",
								label: "Planifier"
							},
							{
								id: "MARK_FOLLOW_UP",
								label: "Marquer comme relancée"
							}
						];
						candidates.push({
							id: `relance-today-${opp.id}`,
							opportunityId: opp.id,
							type: "relance",
							category: "relance",
							categoryLabel: "RELANCE",
							title: company,
							company,
							shortRole,
							date: relance,
							dateContext: "Aujourd'hui",
							priority: "high",
							message: "Votre relance est programmée aujourd'hui.",
							reason: "Relance programmée pour aujourd'hui",
							primaryAction,
							secondaryActions,
							recommendedActions: [primaryAction, ...secondaryActions],
							actionLabel: primaryAction.label,
							actionType: "follow_up",
							score: 94
						});
					} else if (diff !== null && diff < 0) {
						const retard = Math.abs(diff);
						const primaryAction = {
							id: "GENERATE_EMAIL",
							label: "Préparer la relance →",
							variant: "default"
						};
						const secondaryActions = [
							{
								id: "GENERATE_EMAIL",
								label: "Générer l'email"
							},
							...hasContact ? [{
								id: "OPEN_CONTACT",
								label: "Voir le contact"
							}] : [],
							{
								id: "OPEN_COMPANY",
								label: "Voir l'entreprise"
							},
							{
								id: "PLAN_TOMORROW",
								label: "Planifier"
							},
							{
								id: "MARK_FOLLOW_UP",
								label: "Marquer comme relancée"
							}
						];
						candidates.push({
							id: `relance-retard-${opp.id}`,
							opportunityId: opp.id,
							type: "relance",
							category: "relance",
							categoryLabel: "RELANCE",
							title: company,
							company,
							shortRole,
							date: relance,
							dateContext: `Il y a ${retard} jours`,
							priority: "high",
							message: "Vous n'avez pas encore reçu de réponse.",
							reason: `Relance en retard de ${retard} jours`,
							primaryAction,
							secondaryActions,
							recommendedActions: [primaryAction, ...secondaryActions],
							actionLabel: primaryAction.label,
							actionType: "follow_up",
							score: 90
						});
					}
				}
			} else if (opp.statut === "Candidature envoyée" && opp.appliedAt) {
				const diffApplied = calculateDaysDiff(opp.appliedAt, currentDate);
				if (diffApplied !== null && diffApplied >= 7) {
					const timeStr = `${diffApplied} jours`;
					const primaryAction = {
						id: "GENERATE_EMAIL",
						label: "Préparer la relance →",
						variant: "default"
					};
					const secondaryActions = [
						{
							id: "GENERATE_EMAIL",
							label: "Générer l'email"
						},
						...hasContact ? [{
							id: "OPEN_CONTACT",
							label: "Voir le contact"
						}] : [],
						{
							id: "OPEN_COMPANY",
							label: "Voir l'entreprise"
						},
						{
							id: "PLAN_TOMORROW",
							label: "Planifier"
						},
						{
							id: "MARK_FOLLOW_UP",
							label: "Marquer comme relancée"
						}
					];
					candidates.push({
						id: `relance-suggest-${opp.id}`,
						opportunityId: opp.id,
						type: "relance",
						category: "relance",
						categoryLabel: "RELANCE",
						title: company,
						company,
						shortRole,
						date: opp.appliedAt,
						dateContext: `Il y a ${timeStr}`,
						priority: "medium",
						message: "Toujours pas de réponse reçue.",
						reason: "Candidature envoyée depuis 7+ jours sans relance",
						primaryAction,
						secondaryActions,
						recommendedActions: [primaryAction, ...secondaryActions],
						actionLabel: primaryAction.label,
						actionType: "follow_up",
						score: 86
					});
				}
			}
		}
		if ((opp.statut === "À candidater" || opp.isPrepared) && !isApplied && !candidates.some((t) => t.opportunityId === opp.id)) {
			const primaryAction = {
				id: "APPLY_NOW",
				label: `Postuler chez ${company} →`,
				variant: "default"
			};
			const secondaryActions = [
				{
					id: "VIEW_OPPORTUNITY",
					label: "Voir l'offre"
				},
				{
					id: "OPEN_COMPANY",
					label: "Ouvrir l'entreprise"
				},
				{
					id: "UPDATE_DEADLINE",
					label: "Modifier la deadline"
				},
				{
					id: "VIEW_NOTES",
					label: "Voir les notes"
				},
				{
					id: "PLAN_TOMORROW",
					label: "Planifier"
				},
				{
					id: "PLAN_LATER",
					label: "Reporter"
				}
			];
			const readyIndex = candidates.filter((c) => c.id.startsWith("ready-")).length;
			const readyMessages = [
				"Votre candidature est prête à partir.",
				"Votre dossier est prêt.",
				"Tout est prêt pour l'envoi."
			];
			candidates.push({
				id: `ready-${opp.id}`,
				opportunityId: opp.id,
				type: "preparation",
				category: "action",
				categoryLabel: "CANDIDATURE",
				title: company,
				company,
				shortRole,
				date: null,
				dateContext: "Dossier prêt",
				priority: "high",
				message: readyMessages[readyIndex % readyMessages.length],
				reason: "Candidature préparée prête à l'envoi",
				primaryAction,
				secondaryActions,
				recommendedActions: [primaryAction, ...secondaryActions],
				actionLabel: primaryAction.label,
				actionType: "view_opportunity",
				score: 82
			});
		}
		if (opp.statut === "À étudier" && !candidates.some((t) => t.opportunityId === opp.id)) {
			const primaryAction = {
				id: "ANALYZE_OFFER",
				label: "Analyser l'offre →",
				variant: "default"
			};
			const secondaryActions = [
				{
					id: "VIEW_OPPORTUNITY",
					label: "Voir l'offre"
				},
				{
					id: "OPEN_COMPANY",
					label: "Voir l'entreprise"
				},
				{
					id: "PREPARE_APPLICATION",
					label: "Préparer la candidature"
				},
				{
					id: "PLAN_LATER",
					label: "Planifier pour plus tard"
				}
			];
			candidates.push({
				id: `study-${opp.id}`,
				opportunityId: opp.id,
				type: "opportunite",
				category: "action",
				categoryLabel: "OPPORTUNITÉ",
				title: company,
				company,
				shortRole,
				date: null,
				dateContext: "À étudier",
				priority: "medium",
				message: "Cette opportunité est à étudier.",
				reason: "Opportunité en phase d'étude",
				primaryAction,
				secondaryActions,
				recommendedActions: [primaryAction, ...secondaryActions],
				actionLabel: primaryAction.label,
				actionType: "analyze",
				score: 77
			});
		}
		if (opp.statut === "À préparer" && !candidates.some((t) => t.opportunityId === opp.id)) {
			const primaryAction = {
				id: "PREPARE_APPLICATION",
				label: "Préparer la candidature →",
				variant: "default"
			};
			const secondaryActions = [
				{
					id: "VIEW_OPPORTUNITY",
					label: "Voir l'offre"
				},
				{
					id: "OPEN_COMPANY",
					label: "Ouvrir l'entreprise"
				},
				{
					id: "UPDATE_DEADLINE",
					label: "Modifier la deadline"
				},
				{
					id: "VIEW_NOTES",
					label: "Voir les notes"
				},
				{
					id: "PLAN_TOMORROW",
					label: "Planifier"
				},
				{
					id: "PLAN_LATER",
					label: "Reporter"
				}
			];
			const prepIndex = candidates.filter((c) => c.id.startsWith("prep-")).length;
			const prepMessages = [
				"Votre candidature est à préparer.",
				"Votre dossier est prêt à finaliser.",
				"Cette opportunité attend vos arguments."
			];
			candidates.push({
				id: `prep-${opp.id}`,
				opportunityId: opp.id,
				type: "preparation",
				category: "action",
				categoryLabel: "CANDIDATURE",
				title: company,
				company,
				shortRole,
				date: null,
				dateContext: "À préparer",
				priority: "medium",
				message: prepMessages[prepIndex % prepMessages.length],
				reason: "Préparation en cours à finaliser",
				primaryAction,
				secondaryActions,
				recommendedActions: [primaryAction, ...secondaryActions],
				actionLabel: primaryAction.label,
				actionType: "prepare",
				score: opp.hasArguments ? 76 : 75
			});
		}
		if (opp.statut === "Sauvegardée" && !candidates.some((t) => t.opportunityId === opp.id)) {
			const diffSaved = opp.savedAt ? calculateDaysDiff(opp.savedAt, currentDate) : null;
			const isStalled = diffSaved !== null && diffSaved >= 4;
			const primaryAction = {
				id: "PREPARE_APPLICATION",
				label: "Préparer la candidature →",
				variant: "default"
			};
			const secondaryActions = [
				{
					id: "VIEW_OPPORTUNITY",
					label: "Voir l'offre"
				},
				{
					id: "ANALYZE_OFFER",
					label: "Analyser l'offre"
				},
				{
					id: "OPEN_COMPANY",
					label: "Voir l'entreprise"
				},
				{
					id: "PLAN_LATER",
					label: "Planifier pour plus tard"
				}
			];
			const savedIndex = candidates.filter((c) => c.id.startsWith("saved-")).length;
			const savedMessages = [
				"Cette offre vient d'être ajoutée.",
				"Cette opportunité attend d'être préparée.",
				"Offre enregistrée dans vos opportunités."
			];
			candidates.push({
				id: `saved-${opp.id}`,
				opportunityId: opp.id,
				type: "opportunite",
				category: "action",
				categoryLabel: "OPPORTUNITÉ",
				title: company,
				company,
				shortRole,
				date: null,
				dateContext: isStalled ? `Ajoutée il y a ${diffSaved} j` : "Enregistrée",
				priority: isStalled ? "medium" : "low",
				message: isStalled ? "Cette opportunité attend d'être préparée." : savedMessages[savedIndex % savedMessages.length],
				reason: isStalled ? "Opportunité en sommeil" : "Opportunité récemment sauvegardée",
				primaryAction,
				secondaryActions,
				recommendedActions: [primaryAction, ...secondaryActions],
				actionLabel: primaryAction.label,
				actionType: "prepare",
				score: isStalled ? 65 : 55
			});
		}
	}
	for (const ev of calendarEvents) {
		const diff = calculateDaysDiff(currentDate, ev.date);
		if ((diff === 0 || diff === 1) && !candidates.some((t) => t.date === ev.date && t.title.includes(ev.titre))) {
			const isToday = diff === 0;
			const comp = ev.entreprise || ev.titre;
			const primaryAction = {
				id: "OPEN_CALENDAR",
				label: "Voir dans l'agenda →",
				variant: "default"
			};
			candidates.push({
				id: `cal-${ev.date}-${ev.titre}`,
				opportunityId: ev.opportunityId || null,
				type: "entretien",
				category: "entretien",
				categoryLabel: "CALENDRIER",
				title: comp,
				company: comp,
				shortRole: null,
				date: ev.date,
				dateContext: isToday ? "Aujourd'hui" : "Demain",
				priority: "high",
				message: `${ev.type || "Événement"} prévu ${isToday ? "aujourd'hui" : "demain"}.`,
				reason: `Événement agenda ${isToday ? "aujourd'hui" : "demain"}`,
				primaryAction,
				secondaryActions: [],
				recommendedActions: [primaryAction],
				actionLabel: primaryAction.label,
				actionType: "view_calendar",
				score: isToday ? 105 : 97
			});
		}
	}
	const sortedToday = candidates.sort((a, b) => {
		if (b.score !== a.score) return b.score - a.score;
		if (a.date && b.date) return a.date.localeCompare(b.date);
		if (a.date) return -1;
		if (b.date) return 1;
		return a.company.localeCompare(b.company);
	}).slice(0, 3).map(({ score: _, ...item }) => item);
	const count = sortedToday.length;
	let summary = "";
	if (count === 0) summary = "Tout est à jour. Aucune action urgente pour le moment.";
	else if (count === 1) summary = "Une action mérite votre attention aujourd'hui.";
	else if (count === 2) summary = "2 actions nécessitent votre attention.";
	else summary = "3 actions nécessitent votre attention.";
	return {
		greeting,
		summary,
		today: sortedToday,
		watch: [],
		upcoming: [],
		recent: [],
		generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		isFallback
	};
}
var _jsxFileName$5 = "/app/applet/src/components/DailyBrief.tsx";
/**
* Palette sémantique sobre et élégante (accents subtils par catégorie) :
* - CANDIDATURE : Violet (border, dot, badge, action directe)
* - RELANCE : Bleu (border, dot, badge, action directe)
* - ENTRETIEN : Orange / Ambre (border, dot, badge, action directe)
* - DEADLINE : Rouge / Rose (border, dot, badge, action directe)
* - OPPORTUNITÉ : Vert (border, dot, badge, action directe)
*/
function getCategoryVisuals(item) {
	const rawCat = (item.category || "").toLowerCase();
	const type = (item.type || "").toLowerCase();
	if (rawCat === "urgent" || type === "deadline") return {
		label: item.categoryLabel || "DEADLINE",
		labelClass: "text-rose-400 font-semibold tracking-wider",
		dotClass: "bg-rose-500",
		borderAccentClass: "border-l-rose-500/80",
		ctaClass: "bg-rose-500/15 text-rose-200 hover:bg-rose-500/25 border-rose-500/35"
	};
	if (rawCat === "entretien" || type === "entretien") return {
		label: item.categoryLabel || "ENTRETIEN",
		labelClass: "text-amber-400 font-semibold tracking-wider",
		dotClass: "bg-amber-500",
		borderAccentClass: "border-l-amber-500/80",
		ctaClass: "bg-amber-500/15 text-amber-200 hover:bg-amber-500/25 border-amber-500/35"
	};
	if (rawCat === "relance" || type === "relance") return {
		label: item.categoryLabel || "RELANCE",
		labelClass: "text-sky-400 font-semibold tracking-wider",
		dotClass: "bg-sky-500",
		borderAccentClass: "border-l-sky-500/80",
		ctaClass: "bg-sky-500/15 text-sky-200 hover:bg-sky-500/25 border-sky-500/35"
	};
	if (rawCat === "decision") return {
		label: item.categoryLabel || "DÉCISION",
		labelClass: "text-amber-400 font-semibold tracking-wider",
		dotClass: "bg-amber-500",
		borderAccentClass: "border-l-amber-500/80",
		ctaClass: "bg-amber-500/15 text-amber-200 hover:bg-amber-500/25 border-amber-500/35"
	};
	if (type === "opportunite" || item.categoryLabel === "OPPORTUNITÉ") return {
		label: item.categoryLabel || "OPPORTUNITÉ",
		labelClass: "text-emerald-400 font-semibold tracking-wider",
		dotClass: "bg-emerald-500",
		borderAccentClass: "border-l-emerald-500/80",
		ctaClass: "bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25 border-emerald-500/35"
	};
	return {
		label: item.categoryLabel || "CANDIDATURE",
		labelClass: "text-purple-400 font-semibold tracking-wider",
		dotClass: "bg-purple-500",
		borderAccentClass: "border-l-purple-500/80",
		ctaClass: "bg-purple-500/15 text-purple-200 hover:bg-purple-500/25 border-purple-500/35"
	};
}
/**
* Hiérarchie d'affichage propre : Entreprise · Rôle court ou contexte temporel
* Exemples :
* - JobTeaser · AI Growth Ops
* - Theodo FinTech · demain à 14h
* - L'Oréal · il y a 8 jours
* - Decathlon · dans 2 jours
*/
function getActionHeadline(item, company, shortRole) {
	const type = (item.type || "").toLowerCase();
	const rawCat = (item.category || "").toLowerCase();
	if (type === "relance" || rawCat === "relance") return {
		company,
		detail: item.dateContext ? item.dateContext.toLowerCase() : shortRole || void 0
	};
	if (type === "entretien" || rawCat === "entretien") return {
		company,
		detail: item.dateContext ? item.dateContext.toLowerCase() : shortRole || void 0
	};
	if (type === "deadline" || rawCat === "urgent") return {
		company,
		detail: item.dateContext ? item.dateContext.toLowerCase() : shortRole || void 0
	};
	return {
		company,
		detail: shortRole || void 0
	};
}
/**
* Génération du sous-titre dynamique et contextuel pour le Daily Brief.
*/
function getDynamicSubtitle(actions) {
	const count = actions.length;
	if (count === 0) return "Rien d'urgent aujourd'hui.";
	const deadlines = actions.filter((a) => a.type === "deadline");
	const entretiens = actions.filter((a) => a.type === "entretien");
	const relances = actions.filter((a) => a.type === "relance");
	const candidatures = actions.filter((a) => a.type === "preparation");
	if (count === 1) {
		if (entretiens.length === 1) {
			const e = entretiens[0];
			if (e.dateContext === "Aujourd'hui") return "Votre entretien a lieu aujourd'hui.";
			if (e.dateContext === "Demain") return "Votre entretien approche demain.";
			return "Une préparation d'entretien mérite votre attention.";
		}
		if (deadlines.length === 1) {
			const d = deadlines[0];
			if (d.dateContext === "Échue") return "Une date limite est arrivée à échéance.";
			if (d.dateContext === "Aujourd'hui" || d.dateContext === "Demain") return "Une échéance approche à grands pas.";
			return "Une échéance approche.";
		}
		if (relances.length === 1) return "Une relance mérite d'être effectuée.";
		if (candidatures.length === 1) {
			if (candidatures[0].dateContext === "Dossier prêt") return "Votre candidature est prête à partir.";
			return "Une chose mérite votre attention aujourd'hui.";
		}
		return "Une chose mérite votre attention aujourd'hui.";
	}
	if (count === 2) {
		if (deadlines.length === 2) return "2 échéances approchent.";
		if (entretiens.length >= 1 && deadlines.length >= 1) return "Un entretien et une échéance nécessitent votre attention.";
		if (relances.length === 2) return "2 relances sont à effectuer.";
		return "2 actions nécessitent votre attention.";
	}
	if (deadlines.length >= 2) return "Plusieurs échéances approchent.";
	return "3 actions nécessitent votre attention.";
}
function getActionIcon(actionId) {
	switch (actionId) {
		case "GENERATE_EMAIL": return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "size-3.5" }, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 289,
			columnNumber: 14
		}, this);
		case "OPEN_CONTACT": return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, { className: "size-3.5" }, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 291,
			columnNumber: 14
		}, this);
		case "OPEN_COMPANY": return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Building2, { className: "size-3.5" }, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 293,
			columnNumber: 14
		}, this);
		case "OPEN_CALENDAR": return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Calendar, { className: "size-3.5" }, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 295,
			columnNumber: 14
		}, this);
		case "VIEW_OPPORTUNITY":
		case "APPLY_NOW": return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "size-3.5" }, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 298,
			columnNumber: 14
		}, this);
		case "VIEW_NOTES":
		case "ANALYZE_OFFER": return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { className: "size-3.5" }, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 301,
			columnNumber: 14
		}, this);
		case "DEADLINE_EXTEND_7":
		case "DEADLINE_EXTEND_14": return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CalendarPlus, { className: "size-3.5" }, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 304,
			columnNumber: 14
		}, this);
		case "DEADLINE_REMOVE": return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CalendarX, { className: "size-3.5" }, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 306,
			columnNumber: 14
		}, this);
		case "UPDATE_DEADLINE":
		case "VERIFY_DEADLINE":
		case "PLAN_TOMORROW":
		case "PLAN_LATER": return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "size-3.5" }, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 311,
			columnNumber: 14
		}, this);
		case "KEEP_OPPORTUNITY":
		case "MARK_APPLIED":
		case "MARK_FOLLOW_UP": return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-3.5" }, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 315,
			columnNumber: 14
		}, this);
		case "DELETE_OPPORTUNITY": return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-3.5" }, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 317,
			columnNumber: 14
		}, this);
		case "PREPARE_APPLICATION":
		case "CONTINUE_APPLICATION":
		case "PREPARE_INTERVIEW": return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5" }, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 321,
			columnNumber: 14
		}, this);
		default: return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-3.5" }, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 323,
			columnNumber: 14
		}, this);
	}
}
function DailyBrief({ items, userPrenom, onOuvrir, onPatch, onRemove, ready = true }) {
	const navigate = useNavigate();
	const [isRefreshing, setIsRefreshing] = (0, import_react.useState)(false);
	const [refreshTrigger, setRefreshTrigger] = (0, import_react.useState)(0);
	const [deadlineModalItem, setDeadlineModalItem] = (0, import_react.useState)(null);
	const [newDeadlineValue, setNewDeadlineValue] = (0, import_react.useState)("");
	const [deleteCandidate, setDeleteCandidate] = (0, import_react.useState)(null);
	const [emailModalData, setEmailModalData] = (0, import_react.useState)(null);
	const inputData = (0, import_react.useMemo)(() => {
		return {
			userPrenom,
			currentDate: todayIso(),
			opportunities: items.map((c) => ({
				id: c.id,
				entreprise: c.entreprise || c.company || c.companyName || "",
				poste: c.poste || c.title || "",
				statut: c.statut || "Sauvegardée",
				lieu: c.lieu || c.location || void 0,
				lien: c.lien || null,
				applicationDeadline: c.applicationDeadline || c.dateLimite || null,
				dateLimite: c.dateLimite || c.applicationDeadline || null,
				appliedAt: c.appliedAt || c.dateEnvoi || null,
				dateEnvoi: c.dateEnvoi || c.appliedAt || null,
				followUpDate: c.followUpDate || c.dateRelance || null,
				dateRelance: c.dateRelance || c.followUpDate || null,
				lastContactDate: c.lastContactDate || c.dateDernierContact || null,
				interviewDate: c.interviewDate || null,
				secondInterviewDate: c.secondInterviewDate || null,
				currentWorkflowStep: c.currentWorkflowStep || null,
				savedAt: c.savedAt || null,
				preparedAt: c.preparedAt || null,
				offerReceivedAt: c.offerReceivedAt || null,
				acceptedAt: c.acceptedAt || null,
				rejectedAt: c.rejectedAt || null,
				notes: c.commentaire || c.personalNotes || null,
				hasArguments: Boolean(c.preparation?.pourquoiEntreprise?.trim() || c.preparation?.pourquoiPoste?.trim() || c.preparation?.notes?.trim()),
				isPrepared: Boolean(c.preparedAt) || Boolean(c.preparation?.pourquoiEntreprise?.trim()) && Boolean(c.preparation?.pourquoiPoste?.trim()),
				hasContact: Boolean(c.contact || c.contactNom || c.contactEmail),
				contactNom: c.contactNom || (c.contact && !c.contact.includes("@") && !c.contact.startsWith("http") ? c.contact : void 0),
				contactEmail: c.contactEmail || (c.contact && c.contact.includes("@") ? c.contact : void 0),
				archive: Boolean(c.archive)
			}))
		};
	}, [
		items,
		userPrenom,
		refreshTrigger
	]);
	const brief = (0, import_react.useMemo)(() => {
		return generateDeterministicDailyBrief(inputData);
	}, [inputData]);
	const handleManualRefresh = () => {
		setIsRefreshing(true);
		setRefreshTrigger((prev) => prev + 1);
		setTimeout(() => {
			setIsRefreshing(false);
			toast.success("Actions actualisées.");
		}, 220);
	};
	const handleExecuteAction = (actionId, item) => {
		const cand = item.opportunityId ? items.find((c) => c.id === item.opportunityId) : null;
		switch (actionId) {
			case "VIEW_OPPORTUNITY":
			case "ANALYZE_OFFER":
				if (cand && onOuvrir) onOuvrir(cand, "offre");
				else navigate({ to: "/opportunites" });
				break;
			case "APPLY_NOW":
				if (cand && onPatch) {
					const now = todayIso();
					if (cand.lien && cand.lien.trim().startsWith("http")) window.open(cand.lien, "_blank", "noopener,noreferrer");
					onPatch(cand.id, {
						statut: "Candidature envoyée",
						dateEnvoi: now,
						appliedAt: now
					});
					toast.success(`Candidature envoyée pour ${cand.entreprise}.`);
				} else if (cand && onOuvrir) onOuvrir(cand, "workflow");
				else navigate({ to: "/opportunites" });
				break;
			case "PREPARE_APPLICATION":
			case "CONTINUE_APPLICATION":
			case "PREPARE_INTERVIEW":
				if (cand && onOuvrir) onOuvrir(cand, "workflow");
				else navigate({ to: "/opportunites" });
				break;
			case "VIEW_NOTES":
				if (cand && onOuvrir) onOuvrir(cand, "profil");
				else navigate({ to: "/opportunites" });
				break;
			case "PLAN_FOLLOW_UP":
				if (cand && onOuvrir) onOuvrir(cand, "workflow");
				else navigate({ to: "/opportunites" });
				break;
			case "GENERATE_EMAIL":
				if (cand) setEmailModalData({
					cand,
					item
				});
				else toast.error("Opportunité introuvable.");
				break;
			case "DEADLINE_EXTEND_7":
				if (cand && onPatch) {
					const base = cand.dateLimite || cand.applicationDeadline || todayIso();
					const nextDate = addDays(base, 7);
					onPatch(cand.id, {
						dateLimite: nextDate,
						applicationDeadline: nextDate
					});
					toast.success(`Date limite prolongée au ${formatDate(nextDate)} pour ${cand.entreprise}.`);
				}
				break;
			case "DEADLINE_EXTEND_14":
				if (cand && onPatch) {
					const base = cand.dateLimite || cand.applicationDeadline || todayIso();
					const nextDate = addDays(base, 14);
					onPatch(cand.id, {
						dateLimite: nextDate,
						applicationDeadline: nextDate
					});
					toast.success(`Date limite prolongée au ${formatDate(nextDate)} pour ${cand.entreprise}.`);
				}
				break;
			case "DEADLINE_REMOVE":
			case "KEEP_OPPORTUNITY":
				if (cand && onPatch) {
					onPatch(cand.id, {
						dateLimite: "",
						applicationDeadline: ""
					});
					toast.success(`Date limite supprimée pour ${cand.entreprise}.`);
				}
				break;
			case "UPDATE_DEADLINE":
			case "VERIFY_DEADLINE":
				if (cand) {
					setDeadlineModalItem(cand);
					setNewDeadlineValue(cand.dateLimite || cand.applicationDeadline || todayIso());
				} else navigate({ to: "/opportunites" });
				break;
			case "DELETE_OPPORTUNITY":
				if (cand) setDeleteCandidate(cand);
				break;
			case "MARK_APPLIED":
				if (cand && onPatch) {
					const now = todayIso();
					onPatch(cand.id, {
						statut: "Candidature envoyée",
						dateEnvoi: now,
						appliedAt: now
					});
					toast.success(`Candidature marquée comme envoyée pour ${cand.entreprise}.`);
				}
				break;
			case "MARK_FOLLOW_UP":
				if (cand && onPatch) {
					const now = todayIso();
					onPatch(cand.id, {
						statut: "Relancée",
						dateRelance: now,
						followUpDate: now
					});
					toast.success(`Candidature marquée comme relancée auprès de ${cand.entreprise}.`);
				}
				break;
			case "PLAN_TOMORROW":
				if (cand && onPatch) {
					const demain = addDays(todayIso(), 1);
					onPatch(cand.id, {
						followUpDate: demain,
						dateRelance: demain
					});
					toast.success(`Rappel programmé pour demain pour ${cand.entreprise}.`);
				}
				break;
			case "PLAN_LATER":
				if (cand && onPatch) {
					const dans3j = addDays(todayIso(), 3);
					onPatch(cand.id, {
						followUpDate: dans3j,
						dateRelance: dans3j
					});
					toast.success(`Rappel programmé dans 3 jours pour ${cand.entreprise}.`);
				}
				break;
			case "OPEN_CONTACT":
				navigate({ to: "/contacts" });
				break;
			case "OPEN_COMPANY":
				if (cand && onOuvrir) onOuvrir(cand, "entreprise");
				else navigate({ to: "/entreprises" });
				break;
			case "OPEN_CALENDAR":
				navigate({ to: "/calendrier" });
				break;
			default: if (cand && onOuvrir) onOuvrir(cand, "offre");
			else navigate({ to: "/opportunites" });
		}
	};
	const handleSaveNewDeadline = () => {
		if (deadlineModalItem && onPatch) {
			onPatch(deadlineModalItem.id, {
				dateLimite: newDeadlineValue,
				applicationDeadline: newDeadlineValue
			});
			toast.success(newDeadlineValue ? `Date limite mise à jour pour ${deadlineModalItem.entreprise}.` : `Date limite supprimée pour ${deadlineModalItem.entreprise}.`);
			setDeadlineModalItem(null);
		}
	};
	const handleConfirmDelete = () => {
		if (deleteCandidate && onRemove) {
			onRemove(deleteCandidate.id);
			toast.success(`Opportunité ${deleteCandidate.entreprise} supprimée.`);
			setDeleteCandidate(null);
		}
	};
	const handleCopyEmail = (subject, body) => {
		const fullText = `Objet : ${subject}\n\n${body}`;
		navigator.clipboard.writeText(fullText);
		toast.success("Email copié dans le presse-papier !");
	};
	const handleMarkFollowUpSent = () => {
		if (emailModalData && onPatch) {
			const now = todayIso();
			onPatch(emailModalData.cand.id, {
				statut: "Relancée",
				dateRelance: now,
				followUpDate: now
			});
			toast.success(`Candidature marquée comme relancée auprès de ${emailModalData.cand.entreprise}.`);
			setEmailModalData(null);
		}
	};
	if (!ready) return null;
	const actions = brief.today.slice(0, 3);
	const totalActions = actions.length;
	getDynamicSubtitle(actions);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			id: "daily-brief-module",
			className: "rounded-xl border border-border/30 bg-card/25 p-5 sm:p-6 transition-all",
			suppressHydrationWarning: true,
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
				className: "flex items-start justify-between gap-4 pb-4 border-b border-border/25",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-base sm:text-lg font-semibold tracking-tight text-foreground",
					children: "À faire aujourd'hui"
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 694,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-0.5 text-xs sm:text-sm text-muted-foreground font-normal",
					children: totalActions === 0 ? "Tout est à jour." : totalActions === 1 ? "1 action nécessite votre attention." : `${totalActions} actions nécessitent votre attention.`
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 697,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 693,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					id: "daily-brief-refresh-button",
					variant: "ghost",
					size: "sm",
					disabled: isRefreshing,
					onClick: handleManualRefresh,
					className: "h-8 gap-1.5 px-2.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent/40 rounded-lg transition-colors shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: cn("size-3.5", isRefreshing && "animate-spin text-primary") }, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 714,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Actualiser" }, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 720,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 706,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 692,
				columnNumber: 9
			}, this), totalActions === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				id: "daily-brief-empty-state",
				className: "py-10 text-center flex flex-col items-center justify-center gap-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 731,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Tout est à jour" }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 732,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 730,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs sm:text-sm text-muted-foreground max-w-sm font-normal",
						children: "Aucune action urgente pour le moment."
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 734,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						id: "daily-brief-see-opportunities",
						size: "sm",
						variant: "outline",
						onClick: () => navigate({ to: "/opportunites" }),
						className: "mt-2 h-8 px-3 text-xs font-medium rounded-lg gap-1.5 border-border/60 hover:bg-accent/40",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Voir mes opportunités" }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 744,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-3" }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 745,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 737,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 726,
				columnNumber: 11
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				id: "daily-brief-actions-list",
				className: "divide-y divide-border/25",
				children: actions.map((item) => {
					const cand = item.opportunityId ? items.find((c) => c.id === item.opportunityId) : null;
					const displayCompany = cand?.entreprise || item.company || "Entreprise";
					const shortRole = item.shortRole || simplifyJobTitle(cand?.poste || cand?.title || null);
					const visuals = getCategoryVisuals(item);
					const headline = getActionHeadline(item, displayCompany, shortRole);
					const primaryAction = item.primaryAction || item.recommendedActions[0] || {
						id: "VIEW_OPPORTUNITY",
						label: item.actionLabel || "Agir →"
					};
					const secondaryActions = (item.secondaryActions && item.secondaryActions.length > 0 ? item.secondaryActions : item.recommendedActions.slice(1)).filter((sec) => sec.id !== primaryAction.id);
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
						id: `daily-brief-action-${item.id}`,
						className: cn("py-5 first:pt-4 last:pb-2 border-l-2 pl-4 flex flex-col gap-2 transition-colors", visuals.borderAccentClass),
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em]",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: cn("size-2 rounded-full shrink-0", visuals.dotClass) }, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 793,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: visuals.labelClass,
									children: visuals.label
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 799,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 792,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-wrap items-baseline gap-x-2 gap-y-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "text-base sm:text-[17px] font-semibold tracking-tight text-foreground",
									children: headline.company
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 804,
									columnNumber: 21
								}, this), headline.detail && /* @__PURE__ */ (void 0)("span", {
									className: "text-xs sm:text-sm text-muted-foreground/85 font-normal",
									children: ["· ", headline.detail]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 808,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 803,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs sm:text-[13.5px] text-muted-foreground font-normal leading-relaxed",
								children: item.message
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 815,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "pt-1 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									size: "sm",
									onClick: () => handleExecuteAction(primaryAction.id, item),
									className: cn("h-8.5 px-3.5 text-xs font-medium gap-1.5 rounded-lg border transition-colors shadow-xs", visuals.ctaClass),
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: primaryAction.label }, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 831,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 821,
									columnNumber: 21
								}, this), secondaryActions.length > 0 && /* @__PURE__ */ (void 0)(DropdownMenu, { children: [/* @__PURE__ */ (void 0)(DropdownMenuTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (void 0)(Button, {
										size: "sm",
										variant: "outline",
										className: "h-8.5 w-8.5 p-0 rounded-lg border-border/50 text-muted-foreground hover:text-foreground hover:bg-accent/40",
										"aria-label": "Actions secondaires",
										children: /* @__PURE__ */ (void 0)(Ellipsis, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 843,
											columnNumber: 29
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 837,
										columnNumber: 27
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 836,
									columnNumber: 25
								}, this), /* @__PURE__ */ (void 0)(DropdownMenuContent, {
									align: "start",
									className: "w-52 rounded-xl border border-border/60 bg-popover/95 p-1 backdrop-blur-md shadow-lg",
									children: secondaryActions.map((sec, sIdx) => /* @__PURE__ */ (void 0)(DropdownMenuItem, {
										onClick: () => handleExecuteAction(sec.id, item),
										className: cn("flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium cursor-pointer rounded-lg hover:bg-accent/50", sec.variant === "destructive" && "text-rose-500 focus:text-rose-500 focus:bg-rose-500/10"),
										children: [getActionIcon(sec.id), /* @__PURE__ */ (void 0)("span", { children: sec.label }, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 861,
											columnNumber: 31
										}, this)]
									}, `${sec.id}-${sIdx}`, true, {
										fileName: _jsxFileName$5,
										lineNumber: 851,
										columnNumber: 29
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 846,
									columnNumber: 25
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 835,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 820,
								columnNumber: 19
							}, this)
						]
					}, item.id, true, {
						fileName: _jsxFileName$5,
						lineNumber: 783,
						columnNumber: 17
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 750,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$5,
			lineNumber: 686,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
			open: Boolean(emailModalData),
			onOpenChange: (open) => {
				if (!open) setEmailModalData(null);
			},
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
				className: "max-w-lg",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "size-4 text-sky-500" }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 885,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Assistant Email — Relance" }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 886,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 884,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, { children: [
						"Modèle d'email personnalisé prêt à l'emploi pour",
						" ",
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: emailModalData?.cand.entreprise }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 890,
							columnNumber: 15
						}, this),
						"."
					] }, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 888,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 883,
						columnNumber: 11
					}, this),
					emailModalData && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-3.5 py-2",
						children: (() => {
							const c = emailModalData.cand;
							const contactPrenom = c.contactNom ? c.contactNom.split(" ")[0] : "";
							const dateEnvStr = c.dateEnvoi ? formatDate(c.dateEnvoi) : "";
							const subject = `Relance candidature — ${c.poste || "Candidature"} — ${userPrenom || ""}`.trim();
							const body = [
								`Bonjour${contactPrenom ? " " + contactPrenom : ""},`,
								"",
								`Je me permets de revenir vers vous concernant ma candidature pour le poste de ${c.poste || "ce rôle"} chez ${c.entreprise}${dateEnvStr ? `, transmise le ${dateEnvStr}` : ""}.`,
								"",
								"Toujours vivement motivé(e) par cette opportunité et par les perspectives de vos équipes, je souhaitais savoir si vous aviez pu étudier mon profil ou si vous désiriez des précisions complémentaires.",
								"",
								"Je reste à votre entière disposition pour tout échange.",
								"",
								"Bien cordialement,",
								userPrenom || ""
							].join("\n");
							return /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)(Label, {
									className: "text-xs text-muted-foreground",
									children: "Objet"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 921,
									columnNumber: 23
								}, this), /* @__PURE__ */ (void 0)(Input, {
									readOnly: true,
									value: subject,
									className: "mt-1 font-mono text-xs bg-muted/30"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 924,
									columnNumber: 23
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 920,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)(Label, {
									className: "text-xs text-muted-foreground",
									children: "Corps de l'email"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 932,
									columnNumber: 23
								}, this), /* @__PURE__ */ (void 0)(Textarea, {
									readOnly: true,
									rows: 7,
									value: body,
									className: "mt-1 font-sans text-xs bg-muted/30 resize-none leading-relaxed"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 935,
									columnNumber: 23
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 931,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between pt-2",
									children: [/* @__PURE__ */ (void 0)(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: () => handleCopyEmail(subject, body),
										className: "gap-1.5 text-xs h-8",
										children: [/* @__PURE__ */ (void 0)(Copy, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 951,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("span", { children: "Copier l'email" }, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 952,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 944,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)(Button, {
										type: "button",
										size: "sm",
										onClick: handleMarkFollowUpSent,
										className: "gap-1.5 text-xs h-8 bg-sky-600 hover:bg-sky-700 text-white",
										children: [/* @__PURE__ */ (void 0)(Check, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 961,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("span", { children: "Marquer comme relancée" }, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 962,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 955,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 943,
									columnNumber: 21
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 919,
								columnNumber: 19
							}, this);
						})()
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 895,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => setEmailModalData(null),
						className: "text-xs",
						children: "Fermer"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 972,
						columnNumber: 13
					}, this) }, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 971,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 882,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 876,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
			open: Boolean(deadlineModalItem),
			onOpenChange: (open) => {
				if (!open) setDeadlineModalItem(null);
			},
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
				className: "max-w-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, { children: "Mettre à jour la date limite" }, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 993,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, { children: deadlineModalItem?.entreprise }, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 994,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 992,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-4 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							htmlFor: "quick-deadline-input",
							className: "text-xs",
							children: "Nouvelle date limite de candidature"
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 1001,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
							id: "quick-deadline-input",
							type: "date",
							value: newDeadlineValue,
							onChange: (e) => setNewDeadlineValue(e.target.value),
							className: "mt-1.5"
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 1004,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 1e3,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs text-muted-foreground",
									children: "Raccourcis :"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 1014,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => setNewDeadlineValue(addDays(todayIso(), 7)),
									className: "h-6 rounded-md text-[11px]",
									children: "+7 jours"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 1017,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => setNewDeadlineValue(addDays(todayIso(), 14)),
									className: "h-6 rounded-md text-[11px]",
									children: "+14 jours"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 1026,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									onClick: () => setNewDeadlineValue(""),
									className: "h-6 rounded-md text-[11px] text-muted-foreground",
									children: "Pas de deadline"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 1035,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 1013,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 999,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, {
						className: "gap-2 sm:gap-0",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setDeadlineModalItem(null),
							children: "Annuler"
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 1048,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							onClick: handleSaveNewDeadline,
							children: "Enregistrer"
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 1055,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 1047,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 991,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 985,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialog, {
			open: Boolean(deleteCandidate),
			onOpenChange: (open) => {
				if (!open) setDeleteCandidate(null);
			},
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogTitle, { children: "Supprimer cette opportunité ?" }, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 1071,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogDescription, { children: [
				"Voulez-vous vraiment supprimer l'opportunité",
				" ",
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: deleteCandidate?.entreprise }, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 1074,
					columnNumber: 15
				}, this),
				" ? Cette action est irréversible."
			] }, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 1072,
				columnNumber: 13
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 1070,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogCancel, { children: "Annuler" }, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 1079,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogAction, {
				onClick: handleConfirmDelete,
				className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
				children: "Supprimer"
			}, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 1080,
				columnNumber: 13
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 1078,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 1069,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 1063,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 685,
		columnNumber: 5
	}, this);
}
var _jsxFileName$4 = "/app/applet/src/components/PipelineOverview.tsx";
function PipelineOverview({ items }) {
	const activeItems = (0, import_react.useMemo)(() => items.filter((c) => !c.archive), [items]);
	const counts = (0, import_react.useMemo)(() => {
		let sauvegardees = 0;
		let aPreparer = 0;
		let aEtudier = 0;
		let aCandidater = 0;
		let envoyees = 0;
		let entretiens = 0;
		for (const c of activeItems) {
			const s = c.statut;
			if (s === "Sauvegardée" || c.currentWorkflowStep === "saved") sauvegardees++;
			else if (s === "À préparer" || c.currentWorkflowStep === "to_prepare") aPreparer++;
			else if (s === "À étudier") aEtudier++;
			else if (s === "À candidater") aCandidater++;
			else if (s === "Candidature envoyée" || s === "Relancée") envoyees++;
			else if (s === "Entretien" || s === "Deuxième entretien") entretiens++;
		}
		return {
			sauvegardees,
			aPreparer,
			aEtudier,
			aCandidater,
			envoyees,
			entretiens,
			total: activeItems.length
		};
	}, [activeItems]);
	const stages = [
		{
			label: "Sauvegardées",
			count: counts.sauvegardees,
			dot: "bg-muted-foreground/40"
		},
		{
			label: "À préparer",
			count: counts.aPreparer,
			dot: "bg-primary"
		},
		{
			label: "À étudier",
			count: counts.aEtudier,
			dot: "bg-lilac"
		},
		{
			label: "À candidater",
			count: counts.aCandidater,
			dot: "bg-amber-400"
		},
		{
			label: "Envoyées",
			count: counts.envoyees,
			dot: "bg-emerald-400"
		},
		{
			label: "Entretiens",
			count: counts.entretiens,
			dot: "bg-sky-400"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "candidatures-overview-card",
		className: "rounded-2xl border border-border/40 bg-card/40 p-5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-all",
		suppressHydrationWarning: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
				className: "mb-4 flex items-center justify-between border-b border-border/30 pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "text-sm font-semibold tracking-tight text-foreground",
					children: "Mes candidatures"
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 69,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-xs text-muted-foreground font-medium",
					children: [counts.total, " au total"]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 72,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 68,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-2.5",
				children: stages.map((st) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `size-1.5 rounded-full ${st.dot}` }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 85,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-muted-foreground font-normal",
							children: st.label
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 86,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 84,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-foreground font-medium",
						children: st.count
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 90,
						columnNumber: 13
					}, this)]
				}, st.label, true, {
					fileName: _jsxFileName$4,
					lineNumber: 80,
					columnNumber: 11
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 78,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4 border-t border-border/30 pt-3",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/opportunites",
					className: "group inline-flex w-full items-center justify-between text-xs font-medium text-muted-foreground transition-colors hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Voir toutes les opportunités" }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 100,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-3 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 101,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 96,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 95,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 63,
		columnNumber: 5
	}, this);
}
var _jsxFileName$3 = "/app/applet/src/components/AccountMenu.tsx";
function AccountMenu({ user }) {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [bio, setBio] = (0, import_react.useState)(false);
	const [supported, setSupported] = (0, import_react.useState)(false);
	const localCompte = getCompteActif();
	const displayName = user?.user_metadata?.["full_name"] || (localCompte?.prenom ? `${localCompte.prenom} ${localCompte.nom || ""}`.trim() : null) || user?.email?.split("@")[0] || "Mon compte";
	const initials = (localCompte?.prenom?.[0] || user?.email?.[0] || "U").toUpperCase();
	(0, import_react.useEffect)(() => {
		setSupported(biometricSupported());
		if (user?.id) setBio(biometricEnabled(user.id));
		else setBio(false);
	}, [user?.id]);
	const toggleBio = async () => {
		if (!user) return;
		if (bio) {
			disableBiometric(user.id);
			setBio(false);
			toast.success("Déverrouillage biométrique désactivé.");
			return;
		}
		try {
			await enableBiometric(user.id, user.email ?? "");
			setBio(true);
			toast.success("Déverrouillage biométrique activé sur cet appareil.");
		} catch {
			toast.error("Impossible d'activer la biométrie sur cet appareil.");
		}
	};
	const signOut$1 = async () => {
		await queryClient.cancelQueries();
		queryClient.clear();
		setCompteActif(null);
		if (typeof window !== "undefined") try {
			window.localStorage.removeItem("neoma-profil-v1");
			window.localStorage.removeItem("careerly_candidatures_v1");
			window.localStorage.removeItem("careerly_contacts_v1");
			window.localStorage.removeItem("careerly_entreprises_v1");
		} catch (err) {
			console.warn("Erreur purge cache local:", err);
		}
		if (isFirebaseConfigured()) try {
			await signOut(auth);
		} catch (err) {
			console.warn("Erreur déconnexion Firebase:", err);
		}
		try {
			await supabase.auth.signOut();
		} catch (err) {
			console.warn("Erreur déconnexion Supabase:", err);
		}
		toast.success("Déconnexion réussie");
		navigate({
			to: "/auth",
			replace: true
		});
	};
	if (!user) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
		asChild: true,
		size: "sm",
		variant: "outline",
		className: "gap-2 border-primary/30 hover:bg-primary/5",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
			to: "/auth",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogIn, { className: "size-4 text-primary" }, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 125,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Connexion" }, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 126,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 124,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 118,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			variant: "outline",
			size: "sm",
			className: "gap-2 border-border/80 hover:bg-accent px-2.5",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex size-5 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary",
				children: initials
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 140,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "max-w-28 truncate text-xs font-medium",
				children: displayName
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 143,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 135,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 134,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuContent, {
		align: "end",
		className: "w-64 p-1.5 shadow-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuLabel, {
				className: "p-2 font-normal",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-sm font-semibold text-foreground truncate",
								children: displayName
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 152,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "inline-flex items-center gap-1 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserCheck, { className: "size-3" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 156,
									columnNumber: 17
								}, this), " Connecté"]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 155,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 151,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground truncate",
							children: user.email
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 159,
							columnNumber: 13
						}, this),
						localCompte?.ecole && /* @__PURE__ */ (void 0)("p", {
							className: "text-[11px] text-muted-foreground/80 truncate",
							children: ["🎓 ", localCompte.ecole]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 163,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 150,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 149,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuSeparator, {}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 170,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/parametres",
					className: "cursor-pointer gap-2 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Settings, { className: "size-4 text-muted-foreground" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 174,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Paramètres & Profil" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 175,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 173,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 172,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/auth",
					className: "cursor-pointer gap-2 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserPlus, { className: "size-4 text-muted-foreground" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 181,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Changer de compte" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 182,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 180,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 179,
				columnNumber: 9
			}, this),
			supported && /* @__PURE__ */ (void 0)(DropdownMenuItem, {
				className: "cursor-pointer gap-2 text-xs",
				onSelect: (e) => {
					e.preventDefault();
					toggleBio();
				},
				children: [/* @__PURE__ */ (void 0)(FingerprintPattern, { className: "size-4 text-muted-foreground" }, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 194,
					columnNumber: 13
				}, this), /* @__PURE__ */ (void 0)("span", { children: bio ? "Désactiver la biométrie" : "Activer la biométrie" }, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 195,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 187,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuSeparator, {}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 201,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
				className: "cursor-pointer gap-2 text-xs text-destructive focus:bg-destructive/10 focus:text-destructive",
				onSelect: () => void signOut$1(),
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { className: "size-4" }, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 207,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Se déconnecter" }, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 208,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 203,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 148,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 133,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/app/applet/src/components/Onboarding.tsx";
var ETAPES = [
	{
		titre: "Bienvenue sur NACORA 👋",
		texte: "NACORA est votre copilote de recherche de stage ou d'alternance : un seul endroit pour suivre vos candidatures, vos relances et vos entretiens.",
		points: [
			"Toutes vos candidatures centralisées",
			"Synchronisées sur tous vos appareils",
			"Un brief quotidien qui vous dit quoi faire"
		],
		icon: Sparkles
	},
	{
		titre: "Votre profil, la clé du match IA",
		texte: "Complétez votre profil (ou importez votre CV) : l'IA compare ensuite chaque offre à votre parcours et vous donne un score de compatibilité.",
		points: [
			"Analyse automatique de votre CV",
			"Score de match IA sur chaque offre",
			"Points forts et écarts détaillés"
		],
		icon: Bot
	},
	{
		titre: "Ajoutez vos offres en 10 secondes",
		texte: "Collez le texte d'une annonce : NACORA extrait l'entreprise, le poste, le lieu et la date limite de candidature automatiquement.",
		points: [
			"Extraction IA depuis une annonce",
			"Deadlines suivies et surlignées",
			"Statuts modifiables en un clic"
		],
		icon: CalendarClock
	},
	{
		titre: "Contacts, relances et entretiens",
		texte: "Gardez vos contacts recruteurs au chaud : l'IA rédige vos relances et prépare vos entretiens à votre place.",
		points: [
			"Messages de relance générés par l'IA",
			"Préparation d'entretien personnalisée",
			"Calendrier des deadlines et rendez-vous"
		],
		icon: Users
	},
	{
		titre: "Vous avez déjà commencé ailleurs ?",
		texte: "Importez votre tableau Excel/CSV, vos contacts et vos lettres de motivation : vous ne repartez jamais de zéro.",
		points: [
			"Import Excel / CSV avec détection des colonnes",
			"Import de contacts et de documents",
			"Export de votre agenda en .ics"
		],
		icon: Upload
	}
];
function cle(userId) {
	return `careerly.onboarding.${userId ?? "local"}`;
}
/** Indique si le tutoriel doit s'afficher automatiquement pour cet utilisateur. */
function useOnboarding(userId, pret) {
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!pret || typeof window === "undefined") return;
		if (window.localStorage.getItem(cle(userId)) === "vu") return;
		setOpen(true);
	}, [pret, userId]);
	const fermer = (v) => {
		if (!v && typeof window !== "undefined") window.localStorage.setItem(cle(userId), "vu");
		setOpen(v);
	};
	return {
		open,
		setOpen: fermer,
		ouvrir: () => setOpen(true)
	};
}
function Onboarding({ open, onOpenChange }) {
	const [i, setI] = (0, import_react.useState)(0);
	const etape = ETAPES[i] ?? ETAPES[0];
	const Icon = etape.icon;
	const dernier = i === ETAPES.length - 1;
	(0, import_react.useEffect)(() => {
		if (open) setI(0);
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CenterModal, {
		open,
		onOpenChange,
		size: "md",
		title: etape.titre,
		description: `Étape ${i + 1} sur ${ETAPES.length}`,
		footer: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex w-full items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: () => onOpenChange(false),
				className: "text-muted-foreground",
				children: "Passer"
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 128,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2",
				children: [i > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "secondary",
					size: "sm",
					onClick: () => setI(i - 1),
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 139,
						columnNumber: 17
					}, this), " Retour"]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 138,
					columnNumber: 15
				}, this) : null, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					onClick: () => dernier ? onOpenChange(false) : setI(i + 1),
					children: dernier ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: ["C'est parti ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 148,
						columnNumber: 31
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 147,
						columnNumber: 17
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: ["Suivant ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 152,
						columnNumber: 27
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 151,
						columnNumber: 17
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 142,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 136,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 127,
			columnNumber: 9
		}, this),
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "pop-in space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid size-12 place-items-center rounded-2xl bg-primary/15 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "size-6" }, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 162,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 161,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm leading-relaxed text-muted-foreground",
					children: etape.texte
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 164,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
					className: "space-y-2",
					children: etape.points.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
						className: "flex items-start gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "mt-0.5 size-4 shrink-0 text-primary" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 170,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: p }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 171,
							columnNumber: 15
						}, this)]
					}, p, true, {
						fileName: _jsxFileName$2,
						lineNumber: 169,
						columnNumber: 13
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 167,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-1.5 pt-1",
					children: ETAPES.map((e, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						"aria-label": `Aller à l'étape ${idx + 1}`,
						onClick: () => setI(idx),
						className: `h-1.5 rounded-full transition-all ${idx === i ? "w-6 bg-primary" : "w-2 bg-border hover:bg-primary/40"}`
					}, e.titre, false, {
						fileName: _jsxFileName$2,
						lineNumber: 177,
						columnNumber: 13
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 175,
					columnNumber: 9
				}, this)
			]
		}, i, true, {
			fileName: _jsxFileName$2,
			lineNumber: 160,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 120,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/BiometricLock.tsx";
var KEY = "neoma-biometrie-unlocked";
function useBiometricLock(userId, enabled) {
	const [unlocked, setUnlocked] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (!userId || !enabled) {
			setUnlocked(true);
			return;
		}
		setUnlocked(window.sessionStorage.getItem(KEY) === userId);
	}, [userId, enabled]);
	const unlock = () => {
		if (userId) window.sessionStorage.setItem(KEY, userId);
		setUnlocked(true);
	};
	return {
		unlocked,
		unlock
	};
}
function BiometricLockScreen({ userId, onUnlock }) {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const tryUnlock = async () => {
		setLoading(true);
		setError("");
		try {
			await verifyBiometric(userId);
			onUnlock();
		} catch {
			setError("Vérification impossible. Réessayez.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-6",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "surface-card w-full max-w-sm p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FingerprintPattern, { className: "mx-auto size-10 text-primary" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 53,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "mt-4 text-xl font-semibold",
					children: "Suivi verrouillé"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 54,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Déverrouillez avec votre empreinte ou votre visage pour accéder à vos candidatures."
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 55,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					className: "mt-6 w-full",
					onClick: () => void tryUnlock(),
					disabled: loading,
					children: [
						loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "animate-spin" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 64,
							columnNumber: 22
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FingerprintPattern, {}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 64,
							columnNumber: 61
						}, this),
						" ",
						"Déverrouiller"
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 59,
					columnNumber: 9
				}, this),
				error && /* @__PURE__ */ (void 0)("p", {
					className: "mt-3 text-sm text-destructive",
					children: error
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 67,
					columnNumber: 19
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 52,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 51,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/index.tsx?tsr-split=component";
function Index() {
	const { user, authLoading, items, ready, patch, save, remove } = useCandidatures();
	useNavigate();
	const profil = useProfil(user);
	const [bioOn, setBioOn] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [initialTab, setInitialTab] = (0, import_react.useState)("offre");
	const { unlocked, unlock } = useBiometricLock(user?.id ?? null, bioOn);
	const tuto = useOnboarding(user?.id ?? null, ready && !authLoading);
	(0, import_react.useEffect)(() => {
		if (user?.id) setBioOn(biometricEnabled(user.id));
		else setBioOn(false);
	}, [user?.id]);
	const today = todayIso();
	const stats = (0, import_react.useMemo)(() => {
		return {
			total: items.length,
			envoyees: items.filter((c) => c.statut === "Candidature envoyée" || c.statut === "Relancée").length,
			entretiens: items.filter((c) => c.statut === "Entretien" || c.statut === "Deuxième entretien").length,
			limites: items.filter((c) => c.dateLimite && c.dateLimite >= today && c.dateLimite <= addDays(today, 7) && c.statut !== "Candidature envoyée" && c.statut !== "Refusée").length,
			relances: items.filter((c) => c.dateRelance && c.dateRelance <= today && (c.statut === "Candidature envoyée" || c.statut === "Relancée")).length
		};
	}, [items, today]);
	if (bioOn && !unlocked && !authLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BiometricLockScreen, {
		userId: user?.id || "",
		onUnlock: unlock
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 51,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		title: profil?.prenom ? `Bonjour, ${profil.prenom}` : "Bonjour",
		subtitle: "Voici ce qui mérite votre attention aujourd'hui.",
		headerExtra: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "outline",
				size: "sm",
				asChild: true,
				className: "h-8 rounded-lg border-border/60 bg-card/40 px-3 text-xs font-medium hover:bg-accent/40",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/opportunites",
					children: "Voir mes opportunités"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 55,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 54,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				size: "sm",
				onClick: () => {
					setEditing(null);
					setInitialTab("offre");
					setOpen(true);
				},
				className: "h-8 rounded-lg px-3 text-xs font-medium gap-1.5 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 62,
					columnNumber: 13
				}, this), "Ajouter une opportunité"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 57,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 53,
			columnNumber: 158
		}, this),
		actions: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-2",
			children: [authLoading && /* @__PURE__ */ (void 0)(LoaderCircle, { className: "size-5 animate-spin opacity-70" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 66,
				columnNumber: 27
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccountMenu, { user }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 67,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 65,
			columnNumber: 26
		}, this),
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-muted-foreground/80 font-normal",
				suppressHydrationWarning: true,
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
						stats.total,
						" opportunité",
						stats.total > 1 ? "s" : ""
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 71,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-muted-foreground/40",
						children: "·"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 74,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
						stats.envoyees,
						" envoyée",
						stats.envoyees > 1 ? "s" : ""
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 75,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-muted-foreground/40",
						children: "·"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 78,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
						stats.limites,
						" deadline",
						stats.limites > 1 ? "s" : ""
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 79,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-muted-foreground/40",
						children: "·"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 82,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
						stats.relances,
						" relance",
						stats.relances > 1 ? "s" : ""
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 83,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 70,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 gap-5 lg:grid-cols-12 items-start",
				suppressHydrationWarning: true,
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "lg:col-span-8 min-w-0",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DailyBrief, {
						items,
						ready,
						userPrenom: profil?.prenom,
						onOuvrir: (c, tab) => {
							setEditing(c);
							setInitialTab(tab || "offre");
							setOpen(true);
						},
						onPatch: patch,
						onRemove: remove
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 91,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 90,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "lg:col-span-4 min-w-0",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PipelineOverview, { items }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 99,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 98,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 89,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Onboarding, {
				open: tuto.open,
				onOpenChange: tuto.setOpen
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 103,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CandidatureSheet, {
				open,
				onOpenChange: setOpen,
				value: editing,
				initialTab,
				existingItems: items,
				onOpenExisting: (c) => {
					setEditing(c);
					setInitialTab("offre");
					setOpen(true);
				},
				onSave: async (c) => {
					await save(c);
					setOpen(false);
				},
				onDelete: async (id) => {
					await remove(id);
					setOpen(false);
				}
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 105,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 53,
		columnNumber: 10
	}, this);
}
//#endregion
export { Index as component };

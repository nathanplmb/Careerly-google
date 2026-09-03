import { o as __toESM } from "../_runtime.mjs";
import { f as object, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { _ as todayIso, a as TYPES_ENTRETIEN, d as formatDate, f as getWorkflowStepConfig, g as statutToWorkflowStepKey, l as emptyPreparation, m as normalizeCandidature, o as WORKFLOW_STEPS_CONFIG, p as loadCandidatures, t as CHANNELS_COMMUNICATION, u as findPotentialDuplicate, v as workflowStepKeyToStatut } from "./candidatures-CZEj3mXa.mjs";
import { n as Label, t as Input } from "./label-CmIE8x5o.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { $ as GitFork, At as Briefcase, B as LoaderCircle, Ct as Check, D as Plus, F as MapPin, G as Languages, M as PenLine, N as MessageSquare, Pt as ArrowRight, T as RotateCcw, Tt as Calendar, V as ListOrdered, _ as Sparkles, _t as CircleCheck, bt as ChevronRight, d as TriangleAlert, gt as CircleX, j as Pen, mt as Clock, n as X, o as User, ot as ExternalLink, p as Trash2, st as Euro, tt as FileText, v as SlidersHorizontal, wt as ChartColumn } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BBUarmca.mjs";
import { a as TSS_SERVER_FUNCTION, i as createServerFn, o as getServerFnById } from "./server-DeZHsuy6.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { t as CenterModal } from "./modal-BFs0E2x2.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BYfOmXtJ.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DUy71i1r.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CandidatureSheet-DGd6aJB4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var ExtraireOpportuniteInput = object({
	text: string().min(10, "Le texte de l'offre doit contenir au moins 10 caractères."),
	url: string().optional()
});
var extraireOpportuniteServerFn = createServerFn({ method: "POST" }).validator((data) => ExtraireOpportuniteInput.parse(data)).handler(createSsrRpc("a8546a28c65e51fb3ecf9b7f6df5ff54e8d3e0bde77d5c2290b5d284fcc08ab9"));
function TagListEditor({ label, items, onChange, placeholder = "Ajouter...", badgeClassName = "bg-primary/10 text-primary border-primary/20", emptyText = "Non renseigné" }) {
	const [inputVal, setInputVal] = (0, import_react.useState)("");
	const handleAdd = () => {
		const trimmed = inputVal.trim();
		if (!trimmed) return;
		if (!items.includes(trimmed)) onChange([...items, trimmed]);
		setInputVal("");
	};
	const handleRemove = (index) => {
		onChange(items.filter((_, i) => i !== index));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
					children: [
						label,
						" (",
						items.length,
						")"
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5 min-h-[32px] p-2 rounded-xl bg-muted/20 border border-border/40",
				children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground/60 italic self-center px-1",
					children: emptyText
				}) : items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "outline",
					className: `text-xs py-1 px-2.5 flex items-center gap-1.5 font-medium transition-all ${badgeClassName}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => handleRemove(idx),
						className: "text-muted-foreground hover:text-destructive transition-colors focus:outline-none",
						title: "Supprimer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
					})]
				}, idx))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: inputVal,
					onChange: (e) => setInputVal(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							handleAdd();
						}
					},
					placeholder,
					className: "h-8 text-xs bg-background"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					size: "sm",
					variant: "outline",
					onClick: handleAdd,
					disabled: !inputVal.trim(),
					className: "h-8 px-2.5 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5 mr-1" }), " Ajouter"]
				})]
			})
		]
	});
}
function MetricsEditor({ metrics, onChange }) {
	const [label, setLabel] = (0, import_react.useState)("");
	const [value, setValue] = (0, import_react.useState)("");
	const handleAdd = () => {
		if (!label.trim() || !value.trim()) return;
		onChange([...metrics, {
			label: label.trim(),
			value: value.trim()
		}]);
		setLabel("");
		setValue("");
	};
	const handleRemove = (index) => {
		onChange(metrics.filter((_, i) => i !== index));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Chiffres clés & Métriques (",
					metrics.length,
					")"
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 sm:grid-cols-3 gap-2",
				children: metrics.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col-span-full py-3 px-4 rounded-xl bg-muted/20 border border-border/40 text-xs text-muted-foreground/60 italic",
					children: "Aucun chiffre clé détecté dans l'offre."
				}) : metrics.map((m, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative group p-3 rounded-xl border border-border/60 bg-card/60 shadow-xs flex flex-col justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => handleRemove(idx),
							className: "absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-base font-bold text-primary truncate pr-4",
							children: m.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] text-muted-foreground truncate",
							children: m.label
						})
					]
				}, idx))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Métrique (ex: Utilisateurs)",
						value: label,
						onChange: (e) => setLabel(e.target.value),
						className: "h-8 text-xs flex-1 bg-background"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Valeur (ex: 400 000)",
						value,
						onChange: (e) => setValue(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								handleAdd();
							}
						},
						className: "h-8 text-xs w-32 bg-background"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						size: "sm",
						variant: "outline",
						onClick: handleAdd,
						disabled: !label.trim() || !value.trim(),
						className: "h-8 px-2.5 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5 mr-1" }), " Ajouter"]
					})
				]
			})
		]
	});
}
function LanguagesEditor({ requiredLanguages, preferredLanguages, onChangeRequired, onChangePreferred }) {
	const [newLang, setNewLang] = (0, import_react.useState)("");
	const [newNiveau, setNewNiveau] = (0, import_react.useState)("");
	const [isObligatoire, setIsObligatoire] = (0, import_react.useState)(true);
	const handleAdd = () => {
		if (!newLang.trim()) return;
		const item = {
			langue: newLang.trim(),
			niveau: newNiveau.trim() || void 0,
			obligatoire: isObligatoire
		};
		if (isObligatoire) onChangeRequired([...requiredLanguages, item]);
		else onChangePreferred([...preferredLanguages, item]);
		setNewLang("");
		setNewNiveau("");
	};
	const total = requiredLanguages.length + preferredLanguages.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Langues (",
					total,
					")"
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2 p-2.5 rounded-xl bg-muted/20 border border-border/40 min-h-[42px]",
				children: total === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground/60 italic self-center px-1",
					children: "Non renseigné (aucune langue explicitement requise dans l'offre)"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [requiredLanguages.map((l, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "outline",
					className: "text-xs py-1 px-2.5 flex items-center gap-1.5 bg-destructive/10 text-destructive border-destructive/30 font-medium",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l.langue }),
						l.niveau && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] opacity-80",
							children: [
								"(",
								l.niveau,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[9px] uppercase font-bold tracking-tight bg-destructive/20 px-1 rounded",
							children: "Requis"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onChangeRequired(requiredLanguages.filter((_, i) => i !== idx)),
							className: "hover:opacity-75 focus:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
						})
					]
				}, `req-${idx}`)), preferredLanguages.map((l, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "outline",
					className: "text-xs py-1 px-2.5 flex items-center gap-1.5 bg-lilac/10 text-lilac border-lilac/30 font-medium",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l.langue }),
						l.niveau && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] opacity-80",
							children: [
								"(",
								l.niveau,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[9px] uppercase font-bold tracking-tight bg-lilac/20 px-1 rounded",
							children: "Atout"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onChangePreferred(preferredLanguages.filter((_, i) => i !== idx)),
							className: "hover:opacity-75 focus:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
						})
					]
				}, `pref-${idx}`))] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Langue (ex: Anglais)",
						value: newLang,
						onChange: (e) => setNewLang(e.target.value),
						className: "h-8 text-xs flex-1 bg-background"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Niveau (ex: Courant, C1)",
						value: newNiveau,
						onChange: (e) => setNewNiveau(e.target.value),
						className: "h-8 text-xs w-32 bg-background"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: isObligatoire ? "default" : "secondary",
						onClick: () => setIsObligatoire(!isObligatoire),
						className: "h-8 text-[11px] px-2",
						children: isObligatoire ? "Obligatoire" : "Atout"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						size: "sm",
						variant: "outline",
						onClick: handleAdd,
						disabled: !newLang.trim(),
						className: "h-8 px-2.5 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5 mr-1" }), " Ajouter"]
					})
				]
			})
		]
	});
}
function ProcessStepsEditor({ steps, onChange }) {
	const [stepInput, setStepInput] = (0, import_react.useState)("");
	const handleAdd = () => {
		if (!stepInput.trim()) return;
		onChange([...steps, stepInput.trim()]);
		setStepInput("");
	};
	const handleRemove = (index) => {
		onChange(steps.filter((_, i) => i !== index));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListOrdered, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Étapes du recrutement (",
					steps.length,
					")"
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-1.5",
				children: steps.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-2.5 px-3 rounded-xl bg-muted/20 border border-border/40 text-xs text-muted-foreground/60 italic",
					children: "Non renseigné dans l'offre."
				}) : steps.map((st, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between p-2 px-3 rounded-lg border border-border/50 bg-card/60 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-5 rounded-full bg-primary/10 text-primary font-bold text-[11px] flex items-center justify-center",
							children: idx + 1
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: st
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => handleRemove(idx),
						className: "text-muted-foreground hover:text-destructive",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
					})]
				}, idx))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Nouvelle étape (ex: 3. Entretien avec le Head of Marketing)",
					value: stepInput,
					onChange: (e) => setStepInput(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							handleAdd();
						}
					},
					className: "h-8 text-xs bg-background flex-1"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					size: "sm",
					variant: "outline",
					onClick: handleAdd,
					disabled: !stepInput.trim(),
					className: "h-8 px-2.5 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5 mr-1" }), " Ajouter"]
				})]
			})
		]
	});
}
function WorkflowTab({ candidature, onChange }) {
	const currentStepKey = candidature.currentWorkflowStep || statutToWorkflowStepKey(candidature.statut);
	const currentConfig = getWorkflowStepConfig(currentStepKey);
	const events = Array.isArray(candidature.workflowEvents) ? candidature.workflowEvents : [];
	const [changeStepModalOpen, setChangeStepModalOpen] = (0, import_react.useState)(false);
	const [selectedTargetStep, setSelectedTargetStep] = (0, import_react.useState)(currentStepKey);
	const [stepDate, setStepDate] = (0, import_react.useState)(todayIso());
	const [stepNote, setStepNote] = (0, import_react.useState)("");
	const [stepChannel, setStepChannel] = (0, import_react.useState)(candidature.source || "JobTeaser");
	const [stepInterviewType, setStepInterviewType] = (0, import_react.useState)("Visio (Teams, Meet, Zoom)");
	const [stepInterlocuteur, setStepInterlocuteur] = (0, import_react.useState)(candidature.contact || "");
	const [editingEvent, setEditingEvent] = (0, import_react.useState)(null);
	const [editDate, setEditDate] = (0, import_react.useState)("");
	const [editNote, setEditNote] = (0, import_react.useState)("");
	const [editChannel, setEditChannel] = (0, import_react.useState)("");
	const [editInterviewType, setEditInterviewType] = (0, import_react.useState)("");
	const [editInterlocuteur, setEditInterlocuteur] = (0, import_react.useState)("");
	const [customEventModalOpen, setCustomEventModalOpen] = (0, import_react.useState)(false);
	const [customEventType, setCustomEventType] = (0, import_react.useState)(currentStepKey);
	const [customEventDate, setCustomEventDate] = (0, import_react.useState)(todayIso());
	const [customEventNote, setCustomEventNote] = (0, import_react.useState)("");
	const openChangeStepModal = (targetKey) => {
		const key = targetKey || currentConfig.nextStepKey || currentStepKey;
		setSelectedTargetStep(key);
		const targetConfig = getWorkflowStepConfig(key);
		setStepDate(todayIso());
		setStepNote(targetConfig.description);
		setStepChannel(candidature.source || "JobTeaser");
		setStepInterviewType("Visio (Teams, Meet, Zoom)");
		setStepInterlocuteur(candidature.contact || "");
		setChangeStepModalOpen(true);
	};
	const handleConfirmChangeStep = () => {
		const targetConfig = getWorkflowStepConfig(selectedTargetStep);
		const newStatut = targetConfig.statutLabel;
		const newEvent = {
			id: `evt-${selectedTargetStep}-${Date.now()}`,
			type: selectedTargetStep,
			date: stepDate || todayIso(),
			note: stepNote.trim() || targetConfig.description,
			channel: selectedTargetStep === "application_sent" ? stepChannel : void 0,
			interviewType: selectedTargetStep === "interview" || selectedTargetStep === "second_interview" ? stepInterviewType : void 0,
			interlocuteur: selectedTargetStep === "interview" || selectedTargetStep === "second_interview" ? stepInterlocuteur.trim() || void 0 : void 0,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		const updatedEvents = [...events.filter((e) => e.type !== selectedTargetStep), newEvent].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
		const patch = {
			currentWorkflowStep: selectedTargetStep,
			statut: newStatut,
			status: newStatut,
			workflowEvents: updatedEvents
		};
		if (selectedTargetStep === "saved") patch.savedAt = stepDate;
		else if (selectedTargetStep === "to_prepare") patch.preparedAt = stepDate;
		else if (selectedTargetStep === "application_sent") {
			patch.appliedAt = stepDate;
			patch.dateEnvoi = stepDate;
			if (stepChannel) patch.source = stepChannel;
		} else if (selectedTargetStep === "follow_up") {
			patch.followUpDate = stepDate;
			patch.dateRelance = stepDate;
		} else if (selectedTargetStep === "interview") {
			patch.interviewDate = stepDate;
			patch.dateDernierContact = stepDate;
			patch.lastContactDate = stepDate;
			if (stepInterlocuteur.trim()) patch.contact = stepInterlocuteur.trim();
		} else if (selectedTargetStep === "second_interview") {
			patch.secondInterviewDate = stepDate;
			patch.dateDernierContact = stepDate;
			patch.lastContactDate = stepDate;
			if (stepInterlocuteur.trim()) patch.contact = stepInterlocuteur.trim();
		} else if (selectedTargetStep === "offer_received") patch.offerReceivedAt = stepDate;
		else if (selectedTargetStep === "accepted") patch.acceptedAt = stepDate;
		else if (selectedTargetStep === "rejected") patch.rejectedAt = stepDate;
		onChange(patch);
		setChangeStepModalOpen(false);
		toast.success(`Étape mise à jour : ${targetConfig.label}`);
	};
	const handleQuickAdvance = () => {
		if (!currentConfig.nextStepKey) {
			openChangeStepModal();
			return;
		}
		openChangeStepModal(currentConfig.nextStepKey);
	};
	const handleOpenEditEvent = (evt) => {
		setEditingEvent(evt);
		setEditDate(evt.date);
		setEditNote(evt.note || "");
		setEditChannel(evt.channel || "");
		setEditInterviewType(evt.interviewType || "Visio (Teams, Meet, Zoom)");
		setEditInterlocuteur(evt.interlocuteur || "");
	};
	const handleSaveEditEvent = () => {
		if (!editingEvent) return;
		const patch = { workflowEvents: events.map((e) => {
			if (e.id === editingEvent.id) return {
				...e,
				date: editDate,
				note: editNote.trim(),
				channel: editChannel.trim() || void 0,
				interviewType: editInterviewType.trim() || void 0,
				interlocuteur: editInterlocuteur.trim() || void 0
			};
			return e;
		}) };
		if (editingEvent.type === "application_sent") {
			patch.dateEnvoi = editDate;
			patch.appliedAt = editDate;
		} else if (editingEvent.type === "follow_up") {
			patch.dateRelance = editDate;
			patch.followUpDate = editDate;
		} else if (editingEvent.type === "interview") patch.interviewDate = editDate;
		onChange(patch);
		setEditingEvent(null);
		toast.success("Événement mis à jour.");
	};
	const handleDeleteEvent = (eventId, eventType) => {
		if (eventType === "saved" && events.length === 1) {
			toast.error("L'étape initiale 'Sauvegardée' ne peut pas être supprimée.");
			return;
		}
		const updatedEvents = events.filter((e) => e.id !== eventId);
		let newStep = currentStepKey;
		if (currentStepKey === eventType) {
			const remainingTypes = updatedEvents.map((e) => e.type);
			const orderedRemaining = WORKFLOW_STEPS_CONFIG.filter((s) => remainingTypes.includes(s.key));
			newStep = orderedRemaining.length > 0 ? orderedRemaining[orderedRemaining.length - 1].key : "saved";
		}
		onChange({
			workflowEvents: updatedEvents,
			currentWorkflowStep: newStep,
			statut: workflowStepKeyToStatut(newStep),
			status: workflowStepKeyToStatut(newStep)
		});
		toast.success("Événement supprimé.");
	};
	const handleAddCustomEvent = () => {
		const newEvent = {
			id: `custom-evt-${Date.now()}`,
			type: customEventType,
			date: customEventDate || todayIso(),
			note: customEventNote.trim() || "Note d'avancement",
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		onChange({ workflowEvents: [...events, newEvent].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) });
		setCustomEventModalOpen(false);
		toast.success("Note ajoutée au journal.");
	};
	const currentStepIndex = WORKFLOW_STEPS_CONFIG.findIndex((s) => s.key === currentStepKey);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-xs space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
								children: "Étape actuelle du workflow"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: `text-xs px-2.5 py-0.5 font-semibold ${currentConfig.badgeColor}`,
								children: currentConfig.label
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-foreground font-medium",
							children: currentConfig.description
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 flex-wrap",
						children: [currentConfig.nextStepKey && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							className: "gap-1.5 font-semibold text-xs h-9 shadow-xs",
							onClick: handleQuickAdvance,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: currentConfig.defaultActionLabel }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							className: "gap-1.5 text-xs h-9",
							onClick: () => openChangeStepModal(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Changer d'étape" })]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5 pt-1 border-t border-border/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-[11px] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Progression du processus" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-foreground",
							children: currentConfig.isTerminal ? currentConfig.terminalType === "success" ? "Offre acceptée" : "Candidature refusée" : `Étape ${Math.max(1, currentStepIndex + 1)} sur 8`
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1.5 w-full bg-muted/60 rounded-full overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `h-full transition-all duration-300 ${currentConfig.key === "accepted" ? "bg-emerald-500 w-full" : currentConfig.key === "rejected" ? "bg-destructive w-full" : "bg-primary"}`,
							style: { width: currentConfig.isTerminal ? "100%" : `${Math.min(100, Math.max(12, (currentStepIndex + 1) / 8 * 100))}%` }
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 sm:p-5 rounded-2xl bg-muted/15 border border-border/60 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-xs font-bold uppercase tracking-wider text-foreground",
							children: "Timeline de la candidature"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] text-muted-foreground",
						children: "Cliquez sur une étape pour changer ou ajuster les détails"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative pl-3 sm:pl-4 space-y-6 before:absolute before:left-[19px] sm:before:left-[23px] before:top-3 before:bottom-3 before:w-0.5 before:bg-border/70",
					children: WORKFLOW_STEPS_CONFIG.map((step, idx) => {
						const isCurrent = step.key === currentStepKey;
						const matchingEvents = events.filter((e) => e.type === step.key);
						const hasEvent = matchingEvents.length > 0;
						const latestEvent = matchingEvents[matchingEvents.length - 1];
						let dotStyle = "border-muted-foreground/30 bg-background text-muted-foreground";
						let dotIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-muted-foreground/40" });
						if (isCurrent) {
							if (step.key === "accepted") {
								dotStyle = "border-emerald-500 bg-emerald-500 text-white ring-4 ring-emerald-500/20";
								dotIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 stroke-[2.5]" });
							} else if (step.key === "rejected") {
								dotStyle = "border-destructive bg-destructive text-white ring-4 ring-destructive/20";
								dotIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-3.5" });
							} else {
								dotStyle = "border-primary bg-primary text-primary-foreground ring-4 ring-primary/20";
								dotIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-2 rounded-full bg-white animate-pulse" });
							}
						} else if (hasEvent) {
							dotStyle = "border-primary/60 bg-primary/10 text-primary";
							dotIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" });
						}
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex items-start gap-3 sm:gap-4 group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => openChangeStepModal(step.key),
								title: `Passer à l'étape : ${step.label}`,
								className: `relative z-10 flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-full border-2 transition-transform hover:scale-110 cursor-pointer ${dotStyle}`,
								children: dotIcon
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `flex-1 rounded-xl p-3 sm:p-3.5 transition-colors border ${isCurrent ? "bg-card border-primary/40 shadow-xs ring-1 ring-primary/20" : hasEvent ? "bg-card/70 border-border/70 hover:bg-card" : "bg-transparent border-transparent hover:bg-card/40 opacity-70 hover:opacity-100"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col sm:flex-row sm:items-center justify-between gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 flex-wrap",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => openChangeStepModal(step.key),
													className: "text-left font-semibold text-sm hover:text-primary transition-colors cursor-pointer",
													children: step.label
												}),
												isCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													variant: "secondary",
													className: "text-[10px] px-2 py-0 font-semibold bg-primary/15 text-primary border-primary/20",
													children: "Actuelle"
												}),
												latestEvent?.date && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs text-muted-foreground flex items-center gap-1 font-mono",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3" }), formatDate(latestEvent.date)]
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5",
											children: [hasEvent && latestEvent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "icon",
												className: "size-7 text-muted-foreground hover:text-foreground",
												onClick: () => handleOpenEditEvent(latestEvent),
												title: "Modifier la date ou note",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "size-3.5" })
											}), !isCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												variant: "ghost",
												size: "sm",
												className: "h-7 text-xs px-2 text-muted-foreground hover:text-primary",
												onClick: () => openChangeStepModal(step.key),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Définir" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3" })]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground mt-1",
										children: latestEvent?.note || step.description
									}),
									hasEvent && latestEvent && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-1.5 mt-2.5 pt-2 border-t border-border/40",
										children: [
											latestEvent.channel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												variant: "outline",
												className: "text-[10px] px-2 py-0 bg-muted/40 font-medium",
												children: ["Canal : ", latestEvent.channel]
											}),
											latestEvent.interviewType && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												variant: "outline",
												className: "text-[10px] px-2 py-0 bg-muted/40 font-medium",
												children: ["Format : ", latestEvent.interviewType]
											}),
											latestEvent.interlocuteur && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												variant: "outline",
												className: "text-[10px] px-2 py-0 bg-muted/40 font-medium flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-2.5" }), latestEvent.interlocuteur]
											})
										]
									})
								]
							})]
						}, step.key);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 sm:p-5 rounded-2xl bg-card border border-border/70 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "workflowContactInput",
								className: "text-xs font-bold uppercase tracking-wider text-foreground cursor-pointer",
								children: "Contact recruteur / Interlocuteur"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] text-muted-foreground",
							children: "Coordonnées des interlocuteurs du recrutement"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "workflowContactInput",
						value: candidature.contact || "",
						onChange: (e) => onChange({ contact: e.target.value }),
						placeholder: "ex: Sophie Durand (RH) — s.durand@entreprise.com — 06 12 34 56 78",
						className: "text-xs bg-background h-9"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground",
						children: "Ces coordonnées restent attachées à cette opportunité et sont réutilisées pour vos relances et convocations d'entretien."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 sm:p-5 rounded-2xl bg-card border border-border/70 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "workflowNotesInput",
							className: "text-xs font-bold uppercase tracking-wider text-foreground cursor-pointer",
							children: "Notes personnelles & Impressions"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] text-muted-foreground",
						children: "Vos notes privées (non générées par l'IA)"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "workflowNotesInput",
					rows: 4,
					value: candidature.personalNotes || candidature.commentaire || "",
					onChange: (e) => onChange({
						personalNotes: e.target.value,
						commentaire: e.target.value
					}),
					placeholder: "Notez ici vos impressions sur l'équipe, questions à poser en entretien, fourchette de salaire discutée, retours...",
					className: "text-xs bg-background resize-y leading-relaxed"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 sm:p-5 rounded-2xl bg-muted/15 border border-border/60 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "text-xs font-bold uppercase tracking-wider text-foreground",
							children: [
								"Journal des événements (",
								events.length,
								")"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						className: "h-7 text-xs gap-1",
						onClick: () => {
							setCustomEventType(currentStepKey);
							setCustomEventDate(todayIso());
							setCustomEventNote("");
							setCustomEventModalOpen(true);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ajouter une entrée" })]
					})]
				}), events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground py-2",
					children: "Aucun événement pour le moment."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: events.map((evt) => {
						const cfg = getWorkflowStepConfig(evt.type);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3 p-2.5 rounded-xl bg-card border border-border/50 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5 flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										className: `text-[10px] px-2 py-0 shrink-0 ${cfg.badgeColor}`,
										children: cfg.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-muted-foreground shrink-0 text-[11px]",
										children: formatDate(evt.date)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground truncate font-medium",
										children: evt.note || cfg.description
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "size-7 text-muted-foreground hover:text-foreground",
									onClick: () => handleOpenEditEvent(evt),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "size-3" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "size-7 text-muted-foreground hover:text-destructive",
									onClick: () => handleDeleteEvent(evt.id, evt.type),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" })
								})]
							})]
						}, evt.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: changeStepModalOpen,
				onOpenChange: setChangeStepModalOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "text-base font-bold flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4 text-primary" }), "Changer l'étape du workflow"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "text-xs",
							children: "Sélectionnez la nouvelle étape pour faire progresser cette opportunité. Vous pouvez revenir en arrière à tout moment."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs font-semibold",
										children: "Choisir une étape :"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-2 sm:grid-cols-3 gap-1.5",
										children: WORKFLOW_STEPS_CONFIG.map((step) => {
											const isSelected = selectedTargetStep === step.key;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => {
													setSelectedTargetStep(step.key);
													setStepNote(step.description);
												},
												className: `px-2.5 py-2 rounded-xl text-left border text-xs font-medium transition-all cursor-pointer ${isSelected ? "border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary/30" : "border-border hover:bg-muted/40 text-foreground"}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "truncate",
														children: step.label
													}), isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3 shrink-0 ml-1" })]
												})
											}, step.key);
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "stepDateInput",
										className: "text-xs font-semibold",
										children: "Date de l'événement :"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "stepDateInput",
										type: "date",
										value: stepDate,
										onChange: (e) => setStepDate(e.target.value),
										className: "text-xs bg-background"
									})]
								}),
								selectedTargetStep === "application_sent" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "stepChannelSelect",
										className: "text-xs font-semibold",
										children: "Canal d'envoi :"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: stepChannel,
										onValueChange: setStepChannel,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											id: "stepChannelSelect",
											className: "text-xs bg-background",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: CHANNELS_COMMUNICATION.map((ch) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: ch,
											className: "text-xs",
											children: ch
										}, ch)) })]
									})]
								}),
								(selectedTargetStep === "interview" || selectedTargetStep === "second_interview") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "stepInterviewTypeSelect",
										className: "text-xs font-semibold",
										children: "Format de l'entretien :"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: stepInterviewType,
										onValueChange: setStepInterviewType,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											id: "stepInterviewTypeSelect",
											className: "text-xs bg-background",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: TYPES_ENTRETIEN.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: t,
											className: "text-xs",
											children: t
										}, t)) })]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "stepInterlocuteurInput",
										className: "text-xs font-semibold",
										children: "Interlocuteur (optionnel) :"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "stepInterlocuteurInput",
										value: stepInterlocuteur,
										onChange: (e) => setStepInterlocuteur(e.target.value),
										placeholder: "ex: Sophie Durand (Talent Acquisition)",
										className: "text-xs bg-background"
									})]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "stepNoteInput",
										className: "text-xs font-semibold",
										children: "Commentaire / Note d'étape :"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "stepNoteInput",
										value: stepNote,
										onChange: (e) => setStepNote(e.target.value),
										placeholder: "ex: Dossier envoyé via le formulaire recruteur",
										className: "text-xs bg-background"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:gap-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setChangeStepModalOpen(false),
								children: "Annuler"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								className: "gap-1 font-semibold",
								onClick: handleConfirmChangeStep,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Valider l'étape" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" })]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(editingEvent),
				onOpenChange: (open) => !open && setEditingEvent(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "text-base font-bold flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "size-4 text-primary" }),
								"Modifier l'événement :",
								" ",
								editingEvent ? getWorkflowStepConfig(editingEvent.type).label : ""
							]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "editDateInput",
										className: "text-xs font-semibold",
										children: "Date :"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "editDateInput",
										type: "date",
										value: editDate,
										onChange: (e) => setEditDate(e.target.value),
										className: "text-xs bg-background"
									})]
								}),
								editingEvent?.type === "application_sent" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "editChannelSelect",
										className: "text-xs font-semibold",
										children: "Canal :"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: editChannel,
										onValueChange: setEditChannel,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											id: "editChannelSelect",
											className: "text-xs bg-background",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: CHANNELS_COMMUNICATION.map((ch) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: ch,
											className: "text-xs",
											children: ch
										}, ch)) })]
									})]
								}),
								(editingEvent?.type === "interview" || editingEvent?.type === "second_interview") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "editInterviewTypeSelect",
										className: "text-xs font-semibold",
										children: "Format :"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: editInterviewType,
										onValueChange: setEditInterviewType,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											id: "editInterviewTypeSelect",
											className: "text-xs bg-background",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: TYPES_ENTRETIEN.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: t,
											className: "text-xs",
											children: t
										}, t)) })]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "editInterlocuteurInput",
										className: "text-xs font-semibold",
										children: "Interlocuteur :"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "editInterlocuteurInput",
										value: editInterlocuteur,
										onChange: (e) => setEditInterlocuteur(e.target.value),
										className: "text-xs bg-background"
									})]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "editNoteInput",
										className: "text-xs font-semibold",
										children: "Note / Détails :"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "editNoteInput",
										value: editNote,
										onChange: (e) => setEditNote(e.target.value),
										className: "text-xs bg-background"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:gap-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setEditingEvent(null),
								children: "Annuler"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: handleSaveEditEvent,
								children: "Enregistrer"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: customEventModalOpen,
				onOpenChange: setCustomEventModalOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "text-base font-bold flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4 text-primary" }), "Ajouter une entrée au journal"]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs font-semibold",
										children: "Type d'étape :"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: customEventType,
										onValueChange: (v) => setCustomEventType(v),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											className: "text-xs bg-background",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: WORKFLOW_STEPS_CONFIG.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: s.key,
											className: "text-xs",
											children: s.label
										}, s.key)) })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs font-semibold",
										children: "Date :"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "date",
										value: customEventDate,
										onChange: (e) => setCustomEventDate(e.target.value),
										className: "text-xs bg-background"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs font-semibold",
										children: "Détail ou note :"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: customEventNote,
										onChange: (e) => setCustomEventNote(e.target.value),
										placeholder: "ex: Rappel téléphonique avec le RH",
										className: "text-xs bg-background"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:gap-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setCustomEventModalOpen(false),
								children: "Annuler"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: handleAddCustomEvent,
								children: "Ajouter"
							})]
						})
					]
				})
			})
		]
	});
}
function CandidatureSheet({ open, onOpenChange, value, onSave, existingItems, onOpenExisting }) {
	const [form, setForm] = (0, import_react.useState)(null);
	const [mode, setMode] = (0, import_react.useState)("menu");
	const [pastedText, setPastedText] = (0, import_react.useState)("");
	const [optionalUrl, setOptionalUrl] = (0, import_react.useState)("");
	const [analyzing, setAnalyzing] = (0, import_react.useState)(false);
	const [errorMsg, setErrorMsg] = (0, import_react.useState)(null);
	const [duplicateMatch, setDuplicateMatch] = (0, import_react.useState)(null);
	const [activeTab, setActiveTab] = (0, import_react.useState)("offre");
	(0, import_react.useEffect)(() => {
		if (open && value) {
			const normalized = normalizeCandidature(value);
			setForm(normalized);
			setErrorMsg(null);
			setDuplicateMatch(null);
			setActiveTab("offre");
			if (!value.entreprise && !value.poste) {
				setMode("menu");
				setPastedText("");
				setOptionalUrl("");
			} else {
				setMode("form");
				if (value.detail) setPastedText(value.detail);
				if (value.lien) setOptionalUrl(value.lien);
			}
			setAnalyzing(false);
		}
	}, [open, value]);
	if (!form) return null;
	const set = (partial) => {
		setForm((prev) => prev ? normalizeCandidature({
			...prev,
			...partial
		}) : prev);
	};
	const setPrep = (partial) => setForm((prev) => prev ? {
		...prev,
		preparation: {
			...prev.preparation ?? emptyPreparation(),
			...partial
		}
	} : prev);
	const handleAnalyze = async () => {
		if (!pastedText.trim() || pastedText.trim().length < 15) {
			setErrorMsg("Veuillez coller le texte de l'offre (au moins 15 caractères).");
			return;
		}
		setAnalyzing(true);
		setErrorMsg(null);
		try {
			const extracted = await extraireOpportuniteServerFn({ data: {
				text: pastedText,
				url: optionalUrl.trim() || void 0
			} });
			const missionsList = Array.isArray(extracted.missions) ? extracted.missions : [];
			const missionsStr = missionsList.length > 0 ? missionsList.map((m) => `• ${m}`).join("\n") : typeof extracted.missions === "string" ? extracted.missions : form.missions;
			const updated = normalizeCandidature({
				...form,
				...extracted,
				missions: missionsStr,
				missionsList: missionsList.length > 0 ? missionsList : form.missionsList,
				detail: pastedText,
				lien: optionalUrl.trim() || extracted.sourceUrl || form.lien,
				sourceUrl: optionalUrl.trim() || extracted.sourceUrl || form.sourceUrl,
				statut: form.statut || "Sauvegardée",
				status: form.status || form.statut || "Sauvegardée"
			});
			const allItems = existingItems || loadCandidatures();
			const duplicate = findPotentialDuplicate(updated, allItems);
			if (duplicate) setDuplicateMatch(duplicate);
			setForm(updated);
			setMode("form");
		} catch (err) {
			console.error("Erreur lors de l'extraction de l'offre :", err);
			let message = err?.message || "Impossible d'extraire l'offre avec l'IA.";
			if (message.includes("503") || message.includes("high demand") || message.includes("UNAVAILABLE")) message = "Les serveurs de l'IA connaissent un pic de demande temporaire. Veuillez patienter quelques instants et réessayer.";
			else if (message.includes("429") || message.includes("RESOURCE_EXHAUSTED")) message = "Limite de requêtes atteinte temporairement. Veuillez réessayer dans quelques secondes.";
			setErrorMsg(message);
		} finally {
			setAnalyzing(false);
		}
	};
	const handleOpenDuplicate = () => {
		if (duplicateMatch) {
			if (onOpenExisting) onOpenExisting(duplicateMatch);
			else setForm(normalizeCandidature(duplicateMatch));
			setDuplicateMatch(null);
		}
	};
	const handleIgnoreDuplicate = () => {
		setDuplicateMatch(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CenterModal, {
		open,
		onOpenChange,
		size: "xl",
		className: "max-w-4xl",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-2",
			children: mode === "menu" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ajouter une opportunité" }) : mode === "paste" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Extraire l'offre avec l'IA" })]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-4 text-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate max-w-[400px]",
						children: form.poste || "Nouvelle opportunité"
					}),
					form.entreprise && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs font-normal text-muted-foreground",
						children: ["chez ", form.entreprise]
					})
				]
			})
		}),
		description: mode === "menu" ? "Choisissez comment renseigner les informations de l'offre." : mode === "paste" ? "Collez le texte brut copié depuis un site d'emploi ou une annonce." : "Vérifiez et ajustez les données extraites avant d'enregistrer.",
		children: [
			mode === "menu" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 grid gap-3 max-w-lg mx-auto py-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-base mb-1",
							children: "Comment souhaitez-vous ajouter cette opportunité ?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "L'Opportunity Intelligence de NACORA extrait automatiquement l'entreprise, les missions, les compétences, métriques et modalités."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "h-20 justify-start gap-4 p-4 border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all text-left",
						onClick: () => setMode("paste"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-primary/10 text-primary p-3 rounded-xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-sm",
									children: "Coller le texte de l'offre (IA)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: "bg-primary/20 text-primary border-none text-[10px] py-0 px-1.5",
									children: "Recommandé"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Copiez-collez l'annonce entière depuis LinkedIn, JobTeaser, WTTJ, etc."
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative my-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 flex items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-full border-t border-border/50" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative flex justify-center text-[11px] uppercase",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-card px-3 text-muted-foreground font-medium",
								children: "Ou"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						className: "h-14 justify-start gap-3 border border-border/60 hover:bg-muted/30",
						onClick: () => setMode("form"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-muted text-muted-foreground p-2 rounded-lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-sm",
								children: "Saisie manuelle"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "Remplir vous-même les champs un par un"
							})]
						})]
					})
				]
			}),
			mode === "paste" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 flex flex-col gap-4",
				children: [
					errorMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive flex items-start gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: errorMsg })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "optionalUrl",
							className: "text-xs font-semibold",
							children: "Lien internet de l'offre (facultatif)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "optionalUrl",
							placeholder: "https://...",
							value: optionalUrl,
							onChange: (e) => setOptionalUrl(e.target.value),
							disabled: analyzing,
							className: "text-xs h-9 bg-background"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 flex-1 flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "rawOfferText",
								className: "text-xs font-semibold",
								children: "Texte brut de l'offre d'emploi / stage *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[11px] text-muted-foreground",
								children: [pastedText.length, " caractères"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "rawOfferText",
							placeholder: "Collez ici l'intégralité de l'offre : intitulé, missions, profil recherché, à propos de l'entreprise, avantages, etc...",
							className: "h-64 resize-none font-mono text-xs leading-relaxed bg-background/50 border-border/60",
							value: pastedText,
							onChange: (e) => {
								setPastedText(e.target.value);
								if (errorMsg) setErrorMsg(null);
							},
							disabled: analyzing
						})]
					}),
					analyzing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-4 px-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-3 animate-pulse",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs space-y-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-foreground",
								children: "Opportunity Intelligence en cours d'analyse..."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: "Extraction des missions, compétences obligatoires/atouts, métriques et processus."
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 pt-2 border-t border-border/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setMode("menu"),
							disabled: analyzing,
							children: "Retour"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => setMode("form"),
								disabled: analyzing,
								className: "text-xs text-muted-foreground",
								children: "Passer en saisie manuelle"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								disabled: !pastedText.trim() || analyzing,
								onClick: handleAnalyze,
								className: "gap-2 px-5",
								children: [analyzing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), "Extraire avec l'IA"]
							})]
						})]
					})
				]
			}),
			mode === "form" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col h-[75vh] max-h-[820px] min-h-[500px]",
				children: [
					duplicateMatch && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "m-4 mb-2 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 text-amber-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-amber-700 dark:text-amber-400",
									children: "Cette opportunité semble déjà exister dans NACORA :"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-medium text-foreground",
									children: [
										duplicateMatch.entreprise,
										" — ",
										duplicateMatch.poste
									]
								})
							] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								className: "h-7 text-xs border-amber-500/40 text-amber-700 dark:text-amber-300",
								onClick: handleOpenDuplicate,
								children: "Ouvrir l'existante"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								className: "h-7 text-xs text-muted-foreground hover:text-foreground",
								onClick: handleIgnoreDuplicate,
								children: "Conserver celle-ci"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-5 py-3 border-b border-border/50 bg-muted/15 flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-bold text-sm sm:text-base text-foreground",
									children: form.poste || "Poste sans titre"
								}), form.entreprise && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									className: "font-semibold text-xs",
									children: form.entreprise
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
								children: [
									form.contractType && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-3" }),
											" ",
											form.contractType
										]
									}),
									form.duration && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }),
											" ",
											form.duration
										]
									}),
									form.lieu && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3" }),
											" ",
											form.lieu
										]
									}),
									form.remotePolicy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										className: "text-[10px] py-0",
										children: form.remotePolicy
									}),
									form.salary ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Euro, { className: "size-3" }),
											" ",
											form.salary
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-muted-foreground/60 italic",
										children: "Salaire non renseigné"
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								className: "h-7 text-xs gap-1.5",
								onClick: () => setMode("paste"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3" }), " Ré-extraire"]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
						value: activeTab,
						onValueChange: (v) => setActiveTab(v),
						className: "flex-1 flex flex-col min-h-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-b px-5 bg-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								className: "w-full justify-start h-10 p-0 bg-transparent gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "offre",
										className: "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-1.5 text-xs font-semibold",
										children: "Offre & Missions"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "profil",
										className: "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-1.5 text-xs font-semibold",
										children: "Profil & Recrutement"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
										value: "entreprise",
										className: "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-1.5 text-xs font-semibold",
										children: [
											"Entreprise (",
											form.companyMetrics?.length || 0,
											" métriques)"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
										value: "workflow",
										className: "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-1.5 text-xs font-semibold flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitFork, { className: "size-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Workflow" })]
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 overflow-y-auto p-5 sm:p-6 space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
									value: "offre",
									className: "mt-0 space-y-5 data-[state=inactive]:hidden",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-4 sm:grid-cols-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid gap-1.5 sm:col-span-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "titleInput",
														className: "text-xs font-semibold",
														children: "Intitulé exact du poste *"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "titleInput",
														value: form.poste,
														onChange: (e) => set({
															poste: e.target.value,
															title: e.target.value
														}),
														placeholder: "ex: Stage – Marketing & Engagement Utilisateurs (Application Mobile)",
														className: "bg-background text-xs"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "companyInput",
														className: "text-xs font-semibold",
														children: "Entreprise *"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "companyInput",
														value: form.entreprise,
														onChange: (e) => set({
															entreprise: e.target.value,
															company: e.target.value,
															companyName: e.target.value
														}),
														placeholder: "ex: EXO",
														className: "bg-background text-xs"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "contractTypeInput",
														className: "text-xs font-semibold",
														children: "Type de contrat"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "contractTypeInput",
														value: form.contractType || "",
														onChange: (e) => set({ contractType: e.target.value }),
														placeholder: "ex: Stage, CDI, Alternance (Non renseigné si vide)",
														className: "bg-background text-xs"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "durationInput",
														className: "text-xs font-semibold",
														children: "Durée"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "durationInput",
														value: form.duration || "",
														onChange: (e) => set({ duration: e.target.value }),
														placeholder: "ex: 3 à 6 mois, 6 mois",
														className: "bg-background text-xs"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "locationInput",
														className: "text-xs font-semibold",
														children: "Lieu / Localisation"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "locationInput",
														value: form.lieu,
														onChange: (e) => set({
															lieu: e.target.value,
															location: e.target.value
														}),
														placeholder: "ex: Paris, France",
														className: "bg-background text-xs"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "startDateInput",
														className: "text-xs font-semibold",
														children: "Date de début"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "startDateInput",
														value: form.startDate || "",
														onChange: (e) => set({ startDate: e.target.value }),
														placeholder: "ex: Dès que possible, Septembre 2026",
														className: "bg-background text-xs"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "applicationDeadlineInput",
														className: "text-xs font-semibold",
														children: "Date limite de candidature"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "applicationDeadlineInput",
														type: "date",
														value: form.dateLimite || form.applicationDeadline || "",
														onChange: (e) => set({
															dateLimite: e.target.value,
															applicationDeadline: e.target.value
														}),
														className: "bg-background text-xs"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "remotePolicyInput",
														className: "text-xs font-semibold",
														children: "Télétravail (Politique & Détails)"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "remotePolicyInput",
														value: form.remoteDetails ? `${form.remotePolicy || "Partiel"} — ${form.remoteDetails}` : form.remotePolicy || "",
														onChange: (e) => set({ remotePolicy: e.target.value }),
														placeholder: "ex: Partiel — 1 jour de télétravail par semaine",
														className: "bg-background text-xs"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "salaryInput",
														className: "text-xs font-semibold",
														children: "Rémunération / Salaire"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "salaryInput",
														value: form.salary || "",
														onChange: (e) => set({ salary: e.target.value }),
														placeholder: "ex: Selon profil, 1200€ / mois (Non renseigné)",
														className: "bg-background text-xs"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid gap-1.5 sm:col-span-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "sourceUrlInput",
														className: "text-xs font-semibold",
														children: "Lien source de l'offre"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "sourceUrlInput",
															value: form.lien || form.sourceUrl || "",
															onChange: (e) => set({
																lien: e.target.value,
																sourceUrl: e.target.value
															}),
															placeholder: "https://...",
															className: "bg-background text-xs flex-1"
														}), (form.lien || form.sourceUrl) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															variant: "outline",
															size: "sm",
															asChild: true,
															className: "h-9 px-3 shrink-0",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
																href: form.lien || form.sourceUrl || "#",
																target: "_blank",
																rel: "noreferrer",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })
															})
														})]
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-3 pt-4 border-t border-border/40",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex items-center justify-between",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
														htmlFor: "missionsTextarea",
														className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
														children: [
															"Missions clés & Responsabilités (",
															form.missionsList?.length || 0,
															")"
														]
													})
												}),
												form.missionsList && form.missionsList.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "space-y-2",
													children: form.missionsList.map((m, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-start gap-2.5 p-2.5 rounded-xl border border-border/50 bg-card/60 text-xs leading-relaxed",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-primary mt-0.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "flex-1",
															children: m
														})]
													}, idx))
												}) : null,
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[11px] text-muted-foreground",
														children: "Modifier la liste des missions (une par ligne) :"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
														id: "missionsTextarea",
														rows: 4,
														value: typeof form.missions === "string" ? form.missions : Array.isArray(form.missions) ? form.missions.join("\n") : "",
														onChange: (e) => {
															const val = e.target.value || "";
															const list = val.split("\n").map((line) => line.replace(/^[•\-*]\s*/, "").trim()).filter(Boolean);
															set({
																missions: val,
																missionsList: list
															});
														},
														placeholder: "• Mission 1\n• Mission 2",
														className: "bg-background text-xs font-mono"
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "pt-4 border-t border-border/40",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagListEditor, {
												label: "Avantages & Environnement",
												items: form.benefits || [],
												onChange: (items) => set({ benefits: items }),
												placeholder: "Ajouter un avantage (ex: 1j télétravail, Teambuilding, etc.)...",
												badgeClassName: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
												emptyText: "Aucun avantage spécifié dans l'offre."
											})
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
									value: "profil",
									className: "mt-0 space-y-6 data-[state=inactive]:hidden",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagListEditor, {
											label: "Compétences indispensables / requises",
											items: form.requiredSkills || [],
											onChange: (items) => set({ requiredSkills: items }),
											placeholder: "ex: Analyse de données, Gestion de projet...",
											badgeClassName: "bg-primary/10 text-primary border-primary/30",
											emptyText: "Aucune compétence obligatoire distincte identifiée."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagListEditor, {
											label: "Compétences appréciées (Atouts)",
											items: form.preferredSkills || [],
											onChange: (items) => set({ preferredSkills: items }),
											placeholder: "ex: Connaissance de l'écosystème mobile...",
											badgeClassName: "bg-lilac/10 text-lilac border-lilac/30",
											emptyText: "Aucune compétence secondaire identifiée."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagListEditor, {
											label: "Outils, Logiciels & Plateformes",
											items: form.tools || [],
											onChange: (items) => set({ tools: items }),
											placeholder: "ex: TikTok, Instagram, Notion, Excel, Figma...",
											badgeClassName: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30",
											emptyText: "Aucun outil spécifique identifié."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagListEditor, {
											label: "Qualités humaines & Soft skills",
											items: form.qualities || [],
											onChange: (items) => set({ qualities: items }),
											placeholder: "ex: Créativité, Rigueur, Curiosité, Esprit d'équipe...",
											badgeClassName: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30",
											emptyText: "Aucune qualité spécifique listée."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguagesEditor, {
											requiredLanguages: form.requiredLanguages || [],
											preferredLanguages: form.preferredLanguages || [],
											onChangeRequired: (req) => set({ requiredLanguages: req }),
											onChangePreferred: (pref) => set({ preferredLanguages: pref })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-4 sm:grid-cols-2 pt-4 border-t border-border/40",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "eduReqInput",
													className: "text-xs font-semibold",
													children: "Formation & Diplômes acceptés"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "eduReqInput",
													value: form.educationRequirements?.join(" ; ") || form.educationLevel || "",
													onChange: (e) => set({
														educationLevel: e.target.value,
														educationRequirements: e.target.value.split(";").map((s) => s.trim()).filter(Boolean)
													}),
													placeholder: "ex: Master, MSc ou PGE ; Bac+3, Bachelor",
													className: "bg-background text-xs"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "expReqInput",
													className: "text-xs font-semibold",
													children: "Expérience requise"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "expReqInput",
													value: form.experienceRequirements || "",
													onChange: (e) => set({ experienceRequirements: e.target.value }),
													placeholder: "ex: Débutant accepté, 1 an minimum...",
													className: "bg-background text-xs"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pt-4 border-t border-border/40 space-y-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessStepsEditor, {
												steps: form.recruitmentProcess || [],
												onChange: (steps) => set({ recruitmentProcess: steps })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagListEditor, {
												label: "Documents demandés & Éléments différenciants",
												items: form.applicationRequirements || [],
												onChange: (items) => set({ applicationRequirements: items }),
												placeholder: "ex: Message court, CV, TikTok/jeu facultatif...",
												badgeClassName: "bg-card text-foreground border-border",
												emptyText: "Non renseigné."
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
									value: "entreprise",
									className: "mt-0 space-y-6 data-[state=inactive]:hidden",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "companyDescInput",
												className: "text-xs font-semibold",
												children: "Description de l'entreprise"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
												id: "companyDescInput",
												rows: 3,
												value: form.companyDescription || "",
												onChange: (e) => set({ companyDescription: e.target.value }),
												placeholder: "Présentation des activités, de la mission et de la vision...",
												className: "bg-background text-xs leading-relaxed"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-4 sm:grid-cols-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "compSectorInput",
														className: "text-xs font-semibold",
														children: "Secteur d'activité"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "compSectorInput",
														value: form.secteur || form.companySector || "",
														onChange: (e) => set({
															secteur: e.target.value,
															companySector: e.target.value
														}),
														placeholder: "ex: Loisirs / Culture / Sports, Tech...",
														className: "bg-background text-xs"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "compSizeInput",
														className: "text-xs font-semibold",
														children: "Taille de l'entreprise"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "compSizeInput",
														value: form.companySize || "",
														onChange: (e) => set({ companySize: e.target.value }),
														placeholder: "ex: 20 employés, Start-up...",
														className: "bg-background text-xs"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "compLocInput",
														className: "text-xs font-semibold",
														children: "Siège / Bureaux"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "compLocInput",
														value: form.companyLocation || "",
														onChange: (e) => set({ companyLocation: e.target.value }),
														placeholder: "ex: Paris 2e, France",
														className: "bg-background text-xs"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "compWebInput",
														className: "text-xs font-semibold",
														children: "Site web officiel"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "compWebInput",
														value: form.companyWebsite || "",
														onChange: (e) => set({ companyWebsite: e.target.value }),
														placeholder: "https://... (Non renseigné si absent)",
														className: "bg-background text-xs"
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricsEditor, {
											metrics: form.companyMetrics || [],
											onChange: (metrics) => set({ companyMetrics: metrics })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagListEditor, {
											label: "Contexte de croissance & Faits marquants",
											items: form.companyContext || [],
											onChange: (items) => set({ companyContext: items }),
											placeholder: "ex: Levée de fonds de 1 M€, 1 000 000 € de cadeaux distribués...",
											badgeClassName: "bg-primary/10 text-primary border-primary/20",
											emptyText: "Aucun fait de contexte spécifique détecté."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagListEditor, {
											label: "Partenaires & Clients cités",
											items: form.companyPartners || [],
											onChange: (items) => set({ companyPartners: items }),
											placeholder: "ex: Nike, Garmin, Feed, Gymshark...",
											badgeClassName: "bg-card text-foreground border-border",
											emptyText: "Aucun partenaire cité dans l'offre."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
									value: "workflow",
									className: "mt-0 space-y-6 data-[state=inactive]:hidden",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkflowTab, {
										candidature: form,
										onChange: (patch) => set(patch)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 sm:p-5 rounded-2xl bg-card border border-border/70 space-y-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-xs font-bold uppercase tracking-wider text-foreground",
												children: "Préparation de candidature (Arguments)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] text-muted-foreground",
												children: "Pour préparer vos entretiens et lettres"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-4 sm:grid-cols-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "prepEnt",
													className: "text-xs font-semibold",
													children: "Pourquoi cette entreprise ?"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
													id: "prepEnt",
													rows: 3,
													value: form.preparation?.pourquoiEntreprise || "",
													onChange: (e) => setPrep({ pourquoiEntreprise: e.target.value }),
													placeholder: "Alignement avec vos valeurs, secteur, produits que vous utilisez...",
													className: "text-xs bg-background resize-y"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "prepPoste",
													className: "text-xs font-semibold",
													children: "Pourquoi ce poste ?"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
													id: "prepPoste",
													rows: 3,
													value: form.preparation?.pourquoiPoste || "",
													onChange: (e) => setPrep({ pourquoiPoste: e.target.value }),
													placeholder: "Missions clés, compétences que vous souhaitez développer, impact attendu...",
													className: "text-xs bg-background resize-y"
												})]
											})]
										})]
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 p-4 border-t border-border/50 bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => onOpenChange(false),
							className: "text-xs",
							children: "Annuler"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: () => {
									onSave(form);
									onOpenChange(false);
								},
								className: "gap-2 px-6 text-xs font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), "Enregistrer l'opportunité"]
							})
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { createSsrRpc as n, CandidatureSheet as t };

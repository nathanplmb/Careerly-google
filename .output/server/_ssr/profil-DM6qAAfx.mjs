import { o as __toESM } from "../_runtime.mjs";
import { c as _enum, d as number, f as object, l as array, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as cn, t as Button } from "./button-DDzEUEFj.mjs";
import { $ as GraduationCap, A as Phone, At as ChevronDown, C as ScanText, D as RefreshCw, Dt as ChevronUp, Et as CircleAlert, Ft as Building, G as LayoutDashboard, Ht as ArrowRight, I as MapPin, K as Languages, L as Mail, Lt as Briefcase, M as PanelsTopLeft, Mt as Calendar, O as Plus, P as MessageSquareQuote, Q as HeartHandshake, T as Save, Tt as CircleCheck, U as Linkedin, V as LoaderCircle, Vt as Award, W as Lightbulb, Z as Heart, _t as DollarSign, bt as Compass, d as TriangleAlert, dt as Eye, et as Globe, f as TrendingUp, g as Target, gt as Download, ht as Earth, it as Flame, jt as Check, lt as FileCode, n as X, ot as FileText, p as Trash2, pt as ExternalLink, q as Key, r as Wrench, rt as FolderDot, s as UserRound, t as Zap, tt as Github, v as Sparkles, vt as Cpu, xt as CloudUpload, y as ShieldCheck, yt as Copy } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-JIGp6MTc.mjs";
import { r as createServerFn } from "./server-vg2yPy0D.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BzNacVbR.mjs";
import { C as saveProfilLocal, _ as nouvelleCertification, b as nouvelleFormation, c as emptyProfil, g as nouveauProjet, h as nouveauBenevolat, i as completionCv, m as normaliserCvStructure, n as NIVEAUX_LANGUE, o as cvStructureEnTexte, p as loadProfil, t as NIVEAUX_COMPETENCE, v as nouvelleCompetence, x as nouvelleLangue, y as nouvelleExperience } from "./auth-local-B6tKCByM.mjs";
import { n as fetchProfil, r as saveProfilCloud, t as createSsrRpc } from "./profil-cloud-GRdvg22b.mjs";
import { a as DialogHeader, c as Label, n as DialogContent, o as DialogTitle, r as DialogDescription, s as Input, t as Dialog } from "./dialog-B3Jp4UDR.mjs";
import { t as Textarea } from "./textarea-CNcwtOlr.mjs";
import { s as profilEnTexte } from "./match-run-Bhrc1Shm.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BAFTKIAY.mjs";
import { t as Progress } from "./progress-cTKs2o6Y.mjs";
import { n as calculerCompletudeProfil, t as Badge } from "./profil-completion-C5jI9RaO.mjs";
import { t as useSession } from "./useSession-D5EIlFSn.mjs";
import { a as Viewport, i as ScrollAreaThumb, n as Root, r as ScrollAreaScrollbar, t as Corner } from "../_libs/radix-ui__react-scroll-area.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profil-DM6qAAfx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var ACCEPTED_CV_TYPES = ".pdf,.docx,.txt,.md,.rtf";
var MAX_FILE_SIZE = 20971520;
async function readCVDocument(file) {
	if (typeof ReadableStream !== "undefined" && !ReadableStream.prototype[Symbol.asyncIterator]) ReadableStream.prototype[Symbol.asyncIterator] = async function* () {
		const reader = this.getReader();
		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) return;
				yield value;
			}
		} finally {
			reader.releaseLock();
		}
	};
	const fileName = file.name || "document";
	const fileSize = file.size;
	const lowerName = fileName.toLowerCase();
	if (fileSize === 0) throw new Error("Ce fichier est vide.");
	if (fileSize > MAX_FILE_SIZE) throw new Error("Ce fichier dépasse 20 Mo. Veuillez utiliser un fichier plus léger.");
	let fileType = "autre";
	let pages = [];
	let plainText = "";
	if (lowerName.endsWith(".pdf")) {
		fileType = "pdf";
		const res = await readPdfDocument(file);
		pages = res.pages;
		plainText = res.plainText;
	} else if (lowerName.endsWith(".docx")) {
		fileType = "docx";
		const res = await readDocxDocument(file);
		pages = res.pages;
		plainText = res.plainText;
	} else if (lowerName.endsWith(".txt") || lowerName.endsWith(".md")) {
		fileType = "txt";
		const text = (await file.text()).trim();
		pages = [{
			pageNumber: 1,
			blocks: [{ text }],
			text
		}];
		plainText = text;
	} else if (lowerName.endsWith(".rtf")) {
		fileType = "rtf";
		const text = await readRtfDocument(file);
		pages = [{
			pageNumber: 1,
			blocks: [{ text }],
			text
		}];
		plainText = text;
	} else if (lowerName.endsWith(".doc")) throw new Error("Le format .doc binaire ancien n'est pas pris en charge de façon fiable. Veuillez exporter votre CV en PDF ou .docx.");
	else throw new Error("Format non pris en charge. Veuillez sélectionner un fichier PDF, DOCX ou TXT.");
	if (plainText.trim().length < 40) throw new Error("Le document ne contient pas assez de texte lisible. S'il s'agit d'un scan ou d'une image, veuillez utiliser un PDF avec du texte sélectionnable.");
	return {
		fileName,
		fileSize,
		fileType,
		pages,
		plainText
	};
}
async function readPdfDocument(file) {
	const pdfjs = await import("../_libs/pdfjs-dist.mjs").then((n) => n.t);
	const workerUrl = (await import("./pdf.worker.min-B_MS44GK.mjs")).default;
	pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
	const buffer = await file.arrayBuffer();
	const doc = await pdfjs.getDocument({ data: new Uint8Array(buffer) }).promise;
	const pages = [];
	for (let i = 1; i <= doc.numPages; i++) {
		const content = await (await doc.getPage(i)).getTextContent();
		const items = [];
		for (const it of content.items) if ("str" in it && typeof it.str === "string" && it.str.trim().length > 0) {
			const transform = it.transform || [
				1,
				0,
				0,
				1,
				0,
				0
			];
			const x = transform[4];
			const y = transform[5];
			items.push({
				text: it.str,
				x,
				y,
				width: it.width || 0,
				height: it.height || 0,
				page: i
			});
		}
		if (items.length === 0) continue;
		const midX = (Math.min(...items.map((it) => it.x ?? 0)) + Math.max(...items.map((it) => (it.x ?? 0) + (it.width ?? 0)))) / 2;
		const leftColItems = items.filter((it) => (it.x ?? 0) + (it.width ?? 0) <= midX + 20);
		const rightColItems = items.filter((it) => (it.x ?? 0) >= midX - 20);
		const isTwoColumn = leftColItems.length >= 8 && rightColItems.length >= 8 && leftColItems.length + rightColItems.length >= items.length * .8;
		const sortAndBuildLines = (colItems) => {
			const sorted = [...colItems].sort((a, b) => {
				const ay = a.y ?? 0;
				const by = b.y ?? 0;
				if (Math.abs(ay - by) <= 4) return (a.x ?? 0) - (b.x ?? 0);
				return by - ay;
			});
			const lines = [];
			let currentLine = [];
			let lastY = null;
			for (const it of sorted) {
				const currentY = it.y ?? 0;
				if (lastY === null || Math.abs(currentY - lastY) <= 4) {
					currentLine.push(it);
					lastY = currentY;
				} else {
					const lineText = currentLine.map((item) => item.text.trim()).filter(Boolean).join(" ");
					if (lineText) {
						if (lastY !== null && lastY - currentY >= 20) lines.push("");
						lines.push(lineText);
					}
					currentLine = [it];
					lastY = currentY;
				}
			}
			if (currentLine.length > 0) {
				const lineText = currentLine.map((item) => item.text.trim()).filter(Boolean).join(" ");
				if (lineText) lines.push(lineText);
			}
			return lines.join("\n");
		};
		let pageText = "";
		if (isTwoColumn) pageText = `${sortAndBuildLines(leftColItems)}\n\n${sortAndBuildLines(rightColItems)}`;
		else pageText = sortAndBuildLines(items);
		pages.push({
			pageNumber: i,
			blocks: items,
			text: pageText
		});
	}
	return {
		pages,
		plainText: pages.map((p) => p.text).join("\n\n").trim()
	};
}
async function readDocxDocument(file) {
	const mammoth = await import("../_libs/mammoth.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
	const buffer = await file.arrayBuffer();
	const text = (await mammoth.extractRawText({ arrayBuffer: buffer })).value.trim();
	return {
		pages: [{
			pageNumber: 1,
			blocks: text.split(/\n+/).map((p) => p.trim()).filter(Boolean).map((p) => ({
				text: p,
				page: 1
			})),
			text
		}],
		plainText: text
	};
}
async function readRtfDocument(file) {
	return (await file.text()).replace(/\\par[d]?\b/g, "\n").replace(/\\'[0-9a-fA-F]{2}/g, (code) => String.fromCharCode(Number.parseInt(code.slice(2), 16))).replace(/\\[a-zA-Z]+-?\d* ?/g, "").replace(/[{}]/g, "").replace(/\n{3,}/g, "\n\n").trim();
}
var _jsxFileName$20 = "/app/applet/src/components/cv-import/CvUpload.tsx";
function CvUpload({ onFileSelected, disabled }) {
	const [selectedFile, setSelectedFile] = (0, import_react.useState)(null);
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const inputRef = (0, import_react.useRef)(null);
	const handleFile = (file) => {
		setError(null);
		const ext = file.name.split(".").pop()?.toLowerCase();
		if (![
			"pdf",
			"docx",
			"txt",
			"rtf",
			"md"
		].includes(ext || "")) {
			setError("Format non pris en charge. Veuillez sélectionner un fichier PDF ou DOCX.");
			return;
		}
		if (file.size > 20971520) {
			setError("Le fichier dépasse la taille maximale autorisée (20 Mo).");
			return;
		}
		setSelectedFile(file);
	};
	const handleDrop = (e) => {
		e.preventDefault();
		setIsDragging(false);
		if (disabled) return;
		const file = e.dataTransfer.files[0];
		if (file) handleFile(file);
	};
	const handleDragOver = (e) => {
		e.preventDefault();
		if (!disabled) setIsDragging(true);
	};
	const handleDragLeave = () => {
		setIsDragging(false);
	};
	const handleStartAnalysis = () => {
		if (selectedFile) onFileSelected(selectedFile);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-center space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-xl font-bold tracking-tight text-foreground",
					children: "Importer mon CV"
				}, void 0, false, {
					fileName: _jsxFileName$20,
					lineNumber: 57,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm text-muted-foreground max-w-md mx-auto",
					children: "Déposez votre CV pour importer automatiquement les informations réellement présentes dans votre document."
				}, void 0, false, {
					fileName: _jsxFileName$20,
					lineNumber: 60,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$20,
				lineNumber: 56,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				onDrop: handleDrop,
				onDragOver: handleDragOver,
				onDragLeave: handleDragLeave,
				onClick: () => inputRef.current?.click(),
				className: `relative flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${isDragging ? "border-purple-500 bg-purple-500/10 scale-[0.99]" : "border-border/80 bg-card/50 hover:bg-card hover:border-purple-500/50"} ${disabled ? "opacity-50 pointer-events-none" : ""}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						ref: inputRef,
						type: "file",
						accept: ACCEPTED_CV_TYPES,
						className: "hidden",
						onChange: (e) => {
							const f = e.target.files?.[0];
							if (f) handleFile(f);
						}
					}, void 0, false, {
						fileName: _jsxFileName$20,
						lineNumber: 76,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "size-14 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 border border-purple-500/20 shadow-inner",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CloudUpload, { className: "size-7" }, void 0, false, {
							fileName: _jsxFileName$20,
							lineNumber: 88,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$20,
						lineNumber: 87,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm font-semibold text-foreground mb-1",
						children: [
							"Glissez-déposez votre CV ici, ou",
							" ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-purple-400 underline underline-offset-4",
								children: "parcourez vos fichiers"
							}, void 0, false, {
								fileName: _jsxFileName$20,
								lineNumber: 93,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$20,
						lineNumber: 91,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "Formats acceptés : PDF ou DOCX (Max 20 Mo)"
					}, void 0, false, {
						fileName: _jsxFileName$20,
						lineNumber: 97,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$20,
				lineNumber: 65,
				columnNumber: 7
			}, this),
			error && /* @__PURE__ */ (void 0)("div", {
				className: "flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-400",
				children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "size-4 shrink-0" }, void 0, false, {
					fileName: _jsxFileName$20,
					lineNumber: 104,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("span", { children: error }, void 0, false, {
					fileName: _jsxFileName$20,
					lineNumber: 105,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$20,
				lineNumber: 103,
				columnNumber: 9
			}, this),
			selectedFile && /* @__PURE__ */ (void 0)("div", {
				className: "flex items-center justify-between p-4 rounded-xl bg-card border border-purple-500/30 shadow-sm animate-in fade-in slide-in-from-bottom-2",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-3 min-w-0",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "size-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0",
						children: /* @__PURE__ */ (void 0)(FileText, { className: "size-5" }, void 0, false, {
							fileName: _jsxFileName$20,
							lineNumber: 113,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$20,
						lineNumber: 112,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (void 0)("p", {
							className: "text-sm font-medium text-foreground truncate",
							children: selectedFile.name
						}, void 0, false, {
							fileName: _jsxFileName$20,
							lineNumber: 116,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								(selectedFile.size / 1048576).toFixed(2),
								" Mo •",
								" ",
								selectedFile.name.split(".").pop()?.toUpperCase()
							]
						}, void 0, true, {
							fileName: _jsxFileName$20,
							lineNumber: 119,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$20,
						lineNumber: 115,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$20,
					lineNumber: 111,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)(Button, {
					onClick: (e) => {
						e.stopPropagation();
						handleStartAnalysis();
					},
					disabled,
					className: "bg-purple-600 hover:bg-purple-500 text-white gap-2 text-xs font-semibold px-4 shadow-lg shadow-purple-600/20",
					children: [/* @__PURE__ */ (void 0)("span", { children: "Analyser mon CV" }, void 0, false, {
						fileName: _jsxFileName$20,
						lineNumber: 134,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)(ArrowRight, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName$20,
						lineNumber: 135,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$20,
					lineNumber: 126,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$20,
				lineNumber: 110,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$20,
		lineNumber: 55,
		columnNumber: 5
	}, this);
}
var _jsxFileName$19 = "/app/applet/src/components/cv-import/CvAnalysisProgress.tsx";
function CvAnalysisProgress({ status }) {
	const steps = [
		{
			id: "reading",
			label: "Lecture du document",
			icon: FileText,
			activeStatus: ["reading"],
			completedStatus: [
				"segmenting",
				"analyzing",
				"validating",
				"preview",
				"diff",
				"confirmed"
			]
		},
		{
			id: "segmenting",
			label: "Détection des sections",
			icon: PanelsTopLeft,
			activeStatus: ["segmenting"],
			completedStatus: [
				"analyzing",
				"validating",
				"preview",
				"diff",
				"confirmed"
			]
		},
		{
			id: "analyzing",
			label: "Extraction des données",
			icon: ScanText,
			activeStatus: ["analyzing"],
			completedStatus: [
				"validating",
				"preview",
				"diff",
				"confirmed"
			]
		},
		{
			id: "validating",
			label: "Validation de l'intégrité",
			icon: CircleCheck,
			activeStatus: ["validating"],
			completedStatus: [
				"preview",
				"diff",
				"confirmed"
			]
		}
	];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-8 py-8 animate-in fade-in slide-in-from-bottom-4",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "text-center space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "text-xl font-bold tracking-tight text-foreground",
				children: "Analyse en cours..."
			}, void 0, false, {
				fileName: _jsxFileName$19,
				lineNumber: 50,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm text-muted-foreground",
				children: "Le moteur NACORA extrait fidèlement les informations de votre CV."
			}, void 0, false, {
				fileName: _jsxFileName$19,
				lineNumber: 53,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$19,
			lineNumber: 49,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-xs mx-auto space-y-6",
			children: steps.map((step, idx) => {
				const isActive = step.activeStatus.includes(status);
				const isCompleted = step.completedStatus.includes(status);
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: `flex items-center gap-4 transition-opacity duration-500 ${!isActive && !isCompleted ? "opacity-40" : "opacity-100"}`,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: `relative flex size-10 items-center justify-center rounded-full border-2 shrink-0 transition-colors duration-500 ${isActive ? "border-purple-500 bg-purple-500/10 text-purple-400" : isCompleted ? "border-green-500 bg-green-500/10 text-green-400" : "border-border/50 bg-card text-muted-foreground"}`,
						children: [isActive ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-5 animate-spin" }, void 0, false, {
							fileName: _jsxFileName$19,
							lineNumber: 81,
							columnNumber: 19
						}, this) : isCompleted ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-5" }, void 0, false, {
							fileName: _jsxFileName$19,
							lineNumber: 83,
							columnNumber: 19
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(step.icon, { className: "size-5" }, void 0, false, {
							fileName: _jsxFileName$19,
							lineNumber: 85,
							columnNumber: 19
						}, this), idx !== steps.length - 1 && /* @__PURE__ */ (void 0)("div", { className: `absolute top-10 left-1/2 -ml-px w-[2px] h-6 ${isCompleted ? "bg-green-500/50" : "bg-border/50"}` }, void 0, false, {
							fileName: _jsxFileName$19,
							lineNumber: 88,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$19,
						lineNumber: 71,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: `text-sm font-medium truncate ${isActive || isCompleted ? "text-foreground" : "text-muted-foreground"}`,
							children: step.label
						}, void 0, false, {
							fileName: _jsxFileName$19,
							lineNumber: 96,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$19,
						lineNumber: 95,
						columnNumber: 15
					}, this)]
				}, step.id, true, {
					fileName: _jsxFileName$19,
					lineNumber: 65,
					columnNumber: 13
				}, this);
			})
		}, void 0, false, {
			fileName: _jsxFileName$19,
			lineNumber: 58,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$19,
		lineNumber: 48,
		columnNumber: 5
	}, this);
}
var _jsxFileName$18 = "/app/applet/src/components/ui/scroll-area.tsx";
var ScrollArea = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Root, {
	ref,
	className: cn("relative overflow-hidden", className),
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Viewport, {
			className: "h-full w-full rounded-[inherit]",
			children
		}, void 0, false, {
			fileName: _jsxFileName$18,
			lineNumber: 15,
			columnNumber: 5
		}, void 0),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollBar, {}, void 0, false, {
			fileName: _jsxFileName$18,
			lineNumber: 18,
			columnNumber: 5
		}, void 0),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Corner, {}, void 0, false, {
			fileName: _jsxFileName$18,
			lineNumber: 19,
			columnNumber: 5
		}, void 0)
	]
}, void 0, true, {
	fileName: _jsxFileName$18,
	lineNumber: 10,
	columnNumber: 3
}, void 0));
ScrollArea.displayName = Root.displayName;
var ScrollBar = import_react.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollAreaScrollbar, {
	ref,
	orientation,
	className: cn("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" }, void 0, false, {
		fileName: _jsxFileName$18,
		lineNumber: 41,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$18,
	lineNumber: 28,
	columnNumber: 3
}, void 0));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;
var _jsxFileName$17 = "/app/applet/src/components/cv-import/CvImportPreview.tsx";
function CvImportPreview({ result, onConfirm, onCancel }) {
	const { metadata, warnings } = result;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6 animate-in fade-in zoom-in-95 duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-xl font-bold tracking-tight text-foreground",
					children: "Aperçu de l'extraction"
				}, void 0, false, {
					fileName: _jsxFileName$17,
					lineNumber: 35,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm text-muted-foreground",
					children: "Vérifiez les informations détectées dans votre document."
				}, void 0, false, {
					fileName: _jsxFileName$17,
					lineNumber: 38,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$17,
					lineNumber: 34,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						size: "sm",
						onClick: onCancel,
						className: "text-xs",
						children: "Annuler"
					}, void 0, false, {
						fileName: _jsxFileName$17,
						lineNumber: 43,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						onClick: onConfirm,
						className: "bg-purple-600 hover:bg-purple-500 text-white text-xs gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$17,
							lineNumber: 51,
							columnNumber: 13
						}, this), "Importer dans mon profil"]
					}, void 0, true, {
						fileName: _jsxFileName$17,
						lineNumber: 46,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$17,
					lineNumber: 42,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$17,
				lineNumber: 33,
				columnNumber: 7
			}, this),
			warnings.length > 0 && /* @__PURE__ */ (void 0)("div", {
				className: "p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-sm text-orange-400 space-y-2",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-2 font-semibold",
					children: [/* @__PURE__ */ (void 0)(TriangleAlert, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName$17,
						lineNumber: 60,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("span", { children: "Remarques sur l'extraction" }, void 0, false, {
						fileName: _jsxFileName$17,
						lineNumber: 61,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$17,
					lineNumber: 59,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("ul", {
					className: "list-disc pl-5 space-y-1 text-xs",
					children: warnings.map((w, idx) => /* @__PURE__ */ (void 0)("li", { children: w.message }, idx, false, {
						fileName: _jsxFileName$17,
						lineNumber: 65,
						columnNumber: 15
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$17,
					lineNumber: 63,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$17,
				lineNumber: 58,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollArea, {
				className: "h-[400px] sm:h-[500px] pr-4",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-6 pb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border/50 pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "flex size-6 rounded bg-card items-center justify-center border border-border/50",
									children: "👤"
								}, void 0, false, {
									fileName: _jsxFileName$17,
									lineNumber: 76,
									columnNumber: 15
								}, this), "Identité"]
							}, void 0, true, {
								fileName: _jsxFileName$17,
								lineNumber: 75,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid grid-cols-2 gap-4 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground block text-xs",
										children: "Prénom & Nom"
									}, void 0, false, {
										fileName: _jsxFileName$17,
										lineNumber: 83,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-medium",
										children: [
											result.identity.firstName,
											" ",
											result.identity.lastName
										]
									}, void 0, true, {
										fileName: _jsxFileName$17,
										lineNumber: 84,
										columnNumber: 17
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$17,
										lineNumber: 82,
										columnNumber: 15
									}, this),
									result.identity.professionalTitle && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-muted-foreground block text-xs",
										children: "Titre"
									}, void 0, false, {
										fileName: _jsxFileName$17,
										lineNumber: 90,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "font-medium",
										children: result.identity.professionalTitle
									}, void 0, false, {
										fileName: _jsxFileName$17,
										lineNumber: 91,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$17,
										lineNumber: 89,
										columnNumber: 17
									}, this),
									result.identity.email && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-muted-foreground block text-xs",
										children: "Email"
									}, void 0, false, {
										fileName: _jsxFileName$17,
										lineNumber: 96,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "font-medium",
										children: result.identity.email
									}, void 0, false, {
										fileName: _jsxFileName$17,
										lineNumber: 97,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$17,
										lineNumber: 95,
										columnNumber: 17
									}, this),
									result.identity.city && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-muted-foreground block text-xs",
										children: "Ville"
									}, void 0, false, {
										fileName: _jsxFileName$17,
										lineNumber: 102,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "font-medium",
										children: result.identity.city
									}, void 0, false, {
										fileName: _jsxFileName$17,
										lineNumber: 103,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$17,
										lineNumber: 101,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$17,
								lineNumber: 81,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$17,
							lineNumber: 74,
							columnNumber: 11
						}, this),
						result.experiences.length > 0 && /* @__PURE__ */ (void 0)("section", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (void 0)("h3", {
								className: "text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border/50 pb-2",
								children: [
									/* @__PURE__ */ (void 0)(Briefcase, { className: "size-4 text-blue-400" }, void 0, false, {
										fileName: _jsxFileName$17,
										lineNumber: 113,
										columnNumber: 17
									}, this),
									"Expériences (",
									metadata.counts.experiences,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName$17,
								lineNumber: 112,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "space-y-3",
								children: result.experiences.map((exp) => /* @__PURE__ */ (void 0)("div", {
									className: "p-3 rounded-lg bg-card border border-border/60",
									children: /* @__PURE__ */ (void 0)("div", {
										className: "flex justify-between items-start gap-4",
										children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
											className: "font-medium text-sm",
											children: exp.title
										}, void 0, false, {
											fileName: _jsxFileName$17,
											lineNumber: 121,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "text-xs text-muted-foreground",
											children: exp.company
										}, void 0, false, {
											fileName: _jsxFileName$17,
											lineNumber: 122,
											columnNumber: 25
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$17,
											lineNumber: 120,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "text-xs text-muted-foreground whitespace-nowrap text-right",
											children: [
												exp.startDate || "?",
												" ",
												/* @__PURE__ */ (void 0)(ArrowRight, { className: "inline size-3 mx-1" }, void 0, false, {
													fileName: _jsxFileName$17,
													lineNumber: 125,
													columnNumber: 48
												}, this),
												" ",
												exp.endDate || (exp.isCurrent ? "Aujourd'hui" : "?")
											]
										}, void 0, true, {
											fileName: _jsxFileName$17,
											lineNumber: 124,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$17,
										lineNumber: 119,
										columnNumber: 21
									}, this)
								}, exp.id, false, {
									fileName: _jsxFileName$17,
									lineNumber: 118,
									columnNumber: 19
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$17,
								lineNumber: 116,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$17,
							lineNumber: 111,
							columnNumber: 13
						}, this),
						result.education.length > 0 && /* @__PURE__ */ (void 0)("section", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (void 0)("h3", {
								className: "text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border/50 pb-2",
								children: [
									/* @__PURE__ */ (void 0)(GraduationCap, { className: "size-4 text-purple-400" }, void 0, false, {
										fileName: _jsxFileName$17,
										lineNumber: 138,
										columnNumber: 17
									}, this),
									"Formations (",
									metadata.counts.education,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName$17,
								lineNumber: 137,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "space-y-3",
								children: result.education.map((edu) => /* @__PURE__ */ (void 0)("div", {
									className: "p-3 rounded-lg bg-card border border-border/60",
									children: /* @__PURE__ */ (void 0)("div", {
										className: "flex justify-between items-start gap-4",
										children: /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
											className: "font-medium text-sm",
											children: edu.degree
										}, void 0, false, {
											fileName: _jsxFileName$17,
											lineNumber: 146,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "text-xs text-muted-foreground",
											children: edu.school
										}, void 0, false, {
											fileName: _jsxFileName$17,
											lineNumber: 147,
											columnNumber: 25
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$17,
											lineNumber: 145,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$17,
										lineNumber: 144,
										columnNumber: 21
									}, this)
								}, edu.id, false, {
									fileName: _jsxFileName$17,
									lineNumber: 143,
									columnNumber: 19
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$17,
								lineNumber: 141,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$17,
							lineNumber: 136,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-6",
							children: [
								result.skills.length > 0 && /* @__PURE__ */ (void 0)("section", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (void 0)("h3", {
										className: "text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border/50 pb-2",
										children: [
											/* @__PURE__ */ (void 0)(Wrench, { className: "size-4 text-amber-400" }, void 0, false, {
												fileName: _jsxFileName$17,
												lineNumber: 161,
												columnNumber: 19
											}, this),
											"Compétences (",
											metadata.counts.skills,
											")"
										]
									}, void 0, true, {
										fileName: _jsxFileName$17,
										lineNumber: 160,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "flex flex-wrap gap-2",
										children: result.skills.map((skill) => /* @__PURE__ */ (void 0)(Badge, {
											variant: "secondary",
											className: "bg-card font-normal",
											children: [skill.name, skill.level && /* @__PURE__ */ (void 0)("span", {
												className: "opacity-50 ml-1",
												children: [
													"(",
													skill.level,
													")"
												]
											}, void 0, true, {
												fileName: _jsxFileName$17,
												lineNumber: 168,
												columnNumber: 39
											}, this)]
										}, skill.id, true, {
											fileName: _jsxFileName$17,
											lineNumber: 166,
											columnNumber: 21
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$17,
										lineNumber: 164,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$17,
									lineNumber: 159,
									columnNumber: 15
								}, this),
								result.languages.length > 0 && /* @__PURE__ */ (void 0)("section", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (void 0)("h3", {
										className: "text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border/50 pb-2",
										children: [
											/* @__PURE__ */ (void 0)(Globe, { className: "size-4 text-teal-400" }, void 0, false, {
												fileName: _jsxFileName$17,
												lineNumber: 179,
												columnNumber: 19
											}, this),
											"Langues (",
											metadata.counts.languages,
											")"
										]
									}, void 0, true, {
										fileName: _jsxFileName$17,
										lineNumber: 178,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "flex flex-wrap gap-2",
										children: result.languages.map((lang) => /* @__PURE__ */ (void 0)(Badge, {
											variant: "outline",
											className: "font-normal bg-teal-500/5 text-teal-300 border-teal-500/20",
											children: [lang.name, lang.level && /* @__PURE__ */ (void 0)("span", {
												className: "opacity-60 ml-1",
												children: ["— ", lang.level]
											}, void 0, true, {
												fileName: _jsxFileName$17,
												lineNumber: 186,
												columnNumber: 38
											}, this)]
										}, lang.id, true, {
											fileName: _jsxFileName$17,
											lineNumber: 184,
											columnNumber: 21
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$17,
										lineNumber: 182,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$17,
									lineNumber: 177,
									columnNumber: 15
								}, this),
								result.certifications.length > 0 && /* @__PURE__ */ (void 0)("section", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (void 0)("h3", {
										className: "text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border/50 pb-2",
										children: [
											/* @__PURE__ */ (void 0)(Award, { className: "size-4 text-emerald-400" }, void 0, false, {
												fileName: _jsxFileName$17,
												lineNumber: 197,
												columnNumber: 19
											}, this),
											"Certifications (",
											metadata.counts.certifications,
											")"
										]
									}, void 0, true, {
										fileName: _jsxFileName$17,
										lineNumber: 196,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "flex flex-col gap-2",
										children: result.certifications.map((cert) => /* @__PURE__ */ (void 0)("div", {
											className: "text-sm flex justify-between bg-card p-2 rounded border border-border/50",
											children: [/* @__PURE__ */ (void 0)("span", { children: cert.name }, void 0, false, {
												fileName: _jsxFileName$17,
												lineNumber: 203,
												columnNumber: 23
											}, this), cert.score && /* @__PURE__ */ (void 0)("span", {
												className: "text-emerald-400 font-mono text-xs",
												children: cert.score
											}, void 0, false, {
												fileName: _jsxFileName$17,
												lineNumber: 204,
												columnNumber: 38
											}, this)]
										}, cert.id, true, {
											fileName: _jsxFileName$17,
											lineNumber: 202,
											columnNumber: 21
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$17,
										lineNumber: 200,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$17,
									lineNumber: 195,
									columnNumber: 15
								}, this),
								result.projects.length > 0 && /* @__PURE__ */ (void 0)("section", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (void 0)("h3", {
										className: "text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border/50 pb-2",
										children: [
											/* @__PURE__ */ (void 0)(FolderDot, { className: "size-4 text-pink-400" }, void 0, false, {
												fileName: _jsxFileName$17,
												lineNumber: 215,
												columnNumber: 19
											}, this),
											"Projets (",
											metadata.counts.projects,
											")"
										]
									}, void 0, true, {
										fileName: _jsxFileName$17,
										lineNumber: 214,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "flex flex-col gap-2",
										children: result.projects.map((proj) => /* @__PURE__ */ (void 0)("div", {
											className: "text-sm bg-card p-2 rounded border border-border/50",
											children: /* @__PURE__ */ (void 0)("div", {
												className: "font-medium",
												children: proj.name
											}, void 0, false, {
												fileName: _jsxFileName$17,
												lineNumber: 221,
												columnNumber: 23
											}, this)
										}, proj.id, false, {
											fileName: _jsxFileName$17,
											lineNumber: 220,
											columnNumber: 21
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$17,
										lineNumber: 218,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$17,
									lineNumber: 213,
									columnNumber: 15
								}, this),
								result.interests.length > 0 && /* @__PURE__ */ (void 0)("section", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (void 0)("h3", {
										className: "text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border/50 pb-2",
										children: [
											/* @__PURE__ */ (void 0)(Heart, { className: "size-4 text-rose-400" }, void 0, false, {
												fileName: _jsxFileName$17,
												lineNumber: 232,
												columnNumber: 19
											}, this),
											"Centres d'intérêt (",
											metadata.counts.interests,
											")"
										]
									}, void 0, true, {
										fileName: _jsxFileName$17,
										lineNumber: 231,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "flex flex-wrap gap-2",
										children: result.interests.map((int) => /* @__PURE__ */ (void 0)(Badge, {
											variant: "secondary",
											className: "bg-card font-normal",
											children: int.name
										}, int.id, false, {
											fileName: _jsxFileName$17,
											lineNumber: 237,
											columnNumber: 21
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$17,
										lineNumber: 235,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$17,
									lineNumber: 230,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$17,
							lineNumber: 156,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$17,
					lineNumber: 72,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$17,
				lineNumber: 71,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$17,
		lineNumber: 32,
		columnNumber: 5
	}, this);
}
var ImportCVInput = object({ doc: object({
	fileName: string(),
	fileSize: number(),
	fileType: _enum([
		"pdf",
		"docx",
		"txt",
		"rtf",
		"autre"
	]),
	pages: array(object({
		pageNumber: number(),
		blocks: array(object({
			text: string(),
			x: number().optional(),
			y: number().optional(),
			width: number().optional(),
			height: number().optional(),
			page: number().optional()
		})),
		text: string()
	})),
	plainText: string().min(20)
}) });
var extraireCvServeur = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((data) => ImportCVInput.parse(data)).handler(createSsrRpc("47e694db27267631b2b10d89ba6fbeadb11f0a43861158b1191494d12c917b28"));
function mapImportResultToProfilePatch(imported, selectedDiff) {
	const patch = {};
	if (selectedDiff) {
		for (const f of selectedDiff.identityChangedFields) if (f.selected && f.imported) {
			if (f.field === "prenom") patch.prenom = f.imported;
			if (f.field === "nom") patch.nom = f.imported;
			if (f.field === "email") patch.email = f.imported;
			if (f.field === "telephone") patch.telephone = f.imported;
			if (f.field === "ville") patch.ville = f.imported;
			if (f.field === "titreProfessionnel") patch.titreProfessionnel = f.imported;
		}
	} else {
		if (imported.identity.firstName) patch.prenom = imported.identity.firstName;
		if (imported.identity.lastName) patch.nom = imported.identity.lastName;
		if (imported.identity.email) patch.email = imported.identity.email;
		if (imported.identity.phone) patch.telephone = imported.identity.phone;
		if (imported.identity.city) patch.ville = imported.identity.city;
		if (imported.identity.professionalTitle) patch.titreProfessionnel = imported.identity.professionalTitle;
	}
	const cvExperiences = (selectedDiff ? selectedDiff.experiences.filter((d) => d.selected).map((d) => d.imported) : imported.experiences).map((exp) => ({
		id: exp.id || Math.random().toString(36).slice(2, 10),
		poste: exp.title,
		entreprise: exp.company,
		lieu: exp.location || void 0,
		typeContrat: exp.contractType || void 0,
		debut: exp.startDate || "",
		fin: exp.endDate || "",
		enCours: exp.isCurrent,
		missions: exp.responsibilities || [],
		realisations: exp.achievements || [],
		competences: exp.tools || []
	}));
	const cvFormations = (selectedDiff ? selectedDiff.education.filter((d) => d.selected).map((d) => d.imported) : imported.education).map((edu) => ({
		id: edu.id || Math.random().toString(36).slice(2, 10),
		diplome: edu.degree,
		etablissement: edu.school,
		lieu: edu.location || void 0,
		domaine: edu.specialization || void 0,
		debut: edu.startDate || "",
		fin: edu.endDate || "",
		enCours: edu.isCurrent || false,
		cours: edu.courses || []
	}));
	const cvCompetences = (selectedDiff ? selectedDiff.skills.filter((d) => d.selected).map((d) => d.imported) : imported.skills).map((s) => ({
		nom: s.name,
		categorie: s.category,
		niveau: s.level ? mapNiveauCompetence(s.level) : void 0
	}));
	const cvLangues = (selectedDiff ? selectedDiff.languages.filter((d) => d.selected).map((d) => d.imported) : imported.languages).map((l) => ({
		nom: l.name,
		niveau: l.level || "Non précisé"
	}));
	const cvCertifications = (selectedDiff ? selectedDiff.certifications.filter((d) => d.selected).map((d) => d.imported) : imported.certifications).map((c) => ({
		id: c.id || Math.random().toString(36).slice(2, 10),
		nom: c.name,
		organisme: c.organization || void 0,
		annee: c.date || void 0,
		score: c.score || void 0
	}));
	const cvProjets = (selectedDiff ? selectedDiff.projects.filter((d) => d.selected).map((d) => d.imported) : imported.projects).map((p) => ({
		id: p.id || Math.random().toString(36).slice(2, 10),
		nom: p.name,
		description: p.description,
		role: p.type || void 0,
		organisation: p.organization || void 0,
		annee: p.date || void 0,
		technologies: p.technologies || []
	}));
	const cvInterets = (selectedDiff ? selectedDiff.interests.filter((d) => d.selected).map((d) => d.imported) : imported.interests).map((i) => i.name);
	const cvStructure = {
		titre: imported.identity.professionalTitle || void 0,
		resume: imported.identity.summary || void 0,
		experiences: cvExperiences,
		formations: cvFormations,
		competences: cvCompetences,
		langues: cvLangues,
		certifications: cvCertifications,
		projets: cvProjets,
		interets: cvInterets,
		benevolat: imported.engagements.map((e) => ({
			id: e.id,
			organisation: e.organization,
			role: e.role,
			debut: e.date || "",
			fin: "",
			enCours: false,
			description: e.description
		}))
	};
	patch.cv = {
		texteBrut: `${imported.identity.firstName} ${imported.identity.lastName}\n${imported.document.fileName}`,
		dateMaj: (/* @__PURE__ */ new Date()).toISOString(),
		nomFichier: imported.document.fileName,
		structure: cvStructure
	};
	return patch;
}
function mapNiveauCompetence(level) {
	const l = level.toLowerCase();
	if (l.includes("notion") || l.includes("débutant")) return "notions";
	if (l.includes("intermédiaire")) return "intermediaire";
	if (l.includes("avancé")) return "avance";
	if (l.includes("expert")) return "expert";
}
var _jsxFileName$16 = "/app/applet/src/components/cv-import/CvImporter.tsx";
function CvImporter({ existingProfil, onImportComplete, onCancel }) {
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [result, setResult] = (0, import_react.useState)(null);
	const importMutation = useMutation({
		mutationFn: async (file) => {
			setStatus("reading");
			const doc = await readCVDocument(file);
			setStatus("segmenting");
			await new Promise((resolve) => setTimeout(resolve, 800));
			setStatus("analyzing");
			const extractionResult = await extraireCvServeur({ data: { doc } });
			setStatus("validating");
			await new Promise((resolve) => setTimeout(resolve, 600));
			return extractionResult;
		},
		onSuccess: (data) => {
			setResult(data);
			setStatus("preview");
		},
		onError: (err) => {
			console.error(err);
			toast.error(err instanceof Error ? err.message : "Erreur lors de l'analyse");
			setStatus("error");
		}
	});
	const handleConfirm = () => {
		if (!result) return;
		try {
			onImportComplete(mapImportResultToProfilePatch(result));
			toast.success("CV importé avec succès !");
		} catch (e) {
			console.error(e);
			toast.error("Erreur lors de l'intégration au profil");
		}
	};
	const handleFileSelected = (file) => {
		setStatus("uploading");
		importMutation.mutate(file);
	};
	const isProcessing = [
		"reading",
		"segmenting",
		"analyzing",
		"validating"
	].includes(status);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "w-full",
		children: status === "idle" || status === "error" || status === "uploading" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CvUpload, {
			onFileSelected: handleFileSelected,
			disabled: importMutation.isPending
		}, void 0, false, {
			fileName: _jsxFileName$16,
			lineNumber: 75,
			columnNumber: 9
		}, this) : isProcessing ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CvAnalysisProgress, { status }, void 0, false, {
			fileName: _jsxFileName$16,
			lineNumber: 77,
			columnNumber: 9
		}, this) : status === "preview" && result ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CvImportPreview, {
			result,
			onConfirm: handleConfirm,
			onCancel
		}, void 0, false, {
			fileName: _jsxFileName$16,
			lineNumber: 79,
			columnNumber: 9
		}, this) : null
	}, void 0, false, {
		fileName: _jsxFileName$16,
		lineNumber: 73,
		columnNumber: 5
	}, this);
}
var _jsxFileName$15 = "/app/applet/src/components/CvAnalyseDialog.tsx";
function CvAnalyseDialog({ open, onOpenChange, profil, onAppliquerProfil, onSaveCv }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
			className: "sm:max-w-2xl border-border/80 bg-background p-6",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CvImporter, {
				existingProfil: profil,
				onImportComplete: (patch) => {
					if (onAppliquerProfil) onAppliquerProfil(patch);
					if (patch.cv && onSaveCv) onSaveCv(patch.cv);
					onOpenChange(false);
				},
				onCancel: () => onOpenChange(false)
			}, void 0, false, {
				fileName: _jsxFileName$15,
				lineNumber: 25,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$15,
			lineNumber: 24,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$15,
		lineNumber: 23,
		columnNumber: 5
	}, this);
}
var SyntheseInput = object({ profilTexte: string().min(5) });
var genererSyntheseProfil = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((data) => SyntheseInput.parse(data)).handler(createSsrRpc("9352f6eabe68edbb75492c4f24a9cec674afb6ae0ff47c5892bf1cb413aa97a5"));
var OptimiserInput = object({ profilTexte: string().min(5) });
var optimiserProfilIA = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((data) => OptimiserInput.parse(data)).handler(createSsrRpc("b0aeaa7fd503b52f35234669d03a865dd7908c6c61f462822bccace20eb59efe"));
var _jsxFileName$14 = "/app/applet/src/components/profil/ProfilOverviewTab.tsx";
function ProfilOverviewTab({ profil, bilan, onNavigateTab, onOpenCvModal, onOpenSummaryIaModal, onOpenOptimizerModal, onUpdateProfil }) {
	const [refreshingIa, setRefreshingIa] = (0, import_react.useState)(false);
	const [copiedPitch, setCopiedPitch] = (0, import_react.useState)(false);
	const synthese = profil.syntheseIa || profil.cvStructure?.syntheseIa || null;
	const handleActualiserSynthese = async () => {
		setRefreshingIa(true);
		try {
			const res = await genererSyntheseProfil({ data: { profilTexte: profilEnTexte(profil) } });
			onUpdateProfil({
				syntheseIa: res,
				cvStructure: {
					...profil.cvStructure,
					syntheseIa: res
				}
			});
			toast.success("Dossier NACORA AI actualisé avec succès !");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erreur lors de l'actualisation de la synthèse IA.");
		} finally {
			setRefreshingIa(false);
		}
	};
	const copyPitch = () => {
		if (!synthese?.pitchEntretien) return;
		navigator.clipboard.writeText(synthese.pitchEntretien);
		setCopiedPitch(true);
		toast.success("Pitch d'entretien copié dans le presse-papier !");
		setTimeout(() => setCopiedPitch(false), 2e3);
	};
	(profil.prenom || profil.nom) && `${profil.prenom} ${profil.nom}`.trim();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card relative overflow-hidden p-6 sm:p-7 space-y-5 border-purple-500/20 bg-gradient-to-br from-card/90 via-card/70 to-purple-950/20",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute -top-20 -right-20 size-60 rounded-full bg-purple-500/15 blur-3xl" }, void 0, false, {
						fileName: _jsxFileName$14,
						lineNumber: 100,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "flex size-7 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 font-bold text-xs",
									children: "⚡"
								}, void 0, false, {
									fileName: _jsxFileName$14,
									lineNumber: 105,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "text-base sm:text-lg font-bold text-foreground",
									children: "Score de Complétude du Dossier"
								}, void 0, false, {
									fileName: _jsxFileName$14,
									lineNumber: 108,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$14,
								lineNumber: 104,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									bilan.nbComplets,
									" sur ",
									bilan.nbTotal,
									" rubriques complétées avec succès."
								]
							}, void 0, true, {
								fileName: _jsxFileName$14,
								lineNumber: 112,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$14,
							lineNumber: 103,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "outline",
								className: `text-xs font-semibold px-3 py-1 ${bilan.badgeColor}`,
								children: bilan.label
							}, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 119,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400",
								children: [bilan.score, "%"]
							}, void 0, true, {
								fileName: _jsxFileName$14,
								lineNumber: 125,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$14,
							lineNumber: 118,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$14,
						lineNumber: 102,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Progress, {
						value: bilan.score,
						className: "h-2.5 bg-secondary"
					}, void 0, false, {
						fileName: _jsxFileName$14,
						lineNumber: 131,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 pt-2",
						children: bilan.categories.map((cat) => {
							const isComplet = cat.statut === "complet";
							const isAmeliorer = cat.statut === "a_ameliorer";
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => onNavigateTab(cat.tab),
								className: `flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${isComplet ? "border-emerald-500/25 bg-emerald-500/5 text-emerald-300 hover:bg-emerald-500/10" : isAmeliorer ? "border-amber-500/25 bg-amber-500/5 text-amber-300 hover:bg-amber-500/10" : "border-border/60 bg-card/40 text-muted-foreground hover:bg-card hover:text-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "min-w-0 pr-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs font-medium block truncate",
										children: cat.nom
									}, void 0, false, {
										fileName: _jsxFileName$14,
										lineNumber: 153,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[10px] text-muted-foreground truncate block",
										children: [
											cat.points,
											"/",
											cat.maxPoints,
											" pts"
										]
									}, void 0, true, {
										fileName: _jsxFileName$14,
										lineNumber: 156,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$14,
									lineNumber: 152,
									columnNumber: 17
								}, this), isComplet ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-3.5 text-emerald-400 shrink-0" }, void 0, false, {
									fileName: _jsxFileName$14,
									lineNumber: 161,
									columnNumber: 19
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleAlert, { className: "size-3.5 text-amber-400 shrink-0" }, void 0, false, {
									fileName: _jsxFileName$14,
									lineNumber: 163,
									columnNumber: 19
								}, this)]
							}, cat.id, true, {
								fileName: _jsxFileName$14,
								lineNumber: 140,
								columnNumber: 15
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName$14,
						lineNumber: 134,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$14,
				lineNumber: 99,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-6 sm:p-7 space-y-6 border-purple-500/25",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-9 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30 shadow-xs",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 176,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$14,
							lineNumber: 175,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm sm:text-base font-bold text-foreground",
							children: "Vision Stratégique NACORA AI"
						}, void 0, false, {
							fileName: _jsxFileName$14,
							lineNumber: 179,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "Ce que nos moteurs d'IA (Match IA, CV Optimizer, Assistant Email) exploitent"
						}, void 0, false, {
							fileName: _jsxFileName$14,
							lineNumber: 182,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$14,
							lineNumber: 178,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$14,
						lineNumber: 174,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							variant: "outline",
							onClick: handleActualiserSynthese,
							disabled: refreshingIa,
							className: "gap-1.5 text-xs border-purple-500/30 hover:bg-purple-500/10 text-purple-300",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: `size-3.5 ${refreshingIa ? "animate-spin" : ""}` }, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 197,
								columnNumber: 15
							}, this), "Actualiser avec l'IA"]
						}, void 0, true, {
							fileName: _jsxFileName$14,
							lineNumber: 190,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							onClick: onOpenOptimizerModal,
							className: "gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs shadow-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TrendingUp, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 207,
								columnNumber: 15
							}, this), "Audit d'Optimisation"]
						}, void 0, true, {
							fileName: _jsxFileName$14,
							lineNumber: 202,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$14,
						lineNumber: 189,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$14,
					lineNumber: 173,
					columnNumber: 9
				}, this), synthese ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-2xl border border-border/70 bg-card/60 p-4 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[11px] font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserRound, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName$14,
										lineNumber: 219,
										columnNumber: 19
									}, this), " Profil Global"]
								}, void 0, true, {
									fileName: _jsxFileName$14,
									lineNumber: 218,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs text-foreground/90 leading-relaxed",
									children: synthese.resumeGlobal
								}, void 0, false, {
									fileName: _jsxFileName$14,
									lineNumber: 221,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$14,
								lineNumber: 217,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-2xl border border-border/70 bg-card/60 p-4 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[11px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Target, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName$14,
										lineNumber: 228,
										columnNumber: 19
									}, this), " Cible & Type de Poste Idéal"]
								}, void 0, true, {
									fileName: _jsxFileName$14,
									lineNumber: 227,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs text-foreground/90 leading-relaxed",
									children: synthese.typePosteIdeal || "Non encore qualifié par l'IA."
								}, void 0, false, {
									fileName: _jsxFileName$14,
									lineNumber: 230,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$14,
								lineNumber: 226,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$14,
							lineNumber: 216,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName$14,
										lineNumber: 240,
										columnNumber: 19
									}, this), " Forces Clés Distinctives"]
								}, void 0, true, {
									fileName: _jsxFileName$14,
									lineNumber: 239,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
									className: "space-y-1.5 text-xs text-emerald-200",
									children: synthese.forcesCles?.map((f, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
										className: "flex items-start gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-emerald-400 font-bold",
											children: "•"
										}, void 0, false, {
											fileName: _jsxFileName$14,
											lineNumber: 245,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: f }, void 0, false, {
											fileName: _jsxFileName$14,
											lineNumber: 246,
											columnNumber: 23
										}, this)]
									}, i, true, {
										fileName: _jsxFileName$14,
										lineNumber: 244,
										columnNumber: 21
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$14,
									lineNumber: 242,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$14,
								lineNumber: 238,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-4 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[11px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Zap, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName$14,
										lineNumber: 254,
										columnNumber: 19
									}, this), " Domaines d'Expertise Détectés"]
								}, void 0, true, {
									fileName: _jsxFileName$14,
									lineNumber: 253,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-wrap gap-1.5 pt-1",
									children: synthese.domainesExpertise?.map((d, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
										variant: "secondary",
										className: "text-[11px] bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
										children: d
									}, i, false, {
										fileName: _jsxFileName$14,
										lineNumber: 258,
										columnNumber: 21
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$14,
									lineNumber: 256,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$14,
								lineNumber: 252,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$14,
							lineNumber: 237,
							columnNumber: 13
						}, this),
						synthese.pitchEntretien && /* @__PURE__ */ (void 0)("div", {
							className: "rounded-2xl border border-purple-500/30 bg-purple-500/5 p-4 sm:p-5 space-y-3",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-xs font-bold text-purple-300 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "size-4 text-purple-400" }, void 0, false, {
										fileName: _jsxFileName$14,
										lineNumber: 275,
										columnNumber: 21
									}, this), "Pitch d'accroche pour vos entretiens"]
								}, void 0, true, {
									fileName: _jsxFileName$14,
									lineNumber: 274,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: copyPitch,
									className: "h-7 text-xs gap-1.5 text-purple-300 hover:text-purple-200 hover:bg-purple-500/20",
									children: copiedPitch ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Check, { className: "size-3 text-emerald-400" }, void 0, false, {
										fileName: _jsxFileName$14,
										lineNumber: 286,
										columnNumber: 25
									}, this), "Copié !"] }, void 0, true, {
										fileName: _jsxFileName$14,
										lineNumber: 285,
										columnNumber: 23
									}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Copy, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName$14,
										lineNumber: 291,
										columnNumber: 25
									}, this), "Copier le pitch"] }, void 0, true, {
										fileName: _jsxFileName$14,
										lineNumber: 290,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$14,
									lineNumber: 278,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$14,
								lineNumber: 273,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-foreground/90 leading-relaxed italic border-l-2 border-purple-500/40 pl-3",
								children: [
									"« ",
									synthese.pitchEntretien,
									" »"
								]
							}, void 0, true, {
								fileName: _jsxFileName$14,
								lineNumber: 297,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$14,
							lineNumber: 272,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$14,
					lineNumber: 214,
					columnNumber: 11
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-center py-8 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mx-auto flex size-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-6" }, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 306,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$14,
							lineNumber: 305,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
							className: "text-sm font-semibold text-foreground",
							children: "Générez votre première synthèse IA"
						}, void 0, false, {
							fileName: _jsxFileName$14,
							lineNumber: 308,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground max-w-md mx-auto",
							children: "Cliquez ci-dessous pour analyser l'intégralité de vos expériences, diplômes et aspirations afin de générer votre pitch stratégique."
						}, void 0, false, {
							fileName: _jsxFileName$14,
							lineNumber: 311,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							onClick: handleActualiserSynthese,
							disabled: refreshingIa,
							className: "gap-2 bg-purple-600 hover:bg-purple-500 text-white text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 321,
								columnNumber: 15
							}, this), refreshingIa ? "Analyse en cours..." : "Générer ma Synthèse IA"]
						}, void 0, true, {
							fileName: _jsxFileName$14,
							lineNumber: 315,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$14,
					lineNumber: 304,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$14,
				lineNumber: 172,
				columnNumber: 7
			}, this),
			bilan.suggestions.length > 0 && /* @__PURE__ */ (void 0)("div", {
				className: "glass-card p-5 sm:p-6 space-y-4",
				children: [/* @__PURE__ */ (void 0)("h4", {
					className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2",
					children: [/* @__PURE__ */ (void 0)(TrendingUp, { className: "size-4 text-purple-400" }, void 0, false, {
						fileName: _jsxFileName$14,
						lineNumber: 332,
						columnNumber: 13
					}, this), "Actions Prioritaires pour Maximiser votre Score ATS & Matching"]
				}, void 0, true, {
					fileName: _jsxFileName$14,
					lineNumber: 331,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: bilan.suggestions.map((sug) => /* @__PURE__ */ (void 0)("div", {
						onClick: () => onNavigateTab(sug.tab),
						className: "group flex flex-col justify-between p-4 rounded-2xl border border-border/70 bg-card/60 hover:bg-card/90 hover:border-purple-500/40 transition-all cursor-pointer space-y-2.5",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-xs font-bold text-foreground group-hover:text-purple-300 transition-colors",
									children: sug.titre
								}, void 0, false, {
									fileName: _jsxFileName$14,
									lineNumber: 345,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)(Badge, {
									className: "bg-purple-500/15 text-purple-300 border-purple-500/30 text-[10px] shrink-0",
									children: [
										"+",
										sug.gain,
										" pts"
									]
								}, void 0, true, {
									fileName: _jsxFileName$14,
									lineNumber: 348,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$14,
								lineNumber: 344,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-[11px] text-muted-foreground leading-relaxed",
								children: sug.conseil
							}, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 352,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$14,
							lineNumber: 343,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-1 text-[11px] font-semibold text-purple-400 group-hover:translate-x-1 transition-transform",
							children: [/* @__PURE__ */ (void 0)("span", { children: "Compléter cette rubrique" }, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 358,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)(ArrowRight, { className: "size-3" }, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 359,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$14,
							lineNumber: 357,
							columnNumber: 17
						}, this)]
					}, sug.id, true, {
						fileName: _jsxFileName$14,
						lineNumber: 338,
						columnNumber: 15
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$14,
					lineNumber: 336,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$14,
				lineNumber: 330,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$14,
		lineNumber: 97,
		columnNumber: 5
	}, this);
}
var _jsxFileName$13 = "/app/applet/src/components/profil/ProfilIdentityTab.tsx";
function ProfilIdentityTab({ profil, onChange }) {
	const cv = profil.cvStructure;
	const updateCvField = (field, val) => {
		onChange({ cvStructure: {
			...cv,
			[field]: val
		} });
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserRound, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 40,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$13,
							lineNumber: 39,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: "Identité & Positionnement"
						}, void 0, false, {
							fileName: _jsxFileName$13,
							lineNumber: 43,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "Vos informations visibles et votre titre professionnel principal"
						}, void 0, false, {
							fileName: _jsxFileName$13,
							lineNumber: 46,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$13,
							lineNumber: 42,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$13,
						lineNumber: 38,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Prénom *"
							}, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 54,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: profil.prenom,
								onChange: (e) => {
									onChange({ prenom: e.target.value });
									updateCvField("prenom", e.target.value);
								},
								placeholder: "Ex : Lucas, Sarah..."
							}, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 55,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$13,
							lineNumber: 53,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Nom *"
							}, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 66,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: profil.nom,
								onChange: (e) => {
									onChange({ nom: e.target.value });
									updateCvField("nom", e.target.value);
								},
								placeholder: "Ex : Dupont, Martin..."
							}, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 67,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$13,
							lineNumber: 65,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$13,
						lineNumber: 52,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Titre professionnel / Accroche cible *"
							}, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 79,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: profil.titre || cv?.titre || "",
								onChange: (e) => {
									onChange({ titre: e.target.value });
									updateCvField("titre", e.target.value);
								},
								placeholder: "Ex : Étudiant M1 PGE @ NEOMA | Recherche Stage Bras Droit / Product Manager (6 mois)"
							}, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 82,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "💡 Ce titre oriente immédiatement le matching IA et apparaît en en-tête de vos candidatures."
							}, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 90,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$13,
						lineNumber: 78,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Photo de profil (URL)"
							}, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 98,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex gap-2",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: profil.photoUrl || cv?.photoUrl || "",
									onChange: (e) => {
										onChange({ photoUrl: e.target.value });
										updateCvField("photoUrl", e.target.value);
									},
									placeholder: "https://mon-image.jpg ou avatar..."
								}, void 0, false, {
									fileName: _jsxFileName$13,
									lineNumber: 102,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 101,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$13,
							lineNumber: 97,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Permis de conduire"
							}, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 114,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: profil.permis || cv?.permis || "",
								onChange: (e) => {
									onChange({ permis: e.target.value });
									updateCvField("permis", e.target.value);
								},
								placeholder: "Ex : Permis B, Véhiculé(e)..."
							}, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 117,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$13,
							lineNumber: 113,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$13,
						lineNumber: 96,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$13,
				lineNumber: 37,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MapPin, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 133,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$13,
							lineNumber: 132,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: "Coordonnées & Mobilité géographique"
						}, void 0, false, {
							fileName: _jsxFileName$13,
							lineNumber: 136,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "Pour vous contacter et évaluer le critère de localisation"
						}, void 0, false, {
							fileName: _jsxFileName$13,
							lineNumber: 139,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$13,
							lineNumber: 135,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$13,
						lineNumber: 131,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName$13,
									lineNumber: 148,
									columnNumber: 15
								}, this), " Email de contact"]
							}, void 0, true, {
								fileName: _jsxFileName$13,
								lineNumber: 147,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								type: "email",
								value: profil.emailContact || cv?.email || "",
								onChange: (e) => {
									onChange({ emailContact: e.target.value });
									updateCvField("email", e.target.value);
								},
								placeholder: "votre.email@etudiant.fr"
							}, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 150,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$13,
							lineNumber: 146,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName$13,
									lineNumber: 163,
									columnNumber: 15
								}, this), " Téléphone"]
							}, void 0, true, {
								fileName: _jsxFileName$13,
								lineNumber: 162,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								type: "tel",
								value: profil.telephone || cv?.telephone || "",
								onChange: (e) => {
									onChange({ telephone: e.target.value });
									updateCvField("telephone", e.target.value);
								},
								placeholder: "+33 6 12 34 56 78"
							}, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 165,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$13,
							lineNumber: 161,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$13,
						lineNumber: 145,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs text-muted-foreground",
									children: "Ville actuelle"
								}, void 0, false, {
									fileName: _jsxFileName$13,
									lineNumber: 179,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: profil.localisation || cv?.ville || "",
									onChange: (e) => {
										onChange({ localisation: e.target.value });
										updateCvField("ville", e.target.value);
									},
									placeholder: "Ex : Paris, Lyon, Rouen, Reims..."
								}, void 0, false, {
									fileName: _jsxFileName$13,
									lineNumber: 182,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$13,
								lineNumber: 178,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs text-muted-foreground",
									children: "Pays"
								}, void 0, false, {
									fileName: _jsxFileName$13,
									lineNumber: 193,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: profil.pays || cv?.pays || "France",
									onChange: (e) => {
										onChange({ pays: e.target.value });
										updateCvField("pays", e.target.value);
									},
									placeholder: "Ex : France, Royaume-Uni..."
								}, void 0, false, {
									fileName: _jsxFileName$13,
									lineNumber: 194,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$13,
								lineNumber: 192,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs text-muted-foreground",
									children: "Mobilité géographique"
								}, void 0, false, {
									fileName: _jsxFileName$13,
									lineNumber: 205,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: profil.mobilite,
									onChange: (e) => onChange({ mobilite: e.target.value }),
									placeholder: "Ex : Île-de-France, France entière, International..."
								}, void 0, false, {
									fileName: _jsxFileName$13,
									lineNumber: 208,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$13,
								lineNumber: 204,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$13,
						lineNumber: 177,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$13,
				lineNumber: 130,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3 border-b border-border/50 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Globe, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$13,
							lineNumber: 221,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$13,
						lineNumber: 220,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: "Liens & Réseaux Professionnels"
					}, void 0, false, {
						fileName: _jsxFileName$13,
						lineNumber: 224,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "LinkedIn, portfolio de projets, profil GitHub ou site personnel"
					}, void 0, false, {
						fileName: _jsxFileName$13,
						lineNumber: 227,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$13,
						lineNumber: 223,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$13,
					lineNumber: 219,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-4 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Linkedin, { className: "size-3.5 text-blue-400" }, void 0, false, {
									fileName: _jsxFileName$13,
									lineNumber: 236,
									columnNumber: 15
								}, this), " Profil LinkedIn"]
							}, void 0, true, {
								fileName: _jsxFileName$13,
								lineNumber: 235,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: profil.linkedin || cv?.linkedin || "",
								onChange: (e) => {
									onChange({ linkedin: e.target.value });
									updateCvField("linkedin", e.target.value);
								},
								placeholder: "linkedin.com/in/nom-prenom"
							}, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 238,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$13,
							lineNumber: 234,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Globe, { className: "size-3.5 text-emerald-400" }, void 0, false, {
									fileName: _jsxFileName$13,
									lineNumber: 250,
									columnNumber: 15
								}, this), " Portfolio / Site"]
							}, void 0, true, {
								fileName: _jsxFileName$13,
								lineNumber: 249,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: profil.portfolio || cv?.portfolio || "",
								onChange: (e) => {
									onChange({ portfolio: e.target.value });
									updateCvField("portfolio", e.target.value);
								},
								placeholder: "https://mon-portfolio.fr"
							}, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 252,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$13,
							lineNumber: 248,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Github, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName$13,
									lineNumber: 264,
									columnNumber: 15
								}, this), " Profil GitHub / Code"]
							}, void 0, true, {
								fileName: _jsxFileName$13,
								lineNumber: 263,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: profil.github || cv?.github || "",
								onChange: (e) => {
									onChange({ github: e.target.value });
									updateCvField("github", e.target.value);
								},
								placeholder: "github.com/mon-pseudo"
							}, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 266,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$13,
							lineNumber: 262,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$13,
					lineNumber: 233,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$13,
				lineNumber: 218,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$13,
		lineNumber: 35,
		columnNumber: 5
	}, this);
}
var _jsxFileName$12 = "/app/applet/src/components/profil/ProfilObjectivesTab.tsx";
var CONTRATS_OPTIONS = [
	"Stage",
	"Alternance",
	"CDI",
	"CDD",
	"VIE",
	"Graduate Program",
	"Freelance"
];
var MODES_TRAVAIL = [
	{
		id: "hybride",
		label: "Hybride",
		desc: "Télétravail + Bureau",
		icone: "🏢"
	},
	{
		id: "full_remote",
		label: "100% Remote",
		desc: "Télétravail complet",
		icone: "💻"
	},
	{
		id: "presentiel",
		label: "Présentiel",
		desc: "Sur site",
		icone: "👥"
	},
	{
		id: "indifferent",
		label: "Indifférent",
		desc: "Flexible",
		icone: "✨"
	}
];
function ProfilObjectivesTab({ profil, onChange }) {
	const [nouveauMetier, setNouveauMetier] = (0, import_react.useState)("");
	const [nouveauDomaine, setNouveauDomaine] = (0, import_react.useState)("");
	const [nouvelleEntreprise, setNouvelleEntreprise] = (0, import_react.useState)("");
	const ajouterTag = (val, champ, reset) => {
		const trim = val.trim();
		if (!trim) return;
		const current = profil[champ] ? profil[champ].split(",").map((s) => s.trim()).filter(Boolean) : [];
		if (!current.some((c) => c.toLowerCase() === trim.toLowerCase())) {
			current.push(trim);
			onChange({ [champ]: current.join(", ") });
		}
		if (reset) reset();
	};
	const retirerTag = (tag, champ) => {
		const next = (profil[champ] ? profil[champ].split(",").map((s) => s.trim()).filter(Boolean) : []).filter((t) => t.toLowerCase() !== tag.toLowerCase().trim());
		onChange({ [champ]: next.join(", ") });
	};
	const metiersList = (profil.metiers || "").split(",").map((s) => s.trim()).filter(Boolean);
	const domainesList = (profil.domaines || "").split(",").map((s) => s.trim()).filter(Boolean);
	const entreprisesList = (profil.entreprisesCiblees || "").split(",").map((s) => s.trim()).filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 space-y-5 rounded-2xl border border-border/70 bg-card/80",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 border-b border-border/40 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Target, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 111,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 110,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: "Postes & Secteurs ciblés"
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 114,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "Les intitulés et domaines recherchés pour le Match IA"
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 117,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$12,
							lineNumber: 113,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 109,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "text-xs font-medium text-foreground",
							children: "Intitulés de postes / Métiers recherchés *"
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 125,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center gap-1.5 min-h-[38px] p-2 rounded-xl border border-border/70 bg-background/50 focus-within:border-purple-500/50 transition-colors",
							children: [metiersList.map((m) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "secondary",
								className: "gap-1 bg-purple-500/15 text-purple-200 border border-purple-500/30 text-xs py-1 px-2.5 rounded-lg",
								children: [m, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => retirerTag(m, "metiers"),
									className: "rounded-full hover:bg-purple-500/20 p-0.5 text-muted-foreground hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 141,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$12,
									lineNumber: 136,
									columnNumber: 17
								}, this)]
							}, m, true, {
								fileName: _jsxFileName$12,
								lineNumber: 130,
								columnNumber: 15
							}, this)), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex-1 min-w-[180px] flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									value: nouveauMetier,
									onChange: (e) => setNouveauMetier(e.target.value),
									onKeyDown: (e) => {
										if (e.key === "Enter" || e.key === ",") {
											e.preventDefault();
											ajouterTag(nouveauMetier, "metiers", () => setNouveauMetier(""));
										}
									},
									placeholder: metiersList.length === 0 ? "Ex : Bras Droit CEO, Chef de Projet, Data Analyst... (Entrée)" : "Ajouter un autre intitulé...",
									className: "w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
								}, void 0, false, {
									fileName: _jsxFileName$12,
									lineNumber: 146,
									columnNumber: 15
								}, this), nouveauMetier && /* @__PURE__ */ (void 0)(Button, {
									type: "button",
									size: "sm",
									variant: "ghost",
									onClick: () => ajouterTag(nouveauMetier, "metiers", () => setNouveauMetier("")),
									className: "h-6 px-2 text-xs text-purple-400",
									children: /* @__PURE__ */ (void 0)(Plus, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 177,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$12,
									lineNumber: 166,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 145,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$12,
							lineNumber: 128,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 124,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2 pt-2 border-t border-border/40",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "text-xs font-medium text-foreground",
							children: "Domaines / Secteurs d'activité"
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 186,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center gap-1.5 min-h-[38px] p-2 rounded-xl border border-border/70 bg-background/50 focus-within:border-indigo-500/50 transition-colors",
							children: [domainesList.map((d) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "secondary",
								className: "gap-1 bg-indigo-500/15 text-indigo-200 border border-indigo-500/30 text-xs py-1 px-2.5 rounded-lg",
								children: [d, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => retirerTag(d, "domaines"),
									className: "rounded-full hover:bg-indigo-500/20 p-0.5 text-muted-foreground hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 202,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$12,
									lineNumber: 197,
									columnNumber: 17
								}, this)]
							}, d, true, {
								fileName: _jsxFileName$12,
								lineNumber: 191,
								columnNumber: 15
							}, this)), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex-1 min-w-[180px] flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									value: nouveauDomaine,
									onChange: (e) => setNouveauDomaine(e.target.value),
									onKeyDown: (e) => {
										if (e.key === "Enter" || e.key === ",") {
											e.preventDefault();
											ajouterTag(nouveauDomaine, "domaines", () => setNouveauDomaine(""));
										}
									},
									placeholder: domainesList.length === 0 ? "Ex : Tech & SaaS, Finance, Conseil, Luxe... (Entrée)" : "Ajouter un secteur...",
									className: "w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
								}, void 0, false, {
									fileName: _jsxFileName$12,
									lineNumber: 207,
									columnNumber: 15
								}, this), nouveauDomaine && /* @__PURE__ */ (void 0)(Button, {
									type: "button",
									size: "sm",
									variant: "ghost",
									onClick: () => ajouterTag(nouveauDomaine, "domaines", () => setNouveauDomaine("")),
									className: "h-6 px-2 text-xs text-indigo-400",
									children: /* @__PURE__ */ (void 0)(Plus, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 238,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$12,
									lineNumber: 227,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 206,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$12,
							lineNumber: 189,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 185,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2 pt-2 border-t border-border/40",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "text-xs font-medium text-foreground",
							children: "Entreprises spécifiques ciblées (Optionnel)"
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 247,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center gap-1.5 min-h-[38px] p-2 rounded-xl border border-border/70 bg-background/50 focus-within:border-blue-500/50 transition-colors",
							children: [entreprisesList.map((e) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "secondary",
								className: "gap-1 bg-blue-500/15 text-blue-200 border border-blue-500/30 text-xs py-1 px-2.5 rounded-lg",
								children: [e, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => retirerTag(e, "entreprisesCiblees"),
									className: "rounded-full hover:bg-blue-500/20 p-0.5 text-muted-foreground hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 263,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$12,
									lineNumber: 258,
									columnNumber: 17
								}, this)]
							}, e, true, {
								fileName: _jsxFileName$12,
								lineNumber: 252,
								columnNumber: 15
							}, this)), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex-1 min-w-[180px] flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									value: nouvelleEntreprise,
									onChange: (e) => setNouvelleEntreprise(e.target.value),
									onKeyDown: (e) => {
										if (e.key === "Enter" || e.key === ",") {
											e.preventDefault();
											ajouterTag(nouvelleEntreprise, "entreprisesCiblees", () => setNouvelleEntreprise(""));
										}
									},
									placeholder: "Ex : L'Oréal, BNP Paribas, Doctolib, BCG... (Entrée)",
									className: "w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
								}, void 0, false, {
									fileName: _jsxFileName$12,
									lineNumber: 268,
									columnNumber: 15
								}, this), nouvelleEntreprise && /* @__PURE__ */ (void 0)(Button, {
									type: "button",
									size: "sm",
									variant: "ghost",
									onClick: () => ajouterTag(nouvelleEntreprise, "entreprisesCiblees", () => setNouvelleEntreprise("")),
									className: "h-6 px-2 text-xs text-blue-400",
									children: /* @__PURE__ */ (void 0)(Plus, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 295,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$12,
									lineNumber: 284,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 267,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$12,
							lineNumber: 250,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 246,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$12,
				lineNumber: 108,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 space-y-5 rounded-2xl border border-border/70 bg-card/80",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 border-b border-border/40 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Calendar, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 307,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 306,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: "Contrat & Disponibilité"
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 310,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "Type de contrat, calendrier et rythme de travail"
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 313,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$12,
							lineNumber: 309,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 305,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "text-xs font-medium text-foreground",
							children: "Type de contrat recherché *"
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 321,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap gap-2",
							children: CONTRATS_OPTIONS.map((c) => {
								const selected = (profil.contrats || "").includes(c);
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => {
										const current = (profil.contrats || "").split(",").map((s) => s.trim()).filter(Boolean);
										onChange({ contrats: (selected ? current.filter((x) => x !== c) : [...current, c]).join(", ") || "Stage" });
									},
									className: `rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${selected ? "border-purple-500/50 bg-purple-500/20 text-purple-200 shadow-xs" : "border-border/60 bg-card/40 text-muted-foreground hover:bg-card hover:text-foreground"}`,
									children: [selected && /* @__PURE__ */ (void 0)(Check, { className: "size-3.5 inline mr-1" }, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 347,
										columnNumber: 32
									}, this), c]
								}, c, true, {
									fileName: _jsxFileName$12,
									lineNumber: 328,
									columnNumber: 17
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 324,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 320,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs font-medium text-muted-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Calendar, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 358,
										columnNumber: 15
									}, this), " Date de début souhaitée"]
								}, void 0, true, {
									fileName: _jsxFileName$12,
									lineNumber: 357,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: profil.dateDebut || "",
									onChange: (e) => onChange({ dateDebut: e.target.value }),
									placeholder: "Ex : Dès que possible, Septembre 2026...",
									className: "text-xs rounded-xl"
								}, void 0, false, {
									fileName: _jsxFileName$12,
									lineNumber: 360,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 356,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs font-medium text-muted-foreground",
									children: "Durée souhaitée"
								}, void 0, false, {
									fileName: _jsxFileName$12,
									lineNumber: 369,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: profil.duree || "",
									onChange: (e) => onChange({ duree: e.target.value }),
									placeholder: "Ex : 6 mois, 1 an...",
									className: "text-xs rounded-xl"
								}, void 0, false, {
									fileName: _jsxFileName$12,
									lineNumber: 372,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 368,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs font-medium text-muted-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DollarSign, { className: "size-3.5 text-emerald-400" }, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 382,
										columnNumber: 15
									}, this), " Rémunération min."]
								}, void 0, true, {
									fileName: _jsxFileName$12,
									lineNumber: 381,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: profil.remuneration || "",
									onChange: (e) => onChange({ remuneration: e.target.value }),
									placeholder: "Ex : 1 200 €/mois, 45 k€...",
									className: "text-xs rounded-xl"
								}, void 0, false, {
									fileName: _jsxFileName$12,
									lineNumber: 385,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 380,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 355,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2 pt-1 border-t border-border/40",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "text-xs font-medium text-foreground",
							children: "Mode de travail préféré"
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 396,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-2 grid-cols-2 sm:grid-cols-4",
							children: MODES_TRAVAIL.map((m) => {
								const selected = (profil.modeTravail || "hybride") === m.id;
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => onChange({
										modeTravail: m.id,
										teletravail: m.label
									}),
									className: `flex flex-col items-start gap-1 p-3 rounded-xl border text-left transition-all ${selected ? "border-purple-500/50 bg-purple-500/15 text-purple-200 ring-1 ring-purple-500/30" : "border-border/60 bg-card/40 text-muted-foreground hover:bg-card/70 hover:text-foreground"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-base",
											children: m.icone
										}, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 415,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-xs font-semibold text-foreground",
											children: m.label
										}, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 416,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[10px] text-muted-foreground",
											children: m.desc
										}, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 419,
											columnNumber: 19
										}, this)
									]
								}, m.id, true, {
									fileName: _jsxFileName$12,
									lineNumber: 403,
									columnNumber: 17
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 399,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 395,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$12,
				lineNumber: 304,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 space-y-4 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/5 via-card/80 to-indigo-500/5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 border-b border-purple-500/20 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-300",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 433,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 432,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold text-foreground flex items-center gap-2",
							children: ["Ce que je recherche vraiment", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								className: "bg-purple-500/20 text-purple-300 border-purple-500/30 text-[10px]",
								children: "Booster IA"
							}, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 438,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$12,
							lineNumber: 436,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "Décrivez librement vos attentes et le type d'équipe idéal pour guider l'IA"
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 442,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$12,
							lineNumber: 435,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 431,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
						value: profil.rechercheVraie || "",
						onChange: (e) => onChange({ rechercheVraie: e.target.value }),
						rows: 3,
						placeholder: "Ex : Je recherche une opportunité avec une forte autonomie sur des projets stratégiques. Une équipe bienveillante, axée sur l'apprentissage et avec des perspectives de recrutement...",
						className: "text-xs leading-relaxed border-purple-500/20 bg-background/50 focus-visible:ring-purple-500 rounded-xl"
					}, void 0, false, {
						fileName: _jsxFileName$12,
						lineNumber: 449,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-4 sm:grid-cols-2 pt-2 border-t border-border/40",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs font-medium text-foreground",
								children: "Secteurs à éviter"
							}, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 459,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: profil.secteursEviter || "",
								onChange: (e) => onChange({ secteursEviter: e.target.value }),
								placeholder: "Ex : Tabac, Armement, Grande distribution...",
								className: "text-xs rounded-xl border-border/70"
							}, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 462,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$12,
							lineNumber: 458,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs font-medium text-foreground",
								children: "Critères rédhibitoires"
							}, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 471,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: profil.redhibitoires || "",
								onChange: (e) => onChange({ redhibitoires: e.target.value }),
								placeholder: "Ex : Pas de présentiel à plus d'1h de trajet...",
								className: "text-xs rounded-xl border-border/70"
							}, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 474,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$12,
							lineNumber: 470,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 457,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$12,
				lineNumber: 430,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$12,
		lineNumber: 106,
		columnNumber: 5
	}, this);
}
var _jsxFileName$11 = "/app/applet/src/components/ui/switch.tsx";
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") }, void 0, false, {
		fileName: _jsxFileName$11,
		lineNumber: 18,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$11,
	lineNumber: 10,
	columnNumber: 3
}, void 0));
Switch.displayName = Switch$1.displayName;
var _jsxFileName$10 = "/app/applet/src/components/profil/ProfilJourneyTab.tsx";
var TYPES_CONTRAT = [
	"Stage",
	"Alternance",
	"CDI",
	"CDD",
	"Freelance",
	"VIE",
	"Graduate Program",
	"Projet",
	"Autre"
];
var NIVEAUX_ETUDES = [
	"Bac +1",
	"Bac +2 (BTS / DUT / Prépa)",
	"Bac +3 (Licence / Bachelor)",
	"Bac +4 (Master 1)",
	"Bac +5 (Master 2 / PGE / Ingénieur)",
	"Mastère Spécialisé / MBA",
	"Doctorat / PhD"
];
function ProfilJourneyTab({ profil, onChange }) {
	const [subView, setSubView] = (0, import_react.useState)("experiences");
	const cv = profil.cvStructure;
	const experiences = cv?.experiences || [];
	const formations = cv?.formations || [];
	const [expandedExp, setExpandedExp] = (0, import_react.useState)(0);
	const [expandedForm, setExpandedForm] = (0, import_react.useState)(0);
	const updateExperiences = (nouvellesExp) => {
		onChange({ cvStructure: {
			...cv,
			experiences: nouvellesExp
		} });
	};
	const handleAjouterExp = () => {
		const ne = nouvelleExperience();
		updateExperiences([ne, ...experiences]);
		setExpandedExp(0);
	};
	const handleSupprimerExp = (index) => {
		const updated = experiences.filter((_, i) => i !== index);
		updateExperiences(updated);
		if (expandedExp === index) setExpandedExp(null);
	};
	const handleModifierExp = (index, patch) => {
		const updated = experiences.map((exp, i) => i === index ? {
			...exp,
			...patch
		} : exp);
		updateExperiences(updated);
	};
	const updateFormations = (nouvellesFormations) => {
		const primary = nouvellesFormations[0];
		onChange({
			formation: primary?.diplome || profil.formation,
			ecole: primary?.etablissement || profil.ecole,
			niveau: primary?.niveau || profil.niveau,
			cvStructure: {
				...cv,
				formations: nouvellesFormations
			}
		});
	};
	const handleAjouterForm = () => {
		const nf = nouvelleFormation();
		updateFormations([nf, ...formations]);
		setExpandedForm(0);
	};
	const handleSupprimerForm = (index) => {
		const updated = formations.filter((_, i) => i !== index);
		updateFormations(updated);
		if (expandedForm === index) setExpandedForm(null);
	};
	const handleModifierForm = (index, patch) => {
		const updated = formations.map((f, i) => i === index ? {
			...f,
			...patch
		} : f);
		updateFormations(updated);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-3 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-1.5 bg-muted/40 p-1 rounded-xl border border-border/50",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setSubView("experiences"),
						className: `flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${subView === "experiences" ? "bg-card text-foreground shadow-xs border border-border/80 text-purple-300" : "text-muted-foreground hover:text-foreground"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Briefcase, { className: "size-3.5 text-purple-400" }, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 154,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Expériences professionnelles" }, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 155,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "secondary",
								className: "text-[10px] bg-purple-500/15 text-purple-300 px-1.5 py-0",
								children: experiences.length
							}, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 156,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$10,
						lineNumber: 145,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setSubView("formations"),
						className: `flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${subView === "formations" ? "bg-card text-foreground shadow-xs border border-border/80 text-indigo-300" : "text-muted-foreground hover:text-foreground"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GraduationCap, { className: "size-3.5 text-indigo-400" }, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 173,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Formations & Diplômes" }, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 174,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "secondary",
								className: "text-[10px] bg-indigo-500/15 text-indigo-300 px-1.5 py-0",
								children: formations.length
							}, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 175,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$10,
						lineNumber: 164,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$10,
					lineNumber: 144,
					columnNumber: 9
				}, this), subView === "experiences" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					onClick: handleAjouterExp,
					className: "gap-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 190,
						columnNumber: 13
					}, this), "Ajouter une expérience"]
				}, void 0, true, {
					fileName: _jsxFileName$10,
					lineNumber: 185,
					columnNumber: 11
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					onClick: handleAjouterForm,
					className: "gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 199,
						columnNumber: 13
					}, this), "Ajouter une formation"]
				}, void 0, true, {
					fileName: _jsxFileName$10,
					lineNumber: 194,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$10,
				lineNumber: 143,
				columnNumber: 7
			}, this),
			subView === "experiences" && /* @__PURE__ */ (void 0)("div", {
				className: "space-y-4",
				children: [experiences.length === 0 && /* @__PURE__ */ (void 0)("div", {
					className: "glass-card p-10 text-center space-y-3",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "mx-auto flex size-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400",
							children: /* @__PURE__ */ (void 0)(Briefcase, { className: "size-6" }, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 211,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 210,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("h4", {
							className: "text-sm font-semibold text-foreground",
							children: "Aucune expérience professionnelle enregistrée"
						}, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 213,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground max-w-sm mx-auto",
							children: "Ajoutez vos stages, alternances, jobs ou projets phares pour enrichir votre dossier."
						}, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 216,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Button, {
							size: "sm",
							variant: "outline",
							onClick: handleAjouterExp,
							className: "gap-1.5",
							children: [/* @__PURE__ */ (void 0)(Plus, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 226,
								columnNumber: 17
							}, this), "Ajouter une première expérience"]
						}, void 0, true, {
							fileName: _jsxFileName$10,
							lineNumber: 220,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$10,
					lineNumber: 209,
					columnNumber: 13
				}, this), experiences.map((exp, idx) => {
					const isExpanded = expandedExp === idx;
					const titreAffiche = exp.poste || exp.entreprise || `Expérience #${idx + 1}`;
					const sousTitre = [
						exp.entreprise,
						exp.typeContrat,
						exp.lieu
					].filter(Boolean).join(" • ");
					const dates = exp.debut || exp.fin ? `${exp.debut || "?"} - ${exp.enCours ? "Aujourd'hui" : exp.fin || "?"}` : "";
					return /* @__PURE__ */ (void 0)("div", {
						className: "glass-card overflow-hidden transition-all border border-border/70 bg-card/60",
						children: [/* @__PURE__ */ (void 0)("div", {
							onClick: () => setExpandedExp(isExpanded ? null : idx),
							className: "flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-3 min-w-0",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex size-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 font-bold text-xs",
									children: ["#", experiences.length - idx]
								}, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 255,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-sm font-bold text-foreground truncate",
											children: titreAffiche
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 260,
											columnNumber: 25
										}, this), exp.enCours && /* @__PURE__ */ (void 0)(Badge, {
											className: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 text-[10px] py-0",
											children: "En cours"
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 264,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$10,
										lineNumber: 259,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("p", {
										className: "text-xs text-muted-foreground truncate",
										children: [
											sousTitre,
											" ",
											dates && `• ${dates}`
										]
									}, void 0, true, {
										fileName: _jsxFileName$10,
										lineNumber: 269,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 258,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$10,
								lineNumber: 254,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (void 0)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: (e) => {
										e.stopPropagation();
										handleSupprimerExp(idx);
									},
									className: "size-8 p-0 text-muted-foreground hover:text-rose-400",
									children: /* @__PURE__ */ (void 0)(Trash2, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 285,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$10,
									lineNumber: 276,
									columnNumber: 21
								}, this), isExpanded ? /* @__PURE__ */ (void 0)(ChevronUp, { className: "size-4 text-muted-foreground" }, void 0, false, {
									fileName: _jsxFileName$10,
									lineNumber: 288,
									columnNumber: 23
								}, this) : /* @__PURE__ */ (void 0)(ChevronDown, { className: "size-4 text-muted-foreground" }, void 0, false, {
									fileName: _jsxFileName$10,
									lineNumber: 290,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$10,
								lineNumber: 275,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$10,
							lineNumber: 250,
							columnNumber: 17
						}, this), isExpanded && /* @__PURE__ */ (void 0)("div", {
							className: "p-4 sm:p-6 border-t border-border/50 space-y-4 bg-background/40",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (void 0)(Label, {
											className: "text-xs font-medium text-foreground",
											children: "Intitulé du poste *"
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 300,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)(Input, {
											value: exp.poste,
											onChange: (e) => handleModifierExp(idx, { poste: e.target.value }),
											placeholder: "Ex: Bras Droit CEO, Consultant Junior..."
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 303,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$10,
										lineNumber: 299,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (void 0)(Label, {
											className: "text-xs font-medium text-foreground",
											children: "Entreprise / Organisation *"
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 313,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)(Input, {
											value: exp.entreprise,
											onChange: (e) => handleModifierExp(idx, { entreprise: e.target.value }),
											placeholder: "Ex: Qonto, BCG, LVMH, BNP Paribas..."
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 316,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$10,
										lineNumber: 312,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 298,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid gap-4 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (void 0)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Type de contrat"
											}, void 0, false, {
												fileName: _jsxFileName$10,
												lineNumber: 330,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)(Select, {
												value: exp.typeContrat || "Stage",
												onValueChange: (val) => handleModifierExp(idx, { typeContrat: val }),
												children: [/* @__PURE__ */ (void 0)(SelectTrigger, { children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
													fileName: _jsxFileName$10,
													lineNumber: 342,
													columnNumber: 29
												}, this) }, void 0, false, {
													fileName: _jsxFileName$10,
													lineNumber: 341,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: TYPES_CONTRAT.map((t) => /* @__PURE__ */ (void 0)(SelectItem, {
													value: t,
													children: t
												}, t, false, {
													fileName: _jsxFileName$10,
													lineNumber: 346,
													columnNumber: 31
												}, this)) }, void 0, false, {
													fileName: _jsxFileName$10,
													lineNumber: 344,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$10,
												lineNumber: 333,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$10,
											lineNumber: 329,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (void 0)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Date de début"
											}, void 0, false, {
												fileName: _jsxFileName$10,
												lineNumber: 355,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)(Input, {
												value: exp.debut,
												onChange: (e) => handleModifierExp(idx, { debut: e.target.value }),
												placeholder: "Ex: 01/2024 ou Janvier 2024"
											}, void 0, false, {
												fileName: _jsxFileName$10,
												lineNumber: 358,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$10,
											lineNumber: 354,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (void 0)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Date de fin"
											}, void 0, false, {
												fileName: _jsxFileName$10,
												lineNumber: 368,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)(Input, {
												value: exp.fin,
												disabled: exp.enCours,
												onChange: (e) => handleModifierExp(idx, { fin: e.target.value }),
												placeholder: exp.enCours ? "Poste actuel" : "Ex: 06/2024 ou Juin 2024"
											}, void 0, false, {
												fileName: _jsxFileName$10,
												lineNumber: 371,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$10,
											lineNumber: 367,
											columnNumber: 23
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 328,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between pt-1",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (void 0)(Switch, {
											checked: exp.enCours,
											onCheckedChange: (c) => handleModifierExp(idx, {
												enCours: c,
												fin: c ? "" : exp.fin
											})
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 388,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-xs text-foreground font-medium",
											children: "Poste actuel / En cours"
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 397,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$10,
										lineNumber: 387,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "w-1/2",
										children: /* @__PURE__ */ (void 0)(Input, {
											value: exp.lieu,
											onChange: (e) => handleModifierExp(idx, { lieu: e.target.value }),
											placeholder: "Lieu (ex: Paris, France)",
											className: "h-8 text-xs"
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 403,
											columnNumber: 25
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 402,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 386,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (void 0)(Label, {
											className: "text-xs font-medium text-foreground",
											children: "Missions & Responsabilités"
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 417,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-[10px] text-muted-foreground",
											children: "Utilisez des verbes d'action"
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 420,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$10,
										lineNumber: 416,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)(Textarea, {
										rows: 3,
										value: exp.description,
										onChange: (e) => handleModifierExp(idx, { description: e.target.value }),
										placeholder: "• Gestion et pilotage de 3 chantiers transverses...\n• Analyse quantitative de 15 opportunités de marché...",
										className: "text-xs"
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 424,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 415,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "rounded-xl border border-purple-500/30 bg-purple-500/5 p-3.5 space-y-2",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-xs font-bold text-purple-300 flex items-center gap-1.5",
											children: [/* @__PURE__ */ (void 0)(TrendingUp, { className: "size-3.5 text-purple-400" }, void 0, false, {
												fileName: _jsxFileName$10,
												lineNumber: 441,
												columnNumber: 27
											}, this), "Réalisations Chiffrées & KPI d'impact (ATS Booster)"]
										}, void 0, true, {
											fileName: _jsxFileName$10,
											lineNumber: 440,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-[10px] text-purple-400 font-medium",
											children: "+20 pts Matching IA"
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 444,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$10,
										lineNumber: 439,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)(Input, {
										value: exp.kpi || exp.realisationsCles || "",
										onChange: (e) => handleModifierExp(idx, {
											kpi: e.target.value,
											realisationsCles: e.target.value
										}),
										placeholder: "Ex: +32% de taux d'ouverture email, 450k€ de budget géré, 12 audits réalisés...",
										className: "text-xs bg-background/80 border-purple-500/30"
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 448,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 438,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (void 0)(Label, {
										className: "text-xs text-muted-foreground",
										children: "Outils & Compétences mobilisés dans ce poste"
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 463,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)(Input, {
										value: exp.competences?.join(", ") || "",
										onChange: (e) => handleModifierExp(idx, { competences: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }),
										placeholder: "Ex: Notion, SQL, Excel, Figma, Analyse financière...",
										className: "text-xs"
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 466,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 462,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$10,
							lineNumber: 297,
							columnNumber: 19
						}, this)]
					}, exp.id, true, {
						fileName: _jsxFileName$10,
						lineNumber: 245,
						columnNumber: 15
					}, this);
				})]
			}, void 0, true, {
				fileName: _jsxFileName$10,
				lineNumber: 207,
				columnNumber: 9
			}, this),
			subView === "formations" && /* @__PURE__ */ (void 0)("div", {
				className: "space-y-4",
				children: [formations.length === 0 && /* @__PURE__ */ (void 0)("div", {
					className: "glass-card p-10 text-center space-y-3",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "mx-auto flex size-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400",
							children: /* @__PURE__ */ (void 0)(GraduationCap, { className: "size-6" }, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 494,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 493,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("h4", {
							className: "text-sm font-semibold text-foreground",
							children: "Aucune formation enregistrée"
						}, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 496,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground max-w-sm mx-auto",
							children: "Ajoutez votre école, université, master ou classe préparatoire."
						}, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 499,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Button, {
							size: "sm",
							variant: "outline",
							onClick: handleAjouterForm,
							className: "gap-1.5",
							children: [/* @__PURE__ */ (void 0)(Plus, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 508,
								columnNumber: 17
							}, this), "Ajouter une formation"]
						}, void 0, true, {
							fileName: _jsxFileName$10,
							lineNumber: 502,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$10,
					lineNumber: 492,
					columnNumber: 13
				}, this), formations.map((f, idx) => {
					const isExpanded = expandedForm === idx;
					const titreAffiche = f.diplome || f.etablissement || `Formation #${idx + 1}`;
					const sousTitre = [
						f.etablissement,
						f.specialisation,
						f.niveau
					].filter(Boolean).join(" • ");
					const dates = f.debut || f.fin ? `${f.debut || "?"} - ${f.enCours ? "En cours" : f.fin || "?"}` : "";
					return /* @__PURE__ */ (void 0)("div", {
						className: "glass-card overflow-hidden transition-all border border-border/70 bg-card/60",
						children: [/* @__PURE__ */ (void 0)("div", {
							onClick: () => setExpandedForm(isExpanded ? null : idx),
							className: "flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-3 min-w-0",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex size-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 font-bold text-xs",
									children: "🎓"
								}, void 0, false, {
									fileName: _jsxFileName$10,
									lineNumber: 537,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-sm font-bold text-foreground truncate",
											children: titreAffiche
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 542,
											columnNumber: 25
										}, this), f.enCours && /* @__PURE__ */ (void 0)(Badge, {
											className: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30 text-[10px] py-0",
											children: "En cours"
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 546,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$10,
										lineNumber: 541,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("p", {
										className: "text-xs text-muted-foreground truncate",
										children: [
											sousTitre,
											" ",
											dates && `• ${dates}`
										]
									}, void 0, true, {
										fileName: _jsxFileName$10,
										lineNumber: 551,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 540,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$10,
								lineNumber: 536,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (void 0)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: (e) => {
										e.stopPropagation();
										handleSupprimerForm(idx);
									},
									className: "size-8 p-0 text-muted-foreground hover:text-rose-400",
									children: /* @__PURE__ */ (void 0)(Trash2, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 567,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$10,
									lineNumber: 558,
									columnNumber: 21
								}, this), isExpanded ? /* @__PURE__ */ (void 0)(ChevronUp, { className: "size-4 text-muted-foreground" }, void 0, false, {
									fileName: _jsxFileName$10,
									lineNumber: 570,
									columnNumber: 23
								}, this) : /* @__PURE__ */ (void 0)(ChevronDown, { className: "size-4 text-muted-foreground" }, void 0, false, {
									fileName: _jsxFileName$10,
									lineNumber: 572,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$10,
								lineNumber: 557,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$10,
							lineNumber: 532,
							columnNumber: 17
						}, this), isExpanded && /* @__PURE__ */ (void 0)("div", {
							className: "p-4 sm:p-6 border-t border-border/50 space-y-4 bg-background/40",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (void 0)(Label, {
											className: "text-xs font-medium text-foreground",
											children: "Établissement / École *"
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 582,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)(Input, {
											value: f.etablissement,
											onChange: (e) => handleModifierForm(idx, { etablissement: e.target.value }),
											placeholder: "Ex: NEOMA Business School, HEC Paris, Dauphine..."
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 585,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$10,
										lineNumber: 581,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (void 0)(Label, {
											className: "text-xs font-medium text-foreground",
											children: "Intitulé du Diplôme / Cursus *"
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 597,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)(Input, {
											value: f.diplome,
											onChange: (e) => handleModifierForm(idx, { diplome: e.target.value }),
											placeholder: "Ex: Programme Grande École (PGE), Master 2 Finance..."
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 600,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$10,
										lineNumber: 596,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 580,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid gap-4 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (void 0)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Niveau d'études"
											}, void 0, false, {
												fileName: _jsxFileName$10,
												lineNumber: 614,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)(Select, {
												value: f.niveau || "Bac +5 (Master 2 / PGE / Ingénieur)",
												onValueChange: (val) => handleModifierForm(idx, { niveau: val }),
												children: [/* @__PURE__ */ (void 0)(SelectTrigger, { children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
													fileName: _jsxFileName$10,
													lineNumber: 626,
													columnNumber: 29
												}, this) }, void 0, false, {
													fileName: _jsxFileName$10,
													lineNumber: 625,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: NIVEAUX_ETUDES.map((n) => /* @__PURE__ */ (void 0)(SelectItem, {
													value: n,
													children: n
												}, n, false, {
													fileName: _jsxFileName$10,
													lineNumber: 630,
													columnNumber: 31
												}, this)) }, void 0, false, {
													fileName: _jsxFileName$10,
													lineNumber: 628,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$10,
												lineNumber: 617,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$10,
											lineNumber: 613,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (void 0)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Spécialisation / Majeure"
											}, void 0, false, {
												fileName: _jsxFileName$10,
												lineNumber: 639,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)(Input, {
												value: f.specialisation || "",
												onChange: (e) => handleModifierForm(idx, { specialisation: e.target.value }),
												placeholder: "Ex: Corporate Finance, Strategy, Data..."
											}, void 0, false, {
												fileName: _jsxFileName$10,
												lineNumber: 642,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$10,
											lineNumber: 638,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (void 0)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Mention / Distinctions"
											}, void 0, false, {
												fileName: _jsxFileName$10,
												lineNumber: 654,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)(Input, {
												value: f.mention || "",
												onChange: (e) => handleModifierForm(idx, { mention: e.target.value }),
												placeholder: "Ex: Mention Très Bien, Major de promo..."
											}, void 0, false, {
												fileName: _jsxFileName$10,
												lineNumber: 657,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$10,
											lineNumber: 653,
											columnNumber: 23
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 612,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (void 0)(Label, {
											className: "text-xs text-muted-foreground",
											children: "Date de début"
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 671,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)(Input, {
											value: f.debut,
											onChange: (e) => handleModifierForm(idx, { debut: e.target.value }),
											placeholder: "Ex: 2022"
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 674,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$10,
										lineNumber: 670,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (void 0)(Label, {
											className: "text-xs text-muted-foreground",
											children: "Date de fin / Promo"
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 684,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)(Input, {
											value: f.fin,
											onChange: (e) => handleModifierForm(idx, { fin: e.target.value }),
											placeholder: "Ex: 2026 (Promo 2026)"
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 687,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$10,
										lineNumber: 683,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 669,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (void 0)(Label, {
										className: "text-xs text-muted-foreground",
										children: "Cours clés & Projets académiques valorisables"
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 699,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)(Input, {
										value: f.coursImportants?.join(", ") || "",
										onChange: (e) => handleModifierForm(idx, { coursImportants: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }),
										placeholder: "Ex: Modélisation financière LBO, Stratégie M&A, Machine Learning appliqué, Droit des affaires...",
										className: "text-xs"
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 702,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 698,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$10,
							lineNumber: 579,
							columnNumber: 19
						}, this)]
					}, f.id, true, {
						fileName: _jsxFileName$10,
						lineNumber: 527,
						columnNumber: 15
					}, this);
				})]
			}, void 0, true, {
				fileName: _jsxFileName$10,
				lineNumber: 490,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$10,
		lineNumber: 141,
		columnNumber: 5
	}, this);
}
var _jsxFileName$9 = "/app/applet/src/components/profil/ProfilTagSuggestions.tsx";
var DEFAULT_CATEGORY_TAGS = {
	metiers: [
		"Bras Droit CEO",
		"Consultant Stratégie & Management",
		"Chef de Projet / PMO",
		"Product Manager / PO",
		"Data Analyst / BI",
		"Chargé d'Affaires M&A / Private Equity",
		"Business Developer B2B",
		"Contrôleur de Gestion Junior",
		"Auditeur Financier Junior",
		"Growth Marketer / Acquisition",
		"Consultant RSE / ESG",
		"Customer Success Manager"
	],
	domaines: [
		"Tech, SaaS & IA",
		"Banque d'Investissement & Finance",
		"Conseil en Stratégie & Organisation",
		"Luxe, Mode & Beauté",
		"Santé, Pharma & Biotech",
		"Énergie, Climat & CleanTech",
		"E-commerce & Grande Consommation",
		"Immobilier & PropTech",
		"Aéronautique, Défense & Industrie",
		"Impact, Climat & ESS"
	],
	competences: [
		"Modélisation financière",
		"Analyse de données",
		"Gestion de projet Agile / Scrum",
		"Prospection & Négociation B2B",
		"Pitch & Présentation Exécutive",
		"Audit financier & Comptabilité",
		"Stratégie Go-to-Market",
		"SEO / SEA & Growth",
		"Reporting & Tableaux de bord",
		"Étude de marché & Benchmark"
	],
	logiciels: [
		"Excel (TCD, RechercheX, VBA)",
		"Power BI",
		"SQL",
		"Python (Pandas, Numpy)",
		"Figma",
		"Notion",
		"Salesforce CRM",
		"HubSpot",
		"Google Analytics 4",
		"Tableau Software",
		"Jira / Confluence",
		"Canva"
	],
	soft_skills: [
		"Rigueur & Esprit d'analyse",
		"Leadership & Esprit d'équipe",
		"Adaptabilité & Polyvalence",
		"Aisance relationnelle",
		"Autonomie & Proactivité",
		"Sens de l'écoute & Empathie",
		"Résolution de problèmes complexes"
	],
	entreprises: [
		"McKinsey & Company",
		"Boston Consulting Group (BCG)",
		"Bain & Company",
		"BNP Paribas",
		"Société Générale",
		"L'Oréal",
		"LVMH",
		"Kering",
		"TotalEnergies",
		"Airbus",
		"Doctolib",
		"Qonto",
		"Alan"
	],
	contrats: [
		"Stage de fin d'études (6 mois)",
		"Stage de césure (6 mois)",
		"Alternance (12 mois)",
		"Alternance (24 mois)",
		"Premier CDI",
		"VIE (Volontariat International)"
	]
};
function ProfilTagSuggestions({ label = "Suggestions rapides", tags, categorie, currentValue, valeurActuelle, onSelectTag, onSelectSuggestion }) {
	const currentStr = String(currentValue ?? valeurActuelle ?? "").toLowerCase();
	const availableTags = tags && tags.length > 0 ? tags : categorie && DEFAULT_CATEGORY_TAGS[categorie] ? DEFAULT_CATEGORY_TAGS[categorie] : [];
	if (availableTags.length === 0) return null;
	const handleSelect = (tag) => {
		if (onSelectTag) onSelectTag(tag);
		if (onSelectSuggestion) onSelectSuggestion(tag);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-1.5 pt-1",
		children: [label && /* @__PURE__ */ (void 0)("span", {
			className: "text-[11px] font-medium text-muted-foreground",
			children: [label, " :"]
		}, void 0, true, {
			fileName: _jsxFileName$9,
			lineNumber: 143,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-wrap gap-1.5",
			children: availableTags.map((tag) => {
				const isSelected = currentStr.includes(tag.toLowerCase());
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => handleSelect(tag),
					className: `inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition-all ${isSelected ? "border border-primary/40 bg-primary/10 font-medium text-primary shadow-xs" : "border border-border/60 bg-muted/40 text-muted-foreground hover:border-primary/30 hover:bg-muted/80 hover:text-foreground"}`,
					children: [isSelected ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-3 text-primary" }, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 162,
						columnNumber: 17
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3 opacity-60" }, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 164,
						columnNumber: 17
					}, this), tag]
				}, tag, true, {
					fileName: _jsxFileName$9,
					lineNumber: 151,
					columnNumber: 13
				}, this);
			})
		}, void 0, false, {
			fileName: _jsxFileName$9,
			lineNumber: 147,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$9,
		lineNumber: 141,
		columnNumber: 5
	}, this);
}
var _jsxFileName$8 = "/app/applet/src/components/profil/ProfilSkillsTab.tsx";
function ProfilSkillsTab({ profil, onChange }) {
	const cv = profil.cvStructure;
	const competencesList = cv?.competences || [];
	const [nouvelleHardSkill, setNouvelleHardSkill] = (0, import_react.useState)("");
	const [niveauHardSkill, setNiveauHardSkill] = (0, import_react.useState)("Intermédiaire");
	const updateCompetences = (nouvelles) => {
		onChange({
			competences: nouvelles.map((c) => `${c.nom} (${c.niveau || "Intermédiaire"})`).join(", ") || profil.competences,
			cvStructure: {
				...cv,
				competences: nouvelles
			}
		});
	};
	const handleAjouterHardSkill = () => {
		if (!nouvelleHardSkill.trim()) return;
		const nc = {
			id: crypto.randomUUID(),
			nom: nouvelleHardSkill.trim(),
			niveau: niveauHardSkill,
			categorie: "Hard Skill"
		};
		updateCompetences([...competencesList, nc]);
		setNouvelleHardSkill("");
	};
	const handleSupprimerCompetence = (id) => {
		updateCompetences(competencesList.filter((c) => c.id !== id));
	};
	const handleModifierNiveau = (id, niveau) => {
		updateCompetences(competencesList.map((c) => c.id === id ? {
			...c,
			niveau
		} : c));
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Cpu, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 88,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 87,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: [
								"Hard Skills & Compétences Techniques (",
								competencesList.length,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 91,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "Définissez votre niveau de maîtrise pour affiner le calcul de compatibilité du Match IA"
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 94,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 90,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 86,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap gap-2 items-end",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex-1 min-w-[240px] space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs text-muted-foreground",
									children: "Compétence technique"
								}, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 104,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: nouvelleHardSkill,
									onChange: (e) => setNouvelleHardSkill(e.target.value),
									onKeyDown: (e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											handleAjouterHardSkill();
										}
									},
									placeholder: "Ex : Modélisation financière, Python, SEO, Google Ads, UX Research..."
								}, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 107,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 103,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "w-40 space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs text-muted-foreground",
									children: "Niveau"
								}, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 121,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
									value: niveauHardSkill,
									onValueChange: (v) => setNiveauHardSkill(v),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
										className: "text-xs h-10",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 127,
											columnNumber: 17
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 126,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: NIVEAUX_COMPETENCE.map((n) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: n,
										className: "text-xs",
										children: n
									}, n, false, {
										fileName: _jsxFileName$8,
										lineNumber: 131,
										columnNumber: 19
									}, this)) }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 129,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 122,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 120,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								type: "button",
								onClick: handleAjouterHardSkill,
								className: "gap-1.5 bg-purple-600 hover:bg-purple-500 text-white h-10 px-4 shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 144,
									columnNumber: 13
								}, this), "Ajouter"]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 139,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 102,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProfilTagSuggestions, {
						categorie: "competences",
						valeurActuelle: profil.competences,
						onSelectSuggestion: (nom) => {
							if (!competencesList.some((c) => c.nom.toLowerCase() === nom.toLowerCase())) {
								const nc = {
									id: crypto.randomUUID(),
									nom,
									niveau: "Intermédiaire",
									categorie: "Hard Skill"
								};
								updateCompetences([...competencesList, nc]);
							}
						}
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 149,
						columnNumber: 9
					}, this),
					competencesList.length > 0 && /* @__PURE__ */ (void 0)("div", {
						className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3 pt-2",
						children: competencesList.map((comp) => /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between gap-2 rounded-xl border border-border/70 bg-card/60 p-2.5 px-3 transition-colors hover:border-purple-500/30",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "block text-xs font-semibold text-foreground truncate",
									children: comp.nom
								}, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 178,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-[10px] text-purple-400 font-medium",
									children: comp.niveau || "Intermédiaire"
								}, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 181,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 177,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (void 0)(Select, {
									value: comp.niveau || "Intermédiaire",
									onValueChange: (n) => handleModifierNiveau(comp.id, n),
									children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
										className: "h-6 w-20 text-[10px] px-1.5 border-border/60",
										children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 194,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 193,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: NIVEAUX_COMPETENCE.map((n) => /* @__PURE__ */ (void 0)(SelectItem, {
										value: n,
										className: "text-xs",
										children: n
									}, n, false, {
										fileName: _jsxFileName$8,
										lineNumber: 198,
										columnNumber: 25
									}, this)) }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 196,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 187,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => handleSupprimerCompetence(comp.id),
									className: "h-6 w-6 p-0 text-muted-foreground hover:text-rose-400",
									children: /* @__PURE__ */ (void 0)(X, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 211,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 205,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 186,
								columnNumber: 17
							}, this)]
						}, comp.id, true, {
							fileName: _jsxFileName$8,
							lineNumber: 173,
							columnNumber: 15
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 171,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$8,
				lineNumber: 85,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Wrench, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 224,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 223,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: "Logiciels & Outils du Quotidien"
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 227,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "Outils bureautiques, design, analytics, développement et CRM"
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 230,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 226,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 222,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "text-xs text-muted-foreground",
							children: "Logiciels maîtrisés (séparés par des virgules)"
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 237,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
							value: profil.logiciels,
							onChange: (e) => onChange({ logiciels: e.target.value }),
							placeholder: "Ex : Excel (RechercheX, TCD, VBA), Figma, Notion, Salesforce, Google Analytics, PowerBI, SQL, Slack..."
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 240,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 236,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProfilTagSuggestions, {
						categorie: "logiciels",
						valeurActuelle: profil.logiciels,
						onSelectSuggestion: (val) => {
							const current = profil.logiciels ? profil.logiciels.split(",").map((s) => s.trim()).filter(Boolean) : [];
							if (!current.includes(val)) onChange({ logiciels: [...current, val].join(", ") });
						}
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 247,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$8,
				lineNumber: 221,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3 border-b border-border/50 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex size-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 268,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 267,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: "Soft Skills & Savoir-être"
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 271,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "Qualités humaines et relationnelles valorisées en entretien"
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 274,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 270,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$8,
					lineNumber: 266,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
						className: "text-xs text-muted-foreground",
						children: "Vos atouts relationnels et méthodes de travail"
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 281,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						value: (cv?.softSkills || []).join(", "),
						onChange: (e) => onChange({ cvStructure: {
							...cv,
							softSkills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
						} }),
						placeholder: "Ex : Aisance relationnelle, Esprit d'analyse, Rigueur, Leadership, Autonomie, Adaptabilité, Esprit d'équipe..."
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 284,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$8,
					lineNumber: 280,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$8,
				lineNumber: 265,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$8,
		lineNumber: 83,
		columnNumber: 5
	}, this);
}
var _jsxFileName$7 = "/app/applet/src/components/profil/ProfilLanguagesTab.tsx";
var NIVEAUX_LANGUES = [
	{
		value: "Langue maternelle",
		label: "Langue maternelle",
		desc: "Natif"
	},
	{
		value: "Bilingue",
		label: "Bilingue (C2)",
		desc: "Aisance totale et fluide"
	},
	{
		value: "Courant",
		label: "Courant (C1)",
		desc: "Capacité à négocier et travailler"
	},
	{
		value: "Professionnel",
		label: "Professionnel (B2)",
		desc: "Autonomie en réunion et à l'écrit"
	},
	{
		value: "Intermédiaire",
		label: "Intermédiaire (B1)",
		desc: "Compréhension et échanges simples"
	},
	{
		value: "Notions",
		label: "Notions (A2/A1)",
		desc: "Bases élémentaires"
	}
];
var SUGGESTIONS_LANGUES = [
	"Anglais",
	"Français",
	"Espagnol",
	"Allemand",
	"Italien",
	"Mandarin",
	"Arabe",
	"Portugais",
	"Japonais",
	"Russe"
];
function ProfilLanguagesTab({ profil, onChange }) {
	const cv = profil.cvStructure;
	const langues = cv?.langues || [];
	const [nouvelleLangueNom, setNouvelleLangueNom] = (0, import_react.useState)("");
	const [nouveauNiveau, setNouveauNiveau] = (0, import_react.useState)("Courant");
	const [nouvelleCertif, setNouvelleCertif] = (0, import_react.useState)("");
	const [nouveauScore, setNouveauScore] = (0, import_react.useState)("");
	const updateLangues = (nouvellesLangues) => {
		const anglaisItem = nouvellesLangues.find((l) => l.nom.toLowerCase().includes("anglais"));
		onChange({
			langues: nouvellesLangues.map((l) => `${l.nom} (${l.niveau})`).join(", "),
			niveauAnglais: anglaisItem?.niveau || profil.niveauAnglais,
			cvStructure: {
				...cv,
				langues: nouvellesLangues
			}
		});
	};
	const handleAjouterLangue = () => {
		const nom = nouvelleLangueNom.trim();
		if (!nom) return;
		const nl = {
			id: crypto.randomUUID(),
			nom,
			niveau: nouveauNiveau,
			certification: nouvelleCertif.trim() || void 0,
			score: nouveauScore.trim() || void 0
		};
		updateLangues([...langues, nl]);
		setNouvelleLangueNom("");
		setNouvelleCertif("");
		setNouveauScore("");
	};
	const handleSupprimerLangue = (id) => {
		updateLangues(langues.filter((l) => l.id !== id));
	};
	const handleModifierNiveau = (id, niveau) => {
		updateLangues(langues.map((l) => l.id === id ? {
			...l,
			niveau
		} : l));
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "glass-card p-5 sm:p-6 space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3 border-b border-border/50 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex size-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Earth, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 132,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 131,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: [
							"Langues & Niveaux CECRL (",
							langues.length,
							")"
						]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 135,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "Précisez vos langues de travail, niveaux d'aisance et scores certifiés"
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 138,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 134,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 130,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
						className: "text-xs text-muted-foreground",
						children: "Suggestions rapides :"
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 147,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap gap-1.5",
						children: SUGGESTIONS_LANGUES.map((sug) => {
							const alreadyAdded = langues.some((l) => l.nom.toLowerCase() === sug.toLowerCase());
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setNouvelleLangueNom(sug),
								disabled: alreadyAdded,
								className: `text-xs px-2.5 py-1 rounded-lg border transition-all ${alreadyAdded ? "opacity-40 cursor-not-allowed border-border/50 text-muted-foreground" : "border-border/70 hover:border-cyan-500/40 hover:bg-cyan-500/10 text-foreground"}`,
								children: ["+ ", sug]
							}, sug, true, {
								fileName: _jsxFileName$7,
								lineNumber: 156,
								columnNumber: 17
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 150,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 146,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-3 sm:grid-cols-4 items-end",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5 sm:col-span-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-foreground font-medium",
								children: "Langue *"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 177,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: nouvelleLangueNom,
								onChange: (e) => setNouvelleLangueNom(e.target.value),
								placeholder: "Ex: Anglais, Espagnol...",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 180,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 176,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5 sm:col-span-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-foreground font-medium",
								children: "Niveau CECRL"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 189,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
								value: nouveauNiveau,
								onValueChange: (val) => setNouveauNiveau(val),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
									className: "text-xs",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 197,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 196,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: NIVEAUX_LANGUES.map((n) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: n.value,
									className: "text-xs",
									children: n.label
								}, n.value, false, {
									fileName: _jsxFileName$7,
									lineNumber: 201,
									columnNumber: 19
								}, this)) }, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 199,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 192,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 188,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5 sm:col-span-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Certif & Score (optionnel)"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 210,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: nouveauScore,
								onChange: (e) => setNouveauScore(e.target.value),
								placeholder: "Ex: TOEIC 945, IELTS 7.5...",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 213,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 209,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							onClick: handleAjouterLangue,
							disabled: !nouvelleLangueNom.trim(),
							className: "gap-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs h-10 w-full",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 227,
								columnNumber: 13
							}, this), "Ajouter la langue"]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 221,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 175,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$7,
			lineNumber: 129,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-3",
			children: [langues.length === 0 && /* @__PURE__ */ (void 0)("p", {
				className: "text-xs text-muted-foreground text-center py-6 glass-card",
				children: "Aucune langue enregistrée. L'anglais et votre langue maternelle sont essentiels pour le Match IA."
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 236,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: langues.map((l) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "glass-card p-4 rounded-xl border border-border/70 flex items-center justify-between gap-3 bg-card/60",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "min-w-0 space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-sm font-bold text-foreground truncate",
								children: l.nom
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 250,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "outline",
								className: "text-[10px] bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
								children: l.niveau
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 253,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 249,
							columnNumber: 17
						}, this), l.score && /* @__PURE__ */ (void 0)("span", {
							className: "text-xs text-purple-300 block font-medium",
							children: ["🏆 ", l.score]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 261,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 248,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
							value: l.niveau,
							onValueChange: (val) => handleModifierNiveau(l.id, val),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
								className: "h-7 w-28 text-[11px] border-border/60",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 275,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 274,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: NIVEAUX_LANGUES.map((n) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
								value: n.value,
								className: "text-xs",
								children: n.label
							}, n.value, false, {
								fileName: _jsxFileName$7,
								lineNumber: 279,
								columnNumber: 23
							}, this)) }, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 277,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 268,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => handleSupprimerLangue(l.id),
							className: "size-7 p-0 text-muted-foreground hover:text-rose-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 296,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 290,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 267,
						columnNumber: 15
					}, this)]
				}, l.id, true, {
					fileName: _jsxFileName$7,
					lineNumber: 244,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 242,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$7,
			lineNumber: 234,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$7,
		lineNumber: 127,
		columnNumber: 5
	}, this);
}
var _jsxFileName$6 = "/app/applet/src/components/profil/ProfilCertificationsTab.tsx";
var SUGGESTIONS_CERTIFS = [
	"AMF (Autorité des Marchés Financiers)",
	"CFA Level 1",
	"Bloomberg Market Concepts (BMC)",
	"AWS Certified Cloud Practitioner",
	"Google Analytics Certification",
	"Google Cloud Digital Leader",
	"Microsoft Excel Expert (MO-201)",
	"Scrum Master (PSM I)",
	"HubSpot Inbound Marketing",
	"SQL / DataCamp Data Analyst"
];
function ProfilCertificationsTab({ profil, onChange }) {
	const cv = profil.cvStructure;
	const certifs = cv?.certifications || [];
	const [nouveauNom, setNouveauNom] = (0, import_react.useState)("");
	const [nouvelOrganisme, setNouvelOrganisme] = (0, import_react.useState)("");
	const [nouvelleDate, setNouvelleDate] = (0, import_react.useState)("");
	const [nouveauLien, setNouveauLien] = (0, import_react.useState)("");
	const [nouveauIdentifiant, setNouveauIdentifiant] = (0, import_react.useState)("");
	const updateCertifs = (nouvellesCertifs) => {
		onChange({ cvStructure: {
			...cv,
			certifications: nouvellesCertifs
		} });
	};
	const handleAjouterCertif = () => {
		const nom = nouveauNom.trim();
		if (!nom) return;
		const nc = {
			id: crypto.randomUUID(),
			nom,
			organisme: nouvelOrganisme.trim() || void 0,
			date: nouvelleDate.trim() || void 0,
			lien: nouveauLien.trim() || void 0,
			identifiant: nouveauIdentifiant.trim() || void 0
		};
		updateCertifs([nc, ...certifs]);
		setNouveauNom("");
		setNouvelOrganisme("");
		setNouvelleDate("");
		setNouveauLien("");
		setNouveauIdentifiant("");
	};
	const handleSupprimerCertif = (id) => {
		updateCertifs(certifs.filter((c) => c.id !== id));
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "glass-card p-5 sm:p-6 space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3 border-b border-border/50 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Award, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 96,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 95,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: [
							"Certifications Professionnelles & Accréditations (",
							certifs.length,
							")"
						]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 99,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "Valorisez vos diplômes certifiants, certifications tech, finance, marketing ou cloud"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 103,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 98,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 94,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
						className: "text-xs text-muted-foreground",
						children: "Certifications reconnues :"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 112,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap gap-1.5",
						children: SUGGESTIONS_CERTIFS.map((sug) => {
							const alreadyAdded = certifs.some((c) => c.nom.toLowerCase() === sug.toLowerCase());
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setNouveauNom(sug),
								disabled: alreadyAdded,
								className: `text-xs px-2.5 py-1 rounded-lg border transition-all ${alreadyAdded ? "opacity-40 cursor-not-allowed border-border/50 text-muted-foreground" : "border-border/70 hover:border-emerald-500/40 hover:bg-emerald-500/10 text-foreground"}`,
								children: ["+ ", sug]
							}, sug, true, {
								fileName: _jsxFileName$6,
								lineNumber: 121,
								columnNumber: 17
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 115,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 111,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-foreground font-medium",
								children: "Intitulé de la Certification *"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 142,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: nouveauNom,
								onChange: (e) => setNouveauNom(e.target.value),
								placeholder: "Ex: Certification AMF, AWS Solutions Architect...",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 145,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 141,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Organisme émetteur"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 154,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: nouvelOrganisme,
								onChange: (e) => setNouvelOrganisme(e.target.value),
								placeholder: "Ex: Autorité des Marchés Financiers, Amazon Web Services...",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 157,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 153,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Date d'obtention"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 166,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: nouvelleDate,
								onChange: (e) => setNouvelleDate(e.target.value),
								placeholder: "Ex: Mars 2024 ou 2024",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 169,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 165,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Numéro / ID de licence"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 178,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: nouveauIdentifiant,
								onChange: (e) => setNouveauIdentifiant(e.target.value),
								placeholder: "Ex: AMF-2024-98421",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 181,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 177,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Lien de vérification (Badge / URL)"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 190,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: nouveauLien,
								onChange: (e) => setNouveauLien(e.target.value),
								placeholder: "https://credly.com/...",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 193,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 189,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 140,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					onClick: handleAjouterCertif,
					disabled: !nouveauNom.trim(),
					className: "gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs w-full sm:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 208,
						columnNumber: 11
					}, this), "Ajouter la certification"]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 202,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 93,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-3",
			children: [certifs.length === 0 && /* @__PURE__ */ (void 0)("p", {
				className: "text-xs text-muted-foreground text-center py-6 glass-card",
				children: "Aucune certification enregistrée. Une certification officielle apporte une crédibilité immédiate à votre profil !"
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 216,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: certifs.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "glass-card p-4 rounded-xl border border-border/70 flex flex-col justify-between gap-3 bg-card/60",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex size-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Award, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 232,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 231,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-bold text-foreground",
									children: c.nom
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 234,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 230,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => handleSupprimerCertif(c.id),
								className: "size-6 p-0 text-muted-foreground hover:text-rose-400 shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-3" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 245,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 239,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 229,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1 text-xs text-muted-foreground",
							children: [
								c.organisme && /* @__PURE__ */ (void 0)("p", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (void 0)(Building, { className: "size-3 text-muted-foreground/70" }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 252,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("span", { children: c.organisme }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 253,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 251,
									columnNumber: 21
								}, this),
								c.date && /* @__PURE__ */ (void 0)("p", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (void 0)(Calendar, { className: "size-3 text-muted-foreground/70" }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 258,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("span", { children: ["Obtenu en : ", c.date] }, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 259,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 257,
									columnNumber: 21
								}, this),
								c.identifiant && /* @__PURE__ */ (void 0)("p", {
									className: "text-[11px] font-mono text-purple-300",
									children: ["ID : ", c.identifiant]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 263,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 249,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 228,
						columnNumber: 15
					}, this), c.lien && /* @__PURE__ */ (void 0)("a", {
						href: c.lien,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 hover:text-emerald-300",
						children: [/* @__PURE__ */ (void 0)(ExternalLink, { className: "size-3" }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 277,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)("span", { children: "Vérifier l'authenticité" }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 278,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 271,
						columnNumber: 17
					}, this)]
				}, c.id, true, {
					fileName: _jsxFileName$6,
					lineNumber: 224,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 222,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 214,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 91,
		columnNumber: 5
	}, this);
}
var _jsxFileName$5 = "/app/applet/src/components/profil/ProfilProjectsEngagementsTab.tsx";
function ProfilProjectsEngagementsTab({ profil, onChange }) {
	const cv = profil.cvStructure;
	const projets = cv?.projets || [];
	const benevolats = cv?.benevolats || [];
	cv?.distinctions;
	const updateProjets = (nouv) => {
		onChange({ cvStructure: {
			...cv,
			projets: nouv
		} });
	};
	const updateBenevolats = (nouv) => {
		onChange({ cvStructure: {
			...cv,
			benevolats: nouv
		} });
	};
	const handleAjouterProjet = () => {
		updateProjets([nouveauProjet(), ...projets]);
	};
	const handleSupprimerProjet = (id) => {
		updateProjets(projets.filter((p) => p.id !== id));
	};
	const handleModifierProjet = (id, patch) => {
		updateProjets(projets.map((p) => p.id === id ? {
			...p,
			...patch
		} : p));
	};
	const handleAjouterBenevolat = () => {
		updateBenevolats([nouveauBenevolat(), ...benevolats]);
	};
	const handleSupprimerBenevolat = (id) => {
		updateBenevolats(benevolats.filter((b) => b.id !== id));
	};
	const handleModifierBenevolat = (id, patch) => {
		updateBenevolats(benevolats.map((b) => b.id === id ? {
			...b,
			...patch
		} : b));
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lightbulb, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 97,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 96,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-sm font-semibold text-foreground",
								children: [
									"Projets Personnels, Freelance & Hackathons (",
									projets.length,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 100,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: "Applications créées, études de cas, business plans ou projets concrets"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 103,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 99,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 95,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							onClick: handleAjouterProjet,
							className: "gap-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 115,
								columnNumber: 13
							}, this), "Ajouter un projet"]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 110,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 94,
						columnNumber: 9
					}, this),
					projets.length === 0 && /* @__PURE__ */ (void 0)("p", {
						className: "text-xs text-muted-foreground text-center py-4",
						children: "Aucun projet renseigné. Les projets concrets prouvent vos compétences pratiques !"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 121,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-4",
						children: projets.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-xl border border-border/70 bg-card/50 p-4 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										value: p.titre,
										onChange: (e) => handleModifierProjet(p.id, { titre: e.target.value }),
										placeholder: "Nom du projet (ex: Lancement d'un e-commerce, Hackathon IA...)",
										className: "text-xs font-semibold"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 134,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => handleSupprimerProjet(p.id),
										className: "h-8 w-8 p-0 text-muted-foreground hover:text-rose-400 shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 148,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 142,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 133,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-3 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
											value: p.role || "",
											onChange: (e) => handleModifierProjet(p.id, { role: e.target.value }),
											placeholder: "Votre rôle (ex: Lead Product, Développeur...)",
											className: "text-xs"
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 153,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
											value: p.periode || "",
											onChange: (e) => handleModifierProjet(p.id, { periode: e.target.value }),
											placeholder: "Période (ex: 2024, 3 mois...)",
											className: "text-xs"
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 161,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
											value: p.url || "",
											onChange: (e) => handleModifierProjet(p.id, { url: e.target.value }),
											placeholder: "Lien / Demo (ex: github.com/...)",
											className: "text-xs"
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 169,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 152,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
									rows: 2,
									value: p.description || "",
									onChange: (e) => handleModifierProjet(p.id, { description: e.target.value }),
									placeholder: "Description du projet, contexte et résultats obtenus...",
									className: "text-xs"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 179,
									columnNumber: 15
								}, this)
							]
						}, p.id, true, {
							fileName: _jsxFileName$5,
							lineNumber: 129,
							columnNumber: 13
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 127,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 93,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex size-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeartHandshake, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 198,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 197,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-sm font-semibold text-foreground",
								children: [
									"Associations Étudiantes & Engagements (",
									benevolats.length,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 201,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: "Mandats BDE, Junior-Entreprise, pôle humanitaire, clubs sportifs..."
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 204,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 200,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 196,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							onClick: handleAjouterBenevolat,
							className: "gap-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 216,
								columnNumber: 13
							}, this), "Ajouter un engagement"]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 211,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 195,
						columnNumber: 9
					}, this),
					benevolats.length === 0 && /* @__PURE__ */ (void 0)("p", {
						className: "text-xs text-muted-foreground text-center py-4",
						children: "Aucun engagement associatif renseigné."
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 222,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-4",
						children: benevolats.map((b) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-xl border border-border/70 bg-card/50 p-4 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										value: b.organisation,
										onChange: (e) => handleModifierBenevolat(b.id, { organisation: e.target.value }),
										placeholder: "Nom de l'association / Organisation (ex: Junior Entreprise, BDE...)",
										className: "text-xs font-semibold"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 234,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => handleSupprimerBenevolat(b.id),
										className: "h-8 w-8 p-0 text-muted-foreground hover:text-rose-400 shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 250,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 244,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 233,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										value: b.role,
										onChange: (e) => handleModifierBenevolat(b.id, { role: e.target.value }),
										placeholder: "Rôle / Mandat (ex: Vice-Président, Trésorier, Chef de projet...)",
										className: "text-xs"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 255,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										value: b.periode || "",
										onChange: (e) => handleModifierBenevolat(b.id, { periode: e.target.value }),
										placeholder: "Période (ex: 2023 - 2024)",
										className: "text-xs"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 263,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 254,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
									rows: 2,
									value: b.description || "",
									onChange: (e) => handleModifierBenevolat(b.id, { description: e.target.value }),
									placeholder: "Réalisations : gestion de budget, organisation d'événements (nb de participants)...",
									className: "text-xs"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 273,
									columnNumber: 15
								}, this)
							]
						}, b.id, true, {
							fileName: _jsxFileName$5,
							lineNumber: 229,
							columnNumber: 13
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 227,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 194,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3 border-b border-border/50 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Compass, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 291,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 290,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: "Centres d'intérêt & Passions Authentiques"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 294,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "Sports, musique, voyages, lectures, centres de curiosité personnelle"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 297,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 293,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 289,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
					value: (cv?.centresInteret || []).join(", "),
					onChange: (e) => onChange({ cvStructure: {
						...cv,
						centresInteret: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
					} }),
					placeholder: "Ex : Course à pied (Semi-marathon de Paris), Piano jazz (10 ans de pratique), Voyages en autonomie, Échecs...",
					className: "text-xs"
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 304,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 288,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 91,
		columnNumber: 5
	}, this);
}
var _jsxFileName$4 = "/app/applet/src/components/CvBuilder.tsx";
function Champ({ label, value, onChange, placeholder, className, type }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn("grid min-w-0 gap-1.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
			className: "text-xs text-muted-foreground",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 68,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
			value,
			type,
			placeholder,
			onChange: (e) => onChange(e.target.value)
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 69,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 67,
		columnNumber: 5
	}, this);
}
function Bloc({ icone: Icone, titre, compte, onAjouter, labelAjout, children, defaultOpen }) {
	const [open, setOpen] = (0, import_react.useState)(defaultOpen ?? true);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "glass-card overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
			className: "flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				onClick: () => setOpen((o) => !o),
				className: "flex min-w-0 items-center gap-3 text-left",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icone, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 106,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 105,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "block truncate text-sm font-semibold",
							children: titre
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 109,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "block text-xs text-muted-foreground",
							children: [
								compte,
								" élément",
								compte > 1 ? "s" : ""
							]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 112,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 108,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: cn("size-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180") }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 116,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 100,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				size: "sm",
				variant: "outline",
				onClick: onAjouter,
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 124,
						columnNumber: 11
					}, this),
					" ",
					labelAjout
				]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 123,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 99,
			columnNumber: 7
		}, this), open && /* @__PURE__ */ (void 0)("div", {
			className: "grid gap-4 border-t border-border/60 p-4 sm:p-5",
			children
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 128,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 98,
		columnNumber: 5
	}, this);
}
function Carte({ titre, sousTitre, onSupprimer, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
		className: "rounded-2xl border border-border/60 bg-card/40 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mb-3 flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "truncate text-sm font-medium",
					children: titre || "Nouvel élément"
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 151,
					columnNumber: 11
				}, this), sousTitre && /* @__PURE__ */ (void 0)("p", {
					className: "truncate text-xs text-muted-foreground",
					children: sousTitre
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 155,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 150,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				size: "icon",
				variant: "ghost",
				className: "size-8 text-muted-foreground hover:text-destructive",
				onClick: onSupprimer,
				"aria-label": "Supprimer",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4" }, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 167,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 160,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 149,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-3",
			children
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 170,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 148,
		columnNumber: 5
	}, this);
}
function ListePuces({ label, valeurs, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
					className: "text-xs text-muted-foreground",
					children: label
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 189,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					variant: "ghost",
					className: "h-7 px-2 text-xs",
					onClick: () => onChange([...valeurs, ""]),
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 196,
						columnNumber: 11
					}, this), " Ajouter"]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 190,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 188,
				columnNumber: 7
			}, this),
			valeurs.length === 0 && /* @__PURE__ */ (void 0)("p", {
				className: "text-xs text-muted-foreground",
				children: "Aucune ligne pour l'instant."
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 200,
				columnNumber: 9
			}, this),
			valeurs.map((v, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
					value: v,
					placeholder,
					onChange: (e) => {
						const next = [...valeurs];
						next[i] = e.target.value;
						onChange(next);
					}
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 206,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "icon",
					variant: "ghost",
					className: "size-8 shrink-0 text-muted-foreground hover:text-destructive",
					onClick: () => onChange(valeurs.filter((_, j) => j !== i)),
					"aria-label": "Retirer",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 222,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 215,
					columnNumber: 11
				}, this)]
			}, i, true, {
				fileName: _jsxFileName$4,
				lineNumber: 205,
				columnNumber: 9
			}, this))
		]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 187,
		columnNumber: 5
	}, this);
}
var ONGLETS = [
	{
		id: "identite",
		label: "Identité",
		icone: UserRound
	},
	{
		id: "experiences",
		label: "Expériences",
		icone: Briefcase
	},
	{
		id: "formations",
		label: "Formations",
		icone: GraduationCap
	},
	{
		id: "competences",
		label: "Compétences & langues",
		icone: Wrench
	},
	{
		id: "realisations",
		label: "Certifs & projets",
		icone: Award
	},
	{
		id: "engagements",
		label: "Engagements",
		icone: Heart
	}
];
function CvBuilder({ value, onChange }) {
	const [onglet, setOnglet] = (0, import_react.useState)("identite");
	const set = (patch) => onChange({
		...value,
		...patch
	});
	const maj = (cle, index, patch) => {
		const next = value[cle].map((x, i) => i === index ? {
			...x,
			...patch
		} : x);
		set({ [cle]: next });
	};
	const retirer = (cle, index) => {
		const liste = value[cle];
		set({ [cle]: liste.filter((_, i) => i !== index) });
	};
	const completion = completionCv(value);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2 text-sm font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4 text-primary" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 268,
								columnNumber: 13
							}, this), " Complétion de votre CV"]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 267,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-sm font-semibold text-primary",
							children: [completion, " %"]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 270,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 266,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Progress, {
						value: completion,
						className: "mt-3 h-2"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 274,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "Plus votre CV est détaillé, plus le Match IA et la préparation aux entretiens sont précis."
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 275,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 265,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
				className: "-mx-1 flex gap-2 overflow-x-auto px-1 pb-1",
				children: ONGLETS.map((o) => {
					const Icone = o.icone;
					const actif = onglet === o.id;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setOnglet(o.id),
						className: cn("flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition", actif ? "border-primary/40 bg-primary/15 text-primary" : "border-border/60 bg-card/40 text-muted-foreground hover:text-foreground"),
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icone, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 296,
								columnNumber: 15
							}, this),
							" ",
							o.label
						]
					}, o.id, true, {
						fileName: _jsxFileName$4,
						lineNumber: 285,
						columnNumber: 13
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 280,
				columnNumber: 7
			}, this),
			onglet === "identite" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: /* @__PURE__ */ (void 0)("section", {
				className: "glass-card p-4 sm:p-5",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (void 0)("span", {
						className: "grid size-9 place-items-center rounded-xl bg-primary/10 text-primary",
						children: /* @__PURE__ */ (void 0)(UserRound, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 308,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 307,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("h3", {
						className: "text-sm font-semibold",
						children: "En-tête du CV"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 310,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 306,
					columnNumber: 13
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Titre du CV",
							value: value.titre,
							onChange: (v) => set({ titre: v }),
							placeholder: "Étudiant M1 — Marketing digital"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 313,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Ville",
							value: value.ville,
							onChange: (v) => set({ ville: v }),
							placeholder: "Paris"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 319,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Email",
							value: value.email,
							onChange: (v) => set({ email: v }),
							placeholder: "prenom.nom@email.com"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 325,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Téléphone",
							value: value.telephone,
							onChange: (v) => set({ telephone: v })
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 331,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Champ, {
							label: "LinkedIn",
							value: value.linkedin,
							onChange: (v) => set({ linkedin: v }),
							placeholder: "linkedin.com/in/…"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 336,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Portfolio / site",
							value: value.portfolio,
							onChange: (v) => set({ portfolio: v })
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 342,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Permis / mobilité",
							value: value.permis,
							onChange: (v) => set({ permis: v }),
							placeholder: "Permis B, véhiculé"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 347,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid gap-1.5 sm:col-span-2",
							children: [/* @__PURE__ */ (void 0)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Accroche"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 354,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(Textarea, {
								rows: 3,
								value: value.accroche,
								onChange: (e) => set({ accroche: e.target.value }),
								placeholder: "2 à 3 phrases sur votre projet et votre valeur ajoutée."
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 357,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 353,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 312,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 305,
				columnNumber: 11
			}, this) }, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 303,
				columnNumber: 9
			}, this),
			onglet === "experiences" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: /* @__PURE__ */ (void 0)(Bloc, {
				icone: Briefcase,
				titre: "Expériences",
				compte: value.experiences.length,
				labelAjout: "Expérience",
				onAjouter: () => set({ experiences: [...value.experiences, nouvelleExperience()] }),
				children: [value.experiences.length === 0 && /* @__PURE__ */ (void 0)("p", {
					className: "text-sm text-muted-foreground",
					children: "Ajoutez vos stages, alternances, jobs et missions."
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 383,
					columnNumber: 15
				}, this), value.experiences.map((e, i) => /* @__PURE__ */ (void 0)(Carte, {
					titre: e.poste,
					sousTitre: [e.entreprise, e.lieu].filter(Boolean).join(" · "),
					onSupprimer: () => retirer("experiences", i),
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (void 0)(Champ, {
									label: "Poste",
									value: e.poste,
									onChange: (v) => maj("experiences", i, { poste: v })
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 395,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)(Champ, {
									label: "Entreprise",
									value: e.entreprise,
									onChange: (v) => maj("experiences", i, { entreprise: v })
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 400,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)(Champ, {
									label: "Lieu",
									value: e.lieu,
									onChange: (v) => maj("experiences", i, { lieu: v })
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 405,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)(Champ, {
									label: "Type de contrat",
									value: e.contrat,
									onChange: (v) => maj("experiences", i, { contrat: v }),
									placeholder: "Stage, alternance, CDD…"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 410,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)(Champ, {
									label: "Début",
									value: e.debut,
									onChange: (v) => maj("experiences", i, { debut: v }),
									placeholder: "09/2024"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 416,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)(Champ, {
									label: "Fin",
									value: e.fin,
									onChange: (v) => maj("experiences", i, { fin: v }),
									placeholder: "02/2025"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 422,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 394,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("label", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (void 0)(Switch, {
								checked: e.enCours,
								onCheckedChange: (v) => maj("experiences", i, { enCours: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 430,
								columnNumber: 19
							}, this), "Poste actuel"]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 429,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (void 0)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Contexte / missions"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 439,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)(Textarea, {
								rows: 3,
								value: e.description,
								onChange: (ev) => maj("experiences", i, { description: ev.target.value })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 442,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 438,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)(ListePuces, {
							label: "Réalisations (une par ligne)",
							valeurs: e.realisations,
							placeholder: "Augmenté le taux d'ouverture de 18 %",
							onChange: (v) => maj("experiences", i, { realisations: v })
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 450,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)(ListePuces, {
							label: "Compétences mobilisées",
							valeurs: e.competences,
							placeholder: "Excel avancé",
							onChange: (v) => maj("experiences", i, { competences: v })
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 456,
							columnNumber: 17
						}, this)
					]
				}, e.id, true, {
					fileName: _jsxFileName$4,
					lineNumber: 388,
					columnNumber: 15
				}, this))]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 373,
				columnNumber: 11
			}, this) }, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 370,
				columnNumber: 9
			}, this),
			onglet === "formations" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: /* @__PURE__ */ (void 0)(Bloc, {
				icone: GraduationCap,
				titre: "Formations",
				compte: value.formations.length,
				labelAjout: "Formation",
				onAjouter: () => set({ formations: [...value.formations, nouvelleFormation()] }),
				children: value.formations.map((f, i) => /* @__PURE__ */ (void 0)(Carte, {
					titre: f.diplome,
					sousTitre: f.etablissement,
					onSupprimer: () => retirer("formations", i),
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Diplôme",
								value: f.diplome,
								onChange: (v) => maj("formations", i, { diplome: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 489,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Établissement",
								value: f.etablissement,
								onChange: (v) => maj("formations", i, { etablissement: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 494,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Lieu",
								value: f.lieu,
								onChange: (v) => maj("formations", i, { lieu: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 499,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Mention",
								value: f.mention,
								onChange: (v) => maj("formations", i, { mention: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 504,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Début",
								value: f.debut,
								onChange: (v) => maj("formations", i, { debut: v }),
								placeholder: "2023"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 509,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Fin",
								value: f.fin,
								onChange: (v) => maj("formations", i, { fin: v }),
								placeholder: "2026"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 515,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 488,
						columnNumber: 17
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (void 0)(Label, {
							className: "text-xs text-muted-foreground",
							children: "Spécialisations, cours clés, projets"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 523,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)(Textarea, {
							rows: 2,
							value: f.details,
							onChange: (ev) => maj("formations", i, { details: ev.target.value })
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 526,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 522,
						columnNumber: 17
					}, this)]
				}, f.id, true, {
					fileName: _jsxFileName$4,
					lineNumber: 482,
					columnNumber: 15
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 472,
				columnNumber: 11
			}, this) }, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 469,
				columnNumber: 9
			}, this),
			onglet === "competences" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Bloc, {
				icone: Wrench,
				titre: "Compétences",
				compte: value.competences.length,
				labelAjout: "Compétence",
				onAjouter: () => set({ competences: [...value.competences, nouvelleCompetence()] }),
				children: value.competences.map((c, i) => /* @__PURE__ */ (void 0)("div", {
					className: "grid items-end gap-3 rounded-2xl border border-border/60 bg-card/40 p-3 sm:grid-cols-[1fr_1fr_1fr_auto]",
					children: [
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Compétence",
							value: c.nom,
							onChange: (v) => maj("competences", i, { nom: v })
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 558,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Catégorie",
							value: c.categorie,
							onChange: (v) => maj("competences", i, { categorie: v }),
							placeholder: "Technique, logiciel, soft skill…"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 563,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid min-w-0 gap-1.5",
							children: [/* @__PURE__ */ (void 0)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Niveau"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 570,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)(Select, {
								value: c.niveau,
								onValueChange: (v) => maj("competences", i, { niveau: v }),
								children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
									className: "min-w-0",
									children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 580,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 579,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: NIVEAUX_COMPETENCE.map((n) => /* @__PURE__ */ (void 0)(SelectItem, {
									value: n,
									children: n
								}, n, false, {
									fileName: _jsxFileName$4,
									lineNumber: 584,
									columnNumber: 25
								}, this)) }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 582,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 573,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 569,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)(Button, {
							size: "icon",
							variant: "ghost",
							className: "size-9 text-muted-foreground hover:text-destructive",
							onClick: () => retirer("competences", i),
							"aria-label": "Supprimer",
							children: /* @__PURE__ */ (void 0)(Trash2, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 598,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 591,
							columnNumber: 17
						}, this)
					]
				}, c.id, true, {
					fileName: _jsxFileName$4,
					lineNumber: 554,
					columnNumber: 15
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 544,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)(Bloc, {
				icone: Languages,
				titre: "Langues",
				compte: value.langues.length,
				labelAjout: "Langue",
				onAjouter: () => set({ langues: [...value.langues, nouvelleLangue()] }),
				children: value.langues.map((l, i) => /* @__PURE__ */ (void 0)("div", {
					className: "grid items-end gap-3 rounded-2xl border border-border/60 bg-card/40 p-3 sm:grid-cols-[1fr_1fr_1fr_auto]",
					children: [
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Langue",
							value: l.nom,
							onChange: (v) => maj("langues", i, { nom: v })
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 619,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid min-w-0 gap-1.5",
							children: [/* @__PURE__ */ (void 0)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Niveau"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 625,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)(Select, {
								value: l.niveau,
								onValueChange: (v) => maj("langues", i, { niveau: v }),
								children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
									className: "min-w-0",
									children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 635,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 634,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: NIVEAUX_LANGUE.map((n) => /* @__PURE__ */ (void 0)(SelectItem, {
									value: n,
									children: n
								}, n, false, {
									fileName: _jsxFileName$4,
									lineNumber: 639,
									columnNumber: 25
								}, this)) }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 637,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 628,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 624,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Certification",
							value: l.certification,
							onChange: (v) => maj("langues", i, { certification: v }),
							placeholder: "TOEIC 900"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 646,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)(Button, {
							size: "icon",
							variant: "ghost",
							className: "size-9 text-muted-foreground hover:text-destructive",
							onClick: () => retirer("langues", i),
							"aria-label": "Supprimer",
							children: /* @__PURE__ */ (void 0)(Trash2, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 659,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 652,
							columnNumber: 17
						}, this)
					]
				}, l.id, true, {
					fileName: _jsxFileName$4,
					lineNumber: 615,
					columnNumber: 15
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 605,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 541,
				columnNumber: 9
			}, this),
			onglet === "realisations" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Bloc, {
				icone: Award,
				titre: "Certifications & diplômes complémentaires",
				compte: value.certifications.length,
				labelAjout: "Certification",
				onAjouter: () => set({ certifications: [...value.certifications, nouvelleCertification()] }),
				children: value.certifications.map((c, i) => /* @__PURE__ */ (void 0)(Carte, {
					titre: c.nom,
					sousTitre: c.organisme,
					onSupprimer: () => retirer("certifications", i),
					children: /* @__PURE__ */ (void 0)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Intitulé",
								value: c.nom,
								onChange: (v) => maj("certifications", i, { nom: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 693,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Organisme",
								value: c.organisme,
								onChange: (v) => maj("certifications", i, { organisme: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 698,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Date d'obtention",
								value: c.date,
								onChange: (v) => maj("certifications", i, { date: v }),
								placeholder: "06/2025"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 703,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Identifiant / score",
								value: c.identifiant,
								onChange: (v) => maj("certifications", i, { identifiant: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 709,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Lien",
								value: c.lien,
								onChange: (v) => maj("certifications", i, { lien: v }),
								className: "sm:col-span-2"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 716,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 692,
						columnNumber: 17
					}, this)
				}, c.id, false, {
					fileName: _jsxFileName$4,
					lineNumber: 686,
					columnNumber: 15
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 671,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)(Bloc, {
				icone: Lightbulb,
				titre: "Projets",
				compte: value.projets.length,
				labelAjout: "Projet",
				onAjouter: () => set({ projets: [...value.projets, nouveauProjet()] }),
				children: value.projets.map((p, i) => /* @__PURE__ */ (void 0)(Carte, {
					titre: p.nom,
					sousTitre: p.role,
					onSupprimer: () => retirer("projets", i),
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Nom du projet",
								value: p.nom,
								onChange: (v) => maj("projets", i, { nom: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 745,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Votre rôle",
								value: p.role,
								onChange: (v) => maj("projets", i, { role: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 750,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Période",
								value: p.periode,
								onChange: (v) => maj("projets", i, { periode: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 755,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Lien",
								value: p.lien,
								onChange: (v) => maj("projets", i, { lien: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 760,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 744,
						columnNumber: 17
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (void 0)(Label, {
							className: "text-xs text-muted-foreground",
							children: "Description"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 767,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)(Textarea, {
							rows: 3,
							value: p.description,
							onChange: (ev) => maj("projets", i, { description: ev.target.value })
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 770,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 766,
						columnNumber: 17
					}, this)]
				}, p.id, true, {
					fileName: _jsxFileName$4,
					lineNumber: 738,
					columnNumber: 15
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 728,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 668,
				columnNumber: 9
			}, this),
			onglet === "engagements" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: /* @__PURE__ */ (void 0)(Bloc, {
				icone: Heart,
				titre: "Engagements & centres d'intérêt",
				compte: value.benevolats.length + value.interets.length,
				labelAjout: "Engagement",
				onAjouter: () => set({ benevolats: [...value.benevolats, nouveauBenevolat()] }),
				children: [value.benevolats.map((b, i) => /* @__PURE__ */ (void 0)(Carte, {
					titre: b.role,
					sousTitre: b.organisation,
					onSupprimer: () => retirer("benevolats", i),
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Rôle",
								value: b.role,
								onChange: (v) => maj("benevolats", i, { role: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 804,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Organisation",
								value: b.organisation,
								onChange: (v) => maj("benevolats", i, { organisation: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 809,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Période",
								value: b.periode,
								onChange: (v) => maj("benevolats", i, { periode: v }),
								className: "sm:col-span-2"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 814,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 803,
						columnNumber: 17
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (void 0)(Label, {
							className: "text-xs text-muted-foreground",
							children: "Description"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 822,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)(Textarea, {
							rows: 2,
							value: b.description,
							onChange: (ev) => maj("benevolats", i, { description: ev.target.value })
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 825,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 821,
						columnNumber: 17
					}, this)]
				}, b.id, true, {
					fileName: _jsxFileName$4,
					lineNumber: 797,
					columnNumber: 15
				}, this)), /* @__PURE__ */ (void 0)(ListePuces, {
					label: "Centres d'intérêt",
					valeurs: value.interets,
					placeholder: "Course à pied, photographie…",
					onChange: (v) => set({ interets: v })
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 835,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 787,
				columnNumber: 11
			}, this) }, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 785,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 264,
		columnNumber: 5
	}, this);
}
var _jsxFileName$3 = "/app/applet/src/components/profil/ProfilDocumentsTab.tsx";
function ProfilDocumentsTab({ profil, onChange, onOpenCvModal }) {
	const [modeVue, setModeVue] = (0, import_react.useState)("editeur");
	const [copie, setCopie] = (0, import_react.useState)(false);
	const cv = normaliserCvStructure(profil.cvStructure);
	const texteCv = cvStructureEnTexte(cv);
	const copierTexte = () => {
		navigator.clipboard.writeText(texteCv);
		setCopie(true);
		toast.success("Texte complet du profil copié dans le presse-papier !");
		setTimeout(() => setCopie(false), 2e3);
	};
	const exporterJson = () => {
		const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profil, null, 2));
		const downloadAnchor = document.createElement("a");
		downloadAnchor.setAttribute("href", dataStr);
		downloadAnchor.setAttribute("download", `careerly-profil-${(profil.nom || "candidat").toLowerCase()}.json`);
		document.body.appendChild(downloadAnchor);
		downloadAnchor.click();
		downloadAnchor.remove();
		toast.success("Profil exporté au format JSON !");
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 border-purple-500/30 bg-gradient-to-r from-purple-500/10 via-card/60 to-indigo-500/10",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								className: "bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs font-semibold",
								children: "Source de vérité NACORA"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 61,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 60,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-bold text-foreground flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4 text-purple-400" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 66,
								columnNumber: 13
							}, this), "CV Structuré & Export de données"]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 65,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground max-w-xl",
							children: "Importez un CV existant pour extraire automatiquement les informations ou téléchargez votre profil pour l'utiliser sur d'autres plateformes."
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 69,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 59,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						onClick: onOpenCvModal,
						className: "gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 82,
							columnNumber: 13
						}, this), "Importer un CV (PDF / Word)"]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 77,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						variant: "outline",
						onClick: exporterJson,
						className: "gap-1.5 border-border/70 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 92,
							columnNumber: 13
						}, this), "Exporter JSON"]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 86,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 76,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 58,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						variant: modeVue === "editeur" ? "secondary" : "ghost",
						onClick: () => setModeVue("editeur"),
						className: "gap-1.5 text-xs h-8",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileCode, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 107,
							columnNumber: 13
						}, this), "Éditeur structuré avancé"]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 101,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						variant: modeVue === "texte" ? "secondary" : "ghost",
						onClick: () => setModeVue("texte"),
						className: "gap-1.5 text-xs h-8",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 116,
							columnNumber: 13
						}, this), "Aperçu Texte IA (Contexte injecté)"]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 110,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 100,
					columnNumber: 9
				}, this), modeVue === "texte" && /* @__PURE__ */ (void 0)(Button, {
					size: "sm",
					variant: "outline",
					onClick: copierTexte,
					className: "gap-1.5 text-xs h-8",
					children: [copie ? /* @__PURE__ */ (void 0)(Check, { className: "size-3.5 text-emerald-400" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 129,
						columnNumber: 15
					}, this) : /* @__PURE__ */ (void 0)(Copy, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 131,
						columnNumber: 15
					}, this), copie ? "Copié" : "Copier le texte"]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 122,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 99,
				columnNumber: 7
			}, this),
			modeVue === "editeur" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CvBuilder, {
				value: cv,
				onChange: (nouvCv) => onChange({ cvStructure: nouvCv })
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 139,
				columnNumber: 9
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 text-xs text-muted-foreground border-b border-border/50 pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-3.5 text-emerald-400" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 146,
						columnNumber: 13
					}, this), "Voici exactement les données transmises au modèle IA lors de l'analyse d'offres et de la génération de candidatures."]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 145,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("pre", {
					className: "font-mono text-xs text-muted-foreground/90 whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto bg-background/50 p-4 rounded-xl border border-border/50",
					children: texteCv || "Profil vide pour le moment."
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 150,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 144,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 56,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/app/applet/src/components/profil/ProfilSummaryIAModal.tsx";
function ProfilSummaryIAModal({ open, onOpenChange, profil, onUpdateProfil }) {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [copiedPitch, setCopiedPitch] = (0, import_react.useState)(false);
	const synthese = profil.syntheseIa || profil.cvStructure?.syntheseIa || null;
	const handleGenerer = async () => {
		setLoading(true);
		try {
			const res = await genererSyntheseProfil({ data: { profilTexte: profilEnTexte(profil) } });
			onUpdateProfil({
				syntheseIa: res,
				cvStructure: {
					...profil.cvStructure,
					syntheseIa: res
				}
			});
			toast.success("Fiche Profil IA actualisée avec succès !");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erreur lors de la génération de la synthèse IA.");
		} finally {
			setLoading(false);
		}
	};
	const copyPitch = () => {
		if (!synthese?.pitchEntretien) return;
		navigator.clipboard.writeText(synthese.pitchEntretien);
		setCopiedPitch(true);
		toast.success("Pitch d'entretien copié dans le presse-papier !");
		setTimeout(() => setCopiedPitch(false), 2e3);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
			className: "max-w-3xl max-h-[88vh] overflow-y-auto p-6 sm:p-7 border-purple-500/20 bg-background/95 backdrop-blur-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, {
					className: "space-y-2 text-left",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex size-9 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-5" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 87,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 86,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
								className: "text-xl font-bold text-foreground",
								children: "Ce que NACORA sait de moi"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 90,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
								className: "text-xs text-muted-foreground",
								children: "La vision stratégique synthétisée par l'IA à partir de l'ensemble de votre profil."
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 93,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 89,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 85,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							size: "sm",
							onClick: handleGenerer,
							disabled: loading,
							className: "gap-2 border-purple-500/30 hover:bg-purple-500/10 text-xs shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: `size-3.5 ${loading ? "animate-spin" : ""}` }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 107,
								columnNumber: 15
							}, this), synthese ? "Réactualiser" : "Générer la synthèse"]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 100,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 84,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 83,
					columnNumber: 9
				}, this),
				!synthese && !loading && /* @__PURE__ */ (void 0)("div", {
					className: "py-12 text-center space-y-4",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "mx-auto flex size-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400",
							children: /* @__PURE__ */ (void 0)(Sparkles, { className: "size-7" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 118,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 117,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "max-w-md mx-auto space-y-1.5",
							children: [/* @__PURE__ */ (void 0)("h4", {
								className: "text-sm font-semibold text-foreground",
								children: "Aucune synthèse générée pour le moment"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 121,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-muted-foreground leading-relaxed",
								children: "Cliquez sur le bouton ci-dessous pour laisser NACORA analyser vos études, expériences, compétences et critères afin d'établir votre diagnostic de positionnement."
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 124,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 120,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(Button, {
							onClick: handleGenerer,
							className: "gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20",
							children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 134,
								columnNumber: 15
							}, this), "Créer ma synthèse IA"]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 130,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 116,
					columnNumber: 11
				}, this),
				loading && /* @__PURE__ */ (void 0)("div", {
					className: "py-16 text-center space-y-3",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "mx-auto flex size-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 animate-pulse",
							children: /* @__PURE__ */ (void 0)(RefreshCw, { className: "size-6 animate-spin" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 143,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 142,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "text-sm font-medium text-foreground",
							children: "Analyse globale de votre profil par l'IA..."
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 145,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground",
							children: "Extraction des forces clés, positionnement stratégique et pitch d'accroche"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 148,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 141,
					columnNumber: 11
				}, this),
				synthese && !loading && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-6 pt-3",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4 sm:p-5 space-y-3",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "flex flex-wrap items-center justify-between gap-2",
									children: [/* @__PURE__ */ (void 0)(Badge, {
										className: "bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs font-semibold px-2.5 py-0.5",
										children: "Positionnement Professionnel"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 160,
										columnNumber: 17
									}, this), synthese.actualiseLe && /* @__PURE__ */ (void 0)("span", {
										className: "text-[11px] text-muted-foreground",
										children: [
											"Mis à jour le",
											" ",
											new Date(synthese.actualiseLe).toLocaleDateString("fr-FR")
										]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 164,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 159,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("h3", {
									className: "text-lg font-bold text-foreground",
									children: synthese.titrePro || profil.titre || "Candidat à fort potentiel"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 170,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "text-sm text-muted-foreground leading-relaxed",
									children: synthese.resumeGlobal
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 175,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 158,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "rounded-xl border border-border/60 bg-card/60 p-4 space-y-3",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400",
									children: [/* @__PURE__ */ (void 0)(Flame, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 184,
										columnNumber: 19
									}, this), "Vos 3 forces clés"]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 183,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("ul", {
									className: "space-y-2",
									children: synthese.forcesCles?.map((force, i) => /* @__PURE__ */ (void 0)("li", {
										className: "flex items-start gap-2 text-xs text-foreground/90",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] font-bold text-emerald-400 mt-0.5",
											children: i + 1
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 193,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("span", { children: force }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 196,
											columnNumber: 23
										}, this)]
									}, i, true, {
										fileName: _jsxFileName$2,
										lineNumber: 189,
										columnNumber: 21
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 187,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 182,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "rounded-xl border border-border/60 bg-card/60 p-4 space-y-3",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400",
									children: [/* @__PURE__ */ (void 0)(Award, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 204,
										columnNumber: 19
									}, this), "Domaines d'expertise"]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 203,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex flex-wrap gap-1.5",
									children: synthese.domainesExpertise?.map((dom, i) => /* @__PURE__ */ (void 0)("span", {
										className: "rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-300",
										children: dom
									}, i, false, {
										fileName: _jsxFileName$2,
										lineNumber: 209,
										columnNumber: 21
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 207,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 202,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 181,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "rounded-xl border border-border/60 bg-card/60 p-4 space-y-2",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400",
								children: [/* @__PURE__ */ (void 0)(Target, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 223,
									columnNumber: 17
								}, this), "Type de poste & Environnement idéal"]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 222,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-foreground/90 leading-relaxed",
								children: synthese.typePosteIdeal
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 226,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 221,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-indigo-500/5 p-4 sm:p-5 space-y-3",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-300",
									children: [/* @__PURE__ */ (void 0)(MessageSquareQuote, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 235,
										columnNumber: 19
									}, this), "Pitch d'accroche pour vos entretiens (30s)"]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 234,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: copyPitch,
									className: "h-7 gap-1.5 px-2 text-xs text-purple-300 hover:bg-purple-500/20",
									children: [copiedPitch ? /* @__PURE__ */ (void 0)(Check, { className: "size-3.5 text-emerald-400" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 245,
										columnNumber: 21
									}, this) : /* @__PURE__ */ (void 0)(Copy, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 247,
										columnNumber: 21
									}, this), copiedPitch ? "Copié" : "Copier"]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 238,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 233,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-foreground italic leading-relaxed bg-background/40 p-3 rounded-lg border border-purple-500/20",
								children: [
									"« ",
									synthese.pitchEntretien,
									" »"
								]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 252,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 232,
							columnNumber: 13
						}, this),
						synthese.pointsVigilance?.length > 0 && /* @__PURE__ */ (void 0)("div", {
							className: "rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-2",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400",
								children: [/* @__PURE__ */ (void 0)(TriangleAlert, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 261,
									columnNumber: 19
								}, this), "Axes de vigilance identifiés"]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 260,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("ul", {
								className: "space-y-1.5",
								children: synthese.pointsVigilance.map((pv, i) => /* @__PURE__ */ (void 0)("li", {
									className: "text-xs text-muted-foreground flex items-start gap-2",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-amber-400 mt-0.5",
										children: "•"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 270,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("span", { children: pv }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 271,
										columnNumber: 23
									}, this)]
								}, i, true, {
									fileName: _jsxFileName$2,
									lineNumber: 266,
									columnNumber: 21
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 264,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 259,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 156,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 82,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 81,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/profil/ProfilOptimizerModal.tsx";
function ProfilOptimizerModal({ open, onOpenChange, profil, onNavigateTab }) {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [audit, setAudit] = (0, import_react.useState)(null);
	const handleLancerAudit = async () => {
		setLoading(true);
		try {
			const res = await optimiserProfilIA({ data: { profilTexte: profilEnTexte(profil) } });
			setAudit(res);
			toast.success("Audit d'optimisation IA terminé !");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erreur lors de l'audit IA du profil.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
			className: "max-w-3xl max-h-[88vh] overflow-y-auto p-6 sm:p-7 border-purple-500/20 bg-background/95 backdrop-blur-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, {
					className: "space-y-2 text-left",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-500/20",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-5" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 70,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 69,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
								className: "text-xl font-bold text-foreground",
								children: "Optimiser mon profil avec l'IA"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 73,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
								className: "text-xs text-muted-foreground",
								children: "Audit ATS & Recruteur : recommandations concrètes STAR, KPI chiffrés et mots-clés stratégiques."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 76,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 72,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 68,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							size: "sm",
							onClick: handleLancerAudit,
							disabled: loading,
							className: "gap-2 border-purple-500/30 hover:bg-purple-500/10 text-xs shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: `size-3.5 ${loading ? "animate-spin" : ""}` }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 90,
								columnNumber: 15
							}, this), audit ? "Ré-auditer" : "Lancer l'audit"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 83,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 67,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 66,
					columnNumber: 9
				}, this),
				!audit && !loading && /* @__PURE__ */ (void 0)("div", {
					className: "py-12 text-center space-y-4",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "mx-auto flex size-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400",
							children: /* @__PURE__ */ (void 0)(TrendingUp, { className: "size-7" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 101,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 100,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "max-w-md mx-auto space-y-1.5",
							children: [/* @__PURE__ */ (void 0)("h4", {
								className: "text-sm font-semibold text-foreground",
								children: "Audit de valorisation & compatibilité recruteurs"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 104,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-muted-foreground leading-relaxed",
								children: "L'IA analyse vos descriptions d'expériences, la pertinence de vos compétences et la précision de vos objectifs pour vous donner des conseils d'impact immédiat."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 107,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 103,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(Button, {
							onClick: handleLancerAudit,
							className: "gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20",
							children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 117,
								columnNumber: 15
							}, this), "Auditer et valoriser mon profil"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 113,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 99,
					columnNumber: 11
				}, this),
				loading && /* @__PURE__ */ (void 0)("div", {
					className: "py-16 text-center space-y-3",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "mx-auto flex size-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 animate-pulse",
							children: /* @__PURE__ */ (void 0)(RefreshCw, { className: "size-6 animate-spin" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 126,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 125,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "text-sm font-medium text-foreground",
							children: "Audit approfondi en cours..."
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 128,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground",
							children: "Vérification des mots-clés ATS, structure STAR et valorisation chiffrée"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 131,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 124,
					columnNumber: 11
				}, this),
				audit && !loading && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-6 pt-2",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4 sm:p-5",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "space-y-1.5 flex-1",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-2",
										children: /* @__PURE__ */ (void 0)(Badge, {
											className: "bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs",
											children: "Score Qualité du Profil"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 144,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 143,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("h3", {
										className: "text-sm font-bold text-foreground",
										children: "Diagnostic stratégique de vos candidatures"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 148,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-xs text-muted-foreground leading-relaxed",
										children: audit.syntheseStrategique
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 151,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 142,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex flex-col items-center justify-center rounded-xl border border-purple-500/30 bg-background/80 px-5 py-3 shrink-0 shadow-inner",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400",
									children: [audit.scoreQualite, "/100"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 157,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-[10px] uppercase font-bold tracking-wider text-muted-foreground",
									children: "Niveau d'impact"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 160,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 156,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 141,
							columnNumber: 13
						}, this),
						audit.motsClesRecommandes?.length > 0 && /* @__PURE__ */ (void 0)("div", {
							className: "rounded-xl border border-border/60 bg-card/60 p-4 space-y-2.5",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400",
								children: [/* @__PURE__ */ (void 0)(Key, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 170,
									columnNumber: 19
								}, this), "Mots-clés stratégiques à intégrer dans votre profil"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 169,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex flex-wrap gap-2",
								children: audit.motsClesRecommandes.map((mot, i) => /* @__PURE__ */ (void 0)("span", {
									className: "rounded-lg border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-300",
									children: ["+ ", mot]
								}, i, true, {
									fileName: _jsxFileName$1,
									lineNumber: 175,
									columnNumber: 21
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 173,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 168,
							columnNumber: 15
						}, this),
						audit.axesAmelioration?.length > 0 && /* @__PURE__ */ (void 0)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (void 0)("h4", {
								className: "text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "size-4 text-purple-400" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 190,
									columnNumber: 19
								}, this), "Axes d'amélioration prioritaires"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 189,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "space-y-3",
								children: audit.axesAmelioration.map((axe, i) => /* @__PURE__ */ (void 0)("div", {
									className: "rounded-xl border border-border/70 bg-card/70 p-4 space-y-2.5 transition-all hover:border-purple-500/30",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center justify-between gap-2",
											children: /* @__PURE__ */ (void 0)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "text-xs font-bold text-foreground",
													children: axe.rubrique
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 201,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)(Badge, {
													variant: "outline",
													className: `text-[10px] font-semibold ${axe.impact === "fort" ? "bg-rose-500/10 text-rose-400 border-rose-500/30" : axe.impact === "moyen" ? "bg-amber-500/10 text-amber-400 border-amber-500/30" : "bg-blue-500/10 text-blue-400 border-blue-500/30"}`,
													children: ["Impact ", axe.impact]
												}, void 0, true, {
													fileName: _jsxFileName$1,
													lineNumber: 204,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 200,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 199,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "text-xs text-muted-foreground",
											children: [/* @__PURE__ */ (void 0)("strong", {
												className: "text-foreground font-medium",
												children: ["Constat :", " "]
											}, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 220,
												columnNumber: 25
											}, this), axe.constat]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 219,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "text-xs text-foreground/90 font-medium",
											children: [/* @__PURE__ */ (void 0)("strong", {
												className: "text-purple-400",
												children: ["Conseil IA :", " "]
											}, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 227,
												columnNumber: 25
											}, this), axe.recommandation]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 226,
											columnNumber: 23
										}, this),
										axe.exempleConcret && /* @__PURE__ */ (void 0)("div", {
											className: "rounded-lg bg-background/50 border border-purple-500/15 p-2.5 text-xs italic text-muted-foreground",
											children: [
												"💡",
												" ",
												/* @__PURE__ */ (void 0)("span", {
													className: "font-semibold text-foreground/80",
													children: ["Exemple :", " "]
												}, void 0, true, {
													fileName: _jsxFileName$1,
													lineNumber: 236,
													columnNumber: 27
												}, this),
												"« ",
												axe.exempleConcret,
												" »"
											]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 234,
											columnNumber: 25
										}, this)
									]
								}, i, true, {
									fileName: _jsxFileName$1,
									lineNumber: 195,
									columnNumber: 21
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 193,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 188,
							columnNumber: 15
						}, this),
						audit.conseilsStarKpi?.length > 0 && /* @__PURE__ */ (void 0)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (void 0)("h4", {
								className: "text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ (void 0)(Lightbulb, { className: "size-4 text-amber-400" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 252,
									columnNumber: 19
								}, this), "Transformation STAR & KPI chiffrés (Avant / Après)"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 251,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "space-y-3",
								children: audit.conseilsStarKpi.map((kpi, i) => /* @__PURE__ */ (void 0)("div", {
									className: "rounded-xl border border-border/70 bg-card/70 p-4 space-y-3",
									children: [
										/* @__PURE__ */ (void 0)("h5", {
											className: "text-xs font-bold text-foreground",
											children: kpi.titre
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 261,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "grid gap-2 sm:grid-cols-2",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "rounded-lg border border-rose-500/20 bg-rose-500/5 p-2.5 space-y-1",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "text-[10px] font-bold uppercase text-rose-400 tracking-wider",
													children: "Formulation standard"
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 266,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)("p", {
													className: "text-xs text-muted-foreground line-through",
													children: kpi.avant
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 269,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 265,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2.5 space-y-1",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "text-[10px] font-bold uppercase text-emerald-400 tracking-wider",
													children: "Formulation impact & KPI"
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 274,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)("p", {
													className: "text-xs text-emerald-300 font-medium",
													children: kpi.apres
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 277,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 273,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 264,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "text-[11px] text-muted-foreground",
											children: kpi.explication
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 282,
											columnNumber: 23
										}, this)
									]
								}, i, true, {
									fileName: _jsxFileName$1,
									lineNumber: 257,
									columnNumber: 21
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 255,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 250,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 139,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 65,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 64,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/profil.tsx?tsr-split=component";
function ProfilPage() {
	const { user, loading: authLoading } = useSession();
	const [profil, setProfil] = (0, import_react.useState)(emptyProfil);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [lastSavedTime, setLastSavedTime] = (0, import_react.useState)(null);
	const [cvOpen, setCvOpen] = (0, import_react.useState)(false);
	const [summaryIaOpen, setSummaryIaOpen] = (0, import_react.useState)(false);
	const [optimizerOpen, setOptimizerOpen] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)("apercu");
	const [, startTransition] = (0, import_react.useTransition)();
	const profilRef = (0, import_react.useRef)(profil);
	profilRef.current = profil;
	const bilan = (0, import_react.useMemo)(() => calculerCompletudeProfil(profil), [profil]);
	(0, import_react.useEffect)(() => {
		const local = loadProfil();
		setProfil(local);
	}, []);
	(0, import_react.useEffect)(() => {
		if (authLoading || !user?.id) return;
		let cancelled = false;
		(async () => {
			try {
				const cloud = await fetchProfil(user.id);
				if (!cancelled && cloud) setProfil((local) => ({
					...local,
					...cloud,
					cvStructure: normaliserCvStructure(cloud.cvStructure || local.cvStructure)
				}));
			} catch {}
		})();
		return () => {
			cancelled = true;
		};
	}, [user?.id, authLoading]);
	const updateProfil = (0, import_react.useCallback)((patch) => {
		setProfil((prev) => {
			const next = {
				...prev,
				...patch
			};
			saveProfilLocal(next);
			return next;
		});
		setLastSavedTime((/* @__PURE__ */ new Date()).toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit"
		}));
	}, []);
	const enregistrer = (0, import_react.useCallback)(async () => {
		setSaving(true);
		const p = profilRef.current;
		saveProfilLocal(p);
		if (user?.id) try {
			const saved = await saveProfilCloud(p, user.id);
			setProfil(saved);
			setLastSavedTime((/* @__PURE__ */ new Date()).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			}));
			toast.success("Dossier candidat synchronisé dans le Cloud !");
		} catch (err) {
			console.error("Erreur sauvegarde cloud profil:", err);
			setLastSavedTime((/* @__PURE__ */ new Date()).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			}));
			toast.info("Profil sauvegardé localement (hors-ligne).");
		} finally {
			setSaving(false);
		}
		else {
			setSaving(false);
			setLastSavedTime((/* @__PURE__ */ new Date()).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			}));
			toast.success("Profil sauvegardé avec succès dans votre navigateur !");
		}
	}, [user?.id]);
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "s") {
				e.preventDefault();
				enregistrer();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [enregistrer]);
	const handleSelectTab = (tabId) => {
		startTransition(() => {
			setActiveTab(tabId);
		});
	};
	const handleNavigateFromSuggestions = (targetTab) => {
		if (targetTab === "preferences" || targetTab === "recherche") handleSelectTab("objectifs");
		else if (targetTab === "experiences" || targetTab === "formation" || targetTab === "parcours") handleSelectTab("parcours");
		else if (targetTab === "langues") handleSelectTab("langues");
		else if (targetTab === "certifications") handleSelectTab("certifications");
		else if (targetTab === "projets" || targetTab === "engagements") handleSelectTab("engagements");
		else if (targetTab === "identite") handleSelectTab("identite");
		else if (targetTab === "competences") handleSelectTab("competences");
		else if (targetTab === "documents") handleSelectTab("documents");
		else handleSelectTab("apercu");
	};
	const CATEGORIES = (0, import_react.useMemo)(() => [
		{
			id: "apercu",
			label: "Aperçu & IA",
			icon: LayoutDashboard,
			colorClass: "bg-purple-500/15 text-purple-400 border-purple-500/25",
			subtitle: `${bilan.score}% complété`,
			isComplete: bilan.score >= 80
		},
		{
			id: "identite",
			label: "Identité",
			icon: UserRound,
			colorClass: "bg-blue-500/15 text-blue-400 border-blue-500/25",
			subtitle: profil.prenom && profil.nom ? `${profil.prenom} ${profil.nom}` : "À compléter",
			isComplete: Boolean(profil.prenom && profil.nom && (profil.emailContact || profil.telephone))
		},
		{
			id: "objectifs",
			label: "Objectifs",
			icon: Target,
			colorClass: "bg-indigo-500/15 text-indigo-400 border-indigo-500/25",
			subtitle: profil.metiers?.split(",")[0]?.trim() || profil.contrats?.split(",")[0]?.trim() || "Postes & Cibles",
			isComplete: Boolean(profil.metiers || profil.contrats)
		},
		{
			id: "parcours",
			label: "Parcours",
			icon: Briefcase,
			colorClass: "bg-purple-500/15 text-purple-400 border-purple-500/25",
			subtitle: `${profil.cvStructure?.experiences?.length || 0} exp • ${profil.cvStructure?.formations?.length || 0} diplômes`,
			isComplete: (profil.cvStructure?.experiences?.length || 0) > 0 && (profil.cvStructure?.formations?.length || 0) > 0
		},
		{
			id: "competences",
			label: "Compétences",
			icon: Wrench,
			colorClass: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
			subtitle: `${profil.cvStructure?.competences?.length || 0} skills & outils`,
			isComplete: (profil.cvStructure?.competences?.length || 0) > 0
		},
		{
			id: "langues",
			label: "Langues",
			icon: Languages,
			colorClass: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
			subtitle: `${profil.cvStructure?.langues?.length || 0} langue(s)`,
			isComplete: (profil.cvStructure?.langues?.length || 0) > 0
		},
		{
			id: "certifications",
			label: "Certifications",
			icon: Award,
			colorClass: "bg-amber-500/15 text-amber-400 border-amber-500/25",
			subtitle: `${profil.cvStructure?.certifications?.length || 0} certif(s)`,
			isComplete: (profil.cvStructure?.certifications?.length || 0) > 0
		},
		{
			id: "engagements",
			label: "Projets & Asso",
			icon: Lightbulb,
			colorClass: "bg-rose-500/15 text-rose-400 border-rose-500/25",
			subtitle: `${(profil.cvStructure?.projets?.length || 0) + (profil.cvStructure?.benevolats?.length || 0)} projet(s)`,
			isComplete: (profil.cvStructure?.projets?.length || 0) > 0 || (profil.cvStructure?.benevolats?.length || 0) > 0
		},
		{
			id: "documents",
			label: "Documents",
			icon: FileCode,
			colorClass: "bg-blue-500/15 text-blue-400 border-blue-500/25",
			subtitle: profil.cv ? "CV analysé" : "Importer un CV",
			isComplete: Boolean(profil.cv)
		}
	], [profil, bilan]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		title: "Mon Profil",
		description: "Le dossier candidat central : source de vérité pour le Match IA, l'optimiseur de CV et les coachs de préparation.",
		action: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => setSummaryIaOpen(true),
					className: "gap-1.5 text-xs text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 border-purple-500/30 font-medium hidden sm:inline-flex",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5 text-purple-400" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 229,
						columnNumber: 13
					}, this), "Synthèse IA"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 228,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => setCvOpen(true),
					className: "gap-1.5 text-xs text-foreground hover:bg-card border-border/80",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { className: "size-3.5 text-purple-400" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 234,
						columnNumber: 13
					}, this), "Importer mon CV"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 233,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					onClick: enregistrer,
					disabled: saving,
					className: "gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs shadow-xs",
					children: [saving ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-3.5 animate-spin" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 239,
						columnNumber: 23
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Save, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 239,
						columnNumber: 71
					}, this), lastSavedTime ? `Enregistré à ${lastSavedTime}` : "Sauvegarder"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 238,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 227,
			columnNumber: 175
		}, this),
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "max-w-6xl mx-auto space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2.5 sm:gap-3",
					children: CATEGORIES.map((cat) => {
						const Icon = cat.icon;
						const isActive = activeTab === cat.id;
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => handleSelectTab(cat.id),
							className: `relative flex flex-col justify-between p-3 sm:p-3.5 rounded-2xl text-left transition-all duration-200 border ${isActive ? "border-purple-500/90 ring-2 ring-purple-500/40 bg-purple-950/25 shadow-lg shadow-purple-950/40" : "border-border/70 bg-card/70 hover:bg-card hover:border-border/90"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between w-full mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: `flex size-8 sm:size-9 items-center justify-center rounded-xl border ${cat.colorClass}`,
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 253,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 252,
									columnNumber: 19
								}, this), cat.isComplete ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex size-4 sm:size-4.5 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/15 text-emerald-400",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-2.5 stroke-[2.5]" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 257,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 256,
									columnNumber: 37
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "size-1.5 rounded-full bg-muted-foreground/30" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 258,
									columnNumber: 30
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 251,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-0.5 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
									className: "text-xs font-bold text-foreground tracking-tight truncate",
									children: cat.label
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 263,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[10px] sm:text-[11px] text-muted-foreground truncate",
									children: cat.subtitle
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 266,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 262,
								columnNumber: 17
							}, this)]
						}, cat.id, true, {
							fileName: _jsxFileName,
							lineNumber: 249,
							columnNumber: 18
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 245,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "animate-in fade-in-50 duration-200",
					children: [
						activeTab === "apercu" && /* @__PURE__ */ (void 0)(ProfilOverviewTab, {
							profil,
							bilan,
							onNavigateTab: handleNavigateFromSuggestions,
							onOpenCvModal: () => setCvOpen(true),
							onOpenSummaryIaModal: () => setSummaryIaOpen(true),
							onOpenOptimizerModal: () => setOptimizerOpen(true),
							onUpdateProfil: updateProfil
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 276,
							columnNumber: 38
						}, this),
						activeTab === "identite" && /* @__PURE__ */ (void 0)(ProfilIdentityTab, {
							profil,
							onChange: updateProfil
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 278,
							columnNumber: 40
						}, this),
						activeTab === "objectifs" && /* @__PURE__ */ (void 0)(ProfilObjectivesTab, {
							profil,
							onChange: updateProfil
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 280,
							columnNumber: 41
						}, this),
						activeTab === "parcours" && /* @__PURE__ */ (void 0)(ProfilJourneyTab, {
							profil,
							onChange: updateProfil
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 282,
							columnNumber: 40
						}, this),
						activeTab === "competences" && /* @__PURE__ */ (void 0)(ProfilSkillsTab, {
							profil,
							onChange: updateProfil
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 284,
							columnNumber: 43
						}, this),
						activeTab === "langues" && /* @__PURE__ */ (void 0)(ProfilLanguagesTab, {
							profil,
							onChange: updateProfil
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 286,
							columnNumber: 39
						}, this),
						activeTab === "certifications" && /* @__PURE__ */ (void 0)(ProfilCertificationsTab, {
							profil,
							onChange: updateProfil
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 288,
							columnNumber: 46
						}, this),
						activeTab === "engagements" && /* @__PURE__ */ (void 0)(ProfilProjectsEngagementsTab, {
							profil,
							onChange: updateProfil
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 290,
							columnNumber: 43
						}, this),
						activeTab === "documents" && /* @__PURE__ */ (void 0)(ProfilDocumentsTab, {
							profil,
							onChange: updateProfil,
							onOpenCvModal: () => setCvOpen(true)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 292,
							columnNumber: 41
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 275,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 243,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CvAnalyseDialog, {
				open: cvOpen,
				onOpenChange: setCvOpen,
				profil,
				cv: profil.cv ?? null,
				onSaveCv: (cv) => {
					const next = {
						...profil,
						cv
					};
					updateProfil(next);
					if (user?.id) saveProfilCloud(next, user.id).catch(() => void 0);
				},
				onAppliquerProfil: (patch) => {
					const next = {
						...profil,
						...patch
					};
					updateProfil(next);
					if (user?.id) saveProfilCloud(next, user.id).catch(() => void 0);
					toast.success("Profil mis à jour automatiquement depuis le CV !");
				}
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 297,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProfilSummaryIAModal, {
				open: summaryIaOpen,
				onOpenChange: setSummaryIaOpen,
				profil,
				onUpdateProfil: updateProfil
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 315,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProfilOptimizerModal, {
				open: optimizerOpen,
				onOpenChange: setOptimizerOpen,
				profil,
				onNavigateTab: handleNavigateFromSuggestions
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 318,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 227,
		columnNumber: 10
	}, this);
}
//#endregion
export { ProfilPage as component };

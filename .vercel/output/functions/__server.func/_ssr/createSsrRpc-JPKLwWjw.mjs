import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as supabase, t as isSupabaseConfigured } from "./client-DlNPIy5Y.mjs";
import { o as getServerFnById, t as TSS_SERVER_FUNCTION } from "./server-WJa-_0402.mjs";
import { At as ChevronUp, Nt as ChevronDown, Pt as Check } from "../_libs/lucide-react.mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
import "../_libs/firebase.mjs";
import { a as setDoc, n as getDoc, s as doc } from "../_libs/@firebase/firestore+[...].mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { F as cn, d as db, f as emptyProfil, g as isFirebaseConfigured, v as normaliserCvStructure } from "./router-CeQVKm6O2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/select-DReeeDwx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$3 = "/app/applet/src/components/ui/select.tsx";
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "h-4 w-4 opacity-50" }, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 29,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 28,
		columnNumber: 5
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName$3,
	lineNumber: 19,
	columnNumber: 3
}, void 0));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronUp, { className: "h-4 w-4" }, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 47,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$3,
	lineNumber: 39,
	columnNumber: 3
}, void 0));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "h-4 w-4" }, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 64,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$3,
	lineNumber: 56,
	columnNumber: 3
}, void 0));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectScrollUpButton, {}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 86,
			columnNumber: 7
		}, void 0),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 87,
			columnNumber: 7
		}, void 0),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectScrollDownButton, {}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 96,
			columnNumber: 7
		}, void 0)
	]
}, void 0, true, {
	fileName: _jsxFileName$3,
	lineNumber: 75,
	columnNumber: 5
}, void 0) }, void 0, false, {
	fileName: _jsxFileName$3,
	lineNumber: 74,
	columnNumber: 3
}, void 0));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$3,
	lineNumber: 106,
	columnNumber: 3
}, void 0));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-4 w-4" }, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 128,
			columnNumber: 9
		}, void 0) }, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 127,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 126,
		columnNumber: 5
	}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItemText, { children }, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 131,
		columnNumber: 5
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName$3,
	lineNumber: 118,
	columnNumber: 3
}, void 0));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$3,
	lineNumber: 140,
	columnNumber: 3
}, void 0));
SelectSeparator.displayName = SelectSeparator$1.displayName;
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/label-DHk-0R73.js
var _jsxFileName$2 = "/app/applet/src/components/ui/label.tsx";
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$2,
	lineNumber: 18,
	columnNumber: 3
}, void 0));
Label.displayName = Root.displayName;
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/profil-cloud-VDZWvbp7.js
var _jsxFileName$1 = "/app/applet/src/components/ui/textarea.tsx";
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 10,
		columnNumber: 5
	}, void 0);
});
Textarea.displayName = "Textarea";
function toProfil(r) {
	const base = emptyProfil();
	const cvStructure = normaliserCvStructure(r.cv_structure);
	return {
		...base,
		prenom: r.prenom ?? "",
		nom: r.nom ?? "",
		titre: cvStructure.titre || "",
		formation: r.formation ?? base.formation,
		ecole: r.ecole ?? base.ecole,
		niveau: r.niveau ?? base.niveau,
		localisation: r.localisation ?? "",
		pays: cvStructure.pays || "France",
		mobilite: r.mobilite ?? "",
		contrats: r.contrats ?? base.contrats,
		domaines: r.domaines ?? "",
		metiers: r.metiers ?? "",
		entreprisesCiblees: r.entreprises_ciblees ?? "",
		competences: r.competences ?? "",
		logiciels: r.logiciels ?? "",
		langues: r.langues ?? "",
		niveauAnglais: r.niveau_anglais ?? "",
		experiences: r.experiences ?? "",
		teletravail: r.teletravail ?? "",
		modeTravail: cvStructure.preferences?.teletravailPrefere || (r.teletravail?.includes("100%") ? "teletravail" : "hybride"),
		remuneration: r.remuneration ?? "",
		dateDebut: r.date_debut ?? "",
		duree: r.duree ?? "",
		rechercheVraie: cvStructure?.rechercheVraie || "",
		environnements: cvStructure?.environnements || ["Grand groupe", "Scale-up"],
		prioritesRecherche: cvStructure?.prioritesRecherche || ["Missions apprenantes", "Mentorat / Équipe"],
		emailContact: cvStructure.email || "",
		telephone: cvStructure.telephone || "",
		linkedin: cvStructure.linkedin || "",
		portfolio: cvStructure.portfolio || "",
		github: cvStructure.github || "",
		permis: cvStructure.permis || "",
		photoUrl: cvStructure.photoUrl || "",
		criteres: r.criteres ?? base.criteres,
		cv: r.cv ?? null,
		cvStructure,
		preferences: cvStructure.preferences || {}
	};
}
function toRow(p, userId) {
	const cvStructure = normaliserCvStructure({
		...p.cvStructure,
		titre: p.titre || p.cvStructure.titre,
		email: p.emailContact || p.cvStructure.email,
		telephone: p.telephone || p.cvStructure.telephone,
		linkedin: p.linkedin || p.cvStructure.linkedin,
		portfolio: p.portfolio || p.cvStructure.portfolio,
		github: p.github || p.cvStructure.github,
		permis: p.permis || p.cvStructure.permis,
		photoUrl: p.photoUrl || p.cvStructure.photoUrl,
		ville: p.localisation || p.cvStructure.ville,
		pays: p.pays || p.cvStructure.pays,
		preferences: {
			...p.cvStructure.preferences,
			...p.preferences,
			teletravailPrefere: p.modeTravail || p.cvStructure.preferences?.teletravailPrefere || "hybride"
		},
		...p.rechercheVraie ? { rechercheVraie: p.rechercheVraie } : {},
		...p.environnements ? { environnements: p.environnements } : {},
		...p.prioritesRecherche ? { prioritesRecherche: p.prioritesRecherche } : {}
	});
	return {
		user_id: userId,
		prenom: p.prenom,
		nom: p.nom,
		formation: p.formation,
		ecole: p.ecole,
		niveau: p.niveau,
		localisation: p.localisation,
		mobilite: p.mobilite,
		contrats: p.contrats,
		domaines: p.domaines,
		metiers: p.metiers,
		entreprises_ciblees: p.entreprisesCiblees,
		competences: p.competences,
		logiciels: p.logiciels,
		langues: p.langues,
		niveau_anglais: p.niveauAnglais,
		experiences: p.experiences,
		teletravail: p.teletravail,
		remuneration: p.remuneration,
		date_debut: p.dateDebut || null,
		duree: p.duree,
		criteres: p.criteres,
		cv: p.cv ?? null,
		cv_structure: cvStructure,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	};
}
function sanitizeForFirestore(data) {
	return JSON.parse(JSON.stringify(data, (_, v) => v === void 0 ? null : v));
}
async function fetchProfil(userId) {
	if (isFirebaseConfigured() && userId) try {
		const snap = await getDoc(doc(db, "profils", userId));
		if (snap.exists()) return toProfil(snap.data());
	} catch (e) {
		console.warn("Firestore fetchProfil error:", e);
	}
	if (isSupabaseConfigured()) {
		const { data, error } = await supabase.from("profils").select("*").maybeSingle();
		if (error) throw error;
		return data ? toProfil(data) : null;
	}
	return null;
}
async function saveProfilCloud(p, userId) {
	const rowData = sanitizeForFirestore(toRow(p, userId));
	if (isFirebaseConfigured()) try {
		await setDoc(doc(db, "profils", userId), rowData, { merge: true });
		return toProfil(rowData);
	} catch (e) {
		console.error("Firestore saveProfilCloud error:", e);
	}
	if (isSupabaseConfigured()) {
		const { data, error } = await supabase.from("profils").upsert(rowData, { onConflict: "user_id" }).select().single();
		if (error) throw error;
		return toProfil(data);
	}
	return p;
}
async function ensureUserProfilRegistered(info) {
	if (!isFirebaseConfigured() || !info.uid) return;
	try {
		const ref = doc(db, "profils", info.uid);
		const snap = await getDoc(ref);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const parts = (info.displayName || "").trim().split(" ");
		const emailPrefix = info.email ? info.email.split("@")[0] : "";
		const inferredPrenom = info.prenom || parts[0] || (emailPrefix ? emailPrefix.split(".")[0] || "" : "");
		const inferredNom = info.nom || (parts.length > 1 ? parts.slice(1).join(" ") : "");
		if (!snap.exists()) {
			const initialData = sanitizeForFirestore({
				user_id: info.uid,
				email: info.email || "",
				prenom: inferredPrenom,
				nom: inferredNom,
				ecole: info.ecole || "",
				photoUrl: info.photoURL || "",
				provider: info.provider || "email",
				createdAt: now,
				updated_at: now,
				dernierAccesLe: now
			});
			await setDoc(ref, initialData, { merge: true });
		} else {
			const existingData = snap.data();
			const updates = {
				updated_at: now,
				dernierAccesLe: now
			};
			if (info.email) updates["email"] = info.email;
			if (info.provider) updates["provider"] = info.provider;
			if (info.photoURL) updates["photoUrl"] = info.photoURL;
			if (info.ecole) updates["ecole"] = info.ecole;
			if (inferredPrenom && !existingData?.["prenom"]) updates["prenom"] = inferredPrenom;
			if (inferredNom && !existingData?.["nom"]) updates["nom"] = inferredNom;
			await setDoc(ref, sanitizeForFirestore(updates), { merge: true });
		}
	} catch (err) {
		console.warn("Échec ensureUserProfilRegistered:", err);
	}
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/createSsrRpc-JPKLwWjw.js
var _jsxFileName = "/app/applet/src/components/ui/badge.tsx";
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 33,
		columnNumber: 5
	}, this);
}
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
//#endregion
export { fetchProfil as a, Select as c, SelectTrigger as d, SelectValue as f, ensureUserProfilRegistered as i, SelectContent as l, createSsrRpc as n, saveProfilCloud as o, Textarea as r, Label as s, Badge as t, SelectItem as u };

import { a as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { At as CalendarDays, L as Mail, St as CircleCheck, U as Linkedin, V as LoaderCircle, a as Users, at as FileText, ot as FileSpreadsheet, u as Upload } from "../_libs/lucide-react.mjs";
import { C as TYPES_CONTACT, E as emptyContact, P as STATUTS, R as emptyCandidature, dt as Button, ft as cn } from "./router-arR9ITmX.mjs";
import { t as AppShell } from "./AppShell-BYQcXmkR.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BYfOmXtJ.mjs";
import { t as useSession } from "./useSession-CT0M_nfQ.mjs";
import { t as useCandidatures } from "./useCandidatures-CEqfC4kv.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DUy71i1r.mjs";
import { n as extraireTexteFichier, t as TYPES_ACCEPTES } from "./cv-fichier-BFa0B9CM.mjs";
import { n as fetchContacts, r as upsertContact } from "./contacts-cloud-B_21x6Ey.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/import-CZRbAPWH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Import de fichiers tableur (Excel / CSV) vers les objets Careerly.
* Tout se fait dans le navigateur : aucun fichier n'est envoyé au serveur.
*/
var TYPES_TABLEUR = ".xlsx,.xls,.csv,.tsv,.ods";
var TAILLE_MAX = 15728640;
/** Lit un fichier tableur et renvoie les en-têtes + les lignes en texte. */
async function lireTableur(file, feuille) {
	if (file.size === 0) throw new Error("Ce fichier est vide.");
	if (file.size > TAILLE_MAX) throw new Error("Ce fichier dépasse 15 Mo.");
	const XLSX = await import("../_libs/xlsx.mjs").then((n) => n.t);
	const buffer = await file.arrayBuffer();
	const wb = XLSX.read(buffer, {
		type: "array",
		cellDates: true
	});
	const feuilles = wb.SheetNames;
	const nom = feuille && feuilles.includes(feuille) ? feuille : feuilles[0] ?? "";
	const ws = nom ? wb.Sheets[nom] : void 0;
	if (!ws) throw new Error("Aucune feuille lisible dans ce fichier.");
	const matrice = XLSX.utils.sheet_to_json(ws, {
		header: 1,
		raw: false,
		defval: "",
		blankrows: false
	});
	const iEntete = matrice.findIndex((r) => r.filter((c) => String(c ?? "").trim() !== "").length >= 2);
	if (iEntete < 0) throw new Error("Impossible de trouver les colonnes de ce tableau.");
	const colonnes = (matrice[iEntete] ?? []).map((c) => String(c ?? "").trim()).map((c, i) => c === "" ? `Colonne ${i + 1}` : c);
	const lignes = [];
	for (const r of matrice.slice(iEntete + 1)) {
		const ligne = {};
		let vide = true;
		colonnes.forEach((col, i) => {
			const v = String(r[i] ?? "").trim();
			ligne[col] = v;
			if (v !== "") vide = false;
		});
		if (!vide) lignes.push(ligne);
	}
	return {
		colonnes,
		lignes,
		feuilles,
		feuille: nom
	};
}
function normaliser(v) {
	return v.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
}
/** Convertit une date de tableur (texte FR, ISO, série Excel) en yyyy-mm-dd. */
function normaliserDate(valeur) {
	const v = valeur.trim();
	if (!v) return "";
	const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(v);
	if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;
	const fr = /^(\d{1,2})[/.-](\d{1,2})[/.-](\d{2,4})$/.exec(v);
	if (fr) {
		const j = fr[1].padStart(2, "0");
		const m = fr[2].padStart(2, "0");
		let a = fr[3];
		if (a.length === 2) a = Number(a) > 60 ? `19${a}` : `20${a}`;
		return `${a}-${m}-${j}`;
	}
	if (/^\d{5}$/.test(v)) return new Date(Date.UTC(1899, 11, 30) + Number(v) * 864e5).toISOString().slice(0, 10);
	const d = new Date(v);
	if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);
	return "";
}
function trouverColonne(colonnes, motsCles) {
	const normalisees = colonnes.map((c) => ({
		col: c,
		n: normaliser(c)
	}));
	for (const mot of motsCles) {
		const exact = normalisees.find((c) => c.n === mot);
		if (exact) return exact.col;
	}
	for (const mot of motsCles) {
		const partiel = normalisees.find((c) => c.n.includes(mot));
		if (partiel) return partiel.col;
	}
	return "";
}
var CHAMPS_CANDIDATURE = [
	{
		cle: "entreprise",
		label: "Entreprise",
		requis: true
	},
	{
		cle: "poste",
		label: "Poste",
		requis: false
	},
	{
		cle: "statut",
		label: "Statut",
		requis: false
	},
	{
		cle: "lieu",
		label: "Lieu",
		requis: false
	},
	{
		cle: "lien",
		label: "Lien de l'offre",
		requis: false
	},
	{
		cle: "contact",
		label: "Contact",
		requis: false
	},
	{
		cle: "source",
		label: "Source",
		requis: false
	},
	{
		cle: "secteur",
		label: "Secteur",
		requis: false
	},
	{
		cle: "dateEnvoi",
		label: "Date de candidature",
		requis: false
	},
	{
		cle: "dateRelance",
		label: "Date de relance",
		requis: false
	},
	{
		cle: "dateLimite",
		label: "Date limite",
		requis: false
	},
	{
		cle: "commentaire",
		label: "Commentaire / notes",
		requis: false
	},
	{
		cle: "missions",
		label: "Missions clés",
		requis: false
	},
	{
		cle: "profilRecherche",
		label: "Profil recherché",
		requis: false
	},
	{
		cle: "modalites",
		label: "Modalités",
		requis: false
	},
	{
		cle: "detail",
		label: "Détail de l'offre",
		requis: false
	}
];
var MOTS_CANDIDATURE = {
	entreprise: [
		"entreprise",
		"societe",
		"company",
		"employeur",
		"boite",
		"organisation"
	],
	poste: [
		"poste",
		"intitule",
		"job",
		"role",
		"position",
		"titre",
		"offre"
	],
	statut: [
		"statut",
		"status",
		"etat",
		"avancement",
		"etape"
	],
	lieu: [
		"lieu",
		"ville",
		"localisation",
		"location",
		"city",
		"site"
	],
	lien: [
		"lien",
		"url",
		"link",
		"annonce",
		"offre lien"
	],
	contact: [
		"contact",
		"recruteur",
		"referent",
		"interlocuteur"
	],
	source: [
		"source",
		"plateforme",
		"canal",
		"site",
		"provenance"
	],
	secteur: [
		"secteur",
		"industrie",
		"domaine",
		"sector"
	],
	dateEnvoi: [
		"date candidature",
		"date envoi",
		"date postule",
		"postule le",
		"date",
		"applied"
	],
	dateRelance: [
		"relance",
		"date relance",
		"follow up",
		"suivi"
	],
	dateLimite: [
		"date limite",
		"deadline",
		"limite",
		"cloture",
		"expiration"
	],
	commentaire: [
		"commentaire",
		"note",
		"notes",
		"remarque",
		"observation",
		"comment"
	],
	missions: [
		"missions",
		"responsabilites",
		"missions cles",
		"taches",
		"activities"
	],
	profilRecherche: [
		"profil",
		"profil recherche",
		"competences",
		"requirements",
		"qualifications"
	],
	modalites: [
		"modalites",
		"conditions",
		"duree",
		"remuneration",
		"gratification"
	],
	detail: [
		"detail",
		"description",
		"texte offre",
		"fiche de poste"
	]
};
function mappingAutoCandidature(colonnes) {
	const m = {};
	for (const champ of CHAMPS_CANDIDATURE) {
		const col = trouverColonne(colonnes, MOTS_CANDIDATURE[champ.cle]);
		if (col && !Object.values(m).includes(col)) m[champ.cle] = col;
	}
	return m;
}
var ALIAS_STATUT = [
	{
		mots: [
			"entretien",
			"interview",
			"rdv"
		],
		statut: "J'ai un entretien"
	},
	{
		mots: [
			"relance",
			"relancé",
			"follow"
		],
		statut: "J'ai relancé"
	},
	{
		mots: [
			"refus",
			"negati",
			"rejet",
			"ko",
			"decline"
		],
		statut: "J'ai reçu une réponse négative"
	},
	{
		mots: [
			"sans reponse",
			"aucune reponse",
			"no answer",
			"attente",
			"pending"
		],
		statut: "Je n'ai pas reçu de réponse"
	},
	{
		mots: [
			"postul",
			"envoy",
			"applied",
			"candidature envoyee"
		],
		statut: "J'ai postulé"
	},
	{
		mots: [
			"a postuler",
			"prevu",
			"to apply",
			"reperee",
			"wishlist",
			"interesse"
		],
		statut: "Je vais postuler"
	}
];
function normaliserStatut(valeur) {
	const v = normaliser(valeur);
	if (!v) return "Je vais postuler";
	const exact = STATUTS.find((s) => normaliser(s) === v);
	if (exact) return exact;
	for (const a of ALIAS_STATUT) if (a.mots.some((m) => v.includes(normaliser(m)))) return a.statut;
	return "Je vais postuler";
}
function ligneVersCandidature(ligne, mapping) {
	const val = (cle) => {
		const col = mapping[cle];
		return col ? (ligne[col] ?? "").trim() : "";
	};
	const entreprise = val("entreprise");
	const poste = val("poste");
	if (!entreprise && !poste) return null;
	return {
		...emptyCandidature(),
		entreprise: entreprise || "Sans nom",
		poste,
		statut: normaliserStatut(val("statut")),
		lieu: val("lieu"),
		lien: val("lien"),
		contact: val("contact"),
		source: val("source"),
		secteur: val("secteur"),
		dateEnvoi: normaliserDate(val("dateEnvoi")),
		dateRelance: normaliserDate(val("dateRelance")),
		dateLimite: normaliserDate(val("dateLimite")),
		commentaire: val("commentaire"),
		missions: val("missions"),
		profilRecherche: val("profilRecherche"),
		modalites: val("modalites"),
		detail: val("detail")
	};
}
var CHAMPS_CONTACT = [
	{
		cle: "nom",
		label: "Nom",
		requis: true
	},
	{
		cle: "entreprise",
		label: "Entreprise",
		requis: false
	},
	{
		cle: "poste",
		label: "Poste",
		requis: false
	},
	{
		cle: "email",
		label: "Email",
		requis: false
	},
	{
		cle: "telephone",
		label: "Téléphone",
		requis: false
	},
	{
		cle: "linkedin",
		label: "Profil LinkedIn",
		requis: false
	},
	{
		cle: "type",
		label: "Type de contact",
		requis: false
	},
	{
		cle: "notes",
		label: "Notes",
		requis: false
	}
];
var MOTS_CONTACT = {
	nom: [
		"nom complet",
		"nom",
		"name",
		"full name",
		"first name",
		"prenom",
		"contact"
	],
	entreprise: [
		"entreprise",
		"company",
		"societe",
		"organisation",
		"employeur"
	],
	poste: [
		"poste",
		"position",
		"titre",
		"fonction",
		"job title",
		"role"
	],
	email: [
		"email",
		"e mail",
		"mail",
		"adresse mail",
		"email address"
	],
	telephone: [
		"telephone",
		"tel",
		"phone",
		"mobile",
		"portable"
	],
	linkedin: [
		"linkedin",
		"url",
		"profil",
		"profile"
	],
	type: [
		"type",
		"categorie",
		"relation",
		"role contact"
	],
	notes: [
		"notes",
		"note",
		"commentaire",
		"remarque"
	]
};
function mappingAutoContact(colonnes) {
	const m = {};
	for (const champ of CHAMPS_CONTACT) {
		const col = trouverColonne(colonnes, MOTS_CONTACT[champ.cle]);
		if (col && !Object.values(m).includes(col)) m[champ.cle] = col;
	}
	const prenom = trouverColonne(colonnes, ["first name", "prenom"]);
	const nomFamille = trouverColonne(colonnes, ["last name", "nom de famille"]);
	if (prenom && nomFamille) {
		m["nom"] = prenom;
		m["_nom2"] = nomFamille;
	}
	return m;
}
function normaliserTypeContact(valeur) {
	const v = normaliser(valeur);
	const exact = TYPES_CONTACT.find((t) => normaliser(t) === v);
	if (exact) return exact;
	if (v.includes("rh") || v.includes("hr")) return "RH";
	if (v.includes("manager") || v.includes("directeur")) return "Manager";
	if (v.includes("alumni") || v.includes("eleve") || v.includes("ecole")) return "Ancien élève";
	if (v.includes("recrut")) return "Recruteur";
	return "Contact professionnel";
}
function ligneVersContact(ligne, mapping) {
	const val = (cle) => {
		const col = mapping[cle];
		return col ? (ligne[col] ?? "").trim() : "";
	};
	const nom = [val("nom"), val("_nom2")].filter(Boolean).join(" ").trim();
	const email = val("email");
	if (!nom && !email) return null;
	return {
		...emptyContact(),
		nom: nom || email,
		entreprise: val("entreprise"),
		poste: val("poste"),
		email,
		telephone: val("telephone"),
		linkedin: val("linkedin"),
		type: normaliserTypeContact(val("type")),
		notes: val("notes")
	};
}
function cleDoublonCandidature(c) {
	return `${normaliser(c.entreprise)}|${normaliser(c.poste)}`;
}
function cleDoublonContact(c) {
	return c.email ? normaliser(c.email) : normaliser(c.nom);
}
function echapper(v) {
	return v.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}
function compact(date) {
	return date.replace(/-/g, "");
}
function evenementsDepuisCandidatures(items) {
	const evts = [];
	for (const c of items) {
		if (c.archive) continue;
		const libelle = [c.entreprise, c.poste].filter(Boolean).join(" — ");
		if (c.dateLimite) evts.push({
			uid: `${c.id}-limite`,
			date: c.dateLimite,
			titre: `Date limite : ${libelle}`,
			description: `Dernier jour pour postuler.${c.lien ? ` ${c.lien}` : ""}`
		});
		if (c.dateRelance) evts.push({
			uid: `${c.id}-relance`,
			date: c.dateRelance,
			titre: `Relance : ${libelle}`,
			description: "Relance prévue depuis Careerly."
		});
		if (c.statut === "J'ai un entretien" && c.dateDernierContact) evts.push({
			uid: `${c.id}-entretien`,
			date: c.dateDernierContact,
			titre: `Entretien : ${libelle}`,
			description: "Entretien suivi dans Careerly."
		});
	}
	return evts;
}
function construireIcs(evts) {
	const stamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
	const lignes = [
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"PRODID:-//Careerly//Suivi de candidatures//FR",
		"CALSCALE:GREGORIAN",
		"X-WR-CALNAME:Careerly"
	];
	for (const e of evts) {
		const debut = compact(e.date);
		const fin = compact(new Date(new Date(e.date).getTime() + 864e5).toISOString().slice(0, 10));
		lignes.push("BEGIN:VEVENT", `UID:${e.uid}@careerly`, `DTSTAMP:${stamp}`, `DTSTART;VALUE=DATE:${debut}`, `DTEND;VALUE=DATE:${fin}`, `SUMMARY:${echapper(e.titre)}`, `DESCRIPTION:${echapper(e.description)}`, "END:VEVENT");
	}
	lignes.push("END:VCALENDAR");
	return lignes.join("\r\n");
}
function telechargerIcs(contenu, nom = "careerly.ics") {
	const blob = new Blob([contenu], { type: "text/calendar;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = nom;
	a.click();
	URL.revokeObjectURL(url);
}
var CLE_LETTRES = "careerly.lettres";
function ImportPage() {
	const { user } = useSession();
	const { items, save } = useCandidatures();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		eyebrow: "Reprise de données",
		title: "Importer vos données",
		subtitle: "Excel, CSV, contacts LinkedIn, lettres de motivation, calendrier : rien ne repart de zéro.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "tableur",
			className: "w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "w-max",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "tableur",
								className: "gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "size-4" }), " Tableau"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "contacts",
								className: "gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }), " Contacts"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "lettres",
								className: "gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }), " Lettres"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "calendrier",
								className: "gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-4" }), " Calendrier"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "comptes",
								className: "gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "size-4" }), " LinkedIn & mails"]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "tableur",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportTableur, {
						titre: "Votre tableau de suivi",
						description: "Reprenez le fichier Excel ou Google Sheets que vous utilisiez avant Careerly. Les colonnes sont reconnues automatiquement, vous pouvez les corriger.",
						champs: CHAMPS_CANDIDATURE.map((c) => ({ ...c })),
						mappingAuto: mappingAutoCandidature,
						apercu: (l, m) => {
							const c = ligneVersCandidature(l, m);
							return c ? [
								c.entreprise,
								c.poste,
								c.statut,
								c.dateEnvoi || "—"
							] : null;
						},
						colonnesApercu: [
							"Entreprise",
							"Poste",
							"Statut",
							"Candidature"
						],
						onImport: async (lignes, mapping, ignoreDoublons, onProgress) => {
							const existantes = new Set(items.map(cleDoublonCandidature));
							let ok = 0;
							let ignores = 0;
							for (let i = 0; i < lignes.length; i++) {
								const c = ligneVersCandidature(lignes[i], mapping);
								if (!c) continue;
								const cle = cleDoublonCandidature(c);
								if (ignoreDoublons && existantes.has(cle)) ignores++;
								else {
									existantes.add(cle);
									await save(c);
									ok++;
								}
								onProgress(i + 1);
							}
							return {
								ok,
								ignores
							};
						},
						libelleObjet: "candidature"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "contacts",
					className: "mt-4",
					children: !user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "glass-card p-5 text-sm text-muted-foreground",
						children: "Connectez-vous pour importer votre carnet de contacts : il est enregistré sur votre compte pour être disponible sur tous vos appareils."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportTableur, {
						titre: "Votre liste de contacts",
						description: "Compatible avec l'export LinkedIn (Connections.csv), un export Google Contacts ou votre propre tableau.",
						champs: CHAMPS_CONTACT.map((c) => ({ ...c })),
						mappingAuto: mappingAutoContact,
						apercu: (l, m) => {
							const c = ligneVersContact(l, m);
							return c ? [
								c.nom,
								c.entreprise,
								c.poste,
								c.email || "—"
							] : null;
						},
						colonnesApercu: [
							"Nom",
							"Entreprise",
							"Poste",
							"Email"
						],
						onImport: async (lignes, mapping, ignoreDoublons, onProgress) => {
							const existants = new Set((await fetchContacts()).map(cleDoublonContact));
							let ok = 0;
							let ignores = 0;
							for (let i = 0; i < lignes.length; i++) {
								const c = ligneVersContact(lignes[i], mapping);
								if (!c) continue;
								const cle = cleDoublonContact(c);
								if (ignoreDoublons && existants.has(cle)) ignores++;
								else {
									existants.add(cle);
									await upsertContact(c, user.id);
									ok++;
								}
								onProgress(i + 1);
							}
							return {
								ok,
								ignores
							};
						},
						libelleObjet: "contact"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "lettres",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportLettres, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "calendrier",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportCalendrier, {
						nb: evenementsDepuisCandidatures(items).length,
						onExport: () => {
							const evts = evenementsDepuisCandidatures(items);
							if (evts.length === 0) {
								toast.error("Aucune échéance à exporter pour le moment.");
								return;
							}
							telechargerIcs(construireIcs(evts));
							toast.success(`${evts.length} échéance(s) exportée(s).`);
						}
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "comptes",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuidesComptes, {})
				})
			]
		})
	});
}
function ImportTableur({ titre, description, champs, mappingAuto, apercu, colonnesApercu, onImport, libelleObjet }) {
	const inputRef = (0, import_react.useRef)(null);
	const [fichier, setFichier] = (0, import_react.useState)(null);
	const [tableau, setTableau] = (0, import_react.useState)(null);
	const [mapping, setMapping] = (0, import_react.useState)({});
	const [lecture, setLecture] = (0, import_react.useState)(false);
	const [envoi, setEnvoi] = (0, import_react.useState)(false);
	const [progres, setProgres] = (0, import_react.useState)(0);
	const [ignoreDoublons, setIgnoreDoublons] = (0, import_react.useState)(true);
	const [fait, setFait] = (0, import_react.useState)(null);
	const charger = async (file, feuille) => {
		setLecture(true);
		setFait(null);
		try {
			const t = await lireTableur(file, feuille);
			setTableau(t);
			setMapping(mappingAuto(t.colonnes));
			setFichier(file);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Lecture impossible");
			setTableau(null);
		} finally {
			setLecture(false);
		}
	};
	const lignesApercu = (0, import_react.useMemo)(() => {
		if (!tableau) return [];
		return tableau.lignes.slice(0, 5).map((l) => apercu(l, mapping));
	}, [
		tableau,
		mapping,
		apercu
	]);
	const manquant = champs.find((c) => c.requis && !mapping[c.cle]);
	const lancer = async () => {
		if (!tableau) return;
		setEnvoi(true);
		setProgres(0);
		try {
			const r = await onImport(tableau.lignes, mapping, ignoreDoublons, setProgres);
			setFait(r);
			toast.success(`${r.ok} ${libelleObjet}(s) importé(s).`);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Import impossible");
		} finally {
			setEnvoi(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-card p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: titre
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: inputRef,
					type: "file",
					accept: TYPES_TABLEUR,
					className: "hidden",
					onChange: (e) => {
						const f = e.target.files?.[0];
						if (f) charger(f);
						e.target.value = "";
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => inputRef.current?.click(),
						disabled: lecture,
						children: [lecture ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), "Choisir un fichier"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "min-w-0 truncate text-xs text-muted-foreground",
						children: fichier ? fichier.name : "Excel (.xlsx, .xls), CSV, TSV ou OpenDocument"
					})]
				})
			]
		}), tableau && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			tableau.feuilles.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card flex flex-wrap items-center gap-3 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted-foreground",
					children: "Feuille à importer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: tableau.feuille,
					onValueChange: (v) => fichier && void charger(fichier, v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "w-56",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: tableau.feuilles.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: f,
						children: f
					}, f)) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold",
						children: "Correspondance des colonnes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: [tableau.lignes.length, " ligne(s) détectée(s). Vérifiez que chaque champ pointe vers la bonne colonne de votre fichier."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-2",
						children: champs.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-xs font-medium text-muted-foreground",
								children: [c.label, c.requis && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: " *"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: mapping[c.cle] ?? "__aucune",
								onValueChange: (v) => setMapping((m) => ({
									...m,
									[c.cle]: v === "__aucune" ? void 0 : v
								})),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-1 w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Aucune" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "__aucune",
									children: "Aucune"
								}), tableau.colonnes.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: col,
									children: col
								}, col))] })]
							})]
						}, c.cle))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold",
						children: "Aperçu"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[520px] text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
								className: "text-[11px] uppercase tracking-wide text-muted-foreground",
								children: colonnesApercu.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 pr-3 font-semibold",
									children: c
								}, c))
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: lignesApercu.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
								className: "border-t border-border/50",
								children: (l ?? [
									"—",
									"—",
									"—",
									"—"
								]).map((v, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 pr-3",
									children: v || "—"
								}, j))
							}, i)) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 flex items-center gap-2 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: ignoreDoublons,
							onChange: (e) => setIgnoreDoublons(e.target.checked),
							className: "size-4 accent-[var(--color-primary)]"
						}), "Ignorer les doublons déjà présents dans Careerly"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => void lancer(),
								disabled: envoi || !!manquant,
								children: [
									envoi ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }),
									"Importer ",
									tableau.lignes.length,
									" ligne(s)"
								]
							}),
							manquant && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-destructive",
								children: [
									"Choisissez une colonne pour « ",
									manquant.label,
									" »."
								]
							}),
							envoi && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground",
								children: [
									progres,
									"/",
									tableau.lignes.length
								]
							})
						]
					}),
					fait && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 flex items-center gap-2 text-sm text-primary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }),
							fait.ok,
							" ",
							libelleObjet,
							"(s) importé(s)",
							fait.ignores > 0 && ` · ${fait.ignores} doublon(s) ignoré(s)`
						]
					})
				]
			})
		] })]
	});
}
function ImportLettres() {
	const inputRef = (0, import_react.useRef)(null);
	const [charge, setCharge] = (0, import_react.useState)(false);
	const [ajoutees, setAjoutees] = (0, import_react.useState)([]);
	const importer = async (files) => {
		setCharge(true);
		const noms = [];
		try {
			const brut = window.localStorage.getItem(CLE_LETTRES);
			const existantes = brut ? JSON.parse(brut) : [];
			const nouvelles = [];
			for (const f of Array.from(files)) try {
				const texte = await extraireTexteFichier(f);
				nouvelles.push({
					id: crypto.randomUUID(),
					titre: f.name.replace(/\.[^.]+$/, ""),
					objet: "Lettre importée",
					contenu: texte,
					conseils: [],
					creeLe: (/* @__PURE__ */ new Date()).toISOString()
				});
				noms.push(f.name);
			} catch (e) {
				toast.error(`${f.name} : ${e instanceof Error ? e.message : "lecture impossible"}`);
			}
			if (nouvelles.length > 0) {
				window.localStorage.setItem(CLE_LETTRES, JSON.stringify([...nouvelles, ...existantes]));
				setAjoutees(noms);
				toast.success(`${nouvelles.length} document(s) ajouté(s) à vos lettres.`);
			}
		} finally {
			setCharge(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-card p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold",
				children: "Vos lettres de motivation existantes"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Importez vos lettres déjà rédigées (PDF, DOCX, TXT, Markdown, RTF). Elles rejoignent la page Documents et servent de base à l'IA pour vos prochaines lettres."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				type: "file",
				multiple: true,
				accept: TYPES_ACCEPTES,
				className: "hidden",
				onChange: (e) => {
					if (e.target.files?.length) importer(e.target.files);
					e.target.value = "";
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "mt-4",
				onClick: () => inputRef.current?.click(),
				disabled: charge,
				children: [charge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), "Importer des lettres"]
			}),
			ajoutees.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-1 text-sm text-muted-foreground",
				children: ajoutees.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-primary" }),
						" ",
						n
					]
				}, n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted-foreground",
				children: "Pour votre CV, utilisez le CV Analyzer depuis la page Profil : il remplit automatiquement vos compétences et expériences."
			})
		]
	});
}
function ExportCalendrier({ nb, onExport }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-card p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold",
				children: "Vos échéances dans votre agenda"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [
					"Careerly génère un fichier .ics contenant vos dates limites, relances et entretiens (",
					nb,
					" échéance(s)). Il s'ouvre dans Google Agenda, Apple Calendrier ou Outlook."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "mt-4",
				onClick: onExport,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-4" }), " Télécharger mon calendrier (.ics)"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "mt-4 space-y-1.5 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "1. Téléchargez le fichier .ics." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "2. Google Agenda : Paramètres → Importer et exporter → Importer, puis sélectionnez le fichier." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "3. iPhone / Mac : ouvrez le fichier, il s'ajoute à Calendrier." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "4. Relancez l'export après avoir ajouté de nouvelles offres." })
				]
			})
		]
	});
}
function GuidesComptes() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 [&>*]:min-w-0 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guide, {
			icon: Linkedin,
			titre: "LinkedIn",
			etapes: [
				"Sur LinkedIn : Moi → Préférences et confidentialité → Obtenir une copie de vos données.",
				"Cochez « Connections » (contacts) et « Job Applications » (candidatures envoyées).",
				"LinkedIn envoie un .zip par email en quelques minutes.",
				"Revenez ici : Connections.csv dans l'onglet Contacts, Job Applications.csv dans l'onglet Tableau."
			],
			lien: {
				href: "https://www.linkedin.com/mypreferences/d/download-my-data",
				label: "Ouvrir l'export LinkedIn"
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guide, {
			icon: Mail,
			titre: "Emails",
			etapes: [
				"Careerly ne lit pas votre boîte mail : vos messages restent chez votre fournisseur.",
				"Collez le contenu d'un email de recruteur dans la fiche candidature (onglet Détail) ou dans l'historique du contact.",
				"L'IA s'appuie ensuite dessus pour rédiger vos relances et préparer vos entretiens.",
				"Un export Google Contacts (.csv) s'importe directement dans l'onglet Contacts."
			],
			lien: {
				href: "https://contacts.google.com/",
				label: "Exporter Google Contacts"
			}
		})]
	});
}
function Guide({ icon: Icon, titre, etapes, lien }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("glass-card p-5"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tone-chip size-9 shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: titre
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-3 space-y-1.5 text-sm text-muted-foreground",
				children: etapes.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					i + 1,
					". ",
					e
				] }, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				className: "mt-4",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: lien.href,
					target: "_blank",
					rel: "noreferrer",
					children: lien.label
				})
			})
		]
	});
}
//#endregion
export { ImportPage as component };

import { r as e, t } from "./jsx-runtime-BkSabwWG.js";
import { c as n } from "./useStore-D1ICS8_H.js";
import { a as r, i, s as a } from "./Logo-BzB7YJf1.js";
import { n as o, t as s } from "./button-Fem7RhN8.js";
import {
  a as c,
  d as l,
  f as u,
  m as d,
  r as f,
  t as p,
} from "./AppShell-Cmck22UZ.js";
import { a as m, i as h, n as ee, r as g, t as _ } from "./select-DhJ8LJYr.js";
import {
  At as v,
  Bt as y,
  I as b,
  Lt as x,
  Z as S,
  q as C,
  z as w,
} from "./index-C957XaZb.js";
import { i as T, n as E, r as D, t as O } from "./tabs-QU5WMGYF.js";
import { t as k } from "./useSession-B5bRSz86.js";
import { t as A } from "./useCandidatures-kGyisxTi.js";
import { n as j, t as M } from "./cv-fichier-BSHVgc_-.js";
import { n as N, r as P } from "./contacts-cloud-BVygSWtV.js";
var F = r(`file-spreadsheet`, [
    [
      `path`,
      {
        d: `M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,
        key: `1oefj6`,
      },
    ],
    [`path`, { d: `M14 2v5a1 1 0 0 0 1 1h5`, key: `wfsgrz` }],
    [`path`, { d: `M8 13h2`, key: `yr2amv` }],
    [`path`, { d: `M14 13h2`, key: `un5t4a` }],
    [`path`, { d: `M8 17h2`, key: `2yhykz` }],
    [`path`, { d: `M14 17h2`, key: `10kma7` }],
  ]),
  I = e(n()),
  te = `.xlsx,.xls,.csv,.tsv,.ods`,
  L = 15728640;
async function ne(e, t) {
  if (e.size === 0) throw Error(`Ce fichier est vide.`);
  if (e.size > L) throw Error(`Ce fichier dépasse 15 Mo.`);
  let n = await y(() => import(`./xlsx-B6LBHFmH.js`), []),
    r = await e.arrayBuffer(),
    i = n.read(r, { type: `array`, cellDates: !0 }),
    a = i.SheetNames,
    o = t && a.includes(t) ? t : (a[0] ?? ``),
    s = o ? i.Sheets[o] : void 0;
  if (!s) throw Error(`Aucune feuille lisible dans ce fichier.`);
  let c = n.utils.sheet_to_json(s, {
      header: 1,
      raw: !1,
      defval: ``,
      blankrows: !1,
    }),
    l = c.findIndex(
      (e) => e.filter((e) => String(e ?? ``).trim() !== ``).length >= 2,
    );
  if (l < 0) throw Error(`Impossible de trouver les colonnes de ce tableau.`);
  let u = (c[l] ?? [])
      .map((e) => String(e ?? ``).trim())
      .map((e, t) => (e === `` ? `Colonne ${t + 1}` : e)),
    d = [];
  for (let e of c.slice(l + 1)) {
    let t = {},
      n = !0;
    (u.forEach((r, i) => {
      let a = String(e[i] ?? ``).trim();
      ((t[r] = a), a !== `` && (n = !1));
    }),
      n || d.push(t));
  }
  return { colonnes: u, lignes: d, feuilles: a, feuille: o };
}
function R(e) {
  return e
    .toLowerCase()
    .normalize(`NFD`)
    .replace(/[\u0300-\u036f]/g, ``)
    .replace(/[^a-z0-9]+/g, ` `)
    .trim();
}
function z(e) {
  let t = e.trim();
  if (!t) return ``;
  let n = /^(\d{4})-(\d{2})-(\d{2})/.exec(t);
  if (n) return `${n[1]}-${n[2]}-${n[3]}`;
  let r = /^(\d{1,2})[/.-](\d{1,2})[/.-](\d{2,4})$/.exec(t);
  if (r) {
    let e = r[1].padStart(2, `0`),
      t = r[2].padStart(2, `0`),
      n = r[3];
    return (
      n.length === 2 && (n = Number(n) > 60 ? `19${n}` : `20${n}`),
      `${n}-${t}-${e}`
    );
  }
  if (/^\d{5}$/.test(t))
    return new Date(Date.UTC(1899, 11, 30) + Number(t) * 864e5)
      .toISOString()
      .slice(0, 10);
  let i = new Date(t);
  return Number.isNaN(i.getTime()) ? `` : i.toISOString().slice(0, 10);
}
function B(e, t) {
  let n = e.map((e) => ({ col: e, n: R(e) }));
  for (let e of t) {
    let t = n.find((t) => t.n === e);
    if (t) return t.col;
  }
  for (let e of t) {
    let t = n.find((t) => t.n.includes(e));
    if (t) return t.col;
  }
  return ``;
}
var V = [
    { cle: `entreprise`, label: `Entreprise`, requis: !0 },
    { cle: `poste`, label: `Poste`, requis: !1 },
    { cle: `statut`, label: `Statut`, requis: !1 },
    { cle: `lieu`, label: `Lieu`, requis: !1 },
    { cle: `lien`, label: `Lien de l'offre`, requis: !1 },
    { cle: `contact`, label: `Contact`, requis: !1 },
    { cle: `source`, label: `Source`, requis: !1 },
    { cle: `secteur`, label: `Secteur`, requis: !1 },
    { cle: `dateEnvoi`, label: `Date de candidature`, requis: !1 },
    { cle: `dateRelance`, label: `Date de relance`, requis: !1 },
    { cle: `dateLimite`, label: `Date limite`, requis: !1 },
    { cle: `commentaire`, label: `Commentaire / notes`, requis: !1 },
    { cle: `missions`, label: `Missions clés`, requis: !1 },
    { cle: `profilRecherche`, label: `Profil recherché`, requis: !1 },
    { cle: `modalites`, label: `Modalités`, requis: !1 },
    { cle: `detail`, label: `Détail de l'offre`, requis: !1 },
  ],
  re = {
    entreprise: [
      `entreprise`,
      `societe`,
      `company`,
      `employeur`,
      `boite`,
      `organisation`,
    ],
    poste: [`poste`, `intitule`, `job`, `role`, `position`, `titre`, `offre`],
    statut: [`statut`, `status`, `etat`, `avancement`, `etape`],
    lieu: [`lieu`, `ville`, `localisation`, `location`, `city`, `site`],
    lien: [`lien`, `url`, `link`, `annonce`, `offre lien`],
    contact: [`contact`, `recruteur`, `referent`, `interlocuteur`],
    source: [`source`, `plateforme`, `canal`, `site`, `provenance`],
    secteur: [`secteur`, `industrie`, `domaine`, `sector`],
    dateEnvoi: [
      `date candidature`,
      `date envoi`,
      `date postule`,
      `postule le`,
      `date`,
      `applied`,
    ],
    dateRelance: [`relance`, `date relance`, `follow up`, `suivi`],
    dateLimite: [`date limite`, `deadline`, `limite`, `cloture`, `expiration`],
    commentaire: [
      `commentaire`,
      `note`,
      `notes`,
      `remarque`,
      `observation`,
      `comment`,
    ],
    missions: [
      `missions`,
      `responsabilites`,
      `missions cles`,
      `taches`,
      `activities`,
    ],
    profilRecherche: [
      `profil`,
      `profil recherche`,
      `competences`,
      `requirements`,
      `qualifications`,
    ],
    modalites: [
      `modalites`,
      `conditions`,
      `duree`,
      `remuneration`,
      `gratification`,
    ],
    detail: [`detail`, `description`, `texte offre`, `fiche de poste`],
  };
function ie(e) {
  let t = {};
  for (let n of V) {
    let r = B(e, re[n.cle]);
    r && !Object.values(t).includes(r) && (t[n.cle] = r);
  }
  return t;
}
var ae = [
  { mots: [`entretien`, `interview`, `rdv`], statut: `J'ai un entretien` },
  { mots: [`relance`, `relancé`, `follow`], statut: `J'ai relancé` },
  {
    mots: [`refus`, `negati`, `rejet`, `ko`, `decline`],
    statut: `J'ai reçu une réponse négative`,
  },
  {
    mots: [`sans reponse`, `aucune reponse`, `no answer`, `attente`, `pending`],
    statut: `Je n'ai pas reçu de réponse`,
  },
  {
    mots: [`postul`, `envoy`, `applied`, `candidature envoyee`],
    statut: `J'ai postulé`,
  },
  {
    mots: [
      `a postuler`,
      `prevu`,
      `to apply`,
      `reperee`,
      `wishlist`,
      `interesse`,
    ],
    statut: `Je vais postuler`,
  },
];
function oe(e) {
  let t = R(e);
  if (!t) return `Je vais postuler`;
  let n = C.find((e) => R(e) === t);
  if (n) return n;
  for (let e of ae) if (e.mots.some((e) => t.includes(R(e)))) return e.statut;
  return `Je vais postuler`;
}
function H(e, t) {
  let n = (n) => {
      let r = t[n];
      return r ? (e[r] ?? ``).trim() : ``;
    },
    r = n(`entreprise`),
    i = n(`poste`);
  return !r && !i
    ? null
    : {
        ...S(),
        entreprise: r || `Sans nom`,
        poste: i,
        statut: oe(n(`statut`)),
        lieu: n(`lieu`),
        lien: n(`lien`),
        contact: n(`contact`),
        source: n(`source`),
        secteur: n(`secteur`),
        dateEnvoi: z(n(`dateEnvoi`)),
        dateRelance: z(n(`dateRelance`)),
        dateLimite: z(n(`dateLimite`)),
        commentaire: n(`commentaire`),
        missions: n(`missions`),
        profilRecherche: n(`profilRecherche`),
        modalites: n(`modalites`),
        detail: n(`detail`),
      };
}
var U = [
    { cle: `nom`, label: `Nom`, requis: !0 },
    { cle: `entreprise`, label: `Entreprise`, requis: !1 },
    { cle: `poste`, label: `Poste`, requis: !1 },
    { cle: `email`, label: `Email`, requis: !1 },
    { cle: `telephone`, label: `Téléphone`, requis: !1 },
    { cle: `linkedin`, label: `Profil LinkedIn`, requis: !1 },
    { cle: `type`, label: `Type de contact`, requis: !1 },
    { cle: `notes`, label: `Notes`, requis: !1 },
  ],
  se = {
    nom: [
      `nom complet`,
      `nom`,
      `name`,
      `full name`,
      `first name`,
      `prenom`,
      `contact`,
    ],
    entreprise: [
      `entreprise`,
      `company`,
      `societe`,
      `organisation`,
      `employeur`,
    ],
    poste: [`poste`, `position`, `titre`, `fonction`, `job title`, `role`],
    email: [`email`, `e mail`, `mail`, `adresse mail`, `email address`],
    telephone: [`telephone`, `tel`, `phone`, `mobile`, `portable`],
    linkedin: [`linkedin`, `url`, `profil`, `profile`],
    type: [`type`, `categorie`, `relation`, `role contact`],
    notes: [`notes`, `note`, `commentaire`, `remarque`],
  };
function ce(e) {
  let t = {};
  for (let n of U) {
    let r = B(e, se[n.cle]);
    r && !Object.values(t).includes(r) && (t[n.cle] = r);
  }
  let n = B(e, [`first name`, `prenom`]),
    r = B(e, [`last name`, `nom de famille`]);
  return (n && r && ((t.nom = n), (t._nom2 = r)), t);
}
function le(e) {
  let t = R(e);
  return (
    b.find((e) => R(e) === t) ||
    (t.includes(`rh`) || t.includes(`hr`)
      ? `RH`
      : t.includes(`manager`) || t.includes(`directeur`)
        ? `Manager`
        : t.includes(`alumni`) || t.includes(`eleve`) || t.includes(`ecole`)
          ? `Ancien élève`
          : t.includes(`recrut`)
            ? `Recruteur`
            : `Contact professionnel`)
  );
}
function W(e, t) {
  let n = (n) => {
      let r = t[n];
      return r ? (e[r] ?? ``).trim() : ``;
    },
    r = [n(`nom`), n(`_nom2`)].filter(Boolean).join(` `).trim(),
    i = n(`email`);
  return !r && !i
    ? null
    : {
        ...w(),
        nom: r || i,
        entreprise: n(`entreprise`),
        poste: n(`poste`),
        email: i,
        telephone: n(`telephone`),
        linkedin: n(`linkedin`),
        type: le(n(`type`)),
        notes: n(`notes`),
      };
}
function G(e) {
  return `${R(e.entreprise)}|${R(e.poste)}`;
}
function K(e) {
  return e.email ? R(e.email) : R(e.nom);
}
function q(e) {
  return e
    .replace(/\\/g, `\\\\`)
    .replace(/;/g, `\\;`)
    .replace(/,/g, `\\,`)
    .replace(/\n/g, `\\n`);
}
function J(e) {
  return e.replace(/-/g, ``);
}
function Y(e) {
  let t = [];
  for (let n of e) {
    if (n.archive) continue;
    let e = [n.entreprise, n.poste].filter(Boolean).join(` — `);
    (n.dateLimite &&
      t.push({
        uid: `${n.id}-limite`,
        date: n.dateLimite,
        titre: `Date limite : ${e}`,
        description: `Dernier jour pour postuler.${n.lien ? ` ${n.lien}` : ``}`,
      }),
      n.dateRelance &&
        t.push({
          uid: `${n.id}-relance`,
          date: n.dateRelance,
          titre: `Relance : ${e}`,
          description: `Relance prévue depuis Careerly.`,
        }),
      n.statut === `J'ai un entretien` &&
        n.dateDernierContact &&
        t.push({
          uid: `${n.id}-entretien`,
          date: n.dateDernierContact,
          titre: `Entretien : ${e}`,
          description: `Entretien suivi dans Careerly.`,
        }));
  }
  return t;
}
function ue(e) {
  let t = new Date().toISOString().replace(/[-:]/g, ``).split(`.`)[0] + `Z`,
    n = [
      `BEGIN:VCALENDAR`,
      `VERSION:2.0`,
      `PRODID:-//Careerly//Suivi de candidatures//FR`,
      `CALSCALE:GREGORIAN`,
      `X-WR-CALNAME:Careerly`,
    ];
  for (let r of e) {
    let e = J(r.date),
      i = J(
        new Date(new Date(r.date).getTime() + 864e5).toISOString().slice(0, 10),
      );
    n.push(
      `BEGIN:VEVENT`,
      `UID:${r.uid}@careerly`,
      `DTSTAMP:${t}`,
      `DTSTART;VALUE=DATE:${e}`,
      `DTEND;VALUE=DATE:${i}`,
      `SUMMARY:${q(r.titre)}`,
      `DESCRIPTION:${q(r.description)}`,
      `END:VEVENT`,
    );
  }
  return (
    n.push(`END:VCALENDAR`),
    n.join(`\r
`)
  );
}
function de(e, t = `careerly.ics`) {
  let n = new Blob([e], { type: `text/calendar;charset=utf-8` }),
    r = URL.createObjectURL(n),
    i = document.createElement(`a`);
  ((i.href = r), (i.download = t), i.click(), URL.revokeObjectURL(r));
}
var X = t(),
  Z = `careerly.lettres`;
function fe() {
  let { user: e } = k(),
    { items: t, save: n } = A();
  return (0, X.jsx)(p, {
    eyebrow: `Reprise de données`,
    title: `Importer vos données`,
    subtitle: `Excel, CSV, contacts LinkedIn, lettres de motivation, calendrier : rien ne repart de zéro.`,
    children: (0, X.jsxs)(O, {
      defaultValue: `tableur`,
      className: `w-full`,
      children: [
        (0, X.jsx)(`div`, {
          className: `-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0`,
          children: (0, X.jsxs)(D, {
            className: `w-max`,
            children: [
              (0, X.jsxs)(T, {
                value: `tableur`,
                className: `gap-1.5`,
                children: [(0, X.jsx)(F, { className: `size-4` }), ` Tableau`],
              }),
              (0, X.jsxs)(T, {
                value: `contacts`,
                className: `gap-1.5`,
                children: [(0, X.jsx)(f, { className: `size-4` }), ` Contacts`],
              }),
              (0, X.jsxs)(T, {
                value: `lettres`,
                className: `gap-1.5`,
                children: [(0, X.jsx)(u, { className: `size-4` }), ` Lettres`],
              }),
              (0, X.jsxs)(T, {
                value: `calendrier`,
                className: `gap-1.5`,
                children: [
                  (0, X.jsx)(d, { className: `size-4` }),
                  ` Calendrier`,
                ],
              }),
              (0, X.jsxs)(T, {
                value: `comptes`,
                className: `gap-1.5`,
                children: [
                  (0, X.jsx)(l, { className: `size-4` }),
                  ` LinkedIn & mails`,
                ],
              }),
            ],
          }),
        }),
        (0, X.jsx)(E, {
          value: `tableur`,
          className: `mt-4`,
          children: (0, X.jsx)(Q, {
            titre: `Votre tableau de suivi`,
            description: `Reprenez le fichier Excel ou Google Sheets que vous utilisiez avant Careerly. Les colonnes sont reconnues automatiquement, vous pouvez les corriger.`,
            champs: V.map((e) => ({ ...e })),
            mappingAuto: ie,
            apercu: (e, t) => {
              let n = H(e, t);
              return n
                ? [n.entreprise, n.poste, n.statut, n.dateEnvoi || `—`]
                : null;
            },
            colonnesApercu: [`Entreprise`, `Poste`, `Statut`, `Candidature`],
            onImport: async (e, r, i, a) => {
              let o = new Set(t.map(G)),
                s = 0,
                c = 0;
              for (let t = 0; t < e.length; t++) {
                let l = H(e[t], r);
                if (!l) continue;
                let u = G(l);
                (i && o.has(u) ? c++ : (o.add(u), await n(l), s++), a(t + 1));
              }
              return { ok: s, ignores: c };
            },
            libelleObjet: `candidature`,
          }),
        }),
        (0, X.jsx)(E, {
          value: `contacts`,
          className: `mt-4`,
          children: e
            ? (0, X.jsx)(Q, {
                titre: `Votre liste de contacts`,
                description: `Compatible avec l'export LinkedIn (Connections.csv), un export Google Contacts ou votre propre tableau.`,
                champs: U.map((e) => ({ ...e })),
                mappingAuto: ce,
                apercu: (e, t) => {
                  let n = W(e, t);
                  return n
                    ? [n.nom, n.entreprise, n.poste, n.email || `—`]
                    : null;
                },
                colonnesApercu: [`Nom`, `Entreprise`, `Poste`, `Email`],
                onImport: async (t, n, r, i) => {
                  let a = new Set((await N()).map(K)),
                    o = 0,
                    s = 0;
                  for (let c = 0; c < t.length; c++) {
                    let l = W(t[c], n);
                    if (!l) continue;
                    let u = K(l);
                    (r && a.has(u) ? s++ : (a.add(u), await P(l, e.id), o++),
                      i(c + 1));
                  }
                  return { ok: o, ignores: s };
                },
                libelleObjet: `contact`,
              })
            : (0, X.jsx)(`p`, {
                className: `glass-card p-5 text-sm text-muted-foreground`,
                children: `Connectez-vous pour importer votre carnet de contacts : il est enregistré sur votre compte pour être disponible sur tous vos appareils.`,
              }),
        }),
        (0, X.jsx)(E, {
          value: `lettres`,
          className: `mt-4`,
          children: (0, X.jsx)(pe, {}),
        }),
        (0, X.jsx)(E, {
          value: `calendrier`,
          className: `mt-4`,
          children: (0, X.jsx)(me, {
            nb: Y(t).length,
            onExport: () => {
              let e = Y(t);
              if (e.length === 0) {
                a.error(`Aucune échéance à exporter pour le moment.`);
                return;
              }
              (de(ue(e)), a.success(`${e.length} échéance(s) exportée(s).`));
            },
          }),
        }),
        (0, X.jsx)(E, {
          value: `comptes`,
          className: `mt-4`,
          children: (0, X.jsx)(he, {}),
        }),
      ],
    }),
  });
}
function Q({
  titre: e,
  description: t,
  champs: n,
  mappingAuto: r,
  apercu: i,
  colonnesApercu: o,
  onImport: l,
  libelleObjet: u,
}) {
  let d = (0, I.useRef)(null),
    [f, p] = (0, I.useState)(null),
    [y, b] = (0, I.useState)(null),
    [S, C] = (0, I.useState)({}),
    [w, T] = (0, I.useState)(!1),
    [E, D] = (0, I.useState)(!1),
    [O, k] = (0, I.useState)(0),
    [A, j] = (0, I.useState)(!0),
    [M, N] = (0, I.useState)(null),
    P = async (e, t) => {
      (T(!0), N(null));
      try {
        let n = await ne(e, t);
        (b(n), C(r(n.colonnes)), p(e));
      } catch (e) {
        (a.error(e instanceof Error ? e.message : `Lecture impossible`),
          b(null));
      } finally {
        T(!1);
      }
    },
    F = (0, I.useMemo)(
      () => (y ? y.lignes.slice(0, 5).map((e) => i(e, S)) : []),
      [y, S, i],
    ),
    L = n.find((e) => e.requis && !S[e.cle]),
    R = async () => {
      if (y) {
        (D(!0), k(0));
        try {
          let e = await l(y.lignes, S, A, k);
          (N(e), a.success(`${e.ok} ${u}(s) importé(s).`));
        } catch (e) {
          a.error(e instanceof Error ? e.message : `Import impossible`);
        } finally {
          D(!1);
        }
      }
    };
  return (0, X.jsxs)(`div`, {
    className: `space-y-4`,
    children: [
      (0, X.jsxs)(`div`, {
        className: `glass-card p-5`,
        children: [
          (0, X.jsx)(`h2`, { className: `text-sm font-semibold`, children: e }),
          (0, X.jsx)(`p`, {
            className: `mt-1 text-sm text-muted-foreground`,
            children: t,
          }),
          (0, X.jsx)(`input`, {
            ref: d,
            type: `file`,
            accept: te,
            className: `hidden`,
            onChange: (e) => {
              let t = e.target.files?.[0];
              (t && P(t), (e.target.value = ``));
            },
          }),
          (0, X.jsxs)(`div`, {
            className: `mt-4 flex flex-wrap items-center gap-2`,
            children: [
              (0, X.jsxs)(s, {
                onClick: () => d.current?.click(),
                disabled: w,
                children: [
                  w
                    ? (0, X.jsx)(v, { className: `size-4 animate-spin` })
                    : (0, X.jsx)(c, { className: `size-4` }),
                  `Choisir un fichier`,
                ],
              }),
              (0, X.jsx)(`span`, {
                className: `min-w-0 truncate text-xs text-muted-foreground`,
                children: f
                  ? f.name
                  : `Excel (.xlsx, .xls), CSV, TSV ou OpenDocument`,
              }),
            ],
          }),
        ],
      }),
      y &&
        (0, X.jsxs)(X.Fragment, {
          children: [
            y.feuilles.length > 1 &&
              (0, X.jsxs)(`div`, {
                className: `glass-card flex flex-wrap items-center gap-3 p-4`,
                children: [
                  (0, X.jsx)(`span`, {
                    className: `text-sm text-muted-foreground`,
                    children: `Feuille à importer`,
                  }),
                  (0, X.jsxs)(_, {
                    value: y.feuille,
                    onValueChange: (e) => f && void P(f, e),
                    children: [
                      (0, X.jsx)(h, {
                        className: `w-56`,
                        children: (0, X.jsx)(m, {}),
                      }),
                      (0, X.jsx)(ee, {
                        children: y.feuilles.map((e) =>
                          (0, X.jsx)(g, { value: e, children: e }, e),
                        ),
                      }),
                    ],
                  }),
                ],
              }),
            (0, X.jsxs)(`div`, {
              className: `glass-card p-5`,
              children: [
                (0, X.jsx)(`h3`, {
                  className: `text-sm font-semibold`,
                  children: `Correspondance des colonnes`,
                }),
                (0, X.jsxs)(`p`, {
                  className: `mt-1 text-xs text-muted-foreground`,
                  children: [
                    y.lignes.length,
                    ` ligne(s) détectée(s). Vérifiez que chaque champ pointe vers la bonne colonne de votre fichier.`,
                  ],
                }),
                (0, X.jsx)(`div`, {
                  className: `mt-4 grid gap-3 sm:grid-cols-2`,
                  children: n.map((e) =>
                    (0, X.jsxs)(
                      `div`,
                      {
                        className: `min-w-0`,
                        children: [
                          (0, X.jsxs)(`label`, {
                            className: `text-xs font-medium text-muted-foreground`,
                            children: [
                              e.label,
                              e.requis &&
                                (0, X.jsx)(`span`, {
                                  className: `text-primary`,
                                  children: ` *`,
                                }),
                            ],
                          }),
                          (0, X.jsxs)(_, {
                            value: S[e.cle] ?? `__aucune`,
                            onValueChange: (t) =>
                              C((n) => ({
                                ...n,
                                [e.cle]: t === `__aucune` ? void 0 : t,
                              })),
                            children: [
                              (0, X.jsx)(h, {
                                className: `mt-1 w-full`,
                                children: (0, X.jsx)(m, {
                                  placeholder: `Aucune`,
                                }),
                              }),
                              (0, X.jsxs)(ee, {
                                children: [
                                  (0, X.jsx)(g, {
                                    value: `__aucune`,
                                    children: `Aucune`,
                                  }),
                                  y.colonnes.map((e) =>
                                    (0, X.jsx)(g, { value: e, children: e }, e),
                                  ),
                                ],
                              }),
                            ],
                          }),
                        ],
                      },
                      e.cle,
                    ),
                  ),
                }),
              ],
            }),
            (0, X.jsxs)(`div`, {
              className: `glass-card p-5`,
              children: [
                (0, X.jsx)(`h3`, {
                  className: `text-sm font-semibold`,
                  children: `Aperçu`,
                }),
                (0, X.jsx)(`div`, {
                  className: `mt-3 overflow-x-auto`,
                  children: (0, X.jsxs)(`table`, {
                    className: `w-full min-w-[520px] text-left text-sm`,
                    children: [
                      (0, X.jsx)(`thead`, {
                        children: (0, X.jsx)(`tr`, {
                          className: `text-[11px] uppercase tracking-wide text-muted-foreground`,
                          children: o.map((e) =>
                            (0, X.jsx)(
                              `th`,
                              {
                                className: `pb-2 pr-3 font-semibold`,
                                children: e,
                              },
                              e,
                            ),
                          ),
                        }),
                      }),
                      (0, X.jsx)(`tbody`, {
                        children: F.map((e, t) =>
                          (0, X.jsx)(
                            `tr`,
                            {
                              className: `border-t border-border/50`,
                              children: (e ?? [`—`, `—`, `—`, `—`]).map(
                                (e, t) =>
                                  (0, X.jsx)(
                                    `td`,
                                    {
                                      className: `py-2 pr-3`,
                                      children: e || `—`,
                                    },
                                    t,
                                  ),
                              ),
                            },
                            t,
                          ),
                        ),
                      }),
                    ],
                  }),
                }),
                (0, X.jsxs)(`label`, {
                  className: `mt-4 flex items-center gap-2 text-sm text-muted-foreground`,
                  children: [
                    (0, X.jsx)(`input`, {
                      type: `checkbox`,
                      checked: A,
                      onChange: (e) => j(e.target.checked),
                      className: `size-4 accent-[var(--color-primary)]`,
                    }),
                    `Ignorer les doublons déjà présents dans Careerly`,
                  ],
                }),
                (0, X.jsxs)(`div`, {
                  className: `mt-4 flex flex-wrap items-center gap-3`,
                  children: [
                    (0, X.jsxs)(s, {
                      onClick: () => void R(),
                      disabled: E || !!L,
                      children: [
                        E
                          ? (0, X.jsx)(v, { className: `size-4 animate-spin` })
                          : (0, X.jsx)(c, { className: `size-4` }),
                        `Importer `,
                        y.lignes.length,
                        ` ligne(s)`,
                      ],
                    }),
                    L &&
                      (0, X.jsxs)(`span`, {
                        className: `text-xs text-destructive`,
                        children: [
                          `Choisissez une colonne pour « `,
                          L.label,
                          ` ».`,
                        ],
                      }),
                    E &&
                      (0, X.jsxs)(`span`, {
                        className: `text-xs text-muted-foreground`,
                        children: [O, `/`, y.lignes.length],
                      }),
                  ],
                }),
                M &&
                  (0, X.jsxs)(`p`, {
                    className: `mt-3 flex items-center gap-2 text-sm text-primary`,
                    children: [
                      (0, X.jsx)(x, { className: `size-4` }),
                      M.ok,
                      ` `,
                      u,
                      `(s) importé(s)`,
                      M.ignores > 0 && ` · ${M.ignores} doublon(s) ignoré(s)`,
                    ],
                  }),
              ],
            }),
          ],
        }),
    ],
  });
}
function pe() {
  let e = (0, I.useRef)(null),
    [t, n] = (0, I.useState)(!1),
    [r, i] = (0, I.useState)([]),
    o = async (e) => {
      n(!0);
      let t = [];
      try {
        let n = window.localStorage.getItem(Z),
          r = n ? JSON.parse(n) : [],
          o = [];
        for (let n of Array.from(e))
          try {
            let e = await j(n);
            (o.push({
              id: crypto.randomUUID(),
              titre: n.name.replace(/\.[^.]+$/, ``),
              objet: `Lettre importée`,
              contenu: e,
              conseils: [],
              creeLe: new Date().toISOString(),
            }),
              t.push(n.name));
          } catch (e) {
            a.error(
              `${n.name} : ${e instanceof Error ? e.message : `lecture impossible`}`,
            );
          }
        o.length > 0 &&
          (window.localStorage.setItem(Z, JSON.stringify([...o, ...r])),
          i(t),
          a.success(`${o.length} document(s) ajouté(s) à vos lettres.`));
      } finally {
        n(!1);
      }
    };
  return (0, X.jsxs)(`div`, {
    className: `glass-card p-5`,
    children: [
      (0, X.jsx)(`h2`, {
        className: `text-sm font-semibold`,
        children: `Vos lettres de motivation existantes`,
      }),
      (0, X.jsx)(`p`, {
        className: `mt-1 text-sm text-muted-foreground`,
        children: `Importez vos lettres déjà rédigées (PDF, DOCX, TXT, Markdown, RTF). Elles rejoignent la page Documents et servent de base à l'IA pour vos prochaines lettres.`,
      }),
      (0, X.jsx)(`input`, {
        ref: e,
        type: `file`,
        multiple: !0,
        accept: M,
        className: `hidden`,
        onChange: (e) => {
          (e.target.files?.length && o(e.target.files), (e.target.value = ``));
        },
      }),
      (0, X.jsxs)(s, {
        className: `mt-4`,
        onClick: () => e.current?.click(),
        disabled: t,
        children: [
          t
            ? (0, X.jsx)(v, { className: `size-4 animate-spin` })
            : (0, X.jsx)(c, { className: `size-4` }),
          `Importer des lettres`,
        ],
      }),
      r.length > 0 &&
        (0, X.jsx)(`ul`, {
          className: `mt-3 space-y-1 text-sm text-muted-foreground`,
          children: r.map((e) =>
            (0, X.jsxs)(
              `li`,
              {
                className: `flex items-center gap-2`,
                children: [
                  (0, X.jsx)(x, { className: `size-4 text-primary` }),
                  ` `,
                  e,
                ],
              },
              e,
            ),
          ),
        }),
      (0, X.jsx)(`p`, {
        className: `mt-3 text-xs text-muted-foreground`,
        children: `Pour votre CV, utilisez le CV Analyzer depuis la page Profil : il remplit automatiquement vos compétences et expériences.`,
      }),
    ],
  });
}
function me({ nb: e, onExport: t }) {
  return (0, X.jsxs)(`div`, {
    className: `glass-card p-5`,
    children: [
      (0, X.jsx)(`h2`, {
        className: `text-sm font-semibold`,
        children: `Vos échéances dans votre agenda`,
      }),
      (0, X.jsxs)(`p`, {
        className: `mt-1 text-sm text-muted-foreground`,
        children: [
          `Careerly génère un fichier .ics contenant vos dates limites, relances et entretiens (`,
          e,
          ` échéance(s)). Il s'ouvre dans Google Agenda, Apple Calendrier ou Outlook.`,
        ],
      }),
      (0, X.jsxs)(s, {
        className: `mt-4`,
        onClick: t,
        children: [
          (0, X.jsx)(d, { className: `size-4` }),
          ` Télécharger mon calendrier (.ics)`,
        ],
      }),
      (0, X.jsxs)(`ol`, {
        className: `mt-4 space-y-1.5 text-sm text-muted-foreground`,
        children: [
          (0, X.jsx)(`li`, { children: `1. Téléchargez le fichier .ics.` }),
          (0, X.jsx)(`li`, {
            children: `2. Google Agenda : Paramètres → Importer et exporter → Importer, puis sélectionnez le fichier.`,
          }),
          (0, X.jsx)(`li`, {
            children: `3. iPhone / Mac : ouvrez le fichier, il s'ajoute à Calendrier.`,
          }),
          (0, X.jsx)(`li`, {
            children: `4. Relancez l'export après avoir ajouté de nouvelles offres.`,
          }),
        ],
      }),
    ],
  });
}
function he() {
  return (0, X.jsxs)(`div`, {
    className: `grid gap-4 [&>*]:min-w-0 lg:grid-cols-2`,
    children: [
      (0, X.jsx)($, {
        icon: l,
        titre: `LinkedIn`,
        etapes: [
          `Sur LinkedIn : Moi → Préférences et confidentialité → Obtenir une copie de vos données.`,
          `Cochez « Connections » (contacts) et « Job Applications » (candidatures envoyées).`,
          `LinkedIn envoie un .zip par email en quelques minutes.`,
          `Revenez ici : Connections.csv dans l'onglet Contacts, Job Applications.csv dans l'onglet Tableau.`,
        ],
        lien: {
          href: `https://www.linkedin.com/mypreferences/d/download-my-data`,
          label: `Ouvrir l'export LinkedIn`,
        },
      }),
      (0, X.jsx)($, {
        icon: i,
        titre: `Emails`,
        etapes: [
          `Careerly ne lit pas votre boîte mail : vos messages restent chez votre fournisseur.`,
          `Collez le contenu d'un email de recruteur dans la fiche candidature (onglet Détail) ou dans l'historique du contact.`,
          `L'IA s'appuie ensuite dessus pour rédiger vos relances et préparer vos entretiens.`,
          `Un export Google Contacts (.csv) s'importe directement dans l'onglet Contacts.`,
        ],
        lien: {
          href: `https://contacts.google.com/`,
          label: `Exporter Google Contacts`,
        },
      }),
    ],
  });
}
function $({ icon: e, titre: t, etapes: n, lien: r }) {
  return (0, X.jsxs)(`div`, {
    className: o(`glass-card p-5`),
    children: [
      (0, X.jsxs)(`div`, {
        className: `flex items-center gap-2`,
        children: [
          (0, X.jsx)(`span`, {
            className: `tone-chip size-9 shrink-0`,
            children: (0, X.jsx)(e, { className: `size-4` }),
          }),
          (0, X.jsx)(`h2`, { className: `text-sm font-semibold`, children: t }),
        ],
      }),
      (0, X.jsx)(`ol`, {
        className: `mt-3 space-y-1.5 text-sm text-muted-foreground`,
        children: n.map((e, t) =>
          (0, X.jsxs)(`li`, { children: [t + 1, `. `, e] }, t),
        ),
      }),
      (0, X.jsx)(s, {
        variant: `outline`,
        className: `mt-4`,
        asChild: !0,
        children: (0, X.jsx)(`a`, {
          href: r.href,
          target: `_blank`,
          rel: `noreferrer`,
          children: r.label,
        }),
      }),
    ],
  });
}
export { fe as component };

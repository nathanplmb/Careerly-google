import { r as e, t } from "./jsx-runtime-BkSabwWG.js";
import { c as n } from "./useStore-D1ICS8_H.js";
import { a as r, i, r as a, s as o } from "./Logo-BzB7YJf1.js";
import { n as s, o as c, t as l } from "./button-Fem7RhN8.js";
import { i as u, r as d } from "./profil-cloud-FShiz7FP.js";
import {
  a as f,
  g as p,
  i as m,
  m as h,
  n as g,
  r as _,
  s as v,
  t as y,
} from "./AppShell-Cmck22UZ.js";
import { t as b } from "./arrow-right-lKibUqD6.js";
import { t as x } from "./bot-DwabmE8k.js";
import { t as S } from "./briefcase--ZdJUC-4.js";
import { t as C } from "./calendar-clock-CoDi51GC.js";
import { t as w } from "./chevron-left-BhPYXx2p.js";
import { t as T } from "./chevron-right-DRjUoTJ5.js";
import {
  a as E,
  i as D,
  n as O,
  o as k,
  r as A,
  s as j,
  t as M,
} from "./dropdown-menu-CX9R2xWY.js";
import { t as N } from "./external-link-Hum5k663.js";
import { n as P, t as ee } from "./log-out-Brxkfa6q.js";
import { t as F } from "./send-Zkk9i-1X.js";
import { t as te } from "./triangle-alert-Eve6ocHQ.js";
import {
  $ as ne,
  A as re,
  At as I,
  D as L,
  Et as ie,
  Mt as ae,
  O as oe,
  Pt as R,
  Rt as z,
  X as B,
  Y as V,
  Z as se,
  an as H,
  at as U,
  en as ce,
  et as le,
  j as ue,
  k as de,
  kt as fe,
  nn as pe,
  on as me,
  ot as he,
  st as ge,
  zt as _e,
} from "./index-C957XaZb.js";
import { t as ve } from "./useProfil-DaZvyt2K.js";
import { t as ye } from "./useCandidatures-kGyisxTi.js";
import { t as be } from "./CandidatureSheet-uNs02hvY.js";
import {
  c as W,
  i as xe,
  l as G,
  n as K,
  s as Se,
  t as q,
} from "./match-run-DGcCutem.js";
import { t as Ce } from "./modal-BkVEOnww.js";
var we = r(`star`, [
    [
      `path`,
      {
        d: `M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z`,
        key: `r04s7s`,
      },
    ],
  ]),
  J = r(`timer`, [
    [`line`, { x1: `10`, x2: `14`, y1: `2`, y2: `2`, key: `14vaq8` }],
    [`line`, { x1: `12`, x2: `15`, y1: `14`, y2: `11`, key: `17fdiu` }],
    [`circle`, { cx: `12`, cy: `14`, r: `8`, key: `1e1u0o` }],
  ]),
  Te = r(`user-plus`, [
    [`path`, { d: `M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2`, key: `1yyitq` }],
    [`circle`, { cx: `9`, cy: `7`, r: `4`, key: `nufk8` }],
    [`line`, { x1: `19`, x2: `19`, y1: `8`, y2: `14`, key: `1bvyxn` }],
    [`line`, { x1: `22`, x2: `16`, y1: `11`, y2: `11`, key: `1shjgl` }],
  ]),
  Y = e(n(), 1),
  X = (e) =>
    `${e.entreprise || `Entreprise sans nom`} — ${e.poste || `poste non précisé`}`;
function Ee(e, t = U()) {
  let n = [],
    r = V(t, 7);
  for (let i of e) {
    if (i.archive) continue;
    let e = {
      id: i.id,
      entreprise: i.entreprise,
      poste: i.poste,
      statut: i.statut,
      match: typeof i.match?.global == `number` ? i.match.global : null,
      lien: !!i.lien,
    };
    if (i.dateLimite && i.statut === `Je vais postuler`) {
      let a = B(t, i.dateLimite);
      a !== null && a < 0
        ? n.push({
            ...e,
            categorie: `urgent`,
            fait: `Date limite dépassée depuis ${Math.abs(a)} j (${i.dateLimite}) chez ${X(i)}.`,
            action: `ouvrir`,
          })
        : i.dateLimite <= r &&
          n.push({
            ...e,
            categorie: `deadline`,
            fait: `Date limite de candidature le ${i.dateLimite} (dans ${a} j) chez ${X(i)}.`,
            action: `postuler`,
          });
    }
    if (i.statut === `J'ai postulé` && i.dateRelance && i.dateRelance <= t) {
      let r = i.dateEnvoi ? B(i.dateEnvoi, t) : null;
      n.push({
        ...e,
        categorie: `relance`,
        fait: `Relance prévue le ${i.dateRelance}${r === null ? `` : `, candidature envoyée il y a ${r} j`} chez ${X(i)}.`,
        action: `relancer`,
      });
    }
    if (
      (i.statut === `J'ai un entretien` &&
        n.push({
          ...e,
          categorie: `entretien`,
          fait: `Entretien en cours chez ${X(i)}${i.dateDernierContact ? ` (dernier contact le ${i.dateDernierContact})` : ``}.`,
          action: `ouvrir`,
        }),
      i.statut === `Je vais postuler` &&
        e.match !== null &&
        e.match >= 80 &&
        n.push({
          ...e,
          categorie: `opportunite`,
          fait: `Match IA de ${e.match} % chez ${X(i)}, candidature pas encore envoyée.`,
          action: `postuler`,
        }),
      i.statut === `Je vais postuler`)
    ) {
      let t = [];
      (i.detail.trim() || t.push(`détail de l'offre`),
        i.lien.trim() || t.push(`lien de l'offre`),
        i.contact.trim() || t.push(`contact`),
        i.match || t.push(`analyse Match IA`),
        t.length > 0 &&
          n.push({
            ...e,
            categorie: `finaliser`,
            fait: `Fiche incomplète chez ${X(i)} : ${t.join(`, `)} manquant(s).`,
            action: !i.match && i.detail.trim() ? `analyser` : `ouvrir`,
          }));
    }
  }
  let i = [
    `urgent`,
    `deadline`,
    `relance`,
    `entretien`,
    `opportunite`,
    `finaliser`,
  ];
  return n.sort((e, t) => i.indexOf(e.categorie) - i.indexOf(t.categorie));
}
function De(e) {
  let t = e
    .slice(0, 8)
    .map((e) => ({
      id: e.id,
      categorie: e.categorie,
      titre: `${e.entreprise || `Candidature`} — ${Oe(e.action)}`,
      raison: e.fait,
      action: e.action,
    }));
  return {
    resume: t.length
      ? `${t.length} action${t.length > 1 ? `s` : ``} à traiter aujourd'hui.`
      : `Rien d'urgent aujourd'hui.`,
    elements: t,
    recommandations: [],
    genereLe: new Date().toISOString(),
    repli: !0,
  };
}
function Oe(e) {
  switch (e) {
    case `relancer`:
      return `relancer`;
    case `postuler`:
      return `postuler`;
    case `analyser`:
      return `analyser avec l'IA`;
    case `voir_offre`:
      return `consulter l'offre`;
    default:
      return `compléter la fiche`;
  }
}
var ke = `careerly-daily-brief-v1`,
  Ae = `careerly-daily-brief-auto`;
function je(e) {
  let t = e.map((e) => `${e.id}|${e.categorie}|${e.statut}|${e.fait}`).sort()
      .join(`
`),
    n = 5381;
  for (let e = 0; e < t.length; e++) n = ((n << 5) + n + t.charCodeAt(e)) | 0;
  return (n >>> 0).toString(36);
}
function Me(e) {
  try {
    let t = window.localStorage.getItem(ke);
    if (!t) return null;
    let n = JSON.parse(t),
      r = `brief` in n ? n : { brief: n, hash: `` };
    return r.brief?.genereLe &&
      ((r.hash && r.hash === e) || r.brief.genereLe.slice(0, 10) === U())
      ? r.brief
      : null;
  } catch {
    return null;
  }
}
function Ne(e, t) {
  try {
    window.localStorage.setItem(ke, JSON.stringify({ brief: e, hash: t }));
  } catch {}
}
function Pe() {
  try {
    return window.localStorage.getItem(Ae) === U();
  } catch {
    return !0;
  }
}
function Fe() {
  try {
    window.localStorage.setItem(Ae, U());
  } catch {}
}
var Ie = u({ method: `POST` })
  .middleware([d])
  .handler(
    me(`75a504a229f5e3c0e0dba4175783b8f62dd4394c929a9350ed6741f047b60228`),
  );
function Le(e) {
  return e.map(
    (e, t) =>
      `${t + 1}. id=${e.id} | catégorie=${e.categorie} | statut=${e.statut}${e.match === null ? `` : ` | match=${e.match}%`}\n   ${e.fait}`,
  ).join(`
`);
}
async function Re(e, t) {
  let n = Ee(e);
  if (n.length === 0)
    return {
      resume: `Aucune action urgente aujourd'hui. Profitez-en pour repérer de nouvelles offres.`,
      elements: [],
      recommandations: [],
      genereLe: new Date().toISOString(),
    };
  let r;
  try {
    r = await Ie({ data: { faits: Le(n), profil: t ? xe(t) : `` } });
  } catch (e) {
    throw e instanceof Error ? e : Error(String(e ?? ``));
  }
  if (r.quotaAtteint) throw Error(r.message);
  let i = new Map(n.map((e) => [e.id, e])),
    a = new Set(),
    o = [];
  for (let e of r.elements ?? []) {
    let t = i.get(e.id);
    !t ||
      a.has(e.id) ||
      (a.add(e.id),
      o.push({
        id: t.id,
        categorie: t.categorie,
        titre: (e.titre || ``).trim().slice(0, 90) || t.entreprise,
        raison: (e.raison || ``).trim() || t.fait,
        action: t.action,
      }));
  }
  return o.length === 0
    ? De(n)
    : {
        resume: (r.resume || ``).trim() || De(n).resume,
        elements: o.slice(0, 6),
        recommandations: (r.recommandations ?? [])
          .map((e) => e.trim())
          .filter(Boolean)
          .slice(0, 3),
        genereLe: new Date().toISOString(),
      };
}
var Z = t(),
  ze = {
    urgent: {
      libelle: `Urgent`,
      icone: te,
      coin: J,
      tone: `var(--destructive)`,
    },
    relance: { libelle: `Relance`, icone: p, coin: i, tone: `var(--primary)` },
    entretien: {
      libelle: `Entretien`,
      icone: m,
      coin: h,
      tone: `var(--warning)`,
    },
    deadline: {
      libelle: `Deadline`,
      icone: C,
      coin: J,
      tone: `var(--success)`,
    },
    opportunite: {
      libelle: `Opportunité`,
      icone: a,
      coin: we,
      tone: `var(--pink)`,
    },
    finaliser: {
      libelle: `À finaliser`,
      icone: j,
      coin: j,
      tone: `var(--lilac)`,
    },
  },
  Be = {
    relancer: { libelle: `Relancer avec l'IA`, icone: g },
    postuler: { libelle: `Marquer postulé`, icone: F },
    analyser: { libelle: `Voir l'analyse`, icone: a },
    voir_offre: { libelle: `Voir l'offre`, icone: N },
    ouvrir: { libelle: `Préparer`, icone: j },
  };
function Ve(e) {
  let t = e.trim();
  if (t.length <= 42) return [t];
  let n = t.lastIndexOf(` `, 42),
    r = n > 18 ? n : 42;
  return [t.slice(0, r), t.slice(r).trim()];
}
function He({ element: e, index: t, actif: n, onAgir: r }) {
  let i = ze[e.categorie],
    a = Be[e.action],
    o = i.icone,
    c = i.coin,
    l = a.icone;
  return (0, Z.jsxs)(`article`, {
    style: { "--tone": i.tone, animationDelay: `${t * 70}ms` },
    className: s(
      `tone-card pop-in flex min-h-[188px] w-[min(80vw,272px)] shrink-0 flex-col p-4 sm:min-h-[212px] sm:w-auto`,
      n && `ring-1 ring-[color-mix(in_oklab,var(--tone)_55%,transparent)]`,
    ),
    children: [
      (0, Z.jsxs)(`header`, {
        className: `flex items-start justify-between gap-2`,
        children: [
          (0, Z.jsxs)(`span`, {
            className: `flex items-center gap-2`,
            children: [
              (0, Z.jsx)(`span`, {
                className: `tone-chip size-7 shrink-0`,
                children: (0, Z.jsx)(o, { className: `size-3.5` }),
              }),
              (0, Z.jsx)(`span`, {
                className: `text-[11px] font-bold uppercase tracking-[0.14em]`,
                style: { color: `var(--tone)` },
                children: i.libelle,
              }),
            ],
          }),
          (0, Z.jsx)(c, {
            className: `size-4 shrink-0 text-muted-foreground/70`,
          }),
        ],
      }),
      (0, Z.jsx)(`h3`, {
        className: `mt-4 text-[17px] font-bold leading-tight tracking-tight`,
        children: e.titre,
      }),
      (0, Z.jsx)(`div`, {
        className: `mt-1.5 space-y-0.5 text-[13px] leading-snug text-muted-foreground`,
        children: Ve(e.raison).map((e) =>
          (0, Z.jsx)(`p`, { className: `line-clamp-2`, children: e }, e),
        ),
      }),
      (0, Z.jsxs)(`button`, {
        type: `button`,
        onClick: r,
        className: `tone-btn mt-auto inline-flex w-fit items-center gap-2 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold`,
        children: [(0, Z.jsx)(l, { className: `size-4` }), a.libelle],
      }),
    ],
  });
}
function Ue({
  items: e,
  profil: t,
  pret: n,
  onPostuler: r,
  onRelancer: i,
  onOuvrir: o,
  onAnalyser: c,
}) {
  let [l, u] = (0, Y.useState)(null),
    [d, f] = (0, Y.useState)(!1),
    [p, m] = (0, Y.useState)(null),
    [h, g] = (0, Y.useState)(0),
    _ = (0, Y.useRef)(null),
    v = (0, Y.useMemo)(() => Ee(e), [e]),
    y = (0, Y.useMemo)(() => je(v), [v]),
    [b, x] = (0, Y.useState)(!1),
    S = (0, Y.useRef)(!1);
  ((0, Y.useEffect)(() => {
    if (!n || S.current) return;
    S.current = !0;
    let e = Me(y);
    e && (u(e), x(!0));
  }, [n, y]),
    (0, Y.useEffect)(() => {
      b ||
        !n ||
        l ||
        d ||
        v.length === 0 ||
        (S.current && (x(!0), !Pe() && (Fe(), C())));
    }, [b, n, l, d, v.length]));
  let C = async () => {
      (f(!0), m(null));
      try {
        let n = await Re(e, t);
        (u(n), Ne(n, y), Fe(), g(0));
      } catch (e) {
        m(G(e));
      } finally {
        f(!1);
      }
    },
    E = H(),
    D = (t, n) => {
      let r = e.find((e) => e.id === t);
      if (!r) return;
      if (n === `voir_offre` && r.lien) {
        window.open(r.lien, `_blank`);
        return;
      }
      let i = le(r);
      E({ to: `/assistant`, search: { oppId: r.id, step: i.step } });
    },
    O = l?.elements ?? [],
    k = Math.max(1, Math.ceil(O.length / 4)),
    A = O.slice(h * 4, h * 4 + 4),
    j = (e) => {
      (g((t) => (t + e + k) % k),
        _.current?.scrollTo({ left: 0, behavior: `smooth` }));
    };
  return (0, Z.jsxs)(`section`, {
    className: `mb-6`,
    children: [
      (0, Z.jsxs)(`div`, {
        className: `mb-3 flex items-end justify-between gap-3`,
        children: [
          (0, Z.jsxs)(`div`, {
            children: [
              (0, Z.jsx)(`h2`, {
                className: `text-[15px] font-bold tracking-tight`,
                children: `Vos priorités`,
              }),
              (0, Z.jsx)(`p`, {
                className: `mt-0.5 hidden text-xs text-muted-foreground sm:block`,
                children: l
                  ? l.resume
                  : v.length > 0
                    ? `${v.length} point${v.length > 1 ? `s` : ``} détecté${v.length > 1 ? `s` : ``} aujourd'hui`
                    : `Aucune action urgente aujourd'hui.`,
              }),
            ],
          }),
          (0, Z.jsxs)(`div`, {
            className: `flex items-center gap-1.5`,
            children: [
              k > 1 &&
                (0, Z.jsxs)(Z.Fragment, {
                  children: [
                    (0, Z.jsx)(`button`, {
                      type: `button`,
                      "aria-label": `Priorités précédentes`,
                      onClick: () => j(-1),
                      className: `press grid size-8 place-items-center rounded-full border border-border/70 bg-card/60 text-muted-foreground transition-colors hover:text-foreground`,
                      children: (0, Z.jsx)(w, { className: `size-4` }),
                    }),
                    (0, Z.jsx)(`button`, {
                      type: `button`,
                      "aria-label": `Priorités suivantes`,
                      onClick: () => j(1),
                      className: `press grid size-8 place-items-center rounded-full border border-border/70 bg-card/60 text-muted-foreground transition-colors hover:text-foreground`,
                      children: (0, Z.jsx)(T, { className: `size-4` }),
                    }),
                  ],
                }),
              (0, Z.jsx)(`button`, {
                type: `button`,
                "aria-label": l ? `Actualiser le brief` : `Générer mon brief`,
                title: l ? `Actualiser le brief` : `Générer mon brief`,
                onClick: () => void C(),
                disabled: d || !n || v.length === 0,
                className: `press grid size-8 place-items-center rounded-full border border-primary/40 bg-primary/12 text-primary transition-colors hover:bg-primary/20 disabled:opacity-50`,
                children: d
                  ? (0, Z.jsx)(I, { className: `size-4 animate-spin` })
                  : (0, Z.jsx)(a, { className: `size-4` }),
              }),
            ],
          }),
        ],
      }),
      p &&
        (0, Z.jsx)(`p`, {
          className: `mb-3 rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive`,
          children: p,
        }),
      d &&
        !l &&
        (0, Z.jsx)(`div`, {
          className: `snap-row sm:grid sm:grid-cols-2 sm:gap-3 sm:overflow-visible lg:grid-cols-4`,
          children: [0, 1, 2, 3].map((e) =>
            (0, Z.jsx)(
              `div`,
              {
                className: `h-[188px] w-[min(80vw,272px)] shrink-0 animate-pulse rounded-2xl border border-border/50 bg-card/40 sm:h-[212px] sm:w-auto`,
              },
              e,
            ),
          ),
        }),
      !d &&
        !l &&
        v.length === 0 &&
        (0, Z.jsxs)(`div`, {
          className: `glass-card flex items-center gap-3 p-5 text-sm text-muted-foreground`,
          children: [
            (0, Z.jsx)(`span`, {
              className: `tone-chip size-9 shrink-0`,
              children: (0, Z.jsx)(a, { className: `size-4` }),
            }),
            `Rien d'urgent aujourd'hui. Ajoutez une candidature pour alimenter votre brief.`,
          ],
        }),
      A.length > 0 &&
        (0, Z.jsx)(`div`, {
          ref: _,
          className: `snap-row sm:grid sm:grid-cols-2 sm:gap-3 sm:overflow-visible lg:grid-cols-4`,
          children: A.map((e, t) =>
            (0, Z.jsx)(
              He,
              {
                element: e,
                index: t,
                actif: t === 0,
                onAgir: () => D(e.id, e.action),
              },
              e.id + e.categorie,
            ),
          ),
        }),
      k > 1 &&
        (0, Z.jsx)(`div`, {
          className: `mt-3 flex justify-center gap-1.5`,
          children: Array.from({ length: k }).map((e, t) =>
            (0, Z.jsx)(
              `button`,
              {
                type: `button`,
                "aria-label": `Page ${t + 1}`,
                onClick: () => g(t),
                className: s(
                  `h-1.5 rounded-full transition-all`,
                  t === h ? `w-6 bg-primary` : `w-1.5 bg-border`,
                ),
              },
              t,
            ),
          ),
        }),
      l &&
        l.recommandations.length > 0 &&
        (0, Z.jsxs)(`details`, {
          className: `glass-card mt-3 hidden p-3 sm:block`,
          children: [
            (0, Z.jsxs)(`summary`, {
              className: `cursor-pointer list-none text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground`,
              children: [`Recommandations (`, l.recommandations.length, `)`],
            }),
            (0, Z.jsx)(`ul`, {
              className: `mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground`,
              children: l.recommandations.map((e) =>
                (0, Z.jsx)(`li`, { children: e }, e),
              ),
            }),
          ],
        }),
      l?.repli &&
        (0, Z.jsx)(`p`, {
          className: `mt-2 text-xs text-muted-foreground`,
          children: `Brief factuel généré sans IA.`,
        }),
    ],
  });
}
function We({ value: e, duration: t = 900 }) {
  let [n, r] = (0, Y.useState)(0);
  return (
    (0, Y.useEffect)(() => {
      if (
        typeof window < `u` &&
        window.matchMedia(`(prefers-reduced-motion: reduce)`).matches
      ) {
        r(e);
        return;
      }
      let n = performance.now(),
        i = 0,
        a = (o) => {
          let s = Math.min(1, (o - n) / t),
            c = 1 - (1 - s) ** 3;
          (r(Math.round(0 + (e - 0) * c)),
            s < 1 && (i = requestAnimationFrame(a)));
        };
      return ((i = requestAnimationFrame(a)), () => cancelAnimationFrame(i));
    }, [e, t]),
    (0, Z.jsx)(Z.Fragment, { children: n })
  );
}
var Ge = {
  violet: `var(--primary)`,
  lilac: `var(--lilac)`,
  amber: `var(--warning)`,
  emerald: `var(--success)`,
};
function Ke({ seed: e = 0 }) {
  let t = [10, 16, 11, 19, 13, 22, 16, 24]
      .map((t, n) => (t + ((e * 5 + n * 7) % 8)) % 24)
      .map((e, t) => [t * 9, 26 - e]),
    n = t
      .map(([e, n], r) => {
        if (r === 0) return `M${e},${n}`;
        let [i, a] = t[r - 1] ?? [0, 0],
          o = (i + e) / 2;
        return `C${o},${a} ${o},${n} ${e},${n}`;
      })
      .join(` `);
  return (0, Z.jsx)(`svg`, {
    viewBox: `0 0 64 28`,
    className: `h-7 w-16 shrink-0 overflow-visible`,
    children: (0, Z.jsx)(`path`, {
      d: n,
      fill: `none`,
      stroke: `var(--tone)`,
      strokeWidth: `2`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
    }),
  });
}
function Q({
  label: e,
  value: t,
  icon: n,
  index: r = 0,
  accent: i,
  delta: a,
  tone: o = `violet`,
  suffix: l,
  to: u,
  search: d,
}) {
  let f = (0, Z.jsxs)(`div`, {
    style: { "--tone": Ge[o], animationDelay: `${r * 70}ms` },
    className: s(
      `tone-card pop-in relative overflow-hidden p-4`,
      i &&
        `shadow-[0_0_44px_-18px_color-mix(in_oklab,var(--tone)_90%,transparent)]`,
    ),
    children: [
      (0, Z.jsxs)(`div`, {
        className: `flex items-center gap-3`,
        children: [
          (0, Z.jsx)(`span`, {
            className: `tone-chip size-10 shrink-0 rounded-2xl`,
            children: (0, Z.jsx)(n, { className: `size-5` }),
          }),
          (0, Z.jsxs)(`div`, {
            className: `min-w-0 flex-1`,
            children: [
              (0, Z.jsxs)(`div`, {
                className: `num text-[30px] font-extrabold leading-none`,
                children: [(0, Z.jsx)(We, { value: t }), l],
              }),
              (0, Z.jsx)(`p`, {
                className: `mt-1 truncate text-[13px] text-muted-foreground`,
                children: e,
              }),
            ],
          }),
        ],
      }),
      (0, Z.jsxs)(`div`, {
        className: `mt-2 flex items-end justify-between gap-2`,
        children: [
          (0, Z.jsx)(`span`, {
            className: `truncate text-[11px] font-semibold`,
            style: { color: `var(--tone)` },
            children: a ?? ``,
          }),
          (0, Z.jsx)(Ke, { seed: r }),
        ],
      }),
      u
        ? (0, Z.jsx)(T, {
            className: `absolute right-3 top-3 size-4 text-muted-foreground opacity-0 transition group-hover:opacity-100`,
          })
        : null,
    ],
  });
  return u
    ? (0, Z.jsx)(c, {
        to: u,
        search: d,
        className: `group block min-w-0 rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring`,
        children: f,
      })
    : f;
}
var qe = [
  `bg-primary`,
  `bg-warning`,
  `bg-lilac`,
  `bg-success`,
  `bg-chart-3`,
  `bg-destructive`,
];
function Je(e) {
  return (
    e
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((e) => e[0]?.toUpperCase())
      .join(``) || `?`
  );
}
function Ye({ items: e, onOuvrir: t }) {
  let n = e.slice(0, 5);
  return (0, Z.jsxs)(`section`, {
    className: `glass-card pop-in p-4 sm:p-5`,
    children: [
      (0, Z.jsxs)(`header`, {
        className: `mb-3 flex items-center justify-between gap-3`,
        children: [
          (0, Z.jsx)(`h2`, {
            className: `text-[15px] font-bold`,
            children: `Mes candidatures récentes`,
          }),
          (0, Z.jsx)(c, {
            to: `/`,
            hash: `candidatures`,
            className: `rounded-full bg-accent/50 px-3 py-1 text-[11.5px] font-medium text-muted-foreground transition-colors hover:text-foreground`,
            children: `Voir tout`,
          }),
        ],
      }),
      (0, Z.jsxs)(`ul`, {
        className: `flex flex-col`,
        children: [
          n.length === 0 &&
            (0, Z.jsx)(`li`, {
              className: `py-6 text-center text-sm text-muted-foreground`,
              children: `Aucune candidature pour le moment.`,
            }),
          n.map((e, n) => {
            let r = e.match ? W(e.match.global) : null;
            return (0, Z.jsx)(
              `li`,
              {
                className: `pop-in`,
                style: { animationDelay: `${n * 50}ms` },
                children: (0, Z.jsxs)(`button`, {
                  type: `button`,
                  onClick: () => t(e),
                  className: `flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-colors hover:bg-accent/40`,
                  children: [
                    (0, Z.jsx)(`span`, {
                      className: `grid size-9 shrink-0 place-items-center rounded-full bg-accent/60 text-[12px] font-bold`,
                      children: Je(e.entreprise),
                    }),
                    (0, Z.jsxs)(`span`, {
                      className: `min-w-0 flex-1`,
                      children: [
                        (0, Z.jsx)(`span`, {
                          className: `block truncate text-[13.5px] font-semibold`,
                          children: e.entreprise || `Sans nom`,
                        }),
                        (0, Z.jsx)(`span`, {
                          className: `block truncate text-[12px] text-muted-foreground`,
                          children: e.poste || `—`,
                        }),
                      ],
                    }),
                    e.match &&
                      r &&
                      (0, Z.jsxs)(`span`, {
                        className: `hidden items-center gap-2 sm:flex`,
                        children: [
                          (0, Z.jsxs)(`span`, {
                            className: s(
                              `num rounded-md border px-1.5 py-0.5 text-[12px] font-bold`,
                              r.badge,
                            ),
                            children: [e.match.global, `%`],
                          }),
                          (0, Z.jsx)(`span`, {
                            className: `hidden text-[12px] text-muted-foreground lg:block`,
                            children: r.label,
                          }),
                        ],
                      }),
                    (0, Z.jsxs)(`span`, {
                      className: `hidden w-32 shrink-0 text-right md:block`,
                      children: [
                        (0, Z.jsx)(`span`, {
                          className: `block truncate text-[11px] font-medium text-foreground`,
                          children: e.statut,
                        }),
                        (0, Z.jsx)(`span`, {
                          className: `block truncate text-[11px] text-muted-foreground`,
                          children: ne(e.dateEnvoi) || `—`,
                        }),
                      ],
                    }),
                    (0, Z.jsx)(T, {
                      className: `size-4 shrink-0 text-muted-foreground`,
                    }),
                  ],
                }),
              },
              e.id,
            );
          }),
        ],
      }),
    ],
  });
}
function Xe({ candidature: e, onOuvrir: t }) {
  let n = e?.match ?? null,
    r = n?.global ?? 0,
    i = W(r),
    o = 2 * Math.PI * 52;
  return (0, Z.jsxs)(`section`, {
    className: `glass-card pop-in relative overflow-hidden p-5`,
    children: [
      (0, Z.jsx)(`div`, {
        className: `pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/10 blur-3xl`,
      }),
      !e || !n
        ? (0, Z.jsxs)(`div`, {
            className: `flex h-full min-h-48 flex-col items-center justify-center text-center`,
            children: [
              (0, Z.jsx)(a, { className: `mb-3 size-6 text-primary` }),
              (0, Z.jsx)(`p`, {
                className: `text-sm font-semibold`,
                children: `Aucune analyse IA disponible`,
              }),
              (0, Z.jsx)(`p`, {
                className: `mt-1 text-[12.5px] text-muted-foreground`,
                children: `Lancez « Actualiser les matchs IA » pour découvrir vos meilleures opportunités.`,
              }),
            ],
          })
        : (0, Z.jsxs)(`div`, {
            className: `flex flex-col items-center gap-5 text-center xl:flex-row xl:items-start xl:text-left`,
            children: [
              (0, Z.jsxs)(`div`, {
                className: `relative grid size-[120px] shrink-0 place-items-center`,
                children: [
                  (0, Z.jsxs)(`svg`, {
                    viewBox: `0 0 120 120`,
                    className: `size-[120px] -rotate-90`,
                    children: [
                      (0, Z.jsx)(`circle`, {
                        cx: `60`,
                        cy: `60`,
                        r: 52,
                        fill: `none`,
                        strokeWidth: `10`,
                        className: `stroke-accent/60`,
                      }),
                      (0, Z.jsx)(`circle`, {
                        cx: `60`,
                        cy: `60`,
                        r: 52,
                        fill: `none`,
                        strokeWidth: `10`,
                        strokeLinecap: `round`,
                        stroke: `var(--color-primary)`,
                        strokeDasharray: o,
                        strokeDashoffset: o - (o * r) / 100,
                        style: {
                          transition: `stroke-dashoffset 1s cubic-bezier(.22,1,.36,1)`,
                        },
                      }),
                    ],
                  }),
                  (0, Z.jsxs)(`span`, {
                    className: `absolute num text-3xl font-extrabold`,
                    children: [
                      r,
                      (0, Z.jsx)(`span`, {
                        className: `text-base`,
                        children: `%`,
                      }),
                    ],
                  }),
                ],
              }),
              (0, Z.jsxs)(`div`, {
                className: `min-w-0 flex-1`,
                children: [
                  (0, Z.jsxs)(`h3`, {
                    className: `flex items-center justify-center gap-1.5 text-[17px] font-bold xl:justify-start`,
                    children: [
                      i.label,
                      ` `,
                      (0, Z.jsx)(`span`, {
                        className: `text-primary`,
                        children: `✦`,
                      }),
                    ],
                  }),
                  (0, Z.jsx)(`p`, {
                    className: `mt-1 line-clamp-2 text-[13px] text-muted-foreground`,
                    children:
                      n.explication || `${e.poste} chez ${e.entreprise}`,
                  }),
                  (0, Z.jsx)(`button`, {
                    type: `button`,
                    onClick: () => t(e),
                    className: `press mt-3 inline-flex items-center gap-2 rounded-full gradient-hero px-4 py-2 text-[13px] font-semibold text-primary-foreground`,
                    children: `Voir l'analyse complète`,
                  }),
                ],
              }),
            ],
          }),
      n &&
        n.details.length > 0 &&
        (0, Z.jsx)(`ul`, {
          className: `mt-5 flex flex-col gap-2.5`,
          children: n.details
            .slice(0, 6)
            .map((e, t) =>
              (0, Z.jsxs)(
                `li`,
                {
                  className: `flex items-center gap-3`,
                  children: [
                    (0, Z.jsx)(`span`, {
                      className: `w-28 shrink-0 truncate text-[12.5px] text-muted-foreground`,
                      children: e.critere,
                    }),
                    (0, Z.jsx)(`span`, {
                      className: `h-1.5 flex-1 overflow-hidden rounded-full bg-accent/60`,
                      children: (0, Z.jsx)(`span`, {
                        className: s(`block h-full rounded-full`, qe[t % 6]),
                        style: {
                          width: `${Math.max(0, Math.min(100, e.score))}%`,
                          transition: `width .8s cubic-bezier(.22,1,.36,1)`,
                        },
                      }),
                    }),
                    (0, Z.jsxs)(`span`, {
                      className: `num w-9 shrink-0 text-right text-[12px] font-semibold`,
                      children: [e.score, `%`],
                    }),
                  ],
                },
                e.critere,
              ),
            ),
        }),
    ],
  });
}
function Ze({ onCv: e, onEmail: t, onEntretien: n }) {
  return (0, Z.jsxs)(`section`, {
    className: `ai-surface pop-in mt-6 flex flex-col gap-4 rounded-3xl p-5 md:flex-row md:items-center md:justify-between`,
    children: [
      (0, Z.jsxs)(`div`, {
        className: `flex items-center gap-3`,
        children: [
          (0, Z.jsx)(`span`, {
            className: `ai-pulse grid size-10 shrink-0 place-items-center rounded-2xl gradient-hero text-primary-foreground`,
            children: (0, Z.jsx)(a, { className: `size-5` }),
          }),
          (0, Z.jsxs)(`div`, {
            children: [
              (0, Z.jsxs)(`p`, {
                className: `text-[15px] font-bold`,
                children: [
                  `NACORA AI `,
                  (0, Z.jsx)(`span`, {
                    className: `text-primary`,
                    children: `✦`,
                  }),
                ],
              }),
              (0, Z.jsx)(`p`, {
                className: `text-[12.5px] text-muted-foreground`,
                children: `Votre copilote intelligent pour décrocher le bon poste.`,
              }),
            ],
          }),
        ],
      }),
      (0, Z.jsx)(`div`, {
        className: `flex flex-wrap gap-2`,
        children: [
          { label: `Analyser mon CV`, onClick: e },
          { label: `Générer un email`, onClick: t },
          { label: `Préparer un entretien`, onClick: n },
        ].map((e) =>
          (0, Z.jsxs)(
            `button`,
            {
              type: `button`,
              onClick: e.onClick,
              className: `press inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-2 text-[13px] font-medium transition-colors hover:border-primary/50 hover:text-foreground`,
              children: [
                (0, Z.jsx)(a, { className: `size-3.5 text-primary` }),
                ` `,
                e.label,
              ],
            },
            e.label,
          ),
        ),
      }),
    ],
  });
}
function Qe({ user: e }) {
  let t = H(),
    n = ce(),
    [r, i] = (0, Y.useState)(!1),
    [a, s] = (0, Y.useState)(!1),
    u = he(),
    d =
      e?.user_metadata?.full_name ||
      (u?.prenom ? `${u.prenom} ${u.nom || ``}`.trim() : null) ||
      e?.email?.split(`@`)[0] ||
      `Mon compte`,
    f = (u?.prenom?.[0] || e?.email?.[0] || `U`).toUpperCase();
  (0, Y.useEffect)(() => {
    (s(oe()), e?.id ? i(L(e.id)) : i(!1));
  }, [e?.id]);
  let p = async () => {
      if (e) {
        if (r) {
          (de(e.id), i(!1), o.success(`Déverrouillage biométrique désactivé.`));
          return;
        }
        try {
          (await re(e.id, e.email ?? ``),
            i(!0),
            o.success(`Déverrouillage biométrique activé sur cet appareil.`));
        } catch {
          o.error(`Impossible d'activer la biométrie sur cet appareil.`);
        }
      }
    },
    m = async () => {
      (await n.cancelQueries(), n.clear(), ge(null));
      try {
        await pe.auth.signOut();
      } catch {}
      (o.success(`Déconnexion réussie`), t({ to: `/auth`, replace: !0 }));
    };
  return e
    ? (0, Z.jsxs)(M, {
        children: [
          (0, Z.jsx)(k, {
            asChild: !0,
            children: (0, Z.jsxs)(l, {
              variant: `outline`,
              size: `sm`,
              className: `gap-2 border-border/80 hover:bg-accent px-2.5`,
              children: [
                (0, Z.jsx)(`div`, {
                  className: `flex size-5 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary`,
                  children: f,
                }),
                (0, Z.jsx)(`span`, {
                  className: `max-w-28 truncate text-xs font-medium`,
                  children: d,
                }),
              ],
            }),
          }),
          (0, Z.jsxs)(O, {
            align: `end`,
            className: `w-64 p-1.5 shadow-xl`,
            children: [
              (0, Z.jsx)(D, {
                className: `p-2 font-normal`,
                children: (0, Z.jsxs)(`div`, {
                  className: `flex flex-col space-y-1`,
                  children: [
                    (0, Z.jsxs)(`div`, {
                      className: `flex items-center justify-between`,
                      children: [
                        (0, Z.jsx)(`p`, {
                          className: `text-sm font-semibold text-foreground truncate`,
                          children: d,
                        }),
                        (0, Z.jsxs)(`span`, {
                          className: `inline-flex items-center gap-1 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary`,
                          children: [
                            (0, Z.jsx)(ie, { className: `size-3` }),
                            ` Connecté`,
                          ],
                        }),
                      ],
                    }),
                    (0, Z.jsx)(`p`, {
                      className: `text-xs text-muted-foreground truncate`,
                      children: e.email,
                    }),
                    u?.ecole &&
                      (0, Z.jsxs)(`p`, {
                        className: `text-[11px] text-muted-foreground/80 truncate`,
                        children: [`🎓 `, u.ecole],
                      }),
                  ],
                }),
              }),
              (0, Z.jsx)(E, {}),
              (0, Z.jsx)(A, {
                asChild: !0,
                children: (0, Z.jsxs)(c, {
                  to: `/parametres`,
                  className: `cursor-pointer gap-2 text-xs`,
                  children: [
                    (0, Z.jsx)(v, {
                      className: `size-4 text-muted-foreground`,
                    }),
                    (0, Z.jsx)(`span`, { children: `Paramètres & Profil` }),
                  ],
                }),
              }),
              (0, Z.jsx)(A, {
                asChild: !0,
                children: (0, Z.jsxs)(c, {
                  to: `/auth`,
                  className: `cursor-pointer gap-2 text-xs`,
                  children: [
                    (0, Z.jsx)(Te, {
                      className: `size-4 text-muted-foreground`,
                    }),
                    (0, Z.jsx)(`span`, { children: `Changer de compte` }),
                  ],
                }),
              }),
              a &&
                (0, Z.jsxs)(A, {
                  className: `cursor-pointer gap-2 text-xs`,
                  onSelect: (e) => {
                    (e.preventDefault(), p());
                  },
                  children: [
                    (0, Z.jsx)(R, {
                      className: `size-4 text-muted-foreground`,
                    }),
                    (0, Z.jsx)(`span`, {
                      children: r
                        ? `Désactiver la biométrie`
                        : `Activer la biométrie`,
                    }),
                  ],
                }),
              (0, Z.jsx)(E, {}),
              (0, Z.jsxs)(A, {
                className: `cursor-pointer gap-2 text-xs text-destructive focus:bg-destructive/10 focus:text-destructive`,
                onSelect: () => void m(),
                children: [
                  (0, Z.jsx)(ee, { className: `size-4` }),
                  (0, Z.jsx)(`span`, { children: `Se déconnecter` }),
                ],
              }),
            ],
          }),
        ],
      })
    : (0, Z.jsx)(l, {
        asChild: !0,
        size: `sm`,
        variant: `outline`,
        className: `gap-2 border-primary/30 hover:bg-primary/5`,
        children: (0, Z.jsxs)(c, {
          to: `/auth`,
          children: [
            (0, Z.jsx)(P, { className: `size-4 text-primary` }),
            (0, Z.jsx)(`span`, { children: `Connexion` }),
          ],
        }),
      });
}
var $ = [
  {
    titre: `Bienvenue sur NACORA 👋`,
    texte: `NACORA est votre copilote de recherche de stage ou d'alternance : un seul endroit pour suivre vos candidatures, vos relances et vos entretiens.`,
    points: [
      `Toutes vos candidatures centralisées`,
      `Synchronisées sur tous vos appareils`,
      `Un brief quotidien qui vous dit quoi faire`,
    ],
    icon: a,
  },
  {
    titre: `Votre profil, la clé du match IA`,
    texte: `Complétez votre profil (ou importez votre CV) : l'IA compare ensuite chaque offre à votre parcours et vous donne un score de compatibilité.`,
    points: [
      `Analyse automatique de votre CV`,
      `Score de match IA sur chaque offre`,
      `Points forts et écarts détaillés`,
    ],
    icon: x,
  },
  {
    titre: `Ajoutez vos offres en 10 secondes`,
    texte: `Collez le texte d'une annonce : NACORA extrait l'entreprise, le poste, le lieu et la date limite de candidature automatiquement.`,
    points: [
      `Extraction IA depuis une annonce`,
      `Deadlines suivies et surlignées`,
      `Statuts modifiables en un clic`,
    ],
    icon: C,
  },
  {
    titre: `Contacts, relances et entretiens`,
    texte: `Gardez vos contacts recruteurs au chaud : l'IA rédige vos relances et prépare vos entretiens à votre place.`,
    points: [
      `Messages de relance générés par l'IA`,
      `Préparation d'entretien personnalisée`,
      `Calendrier des deadlines et rendez-vous`,
    ],
    icon: _,
  },
  {
    titre: `Vous avez déjà commencé ailleurs ?`,
    texte: `Importez votre tableau Excel/CSV, vos contacts et vos lettres de motivation : vous ne repartez jamais de zéro.`,
    points: [
      `Import Excel / CSV avec détection des colonnes`,
      `Import de contacts et de documents`,
      `Export de votre agenda en .ics`,
    ],
    icon: f,
  },
];
function $e(e) {
  return `careerly.onboarding.${e ?? `local`}`;
}
function et(e, t) {
  let [n, r] = (0, Y.useState)(!1);
  return (
    (0, Y.useEffect)(() => {
      !t ||
        typeof window > `u` ||
        (window.localStorage.getItem($e(e)) !== `vu` && r(!0));
    }, [t, e]),
    {
      open: n,
      setOpen: (t) => {
        (!t && typeof window < `u` && window.localStorage.setItem($e(e), `vu`),
          r(t));
      },
      ouvrir: () => r(!0),
    }
  );
}
function tt({ open: e, onOpenChange: t }) {
  let [n, r] = (0, Y.useState)(0),
    i = $[n] ?? $[0],
    a = i.icon,
    o = n === $.length - 1;
  return (
    (0, Y.useEffect)(() => {
      e && r(0);
    }, [e]),
    (0, Z.jsx)(Ce, {
      open: e,
      onOpenChange: t,
      size: `md`,
      title: i.titre,
      description: `Étape ${n + 1} sur ${$.length}`,
      footer: (0, Z.jsxs)(`div`, {
        className: `flex w-full items-center justify-between gap-2`,
        children: [
          (0, Z.jsx)(l, {
            variant: `ghost`,
            size: `sm`,
            onClick: () => t(!1),
            className: `text-muted-foreground`,
            children: `Passer`,
          }),
          (0, Z.jsxs)(`div`, {
            className: `flex items-center gap-2`,
            children: [
              n > 0
                ? (0, Z.jsxs)(l, {
                    variant: `secondary`,
                    size: `sm`,
                    onClick: () => r(n - 1),
                    children: [
                      (0, Z.jsx)(_e, { className: `size-4` }),
                      ` Retour`,
                    ],
                  })
                : null,
              (0, Z.jsx)(l, {
                size: `sm`,
                onClick: () => (o ? t(!1) : r(n + 1)),
                children: o
                  ? (0, Z.jsxs)(Z.Fragment, {
                      children: [
                        `C'est parti `,
                        (0, Z.jsx)(z, { className: `size-4` }),
                      ],
                    })
                  : (0, Z.jsxs)(Z.Fragment, {
                      children: [
                        `Suivant `,
                        (0, Z.jsx)(b, { className: `size-4` }),
                      ],
                    }),
              }),
            ],
          }),
        ],
      }),
      children: (0, Z.jsxs)(
        `div`,
        {
          className: `pop-in space-y-4`,
          children: [
            (0, Z.jsx)(`div`, {
              className: `grid size-12 place-items-center rounded-2xl bg-primary/15 text-primary`,
              children: (0, Z.jsx)(a, { className: `size-6` }),
            }),
            (0, Z.jsx)(`p`, {
              className: `text-sm leading-relaxed text-muted-foreground`,
              children: i.texte,
            }),
            (0, Z.jsx)(`ul`, {
              className: `space-y-2`,
              children: i.points.map((e) =>
                (0, Z.jsxs)(
                  `li`,
                  {
                    className: `flex items-start gap-2 text-sm`,
                    children: [
                      (0, Z.jsx)(z, {
                        className: `mt-0.5 size-4 shrink-0 text-primary`,
                      }),
                      (0, Z.jsx)(`span`, { children: e }),
                    ],
                  },
                  e,
                ),
              ),
            }),
            (0, Z.jsx)(`div`, {
              className: `flex items-center gap-1.5 pt-1`,
              children: $.map((e, t) =>
                (0, Z.jsx)(
                  `button`,
                  {
                    type: `button`,
                    "aria-label": `Aller à l'étape ${t + 1}`,
                    onClick: () => r(t),
                    className: `h-1.5 rounded-full transition-all ${t === n ? `w-6 bg-primary` : `w-2 bg-border hover:bg-primary/40`}`,
                  },
                  e.titre,
                ),
              ),
            }),
          ],
        },
        n,
      ),
    })
  );
}
var nt = `neoma-biometrie-unlocked`;
function rt(e, t) {
  let [n, r] = (0, Y.useState)(!0);
  return (
    (0, Y.useEffect)(() => {
      if (!e || !t) {
        r(!0);
        return;
      }
      r(window.sessionStorage.getItem(nt) === e);
    }, [e, t]),
    {
      unlocked: n,
      unlock: () => {
        (e && window.sessionStorage.setItem(nt, e), r(!0));
      },
    }
  );
}
function it({ userId: e, onUnlock: t }) {
  let [n, r] = (0, Y.useState)(!1),
    [i, a] = (0, Y.useState)(``),
    o = async () => {
      (r(!0), a(``));
      try {
        (await ue(e), t());
      } catch {
        a(`Vérification impossible. Réessayez.`);
      } finally {
        r(!1);
      }
    };
  return (0, Z.jsx)(`div`, {
    className: `flex min-h-screen items-center justify-center bg-background px-6`,
    children: (0, Z.jsxs)(`div`, {
      className: `surface-card w-full max-w-sm p-8 text-center`,
      children: [
        (0, Z.jsx)(R, { className: `mx-auto size-10 text-primary` }),
        (0, Z.jsx)(`h1`, {
          className: `mt-4 text-xl font-semibold`,
          children: `Suivi verrouillé`,
        }),
        (0, Z.jsx)(`p`, {
          className: `mt-2 text-sm text-muted-foreground`,
          children: `Déverrouillez avec votre empreinte ou votre visage pour accéder à vos candidatures.`,
        }),
        (0, Z.jsxs)(l, {
          className: `mt-6 w-full`,
          onClick: () => void o(),
          disabled: n,
          children: [
            n
              ? (0, Z.jsx)(I, { className: `animate-spin` })
              : (0, Z.jsx)(R, {}),
            ` `,
            `Déverrouiller`,
          ],
        }),
        i &&
          (0, Z.jsx)(`p`, {
            className: `mt-3 text-sm text-destructive`,
            children: i,
          }),
      ],
    }),
  });
}
function at() {
  let { user: e, authLoading: t, items: n, ready: r, patch: i, save: s } = ye(),
    u = H(),
    d = ve(e),
    [f, m] = (0, Y.useState)(!1),
    [h, g] = (0, Y.useState)(null),
    [_, v] = (0, Y.useState)(!1),
    [x, C] = (0, Y.useState)(null),
    { unlocked: w, unlock: T } = rt(e?.id ?? null, f),
    E = et(e?.id ?? null, r && !t);
  (0, Y.useEffect)(() => {
    e?.id ? m(L(e.id)) : m(!1);
  }, [e?.id]);
  let D = U(),
    O = (e) =>
      i(e.id, {
        statut: `J'ai postulé`,
        dateEnvoi: D,
        dateRelance: V(D, 10),
        dateDernierContact: D,
      }),
    k = (e) =>
      i(e.id, {
        statut: `J'ai relancé`,
        dateRelance: e.dateRelance || D,
        dateDernierContact: D,
      }),
    A = async (e) => {
      if (!d) {
        o.error(`Complétez d'abord votre profil pour lancer l'analyse.`);
        return;
      }
      if (!K(e)) {
        o.error(`Ajoutez le détail de l'offre avant de lancer l'analyse.`);
        return;
      }
      try {
        let t = await q(e, d);
        (i(e.id, { match: t }),
          o.success(`Analyse terminée : ${t.global} / 100`));
      } catch (e) {
        o.error(G(e));
      }
    },
    j = async (e) => {
      if (!d || x) return;
      let t = n.filter((e) => K(e) && (!e.match || Se(e, d)));
      if (t.length === 0) {
        e?.silencieux || o.info(`Tous les matchs IA sont à jour.`);
        return;
      }
      C({ fait: 0, total: t.length });
      let r = 0,
        a = ``;
      for (let [e, n] of t.entries()) {
        try {
          let e = await q(n, d);
          i(n.id, { match: e });
        } catch (n) {
          if (
            ((r += 1),
            (a = G(n)),
            /crédit|quota|limite|connectez-vous|indisponible|désactiv/i.test(a))
          ) {
            C({ fait: e + 1, total: t.length });
            break;
          }
        }
        C({ fait: e + 1, total: t.length });
      }
      C(null);
      let s = t.length - r;
      r && s === 0
        ? o.error(a || `Mise à jour des matchs IA impossible.`)
        : r
          ? o.warning(`${s} match(s) mis à jour, ${r} en échec.`)
          : e?.silencieux || o.success(`${s} match(s) IA mis à jour.`);
    },
    M = (0, Y.useMemo)(
      () => ({
        total: n.length,
        envoyees: n.filter((e) => e.statut !== `Je vais postuler`).length,
        entretiens: n.filter((e) => e.statut === `J'ai un entretien`).length,
        limites: n.filter(
          (e) =>
            e.dateLimite &&
            e.dateLimite >= D &&
            e.dateLimite <= V(D, 7) &&
            e.statut === `Je vais postuler`,
        ).length,
        relances: n.filter(
          (e) =>
            e.dateRelance && e.dateRelance <= D && e.statut === `J'ai postulé`,
        ).length,
      }),
      [n, D],
    ),
    N = (0, Y.useMemo)(() => {
      let e = n.map((e) => e.match?.global).filter((e) => !!e);
      return e.length ? Math.round(e.reduce((e, t) => e + t, 0) / e.length) : 0;
    }, [n]),
    P = (0, Y.useMemo)(() => {
      let e = n.filter((e) => e.match);
      return e.length
        ? e.reduce((e, t) =>
            (t.match?.global ?? 0) > (e.match?.global ?? 0) ? t : e,
          )
        : null;
    }, [n]);
  return e && f && !w
    ? (0, Z.jsx)(it, { userId: e.id, onUnlock: T })
    : (0, Z.jsxs)(y, {
        onAdd: () => {
          (g(se()), v(!0));
        },
        actions: t
          ? (0, Z.jsx)(I, { className: `size-5 animate-spin opacity-70` })
          : e
            ? null
            : (0, Z.jsx)(Qe, { user: null }),
        children: [
          (0, Z.jsxs)(`div`, {
            className: `pop-in mb-6`,
            children: [
              (0, Z.jsxs)(`p`, {
                className: `text-[15px] font-medium text-muted-foreground`,
                children: [
                  `Bonjour `,
                  d?.prenom || e?.email?.split(`@`)[0] || `à vous`,
                  ` 👋`,
                ],
              }),
              (0, Z.jsxs)(`h1`, {
                className: `mt-1 text-2xl font-extrabold tracking-tight sm:text-[34px] sm:leading-tight`,
                children: [
                  `Voici ce qui mérite votre`,
                  ` `,
                  (0, Z.jsx)(`span`, {
                    className: `text-gradient`,
                    children: `attention`,
                  }),
                  ` aujourd'hui.`,
                ],
              }),
            ],
          }),
          (0, Z.jsx)(Ue, {
            items: n,
            profil: d,
            pret: r,
            onPostuler: O,
            onRelancer: k,
            onOuvrir: (e) => {
              (g(e), v(!0));
            },
            onAnalyser: (e) => void A(e),
          }),
          (0, Z.jsxs)(`div`, {
            className: `grid grid-cols-2 gap-3 lg:grid-cols-4`,
            children: [
              (0, Z.jsx)(Q, {
                label: `Candidatures`,
                value: M.total,
                icon: S,
                index: 0,
                tone: `violet`,
                to: `/candidatures`,
                delta: `${M.envoyees} envoyées`,
              }),
              (0, Z.jsx)(Q, {
                label: `Entretiens`,
                value: M.entretiens,
                icon: F,
                index: 1,
                tone: `lilac`,
                to: `/candidatures`,
                search: { statut: `J'ai un entretien` },
                delta: `en cours`,
              }),
              (0, Z.jsx)(Q, {
                label: `Relances à faire`,
                value: M.relances,
                icon: p,
                index: 2,
                tone: `amber`,
                to: `/candidatures`,
                search: { vue: `relances` },
                accent: M.relances > 0,
                delta: `${M.limites} deadline(s) < 7 j`,
              }),
              (0, Z.jsx)(Q, {
                label: `Score moyen`,
                value: N,
                suffix: `%`,
                icon: a,
                index: 3,
                tone: `emerald`,
                to: `/assistant/match`,
                delta: `match IA`,
              }),
            ],
          }),
          (0, Z.jsxs)(`div`, {
            className: `mt-4 grid gap-4 [&>*]:min-w-0 lg:grid-cols-[1.15fr_1fr]`,
            children: [
              (0, Z.jsx)(Ye, {
                items: n,
                onOuvrir: (e) => {
                  (g(e), v(!0));
                },
              }),
              (0, Z.jsx)(Xe, {
                candidature: P,
                onOuvrir: (e) => {
                  (g(e), v(!0));
                },
              }),
            ],
          }),
          (0, Z.jsxs)(`div`, {
            className: `glass-card mt-4 flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between`,
            children: [
              (0, Z.jsxs)(`div`, {
                children: [
                  (0, Z.jsx)(`p`, {
                    className: `text-sm font-semibold`,
                    children: `Toutes vos candidatures`,
                  }),
                  (0, Z.jsx)(`p`, {
                    className: `text-xs text-muted-foreground`,
                    children: `Tableau complet avec filtres, tri, actions rapides et export.`,
                  }),
                ],
              }),
              (0, Z.jsxs)(`div`, {
                className: `flex flex-wrap gap-2`,
                children: [
                  (0, Z.jsxs)(l, {
                    variant: `outline`,
                    onClick: E.ouvrir,
                    children: [(0, Z.jsx)(ae, {}), ` Revoir le tutoriel`],
                  }),
                  (0, Z.jsx)(l, {
                    variant: `secondary`,
                    disabled: !!x || !d,
                    onClick: () => void j(),
                    children: x
                      ? (0, Z.jsxs)(Z.Fragment, {
                          children: [
                            (0, Z.jsx)(I, { className: `animate-spin` }),
                            ` Matchs IA `,
                            x.fait,
                            `/`,
                            x.total,
                          ],
                        })
                      : (0, Z.jsxs)(Z.Fragment, {
                          children: [
                            (0, Z.jsx)(fe, {}),
                            ` Actualiser les matchs IA`,
                          ],
                        }),
                  }),
                  (0, Z.jsx)(l, {
                    asChild: !0,
                    children: (0, Z.jsxs)(c, {
                      to: `/candidatures`,
                      children: [
                        `Ouvrir le tableau `,
                        (0, Z.jsx)(b, { className: `size-4` }),
                      ],
                    }),
                  }),
                ],
              }),
            ],
          }),
          (0, Z.jsx)(Ze, {
            onCv: () => void u({ to: `/profil` }),
            onEmail: () => void u({ to: `/contacts` }),
            onEntretien: () => void u({ to: `/assistant/interview` }),
          }),
          (0, Z.jsx)(tt, { open: E.open, onOpenChange: E.setOpen }),
          (0, Z.jsx)(be, {
            open: _,
            onOpenChange: v,
            value: h,
            profil: d,
            onSave: async (e) => {
              (await s(e), v(!1));
            },
          }),
        ],
      });
}
export { at as component };

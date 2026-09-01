import { r as e, t } from "./jsx-runtime-BkSabwWG.js";
import { c as n } from "./useStore-D1ICS8_H.js";
import { a as r, r as i, s as a } from "./Logo-BzB7YJf1.js";
import { o, t as s } from "./button-Fem7RhN8.js";
import { c, g as l, l as u, p as d, t as f } from "./AppShell-Cmck22UZ.js";
import { t as p } from "./calendar-clock-CoDi51GC.js";
import { a as m, i as h, n as g, r as _, t as v } from "./select-DhJ8LJYr.js";
import {
  a as y,
  n as b,
  o as x,
  r as S,
  s as C,
  t as w,
} from "./dropdown-menu-CX9R2xWY.js";
import { t as ee } from "./download-CmU-iR4-.js";
import { t as T } from "./external-link-Hum5k663.js";
import { t as E } from "./map-pin-BWhu6I70.js";
import { t as te } from "./rotate-ccw-BIzOzO24.js";
import { t as D } from "./send-Zkk9i-1X.js";
import {
  $ as O,
  At as k,
  Dt as A,
  E as ne,
  Rt as j,
  Tt as M,
  Y as N,
  Z as P,
  at as F,
  it as re,
  kt as ie,
  n as ae,
  q as I,
} from "./index-C957XaZb.js";
import { t as oe } from "./useProfil-DaZvyt2K.js";
import { t as se } from "./useCandidatures-kGyisxTi.js";
import { t as ce } from "./CandidatureSheet-uNs02hvY.js";
import {
  c as le,
  l as L,
  n as R,
  s as z,
  t as B,
} from "./match-run-DGcCutem.js";
import { t as V } from "./MatchBadge-BBZjHc57.js";
import { t as ue } from "./ImportIaDialog-fXGqPxj0.js";
import { t as H } from "./StatutBadge-DqpCZIH-.js";
var de = r(`arrow-down-up`, [
    [`path`, { d: `m3 16 4 4 4-4`, key: `1co6wj` }],
    [`path`, { d: `M7 20V4`, key: `1yoxec` }],
    [`path`, { d: `m21 8-4-4-4 4`, key: `1c9v7m` }],
    [`path`, { d: `M17 4v16`, key: `7dpous` }],
  ]),
  fe = r(`cloud-off`, [
    [
      `path`,
      {
        d: `M10.94 5.274A7 7 0 0 1 15.71 10h1.79a4.5 4.5 0 0 1 4.222 6.057`,
        key: `1uxyv8`,
      },
    ],
    [
      `path`,
      {
        d: `M18.796 18.81A4.5 4.5 0 0 1 17.5 19H9A7 7 0 0 1 5.79 5.78`,
        key: `99tcn7`,
      },
    ],
    [`path`, { d: `m2 2 20 20`, key: `1ooewy` }],
  ]),
  U = r(`ellipsis-vertical`, [
    [`circle`, { cx: `12`, cy: `12`, r: `1`, key: `41hilf` }],
    [`circle`, { cx: `12`, cy: `5`, r: `1`, key: `gxeob9` }],
    [`circle`, { cx: `12`, cy: `19`, r: `1`, key: `lyex9k` }],
  ]),
  W = e(n()),
  G = t();
function K({ statut: e, onChange: t }) {
  return (0, G.jsxs)(w, {
    children: [
      (0, G.jsxs)(x, {
        "aria-label": `Changer le statut`,
        className: `inline-flex items-center gap-1 rounded-full outline-none transition hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring`,
        children: [
          (0, G.jsx)(H, { statut: e }),
          (0, G.jsx)(d, { className: `size-3.5 text-muted-foreground` }),
        ],
      }),
      (0, G.jsx)(b, {
        align: `start`,
        className: `w-64`,
        children: I.map((n) =>
          (0, G.jsxs)(
            S,
            {
              onSelect: () => t(n),
              className: `gap-2`,
              children: [
                (0, G.jsx)(j, {
                  className: `size-4 ${n === e ? `opacity-100` : `opacity-0`}`,
                }),
                (0, G.jsx)(`span`, { className: `text-sm`, children: n }),
              ],
            },
            n,
          ),
        ),
      }),
    ],
  });
}
function pe({
  c: e,
  index: t = 0,
  profil: n,
  analyse: r,
  onStatut: a,
  onOuvrir: o,
  onPostuler: c,
  onRelancer: u,
  onAnalyser: d,
  onSupprimer: f,
}) {
  let m = F(),
    h = !!e.dateLimite && e.dateLimite < m,
    g = !!e.dateLimite && !h && e.dateLimite <= N(m, 7),
    _ = !!e.dateRelance && e.dateRelance <= m && e.statut === `J'ai postulé`;
  return (0, G.jsxs)(`article`, {
    className: `glass-card pop-in flex min-w-0 flex-col gap-3 p-4 transition-colors hover:border-primary/40`,
    style: { animationDelay: `${Math.min(t, 12) * 40}ms` },
    children: [
      (0, G.jsxs)(`header`, {
        className: `flex min-w-0 items-start gap-2`,
        children: [
          (0, G.jsxs)(`button`, {
            type: `button`,
            onClick: o,
            className: `min-w-0 flex-1 text-left`,
            "aria-label": `Ouvrir ${e.entreprise}`,
            children: [
              (0, G.jsx)(`p`, {
                className: `truncate text-[15px] font-bold leading-tight`,
                children: e.entreprise || `Sans entreprise`,
              }),
              (0, G.jsx)(`p`, {
                className: `mt-0.5 line-clamp-2 text-[13px] text-muted-foreground`,
                children: e.poste || `Poste non précisé`,
              }),
            ],
          }),
          (0, G.jsxs)(w, {
            children: [
              (0, G.jsx)(x, {
                asChild: !0,
                children: (0, G.jsx)(s, {
                  variant: `ghost`,
                  size: `icon`,
                  "aria-label": `Plus d'actions`,
                  children: (0, G.jsx)(U, { className: `size-4` }),
                }),
              }),
              (0, G.jsxs)(b, {
                align: `end`,
                className: `w-56`,
                children: [
                  (0, G.jsxs)(S, {
                    onSelect: o,
                    children: [
                      (0, G.jsx)(C, { className: `size-4` }),
                      ` Modifier`,
                    ],
                  }),
                  (0, G.jsxs)(S, {
                    onSelect: c,
                    children: [
                      (0, G.jsx)(D, { className: `size-4` }),
                      ` Marquer postulé (relance J+10)`,
                    ],
                  }),
                  (0, G.jsxs)(S, {
                    onSelect: u,
                    children: [
                      (0, G.jsx)(l, { className: `size-4` }),
                      ` Marquer relancé`,
                    ],
                  }),
                  (0, G.jsxs)(S, {
                    onSelect: d,
                    children: [
                      (0, G.jsx)(i, { className: `size-4` }),
                      ` Analyser avec l'IA`,
                    ],
                  }),
                  e.lien
                    ? (0, G.jsx)(S, {
                        asChild: !0,
                        children: (0, G.jsxs)(`a`, {
                          href: e.lien,
                          target: `_blank`,
                          rel: `noreferrer`,
                          children: [
                            (0, G.jsx)(T, { className: `size-4` }),
                            ` Voir l'offre`,
                          ],
                        }),
                      })
                    : null,
                  (0, G.jsx)(y, {}),
                  (0, G.jsxs)(S, {
                    onSelect: f,
                    className: `text-destructive`,
                    children: [
                      (0, G.jsx)(A, { className: `size-4` }),
                      ` Supprimer`,
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, G.jsxs)(`div`, {
        className: `flex flex-wrap items-center gap-2`,
        children: [
          (0, G.jsx)(K, { statut: e.statut, onChange: a }),
          r
            ? (0, G.jsxs)(`span`, {
                className: `inline-flex items-center gap-1 text-xs text-muted-foreground`,
                children: [
                  (0, G.jsx)(k, { className: `size-3.5 animate-spin` }),
                  ` Analyse…`,
                ],
              })
            : e.match
              ? (0, G.jsx)(`button`, {
                  type: `button`,
                  onClick: d,
                  title: `Ré-analyser avec l'IA`,
                  children: (0, G.jsx)(V, {
                    match: e.match,
                    obsolete: z(e, n),
                  }),
                })
              : (0, G.jsxs)(s, {
                  variant: `ghost`,
                  size: `sm`,
                  onClick: d,
                  className: `h-7 text-xs`,
                  children: [
                    (0, G.jsx)(i, { className: `size-3.5` }),
                    ` Analyser`,
                  ],
                }),
        ],
      }),
      (0, G.jsxs)(`ul`, {
        className: `flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-muted-foreground`,
        children: [
          e.lieu
            ? (0, G.jsxs)(`li`, {
                className: `inline-flex min-w-0 items-center gap-1`,
                children: [
                  (0, G.jsx)(E, { className: `size-3.5 shrink-0` }),
                  (0, G.jsx)(`span`, {
                    className: `truncate`,
                    children: e.lieu,
                  }),
                ],
              })
            : null,
          e.contact
            ? (0, G.jsxs)(`li`, {
                className: `inline-flex min-w-0 items-center gap-1`,
                children: [
                  (0, G.jsx)(M, { className: `size-3.5 shrink-0` }),
                  (0, G.jsx)(`span`, {
                    className: `truncate`,
                    children: e.contact,
                  }),
                ],
              })
            : null,
          e.dateEnvoi
            ? (0, G.jsxs)(`li`, { children: [`Envoyée le `, O(e.dateEnvoi)] })
            : null,
        ],
      }),
      (e.dateLimite || _) &&
        (0, G.jsxs)(`div`, {
          className: `flex flex-wrap gap-2`,
          children: [
            e.dateLimite
              ? (0, G.jsxs)(`span`, {
                  className: `inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${h ? `bg-destructive/15 text-destructive` : g ? `bg-primary/15 text-primary` : `bg-muted text-muted-foreground`}`,
                  children: [
                    (0, G.jsx)(p, { className: `size-3.5` }),
                    h ? `Expirée le ` : `Limite `,
                    O(e.dateLimite),
                  ],
                })
              : null,
            _
              ? (0, G.jsxs)(`span`, {
                  className: `inline-flex items-center gap-1 rounded-full bg-[color-mix(in_oklab,var(--warning)_18%,transparent)] px-2 py-1 text-[11px] font-semibold text-[var(--warning)]`,
                  children: [
                    (0, G.jsx)(l, { className: `size-3.5` }),
                    ` Relance à faire`,
                  ],
                })
              : null,
          ],
        }),
      (0, G.jsxs)(`div`, {
        className: `mt-auto flex gap-2 pt-1`,
        children: [
          (0, G.jsxs)(s, {
            size: `sm`,
            variant: `secondary`,
            className: `flex-1`,
            onClick: c,
            children: [(0, G.jsx)(D, { className: `size-3.5` }), ` Postulé`],
          }),
          (0, G.jsxs)(s, {
            size: `sm`,
            variant: `secondary`,
            className: `flex-1`,
            onClick: u,
            children: [(0, G.jsx)(l, { className: `size-3.5` }), ` Relancé`],
          }),
          (0, G.jsx)(s, {
            size: `sm`,
            variant: `outline`,
            onClick: o,
            "aria-label": `Modifier`,
            children: (0, G.jsx)(C, { className: `size-3.5` }),
          }),
        ],
      }),
    ],
  });
}
function q() {
  let e = ae.useSearch(),
    {
      user: t,
      authLoading: n,
      items: r,
      setItems: l,
      syncing: d,
      patch: p,
      remove: y,
      save: b,
    } = se(),
    x = oe(t),
    [S, C] = (0, W.useState)(``),
    [w, T] = (0, W.useState)(e.statut ?? `tous`),
    [E, D] = (0, W.useState)(e.vue ?? `toutes`),
    [O, A] = (0, W.useState)(`tous`),
    [j, M] = (0, W.useState)(`tous`),
    [V, H] = (0, W.useState)(null),
    [U, K] = (0, W.useState)(null),
    [q, J] = (0, W.useState)(`dateEnvoi`),
    [Y, me] = (0, W.useState)(!1),
    [he, X] = (0, W.useState)(null),
    [ge, Z] = (0, W.useState)(!1),
    [_e, ve] = (0, W.useState)(!1),
    Q = F(),
    ye = (0, W.useMemo)(
      () => Array.from(new Set(r.map((e) => e.lieu).filter(Boolean))).sort(),
      [r],
    ),
    $ = (0, W.useMemo)(() => {
      let e = S.trim().toLowerCase(),
        t = r.filter((t) => {
          let n = w === `tous` || t.statut === w,
            r = O === `tous` || t.lieu === O,
            i =
              !e ||
              [t.entreprise, t.poste, t.lieu, t.contact, t.commentaire]
                .join(` `)
                .toLowerCase()
                .includes(e),
            a = t.match?.global,
            o =
              j === `tous` ||
              (j === `aucun`
                ? typeof a != `number`
                : typeof a == `number` && le(a).cle === j),
            s =
              E === `toutes` ||
              (E === `relances`
                ? !!t.dateRelance &&
                  t.dateRelance <= Q &&
                  t.statut === `J'ai postulé`
                : E !== `deadlines` ||
                  (!!t.dateLimite &&
                    t.dateLimite >= Q &&
                    t.dateLimite <= N(Q, 7)));
          return n && r && i && o && s;
        }),
        n = Y ? 1 : -1;
      return [...t].sort((e, t) => {
        if (q === `statut`)
          return (I.indexOf(e.statut) - I.indexOf(t.statut)) * n;
        if (q === `match`)
          return ((e.match?.global ?? -1) - (t.match?.global ?? -1)) * n;
        let r = e[q] ?? ``,
          i = t[q] ?? ``;
        return !r && i
          ? 1
          : r && !i
            ? -1
            : r.localeCompare(i, `fr`, { numeric: !0 }) * n;
      });
    }, [r, S, w, O, j, E, Q, q, Y]),
    be = [
      { cle: `dateEnvoi`, libelle: `Plus récentes`, asc: !1 },
      { cle: `dateEnvoi`, libelle: `Plus anciennes`, asc: !0 },
      { cle: `dateLimite`, libelle: `Date limite proche`, asc: !0 },
      { cle: `match`, libelle: `Meilleur match IA`, asc: !1 },
      { cle: `entreprise`, libelle: `Entreprise (A→Z)`, asc: !0 },
      { cle: `poste`, libelle: `Poste (A→Z)`, asc: !0 },
      { cle: `statut`, libelle: `État d'avancement`, asc: !0 },
      { cle: `dateRelance`, libelle: `Relance la plus urgente`, asc: !0 },
    ],
    xe = `${q}:${Y ? `asc` : `desc`}`,
    Se = (e) =>
      p(e.id, {
        statut: `J'ai postulé`,
        dateEnvoi: Q,
        dateRelance: N(Q, 10),
        dateDernierContact: Q,
      }),
    Ce = (e) =>
      p(e.id, {
        statut: `J'ai relancé`,
        dateRelance: e.dateRelance || Q,
        dateDernierContact: Q,
      }),
    we = async (e) => {
      if (!x) {
        a.error(`Complétez d'abord votre profil pour lancer l'analyse.`);
        return;
      }
      if (!R(e)) {
        a.error(`Ajoutez le détail de l'offre avant de lancer l'analyse.`);
        return;
      }
      H(e.id);
      try {
        let t = await B(e, x);
        (p(e.id, { match: t }),
          a.success(`Analyse terminée : ${t.global} / 100`));
      } catch (e) {
        a.error(L(e));
      } finally {
        H(null);
      }
    },
    Te = async () => {
      if (!x || U) return;
      let e = r.filter((e) => R(e) && (!e.match || z(e, x)));
      if (e.length === 0) {
        a.info(`Tous les matchs IA sont à jour.`);
        return;
      }
      K({ fait: 0, total: e.length });
      let t = 0,
        n = ``;
      for (let [r, i] of e.entries()) {
        try {
          let e = await B(i, x);
          p(i.id, { match: e });
        } catch (i) {
          if (
            ((t += 1),
            (n = L(i)),
            /crédit|quota|limite|connectez-vous|indisponible|désactiv/i.test(n))
          ) {
            K({ fait: r + 1, total: e.length });
            break;
          }
        }
        K({ fait: r + 1, total: e.length });
      }
      K(null);
      let i = e.length - t;
      t && i === 0
        ? a.error(n || `Mise à jour des matchs IA impossible.`)
        : t
          ? a.warning(`${i} match(s) mis à jour, ${t} en échec.`)
          : a.success(`${i} match(s) IA mis à jour.`);
    };
  return (0, G.jsxs)(f, {
    eyebrow: `Suivi`,
    title: `Mes candidatures`,
    subtitle: `${r.length} opportunité(s) suivie(s)`,
    searchValue: S,
    onSearch: C,
    onAdd: () => {
      (X(P()), Z(!0));
    },
    actions: n
      ? (0, G.jsx)(k, { className: `size-5 animate-spin opacity-70` })
      : null,
    children: [
      (0, G.jsxs)(`div`, {
        className: `flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center`,
        children: [
          (0, G.jsxs)(`div`, {
            className: `relative flex-1 sm:min-w-56`,
            children: [
              (0, G.jsx)(c, {
                className: `absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground`,
              }),
              (0, G.jsx)(ne, {
                value: S,
                onChange: (e) => C(e.target.value),
                placeholder: `Rechercher une entreprise, un poste, une ville…`,
                className: `pl-9`,
              }),
            ],
          }),
          (0, G.jsxs)(v, {
            value: w,
            onValueChange: T,
            children: [
              (0, G.jsx)(h, {
                className: `sm:w-56`,
                children: (0, G.jsx)(m, {}),
              }),
              (0, G.jsxs)(g, {
                children: [
                  (0, G.jsx)(_, {
                    value: `tous`,
                    children: `Tous les statuts`,
                  }),
                  I.map((e) => (0, G.jsx)(_, { value: e, children: e }, e)),
                ],
              }),
            ],
          }),
          (0, G.jsxs)(v, {
            value: O,
            onValueChange: A,
            children: [
              (0, G.jsx)(h, {
                className: `sm:w-44`,
                children: (0, G.jsx)(m, {}),
              }),
              (0, G.jsxs)(g, {
                children: [
                  (0, G.jsx)(_, { value: `tous`, children: `Tous les lieux` }),
                  ye.map((e) => (0, G.jsx)(_, { value: e, children: e }, e)),
                ],
              }),
            ],
          }),
          (0, G.jsxs)(v, {
            value: j,
            onValueChange: M,
            children: [
              (0, G.jsx)(h, {
                className: `sm:w-48`,
                children: (0, G.jsx)(m, {}),
              }),
              (0, G.jsxs)(g, {
                children: [
                  (0, G.jsx)(_, { value: `tous`, children: `Tous les matchs` }),
                  (0, G.jsx)(_, {
                    value: `excellent`,
                    children: `Excellent match`,
                  }),
                  (0, G.jsx)(_, {
                    value: `tres-bon`,
                    children: `Très bon match`,
                  }),
                  (0, G.jsx)(_, {
                    value: `interessant`,
                    children: `Match intéressant`,
                  }),
                  (0, G.jsx)(_, { value: `faible`, children: `Match faible` }),
                  (0, G.jsx)(_, { value: `aucun`, children: `Non analysé` }),
                ],
              }),
            ],
          }),
          (0, G.jsxs)(v, {
            value: E,
            onValueChange: D,
            children: [
              (0, G.jsx)(h, {
                className: `sm:w-48`,
                children: (0, G.jsx)(m, {}),
              }),
              (0, G.jsxs)(g, {
                children: [
                  (0, G.jsx)(_, {
                    value: `toutes`,
                    children: `Toutes les candidatures`,
                  }),
                  (0, G.jsx)(_, {
                    value: `relances`,
                    children: `Relances à faire`,
                  }),
                  (0, G.jsx)(_, {
                    value: `deadlines`,
                    children: `Deadlines < 7 jours`,
                  }),
                ],
              }),
            ],
          }),
          (0, G.jsxs)(v, {
            value: xe,
            onValueChange: (e) => {
              let [t, n] = e.split(`:`);
              (J(t), me(n === `asc`));
            },
            children: [
              (0, G.jsxs)(h, {
                className: `sm:w-56`,
                children: [
                  (0, G.jsx)(de, { className: `size-4 shrink-0 opacity-70` }),
                  (0, G.jsx)(m, {}),
                ],
              }),
              (0, G.jsx)(g, {
                children: be.map((e) =>
                  (0, G.jsx)(
                    _,
                    {
                      value: `${e.cle}:${e.asc ? `asc` : `desc`}`,
                      children: e.libelle,
                    },
                    e.libelle,
                  ),
                ),
              }),
            ],
          }),
          (0, G.jsxs)(s, {
            variant: `ghost`,
            onClick: () => {
              (C(``),
                T(`tous`),
                A(`tous`),
                M(`tous`),
                D(`toutes`),
                J(`dateEnvoi`),
                me(!1));
            },
            children: [(0, G.jsx)(te, {}), ` Réinitialiser`],
          }),
          (0, G.jsxs)(s, {
            variant: `secondary`,
            onClick: () => ve(!0),
            children: [(0, G.jsx)(i, {}), ` Analyser une offre (IA)`],
          }),
          (0, G.jsx)(s, {
            variant: `secondary`,
            disabled: !!U || !x,
            onClick: () => void Te(),
            children: U
              ? (0, G.jsxs)(G.Fragment, {
                  children: [
                    (0, G.jsx)(k, { className: `animate-spin` }),
                    ` Matchs IA `,
                    U.fait,
                    `/`,
                    U.total,
                  ],
                })
              : (0, G.jsxs)(G.Fragment, {
                  children: [(0, G.jsx)(ie, {}), ` Actualiser les matchs IA`],
                }),
          }),
          (0, G.jsxs)(s, {
            variant: `outline`,
            onClick: () => {
              let e = new Blob([`﻿` + re(r)], {
                  type: `text/csv;charset=utf-8;`,
                }),
                t = URL.createObjectURL(e),
                n = document.createElement(`a`);
              ((n.href = t),
                (n.download = `careerly-candidatures.csv`),
                n.click(),
                URL.revokeObjectURL(t));
            },
            children: [(0, G.jsx)(ee, {}), ` Export CSV`],
          }),
          (0, G.jsxs)(s, {
            onClick: () => {
              (X(P()), Z(!0));
            },
            children: [(0, G.jsx)(u, {}), ` Ajouter`],
          }),
        ],
      }),
      (0, G.jsxs)(`p`, {
        className: `mt-5 text-xs text-muted-foreground`,
        children: [$.length, ` candidature(s) affichée(s) sur `, r.length],
      }),
      (0, G.jsx)(`div`, {
        className: `mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3`,
        children: $.map((e, t) =>
          (0, G.jsx)(
            pe,
            {
              c: e,
              index: t,
              profil: x,
              analyse: V === e.id,
              onStatut: (t) => p(e.id, { statut: t }),
              onOuvrir: () => {
                (X(e), Z(!0));
              },
              onPostuler: () => Se(e),
              onRelancer: () => Ce(e),
              onAnalyser: () => void we(e),
              onSupprimer: () => y(e.id),
            },
            e.id,
          ),
        ),
      }),
      $.length === 0 &&
        (0, G.jsx)(`div`, {
          className: `glass-card mt-3 p-10 text-center text-sm text-muted-foreground`,
          children: `Aucune candidature ne correspond à votre recherche.`,
        }),
      (0, G.jsx)(`p`, {
        className: `mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground`,
        children: d
          ? (0, G.jsxs)(G.Fragment, {
              children: [
                (0, G.jsx)(k, { className: `size-3.5 animate-spin` }),
                ` Synchronisation en cours…`,
              ],
            })
          : t
            ? (0, G.jsxs)(G.Fragment, {
                children: [
                  `Vos candidatures sont synchronisées sur votre compte `,
                  t.email,
                  `.`,
                ],
              })
            : (0, G.jsxs)(G.Fragment, {
                children: [
                  (0, G.jsx)(fe, { className: `size-3.5` }),
                  ` Données enregistrées uniquement dans ce navigateur —`,
                  ` `,
                  (0, G.jsx)(o, {
                    to: `/auth`,
                    className: `text-primary hover:underline`,
                    children: `créez un compte`,
                  }),
                  ` `,
                  `pour y accéder partout.`,
                ],
              }),
      }),
      (0, G.jsx)(ue, {
        open: _e,
        onOpenChange: ve,
        onResult: (e) => {
          (X(e), Z(!0));
        },
      }),
      (0, G.jsx)(ce, {
        open: ge,
        onOpenChange: Z,
        value: he,
        profil: x,
        onSave: async (e) => {
          (await b(e), Z(!1));
        },
      }),
    ],
  });
}
export { q as component };

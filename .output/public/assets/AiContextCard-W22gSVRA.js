import { r as e, t } from "./jsx-runtime-BkSabwWG.js";
import { c as n } from "./useStore-D1ICS8_H.js";
import { a as r, r as i } from "./Logo-BzB7YJf1.js";
import { o as a, t as o } from "./button-Fem7RhN8.js";
import { o as s } from "./AppShell-Cmck22UZ.js";
import { t as c } from "./chevron-right-DRjUoTJ5.js";
import { Et as l, Mt as u, wt as d } from "./index-C957XaZb.js";
import { n as f, t as p } from "./profil-completion-DozoElTC.js";
import { t as m } from "./progress-MirSnR9X.js";
import { t as h } from "./useProfil-DaZvyt2K.js";
import { t as g } from "./useSession-B5bRSz86.js";
var _ = r(`brain-circuit`, [
    [
      `path`,
      {
        d: `M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z`,
        key: `l5xja`,
      },
    ],
    [`path`, { d: `M9 13a4.5 4.5 0 0 0 3-4`, key: `10igwf` }],
    [`path`, { d: `M6.003 5.125A3 3 0 0 0 6.401 6.5`, key: `105sqy` }],
    [`path`, { d: `M3.477 10.896a4 4 0 0 1 .585-.396`, key: `ql3yin` }],
    [`path`, { d: `M6 18a4 4 0 0 1-1.967-.516`, key: `2e4loj` }],
    [`path`, { d: `M12 13h4`, key: `1ku699` }],
    [`path`, { d: `M12 18h6a2 2 0 0 1 2 2v1`, key: `105ag5` }],
    [`path`, { d: `M12 8h8`, key: `1lhi5i` }],
    [`path`, { d: `M16 8V5a2 2 0 0 1 2-2`, key: `u6izg6` }],
    [`circle`, { cx: `16`, cy: `13`, r: `.5`, key: `ry7gng` }],
    [`circle`, { cx: `18`, cy: `3`, r: `.5`, key: `1aiba7` }],
    [`circle`, { cx: `20`, cy: `21`, r: `.5`, key: `yhc1fs` }],
    [`circle`, { cx: `20`, cy: `8`, r: `.5`, key: `1e43v0` }],
  ]),
  v = r(`file-check`, [
    [
      `path`,
      {
        d: `M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,
        key: `1oefj6`,
      },
    ],
    [`path`, { d: `M14 2v5a1 1 0 0 0 1 1h5`, key: `wfsgrz` }],
    [`path`, { d: `m9 15 2 2 4-4`, key: `1grp1n` }],
  ]),
  y = e(n(), 1),
  b = t();
function x({ onRefresh: e }) {
  let { user: t } = g(),
    n = h(t),
    r = (0, y.useMemo)(() => p(n), [n]).score,
    x = n.cvStructure,
    S = x?.experiences?.length ?? 0,
    C = x?.competences?.length ?? 0,
    w = !!(n.metiers?.trim() || n.contrats?.trim()),
    T = !!(n.nomFichierCv || n.cvOriginalUrl),
    E = ((e) =>
      e >= 80
        ? {
            label: `IA Précision Maximale`,
            color: `bg-emerald-500/15 text-emerald-300 border-emerald-500/30`,
            desc: `L'IA exploite l'ensemble de votre parcours, compétences et objectifs.`,
          }
        : e >= 50
          ? {
              label: `IA Précision Intermédiaire`,
              color: `bg-amber-500/15 text-amber-300 border-amber-500/30`,
              desc: `Complétez votre profil pour obtenir des simulations et arguments encore plus pointus.`,
            }
          : {
              label: `IA Mode Générique`,
              color: `bg-primary/15 text-primary border-primary/30`,
              desc: `Renseignez votre CV et vos expériences clés pour des réponses sur-mesure.`,
            })(r);
  return (0, b.jsxs)(`div`, {
    className: `relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-card/90 via-card/60 to-primary/5 p-5 shadow-lg backdrop-blur-xl`,
    children: [
      (0, b.jsx)(`div`, {
        className: `pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/10 blur-3xl`,
      }),
      (0, b.jsxs)(`div`, {
        className: `relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between`,
        children: [
          (0, b.jsx)(`div`, {
            className: `flex flex-col gap-3 sm:flex-row sm:items-center`,
            children: (0, b.jsxs)(`div`, {
              className: `flex items-center gap-3`,
              children: [
                (0, b.jsxs)(`div`, {
                  className: `relative grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30`,
                  children: [
                    (0, b.jsx)(_, { className: `size-6 animate-pulse` }),
                    (0, b.jsx)(`span`, {
                      className: `absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground`,
                      children: `AI`,
                    }),
                  ],
                }),
                (0, b.jsxs)(`div`, {
                  children: [
                    (0, b.jsxs)(`div`, {
                      className: `flex flex-wrap items-center gap-2`,
                      children: [
                        (0, b.jsx)(`h3`, {
                          className: `text-sm font-semibold tracking-tight text-foreground`,
                          children: `Contexte Profil Connecté`,
                        }),
                        (0, b.jsxs)(f, {
                          variant: `outline`,
                          className: `text-[11px] font-medium ${E.color}`,
                          children: [
                            (0, b.jsx)(i, { className: `mr-1 size-3` }),
                            E.label,
                          ],
                        }),
                      ],
                    }),
                    (0, b.jsx)(`p`, {
                      className: `mt-0.5 text-xs text-muted-foreground`,
                      children: E.desc,
                    }),
                  ],
                }),
              ],
            }),
          }),
          (0, b.jsxs)(`div`, {
            className: `flex flex-wrap items-center gap-3`,
            children: [
              (0, b.jsxs)(`div`, {
                className: `flex min-w-[140px] flex-col gap-1.5`,
                children: [
                  (0, b.jsxs)(`div`, {
                    className: `flex items-center justify-between text-xs`,
                    children: [
                      (0, b.jsx)(`span`, {
                        className: `font-medium text-muted-foreground`,
                        children: `Complétude`,
                      }),
                      (0, b.jsxs)(`span`, {
                        className: `font-bold text-foreground`,
                        children: [r, `%`],
                      }),
                    ],
                  }),
                  (0, b.jsx)(m, { value: r, className: `h-2 bg-muted/60` }),
                ],
              }),
              (0, b.jsxs)(`div`, {
                className: `flex items-center gap-2`,
                children: [
                  (0, b.jsx)(o, {
                    asChild: !0,
                    variant: `outline`,
                    size: `sm`,
                    className: `h-8 gap-1.5 rounded-xl border-border/80 text-xs font-medium hover:border-primary/50 hover:bg-primary/10`,
                    children: (0, b.jsxs)(a, {
                      to: `/profil`,
                      children: [
                        (0, b.jsx)(`span`, { children: `Gérer mon profil` }),
                        (0, b.jsx)(c, { className: `size-3.5` }),
                      ],
                    }),
                  }),
                  e &&
                    (0, b.jsx)(o, {
                      variant: `ghost`,
                      size: `sm`,
                      onClick: e,
                      className: `h-8 rounded-xl px-2.5 text-xs text-muted-foreground hover:text-foreground`,
                      title: `Actualiser le contexte IA`,
                      children: (0, b.jsx)(d, {
                        className: `size-3.5 text-primary`,
                      }),
                    }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, b.jsxs)(`div`, {
        className: `mt-4 grid grid-cols-2 gap-2 border-t border-border/40 pt-3 sm:grid-cols-4`,
        children: [
          (0, b.jsxs)(`div`, {
            className: `flex items-center gap-2 rounded-xl bg-background/40 px-2.5 py-1.5 text-xs`,
            children: [
              (0, b.jsx)(l, { className: `size-3.5 shrink-0 text-primary` }),
              (0, b.jsx)(`span`, {
                className: `truncate text-muted-foreground`,
                children:
                  n.prenom && n.nom
                    ? `${n.prenom} ${n.nom}`
                    : `Identité de base`,
              }),
            ],
          }),
          (0, b.jsxs)(`div`, {
            className: `flex items-center gap-2 rounded-xl bg-background/40 px-2.5 py-1.5 text-xs`,
            children: [
              (0, b.jsx)(v, { className: `size-3.5 shrink-0 text-primary` }),
              (0, b.jsx)(`span`, {
                className: `truncate text-muted-foreground`,
                children: T
                  ? n.nomFichierCv || `CV importé`
                  : x
                    ? `${S} exp • ${C} comp`
                    : `CV non importé`,
              }),
            ],
          }),
          (0, b.jsxs)(`div`, {
            className: `flex items-center gap-2 rounded-xl bg-background/40 px-2.5 py-1.5 text-xs`,
            children: [
              (0, b.jsx)(u, { className: `size-3.5 shrink-0 text-primary` }),
              (0, b.jsx)(`span`, {
                className: `truncate text-muted-foreground`,
                children: n.titre || x?.titre || `Titre / École`,
              }),
            ],
          }),
          (0, b.jsxs)(`div`, {
            className: `flex items-center gap-2 rounded-xl bg-background/40 px-2.5 py-1.5 text-xs`,
            children: [
              (0, b.jsx)(s, { className: `size-3.5 shrink-0 text-primary` }),
              (0, b.jsx)(`span`, {
                className: `truncate text-muted-foreground`,
                children: w
                  ? n.metiers || n.contrats || `Cible définie`
                  : `Objectif de poste`,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
export { v as n, x as t };

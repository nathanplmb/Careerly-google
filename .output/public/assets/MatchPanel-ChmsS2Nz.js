import { t as e } from "./jsx-runtime-BkSabwWG.js";
import { a as t, r as n } from "./Logo-BzB7YJf1.js";
import { n as r, o as i, t as a } from "./button-Fem7RhN8.js";
import { t as o } from "./triangle-alert-Eve6ocHQ.js";
import { At as s, Lt as c, kt as l } from "./index-C957XaZb.js";
import { t as u } from "./progress-MirSnR9X.js";
import { c as d, o as f } from "./match-run-DGcCutem.js";
var p = t(`info`, [
    [`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }],
    [`path`, { d: `M12 16v-4`, key: `1dtifu` }],
    [`path`, { d: `M12 8h.01`, key: `e9boi3` }],
  ]),
  m = e();
function h({ titre: e, items: t, icon: n, tone: i }) {
  return t?.length
    ? (0, m.jsxs)(`div`, {
        children: [
          (0, m.jsxs)(`h4`, {
            className: `flex items-center gap-2 text-sm font-medium`,
            children: [n, e],
          }),
          (0, m.jsx)(`ul`, {
            className: `mt-2 space-y-1.5`,
            children: t.map((e, t) =>
              (0, m.jsxs)(
                `li`,
                {
                  className: r(
                    `flex gap-2 text-sm text-muted-foreground`,
                    i === `positif` && `text-foreground`,
                  ),
                  children: [
                    (0, m.jsx)(`span`, {
                      className: `mt-1 size-1.5 shrink-0 rounded-full bg-primary/60`,
                    }),
                    (0, m.jsx)(`span`, { children: e }),
                  ],
                },
                t,
              ),
            ),
          }),
        ],
      })
    : null;
}
function g({ titre: e, items: t, variant: n }) {
  if (!t?.length) return null;
  let i =
    n === `ok`
      ? `border-primary/30 bg-primary/10 text-primary`
      : n === `warn`
        ? `border-destructive/30 bg-destructive/10 text-destructive`
        : `border-border bg-muted text-muted-foreground`;
  return (0, m.jsxs)(`div`, {
    children: [
      (0, m.jsx)(`p`, {
        className: `text-xs font-medium text-muted-foreground`,
        children: e,
      }),
      (0, m.jsx)(`div`, {
        className: `mt-1.5 flex flex-wrap gap-1.5`,
        children: t.map((e, t) =>
          (0, m.jsx)(
            `span`,
            {
              className: r(`rounded-full border px-2 py-0.5 text-xs`, i),
              children: e,
            },
            t,
          ),
        ),
      }),
    ],
  });
}
function _({
  match: e,
  obsolete: t,
  loading: _,
  erreur: v,
  profilPret: y,
  offrePrete: b,
  onAnalyser: x,
}) {
  let S = e ? d(e.global) : null;
  return (0, m.jsxs)(`section`, {
    className: `rounded-xl border bg-card p-4 sm:p-5`,
    children: [
      (0, m.jsxs)(`div`, {
        className: `flex flex-wrap items-center justify-between gap-3`,
        children: [
          (0, m.jsxs)(`h3`, {
            className: `flex items-center gap-2 text-sm font-semibold`,
            children: [
              (0, m.jsx)(n, { className: `size-4 text-primary` }),
              `Correspondance avec votre profil`,
            ],
          }),
          (0, m.jsx)(a, {
            size: `sm`,
            onClick: x,
            disabled: _ || !y || !b,
            variant: e ? `outline` : `default`,
            children: _
              ? (0, m.jsxs)(m.Fragment, {
                  children: [
                    (0, m.jsx)(s, { className: `size-4 animate-spin` }),
                    ` Analyse en cours…`,
                  ],
                })
              : e
                ? (0, m.jsxs)(m.Fragment, {
                    children: [
                      (0, m.jsx)(l, { className: `size-4` }),
                      ` Ré-analyser`,
                    ],
                  })
                : (0, m.jsxs)(m.Fragment, {
                    children: [
                      (0, m.jsx)(n, { className: `size-4` }),
                      ` Analyser avec l'IA`,
                    ],
                  }),
          }),
        ],
      }),
      !y &&
        (0, m.jsxs)(`p`, {
          className: `mt-3 flex items-start gap-2 rounded-lg border border-dashed p-3 text-sm text-muted-foreground`,
          children: [
            (0, m.jsx)(p, { className: `mt-0.5 size-4 shrink-0` }),
            (0, m.jsxs)(`span`, {
              children: [
                `Complétez d'abord votre`,
                ` `,
                (0, m.jsx)(i, {
                  to: `/profil`,
                  className: `text-primary hover:underline`,
                  children: `profil`,
                }),
                ` `,
                `(formation, compétences, expériences) pour obtenir une analyse fiable.`,
              ],
            }),
          ],
        }),
      y &&
        !b &&
        (0, m.jsxs)(`p`, {
          className: `mt-3 flex items-start gap-2 rounded-lg border border-dashed p-3 text-sm text-muted-foreground`,
          children: [
            (0, m.jsx)(p, { className: `mt-0.5 size-4 shrink-0` }),
            `Ajoutez le détail de l'offre (missions, profil recherché) pour lancer l'analyse.`,
          ],
        }),
      v &&
        (0, m.jsxs)(`p`, {
          className: `mt-3 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive`,
          children: [(0, m.jsx)(o, { className: `mt-0.5 size-4 shrink-0` }), v],
        }),
      _ &&
        !e &&
        (0, m.jsxs)(`div`, {
          className: `mt-4 space-y-3`,
          children: [
            (0, m.jsx)(`div`, {
              className: `h-6 w-40 animate-pulse rounded bg-muted`,
            }),
            (0, m.jsx)(`div`, {
              className: `h-2 w-full animate-pulse rounded bg-muted`,
            }),
            (0, m.jsx)(`div`, {
              className: `h-2 w-2/3 animate-pulse rounded bg-muted`,
            }),
          ],
        }),
      !e &&
        !_ &&
        y &&
        b &&
        !v &&
        (0, m.jsx)(`p`, {
          className: `mt-3 text-sm text-muted-foreground`,
          children: `Aucune analyse pour le moment. Lancez l'analyse pour savoir si cette offre correspond à votre profil.`,
        }),
      e &&
        S &&
        (0, m.jsxs)(`div`, {
          className: `mt-4 space-y-5`,
          children: [
            t &&
              (0, m.jsxs)(`p`, {
                className: `flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm text-primary`,
                children: [
                  (0, m.jsx)(o, { className: `size-4 shrink-0` }),
                  `Votre profil ou l'offre a été modifié depuis la dernière analyse.`,
                ],
              }),
            (0, m.jsxs)(`div`, {
              className: `flex flex-wrap items-end gap-4`,
              children: [
                (0, m.jsxs)(`div`, {
                  children: [
                    (0, m.jsxs)(`div`, {
                      className: `text-4xl font-semibold text-primary`,
                      children: [
                        e.global,
                        (0, m.jsx)(`span`, {
                          className: `text-lg text-muted-foreground`,
                          children: ` / 100`,
                        }),
                      ],
                    }),
                    (0, m.jsx)(`span`, {
                      className: r(
                        `mt-1 inline-flex rounded-full border px-2 py-0.5 text-xs font-medium`,
                        S.badge,
                      ),
                      children: S.label,
                    }),
                  ],
                }),
                (0, m.jsxs)(`div`, {
                  className: `text-xs text-muted-foreground`,
                  children: [
                    typeof e.confiance == `number` &&
                      (0, m.jsxs)(`p`, {
                        children: [
                          `Confiance de l'analyse : `,
                          e.confiance,
                          `%`,
                        ],
                      }),
                    e.confianceRaison &&
                      (0, m.jsx)(`p`, { children: e.confianceRaison }),
                    e.genereLe &&
                      (0, m.jsxs)(`p`, {
                        children: [
                          `Analysé le`,
                          ` `,
                          new Date(e.genereLe).toLocaleDateString(`fr-FR`, {
                            day: `2-digit`,
                            month: `2-digit`,
                            year: `numeric`,
                          }),
                        ],
                      }),
                  ],
                }),
              ],
            }),
            e.details?.length > 0 &&
              (0, m.jsx)(`div`, {
                className: `grid gap-3 sm:grid-cols-2`,
                children: e.details.map((e, t) =>
                  (0, m.jsxs)(
                    `div`,
                    {
                      children: [
                        (0, m.jsxs)(`div`, {
                          className: `flex items-baseline justify-between text-sm`,
                          children: [
                            (0, m.jsx)(`span`, {
                              className: `font-medium`,
                              children: e.critere,
                            }),
                            (0, m.jsxs)(`span`, {
                              className: `text-muted-foreground`,
                              children: [e.score, ` %`],
                            }),
                          ],
                        }),
                        (0, m.jsx)(u, {
                          value: e.score,
                          className: `mt-1.5 h-1.5`,
                        }),
                        e.explication &&
                          (0, m.jsx)(`p`, {
                            className: `mt-1 text-xs text-muted-foreground`,
                            children: e.explication,
                          }),
                      ],
                    },
                    t,
                  ),
                ),
              }),
            (0, m.jsx)(h, {
              titre: `Pourquoi cette offre vous correspond`,
              items: e.pointsForts,
              icon: (0, m.jsx)(c, { className: `size-4 text-primary` }),
              tone: `positif`,
            }),
            (0, m.jsx)(h, {
              titre: `Points de vigilance`,
              items: e.vigilance,
              icon: (0, m.jsx)(o, { className: `size-4 text-destructive` }),
              tone: `vigilance`,
            }),
            (e.competences?.correspondances?.length ||
              e.competences?.aRenforcer?.length ||
              e.competences?.nonRenseignees?.length ||
              e.competencesManquantes?.length) &&
              (0, m.jsxs)(`div`, {
                className: `space-y-3`,
                children: [
                  (0, m.jsx)(`h4`, {
                    className: `text-sm font-medium`,
                    children: `Compétences à renforcer`,
                  }),
                  (0, m.jsx)(g, {
                    titre: `Correspondances`,
                    items: e.competences?.correspondances ?? [],
                    variant: `ok`,
                  }),
                  (0, m.jsx)(g, {
                    titre: `À renforcer`,
                    items: e.competences?.aRenforcer ?? [],
                    variant: `muted`,
                  }),
                  (0, m.jsx)(g, {
                    titre: `Non renseignées dans votre profil`,
                    items:
                      e.competences?.nonRenseignees ??
                      e.competencesManquantes ??
                      [],
                    variant: `warn`,
                  }),
                ],
              }),
            (0, m.jsxs)(`div`, {
              className: `rounded-lg border bg-muted/40 p-3`,
              children: [
                (0, m.jsxs)(`p`, {
                  className: `text-sm font-medium`,
                  children: [`Recommandation : `, f(e.recommandation)],
                }),
                e.explication &&
                  (0, m.jsx)(`p`, {
                    className: `mt-1 text-sm text-muted-foreground`,
                    children: e.explication,
                  }),
              ],
            }),
            (0, m.jsx)(`p`, {
              className: `text-xs text-muted-foreground`,
              children: `Le score repose sur la correspondance entre votre profil (formation, compétences, expériences, préférences) et les critères identifiés dans l'offre. C'est une aide à la décision, pas une prédiction de recrutement.`,
            }),
          ],
        }),
    ],
  });
}
export { _ as t };

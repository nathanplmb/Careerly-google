import { r as e, t } from "./jsx-runtime-BkSabwWG.js";
import { c as n } from "./useStore-D1ICS8_H.js";
import { r, s as i } from "./Logo-BzB7YJf1.js";
import { o as a, t as o } from "./button-Fem7RhN8.js";
import { t as s } from "./AppShell-Cmck22UZ.js";
import { t as c } from "./AiContextCard-W22gSVRA.js";
import { t as l } from "./chevron-right-DRjUoTJ5.js";
import { t as u } from "./MatchPanel-ChmsS2Nz.js";
import { At as d, kt as f, zt as p } from "./index-C957XaZb.js";
import { t as m } from "./useProfil-DaZvyt2K.js";
import { t as h } from "./useCandidatures-kGyisxTi.js";
import {
  c as g,
  l as _,
  n as v,
  s as y,
  t as b,
} from "./match-run-DGcCutem.js";
import { t as x } from "./MatchBadge-BBZjHc57.js";
var S = e(n()),
  C = t();
function w() {
  let { user: e, authLoading: t, items: n, patch: w } = h(),
    T = m(e),
    [E, D] = (0, S.useState)(null),
    [O, k] = (0, S.useState)(null),
    [A, j] = (0, S.useState)(null),
    [M, N] = (0, S.useState)(null),
    P = (0, S.useMemo)(
      () =>
        [...n].sort(
          (e, t) => (t.match?.global ?? -1) - (e.match?.global ?? -1),
        ),
      [n],
    ),
    F = P.find((e) => e.id === E) ?? P[0] ?? null,
    I = (0, S.useMemo)(() => {
      let e = n.map((e) => e.match?.global).filter((e) => !!e);
      return e.length ? Math.round(e.reduce((e, t) => e + t, 0) / e.length) : 0;
    }, [n]),
    L = async (e) => {
      if (!T) {
        j(`Complétez d'abord votre profil.`);
        return;
      }
      if (!v(e)) {
        j(`Ajoutez le détail de l'offre avant de lancer l'analyse.`);
        return;
      }
      (j(null), k(e.id));
      try {
        let t = await b(e, T);
        w(e.id, { match: t });
      } catch (e) {
        j(_(e));
      } finally {
        k(null);
      }
    },
    R = async () => {
      if (!T || M) return;
      let e = n.filter((e) => v(e) && (!e.match || y(e, T)));
      if (!e.length) {
        i.info(`Tous les matchs IA sont à jour.`);
        return;
      }
      N({ fait: 0, total: e.length });
      let t = 0,
        r = ``;
      for (let [n, i] of e.entries()) {
        try {
          let e = await b(i, T);
          w(i.id, { match: e });
        } catch (e) {
          if (
            ((t += 1),
            (r = _(e)),
            /crédit|quota|limite|connectez-vous|indisponible|désactiv/i.test(r))
          )
            break;
        }
        N({ fait: n + 1, total: e.length });
      }
      (N(null),
        t
          ? i.warning(r || `${t} analyse(s) en échec.`)
          : i.success(`Matchs IA à jour.`));
    };
  return (0, C.jsx)(s, {
    eyebrow: `NACORA AI Hub`,
    title: `Match IA & Compatibilité`,
    subtitle: `Score moyen de ${I}% sur ${n.length} opportunité(s)`,
    headerExtra: (0, C.jsx)(o, {
      asChild: !0,
      variant: `outline`,
      size: `sm`,
      className: `h-8 gap-1.5 rounded-xl border-border/70 text-xs text-muted-foreground hover:text-foreground`,
      children: (0, C.jsxs)(a, {
        to: `/assistant`,
        children: [
          (0, C.jsx)(p, { className: `size-3.5` }),
          (0, C.jsx)(`span`, { children: `Retour AI Hub` }),
        ],
      }),
    }),
    actions: t
      ? (0, C.jsx)(d, { className: `size-5 animate-spin opacity-70` })
      : null,
    children: (0, C.jsxs)(`div`, {
      className: `space-y-6`,
      children: [
        (0, C.jsx)(c, {}),
        (0, C.jsxs)(`div`, {
          className: `flex flex-wrap items-center justify-between gap-3`,
          children: [
            (0, C.jsx)(o, {
              variant: `secondary`,
              disabled: !!M || !T,
              onClick: () => void R(),
              className: `h-9 gap-2 rounded-xl text-xs font-semibold shadow-sm`,
              children: M
                ? (0, C.jsxs)(C.Fragment, {
                    children: [
                      (0, C.jsx)(d, { className: `size-3.5 animate-spin` }),
                      (0, C.jsxs)(`span`, {
                        children: [`Actualisation `, M.fait, `/`, M.total],
                      }),
                    ],
                  })
                : (0, C.jsxs)(C.Fragment, {
                    children: [
                      (0, C.jsx)(f, { className: `size-3.5` }),
                      (0, C.jsxs)(`span`, {
                        children: [
                          `Actualiser tous les matchs (`,
                          n.length,
                          `)`,
                        ],
                      }),
                    ],
                  }),
            }),
            (0, C.jsx)(o, {
              asChild: !0,
              variant: `ghost`,
              size: `sm`,
              className: `h-8 gap-1.5 text-xs text-primary hover:text-primary/80`,
              children: (0, C.jsxs)(a, {
                to: `/assistant`,
                children: [
                  (0, C.jsx)(`span`, {
                    children: `Lancer le Workflow complet`,
                  }),
                  (0, C.jsx)(l, { className: `size-3.5` }),
                ],
              }),
            }),
          ],
        }),
        (0, C.jsxs)(`div`, {
          className: `grid gap-4 [&>*]:min-w-0 lg:grid-cols-[1fr_1.1fr]`,
          children: [
            (0, C.jsxs)(`section`, {
              className: `glass-card pop-in p-4`,
              children: [
                (0, C.jsxs)(`h2`, {
                  className: `mb-3 px-1 text-sm font-semibold`,
                  children: [`Classement des offres (`, P.length, `)`],
                }),
                P.length === 0 &&
                  (0, C.jsx)(`p`, {
                    className: `py-8 text-center text-sm text-muted-foreground`,
                    children: `Aucune opportunité à analyser. Ajoutez des candidatures depuis l'onglet Candidatures ou l'AI Hub.`,
                  }),
                (0, C.jsx)(`ul`, {
                  className: `flex flex-col gap-1.5`,
                  children: P.map((e, t) => {
                    let n = e.match?.global,
                      i = typeof n == `number` ? g(n) : null;
                    return (0, C.jsx)(
                      `li`,
                      {
                        children: (0, C.jsxs)(`button`, {
                          type: `button`,
                          onClick: () => D(e.id),
                          className: `flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition-colors ${F?.id === e.id ? `border-primary/50 bg-primary/10` : `border-border/60 bg-card/50 hover:bg-accent/40`}`,
                          children: [
                            (0, C.jsx)(`span`, {
                              className: `w-5 shrink-0 text-xs text-muted-foreground font-semibold`,
                              children: t + 1,
                            }),
                            (0, C.jsxs)(`span`, {
                              className: `min-w-0 flex-1`,
                              children: [
                                (0, C.jsx)(`span`, {
                                  className: `block truncate text-[13.5px] font-medium`,
                                  children: e.entreprise || `Sans entreprise`,
                                }),
                                (0, C.jsx)(`span`, {
                                  className: `block truncate text-xs text-muted-foreground`,
                                  children: e.poste,
                                }),
                              ],
                            }),
                            O === e.id
                              ? (0, C.jsx)(d, {
                                  className: `size-4 shrink-0 animate-spin text-primary`,
                                })
                              : e.match
                                ? (0, C.jsx)(x, {
                                    match: e.match,
                                    obsolete: y(e, T),
                                  })
                                : (0, C.jsxs)(`span`, {
                                    className: `inline-flex shrink-0 items-center gap-1 text-[11px] text-muted-foreground`,
                                    children: [
                                      (0, C.jsx)(r, { className: `size-3.5` }),
                                      ` non analysé`,
                                    ],
                                  }),
                            i &&
                              (0, C.jsx)(`span`, {
                                className: `sr-only`,
                                children: i.label,
                              }),
                          ],
                        }),
                      },
                      e.id,
                    );
                  }),
                }),
              ],
            }),
            (0, C.jsx)(`section`, {
              className: `pop-in`,
              children: F
                ? (0, C.jsx)(u, {
                    match: F.match,
                    obsolete: y(F, T),
                    loading: O === F.id,
                    erreur: A,
                    profilPret: !!T,
                    offrePrete: v(F),
                    onAnalyser: () => void L(F),
                    candidature: F,
                  })
                : (0, C.jsx)(`p`, {
                    className: `glass-card p-8 text-center text-sm text-muted-foreground`,
                    children: `Sélectionnez une offre pour voir l'analyse détaillée.`,
                  }),
            }),
          ],
        }),
      ],
    }),
  });
}
export { w as component };

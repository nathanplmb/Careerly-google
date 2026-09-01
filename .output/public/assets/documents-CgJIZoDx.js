import { r as e, t } from "./jsx-runtime-BkSabwWG.js";
import { c as n } from "./useStore-D1ICS8_H.js";
import { r, s as i } from "./Logo-BzB7YJf1.js";
import { o as a, t as o } from "./button-Fem7RhN8.js";
import { f as s, t as c } from "./AppShell-Cmck22UZ.js";
import { a as l, i as u, n as d, r as f, t as p } from "./select-DhJ8LJYr.js";
import { At as m, Dt as h, It as g, S as _ } from "./index-C957XaZb.js";
import { t as v } from "./useProfil-DaZvyt2K.js";
import { t as y } from "./useCandidatures-kGyisxTi.js";
import { i as b, l as x, r as S } from "./match-run-DGcCutem.js";
import { n as C } from "./redaction.functions-CksB_VeB.js";
var w = e(n()),
  T = t(),
  E = `careerly.lettres`;
function D() {
  if (typeof window > `u`) return [];
  try {
    let e = localStorage.getItem(E);
    return e ? JSON.parse(e) : [];
  } catch {
    return [];
  }
}
function O() {
  let { user: e, authLoading: t, items: n } = y(),
    O = v(e),
    [k, A] = (0, w.useState)([]),
    [j, M] = (0, w.useState)(`aucune`),
    [N, P] = (0, w.useState)(``),
    [F, I] = (0, w.useState)(!1),
    [L, R] = (0, w.useState)(null);
  (0, w.useEffect)(() => A(D()), []);
  let z = (e) => {
      A(e);
      try {
        localStorage.setItem(E, JSON.stringify(e));
      } catch {}
    },
    B = async () => {
      if (!O) {
        i.error(`Complétez d'abord votre profil.`);
        return;
      }
      let e = n.find((e) => e.id === j) ?? null;
      I(!0);
      try {
        let t = await C({
            data: { profil: b(O), offre: e ? S(e) : ``, consigne: N },
          }),
          n = {
            id: crypto.randomUUID(),
            titre: e ? `${e.entreprise} — ${e.poste}` : `Lettre générique`,
            objet: (t.objet ?? ``).trim(),
            contenu: (t.lettre ?? ``).trim(),
            conseils: t.conseils ?? [],
            creeLe: new Date().toISOString(),
          };
        (z([n, ...k]), R(n.id), i.success(`Lettre générée.`));
      } catch (e) {
        i.error(x(e));
      } finally {
        I(!1);
      }
    };
  return (0, T.jsx)(c, {
    eyebrow: `AI Studio`,
    title: `Documents`,
    subtitle: `${k.length} lettre(s) de motivation enregistrée(s)`,
    actions: t
      ? (0, T.jsx)(m, { className: `size-5 animate-spin opacity-70` })
      : null,
    children: (0, T.jsxs)(`div`, {
      className: `grid gap-4 lg:grid-cols-[1fr_1.2fr]`,
      children: [
        (0, T.jsxs)(`section`, {
          className: `glass-card pop-in flex h-fit flex-col gap-4 p-5`,
          children: [
            (0, T.jsx)(`h2`, {
              className: `text-sm font-semibold`,
              children: `Nouvelle lettre de motivation`,
            }),
            (0, T.jsxs)(`div`, {
              children: [
                (0, T.jsx)(`label`, {
                  className: `mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground`,
                  children: `Offre visée`,
                }),
                (0, T.jsxs)(p, {
                  value: j,
                  onValueChange: M,
                  children: [
                    (0, T.jsx)(u, {
                      children: (0, T.jsx)(l, {
                        placeholder: `Choisir une offre`,
                      }),
                    }),
                    (0, T.jsxs)(d, {
                      children: [
                        (0, T.jsx)(f, {
                          value: `aucune`,
                          children: `Lettre générique`,
                        }),
                        n.map((e) =>
                          (0, T.jsxs)(
                            f,
                            {
                              value: e.id,
                              children: [e.entreprise, ` — `, e.poste],
                            },
                            e.id,
                          ),
                        ),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, T.jsxs)(`div`, {
              children: [
                (0, T.jsx)(`label`, {
                  className: `mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground`,
                  children: `Consigne complémentaire`,
                }),
                (0, T.jsx)(_, {
                  value: N,
                  onChange: (e) => P(e.target.value),
                  rows: 5,
                  placeholder: `Ex : insister sur mon projet professionnel et ma disponibilité.`,
                }),
              ],
            }),
            (0, T.jsx)(o, {
              onClick: () => void B(),
              disabled: F || !O,
              children: F
                ? (0, T.jsxs)(T.Fragment, {
                    children: [
                      (0, T.jsx)(m, { className: `animate-spin` }),
                      ` Rédaction…`,
                    ],
                  })
                : (0, T.jsxs)(T.Fragment, {
                    children: [(0, T.jsx)(r, {}), ` Générer la lettre`],
                  }),
            }),
            !O &&
              (0, T.jsxs)(`p`, {
                className: `text-xs text-muted-foreground`,
                children: [
                  `Renseignez d'abord`,
                  ` `,
                  (0, T.jsx)(a, {
                    to: `/profil`,
                    className: `text-primary hover:underline`,
                    children: `votre profil`,
                  }),
                  ` `,
                  `(ou importez votre CV) pour une lettre pertinente.`,
                ],
              }),
          ],
        }),
        (0, T.jsxs)(`section`, {
          className: `flex flex-col gap-3`,
          children: [
            k.length === 0 &&
              (0, T.jsxs)(`p`, {
                className: `glass-card p-8 text-center text-sm text-muted-foreground`,
                children: [
                  (0, T.jsx)(s, {
                    className: `mx-auto mb-3 size-6 text-primary`,
                  }),
                  `Aucune lettre pour l'instant.`,
                ],
              }),
            k.map((e) =>
              (0, T.jsxs)(
                `article`,
                {
                  className: `glass-card pop-in p-4`,
                  children: [
                    (0, T.jsxs)(`div`, {
                      className: `flex items-start justify-between gap-3`,
                      children: [
                        (0, T.jsxs)(`button`, {
                          type: `button`,
                          className: `min-w-0 flex-1 text-left`,
                          onClick: () => R(L === e.id ? null : e.id),
                          children: [
                            (0, T.jsx)(`h3`, {
                              className: `truncate text-[14px] font-semibold`,
                              children: e.titre,
                            }),
                            (0, T.jsx)(`p`, {
                              className: `truncate text-xs text-muted-foreground`,
                              children:
                                e.objet ||
                                new Date(e.creeLe).toLocaleDateString(`fr-FR`),
                            }),
                          ],
                        }),
                        (0, T.jsxs)(`div`, {
                          className: `flex shrink-0 gap-1`,
                          children: [
                            (0, T.jsx)(o, {
                              variant: `ghost`,
                              size: `icon`,
                              onClick: () => {
                                (navigator.clipboard.writeText(e.contenu),
                                  i.success(`Lettre copiée.`));
                              },
                              children: (0, T.jsx)(g, { className: `size-4` }),
                            }),
                            (0, T.jsx)(o, {
                              variant: `ghost`,
                              size: `icon`,
                              onClick: () => z(k.filter((t) => t.id !== e.id)),
                              children: (0, T.jsx)(h, {
                                className: `size-4 text-destructive`,
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    L === e.id &&
                      (0, T.jsxs)(`div`, {
                        className: `mt-3 border-t border-border/60 pt-3`,
                        children: [
                          (0, T.jsx)(`p`, {
                            className: `whitespace-pre-wrap text-[13.5px] leading-relaxed text-muted-foreground`,
                            children: e.contenu,
                          }),
                          e.conseils.length > 0 &&
                            (0, T.jsx)(`ul`, {
                              className: `mt-3 list-disc pl-5 text-xs text-muted-foreground`,
                              children: e.conseils.map((e, t) =>
                                (0, T.jsx)(`li`, { children: e }, t),
                              ),
                            }),
                        ],
                      }),
                  ],
                },
                e.id,
              ),
            ),
          ],
        }),
      ],
    }),
  });
}
export { O as component };

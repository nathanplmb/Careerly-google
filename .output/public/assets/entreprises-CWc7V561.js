import { r as e, t } from "./jsx-runtime-BkSabwWG.js";
import { c as n } from "./useStore-D1ICS8_H.js";
import { i as r } from "./Logo-BzB7YJf1.js";
import { o as i } from "./button-Fem7RhN8.js";
import { c as a, d as o, h as s, r as c, t as l } from "./AppShell-Cmck22UZ.js";
import { t as u } from "./briefcase--ZdJUC-4.js";
import { t as d } from "./chevron-right-DRjUoTJ5.js";
import { t as f } from "./phone-DcfUvp2v.js";
import { At as p, E as m, V as h, q as g } from "./index-C957XaZb.js";
import { t as _ } from "./useProfil-DaZvyt2K.js";
import { t as v } from "./useCandidatures-kGyisxTi.js";
import { t as y } from "./CandidatureSheet-uNs02hvY.js";
import { t as b } from "./modal-BkVEOnww.js";
import { t as x } from "./MatchBadge-BBZjHc57.js";
import { t as S } from "./StatutBadge-DqpCZIH-.js";
import { n as C } from "./contacts-cloud-BVygSWtV.js";
var w = e(n()),
  T = t();
function E() {
  let { user: e, authLoading: t, items: n, save: E } = v(),
    D = _(e),
    [O, k] = (0, w.useState)(() => h()),
    [A, j] = (0, w.useState)(``),
    [M, N] = (0, w.useState)(null),
    [P, F] = (0, w.useState)(!1),
    [I, L] = (0, w.useState)(null);
  (0, w.useEffect)(() => {
    if (!e?.id) {
      k(h());
      return;
    }
    C()
      .then(k)
      .catch(() => k(h()));
  }, [e?.id]);
  let R = (0, w.useMemo)(() => {
    let e = new Map(),
      t = (e) => e.trim().toLowerCase() || `sans-nom`;
    for (let r of n) {
      let n = t(r.entreprise);
      (e.has(n) ||
        e.set(n, {
          nom: r.entreprise || `Entreprise non renseignée`,
          candidatures: [],
          contacts: [],
        }),
        e.get(n).candidatures.push(r));
    }
    for (let n of O) {
      let r = t(n.entreprise);
      (e.has(r) ||
        e.set(r, {
          nom: n.entreprise || `Entreprise non renseignée`,
          candidatures: [],
          contacts: [],
        }),
        e.get(r).contacts.push(n));
    }
    let r = A.trim().toLowerCase();
    return [...e.values()]
      .filter((e) => !r || e.nom.toLowerCase().includes(r))
      .sort((e, t) => e.nom.localeCompare(t.nom, `fr`));
  }, [n, O, A]);
  return (0, T.jsxs)(l, {
    eyebrow: `Suivi`,
    title: `Entreprises`,
    subtitle: `${R.length} entreprise(s) suivie(s)`,
    actions: t
      ? (0, T.jsx)(p, { className: `size-5 animate-spin opacity-70` })
      : null,
    children: [
      (0, T.jsxs)(`div`, {
        className: `relative mb-5 max-w-md`,
        children: [
          (0, T.jsx)(a, {
            className: `absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground`,
          }),
          (0, T.jsx)(m, {
            value: A,
            onChange: (e) => j(e.target.value),
            placeholder: `Rechercher une entreprise…`,
            className: `pl-9`,
          }),
        ],
      }),
      R.length === 0 &&
        (0, T.jsxs)(`p`, {
          className: `glass-card p-8 text-center text-sm text-muted-foreground`,
          children: [
            `Aucune entreprise pour l'instant. Ajoutez une opportunité depuis`,
            ` `,
            (0, T.jsx)(i, {
              to: `/candidatures`,
              className: `text-primary hover:underline`,
              children: `vos candidatures`,
            }),
            `.`,
          ],
        }),
      (0, T.jsx)(`div`, {
        className: `grid gap-4 md:grid-cols-2 xl:grid-cols-3`,
        children: R.map((e, t) => {
          let n = e.candidatures
              .map((e) => e.match?.global ?? -1)
              .reduce((e, t) => Math.max(e, t), -1),
            r =
              e.candidatures.find((e) => (e.match?.global ?? -1) === n)
                ?.match ?? null,
            i = e.candidatures.reduce(
              (e, t) => (g.indexOf(t.statut) > g.indexOf(e) ? t.statut : e),
              e.candidatures[0]?.statut ?? `Je vais postuler`,
            );
          return (0, T.jsxs)(
            `button`,
            {
              type: `button`,
              onClick: () => L(e),
              className: `glass-card pop-in flex min-w-0 flex-col gap-3 p-5 text-left transition hover:border-primary/40 hover:shadow-[0_20px_60px_-30px_rgba(124,92,255,0.7)]`,
              style: { animationDelay: `${Math.min(t, 10) * 45}ms` },
              children: [
                (0, T.jsxs)(`header`, {
                  className: `flex items-start gap-3`,
                  children: [
                    (0, T.jsx)(`span`, {
                      className: `grid size-10 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary`,
                      children: (0, T.jsx)(s, { className: `size-5` }),
                    }),
                    (0, T.jsxs)(`div`, {
                      className: `min-w-0`,
                      children: [
                        (0, T.jsx)(`h2`, {
                          className: `truncate text-[15px] font-semibold`,
                          children: e.nom,
                        }),
                        (0, T.jsxs)(`p`, {
                          className: `text-xs text-muted-foreground`,
                          children: [
                            e.candidatures.length,
                            ` candidature(s) · `,
                            e.contacts.length,
                            ` `,
                            `contact(s)`,
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, T.jsxs)(`div`, {
                  className: `flex flex-wrap items-center gap-2`,
                  children: [
                    e.candidatures.length > 0 && (0, T.jsx)(S, { statut: i }),
                    r && (0, T.jsx)(x, { match: r }),
                  ],
                }),
                (0, T.jsxs)(`p`, {
                  className: `mt-auto inline-flex items-center gap-1.5 text-xs font-medium text-primary`,
                  children: [
                    `Ouvrir la fiche entreprise `,
                    (0, T.jsx)(d, { className: `size-3.5` }),
                  ],
                }),
              ],
            },
            e.nom + t,
          );
        }),
      }),
      (0, T.jsx)(b, {
        open: !!I,
        onOpenChange: (e) => !e && L(null),
        size: `xl`,
        title: I?.nom ?? ``,
        description: I
          ? `${I.candidatures.length} candidature(s) · ${I.contacts.length} contact(s)`
          : void 0,
        children:
          I &&
          (0, T.jsxs)(`div`, {
            className: `grid gap-5`,
            children: [
              (0, T.jsxs)(`section`, {
                children: [
                  (0, T.jsxs)(`h3`, {
                    className: `mb-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground`,
                    children: [
                      (0, T.jsx)(u, { className: `size-3.5` }),
                      ` Candidatures`,
                    ],
                  }),
                  I.candidatures.length === 0 &&
                    (0, T.jsx)(`p`, {
                      className: `text-sm text-muted-foreground`,
                      children: `Aucune candidature pour cette entreprise.`,
                    }),
                  (0, T.jsx)(`ul`, {
                    className: `grid gap-2`,
                    children: I.candidatures.map((e) =>
                      (0, T.jsx)(
                        `li`,
                        {
                          children: (0, T.jsxs)(`button`, {
                            type: `button`,
                            onClick: () => {
                              (N(e), F(!0), L(null));
                            },
                            className: `flex w-full flex-wrap items-center justify-between gap-2 rounded-2xl border border-border/60 bg-card/40 px-3.5 py-3 text-left transition hover:border-primary/40`,
                            children: [
                              (0, T.jsxs)(`span`, {
                                className: `min-w-0`,
                                children: [
                                  (0, T.jsx)(`span`, {
                                    className: `block truncate text-sm font-medium`,
                                    children: e.poste || `Poste non renseigné`,
                                  }),
                                  e.lieu &&
                                    (0, T.jsx)(`span`, {
                                      className: `block text-xs text-muted-foreground`,
                                      children: e.lieu,
                                    }),
                                ],
                              }),
                              (0, T.jsxs)(`span`, {
                                className: `flex items-center gap-2`,
                                children: [
                                  (0, T.jsx)(S, { statut: e.statut }),
                                  e.match && (0, T.jsx)(x, { match: e.match }),
                                ],
                              }),
                            ],
                          }),
                        },
                        e.id,
                      ),
                    ),
                  }),
                ],
              }),
              (0, T.jsxs)(`section`, {
                children: [
                  (0, T.jsxs)(`div`, {
                    className: `mb-2 flex items-center justify-between gap-3`,
                    children: [
                      (0, T.jsxs)(`h3`, {
                        className: `inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground`,
                        children: [
                          (0, T.jsx)(c, { className: `size-3.5` }),
                          ` Contacts`,
                        ],
                      }),
                      (0, T.jsx)(i, {
                        to: `/contacts`,
                        className: `text-xs font-medium text-primary hover:underline`,
                        children: `Gérer les contacts`,
                      }),
                    ],
                  }),
                  I.contacts.length === 0 &&
                    (0, T.jsx)(`p`, {
                      className: `text-sm text-muted-foreground`,
                      children: `Aucun contact enregistré pour cette entreprise.`,
                    }),
                  (0, T.jsx)(`ul`, {
                    className: `grid gap-2 sm:grid-cols-2`,
                    children: I.contacts.map((e) =>
                      (0, T.jsxs)(
                        `li`,
                        {
                          className: `rounded-2xl border border-border/60 bg-card/40 p-3.5`,
                          children: [
                            (0, T.jsx)(`p`, {
                              className: `truncate text-sm font-medium`,
                              children: e.nom,
                            }),
                            (0, T.jsx)(`p`, {
                              className: `truncate text-xs text-muted-foreground`,
                              children: [e.poste, e.type]
                                .filter(Boolean)
                                .join(` · `),
                            }),
                            (0, T.jsxs)(`div`, {
                              className: `mt-2 flex flex-wrap gap-3 text-xs`,
                              children: [
                                e.email &&
                                  (0, T.jsxs)(`a`, {
                                    href: `mailto:${e.email}`,
                                    className: `inline-flex items-center gap-1 text-primary hover:underline`,
                                    children: [
                                      (0, T.jsx)(r, { className: `size-3.5` }),
                                      ` Écrire`,
                                    ],
                                  }),
                                e.telephone &&
                                  (0, T.jsxs)(`a`, {
                                    href: `tel:${e.telephone}`,
                                    className: `inline-flex items-center gap-1 text-primary hover:underline`,
                                    children: [
                                      (0, T.jsx)(f, { className: `size-3.5` }),
                                      ` Appeler`,
                                    ],
                                  }),
                                e.linkedin &&
                                  (0, T.jsxs)(`a`, {
                                    href: e.linkedin.startsWith(`http`)
                                      ? e.linkedin
                                      : `https://${e.linkedin}`,
                                    target: `_blank`,
                                    rel: `noreferrer`,
                                    className: `inline-flex items-center gap-1 text-primary hover:underline`,
                                    children: [
                                      (0, T.jsx)(o, { className: `size-3.5` }),
                                      ` LinkedIn`,
                                    ],
                                  }),
                              ],
                            }),
                          ],
                        },
                        e.id,
                      ),
                    ),
                  }),
                ],
              }),
            ],
          }),
      }),
      (0, T.jsx)(y, {
        open: P,
        onOpenChange: F,
        value: M,
        profil: D,
        onSave: async (e) => {
          (await E(e), F(!1));
        },
      }),
    ],
  });
}
export { E as component };

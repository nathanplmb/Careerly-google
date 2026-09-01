import { r as e, t } from "./jsx-runtime-BkSabwWG.js";
import { c as n } from "./useStore-D1ICS8_H.js";
import { n as r, t as i } from "./button-Fem7RhN8.js";
import { t as a } from "./AppShell-Cmck22UZ.js";
import { t as o } from "./calendar-clock-CoDi51GC.js";
import { t as s } from "./chevron-left-BhPYXx2p.js";
import { t as c } from "./chevron-right-DRjUoTJ5.js";
import { $ as l, At as u, at as d } from "./index-C957XaZb.js";
import { t as f } from "./useProfil-DaZvyt2K.js";
import { t as p } from "./useCandidatures-kGyisxTi.js";
import { t as m } from "./CandidatureSheet-uNs02hvY.js";
var h = e(n()),
  g = t(),
  _ = {
    "Date limite": `bg-destructive/15 text-destructive border-destructive/30`,
    Relance: `bg-warning/15 text-warning border-warning/30`,
    Entretien: `bg-success/15 text-success border-success/30`,
    Envoi: `bg-primary/15 text-primary border-primary/30`,
  },
  v = [`L`, `M`, `M`, `J`, `V`, `S`, `D`];
function y(e, t) {
  return new Date(e, t, 1).toLocaleDateString(`fr-FR`, {
    month: `long`,
    year: `numeric`,
  });
}
function b(e, t, n) {
  return `${e}-${String(t + 1).padStart(2, `0`)}-${String(n).padStart(2, `0`)}`;
}
function x() {
  let { user: e, authLoading: t, items: n, save: x } = p(),
    S = f(e),
    C = d(),
    w = new Date(),
    [T, E] = (0, h.useState)(w.getFullYear()),
    [D, O] = (0, h.useState)(w.getMonth()),
    [k, A] = (0, h.useState)(null),
    [j, M] = (0, h.useState)(!1),
    N = (0, h.useMemo)(() => {
      let e = [];
      for (let t of n)
        (t.dateLimite &&
          t.statut === `Je vais postuler` &&
          e.push({ date: t.dateLimite, type: `Date limite`, candidature: t }),
          t.dateRelance &&
            (t.statut === `J'ai postulé` || t.statut === `J'ai relancé`) &&
            e.push({ date: t.dateRelance, type: `Relance`, candidature: t }),
          t.statut === `J'ai un entretien` &&
            t.dateDernierContact &&
            e.push({
              date: t.dateDernierContact,
              type: `Entretien`,
              candidature: t,
            }),
          t.dateEnvoi &&
            e.push({ date: t.dateEnvoi, type: `Envoi`, candidature: t }));
      return e.sort((e, t) => e.date.localeCompare(t.date));
    }, [n]),
    P = (0, h.useMemo)(() => {
      let e = new Map();
      for (let t of N)
        (e.has(t.date) || e.set(t.date, []), e.get(t.date).push(t));
      return e;
    }, [N]),
    F = (0, h.useMemo)(
      () => N.filter((e) => e.date >= C && e.type !== `Envoi`).slice(0, 12),
      [N, C],
    ),
    I = (new Date(T, D, 1).getDay() + 6) % 7,
    L = new Date(T, D + 1, 0).getDate(),
    R = [
      ...Array.from({ length: I }, () => null),
      ...Array.from({ length: L }, (e, t) => t + 1),
    ],
    z = (e) => {
      let t = new Date(T, D + e, 1);
      (E(t.getFullYear()), O(t.getMonth()));
    };
  return (0, g.jsxs)(a, {
    eyebrow: `Planning`,
    title: `Calendrier`,
    subtitle: `Deadlines, relances et entretiens`,
    actions: t
      ? (0, g.jsx)(u, { className: `size-5 animate-spin opacity-70` })
      : null,
    children: [
      (0, g.jsxs)(`div`, {
        className: `grid gap-4 lg:grid-cols-[1.4fr_1fr]`,
        children: [
          (0, g.jsxs)(`section`, {
            className: `glass-card pop-in p-3 sm:p-5`,
            children: [
              (0, g.jsxs)(`header`, {
                className: `mb-4 flex items-center justify-between`,
                children: [
                  (0, g.jsx)(`h2`, {
                    className: `text-sm font-semibold capitalize`,
                    children: y(T, D),
                  }),
                  (0, g.jsxs)(`div`, {
                    className: `flex gap-1`,
                    children: [
                      (0, g.jsx)(i, {
                        variant: `ghost`,
                        size: `icon`,
                        onClick: () => z(-1),
                        children: (0, g.jsx)(s, { className: `size-4` }),
                      }),
                      (0, g.jsx)(i, {
                        variant: `ghost`,
                        size: `sm`,
                        onClick: () => {
                          (E(w.getFullYear()), O(w.getMonth()));
                        },
                        children: `Aujourd'hui`,
                      }),
                      (0, g.jsx)(i, {
                        variant: `ghost`,
                        size: `icon`,
                        onClick: () => z(1),
                        children: (0, g.jsx)(c, { className: `size-4` }),
                      }),
                    ],
                  }),
                ],
              }),
              (0, g.jsx)(`div`, {
                className: `grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-muted-foreground`,
                children: v.map((e, t) =>
                  (0, g.jsx)(`span`, { children: e }, t),
                ),
              }),
              (0, g.jsx)(`div`, {
                className: `mt-1 grid grid-cols-7 gap-0.5 sm:gap-1`,
                children: R.map((e, t) => {
                  if (e === null) return (0, g.jsx)(`span`, {}, `v${t}`);
                  let n = b(T, D, e),
                    i = P.get(n) ?? [],
                    a = i[0];
                  return (0, g.jsxs)(
                    `div`,
                    {
                      className: r(
                        `min-w-0 overflow-hidden rounded-lg border border-border/50 p-0.5 text-left sm:rounded-xl sm:p-1 sm:min-h-16`,
                        n === C && `border-primary/60 bg-primary/10`,
                      ),
                      children: [
                        (0, g.jsxs)(`button`, {
                          type: `button`,
                          onClick: () => {
                            a && (A(a.candidature), M(!0));
                          },
                          className: `flex aspect-square w-full flex-col items-center justify-center gap-1 sm:hidden`,
                          children: [
                            (0, g.jsx)(`span`, {
                              className: `text-[11px] leading-none text-muted-foreground`,
                              children: e,
                            }),
                            (0, g.jsx)(`span`, {
                              className: `flex items-center gap-0.5`,
                              children: i
                                .slice(0, 3)
                                .map((e, t) =>
                                  (0, g.jsx)(
                                    `span`,
                                    {
                                      className: r(
                                        `size-1.5 rounded-full border`,
                                        _[e.type],
                                      ),
                                    },
                                    t,
                                  ),
                                ),
                            }),
                          ],
                        }),
                        (0, g.jsxs)(`div`, {
                          className: `hidden sm:block`,
                          children: [
                            (0, g.jsx)(`span`, {
                              className: `text-[11px] text-muted-foreground`,
                              children: e,
                            }),
                            (0, g.jsxs)(`div`, {
                              className: `mt-0.5 flex flex-col gap-0.5`,
                              children: [
                                i.slice(0, 2).map((e, t) =>
                                  (0, g.jsx)(
                                    `button`,
                                    {
                                      type: `button`,
                                      onClick: () => {
                                        (A(e.candidature), M(!0));
                                      },
                                      className: r(
                                        `truncate rounded-md border px-1 py-0.5 text-[9.5px] font-medium`,
                                        _[e.type],
                                      ),
                                      title: `${e.type} — ${e.candidature.entreprise}`,
                                      children:
                                        e.candidature.entreprise || e.type,
                                    },
                                    t,
                                  ),
                                ),
                                i.length > 2 &&
                                  (0, g.jsxs)(`span`, {
                                    className: `text-[9.5px] text-muted-foreground`,
                                    children: [`+`, i.length - 2],
                                  }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    },
                    n,
                  );
                }),
              }),
            ],
          }),
          (0, g.jsxs)(`section`, {
            className: `glass-card pop-in p-5`,
            children: [
              (0, g.jsxs)(`h2`, {
                className: `mb-3 inline-flex items-center gap-2 text-sm font-semibold`,
                children: [
                  (0, g.jsx)(o, { className: `size-4 text-primary` }),
                  ` À venir`,
                ],
              }),
              F.length === 0 &&
                (0, g.jsx)(`p`, {
                  className: `py-8 text-center text-sm text-muted-foreground`,
                  children: `Aucune échéance à venir.`,
                }),
              (0, g.jsx)(`ul`, {
                className: `flex flex-col gap-2`,
                children: F.map((e, t) =>
                  (0, g.jsx)(
                    `li`,
                    {
                      children: (0, g.jsxs)(`button`, {
                        type: `button`,
                        onClick: () => {
                          (A(e.candidature), M(!0));
                        },
                        className: `flex w-full items-center gap-3 rounded-2xl border border-border/60 bg-card/60 px-3 py-2.5 text-left transition-colors hover:bg-accent/40`,
                        children: [
                          (0, g.jsx)(`span`, {
                            className: r(
                              `rounded-lg border px-2 py-1 text-[10.5px] font-semibold`,
                              _[e.type],
                            ),
                            children: e.type,
                          }),
                          (0, g.jsxs)(`span`, {
                            className: `min-w-0 flex-1`,
                            children: [
                              (0, g.jsx)(`span`, {
                                className: `block truncate text-[13.5px] font-medium`,
                                children: e.candidature.entreprise,
                              }),
                              (0, g.jsx)(`span`, {
                                className: `block truncate text-xs text-muted-foreground`,
                                children: e.candidature.poste,
                              }),
                            ],
                          }),
                          (0, g.jsx)(`span`, {
                            className: `shrink-0 text-xs text-muted-foreground`,
                            children: l(e.date),
                          }),
                        ],
                      }),
                    },
                    t,
                  ),
                ),
              }),
            ],
          }),
        ],
      }),
      (0, g.jsx)(m, {
        open: j,
        onOpenChange: M,
        value: k,
        profil: S,
        onSave: async (e) => {
          (await x(e), M(!1));
        },
      }),
    ],
  });
}
export { x as component };

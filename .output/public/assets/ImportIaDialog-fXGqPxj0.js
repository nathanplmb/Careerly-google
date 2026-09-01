import { r as e, t } from "./jsx-runtime-BkSabwWG.js";
import { c as n } from "./useStore-D1ICS8_H.js";
import { r } from "./Logo-BzB7YJf1.js";
import { t as i } from "./button-Fem7RhN8.js";
import { t as a } from "./useServerFn-BaYtNX8K.js";
import {
  At as o,
  S as s,
  Z as c,
  a as l,
  c as u,
  i as d,
  o as f,
  r as p,
  s as m,
} from "./index-C957XaZb.js";
import { n as h } from "./CandidatureSheet-uNs02hvY.js";
import { l as g } from "./match-run-DGcCutem.js";
var _ = e(n(), 1),
  v = t();
function y({ open: e, onOpenChange: t, onResult: n }) {
  let [y, b] = (0, _.useState)(``),
    [x, S] = (0, _.useState)(!1),
    [C, w] = (0, _.useState)(null),
    T = a(h);
  return (0, v.jsx)(p, {
    open: e,
    onOpenChange: t,
    children: (0, v.jsxs)(d, {
      className: `sm:max-w-2xl`,
      children: [
        (0, v.jsxs)(m, {
          children: [
            (0, v.jsxs)(u, {
              className: `flex items-center gap-2`,
              children: [
                (0, v.jsx)(r, { className: `size-5 text-primary` }),
                ` Analyser une offre avec l'IA`,
              ],
            }),
            (0, v.jsx)(l, {
              children: `Copiez-collez la fiche de poste : l'IA remplit l'entreprise, le poste, le lieu, le contact et le résumé de l'offre.`,
            }),
          ],
        }),
        (0, v.jsx)(s, {
          rows: 12,
          value: y,
          onChange: (e) => b(e.target.value),
          placeholder: `Collez ici l'annonce complète (LinkedIn, Welcome to the Jungle, JobTeaser…)`,
        }),
        C &&
          (0, v.jsx)(`p`, {
            className: `text-sm text-destructive`,
            children: C,
          }),
        (0, v.jsxs)(f, {
          children: [
            (0, v.jsx)(i, {
              variant: `outline`,
              onClick: () => t(!1),
              children: `Annuler`,
            }),
            (0, v.jsxs)(i, {
              onClick: async () => {
                (S(!0), w(null));
                try {
                  let e = await T({ data: { texte: y } });
                  (n({
                    ...c(),
                    entreprise: e.entreprise,
                    poste: e.poste,
                    lieu: e.lieu,
                    lien: e.lien,
                    source: e.source || `JobTeaser`,
                    secteur: e.secteur || ``,
                    priorite:
                      e.priorite === `Haute` ||
                      e.priorite === `Moyenne` ||
                      e.priorite === `Faible`
                        ? e.priorite
                        : `auto`,
                    contact: e.contact || ``,
                    dateLimite: /^\d{4}-\d{2}-\d{2}$/.test(e.dateLimite ?? ``)
                      ? e.dateLimite
                      : ``,
                    commentaire: e.commentaire || ``,
                    missions: e.missions || ``,
                    profilRecherche: e.profilRecherche || ``,
                    modalites: e.modalites || ``,
                    detail: e.detail?.trim() || ``,
                  }),
                    b(``),
                    t(!1));
                } catch (e) {
                  w(g(e));
                } finally {
                  S(!1);
                }
              },
              disabled: x || y.trim().length < 20,
              children: [
                x
                  ? (0, v.jsx)(o, { className: `animate-spin` })
                  : (0, v.jsx)(r, {}),
                x ? `Analyse en cours…` : `Analyser l'offre`,
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
export { y as t };

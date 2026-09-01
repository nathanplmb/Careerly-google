import { t as e } from "./jsx-runtime-BkSabwWG.js";
import { r as t } from "./Logo-BzB7YJf1.js";
import { n } from "./button-Fem7RhN8.js";
import { c as r } from "./match-run-DGcCutem.js";
var i = e();
function a({ match: e, obsolete: a, className: o }) {
  if (!e || typeof e.global != `number`)
    return (0, i.jsx)(`span`, {
      className: n(`text-xs text-muted-foreground`, o),
      children: `—`,
    });
  let s = r(e.global);
  return (0, i.jsxs)(`span`, {
    className: n(
      `inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium`,
      s.badge,
      a && `opacity-60`,
      o,
    ),
    title: a
      ? `Analyse potentiellement obsolète — profil ou offre modifié`
      : `${s.label}${e.confiance ? ` · confiance ${e.confiance}%` : ``}`,
    children: [
      (0, i.jsx)(t, { className: `size-3` }),
      e.global,
      `% — `,
      s.label,
      a ? ` ⟳` : ``,
    ],
  });
}
export { a as t };

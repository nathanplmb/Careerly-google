import { r as e, t } from "./jsx-runtime-BkSabwWG.js";
import { c as n } from "./useStore-D1ICS8_H.js";
import { r } from "./Logo-BzB7YJf1.js";
import { t as i } from "./button-Fem7RhN8.js";
import { i as a, r as o } from "./profil-cloud-6Wxfcptp.js";
import { t as s } from "./useServerFn-BaYtNX8K.js";
import { a as c, i as l, n as u, r as d, t as f } from "./select-tdZ7gVuq.js";
import { t as p } from "./MatchPanel-C3DF3gwt.js";
import {
  At as m,
  C as h,
  E as g,
  K as _,
  Q as v,
  S as y,
  W as ee,
  Y as b,
  an as x,
  on as S,
  q as C,
} from "./index-DZFXxDuZ.js";
import { i as w, n as T, r as E, t as D } from "./tabs-CrTge2dX.js";
import { l as O, n as k, s as A, t as j } from "./match-run-CCn1_Nrs.js";
import { t as M } from "./modal-C5R99SRH.js";
var N = e(n(), 1),
  P = a({ method: `POST` })
    .middleware([o])
    .handler(
      S(`a9a7d9748349c2caef4f1579d82ce8841e1718bdbb7ff691cfe5318e8c13da92`),
    ),
  F = t();
function I({
  open: e,
  onOpenChange: t,
  value: n,
  onSave: a,
  onStartWorkflow: o,
  profil: S = null,
}) {
  let I = x(),
    [L, R] = (0, N.useState)(n),
    [z, B] = (0, N.useState)(!1),
    [V, H] = (0, N.useState)(!1),
    [U, W] = (0, N.useState)(null),
    [G, K] = (0, N.useState)(`details`),
    q = s(P);
  if (
    ((0, N.useEffect)(() => {
      (R(n), W(null), K(`details`));
    }, [n]),
    !L)
  )
    return null;
  let J = () => {
      L && (a(L), t(!1));
    },
    Y = async () => {
      L &&
        (a(L),
        t(!1),
        o ? o(L) : I({ to: `/assistant`, search: { oppId: L.id } }));
    },
    X = (e) => R((t) => t && { ...t, ...e }),
    Z = async () => {
      if (!L) return;
      let e = [
        L.detail?.trim(),
        L.missions?.trim(),
        L.profilRecherche?.trim(),
        L.modalites?.trim(),
        `${L.poste} ${L.entreprise} ${L.lieu} ${L.commentaire}`,
      ].filter(Boolean).join(`

`);
      if (e.length < 15) {
        W(
          `Veuillez coller le texte ou le détail de l'offre pour que l'IA puisse l'analyser.`,
        );
        return;
      }
      (H(!0), W(null));
      try {
        let t = await q({ data: { texte: e } });
        X({
          entreprise:
            ((!L.entreprise ||
              L.entreprise === `Entreprise` ||
              L.entreprise === `Nouvelle entreprise`) &&
              t.entreprise) ||
            L.entreprise,
          poste:
            ((!L.poste || L.poste === `Nouveau poste`) && t.poste) || L.poste,
          lieu: ((!L.lieu || L.lieu === `Non précisé`) && t.lieu) || L.lieu,
          lien: L.lien || t.lien,
          source:
            L.source === `Autre` && t.source
              ? t.source
              : L.source || t.source || `JobTeaser`,
          secteur: L.secteur || t.secteur || ``,
          contact: L.contact || t.contact || ``,
          dateLimite:
            L.dateLimite ||
            (/^\d{4}-\d{2}-\d{2}$/.test(t.dateLimite ?? ``)
              ? t.dateLimite
              : ``),
          priorite:
            L.priorite === `auto` &&
            (t.priorite === `Haute` ||
              t.priorite === `Moyenne` ||
              t.priorite === `Faible`)
              ? t.priorite
              : L.priorite,
          commentaire: t.commentaire || L.commentaire || ``,
          missions: t.missions || L.missions || ``,
          profilRecherche: t.profilRecherche || L.profilRecherche || ``,
          modalites: t.modalites || L.modalites || ``,
          detail: t.detail?.trim() || L.detail || ``,
        });
      } catch (e) {
        W(O(e));
      } finally {
        H(!1);
      }
    },
    Q = (e) =>
      R((t) => t && { ...t, preparation: { ...v(), ...t.preparation, ...e } }),
    te = async () => {
      if (!(!L || !S)) {
        (B(!0), W(null));
        try {
          let e = await j(L, S);
          X({ match: e });
        } catch (e) {
          W(O(e));
        } finally {
          B(!1);
        }
      }
    },
    $ = !n?.entreprise;
  return (0, F.jsx)(M, {
    open: e,
    onOpenChange: t,
    title: $ ? `Nouvelle candidature` : `Modifier la candidature`,
    description: $
      ? `Renseignez les informations de l'offre.`
      : `${L.entreprise} — ${L.poste}`,
    bodyClassName: `px-0 py-0 sm:px-0`,
    footer: (0, F.jsxs)(`div`, {
      className: `flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between w-full gap-2`,
      children: [
        (0, F.jsx)(i, {
          variant: `ghost`,
          size: `sm`,
          onClick: () => t(!1),
          className: `text-xs text-muted-foreground`,
          children: `Annuler`,
        }),
        (0, F.jsxs)(`div`, {
          className: `flex items-center justify-end gap-2`,
          children: [
            (0, F.jsx)(i, {
              variant: `outline`,
              size: `sm`,
              onClick: J,
              disabled: !L.entreprise.trim(),
              className: `text-xs font-medium`,
              children: `Enregistrer uniquement`,
            }),
            (0, F.jsxs)(i, {
              size: `sm`,
              onClick: Y,
              disabled: !L.entreprise.trim(),
              className: `text-xs font-medium bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md gap-1.5`,
              children: [
                (0, F.jsx)(r, { className: `size-3.5` }),
                `Commencer ma candidature`,
              ],
            }),
          ],
        }),
      ],
    }),
    children: (0, F.jsxs)(D, {
      value: G,
      onValueChange: K,
      className: `flex flex-col`,
      children: [
        (0, F.jsxs)(E, {
          className: `mx-5 mt-4 w-auto justify-start sm:mx-6`,
          children: [
            (0, F.jsx)(w, { value: `details`, children: `Détails` }),
            (0, F.jsx)(w, { value: `match`, children: `Match IA` }),
            (0, F.jsx)(w, { value: `preparation`, children: `Préparation` }),
          ],
        }),
        (0, F.jsxs)(`div`, {
          className: `flex flex-col`,
          children: [
            (0, F.jsx)(T, {
              value: `details`,
              className: `mt-0 data-[state=inactive]:hidden`,
              children: (0, F.jsx)(`div`, {
                className: `px-5 py-5 sm:px-6`,
                children: (0, F.jsxs)(`div`, {
                  className: `grid gap-4 sm:grid-cols-2`,
                  children: [
                    (0, F.jsxs)(`div`, {
                      className: `grid gap-2`,
                      children: [
                        (0, F.jsx)(h, {
                          htmlFor: `entreprise`,
                          children: `Entreprise`,
                        }),
                        (0, F.jsx)(g, {
                          id: `entreprise`,
                          value: L.entreprise,
                          onChange: (e) => X({ entreprise: e.target.value }),
                          placeholder: `Nom de l'entreprise`,
                        }),
                      ],
                    }),
                    (0, F.jsxs)(`div`, {
                      className: `grid gap-2`,
                      children: [
                        (0, F.jsx)(h, {
                          htmlFor: `lieu`,
                          children: `Lieu du poste`,
                        }),
                        (0, F.jsx)(g, {
                          id: `lieu`,
                          value: L.lieu,
                          onChange: (e) => X({ lieu: e.target.value }),
                          placeholder: `Paris 15e`,
                        }),
                      ],
                    }),
                    (0, F.jsxs)(`div`, {
                      className: `grid gap-2 sm:col-span-2`,
                      children: [
                        (0, F.jsx)(h, {
                          htmlFor: `poste`,
                          children: `Intitulé du poste`,
                        }),
                        (0, F.jsx)(g, {
                          id: `poste`,
                          value: L.poste,
                          onChange: (e) => X({ poste: e.target.value }),
                          placeholder: `Assistant chef de produit (H/F)`,
                        }),
                      ],
                    }),
                    (0, F.jsxs)(`div`, {
                      className: `grid gap-2`,
                      children: [
                        (0, F.jsx)(h, { children: `État d'avancement` }),
                        (0, F.jsxs)(f, {
                          value: L.statut,
                          onValueChange: (e) => X({ statut: e }),
                          children: [
                            (0, F.jsx)(l, { children: (0, F.jsx)(c, {}) }),
                            (0, F.jsx)(u, {
                              children: C.map((e) =>
                                (0, F.jsx)(d, { value: e, children: e }, e),
                              ),
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, F.jsxs)(`div`, {
                      className: `grid gap-2`,
                      children: [
                        (0, F.jsx)(h, { children: `Source` }),
                        (0, F.jsxs)(f, {
                          value: L.source || `__none__`,
                          onValueChange: (e) =>
                            X({ source: e === `__none__` ? `` : e }),
                          children: [
                            (0, F.jsx)(l, {
                              children: (0, F.jsx)(c, {
                                placeholder: `Choisir une source`,
                              }),
                            }),
                            (0, F.jsxs)(u, {
                              children: [
                                (0, F.jsx)(d, {
                                  value: `__none__`,
                                  children: `Non renseignée`,
                                }),
                                _.map((e) =>
                                  (0, F.jsx)(d, { value: e, children: e }, e),
                                ),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, F.jsxs)(`div`, {
                      className: `grid gap-2`,
                      children: [
                        (0, F.jsx)(h, {
                          htmlFor: `secteur`,
                          children: `Secteur`,
                        }),
                        (0, F.jsx)(g, {
                          id: `secteur`,
                          value: L.secteur,
                          onChange: (e) => X({ secteur: e.target.value }),
                          placeholder: `Tech, Luxe, Conseil…`,
                        }),
                      ],
                    }),
                    (0, F.jsxs)(`div`, {
                      className: `grid gap-2`,
                      children: [
                        (0, F.jsx)(h, { children: `Priorité` }),
                        (0, F.jsxs)(f, {
                          value: L.priorite,
                          onValueChange: (e) => X({ priorite: e }),
                          children: [
                            (0, F.jsx)(l, { children: (0, F.jsx)(c, {}) }),
                            (0, F.jsxs)(u, {
                              children: [
                                (0, F.jsx)(d, {
                                  value: `auto`,
                                  children: `Auto (par l'IA)`,
                                }),
                                ee.map((e) =>
                                  (0, F.jsx)(d, { value: e, children: e }, e),
                                ),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, F.jsxs)(`div`, {
                      className: `grid gap-2 sm:col-span-2`,
                      children: [
                        (0, F.jsx)(h, {
                          htmlFor: `contact`,
                          children: `Contact (nom / email / téléphone)`,
                        }),
                        (0, F.jsx)(g, {
                          id: `contact`,
                          value: L.contact,
                          onChange: (e) => X({ contact: e.target.value }),
                          placeholder: `M. Dupont - email@email.fr - 0600000000`,
                        }),
                      ],
                    }),
                    (0, F.jsxs)(`div`, {
                      className: `grid gap-2 sm:col-span-2`,
                      children: [
                        (0, F.jsx)(h, {
                          htmlFor: `lien`,
                          children: `Lien internet de l'offre`,
                        }),
                        (0, F.jsx)(g, {
                          id: `lien`,
                          value: L.lien,
                          onChange: (e) => X({ lien: e.target.value }),
                          placeholder: `https://…`,
                        }),
                      ],
                    }),
                    (0, F.jsxs)(`div`, {
                      className: `grid gap-2`,
                      children: [
                        (0, F.jsx)(h, {
                          htmlFor: `envoi`,
                          children: `Date d'envoi`,
                        }),
                        (0, F.jsx)(g, {
                          id: `envoi`,
                          type: `date`,
                          value: L.dateEnvoi,
                          onChange: (e) =>
                            X({
                              dateEnvoi: e.target.value,
                              dateRelance:
                                L.dateRelance || b(e.target.value, 10),
                              dateDernierContact:
                                L.dateDernierContact || e.target.value,
                            }),
                        }),
                      ],
                    }),
                    (0, F.jsxs)(`div`, {
                      className: `grid gap-2`,
                      children: [
                        (0, F.jsx)(h, {
                          htmlFor: `relance`,
                          children: `Date de relance (J+10)`,
                        }),
                        (0, F.jsx)(g, {
                          id: `relance`,
                          type: `date`,
                          value: L.dateRelance,
                          onChange: (e) => X({ dateRelance: e.target.value }),
                        }),
                      ],
                    }),
                    (0, F.jsxs)(`div`, {
                      className: `grid gap-2`,
                      children: [
                        (0, F.jsx)(h, {
                          htmlFor: `dernier`,
                          children: `Date du dernier contact`,
                        }),
                        (0, F.jsx)(g, {
                          id: `dernier`,
                          type: `date`,
                          value: L.dateDernierContact,
                          onChange: (e) =>
                            X({ dateDernierContact: e.target.value }),
                        }),
                      ],
                    }),
                    (0, F.jsxs)(`div`, {
                      className: `grid gap-2`,
                      children: [
                        (0, F.jsx)(h, {
                          htmlFor: `limite`,
                          children: `Date limite pour postuler`,
                        }),
                        (0, F.jsx)(g, {
                          id: `limite`,
                          type: `date`,
                          value: L.dateLimite,
                          onChange: (e) => X({ dateLimite: e.target.value }),
                        }),
                      ],
                    }),
                    (0, F.jsxs)(`div`, {
                      className: `grid gap-2 sm:col-span-2 pt-2`,
                      children: [
                        (0, F.jsxs)(`div`, {
                          className: `flex items-center justify-between border-b pb-2 mb-1`,
                          children: [
                            (0, F.jsxs)(`span`, {
                              className: `text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5`,
                              children: [
                                (0, F.jsx)(r, {
                                  className: `size-3.5 text-primary`,
                                }),
                                `Contenu du poste & Analyse IA`,
                              ],
                            }),
                            (0, F.jsxs)(i, {
                              type: `button`,
                              variant: `outline`,
                              size: `sm`,
                              className: `h-7 text-xs text-primary border-primary/30 hover:bg-primary/10 gap-1.5`,
                              onClick: () => void Z(),
                              disabled: V,
                              children: [
                                V
                                  ? (0, F.jsx)(m, {
                                      className: `w-3.5 h-3.5 animate-spin`,
                                    })
                                  : (0, F.jsx)(r, { className: `w-3.5 h-3.5` }),
                                V
                                  ? `Analyse IA en cours...`
                                  : `Remplir & structurer avec l'IA`,
                              ],
                            }),
                          ],
                        }),
                        U &&
                          G === `details` &&
                          (0, F.jsx)(`p`, {
                            className: `text-xs text-destructive mb-2`,
                            children: U,
                          }),
                      ],
                    }),
                    (0, F.jsxs)(`div`, {
                      className: `grid gap-2 sm:col-span-2`,
                      children: [
                        (0, F.jsxs)(h, {
                          htmlFor: `missions`,
                          className: `flex items-center gap-1.5`,
                          children: [
                            (0, F.jsx)(`span`, { children: `🎯` }),
                            ` Missions clés`,
                          ],
                        }),
                        (0, F.jsx)(y, {
                          id: `missions`,
                          rows: 3,
                          value: L.missions,
                          onChange: (e) => X({ missions: e.target.value }),
                          placeholder: `• Responsabilités, projets à piloter, livrables attendus...`,
                        }),
                      ],
                    }),
                    (0, F.jsxs)(`div`, {
                      className: `grid gap-2 sm:col-span-2`,
                      children: [
                        (0, F.jsxs)(h, {
                          htmlFor: `profilRecherche`,
                          className: `flex items-center gap-1.5`,
                          children: [
                            (0, F.jsx)(`span`, { children: `👤` }),
                            ` Profil & Compétences recherchés`,
                          ],
                        }),
                        (0, F.jsx)(y, {
                          id: `profilRecherche`,
                          rows: 3,
                          value: L.profilRecherche,
                          onChange: (e) =>
                            X({ profilRecherche: e.target.value }),
                          placeholder: `• Formation (ex: Master Finance/Management), hard skills (Excel, PowerPoint...), langues, soft skills...`,
                        }),
                      ],
                    }),
                    (0, F.jsxs)(`div`, {
                      className: `grid gap-2 sm:col-span-2`,
                      children: [
                        (0, F.jsxs)(h, {
                          htmlFor: `modalites`,
                          className: `flex items-center gap-1.5`,
                          children: [
                            (0, F.jsx)(`span`, { children: `ℹ️` }),
                            ` Modalités du poste`,
                          ],
                        }),
                        (0, F.jsx)(y, {
                          id: `modalites`,
                          rows: 2,
                          value: L.modalites,
                          onChange: (e) => X({ modalites: e.target.value }),
                          placeholder: `• Type / Durée (ex: Stage 6 mois) • Début • Gratification • Télétravail...`,
                        }),
                      ],
                    }),
                    (0, F.jsxs)(`div`, {
                      className: `grid gap-2 sm:col-span-2`,
                      children: [
                        (0, F.jsxs)(h, {
                          htmlFor: `detail`,
                          className: `flex items-center gap-1.5`,
                          children: [
                            (0, F.jsx)(`span`, { children: `📝` }),
                            ` Détails supplémentaires / Texte brut de l'offre`,
                          ],
                        }),
                        (0, F.jsx)(y, {
                          id: `detail`,
                          rows: 3,
                          value: L.detail,
                          onChange: (e) => X({ detail: e.target.value }),
                          placeholder: `Collez ici le texte intégral de la fiche de poste ou des notes d'équipe complémentaires...`,
                        }),
                      ],
                    }),
                    (0, F.jsxs)(`div`, {
                      className: `grid gap-2 sm:col-span-2`,
                      children: [
                        (0, F.jsxs)(h, {
                          htmlFor: `commentaire`,
                          className: `flex items-center gap-1.5`,
                          children: [
                            (0, F.jsx)(`span`, { children: `💬` }),
                            ` Commentaire & Conseil stratégique`,
                          ],
                        }),
                        (0, F.jsx)(y, {
                          id: `commentaire`,
                          rows: 2,
                          value: L.commentaire,
                          onChange: (e) => X({ commentaire: e.target.value }),
                          placeholder: `Conseil stratégique pour postuler, points d'accroche ou notes de suivi...`,
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            }),
            (0, F.jsx)(T, {
              value: `match`,
              className: `mt-0 data-[state=inactive]:hidden`,
              children: (0, F.jsx)(`div`, {
                className: `px-5 py-5 sm:px-6`,
                children: (0, F.jsx)(p, {
                  match: L.match ?? null,
                  obsolete: A(L, S),
                  loading: z,
                  erreur: U,
                  profilPret: !!(
                    S &&
                    (S.formation || S.competences || S.experiences)
                  ),
                  offrePrete: k(L),
                  onAnalyser: () => void te(),
                  candidature: L,
                }),
              }),
            }),
            (0, F.jsx)(T, {
              value: `preparation`,
              className: `mt-0 data-[state=inactive]:hidden`,
              children: (0, F.jsx)(`div`, {
                className: `px-5 py-5 sm:px-6`,
                children: (0, F.jsxs)(`div`, {
                  className: `grid gap-4`,
                  children: [
                    (0, F.jsxs)(`div`, {
                      className: `grid gap-2`,
                      children: [
                        (0, F.jsx)(h, {
                          htmlFor: `pourquoiEntreprise`,
                          children: `Pourquoi cette entreprise ?`,
                        }),
                        (0, F.jsx)(y, {
                          id: `pourquoiEntreprise`,
                          rows: 3,
                          value: L.preparation.pourquoiEntreprise,
                          onChange: (e) =>
                            Q({ pourquoiEntreprise: e.target.value }),
                          placeholder: `Vos arguments pour l'entreprise`,
                        }),
                      ],
                    }),
                    (0, F.jsxs)(`div`, {
                      className: `grid gap-2`,
                      children: [
                        (0, F.jsx)(h, {
                          htmlFor: `pourquoiPoste`,
                          children: `Pourquoi ce poste ?`,
                        }),
                        (0, F.jsx)(y, {
                          id: `pourquoiPoste`,
                          rows: 3,
                          value: L.preparation.pourquoiPoste,
                          onChange: (e) => Q({ pourquoiPoste: e.target.value }),
                          placeholder: `Vos arguments pour le poste`,
                        }),
                      ],
                    }),
                    (0, F.jsxs)(`div`, {
                      className: `grid gap-2`,
                      children: [
                        (0, F.jsx)(h, {
                          htmlFor: `notes`,
                          children: `Notes de préparation`,
                        }),
                        (0, F.jsx)(y, {
                          id: `notes`,
                          rows: 5,
                          value: L.preparation.notes,
                          onChange: (e) => Q({ notes: e.target.value }),
                          placeholder: `Questions, réponses, points à creuser…`,
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            }),
          ],
        }),
      ],
    }),
  });
}
export { P as n, I as t };

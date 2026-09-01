import { r as e, t } from "./jsx-runtime-BkSabwWG.js";
import { c as n } from "./useStore-D1ICS8_H.js";
import { a as r, i, r as a, s as o } from "./Logo-BzB7YJf1.js";
import { t as s } from "./button-Fem7RhN8.js";
import {
  a as c,
  c as l,
  d as u,
  f as d,
  h as f,
  l as p,
  n as m,
  o as h,
  t as g,
  u as _,
} from "./AppShell-Cmck22UZ.js";
import { t as v } from "./useServerFn-BaYtNX8K.js";
import { n as y, t as b } from "./UsageIaCard-DAiQgCFV.js";
import { t as x } from "./arrow-right-lKibUqD6.js";
import { n as S, t as C } from "./AiContextCard-W22gSVRA.js";
import { n as w, t as T } from "./lightbulb-DPtW-t0j.js";
import { t as E } from "./chevron-right-DRjUoTJ5.js";
import { t as D } from "./message-square-quote-CIEHMFQ_.js";
import { t as O } from "./rotate-ccw-BIzOzO24.js";
import { t as ee } from "./send-Zkk9i-1X.js";
import {
  At as k,
  E as A,
  It as j,
  Lt as M,
  Rt as N,
  S as P,
  Z as te,
  et as ne,
  jt as F,
  zt as I,
} from "./index-C957XaZb.js";
import { i as L, n as R, r as z, t as B } from "./tabs-QU5WMGYF.js";
import { n as V } from "./profil-completion-DozoElTC.js";
import { t as H } from "./progress-MirSnR9X.js";
import { t as U } from "./useProfil-DaZvyt2K.js";
import { t as W } from "./useSession-B5bRSz86.js";
import { t as G } from "./useCandidatures-kGyisxTi.js";
import { n as re, t as ie } from "./CandidatureSheet-uNs02hvY.js";
import { n as ae } from "./cv-fichier-BSHVgc_-.js";
import { i as K, l as q, t as oe } from "./match-run-DGcCutem.js";
import { n as se, r as ce, t as le } from "./redaction.functions-CksB_VeB.js";
import { i as ue, n as de, r as fe, t as pe } from "./accordion-CLo6WRir.js";
var me = r(`circle-question-mark`, [
    [`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }],
    [`path`, { d: `M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3`, key: `1u773s` }],
    [`path`, { d: `M12 17h.01`, key: `p32p05` }],
  ]),
  he = r(`file-search`, [
    [
      `path`,
      {
        d: `M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,
        key: `1oefj6`,
      },
    ],
    [`path`, { d: `M14 2v5a1 1 0 0 0 1 1h5`, key: `wfsgrz` }],
    [`circle`, { cx: `11.5`, cy: `14.5`, r: `2.5`, key: `1bq0ko` }],
    [`path`, { d: `M13.3 16.3 15 18`, key: `2quom7` }],
  ]),
  J = e(n(), 1),
  Y = `careerly_ai_history_v1`;
function ge() {
  if (typeof window > `u`) return [];
  try {
    let e = localStorage.getItem(Y);
    if (!e) return [];
    let t = JSON.parse(e);
    return Array.isArray(t) ? t : [];
  } catch {
    return [];
  }
}
function X(e) {
  if (typeof window > `u`) return [];
  try {
    let t = ge(),
      n = {
        ...e,
        id:
          e.id || `ai_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        date: new Date().toISOString(),
      },
      r = [n, ...t.filter((e) => e.id !== n.id)].slice(0, 20);
    return (localStorage.setItem(Y, JSON.stringify(r)), r);
  } catch {
    return [];
  }
}
var Z = t();
function _e({ offreData: e, onChangeOffreData: t, onNextStep: n }) {
  let { items: r, save: i } = G(),
    l = v(re),
    u = (0, J.useRef)(null),
    [d, f] = (0, J.useState)(`coller`),
    [m, h] = (0, J.useState)(!1),
    [g, _] = (0, J.useState)(!1),
    [y, b] = (0, J.useState)(!1),
    S = async (e) => {
      if (!e || e.trim().length < 10) {
        o.error(
          `Veuillez coller le texte ou lien de l'offre (au moins 10 caractères).`,
        );
        return;
      }
      h(!0);
      try {
        let n = await l({ data: { texte: e } });
        (t({
          texte: e,
          entreprise: n.entreprise || ``,
          poste: n.poste || ``,
          lieu: n.lieu || ``,
          lien: n.lien || ``,
          dateLimite: n.dateLimite || ``,
          missions: n.missions || n.detail || ``,
          profilRecherche: n.profilRecherche || ``,
          secteur: n.secteur || ``,
          priorite: n.priorite || `auto`,
          contactRecruteur: n.contact || ``,
        }),
          X({
            type: `offre`,
            titre: n.poste
              ? `${n.poste} @ ${n.entreprise || `Entreprise`}`
              : `Analyse d'offre`,
            sousTitre: n.lieu,
            apercu:
              n.missions?.slice(0, 140) ||
              n.detail?.slice(0, 140) ||
              e.slice(0, 140),
            offreData: {
              entreprise: n.entreprise,
              poste: n.poste,
              lieu: n.lieu,
              missions: n.missions,
              texte: e,
            },
          }),
          o.success(`Offre analysée et structurée avec succès !`));
      } catch (e) {
        o.error(q(e));
      } finally {
        h(!1);
      }
    },
    C = (e) => {
      let n = r.find((t) => t.id === e);
      n &&
        (t({
          texte:
            [
              n.poste ? `Poste : ${n.poste}` : ``,
              n.entreprise ? `Entreprise : ${n.entreprise}` : ``,
              n.lieu ? `Lieu : ${n.lieu}` : ``,
              n.missions ? `Missions : ${n.missions}` : ``,
              n.profilRecherche
                ? `Profil recherché : ${n.profilRecherche}`
                : ``,
              n.notes ? `Notes : ${n.notes}` : ``,
            ].filter(Boolean).join(`

`) || `${n.poste} - ${n.entreprise}`,
          entreprise: n.entreprise || ``,
          poste: n.poste || ``,
          lieu: n.lieu || ``,
          lien: n.lienOffre || ``,
          dateLimite: n.dateLimite || ``,
          missions: n.missions || ``,
          profilRecherche: n.profilRecherche || ``,
          secteur: n.secteur || ``,
          priorite: n.priorite || `auto`,
          contactRecruteur: n.contactNom || ``,
          candidatureIdLiee: n.id,
        }),
        o.info(`Offre "${n.poste || n.entreprise}" chargée dans le workflow.`));
    },
    w = async () => {
      if (!e.entreprise && !e.poste) {
        o.error(`Renseignez au moins l'entreprise ou l'intitulé du poste.`);
        return;
      }
      _(!0);
      try {
        let n = {
          id: crypto.randomUUID(),
          entreprise: e.entreprise || `Entreprise`,
          poste: e.poste || `Poste à préciser`,
          statut: `A_POSTULER`,
          lieu: e.lieu || void 0,
          lienOffre: e.lien || void 0,
          dateLimite: e.dateLimite || void 0,
          missions: e.missions || void 0,
          profilRecherche: e.profilRecherche || void 0,
          secteur: e.secteur || void 0,
          contactNom: e.contactRecruteur || void 0,
          notes: `Importé via NACORA AI Hub le ${new Date().toLocaleDateString(`fr-FR`)}`,
          creeLe: new Date().toISOString(),
        };
        (await i(n),
          t({ candidatureIdLiee: n.id }),
          b(!0),
          o.success(`Candidature ajoutée à votre tableau de bord !`));
      } catch {
        o.error(`Erreur lors de la sauvegarde.`);
      } finally {
        _(!1);
      }
    },
    T = async (e) => {
      try {
        let n = await ae(e);
        (t({ texte: n }),
          o.success(`Document de l'offre chargé. Lancement de l'analyse...`),
          S(n));
      } catch (e) {
        o.error(e instanceof Error ? e.message : `Fichier non lisible.`);
      }
    },
    E = !!(e.entreprise || e.poste || e.texte);
  return (0, Z.jsxs)(`div`, {
    className: `space-y-6`,
    children: [
      (0, Z.jsxs)(`div`, {
        className: `flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`,
        children: [
          (0, Z.jsxs)(`div`, {
            children: [
              (0, Z.jsx)(`h3`, {
                className: `text-base font-semibold text-foreground`,
                children: `Étape 1 : Analyser & structurer l'opportunité`,
              }),
              (0, Z.jsx)(`p`, {
                className: `text-xs text-muted-foreground`,
                children: `Collez le texte brut de l'annonce ou sélectionnez une de vos candidatures existantes.`,
              }),
            ],
          }),
          (0, Z.jsxs)(`div`, {
            className: `flex items-center gap-1 rounded-xl border border-border/60 bg-muted/40 p-1`,
            children: [
              (0, Z.jsx)(`button`, {
                type: `button`,
                onClick: () => f(`coller`),
                className: `rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${d === `coller` ? `bg-card text-foreground shadow-sm ring-1 ring-border/50` : `text-muted-foreground hover:text-foreground`}`,
                children: `Coller / Importer`,
              }),
              (0, Z.jsxs)(`button`, {
                type: `button`,
                onClick: () => f(`existant`),
                className: `rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${d === `existant` ? `bg-card text-foreground shadow-sm ring-1 ring-border/50` : `text-muted-foreground hover:text-foreground`}`,
                children: [`Mes candidatures (`, r.length, `)`],
              }),
            ],
          }),
        ],
      }),
      d === `existant`
        ? (0, Z.jsxs)(`div`, {
            className: `rounded-2xl border border-border/60 bg-card/40 p-4`,
            children: [
              (0, Z.jsx)(`label`, {
                className: `mb-2 block text-xs font-semibold text-foreground`,
                children: `Sélectionner une candidature existante :`,
              }),
              r.length === 0
                ? (0, Z.jsx)(`div`, {
                    className: `py-8 text-center text-xs text-muted-foreground`,
                    children: `Aucune candidature enregistrée. Basculez sur "Coller / Importer" pour ajouter votre première offre.`,
                  })
                : (0, Z.jsx)(`div`, {
                    className: `grid gap-2 sm:grid-cols-2`,
                    children: r.map((t) => {
                      let n = e.candidatureIdLiee === t.id;
                      return (0, Z.jsxs)(
                        `button`,
                        {
                          type: `button`,
                          onClick: () => C(t.id),
                          className: `flex items-start justify-between rounded-xl border p-3 text-left transition-all ${n ? `border-primary bg-primary/10 shadow-sm` : `border-border/60 bg-card/60 hover:border-primary/40 hover:bg-card`}`,
                          children: [
                            (0, Z.jsxs)(`div`, {
                              className: `min-w-0 flex-1 pr-2`,
                              children: [
                                (0, Z.jsx)(`p`, {
                                  className: `truncate text-xs font-semibold text-foreground`,
                                  children: t.poste || `Poste non défini`,
                                }),
                                (0, Z.jsxs)(`p`, {
                                  className: `truncate text-[11px] text-muted-foreground`,
                                  children: [
                                    t.entreprise,
                                    ` • `,
                                    t.lieu || `Lieu non précisé`,
                                  ],
                                }),
                              ],
                            }),
                            n &&
                              (0, Z.jsx)(M, {
                                className: `size-4 shrink-0 text-primary`,
                              }),
                          ],
                        },
                        t.id,
                      );
                    }),
                  }),
            ],
          })
        : (0, Z.jsxs)(`div`, {
            className: `space-y-3`,
            children: [
              (0, Z.jsxs)(`div`, {
                className: `relative`,
                children: [
                  (0, Z.jsx)(P, {
                    value: e.texte,
                    onChange: (e) => t({ texte: e.target.value }),
                    placeholder: `Collez ici le texte intégral de la fiche de poste, le lien, ou la description de l'offre...`,
                    className: `min-h-[140px] rounded-xl border-border/70 bg-card/70 text-xs leading-relaxed focus-visible:ring-primary/40`,
                  }),
                  (0, Z.jsx)(`input`, {
                    ref: u,
                    type: `file`,
                    accept: `.pdf,.docx,.doc,.txt`,
                    className: `hidden`,
                    onChange: (e) => {
                      let t = e.target.files?.[0];
                      t && T(t);
                    },
                  }),
                ],
              }),
              (0, Z.jsxs)(`div`, {
                className: `flex flex-wrap items-center justify-between gap-2`,
                children: [
                  (0, Z.jsxs)(s, {
                    type: `button`,
                    variant: `outline`,
                    size: `sm`,
                    onClick: () => u.current?.click(),
                    className: `h-8 gap-1.5 rounded-xl border-border/80 text-xs text-muted-foreground hover:text-foreground`,
                    children: [
                      (0, Z.jsx)(c, { className: `size-3.5` }),
                      (0, Z.jsx)(`span`, {
                        children: `Charger un fichier (.pdf, .docx)`,
                      }),
                    ],
                  }),
                  (0, Z.jsx)(s, {
                    type: `button`,
                    onClick: () => S(e.texte),
                    disabled: m || !e.texte.trim(),
                    className: `h-8 gap-1.5 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90`,
                    children: m
                      ? (0, Z.jsxs)(Z.Fragment, {
                          children: [
                            (0, Z.jsx)(k, {
                              className: `size-3.5 animate-spin`,
                            }),
                            (0, Z.jsx)(`span`, {
                              children: `Extraction en cours...`,
                            }),
                          ],
                        })
                      : (0, Z.jsxs)(Z.Fragment, {
                          children: [
                            (0, Z.jsx)(a, { className: `size-3.5` }),
                            (0, Z.jsx)(`span`, {
                              children: `Analyser avec l'IA`,
                            }),
                          ],
                        }),
                  }),
                ],
              }),
            ],
          }),
      E &&
        (0, Z.jsxs)(`div`, {
          className: `rounded-2xl border border-primary/20 bg-card/70 p-4 space-y-4`,
          children: [
            (0, Z.jsxs)(`div`, {
              className: `flex flex-wrap items-start justify-between gap-2`,
              children: [
                (0, Z.jsxs)(`div`, {
                  children: [
                    (0, Z.jsx)(`span`, {
                      className: `text-[10px] font-semibold uppercase tracking-wider text-primary`,
                      children: `Fiche d'offre synthétisée`,
                    }),
                    (0, Z.jsx)(`h4`, {
                      className: `text-base font-bold text-foreground`,
                      children: e.poste || `Poste à identifier`,
                    }),
                    (0, Z.jsxs)(`p`, {
                      className: `text-xs text-muted-foreground`,
                      children: [
                        e.entreprise || `Entreprise`,
                        ` `,
                        e.lieu ? `• ${e.lieu}` : ``,
                      ],
                    }),
                  ],
                }),
                (0, Z.jsx)(`div`, {
                  className: `flex items-center gap-2`,
                  children:
                    !e.candidatureIdLiee &&
                    (0, Z.jsx)(s, {
                      type: `button`,
                      variant: `outline`,
                      size: `sm`,
                      onClick: w,
                      disabled: g || y,
                      className: `h-8 gap-1.5 rounded-xl border-border text-xs`,
                      children: y
                        ? (0, Z.jsxs)(Z.Fragment, {
                            children: [
                              (0, Z.jsx)(M, {
                                className: `size-3.5 text-emerald-400`,
                              }),
                              (0, Z.jsx)(`span`, { children: `Ajouté` }),
                            ],
                          })
                        : (0, Z.jsxs)(Z.Fragment, {
                            children: [
                              (0, Z.jsx)(p, { className: `size-3.5` }),
                              (0, Z.jsx)(`span`, {
                                children: `Ajouter aux candidatures`,
                              }),
                            ],
                          }),
                    }),
                }),
              ],
            }),
            (0, Z.jsxs)(`div`, {
              className: `grid grid-cols-2 gap-2 text-xs sm:grid-cols-4`,
              children: [
                (0, Z.jsxs)(`div`, {
                  className: `rounded-xl border border-border/50 bg-background/50 p-2.5`,
                  children: [
                    (0, Z.jsx)(`span`, {
                      className: `block text-[10px] text-muted-foreground`,
                      children: `Entreprise`,
                    }),
                    (0, Z.jsx)(`span`, {
                      className: `font-semibold text-foreground truncate block`,
                      children: e.entreprise || `—`,
                    }),
                  ],
                }),
                (0, Z.jsxs)(`div`, {
                  className: `rounded-xl border border-border/50 bg-background/50 p-2.5`,
                  children: [
                    (0, Z.jsx)(`span`, {
                      className: `block text-[10px] text-muted-foreground`,
                      children: `Lieu`,
                    }),
                    (0, Z.jsx)(`span`, {
                      className: `font-semibold text-foreground truncate block`,
                      children: e.lieu || `—`,
                    }),
                  ],
                }),
                (0, Z.jsxs)(`div`, {
                  className: `rounded-xl border border-border/50 bg-background/50 p-2.5`,
                  children: [
                    (0, Z.jsx)(`span`, {
                      className: `block text-[10px] text-muted-foreground`,
                      children: `Secteur`,
                    }),
                    (0, Z.jsx)(`span`, {
                      className: `font-semibold text-foreground truncate block`,
                      children: e.secteur || `Général`,
                    }),
                  ],
                }),
                (0, Z.jsxs)(`div`, {
                  className: `rounded-xl border border-border/50 bg-background/50 p-2.5`,
                  children: [
                    (0, Z.jsx)(`span`, {
                      className: `block text-[10px] text-muted-foreground`,
                      children: `Date limite`,
                    }),
                    (0, Z.jsx)(`span`, {
                      className: `font-semibold text-foreground truncate block`,
                      children: e.dateLimite || `Dès que possible`,
                    }),
                  ],
                }),
              ],
            }),
            e.missions &&
              (0, Z.jsxs)(`div`, {
                className: `rounded-xl border border-border/40 bg-background/30 p-3 text-xs leading-relaxed text-muted-foreground`,
                children: [
                  (0, Z.jsx)(`span`, {
                    className: `mb-1 block font-semibold text-foreground`,
                    children: `Missions clés extraites :`,
                  }),
                  (0, Z.jsx)(`p`, {
                    className: `line-clamp-4 whitespace-pre-line`,
                    children: e.missions,
                  }),
                ],
              }),
            (0, Z.jsx)(`div`, {
              className: `flex justify-end pt-2`,
              children: (0, Z.jsxs)(s, {
                type: `button`,
                onClick: n,
                className: `gap-2 rounded-xl bg-primary px-5 text-xs font-semibold text-primary-foreground shadow-md hover:bg-primary/90`,
                children: [
                  (0, Z.jsx)(`span`, {
                    children: `Continuer vers le Match IA`,
                  }),
                  (0, Z.jsx)(x, { className: `size-3.5` }),
                ],
              }),
            }),
          ],
        }),
    ],
  });
}
function Q({
  offreData: e,
  matchData: t,
  onChangeMatchData: n,
  onNextStep: r,
  onPrevStep: i,
}) {
  let { user: c } = W(),
    l = U(c),
    { patch: u } = G(),
    [d, f] = (0, J.useState)(!1),
    p = async () => {
      if (!l) {
        o.error(`Veuillez d'abord compléter votre profil.`);
        return;
      }
      if (!e.texte && !e.missions && !e.poste) {
        o.error(`Veuillez renseigner les détails de l'offre à l'étape 1.`);
        return;
      }
      f(!0);
      try {
        let t = {
            id: e.candidatureIdLiee || `temp_offre`,
            entreprise: e.entreprise || `Entreprise ciblée`,
            poste: e.poste || `Poste ciblé`,
            statut: `A_POSTULER`,
            lieu: e.lieu,
            missions: e.missions || e.texte,
            profilRecherche: e.profilRecherche,
            creeLe: new Date().toISOString(),
          },
          r = await oe(t, l),
          i = {
            global: r.global ?? 75,
            competences: r.competences ?? 75,
            experience: r.experience ?? 70,
            formation: r.formation ?? 80,
            synthese:
              r.synthese ||
              `Bonne adéquation globale entre votre profil et les exigences du poste.`,
            pointsForts: r.pointsForts || [],
            pointsVigilance: r.pointsVigilance || [],
            competencesManquantes: r.competencesManquantes || [],
            recommandations: r.recommandations || [],
          };
        (n(i),
          e.candidatureIdLiee && u(e.candidatureIdLiee, { match: r }),
          X({
            type: `match`,
            titre: `Match ${i.global}% : ${e.poste || `Poste`} @ ${e.entreprise || `Entreprise`}`,
            sousTitre: `${i.pointsForts.length} points forts • ${i.competencesManquantes.length} compétences cibles`,
            apercu: i.synthese,
            offreData: e,
            matchData: i,
          }),
          o.success(`Évaluation Match IA calculée !`));
      } catch (e) {
        o.error(q(e));
      } finally {
        f(!1);
      }
    },
    m = (e) =>
      e >= 80
        ? `text-emerald-400 border-emerald-500/30 bg-emerald-500/10`
        : e >= 60
          ? `text-primary border-primary/30 bg-primary/10`
          : `text-amber-400 border-amber-500/30 bg-amber-500/10`;
  return (0, Z.jsxs)(`div`, {
    className: `space-y-6`,
    children: [
      (0, Z.jsxs)(`div`, {
        className: `flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between`,
        children: [
          (0, Z.jsxs)(`div`, {
            children: [
              (0, Z.jsx)(`h3`, {
                className: `text-base font-semibold text-foreground`,
                children: `Étape 2 : Match IA & Compatibilité profil`,
              }),
              (0, Z.jsx)(`p`, {
                className: `text-xs text-muted-foreground`,
                children: `Comparaison multi-dimensionnelle entre votre profil (expériences, compétences, études) et l'offre.`,
              }),
            ],
          }),
          (0, Z.jsx)(s, {
            type: `button`,
            onClick: p,
            disabled: d,
            className: `h-8 gap-1.5 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90`,
            children: d
              ? (0, Z.jsxs)(Z.Fragment, {
                  children: [
                    (0, Z.jsx)(k, { className: `size-3.5 animate-spin` }),
                    (0, Z.jsx)(`span`, { children: `Calcul en cours...` }),
                  ],
                })
              : (0, Z.jsxs)(Z.Fragment, {
                  children: [
                    (0, Z.jsx)(a, { className: `size-3.5` }),
                    (0, Z.jsx)(`span`, {
                      children: t
                        ? `Recalculer le Match`
                        : `Lancer le Match IA`,
                    }),
                  ],
                }),
          }),
        ],
      }),
      (0, Z.jsxs)(`div`, {
        className: `flex items-center justify-between rounded-xl border border-border/60 bg-muted/30 px-3.5 py-2.5 text-xs`,
        children: [
          (0, Z.jsxs)(`div`, {
            className: `flex items-center gap-2 truncate`,
            children: [
              (0, Z.jsx)(h, { className: `size-4 text-primary shrink-0` }),
              (0, Z.jsx)(`span`, {
                className: `font-semibold text-foreground truncate`,
                children: e.poste || `Poste sélectionné`,
              }),
              (0, Z.jsxs)(`span`, {
                className: `text-muted-foreground truncate`,
                children: [`@ `, e.entreprise || `Entreprise`],
              }),
            ],
          }),
          (0, Z.jsx)(s, {
            type: `button`,
            variant: `ghost`,
            size: `sm`,
            onClick: i,
            className: `h-6 text-[11px] text-muted-foreground hover:text-foreground`,
            children: `Modifier l'offre`,
          }),
        ],
      }),
      !t && !d
        ? (0, Z.jsxs)(`div`, {
            className: `rounded-2xl border border-dashed border-border/80 p-8 text-center`,
            children: [
              (0, Z.jsx)(a, {
                className: `mx-auto size-8 text-primary/70 mb-3`,
              }),
              (0, Z.jsx)(`h4`, {
                className: `text-sm font-semibold text-foreground`,
                children: `Prêt pour l'évaluation Match IA`,
              }),
              (0, Z.jsx)(`p`, {
                className: `mx-auto mt-1 max-w-md text-xs text-muted-foreground`,
                children: `Cliquez sur le bouton ci-dessus pour confronter votre profil complet aux exigences de l'offre et obtenir une analyse détaillée de vos atouts.`,
              }),
              (0, Z.jsxs)(s, {
                type: `button`,
                onClick: p,
                className: `mt-4 gap-2 rounded-xl bg-primary text-xs font-semibold text-primary-foreground`,
                children: [
                  (0, Z.jsx)(a, { className: `size-3.5` }),
                  (0, Z.jsx)(`span`, {
                    children: `Calculer mon score de match`,
                  }),
                ],
              }),
            ],
          })
        : d
          ? (0, Z.jsxs)(`div`, {
              className: `flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-card/40 py-12 text-center`,
              children: [
                (0, Z.jsx)(k, {
                  className: `size-8 animate-spin text-primary mb-3`,
                }),
                (0, Z.jsx)(`p`, {
                  className: `text-sm font-semibold text-foreground`,
                  children: `Analyse de compatibilité en cours...`,
                }),
                (0, Z.jsx)(`p`, {
                  className: `mt-1 text-xs text-muted-foreground`,
                  children: `Croisement des compétences, années d'expérience et missions clés`,
                }),
              ],
            })
          : t
            ? (0, Z.jsxs)(`div`, {
                className: `space-y-4`,
                children: [
                  (0, Z.jsxs)(`div`, {
                    className: `rounded-2xl border border-primary/20 bg-gradient-to-br from-card via-card/80 to-primary/5 p-5 shadow-sm`,
                    children: [
                      (0, Z.jsx)(`div`, {
                        className: `flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`,
                        children: (0, Z.jsxs)(`div`, {
                          className: `flex items-center gap-4`,
                          children: [
                            (0, Z.jsxs)(`div`, {
                              className: `grid size-16 place-items-center rounded-2xl border text-xl font-extrabold ${m(t.global)}`,
                              children: [t.global, `%`],
                            }),
                            (0, Z.jsxs)(`div`, {
                              children: [
                                (0, Z.jsxs)(`div`, {
                                  className: `flex items-center gap-2`,
                                  children: [
                                    (0, Z.jsx)(`h4`, {
                                      className: `text-sm font-bold text-foreground`,
                                      children: `Score de Correspondance Global`,
                                    }),
                                    (0, Z.jsx)(V, {
                                      variant: `outline`,
                                      className: `text-[10px] ${m(t.global)}`,
                                      children:
                                        t.global >= 75
                                          ? `Très fort potentiel`
                                          : t.global >= 50
                                            ? `Bonne adéquation`
                                            : `Profil à valoriser`,
                                    }),
                                  ],
                                }),
                                (0, Z.jsx)(`p`, {
                                  className: `mt-1 text-xs leading-relaxed text-muted-foreground max-w-xl`,
                                  children: t.synthese,
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                      (0, Z.jsxs)(`div`, {
                        className: `mt-4 grid grid-cols-1 gap-3 border-t border-border/40 pt-4 sm:grid-cols-3`,
                        children: [
                          (0, Z.jsxs)(`div`, {
                            children: [
                              (0, Z.jsxs)(`div`, {
                                className: `flex justify-between text-xs mb-1`,
                                children: [
                                  (0, Z.jsx)(`span`, {
                                    className: `text-muted-foreground`,
                                    children: `Compétences techniques`,
                                  }),
                                  (0, Z.jsxs)(`span`, {
                                    className: `font-semibold text-foreground`,
                                    children: [t.competences, `%`],
                                  }),
                                ],
                              }),
                              (0, Z.jsx)(H, {
                                value: t.competences,
                                className: `h-1.5`,
                              }),
                            ],
                          }),
                          (0, Z.jsxs)(`div`, {
                            children: [
                              (0, Z.jsxs)(`div`, {
                                className: `flex justify-between text-xs mb-1`,
                                children: [
                                  (0, Z.jsx)(`span`, {
                                    className: `text-muted-foreground`,
                                    children: `Expérience & Réalisations`,
                                  }),
                                  (0, Z.jsxs)(`span`, {
                                    className: `font-semibold text-foreground`,
                                    children: [t.experience, `%`],
                                  }),
                                ],
                              }),
                              (0, Z.jsx)(H, {
                                value: t.experience,
                                className: `h-1.5`,
                              }),
                            ],
                          }),
                          (0, Z.jsxs)(`div`, {
                            children: [
                              (0, Z.jsxs)(`div`, {
                                className: `flex justify-between text-xs mb-1`,
                                children: [
                                  (0, Z.jsx)(`span`, {
                                    className: `text-muted-foreground`,
                                    children: `Formation & Alignement`,
                                  }),
                                  (0, Z.jsxs)(`span`, {
                                    className: `font-semibold text-foreground`,
                                    children: [t.formation, `%`],
                                  }),
                                ],
                              }),
                              (0, Z.jsx)(H, {
                                value: t.formation,
                                className: `h-1.5`,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, Z.jsxs)(`div`, {
                    className: `grid gap-3 sm:grid-cols-2`,
                    children: [
                      (0, Z.jsxs)(`div`, {
                        className: `rounded-2xl border border-emerald-500/20 bg-card/60 p-4`,
                        children: [
                          (0, Z.jsxs)(`div`, {
                            className: `mb-2.5 flex items-center gap-2 text-xs font-semibold text-emerald-400`,
                            children: [
                              (0, Z.jsx)(M, { className: `size-4` }),
                              (0, Z.jsx)(`span`, {
                                children: `Points forts à valoriser`,
                              }),
                            ],
                          }),
                          t.pointsForts.length === 0
                            ? (0, Z.jsx)(`p`, {
                                className: `text-xs text-muted-foreground`,
                                children: `Aucun point spécifique identifié.`,
                              })
                            : (0, Z.jsx)(`ul`, {
                                className: `space-y-1.5 text-xs text-muted-foreground`,
                                children: t.pointsForts.map((e, t) =>
                                  (0, Z.jsxs)(
                                    `li`,
                                    {
                                      className: `flex items-start gap-2`,
                                      children: [
                                        (0, Z.jsx)(`span`, {
                                          className: `mt-1 size-1.5 rounded-full bg-emerald-400 shrink-0`,
                                        }),
                                        (0, Z.jsx)(`span`, { children: e }),
                                      ],
                                    },
                                    t,
                                  ),
                                ),
                              }),
                        ],
                      }),
                      (0, Z.jsxs)(`div`, {
                        className: `rounded-2xl border border-amber-500/20 bg-card/60 p-4`,
                        children: [
                          (0, Z.jsxs)(`div`, {
                            className: `mb-2.5 flex items-center gap-2 text-xs font-semibold text-amber-400`,
                            children: [
                              (0, Z.jsx)(T, { className: `size-4` }),
                              (0, Z.jsx)(`span`, {
                                children: `Compétences cibles & vigilance`,
                              }),
                            ],
                          }),
                          t.competencesManquantes.length === 0 &&
                          t.pointsVigilance.length === 0
                            ? (0, Z.jsx)(`p`, {
                                className: `text-xs text-muted-foreground`,
                                children: `Tous les critères clés sont déjà présents sur votre profil.`,
                              })
                            : (0, Z.jsxs)(`div`, {
                                className: `space-y-2 text-xs text-muted-foreground`,
                                children: [
                                  t.competencesManquantes.map((e, t) =>
                                    (0, Z.jsxs)(
                                      `div`,
                                      {
                                        className: `flex items-center gap-1.5`,
                                        children: [
                                          (0, Z.jsx)(V, {
                                            variant: `outline`,
                                            className: `border-amber-500/30 bg-amber-500/10 text-[10px] text-amber-300`,
                                            children: `À valoriser`,
                                          }),
                                          (0, Z.jsx)(`span`, {
                                            className: `truncate`,
                                            children: e,
                                          }),
                                        ],
                                      },
                                      t,
                                    ),
                                  ),
                                  t.pointsVigilance.map((e, t) =>
                                    (0, Z.jsxs)(
                                      `p`,
                                      {
                                        className: `text-[11.5px] italic text-muted-foreground`,
                                        children: [`• `, e],
                                      },
                                      t,
                                    ),
                                  ),
                                ],
                              }),
                        ],
                      }),
                    ],
                  }),
                  (0, Z.jsxs)(`div`, {
                    className: `flex items-center justify-between pt-2`,
                    children: [
                      (0, Z.jsxs)(s, {
                        type: `button`,
                        variant: `outline`,
                        size: `sm`,
                        onClick: i,
                        className: `h-9 gap-1.5 rounded-xl border-border text-xs`,
                        children: [
                          (0, Z.jsx)(I, { className: `size-3.5` }),
                          (0, Z.jsx)(`span`, { children: `Retour à l'offre` }),
                        ],
                      }),
                      (0, Z.jsxs)(s, {
                        type: `button`,
                        onClick: r,
                        className: `h-9 gap-2 rounded-xl bg-primary px-5 text-xs font-semibold text-primary-foreground shadow-md hover:bg-primary/90`,
                        children: [
                          (0, Z.jsx)(`span`, {
                            children: `Continuer : Adapter mon CV & Pitch`,
                          }),
                          (0, Z.jsx)(x, { className: `size-3.5` }),
                        ],
                      }),
                    ],
                  }),
                ],
              })
            : null,
    ],
  });
}
function ve({
  offreData: e,
  matchData: t,
  pitchData: n,
  onChangePitchData: r,
  onNextStep: i,
  onPrevStep: c,
}) {
  let { user: l } = W(),
    u = U(l),
    f = v(se),
    [p, g] = (0, J.useState)(!1),
    [_, y] = (0, J.useState)(
      `Direct, percutant et axé sur mes réalisations concrètes`,
    ),
    [b, C] = (0, J.useState)(null),
    w = (e, t) => {
      (navigator.clipboard.writeText(e),
        C(t),
        o.success(`Texte copié dans le presse-papiers !`),
        setTimeout(() => C(null), 2e3));
    },
    T = async () => {
      if (!u) {
        o.error(`Veuillez d'abord compléter votre profil.`);
        return;
      }
      g(!0);
      try {
        let n = K(u),
          i = [
            `Entreprise : ${e.entreprise}`,
            `Poste : ${e.poste}`,
            `Lieu : ${e.lieu}`,
            `Missions : ${e.missions}`,
            `Profil recherché : ${e.profilRecherche}`,
            `Texte complet : ${e.texte}`,
          ].join(`

`),
          a = await f({ data: { profil: n, offre: i, consigne: _ } }),
          s =
            typeof a == `string`
              ? a
              : typeof a == `object` && a && `lettre` in a
                ? String(a.lettre)
                : ``,
          c = {
            pitchAccroche:
              s
                .split(
                  `
`,
                )
                .filter((e) => e.trim().length > 0)
                .slice(0, 3).join(`
`) ||
              `Passionné par ce secteur, je souhaite apporter ma valeur ajoutée à vos projets.`,
            lettreMotivation: s,
            pointsAValoriser: t?.pointsForts || [
              `Alignement des compétences clés avec la fiche de poste`,
              `Capacité d'adaptation et autonomie démontrées`,
            ],
            motsClesAInserer: t?.competencesManquantes || [
              `Gestion de projet`,
              `Data / IA`,
              `Rigueur méthodologique`,
            ],
          };
        (r(c),
          X({
            type: `pitch`,
            titre: `Pitch & Lettre : ${e.poste || `Poste`} @ ${e.entreprise || `Entreprise`}`,
            sousTitre: `Lettre de motivation & points clés CV`,
            apercu: s.slice(0, 140),
            offreData: e,
            pitchData: c,
          }),
          o.success(`Lettre et pitch de candidature générés !`));
      } catch (e) {
        o.error(q(e));
      } finally {
        g(!1);
      }
    };
  return (0, Z.jsxs)(`div`, {
    className: `space-y-6`,
    children: [
      (0, Z.jsxs)(`div`, {
        className: `flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between`,
        children: [
          (0, Z.jsxs)(`div`, {
            children: [
              (0, Z.jsx)(`h3`, {
                className: `text-base font-semibold text-foreground`,
                children: `Étape 3 : CV & Pitch de candidature`,
              }),
              (0, Z.jsx)(`p`, {
                className: `text-xs text-muted-foreground`,
                children: `Adaptez vos arguments, extrayez les mots-clés ATS et générez une lettre de motivation sur-mesure.`,
              }),
            ],
          }),
          (0, Z.jsx)(s, {
            type: `button`,
            onClick: T,
            disabled: p,
            className: `h-8 gap-1.5 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90`,
            children: p
              ? (0, Z.jsxs)(Z.Fragment, {
                  children: [
                    (0, Z.jsx)(k, { className: `size-3.5 animate-spin` }),
                    (0, Z.jsx)(`span`, { children: `Rédaction en cours...` }),
                  ],
                })
              : (0, Z.jsxs)(Z.Fragment, {
                  children: [
                    (0, Z.jsx)(m, { className: `size-3.5` }),
                    (0, Z.jsx)(`span`, {
                      children: n
                        ? `Régénérer le Pitch`
                        : `Générer Lettre & Pitch`,
                    }),
                  ],
                }),
          }),
        ],
      }),
      (0, Z.jsxs)(`div`, {
        className: `flex items-center justify-between rounded-xl border border-border/60 bg-muted/30 px-3.5 py-2.5 text-xs`,
        children: [
          (0, Z.jsxs)(`div`, {
            className: `flex items-center gap-2 truncate`,
            children: [
              (0, Z.jsx)(h, { className: `size-4 text-primary shrink-0` }),
              (0, Z.jsx)(`span`, {
                className: `font-semibold text-foreground truncate`,
                children: e.poste || `Poste visé`,
              }),
              (0, Z.jsxs)(`span`, {
                className: `text-muted-foreground truncate`,
                children: [`@ `, e.entreprise || `Entreprise`],
              }),
            ],
          }),
          t &&
            (0, Z.jsxs)(V, {
              variant: `outline`,
              className: `border-primary/30 text-[10px] text-primary`,
              children: [`Match `, t.global, `%`],
            }),
        ],
      }),
      !n && !p
        ? (0, Z.jsxs)(`div`, {
            className: `rounded-2xl border border-dashed border-border/80 p-8 text-center`,
            children: [
              (0, Z.jsx)(d, {
                className: `mx-auto size-8 text-primary/70 mb-3`,
              }),
              (0, Z.jsx)(`h4`, {
                className: `text-sm font-semibold text-foreground`,
                children: `Prêt pour la personnalisation du CV & Pitch`,
              }),
              (0, Z.jsx)(`p`, {
                className: `mx-auto mt-1 max-w-md text-xs text-muted-foreground`,
                children: `L'IA va croiser vos réalisations avec les critères de l'offre pour rédiger une lettre percutante et extraire les points d'expérience à placer en haut de votre CV.`,
              }),
              (0, Z.jsxs)(`div`, {
                className: `mx-auto mt-4 max-w-sm space-y-2 text-left`,
                children: [
                  (0, Z.jsx)(`label`, {
                    className: `text-[11px] font-semibold text-muted-foreground`,
                    children: `Style ou consigne de rédaction :`,
                  }),
                  (0, Z.jsx)(P, {
                    value: _,
                    onChange: (e) => y(e.target.value),
                    placeholder: `Ex: Concis, axé sur mes chiffres clés...`,
                    className: `h-16 rounded-xl text-xs`,
                  }),
                ],
              }),
              (0, Z.jsxs)(s, {
                type: `button`,
                onClick: T,
                className: `mt-4 gap-2 rounded-xl bg-primary text-xs font-semibold text-primary-foreground`,
                children: [
                  (0, Z.jsx)(a, { className: `size-3.5` }),
                  (0, Z.jsx)(`span`, {
                    children: `Générer mes arguments & lettre`,
                  }),
                ],
              }),
            ],
          })
        : p
          ? (0, Z.jsxs)(`div`, {
              className: `flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-card/40 py-12 text-center`,
              children: [
                (0, Z.jsx)(k, {
                  className: `size-8 animate-spin text-primary mb-3`,
                }),
                (0, Z.jsx)(`p`, {
                  className: `text-sm font-semibold text-foreground`,
                  children: `Rédaction de vos arguments ciblés...`,
                }),
                (0, Z.jsx)(`p`, {
                  className: `mt-1 text-xs text-muted-foreground`,
                  children: `Valorisation de vos compétences et adaptation du ton à l'entreprise`,
                }),
              ],
            })
          : n
            ? (0, Z.jsxs)(B, {
                defaultValue: `lettre`,
                className: `w-full`,
                children: [
                  (0, Z.jsxs)(z, {
                    className: `grid w-full grid-cols-2 rounded-xl bg-muted/60 p-1`,
                    children: [
                      (0, Z.jsx)(L, {
                        value: `lettre`,
                        className: `rounded-lg text-xs`,
                        children: `Lettre de motivation`,
                      }),
                      (0, Z.jsx)(L, {
                        value: `cv_alignement`,
                        className: `rounded-lg text-xs`,
                        children: `Points clés à intégrer au CV`,
                      }),
                    ],
                  }),
                  (0, Z.jsx)(R, {
                    value: `lettre`,
                    className: `mt-4 space-y-3`,
                    children: (0, Z.jsxs)(`div`, {
                      className: `relative rounded-2xl border border-border/60 bg-card/80 p-4`,
                      children: [
                        (0, Z.jsxs)(`div`, {
                          className: `mb-2 flex items-center justify-between border-b border-border/40 pb-2`,
                          children: [
                            (0, Z.jsx)(`span`, {
                              className: `text-xs font-semibold text-foreground`,
                              children: `Lettre de motivation personnalisée`,
                            }),
                            (0, Z.jsx)(s, {
                              type: `button`,
                              variant: `ghost`,
                              size: `sm`,
                              onClick: () => w(n.lettreMotivation, `lettre`),
                              className: `h-7 gap-1 text-xs text-muted-foreground hover:text-foreground`,
                              children:
                                b === `lettre`
                                  ? (0, Z.jsxs)(Z.Fragment, {
                                      children: [
                                        (0, Z.jsx)(N, {
                                          className: `size-3.5 text-emerald-400`,
                                        }),
                                        (0, Z.jsx)(`span`, {
                                          children: `Copié`,
                                        }),
                                      ],
                                    })
                                  : (0, Z.jsxs)(Z.Fragment, {
                                      children: [
                                        (0, Z.jsx)(j, {
                                          className: `size-3.5`,
                                        }),
                                        (0, Z.jsx)(`span`, {
                                          children: `Copier la lettre`,
                                        }),
                                      ],
                                    }),
                            }),
                          ],
                        }),
                        (0, Z.jsx)(`div`, {
                          className: `max-h-[340px] overflow-y-auto whitespace-pre-line text-xs leading-relaxed text-foreground/90 pr-2`,
                          children: n.lettreMotivation,
                        }),
                      ],
                    }),
                  }),
                  (0, Z.jsx)(R, {
                    value: `cv_alignement`,
                    className: `mt-4 space-y-4`,
                    children: (0, Z.jsxs)(`div`, {
                      className: `grid gap-3 sm:grid-cols-2`,
                      children: [
                        (0, Z.jsxs)(`div`, {
                          className: `rounded-2xl border border-primary/20 bg-card/60 p-4`,
                          children: [
                            (0, Z.jsxs)(`div`, {
                              className: `mb-2.5 flex items-center gap-2 text-xs font-semibold text-primary`,
                              children: [
                                (0, Z.jsx)(S, { className: `size-4` }),
                                (0, Z.jsx)(`span`, {
                                  children: `Mettre en avant sur votre CV`,
                                }),
                              ],
                            }),
                            (0, Z.jsx)(`ul`, {
                              className: `space-y-2 text-xs text-muted-foreground`,
                              children: n.pointsAValoriser.map((e, t) =>
                                (0, Z.jsxs)(
                                  `li`,
                                  {
                                    className: `flex items-start gap-2`,
                                    children: [
                                      (0, Z.jsx)(`span`, {
                                        className: `mt-1 size-1.5 rounded-full bg-primary shrink-0`,
                                      }),
                                      (0, Z.jsx)(`span`, { children: e }),
                                    ],
                                  },
                                  t,
                                ),
                              ),
                            }),
                          ],
                        }),
                        (0, Z.jsxs)(`div`, {
                          className: `rounded-2xl border border-border/60 bg-card/60 p-4`,
                          children: [
                            (0, Z.jsxs)(`div`, {
                              className: `mb-2.5 flex items-center gap-2 text-xs font-semibold text-foreground`,
                              children: [
                                (0, Z.jsx)(F, {
                                  className: `size-4 text-amber-400`,
                                }),
                                (0, Z.jsx)(`span`, {
                                  children: `Mots-clés stratégiques (ATS)`,
                                }),
                              ],
                            }),
                            (0, Z.jsx)(`div`, {
                              className: `flex flex-wrap gap-1.5`,
                              children: n.motsClesAInserer.map((e, t) =>
                                (0, Z.jsx)(
                                  V,
                                  {
                                    variant: `outline`,
                                    className: `border-border bg-background/60 text-xs text-foreground`,
                                    children: e,
                                  },
                                  t,
                                ),
                              ),
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  (0, Z.jsxs)(`div`, {
                    className: `flex items-center justify-between pt-4`,
                    children: [
                      (0, Z.jsxs)(s, {
                        type: `button`,
                        variant: `outline`,
                        size: `sm`,
                        onClick: c,
                        className: `h-9 gap-1.5 rounded-xl border-border text-xs`,
                        children: [
                          (0, Z.jsx)(I, { className: `size-3.5` }),
                          (0, Z.jsx)(`span`, {
                            children: `Retour au Match IA`,
                          }),
                        ],
                      }),
                      (0, Z.jsxs)(s, {
                        type: `button`,
                        onClick: i,
                        className: `h-9 gap-2 rounded-xl bg-primary px-5 text-xs font-semibold text-primary-foreground shadow-md hover:bg-primary/90`,
                        children: [
                          (0, Z.jsx)(`span`, {
                            children: `Continuer : Écrire messages & relances`,
                          }),
                          (0, Z.jsx)(x, { className: `size-3.5` }),
                        ],
                      }),
                    ],
                  }),
                ],
              })
            : null,
    ],
  });
}
function ye({
  offreData: e,
  contactData: t,
  onChangeContactData: n,
  onNextStep: r,
  onPrevStep: c,
}) {
  let { user: l } = W(),
    d = U(l),
    f = v(ce),
    [p, g] = (0, J.useState)(!1),
    [y, b] = (0, J.useState)(null),
    S = (e, t) => {
      (navigator.clipboard.writeText(e),
        b(t),
        o.success(`Message copié dans le presse-papiers !`),
        setTimeout(() => b(null), 2e3));
    },
    C = async () => {
      if (!d) {
        o.error(`Veuillez d'abord compléter votre profil.`);
        return;
      }
      g(!0);
      try {
        let t = K(d),
          r = [
            `Entreprise : ${e.entreprise}`,
            `Poste : ${e.poste}`,
            `Lieu : ${e.lieu}`,
            `Missions : ${e.missions}`,
            `Contact : ${e.contactRecruteur}`,
          ].join(`
`),
          i = await f({
            data: {
              profil: t,
              offre: r,
              consigne: `Générer les messages d'approche LinkedIn et Email`,
            },
          }),
          a =
            i?.invitation ||
            `Bonjour, très intéressé par vos projets et l'opportunité de ${e.poste || `poste`} au sein de ${e.entreprise || `votre équipe`}, je serais ravi d'échanger avec vous.`,
          s = {
            noteLinkedin: a,
            messageLinkedin:
              i?.messageSuivi ||
              `Bonjour,\n\nJe me permets de vous contacter suite à l'offre de ${e.poste || `poste`} chez ${e.entreprise || `votre entreprise`}. Mon parcours récent correspond aux compétences recherchées. Seriez-vous ouvert à un court échange ?\n\nBien cordialement,\n${d.prenom || ``}`,
            emailCandidature: `Objet : Candidature — ${e.poste || `Poste`} — ${d.prenom || ``} ${d.nom || ``}\n\nMadame, Monsieur,\n\nActuellement à la recherche d'une opportunité en ${d.metiers || `mon domaine`}, c'est avec un grand intérêt que je vous transmets ma candidature pour le poste de ${e.poste || `ce poste`} au sein de ${e.entreprise || `votre entreprise`}.\n\nMon parcours m'a permis de développer une solide expertise sur vos enjeux clés. Vous trouverez ci-joint mon CV détaillé.\n\nRestant à votre disposition pour un entretien,\n\n${d.prenom || ``} ${d.nom || ``}\n${d.telephone || ``}`,
            emailRelance: `Objet : Suivi de ma candidature — ${e.poste || `Poste`} — ${d.prenom || ``} ${d.nom || ``}\n\nMadame, Monsieur,\n\nJe me permets de revenir vers vous concernant ma candidature au poste de ${e.poste || `ce poste`} envoyée récemment. Toujours particulièrement motivé par les projets de ${e.entreprise || `votre entreprise`}, je me tiens à votre disposition pour tout échange complémentaire.\n\nBien cordialement,\n${d.prenom || ``} ${d.nom || ``}`,
            conseilsApproche: i?.conseils || [
              `Personnalisez l'accroche avec le nom du recruteur ou un événement récent de l'entreprise.`,
              `Envoyez vos relances idéalement le mardi ou le jeudi matin vers 9h00.`,
              `Ajoutez votre lien LinkedIn ou votre portfolio en signature.`,
            ],
          };
        (n(s),
          X({
            type: `contact`,
            titre: `Messages : ${e.poste || `Poste`} @ ${e.entreprise || `Entreprise`}`,
            sousTitre: `Note LinkedIn & Emails personnalisés`,
            apercu: a,
            offreData: e,
            contactData: s,
          }),
          o.success(`Messages de contact & relance générés !`));
      } catch (e) {
        o.error(q(e));
      } finally {
        g(!1);
      }
    };
  return (0, Z.jsxs)(`div`, {
    className: `space-y-6`,
    children: [
      (0, Z.jsxs)(`div`, {
        className: `flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between`,
        children: [
          (0, Z.jsxs)(`div`, {
            children: [
              (0, Z.jsx)(`h3`, {
                className: `text-base font-semibold text-foreground`,
                children: `Étape 4 : Messages d'approche & Relances`,
              }),
              (0, Z.jsx)(`p`, {
                className: `text-xs text-muted-foreground`,
                children: `Générez des messages percutants adaptés aux recruteurs, managers et alumni sur LinkedIn et par email.`,
              }),
            ],
          }),
          (0, Z.jsx)(s, {
            type: `button`,
            onClick: C,
            disabled: p,
            className: `h-8 gap-1.5 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90`,
            children: p
              ? (0, Z.jsxs)(Z.Fragment, {
                  children: [
                    (0, Z.jsx)(k, { className: `size-3.5 animate-spin` }),
                    (0, Z.jsx)(`span`, { children: `Génération...` }),
                  ],
                })
              : (0, Z.jsxs)(Z.Fragment, {
                  children: [
                    (0, Z.jsx)(m, { className: `size-3.5` }),
                    (0, Z.jsx)(`span`, {
                      children: t
                        ? `Régénérer les messages`
                        : `Générer les messages`,
                    }),
                  ],
                }),
          }),
        ],
      }),
      (0, Z.jsxs)(`div`, {
        className: `flex items-center justify-between rounded-xl border border-border/60 bg-muted/30 px-3.5 py-2.5 text-xs`,
        children: [
          (0, Z.jsxs)(`div`, {
            className: `flex items-center gap-2 truncate`,
            children: [
              (0, Z.jsx)(h, { className: `size-4 text-primary shrink-0` }),
              (0, Z.jsx)(`span`, {
                className: `font-semibold text-foreground truncate`,
                children: e.poste || `Poste visé`,
              }),
              (0, Z.jsxs)(`span`, {
                className: `text-muted-foreground truncate`,
                children: [`@ `, e.entreprise || `Entreprise`],
              }),
            ],
          }),
          e.contactRecruteur &&
            (0, Z.jsxs)(`span`, {
              className: `text-[11px] text-muted-foreground truncate`,
              children: [`Contact : `, e.contactRecruteur],
            }),
        ],
      }),
      !t && !p
        ? (0, Z.jsxs)(`div`, {
            className: `rounded-2xl border border-dashed border-border/80 p-8 text-center`,
            children: [
              (0, Z.jsx)(_, {
                className: `mx-auto size-8 text-primary/70 mb-3`,
              }),
              (0, Z.jsx)(`h4`, {
                className: `text-sm font-semibold text-foreground`,
                children: `Prêt pour la génération des messages`,
              }),
              (0, Z.jsx)(`p`, {
                className: `mx-auto mt-1 max-w-md text-xs text-muted-foreground`,
                children: `L'IA va composer une note LinkedIn optimisée pour la limite de 300 caractères, un message d'approche direct, ainsi que les modèles d'emails de candidature et de relance.`,
              }),
              (0, Z.jsxs)(s, {
                type: `button`,
                onClick: C,
                className: `mt-4 gap-2 rounded-xl bg-primary text-xs font-semibold text-primary-foreground`,
                children: [
                  (0, Z.jsx)(a, { className: `size-3.5` }),
                  (0, Z.jsx)(`span`, {
                    children: `Générer mes modèles de contact`,
                  }),
                ],
              }),
            ],
          })
        : p
          ? (0, Z.jsxs)(`div`, {
              className: `flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-card/40 py-12 text-center`,
              children: [
                (0, Z.jsx)(k, {
                  className: `size-8 animate-spin text-primary mb-3`,
                }),
                (0, Z.jsx)(`p`, {
                  className: `text-sm font-semibold text-foreground`,
                  children: `Rédaction des messages et notes LinkedIn...`,
                }),
                (0, Z.jsx)(`p`, {
                  className: `mt-1 text-xs text-muted-foreground`,
                  children: `Optimisation du copywriting et des phrases d'accroche`,
                }),
              ],
            })
          : t
            ? (0, Z.jsxs)(B, {
                defaultValue: `note_linkedin`,
                className: `w-full`,
                children: [
                  (0, Z.jsxs)(z, {
                    className: `grid w-full grid-cols-4 rounded-xl bg-muted/60 p-1`,
                    children: [
                      (0, Z.jsx)(L, {
                        value: `note_linkedin`,
                        className: `rounded-lg text-xs`,
                        children: `Note LinkedIn (300 car.)`,
                      }),
                      (0, Z.jsx)(L, {
                        value: `message_linkedin`,
                        className: `rounded-lg text-xs`,
                        children: `Message LinkedIn`,
                      }),
                      (0, Z.jsx)(L, {
                        value: `email_candidature`,
                        className: `rounded-lg text-xs`,
                        children: `Email Candidature`,
                      }),
                      (0, Z.jsx)(L, {
                        value: `email_relance`,
                        className: `rounded-lg text-xs`,
                        children: `Email Relance (J+7)`,
                      }),
                    ],
                  }),
                  (0, Z.jsx)(R, {
                    value: `note_linkedin`,
                    className: `mt-4 space-y-3`,
                    children: (0, Z.jsxs)(`div`, {
                      className: `rounded-2xl border border-sky-500/30 bg-card/80 p-4`,
                      children: [
                        (0, Z.jsxs)(`div`, {
                          className: `mb-2 flex items-center justify-between border-b border-border/40 pb-2`,
                          children: [
                            (0, Z.jsxs)(`div`, {
                              className: `flex items-center gap-2`,
                              children: [
                                (0, Z.jsx)(u, {
                                  className: `size-4 text-sky-400`,
                                }),
                                (0, Z.jsx)(`span`, {
                                  className: `text-xs font-semibold text-foreground`,
                                  children: `Demande de connexion LinkedIn`,
                                }),
                                (0, Z.jsxs)(V, {
                                  variant: `outline`,
                                  className: `text-[10px]`,
                                  children: [
                                    t.noteLinkedin.length,
                                    `/300 caractères`,
                                  ],
                                }),
                              ],
                            }),
                            (0, Z.jsx)(s, {
                              type: `button`,
                              variant: `ghost`,
                              size: `sm`,
                              onClick: () => S(t.noteLinkedin, `note_linkedin`),
                              className: `h-7 gap-1 text-xs text-muted-foreground hover:text-foreground`,
                              children:
                                y === `note_linkedin`
                                  ? (0, Z.jsxs)(Z.Fragment, {
                                      children: [
                                        (0, Z.jsx)(N, {
                                          className: `size-3.5 text-emerald-400`,
                                        }),
                                        (0, Z.jsx)(`span`, {
                                          children: `Copié`,
                                        }),
                                      ],
                                    })
                                  : (0, Z.jsxs)(Z.Fragment, {
                                      children: [
                                        (0, Z.jsx)(j, {
                                          className: `size-3.5`,
                                        }),
                                        (0, Z.jsx)(`span`, {
                                          children: `Copier`,
                                        }),
                                      ],
                                    }),
                            }),
                          ],
                        }),
                        (0, Z.jsx)(`p`, {
                          className: `whitespace-pre-line text-xs leading-relaxed text-foreground`,
                          children: t.noteLinkedin,
                        }),
                      ],
                    }),
                  }),
                  (0, Z.jsx)(R, {
                    value: `message_linkedin`,
                    className: `mt-4 space-y-3`,
                    children: (0, Z.jsxs)(`div`, {
                      className: `rounded-2xl border border-sky-500/30 bg-card/80 p-4`,
                      children: [
                        (0, Z.jsxs)(`div`, {
                          className: `mb-2 flex items-center justify-between border-b border-border/40 pb-2`,
                          children: [
                            (0, Z.jsxs)(`div`, {
                              className: `flex items-center gap-2`,
                              children: [
                                (0, Z.jsx)(u, {
                                  className: `size-4 text-sky-400`,
                                }),
                                (0, Z.jsx)(`span`, {
                                  className: `text-xs font-semibold text-foreground`,
                                  children: `Message d'approche InMail / Connexion`,
                                }),
                              ],
                            }),
                            (0, Z.jsx)(s, {
                              type: `button`,
                              variant: `ghost`,
                              size: `sm`,
                              onClick: () =>
                                S(t.messageLinkedin, `message_linkedin`),
                              className: `h-7 gap-1 text-xs text-muted-foreground hover:text-foreground`,
                              children:
                                y === `message_linkedin`
                                  ? (0, Z.jsxs)(Z.Fragment, {
                                      children: [
                                        (0, Z.jsx)(N, {
                                          className: `size-3.5 text-emerald-400`,
                                        }),
                                        (0, Z.jsx)(`span`, {
                                          children: `Copié`,
                                        }),
                                      ],
                                    })
                                  : (0, Z.jsxs)(Z.Fragment, {
                                      children: [
                                        (0, Z.jsx)(j, {
                                          className: `size-3.5`,
                                        }),
                                        (0, Z.jsx)(`span`, {
                                          children: `Copier`,
                                        }),
                                      ],
                                    }),
                            }),
                          ],
                        }),
                        (0, Z.jsx)(`div`, {
                          className: `whitespace-pre-line text-xs leading-relaxed text-foreground`,
                          children: t.messageLinkedin,
                        }),
                      ],
                    }),
                  }),
                  (0, Z.jsx)(R, {
                    value: `email_candidature`,
                    className: `mt-4 space-y-3`,
                    children: (0, Z.jsxs)(`div`, {
                      className: `rounded-2xl border border-border/60 bg-card/80 p-4`,
                      children: [
                        (0, Z.jsxs)(`div`, {
                          className: `mb-2 flex items-center justify-between border-b border-border/40 pb-2`,
                          children: [
                            (0, Z.jsxs)(`div`, {
                              className: `flex items-center gap-2`,
                              children: [
                                (0, Z.jsx)(i, {
                                  className: `size-4 text-amber-400`,
                                }),
                                (0, Z.jsx)(`span`, {
                                  className: `text-xs font-semibold text-foreground`,
                                  children: `Email officiel de candidature`,
                                }),
                              ],
                            }),
                            (0, Z.jsx)(s, {
                              type: `button`,
                              variant: `ghost`,
                              size: `sm`,
                              onClick: () =>
                                S(t.emailCandidature, `email_candidature`),
                              className: `h-7 gap-1 text-xs text-muted-foreground hover:text-foreground`,
                              children:
                                y === `email_candidature`
                                  ? (0, Z.jsxs)(Z.Fragment, {
                                      children: [
                                        (0, Z.jsx)(N, {
                                          className: `size-3.5 text-emerald-400`,
                                        }),
                                        (0, Z.jsx)(`span`, {
                                          children: `Copié`,
                                        }),
                                      ],
                                    })
                                  : (0, Z.jsxs)(Z.Fragment, {
                                      children: [
                                        (0, Z.jsx)(j, {
                                          className: `size-3.5`,
                                        }),
                                        (0, Z.jsx)(`span`, {
                                          children: `Copier`,
                                        }),
                                      ],
                                    }),
                            }),
                          ],
                        }),
                        (0, Z.jsx)(`div`, {
                          className: `whitespace-pre-line text-xs leading-relaxed text-foreground`,
                          children: t.emailCandidature,
                        }),
                      ],
                    }),
                  }),
                  (0, Z.jsx)(R, {
                    value: `email_relance`,
                    className: `mt-4 space-y-3`,
                    children: (0, Z.jsxs)(`div`, {
                      className: `rounded-2xl border border-border/60 bg-card/80 p-4`,
                      children: [
                        (0, Z.jsxs)(`div`, {
                          className: `mb-2 flex items-center justify-between border-b border-border/40 pb-2`,
                          children: [
                            (0, Z.jsxs)(`div`, {
                              className: `flex items-center gap-2`,
                              children: [
                                (0, Z.jsx)(i, {
                                  className: `size-4 text-primary`,
                                }),
                                (0, Z.jsx)(`span`, {
                                  className: `text-xs font-semibold text-foreground`,
                                  children: `Email de relance à J+7 / J+10`,
                                }),
                              ],
                            }),
                            (0, Z.jsx)(s, {
                              type: `button`,
                              variant: `ghost`,
                              size: `sm`,
                              onClick: () => S(t.emailRelance, `email_relance`),
                              className: `h-7 gap-1 text-xs text-muted-foreground hover:text-foreground`,
                              children:
                                y === `email_relance`
                                  ? (0, Z.jsxs)(Z.Fragment, {
                                      children: [
                                        (0, Z.jsx)(N, {
                                          className: `size-3.5 text-emerald-400`,
                                        }),
                                        (0, Z.jsx)(`span`, {
                                          children: `Copié`,
                                        }),
                                      ],
                                    })
                                  : (0, Z.jsxs)(Z.Fragment, {
                                      children: [
                                        (0, Z.jsx)(j, {
                                          className: `size-3.5`,
                                        }),
                                        (0, Z.jsx)(`span`, {
                                          children: `Copier`,
                                        }),
                                      ],
                                    }),
                            }),
                          ],
                        }),
                        (0, Z.jsx)(`div`, {
                          className: `whitespace-pre-line text-xs leading-relaxed text-foreground`,
                          children: t.emailRelance,
                        }),
                      ],
                    }),
                  }),
                  (0, Z.jsxs)(`div`, {
                    className: `flex items-center justify-between pt-4`,
                    children: [
                      (0, Z.jsxs)(s, {
                        type: `button`,
                        variant: `outline`,
                        size: `sm`,
                        onClick: c,
                        className: `h-9 gap-1.5 rounded-xl border-border text-xs`,
                        children: [
                          (0, Z.jsx)(I, { className: `size-3.5` }),
                          (0, Z.jsx)(`span`, {
                            children: `Retour au CV & Pitch`,
                          }),
                        ],
                      }),
                      (0, Z.jsxs)(s, {
                        type: `button`,
                        onClick: r,
                        className: `h-9 gap-2 rounded-xl bg-primary px-5 text-xs font-semibold text-primary-foreground shadow-md hover:bg-primary/90`,
                        children: [
                          (0, Z.jsx)(`span`, {
                            children: `Continuer : Interview Coach`,
                          }),
                          (0, Z.jsx)(x, { className: `size-3.5` }),
                        ],
                      }),
                    ],
                  }),
                ],
              })
            : null,
    ],
  });
}
function be({
  offreData: e,
  interviewData: t,
  onChangeInterviewData: n,
  onPrevStep: r,
  onFinishWorkflow: i,
}) {
  let { user: c } = W(),
    l = U(c),
    u = v(le),
    [d, f] = (0, J.useState)(!1),
    p = async () => {
      if (!l) {
        o.error(`Veuillez d'abord compléter votre profil.`);
        return;
      }
      f(!0);
      try {
        let t = K(l),
          r = [
            `Entreprise : ${e.entreprise}`,
            `Poste : ${e.poste}`,
            `Lieu : ${e.lieu}`,
            `Missions : ${e.missions}`,
            `Profil recherché : ${e.profilRecherche}`,
          ].join(`
`),
          i = await u({
            data: {
              profil: t,
              offre: r,
              consigne: `Préparation d'entretien structurée STAR`,
            },
          }),
          a = i?.questions || [
            {
              question: `Parlez-moi de vous et pourquoi postuler chez ${e.entreprise || `nous`} ?`,
              categorie: `Fit & Motivation`,
              pistes: [
                `Résumez votre parcours en 3 étapes claires.`,
                `Expliquez le déclic pour cette entreprise précise.`,
                `Terminez par ce que vous apporterez immédiatement.`,
              ],
            },
            {
              question: `Comment abordez-vous les missions de ${e.poste || `ce poste`} ?`,
              categorie: `Technique & Organisation`,
              pistes: [
                `Citez une situation passée similaire (S).`,
                `Décrivez la tâche et vos actions concrètes (T/A).`,
                `Concluez avec les résultats quantifiés obtenus (R).`,
              ],
            },
          ],
          s = {
            questions: a,
            argumentsCles: i?.argumentsCles || [
              `Capacité éprouvée à mener des projets en autonomie`,
              `Expertise sectorielle et méthodologie rigoureuse`,
              `Dynamisme et fort esprit d'équipe`,
            ],
            pointsFaibles: i?.pointsFaibles || [
              `Anticipez les questions sur vos axes de progrès techniques`,
              `Soyez clair sur vos disponibilités et vos attentes de formation`,
            ],
            questionsARecruteur: i?.questionsARecruteur || [
              `Quels seront les principaux défis de l'équipe sur les 6 prochains mois ?`,
              `À quoi ressemblera une semaine type pour ce poste chez ${e.entreprise || `vous`} ?`,
              `Quelles sont les opportunités d'apprentissage et d'évolution ?`,
            ],
          };
        (n(s),
          X({
            type: `interview`,
            titre: `Interview Coach : ${e.poste || `Poste`} @ ${e.entreprise || `Entreprise`}`,
            sousTitre: `${a.length} questions STAR & arguments préparés`,
            apercu: a[0]?.question || `Simulation d'entretien`,
            offreData: e,
            interviewData: s,
          }),
          o.success(`Simulation d'entretien et arguments générés !`));
      } catch (e) {
        o.error(q(e));
      } finally {
        f(!1);
      }
    };
  return (0, Z.jsxs)(`div`, {
    className: `space-y-6`,
    children: [
      (0, Z.jsxs)(`div`, {
        className: `flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between`,
        children: [
          (0, Z.jsxs)(`div`, {
            children: [
              (0, Z.jsx)(`h3`, {
                className: `text-base font-semibold text-foreground`,
                children: `Étape 5 : Interview Coach & Questions STAR`,
              }),
              (0, Z.jsx)(`p`, {
                className: `text-xs text-muted-foreground`,
                children: `Anticipez les questions pièges, préparez des réponses structurées STAR et vos questions au recruteur.`,
              }),
            ],
          }),
          (0, Z.jsx)(s, {
            type: `button`,
            onClick: p,
            disabled: d,
            className: `h-8 gap-1.5 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90`,
            children: d
              ? (0, Z.jsxs)(Z.Fragment, {
                  children: [
                    (0, Z.jsx)(k, { className: `size-3.5 animate-spin` }),
                    (0, Z.jsx)(`span`, { children: `Entraînement...` }),
                  ],
                })
              : (0, Z.jsxs)(Z.Fragment, {
                  children: [
                    (0, Z.jsx)(m, { className: `size-3.5` }),
                    (0, Z.jsx)(`span`, {
                      children: t
                        ? `Régénérer la simulation`
                        : `Lancer le Coach IA`,
                    }),
                  ],
                }),
          }),
        ],
      }),
      (0, Z.jsx)(`div`, {
        className: `flex items-center justify-between rounded-xl border border-border/60 bg-muted/30 px-3.5 py-2.5 text-xs`,
        children: (0, Z.jsxs)(`div`, {
          className: `flex items-center gap-2 truncate`,
          children: [
            (0, Z.jsx)(h, { className: `size-4 text-primary shrink-0` }),
            (0, Z.jsx)(`span`, {
              className: `font-semibold text-foreground truncate`,
              children: e.poste || `Poste visé`,
            }),
            (0, Z.jsxs)(`span`, {
              className: `text-muted-foreground truncate`,
              children: [`@ `, e.entreprise || `Entreprise`],
            }),
          ],
        }),
      }),
      !t && !d
        ? (0, Z.jsxs)(`div`, {
            className: `rounded-2xl border border-dashed border-border/80 p-8 text-center`,
            children: [
              (0, Z.jsx)(D, {
                className: `mx-auto size-8 text-primary/70 mb-3`,
              }),
              (0, Z.jsx)(`h4`, {
                className: `text-sm font-semibold text-foreground`,
                children: `Prêt pour la simulation d'entretien`,
              }),
              (0, Z.jsx)(`p`, {
                className: `mx-auto mt-1 max-w-md text-xs text-muted-foreground`,
                children: `L'IA va extraire les questions les plus probables pour ce poste et construire pour vous des trames de réponses selon la méthode STAR.`,
              }),
              (0, Z.jsxs)(s, {
                type: `button`,
                onClick: p,
                className: `mt-4 gap-2 rounded-xl bg-primary text-xs font-semibold text-primary-foreground`,
                children: [
                  (0, Z.jsx)(a, { className: `size-3.5` }),
                  (0, Z.jsx)(`span`, {
                    children: `Simuler mon entretien d'embauche`,
                  }),
                ],
              }),
            ],
          })
        : d
          ? (0, Z.jsxs)(`div`, {
              className: `flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-card/40 py-12 text-center`,
              children: [
                (0, Z.jsx)(k, {
                  className: `size-8 animate-spin text-primary mb-3`,
                }),
                (0, Z.jsx)(`p`, {
                  className: `text-sm font-semibold text-foreground`,
                  children: `Construction des scénarios d'entretien...`,
                }),
                (0, Z.jsx)(`p`, {
                  className: `mt-1 text-xs text-muted-foreground`,
                  children: `Génération des questions techniques, comportementales et pièges`,
                }),
              ],
            })
          : t
            ? (0, Z.jsxs)(`div`, {
                className: `space-y-4`,
                children: [
                  (0, Z.jsxs)(B, {
                    defaultValue: `questions`,
                    className: `w-full`,
                    children: [
                      (0, Z.jsxs)(z, {
                        className: `grid w-full grid-cols-3 rounded-xl bg-muted/60 p-1`,
                        children: [
                          (0, Z.jsxs)(L, {
                            value: `questions`,
                            className: `rounded-lg text-xs`,
                            children: [
                              `Questions probables & STAR (`,
                              t.questions.length,
                              `)`,
                            ],
                          }),
                          (0, Z.jsx)(L, {
                            value: `arguments`,
                            className: `rounded-lg text-xs`,
                            children: `Arguments clés & vigilance`,
                          }),
                          (0, Z.jsx)(L, {
                            value: `questions_recruteur`,
                            className: `rounded-lg text-xs`,
                            children: `Questions au recruteur`,
                          }),
                        ],
                      }),
                      (0, Z.jsx)(R, {
                        value: `questions`,
                        className: `mt-4 space-y-3`,
                        children: (0, Z.jsx)(pe, {
                          type: `single`,
                          collapsible: !0,
                          className: `w-full space-y-2`,
                          children: t.questions.map((e, t) =>
                            (0, Z.jsxs)(
                              fe,
                              {
                                value: `item-${t}`,
                                className: `rounded-xl border border-border/60 bg-card/60 px-3.5`,
                                children: [
                                  (0, Z.jsx)(ue, {
                                    className: `py-3 text-left text-xs font-semibold hover:no-underline`,
                                    children: (0, Z.jsxs)(`div`, {
                                      className: `flex items-center gap-2 pr-2`,
                                      children: [
                                        (0, Z.jsx)(V, {
                                          variant: `outline`,
                                          className: `text-[10px] text-primary shrink-0`,
                                          children: e.categorie || `Question`,
                                        }),
                                        (0, Z.jsx)(`span`, {
                                          className: `text-foreground`,
                                          children: e.question,
                                        }),
                                      ],
                                    }),
                                  }),
                                  (0, Z.jsxs)(de, {
                                    className: `pb-3 pt-1 text-xs text-muted-foreground border-t border-border/40`,
                                    children: [
                                      (0, Z.jsx)(`p`, {
                                        className: `font-semibold text-foreground mb-1.5 text-[11px]`,
                                        children: `Pistes de réponse structurées (Méthode STAR) :`,
                                      }),
                                      (0, Z.jsx)(`ul`, {
                                        className: `space-y-1.5 pl-1`,
                                        children: e.pistes.map((e, t) =>
                                          (0, Z.jsxs)(
                                            `li`,
                                            {
                                              className: `flex items-start gap-2`,
                                              children: [
                                                (0, Z.jsx)(`span`, {
                                                  className: `mt-1 size-1.5 rounded-full bg-primary shrink-0`,
                                                }),
                                                (0, Z.jsx)(`span`, {
                                                  children: e,
                                                }),
                                              ],
                                            },
                                            t,
                                          ),
                                        ),
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              t,
                            ),
                          ),
                        }),
                      }),
                      (0, Z.jsx)(R, {
                        value: `arguments`,
                        className: `mt-4 space-y-3`,
                        children: (0, Z.jsxs)(`div`, {
                          className: `grid gap-3 sm:grid-cols-2`,
                          children: [
                            (0, Z.jsxs)(`div`, {
                              className: `rounded-2xl border border-primary/20 bg-card/60 p-4`,
                              children: [
                                (0, Z.jsxs)(`div`, {
                                  className: `mb-2.5 flex items-center gap-2 text-xs font-semibold text-primary`,
                                  children: [
                                    (0, Z.jsx)(a, { className: `size-4` }),
                                    (0, Z.jsx)(`span`, {
                                      children: `Arguments décisifs à placer`,
                                    }),
                                  ],
                                }),
                                (0, Z.jsx)(`ul`, {
                                  className: `space-y-2 text-xs text-muted-foreground`,
                                  children: t.argumentsCles.map((e, t) =>
                                    (0, Z.jsxs)(
                                      `li`,
                                      {
                                        className: `flex items-start gap-2`,
                                        children: [
                                          (0, Z.jsx)(`span`, {
                                            className: `mt-1 size-1.5 rounded-full bg-primary shrink-0`,
                                          }),
                                          (0, Z.jsx)(`span`, { children: e }),
                                        ],
                                      },
                                      t,
                                    ),
                                  ),
                                }),
                              ],
                            }),
                            (0, Z.jsxs)(`div`, {
                              className: `rounded-2xl border border-amber-500/20 bg-card/60 p-4`,
                              children: [
                                (0, Z.jsxs)(`div`, {
                                  className: `mb-2.5 flex items-center gap-2 text-xs font-semibold text-amber-400`,
                                  children: [
                                    (0, Z.jsx)(T, { className: `size-4` }),
                                    (0, Z.jsx)(`span`, {
                                      children: `Points de vigilance`,
                                    }),
                                  ],
                                }),
                                (0, Z.jsx)(`ul`, {
                                  className: `space-y-2 text-xs text-muted-foreground`,
                                  children: t.pointsFaibles.map((e, t) =>
                                    (0, Z.jsxs)(
                                      `li`,
                                      {
                                        className: `flex items-start gap-2`,
                                        children: [
                                          (0, Z.jsx)(`span`, {
                                            className: `mt-1 size-1.5 rounded-full bg-amber-400 shrink-0`,
                                          }),
                                          (0, Z.jsx)(`span`, { children: e }),
                                        ],
                                      },
                                      t,
                                    ),
                                  ),
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                      (0, Z.jsx)(R, {
                        value: `questions_recruteur`,
                        className: `mt-4 space-y-3`,
                        children: (0, Z.jsxs)(`div`, {
                          className: `rounded-2xl border border-border/60 bg-card/60 p-4`,
                          children: [
                            (0, Z.jsxs)(`div`, {
                              className: `mb-3 flex items-center gap-2 text-xs font-semibold text-foreground`,
                              children: [
                                (0, Z.jsx)(me, {
                                  className: `size-4 text-primary`,
                                }),
                                (0, Z.jsx)(`span`, {
                                  children: `Questions stratégiques à poser à la fin de l'entretien`,
                                }),
                              ],
                            }),
                            (0, Z.jsx)(`ul`, {
                              className: `space-y-2 text-xs text-muted-foreground`,
                              children: t.questionsARecruteur.map((e, t) =>
                                (0, Z.jsxs)(
                                  `li`,
                                  {
                                    className: `flex items-start gap-2 rounded-xl bg-background/50 p-2.5`,
                                    children: [
                                      (0, Z.jsxs)(`span`, {
                                        className: `font-bold text-primary`,
                                        children: [t + 1, `.`],
                                      }),
                                      (0, Z.jsx)(`span`, {
                                        className: `text-foreground`,
                                        children: e,
                                      }),
                                    ],
                                  },
                                  t,
                                ),
                              ),
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                  (0, Z.jsxs)(`div`, {
                    className: `flex items-center justify-between pt-4`,
                    children: [
                      (0, Z.jsxs)(s, {
                        type: `button`,
                        variant: `outline`,
                        size: `sm`,
                        onClick: r,
                        className: `h-9 gap-1.5 rounded-xl border-border text-xs`,
                        children: [
                          (0, Z.jsx)(I, { className: `size-3.5` }),
                          (0, Z.jsx)(`span`, {
                            children: `Retour à la prise de contact`,
                          }),
                        ],
                      }),
                      i &&
                        (0, Z.jsxs)(s, {
                          type: `button`,
                          onClick: i,
                          className: `h-9 gap-2 rounded-xl bg-emerald-600 px-5 text-xs font-semibold text-white shadow-md hover:bg-emerald-700`,
                          children: [
                            (0, Z.jsx)(M, { className: `size-3.5` }),
                            (0, Z.jsx)(`span`, {
                              children: `Workflow complet terminé`,
                            }),
                          ],
                        }),
                    ],
                  }),
                ],
              })
            : null,
    ],
  });
}
var xe = [
    {
      id: `offre`,
      num: 1,
      label: `1. Offre & Missions`,
      shortLabel: `Offre`,
      icon: he,
    },
    { id: `match`, num: 2, label: `2. Match IA`, shortLabel: `Match`, icon: a },
    {
      id: `pitch`,
      num: 3,
      label: `3. CV & Pitch`,
      shortLabel: `CV & Pitch`,
      icon: m,
    },
    {
      id: `contact`,
      num: 4,
      label: `4. Prise de contact`,
      shortLabel: `Contact`,
      icon: u,
    },
    {
      id: `interview`,
      num: 5,
      label: `5. Interview Coach`,
      shortLabel: `Coach`,
      icon: _,
    },
  ],
  $ = {
    texte: ``,
    entreprise: ``,
    poste: ``,
    lieu: ``,
    lien: ``,
    dateLimite: ``,
    missions: ``,
    profilRecherche: ``,
    secteur: ``,
    priorite: `auto`,
    contactRecruteur: ``,
  };
function Se({
  candidature: e,
  initialStep: t = `offre`,
  preloadedOffre: n,
  onChangeCandidature: r,
  onUpdateCandidature: i,
  onDone: a,
}) {
  let [o, c] = (0, J.useState)(t),
    [l, u] = (0, J.useState)(() =>
      e
        ? {
            texte: e.detail || ``,
            entreprise: e.entreprise || ``,
            poste: e.poste || ``,
            lieu: e.lieu || ``,
            lien: e.lien || ``,
            dateLimite: e.dateLimite || ``,
            missions: e.missions || ``,
            profilRecherche: e.profilRecherche || ``,
            secteur: e.secteur || ``,
            priorite: e.priorite || `auto`,
            contactRecruteur: e.contact || ``,
          }
        : { ...$, ...n },
    ),
    [d, p] = (0, J.useState)(void 0),
    [m, h] = (0, J.useState)(void 0),
    [g, _] = (0, J.useState)(void 0),
    [v, y] = (0, J.useState)(void 0);
  (0, J.useEffect)(() => {
    e &&
      (u({
        texte: e.detail || ``,
        entreprise: e.entreprise || ``,
        poste: e.poste || ``,
        lieu: e.lieu || ``,
        lien: e.lien || ``,
        dateLimite: e.dateLimite || ``,
        missions: e.missions || ``,
        profilRecherche: e.profilRecherche || ``,
        secteur: e.secteur || ``,
        priorite: e.priorite || `auto`,
        contactRecruteur: e.contact || ``,
      }),
      e.match &&
        p({
          scoreGlobal: e.match.global,
          pointsForts: e.match.pointsForts || [],
          pointsVigilance: e.match.vigilance || [],
          competencesCles: e.match.details?.map((e) => e.critere) || [],
          explication: e.match.explication || ``,
          recommandation:
            e.match.global >= 70
              ? `Candidature fortement recommandée`
              : e.match.global >= 50
                ? `Candidature possible sous réserve d'adaptation`
                : `Écarts importants constatés`,
        }),
      e.workflowProgress?.currentStep && c(e.workflowProgress.currentStep));
  }, [e]);
  let b = () => {
      r ? r() : (u($), p(void 0), h(void 0), _(void 0), y(void 0), c(`offre`));
    },
    x = (e) => {
      switch (e) {
        case `offre`:
          return !!(l.entreprise || l.poste || l.missions);
        case `match`:
          return !!d;
        case `pitch`:
          return !!m;
        case `contact`:
          return !!g;
        case `interview`:
          return !!v;
      }
    };
  return (0, Z.jsxs)(`div`, {
    className: `space-y-6 rounded-3xl border border-primary/20 bg-card/50 p-4 sm:p-6 shadow-xl backdrop-blur-xl`,
    children: [
      e &&
        (0, Z.jsxs)(`div`, {
          className: `flex flex-col gap-2 rounded-2xl border border-primary/30 bg-primary/10 p-3.5 sm:flex-row sm:items-center sm:justify-between`,
          children: [
            (0, Z.jsxs)(`div`, {
              className: `flex items-center gap-3`,
              children: [
                (0, Z.jsx)(`div`, {
                  className: `grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-sm`,
                  children: (0, Z.jsx)(f, { className: `size-4` }),
                }),
                (0, Z.jsxs)(`div`, {
                  children: [
                    (0, Z.jsxs)(`div`, {
                      className: `flex items-center gap-2`,
                      children: [
                        (0, Z.jsx)(`h3`, {
                          className: `text-sm font-bold text-foreground`,
                          children: e.entreprise,
                        }),
                        (0, Z.jsx)(`span`, {
                          className: `text-xs text-muted-foreground`,
                          children: `•`,
                        }),
                        (0, Z.jsx)(`span`, {
                          className: `text-xs font-medium text-foreground`,
                          children: e.poste,
                        }),
                      ],
                    }),
                    (0, Z.jsxs)(`p`, {
                      className: `text-[11px] text-muted-foreground`,
                      children: [
                        `Contexte chargé automatiquement • Statut : `,
                        e.statut,
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, Z.jsxs)(s, {
              type: `button`,
              variant: `outline`,
              size: `sm`,
              onClick: b,
              className: `h-8 gap-1.5 rounded-xl border-primary/30 text-xs font-medium text-primary hover:bg-primary/15`,
              children: [
                (0, Z.jsx)(O, { className: `size-3.5` }),
                (0, Z.jsx)(`span`, { children: `Changer d'opportunité` }),
              ],
            }),
          ],
        }),
      (0, Z.jsxs)(`div`, {
        className: `flex flex-col gap-4 border-b border-border/50 pb-5`,
        children: [
          (0, Z.jsxs)(`div`, {
            className: `flex flex-wrap items-center justify-between gap-3`,
            children: [
              (0, Z.jsxs)(`div`, {
                children: [
                  (0, Z.jsxs)(`div`, {
                    className: `flex items-center gap-2`,
                    children: [
                      (0, Z.jsx)(`span`, {
                        className: `flex size-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary`,
                        children: `✦`,
                      }),
                      (0, Z.jsx)(`h2`, {
                        className: `text-sm font-semibold tracking-tight text-foreground sm:text-base`,
                        children: `Workflow IA Candidature`,
                      }),
                      l.poste &&
                        !e &&
                        (0, Z.jsx)(V, {
                          variant: `outline`,
                          className: `text-[11px] border-primary/30 text-primary`,
                          children: l.poste,
                        }),
                    ],
                  }),
                  (0, Z.jsx)(`p`, {
                    className: `mt-0.5 text-xs text-muted-foreground`,
                    children: `Guide complet de l'analyse d'une offre jusqu'à la simulation d'entretien.`,
                  }),
                ],
              }),
              !e &&
                (0, Z.jsxs)(s, {
                  type: `button`,
                  variant: `ghost`,
                  size: `sm`,
                  onClick: b,
                  className: `h-8 gap-1.5 rounded-xl text-xs text-muted-foreground hover:text-foreground`,
                  children: [
                    (0, Z.jsx)(O, { className: `size-3.5` }),
                    (0, Z.jsx)(`span`, { children: `Réinitialiser` }),
                  ],
                }),
            ],
          }),
          (0, Z.jsx)(`div`, {
            className: `grid grid-cols-5 gap-1.5 sm:gap-2`,
            children: xe.map((e) => {
              let t = o === e.id,
                n = x(e.id),
                r = e.icon;
              return (0, Z.jsxs)(
                `button`,
                {
                  type: `button`,
                  onClick: () => c(e.id),
                  className: `group relative flex flex-col items-center justify-center rounded-2xl border p-2 sm:p-3 text-center transition-all ${t ? `border-primary bg-primary/15 shadow-sm ring-1 ring-primary/40 text-foreground` : n ? `border-border/70 bg-card/70 hover:border-primary/40 text-muted-foreground hover:text-foreground` : `border-border/40 bg-card/30 opacity-70 hover:opacity-100 text-muted-foreground`}`,
                  children: [
                    (0, Z.jsx)(`div`, {
                      className: `mb-1 flex items-center justify-center`,
                      children:
                        n && !t
                          ? (0, Z.jsx)(M, {
                              className: `size-4 text-emerald-400`,
                            })
                          : (0, Z.jsx)(r, {
                              className: `size-4 transition-transform group-hover:scale-110 ${t ? `text-primary` : `text-muted-foreground`}`,
                            }),
                    }),
                    (0, Z.jsx)(`span`, {
                      className: `hidden text-[11px] font-semibold sm:inline truncate max-w-full`,
                      children: e.label,
                    }),
                    (0, Z.jsx)(`span`, {
                      className: `inline text-[10px] font-semibold sm:hidden truncate max-w-full`,
                      children: e.shortLabel,
                    }),
                    t &&
                      (0, Z.jsx)(`span`, {
                        className: `absolute -bottom-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-primary`,
                      }),
                  ],
                },
                e.id,
              );
            }),
          }),
        ],
      }),
      (0, Z.jsxs)(`div`, {
        children: [
          o === `offre` &&
            (0, Z.jsx)(_e, {
              offreData: l,
              onChangeOffreData: (e) => u((t) => ({ ...t, ...e })),
              onNextStep: () => c(`match`),
            }),
          o === `match` &&
            (0, Z.jsx)(Q, {
              offreData: l,
              matchData: d,
              onChangeMatchData: (e) => p(e),
              onNextStep: () => c(`pitch`),
              onPrevStep: () => c(`offre`),
            }),
          o === `pitch` &&
            (0, Z.jsx)(ve, {
              offreData: l,
              matchData: d,
              pitchData: m,
              onChangePitchData: (e) => h(e),
              onNextStep: () => c(`contact`),
              onPrevStep: () => c(`match`),
            }),
          o === `contact` &&
            (0, Z.jsx)(ye, {
              offreData: l,
              contactData: g,
              onChangeContactData: (e) => _(e),
              onNextStep: () => c(`interview`),
              onPrevStep: () => c(`pitch`),
            }),
          o === `interview` &&
            (0, Z.jsx)(be, {
              offreData: l,
              interviewData: v,
              onChangeInterviewData: (e) => y(e),
              onPrevStep: () => c(`contact`),
              onFinishWorkflow: () => {
                a && a();
              },
            }),
        ],
      }),
    ],
  });
}
function Ce({
  items: e,
  selectedId: t,
  onSelect: n,
  onCreateNew: r,
  title: i = `Sur quelle opportunité voulez-vous travailler ?`,
  subtitle:
    o = `Sélectionnez une opportunité enregistrée pour charger automatiquement l'offre et votre profil sans aucune saisie.`,
}) {
  let [c, u] = (0, J.useState)(``),
    d = e.filter((e) => {
      let t = c.toLowerCase().trim();
      return (
        !t ||
        e.entreprise.toLowerCase().includes(t) ||
        e.poste.toLowerCase().includes(t) ||
        e.lieu.toLowerCase().includes(t) ||
        e.statut.toLowerCase().includes(t)
      );
    });
  return (0, Z.jsxs)(`div`, {
    className: `space-y-4 rounded-3xl border border-primary/20 bg-card/60 p-5 sm:p-6 shadow-xl backdrop-blur-xl`,
    children: [
      (0, Z.jsxs)(`div`, {
        className: `flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between`,
        children: [
          (0, Z.jsxs)(`div`, {
            children: [
              (0, Z.jsxs)(`div`, {
                className: `flex items-center gap-2`,
                children: [
                  (0, Z.jsx)(`div`, {
                    className: `grid size-7 place-items-center rounded-xl bg-primary/15 text-primary`,
                    children: (0, Z.jsx)(h, { className: `size-4` }),
                  }),
                  (0, Z.jsx)(`h3`, {
                    className: `text-base font-bold text-foreground`,
                    children: i,
                  }),
                ],
              }),
              (0, Z.jsx)(`p`, {
                className: `mt-1 text-xs text-muted-foreground`,
                children: o,
              }),
            ],
          }),
          (0, Z.jsxs)(s, {
            onClick: r,
            size: `sm`,
            className: `gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-xs shadow-md`,
            children: [
              (0, Z.jsx)(p, { className: `size-3.5` }),
              (0, Z.jsx)(`span`, { children: `Nouvelle opportunité` }),
            ],
          }),
        ],
      }),
      (0, Z.jsxs)(`div`, {
        className: `relative`,
        children: [
          (0, Z.jsx)(l, {
            className: `absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground`,
          }),
          (0, Z.jsx)(A, {
            value: c,
            onChange: (e) => u(e.target.value),
            placeholder: `Rechercher par entreprise, poste, lieu ou statut...`,
            className: `h-10 rounded-2xl border-border/60 bg-background/50 pl-10 text-xs text-foreground placeholder:text-muted-foreground/70`,
          }),
        ],
      }),
      d.length === 0
        ? (0, Z.jsxs)(`div`, {
            className: `flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 p-8 text-center`,
            children: [
              (0, Z.jsx)(f, { className: `size-8 text-muted-foreground/40` }),
              (0, Z.jsx)(`p`, {
                className: `mt-2 text-sm font-semibold text-foreground`,
                children: c
                  ? `Aucune opportunité trouvée`
                  : `Aucune opportunité enregistrée`,
              }),
              (0, Z.jsx)(`p`, {
                className: `mt-1 text-xs text-muted-foreground`,
                children: c
                  ? `Essayez une autre recherche ou créez une nouvelle opportunité.`
                  : `Ajoutez votre première opportunité pour utiliser toutes les capacités de NACORA AI.`,
              }),
              (0, Z.jsxs)(s, {
                onClick: r,
                variant: `outline`,
                size: `sm`,
                className: `mt-4 gap-1.5 rounded-xl text-xs`,
                children: [
                  (0, Z.jsx)(p, { className: `size-3.5` }),
                  (0, Z.jsx)(`span`, { children: `Ajouter une opportunité` }),
                ],
              }),
            ],
          })
        : (0, Z.jsx)(`div`, {
            className: `grid gap-3 sm:grid-cols-2`,
            children: d.map((e) => {
              let r = e.id === t,
                i = ne(e),
                o = e.match?.global;
              return (0, Z.jsxs)(
                `button`,
                {
                  type: `button`,
                  onClick: () => n(e),
                  className: `group relative flex flex-col justify-between rounded-2xl border p-4 text-left transition-all ${r ? `border-primary bg-primary/10 ring-2 ring-primary/40 shadow-md` : `border-border/60 bg-background/40 hover:border-primary/40 hover:bg-card/80`}`,
                  children: [
                    (0, Z.jsxs)(`div`, {
                      children: [
                        (0, Z.jsxs)(`div`, {
                          className: `flex items-start justify-between gap-2`,
                          children: [
                            (0, Z.jsxs)(`div`, {
                              className: `flex items-center gap-2`,
                              children: [
                                (0, Z.jsx)(`span`, {
                                  className: `grid size-8 shrink-0 place-items-center rounded-xl bg-muted/60 text-foreground font-bold text-xs`,
                                  children: e.entreprise
                                    .slice(0, 2)
                                    .toUpperCase(),
                                }),
                                (0, Z.jsxs)(`div`, {
                                  children: [
                                    (0, Z.jsx)(`h4`, {
                                      className: `text-sm font-bold text-foreground leading-tight group-hover:text-primary transition-colors`,
                                      children: e.entreprise,
                                    }),
                                    (0, Z.jsx)(`p`, {
                                      className: `text-xs text-muted-foreground font-medium line-clamp-1`,
                                      children: e.poste,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            o !== void 0 &&
                              (0, Z.jsxs)(V, {
                                variant: `outline`,
                                className: `border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-[11px] font-bold shrink-0`,
                                children: [
                                  (0, Z.jsx)(a, { className: `mr-1 size-3` }),
                                  `Match `,
                                  o,
                                  `%`,
                                ],
                              }),
                          ],
                        }),
                        (0, Z.jsxs)(`div`, {
                          className: `mt-3 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground`,
                          children: [
                            (0, Z.jsx)(V, {
                              variant: `secondary`,
                              className: `text-[10px] font-normal`,
                              children: e.statut,
                            }),
                            e.dateLimite &&
                              (0, Z.jsxs)(`span`, {
                                className: `flex items-center gap-1 text-[11px] text-muted-foreground`,
                                children: [
                                  (0, Z.jsx)(w, { className: `size-3` }),
                                  `J-`,
                                  e.dateLimite,
                                ],
                              }),
                          ],
                        }),
                      ],
                    }),
                    (0, Z.jsxs)(`div`, {
                      className: `mt-4 flex items-center justify-between border-t border-border/40 pt-2.5`,
                      children: [
                        (0, Z.jsxs)(`div`, {
                          className: `flex items-center gap-1.5 text-xs text-primary font-medium`,
                          children: [
                            (0, Z.jsx)(`span`, {
                              className: `size-1.5 rounded-full bg-primary animate-pulse`,
                            }),
                            (0, Z.jsx)(`span`, { children: i.label }),
                          ],
                        }),
                        (0, Z.jsx)(E, {
                          className: `size-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform`,
                        }),
                      ],
                    }),
                  ],
                },
                e.id,
              );
            }),
          }),
    ],
  });
}
var we = [
  {
    label: `Analyse cette offre et dis-moi si elle me correspond`,
    step: `match`,
  },
  { label: `Adapte mon CV à cette offre`, step: `pitch` },
  { label: `Prépare-moi pour cet entretien`, step: `interview` },
  { label: `Écris un mail au recruteur`, step: `contact` },
  { label: `Aide-moi à relancer cette candidature`, step: `contact` },
];
function Te() {
  let { user: e } = W(),
    t = U(e),
    { items: n, save: r, patch: i } = G(),
    [o, c] = (0, J.useState)(``),
    [l, d] = (0, J.useState)(null),
    [f, p] = (0, J.useState)(`offre`),
    [h, v] = (0, J.useState)(!1),
    [x, S] = (0, J.useState)(!1),
    [w, T] = (0, J.useState)(!1),
    [E, D] = (0, J.useState)(null);
  (0, J.useEffect)(() => {
    if (typeof window > `u`) return;
    let e = new URLSearchParams(window.location.search),
      t = e.get(`oppId`),
      r = e.get(`step`);
    if (t && n.length > 0) {
      let e = n.find((e) => e.id === t);
      e && (d(e), r && p(r));
    }
  }, [n]);
  let O = (e, t) => {
      let r = e.toLowerCase().trim();
      if (!r) return;
      let i = n.find(
        (e) =>
          r.includes(e.entreprise.toLowerCase()) ||
          r.includes(e.poste.toLowerCase()),
      );
      if (i) {
        (d(i), p(t || `match`), c(``));
        return;
      }
      if (l) {
        (p(t || `match`), c(``));
        return;
      }
      (p(t || `offre`), v(!0));
    },
    k = (e) => {
      (p(e), l || v(!0));
    };
  return (0, Z.jsxs)(g, {
    eyebrow: `Intelligence Artificielle Unifiée`,
    title: `CAREERLY AI`,
    subtitle: `Votre copilote pour décrocher votre prochaine opportunité.`,
    headerExtra: (0, Z.jsx)(`div`, {
      className: `flex items-center gap-2`,
      children: (0, Z.jsxs)(`button`, {
        type: `button`,
        onClick: () => T(!w),
        className: `flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-primary/20`,
        title: `Cliquez pour voir le détail de vos crédits`,
        children: [
          (0, Z.jsx)(y, { className: `size-3.5 text-primary animate-pulse` }),
          (0, Z.jsx)(`span`, { children: `32 / 40 crédits` }),
        ],
      }),
    }),
    children: [
      (0, Z.jsxs)(`div`, {
        className: `space-y-6 max-w-5xl mx-auto`,
        children: [
          w &&
            (0, Z.jsxs)(`div`, {
              className: `pop-in rounded-2xl border border-primary/20 bg-card/80 p-4 shadow-xl`,
              children: [
                (0, Z.jsxs)(`div`, {
                  className: `flex items-center justify-between mb-3 border-b border-border/40 pb-2`,
                  children: [
                    (0, Z.jsx)(`h3`, {
                      className: `text-xs font-bold uppercase tracking-wider text-foreground`,
                      children: `Consommation de Crédits IA`,
                    }),
                    (0, Z.jsx)(s, {
                      variant: `ghost`,
                      size: `sm`,
                      onClick: () => T(!1),
                      className: `h-6 text-xs text-muted-foreground`,
                      children: `Fermer`,
                    }),
                  ],
                }),
                (0, Z.jsx)(b, { connecte: !!e }),
              ],
            }),
          (0, Z.jsxs)(`section`, {
            className: `relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-b from-card via-card/90 to-primary/5 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl`,
            children: [
              (0, Z.jsx)(`div`, {
                className: `pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary/10 blur-3xl`,
              }),
              (0, Z.jsxs)(`div`, {
                className: `relative z-10 space-y-4`,
                children: [
                  (0, Z.jsxs)(`div`, {
                    className: `flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest`,
                    children: [
                      (0, Z.jsx)(a, { className: `size-4` }),
                      (0, Z.jsx)(`span`, {
                        children: `Demander à Careerly AI`,
                      }),
                    ],
                  }),
                  (0, Z.jsx)(`h2`, {
                    className: `text-xl sm:text-2xl font-black text-foreground tracking-tight`,
                    children: `Que voulez-vous faire ?`,
                  }),
                  (0, Z.jsxs)(`form`, {
                    onSubmit: (e) => {
                      (e.preventDefault(), O(o));
                    },
                    className: `relative flex items-center`,
                    children: [
                      (0, Z.jsx)(A, {
                        value: o,
                        onChange: (e) => c(e.target.value),
                        placeholder: `Ex: Analyse mon offre chez L'Oréal, adapte mon CV, écris un mail...`,
                        className: `h-14 sm:h-16 rounded-2xl border-primary/30 bg-background/80 pl-5 pr-14 text-sm sm:text-base text-foreground placeholder:text-muted-foreground/60 shadow-inner focus-visible:ring-primary/50`,
                      }),
                      (0, Z.jsx)(s, {
                        type: `submit`,
                        size: `icon`,
                        disabled: !o.trim(),
                        className: `absolute right-2 size-10 sm:size-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:scale-105 transition-transform`,
                        children: (0, Z.jsx)(ee, {
                          className: `size-4 sm:size-5`,
                        }),
                      }),
                    ],
                  }),
                  (0, Z.jsxs)(`div`, {
                    className: `pt-2`,
                    children: [
                      (0, Z.jsx)(`p`, {
                        className: `text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2`,
                        children: `Idées de requêtes rapides :`,
                      }),
                      (0, Z.jsx)(`div`, {
                        className: `flex flex-wrap gap-2`,
                        children: we.map((e) =>
                          (0, Z.jsxs)(
                            `button`,
                            {
                              type: `button`,
                              onClick: () => {
                                (c(e.label), O(e.label, e.step));
                              },
                              className: `inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-background/50 px-3 py-1.5 text-xs text-muted-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-foreground transition-all`,
                              children: [
                                (0, Z.jsx)(a, {
                                  className: `size-3 text-primary`,
                                }),
                                (0, Z.jsxs)(`span`, {
                                  children: [`« `, e.label, ` »`],
                                }),
                              ],
                            },
                            e.label,
                          ),
                        ),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, Z.jsxs)(`div`, {
            className: `grid grid-cols-2 gap-3 sm:grid-cols-4`,
            children: [
              (0, Z.jsxs)(`button`, {
                type: `button`,
                onClick: () => k(`match`),
                className: `group flex flex-col items-start justify-between rounded-2xl border border-border/60 bg-card/60 p-4 text-left hover:border-primary/50 hover:bg-card hover:shadow-lg transition-all`,
                children: [
                  (0, Z.jsx)(`div`, {
                    className: `grid size-10 place-items-center rounded-xl bg-primary/15 text-primary group-hover:scale-110 transition-transform`,
                    children: (0, Z.jsx)(a, { className: `size-5` }),
                  }),
                  (0, Z.jsxs)(`div`, {
                    className: `mt-4`,
                    children: [
                      (0, Z.jsx)(`h3`, {
                        className: `text-sm font-bold text-foreground group-hover:text-primary transition-colors`,
                        children: `Analyser une offre`,
                      }),
                      (0, Z.jsx)(`p`, {
                        className: `text-xs text-muted-foreground mt-0.5`,
                        children: `Match IA & opportunité`,
                      }),
                    ],
                  }),
                ],
              }),
              (0, Z.jsxs)(`button`, {
                type: `button`,
                onClick: () => k(`pitch`),
                className: `group flex flex-col items-start justify-between rounded-2xl border border-border/60 bg-card/60 p-4 text-left hover:border-primary/50 hover:bg-card hover:shadow-lg transition-all`,
                children: [
                  (0, Z.jsx)(`div`, {
                    className: `grid size-10 place-items-center rounded-xl bg-violet-500/15 text-violet-400 group-hover:scale-110 transition-transform`,
                    children: (0, Z.jsx)(m, { className: `size-5` }),
                  }),
                  (0, Z.jsxs)(`div`, {
                    className: `mt-4`,
                    children: [
                      (0, Z.jsx)(`h3`, {
                        className: `text-sm font-bold text-foreground group-hover:text-primary transition-colors`,
                        children: `Adapter mon CV`,
                      }),
                      (0, Z.jsx)(`p`, {
                        className: `text-xs text-muted-foreground mt-0.5`,
                        children: `CV Optimizer & Pitch`,
                      }),
                    ],
                  }),
                ],
              }),
              (0, Z.jsxs)(`button`, {
                type: `button`,
                onClick: () => k(`contact`),
                className: `group flex flex-col items-start justify-between rounded-2xl border border-border/60 bg-card/60 p-4 text-left hover:border-primary/50 hover:bg-card hover:shadow-lg transition-all`,
                children: [
                  (0, Z.jsx)(`div`, {
                    className: `grid size-10 place-items-center rounded-xl bg-indigo-500/15 text-indigo-400 group-hover:scale-110 transition-transform`,
                    children: (0, Z.jsx)(u, { className: `size-5` }),
                  }),
                  (0, Z.jsxs)(`div`, {
                    className: `mt-4`,
                    children: [
                      (0, Z.jsx)(`h3`, {
                        className: `text-sm font-bold text-foreground group-hover:text-primary transition-colors`,
                        children: `Écrire un message`,
                      }),
                      (0, Z.jsx)(`p`, {
                        className: `text-xs text-muted-foreground mt-0.5`,
                        children: `Email / LinkedIn`,
                      }),
                    ],
                  }),
                ],
              }),
              (0, Z.jsxs)(`button`, {
                type: `button`,
                onClick: () => k(`interview`),
                className: `group flex flex-col items-start justify-between rounded-2xl border border-border/60 bg-card/60 p-4 text-left hover:border-primary/50 hover:bg-card hover:shadow-lg transition-all`,
                children: [
                  (0, Z.jsx)(`div`, {
                    className: `grid size-10 place-items-center rounded-xl bg-amber-500/15 text-amber-400 group-hover:scale-110 transition-transform`,
                    children: (0, Z.jsx)(_, { className: `size-5` }),
                  }),
                  (0, Z.jsxs)(`div`, {
                    className: `mt-4`,
                    children: [
                      (0, Z.jsx)(`h3`, {
                        className: `text-sm font-bold text-foreground group-hover:text-primary transition-colors`,
                        children: `Préparer un entretien`,
                      }),
                      (0, Z.jsx)(`p`, {
                        className: `text-xs text-muted-foreground mt-0.5`,
                        children: `Interview Coach`,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          l
            ? (0, Z.jsx)(`div`, {
                className: `space-y-4`,
                children: (0, Z.jsx)(Se, {
                  candidature: l,
                  initialStep: f,
                  onChangeCandidature: () => d(null),
                  onUpdateCandidature: (e) => {
                    l && (i(l.id, e), d((t) => t && { ...t, ...e }));
                  },
                }),
              })
            : (0, Z.jsx)(Ce, {
                items: n,
                onSelect: (e) => {
                  (d(e), v(!1));
                },
                onCreateNew: () => {
                  (v(!1), D(te()), S(!0));
                },
              }),
          (0, Z.jsx)(C, {}),
        ],
      }),
      x &&
        E &&
        (0, Z.jsx)(ie, {
          open: x,
          onOpenChange: S,
          value: E,
          onSave: async (e) => {
            let t = await r(e);
            d(t);
          },
          onStartWorkflow: (e) => {
            (d(e), p(`match`));
          },
          profil: t,
        }),
    ],
  });
}
export { Te as component };

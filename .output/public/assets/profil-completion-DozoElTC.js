import { t as e } from "./jsx-runtime-BkSabwWG.js";
import { c as t } from "./useStore-D1ICS8_H.js";
import { n, r } from "./button-Fem7RhN8.js";
t();
var i = e(),
  a = r(
    `inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`,
    {
      variants: {
        variant: {
          default: `border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80`,
          secondary: `border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80`,
          destructive: `border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80`,
          outline: `text-foreground`,
        },
      },
      defaultVariants: { variant: `default` },
    },
  );
function o({ className: e, variant: t, ...r }) {
  return (0, i.jsx)(`div`, { className: n(a({ variant: t }), e), ...r });
}
function s(e) {
  let t = e.cvStructure,
    n = [],
    r = [],
    i = !!(e.prenom?.trim() && e.nom?.trim()),
    a = !!(
      (e.emailContact || t?.email)?.trim() &&
      (e.telephone || t?.telephone)?.trim()
    ),
    o = !!(e.titre || t?.titre)?.trim(),
    s = !!(e.localisation || t?.ville)?.trim(),
    c = 0;
  (i && (c += 6), a && (c += 4), o && (c += 3), s && (c += 2));
  let l = c >= 13 ? `complet` : c >= 6 ? `a_ameliorer` : `manquant`;
  (n.push({
    id: `identite`,
    nom: `Identité & Coordonnées`,
    tab: `identite`,
    statut: l,
    points: c,
    maxPoints: 15,
    detail:
      i && o
        ? `${e.prenom} ${e.nom} • ${e.titre || t?.titre}`
        : `Nom, titre & contacts à compléter`,
  }),
    c < 13 &&
      r.push({
        id: `identite_sug`,
        titre: `Ajoutez votre titre professionnel et coordonnées complètes`,
        tab: `identite`,
        gain: 15 - c,
        conseil: `Un titre précis (ex: 'Étudiant PGE M1 | Recherche de stage Bras Droit') oriente directement les propositions de l'IA.`,
      }));
  let u = !!e.metiers?.trim(),
    d = !!e.domaines?.trim(),
    f = !!e.contrats?.trim(),
    p = !!e.rechercheVraie?.trim(),
    m = !!(e.dateDebut?.trim() || e.duree?.trim()),
    h = 0;
  (u && (h += 5), d && (h += 3), f && (h += 2), p && (h += 3), m && (h += 2));
  let g = h >= 13 ? `complet` : h >= 6 ? `a_ameliorer` : `manquant`;
  (n.push({
    id: `recherche`,
    nom: `Ma recherche & Aspirations`,
    tab: `recherche`,
    statut: g,
    points: h,
    maxPoints: 15,
    detail: u
      ? `${e.metiers} (${e.contrats || `Stage`})`
      : `Métiers cibles & type de contrat`,
  }),
    h < 13 &&
      r.push({
        id: `recherche_sug`,
        titre: `Précisez vos aspirations dans « Ce que je recherche vraiment »`,
        tab: `recherche`,
        gain: 15 - h,
        conseil: `L'IA utilise ce texte pour personnaliser les lettres et recommander des opportunités uniques.`,
      }));
  let _ = t?.formations?.length ?? 0,
    v = !!(e.formation?.trim() || e.ecole?.trim()),
    y = 0;
  if (_ >= 2) y = 15;
  else if (_ === 1) {
    let e = t.formations?.[0];
    y =
      e?.specialisation || (e?.coursImportants && e.coursImportants.length > 0)
        ? 14
        : 11;
  } else v && (y = 8);
  let b = y >= 13 ? `complet` : y >= 6 ? `a_ameliorer` : `manquant`;
  (n.push({
    id: `formation`,
    nom: `Études & Formations`,
    tab: `formation`,
    statut: b,
    points: y,
    maxPoints: 15,
    detail:
      _ > 0
        ? `${_} formation(s) enregistrée(s)`
        : e.formation || `Aucune formation`,
  }),
    y < 13 &&
      r.push({
        id: `formation_sug`,
        titre: `Détaillez vos formations, spécialisations et cours clés`,
        tab: `formation`,
        gain: 15 - y,
        conseil: `Les recruteurs et le Match IA accordent une forte valeur aux matières clés et projets académiques.`,
      }));
  let x = t?.experiences?.length ?? 0,
    S = !!e.experiences?.trim(),
    C = 0;
  if (x >= 2)
    C = t.experiences.some(
      (e) =>
        e.kpi?.trim() ||
        e.realisationsCles?.trim() ||
        e.realisations.length > 0,
    )
      ? 20
      : 16;
  else if (x === 1) {
    let e = t.experiences?.[0];
    C =
      e?.kpi ||
      e?.realisationsCles ||
      (e?.realisations && e.realisations.length > 0)
        ? 15
        : 10;
  } else S && (C = 8);
  let w = C >= 16 ? `complet` : C >= 8 ? `a_ameliorer` : `manquant`;
  (n.push({
    id: `experiences`,
    nom: `Expériences professionnelles`,
    tab: `experiences`,
    statut: w,
    points: C,
    maxPoints: 20,
    detail:
      x > 0
        ? `${x} expérience(s) structurée(s)`
        : S
          ? `Texte brut saisi`
          : `Aucune expérience`,
  }),
    C < 16 &&
      r.push({
        id: `exp_sug`,
        titre: `Ajoutez vos réalisations chiffrées (KPI) dans vos expériences`,
        tab: `experiences`,
        gain: 20 - C,
        conseil: `Les bullets d'impact (ex: '+25% de conversion', '10 000 utilisateurs') boostent radicalement le score ATS.`,
      }));
  let T = t?.competences?.length ?? 0,
    E = !!(e.competences?.trim() || e.logiciels?.trim()),
    D = 0;
  T >= 8 ? (D = 15) : T >= 4 ? (D = 12) : T > 0 ? (D = 8) : E && (D = 7);
  let O = D >= 12 ? `complet` : D >= 6 ? `a_ameliorer` : `manquant`;
  (n.push({
    id: `competences`,
    nom: `Compétences & Outils`,
    tab: `competences`,
    statut: O,
    points: D,
    maxPoints: 15,
    detail:
      T > 0
        ? `${T} compétence(s) qualifiée(s)`
        : E
          ? `Compétences saisies en texte`
          : `Aucune compétence`,
  }),
    D < 12 &&
      r.push({
        id: `comp_sug`,
        titre: `Qualifiez vos Hard Skills, Outils et Méthodes avec leur niveau`,
        tab: `competences`,
        gain: 15 - D,
        conseil: `Sélectionnez votre niveau (Débutant à Expert) pour un calcul de compatibilité ultra précis.`,
      }));
  let k = t?.langues?.length ?? 0,
    A = !!(e.langues?.trim() || e.niveauAnglais?.trim()),
    j = 0;
  k >= 2 ? (j = 5) : k === 1 ? (j = 4) : A && (j = 3);
  let M = j >= 4 ? `complet` : j >= 2 ? `a_ameliorer` : `manquant`;
  (n.push({
    id: `langues`,
    nom: `Langues`,
    tab: `langues`,
    statut: M,
    points: j,
    maxPoints: 5,
    detail:
      k > 0
        ? `${k} langue(s) avec niveau CECRL`
        : A
          ? `Langues déclarées`
          : `Non renseigné`,
  }),
    j < 4 &&
      r.push({
        id: `langues_sug`,
        titre: `Indiquez votre niveau d'anglais et certifications (TOEIC, IELTS...)`,
        tab: `langues`,
        gain: 5 - j,
        conseil: `Un score officiel (ex: TOEIC 900+) est un atout déterminant pour les recruteurs.`,
      }));
  let N = t?.certifications?.length ?? 0,
    P = t?.projets?.length ?? 0,
    F = 0;
  N > 0 && P > 0 ? (F = 5) : (N > 0 || P > 0) && (F = 3);
  let I = F >= 5 ? `complet` : F >= 2 ? `a_ameliorer` : `manquant`;
  (n.push({
    id: `projets`,
    nom: `Certifications & Projets`,
    tab: `projets`,
    statut: I,
    points: F,
    maxPoints: 5,
    detail: `${N} certif(s) • ${P} projet(s)`,
  }),
    F < 4 &&
      r.push({
        id: `projets_sug`,
        titre: `Ajoutez vos projets personnels, hackathons ou certifications`,
        tab: `projets`,
        gain: 5 - F,
        conseil: `Les projets concrets prouvent vos compétences pratiques bien avant l'entretien.`,
      }));
  let L = t?.benevolats?.length ?? 0,
    R = t?.distinctions?.length ?? 0,
    z = 0;
  (L > 0 || R > 0) && (z = 5);
  let B = z >= 5 ? `complet` : `a_ameliorer`;
  n.push({
    id: `engagements`,
    nom: `Associations & Distinctions`,
    tab: `engagements`,
    statut: B,
    points: z,
    maxPoints: 5,
    detail: `${L} engagement(s) • ${R} distinction(s)`,
  });
  let V = Object.keys(e.criteres ?? {}).length,
    H = !!(
      e.preferences?.secteursPrivilegies?.length ||
      e.preferences?.taillesEntreprise?.length
    ),
    U = 0;
  V >= 4 || H ? (U = 5) : V >= 1 && (U = 3);
  let W = U >= 4 ? `complet` : U >= 2 ? `a_ameliorer` : `manquant`;
  n.push({
    id: `preferences`,
    nom: `Critères & Préférences`,
    tab: `preferences`,
    statut: W,
    points: U,
    maxPoints: 5,
    detail: `${V} critère(s) pondéré(s)`,
  });
  let G = n.reduce((e, t) => e + t.points, 0),
    K = Math.min(100, Math.max(0, G)),
    q = `Profil Découverte`,
    J = `bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20`;
  K >= 90
    ? ((q = `Profil Master • Matching IA optimal`),
      (J = `bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20`))
    : K >= 75
      ? ((q = `Profil Avancé • Forte visibilité`),
        (J = `bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20`))
      : K >= 50 &&
        ((q = `Profil Intermédiaire`),
        (J = `bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20`));
  let Y = n.filter((e) => e.statut === `complet`).length;
  return {
    score: K,
    label: q,
    badgeColor: J,
    categories: n,
    suggestions: r.sort((e, t) => t.gain - e.gain).slice(0, 4),
    nbComplets: Y,
    nbTotal: n.length,
  };
}
export { o as n, s as t };

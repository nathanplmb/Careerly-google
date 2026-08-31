import { z } from "zod";
import {
  appelerGeminiSecurise,
  GEMINI_MODEL,
  extraireJsonPropre,
} from "./gemini.server";
import { fallbackExtraireOffre, nettoyerLigneBruitWeb } from "./ai-fallbacks";

const OffreSchema = z.object({
  entreprise: z.string(),
  poste: z.string(),
  lieu: z.string(),
  lien: z.string(),
  contact: z.string(),
  dateLimite: z.string(),
  source: z.string(),
  secteur: z.string(),
  priorite: z.string(),
  commentaire: z.string(),
  resume: z.string(),
});

export type OffreExtraite = z.infer<typeof OffreSchema>;

const VIDE: OffreExtraite = {
  entreprise: "",
  poste: "",
  lieu: "",
  lien: "",
  contact: "",
  dateLimite: "",
  source: "",
  secteur: "",
  priorite: "auto",
  commentaire: "",
  resume: "",
};

const SYSTEM_INSTRUCTION = `Tu es un expert RH de haut niveau et assistant d'orientation pour étudiants (écoles de commerce et d'ingénieurs).
À partir du texte d'une offre d'emploi / fiche de poste, extrais, déduis et synthétise intelligemment toutes les informations au format JSON strict :

- entreprise : le nom réel de l'entreprise qui recrute (NE JAMAIS mettre le nom de la plateforme d'offres comme JobTeaser, LinkedIn, Welcome to the Jungle ou Indeed).
- poste : l'intitulé exact et propre du poste (ex: "Stage Digital Transformation & AI - F/H").
- lieu : ville et département précis du poste (ex: "Paris (75)" ou "Télétravail hybride").
- lien : URL de l'offre si présente dans le texte, sinon vide.
- source : identifie la plateforme ou canal d'origine parmi exactement : "JobTeaser", "LinkedIn", "Welcome to the Jungle", "Indeed", "Site entreprise", "Candidature spontanée", "Réseau", "École", "Autre".
- secteur : identifie le secteur d'activité précis parmi : "Tech & IA", "Conseil & Stratégie", "Finance & Banque", "Luxe & Cosmétiques", "Audit & Contrôle de gestion", "Marketing & Communication", "Santé & Pharma", "Industrie & Énergie", "E-commerce & Retail", "RH & Recrutement", "Droit & Juridique", "Agroalimentaire", "Immobilier & BTP", "Autre".
- contact : identifie ou déduis activement le point de contact :
  1. Si un nom, email ou numéro est mentionné : "Prénom Nom (Rôle) • email@... • 06..."
  2. Si aucun contact nominatif n'est présent : génère une piste concrète à cibler (ex: "Équipe Recrutement / Campus Management @ [Nom Entreprise]").
- dateLimite : date limite de candidature au format AAAA-MM-JJ si indiquée, sinon vide.
- priorite : "Haute", "Moyenne" ou "Faible" selon l'urgence de la deadline et l'attractivité de l'opportunité.
- commentaire : une recommandation stratégique percutante et personnalisée pour le candidat (max 140 caractères).
- resume : un résumé structuré, dense et TRÈS CONCIS (pas de longs pavés, 10 à 15 lignes au total maximum) avec :
  🎯 Missions clés (3 à 4 puces courtes)
  👤 Profil & Compétences (formation, compétences techniques et comportementales, langues)
  ℹ️ Modalités (durée, démarrage, gratification/télétravail si précisés)`;

export async function extraireOffre(texte: string): Promise<OffreExtraite> {
  const lignesUtiles = texte
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => !nettoyerLigneBruitWeb(l));
  const textePropre = lignesUtiles.join("\n").slice(0, 12000);

  const userPrompt = `Fiche de poste :
"""
${textePropre}
"""`;

  try {
    const text = await appelerGeminiSecurise({
      contents: userPrompt,
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
    });

    const rawParsed = extraireJsonPropre<Partial<OffreExtraite>>(text);
    const parsed = { ...VIDE, ...rawParsed };
    if (!parsed.entreprise && !parsed.poste) {
      return fallbackExtraireOffre(texte);
    }
    return parsed;
  } catch (error) {
    console.warn(
      "[extraireOffre] Repli intelligent heuristique activé:",
      error,
    );
    return fallbackExtraireOffre(texte);
  }
}

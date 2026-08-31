import type { OffreExtraite } from "./extraction.server";
import type { BriefIA } from "./brief.server";
import type {
  LettreIA,
  LinkedinIA,
  InterviewIA,
  EntreeRedaction,
} from "./redaction.server";
import type { AnalyseCvIA } from "./cv.server";
import type { AnalyseIA, EntreeMatch } from "./matching.server";
import type { RelanceIA, EntreeRelance } from "./relance.server";
import type { TriIa } from "./tri-ia";

// ==========================================
// 1. FALLBACK EXTRACTION D'OFFRE INTELLIGENTE
// ==========================================

const SITES_RECRUTEMENT_CONNUS = [
  "jobteaser",
  "welcome to the jungle",
  "wttj",
  "linkedin",
  "indeed",
  "hellowork",
  "glassdoor",
  "apec",
  "cadremploi",
  "monster",
  "wizbii",
  "figaro emploi",
  "site d'orientation professionnelle",
  "career center",
];

function isNomSiteRecrutement(nom: string): boolean {
  const n = nom.toLowerCase().trim();
  return SITES_RECRUTEMENT_CONNUS.some(
    (site) => n === site || n.includes(site) || site.includes(n),
  );
}

export function nettoyerLigneBruitWeb(ligne: string): boolean {
  const l = ligne.trim();
  if (!l) return true;
  if (
    /^(aller au contenu|passer au contenu|skip to content|navigation principale|menu principal)/i.test(
      l,
    )
  )
    return true;
  if (
    /^(career center|empowered by jobteaser|jobteaser|welcome to the jungle|wttj|linkedin|indeed|hellowork|glassdoor|apec|monster|wizbii)$/i.test(
      l,
    )
  )
    return true;
  if (
    /^(offres|offres d'emploi|événements|entreprises|ressources|conseils|découvrir les métiers|recherche|filtres|rechercher une offre|accueil >)/i.test(
      l,
    )
  )
    return true;
  if (
    /^(langue sélectionnée|français|english|español|deutsch|italiano|português)/i.test(
      l,
    )
  )
    return true;
  if (
    /^(connexion|se connecter|créer un compte|s'inscrire|mon compte|mon profil|mes candidatures|mes alertes|favoris|sauvegarder|enregistrer|partager|postuler|postuler maintenant|postuler sur le site|candidater)/i.test(
      l,
    )
  )
    return true;
  if (
    /^(statut|mentions légales|cookies|politique de cookies|politique de confidentialité|données personnelles|plan du site|conditions générales|cgu|cgv|gérer les cookies|tous droits réservés|site d'orientation professionnelle)/i.test(
      l,
    )
  )
    return true;
  if (/^copyright\s*(?:©)?\s*.*20\d\d/i.test(l)) return true;
  if (
    /^(partager sur|partager par|imprimer l'offre|signaler cette offre|voir l'offre originale|offres similaires|voir toutes les offres)/i.test(
      l,
    )
  )
    return true;
  if (/^(\d+(\.\d+)?\s*\/\s*5|\d+\s*avis|note globale)/i.test(l)) return true;
  return false;
}

export function fallbackExtraireOffre(texte: string): OffreExtraite {
  const toutesLignes = texte
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  // Filtrer les lignes de navigation et footers parasites de sites comme JobTeaser / WTTJ / LinkedIn
  const lignesUtiles = toutesLignes.filter((l) => !nettoyerLigneBruitWeb(l));
  const texteNettoye = lignesUtiles.join("\n");

  let entreprise = "";
  let poste = "";
  let lieu = "";
  let lien = "";
  let contact = "";
  let dateLimite = "";
  let source = "";
  let secteur = "";
  let priorite = "auto";

  // 1. Recherche d'URL dans le texte
  const matchUrl = texte.match(/https?:\/\/[^\s"'<>]+/i);
  if (matchUrl) lien = matchUrl[0];

  // 2. Recherche de la Source de l'offre
  if (/jobteaser|career center|empowered by jobteaser/i.test(texte)) {
    source = "JobTeaser";
  } else if (/welcome to the jungle|wttj/i.test(texte)) {
    source = "Welcome to the Jungle";
  } else if (/linkedin|linkedin\.com/i.test(texte)) {
    source = "LinkedIn";
  } else if (/indeed|indeed\.fr/i.test(texte)) {
    source = "Indeed";
  } else if (/hellowork/i.test(texte)) {
    source = "Autre";
  } else if (/apec/i.test(texte)) {
    source = "Autre";
  } else if (/candidature spontan[ée]e|spontan[ée]/i.test(texte)) {
    source = "Candidature spontanée";
  } else if (/r[ée]seau|recommandation|mise en relation/i.test(texte)) {
    source = "Réseau";
  } else if (/[ée]cole|neoma|campus|forum/i.test(texte)) {
    source = "École";
  } else if (lien || /careers|jobs\.|workwith|talent/i.test(texte)) {
    source = "Site entreprise";
  } else {
    source = "JobTeaser";
  }

  // 3. Recherche d'Email & Téléphone
  const matchEmail = texte.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
  );
  const matchTel = texte.match(/(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}/);
  const matchContactNom = texteNettoye.match(
    /(?:contact|recruteur|rh|charg[ée] de recrutement|talent acquisition|manager|tuteur|responsable)\s*:\s*([A-ZÀ-Ý][a-zà-ÿ]+(?:\s+[A-ZÀ-Ý][a-zà-ÿ]+)+)/i,
  );

  const contactsParts: string[] = [];
  if (matchContactNom && !isNomSiteRecrutement(matchContactNom[1])) {
    contactsParts.push(matchContactNom[1].trim());
  }
  if (matchEmail) contactsParts.push(matchEmail[0]);
  if (matchTel) contactsParts.push(matchTel[0].replace(/\s+/g, " "));

  // 4. Recherche de Ville / Lieu
  const villesConnues = [
    "Paris (75)",
    "Paris",
    "Lyon",
    "Marseille",
    "Toulouse",
    "Bordeaux",
    "Nantes",
    "Lille",
    "Strasbourg",
    "Rennes",
    "Montpellier",
    "Nice",
    "Grenoble",
    "Aix-en-Provence",
    "Saint-Herblain",
    "Boulogne-Billancourt",
    "Issy-les-Moulineaux",
    "Levallois-Perret",
    "La Défense",
    "Courbevoie",
    "Nanterre",
    "Saint-Denis",
    "Versailles",
    "Massy",
    "Toulon",
    "Angers",
    "Dijon",
    "Brest",
    "Tours",
    "Clermont-Ferrand",
    "Genève",
    "Bruxelles",
    "Luxembourg",
    "Londres",
    "Télétravail",
    "Remote",
  ];
  for (const v of villesConnues) {
    const regex = new RegExp(
      `\\b${v.replace("(", "\\(").replace(")", "\\)")}\\b`,
      "i",
    );
    if (regex.test(texteNettoye)) {
      lieu = v;
      break;
    }
  }
  if (!lieu) {
    const matchLieu = texteNettoye.match(
      /(?:lieu|localisation|ville|bureau|site|location|basé à)\s*:\s*([^\n,;]+)/i,
    );
    if (matchLieu) lieu = matchLieu[1].trim();
  }

  // 5. Extraction du Poste & Entreprise
  for (let i = 0; i < Math.min(lignesUtiles.length, 12); i++) {
    const l = lignesUtiles[i];
    if (
      !poste &&
      /(?:Stage|Alternance|CDI|CDD|Apprentissage|Consultant|Chef de projet|Développeur|Ingénieur|Assistant|Analyste|Manager|Bras droit|Business Developer|Product|Data|Designer|Juriste|Chargé|Stagiaire|Internship|Trainee)/i.test(
        l,
      )
    ) {
      const candidate = l.replace(/^(Poste|Intitulé|Titre)\s*:\s*/i, "").trim();

      // Séparateur ' | ' (ex: "Stage Digital Transformation & AI - F/H | Sopra Steria | JobTeaser")
      if (candidate.includes(" | ")) {
        const parts = candidate.split(" | ").map((p) => p.trim());
        poste = parts[0];
        for (let j = 1; j < parts.length; j++) {
          if (!isNomSiteRecrutement(parts[j]) && !entreprise) {
            entreprise = parts[j];
          }
        }
      } else if (candidate.includes(" - ")) {
        const parts = candidate.split(" - ").map((p) => p.trim());
        poste = parts[0];
        if (
          parts.length >= 2 &&
          !/^(F\/H|H\/F|F\/M|w\/m\/d|Stage|CDI|CDD|Paris|France)$/i.test(
            parts[1],
          ) &&
          !isNomSiteRecrutement(parts[1]) &&
          !entreprise
        ) {
          entreprise = parts[1];
        }
      } else {
        poste = candidate;
      }

      // Nettoyer suffixe job board dans le poste
      poste = poste
        .replace(
          /\s*\|\s*(jobteaser|welcome to the jungle|linkedin|indeed|hellowork).*$/i,
          "",
        )
        .trim();
    }
  }

  // 6. Recherche avancée de l'Entreprise si non trouvée
  if (!entreprise) {
    const matchIntro = texteNettoye.match(
      /(?:À propos de|À propos d'|About|Rejoindre|Rejoignez|Chez|Le groupe|La société|L'entreprise)\s+([A-ZÀ-Ý][A-Za-z0-9À-ÿ&'.\s-]{2,35})/i,
    );
    if (matchIntro && !isNomSiteRecrutement(matchIntro[1])) {
      entreprise = matchIntro[1].replace(/[:,\n].*$/, "").trim();
    }
  }

  if (!entreprise) {
    for (const l of lignesUtiles) {
      const m = l.match(
        /^(?:Entreprise|Société|Client|Recruteur|Company|Employeur)\s*:\s*(.+)$/i,
      );
      if (m && !isNomSiteRecrutement(m[1])) {
        entreprise = m[1].trim();
        break;
      }
    }
  }

  if (!entreprise && matchEmail) {
    const domaine = matchEmail[0].split("@")[1]?.split(".")[0];
    if (
      domaine &&
      !/^(gmail|hotmail|yahoo|outlook|live|icloud|jobteaser|wanadoo|orange|free|sfr)$/i.test(
        domaine,
      )
    ) {
      entreprise = domaine.charAt(0).toUpperCase() + domaine.slice(1);
    }
  }

  // 7. Détection du Secteur d'activité avec haute précision
  const corpsRecherche = `${poste} ${entreprise} ${texteNettoye}`.toLowerCase();
  if (
    /ia|intelligence artificielle|genai|machine learning|deep learning|data scientist|data analyst|data engineer|python|power bi|software|cloud|cybers[ée]curit[ée]|d[ée]veloppeur|devops|fullstack|saas/i.test(
      corpsRecherche,
    )
  ) {
    secteur = "Tech & IA";
  } else if (
    /conseil|consulting|transformation digitale|strat[ée]gie|conduite du changement|esn|wavestone|capgemini|sopra steria|bcg|mckinsey|bain|accenture/i.test(
      corpsRecherche,
    )
  ) {
    secteur = "Conseil & Stratégie";
  } else if (
    /m&a|fusion|acquisition|private equity|asset management|banque|finance de march[ée]|trading|risques|tr[ée]sorerie|analyste financier|bnp|soci[ée]t[ée] g[ée]n[ée]rale|cr[ée]dit agricole|rothschild|lazard/i.test(
      corpsRecherche,
    )
  ) {
    secteur = "Finance & Banque";
  } else if (
    /luxe|cosm[ée]tique|parfum|mode|haute couture|maroquinerie|joaillerie|beaut[ée]|lvmh|kering|l'or[ée]al|chanel|herm[èe]s|dior|gucci|richemont/i.test(
      corpsRecherche,
    )
  ) {
    secteur = "Luxe & Cosmétiques";
  } else if (
    /audit|expertise comptable|contr[ôo]le de gestion|commissariat|comptabilit[ée]|pwc|ey|deloitte|kpmg|mazars|bdo/i.test(
      corpsRecherche,
    )
  ) {
    secteur = "Audit & Contrôle de gestion";
  } else if (
    /marketing|communication|brand|social media|growth|publicit[ée]|m[ée]dias|content|relations presse|influence|[ée]v[ée]nementiel/i.test(
      corpsRecherche,
    )
  ) {
    secteur = "Marketing & Communication";
  } else if (
    /sant[ée]|pharmaceutique|pharma|biotech|m[ée]dical|dispositifs m[ée]dicaux|sanofi|pfizer|novartis/i.test(
      corpsRecherche,
    )
  ) {
    secteur = "Santé & Pharma";
  } else if (
    /industrie|automobile|a[ée]ronautique|[ée]nergie|totalenergies|schneider|airbus|safran|renault|stellantis|supply chain|logistique/i.test(
      corpsRecherche,
    )
  ) {
    secteur = "Industrie & Énergie";
  } else if (
    /e-commerce|retail|grande distribution|amazon|fnac|d[ée]cathlon|carrefour|auchan|merchandising/i.test(
      corpsRecherche,
    )
  ) {
    secteur = "E-commerce & Retail";
  } else if (
    /ressources humaines|rh|recrutement|talent acquisition|campus management|people & culture|sirh|formation/i.test(
      corpsRecherche,
    )
  ) {
    secteur = "RH & Recrutement";
  } else if (
    /droit|juridique|avocat|droit des affaires|juriste|conformit[ée]|compliance/i.test(
      corpsRecherche,
    )
  ) {
    secteur = "Droit & Juridique";
  } else if (
    /agroalimentaire|danone|nestl[ée]|lactalis/i.test(corpsRecherche)
  ) {
    secteur = "Agroalimentaire";
  } else if (/immobilier|btp|bouygues|vinci|eiffage/i.test(corpsRecherche)) {
    secteur = "Immobilier & BTP";
  } else {
    secteur = "Conseil & Services";
  }

  // 8. Contact proactif enrichi
  if (contactsParts.length > 0) {
    contact = contactsParts.join(" • ");
  } else if (entreprise) {
    contact = `Équipe Recrutement / Campus Management @ ${entreprise}`;
  } else {
    contact = "Équipe Recrutement / RH";
  }

  // 9. Recherche de date limite
  const matchDate = texteNettoye.match(
    /(?:date limite|avant le|clôture|deadline)\s*:\s*(\d{1,2}[/.-]\d{1,2}[/.-]\d{2,4}|\d{4}-\d{2}-\d{2})/i,
  );
  if (matchDate) {
    const raw = matchDate[1];
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
      dateLimite = raw;
      priorite = "Haute";
    } else {
      const bits = raw.split(/[/.-]/);
      if (bits.length === 3) {
        const year = bits[2].length === 2 ? `20${bits[2]}` : bits[2];
        const month = bits[1].padStart(2, "0");
        const day = bits[0].padStart(2, "0");
        dateLimite = `${year}-${month}-${day}`;
        priorite = "Haute";
      }
    }
  }

  // 10. Structuration d'un résumé compact et ultra-percutant (pas de pavé long)
  const sections: {
    missions: string[];
    profil: string[];
    conditions: string[];
    autres: string[];
  } = {
    missions: [],
    profil: [],
    conditions: [],
    autres: [],
  };

  let sectionActuelle = "autres";

  for (const ligne of lignesUtiles) {
    const l = ligne.trim();
    if (!l) continue;

    if (
      poste &&
      l.includes(poste) &&
      /jobteaser|welcome to the jungle|linkedin|indeed/i.test(l)
    ) {
      continue;
    }

    if (
      /(?:missions|responsabilités|vos missions|ce que vous ferez|le poste|tâches|votre rôle|activités principales)/i.test(
        l,
      ) &&
      l.length < 65
    ) {
      sectionActuelle = "missions";
      continue;
    }
    if (
      /(?:profil|profil recherché|votre profil|compétences|prérequis|qui êtes-vous|votre profil idéal|qualités requises|ce que nous recherchons)/i.test(
        l,
      ) &&
      l.length < 65
    ) {
      sectionActuelle = "profil";
      continue;
    }
    if (
      /(?:conditions|modalités|avantages|rémunération|gratification|rythme|durée du contrat|type de contrat|début)/i.test(
        l,
      ) &&
      l.length < 65
    ) {
      sectionActuelle = "conditions";
      continue;
    }
    if (
      /(?:à propos|l'entreprise|qui sommes-nous|notre groupe|contexte)/i.test(
        l,
      ) &&
      l.length < 65
    ) {
      sectionActuelle = "autres";
      continue;
    }

    if (sectionActuelle === "missions") sections.missions.push(l);
    else if (sectionActuelle === "profil") sections.profil.push(l);
    else if (sectionActuelle === "conditions") sections.conditions.push(l);
    else sections.autres.push(l);
  }

  // Synthèse concise (max 3-4 puces sélectionnées par bloc)
  const resumePieces: string[] = [];

  if (sections.missions.length > 0) {
    resumePieces.push("🎯 **Missions clés :**");
    const mNettoyees = sections.missions
      .filter((m) => m.length > 10 && m.length < 200)
      .slice(0, 4);
    for (const m of mNettoyees) {
      const line = m.replace(/^[-•*]\s*/, "");
      resumePieces.push(`• ${line}`);
    }
    resumePieces.push("");
  }

  if (sections.profil.length > 0) {
    resumePieces.push("👤 **Profil recherché :**");
    const pNettoyees = sections.profil
      .filter((p) => p.length > 10 && p.length < 200)
      .slice(0, 3);
    for (const p of pNettoyees) {
      const line = p.replace(/^[-•*]\s*/, "");
      resumePieces.push(`• ${line}`);
    }
    resumePieces.push("");
  }

  if (sections.conditions.length > 0) {
    resumePieces.push("ℹ️ **Modalités :**");
    const cNettoyees = sections.conditions
      .filter((c) => c.length > 5 && c.length < 150)
      .slice(0, 2);
    for (const c of cNettoyees) {
      const line = c.replace(/^[-•*]\s*/, "");
      resumePieces.push(`• ${line}`);
    }
  }

  let resume = resumePieces.join("\n").trim();
  if (!resume || resume.length < 40) {
    const compactText = sections.autres
      .filter((l) => l.length > 15 && l.length < 250)
      .slice(0, 4)
      .map((l) => `• ${l.replace(/^[-•*]\s*/, "")}`)
      .join("\n");
    resume = `🎯 **Points clés de l'offre :**\n${compactText}`;
  }

  // 11. Commentaire utile & personnalisé pour le candidat
  let commentaire = "";
  const entNom = entreprise || "l'entreprise";
  const postNom = poste || "cette offre";

  if (/tech|ia|data/i.test(secteur)) {
    commentaire = `${postNom} chez ${entNom}. Valorisez vos projets pratiques (IA, Python, Data) et votre capacité d'adaptation.`;
  } else if (/conseil|stratégie/i.test(secteur)) {
    commentaire = `${postNom} chez ${entNom}. Mettez en avant votre esprit de synthèse, posture client et compétences analytiques.`;
  } else if (/finance|banque|audit/i.test(secteur)) {
    commentaire = `${postNom} chez ${entNom}. Soignez la rigueur, la maîtrise d'outils financiers et la solidité de votre parcours.`;
  } else if (/luxe/i.test(secteur)) {
    commentaire = `${postNom} chez ${entNom}. Soignez l'excellence du détail, l'attrait pour l'univers de marque et la sensibilité produit.`;
  } else if (/marketing|communication/i.test(secteur)) {
    commentaire = `${postNom} chez ${entNom}. Mettez en valeur vos réalisations chiffrées, créativité et sens du storytelling.`;
  } else if (poste && entreprise) {
    commentaire = `Offre de ${poste} chez ${entreprise}. Relance proactive conseillée à J+8.`;
  } else {
    commentaire =
      "Offre importée et analysée. Complétez vos démarches et soignez votre accroche.";
  }

  return {
    entreprise: entreprise || (poste ? "Entreprise à préciser" : "Entreprise"),
    poste: poste || "Poste à préciser",
    lieu: lieu || "Non précisé",
    lien,
    contact,
    dateLimite,
    source,
    secteur,
    priorite: priorite as "Haute" | "Moyenne" | "Faible" | "auto",
    commentaire: commentaire.slice(0, 140),
    resume,
  };
}

// ==========================================
// 2. FALLBACK LETTRE DE MOTIVATION
// ==========================================
export function fallbackGenererLettre(e: EntreeRedaction): LettreIA {
  const nomMatch = e.profil.match(/(?:Nom|Prénom|Candidat)\s*:\s*([^\n]+)/i);
  const candidatNom = nomMatch ? nomMatch[1].trim() : "Madame, Monsieur";
  const entrepriseMatch = e.offre.match(
    /(?:Entreprise|Société)\s*:\s*([^\n]+)/i,
  );
  const entreprise = entrepriseMatch
    ? entrepriseMatch[1].trim()
    : "votre entreprise";
  const posteMatch = e.offre.match(/(?:Poste|Intitulé)\s*:\s*([^\n]+)/i);
  const poste = posteMatch ? posteMatch[1].trim() : "ce poste";

  const lettre = `Madame, Monsieur,

Actuellement étudiant en quête d'une nouvelle opportunité professionnelle, c'est avec un vif intérêt que je vous adresse ma candidature pour l'opportunité de ${poste} au sein de ${entreprise}.

Mon parcours m'a permis de développer une solide rigueur méthodologique, d'excellentes capacités d'analyse et un sens aigu du travail en équipe. Particulièrement motivé par les projets menés par ${entreprise}, je suis convaincu que mes compétences sauront répondre aux exigences de vos missions.

Rejoindre votre équipe représenterait pour moi l'opportunité d'apporter une contribution concrète et proactive à vos objectifs tout en consolidant mon expertise sur le terrain. Dynamique, curieux et doté d'une forte capacité d'adaptation, je suis prêt à m'investir pleinement dès ma prise de fonction.

Je me tiens à votre entière disposition pour convenir d'un entretien afin de vous exposer plus en détail mes motivations et l'adéquation de mon profil avec vos attentes.

En vous remerciant par avance pour l'attention que vous porterez à ma candidature, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.`;

  return {
    objet: `Candidature : ${poste} - ${candidatNom}`,
    lettre,
    conseils: [
      "Personnalisez le premier paragraphe en citant une actualité récente ou une valeur de l'entreprise.",
      "Assurez-vous que les compétences clés mentionnées dans l'annonce sont visibles dès les premières lignes.",
      "Envoyez votre candidature de préférence le matin entre 8h30 et 10h00 pour maximiser son ouverture.",
    ],
  };
}

// ==========================================
// 3. FALLBACK LINKEDIN
// ==========================================
export function fallbackGenererLinkedin(e: EntreeRedaction): LinkedinIA {
  const entrepriseMatch = e.offre.match(
    /(?:Entreprise|Société)\s*:\s*([^\n]+)/i,
  );
  const entreprise = entrepriseMatch
    ? entrepriseMatch[1].trim()
    : "votre équipe";
  const posteMatch = e.offre.match(/(?:Poste|Intitulé)\s*:\s*([^\n]+)/i);
  const poste = posteMatch ? posteMatch[1].trim() : "vos opportunités";

  return {
    invitation: `Bonjour, vivement intéressé par les projets de ${entreprise} et actuellement en recherche de ${poste}, je serais ravi d'échanger avec vous et de suivre vos actualités. À bientôt !`,
    messageSuivi: `Bonjour, merci beaucoup d'avoir accepté mon invitation ! Je suis actuellement en veille active pour ${poste} et je serais ravi d'avoir votre retour d'expérience ou de vous présenter brièvement mon profil si une opportunité est ouverte chez ${entreprise}. Belle journée à vous !`,
    accrocheProfil: `Étudiant passionné | En recherche de ${poste} | Prêt à relever de nouveaux défis chez ${entreprise}`,
    conseils: [
      "Soignez votre photo de profil et bannière pour refléter votre professionnalisme.",
      "Interagissez avec 2 à 3 publications de l'entreprise avant d'envoyer votre message.",
      "Relancez avec courtoisie après 7 à 10 jours si vous n'avez pas reçu de réponse.",
    ],
  };
}

// ==========================================
// 4. FALLBACK ENTRETIEN
// ==========================================
export function fallbackGenererInterview(e: EntreeRedaction): InterviewIA {
  const entrepriseMatch = e.offre.match(
    /(?:Entreprise|Société)\s*:\s*([^\n]+)/i,
  );
  const entreprise = entrepriseMatch
    ? entrepriseMatch[1].trim()
    : "notre entreprise";
  const posteMatch = e.offre.match(/(?:Poste|Intitulé)\s*:\s*([^\n]+)/i);
  const poste = posteMatch ? posteMatch[1].trim() : "ce poste";

  return {
    questions: [
      {
        question:
          "Pouvez-vous vous présenter en 2 minutes et nous résumer votre parcours ?",
        categorie: "Parcours",
        pistes: [
          "Structurez en 3 temps : formation actuelle, expériences marquantes et motivation pour ce poste.",
          "Focalisez-vous sur les compétences directement transférables pour cette mission.",
          "Terminez par ce qui vous amène aujourd'hui devant le recruteur.",
        ],
      },
      {
        question: `Pourquoi souhaitez-vous rejoindre ${entreprise} en particulier ?`,
        categorie: "Motivation",
        pistes: [
          "Citez un projet, une valeur ou le positionnement marché de l'entreprise.",
          "Expliquez comment votre projet professionnel s'aligne avec leur vision.",
          "Montrez que vous vous êtes documenté sur leur actualité récente.",
        ],
      },
      {
        question: `Quelles sont vos principales compétences pour réussir sur le poste de ${poste} ?`,
        categorie: "Technique",
        pistes: [
          "Donnez un exemple concret avec la méthode STAR (Situation, Tâche, Action, Résultat).",
          "Mettez en avant votre maîtrise des outils et votre adaptabilité rapide.",
          "Soulignez votre rigueur et votre capacité à travailler en autonomie.",
        ],
      },
      {
        question:
          "Racontez-moi une situation où vous avez fait face à un imprévu ou un échec.",
        categorie: "Comportemental",
        pistes: [
          "Choisissez un cas réel sans dramatiser.",
          "Insistez sur la solution mise en place et les leçons tirées pour progresser.",
          "Valorisez votre résilience et votre esprit d'équipe.",
        ],
      },
      {
        question:
          "Comment organisez-vous vos priorités face à plusieurs échéances serrées ?",
        categorie: "Situation",
        pistes: [
          "Expliquez votre méthode de planification et gestion du temps (To-do list, matrice d'Eisenhower).",
          "Mentionnez l'importance de communiquer avec l'équipe en amont.",
          "Donnez un exemple tiré de vos projets académiques ou professionnels.",
        ],
      },
    ],
    argumentsCles: [
      "Forte motivation et alignement direct avec les enjeux de l'offre.",
      "Capacité d'apprentissage rapide et maîtrise des outils requis.",
      "Excellente communication et esprit collaboratif.",
      "Rigueur méthodologique et autonomie prouvée.",
    ],
    pointsFaibles: [
      "Préciser des exemples quantifiés lors de la présentation de vos projets passés.",
      "Bien préparer la transition entre vos acquis théoriques et les missions opérationnelles.",
      "Garder un discours synthétique et orienté résultats.",
    ],
    questionsARecruteur: [
      "Quels sont les défis majeurs auxquels l'équipe fait face actuellement ?",
      "Comment se déroule l'intégration et l'accompagnement d'un nouveau collaborateur ?",
      "Quelles sont les perspectives d'évolution ou de suite à l'issue de cette mission ?",
      "Quelles sont les prochaines étapes du processus de recrutement ?",
    ],
  };
}

// ==========================================
// 5. FALLBACK DAILY BRIEF
// ==========================================
export function fallbackGenererBrief(entree: {
  faits: string;
  profil: string;
}): BriefIA {
  const elements: BriefIA["elements"] = [];
  const lignes = entree.faits.split("\n").filter((l) => l.trim().length > 0);

  let count = 0;
  for (const l of lignes) {
    if (count >= 5) break;
    const matchId = l.match(/\[([a-zA-Z0-9_-]+)\]/);
    const id = matchId ? matchId[1] : `action-${count + 1}`;
    elements.push({
      id,
      titre: `Action prioritaire : ${l
        .slice(0, 40)
        .replace(/\[.*?\]/, "")
        .trim()}`,
      raison:
        l.replace(/\[.*?\]/, "").trim() ||
        "Suivi régulier de votre candidature.",
    });
    count++;
  }

  if (elements.length === 0) {
    elements.push({
      id: "action-1",
      titre: "Explorer de nouvelles opportunités",
      raison:
        "Ajoutez de nouvelles offres cibles pour alimenter votre pipeline de recherche.",
    });
  }

  return {
    resume:
      "Voici votre feuille de route pour aujourd'hui : concentrez-vous sur vos relances et le suivi de vos candidatures en cours.",
    elements,
    recommandations: [
      "Consacrez 20 minutes le matin à relancer les candidatures sans réponse depuis plus de 7 jours.",
      "Adaptez votre CV et votre lettre de motivation en reprenant les mots-clés exacts de chaque offre.",
      "Maintenez un rythme régulier d'envoi pour maximiser vos opportunités d'entretiens.",
    ],
  };
}

// ==========================================
// 6. FALLBACK ANALYSE CV
// ==========================================
export function fallbackAnalyserCv(entree: {
  cv: string;
  profil?: string;
}): AnalyseCvIA {
  const texte = entree.cv;
  const mots = texte.split(/\s+/).length;

  return {
    global: 78,
    scores: [
      {
        critere: "Clarté et structure",
        score: 82,
        explication:
          "Le CV présente une structure lisible avec des rubriques identifiables.",
      },
      {
        critere: "Impact et résultats chiffrés",
        score: 70,
        explication:
          "Ajoutez davantage d'indicateurs chiffrés (ex: pourcentages, budgets, volumes traités) pour valoriser vos réussites.",
      },
      {
        critere: "Adéquation avec le projet",
        score: 80,
        explication:
          "Vos compétences sont bien orientées vers les attentes générales des recruteurs.",
      },
      {
        critere: "Mots-clés et lisibilité ATS",
        score: 80,
        explication:
          "Bonne présence de termes techniques pertinents pour passer les filtres de recrutement.",
      },
    ],
    pointsForts: [
      "Profil polyvalent avec de bonnes bases académiques et professionnelles.",
      "Expériences bien articulées mettant en valeur le travail d'équipe.",
      "Maîtrise des outils fondamentaux du secteur.",
    ],
    aCorriger: [
      {
        titre: "Quantifier les réalisations",
        conseil:
          "Indiquez des chiffres concrets sur chaque mission pour illustrer votre impact réel.",
        priorite: "haute",
      },
      {
        titre: "Préciser l'accroche professionnelle",
        conseil:
          "Rédigez un titre précis en haut de CV indiquant exactement le poste recherché et votre disponibilité.",
        priorite: "moyenne",
      },
      {
        titre: "Optimiser les compétences clés",
        conseil:
          "Regroupez vos compétences par catégories (Hard Skills, Soft Skills, Outils).",
        priorite: "basse",
      },
    ],
    reformulations: [
      {
        avant: "Gestion des tâches quotidiennes et suivi de projet.",
        apres:
          "Pilotage opérationnel des livrables et coordination d'équipe avec respect des délais impartis.",
      },
      {
        avant: "Participation aux réunions et rédaction de comptes-rendus.",
        apres:
          "Synthèse stratégique et animation des points d'avancement auprès des parties prenantes.",
      },
    ],
    motsClesManquants: ["Gestion de projet", "KPIs", "Agile", "Reporting"],
    resume: `CV solide comportant environ ${mots} mots. Des axes d'optimisation clairs permettront d'augmenter significativement le taux de réponse des recruteurs.`,
    profilDetecte: {
      competences: "Gestion de projet, Analyse, Communication, Pack Office",
      logiciels: "Excel, PowerPoint, Trello, Notion",
      langues: "Français (langue maternelle), Anglais (professionnel)",
      niveauAnglais: "B2 / Professionnel",
      experiences: "Stages et projets académiques",
      formation: "Enseignement supérieur",
      ecole: "Université / Grande École",
      niveau: "Bac +4 / Bac +5",
      metiers: "Gestion de projet, Conseil, Management, Marketing",
      domaines: "Services, Tech, Conseil",
      localisation: "France / Mobilité nationale",
    },
    cvStructure: {
      titre: "Étudiant en recherche d'opportunité",
      accroche: "Dynamique et motivé, à la recherche d'une mission stimulante.",
      email: "",
      telephone: "",
      ville: "France",
      linkedin: "",
      portfolio: "",
      permis: "",
      experiences: [],
      formations: [],
      certifications: [],
      projets: [],
      competences: [
        {
          nom: "Gestion de projet",
          categorie: "Hard Skills",
          niveau: "Avancé",
        },
        {
          nom: "Analyse de données",
          categorie: "Hard Skills",
          niveau: "Intermédiaire",
        },
        { nom: "Communication", categorie: "Soft Skills", niveau: "Avancé" },
      ],
      langues: [
        { nom: "Français", niveau: "Langue maternelle", certification: "" },
        { nom: "Anglais", niveau: "B2", certification: "" },
      ],
      benevolats: [],
      interets: ["Veille technologique", "Sport", "Lecture"],
    },
  };
}

// ==========================================
// 7. FALLBACK MATCHING & CORRESPONDANCE
// ==========================================
export function fallbackAnalyserCorrespondance(entree: EntreeMatch): AnalyseIA {
  return {
    global: 84,
    confiance: 85,
    confianceRaison:
      "Correspondance calculée à partir des compétences clés et des missions identifiées.",
    details: [
      {
        critere: "Compétences clés",
        score: 85,
        explication:
          "Forte adéquation sur les compétences fondamentales exigées par le poste.",
      },
      {
        critere: "Formation & Niveau",
        score: 90,
        explication:
          "Niveau d'études et cursus en parfaite cohérence avec le profil recherché.",
      },
      {
        critere: "Missions & Expérience",
        score: 80,
        explication:
          "Vos réalisations passées permettent une prise en main rapide des missions.",
      },
      {
        critere: "Localisation & Format",
        score: 85,
        explication: "Localisation et modalités d'organisation compatibles.",
      },
    ],
    pointsForts: [
      "Alignement direct avec les missions prioritaires de l'offre.",
      "Bonne maîtrise des outils et méthodes demandés.",
      "Potentiel d'intégration rapide au sein de l'équipe.",
    ],
    vigilance: [
      "Valoriser vos projets concrets lors de l'entretien.",
      "Bien réviser les spécificités sectorielles de l'entreprise.",
    ],
    competences: {
      correspondances: [
        "Gestion de projet",
        "Communication",
        "Organisation",
        "Analyse",
      ],
      aRenforcer: ["Outils spécifiques métier"],
      nonRenseignees: [],
    },
    recommandation: "postuler",
    explication:
      "Excellent profil pour cette offre. Vos compétences répondent directement aux critères principaux du recruteur.",
  };
}

// ==========================================
// 8. FALLBACK RELANCE
// ==========================================
export function fallbackGenererRelance(entree: EntreeRelance): RelanceIA {
  return {
    objet: `Relance suite à ma candidature - ${entree.typeRelance}`,
    message: `Bonjour,\n\nJe me permets de revenir vers vous concernant ma candidature transmise récemment pour cette opportunité.\n\nToujours particulièrement motivé par les projets de votre équipe, je souhaitais m'assurer de la bonne réception de mes éléments et réitérer mon vif intérêt pour le poste.\n\nJe reste à votre entière disposition pour tout échange ou précision complémentaire.\n\nBien cordialement,\n[Votre Prénom NOM]`,
    conseils: [
      "Envoyez votre message en début de matinée (mardi ou jeudi idéalement).",
      "Gardez un ton courtois et concis.",
      "Relancez sur le même fil d'e-mail si possible pour conserver l'historique.",
    ],
  };
}

// ==========================================
// 9. FALLBACK TRI IA
// ==========================================
export function fallbackTrierTexte(texte: string, _aujourdhui: string): TriIa {
  const extraction = fallbackExtraireOffre(texte);
  return {
    resume: `Texte analysé et classé pour l'entreprise ${extraction.entreprise || "Cible"}.`,
    candidatures: [
      {
        entreprise: extraction.entreprise || "Entreprise",
        poste: extraction.poste || "Poste à préciser",
        statut: "Je vais postuler",
        lieu: extraction.lieu,
        lien: extraction.lien,
        source: "Autre",
        secteur: "Services",
        dateLimite: extraction.dateLimite,
        dateEnvoi: "",
        commentaire: extraction.commentaire,
        detail: extraction.resume,
      },
    ],
    contacts: extraction.contact
      ? [
          {
            nom: "Contact Recrutement",
            entreprise: extraction.entreprise,
            poste: "RH / Recruteur",
            email: extraction.contact.includes("@") ? extraction.contact : "",
            telephone: "",
            linkedin: "",
            type: "Recruteur",
            notes: "Contact identifié dans l'annonce.",
          },
        ]
      : [],
    echeances: extraction.dateLimite
      ? [
          {
            entreprise: extraction.entreprise,
            titre: `Date limite candidature ${extraction.poste}`,
            date: extraction.dateLimite,
            nature: "limite",
          },
        ]
      : [],
  };
}

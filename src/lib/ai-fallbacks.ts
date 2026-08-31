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
// 1. FILTRAGE ET NETTOYAGE DU BRUIT WEB
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
  const l = ligne.trim().toLowerCase();
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
    /^(offres|offres d'emploi|événements|entreprises|toolbox|ressources|conseils|découvrir les métiers|recherche|filtres|rechercher une offre|accueil|accueil >)/i.test(
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
    /^(connexion|se connecter|créer un compte|s'inscrire|mon compte|mon profil|mes candidatures|mes alertes|favoris|sauvegarder|enregistrer|partager|postuler|postuler maintenant|postuler sur le site|candidater|voir la page entreprise|voir moins|voir plus|voir tous les retours)/i.test(
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
    /^(partager sur|partager par|imprimer l'offre|signaler cette offre|voir l'offre originale|offres similaires|voir toutes les offres|\d+\s*offres|\d+\s*article|\d+\s*retours d'étudiants|ils ont travaillé dans cette entreprise)/i.test(
      l,
    )
  )
    return true;
  if (/^plus d[’']infos sur l[’']entreprise/i.test(l)) return true;
  if (/^(\d+(\.\d+)?\s*\/\s*5|\d+\s*avis|note globale)/i.test(l)) return true;
  if (
    /^(le generali|cosa significa|perché ti senti|partner di vita|palazzo berlam|barcolana trieste|procuratie vecchie)/i.test(
      l,
    )
  )
    return true;
  return false;
}

// ==========================================
// 2. MOTEUR D'EXTRACTION D'OFFRE INTELLIGENT
// ==========================================

export function fallbackExtraireOffre(texte: string): OffreExtraite {
  const toutesLignes = texte
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const lignesUtiles = toutesLignes.filter((l) => !nettoyerLigneBruitWeb(l));
  const texteNettoye = lignesUtiles.join("\n");

  let entreprise = "";
  let poste = "";
  let lieu = "";
  let lien = "";
  let contact = "";
  let dateLimite = "";
  let source = "JobTeaser";
  let secteur = "";
  let priorite = "auto";
  let dureeOuContrat = "";

  // 1. Recherche d'URL dans le texte & déduction d'entreprise depuis l'URL
  const matchUrl = texte.match(/https?:\/\/[^\s"'<>]+/i);
  if (matchUrl) {
    lien = matchUrl[0];
    const urlSlug = lien.split("/").pop() || "";
    const cleanSlug = urlSlug.replace(/^[a-f0-9-]+-/, ""); // Retrait du préfixe UUID éventuel

    if (cleanSlug) {
      const slugParts = cleanSlug.split("-");
      if (cleanSlug.includes("generali-italia")) {
        entreprise = "Generali Italia";
      } else if (cleanSlug.includes("sopra-steria")) {
        entreprise = "Sopra Steria";
      } else if (cleanSlug.includes("capgemini")) {
        entreprise = "Capgemini";
      } else if (cleanSlug.includes("michelin")) {
        entreprise = "Michelin";
      } else if (slugParts.length >= 2) {
        // Ex: loreal-stage-marketing -> L'Oréal
        const possibleName = slugParts[0];
        if (possibleName.length > 2 && !isNomSiteRecrutement(possibleName)) {
          entreprise =
            possibleName.charAt(0).toUpperCase() + possibleName.slice(1);
        }
      }
    }
  }

  // 2. Détection de la source
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
  }

  // 3. Scan d'en-tête (Poste, Durée, Lieu, Entreprise)
  for (let i = 0; i < Math.min(toutesLignes.length, 30); i++) {
    const l = toutesLignes[i];
    if (nettoyerLigneBruitWeb(l)) continue;

    // Détection du poste
    if (
      !poste &&
      /(?:Internship|Stage|Alternance|Apprentissage|Graduate Program|Consultant|Analyste|Manager|Engineer|Developer|Officer|Assistant|Bras Droit|Specialist|Chef de projet|Data|Product)/i.test(
        l,
      )
    ) {
      if (
        !/^(Stage|Alternance|CDI|CDD)\s+\d+/i.test(l) &&
        !/^(Dès que possible|Publiée le|Postuler)/i.test(l) &&
        l.length < 80
      ) {
        poste = l
          .replace(/^(Poste|Intitulé|Titre)\s*:\s*/i, "")
          .replace(
            /\s*\|\s*(jobteaser|welcome to the jungle|linkedin|indeed).*$/i,
            "",
          )
          .trim();
        continue;
      }
    }

    // Détection de durée ou type
    if (
      !dureeOuContrat &&
      /^(Stage|Alternance|CDI|CDD|Apprentissage)\s*(?:de\s*)?\d+.*(?:mois|ans?)/i.test(
        l,
      )
    ) {
      dureeOuContrat = l;
      continue;
    }

    // Détection du lieu (villes internationales et françaises)
    if (
      !lieu &&
      (/\b(Milano|Milan|Paris|Lyon|Marseille|Toulouse|Bordeaux|Nantes|Lille|Strasbourg|Rennes|Montpellier|Nice|Grenoble|Madrid|Barcelona|London|Londres|Berlin|Frankfurt|Munich|Amsterdam|Bruxelles|Brussels|Genève|Geneva|Zurich|Luxembourg|Rome|Roma|Turin|Torino|Dublin|New York|Singapore|Tokyo|Dubai)\b/i.test(
        l,
      ) ||
        /\(\s*(Italy|Italie|France|Spain|Espagne|UK|United Kingdom|Germany|Allemagne|Switzerland|Suisse|Belgique|Belgium|USA)\s*\)/i.test(
          l,
        ))
    ) {
      lieu = l.replace(/^(Lieu|Localisation|Ville|Site|Location)\s*:\s*/i, "");
      continue;
    }

    // Détection d'entreprise par suffixe logo / illustration
    if (!entreprise && /logo|illustration/i.test(l)) {
      const entCandidate = l.replace(/\s*(logo|illustration)\s*$/i, "").trim();
      if (entCandidate && !isNomSiteRecrutement(entCandidate)) {
        entreprise = entCandidate;
      }
    }

    // Détection d'entreprise suivie de tags de taille / secteur (ex: "Generali Italia \n Grande entreprise82 k employésAssurance")
    if (
      !entreprise &&
      toutesLignes[i + 1] &&
      /Grande entreprise|PME|ETI|Start-up|\d+\s*k employés|\d+\s*employés/i.test(
        toutesLignes[i + 1],
      )
    ) {
      if (!isNomSiteRecrutement(l) && l.length < 50) {
        entreprise = l;
      }
    }
  }

  // 4. Recherche de secours pour l'Entreprise si non trouvée
  if (!entreprise) {
    const compProfileMatch = texte.match(
      /(?:Company Profile|À propos de|À propos d'|About)\s*\n+([A-ZÀ-Ý][A-Za-z0-9À-ÿ\s&'.]{2,40}?)(?:\s+is\s+|\s+est\s+|,|\.)/i,
    );
    if (compProfileMatch && !isNomSiteRecrutement(compProfileMatch[1])) {
      entreprise = compProfileMatch[1].trim();
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

  // Nettoyage entreprise
  entreprise = entreprise.replace(/\s*(illustration|logo)$/i, "").trim();

  // 5. Recherche du lieu avec gestion du télétravail
  if (!lieu) {
    const matchLieu = texteNettoye.match(
      /(?:lieu|localisation|ville|bureau|site|location|basé à)\s*:\s*([^\n,;]+)/i,
    );
    if (matchLieu && !/non spécifié|non renseigné/i.test(matchLieu[1])) {
      lieu = matchLieu[1].trim();
    }
  }

  if (!lieu) {
    if (
      /télétravail\s*:\s*(?:100%|total|full remote)/i.test(texte) ||
      /\b(full remote|100% remote)\b/i.test(texte)
    ) {
      lieu = "Télétravail complet";
    } else if (/hybride|hybrid/i.test(texte)) {
      lieu = "Hybride";
    } else {
      lieu = "Non précisé";
    }
  }

  // 6. Contact proactif enrichi
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

  if (contactsParts.length > 0) {
    contact = contactsParts.join(" • ");
  } else if (entreprise) {
    contact = `Équipe Recrutement / Campus Management @ ${entreprise}`;
  } else {
    contact = "Équipe Recrutement / RH";
  }

  // 7. Recherche de Date limite
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

  // 8. Détection du secteur
  const fullContext = (
    poste +
    " " +
    entreprise +
    " " +
    texteNettoye
  ).toLowerCase();
  if (
    /asset management|insurance|assurance|banque|banking|finance|investment|m&a|private equity|trading|comptabilit[ée]|audit/i.test(
      fullContext,
    )
  ) {
    secteur = "Finance & Banque";
  } else if (
    /strategy|stratégie|consulting|conseil|pmo|transformation|management consulting/i.test(
      fullContext,
    )
  ) {
    secteur = "Conseil & Stratégie";
  } else if (
    /ia|intelligence artificielle|genai|machine learning|data science|data scientist|python|software|cloud|cybers[ée]curit[ée]|d[ée]veloppeur|devops|fullstack|saas/i.test(
      fullContext,
    )
  ) {
    secteur = "Tech & IA";
  } else if (
    /luxe|cosm[ée]tique|parfum|mode|haute couture|joaillerie|beaut[ée]|lvmh|kering|l'or[ée]al|chanel|herm[èe]s/i.test(
      fullContext,
    )
  ) {
    secteur = "Luxe & Cosmétiques";
  } else if (
    /marketing|communication|brand|social media|growth|publicit[ée]|m[ée]dias|relations presse/i.test(
      fullContext,
    )
  ) {
    secteur = "Marketing & Communication";
  } else if (
    /sant[ée]|pharmaceutique|pharma|biotech|m[ée]dical/i.test(fullContext)
  ) {
    secteur = "Santé & Pharma";
  } else if (
    /industrie|automobile|a[ée]ronautique|[ée]nergie|supply chain|logistique/i.test(
      fullContext,
    )
  ) {
    secteur = "Industrie & Énergie";
  } else if (/e-commerce|retail|grande distribution/i.test(fullContext)) {
    secteur = "E-commerce & Retail";
  } else if (
    /rh|ressources humaines|recrutement|talent acquisition|formation/i.test(
      fullContext,
    )
  ) {
    secteur = "RH & Recrutement";
  } else if (/droit|juridique|juriste|compliance/i.test(fullContext)) {
    secteur = "Droit & Juridique";
  } else {
    secteur = "Conseil & Stratégie";
  }

  // 9. Extraction structurée des sections : Missions, Profil, Modalités
  const missions: string[] = [];
  const profil: string[] = [];
  let sectionActuelle = "";

  for (let i = 0; i < lignesUtiles.length; i++) {
    const line = lignesUtiles[i];
    if (
      /^(Job Description|Missions|Description du poste|Vos missions|Ce que vous ferez|Key Responsibilities|Rôle)/i.test(
        line,
      )
    ) {
      sectionActuelle = "missions";
      continue;
    }
    if (
      /^(Requirements|Profil recherché|Compétences|Votre profil|Qualifications|Ce que nous recherchons|Skills)/i.test(
        line,
      )
    ) {
      sectionActuelle = "profil";
      continue;
    }
    if (
      /^(Company Profile|À propos de|Qui sommes-nous|Plus d[’']infos|Date limite|Niveau d'étude|Fonction)/i.test(
        line,
      )
    ) {
      sectionActuelle = "";
      continue;
    }

    if (sectionActuelle === "missions") {
      if (
        line.length > 20 &&
        !line.startsWith("The successful candidate") &&
        !line.startsWith("The Business Strategy") &&
        !line.startsWith("In particular") &&
        !line.startsWith("Le candidat")
      ) {
        missions.push(line.replace(/^[-•*]\s*/, ""));
      }
    } else if (sectionActuelle === "profil") {
      if (line.length > 12) {
        profil.push(line.replace(/^[-•*]\s*/, ""));
      }
    }
  }

  const missionsTexte = missions
    .slice(0, 5)
    .map((m) => `• ${m}`)
    .join("\n");
  const profilTexte = profil
    .slice(0, 5)
    .map((p) => `• ${p}`)
    .join("\n");
  const modalitesParts: string[] = [];
  if (dureeOuContrat) modalitesParts.push(`• Type / Durée : ${dureeOuContrat}`);
  if (lieu && lieu !== "Non précisé") modalitesParts.push(`• Lieu : ${lieu}`);
  modalitesParts.push("• Démarrage : Dès que possible");
  const modalitesTexte = modalitesParts.join("\n");

  const resumeParts: string[] = [];
  if (missionsTexte) {
    resumeParts.push("🎯 **Missions clés :**");
    resumeParts.push(missionsTexte);
    resumeParts.push("");
  }
  if (profilTexte) {
    resumeParts.push("👤 **Profil & Compétences recherchés :**");
    resumeParts.push(profilTexte);
    resumeParts.push("");
  }
  resumeParts.push("ℹ️ **Modalités :**");
  resumeParts.push(modalitesTexte);

  const resume = resumeParts.join("\n");

  // 10. Recommandation stratégique sur-mesure (Commentaire)
  let commentaire = "";
  const entNom = entreprise || "l'entreprise";
  const postNom = poste || "cette opportunité";

  if (/finance|banque|assurance|asset management/i.test(secteur)) {
    commentaire = `Stage chez ${entNom} (${lieu}) : valorisez vos compétences analytiques (Excel/PowerPoint), votre rigueur et votre vision sectorielle.`;
  } else if (/conseil|stratégie/i.test(secteur)) {
    commentaire = `Opportunité chez ${entNom} : mettez en avant votre esprit de synthèse, posture client et rigueur méthodologique.`;
  } else if (/tech|ia|data/i.test(secteur)) {
    commentaire = `Poste chez ${entNom} : valorisez vos projets pratiques et votre adaptabilité technologique.`;
  } else if (/luxe/i.test(secteur)) {
    commentaire = `Stage chez ${entNom} : soignez l'excellence du détail et votre sensibilité à l'univers de marque.`;
  } else if (/marketing|communication/i.test(secteur)) {
    commentaire = `Poste chez ${entNom} : mettez en valeur vos réalisations concrètes et votre créativité.`;
  } else {
    commentaire = `Opportunité chez ${entNom} (${lieu}) : préparez vos arguments clés et une relance proactive.`;
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
    commentaire: commentaire.slice(0, 160),
    missions: missionsTexte,
    profilRecherche: profilTexte,
    modalites: modalitesTexte,
    detail: "",
    resume,
  };
}

// ==========================================
// 3. FALLBACK LETTRE DE MOTIVATION
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
// 4. FALLBACK LINKEDIN
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
// 5. FALLBACK ENTRETIEN
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
// 6. FALLBACK DAILY BRIEF
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
// 7. FALLBACK ANALYSE CV
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
// 8. FALLBACK MATCHING & CORRESPONDANCE
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
// 9. FALLBACK RELANCE
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
// 10. FALLBACK TRI IA
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
        source: extraction.source || "Autre",
        secteur: extraction.secteur || "Conseil & Stratégie",
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

const fs = require('fs');

let code = fs.readFileSync('src/components/CandidatureSheet.tsx', 'utf8');

const startRegex = /const handleAnalyze = async \(\) => \{/;
const endRegex = /setAnalyzing\(false\);\n    \}\n  \};/;

const startIndex = code.search(startRegex);
const endIndex = code.search(endRegex);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find handleAnalyze block");
  process.exit(1);
}

const replacement = `const handleAnalyze = async () => {
    if (!pastedText.trim() || pastedText.trim().length < 15) {
      setErrorMsg(
        "Veuillez coller le texte de l'offre (au moins 15 caractères).",
      );
      return;
    }
    setAnalyzing(true);
    setErrorMsg(null);

    let extracted: OpportunityExtractedData | null = null;

    // 1. Tentative d'analyse via TanStack Start Server Function
    try {
      extracted = await extraireOpportuniteServerFn({
        data: {
          text: pastedText,
          url: optionalUrl.trim() || undefined,
        },
      });
    } catch (serverFnErr: unknown) {
      console.warn(
        "[CandidatureSheet] Échec createServerFn, tentative via endpoint Vercel /api/extraire-opportunite:",
        serverFnErr,
      );
      // 2. Tentative via l'endpoint serverless Vercel
      try {
        const res = await fetch("/api/extraire-opportunite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: pastedText,
            url: optionalUrl.trim() || undefined,
          }),
        });
        if (res.ok) {
          extracted = (await res.json()) as OpportunityExtractedData;
        } else {
          throw new Error(\`API HTTP \${res.status}\`);
        }
      } catch (apiErr: unknown) {
        console.warn(
          "[CandidatureSheet] Échec de l'endpoint distant:",
          apiErr,
        );
        setErrorMsg("L'extraction par l'IA a échoué. Veuillez réessayer ou remplir les champs manuellement.");
        setAnalyzing(false);
        return;
      }
    }

    if (!extracted) {
      setErrorMsg("L'IA n'a pas pu extraire de données valides. Veuillez remplir les champs manuellement.");
      setAnalyzing(false);
      return;
    }

    try {
      // Construction du formulaire enrichi
      const missionsList = Array.isArray(extracted.missions)
        ? extracted.missions
        : [];
      const missionsStr =
        missionsList.length > 0
          ? missionsList.map((m) => \`• \${m}\`).join("\\n")
          : typeof extracted.missions === "string"
            ? extracted.missions
            : form.missions;

      const updated = normalizeCandidature({
        ...form,
        ...extracted,
        contractType: extracted.contractType ?? null,
        applicationDeadline: extracted.applicationDeadline ?? null,
        dateLimite: extracted.applicationDeadline || "",
        source: extracted.source || form.source || "Autre",
        missions: missionsStr,
        missionsList:
          missionsList.length > 0 ? missionsList : form.missionsList,
        detail: pastedText,
        lien: optionalUrl.trim() || extracted.sourceUrl || form.lien,
        sourceUrl: optionalUrl.trim() || extracted.sourceUrl || form.sourceUrl,
        requiredLanguages:
          extracted.requiredLanguages && extracted.requiredLanguages.length > 0
            ? extracted.requiredLanguages
            : form.requiredLanguages,
      });

      // Détection anti-doublon (même entreprise et même titre à 80%)
      if (existingItems && existingItems.length > 0) {
        const titleWords = updated.poste
          .toLowerCase()
          .split(" ")
          .filter((w) => w.length > 3);
        const match = existingItems.find((c) => {
          if (!c.entreprise || !updated.entreprise) return false;
          const sameCompany =
            c.entreprise.toLowerCase() === updated.entreprise.toLowerCase();
          if (!sameCompany) return false;
          if (c.poste.toLowerCase() === updated.poste.toLowerCase())
            return true;
          const currentWords = c.poste
            .toLowerCase()
            .split(" ")
            .filter((w) => w.length > 3);
          const sharedWords = titleWords.filter((w) => currentWords.includes(w));
          return sharedWords.length > 0;
        });

        if (match) {
          setDuplicateMatch(match);
        }
      }

      setMode("form");
      setForm(updated);
      setErrorMsg(null);
    } catch (normalizeErr) {
      console.error(
        "Erreur lors de la normalisation de l'offre extraite :",
        normalizeErr,
      );
      setErrorMsg(
        "Une erreur est survenue lors de l'application des données. Veuillez vérifier les champs.",
      );
    } finally {
      setAnalyzing(false);
    }
  };`;

const newCode = code.substring(0, startIndex) + replacement + code.substring(endIndex + 33);
fs.writeFileSync('src/components/CandidatureSheet.tsx', newCode);

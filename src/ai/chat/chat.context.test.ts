import { describe, it, expect } from "vitest";
import {
  normalizeStringArray,
  normalizeLanguesArray,
  normalizeCandidateContext,
  buildCandidateContextFromProfil,
} from "./chat.context";
import { ChatRequestZodSchema } from "./chat.schema";
import { emptyProfil, type Profil } from "@/lib/profil";
import type { ChatPersonaId } from "./chat.types";

describe("Chat Context Normalization", () => {
  it("normalizes competences from string with commas, semicolons, and bullets into string[]", () => {
    const raw = "Marketing, Finance; Négociation \n• Python \n• SQL";
    const res = normalizeStringArray(raw);
    expect(res).toEqual([
      "Marketing",
      "Finance",
      "Négociation",
      "Python",
      "SQL",
    ]);
    expect(Array.isArray(res)).toBe(true);
  });

  it("handles competences already as array", () => {
    const raw = ["React", "TypeScript", "", "   ", "React"];
    const res = normalizeStringArray(raw);
    expect(res).toEqual(["React", "TypeScript"]);
  });

  it("handles competences as array of objects", () => {
    const raw = [{ nom: "Gestion de projet" }, { name: "Scrum" }];
    const res = normalizeStringArray(raw);
    expect(res).toEqual(["Gestion de projet", "Scrum"]);
  });

  it("handles empty or null competences gracefully", () => {
    expect(normalizeStringArray("")).toEqual([]);
    expect(normalizeStringArray(null)).toEqual([]);
    expect(normalizeStringArray(undefined)).toEqual([]);
  });

  it("normalizes candidateContext containing string competences into valid array for Zod schema", () => {
    const rawContext = {
      name: "Jean Dupont",
      titreVise: "Chef de Produit",
      competences: "Marketing, Stratégie, Analyse de données",
      secteur: "Tech / SaaS",
    };

    const normalized = normalizeCandidateContext(rawContext);
    expect(normalized).toBeDefined();
    expect(Array.isArray(normalized?.competences)).toBe(true);
    expect(normalized?.competences).toEqual([
      "Marketing",
      "Stratégie",
      "Analyse de données",
    ]);

    // Test across all 4 experts + general advisor
    const personas: ChatPersonaId[] = [
      "general_advisor",
      "interview_coach",
      "cv_expert",
      "job_strategist",
      "salary_negotiator",
    ];

    for (const personaId of personas) {
      const payload = {
        messages: [
          {
            role: "user" as const,
            content: "Quelle fourchette de salaire demander ?",
          },
        ],
        modelId: "gemini-3.5-flash" as const,
        personaId,
        candidateContext: normalized,
      };

      const parsed = ChatRequestZodSchema.parse(payload);
      expect(parsed).toBeDefined();
      expect(Array.isArray(parsed.candidateContext?.competences)).toBe(true);
    }
  });

  it("builds normalized context from Profil and passes ChatRequestZodSchema", () => {
    const profil: Profil = {
      ...emptyProfil(),
      prenom: "Alice",
      nom: "Martin",
      titre: "Data Analyst",
      competences: "Python, SQL, Power BI",
      domaines: "Fintech",
      formation: "Master Big Data",
      ecole: "NEOMA",
      langues: "Français, Anglais C1",
      remuneration: "45k - 50k €",
    };

    const context = buildCandidateContextFromProfil(profil);
    expect(context).toBeDefined();
    expect(context?.name).toBe("Alice Martin");
    expect(context?.titreVise).toBe("Data Analyst");
    expect(Array.isArray(context?.competences)).toBe(true);
    expect(context?.competences).toContain("Python");
    expect(context?.competences).toContain("SQL");
    expect(context?.competences).toContain("Power BI");

    const payload = {
      messages: [{ role: "user" as const, content: "Simule un entretien" }],
      modelId: "gemini-3.5-flash" as const,
      personaId: "interview_coach" as const,
      candidateContext: context,
    };

    const parsed = ChatRequestZodSchema.parse(payload);
    expect(parsed).toBeDefined();
  });

  it("handles empty Profil without throwing errors or breaking schema", () => {
    const empty = emptyProfil();
    const context = buildCandidateContextFromProfil(empty);

    const payload = {
      messages: [{ role: "user" as const, content: "Bonjour" }],
      modelId: "gemini-3.5-flash" as const,
      personaId: "salary_negotiator" as const,
      candidateContext: context,
    };

    const parsed = ChatRequestZodSchema.parse(payload);
    expect(parsed).toBeDefined();
  });
});

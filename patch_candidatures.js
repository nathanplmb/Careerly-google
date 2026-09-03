const fs = require("fs");
let code = fs.readFileSync("src/lib/candidatures.ts", "utf8");

// Remove MatchScore and related types
code = code.replace(/export type MatchDetail = \{[\s\S]*?\};/, "");
code = code.replace(/export type CompetencesMatch = \{[\s\S]*?\};/, "");
code = code.replace(
  /export const RECOMMANDATIONS = \[[\s\S]*?\] as const;/,
  "",
);
code = code.replace(/export type RecommandationCode = .*?;/, "");
code = code.replace(/export type Recommandation = .*?;/, "");
code = code.replace(/export type MatchScore = \{[\s\S]*?\};/, "");

// Clean up Preparation
code = code.replace(
  /export type Preparation = \{[\s\S]*?\};/,
  `export type Preparation = {
  pourquoiEntreprise: string;
  pourquoiPoste: string;
  notes: string;
};`,
);

code = code.replace(
  /export function emptyPreparation\(\): Preparation \{[\s\S]*?\};?\s*?\}/,
  `export function emptyPreparation(): Preparation {
  return {
    pourquoiEntreprise: "",
    pourquoiPoste: "",
    notes: "",
  };
}`,
);

// Clean up WorkflowProgress
code = code.replace(
  /export type WorkflowProgress = \{[\s\S]*?\};/,
  `export type WorkflowProgress = {
  currentStep: WorkflowStepId;
  completedSteps: WorkflowStepId[];
  lastUpdated?: string;
};`,
);

// Clean up Candidature interface
code = code.replace(/  match: MatchScore \| null;\n/, "");

// Clean up emptyCandidature
code = code.replace(/    match: null,\n/, "");

// Clean up extra fields in seed calls
code = code.replace(
  /      c\.match \? \`\$\{c\.match\.global\}%\` : "",\n/g,
  "",
);
code = code.replace(/    match: c.match \?\? null,\n/g, "");

// Clean up normalizeCandidature
code = code.replace(
  /      completedSteps: c\.match \? \["offre", "match"\] : \["offre"\],\n/,
  '      completedSteps: ["offre"],\n',
);
code = code.replace(
  /      completedSteps: c\.workflowProgress\?.completedSteps \|\| \(c\.match \? \["offre", "match"\] : \["offre"\]\),\n/,
  '      completedSteps: c.workflowProgress?.completedSteps || ["offre"],\n',
);

// Next action: getProchaineAction uses matchFait
code = code.replace(
  /  const matchFait = Boolean\(c\.match \|\| steps\.includes\("match"\)\);\n/g,
  "",
);
code = code.replace(/  if \(\!matchFait\) \{[\s\S]*?    \};\n  \}\n/g, "");

fs.writeFileSync("src/lib/candidatures.ts", code);

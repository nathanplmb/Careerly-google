import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { notAuthenticated, supabaseForUser } from "../supabase";

export default defineTool({
  name: "update_candidature",
  title: "Mettre à jour une candidature",
  description:
    "Met à jour une candidature existante (statut, dates, commentaire, archivage) via son identifiant.",
  inputSchema: {
    id: z.string().trim().min(1).describe("Identifiant de la candidature."),
    statut: z.string().optional(),
    lieu: z.string().optional(),
    priorite: z
      .string()
      .optional()
      .describe("'auto', 'haute', 'moyenne' ou 'basse'."),
    date_envoi: z.string().optional().describe("YYYY-MM-DD"),
    date_relance: z.string().optional().describe("YYYY-MM-DD"),
    date_limite: z.string().optional().describe("YYYY-MM-DD"),
    commentaire: z.string().optional(),
    archive: z.boolean().optional(),
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: true,
    openWorldHint: false,
  },
  handler: async ({ id, ...fields }, ctx) => {
    if (!ctx.isAuthenticated()) return notAuthenticated();
    const patch = Object.fromEntries(
      Object.entries(fields).filter(([, v]) => v !== undefined),
    );
    if (Object.keys(patch).length === 0) {
      return {
        content: [{ type: "text", text: "Aucun champ à mettre à jour." }],
        isError: true,
      };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("candidatures")
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error)
      return {
        content: [{ type: "text", text: error.message }],
        isError: true,
      };
    if (!data)
      return {
        content: [{ type: "text", text: "Candidature introuvable." }],
        isError: true,
      };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { candidature: data },
    };
  },
});

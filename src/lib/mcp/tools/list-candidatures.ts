import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { notAuthenticated, supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_candidatures",
  title: "Lister les candidatures",
  description:
    "Liste les candidatures (stages/alternances) de l'utilisateur connecté, avec filtres optionnels sur le statut, l'entreprise et l'archivage.",
  inputSchema: {
    statut: z
      .string()
      .optional()
      .describe("Filtre exact sur le statut, ex. 'Envoyée', 'Entretien'."),
    entreprise: z
      .string()
      .optional()
      .describe("Filtre partiel sur le nom de l'entreprise."),
    inclure_archivees: z
      .boolean()
      .optional()
      .describe("Inclure les candidatures archivées."),
    limite: z
      .number()
      .int()
      .optional()
      .describe("Nombre maximum de résultats (défaut 50)."),
  },
  annotations: {
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: false,
  },
  handler: async ({ statut, entreprise, inclure_archivees, limite }, ctx) => {
    if (!ctx.isAuthenticated()) return notAuthenticated();
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("candidatures")
      .select(
        "id, entreprise, poste, statut, lieu, lien, source, secteur, priorite, archive, date_envoi, date_relance, date_limite, commentaire, match",
      )
      .order("updated_at", { ascending: false })
      .limit(Math.min(Math.max(limite ?? 50, 1), 200));

    if (statut) query = query.eq("statut", statut);
    if (entreprise) query = query.ilike("entreprise", `%${entreprise}%`);
    if (!inclure_archivees) query = query.eq("archive", false);

    const { data, error } = await query;
    if (error)
      return {
        content: [{ type: "text", text: error.message }],
        isError: true,
      };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { candidatures: data ?? [] },
    };
  },
});

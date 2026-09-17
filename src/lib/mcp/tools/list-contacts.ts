import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { notAuthenticated, supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_contacts",
  title: "Lister les contacts",
  description:
    "Liste les contacts professionnels (recruteurs, alumni, managers) de l'utilisateur connecté.",
  inputSchema: {
    recherche: z
      .string()
      .optional()
      .describe("Recherche partielle sur le nom ou l'entreprise."),
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
  handler: async ({ recherche, limite }, ctx) => {
    if (!ctx.isAuthenticated()) return notAuthenticated();
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("contacts")
      .select(
        "id, nom, entreprise, poste, email, telephone, linkedin, type, candidature_id, derniere_interaction, prochaine_action, date_prochaine_action, notes",
      )
      .order("updated_at", { ascending: false })
      .limit(Math.min(Math.max(limite ?? 50, 1), 200));

    if (recherche)
      query = query.or(
        `nom.ilike.%${recherche}%,entreprise.ilike.%${recherche}%`,
      );

    const { data, error } = await query;
    if (error)
      return {
        content: [{ type: "text", text: error.message }],
        isError: true,
      };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { contacts: data ?? [] },
    };
  },
});

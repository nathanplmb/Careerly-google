import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { notAuthenticated, supabaseForUser } from "../supabase";

export default defineTool({
  name: "create_candidature",
  title: "Ajouter une candidature",
  description:
    "Crée une nouvelle candidature (offre de stage ou d'alternance) pour l'utilisateur connecté.",
  inputSchema: {
    entreprise: z.string().trim().min(1).describe("Nom de l'entreprise."),
    poste: z.string().trim().min(1).describe("Intitulé du poste."),
    statut: z
      .string()
      .optional()
      .describe(
        "Statut initial, ex. 'À postuler', 'Envoyée'. Défaut : 'À postuler'.",
      ),
    lieu: z.string().optional(),
    lien: z.string().optional().describe("URL de l'offre."),
    source: z.string().optional().describe("Source de l'offre, ex. LinkedIn."),
    secteur: z.string().optional(),
    date_envoi: z
      .string()
      .optional()
      .describe("Date d'envoi au format YYYY-MM-DD."),
    date_limite: z
      .string()
      .optional()
      .describe("Date limite de candidature au format YYYY-MM-DD."),
    commentaire: z.string().optional(),
    detail: z.string().optional().describe("Description complète de l'offre."),
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false,
  },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) return notAuthenticated();
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("candidatures")
      .insert({
        user_id: ctx.getUserId()!,
        entreprise: input.entreprise,
        poste: input.poste,
        statut: input.statut ?? "À postuler",
        lieu: input.lieu ?? "",
        lien: input.lien ?? "",
        source: input.source ?? "",
        secteur: input.secteur ?? "",
        date_envoi: input.date_envoi ?? null,
        date_limite: input.date_limite ?? null,
        commentaire: input.commentaire ?? "",
        detail: input.detail ?? "",
      })
      .select()
      .single();

    if (error)
      return {
        content: [{ type: "text", text: error.message }],
        isError: true,
      };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { candidature: data },
    };
  },
});

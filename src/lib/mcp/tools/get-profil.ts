import { defineTool } from "@lovable.dev/mcp-js";
import { notAuthenticated, supabaseForUser } from "../supabase";

export default defineTool({
  name: "get_profil",
  title: "Lire mon profil",
  description:
    "Récupère le profil de recherche de l'utilisateur connecté (formation, compétences, critères, analyse de CV).",
  inputSchema: {},
  annotations: {
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: false,
  },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated()) return notAuthenticated();
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("profils")
      .select("*")
      .eq("user_id", ctx.getUserId()!)
      .maybeSingle();

    if (error)
      return {
        content: [{ type: "text", text: error.message }],
        isError: true,
      };
    if (!data)
      return {
        content: [
          { type: "text", text: "Aucun profil enregistré pour le moment." },
        ],
      };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { profil: data },
    };
  },
});

import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const Input = z.object({
  faits: z.string().min(1),
  profil: z.string().optional(),
});

export const genererBrief = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => Input.parse(data))
  .handler(async ({ data, context }) => {
    const { consommerQuota, limiterTexte } = await import("./quota.server");
    try {
      await consommerQuota(context.supabase, "brief");
    } catch (e) {
      // Quota atteint : réponse normale (pas d'exception) pour éviter une erreur runtime côté client.
      return {
        quotaAtteint: true as const,
        message: e instanceof Error ? e.message : "Quota IA atteint.",
        resume: "",
        elements: [],
        recommandations: [],
        modele: "",
      };
    }
    const { genererBriefIA, MODELE_BRIEF } = await import("./brief.server");
    const brief = await genererBriefIA({
      faits: limiterTexte(data.faits, "brief"),
      profil: limiterTexte(data.profil ?? "", "brief"),
    });
    return { ...brief, quotaAtteint: false as const, modele: MODELE_BRIEF };
  });

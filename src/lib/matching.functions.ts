import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const Input = z.object({
  profil: z.string().min(1),
  offre: z.string().min(10),
});

export const analyserCorrespondance = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => Input.parse(data))
  .handler(async ({ data, context }) => {
    const { consommerQuota, limiterTexte } = await import("./quota.server");
    await consommerQuota(context.supabase, "match");
    const { analyserCorrespondanceIA, MODELE_MATCH } =
      await import("./matching.server");
    const analyse = await analyserCorrespondanceIA({
      profil: limiterTexte(data.profil, "match"),
      offre: limiterTexte(data.offre, "match"),
    });
    return { ...analyse, modele: MODELE_MATCH };
  });

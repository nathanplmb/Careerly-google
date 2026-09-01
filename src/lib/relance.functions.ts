import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const Input = z.object({
  typeRelance: z.string().min(1),
  contact: z.string().min(1),
  profil: z.string().default(""),
  offre: z.string().default(""),
  historique: z.string().default(""),
  consigne: z.string().default(""),
});

export const genererRelance = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => Input.parse(data))
  .handler(async ({ data, context }) => {
    const { consommerQuota, limiterEntree } = await import("./quota.server");
    await consommerQuota(context.supabase, "relance");
    const { genererRelanceIA, MODELE_RELANCE } =
      await import("./relance.server");
    const relance = await genererRelanceIA({
      ...data,
      ...limiterEntree(data, "relance"),
    });
    return { ...relance, modele: MODELE_RELANCE };
  });

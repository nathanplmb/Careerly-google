import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const Input = z.object({ texte: z.string().min(10) });

export const analyserOffre = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => Input.parse(data))
  .handler(async ({ data, context }) => {
    const { consommerQuota, limiterTexte } = await import("./quota.server");
    await consommerQuota(context.supabase, "offre");
    const { extraireOffre } = await import("./extraction.server");
    return extraireOffre(limiterTexte(data.texte, "offre"));
  });

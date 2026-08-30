import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const Input = z.object({
  texte: z.string().min(10),
  aujourdhui: z.string(),
});

export const trierAvecIa = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => Input.parse(data))
  .handler(async ({ data, context }) => {
    const { consommerQuota, limiterTexte } = await import("./quota.server");
    await consommerQuota(context.supabase, "tri");
    const { trierTexte } = await import("./tri-ia.server");
    return trierTexte(limiterTexte(data.texte, "tri"), data.aujourdhui);
  });

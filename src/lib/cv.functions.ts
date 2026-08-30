import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const Input = z.object({
  cv: z.string().min(50),
  profil: z.string().optional(),
});

export const analyserCv = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => Input.parse(data))
  .handler(async ({ data, context }) => {
    const { consommerQuota, limiterTexte } = await import("./quota.server");
    await consommerQuota(context.supabase, "cv");
    const { analyserCvIA, MODELE_CV } = await import("./cv.server");
    const analyse = await analyserCvIA({
      cv: limiterTexte(data.cv, "cv"),
      profil: limiterTexte(data.profil ?? "", "cv"),
    });
    return { ...analyse, modele: MODELE_CV };
  });

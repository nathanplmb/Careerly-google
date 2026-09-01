import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const SyntheseInput = z.object({
  profilTexte: z.string().min(5),
});

export const genererSyntheseProfil = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => SyntheseInput.parse(data))
  .handler(async ({ data, context }) => {
    const { consommerQuota } = await import("./quota.server");
    await consommerQuota(context.supabase, "profil_synthese").catch(
      () => undefined,
    );
    const { genererSyntheseProfilIAServer } =
      await import("./profil-ia.server");
    return await genererSyntheseProfilIAServer(data.profilTexte);
  });

const OptimiserInput = z.object({
  profilTexte: z.string().min(5),
});

export const optimiserProfilIA = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => OptimiserInput.parse(data))
  .handler(async ({ data, context }) => {
    const { consommerQuota } = await import("./quota.server");
    await consommerQuota(context.supabase, "profil_audit").catch(
      () => undefined,
    );
    const { optimiserProfilIAServer } = await import("./profil-ia.server");
    return await optimiserProfilIAServer(data.profilTexte);
  });

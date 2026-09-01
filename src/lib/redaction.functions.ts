import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const Entree = z.object({
  profil: z.string().default(""),
  offre: z.string().default(""),
  consigne: z.string().default(""),
});

export const genererLettre = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => Entree.parse(data))
  .handler(async ({ data, context }) => {
    const { consommerQuota, limiterEntree } = await import("./quota.server");
    await consommerQuota(context.supabase, "redaction");
    const { genererLettreIA } = await import("./redaction.server");
    return genererLettreIA(limiterEntree(data, "redaction"));
  });

export const genererLinkedin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => Entree.parse(data))
  .handler(async ({ data, context }) => {
    const { consommerQuota, limiterEntree } = await import("./quota.server");
    await consommerQuota(context.supabase, "redaction");
    const { genererLinkedinIA } = await import("./redaction.server");
    return genererLinkedinIA(limiterEntree(data, "redaction"));
  });

export const genererInterview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => Entree.parse(data))
  .handler(async ({ data, context }) => {
    const { consommerQuota, limiterEntree } = await import("./quota.server");
    await consommerQuota(context.supabase, "redaction");
    const { genererInterviewIA } = await import("./redaction.server");
    return genererInterviewIA(limiterEntree(data, "redaction"));
  });

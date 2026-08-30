import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type LigneUsage = { outil: string; limite: number; utilise: number };
export type UsageIa = {
  plan: string;
  lignes: LigneUsage[];
  total_utilise: number;
  total_limite: number;
};

export const usageIaDuJour = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("usage_ia_du_jour");
    if (error) throw new Error("Usage IA indisponible pour le moment.");
    return (data ?? {
      plan: "gratuit",
      lignes: [],
      total_utilise: 0,
      total_limite: 60,
    }) as unknown as UsageIa;
  });

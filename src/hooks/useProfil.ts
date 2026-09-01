import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { loadProfil, saveProfilLocal, type Profil } from "@/lib/profil";
import { fetchProfil } from "@/lib/profil-cloud";
import type { NormalizedUser } from "@/hooks/useSession";

/** Profil courant : cloud si connecté (avec repli local), sinon local. */
export function useProfil(user: User | NormalizedUser | null) {
  const [profil, setProfil] = useState<Profil | null>(() => loadProfil());
  const userId = user?.id;

  useEffect(() => {
    let cancelled = false;
    const local = loadProfil();
    setProfil(local);
    if (!userId) return;
    void fetchProfil(userId)
      .then((cloud) => {
        if (!cancelled && cloud) {
          setProfil(cloud);
          saveProfilLocal(cloud);
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return profil;
}

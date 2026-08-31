import { useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { getCompteActif } from "@/lib/auth-local";

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [localUser, setLocalUser] = useState(getCompteActif());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const handleLocalAuth = () => {
      setLocalUser(getCompteActif());
    };
    window.addEventListener("careerly_auth_change", handleLocalAuth);

    try {
      const res = supabase.auth.onAuthStateChange((_e, s) => {
        setSession(s);
        setLoading(false);
      });
      unsubscribe = res?.data?.subscription?.unsubscribe;

      supabase.auth
        .getSession()
        .then(({ data }) => {
          setSession(data?.session ?? null);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } catch {
      setLoading(false);
    }

    return () => {
      unsubscribe?.();
      window.removeEventListener("careerly_auth_change", handleLocalAuth);
    };
  }, []);

  const computedUser: User | null = useMemo(() => {
    if (session?.user) return session.user;
    if (localUser) {
      return {
        id: localUser.id,
        email: localUser.email,
        user_metadata: {
          full_name: `${localUser.prenom ?? ""} ${localUser.nom ?? ""}`.trim(),
        },
        app_metadata: {},
        aud: "authenticated",
        created_at: localUser.creeLe,
      } as unknown as User;
    }
    return null;
  }, [session?.user, localUser]);

  return { session, user: computedUser, loading };
}

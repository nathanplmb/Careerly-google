import { useEffect, useMemo, useState } from "react";
import type { Session, User as SupabaseUser } from "@supabase/supabase-js";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import {
  auth as firebaseAuth,
  isFirebaseConfigured,
} from "@/integrations/firebase/client";
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";
import { getCompteActif } from "@/lib/auth-local";

export interface NormalizedUser {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
  };
  app_metadata: Record<string, unknown>;
  aud: string;
  created_at: string;
}

export function useSession() {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [localUser, setLocalUser] = useState<ReturnType<
    typeof getCompteActif
  > | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLocalUser(getCompteActif());
    let unsubsFirebase: (() => void) | undefined;
    if (isFirebaseConfigured()) {
      unsubsFirebase = onAuthStateChanged(firebaseAuth, (fUser) => {
        setFirebaseUser(fUser);
        setLoading(false);
      });
    }

    let unsubscribeSupabase: (() => void) | undefined;
    const handleLocalAuth = () => {
      setLocalUser(getCompteActif());
    };
    window.addEventListener("careerly_auth_change", handleLocalAuth);

    if (isSupabaseConfigured()) {
      try {
        const res = supabase.auth.onAuthStateChange((_e, s) => {
          setSession(s);
          setLoading(false);
        });
        unsubscribeSupabase = res?.data?.subscription?.unsubscribe;

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
    } else if (!isFirebaseConfigured()) {
      setLoading(false);
    }

    return () => {
      unsubsFirebase?.();
      unsubscribeSupabase?.();
      window.removeEventListener("careerly_auth_change", handleLocalAuth);
    };
  }, []);

  const computedUser = useMemo((): NormalizedUser | SupabaseUser | null => {
    if (firebaseUser) {
      return {
        id: firebaseUser.uid,
        email: firebaseUser.email ?? "",
        user_metadata: {
          full_name:
            firebaseUser.displayName ||
            firebaseUser.email?.split("@")[0] ||
            "Membre",
          avatar_url: firebaseUser.photoURL ?? undefined,
        },
        app_metadata: { provider: "firebase" },
        aud: "authenticated",
        created_at:
          firebaseUser.metadata.creationTime ?? new Date().toISOString(),
      };
    }
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
      };
    }
    return null;
  }, [firebaseUser, session?.user, localUser]);

  return { session, user: computedUser, firebaseUser, loading };
}

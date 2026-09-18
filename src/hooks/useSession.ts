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

// Shared global session state to avoid multiple concurrent auth listeners and redundant re-renders
let cachedFirebaseUser: FirebaseUser | null = null;
let cachedSession: Session | null = null;
let cachedLocalUser: ReturnType<typeof getCompteActif> | null = null;
let cachedLoading = true;
let isAuthInitialized = false;
const sessionListeners = new Set<() => void>();

function notifySessionListeners() {
  sessionListeners.forEach((listener) => listener());
}

function initGlobalAuth() {
  if (isAuthInitialized || typeof window === "undefined") return;
  isAuthInitialized = true;
  cachedLocalUser = getCompteActif();

  if (isFirebaseConfigured()) {
    onAuthStateChanged(firebaseAuth, (fUser) => {
      cachedFirebaseUser = fUser;
      cachedLoading = false;
      notifySessionListeners();
    });
  }

  window.addEventListener("careerly_auth_change", () => {
    cachedLocalUser = getCompteActif();
    notifySessionListeners();
  });

  if (isSupabaseConfigured()) {
    try {
      supabase.auth.onAuthStateChange((_e, s) => {
        cachedSession = s;
        cachedLoading = false;
        notifySessionListeners();
      });

      supabase.auth
        .getSession()
        .then(({ data }) => {
          cachedSession = data?.session ?? null;
          cachedLoading = false;
          notifySessionListeners();
        })
        .catch(() => {
          cachedLoading = false;
          notifySessionListeners();
        });
    } catch {
      cachedLoading = false;
      notifySessionListeners();
    }
  } else if (!isFirebaseConfigured()) {
    cachedLoading = false;
    notifySessionListeners();
  }
}

export function useSession() {
  const [, setTick] = useState(0);

  useEffect(() => {
    initGlobalAuth();
    const update = () => setTick((t) => t + 1);
    sessionListeners.add(update);
    return () => {
      sessionListeners.delete(update);
    };
  }, []);

  // Compute normalized user from cached state
  const computedUser = useMemo((): NormalizedUser | SupabaseUser | null => {
    if (cachedFirebaseUser) {
      return {
        id: cachedFirebaseUser.uid,
        email: cachedFirebaseUser.email ?? "",
        user_metadata: {
          full_name:
            cachedFirebaseUser.displayName ||
            cachedFirebaseUser.email?.split("@")[0] ||
            "Membre",
          avatar_url: cachedFirebaseUser.photoURL ?? undefined,
        },
        app_metadata: { provider: "firebase" },
        aud: "authenticated",
        created_at:
          cachedFirebaseUser.metadata.creationTime ?? new Date().toISOString(),
      };
    }
    if (cachedSession?.user) return cachedSession.user;
    if (cachedLocalUser) {
      return {
        id: cachedLocalUser.id,
        email: cachedLocalUser.email,
        user_metadata: {
          full_name:
            `${cachedLocalUser.prenom ?? ""} ${cachedLocalUser.nom ?? ""}`.trim(),
        },
        app_metadata: {},
        aud: "authenticated",
        created_at: cachedLocalUser.creeLe,
      };
    }
    return null;
  }, [cachedFirebaseUser, cachedSession?.user, cachedLocalUser]);

  return {
    session: cachedSession,
    user: computedUser,
    firebaseUser: cachedFirebaseUser,
    loading: cachedLoading,
  };
}

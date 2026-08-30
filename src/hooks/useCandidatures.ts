import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSession } from "@/hooks/useSession";
import {
  deleteCandidature,
  fetchCandidatures,
  insertManyCandidatures,
  upsertCandidature,
} from "@/lib/candidatures-cloud";
import {
  loadCandidatures,
  saveCandidatures,
  SEED,
  STORAGE_KEY,
  type Candidature,
} from "@/lib/candidatures";

/**
 * Source unique des candidatures : cloud si connecté, navigateur sinon.
 * Partagé par toutes les pages (dashboard, candidatures, calendrier…).
 */
export function useCandidatures() {
  const { user, loading: authLoading } = useSession();
  const [items, setItems] = useState<Candidature[]>(SEED);
  const [ready, setReady] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const migre = useRef(false);

  useEffect(() => {
    if (authLoading) return;
    let cancelled = false;

    if (!user) {
      setItems(loadCandidatures());
      setReady(true);
      return;
    }

    setReady(false);
    setSyncing(true);
    (async () => {
      try {
        const cloud = await fetchCandidatures();
        const local = loadCandidatures();
        if (cloud.length === 0 && local.length > 0 && !migre.current) {
          migre.current = true;
          const migrated = await insertManyCandidatures(local, user.id);
          if (!cancelled) {
            setItems(migrated);
            window.localStorage.removeItem(STORAGE_KEY);
            toast.success(
              "Vos candidatures ont été transférées sur votre compte.",
            );
          }
        } else if (!cancelled) {
          setItems(cloud);
        }
      } catch {
        if (!cancelled) toast.error("Synchronisation impossible.");
      } finally {
        if (!cancelled) {
          setSyncing(false);
          setReady(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  // Multi-appareils : on relit le cloud au retour sur l'onglet.
  useEffect(() => {
    if (!user) return;
    const refresh = () => {
      if (document.visibilityState !== "visible") return;
      void fetchCandidatures()
        .then(setItems)
        .catch(() => undefined);
    };
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [user]);

  useEffect(() => {
    if (ready && !user) saveCandidatures(items);
  }, [items, ready, user]);

  const pushCloud = useCallback(
    (c: Candidature) => {
      if (!user) return;
      void upsertCandidature(c, user.id).catch(() =>
        toast.error("Enregistrement en ligne impossible."),
      );
    },
    [user],
  );

  const patch = useCallback(
    (id: string, p: Partial<Candidature>) => {
      setItems((prev) => {
        const current = prev.find((c) => c.id === id);
        if (!current) return prev;
        const next = { ...current, ...p };
        pushCloud(next);
        return prev.map((c) => (c.id === id ? next : c));
      });
    },
    [pushCloud],
  );

  const remove = useCallback(
    (id: string) => {
      setItems((prev) => prev.filter((p) => p.id !== id));
      if (user)
        void deleteCandidature(id).catch(() =>
          toast.error("Suppression en ligne impossible."),
        );
    },
    [user],
  );

  const save = useCallback(
    async (c: Candidature) => {
      let saved = c;
      if (user) {
        try {
          saved = await upsertCandidature(c, user.id);
        } catch {
          toast.error("Enregistrement en ligne impossible.");
        }
      }
      setItems((prev) =>
        prev.some((p) => p.id === c.id)
          ? prev.map((p) => (p.id === c.id ? saved : p))
          : [saved, ...prev],
      );
      return saved;
    },
    [user],
  );

  return {
    user,
    authLoading,
    items,
    setItems,
    ready,
    syncing,
    patch,
    remove,
    save,
    pushCloud,
  };
}

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
  const { session, user, loading: authLoading } = useSession();
  const isCloudUser = Boolean(session?.user?.id);
  const userId = session?.user?.id || user?.id;
  const [items, setItems] = useState<Candidature[]>(SEED);
  const [ready, setReady] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const migre = useRef(false);

  useEffect(() => {
    if (authLoading) return;
    let cancelled = false;

    if (!isCloudUser) {
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
        if (
          cloud.length === 0 &&
          local.length > 0 &&
          !migre.current &&
          userId
        ) {
          migre.current = true;
          const migrated = await insertManyCandidatures(local, userId);
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
        if (!cancelled) {
          // Repli silencieux sur le stockage local si déconnecté ou erreur réseau
          setItems(loadCandidatures());
        }
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
  }, [isCloudUser, userId, authLoading]);

  // Multi-appareils : on relit le cloud au retour sur l'onglet si connecté au cloud
  useEffect(() => {
    if (!isCloudUser) return;
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
  }, [isCloudUser]);

  useEffect(() => {
    if (ready && !isCloudUser) saveCandidatures(items);
  }, [items, ready, isCloudUser]);

  const pushCloud = useCallback(
    (c: Candidature) => {
      if (!isCloudUser || !session?.user?.id) return;
      void upsertCandidature(c, session.user.id).catch(() =>
        toast.error("Enregistrement en ligne impossible."),
      );
    },
    [isCloudUser, session?.user?.id],
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
      if (isCloudUser)
        void deleteCandidature(id).catch(() =>
          toast.error("Suppression en ligne impossible."),
        );
    },
    [isCloudUser],
  );

  const save = useCallback(
    async (c: Candidature) => {
      let saved = c;
      if (isCloudUser && session?.user?.id) {
        try {
          saved = await upsertCandidature(c, session.user.id);
        } catch {
          // Ne bloque pas la sauvegarde locale
        }
      }
      setItems((prev) =>
        prev.some((p) => p.id === c.id)
          ? prev.map((p) => (p.id === c.id ? saved : p))
          : [saved, ...prev],
      );
      return saved;
    },
    [isCloudUser, session?.user?.id],
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

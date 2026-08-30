import { useEffect, useState } from "react";
import { Fingerprint, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { verifyBiometric } from "@/lib/biometric";

const KEY = "neoma-biometrie-unlocked";

export function useBiometricLock(userId: string | null, enabled: boolean) {
  const [unlocked, setUnlocked] = useState(true);

  useEffect(() => {
    if (!userId || !enabled) {
      setUnlocked(true);
      return;
    }
    setUnlocked(window.sessionStorage.getItem(KEY) === userId);
  }, [userId, enabled]);

  const unlock = () => {
    if (userId) window.sessionStorage.setItem(KEY, userId);
    setUnlocked(true);
  };

  return { unlocked, unlock };
}

export function BiometricLockScreen({
  userId,
  onUnlock,
}: {
  userId: string;
  onUnlock: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const tryUnlock = async () => {
    setLoading(true);
    setError("");
    try {
      await verifyBiometric(userId);
      onUnlock();
    } catch {
      setError("Vérification impossible. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="surface-card w-full max-w-sm p-8 text-center">
        <Fingerprint className="mx-auto size-10 text-primary" />
        <h1 className="mt-4 text-xl font-semibold">Suivi verrouillé</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Déverrouillez avec votre empreinte ou votre visage pour accéder à vos
          candidatures.
        </p>
        <Button
          className="mt-6 w-full"
          onClick={() => void tryUnlock()}
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : <Fingerprint />}{" "}
          Déverrouiller
        </Button>
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      </div>
    </div>
  );
}

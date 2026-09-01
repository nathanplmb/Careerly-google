import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { signOut as firebaseSignOut } from "firebase/auth";
import {
  auth as firebaseAuth,
  isFirebaseConfigured,
} from "@/integrations/firebase/client";
import {
  Fingerprint,
  LogIn,
  LogOut,
  Settings,
  Sparkles,
  UserCheck,
  UserPlus,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  biometricEnabled,
  biometricSupported,
  disableBiometric,
  enableBiometric,
} from "@/lib/biometric";
import { getCompteActif, setCompteActif } from "@/lib/auth-local";

export function AccountMenu({ user }: { user: User | null }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [bio, setBio] = useState(false);
  const [supported, setSupported] = useState(false);

  const localCompte = getCompteActif();
  const displayName =
    (user?.user_metadata?.full_name as string) ||
    (localCompte?.prenom
      ? `${localCompte.prenom} ${localCompte.nom || ""}`.trim()
      : null) ||
    user?.email?.split("@")[0] ||
    "Mon compte";

  const initials = (
    localCompte?.prenom?.[0] ||
    user?.email?.[0] ||
    "U"
  ).toUpperCase();

  useEffect(() => {
    setSupported(biometricSupported());
    if (user?.id) {
      setBio(biometricEnabled(user.id));
    } else {
      setBio(false);
    }
  }, [user?.id]);

  const toggleBio = async () => {
    if (!user) return;
    if (bio) {
      disableBiometric(user.id);
      setBio(false);
      toast.success("Déverrouillage biométrique désactivé.");
      return;
    }
    try {
      await enableBiometric(user.id, user.email ?? "");
      setBio(true);
      toast.success("Déverrouillage biométrique activé sur cet appareil.");
    } catch {
      toast.error("Impossible d'activer la biométrie sur cet appareil.");
    }
  };

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    setCompteActif(null);
    if (isFirebaseConfigured()) {
      try {
        await firebaseSignOut(firebaseAuth);
      } catch {
        // Ignoré
      }
    }
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignoré
    }
    toast.success("Déconnexion réussie");
    navigate({ to: "/auth", replace: true });
  };

  if (!user) {
    return (
      <Button
        asChild
        size="sm"
        variant="outline"
        className="gap-2 border-primary/30 hover:bg-primary/5"
      >
        <Link to="/auth">
          <LogIn className="size-4 text-primary" />
          <span>Connexion</span>
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-border/80 hover:bg-accent px-2.5"
        >
          <div className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
            {initials}
          </div>
          <span className="max-w-28 truncate text-xs font-medium">
            {displayName}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-1.5 shadow-xl">
        <DropdownMenuLabel className="p-2 font-normal">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground truncate">
                {displayName}
              </p>
              <span className="inline-flex items-center gap-1 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                <UserCheck className="size-3" /> Connecté
              </span>
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
            {localCompte?.ecole && (
              <p className="text-[11px] text-muted-foreground/80 truncate">
                🎓 {localCompte.ecole}
              </p>
            )}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to="/parametres" className="cursor-pointer gap-2 text-xs">
            <Settings className="size-4 text-muted-foreground" />
            <span>Paramètres & Profil</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to="/auth" className="cursor-pointer gap-2 text-xs">
            <UserPlus className="size-4 text-muted-foreground" />
            <span>Changer de compte</span>
          </Link>
        </DropdownMenuItem>

        {supported && (
          <DropdownMenuItem
            className="cursor-pointer gap-2 text-xs"
            onSelect={(e) => {
              e.preventDefault();
              void toggleBio();
            }}
          >
            <Fingerprint className="size-4 text-muted-foreground" />
            <span>
              {bio ? "Désactiver la biométrie" : "Activer la biométrie"}
            </span>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer gap-2 text-xs text-destructive focus:bg-destructive/10 focus:text-destructive"
          onSelect={() => void signOut()}
        >
          <LogOut className="size-4" />
          <span>Se déconnecter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

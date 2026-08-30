import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Fingerprint, LogIn, LogOut, UserRound } from "lucide-react";
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
import { setCompteActif } from "@/lib/auth-local";

export function AccountMenu({ user }: { user: User | null }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [bio, setBio] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(biometricSupported());
    setBio(user ? biometricEnabled(user.id) : false);
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
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignored
    }
    toast.success("Déconnexion réussie");
    navigate({ to: "/auth", replace: true });
  };

  if (!user) {
    return (
      <Button asChild size="sm" variant="outline">
        <Link to="/auth">
          <LogIn className="size-4" /> Créer un compte
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <UserRound className="size-4" />
          <span className="max-w-32 truncate">
            {user.email ?? "Mon compte"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="truncate">{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {supported && (
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              void toggleBio();
            }}
          >
            <Fingerprint className="size-4" />
            {bio
              ? "Désactiver la biométrie"
              : "Activer le déverrouillage biométrique"}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onSelect={() => void signOut()}>
          <LogOut className="size-4" /> Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

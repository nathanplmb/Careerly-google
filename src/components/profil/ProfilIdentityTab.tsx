import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Car,
  Image as ImageIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { Profil } from "@/lib/profil";

type Props = {
  profil: Profil;
  onChange: (patch: Partial<Profil>) => void;
};

export function ProfilIdentityTab({ profil, onChange }: Props) {
  const cv = profil.cvStructure;

  const updateCvField = (field: string, val: string) => {
    onChange({
      cvStructure: {
        ...cv,
        [field]: val,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Informations Principales */}
      <div className="glass-card p-5 sm:p-6 space-y-5">
        <div className="flex items-center gap-3 border-b border-border/50 pb-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
            <UserRound className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Identité & Positionnement
            </h3>
            <p className="text-xs text-muted-foreground">
              Vos informations visibles et votre titre professionnel principal
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Prénom *</Label>
            <Input
              value={profil.prenom}
              onChange={(e) => {
                onChange({ prenom: e.target.value });
                updateCvField("prenom", e.target.value);
              }}
              placeholder="Ex : Lucas, Sarah..."
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Nom *</Label>
            <Input
              value={profil.nom}
              onChange={(e) => {
                onChange({ nom: e.target.value });
                updateCvField("nom", e.target.value);
              }}
              placeholder="Ex : Dupont, Martin..."
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">
            Titre professionnel / Accroche cible *
          </Label>
          <Input
            value={profil.titre || cv?.titre || ""}
            onChange={(e) => {
              onChange({ titre: e.target.value });
              updateCvField("titre", e.target.value);
            }}
            placeholder="Ex : Étudiant M1 PGE @ NEOMA | Recherche Stage Bras Droit / Product Manager (6 mois)"
          />
          <p className="text-[11px] text-muted-foreground">
            💡 Ce titre oriente immédiatement le matching IA et apparaît en
            en-tête de vos candidatures.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Photo de profil (URL)
            </Label>
            <div className="flex gap-2">
              <Input
                value={profil.photoUrl || cv?.photoUrl || ""}
                onChange={(e) => {
                  onChange({ photoUrl: e.target.value });
                  updateCvField("photoUrl", e.target.value);
                }}
                placeholder="https://mon-image.jpg ou avatar..."
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Permis de conduire
            </Label>
            <Input
              value={profil.permis || cv?.permis || ""}
              onChange={(e) => {
                onChange({ permis: e.target.value });
                updateCvField("permis", e.target.value);
              }}
              placeholder="Ex : Permis B, Véhiculé(e)..."
            />
          </div>
        </div>
      </div>

      {/* 2. Coordonnées & Localisation */}
      <div className="glass-card p-5 sm:p-6 space-y-5">
        <div className="flex items-center gap-3 border-b border-border/50 pb-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
            <MapPin className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Coordonnées & Mobilité géographique
            </h3>
            <p className="text-xs text-muted-foreground">
              Pour vous contacter et évaluer le critère de localisation
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Mail className="size-3.5" /> Email de contact
            </Label>
            <Input
              type="email"
              value={profil.emailContact || cv?.email || ""}
              onChange={(e) => {
                onChange({ emailContact: e.target.value });
                updateCvField("email", e.target.value);
              }}
              placeholder="votre.email@etudiant.fr"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Phone className="size-3.5" /> Téléphone
            </Label>
            <Input
              type="tel"
              value={profil.telephone || cv?.telephone || ""}
              onChange={(e) => {
                onChange({ telephone: e.target.value });
                updateCvField("telephone", e.target.value);
              }}
              placeholder="+33 6 12 34 56 78"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Ville actuelle
            </Label>
            <Input
              value={profil.localisation || cv?.ville || ""}
              onChange={(e) => {
                onChange({ localisation: e.target.value });
                updateCvField("ville", e.target.value);
              }}
              placeholder="Ex : Paris, Lyon, Rouen, Reims..."
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Pays</Label>
            <Input
              value={profil.pays || cv?.pays || "France"}
              onChange={(e) => {
                onChange({ pays: e.target.value });
                updateCvField("pays", e.target.value);
              }}
              placeholder="Ex : France, Royaume-Uni..."
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Mobilité géographique
            </Label>
            <Input
              value={profil.mobilite}
              onChange={(e) => onChange({ mobilite: e.target.value })}
              placeholder="Ex : Île-de-France, France entière, International..."
            />
          </div>
        </div>
      </div>

      {/* 3. Liens & Présence en Ligne */}
      <div className="glass-card p-5 sm:p-6 space-y-5">
        <div className="flex items-center gap-3 border-b border-border/50 pb-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
            <Globe className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Liens & Réseaux Professionnels
            </h3>
            <p className="text-xs text-muted-foreground">
              LinkedIn, portfolio de projets, profil GitHub ou site personnel
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Linkedin className="size-3.5 text-blue-400" /> Profil LinkedIn
            </Label>
            <Input
              value={profil.linkedin || cv?.linkedin || ""}
              onChange={(e) => {
                onChange({ linkedin: e.target.value });
                updateCvField("linkedin", e.target.value);
              }}
              placeholder="linkedin.com/in/nom-prenom"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Globe className="size-3.5 text-emerald-400" /> Portfolio / Site
            </Label>
            <Input
              value={profil.portfolio || cv?.portfolio || ""}
              onChange={(e) => {
                onChange({ portfolio: e.target.value });
                updateCvField("portfolio", e.target.value);
              }}
              placeholder="https://mon-portfolio.fr"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Github className="size-3.5" /> Profil GitHub / Code
            </Label>
            <Input
              value={profil.github || cv?.github || ""}
              onChange={(e) => {
                onChange({ github: e.target.value });
                updateCvField("github", e.target.value);
              }}
              placeholder="github.com/mon-pseudo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

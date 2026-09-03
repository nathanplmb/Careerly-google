import { useState } from "react";
import {
  Lightbulb,
  HeartHandshake,
  Award,
  Compass,
  Plus,
  Trash2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Profil } from "@/lib/profil";
import {
  nouveauBenevolat,
  nouveauProjet,
  type CvBenevolat,
  type DistinctionCV,
  type CvProjet,
} from "@/lib/cv-structure";

type Props = {
  profil: Profil;
  onChange: (patch: Partial<Profil>) => void;
};

export function ProfilProjectsEngagementsTab({ profil, onChange }: Props) {
  const cv = profil.cvStructure;
  const projets = cv?.projets || [];
  const benevolats = cv?.benevolats || [];
  const distinctions = cv?.distinctions || [];

  const updateProjets = (nouv: CvProjet[]) => {
    onChange({
      cvStructure: {
        ...cv,
        projets: nouv,
      },
    });
  };

  const updateBenevolats = (nouv: CvBenevolat[]) => {
    onChange({
      cvStructure: {
        ...cv,
        benevolats: nouv,
      },
    });
  };

  const updateDistinctions = (nouv: DistinctionCV[]) => {
    onChange({
      cvStructure: {
        ...cv,
        distinctions: nouv,
      },
    });
  };

  const handleAjouterProjet = () => {
    updateProjets([nouveauProjet(), ...projets]);
  };

  const handleSupprimerProjet = (id: string) => {
    updateProjets(projets.filter((p) => p.id !== id));
  };

  const handleModifierProjet = (id: string, patch: Partial<CvProjet>) => {
    updateProjets(projets.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  const handleAjouterBenevolat = () => {
    updateBenevolats([nouveauBenevolat(), ...benevolats]);
  };

  const handleSupprimerBenevolat = (id: string) => {
    updateBenevolats(benevolats.filter((b) => b.id !== id));
  };

  const handleModifierBenevolat = (id: string, patch: Partial<CvBenevolat>) => {
    updateBenevolats(
      benevolats.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Projets Personnels & Hackathons */}
      <div className="glass-card p-5 sm:p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
              <Lightbulb className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Projets Personnels, Freelance & Hackathons ({projets.length})
              </h3>
              <p className="text-xs text-muted-foreground">
                Applications créées, études de cas, business plans ou projets
                concrets
              </p>
            </div>
          </div>

          <Button
            size="sm"
            onClick={handleAjouterProjet}
            className="gap-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs"
          >
            <Plus className="size-3.5" />
            Ajouter un projet
          </Button>
        </div>

        {projets.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-4">
            Aucun projet renseigné. Les projets concrets prouvent vos
            compétences pratiques !
          </p>
        )}

        <div className="space-y-4">
          {projets.map((p) => (
            <div
              key={p.id}
              className="rounded-xl border border-border/70 bg-card/50 p-4 space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <Input
                  value={p.nom || ""}
                  onChange={(e) =>
                    handleModifierProjet(p.id, { nom: e.target.value })
                  }
                  placeholder="Nom du projet (ex: Lancement d'un e-commerce, Hackathon IA...)"
                  className="text-xs font-semibold"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleSupprimerProjet(p.id)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-rose-400 shrink-0"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <Input
                  value={p.role || ""}
                  onChange={(e) =>
                    handleModifierProjet(p.id, { role: e.target.value })
                  }
                  placeholder="Votre rôle (ex: Lead Product, Développeur...)"
                  className="text-xs"
                />
                <Input
                  value={p.periode || ""}
                  onChange={(e) =>
                    handleModifierProjet(p.id, { periode: e.target.value })
                  }
                  placeholder="Période (ex: 2024, 3 mois...)"
                  className="text-xs"
                />
                <Input
                  value={p.lien || ""}
                  onChange={(e) =>
                    handleModifierProjet(p.id, { lien: e.target.value })
                  }
                  placeholder="Lien / Demo (ex: github.com/...)"
                  className="text-xs"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  value={p.contexte || ""}
                  onChange={(e) =>
                    handleModifierProjet(p.id, { contexte: e.target.value })
                  }
                  placeholder="Cadre / Contexte (ex: BUT Techniques de Commercialisation...)"
                  className="text-xs"
                />
                <Input
                  value={(p.technologies || p.outils || []).join(", ")}
                  onChange={(e) =>
                    handleModifierProjet(p.id, {
                      technologies: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                      outils: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="Technologies & outils (ex: Canva, CapCut...)"
                  className="text-xs"
                />
              </div>

              <Textarea
                rows={2}
                value={p.description || ""}
                onChange={(e) =>
                  handleModifierProjet(p.id, { description: e.target.value })
                }
                placeholder="Description du projet, contexte et résultats obtenus..."
                className="text-xs"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 2. Associations & Bénévolat */}
      <div className="glass-card p-5 sm:p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
              <HeartHandshake className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Associations Étudiantes & Engagements ({benevolats.length})
              </h3>
              <p className="text-xs text-muted-foreground">
                Mandats BDE, Junior-Entreprise, pôle humanitaire, clubs
                sportifs...
              </p>
            </div>
          </div>

          <Button
            size="sm"
            onClick={handleAjouterBenevolat}
            className="gap-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs"
          >
            <Plus className="size-3.5" />
            Ajouter un engagement
          </Button>
        </div>

        {benevolats.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-4">
            Aucun engagement associatif renseigné.
          </p>
        )}

        <div className="space-y-4">
          {benevolats.map((b) => (
            <div
              key={b.id}
              className="rounded-xl border border-border/70 bg-card/50 p-4 space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <Input
                  value={b.organisation}
                  onChange={(e) =>
                    handleModifierBenevolat(b.id, {
                      organisation: e.target.value,
                    })
                  }
                  placeholder="Nom de l'association / Organisation (ex: Junior Entreprise, BDE...)"
                  className="text-xs font-semibold"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleSupprimerBenevolat(b.id)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-rose-400 shrink-0"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  value={b.role}
                  onChange={(e) =>
                    handleModifierBenevolat(b.id, { role: e.target.value })
                  }
                  placeholder="Rôle / Mandat (ex: Vice-Président, Trésorier, Chef de projet...)"
                  className="text-xs"
                />
                <Input
                  value={b.periode || ""}
                  onChange={(e) =>
                    handleModifierBenevolat(b.id, { periode: e.target.value })
                  }
                  placeholder="Période (ex: 2023 - 2024)"
                  className="text-xs"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  value={b.equipe || ""}
                  onChange={(e) =>
                    handleModifierBenevolat(b.id, { equipe: e.target.value })
                  }
                  placeholder="Équipe / Management (ex: Management 24 membres)"
                  className="text-xs"
                />
                <Input
                  value={(b.outils || []).join(", ")}
                  onChange={(e) =>
                    handleModifierBenevolat(b.id, {
                      outils: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="Outils mobilisés (ex: Canva, Premiere...)"
                  className="text-xs"
                />
              </div>

              <Textarea
                rows={2}
                value={b.description || ""}
                onChange={(e) =>
                  handleModifierBenevolat(b.id, { description: e.target.value })
                }
                placeholder="Réalisations : gestion de budget, organisation d'événements (nb de participants)..."
                className="text-xs"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Centres d'Intérêt & Passions */}
      <div className="glass-card p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-3 border-b border-border/50 pb-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <Compass className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Centres d'intérêt & Passions Authentiques
            </h3>
            <p className="text-xs text-muted-foreground">
              Sports, musique, voyages, lectures, centres de curiosité
              personnelle
            </p>
          </div>
        </div>

        <Input
          value={(cv?.interets || []).join(", ")}
          onChange={(e) =>
            onChange({
              cvStructure: {
                ...cv,
                interets: e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              },
            })
          }
          placeholder="Ex : Course à pied (Semi-marathon de Paris), Piano jazz (10 ans de pratique), Voyages en autonomie, Échecs..."
          className="text-xs"
        />
      </div>
    </div>
  );
}

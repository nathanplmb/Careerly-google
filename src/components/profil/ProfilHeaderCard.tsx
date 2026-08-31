import { Sparkles, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import type { Profil } from "@/lib/profil";
import type { BilanCompletude } from "@/lib/profil-completion";

type Props = {
  profil: Profil;
  bilan: BilanCompletude;
  onOpenCvModal: () => void;
  onSelectTab: (tab: string) => void;
};

export function ProfilHeaderCard({
  profil,
  bilan,
  onOpenCvModal,
  onSelectTab,
}: Props) {
  const nomAffiche =
    profil.prenom || profil.nom
      ? `${profil.prenom} ${profil.nom}`.trim()
      : "Étudiant";

  const initiales =
    (profil.prenom?.[0] || "") + (profil.nom?.[0] || "") ||
    profil.ecole?.[0] ||
    "E";

  const sousTitre = [
    profil.ecole || "École à renseigner",
    profil.formation || "Cursus",
    profil.niveau,
  ]
    .filter(Boolean)
    .join(" • ");

  return (
    <div className="glass-card relative overflow-hidden p-6 sm:p-7">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-primary/10 blur-3xl" />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Identity & Main Info */}
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-xl font-bold text-primary-foreground shadow-md shadow-primary/20">
            {initiales.toUpperCase()}
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {nomAffiche}
              </h1>
              <Badge
                variant="outline"
                className={`text-xs font-medium ${bilan.badgeColor}`}
              >
                {bilan.label}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground">{sousTitre}</p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {profil.contrats && (
                <span className="inline-flex items-center rounded-md bg-secondary/80 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                  🎯 {profil.contrats}
                </span>
              )}
              {profil.localisation && (
                <span className="inline-flex items-center rounded-md bg-secondary/80 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                  📍 {profil.localisation}
                </span>
              )}
              {profil.domaines && (
                <span className="inline-flex items-center rounded-md bg-secondary/80 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                  💼 {profil.domaines.split(",")[0]?.trim()}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Completion Meter & AI Matching Power */}
        <div className="flex flex-col gap-3.5 rounded-xl border border-border/60 bg-background/50 p-4 lg:w-80">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <Sparkles className="size-3.5 text-primary" />
              Complétude du profil
            </span>
            <span className="text-sm font-bold text-foreground">
              {bilan.score}%
            </span>
          </div>

          <Progress value={bilan.score} className="h-2" />

          {bilan.suggestions.length > 0 ? (
            <div className="space-y-1">
              <span className="text-[11px] text-muted-foreground">
                Conseil pour booster le matching IA :
              </span>
              <button
                type="button"
                onClick={() => onSelectTab(bilan.suggestions[0].tab)}
                className="group flex w-full items-center justify-between text-left text-xs font-medium text-primary hover:underline"
              >
                <span>{bilan.suggestions[0].titre}</span>
                <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          ) : (
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
              ✨ Votre profil est complet ! Le matching IA et les lettres sont
              personnalisés au maximum.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

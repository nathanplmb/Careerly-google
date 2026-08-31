import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  FileCheck,
  GraduationCap,
  Sparkles,
  Target,
  UserCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useProfil } from "@/hooks/useProfil";
import { useSession } from "@/hooks/useSession";
import { calculerCompletudeProfil } from "@/lib/profil-completion";

export function AiContextCard({ onRefresh }: { onRefresh?: () => void }) {
  const { user } = useSession();
  const profil = useProfil(user);

  const completude = useMemo(() => {
    return calculerCompletudeProfil(profil);
  }, [profil]);

  const score = completude.score;
  const cv = profil.cvStructure;

  const nbExp = cv?.experiences?.length ?? 0;
  const nbComp = cv?.competences?.length ?? 0;
  const aObjectif = Boolean(profil.metiers?.trim() || profil.contrats?.trim());
  const aCvFichier = Boolean(profil.nomFichierCv || profil.cvOriginalUrl);

  const getQualiteLabel = (s: number) => {
    if (s >= 80)
      return {
        label: "IA Précision Maximale",
        color: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
        desc: "L'IA exploite l'ensemble de votre parcours, compétences et objectifs.",
      };
    if (s >= 50)
      return {
        label: "IA Précision Intermédiaire",
        color: "bg-amber-500/15 text-amber-300 border-amber-500/30",
        desc: "Complétez votre profil pour obtenir des simulations et arguments encore plus pointus.",
      };
    return {
      label: "IA Mode Générique",
      color: "bg-primary/15 text-primary border-primary/30",
      desc: "Renseignez votre CV et vos expériences clés pour des réponses sur-mesure.",
    };
  };

  const qualite = getQualiteLabel(score);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-card/90 via-card/60 to-primary/5 p-5 shadow-lg backdrop-blur-xl">
      {/* Decorative gradient glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Score & status */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="relative grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30">
              <BrainCircuit className="size-6 animate-pulse" />
              <span className="absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                AI
              </span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold tracking-tight text-foreground">
                  Contexte Profil Connecté
                </h3>
                <Badge
                  variant="outline"
                  className={`text-[11px] font-medium ${qualite.color}`}
                >
                  <Sparkles className="mr-1 size-3" />
                  {qualite.label}
                </Badge>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {qualite.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Actions & Score preview */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex min-w-[140px] flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-muted-foreground">
                Complétude
              </span>
              <span className="font-bold text-foreground">{score}%</span>
            </div>
            <Progress value={score} className="h-2 bg-muted/60" />
          </div>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 rounded-xl border-border/80 text-xs font-medium hover:border-primary/50 hover:bg-primary/10"
            >
              <Link to="/profil">
                <span>Gérer mon profil</span>
                <ChevronRight className="size-3.5" />
              </Link>
            </Button>
            {onRefresh && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRefresh}
                className="h-8 rounded-xl px-2.5 text-xs text-muted-foreground hover:text-foreground"
                title="Actualiser le contexte IA"
              >
                <Zap className="size-3.5 text-primary" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Active signals injected into AI */}
      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-border/40 pt-3 sm:grid-cols-4">
        <div className="flex items-center gap-2 rounded-xl bg-background/40 px-2.5 py-1.5 text-xs">
          <UserCheck className="size-3.5 shrink-0 text-primary" />
          <span className="truncate text-muted-foreground">
            {profil.prenom && profil.nom
              ? `${profil.prenom} ${profil.nom}`
              : "Identité de base"}
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-background/40 px-2.5 py-1.5 text-xs">
          <FileCheck className="size-3.5 shrink-0 text-primary" />
          <span className="truncate text-muted-foreground">
            {aCvFichier
              ? profil.nomFichierCv || "CV importé"
              : cv
                ? `${nbExp} exp • ${nbComp} comp`
                : "CV non importé"}
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-background/40 px-2.5 py-1.5 text-xs">
          <GraduationCap className="size-3.5 shrink-0 text-primary" />
          <span className="truncate text-muted-foreground">
            {profil.titre || cv?.titre || "Titre / École"}
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-background/40 px-2.5 py-1.5 text-xs">
          <Target className="size-3.5 shrink-0 text-primary" />
          <span className="truncate text-muted-foreground">
            {aObjectif
              ? profil.metiers || profil.contrats || "Cible définie"
              : "Objectif de poste"}
          </span>
        </div>
      </div>
    </div>
  );
}

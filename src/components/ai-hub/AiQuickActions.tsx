import {
  FileText,
  Linkedin,
  Mail,
  MessageSquare,
  Search,
  Sparkles,
  Wand2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AiWorkflowStep } from "@/lib/ai-hub";

export type QuickActionType =
  | "offre"
  | "ameliorer_cv"
  | "adapter_cv"
  | "email"
  | "linkedin"
  | "interview"
  | "tri";

interface AiQuickActionsProps {
  onSelectAction: (action: QuickActionType) => void;
  activeStep?: AiWorkflowStep;
}

const ACTIONS: {
  id: QuickActionType;
  label: string;
  desc: string;
  icon: typeof Search;
  gradient: string;
  badge?: string;
}[] = [
  {
    id: "offre",
    label: "Analyser une offre",
    desc: "Extraire missions, profil, entreprise et points clés.",
    icon: Search,
    gradient: "from-blue-500/20 to-indigo-500/10 text-blue-400",
    badge: "Étape 1",
  },
  {
    id: "adapter_cv",
    label: "Adapter mon CV à une offre",
    desc: "Identifier les mots-clés et arguments à aligner.",
    icon: Sparkles,
    gradient: "from-purple-500/20 to-pink-500/10 text-purple-400",
    badge: "Match & CV",
  },
  {
    id: "ameliorer_cv",
    label: "Optimiser mon profil / CV",
    desc: "Audit de complétude et suggestions IA sur vos expériences.",
    icon: FileText,
    gradient: "from-emerald-500/20 to-teal-500/10 text-emerald-400",
  },
  {
    id: "email",
    label: "Écrire un email",
    desc: "Candidature ciblée ou relance élégante avec contexte.",
    icon: Mail,
    gradient: "from-amber-500/20 to-orange-500/10 text-amber-400",
  },
  {
    id: "linkedin",
    label: "Écrire un message LinkedIn",
    desc: "Demande de connexion < 300 car. ou message d'approche.",
    icon: Linkedin,
    gradient: "from-sky-500/20 to-blue-500/10 text-sky-400",
  },
  {
    id: "interview",
    label: "Préparer un entretien",
    desc: "Simulation questions STAR, arguments & contre-questions.",
    icon: MessageSquare,
    gradient: "from-rose-500/20 to-red-500/10 text-rose-400",
    badge: "Coach",
  },
  {
    id: "tri",
    label: "Organiser mes candidatures",
    desc: "Copier-coller un email ou texte : l'IA classe tout en 1 clic.",
    icon: Wand2,
    gradient: "from-violet-500/20 to-fuchsia-500/10 text-violet-400",
    badge: "Copilote",
  },
];

export function AiQuickActions({ onSelectAction }: AiQuickActionsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Que voulez-vous faire ?
          </h2>
          <p className="text-xs text-muted-foreground">
            Sélectionnez une intention pour lancer immédiatement le copilote IA
            adapté.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ACTIONS.map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => onSelectAction(a.id)}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-card/90 hover:shadow-md"
            >
              <div>
                <div className="mb-2.5 flex items-center justify-between">
                  <span
                    className={cn(
                      "grid size-9 place-items-center rounded-xl bg-gradient-to-br ring-1 ring-border/40 transition-transform group-hover:scale-105",
                      a.gradient,
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  {a.badge && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary ring-1 ring-primary/20">
                      {a.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-[13.5px] font-semibold text-foreground group-hover:text-primary transition-colors">
                  {a.label}
                </h3>
                <p className="mt-1 text-[11.5px] leading-relaxed text-muted-foreground line-clamp-2">
                  {a.desc}
                </p>
              </div>

              <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                <span>Démarrer</span>
                <span>→</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

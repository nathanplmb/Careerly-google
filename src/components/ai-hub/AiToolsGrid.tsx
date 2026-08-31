import { Link } from "@tanstack/react-router";
import {
  Linkedin,
  Mail,
  MessageSquare,
  Plug,
  ScanLine,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const OUTILS: {
  label: string;
  badge?: string;
  desc: string;
  to: string;
  icon: LucideIcon;
  gradient: string;
}[] = [
  {
    label: "Match IA",
    badge: "Matching",
    desc: "Score de correspondance profil / offre, points forts, vigilances et priorisation de vos candidatures.",
    to: "/assistant/match",
    icon: Sparkles,
    gradient:
      "from-purple-500/20 to-indigo-500/15 text-purple-400 ring-purple-500/30",
  },
  {
    label: "CV Analyzer & Optimizer",
    badge: "Source de vérité",
    desc: "Importez votre CV : l'IA structure vos expériences, KPIs, STAR et alimente tout le copilote.",
    to: "/profil",
    icon: ScanLine,
    gradient:
      "from-emerald-500/20 to-teal-500/15 text-emerald-400 ring-emerald-500/30",
  },
  {
    label: "Email Assistant",
    badge: "Réseau",
    desc: "Générez des emails de relance personnalisés et courtois à vos recruteurs et contacts.",
    to: "/contacts",
    icon: Mail,
    gradient:
      "from-amber-500/20 to-orange-500/15 text-amber-400 ring-amber-500/30",
  },
  {
    label: "LinkedIn Assistant",
    badge: "Approche",
    desc: "Notes de connexion < 300 caractères et messages de prise de contact calibrés pour convertir.",
    to: "/assistant/linkedin",
    icon: Linkedin,
    gradient: "from-sky-500/20 to-blue-500/15 text-sky-400 ring-sky-500/30",
  },
  {
    label: "Interview Coach",
    badge: "Simulation",
    desc: "Entraînez-vous aux questions probables, trames STAR et questions stratégiques à poser.",
    to: "/assistant/interview",
    icon: MessageSquare,
    gradient: "from-rose-500/20 to-red-500/15 text-rose-400 ring-rose-500/30",
  },
  {
    label: "Connecter une IA (MCP)",
    badge: "Passerelle",
    desc: "Reliez Claude, ChatGPT ou Cursor directement à vos données Careerly en temps réel.",
    to: "/assistant/connect",
    icon: Plug,
    gradient:
      "from-violet-500/20 to-fuchsia-500/15 text-violet-400 ring-violet-500/30",
  },
];

export function AiToolsGrid() {
  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          Outils & Modules IA spécialisés
        </h2>
        <p className="text-xs text-muted-foreground">
          Accédez directement aux modules autonomes pour des besoins ciblés.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {OUTILS.map((o, i) => {
          const Icon = o.icon;
          return (
            <Link
              key={o.label}
              to={o.to}
              className="group relative flex flex-col justify-between rounded-2xl border border-border/60 bg-card/60 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card/90 hover:shadow-md"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className={`grid size-10 place-items-center rounded-xl bg-gradient-to-br ring-1 transition-transform group-hover:scale-105 ${o.gradient}`}
                  >
                    <Icon className="size-[18px]" />
                  </span>
                  {o.badge && (
                    <Badge
                      variant="outline"
                      className="border-border/60 bg-muted/40 text-[10px] font-medium text-muted-foreground"
                    >
                      {o.badge}
                    </Badge>
                  )}
                </div>

                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {o.label}
                </h3>
                <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                  {o.desc}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border/30 pt-2 text-[11px] font-medium text-primary">
                <span>Ouvrir le module</span>
                <span className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

import { Loader2, FileText, Search, Layers, CheckCircle2 } from "lucide-react";
import type { CvImportStep } from "@/ai/cv-import/cvImport.types";

interface CvAnalysisProgressProps {
  status: CvImportStep;
}

export function CvAnalysisProgress({ status }: CvAnalysisProgressProps) {
  const steps = [
    {
      id: "reading",
      label: "Lecture de votre CV...",
      icon: FileText,
      activeStatus: ["reading"],
      completedStatus: ["identifying", "structuring", "verifying", "preview"],
    },
    {
      id: "identifying",
      label: "Identification des informations...",
      icon: Search,
      activeStatus: ["identifying"],
      completedStatus: ["structuring", "verifying", "preview"],
    },
    {
      id: "structuring",
      label: "Structuration de votre profil...",
      icon: Layers,
      activeStatus: ["structuring"],
      completedStatus: ["verifying", "preview"],
    },
    {
      id: "verifying",
      label: "Vérification des données...",
      icon: CheckCircle2,
      activeStatus: ["verifying"],
      completedStatus: ["preview"],
    },
  ];

  return (
    <div className="space-y-8 py-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Analyse en cours...
        </h2>
        <p className="text-sm text-muted-foreground">
          Le moteur NACORA extrait fidèlement les informations de votre CV.
        </p>
      </div>

      <div className="max-w-xs mx-auto space-y-6">
        {steps.map((step, idx) => {
          const isActive = step.activeStatus.includes(status);
          const isCompleted = step.completedStatus.includes(status);
          const isPending = !isActive && !isCompleted;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-4 transition-opacity duration-500 ${
                isPending ? "opacity-40" : "opacity-100"
              }`}
            >
              <div
                className={`relative flex size-10 items-center justify-center rounded-full border-2 shrink-0 transition-colors duration-500 ${
                  isActive
                    ? "border-purple-500 bg-purple-500/10 text-purple-400 shadow-sm shadow-purple-500/20"
                    : isCompleted
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                      : "border-border/50 bg-card text-muted-foreground"
                }`}
              >
                {isActive ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : isCompleted ? (
                  <CheckCircle2 className="size-5" />
                ) : (
                  <step.icon className="size-5" />
                )}
                {idx !== steps.length - 1 && (
                  <div
                    className={`absolute -bottom-6 left-1/2 -translate-x-1/2 w-0.5 h-6 transition-colors duration-500 ${
                      isCompleted ? "bg-emerald-500/40" : "bg-border/40"
                    }`}
                  />
                )}
              </div>

              <div>
                <p
                  className={`text-sm font-medium ${
                    isActive
                      ? "text-purple-400 font-semibold"
                      : isCompleted
                        ? "text-foreground"
                        : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

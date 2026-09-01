import { Loader2, FileText, Layout, ScanText, CheckCircle2 } from "lucide-react";
import type { CVImportFlowStatus } from "@/lib/cv-import/types";

interface CvAnalysisProgressProps {
  status: CVImportFlowStatus;
}

export function CvAnalysisProgress({ status }: CvAnalysisProgressProps) {
  const steps = [
    {
      id: "reading",
      label: "Lecture du document",
      icon: FileText,
      activeStatus: ["reading"],
      completedStatus: [
        "segmenting",
        "analyzing",
        "validating",
        "preview",
        "diff",
        "confirmed",
      ],
    },
    {
      id: "segmenting",
      label: "Détection des sections",
      icon: Layout,
      activeStatus: ["segmenting"],
      completedStatus: ["analyzing", "validating", "preview", "diff", "confirmed"],
    },
    {
      id: "analyzing",
      label: "Extraction des données",
      icon: ScanText,
      activeStatus: ["analyzing"],
      completedStatus: ["validating", "preview", "diff", "confirmed"],
    },
    {
      id: "validating",
      label: "Validation de l'intégrité",
      icon: CheckCircle2,
      activeStatus: ["validating"],
      completedStatus: ["preview", "diff", "confirmed"],
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
                    ? "border-purple-500 bg-purple-500/10 text-purple-400"
                    : isCompleted
                      ? "border-green-500 bg-green-500/10 text-green-400"
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
                    className={`absolute top-10 left-1/2 -ml-px w-[2px] h-6 ${
                      isCompleted ? "bg-green-500/50" : "bg-border/50"
                    }`}
                  />
                )}
              </div>
              <div className="min-w-0">
                <p
                  className={`text-sm font-medium truncate ${
                    isActive || isCompleted
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

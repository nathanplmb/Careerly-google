import { createFileRoute } from "@tanstack/react-router";
import {
  useEffect,
  useState,
  useTransition,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { toast } from "sonner";
import {
  Loader2,
  Save,
  LayoutDashboard,
  Compass,
  Briefcase,
  Wrench,
  UserRound,
  GraduationCap,
  Languages,
  Award,
  Lightbulb,
  FileCode,
  FileText,
  Check,
  Sparkles,
  TrendingUp,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSession } from "@/hooks/useSession";
import { AppShell } from "@/components/AppShell";
import { normaliserCvStructure } from "@/lib/cv-structure";
import type { CvEtat } from "@/lib/cv";
import { fetchProfil, saveProfilCloud } from "@/lib/profil-cloud";
import {
  emptyProfil,
  loadProfil,
  saveProfilLocal,
  type Profil,
} from "@/lib/profil";
import { calculerCompletudeProfil } from "@/lib/profil-completion";

// Sub-components
import { ProfilOverviewTab } from "@/components/profil/ProfilOverviewTab";
import { ProfilIdentityTab } from "@/components/profil/ProfilIdentityTab";
import { ProfilObjectivesTab } from "@/components/profil/ProfilObjectivesTab";
import { ProfilJourneyTab } from "@/components/profil/ProfilJourneyTab";
import { ProfilSkillsTab } from "@/components/profil/ProfilSkillsTab";
import { ProfilLanguagesTab } from "@/components/profil/ProfilLanguagesTab";
import { ProfilCertificationsTab } from "@/components/profil/ProfilCertificationsTab";
import { ProfilProjectsEngagementsTab } from "@/components/profil/ProfilProjectsEngagementsTab";
import { ProfilDocumentsTab } from "@/components/profil/ProfilDocumentsTab";

export const Route = createFileRoute("/profil")({
  head: () => ({
    meta: [
      { title: "Mon Profil — Dossier Candidat Central NACORA" },
      {
        name: "description",
        content:
          "Le dossier candidat central de NACORA : source de vérité pour le Match IA, l'optimiseur de CV, les simulations d'entretien et l'assistant de candidature.",
      },
      {
        property: "og:title",
        content: "Mon Profil — Dossier Candidat Central NACORA",
      },
      {
        property: "og:description",
        content:
          "Votre dossier candidat central est la source de vérité pour tous les moteurs d'intelligence artificielle de NACORA.",
      },
    ],
  }),
  component: ProfilPage,
});

export type ProfilCategoryTab =
  | "apercu"
  | "identite"
  | "objectifs"
  | "parcours"
  | "competences"
  | "langues"
  | "certifications"
  | "engagements"
  | "documents";

function ProfilPage() {
  const { user, loading: authLoading } = useSession();
  const [profil, setProfil] = useState<Profil>(emptyProfil);
  const [saving, setSaving] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [cvOpen, setCvOpen] = useState(false);
  const [summaryIaOpen, setSummaryIaOpen] = useState(false);
  const [optimizerOpen, setOptimizerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ProfilCategoryTab>("apercu");
  const [, startTransition] = useTransition();

  const profilRef = useRef(profil);
  profilRef.current = profil;

  // Calcul du score de complétude et des rubriques
  const bilan = useMemo(() => calculerCompletudeProfil(profil), [profil]);

  // Chargement initial du profil local après le montage client (garantie de parité SSR)
  useEffect(() => {
    const local = loadProfil();
    setProfil(local);
  }, []);

  // Synchronisation avec Firestore / Supabase en arrière-plan
  useEffect(() => {
    if (authLoading || !user?.id) return;
    let cancelled = false;

    (async () => {
      try {
        const cloud = await fetchProfil(user.id);
        if (!cancelled && cloud) {
          setProfil((local) => ({
            ...local,
            ...cloud,
            cvStructure: normaliserCvStructure(
              cloud.cvStructure || local.cvStructure,
            ),
          }));
        }
      } catch {
        // Mode hors-ligne / fallback local
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user?.id, authLoading]);

  // Mise à jour locale instantanée + persistance
  const updateProfil = useCallback(
    (patch: Partial<Profil>) => {
      setProfil((prev) => {
        const next = { ...prev, ...patch };
        saveProfilLocal(next);
        if (user?.id) {
          void saveProfilCloud(next, user.id).catch((err) => {
            console.warn("Auto-save cloud profil:", err);
          });
        }
        return next;
      });
      setLastSavedTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    },
    [user?.id],
  );

  // Enregistrement manuel ou via raccourci
  const enregistrer = useCallback(async () => {
    setSaving(true);
    const p = profilRef.current;
    saveProfilLocal(p);

    if (user?.id) {
      try {
        const saved = await saveProfilCloud(p, user.id);
        setProfil(saved);
        setLastSavedTime(
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        );
        toast.success("Dossier candidat synchronisé dans le Cloud !");
      } catch (err: unknown) {
        console.error("Erreur sauvegarde cloud profil:", err);
        setLastSavedTime(
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        );
        toast.info("Profil sauvegardé localement (hors-ligne).");
      } finally {
        setSaving(false);
      }
    } else {
      setSaving(false);
      setLastSavedTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
      toast.success("Profil sauvegardé avec succès dans votre navigateur !");
    }
  }, [user?.id]);

  // Raccourci clavier Cmd+S / Ctrl+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        void enregistrer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enregistrer]);

  const handleSelectTab = (tabId: ProfilCategoryTab) => {
    startTransition(() => {
      setActiveTab(tabId);
    });
  };

  const handleNavigateFromSuggestions = (targetTab: string) => {
    if (targetTab === "preferences" || targetTab === "recherche") {
      handleSelectTab("objectifs");
    } else if (
      targetTab === "experiences" ||
      targetTab === "formation" ||
      targetTab === "parcours"
    ) {
      handleSelectTab("parcours");
    } else if (targetTab === "langues") {
      handleSelectTab("langues");
    } else if (targetTab === "certifications") {
      handleSelectTab("certifications");
    } else if (targetTab === "projets" || targetTab === "engagements") {
      handleSelectTab("engagements");
    } else if (targetTab === "identite") {
      handleSelectTab("identite");
    } else if (targetTab === "competences") {
      handleSelectTab("competences");
    } else if (targetTab === "documents") {
      handleSelectTab("documents");
    } else {
      handleSelectTab("apercu");
    }
  };

  // Cartes de catégories
  const CATEGORIES = useMemo(
    () => [
      {
        id: "apercu" as ProfilCategoryTab,
        label: "Aperçu & IA",
        icon: LayoutDashboard,
        colorClass: "bg-purple-500/15 text-purple-400 border-purple-500/25",
        subtitle: `${bilan.score}% complété`,
        isComplete: bilan.score >= 80,
      },
      {
        id: "identite" as ProfilCategoryTab,
        label: "Identité",
        icon: UserRound,
        colorClass: "bg-blue-500/15 text-blue-400 border-blue-500/25",
        subtitle:
          profil.prenom && profil.nom
            ? `${profil.prenom} ${profil.nom}`
            : "À compléter",
        isComplete: Boolean(
          profil.prenom &&
          profil.nom &&
          (profil.emailContact || profil.telephone),
        ),
      },
      {
        id: "objectifs" as ProfilCategoryTab,
        label: "Objectifs",
        icon: Target,
        colorClass: "bg-indigo-500/15 text-indigo-400 border-indigo-500/25",
        subtitle:
          profil.metiers?.split(",")[0]?.trim() ||
          profil.contrats?.split(",")[0]?.trim() ||
          "Postes & Cibles",
        isComplete: Boolean(profil.metiers || profil.contrats),
      },
      {
        id: "parcours" as ProfilCategoryTab,
        label: "Parcours",
        icon: Briefcase,
        colorClass: "bg-purple-500/15 text-purple-400 border-purple-500/25",
        subtitle: `${profil.cvStructure?.experiences?.length || 0} exp • ${profil.cvStructure?.formations?.length || 0} diplômes`,
        isComplete:
          (profil.cvStructure?.experiences?.length || 0) > 0 &&
          (profil.cvStructure?.formations?.length || 0) > 0,
      },
      {
        id: "competences" as ProfilCategoryTab,
        label: "Compétences",
        icon: Wrench,
        colorClass: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
        subtitle: `${profil.cvStructure?.competences?.length || 0} skills & outils`,
        isComplete: (profil.cvStructure?.competences?.length || 0) > 0,
      },
      {
        id: "langues" as ProfilCategoryTab,
        label: "Langues",
        icon: Languages,
        colorClass: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
        subtitle: `${profil.cvStructure?.langues?.length || 0} langue(s)`,
        isComplete: (profil.cvStructure?.langues?.length || 0) > 0,
      },
      {
        id: "certifications" as ProfilCategoryTab,
        label: "Certifications",
        icon: Award,
        colorClass: "bg-amber-500/15 text-amber-400 border-amber-500/25",
        subtitle: `${profil.cvStructure?.certifications?.length || 0} certif(s)`,
        isComplete: (profil.cvStructure?.certifications?.length || 0) > 0,
      },
      {
        id: "engagements" as ProfilCategoryTab,
        label: "Projets & Asso",
        icon: Lightbulb,
        colorClass: "bg-rose-500/15 text-rose-400 border-rose-500/25",
        subtitle: `${(profil.cvStructure?.projets?.length || 0) + (profil.cvStructure?.benevolats?.length || 0)} projet(s)`,
        isComplete:
          (profil.cvStructure?.projets?.length || 0) > 0 ||
          (profil.cvStructure?.benevolats?.length || 0) > 0,
      },
      {
        id: "documents" as ProfilCategoryTab,
        label: "Documents",
        icon: FileCode,
        colorClass: "bg-blue-500/15 text-blue-400 border-blue-500/25",
        subtitle: profil.cv ? "CV analysé" : "Importer un CV",
        isComplete: Boolean(profil.cv),
      },
    ],
    [profil, bilan],
  );

  return (
    <AppShell
      title="Mon Profil"
      subtitle="Votre dossier candidat."
      actions={
        <div className="flex items-center gap-2">
          {saving && (
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          )}
          <Button onClick={enregistrer} size="sm">
            <Save className="mr-2 size-4" />
            Enregistrer
          </Button>
        </div>
      }
    >
      <div className="flex gap-4 flex-col lg:flex-row">
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => handleSelectTab(c.id)}
              className={`flex items-center justify-between p-3 rounded-lg border text-left transition-colors ${
                activeTab === c.id
                  ? "bg-accent border-accent text-accent-foreground"
                  : "bg-card border-border hover:bg-accent/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-md ${c.colorClass}`}>
                  <c.icon className="size-4" />
                </div>
                <div>
                  <div className="font-medium text-sm">{c.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {c.subtitle}
                  </div>
                </div>
              </div>
              {c.isComplete && <Check className="size-4 text-emerald-500" />}
            </button>
          ))}
        </aside>

        <main className="flex-1 glass-card p-6 min-h-[500px]">
          {activeTab === "apercu" && (
            <ProfilOverviewTab
              profil={profil}
              bilan={bilan}
              onNavigate={handleNavigateFromSuggestions}
            />
          )}
          {activeTab === "identite" && (
            <ProfilIdentityTab profil={profil} onChange={updateProfil} />
          )}
          {activeTab === "objectifs" && (
            <ProfilObjectivesTab profil={profil} onChange={updateProfil} />
          )}
          {activeTab === "parcours" && (
            <ProfilJourneyTab profil={profil} onChange={updateProfil} />
          )}
          {activeTab === "competences" && (
            <ProfilSkillsTab profil={profil} onChange={updateProfil} />
          )}
          {activeTab === "langues" && (
            <ProfilLanguagesTab profil={profil} onChange={updateProfil} />
          )}
          {activeTab === "certifications" && (
            <ProfilCertificationsTab profil={profil} onChange={updateProfil} />
          )}
          {activeTab === "engagements" && (
            <ProfilProjectsEngagementsTab
              profil={profil}
              onChange={updateProfil}
            />
          )}
          {activeTab === "documents" && (
            <ProfilDocumentsTab profil={profil} onChange={updateProfil} />
          )}
        </main>
      </div>
    </AppShell>
  );
}

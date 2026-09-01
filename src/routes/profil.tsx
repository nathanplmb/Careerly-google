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
  Compass,
  Briefcase,
  Wrench,
  UserRound,
  GraduationCap,
  Languages,
  Lightbulb,
  FileCode,
  FileText,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/useSession";
import { AppShell } from "@/components/AppShell";
import { CvAnalyseDialog } from "@/components/CvAnalyseDialog";
import { normaliserCvStructure } from "@/lib/cv-structure";
import type { CvEtat } from "@/lib/cv";
import { fetchProfil, saveProfilCloud } from "@/lib/profil-cloud";
import { loadProfil, saveProfilLocal, type Profil } from "@/lib/profil";
import { ProfilIdentityTab } from "@/components/profil/ProfilIdentityTab";
import { ProfilObjectivesTab } from "@/components/profil/ProfilObjectivesTab";
import { ProfilEducationTab } from "@/components/profil/ProfilEducationTab";
import { ProfilExperiencesTab } from "@/components/profil/ProfilExperiencesTab";
import { ProfilSkillsTab } from "@/components/profil/ProfilSkillsTab";
import { ProfilLanguagesCertifsTab } from "@/components/profil/ProfilLanguagesCertifsTab";
import { ProfilProjectsEngagementsTab } from "@/components/profil/ProfilProjectsEngagementsTab";
import { ProfilDocumentsTab } from "@/components/profil/ProfilDocumentsTab";

export const Route = createFileRoute("/profil")({
  head: () => ({
    meta: [
      { title: "Mon Profil — NACORA Orbit" },
      {
        name: "description",
        content:
          "Le profil candidat de NACORA : identité, aspirations, formations, expériences avec KPI, compétences qualifiées et critères de matching IA.",
      },
      { property: "og:title", content: "Mon Profil — NACORA Orbit" },
      {
        property: "og:description",
        content:
          "Votre profil NACORA est la source de vérité pour le Match IA, l'analyseur de CV et vos candidatures.",
      },
    ],
  }),
  component: ProfilPage,
});

export type ProfilCategoryTab =
  | "identite"
  | "objectifs"
  | "experiences"
  | "formation"
  | "competences"
  | "langues"
  | "engagements"
  | "documents";

function ProfilPage() {
  const { user, loading: authLoading } = useSession();
  const [profil, setProfil] = useState<Profil>(() => loadProfil());
  const [saving, setSaving] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [cvOpen, setCvOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ProfilCategoryTab>("identite");
  const [, startTransition] = useTransition();

  const profilRef = useRef(profil);
  profilRef.current = profil;

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
  const updateProfil = useCallback((patch: Partial<Profil>) => {
    setProfil((prev) => {
      const next = { ...prev, ...patch };
      saveProfilLocal(next);
      return next;
    });
    setLastSavedTime(
      new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    );
  }, []);

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
        toast.success("Profil synchronisé dans le Cloud !");
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

  // Définition des 8 cartes de catégories avec titres simplifiés et sous-titres dynamiques
  const CATEGORIES = useMemo(
    () => [
      {
        id: "identite" as ProfilCategoryTab,
        label: "Identité",
        icon: UserRound,
        colorClass: "bg-blue-500/15 text-blue-400 border-blue-500/25",
        subtitle: profil.prenom && profil.nom ? "Complété" : "À compléter",
        isComplete: Boolean(
          profil.prenom &&
          profil.nom &&
          (profil.emailContact || profil.telephone),
        ),
      },
      {
        id: "objectifs" as ProfilCategoryTab,
        label: "Objectifs",
        icon: Compass,
        colorClass: "bg-purple-500/15 text-purple-400 border-purple-500/25",
        subtitle: profil.contrats?.split(",")[0]?.trim() || "Stage",
        isComplete: Boolean(profil.metiers || profil.contrats),
      },
      {
        id: "experiences" as ProfilCategoryTab,
        label: "Expériences",
        icon: Briefcase,
        colorClass: "bg-blue-500/15 text-blue-400 border-blue-500/25",
        subtitle: `${profil.cvStructure?.experiences?.length || 0} poste(s)`,
        isComplete: (profil.cvStructure?.experiences?.length || 0) > 0,
      },
      {
        id: "formation" as ProfilCategoryTab,
        label: "Formations",
        icon: GraduationCap,
        colorClass: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
        subtitle: `${profil.cvStructure?.formations?.length || 0} diplôme(s)`,
        isComplete: (profil.cvStructure?.formations?.length || 0) > 0,
      },
      {
        id: "competences" as ProfilCategoryTab,
        label: "Compétences",
        icon: Wrench,
        colorClass: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
        subtitle: `${profil.cvStructure?.competences?.length || 0} skill(s)`,
        isComplete: (profil.cvStructure?.competences?.length || 0) > 0,
      },
      {
        id: "langues" as ProfilCategoryTab,
        label: "Langues",
        icon: Languages,
        colorClass: "bg-amber-500/15 text-amber-400 border-amber-500/25",
        subtitle: `${profil.cvStructure?.langues?.length || 0} langue(s)`,
        isComplete: (profil.cvStructure?.langues?.length || 0) > 0,
      },
      {
        id: "engagements" as ProfilCategoryTab,
        label: "Projets",
        icon: Lightbulb,
        colorClass: "bg-rose-500/15 text-rose-400 border-rose-500/25",
        subtitle: `${(profil.cvStructure?.projets?.length || 0) + (profil.cvStructure?.engagements?.length || 0)} élément(s)`,
        isComplete:
          (profil.cvStructure?.projets?.length || 0) > 0 ||
          (profil.cvStructure?.engagements?.length || 0) > 0,
      },
      {
        id: "documents" as ProfilCategoryTab,
        label: "Documents",
        icon: FileCode,
        colorClass: "bg-purple-500/15 text-purple-400 border-purple-500/25",
        subtitle: profil.cv ? "CV importé" : "Aucun CV",
        isComplete: Boolean(profil.cv),
      },
    ],
    [profil],
  );

  return (
    <AppShell
      title="Mon Profil"
      description="Gérez vos informations, objectifs et compétences pour alimenter le ciblage IA."
      action={
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setCvOpen(true)}
            className="gap-1.5 text-xs text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 border-border/80"
          >
            <FileText className="size-3.5" />
            Importer CV
          </Button>

          <Button
            size="sm"
            onClick={enregistrer}
            disabled={saving}
            className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs shadow-xs"
          >
            {saving ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Save className="size-3.5" />
            )}
            {lastSavedTime ? "Enregistré" : "Sauvegarder"}
          </Button>
        </div>
      }
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Grille des 8 cartes de catégories de profil (comme dans la capture) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelectTab(cat.id)}
                className={`relative flex flex-col justify-between p-4 sm:p-4.5 rounded-2xl sm:rounded-3xl text-left transition-all duration-200 border ${
                  isActive
                    ? "border-purple-500/90 ring-2 ring-purple-500/40 bg-purple-950/25 shadow-lg shadow-purple-950/40"
                    : "border-border/70 bg-card/70 hover:bg-card hover:border-border/90"
                }`}
              >
                {/* Ligne haute : Icône et indicateur de statut */}
                <div className="flex items-center justify-between w-full mb-3">
                  <div
                    className={`flex size-9 sm:size-10 items-center justify-center rounded-full border ${cat.colorClass}`}
                  >
                    <Icon className="size-4 sm:size-5" />
                  </div>

                  {cat.isComplete ? (
                    <div className="flex size-5 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/15 text-emerald-400">
                      <Check className="size-3 stroke-[2.5]" />
                    </div>
                  ) : (
                    <div className="size-2 rounded-full bg-muted-foreground/30" />
                  )}
                </div>

                {/* Textes : Titre simplifié et sous-titre */}
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-semibold text-foreground tracking-tight line-clamp-1">
                    {cat.label}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-1">
                    {cat.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Contenu principal de l'onglet actif */}
        <div className="animate-in fade-in-50 duration-200">
          {activeTab === "identite" && (
            <ProfilIdentityTab profil={profil} onChange={updateProfil} />
          )}

          {activeTab === "objectifs" && (
            <ProfilObjectivesTab profil={profil} onChange={updateProfil} />
          )}

          {activeTab === "experiences" && (
            <ProfilExperiencesTab profil={profil} onChange={updateProfil} />
          )}

          {activeTab === "formation" && (
            <ProfilEducationTab profil={profil} onChange={updateProfil} />
          )}

          {activeTab === "competences" && (
            <ProfilSkillsTab profil={profil} onChange={updateProfil} />
          )}

          {activeTab === "langues" && (
            <ProfilLanguagesCertifsTab
              profil={profil}
              onChange={updateProfil}
            />
          )}

          {activeTab === "engagements" && (
            <ProfilProjectsEngagementsTab
              profil={profil}
              onChange={updateProfil}
            />
          )}

          {activeTab === "documents" && (
            <ProfilDocumentsTab
              profil={profil}
              onChange={updateProfil}
              onOpenCvModal={() => setCvOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Modal d'analyse / Import IA de CV */}
      <CvAnalyseDialog
        open={cvOpen}
        onOpenChange={setCvOpen}
        profil={profil}
        cv={profil.cv ?? null}
        onSaveCv={(cv: CvEtat) => {
          const next = { ...profil, cv };
          updateProfil(next);
          if (user?.id)
            void saveProfilCloud(next, user.id).catch(() => undefined);
        }}
        onAppliquerProfil={(patch) => {
          const next = { ...profil, ...patch };
          updateProfil(next);
          if (user?.id)
            void saveProfilCloud(next, user.id).catch(() => undefined);
          toast.success("Profil mis à jour automatiquement depuis le CV !");
        }}
      />
    </AppShell>
  );
}

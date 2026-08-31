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
  FileText,
  Loader2,
  Save,
  CheckCircle2,
  Compass,
  GraduationCap,
  Wrench,
  SlidersHorizontal,
  FileCode,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "@/hooks/useSession";
import { AppShell } from "@/components/AppShell";
import { CvAnalyseDialog } from "@/components/CvAnalyseDialog";
import { CvBuilder } from "@/components/CvBuilder";
import { normaliserCvStructure } from "@/lib/cv-structure";
import type { CvEtat } from "@/lib/cv";
import { fetchProfil, saveProfilCloud } from "@/lib/profil-cloud";
import { loadProfil, saveProfilLocal, type Profil } from "@/lib/profil";
import { calculerCompletudeProfil } from "@/lib/profil-completion";
import { ProfilHeaderCard } from "@/components/profil/ProfilHeaderCard";
import { ProfilRechercheTab } from "@/components/profil/ProfilRechercheTab";
import { ProfilFormationTab } from "@/components/profil/ProfilFormationTab";
import { ProfilCompetencesTab } from "@/components/profil/ProfilCompetencesTab";
import { ProfilCriteresTab } from "@/components/profil/ProfilCriteresTab";

export const Route = createFileRoute("/profil")({
  head: () => ({
    meta: [
      { title: "Mon profil — Suivi de stage" },
      {
        name: "description",
        content:
          "Renseignez votre profil étudiant : formation, compétences, mobilité et critères pour un matching personnalisé des offres.",
      },
      { property: "og:title", content: "Mon profil — Suivi de stage" },
      {
        property: "og:description",
        content:
          "Votre profil sert de base au score de correspondance des offres de stage.",
      },
    ],
  }),
  component: ProfilPage,
});

function ProfilPage() {
  const { user, loading: authLoading } = useSession();
  // Chargement synchrone immédiat (0ms de latence au premier rendu)
  const [profil, setProfil] = useState<Profil>(() => loadProfil());
  const [saving, setSaving] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("recherche");
  const [, startTransition] = useTransition();

  // Ref pour le profil actuel pour éviter les recréations de callbacks
  const profilRef = useRef(profil);
  profilRef.current = profil;

  // Calcul du score de complétude et des pistes d'amélioration
  const bilan = useMemo(() => calculerCompletudeProfil(profil), [profil]);

  // Synchronisation en arrière-plan avec le Cloud Supabase (sans bloquer l'affichage)
  useEffect(() => {
    if (authLoading || !user?.id) return;
    let cancelled = false;

    (async () => {
      try {
        const cloud = await fetchProfil();
        if (!cancelled && cloud) {
          setProfil((local) => {
            return {
              ...local,
              ...cloud,
              cvStructure: normaliserCvStructure(
                cloud.cvStructure || local.cvStructure,
              ),
            };
          });
        }
      } catch {
        // En cas d'erreur réseau, les données locales restent actives
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user?.id, authLoading]);

  // Mise à jour locale instantanée + auto-save local
  const updateProfil = useCallback((patch: Partial<Profil>) => {
    setProfil((prev) => {
      const next = { ...prev, ...patch };
      saveProfilLocal(next);
      return next;
    });
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
        toast.success("Profil enregistré et synchronisé en ligne !");
      } catch {
        toast.error(
          "Enregistré localement (connexion cloud temporairement indisponible).",
        );
      } finally {
        setSaving(false);
      }
    } else {
      setSaving(false);
      toast.success("Profil enregistré dans votre navigateur.");
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

  return (
    <AppShell
      eyebrow="Compte & Candidature"
      title="Mon profil étudiant"
      subtitle="Vos critères et compétences personnalisent le score de matching et la génération de lettres IA."
      actions={
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setCvOpen(true)}
            className="hidden sm:inline-flex border-primary/20 hover:bg-primary/5"
          >
            <Sparkles className="size-4 text-primary" />
            Analyser mon CV avec l'IA
          </Button>

          <Button size="sm" onClick={enregistrer} disabled={saving}>
            {saving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            Enregistrer
          </Button>
        </div>
      }
    >
      <div className="max-w-5xl space-y-6">
        {/* Header dynamique avec score de complétude & badge de matching */}
        <ProfilHeaderCard
          profil={profil}
          bilan={bilan}
          onOpenCvModal={() => setCvOpen(true)}
          onSelectTab={(tab) => {
            startTransition(() => setActiveTab(tab));
          }}
        />

        {/* Système d'onglets ergonomique et instantané */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="grid gap-6"
        >
          <div className="overflow-x-auto pb-1">
            <TabsList className="inline-flex w-full min-w-[580px] justify-start p-1 sm:w-auto">
              <TabsTrigger
                value="recherche"
                className="flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm"
              >
                <Compass className="size-3.5" />
                Ma recherche
              </TabsTrigger>

              <TabsTrigger
                value="formation"
                className="flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm"
              >
                <GraduationCap className="size-3.5" />
                Identité & Formation
              </TabsTrigger>

              <TabsTrigger
                value="competences"
                className="flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm"
              >
                <Wrench className="size-3.5" />
                Compétences & Outils
              </TabsTrigger>

              <TabsTrigger
                value="criteres"
                className="flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm"
              >
                <SlidersHorizontal className="size-3.5" />
                Critères & Priorités
              </TabsTrigger>

              <TabsTrigger
                value="cv"
                className="flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm"
              >
                <FileCode className="size-3.5" />
                CV Structuré
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Onglet 1: Ma Recherche */}
          <TabsContent value="recherche" className="focus-visible:outline-none">
            <ProfilRechercheTab profil={profil} onChange={updateProfil} />
          </TabsContent>

          {/* Onglet 2: Identité & Formation */}
          <TabsContent value="formation" className="focus-visible:outline-none">
            <ProfilFormationTab profil={profil} onChange={updateProfil} />
          </TabsContent>

          {/* Onglet 3: Compétences & Outils */}
          <TabsContent
            value="competences"
            className="focus-visible:outline-none"
          >
            <ProfilCompetencesTab profil={profil} onChange={updateProfil} />
          </TabsContent>

          {/* Onglet 4: Critères & Priorités */}
          <TabsContent value="criteres" className="focus-visible:outline-none">
            <ProfilCriteresTab profil={profil} onChange={updateProfil} />
          </TabsContent>

          {/* Onglet 5: CV Structuré & Import */}
          <TabsContent
            value="cv"
            className="focus-visible:outline-none space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="size-4 text-primary" />
                  Générateur & Auditeur de CV intelligent
                </h3>
                <p className="text-xs text-muted-foreground">
                  Importez votre CV (PDF / Word) pour pré-remplir
                  automatiquement toutes les rubriques ou auditer vos mots-clés
                  ATS.
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => setCvOpen(true)}
                className="gap-1.5 shadow-sm"
              >
                <FileText className="size-4" />
                Auditer / Importer un CV
              </Button>
            </div>

            <CvBuilder
              value={normaliserCvStructure(profil.cvStructure)}
              onChange={(cv) => updateProfil({ cvStructure: cv })}
            />
          </TabsContent>

          {/* Barre de statut et d'enregistrement fixe/bas de page */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border/60 bg-card/60 p-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {user ? (
                <>
                  <CheckCircle2 className="size-4 text-emerald-500" />
                  <span>
                    Profil synchronisé sur votre compte cloud. Raccourci :{" "}
                    <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                      Ctrl + S
                    </kbd>
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-4 text-blue-500" />
                  <span>
                    Enregistré localement. Connectez-vous pour synchroniser
                    entre vos appareils.
                  </span>
                </>
              )}
            </div>

            <Button
              onClick={enregistrer}
              disabled={saving}
              size="sm"
              className="gap-2"
            >
              {saving ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              Sauvegarder les modifications
            </Button>
          </div>
        </Tabs>
      </div>

      {/* Modal d'analyse IA de CV */}
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

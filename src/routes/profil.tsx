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
  Briefcase,
  Wrench,
  Languages,
  Lightbulb,
  SlidersHorizontal,
  FileCode,
  Sparkles,
  TrendingUp,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "@/hooks/useSession";
import { AppShell } from "@/components/AppShell";
import { CvAnalyseDialog } from "@/components/CvAnalyseDialog";
import { normaliserCvStructure } from "@/lib/cv-structure";
import type { CvEtat } from "@/lib/cv";
import { fetchProfil, saveProfilCloud } from "@/lib/profil-cloud";
import { loadProfil, saveProfilLocal, type Profil } from "@/lib/profil";
import { calculerCompletudeProfil } from "@/lib/profil-completion";
import { ProfilHeaderCard } from "@/components/profil/ProfilHeaderCard";
import { ProfilIdentityTab } from "@/components/profil/ProfilIdentityTab";
import { ProfilObjectivesTab } from "@/components/profil/ProfilObjectivesTab";
import { ProfilEducationTab } from "@/components/profil/ProfilEducationTab";
import { ProfilExperiencesTab } from "@/components/profil/ProfilExperiencesTab";
import { ProfilSkillsTab } from "@/components/profil/ProfilSkillsTab";
import { ProfilLanguagesCertifsTab } from "@/components/profil/ProfilLanguagesCertifsTab";
import { ProfilProjectsEngagementsTab } from "@/components/profil/ProfilProjectsEngagementsTab";
import { ProfilPreferencesTab } from "@/components/profil/ProfilPreferencesTab";
import { ProfilDocumentsTab } from "@/components/profil/ProfilDocumentsTab";
import { ProfilSummaryIAModal } from "@/components/profil/ProfilSummaryIAModal";
import { ProfilOptimizerModal } from "@/components/profil/ProfilOptimizerModal";

export const Route = createFileRoute("/profil")({
  head: () => ({
    meta: [
      { title: "Profil Candidat — NACORA Orbit" },
      {
        name: "description",
        content:
          "Le profil candidat complet de NACORA : identité, aspirations, formations, expériences avec KPI, compétences qualifiées et critères de matching IA.",
      },
      { property: "og:title", content: "Profil Candidat — NACORA Orbit" },
      {
        property: "og:description",
        content:
          "Votre profil NACORA est la source de vérité pour le Match IA, l'analyseur de CV et les assistants de candidature.",
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
  const [summaryIaOpen, setSummaryIaOpen] = useState(false);
  const [optimizerOpen, setOptimizerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("recherche");
  const [, startTransition] = useTransition();

  // Ref pour le profil actuel pour éviter les recréations de callbacks
  const profilRef = useRef(profil);
  profilRef.current = profil;

  // Calcul du score de complétude et des catégories
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
        toast.success("Profil synchronisé dans votre espace NACORA !");
      } catch {
        toast.error(
          "Enregistré localement (connexion cloud temporairement indisponible).",
        );
      } finally {
        setSaving(false);
      }
    } else {
      setSaving(false);
      toast.success("Profil sauvegardé dans votre navigateur.");
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
      eyebrow="Career Profile"
      title="Mon Profil Candidat"
      subtitle="La source de vérité NACORA pour le Match IA, l'analyse de CV, la rédaction d'emails et le coaching d'entretien."
      actions={
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setSummaryIaOpen(true)}
            className="hidden sm:inline-flex border-purple-500/30 hover:bg-purple-500/10 text-purple-300 gap-1.5"
          >
            <Sparkles className="size-3.5" />
            Profil IA
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setOptimizerOpen(true)}
            className="hidden md:inline-flex border-indigo-500/30 hover:bg-indigo-500/10 text-indigo-300 gap-1.5"
          >
            <TrendingUp className="size-3.5" />
            Optimiser IA
          </Button>

          <Button
            size="sm"
            onClick={enregistrer}
            disabled={saving}
            className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-xs font-semibold"
          >
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
      <div className="max-w-6xl space-y-6">
        {/* Header Dynamique avec Score de complétude & Actions Rapides */}
        <ProfilHeaderCard
          profil={profil}
          bilan={bilan}
          onOpenCvModal={() => setCvOpen(true)}
          onOpenSummaryIaModal={() => setSummaryIaOpen(true)}
          onOpenOptimizerModal={() => setOptimizerOpen(true)}
          onSelectTab={(tab) => {
            startTransition(() => setActiveTab(tab));
          }}
          saving={saving}
        />

        {/* Système d'onglets ergonomique et responsive */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="grid gap-6"
        >
          <div className="overflow-x-auto pb-1">
            <TabsList className="inline-flex w-full min-w-[760px] justify-start p-1 sm:w-auto bg-card/60 border border-border/60">
              <TabsTrigger
                value="recherche"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold"
              >
                <Compass className="size-3.5 text-purple-400" />
                Ma recherche
              </TabsTrigger>

              <TabsTrigger
                value="identite"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold"
              >
                <UserRound className="size-3.5 text-purple-400" />
                Identité & Contact
              </TabsTrigger>

              <TabsTrigger
                value="formation"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold"
              >
                <GraduationCap className="size-3.5 text-indigo-400" />
                Formations
              </TabsTrigger>

              <TabsTrigger
                value="experiences"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold"
              >
                <Briefcase className="size-3.5 text-purple-400" />
                Expériences & KPI
              </TabsTrigger>

              <TabsTrigger
                value="competences"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold"
              >
                <Wrench className="size-3.5 text-emerald-400" />
                Compétences
              </TabsTrigger>

              <TabsTrigger
                value="langues"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold"
              >
                <Languages className="size-3.5 text-indigo-400" />
                Langues & Certifs
              </TabsTrigger>

              <TabsTrigger
                value="engagements"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold"
              >
                <Lightbulb className="size-3.5 text-amber-400" />
                Projets & Asso
              </TabsTrigger>

              <TabsTrigger
                value="preferences"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold"
              >
                <SlidersHorizontal className="size-3.5 text-purple-400" />
                Critères
              </TabsTrigger>

              <TabsTrigger
                value="documents"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold"
              >
                <FileCode className="size-3.5 text-blue-400" />
                CV & Documents
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Onglet 1: Ma Recherche */}
          <TabsContent value="recherche" className="focus-visible:outline-none">
            <ProfilObjectivesTab profil={profil} onChange={updateProfil} />
          </TabsContent>

          {/* Onglet 2: Identité & Contact */}
          <TabsContent value="identite" className="focus-visible:outline-none">
            <ProfilIdentityTab profil={profil} onChange={updateProfil} />
          </TabsContent>

          {/* Onglet 3: Formations */}
          <TabsContent value="formation" className="focus-visible:outline-none">
            <ProfilEducationTab profil={profil} onChange={updateProfil} />
          </TabsContent>

          {/* Onglet 4: Expériences & KPI */}
          <TabsContent
            value="experiences"
            className="focus-visible:outline-none"
          >
            <ProfilExperiencesTab profil={profil} onChange={updateProfil} />
          </TabsContent>

          {/* Onglet 5: Compétences */}
          <TabsContent
            value="competences"
            className="focus-visible:outline-none"
          >
            <ProfilSkillsTab profil={profil} onChange={updateProfil} />
          </TabsContent>

          {/* Onglet 6: Langues & Certifications */}
          <TabsContent value="langues" className="focus-visible:outline-none">
            <ProfilLanguagesCertifsTab
              profil={profil}
              onChange={updateProfil}
            />
          </TabsContent>

          {/* Onglet 7: Projets & Engagements */}
          <TabsContent
            value="engagements"
            className="focus-visible:outline-none"
          >
            <ProfilProjectsEngagementsTab
              profil={profil}
              onChange={updateProfil}
            />
          </TabsContent>

          {/* Onglet 8: Critères & Pondérations */}
          <TabsContent
            value="preferences"
            className="focus-visible:outline-none"
          >
            <ProfilPreferencesTab profil={profil} onChange={updateProfil} />
          </TabsContent>

          {/* Onglet 9: Documents & CV */}
          <TabsContent value="documents" className="focus-visible:outline-none">
            <ProfilDocumentsTab
              profil={profil}
              onChange={updateProfil}
              onOpenCvModal={() => setCvOpen(true)}
            />
          </TabsContent>

          {/* Barre de statut et de sauvegarde permanente */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card/60 p-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {user ? (
                <>
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>
                    Profil synchronisé sur votre compte cloud Supabase.
                    Raccourci :{" "}
                    <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-foreground">
                      Ctrl + S
                    </kbd>
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-4 text-blue-400 shrink-0" />
                  <span>
                    Enregistré localement. Connectez-vous pour synchroniser vos
                    données sur tous vos appareils.
                  </span>
                </>
              )}
            </div>

            <Button
              onClick={enregistrer}
              disabled={saving}
              size="sm"
              className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold"
            >
              {saving ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              Sauvegarder mon profil
            </Button>
          </div>
        </Tabs>
      </div>

      {/* Modal Synthèse IA "Ce que Careerly sait de moi" */}
      <ProfilSummaryIAModal
        open={summaryIaOpen}
        onOpenChange={setSummaryIaOpen}
        profil={profil}
        onUpdateProfil={updateProfil}
      />

      {/* Modal Optimiser mon profil avec l'IA */}
      <ProfilOptimizerModal
        open={optimizerOpen}
        onOpenChange={setOptimizerOpen}
        profil={profil}
        onNavigateTab={(tab) => {
          setOptimizerOpen(false);
          startTransition(() => setActiveTab(tab));
        }}
      />

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

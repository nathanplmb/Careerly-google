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
  ArrowLeft,
  ArrowRight,
  Menu,
  Eye,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/useSession";
import { AppShell } from "@/components/AppShell";
import { CvAnalyseDialog } from "@/components/CvAnalyseDialog";
import { normaliserCvStructure } from "@/lib/cv-structure";
import type { CvEtat } from "@/lib/cv";
import { fetchProfil, saveProfilCloud } from "@/lib/profil-cloud";
import { loadProfil, saveProfilLocal, type Profil } from "@/lib/profil";
import { calculerCompletudeProfil } from "@/lib/profil-completion";
import { ProfilHeaderCard } from "@/components/profil/ProfilHeaderCard";
import {
  ALL_PROFIL_SECTIONS,
  type ProfilSectionId,
} from "@/components/profil/profil-sections-data";
import { ProfilSidebarNav } from "@/components/profil/ProfilSidebarNav";
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
          "Le profil candidat unifié de NACORA : identité, aspirations, formations, expériences avec KPI, compétences qualifiées et critères de matching IA.",
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
  const [profil, setProfil] = useState<Profil>(() => loadProfil());
  const [saving, setSaving] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [cvOpen, setCvOpen] = useState(false);
  const [summaryIaOpen, setSummaryIaOpen] = useState(false);
  const [optimizerOpen, setOptimizerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ProfilSectionId>("recherche");
  const [viewMode, setViewMode] = useState<"focus" | "tout_en_un">("focus");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, startTransition] = useTransition();

  const profilRef = useRef(profil);
  profilRef.current = profil;

  // Calcul du score de complétude
  const bilan = useMemo(() => calculerCompletudeProfil(profil), [profil]);

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
        toast.success("Profil synchronisé dans votre espace cloud !");
      } catch {
        toast.error(
          "Enregistré localement (connexion cloud temporairement indisponible).",
        );
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

  // Gestion des étapes Suivant / Précédent
  const currentIndex = useMemo(
    () => ALL_PROFIL_SECTIONS.findIndex((s) => s.id === activeTab),
    [activeTab],
  );

  const prevSection =
    currentIndex > 0 ? ALL_PROFIL_SECTIONS[currentIndex - 1] : null;
  const nextSection =
    currentIndex < ALL_PROFIL_SECTIONS.length - 1
      ? ALL_PROFIL_SECTIONS[currentIndex + 1]
      : null;

  const currentSectionMeta =
    ALL_PROFIL_SECTIONS[currentIndex] || ALL_PROFIL_SECTIONS[0];
  const CurrentIcon = currentSectionMeta.icone;

  const handleSelectTab = (tabId: string) => {
    const validId = tabId as ProfilSectionId;
    startTransition(() => {
      setActiveTab(validId);
      setMobileMenuOpen(false);
    });

    if (viewMode === "tout_en_un") {
      const element = document.getElementById(`section-${tabId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <AppShell
      eyebrow="Career Profile"
      title="Mon Profil Candidat"
      subtitle="La source de vérité NACORA pour le Match IA, l'analyseur de CV et les assistants de candidature."
      actions={
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setSummaryIaOpen(true)}
            className="hidden sm:inline-flex border-purple-500/30 hover:bg-purple-500/10 text-purple-300 gap-1.5"
          >
            <Sparkles className="size-3.5" />
            Synthèse IA
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
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 1. Header Dynamique avec Score & Actions Clés */}
        <ProfilHeaderCard
          profil={profil}
          bilan={bilan}
          onOpenCvModal={() => setCvOpen(true)}
          onOpenSummaryIaModal={() => setSummaryIaOpen(true)}
          onOpenOptimizerModal={() => setOptimizerOpen(true)}
          onSelectTab={handleSelectTab}
          saving={saving}
        />

        {/* 2. Barre Mobile : Sélecteur de section & Contrôles rapides */}
        <div className="lg:hidden flex flex-col gap-2 rounded-2xl border border-border/70 bg-card/80 p-3 shadow-xs">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex-1 flex items-center justify-between gap-2 rounded-xl border border-border/60 bg-muted/40 px-3 py-2 text-left"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className={`flex size-6 shrink-0 items-center justify-center rounded-md border text-xs ${currentSectionMeta.color}`}
                >
                  <CurrentIcon className="size-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-foreground truncate block">
                    {currentSectionMeta.titre}
                  </span>
                  <span className="text-[10px] text-muted-foreground truncate block">
                    Rubrique {currentIndex + 1}/{ALL_PROFIL_SECTIONS.length}
                  </span>
                </div>
              </div>
              <Menu className="size-4 text-muted-foreground shrink-0" />
            </button>

            {/* Toggle Mode sur Mobile */}
            <div className="flex items-center rounded-xl border border-border/60 bg-muted/30 p-1 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("focus")}
                title="Mode par section"
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  viewMode === "focus"
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground"
                }`}
              >
                <Eye className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("tout_en_un")}
                title="Mode tout dérouler"
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  viewMode === "tout_en_un"
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground"
                }`}
              >
                <Layers className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Tiroir déroulant mobile */}
          {mobileMenuOpen && (
            <div className="pt-2 border-t border-border/50 space-y-3 animate-in fade-in-50 duration-200">
              <ProfilSidebarNav
                activeTab={activeTab}
                onSelectTab={(id) => handleSelectTab(id)}
                bilan={bilan}
                viewMode={viewMode}
                onToggleViewMode={setViewMode}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onOpenCvModal={() => {
                  setMobileMenuOpen(false);
                  setCvOpen(true);
                }}
                onOpenSummaryIaModal={() => {
                  setMobileMenuOpen(false);
                  setSummaryIaOpen(true);
                }}
                onOpenOptimizerModal={() => {
                  setMobileMenuOpen(false);
                  setOptimizerOpen(true);
                }}
              />
            </div>
          )}
        </div>

        {/* 3. Layout Principal Master-Detail (Desktop / Tablette) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Menu Latéral Gauche (Sticky sur Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-20">
            <ProfilSidebarNav
              activeTab={activeTab}
              onSelectTab={(id) => handleSelectTab(id)}
              bilan={bilan}
              viewMode={viewMode}
              onToggleViewMode={setViewMode}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onOpenCvModal={() => setCvOpen(true)}
              onOpenSummaryIaModal={() => setSummaryIaOpen(true)}
              onOpenOptimizerModal={() => setOptimizerOpen(true)}
            />
          </aside>

          {/* Contenu Principal du Profil */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-6">
            {viewMode === "focus" ? (
              /* --- MODE 1 : PAR SECTION (FOCUS GUIDÉ) --- */
              <div className="space-y-6 animate-in fade-in-50 duration-200">
                {/* Header de la section active */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-border/70 bg-card/70 backdrop-blur-sm p-4 sm:p-5 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex size-10 items-center justify-center rounded-xl border ${currentSectionMeta.color}`}
                    >
                      <CurrentIcon className="size-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base sm:text-lg font-bold text-foreground">
                          {currentSectionMeta.titre}
                        </h2>
                        <span className="text-xs text-muted-foreground font-normal">
                          (Étape {currentIndex + 1} /{" "}
                          {ALL_PROFIL_SECTIONS.length})
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {currentSectionMeta.description}
                      </p>
                    </div>
                  </div>

                  {/* Boutons d'étape rapide */}
                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={!prevSection}
                      onClick={() =>
                        prevSection && handleSelectTab(prevSection.id)
                      }
                      className="h-8 text-xs gap-1 border-border/60"
                      title={
                        prevSection
                          ? `Précédent : ${prevSection.titre}`
                          : "Première section"
                      }
                    >
                      <ArrowLeft className="size-3.5" />
                      <span className="hidden md:inline">Précédent</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={!nextSection}
                      onClick={() =>
                        nextSection && handleSelectTab(nextSection.id)
                      }
                      className="h-8 text-xs gap-1 border-border/60"
                      title={
                        nextSection
                          ? `Suivant : ${nextSection.titre}`
                          : "Dernière section"
                      }
                    >
                      <span className="hidden md:inline">Suivant</span>
                      <ArrowRight className="size-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Formulaire de l'onglet actif */}
                <div className="rounded-2xl border border-border/60 bg-card/40 p-1">
                  {activeTab === "recherche" && (
                    <ProfilObjectivesTab
                      profil={profil}
                      onChange={updateProfil}
                    />
                  )}
                  {activeTab === "identite" && (
                    <ProfilIdentityTab
                      profil={profil}
                      onChange={updateProfil}
                    />
                  )}
                  {activeTab === "experiences" && (
                    <ProfilExperiencesTab
                      profil={profil}
                      onChange={updateProfil}
                    />
                  )}
                  {activeTab === "formation" && (
                    <ProfilEducationTab
                      profil={profil}
                      onChange={updateProfil}
                    />
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
                  {activeTab === "preferences" && (
                    <ProfilPreferencesTab
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

                {/* Stepper Footer Guidé */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card/60 p-4 shadow-xs">
                  <div className="flex items-center gap-2">
                    {prevSection ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSelectTab(prevSection.id)}
                        className="gap-2 text-xs font-medium text-muted-foreground hover:text-foreground"
                      >
                        <ArrowLeft className="size-3.5" />
                        Précédent : {prevSection.titre}
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground/60">
                        Première rubrique du profil
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <Button
                      onClick={enregistrer}
                      disabled={saving}
                      size="sm"
                      variant="outline"
                      className="text-xs gap-1.5 border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                    >
                      {saving ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : (
                        <Save className="size-3.5" />
                      )}
                      Sauvegarder
                    </Button>

                    {nextSection ? (
                      <Button
                        size="sm"
                        onClick={() => handleSelectTab(nextSection.id)}
                        className="gap-2 text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white"
                      >
                        Suivant : {nextSection.titre}
                        <ArrowRight className="size-3.5" />
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => setSummaryIaOpen(true)}
                        className="gap-2 text-xs font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white"
                      >
                        <Sparkles className="size-3.5" />
                        Voir la Synthèse IA
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* --- MODE 2 : TOUT DÉROULER (VUE CONTINUE) --- */
              <div className="space-y-8 animate-in fade-in-50 duration-200">
                {/* 1. Recherche */}
                <section id="section-recherche" className="space-y-3">
                  <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                        <Compass className="size-4" />
                      </div>
                      <h3 className="text-base font-bold text-foreground">
                        1. Ma Recherche & Postes Visés
                      </h3>
                    </div>
                  </div>
                  <ProfilObjectivesTab
                    profil={profil}
                    onChange={updateProfil}
                  />
                </section>

                {/* 2. Identité */}
                <section id="section-identite" className="space-y-3">
                  <div className="flex items-center justify-between border-b border-blue-500/20 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                        <UserRound className="size-4" />
                      </div>
                      <h3 className="text-base font-bold text-foreground">
                        2. Identité & Coordonnées
                      </h3>
                    </div>
                  </div>
                  <ProfilIdentityTab profil={profil} onChange={updateProfil} />
                </section>

                {/* 3. Expériences */}
                <section id="section-experiences" className="space-y-3">
                  <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                        <Briefcase className="size-4" />
                      </div>
                      <h3 className="text-base font-bold text-foreground">
                        3. Expériences Professionnelles & KPI
                      </h3>
                    </div>
                  </div>
                  <ProfilExperiencesTab
                    profil={profil}
                    onChange={updateProfil}
                  />
                </section>

                {/* 4. Formations */}
                <section id="section-formation" className="space-y-3">
                  <div className="flex items-center justify-between border-b border-indigo-500/20 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                        <GraduationCap className="size-4" />
                      </div>
                      <h3 className="text-base font-bold text-foreground">
                        4. Formations & Diplômes
                      </h3>
                    </div>
                  </div>
                  <ProfilEducationTab profil={profil} onChange={updateProfil} />
                </section>

                {/* 5. Compétences */}
                <section id="section-competences" className="space-y-3">
                  <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                        <Wrench className="size-4" />
                      </div>
                      <h3 className="text-base font-bold text-foreground">
                        5. Compétences & Outils Logiciels
                      </h3>
                    </div>
                  </div>
                  <ProfilSkillsTab profil={profil} onChange={updateProfil} />
                </section>

                {/* 6. Langues */}
                <section id="section-langues" className="space-y-3">
                  <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                        <Languages className="size-4" />
                      </div>
                      <h3 className="text-base font-bold text-foreground">
                        6. Langues & Certifications
                      </h3>
                    </div>
                  </div>
                  <ProfilLanguagesCertifsTab
                    profil={profil}
                    onChange={updateProfil}
                  />
                </section>

                {/* 7. Engagements */}
                <section id="section-engagements" className="space-y-3">
                  <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                        <Lightbulb className="size-4" />
                      </div>
                      <h3 className="text-base font-bold text-foreground">
                        7. Projets & Engagements Associatifs
                      </h3>
                    </div>
                  </div>
                  <ProfilProjectsEngagementsTab
                    profil={profil}
                    onChange={updateProfil}
                  />
                </section>

                {/* 8. Critères */}
                <section id="section-preferences" className="space-y-3">
                  <div className="flex items-center justify-between border-b border-pink-500/20 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400">
                        <SlidersHorizontal className="size-4" />
                      </div>
                      <h3 className="text-base font-bold text-foreground">
                        8. Critères de Choix & Pondérations Match IA
                      </h3>
                    </div>
                  </div>
                  <ProfilPreferencesTab
                    profil={profil}
                    onChange={updateProfil}
                  />
                </section>

                {/* 9. Documents */}
                <section id="section-documents" className="space-y-3">
                  <div className="flex items-center justify-between border-b border-blue-500/20 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                        <FileCode className="size-4" />
                      </div>
                      <h3 className="text-base font-bold text-foreground">
                        9. CV & Documents
                      </h3>
                    </div>
                  </div>
                  <ProfilDocumentsTab
                    profil={profil}
                    onChange={updateProfil}
                    onOpenCvModal={() => setCvOpen(true)}
                  />
                </section>
              </div>
            )}

            {/* Barre de statut et de sauvegarde permanente */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card/60 p-4 shadow-xs">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                <span>
                  {user?.id
                    ? "Profil synchronisé en temps réel avec votre compte Cloud."
                    : "Sauvegardé localement sur cet appareil."}
                  {lastSavedTime &&
                    ` (Dernier enregistrement : ${lastSavedTime})`}
                </span>
                <span className="hidden sm:inline text-muted-foreground/60">
                  •
                </span>
                <span className="hidden sm:inline text-muted-foreground/80">
                  Raccourci :{" "}
                  <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-foreground">
                    Ctrl + S
                  </kbd>
                </span>
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
                Enregistrer mon profil
              </Button>
            </div>
          </main>
        </div>
      </div>

      {/* Modal Synthèse IA "Ce que NACORA sait de moi" */}
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
          handleSelectTab(tab);
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

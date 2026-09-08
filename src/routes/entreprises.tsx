import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Briefcase,
  Building2,
  ChevronRight,
  ExternalLink,
  Globe,
  Heart,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Search,
  Trash2,
  UserCheck,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CenterModal } from "@/components/ui/modal";
import { CandidatureSheet } from "@/components/CandidatureSheet";
import { StatutBadge } from "@/components/StatutBadge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useCandidatures } from "@/hooks/useCandidatures";
import { useEntreprises } from "@/hooks/useEntreprises";
import { useContacts } from "@/hooks/useContacts";
import { useProfil } from "@/hooks/useProfil";
import { ContactSheet } from "@/components/ContactSheet";
import { emptyContact, type Contact } from "@/lib/contacts";
import {
  emptyCandidature,
  STATUTS,
  type Candidature,
} from "@/lib/candidatures";
import { emptyEntreprise, type Entreprise } from "@/lib/entreprises";

export const Route = createFileRoute("/entreprises")({
  head: () => ({
    meta: [
      { title: "Entreprises — NACORA" },
      {
        name: "description",
        content:
          "Toutes vos entreprises cibles : opportunités liées, contacts réseau, notes stratégiques et informations clés.",
      },
      { property: "og:title", content: "Entreprises — NACORA" },
      {
        property: "og:description",
        content:
          "Gestion centralisée et synchronisée de vos entreprises cibles, opportunités et contacts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EntreprisesPage,
});

type FilterType = "all" | "with_opps" | "with_contacts" | "favorites";
type SortType = "alpha" | "opps" | "recent";

function EntreprisesPage() {
  const {
    user,
    authLoading,
    items: candidatures,
    save,
    remove,
  } = useCandidatures();
  const {
    entreprises,
    loading: loadingEntreprises,
    saveEntreprise,
    removeEntreprise,
    getOpportunitiesForEntreprise,
    getContactsForEntreprise,
    syncWithOpportunites,
  } = useEntreprises();
  const { contacts, saveContact, deleteContactById } = useContacts();

  const profil = useProfil(user);
  const [recherche, setRecherche] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("alpha");

  // États pour modals et sheets
  const [selectedEntreprise, setSelectedEntreprise] =
    useState<Entreprise | null>(null);
  const [editingOpp, setEditingOpp] = useState<Candidature | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  // État pour la fiche contact
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contactSheetOpen, setContactSheetOpen] = useState(false);

  // Modal d'ajout manuel d'entreprise
  const [newCompanyModalOpen, setNewCompanyModalOpen] = useState(false);
  const [newCompanyForm, setNewCompanyForm] = useState({
    nom: "",
    secteur: "",
    siege: "",
    siteWeb: "",
    notes: "",
  });

  // Modal de confirmation de suppression d'entreprise
  const [deleteConfirmTarget, setDeleteConfirmTarget] =
    useState<Entreprise | null>(null);

  // Édition des notes personnelles dans la fiche
  const [notesDraft, setNotesDraft] = useState("");
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  // Synchronisation initiale prudente si opportunités chargées
  useEffect(() => {
    if (candidatures.length > 0 && !loadingEntreprises) {
      void syncWithOpportunites(candidatures, contacts);
    }
  }, [candidatures, contacts, loadingEntreprises, syncWithOpportunites]);

  // Synchronisation de l'ébauche de note lors de la sélection d'une entreprise
  useEffect(() => {
    if (selectedEntreprise) {
      setNotesDraft(selectedEntreprise.notes || "");
      setIsEditingNotes(false);
    }
  }, [selectedEntreprise]);

  // Calcul des données enrichies pour chaque entreprise
  const enrichedEntreprises = useMemo(() => {
    return entreprises.map((e) => {
      const opps = getOpportunitiesForEntreprise(e, candidatures);
      const cts = getContactsForEntreprise(e, contacts);

      // Meilleur statut d'avancement
      const bestStatut = opps.reduce(
        (best, c) =>
          STATUTS.indexOf(c.statut) > STATUTS.indexOf(best) ? c.statut : best,
        opps[0]?.statut ?? "Sauvegardée",
      );

      return {
        ...e,
        opportunites: opps,
        contactsCount: cts.length,
        contactsList: cts,
        bestStatut,
      };
    });
  }, [
    entreprises,
    candidatures,
    contacts,
    getOpportunitiesForEntreprise,
    getContactsForEntreprise,
  ]);

  // Filtrage et tri
  const filteredEntreprises = useMemo(() => {
    const q = recherche.trim().toLowerCase();

    return enrichedEntreprises
      .filter((e) => {
        // Recherche textuelle
        if (q) {
          const matchNom = e.nom.toLowerCase().includes(q);
          const matchSecteur = Boolean(e.secteur?.toLowerCase().includes(q));
          const matchSiege = Boolean(e.siege?.toLowerCase().includes(q));
          if (!matchNom && !matchSecteur && !matchSiege) return false;
        }

        // Filtre par catégorie
        if (filter === "with_opps" && e.opportunites.length === 0) return false;
        if (filter === "with_contacts" && e.contactsCount === 0) return false;
        if (filter === "favorites" && !e.isFavorite) return false;

        return true;
      })
      .sort((a, b) => {
        if (sort === "opps") {
          return b.opportunites.length - a.opportunites.length;
        }
        if (sort === "recent") {
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        }
        return a.nom.localeCompare(b.nom, "fr");
      });
  }, [enrichedEntreprises, recherche, filter, sort]);

  // Bascule de favori
  const handleToggleFavorite = async (e: React.MouseEvent, ent: Entreprise) => {
    e.stopPropagation();
    const updated = {
      ...ent,
      isFavorite: !ent.isFavorite,
      updatedAt: new Date().toISOString(),
    };
    await saveEntreprise(updated);
    if (selectedEntreprise?.id === ent.id) {
      setSelectedEntreprise(updated);
    }
    toast.success(
      updated.isFavorite
        ? `${ent.nom} ajoutée à vos favoris`
        : `${ent.nom} retirée de vos favoris`,
    );
  };

  // Enregistrement des notes manuelles pour une entreprise
  const handleSaveNotes = async () => {
    if (!selectedEntreprise) return;
    const manualFields = new Set(selectedEntreprise.manualFields || []);
    manualFields.add("notes");

    const updated: Entreprise = {
      ...selectedEntreprise,
      notes: notesDraft,
      manualFields: Array.from(manualFields),
      updatedAt: new Date().toISOString(),
    };
    await saveEntreprise(updated);
    setSelectedEntreprise(updated);
    setIsEditingNotes(false);
    toast.success("Notes de l'entreprise enregistrées.");
  };

  // Création manuelle d'une entreprise
  const handleCreateManualCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyForm.nom.trim()) {
      toast.error("Veuillez renseigner le nom de l'entreprise.");
      return;
    }

    const newEnt: Entreprise = {
      ...emptyEntreprise(newCompanyForm.nom),
      secteur: newCompanyForm.secteur.trim() || null,
      siege: newCompanyForm.siege.trim() || null,
      siteWeb: newCompanyForm.siteWeb.trim() || null,
      notes: newCompanyForm.notes.trim() || "",
      isManual: true,
      manualFields: ["nom", "secteur", "siege", "siteWeb", "notes"].filter(
        (k) => Boolean(newCompanyForm[k as keyof typeof newCompanyForm]),
      ),
    };

    await saveEntreprise(newEnt);
    setNewCompanyModalOpen(false);
    setNewCompanyForm({
      nom: "",
      secteur: "",
      siege: "",
      siteWeb: "",
      notes: "",
    });
    toast.success(`Entreprise ${newEnt.nom} créée.`);
  };

  // Suppression d'une entreprise après confirmation
  const handleConfirmDeleteEntreprise = async () => {
    if (!deleteConfirmTarget) return;
    await removeEntreprise(deleteConfirmTarget.id);
    if (selectedEntreprise?.id === deleteConfirmTarget.id) {
      setSelectedEntreprise(null);
    }
    setDeleteConfirmTarget(null);
    toast.success("Entreprise supprimée de votre suivi.");
  };

  // Créer une opportunité liée directement à l'entreprise
  const handleAddOpportunityForCompany = (ent: Entreprise) => {
    const opp = emptyCandidature();
    opp.companyId = ent.id;
    opp.entreprise = ent.nom;
    opp.company = ent.nom;
    opp.companyName = ent.nom;
    opp.companySector = ent.secteur || null;
    opp.secteur = ent.secteur || "";
    opp.companyLocation = ent.siege || null;
    opp.lieu = ent.siege || "";
    opp.companyWebsite = ent.siteWeb || null;

    setEditingOpp(opp);
    setSheetOpen(true);
  };

  const activeOppsCount = candidatures.filter(
    (c) => c.statut !== "Archivée",
  ).length;

  return (
    <AppShell
      eyebrow="Suivi"
      title="Entreprises"
      subtitle={`${entreprises.length} entreprise(s) suivie(s) · ${activeOppsCount} opportunité(s)`}
      actions={
        <div className="flex items-center gap-2">
          {authLoading || loadingEntreprises ? (
            <Loader2 className="size-5 animate-spin opacity-70" />
          ) : null}
          <Button
            type="button"
            size="sm"
            onClick={() => setNewCompanyModalOpen(true)}
            className="rounded-xl shadow-sm"
          >
            <Plus className="mr-1.5 size-4" /> Nouvelle entreprise
          </Button>
        </div>
      }
    >
      {/* Barre d'outils : recherche, filtres et tri */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher par nom, secteur, siège…"
            className="rounded-xl pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Filtres par type */}
          <div className="flex items-center rounded-xl border border-border/60 bg-card/60 p-1 text-xs">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`rounded-lg px-2.5 py-1 transition ${
                filter === "all"
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Toutes ({enrichedEntreprises.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("with_opps")}
              className={`rounded-lg px-2.5 py-1 transition ${
                filter === "with_opps"
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Opportunités
            </button>
            <button
              type="button"
              onClick={() => setFilter("with_contacts")}
              className={`rounded-lg px-2.5 py-1 transition ${
                filter === "with_contacts"
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Contacts
            </button>
            <button
              type="button"
              onClick={() => setFilter("favorites")}
              className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 transition ${
                filter === "favorites"
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Heart className="size-3 fill-current" /> Favoris
            </button>
          </div>

          {/* Tri */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortType)}
            className="rounded-xl border border-border/60 bg-card/60 px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="alpha">A-Z</option>
            <option value="opps">Plus d'opportunités</option>
            <option value="recent">Modifié récemment</option>
          </select>
        </div>
      </div>

      {/* État vide si aucune entreprise */}
      {filteredEntreprises.length === 0 && (
        <div className="glass-card flex flex-col items-center justify-center p-12 text-center">
          <div className="mb-3 grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Building2 className="size-6" />
          </div>
          <h3 className="text-base font-semibold">Aucune entreprise trouvée</h3>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            {recherche || filter !== "all"
              ? "Aucune entreprise ne correspond à vos filtres actuels."
              : "Vos entreprises sont alimentées automatiquement dès que vous sauvegardez une opportunité, ou vous pouvez en créer une manuellement."}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <Button
              size="sm"
              onClick={() => setNewCompanyModalOpen(true)}
              className="rounded-xl"
            >
              <Plus className="mr-1.5 size-4" /> Créer une entreprise
            </Button>
            <Link to="/opportunites">
              <Button size="sm" variant="outline" className="rounded-xl">
                Voir les opportunités
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Grille des Entreprises */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEntreprises.map((e, i) => {
          return (
            <button
              key={e.id}
              type="button"
              onClick={() => setSelectedEntreprise(e)}
              className="glass-card pop-in group relative flex min-w-0 flex-col gap-3.5 p-5 text-left transition hover:border-primary/40 hover:shadow-[0_20px_50px_-30px_rgba(124,92,255,0.4)]"
              style={{ animationDelay: `${Math.min(i, 12) * 35}ms` }}
            >
              {/* En-tête : icône, nom, favori */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary font-semibold text-sm border border-primary/20">
                    {e.nom.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <h2 className="truncate text-[15px] font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {e.nom}
                    </h2>
                    {(e.secteur || e.siege) && (
                      <p className="truncate text-xs text-muted-foreground mt-0.5">
                        {[e.secteur, e.siege].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(ev) => handleToggleFavorite(ev, e)}
                  title={
                    e.isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"
                  }
                  className="shrink-0 p-1 text-muted-foreground/60 hover:text-amber-500 transition-colors"
                >
                  <Heart
                    className={`size-4 ${
                      e.isFavorite ? "fill-amber-500 text-amber-500" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Badges de compteurs */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-muted-foreground">
                  <Briefcase className="size-3.5 text-primary" />
                  <strong className="font-semibold text-foreground">
                    {e.opportunites.length}
                  </strong>{" "}
                  opportunité{e.opportunites.length > 1 ? "s" : ""}
                </span>

                {e.contactsCount > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-muted-foreground">
                    <Users className="size-3.5 text-sky-400" />
                    <strong className="font-semibold text-foreground">
                      {e.contactsCount}
                    </strong>{" "}
                    contact{e.contactsCount > 1 ? "s" : ""}
                  </span>
                )}

                {e.opportunites.length > 0 && (
                  <div className="ml-auto">
                    <StatutBadge statut={e.bestStatut} />
                  </div>
                )}
              </div>

              {/* Aperçu d'une note personnelle ou d'une métrique si présente */}
              {e.notes ? (
                <p className="line-clamp-2 text-xs italic text-muted-foreground/90 bg-primary/5 rounded-lg px-2.5 py-1.5 border border-primary/10">
                  "{e.notes}"
                </p>
              ) : e.chiffresCles && e.chiffresCles.length > 0 ? (
                <p className="truncate text-xs text-muted-foreground/80">
                  ⭐ {e.chiffresCles[0]}
                </p>
              ) : null}

              {/* Bas de carte */}
              <div className="mt-auto flex items-center justify-between pt-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1 text-primary font-medium group-hover:underline">
                  Ouvrir la fiche <ChevronRight className="size-3.5" />
                </span>
                {e.siteWeb && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground/70">
                    <Globe className="size-3" /> Web
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* Modal Détail Entreprise */}
      {/* ========================================================= */}
      <CenterModal
        open={Boolean(selectedEntreprise)}
        onOpenChange={(o) => !o && setSelectedEntreprise(null)}
        size="xl"
        title={
          selectedEntreprise ? (
            <div className="flex items-center justify-between gap-3 w-full pr-6">
              <div className="flex items-center gap-3 min-w-0">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary font-bold text-sm">
                  {selectedEntreprise.nom.slice(0, 2).toUpperCase()}
                </span>
                <span className="truncate">{selectedEntreprise.nom}</span>
              </div>
              <button
                type="button"
                onClick={(ev) => handleToggleFavorite(ev, selectedEntreprise)}
                className="shrink-0 p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground"
                title={
                  selectedEntreprise.isFavorite
                    ? "Retirer des favoris"
                    : "Ajouter aux favoris"
                }
              >
                <Heart
                  className={`size-5 ${
                    selectedEntreprise.isFavorite
                      ? "fill-amber-500 text-amber-500"
                      : ""
                  }`}
                />
              </button>
            </div>
          ) : (
            ""
          )
        }
        description={
          selectedEntreprise
            ? [
                selectedEntreprise.secteur,
                selectedEntreprise.siege,
                selectedEntreprise.taille,
              ]
                .filter(Boolean)
                .join(" · ")
            : undefined
        }
      >
        {selectedEntreprise &&
          (() => {
            const opps = getOpportunitiesForEntreprise(
              selectedEntreprise,
              candidatures,
            );
            const cts = getContactsForEntreprise(selectedEntreprise, contacts);

            return (
              <div className="grid gap-6 p-5 sm:p-6">
                {/* Barre d'informations rapides */}
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  {selectedEntreprise.siteWeb && (
                    <a
                      href={
                        selectedEntreprise.siteWeb.startsWith("http")
                          ? selectedEntreprise.siteWeb
                          : `https://${selectedEntreprise.siteWeb}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-primary hover:underline"
                    >
                      <Globe className="size-3.5" />
                      Site officiel
                      <ExternalLink className="size-3" />
                    </a>
                  )}
                  {selectedEntreprise.siege && (
                    <span className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-muted-foreground">
                      <MapPin className="size-3.5 text-muted-foreground" />
                      {selectedEntreprise.siege}
                    </span>
                  )}
                  {selectedEntreprise.secteur && (
                    <span className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-muted-foreground">
                      <Building2 className="size-3.5 text-muted-foreground" />
                      {selectedEntreprise.secteur}
                    </span>
                  )}
                  {selectedEntreprise.taille && (
                    <span className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-muted-foreground">
                      <Users className="size-3.5 text-muted-foreground" />
                      {selectedEntreprise.taille}
                    </span>
                  )}

                  <div className="ml-auto">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleAddOpportunityForCompany(selectedEntreprise)
                      }
                      className="h-8 rounded-lg text-xs"
                    >
                      <Plus className="mr-1 size-3.5" /> Opportunité pour cette
                      entreprise
                    </Button>
                  </div>
                </div>

                {/* Présentation / Description (données extraites IA ou utilisateur) */}
                {selectedEntreprise.description && (
                  <div className="rounded-2xl border border-border/50 bg-card/40 p-4 text-xs leading-relaxed text-muted-foreground">
                    <strong className="block font-medium text-foreground mb-1">
                      À propos de l'entreprise
                    </strong>
                    {selectedEntreprise.description}
                  </div>
                )}

                {/* Chiffres clés et métriques IA */}
                {selectedEntreprise.chiffresCles &&
                  selectedEntreprise.chiffresCles.length > 0 && (
                    <div>
                      <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Chiffres clés & repères
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEntreprise.chiffresCles.map((metric, idx) => (
                          <span
                            key={idx}
                            className="rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-xs text-foreground font-medium"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Bloc NOTES PERSONNELLES (Données utilisateur protégées) */}
                <div className="rounded-2xl border border-border/60 bg-card/40 p-4">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h4 className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground">
                      <Pencil className="size-3.5 text-primary" /> Notes
                      stratégiques & remarques
                    </h4>
                    {!isEditingNotes ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsEditingNotes(true)}
                        className="h-7 text-xs text-primary"
                      >
                        Modifier
                      </Button>
                    ) : null}
                  </div>

                  {isEditingNotes ? (
                    <div className="space-y-2">
                      <Textarea
                        rows={3}
                        value={notesDraft}
                        onChange={(e) => setNotesDraft(e.target.value)}
                        placeholder="Ex: Entreprise en forte croissance IA, contacté lors du forum Neoma, relancer en avril…"
                        className="text-xs resize-none"
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setNotesDraft(selectedEntreprise.notes || "");
                            setIsEditingNotes(false);
                          }}
                          className="h-7 text-xs"
                        >
                          Annuler
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          onClick={handleSaveNotes}
                          className="h-7 text-xs rounded-lg"
                        >
                          Enregistrer la note
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground whitespace-pre-wrap">
                      {selectedEntreprise.notes
                        ? selectedEntreprise.notes
                        : "Aucune note personnelle. Cliquez sur modifier pour consigner des informations stratégiques."}
                    </p>
                  )}
                </div>

                {/* Section Opportunités associées */}
                <div>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h4 className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <Briefcase className="size-3.5 text-primary" />{" "}
                      Opportunités associées ({opps.length})
                    </h4>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        handleAddOpportunityForCompany(selectedEntreprise)
                      }
                      className="h-7 text-xs text-primary hover:underline"
                    >
                      + Ajouter
                    </Button>
                  </div>

                  {opps.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-border/60 p-4 text-center text-xs text-muted-foreground">
                      Aucune opportunité rattachée pour le moment.
                    </p>
                  ) : (
                    <div className="grid gap-2">
                      {opps.map((opp) => (
                        <button
                          key={opp.id}
                          type="button"
                          onClick={() => {
                            setEditingOpp(opp);
                            setSheetOpen(true);
                          }}
                          className="group flex w-full flex-wrap items-center justify-between gap-2.5 rounded-2xl border border-border/60 bg-card/60 p-3.5 text-left transition hover:border-primary/40 hover:bg-card/90"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                              {opp.poste || "Opportunité sans titre"}
                            </p>
                            <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                              {opp.contractType && (
                                <span>{opp.contractType}</span>
                              )}
                              {opp.duration && <span>· {opp.duration}</span>}
                              {opp.lieu && <span>· {opp.lieu}</span>}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <StatutBadge statut={opp.statut} />
                            <ChevronRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Section Contacts associés */}
                <div>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h4 className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <Users className="size-3.5 text-sky-400" /> Contacts de
                      l'entreprise ({cts.length})
                    </h4>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedContact({
                            ...emptyContact(),
                            companyId: selectedEntreprise.id,
                            entreprise: selectedEntreprise.nom,
                          });
                          setContactSheetOpen(true);
                        }}
                        className="h-7 text-xs text-primary hover:underline"
                      >
                        + Ajouter un contact
                      </Button>
                      <Link
                        to="/contacts"
                        className="text-xs font-medium text-muted-foreground hover:text-foreground"
                      >
                        Voir tout
                      </Link>
                    </div>
                  </div>

                  {cts.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-border/60 p-4 text-center text-xs text-muted-foreground">
                      Aucun contact réseau enregistré pour cette entreprise.
                    </p>
                  ) : (
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {cts.map((ct) => (
                        <div
                          key={ct.id}
                          onClick={() => {
                            setSelectedContact(ct);
                            setContactSheetOpen(true);
                          }}
                          className="rounded-2xl border border-border/60 bg-card/60 p-3.5 text-xs cursor-pointer hover:border-primary/50 hover:bg-card/80 transition-all"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-semibold text-foreground">
                                {ct.nom}
                              </p>
                              <p className="text-muted-foreground text-[11px]">
                                {[ct.poste, ct.type]
                                  .filter(Boolean)
                                  .join(" · ")}
                              </p>
                            </div>
                            <span className="grid size-6 place-items-center rounded-lg bg-sky-500/10 text-sky-400 text-[11px]">
                              <UserCheck className="size-3.5" />
                            </span>
                          </div>

                          <div className="mt-2.5 flex flex-wrap gap-2 text-[11px]">
                            {ct.email && (
                              <a
                                href={`mailto:${ct.email}`}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-foreground hover:text-primary"
                              >
                                <Mail className="size-3 text-muted-foreground" />{" "}
                                Email
                              </a>
                            )}
                            {ct.telephone && (
                              <a
                                href={`tel:${ct.telephone}`}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-foreground hover:text-primary"
                              >
                                <Phone className="size-3 text-muted-foreground" />{" "}
                                Appeler
                              </a>
                            )}
                            {ct.linkedin && (
                              <a
                                href={
                                  ct.linkedin.startsWith("http")
                                    ? ct.linkedin
                                    : `https://${ct.linkedin}`
                                }
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-foreground hover:text-primary"
                              >
                                <Linkedin className="size-3 text-muted-foreground" />{" "}
                                Profil
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Zone de suppression avec confirmation sécurisée */}
                <div className="mt-4 border-t border-border/40 pt-4 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Dernière mise à jour le{" "}
                    {new Date(selectedEntreprise.updatedAt).toLocaleDateString(
                      "fr-FR",
                    )}
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setDeleteConfirmTarget(selectedEntreprise)}
                    className="h-8 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="mr-1.5 size-3.5" /> Supprimer
                    l'entreprise
                  </Button>
                </div>
              </div>
            );
          })()}
      </CenterModal>

      {/* ========================================================= */}
      {/* Modal Ajout Manuel d'Entreprise */}
      {/* ========================================================= */}
      <CenterModal
        open={newCompanyModalOpen}
        onOpenChange={setNewCompanyModalOpen}
        size="md"
        title="Nouvelle entreprise cible"
        description="Créez une fiche entreprise pour organiser vos opportunités et contacts"
      >
        <form onSubmit={handleCreateManualCompany} className="grid gap-4 p-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Nom de l'entreprise <span className="text-destructive">*</span>
            </label>
            <Input
              required
              value={newCompanyForm.nom}
              onChange={(e) =>
                setNewCompanyForm((prev) => ({ ...prev, nom: e.target.value }))
              }
              placeholder="Ex: PwC, Danone, LVMH, Doctolib…"
              className="rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Secteur d'activité
              </label>
              <Input
                value={newCompanyForm.secteur}
                onChange={(e) =>
                  setNewCompanyForm((prev) => ({
                    ...prev,
                    secteur: e.target.value,
                  }))
                }
                placeholder="Ex: Conseil, Luxe, Tech…"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Siège / Ville
              </label>
              <Input
                value={newCompanyForm.siege}
                onChange={(e) =>
                  setNewCompanyForm((prev) => ({
                    ...prev,
                    siege: e.target.value,
                  }))
                }
                placeholder="Ex: Neuilly-sur-Seine, Paris…"
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Site web officiel
            </label>
            <Input
              value={newCompanyForm.siteWeb}
              onChange={(e) =>
                setNewCompanyForm((prev) => ({
                  ...prev,
                  siteWeb: e.target.value,
                }))
              }
              placeholder="https://entreprise.com"
              className="rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Notes personnelles
            </label>
            <Textarea
              rows={3}
              value={newCompanyForm.notes}
              onChange={(e) =>
                setNewCompanyForm((prev) => ({
                  ...prev,
                  notes: e.target.value,
                }))
              }
              placeholder="Remarques, contact initial, forum..."
              className="rounded-xl text-xs resize-none"
            />
          </div>

          <div className="mt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setNewCompanyModalOpen(false)}
              className="rounded-xl"
            >
              Annuler
            </Button>
            <Button type="submit" className="rounded-xl">
              Enregistrer l'entreprise
            </Button>
          </div>
        </form>
      </CenterModal>

      {/* ========================================================= */}
      {/* Alert Dialog de Suppression Sécurisée */}
      {/* ========================================================= */}
      <AlertDialog
        open={Boolean(deleteConfirmTarget)}
        onOpenChange={(o) => !o && setDeleteConfirmTarget(null)}
      >
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Supprimer {deleteConfirmTarget?.nom} ?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs leading-relaxed">
              {deleteConfirmTarget &&
              getOpportunitiesForEntreprise(deleteConfirmTarget, candidatures)
                .length > 0 ? (
                <>
                  Cette entreprise est actuellement liée à{" "}
                  <strong>
                    {
                      getOpportunitiesForEntreprise(
                        deleteConfirmTarget,
                        candidatures,
                      ).length
                    }{" "}
                    opportunité(s)
                  </strong>
                  .
                  <br />
                  <br />
                  La suppression de l'entreprise détachera ces opportunités sans
                  les effacer de votre suivi.
                </>
              ) : (
                "Cette entreprise sera retirée de votre suivi. Ses contacts associés seront conservés dans votre carnet d'adresses."
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDeleteEntreprise}
              className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ========================================================= */}
      {/* CandidatureSheet pour ouvrir/éditer une opportunité */}
      {/* ========================================================= */}
      <CandidatureSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        value={editingOpp}
        profil={profil}
        onSave={async (c) => {
          await save(c);
          setSheetOpen(false);
        }}
        onDelete={(id) => {
          remove(id);
          setSheetOpen(false);
        }}
      />

      {/* ========================================================= */}
      {/* ContactSheet pour voir/éditer/ajouter un contact */}
      {/* ========================================================= */}
      {selectedContact && (
        <ContactSheet
          open={contactSheetOpen}
          onOpenChange={setContactSheetOpen}
          contact={selectedContact}
          candidatures={candidatures}
          entreprises={entreprises}
          profil={profil}
          onSave={async (c) => {
            await saveContact(c);
            setContactSheetOpen(false);
          }}
          onDelete={async (c) => {
            await deleteContactById(c.id);
            setContactSheetOpen(false);
          }}
          onOpenCandidature={(candidatureId) => {
            const opp = candidatures.find((x) => x.id === candidatureId);
            if (opp) {
              setEditingOpp(opp);
              setSheetOpen(true);
            }
          }}
        />
      )}
    </AppShell>
  );
}

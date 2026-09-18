import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
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
  LayoutGrid,
  Table,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { ContactCard } from "@/components/ContactCard";
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
import { ContactImportModal } from "@/components/ContactImportModal";
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
  const { contacts, saveContact, deleteContactById, batchImportContacts } =
    useContacts();
  const [importModalOpen, setImportModalOpen] = useState(false);

  const profil = useProfil(user);
  const [recherche, setRecherche] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("alpha");
  const [viewMode, setViewMode] = useState<"grid" | "table">(() => {
    if (typeof window !== "undefined") {
      return (
        (localStorage.getItem("nacora_entreprises_view_mode") as
          "grid" | "table") ?? "grid"
      );
    }
    return "grid";
  });

  useEffect(() => {
    localStorage.setItem("nacora_entreprises_view_mode", viewMode);
  }, [viewMode]);

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
  const lastSyncHashRef = useRef<string>("");
  useEffect(() => {
    if (
      !loadingEntreprises &&
      (candidatures.length > 0 || contacts.length > 0)
    ) {
      const syncKey = `${candidatures.length}:${candidatures.map((c) => c.id).join(",")}:${contacts.length}:${contacts.map((c) => `${c.id}_${c.entreprise}`).join(",")}`;
      if (lastSyncHashRef.current !== syncKey) {
        lastSyncHashRef.current = syncKey;
        void syncWithOpportunites(candidatures, contacts);
      }
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
        // Recherche textuelle : nom, secteur, siège ou contacts
        if (q) {
          const matchNom = e.nom.toLowerCase().includes(q);
          const matchSecteur = Boolean(e.secteur?.toLowerCase().includes(q));
          const matchSiege = Boolean(e.siege?.toLowerCase().includes(q));
          const matchContact = e.contactsList.some(
            (c) =>
              c.prenom?.toLowerCase().includes(q) ||
              c.nom?.toLowerCase().includes(q) ||
              c.poste?.toLowerCase().includes(q) ||
              c.entreprise?.toLowerCase().includes(q),
          );
          if (!matchNom && !matchSecteur && !matchSiege && !matchContact)
            return false;
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
    (c) => c.statut !== "Clôturée" && (c.statut as string) !== "Archivée",
  ).length;

  return (
    <AppShell
      title="Entreprises"
      actions={
        <div className="flex items-center gap-2">
          {authLoading || loadingEntreprises ? (
            <Loader2 className="size-5 animate-spin opacity-70" />
          ) : null}
          <Button
            type="button"
            size="sm"
            onClick={() => setImportModalOpen(true)}
            className="rounded-xl shadow-sm bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs gap-1.5"
          >
            <Linkedin className="size-3.5 text-white" />
            Importer contacts LinkedIn
          </Button>
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
      {/* Synthèse de pilotage épurée style SaaS */}
      <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-semibold">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-foreground border border-white/10">
          <span className="size-2 rounded-full bg-slate-400" />
          <span className="text-muted-foreground font-medium">Suivies :</span>
          <span>{entreprises.length}</span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-foreground border border-white/10">
          <span className="size-2 rounded-full bg-amber-400" />
          <span className="text-muted-foreground font-medium">
            Favoris prioritaires :
          </span>
          <span>{enrichedEntreprises.filter((e) => e.isFavorite).length}</span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-foreground border border-white/10">
          <span className="size-2 rounded-full bg-indigo-400" />
          <span className="text-muted-foreground font-medium">
            Opportunités liées :
          </span>
          <span>{activeOppsCount}</span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-foreground border border-white/10">
          <span className="size-2 rounded-full bg-sky-400" />
          <span className="text-muted-foreground font-medium">
            Contacts réseau :
          </span>
          <span>{contacts.length}</span>
        </div>
      </div>

      {/* Barre d'outils : recherche, filtres et tri */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher par entreprise, secteur, siège ou contact…"
            className="pl-10 h-10 text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Filtres par type */}
          <div className="flex items-center rounded-xl border border-white/10 bg-black/20 backdrop-blur-md p-1 text-xs">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`rounded-lg px-2.5 py-1 transition cursor-pointer ${
                filter === "all"
                  ? "bg-primary text-white font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Toutes ({enrichedEntreprises.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("with_opps")}
              className={`rounded-lg px-2.5 py-1 transition cursor-pointer ${
                filter === "with_opps"
                  ? "bg-primary text-white font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Opportunités (
              {
                enrichedEntreprises.filter((e) => e.opportunites.length > 0)
                  .length
              }
              )
            </button>
            <button
              type="button"
              onClick={() => setFilter("with_contacts")}
              className={`rounded-lg px-2.5 py-1 transition cursor-pointer ${
                filter === "with_contacts"
                  ? "bg-primary text-white font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Contacts (
              {enrichedEntreprises.filter((e) => e.contactsCount > 0).length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("favorites")}
              className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 transition cursor-pointer ${
                filter === "favorites"
                  ? "bg-primary text-white font-semibold shadow-xs"
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
            className="rounded-xl border border-white/10 bg-black/20 backdrop-blur-md px-3 py-1.5 h-10 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
          >
            <option value="alpha">A-Z</option>
            <option value="opps">Plus d'opportunités</option>
            <option value="recent">Modifié récemment</option>
          </select>

          {/* Commutateur de vue */}
          <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-black/20 backdrop-blur-md p-1 h-10">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              title="Vue Grille"
              className={`rounded-lg p-1.5 transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-primary text-white font-medium shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/10"
              }`}
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              title="Vue Tableau"
              className={`rounded-lg p-1.5 transition-colors cursor-pointer ${
                viewMode === "table"
                  ? "bg-primary text-white font-medium shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/10"
              }`}
            >
              <Table className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* État vide si aucune entreprise */}
      {filteredEntreprises.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border/80 bg-card/40 flex flex-col items-center justify-center p-12 text-center">
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

      {/* Vue Tableau */}
      {viewMode === "table" && filteredEntreprises.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/50">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="border-b border-border/60 bg-muted/20 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">Nom</th>
                  <th className="px-6 py-4">Secteur</th>
                  <th className="px-6 py-4">Localisation</th>
                  <th className="px-6 py-4 text-center">Opportunités</th>
                  <th className="px-6 py-4 text-center">Contacts</th>
                  <th className="px-6 py-4">Dernier Statut</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filteredEntreprises.map((e) => (
                  <tr
                    key={e.id}
                    className="hover:bg-muted/10 transition-colors cursor-pointer"
                    onClick={() => setSelectedEntreprise(e)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground font-semibold text-xs border border-border/50">
                          {e.nom.slice(0, 2).toUpperCase()}
                        </span>
                        <span className="font-semibold text-foreground hover:text-primary transition-colors">
                          {e.nom}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground font-medium">
                      {e.secteur || "—"}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground font-medium">
                      {e.siege || "—"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center rounded-lg bg-muted px-2 py-0.5 text-xs font-semibold text-foreground border border-border/60">
                        {e.opportunites.length}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center rounded-lg bg-sky-500/10 px-2 py-0.5 text-xs font-bold text-sky-500 border border-sky-500/20">
                        {e.contactsCount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {e.opportunites.length > 0 ? (
                        <StatutBadge statut={e.bestStatut} />
                      ) : (
                        <span className="text-xs text-muted-foreground/60 italic">
                          Aucune
                        </span>
                      )}
                    </td>
                    <td
                      className="px-6 py-4 text-right"
                      onClick={(ev) => ev.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={(ev) => handleToggleFavorite(ev, e)}
                          className="p-1.5 text-muted-foreground hover:text-amber-500 rounded-lg hover:bg-muted/30 transition-all"
                        >
                          <Heart
                            className={`size-4 ${e.isFavorite ? "fill-amber-500 text-amber-500" : ""}`}
                          />
                        </button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedEntreprise(e)}
                          className="h-8 text-xs text-muted-foreground hover:text-foreground font-semibold px-2"
                        >
                          Fiche →
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grille des Entreprises */}
      {viewMode === "grid" && filteredEntreprises.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEntreprises.map((e, i) => {
            return (
              <div
                key={e.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedEntreprise(e)}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter" || ev.key === " ") {
                    ev.preventDefault();
                    setSelectedEntreprise(e);
                  }
                }}
                className="glass-card-interactive group relative flex min-w-0 cursor-pointer flex-col gap-3.5 p-5 text-left"
                style={{ animationDelay: `${Math.min(i, 12) * 35}ms` }}
              >
                {/* En-tête : icône, nom, favori */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-foreground font-semibold text-sm border border-white/15 backdrop-blur-md shadow-xs">
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
                      e.isFavorite
                        ? "Retirer des favoris"
                        : "Ajouter aux favoris"
                    }
                    className="shrink-0 p-1 text-muted-foreground/60 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <Heart
                      className={`size-4 ${
                        e.isFavorite ? "fill-amber-400 text-amber-400" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Badges de compteurs */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 ${
                      e.opportunites.length > 0
                        ? "border-primary/30 bg-primary/10 text-primary font-medium"
                        : "border-border/60 bg-card/60 text-muted-foreground/60"
                    }`}
                  >
                    <Briefcase className="size-3.5" />
                    <strong className="font-semibold text-foreground">
                      {e.opportunites.length}
                    </strong>{" "}
                    opportunité{e.opportunites.length > 1 ? "s" : ""}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 ${
                      e.contactsCount > 0
                        ? "border-sky-500/30 bg-sky-500/10 text-sky-400 font-medium"
                        : "border-border/60 bg-card/60 text-muted-foreground/60"
                    }`}
                  >
                    <Users className="size-3.5 text-sky-400" />
                    <strong className="font-semibold text-foreground">
                      {e.contactsCount}
                    </strong>{" "}
                    contact{e.contactsCount > 1 ? "s" : ""}
                  </span>

                  {e.opportunites.length === 0 && e.contactsCount > 0 && (
                    <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-sky-400/30 bg-sky-500/10 px-2 py-0.5 text-[10px] font-semibold text-sky-400">
                      Réseau
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
                  <p className="line-clamp-2 text-xs italic text-muted-foreground bg-muted/30 rounded-lg px-2.5 py-1.5 border border-border/50">
                    "{e.notes}"
                  </p>
                ) : e.chiffresCles && e.chiffresCles.length > 0 ? (
                  <p className="truncate text-xs text-muted-foreground/80">
                    ⭐ {e.chiffresCles[0]}
                  </p>
                ) : null}

                {/* Bas de carte */}
                <div className="mt-auto flex items-center justify-between pt-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1 text-muted-foreground group-hover:text-foreground font-semibold transition-colors">
                    Ouvrir la fiche{" "}
                    <ChevronRight className="size-3.5 text-muted-foreground/80 group-hover:text-foreground" />
                  </span>
                  {e.siteWeb && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground/70">
                      <Globe className="size-3" /> Web
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================= */}
      {/* Modal Détail Entreprise */}
      {/* ========================================================= */}
      <CenterModal
        open={Boolean(selectedEntreprise)}
        onOpenChange={(o) => !o && setSelectedEntreprise(null)}
        size="full"
        title={
          selectedEntreprise ? (
            <div className="flex items-center justify-between gap-3 w-full pr-6">
              <div className="flex items-center gap-3 min-w-0">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/15 border border-indigo-500/35 text-indigo-100 font-bold text-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]">
                  {selectedEntreprise.nom.slice(0, 2).toUpperCase()}
                </span>
                <span className="truncate">{selectedEntreprise.nom}</span>
              </div>
              <button
                type="button"
                onClick={(ev) => handleToggleFavorite(ev, selectedEntreprise)}
                className="shrink-0 p-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/12 text-muted-foreground transition-all cursor-pointer"
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
            const oppsBadgeClass =
              opps.length > 0
                ? "border-primary/30 bg-primary/10 text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
                : "border-white/10 bg-white/5 text-muted-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]";

            const hasNotes = !!selectedEntreprise.notes;
            const hasOpps = opps.length > 0;
            const hasDetails = !!(
              selectedEntreprise.siteWeb ||
              selectedEntreprise.siege ||
              selectedEntreprise.secteur ||
              selectedEntreprise.taille
            );
            const hasManyContacts = cts.length >= 12;

            return (
              <div className="flex flex-col gap-6 p-5 sm:p-6">
                {/* 1. Bandeau de synthèse horizontal compact */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 shadow-sm w-fit text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-tight">Opp.</span>
                    <span className="text-sm font-bold text-primary">{opps.length}</span>
                    <button 
                      onClick={() => handleAddOpportunityForCompany(selectedEntreprise)}
                      className="text-primary hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
                      title="Ajouter une opportunité"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                  <div className="h-3 w-px bg-white/10" />
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-tight">Contacts</span>
                    <span className="text-sm font-bold text-sky-400">{cts.length}</span>
                  </div>
                  <div className="h-3 w-px bg-white/10" />
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-tight">Notes</span>
                    <span className="text-sm font-bold text-indigo-400">{selectedEntreprise.notes ? 1 : 0}</span>
                    <button 
                      onClick={() => setIsEditingNotes(true)}
                      className="text-indigo-400 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
                      title="Modifier les notes"
                    >
                      <Pencil className="size-3.5" />
                    </button>
                  </div>
                </div>

                {/* 2. Colonne unique pleine largeur */}
                <div className="space-y-8">
                  {/* Présentation & Description */}
                  {selectedEntreprise.description && (
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 text-xs leading-relaxed text-muted-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                      <strong className="block font-medium text-foreground mb-2 text-sm">
                        À propos de l'entreprise
                      </strong>
                      <div className="text-muted-foreground/90">
                        {selectedEntreprise.description}
                      </div>
                    </div>
                  )}

                  {/* Détails de l'entité (Version compacte horizontale si infos présentes) */}
                  {hasDetails && (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-md">
                      <div className="flex flex-wrap gap-x-12 gap-y-4 text-xs">
                        {selectedEntreprise.siteWeb && (
                          <div>
                            <p className="text-muted-foreground font-medium mb-1.5 uppercase text-[10px] tracking-tight">
                              Site internet
                            </p>
                            <a
                              href={
                                selectedEntreprise.siteWeb.startsWith("http")
                                  ? selectedEntreprise.siteWeb
                                  : `https://${selectedEntreprise.siteWeb}`
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 font-bold text-blue-400 hover:text-blue-300 transition-colors break-all"
                            >
                              <Globe className="size-3.5 shrink-0" />
                              <span>{selectedEntreprise.siteWeb}</span>
                            </a>
                          </div>
                        )}

                        {selectedEntreprise.siege && (
                          <div>
                            <p className="text-muted-foreground font-medium mb-1.5 uppercase text-[10px] tracking-tight">
                              Siège
                            </p>
                            <span className="inline-flex items-center gap-1.5 font-bold text-foreground">
                              <MapPin className="size-3.5 text-muted-foreground" />
                              {selectedEntreprise.siege}
                            </span>
                          </div>
                        )}

                        {selectedEntreprise.secteur && (
                          <div>
                            <p className="text-muted-foreground font-medium mb-1.5 uppercase text-[10px] tracking-tight">
                              Secteur
                            </p>
                            <span className="inline-flex items-center gap-1.5 font-bold text-foreground">
                              <Building2 className="size-3.5 text-muted-foreground" />
                              {selectedEntreprise.secteur}
                            </span>
                          </div>
                        )}

                        {selectedEntreprise.taille && (
                          <div>
                            <p className="text-muted-foreground font-medium mb-1.5 uppercase text-[10px] tracking-tight">
                              Taille
                            </p>
                            <span className="inline-flex items-center gap-1.5 font-bold text-foreground">
                              <Users className="size-3.5 text-muted-foreground" />
                              {selectedEntreprise.taille}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Chiffres clés */}
                  {selectedEntreprise.chiffresCles &&
                    selectedEntreprise.chiffresCles.length > 0 && (
                      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                        <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                          Repères stratégiques
                        </h4>
                        <div className="flex flex-wrap gap-2.5">
                          {selectedEntreprise.chiffresCles.map(
                            (metric, idx) => (
                              <span
                                key={idx}
                                className="rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-foreground font-medium backdrop-blur-md shadow-sm"
                              >
                                {metric}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                  {/* Bloc NOTES PERSONNELLES & OPPORTUNITÉS */}
                  <div className="grid gap-6 xl:grid-cols-2">
                    {/* Notes stratégiques */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                      <div className="mb-4 flex items-center justify-between gap-2">
                        <h4 className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                          <Pencil className="size-4 text-indigo-400" />
                          Notes stratégiques
                        </h4>
                        {!isEditingNotes ? (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsEditingNotes(true)}
                            className="h-7 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg"
                          >
                            {hasNotes ? "Modifier" : "+ Ajouter"}
                          </Button>
                        ) : null}
                      </div>

                      {isEditingNotes ? (
                        <div className="space-y-3">
                          <Textarea
                            rows={4}
                            value={notesDraft}
                            onChange={(e) => setNotesDraft(e.target.value)}
                            placeholder="Ex: Entreprise en forte croissance IA, contacté lors du forum Neoma, relancer en avril…"
                            className="text-xs resize-none bg-black/20 border-white/10"
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
                              className="h-7 text-xs hover:bg-white/5 rounded-lg"
                            >
                              Annuler
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              onClick={handleSaveNotes}
                              className="h-7 text-xs rounded-lg bg-primary text-white hover:bg-primary/90"
                            >
                              Enregistrer
                            </Button>
                          </div>
                        </div>
                      ) : hasNotes ? (
                        <p className="text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed">
                          {selectedEntreprise.notes}
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground/50 italic">
                          Aucune note personnelle rattachée.
                        </p>
                      )}
                    </div>

                    {/* Opportunités associées */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <h4 className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                          <Briefcase className="size-4 text-primary" />{" "}
                          Opportunités ({opps.length})
                        </h4>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            handleAddOpportunityForCompany(selectedEntreprise)
                          }
                          className="h-7 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg px-2"
                        >
                          + Ajouter
                        </Button>
                      </div>

                      {!hasOpps ? (
                        <p className="text-xs text-muted-foreground/50 italic">
                          Aucune opportunité active pour le moment.
                        </p>
                      ) : (
                        <div className="space-y-2.5">
                          {opps.map((opp) => (
                            <button
                              key={opp.id}
                              type="button"
                              onClick={() => {
                                setEditingOpp(opp);
                                setSheetOpen(true);
                              }}
                              className="group flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-left transition hover:border-white/20 hover:bg-white/10 shadow-sm"
                            >
                              <div className="min-w-0">
                                <p className="truncate text-xs font-bold text-foreground group-hover:text-indigo-300 transition-colors">
                                  {opp.poste || "Sans titre"}
                                </p>
                                <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-muted-foreground">
                                  {opp.contractType && (
                                    <span>{opp.contractType}</span>
                                  )}
                                  {opp.lieu && (
                                    <>
                                      <span>·</span>
                                      <span>{opp.lieu}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <StatutBadge statut={opp.statut} />
                                <ChevronRight className="size-3.5 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Section Contacts (Pleine largeur, 3 colonnes) */}
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
                      <h4 className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Users className="size-4 text-sky-400" />
                        Contacts réseau ({cts.length})
                      </h4>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedContact({
                            ...emptyContact(),
                            companyId: selectedEntreprise.id,
                            entreprise: selectedEntreprise.nom,
                          });
                          setContactSheetOpen(true);
                        }}
                        className="h-8 text-xs gap-1.5 rounded-lg border-white/10 bg-white/5 hover:bg-white/10"
                      >
                        <Plus className="size-3.5" /> Ajouter un contact
                      </Button>
                    </div>

                    {cts.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center">
                        <Users className="size-8 text-muted-foreground/20 mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground">
                          Aucun contact réseau rattaché.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {cts.map((ct) => (
                          <ContactCard
                            key={ct.id}
                            contact={ct}
                            candidatures={candidatures}
                            hideCompanyTag={true}
                            onOpenDetails={(contact) => {
                              setSelectedContact(contact);
                              setContactSheetOpen(true);
                            }}
                            onOpenMessageIa={(contact) => {
                              setSelectedContact(contact);
                              setContactSheetOpen(true);
                            }}
                            onOpenOpportunity={(oppId) => {
                              setSelectedCandidatureId(oppId);
                              setSheetOpen(true);
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Zone de suppression footer */}
                  <div className="mt-8 border-t border-border/40 pt-6 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Dernière mise à jour le{" "}
                      {new Date(
                        selectedEntreprise.updatedAt,
                      ).toLocaleDateString("fr-FR")}
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
      {/* ContactImportModal pour import LinkedIn depuis Entreprises */}
      {/* ========================================================= */}
      <ContactImportModal
        open={importModalOpen}
        onOpenChange={setImportModalOpen}
        existingContacts={contacts}
        userSchool={profil?.ecole || profil?.formation}
        userTargetSector={profil?.posteCible || profil?.metierCible}
        onImportComplete={async (incoming, resolutions) => {
          return await batchImportContacts(incoming, resolutions);
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

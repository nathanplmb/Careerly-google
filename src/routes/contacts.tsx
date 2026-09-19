import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Briefcase,
  Building2,
  CheckCircle2,
  ExternalLink,
  Filter,
  LayoutGrid,
  Linkedin,
  List,
  Loader2,
  Mail,
  Phone,
  Plus,
  Search,
  Smartphone,
  Sparkles,
  Upload,
  UserCheck,
  UserRound,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppShell } from "@/components/AppShell";
import { ContactSheet } from "@/components/ContactSheet";
import { ContactImportModal } from "@/components/ContactImportModal";
import { ContactCard } from "@/components/ContactCard";
import { CandidatureSheet } from "@/components/CandidatureSheet";
import { useSession } from "@/hooks/useSession";
import { useProfil } from "@/hooks/useProfil";
import { useContacts } from "@/hooks/useContacts";
import { useCandidatures } from "@/hooks/useCandidatures";
import { useEntreprises } from "@/hooks/useEntreprises";
import {
  emptyContact,
  getContactFullName,
  getContactCompany,
  getContactJobTitle,
  getCategoryBadgeStyle,
  TYPES_CONTACT,
  CATEGORIES_CONTACT,
  SOURCE_LABELS,
  type Contact,
  type CategoryContact,
  type ContactSource,
} from "@/lib/contacts";
import type { Candidature } from "@/lib/candidatures";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Contacts — NACORA" },
      {
        name: "description",
        content:
          "Gérez vos recruteurs, RH, managers et relations LinkedIn/téléphone, suivez vos échanges et synchronisez vos opportunités.",
      },
      { property: "og:title", content: "Contacts — NACORA" },
      {
        property: "og:description",
        content:
          "Carnet de contacts professionnels synchronisé avec vos opportunités et entreprises cibles.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ContactsPage,
});

type SourceFilter = "all" | ContactSource;
type RelationFilter = "all" | "with_opps" | "without_opps" | "with_company";

export function ContactsPage() {
  const { user, loading: authLoading } = useSession();
  const profil = useProfil(user);

  const {
    contacts,
    loading: contactsLoading,
    saveContact,
    deleteContactById,
    batchImportContacts,
    getOpportunitiesForContact,
  } = useContacts();

  const { items: candidatures, save: saveCandidature } = useCandidatures();
  const { entreprises } = useEntreprises();

  // Filtres
  const [recherche, setRecherche] = useState("");
  const [filtreType, setFiltreType] = useState<string>("tous");
  const [filtreCategory, setFiltreCategory] = useState<string>("all");
  const [filtreSource, setFiltreSource] = useState<SourceFilter>("all");
  const [filtreRelation, setFiltreRelation] = useState<RelationFilter>("all");

  const [viewMode, setViewMode] = useState<"grid" | "table">(() => {
    if (typeof window !== "undefined") {
      return (
        (localStorage.getItem("nacora_contacts_view_mode") as
          "grid" | "table") ?? "grid"
      );
    }
    return "grid";
  });

  const handleSetViewMode = (mode: "grid" | "table") => {
    setViewMode(mode);
    localStorage.setItem("nacora_contacts_view_mode", mode);
  };

  // Modales
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact>(() =>
    emptyContact(),
  );
  const [importModalOpen, setImportModalOpen] = useState(false);

  // Opportunité sélectionnée pour vue/édition
  const [editingOpp, setEditingOpp] = useState<Candidature | null>(null);
  const [oppSheetOpen, setOppSheetOpen] = useState(false);

  // Statistiques calculées
  const stats = useMemo(() => {
    const total = contacts.length;
    const withOpps = contacts.filter(
      (c) => getOpportunitiesForContact(c, candidatures).length > 0,
    ).length;
    const withCompany = contacts.filter((c) =>
      Boolean(c.companyId || c.entreprise),
    ).length;
    const fromPhone = contacts.filter(
      (c) => c.sources?.includes("phone") || c.source === "phone",
    ).length;
    const fromLinkedin = contacts.filter(
      (c) => c.sources?.includes("linkedin") || c.source === "linkedin",
    ).length;

    return { total, withOpps, withCompany, fromPhone, fromLinkedin };
  }, [contacts, candidatures, getOpportunitiesForContact]);

  // Liste filtrée
  const liste = useMemo(() => {
    const q = recherche.trim().toLowerCase();
    return contacts
      .filter((c) => {
        // Filtre type
        if (filtreType !== "tous" && c.type !== filtreType) return false;

        // Filtre catégorie
        if (filtreCategory !== "all" && c.category !== filtreCategory)
          return false;

        // Filtre source
        if (filtreSource !== "all") {
          const sources =
            c.sources && c.sources.length > 0
              ? c.sources
              : [c.source || "manual"];
          if (!sources.includes(filtreSource)) return false;
        }

        // Filtre relation
        const opps = getOpportunitiesForContact(c, candidatures);
        if (filtreRelation === "with_opps" && opps.length === 0) return false;
        if (filtreRelation === "without_opps" && opps.length > 0) return false;
        if (filtreRelation === "with_company" && !c.companyId && !c.entreprise)
          return false;

        // Recherche texte
        if (q) {
          const fullName = getContactFullName(c).toLowerCase();
          const company = getContactCompany(c).toLowerCase();
          const job = getContactJobTitle(c).toLowerCase();
          const email = (c.email || "").toLowerCase();
          const phone = (c.telephone || "").toLowerCase();
          const notes = (c.notes || "").toLowerCase();

          return (
            fullName.includes(q) ||
            company.includes(q) ||
            job.includes(q) ||
            email.includes(q) ||
            phone.includes(q) ||
            notes.includes(q)
          );
        }

        return true;
      })
      .sort((a, b) => {
        const scoreA = a.relevanceScore ?? -1;
        const scoreB = b.relevanceScore ?? -1;
        if (scoreA !== scoreB) return scoreB - scoreA;
        return getContactFullName(a).localeCompare(getContactFullName(b));
      });
  }, [
    contacts,
    recherche,
    filtreType,
    filtreCategory,
    filtreSource,
    filtreRelation,
    candidatures,
    getOpportunitiesForContact,
  ]);

  const handleOpenNew = () => {
    setSelectedContact(emptyContact());
    setSheetOpen(true);
  };

  const handleOpenContact = (c: Contact) => {
    setSelectedContact(c);
    setSheetOpen(true);
  };

  const handleSaveContact = async (c: Contact) => {
    await saveContact(c);
    setSheetOpen(false);
  };

  const handleDeleteContact = async (c: Contact) => {
    await deleteContactById(c.id);
    setSheetOpen(false);
  };

  const handleOpenOpportunity = (candidatureId: string) => {
    const opp = candidatures.find((x) => x.id === candidatureId);
    if (opp) {
      setEditingOpp(opp);
      setOppSheetOpen(true);
    }
  };

  // Helper pour initiales avatar
  const getInitials = (contact: Contact) => {
    const name = getContactFullName(contact);
    if (!name) return "CO";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <AppShell
      title="Contacts"
      actions={
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setImportModalOpen(true)}
            className="gap-1.5 text-xs h-9 font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm"
          >
            <Linkedin className="size-3.5 text-white" /> Importer mes contacts
            LinkedIn
          </Button>
          <Button
            variant="outline"
            onClick={() => setImportModalOpen(true)}
            className="gap-1.5 text-xs h-9 font-medium"
          >
            <Upload className="size-3.5 text-muted-foreground" /> Autre import
            (vCard)
          </Button>
          <Button
            onClick={handleOpenNew}
            className="gap-1.5 text-xs h-9 font-semibold bg-primary text-primary-foreground"
          >
            <Plus className="size-4" /> Nouveau contact
          </Button>
        </div>
      }
    >
      {/* Synthèse réseau épurée style Liquid Glass */}
      <div className="mb-5 flex flex-wrap items-center gap-2.5 text-xs font-semibold">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 text-foreground backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
          <span className="size-2 rounded-full bg-slate-400 shadow-[0_0_6px_rgba(148,163,184,0.6)]" />
          <span className="text-muted-foreground font-medium">
            Total Contacts :
          </span>
          <span className="font-bold">{stats.total}</span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 text-foreground backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
          <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
          <span className="text-muted-foreground font-medium">
            Avec opportunité :
          </span>
          <span className="font-bold text-emerald-400">{stats.withOpps}</span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 text-foreground backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
          <span className="size-2 rounded-full bg-sky-400 shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
          <span className="text-muted-foreground font-medium">
            Rattachés Entreprises :
          </span>
          <span className="font-bold text-sky-300">{stats.withCompany}</span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 text-foreground backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
          <span className="size-2 rounded-full bg-indigo-400 shadow-[0_0_6px_rgba(129,140,248,0.8)]" />
          <span className="text-muted-foreground font-medium">
            Imports Réseau :
          </span>
          <span className="font-bold text-indigo-300">
            {stats.fromPhone + stats.fromLinkedin} ({stats.fromPhone} tél. /{" "}
            {stats.fromLinkedin} in)
          </span>
        </div>
      </div>

      {/* Barre de recherche et filtres - Panneau Verre Liquide */}
      <section className="glass-panel mb-6 flex flex-col gap-3.5 p-3.5 sm:p-4 shadow-md">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              placeholder="Rechercher par nom, entreprise, poste, email, notes..."
              className="h-9.5 w-full rounded-xl bg-white/5 pl-9 pr-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:bg-white/10 focus:ring-2 focus:ring-primary/20 backdrop-blur-md transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Select value={filtreType} onValueChange={setFiltreType}>
              <SelectTrigger className="w-36 sm:w-40 h-9.5 text-xs rounded-xl bg-white/5 border-white/10 backdrop-blur-md">
                <SelectValue placeholder="Rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous" className="text-xs">
                  Tous les rôles
                </SelectItem>
                {TYPES_CONTACT.map((t) => (
                  <SelectItem key={t} value={t} className="text-xs">
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filtreCategory} onValueChange={setFiltreCategory}>
              <SelectTrigger className="w-40 sm:w-48 h-9.5 text-xs rounded-xl bg-white/5 border-white/10 backdrop-blur-md">
                <SelectValue placeholder="Catégorie IA" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">
                  Toutes catégories IA
                </SelectItem>
                {CATEGORIES_CONTACT.map((cat) => {
                  const style = getCategoryBadgeStyle(cat);
                  return (
                    <SelectItem key={cat} value={cat} className="text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className={`size-2 rounded-full shrink-0 ${style.dotClass}`}
                        />
                        <span>{cat}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <Select
              value={filtreSource}
              onValueChange={(v) => setFiltreSource(v as SourceFilter)}
            >
              <SelectTrigger className="w-36 sm:w-40 h-9.5 text-xs rounded-xl bg-white/5 border-white/10 backdrop-blur-md">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">
                  Toutes sources
                </SelectItem>
                <SelectItem value="phone" className="text-xs">
                  Téléphone (vCard)
                </SelectItem>
                <SelectItem value="linkedin" className="text-xs">
                  LinkedIn
                </SelectItem>
                <SelectItem value="opportunity" className="text-xs">
                  Opportunité
                </SelectItem>
                <SelectItem value="manual" className="text-xs">
                  Manuel
                </SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filtreRelation}
              onValueChange={(v) => setFiltreRelation(v as RelationFilter)}
            >
              <SelectTrigger className="w-36 sm:w-40 h-9.5 text-xs rounded-xl bg-white/5 border-white/10 backdrop-blur-md">
                <SelectValue placeholder="Liaison" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">
                  Toutes liaisons
                </SelectItem>
                <SelectItem value="with_opps" className="text-xs">
                  Avec opportunité(s)
                </SelectItem>
                <SelectItem value="without_opps" className="text-xs">
                  Sans opportunité
                </SelectItem>
                <SelectItem value="with_company" className="text-xs">
                  Lié à une entreprise
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Selecteur de vue Grid / Table Liquid Glass */}
            <div className="flex items-center gap-0.5 rounded-xl bg-black/25 dark:bg-black/30 backdrop-blur-xl p-1 select-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]">
              <button
                type="button"
                onClick={() => handleSetViewMode("grid")}
                aria-label="Vue grille"
                className={cn(
                  "grid size-7.5 place-items-center rounded-lg transition-all cursor-pointer",
                  viewMode === "grid"
                    ? "bg-white/15 dark:bg-white/15 text-foreground font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <LayoutGrid className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleSetViewMode("table")}
                aria-label="Vue tableau"
                className={cn(
                  "grid size-7.5 place-items-center rounded-lg transition-all cursor-pointer",
                  viewMode === "table"
                    ? "bg-white/15 dark:bg-white/15 text-foreground font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <List className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* État de chargement */}
      {contactsLoading ? (
        <div className="flex items-center justify-center p-12 text-sm text-muted-foreground gap-2">
          <Loader2 className="size-4 animate-spin text-muted-foreground" />{" "}
          Chargement de vos contacts…
        </div>
      ) : liste.length === 0 ? (
        /* État vide */
        <div className="glass-panel border-dashed p-10 text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-white/5 text-muted-foreground mb-3 border border-white/10">
            <Users className="size-6 text-primary" />
          </div>
          <h3 className="font-semibold text-sm text-foreground">
            {recherche ||
            filtreType !== "tous" ||
            filtreSource !== "all" ||
            filtreRelation !== "all"
              ? "Aucun contact ne correspond à ces critères"
              : "Votre carnet de contacts est encore vide"}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground max-w-md mx-auto">
            {recherche ||
            filtreType !== "tous" ||
            filtreSource !== "all" ||
            filtreRelation !== "all"
              ? "Essayez de modifier votre recherche ou réinitialisez les filtres."
              : "Importez vos contacts depuis votre téléphone (vCard) ou LinkedIn (CSV) pour alimenter vos opportunités en un clic."}
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setImportModalOpen(true)}
              className="text-xs gap-1.5"
            >
              <Upload className="size-3.5 text-muted-foreground" /> Importer
              vCard / LinkedIn
            </Button>
            <Button
              size="sm"
              onClick={handleOpenNew}
              className="text-xs gap-1.5"
            >
              <Plus className="size-3.5" /> Nouveau contact
            </Button>
          </div>
        </div>
      ) : viewMode === "table" ? (
        /* Tableau dense de contact */
        <div className="overflow-hidden glass-panel">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/50 bg-muted/20 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Pertinence</th>
                  <th className="py-3 px-4">Rôle / Type</th>
                  <th className="py-3 px-4">Entreprise & Poste</th>
                  <th className="py-3 px-4">Opportunités liées</th>
                  <th className="py-3 px-4">Action planifiée</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30 text-xs">
                {liste.map((c) => {
                  const fullName = getContactFullName(c);
                  const company = getContactCompany(c);
                  const jobTitle = getContactJobTitle(c);
                  const initials = getInitials(c);
                  const opps = getOpportunitiesForContact(c, candidatures);
                  const sources =
                    c.sources && c.sources.length > 0
                      ? c.sources
                      : [c.source || "manual"];

                  return (
                    <tr
                      key={c.id}
                      className="hover:bg-muted/10 transition-colors group"
                    >
                      <td className="py-3.5 px-4 min-w-[200px]">
                        <div className="flex items-center gap-3">
                          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground font-semibold text-xs border border-border/60">
                            {initials}
                          </span>
                          <div className="min-w-0">
                            <button
                              type="button"
                              onClick={() => handleOpenContact(c)}
                              className="font-bold text-foreground hover:text-primary transition-colors text-left block"
                            >
                              {fullName || "Sans nom"}
                            </button>
                            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-muted-foreground">
                              {c.email && (
                                <span className="truncate" title={c.email}>
                                  {c.email}
                                </span>
                              )}
                              {c.email && c.telephone && <span>•</span>}
                              {c.telephone && (
                                <span className="shrink-0">{c.telephone}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {c.relevanceScore !== undefined ? (
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold border backdrop-blur-md ${
                              c.relevanceScore >= 80
                                ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                                : c.relevanceScore >= 60
                                  ? "bg-sky-500/15 text-sky-300 border-sky-500/30"
                                  : "bg-slate-500/15 text-slate-300 border-slate-500/30"
                            }`}
                          >
                            ⚡ {c.relevanceScore}%
                          </span>
                        ) : (
                          <span className="text-[11px] text-muted-foreground/60">
                            —
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1 items-start">
                          {c.category ? (
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold border backdrop-blur-md ${getCategoryBadgeStyle(c.category).fullClass}`}
                            >
                              <Sparkles className="size-2.5 opacity-80" />
                              {c.category}
                            </span>
                          ) : (
                            <span className="rounded-full border border-border/60 bg-muted/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                              {c.type}
                            </span>
                          )}
                          <div className="flex items-center gap-1">
                            {sources
                              .filter((s) => s !== "linkedin")
                              .map((src) => (
                                <span
                                  key={src}
                                  className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground"
                                  title={`Source: ${SOURCE_LABELS[src as keyof typeof SOURCE_LABELS] || src}`}
                                >
                                  {src === "phone" && (
                                    <Smartphone className="size-3 text-emerald-500" />
                                  )}
                                  {src === "opportunity" && (
                                    <Briefcase className="size-3 text-muted-foreground" />
                                  )}
                                </span>
                              ))}
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 min-w-[180px]">
                        <div className="font-medium text-foreground">
                          {jobTitle || "Poste non précisé"}
                        </div>
                        {company ? (
                          <div className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Building2 className="size-3" />
                            {company}
                          </div>
                        ) : (
                          <span className="text-[10px] text-muted-foreground/60">
                            —
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 max-w-[240px]">
                        {opps.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {opps.slice(0, 2).map((opp) => (
                              <button
                                key={opp.id}
                                type="button"
                                onClick={() => handleOpenOpportunity(opp.id)}
                                className="inline-flex items-center gap-1.5 rounded bg-muted hover:bg-muted/80 border border-border px-1.5 py-0.5 text-[10px] font-medium text-foreground transition-colors max-w-[140px] truncate"
                              >
                                <span className="truncate">
                                  {opp.poste || "Offre"}
                                </span>
                              </button>
                            ))}
                            {opps.length > 2 && (
                              <span className="text-[10px] text-muted-foreground self-center">
                                +{opps.length - 2}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-[11px] text-muted-foreground/60">
                            Aucune
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 max-w-[180px]">
                        {c.prochaineAction ? (
                          <div
                            className="text-[11px] font-medium text-amber-600 dark:text-amber-400 truncate"
                            title={c.prochaineAction}
                          >
                            {c.prochaineAction}
                            {c.dateProchaineAction && (
                              <span className="text-[10px] text-muted-foreground block font-normal">
                                {c.dateProchaineAction}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-[11px] text-muted-foreground/40">
                            —
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenContact(c)}
                          className="h-8 px-2.5 text-xs text-muted-foreground hover:text-foreground font-semibold"
                        >
                          Détails
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grille des cartes de contact (max 3 par ligne pour lisibilité optimale) */
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {liste.map((c) => (
            <ContactCard
              key={c.id}
              contact={c}
              candidatures={candidatures}
              onOpenDetails={handleOpenContact}
              onOpenMessageIa={handleOpenContact}
              onOpenOpportunity={handleOpenOpportunity}
            />
          ))}
        </div>
      )}

      {/* Sheet Fiche Contact */}
      <ContactSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        contact={selectedContact}
        candidatures={candidatures}
        entreprises={entreprises}
        profil={profil}
        onSave={(c) => void handleSaveContact(c)}
        onDelete={(c) => void handleDeleteContact(c)}
        onOpenCandidature={handleOpenOpportunity}
      />

      {/* Modal Import Contacts vCard & LinkedIn */}
      <ContactImportModal
        open={importModalOpen}
        onOpenChange={setImportModalOpen}
        existingContacts={contacts}
        userSchool={profil?.ecole || profil?.formation}
        userTargetSector={profil?.posteCible || profil?.metierCible}
        onImportComplete={async (contactsToImport, resolutions) => {
          return await batchImportContacts(contactsToImport, resolutions);
        }}
      />

      {/* Modal Candidature Sheet */}
      {editingOpp && (
        <CandidatureSheet
          value={editingOpp}
          profil={profil}
          open={oppSheetOpen}
          onOpenChange={(v) => {
            setOppSheetOpen(v);
            if (!v) setEditingOpp(null);
          }}
          onSave={async (patch) => {
            const updated = { ...editingOpp, ...patch };
            setEditingOpp(updated);
            await saveCandidature(updated);
          }}
        />
      )}
    </AppShell>
  );
}

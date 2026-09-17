import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Briefcase,
  Building2,
  CheckCircle2,
  ExternalLink,
  Filter,
  Linkedin,
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
import { CandidatureSheet } from "@/components/CandidatureSheet";
import { useSession } from "@/hooks/useSession";
import { useProfil } from "@/hooks/useProfil";
import { useContacts } from "@/hooks/useContacts";
import { useCandidatures } from "@/hooks/useCandidatures";
import { useEntreprises } from "@/hooks/useEntreprises";
import {
  emptyContact,
  getContactFullName,
  getContactInitials,
  getContactCompany,
  getContactJobTitle,
  TYPES_CONTACT,
  SOURCE_LABELS,
  type Contact,
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
  const [filtreSource, setFiltreSource] = useState<SourceFilter>("all");
  const [filtreRelation, setFiltreRelation] = useState<RelationFilter>("all");

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
    return contacts.filter((c) => {
      // Filtre type
      if (filtreType !== "tous" && c.type !== filtreType) return false;

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
    });
  }, [
    contacts,
    recherche,
    filtreType,
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
    return getContactInitials(contact);
  };

  return (
    <AppShell
      eyebrow="Réseau professionnel"
      title="Contacts"
      subtitle="Recruteurs, RH, managers et anciens élèves synchronisés avec vos opportunités et entreprises"
      actions={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setImportModalOpen(true)}
            className="gap-1.5 text-xs h-9 font-medium"
          >
            <Upload className="size-3.5 text-primary" /> Importer
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
      {/* Barre de métriques rapides */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Total Contacts</span>
            <Users className="size-4 text-primary" />
          </div>
          <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
            {stats.total}
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Carnet professionnel
          </p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Avec opportunité</span>
            <Briefcase className="size-4 text-emerald-500" />
          </div>
          <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
            {stats.withOpps}
          </p>
          <p className="mt-0.5 text-[11px] text-emerald-600 dark:text-emerald-400">
            Liaison active avec offres
          </p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Rattachés Entreprises</span>
            <Building2 className="size-4 text-sky-500" />
          </div>
          <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
            {stats.withCompany}
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Entreprises cibles
          </p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Imports Réseau</span>
            <Sparkles className="size-4 text-amber-500" />
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-foreground">
              {stats.fromPhone + stats.fromLinkedin}
            </span>
            <span className="text-[11px] text-muted-foreground">
              ({stats.fromPhone} tél. / {stats.fromLinkedin} in)
            </span>
          </div>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            VCard & LinkedIn CSV
          </p>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="mb-6 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              placeholder="Rechercher par nom, entreprise, poste, email, notes..."
              className="pl-9 h-10 text-xs bg-card/60 backdrop-blur-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Select value={filtreType} onValueChange={setFiltreType}>
              <SelectTrigger className="w-40 sm:w-44 h-10 text-xs bg-card/60">
                <SelectValue placeholder="Type" />
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

            <Select
              value={filtreSource}
              onValueChange={(v) => setFiltreSource(v as SourceFilter)}
            >
              <SelectTrigger className="w-36 sm:w-40 h-10 text-xs bg-card/60">
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
              <SelectTrigger className="w-40 sm:w-44 h-10 text-xs bg-card/60">
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
          </div>
        </div>
      </div>

      {/* État de chargement */}
      {contactsLoading ? (
        <div className="flex items-center justify-center p-12 text-sm text-muted-foreground gap-2">
          <Loader2 className="size-4 animate-spin text-primary" /> Chargement de
          vos contacts…
        </div>
      ) : liste.length === 0 ? (
        /* État vide */
        <div className="rounded-2xl border border-dashed border-border/80 bg-card/40 p-10 text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary mb-3">
            <Users className="size-6" />
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
              <Upload className="size-3.5 text-primary" /> Importer vCard /
              LinkedIn
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
      ) : (
        /* Grille des cartes de contact */
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {liste.map((c, i) => {
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
              <div
                key={c.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/60 bg-card/70 p-4 backdrop-blur-xl transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div>
                  {/* Haut de carte */}
                  <div className="flex items-start justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => handleOpenContact(c)}
                      className="flex items-start gap-3 min-w-0 text-left flex-1"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 text-primary font-bold text-sm shadow-sm border border-primary/10">
                        {initials}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                          {fullName || "Sans nom"}
                        </p>
                        <p className="truncate text-xs text-muted-foreground mt-0.5">
                          {jobTitle || "Poste non précisé"}
                        </p>
                        {company && (
                          <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-muted/80 px-2 py-0.5 text-[11px] font-medium text-foreground">
                            <Building2 className="size-3 text-muted-foreground" />
                            {company}
                          </span>
                        )}
                      </div>
                    </button>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className="rounded-full border border-border/60 bg-muted/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {c.type}
                      </span>

                      {/* Pill source */}
                      {sources.map((src) => (
                        <span
                          key={src}
                          className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] text-muted-foreground"
                          title={`Source: ${SOURCE_LABELS[src as keyof typeof SOURCE_LABELS] || src}`}
                        >
                          {src === "phone" && (
                            <Smartphone className="size-3 text-emerald-500" />
                          )}
                          {src === "linkedin" && (
                            <Linkedin className="size-3 text-[#0A66C2]" />
                          )}
                          {src === "opportunity" && (
                            <Briefcase className="size-3 text-primary" />
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Coordonnées rapides */}
                  <div className="mt-3.5 space-y-1.5 text-xs text-muted-foreground">
                    {c.email && (
                      <a
                        href={`mailto:${c.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 truncate hover:text-foreground transition-colors"
                      >
                        <Mail className="size-3.5 text-muted-foreground/80 shrink-0" />
                        <span className="truncate">{c.email}</span>
                      </a>
                    )}
                    {c.telephone && (
                      <a
                        href={`tel:${c.telephone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 truncate hover:text-foreground transition-colors"
                      >
                        <Phone className="size-3.5 text-muted-foreground/80 shrink-0" />
                        <span>{c.telephone}</span>
                      </a>
                    )}
                    {c.linkedin && (
                      <a
                        href={
                          c.linkedin.startsWith("http")
                            ? c.linkedin
                            : `https://${c.linkedin}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 truncate text-[#0A66C2] hover:underline"
                      >
                        <Linkedin className="size-3.5 shrink-0" />
                        <span className="truncate">Profil LinkedIn</span>
                        <ExternalLink className="size-2.5" />
                      </a>
                    )}
                  </div>

                  {/* Opportunités rattachées */}
                  {opps.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
                        <Briefcase className="size-3 text-primary" />
                        {opps.length} opportunité{opps.length > 1 ? "s" : ""}{" "}
                        liée{opps.length > 1 ? "s" : ""} :
                      </p>
                      <div className="space-y-1">
                        {opps.slice(0, 2).map((opp) => (
                          <button
                            key={opp.id}
                            type="button"
                            onClick={() => handleOpenOpportunity(opp.id)}
                            className="w-full flex items-center justify-between gap-2 rounded-lg bg-muted/40 hover:bg-muted/70 px-2 py-1 text-left text-[11px] transition-colors"
                          >
                            <span className="truncate font-medium text-foreground">
                              {opp.poste || "Offre"}
                            </span>
                            <span className="shrink-0 text-[10px] text-primary">
                              {opp.currentStage || opp.statut}
                            </span>
                          </button>
                        ))}
                        {opps.length > 2 && (
                          <button
                            type="button"
                            onClick={() => handleOpenContact(c)}
                            className="text-[10px] text-primary hover:underline block pt-0.5"
                          >
                            +{opps.length - 2} autre(s) opportunité(s)...
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Prochaine action si présente */}
                  {c.prochaineAction && (
                    <div className="mt-3 rounded-lg border border-primary/20 bg-primary/5 p-2 text-[11px] text-primary">
                      <strong className="font-semibold">Action : </strong>
                      {c.prochaineAction}
                      {c.dateProchaineAction
                        ? ` (${c.dateProchaineAction})`
                        : ""}
                    </div>
                  )}
                </div>

                {/* Bas de carte */}
                <div className="mt-4 pt-2 flex items-center justify-between border-t border-border/40 text-xs">
                  <span className="text-[11px] text-muted-foreground">
                    {c.historique?.length || 0} échange
                    {c.historique?.length > 1 ? "s" : ""}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleOpenContact(c)}
                    className="h-7 px-2 text-xs text-primary font-medium hover:underline"
                  >
                    Ouvrir la fiche
                  </Button>
                </div>
              </div>
            );
          })}
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

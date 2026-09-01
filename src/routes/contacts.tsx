import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Loader2, Mail, Phone, Plus, Search, UserRound } from "lucide-react";
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
import { useSession } from "@/hooks/useSession";
import { useProfil } from "@/hooks/useProfil";
import {
  emptyContact,
  loadContactsLocal,
  saveContactsLocal,
  TYPES_CONTACT,
  type Contact,
} from "@/lib/contacts";
import {
  deleteContact,
  fetchContacts,
  upsertContact,
} from "@/lib/contacts-cloud";
import { fetchCandidatures } from "@/lib/candidatures-cloud";
import type { Candidature } from "@/lib/candidatures";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Contacts — NACORA" },
      {
        name: "description",
        content:
          "Gérez vos recruteurs, RH, managers et anciens élèves, suivez vos échanges et rédigez vos relances avec l'IA.",
      },
      { property: "og:title", content: "Contacts — NACORA" },
      {
        property: "og:description",
        content:
          "Carnet de contacts professionnels et relances personnalisées générées par l'IA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ContactsPage,
});

function ContactsPage() {
  const { session, user, loading } = useSession();
  const isCloudUser = Boolean(session?.user?.id);
  const profil = useProfil(user);

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [chargement, setChargement] = useState(false);
  const [recherche, setRecherche] = useState("");
  const [filtreType, setFiltreType] = useState<string>("tous");
  const [ouvert, setOuvert] = useState(false);
  const [courant, setCourant] = useState<Contact>(() => emptyContact());

  useEffect(() => {
    if (!isCloudUser) {
      setContacts(loadContactsLocal());
      return;
    }
    let annule = false;
    setChargement(true);
    void Promise.all([fetchContacts(), fetchCandidatures()])
      .then(([cs, cands]) => {
        if (annule) return;
        setContacts(cs);
        setCandidatures(cands);
      })
      .catch(() => {
        if (!annule) setContacts(loadContactsLocal());
      })
      .finally(() => {
        if (!annule) setChargement(false);
      });
    return () => {
      annule = true;
    };
  }, [isCloudUser]);

  const liste = useMemo(() => {
    const q = recherche.trim().toLowerCase();
    return contacts.filter((c) => {
      const okType = filtreType === "tous" || c.type === filtreType;
      const okQ =
        !q ||
        [c.nom, c.entreprise, c.poste, c.email].some((v) =>
          v.toLowerCase().includes(q),
        );
      return okType && okQ;
    });
  }, [contacts, recherche, filtreType]);

  const ouvrir = (c: Contact) => {
    setCourant(c);
    setOuvert(true);
  };

  const sauver = async (c: Contact) => {
    setContacts((prev) => {
      const existe = prev.some((x) => x.id === c.id);
      const next = existe
        ? prev.map((x) => (x.id === c.id ? c : x))
        : [c, ...prev];
      if (!isCloudUser) saveContactsLocal(next);
      return next;
    });
    setOuvert(false);
    toast.success("Contact enregistré");
    if (isCloudUser && session?.user?.id) {
      try {
        await upsertContact(c, session.user.id);
      } catch {
        // conservé localement
      }
    }
  };

  const supprimer = async (c: Contact) => {
    setContacts((prev) => {
      const next = prev.filter((x) => x.id !== c.id);
      if (!isCloudUser) saveContactsLocal(next);
      return next;
    });
    setOuvert(false);
    toast.success("Contact supprimé");
    if (isCloudUser) {
      try {
        await deleteContact(c.id);
      } catch {
        // conservé localement
      }
    }
  };

  return (
    <AppShell
      eyebrow="Réseau"
      title="Contacts"
      subtitle="Recruteurs, RH, managers, anciens élèves et rencontres d'entretien"
      actions={
        <Button onClick={() => ouvrir(emptyContact())} className="gap-2">
          <Plus className="size-4" /> Nouveau contact
        </Button>
      }
    >
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher un nom, une entreprise…"
            className="pl-9"
          />
        </div>
        <Select value={filtreType} onValueChange={setFiltreType}>
          <SelectTrigger className="sm:w-60">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tous">Tous les types</SelectItem>
            {TYPES_CONTACT.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {!user && !loading ? (
        <p className="rounded-xl border border-border/60 bg-card/60 p-6 text-sm text-muted-foreground">
          Connectez-vous pour créer et synchroniser votre carnet de contacts.
        </p>
      ) : chargement ? (
        <div className="flex items-center gap-2 p-6 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" /> Chargement des contacts…
        </div>
      ) : liste.length === 0 ? (
        <p className="rounded-xl border border-border/60 bg-card/60 p-6 text-sm text-muted-foreground">
          Aucun contact pour l'instant. Ajoutez votre premier recruteur ou
          ancien élève.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {liste.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => ouvrir(c)}
              style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}
              className="pop-in rounded-2xl border border-border/60 bg-card/70 p-4 text-left backdrop-blur-xl transition-colors hover:border-primary/50"
            >
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <UserRound className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">
                    {c.nom || "Sans nom"}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {[c.poste, c.entreprise].filter(Boolean).join(" · ") || "—"}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-border/60 px-2 py-0.5 text-[11px] text-muted-foreground">
                  {c.type}
                </span>
              </div>
              <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                {c.email && (
                  <p className="flex items-center gap-1.5 truncate">
                    <Mail className="size-3.5" /> {c.email}
                  </p>
                )}
                {c.telephone && (
                  <p className="flex items-center gap-1.5 truncate">
                    <Phone className="size-3.5" /> {c.telephone}
                  </p>
                )}
                {c.prochaineAction && (
                  <p className="truncate text-primary">
                    Prochaine action : {c.prochaineAction}
                    {c.dateProchaineAction ? ` (${c.dateProchaineAction})` : ""}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      <ContactSheet
        open={ouvert}
        onOpenChange={setOuvert}
        contact={courant}
        candidatures={candidatures}
        profil={profil}
        onSave={(c) => void sauver(c)}
        onDelete={(c) => void supprimer(c)}
      />
    </AppShell>
  );
}

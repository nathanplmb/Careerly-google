import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Briefcase,
  Building2,
  ChevronRight,
  Linkedin,
  Loader2,
  Mail,
  Phone,
  Search,
  Users,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";

import { Input } from "@/components/ui/input";
import { CenterModal } from "@/components/ui/modal";
import { CandidatureSheet } from "@/components/CandidatureSheet";
import { MatchBadge } from "@/components/MatchBadge";
import { StatutBadge } from "@/components/StatutBadge";
import { useCandidatures } from "@/hooks/useCandidatures";
import { useProfil } from "@/hooks/useProfil";
import { fetchContacts } from "@/lib/contacts-cloud";
import { loadContactsLocal, type Contact } from "@/lib/contacts";
import { STATUTS, type Candidature } from "@/lib/candidatures";

export const Route = createFileRoute("/entreprises")({
  head: () => ({
    meta: [
      { title: "Entreprises — Careerly" },
      {
        name: "description",
        content:
          "Toutes les entreprises que vous ciblez : candidatures, contacts associés, meilleur match IA et avancement.",
      },
      { property: "og:title", content: "Entreprises — Careerly" },
      {
        property: "og:description",
        content:
          "Vue par entreprise de vos candidatures et de vos contacts, avec le meilleur score de match IA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EntreprisesPage,
});

function EntreprisesPage() {
  const { user, authLoading, items, save } = useCandidatures();
  const profil = useProfil(user);
  const [contacts, setContacts] = useState<Contact[]>(() =>
    loadContactsLocal(),
  );
  const [recherche, setRecherche] = useState("");
  const [editing, setEditing] = useState<Candidature | null>(null);
  const [open, setOpen] = useState(false);
  type Groupe = {
    nom: string;
    candidatures: Candidature[];
    contacts: Contact[];
  };
  const [detail, setDetail] = useState<Groupe | null>(null);

  useEffect(() => {
    if (!user?.id) {
      setContacts(loadContactsLocal());
      return;
    }
    void fetchContacts()
      .then(setContacts)
      .catch(() => setContacts(loadContactsLocal()));
  }, [user?.id]);

  const groupes = useMemo(() => {
    const map = new Map<
      string,
      { nom: string; candidatures: Candidature[]; contacts: Contact[] }
    >();
    const cle = (n: string) => n.trim().toLowerCase() || "sans-nom";
    for (const c of items) {
      const k = cle(c.entreprise);
      if (!map.has(k))
        map.set(k, {
          nom: c.entreprise || "Entreprise non renseignée",
          candidatures: [],
          contacts: [],
        });
      map.get(k)!.candidatures.push(c);
    }
    for (const ct of contacts) {
      const k = cle(ct.entreprise);
      if (!map.has(k))
        map.set(k, {
          nom: ct.entreprise || "Entreprise non renseignée",
          candidatures: [],
          contacts: [],
        });
      map.get(k)!.contacts.push(ct);
    }
    const q = recherche.trim().toLowerCase();
    return [...map.values()]
      .filter((g) => !q || g.nom.toLowerCase().includes(q))
      .sort((a, b) => a.nom.localeCompare(b.nom, "fr"));
  }, [items, contacts, recherche]);

  return (
    <AppShell
      eyebrow="Suivi"
      title="Entreprises"
      subtitle={`${groupes.length} entreprise(s) suivie(s)`}
      actions={
        authLoading ? (
          <Loader2 className="size-5 animate-spin opacity-70" />
        ) : null
      }
    >
      <div className="relative mb-5 max-w-md">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          placeholder="Rechercher une entreprise…"
          className="pl-9"
        />
      </div>

      {groupes.length === 0 && (
        <p className="glass-card p-8 text-center text-sm text-muted-foreground">
          Aucune entreprise pour l'instant. Ajoutez une opportunité depuis{" "}
          <Link to="/candidatures" className="text-primary hover:underline">
            vos candidatures
          </Link>
          .
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {groupes.map((g, i) => {
          const meilleur = g.candidatures
            .map((c) => c.match?.global ?? -1)
            .reduce((a, b) => Math.max(a, b), -1);
          const matchTop =
            g.candidatures.find((c) => (c.match?.global ?? -1) === meilleur)
              ?.match ?? null;
          const avancement = g.candidatures.reduce(
            (best, c) =>
              STATUTS.indexOf(c.statut) > STATUTS.indexOf(best)
                ? c.statut
                : best,
            g.candidatures[0]?.statut ?? "Je vais postuler",
          );
          return (
            <button
              key={g.nom + i}
              type="button"
              onClick={() => setDetail(g)}
              className="glass-card pop-in flex min-w-0 flex-col gap-3 p-5 text-left transition hover:border-primary/40 hover:shadow-[0_20px_60px_-30px_rgba(124,92,255,0.7)]"
              style={{ animationDelay: `${Math.min(i, 10) * 45}ms` }}
            >
              <header className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">
                  <Building2 className="size-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="truncate text-[15px] font-semibold">
                    {g.nom}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {g.candidatures.length} candidature(s) · {g.contacts.length}{" "}
                    contact(s)
                  </p>
                </div>
              </header>

              <div className="flex flex-wrap items-center gap-2">
                {g.candidatures.length > 0 && (
                  <StatutBadge statut={avancement} />
                )}
                {matchTop && <MatchBadge match={matchTop} />}
              </div>

              <p className="mt-auto inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                Ouvrir la fiche entreprise <ChevronRight className="size-3.5" />
              </p>
            </button>
          );
        })}
      </div>

      <CenterModal
        open={!!detail}
        onOpenChange={(o) => !o && setDetail(null)}
        size="xl"
        title={detail?.nom ?? ""}
        description={
          detail
            ? `${detail.candidatures.length} candidature(s) · ${detail.contacts.length} contact(s)`
            : undefined
        }
      >
        {detail && (
          <div className="grid gap-5">
            <section>
              <h3 className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                <Briefcase className="size-3.5" /> Candidatures
              </h3>
              {detail.candidatures.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Aucune candidature pour cette entreprise.
                </p>
              )}
              <ul className="grid gap-2">
                {detail.candidatures.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(c);
                        setOpen(true);
                        setDetail(null);
                      }}
                      className="flex w-full flex-wrap items-center justify-between gap-2 rounded-2xl border border-border/60 bg-card/40 px-3.5 py-3 text-left transition hover:border-primary/40"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">
                          {c.poste || "Poste non renseigné"}
                        </span>
                        {c.lieu && (
                          <span className="block text-xs text-muted-foreground">
                            {c.lieu}
                          </span>
                        )}
                      </span>
                      <span className="flex items-center gap-2">
                        <StatutBadge statut={c.statut} />
                        {c.match && <MatchBadge match={c.match} />}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <div className="mb-2 flex items-center justify-between gap-3">
                <h3 className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  <Users className="size-3.5" /> Contacts
                </h3>
                <Link
                  to="/contacts"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Gérer les contacts
                </Link>
              </div>
              {detail.contacts.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Aucun contact enregistré pour cette entreprise.
                </p>
              )}
              <ul className="grid gap-2 sm:grid-cols-2">
                {detail.contacts.map((ct) => (
                  <li
                    key={ct.id}
                    className="rounded-2xl border border-border/60 bg-card/40 p-3.5"
                  >
                    <p className="truncate text-sm font-medium">{ct.nom}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {[ct.poste, ct.type].filter(Boolean).join(" · ")}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs">
                      {ct.email && (
                        <a
                          href={`mailto:${ct.email}`}
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          <Mail className="size-3.5" /> Écrire
                        </a>
                      )}
                      {ct.telephone && (
                        <a
                          href={`tel:${ct.telephone}`}
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          <Phone className="size-3.5" /> Appeler
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
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          <Linkedin className="size-3.5" /> LinkedIn
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </CenterModal>

      <CandidatureSheet
        open={open}
        onOpenChange={setOpen}
        value={editing}
        profil={profil}
        onSave={async (c) => {
          await save(c);
          setOpen(false);
        }}
      />
    </AppShell>
  );
}

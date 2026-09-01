import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowDownUp,
  CloudOff,
  Download,
  Loader2,
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CandidatureSheet } from "@/components/CandidatureSheet";
import { ImportIaDialog } from "@/components/ImportIaDialog";

import { CandidatureCard } from "@/components/CandidatureCard";
import { useCandidatures } from "@/hooks/useCandidatures";
import { useProfil } from "@/hooks/useProfil";
import { matchObsolete, niveauMatch } from "@/lib/matching";
import { lancerAnalyse, offreAnalysable } from "@/lib/match-run";
import { texteErreurIA } from "@/lib/ai-erreurs";
import {
  addDays,
  emptyCandidature,
  STATUTS,
  toCsv,
  todayIso,
  type Candidature,
  type Statut,
} from "@/lib/candidatures";

type SortKey =
  | "entreprise"
  | "poste"
  | "statut"
  | "lieu"
  | "dateEnvoi"
  | "dateRelance"
  | "dateDernierContact"
  | "dateLimite"
  | "match";

type Recherche = { statut?: string | undefined; vue?: string | undefined };

export const Route = createFileRoute("/candidatures")({
  validateSearch: (s: Record<string, unknown>): Recherche => ({
    statut:
      typeof s["statut"] === "string" ? (s["statut"] as string) : undefined,
    vue: typeof s["vue"] === "string" ? (s["vue"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Mes candidatures — NACORA" },
      {
        name: "description",
        content:
          "Toutes vos candidatures dans un tableau filtrable et triable : statut, relances, deadlines et match IA.",
      },
      { property: "og:title", content: "Mes candidatures — NACORA" },
      {
        property: "og:description",
        content:
          "Filtrez, triez et mettez à jour vos candidatures en un clic avec NACORA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CandidaturesPage,
});

function CandidaturesPage() {
  const recherche = Route.useSearch();
  const { user, authLoading, items, setItems, syncing, patch, remove, save } =
    useCandidatures();
  const profil = useProfil(user);

  const [search, setSearch] = useState("");
  const [filtre, setFiltre] = useState(recherche.statut ?? "tous");
  const [vue, setVue] = useState(recherche.vue ?? "toutes");
  const [filtreLieu, setFiltreLieu] = useState("tous");
  const [filtreMatch, setFiltreMatch] = useState("tous");
  const [analyseId, setAnalyseId] = useState<string | null>(null);
  const [majMatchs, setMajMatchs] = useState<{
    fait: number;
    total: number;
  } | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("dateEnvoi");
  const [sortAsc, setSortAsc] = useState(false);
  const [editing, setEditing] = useState<Candidature | null>(null);
  const [open, setOpen] = useState(false);
  const [iaOpen, setIaOpen] = useState(false);

  const today = todayIso();

  const lieux = useMemo(
    () => Array.from(new Set(items.map((c) => c.lieu).filter(Boolean))).sort(),
    [items],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = items.filter((c) => {
      const okStatut = filtre === "tous" || c.statut === filtre;
      const okLieu = filtreLieu === "tous" || c.lieu === filtreLieu;
      const okSearch =
        !q ||
        [c.entreprise, c.poste, c.lieu, c.contact, c.commentaire]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const score = c.match?.global;
      const okMatch =
        filtreMatch === "tous" ||
        (filtreMatch === "aucun"
          ? typeof score !== "number"
          : typeof score === "number" &&
            niveauMatch(score).cle === filtreMatch);
      const okVue =
        vue === "toutes" ||
        (vue === "relances"
          ? !!c.dateRelance &&
            c.dateRelance <= today &&
            c.statut === "J'ai postulé"
          : vue === "deadlines"
            ? !!c.dateLimite &&
              c.dateLimite >= today &&
              c.dateLimite <= addDays(today, 7)
            : true);
      return okStatut && okLieu && okSearch && okMatch && okVue;
    });

    const dir = sortAsc ? 1 : -1;
    return [...list].sort((a, b) => {
      if (sortKey === "statut")
        return (STATUTS.indexOf(a.statut) - STATUTS.indexOf(b.statut)) * dir;
      if (sortKey === "match")
        return ((a.match?.global ?? -1) - (b.match?.global ?? -1)) * dir;
      const av = (a[sortKey] as string) ?? "";
      const bv = (b[sortKey] as string) ?? "";
      if (!av && bv) return 1;
      if (av && !bv) return -1;
      return av.localeCompare(bv, "fr", { numeric: true }) * dir;
    });
  }, [
    items,
    search,
    filtre,
    filtreLieu,
    filtreMatch,
    vue,
    today,
    sortKey,
    sortAsc,
  ]);

  const TRIS: { cle: SortKey; libelle: string; asc: boolean }[] = [
    { cle: "dateEnvoi", libelle: "Plus récentes", asc: false },
    { cle: "dateEnvoi", libelle: "Plus anciennes", asc: true },
    { cle: "dateLimite", libelle: "Date limite proche", asc: true },
    { cle: "match", libelle: "Meilleur match IA", asc: false },
    { cle: "entreprise", libelle: "Entreprise (A→Z)", asc: true },
    { cle: "poste", libelle: "Poste (A→Z)", asc: true },
    { cle: "statut", libelle: "État d'avancement", asc: true },
    { cle: "dateRelance", libelle: "Relance la plus urgente", asc: true },
  ];
  const triValeur = `${sortKey}:${sortAsc ? "asc" : "desc"}`;

  const marquerPostule = (c: Candidature) =>
    patch(c.id, {
      statut: "J'ai postulé",
      dateEnvoi: today,
      dateRelance: addDays(today, 10),
      dateDernierContact: today,
    });

  const marquerRelance = (c: Candidature) =>
    patch(c.id, {
      statut: "J'ai relancé",
      dateRelance: c.dateRelance || today,
      dateDernierContact: today,
    });

  const analyserLigne = async (c: Candidature) => {
    if (!profil) {
      toast.error("Complétez d'abord votre profil pour lancer l'analyse.");
      return;
    }
    if (!offreAnalysable(c)) {
      toast.error("Ajoutez le détail de l'offre avant de lancer l'analyse.");
      return;
    }
    setAnalyseId(c.id);
    try {
      const match = await lancerAnalyse(c, profil);
      patch(c.id, { match });
      toast.success(`Analyse terminée : ${match.global} / 100`);
    } catch (e) {
      toast.error(texteErreurIA(e));
    } finally {
      setAnalyseId(null);
    }
  };

  const rafraichirMatchs = async () => {
    if (!profil || majMatchs) return;
    const cibles = items.filter(
      (c) => offreAnalysable(c) && (!c.match || matchObsolete(c, profil)),
    );
    if (cibles.length === 0) {
      toast.info("Tous les matchs IA sont à jour.");
      return;
    }
    setMajMatchs({ fait: 0, total: cibles.length });
    let erreurs = 0;
    let messageErreur = "";
    for (const [i, c] of cibles.entries()) {
      try {
        const match = await lancerAnalyse(c, profil);
        patch(c.id, { match });
      } catch (e) {
        erreurs += 1;
        messageErreur = texteErreurIA(e);
        if (
          /crédit|quota|limite|connectez-vous|indisponible|désactiv/i.test(
            messageErreur,
          )
        ) {
          setMajMatchs({ fait: i + 1, total: cibles.length });
          break;
        }
      }
      setMajMatchs({ fait: i + 1, total: cibles.length });
    }
    setMajMatchs(null);
    const ok = cibles.length - erreurs;
    if (erreurs && ok === 0)
      toast.error(messageErreur || "Mise à jour des matchs IA impossible.");
    else if (erreurs)
      toast.warning(`${ok} match(s) mis à jour, ${erreurs} en échec.`);
    else toast.success(`${ok} match(s) IA mis à jour.`);
  };

  const exportCsv = () => {
    const blob = new Blob(["\ufeff" + toCsv(items)], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "careerly-candidatures.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell
      eyebrow="Suivi"
      title="Mes candidatures"
      subtitle={`${items.length} opportunité(s) suivie(s)`}
      searchValue={search}
      onSearch={setSearch}
      onAdd={() => {
        setEditing(emptyCandidature());
        setOpen(true);
      }}
      actions={
        authLoading ? (
          <Loader2 className="size-5 animate-spin opacity-70" />
        ) : null
      }
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="relative flex-1 sm:min-w-56">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher une entreprise, un poste, une ville…"
            className="pl-9"
          />
        </div>
        <Select value={filtre} onValueChange={setFiltre}>
          <SelectTrigger className="sm:w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tous">Tous les statuts</SelectItem>
            {STATUTS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filtreLieu} onValueChange={setFiltreLieu}>
          <SelectTrigger className="sm:w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tous">Tous les lieux</SelectItem>
            {lieux.map((l) => (
              <SelectItem key={l} value={l}>
                {l}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filtreMatch} onValueChange={setFiltreMatch}>
          <SelectTrigger className="sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tous">Tous les matchs</SelectItem>
            <SelectItem value="excellent">Excellent match</SelectItem>
            <SelectItem value="tres-bon">Très bon match</SelectItem>
            <SelectItem value="interessant">Match intéressant</SelectItem>
            <SelectItem value="faible">Match faible</SelectItem>
            <SelectItem value="aucun">Non analysé</SelectItem>
          </SelectContent>
        </Select>
        <Select value={vue} onValueChange={setVue}>
          <SelectTrigger className="sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="toutes">Toutes les candidatures</SelectItem>
            <SelectItem value="relances">Relances à faire</SelectItem>
            <SelectItem value="deadlines">Deadlines &lt; 7 jours</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={triValeur}
          onValueChange={(v) => {
            const [k, sens] = v.split(":");
            setSortKey(k as SortKey);
            setSortAsc(sens === "asc");
          }}
        >
          <SelectTrigger className="sm:w-56">
            <ArrowDownUp className="size-4 shrink-0 opacity-70" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TRIS.map((t) => (
              <SelectItem
                key={t.libelle}
                value={`${t.cle}:${t.asc ? "asc" : "desc"}`}
              >
                {t.libelle}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="ghost"
          onClick={() => {
            setSearch("");
            setFiltre("tous");
            setFiltreLieu("tous");
            setFiltreMatch("tous");
            setVue("toutes");
            setSortKey("dateEnvoi");
            setSortAsc(false);
          }}
        >
          <RotateCcw /> Réinitialiser
        </Button>
        <Button variant="secondary" onClick={() => setIaOpen(true)}>
          <Sparkles /> Analyser une offre (IA)
        </Button>
        <Button
          variant="secondary"
          disabled={!!majMatchs || !profil}
          onClick={() => void rafraichirMatchs()}
        >
          {majMatchs ? (
            <>
              <Loader2 className="animate-spin" /> Matchs IA {majMatchs.fait}/
              {majMatchs.total}
            </>
          ) : (
            <>
              <RefreshCw /> Actualiser les matchs IA
            </>
          )}
        </Button>
        <Button variant="outline" onClick={exportCsv}>
          <Download /> Export CSV
        </Button>
        <Button
          onClick={() => {
            setEditing(emptyCandidature());
            setOpen(true);
          }}
          className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold"
        >
          <Plus className="size-4" /> Ajouter
        </Button>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {filtered.length} candidature(s) affichée(s) sur {items.length}
        </p>

        {items.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (
                window.confirm(
                  "Êtes-vous sûr de vouloir supprimer TOUTES vos candidatures ? Cette action est irréversible.",
                )
              ) {
                items.forEach((c) => remove(c.id));
                toast.success("Toutes les candidatures ont été supprimées.");
              }
            }}
            className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive"
          >
            Tout effacer
          </Button>
        )}
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((c, i) => (
          <CandidatureCard
            key={c.id}
            c={c}
            index={i}
            profil={profil}
            analyse={analyseId === c.id}
            onStatut={(s) => patch(c.id, { statut: s })}
            onOuvrir={() => {
              setEditing(c);
              setOpen(true);
            }}
            onPostuler={() => marquerPostule(c)}
            onRelancer={() => marquerRelance(c)}
            onAnalyser={() => void analyserLigne(c)}
            onSupprimer={() => remove(c.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass-card mt-3 space-y-4 p-10 text-center text-sm text-muted-foreground">
          {items.length === 0 ? (
            <div className="mx-auto max-w-md space-y-3">
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-purple-500/10 text-xl font-bold text-purple-400">
                🎯
              </div>
              <h3 className="text-base font-bold text-foreground">
                Aucune candidature pour le moment
              </h3>
              <p className="text-xs text-muted-foreground">
                Votre tableau de bord est prêt. Ajoutez votre première offre ou
                importez une fiche de poste via l'assistant IA.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <Button
                  onClick={() => {
                    setEditing(emptyCandidature());
                    setOpen(true);
                  }}
                  className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-xs font-semibold text-white"
                >
                  <Plus className="size-4" /> Ajouter une candidature
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIaOpen(true)}
                  className="gap-1.5 border-purple-500/30 text-xs text-purple-300"
                >
                  <Sparkles className="size-3.5" /> Analyser une offre (IA)
                </Button>
              </div>
            </div>
          ) : (
            "Aucune candidature ne correspond à vos filtres actuels."
          )}
        </div>
      )}

      <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
        {syncing ? (
          <>
            <Loader2 className="size-3.5 animate-spin" /> Synchronisation en
            cours…
          </>
        ) : user ? (
          <>
            Vos candidatures sont synchronisées sur votre compte {user.email}.
          </>
        ) : (
          <>
            <CloudOff className="size-3.5" /> Données enregistrées uniquement
            dans ce navigateur —{" "}
            <Link to="/auth" className="text-primary hover:underline">
              créez un compte
            </Link>{" "}
            pour y accéder partout.
          </>
        )}
      </p>

      <ImportIaDialog
        open={iaOpen}
        onOpenChange={setIaOpen}
        onResult={(c) => {
          setEditing(c);
          setOpen(true);
        }}
      />

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

import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  CalendarDays,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  Linkedin,
  Loader2,
  Mail,
  Upload,
  Users,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCandidatures } from "@/hooks/useCandidatures";
import { useSession } from "@/hooks/useSession";
import { fetchContacts, upsertContact } from "@/lib/contacts-cloud";
import {
  CHAMPS_CANDIDATURE,
  CHAMPS_CONTACT,
  cleDoublonCandidature,
  cleDoublonContact,
  ligneVersCandidature,
  ligneVersContact,
  lireTableur,
  mappingAutoCandidature,
  mappingAutoContact,
  TYPES_TABLEUR,
  type Mapping,
  type Tableau,
} from "@/lib/import-tableur";
import { extraireTexteFichier, TYPES_ACCEPTES } from "@/lib/cv-fichier";
import {
  construireIcs,
  evenementsDepuisCandidatures,
  telechargerIcs,
} from "@/lib/agenda-ics";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/import")({
  head: () => ({
    meta: [
      { title: "Importer vos données — NACORA" },
      {
        name: "description",
        content:
          "Importez votre tableau Excel de recherche de stage, vos contacts LinkedIn, vos lettres de motivation et synchronisez vos échéances avec votre calendrier.",
      },
      { property: "og:title", content: "Importer vos données — NACORA" },
      {
        property: "og:description",
        content:
          "Reprenez votre suivi là où vous en étiez : Excel, CSV, contacts LinkedIn, lettres de motivation et calendrier.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ImportPage,
});

const CLE_LETTRES = "careerly.lettres";

function ImportPage() {
  const { user } = useSession();
  const { items, save } = useCandidatures();

  return (
    <AppShell
      eyebrow="Reprise de données"
      title="Importer vos données"
      subtitle="Excel, CSV, contacts LinkedIn, lettres de motivation, calendrier : rien ne repart de zéro."
    >
      <Tabs defaultValue="tableur" className="w-full">
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <TabsList className="w-max">
            <TabsTrigger value="tableur" className="gap-1.5">
              <FileSpreadsheet className="size-4" /> Tableau
            </TabsTrigger>
            <TabsTrigger value="contacts" className="gap-1.5">
              <Users className="size-4" /> Contacts
            </TabsTrigger>
            <TabsTrigger value="lettres" className="gap-1.5">
              <FileText className="size-4" /> Lettres
            </TabsTrigger>
            <TabsTrigger value="calendrier" className="gap-1.5">
              <CalendarDays className="size-4" /> Calendrier
            </TabsTrigger>
            <TabsTrigger value="comptes" className="gap-1.5">
              <Linkedin className="size-4" /> LinkedIn & mails
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="tableur" className="mt-4">
          <ImportTableur
            titre="Votre tableau de suivi"
            description="Reprenez le fichier Excel ou Google Sheets que vous utilisiez avant Careerly. Les colonnes sont reconnues automatiquement, vous pouvez les corriger."
            champs={CHAMPS_CANDIDATURE.map((c) => ({ ...c }))}
            mappingAuto={mappingAutoCandidature}
            apercu={(l, m) => {
              const c = ligneVersCandidature(l, m);
              return c
                ? [c.entreprise, c.poste, c.statut, c.dateEnvoi || "—"]
                : null;
            }}
            colonnesApercu={["Entreprise", "Poste", "Statut", "Candidature"]}
            onImport={async (lignes, mapping, ignoreDoublons, onProgress) => {
              const existantes = new Set(items.map(cleDoublonCandidature));
              let ok = 0;
              let ignores = 0;
              for (let i = 0; i < lignes.length; i++) {
                const c = ligneVersCandidature(lignes[i]!, mapping);
                if (!c) continue;
                const cle = cleDoublonCandidature(c);
                if (ignoreDoublons && existantes.has(cle)) {
                  ignores++;
                } else {
                  existantes.add(cle);
                  await save(c);
                  ok++;
                }
                onProgress(i + 1);
              }
              return { ok, ignores };
            }}
            libelleObjet="candidature"
          />
        </TabsContent>

        <TabsContent value="contacts" className="mt-4">
          {!user ? (
            <p className="glass-card p-5 text-sm text-muted-foreground">
              Connectez-vous pour importer votre carnet de contacts : il est
              enregistré sur votre compte pour être disponible sur tous vos
              appareils.
            </p>
          ) : (
            <ImportTableur
              titre="Votre liste de contacts"
              description="Compatible avec l'export LinkedIn (Connections.csv), un export Google Contacts ou votre propre tableau."
              champs={CHAMPS_CONTACT.map((c) => ({ ...c }))}
              mappingAuto={mappingAutoContact}
              apercu={(l, m) => {
                const c = ligneVersContact(l, m);
                return c
                  ? [c.nom, c.entreprise, c.poste, c.email || "—"]
                  : null;
              }}
              colonnesApercu={["Nom", "Entreprise", "Poste", "Email"]}
              onImport={async (lignes, mapping, ignoreDoublons, onProgress) => {
                const existants = new Set(
                  (await fetchContacts()).map(cleDoublonContact),
                );
                let ok = 0;
                let ignores = 0;
                for (let i = 0; i < lignes.length; i++) {
                  const c = ligneVersContact(lignes[i]!, mapping);
                  if (!c) continue;
                  const cle = cleDoublonContact(c);
                  if (ignoreDoublons && existants.has(cle)) {
                    ignores++;
                  } else {
                    existants.add(cle);
                    await upsertContact(c, user.id);
                    ok++;
                  }
                  onProgress(i + 1);
                }
                return { ok, ignores };
              }}
              libelleObjet="contact"
            />
          )}
        </TabsContent>

        <TabsContent value="lettres" className="mt-4">
          <ImportLettres />
        </TabsContent>

        <TabsContent value="calendrier" className="mt-4">
          <ExportCalendrier
            nb={evenementsDepuisCandidatures(items).length}
            onExport={() => {
              const evts = evenementsDepuisCandidatures(items);
              if (evts.length === 0) {
                toast.error("Aucune échéance à exporter pour le moment.");
                return;
              }
              telechargerIcs(construireIcs(evts));
              toast.success(`${evts.length} échéance(s) exportée(s).`);
            }}
          />
        </TabsContent>

        <TabsContent value="comptes" className="mt-4">
          <GuidesComptes />
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

/* ------------------------------ Import tableur ----------------------------- */

type Champ = { cle: string; label: string; requis: boolean };

function ImportTableur({
  titre,
  description,
  champs,
  mappingAuto,
  apercu,
  colonnesApercu,
  onImport,
  libelleObjet,
}: {
  titre: string;
  description: string;
  champs: Champ[];
  mappingAuto: (colonnes: string[]) => Mapping;
  apercu: (ligne: Record<string, string>, mapping: Mapping) => string[] | null;
  colonnesApercu: string[];
  onImport: (
    lignes: Record<string, string>[],
    mapping: Mapping,
    ignoreDoublons: boolean,
    onProgress: (n: number) => void,
  ) => Promise<{ ok: number; ignores: number }>;
  libelleObjet: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fichier, setFichier] = useState<File | null>(null);
  const [tableau, setTableau] = useState<Tableau | null>(null);
  const [mapping, setMapping] = useState<Mapping>({});
  const [lecture, setLecture] = useState(false);
  const [envoi, setEnvoi] = useState(false);
  const [progres, setProgres] = useState(0);
  const [ignoreDoublons, setIgnoreDoublons] = useState(true);
  const [fait, setFait] = useState<{ ok: number; ignores: number } | null>(
    null,
  );

  const charger = async (file: File, feuille?: string) => {
    setLecture(true);
    setFait(null);
    try {
      const t = await lireTableur(file, feuille);
      setTableau(t);
      setMapping(mappingAuto(t.colonnes));
      setFichier(file);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Lecture impossible");
      setTableau(null);
    } finally {
      setLecture(false);
    }
  };

  const lignesApercu = useMemo(() => {
    if (!tableau) return [];
    return tableau.lignes.slice(0, 5).map((l) => apercu(l, mapping));
  }, [tableau, mapping, apercu]);

  const manquant = champs.find((c) => c.requis && !mapping[c.cle]);

  const lancer = async () => {
    if (!tableau) return;
    setEnvoi(true);
    setProgres(0);
    try {
      const r = await onImport(
        tableau.lignes,
        mapping,
        ignoreDoublons,
        setProgres,
      );
      setFait(r);
      toast.success(`${r.ok} ${libelleObjet}(s) importé(s).`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Import impossible");
    } finally {
      setEnvoi(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="glass-card p-5">
        <h2 className="text-sm font-semibold">{titre}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>

        <input
          ref={inputRef}
          type="file"
          accept={TYPES_TABLEUR}
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void charger(f);
            e.target.value = "";
          }}
        />
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button onClick={() => inputRef.current?.click()} disabled={lecture}>
            {lecture ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Upload className="size-4" />
            )}
            Choisir un fichier
          </Button>
          <span className="min-w-0 truncate text-xs text-muted-foreground">
            {fichier
              ? fichier.name
              : "Excel (.xlsx, .xls), CSV, TSV ou OpenDocument"}
          </span>
        </div>
      </div>

      {tableau && (
        <>
          {tableau.feuilles.length > 1 && (
            <div className="glass-card flex flex-wrap items-center gap-3 p-4">
              <span className="text-sm text-muted-foreground">
                Feuille à importer
              </span>
              <Select
                value={tableau.feuille}
                onValueChange={(v) => fichier && void charger(fichier, v)}
              >
                <SelectTrigger className="w-56">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tableau.feuilles.map((f) => (
                    <SelectItem key={f} value={f}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold">
              Correspondance des colonnes
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {tableau.lignes.length} ligne(s) détectée(s). Vérifiez que chaque
              champ pointe vers la bonne colonne de votre fichier.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {champs.map((c) => (
                <div key={c.cle} className="min-w-0">
                  <label className="text-xs font-medium text-muted-foreground">
                    {c.label}
                    {c.requis && <span className="text-primary"> *</span>}
                  </label>
                  <Select
                    value={mapping[c.cle] ?? "__aucune"}
                    onValueChange={(v) =>
                      setMapping((m) => ({
                        ...m,
                        [c.cle]: v === "__aucune" ? undefined : v,
                      }))
                    }
                  >
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue placeholder="Aucune" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__aucune">Aucune</SelectItem>
                      {tableau.colonnes.map((col) => (
                        <SelectItem key={col} value={col}>
                          {col}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold">Aperçu</h3>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    {colonnesApercu.map((c) => (
                      <th key={c} className="pb-2 pr-3 font-semibold">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lignesApercu.map((l, i) => (
                    <tr key={i} className="border-t border-border/50">
                      {(l ?? ["—", "—", "—", "—"]).map((v, j) => (
                        <td key={j} className="py-2 pr-3">
                          {v || "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <label className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={ignoreDoublons}
                onChange={(e) => setIgnoreDoublons(e.target.checked)}
                className="size-4 accent-[var(--color-primary)]"
              />
              Ignorer les doublons déjà présents dans Careerly
            </label>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button
                onClick={() => void lancer()}
                disabled={envoi || !!manquant}
              >
                {envoi ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Upload className="size-4" />
                )}
                Importer {tableau.lignes.length} ligne(s)
              </Button>
              {manquant && (
                <span className="text-xs text-destructive">
                  Choisissez une colonne pour « {manquant.label} ».
                </span>
              )}
              {envoi && (
                <span className="text-xs text-muted-foreground">
                  {progres}/{tableau.lignes.length}
                </span>
              )}
            </div>

            {fait && (
              <p className="mt-3 flex items-center gap-2 text-sm text-primary">
                <CheckCircle2 className="size-4" />
                {fait.ok} {libelleObjet}(s) importé(s)
                {fait.ignores > 0 && ` · ${fait.ignores} doublon(s) ignoré(s)`}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------ Import lettres ----------------------------- */

type Lettre = {
  id: string;
  titre: string;
  objet: string;
  contenu: string;
  conseils: string[];
  creeLe: string;
};

function ImportLettres() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [charge, setCharge] = useState(false);
  const [ajoutees, setAjoutees] = useState<string[]>([]);

  const importer = async (files: FileList) => {
    setCharge(true);
    const noms: string[] = [];
    try {
      const brut = window.localStorage.getItem(CLE_LETTRES);
      const existantes: Lettre[] = brut ? (JSON.parse(brut) as Lettre[]) : [];
      const nouvelles: Lettre[] = [];
      for (const f of Array.from(files)) {
        try {
          const texte = await extraireTexteFichier(f);
          nouvelles.push({
            id: crypto.randomUUID(),
            titre: f.name.replace(/\.[^.]+$/, ""),
            objet: "Lettre importée",
            contenu: texte,
            conseils: [],
            creeLe: new Date().toISOString(),
          });
          noms.push(f.name);
        } catch (e) {
          toast.error(
            `${f.name} : ${e instanceof Error ? e.message : "lecture impossible"}`,
          );
        }
      }
      if (nouvelles.length > 0) {
        window.localStorage.setItem(
          CLE_LETTRES,
          JSON.stringify([...nouvelles, ...existantes]),
        );
        setAjoutees(noms);
        toast.success(
          `${nouvelles.length} document(s) ajouté(s) à vos lettres.`,
        );
      }
    } finally {
      setCharge(false);
    }
  };

  return (
    <div className="glass-card p-5">
      <h2 className="text-sm font-semibold">
        Vos lettres de motivation existantes
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Importez vos lettres déjà rédigées (PDF, DOCX, TXT, Markdown, RTF).
        Elles rejoignent la page Documents et servent de base à l'IA pour vos
        prochaines lettres.
      </p>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={TYPES_ACCEPTES}
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) void importer(e.target.files);
          e.target.value = "";
        }}
      />
      <Button
        className="mt-4"
        onClick={() => inputRef.current?.click()}
        disabled={charge}
      >
        {charge ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Upload className="size-4" />
        )}
        Importer des lettres
      </Button>
      {ajoutees.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
          {ajoutees.map((n) => (
            <li key={n} className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary" /> {n}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        Pour votre CV, utilisez le CV Analyzer depuis la page Profil : il
        remplit automatiquement vos compétences et expériences.
      </p>
    </div>
  );
}

/* ---------------------------- Export calendrier ---------------------------- */

function ExportCalendrier({
  nb,
  onExport,
}: {
  nb: number;
  onExport: () => void;
}) {
  return (
    <div className="glass-card p-5">
      <h2 className="text-sm font-semibold">Vos échéances dans votre agenda</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Careerly génère un fichier .ics contenant vos dates limites, relances et
        entretiens ({nb} échéance(s)). Il s'ouvre dans Google Agenda, Apple
        Calendrier ou Outlook.
      </p>
      <Button className="mt-4" onClick={onExport}>
        <CalendarDays className="size-4" /> Télécharger mon calendrier (.ics)
      </Button>
      <ol className="mt-4 space-y-1.5 text-sm text-muted-foreground">
        <li>1. Téléchargez le fichier .ics.</li>
        <li>
          2. Google Agenda : Paramètres → Importer et exporter → Importer, puis
          sélectionnez le fichier.
        </li>
        <li>3. iPhone / Mac : ouvrez le fichier, il s'ajoute à Calendrier.</li>
        <li>4. Relancez l'export après avoir ajouté de nouvelles offres.</li>
      </ol>
    </div>
  );
}

/* ------------------------------ Guides comptes ----------------------------- */

function GuidesComptes() {
  return (
    <div className="grid gap-4 [&>*]:min-w-0 lg:grid-cols-2">
      <Guide
        icon={Linkedin}
        titre="LinkedIn"
        etapes={[
          "Sur LinkedIn : Moi → Préférences et confidentialité → Obtenir une copie de vos données.",
          "Cochez « Connections » (contacts) et « Job Applications » (candidatures envoyées).",
          "LinkedIn envoie un .zip par email en quelques minutes.",
          "Revenez ici : Connections.csv dans l'onglet Contacts, Job Applications.csv dans l'onglet Tableau.",
        ]}
        lien={{
          href: "https://www.linkedin.com/mypreferences/d/download-my-data",
          label: "Ouvrir l'export LinkedIn",
        }}
      />
      <Guide
        icon={Mail}
        titre="Emails"
        etapes={[
          "Careerly ne lit pas votre boîte mail : vos messages restent chez votre fournisseur.",
          "Collez le contenu d'un email de recruteur dans la fiche candidature (onglet Détail) ou dans l'historique du contact.",
          "L'IA s'appuie ensuite dessus pour rédiger vos relances et préparer vos entretiens.",
          "Un export Google Contacts (.csv) s'importe directement dans l'onglet Contacts.",
        ]}
        lien={{
          href: "https://contacts.google.com/",
          label: "Exporter Google Contacts",
        }}
      />
    </div>
  );
}

function Guide({
  icon: Icon,
  titre,
  etapes,
  lien,
}: {
  icon: typeof Linkedin;
  titre: string;
  etapes: string[];
  lien: { href: string; label: string };
}) {
  return (
    <div className={cn("glass-card p-5")}>
      <div className="flex items-center gap-2">
        <span className="tone-chip size-9 shrink-0">
          <Icon className="size-4" />
        </span>
        <h2 className="text-sm font-semibold">{titre}</h2>
      </div>
      <ol className="mt-3 space-y-1.5 text-sm text-muted-foreground">
        {etapes.map((e, i) => (
          <li key={i}>
            {i + 1}. {e}
          </li>
        ))}
      </ol>
      <Button variant="outline" className="mt-4" asChild>
        <a href={lien.href} target="_blank" rel="noreferrer">
          {lien.label}
        </a>
      </Button>
    </div>
  );
}

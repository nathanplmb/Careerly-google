import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  Loader2,
  RefreshCw,
  Sparkles,
  TriangleAlert,
  Upload,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { analyserCv } from "@/lib/cv.functions";
import { extraireTexteFichier, TYPES_ACCEPTES } from "@/lib/cv-fichier";
import {
  hashTexte,
  labelPriorite,
  MENTION_CV,
  niveauCV,
  type AnalyseCV,
  type CvEtat,
} from "@/lib/cv";
import { texteErreurIA } from "@/lib/ai-erreurs";
import { profilEnTexte } from "@/lib/match-run";
import type { Profil } from "@/lib/profil";
import { normaliserCvStructure, type CvStructure } from "@/lib/cv-structure";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  profil: Profil;
  cv: CvEtat | null;
  onSaveCv: (cv: CvEtat) => void;
  onAppliquerProfil: (patch: Partial<Profil>) => void;
};

const CHAMPS: {
  cle: keyof Profil;
  label: string;
  source: keyof AnalyseCV["profilDetecte"];
}[] = [
  { cle: "competences", label: "Compétences", source: "competences" },
  { cle: "logiciels", label: "Logiciels / outils", source: "logiciels" },
  { cle: "langues", label: "Langues", source: "langues" },
  { cle: "niveauAnglais", label: "Niveau d'anglais", source: "niveauAnglais" },
  { cle: "experiences", label: "Expériences", source: "experiences" },
  { cle: "formation", label: "Formation", source: "formation" },
  { cle: "ecole", label: "École", source: "ecole" },
  { cle: "niveau", label: "Niveau", source: "niveau" },
  { cle: "metiers", label: "Métiers visés", source: "metiers" },
  { cle: "domaines", label: "Domaines", source: "domaines" },
  { cle: "localisation", label: "Localisation", source: "localisation" },
];

function videStructure(cv?: CvStructure | null): boolean {
  if (!cv) return true;
  return (
    cv.experiences.length === 0 &&
    cv.formations.length === 0 &&
    cv.competences.length === 0 &&
    cv.certifications.length === 0
  );
}

function structureDetectee(
  brut: Partial<CvStructure> | null | undefined,
): CvStructure | null {
  if (!brut) return null;
  const s = normaliserCvStructure(brut);
  if (videStructure(s) && !s.titre && !s.accroche && s.langues.length === 0)
    return null;
  return s;
}

export function CvAnalyseDialog({
  open,
  onOpenChange,
  profil,
  cv,
  onSaveCv,
  onAppliquerProfil,
}: Props) {
  const lancerAnalyseCv = useServerFn(analyserCv);
  const [texte, setTexte] = useState(cv?.texte ?? "");
  const [analyse, setAnalyse] = useState<AnalyseCV | null>(cv?.analyse ?? null);
  const [genereLe, setGenereLe] = useState<string | null>(cv?.genereLe ?? null);
  const [loading, setLoading] = useState(false);
  const [lecture, setLecture] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);
  const [autoRemplis, setAutoRemplis] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const obsolete = Boolean(analyse && cv && hashTexte(texte) !== cv.hash);

  const lireFichier = async (file: File) => {
    setErreur(null);
    setLecture(true);
    try {
      const t = await extraireTexteFichier(file);
      setTexte(t);
    } catch (e) {
      setErreur(
        e instanceof Error ? e.message : "Lecture du fichier impossible.",
      );
    } finally {
      setLecture(false);
    }
  };

  const lancer = async () => {
    if (texte.trim().length < 50) {
      setErreur("Le texte du CV est trop court pour être analysé.");
      return;
    }
    setLoading(true);
    setErreur(null);
    setAutoRemplis([]);
    try {
      const res = await lancerAnalyseCv({
        data: { cv: texte, profil: profilEnTexte(profil) },
      });
      const { modele, ...a } = res as AnalyseCV & { modele?: string };
      const etat: CvEtat = {
        texte,
        analyse: a,
        genereLe: new Date().toISOString(),
        hash: hashTexte(texte),
        modele,
      };
      setAnalyse(a);
      setGenereLe(etat.genereLe);
      onSaveCv(etat);

      // Pré-remplissage automatique : uniquement les champs encore vides du profil.
      const d = a.profilDetecte;
      const patch: Partial<Profil> = {};
      const remplis: string[] = [];
      for (const c of CHAMPS) {
        const valeur = (d?.[c.source] ?? "").trim();
        const actuel = String(profil[c.cle] ?? "").trim();
        if (valeur && !actuel) {
          (patch as Record<string, string>)[c.cle as string] = valeur;
          remplis.push(c.label);
        }
      }
      const structure = structureDetectee(a.cvStructure);
      if (structure && videStructure(profil.cvStructure)) {
        patch.cvStructure = structure;
        remplis.push("CV détaillé (expériences, formations, compétences…)");
      }
      if (remplis.length > 0) {
        setAutoRemplis(remplis);
        onAppliquerProfil(patch);
      }
    } catch (e) {
      setErreur(texteErreurIA(e));
    } finally {
      setLoading(false);
    }
  };

  const detecte = analyse?.profilDetecte;
  const champsDetectes = detecte
    ? CHAMPS.filter((c) => (detecte[c.source] ?? "").trim().length > 0)
    : [];

  const appliquer = () => {
    if (!detecte) return;
    const patch: Partial<Profil> = {};
    for (const c of champsDetectes) {
      (patch as Record<string, string>)[c.cle as string] =
        detecte[c.source].trim();
    }
    const structure = structureDetectee(analyse?.cvStructure);
    const labels = champsDetectes.map((c) => c.label);
    if (structure) {
      patch.cvStructure = structure;
      labels.push("CV détaillé");
    }
    onAppliquerProfil(patch);
    setAutoRemplis(labels);
  };

  const niveau = analyse ? niveauCV(analyse.global) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="size-5 text-primary" /> Analyser mon CV
          </DialogTitle>
          <DialogDescription>
            Déposez votre CV (PDF, .docx, .txt) ou collez son contenu : l'IA le
            note, vous donne des axes d'amélioration et peut pré-remplir votre
            profil.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              const f = e.dataTransfer.files?.[0];
              if (f) void lireFichier(f);
            }}
            className={cn(
              "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition",
              drag ? "border-primary bg-primary/5" : "border-border",
            )}
          >
            {lecture ? (
              <Loader2 className="size-5 animate-spin text-primary" />
            ) : (
              <Upload className="size-5 text-muted-foreground" />
            )}
            <p className="text-sm text-muted-foreground">
              Glissez votre CV ici ou
              <Button
                variant="link"
                className="px-1"
                onClick={() => inputRef.current?.click()}
              >
                choisissez un fichier
              </Button>
            </p>
            <p className="text-xs text-muted-foreground">
              PDF, DOCX, TXT, Markdown ou RTF — 20 Mo maximum.
            </p>
            <input
              ref={inputRef}
              type="file"
              accept={TYPES_ACCEPTES}
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void lireFichier(f);
                e.target.value = "";
              }}
            />
          </div>

          <div className="grid gap-2">
            <Label className="flex items-center gap-2">
              <FileText className="size-4" /> Texte du CV
            </Label>
            <Textarea
              rows={8}
              value={texte}
              onChange={(e) => setTexte(e.target.value)}
              placeholder="Collez ici le contenu de votre CV…"
            />
            <p className="text-xs text-muted-foreground">
              {texte.trim().length} caractères
            </p>
          </div>

          {erreur && (
            <p className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              <TriangleAlert className="mt-0.5 size-4 shrink-0" />
              {erreur}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              {genereLe &&
                `Dernière analyse le ${new Date(genereLe).toLocaleDateString(
                  "fr-FR",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  },
                )}`}
            </p>
            <Button onClick={lancer} disabled={loading || lecture}>
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Analyse en cours…
                </>
              ) : analyse ? (
                <>
                  <RefreshCw className="size-4" /> Ré-analyser
                </>
              ) : (
                <>
                  <Sparkles className="size-4" /> Analyser mon CV
                </>
              )}
            </Button>
          </div>

          {obsolete && (
            <p className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm text-primary">
              <AlertTriangle className="size-4 shrink-0" />
              Le texte a changé depuis la dernière analyse : relancez-la.
            </p>
          )}

          {analyse && niveau && (
            <div className="space-y-5 border-t pt-5">
              <div className="flex flex-wrap items-end gap-4">
                <div>
                  <div className="text-4xl font-semibold text-primary">
                    {analyse.global}
                    <span className="text-lg text-muted-foreground">
                      {" "}
                      / 100
                    </span>
                  </div>
                  <span
                    className={cn(
                      "mt-1 inline-flex rounded-full border px-2 py-0.5 text-xs font-medium",
                      niveau.badge,
                    )}
                  >
                    {niveau.label}
                  </span>
                </div>
                {analyse.resume && (
                  <p className="max-w-md text-sm text-muted-foreground">
                    {analyse.resume}
                  </p>
                )}
              </div>

              {analyse.scores?.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {analyse.scores.map((s, i) => (
                    <div key={i}>
                      <div className="flex items-baseline justify-between text-sm">
                        <span className="font-medium">{s.critere}</span>
                        <span className="text-muted-foreground">
                          {s.score} %
                        </span>
                      </div>
                      <Progress value={s.score} className="mt-1.5 h-1.5" />
                      {s.explication && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {s.explication}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {analyse.pointsForts?.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle2 className="size-4 text-primary" /> Points
                    forts
                  </h4>
                  <ul className="mt-2 space-y-1.5">
                    {analyse.pointsForts.map((p, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary/60" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {analyse.aCorriger?.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-medium">
                    <AlertTriangle className="size-4 text-destructive" /> À
                    améliorer
                  </h4>
                  <ul className="mt-2 space-y-2">
                    {analyse.aCorriger.map((c, i) => (
                      <li key={i} className="rounded-lg border p-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-medium">{c.titre}</span>
                          <span
                            className={cn(
                              "rounded-full border px-2 py-0.5 text-[11px]",
                              c.priorite === "haute"
                                ? "border-destructive/30 bg-destructive/10 text-destructive"
                                : c.priorite === "moyenne"
                                  ? "border-primary/30 bg-primary/10 text-primary"
                                  : "border-border bg-muted text-muted-foreground",
                            )}
                          >
                            {labelPriorite(c.priorite)}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {c.conseil}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {analyse.reformulations?.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium">
                    Reformulations proposées
                  </h4>
                  <ul className="mt-2 space-y-2">
                    {analyse.reformulations.map((r, i) => (
                      <li
                        key={i}
                        className="rounded-lg border bg-muted/40 p-3 text-sm"
                      >
                        <p className="text-muted-foreground line-through">
                          {r.avant}
                        </p>
                        <p className="mt-1 font-medium text-foreground">
                          {r.apres}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {analyse.motsClesManquants?.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Mots-clés manquants
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {analyse.motsClesManquants.map((m, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-destructive/30 bg-destructive/10 px-2 py-0.5 text-xs text-destructive"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {champsDetectes.length > 0 && (
                <div className="rounded-lg border p-3">
                  <h4 className="flex items-center gap-2 text-sm font-medium">
                    <Wand2 className="size-4 text-primary" /> Profil détecté
                  </h4>
                  {autoRemplis.length > 0 && (
                    <p className="mt-1.5 flex items-start gap-2 rounded-md border border-primary/30 bg-primary/10 p-2 text-[11px] text-primary">
                      <CheckCircle2 className="mt-px size-3.5 shrink-0" />
                      Profil complété automatiquement : {autoRemplis.join(", ")}
                      .
                    </p>
                  )}
                  <ul className="mt-2 space-y-1.5">
                    {champsDetectes.map((c) => (
                      <li key={c.cle as string} className="text-xs">
                        <span className="font-medium">{c.label} : </span>
                        <span className="text-muted-foreground">
                          {detecte![c.source]}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-3"
                    onClick={appliquer}
                  >
                    Écraser tout le profil avec le CV
                  </Button>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    Les champs vides ont déjà été remplis automatiquement. Ce
                    bouton remplace aussi les champs que vous aviez saisis.
                  </p>
                </div>
              )}

              <p className="text-xs text-muted-foreground">{MENTION_CV}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

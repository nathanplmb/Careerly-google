import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ExternalLink,
  FileSearch,
  FileText,
  Loader2,
  MapPin,
  Plus,
  Sparkles,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCandidatures } from "@/hooks/useCandidatures";
import { analyserOffre } from "@/lib/offre.functions";
import { extraireTexteFichier } from "@/lib/cv-fichier";
import { texteErreurIA } from "@/lib/ai-erreurs";
import { saveAiHistoryItem, type AiOffreData } from "@/lib/ai-hub";
import type { Candidature } from "@/lib/candidatures";

interface AiOffreStepProps {
  offreData: AiOffreData;
  onChangeOffreData: (data: Partial<AiOffreData>) => void;
  onNextStep: () => void;
}

export function AiOffreStep({
  offreData,
  onChangeOffreData,
  onNextStep,
}: AiOffreStepProps) {
  const { items, save } = useCandidatures();
  const runAnalyse = useServerFn(analyserOffre);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mode, setMode] = useState<"coller" | "existant">("coller");
  const [chargement, setChargement] = useState(false);
  const [sauvegarde, setSauvegarde] = useState(false);
  const [sauvegardee, setSauvegardee] = useState(false);

  const lancerExtraction = async (texteAAnalyser: string) => {
    if (!texteAAnalyser || texteAAnalyser.trim().length < 10) {
      toast.error(
        "Veuillez coller le texte ou lien de l'offre (au moins 10 caractères).",
      );
      return;
    }
    setChargement(true);
    try {
      const res = await runAnalyse({ data: { texte: texteAAnalyser } });
      onChangeOffreData({
        texte: texteAAnalyser,
        entreprise: res.entreprise || "",
        poste: res.poste || "",
        lieu: res.lieu || "",
        lien: res.lien || "",
        dateLimite: res.dateLimite || "",
        missions: res.missions || res.detail || "",
        profilRecherche: res.profilRecherche || "",
        secteur: res.secteur || "",
        priorite: res.priorite || "auto",
        contactRecruteur: res.contact || "",
      });

      saveAiHistoryItem({
        type: "offre",
        titre: res.poste
          ? `${res.poste} @ ${res.entreprise || "Entreprise"}`
          : "Analyse d'offre",
        sousTitre: res.lieu,
        apercu:
          res.missions?.slice(0, 140) ||
          res.detail?.slice(0, 140) ||
          texteAAnalyser.slice(0, 140),
        offreData: {
          entreprise: res.entreprise,
          poste: res.poste,
          lieu: res.lieu,
          missions: res.missions,
          texte: texteAAnalyser,
        },
      });

      toast.success("Offre analysée et structurée avec succès !");
    } catch (e) {
      toast.error(texteErreurIA(e));
    } finally {
      setChargement(false);
    }
  };

  const selectionnerCandidature = (candId: string) => {
    const c = items.find((item) => item.id === candId);
    if (!c) return;
    const texteOffre = [
      c.poste ? `Poste : ${c.poste}` : "",
      c.entreprise ? `Entreprise : ${c.entreprise}` : "",
      c.lieu ? `Lieu : ${c.lieu}` : "",
      c.missions ? `Missions : ${c.missions}` : "",
      c.profilRecherche ? `Profil recherché : ${c.profilRecherche}` : "",
      c.notes ? `Notes : ${c.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    onChangeOffreData({
      texte: texteOffre || `${c.poste} - ${c.entreprise}`,
      entreprise: c.entreprise || "",
      poste: c.poste || "",
      lieu: c.lieu || "",
      lien: c.lienOffre || "",
      dateLimite: c.dateLimite || "",
      missions: c.missions || "",
      profilRecherche: c.profilRecherche || "",
      secteur: c.secteur || "",
      priorite: c.priorite || "auto",
      contactRecruteur: c.contactNom || "",
      candidatureIdLiee: c.id,
    });

    toast.info(`Offre "${c.poste || c.entreprise}" chargée dans le workflow.`);
  };

  const ajouterAuxCandidatures = async () => {
    if (!offreData.entreprise && !offreData.poste) {
      toast.error("Renseignez au moins l'entreprise ou l'intitulé du poste.");
      return;
    }
    setSauvegarde(true);
    try {
      const nouvelle: Candidature = {
        id: crypto.randomUUID(),
        entreprise: offreData.entreprise || "Entreprise",
        poste: offreData.poste || "Poste à préciser",
        statut: "A_POSTULER",
        lieu: offreData.lieu || undefined,
        lienOffre: offreData.lien || undefined,
        dateLimite: offreData.dateLimite || undefined,
        missions: offreData.missions || undefined,
        profilRecherche: offreData.profilRecherche || undefined,
        secteur: offreData.secteur || undefined,
        contactNom: offreData.contactRecruteur || undefined,
        notes: `Importé via Careerly AI Hub le ${new Date().toLocaleDateString("fr-FR")}`,
        creeLe: new Date().toISOString(),
      };
      await save(nouvelle);
      onChangeOffreData({ candidatureIdLiee: nouvelle.id });
      setSauvegardee(true);
      toast.success("Candidature ajoutée à votre tableau de bord !");
    } catch {
      toast.error("Erreur lors de la sauvegarde.");
    } finally {
      setSauvegarde(false);
    }
  };

  const handleFichier = async (f: File) => {
    try {
      const t = await extraireTexteFichier(f);
      onChangeOffreData({ texte: t });
      toast.success("Document de l'offre chargé. Lancement de l'analyse...");
      lancerExtraction(t);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Fichier non lisible.");
    }
  };

  const estPret = Boolean(
    offreData.entreprise || offreData.poste || offreData.texte,
  );

  return (
    <div className="space-y-6">
      {/* Header & Mode selection */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Étape 1 : Analyser & structurer l'opportunité
          </h3>
          <p className="text-xs text-muted-foreground">
            Collez le texte brut de l'annonce ou sélectionnez une de vos
            candidatures existantes.
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-xl border border-border/60 bg-muted/40 p-1">
          <button
            type="button"
            onClick={() => setMode("coller")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              mode === "coller"
                ? "bg-card text-foreground shadow-sm ring-1 ring-border/50"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Coller / Importer
          </button>
          <button
            type="button"
            onClick={() => setMode("existant")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              mode === "existant"
                ? "bg-card text-foreground shadow-sm ring-1 ring-border/50"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Mes candidatures ({items.length})
          </button>
        </div>
      </div>

      {mode === "existant" ? (
        <div className="rounded-2xl border border-border/60 bg-card/40 p-4">
          <label className="mb-2 block text-xs font-semibold text-foreground">
            Sélectionner une candidature existante :
          </label>
          {items.length === 0 ? (
            <div className="py-8 text-center text-xs text-muted-foreground">
              Aucune candidature enregistrée. Basculez sur "Coller / Importer"
              pour ajouter votre première offre.
            </div>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              {items.map((cand) => {
                const estSelectionne = offreData.candidatureIdLiee === cand.id;
                return (
                  <button
                    key={cand.id}
                    type="button"
                    onClick={() => selectionnerCandidature(cand.id)}
                    className={`flex items-start justify-between rounded-xl border p-3 text-left transition-all ${
                      estSelectionne
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-border/60 bg-card/60 hover:border-primary/40 hover:bg-card"
                    }`}
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="truncate text-xs font-semibold text-foreground">
                        {cand.poste || "Poste non défini"}
                      </p>
                      <p className="truncate text-[11px] text-muted-foreground">
                        {cand.entreprise} • {cand.lieu || "Lieu non précisé"}
                      </p>
                    </div>
                    {estSelectionne && (
                      <CheckCircle2 className="size-4 shrink-0 text-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="relative">
            <Textarea
              value={offreData.texte}
              onChange={(e) => onChangeOffreData({ texte: e.target.value })}
              placeholder="Collez ici le texte intégral de la fiche de poste, le lien, ou la description de l'offre..."
              className="min-h-[140px] rounded-xl border-border/70 bg-card/70 text-xs leading-relaxed focus-visible:ring-primary/40"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.doc,.txt"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFichier(f);
              }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="h-8 gap-1.5 rounded-xl border-border/80 text-xs text-muted-foreground hover:text-foreground"
            >
              <Upload className="size-3.5" />
              <span>Charger un fichier (.pdf, .docx)</span>
            </Button>

            <Button
              type="button"
              onClick={() => lancerExtraction(offreData.texte)}
              disabled={chargement || !offreData.texte.trim()}
              className="h-8 gap-1.5 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              {chargement ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Extraction en cours...</span>
                </>
              ) : (
                <>
                  <Sparkles className="size-3.5" />
                  <span>Analyser avec l'IA</span>
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Structured Offer Card Preview */}
      {estPret && (
        <div className="rounded-2xl border border-primary/20 bg-card/70 p-4 space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                Fiche d'offre synthétisée
              </span>
              <h4 className="text-base font-bold text-foreground">
                {offreData.poste || "Poste à identifier"}
              </h4>
              <p className="text-xs text-muted-foreground">
                {offreData.entreprise || "Entreprise"}{" "}
                {offreData.lieu ? `• ${offreData.lieu}` : ""}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {!offreData.candidatureIdLiee && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={ajouterAuxCandidatures}
                  disabled={sauvegarde || sauvegardee}
                  className="h-8 gap-1.5 rounded-xl border-border text-xs"
                >
                  {sauvegardee ? (
                    <>
                      <CheckCircle2 className="size-3.5 text-emerald-400" />
                      <span>Ajouté</span>
                    </>
                  ) : (
                    <>
                      <Plus className="size-3.5" />
                      <span>Ajouter aux candidatures</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
            <div className="rounded-xl border border-border/50 bg-background/50 p-2.5">
              <span className="block text-[10px] text-muted-foreground">
                Entreprise
              </span>
              <span className="font-semibold text-foreground truncate block">
                {offreData.entreprise || "—"}
              </span>
            </div>
            <div className="rounded-xl border border-border/50 bg-background/50 p-2.5">
              <span className="block text-[10px] text-muted-foreground">
                Lieu
              </span>
              <span className="font-semibold text-foreground truncate block">
                {offreData.lieu || "—"}
              </span>
            </div>
            <div className="rounded-xl border border-border/50 bg-background/50 p-2.5">
              <span className="block text-[10px] text-muted-foreground">
                Secteur
              </span>
              <span className="font-semibold text-foreground truncate block">
                {offreData.secteur || "Général"}
              </span>
            </div>
            <div className="rounded-xl border border-border/50 bg-background/50 p-2.5">
              <span className="block text-[10px] text-muted-foreground">
                Date limite
              </span>
              <span className="font-semibold text-foreground truncate block">
                {offreData.dateLimite || "Dès que possible"}
              </span>
            </div>
          </div>

          {offreData.missions && (
            <div className="rounded-xl border border-border/40 bg-background/30 p-3 text-xs leading-relaxed text-muted-foreground">
              <span className="mb-1 block font-semibold text-foreground">
                Missions clés extraites :
              </span>
              <p className="line-clamp-4 whitespace-pre-line">
                {offreData.missions}
              </p>
            </div>
          )}

          {/* Action to proceed to next step */}
          <div className="flex justify-end pt-2">
            <Button
              type="button"
              onClick={onNextStep}
              className="gap-2 rounded-xl bg-primary px-5 text-xs font-semibold text-primary-foreground shadow-md hover:bg-primary/90"
            >
              <span>Continuer vers le Match IA</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

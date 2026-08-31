import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  FileCheck,
  FileText,
  KeyRound,
  Loader2,
  Sparkles,
  Target,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "@/hooks/useSession";
import { useProfil } from "@/hooks/useProfil";
import { genererLettre } from "@/lib/redaction.functions";
import { profilEnTexte } from "@/lib/match-run";
import { texteErreurIA } from "@/lib/ai-erreurs";
import {
  saveAiHistoryItem,
  type AiOffreData,
  type AiPitchResult,
  type AiMatchResult,
} from "@/lib/ai-hub";

interface AiPitchStepProps {
  offreData: AiOffreData;
  matchData?: AiMatchResult;
  pitchData?: AiPitchResult;
  onChangePitchData: (data: AiPitchResult) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}

export function AiPitchStep({
  offreData,
  matchData,
  pitchData,
  onChangePitchData,
  onNextStep,
  onPrevStep,
}: AiPitchStepProps) {
  const { user } = useSession();
  const profil = useProfil(user);
  const runGenererLettre = useServerFn(genererLettre);

  const [chargement, setChargement] = useState(false);
  const [consigne, setConsigne] = useState(
    "Direct, percutant et axé sur mes réalisations concrètes",
  );
  const [copie, setCopie] = useState<string | null>(null);

  const copierTexte = (texte: string, cle: string) => {
    navigator.clipboard.writeText(texte);
    setCopie(cle);
    toast.success("Texte copié dans le presse-papiers !");
    setTimeout(() => setCopie(null), 2000);
  };

  const genererPitchEtLettre = async () => {
    if (!profil) {
      toast.error("Veuillez d'abord compléter votre profil.");
      return;
    }
    setChargement(true);
    try {
      const profilTexte = profilEnTexte(profil);
      const offreTexte = [
        `Entreprise : ${offreData.entreprise}`,
        `Poste : ${offreData.poste}`,
        `Lieu : ${offreData.lieu}`,
        `Missions : ${offreData.missions}`,
        `Profil recherché : ${offreData.profilRecherche}`,
        `Texte complet : ${offreData.texte}`,
      ].join("\n\n");

      const res = await runGenererLettre({
        data: {
          profil: profilTexte,
          offre: offreTexte,
          consigne,
        },
      });

      // Split letter and pitch
      const lettre =
        typeof res === "string"
          ? res
          : typeof res === "object" && res !== null && "lettre" in res
            ? String(res.lettre)
            : "";
      const lignes = lettre
        .split("\n")
        .filter((l: string) => l.trim().length > 0);
      const pitchAccroche =
        lignes.slice(0, 3).join("\n") ||
        "Passionné par ce secteur, je souhaite apporter ma valeur ajoutée à vos projets.";

      const pointsForts = matchData?.pointsForts || [
        "Alignement des compétences clés avec la fiche de poste",
        "Capacité d'adaptation et autonomie démontrées",
      ];

      const motsCles = matchData?.competencesManquantes || [
        "Gestion de projet",
        "Data / IA",
        "Rigueur méthodologique",
      ];

      const nouveauResultat: AiPitchResult = {
        pitchAccroche,
        lettreMotivation: lettre,
        pointsAValoriser: pointsForts,
        motsClesAInserer: motsCles,
      };

      onChangePitchData(nouveauResultat);

      saveAiHistoryItem({
        type: "pitch",
        titre: `Pitch & Lettre : ${offreData.poste || "Poste"} @ ${offreData.entreprise || "Entreprise"}`,
        sousTitre: "Lettre de motivation & points clés CV",
        apercu: lettre.slice(0, 140),
        offreData,
        pitchData: nouveauResultat,
      });

      toast.success("Lettre et pitch de candidature générés !");
    } catch (e) {
      toast.error(texteErreurIA(e));
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Étape 3 : CV & Pitch de candidature
          </h3>
          <p className="text-xs text-muted-foreground">
            Adaptez vos arguments, extrayez les mots-clés ATS et générez une
            lettre de motivation sur-mesure.
          </p>
        </div>

        <Button
          type="button"
          onClick={genererPitchEtLettre}
          disabled={chargement}
          className="h-8 gap-1.5 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          {chargement ? (
            <>
              <Loader2 className="size-3.5 animate-spin" />
              <span>Rédaction en cours...</span>
            </>
          ) : (
            <>
              <Wand2 className="size-3.5" />
              <span>
                {pitchData ? "Régénérer le Pitch" : "Générer Lettre & Pitch"}
              </span>
            </>
          )}
        </Button>
      </div>

      {/* Target reminder */}
      <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/30 px-3.5 py-2.5 text-xs">
        <div className="flex items-center gap-2 truncate">
          <Target className="size-4 text-primary shrink-0" />
          <span className="font-semibold text-foreground truncate">
            {offreData.poste || "Poste visé"}
          </span>
          <span className="text-muted-foreground truncate">
            @ {offreData.entreprise || "Entreprise"}
          </span>
        </div>
        {matchData && (
          <Badge
            variant="outline"
            className="border-primary/30 text-[10px] text-primary"
          >
            Match {matchData.global}%
          </Badge>
        )}
      </div>

      {/* Content Tabs */}
      {!pitchData && !chargement ? (
        <div className="rounded-2xl border border-dashed border-border/80 p-8 text-center">
          <FileText className="mx-auto size-8 text-primary/70 mb-3" />
          <h4 className="text-sm font-semibold text-foreground">
            Prêt pour la personnalisation du CV & Pitch
          </h4>
          <p className="mx-auto mt-1 max-w-md text-xs text-muted-foreground">
            L'IA va croiser vos réalisations avec les critères de l'offre pour
            rédiger une lettre percutante et extraire les points d'expérience à
            placer en haut de votre CV.
          </p>

          <div className="mx-auto mt-4 max-w-sm space-y-2 text-left">
            <label className="text-[11px] font-semibold text-muted-foreground">
              Style ou consigne de rédaction :
            </label>
            <Textarea
              value={consigne}
              onChange={(e) => setConsigne(e.target.value)}
              placeholder="Ex: Concis, axé sur mes chiffres clés..."
              className="h-16 rounded-xl text-xs"
            />
          </div>

          <Button
            type="button"
            onClick={genererPitchEtLettre}
            className="mt-4 gap-2 rounded-xl bg-primary text-xs font-semibold text-primary-foreground"
          >
            <Sparkles className="size-3.5" />
            <span>Générer mes arguments & lettre</span>
          </Button>
        </div>
      ) : chargement ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-card/40 py-12 text-center">
          <Loader2 className="size-8 animate-spin text-primary mb-3" />
          <p className="text-sm font-semibold text-foreground">
            Rédaction de vos arguments ciblés...
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Valorisation de vos compétences et adaptation du ton à l'entreprise
          </p>
        </div>
      ) : pitchData ? (
        <Tabs defaultValue="lettre" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-xl bg-muted/60 p-1">
            <TabsTrigger value="lettre" className="rounded-lg text-xs">
              Lettre de motivation
            </TabsTrigger>
            <TabsTrigger value="cv_alignement" className="rounded-lg text-xs">
              Points clés à intégrer au CV
            </TabsTrigger>
          </TabsList>

          {/* Lettre Tab */}
          <TabsContent value="lettre" className="mt-4 space-y-3">
            <div className="relative rounded-2xl border border-border/60 bg-card/80 p-4">
              <div className="mb-2 flex items-center justify-between border-b border-border/40 pb-2">
                <span className="text-xs font-semibold text-foreground">
                  Lettre de motivation personnalisée
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copierTexte(pitchData.lettreMotivation, "lettre")
                  }
                  className="h-7 gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  {copie === "lettre" ? (
                    <>
                      <Check className="size-3.5 text-emerald-400" />
                      <span>Copié</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span>Copier la lettre</span>
                    </>
                  )}
                </Button>
              </div>

              <div className="max-h-[340px] overflow-y-auto whitespace-pre-line text-xs leading-relaxed text-foreground/90 pr-2">
                {pitchData.lettreMotivation}
              </div>
            </div>
          </TabsContent>

          {/* CV Alignement Tab */}
          <TabsContent value="cv_alignement" className="mt-4 space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-primary/20 bg-card/60 p-4">
                <div className="mb-2.5 flex items-center gap-2 text-xs font-semibold text-primary">
                  <FileCheck className="size-4" />
                  <span>Mettre en avant sur votre CV</span>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  {pitchData.pointsAValoriser.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 rounded-full bg-primary shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
                <div className="mb-2.5 flex items-center gap-2 text-xs font-semibold text-foreground">
                  <KeyRound className="size-4 text-amber-400" />
                  <span>Mots-clés stratégiques (ATS)</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {pitchData.motsClesAInserer.map((mc, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="border-border bg-background/60 text-xs text-foreground"
                    >
                      {mc}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onPrevStep}
              className="h-9 gap-1.5 rounded-xl border-border text-xs"
            >
              <ArrowLeft className="size-3.5" />
              <span>Retour au Match IA</span>
            </Button>

            <Button
              type="button"
              onClick={onNextStep}
              className="h-9 gap-2 rounded-xl bg-primary px-5 text-xs font-semibold text-primary-foreground shadow-md hover:bg-primary/90"
            >
              <span>Continuer : Écrire messages & relances</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </div>
        </Tabs>
      ) : null}
    </div>
  );
}

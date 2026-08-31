import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Linkedin,
  Loader2,
  Mail,
  MessageSquare,
  Sparkles,
  Target,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "@/hooks/useSession";
import { useProfil } from "@/hooks/useProfil";
import { genererLinkedin } from "@/lib/redaction.functions";
import { profilEnTexte } from "@/lib/match-run";
import { texteErreurIA } from "@/lib/ai-erreurs";
import {
  saveAiHistoryItem,
  type AiContactResult,
  type AiOffreData,
} from "@/lib/ai-hub";

interface AiContactStepProps {
  offreData: AiOffreData;
  contactData?: AiContactResult;
  onChangeContactData: (data: AiContactResult) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}

export function AiContactStep({
  offreData,
  contactData,
  onChangeContactData,
  onNextStep,
  onPrevStep,
}: AiContactStepProps) {
  const { user } = useSession();
  const profil = useProfil(user);
  const runGenererLinkedin = useServerFn(genererLinkedin);

  const [chargement, setChargement] = useState(false);
  const [copie, setCopie] = useState<string | null>(null);

  const copierTexte = (texte: string, cle: string) => {
    navigator.clipboard.writeText(texte);
    setCopie(cle);
    toast.success("Message copié dans le presse-papiers !");
    setTimeout(() => setCopie(null), 2000);
  };

  const genererMessages = async () => {
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
        `Contact : ${offreData.contactRecruteur}`,
      ].join("\n");

      const res = (await runGenererLinkedin({
        data: {
          profil: profilTexte,
          offre: offreTexte,
          consigne: "Générer les messages d'approche LinkedIn et Email",
        },
      })) as {
        invitation?: string;
        messageSuivi?: string;
        conseils?: string[];
      };

      const noteLinkedin =
        res?.invitation ||
        `Bonjour, très intéressé par vos projets et l'opportunité de ${offreData.poste || "poste"} au sein de ${offreData.entreprise || "votre équipe"}, je serais ravi d'échanger avec vous.`;

      const messageLinkedin =
        res?.messageSuivi ||
        `Bonjour,\n\nJe me permets de vous contacter suite à l'offre de ${offreData.poste || "poste"} chez ${offreData.entreprise || "votre entreprise"}. Mon parcours récent correspond aux compétences recherchées. Seriez-vous ouvert à un court échange ?\n\nBien cordialement,\n${profil.prenom || ""}`;

      const emailCandidature = `Objet : Candidature — ${offreData.poste || "Poste"} — ${profil.prenom || ""} ${profil.nom || ""}\n\nMadame, Monsieur,\n\nActuellement à la recherche d'une opportunité en ${profil.metiers || "mon domaine"}, c'est avec un grand intérêt que je vous transmets ma candidature pour le poste de ${offreData.poste || "ce poste"} au sein de ${offreData.entreprise || "votre entreprise"}.\n\nMon parcours m'a permis de développer une solide expertise sur vos enjeux clés. Vous trouverez ci-joint mon CV détaillé.\n\nRestant à votre disposition pour un entretien,\n\n${profil.prenom || ""} ${profil.nom || ""}\n${profil.telephone || ""}`;

      const emailRelance = `Objet : Suivi de ma candidature — ${offreData.poste || "Poste"} — ${profil.prenom || ""} ${profil.nom || ""}\n\nMadame, Monsieur,\n\nJe me permets de revenir vers vous concernant ma candidature au poste de ${offreData.poste || "ce poste"} envoyée récemment. Toujours particulièrement motivé par les projets de ${offreData.entreprise || "votre entreprise"}, je me tiens à votre disposition pour tout échange complémentaire.\n\nBien cordialement,\n${profil.prenom || ""} ${profil.nom || ""}`;

      const conseils = res?.conseils || [
        "Personnalisez l'accroche avec le nom du recruteur ou un événement récent de l'entreprise.",
        "Envoyez vos relances idéalement le mardi ou le jeudi matin vers 9h00.",
        "Ajoutez votre lien LinkedIn ou votre portfolio en signature.",
      ];

      const resultat: AiContactResult = {
        noteLinkedin,
        messageLinkedin,
        emailCandidature,
        emailRelance,
        conseilsApproche: conseils,
      };

      onChangeContactData(resultat);

      saveAiHistoryItem({
        type: "contact",
        titre: `Messages : ${offreData.poste || "Poste"} @ ${offreData.entreprise || "Entreprise"}`,
        sousTitre: "Note LinkedIn & Emails personnalisés",
        apercu: noteLinkedin,
        offreData,
        contactData: resultat,
      });

      toast.success("Messages de contact & relance générés !");
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
            Étape 4 : Messages d'approche & Relances
          </h3>
          <p className="text-xs text-muted-foreground">
            Générez des messages percutants adaptés aux recruteurs, managers et
            alumni sur LinkedIn et par email.
          </p>
        </div>

        <Button
          type="button"
          onClick={genererMessages}
          disabled={chargement}
          className="h-8 gap-1.5 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          {chargement ? (
            <>
              <Loader2 className="size-3.5 animate-spin" />
              <span>Génération...</span>
            </>
          ) : (
            <>
              <Wand2 className="size-3.5" />
              <span>
                {contactData
                  ? "Régénérer les messages"
                  : "Générer les messages"}
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
        {offreData.contactRecruteur && (
          <span className="text-[11px] text-muted-foreground truncate">
            Contact : {offreData.contactRecruteur}
          </span>
        )}
      </div>

      {/* Content */}
      {!contactData && !chargement ? (
        <div className="rounded-2xl border border-dashed border-border/80 p-8 text-center">
          <MessageSquare className="mx-auto size-8 text-primary/70 mb-3" />
          <h4 className="text-sm font-semibold text-foreground">
            Prêt pour la génération des messages
          </h4>
          <p className="mx-auto mt-1 max-w-md text-xs text-muted-foreground">
            L'IA va composer une note LinkedIn optimisée pour la limite de 300
            caractères, un message d'approche direct, ainsi que les modèles
            d'emails de candidature et de relance.
          </p>
          <Button
            type="button"
            onClick={genererMessages}
            className="mt-4 gap-2 rounded-xl bg-primary text-xs font-semibold text-primary-foreground"
          >
            <Sparkles className="size-3.5" />
            <span>Générer mes modèles de contact</span>
          </Button>
        </div>
      ) : chargement ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-card/40 py-12 text-center">
          <Loader2 className="size-8 animate-spin text-primary mb-3" />
          <p className="text-sm font-semibold text-foreground">
            Rédaction des messages et notes LinkedIn...
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Optimisation du copywriting et des phrases d'accroche
          </p>
        </div>
      ) : contactData ? (
        <Tabs defaultValue="note_linkedin" className="w-full">
          <TabsList className="grid w-full grid-cols-4 rounded-xl bg-muted/60 p-1">
            <TabsTrigger value="note_linkedin" className="rounded-lg text-xs">
              Note LinkedIn (300 car.)
            </TabsTrigger>
            <TabsTrigger
              value="message_linkedin"
              className="rounded-lg text-xs"
            >
              Message LinkedIn
            </TabsTrigger>
            <TabsTrigger
              value="email_candidature"
              className="rounded-lg text-xs"
            >
              Email Candidature
            </TabsTrigger>
            <TabsTrigger value="email_relance" className="rounded-lg text-xs">
              Email Relance (J+7)
            </TabsTrigger>
          </TabsList>

          {/* Note LinkedIn (<300 car.) */}
          <TabsContent value="note_linkedin" className="mt-4 space-y-3">
            <div className="rounded-2xl border border-sky-500/30 bg-card/80 p-4">
              <div className="mb-2 flex items-center justify-between border-b border-border/40 pb-2">
                <div className="flex items-center gap-2">
                  <Linkedin className="size-4 text-sky-400" />
                  <span className="text-xs font-semibold text-foreground">
                    Demande de connexion LinkedIn
                  </span>
                  <Badge variant="outline" className="text-[10px]">
                    {contactData.noteLinkedin.length}/300 caractères
                  </Badge>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copierTexte(contactData.noteLinkedin, "note_linkedin")
                  }
                  className="h-7 gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  {copie === "note_linkedin" ? (
                    <>
                      <Check className="size-3.5 text-emerald-400" />
                      <span>Copié</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span>Copier</span>
                    </>
                  )}
                </Button>
              </div>

              <p className="whitespace-pre-line text-xs leading-relaxed text-foreground">
                {contactData.noteLinkedin}
              </p>
            </div>
          </TabsContent>

          {/* Message LinkedIn */}
          <TabsContent value="message_linkedin" className="mt-4 space-y-3">
            <div className="rounded-2xl border border-sky-500/30 bg-card/80 p-4">
              <div className="mb-2 flex items-center justify-between border-b border-border/40 pb-2">
                <div className="flex items-center gap-2">
                  <Linkedin className="size-4 text-sky-400" />
                  <span className="text-xs font-semibold text-foreground">
                    Message d'approche InMail / Connexion
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copierTexte(contactData.messageLinkedin, "message_linkedin")
                  }
                  className="h-7 gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  {copie === "message_linkedin" ? (
                    <>
                      <Check className="size-3.5 text-emerald-400" />
                      <span>Copié</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span>Copier</span>
                    </>
                  )}
                </Button>
              </div>

              <div className="whitespace-pre-line text-xs leading-relaxed text-foreground">
                {contactData.messageLinkedin}
              </div>
            </div>
          </TabsContent>

          {/* Email Candidature */}
          <TabsContent value="email_candidature" className="mt-4 space-y-3">
            <div className="rounded-2xl border border-border/60 bg-card/80 p-4">
              <div className="mb-2 flex items-center justify-between border-b border-border/40 pb-2">
                <div className="flex items-center gap-2">
                  <Mail className="size-4 text-amber-400" />
                  <span className="text-xs font-semibold text-foreground">
                    Email officiel de candidature
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copierTexte(
                      contactData.emailCandidature,
                      "email_candidature",
                    )
                  }
                  className="h-7 gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  {copie === "email_candidature" ? (
                    <>
                      <Check className="size-3.5 text-emerald-400" />
                      <span>Copié</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span>Copier</span>
                    </>
                  )}
                </Button>
              </div>

              <div className="whitespace-pre-line text-xs leading-relaxed text-foreground">
                {contactData.emailCandidature}
              </div>
            </div>
          </TabsContent>

          {/* Email Relance */}
          <TabsContent value="email_relance" className="mt-4 space-y-3">
            <div className="rounded-2xl border border-border/60 bg-card/80 p-4">
              <div className="mb-2 flex items-center justify-between border-b border-border/40 pb-2">
                <div className="flex items-center gap-2">
                  <Mail className="size-4 text-primary" />
                  <span className="text-xs font-semibold text-foreground">
                    Email de relance à J+7 / J+10
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copierTexte(contactData.emailRelance, "email_relance")
                  }
                  className="h-7 gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  {copie === "email_relance" ? (
                    <>
                      <Check className="size-3.5 text-emerald-400" />
                      <span>Copié</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span>Copier</span>
                    </>
                  )}
                </Button>
              </div>

              <div className="whitespace-pre-line text-xs leading-relaxed text-foreground">
                {contactData.emailRelance}
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
              <span>Retour au CV & Pitch</span>
            </Button>

            <Button
              type="button"
              onClick={onNextStep}
              className="h-9 gap-2 rounded-xl bg-primary px-5 text-xs font-semibold text-primary-foreground shadow-md hover:bg-primary/90"
            >
              <span>Continuer : Interview Coach</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </div>
        </Tabs>
      ) : null}
    </div>
  );
}

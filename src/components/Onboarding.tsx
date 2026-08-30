import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CalendarClock,
  Check,
  Sparkles,
  Upload,
  Users,
} from "lucide-react";
import { CenterModal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

type Etape = {
  titre: string;
  texte: string;
  points: string[];
  icon: typeof Sparkles;
};

const ETAPES: Etape[] = [
  {
    titre: "Bienvenue sur Careerly 👋",
    texte:
      "Careerly est votre copilote de recherche de stage ou d'alternance : un seul endroit pour suivre vos candidatures, vos relances et vos entretiens.",
    points: [
      "Toutes vos candidatures centralisées",
      "Synchronisées sur tous vos appareils",
      "Un brief quotidien qui vous dit quoi faire",
    ],
    icon: Sparkles,
  },
  {
    titre: "Votre profil, la clé du match IA",
    texte:
      "Complétez votre profil (ou importez votre CV) : l'IA compare ensuite chaque offre à votre parcours et vous donne un score de compatibilité.",
    points: [
      "Analyse automatique de votre CV",
      "Score de match IA sur chaque offre",
      "Points forts et écarts détaillés",
    ],
    icon: Bot,
  },
  {
    titre: "Ajoutez vos offres en 10 secondes",
    texte:
      "Collez le texte d'une annonce : Careerly extrait l'entreprise, le poste, le lieu et la date limite de candidature automatiquement.",
    points: [
      "Extraction IA depuis une annonce",
      "Deadlines suivies et surlignées",
      "Statuts modifiables en un clic",
    ],
    icon: CalendarClock,
  },
  {
    titre: "Contacts, relances et entretiens",
    texte:
      "Gardez vos contacts recruteurs au chaud : l'IA rédige vos relances et prépare vos entretiens à votre place.",
    points: [
      "Messages de relance générés par l'IA",
      "Préparation d'entretien personnalisée",
      "Calendrier des deadlines et rendez-vous",
    ],
    icon: Users,
  },
  {
    titre: "Vous avez déjà commencé ailleurs ?",
    texte:
      "Importez votre tableau Excel/CSV, vos contacts et vos lettres de motivation : vous ne repartez jamais de zéro.",
    points: [
      "Import Excel / CSV avec détection des colonnes",
      "Import de contacts et de documents",
      "Export de votre agenda en .ics",
    ],
    icon: Upload,
  },
];

function cle(userId: string | null) {
  return `careerly.onboarding.${userId ?? "local"}`;
}

/** Indique si le tutoriel doit s'afficher automatiquement pour cet utilisateur. */
export function useOnboarding(userId: string | null, pret: boolean) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!pret || typeof window === "undefined") return;
    if (window.localStorage.getItem(cle(userId)) === "vu") return;
    setOpen(true);
  }, [pret, userId]);

  const fermer = (v: boolean) => {
    if (!v && typeof window !== "undefined")
      window.localStorage.setItem(cle(userId), "vu");
    setOpen(v);
  };

  return { open, setOpen: fermer, ouvrir: () => setOpen(true) };
}

export function Onboarding({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [i, setI] = useState(0);
  const etape = ETAPES[i] ?? ETAPES[0]!;
  const Icon = etape.icon;
  const dernier = i === ETAPES.length - 1;

  useEffect(() => {
    if (open) setI(0);
  }, [open]);

  return (
    <CenterModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      title={etape.titre}
      description={`Étape ${i + 1} sur ${ETAPES.length}`}
      footer={
        <div className="flex w-full items-center justify-between gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground"
          >
            Passer
          </Button>
          <div className="flex items-center gap-2">
            {i > 0 ? (
              <Button variant="secondary" size="sm" onClick={() => setI(i - 1)}>
                <ArrowLeft className="size-4" /> Retour
              </Button>
            ) : null}
            <Button
              size="sm"
              onClick={() => (dernier ? onOpenChange(false) : setI(i + 1))}
            >
              {dernier ? (
                <>
                  C'est parti <Check className="size-4" />
                </>
              ) : (
                <>
                  Suivant <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      }
    >
      <div key={i} className="pop-in space-y-4">
        <div className="grid size-12 place-items-center rounded-2xl bg-primary/15 text-primary">
          <Icon className="size-6" />
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {etape.texte}
        </p>
        <ul className="space-y-2">
          {etape.points.map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1.5 pt-1">
          {ETAPES.map((e, idx) => (
            <button
              key={e.titre}
              type="button"
              aria-label={`Aller à l'étape ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === i
                  ? "w-6 bg-primary"
                  : "w-2 bg-border hover:bg-primary/40"
              }`}
            />
          ))}
        </div>
      </div>
    </CenterModal>
  );
}

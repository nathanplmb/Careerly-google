import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Linkedin,
  Mail,
  MessageSquare,
  Plug,
  ScanLine,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { AssistantIa } from "@/components/AssistantIa";

export const Route = createFileRoute("/assistant/")({
  head: () => ({
    meta: [
      { title: "Assistant IA — tout classer automatiquement | Careerly" },
      {
        name: "description",
        content:
          "Collez un texte, un e-mail ou une annonce : l'assistant IA de Careerly en extrait les candidatures, les contacts et les échéances, puis les range automatiquement.",
      },
      {
        property: "og:title",
        content: "Assistant IA — tout classer automatiquement | Careerly",
      },
      {
        property: "og:description",
        content:
          "Un seul champ de texte pour tout trier : offres, entreprises, contacts, dates limites et relances.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AssistantPage,
});

const OUTILS: { label: string; desc: string; to: string; icon: LucideIcon }[] =
  [
    {
      label: "Match IA",
      desc: "Score de correspondance profil / offre et priorités.",
      to: "/assistant/match",
      icon: Sparkles,
    },
    {
      label: "CV Analyzer",
      desc: "Importez votre CV, l'IA remplit votre profil.",
      to: "/profil",
      icon: ScanLine,
    },
    {
      label: "Email Assistant",
      desc: "Relances et messages personnalisés à vos contacts.",
      to: "/contacts",
      icon: Mail,
    },
    {
      label: "LinkedIn Assistant",
      desc: "Messages de connexion et posts qui convertissent.",
      to: "/assistant/linkedin",
      icon: Linkedin,
    },
    {
      label: "Interview Coach",
      desc: "Entraînez-vous aux questions de l'entretien.",
      to: "/assistant/interview",
      icon: MessageSquare,
    },
    {
      label: "Connecter une IA",
      desc: "Branchez Claude ou ChatGPT sur vos données.",
      to: "/assistant/connect",
      icon: Plug,
    },
  ];

function AssistantPage() {
  return (
    <AppShell
      eyebrow="Copilote"
      title="Assistant IA"
      subtitle="Un texte, un e-mail, des notes : l'IA identifie les offres, les contacts et les dates, et les classe pour vous."
    >
      <AssistantIa />

      <section className="mt-8">
        <h2 className="mb-1 text-[15px] font-semibold">
          Outils de l'assistant
        </h2>
        <p className="mb-4 text-[13px] text-muted-foreground">
          Chaque outil est une sous-page de l'assistant, accessible aussi depuis
          le menu.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {OUTILS.map((o, i) => (
            <Link
              key={o.label}
              to={o.to}
              className="pop-in press group rounded-2xl border border-border/60 bg-card/60 p-4 transition-colors hover:border-primary/40 hover:bg-card"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="mb-3 grid size-10 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/25">
                <o.icon className="size-[18px]" />
              </span>
              <p className="text-[14px] font-semibold">{o.label}</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                {o.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Sparkles, Loader2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { AccountMenu } from "@/components/AccountMenu";
import { useCandidatures } from "@/hooks/useCandidatures";
import { useProfil } from "@/hooks/useProfil";
import { buildCandidateContextFromProfil } from "@/ai/chat/chat.context";
import type { ChatPersonaId } from "@/ai/chat/chat.types";

const searchSchema = z.object({
  persona: z
    .enum([
      "general_advisor",
      "interview_coach",
      "cv_expert",
      "job_strategist",
      "salary_negotiator",
      "custom",
    ])
    .optional(),
});

export const Route = createFileRoute("/assistant")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Assistant Carrière IA — NACORA" },
      {
        name: "description",
        content:
          "Discutez avec votre coach carrière IA propulsé par Gemini : simulations d'entretien, optimisation de CV, négociation salariale et stratégie d'opportunités.",
      },
      { property: "og:title", content: "Assistant Carrière IA — NACORA" },
      {
        property: "og:description",
        content:
          "Coach IA conversationnel multi-rôles propulsé par Google Gemini pour accélérer votre recherche d'emploi.",
      },
    ],
  }),
  component: AssistantPage,
});

function AssistantPage() {
  const search = Route.useSearch();
  const { user, authLoading } = useCandidatures();
  const profil = useProfil(user);

  const candidateProfile = useMemo(
    () => (profil ? buildCandidateContextFromProfil(profil) : undefined),
    [profil],
  );

  return (
    <AppShell
      title="NACORA AI"
      subtitle="Votre copilote conversationnel propulsé par Google Gemini"
      eyebrow="Intelligence Artificielle"
      actions={
        <div className="flex items-center gap-2">
          {authLoading && (
            <Loader2 className="size-4 animate-spin text-muted-foreground/80" />
          )}
          <AccountMenu user={user} />
        </div>
      }
    >
      <div className="w-full">
        <ChatContainer
          userPrenom={profil?.prenom}
          candidateProfile={candidateProfile}
          initialPersona={search.persona as ChatPersonaId | undefined}
        />
      </div>
    </AppShell>
  );
}

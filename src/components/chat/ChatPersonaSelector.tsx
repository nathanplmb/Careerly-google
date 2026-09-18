import {
  Sparkles,
  UserCheck,
  FileEdit,
  Compass,
  Coins,
  Sliders,
  Check,
} from "lucide-react";
import type { ChatPersonaId } from "@/ai/chat/chat.types";
import { PERSONA_PROMPTS } from "@/ai/chat/chat.prompt";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const PERSONA_ICONS: Record<ChatPersonaId, typeof Sparkles> = {
  general_advisor: Sparkles,
  interview_coach: UserCheck,
  cv_expert: FileEdit,
  job_strategist: Compass,
  salary_negotiator: Coins,
  custom: Sliders,
};

interface ChatPersonaSelectorProps {
  currentPersona: ChatPersonaId;
  onSelectPersona: (persona: ChatPersonaId) => void;
  onOpenCustomPromptModal?: () => void;
}

export function ChatPersonaSelector({
  currentPersona,
  onSelectPersona,
  onOpenCustomPromptModal,
}: ChatPersonaSelectorProps) {
  const Icon = PERSONA_ICONS[currentPersona] || Sparkles;
  const currentConfig =
    PERSONA_PROMPTS[currentPersona] || PERSONA_PROMPTS.general_advisor;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8.5 gap-2 rounded-xl border-white/10 bg-[#131620] px-3 text-xs font-semibold text-zinc-200 shadow-xs hover:bg-[#181C28] hover:text-white"
        >
          <Icon className="size-3.5 text-[#EC0040]" />
          <span className="max-w-[140px] truncate sm:max-w-[200px]">
            {currentConfig.title}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-72 p-1.5 shadow-xl bg-[#11141D] border-white/10 text-zinc-200"
      >
        <DropdownMenuLabel className="px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
          Rôles & Consignes Spécialisées
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 bg-white/10" />

        {(Object.keys(PERSONA_PROMPTS) as ChatPersonaId[]).map((pId) => {
          const p = PERSONA_PROMPTS[pId];
          const PIcon = PERSONA_ICONS[pId];
          const isSelected = pId === currentPersona;

          return (
            <DropdownMenuItem
              key={pId}
              onClick={() => {
                onSelectPersona(pId);
                if (pId === "custom" && onOpenCustomPromptModal) {
                  onOpenCustomPromptModal();
                }
              }}
              className="flex items-start gap-2.5 rounded-lg p-2 text-xs cursor-pointer focus:bg-white/[0.06] focus:text-white text-zinc-300"
            >
              <div className="mt-0.5 rounded-md bg-white/[0.04] border border-white/10 p-1 text-[#EC0040]">
                <PIcon className="size-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-zinc-100">{p.title}</span>
                  {isSelected && (
                    <Check className="size-3.5 text-[#EC0040] shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-zinc-400 leading-tight mt-0.5 line-clamp-1">
                  {p.subtitle}
                </p>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { Zap, Brain, Sparkles, Check } from "lucide-react";
import type { ChatModelId } from "@/ai/chat/chat.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ModelInfo {
  id: ChatModelId;
  name: string;
  badge: string;
  description: string;
  icon: typeof Sparkles;
}

const MODELS: ModelInfo[] = [
  {
    id: "gemini-3.5-flash",
    name: "Gemini 3.5 Flash",
    badge: "Général",
    description: "Équilibré et polyvalent pour toutes les tâches courantes",
    icon: Sparkles,
  },
  {
    id: "gemini-3.1-pro-preview",
    name: "Gemini 3.1 Pro",
    badge: "Complexe",
    description:
      "Raisonnement avancé, simulations approfondies & cas complexes",
    icon: Brain,
  },
  {
    id: "gemini-3.1-flash-lite",
    name: "Gemini 3.1 Flash Lite",
    badge: "Rapide",
    description:
      "Temps de réponse instantané pour questions et reformulations rapides",
    icon: Zap,
  },
];

interface ChatModelSelectorProps {
  currentModel: ChatModelId;
  onSelectModel: (model: ChatModelId) => void;
}

export function ChatModelSelector({
  currentModel,
  onSelectModel,
}: ChatModelSelectorProps) {
  const current = MODELS.find((m) => m.id === currentModel) || MODELS[0];
  const Icon = current.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8.5 gap-2 rounded-xl border-white/10 bg-[#131620] px-3 text-xs font-semibold text-zinc-200 shadow-xs hover:bg-[#181C28] hover:text-white"
        >
          <Icon className="size-3.5 text-[#EC0040]" />
          <span className="truncate">{current.name}</span>
          <span className="rounded-full bg-white/[0.06] border border-white/10 px-1.5 py-0.2 text-[10px] font-semibold text-zinc-300">
            {current.badge}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 p-1.5 shadow-xl bg-[#11141D] border-white/10 text-zinc-200"
      >
        <DropdownMenuLabel className="px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
          Modèle Gemini
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 bg-white/10" />

        {MODELS.map((model) => {
          const MIcon = model.icon;
          const isSelected = model.id === currentModel;

          return (
            <DropdownMenuItem
              key={model.id}
              onClick={() => onSelectModel(model.id)}
              className="flex items-start gap-2.5 rounded-lg p-2 text-xs cursor-pointer focus:bg-white/[0.06] focus:text-white text-zinc-300"
            >
              <div className="mt-0.5 rounded-md bg-white/[0.04] border border-white/10 p-1 text-[#EC0040]">
                <MIcon className="size-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-zinc-100">
                      {model.name}
                    </span>
                    <span className="rounded-md bg-white/[0.06] border border-white/10 px-1.5 py-0.2 text-[10px] font-medium text-zinc-400">
                      {model.badge}
                    </span>
                  </div>
                  {isSelected && (
                    <Check className="size-3.5 text-[#EC0040] shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-zinc-400 leading-tight mt-0.5">
                  {model.description}
                </p>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatutBadge } from "@/components/StatutBadge";
import { STATUTS, type Statut } from "@/lib/candidatures";

type Props = {
  statut: Statut;
  onChange: (s: Statut) => void;
};

export function StatutQuickSelect({ statut, onChange }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Changer le statut"
        className="inline-flex items-center gap-1 rounded-full outline-none transition hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
      >
        <StatutBadge statut={statut} />
        <ChevronDown className="size-3.5 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        {STATUTS.map((s) => (
          <DropdownMenuItem
            key={s}
            onSelect={() => onChange(s)}
            className="gap-2"
          >
            <Check
              className={`size-4 ${s === statut ? "opacity-100" : "opacity-0"}`}
            />
            <span className="text-sm">{s}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

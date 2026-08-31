import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Check,
  Clock,
  Copy,
  FileSearch,
  FileText,
  Linkedin,
  Mail,
  MessageSquare,
  Sparkles,
  Trash2,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  clearAiHistory,
  deleteAiHistoryItem,
  getAiHistory,
  type AiHistoryItem,
} from "@/lib/ai-hub";

const ICONS: Record<string, typeof Sparkles> = {
  offre: FileSearch,
  match: Sparkles,
  pitch: FileText,
  contact: Linkedin,
  interview: MessageSquare,
  tri: Wand2,
};

export function AiRecentHistory({
  onSelectHistoryItem,
}: {
  onSelectHistoryItem?: (item: AiHistoryItem) => void;
}) {
  const [items, setItems] = useState<AiHistoryItem[]>([]);
  const [copieId, setCopieId] = useState<string | null>(null);

  useEffect(() => {
    setItems(getAiHistory());
  }, []);

  const handleSupprimer = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteAiHistoryItem(id);
    setItems(updated);
    toast.success("Élément supprimé de l'historique.");
  };

  const handleVider = () => {
    clearAiHistory();
    setItems([]);
    toast.success("Historique IA réinitialisé.");
  };

  const copierApercu = (item: AiHistoryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const txt =
      item.pitchData?.lettreMotivation ||
      item.contactData?.noteLinkedin ||
      item.contactData?.emailCandidature ||
      item.matchData?.synthese ||
      item.apercu;
    if (txt) {
      navigator.clipboard.writeText(txt);
      setCopieId(item.id);
      toast.success("Contenu copié dans le presse-papiers !");
      setTimeout(() => setCopieId(null), 2000);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="size-4 text-primary" />
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Dernières activités & analyses IA
          </h2>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleVider}
          className="h-7 text-xs text-muted-foreground hover:text-destructive"
        >
          Effacer l'historique
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, 6).map((item) => {
          const Icon = ICONS[item.type] || Sparkles;
          const dateStr = new Date(item.date).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={item.id}
              onClick={() => onSelectHistoryItem && onSelectHistoryItem(item)}
              className="group relative flex flex-col justify-between rounded-2xl border border-border/60 bg-card/60 p-3.5 transition-all hover:border-primary/40 hover:bg-card/90 cursor-pointer"
            >
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="grid size-6 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-3.5" />
                    </span>
                    <span className="text-[10px] font-medium text-muted-foreground">
                      {dateStr}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => copierApercu(item, e)}
                      title="Copier le contenu"
                      className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      {copieId === item.id ? (
                        <Check className="size-3 text-emerald-400" />
                      ) : (
                        <Copy className="size-3" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleSupprimer(item.id, e)}
                      title="Supprimer"
                      className="rounded-md p-1 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="size-3" />
                    </button>
                  </div>
                </div>

                <h3 className="line-clamp-1 text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                  {item.titre}
                </h3>
                {item.sousTitre && (
                  <p className="line-clamp-1 text-[11px] text-muted-foreground">
                    {item.sousTitre}
                  </p>
                )}

                <p className="mt-2 line-clamp-2 text-[11.5px] leading-relaxed text-muted-foreground/80 border-t border-border/30 pt-2">
                  {item.apercu}
                </p>
              </div>

              <div className="mt-2 flex items-center justify-between text-[10px] font-medium text-primary">
                <span>Reprendre dans le copilote</span>
                <span>→</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

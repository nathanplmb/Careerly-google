import { Plus, Check } from "lucide-react";

type Props = {
  label?: string;
  tags: string[];
  currentValue: string;
  onSelectTag: (tag: string) => void;
};

export function ProfilTagSuggestions({
  label = "Suggestions rapides",
  tags,
  currentValue,
  onSelectTag,
}: Props) {
  const currentLower = currentValue.toLowerCase();

  return (
    <div className="space-y-1.5 pt-1">
      {label && (
        <span className="text-[11px] font-medium text-muted-foreground">
          {label} :
        </span>
      )}
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => {
          const isSelected = currentLower.includes(tag.toLowerCase());
          return (
            <button
              key={tag}
              type="button"
              onClick={() => onSelectTag(tag)}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition-all ${
                isSelected
                  ? "border border-primary/40 bg-primary/10 font-medium text-primary shadow-xs"
                  : "border border-border/60 bg-muted/40 text-muted-foreground hover:border-primary/30 hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {isSelected ? (
                <Check className="size-3 text-primary" />
              ) : (
                <Plus className="size-3 opacity-60" />
              )}
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}

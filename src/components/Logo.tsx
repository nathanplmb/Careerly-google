import { cn } from "@/lib/utils";
import mark from "@/assets/careerly-mark.png.asset.json";
import wordmark from "@/assets/careerly-wordmark.png.asset.json";

/** Logo Careerly officiel : symbole seul en compact, wordmark complet sinon. */
export function Logo({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  if (compact) {
    return (
      <span className={cn("flex items-center", className)}>
        <img
          src={mark.url}
          alt="Careerly"
          width={48}
          height={48}
          className="size-12 shrink-0 object-contain"
        />
      </span>
    );
  }
  return (
    <span className={cn("flex items-center", className)}>
      <img
        src={wordmark.url}
        alt="Careerly"
        width={176}
        height={48}
        className="h-12 w-auto shrink-0 object-contain object-left"
      />
    </span>
  );
}

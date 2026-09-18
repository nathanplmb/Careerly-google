import { cn } from "@/lib/utils";

/** Logo NACORA officiel : affiche directement le fichier image PNG officiel sans altération ni recréation typographique. */
export function Logo({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  if (compact) {
    return (
      <img
        src="/branding/nacora-official-mark.png"
        alt="NACORA"
        className={cn("h-8 w-8 shrink-0 object-contain", className)}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <img
      src="/branding/nacora-official-logo.png"
      alt="NACORA"
      className={cn("h-8 w-auto shrink-0 object-contain", className)}
      referrerPolicy="no-referrer"
    />
  );
}

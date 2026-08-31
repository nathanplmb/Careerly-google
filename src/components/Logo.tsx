import { cn } from "@/lib/utils";

/** Logo NACORA officiel : icône seule en compact, logo complet avec texte typographique et point caractéristique sinon. */
export function Logo({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  if (compact) {
    return (
      <span className={cn("inline-flex items-center", className)}>
        <svg
          viewBox="0 0 100 100"
          className="size-9 shrink-0 overflow-visible"
          aria-label="NACORA Icon"
        >
          <defs>
            <linearGradient id="nacora-mark-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          {/* Anneau principal */}
          <circle
            cx="50"
            cy="50"
            r="38"
            stroke="url(#nacora-mark-grad)"
            strokeWidth="8"
            fill="none"
          />
          {/* Noyau central */}
          <circle cx="50" cy="50" r="16" fill="url(#nacora-mark-grad)" />
          {/* Satellite haut-droite */}
          <circle cx="76" cy="24" r="9" fill="url(#nacora-mark-grad)" />
        </svg>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 350 80"
        className="h-9 w-auto shrink-0 overflow-visible"
        aria-label="NACORA Logo"
      >
        <defs>
          <linearGradient id="nacora-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>

        {/* Symbole de gauche */}
        <g transform="translate(0, 0)">
          <circle
            cx="40"
            cy="40"
            r="30"
            stroke="url(#nacora-logo-grad)"
            strokeWidth="6.5"
            fill="none"
          />
          <circle cx="40" cy="40" r="12.5" fill="url(#nacora-logo-grad)" />
          <circle cx="61" cy="19" r="7.5" fill="url(#nacora-logo-grad)" />
        </g>

        {/* Texte NACORA */}
        <g transform="translate(90, 0)">
          {/* N */}
          <path
            d="M 5 58 V 22 L 32 58 V 22"
            stroke="url(#nacora-logo-grad)"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* A */}
          <path
            d="M 44 58 L 60 22 L 76 58 M 49 47 H 71"
            stroke="url(#nacora-logo-grad)"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* C */}
          <path
            d="M 120 29 C 114 22 98 22 92 29 C 83 38 83 42 92 51 C 98 58 114 58 120 51"
            stroke="url(#nacora-logo-grad)"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* O (avec point au centre) */}
          <circle
            cx="148"
            cy="40"
            r="18"
            stroke="url(#nacora-logo-grad)"
            strokeWidth="6"
            fill="none"
          />
          <circle cx="148" cy="40" r="5" fill="url(#nacora-logo-grad)" />
          {/* R */}
          <path
            d="M 182 58 V 22 H 204 C 216 22 216 40 204 40 H 182 M 200 40 L 216 58"
            stroke="url(#nacora-logo-grad)"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* A */}
          <path
            d="M 228 58 L 244 22 L 260 58 M 233 47 H 255"
            stroke="url(#nacora-logo-grad)"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </svg>
    </span>
  );
}


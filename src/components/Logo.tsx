import { cn } from "@/lib/utils";

/** Logo NACORA officiel : utilise l'image du logo fourni par l'utilisateur avec l'icône orbite violette et la typographie NACORA au point violet. */
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
        <img
          src="/nacora-mark.svg"
          alt="NACORA Icon"
          className="size-9 shrink-0 object-contain"
          referrerPolicy="no-referrer"
        />
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center", className)}>
      <svg
        viewBox="0 0 380 90"
        className="h-9 w-auto shrink-0 overflow-visible text-foreground dark:text-white"
        aria-label="NACORA Logo"
      >
        <defs>
          <linearGradient
            id="nacora-logo-grad-main"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>

        {/* Symbole Orbite Violet (Gauche) */}
        <g transform="translate(5, 5)">
          <circle
            cx="40"
            cy="40"
            r="30"
            stroke="url(#nacora-logo-grad-main)"
            strokeWidth="7"
            fill="none"
          />
          <circle cx="40" cy="40" r="13" fill="url(#nacora-logo-grad-main)" />
          <circle cx="62" cy="18" r="8" fill="url(#nacora-logo-grad-main)" />
        </g>

        {/* Typographie NACORA (Droite) - Outlined white/adaptive text avec le point violet dans le O */}
        <g transform="translate(95, 5)">
          {/* N */}
          <path
            d="M 8 60 V 20 L 38 60 V 20"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* A */}
          <path
            d="M 50 60 L 68 20 L 86 60 M 56 47 H 80"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* C */}
          <path
            d="M 134 27 C 127 19 108 19 101 27 C 91 37 91 43 101 53 C 108 61 127 61 134 53"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* O (avec le point violet au centre) */}
          <circle
            cx="162"
            cy="40"
            r="20"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
          />
          <circle cx="162" cy="40" r="6" fill="url(#nacora-logo-grad-main)" />
          {/* R */}
          <path
            d="M 198 60 V 20 H 222 C 235 20 235 40 222 40 H 198 M 218 40 L 236 60"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* A */}
          <path
            d="M 248 60 L 266 20 L 284 60 M 254 47 H 278"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </svg>
    </span>
  );
}

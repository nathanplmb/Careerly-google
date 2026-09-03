import "@/lib/polyfills";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });

    // Auto-reload on stale chunk / module import error
    const msg = error?.message || "";
    if (
      msg.includes("Importing a module script failed") ||
      msg.includes("Failed to fetch dynamically imported module") ||
      msg.includes("error loading dynamically imported module")
    ) {
      const key = "chunk_reload_attempted";
      const lastAttempt = sessionStorage.getItem(key);
      const now = Date.now();
      if (!lastAttempt || now - Number(lastAttempt) > 10000) {
        sessionStorage.setItem(key, String(now));
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="max-w-md w-full text-center space-y-4 p-6 rounded-2xl border border-purple-500/20 bg-card/80 backdrop-blur-xl shadow-xl">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400">
          ⚠️
        </div>
        <h1 className="text-lg font-bold tracking-tight text-foreground">
          Mise à jour de l'application
        </h1>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Une nouvelle version de l'application est disponible ou un module n'a
          pas pu être chargé.
        </p>

        {error?.message && (
          <div className="p-3 text-left rounded-lg bg-red-500/10 border border-red-500/20 text-[11px] font-mono text-red-300 break-words max-h-32 overflow-y-auto">
            {error.message}
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-2">
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-purple-500"
          >
            Recharger la page
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-accent"
          >
            Retour au tableau de bord
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          title:
            "NACORA — Pilotez vos candidatures et votre carrière avec l'IA",
        },
        {
          name: "description",
          content:
            "NACORA centralise vos candidatures, relances et entretiens, avec un match IA et un brief quotidien.",
        },
        {
          property: "og:title",
          content: "NACORA — Votre copilote carrière intelligent",
        },
        {
          property: "og:description",
          content:
            "Suivi des candidatures, match IA et actions prioritaires du jour, dans une seule app.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        {
          rel: "stylesheet",
          href: appCss,
        },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap",
        },
        { rel: "icon", href: "/favicon.png", type: "image/png" },
      ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    const handleChunkError = (message: string) => {
      if (
        message.includes("Importing a module script failed") ||
        message.includes("Failed to fetch dynamically imported module") ||
        message.includes("error loading dynamically imported module") ||
        message.includes("Unable to preload CSS")
      ) {
        const key = "chunk_reload_attempted";
        const lastAttempt = sessionStorage.getItem(key);
        const now = Date.now();
        if (!lastAttempt || now - Number(lastAttempt) > 10000) {
          sessionStorage.setItem(key, String(now));
          console.warn(
            "Stale dynamic chunk detected. Reloading page for fresh assets...",
          );
          window.location.reload();
        }
      }
    };

    const handlePreloadError = (e: Event) => {
      console.warn("Preload error detected, reloading page...", e);
      handleChunkError("Failed to fetch dynamically imported module");
    };

    const handleWindowError = (event: ErrorEvent) => {
      if (event.message) {
        handleChunkError(event.message);
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const msg =
        reason instanceof Error
          ? reason.message
          : typeof reason === "string"
            ? reason
            : "";
      if (msg) {
        handleChunkError(msg);
      }
    };

    window.addEventListener("vite:preloadError", handlePreloadError);
    window.addEventListener("error", handleWindowError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("vite:preloadError", handlePreloadError);
      window.removeEventListener("error", handleWindowError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
      );
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster />
    </QueryClientProvider>
  );
}

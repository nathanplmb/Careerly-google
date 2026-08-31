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
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back
          home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
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
        { title: "Careerly — pilotez vos candidatures de stage avec l'IA" },
        {
          name: "description",
          content:
            "Careerly centralise vos candidatures, relances et entretiens, avec un match IA et un brief quotidien.",
        },
        {
          property: "og:title",
          content: "Careerly — votre command center carrière",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var KEY = 'careerly:chunk-reload';
                function isChunkError(msg) {
                  return /Importing a module script failed|Failed to fetch dynamically imported module|error loading dynamically imported module|Loading chunk .* failed/i.test(msg || '');
                }
                function tryReload() {
                  var last = sessionStorage.getItem(KEY);
                  var now = Date.now();
                  if (!last || (now - parseInt(last, 10)) > 10000) {
                    sessionStorage.setItem(KEY, now.toString());
                    window.location.reload();
                  }
                }
                window.addEventListener('error', function(e) {
                  if (isChunkError(e.message || (e.error && e.error.message))) {
                    tryReload();
                  }
                });
                window.addEventListener('unhandledrejection', function(e) {
                  var msg = (e.reason && (e.reason.message || e.reason.stack)) || String(e.reason || '');
                  if (isChunkError(msg)) {
                    tryReload();
                  }
                });
              })();
            `,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const CLE_RECHARGEMENT = "careerly:chunk-reload";

/** Après un déploiement, les anciens chunks disparaissent : on recharge de manière sécurisée. */
function useRechargementSurChunkManquant() {
  useEffect(() => {
    const estErreurDeChunk = (message: string) =>
      /Importing a module script failed|Failed to fetch dynamically imported module|error loading dynamically imported module|Loading chunk .* failed/i.test(
        message,
      );

    const recharger = () => {
      const last = sessionStorage.getItem(CLE_RECHARGEMENT);
      const now = Date.now();
      if (!last || now - Number.parseInt(last, 10) > 10000) {
        sessionStorage.setItem(CLE_RECHARGEMENT, now.toString());
        window.location.reload();
      }
    };

    const onError = (e: ErrorEvent) => {
      if (estErreurDeChunk(e.message ?? "")) recharger();
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      const reason = e.reason;
      const message =
        reason instanceof Error ? reason.message : String(reason ?? "");
      if (estErreurDeChunk(message)) recharger();
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useRechargementSurChunkManquant();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster />
    </QueryClientProvider>
  );
}

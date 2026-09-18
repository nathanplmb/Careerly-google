import "./lib/polyfills";
import { StrictMode, startTransition } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start/client";

startTransition(() => {
  const rootEl = document.getElementById("root");
  if (rootEl) {
    // If the static #root element is present, we are running in a static hosting/SPA fallback (e.g. Vercel static).
    // In this mode, we use createRoot to cleanly render the entire document without SSR hydration mismatch errors.
    rootEl.remove();
    createRoot(document).render(
      <StrictMode>
        <StartClient />
      </StrictMode>,
    );
  } else {
    // We are in SSR mode, so we use hydrateRoot as expected by TanStack Start.
    hydrateRoot(
      document,
      <StrictMode>
        <StartClient />
      </StrictMode>,
    );
  }
});

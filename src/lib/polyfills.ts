/**
 * Global Polyfills
 * Fixes Safari / WebKit error: "undefined is not a function (near '...value of readableStream...')"
 * when PDF.js getTextContent() executes `for await (const value of readableStream)`.
 */

export function patchReadableStreamInstance(stream: unknown): void {
  if (!stream || typeof stream !== "object") return;
  const s = stream as Record<string | symbol, unknown> & {
    getReader?: () => {
      read: () => Promise<{ done?: boolean; value?: unknown }>;
      releaseLock: () => void;
    };
  };

  const asyncIterSymbol =
    typeof Symbol !== "undefined" && Symbol.asyncIterator
      ? Symbol.asyncIterator
      : (Symbol as unknown as { asyncIterator: symbol })?.asyncIterator ||
        Symbol.for("Symbol.asyncIterator");

  if (typeof s.getReader === "function" && !s[asyncIterSymbol]) {
    s[asyncIterSymbol] = async function* () {
      const reader = s.getReader!();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) return;
          yield value;
        }
      } finally {
        reader.releaseLock();
      }
    };
  }
}

export function initPolyfills(): void {
  const globalScope =
    typeof globalThis !== "undefined"
      ? globalThis
      : typeof window !== "undefined"
        ? window
        : typeof self !== "undefined"
          ? self
          : {};

  // Polyfill window.process and global for client-side environments (Safari / WebKit)
  const gAny = globalScope as Record<string, any>;
  if (!gAny["process"]) {
    gAny["process"] = {
      env: { NODE_ENV: "development", TSS_ROUTER_BASEPATH: "" },
    };
  } else {
    const proc = gAny["process"] as { env?: Record<string, string> };
    if (!proc["env"]) {
      proc["env"] = { NODE_ENV: "development", TSS_ROUTER_BASEPATH: "" };
    } else {
      proc["env"]["NODE_ENV"] = proc["env"]["NODE_ENV"] || "development";
      proc["env"]["TSS_ROUTER_BASEPATH"] =
        proc["env"]["TSS_ROUTER_BASEPATH"] || "";
    }
  }

  if (!gAny["global"]) {
    gAny["global"] = globalScope;
  }

  if (typeof Symbol !== "undefined" && !Symbol.asyncIterator) {
    (Symbol as unknown as { asyncIterator: symbol }).asyncIterator = Symbol.for(
      "Symbol.asyncIterator",
    );
  }

  const asyncIterSymbol =
    typeof Symbol !== "undefined" && Symbol.asyncIterator
      ? Symbol.asyncIterator
      : Symbol.for("Symbol.asyncIterator");

  const g = globalScope as unknown as {
    ReadableStream?: {
      prototype?: {
        [key: string | symbol]: unknown;
        getReader?: () => {
          read: () => Promise<{ done?: boolean; value?: unknown }>;
          releaseLock: () => void;
        };
      };
    };
  };

  if (g.ReadableStream && g.ReadableStream.prototype) {
    const proto = g.ReadableStream.prototype;
    if (!proto[asyncIterSymbol]) {
      proto[asyncIterSymbol] = async function* (this: {
        getReader: () => {
          read: () => Promise<{ done?: boolean; value?: unknown }>;
          releaseLock: () => void;
        };
      }) {
        const reader = this.getReader();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) return;
            yield value;
          }
        } finally {
          reader.releaseLock();
        }
      };
    }
    if (!proto["values"]) {
      proto["values"] = proto[asyncIterSymbol];
    }
  }

  // Gracefully handle dynamic module import failures (e.g. preview iframe cache, network lag)
  if (typeof window !== "undefined") {
    window.addEventListener("vite:preloadError", (event: Event) => {
      event.preventDefault();
      console.warn(
        "[Vite Preload] Handled chunk load error gracefully:",
        event,
      );
      const key = "chunk_preload_reload";
      const now = Date.now();
      const last = Number(sessionStorage.getItem(key) || "0");
      if (!last || now - last > 15000) {
        sessionStorage.setItem(key, String(now));
        window.location.reload();
      }
    });

    window.addEventListener(
      "unhandledrejection",
      (event: PromiseRejectionEvent) => {
        const msg =
          event.reason instanceof Error
            ? event.reason.message
            : typeof event.reason === "string"
              ? event.reason
              : "";
        if (
          msg.includes("Importing a module script failed") ||
          msg.includes("Failed to fetch dynamically imported module") ||
          msg.includes("error loading dynamically imported module") ||
          msg.includes("Unable to preload CSS")
        ) {
          event.preventDefault();
          console.warn("[Module Import] Handled dynamic chunk failure:", msg);
          const key = "chunk_preload_reload";
          const now = Date.now();
          const last = Number(sessionStorage.getItem(key) || "0");
          if (!last || now - last > 15000) {
            sessionStorage.setItem(key, String(now));
            window.location.reload();
          }
        }
      },
    );

    window.addEventListener("error", (event: ErrorEvent) => {
      const msg = event.message || "";
      if (
        msg.includes("Importing a module script failed") ||
        msg.includes("Failed to fetch dynamically imported module") ||
        msg.includes("error loading dynamically imported module")
      ) {
        event.preventDefault();
        console.warn(
          "[Module Script Error] Suppressed unhandled script error:",
          msg,
        );
      }
    });
  }
}

// Auto-run immediately when this module is evaluated
initPolyfills();

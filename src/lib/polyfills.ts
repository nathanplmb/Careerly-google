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
  if (typeof Symbol !== "undefined" && !Symbol.asyncIterator) {
    (Symbol as unknown as { asyncIterator: symbol }).asyncIterator = Symbol.for(
      "Symbol.asyncIterator",
    );
  }

  const asyncIterSymbol =
    typeof Symbol !== "undefined" && Symbol.asyncIterator
      ? Symbol.asyncIterator
      : Symbol.for("Symbol.asyncIterator");

  const globalScope =
    typeof globalThis !== "undefined"
      ? globalThis
      : typeof window !== "undefined"
        ? window
        : typeof self !== "undefined"
          ? self
          : {};

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
}

// Auto-run immediately when this module is evaluated
initPolyfills();

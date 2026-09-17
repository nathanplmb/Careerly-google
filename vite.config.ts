// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/tanstack/vite";

export default defineConfig({
  vite: {
    plugins: [mcpPlugin()],
    build: {
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          chunkFileNames: "assets/c_[hash].js",
        },
      },
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify(
        process.env["NODE_ENV"] || "development",
      ),
      "process.env.TSS_ROUTER_BASEPATH": JSON.stringify(""),
    },
  },
  tanstackStart: {
    ssr: false,
    server: { entry: "server" },
  },
  nitro: {
    preset: undefined,
    rollupConfig: {
      output: {
        chunkFileNames: "_libs/c_[hash].mjs",
      },
    },
  },
});

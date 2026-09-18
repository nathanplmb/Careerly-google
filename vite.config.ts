// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import fs from "fs";
import path from "path";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/tanstack/vite";

function syncBuildArtifacts() {
  const rootDir = process.cwd();
  const distDir = path.join(rootDir, "dist");
  const outputDir = path.join(rootDir, ".output");
  const outputPublicDir = path.join(outputDir, "public");
  const outputServerDir = path.join(outputDir, "server");

  fs.mkdirSync(distDir, { recursive: true });

  // Copy public assets from .output/public to dist if present
  if (fs.existsSync(outputPublicDir)) {
    fs.cpSync(outputPublicDir, distDir, { recursive: true });
    const distPublicDir = path.join(distDir, "public");
    fs.mkdirSync(distPublicDir, { recursive: true });
    fs.cpSync(outputPublicDir, distPublicDir, { recursive: true });
  }

  // Copy static assets from public/ directory as fallback
  const staticPublicDir = path.join(rootDir, "public");
  if (fs.existsSync(staticPublicDir)) {
    fs.cpSync(staticPublicDir, distDir, { recursive: true });
    if (fs.existsSync(outputPublicDir)) {
      fs.cpSync(staticPublicDir, outputPublicDir, { recursive: true });
    }
  }

  // Copy server bundle from .output/server to dist/server if present
  if (fs.existsSync(outputServerDir)) {
    const distServerDir = path.join(distDir, "server");
    fs.mkdirSync(distServerDir, { recursive: true });
    fs.cpSync(outputServerDir, distServerDir, { recursive: true });
  }

  // Ensure index.html in dist and .output/public for static & deployment uploaders
  const assetsDir = path.join(distDir, "assets");
  let cssFile = "";
  let jsFiles: string[] = [];

  if (fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(assetsDir);
    cssFile = files.find((f) => f.endsWith(".css")) || "";
    const mainJs = files.find(
      (f) =>
        (f.startsWith("index-") ||
          f.startsWith("client-") ||
          f.startsWith("start-")) &&
        f.endsWith(".js"),
    );
    if (mainJs) {
      jsFiles.push(mainJs);
    } else {
      const anyJs = files.filter((f) => f.endsWith(".js"));
      if (anyJs.length > 0) {
        jsFiles = anyJs.slice(0, 3);
      }
    }
  }

  const htmlContent = `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>NACORA</title>
    <meta name="description" content="Pilotez vos candidatures de stage et d'emploi avec suivi intelligent, matching de compétences et organisation de carrière." />
    <meta property="og:title" content="NACORA" />
    <meta property="og:description" content="Pilotez vos candidatures de stage et d'emploi avec suivi intelligent, matching de compétences et organisation de carrière." />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <script>
      try {
        if (typeof window !== "undefined") {
          window.process = window.process || { env: { NODE_ENV: "production", TSS_ROUTER_BASEPATH: "" } };
          window.global = window.global || window;
        }
      } catch(e) {}
    </script>
    ${cssFile ? `<link rel="stylesheet" href="/assets/${cssFile}" />` : ""}
  </head>
  <body>
    <div id="root"></div>
    ${jsFiles.map((js) => `<script type="module" src="/assets/${js}"></script>`).join("\n    ")}
  </body>
</html>`;

  fs.writeFileSync(path.join(distDir, "index.html"), htmlContent);
  if (fs.existsSync(outputPublicDir)) {
    fs.writeFileSync(path.join(outputPublicDir, "index.html"), htmlContent);
  }
}

export default defineConfig({
  nitro: {
    preset: "node-server",
    rollupConfig: {
      onwarn(warning, warn) {
        if (
          warning.code === "MODULE_LEVEL_DIRECTIVE" ||
          warning.message?.includes("use client")
        ) {
          return;
        }
        warn(warning);
      },
    },
  },
  vite: {
    plugins: [
      mcpPlugin(),
      {
        name: "sync-build-artifacts",
        apply: "build",
        closeBundle() {
          try {
            syncBuildArtifacts();
          } catch (e) {
            console.warn("[vite closeBundle] syncBuildArtifacts error:", e);
          }
        },
      },
    ],
    define: {
      "process.env.NODE_ENV": JSON.stringify(
        process.env["NODE_ENV"] || "development",
      ),
      "process.env.TSS_ROUTER_BASEPATH": JSON.stringify(""),
    },
    build: {
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        external: ["canvas"],
        onwarn(warning, warn) {
          if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
            return;
          }
          warn(warning);
        },
        output: {
          manualChunks(id) {
            if (id.includes("pdfjs-dist")) {
              return "pdfjs";
            }
            if (id.includes("xlsx")) {
              return "xlsx";
            }
            return undefined;
          },
        },
      },
    },
    optimizeDeps: {
      exclude: ["canvas"],
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});

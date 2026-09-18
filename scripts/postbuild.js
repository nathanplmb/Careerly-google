import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const outputDir = path.join(rootDir, ".output");
const outputPublicDir = path.join(outputDir, "public");
const outputServerDir = path.join(outputDir, "server");

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Copy public assets from .output/public to dist if present
if (fs.existsSync(outputPublicDir)) {
  fs.cpSync(outputPublicDir, distDir, { recursive: true });
  // Also provide dist/public for node dist/server/index.mjs which references ../public
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

// Ensure dist/index.html and .output/public/index.html exist for deployment artifact uploaders
const assetsDir = path.join(distDir, "assets");
let cssFile = "";
let jsFiles = [];

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

console.log(
  "Postbuild complete: dist and .output artifacts generated successfully!",
);

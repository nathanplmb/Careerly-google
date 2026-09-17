import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const outputPublicDir = path.join(rootDir, ".output", "public");

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy public assets from .output/public to dist if present
if (fs.existsSync(outputPublicDir)) {
  fs.cpSync(outputPublicDir, distDir, { recursive: true });
}

// Ensure dist/index.html exists for static preview and deployment artifact uploaders
const assetsDir = path.join(distDir, "assets");
let cssFile = "";
let jsFiles = [];

if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  cssFile = files.find((f) => f.endsWith(".css")) || "";
  const mainJs = files.find((f) => f.startsWith("index-") && f.endsWith(".js"));
  if (mainJs) jsFiles.push(mainJs);
}

const htmlContent = `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Careerly AI — Copilote Candidatures</title>
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
console.log("Postbuild complete: dist/index.html generated successfully!");

// Patch missing Vercel output files (NFT + symbol bug fix)
const vercelServer = path.join(rootDir, ".vercel", "output", "functions", "__server.func");
const outputServer = path.join(rootDir, ".output", "server");
if (fs.existsSync(vercelServer) && fs.existsSync(outputServer)) {
  console.log("Patching missing Vercel output files...");
  const copyMissing = (src, dest) => {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        copyMissing(srcPath, destPath);
      } else {
        if (!fs.existsSync(destPath)) {
          fs.copyFileSync(srcPath, destPath);
          console.log(`Restored missing Vercel file: ${srcPath.replace(rootDir, '')}`);
        }
      }
    }
  };
  copyMissing(outputServer, vercelServer);
  console.log("Patching complete.");
}

import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const outputPublicDir = path.join(rootDir, ".output", "public");

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

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
    ${cssFile ? `<link rel="stylesheet" href="/assets/${cssFile}" />` : ""}
  </head>
  <body>
    <div id="root"></div>
    ${jsFiles.map((js) => `<script type="module" src="/assets/${js}"></script>`).join("\n    ")}
  </body>
</html>`;

fs.writeFileSync(path.join(distDir, "index.html"), htmlContent);
console.log("Postbuild complete: dist/index.html generated successfully!");

const fs = require("fs");
let code = fs.readFileSync("src/lib/candidatures.ts", "utf8");

code = code.replace(
  /  "offre" \| "match" \| "pitch" \| "contact" \| "interview";/,
  '  "offre" | "pitch" | "contact" | "interview";',
);
code = code.replace(
  "Match IA effectué. Adaptez votre CV pour répondre parfaitement à l'offre.",
  "Adaptez votre CV pour répondre parfaitement à l'offre.",
);
fs.writeFileSync("src/lib/candidatures.ts", code);

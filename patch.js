const fs = require("fs");
let code = fs.readFileSync("src/lib/cv-import/extractor.server.ts", "utf8");
code = code.replace(
  `  if (!firstName) {\n    let firstLine = "";\n    if (identityLines.length > 0) {\n      firstLine = identityLines[0].trim();\n    } else if (doc && doc.plainText) {\n      const lines = doc.plainText`,
  `  if (!firstName) {\n    let firstLine = "";\n    const cleanIdLines = identityLines.map(l => l.trim()).filter(Boolean);\n    if (cleanIdLines.length > 0) {\n      firstLine = cleanIdLines[0];\n    } else if (doc && doc.plainText) {\n      const lines = doc.plainText`,
);
fs.writeFileSync("src/lib/cv-import/extractor.server.ts", code);

const fs = require("fs");
let code = fs.readFileSync("src/routes/__root.tsx", "utf8");
code = code.replace(
  /import appCss from "\.\.\/styles\.css\?url";/,
  'import "../styles.css";',
);
fs.writeFileSync("src/routes/__root.tsx", code);

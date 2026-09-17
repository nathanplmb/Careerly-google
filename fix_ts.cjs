const fs = require('fs');
let code = fs.readFileSync('src/ai/daily-brief/dailyBrief.deterministic.ts', 'utf8');
code = code.replace(/actionLabel: primaryAction\.label,/g, 'actionLabel: primaryAction.label || "Action",');
fs.writeFileSync('src/ai/daily-brief/dailyBrief.deterministic.ts', code);

const fs = require('fs');
let code = fs.readFileSync('src/ai/opportunity/opportunity.service.ts', 'utf8');
code = code.replace(/const CANDIDATE_MODELS = \[[\s\S]*?\];/, `const CANDIDATE_MODELS = [\n  "gemini-2.5-flash",\n  "gemini-1.5-pro",\n  "gemini-1.5-flash"\n];`);
fs.writeFileSync('src/ai/opportunity/opportunity.service.ts', code);

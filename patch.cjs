const fs = require("fs");
let code = fs.readFileSync("src/routes/__root.tsx", "utf8");

code = code.replace(
  /export const Route = createRootRouteWithContext[\s\S]*?}\n\);/,
  `export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});`,
);

code = code.replace(/function RootShell[\s\S]*?}\n/g, "");

code = code.replace(
  /import \{[\s\S]*?HeadContent,\s*Scripts,[\s\S]*?\} from "@tanstack\/react-router";/g,
  `import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";`,
);

fs.writeFileSync("src/routes/__root.tsx", code);

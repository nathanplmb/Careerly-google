import { a as __toESM } from "./_runtime.mjs";
import { n as supabase } from "./_ssr/client-DnkKuJ6q.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { dt as Button, n as Route$1 } from "./_ssr/router-DOjtaet_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_._lovable.oauth.consent-4nzk5rGH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Consent() {
  const details = Route$1.useLoaderData();
  const { authorization_id } = Route$1.useSearch();
  const [busy, setBusy] = (0, import_react.useState)(false);
  const [error, setError] = (0, import_react.useState)(null);
  const clientName = details?.client?.name ?? "cette application";
  async function decide(approve) {
    setBusy(true);
    setError(null);
    const { data, error } = approve
      ? await supabase.auth.oauth.approveAuthorization(authorization_id)
      : await supabase.auth.oauth.denyAuthorization(authorization_id);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("Aucune redirection renvoyée par le serveur d'autorisation.");
      return;
    }
    window.location.href = target;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
    className:
      "aurora-bg flex min-h-screen items-center justify-center px-5 py-10",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className: "glass-card w-full max-w-md p-6",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
          className: "text-xl font-semibold",
          children: ["Connecter ", clientName, " à Careerly"],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
          className: "mt-2 text-sm text-muted-foreground",
          children: [
            clientName,
            " pourra lire et modifier vos candidatures, vos contacts et votre profil, en votre nom. Vous pouvez révoquer cet accès à tout moment.",
          ],
        }),
        error &&
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
            role: "alert",
            className: "mt-4 text-sm text-destructive",
            children: error,
          }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "mt-6 flex gap-3",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
              className: "flex-1",
              disabled: busy,
              onClick: () => decide(true),
              children: "Autoriser",
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
              variant: "outline",
              className: "flex-1",
              disabled: busy,
              onClick: () => decide(false),
              children: "Refuser",
            }),
          ],
        }),
      ],
    }),
  });
}
//#endregion
export { Consent as component };

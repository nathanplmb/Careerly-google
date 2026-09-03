import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/candidatures")({
  beforeLoad: () => {
    throw redirect({ to: "/opportunites" });
  },
  component: () => null,
});

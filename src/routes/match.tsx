import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/match")({
  beforeLoad: () => {
    throw redirect({ to: "/assistant/match" });
  },
});

import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/interview")({
  beforeLoad: () => {
    throw redirect({ to: "/assistant/interview" });
  },
});

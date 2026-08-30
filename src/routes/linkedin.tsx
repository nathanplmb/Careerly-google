import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/linkedin")({
  beforeLoad: () => {
    throw redirect({ to: "/assistant/linkedin" });
  },
});

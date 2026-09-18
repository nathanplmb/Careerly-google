import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/candidatures")({
  component: () => <Navigate to="/opportunites" replace />,
});

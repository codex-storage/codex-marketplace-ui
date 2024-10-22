import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/analytics")({
  component: () => <div>Hello /dashboard/analytics!</div>,
});

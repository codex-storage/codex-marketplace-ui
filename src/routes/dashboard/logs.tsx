import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/logs")({
  component: () => <div>Hello /dashboard/logs!</div>,
});

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/wallet")({
  component: () => <div>Hello /dashboard/wallet!</div>,
});

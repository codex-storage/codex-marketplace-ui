import { ErrorBoundary } from "@sentry/react";
import { ErrorPlaceholder } from "../../components/ErrorPlaceholder/ErrorPlaceholder";
import { createFileRoute } from "@tanstack/react-router";
import { Peers } from "../../components/Peers/Peers";

export const Route = createFileRoute("/dashboard/peers")({
  component: () => (
    <ErrorBoundary
      fallback={({ error }) => (
        <ErrorPlaceholder error={error} subtitle="Cannot retrieve the data." />
      )}>
      <Peers />
    </ErrorBoundary>
  ),
});

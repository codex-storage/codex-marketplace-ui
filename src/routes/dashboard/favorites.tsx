import { createFileRoute } from "@tanstack/react-router";
import { Files } from "../../components/Files/Files";
import { ErrorBoundary } from "@sentry/react";
import { ErrorPlaceholder } from "../../components/ErrorPlaceholder/ErrorPlaceholder";

export const Route = createFileRoute("/dashboard/favorites")({
  component: () => (
    <>
      <ErrorBoundary
        fallback={({ error }) => (
          <ErrorPlaceholder
            error={error}
            subtitle="Cannot retrieve the favorites."
          />
        )}>
        <div className="container">
          <Files />
        </div>
      </ErrorBoundary>
    </>
  ),
});

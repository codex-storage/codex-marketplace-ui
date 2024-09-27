import { createFileRoute } from "@tanstack/react-router";
import { Files } from "../../components/Files/Files";
import { ErrorBoundary } from "@sentry/react";
import { ErrorPlaceholder } from "../../components/ErrorPlaceholder/ErrorPlaceholder";
import { Card } from "@codex-storage/marketplace-ui-components";

export const Route = createFileRoute("/dashboard/favorites")({
  component: () => (
    <>
      <ErrorBoundary
        fallback={({ error }) => (
          <Card title="Error">
            <ErrorPlaceholder
              error={error}
              subtitle="Cannot retrieve the favorites."
            />
          </Card>
        )}>
        <div className="container">
          <Files />
        </div>
      </ErrorBoundary>
    </>
  ),
});

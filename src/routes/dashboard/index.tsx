import { createFileRoute } from "@tanstack/react-router";
import { Files } from "../../components/Files/Files.tsx";
import { Alert, Card, Upload } from "@codex-storage/marketplace-ui-components";
import { CodexSdk } from "../../sdk/codex";
import { Welcome } from "../../components/Welcome/Welcome.tsx";
import { ErrorPlaceholder } from "../../components/ErrorPlaceholder/ErrorPlaceholder.tsx";
import { ErrorBoundary } from "@sentry/react";
import { useQueryClient } from "@tanstack/react-query";
import { Download } from "../../components/Download/Download.tsx";

export const Route = createFileRoute("/dashboard/")({
  component: About,
});

function About() {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["cids"] });
  };

  return (
    <>
      <div className="dashboard">
        <div>
          <ErrorBoundary
            fallback={({ error }) => (
              <ErrorPlaceholder
                error={error}
                subtitle="Cannot retrieve the data."
              />
            )}>
            <Card title="Upload a file">
              <Upload
                multiple
                codexData={CodexSdk.data()}
                onSuccess={onSuccess}
              />
            </Card>
          </ErrorBoundary>

          <ErrorBoundary
            fallback={({ error }) => (
              <ErrorPlaceholder
                error={error}
                subtitle="Cannot retrieve the data."
              />
            )}>
            <Card title="Download a file" className="dashboard-download">
              <Download></Download>
            </Card>
          </ErrorBoundary>
        </div>

        <ErrorBoundary
          fallback={({ error }) => (
            <ErrorPlaceholder
              error={error}
              subtitle="Cannot retrieve the data."
            />
          )}>
          <div className="dashboard-welcome">
            <Welcome />

            <Alert
              variant="warning"
              title="Disclaimer"
              className="welcome-disclaimer dashboard-alert">
              The website and the content herein is not intended for public use
              and is for informational and demonstration purposes only.
            </Alert>
          </div>
        </ErrorBoundary>
      </div>

      <div className="container-fluid">
        <ErrorBoundary
          fallback={({ error }) => (
            <Card title="Error">
              <ErrorPlaceholder
                error={error}
                subtitle="Cannot retrieve the data."
              />
            </Card>
          )}>
          <Files />
        </ErrorBoundary>
      </div>
    </>
  );
}

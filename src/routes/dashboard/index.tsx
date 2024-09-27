import { createFileRoute } from "@tanstack/react-router";
import { Files } from "../../components/Files/Files.tsx";
import { Card, Upload } from "@codex-storage/marketplace-ui-components";
import { CodexSdk } from "../../sdk/codex";
import { Welcome } from "../../components/Welcome/Welcome.tsx";
import { FilesStorage } from "../../utils/file-storage";
import { ErrorPlaceholder } from "../../components/ErrorPlaceholder/ErrorPlaceholder.tsx";
import { ErrorBoundary } from "@sentry/react";

export const Route = createFileRoute("/dashboard/")({
  component: About,
});

const onSuccess = (cid: string, file: File) => {
  FilesStorage.set(cid, {
    name: file.name,
    mimetype: file.type,
    uploadedAt: new Date().toJSON(),
  });
};

function About() {
  return (
    <>
      <div className="dashboard">
        <ErrorBoundary
          fallback={({ error }) => (
            <ErrorPlaceholder
              error={error}
              subtitle="Cannot retrieve the data."
            />
          )}>
          <Card title="Upload a file">
            <Upload multiple codexData={CodexSdk.data} onSuccess={onSuccess} />
          </Card>
        </ErrorBoundary>

        <ErrorBoundary
          fallback={({ error }) => (
            <ErrorPlaceholder
              error={error}
              subtitle="Cannot retrieve the data."
            />
          )}>
          <Welcome />
        </ErrorBoundary>
      </div>

      <div className="container-fluid">
        <ErrorBoundary
          fallback={({ error }) => (
            <ErrorPlaceholder
              error={error}
              subtitle="Cannot retrieve the data."
            />
          )}>
          <Files />
        </ErrorBoundary>
      </div>
    </>
  );
}

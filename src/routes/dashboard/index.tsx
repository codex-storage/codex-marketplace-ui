import { createFileRoute } from "@tanstack/react-router";
import { ErrorBoundary } from "../../components/ErrorBoundary/ErrorBoundary.tsx";
import { Files } from "../../components/Files/Files.tsx";
import { Card, Upload } from "@codex-storage/marketplace-ui-components";
import { CodexSdk } from "../../sdk/codex";
import { Welcome } from "../../components/Welcome/Welcome.tsx";
import { FilesStorage } from "../../utils/file-storage";

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
        <ErrorBoundary card={true}>
          <Card title="Upload a file">
            <Upload multiple codexData={CodexSdk.data} onSuccess={onSuccess} />
          </Card>
        </ErrorBoundary>

        <ErrorBoundary card={true}>
          <Welcome />
        </ErrorBoundary>
      </div>

      <div className="container-fluid">
        <ErrorBoundary card={true}>
          <Files />
        </ErrorBoundary>
      </div>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Files } from "../../components/Files/Files";
import "./files.css";
import { ErrorBoundary } from "@sentry/react";
import { ErrorPlaceholder } from "../../components/ErrorPlaceholder/ErrorPlaceholder";
import { ManifestFetchCard } from "../../components/ManifestFetch/ManifestFetchCard";
import { UploadCard } from "../../components/UploadCard/UploadCard";
import { Download } from "../../components/Download/Download";

export const Route = createFileRoute("/dashboard/files")({
  component: () => (
    <div className="files-page">
      <Files></Files>

      <aside>
        <ErrorBoundary
          fallback={({ error }) => (
            <ErrorPlaceholder
              error={error}
              subtitle="Cannot retrieve the data."
            />
          )}>
          <UploadCard />
        </ErrorBoundary>
        <Download></Download>
        <ManifestFetchCard />
      </aside>
    </div>
  ),
});

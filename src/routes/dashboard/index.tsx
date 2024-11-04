import { createFileRoute } from "@tanstack/react-router";
import { Files } from "../../components/Files/Files.tsx";
import { WelcomeCard } from "../../components/Welcome/WelcomeCard.tsx";
import { ErrorPlaceholder } from "../../components/ErrorPlaceholder/ErrorPlaceholder.tsx";
import { ErrorBoundary } from "@sentry/react";
import { Download } from "../../components/Download/Download.tsx";
import "./index.css";
import { Versions } from "../../components/Versions/Versions.tsx";
import { WebStorage } from "../../utils/web-storage.ts";
import { ConnectedAccount } from "../../components/ConnectedAccount/ConnectedAccount.tsx";
import { NodeSpace } from "../../components/NodeSpace/NodeSpace.tsx";
import { UploadCard } from "../../components/UploadCard/UploadCard.tsx";
import { ManifestFetchCard } from "../../components/ManifestFetch/ManifestFetchCard.tsx";
import { PeersCard } from "../../components/Peers/PeersCard.tsx";

export const Route = createFileRoute("/dashboard/")({
  component: Dashboard,
});

function Dashboard() {
  const username = WebStorage.onBoarding.getDisplayName();

  const emoji = WebStorage.onBoarding.getEmoji();

  return (
    <>
      <div className="dashboard">
        <div className="row gap">
          <div className="emoji">{emoji}</div>
          <div>
            <h3>Welcome back,</h3>
            <h4>{username}</h4>
          </div>
        </div>
        <Versions />
      </div>
      <div>
        <div className="dashboard-body">
          <ConnectedAccount></ConnectedAccount>
          <div className="column">
            <ErrorBoundary
              fallback={({ error }) => (
                <ErrorPlaceholder
                  error={error}
                  subtitle="Cannot retrieve the data."
                />
              )}>
              <NodeSpace></NodeSpace>
            </ErrorBoundary>
            <PeersCard></PeersCard>
          </div>

          <ErrorBoundary
            fallback={({ error }) => (
              <ErrorPlaceholder
                error={error}
                subtitle="Cannot retrieve the data."
              />
            )}>
            <WelcomeCard />
          </ErrorBoundary>

          <div className="column">
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
          </div>

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
      </div>
    </>
  );
}

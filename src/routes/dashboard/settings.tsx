import { createFileRoute } from "@tanstack/react-router";
import "./settings.css";
import { ErrorBoundary } from "@sentry/react";
import { ErrorPlaceholder } from "../../components/ErrorPlaceholder/ErrorPlaceholder";
import { UserInfo } from "../../components/UserInfo/UserInfo";
import { HealthChecks } from "../../components/HealthChecks/HealthChecks";
import { Logotype } from "../../components/Logotype/Logotype";
import { Versions } from "../../components/Versions/Versions";
import { Logo } from "../../components/Logo/Logo";
import { BackgroundImage } from "../../components/BackgroundImage/BackgroundImage";

export const Route = createFileRoute("/dashboard/settings")({
  component: () => (
    <div className="settings">
      <header>
        <div className="row gap">
          <Logo height={48}></Logo>
          <Logotype height={46}></Logotype>
        </div>
        <Versions></Versions>
      </header>
      <main>
        <h3>Personalization</h3>
        <ErrorBoundary
          fallback={({ error }) => (
            <ErrorPlaceholder
              error={error}
              subtitle="Cannot retrieve the data."
            />
          )}>
          <UserInfo />
        </ErrorBoundary>

        <h3>Connection</h3>

        <ErrorBoundary
          fallback={({ error }) => (
            <ErrorPlaceholder
              error={error}
              subtitle="Cannot retrieve the data."
            />
          )}>
          <HealthChecks online={true} onStepValid={() => {}} />
        </ErrorBoundary>
      </main>

      <BackgroundImage />

      {/* <div className="settings">
        <ErrorBoundary
          fallback={({ error }) => (
            <ErrorPlaceholder
              error={error}
              subtitle="Cannot retrieve the data."
            />
          )}>
          <CodexUrlSettings />
        </ErrorBoundary>
      </div>

      <div className="settings">
        <ErrorBoundary
          fallback={({ error, resetError }) => {
            useEffect(() => {
              document.addEventListener("codexinvalidatequeries", resetError);

              return () => {
                document.removeEventListener(
                  "codexinvalidatequeries",
                  resetError
                );
              };
            }, [resetError]);

            return (
              <ErrorPlaceholder
                error={error}
                subtitle="Cannot retrieve the data."
              />
            );
          }}>
          <Debug />
        </ErrorBoundary>
      </div> */}

      <div className="settings">
        <ErrorBoundary
          fallback={({ error }) => (
            <ErrorPlaceholder
              error={error}
              subtitle="Cannot retrieve the data."
            />
          )}>
          <h3>Debug errors</h3>

          <br />

          <p>
            For each following option, if it is activated, the related API
            called will generate an error.
          </p>

          <br />
        </ErrorBoundary>
      </div>

      {/* <div className="input-floating">
              <input
                className="input input-floating-input"
                id="input-floating"
                placeholder=""
              />
              <label className="input-floating-label" htmlFor="input-floating">
                Floating
              </label>
            </div>

            <div className="input-floating">
              <input
                className="input input-floating-input"
                id="input-floating-with-value"
                placeholder=""
                value="Some value"
              />
              <label
                className="input-floating-label"
                htmlFor="input-floating-with-value">
                Floating
              </label>
            </div> */}
    </div>
  ),
});

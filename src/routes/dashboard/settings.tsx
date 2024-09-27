import { createFileRoute } from "@tanstack/react-router";
import "./settings.css";
import { LogLevel } from "../../components/LogLevel/LogLevel";
import { Debug } from "../../components/Debug/Debug";
import { CodexUrlSettings } from "../../components/CodexUrllSettings/CodexUrlSettings";
import { ErrorBoundary } from "@sentry/react";
import { ErrorPlaceholder } from "../../components/ErrorPlaceholder/ErrorPlaceholder";

export const Route = createFileRoute("/dashboard/settings")({
  component: () => (
    <>
      <div className="settings">
        <ErrorBoundary
          fallback={({ error }) => (
            <ErrorPlaceholder
              error={error}
              subtitle="Cannot retrieve the data."
            />
          )}>
          <LogLevel />
        </ErrorBoundary>
      </div>

      <div className="settings">
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
          fallback={({ error }) => (
            <ErrorPlaceholder
              error={error}
              subtitle="Cannot retrieve the data."
            />
          )}>
          <Debug />
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
    </>
  ),
});

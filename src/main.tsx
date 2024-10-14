import {
  ErrorComponentProps,
  RouterProvider,
  createRouter,
} from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Import the generated route tree
import App from "./App.tsx";
import { routeTree } from "./routeTree.gen";
import { Failure } from "@codex-storage/marketplace-ui-components";
import * as Sentry from "@sentry/react";
import { CodexSdk } from "./sdk/codex";
import { ErrorPlaceholder } from "./components/ErrorPlaceholder/ErrorPlaceholder.tsx";
import { DebugErrorsDataLoad } from "./components/DebugErrors/debug-errors.domain.ts";

if (import.meta.env.PROD && !import.meta.env.CI) {
  Sentry.init({
    release: "codex-storage-marketplace-ui@" + import.meta.env.PACKAGE_VERSION,
    dsn: "https://22d77c59a27b8d5efc07132188b505b9@o4507855852011520.ingest.de.sentry.io/4507866758512720",
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
      Sentry.feedbackIntegration({
        // Additional SDK configuration goes in here, for example:
        colorScheme: "dark",
      }),
    ],
    // Tracing
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: [],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
}

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => {
    return (
      <Failure
        title="Page not found"
        code={404}
        message="The page is not found"
        button="Go back to home"
        onClick={() => {}}
      />
    );
  },
  defaultErrorComponent:
    () =>
    ({ error }: ErrorComponentProps) => (
      <ErrorPlaceholder error={error} subtitle="Cannot retrieve the data." />
    ),
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  CodexSdk.load()
    .then(DebugErrorsDataLoad)
    .then(() => {
      root.render(
        <StrictMode>
          <App>
            <RouterProvider router={router} />
          </App>
        </StrictMode>
      );
    });
}

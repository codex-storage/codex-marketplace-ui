import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Import the generated route tree
import App from "./App.tsx";
import { routeTree } from "./routeTree.gen";
import { Failure } from "@codex-storage/marketplace-ui-components";
import * as Sentry from "@sentry/react";
import { CodexSdk } from "./sdk/codex";

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: "https://22d77c59a27b8d5efc07132188b505b9@o4507855852011520.ingest.de.sentry.io/4507866758512720",
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
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

  CodexSdk.load().then(() => {
    root.render(
      <StrictMode>
        <App>
          <RouterProvider router={router} />
        </App>
      </StrictMode>
    );
  });
}

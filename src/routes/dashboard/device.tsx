import { ErrorBoundary } from "@sentry/react";
import { createFileRoute } from "@tanstack/react-router";
import { ErrorPlaceholder } from "../../components/ErrorPlaceholder/ErrorPlaceholder";
import { useEffect } from "react";

const Device = () => {
  useEffect(() => {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
        //
        // The following headers may often be similar
        // to those of the original page request...
        //
        console.info(request.getAllResponseHeaders());
      }
    };

    //
    // Re-request the same page (document.location)
    // We hope to get the same or similar response headers to those which
    // came with the current page, but we have no guarantee.
    // Since we are only after the headers, a HEAD request may be sufficient.
    //
    request.open("HEAD", document.location, true);
    request.send(null);
  }, []);

  return (
    <ErrorBoundary
      fallback={({ error }) => (
        <ErrorPlaceholder error={error} subtitle="Cannot retrieve the data." />
      )}>
      couc
    </ErrorBoundary>
  );
};

export const Route = createFileRoute("/dashboard/device")({
  component: Device,
});

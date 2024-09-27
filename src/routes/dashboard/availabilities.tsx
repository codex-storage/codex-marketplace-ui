import { createFileRoute } from "@tanstack/react-router";
import { ErrorBoundary } from "@sentry/react";
import { ErrorPlaceholder } from "../../components/ErrorPlaceholder/ErrorPlaceholder";
import { Spinner } from "@codex-storage/marketplace-ui-components";
import { useQuery } from "@tanstack/react-query";
import { Promises } from "../../utils/promises";
import { CodexSdk } from "../../sdk/codex";
import "./availabilities.css";
import { AvailabilitiesTable } from "../../components/Availability/AvailabilitiesTable";
import { AvailabilityCreate } from "../../components/Availability/AvailabilityCreate";

const defaultSpace = {
  quotaMaxBytes: 0,
  quotaReservedBytes: 0,
  quotaUsedBytes: 0,
  totalBlocks: 0,
};

export function Availabilities() {
  {
    // Error will be catched in ErrorBounday
    const { data: availabilities = [], isPending } = useQuery({
      queryFn: () =>
        CodexSdk.marketplace
          .availabilities()
          .then((s) => Promises.rejectOnError(s))
          .then((res) => res.sort((a, b) => b.totalSize - a.totalSize)),
      queryKey: ["availabilities"],
      initialData: [],

      // No need to retry because if the connection to the node
      // is back again, all the queries will be invalidated.
      retry: false,

      // The client node should be local, so display the cache value while
      // making a background request looks good.
      staleTime: 0,

      // Refreshing when focus returns can be useful if a user comes back
      // to the UI after performing an operation in the terminal.
      refetchOnWindowFocus: true,
    });

    // Error will be catched in ErrorBounday
    const { data: space = defaultSpace } = useQuery({
      queryFn: () =>
        CodexSdk.data.space().then((s) => Promises.rejectOnError(s)),
      queryKey: ["space"],
      initialData: defaultSpace,

      // No need to retry because if the connection to the node
      // is back again, all the queries will be invalidated.
      retry: false,

      // The client node should be local, so display the cache value while
      // making a background request looks good.
      staleTime: 0,

      // Refreshing when focus returns can be useful if a user comes back
      // to the UI after performing an operation in the terminal.
      refetchOnWindowFocus: true,
    });

    // const allocation = availabilities
    //   .map((a) => ({
    //     title: Strings.shortId(a.id),
    //     size: a.totalSize,
    //   }))
    //   .slice(0, 6);

    return (
      <div className="container">
        <div className="availabilities-content">
          {isPending ? (
            <div className="purchases-loader">
              <Spinner width="3rem" />
            </div>
          ) : (
            <div className="availabilities-table">
              <AvailabilitiesTable
                // onEdit={onOpen}
                availabilities={availabilities}
              />
            </div>
          )}

          <div className="availabilities-space">
            <div>{/* <SpaceAllocation data={allocation} /> */}</div>
            <div>
              <AvailabilityCreate space={space} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const Route = createFileRoute("/dashboard/availabilities")({
  component: () => (
    <ErrorBoundary
      fallback={({ error }) => (
        <ErrorPlaceholder error={error} subtitle="Cannot retrieve the data." />
      )}>
      <Availabilities />
    </ErrorBoundary>
  ),
});

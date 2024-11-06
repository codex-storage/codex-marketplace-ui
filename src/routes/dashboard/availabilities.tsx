import { createFileRoute } from "@tanstack/react-router";
import { ErrorBoundary } from "@sentry/react";
import { ErrorPlaceholder } from "../../components/ErrorPlaceholder/ErrorPlaceholder";
import {
  Button,
  SpaceAllocationItem,
  Spinner,
} from "@codex-storage/marketplace-ui-components";
import { useQuery } from "@tanstack/react-query";
import { Promises } from "../../utils/promises";
import { CodexSdk } from "../../sdk/codex";
import "./availabilities.css";
import { AvailabilitiesTable } from "../../components/Availability/AvailabilitiesTable";
import { AvailabilityEdit } from "../../components/Availability/AvailabilityEdit";
import { Strings } from "../../utils/strings";
import { PrettyBytes } from "../../utils/bytes";
import { Sunburst } from "../../components/Availability/Sunburst";
import { Errors } from "../../utils/errors";
import { availabilityColors } from "../../components/Availability/availability.colors";
import { AvailabilityWithSlots } from "../../components/Availability/types";
import { WebStorage } from "../../utils/web-storage";
import { NodeSpace } from "../../components/NodeSpace/NodeSpace";
import PlusIcon from "../../assets/icons/plus-circle.svg?react";
import UploadIcon from "../../assets/icons/upload.svg?react";

const defaultSpace = {
  quotaMaxBytes: 0,
  quotaReservedBytes: 0,
  quotaUsedBytes: 0,
  totalBlocks: 0,
};

export function Availabilities() {
  {
    // Error will be catched in ErrorBounday
    const { data: availabilities = [], isPending } = useQuery<
      AvailabilityWithSlots[]
    >({
      queryFn: () =>
        CodexSdk.marketplace()
          .availabilities()
          .then((s) => Promises.rejectOnError(s))
          .then((res) => res.sort((a, b) => b.totalSize - a.totalSize))
          .then((data) =>
            Promise.all(
              data.map((a) =>
                CodexSdk.marketplace()
                  .reservations(a.id)
                  .then((res) => {
                    if (res.error) {
                      Errors.report(res);
                      return { ...a, slots: [] };
                    }

                    return { ...a, slots: res.data };
                  })
                  .then((data) =>
                    WebStorage.availabilities.get(data.id).then((n) => ({
                      ...data,
                      name: n || "",
                    }))
                  )
              )
            )
          ),
      queryKey: ["availabilities"],
      initialData: [],

      // .then((res) =>
      //   res.error ? res : { ...data, slots: res.data }
      // )
      // No need to retry because if the connection to the node
      // is back again, all the queries will be invalidated.
      retry: false,

      // The client node should be local, so display the cache value while
      // making a background request looks good.
      staleTime: 0,

      // Refreshing when focus returns can be useful if a user comes back
      // to the UI after performing an operation in the terminal.
      refetchOnWindowFocus: true,

      // Throw the error to the error boundary
      throwOnError: true,
    });

    // Error will be catched in ErrorBounday
    const { data: space = defaultSpace } = useQuery({
      queryFn: () =>
        CodexSdk.data()
          .space()
          .then((s) => Promises.rejectOnError(s)),
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

      // Throw the error to the error boundary
      throwOnError: true,
    });

    const allocation: SpaceAllocationItem[] = availabilities.map(
      (a, index) => ({
        title: Strings.shortId(a.id),
        size: a.totalSize,
        tooltip: a.id + "\u000D\u000A" + PrettyBytes(a.totalSize),
        color: availabilityColors[index],
      })
    );

    allocation.push({
      title: "Space remaining",
      // TODO move this to domain
      size:
        space.quotaMaxBytes - space.quotaReservedBytes - space.quotaUsedBytes,
      color: "transparent",
    });

    if (isPending) {
      return (
        <div className="purchases-loader">
          <Spinner width="3rem" />
        </div>
      );
    }

    const onOpenAvailabilities = () =>
      document.dispatchEvent(new CustomEvent("codexavailabilitycreate", {}));

    return (
      <div className="availabilities">
        <div className="card">
          <AvailabilitiesTable
            space={space}
            // onEdit={onOpen}
            availabilities={availabilities}
          />
        </div>
        <aside>
          <div className="card">
            <header>
              <div>
                <UploadIcon width={18}></UploadIcon>
                <h5>Host</h5>
              </div>
            </header>
            <main>
              <div>
                <Sunburst
                  availabilities={availabilities}
                  space={space}></Sunburst>

                <AvailabilityEdit space={space} hasLabel={false} />
              </div>

              <Button
                onClick={onOpenAvailabilities}
                Icon={() => <PlusIcon width={20} />}
                label="Create Availability"
                variant="outline"></Button>

              <NodeSpace></NodeSpace>
            </main>
            <footer>
              <b>Node</b>
              <small>
                {PrettyBytes(space.quotaMaxBytes)} allocated for the node
              </small>
            </footer>
          </div>
        </aside>
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

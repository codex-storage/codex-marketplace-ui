import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { CodexSdk } from "../../sdk/codex";
import { Cell, Spinner, Table } from "@codex-storage/marketplace-ui-components";
import { StorageRequestCreate } from "../../components/StorageRequestSetup/StorageRequestCreate";
import "./purchases.css";
import { FileCell } from "../../components/FileCellRender/FileCell";
import { CustomStateCellRender } from "../../components/CustomStateCellRender/CustomStateCellRender";
import { Promises } from "../../utils/promises";
import { TruncateCell } from "../../components/TruncateCell/TruncateCell";
import { Times } from "../../utils/times";
import { ErrorPlaceholder } from "../../components/ErrorPlaceholder/ErrorPlaceholder";
import { ErrorBoundary } from "@sentry/react";

const Purchases = () => {
  const { data, isPending } = useQuery({
    queryFn: () =>
      CodexSdk.marketplace.purchases().then((s) => Promises.rejectOnError(s)),
    queryKey: ["purchases"],

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

  if (isPending) {
    return (
      <div className="purchases-loader">
        <Spinner width="3rem" />
      </div>
    );
  }

  const headers = [
    "file",
    "request id",
    "duration",
    "slots",
    "reward",
    "proof probability",
    "state",
  ];

  const cells =
    (data ?? []).map((p, index) => {
      const r = p.request;
      const ask = p.request.ask;
      const duration = parseInt(p.request.ask.duration, 10);
      const pf = parseInt(p.request.ask.proofProbability, 10);

      return [
        <FileCell requestId={r.id} purchaseCid={r.content.cid} index={index} />,
        <TruncateCell value={r.id} />,
        <Cell value={Times.pretty(duration)} />,
        <Cell value={ask.slots.toString()} />,
        <Cell value={ask.reward + " CDX"} />,
        <Cell value={pf.toString()} />,
        <CustomStateCellRender state={p.state} message={p.error} />,
      ];
    }) || [];

  return (
    <div className="container">
      <div className="purchases-actions">
        <StorageRequestCreate />
      </div>

      <Table headers={headers} cells={cells} />
    </div>
  );
};

export const Route = createFileRoute("/dashboard/purchases")({
  component: () => (
    <ErrorBoundary
      fallback={({ error }) => (
        <ErrorPlaceholder error={error} subtitle="Cannot retrieve the data." />
      )}>
      <Purchases />
    </ErrorBoundary>
  ),
});

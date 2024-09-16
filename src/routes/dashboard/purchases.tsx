import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { CodexSdk } from "../../sdk/codex";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  Button,
  Cell,
  Spinner,
  Table,
} from "@codex-storage/marketplace-ui-components";
import { StorageRequestStepper } from "../../components/StorageRequestSetup/StorageRequestStepper";
import "./purchases.css";
import { classnames } from "../../utils/classnames";
import { FileCell } from "../../components/FileCellRender/FileCell";
import { CustomStateCellRender } from "../../components/CustomStateCellRender/CustomStateCellRender";
import prettyMilliseconds from "pretty-ms";
import { ErrorBoundary } from "../../components/ErrorBoundary/ErrorBoundary";
import { Promises } from "../../utils/promises";
import { TruncateCell } from "../../components/TruncateCell/TruncateCell";

const Purchases = () => {
  const [open, setOpen] = useState(false);
  const { data, isPending } = useQuery({
    queryFn: () =>
      CodexSdk.marketplace.purchases().then((s) => Promises.rejectOnError(s)),
    queryKey: ["purchases"],
    refetchOnWindowFocus: false,
    retry: false,
    throwOnError: true,
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

  const sorted = [...(data || [])].reverse();
  const cells =
    sorted.map((p, index) => {
      const r = p.request;
      const ask = p.request.ask;
      const duration = parseInt(p.request.ask.duration, 10) * 1000;
      const pf = parseInt(p.request.ask.proofProbability, 10) * 1000;

      return [
        <FileCell requestId={r.id} purchaseCid={r.content.cid} index={index} />,
        <TruncateCell value={r.id} />,
        <Cell value={prettyMilliseconds(duration, { verbose: true })} />,
        <Cell value={ask.slots.toString()} />,
        <Cell value={ask.reward + " CDX"} />,
        <Cell value={(pf / 1000).toString()} />,
        <CustomStateCellRender state={p.state} message={p.error} />,
      ];
    }) || [];

  return (
    <div className="container">
      <div className="purchases-actions">
        <Button
          label="Storage Request"
          Icon={Plus}
          onClick={() => setOpen(true)}
          variant="primary"
        />
      </div>

      <StorageRequestStepper
        className={classnames(
          ["purchases-modal"],
          ["purchases-modal-open", open]
        )}
        open={open}
        onClose={() => setOpen(false)}
      />

      <Table headers={headers} cells={cells} />

      {/* {!cells.length && (
        <EmptyPlaceholder
          title="Nothing to show"
          message="No data here yet. Start to upload files to see data here."
        />
      )} */}
    </div>
  );
};

export const Route = createFileRoute("/dashboard/purchases")({
  component: () => (
    <ErrorBoundary card={true}>
      <Purchases />
    </ErrorBoundary>
  ),
});

import { Cell, Table } from "@codex-storage/marketplace-ui-components";
import { TruncateCell } from "../TruncateCell/TruncateCell";
import { PrettyBytes } from "../../utils/bytes";
import { AvailabilityActionsCell } from "./AvailabilityActionsCell";
import { CodexAvailability } from "@codex-storage/sdk-js/async";
import { Times } from "../../utils/times";
import { useState } from "react";
import { AvailabilityReservations } from "./AvailabilityReservations";

type Props = {
  // onEdit: () => void;
  availabilities: CodexAvailability[];
};

export function AvailabilitiesTable({ availabilities }: Props) {
  const [availability, setAvailability] = useState<CodexAvailability | null>(
    null
  );
  const headers = [
    "id",
    "total size",
    "duration",
    "min price",
    "max collateral",
    "actions",
  ];

  const onReservationsShow = (a: CodexAvailability) => setAvailability(a);

  const onReservationsClose = () => setAvailability(null);

  const cells =
    availabilities.map((a) => {
      return [
        <TruncateCell value={a.id} />,
        <Cell value={PrettyBytes(a.totalSize)} />,
        <Cell value={Times.pretty(a.duration)} />,
        <Cell value={a.minPrice.toString()} />,
        <Cell value={a.maxCollateral.toString()} />,
        <AvailabilityActionsCell
          availability={a}
          onReservationsShow={onReservationsShow}
        />,
      ];
    }) || [];

  return (
    <>
      <Table headers={headers} cells={cells} />
      <AvailabilityReservations
        availability={availability}
        onClose={onReservationsClose}
        open={!!availability}></AvailabilityReservations>
    </>
  );
}

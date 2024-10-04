import { Cell, Row, Table } from "@codex-storage/marketplace-ui-components";
import { PrettyBytes } from "../../utils/bytes";
import { AvailabilityActionsCell } from "./AvailabilityActionsCell";
import { CodexAvailability, CodexNodeSpace } from "@codex-storage/sdk-js/async";
import { Times } from "../../utils/times";
import { Fragment, useState } from "react";
import { AvailabilityReservations } from "./AvailabilityReservations";
import { AvailabilityIdCell } from "./AvailabilityIdCell";
import { ChevronDown } from "lucide-react";
import "./AvailabilitiesTable.css";
import { Arrays } from "../../utils/arrays";
import { AvailabilitySlotRow } from "./AvailabilitySlotRow";
import { classnames } from "../../utils/classnames";
import { AvailabilityWithSlots } from "./types";
import { AvailabilityDiskRow } from "./AvailabilityDiskRow";

type Props = {
  // onEdit: () => void;
  space: CodexNodeSpace;
  availabilities: AvailabilityWithSlots[];
};

export function AvailabilitiesTable({ availabilities, space }: Props) {
  const [availability, setAvailability] = useState<CodexAvailability | null>(
    null
  );
  const [details, setDetails] = useState<string[]>([]);

  const headers = [
    "",
    "id",
    "total size",
    "duration",
    "min price",
    "max collateral",
    "actions",
  ];

  const onReservationsClose = () => setAvailability(null);

  const rows = availabilities.map((a, index) => {
    const showDetails = details.includes(a.id);

    const onShowDetails = () => setDetails(Arrays.toggle(details, a.id));
    const hasSlots = a.slots.length > 0;

    return (
      <Fragment key={a.id + a.duration}>
        <Row
          cells={[
            <Cell>
              {hasSlots ? (
                <ChevronDown
                  className={classnames(
                    ["availabilityTable-chevron"],
                    ["availabilityTable-chevron--open", showDetails]
                  )}
                  onClick={onShowDetails}></ChevronDown>
              ) : (
                <span></span>
              )}
            </Cell>,
            <AvailabilityIdCell value={a} index={index} />,
            <Cell>{PrettyBytes(a.totalSize)}</Cell>,
            <Cell>{Times.pretty(a.duration)}</Cell>,
            <Cell>{a.minPrice.toString()}</Cell>,
            <Cell>{a.maxCollateral.toString()}</Cell>,
            <AvailabilityActionsCell availability={a} />,
          ]}></Row>

        {a.slots.map((slot) => (
          <AvailabilitySlotRow
            key={slot.id}
            active={showDetails}
            bytes={parseFloat(slot.size)}
            id={slot.id}></AvailabilitySlotRow>
        ))}
      </Fragment>
    );
  });

  rows.unshift(
    <AvailabilityDiskRow bytes={space.quotaMaxBytes}></AvailabilityDiskRow>
  );

  return (
    <>
      <Table headers={headers} rows={rows} />
      <AvailabilityReservations
        availability={availability}
        onClose={onReservationsClose}
        open={!!availability}></AvailabilityReservations>
    </>
  );
}

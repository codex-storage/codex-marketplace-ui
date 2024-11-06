import { Cell, Row, Table } from "@codex-storage/marketplace-ui-components";
import { PrettyBytes } from "../../utils/bytes";
import { AvailabilityActionsCell } from "./AvailabilityActionsCell";
import { CodexAvailability, CodexNodeSpace } from "@codex-storage/sdk-js/async";
import { Times } from "../../utils/times";
import { Fragment, useState } from "react";
import { AvailabilityReservations } from "./AvailabilityReservations";
import { AvailabilityIdCell } from "./AvailabilityIdCell";
import { Arrays } from "../../utils/arrays";
import { SlotRow } from "./SlotRow";
import { AvailabilityWithSlots } from "./types";
import { AvailabilityDiskRow } from "./AvailabilityDiskRow";
import { ChevronDown } from "./ChevronDown";
import { attributes } from "../../utils/attributes";

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

  const rows = availabilities.map((a) => {
    const showDetails = details.includes(a.id);

    const onShowDetails = () => setDetails(Arrays.toggle(details, a.id));
    const hasSlots = a.slots.length > 0;

    return (
      <Fragment key={a.id + a.duration}>
        <Row
          className="availabilty-row"
          cells={[
            <Cell>
              {hasSlots ? (
                <ChevronDown
                  {...attributes({ "aria-expanded": showDetails })}
                  onClick={onShowDetails}></ChevronDown>
              ) : (
                ""
              )}
            </Cell>,
            <AvailabilityIdCell value={a} />,
            <Cell>{PrettyBytes(a.totalSize)}</Cell>,
            <Cell>{Times.pretty(a.duration)}</Cell>,
            <Cell>{a.minPrice.toString()}</Cell>,
            <Cell>{a.maxCollateral.toString()}</Cell>,
            <AvailabilityActionsCell availability={a} />,
          ]}></Row>

        {a.slots.map((slot) => (
          <SlotRow
            key={slot.id}
            active={showDetails}
            bytes={parseFloat(slot.size)}
            id={slot.id}></SlotRow>
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

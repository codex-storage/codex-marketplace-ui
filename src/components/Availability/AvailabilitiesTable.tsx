import {
  Cell,
  Row,
  Table,
  TabSortState,
} from "@codex-storage/marketplace-ui-components";
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
import { attributes } from "../../utils/attributes";
import ChevronIcon from "../../assets/icons/chevron.svg?react";
import { AvailabilityUtils } from "./availability.utils";

type Props = {
  // onEdit: () => void;
  space: CodexNodeSpace;
  availabilities: AvailabilityWithSlots[];
};

type SortFn = (a: AvailabilityWithSlots, b: AvailabilityWithSlots) => number;

export function AvailabilitiesTable({ availabilities, space }: Props) {
  const [availability, setAvailability] = useState<CodexAvailability | null>(
    null
  );
  const [details, setDetails] = useState<string[]>([]);
  const [sortFn, setSortFn] = useState<SortFn | null>(null);

  const onReservationsClose = () => setAvailability(null);

  const onSortById = (state: TabSortState) =>
    setSortFn(() => AvailabilityUtils.sortById(state));

  const onSortBySize = (state: TabSortState) =>
    setSortFn(() => AvailabilityUtils.sortBySize(state));

  const onSortByDuration = (state: TabSortState) =>
    setSortFn(() => AvailabilityUtils.sortByDuration(state));

  const onSortByPrice = (state: TabSortState) =>
    setSortFn(() => AvailabilityUtils.sortByPrice(state));

  const onSortByCollateral = (state: TabSortState) =>
    setSortFn(() => AvailabilityUtils.sortByCollateral(state));

  const headers = [
    [""],
    ["id", onSortById],
    ["total size", onSortBySize],
    ["duration", onSortByDuration],
    ["min price", onSortByPrice],
    ["max collateral", onSortByCollateral],
    ["actions"],
  ] satisfies [string, ((state: TabSortState) => void)?][];

  const sorted = sortFn ? [...availabilities].sort(sortFn) : availabilities;

  const rows = sorted.map((a) => {
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
                <ChevronIcon
                  {...attributes({ "aria-expanded": showDetails })}
                  onClick={onShowDetails}></ChevronIcon>
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
      <Table headers={headers} rows={rows} defaultSortIndex={0} />
      <AvailabilityReservations
        availability={availability}
        onClose={onReservationsClose}
        open={!!availability}></AvailabilityReservations>
    </>
  );
}

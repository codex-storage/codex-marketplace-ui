import { Strings } from "../../utils/strings";
import { Cell } from "@codex-storage/marketplace-ui-components";
import { PrettyBytes } from "../../utils/bytes";
import { AvailabilityWithSlots } from "./types";
import AvailbilityIcon from "../../assets/icons/availability.svg?react";

type Props = {
  value: AvailabilityWithSlots;
};

export function AvailabilityIdCell({ value }: Props) {
  return (
    <Cell>
      <div className="row gap" id={value.id}>
        <AvailbilityIcon />
        <div>
          <div>
            <b>{value.name || Strings.shortId(value.id)}</b>
          </div>
          <small className="text--light">
            {PrettyBytes(value.totalSize)} allocated for the availability
          </small>
          <br />
          <small className="text--light">
            Max collateral {value.maxCollateral} | Min price {value.minPrice}
          </small>
        </div>
      </div>
    </Cell>
  );
}

import "./AvailabilityIdCell.css";
import { Strings } from "../../utils/strings";
import { Cell, SimpleText } from "@codex-storage/marketplace-ui-components";
import { PrettyBytes } from "../../utils/bytes";
import { availabilityColors } from "./availability.colors";
import { AvailabilityWithSlots } from "./types";

type Props = {
  value: AvailabilityWithSlots;
  index: number;
};

export function AvailabilityIdCell({ value, index }: Props) {
  return (
    <Cell>
      <div className="availabilityIdCell" id={value.id}>
        <Folder color={availabilityColors[index]} />
        <div>
          <div>
            <b>{value.name || Strings.shortId(value.id)}</b>
          </div>
          <SimpleText size="small" variant="light">
            {PrettyBytes(value.totalSize)} allocated for the availability
          </SimpleText>
          <div>
            {/* <div>
                                <SimpleText size="small" variant="light">
                                  {a.id}
                                </SimpleText>
                              </div> */}
            <SimpleText size="small" variant="light">
              Max collateral {value.maxCollateral} | Min price {value.minPrice}
            </SimpleText>
          </div>
        </div>
      </div>
    </Cell>
  );
}

const Folder = ({ color }: { color: string }) => (
  <svg
    width="30"
    viewBox="0 0 65 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M60.9133 4H24.9133C24.9133 1.8 23.1133 0 20.9133 0H4.91333C2.71333 0 0.91333 1.8 0.91333 4V16C0.91333 18.2 2.71333 20 4.91333 20H60.9133C63.1133 20 64.9133 18.2 64.9133 16V8C64.9133 5.8 63.1133 4 60.9133 4Z"
      fill={color}
    />
    <path
      d="M56.9133 8H8.91333C6.71333 8 4.91333 9.8 4.91333 12V16C4.91333 18.2 6.71333 20 8.91333 20H56.9133C59.1133 20 60.9133 18.2 60.9133 16V12C60.9133 9.8 59.1133 8 56.9133 8Z"
      fill="white"
    />
    <path
      d="M60.9133 12H4.91333C2.71333 12 0.91333 13.8 0.91333 16V56C0.91333 58.2 2.71333 60 4.91333 60H60.9133C63.1133 60 64.9133 58.2 64.9133 56V16C64.9133 13.8 63.1133 12 60.9133 12Z"
      fill={color}
    />
  </svg>
);

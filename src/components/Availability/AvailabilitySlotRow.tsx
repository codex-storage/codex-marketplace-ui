import {
  Cell,
  Row,
  SimpleText,
} from "@codex-storage/marketplace-ui-components";
import { PrettyBytes } from "../../utils/bytes";
import "./AvailabilitySlotRow.css";
import { classnames } from "../../utils/classnames";
import { useEffect, useState } from "react";

type Props = {
  bytes: number;
  id: string;
  active: boolean;
};

export function AvailabilitySlotRow({ bytes, active, id }: Props) {
  const [className, setClassName] = useState("availabilitySlotRow--inactive");

  useEffect(() => {
    if (active) {
      setClassName("availabilitySlotRow--opening");

      setTimeout(() => {
        setClassName("availabilitySlotRow--active");
      }, 15);
    } else {
      setClassName("availabilitySlotRow--closing");

      setTimeout(() => {
        setClassName("availabilitySlotRow--inactive");
      }, 350);
    }
  }, [active]);

  return (
    <Row
      className={classnames(["availabilitySlotRow"], [className])}
      cells={[
        <Cell className="availabilitySlotRow-cell">
          <span></span>
        </Cell>,
        <Cell
          colSpan={6}
          className={classnames(
            ["availabilitySlotRow-cell"],
            ["availabilitySlotRow-cell--main"]
          )}>
          <div className={classnames(["availabilitySlotRow-cell-content"])}>
            <SlotIcon />
            <div>
              <div>
                <b>Slot {id}</b>
              </div>
              <SimpleText size="small" variant="light">
                {PrettyBytes(bytes)} allocated for the slot
              </SimpleText>
            </div>
          </div>
        </Cell>,
      ]}></Row>
  );
}

const SlotIcon = () => (
  <svg
    width="30"
    viewBox="0 0 65 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M60.9133 0H4.91333C2.71333 0 0.91333 1.8 0.91333 4V60C0.91333 62.2 2.71333 64 4.91333 64H60.9133C63.1133 64 64.9133 62.2 64.9133 60V4C64.9133 1.8 63.1133 0 60.9133 0Z"
      fill="#B59B77"
    />
    <path
      d="M26.9133 0V22C26.9133 23.1 27.8133 24 28.9133 24H36.9133C38.0133 24 38.9133 23.1 38.9133 22V0H26.9133Z"
      fill="#D5B98B"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M56.3133 44.6L50.3133 38.6C49.9133 38.2 49.5133 38 48.9133 38C48.3133 38 47.9133 38.2 47.5133 38.6L41.5133 44.6C41.1133 45 40.9133 45.4 40.9133 46C40.9133 47.1 41.8133 48 42.9133 48C43.5133 48 43.9133 47.8 44.3133 47.4L46.9133 44.8V54C46.9133 55.1 47.8133 56 48.9133 56C49.9133 56 50.9133 55.1 50.9133 54V44.8L53.5133 47.5C53.9133 47.8 54.3133 48 54.9133 48C56.0133 48 56.9133 47.1 56.9133 46C56.9133 45.4 56.7133 45 56.3133 44.6Z"
      fill="#865F3B"
    />
  </svg>
);

import { Pencil } from "lucide-react";
import "./AvailabilityActionsCell.css";
import { CodexAvailability } from "@codex-storage/sdk-js/async";
import { Cell } from "@codex-storage/marketplace-ui-components";

type Props = {
  availability: CodexAvailability;
  // onEdit: () => void;
};

/* eslint-disable @typescript-eslint/no-unused-vars */
export function AvailabilityActionsCell(_: Props) {
  // const onEditClick = async () => {
  //   const unit = availability.totalSize >= 1_000_000_000 ? "gb" : "mb";
  //   const totalSize =
  //     unit === "gb"
  //       ? availability.totalSize / 1_000_000_000
  //       : availability.totalSize / 1_000_000;

  //   await WebStorage.set("availability-step-1", {
  //     ...availability,
  //     totalSize,
  //     totalSizeUnit: unit,
  //   });

  //   onEdit();
  // };

  return (
    <Cell>
      <div className="availability-actions">
        <a className="cell--action availability-action" title="Reservations">
          <Pencil width={"1.25rem"} />
        </a>
      </div>
    </Cell>
  );
}

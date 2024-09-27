import { StretchHorizontal } from "lucide-react";
import "./AvailabilityActionsCell.css";
import { CodexAvailability } from "@codex-storage/sdk-js/async";

type Props = {
  availability: CodexAvailability;
  // onEdit: () => void;
  onReservationsShow: (availability: CodexAvailability) => void;
};

export function AvailabilityActionsCell({
  availability,
  // onEdit,
  onReservationsShow,
}: Props) {
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

  const onReservationsClick = () => onReservationsShow(availability);

  return (
    <div className="availability-actions">
      {/* <a
        className="cell--action availability-action"
        title="Edit"
        onClick={onEditClick}>
        <Pen width={"1.25rem"} />
      </a> */}

      <a
        className="cell--action availability-action"
        title="Reservations"
        onClick={onReservationsClick}>
        <StretchHorizontal width={"1.25rem"} />
      </a>
    </div>
  );
}

import "./AvailabilityActionsCell.css";
import { CodexAvailability } from "@codex-storage/sdk-js/async";
import { ButtonIcon, Cell } from "@codex-storage/marketplace-ui-components";
import EditIcon from "../../assets/icons/edit.svg?react";

type Props = {
  availability: CodexAvailability;
};

export function AvailabilityActionsCell({ availability }: Props) {
  const onEditClick = async () => {
    document.dispatchEvent(
      new CustomEvent("codexavailabilityedit", { detail: availability })
    );
  };

  return (
    <Cell>
      <div className="availability-actions">
        <ButtonIcon
          variant="small"
          onClick={onEditClick}
          Icon={EditIcon}></ButtonIcon>
      </div>
    </Cell>
  );
}

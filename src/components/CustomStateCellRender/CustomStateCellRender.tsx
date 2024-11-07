import { Cell, Tooltip } from "@codex-storage/marketplace-ui-components";
import PurchaseStateIcon from "../../assets/icons/purchases-state-pending.svg?react";
import SuccessCircleIcon from "../../assets/icons/success-circle.svg?react";
import ErrorCircleIcon from "../../assets/icons/error-circle.svg?react";

type Props = {
  state: string;
  message: string | undefined;
};

export const CustomStateCellRender = ({ state, message }: Props) => {
  const icons = {
    pending: PurchaseStateIcon,
    submitted: PurchaseStateIcon,
    started: PurchaseStateIcon,
    finished: SuccessCircleIcon,
    cancelled: ErrorCircleIcon,
    errored: ErrorCircleIcon,
  };

  const states = {
    cancelled: "error",
    errored: "error",
    pending: "warning",
    started: "loading",
    submitted: "loading",
    finished: "success",
  };

  const Icon = icons[state as keyof typeof icons] || PurchaseStateIcon;

  return (
    <Cell>
      <p
        className={
          "cell-state cell-state--custom cell-state--" +
          states[state as keyof typeof states]
        }>
        {message ? (
          <Tooltip message={message}>
            <Icon width={32} className="cell-stateIcon" />
          </Tooltip>
        ) : (
          <Icon width={32} className="cell-stateIcon" />
        )}
      </p>
    </Cell>
  );
};

import { CheckCircle, CircleDashed, ShieldAlert } from "lucide-react";
import "./CustomStateCellRender.css";
import { Cell, Tooltip } from "@codex-storage/marketplace-ui-components";

type Props = {
  state: string;
  message: string | undefined;
};

export const CustomStateCellRender = ({ state, message }: Props) => {
  const icons = {
    pending: CircleDashed,
    submitted: CircleDashed,
    started: CircleDashed,
    finished: CheckCircle,
    cancelled: ShieldAlert,
    errored: ShieldAlert,
  };

  const states = {
    cancelled: "error",
    errored: "error",
    pending: "warning",
    started: "loading",
    submitted: "loading",
    finished: "success",
  };

  const Icon = icons[state as keyof typeof icons] || CircleDashed;

  return (
    <Cell>
      <p
        className={
          "cell-state cell-state--custom cell-state--" +
          states[state as keyof typeof states]
        }>
        {message ? (
          <Tooltip message={message}>
            <Icon size={"1rem"} className="cell-stateIcon" />
          </Tooltip>
        ) : (
          <Icon size={"1rem"} className="cell-stateIcon" />
        )}

        <span>{state}</span>
      </p>
    </Cell>
  );
};

import { Cell, Row } from "@codex-storage/marketplace-ui-components";
import { PrettyBytes } from "../../utils/bytes";
import { classnames } from "../../utils/classnames";
import HardriveIcon from "../../assets/icons/hardrive.svg?react";

type Props = {
  bytes: number;
};

export function AvailabilityDiskRow({ bytes }: Props) {
  return (
    <Row
      cells={[
        <Cell>
          <span></span>
        </Cell>,
        <Cell colSpan={6}>
          <div className={classnames(["row gap"])}>
            <HardriveIcon />
            <div>
              <b>Node</b>
              <small>{PrettyBytes(bytes)} allocated for the node</small>
            </div>
          </div>
        </Cell>,
      ]}></Row>
  );
}

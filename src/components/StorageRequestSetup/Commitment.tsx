import { InputGroup, Tooltip } from "@codex-storage/marketplace-ui-components";
import "../CardNumbers/CardNumbers.css";
import "./Commitment.css";

import { ChangeEvent, useState } from "react";
import { classnames } from "../../utils/classnames";
import InfoIcon from "../../assets/icons/info.svg?react";
import { attributes } from "../../utils/attributes";

type Props = {
  unit: "months" | "days";
  value: string;
  onChange: (value: string, unit: "months" | "days") => void;
  onValidation?: (value: string) => string;
};

const TESTNET_MAX_VALUE = 7;

export function Commitment({ unit, value, onValidation, onChange }: Props) {
  const [error, setError] = useState("");

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    onValueOrUnitChange(e.currentTarget.value, unit);
  };
  const onUnitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onValueOrUnitChange(value, e.currentTarget.value as "months" | "days");
  };

  const onValueOrUnitChange = (val: string, unit: "months" | "days") => {
    onChange(val, unit);

    const msg = onValidation?.(val);

    if (msg) {
      setError(msg);
      return;
    }

    setError("");
  };

  return (
    <div
      className={classnames(["card-number cardNumber-container commitment"])}
      {...attributes({ "aria-invalid": !!error })}>
      <InputGroup
        id="duration"
        name="duration"
        type="number"
        label="Full period of the contract"
        isInvalid={!!error}
        onChange={onValueChange}
        onGroupChange={onUnitChange}
        value={value}
        min={0}
        max={TESTNET_MAX_VALUE}
        group={[
          ["days", "days"],
          // ["months", "months"],
        ]}
        groupValue={unit}
      />

      <Tooltip message={error || "The duration of the request in months"}>
        <InfoIcon></InfoIcon>
      </Tooltip>
      <span>{"Contract duration"}</span>
    </div>
  );
}

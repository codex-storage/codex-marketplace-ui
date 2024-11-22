import { Input, Tooltip } from "@codex-storage/marketplace-ui-components";
import "./CardNumbers.css";
import { ChangeEvent, useState } from "react";
import { classnames } from "../../utils/classnames";
import InfoIcon from "../../assets/icons/info.svg?react";
import { attributes } from "../../utils/attributes";

type Props = {
  unit: string;
  value: string;
  onChange: (value: string) => void;
  onValidation?: (value: string) => string;
  className?: string;
  title: string;
  id: string;
  helper: string;
};

export function CardNumbers({
  id,
  unit,
  value,
  onValidation,
  onChange,
  title,
  className = "",
  helper,
}: Props) {
  const [error, setError] = useState("");

  const onInternalChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value;
    onChange(e.currentTarget.value);

    const msg = onValidation?.(text);

    if (msg) {
      setError(msg);
      return;
    }

    setError("");
  };

  return (
    <div
      className={classnames(["card-number cardNumber-container"], [className])}
      {...attributes({ "aria-invalid": !!error })}>
      <Input
        id={id}
        label={title}
        value={value}
        type="number"
        isInvalid={!!error}
        onChange={onInternalChange}></Input>

      <Tooltip message={error || helper}>
        <InfoIcon></InfoIcon>
      </Tooltip>
      <span>{unit}</span>
    </div>
  );
}

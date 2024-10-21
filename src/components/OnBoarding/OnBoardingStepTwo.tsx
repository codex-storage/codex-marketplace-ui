import { Input } from "@codex-storage/marketplace-ui-components";
import { ChangeEvent, useState } from "react";

type Props = {
  onStepValid: (valid: boolean) => void;
};

export function OnBoardingStepTwo({ onStepValid }: Props) {
  const [displayName, setDisplayName] = useState("");

  const onDisplayNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.currentTarget.value);
    onStepValid(!!e.currentTarget.value);
  };

  return (
    <>
      <div className="index-column-section">
        <Input
          onChange={onDisplayNameChange}
          label="Display name"
          id="displayName"
          value={displayName}></Input>
      </div>
    </>
  );
}

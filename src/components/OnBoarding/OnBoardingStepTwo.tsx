import { Input, SimpleText } from "@codex-storage/marketplace-ui-components";
import { ChangeEvent, useState } from "react";
import { AlphaIcon } from "./AlphaIcon";
import "./OnBoardingStepTwo.css";
import { OnBoardingUtils } from "../../utils/onboarding";

type Props = {
  onStepValid: (valid: boolean) => void;
};

export function OnBoardingStepTwo({ onStepValid }: Props) {
  const [displayName, setDisplayName] = useState("");

  const onDisplayNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    OnBoardingUtils.setDisplayName(value);
    setDisplayName(value);
    onStepValid(!!value);
  };

  return (
    <>
      <div className="index-column-section onboarding--personalization-block">
        <div>
          <AlphaIcon variant="primary" />
        </div>
        <SimpleText variant="primary" className="onboarding-personalization">
          <span>Personalization</span>
        </SimpleText>
      </div>
      <div className="index-column-section">
        <h3 className="index-mainTitle">
          Let’s get you setup. <br />
          What do you want to be called?
        </h3>
        <div className="index-displayName">
          <Input
            onChange={onDisplayNameChange}
            label="Display name"
            id="displayName"
            value={displayName}></Input>
        </div>
      </div>
    </>
  );
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import "./index.css";
import { ArrowRightCircle } from "../components/ArrowRightCircle/ArrowRightCircle";
import { useNetwork } from "../network/useNetwork";
import { NetworkIcon } from "../components/NetworkIcon/NetworkIcon";
import { Logotype } from "../components/Logotype/Logotype";
import { useState } from "react";
import { OnBoardingStepOne } from "../components/OnBoarding/OnBoardingStepOne";
import { OnBoardingStepTwo } from "../components/OnBoarding/OnBoardingStepTwo";
import { classnames } from "../utils/classnames";
import { OnBoardingStepThree } from "../components/OnBoarding/OnBoardingStepThree";
import { attributes } from "../utils/attributes";
import { CodexLogo } from "../components/CodexLogo/CodexLogo";
import { OnBoardingImage } from "../components/OnBoarding/OnBoardingImage";

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: async () => {
    // throw redirect({
    //   to: "/dashboard",
    // });
  },
});

function Index() {
  const [isStepValid, setIsStepValid] = useState(true);
  const [step, setStep] = useState(0);
  const online = useNetwork();
  const navigate = useNavigate({ from: "/" });
  const onStepValid = (valid: boolean) => setIsStepValid(valid);

  const onNextStep = () => {
    if (!isStepValid) {
      return;
    }

    if (step === 2) {
      navigate({ to: "/dashboard" });
      return;
    }

    setStep(step + 1);
    setIsStepValid(false);
  };

  const components = [
    <OnBoardingStepOne onNextStep={onNextStep} />,
    <OnBoardingStepTwo onStepValid={onStepValid} />,
    <OnBoardingStepThree online={online} onStepValid={onStepValid} />,
  ];

  const text = online ? "Network connected" : "Network disconnected";

  return (
    <div className="index">
      <div className="index-container">
        <div className="index-column">
          <div className="index-column-section">
            <Logotype width={111} />
          </div>

          {components[step]}

          <div className=" ">
            <div className="index-dots">
              <span
                className={classnames(
                  ["index-dot"],
                  ["index-dot--active", step === 0]
                )}></span>
              <span
                className={classnames(
                  ["index-dot"],
                  ["index-dot--active", step === 1]
                )}></span>
              <span
                className={classnames(
                  ["index-dot"],
                  ["index-dot--active", step === 2]
                )}></span>
            </div>
          </div>
        </div>
        <div className="index-column">
          <OnBoardingImage />
        </div>
        <div className="index-columnRight">
          <div className="index-logo">
            <div className="index-network">
              <p className="index-network-text">{text}</p>
              <NetworkIcon active={online}></NetworkIcon>
            </div>
            <CodexLogo></CodexLogo>
          </div>
          <a
            className="index-link2"
            {...attributes({ "aria-disabled": !isStepValid })}
            onClick={onNextStep}>
            <ArrowRightCircle></ArrowRightCircle>
          </a>
        </div>
      </div>
    </div>
  );
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AlphaIcon } from "../components/OnBoarding/AlphaIcon";
import { OnBoardingLayout } from "../components/OnBoarding/OnBoardingLayout";
import { attributes } from "../utils/attributes";
import { ArrowRightCircle } from "../components/ArrowRightCircle/ArrowRightCircle";
import { UserInfo } from "../components/UserInfo/UserInfo";
import { WebStorage } from "../utils/web-storage";

const OnBoardingName = () => {
  const [isStepValid, setIsStepValid] = useState(
    !!WebStorage.onBoarding.getDisplayName()
  );
  const navigate = useNavigate({ from: "/onboarding-name" });

  const onNameChange = (value: string) => setIsStepValid(!!value);

  const onNextStep = () => {
    if (isStepValid) {
      navigate({ to: "/onboarding-checks" });
    }
  };

  return (
    <OnBoardingLayout defaultIsStepValid={false} step={1}>
      <>
        <section className="alpha">
          <div>
            <AlphaIcon variant="primary" />
          </div>
          <p>Personalization</p>
        </section>
        <section className="main">
          <h1>
            Let’s get you setup. <br />
            What do you want to be called?
          </h1>

          <UserInfo onNameChange={onNameChange} />
        </section>

        <a
          className="navigation"
          onClick={onNextStep}
          {...attributes({ "aria-disabled": !isStepValid })}>
          <ArrowRightCircle></ArrowRightCircle>
        </a>
      </>
    </OnBoardingLayout>
  );
};

export const Route = createFileRoute("/onboarding-name")({
  component: OnBoardingName,
});

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AlphaIcon } from "../components/OnBoarding/AlphaIcon";
import { attributes } from "../utils/attributes";
import { ArrowRightCircle } from "../components/ArrowRightCircle/ArrowRightCircle";
import { OnBoardingLayout } from "../components/OnBoarding/OnBoardingLayout";
import { HealthChecks } from "../components/HealthChecks/HealthChecks";
import { useNetwork } from "../network/useNetwork";
import { WebStorage } from "../utils/web-storage";

const OnBoardingChecks = () => {
  const online = useNetwork();
  const displayName = WebStorage.onBoarding.getDisplayName();
  const [isStepValid, setIsStepValid] = useState(false);
  const navigate = useNavigate({ from: "/onboarding-checks" });

  const onNextStep = () => {
    if (isStepValid) {
      navigate({ to: "/onboarding-checks" });
    }
  };

  const onStepValid = (valid: boolean) => setIsStepValid(valid);

  return (
    <OnBoardingLayout defaultIsStepValid={false} step={2}>
      <>
        <section className="alpha">
          <div>
            <AlphaIcon variant="primary" />
          </div>
          <p>
            Connection /<br />
            Device Health Check
          </p>
        </section>
        <section className="main">
          <h1>
            Nice to meet {displayName},<br />
            Let’s establish our connection.
          </h1>

          <HealthChecks
            online={online}
            onStepValid={onStepValid}></HealthChecks>
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

export const Route = createFileRoute("/onboarding-checks")({
  component: OnBoardingChecks,
});

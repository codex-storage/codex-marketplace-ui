import { useState } from "react";
import { attributes } from "../utils/attributes";
import ArrowRightCircle from "../assets/icons/arrow-circle.svg?react";
import { OnBoardingLayout } from "../components/OnBoarding/OnBoardingLayout";
import { HealthChecks } from "../components/HealthChecks/HealthChecks";
import { useNetwork } from "../network/useNetwork";
import { WebStorage } from "../utils/web-storage";
import AlphaIcon from "../assets/icons/alpha.svg?react";
import { useNavigate } from "react-router-dom";

export const OnBoardingChecksRoute = () => {
  const online = useNetwork();
  const displayName = WebStorage.onBoarding.getDisplayName();
  const [isStepValid, setIsStepValid] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const onKeyPress = (event: Event) => {
  //     const e = event as KeyboardEvent;
  //     if (e.key === "ArrowRight" && isStepValid) {
  //       navigate({ to: "/dashboard" });
  //     } else if (e.key === "ArrowLeft") {
  //       navigate({ to: "/onboarding-name" });
  //     }
  //   };

  //   document.addEventListener("keydown", onKeyPress);

  //   return () => document.removeEventListener("keydown", onKeyPress);
  // }, [navigate, isStepValid]);

  const onNextStep = () => {
    if (isStepValid) {
      navigate("/dashboard");
    }
  };

  const onStepValid = (valid: boolean) => setIsStepValid(valid);

  return (
    <OnBoardingLayout defaultIsStepValid={false} step={2}>
      <>
        <section className="alpha">
          <div>
            <AlphaIcon color="var(--codex-color-primary)" width={26} />
          </div>
          <p>
            Connection /<br />
            Device Health Check
          </p>
        </section>
        <section className="main">
          <h1>
            Nice to meet you {displayName},<br />
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

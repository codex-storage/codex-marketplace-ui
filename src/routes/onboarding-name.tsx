import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { OnBoardingLayout } from "../components/OnBoarding/OnBoardingLayout";
import { attributes } from "../utils/attributes";
import ArrowRightCircle from "../assets/icons/arrow-circle.svg?react";
import { UserInfo } from "../components/UserInfo/UserInfo";
import { WebStorage } from "../utils/web-storage";
import AlphaIcon from "../assets/icons/alpha.svg?react";

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

  // useEffect(() => {
  //   const onKeyPress = (event: Event) => {
  //     const e = event as KeyboardEvent;
  //     if (e.key === "ArrowRight") {
  //       navigate({ to: "/onboarding-checks" });
  //     } else if (e.key === "ArrowLeft") {
  //       navigate({ to: "/" });
  //     }
  //   };

  //   document.addEventListener("keydown", onKeyPress);

  //   return () => document.removeEventListener("keydown", onKeyPress);
  // }, [navigate]);

  return (
    <OnBoardingLayout defaultIsStepValid={false} step={1}>
      <>
        <section className="alpha">
          <div>
            <AlphaIcon color="var(--codex-color-primary)" width={26} />
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

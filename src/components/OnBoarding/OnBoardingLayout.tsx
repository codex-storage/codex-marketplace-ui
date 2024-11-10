import { ReactElement } from "react";
import { classnames } from "../../utils/classnames";
import Logotype from "../../assets/icons/logotype.svg?react";
import { attributes } from "../../utils/attributes";
import "./OnBoardingLayout.css";
import { BackgroundImage } from "../BackgroundImage/BackgroundImage";
import { useNavigate } from "@tanstack/react-router";

type Props = {
  children: ReactElement<{ onStepValid: (isValid: boolean) => void }>;
  step: number;
  defaultIsStepValid: boolean;
};

export function OnBoardingLayout({ children, step }: Props) {
  const navigate = useNavigate({ from: window.location.pathname });

  return (
    <div
      className={classnames(
        ["onboarding"],
        ["onboarding--first", step === 0],
        ["onboarding--second", step === 1],
        ["onboarding--third", step === 2]
      )}>
      <section>
        <div>
          <Logotype width={111} />
        </div>

        {children}

        <footer>
          <ul>
            <li
              {...attributes({ "aria-selected": step === 0 })}
              onClick={() => navigate({ to: "/" })}></li>
            <li
              {...attributes({ "aria-selected": step === 1 })}
              onClick={() => navigate({ to: "/onboarding-name" })}></li>
            <li
              {...attributes({ "aria-selected": step === 2 })}
              onClick={() => navigate({ to: "/onboarding-checks" })}></li>
          </ul>
        </footer>
      </section>
      <BackgroundImage />
    </div>
  );
}

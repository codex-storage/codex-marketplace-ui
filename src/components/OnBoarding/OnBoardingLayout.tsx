import { ReactElement } from "react";
import { classnames } from "../../utils/classnames";
import Logotype from "../../assets/icons/logotype.svg?react";
import { attributes } from "../../utils/attributes";
import "./OnBoardingLayout.css";
import { BackgroundImage } from "../BackgroundImage/BackgroundImage";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactElement<{ onStepValid: (isValid: boolean) => void }>;
  step: number;
  defaultIsStepValid: boolean;
};

export function OnBoardingLayout({ children, step }: Props) {
  const navigate = useNavigate();

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
              onClick={() => navigate("/")}></li>
            <li
              {...attributes({ "aria-selected": step === 1 })}
              onClick={() => navigate("/onboarding-name")}></li>
            <li
              {...attributes({ "aria-selected": step === 2 })}
              onClick={() => navigate("/onboarding-checks")}></li>
          </ul>
        </footer>
      </section>
      <BackgroundImage />
    </div>
  );
}

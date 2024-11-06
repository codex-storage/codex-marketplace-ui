import { ReactElement } from "react";
import { classnames } from "../../utils/classnames";
import Logotype from "../../assets/icons/logotype.svg?react";
import { attributes } from "../../utils/attributes";
import "./OnBoardingLayout.css";
import { BackgroundImage } from "../BackgroundImage/BackgroundImage";

type Props = {
  children: ReactElement<{ onStepValid: (isValid: boolean) => void }>;
  step: number;
  defaultIsStepValid: boolean;
};

export function OnBoardingLayout({ children, step }: Props) {
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
            <li {...attributes({ "aria-selected": step === 0 })}></li>
            <li {...attributes({ "aria-selected": step === 1 })}></li>
            <li {...attributes({ "aria-selected": step === 2 })}></li>
          </ul>
        </footer>
      </section>
      <BackgroundImage />
    </div>
  );
}

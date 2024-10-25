import { classnames } from "../../utils/classnames";
import { OnBoardingStatusIcon } from "./OnBoardingStatusIcon";
import "./HealthCheckItem.css";

type Props = {
  value: "success" | "failure" | "warning";
  text: string;
};

export function HealthCheckItem({ value, text }: Props) {
  return (
    <div
      data-testid="network"
      className={classnames(["onboarding-healthCheckItem"])}>
      <OnBoardingStatusIcon value={value} />
      <div>
        <p>{text}</p>
      </div>
    </div>
  );
}

import { ErrorCircleIcon } from "../ErrorCircleIcon/ErrorCircleIcon";
import { SuccessCheckIcon } from "../SuccessCheckIcon/SuccessCheckIcon";

type Props = {
  value: "success" | "failure" | "warning";
};

export function OnBoardingStatusIcon({ value }: Props) {
  switch (value) {
    case "success":
      return <SuccessCheckIcon variant="primary"></SuccessCheckIcon>;

    case "failure":
      return <ErrorCircleIcon />;

    case "warning":
      return (
        <span className="onboarding-healthCheck-icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 15.5C3.85775 15.5 0.5 12.1423 0.5 8C0.5 3.85775 3.85775 0.5 8 0.5C12.1423 0.5 15.5 3.85775 15.5 8C15.5 12.1423 12.1423 15.5 8 15.5ZM4.25 7.25V8.75H11.75V7.25H4.25Z"
              fill="#FF8447"
            />
          </svg>
        </span>
      );
  }
}

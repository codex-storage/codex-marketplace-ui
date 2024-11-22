import { Placeholder } from "@codex-storage/marketplace-ui-components";
import { AvailabilityComponentProps } from "./types";
import { useEffect } from "react";
import SuccessCircleIcon from "../../assets/icons/success-circle.svg?react";

export function AvailabilitySuccess({ dispatch }: AvailabilityComponentProps) {
  useEffect(() => {
    dispatch({
      type: "toggle-buttons",
      isNextEnable: true,
      isBackEnable: false,
    });
  }, [dispatch]);

  return (
    <Placeholder
      Icon={<SuccessCircleIcon width={40} height={40} />}
      title="Success"
      message="The new sale will appear in your sale list. You can safely close this dialog."></Placeholder>
  );
}

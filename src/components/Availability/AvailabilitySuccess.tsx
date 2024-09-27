import { Placeholder } from "@codex-storage/marketplace-ui-components";
import { SuccessIcon } from "../SuccessIcon/SuccessIcon";
import { AvailabilityComponentProps } from "./types";
import { useEffect } from "react";

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
      Icon={<SuccessIcon />}
      title="Success"
      message="The new sale will appear in your sale list. You can safely close this dialog."></Placeholder>
  );
}

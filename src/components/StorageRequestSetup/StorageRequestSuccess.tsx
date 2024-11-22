import { Placeholder } from "@codex-storage/marketplace-ui-components";
import "./StorageRequestSuccess.css";
import { StorageRequestComponentProps } from "./types";
import { useEffect } from "react";
import SuccessCircleIcon from "../../assets/icons/success-circle.svg?react";

export function StorageRequestSuccess({
  dispatch,
}: StorageRequestComponentProps) {
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
      className="storage-success"
      title="Your request is being processed."
      message="Processing your request may take some time. Once completed, it will
        appear in your purchase list. You can safely close this dialog."></Placeholder>
  );
}

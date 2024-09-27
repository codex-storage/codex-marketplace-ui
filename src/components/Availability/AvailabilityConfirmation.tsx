import "./AvailabilityForm.css";
import { AvailabilityComponentProps } from "./types";
import "./AvailabilityConfirm.css";
import { Info } from "lucide-react";
import { AvailabilitySpaceAllocation } from "./AvailabilitySpaceAllocation";
import { useEffect } from "react";

export function AvailabilityConfirm({
  dispatch,
  availability,
  space,
}: AvailabilityComponentProps) {
  useEffect(() => {
    dispatch({
      type: "toggle-buttons",
      isNextEnable: true,
      isBackEnable: true,
    });
  }, [dispatch]);

  return (
    <>
      <AvailabilitySpaceAllocation availability={availability} space={space} />

      <div className="availabilitConfirm-bottom">
        <div className="availabilitConfirm-iconContainer">
          <Info className="availabilitConfirm-icon" />
        </div>

        <div>
          <b className="availabilitConfirm-subtitle">Confirm your new sale</b>

          <p className="availabilitConfirm-message">
            By clicking 'Next', you will establish a new sale based on the space
            allocation specified above. Do you want to confirm ?
          </p>
        </div>
      </div>
    </>
  );
}

import "./AvailabilityConfirm.css";
import { AvailabilityComponentProps } from "./types";
import "./AvailabilityConfirm.css";
import { useEffect } from "react";
import { SpaceAllocation } from "@codex-storage/marketplace-ui-components";
import NodesIcon from "../../assets/icons/nodes.svg?react";
import InfoIcon from "../../assets/icons/info.svg?react";

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

  const { quotaMaxBytes, quotaReservedBytes, quotaUsedBytes } = space;
  const isUpdating = !!availability.id;
  const allocated = isUpdating
    ? quotaReservedBytes - availability.totalSize + quotaUsedBytes
    : quotaReservedBytes + quotaUsedBytes;
  const remaining =
    availability.totalSize > quotaMaxBytes - allocated
      ? quotaMaxBytes - allocated
      : quotaMaxBytes - allocated - availability.totalSize;

  return (
    <div className="availability-confirm">
      <header>
        <NodesIcon width={20}></NodesIcon>
        <h6>Disk</h6>
      </header>
      <SpaceAllocation
        data={[
          {
            title: "Allocated",
            size: space.quotaUsedBytes,
            color: "#FF6E61",
          },
          {
            title: "Available",
            size: space.quotaReservedBytes,
            color: "#34A0FF",
          },
          {
            title: "Free",
            size: remaining,
            color: "#6F6F6F",
          },
        ]}></SpaceAllocation>

      <div>
        <div>
          <InfoIcon />
        </div>

        <div>
          <b>Confirm your new sale</b>

          <p>
            By clicking 'Next', you will establish a new sale based on the space
            allocation specified above. Do you want to confirm ?
          </p>
        </div>
      </div>
    </div>
  );
}

import { CodexNodeSpace } from "@codex-storage/sdk-js";
import { AvailabilityState } from "./types";
import { GB, TB } from "../../utils/constants";
import { SpaceAllocation } from "@codex-storage/marketplace-ui-components";
import "./AvailabilitySpaceAllocation.css";
import { availabilityUnit } from "./availability.domain";

type Props = {
  space: CodexNodeSpace;
  availability: AvailabilityState;
};

export function AvailabilitySpaceAllocation({ availability, space }: Props) {
  const unit = availabilityUnit(availability.totalSizeUnit);
  const { quotaMaxBytes, quotaReservedBytes } = space;
  const size = availability.totalSize * unit;
  const isUpdating = !!availability.id;
  const allocated = isUpdating ? quotaReservedBytes - size : quotaReservedBytes;
  const remaining =
    size > quotaMaxBytes - allocated
      ? quotaMaxBytes - allocated
      : quotaMaxBytes - allocated - size;

  const spaceData = [
    {
      title: "Space allocated",
      size: allocated,
    },
    {
      title: "New space allocation",
      size: size,
    },
    {
      title: "Remaining space",
      size: remaining,
    },
  ];

  return (
    <>
      <b className="availabilitySpaceAllocation-title">Node space allocation</b>

      <SpaceAllocation data={spaceData} />
    </>
  );
}

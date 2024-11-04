import { CodexNodeSpace } from "@codex-storage/sdk-js";
import { AvailabilityState } from "./types";
import { SpaceAllocation } from "@codex-storage/marketplace-ui-components";
import "./AvailabilitySpaceAllocation.css";
import { nodeSpaceAllocationColors } from "../NodeSpace/nodeSpace.domain";

type Props = {
  space: CodexNodeSpace;
  availability: AvailabilityState;
};

export function AvailabilitySpaceAllocation({ availability, space }: Props) {
  const { quotaMaxBytes, quotaReservedBytes, quotaUsedBytes } = space;
  const isUpdating = !!availability.id;
  const allocated = isUpdating
    ? quotaReservedBytes - availability.totalSize + quotaUsedBytes
    : quotaReservedBytes + quotaUsedBytes;
  const remaining =
    availability.totalSize > quotaMaxBytes - allocated
      ? quotaMaxBytes - allocated
      : quotaMaxBytes - allocated - availability.totalSize;

  const spaceData = [
    {
      title: "Space allocated",
      size: Math.trunc(allocated),
      color: nodeSpaceAllocationColors[0],
    },
    {
      title: "New space allocation",
      size: Math.trunc(availability.totalSize),
      color: nodeSpaceAllocationColors[1],
    },
    {
      title: "Remaining space",
      size: Math.trunc(remaining),
      color: nodeSpaceAllocationColors[nodeSpaceAllocationColors.length - 1],
    },
  ];

  return (
    <>
      <b className="availabilitySpaceAllocation-title">Node space allocation</b>

      <SpaceAllocation data={spaceData} />
    </>
  );
}

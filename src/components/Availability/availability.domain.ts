import { CodexNodeSpace } from "@codex-storage/sdk-js";
import { GB, TB } from "../../utils/constants";
import { AvailabilityState } from "./types";

export const availabilityUnit = (unit: "gb" | "tb") =>
  unit === "gb" ? GB : TB;

export const availabilityMax = (space: CodexNodeSpace) =>
  space.quotaMaxBytes - space.quotaReservedBytes - space.quotaUsedBytes;

export const isAvailabilityValid = (
  availability: AvailabilityState,
  max: number
) => {
  const unit = availabilityUnit(availability.totalSizeUnit);
  const size = parseFloat(availability.totalSize.toString()) * unit;

  return size > 0 && size <= max;
};

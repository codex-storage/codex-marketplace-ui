import { CodexNodeSpace } from "@codex-storage/sdk-js";
import { GB, TB } from "../../utils/constants";
import { AvailabilityState } from "./types";

export class AvailabilityDomain {
  space: CodexNodeSpace
  state: AvailabilityState

  constructor(space: CodexNodeSpace, availability: AvailabilityState) {
    this.space = space
    this.state = availability
  }

  get unitInBytes() {
    return this.state.totalSizeUnit === "gb" ? GB : TB;
  }

  get unit() {
    return this.state.totalSizeUnit;
  }

  get sizeInUnit() {
    return this.state.totalSize
  }

  get maxInBytes() {
    return this.space.quotaMaxBytes - this.space.quotaReservedBytes - this.space.quotaUsedBytes
  }

  get maxInUnit() {
    return this.maxInBytes / this.unitInBytes / this.unitInBytes
  }

  isValid() {
    const size = this.state.totalSize * this.unitInBytes;

    return size > 0 && size <= this.maxInBytes;
  }
}

export const isAvailabilityValid = (
  availability: AvailabilityState,
  max: number
) => availability.totalSize > 0 && availability.totalSize <= max;



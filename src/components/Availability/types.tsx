import {
  StepperAction,
  StepperState,
} from "@codex-storage/marketplace-ui-components";
import {
  CodexAvailability,
  CodexNodeSpace,
  CodexReservation,
} from "@codex-storage/sdk-js";
import { Dispatch } from "react";

export type AvailabilityState = {
  id?: string;
  totalSize: number;
  duration: number;
  durationUnit: "hours" | "days" | "months";
  minPrice: number;
  maxCollateral: number;
  totalSizeUnit: "gb" | "tb";
  name?: string;
};

export type AvailabilityComponentProps = {
  dispatch: Dispatch<StepperAction>;
  state: StepperState;
  space: CodexNodeSpace;
  onAvailabilityChange: (data: Partial<AvailabilityState>) => void;
  availability: AvailabilityState;
  error: Error | null;
  editAvailabilityValue?: number;
};

export type AvailabilityWithSlots = CodexAvailability & {
  name: string;
  slots: CodexReservation[];
};

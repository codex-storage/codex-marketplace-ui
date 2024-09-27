import {
  StepperAction,
  StepperState,
} from "@codex-storage/marketplace-ui-components";
import { Dispatch } from "react";

export type StorageDurabilityStepValue = {
  tolerance: number;
  proofProbability: number;
  nodes: number;
};

export type StoragePriceStepValue = {
  reward: number;
  collateral: number;
  expiration: number;
};

export type StorageAvailabilityUnit =
  | "days"
  | "months"
  | "years"
  | "minutes"
  | "hours";

export type StorageAvailabilityValue = {
  value: number;
  unit: StorageAvailabilityUnit;
};

export type AvailabilityUnit =
  | "days"
  | "months"
  | "years"
  | "minutes"
  | "hours";

export type StorageRequest = {
  cid: string;
  availability: number;
  availabilityUnit: AvailabilityUnit;
  tolerance: number;
  proofProbability: number;
  nodes: number;
  reward: number;
  collateral: number;
  expiration: number;
};

export type StorageRequestComponentProps = {
  dispatch: Dispatch<StepperAction>;
  state: StepperState;
  onStorageRequestChange: (data: Partial<StorageRequest>) => void;
  storageRequest: StorageRequest;
  error: Error | null;
};

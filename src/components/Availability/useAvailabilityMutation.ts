import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GB, TB } from "../../utils/constants";
import { Promises } from "../../utils/promises";
import { WebStorage } from "../../utils/web-storage";
import { AvailabilityState } from "./types";
import { Dispatch, useState } from "react";
import {
  StepperAction,
  StepperState,
} from "@codex-storage/marketplace-ui-components";
import * as Sentry from "@sentry/browser";
import { SafeValue } from "@codex-storage/sdk-js/async";
import { Times } from "../../utils/times";
import { CodexSdk } from "../../sdk/codex";

export function useAvailabilityMutation(
  dispatch: Dispatch<StepperAction>,
  state: StepperState
) {
  const queryClient = useQueryClient();
  const [error, setError] = useState<Error | null>(null);

  const { mutateAsync } = useMutation({
    mutationFn: ({
      totalSize,
      totalSizeUnit,
      duration,
      durationUnit = "days",
      ...input
    }: AvailabilityState) => {
      const unit = totalSizeUnit === "gb" ? GB : TB;
      const marketplace = CodexSdk.marketplace;
      const time = Times.toSeconds(duration, durationUnit);

      const fn: (
        input: Omit<AvailabilityState, "totalSizeUnit" | "durationUnit">
      ) => Promise<SafeValue<unknown>> = input.id
        ? (input) =>
            marketplace.updateAvailability({ ...input, id: input.id || "" })
        : (input) => marketplace.createAvailability(input);

      return fn({
        ...input,
        duration: time,
        totalSize: Math.trunc(totalSize * unit),
      }).then((s) => Promises.rejectOnError(s));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["availabilities"] });
      queryClient.invalidateQueries({ queryKey: ["space"] });

      WebStorage.delete("availability");
      WebStorage.delete("availability-step");

      setError(null);

      dispatch({
        type: "next",
        step: state.step,
      });
    },
    onError: (error) => {
      if (import.meta.env.PROD) {
        Sentry.captureException(error);
      }

      setError(error);

      WebStorage.set("availability-step", state.step - 1);

      dispatch({
        type: "next",
        step: state.step,
      });
    },
  });

  return { mutateAsync, error };
}

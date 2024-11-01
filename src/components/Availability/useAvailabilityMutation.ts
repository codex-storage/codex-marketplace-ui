import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Promises } from "../../utils/promises";
import { WebStorage } from "../../utils/web-storage";
import { AvailabilityState } from "./types";
import { Dispatch, useState } from "react";
import {
  StepperAction,
  StepperState,
} from "@codex-storage/marketplace-ui-components";
import { Times } from "../../utils/times";
import { CodexSdk } from "../../sdk/codex";
import { CodexAvailabilityCreateResponse } from "@codex-storage/sdk-js";


export function useAvailabilityMutation(
  dispatch: Dispatch<StepperAction>,
  state: StepperState
) {
  const queryClient = useQueryClient();
  const [error, setError] = useState<Error | null>(null);

  const { mutateAsync } = useMutation({
    /* eslint-disable @typescript-eslint/no-unused-vars */
    mutationFn: ({
      totalSize,
      totalSizeUnit,
      duration,
      durationUnit = "days",
      name,
      ...input
    }: AvailabilityState) => {
      const time = Times.toSeconds(duration, durationUnit);

      const fn: (
        input: Omit<AvailabilityState, "totalSizeUnit" | "durationUnit">
      ) => Promise<"" | CodexAvailabilityCreateResponse> = input.id
          ? (input) =>
            CodexSdk.marketplace()
              .updateAvailability({ ...input, id: input.id || "" })
              .then((s) => Promises.rejectOnError(s))
          : (input) =>
            CodexSdk.marketplace()
              .createAvailability(input)
              .then((s) => Promises.rejectOnError(s));

      return fn({
        ...input,
        duration: time,
        totalSize: Math.trunc(totalSize),
      });
    },
    onSuccess: (res, body) => {
      queryClient.invalidateQueries({ queryKey: ["availabilities"] });
      queryClient.invalidateQueries({ queryKey: ["space"] });

      WebStorage.delete("availability");
      WebStorage.delete("availability-step");

      if (typeof res === "object" && body.name) {
        WebStorage.availabilities.add(res.id, body.name)
      }

      setError(null);

      dispatch({
        type: "next",
        step: state.step,
      });
    },
    onError: (error) => {
      setError(error);

      WebStorage.set("availability-step", state.step - 1);

      dispatch({
        type: "next",
        step: state.step,
      });
    },

    throwOnError: false,
  });

  return { mutateAsync, error };
}

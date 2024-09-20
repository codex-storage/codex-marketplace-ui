import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CodexSdk } from "../../proxy";
import { GB, TB } from "../../utils/constants";
import { Promises } from "../../utils/promises";
import { WebStorage } from "../../utils/web-storage";
import { UIAvailability } from "./types";
import { Dispatch, useState } from "react";
import {
  StepperAction,
  StepperState,
} from "@codex-storage/marketplace-ui-components";
import * as Sentry from "@sentry/browser";
import { SafeValue } from "@codex-storage/sdk-js/async";
import { Times } from "../../utils/times";

export function useAvailabilityMutation(
  dispatch: Dispatch<StepperAction>,
  state: StepperState
) {
  const queryClient = useQueryClient();
  const [toast, setToast] = useState({
    time: 0,
    message: "",
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["debug"],
    mutationFn: ({
      totalSize,
      totalSizeUnit,
      duration,
      durationUnit = "days",
      ...input
    }: UIAvailability) => {
      const unit = totalSizeUnit === "gb" ? GB : TB;
      const marketplace = CodexSdk.marketplace;
      const time = Times.toMs(duration, durationUnit);

      const fn: (
        input: Omit<UIAvailability, "totalSizeUnit" | "durationUnit">
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

      dispatch({
        type: "next",
        step: state.step,
      });
    },
    onError: (error) => {
      if (import.meta.env.PROD) {
        Sentry.captureException(error);
      }

      setToast({
        message: "Error when trying to update: " + error.message,
        time: Date.now(),
      });
    },
  });

  return { mutateAsync, toast };
}

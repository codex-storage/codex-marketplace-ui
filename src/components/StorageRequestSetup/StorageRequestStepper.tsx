import { StorageRequestFileChooser } from "../../components/StorageRequestSetup/StorageRequestFileChooser";
import { useCallback, useEffect, useRef, useState } from "react";
import { WebStorage } from "../../utils/web-storage";
import { STEPPER_DURATION } from "../../utils/constants";
import { StorageRequestReview } from "./StorageRequestReview";
import { CodexCreateStorageRequestInput } from "@codex-storage/sdk-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CodexSdk } from "../../sdk/codex";
import { StorageAvailabilityUnit } from "./types";
import {
  Backdrop,
  Stepper,
  Toast,
} from "@codex-storage/marketplace-ui-components";
import { classnames } from "../../utils/classnames";
import { StorageRequestDone } from "./StorageRequestDone";
import { PurchaseStorage } from "../../utils/purchases-storage";
import { Promises } from "../../utils/promises";
import * as Sentry from "@sentry/browser";

function calculateAvailability(value: number, unit: StorageAvailabilityUnit) {
  switch (unit) {
    case "minutes":
      return 60 * value;
    case "hours":
      return 60 * 60 * value;
    case "days":
      return 24 * 60 * 60 * value;
    case "months":
      return 30 * 24 * 60 * 60 * value;
    case "years":
      return 365 * 24 * 60 * 60 * value;
  }
}

type Props = {
  open: boolean;
  onClose: () => void;
  className?: string;
};

const UPLOAD_STEP = 0;
const SUCCESS_STEP = 2;

export function StorageRequestStepper({ className, open, onClose }: Props) {
  const [progress, setProgress] = useState(true);
  const [step, setStep] = useState(0);
  const steps = useRef(["File", "Criteria", "Success"]);
  const [isNextDisable, setIsNextDisable] = useState(true);
  const queryClient = useQueryClient();
  const [toast, setToast] = useState({
    time: 0,
    message: "",
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["debug"],
    mutationFn: (input: CodexCreateStorageRequestInput) =>
      CodexSdk.marketplace
        .createStorageRequest(input)
        .then((s) => Promises.rejectOnError(s)),
    onSuccess: async (requestId, { cid }) => {
      queryClient.invalidateQueries({ queryKey: ["purchases"] });

      if (!requestId.startsWith("0x")) {
        requestId = "0x" + requestId;
      }

      PurchaseStorage.set(requestId, cid);
      WebStorage.set("storage-request-step", SUCCESS_STEP);

      setProgress(false);
      setStep(SUCCESS_STEP);
    },
    onError: (error) => {
      if (import.meta.env.PROD) {
        Sentry.captureException(error);
      }

      setProgress(false);
      setToast({
        message: "Error when trying to update: " + error.message,
        time: Date.now(),
      });
    },
  });

  useEffect(() => {
    WebStorage.get<number>("storage-request-step").then((value) => {
      setStep(value || 0);

      setTimeout(() => {
        setProgress(false);
      }, STEPPER_DURATION);
    });
  }, []);

  const onChangeNextState = useCallback(
    (s: "enable" | "disable") => setIsNextDisable(s === "disable"),
    []
  );

  const components = [
    StorageRequestFileChooser,
    StorageRequestReview,
    StorageRequestDone,
  ];

  const onChangeStep = async (nextStep: number, state: "before" | "end") => {
    if (nextStep < UPLOAD_STEP) {
      setStep(0);
      setIsNextDisable(true);
      setProgress(false);
      onClose();
      return;
    }

    if (state === "before") {
      setIsNextDisable(true);
      setProgress(true);
      setStep(nextStep);
      return;
    }

    if (nextStep > SUCCESS_STEP) {
      WebStorage.delete("storage-request-step");
      WebStorage.delete("storage-request-criteria");

      setIsNextDisable(true);
      setProgress(false);
      setStep(0);

      onClose();

      return;
    }

    if (nextStep == SUCCESS_STEP) {
      const [cid, criteria] = await Promise.all([
        WebStorage.get<string>("storage-request-step-1"),
        // TODO define criteria interface
        // eslint-disable-next-line
        WebStorage.get<any>("storage-request-criteria"),
      ]);

      if (!cid || !criteria) {
        return;
      }

      const {
        availabilityUnit = "days",
        availability,
        reward,
        collateral,
        expiration,
        nodes,
        proofProbability,
        tolerance,
      } = criteria;

      mutateAsync({
        cid,
        collateral,
        duration: calculateAvailability(availability, availabilityUnit),
        expiry: expiration * 60,
        nodes,
        proofProbability,
        tolerance,
        reward,
      });
      // TODO When the thread bug will be fixed,
      // move to the next step without waiting the end of the request
      // and add a line into the table
    } else {
      WebStorage.set("storage-request-step", nextStep);

      setProgress(false);
    }
  };

  const Body = progress ? () => <span /> : components[step] || components[0];

  return (
    <>
      <Backdrop open={open} onClose={onClose} removeScroll={true} />
      <div
        className={classnames(
          ["storageRequest"],
          ["storageRequest-open", open],
          [className || ""]
        )}>
        <Stepper
          titles={steps.current}
          Body={<Body onChangeNextState={onChangeNextState} />}
          step={step}
          onChangeStep={onChangeStep}
          progress={progress}
          isNextDisable={progress || isNextDisable}></Stepper>
      </div>

      <Toast message={toast.message} time={toast.time} variant="error" />
    </>
  );
}

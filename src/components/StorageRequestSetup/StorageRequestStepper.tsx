import { StorageRequestFileChooser } from "../../components/StorageRequestSetup/StorageRequestFileChooser";
import { useEffect, useRef, useState } from "react";
import { WebStorage } from "../../utils/web-storage";
import { STEPPER_DURATION } from "../../utils/constants";
import { StorageRequestReview } from "./StorageRequestReview";
import { StorageRequest } from "./types";
import {
  Button,
  Modal,
  Stepper,
  useStepperReducer,
} from "@codex-storage/marketplace-ui-components";
import { StorageRequestDone } from "./StorageRequestDone";
import { Times } from "../../utils/times";
import { useStorageRequestMutation } from "./useStorageRequestMutation";
import { Plus } from "lucide-react";
import "./StorageRequestStepper.css";
import { StorageRequestError } from "./StorageRequestError";

const CONFIRM_STATE = 2;

const defaultStorageRequest: StorageRequest = {
  cid: "",
  availabilityUnit: "days",
  availability: 1,
  tolerance: 1,
  proofProbability: 1,
  nodes: 3,
  reward: 10,
  collateral: 10,
  expiration: 300,
};

export function StorageRequestStepper() {
  const [storageRequest, setStorageRequest] = useState<StorageRequest>(
    defaultStorageRequest
  );
  const steps = useRef(["File", "Criteria", "Success"]);
  const { state, dispatch } = useStepperReducer();
  const { mutateAsync, error } = useStorageRequestMutation(dispatch, state);

  useEffect(() => {
    Promise.all([
      WebStorage.get<number>("storage-request-step"),
      WebStorage.get<StorageRequest>("storage-request"),
    ]).then(([s, data]) => {
      if (s) {
        dispatch({
          type: "next",
          step: s,
        });
      }

      if (data) {
        setStorageRequest(data);
      }
    });
  }, [dispatch]);

  const components = [
    StorageRequestFileChooser,
    StorageRequestReview,
    error ? StorageRequestError : StorageRequestDone,
  ];

  const onNextStep = async (step: number) => {
    if (step === components.length) {
      setStorageRequest(defaultStorageRequest);

      dispatch({
        step: 0,
        type: "next",
      });

      dispatch({
        type: "close",
      });

      return;
    }

    WebStorage.set("storage-request-step", step);

    if (step == CONFIRM_STATE) {
      const { availabilityUnit, availability, expiration, ...rest } =
        storageRequest;
      mutateAsync({
        ...rest,
        duration: Times.toSeconds(availability, availabilityUnit),
        expiry: expiration,
      });
    } else {
      dispatch({
        step,
        type: "next",
      });
    }
  };

  const onStorageRequestChange = (data: Partial<StorageRequest>) => {
    const val = { ...storageRequest, ...data };

    WebStorage.set("storage-request", val);

    setStorageRequest(val);
  };

  const onOpen = () =>
    dispatch({
      type: "open",
    });

  const onClose = () => dispatch({ type: "close" });

  const Body = components[state.step] || (() => <span />);
  const backLabel = state.step ? "Back" : "Close";
  const nextLabel = state.step === steps.current.length - 1 ? "Finish" : "Next";

  return (
    <>
      <Button
        label="Storage Request"
        Icon={Plus}
        onClick={onOpen}
        variant="primary"
      />

      <Modal open={state.open} onClose={onClose} displayCloseButton={false}>
        <Stepper
          titles={steps.current}
          state={state}
          dispatch={dispatch}
          duration={STEPPER_DURATION}
          onNextStep={onNextStep}
          backLabel={backLabel}
          className="storageRequest-stepper"
          nextLabel={nextLabel}>
          <Body
            dispatch={dispatch}
            state={state}
            onStorageRequestChange={onStorageRequestChange}
            storageRequest={storageRequest}
            error={error}
          />
        </Stepper>
      </Modal>
    </>
  );
}

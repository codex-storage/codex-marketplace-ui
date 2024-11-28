import { StorageRequestFileChooser } from "./StorageRequestFileChooser";
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
import { StorageRequestSuccess } from "./StorageRequestSuccess";
import { Times } from "../../utils/times";
import { useStorageRequestMutation } from "./useStorageRequestMutation";
import "./StorageRequestCreate.css";
import { StorageRequestError } from "./StorageRequestError";
import PurchaseIcon from "../../assets/icons/purchase.svg?react";
import PlusIcon from "../../assets/icons/plus.svg?react";

const CONFIRM_STATE = 2;

const defaultStorageRequest: StorageRequest = {
  cid: "",
  availability: 1,
  availabilityUnit: "days",
  tolerance: 1,
  proofProbability: 1,
  nodes: 3,
  reward: 10,
  collateral: 10,
  expiration: 5,
};

export function StorageRequestCreate() {
  const [storageRequest, setStorageRequest] = useState<StorageRequest>(
    defaultStorageRequest
  );
  const steps = useRef(["Select File", "Select Request Criteria", "Success"]);
  const { state, dispatch } = useStepperReducer();
  const { mutateAsync, error } = useStorageRequestMutation(dispatch, state);

  useEffect(() => {
    Promise.all([
      WebStorage.get<number>("storage-request-step"),
      WebStorage.get<StorageRequest>("storage-request-3"),
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
    error ? StorageRequestError : StorageRequestSuccess,
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
      const { availability, availabilityUnit, expiration, ...rest } =
        storageRequest;
      mutateAsync({
        ...rest,
        duration: availability * Times.value(availabilityUnit),
        expiry: expiration * 60,
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

    WebStorage.set("storage-request-3", val);

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
    <div className="storage-request">
      <Button
        label="Storage Request"
        Icon={() => <PlusIcon width={24}></PlusIcon>}
        onClick={onOpen}
        variant="outline"
        size="small"
      />

      <Modal
        title="Storage request"
        Icon={PurchaseIcon}
        open={state.open}
        onClose={onClose}
        displayCloseButton={false}>
        <Stepper
          titles={steps.current}
          state={state}
          dispatch={dispatch}
          duration={STEPPER_DURATION}
          onNextStep={onNextStep}
          backLabel={backLabel}
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
    </div>
  );
}

import {
  Stepper,
  useStepperReducer,
  Button,
  Modal,
} from "@codex-storage/marketplace-ui-components";
import { useEffect, useRef, useState } from "react";
import { AvailabilityForm } from "./AvailabilityForm";
import { Pencil, Plus } from "lucide-react";
import { CodexNodeSpace } from "@codex-storage/sdk-js";
import { AvailabilityConfirm } from "./AvailabilityConfirmation";
import { WebStorage } from "../../utils/web-storage";
import { AvailabilityState } from "./types";
import { STEPPER_DURATION } from "../../utils/constants";
import { useAvailabilityMutation } from "./useAvailabilityMutation";
import { AvailabilitySuccess } from "./AvailabilitySuccess";
import { AvailabilityError } from "./AvailabilityError";
import "./AvailabilityEdit.css";

type Props = {
  space: CodexNodeSpace;
  hasLabel?: boolean;
  className?: string;
};

const CONFIRM_STATE = 2;

const defaultAvailabilityData: AvailabilityState = {
  totalSize: 1,
  duration: 1,
  minPrice: 0,
  maxCollateral: 0,
  totalSizeUnit: "gb",
  durationUnit: "days",
};

export function AvailabilityEdit({
  space,
  className = "",
  hasLabel = true,
}: Props) {
  const steps = useRef(["Sale", "Confirmation", "Success"]);
  const [availability, setAvailability] = useState<AvailabilityState>(
    defaultAvailabilityData
  );
  const { state, dispatch } = useStepperReducer();
  const { mutateAsync, error } = useAvailabilityMutation(dispatch, state);
  const [availabilityId, setAvailabilityId] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      WebStorage.get<number>("availability-step"),
      WebStorage.get<AvailabilityState>("availability"),
    ]).then(([s, a]) => {
      if (s) {
        dispatch({
          type: "next",
          step: s,
        });
      }

      if (a) {
        setAvailability(a);
      }
    });
  }, [dispatch]);

  // We use a custom event to not re render the sunburst component
  useEffect(() => {
    const onAvailabilityIdChange = (e: Event) => {
      const custom = e as CustomEvent;
      setAvailabilityId(custom.detail);
    };

    document.addEventListener(
      "codexavailabilityid",
      onAvailabilityIdChange,
      false
    );

    return () =>
      document.removeEventListener(
        "codexavailabilityid",
        onAvailabilityIdChange
      );
  }, []);

  const components = [
    AvailabilityForm,
    AvailabilityConfirm,
    error ? AvailabilityError : AvailabilitySuccess,
  ];

  const onNextStep = async (step: number) => {
    if (step === components.length) {
      setAvailability(defaultAvailabilityData);

      dispatch({
        step: 0,
        type: "next",
      });

      dispatch({
        type: "close",
      });

      return;
    }

    WebStorage.set("availability-step", step);

    if (step == CONFIRM_STATE) {
      mutateAsync(availability);
    } else {
      dispatch({
        step,
        type: "next",
      });
    }
  };

  const onAvailabilityChange = (data: Partial<AvailabilityState>) => {
    const val = { ...availability, ...data };

    WebStorage.set("availability", val);

    setAvailability(val);
  };

  const onOpen = () => {
    if (availability.id) {
      WebStorage.set("availability-step", 0);
      WebStorage.set("availability", defaultAvailabilityData);

      setAvailability(defaultAvailabilityData);
    }

    dispatch({
      type: "open",
    });

    dispatch({
      step: 0,
      type: "next",
    });
  };

  const onClose = () => dispatch({ type: "close" });

  const Body = components[state.step] || (() => <span />);
  const backLabel = state.step ? "Back" : "Close";
  const nextLabel = state.step === steps.current.length - 1 ? "Finish" : "Next";

  return (
    <>
      <Button
        label={hasLabel ? "Sale" : ""}
        Icon={!availabilityId ? Plus : Pencil}
        onClick={onOpen}
        variant="primary"
        className={className}
      />

      <Modal open={state.open} onClose={onClose} displayCloseButton={false}>
        <Stepper
          className="availabilityCreate"
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
            onAvailabilityChange={onAvailabilityChange}
            availability={availability}
            space={space}
            error={error}
          />
        </Stepper>
      </Modal>
    </>
  );
}

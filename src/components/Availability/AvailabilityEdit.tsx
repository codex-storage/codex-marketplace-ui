import {
  Stepper,
  useStepperReducer,
  Button,
  Modal,
} from "@codex-storage/marketplace-ui-components";
import { useCallback, useEffect, useRef, useState } from "react";
import { AvailabilityForm } from "./AvailabilityForm";
import { CodexNodeSpace } from "@codex-storage/sdk-js";
import { AvailabilityConfirm } from "./AvailabilityConfirmation";
import { WebStorage } from "../../utils/web-storage";
import { AvailabilityState } from "./types";
import { GB, STEPPER_DURATION } from "../../utils/constants";
import { useAvailabilityMutation } from "./useAvailabilityMutation";
import { AvailabilitySuccess } from "./AvailabilitySuccess";
import { AvailabilityError } from "./AvailabilityError";
import "./AvailabilityEdit.css";
import PlusIcon from "../../assets/icons/plus.svg?react";
import HostIcon from "../../assets/icons/host.svg?react";
import { Times } from "../../utils/times";

type Props = {
  space: CodexNodeSpace;
  hasLabel?: boolean;
  className?: string;
};

const CONFIRM_STATE = 2;

const defaultAvailabilityData: AvailabilityState = {
  totalSize: 0.5 * GB,
  duration: Times.unitValue("days"),
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
  const [availability, setAvailability] = useState<
    AvailabilityState & { slots?: unknown }
  >(defaultAvailabilityData);
  const { state, dispatch } = useStepperReducer();
  const { mutateAsync, error } = useAvailabilityMutation(dispatch, state);
  const editAvailabilityValue = useRef(0);

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
  // useEffect(() => {
  //   const onAvailabilityIdChange = (e: Event) => {
  //     const custom = e as CustomEvent;
  //     setAvailabilityId(custom.detail);
  //   };

  //   document.addEventListener(
  //     "codexavailabilityid",
  //     onAvailabilityIdChange,
  //     false
  //   );

  //   return () =>
  //     document.removeEventListener(
  //       "codexavailabilityid",
  //       onAvailabilityIdChange
  //     );
  // }, []);

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
      /* eslint-disable @typescript-eslint/no-unused-vars */
      const { slots, name, ...rest } = availability;
      mutateAsync(rest);
    } else {
      dispatch({
        step,
        type: "next",
      });
    }
  };

  const onAvailabilityChange = (data: Partial<AvailabilityState>) => {
    const val = { ...availability, ...data };

    setAvailability(val);
  };

  const onOpen = useCallback(() => {
    setAvailability(defaultAvailabilityData);
    editAvailabilityValue.current = 0;

    dispatch({
      type: "open",
    });

    dispatch({
      step: 0,
      type: "next",
    });
  }, [editAvailabilityValue, dispatch]);

  useEffect(() => {
    document.addEventListener("codexavailabilitycreate", onOpen, false);

    return () =>
      document.removeEventListener("codexavailabilitycreate", onOpen);
  }, [onOpen]);

  const onEdit = useCallback(
    (event: Event) => {
      const e = event as CustomEvent<AvailabilityState>;
      const a = e.detail;

      editAvailabilityValue.current = a.totalSize;
      WebStorage.set("availability-step", 0);
      WebStorage.set("availability", a);

      const unit = Times.unit(a.duration);

      setAvailability({
        ...a,
        durationUnit: unit as "hours" | "days" | "months",
      });

      dispatch({
        type: "open",
      });

      dispatch({
        step: 0,
        type: "next",
      });
    },
    [editAvailabilityValue, dispatch]
  );

  useEffect(() => {
    document.addEventListener("codexavailabilityedit", onEdit, false);

    return () => document.removeEventListener("codexavailabilityedit", onEdit);
  }, [onEdit, dispatch]);

  const onClose = () => dispatch({ type: "close" });

  const Body = components[state.step] || (() => <span />);
  const backLabel = state.step ? "Back" : "Close";
  const nextLabel = state.step === steps.current.length - 1 ? "Finish" : "Next";

  return (
    <>
      <div className="availability-edit">
        <Button
          label={hasLabel ? "Sale" : ""}
          Icon={() => <PlusIcon width={40} fill="#000" />}
          onClick={onOpen}
          variant="outline"
          className={className}
        />

        <Modal
          open={state.open}
          onClose={onClose}
          title="Availability"
          Icon={HostIcon}>
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
              onAvailabilityChange={onAvailabilityChange}
              availability={availability}
              space={space}
              error={error}
              editAvailabilityValue={editAvailabilityValue.current}
            />
          </Stepper>
        </Modal>
      </div>
    </>
  );
}

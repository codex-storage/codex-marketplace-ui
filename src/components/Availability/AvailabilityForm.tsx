import { Input, InputGroup } from "@codex-storage/marketplace-ui-components";
import { ChangeEvent, useEffect } from "react";
import "./AvailabilityForm.css";
import { AvailabilityComponentProps } from "./types";
import { classnames } from "../../utils/classnames";
import { AvailabilitySpaceAllocation } from "./AvailabilitySpaceAllocation";
import { availabilityMax, isAvailabilityValid } from "./availability.domain";

export function AvailabilityForm({
  dispatch,
  onAvailabilityChange,
  availability,
  space,
}: AvailabilityComponentProps) {
  useEffect(() => {
    const max = availabilityMax(space);
    const isValid = isAvailabilityValid(availability, max);

    dispatch({
      type: "toggle-buttons",
      isNextEnable: isValid,
      isBackEnable: true,
    });
  }, [dispatch, space, availability]);

  const onTotalSizeUnitChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const element = e.currentTarget;

    onAvailabilityChange({
      totalSize: 0,
      totalSizeUnit: element.value as "tb" | "gb",
    });
  };

  const onDurationUnitChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const element = e.currentTarget;

    onAvailabilityChange({
      duration: 1,
      durationUnit: element.value as "hours" | "days" | "months",
    });
  };

  const onAvailablityChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const element = e.currentTarget;
    const v = element.value;

    onAvailabilityChange({
      [element.name]: v,
    });
  };

  const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const element = e.currentTarget;

    onAvailabilityChange({
      [element.name]: parseFloat(element.value),
    });
  };

  const max = availabilityMax(space);
  const isValid = isAvailabilityValid(availability, max);

  const helper = isValid
    ? "Total size of sale's storage in bytes"
    : "The total size cannot exceed the space available.";

  return (
    <>
      <AvailabilitySpaceAllocation availability={availability} space={space} />

      <InputGroup
        id="totalSize"
        name="totalSize"
        type="number"
        label="Total size"
        helper={helper}
        className={classnames(
          ["availabilityForm-item"],
          ["availabilityForm-item--error", !isValid]
        )}
        inputClassName="availabilityForm-itemInput"
        min={0.01}
        max={max.toFixed(2)}
        onChange={onAvailablityChange}
        onGroupChange={onTotalSizeUnitChange}
        value={availability.totalSize.toString()}
        step={"0.01"}
        group={[
          ["gb", "GB"],
          ["tb", "TB"],
        ]}
        groupValue={availability.totalSizeUnit}
      />

      <div className="availabilityForm-item">
        <InputGroup
          id="duration"
          name="duration"
          type="number"
          label="Duration"
          helper="The duration of the request in seconds"
          inputClassName="availabilityForm-itemInput"
          min={1}
          onChange={onInputChange}
          onGroupChange={onDurationUnitChange}
          group={[
            ["hours", "Hours"],
            ["days", "Days"],
            ["months", "Months"],
          ]}
          value={availability.duration.toString()}
          groupValue={availability.durationUnit}
        />
      </div>

      <div className="availabilityForm-row">
        <div className="availabilityForm-item">
          <Input
            id="minPrice"
            name="minPrice"
            type="number"
            label="Min price"
            min={0}
            helper="Minimum price to be paid (in amount of tokens)"
            inputClassName="availabilityForm-itemInput"
            onChange={onInputChange}
            value={availability.minPrice.toString()}
          />
        </div>

        <div className="availabilityForm-item">
          <Input
            id="maxCollateral"
            name="maxCollateral"
            type="number"
            label="Max collateral"
            min={0}
            helper="Maximum collateral user is willing to pay per filled Slot (in amount of tokens)"
            inputClassName="availabilityForm-itemInput"
            onChange={onInputChange}
            value={availability.maxCollateral.toString()}
          />
        </div>
      </div>
    </>
  );
}

import {
  Input,
  InputGroup,
  SpaceAllocation,
  Tooltip,
} from "@codex-storage/marketplace-ui-components";
import { ChangeEvent, useEffect } from "react";
import "./AvailabilityForm.css";
import { AvailabilityComponentProps } from "./types";
import NodesIcon from "../../assets/icons/nodes.svg?react";
import InfoIcon from "../../assets/icons/info.svg?react";
import { attributes } from "../../utils/attributes";
import { AvailabilityUtils } from "./availability.utils";
import { Times } from "../../utils/times";

export function AvailabilityForm({
  dispatch,
  onAvailabilityChange,
  availability,
  space,
  editAvailabilityValue,
}: AvailabilityComponentProps) {
  useEffect(() => {
    let max = AvailabilityUtils.maxValue(space);
    if (availability.id && editAvailabilityValue) {
      max += editAvailabilityValue;
    }

    const isValid = AvailabilityUtils.isValid(availability, max);

    dispatch({
      type: "toggle-buttons",
      isNextEnable: isValid,
      isBackEnable: true,
    });
  }, [dispatch, space, availability, editAvailabilityValue]);

  const onTotalSizeUnitChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const element = e.currentTarget;

    onAvailabilityChange({
      totalSize: 0,
      totalSizeUnit: element.value as "tb" | "gb",
    });
  };

  const onDurationChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const element = e.currentTarget;
    const unitValue = Times.unitValue(availability.durationUnit);

    onAvailabilityChange({
      duration: parseInt(element.value) * unitValue,
    });
  };

  const onDurationUnitChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const element = e.currentTarget;
    const unit = element.value as "hours" | "days" | "months";
    const unitValue = Times.unitValue(unit);

    onAvailabilityChange({
      duration: unitValue,
      durationUnit: unit,
    });
  };

  const onAvailablityChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const element = e.currentTarget;
    const v = element.value;
    const unit = AvailabilityUtils.unitValue(availability.totalSizeUnit);

    onAvailabilityChange({
      totalSize: parseFloat(v) * unit,
    });
  };

  const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const element = e.currentTarget;

    onAvailabilityChange({
      [element.name]:
        element.name === "name" ? element.value : parseFloat(element.value),
    });
  };

  const onMaxSize = () => {
    const available = AvailabilityUtils.maxValue(space);

    onAvailabilityChange({
      totalSize: available,
    });
  };

  let available = AvailabilityUtils.maxValue(space);
  if (availability.id && editAvailabilityValue) {
    available += editAvailabilityValue;
  }

  const isValid =
    availability.totalSize > 0 && available >= availability.totalSize;

  const helper = isValid
    ? "Total size of sale's storage in bytes"
    : "The total size cannot exceed the space available.";

  const value = AvailabilityUtils.toUnit(
    availability.totalSize,
    availability.totalSizeUnit
  ).toFixed(2);

  const unitValue = Times.unitValue(availability.durationUnit);
  const duration = availability.duration / unitValue;

  return (
    <div className="availability-form">
      <header>
        <NodesIcon width={20}></NodesIcon>
        <h6>Disk</h6>
      </header>
      <SpaceAllocation
        data={[
          {
            title: "Allocated",
            size: space.quotaUsedBytes,
            color: "#FF6E61",
          },
          {
            title: "Available",
            size: space.quotaReservedBytes,
            color: "#34A0FF",
          },
          {
            title: "Free",
            size: isValid ? available - availability.totalSize : available,
            color: "#6F6F6F",
          },
        ]}></SpaceAllocation>

      <div className="row gap">
        <div className="group" {...attributes({ "aria-invalid": !isValid })}>
          <InputGroup
            id="totalSize"
            name="totalSize"
            type="number"
            label="Total size"
            min={0.01}
            isInvalid={!isValid}
            max={available.toFixed(2)}
            onChange={onAvailablityChange}
            onGroupChange={onTotalSizeUnitChange}
            step={"0.01"}
            value={value}
            group={[
              ["gb", "GB"],
              // ["tb", "TB"],
            ]}
            groupValue={availability.totalSizeUnit}
            extra={<a onClick={onMaxSize}>Use max size</a>}
          />
          <Tooltip message={helper}>
            <InfoIcon></InfoIcon>
          </Tooltip>
        </div>

        <div className="group">
          <InputGroup
            id="duration"
            name="duration"
            type="number"
            label="Duration"
            min={1}
            onChange={onDurationChange}
            onGroupChange={onDurationUnitChange}
            group={[
              ["hours", "Hours"],
              ["days", "Days"],
              ["months", "Months"],
            ]}
            value={duration.toString()}
            groupValue={availability.durationUnit}
          />
          <Tooltip message={"The duration of the request in seconds"}>
            <InfoIcon></InfoIcon>
          </Tooltip>
        </div>
      </div>

      <div className="row gap">
        <div className="group">
          <Input
            id="minPrice"
            name="minPrice"
            type="number"
            label="Min price"
            min={0}
            onChange={onInputChange}
            value={availability.minPrice.toString()}
          />
          <Tooltip message={"Minimum price to be paid (in amount of tokens)"}>
            <InfoIcon></InfoIcon>
          </Tooltip>
        </div>

        <div className="group">
          <Input
            id="maxCollateral"
            name="maxCollateral"
            type="number"
            label="Max collateral"
            min={0}
            onChange={onInputChange}
            value={availability.maxCollateral.toString()}
          />
          <Tooltip
            message={
              "Maximum collateral user is willing to pay per filled Slot (in amount of tokens)"
            }>
            <InfoIcon></InfoIcon>
          </Tooltip>
        </div>
      </div>

      <div className="group">
        <Input
          id="name"
          name="name"
          type="string"
          label="Nickname"
          max={9}
          onChange={onInputChange}
          value={availability.name?.toString() || ""}
          maxLength={9}
          autoComplete="falsep"
        />
        <Tooltip
          message={"You can add a custom name to easily retrieve your sale."}>
          <InfoIcon></InfoIcon>
        </Tooltip>
      </div>
    </div>
  );
}

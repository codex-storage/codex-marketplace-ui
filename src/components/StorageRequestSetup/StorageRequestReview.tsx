import { useCallback, useEffect, useState } from "react";
import "./StorageRequestReview.css";
import { Alert } from "@codex-storage/marketplace-ui-components";
import { CardNumbers } from "../CardNumbers/CardNumbers";
import { FileWarning } from "lucide-react";
import { classnames } from "../../utils/classnames";
import {
  AvailabilityUnit,
  StorageRequest,
  StorageRequestComponentProps,
} from "./types";

type Durability = {
  nodes: number;
  tolerance: number;
  proofProbability: number;
};

const durabilities = [
  { nodes: 3, tolerance: 1, proofProbability: 2 },
  { nodes: 4, tolerance: 2, proofProbability: 3 },
  { nodes: 5, tolerance: 2, proofProbability: 4 },
];

const findDurabilityIndex = (d: Durability) => {
  const s = JSON.stringify({
    nodes: d.nodes,
    tolerance: d.tolerance,
    proofProbability: d.proofProbability,
  });

  return durabilities.findIndex((d) => JSON.stringify(d) === s);
};

const units = ["days", "minutes", "hours", "days", "months", "years"];

export function StorageRequestReview({
  dispatch,
  onStorageRequestChange,
  storageRequest,
}: StorageRequestComponentProps) {
  const [durability, setDurability] = useState<number>(1);

  const isInvalidConstrainst = useCallback(
    (nodes: number, tolerance: number) => {
      const ecK = nodes - tolerance;
      const ecM = tolerance;

      return ecK <= 1 || ecK < ecM;
    },
    []
  );

  useEffect(() => {
    const invalid = isInvalidConstrainst(
      storageRequest.nodes,
      storageRequest.tolerance
    );

    dispatch({
      type: "toggle-buttons",
      isNextEnable: !invalid,
      isBackEnable: true,
    });
  }, [isInvalidConstrainst, dispatch, storageRequest]);

  const onUpdateDurability = (data: Partial<StorageRequest>) => {
    onStorageRequestChange(data);

    const index = findDurabilityIndex({
      nodes: storageRequest.nodes,
      tolerance: storageRequest.tolerance,
      proofProbability: storageRequest.proofProbability,
    });

    setDurability(index + 1);
  };

  const onDurabilityChange = (d: number) => {
    const durability = durabilities[d - 1];

    if (durability) {
      onStorageRequestChange(durability);
      setDurability(d);
    } else {
      setDurability(0);
    }
  };

  const isInvalidNodes = (nodes: string) => {
    const error = isInvalidNumber(nodes);

    if (error) {
      return error;
    }

    const n = Number(nodes);

    if (isInvalidConstrainst(n, storageRequest.tolerance)) {
      return "The data does not match Codex contrainst";
    }

    return "";
  };

  const isInvalidTolerance = (tolerance: string) => {
    const error = isInvalidNumber(tolerance);

    if (error) {
      return error;
    }

    const n = Number(tolerance);

    if (n > storageRequest.nodes) {
      return "The tolerance cannot be greater than the nodes.";
    }

    if (isInvalidConstrainst(storageRequest.nodes, n)) {
      return "The data does not match Codex contrainst.";
    }

    return "";
  };

  const isInvalidAvailability = (data: string) => {
    const [value, unit = "days"] = data.split(" ");

    const error = isInvalidNumber(value);

    if (error) {
      return error;
    }

    // if (!unit.endsWith("s")) {
    //   unit += "s";
    // }

    if (!units.includes(unit)) {
      return "Invalid unit must one of: minutes, hours, days, months, years";
    }

    return "";
  };

  const isInvalidNumber = (value: string) =>
    isNaN(Number(value)) ? "The value is not a number" : "";

  const onNodesChange = (value: string) =>
    onUpdateDurability({ nodes: Number(value) });

  const onToleranceChange = (value: string) =>
    onUpdateDurability({ tolerance: Number(value) });

  const onProofProbabilityChange = (value: string) =>
    onUpdateDurability({ proofProbability: Number(value) });

  const onAvailabilityChange = (value: string) => {
    const [availability, availabilityUnit = "days"] = value.split(" ");

    // if (!availabilityUnit.endsWith("s")) {
    //   availabilityUnit += "s";
    // }

    onStorageRequestChange({
      availability: Number(availability),
      availabilityUnit: availabilityUnit as AvailabilityUnit,
    });
  };

  const onRewardChange = (value: string) =>
    onStorageRequestChange({ reward: Number(value) });

  const onExpirationChange = (value: string) =>
    onStorageRequestChange({ expiration: Number(value) });

  const onCollateralChange = (value: string) =>
    onStorageRequestChange({ collateral: Number(value) });

  // const pluralizeUnit = () => {
  //   if (data.availability > 1 && !data.availabilityUnit.endsWith("s")) {
  //     return data.availability + " " +data.availabilityUnit + "s";
  //   }

  //   if (data.availability <= 1 && data.availabilityUnit.endsWith("s")) {
  //     return data.availabilityUnit.slice(0, -1);
  //   }

  //   return data.availabilityUnit;
  // };

  const availability = `${storageRequest.availability} ${storageRequest.availabilityUnit}`;

  return (
    <div>
      <span className="storageRequest-title">Durability</span>
      <div className="storageRequestReview-numbers">
        <CardNumbers
          title={"Nodes"}
          data={storageRequest.nodes.toString()}
          onChange={onNodesChange}
          onValidation={isInvalidNodes}
          helper="Number of storage nodes"></CardNumbers>
        <CardNumbers
          title={"Tolerance"}
          data={storageRequest.tolerance.toString()}
          onChange={onToleranceChange}
          onValidation={isInvalidTolerance}
          helper="Failure node tolerated"></CardNumbers>
        <CardNumbers
          title={"Proof probability"}
          data={storageRequest.proofProbability.toString()}
          onChange={onProofProbabilityChange}
          helper="Proof request frequency"></CardNumbers>
      </div>

      <div className="storageRequestReview-presets">
        <div className="storageRequestReview-presets-title">
          <b>Define your durability profile</b>
          <p>
            Select the appropriate level of data storage reliability ensuring
            your information is protected and accessible.
          </p>
        </div>
        <div className="storageRequestReview-presets-blocs">
          <div
            onClick={() => onDurabilityChange(0)}
            className={classnames(
              ["storageRequestReview-presets-bloc"],
              [
                "storageRequestReview-presets--selected",
                durability <= 0 || durability > 3,
              ]
            )}>
            <div className="storageRequestReview-presets-blocIcon">
              <img src="/shape-1.png" width={48} />
            </div>
            <p>Custom</p>
          </div>
          <div
            onClick={() => onDurabilityChange(1)}
            className={classnames(
              ["storageRequestReview-presets-bloc"],
              ["storageRequestReview-presets--selected", durability === 1]
            )}>
            <div className="storageRequestReview-presets-blocIcon">
              <img src="/shape-2.png" width={48} />
            </div>
            <p>Low</p>
          </div>
          <div
            onClick={() => onDurabilityChange(2)}
            className={classnames(
              ["storageRequestReview-presets-bloc"],
              ["storageRequestReview-presets--selected", durability === 2]
            )}>
            <div className="storageRequestReview-presets-blocIcon">
              <img src="/shape-3.png" width={48} />
            </div>
            <p>Medium</p>
          </div>
          <div
            onClick={() => onDurabilityChange(3)}
            className={classnames(
              ["storageRequestReview-presets-bloc"],
              ["storageRequestReview-presets--selected", durability === 3]
            )}>
            <div className="storageRequestReview-presets-blocIcon">
              <img src="/shape-4.png" width={48} />
            </div>
            <p>High</p>
          </div>
        </div>
      </div>

      {/* <Range
        onChange={onDurabilityRangeChange}
        className={classnames(
          ["storageRequestReview-range"],
          ["storageRequestReview-range--disabled", durability === 0]
        )}
        labels={["Weak", "Low", "Medium", "High", "Confident"]}
        max={5}
        label=""
        value={durability}
      /> */}

      <span className="storageRequest-title">Commitment</span>

      <div className="storageRequestReview-numbers">
        <CardNumbers
          title={"Contract duration"}
          data={availability}
          onChange={onAvailabilityChange}
          onValidation={isInvalidAvailability}
          repositionCaret={false}
          helper="Full period of the contract"></CardNumbers>
        <CardNumbers
          title={"Collateral"}
          data={storageRequest.collateral.toString()}
          onChange={onCollateralChange}
          onValidation={isInvalidNumber}
          helper="Reward tokens for hosts"></CardNumbers>
        <CardNumbers
          title={"Reward"}
          data={storageRequest.reward.toString()}
          onChange={onRewardChange}
          onValidation={isInvalidNumber}
          helper="Penality tokens"></CardNumbers>
        <div className="storageRequest-price"></div>
        {/* <Range
          className={classnames(
            ["storageRequestReview-range"],
            ["storageRequestReview-range--disabled", price === 0]
          )}
          labels={["Low", "Average", "Attractive"]}
          max={100}
          label=""
          onChange={onPriceRangeChange}
        /> */}
      </div>

      <hr className="storageRequestReview-hr" />

      <div className="storageRequestReview-alert">
        <CardNumbers
          title={"Expiration"}
          data={storageRequest.expiration.toString()}
          onChange={onExpirationChange}
          className="storageRequestReview-expiration"
          onValidation={isInvalidNumber}
          helper="Request expiration in seconds"></CardNumbers>
        <Alert
          Icon={<FileWarning />}
          title="Warning"
          variant="warning"
          className="storageRequestReview-alert">
          If no suitable hosts are found for the CID {storageRequest.cid}{" "}
          matching your storage requirements, you will incur a charge a small
          amount of tokens.
        </Alert>
      </div>
    </div>
  );
}

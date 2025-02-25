import "./PeersQuality.css";
import SuccessCircleIcon from "../../assets/icons/success-circle.svg?react";
import ErrorCircleIcon from "../../assets/icons/error-circle.svg?react";

type Props = {
  good: boolean;
};

export function PeersQuality({ good }: Props) {
  if (good) {
    return (
      <div className="peers-quality">
        <SuccessCircleIcon width={20}></SuccessCircleIcon>
        <span>Peer connections in good standing. </span>
      </div>
    );
  }

  return (
    <div className="peers-quality">
      <ErrorCircleIcon width={16} />
      <span>No peer connection active. </span>
    </div>
  );
}

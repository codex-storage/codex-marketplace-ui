import { ErrorCircleIcon } from "../ErrorCircleIcon/ErrorCircleIcon";
import { SuccessCheckIcon } from "../SuccessCheckIcon/SuccessCheckIcon";
import "./PeersQuality.css";

type Props = {
  good: boolean;
};

export function PeersQuality({ good }: Props) {
  if (good) {
    return (
      <div className="peers-quality">
        <SuccessCheckIcon variant="primary"></SuccessCheckIcon>
        <span>Peer connections in good standing. </span>
      </div>
    );
  }

  return (
    <div className="peers-quality">
      <ErrorCircleIcon />
      <span>No peer connection active. </span>
    </div>
  );
}

import { useNetwork } from "../../network/useNetwork";
import { NetworkFlashIcon } from "../NetworkFlashIcon/NetworkFlashIcon";
import "./HttpNetworkIndicator.css";

export function HttpNetworkIndicator() {
  const online = useNetwork();

  return (
    <div className="network-indicator">
      <div className="network-indicator-icon">
        <NetworkFlashIcon online={online} />
      </div>
      <span className="network-indicator-text">Network</span>
    </div>
  );
}

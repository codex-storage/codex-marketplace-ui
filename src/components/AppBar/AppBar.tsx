import "./appBar.css";
import { classnames } from "../../utils/classnames";
import { useNetwork } from "../../network/useNetwork";
import { useQueryClient } from "@tanstack/react-query";
import { ReactElement, useEffect } from "react";
import { useCodexConnection } from "../../hooks/useCodexConnection";
import { usePersistence } from "../../hooks/usePersistence";
import { useLocation, useNavigate } from "@tanstack/react-router";
import DashboardIcon from "../../assets/icons/dashboard.svg?react";
import PeersIcon from "../../assets/icons/peers.svg?react";
import NodesIcon from "../../assets/icons/nodes.svg?react";
import FilesIcon from "../../assets/icons/files.svg?react";
import LogsIcon from "../../assets/icons/logs.svg?react";
import HostIcon from "../../assets/icons/host.svg?react";
import SettingsIcon from "../../assets/icons/settings.svg?react";
import WalletIcon from "../../assets/icons/wallet.svg?react";
import NetworkFlashIcon from "../../assets/icons/flash.svg?react";
import PurchasesIcon from "../../assets/icons/purchase.svg?react";
import HelpIcon from "../../assets/icons/help.svg?react";
import DisclaimerIcon from "../../assets/icons/disclaimer.svg?react";
import { WalletConnect } from "../WalletLogin/WalletLogin";

type Props = {
  onIconClick: () => void;
};

const icons: Record<string, ReactElement> = {
  dashboard: <DashboardIcon />,
  peers: <PeersIcon width={24} />,
  settings: <SettingsIcon width={24} />,
  files: <FilesIcon width={24} />,
  logs: <LogsIcon width={24} />,
  availabilities: <HostIcon width={24} />,
  wallet: <WalletIcon width={24} />,
  purchases: <PurchasesIcon width={24} />,
  help: <HelpIcon width={24} />,
  disclaimer: <DisclaimerIcon width={24} />,
};

const descriptions: Record<string, string> = {
  dashboard: "Get Overview of your Codex Vault.",
  peers: "Monitor your Codex peer connections.",
  settings: "Manage your Codex Vault.",
  files: "Manage your files in your local vault.",
  logs: "Manage your logs and debug console.",
  availabilities: "Manage your host data.",
  wallet: "Manage your Codex wallet.",
  purchases: "Manage your storage requests.",
  help: "Quick help resources.",
  disclaimer: "Important information.",
};

export function AppBar({ onIconClick }: Props) {
  const online = useNetwork();
  const queryClient = useQueryClient();
  const codex = useCodexConnection();
  const persistence = usePersistence(codex.enabled);
  const location = useLocation();
  const navigate = useNavigate({ from: location.pathname });

  useEffect(() => {
    queryClient.invalidateQueries({
      type: "active",
      refetchType: "all",
    });
  }, [queryClient, codex.enabled]);

  const offline = !online || !codex.enabled;

  const onNodeClick = () => navigate({ to: "/dashboard/settings" });

  const title =
    location.pathname.split("/")[2] || location.pathname.split("/")[1];
  const networkIconColor = online
    ? "#3EE089"
    : "var(--codex-input-color-error)";
  const nodesIconColor =
    codex.enabled === false
      ? "var(--codex-input-color-error)"
      : persistence.enabled
        ? "#3EE089"
        : "var(--codex-input-color-warning)";

  return (
    <>
      <div
        className={classnames(
          ["app-bar"],
          ["app-bar--offline", offline],
          ["app-bar--no-persistence", !persistence.enabled]
        )}>
        <div className="row gap">
          <span onClick={onIconClick}>{icons[title]}</span>

          <div>
            <h1>{title}</h1>
            <h2>{descriptions[title]}</h2>
          </div>
        </div>
        <aside className="row gap">
          <WalletConnect></WalletConnect>
          <div className="row gap">
            <NetworkFlashIcon color={networkIconColor} />
            <span>Network</span>
          </div>
          <div className="row gap" onClick={onNodeClick}>
            <NodesIcon color={nodesIconColor} width={20} />
            <span>Node</span>
          </div>
        </aside>
      </div>
    </>
  );
}

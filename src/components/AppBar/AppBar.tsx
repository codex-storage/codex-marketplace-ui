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
import NetworkFlashIcon from "../../assets/icons/flash.svg?react";
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
};

const descriptions: Record<string, string> = {
  dashboard: "Get Overview of your Codex Vault.",
  peers: "Monitor your Codex peer connections.",
  settings: "Manage your Codex Vault.",
  files: "Manage your files in your local vault.",
  logs: "Manage your logs and debug console.",
  availabilities: "Manage your host data.",
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
            <NetworkFlashIcon />
            <span>Network</span>
          </div>
          <div className="row gap" onClick={onNodeClick}>
            <NodesIcon color="var(--codex-color-primary)" width={20} />
            <span>Node</span>
          </div>
        </aside>
      </div>
    </>
  );
}

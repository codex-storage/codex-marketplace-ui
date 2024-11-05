import "./appBar.css";
import { DashboardIcon } from "../DashboardIcon/DashboardIcon";
import { classnames } from "../../utils/classnames";
import { useNetwork } from "../../network/useNetwork";
import { NetworkFlashIcon } from "../NetworkFlashIcon/NetworkFlashIcon";
import { useQueryClient } from "@tanstack/react-query";
import { ReactElement, useEffect } from "react";
import { useCodexConnection } from "../../hooks/useCodexConnection";
import { NodesIcon } from "../Menu/NodesIcon";
import { usePersistence } from "../../hooks/usePersistence";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { PeersIcon } from "../Menu/PeersIcon";
import { SettingsIcon } from "../Menu/SettingsIcon";
import { FilesIcon } from "../FilesIcon/FilesIcon";
import { LogsIcon } from "../Menu/LogsIcon";

type Props = {
  onIconClick: () => void;
};

const icons: Record<string, ReactElement> = {
  dashboard: <DashboardIcon />,
  peers: <PeersIcon />,
  settings: <SettingsIcon />,
  files: <FilesIcon />,
  logs: <LogsIcon />,
};

const descriptions: Record<string, string> = {
  dashboard: "Get Overview of your Codex Vault.",
  peers: "Monitor your Codex peer connections.",
  settings: "Manage your Codex Vault.",
  files: "Manage your files in your local vault.",
  logs: "Manage your logs and debug console.",
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
          {/* <a className="appBar-burger" onClick={onExpand}>
          <Menu size={"1.25rem"} />
        </a> */}

          <span onClick={onIconClick}>{icons[title]}</span>

          <div>
            <h1>{title}</h1>
            <h2>{descriptions[title]}</h2>
          </div>
        </div>
        <aside className="row gap">
          <div className="row gap">
            <NetworkFlashIcon />
            <span>Network</span>
          </div>
          <div className="row gap" onClick={onNodeClick}>
            <NodesIcon variant={codex.enabled ? "success" : "failure"} />
            <span>Node</span>
          </div>
        </aside>
      </div>
    </>
  );
}

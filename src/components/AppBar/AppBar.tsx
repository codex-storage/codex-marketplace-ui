import "./appBar.css";
import { DashboardIcon } from "../DashboardIcon/DashboardIcon";
import { classnames } from "../../utils/classnames";
import { useNetwork } from "../../network/useNetwork";
import { NetworkFlashIcon } from "../NetworkFlashIcon/NetworkFlashIcon";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useCodexConnection } from "../../hooks/useCodexConnection";
import { NodesIcon } from "../Menu/NodesIcon";
import { usePersistence } from "../../hooks/usePersistence";

type Props = {
  /**
   * Event triggered when the menu is expanding, after a click on the
   * menu button.
   */
  onExpand: () => void;
};

export function AppBar(_: Props) {
  console.debug(_);
  const online = useNetwork();
  const queryClient = useQueryClient();
  const codex = useCodexConnection();
  const persistence = usePersistence(codex.enabled);

  useEffect(() => {
    queryClient.invalidateQueries({
      type: "active",
      refetchType: "all",
    });
  }, [queryClient, codex.enabled]);

  const offline = !online || !codex.enabled;

  return (
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

        <span>
          <DashboardIcon />
        </span>

        <div>
          <h1>Dashboard</h1>
          <h2>Get Overview of your Codex Vault</h2>
        </div>
      </div>
      <aside className="row gap">
        <div className="row gap">
          <NetworkFlashIcon />
          <span>Network</span>
        </div>
        <div className="row gap">
          <NodesIcon variant={codex.enabled ? "success" : "failure"} />
          <span>Node</span>
        </div>
      </aside>
    </div>
  );
}

import "./appBar.css";
import { DashboardIcon } from "../DashboardIcon/DashboardIcon";
import { NodeIndicator } from "../NodeIndicator/NodeIndicator";
import { HttpNetworkIndicator } from "../HttpNetworkIndicator/HttpNetworkIndicator";

type Props = {
  /**
   * Event triggered when the menu is expanding, after a click on the
   * menu button.
   */
  onExpand: () => void;
};

export function AppBar(props: Props) {
  console.info(props);
  return (
    <div className="appBar">
      <div className="appBar-left">
        {/* <a className="appBar-burger" onClick={onExpand}>
          <Menu size={"1.25rem"} />
        </a> */}

        <div className="appBar-icon">
          <DashboardIcon />
        </div>
        <div className="appBar-textContainer">
          <div className="appBar-title">Dashboard</div>
          <div className="appBar-subtitle">
            Get Overview of your Codex Vault
          </div>
        </div>
      </div>
      <div className="appBar-right">
        <HttpNetworkIndicator />
        <NodeIndicator />
      </div>
    </div>
  );
}

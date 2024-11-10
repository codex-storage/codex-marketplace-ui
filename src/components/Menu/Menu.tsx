import { attributes } from "../../utils/attributes";
import "./menu.css";
import { ComponentType, useState } from "react";
import { classnames } from "../../utils/classnames";
import { Link } from "@tanstack/react-router";
import HomeIcon from "../../assets/icons/home.svg?react";
import ExpandIcon from "../../assets/icons/expand.svg?react";
import WalletIcon from "../../assets/icons/wallet.svg?react";
import NodesIcon from "../../assets/icons/wallet.svg?react";
import FilesIcon from "../../assets/icons/files.svg?react";
import AnalyticsIcon from "../../assets/icons/analytics.svg?react";
import Logo from "../../assets/icons/logo.svg?react";
import Logotype from "../../assets/icons/logotype.svg?react";
import DeviceIcon from "../../assets/icons/device.svg?react";
import PeersIcon from "../../assets/icons/peers.svg?react";
import PurchaseIcon from "../../assets/icons/purchase.svg?react";
import HostIcon from "../../assets/icons/host.svg?react";
import LogsIcon from "../../assets/icons/logs.svg?react";
import SettingsIcon from "../../assets/icons/settings.svg?react";
import HelpIcon from "../../assets/icons/help.svg?react";
import DisclaimerIcon from "../../assets/icons/disclaimer.svg?react";

export type MenuItemComponentProps = {
  onClick: () => void;
};

export type MenuItem =
  | {
      type: "separator";
    }
  | {
      type: "space";
    }
  | {
      type: "item";
      Component: ComponentType<MenuItemComponentProps>;
    };

export function Menu() {
  const [isExpanded, setIsExpanded] = useState(true);

  const onLogoClick = () => {
    if (isExpanded === false) {
      setIsExpanded(true);
    }
  };

  const onExpandMenu = () => setIsExpanded(!isExpanded);

  return (
    <>
      <aside
        className={classnames([`menu`])}
        {...attributes({
          "aria-expanded": isExpanded,
        })}>
        <div>
          <header>
            <Logo onClick={onLogoClick} width={30} />
            <Logotype height={34} />
            <div>
              <ExpandIcon onClick={onExpandMenu}></ExpandIcon>
            </div>
          </header>

          <div className="items">
            <Link to="/dashboard" activeOptions={{ exact: true }}>
              <span>
                <HomeIcon />
              </span>
              <span>Dashboard</span>
            </Link>
            <Link to="/dashboard/wallet">
              <span>
                <WalletIcon width={20} height={20} />
              </span>
              <span>Wallet</span>
            </Link>
            <Link to="/dashboard/files">
              <span>
                <FilesIcon width={20} />
              </span>
              <span>Files</span>
            </Link>
            <Link
              to="/dashboard/nodes"
              disabled={true}
              aria-disabled={true}
              data-title="Coming soon">
              <span>
                <NodesIcon width={20} />
              </span>
              <span>Nodes</span>
            </Link>
            <Link
              to="/dashboard/analytics"
              disabled={true}
              aria-disabled={true}
              title="Coming soon"
              data-title="Coming soon">
              <span>
                <AnalyticsIcon />
              </span>
              <span>Analytics</span>
            </Link>
            <Link
              to="/dashboard/device"
              disabled={true}
              aria-disabled={true}
              title="Coming soon"
              data-title="Coming soon">
              <span>
                <DeviceIcon />
              </span>
              <span>Devices</span>
            </Link>
            <hr />
            <Link to="/dashboard/purchases">
              <span>
                <PurchaseIcon />
              </span>
              <span>Purchases</span>
            </Link>
            <Link to="/dashboard/availabilities">
              <span>
                <HostIcon />
              </span>
              <span>Host</span>
            </Link>
            <hr />
            <Link to="/dashboard/peers">
              <span>
                <PeersIcon width={20} />
              </span>
              <span>Peers</span>
            </Link>
            <Link to="/dashboard/logs">
              <span>
                <LogsIcon width={24} />
              </span>
              <span>Log</span>
            </Link>
            <section></section>
            <Link to="/dashboard/settings">
              <span>
                <SettingsIcon width={24} />
              </span>
              <span>Settings</span>
            </Link>
            <Link to="/dashboard/help">
              <span>
                <HelpIcon />
              </span>
              <span>Help</span>
            </Link>
            <Link to="/dashboard/disclaimer">
              <span>
                <DisclaimerIcon />
              </span>
              <span>Disclaimer</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

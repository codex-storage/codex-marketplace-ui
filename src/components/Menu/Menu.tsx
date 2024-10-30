import { Backdrop } from "@codex-storage/marketplace-ui-components";
import { attributes } from "../../utils/attributes";
import "./menu.css";
import { ComponentType, useEffect, useState } from "react";
import { Logo } from "../Logo/Logo";
import { Logotype } from "../Logotype/Logotype";
import { ExpandIcon } from "./ExpandIcon";
import { classnames } from "../../utils/classnames";
import { Link } from "@tanstack/react-router";
import { HomeIcon } from "./HomeIcon";
import { WalletIcon } from "./WalletIcon";
import { FilesIcon } from "./FilesIcon";
import { NodesIcon } from "./NodesIcon";
import { AnalyticsIcon } from "./AnalyticsIcon";
import { DeviceIcon } from "./DeviceIcon";
import { PurchaseIcon } from "./PurchaseIcon";
import { HostIcon } from "./HostIcon";
import { PeersIcon } from "./PeersIcon";
import { LogsIcon } from "./LogsIcon";
import { SettingsIcon } from "./SettingsIcon";
import { HelpIcon } from "./HelpIcon";
import { DisclaimerIcon } from "./DisclaimerIcon";

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

type Props = {
  /**
   * If true, the menu will be displayed
   */
  expanded: boolean;

  onClose: () => void;

  onOpen?: () => void;
};

export function Menu({ expanded, onClose, onOpen }: Props) {
  const [isExpanded, setIsExpanded] = useState<boolean | null>(null);

  useEffect(() => {
    if (expanded && onOpen) {
      onOpen();
    }
  }, [expanded, onOpen]);

  const onLogoClick = () => {
    if (isExpanded === false) {
      setIsExpanded(true);
    }
  };

  const onExpandMenu = () => setIsExpanded(isExpanded === false ? true : false);

  return (
    <>
      <Backdrop onClose={onClose} open={expanded} />

      <aside
        className={classnames(
          [`menu`],
          ["menu--expanded", isExpanded === true],
          ["menu--unexpanded", isExpanded === false]
        )}
        {...attributes({ "aria-expanded": expanded })}>
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
                <WalletIcon />
              </span>
              <span>Wallet</span>
            </Link>
            <Link to="/dashboard/files">
              <span>
                <FilesIcon />
              </span>
              <span>Files</span>
            </Link>
            <Link
              to="/dashboard/nodes"
              disabled={true}
              aria-disabled={true}
              data-title="Coming soon">
              <span>
                <NodesIcon variant="default" />
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
                <PeersIcon />
              </span>
              <span>Peers</span>
            </Link>
            <Link to="/dashboard/logs">
              <span>
                <LogsIcon />
              </span>
              <span>Log</span>
            </Link>
            <section></section>
            <Link to="/dashboard/settings">
              <span>
                <SettingsIcon />
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

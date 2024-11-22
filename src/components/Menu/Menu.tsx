import { attributes } from "../../utils/attributes";
import "./menu.css";
import { ComponentType, useEffect } from "react";
import { classnames } from "../../utils/classnames";
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
import { NavLink } from "react-router-dom";
import { useIsMobile } from "../../hooks/useMobile";

export type MenuItemComponentProps = {
  onClick: () => void;
};

export type Props = {
  isExpanded: boolean;
  onExpanded: (val: boolean) => void;
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

export function Menu({ isExpanded, onExpanded }: Props) {
  const isMobile = useIsMobile();

  const onLogoClick = () => {
    if (isExpanded === false) {
      onExpanded(true);
    }
  };

  useEffect(() => {
    if (isMobile) {
      onExpanded(false);
    }
  }, [isMobile, onExpanded]);

  const onExpandMenu = () => onExpanded(!isExpanded);

  const onClose = () => {
    if (isMobile) {
      onExpanded(false);
    }
  };

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
            <NavLink onClick={onClose} to="/dashboard" end>
              <span>
                <HomeIcon />
              </span>
              <span>Dashboard</span>
            </NavLink>
            <NavLink onClick={onClose} to="/dashboard/wallet">
              <span>
                <WalletIcon width={20} height={20} />
              </span>
              <span>Wallet</span>
            </NavLink>
            <NavLink onClick={onClose} to="/dashboard/files">
              <span>
                <FilesIcon width={20} />
              </span>
              <span>Files</span>
            </NavLink>
            <NavLink
              onClick={onClose}
              to="#"
              aria-disabled={true}
              data-title="Coming soon"
              end>
              <span>
                <NodesIcon width={20} />
              </span>
              <span>Nodes</span>
            </NavLink>
            <NavLink
              onClick={onClose}
              to="#"
              aria-disabled={true}
              title="Coming soon"
              data-title="Coming soon">
              <span>
                <AnalyticsIcon />
              </span>
              <span>Analytics</span>
            </NavLink>
            <NavLink
              onClick={onClose}
              to="#"
              aria-disabled={true}
              title="Coming soon"
              data-title="Coming soon">
              <span>
                <DeviceIcon />
              </span>
              <span>Devices</span>
            </NavLink>
            <hr />
            <NavLink onClick={onClose} to="/dashboard/purchases">
              <span>
                <PurchaseIcon />
              </span>
              <span>Purchases</span>
            </NavLink>
            <NavLink onClick={onClose} to="/dashboard/availabilities">
              <span>
                <HostIcon />
              </span>
              <span>Host</span>
            </NavLink>
            <hr />
            <NavLink onClick={onClose} to="/dashboard/peers">
              <span>
                <PeersIcon width={20} />
              </span>
              <span>Peers</span>
            </NavLink>
            <NavLink onClick={onClose} to="/dashboard/logs">
              <span>
                <LogsIcon width={24} />
              </span>
              <span>Log</span>
            </NavLink>
            <section></section>
            <NavLink onClick={onClose} to="/dashboard/settings">
              <span>
                <SettingsIcon width={24} />
              </span>
              <span>Settings</span>
            </NavLink>
            <NavLink onClick={onClose} to="/dashboard/help">
              <span>
                <HelpIcon />
              </span>
              <span>Help</span>
            </NavLink>
            <NavLink onClick={onClose} to="/dashboard/disclaimer">
              <span>
                <DisclaimerIcon />
              </span>
              <span>Disclaimer</span>
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
}

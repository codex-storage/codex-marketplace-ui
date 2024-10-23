import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import "./dashboard.css";
import { NodeIndicator } from "../components/NodeIndicator/NodeIndicator";
import { HttpNetworkIndicator } from "../components/HttpNetworkIndicator/HttpNetworkIndicator";
import { Page } from "../components/Page/Page";
import { HomeIcon } from "../components/Menu/HomeIcon";
import { WalletIcon } from "../components/Menu/WalletIcon";
import { NodesIcon } from "../components/Menu/NodesIcon";
import { FilesIcon } from "../components/Menu/FilesIcon";
import { AnalyticsIcon } from "../components/Menu/AnalyticsIcon";
import { PurchaseIcon } from "../components/Menu/PurchaseIcon";
import { PeersIcon } from "../components/Menu/PeersIcon";
import { LogsIcon } from "../components/Menu/LogsIcon";
import { MenuItem, MenuItemComponentProps } from "../components/Menu/Menu";
import { HelpIcon } from "../components/Menu/HelpIcon";
import { DisclaimerIcon } from "../components/Menu/DisclaimerIcon";
import { SettingsIcon } from "../components/Menu/SettingsIcon";
import { HostIcon } from "../components/Menu/HostIcon";
import { DeviceIcon } from "../components/Menu/DeviceIcon";

const Layout = () => {
  const Right = (
    <>
      <NodeIndicator />
      <HttpNetworkIndicator />
    </>
  );

  const items = [
    {
      type: "item",
      Component: (p: MenuItemComponentProps) => (
        <Link to="/dashboard" activeOptions={{ exact: true }} {...p}>
          <span className="menu-icon">
            <HomeIcon />
          </span>
          <span className="menu-text">Dashboard</span>
        </Link>
      ),
    },
    {
      type: "item",
      Component: (p: MenuItemComponentProps) => (
        <Link to="/dashboard/wallet" {...p}>
          <span className="menu-icon">
            <WalletIcon />
          </span>
          <span className="menu-text">Wallet</span>
        </Link>
      ),
    },
    {
      type: "item",
      Component: (p: MenuItemComponentProps) => (
        <Link to="/dashboard/files" {...p}>
          <span className="menu-icon">
            <FilesIcon />
          </span>
          <span className="menu-text">Files</span>
        </Link>
      ),
    },
    {
      type: "item",
      Component: (p: MenuItemComponentProps) => (
        <Link to="/dashboard/nodes" {...p}>
          <span className="menu-icon">
            <NodesIcon />
          </span>
          <span className="menu-text">Nodes</span>
        </Link>
      ),
    },
    {
      type: "item",
      Component: (p: MenuItemComponentProps) => (
        <Link to="/dashboard/analytics" {...p}>
          <span className="menu-icon">
            <AnalyticsIcon />
          </span>
          <span className="menu-text">Analytics</span>
        </Link>
      ),
    },
    {
      type: "item",
      Component: (p: MenuItemComponentProps) => (
        <Link to="/dashboard/device" {...p}>
          <span className="menu-icon">
            <DeviceIcon />
          </span>
          <span className="menu-text">Devices</span>
        </Link>
      ),
    },
    {
      type: "separator",
    },
    {
      type: "item",
      Component: (p: MenuItemComponentProps) => (
        <Link to="/dashboard/purchases" {...p}>
          <span className="menu-icon">
            <PurchaseIcon />
          </span>
          <span className="menu-text">Purchases</span>
        </Link>
      ),
    },
    {
      type: "item",
      Component: (p: MenuItemComponentProps) => (
        <Link to="/dashboard/availabilities" {...p}>
          <span className="menu-icon">
            <HostIcon />
          </span>
          <span className="menu-text">Host</span>
        </Link>
      ),
    },
    {
      type: "separator",
    },
    {
      type: "item",
      Component: (p: MenuItemComponentProps) => (
        <Link to="/dashboard/peers" {...p}>
          <span className="menu-icon">
            <PeersIcon />
          </span>
          <span className="menu-text">Peers</span>
        </Link>
      ),
    },
    {
      type: "item",
      Component: (p: MenuItemComponentProps) => (
        <Link to="/dashboard/logs" {...p}>
          <span className="menu-icon">
            <LogsIcon />
          </span>
          <span className="menu-text">Log</span>
        </Link>
      ),
    },
    {
      type: "space",
    },
    {
      type: "item",
      Component: (p: MenuItemComponentProps) => (
        <Link to="/dashboard/settings" {...p}>
          <span className="menu-icon">
            <SettingsIcon />
          </span>
          <span className="menu-text">Settings</span>
        </Link>
      ),
    },
    {
      type: "item",
      Component: (p: MenuItemComponentProps) => (
        <Link to="/dashboard/help" {...p}>
          <span className="menu-icon">
            <HelpIcon />
          </span>
          <span className="menu-text">Help</span>
        </Link>
      ),
    },
    {
      type: "item",
      Component: (p: MenuItemComponentProps) => (
        <Link to="/dashboard/disclaimer" {...p}>
          <span className="menu-icon">
            <DisclaimerIcon />
          </span>
          <span className="menu-text">Disclaimer</span>
        </Link>
      ),
    },
  ] satisfies MenuItem[];

  return (
    <Page
      children={<Outlet />}
      items={items}
      Right={Right}
      version={import.meta.env.PACKAGE_VERSION}
    />
  );
};

export const Route = createFileRoute("/dashboard")({
  component: Layout,
});

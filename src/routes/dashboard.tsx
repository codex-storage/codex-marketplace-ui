import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import "./dashboard.css";
import {
  MenuItem,
  MenuItemComponentProps,
  Page,
} from "@codex-storage/marketplace-ui-components";
import {
  Home,
  ShoppingBag,
  Server,
  Settings,
  HelpCircle,
  TriangleAlert,
} from "lucide-react";
import { ICON_SIZE } from "../utils/constants";
import { NodeIndicator } from "../components/NodeIndicator/NodeIndicator";
import { HttpNetworkIndicator } from "../components/HttpNetworkIndicator/HttpNetworkIndicator";

const Layout = () => {
  const Right = (
    <>
      <NodeIndicator />
      <HttpNetworkIndicator />
    </>
  );

  const items = [
    {
      type: "menu-item",
      Component: (p: MenuItemComponentProps) => (
        <Link to="/dashboard" activeOptions={{ exact: true }} {...p}>
          <Home size={ICON_SIZE} />
          Dashboard
        </Link>
      ),
    },
    {
      type: "separator",
    },
    {
      type: "menu-title",
      title: "rent",
    },
    {
      type: "menu-item",
      Component: (p: MenuItemComponentProps) => (
        <Link to="/dashboard/purchases" {...p}>
          <ShoppingBag size={ICON_SIZE} />
          Purchases
        </Link>
      ),
    },
    {
      type: "separator",
    },
    {
      type: "menu-title",
      title: "host",
    },
    {
      type: "menu-item",
      Component: (p: MenuItemComponentProps) => (
        <Link to="/dashboard/availabilities" {...p}>
          <Server size={ICON_SIZE} />
          Sales
        </Link>
      ),
    },
    {
      type: "separator",
    },
    {
      type: "menu-item",
      Component: (p: MenuItemComponentProps) => (
        <Link to="/dashboard/help" {...p}>
          <HelpCircle size={"1.25rem"} /> Help
        </Link>
      ),
    },
    {
      type: "menu-item",
      Component: (p: MenuItemComponentProps) => (
        <Link to="/dashboard/settings" {...p}>
          <Settings size={ICON_SIZE} />
          Settings
        </Link>
      ),
    },
    {
      type: "menu-item",
      Component: (p: MenuItemComponentProps) => (
        <Link to="/dashboard/disclaimer" {...p}>
          <TriangleAlert size={ICON_SIZE} />
          Disclaimer
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

import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import "./layout.css";
import { Menu } from "../components/Menu/Menu";
import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar/AppBar";
import { Backdrop } from "@codex-storage/marketplace-ui-components";

const Layout = () => {
  const [hasMobileMenu, setHasMobileMenu] = useState(false);
  const router = useRouterState();

  const onIconClick = () => {
    if (window.innerWidth <= 999) {
      setHasMobileMenu(true);
    }
  };

  useEffect(() => {
    setHasMobileMenu(false);
  }, [router.location.pathname]);

  const onClose = () => setHasMobileMenu(false);

  const isMobileMenuDisplayed =
    hasMobileMenu === true && window.innerWidth <= 999;

  return (
    <div className="layout">
      <Menu isMobileMenuDisplayed={isMobileMenuDisplayed}></Menu>

      <main>
        <AppBar onIconClick={onIconClick} />
        <div>
          <Outlet />
        </div>
      </main>

      <Backdrop onClose={onClose} open={hasMobileMenu}></Backdrop>
    </div>
  );
};

export const Route = createFileRoute("/dashboard")({
  component: Layout,
});

import { createFileRoute, Outlet } from "@tanstack/react-router";
import "./layout.css";
import { Menu } from "../components/Menu/Menu";
import { useState } from "react";
import { AppBar } from "../components/AppBar/AppBar";
import { Backdrop } from "@codex-storage/marketplace-ui-components";

const Layout = () => {
  const [hasMobileMenu, setHasMobileMenu] = useState(false);

  const onIconClick = () => {
    if (window.innerWidth <= 999) {
      setHasMobileMenu(true);
    }
  };

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

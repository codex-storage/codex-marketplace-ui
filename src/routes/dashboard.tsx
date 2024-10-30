import { createFileRoute, Outlet } from "@tanstack/react-router";
import "./layout.css";
import { Menu } from "../components/Menu/Menu";
import { useState } from "react";
import { AppBar } from "../components/AppBar/AppBar";

const Layout = () => {
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);

  const onExpand = () => setOpen(true);

  return (
    <div className="layout">
      <Menu expanded={open} onClose={onClose}></Menu>

      <main>
        <AppBar onExpand={onExpand} />
        <Outlet />
      </main>
    </div>
  );
};

export const Route = createFileRoute("/dashboard")({
  component: Layout,
});

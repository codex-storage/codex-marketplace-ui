import { ReactNode, useState } from "react";
import { Menu, MenuItem } from "../Menu/Menu";
import { AppBar } from "../AppBar/AppBar";
import "./page.css";

type Props = {
  children: ReactNode;

  Right: ReactNode;

  items: MenuItem[];

  version?: string;
};

export function Page({ children, Right, items, version = "" }: Props) {
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);

  const onExpand = () => setOpen(true);

  return (
    <div className="page">
      <Menu
        expanded={open}
        onClose={onClose}
        items={items}
        version={version}></Menu>

      <main className="page-main">
        <AppBar onExpand={onExpand} Right={Right} />
        {children}
      </main>
    </div>
  );
}

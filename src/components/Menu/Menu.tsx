import { Backdrop } from "@codex-storage/marketplace-ui-components";
import { attributes } from "../../utils/attributes";
import "./menu.css";
import { ComponentType, useEffect, useState } from "react";
import { Logo } from "../Logo/Logo";
import { Logotype } from "../Logotype/Logotype";
import { ExpandIcon } from "./ExpandIcon";
import { classnames } from "../../utils/classnames";

export type MenuItemComponentProps = {
  onClick: () => void;
  className: string;
};

export type MenuItem =
  | {
      type: "separator";
    }
  | {
      type: "space";
    }
  | {
      type: "empty";
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

  /**
   * The menu items to be displayed
   */
  items: MenuItem[];

  className?: string;

  /**
   * The application version
   */
  version?: string;
};

export function Menu({
  expanded,
  onClose,
  onOpen,
  items,
  className = "",
}: Props) {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (expanded && onOpen) {
      onOpen();
    }
  }, [expanded, onOpen]);

  const onExpandMenu = () => setIsExpanded(!isExpanded);

  const renderItem = (i: MenuItem, index: number) => {
    switch (i.type) {
      case "separator":
        return <hr className="menu-item-separator" key={index}></hr>;
      case "space":
        return <div className="menu-space" key={index}></div>;
      case "empty":
        return <div className="menu-empty" key={index}></div>;
      case "item":
        return (
          <i.Component onClick={onClose} className="menu-item" key={index} />
        );
    }
  };

  return (
    <>
      <Backdrop onClose={onClose} open={expanded} />

      <aside
        className={classnames(
          [`menu ${className}`],
          ["menu--expanded", isExpanded]
        )}
        {...attributes({ "aria-expanded": expanded })}>
        <div className="menu-container">
          <div className="menu-header">
            <Logo />
            <Logotype height={34} className={"menu-logotype"} />
            <div className="menu-header-right">
              <ExpandIcon onClick={onExpandMenu}></ExpandIcon>
            </div>
            {/* <span className="menu-separator">|</span>
            <span className="menu-name">Codex</span>
            <span className="menu-state">ALPHA {version}</span> */}
          </div>

          <div className="menu-items">
            {items.map((item, index) => renderItem(item, index))}
          </div>
        </div>
      </aside>
    </>
  );
}

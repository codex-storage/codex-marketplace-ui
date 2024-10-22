import { Menu } from "lucide-react";
import "./appBar.css";
import { ReactNode } from "react";

type Props = {
  /**
   * Event triggered when the menu is expanding, after a click on the
   * menu button.
   */
  onExpand: () => void;

  /**
   * React node to add to the right part of the application bar
   */
  Right: ReactNode;
};

export function AppBar({ onExpand, Right }: Props) {
  return (
    <div className="appBar">
      <div className="appBar-left">
        <a className="appBar-burger" onClick={onExpand}>
          <Menu size={"1.25rem"} />
        </a>
        <span>Home</span>
      </div>
      <div className="appBar-right">{Right}</div>
    </div>
  );
}

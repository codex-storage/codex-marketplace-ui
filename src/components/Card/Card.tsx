import { ReactElement, ReactNode } from "react";
import "./Card.css";
import { Button } from "@codex-storage/marketplace-ui-components";

type Props = {
  className?: string;
  icon: ReactNode;
  buttonLabel?: string;
  buttonAction?: () => void;
  title?: string;
  children: ReactElement;
};

export function Card({
  icon,
  buttonAction,
  buttonLabel,
  title,
  children,
  className = "",
}: Props) {
  return (
    <div className={"card " + className}>
      <header>
        <div>
          {icon}
          <h5>{title}</h5>
        </div>
        {buttonLabel && (
          <Button
            label={buttonLabel}
            variant="outline"
            onClick={buttonAction}></Button>
        )}
      </header>
      {children}
    </div>
  );
}

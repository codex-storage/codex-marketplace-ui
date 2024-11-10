import { ComponentType, ReactElement, ReactNode } from "react";
import "./Card.css";
import { Button } from "@codex-storage/marketplace-ui-components";
import { ErrorBoundary } from "@sentry/react";
import { ErrorPlaceholder } from "../ErrorPlaceholder/ErrorPlaceholder";

type Props = {
  className?: string;
  icon: ReactNode;
  buttonLabel?: string;
  buttonIcon?: ComponentType;
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
  buttonIcon,
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
            Icon={buttonIcon}
            size="small"
            onClick={buttonAction}></Button>
        )}
      </header>
      <ErrorBoundary
        fallback={({ error }) => (
          <ErrorPlaceholder
            error={error}
            subtitle="Cannot retrieve the data."
          />
        )}>
        {children}
      </ErrorBoundary>
    </div>
  );
}

import { Placeholder } from "@codex-storage/marketplace-ui-components";
import { CircleX } from "lucide-react";
import React, { ErrorInfo, ReactNode } from "react";
import "./ErrorBoundary.css";
import * as Sentry from "@sentry/browser";

type State = {
  hasError: boolean;
};

type Props = {
  card: boolean;
  children: ReactNode;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.PROD) {
      Sentry.captureException(error);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="errorBoundary">
          <Placeholder
            Icon={<CircleX size={"4em"}></CircleX>}
            title="Something went wrong"
            message="Something went wrong, please try to load the component again."
            onRetry={() => this.setState({ hasError: false })}></Placeholder>
        </div>
      );
    }

    return this.props.children;
  }
}

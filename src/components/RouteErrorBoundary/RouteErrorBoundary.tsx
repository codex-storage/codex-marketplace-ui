import { Placeholder } from "@codex-storage/marketplace-ui-components";
import { useRouteError } from "react-router-dom";
import ErrorCircleIcon from "../../assets/icons/error-circle.svg?react";

export function RouteErrorBoundary() {
  const error = useRouteError();

  const message = Object.prototype.hasOwnProperty.call(error, "message")
    ? (error as { message: string }).message
    : `${error}`;

  return (
    <Placeholder
      Icon={<ErrorCircleIcon />}
      title="Error"
      subtitle={""}
      message={message}></Placeholder>
  );
}

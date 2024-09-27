import { Placeholder } from "@codex-storage/marketplace-ui-components";
import { ErrorIcon } from "../ErrorIcon/ErrorIcon";

type Props = {
  subtitle?: string;
  error: unknown;
};

export function ErrorPlaceholder({ subtitle, error }: Props) {
  const message = Object.prototype.hasOwnProperty.call(error, "message")
    ? (error as { message: string }).message
    : `${error}`;

  return (
    <Placeholder
      Icon={<ErrorIcon />}
      title="Error"
      subtitle={subtitle}
      message={message}></Placeholder>
  );
}

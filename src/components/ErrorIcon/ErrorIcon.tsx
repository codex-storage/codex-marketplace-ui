import { CircleX } from "lucide-react";
import { SimpleText } from "@codex-storage/marketplace-ui-components";

export function ErrorIcon() {
  return (
    <SimpleText variant="error">
      <CircleX size="4rem" />
    </SimpleText>
  );
}

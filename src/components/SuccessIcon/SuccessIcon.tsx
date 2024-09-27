import { SimpleText } from "@codex-storage/marketplace-ui-components";
import { CircleCheck } from "lucide-react";

export function SuccessIcon() {
  return (
    <SimpleText variant="primary">
      <CircleCheck size="4rem" className="successIcon" />
    </SimpleText>
  );
}

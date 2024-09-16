import { useRef, useState } from "react";
import { COPY_DURATION, ICON_SIZE } from "../../utils/constants";
import { Copy } from "lucide-react";
import { Button } from "@codex-storage/marketplace-ui-components";

type CopyButtonProps = {
  cid: string;
};

export function CidCopyButton({ cid }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<number | null>(null);

  const onCopy = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    navigator.clipboard.writeText(cid);

    setCopied(true);

    timeout.current = window.setTimeout(() => {
      setCopied(false);
    }, COPY_DURATION);
  };

  const label = copied ? "Copied !" : "Copy CID";

  const Icon = () => <Copy size={ICON_SIZE} />;

  return (
    <Button
      label={label}
      variant="outline"
      onClick={onCopy}
      Icon={Icon}></Button>
  );
}

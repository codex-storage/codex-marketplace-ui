import { useRef, useState } from "react";
import { COPY_DURATION } from "../../utils/constants";
import { Button } from "@codex-storage/marketplace-ui-components";
import CopyIcon from "../../assets/icons/copy.svg?react";

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

  return (
    <Button
      label={label}
      variant="outline"
      onClick={onCopy}
      Icon={() => <CopyIcon width={26} />}></Button>
  );
}

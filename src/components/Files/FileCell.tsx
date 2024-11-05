import {
  ButtonIcon,
  Cell,
  Toast,
  WebFileIcon,
} from "@codex-storage/marketplace-ui-components";
import { CodexDataContent } from "@codex-storage/sdk-js";
import { Copy } from "lucide-react";
import { useState } from "react";
import "./FileCell.css";

type Props = {
  content: CodexDataContent;
};

export function FileCell({ content }: Props) {
  const [toast, setToast] = useState({ time: 0, message: "" });

  const onCopy = (cid: string) => {
    navigator.clipboard.writeText(cid);
    setToast({ message: "CID copied to the clipboard.", time: Date.now() });
  };

  return (
    <>
      <Cell className="file-cell">
        <div>
          <WebFileIcon type={content.manifest.mimetype || ""} />

          <div>
            <p>
              <b>{content.manifest.filename}</b>
            </p>
            <p>
              <small>{content.cid}</small>
            </p>
          </div>
          <ButtonIcon
            variant="small"
            onClick={() => onCopy(content.cid)}
            animation="buzz"
            Icon={(props) => <Copy size={"1rem"} {...props} />}></ButtonIcon>
        </div>

        <Toast message={toast.message} time={toast.time} variant={"success"} />
      </Cell>
    </>
  );
}

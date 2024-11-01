import {
  ButtonIcon,
  Cell,
  Toast,
  WebFileIcon,
} from "@codex-storage/marketplace-ui-components";
import { CodexDataContent } from "@codex-storage/sdk-js";
import { Copy } from "lucide-react";
import { useState } from "react";

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
      <Cell>
        <div className="files-cell-file">
          <WebFileIcon type={content.manifest.mimetype || ""} />

          <div>
            <b>{content.manifest.filename}</b>
            <div className="files-fileMeta">
              <small className="files-fileMeta-cid">{content.cid}</small>
              <ButtonIcon
                variant="small"
                onClick={() => onCopy(content.cid)}
                animation="buzz"
                Icon={(props) => (
                  <Copy size={"1rem"} {...props} />
                )}></ButtonIcon>
            </div>
          </div>
        </div>

        <Toast message={toast.message} time={toast.time} variant={"success"} />
      </Cell>
    </>
  );
}

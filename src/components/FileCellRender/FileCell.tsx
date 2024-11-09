import { useEffect, useState } from "react";
import {
  Cell,
  Tooltip,
  WebFileIcon,
} from "@codex-storage/marketplace-ui-components";
import "./FileCell.css";
import { WebStorage } from "../../utils/web-storage";
import { CodexDataContent } from "@codex-storage/sdk-js";

type FileMetadata = {
  mimetype: string | null;
  uploadedAt: number;
  filename: string | null;
};

type Props = {
  requestId: string;
  purchaseCid: string;
  index: number;
  data: CodexDataContent[];
  onMetadata?: (requestId: string, metadata: FileMetadata) => void;
};

export function FileCell({ requestId, purchaseCid, data, onMetadata }: Props) {
  const [cid, setCid] = useState(purchaseCid);
  const [metadata, setMetadata] = useState<FileMetadata>({
    filename: "-",
    mimetype: "-",
    uploadedAt: 0,
  });

  useEffect(() => {
    WebStorage.purchases.get(requestId).then((cid) => {
      if (cid) {
        setCid(cid);

        const content = data.find((m) => m.cid === cid);
        if (content) {
          const {
            filename = "-",
            mimetype = "application/octet-stream",
            uploadedAt = 0,
          } = content.manifest;
          setMetadata({
            filename,
            mimetype,
            uploadedAt,
          });
          onMetadata?.(requestId, {
            filename,
            mimetype,
            uploadedAt,
          });
        }
      }
    });
  }, [requestId, data]);

  let filename = metadata.filename || "-";

  if (filename.length > 10) {
    const [name, ext] = filename.split(".");
    filename = name.slice(0, 10) + "..." + ext;
  }

  // const cidTruncated = cid.slice(0, 5) + ".".repeat(5) + cid.slice(-5);
  const cidTruncated = cid.slice(0, 10) + "...";

  return (
    <Cell>
      <div className="fileCell">
        <WebFileIcon type={metadata.mimetype || "-"} />
        <div>
          <span className="fileCell-title">
            <Tooltip message={filename}>{filename}</Tooltip>
          </span>
          <span className="fileCell-subtitle">
            <Tooltip message={cid}>
              <span className="fileCell-cid">{cidTruncated}</span>
            </Tooltip>
          </span>
        </div>
      </div>
    </Cell>
  );
}

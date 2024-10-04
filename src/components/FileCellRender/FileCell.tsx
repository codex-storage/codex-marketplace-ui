import { useEffect, useState } from "react";
import {
  Cell,
  Tooltip,
  WebFileIcon,
} from "@codex-storage/marketplace-ui-components";
import "./FileCell.css";
import { FileMetadata, FilesStorage } from "../../utils/file-storage";
import { PurchaseStorage } from "../../utils/purchases-storage";

type Props = {
  requestId: string;
  purchaseCid: string;
  index: number;
};

export function FileCell({ requestId, purchaseCid }: Props) {
  const [cid, setCid] = useState(purchaseCid);
  const [metadata, setMetadata] = useState<FileMetadata>({
    name: "N/A.jpg",
    mimetype: "N/A",
    uploadedAt: new Date(0, 0, 0, 0, 0, 0).toJSON(),
  });

  useEffect(() => {
    PurchaseStorage.get(requestId).then((cid) => {
      if (cid) {
        setCid(cid);

        FilesStorage.get<FileMetadata>(cid).then((data) => {
          if (data) {
            setMetadata(data);
          }
        });
      }
    });
  }, [requestId]);

  let name = metadata.name.slice(0, 10);

  if (metadata.name.length > 10) {
    // const [filename, ext] = metadata.name.split(".");
    // name = filename.slice(0, 10) + "..." + ext;
    name += "...";
  }

  // const cidTruncated = cid.slice(0, 5) + ".".repeat(5) + cid.slice(-5);
  const cidTruncated = cid.slice(0, 10) + "...";

  return (
    <Cell>
      <div className="fileCell">
        <WebFileIcon type={metadata.mimetype} />
        <div>
          <span className="fileCell-title">
            <Tooltip message={metadata.name}>{name}</Tooltip>
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

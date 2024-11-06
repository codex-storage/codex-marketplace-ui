import {
  ButtonIcon,
  Button,
  Sheets,
  WebFileIcon,
} from "@codex-storage/marketplace-ui-components";
import { CodexDataContent } from "@codex-storage/sdk-js";
import { PrettyBytes } from "../../utils/bytes";
import { Dates } from "../../utils/dates";
import { CidCopyButton } from "./CidCopyButton";
import "./FileDetails.css";
import { CodexSdk } from "../../sdk/codex";
import { FilesUtils } from "./files.utils";
import { useEffect, useState } from "react";
import { WebStorage } from "../../utils/web-storage";
import { FileDetailsIcon } from "./FileDetailsIcon";
import { CloseIcon } from "../CloseIcon/CloseIcon";
import { DownloadIcon } from "./DownloadIcon";

type Props = {
  details: CodexDataContent | null;
  onClose: () => void;
};

export function FileDetails({ onClose, details }: Props) {
  const [purchases, setPurchases] = useState(0);

  useEffect(() => {
    WebStorage.purchases
      .entries()
      .then((entries) =>
        setPurchases(
          entries
            .filter((e) => e[1] === details?.cid)
            .reduce((acc) => acc + 1, 0)
        )
      );
  }, [details?.cid]);

  const url = CodexSdk.url() + "/api/codex/v1/data/";

  const onDownload = () => window.open(url + details?.cid, "_target");

  return (
    <Sheets open={!!details} onClose={onClose}>
      <>
        {details && (
          <div className="file-details">
            <header>
              <FileDetailsIcon></FileDetailsIcon>
              <span>File details</span>
              <ButtonIcon
                onClick={onClose}
                variant="small"
                Icon={CloseIcon}></ButtonIcon>
            </header>

            <div className="preview">
              {FilesUtils.isImage(details.manifest.mimetype) ? (
                <img src={url + details.cid} />
              ) : (
                <figure>
                  <WebFileIcon
                    type={details.manifest.mimetype || ""}
                    size={32}
                  />
                  <p>File Preview not available.</p>
                </figure>
              )}
            </div>

            <ul>
              <li>
                <p>CID:</p>
                <p>{details.cid}</p>
              </li>

              <li>
                <p>File name:</p>
                <p>{details.manifest.filename}</p>
              </li>

              <li>
                <p>Date:</p>
                <p>{Dates.format(details.manifest.uploadedAt).toString()}</p>
              </li>

              <li>
                <p>Mimetype:</p>
                <p>{details.manifest.mimetype}</p>
              </li>

              <li>
                <p>Size:</p>
                <p>{PrettyBytes(details.manifest.datasetSize)}</p>
              </li>

              <li>
                <p>Protected:</p>
                <p>{details.manifest.protected ? "Yes" : "No"}</p>
              </li>

              <li>
                <p>Used:</p>
                <p>
                  <b>{purchases} </b> purchase(s)
                </p>
              </li>
            </ul>

            <div className="buttons">
              <CidCopyButton cid={details.cid} />

              <Button
                Icon={DownloadIcon}
                label="Download"
                variant="outline"
                onClick={onDownload}></Button>
            </div>
          </div>
        )}
      </>
    </Sheets>
  );
}

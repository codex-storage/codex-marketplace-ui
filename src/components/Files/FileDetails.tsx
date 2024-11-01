import {
  ButtonIcon,
  Button,
  Sheets,
} from "@codex-storage/marketplace-ui-components";
import { CodexDataContent } from "@codex-storage/sdk-js";
import { PrettyBytes } from "../../utils/bytes";
import { ICON_SIZE } from "../../utils/constants";
import { Dates } from "../../utils/dates";
import { CidCopyButton } from "./CidCopyButton";
import "./FileDetails.css";
import { DownloadIcon, X } from "lucide-react";
import { CodexSdk } from "../../sdk/codex";
import { Files } from "../../utils/files";
import { useEffect, useState } from "react";
import { WebStorage } from "../../utils/web-storage";

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

  const Icon = () => <X size={ICON_SIZE} onClick={onClose} />;

  const onDownload = () => window.open(url + details?.cid, "_target");

  return (
    <Sheets open={!!details} onClose={onClose}>
      <>
        {details && (
          <>
            <div className="fileDetails-header">
              <b className="fileDetails-headerTitle">File details</b>
              <ButtonIcon variant="small" Icon={Icon}></ButtonIcon>
            </div>

            {Files.isImage(details.manifest.mimetype) && (
              <div className="fileDetails-imageContainer">
                <img className="fileDetails-image" src={url + details.cid} />
              </div>
            )}

            <div className="fileDetails-body">
              <div className="fileDetails-grid">
                <p className="text-secondary">CID:</p>
                <p className="fileDetails-gridColumn">{details.cid}</p>
              </div>

              <div className="fileDetails-grid">
                <p className="text-secondary">File name:</p>
                <p className="fileDetails-gridColumn">
                  {details.manifest.filename}
                </p>
              </div>

              <div className="fileDetails-grid">
                <p className="text-secondary">Date:</p>
                <p className="fileDetails-gridColumn">
                  {Dates.format(details.manifest.uploadedAt).toString()}
                </p>
              </div>

              <div className="fileDetails-grid">
                <p className="text-secondary">Mimetype:</p>
                <p className="fileDetails-gridColumn">
                  {details.manifest.mimetype}
                </p>
              </div>

              <div className="fileDetails-grid">
                <p className="text-secondary">Size:</p>
                <p className="fileDetails-gridColumn">
                  {PrettyBytes(details.manifest.datasetSize)}
                </p>
              </div>

              <div className="fileDetails-grid">
                <p className="text-secondary">Protected:</p>
                <p className="fileDetails-gridColumn">
                  {details.manifest.protected ? "Yes" : "No"}
                </p>
              </div>

              <div className="fileDetails-grid">
                <p className="text-secondary">Used:</p>
                <p className="fileDetails-gridColumn">
                  {purchases + " purchase(s)"}
                </p>
              </div>

              <div className="fileDetails-actions">
                <CidCopyButton cid={details.cid} />

                <Button
                  Icon={() => <DownloadIcon size={ICON_SIZE} />}
                  label="Download"
                  onClick={onDownload}></Button>
              </div>
            </div>
          </>
        )}
      </>
    </Sheets>
  );
}

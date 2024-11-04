import { Button, Input } from "@codex-storage/marketplace-ui-components";
import "./Download.css";
import { ChangeEvent, useState } from "react";
import { CodexSdk } from "../../sdk/codex";
import { DownloadIcon } from "./DownloadIcon";

export function Download() {
  const [cid, setCid] = useState("");
  const onDownload = () => {
    const url = CodexSdk.url() + "/api/codex/v1/data/";
    window.open(url + cid + "/network/stream", "_target");
  };

  const onCidChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCid(e.currentTarget.value);

  return (
    <div className="card download">
      <header>
        <div>
          <DownloadIcon></DownloadIcon>
          <h5>Download</h5>
        </div>
      </header>
      <main className="row gap">
        <Input
          id="cid"
          placeholder="CID"
          inputClassName="download-input"
          size={"medium" as any}
          onChange={onCidChange}></Input>
        <Button
          label="Download"
          onClick={onDownload}
          variant="outline"></Button>
      </main>
    </div>
  );
}

import { Button, Input } from "@codex-storage/marketplace-ui-components";
import "./Download.css";
import { ChangeEvent, useState } from "react";
import { CodexSdk } from "../../sdk/codex";

export function Download() {
  const [cid, setCid] = useState("");
  console.info(cid);
  const onDownload = () => {
    const url = CodexSdk.url() + "/api/codex/v1/data/";
    window.open(url + cid, "_target");
  };

  const onCidChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCid(e.currentTarget.value);

  return (
    <div className="download">
      <div className="download-inputContainer">
        <Input
          id="cid"
          isInvalid={false}
          placeholder="CID"
          inputClassName="download-input"
          onChange={onCidChange}></Input>
      </div>
      <Button label="Download" onClick={onDownload}></Button>
    </div>
  );
}

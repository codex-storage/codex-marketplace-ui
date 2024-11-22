import { Button, Input } from "@codex-storage/marketplace-ui-components";
import "./Download.css";
import { ChangeEvent, useState } from "react";
import Img from "../../assets/img/onboarding.png";

export function Download() {
  const [cid, setCid] = useState("");
  const onDownload = () => {
    var anchor = document.createElement("a");
    anchor.href = Img;
    anchor.target = "_blank";
    anchor.download = cid + ".png";
    anchor.click();
  };

  const onCidChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCid(e.currentTarget.value);

  return (
    <main className="row gap download">
      <Input
        id="cid"
        placeholder="CID"
        inputClassName="download-input"
        variant={"medium"}
        autoComplete="off"
        value={cid}
        onChange={onCidChange}></Input>
      <Button label="Download" onClick={onDownload} variant="outline"></Button>
    </main>
  );
}

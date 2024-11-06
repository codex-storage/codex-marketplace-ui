import { useDebug } from "../../hooks/useDebug";
import { AlphaText } from "../AlphaText/AlphaText";
import { AlphaIcon } from "../OnBoarding/AlphaIcon";
import "./Versions.css";
import { VersionsUtil } from "./versions.utils";

const throwOnError = false;

export function Versions() {
  const debug = useDebug(throwOnError);

  const version = VersionsUtil.clientVersion(debug.data?.codex.version);

  return (
    <div className="versions">
      <AlphaIcon variant="error" />
      <div>
        <p>Client</p>
        <small>VER. {version}</small>
      </div>
      <div>
        <p>Vault</p>
        <small>VER. {VersionsUtil.codexVersion()}</small>
        <AlphaText variant="failure" width={37}></AlphaText>
      </div>
    </div>
  );
}

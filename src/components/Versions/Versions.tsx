import { useDebug } from "../../hooks/useDebug";
import "./Versions.css";
import { VersionsUtil } from "./versions.utils";
import AlphaIcon from "../../assets/icons/alpha.svg?react";
import AlphaText from "../../assets/icons/alphatext.svg?react";

const throwOnError = false;

export function Versions() {
  const debug = useDebug(throwOnError);

  const version = VersionsUtil.clientVersion(debug.data?.codex.version);

  return (
    <div className="versions">
      <AlphaIcon color="var(--codex-color-error-hexa)" width={20} />
      <div>
        <p>Client</p>
        <small>VER. {version}</small>
      </div>
      <div>
        <p>Vault</p>
        <small>VER. {VersionsUtil.codexVersion()}</small>
        <AlphaText color="var(--codex-color-error-hexa)" width={37}></AlphaText>
      </div>
    </div>
  );
}

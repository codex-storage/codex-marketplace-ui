import { useDebug } from "../../hooks/useDebug";
import { AlphaText } from "../AlphaText/AlphaText";
import { AlphaIcon } from "../OnBoarding/AlphaIcon";
import "./Versions.css";

const throwOnError = true;

export function Versions() {
  const debug = useDebug(throwOnError);

  const parts = debug.data?.codex.version.split("\n") || [""];
  const version = parts[parts.length - 1];

  return (
    <div className="versions">
      <AlphaIcon variant="error" />
      <div>
        <p>Client</p>
        <small>VER. {version}</small>
      </div>
      <div>
        <p>Vault</p>
        <small>VER. {import.meta.env.PACKAGE_VERSION}</small>
        <AlphaText variant="failure" width={37}></AlphaText>
      </div>
    </div>
  );
}

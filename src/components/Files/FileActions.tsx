import { ButtonIcon, Cell } from "@codex-storage/marketplace-ui-components";
import { FolderButton } from "./FolderButton";
import { CodexDataContent } from "@codex-storage/sdk-js";
import { CodexSdk } from "../../sdk/codex";
import "./FileActions.css";
import { DownloadIcon } from "./DownloadIcon";
import { InfoFileIcon } from "./InfoFileIcon";

type Props = {
  content: CodexDataContent;
  folders: [string, string[]][];
  onFolderToggle: (cid: string, folder: string) => void;
  onDetails: (cid: string) => void;
};

export function FileActions({
  content,
  folders,
  onFolderToggle,
  onDetails,
}: Props) {
  const url = CodexSdk.url() + "/api/codex/v1/data/";

  return (
    <Cell className="file-actions">
      <div>
        <ButtonIcon
          animation="bounce"
          onClick={() => window.open(url + content.cid, "_blank")}
          Icon={DownloadIcon}></ButtonIcon>

        <FolderButton
          folders={folders.map(([folder, files]) => [
            folder,
            files.includes(content.cid),
          ])}
          onFolderToggle={(folder) => onFolderToggle(content.cid, folder)}
        />

        <ButtonIcon
          variant="small"
          onClick={() => onDetails(content.cid)}
          Icon={InfoFileIcon}></ButtonIcon>
      </div>
    </Cell>
  );
}

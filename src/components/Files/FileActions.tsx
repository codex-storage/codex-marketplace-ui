import { ButtonIcon, Cell } from "@codex-storage/marketplace-ui-components";
import { Download, ReceiptText } from "lucide-react";
import { ICON_SIZE } from "../../utils/constants";
import { FolderButton } from "./FolderButton";
import { CodexDataContent } from "@codex-storage/sdk-js";
import { CodexSdk } from "../../sdk/codex";

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
    <Cell>
      <div className="files-fileActions">
        <ButtonIcon
          variant="small"
          animation="bounce"
          onClick={() => window.open(url + content.cid, "_blank")}
          Icon={(props) => (
            <Download size={ICON_SIZE} {...props} />
          )}></ButtonIcon>

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
          Icon={() => <ReceiptText size={ICON_SIZE} />}></ButtonIcon>
      </div>
    </Cell>
  );
}

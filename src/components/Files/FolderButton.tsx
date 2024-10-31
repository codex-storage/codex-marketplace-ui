import { Backdrop, ButtonIcon } from "@codex-storage/marketplace-ui-components";
import { CheckCircle, Folder } from "lucide-react";
import "./FolderButton.css";
import { useState } from "react";
import { attributes } from "../../utils/attributes";

type Props = {
  folders: [string, boolean][];
  onFolderToggle: (folder: string) => void;
};

export function FolderButton({ folders, onFolderToggle }: Props) {
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);

  const onOpen = () => setOpen(true);

  const attr = attributes({ "aria-expanded": open });

  const doesFolderContainFile = folders.reduce(
    (prev, [, isActive]) => isActive || prev,
    false
  );

  return (
    <div className="folderButton">
      <Backdrop open={open} onClose={onClose}></Backdrop>

      <ButtonIcon
        variant="small"
        onClick={onOpen}
        Icon={() => (
          <Folder
            fill={doesFolderContainFile ? "var(--codex-color-primary)" : ""}
          />
        )}></ButtonIcon>

      <div className="folderButton-options" {...attr}>
        {folders.map(([folder, isActive]) => (
          <div
            key={folder}
            className="folderButton-option"
            onClick={() => onFolderToggle(folder)}>
            <div>{folder}</div>
            <div>
              {isActive && (
                <span className="text--primary">
                  <CheckCircle size={"1rem"}></CheckCircle>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

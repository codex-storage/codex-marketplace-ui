import { Backdrop, ButtonIcon } from "@codex-storage/marketplace-ui-components";
import { CheckCircle } from "lucide-react";
import "./FolderButton.css";
import { useState } from "react";
import { attributes } from "../../utils/attributes";
import { FolderAdd } from "./FolderAdd";
import { classnames } from "../../utils/classnames";

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
    <>
      <div
        className={classnames(
          ["folder-button"],
          ["folder-button--active", doesFolderContainFile]
        )}>
        <ButtonIcon
          variant="small"
          className={classnames([""])}
          onClick={onOpen}
          Icon={FolderAdd}></ButtonIcon>

        <div {...attr}>
          {folders.map(([folder, isActive]) => (
            <div key={folder} onClick={() => onFolderToggle(folder)}>
              <span>{folder}</span>
              {isActive && <CheckCircle size={"1rem"}></CheckCircle>}
            </div>
          ))}
        </div>
      </div>
      <Backdrop open={open} onClose={onClose}></Backdrop>
    </>
  );
}

import { Backdrop, ButtonIcon } from "@codex-storage/marketplace-ui-components";
import "./FolderButton.css";
import { useState } from "react";
import { attributes } from "../../utils/attributes";
import { classnames } from "../../utils/classnames";
import FolderIcon from "../../assets/icons/folder.svg?react";
import SuccessCircleIcon from "../../assets/icons/success-circle.svg?react";

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
          Icon={FolderIcon}></ButtonIcon>

        <div {...attr}>
          {folders.map(([folder, isActive]) => (
            <div key={folder} onClick={() => onFolderToggle(folder)}>
              <span>{folder}</span>
              {isActive && <SuccessCircleIcon width={20}></SuccessCircleIcon>}
            </div>
          ))}
        </div>
      </div>
      <Backdrop open={open} onClose={onClose}></Backdrop>
    </>
  );
}

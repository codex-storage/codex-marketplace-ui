import { CodexSdk } from "../../sdk/codex";
import "./StorageRequestFileChooser.css";
import { ChangeEvent, useEffect } from "react";
import { classnames } from "../../utils/classnames";
import {
  Dropdown,
  DropdownOption,
  Upload,
  WebFileIcon,
} from "@codex-storage/marketplace-ui-components";
import { useData } from "../../hooks/useData";
import { StorageRequestComponentProps } from "./types";
import { useQueryClient } from "@tanstack/react-query";

export function StorageRequestFileChooser({
  storageRequest,
  dispatch,
  onStorageRequestChange,
}: StorageRequestComponentProps) {
  const queryClient = useQueryClient();
  const files = useData();

  useEffect(() => {
    dispatch({
      type: "toggle-buttons",
      isNextEnable: !!storageRequest.cid,
      isBackEnable: true,
    });
  }, [dispatch, storageRequest]);

  const onSelected = (o: DropdownOption) => {
    onStorageRequestChange({ cid: o.subtitle });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    onStorageRequestChange({ cid: value });
  };

  const onSuccess = (data: string) => {
    queryClient.invalidateQueries({ queryKey: ["cids"] });

    onStorageRequestChange({ cid: data });
  };

  const onDelete = () => onStorageRequestChange({ cid: "" });

  const options =
    files.map((f) => {
      return {
        Icon: () => <WebFileIcon type={f.manifest.mimetype} size={24} />,
        title: f.manifest.filename,
        subtitle: f.cid,
      };
    }) || [];

  return (
    <>
      <span className="storageRequest-title">Choose a CID</span>

      <label className="label" htmlFor="cid">
        CID
      </label>

      <Dropdown
        label=""
        id="cid"
        placeholder="Select or type your CID"
        onChange={onChange}
        value={storageRequest.cid}
        options={options}
        onSelected={onSelected}
        className={classnames(
          ["storageRequestFileChooser-dropdown"],
          ["storageRequestFileChooser-dropdown-success", !!storageRequest.cid]
        )}
      />

      <div className="storageRequestFileChooser-separator">
        <hr className="storageRequestFileChooser-hr" />
        <span className="storageRequestFileChooser-or">OR</span>
        <hr className="storageRequestFileChooser-hr" />
      </div>

      <span className="storageRequest-title">
        <div>
          <span>Upload a file</span>
        </div>
        <span className="input-helper-text text-secondary">
          The CID will be automatically copied after your upload.
        </span>
      </span>

      <Upload
        onSuccess={onSuccess}
        editable={false}
        onDeleteItem={onDelete}
        codexData={CodexSdk.data()}
        successMessage={"Success, the CID has been copied to the field on top."}
      />
    </>
  );
}

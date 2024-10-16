import {
  Check,
  Copy,
  Download,
  FilesIcon,
  Folder,
  Plus,
  ReceiptText,
  X,
} from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { PrettyBytes } from "../../utils/bytes";
import { Dates } from "../../utils/dates";
import "./Files.css";
import { ICON_SIZE } from "../../utils/constants";
import {
  ButtonIcon,
  WebFileIcon,
  Tabs,
  Input,
  Button,
  TabProps,
  Table,
  Row,
  Cell,
} from "@codex-storage/marketplace-ui-components";
import { FileDetails } from "./FileDetails.tsx";
import { useData } from "../../hooks/useData.tsx";
import { WebStorage } from "../../utils/web-storage.ts";
import { CodexSdk } from "../../sdk/codex.ts";
import { FolderButton } from "./FolderButton.tsx";
import { classnames } from "../../utils/classnames.ts";
import { CodexDataContent } from "@codex-storage/sdk-js";
import { Files as F } from "../../utils/files.ts";

type SortFn = (a: CodexDataContent, b: CodexDataContent) => number;

export function Files() {
  const files = useData();
  const [index, setIndex] = useState(0);
  const [folder, setFolder] = useState("");
  const [folders, setFolders] = useState<[string, string[]][]>([]);
  const [error, setError] = useState("");
  const [details, setDetails] = useState<CodexDataContent | null>(null);
  const [sortFn, setSortFn] = useState<SortFn | null>(null);
  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    WebStorage.folders.list().then((items) => setFolders(items));
  }, []);

  const onClose = () => {
    setDetails(null);
  };

  const onTabChange = async (i: number) => setIndex(i);

  const onDetails = (cid: string) => {
    const d = files.find((file) => file.cid === cid);

    if (d) {
      setDetails(d);
    }
  };

  const onFolderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setFolder(val);
    setError("");

    if (!val) {
      return;
    }

    if (e.currentTarget.checkValidity()) {
      if (folders.length >= 5) {
        setError("5 folders limit reached");
        return;
      }

      if (folders.find(([folder]) => folder === val)) {
        setError("This folder already exists");
        return;
      }
    } else {
      setError("9 alpha characters maximum");
    }
  };

  const onFolderCreate = () => {
    WebStorage.folders.create(folder);

    setFolder("");
    setFolders([...folders, [folder, []]]);
  };

  const onFolderDelete = (val: string) => {
    WebStorage.folders.delete(val);

    const currentIndex = folders.findIndex(([name]) => name === val);

    if (currentIndex + 1 == index) {
      setIndex(index - 1);
    }

    setFolders(folders.filter(([name]) => name !== val));
  };

  const onFolderToggle = (cid: string, folder: string) => {
    const current = folders.find(([name]) => name === folder);

    if (!current) {
      return;
    }

    const [, files] = current;

    if (files.includes(cid)) {
      WebStorage.folders.deleteFile(folder, cid);

      setFolders(
        folders.map(([name, files]) =>
          name === folder
            ? [name, files.filter((id) => id !== cid)]
            : [name, files]
        )
      );
    } else {
      WebStorage.folders.addFile(folder, cid);

      setFolders(
        folders.map(([name, files]) =>
          name === folder ? [name, [...files, cid]] : [name, files]
        )
      );
    }
  };

  const tabs: TabProps[] = folders.map(([folder]) => ({
    label: folder,
    Icon: () => <Folder size={"1rem"}></Folder>,
    IconAfter:
      folder === "Favorites"
        ? undefined
        : () => (
            <X
              size={"1rem"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                onFolderDelete(folder);
              }}></X>
          ),
  }));

  const onSortBySize = (state: "" | "asc" | "desc") => {
    if (!state) {
      setSortFn(null);
      return;
    }

    setSortFn(
      () => (a: CodexDataContent, b: CodexDataContent) =>
        state === "desc"
          ? b.manifest.datasetSize - a.manifest.datasetSize
          : a.manifest.datasetSize - b.manifest.datasetSize
    );
  };

  const onSortByDate = (state: "" | "asc" | "desc") => {
    if (!state) {
      setSortFn(null);
      return;
    }

    setSortFn(
      () => (a: CodexDataContent, b: CodexDataContent) =>
        state === "desc"
          ? new Date(b.manifest.uploadedAt).getTime() -
            new Date(a.manifest.uploadedAt).getTime()
          : new Date(a.manifest.uploadedAt).getTime() -
            new Date(b.manifest.uploadedAt).getTime()
    );
  };

  const onToggleFilter = (filter: string) =>
    filters.includes(filter)
      ? setFilters(filters.filter((f) => f !== filter))
      : setFilters([...filters, filter]);

  const onCopy = (cid: string) => navigator.clipboard.writeText(cid);

  tabs.unshift({
    label: "All files",
    Icon: () => <FilesIcon size={"1rem"}></FilesIcon>,
  });

  const items =
    index === 0
      ? files
      : files.filter((file) => folders[index - 1][1].includes(file.cid));

  const url = CodexSdk.url() + "/api/codex/v1/data/";

  const headers = [
    ["file"],
    ["size", onSortBySize],
    ["date", onSortByDate],
    ["actions"],
  ];

  const types = Array.from(
    new Set(files.map((file) => F.type(file.manifest.mimetype)))
  );
  const filtered = items.filter(
    (item) =>
      filters.length === 0 || filters.includes(F.type(item.manifest.mimetype))
  );

  const sorted = sortFn ? [...filtered].sort(sortFn) : filtered;
  const rows =
    sorted.map((c) => (
      <Row
        cells={[
          <Cell>
            <div className="files-cell-file">
              <WebFileIcon type={c.manifest.mimetype} />

              <div>
                <b>{c.manifest.filename}</b>
                <div>
                  <small className="files-fileMeta">{c.cid}</small>
                </div>
              </div>
            </div>
          </Cell>,
          <Cell>{PrettyBytes(c.manifest.datasetSize)}</Cell>,
          <Cell>{Dates.format(c.manifest.uploadedAt).toString()}</Cell>,
          <Cell>
            <div className="files-fileActions">
              <ButtonIcon
                variant="small"
                animation="bounce"
                onClick={() => window.open(url + c.cid, "_blank")}
                Icon={(props) => (
                  <Download size={ICON_SIZE} {...props} />
                )}></ButtonIcon>

              <FolderButton
                folders={folders.map(([folder, files]) => [
                  folder,
                  files.includes(c.cid),
                ])}
                onFolderToggle={(folder) => onFolderToggle(c.cid, folder)}
              />

              <ButtonIcon
                variant="small"
                onClick={() => onCopy(c.cid)}
                animation="buzz"
                Icon={(props) => (
                  <Copy size={ICON_SIZE} {...props} />
                )}></ButtonIcon>

              <ButtonIcon
                variant="small"
                onClick={() => onDetails(c.cid)}
                Icon={() => <ReceiptText size={ICON_SIZE} />}></ButtonIcon>
            </div>
          </Cell>,
        ]}></Row>
    )) || [];

  return (
    <div className="files">
      <div className="files-header">
        <div className="files-headerLeft">
          <div className="files-title">Files</div>
        </div>
        <div className="files-headerRight">
          <div>
            <Input
              id="folder"
              inputClassName={classnames(["files-folders"])}
              isInvalid={folder !== "" && !!error}
              value={folder}
              required={true}
              pattern="[A-Za-z0-9_\-]*"
              maxLength={9}
              helper={error || "Enter the folder name"}
              onChange={onFolderChange}></Input>
          </div>

          <Button
            label="Folder"
            Icon={Plus}
            disabled={!!error || !folder}
            onClick={onFolderCreate}></Button>
        </div>
      </div>

      <Tabs onTabChange={onTabChange} tabIndex={index} tabs={tabs}></Tabs>

      <div className="files-filters">
        {types.map((type) => (
          <span
            key={type}
            className={classnames(
              ["files-filter"],
              ["files-filter--active", filters.includes(type)]
            )}
            onClick={() => onToggleFilter(type)}>
            <span>{type}</span> <Check size={"1rem"}></Check>
          </span>
        ))}
      </div>

      <div className="files-fileBody">
        <Table headers={headers as any} rows={rows} />
      </div>

      <FileDetails onClose={onClose} details={details} />
    </div>
  );
}

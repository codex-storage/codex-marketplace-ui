import { CodexDataContent } from "@codex-storage/sdk-js";
import { Files } from "../../utils/files";
import { classnames } from "../../utils/classnames";
import { Check } from "lucide-react";

type Props = {
  files: CodexDataContent[];
  onFilterToggle: (filter: string) => void;
  selected: string[];
};

export function FilterFilters({ selected, files, onFilterToggle }: Props) {
  const filters = Array.from(
    new Set(
      files
        .filter((f) => f.manifest.mimetype !== "")
        .map((file) =>
          Files.isArchive(file.manifest.mimetype)
            ? "archive"
            : Files.type(file.manifest.mimetype)
        )
    )
  );

  return filters.map((type) => (
    <span
      key={type}
      className={classnames(
        ["files-filter"],
        ["files-filter--active", !!filters.find((f) => selected.includes(f))]
      )}
      onClick={() => onFilterToggle(type)}>
      <span>{type}</span> <Check size={"1rem"}></Check>
    </span>
  ));
}

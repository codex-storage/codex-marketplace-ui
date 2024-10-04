import { Cell } from "@codex-storage/marketplace-ui-components";
import "./TruncateCell.css";

type Props = {
  value: string;
};

export function TruncateCell({ value }: Props) {
  if (value.length <= 10) {
    return <span id={value}>{value}</span>;
  }

  return (
    <Cell>
      <div className="truncateCell" id={value}>
        <div className="truncateCell--ellipsis">
          <span>{value}</span>
        </div>
      </div>
    </Cell>
  );
}

import "./ConnectedAccount.css";
import { WalletCard } from "./WalletCard";
import { ProgressCircle } from "./ProgressCircle";
import ArrowRightIcon from "../../assets/icons/arrow-right.svg?react";
import { useState } from "react";
import { attributes } from "../../utils/attributes";

type TabType = "weekly" | "daily" | "monthly";

export function ConnectedAccount() {
  const [tab, setTab] = useState<TabType>("monthly");

  return (
    <div className="connected-account">
      <main>
        <WalletCard tab={tab}></WalletCard>
      </main>
      <footer>
        <ul>
          <li
            onClick={() => setTab("daily")}
            {...attributes({ "aria-selected": tab === "daily" })}>
            Daily
          </li>
          <li
            onClick={() => setTab("weekly")}
            {...attributes({ "aria-selected": tab === "weekly" })}>
            Weekly
          </li>
          <li
            onClick={() => setTab("monthly")}
            {...attributes({ "aria-selected": tab === "monthly" })}>
            Monthly
          </li>
        </ul>
        <div>
          <div className="row gap">
            <ProgressCircle value={10} />
            <div>
              <h6>Income</h6>
              <var>$15.00</var> <small>/ week</small>
            </div>

            <div>
              <h6>Spend</h6>
              <var>$5.00</var> <small>/ week</small>
            </div>
          </div>
          <button>
            <ArrowRightIcon></ArrowRightIcon>
          </button>
        </div>
      </footer>
    </div>
  );
}

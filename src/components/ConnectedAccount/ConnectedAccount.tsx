import "./ConnectedAccount.css";
import { WalletCard } from "./WalletCard";
import { ProgressCircle } from "./ProgressCircle";
import ArrowRightIcon from "../../assets/icons/arrow-right.svg?react";

export function ConnectedAccount() {
  return (
    <div className="connected-account">
      <main>
        <WalletCard></WalletCard>
      </main>
      <footer>
        <ul>
          <li>Daily</li>
          <li aria-selected>Weekly</li>
          <li>Monthly</li>
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

import { Button } from "@codex-storage/marketplace-ui-components";
import { AccountIcon } from "../AccountIcon/AccountIcon";
import "./ConnectedAccount.css";
import { PlusIcon } from "../PlusIcon/PlusIcon";
import { WalletCard } from "./WalletCard";
import { ProgressCircle } from "./ProgressCircle";
import { ArrowRightIcon } from "../ArrowRightIcon/ArrowRightIcon";

export function ConnectedAccount() {
  return (
    <div className="card connected-account">
      <header>
        <div>
          <AccountIcon></AccountIcon>
          <h5>Connected Account</h5>
        </div>
        <Button Icon={PlusIcon} label="Add Wallet" variant="outline"></Button>
      </header>
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

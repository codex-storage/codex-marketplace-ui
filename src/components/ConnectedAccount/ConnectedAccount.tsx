import { Button } from "@codex-storage/marketplace-ui-components";
import { AccountIcon } from "../AccountIcon/AccountIcon";
import "./ConnectedAccount.css";
import { PlusIcon } from "../PlusIcon/PlusIcon";
import { WalletCard } from "./WalletCard";

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
    </div>
  );
}

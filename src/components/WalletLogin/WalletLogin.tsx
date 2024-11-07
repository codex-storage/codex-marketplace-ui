import { Strings } from "../../utils/strings";
import "./WalletLogin.css";

export function WalletConnect() {
  return (
    <div className="wallet-login">
      <img src="/img/wallet-login.png" width={48} height={48} />
      <div>
        <p>Mainnet</p>
        <var>
          {Strings.shortId("0x5B3D1D5D5C5D5D5D5D5D5D5D5D5D5D5D5D5D5D5D")}
        </var>
        <footer>
          <p>Connected</p>
          <a>Disconnect</a>
        </footer>
      </div>
    </div>
  );
}

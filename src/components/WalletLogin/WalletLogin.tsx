import "./WalletLogin.css";

export function WalletConnect() {
  return (
    <div className="wallet-login">
      <img src="/img/wallet-login.png" width={48} height={48} />
      <div>
        <p>Mainnet</p>
        <var>moodeng.eth</var>
        <footer>
          <p>Connected</p>
          <a>Disconnect</a>
        </footer>
      </div>
    </div>
  );
}

import "./WalletCard.css";
import ArrowRightIcon from "../../assets/icons/arrow-right.svg?react";
import ArrowLeftIcon from "../../assets/icons/arrow-left.svg?react";
import WalletChart from "../../assets/icons/chart.svg?react";
import WalletLines from "../../assets/icons/lines.svg?react";

export function WalletCard() {
  return (
    <div className="wallet-card">
      <header>
        <h6>Wallet</h6>
        <div>
          <button>
            <ArrowLeftIcon></ArrowLeftIcon>
          </button>
          <button>
            <ArrowRightIcon></ArrowRightIcon>
          </button>
        </div>
      </header>

      <main>
        <section>
          <span>TOKEN</span>
          <var>123,223 CDX</var>
        </section>

        <section>
          <WalletChart></WalletChart>
          <WalletLines></WalletLines>
        </section>
      </main>

      <footer>
        <div>
          <span>TOKEN</span>
          <div className="row">
            <var>$1,540 USD</var>
            <small>+ 5%</small>
          </div>
        </div>
        <select defaultValue={"US"}>
          <option value={"US"}></option>
        </select>
      </footer>
    </div>
  );
}

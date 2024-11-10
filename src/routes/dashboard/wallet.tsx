import { createFileRoute } from "@tanstack/react-router";
import { ConnectedAccount } from "../../components/ConnectedAccount/ConnectedAccount";
import { Card } from "../../components/Card/Card";
import WalletIcon from "../../assets/icons/wallet.svg?react";
import PlusIcon from "../../assets/icons/plus.svg?react";
import RequestDurationIcon from "../../assets/icons/request-duration.svg?react";
import { RequireAssitance } from "../../components/RequireAssitance/RequireAssitance";
import "./wallet.css";

export const Route = createFileRoute("/dashboard/wallet")({
  component: () => {
    return (
      <div className="wallet-page" style={{ display: "flex", gap: 16 }}>
        <Card
          icon={<WalletIcon width={24}></WalletIcon>}
          title="Connected Account"
          buttonLabel="Add Wallet"
          buttonIcon={() => <PlusIcon width={20} />}>
          <ConnectedAccount></ConnectedAccount>
        </Card>
        <Card
          icon={<RequestDurationIcon width={24}></RequestDurationIcon>}
          title="Activity">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 8,
              height: "100%",
            }}>
            <div>
              <RequestDurationIcon width={24}></RequestDurationIcon>
            </div>
            <div style={{ color: "#969696", fontSize: 20 }}>
              You currently have no activity.
            </div>
            <RequireAssitance></RequireAssitance>
          </div>
        </Card>
      </div>
    );
  },
});

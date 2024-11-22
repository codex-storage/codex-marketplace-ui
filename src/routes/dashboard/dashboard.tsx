import { Files } from "../../components/Files/Files.tsx";
import { WelcomeCard } from "../../components/Welcome/WelcomeCard.tsx";
import { Download } from "../../components/Download/Download.tsx";
import "./dashboard.css";
import { Versions } from "../../components/Versions/Versions.tsx";
import { WebStorage } from "../../utils/web-storage.ts";
import { ConnectedAccount } from "../../components/ConnectedAccount/ConnectedAccount.tsx";
import { NodeSpace } from "../../components/NodeSpace/NodeSpace.tsx";
import { UploadCard } from "../../components/UploadCard/UploadCard.tsx";
import { PeersCard } from "../../components/Peers/PeersCard.tsx";
import { Card } from "../../components/Card/Card.tsx";
import NodesIcon from "../../assets/icons/nodes.svg?react";
import WalletIcon from "../../assets/icons/wallet.svg?react";
import PlusIcon from "../../assets/icons/plus.svg?react";
import PeersIcon from "../../assets/icons/peers.svg?react";
import UploadIcon from "../../assets/icons/upload.svg?react";
import DownloadIcon from "../../assets/icons/download.svg?react";
import FetchIcon from "../../assets/icons/fetch.svg?react";
import { ManifestFetch } from "../../components/ManifestFetch/ManifestFetch.tsx";
import FilesIconOutline from "../../assets/icons/files-outline.svg?react";
import { useNavigate } from "react-router-dom";

export function DashboardRoute() {
  const username = WebStorage.onBoarding.getDisplayName();
  const naviguate = useNavigate();
  const emoji = WebStorage.onBoarding.getEmoji();

  return (
    <div className="dashboard">
      <header>
        <div className="row gap">
          <div className="emoji">{emoji}</div>
          <div>
            <h3>Welcome back,</h3>
            <h4>{username}</h4>
          </div>
        </div>
        <Versions />
      </header>
      <main>
        <Card
          icon={<WalletIcon width={24}></WalletIcon>}
          className="card--main"
          title="Connected Account"
          buttonLabel="Add Wallet"
          buttonIcon={() => <PlusIcon width={20} />}>
          <ConnectedAccount></ConnectedAccount>
        </Card>

        <div className="column">
          <Card
            icon={<NodesIcon width={24}></NodesIcon>}
            title="Storage"
            buttonLabel="Details"
            buttonAction={() => naviguate("/dashboard/availabilities")}>
            <NodeSpace></NodeSpace>
          </Card>
          <Card
            icon={<PeersIcon width={20}></PeersIcon>}
            title="Peers"
            buttonLabel="Details"
            buttonAction={() => naviguate("/dashboard/peers")}>
            <PeersCard></PeersCard>
          </Card>
        </div>

        <WelcomeCard />

        <div className="column">
          <Card icon={<UploadIcon width={24}></UploadIcon>} title="Upload">
            <UploadCard />
          </Card>

          <Card icon={<DownloadIcon></DownloadIcon>} title="Download">
            <Download />
          </Card>

          <Card icon={<FetchIcon></FetchIcon>} title="Fetch manifest">
            <ManifestFetch />
          </Card>
        </div>

        <Card
          icon={<FilesIconOutline width={24}></FilesIconOutline>}
          className="card--main card--main--files"
          title="Files">
          <Files limit={4} />
        </Card>
      </main>
    </div>
  );
}

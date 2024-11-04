import { PeersIcon } from "../Menu/PeersIcon";
import { PeersMap } from "./PeersMap";
import "./PeersCard.css";
import { useDebug } from "../../hooks/useDebug";
import { PeerUtils } from "./peers.util";
import { PeersChart } from "./PeersChart";
import { PeersQuality } from "./PeersQuality";
import { Button } from "@codex-storage/marketplace-ui-components";

const throwOnError = true;

export function PeersCard() {
  const { data } = useDebug(throwOnError);

  const nodes = data?.table.nodes ?? [];
  const actives = PeerUtils.countActives(nodes);
  const degrees = PeerUtils.calculareDegrees(nodes);
  const good = PeerUtils.isGoodQuality(actives);

  return (
    <div className="card peers-card">
      <header>
        <div>
          <PeersIcon></PeersIcon>
          <h5>Peers</h5>
        </div>
        <Button label="Details" variant="outline"></Button>
      </header>
      <main className="row gap">
        <PeersMap nodes={data?.table.nodes || []}></PeersMap>
        <PeersChart actives={actives} degrees={degrees}></PeersChart>
      </main>
      <footer>
        <PeersQuality good={good}></PeersQuality>
      </footer>
    </div>
  );
}

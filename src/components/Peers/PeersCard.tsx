import { PeersMap } from "./PeersMap";
import "./PeersCard.css";
import { useDebug } from "../../hooks/useDebug";
import { PeerUtils } from "./peers.utils";
import { PeersChart } from "./PeersChart";
import { PeersQuality } from "./PeersQuality";

const throwOnError = true;

export function PeersCard() {
  const { data } = useDebug(throwOnError);

  const nodes = data?.table.nodes ?? [];
  const actives = PeerUtils.countActives(nodes);
  const percent = PeerUtils.calcularePercent(nodes);
  const good = PeerUtils.isGoodQuality(actives);

  return (
    <div className="peers-card">
      <main className="row gap">
        <PeersMap nodes={data?.table.nodes || []}></PeersMap>
        <PeersChart actives={actives} percent={percent}></PeersChart>
      </main>
      <footer>
        <PeersQuality good={good}></PeersQuality>
      </footer>
    </div>
  );
}

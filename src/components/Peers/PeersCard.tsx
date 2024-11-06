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
  const degrees = PeerUtils.calculareDegrees(nodes);
  const good = PeerUtils.isGoodQuality(actives);

  return (
    <div className="peers-card">
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

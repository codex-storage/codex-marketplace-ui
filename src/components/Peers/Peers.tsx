import {
  TabSortState,
  Row,
  Cell,
  Table,
} from "@codex-storage/marketplace-ui-components";
import { useCallback, useState } from "react";
import { PeerCountryCell } from "./PeerCountryCell";
import "./Peers.css";
import { PeerGeo, PeerNode, PeerSortFn, PeerUtils } from "./peers.utils";
import { PeersMap } from "./PeersMap";
import { useDebug } from "../../hooks/useDebug";
import { PeersQuality } from "./PeersQuality";
import { PeersChart } from "./PeersChart";
import SuccessCircleIcon from "../../assets/icons/success-circle.svg?react";
import ErrorCircleIcon from "../../assets/icons/error-circle.svg?react";
import PeersIcon from "../../assets/icons/peers.svg?react";

const throwOnError = true;

export const Peers = () => {
  const { data } = useDebug(throwOnError);
  const [ips, setIps] = useState<Record<string, PeerGeo>>({});

  const onPinAdd = useCallback((node: PeerNode, geo: PeerGeo) => {
    const [ip = ""] = node.address.split(":");
    setIps((ips) => ({ ...ips, [ip]: geo }));
  }, []);

  const [sortFn, setSortFn] = useState<PeerSortFn | null>(() =>
    PeerUtils.sortByBoolean("desc")
  );

  const onSortByCountry = (state: TabSortState) =>
    setSortFn(() => PeerUtils.sortByCountry(state, ips));

  const onSortActive = (state: TabSortState) =>
    setSortFn(() => PeerUtils.sortByBoolean(state));

  const headers = [
    ["Country", onSortByCountry],
    ["PeerId"],
    ["Active", onSortActive],
  ] satisfies [string, ((state: TabSortState) => void)?][];

  const nodes = data?.table.nodes || [];
  const sorted = sortFn ? nodes.slice().sort(sortFn) : nodes;

  const rows = sorted.map((node) => {
    const [ip = ""] = node.address.split(":");
    const geo = ips[ip];

    return (
      <Row
        cells={[
          <PeerCountryCell node={node} geo={geo}></PeerCountryCell>,
          <Cell>{node.peerId}</Cell>,
          <Cell>
            {node.seen ? (
              <div className="status--active">
                <SuccessCircleIcon /> Active
              </div>
            ) : (
              <div className="status--inactive">
                <ErrorCircleIcon></ErrorCircleIcon> Inactive
              </div>
            )}
          </Cell>,
        ]}></Row>
    );
  });

  const actives = PeerUtils.countActives(sorted);
  const degrees = PeerUtils.calculareDegrees(sorted);
  const good = PeerUtils.isGoodQuality(actives);

  return (
    <div className="peers">
      <div>
        <PeersMap nodes={nodes} onPinAdd={onPinAdd} />
        <div>
          <ul>
            <li>Legend</li>
            <li>1-3</li>
            <li>3-5</li>
            <li>5 +</li>
          </ul>
          <div className="connections">
            <header>
              <PeersIcon width={24}></PeersIcon>
              <span>Connections</span>
            </header>
            <main>
              <PeersChart actives={actives} degrees={degrees}></PeersChart>
            </main>
            <footer>
              <PeersQuality good={good}></PeersQuality>
            </footer>
          </div>
        </div>
      </div>

      <Table headers={headers} rows={rows} defaultSortIndex={2} />
    </div>
  );
};

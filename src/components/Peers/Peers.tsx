import {
  TabSortState,
  Row,
  Cell,
  Table,
} from "@codex-storage/marketplace-ui-components";
import DottedMap from "dotted-map/without-countries";
import { useRef, useState, useCallback } from "react";
import { ErrorCircleIcon } from "../ErrorCircleIcon/ErrorCircleIcon";
import { PeersIcon } from "../Menu/PeersIcon";
import { PeerCountryCell } from "./PeerCountryCell";
import { SuccessCheckIcon } from "../SuccessCheckIcon/SuccessCheckIcon";
import { useDebug } from "../../hooks/useDebug";
import { getMapJSON } from "dotted-map";
import "./Peers.css";
import { PeerPin, PeerSortFn, PeerUtils } from "./peers.util";

// This function accepts the same arguments as DottedMap in the example above.
const mapJsonString = getMapJSON({ height: 60, grid: "diagonal" });

type CustomCSSProperties = React.CSSProperties & {
  "--codex-peers-degrees": number;
};

const throwOnError = true;

export const Peers = () => {
  const ips = useRef<Record<string, string>>({});
  const [pins, setPins] = useState<[PeerPin, number][]>([]);
  const [sortFn, setSortFn] = useState<PeerSortFn | null>(() =>
    PeerUtils.sortByBoolean("desc")
  );
  const { data } = useDebug(throwOnError);

  const onPinAdd = useCallback(
    ({
      countryIso,
      ip,
      ...pin
    }: PeerPin & { countryIso: string; ip: string }) => {
      setPins((val) => PeerUtils.incPin(val, pin));
      ips.current[ip] = countryIso;
    },
    []
  );

  // It’s safe to re-create the map at each render, because of the
  // pre-computation it’s super fast ⚡️
  const map = new DottedMap({ map: JSON.parse(mapJsonString) });

  pins.map(([pin, quantity]) =>
    map.addPin({
      lat: pin.lat,
      lng: pin.lng,
      svgOptions: { color: "#d6ff79", radius: 0.8 * quantity },
    })
  );

  const svgMap = map.getSVG({
    radius: 0.32,
    color: "#969696",
    shape: "circle",
    backgroundColor: "#141414",
  });

  const onSortByCountry = (state: TabSortState) => {
    if (!state) {
      setSortFn(null);
      return;
    }

    setSortFn(() => PeerUtils.sortByCountry(state, ips.current));
  };

  const onSortActive = (state: TabSortState) => {
    if (!state) {
      setSortFn(null);
      return;
    }

    setSortFn(() => PeerUtils.sortByBoolean(state));
  };

  const headers = [
    ["Country", onSortByCountry],
    ["PeerId"],
    ["Active", onSortActive],
  ] satisfies [string, ((state: TabSortState) => void)?][];

  const nodes = data?.table?.nodes || [];
  const sorted = sortFn ? nodes.slice().sort(sortFn) : nodes;

  const rows = sorted.map((node) => (
    <Row
      cells={[
        <PeerCountryCell
          onPinAdd={onPinAdd}
          address={node.address}></PeerCountryCell>,
        <Cell>{node.peerId}</Cell>,
        <Cell>
          {node.seen ? (
            <div className="status--active">
              <SuccessCheckIcon variant="primary"></SuccessCheckIcon> Active
            </div>
          ) : (
            <div className="status--inactive">
              <ErrorCircleIcon></ErrorCircleIcon> Inactive
            </div>
          )}
        </Cell>,
      ]}></Row>
  ));

  const actives = PeerUtils.countActives(sorted);
  const degrees = PeerUtils.calculareDegrees(sorted);
  const good = actives > 0;

  const styles: CustomCSSProperties = {
    "--codex-peers-degrees": degrees,
  };

  return (
    <div className="peers">
      <div>
        <div dangerouslySetInnerHTML={{ __html: svgMap }}></div>
        <div>
          <ul>
            <li>Legend</li>
            <li>1-3</li>
            <li>3-5</li>
            <li>5 +</li>
          </ul>
          <div className="connections">
            <header>
              <PeersIcon></PeersIcon>
              <span>Connections</span>
            </header>
            <main style={styles}>
              <div>
                <div></div>
                <span>{actives}</span>
              </div>
            </main>
            <footer>
              {good ? (
                <>
                  <SuccessCheckIcon variant="primary"></SuccessCheckIcon>
                  <span>Peer connections in good standing. </span>
                </>
              ) : (
                <>
                  <ErrorCircleIcon />
                  <span>No peer connection active. </span>
                </>
              )}
            </footer>
          </div>
        </div>
      </div>

      <Table headers={headers} rows={rows} defaultSortIndex={2} />
    </div>
  );
};

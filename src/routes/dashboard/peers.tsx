import { Cell, Row, Table } from "@codex-storage/marketplace-ui-components";
import { createFileRoute } from "@tanstack/react-router";
import { getMapJSON } from "dotted-map";
import DottedMap from "dotted-map/without-countries";
import { Promises } from "../../utils/promises";
import { useQuery } from "@tanstack/react-query";
import { PeerCountryCell } from "../../components/Peers/PeerCountryCell";
import { useCallback, useState } from "react";
import { PeerPin } from "../../components/Peers/types";
import "./peers.css";
import { CodexSdk } from "../../sdk/codex";
import { ErrorBoundary } from "@sentry/react";
import { ErrorPlaceholder } from "../../components/ErrorPlaceholder/ErrorPlaceholder";
import { PeersIcon } from "../../components/Menu/PeersIcon";
import { SuccessCheckIcon } from "../../components/SuccessCheckIcon/SuccessCheckIcon";
import { ErrorCircleIcon } from "../../components/ErrorCircleIcon/ErrorCircleIcon";

// This function accepts the same arguments as DottedMap in the example above.
const mapJsonString = getMapJSON({ height: 60, grid: "diagonal" });

type CustomCSSProperties = React.CSSProperties & {
  "--codex-peers-percent": number;
};

const Peers = () => {
  const [pins, setPins] = useState<[PeerPin, number][]>([]);
  const { data } = useQuery({
    queryFn: () =>
      CodexSdk.debug()
        .info()
        .then((s) => Promises.rejectOnError(s)),
    queryKey: ["debug"],

    // No need to retry because if the connection to the node
    // is back again, all the queries will be invalidated.
    retry: false,

    // The client node should be local, so display the cache value while
    // making a background request looks good.
    staleTime: 0,

    // Refreshing when focus returns can be useful if a user comes back
    // to the UI after performing an operation in the terminal.
    refetchOnWindowFocus: true,

    // Throw the error to the error boundary
    throwOnError: true,
  });

  const onPinAdd = useCallback((pin: PeerPin) => {
    setPins((val) => {
      const [, quantity = 0] =
        val.find(([p]) => p.lat === pin.lat && p.lng == pin.lng) || [];
      return [...val, [pin, quantity + 1]];
    });
  }, []);

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

  const headers = ["Country", "PeerId", "Active"];

  const rows =
    (data?.table?.nodes || []).map((node) => (
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
    )) || [];

  const actives =
    data?.table.nodes.reduce((acc, cur) => acc + (cur.seen ? 1 : 0), 0) || 0;
  const total = data?.table.nodes.length || 1;

  const styles: CustomCSSProperties = {
    "--codex-peers-percent": (actives / total) * 180,
  };

  return (
    <div className="peers">
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
            <SuccessCheckIcon variant="primary"></SuccessCheckIcon>{" "}
            <span>Peer connections in Good standing. </span>
          </footer>
        </div>
        <div dangerouslySetInnerHTML={{ __html: svgMap }}></div>
      </div>

      <Table headers={headers} rows={rows} />
    </div>
  );
};

export const Route = createFileRoute("/dashboard/peers")({
  component: () => (
    <ErrorBoundary
      fallback={({ error }) => (
        <ErrorPlaceholder error={error} subtitle="Cannot retrieve the data." />
      )}>
      <Peers />
    </ErrorBoundary>
  ),
});

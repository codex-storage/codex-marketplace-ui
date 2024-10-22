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

// This function accepts the same arguments as DottedMap in the example above.
const mapJsonString = getMapJSON({ height: 60, grid: "diagonal" });

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
    radius: 0.42,
    color: "#423B38",
    shape: "circle",
    backgroundColor: "#020300",
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
              <div className="networkIndicator-point networkIndicator-point--online"></div>
            ) : (
              <div className="networkIndicator-point networkIndicator-point--offline"></div>
            )}
          </Cell>,
        ]}></Row>
    )) || [];

  return (
    <div className="peers">
      {/* <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="peers-map"
      /> */}

      <div
        className="peers-map"
        dangerouslySetInnerHTML={{ __html: svgMap }}></div>

      <Table headers={headers} rows={rows} className="peers-table" />
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

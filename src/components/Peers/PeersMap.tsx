import { getMapJSON } from "dotted-map";
import DottedMap from "dotted-map/without-countries";
import { PeerGeo, PeerNode, PeerUtils } from "./peers.utils";
import { useCallback, useState } from "react";
import { PeersPin } from "./PeersPin";
import "./PeersMap.css";

// This function accepts the same arguments as DottedMap in the example above.
const mapJsonString = getMapJSON({ height: 60, grid: "diagonal" });

type Props = {
  nodes: PeerNode[];
  onPinAdd?: (node: PeerNode, geo: PeerGeo) => void;
};

export function PeersMap({ nodes, onPinAdd }: Props) {
  // It’s safe to re-create the map at each render, because of the
  // pre-computation it’s super fast ⚡️
  const map = new DottedMap({ map: JSON.parse(mapJsonString) });

  const [pins, setPins] = useState<[PeerNode & PeerGeo, number][]>([]);

  const onInternalPinAdd = useCallback(
    (node: PeerNode, geo: PeerGeo) => {
      setPins((val) => PeerUtils.incPin(val, { ...node, ...geo }));
      onPinAdd?.(node, geo);
    },
    [setPins]
  );

  pins.map(([pin, quantity]) =>
    map.addPin({
      lat: pin.latitude,
      lng: pin.longitude,
      svgOptions: { color: "#d6ff79", radius: 0.4 * quantity },
    })
  );

  const svgMap = map.getSVG({
    radius: 0.32,
    color: "#969696",
    shape: "circle",
    backgroundColor: "#141414",
  });

  return (
    <>
      {nodes.map((node, index) => (
        <PeersPin key={index} node={node} onLoad={onInternalPinAdd} />
      ))}
      <div
        className="peers-map"
        dangerouslySetInnerHTML={{ __html: svgMap }}></div>
    </>
  );
}

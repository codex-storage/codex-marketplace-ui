import { getMapJSON } from "dotted-map";
import DottedMap from "dotted-map/without-countries";
import { PeerGeo, PeerNode, PeerUtils } from "./peers.utils";
import { useCallback, useState } from "react";
import { PeersPin } from "./PeersPin";

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
      svgOptions: { color: "#d6ff79", radius: 0.1 * quantity },
    })
  );

  const svgMap = map
    .getSVG({
      radius: 0.32,
      color: "#969696",
      shape: "circle",
      backgroundColor: "#141414",
    })
    .replace(
      "</svg>",
      // Include the style into the svg tag for permance reason.
      // An alternative would be to generated the full svg instead
      // of the image but it's costful.
      `<style>
      circle[fill="#d6ff79"] {
        stroke: #6fcb94;
        stroke-width: 0.6px;
        fill: #141414;
        animation: circle-pulse 3s infinite;
      }

      @keyframes circle-pulse {
        0% {
          opacity: 1; /* Fully opaque */
        }
        50% {
          r: 2; /* Increased radius */
          opacity: 1; /* Slightly transparent */
        }
        100% {
          opacity: 1; /* Fully opaque */
        }
      }
    </style></svg>
    `
    );

  return (
    <>
      {nodes.map((node, index) => (
        <PeersPin key={index} node={node} onLoad={onInternalPinAdd} />
      ))}
      <img src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`} />
    </>
  );
}

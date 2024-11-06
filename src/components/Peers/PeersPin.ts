import { useQuery } from "@tanstack/react-query";
import { PeerGeo, PeerNode } from "./peers.utils";
import { useEffect } from "react";

type Props = {
    node: PeerNode
    onLoad: (node: PeerNode, geo: PeerGeo) => void
}

export function PeersPin({ node, onLoad }: Props) {
    const { data } = useQuery({
        queryFn: () => {
            const [ip] = node.address.split(":");

            return fetch(import.meta.env.VITE_GEO_IP_URL + "/json?ip=" + ip).then(
                (res) => res.json()
            );
        },
        queryKey: ["peers", node.address],

        // No need to retry because if the connection to the node
        // is back again, all the queries will be invalidated.
        retry: false,

        // We can cache the data at Infinity because the relation between
        // country and ip is fixed
        staleTime: Infinity,

        // Don't expect something new when coming back to the UI
        refetchOnWindowFocus: false,

        refetchOnMount: false,
    });

    useEffect(() => {
        if (data) {
            onLoad(node, data)
        }
    }, [data, onLoad, node])


    return ""
}
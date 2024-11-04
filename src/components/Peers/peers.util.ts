import { TabSortState } from "@codex-storage/marketplace-ui-components";

export type PeerNode = {
    nodeId: string;
    peerId: string;
    record: string;
    address: string;
    seen: boolean;
};

export type PeerGeo = {
    latitude: number
    longitude: number
    country: string
    country_iso: string
}

export type PeerSortFn = (a: PeerNode, b: PeerNode) => number;

export const PeerUtils = {
    sortByBoolean: (state: TabSortState) => (a: PeerNode, b: PeerNode) => {
        const order = state === "desc" ? 1 : -1;
        return a?.seen === b?.seen ? 0 : b?.seen ? order : -order;
    },

    sortByCountry: (state: TabSortState, ipTable: Record<string, PeerGeo>) =>
        (a: PeerNode, b: PeerNode) => {
            const [ipA = ""] = a.address.split(":")
            const [ipB = ""] = b.address.split(":")
            const countryA = ipTable[ipA].country || "";
            const countryB = ipTable[ipB].country || "";

            return state === "desc"
                ? countryA.localeCompare(countryB)
                : countryB.localeCompare(countryA);
        },

    /**
     * Increments the number of pin for a location  
     */
    incPin(val: [PeerNode & PeerGeo, number][], pin: PeerNode & PeerGeo): [PeerNode & PeerGeo, number][] {
        const [, quantity = 0] =
            val.find(([p]) => p.latitude === pin.latitude && p.longitude == pin.longitude) || [];
        const rest = val.filter(([p]) => p.latitude !== pin.latitude || p.longitude !== pin.longitude)
        return [...rest, [pin, quantity + 1]];
    },

    countActives: (peers: PeerNode[]) =>
        peers.reduce((acc, cur) => acc + (cur.seen ? 1 : 0), 0) || 0,

    calculareDegrees: (peers: PeerNode[]) => {
        const actives = PeerUtils.countActives(peers);
        const total = peers.length || 1;

        return (actives / total) * 180
    },

    isGoodQuality(actives: number) {
        return actives > 0
    },

    geCountryEmoji: (countryCode: string) => {
        const codePoints = countryCode
            .toUpperCase()
            .split("")
            .map((char) => 127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    }

}

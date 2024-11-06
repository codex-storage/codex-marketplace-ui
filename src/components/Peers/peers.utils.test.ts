import { assert, describe, it } from "vitest";
import { PeerGeo, PeerUtils } from "./peers.utils";

describe("peers", () => {
    it("sorts by boolean", async () => {
        const a = { nodeId: "a", peerId: "", record: "", address: "", seen: false }
        const b = { nodeId: "a", peerId: "", record: "", address: "", seen: true }
        const items = [a, b,]

        const descSorted = items.slice().sort(PeerUtils.sortByBoolean("desc"))

        assert.deepEqual(descSorted, [b, a]);

        const ascSorted = items.slice().sort(PeerUtils.sortByBoolean("asc"))

        assert.deepEqual(ascSorted, [a, b]);
    });

    it("sorts by country", async () => {
        const a = { nodeId: "a", peerId: "", record: "", address: "127.0.0.1", seen: false }
        const b = { nodeId: "a", peerId: "", record: "", address: "127.0.0.2", seen: true }

        const table = {
            "127.0.0.1": {
                country: "United States"
            } as PeerGeo,
            "127.0.0.2": {
                country: "France"
            } as PeerGeo,
        }

        const items = [a, b,]

        const descSorted = items.slice().sort(PeerUtils.sortByCountry("desc", table))

        assert.deepEqual(descSorted, [b, a]);

        const ascSorted = items.slice().sort(PeerUtils.sortByCountry("asc", table))

        assert.deepEqual(ascSorted, [a, b]);
    });

    it("adds a new pin", async () => {
        const latLng = { latitude: 0, longitude: 0 } as any
        const values = PeerUtils.incPin([], latLng)

        assert.deepEqual(values, [[latLng, 1]]);
    });

    it("increments an existing pin", async () => {
        const latLng = { lat: 0, lng: 0 } as any
        const values = PeerUtils.incPin([[latLng, 1]], latLng)

        assert.deepEqual(values, [[latLng, 2]]);
    });

    it("count active peers nodes", async () => {
        const a = { nodeId: "a", peerId: "", record: "", address: "127.0.0.1", seen: false }
        const b = { nodeId: "a", peerId: "", record: "", address: "127.0.0.2", seen: true }

        assert.equal(PeerUtils.countActives([a, b]), 1)
    });

    it("calculates active peers nodes degrees", async () => {
        const a = { nodeId: "a", peerId: "", record: "", address: "127.0.0.1", seen: false }
        const b = { nodeId: "a", peerId: "", record: "", address: "127.0.0.2", seen: true }

        assert.equal(PeerUtils.calculareDegrees([a, b]), 90)
    });

    it("returns the country flag", async () => {
        assert.equal(PeerUtils.geCountryEmoji("FR"), "🇫🇷")
    });
})
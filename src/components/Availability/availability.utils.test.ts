import { assert, describe, it } from "vitest";
import { AvailabilityUtils } from "./availability.utils";

describe("files", () => {
    it("sorts by id", async () => {
        const a = {
            id: "a",
            totalSize: 0,
            duration: 0,
            minPrice: 0,
            maxCollateral: 0,
            name: "",
            slots: []
        }
        const b = {
            id: "b",
            totalSize: 0,
            duration: 0,
            minPrice: 0,
            maxCollateral: 0,
            name: "",
            slots: []
        }

        const items = [a, b,]

        const descSorted = items.slice().sort(AvailabilityUtils.sortById("desc"))

        assert.deepEqual(descSorted, [b, a]);

        const ascSorted = items.slice().sort(AvailabilityUtils.sortById("asc"))

        assert.deepEqual(ascSorted, [a, b]);
    });

    it("sorts by size", async () => {
        const a = {
            id: "",
            totalSize: 1,
            duration: 0,
            minPrice: 0,
            maxCollateral: 0,
            name: "",
            slots: []
        }
        const b = {
            id: "",
            totalSize: 2,
            duration: 0,
            minPrice: 0,
            maxCollateral: 0,
            name: "",
            slots: []
        }

        const items = [a, b,]

        const descSorted = items.slice().sort(AvailabilityUtils.sortBySize("desc"))

        assert.deepEqual(descSorted, [b, a]);

        const ascSorted = items.slice().sort(AvailabilityUtils.sortBySize("asc"))

        assert.deepEqual(ascSorted, [a, b]);
    });

    it("sorts by duration", async () => {
        const a = {
            id: "",
            totalSize: 0,
            duration: 1,
            minPrice: 0,
            maxCollateral: 0,
            name: "",
            slots: []
        }
        const b = {
            id: "",
            totalSize: 0,
            duration: 2,
            minPrice: 0,
            maxCollateral: 0,
            name: "",
            slots: []
        }

        const items = [a, b,]

        const descSorted = items.slice().sort(AvailabilityUtils.sortByDuration("desc"))

        assert.deepEqual(descSorted, [b, a]);

        const ascSorted = items.slice().sort(AvailabilityUtils.sortByDuration("asc"))

        assert.deepEqual(ascSorted, [a, b]);
    });

    it("sorts by price", async () => {
        const a = {
            id: "",
            totalSize: 0,
            duration: 0,
            minPrice: 1,
            maxCollateral: 0,
            name: "",
            slots: []
        }
        const b = {
            id: "",
            totalSize: 0,
            duration: 0,
            minPrice: 2,
            maxCollateral: 0,
            name: "",
            slots: []
        }

        const items = [a, b,]

        const descSorted = items.slice().sort(AvailabilityUtils.sortByPrice("desc"))

        assert.deepEqual(descSorted, [b, a]);

        const ascSorted = items.slice().sort(AvailabilityUtils.sortByPrice("asc"))

        assert.deepEqual(ascSorted, [a, b]);
    });

    it("sorts by collateral", async () => {
        const a = {
            id: "",
            totalSize: 0,
            duration: 0,
            minPrice: 0,
            maxCollateral: 1,
            name: "",
            slots: []
        }
        const b = {
            id: "",
            totalSize: 0,
            duration: 0,
            minPrice: 0,
            maxCollateral: 2,
            name: "",
            slots: []
        }

        const items = [a, b,]

        const descSorted = items.slice().sort(AvailabilityUtils.sortByCollateral("desc"))

        assert.deepEqual(descSorted, [b, a]);

        const ascSorted = items.slice().sort(AvailabilityUtils.sortByCollateral("asc"))

        assert.deepEqual(ascSorted, [a, b]);
    });
})
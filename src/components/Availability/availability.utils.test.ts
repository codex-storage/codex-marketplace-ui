import { assert, describe, it } from "vitest";
import { AvailabilityUtils } from "./availability.utils";
import { GB, TB } from "../../utils/constants";
import { CodexNodeSpace } from "@codex-storage/sdk-js";
import { AvailabilityState } from "./types";

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

    it("returns the number of bytes per unit", async () => {
        assert.deepEqual(AvailabilityUtils.toUnit(GB, "gb"), 1);
        assert.deepEqual(AvailabilityUtils.toUnit(TB, "tb"), 1);
    })


    it("returns the max value possible for an availability", async () => {
        const space: CodexNodeSpace = {
            quotaMaxBytes: 8 * GB,
            quotaReservedBytes: 2 * GB,
            quotaUsedBytes: GB,
            totalBlocks: 0
        }
        assert.deepEqual(AvailabilityUtils.maxValue(space), 5 * GB);
    })

    it("checks the availability max value", async () => {
        const availability = {
            totalSize: GB
        } as AvailabilityState
        assert.deepEqual(AvailabilityUtils.isValid(availability, GB * 2), true);
        assert.deepEqual(AvailabilityUtils.isValid({ ...availability, totalSize: -1 }, GB), false);
        assert.deepEqual(AvailabilityUtils.isValid({ ...availability, totalSize: 2 * GB }, GB), false);
    })

    it("toggles item in array", async () => {
        const array: string[] = []
        assert.deepEqual(AvailabilityUtils.toggle(array, "1"), ["1"]);
        assert.deepEqual(AvailabilityUtils.toggle(AvailabilityUtils.toggle(array, "1"), "1"), []);
    })
})
import { TabSortState } from "@codex-storage/marketplace-ui-components"
import { AvailabilityState, AvailabilityWithSlots } from "./types"
import { GB, TB } from "../../utils/constants";
import { CodexNodeSpace } from "@codex-storage/sdk-js";

export const AvailabilityUtils = {
    sortById: (state: TabSortState) =>
        (a: AvailabilityWithSlots, b: AvailabilityWithSlots) => {

            return state === "desc"
                ? b.id
                    .toLocaleLowerCase()
                    .localeCompare(a.id.toLocaleLowerCase())
                : a.id
                    .toLocaleLowerCase()
                    .localeCompare(b.id.toLocaleLowerCase())
        },
    sortBySize: (state: TabSortState) =>
        (a: AvailabilityWithSlots, b: AvailabilityWithSlots) => state === "desc"
            ? b.totalSize - a.totalSize
            : a.totalSize - b.totalSize
    ,
    sortByDuration: (state: TabSortState) =>
        (a: AvailabilityWithSlots, b: AvailabilityWithSlots) => state === "desc"
            ? b.duration - a.duration
            : a.duration - b.duration
    ,
    sortByPrice: (state: TabSortState) =>
        (a: AvailabilityWithSlots, b: AvailabilityWithSlots) => state === "desc"
            ? b.minPrice - a.minPrice
            : a.minPrice - b.minPrice
    ,
    sortByCollateral: (state: TabSortState) =>
        (a: AvailabilityWithSlots, b: AvailabilityWithSlots) => state === "desc"
            ? b.maxCollateral - a.maxCollateral
            : a.maxCollateral - b.maxCollateral
    ,
    toUnit(bytes: number, unit: "gb" | "tb") {
        return bytes / this.unitValue(unit || "gb")
    },
    maxValue(space: CodexNodeSpace) {
        return space.quotaMaxBytes - space.quotaReservedBytes - space.quotaUsedBytes
    },
    unitValue(unit: "gb" | "tb") {
        return unit === "tb" ? TB : GB
    },
    isValid: (
        availability: AvailabilityState,
        max: number
    ) => availability.totalSize > 0 && availability.totalSize <= max
    ,
    toggle: <T>(arr: Array<T>, value: T) =>
        arr.includes(value) ? arr.filter(i => i !== value) : [...arr, value],

    availabilityColors: [
        "#34A0FFFF",
        "#34A0FFEE",
        "#34A0FFDD",
        "#34A0FFCC",
        "#34A0FFBB",
        "#34A0FFAA",
        "#34A0FF99",
    ],

    slotColors: [
        "#D2493CFF",
        "#D2493CEE",
        "#D2493CDD",
        "#D2493CCC",
        "#D2493CBB",
        "#D2493CAA",
        "#D2493C99",
    ]
}
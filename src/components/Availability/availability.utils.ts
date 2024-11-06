import { TabSortState } from "@codex-storage/marketplace-ui-components"
import { AvailabilityWithSlots } from "./types"

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
}
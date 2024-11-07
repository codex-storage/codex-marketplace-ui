import { TabSortState } from "@codex-storage/marketplace-ui-components"
import { CodexPurchase } from "@codex-storage/sdk-js"

export const PurchaseUtils = {
    sortById: (state: TabSortState) =>
        (a: CodexPurchase, b: CodexPurchase) => {

            return state === "desc"
                ? b.requestId
                    .toLocaleLowerCase()
                    .localeCompare(a.requestId.toLocaleLowerCase())
                : a.requestId
                    .toLocaleLowerCase()
                    .localeCompare(b.requestId.toLocaleLowerCase())
        },
}
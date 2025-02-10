import { TabSortState } from "@codex-storage/marketplace-ui-components";
import { CodexPurchase, CodexStorageRequest } from "@codex-storage/sdk-js";

export const PurchaseUtils = {
  sortById: (state: TabSortState) => (a: CodexPurchase, b: CodexPurchase) => {
    return state === "desc"
      ? b.requestId
          .toLocaleLowerCase()
          .localeCompare(a.requestId.toLocaleLowerCase())
      : a.requestId
          .toLocaleLowerCase()
          .localeCompare(b.requestId.toLocaleLowerCase());
  },
  sortByState: (state: TabSortState) => (a: CodexPurchase, b: CodexPurchase) =>
    state === "desc"
      ? b.state.toLocaleLowerCase().localeCompare(a.state.toLocaleLowerCase())
      : a.state.toLocaleLowerCase().localeCompare(b.state.toLocaleLowerCase()),
  sortByDuration:
    (state: TabSortState) => (a: CodexPurchase, b: CodexPurchase) =>
      state === "desc"
        ? Number(b.request.ask.duration) - Number(a.request.ask.duration)
        : Number(a.request.ask.duration) - Number(b.request.ask.duration),
  sortByReward:
    (state: TabSortState) => (a: CodexPurchase, b: CodexPurchase) => {
      const aPrice = parseInt(a.request.ask.pricePerBytePerSecond, 10);
      const bPrice = parseInt(b.request.ask.pricePerBytePerSecond, 10);
      return state === "desc" ? bPrice - aPrice : aPrice - bPrice;
    },
  sortByUploadedAt:
    (state: TabSortState, table: Record<string, number>) =>
    (a: CodexPurchase, b: CodexPurchase) => {
      return state === "desc"
        ? (table[b.requestId] || 0) - (table[a.requestId] || 0)
        : (table[a.requestId] || 0) - (table[b.requestId] || 0);
    },
  calculatePrice(request: CodexStorageRequest) {
    return (
      parseInt(request.ask.slotSize, 10) *
      parseInt(request.ask.pricePerBytePerSecond, 10)
    );
  },
};

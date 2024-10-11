import { createStore, get, set } from "idb-keyval";

const store = createStore("purchases", "purchases");
const storeDates = createStore("purchases", "dates");

export const PurchaseStorage = {
  async get(key: string) {
    return get<string>(key, store);
  },

  async set(key: string, cid: string) {
    return set(key, cid, store);
  },
};

export const PurchaseDatesStorage = {
  async get(key: string) {
    return get<string>(key, storeDates);
  },

  async set(key: string, date: string) {
    return set(key, date, storeDates);
  },
};

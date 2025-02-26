import { createStore, del, entries, get, set } from "idb-keyval";

export const WebStorage = {
  set(key: string, value: unknown) {
    return set(key, value);
  },

  get<T>(key: string) {
    return get<T>(key);
  },

  delete(key: string) {
    return del(key);
  },

  onBoarding: {
    getStep() {
      return parseInt(localStorage.getItem("onboarding-step") || "0", 10);
    },

    setStep(step: number) {
      localStorage.setItem("onboarding-step", step.toString());
    },

    setDisplayName(displayName: string) {
      localStorage.setItem("display-name", displayName);
    },

    getDisplayName() {
      return localStorage.getItem("display-name") || "";
    },

    setEmoji(emoji: string) {
      localStorage.setItem("emoji", emoji);
    },

    getEmoji() {
      return localStorage.getItem("emoji") || "🤖";
    },
  },

  folders: {
    store: createStore("folders", "folders"),

    create(folder: string) {
      return set(folder, [], this.store);
    },

    async list(): Promise<[string, string[]][]> {
      const items = (await entries<string, string[]>(this.store)) || [];

      if (items.length == 0) {
        return [["Favorites", []]];
      }

      if (items[0][0] !== "Favorites") {
        return [["Favorites", []], ...items];
      }

      return items;
    },
    delete(key: string) {
      return del(key, this.store);
    },
    async addFile(folder: string, cid: string) {
      const files = (await get<string[]>(folder, this.store)) || [];

      return set(folder, [...files, cid], this.store);
    },

    async deleteFile(folder: string, cid: string) {
      const files = (await get<string[]>(folder, this.store)) || [];

      return set(
        folder,
        files.filter((item) => item !== cid),
        this.store
      );
    },
  },

  availabilities: {
    store: createStore("availabilities", "availabilities"),

    get(key: string) {
      return get<string>(key, this.store);
    },

    delete(key: string) {
      return del(key, this.store);
    },

    async add(key: string, value: string) {
      return set(key, value, this.store);
    },
  },

  purchases: {
    store: createStore("purchases", "purchases"),

    async get(key: string) {
      return get<string>(key, this.store);
    },

    async set(key: string, cid: string) {
      return set(key, cid, this.store);
    },

    async entries<T>() {
      return entries<string, T>(this.store);
    },

    dates: {
      store: createStore("purchases", "dates"),

      async get(key: string) {
        return get<string>(key, this.store);
      },

      async set(key: string, date: string) {
        return set(key, date, this.store);
      },
    },
  },
};

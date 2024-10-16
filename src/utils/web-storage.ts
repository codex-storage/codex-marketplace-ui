import { createStore, del, entries, get, set } from "idb-keyval";

const folders = createStore("folders", "folders");

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

  folders: {
    create(folder: string) {
      return set(folder, [], folders);
    },

    async list(): Promise<[string, string[]][]> {
      const items = await entries<string, string[]>(folders) || []

      if (items.length == 0) {
        return [["Favorites", []]]
      }

      if (items[0][0] !== "Favorites") {
        return [["Favorites", []], ...items]
      }


      return items

    },

    delete(key: string) {
      return del(key, folders);
    },


    async addFile(folder: string, cid: string) {
      const files = await get<string[]>(folder, folders) || []

      return set(folder, [...files, cid], folders)
    },

    async deleteFile(folder: string, cid: string) {
      const files = await get<string[]>(folder, folders) || []

      return set(folder, files.filter(item => item !== cid), folders)

    },
  }
};

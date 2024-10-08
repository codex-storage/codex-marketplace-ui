import { createStore, entries, get, set } from "idb-keyval";

const store = createStore("files", "files");

export type FileMetadata = {
  mimetype: string;
  uploadedAt: string;
  name: string;
};

export const FilesStorage = {
  list() {
    return entries<string, FileMetadata>(store);
  },

  async get<T>(cid: string) {
    return get<T>(cid, store);
  },

  async set(cid: string, metadata: FileMetadata) {
    return set(cid, metadata, store);
  },
};

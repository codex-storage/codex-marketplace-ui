import { createStore, del, get, set } from "idb-keyval";

const store = createStore("availabilities", "availabilities");

export const AvailabilityStorage = {
    get(key: string) {
        return get<string>(key, store);
    },

    delete(key: string) {
        return del(key, store);
    },

    async add(key: string, value: string) {
        return set(key, value, store);
    },
};

import { Codex } from "@codex-storage/sdk-js";
import { WebStorage } from "../utils/web-storage";

let client: Codex = new Codex(import.meta.env.VITE_CODEX_API_URL);
let url: string = import.meta.env.VITE_CODEX_API_URL;

export const CodexSdk = {
  url() {
    return url;
  },

  load() {
    return WebStorage.get<string>("codex-node-url").then((u) => {
      url = u || import.meta.env.VITE_CODEX_API_URL;
      client = new Codex(url);
    });
  },

  updateURL(u: string) {
    url = u;
    client = new Codex(url);

    return WebStorage.set("codex-node-url", url);
  },

  debug: client.debug,

  data: client.data,

  node: client.node,

  marketplace: client.marketplace,
};

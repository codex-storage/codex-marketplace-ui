/// <reference types='vite/client' />

interface ImportMetaEnv {
  VITE_CODEX_API_URL: string;
  VITE_GEO_IP_URL: string;
  VITE_DISCORD_LINK: string;
}

interface ImportMeta {
  readonly PACKAGE_VERSION: string;
  readonly env: ImportMetaEnv;
}

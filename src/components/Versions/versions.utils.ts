export const VersionsUtil = {
    codexVersion: () => import.meta.env.PACKAGE_VERSION,

    clientVersion: (version: string | undefined) => {
        const parts = version?.split("\n") || [""];
        return parts[parts.length - 1];
    }
}
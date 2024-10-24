import { CodexDebugInfo, CodexError, SafeValue } from "@codex-storage/sdk-js";

export const DebugUtils = {
    getTcpPort(info: CodexDebugInfo): SafeValue<number> {
        if (info.addrs.length === 0) {
            return { error: true, data: new CodexError("Not existing address") }
        }

        const parts = info.addrs[0].split("/")

        if (parts.length < 2) {
            return { error: true, data: new CodexError("Address misformated") }
        }

        const port = parseInt(parts[parts.length - 1], 10)

        if (isNaN(port)) {
            return { error: true, data: new CodexError("Port misformated") }
        }

        return { error: false, data: port }
    }
}
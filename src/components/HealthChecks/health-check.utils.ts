import { CodexDebugInfo, SafeValue, CodexError } from "@codex-storage/sdk-js"

export const HealthCheckUtil = {
    removePort(url: string) {
        const parts = url.split(":")
        return parts[0] + ":" + parts[1]
    },

    /*
    * Extract the port from a protocol + ip + port string
    */
    getPort(url: string) {
        return parseInt(url.split(":")[2] || "80", 10)
    },

    containsPort(url: string) {
        return url.split(":").length > 2
    },

    isUrlInvalid(url: string) {
        try {
            new URL(url)
            return false
            // We do not need to manage the error because we want to check 
            // if the URL is valid or not only.
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) {
            return true
        }
    },

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
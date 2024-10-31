export const Network = {
    getIp(address: string) {
        const [ip] = address.split(":")
        return ip
    }
}
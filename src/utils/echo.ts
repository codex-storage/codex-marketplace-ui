export const Echo = {
    portForwarding: (port: number) => fetch(import.meta.env.VITE_GEO_IP_URL + "/port/" + port)
        .then((res) => res.json())

}
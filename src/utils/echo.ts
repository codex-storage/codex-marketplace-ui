export const Echo = {
    portForwarding: () => fetch(import.meta.env.VITE_GEO_IP_URL + "/port/8070")
        .then((res) => res.json())

}
export const Echo = {
    portForwarding: () => fetch(import.meta.env.VITE_ECHO_URL + "/port/8070")
        .then((res) => res.json())

}
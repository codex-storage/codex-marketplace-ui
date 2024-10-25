export const Strings = {
  shortId: (id: string) => id.slice(0, 5) + "..." + id.slice(-5),

  splitURLAndPort(url: string) {
    const [protocol, hostname = "", port = ""] = url.split(":")

    return [protocol + ":" + hostname, port]

  }
};


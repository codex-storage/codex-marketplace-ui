export const Bytes = {
  pretty(bytes: number) {
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    if (bytes == 0) {
      return "0 B";
    }

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());

    if (i == 0) {
      return bytes.toFixed(1) + " " + sizes[i];
    }

    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
  }

}
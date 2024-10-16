export const Files = {
  isImage(type: string) {
    return type.startsWith("image");
  },
  type(mimetype: string) {
    const [type] = mimetype.split("/")
    return type
  }
};

export type CodexFileMetadata = {
  type: string;
  name: string;
};

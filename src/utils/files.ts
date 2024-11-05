const archiveMimetypes = [
  "application/zip",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/gzip",
  "application/x-7z-compressed",
  "application/gzip", // for .tar.gz
  "application/x-bzip2",
  "application/x-xz",
];

export const Files = {
  isImage(type: string | null) {
    return type && type.startsWith("image");
  },
  isVideo(type: string | null) {
    return type && type.startsWith("video");
  },
  type(mimetype: string | null) {
    const [type] = mimetype?.split("/") || []
    return type
  },
  isArchive(mimetype: string | null) {
    return mimetype && archiveMimetypes.includes(mimetype)
  }
};

export type CodexFileMetadata = {
  type: string;
  name: string;
};

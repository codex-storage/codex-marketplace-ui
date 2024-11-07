export const Strings = {
  shortId: (id: string) => id.slice(0, 5) + "..." + id.slice(-5),

  randomCid(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  },

  randomFileName(extension: string) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }

    return `${randomString}.${extension}`;
  },

  randomEthereumAddress() {
    // Generate a random 20-byte (40 hex characters) hexadecimal string
    const randomHex = [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    // Format it as an Ethereum address
    const ethereumAddress = `0x${randomHex}`;
    return ethereumAddress;
  },

  randomMimeType() {
    const mimeTypes = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'text/plain': 'txt',
      'text/html': 'html',
      'application/json': 'json',
      'application/pdf': 'pdf',
      'application/vnd.ms-excel': 'xls',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
      'application/vnd.ms-powerpoint': 'ppt',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
      'application/zip': 'zip',
      'audio/mpeg': 'mp3',
      'audio/wav': 'wav',
      'video/mp4': 'mp4',
      'video/x-msvideo': 'avi',
      'application/octet-stream': 'bin'
    }

    const mimeTypeKeys = Object.keys(mimeTypes);
    const randomIndex = Math.floor(Math.random() * mimeTypeKeys.length);
    const randomMimeType = mimeTypeKeys[randomIndex];
    const extension = (mimeTypes as any)[randomMimeType];

    return { mimeType: randomMimeType, extension: extension };
  }


};


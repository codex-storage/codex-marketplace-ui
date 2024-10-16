import {
  CodexCreateStorageRequestInput,
  CodexData,
  CodexDataResponse,
  CodexMarketplace,
  SafeValue,
  UploadResponse,
} from "@codex-storage/sdk-js";
import { CodexSdk as Sdk } from "./sdk/codex";
import { WebStorage } from "./utils/web-storage";
import { FilesStorage } from "./utils/file-storage";
import { PurchaseStorage } from "./utils/purchases-storage";

class CodexDataMock extends CodexData {
  override upload(
    file: File,
    onProgress?: (loaded: number, total: number) => void
  ): UploadResponse {
    const { result, abort } = super.upload(file, onProgress);

    return {
      abort,
      result: result.then((safe) => {
        if (!safe.error) {
          return WebStorage.set(safe.data, {
            type: file.type,
            name: file.name,
          }).then(() => safe);
        }

        return safe;
      }),
    };
  }

  override async cids(): Promise<SafeValue<CodexDataResponse>> {
    const res = await super.cids();

    if (res.error) {
      return res;
    }

    const metadata = await FilesStorage.list();

    const content = res.data.content.map((content, index) => {
      if (content.manifest.filename) {
        return content;
      }

      const value = metadata.find(([cid]) => content.cid === cid);

      if (!value) {
        return {
          cid: content.cid,
          manifest: {
            ...content.manifest,
            mimetype: "N/A",
            uploadedAt: new Date(0, 0, 0, 0, 0, 0).toJSON(),
            filename: "N/A" + index,
          },
        };
      }

      const {
        mimetype = "",
        name = "",
        uploadedAt = new Date(0, 0, 0, 0, 0, 0).toJSON(),
      } = value[1];

      return {
        cid: content.cid,
        manifest: {
          ...content.manifest,
          mimetype,
          filename: name,
          uploadedAt: uploadedAt,
        },
      };
    });

    return { error: false, data: { content } };
  }
}


class CodexMarketplaceMock extends CodexMarketplace {
  // override async purchases(): Promise<SafeValue<CodexPurchase[]>> {
  //   const res = await super.purchases()

  //   if (res.error) {
  //     return res
  //   }

  //   const defaultDate = new Date(0, 0, 0, 0, 0, 0).toJSON()
  //   const dates = await Promise.all(res.data.map(p => PurchaseDatesStorage.get(p.requestId)))

  //   return {
  //     error: false, data: res.data
  //       .map((p, index) => ({ ...p, createdAt: new Date(dates[index] || defaultDate).getTime() }))
  //       .sort((a, b) => b.createdAt - a.createdAt)
  //   }
  // }

  /**
   * Maintains a temporary link between the CID and the file metadata. 
   * When the metadata is available in the manifest, the CID link 
   * should still be maintained, but the metadata should be retrieved 
   * using a REST API call.
   */
  override async createStorageRequest(input: CodexCreateStorageRequestInput): Promise<SafeValue<string>> {
    const res = await super.createStorageRequest(input)

    if (res.error) {
      return res
    }

    await PurchaseStorage.set("0x" + res.data, input.cid)

    // await PurchaseDatesStorage.set(res.data, new Date().toJSON())

    return res
  }


  // override createStorageRequest(
  //   input: CodexCreateStorageRequestInput
  // ): Promise<SafeValue<string>> {
  //   return Promise.resolve({
  //     error: true,
  //     data: {
  //       message: "C'est balo",
  //     },
  //   });
  // }
  // override createAvailability(): Promise<
  //   SafeValue<CodexAvailabilityCreateResponse>
  // > {
  //   return Promise.resolve({
  //     error: true,
  //     data: {
  //       message: "C'est balo",
  //     },
  //   });
  // }
  // override reservations(): Promise<SafeValue<CodexReservation[]>> {
  //   return Promise.resolve({
  //     error: false,
  //     data: [
  //       {
  //         id: "0x123456789",
  //         availabilityId: "0x12345678910",
  //         requestId: "0x1234567891011",
  //         /**
  //          * Size in bytes
  //          */
  //         size: 500_000_000 + "",
  //         /**
  //          * Slot Index as hexadecimal string
  //          */
  //         slotIndex: "2",
  //       },
  //       {
  //         id: "0x987654321",
  //         availabilityId: "0x9876543210",
  //         requestId: "0x98765432100",
  //         /**
  //          * Size in bytes
  //          */
  //         size: 500_000_000 + "",
  //         /**
  //          * Slot Index as hexadecimal string
  //          */
  //         slotIndex: "1",
  //       },
  //     ],
  //   });
  // }
}

export const CodexSdk = {
  ...Sdk,
  marketplace: () => new CodexMarketplaceMock(CodexSdk.url()),
  data: () => new CodexDataMock(CodexSdk.url()),
};

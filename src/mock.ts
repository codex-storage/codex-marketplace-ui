import {
  CodexData,
  UploadResponse,
  CodexDataResponse,
  SafeValue,
  CodexPurchase,
} from "@codex-storage/sdk-js/async";
import {
  CodexAvailability,
  CodexAvailabilityCreateResponse,
  CodexCreateAvailabilityInput,
  CodexDebug,
  CodexDebugInfo,
  CodexError,
  CodexMarketplace,
  CodexNode,
  CodexNodeSpace,
  CodexReservation,
} from "@codex-storage/sdk-js";
import { FilesStorage } from "./utils/file-storage";
import { PurchaseStorage } from "./utils/purchases-storage";
import { GB } from "./utils/constants";
import { DebugErrors, DebugErrorsData } from "./components/DebugErrors/DebugErrors";

class CodexDataMock extends CodexData {
  override upload(
    _: File,
    onProgress?: (loaded: number, total: number) => void
  ): UploadResponse {
    let timeout: number;

    return {
      abort: () => {
        window.clearInterval(timeout);
      },
      result: new Promise((resolve) => {

        let count = 0;
        timeout = window.setInterval(() => {
          count++;

          onProgress?.(500 * count, 1500);

          if (count === 3) {
            window.clearInterval(timeout);

            if (DebugErrorsData.uploadApi) {
              resolve({
                error: true,
                data: new CodexError("Error generated because it is on in the settings."),
              });
            } else {
              resolve({
                error: false,
                data: Date.now().toString(),
              });
            }
          }
        }, 1500);
      }),
    };
  }

  override space(): Promise<SafeValue<CodexNodeSpace>> {
    if (DebugErrorsData.nodeSpaceApi) {
      return Promise.resolve({
        error: true,
        data: new CodexError("Error generated because it is on in the settings."),
      })
    }


    return Promise.resolve({
      error: false,
      data: {
        totalBlocks: 3443,
        quotaMaxBytes: 8 * GB,
        quotaUsedBytes: 5 * GB,
        quotaReservedBytes: 0.5 * GB,
      },
    });
  }

  override cids(): Promise<SafeValue<CodexDataResponse>> {
    if (DebugErrorsData.filesApi) {
      return Promise.resolve({
        error: true,
        data: new CodexError("Error generated because it is on in the settings."),
      })
    }

    return Promise.resolve({
      error: false,
      data: {
        content: [
          {
            cid: "zDvZRwzkz7BL9YhAs9cxjT3ohfywKmdpUmgGB8JZAye4BnJu8NqY",
            manifest: {
              treeCid: "zDzSvJTfAbMfKE1ieZfYX9a65ZQvpYvnnkLAE57HA51KSusaUTwM",
              datasetSize: 15335424,
              blockSize: 65536,
              protected: true,
              verifiable: true,
              filename: "codex.jpg",
              mimetype: "image/jpg",
              uploadedAt: new Date().toJSON(),
            },
          },
          {
            cid: "zDvZRwzkvwapyNeL4mzw5gBsZvyn7x8F8Y9n4RYSC7ETBssDYpGe",
            manifest: {
              treeCid: "zDzSvJTf17j86EbRH4sZdoP58XAzMzKT8bDWMw2kXqRM5Fhi8eR6",
              datasetSize: 142593,
              blockSize: 65536,
              protected: false,
              filename: "codex.mp4",
              mimetype: "video/mp4",
              uploadedAt: new Date().toJSON(),
            },
          },
        ],
      },
    });
  }
}

class CodexDebugMock extends CodexDebug {
  override setLogLevel(): Promise<SafeValue<"">> {
    return Promise.resolve({ error: false, data: "" });
  }

  override info(): Promise<SafeValue<CodexDebugInfo>> {
    return Promise.resolve({
      error: false,
      data: {
        id: "16Uiu2HAmRgEoPYeFV5y3irFe9muszAubsr3Tm5BWjS3uptKnjTHop",
        addrs: ["/ip4/127.0.0.1/tcp/8070"],
        repo: "/home/arnaud/Work/codex/nim-codex/Data1",
        spr: "spr:CiUIAhIhA8F52XmfO9PztagMNhQJ9sJaL9CgbEhAYxemisZgAs1WEgIDARo8CicAJQgCEiEDwXnZeZ870_O1qAw2FAn2wlov0KBsSEBjF6aKxmACzVYQo-SPtwYaCwoJBH8AAAGRAh-aKkcwRQIhANa3v_SKlq_2WChb_4OnGOtc3KJBclMAVGEVfh6R6lIeAiBJZ25dEk-cSkqL8eoXHM8vbIzuvEEf7CZlYaHqhB-5bw",
        announceAddresses: ["/ip4/127.0.0.1/tcp/8070"],
        table: {
          localNode: {
            nodeId:
              "e8e06ae9b2cb7d23fde39681e5cc9b1e690ae40240b476908bc58960b4caad38",
            peerId: "16Uiu2HAmRgEoPYeFV5y3irFe9muszAubsr3Tm5BWjS3uptKnjTHo",
            record:
              '(envelope: (publicKey: secp256k1 key (04c179d9799f3bd3f3b5a80c361409f6c25a2fd0a06c48406317a68ac66002cd566a04f8620bfb66539ac7afef65b624587916b68f578babca599a430c7b6a4cb7), domain: "libp2p-peer-record", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 3, 193, 121, 217, 121, 159, 59, 211, 243, 181, 168, 12, 54, 20, 9, 246, 194, 90, 47, 208, 160, 108, 72, 64, 99, 23, 166, 138, 198, 96, 2, 205, 86, 16, 165, 228, 143, 183, 6, 26, 11, 10, 9, 4, 127, 0, 0, 1, 145, 2, 31, 154], signature: 304402200896FAE149F849BF7DB888A0470BD381C91BEE97D1C9F0CCEBA959BDD8874A4A02200B6984755EAC54DAAF9714ED3753D4FCA219D15C7D8295E25FBEC142F8A10E27), data: (peerId: 16Uiu2HAmRgEoPYeFV5y3irFe9muszAubsr3Tm5BWjS3uptKnjTHo, seqNo: 1726214693, addresses: @[(address: /ip4/127.0.0.1/udp/8090)]))',
            address: "0.0.0.0:8090",
            seen: false,
          },
          nodes: [
            {
              nodeId:
                "aa308c16f7a89d5b0c729546453683e01be37d9505ad90e8e28b2cb044d3619d",
              peerId: "16Uiu2HAmJRB2FPCyTaCNKoE6eojDjK5CdD8Et9GFfus4U8evD5Ca",
              record:
                '(envelope: (publicKey: secp256k1 key (04559c0e8847d8ccf31e457c1858b33ad53aa909ca40b96957a17b2677961443bfc564aa39b13cd2b26cfb1924ea7a54a9ed56d40349e2389c4ab23de7e712f643), domain: "libp2p-peer-record", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 3, 85, 156, 14, 136, 71, 216, 204, 243, 30, 69, 124, 24, 88, 179, 58, 213, 58, 169, 9, 202, 64, 185, 105, 87, 161, 123, 38, 119, 150, 20, 67, 191, 16, 162, 228, 143, 183, 6, 26, 11, 10, 9, 4, 127, 0, 0, 1, 145, 2, 31, 155], signature: 3045022100E9ED63BA027C5C35462CAF58D1C524C9F0AA4AD584E1355B3FC8D46ABB17961F02205750258D76E6544B5C178F0D8133F318E14B5D838F0E1CD36527F708B3FB78C4), data: (peerId: 16Uiu2HAmJRB2FPCyTaCNKoE6eojDjK5CdD8Et9GFfus4U8evD5Ca, seqNo: 1726214690, addresses: @[(address: /ip4/127.0.0.1/udp/8091)]))',
              address: "127.0.0.1:8091",
              seen: true,
            },
          ],
        },
        codex: {
          version: "v0.1.0\nv0.1.1\nv0.1.2\nv0.1.3",
          revision: "1e2ad956",
        },
      },
    });
  }
}

class CodexNodeMock extends CodexNode {
  override spr(): Promise<SafeValue<{ spr: string }>> {
    if (DebugErrorsData.nodeConnectionApi) {
      return Promise.resolve({
        error: true,
        data: new CodexError("Error generated because it is on in the settings."),
      })
    }

    return Promise.resolve({
      error: false,
      data: {
        spr: "spr:CiUIAhIhA8F52XmfO9PztagMNhQJ9sJaL9CgbEhAYxemisZgAs1WEgIDARo7CicAJQgCEiEDwXnZeZ870_O1qAw2FAn2wlov0KBsSEBjF6aKxmACzVYQxvSQtwYaCgoIBH8AAAEGH4YqRzBFAiEAkwWznE111Z7vYzMy8y8WU-LUFH9vuy-9ZUkoIE9kS_kCIF22zGdP42VY_NsNXaBwi4exFFXjPsIPwmPneZmUuOMY",
      },
    });
  }
}

class CodexMarketplaceMock extends CodexMarketplace {
  override async purchases(): Promise<SafeValue<CodexPurchase[]>> {
    if (DebugErrorsData.purchasesApi) {
      return Promise.resolve({
        error: true,
        data: new CodexError("Error generated because it is on in the settings."),
      })
    }

    await PurchaseStorage.set(
      "0x1aad5b0495097f98010b87079e07f4f1bf283f533670057123e493b452e601a3",
      "zDvZRwzkz7BL9YhAs9cxjT3ohfywKmdpUmgGB8JZAye4BnJu8NqY"
    );

    await FilesStorage.set(
      "zDvZRwzkz7BL9YhAs9cxjT3ohfywKmdpUmgGB8JZAye4BnJu8NqY",
      {
        name: "codex.jpg",
        mimetype: "image/jpg",
        uploadedAt: new Date().toJSON(),
      }
    );

    await PurchaseStorage.set(
      "0xb6da73cef67948fb99ed60385e6392e2f195a07e03e7eff53e2718f70eef3082",
      "zDvZRwzkz7BL9YhAs9cxjT3ohfywKmdpUmgGB8JZAye4BnJu8NqZ"
    );

    await FilesStorage.set(
      "zDvZRwzkz7BL9YhAs9cxjT3ohfywKmdpUmgGB8JZAye4BnJu8NqZ",
      {
        name: "codex.mp4",
        mimetype: "video/mp4",
        uploadedAt: new Date().toJSON(),
      }
    );

    return Promise.resolve({
      error: false,
      data: [
        {
          requestId:
            "0x1aad5b0495097f98010b87079e07f4f1bf283f533670057123e493b452e601a3",
          request: {
            client: "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
            ask: {
              slots: 3,
              slotSize: "8388608",
              duration: "86400",
              proofProbability: "2",
              reward: "10",
              collateral: "10",
              maxSlotLoss: 1,
            },
            content: {
              cid: "zDvZRwzkz7BL9YhAs9cxjT3ohfywKmdpUmgGB8JZAye4BnJu8NqY",
            },
            expiry: "18060",
            nonce:
              "0x0f6623325747c25c57f766a656f0609a08dc5e7d48e17bb22f31d2f5775b166d",
            id: "0x1aad5b0495097f98010b87079e07f4f1bf283f533670057123e493b452e601a3",
          },
          state: "submitted",
          error: "",
        },
        {
          requestId:
            "0xb6da73cef67948fb99ed60385e6392e2f195a07e03e7eff53e2718f70eef3082",
          request: {
            client: "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
            ask: {
              slots: 3,
              slotSize: "8388608",
              duration: "86400",
              proofProbability: "2",
              reward: "1",
              collateral: "10",
              maxSlotLoss: 1,
            },
            content: {
              cid: "zDvZRwzkz7BL9YhAs9cxjT3ohfywKmdpUmgGB8JZAye4BnJu8NqZ",
            },
            expiry: "18000",
            nonce:
              "0x70204db6e01759b0b9ea026af763b9c652bef3e27199d5b826f1b6385b876227",
            id: "0xb6da73cef67948fb99ed60385e6392e2f195a07e03e7eff53e2718f70eef3082",
          },
          state: "cancelled",
          error: "Purchase cancelled due to timeout",
        },
      ],
    });
  }

  override createStorageRequest(): Promise<SafeValue<string>> {
    if (DebugErrorsData.storageRequestApi) {
      return Promise.resolve({
        error: true,
        data: new CodexError("Error generated because it is on in the settings."),
      })
    }

    return Promise.resolve({
      error: false,
      data: "0xb6da73cef67948fb99ed60385e6392e2f195a07e03e7eff53e2718f70eef3082",
    });
  }

  override availabilities(): Promise<SafeValue<CodexAvailability[]>> {
    if (DebugErrorsData.availabilitiesApi) {
      return Promise.resolve({
        error: true,
        data: new CodexError("Error generated because it is on in the settings."),
      })
    }

    return Promise.resolve({
      error: false,
      data: [
        {
          id: "0x123456789",
          totalSize: GB * 3,
          duration: 3600 * 24 * 30,
          minPrice: 0,
          maxCollateral: 10,
        },
        {
          id: "0x987654321",
          totalSize: GB * 2,
          duration: 3600 * 24 * 30,
          minPrice: 0,
          maxCollateral: 10,
        },
      ],
    });
  }

  override createAvailability(
    input: CodexCreateAvailabilityInput
  ): Promise<SafeValue<CodexAvailabilityCreateResponse>> {
    if (DebugErrorsData.createAvailabilityApi) {
      return Promise.resolve({
        error: true,
        data: new CodexError("Error generated because it is on in the settings."),
      })
    }

    return Promise.resolve({
      error: false,
      data: {
        ...input,
        id: "0xb6da73cef67948fb99ed60385e6392e2f195a07e03e7eff53e2718f70eef3082",
        freeSize: "0",
      },
    });
  }

  override reservations(): Promise<SafeValue<CodexReservation[]>> {
    if (DebugErrorsData.reservationsApi) {
      return Promise.resolve({
        error: true,
        data: new CodexError("Error generated because it is on in the settings."),
      })
    }

    return Promise.resolve({
      error: false,
      data: [
        {
          id: "0x123456789",
          availabilityId: "0x12345678910",
          requestId: "0x1234567891011",
          size: GB * 0.5 + "",
          slotIndex: "2",
        },
        {
          id: "0x987654321",
          availabilityId: "0x9876543210",
          requestId: "0x98765432100",
          /**
           * Size in bytes
           */
          size: GB * 0.25 + "",
          /**
           * Slot Index as hexadecimal string
           */
          slotIndex: "1",
        },
      ],
    });
  }
}

const mock = {
  url: "http://localhost:8080",
  updateURL: () => Promise.resolve(""),
  debug: new CodexDebugMock(""),
  data: new CodexDataMock(""),
  node: new CodexNodeMock(""),
  marketplace: new CodexMarketplaceMock(""),
};

export const CodexSdk = {
  ...mock,
};

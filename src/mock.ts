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
  CodexCreateStorageRequestInput,
  CodexDataContent,
  CodexDebug,
  CodexDebugInfo,
  CodexError,
  CodexManifest,
  CodexMarketplace,
  CodexNode,
  CodexNodeSpace,
  CodexReservation,
} from "@codex-storage/sdk-js";
import { GB } from "./utils/constants";
import { DebugErrorsData } from "./components/DebugErrors/debug-errors.domain";
import { WebStorage } from "./utils/web-storage";
import { Strings } from "./utils/strings";


class CodexDataMock extends CodexData {
  static defaultContent = {
    cid: "FHZhZgD8jKzUUb04IZKKf50JGko7HCtIMuNbzmOcbMCvbZ3SUq07eu50x78Rgfeg",
    manifest: {
      datasetSize: 1 * GB,
      blockSize: 64,
      protected: false,
      treeCid: "YQ3qDcB9leg5QOPNavRtPHxZQByrsszOYMxG0L4BNcyZqLQxHmik0aoSjhW4gXx7",
      filename: "codex.png",
      mimetype: "image/png",
      uploadedAt: 1730980906
    }
  }

  override upload(
    file: File,
    onProgress?: (loaded: number, total: number) => void
  ): UploadResponse {
    let timeout: number;

    return {
      abort: () => {
        window.clearInterval(timeout);
      },
      result: new Promise((resolve) => {

        let count = 0;
        timeout = window.setInterval(async () => {
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
              const manifests = await WebStorage.get<CodexDataContent[]>("mock-manifests") || []
              WebStorage.set("mock-manifests", [...manifests, {
                cid: Strings.randomCid(64),
                manifest: {
                  datasetSize: file.size,
                  blockSize: 64,
                  protected: false,
                  treeCid: Strings.randomCid(64),
                  filename: file.name,
                  mimetype: file.type,
                  uploadedAt: new Date().getTime() / 1000
                }
              }])
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

  override async fetchManifest(cid: string): Promise<SafeValue<CodexManifest>> {
    const manifests = await WebStorage.get<CodexDataContent[]>("mock-manifests") || []

    const mimetype = Strings.randomMimeType()
    const filename = Strings.randomFileName(mimetype.extension)

    const manifest = {
      datasetSize: 1 * GB,
      blockSize: 64,
      protected: false,
      treeCid: Strings.randomCid(64),
      filename: filename,
      mimetype: mimetype.mimeType,
      uploadedAt: new Date().getTime() / 1000
    }

    await WebStorage.set("mock-manifests", [...manifests, { cid, manifest }])

    return {
      error: false,
      data: manifest
    } satisfies SafeValue<CodexManifest>
  }

  override async space(): Promise<SafeValue<CodexNodeSpace>> {
    if (DebugErrorsData.nodeSpaceApi) {
      return Promise.resolve({
        error: true,
        data: new CodexError("Error generated because it is on in the settings."),
      })
    }

    let quotaReservedBytes = 0
    let quotaUsedBytes = 0

    const availabilities = await new CodexMarketplaceMock("").availabilities()
    if (availabilities.error === false) {
      quotaReservedBytes = availabilities.data.reduce((acc, a) => acc + a.totalSize, 0)

      const m = await new CodexMarketplaceMock("")

      for (const a of availabilities.data) {
        const slots = await m.reservations(a.id)
        if (slots.error === false) {
          quotaUsedBytes += slots.data.reduce((acc, s) => acc + parseFloat(s.size), 0)
        }
      }
    }

    return Promise.resolve({
      error: false,
      data: {
        totalBlocks: 3443,
        quotaMaxBytes: 8 * GB,
        quotaUsedBytes: quotaUsedBytes,
        quotaReservedBytes: quotaReservedBytes,
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

    return WebStorage.get<CodexDataContent[]>("mock-manifests").then(content => (
      {
        error: false,
        data: {
          content: [...content || [], CodexDataMock.defaultContent],
        },
      }
    ))
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
          "nodes": [
            {
              "nodeId": "3e6b3ccb341da292515b0e8a1acc3fab6edcc80aab30d3357ce8c50ab7db8d0f",
              "peerId": "16Uiu2HAmFvbvMiHVDdPVqA74VqGaizrYb51r2tdiM3W7JsVUwv3E",
              "record": "(envelope: (publicKey: secp256k1 key (043092fe00c36dba217eea2662cbd10a1746eb3d0b4fe37f924002a089a680b69536f27a48212c17a42ebd710de7220ca77bb9c9d0b33d0d51ae5c71972ce668ff), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 3, 48, 146, 254, 0, 195, 109, 186, 33, 126, 234, 38, 98, 203, 209, 10, 23, 70, 235, 61, 11, 79, 227, 127, 146, 64, 2, 160, 137, 166, 128, 182, 149, 16, 182, 209, 142, 185, 6, 26, 11, 10, 9, 4, 128, 140, 55, 128, 145, 2, 31, 154], signature: 30450221009D1F6451651AEAD57B963F57BEBF44140025070AA96BC471169E8D3D6F40A1FD02200849ADB57FB7E0B4EB49185B9DA92BE84BDB010713C34531DB8B43A02BCC08EA), data: (peerId: 16Uiu2HAmFvbvMiHVDdPVqA74VqGaizrYb51r2tdiM3W7JsVUwv3E, seqNo: 1730390198, addresses: @[(address: /ip4/128.140.55.128/udp/8090)]))",
              "address": "128.140.55.128:8090",
              "seen": true
            },
            {
              "nodeId": "4ab7ed746ad8b1e2b82d6351999304aea3ecb3c65304ce8ca9cbdc72bcd6e68",
              "peerId": "16Uiu2HAmAsqXuUHLfLqQM6Dv5kuAWG95eu1p5FsjuJwMsbvmYFdo",
              "record": "(envelope: (publicKey: secp256k1 key (04e59335107c9d765eaab116a641328e54cd86cf148f67e621e9803b43cbfdf9863bf85754d24f55b1abd030d301494ef5a378c96967bff6e35f420d41d7cc03c0), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 2, 229, 147, 53, 16, 124, 157, 118, 94, 170, 177, 22, 166, 65, 50, 142, 84, 205, 134, 207, 20, 143, 103, 230, 33, 233, 128, 59, 67, 203, 253, 249, 134, 16, 214, 143, 175, 185, 6, 26, 11, 10, 9, 4, 174, 138, 1, 90, 145, 2, 119, 76], signature: 3044022050DC8E94AD36E509483BB137D005C926F7720CF9BC856B815B9B59D2C88D259D022043EF576B9BEBE6180FF2E513A5CFF3C61AA79FD6DBEA2D28B8B7C415637C8D79), data: (peerId: 16Uiu2HAmAsqXuUHLfLqQM6Dv5kuAWG95eu1p5FsjuJwMsbvmYFdo, seqNo: 1730922454, addresses: @[(address: /ip4/174.138.1.90/udp/30540)]))",
              "address": "174.138.1.90:30540",
              "seen": true
            },
            {
              "nodeId": "55ba869dbef99ddb87b5686059375f917ea66f7ed43dc07b006fd90c4682fef",
              "peerId": "16Uiu2HAmDpTtQrMPLDvZkqQJWtRw1MJmjiZxZz3ox1vg4WPMYihh",
              "record": "(envelope: (publicKey: secp256k1 key (0411490cc81cf2431c163dc542fad14bb21d14c02ade2f0e0f29bf749bdb2fa594e08c04f6d5d9f100c57d97a10d405f205ab568e7c9ccb5ad811833a1fa752ef7), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 3, 17, 73, 12, 200, 28, 242, 67, 28, 22, 61, 197, 66, 250, 209, 75, 178, 29, 20, 192, 42, 222, 47, 14, 15, 41, 191, 116, 155, 219, 47, 165, 148, 16, 189, 188, 232, 184, 6, 26, 11, 10, 9, 4, 5, 75, 197, 191, 145, 2, 31, 154], signature: 3045022100DC052607FB3CC102030BD01D98589B63CA6F0206F02803EE8F31E3DA7AD397DB02201A1AB5F074EFD4049680992D0DD8F9B3848538345AED8D7470392F393BB8439E), data: (peerId: 16Uiu2HAmDpTtQrMPLDvZkqQJWtRw1MJmjiZxZz3ox1vg4WPMYihh, seqNo: 1729764925, addresses: @[(address: /ip4/5.75.197.191/udp/8090)]))",
              "address": "5.75.197.191:8090",
              "seen": true
            },
            {
              "nodeId": "11537c4643cdcae0136ed720d0c22568dca371e535ddd3ae479783180588c1da",
              "peerId": "16Uiu2HAkv4aU8eCKQxNrSAShCCZdbvBsTfUG4iTmDT1ocCWeYn6t",
              "record": "(envelope: (publicKey: secp256k1 key (040974421821bd93c74251467d8498adee21ea891faa917d88953946732dc2dc31fbd9b1b702b096263025c2723706f35770e4dde2617cc34b1143a712584ebd72), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 2, 9, 116, 66, 24, 33, 189, 147, 199, 66, 81, 70, 125, 132, 152, 173, 238, 33, 234, 137, 31, 170, 145, 125, 136, 149, 57, 70, 115, 45, 194, 220, 49, 16, 196, 150, 223, 184, 6, 26, 11, 10, 9, 4, 91, 107, 189, 140, 145, 2, 31, 154], signature: 304402201375D73C78202A5EFA93BE96189658A8AC66FFBA445DFF62F19117801677BCE1022024201D46EDC6519A483091AEFE8432A791A4EA02CBC0CF199F3233DB5058870E), data: (peerId: 16Uiu2HAkv4aU8eCKQxNrSAShCCZdbvBsTfUG4iTmDT1ocCWeYn6t, seqNo: 1729612612, addresses: @[(address: /ip4/91.107.189.140/udp/8090)]))",
              "address": "91.107.189.140:8090",
              "seen": true
            },
            {
              "nodeId": "22f5d29e341a62b6f8ca7b22dce973b342fb7b44fb404820c44412cfabb7edc1",
              "peerId": "16Uiu2HAm5X6iiPV4mawvooM5Fn6uBk22tNqiRKvSjyEczef3m5bk",
              "record": "(envelope: (publicKey: secp256k1 key (0495f8bf37041a54fb7ad5611c9cc13cad352c391204b69229a736580eef86ddef1f912c946b70fa37794338d189c8120ce136cf8972791e868b543b257545df1a), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 2, 149, 248, 191, 55, 4, 26, 84, 251, 122, 213, 97, 28, 156, 193, 60, 173, 53, 44, 57, 18, 4, 182, 146, 41, 167, 54, 88, 14, 239, 134, 221, 239, 16, 187, 188, 232, 184, 6, 26, 11, 10, 9, 4, 91, 107, 148, 248, 145, 2, 31, 154], signature: 3044022034488F74F4D6BC3231F002CDFCEF78E2B93DF1FD657206419B7AD7C99606B05002200501341F8F697DADA752B2CAB3FB3EABCC648C935B49306D0FC2948209739000), data: (peerId: 16Uiu2HAm5X6iiPV4mawvooM5Fn6uBk22tNqiRKvSjyEczef3m5bk, seqNo: 1729764923, addresses: @[(address: /ip4/91.107.148.248/udp/8090)]))",
              "address": "91.107.148.248:8090",
              "seen": true
            },
            {
              "nodeId": "24d359603181c7c7a00ceb6d8f955bde4ad2c1b2eaf96d73dce46bb56aeafe78",
              "peerId": "16Uiu2HAmURzriqu7a5QP4gyw1uCLhgwfbv1UNamw5F7qsuYGrTr3",
              "record": "(envelope: (publicKey: secp256k1 key (04ea67039b0b18355ba845ec4710d48d01298920318a61cd6f2aabd83c0b993abc0dc662ec59197b54d8fb9f1ffb299a7737c6d6eb5617510f8ee19c0416e92457), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 3, 234, 103, 3, 155, 11, 24, 53, 91, 168, 69, 236, 71, 16, 212, 141, 1, 41, 137, 32, 49, 138, 97, 205, 111, 42, 171, 216, 60, 11, 153, 58, 188, 16, 216, 143, 175, 185, 6, 26, 11, 10, 9, 4, 128, 199, 59, 15, 145, 2, 119, 56], signature: 304402201FC2C0D5E9D20FA49F69DDF0A0D4FD4A21FF703FDB3C30B783A49A9DE41FFE880220749358FC6BD45A5E0C0DFB9D64FCAFDC2DF157BFEE5B4B7FFCBECC53C333C5CB), data: (peerId: 16Uiu2HAmURzriqu7a5QP4gyw1uCLhgwfbv1UNamw5F7qsuYGrTr3, seqNo: 1730922456, addresses: @[(address: /ip4/128.199.59.15/udp/30520)]))",
              "address": "128.199.59.15:30520",
              "seen": true
            },
            {
              "nodeId": "37d79ec9c5f710a7953888bdda62b5ef20160b9790e15c71086b1cda1108860c",
              "peerId": "16Uiu2HAmLYFW4cQrJVqTijrZyXDTWW5AJfecMaSNA5q7xg2HXuwj",
              "record": "(envelope: (publicKey: secp256k1 key (0475238fb391ad8ec36219f9d70bdfc0d2872bf07e455ac4283afb37ed67ae52465e3a6dab898ce1b70903311210969fcdb849692b4f06e72840b7e83d677b30e9), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 3, 117, 35, 143, 179, 145, 173, 142, 195, 98, 25, 249, 215, 11, 223, 192, 210, 135, 43, 240, 126, 69, 90, 196, 40, 58, 251, 55, 237, 103, 174, 82, 70, 16, 236, 189, 232, 184, 6, 26, 11, 10, 9, 4, 89, 163, 213, 10, 145, 2, 31, 154], signature: 3045022100DA1577F25D063D359B934EFA01001E42EABE3DB98635C6F151CE553111CA4C6C0220266FA3F00CF209746EAAD6FB2B83C2BD6683CD71CCFBDE8F6C9BBBEAB1F65E27), data: (peerId: 16Uiu2HAmLYFW4cQrJVqTijrZyXDTWW5AJfecMaSNA5q7xg2HXuwj, seqNo: 1729765100, addresses: @[(address: /ip4/89.163.213.10/udp/8090)]))",
              "address": "89.163.213.10:8090",
              "seen": true
            },
            {
              "nodeId": "2470de2e3e900dfb3e59fb44478fc94c31bbed3dec368fa91f00298621d98cab",
              "peerId": "16Uiu2HAm5DjGQRyJVd7cDZhzckB4Via2x6xqoYEG3jTx6hmdZhNw",
              "record": "(envelope: (publicKey: secp256k1 key (0491859d916f0a4375e99c04f3e241e4441acfc904af978d564eaa85ce79e236d870d9d49f4263bf5654572af29d1ea31bbcb6d8a7505e5d87cc6c7b26b957dd58), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 2, 145, 133, 157, 145, 111, 10, 67, 117, 233, 156, 4, 243, 226, 65, 228, 68, 26, 207, 201, 4, 175, 151, 141, 86, 78, 170, 133, 206, 121, 226, 54, 216, 16, 135, 195, 165, 184, 6, 26, 11, 10, 9, 4, 45, 76, 39, 119, 145, 2, 31, 154], signature: 304402204BDFA3570D240E750A9F33579D9308D0B3E5F5B07CEAA2C8AFC4E187815C3775022066EDAC265FFAF1A54084C592117BD932686FBDF8A85AF4DA577AEDF553F5D44B), data: (peerId: 16Uiu2HAm5DjGQRyJVd7cDZhzckB4Via2x6xqoYEG3jTx6hmdZhNw, seqNo: 1728668039, addresses: @[(address: /ip4/45.76.39.119/udp/8090)]))",
              "address": "45.76.39.119:8090",
              "seen": true
            },
            {
              "nodeId": "399ee8424b12af4947ad61532038cc2823a8ceb935874a87fd0dbfcaa3098d62",
              "peerId": "16Uiu2HAmQVbDYKyMSA8SiwFdc7KRZWmtjcRCNVWV3ZgND8RZssVE",
              "record": "(envelope: (publicKey: secp256k1 key (04afe3dbcc5afbe3efbce5311f5d302849bd7de5c428920add9f49439c578120fd285ede0ea0f957ae2434c6cd3311af6be037292d9e9f99fe337fa8976eebdf65), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 3, 175, 227, 219, 204, 90, 251, 227, 239, 188, 229, 49, 31, 93, 48, 40, 73, 189, 125, 229, 196, 40, 146, 10, 221, 159, 73, 67, 156, 87, 129, 32, 253, 16, 164, 221, 161, 185, 6, 26, 11, 10, 9, 4, 174, 138, 127, 95, 145, 2, 117, 68], signature: 3045022100F89394AEA7747E0C3C0161CAE174D43542D7D41ED5E396BB43B0A8B533F59775022024316C137CB1965C9CC87CD8207CC09C7D50208B9A1EB2D12BDF5740D6A29FB5), data: (peerId: 16Uiu2HAmQVbDYKyMSA8SiwFdc7KRZWmtjcRCNVWV3ZgND8RZssVE, seqNo: 1730703012, addresses: @[(address: /ip4/174.138.127.95/udp/30020)]))",
              "address": "174.138.127.95:30020",
              "seen": true
            },
            {
              "nodeId": "3f28b82c74d93482bb9b3b16e97783cf917acb52af556af77b825395595afead",
              "peerId": "16Uiu2HAm69oCFmCm2WQiCaU4rHrwhc99XYGFw9fZEnyvrX5WHuLB",
              "record": "(envelope: (publicKey: secp256k1 key (049f5f6bcdf9c24e28f6665195e955014dee610b23be7a4ad2e28266c7ec8b8278d9da820540f27e50d255af270e5cb3182ac7022dcfb6855dad9edde084eec9ec), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 2, 159, 95, 107, 205, 249, 194, 78, 40, 246, 102, 81, 149, 233, 85, 1, 77, 238, 97, 11, 35, 190, 122, 74, 210, 226, 130, 102, 199, 236, 139, 130, 120, 16, 197, 150, 223, 184, 6, 26, 11, 10, 9, 4, 65, 109, 215, 93, 145, 2, 31, 154], signature: 3044022023952CC4E657150C9B1CDF8E1F9B1645CDA5A45DA0D74DEE4BF3B1BA2C51B259022012882EF281D5DB18E454D944692129206A63F79B238972EEC1F535514F5EBE1D), data: (peerId: 16Uiu2HAm69oCFmCm2WQiCaU4rHrwhc99XYGFw9fZEnyvrX5WHuLB, seqNo: 1729612613, addresses: @[(address: /ip4/65.109.215.93/udp/8090)]))",
              "address": "65.109.215.93:8090",
              "seen": true
            },
            {
              "nodeId": "6bd96bd59ffc2deb87302079d05e8a704ebd3c6d18e7a695ba5e7d2d01213158",
              "peerId": "16Uiu2HAkv9MGi3L4dDcFE63ph9ttWioc9iBmNvqHatSXTTsa3Ysd",
              "record": "(envelope: (publicKey: secp256k1 key (040aad3d88a9611c113023b3890072745982a1fb4a41f4f935fe1973577862eef4ca58cdf8cea9bf07f3a63a33e0cd705041e0e578af0b28c0a8c47c5f9c6c7d02), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 2, 10, 173, 61, 136, 169, 97, 28, 17, 48, 35, 179, 137, 0, 114, 116, 89, 130, 161, 251, 74, 65, 244, 249, 53, 254, 25, 115, 87, 120, 98, 238, 244, 16, 235, 189, 232, 184, 6, 26, 11, 10, 9, 4, 65, 109, 187, 70, 145, 2, 31, 154], signature: 3045022100A0639AEEADC2479398AA08570C46D01C194EC7CC100D8C106886121B80B98D8202205256ED74279B5B397AE3F153885F9350F06A7F1F576150F25A4FBF2268F1E077), data: (peerId: 16Uiu2HAkv9MGi3L4dDcFE63ph9ttWioc9iBmNvqHatSXTTsa3Ysd, seqNo: 1729765099, addresses: @[(address: /ip4/65.109.187.70/udp/8090)]))",
              "address": "65.109.187.70:8090",
              "seen": true
            },
            {
              "nodeId": "6a2c4d123d2c33a81c6462e87025ed5c7f3c7dc553d939a2ca62eb2b0204acf1",
              "peerId": "16Uiu2HAmCSLyL8XXnndjKmFJuxHdGmd3mCKwAB8JiLewxiyanNPx",
              "record": "(envelope: (publicKey: secp256k1 key (04fcc2c42360f8bdd3b804e6378598f82cbac2d08b529de3868fda71bba58279ffe86849ed584d75a363e0ce4b8514085462e2dbf0308f5380eae816727b3a7d80), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 2, 252, 194, 196, 35, 96, 248, 189, 211, 184, 4, 230, 55, 133, 152, 248, 44, 186, 194, 208, 139, 82, 157, 227, 134, 143, 218, 113, 187, 165, 130, 121, 255, 16, 238, 189, 232, 184, 6, 26, 11, 10, 9, 4, 65, 109, 189, 103, 145, 2, 31, 154], signature: 3044022002D6C3794CB25B4F777804AD575F4DEC82D9F61C4F53862B2CF743C519B2206602207E163CCF838E6954666F53BF041FFF3792D8B66B944B9C25DED8CFD96C34CC12), data: (peerId: 16Uiu2HAmCSLyL8XXnndjKmFJuxHdGmd3mCKwAB8JiLewxiyanNPx, seqNo: 1729765102, addresses: @[(address: /ip4/65.109.189.103/udp/8090)]))",
              "address": "65.109.189.103:8090",
              "seen": true
            },
            {
              "nodeId": "68b4100d61ea5c1364393d91a070225c3e8d601c39bc7679e954c270345f64c2",
              "peerId": "16Uiu2HAmK7oFCTFjPxntDXL2EZG17VLdZTbR1m99zPzz1hCTmiwH",
              "record": "(envelope: (publicKey: secp256k1 key (0460043f3563d59fe9b21580c2f4e9d31bd16538a02246298571997626069984700798a4eb80f9f3f252f4b1809fd20d36a7ab120867cbdc19325e30f5796f0139), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 3, 96, 4, 63, 53, 99, 213, 159, 233, 178, 21, 128, 194, 244, 233, 211, 27, 209, 101, 56, 160, 34, 70, 41, 133, 113, 153, 118, 38, 6, 153, 132, 112, 16, 201, 143, 175, 185, 6, 26, 11, 10, 9, 4, 174, 138, 1, 90, 145, 2, 119, 126], signature: 30450221009EE150E1CB62B7812E4D2745C1A77AE8493756E776CA83001476B53745484C9202206197C6EF19F631A9BEA680316D73DA4ECD2F4327765092FED272B63A92EF4500), data: (peerId: 16Uiu2HAmK7oFCTFjPxntDXL2EZG17VLdZTbR1m99zPzz1hCTmiwH, seqNo: 1730922441, addresses: @[(address: /ip4/174.138.1.90/udp/30590)]))",
              "address": "174.138.1.90:30590",
              "seen": true
            },
            {
              "nodeId": "6f8402ec3c218db0cc5bdab9926e4d2ff90793834fa37634901e53b71927d378",
              "peerId": "16Uiu2HAmErA5tExKaMMMxcWromdhNfNVzxHmFXhLZVd4w498YKQC",
              "record": "(envelope: (publicKey: secp256k1 key (042093c4fb3463285a6842bda1578ec61a2ff4b34e964aaa44e173049cdb4fb9d12b76daf4f48370e8dc07033dc66d6b27c844507b955115c7306fb3c33692e1e3), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 3, 32, 147, 196, 251, 52, 99, 40, 90, 104, 66, 189, 161, 87, 142, 198, 26, 47, 244, 179, 78, 150, 74, 170, 68, 225, 115, 4, 156, 219, 79, 185, 209, 16, 200, 143, 175, 185, 6, 26, 11, 10, 9, 4, 68, 183, 10, 227, 145, 2, 119, 96], signature: 3045022100A1A8D055E6DA1BF73FA887787196752806686EDE6A6547BDEA6896F410A9B56602202CF2DD0780785F446818C83314E6A72B3E76DD776E5AE82E64E79EC4A1E6CA02), data: (peerId: 16Uiu2HAmErA5tExKaMMMxcWromdhNfNVzxHmFXhLZVd4w498YKQC, seqNo: 1730922440, addresses: @[(address: /ip4/68.183.10.227/udp/30560)]))",
              "address": "68.183.10.227:30560",
              "seen": true
            },
            {
              "nodeId": "6fe5c727c8a4a3a57852083082cf84ea0ca3c528fa3595c505c8a785ee1122f2",
              "peerId": "16Uiu2HAm7Fygrs2Hzu4bwk9jNSc4sgCBy48McJzTHMQDurE9juBZ",
              "record": "(envelope: (publicKey: secp256k1 key (04afd075242e6ecab6f04d5d4fb7dc0665540a743584dcdd0fb9136244c520a02430d92ba8fffcbebdb6c475265d439167dbcda976dbf31bfb991b850123903f76), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 2, 175, 208, 117, 36, 46, 110, 202, 182, 240, 77, 93, 79, 183, 220, 6, 101, 84, 10, 116, 53, 132, 220, 221, 15, 185, 19, 98, 68, 197, 32, 160, 36, 16, 183, 188, 232, 184, 6, 26, 11, 10, 9, 4, 91, 107, 183, 232, 145, 2, 31, 154], signature: 3045022100A62D986E1ECF3B3714DCBF82145DFEC612EA63FAC5EB4DABBBCDB13F537E1F84022025B725876C370D2EF5BD96B9F16C83006CEB2B8979EE9A6DC09E3CA5DA140CDF), data: (peerId: 16Uiu2HAm7Fygrs2Hzu4bwk9jNSc4sgCBy48McJzTHMQDurE9juBZ, seqNo: 1729764919, addresses: @[(address: /ip4/91.107.183.232/udp/8090)]))",
              "address": "91.107.183.232:8090",
              "seen": true
            },
            {
              "nodeId": "4867719c734e408018e2c0127ecc51043d1217e590a1e86d810781e6c8afc689",
              "peerId": "16Uiu2HAmGKNDqXECxQjVGovXa5maUJ4XfcV4AFM9ZZzohMzqJeZK",
              "record": "(envelope: (publicKey: secp256k1 key (043667dc998969be3a04d8da7559cb35029b867377798c70aa9b5e298637d926ceb515b4e4fb2cd33d5be76dde4ffae598d09047bf1e0b5e8e28146d0c3332bffb), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 3, 54, 103, 220, 153, 137, 105, 190, 58, 4, 216, 218, 117, 89, 203, 53, 2, 155, 134, 115, 119, 121, 140, 112, 170, 155, 94, 41, 134, 55, 217, 38, 206, 16, 231, 220, 161, 185, 6, 26, 11, 10, 9, 4, 170, 64, 249, 54, 145, 2, 117, 98], signature: 3044022027E0B8D633CE4CDD4C5937BE2DE015F2EFE3B1B221BD91AC4FF5E48BD552981502201EAB3D27D26914984C246A7A4A36833C4C657EF57710B8B1858DA3DFFFE900C5), data: (peerId: 16Uiu2HAmGKNDqXECxQjVGovXa5maUJ4XfcV4AFM9ZZzohMzqJeZK, seqNo: 1730702951, addresses: @[(address: /ip4/170.64.249.54/udp/30050)]))",
              "address": "170.64.249.54:30050",
              "seen": true
            },
            {
              "nodeId": "5f313cd27b6878524ac1addd654708d948f3f063e5013cf1b5b70ff458cd0585",
              "peerId": "16Uiu2HAmPuZMkFimKCZ37Fo78RrTz66vRf9rJhb6GGXCd7UwpRyQ",
              "record": "(envelope: (publicKey: secp256k1 key (04a72c0277b56f822fba5416bce21cfa61b84e21b27380ace884d8ba7b2f26793f07e4783e64d5a8cac9b9c8a64013f0488066999bceb39822fa196d65d0da95f3), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 3, 167, 44, 2, 119, 181, 111, 130, 47, 186, 84, 22, 188, 226, 28, 250, 97, 184, 78, 33, 178, 115, 128, 172, 232, 132, 216, 186, 123, 47, 38, 121, 63, 16, 150, 219, 161, 185, 6, 26, 11, 10, 9, 4, 143, 244, 205, 40, 145, 2, 117, 108], signature: 3045022100DCA5B4A756E96BF1A99A419FB614EA31D664D14BD6D15DBF367ECF99065C613102201A11DF3A55D0E11DAD119C4C247583118A27A113A36A5E05234561A96F82098E), data: (peerId: 16Uiu2HAmPuZMkFimKCZ37Fo78RrTz66vRf9rJhb6GGXCd7UwpRyQ, seqNo: 1730702742, addresses: @[(address: /ip4/143.244.205.40/udp/30060)]))",
              "address": "143.244.205.40:30060",
              "seen": true
            },
            {
              "nodeId": "677a815b19063381b21a290bec408baf1f8aedfe2c42d88ba6143294df3fe498",
              "peerId": "16Uiu2HAkvsm8u4jcJLyfGk9e79LkqDxB32UxVKwX98ruqVD5ARmq",
              "record": "(envelope: (publicKey: secp256k1 key (04158a9e758245f42729ff77822604e102f3df6d71a166e82813f8f7a639a759b0e9383a49ad7f7c0e7eb3048d76ccd4e911480f509b8ad45b9f1a14949d378888), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 2, 21, 138, 158, 117, 130, 69, 244, 39, 41, 255, 119, 130, 38, 4, 225, 2, 243, 223, 109, 113, 161, 102, 232, 40, 19, 248, 247, 166, 57, 167, 89, 176, 16, 140, 176, 189, 184, 6, 26, 11, 10, 9, 4, 213, 202, 255, 11, 145, 2, 31, 154], signature: 3045022100FF25634B6279CFBEA3C23C17FDCA1D80C28B7185B9A1F0C262D26B65CD35240D022042DB009EDB2132A3A4841BC02BC2E5455B975FED563C298C70318DB02D40C457), data: (peerId: 16Uiu2HAkvsm8u4jcJLyfGk9e79LkqDxB32UxVKwX98ruqVD5ARmq, seqNo: 1729058828, addresses: @[(address: /ip4/213.202.255.11/udp/8090)]))",
              "address": "213.202.255.11:8090",
              "seen": true
            },
            {
              "nodeId": "ae9651b0acfcf776ef8a211cc852152056d06aaaf373682acc366984dce05b10",
              "peerId": "16Uiu2HAmCVfA7CLoTRyVarp3FfYRL5dtyQV88sNQ7RyPqTGB7f53",
              "record": "(envelope: (publicKey: secp256k1 key (04fd9c124435b78015cb133f016e6ca5b5e3d8f6a44c3e54fc9a986a659b1ef8b282c22344de6f2402a8947e912e766791bacff7b6dae0466331c27da838b4cb48), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 2, 253, 156, 18, 68, 53, 183, 128, 21, 203, 19, 63, 1, 110, 108, 165, 181, 227, 216, 246, 164, 76, 62, 84, 252, 154, 152, 106, 101, 155, 30, 248, 178, 16, 145, 149, 223, 184, 6, 26, 11, 10, 9, 4, 65, 109, 194, 13, 145, 2, 31, 154], signature: 30450221009C08F52923E561CD8D3A148F44154A36B337836C6AC950C18AE0F6BD2A4DBDF902203C1197EAA792579C6CE3553008B35B42303C543D88016A9A6E408EF6D3AAAFEF), data: (peerId: 16Uiu2HAmCVfA7CLoTRyVarp3FfYRL5dtyQV88sNQ7RyPqTGB7f53, seqNo: 1729612433, addresses: @[(address: /ip4/65.109.194.13/udp/8090)]))",
              "address": "65.109.194.13:8090",
              "seen": true
            },
            {
              "nodeId": "b5a773712396aa21ec87bb444dc19899979c17604c4b25a50802ccc38bb757ca",
              "peerId": "16Uiu2HAmPXHAaaZ5c2dLTTP29T3EuCQzkJv2XVcn4vRzxQuv4WtY",
              "record": "(envelope: (publicKey: secp256k1 key (04a176ec4240e7db215108c7528036d2b828680109c4457cc9d36d80e29e92a64915301d74f07d60f7c837ec22b18c6b6a84702d7c3203226d0d1453a6fead5f4f), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 3, 161, 118, 236, 66, 64, 231, 219, 33, 81, 8, 199, 82, 128, 54, 210, 184, 40, 104, 1, 9, 196, 69, 124, 201, 211, 109, 128, 226, 158, 146, 166, 73, 16, 145, 149, 223, 184, 6, 26, 11, 10, 9, 4, 65, 109, 215, 176, 145, 2, 31, 154], signature: 3044022075885D7C6FC5006136BA6348DF978DCDA3F4CA7C1F6BBDDC50A43AEAF94E69E202207F53F4B135DF2C660DEA573BE9A19AC7C644F166498FA9FEA5D42CBB38C3A860), data: (peerId: 16Uiu2HAmPXHAaaZ5c2dLTTP29T3EuCQzkJv2XVcn4vRzxQuv4WtY, seqNo: 1729612433, addresses: @[(address: /ip4/65.109.215.176/udp/8090)]))",
              "address": "65.109.215.176:8090",
              "seen": true
            },
            {
              "nodeId": "a90d159edeace27b6378346e93e5cd4642b5d67cc98140d02770c50a92482f08",
              "peerId": "16Uiu2HAmDRrS1P8QjrEFikzFQxmYSoVryZoszioVU27zCR9KTBpK",
              "record": "(envelope: (publicKey: secp256k1 key (040b7e2ec8827c789b2a6befa99098dc009c17995a071709f2e4b2baf8449d88d0ae187722e0558dac7fe47f6dbcd1f9b8ff9ac80aa3c0f060bea22b00143cafc9), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 3, 11, 126, 46, 200, 130, 124, 120, 155, 42, 107, 239, 169, 144, 152, 220, 0, 156, 23, 153, 90, 7, 23, 9, 242, 228, 178, 186, 248, 68, 157, 136, 208, 16, 142, 187, 142, 184, 6, 26, 11, 10, 9, 4, 37, 27, 0, 91, 145, 2, 31, 154], signature: 304502210084E8585193371B4D82DDF8B6FAD8CBEC617C08CB6FD1B5C31FAB13C6B73BB613022035AA15226D5B0987928261D843E9711132EC8EEA23C1C134FDA03C1D3060892E), data: (peerId: 16Uiu2HAmDRrS1P8QjrEFikzFQxmYSoVryZoszioVU27zCR9KTBpK, seqNo: 1728290190, addresses: @[(address: /ip4/37.27.0.91/udp/8090)]))",
              "address": "37.27.0.91:8090",
              "seen": true
            },
            {
              "nodeId": "9c2afd1b3505b03dcced43bb456bd94f3200128147dc6d4ac7c2fa1826334266",
              "peerId": "16Uiu2HAmMmcuBiwhPozqPzLGGc2AcxuDv7xgB1mi62jrnBvA9zGE",
              "record": "(envelope: (publicKey: secp256k1 key (04876bfe8c35b794b8f7b8078b7fa2acad73627495a8c2bba03149cdc21b9db96746aefdea35531fae6e6b09ab5e6e23b23e649015ea45c460462205d55dd80acb), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 3, 135, 107, 254, 140, 53, 183, 148, 184, 247, 184, 7, 139, 127, 162, 172, 173, 115, 98, 116, 149, 168, 194, 187, 160, 49, 73, 205, 194, 27, 157, 185, 103, 16, 144, 149, 223, 184, 6, 26, 11, 10, 9, 4, 91, 107, 152, 119, 145, 2, 31, 154], signature: 3045022100D32E72C5A7D631B7FB2B0127F37D0B86D3CB247EC210B4943A4119F302342E4F02207E844E0EA1DECAE24CAFBD42AFFB5B752FA6BA9830CD18B5189D5B17A8674999), data: (peerId: 16Uiu2HAmMmcuBiwhPozqPzLGGc2AcxuDv7xgB1mi62jrnBvA9zGE, seqNo: 1729612432, addresses: @[(address: /ip4/91.107.152.119/udp/8090)]))",
              "address": "91.107.152.119:8090",
              "seen": true
            },
            {
              "nodeId": "8cf1c921ff35767e13a5e0399f6cda6860146e9141de0706ba5eb922c8118aba",
              "peerId": "16Uiu2HAkwk68LSyCYa3HbmfkBLGRDLdQzB5nisydM5LR318iUUtA",
              "record": "(envelope: (publicKey: secp256k1 key (04226f21c03f6703d9f6e8152836e6ab084965a8a0e732b22e2b9a89c45c086a8b8e357f63ae7a2284fb7ff0f71208f49a6947f4931800d129d83697fa3a16ef30), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 2, 34, 111, 33, 192, 63, 103, 3, 217, 246, 232, 21, 40, 54, 230, 171, 8, 73, 101, 168, 160, 231, 50, 178, 46, 43, 154, 137, 196, 92, 8, 106, 139, 16, 231, 221, 161, 185, 6, 26, 11, 10, 9, 4, 159, 223, 243, 50, 145, 2, 117, 58], signature: 30440220210FD3FA0A3FC305CAEA042699510033EF9B12ECFB964F186EE86249AC938A5502203F69CF9218502B68B94CFEC34D5AE97833AA74ADE2B900F084CA2DD95AA95AB9), data: (peerId: 16Uiu2HAkwk68LSyCYa3HbmfkBLGRDLdQzB5nisydM5LR318iUUtA, seqNo: 1730703079, addresses: @[(address: /ip4/159.223.243.50/udp/30010)]))",
              "address": "159.223.243.50:30010",
              "seen": true
            },
            {
              "nodeId": "80d8ed7d1e3a5f6cfeecbc0db99a442fb92ced96a5c8b9e576c8689b68ff0a81",
              "peerId": "16Uiu2HAmB4p7fKoWG28pcTzwKpZTwWZjcNeYRsqrdfJhuRLmpaqk",
              "record": "(envelope: (publicKey: secp256k1 key (04e862fe2b368f23d9362fd79f7134cb026c3875be15a8a85554c970f90e8965a7729b0151fc5b7ca57e2579c79579186a23d1e57b0ba0100bb770020c8caf7050), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 2, 232, 98, 254, 43, 54, 143, 35, 217, 54, 47, 215, 159, 113, 52, 203, 2, 108, 56, 117, 190, 21, 168, 168, 85, 84, 201, 112, 249, 14, 137, 101, 167, 16, 213, 143, 175, 185, 6, 26, 11, 10, 9, 4, 146, 190, 225, 95, 145, 2, 119, 136], signature: 304402200BD97656A67445D518AF11C03B28F782E94BCC888CCB054C98F27A7F6AF0726402205B276A4C62991AD5939294BEFC34419C08371F7E72C21C6ADA113DA079BC5E64), data: (peerId: 16Uiu2HAmB4p7fKoWG28pcTzwKpZTwWZjcNeYRsqrdfJhuRLmpaqk, seqNo: 1730922453, addresses: @[(address: /ip4/146.190.225.95/udp/30600)]))",
              "address": "146.190.225.95:30600",
              "seen": true
            },
            {
              "nodeId": "8c5c86ae9a2b87fb9f3c99f1b7bfb10a17e5db792058d46e61f12d1d2bcb188c",
              "peerId": "16Uiu2HAmKFzSjZ4vGQC5nogxZzCwbf33G8JVxwT7m1Uh2Bey8tnJ",
              "record": "(envelope: (publicKey: secp256k1 key (04621d8e572f379c865d2760e8a48315c4cf006fda3ce352b2e5b2e9f1db04ca27d8f69050602b07404b3c0a32860b6847e1552a7e6c6f90af00d023279edbba7d), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 3, 98, 29, 142, 87, 47, 55, 156, 134, 93, 39, 96, 232, 164, 131, 21, 196, 207, 0, 111, 218, 60, 227, 82, 178, 229, 178, 233, 241, 219, 4, 202, 39, 16, 206, 143, 175, 185, 6, 26, 11, 10, 9, 4, 128, 199, 59, 15, 145, 2, 119, 66], signature: 304402204F45EED73F5C8C9FB054F566D4F18E23BC0AC0968E27895E29AFEC62B07A5B4602202637393A76082BB494D56B80C972383F57251BEDCAC8F7942A8F4AD70CEB0D30), data: (peerId: 16Uiu2HAmKFzSjZ4vGQC5nogxZzCwbf33G8JVxwT7m1Uh2Bey8tnJ, seqNo: 1730922446, addresses: @[(address: /ip4/128.199.59.15/udp/30530)]))",
              "address": "128.199.59.15:30530",
              "seen": true
            },
            {
              "nodeId": "9cc01b0f47fd0d2e3fedd7a8572a1b93dcf42394298bd0b9720ea687f22c4f63",
              "peerId": "16Uiu2HAmLTsRLaWxaQuvQBtJE9YpjtFjxtRKwa5pdoK5zdD5eLkA",
              "record": "(envelope: (publicKey: secp256k1 key (04740445402f2a5270b3318a21e5180f4d9a81f03c5bfb374a81d8751410a99a7bc7fb2dbb16969b75817da5a71ad0d7e19b2a87191e644111aac7b7e90becd2d9), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 3, 116, 4, 69, 64, 47, 42, 82, 112, 179, 49, 138, 33, 229, 24, 15, 77, 154, 129, 240, 60, 91, 251, 55, 74, 129, 216, 117, 20, 16, 169, 154, 123, 16, 212, 143, 175, 185, 6, 26, 11, 10, 9, 4, 68, 183, 10, 227, 145, 2, 119, 116], signature: 304402203F38FB9B3631E3F0EB6620674517737E06D9E364366F28CBE822232590B11FD402200DC923037CCC2D32DF48216DFF651CB4C8CCD9B16BB492FFDD49C605E6583A58), data: (peerId: 16Uiu2HAmLTsRLaWxaQuvQBtJE9YpjtFjxtRKwa5pdoK5zdD5eLkA, seqNo: 1730922452, addresses: @[(address: /ip4/68.183.10.227/udp/30580)]))",
              "address": "68.183.10.227:30580",
              "seen": true
            },
            {
              "nodeId": "926723661dbfe53c353363641249cee2267ab80a789f1809e6c0e823e00412d2",
              "peerId": "16Uiu2HAm5HFF3DkX6G8XKfN4xFGZP4tSVdF6n9cCmRyzapga1Xx6",
              "record": "(envelope: (publicKey: secp256k1 key (04926c409e0b3659c6b335b35df4d7e20da4a143e8d915b83d8156a8a6a244ea6347feff7155f9379c0b3d5f90060603e6b45d01938d7e2d5cc6fd7f5b402947ec), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 2, 146, 108, 64, 158, 11, 54, 89, 198, 179, 53, 179, 93, 244, 215, 226, 13, 164, 161, 67, 232, 217, 21, 184, 61, 129, 86, 168, 166, 162, 68, 234, 99, 16, 140, 224, 136, 185, 6, 26, 11, 10, 9, 4, 92, 114, 97, 226, 145, 2, 31, 154], signature: 3045022100CB54EEC036FE5F5D72A4EC679ADEE7A91920C94F5D37D981B74BC0EABF41A15C0220511CE0886570AF6A95419CDF083DB3DE5A332FDFE5FD5B802041FE8A2B69AFF8), data: (peerId: 16Uiu2HAm5HFF3DkX6G8XKfN4xFGZP4tSVdF6n9cCmRyzapga1Xx6, seqNo: 1730293772, addresses: @[(address: /ip4/92.114.97.226/udp/8090)]))",
              "address": "92.114.97.226:8090",
              "seen": true
            },
            {
              "nodeId": "a7b088368dee78dac9e189e7ebe6fd770d21b6a93ed0f86dd23f7b42af2a39f8",
              "peerId": "16Uiu2HAm3itC9B6UbWkB75NJozqE3QWH7K4YYB5ivT6qrSvAuJkf",
              "record": "(envelope: (publicKey: secp256k1 key (047b462da7697ee0420fd5d77e237fe37f95dcbe555a01425f18386bcba10dd9d812752dfb22d3200e640833075f7c22e60d093499fc07ab790d8facb733c93d7c), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 2, 123, 70, 45, 167, 105, 126, 224, 66, 15, 213, 215, 126, 35, 127, 227, 127, 149, 220, 190, 85, 90, 1, 66, 95, 24, 56, 107, 203, 161, 13, 217, 216, 16, 176, 139, 159, 176, 6, 26, 11, 10, 9, 4, 209, 38, 160, 40, 145, 2, 117, 118], signature: 304402205CEDDBCDDE5517C8CB646F2BEDD70B27F167401629D41731ACEBE8BC46B8D1A702203850D787894683F027A18A82A3A45DD68502CA2CCE5F87211CD871729E6FB0FD), data: (peerId: 16Uiu2HAm3itC9B6UbWkB75NJozqE3QWH7K4YYB5ivT6qrSvAuJkf, seqNo: 1711785392, addresses: @[(address: /ip4/209.38.160.40/udp/30070)]))",
              "address": "209.38.160.40:30070",
              "seen": false
            },
            {
              "nodeId": "cd3472149292853e5682083441fb81398c838098290507ca95daf498a2b802e1",
              "peerId": "16Uiu2HAmQan5ihZSn1P2xzSUJJZ8bqykLsDk3G1M8t3cnWBxMJWR",
              "record": "(envelope: (publicKey: secp256k1 key (04b1380c431eafc9d438851268d3c0e33eb1d27f576a49dddbc09fc3d4b6f9c09e6c105f2d2ead49e176db6718013065354b50e45b4e66bb59b257aac2547c1c85), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 3, 177, 56, 12, 67, 30, 175, 201, 212, 56, 133, 18, 104, 211, 192, 227, 62, 177, 210, 127, 87, 106, 73, 221, 219, 192, 159, 195, 212, 182, 249, 192, 158, 16, 193, 219, 161, 185, 6, 26, 11, 10, 9, 4, 64, 225, 89, 147, 145, 2, 117, 88], signature: 3045022100BB7AEBCAB05932E3D007C6B388C58B9615E5FC8A68C353982DF1FA63844C96A902200091FF878401F49AC51EC7BA8010CCC6F3B9AF46E11B69C7A45566E4D368649E), data: (peerId: 16Uiu2HAmQan5ihZSn1P2xzSUJJZ8bqykLsDk3G1M8t3cnWBxMJWR, seqNo: 1730702785, addresses: @[(address: /ip4/64.225.89.147/udp/30040)]))",
              "address": "64.225.89.147:30040",
              "seen": true
            },
            {
              "nodeId": "c59006f36231e009c0f53088f4a41ffd615466851856bce46f328e328241ba22",
              "peerId": "16Uiu2HAmQKjLk2gVxPzeiUPc7UEMGeeBg5LLUUEF7CQpFS7sARrZ",
              "record": "(envelope: (publicKey: secp256k1 key (04ad5d3c8cbd2ac87904e5b5d9042ee24d88592b5c51c078bc902a334a090af122dfa1031aaba5873da2f610f1c80f484ac55614686c87f00af6b43e0aff4e2575), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 3, 173, 93, 60, 140, 189, 42, 200, 121, 4, 229, 181, 217, 4, 46, 226, 77, 136, 89, 43, 92, 81, 192, 120, 188, 144, 42, 51, 74, 9, 10, 241, 34, 16, 185, 188, 232, 184, 6, 26, 11, 10, 9, 4, 91, 107, 128, 175, 145, 2, 31, 154], signature: 3045022100B054D2C55EC776AA4FC9C39082D686F19C5F3A980BDEAC82AEB91D660008289102205EF26BC3FC6EF0428F6F181EC6B51EA1CEA306699278C1CE7E022D5A9D8B3205), data: (peerId: 16Uiu2HAmQKjLk2gVxPzeiUPc7UEMGeeBg5LLUUEF7CQpFS7sARrZ, seqNo: 1729764921, addresses: @[(address: /ip4/91.107.128.175/udp/8090)]))",
              "address": "91.107.128.175:8090",
              "seen": true
            },
            {
              "nodeId": "c1f6a298a68bb6fd75554a10dae474ea843fd7d1b441fed5e380e620c2b78645",
              "peerId": "16Uiu2HAmB4muugHE5dungHszjPBd54u8WDY1xvUEo6hHk51yWNAz",
              "record": "(envelope: (publicKey: secp256k1 key (04e8608098648de46847b3078d9fcbfe76992a78c5e78d57d065d323b2c4c178bf140fe498e77e40ffa4487f2ce0b45b40cbc78bc14b2c817c255e7b6096111bee), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 2, 232, 96, 128, 152, 100, 141, 228, 104, 71, 179, 7, 141, 159, 203, 254, 118, 153, 42, 120, 197, 231, 141, 87, 208, 101, 211, 35, 178, 196, 193, 120, 191, 16, 213, 143, 175, 185, 6, 26, 11, 10, 9, 4, 174, 138, 1, 90, 145, 2, 119, 46], signature: 3044022024D914102BD51278A69384EC8F1E9A8FC102B8FED9BC3AB3D62E85CFBC2720BC02206C33EF8EF4A824A2A8A8C48CEF954B6D038D461B2A411199C9B561CB03AFCFAF), data: (peerId: 16Uiu2HAmB4muugHE5dungHszjPBd54u8WDY1xvUEo6hHk51yWNAz, seqNo: 1730922453, addresses: @[(address: /ip4/174.138.1.90/udp/30510)]))",
              "address": "174.138.1.90:30510",
              "seen": true
            },
            {
              "nodeId": "de5a4dfacdf3d0346ced28b3952b6f39b744bbe6dd87832144d9260e7ffef5de",
              "peerId": "16Uiu2HAmFgh2AXKH2EHXLCLK5JsHMFvFWc7J3zh3eb2vVrjpXXLM",
              "record": "(envelope: (publicKey: secp256k1 key (042d02a0aa4d07b540f5e04e19d03a7b4f3cae7470c92f915e5a40c2d2b7c328ba7064d778487449770daa4fd18930f0e1b43b88659b8e3661dd125f664c380d25), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 3, 45, 2, 160, 170, 77, 7, 181, 64, 245, 224, 78, 25, 208, 58, 123, 79, 60, 174, 116, 112, 201, 47, 145, 94, 90, 64, 194, 210, 183, 195, 40, 186, 16, 183, 188, 232, 184, 6, 26, 11, 10, 9, 4, 89, 163, 152, 179, 145, 2, 31, 154], signature: 304402202443F1AC43F39723E3D2A19C416E41261F5B59E1AA2D32D5EF6B7404BC154E8702203C5AD6A523218C76A7A5FDEAD5845398BA232C23F7986B47CA4F1B3E426EC9D9), data: (peerId: 16Uiu2HAmFgh2AXKH2EHXLCLK5JsHMFvFWc7J3zh3eb2vVrjpXXLM, seqNo: 1729764919, addresses: @[(address: /ip4/89.163.152.179/udp/8090)]))",
              "address": "89.163.152.179:8090",
              "seen": true
            },
            {
              "nodeId": "dbd9610ea9b694d4dec4914de9027c201ea53e2b30f9d8ca5a5b64d39893e6c7",
              "peerId": "16Uiu2HAmFFbfDuiHbmRefG3eUUCQ89TdFbUDPLpmbmTNbPifXCMS",
              "record": "(envelope: (publicKey: secp256k1 key (0426950bac62ca36c636cacc9832f8b05fdd6ee8edff269343be76d9dbe757145d6d5e46b66ee660a1045bef028d1e6485b517c26cc2d595dd0409508f63f5ff59), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 3, 38, 149, 11, 172, 98, 202, 54, 198, 54, 202, 204, 152, 50, 248, 176, 95, 221, 110, 232, 237, 255, 38, 147, 67, 190, 118, 217, 219, 231, 87, 20, 93, 16, 235, 189, 232, 184, 6, 26, 11, 10, 9, 4, 91, 107, 145, 50, 145, 2, 31, 154], signature: 304402207BAFC2D8EA19E02E2E32863669AE9F55E96AD66A4205A23B2173043D44A9C0E302207593895F15C039BA612F218749BF70B34E2A063AA1745135FB9C0A03F2353694), data: (peerId: 16Uiu2HAmFFbfDuiHbmRefG3eUUCQ89TdFbUDPLpmbmTNbPifXCMS, seqNo: 1729765099, addresses: @[(address: /ip4/91.107.145.50/udp/8090)]))",
              "address": "91.107.145.50:8090",
              "seen": true
            },
            {
              "nodeId": "ec1daa92473c84fb6ef960ea1dabda1fc564cecc5b02f037fc3fa4786bb46331",
              "peerId": "16Uiu2HAmFA9PjY6AQmRphZtZd1d6fMHp1FYk6LuSdpkWuZ4aKufL",
              "record": "(envelope: (publicKey: secp256k1 key (04252f70f90aa0613bfa087ce1198a20f1c93ddb17e54826fc81d526017e326bbf089d281106ed7eeebb8eb8d12844a6950978b17675a6b6ce0eedc767dcbe8e4f), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 3, 37, 47, 112, 249, 10, 160, 97, 59, 250, 8, 124, 225, 25, 138, 32, 241, 201, 61, 219, 23, 229, 72, 38, 252, 129, 213, 38, 1, 126, 50, 107, 191, 16, 181, 220, 161, 185, 6, 26, 11, 10, 9, 4, 68, 183, 245, 13, 145, 2, 117, 78], signature: 304402204F29BDD3E4D5F9711C0FD1BDF31700190E981802F45C9F3EC514468E2F52441D022072538DD1E86DFF628EAF4AE483E32717C35343D0CF161E0E059CF30D045109BF), data: (peerId: 16Uiu2HAmFA9PjY6AQmRphZtZd1d6fMHp1FYk6LuSdpkWuZ4aKufL, seqNo: 1730702901, addresses: @[(address: /ip4/68.183.245.13/udp/30030)]))",
              "address": "68.183.245.13:30030",
              "seen": true
            },
            {
              "nodeId": "e9cde7f5669e3bf832685e673abad52051aa5bb25da2b94c8cb6b05512d71ce1",
              "peerId": "16Uiu2HAmRhskguVD6WL92Co3CiFpnqweFvehDD9XQ64mBAYPaY4c",
              "record": "(envelope: (publicKey: secp256k1 key (04c1e536b55912fe99d72d490e296467ffe5cb7801ebb62fe284ec7b2eadb3fc553606562390520e52ce80b12bcb46b5b2dcd654b2c1a90db406582780e97355db), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 3, 193, 229, 54, 181, 89, 18, 254, 153, 215, 45, 73, 14, 41, 100, 103, 255, 229, 203, 120, 1, 235, 182, 47, 226, 132, 236, 123, 46, 173, 179, 252, 85, 16, 217, 143, 175, 185, 6, 26, 11, 10, 9, 4, 128, 199, 59, 15, 145, 2, 119, 86], signature: 3045022100DF64877DF6B9744DA01B3B5E6EA570F24419AE206E121C6263E9E4EE6DAC639002204CC80E6DA22BBA6514D2326E3BDE7AD3322B329F71D4E49725F15BD19A18706F), data: (peerId: 16Uiu2HAmRhskguVD6WL92Co3CiFpnqweFvehDD9XQ64mBAYPaY4c, seqNo: 1730922457, addresses: @[(address: /ip4/128.199.59.15/udp/30550)]))",
              "address": "128.199.59.15:30550",
              "seen": true
            },
            {
              "nodeId": "ea713d7de737295f6d7a0fcc85adbfeed0fc5d06df5db5d7c70c4f5219049940",
              "peerId": "16Uiu2HAm95ddGc8doZP2wY4s9LshfZWYeZVnsAdLdv6anS4kc35p",
              "record": "(envelope: (publicKey: secp256k1 key (04cae156daac6650c90e5530e9e1b270ec973db87b85fe1b1d639cae5e62215d2720ba64a180e0cb5c89869bedaab4f31ccdaea224e211d609e06bf9c63fd4eb02), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 2, 202, 225, 86, 218, 172, 102, 80, 201, 14, 85, 48, 233, 225, 178, 112, 236, 151, 61, 184, 123, 133, 254, 27, 29, 99, 156, 174, 94, 98, 33, 93, 39, 16, 196, 143, 175, 185, 6, 26, 11, 10, 9, 4, 146, 190, 225, 95, 145, 2, 119, 106], signature: 30440220267830119873DDD8C072D8B9E8942ABF5EB44870344002747324B96D38853250022079C41109A27C02B7992FA7F785F8A2F7D72F6FC347E856F16ECD169B0BCCA991), data: (peerId: 16Uiu2HAm95ddGc8doZP2wY4s9LshfZWYeZVnsAdLdv6anS4kc35p, seqNo: 1730922436, addresses: @[(address: /ip4/146.190.225.95/udp/30570)]))",
              "address": "146.190.225.95:30570",
              "seen": true
            },
            {
              "nodeId": "f603004b84a2c9dd4c0676f74e44dfebd215541279698ff7eb8d0f145ea8cfec",
              "peerId": "16Uiu2HAm8oHkzbuoq3sCYSDrBTRGypVXbo1Pa8hNoZJsLyZZrmfH",
              "record": "(envelope: (publicKey: secp256k1 key (04c6b19534cb6c3dac78c4efd98f84cec6410045bb6fd3bb62aba4b05d269454042747996c6c77bb3aa99b445e7bf7b26d910970789570308823fe46b2e5a2c222), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 2, 198, 177, 149, 52, 203, 108, 61, 172, 120, 196, 239, 217, 143, 132, 206, 198, 65, 0, 69, 187, 111, 211, 187, 98, 171, 164, 176, 93, 38, 148, 84, 4, 16, 164, 173, 138, 185, 6, 26, 11, 10, 9, 4, 84, 42, 147, 214, 145, 2, 31, 154], signature: 3045022100F3A835B50EF97E9601391A1D248122370A6304585AA054EB45E8FD24D7A55A4402207A15280144E1D3F50D0C4C8230AC1F84977B535DB753CAC55B33AEF8F0841222), data: (peerId: 16Uiu2HAm8oHkzbuoq3sCYSDrBTRGypVXbo1Pa8hNoZJsLyZZrmfH, seqNo: 1730320036, addresses: @[(address: /ip4/84.42.147.214/udp/8090)]))",
              "address": "84.42.147.214:8090",
              "seen": true
            },
            {
              "nodeId": "f04e080916f58d56a3d4da4b51a2f2fcdd37c15b1d70b1ad7720f9ee82916a88",
              "peerId": "16Uiu2HAkx8PixTcAPoZBqx4AAvntzGLa7MkWt3PFAf9etmiGFUBd",
              "record": "(envelope: (publicKey: secp256k1 key (042825ce78ce987399df6e3b98138f49ba94bb8364e7485b80fda027097b2acd7429d117f263150750478c2fbacdc57b6199fe995387f8b2f9661d51d48a975860), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 2, 40, 37, 206, 120, 206, 152, 115, 153, 223, 110, 59, 152, 19, 143, 73, 186, 148, 187, 131, 100, 231, 72, 91, 128, 253, 160, 39, 9, 123, 42, 205, 116, 16, 215, 209, 246, 184, 6, 26, 11, 10, 9, 4, 31, 201, 249, 95, 145, 2, 31, 154], signature: 3045022100BA7D97B2BF377F7A2DEB75832793B19EFC27FEA1E57B0F593B43EF5E6013FABD02206446747CE80694101720FE95327F6FA9C81CCCE464EF7ADB47506458FF6546BB), data: (peerId: 16Uiu2HAkx8PixTcAPoZBqx4AAvntzGLa7MkWt3PFAf9etmiGFUBd, seqNo: 1729997015, addresses: @[(address: /ip4/31.201.249.95/udp/8090)]))",
              "address": "31.201.249.95:8090",
              "seen": true
            },
            {
              "nodeId": "f1643407728ca590d464befc304626bf323798608fa43ac392789b68b6ed3fc1",
              "peerId": "16Uiu2HAm8Bs6tKnE5vx4Sy3kRoH3C82ijbqBK8NLv32adSwAVsHc",
              "record": "(envelope: (publicKey: secp256k1 key (04bd9e5fed6ed4a45b1194d0c2d9b909f3e510c74e46b366c63b2750d69b2fe7bb777ce06b38294996be8e9baddcf958fcb42f1fb6f2040320bda809ef991a95bc), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 2, 189, 158, 95, 237, 110, 212, 164, 91, 17, 148, 208, 194, 217, 185, 9, 243, 229, 16, 199, 78, 70, 179, 102, 198, 59, 39, 80, 214, 155, 47, 231, 187, 16, 152, 139, 152, 184, 6, 26, 11, 10, 9, 4, 37, 60, 244, 91, 145, 2, 31, 154], signature: 304402205CD6DD69EAAE47B5B3FA468ED1E9BA1A525F2AA846F6E72D967AB5DF98D88F29022072FCC741B9643C965857808CD20EBD93661F4093086A50C15F016D9726BBAB0A), data: (peerId: 16Uiu2HAm8Bs6tKnE5vx4Sy3kRoH3C82ijbqBK8NLv32adSwAVsHc, seqNo: 1728447896, addresses: @[(address: /ip4/37.60.244.91/udp/8090)]))",
              "address": "37.60.244.91:8090",
              "seen": true
            },
            {
              "nodeId": "ee168ac4b350c0e8c5e1457013050afc4e200b23fd2084ebd75347b48e3aa3e8",
              "peerId": "16Uiu2HAkvGtV2oFLjvsQ5sdYZF57bwrD2UiArcKmrZnUjBSHwfrt",
              "record": "(envelope: (publicKey: secp256k1 key (040c9b991c1ba2a0dd5098de66bce1e37b27e66a7c8ede843486f4f2d2e7e31d352fc82478fc88306c59208e266166fbd0e11bb5b1f00518cb6335c111901aab64), domain: \"libp2p-peer-record\", payloadType: @[3, 1], payload: @[10, 39, 0, 37, 8, 2, 18, 33, 2, 12, 155, 153, 28, 27, 162, 160, 221, 80, 152, 222, 102, 188, 225, 227, 123, 39, 230, 106, 124, 142, 222, 132, 52, 134, 244, 242, 210, 231, 227, 29, 53, 16, 135, 136, 159, 176, 6, 26, 11, 10, 9, 4, 143, 244, 205, 40, 145, 2, 117, 108], signature: 3045022100909BFF3D04DD1B2742B11E3DD27331242B9A7FE8A07BFA99BC350CE87921B54D02205B049AD647C78157A7EDCCC77AA1F6B9921340DA1F3C38184CA87088CD28C278), data: (peerId: 16Uiu2HAkvGtV2oFLjvsQ5sdYZF57bwrD2UiArcKmrZnUjBSHwfrt, seqNo: 1711784967, addresses: @[(address: /ip4/143.244.205.40/udp/30060)]))",
              "address": "143.244.205.40:30060",
              "seen": false
            }
          ]
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
  static defaultPurchases = [
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
          collateral: 10,
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
  ]

  static defaultAvailabilities = [{
    id: "0x123456789",
    totalSize: GB * 1,
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
  },]


  static defaultReservations = [
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
  ]

  override async purchases(): Promise<SafeValue<CodexPurchase[]>> {
    if (DebugErrorsData.purchasesApi) {
      return Promise.resolve({
        error: true,
        data: new CodexError("Error generated because it is on in the settings."),
      })
    }

    await WebStorage.purchases.set(
      CodexMarketplaceMock.defaultPurchases[0].request.id,
      CodexDataMock.defaultContent.cid
    );

    await WebStorage.purchases.set(
      CodexMarketplaceMock.defaultPurchases[1].request.id,
      CodexDataMock.defaultContent.cid
    );

    const purchases = await WebStorage.get<CodexPurchase[]>("mock-purchases") || []

    return Promise.resolve({
      error: false,
      data: [...purchases, ...CodexMarketplaceMock.defaultPurchases],
    });
  }

  override async createStorageRequest(input: CodexCreateStorageRequestInput): Promise<SafeValue<string>> {
    if (DebugErrorsData.storageRequestApi) {
      return Promise.resolve({
        error: true,
        data: new CodexError("Error generated because it is on in the settings."),
      })
    }
    const purchases = await WebStorage.get<CodexPurchase[]>("mock-purchases") || []
    const requestId = Strings.randomEthereumAddress()
    const purchase: CodexPurchase = {
      state: "submitted",
      error: "",
      request: {
        id: requestId,
        client: Strings.randomEthereumAddress(),
        ask: {
          duration: input.duration.toString(),
          maxSlotLoss: input.tolerance,
          proofProbability: input.proofProbability.toString(),
          reward: input.reward.toString(),
          slots: 3,
          slotSize: GB.toString(),
        },
        content: {
          cid: Strings.randomCid(64)
        },
        expiry: "300",
        nonce: Strings.randomCid(64),
      },
      requestId,
    }

    await WebStorage.set("mock-purchases", [purchase, ...purchases])
    await WebStorage.purchases.set(requestId, input.cid);

    return Promise.resolve({
      error: false,
      data: requestId,
    });
  }

  override async availabilities(): Promise<SafeValue<CodexAvailability[]>> {
    if (DebugErrorsData.availabilitiesApi) {
      return Promise.resolve({
        error: true,
        data: new CodexError("Error generated because it is on in the settings."),
      })
    }

    const availabilities = await WebStorage.get<CodexAvailability[]>("mock-availabilities") || []

    return Promise.resolve({
      error: false,
      data: [...availabilities, ...CodexMarketplaceMock.defaultAvailabilities],
    });
  }

  override async createAvailability(
    input: CodexCreateAvailabilityInput
  ): Promise<SafeValue<CodexAvailabilityCreateResponse>> {
    if (DebugErrorsData.createAvailabilityApi) {
      return Promise.resolve({
        error: true,
        data: new CodexError("Error generated because it is on in the settings."),
      })
    }

    const space = await new CodexDataMock("").space()
    let totalUsed = 0
    if (space.error === false) {
      totalUsed = space.data.quotaReservedBytes + space.data.quotaUsedBytes

      if (input.totalSize > space.data.quotaMaxBytes - totalUsed) {
        return { error: true, data: new CodexError("You do not have enough space.") }
      }
    }

    const availabilities = await WebStorage.get<CodexAvailability[]>("mock-availabilities") || []

    const availability: CodexAvailability = {
      id: Strings.randomEthereumAddress(),
      totalSize: input.totalSize,
      duration: input.duration,
      minPrice: input.minPrice,
      maxCollateral: input.maxCollateral
    }

    await WebStorage.set("mock-availabilities", [availability, ...availabilities])
    await WebStorage.set("mock-reservations-" + availability.id, [{
      id: Strings.randomEthereumAddress(),
      availabilityId: availability.id,
      requestId: Strings.randomEthereumAddress(),
      size: Math.floor(Math.random() * (availability.totalSize - availability.totalSize / 4) + availability.totalSize / 4),
      slotIndex: Math.floor(Math.random() * (3 - 1) + 1)
    }])

    let freeSize = 0
    if (space.error === false) {
      freeSize = space.data.quotaMaxBytes - totalUsed
    }

    return Promise.resolve({
      error: false,
      data: {
        ...input,
        id: availability.id,
        freeSize: freeSize.toString(),
      },
    });
  }

  override async reservations(availabilityId: string): Promise<SafeValue<CodexReservation[]>> {
    if (DebugErrorsData.reservationsApi) {
      return Promise.resolve({
        error: true,
        data: new CodexError("Error generated because it is on in the settings."),
      })
    }

    const index = CodexMarketplaceMock.defaultAvailabilities.findIndex(a => a.id === availabilityId)
    if (index == 0) {
      return {
        error: false,
        data: [...CodexMarketplaceMock.defaultReservations],
      }
    }

    if (index == 1) {
      return {
        error: false,
        data: [...CodexMarketplaceMock.defaultReservations.slice(1)],
      }
    }

    const reservations = await WebStorage.get<CodexReservation[]>("mock-reservations-" + availabilityId) || []

    return {
      error: false,
      data: [...reservations],
    }
  }
}

const mock = {
  url: () => "http://localhost:8080",
  updateURL: () => Promise.resolve(""),
  debug: () => new CodexDebugMock(""),
  data: () => new CodexDataMock(""),
  node: () => new CodexNodeMock(""),
  marketplace: () => new CodexMarketplaceMock(""),
};

export const CodexSdk = {
  ...mock,
};


export const Echo = {
  portForwarding: () => Promise.resolve({ reachable: !DebugErrorsData.portForwarding })

}
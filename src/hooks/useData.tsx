import { useQuery } from "@tanstack/react-query";
import { FilesStorage } from "../utils/file-storage";
import { CodexSdk } from "../sdk/codex";
import * as Sentry from "@sentry/browser";
import { CodexDataContent } from "@codex-storage/sdk-js";

export function useData() {
  const { data = [] } = useQuery({
    queryFn: (): Promise<CodexDataContent[]> => {
      return Promise.resolve().then(async () => {
        const res = await CodexSdk.data.cids();

        if (res.error) {
          if (import.meta.env.PROD) {
            Sentry.captureException(res.data);
          }
          return [];
        }

        const metadata = await FilesStorage.list();

        return res.data.content.map((content, index) => {
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
      });
    },
    queryKey: ["cids"],
    refetchOnWindowFocus: false,
  });

  return data;
}

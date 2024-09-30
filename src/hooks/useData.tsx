import { useQuery } from "@tanstack/react-query";
import { CodexSdk } from "../sdk/codex";
import { CodexDataResponse } from "@codex-storage/sdk-js";
import { Promises } from "../utils/promises";

export function useData() {
  const { data = { content: [] } satisfies CodexDataResponse } =
    useQuery<CodexDataResponse>({
      queryFn: () =>
        CodexSdk.data.cids().then((res) => Promises.rejectOnError(res)),
      queryKey: ["cids"],

      initialData: { content: [] } satisfies CodexDataResponse,

      // No need to retry because if the connection to the node
      // is back again, all the queries will be invalidated.
      retry: false,

      // The client node should be local, so display the cache value while
      // making a background request looks good.
      staleTime: 0,

      // Don't expect something new when coming back to the UI
      refetchOnWindowFocus: false,

      // Throw the error to the error boundary
      throwOnError: true,
    });

  return data.content;
}

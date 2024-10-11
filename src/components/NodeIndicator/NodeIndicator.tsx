import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CodexSdk } from "../../sdk/codex";
import {
  NetworkIndicator,
  Toast,
} from "@codex-storage/marketplace-ui-components";
import { Promises } from "../../utils/promises";

const report = false;
export let isCodexOnline: boolean | null = null;

export function NodeIndicator() {
  const queryClient = useQueryClient();
  const [toast] = useState({
    time: 0,
    message: "",
  });

  const { data, isError } = useQuery({
    queryKey: ["spr"],
    queryFn: async () => {
      return CodexSdk.node()
        .spr()
        .then((data) => Promises.rejectOnError(data, report));
    },
    refetchInterval: 5000,

    // No need to retry because we defined a refetch interval
    retry: false,

    // The client node should be local, so display the cache value while
    // making a background request looks good.
    staleTime: 0,

    // Refreshing when focus returns can be useful if a user comes back
    // to the UI after performing an operation in the terminal.
    refetchOnWindowFocus: true,

    // Cache is not useful for the spr endpoint
    gcTime: 0,
  });

  isCodexOnline = !isError && !!data;

  useEffect(() => {
    queryClient.invalidateQueries({
      type: "active",
      refetchType: "all",
    });
  }, [queryClient, isCodexOnline]);

  return (
    <>
      <Toast message={toast.message} time={toast.time} variant="success" />
      <NetworkIndicator online={isCodexOnline} text="Codex node" />
    </>
  );
}

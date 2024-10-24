import { useQuery } from "@tanstack/react-query";
import { Echo } from "../utils/echo";
import { Errors } from "../utils/errors";
import { CodexDebugInfo } from "@codex-storage/sdk-js";
import { DebugUtils } from "../utils/debug";

type PortForwardingResponse = { reachable: boolean };

export function usePortForwarding(info: CodexDebugInfo | undefined) {
  const { data, isFetching, refetch } = useQuery({
    queryFn: (): Promise<PortForwardingResponse> => {
      const port = DebugUtils.getTcpPort(info!);
      if (port.error) {
        Errors.report(port);
        return Promise.resolve({ reachable: false });
      } else {
        return Echo.portForwarding(port.data).catch((e) => Errors.report(e));
      }
    },
    queryKey: ["port-forwarding"],

    initialData: { reachable: false },

    // Enable only when the use has an internet connection
    enabled: !!info,

    // No need to retry because we provide a retry button
    retry: false,

    // The data should not be cached
    staleTime: 0,

    // The user may try to change the port forwarding and go back
    // to the tab
    refetchOnWindowFocus: true,
  });

  return { enabled: data.reachable, isFetching, refetch };
}

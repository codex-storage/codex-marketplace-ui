import { useQuery } from "@tanstack/react-query";
import { CodexSdk } from "../../sdk/codex";
import { Placeholder, Spinner } from "@codex-storage/marketplace-ui-components";
import { Promises } from "../../utils/promises";
import { CircleX } from "lucide-react";

export function Debug() {
  const { data, isPending, isError, error } = useQuery({
    queryFn: () =>
      CodexSdk.debug()
        .info()
        .then((s) => Promises.rejectOnError(s)),
    queryKey: ["debug"],

    // No need to retry because if the connection to the node
    // is back again, all the queries will be invalidated.
    retry: false,

    // The client node should be local, so display the cache value while
    // making a background request looks good.
    staleTime: 0,

    // Refreshing when focus returns can be useful if a user comes back
    // to the UI after performing an operation in the terminal.
    refetchOnWindowFocus: true,

    // Throw the error to the error boundary
    throwOnError: true,
  });

  if (isPending) {
    return (
      <div className="settings-debug-loader">
        <Spinner width="3rem" />
      </div>
    );
  }

  if (isError) {
    return (
      <Placeholder
        Icon={<CircleX size={"4em"}></CircleX>}
        title="Something went wrong"
        message={error.message}></Placeholder>
    );
  }

  return (
    <>
      <h3>Debug</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

import { useQuery } from "@tanstack/react-query";
import Loader from "../../assets/loader.svg";
import { CodexSdk } from "../../sdk/codex";
import { SpaceAllocation } from "@codex-storage/marketplace-ui-components";
import { Promises } from "../../utils/promises";
import { nodeSpaceAllocationColors } from "./nodeSpaceAllocation.domain";

const defaultSpace = {
  quotaMaxBytes: 0,
  quotaReservedBytes: 0,
  quotaUsedBytes: 0,
  totalBlocks: 0,
};

export function NodeSpaceAllocation() {
  const { data: space, isPending } = useQuery({
    queryFn: () =>
      CodexSdk.data()
        .space()
        .then((s) => Promises.rejectOnError(s)),
    queryKey: ["space"],
    initialData: defaultSpace,

    // No need to retry because if the connection to the node
    // is back again, all the queries will be invalidated.
    retry: false,

    // The client node should be local, so display the cache value while
    // making a background request looks good.
    staleTime: 0,

    // Refreshing when focus returns can be useful if a user comes back
    // to the UI after performing an operation in the terminal.
    refetchOnWindowFocus: true,
  });

  if (isPending || !space) {
    return <img src={Loader} width={24} height={24} alt="Loader" />;
  }

  const { quotaMaxBytes, quotaReservedBytes, quotaUsedBytes } = space;

  return (
    <SpaceAllocation
      data={[
        {
          title: "Maximum storage space used by the node",
          size: quotaMaxBytes,
          color: nodeSpaceAllocationColors[0],
        },
        {
          title: "Amount of storage space currently in use",
          size: quotaUsedBytes,
          color: nodeSpaceAllocationColors[1],
        },
        {
          title: "Amount of storage space reserved",
          size: quotaReservedBytes,
          color:
            nodeSpaceAllocationColors[nodeSpaceAllocationColors.length - 1],
        },
      ]}></SpaceAllocation>
  );
}

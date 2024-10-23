import { Button, Input } from "@codex-storage/marketplace-ui-components";
import "./ManifestFetch.css";
import { ChangeEvent, useState } from "react";
import { CodexSdk } from "../../sdk/codex";
import { useQuery } from "@tanstack/react-query";
import { Promises } from "../../utils/promises";

export function ManifestFetch() {
  const [cid, setCid] = useState("");

  const { refetch } = useQuery({
    queryFn: () =>
      CodexSdk.data()
        .fetchManifest(cid)
        .then((s) => {
          if (s.error === false) {
            setCid("");
          }
          return Promises.rejectOnError(s);
        }),
    queryKey: ["cids"],

    // Disable the fetch to make it available on refetch only
    enabled: false,

    // No need to retry because if the connection to the node
    // is back again, all the queries will be invalidated.
    retry: false,

    // The client node should be local, so display the cache value while
    // making a background request looks good.
    staleTime: 0,

    refetchOnWindowFocus: false,
  });

  const onDownload = () => refetch();

  const onCidChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCid(e.currentTarget.value);

  return (
    <div className="fetch">
      <div className="fetch-inputContainer">
        <Input
          id="cid"
          placeholder="CID"
          inputClassName="fetch-input"
          onChange={onCidChange}></Input>
      </div>
      <Button label="Fetch" onClick={onDownload}></Button>
    </div>
  );
}
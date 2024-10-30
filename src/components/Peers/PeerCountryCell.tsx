import { Cell } from "@codex-storage/marketplace-ui-components";
import { PeerPin } from "./types";
import { useQuery } from "@tanstack/react-query";
import "./PeerCountryCell.css";
import { useEffect } from "react";

export type Props = {
  address: string;
  onPinAdd: (pin: PeerPin) => void;
};

const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export function PeerCountryCell({ address, onPinAdd }: Props) {
  const { data } = useQuery({
    queryFn: () => {
      const [ip] = address.split(":");

      return fetch(import.meta.env.VITE_GEO_IP_URL + "/json?ip=" + ip).then(
        (res) => res.json()
      );
    },
    refetchOnMount: true,

    queryKey: [address],

    // Enable only when the address exists
    enabled: !!address,

    // No need to retry because if the connection to the node
    // is back again, all the queries will be invalidated.
    retry: false,

    // We can cache the data at Infinity because the relation between
    // country and ip is fixed
    staleTime: Infinity,

    // Don't expect something new when coming back to the UI
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      onPinAdd({
        lat: data.latitude,
        lng: data.longitude,
      });
    }
  }, [data, onPinAdd]);

  return (
    <Cell>
      <div className="peer-country">
        {data ? (
          <>
            <span> {!!data && getFlagEmoji(data.country_iso)}</span>
            <span>{data?.country}</span>
          </>
        ) : (
          <span>{address}</span>
        )}
      </div>
    </Cell>
  );
}

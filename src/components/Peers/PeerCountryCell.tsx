import { Cell } from "@codex-storage/marketplace-ui-components";
import { PeerPin } from "./types";
import { countriesCoordinates } from "./countries";
import { useQuery } from "@tanstack/react-query";
import "./PeerCountryCell.css";

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

      return fetch(import.meta.env.VITE_GEO_IP_URL + "/" + ip)
        .then((res) => res.json())
        .then((json) => {
          const coordinate = countriesCoordinates.find(
            (c) => c.iso === json.country
          );

          if (coordinate) {
            onPinAdd({
              lat: parseFloat(coordinate.lat),
              lng: parseFloat(coordinate.lng),
            });
          }

          return coordinate;
        });
    },
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

  return (
    <Cell>
      <div className="peerCountry">
        {data ? (
          <>
            <span> {!!data && getFlagEmoji(data.iso)}</span>
            <span>{data?.name}</span>
          </>
        ) : (
          <span>{address}</span>
        )}
      </div>
    </Cell>
  );
}

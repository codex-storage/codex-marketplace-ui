import { ChangeEvent, useState } from "react";
import { WebStorage } from "../../utils/web-storage";
import { DebugErrorsData, UpdateErrorsData } from "./debug-errors.domain";

export type State = {
  uploadApi: boolean;
  filesApi: boolean;
  nodeSpaceApi: boolean;
  nodeConnectionApi: boolean;
  purchasesApi: boolean;
  storageRequestApi: boolean;
  availabilitiesApi: boolean;
  createAvailabilityApi: boolean;
  reservationsApi: boolean;
  portForwarding: boolean;
};

export function DebugErrors() {
  const [data, setData] = useState<State>(DebugErrorsData);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const newData = { ...data, [target.name]: target.checked || false };

    UpdateErrorsData(newData);

    WebStorage.set("debug-errors", newData);

    setData(newData);
  };

  return (
    <div>
      <div>
        <input
          id="upload"
          type="checkbox"
          name="uploadApi"
          onChange={onInputChange}
          checked={data.uploadApi || false}
        />
        <label htmlFor="upload">Upload API</label>
      </div>

      <div>
        <input
          id="files"
          type="checkbox"
          name="filesApi"
          onChange={onInputChange}
          checked={data.filesApi || false}
        />
        <label htmlFor="files">File list API</label>
      </div>

      <div>
        <input
          id="nodeSpace"
          type="checkbox"
          name="nodeSpaceApi"
          onChange={onInputChange}
          checked={data.nodeSpaceApi || false}
        />
        <label htmlFor="nodeSpace">Node space API</label>
      </div>

      <div>
        <input
          id="nodeConnection"
          type="checkbox"
          name="nodeConnectionApi"
          onChange={onInputChange}
          checked={data.nodeConnectionApi || false}
        />
        <label htmlFor="nodeConnection">Node connection API</label>
      </div>

      <div>
        <input
          id="purchases"
          type="checkbox"
          name="purchasesApi"
          onChange={onInputChange}
          checked={data.purchasesApi || false}
        />
        <label htmlFor="purchases">Purchases API</label>
      </div>

      <div>
        <input
          id="storageRequest"
          type="checkbox"
          name="storageRequestApi"
          onChange={onInputChange}
          checked={data.storageRequestApi || false}
        />
        <label htmlFor="storageRequest">Storage Request API</label>
      </div>

      <div>
        <input
          id="availabilities"
          type="checkbox"
          name="availabilitiesApi"
          onChange={onInputChange}
          checked={data.availabilitiesApi || false}
        />
        <label htmlFor="availabilities">Availabilities API</label>
      </div>

      <div>
        <input
          id="createAvailability"
          type="checkbox"
          name="createAvailabilityApi"
          onChange={onInputChange}
          checked={data.createAvailabilityApi || false}
        />
        <label htmlFor="createAvailability">Create availability API</label>
      </div>

      <div>
        <input
          id="reservations"
          type="checkbox"
          name="reservationsApi"
          onChange={onInputChange}
          checked={data.reservationsApi || false}
        />
        <label htmlFor="reservations">Reservations API</label>
      </div>

      <div>
        <input
          id="portForwarding"
          type="checkbox"
          name="portForwarding"
          onChange={onInputChange}
          checked={data.portForwarding || false}
        />
        <label htmlFor="reservations">Port forwarding</label>
      </div>
    </div>
  );
}

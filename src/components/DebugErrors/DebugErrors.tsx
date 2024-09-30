import { ChangeEvent, useEffect, useState } from "react";
import { WebStorage } from "../../utils/web-storage";

type State = {
  uploadApi: boolean;
  filesApi: boolean;
  nodeSpaceApi: boolean;
  nodeConnectionApi: boolean;
  purchasesApi: boolean;
  storageRequestApi: boolean;
  availabilitiesApi: boolean;
  createAvailabilityApi: boolean;
  reservationsApi: boolean;
};

export let DebugErrorsData: State = {
  uploadApi: false,
  filesApi: false,
  nodeSpaceApi: false,
  nodeConnectionApi: false,
  purchasesApi: false,
  storageRequestApi: false,
  availabilitiesApi: false,
  createAvailabilityApi: false,
  reservationsApi: false,
};

export function DebugErrorsDataLoad() {
  return WebStorage.get<State>("debug-errors").then((debug) => {
    if (debug) {
      DebugErrorsData = debug;
    }
  });
}

export function DebugErrors() {
  const [data, setData] = useState<State>(DebugErrorsData);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const newData = { ...data, [target.name]: target.checked || false };

    DebugErrorsData = newData;

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
    </div>
  );
}

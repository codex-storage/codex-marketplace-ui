import { WebStorage } from "../../utils/web-storage";
import { State } from "./DebugErrors";

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

export function UpdateErrorsData(state: State) {
    DebugErrorsData = state
}

export function DebugErrorsDataLoad() {
    return WebStorage.get<State>("debug-errors").then((debug) => {
        if (debug) {
            DebugErrorsData = debug;
        }
    });
}


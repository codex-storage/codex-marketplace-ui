import { SafeValue } from "@codex-storage/sdk-js";
import { Errors } from "./errors";

export const Promises = {
  rejectOnError: <T>(safe: SafeValue<T>, report = true) => {
    if (safe.error) {
      if (report) {
        Errors.report(safe)
      }

      return Promise.reject(safe.data);
    }

    return Promise.resolve(safe.data);
  },
};

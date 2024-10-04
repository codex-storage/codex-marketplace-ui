import * as Sentry from "@sentry/browser";
import { isCodexOnline } from "../components/NodeIndicator/NodeIndicator";
import { CodexError } from "@codex-storage/sdk-js";

// It would be preferable to completely ignore the error
// when the node is not connected. However, during the
// initial load, we lack this information until the
// SPR response is completed. In the meantime, other
// requests may be initiated, so if the node is not
// connected, we should set the level to 'log'.
const getLogLevel = () => {
    switch (isCodexOnline) {
        case true:
            return "error";
        case null:
            return "info";
        case false:
            return "log";
    }
};

export const Errors = {
    report(safe: { error: true, data: CodexError }) {
        Sentry.captureException(safe.data, {
            extra: {
                code: safe.data.code,
                errors: safe.data.errors,
                sourceStack: safe.data.sourceStack,
                level: getLogLevel(),
            },
        });
    }
}
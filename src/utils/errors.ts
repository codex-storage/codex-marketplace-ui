import * as Sentry from "@sentry/browser";
import { CodexError } from "@codex-storage/sdk-js";

export const Errors = {
    report(safe: { error: true, data: CodexError }) {
        if (safe.data.code === 502) {
            // Ignore Gateway error 
            return
        }

        Sentry.captureException(safe.data, {
            extra: {
                code: safe.data.code,
                errors: safe.data.errors,
                sourceStack: safe.data.sourceStack,
            },
        });
    }
}
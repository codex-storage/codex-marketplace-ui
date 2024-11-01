import { assert, describe, it } from "vitest";
import { VersionsUtil } from "./versions.util";

describe("versions", () => {
    it("gets the last client version", async () => {
        const version = "v0.1.0\nv0.1.1\nv0.1.2\nv0.1.3\nv0.1.4\nv0.1.5\nv0.1.6\nv0.1.7"
        assert.equal(VersionsUtil.clientVersion(version), "v0.1.7")
    })
})
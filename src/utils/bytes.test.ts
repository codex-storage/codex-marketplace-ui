import { assert, describe, it } from "vitest";
import { Bytes } from "./bytes";
import { GB } from "./constants";

describe("bytes", () => {
    it("display the bytes", async () => {
        assert.equal(Bytes.pretty(0), "0 B");
        assert.equal(Bytes.pretty(512), "512.0 B");
        assert.equal(Bytes.pretty(1025), "1.0 KB");
        assert.equal(Bytes.pretty(GB), "1.0 GB");
    });
})
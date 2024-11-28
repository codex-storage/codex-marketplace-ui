import { assert, describe, it } from "vitest";
import { Times } from "./times";

describe("times", () => {
    it("display the times", async () => {
        assert.equal(Times.pretty(0), "0 second");
        assert.equal(Times.pretty(2), "2 seconds");
        assert.equal(Times.pretty(60), "1 minute");
        assert.equal(Times.pretty(90), "1.5 minutes");
        assert.equal(Times.pretty(3600), "1 hour");
        assert.equal(Times.pretty(3600 * 2), "2 hours");
        assert.equal(Times.pretty(3600 * 24), "1 day");
        assert.equal(Times.pretty(3600 * 36), "1.5 days");
        assert.equal(Times.pretty(3600 * 24 * 30), "1 month");
    });

    it("guess the time unit", async () => {
        assert.equal(Times.unit(0), "hours");
        assert.equal(Times.unit(3600 * 24), "days");
        assert.equal(Times.unit(3600 * 24 * 30), "months");
    })

    it("get the seconds for a time unit given", async () => {
        assert.equal(Times.value("hours"), 3600);
        assert.equal(Times.value("days"), 3600 * 24);
        assert.equal(Times.value("months"), 3600 * 24 * 30);
    })
})
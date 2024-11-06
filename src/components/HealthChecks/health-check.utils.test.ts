import { assert, describe, it } from "vitest";
import { HealthCheckUtil } from "./health-check.utils";

describe("health check", () => {
    it("remove the port from an url", async () => {
        assert.deepEqual(HealthCheckUtil.removePort("http://localhost:8080"), "http://localhost");
    });

    it("get the port from an url", async () => {
        assert.deepEqual(HealthCheckUtil.getPort("http://localhost:8080"), 8080);
    });

    it("get the default port when the url does not contain the port", async () => {
        assert.deepEqual(HealthCheckUtil.getPort("http://localhost"), 80);
    });

    it("returns true when the url contains a port", async () => {
        assert.deepEqual(HealthCheckUtil.containsPort("http://localhost:8080"), true);
    });

    it("returns false when the url does not contain a port", async () => {
        assert.deepEqual(HealthCheckUtil.containsPort("http://localhost"), false);
    });


    it("returns true when the url is invalid", async () => {
        assert.deepEqual(HealthCheckUtil.isUrlInvalid("http://"), true);
    });

    it("returns false when the url is valid", async () => {
        assert.deepEqual(HealthCheckUtil.isUrlInvalid("http://localhost:8080"), false);
    });

    it("returns the tcp port", async () => {
        const debug = {
            "id": "a",
            "addrs": [
                "/ip4/127.0.0.1/tcp/8070"
            ],
            "repo": "",
            "spr": "",
            "announceAddresses": [
                "/ip4/127.0.0.1/tcp/8070"
            ],
            "table": {
                "localNode": {
                    "nodeId": "",
                    "peerId": "",
                    "record": "",
                    "address": "0.0.0.0:8090",
                    "seen": false
                },
                "nodes": []
            },
            "codex": {
                "version": "v0.1.0\nv0.1.1\nv0.1.2\nv0.1.3\nv0.1.4\nv0.1.5\nv0.1.6\nv0.1.7",
                "revision": "2fb7031e"
            }
        }
        assert.deepEqual(HealthCheckUtil.getTcpPort(debug), { error: false, data: 8070 });
    });

    it("returns an error when the addr is empty", async () => {
        const debug = {
            "id": "a",
            "addrs": [
            ],
            "repo": "",
            "spr": "",
            "announceAddresses": [
                "/ip4/127.0.0.1/tcp/8070"
            ],
            "table": {
                "localNode": {
                    "nodeId": "",
                    "peerId": "",
                    "record": "",
                    "address": "0.0.0.0:8090",
                    "seen": false
                },
                "nodes": []
            },
            "codex": {
                "version": "v0.1.0\nv0.1.1\nv0.1.2\nv0.1.3\nv0.1.4\nv0.1.5\nv0.1.6\nv0.1.7",
                "revision": "2fb7031e"
            }
        }
        assert.deepEqual(HealthCheckUtil.getTcpPort(debug).error, true);
    });

    it("returns an error when the addr is misformated", async () => {
        const debug = {
            "id": "a",
            "addrs": [
                "/ip4/127.0.0.1/tcp/hello"
            ],
            "repo": "",
            "spr": "",
            "announceAddresses": [
                "/ip4/127.0.0.1/tcp/8070"
            ],
            "table": {
                "localNode": {
                    "nodeId": "",
                    "peerId": "",
                    "record": "",
                    "address": "0.0.0.0:8090",
                    "seen": false
                },
                "nodes": []
            },
            "codex": {
                "version": "v0.1.0\nv0.1.1\nv0.1.2\nv0.1.3\nv0.1.4\nv0.1.5\nv0.1.6\nv0.1.7",
                "revision": "2fb7031e"
            }
        }
        assert.deepEqual(HealthCheckUtil.getTcpPort(debug).error, true);
    });

    it("returns an error when the port is misformated", async () => {
        const debug = {
            "id": "a",
            "addrs": [
                "hello"
            ],
            "repo": "",
            "spr": "",
            "announceAddresses": [
                "/ip4/127.0.0.1/tcp/8070"
            ],
            "table": {
                "localNode": {
                    "nodeId": "",
                    "peerId": "",
                    "record": "",
                    "address": "0.0.0.0:8090",
                    "seen": false
                },
                "nodes": []
            },
            "codex": {
                "version": "v0.1.0\nv0.1.1\nv0.1.2\nv0.1.3\nv0.1.4\nv0.1.5\nv0.1.6\nv0.1.7",
                "revision": "2fb7031e"
            }
        }
        assert.deepEqual(HealthCheckUtil.getTcpPort(debug).error, true);
    });
})
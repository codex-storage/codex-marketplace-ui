import { assert, describe, it } from "vitest";
import { FilesUtils } from "./files.utils";

describe("files", () => {
    it("sorts by name", async () => {
        const a = {
            cid: "", manifest: {
                datasetSize: 0,
                blockSize: 0,
                protected: false,
                treeCid: "",
                filename: "a",
                mimetype: null,
                uploadedAt: 0
            }
        }
        const b = {
            cid: "", manifest: {
                datasetSize: 0,
                blockSize: 0,
                protected: false,
                treeCid: "",
                filename: "b",
                mimetype: null,
                uploadedAt: 0
            }
        }

        const items = [a, b,]

        const descSorted = items.slice().sort(FilesUtils.sortByName("desc"))

        assert.deepEqual(descSorted, [b, a]);

        const ascSorted = items.slice().sort(FilesUtils.sortByName("asc"))

        assert.deepEqual(ascSorted, [a, b]);
    });

    it("sorts by size", async () => {
        const a = {
            cid: "", manifest: {
                datasetSize: 1000,
                blockSize: 0,
                protected: false,
                treeCid: "",
                filename: "a",
                mimetype: null,
                uploadedAt: 0
            }
        }
        const b = {
            cid: "", manifest: {
                datasetSize: 2000,
                blockSize: 0,
                protected: false,
                treeCid: "",
                filename: "b",
                mimetype: null,
                uploadedAt: 0
            }
        }

        const items = [a, b,]

        const descSorted = items.slice().sort(FilesUtils.sortBySize("desc"))

        assert.deepEqual(descSorted, [b, a]);

        const ascSorted = items.slice().sort(FilesUtils.sortBySize("asc"))

        assert.deepEqual(ascSorted, [a, b]);
    });

    it("sorts by date", async () => {
        const now = new Date()

        const a = {
            cid: "", manifest: {
                datasetSize: 0,
                blockSize: 0,
                protected: false,
                treeCid: "",
                filename: "a",
                mimetype: null,
                uploadedAt: now.getTime()
            }
        }

        now.setDate(now.getDate() - 1)

        const b = {
            cid: "", manifest: {
                datasetSize: 2000,
                blockSize: 0,
                protected: false,
                treeCid: "",
                filename: "b",
                mimetype: null,
                uploadedAt: now.getTime()
            }
        }

        const items = [a, b,]

        const descSorted = items.slice().sort(FilesUtils.sortBySize("desc"))

        assert.deepEqual(descSorted, [b, a]);

        const ascSorted = items.slice().sort(FilesUtils.sortBySize("asc"))

        assert.deepEqual(ascSorted, [a, b]);
    });

    it("returns true when a file is an image", async () => {
        assert.deepEqual(FilesUtils.isImage("image/jpg"), true);
        assert.deepEqual(FilesUtils.isImage("video/mp4"), false);
        assert.deepEqual(FilesUtils.isImage(null), false);
    });

    it("returns true when a file is a video", async () => {
        assert.deepEqual(FilesUtils.isVideo("video/mp4"), true);
        assert.deepEqual(FilesUtils.isVideo("image/jpg"), false);
        assert.deepEqual(FilesUtils.isImage(null), false);
    });

    it("returns true when a file is an archive", async () => {
        assert.deepEqual(FilesUtils.isArchive("application/zip"), true);
        assert.deepEqual(FilesUtils.isArchive("video/mp4"), false);
        assert.deepEqual(FilesUtils.isArchive(null), false);
    });

    it("gets the type of a file", async () => {
        assert.deepEqual(FilesUtils.type("application/zip"), "archive");
    });

    it("fallbacks to document when the mimetype is not known", async () => {
        assert.deepEqual(FilesUtils.type("application/octet-stream"), "document");
    });

    it("removes a cid from a folder", async () => {
        const folders = [["favorites", ["123", "456"]]] satisfies [string, string[]][]
        const folder = "favorites"
        const cid = "456"

        assert.deepEqual(FilesUtils.removeCidFromFolder(folders, folder, cid), [["favorites", ["123"]]]);
    });

    it("adds a cid from to a folder", async () => {
        const folders = [["favorites", ["123"]]] satisfies [string, string[]][]
        const folder = "favorites"
        const cid = "456"

        assert.deepEqual(FilesUtils.addCidToFolder(folders, folder, cid), [["favorites", ["123", cid]]]);
    });

    it("returns true when the folder exists", async () => {
        const folders = [["favorites", []]] satisfies [string, string[]][]

        assert.deepEqual(FilesUtils.exists(folders, "favorites"), true);
    });

    it("toggles filter", async () => {
        const filters = FilesUtils.toggleFilters(["images"], "archives")

        assert.deepEqual(filters, ["images", "archives"]);
        assert.deepEqual(FilesUtils.toggleFilters(filters, "archives"), ["images"]);
    });

    it("list all files when the first item is selected", async () => {
        const folders = [["favorites", ["123"]], ["hello", ["456"]]] satisfies [string, string[]][]
        const files = [
            {
                cid: "123", manifest: {
                    datasetSize: 0,
                    blockSize: 0,
                    protected: false,
                    treeCid: "",
                    filename: "a",
                    mimetype: null,
                    uploadedAt: 0
                }
            },
            {
                cid: "456",
                manifest: {
                    datasetSize: 0,
                    blockSize: 0,
                    protected: false,
                    treeCid: "",
                    filename: "a",
                    mimetype: null,
                    uploadedAt: 0
                }
            }
        ]


        assert.deepEqual(FilesUtils.listInFolder(files, folders, 0), files);
    });

    it("list all files in favorites", async () => {
        const folders = [["favorites", ["123"]], ["hello", ["456"]]] satisfies [string, string[]][]
        const files = [
            {
                cid: "123", manifest: {
                    datasetSize: 0,
                    blockSize: 0,
                    protected: false,
                    treeCid: "",
                    filename: "a",
                    mimetype: null,
                    uploadedAt: 0
                }
            },
            {
                cid: "456",
                manifest: {
                    datasetSize: 0,
                    blockSize: 0,
                    protected: false,
                    treeCid: "",
                    filename: "a",
                    mimetype: null,
                    uploadedAt: 0
                }
            }
        ]


        assert.deepEqual(FilesUtils.listInFolder(files, folders, 1), [files[0]]);
    });

    it("returns all files when no filter is selected", async () => {
        const files = [
            {
                cid: "123", manifest: {
                    datasetSize: 0,
                    blockSize: 0,
                    protected: false,
                    treeCid: "",
                    filename: "a",
                    mimetype: null,
                    uploadedAt: 0
                }
            },
            {
                cid: "456",
                manifest: {
                    datasetSize: 0,
                    blockSize: 0,
                    protected: false,
                    treeCid: "",
                    filename: "a",
                    mimetype: null,
                    uploadedAt: 0
                }
            }
        ]


        assert.deepEqual(FilesUtils.applyFilters(files, []), files);
    });

    it("returns apply filter by mimetype", async () => {
        const files = [
            {
                cid: "123", manifest: {
                    datasetSize: 0,
                    blockSize: 0,
                    protected: false,
                    treeCid: "",
                    filename: "a",
                    mimetype: "image/jpg",
                    uploadedAt: 0
                }
            },
            {
                cid: "456",
                manifest: {
                    datasetSize: 0,
                    blockSize: 0,
                    protected: false,
                    treeCid: "",
                    filename: "a",
                    mimetype: "application/zip",
                    uploadedAt: 0
                }
            }
        ]


        assert.deepEqual(FilesUtils.applyFilters(files, ["archive"]), [files[1]]);
    });
})
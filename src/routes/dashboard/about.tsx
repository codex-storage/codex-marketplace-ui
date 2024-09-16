import { CodexDataContent } from "@codex-storage/sdk-js";
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { PrettyBytes } from "../../utils/bytes";
import { Button, WebFileIcon } from "@codex-storage/marketplace-ui-components";

function ProtectedIcon({ isProtected }: { isProtected: boolean }) {
  if (isProtected) {
    return (
      <span title="Protected" className="material-symbols-outlined primary">
        lock
      </span>
    );
  }

  return (
    <span title="Not protected" className="material-symbols-outlined error">
      lock_open
    </span>
  );
}

const About = () => {
  {
    const c = useRouterState({
      select: (s) => s.location.state,
    }) as CodexDataContent;

    if (!c.cid) {
      return <div className="container"></div>;
    }

    return (
      <div className="container manifest-main-content">
        <div className="manifest" key={c.cid}>
          <div className="row">
            <WebFileIcon type={c.manifest.mimetype} />
            <div className="manifest-data grow">
              <div>
                <b>{c.manifest.filename}</b>
                <div>
                  <small className="manifest-meta">
                    {PrettyBytes(c.manifest.datasetSize)} -{" "}
                    {c.manifest.uploadedAt} - ...{c.cid.slice(-5)}
                  </small>
                </div>
              </div>
              <div className="row row-center">
                {ProtectedIcon({ isProtected: c.manifest.protected })}
                <a href="#" className="row row-center">
                  <span className="material-symbols-outlined primary">
                    expand_circle_right
                  </span>
                </a>
              </div>
            </div>
          </div>

          <h2>File details</h2>
          <div className="manifest-details-meta">
            <p className="manifest-details-info">
              <b className="manifest-details-label">Cid: </b>
              <span>{c.cid}</span>
            </p>

            <p className="manifest-details-info">
              <b className="manifest-details-label">Name: </b>
              <span>{c.manifest.filename}</span>
            </p>

            <p className="manifest-details-info">
              <b className="manifest-details-label">Uploaded: </b>
              <span>{c.manifest.uploadedAt}</span>
            </p>

            <p className="manifest-details-info">
              <b className="manifest-details-label">File size: </b>
              <span>{PrettyBytes(c.manifest.datasetSize)}</span>
            </p>

            <p className="manifest-details-info">
              <b className="manifest-details-label">Protected: </b>
              <span>{c.manifest.protected ? "Yes" : "No"}</span>
            </p>

            <div className="row row-center">
              <Button label="Cache" variant="outline"></Button>

              <a
                className="button"
                target="_blank"
                href={"/api/codex/v1/data/" + c.cid}>
                Download
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export const Route = createFileRoute("/dashboard/about")({
  component: () => About,
});

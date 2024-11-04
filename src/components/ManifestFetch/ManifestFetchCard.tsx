import { ReloadManifest } from "./ReloadManifest";
import { ManifestFetch } from "./ManifestFetch";

export function ManifestFetchCard() {
  return (
    <div className="card">
      <header>
        <div>
          <ReloadManifest></ReloadManifest>
          <h5>Fetch Manifest</h5>
        </div>
      </header>
      <main className="row gap">
        <ManifestFetch />
      </main>
    </div>
  );
}

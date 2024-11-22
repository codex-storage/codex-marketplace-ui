import { Files } from "../../components/Files/Files";
import "./files.css";
import { UploadCard } from "../../components/UploadCard/UploadCard";
import { Download } from "../../components/Download/Download";
import { ManifestFetch } from "../../components/ManifestFetch/ManifestFetch";
import UploadIcon from "../../assets/icons/upload.svg?react";
import DownloadIcon from "../../assets/icons/download.svg?react";
import FetchIcon from "../../assets/icons/fetch.svg?react";
import { Card } from "../../components/Card/Card";
import FilesIconOutline from "../../assets/icons/files-outline.svg?react";

export const FilesRoute = () => (
  <div className="files-page">
    <Card icon={<FilesIconOutline width={24}></FilesIconOutline>} title="Files">
      <Files></Files>
    </Card>

    <aside>
      <Card icon={<UploadIcon width={24}></UploadIcon>} title="Upload">
        <UploadCard />
      </Card>

      <Card icon={<DownloadIcon></DownloadIcon>} title="Download">
        <Download />
      </Card>

      <Card icon={<FetchIcon></FetchIcon>} title="Fetch manifest">
        <ManifestFetch />
      </Card>
    </aside>
  </div>
);

import { Upload, UploadIcon } from "@codex-storage/marketplace-ui-components";
import { CodexSdk } from "../../sdk/codex";
import { useQueryClient } from "@tanstack/react-query";

export function UploadCard() {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["cids"] });
  };

  return (
    <div className="card node-space">
      <header>
        <div>
          <UploadIcon width={18} fill="#969696"></UploadIcon>
          <h5>Upload</h5>
        </div>
      </header>
      <main>
        <Upload multiple codexData={CodexSdk.data()} onSuccess={onSuccess} />
      </main>
    </div>
  );
}

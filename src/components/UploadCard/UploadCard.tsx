import { Upload } from "@codex-storage/marketplace-ui-components";
import { CodexSdk } from "../../sdk/codex";
import { useQueryClient } from "@tanstack/react-query";
import UploadIcon from "../../assets/icons/upload.svg?react";

export function UploadCard() {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["cids"] });
  };

  return (
    <main>
      <Upload
        multiple
        codexData={CodexSdk.data()}
        onSuccess={onSuccess}
        Icon={() => <UploadIcon width={40} color={"#96969666"} />}
      />
    </main>
  );
}

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  NetworkIndicator,
  Toast,
} from "@codex-storage/marketplace-ui-components";
import { useCodexConnection } from "../../hooks/useCodexConnection";

export function NodeIndicator() {
  const queryClient = useQueryClient();
  const [toast] = useState({
    time: 0,
    message: "",
  });
  const codex = useCodexConnection();

  useEffect(() => {
    queryClient.invalidateQueries({
      type: "active",
      refetchType: "all",
    });
  }, [queryClient, codex.enabled]);

  return (
    <>
      <Toast message={toast.message} time={toast.time} variant="success" />
      <NetworkIndicator online={codex.enabled} text="Codex node" />
    </>
  );
}

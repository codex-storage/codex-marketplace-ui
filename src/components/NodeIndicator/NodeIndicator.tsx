import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useCodexConnection } from "../../hooks/useCodexConnection";
import "./NodeIndicator.css";
import { NodesIcon } from "../Menu/NodesIcon";

export function NodeIndicator() {
  const queryClient = useQueryClient();
  const codex = useCodexConnection();

  useEffect(() => {
    queryClient.invalidateQueries({
      type: "active",
      refetchType: "all",
    });
  }, [queryClient, codex.enabled]);

  return (
    <>
      <div className="network-indicator">
        <div className="network-indicator-icon">
          <NodesIcon variant={codex.enabled ? "success" : "failure"} />
        </div>
        <span className="network-indicator-text">Node</span>
      </div>
    </>
  );
}

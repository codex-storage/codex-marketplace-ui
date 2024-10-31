import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDebug } from "../../hooks/useDebug";
import { usePersistence } from "../../hooks/usePersistence";
import { usePortForwarding } from "../../hooks/usePortForwarding";
import { CodexSdk } from "../../proxy";
import { ErrorCircleIcon } from "../ErrorCircleIcon/ErrorCircleIcon";
import { SuccessCheckIcon } from "../SuccessCheckIcon/SuccessCheckIcon";
import { WarningIcon } from "../WarningIcon/WarningIcon";
import { HealthCheckIcon } from "./HealthCheckIcon";
import { Input } from "@codex-storage/marketplace-ui-components";
import { classnames } from "../../utils/classnames";
import { DebugUtils } from "../../utils/debug";
import { RefreshIcon } from "../RefreshIcon/RefreshIcon";
import "./HealthChecks.css";

type Props = {
  online: boolean;
  onStepValid: (valid: boolean) => void;
};

const throwOnError = false;
const defaultPort = 8070;

export function HealthChecks({ online, onStepValid }: Props) {
  const codex = useDebug(throwOnError);
  const portForwarding = usePortForwarding(codex.data);
  const persistence = usePersistence(codex.isSuccess);
  const [isAddressInvalid, setIsAddressInvalid] = useState(false);
  const [isPortInvalid, setIsPortInvalid] = useState(false);
  const [address, setAddress] = useState(
    CodexSdk.url().split(":")[0] + ":" + CodexSdk.url().split(":")[1]
  );
  const [port, setPort] = useState(
    parseInt(CodexSdk.url().split(":")[2] || "80", 10)
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    if (codex.isSuccess) {
      persistence.refetch();
      portForwarding.refetch().then(({ data }) => {
        onStepValid(data?.reachable || false);
      });
    } else {
      onStepValid(false);
    }
  }, [
    persistence.refetch,
    onStepValid,
    portForwarding.refetch,
    codex.isSuccess,
  ]);

  const onAddressChange = (e: React.FormEvent<HTMLInputElement>) => {
    const element = e.currentTarget;
    const parts = e.currentTarget.value.split(":");

    setIsAddressInvalid(!element.checkValidity());

    if (parts.length > 2) {
      const [protocol, addr, port] = parts;
      setAddress(protocol + ":" + addr);

      const p = parseInt(port, 10);
      if (!isNaN(p)) {
        setPort(p);
      }
    } else {
      setAddress(parts.join(":"));
    }
  };

  const onPortChange = (e: React.FormEvent<HTMLInputElement>) => {
    const element = e.currentTarget;
    const value = element.value;

    setIsPortInvalid(!element.checkValidity());
    setPort(parseInt(value, 10));
  };

  const onSave = () => {
    if (isAddressInvalid || isPortInvalid) {
      return;
    }

    CodexSdk.updateURL(address + ":" + port)
      .then(() => queryClient.invalidateQueries())
      .then(() => codex.refetch());
  };

  let forwardingPortValue = defaultPort;

  if (codex.isSuccess && codex.data) {
    const port = DebugUtils.getTcpPort(codex.data);
    if (!port.error) {
      forwardingPortValue = port.data;
    }
  }

  return (
    <div className="health-checks">
      <div
        className={classnames(
          ["address"],
          ["address--fetching", portForwarding.isFetching || codex.isPending]
        )}>
        <div>
          <Input
            id="url"
            type="url"
            label="Address"
            required
            isInvalid={isAddressInvalid}
            onChange={onAddressChange}
            value={address}
            placeholder="127.0.0.1"></Input>
          {isAddressInvalid ? (
            <ErrorCircleIcon />
          ) : (
            <SuccessCheckIcon variant="default" />
          )}
        </div>

        <div>
          <Input
            id="port"
            label="Port"
            type="number"
            onChange={onPortChange}
            value={port}
            isInvalid={isPortInvalid}
            placeholder="8080"></Input>
          <SuccessCheckIcon variant="default"></SuccessCheckIcon>
        </div>

        <div className="refresh">
          <RefreshIcon onClick={onSave}></RefreshIcon>
        </div>
      </div>

      <p>
        <li>
          Port forwarding should be {forwardingPortValue} for TCP and 8090 by
          default for UDP.
        </li>
      </p>

      <ul>
        <li>
          <span>
            <HealthCheckIcon />
          </span>
          Health Check
        </li>
        <li>
          <span>
            {online ? (
              <SuccessCheckIcon variant="primary"></SuccessCheckIcon>
            ) : (
              <ErrorCircleIcon />
            )}
          </span>
          Internet connection
        </li>
        <li>
          <span>
            {portForwarding.enabled ? (
              <SuccessCheckIcon variant="primary"></SuccessCheckIcon>
            ) : (
              <ErrorCircleIcon />
            )}
          </span>
          Port forwarding
        </li>
        <li>
          <span>
            {codex.isSuccess ? (
              <SuccessCheckIcon variant="primary"></SuccessCheckIcon>
            ) : (
              <ErrorCircleIcon />
            )}
          </span>
          Codex connection
        </li>
        <li>
          <span>
            {persistence.enabled ? (
              <SuccessCheckIcon variant="primary"></SuccessCheckIcon>
            ) : (
              <WarningIcon />
            )}
          </span>
          Marketplace
        </li>
      </ul>
    </div>
  );
}

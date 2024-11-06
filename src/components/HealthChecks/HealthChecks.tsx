import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDebug } from "../../hooks/useDebug";
import { usePersistence } from "../../hooks/usePersistence";
import { usePortForwarding } from "../../hooks/usePortForwarding";
import { ErrorCircleIcon } from "../ErrorCircleIcon/ErrorCircleIcon";
import { SuccessCheckIcon } from "../SuccessCheckIcon/SuccessCheckIcon";
import { WarningIcon } from "../WarningIcon/WarningIcon";
import { HealthCheckIcon } from "./HealthCheckIcon";
import { Input } from "@codex-storage/marketplace-ui-components";
import { classnames } from "../../utils/classnames";
import { RefreshIcon } from "../RefreshIcon/RefreshIcon";
import "./HealthChecks.css";
import { CodexSdk } from "../../sdk/codex";
import { HealthCheckUtil } from "./health-check.utils";
import { PortForwardingUtil } from "../../hooks/port-forwarding.util";

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
    HealthCheckUtil.removePort(CodexSdk.url())
  );
  const [port, setPort] = useState(HealthCheckUtil.getPort(CodexSdk.url()));
  const queryClient = useQueryClient();

  useEffect(
    () => {
      if (codex.isSuccess) {
        persistence.refetch();
        portForwarding.refetch().then(({ data }) => {
          onStepValid(data?.reachable || false);
        });
      } else {
        onStepValid(false);
      }
    },
    // We really do not want to add persistence and portForwarding as
    // dependencies because it will cause a re-render every time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [persistence.refetch, onStepValid, portForwarding.refetch, codex.isSuccess]
  );

  const onAddressChange = (e: React.FormEvent<HTMLInputElement>) => {
    const element = e.currentTarget;
    const value = e.currentTarget.value;

    setIsAddressInvalid(!element.checkValidity());

    const address = HealthCheckUtil.removePort(value);
    setAddress(address);

    if (HealthCheckUtil.containsPort(value)) {
      const p = HealthCheckUtil.getPort(value);
      setPort(p);
    }
  };

  const onPortChange = (e: React.FormEvent<HTMLInputElement>) => {
    const element = e.currentTarget;
    const value = element.value;

    setIsPortInvalid(!element.checkValidity());
    setPort(parseInt(value, 10));
  };

  const onSave = () => {
    const url = address + ":" + port;

    if (HealthCheckUtil.isUrlInvalid(url)) {
      return;
    }

    CodexSdk.updateURL(url)
      .then(() => queryClient.invalidateQueries())
      .then(() => codex.refetch());
  };

  let forwardingPortValue = defaultPort;

  if (codex.isSuccess && codex.data) {
    const port = PortForwardingUtil.getTcpPort(codex.data);
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
          <RefreshIcon
            onClick={onSave}
            disabled={isAddressInvalid || isPortInvalid}></RefreshIcon>
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

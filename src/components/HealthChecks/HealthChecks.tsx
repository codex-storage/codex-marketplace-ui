import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDebug } from "../../hooks/useDebug";
import { usePersistence } from "../../hooks/usePersistence";
import { usePortForwarding } from "../../hooks/usePortForwarding";
import { Input, Spinner } from "@codex-storage/marketplace-ui-components";
import { classnames } from "../../utils/classnames";
import "./HealthChecks.css";
import { CodexSdk } from "../../sdk/codex";
import { HealthCheckUtils } from "./health-check.utils";
import { PortForwardingUtil } from "../../hooks/port-forwarding.util";
import SuccessCircleIcon from "../../assets/icons/success-circle.svg?react";
import ErrorCircleIcon from "../../assets/icons/error-circle.svg?react";
import DeviceIcon from "../../assets/icons/device.svg?react";
import RefreshIcon from "../../assets/icons/refresh.svg?react";
import WarningIcon from "../../assets/icons/warning-circle.svg?react";

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
    HealthCheckUtils.removePort(CodexSdk.url())
  );
  const [port, setPort] = useState(HealthCheckUtils.getPort(CodexSdk.url()));
  const queryClient = useQueryClient();

  useEffect(
    () => {
      persistence.refetch();
      portForwarding.refetch();

      onStepValid(codex.isSuccess);
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

    setAddress(value);

    if (HealthCheckUtils.containsPort(value)) {
      const address = HealthCheckUtils.removePort(value);
      setAddress(address);

      const p = HealthCheckUtils.getPort(value);
      setPort(p);
    } else {
      setAddress(value);
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

    if (HealthCheckUtils.isUrlInvalid(url)) {
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
            <ErrorCircleIcon width={16} />
          ) : (
            <SuccessCircleIcon width={20} />
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
          <SuccessCircleIcon width={20}></SuccessCircleIcon>
        </div>

        <div className="refresh">
          <RefreshIcon
            color={isAddressInvalid || isPortInvalid ? "#494949" : "#6FCB94"}
            onClick={onSave}></RefreshIcon>
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
            <DeviceIcon color="#6FCB94" />
          </span>
          Health Check
        </li>
        <li>
          <span>
            {online ? (
              <SuccessCircleIcon width={16} height={16}></SuccessCircleIcon>
            ) : (
              <ErrorCircleIcon width={16} height={16} />
            )}
          </span>
          Internet connection
        </li>
        <li>
          <span>
            {codex.isFetching ? (
              <Spinner></Spinner>
            ) : codex.isSuccess ? (
              <SuccessCircleIcon width={16} height={16}></SuccessCircleIcon>
            ) : (
              <ErrorCircleIcon width={16} height={16} />
            )}
          </span>
          Codex connection
        </li>
        <li>
          <span>
            {portForwarding.isFetching ? (
              <Spinner></Spinner>
            ) : portForwarding.enabled ? (
              <SuccessCircleIcon width={16} height={16}></SuccessCircleIcon>
            ) : (
              <WarningIcon width={16} height={16} />
            )}
          </span>
          Port forwarding
        </li>
        <li>
          <span>
            {persistence.isFetching ? (
              <Spinner></Spinner>
            ) : persistence.enabled ? (
              <SuccessCircleIcon width={16} height={16}></SuccessCircleIcon>
            ) : (
              <WarningIcon width={16} height={16} />
            )}
          </span>
          Marketplace
        </li>
      </ul>
    </div>
  );
}

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, ClipboardEvent } from "react";
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
import { Strings } from "../../utils/strings";
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
  const [isInvalid, setIsInvalid] = useState(false);
  const [url, setUrl] = useState(CodexSdk.url);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (codex.isSuccess) {
      persistence.refetch();
      portForwarding.refetch().then(({ isError }) => onStepValid(isError));
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
    const [, port] = Strings.splitURLAndPort(url);
    const element = e.currentTarget;
    const value = e.currentTarget.value;

    if (
      value.startsWith("http://") === false &&
      value.startsWith("https://") === false
    ) {
      setIsInvalid(true);
      return;
    }

    setIsInvalid(!element.checkValidity());
    setUrl(value + ":" + port);
  };

  const onPaste = (e: ClipboardEvent) => {
    const text = e.clipboardData?.getData("text") || "";

    try {
      new URL(text);
      setUrl(text);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      // Nothing to do here
    }
  };

  const onPortChange = (e: React.FormEvent<HTMLInputElement>) => {
    const [address] = Strings.splitURLAndPort(url);
    const element = e.currentTarget;
    const value = element.value;

    setUrl(address + ":" + value);
  };

  const onSave = () => {
    if (isInvalid === true) {
      return;
    }

    CodexSdk.updateURL(url)
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
  const [address, port] = Strings.splitURLAndPort(url);

  return (
    <>
      <div
        className={classnames(
          ["address"],
          ["address--fetching", portForwarding.isFetching || codex.isPending]
        )}>
        <div>
          <Input
            onPaste={onPaste}
            id="url"
            type="url"
            label="Address"
            isInvalid={isInvalid}
            onChange={onAddressChange}
            value={address}
            placeholder="127.0.0.1"></Input>
          {isInvalid ? (
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
            placeholder="8080"></Input>
          <SuccessCheckIcon variant="default"></SuccessCheckIcon>
        </div>

        <div className="refresh">
          <RefreshIcon onClick={onSave}></RefreshIcon>
        </div>
      </div>

      <ul className="helper">
        <li>Port forwarding should be default {forwardingPortValue}.</li>
      </ul>

      <ul className="health-checks">
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
    </>
  );
}

import { classnames } from "../../utils/classnames";
import "./OnBoardingStepThree.css";
import { usePortForwarding } from "../../hooks/usePortForwarding";
import { Input, SimpleText } from "@codex-storage/marketplace-ui-components";
import { ClipboardEvent, useEffect, useState } from "react";
import { CodexSdk } from "../../sdk/codex";
import { useQueryClient } from "@tanstack/react-query";
import { usePersistence } from "../../hooks/usePersistence";
import { useDebug } from "../../hooks/useDebug";
import { DebugUtils } from "../../utils/debug";
import { AlphaIcon } from "./AlphaIcon";
import { OnBoardingUtils } from "../../utils/onboarding";
import { RefreshIcon } from "../RefreshIcon/RefreshIcon";
import { HealthCheckIcon } from "./HealthCheckIcon";
import { HealthCheckItem } from "./HealthCheckItem";
import { Strings } from "../../utils/strings";
import { SuccessCheckIcon } from "../SuccessCheckIcon/SuccessCheckIcon";
import { ErrorCircleIcon } from "../ErrorCircleIcon/ErrorCircleIcon";

type Props = {
  online: boolean;
  onStepValid: (valid: boolean) => void;
};

const throwOnError = false;
const defaultPort = 8070;

export function OnBoardingStepThree({ online, onStepValid }: Props) {
  const codex = useDebug(throwOnError);
  const portForwarding = usePortForwarding(codex.data);
  const persistence = usePersistence(codex.isSuccess);
  const [url, setUrl] = useState(CodexSdk.url);
  const queryClient = useQueryClient();
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    onStepValid(online && portForwarding.enabled && codex.isSuccess);
  }, [portForwarding.enabled, codex.isSuccess, onStepValid, online]);

  useEffect(() => {
    if (codex.isSuccess) {
      persistence.refetch();
      portForwarding.refetch();
    }
  }, [persistence, portForwarding, codex.isSuccess]);

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

    console.info("isInvalid", isInvalid);

    setIsInvalid(!element.checkValidity());
    setUrl(value + ":" + port);
  };

  const onPaste = (e: ClipboardEvent) => {
    const text = e.clipboardData.getData("text");

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

  const displayName = OnBoardingUtils.getDisplayName();
  const [address, port] = Strings.splitURLAndPort(url);

  return (
    <>
      <div className="index-column-section onboarding--deviceCheck-block">
        <div>
          <AlphaIcon variant="primary" />
        </div>
        <SimpleText variant="primary" className="onboarding-deviceCheck">
          <span>
            Connection /<br />
            Device Health Check
          </span>
        </SimpleText>
      </div>
      <div className="index-column-section">
        <h3 className="index-mainTitle onboarding-displayName">
          Nice to meet {displayName},<br />
          Let’s establish our connection.
        </h3>
        <div className="onboarding-group">
          <div className="onboarding-addressAndPort">
            <div className="onboarding-addressContainer">
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
                <ErrorCircleIcon className="onboarding--addressSuccessIcon" />
              ) : (
                <SuccessCheckIcon
                  className="onboarding--addressSuccessIcon"
                  variant="default"
                />
              )}
            </div>
            <div className="onboarding-portContainer">
              <Input
                inputClassName="onboarding-port"
                id="port"
                label="Port"
                type="number"
                onChange={onPortChange}
                value={port}
                placeholder="8080"></Input>
              <SuccessCheckIcon
                className="onboarding--addressSuccessIcon"
                variant="default"></SuccessCheckIcon>
            </div>

            <RefreshIcon
              onClick={onSave}
              className={classnames(
                ["onboarding-refresh"],
                [
                  "onboarding-refresh--fetching",
                  portForwarding.isFetching || codex.isPending,
                ]
              )}></RefreshIcon>
          </div>
        </div>

        <ul className="onboarding-portForwardingHelp">
          <li>Port forwarding should be default {forwardingPortValue}.</li>
        </ul>

        <div className="onboarding-healthChecks">
          <div className="onboarding-healthCheck-item">
            <span className="onboarding-healthCheck-icon">
              <HealthCheckIcon />
            </span>

            <span className="onboarding-healthCheck-itemText">
              Health Check
            </span>
          </div>

          <div className="onboarding-healthCheck-item">
            <HealthCheckItem
              value={online ? "success" : "failure"}
              text="Internet connection"
            />
          </div>

          <div className="onboarding-healthCheck-item">
            <HealthCheckItem
              value={portForwarding.enabled ? "success" : "failure"}
              text="Port forwarding"
            />
          </div>

          <div className="onboarding-healthCheck-item">
            <HealthCheckItem
              value={codex.isSuccess ? "success" : "failure"}
              text="Codex connection"
            />
          </div>

          <div className="onboarding-healthCheck-item">
            <HealthCheckItem
              value={codex.isSuccess ? "success" : "warning"}
              text="Marketplace"
            />
          </div>
        </div>
      </div>
    </>
  );
}

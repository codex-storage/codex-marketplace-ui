import { CheckIcon, RefreshCcw, Save, ShieldAlert, X } from "lucide-react";
import { classnames } from "../../utils/classnames";
import "./OnBoardingStepThree.css";
import { usePortForwarding } from "../../hooks/usePortForwarding";
import { useCodexConnection } from "../../hooks/useCodexConnection";
import {
  Alert,
  ButtonIcon,
  Input,
  SimpleText,
} from "@codex-storage/marketplace-ui-components";
import { useEffect, useState } from "react";
import { CodexSdk } from "../../sdk/codex";
import { useQueryClient } from "@tanstack/react-query";
import { usePersistence } from "../../hooks/usePersistence";
import { useDebug } from "../../hooks/useDebug";
import { DebugUtils } from "../../utils/debug";

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

  useEffect(() => {
    onStepValid(online && portForwarding.enabled && codex.isSuccess);
  }, [portForwarding.enabled, codex.isSuccess, onStepValid, online]);

  useEffect(() => {
    if (codex.isSuccess) {
      persistence.refetch();
    }
  }, [codex.isSuccess]);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (value) {
      setUrl(value);
    }
  };

  const onSave = () =>
    CodexSdk.updateURL(url)
      .then(() => queryClient.invalidateQueries())
      .then(() => codex.refetch());

  const InternetIcon = online ? CheckIcon : X;
  const PortForWarningIcon = portForwarding.enabled ? CheckIcon : X;
  const CodexIcon = codex.isSuccess ? CheckIcon : X;
  const PersistenceIcon = persistence.enabled ? CheckIcon : ShieldAlert;

  let hasPortForwarningWarning = false;
  let portValue = 0;

  if (codex.isSuccess && codex.data) {
    const port = DebugUtils.getTcpPort(codex.data);
    if (port.error === false && port.data !== defaultPort) {
      hasPortForwarningWarning = true;
    }
    if (!port.error) {
      portValue = port.data;
    }
  }

  return (
    <div className="index-column-section">
      <div className="onboarding-group">
        <div>
          <Input
            id="url"
            label="Codex client node URL"
            onChange={onChange}
            value={url}
            inputClassName="settings-input"></Input>
        </div>

        <ButtonIcon Icon={Save} onClick={onSave}></ButtonIcon>
      </div>
      <div
        data-testid="network"
        className={classnames(
          ["onboarding-check"],
          ["onboarding-check--valid", online]
        )}>
        <InternetIcon
          className={classnames(
            ["onboarding-check-icon--valid", online],
            ["onboarding-check-icon--invalid", !online]
          )}
        />
        <div>
          <p>Internet connection</p>
          <SimpleText variant="light">
            Status indicator for the Internet.
          </SimpleText>
        </div>
      </div>
      <div
        className={classnames(
          ["onboarding-check"],
          ["onboarding-check--valid", portForwarding.enabled]
        )}>
        <PortForWarningIcon
          className={classnames(
            ["onboarding-check-icon--valid", portForwarding.enabled],
            ["onboarding-check-icon--invalid", !portForwarding.enabled]
          )}
        />
        <div className="onboarding-check-line">
          <div>
            <p>Port forwarding</p>
            <SimpleText variant="light">
              Status indicator for port forwarding activation.
            </SimpleText>
            {portValue && (
              <>
                <br />
                <SimpleText variant="light">
                  TCP Port detected: {portValue}.
                </SimpleText>
              </>
            )}
          </div>
          {!portForwarding.enabled && (
            <a
              className="onboarding-check-refresh"
              onClick={() => portForwarding.refetch()}>
              <RefreshCcw
                size={"1.25rem"}
                className={classnames([
                  "onboarding-check-refresh--fetching",
                  portForwarding.isFetching,
                ])}
              />
            </a>
          )}
        </div>
      </div>
      <p>Codex</p>
      <div className="onboarding-codex">
        <div
          className={classnames(
            ["onboarding-check"],
            ["onboarding-check--valid", codex.isSuccess]
          )}>
          <CodexIcon
            className={classnames(
              ["onboarding-check-icon--valid", codex.isSuccess],
              ["onboarding-check-icon--invalid", !codex.isSuccess]
            )}
          />
          <div className="onboarding-check-line">
            <div>
              <p>Codex connection</p>
              <SimpleText variant="light">
                Status indicator for the Codex network.
              </SimpleText>
            </div>
            {!persistence.enabled && (
              <a
                className="onboarding-check-refresh"
                onClick={() => persistence.refetch()}>
                <RefreshCcw
                  size={"1.25rem"}
                  className={classnames([
                    "onboarding-check-refresh--fetching",
                    persistence.isFetching,
                  ])}
                />
              </a>
            )}
          </div>
        </div>
        <div
          className={classnames(
            ["onboarding-check"],
            ["onboarding-check--valid", persistence.enabled]
          )}>
          <PersistenceIcon
            className={classnames(
              ["onboarding-check-icon--valid", persistence.enabled],
              ["onboarding-check-icon--warning", !persistence.enabled]
            )}
          />
          <div className="onboarding-check-line">
            <div>
              <p>Marketplace</p>
              <SimpleText variant="light">
                Status indicator for the marketplace on the Codex node.
              </SimpleText>
            </div>
          </div>
        </div>
      </div>

      {hasPortForwarningWarning && (
        <Alert variant="warning" title="Warning">
          <span>
            It seems like you are using a different port than the default one (
            {defaultPort}). Be sure the port forwarning is enabled for the port
            you are running.
          </span>
        </Alert>
      )}
    </div>
  );
}

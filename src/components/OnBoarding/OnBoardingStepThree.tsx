import { CheckIcon, RefreshCcw, X } from "lucide-react";
import { classnames } from "../../utils/classnames";
import "./OnBoardingStepThree.css";
import { usePortForwarding } from "../../hooks/usePortForwarding";
import { useCodexConnection } from "../../hooks/useCodexConnection";
import { SimpleText } from "@codex-storage/marketplace-ui-components";
import { useEffect } from "react";

type Props = {
  online: boolean;
  onStepValid: (valid: boolean) => void;
};

export function OnBoardingStepThree({ online, onStepValid }: Props) {
  const portForwarding = usePortForwarding(online);
  const codex = useCodexConnection();

  useEffect(() => {
    onStepValid(online && portForwarding.enabled && codex.enabled);
  }, [portForwarding.enabled, codex.enabled, onStepValid, online]);

  const InternetIcon = online ? CheckIcon : X;
  const PortForWarningIcon = portForwarding.enabled ? CheckIcon : X;
  const CodexIcon = codex.enabled ? CheckIcon : X;

  return (
    <div className="index-column-section">
      <div
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
      <div
        className={classnames(
          ["onboarding-check"],
          ["onboarding-check--valid", codex.enabled]
        )}>
        <CodexIcon
          className={classnames(
            ["onboarding-check-icon--valid", codex.enabled],
            ["onboarding-check-icon--invalid", !codex.enabled]
          )}
        />
        <div className="onboarding-check-line">
          <div>
            <p>Codex connection</p>
            <SimpleText variant="light">
              Status indicator for the Codex network.
            </SimpleText>
          </div>
          {!codex.enabled && (
            <a
              className="onboarding-check-refresh"
              onClick={() => codex.refetch()}>
              <RefreshCcw
                size={"1.25rem"}
                className={classnames([
                  "onboarding-check-refresh--fetching",
                  codex.isFetching,
                ])}
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

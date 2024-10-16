import { createFileRoute } from "@tanstack/react-router";
import "./index.css";
import { AlphaIcon } from "../components/AlphaIcon/AlphaIcon";
import { AlphaText } from "../components/AlphaText/AlphaText";
import { SimpleText } from "@codex-storage/marketplace-ui-components";
import { ArrowRight } from "lucide-react";
import { CodexLogo } from "../components/CodexLogo/CodexLogo";
import { ArrowRightCircle } from "../components/ArrowRightCircle/ArrowRightCircle";
import { useNetwork } from "../network/useNetwork";
import { NetworkIcon } from "../components/NetworkIcon/NetworkIcon";
import { Logotype } from "../components/Logotype/Logotype";

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: async () => {
    // throw redirect({
    //   to: "/dashboard",
    // });
  },
});

function Index() {
  const online = useNetwork();

  const text = online ? "Network connected" : "Network disconnected";

  return (
    <div className="index">
      <div className="index-container">
        <div className="index-column">
          <div className="index-column-section">
            <Logotype />
          </div>

          <div className="index-column-section">
            <div>
              <AlphaIcon />
            </div>
            <div className="index-alphaText">
              <p>
                <AlphaText></AlphaText>
              </p>
              <p>
                <SimpleText className="index-version" variant="normal">
                  {import.meta.env.PACKAGE_VERSION}
                </SimpleText>
              </p>
              <p>
                <SimpleText className="index-disclaimer" variant="error">
                  <a className="index-link">Legal Disclaimer</a>
                </SimpleText>
              </p>
            </div>
          </div>
          <div className="index-column-section">
            <h3 className="index-mainTitle">
              Hello,
              <br /> Welcome to <span className="index-codex">Codex</span>{" "}
              <span className="index-vault">Vault</span>
            </h3>
            <p className="index-description">
              <SimpleText variant="light">
                Codex is a durable, decentralised data storage protocol, created
                so the world community can preserve its most important knowledge
                without risk of censorship.
              </SimpleText>
            </p>
          </div>
          <div className="index-column-section ">
            <SimpleText variant="primary">
              <a href="/dashboard" className="index-link index-getStarted">
                Let’s get started <ArrowRight></ArrowRight>
              </a>
            </SimpleText>

            <div className="index-dots">
              <span className="index-dot index-dot--active"></span>
              <span className="index-dot"></span>
              <span className="index-dot"></span>
            </div>
          </div>
        </div>
        <div className="index-columnRight">
          <div className="index-logo">
            <div className="index-network">
              <p className="index-network-text">{text}</p>
              <NetworkIcon></NetworkIcon>
            </div>
            <CodexLogo></CodexLogo>
          </div>
          <a href="/dashboard" className="index-link2">
            <ArrowRightCircle></ArrowRightCircle>
          </a>
        </div>
      </div>
    </div>
  );
}

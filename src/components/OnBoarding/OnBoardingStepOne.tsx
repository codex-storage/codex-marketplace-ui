import { AlphaIcon } from "./AlphaIcon";
import { AlphaText } from "../AlphaText/AlphaText";
import { Modal, SimpleText } from "@codex-storage/marketplace-ui-components";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

type Props = {
  onNextStep: () => void;
};

export function OnBoardingStepOne({ onNextStep }: Props) {
  const [modal, setModal] = useState(false);

  const onLegalDisclaimerOpen = () => setModal(true);

  const onLegalDisclaimerClose = () => setModal(false);

  return (
    <>
      <div className="index-column-section">
        <div>
          <AlphaIcon variant="error" />
        </div>
        <div className="index-alphaText">
          <p>
            <AlphaText variant="default"></AlphaText>
          </p>
          <p>
            <SimpleText className="index-version" variant="normal">
              {import.meta.env.PACKAGE_VERSION}
            </SimpleText>
          </p>
          <p>
            <SimpleText
              className="index-disclaimer"
              variant="error"
              onClick={onLegalDisclaimerOpen}>
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
            Codex is a durable, decentralised data storage protocol, created so
            the world community can preserve its most important knowledge
            without risk of censorship.
          </SimpleText>
        </p>
      </div>
      <div className="index-column-section ">
        <SimpleText variant="primary">
          <a onClick={onNextStep} className="index-link index-getStarted">
            Let’s get started <ArrowRight></ArrowRight>
          </a>
        </SimpleText>

        <Modal onClose={onLegalDisclaimerClose} open={modal}>
          <h1 className="disclaimer-title" style={{ marginTop: 0 }}>
            Disclaimer
          </h1>

          <p className="disclaimer-text">
            The website and the content herein is not intended for public use
            and is for informational and demonstration purposes only.
          </p>

          <br />

          <p className="disclaimer-text">
            The website and any associated functionalities are provided on an
            “as is” basis without any guarantees, warranties, or representations
            of any kind, either express or implied. The website and any
            associated functionalities may not reflect the final version of the
            project and is subject to changes, updates, or removal at any time
            and without notice.
          </p>

          <br />

          <p className="disclaimer-text">
            By accessing and using this website, you agree that we, Logos
            Collective Association and its affiliates, will not be liable for
            any direct, indirect, incidental, or consequential damages arising
            from the use of, or inability to use, this website. Any data,
            content, or interactions on this site are non-binding and should not
            be considered final or actionable. Your use of this website is at
            your sole risk.
          </p>
        </Modal>
      </div>
    </>
  );
}

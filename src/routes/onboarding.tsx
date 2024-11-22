import { useState } from "react";
import { Modal } from "@codex-storage/marketplace-ui-components";
import { OnBoardingLayout } from "../components/OnBoarding/OnBoardingLayout";
import AlphaIcon from "../assets/icons/alpha.svg?react";
import AlphaText from "../assets/icons/alphatext.svg?react";
import ArrowCircleIcon from "../assets/icons/arrow-circle.svg?react";
import { useNavigate } from "react-router-dom";

export function OnBoardingRoute() {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const onLegalDisclaimerOpen = () => setModal(true);

  const onLegalDisclaimerClose = () => setModal(false);

  const onNextStep = () => navigate("/onboarding-name");

  return (
    <>
      <OnBoardingLayout defaultIsStepValid={false} step={0}>
        <>
          <section className="alpha">
            <AlphaIcon color="var(--codex-color-error-hexa)" width={26} />
            <div>
              <AlphaText
                color="rgba(255, 255, 255, 0.6)"
                width={72}></AlphaText>
              <b>{import.meta.env.PACKAGE_VERSION}</b>
              <a onClick={onLegalDisclaimerOpen}>Legal Disclaimer</a>
            </div>
          </section>
          <section className="main">
            <h1>
              Hello,
              <br /> Welcome to <b>Codex</b> <b>Vault</b>
            </h1>
            <p>
              Codex is a durable, decentralised data storage protocol, created
              so the world community can preserve its most important knowledge
              without risk of censorship.
            </p>
          </section>
          <section className="get-started">
            <a onClick={onNextStep}>Let’s get started →</a>

            <Modal
              onClose={onLegalDisclaimerClose}
              open={modal}
              className="disclaimer">
              <h1>Disclaimer</h1>

              <p>
                The website and the content herein is not intended for public
                use and is for informational and demonstration purposes only.
              </p>

              <br />

              <p>
                The website and any associated functionalities are provided on
                an “as is” basis without any guarantees, warranties, or
                representations of any kind, either express or implied. The
                website and any associated functionalities may not reflect the
                final version of the project and is subject to changes, updates,
                or removal at any time and without notice.
              </p>

              <br />

              <p>
                By accessing and using this website, you agree that we, Logos
                Collective Association and its affiliates, will not be liable
                for any direct, indirect, incidental, or consequential damages
                arising from the use of, or inability to use, this website. Any
                data, content, or interactions on this site are non-binding and
                should not be considered final or actionable. Your use of this
                website is at your sole risk.
              </p>
            </Modal>
          </section>
          <a className="navigation" onClick={onNextStep}>
            <ArrowCircleIcon></ArrowCircleIcon>
          </a>
        </>
      </OnBoardingLayout>
    </>
  );
}

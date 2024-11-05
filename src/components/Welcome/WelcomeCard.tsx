import "./WelcomeCard.css";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Logo } from "../Logo/Logo";
import { Logotype } from "../Logotype/Logotype";
import { DiscordIcon } from "./DiscordIcon";
import { Alert } from "@codex-storage/marketplace-ui-components";
import { AlertIcon } from "../AlertIcon/AlertIcon";
import { useEffect, useRef } from "react";
import { classnames } from "../../utils/classnames";

export function WelcomeCard() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onResize = () => {
      const current = ref.current;
      if (!current) {
        return;
      }

      if (current.clientWidth > 800) {
        current.classList.remove("welcome-card--tiny");
      } else {
        current.classList.add("welcome-card--tiny");
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [ref.current]);

  const clientWidth = ref.current?.clientWidth || 0;

  return (
    <div
      className={classnames(
        ["welcome-card card"],
        ["welcome-card card--tiny", clientWidth <= 800]
      )}
      ref={ref}>
      <div className="card">
        <header>
          <div>
            <Logo height={48}></Logo>
            <Logotype height={48}></Logotype>
          </div>
        </header>
        <main>
          <h6>
            Begin your journey with Codex by uploading new files for testing.
          </h6>
          <p>
            Experience the power of our decentralized data storage platform and
            explore its features. Your feedback is invaluable as we continue to
            improve!
          </p>
          <div>
            <Link to="/dashboard/help" className="welcome-link">
              Learn more<ArrowRight></ArrowRight>
            </Link>
            <a href={import.meta.env.VITE_DISCORD_LINK}>
              <DiscordIcon></DiscordIcon>
              Join Codex Discord
            </a>
          </div>
        </main>
        <footer>
          <Alert variant="warning" title="Disclaimer" Icon={<AlertIcon />}>
            The website and the content herein is not intended for public use
            and is for informational and demonstration purposes only.
          </Alert>
        </footer>
      </div>
    </div>
  );
}

import "./WelcomeCard.css";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Logo } from "../Logo/Logo";
import { Logotype } from "../Logotype/Logotype";
import { DiscordIcon } from "./DiscordIcon";
import { Alert } from "@codex-storage/marketplace-ui-components";
import { AlertIcon } from "../AlertIcon/AlertIcon";

export function WelcomeCard() {
  return (
    <div className="welcome-card card">
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
            <a href="">
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

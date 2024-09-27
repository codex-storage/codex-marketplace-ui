import { Alert, SimpleText } from "@codex-storage/marketplace-ui-components";
import "./Welcome.css";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function Welcome() {
  return (
    <div className="welcome">
      <p className="welcome-title">Welcome to Codex Marketplace</p>
      <div className="welcome-body">
        <SimpleText variant="light">
          Begin your journey with Codex by uploading new files for testing.
          Experience the power of our decentralized data storage platform and
          explore its features. Your feedback is invaluable as we continue to
          improve!
        </SimpleText>
        <Alert
          variant="warning"
          title="Disclaimer"
          className="welcome-disclaimer">
          The website and the content herein is not intended for public use and
          is for informational and demonstration purposes only.
        </Alert>
      </div>

      <Link to="/dashboard/help" className="welcome-link">
        Explore more content <ChevronRight size={"1.5rem"} />
      </Link>
    </div>
  );
}

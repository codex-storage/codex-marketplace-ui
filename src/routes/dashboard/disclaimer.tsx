import { createFileRoute } from "@tanstack/react-router";
import "./disclaimer.css";

export const Route = createFileRoute("/dashboard/disclaimer")({
  component: () => (
    <div className="container">
      <div className="disclaimer">
        <h1 className="disclaimer-title">Disclaimer</h1>

        <p className="disclaimer-text">
          The website and the content herein is not intended for public use and
          is for informational and demonstration purposes only.
        </p>

        <br />

        <p className="disclaimer-text">
          The website and any associated functionalities are provided on an “as
          is” basis without any guarantees, warranties, or representations of
          any kind, either express or implied. The website and any associated
          functionalities may not reflect the final version of the project and
          is subject to changes, updates, or removal at any time and without
          notice.
        </p>

        <br />

        <p className="disclaimer-text">
          By accessing and using this website, you agree that we, Logos
          Collective Association and its affiliates, will not be liable for any
          direct, indirect, incidental, or consequential damages arising from
          the use of, or inability to use, this website. Any data, content, or
          interactions on this site are non-binding and should not be considered
          final or actionable. Your use of this website is at your sole risk.
        </p>
      </div>
    </div>
  ),
});

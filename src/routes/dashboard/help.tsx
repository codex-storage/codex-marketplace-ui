import { createFileRoute } from "@tanstack/react-router";
import "./help.css";
import { HelpCircle } from "lucide-react";

export const Route = createFileRoute("/dashboard/help")({
  component: () => (
    <div className="container">
      <div className="help">
        <h1 className="help-title">You might be wondering...</h1>

        <div className="help-item">
          <HelpCircle className="help-itemIcon" size={"1.5rem"} />
          <div className="help-itemBody">
            <p className="help-itemTitle">What's Codex?</p>
            <p className="help-text">
              Codex is a decentralised data storage platform that provides
              exceptionally strong censorship resistance and durability
              guarantees. It serves as the storage layer of the Logos tech
              stack.
            </p>
          </div>
        </div>

        <div className="help-item">
          <HelpCircle className="help-itemIcon" size={"1rem"} />
          <div className="help-itemBody">
            <p className="help-itemTitle">
              What is the purpose of this web application?
            </p>
            <p className="help-text">
              This application allows you to interact with the Codex Marketplace
              network in a user-friendly manner.
            </p>
          </div>
        </div>

        <div className="help-item">
          <HelpCircle className="help-itemIcon" size={"1rem"} />
          <div className="help-itemBody">
            <p className="help-itemTitle">Can Codex handle big files ?</p>
            <p className="help-text">
              Codex can handle very large files, which is its main purpose.
              However, for this UI, the files used should not be too large.
            </p>
          </div>
        </div>

        <div className="help-item">
          <HelpCircle className="help-itemIcon" size={"1rem"} />
          <div className="help-itemBody">
            <p className="help-itemTitle">Is it production ready ?</p>
            <p className="help-text">
              Not at all! This is a very early alpha version. You should expect
              to encounter bugs, but don't worry—feel free to reach out to us if
              you need assistance.
            </p>
          </div>
        </div>

        <div className="help-item">
          <HelpCircle className="help-itemIcon" size={"1rem"} />
          <div className="help-itemBody">
            <p className="help-itemTitle">
              How can I reach you if I am stuck ?
            </p>
            <p className="help-text">
              Please create a new issue on our GitHub repository&nbsp;
              <a
                href="https://github.com/codex-storage/codex-marketplace-ui"
                className="help-link"
                target="_blank">
                https://github.com/codex-storage/codex-marketplace-ui
              </a>
              .
            </p>
          </div>
        </div>

        <div className="help-item">
          <HelpCircle className="help-itemIcon" size={"1rem"} />
          <div className="help-itemBody">
            <p className="help-itemTitle">How can I build and run Codex ?</p>
            <p className="help-text">
              For instructions, please visit{" "}
              <a
                href="https://docs.codex.storage"
                className="help-link"
                target="_blank">
                https://docs.codex.storage
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
});

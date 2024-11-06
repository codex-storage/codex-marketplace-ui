import { createFileRoute } from "@tanstack/react-router";
import "./logs.css";
import { RequireAssitance } from "../../components/RequireAssitance/RequireAssitance";
import { LogLevel } from "../../components/LogLevel/LogLevel";
import { useDebug } from "../../hooks/useDebug";
import LogsIcon from "../../assets/icons/logs.svg?react";

const throwOnError = false;

export const Route = createFileRoute("/dashboard/logs")({
  component: () => {
    const { data } = useDebug(throwOnError);

    const { table, ...rest } = data ?? {};

    return (
      <div className="logs">
        <div className="logs-card">
          <div>
            <h5>Log level</h5>
            <small>
              Manage the type of logs being displayed on your CLI for Codex
              Node.
            </small>
            <LogLevel></LogLevel>
          </div>
          <RequireAssitance></RequireAssitance>
        </div>

        <div className="card node">
          <header>
            <div>
              <LogsIcon width={24}></LogsIcon>
              <h5>Node</h5>
            </div>
          </header>
          <main>
            <pre>{JSON.stringify(rest, null, 2)}</pre>
          </main>
        </div>
      </div>
    );
  },
});

import { CodexLogLevel } from "@codex-storage/sdk-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CodexSdk } from "../../sdk/codex";
import "./LogLevel.css";
import {
  Button,
  Select,
  Toast,
} from "@codex-storage/marketplace-ui-components";
import { Promises } from "../../utils/promises";

export function LogLevel() {
  const queryClient = useQueryClient();
  const [level, setLevel] = useState<CodexLogLevel>("DEBUG");
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (level: CodexLogLevel) =>
      CodexSdk.debug.setLogLevel(level).then((s) => Promises.rejectOnError(s)),
    onSuccess: () => {
      setToast({
        message: "The log level has been updated successfully.",
        time: Date.now(),
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["debug"] });
    },
    onError: (error) => {
      setToast({
        message: "Error when trying to update: " + error.message,
        time: Date.now(),
        variant: "error",
      });
    },
  });
  const [toast, setToast] = useState({
    time: 0,
    message: "",
    variant: "success" as "success" | "error" | "default",
  });

  function onChange(e: React.FormEvent<HTMLSelectElement>) {
    const value = e.currentTarget.value;
    if (value) {
      setLevel(value as CodexLogLevel);
    }
  }

  const onClick = () => {
    mutateAsync(level);
  };

  const levels = [
    ["DEBUG", "DEBUG"],
    ["TRACE", "TRACE"],
    ["INFO", "INFO"],
    ["NOTICE", "NOTICE"],
    ["WARN", "WARN"],
    ["ERROR", "ERROR"],
    ["FATAL", "FATAL"],
  ] satisfies [string, string][];

  return (
    <>
      <Select
        className="logLevel-select"
        id="level"
        label="Log level"
        options={levels}
        value={level}
        onChange={onChange}></Select>
      <Button
        variant="primary"
        label="Save changes"
        fetching={isPending}
        onClick={onClick}></Button>
      <Toast
        message={toast.message}
        time={toast.time}
        variant={toast.variant}
      />
    </>
  );
}

import { ErrorBoundary } from "@sentry/react";
import { createFileRoute } from "@tanstack/react-router";
import { ErrorPlaceholder } from "../../components/ErrorPlaceholder/ErrorPlaceholder";
import { useEffect } from "react";

const Device = () => {
  return (
    <ErrorBoundary
      fallback={({ error }) => (
        <ErrorPlaceholder error={error} subtitle="Cannot retrieve the data." />
      )}>
      <p> Platform : {navigator.platform}</p>
      <br></br>
      <p> Downlink : {(navigator as any).connection.downlink}</p>
      <small>
        The downlink attribute represents the effective bandwidth estimate in
        megabits per second, rounded to nearest multiple of 25 kilobits per
        second, and is based on recently observed application layer throughput
        across recently active connections, excluding connections made to
        private address space [RFC1918]. In absence of recent bandwidth
        measurement data, the attribute value is determined by the properties of
        the underlying connection technology. MDN
      </small>
      <br></br>
      <p> EffectiveType : {(navigator as any).connection.effectiveType}</p>
      <small>
        The effectiveType attribute, when getting, returns the effective
        connection type that is determined using a combination of recently
        observed rtt and downlink values.
      </small>
      <br></br>

      <p> Rtt : {(navigator as any).connection.rtt}</p>
      <small>
        The rtt attribute represents the effective round-trip time estimate in
        milliseconds, rounded to nearest multiple of 25 milliseconds, and is
        based on recently observed application-layer RTT measurements across
        recently active connections, excluding connections made to private
        address space [RFC1918]. In absence of recent RTT measurement data, the
        attribute value is determined by the properties of the underlying
        connection technology.
      </small>
      <br></br>

      <p> SaveData : {(navigator as any).connection.saveData.toString()}</p>
      <small></small>
    </ErrorBoundary>
  );
};

export const Route = createFileRoute("/dashboard/device")({
  component: Device,
});

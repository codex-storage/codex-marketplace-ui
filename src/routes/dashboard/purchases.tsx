import { createFileRoute } from "@tanstack/react-router";
import { StorageRequestCreate } from "../../components/StorageRequestSetup/StorageRequestCreate";
import "./purchases.css";
import { ErrorPlaceholder } from "../../components/ErrorPlaceholder/ErrorPlaceholder";
import { ErrorBoundary } from "@sentry/react";
import { PurchasesTable } from "../../components/Purchase/PurchasesTable";

const Purchases = () => {
  return (
    <div className="purchases">
      <div>
        <StorageRequestCreate />
      </div>

      <div className="card">
        <PurchasesTable />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/dashboard/purchases")({
  component: () => (
    <ErrorBoundary
      fallback={({ error }) => (
        <ErrorPlaceholder error={error} subtitle="Cannot retrieve the data." />
      )}>
      <Purchases />
    </ErrorBoundary>
  ),
});

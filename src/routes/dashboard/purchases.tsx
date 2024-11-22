import { StorageRequestCreate } from "../../components/StorageRequestSetup/StorageRequestCreate";
import "./purchases.css";
import { ErrorPlaceholder } from "../../components/ErrorPlaceholder/ErrorPlaceholder";
import { ErrorBoundary } from "@sentry/react";
import { PurchasesTable } from "../../components/Purchase/PurchasesTable";

export const PurchasesRoute = () => {
  return (
    <ErrorBoundary
      fallback={({ error }) => (
        <ErrorPlaceholder error={error} subtitle="Cannot retrieve the data." />
      )}>
      <div className="purchases">
        <div>
          <StorageRequestCreate />
        </div>

        <div className="card">
          <PurchasesTable />
        </div>
      </div>
    </ErrorBoundary>
  );
};

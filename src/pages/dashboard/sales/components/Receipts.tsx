import { DataTable } from "@/components/data-table/data-table";
import { useGetAllReceipts } from "@/pages/dashboard/sales/api/queries";
import { useCallback, useState } from "react";
import { getReceiptsColumns } from "../receipts-columns";
import { Receipt } from "@/pages/dashboard/sales/receipts.types";
import ReceiptsFilters from "./ReceiptsFilters";

const Receipts = () => {
  const { receipts, isLoading } = useGetAllReceipts();

  const [_, setSelectedReceipt] = useState<Receipt | null>(null);

  const receiptColumns = useCallback(
    () => getReceiptsColumns(setSelectedReceipt),
    [setSelectedReceipt],
  );

  return (
    <>
      <div className="mt-10">
        <ReceiptsFilters />
        <DataTable
          columns={receiptColumns()}
          data={receipts || []}
          isLoading={isLoading}
          configuration={{
            manualFiltering: true,
          }}
        />
      </div>
    </>
  );
};

export default Receipts;

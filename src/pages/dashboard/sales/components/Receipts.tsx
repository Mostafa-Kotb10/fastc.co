import { DataTable } from "@/components/data-table/data-table";
import { useGetAllReceipts } from "@/pages/dashboard/sales/api/queries";
import { columns } from "../receipts-columns";
import ReceiptsFilters from "./ReceiptsFilters";
import { useSearchParams } from "react-router-dom";
import { CustomPagination } from "@/components/data-table/data-pagination";

const Receipts = () => {
  const [searchParams] = useSearchParams();

  const cashier_id = searchParams.get("cashier_id")
    ? Number(searchParams.get("cashier_id"))
    : undefined;

  const drug_id = searchParams.get("drug_id")
    ? Number(searchParams.get("drug_id"))
    : undefined;

  const pharmacy_id = searchParams.get("pharmacy_id")
    ? Number(searchParams.get("pharmacy_id"))
    : undefined;

  const shift_id = searchParams.get("shift_id")
    ? Number(searchParams.get("shift_id"))
    : undefined;

  const status = searchParams.get("status") || "";

  const from_date = searchParams.get("from_date") ?? undefined;

  const to_date = searchParams.get("to_date") ?? undefined;

  const { receipts, isLoading, isLast } = useGetAllReceipts({
    cashier_id,
    drug_id,
    from_date,
    pharmacy_id,
    shift_id,
    to_date,
    status,
  });

  return (
    <>
      <div className="mt-10">
        <ReceiptsFilters />
        <DataTable
          columns={columns}
          data={receipts || []}
          isLoading={isLoading}
          configuration={{
            manualFiltering: true,
          }}
        />
        <CustomPagination className="mt-4" isLast={isLast} />
      </div>
    </>
  );
};

export default Receipts;

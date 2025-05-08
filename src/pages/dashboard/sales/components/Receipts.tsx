import { DataTable } from "@/components/data-table/data-table";
import { useGetAllReceipts } from "@/pages/dashboard/sales/api/queries";
import { columns } from "../receipts-columns";
import ReceiptsFilters from "./ReceiptsFilters";
import { useSearchParams } from "react-router-dom";

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

  const status = searchParams.get("status") || ""; // Default to an empty string if not found

  const from_date = searchParams.get("from_date") ?? undefined;

  const to_date = searchParams.get("to_date") ?? undefined;

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 0; // Default value 0 if not found

  const size = searchParams.get("size") ? Number(searchParams.get("size")) : 10; // Default value 10 if not found

  console.log(shift_id);

  const { receipts, isLoading } = useGetAllReceipts({
    cashier_id,
    drug_id,
    from_date,
    page,
    pharmacy_id,
    shift_id,
    size,
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
      </div>
    </>
  );
};

export default Receipts;

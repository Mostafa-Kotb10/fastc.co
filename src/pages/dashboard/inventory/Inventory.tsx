import { DataTable } from "../../../components/data-table/data-table";
import { testColumns } from "./columns";

import { useSearchPharmacyDrugs } from "@/services/pharmacy/queries";
import { useParams, useSearchParams } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";

const Inventory = () => {
  const { pharmacyId } = useParams(); 
  const [params] = useSearchParams();

  const search = params.get("search") || "";
  const filter = params.get("filter") as
    | "AVAILABLE"
    | "SHORTAGE"
    | "UNAVAILABLE_SHORTAGE"
    | "UNAVAILABLE"
    | undefined;

  const page = Number(params.get("page")) || 0;
  const size = Number(params.get("size")) || 75;

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, isError } = useSearchPharmacyDrugs({
    pharmacyId: Number(pharmacyId),
    query: debouncedSearch,
    filter,
    page,
    size,
  });

  return (
    <>
      <h1 className="mt-10 text-4xl font-bold">Inventory</h1>
      <div className="mt-10">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error fetching data.</p>
        ) : (
          <DataTable columns={testColumns} data={data || []} />
        )}
      </div>
    </>
  );
};

export default Inventory;

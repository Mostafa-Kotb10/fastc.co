import { DataTable } from "../../../components/data-table/data-table";
import { columns } from "./columns";

import { useSearchPharmacyDrugs } from "@/services/pharmacy/queries";
import { useParams, useSearchParams } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";
import {
  SearchInput,
  SelectFilter,
} from "@/components/data-table/data-filters";

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

  const { data, isPending } = useSearchPharmacyDrugs({
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
        <div className="flex justify-between">
          <SearchInput className="mb-3 max-w-[30rem]" />
          <div className="flex gap-2">
            <SelectFilter
              filters={[
                { name: "Available", value: "AVAILABLE" },
                { name: "Shortage", value: "SHORTAGE" },
                {
                  name: "Unavailable (Shortage)",
                  value: "UNAVAILABLE_SHORTAGE",
                },
                { name: "Unavailable", value: "UNAVAILABLE" },
              ]}
              label="Select Filter"
            />
          </div>
        </div>

        <DataTable
          columns={columns}
          data={data || []}
          isLoading={isPending}
          configuration={{
            manualFiltering: true,
          }}
        />
      </div>
    </>
  );
};

export default Inventory;

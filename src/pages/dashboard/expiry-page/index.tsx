import {
  SearchInput,
  SelectFilter,
} from "@/components/data-table/data-filters";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./columns";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSearchPharmacy } from "../pharmacy/api/api";

const ExpiryPage = () => {
  const { pharmacyId } = useParams<{ pharmacyId: string }>();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const filter = searchParams.get("filter") ?? "EXPIRED";
  const page = Number(searchParams.get("page") ?? 0);
  const size = Number(searchParams.get("size") ?? 75);

  const { data: drugs, isPending: isLoadingDrugs } = useQuery({
    queryKey: ["expiry-drugs", pharmacyId, filter, page, size, search],
    queryFn: () =>
      getSearchPharmacy({
        pharmacyId: Number(pharmacyId),
        query: search,
        filter,
        page,
        size,
      }),
    enabled: !!pharmacyId,
  });

  return (
    <>
      <h1 className="mt-10 text-4xl font-bold">Expiry Page</h1>
      <div className="mt-10">
        <div className="flex justify-between">
          <SearchInput className="mb-3 max-w-[30rem]" />
          <div className="flex gap-2">
            <SelectFilter
              filters={[
                { name: "Not expired", value: "NOT_EXPIRED" },
                { name: "Expired", value: "EXPIRED" },
                { name: "Near Expiry", value: "APPROACHING_EXPIRY" },
              ]}
              label="Select Filter"
            />
          </div>
        </div>
        <DataTable
          data={drugs || []}
          columns={columns}
          isLoading={isLoadingDrugs}
        />
      </div>
    </>
  );
};

export default ExpiryPage;

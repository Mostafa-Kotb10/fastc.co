import {
  SearchInput,
  SelectFilter,
} from "@/components/data-table/data-filters";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./columns";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSearchPharmacy } from "../pharmacy/api/api";
import { CustomPagination } from "@/components/data-table/data-pagination";
import { useEffect } from "react";
import { queryClient } from "@/queryClient";
import { usePaginatedQuery } from "./api/queries";

const ExpiryPage = () => {

  const {} = usePaginatedQuery({
    queryKey: ["expiry-data"]
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
        <CustomPagination className="mt-3" />
      </div>
    </>
  );
};

export default ExpiryPage;

import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./columns";
import { useParams, useSearchParams } from "react-router-dom";

import {
  SearchInput,
  SelectFilter,
} from "@/components/data-table/data-filters";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSearchPharmacy } from "../pharmacy/api/api";
import { CustomPagination } from "@/components/data-table/data-pagination";
import { useEffect } from "react";

const Inventory = () => {
  const { pharmacyId } = useParams<{ pharmacyId: string }>();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const search = searchParams.get("search") || "";
  const filter = searchParams.get("filter") || "";
  const page = Number(searchParams.get("page") || 0);
  const size = Number(searchParams.get("size") || 10);

  const enabled = !!pharmacyId;
  const numericPharmacyId = Number(pharmacyId);

  const queryKey = ["stock", numericPharmacyId, filter, search, page, size];

  const { data: stock, isPending: isLoadingStock } = useQuery({
    queryKey,
    queryFn: () =>
      getSearchPharmacy({
        pharmacyId: numericPharmacyId,
        query: search,
        filter,
        page,
        size,
      }),
    enabled,
    staleTime: 1000 * 60 * 5,
  });

  const isLast = !stock || stock.length < size;

  useEffect(() => {
    if (enabled && !isLast) {
      const nextPageKey = [
        "stock",
        numericPharmacyId,
        filter,
        search,
        page + 1,
        size,
      ];

      if (!queryClient.getQueryData(nextPageKey)) {
        queryClient.prefetchQuery({
          queryKey: nextPageKey,
          queryFn: () =>
            getSearchPharmacy({
              pharmacyId: numericPharmacyId,
              query: search,
              filter,
              page: page + 1,
              size,
            }),
          staleTime: 1000 * 60 * 5,
        });
      }
    }
  }, [page, isLast, enabled]);

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
          data={stock || []}
          isLoading={isLoadingStock}
          configuration={{
            manualFiltering: true,
          }}
        />
        
        <CustomPagination className="mt-4 self-start" isLast={isLast} />
      </div>
    </>
  );
};

export default Inventory;

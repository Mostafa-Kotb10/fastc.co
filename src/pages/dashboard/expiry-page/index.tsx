import {
  SearchInput,
  SelectFilter,
} from "@/components/data-table/data-filters";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./columns";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSearchPharmacy } from "../pharmacy/api/api";
import { CustomPagination } from "@/components/data-table/data-pagination";
import DashboardHeader from "../components/DashboardHeader";
import { useEffect } from "react";

const ExpiryPage = () => {
  const { pharmacyId } = useParams<{ pharmacyId: string }>();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

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
    staleTime: 1000 * 60 * 5,
  });

  const isLast = !drugs || drugs.length < size;

  useEffect(() => {
    if (!!pharmacyId && !isLast) {
      const nextPageKey = [
        "expiry-drugs",
        pharmacyId,
        filter,
        page + 1,
        size,
        search,
      ];

      if (!queryClient.getQueryData(nextPageKey)) {
        queryClient.prefetchQuery({
          queryKey: nextPageKey,
          queryFn: () =>
            getSearchPharmacy({
              pharmacyId: Number(pharmacyId),
              query: search,
              filter,
              page: page + 1,
              size,
            }),
          staleTime: 1000 * 60 * 5,
        });
      }
    }
  }, [page, isLast, pharmacyId, filter, search, size]);

  return (
    <>
      <DashboardHeader>Expiry Page</DashboardHeader>
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
        <CustomPagination className="mt-3" isLast={isLast} />
      </div>
    </>
  );
};

export default ExpiryPage;

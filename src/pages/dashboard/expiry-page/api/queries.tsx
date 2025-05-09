import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getSearchPharmacy } from "../../pharmacy/api/api";
import { useEffect } from "react";

export const usePrefetchExpiryPage = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { pharmacyId } = useParams<{ pharmacyId: string }>();

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

  useEffect(() => {
    if (!pharmacyId) return;

    // Prefetch next page
    queryClient.prefetchQuery({
      queryKey: ["expiry-drugs", pharmacyId, filter, page + 1, size, search],
      queryFn: () =>
        getSearchPharmacy({
          pharmacyId: Number(pharmacyId),
          query: search,
          filter,
          page: page + 1,
          size,
        }),
    });

    if (page > 0) {
      queryClient.prefetchQuery({
        queryKey: ["expiry-drugs", pharmacyId, filter, page - 1, size, search],
        queryFn: () =>
          getSearchPharmacy({
            pharmacyId: Number(pharmacyId),
            query: search,
            filter,
            page: page - 1,
            size,
          }),
      });
    }
  }, [pharmacyId, filter, search, page, size, queryClient]);

  return {
    drugs,
    isLoadingDrugs,
  };
};


type PrefetchPaginatedOptions<TParams> = {
  queryKeyBase: unknown[];
  page: number;
  size: number;
  enabled?: boolean;
  getQueryFn: (page: number) => () => Promise<any>;
  getQueryKey: (page: number) => unknown[];
  dependencies?: any[];
};

export function usePrefetchPaginated<TParams>({
  queryKeyBase,
  page,
  size,
  enabled = true,
  getQueryFn,
  getQueryKey,
  dependencies = [],
}: PrefetchPaginatedOptions<TParams>) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return;

    // Prefetch next page
    queryClient.prefetchQuery({
      queryKey: getQueryKey(page + 1),
      queryFn: getQueryFn(page + 1),
    });

    if (page > 0) {
      queryClient.prefetchQuery({
        queryKey: getQueryKey(page - 1),
        queryFn: getQueryFn(page - 1),
      });
    }
  }, [queryKeyBase, page, size, enabled, queryClient, getQueryKey, getQueryFn]);
}

  

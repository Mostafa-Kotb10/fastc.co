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

interface UsePaginatedQueryProps<T> {
  queryKey: (page: number) => any[];
  queryFn: (page: number, filters?: Record<string, any>) => Promise<T[]>;
  page: number;
  size: number;
  filters?: Record<string, any>;
  enabled?: boolean;
}

export function usePaginatedQuery<T>({
  queryKey,
  queryFn,
  page,
  size,
  filters,
  enabled = true,
}: UsePaginatedQueryProps<T>) {
  const queryClient = useQueryClient();

  const { data, isPending: isLoading } = useQuery<T[]>({
    queryKey: queryKey(page),
    queryFn: () => queryFn(page, filters),
    enabled,
  });

  const isFinalPage = !!data && data.length < size;

  useEffect(() => {
    if (!enabled || isFinalPage) return;

    queryClient.prefetchQuery({
      queryKey: queryKey(page + 1),
      queryFn: () => queryFn(page + 1, filters),
    });

    if (page > 0) {
      queryClient.prefetchQuery({
        queryKey: queryKey(page - 1),
        queryFn: () => queryFn(page - 1, filters),
      });
    }
  }, [enabled, page, size, filters, queryClient, isFinalPage, queryKey, queryFn]);

  return {
    data,
    isLoading,
    isFinalPage,
  };
}

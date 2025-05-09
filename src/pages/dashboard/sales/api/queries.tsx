import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllReceipts, getReceiptById } from "./api";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useGetReceiptById = (receiptId: number) => {
  const {
    data: receipt,
    isPending: isLoadingReceipt,
    error,
  } = useQuery({
    queryKey: ["receipt", receiptId],
    queryFn: () => getReceiptById(receiptId),
    enabled: !!receiptId,
  });

  return { receipt, isLoadingReceipt, error };
};

type GetAllReceiptsParams = {
  cashier_id?: number;
  drug_id?: number;
  pharmacy_id?: number;
  shift_id?: number;
  from_date?: string;
  to_date?: string;
  page?: number;
  size?: number;
  status?: string;
};

export const useGetAllReceipts = (params: GetAllReceiptsParams) => {
  const queryClient = useQueryClient();
  const [searchParam] = useSearchParams();

  const page = Number(searchParam.get("page")) || 0;
  const size = Number(searchParam.get("size")) || 10;

  const paginatedPrams = useMemo(
    () => ({
      ...params, page, size
    }),
    [params, page, size]
  );

  const {
    data,
    isPending: isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["receipts", paginatedPrams],
    queryFn: () => getAllReceipts(paginatedPrams),
  });

  const isLast = !data || data.length < size;

  useEffect(()=>{
    if (!isLast) {
      const nextPageParams = { ...params, page: page + 1, size };
      queryClient.prefetchQuery({
        queryKey: ["receipts", nextPageParams],
        queryFn: () => getAllReceipts(nextPageParams),
      });
    }
  },[isLast, page, params, queryClient, size])

  return {
    receipts: data || [],
    isLoading,
    isFetching,
    error,
  };
};

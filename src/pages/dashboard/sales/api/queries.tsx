import { useQuery } from "@tanstack/react-query";
import { getAllReceipts, getReceiptById } from "./api";

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
  const {
    data,
    isPending: isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["receipts", {...params}],
    queryFn: () => getAllReceipts(params),
  });

  return {
    receipts: data || [],
    isLoading,
    isFetching,
    error,
  };
};

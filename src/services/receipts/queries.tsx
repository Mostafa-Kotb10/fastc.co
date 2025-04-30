import { useQuery } from "@tanstack/react-query";
import { getReceipt } from "./api";

export const useGetReceipt = (receiptId: number) => {
  const {
    data: receipt,
    isPending: isLoadingReceipt,
    error,
  } = useQuery({
    queryKey: ["receipt", receiptId],
    queryFn: () => getReceipt(receiptId),
    enabled: !!receiptId,
  });

  return { receipt, isLoadingReceipt, error };
};

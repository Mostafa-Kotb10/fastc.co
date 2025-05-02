import { useQuery } from "@tanstack/react-query";
import { getSearchPharmacy } from "../pharmacy/api";

interface ExpiryParams {
  filter: "expired" | "near-expiry" | string;
  page?: number;
  size?: number;
  pharmacyId: number;
}

export const useExpiry = ({
  filter="",
  page = 0,
  size = 75,
  pharmacyId,
}: ExpiryParams) => {
  const {
    data: drugs,
    isPending: isLoadingDrugs,
    error,
  } = useQuery({
    queryKey: ["expiry-query", filter, page, size],
    queryFn: () => getSearchPharmacy({ pharmacyId, filter, page, size }),
    enabled: !!pharmacyId,
  });

  return {
    drugs,
    isLoadingDrugs,
    error,
  };
};



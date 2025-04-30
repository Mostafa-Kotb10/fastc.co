import { useQuery } from "@tanstack/react-query";
import { getUserPharmacies } from "../user/api";
import { getSearchPharmacy } from "./api";

export const useGetUserPharmacies = () => {
  return useQuery({
    queryKey: ["user-pharmacy"],
    queryFn: getUserPharmacies,
  });
};

interface UseSearchPharmacyDrugsProps {
  pharmacyId: number;
  query?: string;
  filter?: string;
  page?: number;
  size?: number;
}

export const useSearchPharmacyDrugs = ({
  pharmacyId,
  query,
  filter,
  page = 0,
  size = 75,
}: UseSearchPharmacyDrugsProps) => {
  return useQuery({
    queryKey: ["stock", pharmacyId, query, filter, page, size],
    queryFn: () => getSearchPharmacy({ pharmacyId, query, filter, page, size }),
    enabled: !!pharmacyId,
  });
};

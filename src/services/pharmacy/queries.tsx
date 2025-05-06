import { useQuery } from "@tanstack/react-query";
import { getUserPharmacies } from "../user/api";
import {
  getPharmacyDetails,
  getPharmacyEmployees,
  getPharmacyShifts,
  getSearchPharmacy,
} from "./api";
import { useParams } from "react-router-dom";

export const useGetUserPharmacies = () => {
  return useQuery({
    queryKey: ["pharmacies"],
    queryFn: getUserPharmacies,
  });
};

interface UseSearchPharmacyProps {
  pharmacyId: number;
  query?: string;
  filter?: string;
  page?: number;
  size?: number;
  status?: string;
}

export const useSearchPharmacyDrugs = ({
  pharmacyId,
  query,
  filter,
  page = 0,
  size = 75,
}: UseSearchPharmacyProps) => {
  return useQuery({
    queryKey: ["stock", pharmacyId, query, filter, page, size],
    queryFn: () => getSearchPharmacy({ pharmacyId, query, filter, page, size }),
    enabled: !!pharmacyId,
  });
};

export const usePharmacyEmployees = ({
  pharmacyId,
  page,
  size,
  status,
}: UseSearchPharmacyProps) => {

  const {
    data: employees,
    isPending: isLoadingEmployees,
    error,
  } = useQuery({
    queryKey: ["employees", pharmacyId, status, page, size],
    queryFn: () => getPharmacyEmployees({ pharmacyId, page, size, status }),
    enabled: !!pharmacyId,
  });

  return {
    employees,
    isLoadingEmployees,
    error,
  };
};

export const usePharmacyDetails = (pharmacyId: number) => {
  const {
    data: pharmacy,
    isPending: isLoadingPharmacy,
    error,
  } = useQuery({
    queryKey: ["pharmacy", pharmacyId],
    queryFn: () => getPharmacyDetails(pharmacyId),
  });

  return {
    pharmacy,
    isLoadingPharmacy,
    error,
  };
};

export const usePharmacyShifts = () => {
  const { pharmacyId } = useParams();

  const {
    data: shifts,
    isPending: isLoadingShifts,
    error,
  } = useQuery({
    queryKey: ["shifts", pharmacyId],
    queryFn: () => getPharmacyShifts(Number(pharmacyId)),
    enabled: !!pharmacyId,
  });

  return {
    shifts,
    isLoadingShifts,
    error,
  };
};

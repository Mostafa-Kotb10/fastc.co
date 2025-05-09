import { useQuery } from "@tanstack/react-query";
import { getUserPharmacies } from "../../../../services/user/api";
import {
  getPharmacyDetails,
  getPharmacyEmployees,
  getPharmacyShifts,
} from "./api";
import { useParams } from "react-router-dom";
import { useGetMe } from "@/services/user/queries";

export const useGetUserPharmacies = () => {
  const { user, isPending } = useGetMe();
  return useQuery({
    queryKey: ["pharmacies", user?.id],
    queryFn: getUserPharmacies,
    enabled: !!user,
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


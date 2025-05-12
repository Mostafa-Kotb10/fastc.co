import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserPharmacies } from "../../../../services/user/api";
import {
  getPharmacyDetails,
  getPharmacyEmployees,
  getPharmacyShifts,
} from "./api";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetMe } from "@/services/user/queries";
import { useEffect } from "react";

export const useGetUserPharmacies = () => {
  const { user } = useGetMe();
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
  status,
}: UseSearchPharmacyProps) => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const page = Number(searchParams.get("page")) || 0;
  const size = Number(searchParams.get("size")) || 10;

  const enabled = !!pharmacyId;

  const {
    data: employees,
    isPending: isLoadingEmployees,
    error,
  } = useQuery({
    queryKey: ["employees", pharmacyId, status, page, size],
    queryFn: () => getPharmacyEmployees({ pharmacyId, page, size, status }),
    enabled,
    staleTime: 1000 * 60 * 5,
  });

  const isLast = !employees || employees.length < size;

  useEffect(() => {
    if (!isLast && enabled) {
      queryClient.prefetchQuery({
        queryKey: ["employees", pharmacyId, status, page + 1, size],
        queryFn: () =>
          getPharmacyEmployees({ pharmacyId, page: page + 1, size, status }),
        staleTime: 1000 * 60 * 5,
      });
    }
  }, [enabled, isLast, page, pharmacyId, queryClient, size, status]);

  return {
    employees,
    isLoadingEmployees,
    error,
    isLast
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

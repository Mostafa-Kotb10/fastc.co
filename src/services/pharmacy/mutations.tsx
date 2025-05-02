import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPharmacy as createPharmacyFun,
  createPharmacyShift,
  deletePharmacy,
  deleteShift,
} from "./api";
import { Shift } from "@/types/pharmacy.types";
import { CreatePharmacyValues } from "@/validation/pharmacy-schema";
import { toast } from "sonner";

export const useCreateShift = (pharmacyId: number) => {
  const queryClient = useQueryClient();

  const {
    mutate: createShift,
    isPending: isCreatingShift,
    error,
  } = useMutation({
    mutationFn: (shift: Omit<Shift, "id">) =>
      createPharmacyShift({ pharmacyId, shift }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shifts", pharmacyId],
      });
    },
  });

  return {
    createShift,
    isCreatingShift,
    error,
  };
};

export const useCreatePharmacy = () => {
  const queryClient = useQueryClient();

  const {
    mutate: createPharmacy,
    data: pharmacy,
    isPending: isLoadingPharmacy,
    error,
  } = useMutation({
    mutationFn: (pharmacy: CreatePharmacyValues) => createPharmacyFun(pharmacy),
    onSuccess: () => {
      toast.success("Pharmacy Created Succesfully");
      queryClient.invalidateQueries({
        queryKey: ["pharmacies"],
      });
    },
    onError: () => {
      toast.error("failed to featch the pharmacy");
    },
  });

  return {
    createPharmacy,
    pharmacy,
    isLoadingPharmacy,
    error,
  };
};

export const useDeletePharmacy = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deletePharmacyMutate,
    isPending: isDeletingPharmacy,
    error,
  } = useMutation({
    mutationFn: (pharmacyId: number) => deletePharmacy(pharmacyId),
    onSuccess: () => {
      console.log("successfully deleted");
      toast.success("Pharmacy deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["pharmacies"],
      });
    },
    onError: () => {
      toast.error("Failed to delete the pharmacy");
    },
  });

  return {
    deletePharmacy: deletePharmacyMutate,
    isDeletingPharmacy,
    error,
  };
};

import { useParams } from "react-router-dom";

export const useDeleteShift = () => {
  const { pharmacyId } = useParams();
  const queryClient = useQueryClient();

  console.log("delete, mutate: ", pharmacyId);

  const {
    mutate: deleteShiftMutate,
    isPending: isDeletingShift,
    error,
  } = useMutation({
    mutationFn: ({ shiftId }: { shiftId: number }) =>
      deleteShift(Number(pharmacyId), shiftId),
    onSuccess: () => {
      console.log("Successfully deleted shift");
      toast.success("Shift deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["shifts", Number(pharmacyId)],
      });
    },
    onError: () => {
      toast.error("Failed to delete the shift");
    },
  });

  return {
    deleteShift: deleteShiftMutate,
    isDeletingShift,
    error,
  };
};

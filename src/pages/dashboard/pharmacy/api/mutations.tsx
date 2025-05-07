import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  createPharmacy as createPharmacyFun,
  createPharmacyShift,
  deletePharmacy,
  deleteShift,
  editPharmacy,
} from "./api";
import { Shift } from "@/pages/dashboard/pharmacy/pharmacy.types";
import {
  CreatePharmacyValues,
  EditPharmacyValues,
} from "@/pages/dashboard/pharmacy/lib/pharmacy-schema";
import { toast } from "sonner";

export const useCreateShift = () => {
  const { pharmacyId } = useParams();
  const queryClient = useQueryClient();

  const {
    mutate: createShift,
    isPending: isCreatingShift,
    error,
  } = useMutation({
    mutationFn: (shift: Omit<Shift, "id">) =>
      createPharmacyShift({ pharmacyId: Number(pharmacyId), shift }),
    onSuccess: () => {
      toast.success("Shift created Successfully");
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

export const useDeleteShift = () => {
  const { pharmacyId } = useParams();
  const queryClient = useQueryClient();

  const {
    mutate: deleteShiftMutate,
    isPending: isDeletingShift,
    error,
  } = useMutation({
    mutationFn: ({ shiftId }: { shiftId: number }) =>
      deleteShift(Number(pharmacyId), shiftId),
    onSuccess: () => {
      toast.success("Shift deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["shifts", pharmacyId],
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

export const useEditPharmacy = () => {
  const queryClient = useQueryClient();

  const {
    mutate: editPharmacyMutate,
    isPending: isEditingPharmacy,
    error,
  } = useMutation({
    mutationFn: (data: EditPharmacyValues) => editPharmacy(data),
    onSuccess: () => {
      toast.success("Pharmacy updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["pharmacy"],
      });
    },
    onError: () => {
      toast.error("Failed to update pharmacy");
    },
  });

  return {
    editPharmacy: editPharmacyMutate,
    isEditingPharmacy,
    error,
  };
};

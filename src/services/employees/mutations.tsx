import {
  CreateEmployeeValues,
  EditEmployeeValues,
} from "@/validation/employee-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployee, deleteEmployee, editEmployee } from "./api";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const useCreateEmployee = () => {
  const { pharmacyId } = useParams();
  const queryClient = useQueryClient();

  const {
    mutate: createEmployeeMutate,
    isPending: isCreatingEmployee,
    error,
  } = useMutation({
    mutationFn: (employee: CreateEmployeeValues) =>
      createEmployee(employee, Number(pharmacyId)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees", Number(pharmacyId)],
      });

      toast.success("Employee Created Successfully");
    },
    onError: () => {
      toast.error("Failed to create an Employee");
    },
  });

  return {
    createEmployee: createEmployeeMutate,
    isCreatingEmployee,
    error,
  };
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  const { pharmacyId } = useParams();
  const {
    mutate: deleteEmployeeMutation,
    isPending: isDeletingEmployee,
    error,
  } = useMutation({
    mutationFn: (employee_id: number) => deleteEmployee(employee_id),
    onSuccess: () => {
      toast.success("Employee deleted Successfully");
      queryClient.invalidateQueries({
        queryKey: ["employees", Number(pharmacyId)],
      });
    },
    onError: () => {
      toast.error("Failed to delete employee");
    },
  });

  return {
    deleteEmployee: deleteEmployeeMutation,
    isDeletingEmployee,
    error,
  };
};

export const useEditEmployee = () => {
  const {
    mutate: editEmployeeMutation,
    isPending: isEditingEmployee,
    error,
  } = useMutation({
    mutationFn: (employee: EditEmployeeValues) => editEmployee(employee),
    onSuccess: (data) => {
      console.log(data)
      toast.success("Employee Edited Successfully");
    },
    onError: () => {
      toast.error("Failed to Edit employee");
    },
  });

  return {
    editEmployee: editEmployeeMutation,
    isEditingEmployee,
    error,
  };
};



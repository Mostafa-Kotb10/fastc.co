import { AxiosInstance } from "@/lib/axios";
import { Employee } from "@/pages/dashboard/employees/employee.types";
import { CreateEmployeeValues, EditEmployeeValues } from "@/pages/dashboard/employees/employee-schema";

const END_POINTS = {
  base: "/api/v1/pharmacies",
  employee: "/api/v1/employees"
};

export const createEmployee = async (
  employee: CreateEmployeeValues,
  pharmacyId: number,
) => {
  return await AxiosInstance.post<Employee[]>(
    `${END_POINTS.base}/${pharmacyId}/employees`,
    {
      pharmacyId,
      ...employee,
    },
  );
};

export const deleteEmployee = async (employee_id: number) => {
  await AxiosInstance.delete(`${END_POINTS.employee}/${employee_id}`);
};

export const editEmployee = async (employee: EditEmployeeValues) => {
  await AxiosInstance.patch(`${END_POINTS.employee}`, employee)
}

import { AxiosInstance } from "@/lib/axios";
import { Employee } from "@/types/employee.types";
import { Pharmacy, Shift } from "@/types/pharmacy.types";
import {
  CreatePharmacyValues,
  EditPharmacyValues,
} from "@/validation/pharmacy-schema";

const END_POINTS = {
  base: "/api/v1/pharmacies",
};

export const getPharmacyById = async (pharmacyId: number) => {
  return (await AxiosInstance.get(`${END_POINTS.base}/${pharmacyId}`))?.data;
};

interface SearchParams {
  pharmacyId: number;
  query?: string;
  filter?: string;
  page?: number;
  size?: number;
}

export const getSearchPharmacy = async ({
  pharmacyId,
  query,
  filter,
  page = 0,
  size = 75,
}: SearchParams) => {
  const params = {
    ...(query ? { search: query } : {}),
    ...(filter ? { filter } : {}),
    page,
    size,
  };

  const { data } = await AxiosInstance.get(
    `${END_POINTS.base}/${pharmacyId}/drugs/search`,
    { params },
  );

  return data;
};

export const getPharmacyEmployees = async ({
  pharmacyId,
  page = 0,
  size = 75,
  status,
}: {
  pharmacyId: number;
  page?: number;
  size?: number;
  status?: string;
}) => {
  const params = {
    page,
    size,
    status,
  };

  const { data } = await AxiosInstance.get<Employee[]>(
    `${END_POINTS.base}/${pharmacyId}/employees`,
    { params },
  );

  return data;
};

export const deleteEmployee = async (
  pharmacyId: number,
  employeeId: number,
) => {
  return (
    await AxiosInstance.delete(
      `${END_POINTS.base}/${pharmacyId}/employees?id=${pharmacyId}&employee_id=${employeeId}`,
    )
  ).data;
};

// I have two options, Assign A shift, Change Data.

export const getPharmacyDetails = async (pharmacyId: number) => {
  return (await AxiosInstance.get<Pharmacy>(`${END_POINTS.base}/${pharmacyId}`))
    .data;
};

export const createBranch = async () => {};

export const getPharmacyShifts = async (pharmacyId: number) => {
  return (
    await AxiosInstance.get<Shift[]>(`${END_POINTS.base}/${pharmacyId}/shifts`)
  ).data;
};

interface CreatePharmacyShiftParams {
  pharmacyId: number;
  shift: Omit<Shift, "id">;
}

export const createPharmacyShift = async ({
  pharmacyId,
  shift,
}: CreatePharmacyShiftParams): Promise<Shift[]> => {
  const response = await AxiosInstance.post<Shift[]>(
    `${END_POINTS.base}/${pharmacyId}/shifts`,
    shift,
  );
  return response.data;
};

export const createPharmacy = async (pharmacy: CreatePharmacyValues) => {
  return (await AxiosInstance.post<Pharmacy>(`${END_POINTS.base}`, pharmacy))
    .data;
};

export const editPharmacy = async (
  editValues: EditPharmacyValues & { id: number },
) => {
  return (await AxiosInstance.patch<Pharmacy>(END_POINTS.base, editValues))
    .data;
};

export const deletePharmacy = async (pharmacyId: number) => {
  return (await AxiosInstance.delete(`${END_POINTS.base}?id=${pharmacyId}`))
    .data;
};

export const deleteShift = async (pharmacyId: number, shiftId: number) => {
  return (
    await AxiosInstance.delete(
      `${END_POINTS.base}/${pharmacyId}/shifts?id=${pharmacyId}&shift_id=${shiftId}`,
    )
  ).data;
};

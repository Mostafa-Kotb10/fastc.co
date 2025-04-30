import { AxiosInstance } from "@/lib/axios";

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

  console.log(params);

  const { data } = await AxiosInstance.get(
    `${END_POINTS.base}/${pharmacyId}/drugs/search`,
    { params },
  );

  return data;
};

export const getPharmacyEmployees = async ({
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

  console.log(params);

  const { data } = await AxiosInstance.get(
    `${END_POINTS.base}/${pharmacyId}/employees`,
    { params },
  );

  return data;
};

export const deleteEmployee = async (
  pharmacyId: number,
  employeeId: number,
) => {
  return (await AxiosInstance.delete(
    `${END_POINTS.base}/${pharmacyId}/employees?id=${pharmacyId}&employee_id=${employeeId}`,
  ))?.data;
};

// I have two options, Assign A shift, Change Data.

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
  filter?: "AVAILABLE" | "SHORTAGE" | "UNAVAILABLE_SHORTAGE" | "UNAVAILABLE";
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

import { AxiosInstance } from "@/lib/axios";
import { PharmacyDrug } from "@/types/pharmacy.types";

interface RequestParams {
  pharmacyId: number;
  page?: number;
  size: number;
}

export const getExpiredDrugs = async ({
  pharmacyId,
  page = 0,
  size = 75,
}: RequestParams) => {
  const params = {
    page,
    size,
  };
  return (
    await AxiosInstance.get<PharmacyDrug[]>(
      `/api/v1/pharmacies/${pharmacyId}/expired`,
      {
        params,
      },
    )
  )?.data;
};

export const getNearExpiredDrugs = async ({
  pharmacyId,
  page = 0,
  size = 75,
}: RequestParams) => {
  const params = {
    page,
    size,
  };
  return (
    await AxiosInstance.get<PharmacyDrug[]>(
      `/api/v1/pharmacies/${pharmacyId}/non-expired`,
      {
        params,
      },
    )
  )?.data;
};

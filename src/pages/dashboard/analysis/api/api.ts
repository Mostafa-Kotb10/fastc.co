import { AxiosInstance } from "@/lib/axios";
import { Analytics } from "../analytics.types";

// Filters
// cashierId, fromDate, toDate, shift as request params
// pharmacyId as fn parameiter

interface AnalyticsFilters {
  cashierId?: number;
  fromDate?: string;
  toDate?: string;
  shiftId?: string;
}

export const getAnalytics = async (
  pharmacyId: number,
  params?: AnalyticsFilters,
) => {
  return (
    await AxiosInstance.get<Analytics>(
      `/api/v1/pharmacies/${pharmacyId}/reports/analysis`,
      { params },
    )
  ).data;
};

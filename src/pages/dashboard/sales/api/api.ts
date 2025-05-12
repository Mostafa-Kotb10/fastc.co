import { AxiosInstance } from "@/lib/axios";
import { Receipt, ReportItem } from "../sales.types";

const BASE_URL = "/api/v1/receipts";

export const getReceiptById = async (recieptId: number) => {
  return (await AxiosInstance.get(`${BASE_URL}/${recieptId}`))?.data;
};

type GetAllReceiptsParams = {
  cashier_id?: number;
  drug_id?: number;
  pharmacy_id?: number;
  shift_id?: number;
  from_date?: string; // ISO date string
  to_date?: string; // ISO date string
  page?: number; // default 0
  size?: number; // default 10
};

export const getAllReceipts = async (params: GetAllReceiptsParams = {}) => {
  return (await AxiosInstance.get<Receipt[]>(`${BASE_URL}/filter`, { params }))
    .data;
};

type ReportsProps = {
  pharmacyId: number;
  drug_id?: number;
  page?: number; // default 0
  size?: number; // default 10p
  status?: string;
  search?: string;
};

export const getAllReports = async ({
  pharmacyId,
  drug_id,
  page,
  size,
  status,
}: ReportsProps) => {
  return (
    await AxiosInstance.get<ReportItem[]>(
      `/api/v1/pharmacies/${pharmacyId}/reports`,
      {
        params: {
          drug_id,
          page,
          size,
          status,
        },
      },
    )
  ).data;
};

import { AxiosInstance } from "@/lib/axios";
import { Pharmacy } from "@/pages/dashboard/pharmacy/pharmacy.types";

const END_POINTS = {
  getUser: "/api/v1/auth/me",
  getPharmacy: "/api/v1/users/pharmacy",
};

// export const getUser = async () => {
//   return (await AxiosInstance.get<User>("/api/v1/auth/me")).data;
// };

export const getUserPharmacies = async () => {
  return (await AxiosInstance.get<Pharmacy[]>(END_POINTS.getPharmacy))?.data;
};

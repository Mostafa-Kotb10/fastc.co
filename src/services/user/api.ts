import { AxiosInstance } from "@/lib/axios";
import { Pharmacy } from "@/types/pharmacy.types";
import { User } from "@/types/user.types";

const END_POINTS = {
  getUser: "/api/v1/auth/me",
  getPharmacy: "/api/v1/users/pharmacy",
};

export const getUser = () => {
  return AxiosInstance.get<User>("/api/v1/auth/me");
};

export const getUserPharmacy = async () => {
  return (await AxiosInstance.get<Pharmacy>(END_POINTS.getPharmacy)).data;
};

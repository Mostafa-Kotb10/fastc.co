import { useQuery } from "@tanstack/react-query"
import { getUserPharmacy } from "../user/api";

export const useGetUserPharmacy = () => {
    return useQuery({
        queryKey: ["user-pharmacy"],
        queryFn: getUserPharmacy,
    });
}

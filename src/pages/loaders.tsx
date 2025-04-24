import { queryClient } from "@/queryClient";
import { getUserPharmacy } from "@/services/user/api";
import { redirect } from "react-router-dom";

export const configPharmacyLoader = async () => {
    // Use fetchQuery to ensure the query is fetched
    const pharmacy = await queryClient.fetchQuery({
        queryKey: ["user-pharmacy"],
        queryFn: getUserPharmacy,
    });

    if (pharmacy) {
        return redirect('/');
    }

    return null;
}

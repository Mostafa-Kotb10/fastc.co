import { useGetUserPharmacies } from "@/services/pharmacy/queries";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import onboardingSrc from "@/assets/images/onboarding.png";
import { Spinner } from "../../components/Spinner";
import CreatePharmacyDialog from "./CreatePharmacyDialog";
import { format } from "date-fns";
import { Pharmacy } from "@/types/pharmacy.types";
import { useNavigate } from "react-router-dom";

const PickPharmacy = () => {
  const { data: pharmacies, isPending } = useGetUserPharmacies();
  const navigate = useNavigate();

  
  return (
    <div className="relative grid h-screen place-content-center">
      <div className="absolute inset-0 -z-10">
        <img
          src={onboardingSrc}
          alt="Onboarding Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-cyan-950/40" />
      </div>
      <main className="">
        <Card className="h-[500px] w-[450px] rounded-md">
          <CardHeader>
            <CardTitle className="text-3xl">Pick a pharmacy</CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            {isPending ? (
              <div className="flex h-full items-center justify-center">
                <Spinner size={7} />
              </div>
            ) : pharmacies?.length > 0 ? (
              pharmacies.map((pharmacy) => (
                <PharmacyItem key={pharmacy.id} pharmacy={pharmacy} />
              ))
            ) : (
              <>
                <div className="flex size-full items-center justify-center">
                  <div className="flex flex-col items-center gap-1">
                    <CreatePharmacyDialog />
                    <p>No pharmacies found</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export const PharmacyItem = ({ pharmacy }: { pharmacy: Pharmacy }) => {
  const navigate = useNavigate();

  return (
    <div
      className="mt-2 flex cursor-pointer justify-between rounded-sm border px-2 py-3 duration-300 hover:border-green-400"
      onClick={() => navigate(`/dashboard/${pharmacy.id}/`)}
    >
      <div className="flex flex-col">
        <span className="font-semibold">{pharmacy.name || "Pharmacy 1"}</span>
        <span className="text-sm text-gray-500">{pharmacy.address}</span>
      </div>
      <span className="text-sm">
        {format(new Date(pharmacy.createdAt ?? new Date()), "MMM, d")}
      </span>
    </div>
  );
};

export default PickPharmacy;

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
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";

const PickPharmacy = () => {
  const { data: pharmacies, isPending } = useGetUserPharmacies();

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
            ) : (pharmacies ?? [])?.length > 0 ? (
              (pharmacies ?? []).map((pharmacy: Pharmacy) => (
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
  const { pharmacyId } = useParams<{ pharmacyId: string }>();

  const isActive = Number(pharmacyId) === pharmacy.id;

  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "mt-2 flex cursor-pointer items-center justify-between rounded-md border border-transparent bg-white/70 px-4 py-3 shadow-sm transition-all hover:border-emerald-400 hover:bg-white",
        isActive && "border-emerald-400 hover:border-emerald-400",
      )}
      onClick={() =>
        navigate(`/dashboard/${pharmacy.id}/`, {
          replace: true,
        })
      }
    >
      <div className="flex flex-col">
        <span className="text-base font-semibold text-gray-800">
          {pharmacy.name || "Pharmacy 1"}
        </span>
        <span className="text-sm text-gray-500">{pharmacy.address}</span>
      </div>
      <span className="text-sm text-gray-400">
        {format(new Date(pharmacy.createdAt ?? new Date()), "MMM d")}
      </span>
    </div>
  );
};

export default PickPharmacy;

import { useGetUserPharmacies } from "@/pages/dashboard/pharmacy/api/queries";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import onboardingSrc from "@/assets/images/onboarding.png";
import { Spinner } from "../../components/Spinner";
import CreatePharmacyDialog from "./CreatePharmacyDialog";
import { Pharmacy } from "@/pages/dashboard/pharmacy/pharmacy.types";
import PharmacyItem from "../dashboard/pharmacy/components/PharmacyItem";

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

export default PickPharmacy;

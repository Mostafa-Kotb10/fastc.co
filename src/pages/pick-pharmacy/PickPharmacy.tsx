import { useGetUserPharmacy } from "@/services/pharmacy/queries";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import onboardingSrc from "@/assets/images/onboarding.png";
import { Spinner } from "../../components/Spinner";
import CreatePharmacyForm from "./CreatePharmacyDialog";
import CreatePharmacyDialog from "./CreatePharmacyDialog";

const PickPharmacy = () => {
  const { data: pharmacies, isPending } = useGetUserPharmacy();
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
            ) : pharmacies && pharmacies.name ? (
              <p>{pharmacies.name}</p>
            ) : (
              <>
                <p>No pharmacies found</p>
                <CreatePharmacyDialog />
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PickPharmacy;

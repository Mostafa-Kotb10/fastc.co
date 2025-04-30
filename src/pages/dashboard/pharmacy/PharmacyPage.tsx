import CreatePharmacyDialog from "@/pages/pick-pharmacy/CreatePharmacyDialog";
import { PharmacyItem } from "@/pages/pick-pharmacy/PickPharmacy";
import { useGetUserPharmacies } from "@/services/pharmacy/queries";

const PharmacyPage = () => {
  const { data: pharmacies } = useGetUserPharmacies();

  return (
    <>
      <h1 className="mt-10 text-4xl font-bold">My Pharmacies</h1>

      <div className="mt-10 space-y-3">
        <CreatePharmacyDialog />
        <ul className="">
          {pharmacies?.map((pharmacy) => (
            <PharmacyItem key={pharmacy.id} pharmacy={pharmacy} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default PharmacyPage;

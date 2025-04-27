import { PharmacyItem } from "@/pages/pick-pharmacy/PickPharmacy";
import { useGetUserPharmacies } from "@/services/pharmacy/queries";

const PharmacyPage = () => {
  const { data: pharmacies } = useGetUserPharmacies();

  return (
    <>
      <h1 className="mt-10 text-4xl font-bold">My Pharmacy</h1>

      <div className="mt-10">
        {pharmacies?.map((pharmacy) => (
          <PharmacyItem key={pharmacy.id} pharmacy={pharmacy} />
        ))}
      </div>
    </>
  );
};

export default PharmacyPage;

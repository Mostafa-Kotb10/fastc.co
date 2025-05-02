import { Skeleton } from "@/components/ui/skeleton";
import CreatePharmacyDialog from "@/pages/pick-pharmacy/CreatePharmacyDialog";
import PharmacyItem from "@/pages/dashboard/pharmacy/PharmacyItem";
import { useGetUserPharmacies } from "@/services/pharmacy/queries";
import { useParams } from "react-router-dom";
import { useDeletePharmacy } from "@/services/pharmacy/mutations";

const PharmacyPage = () => {
  const { pharmacyId } = useParams();
  const { data: pharmacies, isPending: isLoadingPharmacy } =
    useGetUserPharmacies();
  const { deletePharmacy } = useDeletePharmacy();

  return (
    <>
      <h1 className="mt-10 text-4xl font-bold">My Pharmacies</h1>

      <div className="mt-10 space-y-3">
        <CreatePharmacyDialog onlyBranch pharmacyId={Number(pharmacyId)} />
        <ul className="">
          {isLoadingPharmacy ? (
            <PharmaciesSkeleton />
          ) : (
            <ul className="space-y-4">
              {pharmacies?.map((pharmacy) => (
                <PharmacyItem
                  key={pharmacy.id}
                  pharmacy={pharmacy}
                  withDialog
                  onDelete={deletePharmacy}
                />
              ))}
            </ul>
          )}
        </ul>
      </div>
    </>
  );
};

const PharmaciesSkeleton = () => {
  return (
    <ul className="space-y-4">
      {[...Array(4)].map((_, i) => (
        <li key={i} className="space-y-2 rounded-md border p-4">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </li>
      ))}
    </ul>
  );
};

export default PharmacyPage;

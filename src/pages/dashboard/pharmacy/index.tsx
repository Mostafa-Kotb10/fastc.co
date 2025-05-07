import { Skeleton } from "@/components/ui/skeleton";
import CreatePharmacyDialog from "@/pages/pick-pharmacy/CreatePharmacyDialog";
import { PharmacyItemWithMenu } from "@/pages/dashboard/pharmacy/components/PharmacyItem";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { deletePharmacy } from "./api/api";
import { useGetUserPharmacies } from "./api/queries";

const PharmacyPage = () => {
  const { pharmacyId } = useParams();
  const queryClient = useQueryClient();

  const { data: pharmacies, isPending: isLoadingPharmacies } =
    useGetUserPharmacies();

  const { mutate } = useMutation({
    mutationFn: (pharmacyId: number) => deletePharmacy(pharmacyId),
    onSuccess: () => {
      toast.success("Pharmacy deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["pharmacies"],
      });
    },
    onError: () => {
      toast.error("Failed to delete the pharmacy");
    },
  });

  return (
    <>
      <h1 className="mt-10 text-4xl font-bold">My Pharmacies</h1>

      <div className="mt-10 space-y-3">
        <CreatePharmacyDialog onlyBranch pharmacyId={Number(pharmacyId)} />
        <ul className="">
          {isLoadingPharmacies ? (
            <PharmaciesSkeleton />
          ) : (
            <ul className="space-y-4">
              {pharmacies?.map((pharmacy) => (
                <PharmacyItemWithMenu
                  key={pharmacy.id}
                  pharmacy={pharmacy}
                  withDialog
                  onDelete={mutate}
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

import { Button } from "@/components/ui/button";
import {
  useDeletePharmacy,
} from "@/pages/dashboard/pharmacy/api/mutations";
import { Loader2 } from "lucide-react";

interface DeleteShiftProps {
  setIsOpen: (state: boolean) => void;
  pharmacyId: number;
}

const DeletePharmcay = ({ setIsOpen, pharmacyId }: DeleteShiftProps) => {
  const { deletePharmacy, isDeletingPharmacy } = useDeletePharmacy();

  return (
    <div className="flex w-full justify-between">
      <Button
        variant="outline"
        disabled={isDeletingPharmacy}
        type="button"
        onClick={() => setIsOpen(false)}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        variant="destructive"
        disabled={isDeletingPharmacy}
        onClick={() => {
          deletePharmacy(pharmacyId);
          setIsOpen(false);
        }}
      >
        {isDeletingPharmacy ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Deleting
          </>
        ) : (
          <span>Delete</span>
        )}
      </Button>
    </div>
  );
};

export default DeletePharmcay;

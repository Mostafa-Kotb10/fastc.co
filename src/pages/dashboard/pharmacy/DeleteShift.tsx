import { Button } from "@/components/ui/button";
import { useDeleteShift } from "@/services/pharmacy/mutations";
import { Loader2 } from "lucide-react";

interface DeleteShiftProps {
  setIsOpen: (state: boolean) => void;
  shiftId: number;
}

const DeleteShift = ({ setIsOpen, shiftId }: DeleteShiftProps) => {
  const { deleteShift, isDeletingShift } = useDeleteShift();

  return (
    <div className="flex w-full justify-between">
      <Button
        variant="outline"
        disabled={isDeletingShift}
        type="button"
        onClick={() => setIsOpen(false)}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        variant="destructive"
        disabled={isDeletingShift}
        onClick={() => {
          deleteShift({
            shiftId,
          });
          setIsOpen(false);
        }}
      >
        {isDeletingShift ? (
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

export default DeleteShift;

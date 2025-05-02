import { cn } from "@/lib/utils";
import { Pharmacy } from "@/types/pharmacy.types";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { Trash } from "lucide-react";
import ConfirmDialog from "@/components/ConfirmDialog";

type PharmacyItemProps =
  | {
      pharmacy: Pharmacy;
      withDialog: true;
      onDelete: (id: number) => void;
    }
  | {
      pharmacy: Pharmacy;
      withDialog?: false;
    };

const PharmacyItem = (props: PharmacyItemProps) => {
  const { pharmacy, withDialog } = props;
  const { pharmacyId } = useParams<{ pharmacyId: string }>();
  const isActive = Number(pharmacyId) === pharmacy.id;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/dashboard/${pharmacy.id}/`, {
      replace: true,
    });
  };

  return (
    <div
      className={cn(
        "mt-2 flex items-center justify-between rounded-md border border-transparent bg-white/70 px-4 py-3 shadow-sm transition-all hover:border-emerald-400 hover:bg-white",
        isActive && "border-emerald-400 hover:border-emerald-400",
      )}
    >
      <div
        className="flex flex-1 cursor-pointer flex-col"
        onClick={handleNavigate}
      >
        <span className="text-base font-semibold text-gray-800">
          {pharmacy.name || "Pharmacy 1"}
        </span>
        <span className="text-sm text-gray-500">{pharmacy.address}</span>
      </div>

      <div className="ml-4 flex items-center gap-2">
        <span className="text-sm text-gray-400">
          {format(new Date(pharmacy.createdAt ?? new Date()), "MMM d")}
        </span>

        {withDialog && pharmacy.isBranch && (
          <ConfirmDialog
            title="Delete Pharmacy?"
            description="This will permanently remove the pharmacy."
            onConfirm={() => {
              (props as { onDelete: (id: number) => void }).onDelete(
                pharmacy.id,
              );
            }}
            renderTrigger={() => (
                <Trash className="size-4 text-red-700 cursor-pointer" />
            )}
          />
        )}
      </div>
    </div>
  );
};

export default PharmacyItem;

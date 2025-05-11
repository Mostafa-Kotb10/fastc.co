import { cn } from "@/lib/utils";
import { Pharmacy } from "@/pages/dashboard/pharmacy/pharmacy.types";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { MoreVertical, PenSquare, Trash, Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ResponsiveDialogV2 } from "@/components/ResponsiveDialog";
import DeletePharmcay from "./DeletePharmacy";
import EditPharmacyForm from "./EditPharmacyForm";
import { useLocalStorage } from "@/hooks/useLocalStorage";

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
  const { setItem } = useLocalStorage("i");
  const { pharmacyId } = useParams<{ pharmacyId: string }>();
  const isActive = Number(pharmacyId) === pharmacy.id;
  const navigate = useNavigate();

  const handleNavigate = () => {
    setItem(pharmacy.id);
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
              <Trash className="size-4 cursor-pointer text-red-700" />
            )}
          />
        )}
      </div>
    </div>
  );
};
export const PharmacyItemWithMenu = (props: PharmacyItemProps) => {
  const { pharmacy, withDialog } = props;
  const { pharmacyId } = useParams<{ pharmacyId: string }>();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isActive = Number(pharmacyId) === pharmacy.id;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/dashboard/${pharmacy.id}/`, {
      replace: true,
    });
  };

  const handleOpenDialog = (callback: () => void) => {
    setIsDropdownOpen(false);
    callback();
  };

  return (
    <>
      <ResponsiveDialogV2
        title="Delete Pharmacy"
        description={`Are you sure you want to delete ${pharmacy.name}?. This action cannpt be undone.`}
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
      >
        <DeletePharmcay setIsOpen={setIsDeleteOpen} pharmacyId={pharmacy.id} />
      </ResponsiveDialogV2>

      <ResponsiveDialogV2
        title="Delete Pharmacy"
        description={`Are you sure you want to delete ${pharmacy.name}?. This action cannpt be undone.`}
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
      >
        <EditPharmacyForm
          defaultValues={{
            id: pharmacy.id,
            address: pharmacy?.address ?? "",
            name: pharmacy.name,
            expiryThreshold: pharmacy.expiryThreshold,
            pharmcyId: pharmacy.id,
          }}
          setIsEditOpen={setIsEditOpen}
          onSubmit={() => {
            setIsEditOpen(false);
          }}
        />
      </ResponsiveDialogV2>

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

          {withDialog && (
            <DropdownMenu
              open={isDropdownOpen}
              onOpenChange={setIsDropdownOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <MoreVertical />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {pharmacy.isBranch && (
                  <DropdownMenuItem asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600"
                      onClick={() =>
                        handleOpenDialog(() => setIsDeleteOpen(true))
                      }
                    >
                      <Trash2 className="size-4 text-red-600" />
                      <span>Delete</span>
                    </Button>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleOpenDialog(() => setIsEditOpen(true))}
                  >
                    <PenSquare className="size-4" />
                    <span>Edit</span>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </>
  );
};

export default PharmacyItem;

import {
  ResponsiveDialog,
  ResponsiveDialogV2,
} from "@/components/ResponsiveDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatTime } from "@/lib/utils";
import { Shift } from "@/types/pharmacy.types";
import { MoreVertical, PenSquareIcon, Trash, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteShift from "./DeleteShift";

interface ShiftItemProps {
  shift: Shift;
  onDelete?: () => void;
  isLoading?: boolean;
}

const ShiftItem = ({ shift, onDelete, isLoading = false }: ShiftItemProps) => {
  return (
    <div className="flex items-center justify-between rounded-xs border-b px-3 py-2 shadow">
      <span>{shift.name}</span>
      <div className="flex items-center gap-2">
        <span>
          {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
        </span>
        <span>
          {onDelete && (
            <button onClick={onDelete} disabled={isLoading}>
              <Trash className="size-5 cursor-pointer text-red-600" />
            </button>
          )}
        </span>
      </div>
    </div>
  );
};

export const ShiftItemWithContext = ({
  shift,
  onDelete,
  isLoading = false,
}: ShiftItemProps) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const handleOpenDialog = (callback: () => void) => {
    setIsOpenDropdown(false);
    callback();
  };

  return (
    <>
      {onDelete && (
        <ResponsiveDialogV2
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
          title="Delete Shift"
          description={`Are you sure you want to delete ${shift.name}?, This action cannot be undone.`}
        >
          <DeleteShift setIsOpen={setIsDeleteOpen} shiftId={shift.id} />
        </ResponsiveDialogV2>
      )}

      <div className="flex items-center justify-between rounded-xs border-b px-3 py-2 shadow">
        <span>{shift.name}</span>
        <div className="flex items-center gap-2">
          <span>
            {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
          </span>
          <span>
            <DropdownMenu
              open={isOpenDropdown}
              onOpenChange={setIsOpenDropdown}
            >
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <MoreVertical />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
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
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
        </div>
      </div>
    </>
  );
};

/*



*/

export default ShiftItem;

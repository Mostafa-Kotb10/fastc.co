import { formatTime } from "@/lib/utils";
import { Shift } from "@/types/pharmacy.types";
import { Trash } from "lucide-react";

interface ShiftItemProps {
  shift: Shift;
  onDelete?: () => void;
  isLoading?: boolean;
}

const ShiftItem = ({ shift, onDelete, isLoading = false }: ShiftItemProps) => {
  return (
    <div className="flex items-center justify-between rounded-sm bg-indigo-50 px-3 py-2 shadow-sm">
      <span>{shift.name}</span>
      <div className="flex items-center gap-2">
        <span>
          {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
        </span>
        {onDelete && (
          <button onClick={onDelete} disabled={isLoading}>
            <Trash className="size-5 cursor-pointer text-red-600" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ShiftItem;

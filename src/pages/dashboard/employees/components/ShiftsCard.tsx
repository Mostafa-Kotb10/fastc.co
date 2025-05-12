import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePharmacyShifts } from "@/pages/dashboard/pharmacy/api/queries";
import { ShiftItemWithContext } from "../../pharmacy/components/ShiftItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteShift } from "@/pages/dashboard/pharmacy/api/mutations";

const ShiftsCard = () => {
  const { shifts, isLoadingShifts } = usePharmacyShifts();
  const { deleteShift, isDeletingShift } = useDeleteShift();

  if (isLoadingShifts) return <EmployeesSkeleton />;

  return (
    <Card className="rounded-sm">
      <CardHeader>
        <CardTitle className="text-lg">Shifts</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-60">
          {shifts && shifts.length > 0 ? (
            <ul className="space-y-2">
              {shifts.map((shift) => (
                //   <ShiftItem
                //   key={shift.id}
                //   shift={shift}
                //   onDelete={() => deleteShift({ shiftId: shift.id })}
                //   isLoading={isDeletingShift}
                // />
                <ShiftItemWithContext
                  key={shift.id}
                  shift={shift}
                  onDelete={() => deleteShift({ shiftId: shift.id })}
                  isLoading={isDeletingShift}
                />
              ))}
            </ul>
          ) : (
            <p></p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

const EmployeesSkeleton = () => {
  return (
    <Card className="rounded-sm">
      <CardHeader>
        <CardTitle className="text-lg">
          <Skeleton className="h-10 w-20" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-full">
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ShiftsCard;

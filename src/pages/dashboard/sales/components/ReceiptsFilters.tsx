import {
  ClearFiltersButton,
  DateFilter,
  IDSearchInput,
  SelectFilter,
} from "@/components/data-table/data-filters";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { usePharmacyShifts } from "@/pages/dashboard/pharmacy/api/queries";
import { SlidersHorizontal } from "lucide-react";

const ReceiptsFilters = () => {
  const { shifts, isLoadingShifts } = usePharmacyShifts();

  return (
    <div className="mb-4 flex gap-2 md:flex-col md:gap-4">
      <IDSearchInput className="w-full" />
      <div className="flex gap-2">
        <div className="md:hidden">
          {/* Render dialog (modal) on small screens */}
          <Dialog modal>
            <DialogTrigger asChild>
              <Button variant="outline">
                <SlidersHorizontal />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <ClearFiltersButton />
              <DateFilter placeholderFrom="From" placeholderTo="To" />
              {!isLoadingShifts && shifts && (
                <SelectFilter
                  param="shift_id"
                  label="Select Shift"
                  filters={shifts.map((shift) => ({
                    name: shift.name,
                    value: String(shift.id),
                  }))}
                />
              )}
              <SelectFilter
                param="status"
                filters={[
                  { name: "Issued", value: "ISSUED" },
                  { name: "Returned", value: "RETURNED" },
                  { name: "Rejected", value: "REJECTED" },
                  { name: "Cancelled", value: "CANCELLED" },
                  {
                    name: "Partially Fulfilled",
                    value: "PARTIALLY_FULFILLED",
                  },
                ]}
                label="Select Filter"
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Render content without modal on larger screens */}
        <div className="hidden md:block">
          <div className="flex gap-2">
            <ClearFiltersButton />
            <DateFilter placeholderFrom="From" placeholderTo="To" />
            {!isLoadingShifts && shifts && (
              <SelectFilter
                param="shift_id"
                label="Select Shift"
                filters={shifts.map((shift) => ({
                  name: shift.name,
                  value: String(shift.id),
                }))}
              />
            )}
            <SelectFilter
            param="status"
              filters={[
                { name: "Issued", value: "ISSUED" },
                { name: "Returned", value: "RETURNED" },
                { name: "Rejected", value: "REJECTED" },
                { name: "Cancelled", value: "CANCELLED" },
                {
                  name: "Partially Fulfilled",
                  value: "PARTIALLY_FULFILLED",
                },
              ]}
              label="Select Filter"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptsFilters;

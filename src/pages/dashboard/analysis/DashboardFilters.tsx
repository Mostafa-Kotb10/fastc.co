import {
  ClearFiltersButton,
  ComboboxFilter,
  DateFilter,
  SelectFilter,
} from "@/components/data-table/data-filters";

import { usePharmacyEmployees } from "../pharmacy/api/queries";
import { useParams } from "react-router-dom";
import { Shift } from "../pharmacy/pharmacy.types";

interface DashboardFiltersParams {
  shifts: Shift[] | [];
}

const DashboardFilters = ({ shifts }: DashboardFiltersParams) => {
  const { pharmacyId } = useParams();

  const { employees, isLoadingEmployees } = usePharmacyEmployees({
    pharmacyId: Number(pharmacyId),
  });

  return (
    <div className="flex gap-2">
      <ClearFiltersButton />
      <ComboboxFilter
        employees={employees || []}
        isLoading={isLoadingEmployees}
      />

      <SelectFilter
        param="shift_id"
        label="Select Shift"
        filters={
          shifts?.map((shift) => ({
            name: shift.name,
            value: String(shift.id),
          })) || []
        }
      />

      <DateFilter placeholderTo="to" placeholderFrom="from" />
    </div>
  );
};

export default DashboardFilters;

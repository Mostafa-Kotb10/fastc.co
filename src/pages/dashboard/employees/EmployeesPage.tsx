import {
  SearchInput,
  SelectFilter,
} from "@/components/data-table/data-filters";
import { DataTable } from "@/components/data-table/data-table";
import { usePharmacyEmployees } from "@/services/pharmacy/queries";
import { useParams } from "react-router-dom";
import { columns } from "./columns";
import ShiftsCard from "./ShiftsCard";
import AddShiftForm from "./AddShiftForm";
import { Card, CardContent } from "@/components/ui/card";
import CreateEmployeeForm from "./CreateEmployeeForm";

const EmployeesPage = () => {
  const { pharmacyId } = useParams();

  const { employees, isLoadingEmployees } = usePharmacyEmployees({
    pharmacyId: Number(pharmacyId),
  });

  return (
    <>
      <h3 className="mt-6 text-3xl font-bold">Employees Page</h3>
      <div className="mt-10 space-y-10">
        <div className="grid grid-cols-2 gap-10">
          <ShiftsCard />
          <AddShiftForm />
        </div>
        <CreateEmployeeForm />

        <Card className="rounded-sm">
          <CardContent>
            <div className="flex justify-between">
              <SearchInput className="mb-3 max-w-[30rem]" />
              <div className="flex gap-2">
                <SelectFilter
                  filters={[
                    { name: "Available", value: "AVAILABLE" },
                    { name: "Shortage", value: "SHORTAGE" },
                    {
                      name: "Unavailable (Shortage)",
                      value: "UNAVAILABLE_SHORTAGE",
                    },
                    { name: "Unavailable", value: "UNAVAILABLE" },
                  ]}
                  label="Select Filter"
                />
              </div>
            </div>

            <DataTable
              columns={columns}
              data={employees || []}
              isLoading={isLoadingEmployees}
              configuration={{
                manualFiltering: true,
              }}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default EmployeesPage;

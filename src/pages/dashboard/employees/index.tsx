import {
  SearchInput,
  SelectFilter,
} from "@/components/data-table/data-filters";
import { DataTable } from "@/components/data-table/data-table";
import {
  usePharmacyEmployees,
  usePharmacyShifts,
} from "@/pages/dashboard/pharmacy/api/queries";
import { useParams, useSearchParams } from "react-router-dom";
import { getEmployeeDataColumns } from "./columns";
import ShiftsCard from "./components/ShiftsCard";
import AddShiftForm from "./components/AddShiftForm";
import { Card, CardContent } from "@/components/ui/card";
import CreateEmployeeForm from "./components/CreateEmployeeForm";
import { useCallback, useMemo, useState } from "react";
import { Employee } from "@/pages/dashboard/employees/employee.types";
import { useDeleteEmployee } from "@/pages/dashboard/employees/api/mutations";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CustomPagination } from "@/components/data-table/data-pagination";
import DashboardHeader from "../components/DashboardHeader";

const EmployeesPage = () => {
  const { pharmacyId } = useParams();
  const [searchParams] = useSearchParams();

  const status = searchParams.get("filter") || "";

  const { employees, isLast, isLoadingEmployees } = usePharmacyEmployees({
    pharmacyId: Number(pharmacyId),
    status,
  });

  const { shifts} = usePharmacyShifts();

  const [, setSelectedEmployee] = useState<Employee>();

  const { deleteEmployee } = useDeleteEmployee();

  const onDelete = useCallback(
    (employee: Employee) => deleteEmployee(employee.user.id),
    [deleteEmployee],
  );

  const onEdit = useCallback(
    (employee: Employee) => setSelectedEmployee(employee),
    [],
  );

  const columns = useMemo(
    () => getEmployeeDataColumns({ onEdit, onDelete }),
    [onDelete, onEdit],
  );

  return (
    <>
      <DashboardHeader>Employees Page</DashboardHeader>
      <div className="mt-10 space-y-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <ShiftsCard />
          <AddShiftForm />
        </div>

        <Card className="rounded-sm">
          <CardContent>
            <div className="mb-3 flex flex-col justify-between md:flex-row">
              <SearchInput className="mb-3 w-full md:w-[30rem]" />
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button disabled={!shifts?.length}>Create Employee</Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create User</DialogTitle>
                      <DialogDescription>
                        Fill the flowing to create a Employee.
                      </DialogDescription>
                    </DialogHeader>
                    <CreateEmployeeForm />
                  </DialogContent>
                </Dialog>

                <SelectFilter
                  filters={[
                    { name: "active", value: "ACTIVE" },
                    { name: "inactive", value: "INACTIVE" },
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
            <CustomPagination className="mt-4" isLast={isLast} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default EmployeesPage;

import { PharmacyEmployee } from "@/pages/dashboard/pharmacy/pharmacy.types";
import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from "./components/DataTableRowActions";
import { Employee } from "@/pages/dashboard/employees/employee.types";

interface EmployeeDataColumnsProps {
  onEdit: (data: any) => void;
  onDelete: (data: any) => void;
}

export const getEmployeeDataColumns = ({
  onEdit,
  onDelete,
}): ColumnDef<PharmacyEmployee>[] => [
  {
    header: "id",
    accessorKey: "user.id",
  },
  {
    header: "name",
    accessorKey: "user.username",
  },
  {
    header: "email",
    accessorKey: "user.email",
  },
  {
    header: "role",
    accessorKey: "user.role",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value.toLowerCase();
    },
  },
  {
    header: "gender",
    accessorKey: "gender"
  },
  {
    header: "age",
    accessorKey: "age"
  },
  {
    header: "shift",
    accessorKey: "shift.name"
  }
  ,
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />
    ),
    size: 50,
  },
];

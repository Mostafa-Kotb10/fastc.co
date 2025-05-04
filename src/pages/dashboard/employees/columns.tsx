import { PharmacyEmployee } from "@/types/pharmacy.types";
import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from "./DataTableRowActions";
import { Employee } from "@/types/employee.types";

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
    header: "role",
    accessorKey: "user.role",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value.toLowerCase();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />
    ),
    size: 50,
  },
];

import { ResponsiveDialogV2 } from "@/components/ResponsiveDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import DeleteEmployee from "./DeleteEmployee";
import EditEmployeeForm from "./EditEmployeeForm";
import { Employee } from "@/pages/dashboard/employees/employee.types";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit: (value: TData) => void;
  onDelete: (value: TData) => void;
}

const DataTableRowActions = <TData,>({
  onDelete,
  onEdit,
  row,
}: DataTableRowActionsProps<TData>) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenDialog = (callback: () => void) => {
    setIsMenuOpen(false);
    callback();
  };

  return (
    <>
      <ResponsiveDialogV2
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Delete Employee"
        description={`Are you sure you want to delete this employee? This action cannot be undone`}
      >
        <DeleteEmployee
          setIsOpen={setIsDeleteOpen}
          onDelete={() => onDelete(row.original)}
        />
        test
      </ResponsiveDialogV2>
      <ResponsiveDialogV2
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title="Edit Employee"
        description={`Edit employee data now`}
      >
        <EditEmployeeForm
          employee={row.original as Employee}
          setIsOpen={setIsEditOpen}
        />
      </ResponsiveDialogV2>

      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <MoreHorizontal size="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => handleOpenDialog(() => setIsEditOpen(true))}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleOpenDialog(() => setIsDeleteOpen(true))}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DataTableRowActions;

import { InventoryItem } from "@/constants/constants";
import { sortedHeader } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<InventoryItem>[] = [
  {
    header: "Name",
    accessorKey: "drug.name",
  },
  {
    header: "Form",
    accessorKey: "drug.form",
  },
  {
    header: ({column}) => sortedHeader({
      column: column,
      title: "Quantity"
    }),
    accessorKey: "stock",
  },
  {
    header: ({column}) => sortedHeader({
      column: column,
      title: "Expiry Date"
    }),
    accessorKey: "expiryDate",
  },
];

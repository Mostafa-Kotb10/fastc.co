import { sortedHeader } from "@/lib/utils";
import { PharmacyDrug } from "@/pages/dashboard/pharmacy/pharmacy.types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<PharmacyDrug>[] = [
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

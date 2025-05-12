import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import ReceiptModal from "./components/ReceiptModal";
import { Receipt, ReceiptItem } from "./sales.types";

export const columns: ColumnDef<Receipt>[] = [
  {
    accessorKey: "id",
    header: "Receipt #",
    cell: ({ row }) => `#${row.original.id}`,
  },
  {
    accessorKey: "cashier.username",
    header: "Employee",
    cell: ({ row }) => row.original.cashier?.username || "N/A",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => format(new Date(row.original.createdAt), "dd MMM yyyy"),
  },
  {
    accessorKey: "createdAtTime",
    header: "Time",
    cell: ({ row }) => format(new Date(row.original.createdAt), "hh:mm a"),
  },
  {
    accessorKey: "total",
    header: "Revenue",
    cell: ({ row }) => `LE${row.original.total?.toFixed(2)}`,
  },
  {
    accessorKey: "profit",
    header: "Profit",
    cell: ({ row }) => {
      const profit = row.original.items.reduce(
        (acc: number, item: ReceiptItem) => acc + (item.amountDue || 0),
        0,
      );
      return `LE${profit.toFixed(2)}`;
    },
  },
  {
    id: "actions",
    header: "View",
    size: 60,
    cell: ({ row }) => {
      return <ReceiptModal receipt={row.original as Receipt} />
    },
  },
];


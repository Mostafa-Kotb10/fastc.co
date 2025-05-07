import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Receipt, ReceiptItem } from "@/pages/dashboard/sales/receipts.types";

export const getReceiptsColumns = (
  setSelectedRecipt: (receipt: Receipt) => void,
): ColumnDef<Receipt>[] => [
  {
    accessorKey: "id",
    header: "Receipt #",
    cell: ({ row }) => `#${row.original.id}`,
  },
  {
    accessorKey: "cashier.name",
    header: "Employee",
    cell: ({ row }) => row.original.cashier?.name || "N/A",
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
    cell: ({ row }) => `₦${row.original.total?.toFixed(2)}`,
  },
  {
    accessorKey: "profit",
    header: "Profit",
    cell: ({ row }) => {
      const profit = row.original.items.reduce(
        (acc: number, item: ReceiptItem) => acc + (item.amountDue || 0),
        0,
      );
      return `₦${profit.toFixed(2)}`;
    },
  },
  {
    id: "actions",
    header: "View",
    cell: ({ row }) => (
      <Button
        className="text-sm text-blue-600 hover:underline"
        onClick={() => setSelectedRecipt(row.original)}
      >
        View
      </Button>
    ),
  },
];

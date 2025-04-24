import { Column, ColumnDef, FilterFn } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { InventoryItem, InventoryItemTest } from "@/constants/constants";

import { format } from "date-fns";
import {
  ClipboardCopy,
  Trash2,
  MoreHorizontal,
  Pencil,
  ArrowUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<InventoryItem>[] = [
  {
    header: "ID",
    accessorKey: "drugId",
  },
  {
    header: "Drug Name",
    accessorKey: "drugName",
  },
  {
    header: "Type",
    accessorKey: "drugForm",
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },
  {
    header: ({ column }) => sortedHeader({ column, title: "Price" }),
    accessorKey: "price",
    cell: ({ cell }) => (
      <div className="space-x-0.5">
        <span>{cell.getValue() as number}</span>
        <span>$</span>
      </div>
    ),
    meta: {
      toggleLabel: "Price",
    },
  },
  {
    header: ({ column }) => sortedHeader({ column, title: "Cost" }),
    accessorKey: "cost",
    cell: ({ cell }) => (
      <div className="space-x-0.5">
        <span>{cell.getValue() as number}</span>
        <span>$</span>
      </div>
    ),
    meta: {
      toggleLabel: "Cost",
    },
  },
  {
    header: "Expiry Date",
    accessorKey: "expiryDate",
    cell: ({ row }) => {
      const expiryDate = row.getValue("expiryDate") as Date;
      const formattedDate = format(expiryDate, "MMMM, d");
      return <div className="font-medium">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const drug = row.original;
      const drugId = drug.drugId;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(drugId);
              }}
            >
              <ClipboardCopy className="mr-2 size-4" />
              Copy drug ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="mr-2 size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2 className="mr-2 size-4 text-red-500" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function sortedHeader<TData>({
  column,
  title,
}: {
  column: Column<TData>;
  title: string;
}) {
  const isSorted = column.getIsSorted() === "asc";

  return (
    <div
      aria-label="Sort"
      role="button"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className={cn(
        "inline-flex cursor-pointer items-center",
        isSorted && "text-emerald-500 hover:text-emerald-500",
      )}
    >
      <span>{title}</span>
      <ArrowUpDown className="ml-2 size-4" />
    </div>
  );
}

export const inventoryStatusFilter: FilterFn<InventoryItemTest> = (
  row,
  columnId,
  filterValue,
) => {
  const quantity = row.original.quantity;
  const shortage = row.original.quantityShortage;

  if (filterValue === "avilable") {
    return quantity > 0 && shortage <= 0;
  }

  if (filterValue === "shortage") {
    return shortage > 0;
  }

  if (filterValue === "unavailable-shortage") {
    return quantity === 0 && shortage > 0;
  }

  if (filterValue === "unavilable") {
    return quantity === 0;
  }

  return true;
};

export const testColumns: ColumnDef<InventoryItemTest>[] = [
  {
    header: "ID",
    accessorKey: "drugId",
  },
  {
    header: "Name",
    accessorKey: "drugName",
  },
  {
    header: "Type",
    accessorKey: "drugForm",
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },
  {
    header: "Needed",
    accessorKey: "quantityNeeded",
  },
  {
    header: ({ column }) => sortedHeader({ column, title: "shortage" }),
    accessorKey: "quantityShortage",
    meta: {
      toggleLabel: "Shortage",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const drug = row.original;
      const drugId = drug.drugId;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(drugId);
              }}
            >
              <ClipboardCopy className="mr-2 size-4" />
              Copy drug ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="mr-2 size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2 className="mr-2 size-4 text-red-500" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    id: "status",
    header: "status",
    filterFn: inventoryStatusFilter,
  },
];

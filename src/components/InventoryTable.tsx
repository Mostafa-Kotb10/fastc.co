import { inventoryData, InventoryItem } from "@/constants/constants";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnResizeMode,
  ColumnDef
} from "@tanstack/react-table";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const columns: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: "drugName",
    header: "Drug Name",
    cell: (props) => <p>{props.getValue() as string}</p>,
  },
  {
    accessorKey: "drugForm",
    header: "Type",
    cell: (props) => <p>{props.getValue() as string}</p>,
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: (props) => <p>{props.getValue() as string}</p>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: (props) => <p>{props.getValue() as string}</p>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (props) => <p>{props.getValue() as string}</p>,
  },
  {
    accessorKey: "cost",
    header: "Cost",
    cell: (props) => <p>{props.getValue() as string}</p>,
  },
];

const InventoryTable = () => {
  const [data, setData] = useState<InventoryItem[]>(inventoryData);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow  key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InventoryTable;

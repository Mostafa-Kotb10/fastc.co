import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  TableOptions as TableOptionsType,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { CSSProperties, useState } from "react";
import { Spinner } from "../Spinner";

const DEFAULT_REACT_TABLE_COLUMN_WIDTH = 150;

interface DataTablePorps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  configuration?: Partial<TableOptionsType<TData>>;
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  configuration,
  isLoading = false,
}: DataTablePorps<TData, TValue>) {
  // const [pagination, setPagination] = useState({
  //   pageIndex: 0,
  //   pageSize: 8,
  // });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColoumnVisibility] = useState<VisibilityState>(
    {},
  );
  // The types are drived from the react-table.

  const table = useReactTable({
    data,
    columns,
    state: {
      // pagination,
      sorting,
      columnFilters,
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    // onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColoumnVisibility,
    ...configuration,
  });

  return (
    <div>
      {/* <TableOptions table={table} /> */}

      <div className="rounded-md border bg-white p-2">
        <Table className="text-black/90">
          <TableHeader className="bg-slate-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const styles: CSSProperties =
                    header.getSize() !== DEFAULT_REACT_TABLE_COLUMN_WIDTH
                      ? {
                          width: `${header.getSize()}px`,
                        }
                      : {};
                  return (
                    <TableHead style={styles} key={header.id}>
                      {flexRender(
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
            {isLoading ? (
              <TableRow className="h-9">
                <TableCell
                  colSpan={table.getVisibleLeafColumns().length}
                  className="p-0"
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <Spinner />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow className="even:bg-gray-100" key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No Results Found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* <div className="flex items-center justify-start space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="select-none"
        >
          Previous
        </Button>
        <span>
          {table.getState().pagination.pageIndex + 1}/{table.getPageCount()}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="select-none"
        >
          Next
        </Button>
      </div> */}
    </div>
  );
}

// type TableOptionsProps<TData> = {
//   table: TableType<TData>;
// };

// function TableOptions<TData>({ table }: TableOptionsProps<TData>) {
//   const setStatusFilter = (value: string | undefined) => {
//     table.getColumn("status")?.setFilterValue(value);
//   };

//   return (
//     <div className="grid grid-cols-4 py-4">
//       <Input
//         placeholder="Filter By Name..."
//         value={(table.getColumn("drugName")?.getFilterValue() as string) || ""}
//         onChange={(e) =>
//           table.getColumn("drugName")?.setFilterValue(e.target.value)
//         }
//         className="col-span-2 bg-white"
//       />

//       <div className="col-start-4 flex justify-end gap-4">
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button className="inline-flex items-center justify-center rounded-sm border-2 border-black bg-white py-2 text-black hover:bg-white">
//               <span>Column</span>
//               <ChevronDown className="size-4" />
//             </Button>
//           </DropdownMenuTrigger>

//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Columns</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             {table
//               .getAllColumns()
//               .filter(
//                 (column) =>
//                   column.getCanHide() &&
//                   !["actions", "status"].includes(column.id),
//               )
//               .map((column) => (
//                 <DropdownMenuCheckboxItem
//                   key={column.id}
//                   className="capitalize"
//                   checked={column.getIsVisible()}
//                   onCheckedChange={(value) => column.toggleVisibility(!!value)}
//                 >
//                   {column.columnDef.meta?.toggleLabel ??
//                     column.columnDef.header?.toString()}
//                 </DropdownMenuCheckboxItem>
//               ))}
//           </DropdownMenuContent>
//         </DropdownMenu>

//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button className="inline-flex items-center justify-center rounded-sm border-2 border-black bg-white py-2 text-black hover:bg-white">
//               <span>Filters</span>
//               <BsFunnel className="size-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Filter</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuRadioGroup>
//               <DropdownMenuRadioItem
//                 value="available"
//                 onSelect={(e) => setStatusFilter(e.target.value)}
//               >
//                 avilable
//               </DropdownMenuRadioItem>
//               <DropdownMenuRadioItem
//                 value="shortage"
//                 onClick={() => setStatusFilter(status)}
//               >
//                 shortage
//               </DropdownMenuRadioItem>
//               <DropdownMenuRadioItem
//                 value="unavailable-shortage"
//                 onClick={() => setStatusFilter(status)}
//               >
//                 unavailable-shortage
//               </DropdownMenuRadioItem>
//               <DropdownMenuRadioItem
//                 value="unavailable"
//                 onClick={() => setStatusFilter(status)}
//               >
//                 unavailable
//               </DropdownMenuRadioItem>
//             </DropdownMenuRadioGroup>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem onClick={() => setStatusFilter(undefined)}>
//               Clear
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </div>
//   );
// }

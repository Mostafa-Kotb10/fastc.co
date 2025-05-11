import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import { ReportItem } from "./sales.types";
import ReportModal from "./components/ReportModal";

export const reportsColumns: ColumnDef<ReportItem>[] = [
  {
    accessorKey: "drug.name",
    header: "Drug Name",
  },
  {
    accessorKey: "quantity",
    header: "Sold Number",
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ row }) => `$${row.original.revenue.toFixed(2)}`,
  },
  {
    accessorKey: "profit",
    header: "Profit",
    cell: ({ row }) => `$${row.original.profit.toFixed(2)}`,
  },
  {
    id: "actions",
    header: "View",
    size: 60,
    cell: ({ row }) => {
      return <ReportModal report={row.original as ReportItem} />;
    },
  },
];

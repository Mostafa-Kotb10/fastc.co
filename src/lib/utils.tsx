import { Column } from "@tanstack/react-table";
import { clsx, type ClassValue } from "clsx";
import { ArrowUpDown } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortedHeader<TData>({
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

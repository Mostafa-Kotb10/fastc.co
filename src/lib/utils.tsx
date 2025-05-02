import { Column } from "@tanstack/react-table";
import { clsx, type ClassValue } from "clsx";
import { ArrowUpDown } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { format, parse } from "date-fns";

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

/**
 * Formats a time string from "HH:mm:ss" to "HH:mm".
 * @param timeStr Time string in "HH:mm:ss" format.
 * @returns Formatted time string in "HH:mm".
 */

export function formatTime(timeStr: string): string {
  try {
    const parsedTime = parse(timeStr, "HH:mm:ss", new Date());
    return format(parsedTime, "HH:mm");
  } catch {
    console.error("Invalid time format:", timeStr);
    return timeStr;
  }
}

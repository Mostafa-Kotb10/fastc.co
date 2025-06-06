// Define the filters you want the search terms and query too

import { useSearchParams } from "react-router-dom";
import { Input } from "../ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import {
  Select,
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon, SearchIcon, Check, ChevronsUpDown } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Calendar } from "../ui/calendar";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Employee } from "@/pages/dashboard/employees/employee.types";
import { Spinner } from "../Spinner";

export const ClearFiltersButton = () => {
  const [, setSearchParams] = useSearchParams();

  const clearParams = () => {
    setSearchParams({});
  };

  return <Button onClick={clearParams}>Clear Filters</Button>;
};

export const SearchInput = ({
  className,
  showIcon = false,
}: {
  className?: string;
  showIcon?: boolean;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [query, setQuery] = useState(searchQuery);

  const debouncedVal = useDebounce(query.trim(), 500);

  useEffect(() => {
    if (debouncedVal) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set("search", debouncedVal);
        return newParams;
      });
    } else {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.delete("search");
        return newParams;
      });
    }
  }, [debouncedVal, setSearchParams]);

  return (
    <div className={cn("relative w-[400px]", className)}>
      <Input
        className="w-full"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        placeholder="Search a term.."
      />
      {showIcon && (
        <SearchIcon className="absolute top-1/2 right-2 size-4 -translate-y-1/2 text-gray-500/50" />
      )}
    </div>
  );
};

const filterKeys = [
  { label: "Cashier ID", value: "cashier_id" },
  { label: "Drug ID", value: "drug_id" },
  { label: "Pharmacy ID", value: "pharmacy_id" },
];

export const IDSearchInput = ({ className }: { className?: string }) => {
  const [, setSearchParams] = useSearchParams();
  const [key, setKey] = useState("cashier_id");
  const [query, setQuery] = useState("");

  const debouncedVal = useDebounce(query.trim(), 500);

  useEffect(() => {
    setQuery("");
  }, [key]);

  useEffect(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      filterKeys.forEach(({ value }) => newParams.delete(value));
      if (debouncedVal) {
        newParams.set(key, debouncedVal);
      }
      return newParams;
    });
  }, [debouncedVal, key, setSearchParams]);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Input
        type="number"
        placeholder={`Enter ${key.replace("_", " ")}`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-lg flex-1"
      />

      <Select value={key} onValueChange={setKey}>
        <SelectTrigger showArrow={false}>
          <SearchIcon className="h-5 w-5 text-gray-500" />
        </SelectTrigger>
        <SelectContent>
          {filterKeys.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

type FilterProps = {
  label?: string;
  param?: string;
  filters: {
    name: string;
    value: string;
  }[];
};
export const SelectFilter = ({
  filters,
  label,
  param = "filter",
}: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = searchParams.get(param) || ""; // Default to empty string if no value exists

  const setFilter = (value: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set(param, value); // Sets the filter parameter in the URL
      return newParams;
    });
  };

  return (
    <Select value={selected} onValueChange={setFilter}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={label || param} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {filters?.map((filter) => (
            <SelectItem key={filter.name} value={filter.value}>
              {filter.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

type DateFilterProps = {
  label?: string;
  placeholderFrom: string;
  placeholderTo: string;
};

export const DateFilter = ({
  label,
  placeholderFrom,
  placeholderTo,
}: DateFilterProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const from = searchParams.get("from_date");
    const to = searchParams.get("to_date");

    if (from && to) {
      const fromDate = parseISO(from);
      const toDate = parseISO(to);
      setDateRange({ from: fromDate, to: toDate });
    }
  }, [searchParams]);

  const setFilter = (from: string, to: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("from_date", from);
      newParams.set("to_date", to);
      return newParams;
    });
  };

  const onSelectDate = (date: DateRange | undefined) => {
    setDateRange(date);
    if (date?.from && date?.to) {
      const formattedFrom = format(date.from, "yyyy-MM-dd");
      const formattedTo = format(date.to, "yyyy-MM-dd");
      setFilter(formattedFrom, formattedTo);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-4">
        {label && <label className="font-medium">{label}</label>}

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from && dateRange?.to
                ? `${format(dateRange.from, "LLL dd, y")} - ${format(
                    dateRange.to,
                    "LLL dd, y",
                  )}`
                : `${placeholderFrom} - ${placeholderTo}`}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={onSelectDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

type TimeFilterProps = {
  label?: string;
  placeholderFrom: string;
  placeholderTo: string;
};

export const TimeFilter = ({
  label,
  placeholderFrom,
  placeholderTo,
}: TimeFilterProps) => {
  const [timeRange, setTimeRange] = useState<
    { from?: string; to?: string } | undefined
  >(undefined);

  const [, setSearchParams] = useSearchParams();

  // Helper function to format time as HH:mm:ss
  const formatTime = (hours: number, minutes: number): string => {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:00`;
  };

  // Function to update search params for "from_time" and "to_time"
  const setFilter = (from: string, to: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("from_time", from);
      newParams.set("to_time", to);
      return newParams;
    });
  };

  // Handle time selection
  const onSelectTime = (
    fromHour: number,
    fromMinute: number,
    toHour: number,
    toMinute: number,
  ) => {
    const fromTime = formatTime(fromHour, fromMinute);
    const toTime = formatTime(toHour, toMinute);

    setTimeRange({ from: fromTime, to: toTime });
    setFilter(fromTime, toTime);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-4">
        {/* Time Range Label */}
        {label && <label className="font-medium">{label}</label>}

        {/* Time Range Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="w-[180px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {timeRange?.from && timeRange?.to
                ? `${timeRange.from} - ${timeRange.to}`
                : `${placeholderFrom} - ${placeholderTo}`}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="space-y-4 p-2">
              <div className="flex space-x-4">
                {/* From Time */}
                <div>
                  <label className="block">From</label>
                  <input
                    type="number"
                    min="0"
                    max="23"
                    className="w-16 rounded border p-2"
                    placeholder="HH"
                    onChange={(e) =>
                      setTimeRange({ ...timeRange, from: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    min="0"
                    max="59"
                    className="w-16 rounded border p-2"
                    placeholder="MM"
                    onChange={(e) =>
                      setTimeRange({ ...timeRange, from: e.target.value })
                    }
                  />
                </div>

                {/* To Time */}
                <div>
                  <label className="block">To</label>
                  <input
                    type="number"
                    min="0"
                    max="23"
                    className="w-16 rounded border p-2"
                    placeholder="HH"
                    onChange={(e) =>
                      setTimeRange({ ...timeRange, to: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    min="0"
                    max="59"
                    className="w-16 rounded border p-2"
                    placeholder="MM"
                    onChange={(e) =>
                      setTimeRange({ ...timeRange, to: e.target.value })
                    }
                  />
                </div>
              </div>

              <Button
                onClick={() => {
                  if (timeRange?.from && timeRange?.to) {
                    const [fromHour, fromMinute] = timeRange.from
                      .split(":")
                      .map(Number);
                    const [toHour, toMinute] = timeRange.to
                      .split(":")
                      .map(Number);
                    onSelectTime(fromHour, fromMinute, toHour, toMinute);
                  }
                }}
              >
                Apply Time Filter
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

interface ComboboxFilterProps {
  employees: Employee[];
  isLoading: boolean;
}

export function ComboboxFilter({ employees, isLoading }: ComboboxFilterProps) {
  const [, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleUserIdSelect = (userId: number | null) => {
    setSearchParams((prev) => {
      if (userId) {
        prev.set("cashier_id", userId.toString());
      } else {
        prev.delete("cashier_id");
      }
      return prev;
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? employees.find((e) => e.user.id.toString() === value)?.user
                .username
            : "Select employee..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command
          filter={(value, search) =>
            value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
          }
        >
          <CommandInput placeholder="Search employees..." />
          <CommandList>
            <CommandEmpty>No users found.</CommandEmpty>
            <CommandGroup>
              {!isLoading ? (
                employees.map((employee) => {
                  const idStr = employee.user.id.toString();
                  return (
                    <CommandItem
                      key={idStr}
                      value={employee.user.username}
                      onSelect={(username) => {
                        const selected = employees.find(
                          (e) => e.user.username === username,
                        );
                        const newId = selected?.user.id.toString() ?? "";
                        const finalId = newId === value ? "" : newId;

                        setValue(finalId);
                        setOpen(false);
                        handleUserIdSelect(finalId ? Number(finalId) : null);
                      }}
                    >
                      {employee.user.username}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === idStr ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  );
                })
              ) : (
                <Spinner />
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

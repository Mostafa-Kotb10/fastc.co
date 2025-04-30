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

export const SearchInput = ({ className }: { className?: string }) => {
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
    <Input
      className={className}
      onChange={(e) => setQuery(e.target.value)}
      value={query}
      placeholder="Search a term.."
    />
  );
};

type FilterType =
  | "AVAILABLE"
  | "SHORTAGE"
  | "UNAVAILABLE_SHORTAGE"
  | "UNAVAILABLE"
  | undefined;

type SelectFilterProps = {
  label?: string;
  filters: {
    name: string;
    value: string;
  }[];
};

export const SelectFilter = ({ filters, label }: SelectFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParam = (searchParams.get("filter") as FilterType) || "";

  console.log(filterParam);

  const setFilter = (value: string) => {
    setSearchParams((prev) => {
      const newParam = new URLSearchParams(prev);
      newParam.set("filter", value);
      return newParam;
    });
  };

  return (
    <Select onValueChange={(value) => setFilter(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {filters?.map((filter) => (
            <SelectItem key={filter.name} value={filter.value}>{filter.name}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

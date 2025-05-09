import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "../ui/pagination";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CustomPaginationProps {
  className?: string;
  isLast: boolean;
}

export const CustomPagination = ({
  className,
  isLast,
}: CustomPaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "0", 10);
  const size = parseInt(searchParams.get("size") || "10", 10);

  const goToPage = (newPage: number) => {
    searchParams.set("page", newPage.toString());
    searchParams.set("size", size.toString());
    setSearchParams(searchParams);
  };

  const handlePrevious = () => {
    if (page > 0) {
      goToPage(page - 1);
    }
  };

  const handleNext = () => {
    if (!isLast) {
      goToPage(page + 1);
    }
  };

  return (
    <UIPagination className={cn("", className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrevious}
            isActive={!(page === 0)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => goToPage(0)} isActive={page === 0}>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={handleNext} isActive={!isLast} />
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  );
};

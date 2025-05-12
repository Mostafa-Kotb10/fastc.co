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
  totalCount?: number;
}

export const CustomPagination = ({
  className,
  isLast,
}: CustomPaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "0", 10);
  const size = parseInt(searchParams.get("size") || "10", 10);

  const estimatedTotalPages = isLast ? page + 1 : page + 2;

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

  const renderPageItems = () => {
    const items = [];
    items.push(
      <PaginationItem key="first">
        <PaginationLink onClick={() => goToPage(0)} isActive={page === 0}>
          1
        </PaginationLink>
      </PaginationItem>,
    );
    if (page > 2) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }
    if (page > 0 && page < estimatedTotalPages - 1) {
      items.push(
        <PaginationItem key={page}>
          <PaginationLink onClick={() => goToPage(page)} isActive={true}>
            {page + 1}
          </PaginationLink>
        </PaginationItem>,
      );
    }
    if (page < estimatedTotalPages - 3) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }
    if (estimatedTotalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink
            onClick={() => goToPage(estimatedTotalPages - 1)}
            isActive={page === estimatedTotalPages - 1}
          >
            {estimatedTotalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }
    return items;
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

        {renderPageItems()}

        <PaginationItem>
          <PaginationNext onClick={handleNext} isActive={!isLast} />
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  );
};

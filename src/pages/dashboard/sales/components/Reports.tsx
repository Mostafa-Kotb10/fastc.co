import { DataTable } from "@/components/data-table/data-table";
import { useQuery } from "@tanstack/react-query";
import { getAllReports } from "../api/api";
import { useParams, useSearchParams } from "react-router-dom";
import {
  DateFilter,
  SearchInput,
  SelectFilter,
} from "@/components/data-table/data-filters";
import { reportsColumns } from "../reports-columns";
import { dummyReports } from "@/constants/constants";

const Reports = () => {
  const { pharmacyId } = useParams();
  const [searchParams] = useSearchParams();

  const drug_id = Number(searchParams.get("drug_id")) || undefined;
  const page = Number(searchParams.get("page")) || 0;
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const size = Number(searchParams.get("page")) || 10;

  const { data: reports, isPending: isLoadingReports } = useQuery({
    queryKey: ["reports", pharmacyId, drug_id, page, size],
    queryFn: () =>
      getAllReports({
        drug_id,
        page,
        size,
        pharmacyId: Number(pharmacyId),
        status,
        search,
      }),
  });

  return (
    <>
      <div className="mt-10">
        {/* <ReceiptsFilters /> */}
        <div className="mt-10">
          <div className="flex justify-between">
            <SearchInput className="mb-3 max-w-[30rem]" />
            <div className="flex gap-2">
              <DateFilter placeholderFrom="from" placeholderTo="to" />
              <SelectFilter
                param="status"
                filters={[
                  { name: "Sold", value: "COMPLETE" },
                  { name: "Returned", value: "RETURNED" },
                ]}
                label="Select Filter"
              />
            </div>
          </div>
        </div>
        <DataTable
          columns={reportsColumns}
          data={dummyReports || []}
          isLoading={isLoadingReports}
          configuration={{
            manualFiltering: true,
          }}
        />
      </div>
    </>
  );
};

export default Reports;

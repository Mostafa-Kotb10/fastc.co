import { SearchInput, SelectFilter } from "@/components/data-table/data-filters";
import { DataTable } from "@/components/data-table/data-table";

const EmployeesPage = () => {
  return (
    <>
    <h3 className="text-2xl font-bold">Employees Page</h3>
    <div className="mt-10">
        <div className="flex justify-between">
          <SearchInput className="mb-3 max-w-[30rem]" />
          <div className="flex gap-2">
            <SelectFilter
              filters={[
                { name: "Available", value: "AVAILABLE" },
                { name: "Shortage", value: "SHORTAGE" },
                {
                  name: "Unavailable (Shortage)",
                  value: "UNAVAILABLE_SHORTAGE",
                },
                { name: "Unavailable", value: "UNAVAILABLE" },
              ]}
              label="Select Filter"
            />
          </div>
        </div>

        {/* <DataTable
          columns={columns}
          data={data || []}
          isLoading={isPending}
          configuration={{
            manualFiltering: true,
          }}
        /> */}
      </div>
    </>
  )
}

export default EmployeesPage;

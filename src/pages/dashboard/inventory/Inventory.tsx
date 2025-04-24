import { DataTable } from "./data-table";
import { testColumns } from "./columns";
import { inventoryDataTest } from "@/constants/constants";

const Inventory = () => {
  return (
    <>
      <h1 className="mt-10 text-4xl font-bold">Inventory</h1>
      <div className="mt-10">
        <DataTable columns={testColumns} data={inventoryDataTest} />
      </div>
    </>
  );
};

export default Inventory;

import { useParams, useSearchParams } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import { usePharmacyDetails } from "../pharmacy/api/queries";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "./api/api";
import DashboardFilters from "./DashboardFilters";
import DashboardStats from "./components/DashboardStats";

import EmployeeChart from "./components/EmployeeCahrt";
import { ProfitRevenueCustomerChart } from "./components/ProfitRevenueCustomerChart";
import { ProfitRevenuePieChart } from "./components/ProfitRevenuePieChart";

const Dashboard = () => {
  const { pharmacyId } = useParams();
  const [searchParams] = useSearchParams();

  const { pharmacy, isLoadingPharmacy } = usePharmacyDetails(
    Number(pharmacyId),
  );

  const fromDate = searchParams.get("from_date") || "";
  const toDate = searchParams.get("to_date") || "";
  const shiftId = searchParams.get("shift_id") || "";
  const cashierId = Number(searchParams.get("cashier_id")) || undefined;

  const { data: analytics } = useQuery({
    queryKey: ["analytics", pharmacyId, fromDate, toDate, shiftId, cashierId],
    queryFn: () =>
      getAnalytics(Number(pharmacyId), {
        fromDate,
        toDate,
        shiftId,
        cashierId,
      }),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      {!isLoadingPharmacy && (
        <>
          <div className="mt-10 flex items-center gap-2">
            <DashboardHeader>{pharmacy?.name}</DashboardHeader>
            {!pharmacy?.isBranch ? (
              <span className="rounded-md bg-emerald-400 p-2 text-xs text-white">
                Main Branch
              </span>
            ) : (
              <span className="rounded-md bg-amber-300 p-2 text-xs text-black">
                Branch
              </span>
            )}
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm text-gray-400">{pharmacy?.address}</span>
          </div>
        </>
      )}
      <Separator className="my-5" />

      <DashboardFilters shifts={pharmacy?.shifts || []} />

      <DashboardStats className="mt-4" stats={analytics} />

      <div className="mt-4 grid grid-cols-2 gap-4">
        <EmployeeChart analytics={analytics} />
        <ProfitRevenuePieChart
          analytics={
            analytics || {
              profit: 0,
              revenue: 0,
              numberOfReceipts: 0,
              medianReceipt: 0,
            }
          }
        />
      </div>
      <ProfitRevenueCustomerChart />
    </>
  );
};

export default Dashboard;

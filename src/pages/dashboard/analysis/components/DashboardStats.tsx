import { Analytics } from "../analytics.types";
import { cn } from "@/lib/utils";
import { ChartBar, DollarSign, ReceiptText, TrendingUp } from "lucide-react";

interface DashboardStatsProps {
  stats: Analytics | undefined;
  className?: string;
}

const DashboardStats = ({ stats, className }: DashboardStatsProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      <AnalyticCard
        title="Revenue"
        value={stats?.revenue}
        icon={<TrendingUp className="size-6" />}
      />
      <AnalyticCard
        title="Profit"
        value={stats?.profit}
        icon={<DollarSign className="size-6" />}
      />
      <AnalyticCard
        title="Number of Receipts"
        value={stats?.numberOfReceipts}
        icon={<ReceiptText className="size-6" />}
      />
      <AnalyticCard
        title="Median Receipt"
        value={stats?.medianReceipt?.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        icon={<ChartBar className="size-6" />}
      />
    </div>
  );
};

const AnalyticCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value?: string | number;
  icon?: React.JSX.Element;
}) => {
  console.log("title", title);
  return (
    <div className="flex items-center justify-between rounded-2xl border bg-white p-4 shadow-sm dark:bg-zinc-900">
      <div className="space-y-1">
        <h5 className="text-muted-foreground text-sm font-medium">{title}</h5>
        <span className="text-foreground text-2xl font-semibold">
          {value ?? "-"}
          {(title === "Revenue" || title === "Profit") && <span> LE</span>}
        </span>
      </div>
      {icon && <div>{icon}</div>}
    </div>
  );
};
export default DashboardStats;

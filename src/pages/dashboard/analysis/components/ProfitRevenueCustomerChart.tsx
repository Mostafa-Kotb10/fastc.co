import { useParams } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { getAnalytics } from "../api/api";
import { format, startOfMonth, endOfMonth } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig: ChartConfig = {
  profit: {
    label: "Profit",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
};

function getMonthlyDateRanges() {
  const now = new Date();
  const months = [];

  for (let month = 0; month <= now.getMonth(); month++) {
    const date = new Date(now.getFullYear(), month);
    months.push({
      label: format(date, "MMMM"),
      from: format(startOfMonth(date), "yyyy-MM-dd"),
      to: format(endOfMonth(date), "yyyy-MM-dd"),
    });
  }

  return months;
}

export function ProfitRevenueCustomerChart() {
  const { pharmacyId } = useParams();
  const monthlyRanges = getMonthlyDateRanges();

  const analyticsQueries = useQueries({
    queries: monthlyRanges.map((range) => ({
      queryKey: ["chart", pharmacyId, range.from, range.to],
      queryFn: () =>
        getAnalytics(Number(pharmacyId), {
          fromDate: range.from,
          toDate: range.to,
        }),
    })),
  });

  const chartData = monthlyRanges.map((range, index) => {
    const data = analyticsQueries[index].data;
    return {
      month: range.label,
      profit: data?.profit ?? 0,
      revenue: data?.revenue ?? 0,
    };
  });

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Monthly Profit & Revenue</CardTitle>
        <CardDescription>
          Showing monthly profit and revenue from January to{" "}
          {monthlyRanges.at(-1)?.label}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillProfit" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-green-500)" // Shadcn's green color
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-green-500)" // Shadcn's green color
                  stopOpacity={0.1}
                />
              </linearGradient>

              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-blue-500)" // Shadcn's blue color
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-blue-500)" // Shadcn's blue color
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${value}`}
            />

            <Area
              dataKey="revenue"
              type="natural"
              fill="url(#fillRevenue)"
              stroke="var(--color-revenue)"
              fillOpacity={0.4}
              stackId="a"
            />
            <Area
              dataKey="profit"
              type="natural"
              fill="url(#fillProfit)"
              stroke="var(--color-profit)"
              fillOpacity={0.4}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              January – {monthlyRanges.at(-1)?.label} {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

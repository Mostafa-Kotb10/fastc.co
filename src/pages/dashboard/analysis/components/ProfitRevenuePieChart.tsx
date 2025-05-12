import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

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
import { Analytics } from "../analytics.types";

const chartConfig = {
  profit: {
    label: "Profit",
    color: "darkblue",
  },
  revenue: {
    label: "Revenue",
    color: "blue",
  },
  numberOfReceipts: {
    label: "Receipts",
    color: "cyan",
  },
} satisfies ChartConfig;

interface ProfitRevenuePieChartProps {
  analytics: Analytics;
}

export function ProfitRevenuePieChart({
  analytics,
}: ProfitRevenuePieChartProps) {
  const chartData = analytics
    ? [
        {
          key: "profit",
          value: analytics.profit,
          fill: chartConfig.profit.color,
        },
        {
          key: "revenue",
          value: analytics.revenue,
          fill: chartConfig.revenue.color,
        },
        {
          key: "numberOfReceipts",
          value: analytics.numberOfReceipts,
          fill: chartConfig.numberOfReceipts.color,
        },
      ]
    : [];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Business Summary</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="key" hideLabel />}
            />
            <Pie data={chartData} dataKey="value" nameKey="key">
              <LabelList
                dataKey="key"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Showing profit, revenue, and receipts
        </div>
      </CardFooter>
    </Card>
  );
}

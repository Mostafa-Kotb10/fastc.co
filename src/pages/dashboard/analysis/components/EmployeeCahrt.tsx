
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
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
import { usePharmacyEmployees } from "../../pharmacy/api/queries";
import { useParams } from "react-router-dom";

// Define the type for the analytics prop
interface EmployeeChartProps {
  analytics?: Analytics; // Replace `any` with the actual type of the analytics data
}

function EmployeeChart({ analytics }: EmployeeChartProps) {
  const { pharmacyId } = useParams();
  // Assuming the analytics data contains employees and receipts
  const { employees} = usePharmacyEmployees({
    pharmacyId: Number(pharmacyId),
  });
  const totalEmployees = employees?.length || 0;
  const totalReceipts = analytics?.numberOfReceipts || 0;

  const chartData = [
    { month: "January", employees: totalEmployees, receipts: totalReceipts },
  ];

  const chartConfig = {
    employees: {
      label: "Employees",
      color: "#3b82f6", // Blue-500
    },
    receipts: {
      label: "Receipts",
      color: "#60a5fa", // Blue-400
    },
  } satisfies ChartConfig;

  const totalVisitors = totalReceipts;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Employees Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Customers
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="employees"
              stackId="a"
              cornerRadius={5}
              fill={chartConfig.employees.color} // Use the blue-500 color
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="receipts"
              fill={chartConfig.receipts.color} // Use the blue-400 color
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div> */}
      </CardFooter>
    </Card>
  );
}

export default EmployeeChart;

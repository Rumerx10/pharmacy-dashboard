"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { useGetData } from "@/api/api";
import { gradientColors } from "@/lib/utils";
import { FcDataSheet } from "react-icons/fc";
import Spinner from "../Spinner";

type TimePeriod = "TD" | "7D" | "TH" | "3M";

interface ApiData {
  statusCode: number;
  message: string;
  data: {
    data: Array<{
      name: string;
      value: number;
    }>;
    change: number;
  };
}

interface ChartDataItem {
  name: string;
  value: number;
  fill: string;
}

const periodLabels: Record<TimePeriod, string> = {
  TD: "Today",
  "7D": "Last 7 days",
  TH: "This month",
  "3M": "Last 3 months",
};

const periodOptions: TimePeriod[] = ["TD", "7D", "TH", "3M"];

// Calculate dynamic bar width based on data length
const getBarWidth = (dataLength: number): number => {
  if (dataLength <= 4) return 60;
  if (dataLength <= 6) return 50;
  if (dataLength <= 8) return 40;
  return 35;
};

// Process API data and assign gradients - FIXED VERSION
const processChartData = (apiData: ApiData | undefined): ChartDataItem[] => {
  console.log("API Data received:", apiData); // Debug log

  if (!apiData || apiData.statusCode !== 200 || !apiData.data?.data) {
    console.log("No valid data found in API response");
    return [];
  }

  const chartData = apiData.data.data.map((item, index) => {
    const gradientIndex = index % gradientColors.length;
    const gradientId = `gradient-${gradientIndex}`;

    console.log(`Processing item ${index}:`, item.name, item.value); // Debug log

    return {
      name: item.name,
      value: item.value,
      fill: `url(#${gradientId})`,
    };
  });

  console.log("Processed chart data:", chartData); // Debug log
  return chartData;
};

// Custom bar component with dynamic styling
const CustomBar = (props: {
  fill?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}) => {
  const { fill, x, y, width, height } = props;

  return (
    <rect x={x} y={y} width={width} height={height} fill={fill} rx={8} ry={8} />
  );
};

const SalesSummaryChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("7D");
  const [processedData, setProcessedData] = useState<ChartDataItem[]>([]);

  const { data: apiResponse, isLoading } = useGetData(
    ["sales-performance", selectedPeriod],
    `/get-sales-performance?performBy=&flag=${selectedPeriod}`
  );

  // Process data when apiResponse changes
  useEffect(() => {
    if (apiResponse) {
      console.log("API Response for period", selectedPeriod, ":", apiResponse);
      const chartData = processChartData(apiResponse);
      setProcessedData(chartData);
    } else {
      setProcessedData([]);
    }
  }, [apiResponse, selectedPeriod]);

  const chartData = processedData;
  const barWidth = getBarWidth(chartData.length);
  const percentageChange = apiResponse?.data?.change || 0;

  // Generate Y-axis ticks based on max value
  const generateYAxisTicks = () => {
    if (chartData.length === 0) return [0, 5000, 10000, 15000, 20000];

    const maxValue = Math.max(...chartData.map((item) => item.value));
    const step = Math.ceil(maxValue / 4);
    const ticks = [];

    for (let i = 0; i <= 4; i++) {
      ticks.push(i * step);
    }

    return ticks;
  };

  const yAxisTicks = generateYAxisTicks();

  return (
    <Card className="w-full h-auto lg:h-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
        <div className="flex flex-col gap-2">
          <CardTitle className="text-gray-900 dark:text-gray-100">
            User-wise Sales Summary
          </CardTitle>
          <CardDescription className="flex items-center gap-1">
            <span
              className={`font-semibold ${
                percentageChange >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {percentageChange >= 0 ? "↑" : "↓"}{" "}
              {Math.abs(percentageChange).toFixed(2)}%
            </span>
            <span className="text-muted-foreground dark:text-gray-400">
              vs last month
            </span>
          </CardDescription>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="flex items-center justify-between bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              disabled={isLoading}
            >
              {isLoading && <Spinner size={5} />}
              {periodLabels[selectedPeriod]}
              <ChevronDown className="h-4 w-4 ml-2 text-gray-500 dark:text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          >
            {periodOptions.map((period) => (
              <DropdownMenuItem
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`${
                  selectedPeriod === period
                    ? "bg-accent dark:bg-accent/20 text-accent-foreground dark:text-accent-foreground"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                } cursor-pointer focus:bg-gray-100 dark:focus:bg-gray-700`}
                disabled={isLoading}
              >
                {periodLabels[period]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="px-0 lg:px-6 h-full">
        {isLoading ? (
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center">
              <div className="animate-pulse text-gray-400 flex items-center justify-center dark:text-gray-500 text-6xl mb-4">
                <FcDataSheet />
              </div>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                Loading data...
              </p>
            </div>
          </div>
        ) : chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <defs>
                {gradientColors.map((gradient, index) => (
                  <linearGradient
                    key={`gradient-${index}`}
                    id={`gradient-${index}`}
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    {gradient.colors.map((stop, stopIndex) => (
                      <stop
                        key={stopIndex}
                        offset={stop.offset}
                        stopColor={stop.color}
                      />
                    ))}
                  </linearGradient>
                ))}
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(156, 163, 175, 0.3)"
                strokeOpacity={0.5}
              />

              <XAxis
                dataKey="name"
                axisLine={{ stroke: "rgba(156, 163, 175, 0.3)" }}
                tickLine={{ stroke: "rgba(156, 163, 175, 0.3)" }}
                tick={{ fill: "#374151", fontSize: 12 }}
                interval={0}
                angle={chartData.length > 6 ? -45 : 0}
                textAnchor={chartData.length > 6 ? "end" : "middle"}
                height={chartData.length > 6 ? 60 : 40}
              />

              <YAxis
                ticks={yAxisTicks}
                domain={[0, "auto"]}
                tickFormatter={(value) => {
                  if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                  return value.toString();
                }}
                axisLine={{ stroke: "rgba(156, 163, 175, 0.3)" }}
                tickLine={{ stroke: "rgba(156, 163, 175, 0.3)" }}
                tick={{ fill: "#374151", fontSize: 12 }}
              />

              <Tooltip
                cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                contentStyle={{
                  backgroundColor: "#2a2a2a",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
                labelStyle={{
                  color: "#fff",
                  fontWeight: 600,
                  marginBottom: "4px",
                }}
                formatter={(value: number | undefined) => [
                  <span key="value" style={{ color: "#fff", fontWeight: 500 }}>
                    {value?.toLocaleString() || "0"}
                  </span>,
                ]}
                labelFormatter={(label: string) => (
                  <span style={{ color: "#ccc", fontSize: "12px" }}>
                    {label}
                  </span>
                )}
              />

              <Bar
                dataKey="value"
                shape={<CustomBar />}
                barSize={barWidth}
                name="Sales"
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center">
              <div className="text-gray-400 flex items-center justify-center dark:text-gray-500 text-6xl mb-4">
                <FcDataSheet />
              </div>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                There are no records to display for{" "}
                {periodLabels[selectedPeriod]}
              </p>
              {apiResponse && (
                <p className="text-gray-400 dark:text-gray-600 text-xs mt-1">
                  API Response Status: {apiResponse.statusCode}
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SalesSummaryChart;

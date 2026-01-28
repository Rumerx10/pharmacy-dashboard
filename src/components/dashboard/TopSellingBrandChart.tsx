"use client";

import { useState, useMemo, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { useGetData } from "@/api/api";
import PieChartLoader from "../PieChartLoader";

interface BrandData {
  name: string;
  value: number;
  color: string;
  hoverColor: string;
  ringColor: string;
  percentage?: number;
  [key: string]: string | number | undefined;
}

interface ApiBrandData {
  name: string;
  value: number;
}

const BRAND_COLORS = [
  {
    color: "#F8F1CA",
    hoverColor: "#E6D9B0",
    ringColor: "#D4C296",
  },
  {
    color: "#FFE2A7",
    hoverColor: "#E6C995",
    ringColor: "#CCB082",
  },
  {
    color: "#FFC652",
    hoverColor: "#E6B249",
    ringColor: "#CC9E40",
  },
  {
    color: "#FE7171",
    hoverColor: "#E56565",
    ringColor: "#CC5959",
  },
  {
    color: "#E62B66",
    hoverColor: "#CF275C",
    ringColor: "#B82352",
  },
  {
    color: "#5A5476",
    hoverColor: "#514C6A",
    ringColor: "#48435E",
  },
  {
    color: "#0570A7",
    hoverColor: "#046596",
    ringColor: "#035A85",
  },
  {
    color: "#46C3E0",
    hoverColor: "#3FB0CA",
    ringColor: "#389DB4",
  },
  {
    color: "#D5DCDC",
    hoverColor: "#C3C9C9",
    ringColor: "#B1B6B6",
  },
  {
    color: "#F3EFE3",
    hoverColor: "#E0DBCE",
    ringColor: "#CDC7B9",
  },
];

const months = [
  { name: "January", value: "01" },
  { name: "February", value: "02" },
  { name: "March", value: "03" },
  { name: "April", value: "04" },
  { name: "May", value: "05" },
  { name: "June", value: "06" },
  { name: "July", value: "07" },
  { name: "August", value: "08" },
  { name: "September", value: "09" },
  { name: "October", value: "10" },
  { name: "November", value: "11" },
  { name: "December", value: "12" },
];

const TopSellingBrandChart = () => {
  const [selectedYear, setSelectedYear] = useState<string>("26"); // Default: current year (2026)
  const [selectedMonth, setSelectedMonth] = useState<string>("January");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredBrandName, setHoveredBrandName] = useState<{
    name: string;
    x: number;
    y: number;
  } | null>(null);
  const [formattedBrands, setFormattedBrands] = useState<BrandData[]>([]);

  // Generate last 5 years including current year
  const currentYear = 26; // 2026
  const years = Array.from({ length: 5 }, (_, i) => {
    const year = currentYear - i;
    return {
      name: `20${year}`,
      value: year.toString().padStart(2, "0"),
    };
  });

  // Calculate the period string for the API (e.g., "2601" for January 2026)
  const getPeriod = () => {
    const monthObj = months.find((m) => m.name === selectedMonth);
    const monthValue = monthObj ? monthObj.value : "01";
    return `${selectedYear}${monthValue}`;
  };

  const period = getPeriod();

  const { data, isPending } = useGetData(
    ["top-selling-brands", period],
    `/get-top-selling-brands?performBy=&yymm=${period}`
  );

  useEffect(() => {
    if (data?.dataList) {
      const apiData: ApiBrandData[] = data.dataList;

      // Calculate total for percentages
      const totalValue = apiData.reduce((sum, item) => sum + item.value, 0);

      // Format data with colors and percentages
      const formatted = apiData.slice(0, 10).map((brand, index) => {
        const percentage =
          totalValue > 0 ? (brand.value / totalValue) * 100 : 0;
        const colorIndex = index % BRAND_COLORS.length;

        return {
          name: brand.name,
          value: brand.value,
          percentage: parseFloat(percentage.toFixed(1)),
          ...BRAND_COLORS[colorIndex],
        };
      });

      setFormattedBrands(formatted);
    }
  }, [data]);

  const sortedData = useMemo(() => {
    return [...formattedBrands];
  }, [formattedBrands]);

  // Find the brand with the largest value by default
  const getLargestBrand = () => {
    if (sortedData.length === 0) return null;

    let largestIndex = 0;
    let largestValue = sortedData[0].percentage || 0;

    sortedData.forEach((brand, index) => {
      if (brand.percentage && brand.percentage > largestValue) {
        largestValue = brand.percentage;
        largestIndex = index;
      }
    });

    return {
      brand: sortedData[largestIndex],
      index: largestIndex,
    };
  };

  const largestBrand = getLargestBrand();

  const getCenterContent = () => {
    if (hoveredIndex !== null && sortedData[hoveredIndex]) {
      const brand = sortedData[hoveredIndex];
      return {
        value: brand.percentage?.toFixed(1) || "0.0",
        name: brand.name,
        tk: brand.value,
        showTk: true,
      };
    }

    // Show largest brand by default when not hovering
    if (largestBrand) {
      return {
        value: largestBrand.brand.percentage?.toFixed(1) || "0.0",
        name: largestBrand.brand.name,
        tk: largestBrand.brand.value,
        showTk: false,
      };
    }

    return {
      value: "0.0",
      name: "No data",
      showTk: false,
    };
  };

  const centerContent = getCenterContent();

  // Handle brand name hover for tooltip
  const handleBrandNameHover = (
    event: React.MouseEvent<HTMLSpanElement>,
    brandName: string
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHoveredBrandName({
      name: brandName,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  return (
    <Card className="w-full h-auto lg:h-80 bg-white dark:bg-gray-900 rounded-lg shadow-lg dark:shadow-gray-800/30 p-6 border border-gray-200 dark:border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Top 10 Selling Brands
        </CardTitle>
        <div className="flex gap-2">
          {/* Year Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                20{selectedYear}
                <ChevronDown className="h-4 w-4 ml-2 text-gray-500 dark:text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              {years.map((year) => (
                <DropdownMenuItem
                  key={year.value}
                  onClick={() => setSelectedYear(year.value)}
                  className={`${
                    selectedYear === year.value
                      ? "bg-accent dark:bg-accent/20 text-accent-foreground dark:text-accent-foreground"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  } cursor-pointer focus:bg-gray-100 dark:focus:bg-gray-700`}
                >
                  {year.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Month Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {selectedMonth}
                <ChevronDown className="h-4 w-4 ml-2 text-gray-500 dark:text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              {months.map((month) => (
                <DropdownMenuItem
                  key={month.value}
                  onClick={() => setSelectedMonth(month.name)}
                  className={`${
                    selectedMonth === month.name
                      ? "bg-accent dark:bg-accent/20 text-accent-foreground dark:text-accent-foreground"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  } cursor-pointer focus:bg-gray-100 dark:focus:bg-gray-700`}
                >
                  {month.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      {isPending ? (
        <PieChartLoader />
      ) : sortedData.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-500 dark:text-gray-400">
              No brand data available for {selectedMonth} 20{selectedYear}
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center">
          <CardContent className="flex w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full gap-6">
              {/* Chart Section */}
              <div className="flex-shrink-0 flex items-center justify-center">
                <div
                  className="relative"
                  style={{ width: "200px", height: "200px" }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sortedData as BrandData[]}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={85}
                        paddingAngle={2}
                        dataKey="percentage"
                        startAngle={90}
                        endAngle={-270}
                        onMouseEnter={(_, index) => {
                          setHoveredIndex(index);
                        }}
                        onMouseLeave={() => setHoveredIndex(null)}
                        cornerRadius={8}
                      >
                        {sortedData.map((entry, index) => {
                          const isHovered = hoveredIndex === index;
                          return (
                            <Cell
                              key={`cell-${index}`}
                              fill={isHovered ? entry.hoverColor : entry.color}
                              stroke={isHovered ? entry.ringColor : "none"}
                              strokeWidth={isHovered ? 3 : 0}
                              style={{
                                transition: "all 0.3s ease-in-out",
                                ...(isHovered && {
                                  filter:
                                    "drop-shadow(0 0 6px rgba(0,0,0,0.15))",
                                  transformOrigin: "center center",
                                }),
                              }}
                            />
                          );
                        })}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Center Percentage */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {centerContent.value}%
                      </div>
                      {/* <div className="text-md font-semibold text-gray-900 dark:text-gray-100">
                        {centerContent.name}
                      </div> */}
                      {/* Show TK amount only when hovering */}
                      {centerContent.showTk && (
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">
                          {centerContent.tk} TK
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Legend Section */}
              <div className="flex">
                <div className="grid grid-cols-2 gap-y-2 w-full">
                  <div className="space-y-1">
                    {sortedData.map((brand, index) => {
                      const isHovered = hoveredIndex === index;
                      // Check if this is the largest brand (default display)
                      const isLargestBrand =
                        largestBrand?.index === index && hoveredIndex === null;
                      const isActive = isHovered || isLargestBrand;

                      return (
                        index <= sortedData.length / 2 - 1 && (
                          <div
                            key={brand.name}
                            className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded flex items-center gap-3 cursor-pointer transition-all group"
                            onMouseEnter={(e) => {
                              setHoveredIndex(index);
                              handleBrandNameHover(e, brand.name);
                            }}
                            onMouseLeave={() => {
                              setHoveredIndex(null);
                              setHoveredBrandName(null);
                            }}
                          >
                            <div className="relative">
                              <div
                                className={`${
                                  isActive ? "scale-125" : "scale-100"
                                } w-4 h-4 flex-shrink-0 transition-all duration-200 rounded-sm`}
                                style={{
                                  backgroundColor: isActive
                                    ? brand.hoverColor
                                    : brand.color,
                                }}
                              />
                            </div>
                            <div className="flex flex-col min-w-[100px]">
                              <span
                                className={`text-sm font-medium transition-colors truncate ${
                                  isActive
                                    ? "text-gray-900 dark:text-gray-100"
                                    : "text-gray-700 dark:text-gray-300"
                                }`}
                              >
                                {brand.name}
                              </span>
                            </div>
                          </div>
                        )
                      );
                    })}
                  </div>
                  <div className="space-y-1">
                    {sortedData.map((brand, index) => {
                      const isHovered = hoveredIndex === index;
                      // Check if this is the largest brand (default display)
                      const isLargestBrand =
                        largestBrand?.index === index && hoveredIndex === null;
                      const isActive = isHovered || isLargestBrand;

                      return (
                        index > sortedData.length / 2 - 1 && (
                          <div
                            key={brand.name}
                            className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded flex items-center gap-3 cursor-pointer transition-all group"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                          >
                            <div className="relative">
                              <div
                                className={`${
                                  isActive ? "scale-125" : "scale-100"
                                } w-4 h-4 flex-shrink-0 transition-all duration-200 rounded-sm`}
                                style={{
                                  backgroundColor: isActive
                                    ? brand.hoverColor
                                    : brand.color,
                                }}
                              />
                            </div>
                            <div className="flex flex-col min-w-[100px]">
                              <span
                                className={`text-sm font-medium transition-colors truncate ${
                                  isActive
                                    ? "text-gray-900 dark:text-gray-100"
                                    : "text-gray-700 dark:text-gray-300"
                                }`}
                                onMouseEnter={(e) =>
                                  handleBrandNameHover(e, brand.name)
                                }
                                onMouseLeave={() => setHoveredBrandName(null)}
                              >
                                {brand.name}
                              </span>
                            </div>
                          </div>
                        )
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      )}

      {/* Brand Name Tooltip */}
      {hoveredBrandName && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${hoveredBrandName.x}px`,
            top: `${hoveredBrandName.y - 10}px`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-100 text-sm font-medium px-3 py-2 rounded-lg shadow-lg border border-gray-700 dark:border-gray-600 max-w-xs">
              {hoveredBrandName.name}
              {/* Tooltip arrow */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1">
                <div className="w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45 border-r border-b border-gray-700 dark:border-gray-600"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default TopSellingBrandChart;
